import re

with open('src/App.jsx', 'r') as f:
    content = f.read()

# 1. Add nav item
nav_item = """              { id: 'inventory', label: 'คลังสินค้า AI', badge: 'New', icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg> },
              { id: 'insights',"""
content = content.replace("              { id: 'insights',", nav_item)

# 2. Add description text
desc_item = """                {activeTab === 'live' && 'Real-time Telemetry & Live Pulse'}
                {activeTab === 'inventory' && 'AI-Powered Smart Inventory'}"""
content = content.replace("                {activeTab === 'live' && 'Real-time Telemetry & Live Pulse'}", desc_item)

# 3. Add tab content
tab_content = """          {/* TAB: INVENTORY */}
          {activeTab === 'inventory' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className={`p-8 rounded-3xl border relative overflow-hidden shadow-2xl ${
                theme === 'dark' 
                  ? 'bg-gradient-to-r from-emerald-500/20 via-[#0b1228] to-[#040817] border-emerald-400/40' 
                  : 'bg-gradient-to-r from-emerald-100/60 via-white to-emerald-50 border-emerald-300'
              }`}>
                <div className="relative flex flex-col lg:flex-row justify-between lg:items-center gap-6">
                  <div className="flex items-start gap-4">
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
                </div>
              </div>

              {/* Inventory Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className={`p-6 rounded-3xl border shadow-xl backdrop-blur-xl relative overflow-hidden ${theme === 'dark' ? 'bg-[#091024]/80 border-white/10' : 'bg-white border-slate-200'}`}>
                  <div className="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400 mb-4 border border-blue-500/20">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4" /></svg>
                  </div>
                  <h3 className={`text-lg font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Total SKUs</h3>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-3xl font-black text-blue-400">1,248</span>
                    <span className="text-sm text-emerald-400 font-bold">+12 this week</span>
                  </div>
                </div>
                
                <div className={`p-6 rounded-3xl border shadow-xl backdrop-blur-xl relative overflow-hidden ${theme === 'dark' ? 'bg-[#091024]/80 border-white/10' : 'bg-white border-slate-200'}`}>
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400 mb-4 border border-amber-500/20">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                  </div>
                  <h3 className={`text-lg font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Low Stock Alerts</h3>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-3xl font-black text-amber-400">14</span>
                    <span className="text-sm text-slate-400">Items require attention</span>
                  </div>
                </div>

                <div className={`p-6 rounded-3xl border shadow-xl backdrop-blur-xl relative overflow-hidden ${theme === 'dark' ? 'bg-[#091024]/80 border-white/10' : 'bg-white border-slate-200'}`}>
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 mb-4 border border-emerald-500/20">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  </div>
                  <h3 className={`text-lg font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>AI Stock Prediction</h3>
                  <div className="mt-2 flex items-baseline gap-2">
                    <span className="text-3xl font-black text-emerald-400">98%</span>
                    <span className="text-sm text-slate-400">Accuracy rate</span>
                  </div>
                </div>
              </div>

              {/* AI Analysis Section */}
              <div className={`p-8 lg:p-10 rounded-3xl border shadow-2xl backdrop-blur-xl ${theme === 'dark' ? 'bg-[#091024]/90 border-white/10' : 'bg-white border-slate-200'}`}>
                <div className="flex items-center gap-4 mb-8 pb-6 border-b border-white/10">
                  <div className="w-4 h-8 bg-emerald-400 rounded-full"></div>
                  <div>
                    <h3 className={`text-2xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>AI Inventory Insights</h3>
                    <p className="text-sm text-slate-400 mt-1">บทวิเคราะห์และคาดการณ์จาก AI อัตโนมัติ</p>
                  </div>
                </div>

                <div className="space-y-6 text-sm lg:text-base leading-loose text-slate-300">
                  <p>
                    <strong className="text-white text-lg">📈 1. คาดการณ์ความต้องการสินค้า (Demand Forecasting)</strong><br />
                    AI ตรวจพบแนวโน้มความต้องการสินค้ากลุ่ม <span className="text-emerald-400 font-bold">"เซรั่มบำรุงผิว"</span> ที่จะพุ่งสูงขึ้น 45% ในอีก 2 สัปดาห์ข้างหน้า เนื่องจากเข้าสู่ช่วงแคมเปญใหญ่ แนะนำให้เตรียมสต็อกล่วงหน้าอย่างน้อย 2,000 ชิ้น
                  </p>
                  
                  <p>
                    <strong className="text-white text-lg">⚠️ 2. สินค้าค้างสต็อก (Dead Stock Analysis)</strong><br />
                    พบสินค้า <span className="font-mono text-amber-200">SKU-A045</span> ไม่มีการเคลื่อนไหวเกิน 90 วัน คิดเป็นมูลค่าทุนจมกว่า 120,000 บาท แนะนำให้จัดโปรโมชั่น Flash Sale หรือ Bundle กับสินค้าขายดีเพื่อระบายสต็อก
                  </p>

                  <div className="p-5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-200/90 mt-4">
                    <strong className="text-emerald-400 flex items-center gap-2 mb-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.9" viewBox="0 0 24 24"><path d="M12 2L14.8 8.5L21.5 11.2L14.8 14L12 20.5L9.2 14L2.5 11.2L9.2 8.5L12 2Z" fill="currentColor" fillOpacity="0.18"/><path d="M19 3v4M21 5h-4M5 17v3M6.5 18.5h-3"/></svg>
                      AI Restocking Strategy (กลยุทธ์การเติมสินค้า)
                    </strong>
                    แนะนำให้ใช้ระบบ Just-in-Time สำหรับกลุ่มบรรจุภัณฑ์เพื่อลดพื้นที่จัดเก็บ และเพิ่ม Buffer Stock 15% สำหรับสินค้ายอดฮิต Top 5 ป้องกันการเสียโอกาสในการขาย
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: บทวิเคราะห์ AI (INSIGHTS) */}"""
content = content.replace("          {/* TAB: บทวิเคราะห์ AI (INSIGHTS) */}", tab_content)

with open('src/App.jsx', 'w') as f:
    f.write(content)
