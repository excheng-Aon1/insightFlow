import re

with open('src/App.jsx', 'r') as f:
    content = f.read()

# 1. Add states for OTP
content = content.replace("const [authPassword, setAuthPassword] = useState('');", 
"""const [authPassword, setAuthPassword] = useState('');
  const [authOtp, setAuthOtp] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);""")

# 2. Reset OTP state when changing modes or closing
content = content.replace("setIsLoginOpen(false);", 
"""setIsLoginOpen(false);
    setIsOtpSent(false);
    setAuthOtp('');""")
    
content = content.replace("onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}", 
"""onClick={() => {
                  setAuthMode(authMode === 'login' ? 'register' : 'login');
                  setIsOtpSent(false);
                  setAuthOtp('');
                }}""")

# 3. Modify handleAuthSubmit
old_handle_auth = """  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    if (!authEmail || !authPassword) {
      toast.error('กรุณากรอกอีเมลและรหัสผ่าน');
      return;
    }
    const endpoint = authMode === 'login' ? '/api/auth/login' : '/register';
    const payload = authMode === 'login' 
      ? { email: authEmail, password: authPassword }
      : { email: authEmail, password: authPassword, username: authName || authEmail.split('@')[0] };

    try {
      const res = await fetch(`http://127.0.0.1:8000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });"""

new_handle_auth = """  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    if (!authEmail || !authPassword) {
      toast.error('กรุณากรอกอีเมลและรหัสผ่าน');
      return;
    }
    
    if (authMode === 'register' && !isOtpSent) {
      // Step 1: Send OTP
      try {
        const res = await fetch(`http://127.0.0.1:8000/api/auth/send-otp`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: authEmail })
        });
        const data = await res.json();
        if (res.ok) {
          toast.success(data.message || 'ส่งรหัส OTP สำเร็จ');
          setIsOtpSent(true);
        } else {
          toast.error(data.detail || 'ไม่สามารถส่ง OTP ได้');
        }
      } catch (err) {
        console.error(err);
        toast.error('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้: ' + err.message);
      }
      return;
    }
    
    const endpoint = authMode === 'login' ? '/api/auth/login' : '/register';
    const payload = authMode === 'login' 
      ? { email: authEmail, password: authPassword }
      : { email: authEmail, password: authPassword, username: authName || authEmail.split('@')[0], otp: authOtp };

    try {
      const res = await fetch(`http://127.0.0.1:8000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });"""

content = content.replace(old_handle_auth, new_handle_auth)

# 4. Add OTP input field to the form
old_form_inputs = """                {authMode === 'register' && (
                  <input type="text" placeholder="ชื่อ นามสกุล" value={authName} onChange={e => setAuthName(e.target.value)} className="w-full bg-[#050814] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-amber-500/50 transition" />
                )}
                <input type="email" placeholder="อีเมลองค์กร" value={authEmail} onChange={e => setAuthEmail(e.target.value)} className="w-full bg-[#050814] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-amber-500/50 transition" required />
                <input type="password" placeholder="รหัสผ่าน" value={authPassword} onChange={e => setAuthPassword(e.target.value)} className="w-full bg-[#050814] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-amber-500/50 transition" required />
                
                <button type="submit" className="w-full mt-2 py-3 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 rounded-xl text-white font-bold transition shadow-lg shadow-amber-500/20">
                  {authMode === 'login' ? 'เข้าสู่ระบบ' : 'ยืนยันลงทะเบียน'}
                </button>"""

new_form_inputs = """                {authMode === 'register' && (
                  <input type="text" placeholder="ชื่อ นามสกุล" value={authName} onChange={e => setAuthName(e.target.value)} className="w-full bg-[#050814] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-amber-500/50 transition" disabled={isOtpSent} />
                )}
                <input type="email" placeholder="อีเมลองค์กร" value={authEmail} onChange={e => setAuthEmail(e.target.value)} className="w-full bg-[#050814] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-amber-500/50 transition" required disabled={isOtpSent} />
                <input type="password" placeholder="รหัสผ่าน" value={authPassword} onChange={e => setAuthPassword(e.target.value)} className="w-full bg-[#050814] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-amber-500/50 transition" required disabled={isOtpSent} />
                
                {authMode === 'register' && isOtpSent && (
                  <div className="animate-in fade-in slide-in-from-top-2 duration-300">
                    <input type="text" placeholder="รหัส OTP 6 หลัก (ดูที่ Terminal ของ Backend)" value={authOtp} onChange={e => setAuthOtp(e.target.value)} className="w-full bg-emerald-500/10 border border-emerald-500/30 rounded-xl px-4 py-3 text-emerald-400 font-mono outline-none focus:border-emerald-400 transition" required />
                  </div>
                )}
                
                <button type="submit" className="w-full mt-2 py-3 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 rounded-xl text-white font-bold transition shadow-lg shadow-amber-500/20">
                  {authMode === 'login' ? 'เข้าสู่ระบบ' : (isOtpSent ? 'ยืนยัน OTP และสมัครสมาชิก' : 'ส่งรหัส OTP ไปยังอีเมล')}
                </button>"""

content = content.replace(old_form_inputs, new_form_inputs)

with open('src/App.jsx', 'w') as f:
    f.write(content)
