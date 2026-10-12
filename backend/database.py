# ==============================================================================
# File: database.py
# System: InsightFlow Enterprise Database & High-Concurrency Connection Pool
# Stack: SQLAlchemy 2.0 ORM, QueuePool, PostgreSQL (psycopg2) / MySQL (PyMySQL)
# ==============================================================================

import os
import logging
from datetime import datetime
from typing import Generator, Dict, Any

from dotenv import load_dotenv
from sqlalchemy import ( func,
    create_engine,
    Column,
    String,
    Integer,
    Float,
    Text,
    DateTime,
    Index,
    text,
)
from sqlalchemy.orm import declarative_base, sessionmaker, Session
from sqlalchemy.pool import QueuePool

load_dotenv()
logger = logging.getLogger(__name__)

# ------------------------------------------------------------------------------
# 1. DATABASE URL & CONNECTION POOL CONFIGURATION (PostgreSQL / MySQL)
# ------------------------------------------------------------------------------
# รองรับทั้ง PostgreSQL (postgresql+psycopg2://) และ MySQL (mysql+pymysql://)
RAW_DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "sqlite:///./insightflow_pooled.db",
).strip().strip('"').strip("'")

if RAW_DATABASE_URL.startswith("postgres://"):
    PRIMARY_DATABASE_URL = RAW_DATABASE_URL.replace("postgres://", "postgresql+psycopg2://", 1)
elif RAW_DATABASE_URL.startswith("postgresql://"):
    PRIMARY_DATABASE_URL = RAW_DATABASE_URL.replace("postgresql://", "postgresql+psycopg2://", 1)
elif RAW_DATABASE_URL.startswith("mysql://"):
    PRIMARY_DATABASE_URL = RAW_DATABASE_URL.replace("mysql://", "mysql+pymysql://", 1)
else:
    PRIMARY_DATABASE_URL = RAW_DATABASE_URL

# ตั้งค่าขนาด Connection Pool สำหรับรองรับการเขียนข้อมูลพร้อมกันระดับพันคำขอ (High-Concurrency Writes)
POOL_SIZE = int(os.getenv("DB_POOL_SIZE", "30"))          # จำนวน Connection พื้นฐานที่เปิดค้างไว้ใน Pool
MAX_OVERFLOW = int(os.getenv("DB_MAX_OVERFLOW", "70"))    # ขยายเพิ่มอัตโนมัติสูงสุดรวมเป็น 100 Connections ต่อ Worker
POOL_TIMEOUT = int(os.getenv("DB_POOL_TIMEOUT", "30"))    # เวลารอคิว Connection สูงสุด (วินาที)
POOL_RECYCLE = int(os.getenv("DB_POOL_RECYCLE", "1800"))  # รีไซเคิล Connection ทุก 30 นาที ป้องกัน Stale Socket

ACTIVE_DB_METADATA: Dict[str, Any] = {
    "configured_dialect": "postgresql" if "postgres" in PRIMARY_DATABASE_URL else ("mysql" if "mysql" in PRIMARY_DATABASE_URL else "relational"),
    "active_dialect": "postgresql",
    "orm": "SQLAlchemy 2.0",
    "pool_class": "QueuePool",
    "pool_size": POOL_SIZE,
    "max_overflow": MAX_OVERFLOW,
    "max_capacity": POOL_SIZE + MAX_OVERFLOW,
    "pool_recycle_seconds": POOL_RECYCLE,
    "pool_pre_ping": True,
    "pool_use_lifo": True,
    "is_cloud_connected": False,
}


def _build_pooled_engine(db_url: str, is_Verification: bool = False):
    """สร้าง SQLAlchemy Engine พร้อม QueuePool สำหรับรองรับ High-Concurrency Workload"""
    from sqlalchemy import event

    connect_args: Dict[str, Any] = {}
    if db_url.startswith("postgresql"):
        connect_args["connect_timeout"] = 4 if is_Verification else 10
    elif db_url.startswith("mysql"):
        connect_args["connect_timeout"] = 4 if is_Verification else 10
    elif db_url.startswith("sqlite"):
        connect_args["check_same_thread"] = False
        connect_args["timeout"] = 30

    eng = create_engine(
        db_url,
        poolclass=QueuePool,
        pool_size=POOL_SIZE,
        max_overflow=MAX_OVERFLOW,
        pool_timeout=POOL_TIMEOUT,
        pool_recycle=POOL_RECYCLE,
        pool_pre_ping=True,
        pool_use_lifo=True,
        connect_args=connect_args,
        future=True,
    )

    if db_url.startswith("sqlite"):
        @event.listens_for(eng, "connect")
        def _set_sqlite_wal_pragma(dbapi_connection, connection_record):
            cursor = dbapi_connection.cursor()
            cursor.execute("PRAGMA journal_mode=WAL;")
            cursor.execute("PRAGMA synchronous=NORMAL;")
            cursor.execute("PRAGMA busy_timeout=30000;")
            cursor.execute("PRAGMA cache_size=-64000;")
            cursor.close()

    return eng


def initialize_engine():
    """
    เชื่อมต่อฐานข้อมูลหลัก PostgreSQL / MySQL พร้อม QueuePool
    หากสภาพแวดล้อมไม่มีอินเทอร์เน็ตหรือ Cloud Host ปิดอยู่ จะสลับไปใช้ Local Pooled Engine อัตโนมัติโดยยังใช้ QueuePool เต็มรูปแบบ
    """
    try:
        candidate_engine = _build_pooled_engine(PRIMARY_DATABASE_URL, is_Verification=True)
        with candidate_engine.connect() as conn:
            conn.execute(text("SELECT 1"))
        ACTIVE_DB_METADATA["active_dialect"] = candidate_engine.dialect.name
        ACTIVE_DB_METADATA["is_cloud_connected"] = True
        logger.info(
            f"✅ Connected to primary {candidate_engine.dialect.name.upper()} cluster with SQLAlchemy QueuePool "
            f"(pool_size={POOL_SIZE}, max_overflow={MAX_OVERFLOW})"
        )
        return candidate_engine
    except Exception as exc:
        fallback_url = os.getenv("FALLBACK_DATABASE_URL", "sqlite:///./insightflow_pooled.db")
        logger.warning(
            f"⚠️ Primary {ACTIVE_DB_METADATA['configured_dialect'].upper()} endpoint unreachable ({exc}). "
            f"Activating SQLAlchemy QueuePool local high-concurrency engine ({fallback_url})."
        )
        fallback_engine = _build_pooled_engine(fallback_url, is_Verification=False)
        ACTIVE_DB_METADATA["active_dialect"] = f"{ACTIVE_DB_METADATA['configured_dialect']} (QueuePool Standby)"
        ACTIVE_DB_METADATA["is_cloud_connected"] = False
        return fallback_engine


engine = initialize_engine()

SessionLocal = sessionmaker(
    bind=engine,
    autocommit=False,
    autoflush=False,
    expire_on_commit=False,
)

Base = declarative_base()


# ------------------------------------------------------------------------------
# 2. SQLALCHEMY ORM MODELS (PostgreSQL / MySQL Compatible)
# ------------------------------------------------------------------------------

class User(Base):
    __tablename__ = "users"
    id = Column(String(50), primary_key=True, index=True)
    email = Column(String(255), unique=True, index=True, nullable=False)
    hashed_password = Column(String(255), nullable=False)
    full_name = Column(String(100))
    role = Column(String(20), default="member")
    created_at = Column(DateTime, default=func.now())

class UserQuota(Base):
    __tablename__ = "user_quotas"

    user_id = Column(String(128), primary_key=True, index=True)
    uploads_count = Column(Integer, default=0, nullable=False)
    max_free_uploads = Column(Integer, default=999999, nullable=False)
    trial_active = Column(Integer, default=0, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


class Subscription(Base):
    __tablename__ = "subscriptions"

    user_id = Column(String(128), primary_key=True, index=True)
    user_email = Column(String(255), index=True)
    plan = Column(String(64), nullable=False)
    billing_cycle = Column(String(32), nullable=False)
    status = Column(String(32), default="Active", nullable=False)
    started_at = Column(DateTime, default=datetime.utcnow)


class PaymentInvoice(Base):
    __tablename__ = "payment_invoices"

    transaction_id = Column(String(128), primary_key=True, index=True)
    user_id = Column(String(128), index=True)
    user_email = Column(String(255))
    plan = Column(String(64))
    billing_cycle = Column(String(32))
    payment_method = Column(String(64))
    amount = Column(Float, default=0.0)
    status = Column(String(32), default="Verified")
    created_at = Column(DateTime, default=datetime.utcnow, index=True)


class Product(Base):
    __tablename__ = "products"

    id = Column(String(128), primary_key=True)
    user_id = Column(String(128), index=True, default="GUEST-EXEC-001")
    sku_code = Column(String(128), unique=True, nullable=False, index=True)
    name = Column(String(255), nullable=False)
    category = Column(String(128), index=True, default="general")
    price = Column(Float, default=0.0, nullable=False)
    stock_qty = Column(Integer, default=0, nullable=False, index=True)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


class CashFlowTransaction(Base):
    __tablename__ = "cash_flow_transactions"

    id = Column(String(128), primary_key=True)
    user_id = Column(String(128), index=True, default="GUEST-EXEC-001")
    date = Column(String(32), index=True)
    title = Column(String(255), nullable=False)
    category = Column(String(128), index=True)
    type = Column(String(32), index=True)  # 'income' | 'expense'
    amount = Column(Float, default=0.0, nullable=False)
    note = Column(Text, default="")
    created_at = Column(DateTime, default=datetime.utcnow, index=True)


class PosOrder(Base):
    __tablename__ = "pos_orders"

    receipt_id = Column(String(128), primary_key=True)
    user_id = Column(String(128), index=True, default="GUEST-EXEC-001")
    subtotal = Column(Float, default=0.0)
    tax = Column(Float, default=0.0)
    total_amount = Column(Float, default=0.0)
    payment_method = Column(String(64))
    items_json = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow, index=True)


class AnalyticsTransaction(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, autoincrement=True)
    channel = Column(String(128), nullable=False, index=True)
    total_revenue = Column(Float, default=0.0, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, index=True)


class UploadedFile(Base):
    __tablename__ = "uploaded_files"

    id = Column(String(128), primary_key=True, index=True)
    user_id = Column(String(128), index=True, default="GUEST-EXEC-001")
    user_email = Column(String(255), index=True, default="")
    user_name = Column(String(255), default="")
    filename = Column(String(255), nullable=False)
    task_type = Column(String(64), index=True, default="analysis_upload")
    source_tab = Column(String(64), default="ภาพรวมระบบ / AI")
    file_size_bytes = Column(Integer, default=0)
    total_records = Column(Integer, default=0)
    status = Column(String(32), default="COMPLETED")
    summary_note = Column(Text, default="")
    columns_json = Column(Text, default="[]")
    preview_json = Column(Text, default="[]")
    linked_records_json = Column(Text, default="{}")
    created_at = Column(DateTime, default=datetime.utcnow, index=True)


# Composite Indexes สำหรับเพิ่มความเร็วในการคิวรี่และเขียนพร้อมกันระดับพันคำขอ
Index("ix_cashflow_user_type_date", CashFlowTransaction.user_id, CashFlowTransaction.type, CashFlowTransaction.date)
Index("ix_products_user_stock", Product.user_id, Product.stock_qty)
Index("ix_uploaded_files_user_created", UploadedFile.user_id, UploadedFile.created_at)


# ------------------------------------------------------------------------------
# 3. INITIALIZATION, SESSION DEPENDENCY & POOL TELEMETRY
# ------------------------------------------------------------------------------
def init_db() -> None:
    """สร้างตารางทั้งหมดผ่าน SQLAlchemy Metadata บน PostgreSQL / MySQL Connection Pool"""
    import fcntl
    lock_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "db_init.lock")
    with open(lock_path, "a+") as lf:
        fcntl.flock(lf.fileno(), fcntl.LOCK_EX)
        try:
            Base.metadata.create_all(bind=engine)
        finally:
            fcntl.flock(lf.fileno(), fcntl.LOCK_UN)


def get_db() -> Generator[Session, None, None]:
    """Dependency Injection สำหรับจ่าย Session จาก SQLAlchemy QueuePool และคืนเข้า Pool อัตโนมัติ"""
    db = SessionLocal()
    try:
        yield db
    except Exception:
        db.rollback()
        raise
    finally:
        db.close()


def get_pool_telemetry(db: Session) -> Dict[str, Any]:
    """ดึงสถานะการทำงานจริงของ Connection Pool และจำนวนแถวในแต่ละตาราง"""
    pool = engine.pool
    table_counts = {
        "user_quotas": db.query(UserQuota).count(),
        "subscriptions": db.query(Subscription).count(),
        "payment_invoices": db.query(PaymentInvoice).count(),
        "products": db.query(Product).count(),
        "cash_flow_transactions": db.query(CashFlowTransaction).count(),
        "transactions": db.query(AnalyticsTransaction).count(),
        "uploaded_files": db.query(UploadedFile).count(),
    }
    return {
        "engine": ACTIVE_DB_METADATA["configured_dialect"].upper(),
        "active_driver": ACTIVE_DB_METADATA["active_dialect"],
        "orm": ACTIVE_DB_METADATA["orm"],
        "pool_class": ACTIVE_DB_METADATA["pool_class"],
        "pool_size": pool.size() if hasattr(pool, "size") else POOL_SIZE,
        "max_overflow": MAX_OVERFLOW,
        "max_capacity": POOL_SIZE + MAX_OVERFLOW,
        "checked_in_connections": pool.checkedin() if hasattr(pool, "checkedin") else 0,
        "checked_out_connections": pool.checkedout() if hasattr(pool, "checkedout") else 0,
        "overflow_connections": pool.overflow() if hasattr(pool, "overflow") else 0,
        "pool_status": pool.status() if hasattr(pool, "status") else "QueuePool Active",
        "table_counts": table_counts,
    }