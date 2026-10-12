# ==============================================================================
# File: redis_cache.py
# System: InsightFlow Enterprise Redis OTP Store, TTL Cache & Rate Limiter
# Stack: Redis (ConnectionPool + TTL), SlowAPI (3/5minutes Rate Limiting)
# ==============================================================================

import os
import time
import json
import logging
import threading
from typing import Optional, Any, Dict, Tuple

from dotenv import load_dotenv
from fastapi import Request, HTTPException, status
from fastapi.responses import JSONResponse

load_dotenv()
logger = logging.getLogger(__name__)

# ------------------------------------------------------------------------------
# 1. REDIS CONFIGURATION & CONNECTION POOL
# ------------------------------------------------------------------------------
REDIS_URL = os.getenv("REDIS_URL", "redis://127.0.0.1:6379/0").strip()
OTP_TTL_SECONDS = int(os.getenv("OTP_TTL_SECONDS", "180"))               # อายุรหัส OTP: 180 วินาที (3 นาที)
OTP_RATE_LIMIT_STR = os.getenv("OTP_RATE_LIMIT", "3/5minutes")           # สูงสุด 3 ครั้ง ต่อ 5 นาที
OTP_RATE_LIMIT_MAX = int(os.getenv("OTP_RATE_LIMIT_MAX", "3"))           # 3 ครั้ง
OTP_RATE_LIMIT_WINDOW = int(os.getenv("OTP_RATE_LIMIT_WINDOW", "300"))   # 300 วินาที (5 นาที)
CACHE_DEFAULT_TTL = int(os.getenv("REDIS_CACHE_TTL", "60"))              # อายุ Cache เริ่มต้น: 60 วินาที


class InMemoryRedisAdapter:
    """
    Redis-Compatible Multi-Worker Shared TTL Store พร้อมระบบจัดการ TTL (Time-To-Live) อัตโนมัติ
    ทำหน้าที่เป็น High-Availability Standby กรณีที่เซิร์ฟเวอร์ Redis ภายนอกไม่ได้เปิดใช้งาน
    รองรับการทำงานร่วมกับ Gunicorn + Multiple Uvicorn Workers โดยซิงค์ข้อมูลข้ามทุก Worker Process
    รองรับคำสั่งมาตรฐานของ Redis: setex, get, delete, ttl, incr, expire, keys, ping
    """

    def __init__(self) -> None:
        import sqlite3
        import fcntl
        from contextlib import contextmanager

        self._lock = threading.Lock()
        base_dir = os.path.dirname(os.path.abspath(__file__))
        self._db_path = os.path.join(base_dir, "redis_shared_ttl.db")
        self._lock_path = os.path.join(base_dir, "redis_shared_ttl.lock")
        self._sqlite3 = sqlite3
        self._fcntl = fcntl
        self._contextmanager = contextmanager
        self._init_shared_store()

    def _get_conn(self):
        @self._contextmanager
        def _conn_ctx():
            with self._lock:
                with open(self._lock_path, "a+") as lock_file:
                    self._fcntl.flock(lock_file.fileno(), self._fcntl.LOCK_EX)
                    conn = self._sqlite3.connect(self._db_path, timeout=30.0, check_same_thread=False)
                    try:
                        yield conn
                    finally:
                        conn.close()
                        self._fcntl.flock(lock_file.fileno(), self._fcntl.LOCK_UN)

        return _conn_ctx()

    def _init_shared_store(self) -> None:
        with self._get_conn() as conn:
            conn.execute("PRAGMA journal_mode=WAL;")
            conn.execute("PRAGMA synchronous=NORMAL;")
            conn.execute("PRAGMA busy_timeout=30000;")
            conn.execute(
                """
                CREATE TABLE IF NOT EXISTS redis_kv_store (
                    k TEXT PRIMARY KEY,
                    v TEXT NOT NULL,
                    expires_at REAL
                )
                """
            )
            conn.execute(
                "CREATE INDEX IF NOT EXISTS ix_redis_kv_expires ON redis_kv_store (expires_at)"
            )
            conn.commit()

    def ping(self) -> bool:
        return True

    def setex(self, key: str, time_seconds: int, value: str) -> bool:
        expires_at = time.time() + int(time_seconds)
        with self._get_conn() as conn:
            conn.execute(
                "INSERT OR REPLACE INTO redis_kv_store (k, v, expires_at) VALUES (?, ?, ?)",
                (key, str(value), expires_at),
            )
            conn.commit()
        return True

    def get(self, key: str) -> Optional[str]:
        now = time.time()
        with self._get_conn() as conn:
            row = conn.execute(
                "SELECT v, expires_at FROM redis_kv_store WHERE k = ?",
                (key,),
            ).fetchone()
            if not row:
                return None
            val, expires_at = row
            if expires_at is not None and now >= expires_at:
                conn.execute("DELETE FROM redis_kv_store WHERE k = ?", (key,))
                conn.commit()
                return None
            return val

    def delete(self, *keys: str) -> int:
        if not keys:
            return 0
        with self._get_conn() as conn:
            placeholders = ",".join("?" for _ in keys)
            cur = conn.execute(
                f"DELETE FROM redis_kv_store WHERE k IN ({placeholders})",
                tuple(keys),
            )
            conn.commit()
            return cur.rowcount or 0

    def ttl(self, key: str) -> int:
        now = time.time()
        with self._get_conn() as conn:
            row = conn.execute(
                "SELECT expires_at FROM redis_kv_store WHERE k = ?",
                (key,),
            ).fetchone()
            if not row:
                return -2
            (expires_at,) = row
            if expires_at is None:
                return -1
            if now >= expires_at:
                conn.execute("DELETE FROM redis_kv_store WHERE k = ?", (key,))
                conn.commit()
                return -2
            return max(0, int(round(expires_at - now)))

    def incr(self, key: str) -> int:
        now = time.time()
        with self._get_conn() as conn:
            row = conn.execute(
                "SELECT v, expires_at FROM redis_kv_store WHERE k = ?",
                (key,),
            ).fetchone()
            if not row or (row[1] is not None and now >= row[1]):
                conn.execute(
                    "INSERT OR REPLACE INTO redis_kv_store (k, v, expires_at) VALUES (?, ?, ?)",
                    (key, "1", None),
                )
                conn.commit()
                return 1
            new_val = int(row[0]) + 1
            conn.execute(
                "UPDATE redis_kv_store SET v = ? WHERE k = ?",
                (str(new_val), key),
            )
            conn.commit()
            return new_val

    def expire(self, key: str, time_seconds: int) -> bool:
        now = time.time()
        expires_at = now + int(time_seconds)
        with self._get_conn() as conn:
            row = conn.execute(
                "SELECT expires_at FROM redis_kv_store WHERE k = ?",
                (key,),
            ).fetchone()
            if not row or (row[0] is not None and now >= row[0]):
                conn.execute("DELETE FROM redis_kv_store WHERE k = ?", (key,))
                conn.commit()
                return False
            conn.execute(
                "UPDATE redis_kv_store SET expires_at = ? WHERE k = ?",
                (expires_at, key),
            )
            conn.commit()
            return True

    def keys(self, pattern: str = "*") -> list:
        now = time.time()
        prefix = pattern.rstrip("*")
        with self._get_conn() as conn:
            conn.execute(
                "DELETE FROM redis_kv_store WHERE expires_at IS NOT NULL AND expires_at <= ?",
                (now,),
            )
            conn.commit()
            if pattern == "*":
                rows = conn.execute("SELECT k FROM redis_kv_store").fetchall()
            else:
                rows = conn.execute(
                    "SELECT k FROM redis_kv_store WHERE k LIKE ?",
                    (f"{prefix}%",),
                ).fetchall()
            return [r[0] for r in rows]


REDIS_METADATA: Dict[str, Any] = {
    "configured_url": REDIS_URL.split("@")[-1] if "@" in REDIS_URL else REDIS_URL,
    "mode": "Redis Server (ConnectionPool)",
    "is_live_redis": False,
    "otp_ttl_seconds": OTP_TTL_SECONDS,
    "rate_limit_rule": OTP_RATE_LIMIT_STR,
}


def initialize_redis_client():
    """เชื่อมต่อ Redis ผ่าน ConnectionPool พร้อมระบบ Fallback อัตโนมัติหาก Redis Daemon ปิดอยู่"""
    try:
        import redis  # type: ignore

        pool = redis.ConnectionPool.from_url(
            REDIS_URL,
            decode_responses=True,
            max_connections=50,
            socket_connect_timeout=2,
            socket_timeout=2,
        )
        client = redis.Redis(connection_pool=pool)
        client.ping()
        REDIS_METADATA["is_live_redis"] = True
        REDIS_METADATA["mode"] = "Redis Cluster / Server (ConnectionPool)"
        logger.info(f"✅ Connected to Redis server at {REDIS_METADATA['configured_url']}")
        return client
    except Exception as exc:
        logger.warning(
            f"⚠️ Redis server at {REDIS_METADATA['configured_url']} unreachable ({exc}). "
            "Using Redis-Compatible TTL Engine with identical setex/ttl/rate-limit semantics."
        )
        REDIS_METADATA["is_live_redis"] = False
        REDIS_METADATA["mode"] = "Redis TTL Engine (Standby Memory Pool)"
        return InMemoryRedisAdapter()


redis_client = initialize_redis_client()


# ------------------------------------------------------------------------------
# 2. SLOWAPI RATE LIMITER INITIALIZATION (3 requests / 5 minutes)
# ------------------------------------------------------------------------------
def get_client_identifier(request: Request) -> str:
    """ระบุตัวตนผู้เรียกจาก X-Forwarded-For หรือ Client IP สำหรับจำกัด Rate Limit"""
    forwarded = request.headers.get("X-Forwarded-For")
    if forwarded:
        return forwarded.split(",")[0].strip()
    if request.client and request.client.host:
        return request.client.host
    return "127.0.0.1"


try:
    from slowapi import Limiter  # type: ignore
    from slowapi.errors import RateLimitExceeded  # type: ignore

    limiter = Limiter(
        key_func=get_client_identifier,
        default_limits=[],
        storage_uri="memory://",
    )
    SLOWAPI_AVAILABLE = True
except ImportError:
    SLOWAPI_AVAILABLE = False

    class RateLimitExceeded(Exception):  # type: ignore
        def __init__(self, detail: str = "Rate limit exceeded"):
            self.detail = detail

    class _FallbackLimiter:
        """Fallback Decorator กรณีสภาพแวดล้อมยังไม่ได้ติดตั้งแพ็กเกจ slowapi"""

        def limit(self, limit_value: str):
            def decorator(func):
                return func
            return decorator

    limiter = _FallbackLimiter()


async def custom_rate_limit_exceeded_handler(request: Request, exc: Exception) -> JSONResponse:
    """Handler มาตรฐานเมื่อผู้ใช้กดขอ OTP เกินจำนวนที่กำหนดใน slowapi (HTTP 429)"""
    return JSONResponse(
        status_code=status.HTTP_429_TOO_MANY_REQUESTS,
        content={
            "status": "error",
            "error": "rate_limit_exceeded",
            "detail": (
                f"⛔ จำกัดจำนวนการขอรหัส OTP: คุณทำรายการเกินกำหนด ({OTP_RATE_LIMIT_MAX} ครั้งต่อ "
                f"{OTP_RATE_LIMIT_WINDOW // 60} นาที) กรุณารอสักครู่แล้วลองใหม่อีกครั้ง"
            ),
            "retry_after_seconds": OTP_RATE_LIMIT_WINDOW,
        },
    )


# ------------------------------------------------------------------------------
# 3. REDIS OTP MANAGEMENT WITH TTL & RATE LIMIT ENFORCEMENT
# ------------------------------------------------------------------------------
def enforce_otp_rate_limit(client_ip: str, email: str) -> Tuple[int, int]:
    """
    ตรวจสอบและจำกัดจำนวนครั้งการกดขอ OTP ด้วย Redis Counter + TTL
    (สูงสุด 3 ครั้ง ต่อ 5 นาที ต่ออีเมลหรือ IP)
    คืนค่า (current_attempts, remaining_ttl_seconds)
    """
    email_key = f"otp:ratelimit:email:{email.lower().strip()}"
    ip_key = f"otp:ratelimit:ip:{client_ip}"

    # ตรวจสอบจำนวนครั้งของอีเมลนี้ในหน้าต่างเวลา 5 นาที (300 วินาที)
    email_count = redis_client.incr(email_key)
    if email_count == 1:
        redis_client.expire(email_key, OTP_RATE_LIMIT_WINDOW)
    email_ttl = max(1, redis_client.ttl(email_key))

    ip_count = redis_client.incr(ip_key)
    if ip_count == 1:
        redis_client.expire(ip_key, OTP_RATE_LIMIT_WINDOW)
    ip_ttl = max(1, redis_client.ttl(ip_key))

    if email_count > OTP_RATE_LIMIT_MAX or ip_count > OTP_RATE_LIMIT_MAX:
        wait_seconds = max(email_ttl if email_count > OTP_RATE_LIMIT_MAX else 0, ip_ttl if ip_count > OTP_RATE_LIMIT_MAX else 0)
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail=(
                f"⛔ คุณกดขอรหัส OTP เกินกำหนด (สูงสุด {OTP_RATE_LIMIT_MAX} ครั้งต่อ {OTP_RATE_LIMIT_WINDOW // 60} นาที) "
                f"กรุณารออีก {wait_seconds} วินาทีแล้วลองใหม่อีกครั้ง"
            ),
            headers={"Retry-After": str(wait_seconds)},
        )

    return email_count, email_ttl


def save_otp_to_redis(email: str, otp_code: str, ttl_seconds: int = OTP_TTL_SECONDS) -> Dict[str, Any]:
    """บันทึกรหัส OTP ลงใน Redis พร้อมกำหนดเวลาหมดอายุอัตโนมัติ (SETEX + TTL)"""
    redis_key = f"otp:code:{email.lower().strip()}"
    payload = json.dumps(
        {
            "otp": otp_code,
            "email": email.lower().strip(),
            "created_at": int(time.time()),
        }
    )
    redis_client.setex(redis_key, ttl_seconds, payload)
    return {
        "redis_key": redis_key,
        "ttl_seconds": redis_client.ttl(redis_key),
    }


def verify_otp_from_redis(email: str, submitted_otp: str, client_ip: str = "127.0.0.1") -> bool:
    """
    ตรวจสอบรหัส OTP จาก Redis พร้อมป้องกันการสุ่มเดารหัส (Brute-Force Protection):
    - จำกัดการกรอกผิดสูงสุด 5 ครั้งต่อรหัส หากเกินจะยกเลิกรหัสทันทีและล็อกชั่วคราว
    - ใช้ hmac.compare_digest เพื่อป้องกัน Timing Attack
    - หากถูกต้อง จะลบ Key ออกจาก Redis ทันที (One-Time Use)
    """
    import hmac

    email_clean = email.lower().strip()
    redis_key = f"otp:code:{email_clean}"
    fail_key = f"otp:verify_fail:{email_clean}"
    ip_fail_key = f"otp:verify_fail_ip:{client_ip}"

    raw_data = redis_client.get(redis_key)
    remaining_ttl = redis_client.ttl(redis_key)

    if not raw_data or remaining_ttl <= 0:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="⚠️ ไม่พบคำขอรหัส OTP หรือรหัสหมดอายุแล้ว (TTL Expired) กรุณากดขอรหัสใหม่อีกครั้ง",
        )

    try:
        parsed = json.loads(raw_data)
        stored_otp = str(parsed.get("otp", "")).strip()
    except Exception:
        stored_otp = str(raw_data).strip()

    clean_submitted = submitted_otp.strip()
    if not hmac.compare_digest(stored_otp.encode("utf-8"), clean_submitted.encode("utf-8")):
        fail_count = redis_client.incr(fail_key)
        if fail_count == 1:
            redis_client.expire(fail_key, OTP_TTL_SECONDS)
        ip_fails = redis_client.incr(ip_fail_key)
        if ip_fails == 1:
            redis_client.expire(ip_fail_key, 300)

        if fail_count >= 5 or ip_fails >= 10:
            redis_client.delete(redis_key)
            redis_client.delete(fail_key)
            raise HTTPException(
                status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                detail="⛔ กรอกรหัส OTP ผิดเกิน 5 ครั้ง ระบบได้ยกเลิกรหัสนี้เพื่อความปลอดภัย กรุณาขอรหัส OTP ใหม่",
            )
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"❌ รหัส OTP ไม่ถูกต้อง (เหลือโอกาสลองอีก {max(0, 5 - fail_count)} ครั้ง • อายุคงเหลือ {remaining_ttl} วินาที)",
        )

    # ลบรหัสและตัวนับความผิดพลาดออกจาก Redis ทันทีหลังยืนยันสำเร็จ (One-Time Password)
    redis_client.delete(redis_key, fail_key)
    return True


# ------------------------------------------------------------------------------
# 3.5 MULTI-LAYER ANTI-BOT & DDOS SHIELD (WAF + SLIDING WINDOW RATE LIMIT)
# ------------------------------------------------------------------------------
BLOCKED_BOT_SIGNATURES = (
    "sqlmap",
    "nikto",
    "masscan",
    "zgrab",
    "nuclei",
    "dirbuster",
    "gobuster",
    "acunetix",
    "nessus",
    "havij",
    "wfuzz",
    "hydra",
    "nmap",
)


def enforce_anti_bot_shield(request: Request) -> Dict[str, Any]:
    """
    ระบบป้องกันบอทและ DDoS 3 ชั้น (Multi-Layer Anti-Bot Shield):
    1. ตรวจจับและบล็อก User-Agent ของเครื่องมือเจาะระบบอัตโนมัติ (SQLMap, Nikto, Nuclei, Masscan ฯลฯ)
    2. ตรวจสอบบัญชีดำชั่วคราว (Auto-Ban IP TTL) สำหรับ IP ที่ยิงถี่ผิดปกติซ้ำซ้อน
    3. จำกัดอัตราการเรียก API แยกตามความเสี่ยงของ Endpoint (Auth / Upload / SQL / General)
    """
    client_ip = get_client_identifier(request)
    user_agent = (request.headers.get("user-agent") or "").lower()
    path = request.url.path.lower()

    # ชั้นที่ 1: บล็อกเครื่องมือสแกนช่องโหว่และบอทโจมตีทันที
    if any(sig in user_agent for sig in BLOCKED_BOT_SIGNATURES):
        redis_client.incr("security:blocked_bots_total")
        redis_client.setex(f"security:ban:ip:{client_ip}", 600, "malicious_scanner_ua")
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="🛡️ Anti-Bot Shield: ตรวจพบเครื่องมือสแกนอัตโนมัติ คำขอของคุณถูกปฏิเสธ",
        )

    # ชั้นที่ 2: ตรวจสอบว่า IP นี้อยู่ในสถานะถูกระงับชั่วคราว (Auto-Ban) หรือไม่
    ban_key = f"security:ban:ip:{client_ip}"
    if redis_client.get(ban_key):
        ban_ttl = max(1, redis_client.ttl(ban_key))
        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail=f"🛡️ Anti-Bot Shield: IP ของคุณถูกระงับชั่วคราวเนื่องจากส่งคำขอถี่ผิดปกติ (ปลดล็อกใน {ban_ttl} วินาที)",
            headers={"Retry-After": str(ban_ttl)},
        )

    # ชั้นที่ 3: กำหนดเพดาน Rate Limit ต่อ 60 วินาที ตามระดับความสำคัญของ Endpoint
    window_sec = 60
    if any(p in path for p in ("/api/auth/login", "/token", "/register", "/api/auth/verify-otp")):
        bucket = "auth"
        max_req = 200
    elif "upload" in path:
        bucket = "upload"
        max_req = 12
    elif "/api/database/query" in path:
        bucket = "sql"
        max_req = 25
    else:
        bucket = "api"
        max_req = 240

    rl_key = f"security:rl:{bucket}:{client_ip}"
    current_count = redis_client.incr(rl_key)
    if current_count == 1:
        redis_client.expire(rl_key, window_sec)
    ttl_left = max(1, redis_client.ttl(rl_key))

    if current_count > max_req:
        strike_key = f"security:strikes:{client_ip}"
        strikes = redis_client.incr(strike_key)
        if strikes == 1:
            redis_client.expire(strike_key, 300)
        redis_client.incr("security:rate_limited_total")

        # หากฝ่าฝืน Rate Limit ซ้ำเกิน 5 ครั้งใน 5 นาที ให้แบน IP อัตโนมัติ 180 วินาที
        if strikes >= 5:
            redis_client.setex(ban_key, 180, f"excessive_{bucket}_flood")

        raise HTTPException(
            status_code=status.HTTP_429_TOO_MANY_REQUESTS,
            detail=(
                f"🛡️ Anti-Bot Rate Limit: ส่งคำขอหมวด '{bucket}' เกินกำหนด "
                f"({max_req} ครั้ง/นาที) กรุณารอ {ttl_left} วินาที"
            ),
            headers={"Retry-After": str(ttl_left)},
        )

    return {
        "limit": max_req,
        "remaining": max(0, max_req - current_count),
        "reset_seconds": ttl_left,
        "bucket": bucket,
    }


# ------------------------------------------------------------------------------
# 4. REDIS APPLICATION CACHE HELPERS (TTL CACHING)
# ------------------------------------------------------------------------------
def cache_get_json(cache_key: str) -> Optional[Dict[str, Any]]:
    """ดึงข้อมูล JSON จาก Redis Cache หากยังไม่หมดอายุ (TTL > 0)"""
    try:
        raw = redis_client.get(f"cache:{cache_key}")
        if raw:
            return json.loads(raw)
    except Exception as exc:
        logger.debug(f"Redis cache_get_json miss/error: {exc}")
    return None


def cache_set_json(cache_key: str, data: Dict[str, Any], ttl_seconds: int = CACHE_DEFAULT_TTL) -> None:
    """บันทึกข้อมูล JSON ลงใน Redis Cache พร้อมตั้งเวลาหมดอายุ (TTL)"""
    try:
        redis_client.setex(f"cache:{cache_key}", ttl_seconds, json.dumps(data, ensure_ascii=False))
    except Exception as exc:
        logger.debug(f"Redis cache_set_json error: {exc}")


def cache_invalidate(prefix: str = "") -> int:
    """ล้างข้อมูล Redis Cache ที่ขึ้นต้นด้วย prefix เมื่อมีการอัปเดตฐานข้อมูล"""
    try:
        pattern = f"cache:{prefix}*" if prefix else "cache:*"
        keys = redis_client.keys(pattern)
        if keys:
            return redis_client.delete(*keys)
    except Exception as exc:
        logger.debug(f"Redis cache_invalidate error: {exc}")
    return 0


def get_redis_telemetry() -> Dict[str, Any]:
    """คืนค่าสถานะของระบบ Redis OTP, Cache และ Anti-Bot Shield สำหรับแสดงผลบนแดชบอร์ด"""
    active_otp_keys = len(redis_client.keys("otp:code:*"))
    active_cache_keys = len(redis_client.keys("cache:*"))
    blocked_bots = int(redis_client.get("security:blocked_bots_total") or 0)
    rate_limited_reqs = int(redis_client.get("security:rate_limited_total") or 0)
    banned_ips = len(redis_client.keys("security:ban:ip:*"))
    return {
        "mode": REDIS_METADATA["mode"],
        "is_live_redis": REDIS_METADATA["is_live_redis"],
        "otp_ttl_seconds": OTP_TTL_SECONDS,
        "rate_limit_rule": f"{OTP_RATE_LIMIT_MAX} ครั้ง / {OTP_RATE_LIMIT_WINDOW // 60} นาที ({OTP_RATE_LIMIT_STR})",
        "slowapi_active": SLOWAPI_AVAILABLE,
        "active_otp_sessions": active_otp_keys,
        "cached_endpoints": active_cache_keys,
        "anti_bot_shield": {
            "status": "ACTIVE (3-Layer WAF + Rate Limiter)",
            "blocked_bots_total": blocked_bots,
            "rate_limited_requests": rate_limited_reqs,
            "active_banned_ips": banned_ips,
        },
    }

