import re

def patch_app_jsx():
    with open('src/App.jsx', 'r', encoding='utf-8') as f:
        content = f.read()

    # Add state for auth form
    if 'const [authMode, setAuthMode]' not in content:
        auth_state = '''const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' or 'register'
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authName, setAuthName] = useState('');
'''
        content = re.sub(r'const \[isLoginOpen, setIsLoginOpen\] = useState\(false\);', auth_state, content)

    # Replace handleLoginSuccess and add handleAuthSubmit
    if 'const handleAuthSubmit' not in content:
        auth_handler = '''const handleLoginSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    setUser(decoded);
    setIsLoginOpen(false);
  };

  const handleAuthSubmit = async (e) => {
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
      });
      const data = await res.json();
      if (res.ok) {
        toast.success(data.message || 'เข้าสู่ระบบสำเร็จ!');
        // Store token in localStorage
        localStorage.setItem('token', data.access_token);
        // Set user state (decode JWT or use returned data)
        const decoded = jwtDecode(data.access_token);
        setUser(decoded);
        setIsLoginOpen(false);
      } else {
        toast.error(data.detail || 'เกิดข้อผิดพลาด');
      }
    } catch (err) {
      toast.error('ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้');
    }
  };'''
        content = re.sub(r'const handleLoginSuccess = \(credentialResponse\) => \{.*?\};', auth_handler, content, flags=re.DOTALL)

    # Replace the login modal UI
    new_modal = '''{isLoginOpen && (
          <div className="fixed inset-0 bg-black/75 backdrop-blur-md flex items-center justify-center z-50 p-4">
            <div className="bg-[#0c1222] border border-white/10 rounded-3xl w-full max-w-md p-8 shadow-2xl relative">
              <button onClick={() => setIsLoginOpen(false)} className="absolute top-5 right-5 text-slate-400 hover:text-white transition text-lg">✕</button>
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-5 p-2 border border-white/10 shadow-inner">
                <AppLogo />
              </div>
              <h2 className="text-2xl font-black text-center mb-2 text-white">{authMode === 'login' ? 'เข้าสู่ระบบ InsightFlow' : 'ลงทะเบียนผู้ใช้ใหม่'}</h2>
              <p className="text-slate-400 text-center text-sm mb-7 leading-relaxed">
                {authMode === 'login' ? 'กรุณากรอกอีเมลและรหัสผ่านเพื่อเข้าใช้งานระบบ' : 'สร้างบัญชีเพื่อเริ่มต้นวิเคราะห์ข้อมูลของคุณ'}
              </p>
              
              <form onSubmit={handleAuthSubmit} className="flex flex-col gap-4 mb-6">
                {authMode === 'register' && (
                  <input type="text" placeholder="ชื่อ นามสกุล" value={authName} onChange={e => setAuthName(e.target.value)} className="w-full bg-[#050814] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-amber-500/50 transition" />
                )}
                <input type="email" placeholder="อีเมลองค์กร" value={authEmail} onChange={e => setAuthEmail(e.target.value)} className="w-full bg-[#050814] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-amber-500/50 transition" required />
                <input type="password" placeholder="รหัสผ่าน" value={authPassword} onChange={e => setAuthPassword(e.target.value)} className="w-full bg-[#050814] border border-white/10 rounded-xl px-4 py-3 text-white outline-none focus:border-amber-500/50 transition" required />
                
                <button type="submit" className="w-full mt-2 py-3 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 rounded-xl text-white font-bold transition shadow-lg shadow-amber-500/20">
                  {authMode === 'login' ? 'เข้าสู่ระบบ' : 'ยืนยันลงทะเบียน'}
                </button>
              </form>

              <div className="flex justify-center items-center text-sm">
                <span className="text-slate-400 mr-2">{authMode === 'login' ? 'ยังไม่มีบัญชี?' : 'มีบัญชีแล้ว?'}</span>
                <button onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')} className="text-amber-400 hover:text-amber-300 font-semibold underline">
                  {authMode === 'login' ? 'ลงทะเบียนที่นี่' : 'เข้าสู่ระบบที่นี่'}
                </button>
              </div>
            </div>
          </div>
        )}'''
    
    # We must replace the old modal block carefully
    content = re.sub(r'\{isLoginOpen && \(\n\s*<div className="fixed inset-0 bg-black/75 backdrop-blur-md.*?\n\s*</div>\n\s*</div>\n\s*\)\}', new_modal, content, flags=re.DOTALL)
    
    # Check if the fetch functions in App.jsx send Bearer tokens
    if 'Authorization' not in content:
        content = content.replace(
            '''const response = await fetch("http://127.0.0.1:8000/upload", {
        method: "POST",
        body: formData,
      });''',
            '''const response = await fetch("http://127.0.0.1:8000/upload", {
        method: "POST",
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData,
      });'''
        )

        content = content.replace(
            '''const response = await fetch("http://127.0.0.1:8000/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: chatInput }),
      });''',
            '''const response = await fetch("http://127.0.0.1:8000/api/ai/chat", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ message: chatInput }),
      });'''
        )

        content = content.replace(
            '''const response = await fetch("http://127.0.0.1:8000/api/database/query", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: sqlQuery }),
      });''',
            '''const response = await fetch("http://127.0.0.1:8000/api/database/query", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ query: sqlQuery }),
      });'''
        )

    with open('src/App.jsx', 'w', encoding='utf-8') as f:
        f.write(content)

if __name__ == '__main__':
    patch_app_jsx()
    print("Frontend Patched!")

