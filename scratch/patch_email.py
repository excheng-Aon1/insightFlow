import os
import re

file_path = "backend/main.py"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Add smtplib and email modules
if "import smtplib" not in content:
    import_block = """
import random
import logging
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
"""
    content = content.replace("import random\nimport logging", import_block.strip())

# 2. Add send_email_otp function after the imports
if "def send_email_otp" not in content:
    email_func = """
def send_email_otp(to_email: str, otp_code: str):
    sender_email = os.environ.get("SMTP_EMAIL")
    sender_password = os.environ.get("SMTP_PASSWORD")
    
    if not sender_email or not sender_password:
        print("⚠️ SMTP_EMAIL or SMTP_PASSWORD is not set in .env. Skipping email sending.")
        return False
        
    try:
        msg = MIMEMultipart()
        msg['From'] = f"InsightFlow Security <{sender_email}>"
        msg['To'] = to_email
        msg['Subject'] = f"[{otp_code}] รหัสผ่านใช้ครั้งเดียว (OTP) จาก InsightFlow"
        
        body = f\"\"\"
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
            <h2 style="color: #040814;">InsightFlow Enterprise</h2>
            <p style="color: #4b5563;">รหัสสำหรับยืนยันตัวตน (OTP) ของคุณคือ:</p>
            <div style="background-color: #f3f4f6; padding: 16px; text-align: center; font-size: 24px; font-weight: bold; letter-spacing: 4px; border-radius: 6px; color: #111827; margin: 20px 0;">
                {otp_code}
            </div>
            <p style="color: #ef4444; font-size: 14px;">* รหัสนี้มีอายุการใช้งาน 3 นาที และจะหมดอายุหากมีการขอรหัสใหม่</p>
            <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 20px 0;">
            <p style="color: #9ca3af; font-size: 12px;">หากคุณไม่ได้ทำรายการนี้ กรุณาเพิกเฉยต่ออีเมลฉบับนี้</p>
        </div>
        \"\"\"
        msg.attach(MIMEText(body, 'html'))
        
        print(f"📧 Sending OTP email to {to_email} via smtp.gmail.com...")
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(sender_email, sender_password)
        server.send_message(msg)
        server.quit()
        print(f"✅ Email sent successfully to {to_email}")
        return True
    except Exception as e:
        print(f"❌ Failed to send email: {e}")
        return False

"""
    # Insert it right before init_db
    content = content.replace("def create_default_superadmin():", email_func + "\ndef create_default_superadmin():")


# 3. Update send_otp signature and call send_email_otp
old_send_otp_sig = "async def send_otp(request: Request, req: OTPRequest):"
new_send_otp_sig = "async def send_otp(request: Request, req: OTPRequest, background_tasks: BackgroundTasks):"

content = content.replace(old_send_otp_sig, new_send_otp_sig)

old_print_block = """    print(f"🛡️ RATE LIMIT: Attempt {attempt_no}/{OTP_RATE_LIMIT_MAX} (Reset in {window_ttl}s)")
    print("=======================================================\\n")"""
new_print_block = """    print(f"🛡️ RATE LIMIT: Attempt {attempt_no}/{OTP_RATE_LIMIT_MAX} (Reset in {window_ttl}s)")
    print("=======================================================\\n")
    
    # 3. Send actual email in background
    background_tasks.add_task(send_email_otp, email_clean, generated_otp)"""

content = content.replace(old_print_block, new_print_block)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Patch applied successfully.")

