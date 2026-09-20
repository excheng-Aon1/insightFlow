import os
import csv
import io
from dotenv import load_dotenv
from fastapi import FastAPI, Depends, HTTPException, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy.orm import Session
from sqlalchemy import text
from google import genai
import uuid
from datetime import datetime, timedelta

from database import engine, get_db

load_dotenv()

api_key = os.getenv("AIzaSyDU7m_vjd34Tl43HD2KdFDzgJWExV88d4s")
client = genai.Client(api_key=api_key) if api_key else None

app = FastAPI(title="InsightFlow Gatekeeper Engine")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 1. โครงสร้างตาราง (รวมตาราง user_quotas สำหรับคุมการใช้งานฟรี)
with engine.connect() as conn:
    conn.execute(text("""
    CREATE TABLE IF NOT EXISTS user_quotas (
        user_id TEXT PRIMARY KEY,
        files_uploaded INTEGER DEFAULT 0,
        trial_started_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        is_paid_active INTEGER DEFAULT 0
    );
    """))
    conn.execute(text("""
    CREATE TABLE IF NOT EXISTS subscriptions (
        subscription_id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        user_email TEXT,
        plan_tier TEXT NOT NULL,
        billing_cycle TEXT NOT NULL,
        amount REAL NOT NULL,
        status TEXT DEFAULT 'active',
        current_period_start TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        current_period_end TIMESTAMP,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    """))
    conn.execute(text("""
    CREATE TABLE IF NOT EXISTS payment_invoices (
        invoice_id TEXT PRIMARY KEY,
        subscription_id TEXT,
        user_id TEXT NOT NULL,
        amount_paid REAL NOT NULL,
        currency TEXT DEFAULT 'THB',
        payment_method TEXT NOT NULL,
        transaction_ref TEXT,
        paid_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    """))
    conn.commit()

# ฟังก์ชันตรวจสอบสิทธิ์และนับโควตา
def check_and_consume_quota(user_id: str, db: Session):
    # ตรวจสอบว่ามีการสมัครแพ็กเกจแบบชำระเงินที่ยังใช้งานได้อยู่หรือไม่
    sub = db.execute(text("""
        SELECT * FROM subscriptions 
        WHERE user_id = :uid AND status = 'active' AND current_period_end > CURRENT_TIMESTAMP
    """), {"uid": user_id}).mappings().first()

    if sub:
        return {"allowed": True, "type": "paid", "plan": sub["plan_tier"]}

    # ถ้าไม่มีแพ็กเกจ ตรวจสอบสิทธิ์ Free Trial (1 ไฟล์ / 7 วัน)
    quota = db.execute(text("SELECT * FROM user_quotas WHERE user_id = :uid"), {"uid": user_id}).mappings().first()
    
    now = datetime.utcnow()
    if not quota:
        # เริ่มนับสิทธิ์ 7 วันครั้งแรก
        db.execute(text("""
            INSERT INTO user_quotas (user_id, files_uploaded, trial_started_at, is_paid_active)
            VALUES (:uid, 1, :now, 0)
        """), {"uid": user_id, "now": now})
        db.commit()
        return {"allowed": True, "type": "trial_first_time"}

    # ตรวจสอบเงื่อนไข 7 วัน
    started_at = datetime.fromisoformat(str(quota["trial_started_at"]))
    if now > started_at + timedelta(days=7):
        return {"allowed": False, "reason": "หมดระยะเวลาทดลองใช้ฟรี 7 วันแล้ว กรุณาสมัครแพ็กเกจเพื่อใช้งานต่อ"}

    # ตรวจสอบจำนวนไฟล์ (จำกัด 1 ไฟล์)
    if quota["files_uploaded"] >= 1:
        return {"allowed": False, "reason": "คุณใช้สิทธิ์วิเคราะห์ฟรีครบ 1 ไฟล์ (1,000 แถว) แล้ว กรุณาสมัครแพ็กเกจเพื่อปลดล็อก"}

    # บันทึกการใช้โควตาฟรี
    db.execute(text("UPDATE user_quotas SET files_uploaded = files_uploaded + 1 WHERE user_id = :uid"), {"uid": user_id})
    db.commit()
    return {"allowed": True, "type": "trial"}

@app.post("/upload")
async def upload_dataset(
    file: UploadFile = File(...), 
    user_id: str = Form("GUEST-EXEC-001"),
    db: Session = Depends(get_db)
):
    # 1. ตรวจสอบสิทธิ์ Paywall ก่อนประมวลผล
    quota_status = check_and_consume_quota(user_id, db)
    if not quota_status["allowed"]:
        raise HTTPException(status_code=403, detail=quota_status["reason"])

    # 2. อ่านไฟล์และตรวจสอบแถวข้อมูล (ไม่เกิน 1,000 แถว)
    content = await file.read()
    try:
        decoded = content.decode('utf-8-sig', errors='ignore')
        reader = list(csv.reader(io.StringIO(decoded)))
        total_rows = max(len(reader) - 1, 0)
        
        # ตรวจสอบข้อกำหนด 1,000 แถวสำหรับ Free Trial
        if quota_status.get("type") != "paid" and total_rows > 1000:
            raise HTTPException(
                status_code=400, 
                detail=f"ไฟล์ของคุณมี {total_rows:,} แถว (สิทธิ์ทดลองใช้ฟรีกำหนดไม่เกิน 1,000 แถว) กรุณาอัปเกรดแพ็กเกจ Business Scale"
            )
    except HTTPException as he:
        raise he
    except Exception:
        total_rows = 1000

    insights = f"AI วิเคราะห์ชุดข้อมูล {file.filename} ({total_rows:,} แถว) สำเร็จ: ยอดคำสั่งซื้อและทราฟฟิกภาพรวมมีเสถียรภาพสูง ประสิทธิภาพช่องทาง Affiliate มีกำไรสุทธิสูงสุด"
    
    return {
        "status": "success",
        "filename": file.filename,
        "total_rows": total_rows,
        "insights": insights
    }

# Endpoint ชำระเงินเพื่อปลดล็อก
class CheckoutRequest(BaseModel):
    user_id: str
    user_email: str
    plan: str
    billing_cycle: str
    payment_method: str
    card_number: str = ""
    card_holder: str = ""

@app.post("/api/checkout")
def process_checkout(payload: CheckoutRequest, db: Session = Depends(get_db)):
    price_table = {"Starter": 9900.0, "Business_Scale": 29900.0, "Enterprise": 99000.0}
    base_price = price_table.get(payload.plan, 9900.0)
    
    amount = base_price * 12 * 0.85 if payload.billing_cycle == "yearly" else base_price
    duration_days = 365 if payload.billing_cycle == "yearly" else 30

    sub_id = f"SUB-{uuid.uuid4().hex[:8].upper()}"
    txn_id = f"TXN-{uuid.uuid4().hex[:8].upper()}"
    period_end = datetime.utcnow() + timedelta(days=duration_days)

    db.execute(text("""
        INSERT INTO subscriptions (subscription_id, user_id, user_email, plan_tier, billing_cycle, amount, status, current_period_end)
        VALUES (:sub_id, :uid, :email, :plan, :cycle, :amt, 'active', :period_end)
    """), {"sub_id": sub_id, "uid": payload.user_id, "email": payload.user_email, "plan": payload.plan, "cycle": payload.billing_cycle, "amt": amount, "period_end": period_end})

    db.execute(text("""
        INSERT INTO payment_invoices (invoice_id, subscription_id, user_id, amount_paid, payment_method, transaction_ref)
        VALUES (:inv_id, :sub_id, :uid, :amt, :method, :ref)
    """), {"inv_id": f"INV-{uuid.uuid4().hex[:8].upper()}", "sub_id": sub_id, "uid": payload.user_id, "amt": amount, "method": payload.payment_method, "ref": txn_id})

    # ปรับสถานะใน user_quotas ให้เป็น Paid Active ทันที
    db.execute(text("""
        INSERT INTO user_quotas (user_id, files_uploaded, is_paid_active)
        VALUES (:uid, 0, 1)
        ON CONFLICT(user_id) DO UPDATE SET is_paid_active = 1
    """), {"uid": payload.user_id})
    db.commit()

    return {
        "status": "success",
        "transaction_id": txn_id,
        "amount": amount,
        "message": f"ปลดล็อกระบบสำเร็จ! แพ็กเกจ {payload.plan} พร้อมใช้งานทันที"
    }

# เช็คสถานะโควตาของผู้ใช้ปัจจุบัน
@app.get("/api/quota/{user_id}")
def get_user_quota(user_id: str, db: Session = Depends(get_db)):
    sub = db.execute(text("SELECT * FROM subscriptions WHERE user_id = :uid AND status = 'active' AND current_period_end > CURRENT_TIMESTAMP"), {"uid": user_id}).mappings().first()
    if sub:
        return {"is_paid": True, "plan": sub["plan_tier"], "status": "Unlimited Enterprise Active"}

    quota = db.execute(text("SELECT * FROM user_quotas WHERE user_id = :uid"), {"uid": user_id}).mappings().first()
    if not quota:
        return {"is_paid": False, "files_used": 0, "remaining_files": 1, "days_left": 7}

    started_at = datetime.fromisoformat(str(quota["trial_started_at"]))
    days_passed = (datetime.utcnow() - started_at).days
    days_left = max(7 - days_passed, 0)
    remaining_files = max(1 - quota["files_uploaded"], 0)

    return {
        "is_paid": False,
        "files_used": quota["files_uploaded"],
        "remaining_files": remaining_files,
        "days_left": days_left,
        "is_blocked": remaining_files <= 0 or days_left <= 0
    }