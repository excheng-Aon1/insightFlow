# ==============================================================================
# File: backend/tests/test_sit.py
# System: InsightFlow System Integration Testing (SIT) Suite
# Stack: FastAPI TestClient, Database Pool, Redis TTL Cache, ETL, POS, Actionable AI
# ==============================================================================

import os
import sys
import unittest
from datetime import timedelta

# Ensure backend root is in sys.path
backend_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
if backend_dir not in sys.path:
    sys.path.insert(0, backend_dir)

from fastapi.testclient import TestClient
from main import app
from auth import create_access_token


class TestSystemIntegrationSuite(unittest.TestCase):
    """ชุดการทดสอบการเชื่อมต่อระบบแบบบูรณาการ (System Integration Testing - SIT)"""

    @classmethod
    def setUpClass(cls):
        cls.client = TestClient(app)
        # Create Super Admin JWT Token for protected endpoints
        cls.admin_token = create_access_token(
            {
                "sub": "EXEC-SUPER-001",
                "email": "pongsatornnantakong88@gmail.com",
                "name": "Super Admin",
                "role": "admin",
            },
            expires_delta=timedelta(hours=2),
        )
        cls.auth_headers = {"Authorization": f"Bearer {cls.admin_token}"}

    # --------------------------------------------------------------------------
    # 1. CORE SYSTEM HEALTH & DIAGNOSTICS SIT
    # --------------------------------------------------------------------------
    def test_sit_system_health_endpoint(self):
        """SIT-01: ตรวจสอบความพร้อมของระบบผ่าน /health (Public)"""
        response = self.client.get("/health")
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("status", data)
        self.assertIn(data["status"], ["healthy", "ok"])

    def test_sit_server_workers_diagnostics(self):
        """SIT-02: ตรวจสอบการจัดการ Multi-Worker Processes (Protected)"""
        response = self.client.get("/api/server/workers", headers=self.auth_headers)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data.get("status"), "success")
        self.assertIn("workers", data)

    def test_sit_redis_cache_integration(self):
        """SIT-03: ตรวจสอบการเชื่อมต่อระบบแคชความเร็วสูง /api/redis/status (Protected)"""
        response = self.client.get("/api/redis/status", headers=self.auth_headers)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data.get("status"), "success")

    def test_sit_database_pool_integration(self):
        """SIT-04: ตรวจสอบสถานะ Connection Pool ของฐานข้อมูล /api/database/pool-status (Protected)"""
        response = self.client.get("/api/database/pool-status", headers=self.auth_headers)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data.get("status"), "success")

    # --------------------------------------------------------------------------
    # 2. DATA PIPELINE & ETL ENGINE INTEGRATION
    # --------------------------------------------------------------------------
    def test_sit_etl_pipeline_status_and_trigger(self):
        """SIT-05: ตรวจสอบสถานะ Pipeline ข้อมูล และสั่ง Trigger ETL Data Sync"""
        status_res = self.client.get("/api/etl/status", headers=self.auth_headers)
        self.assertEqual(status_res.status_code, 200)
        status_data = status_res.json()
        self.assertIn("status", status_data)

        trigger_res = self.client.post("/api/etl/trigger", headers=self.auth_headers)
        self.assertEqual(trigger_res.status_code, 200)
        trigger_data = trigger_res.json()
        self.assertIn("status", trigger_data)
        self.assertEqual(trigger_data.get("status"), "success")

    # --------------------------------------------------------------------------
    # 3. DATA GOVERNANCE & QUALITY FIREWALL INTEGRATION
    # --------------------------------------------------------------------------
    def test_sit_governance_quality_score(self):
        """SIT-06: ตรวจสอบการเชื่อมต่อ Data Quality Firewall และคะแนนความสะอาดของข้อมูล"""
        response = self.client.get("/api/governance/quality-score", headers=self.auth_headers)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data.get("status"), "success")
        self.assertIn("quality_score_pct", data)

    def test_sit_governance_quarantine_logs(self):
        """SIT-07: ตรวจสอบการดึงข้อมูลห้องกักกัน (Data Quarantine Room)"""
        response = self.client.get("/api/governance/quarantine-logs", headers=self.auth_headers)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data.get("status"), "success")
        self.assertIn("records", data)

    def test_sit_governance_rbac_policies(self):
        """SIT-08: ตรวจสอบนโยบายความปลอดภัยและสิทธิ์การเข้าถึงข้อมูลองค์กร"""
        response = self.client.get("/api/governance/rbac-policies", headers=self.auth_headers)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data.get("status"), "success")
        self.assertIn("policies", data)
        self.assertIn("owner", data["policies"])
        self.assertIn("manager", data["policies"])
        self.assertIn("cashier", data["policies"])

    # --------------------------------------------------------------------------
    # 4. ACTIONABLE AI & EXECUTIVE DECISION ENGINE INTEGRATION
    # --------------------------------------------------------------------------
    def test_sit_actionable_what_if_simulation(self):
        """SIT-09: ตรวจสอบระบบจำลองผลกระทบธุรกิจ What-If Simulator"""
        payload = {
            "discount_pct": 10.0,
            "expected_volume_lift_pct": 20.0,
        }
        response = self.client.post("/api/actionable/what-if-simulate", json=payload, headers=self.auth_headers)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data.get("status"), "success")
        self.assertIn("simulated", data)

    def test_sit_actionable_copilot_assistant(self):
        """SIT-10: ตรวจสอบการตอบคำถามของ AI Executive Copilot"""
        payload = {"question": "วิเคราะห์ยอดขายและสินค้าขายดีประจำเดือนนี้"}
        response = self.client.post("/api/actionable/ask-copilot", json=payload, headers=self.auth_headers)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data.get("status"), "success")
        self.assertIn("answer_markdown", data)

    # --------------------------------------------------------------------------
    # 5. POS CATALOG & CHECKOUT TRANSACTION INTEGRATION
    # --------------------------------------------------------------------------
    def test_sit_pos_product_catalog(self):
        """SIT-11: ตรวจสอบการดึงรายการสินค้าหน้าร้าน POS"""
        response = self.client.get("/api/pos/products", headers=self.auth_headers)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertIn("products", data)
        self.assertGreater(len(data["products"]), 0)

    def test_sit_pos_checkout_flow(self):
        """SIT-12: ตรวจสอบขั้นตอนการชำระเงิน POS Checkout Flow และการออกใบเสร็จ"""
        payload = {
            "action": "checkout",
            "items": [{"id": "ITEM-001", "name": "Signature Americano", "price": 85.0, "qty": 2, "category": "Beverage"}],
            "subtotal": 170.0,
            "tax": 11.9,
            "total_amount": 181.9,
            "payment_method": "PromptPay",
        }
        response = self.client.post("/api/pos/checkout", json=payload, headers=self.auth_headers)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data.get("status"), "success")

    # --------------------------------------------------------------------------
    # 6. AUTHENTICATION & RBAC SECURITY INTEGRATION
    # --------------------------------------------------------------------------
    def test_sit_auth_unauthorized_access_protection(self):
        """SIT-13: ตรวจสอบการปฏิเสธคำขอที่ไม่แนบ Bearer Token (401 Unauthorized)"""
        response = self.client.get("/api/auth/me")
        self.assertEqual(response.status_code, 401)

    def test_sit_auth_authorized_token_verification(self):
        """SIT-14: ตรวจสอบการอนุญาตเข้าถึงด้วย Bearer Token ที่ถูกต้อง"""
        token = create_access_token(
            {"sub": "EXEC-001", "email": "executive@insightflow.ai", "name": "Executive Khun Joy", "role": "admin"},
            expires_delta=timedelta(minutes=15),
        )
        headers = {"Authorization": f"Bearer {token}"}
        response = self.client.get("/api/auth/me", headers=headers)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data.get("status"), "success")
        self.assertEqual(data.get("user", {}).get("email"), "executive@insightflow.ai")
        self.assertEqual(data.get("user", {}).get("role"), "admin")

    def test_sit_auth_invalid_credentials_rejected(self):
        """SIT-15: ตรวจสอบการปฏิเสธการล็อกอินด้วยอีเมล/รหัสผ่านที่ผิด"""
        payload = {"email": "nonexistent@user.com", "password": "WrongPassword!"}
        response = self.client.post("/api/auth/login", json=payload)
        self.assertIn(response.status_code, [400, 401, 404])

    def test_sit_auth_google_login_structure(self):
        """SIT-16: ตรวจสอบโครงสร้างรับคำขอ Google Authentication"""
        payload = {"credential": "sample_mock_google_id_token_jwt"}
        response = self.client.post("/api/auth/google", json=payload)
        self.assertNotEqual(response.status_code, 500)

    # --------------------------------------------------------------------------
    # 7. LINE NOTIFICATION & CONTACT INTEGRATION
    # --------------------------------------------------------------------------
    def test_sit_line_contacts_registry_integration(self):
        """SIT-17: ตรวจสอบการดึงรายชื่อผู้รับการแจ้งเตือน LINE /api/line/contacts"""
        response = self.client.get("/api/line/contacts", headers=self.auth_headers)
        self.assertEqual(response.status_code, 200)
        data = response.json()
        self.assertEqual(data.get("status"), "success")
        self.assertIn("contacts", data)

    def test_sit_line_uploaded_data_qa_webhook(self):
        """SIT-18: ตรวจสอบการซิงก์ไฟล์อัปโหลดและการถาม-ตอบข้อมูลผ่าน LINE Webhook & /api/line/ask"""
        sync_payload = {
            "business_name": "InsightFlow Test Store",
            "uploaded_files": [
                {
                    "tab": "overview",
                    "filename": "sales_test_nov.xlsx",
                    "rows": 120,
                    "columns": ["Product", "Branch", "Revenue"],
                    "sample_rows": [{"Product": "กาแฟพรีเมียม", "Branch": "สาขาอโศก", "Revenue": 45000}],
                }
            ],
            "metrics": {
                "total_revenue": 150000,
                "net_profit": 42000,
                "total_orders": 120,
                "top_branch": "สาขาอโศก",
            },
        }
        sync_resp = self.client.post("/api/line/sync-uploaded-context", json=sync_payload)
        self.assertEqual(sync_resp.status_code, 200)
        self.assertEqual(sync_resp.json().get("files_count"), 1)

        ask_resp = self.client.post("/api/line/ask", json={"question": "ไฟล์ที่อัปโหลดล่าสุดมีข้อมูลอะไรบ้าง"})
        self.assertEqual(ask_resp.status_code, 200)
        ask_data = ask_resp.json()
        self.assertEqual(ask_data.get("status"), "success")
        ans_text = ask_data.get("answer", "")
        self.assertIn("sales_test_nov.xlsx", ans_text)
        self.assertIn("พี่", ans_text)
        self.assertIn("ผม", ans_text)
        self.assertIn("ก้าวต่อไป", ans_text)
        self.assertIn("**", ans_text)

        webhook_resp = self.client.post(
            "/api/line/webhook",
            headers={"X-Line-Signature": "SIMULATED_LOCAL_WEBHOOK"},
            json={
                "events": [
                    {
                        "type": "message",
                        "replyToken": "00000000000000000000000000000000",
                        "source": {"userId": "Utestuser1234567890"},
                        "message": {"type": "text", "text": "ยอดขายรวมตอนนี้เท่าไหร่"},
                    }
                ]
            },
        )
        self.assertEqual(webhook_resp.status_code, 200)
        wh_data = webhook_resp.json()
        self.assertEqual(wh_data.get("ai_reply_count"), 1)
        self.assertTrue(len(wh_data.get("ai_replies", [])) == 1)

    def test_sit_line_incoming_file_extraction_and_sender_info(self):
        """SIT-19: ตรวจสอบการดึงข้อมูลอัตโนมัติเมื่อลูกค้าส่งไฟล์เข้ามาใน LINE พร้อมระบุชื่อและ LINE ID ผู้ส่ง"""
        import base64
        csv_content = "Product,Branch,Revenue,Cost\nกาแฟพรีเมียม,สาขาอโศก,25000,10000\nชาเขียวมัทฉะ,สาขาสยาม,15000,5000\n"
        b64_payload = base64.b64encode(csv_content.encode("utf-8")).decode("utf-8")

        wh_resp = self.client.post(
            "/api/line/webhook",
            headers={"X-Line-Signature": "SIMULATED_LOCAL_WEBHOOK"},
            json={
                "events": [
                    {
                        "type": "message",
                        "replyToken": "00000000000000000000000000000000",
                        "source": {"userId": "Utest_sender_99887766"},
                        "message": {
                            "type": "file",
                            "id": "msg_file_001",
                            "fileName": "customer_line_sales.csv",
                            "fileSize": len(csv_content),
                            "simulated_content_base64": b64_payload,
                        },
                    }
                ]
            },
        )
        self.assertEqual(wh_resp.status_code, 200)
        wh_data = wh_resp.json()
        self.assertEqual(wh_data.get("received_files_count"), 1)
        rf = wh_data["received_files"][0]
        self.assertEqual(rf.get("filename"), "customer_line_sales.csv")
        self.assertEqual(rf.get("sender_line_user_id"), "Utest_sender_99887766")
        self.assertTrue(len(rf.get("sender_name", "")) > 0)
        self.assertEqual(rf.get("rows"), 2)
        self.assertEqual(rf.get("total_revenue"), 40000.0)

        rec_resp = self.client.get("/api/line/received-files")
        self.assertEqual(rec_resp.status_code, 200)
        rec_data = rec_resp.json()
        self.assertGreaterEqual(rec_data.get("count", 0), 1)


if __name__ == "__main__":
    unittest.main(verbosity=2)
