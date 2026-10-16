# ==============================================================================
# File: backend/tests/test_unit.py
# System: InsightFlow Enterprise Unit Test Suite
# Tests: Authentication, Token Security, Data Governance, Analytics, Redis Cache
# ==============================================================================

import os
import sys
import time
import unittest
from datetime import timedelta

# Ensure backend root is on sys.path
backend_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

from auth import (
    create_access_token,
    decode_jwt_hs256,
    encode_jwt_hs256,
    get_password_hash,
    verify_password,
    SUPER_ADMIN_EMAILS,
)
from data_governance import (
    DataQualityGatekeeper,
    DataQualityRule,
    RolePermissions,
    get_data_quality_metrics,
)
from analytics_modeling import (
    norm_cdf,
    norm_p_value,
    calculate_ab_testing_significance,
    calculate_dynamic_reorder_points,
)
from redis_cache import redis_client


class TestAuthenticationUnit(unittest.TestCase):
    """ทดสอบระบบรักษาความปลอดภัยและการยืนยันตัวตน (Auth Unit Tests)"""

    def test_password_hashing_and_verification(self):
        """1. ตรวจสอบการ Hash รหัสผ่านและการ Verify ด้วย Passlib Bcrypt"""
        password = "SecureExecutivePassword2026!"
        hashed = get_password_hash(password)
        self.assertNotEqual(password, hashed, "Hash ต้องไม่ตรงกับ Plain Text")
        self.assertTrue(verify_password(password, hashed), "รหัสผ่านที่ถูกต้องต้องผ่านการ Verify")
        self.assertFalse(verify_password("WrongPassword123", hashed), "รหัสผ่านที่ผิดต้องถูกปฏิเสธ")

    def test_jwt_token_creation_and_payload_claims(self):
        """2. ตรวจสอบการสร้าง JWT Access Token และการถอดรหัสตาม RFC 7519"""
        user_data = {
            "sub": "EXEC-999",
            "email": "ceo@insightflow.ai",
            "name": "Khun Somchai",
            "role": "admin",
        }
        token = create_access_token(user_data, expires_delta=timedelta(minutes=30))
        self.assertIsInstance(token, str)
        self.assertEqual(len(token.split(".")), 3, "JWT ต้องมี 3 ส่วนคั่นด้วยจุด (Header.Payload.Signature)")

        decoded = decode_jwt_hs256(token)
        self.assertEqual(decoded["sub"], "EXEC-999")
        self.assertEqual(decoded["email"], "ceo@insightflow.ai")
        self.assertEqual(decoded["role"], "admin")
        self.assertIn("jti", decoded)
        self.assertGreater(decoded["exp"], decoded["iat"])

    def test_jwt_token_expiration(self):
        """3. ตรวจสอบว่า JWT ที่หมดอายุ (Expired) ต้องถูกปฏิเสธ"""
        payload = {
            "sub": "EXPIRED-USER",
            "email": "expired@test.com",
            "exp": time.time() - 60,  # หมดอายุไปแล้ว 1 นาที
            "iat": time.time() - 120,
        }
        expired_token = encode_jwt_hs256(payload)
        with self.assertRaises(ValueError) as ctx:
            decode_jwt_hs256(expired_token)
        self.assertIn("expired", str(ctx.exception).lower())

    def test_super_admin_email_registry(self):
        """4. ตรวจสอบรายชื่อ Super Admin Email"""
        self.assertIn("pongsatornnantakong88@gmail.com", SUPER_ADMIN_EMAILS)


class TestDataGovernanceUnit(unittest.TestCase):
    """ทดสอบมาตรฐานธรรมาภิบาลข้อมูลและ RBAC (Data Governance Unit Tests)"""

    def test_data_quality_valid_record(self):
        """1. ตรวจสอบข้อมูลธุรกรรมที่ถูกต้อง (Clean Transaction)"""
        valid_rec = {
            "amount": 350.0,
            "receipt_id": "INV-2026-001",
            "date": "2026-03-15",
            "category": "Beverage",
            "customer_phone": "0812345678",
        }
        is_valid, rule, msg = DataQualityGatekeeper.validate_single_transaction(valid_rec)
        self.assertTrue(is_valid, f"ข้อมูลที่ถูกต้องควรผ่านการตรวจสอบ แต่ได้รับ: {msg}")

    def test_data_quality_negative_or_zero_price_block(self):
        """2. ด่านตรวจจับราคาติดลบหรือ 0 บาท (Numeric Sanity)"""
        invalid_rec = {"amount": -50.0, "receipt_id": "INV-002", "date": "2026-03-15", "category": "Food"}
        is_valid, rule, msg = DataQualityGatekeeper.validate_single_transaction(invalid_rec)
        self.assertFalse(is_valid)
        self.assertEqual(rule, DataQualityRule.NUMERIC_SANITY)

    def test_data_quality_outlier_spike_detection(self):
        """3. ด่านตรวจจับบิล Outlier ที่สูงเกินเกณฑ์ปกติ (Outlier Shield)"""
        outlier_rec = {"amount": 9999999.0, "receipt_id": "INV-SPIKE", "date": "2026-03-15", "category": "Retail"}
        is_valid, rule, msg = DataQualityGatekeeper.validate_single_transaction(outlier_rec)
        self.assertFalse(is_valid)
        self.assertEqual(rule, DataQualityRule.OUTLIER_SPIKE)

    def test_rbac_role_permissions_matrix(self):
        """4. ตรวจสอบสิทธิ์การเข้าถึงข้อมูลตามบทบาท (RBAC Matrix)"""
        owner_policy = RolePermissions.get_policy("owner")
        self.assertTrue(owner_policy["can_view_net_profit"])
        self.assertTrue(owner_policy["can_view_unmasked_customer_phone"])

        cashier_policy = RolePermissions.get_policy("cashier")
        self.assertFalse(cashier_policy["can_view_net_profit"], "Cashier ต้องไม่เห็นกำไรสุทธิ")
        self.assertFalse(cashier_policy["can_view_unmasked_customer_phone"], "Cashier ต้องเห็นเบอร์โทรที่ถูก Masking")

    def test_governance_metrics_score(self):
        """5. ตรวจสอบการคำนวณ Health Score ของข้อมูล"""
        metrics = get_data_quality_metrics()
        self.assertEqual(metrics["status"], "success")
        self.assertGreaterEqual(metrics["quality_score_pct"], 90.0)


class TestAnalyticsModelingUnit(unittest.TestCase):
    """ทดสอบฟังก์ชันคณิตศาสตร์และการพยากรณ์เชิงธุรกิจ (Analytics Unit Tests)"""

    def test_normal_distribution_cdf(self):
        """1. ตรวจสอบฟังก์ชันการแจกแจงแบบปกติมาตรฐาน norm_cdf (Z=0 -> 50%)"""
        self.assertAlmostEqual(norm_cdf(0.0), 0.5, places=4)
        self.assertAlmostEqual(norm_cdf(1.95996), 0.975, places=3)

    def test_two_tailed_p_value(self):
        """2. ตรวจสอบ Two-tailed P-value (Z=0 -> p=1.0, Z=1.96 -> p=0.05)"""
        self.assertAlmostEqual(norm_p_value(0.0), 1.0, places=4)
        self.assertAlmostEqual(norm_p_value(1.95996), 0.05, places=2)

    def test_ab_testing_significance_calculation(self):
        """3. ตรวจสอบการทดสอบสมมติฐาน A/B Testing ระหว่าง Variant A และ B"""
        res = calculate_ab_testing_significance(
            conversions_a=100,
            visitors_a=1000,
            conversions_b=150,
            visitors_b=1000,
        )
        self.assertIn("statistics", res)
        self.assertIn("p_value", res["statistics"])
        self.assertIn("is_statistically_significant", res["statistics"])
        self.assertTrue(res["statistics"]["is_statistically_significant"], "ความต่าง 10% vs 15% ใน 1,000 ตัวอย่างต้องมีนัยสำคัญทางสถิติ")


class TestRedisTTLUnit(unittest.TestCase):
    """ทดสอบกลไกแคชและ TTL Engine (Cache Unit Tests)"""

    def test_redis_cache_set_and_get(self):
        """1. ตรวจสอบการบันทึกและอ่านแคชพร้อมอายุ TTL"""
        key = "test:unit:kpi_summary"
        val = "kpi_value_100k"
        redis_client.setex(key, 60, val)
        retrieved = redis_client.get(key)
        self.assertEqual(retrieved, val)

    def test_redis_cache_delete(self):
        """2. ตรวจสอบการล้างแคชเมื่อข้อมูลอัปเดต"""
        key = "test:unit:temp_key"
        redis_client.setex(key, 60, "temp")
        deleted_count = redis_client.delete(key)
        self.assertGreaterEqual(deleted_count, 1)
        self.assertIsNone(redis_client.get(key))


if __name__ == "__main__":
    unittest.main(verbosity=2)
