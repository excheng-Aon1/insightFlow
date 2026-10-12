"""
Gunicorn + Uvicorn Workers Production Configuration for InsightFlow Enterprise
==============================================================================
สำหรับรันบนเซิร์ฟเวอร์จริง (DigitalOcean, AWS, GCP, Render, Docker/Kubernetes)
คำนวณจำนวน Uvicorn Workers อัตโนมัติตามสูตรมาตรฐาน:
    workers = (2 * CPU_CORES) + 1
พร้อมระบบป้องกันการแชร์ Connection Pool ข้ามโปรเซส (post_fork SQLAlchemy dispose)
และการรีไซเคิล Worker อัตโนมัติ (max_requests + max_requests_jitter) เพื่อป้องกัน Memory Leak
"""

import multiprocessing
import os
from dotenv import load_dotenv

load_dotenv()

# ------------------------------------------------------------------------------
# 1. NETWORK BINDING
# ------------------------------------------------------------------------------
HOST = os.getenv("HOST", "0.0.0.0")
PORT = os.getenv("PORT", "8000")
bind = os.getenv("GUNICORN_BIND", f"{HOST}:{PORT}")

# จำนวนคิว Socket ที่รอรับการเชื่อมต่อพร้อมกันระดับพันคำขอ
backlog = int(os.getenv("GUNICORN_BACKLOG", "2048"))

# ------------------------------------------------------------------------------
# 2. WORKER ALLOCATION (GUNICORN + UVICORN WORKERS)
# ------------------------------------------------------------------------------
CPU_CORES = multiprocessing.cpu_count()
DEFAULT_WORKERS = (2 * CPU_CORES) + 1

# สามารถกำหนดผ่าน WEB_CONCURRENCY หรือ GUNICORN_WORKERS ใน .env / Cloud Env
workers = int(os.getenv("WEB_CONCURRENCY", os.getenv("GUNICORN_WORKERS", str(DEFAULT_WORKERS))))

# ใช้ UvicornWorker เพื่อให้แต่ละ Worker รัน ASGI Event Loop (uvloop/asyncio) ความเร็วสูง
worker_class = os.getenv("GUNICORN_WORKER_CLASS", "uvicorn.workers.UvicornWorker")

# จำนวน Threads ต่อ Worker และจำนวนการเชื่อมต่อพร้อมกันต่อ Worker
threads = int(os.getenv("GUNICORN_THREADS", "2"))
worker_connections = int(os.getenv("GUNICORN_WORKER_CONNECTIONS", "1000"))

# ------------------------------------------------------------------------------
# 3. TIMEOUTS, KEEPALIVE & GRACEFUL RECYCLING (MEMORY LEAK PROTECTION)
# ------------------------------------------------------------------------------
timeout = int(os.getenv("GUNICORN_TIMEOUT", "120"))
graceful_timeout = int(os.getenv("GUNICORN_GRACEFUL_TIMEOUT", "30"))
keepalive = int(os.getenv("GUNICORN_KEEPALIVE", "5"))

# รีสตาร์ท Worker อัตโนมัติเมื่อประมวลผลครบ N คำขอ (พร้อมสุ่ม Jitter เพื่อไม่ให้รีสตาร์ทพร้อมกันทุกตัว)
max_requests = int(os.getenv("GUNICORN_MAX_REQUESTS", "2000"))
max_requests_jitter = int(os.getenv("GUNICORN_MAX_REQUESTS_JITTER", "200"))

# ปิด preload_app หรือล้าง Pool ใน post_fork เพื่อให้แต่ละ Worker สร้าง Connection Pool ของตัวเองอย่างปลอดภัย
preload_app = False

# ------------------------------------------------------------------------------
# 4. LOGGING & PROCESS NAMING
# ------------------------------------------------------------------------------
accesslog = os.getenv("GUNICORN_ACCESS_LOG", "-")
errorlog = os.getenv("GUNICORN_ERROR_LOG", "-")
loglevel = os.getenv("GUNICORN_LOG_LEVEL", "info")
proc_name = "insightflow-enterprise-api"
forwarded_allow_ips = "*"
control_socket_disable = True


# ------------------------------------------------------------------------------
# 5. LIFECYCLE HOOKS (SQLALCHEMY QUEUEPOOL & REDIS FORK SAFETY)
# ------------------------------------------------------------------------------
def on_starting(server):
    server.log.info(
        f"🚀 [InsightFlow Gunicorn Master] Starting on {bind} | "
        f"CPU Cores: {CPU_CORES} | Uvicorn Workers: {workers} | "
        f"Worker Class: {worker_class}"
    )


def post_fork(server, worker):
    """
    เมื่อ Gunicorn ทำการ fork() โปรเซส Uvicorn Worker ใหม่:
    ต้องล้าง Connection Pool เดิมของ SQLAlchemy (engine.dispose())
    เพื่อให้แต่ละ Worker ถือครองการเชื่อมต่อ PostgreSQL / MySQL แยกกันอย่างปลอดภัย 100%
    """
    try:
        from database import engine
        engine.dispose()
        server.log.info(
            f"✅ [Uvicorn Worker PID={worker.pid}] Initialized isolated SQLAlchemy QueuePool"
        )
    except Exception as exc:
        server.log.warning(f"⚠️ [Uvicorn Worker PID={worker.pid}] Pool dispose warning: {exc}")


def worker_int(worker):
    worker.log.info(f"⚡ [Uvicorn Worker PID={worker.pid}] Received SIGINT/SIGQUIT — graceful shutdown")

