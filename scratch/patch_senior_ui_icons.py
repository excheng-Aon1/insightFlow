with open('/Users/pmsp63/Desktop/insightflow-app/src/App.jsx', 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Add fontScale state right after theme state
old_theme_state = "  const [theme, setTheme] = useState('dark');"
new_theme_state = """  const [theme, setTheme] = useState('dark');
  const [fontScale, setFontScale] = useState('large'); // 'normal' | 'large' | 'xlarge' (Default 'large' for Senior-Friendly readability)

  useEffect(() => {
    document.documentElement.setAttribute('data-font-scale', fontScale);
  }, [fontScale]);"""

assert old_theme_state in code, "old_theme_state not found"
code = code.replace(old_theme_state, new_theme_state, 1)

# 2. Replace the Sidebar Navigation with Modern 3D Gradient Icon Badges + Subtitle Descriptions + Large Senior-Friendly Touch Targets
old_sidebar_block_start = "          <nav className=\"p-3 space-y-1 mt-3\">"
old_sidebar_block_end = "          </nav>"

start_idx = code.find(old_sidebar_block_start)
end_idx = code.find(old_sidebar_block_end, start_idx) + len(old_sidebar_block_end)
assert start_idx != -1 and end_idx != -1, "sidebar nav block not found"

new_sidebar_nav = """          <nav className="p-3.5 space-y-2 mt-2">
            {isSidebarOpen && (
              <div className="px-3 pb-1.5">
                <p className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  เมนูหลัก (คลิกเลือกหน้า)
                </p>
              </div>
            )}
            {[
              { 
                id: 'overview', 
                label: '1. ภาพรวมธุรกิจ',
                subLabel: 'ยอดขาย & เป้าหมายร้าน',
                iconBg: 'from-amber-400 to-orange-500 text-slate-950 shadow-amber-500/30',
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                ) 
              },
              { 
                id: 'customers', 
                label: '2. วิเคราะห์ลูกค้า', 
                subLabel: 'ลูกค้าประจำ VIP & คนหาย',
                badge: 'RFM',
                iconBg: 'from-pink-500 to-rose-500 text-white shadow-rose-500/30',
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ) 
              },
              { 
                id: 'staff_pos', 
                label: '3. พนักงาน & จุดขาย', 
                subLabel: 'ยอดต่อบิล & จับทุจริตบิล',
                badge: 'POS',
                iconBg: 'from-sky-400 to-blue-600 text-white shadow-sky-500/30',
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ) 
              },
              { 
                id: 'inventory', 
                label: '4. คลังสินค้าอัจฉริยะ', 
                subLabel: 'เช็คของใกล้หมด & สั่งเพิ่ม',
                badge: 'สต็อก',
                iconBg: 'from-emerald-400 to-teal-600 text-slate-950 shadow-emerald-500/30',
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                ) 
              },
              { 
                id: 'insights', 
                label: '5. ถาม-ตอบ AI ผู้ช่วย', 
                subLabel: 'ปรึกษาปัญหาธุรกิจได้ทันที',
                badge: 'AI',
                iconBg: 'from-purple-500 to-indigo-600 text-white shadow-purple-500/30',
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                  </svg>
                ) 
              },
              { 
                id: 'live', 
                label: '6. สถานะหน้าร้านสด', 
                subLabel: 'ดูความเคลื่อนไหวเรียลไทม์',
                badge: 'สด',
                iconBg: 'from-cyan-400 to-sky-600 text-slate-950 shadow-cyan-500/30',
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ) 
              },
              { 
                id: 'database', 
                label: '7. ฐานข้อมูลร้านค้า', 
                subLabel: 'ตารางเก็บข้อมูลการขาย',
                badge: 'DB',
                iconBg: 'from-blue-400 to-indigo-500 text-white shadow-blue-500/30',
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                  </svg>
                ) 
              },
              { 
                id: 'admin', 
                label: '8. ผู้ดูแลระบบสูงสุด', 
                subLabel: 'ความปลอดภัย & PDPA',
                iconBg: 'from-red-500 to-rose-600 text-white shadow-red-500/30',
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                ) 
              },
              { 
                id: 'settings', 
                label: '9. ตั้งค่าระบบ', 
                subLabel: 'ปรับแต่งการแจ้งเตือน',
                iconBg: 'from-slate-400 to-slate-600 text-white shadow-slate-500/30',
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ) 
              },
            ].filter(item => {
              if (item.id === 'admin') {
                return user?.email === 'pongsatornnantakong88@gmail.com';
              }
              return true;
            }).map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between p-2.5 rounded-2xl text-left transition-all duration-200 cursor-pointer ${
                  activeTab === item.id 
                    ? 'bg-gradient-to-r from-amber-400/25 via-amber-400/10 to-transparent text-white border-2 border-amber-400 shadow-lg shadow-amber-400/10 scale-[1.01]' 
                    : 'text-slate-200 hover:text-white hover:bg-white/10 border-2 border-transparent'
                }`}
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className={`w-11 h-11 rounded-2xl bg-gradient-to-br ${item.iconBg} flex items-center justify-center flex-shrink-0 shadow-lg ${
                    activeTab === item.id ? 'ring-2 ring-white scale-105' : 'opacity-90'
                  } transition-transform`}>
                    {item.icon}
                  </div>
                  {isSidebarOpen && (
                    <div className="min-w-0">
                      <p className={`text-sm font-bold truncate ${activeTab === item.id ? 'text-amber-300' : 'text-white'}`}>
                        {item.label}
                      </p>
                      <p className="text-xs text-slate-300 truncate mt-0.5">
                        {item.subLabel}
                      </p>
                    </div>
                  )}
                </div>
                {isSidebarOpen && item.badge && (
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-lg flex-shrink-0 ${
                    item.badge === 'สด' ? 'bg-emerald-500/25 text-emerald-300 border border-emerald-400/40' :
                    item.badge === 'RFM' || item.badge === 'POS' ? 'bg-amber-400 text-slate-950' :
                    'bg-white/15 text-white border border-white/20'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>"""

code = code[:start_idx] + new_sidebar_nav + code[end_idx:]

# 3. Widening sidebar slightly when open so Thai text + subLabel never truncates (w-64 -> w-72)
code = code.replace(
    "isSidebarOpen ? 'w-64' : 'w-20'",
    "isSidebarOpen ? 'w-76 sm:w-80' : 'w-24'"
)

# 4. Upgrade Top Header Titles to Clear Plain Thai + Modern Icon + Senior Font Resizer ("ก- / ก+ / ก++")
old_header_section = """          <div className="flex items-center gap-4">
            <div>
              <h1 className={`text-xl font-black tracking-tight flex items-center gap-2.5 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                {activeTab === 'overview' && 'Executive Command Center'}
                {activeTab === 'live' && 'Real-time Telemetry & Live Pulse'}
                {activeTab === 'customers' && 'Customer Insights, RFM & LTV Intelligence'}
                {activeTab === 'staff_pos' && 'Staff & POS Performance • Audit & Fraud Guard'}
                {activeTab === 'inventory' && 'AI-Powered Smart Inventory'}
                {activeTab === 'insights' && 'AI Neural Insights & Conversational Copilot'}
                {activeTab === 'database' && 'SQLite Enterprise Database Instance'}
                {activeTab === 'settings' && 'Enterprise System Settings'}
                {activeTab === 'admin' && 'Admin Control Panel'}
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Systems Operational
                </span>
              </h1>
              <p className="text-xs text-slate-400 mt-0.5">SQLite High-Speed Engine • AI Billing & Analytics Active</p>
            </div>
          </div>"""

new_header_section = """          <div className="flex items-center gap-4">
            <div>
              <h1 className={`text-xl sm:text-2xl font-black tracking-tight flex flex-wrap items-center gap-3 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                {activeTab === 'overview' && '🏠 หน้า 1: ภาพรวมธุรกิจและเป้าหมายร้าน'}
                {activeTab === 'customers' && '👥 หน้า 2: วิเคราะห์ลูกค้าประจำ VIP & ลูกค้าที่หายไป'}
                {activeTab === 'staff_pos' && '🛡️ หน้า 3: วิเคราะห์พนักงานขาย & ตรวจสอบเครื่องคิดเงิน (POS)'}
                {activeTab === 'inventory' && '📦 หน้า 4: คลังสินค้าอัจฉริยะ (แจ้งเตือนของใกล้หมด)'}
                {activeTab === 'insights' && '🤖 หน้า 5: ถาม-ตอบผู้ช่วย AI อัจฉริยะ'}
                {activeTab === 'live' && '⚡ หน้า 6: สถานะการขายหน้าร้านแบบสด (Real-time)'}
                {activeTab === 'database' && '🗄️ หน้า 7: ตารางฐานข้อมูลร้านค้า (SQLite)'}
                {activeTab === 'admin' && '🔒 หน้า 8: จัดการความปลอดภัยและข้อมูลลูกค้า (Admin)'}
                {activeTab === 'settings' && '⚙️ หน้า 9: ตั้งค่าระบบและการแจ้งเตือน'}
                <span className="inline-flex items-center gap-2 text-xs font-bold text-emerald-300 bg-emerald-500/15 px-3 py-1 rounded-full border border-emerald-500/30">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> ระบบทำงานปกติ
                </span>
              </h1>
              <p className="text-xs text-slate-300 mt-1">
                {activeTab === 'overview' && 'คำแนะนำ: กรอกเป้าหมายยอดขายที่ต้องการด้านล่าง หรือเลื่อนดูสรุปยอดขายรวมของร้านได้เลยครับ'}
                {activeTab === 'customers' && 'คำแนะนำ: กดที่กล่องสีด้านล่างเพื่อดูรายชื่อลูกค้าชั้นดี (VIP) หรือลูกค้าที่หายไปนาน แล้วกดปุ่ม "โทร" หรือ "ส่งข้อความ" ได้ทันที'}
                {activeTab === 'staff_pos' && 'คำแนะนำ: ดูว่าพนักงานคนไหนขายเก่งที่สุด และตรวจเช็คการกดยกเลิกบิล (Void) หรือเปิดลิ้นชักเก็บเงินผิดปกติ'}
                {activeTab === 'inventory' && 'คำแนะนำ: รายการสีแดงคือสินค้าที่ใกล้หมดสต็อก สามารถกดปุ่มสั่งซื้อเพิ่มได้ทันที'}
                {activeTab === 'insights' && 'คำแนะนำ: พิมพ์คำถามภาษาไทยเหมือนคุยกับเลขาส่วนตัว เช่น "เดือนนี้สินค้าอะไรขายดีที่สุด?"'}
                {activeTab === 'live' && 'คำแนะนำ: หน้านี้แสดงความเคลื่อนไหวของระบบและการซื้อขายแบบวินาทีต่อวินาที'}
                {activeTab === 'database' && 'คำแนะนำ: ตารางเก็บข้อมูลยอดขายจริงทั้งหมดในระบบ สามารถกดส่งออกเป็นไฟล์ Excel (.csv) ได้'}
                {activeTab === 'admin' && 'คำแนะนำ: หน้าเฉพาะเจ้าของกิจการสำหรับดูแลความปลอดภัยและสิทธิ์การเข้าถึงข้อมูล'}
                {activeTab === 'settings' && 'คำแนะนำ: ปรับแต่งชื่อร้านค้า การแจ้งเตือน และขนาดตัวอักษรได้ตามต้องการ'}
              </p>
            </div>
          </div>"""

assert old_header_section in code, "old_header_section not found"
code = code.replace(old_header_section, new_header_section, 1)

# 5. Add Senior-Friendly Font Size Switcher ("ขนาดตัวอักษร: ปกติ / ใหญ่ / ใหญ่มาก") into the top header bar
old_theme_toggle = """            {/* ปุ่มสลับโหมดมืด/สว่าง */}"""
new_font_and_theme_controls = """            {/* ปุ่มปรับขนาดตัวอักษรสำหรับผู้ใหญ่ (Senior Readability Control) */}
            <div className={`flex items-center gap-1 p-1 rounded-2xl border ${
              theme === 'dark' ? 'bg-[#0b1020] border-white/15' : 'bg-slate-100 border-slate-300'
            }`} title="ปรับขนาดตัวหนังสือให้อ่านสบายตา">
              <span className="text-xs font-bold text-amber-400 px-2 hidden xl:inline">🔍 ขนาดตัวหนังสือ:</span>
              {[
                { id: 'normal', label: 'ก ปกติ' },
                { id: 'large', label: 'ก+ ใหญ่' },
                { id: 'xlarge', label: 'ก++ ใหญ่มาก' }
              ].map((sz) => (
                <button
                  key={sz.id}
                  onClick={() => {
                    setFontScale(sz.id);
                    toast.success(`🔍 ปรับขนาดตัวหนังสือเป็น "${sz.label}" เรียบร้อยแล้ว`);
                  }}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    fontScale === sz.id
                      ? 'bg-amber-400 text-slate-950 shadow-md'
                      : 'text-slate-300 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {sz.label}
                </button>
              ))}
            </div>

            {/* ปุ่มสลับโหมดมืด/สว่าง */}"""

assert old_theme_toggle in code, "old_theme_toggle not found"
code = code.replace(old_theme_toggle, new_font_and_theme_controls, 1)

# 6. Add a Quick Easy Navigation Bar (แถบทางลัดปุ่มใหญ่สำหรับผู้สูงอายุ 60-70 ปี กดสลับหน้าหลักได้ง่ายๆ) right at the top of <main>
old_main_start = '<main className="p-8 space-y-8 flex-1">'
new_main_start = """<main className="p-6 sm:p-8 space-y-8 flex-1">

          {/* แถบปุ่มทางลัดขนาดใหญ่เข้าใจง่าย (Senior-Friendly Quick Navigation Cards) */}
          <div className={`p-4 sm:p-5 rounded-3xl border shadow-xl ${
            theme === 'dark' ? 'bg-[#091022]/90 border-white/15' : 'bg-white border-slate-200'
          }`}>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-amber-400"></span>
                <span className={`text-sm font-bold ${theme === 'dark' ? 'text-amber-300' : 'text-slate-800'}`}>
                  ทางลัดเลือกหน้าใช้งานด่วน (คลิกปุ่มที่ต้องการดูได้เลย):
                </span>
              </div>
              <span className="text-xs text-slate-300">
                💡 ออกแบบปุ่มและไอคอนขนาดใหญ่พิเศษ อ่านง่าย สบายตา
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {[
                {
                  id: 'overview',
                  title: '1. ภาพรวม & เป้าหมาย',
                  desc: 'ดูยอดขายรวมวันนี้',
                  gradient: 'from-amber-400 to-orange-500',
                  icon: (
                    <svg className="w-6 h-6 text-slate-950" fill="none" stroke="currentColor" strokeWidth="2.3" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                    </svg>
                  )
                },
                {
                  id: 'customers',
                  title: '2. วิเคราะห์ลูกค้า',
                  desc: 'ลูกค้า VIP & คนหาย',
                  gradient: 'from-pink-500 to-rose-500',
                  icon: (
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2.3" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )
                },
                {
                  id: 'staff_pos',
                  title: '3. พนักงาน & จุดขาย',
                  desc: 'ยอดขาย & จับทุจริตบิล',
                  gradient: 'from-sky-400 to-blue-600',
                  icon: (
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2.3" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  )
                },
                {
                  id: 'inventory',
                  title: '4. คลังสินค้า',
                  desc: 'เช็คของใกล้หมดสต็อก',
                  gradient: 'from-emerald-400 to-teal-600',
                  icon: (
                    <svg className="w-6 h-6 text-slate-950" fill="none" stroke="currentColor" strokeWidth="2.3" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                  )
                },
                {
                  id: 'insights',
                  title: '5. ถามผู้ช่วย AI',
                  desc: 'พิมพ์ถามปัญหาธุรกิจ',
                  gradient: 'from-purple-500 to-indigo-600',
                  icon: (
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2.3" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  )
                },
                {
                  id: 'database',
                  title: '6. ตารางข้อมูลขาย',
                  desc: 'ดูบิลและส่งออกไฟล์',
                  gradient: 'from-cyan-400 to-blue-500',
                  icon: (
                    <svg className="w-6 h-6 text-slate-950" fill="none" stroke="currentColor" strokeWidth="2.3" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4" />
                    </svg>
                  )
                }
              ].map((navCard) => (
                <button
                  key={navCard.id}
                  onClick={() => setActiveTab(navCard.id)}
                  className={`p-3.5 rounded-2xl border-2 text-left transition-all flex items-center gap-3 cursor-pointer ${
                    activeTab === navCard.id
                      ? 'bg-amber-400/20 border-amber-400 shadow-lg shadow-amber-400/15 scale-[1.02]'
                      : 'bg-black/25 border-white/10 hover:border-white/30 hover:bg-white/5'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${navCard.gradient} flex items-center justify-center flex-shrink-0 shadow-md`}>
                    {navCard.icon}
                  </div>
                  <div className="min-w-0">
                    <p className={`text-sm font-bold truncate ${activeTab === navCard.id ? 'text-amber-300' : 'text-white'}`}>
                      {navCard.title}
                    </p>
                    <p className="text-xs text-slate-300 truncate mt-0.5">
                      {navCard.desc}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>"""

assert old_main_start in code, "old_main_start not found"
code = code.replace(old_main_start, new_main_start, 1)

with open('/Users/pmsp63/Desktop/insightflow-app/src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(code)

print("Successfully upgraded icons, navigation, and senior-friendly UI in src/App.jsx")

