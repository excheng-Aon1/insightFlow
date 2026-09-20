from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# สร้างไฟล์ insightflow.db ขึ้นมาในโฟลเดอร์ backend อัตโนมัติ
DATABASE_URL = "sqlite:///./insightflow.db"

engine = create_engine(
    DATABASE_URL, 
    connect_args={"check_same_thread": False}
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()