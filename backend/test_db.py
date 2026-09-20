import os
import pandas as pd
from dotenv import load_dotenv
from sqlalchemy import create_engine, text

load_dotenv()

db_url = os.getenv("DATABASE_URL")
print(f"กำลังเชื่อมต่อไปที่: {db_url.split('@')[-1] if db_url and '@' in db_url else 'URL ไม่ถูกต้อง'}")

try:
    engine = create_engine(db_url)
    with engine.connect() as conn:
        result = conn.execute(text("SELECT 1;"))
        print("✅ เชื่อมต่อ Clever Cloud MySQL สำเร็จเรียบร้อย!")
except Exception as e:
    print("❌ เชื่อมต่อไม่สำเร็จ:", e)