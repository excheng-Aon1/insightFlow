import re

file_path = "src/App.jsx"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# We replace the entire activeTab === 'overview' block
old_overview_pattern = r"\{/\* TAB: ภาพรวมระบบ \(OVERVIEW\) \*/\}\s*\{activeTab === 'overview' && \(\s*<div className=\"space-y-8 animate-in fade-in duration-300\">[\s\S]*?\{/\* TAB: ทราฟฟิกสด \(LIVE PULSE\) \*/\}"

new_overview_block = """{/* TAB: ภาพรวมระบบ (OVERVIEW) */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              
              {/* 1. MOTION ANIMATION CONTROL ENGINE BAR */}
              <div className={`p-4 sm:p-5 rounded-3xl border shadow-2xl relative overflow-hidden transition-all duration-300 ${
                theme === 'dark'
                  ? 'bg-gradient-to-r from-[#070d1e] via-[#0b132b] to-[#050914] border-amber-400/40'
                  : 'bg-gradient-to-r from-amber-50 via-white to-sky-50 border-amber-200'
              }`}>
                <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-400/25 flex-shrink-0 animate-motion-float">
                      <svg className={`w-5 h-5 transition-transform duration-700 ${isMotionRunning ? 'rotate-180 scale-110' : ''}`} fill="none" stroke="currentColor" strokeWidth="2.4" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-wider bg-amber-400/20 text-amber-400 px-2.5 py-0.5 rounded-full border border-amber-400/30">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping"></span>
                          Motion Engine Active
                        </span>
                        <span className="text-[11px] text-slate-400 hidden sm:inline">• 60 FPS Fluid Transitions</span>
                      </div>
                      <h3 className={`text-base font-black mt-0.5 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                        ระบบควบคุม Motion Animation แบบ Real-Time
                      </h3>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2.5 w-full md:w-auto">
                    {/* Speed Selector Buttons */}
                    <div className={`p-1 rounded-2xl border flex items-center gap-1 text-xs font-bold ${
                      theme === 'dark' ? 'bg-black/40 border-white/10' : 'bg-slate-100 border-slate-200'
                    }`}>
                      <button
                        onClick={() => { setMotionSpeed('hyper'); triggerMotionReplay('hyper'); }}
                        className={`px-3 py-1.5 rounded-xl transition ${
                          motionSpeed === 'hyper'
                            ? 'bg-amber-400 text-slate-950 font-black shadow-md'
                            : 'text-slate-400 hover:text-white'
                        }`}
                        title="ความเร็วระดับด่วนพิเศษ 0.7s"
                      >
                        ⚡ Hyper
                      </button>
                      <button
                        onClick={() => { setMotionSpeed('smooth'); triggerMotionReplay('smooth'); }}
                        className={`px-3 py-1.5 rounded-xl transition ${
                          motionSpeed === 'smooth'
                            ? 'bg-amber-400 text-slate-950 font-black shadow-md'
                            : 'text-slate-400 hover:text-white'
                        }`}
                        title="ความเร็วมาตรฐานลื่นไหล 1.8s"
                      >
                        🌊 Smooth
                      </button>
                      <button
                        onClick={() => { setMotionSpeed('cinematic'); triggerMotionReplay('cinematic'); }}
                        className={`px-3 py-1.5 rounded-xl transition ${
                          motionSpeed === 'cinematic'
                            ? 'bg-amber-400 text-slate-950 font-black shadow-md'
                            : 'text-slate-400 hover:text-white'
                        }`}
                        title="ความเร็วแบบภาพยนตร์นุ่มนวล 2.8s"
                      >
                        🎬 Cinematic
                      </button>
                    </div>

                    {/* Replay Motion Button */}
                    <button
                      onClick={() => triggerMotionReplay()}
                      disabled={isMotionRunning}
                      className="bg-gradient-to-r from-amber-400 to-amber-300 hover:brightness-110 active:scale-95 text-slate-950 text-xs font-black px-4 py-2.5 rounded-2xl shadow-lg shadow-amber-400/20 transition flex items-center gap-2 disabled:opacity-60 whitespace-nowrap cursor-pointer"
                    >
                      <svg className={`w-4 h-4 ${isMotionRunning ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                      <span>{isMotionRunning ? 'กำลังแสดงผล Motion...' : '▶ เล่น Motion ซ้ำ'}</span>
                    </button>
                  </div>
                </div>

                {/* Shimmer Ambient Light Bar */}
                <div className="absolute top-0 left-0 right-0 h-[2px] animate-motion-shimmer pointer-events-none"></div>
              </div>

              {/* 2. AI DIGEST CARD */}
              <div className={`p-6 rounded-3xl border shadow-2xl relative overflow-hidden animate-motion-glow ${
                theme === 'dark' 
                  ? 'bg-gradient-to-r from-amber-400/15 via-[#0b1120] to-[#070c1a] border-amber-400/30' 
                  : 'bg-gradient-to-r from-amber-100/60 via-white to-amber-50 border-amber-300'
              }`}>
                <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-400 shadow-inner flex-shrink-0 animate-motion-float">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black tracking-widest uppercase bg-amber-400/20 text-amber-400 px-2.5 py-0.5 rounded-md border border-amber-400/30">InsightFlow AI Digest</span>
                        <span className="text-xs text-slate-400">อัปเดตเมื่อ 2 นาทีที่แล้ว</span>
                      </div>
                      <h3 className={`text-lg font-black mt-1 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>ยอด Conversion จากแคมเปญ Affiliate มีอัตราเร่งสูงสุด (+18.4%)</h3>
                      <p className="text-sm text-slate-400 mt-1 max-w-4xl leading-relaxed">
                        AI ตรวจพบพฤติกรรมการซื้อที่เพิ่มขึ้นอย่างมีนัยสำคัญจากช่องทาง Referral แนะนำให้ปรับงบประมาณโฆษณาเพื่อเพิ่มกำไรสุทธิ 15% ใน 7 วันข้างหน้า
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2.5 self-start lg:self-center">
                    <button 
                      onClick={() => setIsCheckoutOpen(true)}
                      className="bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black px-4 py-2.5 rounded-2xl shadow-lg shadow-amber-400/20 transition flex items-center gap-2 whitespace-nowrap active:scale-95"
                    >
                      💳 จัดการการผูกบัตร & Billing
                    </button>
                    <button 
                      onClick={exportPresentationDataset} 
                      className="bg-white/10 hover:bg-white/15 text-slate-200 text-xs font-bold px-4 py-2.5 rounded-2xl border border-white/10 transition flex items-center gap-2 whitespace-nowrap"
                    >
                      <span>📥 โหลดชุดข้อมูลสไลด์ (.csv)</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* 3. 4 กล่อง KPI พร้อม MOTION COUNT-UP & SHIMMER */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { title: 'รายได้รวม (Total Revenue)', value: `฿ ${animatedRevenue.toLocaleString()}`, change: '+16.8%', isUp: true, subtitle: 'เทียบกับเดือนที่ผ่านมา', icon: <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>, delay: '100ms' },
                  { title: 'ผู้ใช้งานสด (Live Users)', value: animatedUsers.toLocaleString(), change: '+24.1%', isUp: true, subtitle: 'กำลังใช้งานในระบบขณะนี้', icon: <svg className="w-5 h-5 text-sky-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>, delay: '200ms' },
                  { title: 'อัตราปิดการขาย (Conversion)', value: `${animatedConversion.toFixed(2)}%`, change: '+1.2%', isUp: true, subtitle: 'ค่าเฉลี่ยทุกช่องทางขาย', icon: <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>, delay: '300ms' },
                  { title: 'ความเร็วตอบสนอง (Latency)', value: `${animatedLatency} ms`, change: '-26 ms', isUp: true, subtitle: 'SQLite High-Speed Engine', icon: <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>, delay: '400ms' },
                ].map((kpi, idx) => (
                  <div
                    key={idx}
                    style={{ animationDelay: kpi.delay }}
                    className={`p-6 rounded-3xl border shadow-xl backdrop-blur-xl relative overflow-hidden transition-all duration-300 group hover:-translate-y-1.5 animate-motion-enter ${
                      theme === 'dark' ? 'bg-[#0b1020]/80 border-white/10 hover:border-amber-400/40' : 'bg-white border-slate-200 hover:border-amber-400'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{kpi.title}</span>
                      <div className={`w-10 h-10 rounded-2xl border flex items-center justify-center shadow-inner transition-transform group-hover:scale-110 ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-slate-100 border-slate-200'}`}>
                        {kpi.icon}
                      </div>
                    </div>
                    <div className="flex items-baseline gap-3 mb-2">
                      <h4 className={`text-3xl font-black tracking-tight transition-colors ${theme === 'dark' ? 'text-white' : 'text-slate-900'} ${isMotionRunning ? 'text-amber-400' : ''}`}>
                        {kpi.value}
                      </h4>
                      <span className={`text-xs font-black px-2 py-0.5 rounded-lg ${kpi.isUp ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                        {kpi.change}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium">{kpi.subtitle}</p>

                    {/* Subtle Motion Shimmer Light */}
                    <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-motion-shimmer"></div>
                  </div>
                ))}
              </div>

              {/* 4. กราฟหลัก 3 มิติ (MOTION CHART ENGINE) */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* 4.1 Line Chart: Traffic vs AI Target */}
                <div className={`lg:col-span-8 p-7 rounded-3xl border shadow-xl backdrop-blur-xl flex flex-col justify-between transition-all ${
                  theme === 'dark' ? 'bg-[#0b1020]/80 border-white/10' : 'bg-white border-slate-200'
                }`}>
                  <div className="flex flex-wrap justify-between items-center mb-6 gap-3">
                    <div>
                      <h3 className={`text-base font-black flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                        <span className="w-2.5 h-2.5 rounded-full bg-sky-400 animate-ping"></span>
                        วิเคราะห์แนวโน้มทราฟฟิกเทียบกับเป้าหมาย AI (Traffic vs AI Projection)
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">Motion Cascading Path • 60 FPS Progressive Waveform</p>
                    </div>
                    <div className={`flex items-center gap-2 text-xs px-3 py-1.5 rounded-xl border ${theme === 'dark' ? 'bg-black/30 border-white/5 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-600'}`}>
                      <span>ความแม่นยำโมเดล:</span>
                      <span className="text-amber-400 font-black">98.4%</span>
                    </div>
                  </div>
                  <div className="h-80 w-full relative">
                    <Line key={`line-chart-${motionKey}-${motionSpeed}`} data={lineChartData} options={lineChartOptions} />
                  </div>
                </div>

                {/* 4.2 Doughnut Chart: Platform Share */}
                <div className={`lg:col-span-4 p-7 rounded-3xl border shadow-xl backdrop-blur-xl flex flex-col justify-between transition-all ${
                  theme === 'dark' ? 'bg-[#0b1020]/80 border-white/10' : 'bg-white border-slate-200'
                }`}>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <h3 className={`text-base font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>สัดส่วนผู้ใช้งานแยกตามอุปกรณ์</h3>
                      <span className="text-[10px] font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">Rotate 360°</span>
                    </div>
                    <p className="text-xs text-slate-400 mb-6">Device & Client Platform Share</p>
                    <div className="h-56 w-full relative flex items-center justify-center">
                      <Doughnut
                        key={`doughnut-chart-${motionKey}-${motionSpeed}`}
                        data={doughnutData}
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          plugins: { legend: { display: false } },
                          animation: {
                            animateScale: true,
                            animateRotate: true,
                            duration: getMotionDuration() + 400,
                            easing: 'easeOutExpo'
                          }
                        }}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mt-6 pt-4 border-t border-white/10 text-xs">
                    <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-sky-400"></span> Desktop: <strong>48%</strong></div>
                    <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-amber-400"></span> Mobile: <strong>28%</strong></div>
                    <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-400"></span> iOS: <strong>14%</strong></div>
                    <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-purple-400"></span> Android: <strong>10%</strong></div>
                  </div>
                </div>

                {/* 4.3 Bar Chart: Conversion Rate by Channel with Motion Stagger */}
                <div className={`lg:col-span-12 p-7 rounded-3xl border shadow-xl backdrop-blur-xl flex flex-col justify-between transition-all ${
                  theme === 'dark' ? 'bg-[#0b1020]/80 border-white/10' : 'bg-white border-slate-200'
                }`}>
                  <div className="flex flex-wrap justify-between items-center mb-6 gap-3">
                    <div>
                      <h3 className={`text-base font-black flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse"></span>
                        อัตรา Conversion ตามช่องทางการตลาด (Staggered Rising Bars)
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">Motion Animation คอลัมน์แท่งกราฟดีดตัวขึ้นตามลำดับความสำคัญของแคมเปญ</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-xl border border-emerald-500/20 font-bold">
                        Top Performer: Affiliate (9.1%)
                      </span>
                    </div>
                  </div>
                  <div className="h-64 w-full relative">
                    <Bar key={`bar-chart-${motionKey}-${motionSpeed}`} data={barChartData} options={barChartOptions} />
                  </div>
                </div>
              </div>

              {/* 5. LIVE TELEMETRY MOTION EVENT STREAM */}
              <div className={`p-4 rounded-2xl border flex flex-wrap items-center justify-between gap-4 text-xs ${
                theme === 'dark' ? 'bg-[#040816]/70 border-white/10' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                  <span className="font-bold text-slate-300">Live Telemetry Motion Feed:</span>
                  <span className="text-slate-400">Node Sync • Latency: <strong>{animatedLatency}ms</strong></span>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-2.5 py-1 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20 font-mono text-[11px]">
                    ⚡ SQLite Query: 1.2ms
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono text-[11px]">
                    🔒 Redis OTP Cache: 100% Hit
                  </span>
                  <span className="px-2.5 py-1 rounded-lg bg-amber-500/10 text-amber-400 border border-amber-500/20 font-mono text-[11px]">
                    📊 Engine FPS: 60.0
                  </span>
                </div>
              </div>

            </div>
          )}

          {/* TAB: ทราฟฟิกสด (LIVE PULSE) */}"""

if re.search(old_overview_pattern, content):
    content = re.sub(old_overview_pattern, new_overview_block, content)
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)
    print("Part 2: Overview tab replaced with Motion features successfully.")
else:
    print("Could not match old_overview_pattern via regex.")

