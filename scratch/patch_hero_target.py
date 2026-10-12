import re

file_path = "src/App.jsx"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Add heroGoalChartData if not present
chart_def_target = "  const lineChartData = {"
hero_goal_data = """  const heroGoalChartData = {
    labels: ['Q1 เริ่มต้น', 'Q2 เร่งสปีด', 'Q3 ปัจจุบัน', 'Q4 เป้าหมายสิ้นปี'],
    datasets: [
      {
        label: 'เป้าหมายกลยุทธ์ AI (Strategic Target)',
        data: [2500000, 5000000, 7500000, 10000000],
        borderColor: '#fbbf24',
        borderDash: [6, 6],
        borderWidth: 2,
        pointBackgroundColor: '#fbbf24',
        pointRadius: 4,
        tension: 0.35
      },
      {
        label: 'ผลงานจริงพุ่งสู่เป้าหมาย (Actual Pace)',
        data: [2850000, 5620000, 8920000, null],
        borderColor: '#38bdf8',
        backgroundColor: 'rgba(56, 189, 248, 0.16)',
        borderWidth: 3,
        pointBackgroundColor: '#070b16',
        pointBorderColor: '#38bdf8',
        pointBorderWidth: 2,
        pointRadius: 5,
        fill: true,
        tension: 0.38
      }
    ]
  };

  const lineChartData = {"""

if "const heroGoalChartData =" not in content:
    content = content.replace(chart_def_target, hero_goal_data)

# 2. Replace the Hero right-side column with modern Target Hub and Image
old_hero_right_pattern = r'<div className="lg:col-span-6 relative">\s*<div className="absolute -inset-1\.5 bg-gradient-to-r from-amber-500/20 via-sky-500/20 to-emerald-500/20 rounded-3xl blur-2xl opacity-50"></div>\s*<div className="bg-\[#0b1120\]/90[\s\S]*?</div>\s*</div>\s*</div>\s*</div>\s*\{/\* ==================== 1\. SOLUTIONS SECTION'

new_hero_right = """<div className="lg:col-span-6 relative">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-amber-500/25 via-sky-500/25 to-emerald-500/20 rounded-3xl blur-2xl opacity-60"></div>
              
              {/* Modern Executive Target Hub & Goal Visual */}
              <div className="bg-[#0b1120]/95 border border-amber-400/30 rounded-3xl p-6 sm:p-7 shadow-2xl relative backdrop-blur-2xl overflow-hidden group">
                
                {/* 1. Header: Goal Cluster & Status */}
                <div className="flex items-center justify-between mb-5 pb-4 border-b border-white/10 text-xs text-slate-400 relative z-10">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block shadow-sm"></span>
                    <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block shadow-sm"></span>
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block shadow-sm"></span>
                    <span className="ml-2 font-black text-white text-[13px] tracking-tight flex items-center gap-1.5">
                      <span className="text-amber-400">🎯</span> ศูนย์ติดตามเป้าหมายเชิงกลยุทธ์ (AI Target Hub)
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 text-[11px]">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                    สถานะ: บรรลุเป้าหมาย 89.2%
                  </div>
                </div>

                {/* 2. Visual Modern 3D Target Image Banner */}
                <div className="relative rounded-2xl overflow-hidden border border-amber-400/25 mb-6 group/img shadow-xl h-48 sm:h-52">
                  <img
                    src="/hero-goals-target.jpg"
                    alt="AI Strategic Goal & Target Intelligence"
                    className="w-full h-full object-cover object-center group-hover/img:scale-105 transition-transform duration-700"
                  />
                  {/* Subtle Gradient Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#070b16] via-[#070b16]/60 to-transparent"></div>
                  
                  {/* Floating Target Overlay Badges */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between gap-2">
                    <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 flex items-center gap-2">
                      <span className="text-amber-400 text-xs">🏆</span>
                      <span className="text-[11px] font-bold text-slate-200">เป้าหมาย Q3 สำเร็จเกินเป้า (+14%)</span>
                    </div>
                    <div className="bg-amber-400/20 backdrop-blur-md px-3 py-1.5 rounded-xl border border-amber-400/40 text-amber-300 text-[11px] font-black">
                      AI Target Accuracy: 99.4%
                    </div>
                  </div>
                </div>

                {/* 3. Target Metrics Grid (ข้อมูลมาเป็นเป้าหมาย) */}
                <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-[#070b16]/90 p-5 sm:p-6 mb-5 relative z-10">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <p className="text-[11px] text-slate-400 uppercase tracking-widest font-bold flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-400"></span> เป้าหมายรายได้สิ้นปี (Revenue Target)
                      </p>
                      <h4 className="text-2xl sm:text-3xl font-black text-white mt-1">
                        ฿ 10,000,000
                      </h4>
                      <div className="flex items-center gap-1.5 mt-1 text-xs">
                        <span className="text-emerald-400 font-black">฿ 8,920,000</span>
                        <span className="text-slate-400 text-[11px]">(ทำได้จริงแล้ว 89.2%)</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[11px] text-slate-400 uppercase tracking-widest font-bold flex items-center justify-end gap-1">
                        เป้าหมายความแม่นยำ AI <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
                      </p>
                      <h4 className="text-2xl sm:text-3xl font-black text-amber-400 mt-1">
                        99.4%
                      </h4>
                      <div className="flex items-center justify-end gap-1.5 mt-1 text-xs">
                        <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                          เหนือกว่าเป้าหมาย +1.4%
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Goal Progress Bar */}
                  <div className="mt-4 pt-3 border-t border-white/5">
                    <div className="flex justify-between items-center text-xs font-bold mb-1.5">
                      <span className="text-slate-300">ความคืบหน้าสู่เป้าหมายปี 2026 (Annual Target Progress)</span>
                      <span className="text-amber-400 font-black">89.2%</span>
                    </div>
                    <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden p-[1px] border border-white/10">
                      <div className="h-full bg-gradient-to-r from-amber-400 via-sky-400 to-emerald-400 rounded-full transition-all duration-1000 w-[89.2%] animate-pulse"></div>
                    </div>
                    <div className="flex justify-between items-center text-[10px] text-slate-500 mt-1.5 font-medium">
                      <span>Q1 (สำเร็จ 100%)</span>
                      <span>Q2 (สำเร็จ 100%)</span>
                      <span>Q3 (สำเร็จ 100%)</span>
                      <span className="text-amber-400 font-bold">Q4 (มุ่งสู่ 10,000,000)</span>
                    </div>
                  </div>
                </div>

                {/* 4. Trajectory Chart towards Target */}
                <div className="relative rounded-2xl overflow-hidden border border-white/5 bg-[#070b16] p-4 relative z-10">
                  <div className="flex items-center justify-between mb-2 px-1">
                    <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-sky-400"></span> เส้นทางจริงเทียบเป้าหมาย (Actual Pace vs AI Target)
                    </span>
                    <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 px-2 py-0.5 rounded-md">
                      On-Track to Beat Target
                    </span>
                  </div>
                  <div className="h-36 w-full relative">
                    <Line data={heroGoalChartData} options={lineChartOptions} />
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* ==================== 1. SOLUTIONS SECTION"""

if re.search(old_hero_right_pattern, content):
    content = re.sub(old_hero_right_pattern, new_hero_right, content)
    with open(file_path, "w", encoding="utf-8") as f:
        f.write(content)
    print("Successfully patched Hero target hub and modern image.")
else:
    print("Regex match failed for old_hero_right_pattern.")

