# ==============================================================================
# File: backend/etl_pipeline.py
# System: InsightFlow Automated Data Pipeline & ETL Engine (Data Engineering Lite)
# Description: Automated extraction, cleaning, transformation, and ingestion
#              for multi-source enterprise data (POS, Ads, Inventory, Sheets)
# ==============================================================================

import os
import sys
import uuid
import time
import json
import logging
import argparse
from datetime import datetime, timedelta
from typing import Dict, Any, List, Optional, Tuple

import pandas as pd
import numpy as np

# Ensure backend path is in sys.path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from database import (
    engine,
    SessionLocal,
    init_db,
    EtlJobLog,
    CashFlowTransaction,
    PosOrder,
    Product,
    AnalyticsTransaction,
)

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] [ETL-ENGINE] %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)
logger = logging.getLogger("insightflow.etl")

# ------------------------------------------------------------------------------
# 1. DATA EXTRACTORS (Multi-Source Extraction Layer)
# ------------------------------------------------------------------------------

def extract_pos_data(limit: int = 50) -> pd.DataFrame:
    """
    ดึงข้อมูลจากระบบ POS (Point of Sale)
    รองรับทั้งการเชื่อมต่อ Real-time API และการจำลองข้อมูลจริงที่มีความสกปรก (Dirty Data)
    เพื่อทดสอบระบบ Data Cleaning
    """
    pos_api_url = os.getenv("POS_API_URL")
    pos_api_key = os.getenv("POS_API_KEY")

    if pos_api_url and pos_api_key:
        try:
            import requests
            resp = requests.get(
                pos_api_url,
                headers={"Authorization": f"Bearer {pos_api_key}"},
                timeout=10,
            )
            if resp.status_code == 200:
                data = resp.json()
                logger.info(f"📥 Extracted {len(data)} raw records from live POS API: {pos_api_url}")
                return pd.DataFrame(data)
        except Exception as e:
            logger.warning(f"⚠️ Failed to connect to POS API ({e}), falling back to simulated dirty POS batch.")

    # จำลอง Raw Data ที่มีความเละเทะตามสถานการณ์จริง:
    # - มีแถวซ้ำซ้อน (Duplicate IDs)
    # - วันที่ปน พ.ศ. (2567, 2568)
    # - ตัวเลขมีเครื่องหมาย ฿, คอมมา, หรือเว้นวรรค
    # - ค่าว่าง (Null / None)
    raw_samples = []
    base_date = datetime.now() - timedelta(days=7)
    
    products_pool = [
        ("SKU-COF-01", "Espresso Premium Blend", "เครื่องดื่ม", "฿ 120.00"),
        ("SKU-COF-02", "Matcha Ceremonial Latte", "เครื่องดื่ม", "145.00"),
        ("SKU-BAK-01", "Almond Butter Croissant", "เบเกอรี่", "฿ 95"),
        ("SKU-BAK-02", "Truffle Sourdough Toast", "อาหารว่าง", "240.00 ฿"),
        ("SKU-DES-01", "Basque Burnt Cheesecake", "ของหวาน", " 180.00 "),
    ]

    for i in range(limit):
        day_offset = i % 7
        curr_dt = base_date + timedelta(days=day_offset, hours=(i * 3) % 24)
        
        # ผสมรูปแบบวันที่: ค.ศ. สลับ พ.ศ.
        if i % 3 == 0:
            date_str = f"{curr_dt.day:02d}/{curr_dt.month:02d}/{curr_dt.year + 543}"  # พ.ศ.
        elif i % 3 == 1:
            date_str = curr_dt.strftime("%Y-%m-%d %H:%M:%S")
        else:
            date_str = f"{curr_dt.month:02d}-{curr_dt.day:02d}-{curr_dt.year}"

        prod = products_pool[i % len(products_pool)]
        receipt_no = f"POS-{curr_dt.strftime('%Y%m%d')}-{(i % 12) + 1:03d}"  # จงใจให้มี receipt_no ซ้ำกัน (Duplicates)

        raw_samples.append({
            "receipt_id": receipt_no,
            "raw_date": date_str,
            "sku": prod[0] if i % 9 != 0 else None,  # จำลองค่าว่าง
            "product_name": prod[1],
            "category": prod[2] if i % 7 != 0 else "",  # จำลอง category หาย
            "raw_amount": prod[3],
            "payment_method": "PromptPay" if i % 2 == 0 else "Credit Card / QR",
            "branch": "สาขาหลัก สุขุมวิท 21" if i % 4 != 0 else "สาขา สยามพารากอน",
        })

    logger.info(f"📥 Generated {len(raw_samples)} raw POS batch records (including intentional dirty patterns).")
    return pd.DataFrame(raw_samples)


def extract_marketing_ads_data(days: int = 7) -> pd.DataFrame:
    """
    ดึงข้อมูลค่าใช้จ่ายและผลตอบแทนโฆษณา (Facebook Ads, TikTok Ads, Google Ads)
    """
    ads_records = []
    channels = ["Facebook Ads", "TikTok Ads", "Google Search Ads"]
    today = datetime.now()

    for d in range(days):
        dt = today - timedelta(days=d)
        for ch in channels:
            # สร้างข้อมูลดิบค่าแอด
            spend = np.random.uniform(500, 3500)
            clicks = int(spend / np.random.uniform(3.5, 12.0))
            conversions = int(clicks * np.random.uniform(0.02, 0.08))
            revenue = conversions * np.random.uniform(350, 1200)

            ads_records.append({
                "campaign_id": f"CAMP-{ch[:3].upper()}-{dt.strftime('%Y%m%d')}",
                "channel": ch,
                "date": f"{dt.year + 543}/{dt.month:02d}/{dt.day:02d}" if d % 2 == 0 else dt.strftime("%Y-%m-%d"),
                "spend": f"฿ {spend:,.2f}",
                "clicks": clicks,
                "conversions": conversions,
                "revenue": f"{revenue:,.2f} ฿",
            })

    logger.info(f"📥 Extracted {len(ads_records)} raw marketing campaign records.")
    return pd.DataFrame(ads_records)


def extract_inventory_stock_data() -> pd.DataFrame:
    """ดึงข้อมูลสต็อกสินค้าและความเคลื่อนไหวคลังสินค้า"""
    sample_stock = [
        {"sku": "SKU-COF-01", "name": "Espresso Premium Blend", "stock": " 140 ", "price": "120.00"},
        {"sku": "SKU-COF-02", "name": "Matcha Ceremonial Latte", "stock": "85", "price": "฿ 145.00"},
        {"sku": "SKU-BAK-01", "name": "Almond Butter Croissant", "stock": "42", "price": "95"},
        {"sku": "SKU-BAK-02", "name": "Truffle Sourdough Toast", "stock": "18", "price": "240.00"},
        {"sku": "SKU-DES-01", "name": "Basque Burnt Cheesecake", "stock": "25", "price": "180"},
    ]
    return pd.DataFrame(sample_stock)


# ------------------------------------------------------------------------------
# 2. TRANSFORM & DATA CLEANING ENGINE (Data Engineering Lite)
# ------------------------------------------------------------------------------

class DataCleaner:
    """ชุดเครื่องมือทำความสะอาดข้อมูลอัตโนมัติ (Automated Data Cleansing Toolkit)"""

    @staticmethod
    def clean_numeric_currency(series: pd.Series) -> pd.Series:
        """ลบสัญลักษณ์สกุลเงิน (฿, $, THB), เครื่องหมายจุลภาค (,), และช่องว่าง แล้วแปลงเป็น Float"""
        cleaned = (
            series.astype(str)
            .str.replace("฿", "", regex=False)
            .str.replace("$", "", regex=False)
            .str.replace("THB", "", regex=False)
            .str.replace(",", "", regex=False)
            .str.strip()
        )
        return pd.to_numeric(cleaned, errors="coerce").fillna(0.0)

    @staticmethod
    def clean_and_normalize_date(series: pd.Series) -> pd.Series:
        """
        แปลงรูปแบบวันที่หลากหลายให้อยู่ในมาตรฐาน ISO-8601 (YYYY-MM-DD)
        และแปลง พ.ศ. (เกิน 2400) ให้เป็น ค.ศ. อัตโนมัติ
        """
        def parse_single_date(val: Any) -> str:
            if pd.isna(val) or val is None or str(val).strip() == "":
                return datetime.utcnow().strftime("%Y-%m-%d")

            val_str = str(val).strip()
            # ตัดเวลาออกหากมี
            val_clean = val_str.split(" ")[0].replace("/", "-")

            parts = val_clean.split("-")
            if len(parts) == 3:
                try:
                    p0, p1, p2 = int(parts[0]), int(parts[1]), int(parts[2])
                    # ตรวจสอบว่าตัวแรกหรือตัวท้ายเป็นปี
                    if p0 > 1000:
                        year = p0 - 543 if p0 > 2400 else p0
                        month, day = p1, p2
                    else:
                        day, month = p0, p1
                        year = p2 - 543 if p2 > 2400 else p2
                    
                    return f"{year:04d}-{min(max(month, 1), 12):02d}-{min(max(day, 1), 31):02d}"
                except Exception:
                    pass

            # Fallback ผ่าน pd.to_datetime
            try:
                parsed = pd.to_datetime(val_str, errors="coerce")
                if pd.notna(parsed):
                    year = parsed.year - 543 if parsed.year > 2400 else parsed.year
                    return f"{year:04d}-{parsed.month:02d}-{parsed.day:02d}"
            except Exception:
                pass

            return datetime.utcnow().strftime("%Y-%m-%d")

        return series.apply(parse_single_date)

    @classmethod
    def clean_pos_dataset(cls, df: pd.DataFrame) -> Tuple[pd.DataFrame, int]:
        """ทำความสะอาดข้อมูล POS เต็มรูปแบบ พร้อมนับจำนวนแถวซ้ำที่ถูกตัดออก"""
        raw_count = len(df)
        if raw_count == 0:
            return df, 0

        # 1. ตัดแถวซ้ำ (Deduplication) โดยอิงตาม receipt_id
        df = df.drop_duplicates(subset=["receipt_id"], keep="last").copy()
        duplicates_dropped = raw_count - len(df)

        # 2. ทำความสะอาดวันที่
        if "raw_date" in df.columns:
            df["date"] = cls.clean_and_normalize_date(df["raw_date"])

        # 3. ทำความสะอาดยอดเงิน
        if "raw_amount" in df.columns:
            df["amount"] = cls.clean_numeric_currency(df["raw_amount"])

        # 4. จัดการค่าว่าง (Imputation)
        df["sku"] = df["sku"].fillna("SKU-GEN-01")
        df["category"] = df["category"].replace("", np.nan).fillna("สินค้าทั่วไป")
        df["product_name"] = df["product_name"].fillna("รายการไม่ระบุชื่อ")
        df["payment_method"] = df["payment_method"].fillna("เงินสด / พร้อมเพย์")

        return df, duplicates_dropped

    @classmethod
    def clean_marketing_dataset(cls, df: pd.DataFrame) -> Tuple[pd.DataFrame, int]:
        """ทำความสะอาดข้อมูลค่าโฆษณา Marketing Ads"""
        raw_count = len(df)
        if raw_count == 0:
            return df, 0

        df = df.drop_duplicates(subset=["campaign_id", "date"], keep="last").copy()
        duplicates_dropped = raw_count - len(df)

        if "date" in df.columns:
            df["date"] = cls.clean_and_normalize_date(df["date"])

        if "spend" in df.columns:
            df["spend"] = cls.clean_numeric_currency(df["spend"])

        if "revenue" in df.columns:
            df["revenue"] = cls.clean_numeric_currency(df["revenue"])

        df["clicks"] = pd.to_numeric(df["clicks"], errors="coerce").fillna(0).astype(int)
        df["conversions"] = pd.to_numeric(df["conversions"], errors="coerce").fillna(0).astype(int)

        return df, duplicates_dropped


# ------------------------------------------------------------------------------
# 3. LOAD & UPSERT ENGINE (Database Persistence Layer)
# ------------------------------------------------------------------------------

def load_pos_to_db(df: pd.DataFrame, user_id: str = "GUEST-EXEC-001") -> int:
    """
    บันทึกข้อมูล POS ที่คลีนแล้วลงฐานข้อมูล SQL
    (บันทึกลงทั้ง PosOrder และ CashFlowTransaction เพื่อสะท้อนกระแสเงินสดทันที)
    """
    init_db()
    loaded_count = 0
    with SessionLocal() as db:
        for _, row in df.iterrows():
            receipt_id = str(row.get("receipt_id", f"POS-{uuid.uuid4().hex[:8]}"))
            amount = float(row.get("amount", 0.0))
            txn_date = str(row.get("date", datetime.utcnow().strftime("%Y-%m-%d")))
            prod_name = str(row.get("product_name", "สินค้าทั่วไป"))
            cat = str(row.get("category", "สินค้าทั่วไป"))
            pay_method = str(row.get("payment_method", "พร้อมเพย์"))

            # 1. Upsert เข้าตาราง PosOrder
            existing_order = db.query(PosOrder).filter(PosOrder.receipt_id == receipt_id).first()
            items_payload = json.dumps([{
                "name": prod_name,
                "price": amount,
                "qty": 1,
                "category": cat,
            }], ensure_ascii=False)

            if existing_order:
                existing_order.total_amount = amount
                existing_order.subtotal = amount * 0.93
                existing_order.tax = amount * 0.07
                existing_order.payment_method = pay_method
                existing_order.items_json = items_payload
            else:
                new_order = PosOrder(
                    receipt_id=receipt_id,
                    user_id=user_id,
                    subtotal=amount * 0.93,
                    tax=amount * 0.07,
                    total_amount=amount,
                    payment_method=pay_method,
                    items_json=items_payload,
                )
                db.add(new_order)

            # 2. Sync เข้าตาราง CashFlowTransaction (Income)
            cashflow_id = f"CF-POS-{receipt_id}"
            existing_cf = db.query(CashFlowTransaction).filter(CashFlowTransaction.id == cashflow_id).first()
            if existing_cf:
                existing_cf.amount = amount
                existing_cf.date = txn_date
            else:
                new_cf = CashFlowTransaction(
                    id=cashflow_id,
                    user_id=user_id,
                    date=txn_date,
                    title=f"ขายหน้าร้าน ({prod_name})",
                    category=cat,
                    type="income",
                    amount=amount,
                    note=f"Receipt: {receipt_id} via {pay_method} [ETL Auto-Sync]",
                )
                db.add(new_cf)

            loaded_count += 1

        db.commit()

    return loaded_count


def load_marketing_to_db(df: pd.DataFrame, user_id: str = "GUEST-EXEC-001") -> int:
    """บันทึกข้อมูลโฆษณาที่คลีนแล้วลงตาราง CashFlowTransaction (Expenses) และ AnalyticsTransaction"""
    init_db()
    loaded_count = 0
    with SessionLocal() as db:
        for _, row in df.iterrows():
            camp_id = str(row.get("campaign_id", f"CAMP-{uuid.uuid4().hex[:6]}"))
            spend = float(row.get("spend", 0.0))
            rev = float(row.get("revenue", 0.0))
            txn_date = str(row.get("date", datetime.utcnow().strftime("%Y-%m-%d")))
            ch = str(row.get("channel", "Digital Ads"))

            # บันทึกเป็นรายจ่ายค่าโฆษณา
            cf_id = f"CF-ADS-{camp_id}"
            existing_cf = db.query(CashFlowTransaction).filter(CashFlowTransaction.id == cf_id).first()
            if existing_cf:
                existing_cf.amount = spend
                existing_cf.date = txn_date
            else:
                new_cf = CashFlowTransaction(
                    id=cf_id,
                    user_id=user_id,
                    date=txn_date,
                    title=f"ค่าโฆษณา {ch}",
                    category="การตลาดและโฆษณา",
                    type="expense",
                    amount=spend,
                    note=f"Campaign: {camp_id} Clicks: {row.get('clicks', 0)} Conv: {row.get('conversions', 0)} [ETL Auto-Sync]",
                )
                db.add(new_cf)

            # บันทึกลงตารางสรุปช่องทางขาย
            new_analytic = AnalyticsTransaction(
                channel=ch,
                total_revenue=rev,
            )
            db.add(new_analytic)
            loaded_count += 1

        db.commit()

    return loaded_count


def load_inventory_to_db(df: pd.DataFrame, user_id: str = "GUEST-EXEC-001") -> int:
    """ซิงค์ข้อมูลสินค้าและสต็อกลงตาราง Product"""
    init_db()
    loaded_count = 0
    with SessionLocal() as db:
        for _, row in df.iterrows():
            sku = str(row.get("sku", "")).strip()
            if not sku:
                continue
            name = str(row.get("name", "สินค้าทั่วไป")).strip()
            stock = int(DataCleaner.clean_numeric_currency(pd.Series([row.get("stock", 0)]))[0])
            price = float(DataCleaner.clean_numeric_currency(pd.Series([row.get("price", 0)]))[0])

            prod = db.query(Product).filter(Product.sku_code == sku).first()
            if prod:
                prod.name = name
                prod.stock_qty = stock
                prod.price = price
            else:
                new_prod = Product(
                    id=f"PROD-{sku}",
                    user_id=user_id,
                    sku_code=sku,
                    name=name,
                    category="เครื่องดื่มและเบเกอรี่",
                    price=price,
                    stock_qty=stock,
                )
                db.add(new_prod)
            loaded_count += 1

        db.commit()

    return loaded_count


# ------------------------------------------------------------------------------
# 4. PIPELINE ORCHESTRATOR & EXECUTION ENTRYPOINT
# ------------------------------------------------------------------------------

def run_etl_pipeline(
    sources: Optional[List[str]] = None,
    user_id: str = "GUEST-EXEC-001"
) -> Dict[str, Any]:
    """
    ฟังก์ชันหลักในการรัน Data Pipeline ครบทุกขั้นตอน:
    1. Extract ข้อมูลจากแหล่งต่างๆ (POS, Ads, Inventory)
    2. Transform & Data Cleaning (ตัดข้อมูลซ้ำ, ปรับฟอร์แมตเงิน/วันที่, เติมค่าว่าง)
    3. Load & Upsert เข้า SQL Database
    4. บันทึกประวัติการทำงานลงตาราง EtlJobLog
    """
    if not sources:
        sources = ["POS_SYSTEM", "FACEBOOK_ADS", "TIKTOK_ADS", "WAREHOUSE_ERP"]

    pipeline_start_time = time.time()
    results = {
        "status": "SUCCESS",
        "timestamp": datetime.utcnow().isoformat(),
        "total_raw_rows": 0,
        "total_cleaned_rows": 0,
        "total_duplicates_dropped": 0,
        "duration_seconds": 0.0,
        "sources_processed": [],
    }

    logger.info("================================================================")
    logger.info("🚀 STARTING AUTOMATED DATA PIPELINE & ETL ENGINE RUN")
    logger.info(f"Target Sources: {sources} | User Context: {user_id}")
    logger.info("================================================================")

    init_db()

    for src in sources:
        src_start = time.time()
        raw_count = 0
        cleaned_count = 0
        dups_dropped = 0
        summary_msg = ""
        status = "SUCCESS"

        try:
            if src == "POS_SYSTEM":
                # 1. POS Pipeline
                raw_df = extract_pos_data(limit=60)
                raw_count = len(raw_df)
                cleaned_df, dups_dropped = DataCleaner.clean_pos_dataset(raw_df)
                cleaned_count = load_pos_to_db(cleaned_df, user_id=user_id)
                summary_msg = f"POS Synced {cleaned_count} orders (filtered {dups_dropped} duplicate receipts)."

            elif src in ["FACEBOOK_ADS", "TIKTOK_ADS", "MARKETING_ADS"]:
                # 2. Marketing Ads Pipeline
                raw_df = extract_marketing_ads_data(days=5)
                raw_count = len(raw_df)
                cleaned_df, dups_dropped = DataCleaner.clean_marketing_dataset(raw_df)
                cleaned_count = load_marketing_to_db(cleaned_df, user_id=user_id)
                summary_msg = f"Ads Synced {cleaned_count} campaign metrics (cleansed spend & conversion figures)."

            elif src in ["WAREHOUSE_ERP", "INVENTORY_STOCK"]:
                # 3. Inventory Pipeline
                raw_df = extract_inventory_stock_data()
                raw_count = len(raw_df)
                cleaned_count = load_inventory_to_db(raw_df, user_id=user_id)
                dups_dropped = 0
                summary_msg = f"Inventory Synced {cleaned_count} SKU items with real-time stock counts."

            else:
                summary_msg = f"Source {src} is in standby or awaiting webhook."

        except Exception as err:
            status = "FAILED"
            summary_msg = f"ETL Pipeline Error on {src}: {str(err)}"
            logger.error(summary_msg, exc_info=True)

        duration_ms = (time.time() - src_start) * 1000

        # บันทึกประวัติลง EtlJobLog
        try:
            with SessionLocal() as db:
                log_entry = EtlJobLog(
                    id=f"ETL-{src[:4]}-{int(time.time() * 1000)}",
                    source=src,
                    status=status,
                    raw_rows=raw_count,
                    cleaned_rows=cleaned_count,
                    duplicates_dropped=dups_dropped,
                    duration_ms=round(duration_ms, 2),
                    summary_note=summary_msg,
                )
                db.add(log_entry)
                db.commit()
        except Exception as log_err:
            logger.warning(f"Failed to record EtlJobLog ({log_err})")

        results["total_raw_rows"] += raw_count
        results["total_cleaned_rows"] += cleaned_count
        results["total_duplicates_dropped"] += dups_dropped
        results["sources_processed"].append({
            "source": src,
            "status": status,
            "raw_rows": raw_count,
            "cleaned_rows": cleaned_count,
            "duplicates_dropped": dups_dropped,
            "duration_ms": round(duration_ms, 2),
            "summary": summary_msg,
        })

    total_duration = time.time() - pipeline_start_time
    results["duration_seconds"] = round(total_duration, 3)

    logger.info("================================================================")
    logger.info(
        f"✅ ETL PIPELINE COMPLETED IN {results['duration_seconds']}s | "
        f"Raw: {results['total_raw_rows']} -> Cleaned: {results['total_cleaned_rows']} | "
        f"Duplicates Discarded: {results['total_duplicates_dropped']}"
    )
    logger.info("================================================================")

    return results


# ------------------------------------------------------------------------------
# 5. CLI INTERFACE (For Cronjob / GitHub Actions / Terminal Execution)
# ------------------------------------------------------------------------------

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="InsightFlow Automated ETL Pipeline Runner")
    parser.add_argument(
        "--source",
        choices=["all", "pos", "ads", "inventory"],
        default="all",
        help="Specify which data source to extract and clean",
    )
    parser.add_argument(
        "--user-id",
        default="GUEST-EXEC-001",
        help="Target tenant user ID",
    )
    args = parser.parse_args()

    if args.source == "all":
        target_sources = ["POS_SYSTEM", "FACEBOOK_ADS", "TIKTOK_ADS", "WAREHOUSE_ERP"]
    elif args.source == "pos":
        target_sources = ["POS_SYSTEM"]
    elif args.source == "ads":
        target_sources = ["FACEBOOK_ADS", "TIKTOK_ADS"]
    elif args.source == "inventory":
        target_sources = ["WAREHOUSE_ERP"]
    else:
        target_sources = ["POS_SYSTEM"]

    res = run_etl_pipeline(sources=target_sources, user_id=args.user_id)
    print("\n--- Pipeline Summary JSON ---")
    print(json.dumps(res, indent=2, ensure_ascii=False))
