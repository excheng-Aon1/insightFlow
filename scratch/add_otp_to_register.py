import re

with open('backend/main.py', 'r') as f:
    content = f.read()

# Modify UserRegisterRequest
content = content.replace(
"""class UserRegisterRequest(BaseModel):
    username: str
    email: str
    password: str""",
"""class UserRegisterRequest(BaseModel):
    username: str
    email: str
    password: str
    otp: str""")

# Modify /register route
old_register = """@app.post("/register", status_code=status.HTTP_201_CREATED)
async def register_user(payload: UserRegisterRequest, db: Session = Depends(get_db)):
    if not payload.username or not payload.password or not payload.email:
        raise HTTPException(status_code=400, detail="กรุณากรอกข้อมูลให้ครบถ้วน")
        
    existing_user = db.query(User).filter(User.email == payload.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="อีเมลนี้ถูกใช้งานแล้ว")"""

new_register = """@app.post("/register", status_code=status.HTTP_201_CREATED)
async def register_user(request: Request, payload: UserRegisterRequest, db: Session = Depends(get_db)):
    if not payload.username or not payload.password or not payload.email or not payload.otp:
        raise HTTPException(status_code=400, detail="กรุณากรอกข้อมูลให้ครบถ้วน รวมถึงรหัส OTP")
        
    client_ip = get_client_identifier(request)
    # ตรวจสอบรหัส OTP ก่อนสมัครสมาชิก
    verify_otp_from_redis(payload.email.strip().lower(), payload.otp.strip(), client_ip=client_ip)
    
    existing_user = db.query(User).filter(User.email == payload.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="อีเมลนี้ถูกใช้งานแล้ว")"""

content = content.replace(old_register, new_register)

with open('backend/main.py', 'w') as f:
    f.write(content)
