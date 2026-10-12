import re

with open('src/App.jsx', 'r') as f:
    content = f.read()

# 1. Add "Connect to Google Sheet" button to Inventory header
sheet_button = """                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-slate-950 shadow-xl flex-shrink-0">
                      <svg className="w-8 h-8 text-slate-950" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black tracking-widest uppercase bg-emerald-400/20 text-emerald-400 px-3 py-1 rounded-md border border-emerald-400/30">
                          AI Inventory Engine • Active
                        </span>
                      </div>
                      <h2 className={`text-2xl font-black mt-1.5 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Smart Inventory & AI Analysis</h2>
                      <p className="text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
                        ระบบจัดการคลังสินค้าอัจฉริยะ พร้อม AI วิเคราะห์แนวโน้มสินค้าใกล้หมดและประเมินสต็อกล่วงหน้า
                      </p>
                    </div>
                  </div>
                  <button onClick={() => toast.success('เชื่อมต่อ Google Sheets สำเร็จ! กำลังซิงค์ข้อมูล...')} className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-6 py-3 rounded-2xl text-xs transition shadow-xl shadow-emerald-500/20 self-start lg:self-center flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                    Connect Google Sheets
                  </button>"""

content = re.sub(r'<div className="flex items-start gap-4">.*?ระบบจัดการคลังสินค้าอัจฉริยะ พร้อม AI วิเคราะห์แนวโน้มสินค้าใกล้หมดและประเมินสต็อกล่วงหน้า\s*</p>\s*</div>\s*</div>', sheet_button, content, flags=re.DOTALL)

# 2. Add product list table to Inventory tab
product_table = """                  <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-200/90 mt-4">
                    <strong className="text-emerald-400 flex items-center gap-2 mb-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.9" viewBox="0 0 24 24"><path d="M12 2L14.8 8.5L21.5 11.2L14.8 14L12 20.5L9.2 14L2.5 11.2L9.2 8.5L12 2Z" fill="currentColor" fillOpacity="0.18"/><path d="M19 3v4M21 5h-4M5 17v3M6.5 18.5h-3"/></svg>
                      AI Restocking Strategy (กลยุทธ์การเติมสินค้า)
                    </strong>
                    แนะนำให้ใช้ระบบ Just-in-Time สำหรับกลุ่มบรรจุภัณฑ์เพื่อลดพื้นที่จัดเก็บ และเพิ่ม Buffer Stock 15% สำหรับสินค้ายอดฮิต Top 5 ป้องกันการเสียโอกาสในการขาย
                  </div>
                </div>
              </div>

              {/* Product List Table */}
              <div className={`p-8 lg:p-10 rounded-3xl border shadow-2xl backdrop-blur-xl ${theme === 'dark' ? 'bg-[#091024]/90 border-white/10' : 'bg-white border-slate-200'}`}>
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-4 h-8 bg-blue-400 rounded-full"></div>
                    <div>
                      <h3 className={`text-xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>รายการสินค้าคงคลัง (Inventory List)</h3>
                      <p className="text-sm text-slate-400 mt-1">อัปเดตล่าสุด: เมื่อสักครู่</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-xl text-xs font-bold border border-white/10 transition">Filter</button>
                    <button className="bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-xl text-xs font-bold border border-white/10 transition">Export CSV</button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className={`${theme === 'dark' ? 'bg-white/5 text-slate-300' : 'bg-slate-100 text-slate-700'} border-b border-white/10`}>
                      <tr>
                        <th className="p-4 font-bold rounded-tl-xl">SKU / รหัสสินค้า</th>
                        <th className="p-4 font-bold">ชื่อสินค้า</th>
                        <th className="p-4 font-bold text-right">ราคา (THB)</th>
                        <th className="p-4 font-bold text-center">คงเหลือ (Stock)</th>
                        <th className="p-4 font-bold rounded-tr-xl">สถานะ (Status)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      <tr className="hover:bg-white/5 transition">
                        <td className="p-4 font-mono text-xs text-emerald-300">SRM-001</td>
                        <td className="p-4 font-bold text-white">เซรั่มบำรุงผิวสูตรกลางคืน (Premium)</td>
                        <td className="p-4 text-right">1,290.00</td>
                        <td className="p-4 text-center">450</td>
                        <td className="p-4"><span className="px-2 py-1 bg-emerald-500/20 text-emerald-400 rounded-lg text-xs font-bold">In Stock</span></td>
                      </tr>
                      <tr className="hover:bg-white/5 transition">
                        <td className="p-4 font-mono text-xs text-amber-300">PKG-009</td>
                        <td className="p-4 font-bold text-white">กล่องบรรจุภัณฑ์ Size M</td>
                        <td className="p-4 text-right">15.00</td>
                        <td className="p-4 text-center text-amber-400 font-bold">12</td>
                        <td className="p-4"><span className="px-2 py-1 bg-amber-500/20 text-amber-400 rounded-lg text-xs font-bold">Low Stock</span></td>
                      </tr>
                      <tr className="hover:bg-white/5 transition">
                        <td className="p-4 font-mono text-xs text-red-300">SKU-A045</td>
                        <td className="p-4 font-bold text-white">ครีมกันแดด SPF50+ (ล็อตเก่า)</td>
                        <td className="p-4 text-right">450.00</td>
                        <td className="p-4 text-center text-red-400 font-bold">280</td>
                        <td className="p-4"><span className="px-2 py-1 bg-red-500/20 text-red-400 rounded-lg text-xs font-bold">Dead Stock</span></td>
                      </tr>
                      <tr className="hover:bg-white/5 transition">
                        <td className="p-4 font-mono text-xs text-slate-400">GFT-001</td>
                        <td className="p-4 font-bold text-white">เซ็ตของขวัญปีใหม่</td>
                        <td className="p-4 text-right">2,500.00</td>
                        <td className="p-4 text-center text-slate-500">0</td>
                        <td className="p-4"><span className="px-2 py-1 bg-slate-500/20 text-slate-400 rounded-lg text-xs font-bold">Out of Stock</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>"""

content = content.replace("""                  <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-200/90 mt-4">
                    <strong className="text-emerald-400 flex items-center gap-2 mb-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.9" viewBox="0 0 24 24"><path d="M12 2L14.8 8.5L21.5 11.2L14.8 14L12 20.5L9.2 14L2.5 11.2L9.2 8.5L12 2Z" fill="currentColor" fillOpacity="0.18"/><path d="M19 3v4M21 5h-4M5 17v3M6.5 18.5h-3"/></svg>
                      AI Restocking Strategy (กลยุทธ์การเติมสินค้า)
                    </strong>
                    แนะนำให้ใช้ระบบ Just-in-Time สำหรับกลุ่มบรรจุภัณฑ์เพื่อลดพื้นที่จัดเก็บ และเพิ่ม Buffer Stock 15% สำหรับสินค้ายอดฮิต Top 5 ป้องกันการเสียโอกาสในการขาย
                  </div>
                </div>
              </div>""", product_table)


# 3. Add Admin nav item
nav_item = """              { id: 'settings', label: 'ตั้งค่าระบบ', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg> },
              { id: 'admin', label: 'ผู้ดูแลระบบ', badge: 'Admin', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg> },"""
content = content.replace("""              { id: 'settings', label: 'ตั้งค่าระบบ', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg> },""", nav_item)

# 4. Add Admin title description
desc_item = """                {activeTab === 'settings' && 'Enterprise System Settings'}
                {activeTab === 'admin' && 'Admin Control Panel'}"""
content = content.replace("                {activeTab === 'settings' && 'Enterprise System Settings'}", desc_item)

# 5. Add Admin tab content
admin_tab_content = """          {/* TAB: ADMIN */}
          {activeTab === 'admin' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className={`p-8 rounded-3xl border relative overflow-hidden shadow-2xl ${
                theme === 'dark' 
                  ? 'bg-gradient-to-r from-indigo-500/20 via-[#0b1228] to-[#040817] border-indigo-400/40' 
                  : 'bg-gradient-to-r from-indigo-100/60 via-white to-indigo-50 border-indigo-300'
              }`}>
                <div className="relative flex flex-col lg:flex-row justify-between lg:items-center gap-6">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-400 to-indigo-600 flex items-center justify-center text-slate-950 shadow-xl flex-shrink-0">
                      <svg className="w-8 h-8 text-slate-950" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black tracking-widest uppercase bg-indigo-400/20 text-indigo-400 px-3 py-1 rounded-md border border-indigo-400/30">
                          SuperAdmin Access
                        </span>
                      </div>
                      <h2 className={`text-2xl font-black mt-1.5 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Admin Control Panel</h2>
                      <p className="text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
                        จัดการสิทธิ์ผู้ใช้งาน, ดูบันทึกการเข้าสู่ระบบ (Audit Logs) และจัดการการเชื่อมต่อระบบภายนอก
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Admin Features Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* User Management */}
                <div className={`p-8 rounded-3xl border shadow-xl backdrop-blur-xl ${theme === 'dark' ? 'bg-[#091024]/80 border-white/10' : 'bg-white border-slate-200'}`}>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className={`text-lg font-black flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                      <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path></svg>
                      จัดการผู้ใช้งาน (User Management)
                    </h3>
                    <button className="bg-indigo-500 hover:bg-indigo-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs transition shadow-md">
                      + เพิ่มผู้ใช้
                    </button>
                  </div>
                  <div className="space-y-4">
                    {[
                      { name: 'Admin CEO', email: 'admin@insightflow.ai', role: 'Super Admin', status: 'Active' },
                      { name: 'Marketing Team', email: 'mkt@insightflow.ai', role: 'Editor', status: 'Active' },
                      { name: 'Store Manager', email: 'store@insightflow.ai', role: 'Viewer', status: 'Inactive' },
                    ].map((user, i) => (
                      <div key={i} className={`flex items-center justify-between p-4 rounded-2xl border ${theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
                        <div>
                          <p className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{user.name}</p>
                          <p className="text-xs text-slate-400">{user.email}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`text-[10px] font-bold px-2 py-1 rounded-md ${
                            user.role === 'Super Admin' ? 'bg-indigo-500/20 text-indigo-400' :
                            user.role === 'Editor' ? 'bg-emerald-500/20 text-emerald-400' :
                            'bg-slate-500/20 text-slate-400'
                          }`}>{user.role}</span>
                          <span className={`w-2 h-2 rounded-full ${user.status === 'Active' ? 'bg-emerald-400' : 'bg-red-400'}`}></span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Audit Logs */}
                <div className={`p-8 rounded-3xl border shadow-xl backdrop-blur-xl ${theme === 'dark' ? 'bg-[#091024]/80 border-white/10' : 'bg-white border-slate-200'}`}>
                  <h3 className={`text-lg font-black flex items-center gap-2 mb-6 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                    <svg className="w-5 h-5 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                    บันทึกระบบ (Audit Logs)
                  </h3>
                  <div className="space-y-4">
                    {[
                      { action: 'Export AI Report (.pdf)', user: 'Admin CEO', time: '2 mins ago', type: 'info' },
                      { action: 'Connected to Google Sheets', user: 'Admin CEO', time: '15 mins ago', type: 'success' },
                      { action: 'Failed Login Attempt', user: 'Unknown IP', time: '1 hour ago', type: 'error' },
                      { action: 'Updated SKU-A045 Stock', user: 'Store Manager', time: '3 hours ago', type: 'info' },
                    ].map((log, i) => (
                      <div key={i} className={`flex items-start gap-4 p-4 rounded-2xl border ${theme === 'dark' ? 'bg-white/5 border-white/5' : 'bg-slate-50 border-slate-100'}`}>
                        <div className={`w-2 h-2 mt-1.5 rounded-full ${
                          log.type === 'error' ? 'bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.8)]' :
                          log.type === 'success' ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]' :
                          'bg-indigo-400 shadow-[0_0_8px_rgba(129,140,248,0.8)]'
                        }`}></div>
                        <div>
                          <p className={`text-sm font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{log.action}</p>
                          <p className="text-xs text-slate-400 mt-1">{log.user} • {log.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <button className="w-full mt-6 py-3 border border-white/10 rounded-xl text-sm font-bold text-slate-400 hover:text-white hover:bg-white/5 transition">
                    View All Logs
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB: SETTINGS */}"""
content = content.replace("          {/* TAB: SETTINGS */}", admin_tab_content)

with open('src/App.jsx', 'w') as f:
    f.write(content)
