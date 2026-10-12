import re

file_path = "src/App.jsx"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Filter the sidebar array
old_map = "            ].map((item) => ("
new_map = """            ].filter(item => {
              if (item.id === 'admin') {
                return user?.email === 'pongsatornnantakong88@gmail.com';
              }
              return true;
            }).map((item) => ("""

content = content.replace(old_map, new_map)

# 2. Add the Admin content block
old_settings = "          {/* TAB: การตั้งค่าระบบ (SETTINGS) */}"
new_admin_block = """          {/* TAB: จัดการระบบ (ADMIN & PDPA) */}
          {activeTab === 'admin' && user?.email === 'pongsatornnantakong88@gmail.com' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className={`p-8 rounded-3xl border relative overflow-hidden shadow-2xl ${
                theme === 'dark' 
                  ? 'bg-gradient-to-r from-red-500/20 via-[#0b1228] to-[#040817] border-red-500/30' 
                  : 'bg-gradient-to-r from-red-50 via-white to-white border-red-200'
              }`}>
                <div className="flex items-center gap-4 mb-6 relative z-10">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-500 to-red-600 flex items-center justify-center text-white shadow-lg shadow-red-500/30">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                  </div>
                  <div>
                    <h2 className={`text-2xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Super Admin & PDPA Vault</h2>
                    <p className="text-xs text-red-500 font-bold mt-1 tracking-wider uppercase">RESTRICTED ACCESS: pongsatornnantakong88@gmail.com</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                  {/* PDPA Section */}
                  <div className={`p-6 rounded-3xl border shadow-xl ${theme === 'dark' ? 'bg-[#040817]/90 border-red-500/20' : 'bg-white border-red-100 shadow-red-500/5'}`}>
                    <h3 className={`text-lg font-black mb-4 flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>
                      <svg className="w-5 h-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                      ข้อมูลส่วนบุคคลผู้ใช้งาน (PDPA)
                    </h3>
                    <div className="space-y-3">
                      <div className={`flex justify-between items-center p-4 rounded-2xl border ${theme === 'dark' ? 'bg-[#0b1228] border-white/5' : 'bg-slate-50 border-slate-100'}`}>
                        <div>
                          <p className={`text-sm font-bold ${theme === 'dark' ? 'text-slate-200' : 'text-slate-800'}`}>สมชาย ใจดี</p>
                          <p className="text-xs text-slate-500 mt-0.5">somchai@example.com • 192.168.1.1</p>
                        </div>
                        <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-[10px] font-bold rounded-full border border-emerald-500/20">Verified Identity</span>
                      </div>
                      <div className={`flex justify-between items-center p-4 rounded-2xl border ${theme === 'dark' ? 'bg-[#0b1228] border-white/5' : 'bg-slate-50 border-slate-100'}`}>
                        <div>
                          <p className={`text-sm font-bold ${theme === 'dark' ? 'text-slate-200' : 'text-slate-800'}`}>บริษัท เอบีซี จำกัด</p>
                          <p className="text-xs text-slate-500 mt-0.5">contact@abc.co.th • 172.16.0.4</p>
                        </div>
                        <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-[10px] font-bold rounded-full border border-emerald-500/20">Verified Identity</span>
                      </div>
                    </div>
                  </div>

                  {/* Audit Logs */}
                  <div className={`p-6 rounded-3xl border shadow-xl ${theme === 'dark' ? 'bg-[#040817]/90 border-red-500/20' : 'bg-white border-red-100 shadow-red-500/5'}`}>
                    <h3 className={`text-lg font-black mb-4 flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-slate-800'}`}>
                      <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      บันทึกกิจกรรมระบบ (Audit Logs)
                    </h3>
                    <div className="space-y-4 text-sm font-medium">
                      <div className="flex gap-4 items-start">
                        <span className="text-amber-500/90 font-mono text-xs bg-amber-500/10 px-2 py-1 rounded-md">10:42:01</span>
                        <span className={theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}>สมชาย โหลดข้อมูลคลังสินค้า AI</span>
                      </div>
                      <div className="flex gap-4 items-start">
                        <span className="text-amber-500/90 font-mono text-xs bg-amber-500/10 px-2 py-1 rounded-md">09:15:33</span>
                        <span className={theme === 'dark' ? 'text-slate-300' : 'text-slate-600'}>เอบีซี อัปเดตยอดขายผ่าน Google Sheets</span>
                      </div>
                      <div className="flex gap-4 items-start">
                        <span className="text-red-500/90 font-mono text-xs bg-red-500/10 px-2 py-1 rounded-md">08:01:12</span>
                        <span className="text-red-500">Failed login attempt (IP: 45.33.2.1) - Blocked</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Background Decor */}
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-red-500/5 rounded-full blur-3xl pointer-events-none"></div>
              </div>
            </div>
          )}

          {/* TAB: การตั้งค่าระบบ (SETTINGS) */}"""

content = content.replace(old_settings, new_admin_block)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Admin panel and PDPA vault patched successfully.")

