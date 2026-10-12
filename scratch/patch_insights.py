import re

def patch_insights_tab():
    with open('src/App.jsx', 'r', encoding='utf-8') as f:
        content = f.read()

    new_insights_tab = '''{activeTab === 'insights' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className={`p-8 rounded-3xl border relative overflow-hidden shadow-2xl ${
                theme === 'dark' 
                  ? 'bg-gradient-to-r from-amber-500/20 via-[#0b1228] to-[#040817] border-amber-400/40' 
                  : 'bg-gradient-to-r from-amber-100/60 via-white to-amber-50 border-amber-300'
              }`}>
                <div className="relative flex flex-col lg:flex-row justify-between lg:items-center gap-6">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 shadow-xl flex-shrink-0">
                      <svg className="w-8 h-8 text-slate-950" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black tracking-widest uppercase bg-amber-400/20 text-amber-400 px-3 py-1 rounded-md border border-amber-400/30">
                          Neural Strategic Engine • Active
                        </span>
                        <span className="text-xs text-slate-400 font-mono">Confidence: 99.2% (InsightFlow AI)</span>
                      </div>
                      <h2 className={`text-2xl font-black mt-1.5 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>AI Executive Brief & Predictive Analysis</h2>
                      <p className="text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
                        บทวิเคราะห์เชิงลึกอัตโนมัติจากฐานข้อมูลทั้งหมด แจ้งเตือนจุดที่ต้องระวังและคาดการณ์เทรนด์ในอนาคต เพื่อการตัดสินใจระดับผู้บริหาร
                      </p>
                    </div>
                  </div>
                  <button onClick={() => toast.success('ส่งออกรายงานสรุปผู้บริหารรูปแบบ PDF สำเร็จ')} className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-6 py-3 rounded-2xl text-xs transition shadow-xl shadow-amber-400/20 self-start lg:self-center flex items-center gap-2">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
                    Export AI Report (.pdf)
                  </button>
                </div>
              </div>

              {/* 3 Predictive Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Card 1 */}
                <div className={`p-6 rounded-3xl border shadow-xl backdrop-blur-xl relative overflow-hidden ${theme === 'dark' ? 'bg-[#091024]/80 border-white/10' : 'bg-white border-slate-200'}`}>
                  <div className="absolute top-0 right-0 w-24 h-24 bg-red-500/10 rounded-full blur-2xl"></div>
                  <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center text-red-400 mb-4 border border-red-500/20">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path d="M16 18h6v-6"/><path d="M22 18l-8.5-8.5-5 5L2 8"/></svg>
                  </div>
                  <h3 className={`text-lg font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Profitability Anomalies</h3>
                  <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                    พบแคมเปญโฆษณา (Channel: FB Ads) มีต้นทุนพุ่งสูงกว่าปกติ 18% เมื่อเทียบกับกำไรสุทธิ แนะนำให้ปรับลดงบประมาณชั่วคราว
                  </p>
                </div>
                
                {/* Card 2 */}
                <div className={`p-6 rounded-3xl border shadow-xl backdrop-blur-xl relative overflow-hidden ${theme === 'dark' ? 'bg-[#091024]/80 border-white/10' : 'bg-white border-slate-200'}`}>
                  <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 rounded-full blur-2xl"></div>
                  <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400 mb-4 border border-amber-500/20">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.9" viewBox="0 0 24 24"><path d="M12 2L20.5 6.8V17.2L12 22L3.5 17.2V6.8L12 2Z" fill="currentColor" fillOpacity="0.12"/><path d="M3.5 6.8L12 11.6L20.5 6.8M12 11.6V22"/><path d="M7.8 4.4L16.2 9.2"/></svg>
                  </div>
                  <h3 className={`text-lg font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Predictive Restocking</h3>
                  <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                    สินค้ากลุ่ม "Premium Package" มีแนวโน้มจะหมดสต็อกภายใน 4 วัน (ยอดขายเร่งตัวขึ้น 2.5 เท่า) ควรทำการสั่งซื้อเพิ่มด่วน 1,500 ชิ้น
                  </p>
                </div>

                {/* Card 3 */}
                <div className={`p-6 rounded-3xl border shadow-xl backdrop-blur-xl relative overflow-hidden ${theme === 'dark' ? 'bg-[#091024]/80 border-white/10' : 'bg-white border-slate-200'}`}>
                  <div className="absolute top-0 right-0 w-24 h-24 bg-sky-500/10 rounded-full blur-2xl"></div>
                  <div className="w-10 h-10 rounded-xl bg-sky-500/20 flex items-center justify-center text-sky-400 mb-4 border border-sky-500/20">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.9" viewBox="0 0 24 24"><path d="M12 2L14.8 8.5L21.5 11.2L14.8 14L12 20.5L9.2 14L2.5 11.2L9.2 8.5L12 2Z" fill="currentColor" fillOpacity="0.18"/><path d="M19 3v4M21 5h-4M5 17v3M6.5 18.5h-3"/></svg>
                  </div>
                  <h3 className={`text-lg font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Customer RFM Segmentation</h3>
                  <p className="text-sm text-slate-400 mt-2 leading-relaxed">
                    กลุ่มลูกค้า High-Value มีอัตราการกลับมาซื้อซ้ำลดลง 5% ในสัปดาห์นี้ AI สร้างแคมเปญอีเมลกระตุ้นยอดขายให้แล้วในหน้า Marketing
                  </p>
                </div>
              </div>

              {/* Main Analysis Document */}
              <div className={`p-8 lg:p-10 rounded-3xl border shadow-2xl backdrop-blur-xl ${theme === 'dark' ? 'bg-[#091024]/90 border-white/10' : 'bg-white border-slate-200'}`}>
                <div className="flex items-center gap-4 mb-8 pb-6 border-b border-white/10">
                  <div className="w-4 h-8 bg-amber-400 rounded-full"></div>
                  <div>
                    <h3 className={`text-2xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>InsightFlow AI Executive Report</h3>
                    <p className="text-sm text-slate-400 mt-1">สรุปภาพรวมธุรกิจประจำสัปดาห์ (สร้างอัตโนมัติ)</p>
                  </div>
                </div>

                <div className="space-y-6 text-sm lg:text-base leading-loose text-slate-300">
                  <p>
                    <strong className="text-white text-lg">📌 1. สรุปสถานการณ์ยอดขาย (Revenue Pulse)</strong><br />
                    ในรอบสัปดาห์ที่ผ่านมา ระบบตรวจพบยอดขายรวมเพิ่มขึ้น <span className="text-emerald-400 font-bold">+12.4%</span> โดยได้รับปัจจัยหนุนหลักจากช่องทาง <span className="text-amber-400">TikTok Shop</span> ที่มีคอนเวอร์ชันเรต (Conversion Rate) สูงถึง 4.8% ซึ่งถือว่าสูงกว่าค่าเฉลี่ยของบริษัทในรอบ 6 เดือนที่ผ่านมา
                  </p>
                  
                  <p>
                    <strong className="text-white text-lg">⚠️ 2. จุดที่ต้องเฝ้าระวัง (Critical Anomalies)</strong><br />
                    มีสัญญาณความเสี่ยงด้านต้นทุน (COGS) ในหมวดหมู่ "สินค้าบรรจุภัณฑ์" ที่ขยับตัวสูงขึ้น 8% เมื่อวิเคราะห์ร่วมกับค่าขนส่งที่เพิ่มขึ้น ทำให้ Net Margin ของสินค้ารหัส <span className="font-mono text-amber-200">PKG-009</span> หดตัวลงต่ำกว่าเกณฑ์มาตรฐานที่ตั้งไว้ (Minimum Margin Threshold)
                  </p>

                  <div className="p-5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-200/90">
                    <strong className="text-amber-400 flex items-center gap-2 mb-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.9" viewBox="0 0 24 24"><path d="M12 2L14.8 8.5L21.5 11.2L14.8 14L12 20.5L9.2 14L2.5 11.2L9.2 8.5L12 2Z" fill="currentColor" fillOpacity="0.18"/><path d="M19 3v4M21 5h-4M5 17v3M6.5 18.5h-3"/></svg>
                      AI Recommendation (ข้อเสนอแนะเชิงกลยุทธ์)
                    </strong>
                    แนะนำให้โยกงบประมาณการตลาด (Marketing Budget) จากช่องทาง Facebook Ads ที่มีค่า CAC (Customer Acquisition Cost) สูงขึ้น ไปยัง TikTok Shop ชั่วคราว และเริ่มแคมเปญ Bundle ข้ามหมวดหมู่เพื่อระบายสินค้า PKG-009 คู่กับสินค้าขายดี 
                  </div>
                </div>
              </div>
            </div>
          )}'''

    # Pattern to match the whole insights block
    pattern = r"\{activeTab === 'insights' && \(\n\s*<div className=\"space-y-8 animate-in fade-in duration-300\">\n\s*<div className=\{`p-8 rounded-3xl border.*?(?=\{/\* TAB: SQLITE DATABASE \*/\})"
    
    match = re.search(pattern, content, re.DOTALL)
    if match:
        content = content[:match.start()] + new_insights_tab + "\n\n          " + content[match.end():]
        with open('src/App.jsx', 'w', encoding='utf-8') as f:
            f.write(content)
        print("Patched insights successfully")
    else:
        print("Could not find the insights block")

if __name__ == '__main__':
    patch_insights_tab()
