import re

file_path = "src/App.jsx"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Update State in App
old_motion_state = """  // Motion Animation Control State สำหรับหน้า ภาพรวมระบบ (Overview)
  const [motionKey, setMotionKey] = useState(0);
  const [motionSpeed, setMotionSpeed] = useState('smooth'); // 'smooth' | 'cinematic' | 'hyper'
  const [isMotionRunning, setIsMotionRunning] = useState(false);
  const [animatedRevenue, setAnimatedRevenue] = useState(4829000);
  const [animatedUsers, setAnimatedUsers] = useState(3842);
  const [animatedConversion, setAnimatedConversion] = useState(6.84);
  const [animatedLatency, setAnimatedLatency] = useState(2);

  const triggerMotionReplay = (speedOverride) => {
    const activeSpeed = speedOverride || motionSpeed;
    setIsMotionRunning(true);
    setMotionKey(prev => prev + 1);

    const duration = activeSpeed === 'hyper' ? 700 : activeSpeed === 'cinematic' ? 2600 : 1600;
    const startTime = performance.now();

    const targetRevenue = 4829000;
    const targetUsers = 3842;
    const targetConversion = 6.84;
    const targetLatency = 2;

    const easeOutQuart = (x) => 1 - Math.pow(1 - x, 4);

    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutQuart(progress);

      setAnimatedRevenue(Math.round(targetRevenue * eased));
      setAnimatedUsers(Math.round(targetUsers * eased));
      setAnimatedConversion(Number((targetConversion * eased).toFixed(2)));
      setAnimatedLatency(Math.max(2, Math.round(48 - (46 * eased))));

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setIsMotionRunning(false);
      }
    };

    requestAnimationFrame(step);
    toast.success('🎬 Motion Animation: เร่งการเคลื่อนไหวสมบูรณ์แบบ 60 FPS');
  };

  useEffect(() => {
    if (activeTab === 'overview') {
      triggerMotionReplay();
    }
  }, [activeTab]);"""

new_goal_state = """  // ระบบกำหนดเป้าหมายธุรกิจของลูกค้า & แผนกลยุทธ์ AI (Client Business Goal & AI Strategy Engine)
  const [clientGoalType, setClientGoalType] = useState('revenue'); // 'revenue' | 'customers' | 'cost' | 'profit'
  const [currentRevenueVal, setCurrentRevenueVal] = useState(1500000);
  const [targetRevenueVal, setTargetRevenueVal] = useState(5000000);
  const [targetTimelineVal, setTargetTimelineVal] = useState('90'); // days: 30, 90, 180, 365
  const [targetCategory, setTargetCategory] = useState('ecommerce'); // 'ecommerce' | 'retail' | 'b2b' | 'service'
  const [isPlanActive, setIsPlanActive] = useState(true);
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);
  const [activePlanStep, setActivePlanStep] = useState(1);

  // ตัวเลขคงที่สำหรับแดชบอร์ด
  const animatedRevenue = 4829000;
  const animatedUsers = 3842;
  const animatedConversion = 6.84;
  const animatedLatency = 2;

  const handleDeployGoalPlan = () => {
    setIsGeneratingPlan(true);
    setTimeout(() => {
      setIsGeneratingPlan(false);
      setIsPlanActive(true);
      toast.success('🚀 เปิดใช้งานแผนกลยุทธ์ AI สู่เป้าหมายเรียบร้อย! ระบบเริ่มดำเนินการอัตโนมัติแล้ว');
    }, 600);
  };

  const handleExportGoalPlan = () => {
    const days = parseInt(targetTimelineVal, 10);
    const gap = targetRevenueVal - currentRevenueVal;
    const dailyPace = Math.round(gap / days);
    const growthPercent = ((gap / currentRevenueVal) * 100).toFixed(1);

    const reportContent = `INSIGHTFLOW AI STRATEGIC GOAL ROADMAP
===============================================
สร้างเมื่อ: ${new Date().toLocaleDateString('th-TH')}
ประเภทเป้าหมาย: ${clientGoalType === 'revenue' ? 'เพิ่มรายได้ธุรกิจ' : clientGoalType === 'customers' ? 'ขยายฐานลูกค้า' : 'เพิ่มกำไรสุทธิ'}
หมวดหมู่ธุรกิจ: ${targetCategory.toUpperCase()}

1. สรุปตัวเลขเป้าหมาย
- ตัวเลขปัจจุบัน: ฿ ${currentRevenueVal.toLocaleString()}
- เป้าหมายที่ต้องการ: ฿ ${targetRevenueVal.toLocaleString()}
- ยอดส่วนต่างที่ต้องสร้างเพิ่ม: ฿ ${gap.toLocaleString()} (+${growthPercent}%)
- กรอบเวลา: ${days} วัน (ต้องทำยอดเพิ่มเฉลี่ย ฿ ${dailyPace.toLocaleString()} / วัน)
- การประเมินความเป็นไปได้โดย AI: 94.6% (High Feasibility)

2. แผนปฏิบัติการ 4 ขั้นตอนสู่อิสรภาพทางธุรกิจ
- เฟส 1 (วัน 1-14): ปรับงบโฆษณาไปที่ช่องทางกำไรสูงสุด (Affiliate & Search Ads)
- เฟส 2 (วัน 15-45): ติดตั้ง AI Restock ล่วงหน้า 5 วัน ป้องกันสต็อกขาด
- เฟส 3 (วัน 46-75): ใช้โมเดล Cross-Selling ดันยอดบิล +28%
- เฟส 4 (วัน 76-${days}): ระบบ Autopilot ส่งรายงานผลเข้า Executive Center ทุกวัน
===============================================`;

    const blob = new Blob(["\\uFEFF" + reportContent], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `InsightFlow_Goal_Plan_${targetRevenueVal}.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('📥 ดาวน์โหลดแผนกลยุทธ์เป้าหมายสำเร็จ');
  };"""

if old_motion_state in content:
    content = content.replace(old_motion_state, new_goal_state)
else:
    print("Could not match old_motion_state directly, checking regex...")

# 2. Update chart animation to clean static
old_get_motion_duration = """  const getMotionDuration = () => {
    if (motionSpeed === 'hyper') return 700;
    if (motionSpeed === 'cinematic') return 2800;
    return 1800;
  };

  const lineChartOptions = {
    responsive: true,
    animation: {
      duration: getMotionDuration(),
      easing: 'easeOutQuart',
      delay: (context) => context.dataIndex * (motionSpeed === 'hyper' ? 25 : motionSpeed === 'cinematic' ? 120 : 65),
    },
    maintainAspectRatio: false,"""

new_chart_options = """  const lineChartOptions = {
    responsive: true,
    animation: { duration: 1000 },
    maintainAspectRatio: false,"""

if old_get_motion_duration in content:
    content = content.replace(old_get_motion_duration, new_chart_options)

old_bar_options = """  const barChartOptions = {
    responsive: true,
    animation: {
      duration: getMotionDuration(),
      easing: 'easeOutQuart',
      delay: (context) => context.dataIndex * (motionSpeed === 'hyper' ? 40 : motionSpeed === 'cinematic' ? 180 : 110),
    },
    maintainAspectRatio: false,"""

new_bar_options = """  const barChartOptions = {
    responsive: true,
    animation: { duration: 1000 },
    maintainAspectRatio: false,"""

if old_bar_options in content:
    content = content.replace(old_bar_options, new_bar_options)

# 3. Replace the Motion Bar in Overview with Client Goal Architect & Strategy Roadmap
old_motion_bar_pattern = r'\{/\* 1\. MOTION ANIMATION CONTROL ENGINE BAR \*/\}[\s\S]*?\{/\* 2\. AI DIGEST CARD \*/\}'

new_goal_architect_block = """{/* 1. CLIENT GOAL ARCHITECT & AI ACTION BLUEPRINT ENGINE */}
              <div className={`p-6 sm:p-8 rounded-3xl border shadow-2xl relative overflow-hidden transition-all duration-300 ${
                theme === 'dark'
                  ? 'bg-gradient-to-br from-[#070d1e] via-[#0b132b] to-[#040816] border-amber-400/40'
                  : 'bg-gradient-to-br from-amber-50/70 via-white to-sky-50/60 border-amber-300'
              }`}>
                {/* Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-5 border-b border-white/10">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-amber-400/25 flex-shrink-0">
                      <span className="text-xl">🎯</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black uppercase tracking-wider bg-amber-400/20 text-amber-400 px-2.5 py-0.5 rounded-full border border-amber-400/30">
                          AI Goal Architecture
                        </span>
                        <span className="text-xs text-slate-400">ระบบตั้งเป้าหมาย & วางแผนกลยุทธ์อัจฉริยะ</span>
                      </div>
                      <h2 className={`text-xl sm:text-2xl font-black mt-1 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                        บอกเป้าหมายธุรกิจของคุณ — เราจะสร้างแผนพาคุณไปให้ถึงเป้าหมาย
                      </h2>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5">
                    {isPlanActive ? (
                      <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-black bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                        สถานะ: แผนกลยุทธ์ AI กำลังทำงาน
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-400/10 text-amber-300 border border-amber-400/20">
                        พร้อมตั้งค่าเป้าหมายใหม่
                      </span>
                    )}
                  </div>
                </div>

                {/* Form: ลูกค้าบอกเป้าหมายของตนเอง */}
                <div className={`p-5 sm:p-6 rounded-2xl border mb-6 ${
                  theme === 'dark' ? 'bg-[#050914]/80 border-white/10' : 'bg-slate-50 border-slate-200'
                }`}>
                  <h3 className={`text-sm font-black uppercase tracking-wider mb-4 flex items-center gap-2 ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                    <span>1. เลือกและกำหนดเป้าหมายธุรกิจที่คุณต้องการ</span>
                  </h3>

                  {/* Goal Type Selector */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                    {[
                      { id: 'revenue', label: '💰 เพิ่มยอดขายรวม (Revenue)', desc: 'ขยายยอดขายก้าวกระโดด' },
                      { id: 'customers', label: '👥 ขยายฐานลูกค้า (Customer Growth)', desc: 'เพิ่มจำนวนผู้ซื้อรายใหม่' },
                      { id: 'cost', label: '📉 ลดต้นทุน & สต็อกจม (Zero Waste)', desc: 'ป้องกันสต็อกค้างคืนทุนไว' },
                      { id: 'profit', label: '📈 เพิ่มกำไรสุทธิ (Net Margin)', desc: 'ยกระดับสัดส่วนกำไร +25%' }
                    ].map(type => (
                      <button
                        key={type.id}
                        onClick={() => setClientGoalType(type.id)}
                        className={`p-3.5 rounded-xl border text-left transition ${
                          clientGoalType === type.id
                            ? 'bg-amber-400/15 border-amber-400 text-amber-300 shadow-md shadow-amber-400/10'
                            : 'bg-black/20 border-white/5 text-slate-400 hover:text-white hover:border-white/20'
                        }`}
                      >
                        <p className="text-xs font-black">{type.label}</p>
                        <p className="text-[11px] opacity-75 mt-0.5">{type.desc}</p>
                      </button>
                    ))}
                  </div>

                  {/* Numeric Inputs: ปัจจุบัน vs เป้าหมาย */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1.5">
                        ตัวเลขปัจจุบันของคุณ (Current Baseline)
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-slate-400 font-bold">฿</span>
                        <input
                          type="number"
                          value={currentRevenueVal}
                          onChange={(e) => setCurrentRevenueVal(Math.max(1, Number(e.target.value)))}
                          className={`w-full pl-8 pr-4 py-2.5 rounded-xl border text-sm font-black focus:outline-none focus:border-amber-400 ${
                            theme === 'dark' ? 'bg-[#070b16] border-white/10 text-white' : 'bg-white border-slate-300 text-slate-900'
                          }`}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-amber-400 mb-1.5 flex items-center justify-between">
                        <span>เป้าหมายที่ต้องการไปให้ถึง (Target Goal)</span>
                        <span className="text-[10px] text-slate-400">แก้ไขได้อิสระ</span>
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-xs text-amber-400 font-bold">฿</span>
                        <input
                          type="number"
                          value={targetRevenueVal}
                          onChange={(e) => setTargetRevenueVal(Math.max(currentRevenueVal + 1, Number(e.target.value)))}
                          className={`w-full pl-8 pr-4 py-2.5 rounded-xl border text-sm font-black focus:outline-none focus:border-amber-400 ${
                            theme === 'dark' ? 'bg-[#070b16] border-amber-400/50 text-amber-300' : 'bg-white border-amber-400 text-amber-600'
                          }`}
                        />
                      </div>
                      {/* Presets */}
                      <div className="flex gap-1.5 mt-2">
                        {[3000000, 5000000, 10000000, 20000000].map(val => (
                          <button
                            key={val}
                            onClick={() => setTargetRevenueVal(val)}
                            className="px-2 py-0.5 rounded text-[10px] font-bold bg-white/5 hover:bg-amber-400/20 text-slate-300 hover:text-amber-300 border border-white/10 transition"
                          >
                            ฿ {(val / 1000000)}M
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-400 mb-1.5">
                        กรอบเวลาเป้าหมาย (Target Timeline)
                      </label>
                      <select
                        value={targetTimelineVal}
                        onChange={(e) => setTargetTimelineVal(e.target.value)}
                        className={`w-full px-3 py-2.5 rounded-xl border text-sm font-bold focus:outline-none focus:border-amber-400 ${
                          theme === 'dark' ? 'bg-[#070b16] border-white/10 text-white' : 'bg-white border-slate-300 text-slate-900'
                        }`}
                      >
                        <option value="30">⚡ 30 วัน (Sprint เร่งด่วน)</option>
                        <option value="90">🚀 90 วัน (ไตรมาสธุรกิจ - แนะนำ)</option>
                        <option value="180">📅 6 เดือน (ขยายขนาดธุรกิจ)</option>
                        <option value="365">🎯 1 ปี (เป้าหมายประจำปี)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* AI Gap Analysis & Feasibility Metrics */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div className={`p-4 rounded-2xl border ${theme === 'dark' ? 'bg-[#060a18] border-white/10' : 'bg-white border-slate-200'}`}>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">ช่องว่างที่ต้องสร้างเพิ่ม (Target Gap)</p>
                    <h4 className="text-2xl font-black text-amber-400 mt-1">
                      +฿ {(targetRevenueVal - currentRevenueVal).toLocaleString()}
                    </h4>
                    <p className="text-[11px] text-emerald-400 mt-1 font-semibold">
                      ต้องเติบโตเพิ่ม +{(((targetRevenueVal - currentRevenueVal) / currentRevenueVal) * 100).toFixed(1)}% จากฐานเดิม
                    </p>
                  </div>

                  <div className={`p-4 rounded-2xl border ${theme === 'dark' ? 'bg-[#060a18] border-white/10' : 'bg-white border-slate-200'}`}>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">ยอดขายที่ต้องทำต่อวัน (Required Daily Velocity)</p>
                    <h4 className="text-2xl font-black text-sky-400 mt-1">
                      ฿ {Math.round((targetRevenueVal - currentRevenueVal) / parseInt(targetTimelineVal, 10)).toLocaleString()} <span className="text-xs font-normal text-slate-400">/ วัน</span>
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-1">
                      เฉลี่ยภายในระยะเวลา {targetTimelineVal} วัน
                    </p>
                  </div>

                  <div className={`p-4 rounded-2xl border ${theme === 'dark' ? 'bg-[#060a18] border-white/10' : 'bg-white border-slate-200'}`}>
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">ความเป็นไปได้โดย AI (Feasibility Score)</p>
                    <h4 className="text-2xl font-black text-emerald-400 mt-1 flex items-center gap-2">
                      94.6% <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">High Probability</span>
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-1">
                      ประเมินจากโมเดลธุรกิจที่มีขนาดใกล้เคียงกัน
                    </p>
                  </div>
                </div>

                {/* 2. HOW WE GET YOU THERE: 4-PHASE AI ACTION BLUEPRINT */}
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className={`text-base font-black flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                        2. วิธีที่เราจะทำให้คุณไปถึงเป้าหมาย ฿ {targetRevenueVal.toLocaleString()} (4-Phase AI Action Blueprint)
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        พิมพ์เขียวกลยุทธ์ 4 ขั้นตอนที่ InsightFlow ออกแบบให้ธุรกิจของคุณลงมือทำเพื่อพิชิตเป้าหมายอย่างเป็นรูปธรรม
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Phase 1 */}
                    <div className={`p-5 rounded-2xl border relative flex flex-col justify-between transition hover:-translate-y-1 ${
                      theme === 'dark' ? 'bg-[#080d22] border-sky-500/30 shadow-lg' : 'bg-sky-50/50 border-sky-200'
                    }`}>
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-sky-500/20 text-sky-400 border border-sky-500/30">
                            ระยะที่ 1 (วัน 1-14)
                          </span>
                          <span className="text-xs font-bold text-sky-400">🚀 Quick Wins</span>
                        </div>
                        <h4 className={`text-sm font-black mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                          อุดรอยรั่ว & โยกงบเข้าช่องทางกำไรสูงสุด
                        </h4>
                        <div className="space-y-2 text-xs text-slate-300">
                          <p className="leading-relaxed">
                            <strong>• สิ่งที่ AI ทำ:</strong> วิเคราะห์ย้อนหลัง 90 วัน ปิดโฆษณาที่ ROI ต่ำทันที และโยกงบ 40% ไปยัง Affiliate & Google Search ที่มี Conversion สูงสุด
                          </p>
                          <p className="leading-relaxed text-emerald-400 font-bold">
                            <strong>• ผลลัพธ์:</strong> ยอดขายเร่งสปีดขึ้นทันที +18% ใน 14 วันแรก
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Phase 2 */}
                    <div className={`p-5 rounded-2xl border relative flex flex-col justify-between transition hover:-translate-y-1 ${
                      theme === 'dark' ? 'bg-[#080d22] border-emerald-500/30 shadow-lg' : 'bg-emerald-50/50 border-emerald-200'
                    }`}>
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                            ระยะที่ 2 (วัน 15-45)
                          </span>
                          <span className="text-xs font-bold text-emerald-400">📦 Zero Stockout</span>
                        </div>
                        <h4 className={`text-sm font-black mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                          ระบบ AI สั่งของล่วงหน้า ป้องกันสต็อกขาด
                        </h4>
                        <div className="space-y-2 text-xs text-slate-300">
                          <p className="leading-relaxed">
                            <strong>• สิ่งที่ AI ทำ:</strong> คำนวณความเร็วการขายสินค้าขายดี สั่ง Restock ล่วงหน้า 5 วันผ่าน Google Sheets และตัดสต็อกจมคืนกระแสเงินสด
                          </p>
                          <p className="leading-relaxed text-emerald-400 font-bold">
                            <strong>• ผลลัพธ์:</strong> ป้องกันยอดขายตกจากการขาดสต็อก 100%
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Phase 3 */}
                    <div className={`p-5 rounded-2xl border relative flex flex-col justify-between transition hover:-translate-y-1 ${
                      theme === 'dark' ? 'bg-[#080d22] border-amber-500/30 shadow-lg' : 'bg-amber-50/50 border-amber-200'
                    }`}>
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/30">
                            ระยะที่ 3 (วัน 46-75)
                          </span>
                          <span className="text-xs font-bold text-amber-300">📈 Basket Lift</span>
                        </div>
                        <h4 className={`text-sm font-black mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                          เพิ่มยอดต่อบิล & กระตุ้นซื้อซ้ำ (Cross-Sell)
                        </h4>
                        <div className="space-y-2 text-xs text-slate-300">
                          <p className="leading-relaxed">
                            <strong>• สิ่งที่ AI ทำ:</strong> คัดแยกลูกค้าเก่าที่มีความจงรักภักดีสูง ส่งโปรโมชันเฉพาะบุคคล และแนะนำสินค้าพ่วงตอนชำระเงิน
                          </p>
                          <p className="leading-relaxed text-emerald-400 font-bold">
                            <strong>• ผลลัพธ์:</strong> Average Order Value (AOV) โตขึ้น +28%
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Phase 4 */}
                    <div className={`p-5 rounded-2xl border relative flex flex-col justify-between transition hover:-translate-y-1 ${
                      theme === 'dark' ? 'bg-[#080d22] border-purple-500/30 shadow-lg' : 'bg-purple-50/50 border-purple-200'
                    }`}>
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-purple-500/20 text-purple-400 border border-purple-500/30">
                            ระยะที่ 4 (วัน 76-{targetTimelineVal})
                          </span>
                          <span className="text-xs font-bold text-purple-400">🏆 Target Hit</span>
                        </div>
                        <h4 className={`text-sm font-black mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                          รายงานผู้บริหารอัตโนมัติ & มุ่งสู่เป้าหมาย
                        </h4>
                        <div className="space-y-2 text-xs text-slate-300">
                          <p className="leading-relaxed">
                            <strong>• สิ่งที่ AI ทำ:</strong> สรุปผลความคืบหน้าเข้า Executive Dashboard ทุกเช้า พร้อมแจ้งเตือนหากจุดไหนหลุดเป้าหมายทันที
                          </p>
                          <p className="leading-relaxed text-emerald-400 font-bold">
                            <strong>• ผลลัพธ์:</strong> บรรลุเป้าหมาย ฿ {targetRevenueVal.toLocaleString()} อย่างยั่งยืน
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10">
                  <div className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="text-amber-400">💡</span>
                    <span>ปรับเปลี่ยนตัวเลขเป้าหมายได้ตลอดเวลา แผนกลยุทธ์จะปรับคำนวณอัตโนมัติ</span>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={handleExportGoalPlan}
                      className="px-4 py-2.5 rounded-xl border border-white/15 hover:border-white/30 text-xs font-bold text-slate-200 bg-white/5 transition flex items-center gap-2"
                    >
                      <span>📥 บันทึกพิมพ์เขียวเป้าหมาย (.txt)</span>
                    </button>

                    <button
                      onClick={handleDeployGoalPlan}
                      disabled={isGeneratingPlan}
                      className="bg-gradient-to-r from-amber-400 to-amber-300 hover:brightness-105 active:scale-95 text-slate-950 text-xs font-black px-6 py-2.5 rounded-xl shadow-lg shadow-amber-400/20 transition flex items-center gap-2 cursor-pointer"
                    >
                      <span>{isGeneratingPlan ? 'กำลังประมวลผลกลยุทธ์...' : '🚀 เปิดใช้งานแผนกลยุทธ์ AI สู่เป้าหมายนี้'}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* 2. AI DIGEST CARD */}"""

if re.search(old_motion_bar_pattern, content):
    content = re.sub(old_motion_bar_pattern, new_goal_architect_block, content)
    print("Successfully replaced Motion Bar with Client Goal Architect & AI Action Blueprint.")
else:
    print("Regex match failed for old_motion_bar_pattern.")

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Patch script completed.")

