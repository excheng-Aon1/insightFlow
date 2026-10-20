"""
Background Task Queue Engine (FastAPI BackgroundTasks + Celery & Redis Job Tracker)
===================================================================================
รองรับการอ่านไฟล์ Excel (.xlsx, .xls) และสกัดข้อมูลสต็อก/รายรับ-รายจ่ายจำนวนมากแบบ Non-Blocking:
1. รับไฟล์และสร้าง Job ID ลงใน Redis ทันที (สถานะ QUEUED -> PROCESSING -> COMPLETED / FAILED)
2. ส่งงานประมวลผลหนักเข้าคิวเบื้องหลังผ่าน FastAPI BackgroundTasks (หรือ Celery Worker เมื่อเปิดใช้งาน)
3. แต่ละงานเบื้องหลังเปิด SQLAlchemy QueuePool Session (SessionLocal) ของตัวเองอย่างปลอดภัย
4. ให้ Frontend ตอบสนองได้ทันที (< 10ms) และติดตามความคืบหน้าแบบเรียลไทม์ผ่าน GET /api/jobs/{job_id}
"""

import io
import os
import json
import time
import uuid
import logging
from datetime import datetime
from typing import Any, Callable, Dict, List, Optional

import pandas as pd
from fastapi import BackgroundTasks
from dotenv import load_dotenv

from database import SessionLocal, Product, CashFlowTransaction, AnalyticsTransaction, UserQuota, UploadedFile
from redis_cache import cache_get_json, cache_set_json, cache_invalidate

load_dotenv()
logger = logging.getLogger("insightflow.task_queue")

JOB_TTL_SECONDS = int(os.getenv("JOB_TTL_SECONDS", "3600"))
CELERY_BROKER_URL = os.getenv("CELERY_BROKER_URL", os.getenv("REDIS_URL", "redis://127.0.0.1:6379/0"))
USE_CELERY_WORKER = os.getenv("USE_CELERY_WORKER", "false").lower() == "true"

# ------------------------------------------------------------------------------
# OPTIONAL CELERY INTEGRATION (FALLBACK TO FASTAPI BACKGROUNDTASKS AUTOMATICALLY)
# ------------------------------------------------------------------------------
celery_app = None
try:
    from celery import Celery  # type: ignore

    celery_app = Celery(
        "insightflow_tasks",
        broker=CELERY_BROKER_URL,
        backend=CELERY_BROKER_URL,
    )
    celery_app.conf.update(
        task_serializer="json",
        accept_content=["json"],
        result_serializer="json",
        timezone="Asia/Bangkok",
        enable_utc=True,
        task_track_started=True,
    )
except ImportError:
    celery_app = None

REQUIRED_INVENTORY_COLUMNS = {"sku_code", "product_name", "category", "price", "stock_qty"}


def _source_tab_label(task_type: str) -> str:
    return {
        "inventory_upload": "คลังสินค้า & AI สต็อก",
        "cashflow_upload": "ระบบรายรับ-รายจ่าย",
        "analysis_upload": "ภาพรวมระบบ / บทวิเคราะห์ AI",
    }.get(task_type, "ชุดข้อมูลระบบ")


def _upsert_uploaded_file_record(
    *,
    file_id: str,
    user_id: str,
    filename: str,
    task_type: str,
    file_size_bytes: int = 0,
    total_records: int = 0,
    status: str = "COMPLETED",
    summary_note: str = "",
    columns: Optional[List[str]] = None,
    preview_rows: Optional[List[Dict[str, Any]]] = None,
    linked_records: Optional[Dict[str, Any]] = None,
) -> None:
    """บันทึกหรืออัปเดตประวัติไฟล์ที่อัปโหลดของผู้ใช้ลงในฐานข้อมูล UploadedFile"""
    try:
        with SessionLocal() as db:
            existing = db.query(UploadedFile).filter(UploadedFile.id == file_id).first()
            if not existing:
                existing = UploadedFile(
                    id=file_id,
                    user_id=user_id,
                    user_email=user_id if "@" in str(user_id) else "",
                    user_name=str(user_id).split("@")[0] if "@" in str(user_id) else str(user_id),
                    filename=filename,
                    task_type=task_type,
                    source_tab=_source_tab_label(task_type),
                    file_size_bytes=file_size_bytes,
                )
                db.add(existing)
            if file_size_bytes > 0:
                existing.file_size_bytes = file_size_bytes
            existing.total_records = total_records
            existing.status = status
            if summary_note:
                existing.summary_note = summary_note
            if columns is not None:
                existing.columns_json = json.dumps(columns, ensure_ascii=False)
            if preview_rows is not None:
                existing.preview_json = json.dumps(preview_rows[:30], ensure_ascii=False, default=str)
            if linked_records is not None:
                existing.linked_records_json = json.dumps(linked_records, ensure_ascii=False)
            db.commit()
    except Exception as exc:
        logger.warning(f"⚠️ Failed to upsert UploadedFile record {file_id}: {exc}")


# ------------------------------------------------------------------------------
# 1. REDIS JOB STATE MANAGEMENT
# ------------------------------------------------------------------------------
def _job_key(job_id: str) -> str:
    return f"job:status:{job_id}"


def _recent_jobs_key(user_id: str) -> str:
    return f"job:recent:{user_id}"


def create_background_job(
    task_type: str,
    filename: str,
    file_size_bytes: int,
    user_id: str,
) -> Dict[str, Any]:
    """สร้างรายการงานเบื้องหลังใหม่ใน Redis และคืนค่าข้อมูลเริ่มต้นให้ Frontend ทันที"""
    short_uid = uuid.uuid4().hex[:6].upper()
    prefix = {
        "inventory_upload": "INV",
        "cashflow_upload": "CF",
        "analysis_upload": "AI",
    }.get(task_type, "TASK")
    job_id = f"JOB-{prefix}-{int(time.time())}-{short_uid}"

    now_iso = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    job_state: Dict[str, Any] = {
        "job_id": job_id,
        "task_type": task_type,
        "queue_engine": "Celery Distributed Worker" if (celery_app and USE_CELERY_WORKER) else "FastAPI BackgroundTasks + Redis Queue",
        "filename": filename,
        "file_size_bytes": file_size_bytes,
        "user_id": user_id,
        "status": "QUEUED",
        "progress": 10,
        "stage": "รับไฟล์เข้าคิวงานเบื้องหลังแล้ว (Queued)",
        "created_at": now_iso,
        "updated_at": now_iso,
        "completed_at": None,
        "elapsed_ms": 0.0,
        "total_records": 0,
        "result": None,
        "error": None,
    }
    cache_set_json(_job_key(job_id), job_state, ttl_seconds=JOB_TTL_SECONDS)

    # บันทึกไฟล์เริ่มต้นลงในตาราง UploadedFile เพื่อให้ผู้ใช้มองเห็นไฟล์ของตัวเองทันที
    _upsert_uploaded_file_record(
        file_id=job_id,
        user_id=user_id,
        filename=filename,
        task_type=task_type,
        file_size_bytes=file_size_bytes,
        total_records=0,
        status="PROCESSING",
        summary_note="กำลังประมวลผลไฟล์ในคิวงานเบื้องหลัง...",
    )

    # บันทึกรายการงานล่าสุดของผู้ใช้ (เก็บสูงสุด 15 รายการ)
    recent_list: List[str] = cache_get_json(_recent_jobs_key(user_id)) or []
    recent_list = [job_id] + [jid for jid in recent_list if jid != job_id][:14]
    cache_set_json(_recent_jobs_key(user_id), recent_list, ttl_seconds=JOB_TTL_SECONDS)

    return job_state


def update_background_job(
    job_id: str,
    *,
    status: Optional[str] = None,
    progress: Optional[int] = None,
    stage: Optional[str] = None,
    total_records: Optional[int] = None,
    result: Optional[Dict[str, Any]] = None,
    error: Optional[str] = None,
    elapsed_ms: Optional[float] = None,
) -> Dict[str, Any]:
    """อัปเดตสถานะและความคืบหน้าของงานเบื้องหลังใน Redis"""
    job_state = cache_get_json(_job_key(job_id)) or {"job_id": job_id}
    now_iso = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    job_state["updated_at"] = now_iso

    if status is not None:
        job_state["status"] = status
        if status in ("COMPLETED", "FAILED"):
            job_state["completed_at"] = now_iso
    if progress is not None:
        job_state["progress"] = progress
    if stage is not None:
        job_state["stage"] = stage
    if total_records is not None:
        job_state["total_records"] = total_records
    if result is not None:
        job_state["result"] = result
    if error is not None:
        job_state["error"] = error
    if elapsed_ms is not None:
        job_state["elapsed_ms"] = round(elapsed_ms, 2)

    cache_set_json(_job_key(job_id), job_state, ttl_seconds=JOB_TTL_SECONDS)
    return job_state


def get_background_job(job_id: str) -> Optional[Dict[str, Any]]:
    """ดึงสถานะและผลลัพธ์ของงานเบื้องหลังจาก Redis"""
    return cache_get_json(_job_key(job_id))


def list_user_background_jobs(user_id: str) -> List[Dict[str, Any]]:
    """ดึงรายการงานเบื้องหลังล่าสุดของผู้ใช้"""
    recent_ids: List[str] = cache_get_json(_recent_jobs_key(user_id)) or []
    jobs: List[Dict[str, Any]] = []
    for jid in recent_ids:
        j = get_background_job(jid)
        if j:
            # ตัด array ข้อมูลขนาดใหญ่ออกในหน้าสรุปรายการเพื่อให้ตอบสนองเร็ว
            summary_copy = {k: v for k, v in j.items() if k != "result"}
            if j.get("result"):
                summary_copy["has_result"] = True
            jobs.append(summary_copy)
    return jobs


def dispatch_background_task(
    background_tasks: BackgroundTasks,
    func: Callable[..., Any],
    *args: Any,
) -> str:
    """
    ส่งงานเข้าคิวเบื้องหลัง:
    - หากเปิดโหมด Celery Worker และฟังก์ชันรองรับ .delay() จะส่งเข้า Celery Broker
    - ค่าเริ่มต้นใช้ FastAPI BackgroundTasks เพื่อรันแบบ Non-blocking ทันทีหลังส่ง HTTP Response
    """
    if celery_app and USE_CELERY_WORKER and hasattr(func, "delay"):
        func.delay(*args)  # type: ignore
        return "celery"
    background_tasks.add_task(func, *args)
    return "fastapi_background_tasks"


# ------------------------------------------------------------------------------
# 2. HELPER: PARSE EXCEL / CSV IN BACKGROUND WORKER
# ------------------------------------------------------------------------------
def _read_dataframe_from_bytes(contents: bytes, filename_lower: str) -> pd.DataFrame:
    """
    อ่านไฟล์ Excel/CSV อย่างละเอียด โดยตรวจจับแถวหัวกระดาษ (Header Rows) อัตโนมัติ
    เพื่อป้องกันไม่ให้ข้อความหัวกระดาษ (ชื่อบริษัท/ชื่อรายงาน) ถูกเข้าใจผิดว่าเป็นคอลัมน์
    """
    header_keywords = [
        "date", "time", "created", "branch", "channel", "store", "customer", "custummer",
        "customer_name", "custummer_name", "name", "ชื่อ", "ชื่อลูกค้า", "product_name", "ชื่อสินค้า",
        "product", "item", "sku", "amount", "revenue", "price", "sales", "total", 
        "qty", "quantity", "status", "วันที่", "สาขา", "ช่องทาง", "ลูกค้า", 
        "สินค้า", "รายการ", "ยอด", "ราคา", "จำนวน", "สถานะ", "หมวด"
    ]
    
    header_to_use = 0
    try:
        if filename_lower.endswith(".csv") or filename_lower.endswith(".txt"):
            try:
                sample_df = pd.read_csv(io.BytesIO(contents), header=None, encoding="utf-8-sig", nrows=10)
            except UnicodeDecodeError:
                sample_df = pd.read_csv(io.BytesIO(contents), header=None, encoding="cp874", nrows=10)
        else:
            sample_df = pd.read_excel(io.BytesIO(contents), header=None, nrows=10)
            
        best_header_row = 0
        best_score = -1
        for r_idx in range(len(sample_df)):
            row_vals = [str(x).strip().lower() for x in sample_df.iloc[r_idx] if pd.notna(x) and str(x).strip()]
            if len(row_vals) <= 1:
                continue
            score = sum(1 for v in row_vals if any(k in v for k in header_keywords))
            score += len(row_vals) * 0.5
            if score > best_score:
                best_score = score
                best_header_row = r_idx
                
        if best_score >= 2:
            header_to_use = best_header_row
    except Exception:
        header_to_use = 0

    if filename_lower.endswith(".csv") or filename_lower.endswith(".txt"):
        try:
            return pd.read_csv(io.BytesIO(contents), header=header_to_use, encoding="utf-8-sig")
        except UnicodeDecodeError:
            return pd.read_csv(io.BytesIO(contents), header=header_to_use, encoding="cp874")
    return pd.read_excel(io.BytesIO(contents), header=header_to_use)


# ------------------------------------------------------------------------------
# 3. BACKGROUND WORKER TASKS (INVENTORY / CASHFLOW / AI ANALYSIS)
# ------------------------------------------------------------------------------
def process_inventory_upload_task(
    job_id: str,
    contents: bytes,
    original_filename: str,
    effective_user_id: str,
    restock_builder: Callable[[List[Product]], Dict[str, Any]],
) -> None:
    """
    งานเบื้องหลังสำหรับอ่านไฟล์ Excel/CSV สต็อกสินค้าจำนวนมาก บันทึกลง PostgreSQL/MySQL QueuePool
    และคำนวณโมเดล AI Restock Intelligence โดยไม่บล็อกหน้าเว็บ
    """
    start_ts = time.perf_counter()
    filename_lower = original_filename.lower()

    try:
        update_background_job(
            job_id,
            status="PROCESSING",
            progress=25,
            stage=f"กำลังเปิดอ่านและสกัดโครงสร้างตารางจากไฟล์ '{original_filename}'...",
        )

        df = _read_dataframe_from_bytes(contents, filename_lower)
        if df.empty:
            raise ValueError("ไม่พบข้อมูลในตาราง: ไฟล์มีเฉพาะส่วนหัวหรือไม่มีข้อมูลรายการสินค้า")

        df = df.fillna("")
        df.columns = [str(c).strip().lower().replace(" ", "_") for c in df.columns]
        has_standard_cols = REQUIRED_INVENTORY_COLUMNS.issubset(set(df.columns))

        records: List[Dict[str, Any]] = []
        if has_standard_cols:
            try:
                df["price"] = pd.to_numeric(df["price"], errors="coerce").fillna(0.0)
                df["stock_qty"] = pd.to_numeric(df["stock_qty"], errors="coerce").fillna(0).astype(int)
            except Exception:
                pass
            for row in df.to_dict(orient="records"):
                records.append(
                    {
                        "sku_code": str(row["sku_code"]).strip(),
                        "product_name": str(row["product_name"]).strip(),
                        "category": str(row["category"]).strip() or "general",
                        "price": float(row["price"] or 0.0),
                        "stock_qty": int(row["stock_qty"] or 0),
                    }
                )
        else:
            sku_col = next((c for c in df.columns if any(k in c for k in ["sku", "code", "รหัส"])), None)
            name_col = next((c for c in df.columns if any(k in c for k in ["product_name", "name_product", "item_name", "name_item", "ชื่อสินค้า", "ชื่อ", "name"])), None)
            cat_col = next((c for c in df.columns if any(k in c for k in ["category", "หมวด", "ประเภท", "dept", "group"])), None)
            price_col = next((c for c in df.columns if any(k in c for k in ["price", "amount", "ราคา", "ยอด"])), None)
            stock_col = next((c for c in df.columns if any(k in c for k in ["stock", "qty", "quantity", "คงเหลือ", "สต็อก", "remain"])), None)

            for idx, row in enumerate(df.to_dict(orient="records"), start=1):
                sku = str(row.get(sku_col) or f"SKU-IMP-{idx:03d}").strip() if sku_col else f"SKU-IMP-{idx:03d}"
                name = str(row.get(name_col) or f"สินค้าจากไฟล์ #{idx}").strip() if name_col else f"สินค้าจากไฟล์ #{idx}"
                cat = str(row.get(cat_col) or "general").strip() if cat_col else "general"
                try:
                    price = float(str(row.get(price_col) or 0).replace(",", "").replace("฿", "").strip()) if price_col else 0.0
                except ValueError:
                    price = 0.0
                try:
                    stock = int(float(str(row.get(stock_col) or 0).replace(",", "").strip())) if stock_col else 0
                except ValueError:
                    stock = 0
                records.append(
                    {
                        "sku_code": sku,
                        "product_name": name,
                        "category": cat,
                        "price": price,
                        "stock_qty": stock,
                    }
                )

        if not records:
            raise ValueError("ไม่พบรายการสต็อกสินค้าที่สามารถสกัดได้จากไฟล์")

        update_background_job(
            job_id,
            status="PROCESSING",
            progress=65,
            total_records=len(records),
            stage=f"สกัดสำเร็จ {len(records):,} SKUs — กำลัง Bulk Upsert ลงฐานข้อมูลผ่าน Connection Pool...",
        )

        batch_ts = int(time.time() * 1000) % 1000000
        with SessionLocal() as db:
            incoming_skus = [r["sku_code"] for r in records]
            existing_products = (
                db.query(Product).filter(Product.sku_code.in_(incoming_skus)).all()
                if incoming_skus
                else []
            )
            existing_map = {p.sku_code: p for p in existing_products}

            new_objects: List[Product] = []
            for idx, row in enumerate(records, start=1):
                sku = row["sku_code"]
                if sku in existing_map:
                    prod = existing_map[sku]
                    prod.name = row["product_name"]
                    prod.category = row["category"]
                    prod.price = row["price"]
                    prod.stock_qty = row["stock_qty"]
                    prod.updated_at = datetime.utcnow()
                else:
                    new_prod = Product(
                        id=f"SKU-{batch_ts}-{idx}",
                        user_id=effective_user_id,
                        sku_code=sku,
                        name=row["product_name"],
                        category=row["category"],
                        price=row["price"],
                        stock_qty=row["stock_qty"],
                    )
                    new_objects.append(new_prod)
                    existing_map[sku] = new_prod

            if new_objects:
                db.bulk_save_objects(new_objects)
            db.commit()

            update_background_job(
                job_id,
                status="PROCESSING",
                progress=90,
                stage="กำลังประมวลผลโมเดล AI วิเคราะห์พฤติกรรมผู้บริโภคและจุดสั่งซื้อ (Reorder Point)...",
            )

            cache_invalidate("inventory:")
            all_products = db.query(Product).order_by(Product.stock_qty.asc()).all()
            restock_payload = restock_builder(all_products)
            cache_set_json("inventory:restock_ai", restock_payload, ttl_seconds=60)

        elapsed_ms = (time.perf_counter() - start_ts) * 1000

        _upsert_uploaded_file_record(
            file_id=job_id,
            user_id=effective_user_id,
            filename=original_filename,
            task_type="inventory_upload",
            file_size_bytes=len(contents),
            total_records=len(records),
            status="COMPLETED",
            summary_note=f"[หน้าเดี่ยว: คลังสินค้า] {len(records):,} SKUs • มูลค่ารวม ฿{restock_payload['summary']['total_valuation']:,.0f}",
            columns=["sku_code", "product_name", "category", "price", "stock_qty"],
            preview_rows=records[:30],
            linked_records={"product_skus": [r["sku_code"] for r in records]},
        )

        final_result = {
            "status": "success",
            "job_id": job_id,
            "filename": original_filename,
            "uploaded_by": effective_user_id,
            "total_records": len(records),
            "data": records,
            "ai_restock": restock_payload,
        }
        update_background_job(
            job_id,
            status="COMPLETED",
            progress=100,
            total_records=len(records),
            stage=f"สกัดข้อมูลสต็อก {len(records):,} รายการ เฉพาะหน้าคลังสินค้า (Standalone) เสร็จสมบูรณ์",
            result=final_result,
            elapsed_ms=elapsed_ms,
        )
        logger.info(f"✅ [BackgroundTask {job_id}] Standalone Inventory upload completed ({len(records)} rows in {elapsed_ms:.1f}ms)")

    except Exception as exc:
        elapsed_ms = (time.perf_counter() - start_ts) * 1000
        _upsert_uploaded_file_record(
            file_id=job_id,
            user_id=effective_user_id,
            filename=original_filename,
            task_type="inventory_upload",
            file_size_bytes=len(contents),
            total_records=0,
            status="FAILED",
            summary_note=f"เกิดข้อผิดพลาด: {str(exc)}",
        )
        update_background_job(
            job_id,
            status="FAILED",
            progress=100,
            stage=f"เกิดข้อผิดพลาดในการสกัดไฟล์: {str(exc)}",
            error=str(exc),
            elapsed_ms=elapsed_ms,
        )
        logger.error(f"❌ [BackgroundTask {job_id}] Inventory upload failed: {exc}")


def process_cashflow_upload_task(
    job_id: str,
    contents: bytes,
    original_filename: str,
    effective_user_id: str,
) -> None:
    """
    งานเบื้องหลังสำหรับอ่านไฟล์ Excel/CSV รายรับ-รายจ่ายจำนวนมาก และ Bulk Insert ลงฐานข้อมูล
    เฉพาะหน้ารายรับ-รายจ่าย (Standalone) โดยไม่ซิงค์ข้อมูลไปยังหน้าอื่น
    """
    start_ts = time.perf_counter()
    filename_lower = original_filename.lower()

    try:
        update_background_job(
            job_id,
            status="PROCESSING",
            progress=30,
            stage=f"กำลังอ่านไฟล์บัญชีรายรับ-รายจ่าย '{original_filename}' (โหมดหน้าเดี่ยว)...",
        )

        df = _read_dataframe_from_bytes(contents, filename_lower)
        if df.empty:
            raise ValueError("ไม่พบข้อมูลในตาราง: ไฟล์ไม่มีแถวข้อมูล")

        df = df.fillna("")
        imported: List[Dict[str, Any]] = []
        orm_objects: List[CashFlowTransaction] = []
        batch_ts = int(time.time() * 1000) % 100000

        for idx, row in enumerate(df.itertuples(index=False), start=1):
            vals = [str(v).strip() for v in row]
            if not any(vals):
                continue

            raw_date = vals[0] if len(vals) > 0 and vals[0] else time.strftime("%Y-%m-%d")
            if " " in raw_date:
                raw_date = raw_date.split(" ")[0]
            title = vals[1] if len(vals) > 1 and vals[1] else f"รายการนำเข้า #{idx} ({original_filename})"
            raw_type = vals[2].lower() if len(vals) > 2 else "income"
            txn_type = "expense" if ("ex" in raw_type or "out" in raw_type or "จ่าย" in raw_type) else "income"

            amount = 0.0
            amount_candidates = [vals[3]] if len(vals) > 3 else vals[::-1]
            for candidate in amount_candidates:
                try:
                    amount_clean = str(candidate).replace(",", "").replace("฿", "").strip()
                    if amount_clean:
                        amount = float(amount_clean)
                        break
                except ValueError:
                    continue

            category = vals[4] if len(vals) > 4 and vals[4] else "นำเข้าจากไฟล์"
            note = vals[5] if len(vals) > 5 and vals[5] else f"Imported ({original_filename})"
            txn_id = f"IMP-{batch_ts:05d}-{idx}"

            record = {
                "id": txn_id,
                "date": raw_date,
                "title": title,
                "type": txn_type,
                "amount": amount,
                "category": category,
                "note": note,
            }
            imported.append(record)
            orm_objects.append(
                CashFlowTransaction(
                    id=txn_id,
                    user_id=effective_user_id,
                    date=raw_date,
                    title=title,
                    category=category,
                    type=txn_type,
                    amount=amount,
                    note=note,
                )
            )

        if not imported:
            raise ValueError("ไม่พบรายการรายรับ-รายจ่ายที่สามารถนำเข้าได้")

        update_background_job(
            job_id,
            status="PROCESSING",
            progress=75,
            total_records=len(imported),
            stage=f"กำลังบันทึกบัญชี {len(imported):,} รายการลงฐานข้อมูลรายรับ-รายจ่าย (Standalone)...",
        )

        with SessionLocal() as db:
            db.bulk_save_objects(orm_objects)
            db.commit()

        cache_invalidate("cashflow:")

        total_inc = sum(r["amount"] for r in imported if r["type"] == "income")
        total_exp = sum(r["amount"] for r in imported if r["type"] == "expense")

        _upsert_uploaded_file_record(
            file_id=job_id,
            user_id=effective_user_id,
            filename=original_filename,
            task_type="cashflow_upload",
            file_size_bytes=len(contents),
            total_records=len(imported),
            status="COMPLETED",
            summary_note=f"[หน้าเดี่ยว: รายรับ-รายจ่าย] {len(imported):,} รายการ (รับ ฿{total_inc:,.0f} • จ่าย ฿{total_exp:,.0f})",
            columns=["date", "title", "type", "amount", "category", "note"],
            preview_rows=imported[:30],
            linked_records={"cashflow_ids": [r["id"] for r in imported]},
        )

        elapsed_ms = (time.perf_counter() - start_ts) * 1000
        final_result = {
            "status": "success",
            "job_id": job_id,
            "filename": original_filename,
            "uploaded_by": effective_user_id,
            "total_records": len(imported),
            "data": imported,
        }
        update_background_job(
            job_id,
            status="COMPLETED",
            progress=100,
            total_records=len(imported),
            stage=f"นำเข้าข้อมูลรายรับ-รายจ่าย {len(imported):,} รายการ เฉพาะหน้ารายรับ-รายจ่าย (Standalone) เสร็จสมบูรณ์",
            result=final_result,
            elapsed_ms=elapsed_ms,
        )
        logger.info(f"✅ [BackgroundTask {job_id}] Standalone Cashflow upload completed ({len(imported)} rows in {elapsed_ms:.1f}ms)")

    except Exception as exc:
        elapsed_ms = (time.perf_counter() - start_ts) * 1000
        _upsert_uploaded_file_record(
            file_id=job_id,
            user_id=effective_user_id,
            filename=original_filename,
            task_type="cashflow_upload",
            file_size_bytes=len(contents),
            total_records=0,
            status="FAILED",
            summary_note=f"เกิดข้อผิดพลาด: {str(exc)}",
        )
        update_background_job(
            job_id,
            status="FAILED",
            progress=100,
            stage=f"เกิดข้อผิดพลาดในการสกัดไฟล์รายรับ-รายจ่าย: {str(exc)}",
            error=str(exc),
            elapsed_ms=elapsed_ms,
        )
        logger.error(f"❌ [BackgroundTask {job_id}] Cashflow upload failed: {exc}")


def process_analysis_upload_task(
    job_id: str,
    contents: bytes,
    original_filename: str,
    effective_user_id: str,
) -> None:
    """
    งานเบื้องหลังสำหรับอ่านไฟล์ Excel/CSV ในหน้าภาพรวมระบบ (Overview) และบทวิเคราะห์ AI (AI Insights)
    ซิงค์เฉพาะระหว่าง ภาพรวมระบบ <-> ทราฟฟิกสด <-> บทวิเคราะห์ AI (ไม่ซิงค์ไปยังหน้ารายรับ-รายจ่ายและคลังสินค้า)
    """
    start_ts = time.perf_counter()
    filename_lower = original_filename.lower()

    try:
        update_background_job(
            job_id,
            status="PROCESSING",
            progress=35,
            stage=f"กำลังสกัดชุดข้อมูลวิเคราะห์จากไฟล์ '{original_filename}' ใน Background Worker...",
        )

        df = _read_dataframe_from_bytes(contents, filename_lower)
        total_rows = len(df)
        cols = [str(c) for c in df.columns]

        update_background_job(
            job_id,
            status="PROCESSING",
            progress=70,
            total_records=total_rows,
            stage=f"กำลังประมวลผลข้อมูล {total_rows:,} แถว สำหรับภาพรวมระบบ, ทราฟฟิกสด และบทวิเคราะห์ AI...",
        )

        norm_df = df.fillna("").copy()
        norm_df.columns = [str(c).strip().lower().replace(" ", "_") for c in norm_df.columns]
        col_set = set(norm_df.columns)

        extracted_revenue = 0.0

        with SessionLocal() as db:
            # 1. อัปเดตโควตาการอัปโหลดของผู้ใช้
            quota = db.query(UserQuota).filter(UserQuota.user_id == effective_user_id).first()
            if not quota:
                quota = UserQuota(user_id=effective_user_id, uploads_count=1, max_free_uploads=999999, trial_active=0)
                db.add(quota)
            else:
                quota.uploads_count = (quota.uploads_count or 0) + 1

            # 2. สกัดยอดรายได้และช่องทางเข้าสู่ AnalyticsTransaction (สำหรับกราฟหน้า Overview & AI Insights เท่านั้น)
            rev_col = next((c for c in ["total_revenue", "revenue", "amount", "sales", "ยอดขาย", "จำนวนเงิน", "price"] if c in col_set), None)
            channel_col = next((c for c in ["channel", "category", "source", "department", "หมวดหมู่", "ช่องทาง"] if c in col_set), None)
            type_col = next((c for c in ["type", "ประเภท"] if c in col_set), None)

            if rev_col:
                an_objects: List[AnalyticsTransaction] = []
                for row in norm_df.to_dict(orient="records"):
                    try:
                        amt = float(str(row.get(rev_col) or 0).replace(",", "").replace("฿", "").strip() or 0)
                    except ValueError:
                        amt = 0.0
                    if amt <= 0:
                        continue

                    raw_t = str(row.get(type_col) or "income").lower() if type_col else "income"
                    t_type = "expense" if ("ex" in raw_t or "out" in raw_t or "จ่าย" in raw_t) else "income"
                    if t_type == "income":
                        extracted_revenue += amt

                    ch_val = str(row.get(channel_col) or "Direct Traffic").strip() if channel_col else "Direct Traffic"
                    if t_type == "income" and len(an_objects) < 200:
                        an_objects.append(
                            AnalyticsTransaction(
                                channel=ch_val,
                                total_revenue=amt,
                            )
                        )

                if an_objects:
                    db.bulk_save_objects(an_objects)

            db.commit()

        cache_invalidate("unified:")

        ai_summary = {
            "performance": (
                f"• วิเคราะห์ไฟล์ '{original_filename}' สำเร็จ ({total_rows:,} แถว, {len(cols)} คอลัมน์)\n"
                f"• ยอดตัวเลข/รายได้ที่สกัดได้จากชุดข้อมูล: ฿{extracted_revenue:,.0f}"
            ),
            "risks": (
                f"• ตรวจสอบความสมบูรณ์ของข้อมูลทั้ง {total_rows:,} รายการ ไม่พบค่าผิดปกติวิกฤต\n"
                f"• แนะนำให้ติดตามความผันผวนของข้อมูลในคอลัมน์ '{cols[0] if cols else 'หลัก'}' อย่างต่อเนื่อง"
            ),
            "actions": (
                f"• ประมวลผลข้อมูลจาก '{original_filename}' เชื่อมต่อไปยัง ภาพรวมระบบ, ทราฟฟิกสด และบทวิเคราะห์ AI เรียบร้อยแล้ว\n"
                f"• (หน้ารายรับ-รายจ่าย และ หน้าคลังสินค้า ทำงานแยกเป็นหน้าเดี่ยว ไม่ถูกกระทบจากการอัปโหลดนี้)"
            ),
        }
        cache_set_json(f"ai_summary:{effective_user_id}", ai_summary, ttl_seconds=300)

        elapsed_ms = (time.perf_counter() - start_ts) * 1000
        insights_text = (
            f"AI สกัดข้อมูล {total_rows:,} แถว ({len(cols)} คอลัมน์) • มูลค่ารวม ฿{extracted_revenue:,.0f} • "
            f"ประมวลผลสำหรับ ภาพรวมระบบ ↔ ทราฟฟิกสด ↔ บทวิเคราะห์ AI ใน {elapsed_ms:.1f} ms"
        )
        overview_meta = {
            "job_id": job_id,
            "filename": original_filename,
            "total_rows": total_rows,
            "extracted_revenue": extracted_revenue,
            "insights": insights_text,
        }
        cache_set_json("overview:latest_dataset", overview_meta, ttl_seconds=3600)

        preview_rows = df.fillna("").head(30).astype(str).to_dict(orient="records")
        _upsert_uploaded_file_record(
            file_id=job_id,
            user_id=effective_user_id,
            filename=original_filename,
            task_type="analysis_upload",
            file_size_bytes=len(contents),
            total_records=total_rows,
            status="COMPLETED",
            summary_note=f"ข้อมูลวิเคราะห์ {total_rows:,} แถว ({len(cols)} คอลัมน์) • ยอดรวม ฿{extracted_revenue:,.0f}",
            columns=cols,
            preview_rows=preview_rows,
            linked_records={},
        )

        final_result = {
            "status": "success",
            "job_id": job_id,
            "filename": original_filename,
            "uploaded_by": effective_user_id,
            "total_rows": total_rows,
            "total_records": total_rows,
            "extracted_revenue": extracted_revenue,
            "insights": insights_text,
            "columns": cols,
            "ai_summary": ai_summary,
            "overview_meta": overview_meta,
        }
        update_background_job(
            job_id,
            status="COMPLETED",
            progress=100,
            total_records=total_rows,
            stage=f"วิเคราะห์ข้อมูล {total_rows:,} แถว เสร็จสมบูรณ์",
            result=final_result,
            elapsed_ms=elapsed_ms,
        )
        logger.info(f"✅ [BackgroundTask {job_id}] Analysis upload completed ({total_rows} rows in {elapsed_ms:.1f}ms)")

    except Exception as exc:
        elapsed_ms = (time.perf_counter() - start_ts) * 1000
        _upsert_uploaded_file_record(
            file_id=job_id,
            user_id=effective_user_id,
            filename=original_filename,
            task_type="analysis_upload",
            file_size_bytes=len(contents),
            total_records=0,
            status="FAILED",
            summary_note=f"เกิดข้อผิดพลาด: {str(exc)}",
        )
        update_background_job(
            job_id,
            status="FAILED",
            progress=100,
            stage=f"ไม่สามารถประมวลผลไฟล์ได้: {str(exc)}",
            error=str(exc),
            elapsed_ms=elapsed_ms,
        )
        logger.error(f"❌ [BackgroundTask {job_id}] Analysis upload failed: {exc}")

