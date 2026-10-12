import os
import re

def patch_auth_py():
    with open('backend/auth.py', 'r', encoding='utf-8') as f:
        content = f.read()
        
    if 'from passlib.context import CryptContext' not in content:
        content = content.replace(
            'from fastapi.security import OAuth2PasswordBearer',
            'from fastapi.security import OAuth2PasswordBearer\nfrom passlib.context import CryptContext'
        )
        content += '''\n
# ------------------------------------------------------------------------------
# PASSWORD HASHING
# ------------------------------------------------------------------------------
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)

def get_password_hash(password):
    return pwd_context.hash(password)
'''
        with open('backend/auth.py', 'w', encoding='utf-8') as f:
            f.write(content)

def patch_main_py():
    with open('backend/main.py', 'r', encoding='utf-8') as f:
        content = f.read()

    # Add User to imports from database
    if 'User,' not in content and 'User ' not in content:
        content = content.replace('UserQuota,', 'User, UserQuota,')

    # Add verify_password, get_password_hash to imports from auth
    if 'get_password_hash' not in content:
        content = content.replace(
            'create_access_token,',
            'create_access_token, verify_password, get_password_hash,'
        )

    # Replace login_with_email
    new_login_with_email = '''@app.post("/api/auth/login")
async def login_with_email(req: UserLoginRequest, db: Session = Depends(get_db)):
    if not req.email:
        raise HTTPException(status_code=400, detail="กรุณาระบุอีเมล")
    user = db.query(User).filter(User.email == req.email).first()
    if not user:
        raise HTTPException(status_code=400, detail="อีเมลหรือรหัสผ่านไม่ถูกต้อง")
    if not hasattr(req, 'password') or not req.password:
        raise HTTPException(status_code=400, detail="กรุณาระบุรหัสผ่าน")
    
    if not verify_password(req.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="อีเมลหรือรหัสผ่านไม่ถูกต้อง")
        
    return _issue_jwt_response(
        email=user.email,
        name=user.full_name or user.email.split("@")[0],
        extra_message="เข้าสู่ระบบและรับ JWT Access Token สำเร็จ",
    )'''
    content = re.sub(r'@app\.post\("/api/auth/login"\).*?extra_message="เข้าสู่ระบบและรับ JWT Access Token สำเร็จ",\n    \)', new_login_with_email, content, flags=re.DOTALL)
    
    # Update UserLoginRequest to include password
    new_user_login = '''class UserLoginRequest(BaseModel):
    email: str
    password: Optional[str] = None
    name: Optional[str] = None'''
    content = re.sub(r'class UserLoginRequest\(BaseModel\):\n    email: str\n    name: Optional\[str\] = None', new_user_login, content)

    # Replace register_user
    new_register_user = '''@app.post("/register", status_code=status.HTTP_201_CREATED)
async def register_user(payload: UserRegisterRequest, db: Session = Depends(get_db)):
    if not payload.username or not payload.password or not payload.email:
        raise HTTPException(status_code=400, detail="กรุณากรอกข้อมูลให้ครบถ้วน")
        
    existing_user = db.query(User).filter(User.email == payload.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="อีเมลนี้ถูกใช้งานแล้ว")
        
    import uuid
    new_user = User(
        id=str(uuid.uuid4()),
        email=payload.email,
        full_name=payload.username,
        hashed_password=get_password_hash(payload.password),
        role="admin" if payload.email.lower() == SUPER_ADMIN_EMAIL else "member"
    )
    db.add(new_user)
    db.commit()
    
    logger.info(f"New real user registered: {payload.username} ({payload.email})")
    return _issue_jwt_response(
        email=payload.email,
        name=payload.username,
        extra_message="ลงทะเบียนผู้ใช้ใหม่สำเร็จ",
    )'''
    content = re.sub(r'@app\.post\("/register", status_code=status\.HTTP_201_CREATED\).*?extra_message="ลงทะเบียนผู้ใช้ใหม่สำเร็จ",\n    \)', new_register_user, content, flags=re.DOTALL)

    # Update token endpoint (OAuth2PasswordRequestForm)
    new_token_endpoint = '''@app.post("/token")
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    if not form_data.username or not form_data.password:
        raise HTTPException(status_code=400, detail="กรุณาระบุชื่อผู้ใช้และรหัสผ่าน")
        
    user = db.query(User).filter(User.email == form_data.username).first()
    if not user or not verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=400, detail="อีเมลหรือรหัสผ่านไม่ถูกต้อง")
        
    return _issue_jwt_response(
        email=user.email,
        name=user.full_name or user.email.split("@")[0],
        extra_message="เข้าสู่ระบบด้วย OAuth2 Password Flow สำเร็จ",
    )'''
    content = re.sub(r'@app\.post\("/token"\).*?extra_message="เข้าสู่ระบบด้วย OAuth2 Password Flow สำเร็จ",\n    \)', new_token_endpoint, content, flags=re.DOTALL)

    with open('backend/main.py', 'w', encoding='utf-8') as f:
        f.write(content)

if __name__ == '__main__':
    patch_auth_py()
    patch_main_py()
    print("Backend Patched!")

