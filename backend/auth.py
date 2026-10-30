# ==============================================================================
# File: auth.py
# System: InsightFlow Enterprise JWT Authentication & Role-Based Access Control
# Stack: FastAPI Security (OAuth2PasswordBearer), RFC 7519 HS256 JWT, Redis JTI
# ==============================================================================

import os
import time
import json
import hmac
import uuid
import base64
import hashlib
from datetime import datetime, timedelta
from typing import Optional, Dict, Any

from dotenv import load_dotenv
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from passlib.context import CryptContext

load_dotenv()

import secrets

# ------------------------------------------------------------------------------
# 1. JWT CONFIGURATION FROM .ENV
# ------------------------------------------------------------------------------
_raw_secret = os.getenv("SECRET_KEY", "").strip() or os.getenv("JWT_SECRET_KEY", "").strip()
DEFAULT_INSECURE_KEYS = {
    "super-secret-enterprise-key-change-this-in-production-2026",
    "secret",
    "changeme",
    "123456",
}
if os.getenv("ENVIRONMENT", "").lower() == "production" and _raw_secret in DEFAULT_INSECURE_KEYS:
    import logging
    logging.getLogger("insightflow.security").warning(
        "🛡️ [Security Guard] Default insecure SECRET_KEY detected in production! "
        "Elevating to cryptographically secure runtime ephemeral secret key to prevent token forgery."
    )
    SECRET_KEY = secrets.token_urlsafe(64)
else:
    SECRET_KEY = _raw_secret or secrets.token_urlsafe(48)
ALGORITHM = os.getenv("ALGORITHM", "HS256").strip()
ACCESS_TOKEN_EXPIRE_MINUTES = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", "60"))
SUPER_ADMIN_EMAIL = os.getenv("SUPER_ADMIN_EMAIL", "pongsatornnantakong88@gmail.com").strip().lower()
SUPER_ADMIN_EMAILS = {
    SUPER_ADMIN_EMAIL,
    "pongsatornnantakong88@gmail.com",
    "pongsatorn.nan@gmail.com",
}

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/token", auto_error=False)


# ------------------------------------------------------------------------------
# 2. RFC 7519 HS256 JWT ENCODER & DECODER (ZERO-DEPENDENCY + JOSE COMPATIBLE)
# ------------------------------------------------------------------------------
def _b64url_encode(data: bytes) -> str:
    return base64.urlsafe_b64encode(data).rstrip(b"=").decode("utf-8")


def _b64url_decode(segment: str) -> bytes:
    padding = "=" * ((4 - len(segment) % 4) % 4)
    return base64.urlsafe_b64decode((segment + padding).encode("utf-8"))


def encode_jwt_hs256(payload: Dict[str, Any], secret: str = SECRET_KEY) -> str:
    """เข้ารหัสสร้าง JWT มาตรฐาน RFC 7519 ด้วย HMAC-SHA256"""
    header = {"alg": ALGORITHM, "typ": "JWT"}
    header_b64 = _b64url_encode(json.dumps(header, separators=(",", ":")).encode("utf-8"))
    payload_b64 = _b64url_encode(json.dumps(payload, separators=(",", ":")).encode("utf-8"))
    signing_input = f"{header_b64}.{payload_b64}".encode("utf-8")
    signature = hmac.new(secret.encode("utf-8"), signing_input, hashlib.sha256).digest()
    sig_b64 = _b64url_encode(signature)
    return f"{header_b64}.{payload_b64}.{sig_b64}"


def decode_jwt_hs256(token: str, secret: str = SECRET_KEY) -> Dict[str, Any]:
    """ตรวจสอบลายเซ็นดิจิทัล HMAC-SHA256 และวันหมดอายุ (exp) ของ JWT Token"""
    parts = token.split(".")
    if len(parts) != 3:
        raise ValueError("Invalid JWT structure")

    header_b64, payload_b64, sig_b64 = parts
    signing_input = f"{header_b64}.{payload_b64}".encode("utf-8")
    expected_sig = hmac.new(secret.encode("utf-8"), signing_input, hashlib.sha256).digest()
    actual_sig = _b64url_decode(sig_b64)

    if not hmac.compare_digest(expected_sig, actual_sig):
        raise ValueError("Invalid JWT signature")

    payload = json.loads(_b64url_decode(payload_b64).decode("utf-8"))
    exp = payload.get("exp")
    if exp is not None and time.time() > float(exp):
        raise ValueError("JWT token has expired")

    return payload


def create_access_token(
    data: Dict[str, Any],
    expires_delta: Optional[timedelta] = None,
) -> str:
    """
    สร้าง JWT Access Token พร้อมระบุข้อมูลผู้ใช้ (sub, email, name, role, jti, iat, exp)
    เพื่อส่งกลับให้ Frontend เก็บไว้ใช้ใน Authorization: Bearer <token>
    """
    to_encode = data.copy()
    now_ts = int(time.time())
    expire_delta = expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    expire_ts = now_ts + int(expire_delta.total_seconds())

    sub = str(to_encode.get("sub") or to_encode.get("email") or "GUEST-EXEC-001")
    email = str(to_encode.get("email") or sub)
    role = str(
        to_encode.get("role")
        or ("admin" if email.lower() in SUPER_ADMIN_EMAILS else "member")
    )

    to_encode.update(
        {
            "sub": sub,
            "email": email,
            "name": to_encode.get("name") or email.split("@")[0],
            "role": role,
            "jti": str(uuid.uuid4()),
            "iat": now_ts,
            "exp": expire_ts,
        }
    )
    return encode_jwt_hs256(to_encode, SECRET_KEY)


# ------------------------------------------------------------------------------
# 3. FASTAPI DEPENDS() GUARD FOR PROTECTED ENDPOINTS
# ------------------------------------------------------------------------------
def get_current_user(token: Optional[str] = Depends(oauth2_scheme)) -> Dict[str, Any]:
    """
    FastAPI Dependency (Depends(get_current_user)):
    ตรวจสอบ JWT Access Token จาก Header `Authorization: Bearer <token>`
    ก่อนอนุญาตให้เข้าถึง API
    """
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="🔒 ไม่ได้รับอนุญาต: กรุณาเข้าสู่ระบบ หรือแนบ JWT Access Token (Bearer) ที่ถูกต้อง",
        headers={"WWW-Authenticate": "Bearer"},
    )

    if not token:
        raise credentials_exception

    try:
        payload = decode_jwt_hs256(token, SECRET_KEY)
        user_id = payload.get("sub")
        if not user_id:
            raise credentials_exception

        # ตรวจสอบว่า Token ถูกสั่งเพิกถอน (Blacklist) ใน Redis หรือไม่
        try:
            from redis_cache import redis_client
            jti = payload.get("jti")
            if jti and redis_client.get(f"jwt:blacklist:{jti}"):
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="🔒 เซสชันนี้ถูกออกจากระบบแล้ว กรุณาเข้าสู่ระบบใหม่อีกครั้ง",
                    headers={"WWW-Authenticate": "Bearer"},
                )
        except HTTPException:
            raise
        except Exception:
            pass

        return payload
    except HTTPException:
        raise
    except Exception:
        raise credentials_exception


def get_current_user_optional(token: Optional[str] = Depends(oauth2_scheme)) -> Optional[Dict[str, Any]]:
    """
    FastAPI Dependency แบบยืดหยุ่น:
    หากมีการส่ง Bearer Token มาจะตรวจสอบความถูกต้อง หากไม่มีจะอนุญาตให้ผ่านโดยคืนค่า None
    """
    if not token:
        return None
    try:
        return get_current_user(token)
    except Exception:
        return None


def require_super_admin(current_user: Dict[str, Any] = Depends(get_current_user)) -> Dict[str, Any]:
    """ตรวจสอบสิทธิ์เฉพาะ Super Admin สำหรับ API ข้อมูลความลับองค์กรและ PDPA"""
    email = str(current_user.get("email", "")).lower()
    role = str(current_user.get("role", "")).lower()
    if email not in SUPER_ADMIN_EMAILS and role != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="⛔ จำกัดสิทธิ์เฉพาะ Super Admin เท่านั้น",
        )
    return current_user

# ------------------------------------------------------------------------------
# PASSWORD HASHING
# ------------------------------------------------------------------------------
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)
