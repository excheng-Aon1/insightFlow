import React, { useState } from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { toast } from 'react-hot-toast';
import { LuxuryIconBadge, LuxuryModuleIcon } from './LuxuryIcons';

export function OverviewTab({
  lang,
  theme,
  currentRevenueVal,
  setCurrentRevenueVal,
  targetRevenueVal,
  setTargetRevenueVal,
  targetTimelineVal,
  setTargetTimelineVal,
  clientGoalType,
  setClientGoalType,
  targetCategory,
  setTargetCategory,
  isPlanActive,
  isGeneratingPlan,
  handleDeployGoalPlan,
  handleExportGoalPlan,
  setActiveTab,
  lineChartOptions,
  barChartOptions
}) {
  const isEn = lang === 'en';
  const tx = (th, en) => (isEn ? en : th);

  const [newSaleAmount, setNewSaleAmount] = useState('');
  const [newSaleNote, setNewSaleNote] = useState('');
  const [recentRecordedSales, setRecentRecordedSales] = useState([
    {
      id: 'SL-101',
      time: tx('วันนี้ 15:30 น.', 'Today 15:30'),
      amount: 18500,
      note: tx('ชุดเซรั่มบำรุงผิว 10 กล่อง (หน้าร้านสยาม)', 'Luxury Serum Set x10 (Siam Branch)')
    },
    {
      id: 'SL-102',
      time: tx('วันนี้ 14:15 น.', 'Today 14:15'),
      amount: 32000,
      note: tx('คำสั่งซื้อเหมาชุดอุปกรณ์สำนักงาน (ช่องทางแชตร้าน)', 'Corporate Office Supply Bundle (Direct Chat)')
    }
  ]);

  const gap = Math.max(0, targetRevenueVal - currentRevenueVal);
  const days = Math.max(1, parseInt(targetTimelineVal, 10) || 90);
  const dailyRequired = Math.round(gap / days);
  const progressPct = Math.min(100, Math.round((currentRevenueVal / Math.max(1, targetRevenueVal)) * 100));

  const handleAddQuickSale = (amountVal, customLabel) => {
    const amt = Number(amountVal);
    if (!amt || amt <= 0) {
      toast.error(tx('กรุณาระบุจำนวนเงินยอดขายที่มากกว่า 0 บาท', 'Please enter a sale amount greater than 0'));
      return;
    }
    const updatedRev = currentRevenueVal + amt;
    setCurrentRevenueVal(updatedRev);
    const nowTime = new Date().toLocaleTimeString(isEn ? 'en-US' : 'th-TH', { hour: '2-digit', minute: '2-digit' });
    setRecentRecordedSales(prev => [
      {
        id: 'SL-' + Math.floor(100 + Math.random() * 900),
        time: `${tx('เมื่อสักครู่', 'Just now')} (${nowTime})`,
        amount: amt,
        note: customLabel || newSaleNote || tx('บันทึกยอดขายหน้าร้านและออนไลน์', 'Storefront & Online Sale Recorded')
      },
      ...prev.slice(0, 4)
    ]);
    setNewSaleAmount('');
    setNewSaleNote('');
    toast.success(
      tx(
        `💰 บันทึกยอดขายเพิ่ม +฿${amt.toLocaleString()} สำเร็จ! ยอดรวมปัจจุบันคือ ฿${updatedRev.toLocaleString()}`,
        `💰 Added +฿${amt.toLocaleString()} sale! Current total is now ฿${updatedRev.toLocaleString()}`
      )
    );
  };

  const overviewLineData = {
    labels: isEn
      ? ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00']
      : ['08:00 น.', '10:00 น.', '12:00 น.', '14:00 น.', '16:00 น.', '18:00 น.', '20:00 น.'],
    datasets: [
      {
        label: tx('ยอดขายจริงรายชั่วโมง (บาท)', 'Actual Hourly Sales (THB)'),
        data: [42000, 68000, 115000, 142000, 168000, 215000, Math.round(currentRevenueVal / 18)],
        borderColor: '#38bdf8',
        backgroundColor: theme === 'dark' ? 'rgba(56, 189, 248, 0.14)' : 'rgba(56, 189, 248, 0.2)',
        borderWidth: 3,
        fill: true,
        tension: 0.38
      },
      {
        label: tx('เป้าหมายยอดขายต่อช่วงเวลา (บาท)', 'Target Pace (THB)'),
        data: [40000, 65000, 100000, 130000, 155000, 190000, Math.round(targetRevenueVal / 22)],
        borderColor: '#fbbf24',
        borderDash: [6, 6],
        borderWidth: 2,
        fill: false,
        tension: 0.38
      }
    ]
  };

  const overviewDoughnutData = {
    labels: isEn
      ? ['Physical Branches', 'Short-Video & Live Store', 'Marketplace Mall', 'Direct Store Chat']
      : ['หน้าร้านจริงทั้ง 4 สาขา', 'ช่องทางวิดีโอสั้นและไลฟ์สด', 'ร้านค้าบนแอปช้อปปิ้ง', 'แชตร้านค้าโดยตรง'],
    datasets: [
      {
        data: [48, 24, 16, 12],
        backgroundColor: ['#fbbf24', '#38bdf8', '#34d399', '#a78bfa'],
        borderColor: theme === 'dark' ? '#0b1120' : '#ffffff',
        borderWidth: 3
      }
    ]
  };

  const overviewBarData = {
    labels: isEn
      ? ['Direct Store Chat', 'Physical Branches', 'Live Commerce', 'Search Ads', 'Marketplace Mall']
      : ['แชตร้านค้าโดยตรง', 'หน้าร้านจริง', 'ไลฟ์สดขายสินค้า', 'โฆษณาค้นหา', 'แอปช้อปปิ้งมอลล์'],
    datasets: [
      {
        label: tx('อัตราการซื้อสำเร็จ (%)', 'Conversion Rate (%)'),
        data: [11.4, 9.2, 7.8, 6.4, 4.9],
        backgroundColor: 'rgba(251, 191, 36, 0.85)',
        hoverBackgroundColor: '#f59e0b',
        borderRadius: 8
      }
    ]
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* 1. ระบบตั้งเป้าหมายและคำนวณแผนงานอัตโนมัติ */}
      <div className={`p-6 sm:p-8 rounded-3xl border shadow-2xl relative overflow-hidden transition-all duration-300 ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-[#070d1e] via-[#0b132b] to-[#040816] border-amber-400/40'
          : 'bg-gradient-to-br from-amber-50/70 via-white to-sky-50/60 border-amber-300'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-5 border-b border-white/10">
          <div className="flex items-start gap-4">
            <LuxuryIconBadge variant="gold" size="lg" active>
              <LuxuryModuleIcon type="target" size={28} />
            </LuxuryIconBadge>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider bg-amber-400/20 text-amber-400 px-3 py-0.5 rounded-full border border-amber-400/30">
                  {tx('ระบบวางแผนเป้าหมายร้านค้า', 'Business Goal Planner')}
                </span>
              </div>
              <h2 className={`text-xl sm:text-2xl font-black mt-1 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                {tx('กำหนดเป้าหมายยอดขายของร้าน — ระบบคำนวณยอดที่ต้องทำต่อวันให้ทันที', 'Set Your Store Revenue Target — Instant Daily Pace Calculator')}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-black bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              {isPlanActive
                ? tx('สถานะ: แผนงานกำลังทำงานอัตโนมัติ', 'Status: Action Plan Active')
                : tx('พร้อมตั้งค่าเป้าหมายใหม่', 'Ready to Configure Goal')}
            </span>
          </div>
        </div>

        {/* ฟอร์มปรับตัวเลขเป้าหมาย (ทำงานจริงทุกช่อง) */}
        <div className={`p-5 sm:p-6 rounded-2xl border mb-6 ${
          theme === 'dark' ? 'bg-[#050914]/80 border-white/10' : 'bg-slate-50 border-slate-200'
        }`}>
          <h3 className={`text-sm font-black mb-4 flex items-center gap-2 ${theme === 'dark' ? 'text-amber-300' : 'text-slate-800'}`}>
            <span>⚙️ {tx('ปรับแต่งตัวเลขเป้าหมายของคุณด้านล่าง (ตัวเลขคำนวณสดทันที):', 'Customize Your Target Numbers Below (Calculates Live):')}</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                {tx('ประเภทเป้าหมายหลัก', 'Primary Goal Type')}
              </label>
              <select
                value={clientGoalType}
                onChange={(e) => setClientGoalType(e.target.value)}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-bold focus:outline-none focus:border-amber-400 ${
                  theme === 'dark' ? 'bg-[#0b132b] border-white/15 text-white' : 'bg-white border-slate-300 text-slate-900'
                }`}
              >
                <option value="revenue">{tx('💰 เพิ่มยอดขายรวมของร้าน', '💰 Grow Total Store Revenue')}</option>
                <option value="profit">{tx('💎 เพิ่มกำไรสุทธิเข้ากระเป๋า', '💎 Maximize Net Profit')}</option>
                <option value="customers">{tx('👥 เพิ่มจำนวนลูกค้าประจำซื้อซ้ำ', '👥 Increase Repeat Customers')}</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                {tx('ยอดขายที่มีอยู่ปัจจุบัน (บาท)', 'Current Revenue (THB)')}
              </label>
              <input
                type="number"
                step="50000"
                value={currentRevenueVal}
                onChange={(e) => setCurrentRevenueVal(Math.max(0, Number(e.target.value)))}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-black font-mono focus:outline-none focus:border-amber-400 ${
                  theme === 'dark' ? 'bg-[#0b132b] border-white/15 text-sky-400' : 'bg-white border-slate-300 text-slate-900'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                {tx('เป้าหมายยอดขายที่ต้องการ (บาท)', 'Target Revenue Goal (THB)')}
              </label>
              <input
                type="number"
                step="100000"
                value={targetRevenueVal}
                onChange={(e) => setTargetRevenueVal(Math.max(1000, Number(e.target.value)))}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-black font-mono focus:outline-none focus:border-amber-400 ${
                  theme === 'dark' ? 'bg-[#0b132b] border-amber-400/40 text-amber-400' : 'bg-white border-amber-400 text-amber-700'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                {tx('ระยะเวลาที่ต้องการไปให้ถึง', 'Target Timeframe')}
              </label>
              <select
                value={targetTimelineVal}
                onChange={(e) => setTargetTimelineVal(e.target.value)}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-bold focus:outline-none focus:border-amber-400 ${
                  theme === 'dark' ? 'bg-[#0b132b] border-white/15 text-white' : 'bg-white border-slate-300 text-slate-900'
                }`}
              >
                <option value="30">{tx('ภายใน 30 วัน (1 เดือน)', 'Within 30 Days (1 Month)')}</option>
                <option value="60">{tx('ภายใน 60 วัน (2 เดือน)', 'Within 60 Days (2 Months)')}</option>
                <option value="90">{tx('ภายใน 90 วัน (3 เดือน)', 'Within 90 Days (3 Months)')}</option>
                <option value="180">{tx('ภายใน 180 วัน (ครึ่งปี)', 'Within 180 Days (6 Months)')}</option>
                <option value="365">{tx('ภายใน 365 วัน (1 ปี)', 'Within 365 Days (1 Year)')}</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                {tx('ประเภทธุรกิจของคุณ', 'Business Category')}
              </label>
              <select
                value={targetCategory}
                onChange={(e) => setTargetCategory(e.target.value)}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-bold focus:outline-none focus:border-amber-400 ${
                  theme === 'dark' ? 'bg-[#0b132b] border-white/15 text-white' : 'bg-white border-slate-300 text-slate-900'
                }`}
              >
                <option value="ecommerce">{tx('ร้านค้าปลีกและออนไลน์', 'Retail & Online Store')}</option>
                <option value="retail">{tx('หน้าร้านหลายสาขา', 'Multi-Branch Physical Store')}</option>
                <option value="b2b">{tx('ค้าส่งและตัวแทนจำหน่าย', 'Wholesale & Distribution')}</option>
                <option value="service">{tx('ร้านอาหาร คาเฟ่ หรือบริการ', 'Restaurant, Cafe & Services')}</option>
              </select>
            </div>
          </div>

          {/* แถบสรุปผลคำนวณสด */}
          <div className="mt-5 p-4 rounded-2xl bg-amber-400/10 border border-amber-400/30 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <div>
              <span className="text-xs text-slate-300 block">{tx('ความคืบหน้าสู่เป้าหมายปัจจุบัน:', 'Current Goal Progress:')}</span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-2xl font-black text-amber-400">{progressPct}%</span>
                <span className="text-xs text-slate-300">
                  (฿{currentRevenueVal.toLocaleString()} / ฿{targetRevenueVal.toLocaleString()})
                </span>
              </div>
              <div className="w-full h-2.5 bg-black/40 rounded-full overflow-hidden mt-2">
                <div className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 rounded-full transition-all duration-500" style={{ width: `${progressPct}%` }}></div>
              </div>
            </div>

            <div>
              <span className="text-xs text-slate-300 block">{tx('ยอดขายส่วนต่างที่ต้องทำเพิ่ม:', 'Remaining Revenue Needed:')}</span>
              <span className="text-xl font-black text-white font-mono">฿ {gap.toLocaleString()}</span>
              <span className="text-xs text-emerald-300 block mt-0.5">
                {tx(`เฉลี่ยต้องทำเพิ่มวันละ ฿${dailyRequired.toLocaleString()} ใน ${days} วัน`, `Requires ฿${dailyRequired.toLocaleString()} per day over ${days} days`)}
              </span>
            </div>

            <div className="flex flex-wrap gap-2 justify-end">
              <button
                onClick={handleDeployGoalPlan}
                disabled={isGeneratingPlan}
                className="bg-gradient-to-r from-amber-400 to-orange-500 hover:brightness-105 text-slate-950 font-black px-5 py-2.5 rounded-xl text-xs shadow-lg transition cursor-pointer"
              >
                {isGeneratingPlan
                  ? tx('⏳ กำลังคำนวณแผน...', '⏳ Calculating Plan...')
                  : tx('🚀 เริ่มใช้แผนเป้าหมายนี้ทันที', '🚀 Activate This Goal Plan')}
              </button>
              <button
                onClick={handleExportGoalPlan}
                className="bg-white/10 hover:bg-white/20 text-white font-bold px-4 py-2.5 rounded-xl text-xs border border-white/15 transition cursor-pointer"
              >
                {tx('📥 ดาวน์โหลดแผนงาน (.txt)', '📥 Download Plan (.txt)')}
              </button>
            </div>
          </div>
        </div>

        {/* 2. กล่องบันทึกยอดขายใหม่ประจำวัน (ทำให้หน้าแรกทำงานได้จริง ทดสอบบวกยอดขายได้ทันที) */}
        <div className={`p-5 sm:p-6 rounded-2xl border ${
          theme === 'dark' ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-emerald-50 border-emerald-300'
        }`}>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-black uppercase px-2.5 py-0.5 rounded-full bg-emerald-400 text-slate-950">
                {tx('⚡ ฟังก์ชันทำงานจริง: บันทึกยอดขายเข้าสู่ระบบสด', '⚡ Live Action: Record New Store Sale')}
              </span>
              <h3 className={`text-base sm:text-lg font-black mt-1.5 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                {tx('เพิ่มยอดขายใหม่วันนี้ (กดปุ่มลัดหรือพิมพ์จำนวนเงินเพื่อดูความคืบหน้าเป้าหมายขยับขึ้นทันที)', 'Add Today’s New Sale (Click a quick button or enter an amount to update your goal live)')}
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {[5000, 10000, 50000].map((quickAmt) => (
                <button
                  key={quickAmt}
                  onClick={() => handleAddQuickSale(quickAmt, tx(`ยอดขายด่วนหน้าร้าน +฿${quickAmt.toLocaleString()}`, `Quick Storefront Sale +฿${quickAmt.toLocaleString()}`))}
                  className="px-3.5 py-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black text-xs shadow transition cursor-pointer"
                >
                  +฿{quickAmt.toLocaleString()}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 mt-4">
            <div className="sm:col-span-4">
              <input
                type="number"
                value={newSaleAmount}
                onChange={(e) => setNewSaleAmount(e.target.value)}
                placeholder={tx('ระบุจำนวนเงิน (เช่น 12500)', 'Enter amount (e.g. 12500)')}
                className={`w-full px-4 py-2.5 rounded-xl border text-sm font-bold focus:outline-none focus:border-emerald-400 ${
                  theme === 'dark' ? 'bg-[#050914] border-white/20 text-white' : 'bg-white border-slate-300 text-slate-900'
                }`}
              />
            </div>
            <div className="sm:col-span-5">
              <input
                type="text"
                value={newSaleNote}
                onChange={(e) => setNewSaleNote(e.target.value)}
                placeholder={tx('หมายเหตุรายการขาย (เช่น ลูกค้าเหมาเซรั่ม 5 เซ็ต)', 'Sale note (e.g. Customer bought 5 serum sets)')}
                className={`w-full px-4 py-2.5 rounded-xl border text-sm font-medium focus:outline-none focus:border-emerald-400 ${
                  theme === 'dark' ? 'bg-[#050914] border-white/20 text-white' : 'bg-white border-slate-300 text-slate-900'
                }`}
              />
            </div>
            <div className="sm:col-span-3">
              <button
                onClick={() => handleAddQuickSale(newSaleAmount, newSaleNote)}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 hover:brightness-105 text-slate-950 font-black text-xs shadow-lg transition cursor-pointer"
              >
                {tx('➕ บันทึกยอดขายทันที', '➕ Record Sale Now')}
              </button>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-white/10 flex flex-wrap gap-2 items-center text-xs text-slate-200">
            <span className="font-bold text-emerald-300">{tx('รายการที่เพิ่งบันทึกล่าสุด:', 'Recently Recorded Sales:')}</span>
            {recentRecordedSales.map((s) => (
              <span key={s.id} className="px-2.5 py-1 rounded-lg bg-black/30 border border-white/10">
                <strong>+฿{s.amount.toLocaleString()}</strong> • {s.note} <span className="text-slate-400">({s.time})</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 3. การ์ดสรุปตัวเลขสำคัญของร้าน 4 ช่อง */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className={`p-6 rounded-3xl border shadow-xl ${theme === 'dark' ? 'bg-[#0b1020]/85 border-white/10' : 'bg-white border-slate-200'}`}>
          <div className="flex justify-between items-start mb-3">
            <span className="text-xs font-bold text-slate-300">{tx('ยอดขายสะสมปัจจุบัน', 'Current Total Sales')}</span>
            <LuxuryIconBadge variant="gold" size="sm" active>
              <LuxuryModuleIcon type="wallet" size={20} />
            </LuxuryIconBadge>
          </div>
          <h3 className={`text-3xl font-black font-mono ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            ฿ {currentRevenueVal.toLocaleString()}
          </h3>
          <p className="text-xs text-emerald-400 mt-1 font-bold">
            {tx(`↗ คิดเป็น ${progressPct}% ของเป้าหมายที่ตั้งไว้`, `↗ ${progressPct}% of your target goal`)}
          </p>
        </div>

        <div
          onClick={() => setActiveTab('customers')}
          className={`p-6 rounded-3xl border shadow-xl cursor-pointer hover:border-amber-400 transition ${theme === 'dark' ? 'bg-[#0b1020]/85 border-white/10' : 'bg-white border-slate-200'}`}
        >
          <div className="flex justify-between items-start mb-3">
            <span className="text-xs font-bold text-slate-300">{tx('ลูกค้าทั้งหมดในระบบ', 'Total Active Customers')}</span>
            <LuxuryIconBadge variant="ruby" size="sm" active>
              <LuxuryModuleIcon type="customers" size={20} />
            </LuxuryIconBadge>
          </div>
          <h3 className={`text-3xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            1,435 <span className="text-sm font-normal text-slate-400">{tx('ราย', 'buyers')}</span>
          </h3>
          <p className="text-xs text-amber-300 mt-1 font-bold">
            {tx('👉 คลิกเพื่อดูรายชื่อลูกค้าประจำ & คนหาย', '👉 Click to view VIP & inactive customers')}
          </p>
        </div>

        <div
          onClick={() => setActiveTab('staff_pos')}
          className={`p-6 rounded-3xl border shadow-xl cursor-pointer hover:border-amber-400 transition ${theme === 'dark' ? 'bg-[#0b1020]/85 border-white/10' : 'bg-white border-slate-200'}`}
        >
          <div className="flex justify-between items-start mb-3">
            <span className="text-xs font-bold text-slate-300">{tx('ยอดซื้อเฉลี่ยต่อบิลหน้าร้าน', 'Average Basket Size')}</span>
            <LuxuryIconBadge variant="sapphire" size="sm" active>
              <LuxuryModuleIcon type="staff_pos" size={20} />
            </LuxuryIconBadge>
          </div>
          <h3 className="text-3xl font-black text-sky-400">
            ฿ 2,340
          </h3>
          <p className="text-xs text-rose-300 mt-1 font-bold">
            {tx('👉 คลิกเพื่อดูผลงานพนักงาน & บิลที่ถูกยกเลิก', '👉 Click to inspect staff & cancelled bills')}
          </p>
        </div>

        <div
          onClick={() => setActiveTab('multi_channel')}
          className={`p-6 rounded-3xl border shadow-xl cursor-pointer hover:border-amber-400 transition ${theme === 'dark' ? 'bg-[#0b1020]/85 border-white/10' : 'bg-white border-slate-200'}`}
        >
          <div className="flex justify-between items-start mb-3">
            <span className="text-xs font-bold text-slate-300">{tx('อัตรากำไรสุทธิเฉลี่ยทุกช่องทาง', 'Average Net Profit Margin')}</span>
            <LuxuryIconBadge variant="emerald" size="sm" active>
              <LuxuryModuleIcon type="multi_channel" size={20} />
            </LuxuryIconBadge>
          </div>
          <h3 className="text-3xl font-black text-emerald-400">
            42.3%
          </h3>
          <p className="text-xs text-emerald-300 mt-1 font-bold">
            {tx('👉 คลิกเพื่อเทียบกำไรหน้าร้านกับออนไลน์', '👉 Click to compare store vs. online margins')}
          </p>
        </div>
      </div>

      {/* 4. กราฟวิเคราะห์ยอดขายและสัดส่วนช่องทาง (ภาษาไทยล้วน หรือ ภาษาอังกฤษล้วน) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className={`lg:col-span-8 p-7 rounded-3xl border shadow-xl ${
          theme === 'dark' ? 'bg-[#0b1020]/85 border-white/10' : 'bg-white border-slate-200'
        }`}>
          <div className="flex flex-wrap justify-between items-center mb-5 gap-2">
            <div>
              <h3 className={`text-lg font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                📈 {tx('กราฟเปรียบเทียบยอดขายจริงกับเป้าหมายรายชั่วโมง', 'Hourly Actual Sales vs. Target Pace')}
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                {tx('เส้นสีฟ้าคือยอดขายจริงของร้าน และเส้นประสีทองคือเป้าหมายที่ควรทำได้ในแต่ละช่วงเวลา', 'Solid blue shows actual store sales; dashed gold shows target pace.')}
              </p>
            </div>
          </div>
          <div className="h-72 w-full">
            <Line data={overviewLineData} options={lineChartOptions} />
          </div>
        </div>

        <div className={`lg:col-span-4 p-7 rounded-3xl border shadow-xl flex flex-col justify-between ${
          theme === 'dark' ? 'bg-[#0b1020]/85 border-white/10' : 'bg-white border-slate-200'
        }`}>
          <div>
            <h3 className={`text-lg font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              🍩 {tx('สัดส่วนยอดขายแยกตามช่องทาง', 'Sales Share by Channel')}
            </h3>
            <p className="text-xs text-slate-300 mt-0.5 mb-4">
              {tx('เปรียบเทียบสัดส่วนรายได้จากหน้าร้านจริงและออนไลน์', 'Revenue breakdown across physical and online channels')}
            </p>
            <div className="h-52 w-full flex items-center justify-center">
              <Doughnut
                data={overviewDoughnutData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { display: false } }
                }}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2.5 mt-4 pt-4 border-t border-white/10 text-xs">
            <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span> {tx('หน้าร้านจริง: 48%', 'Physical Stores: 48%')}</div>
            <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-sky-400"></span> {tx('ไลฟ์สด: 24%', 'Live Store: 24%')}</div>
            <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span> {tx('แอปช้อปปิ้ง: 16%', 'Marketplace: 16%')}</div>
            <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-purple-400"></span> {tx('แชตร้านค้า: 12%', 'Direct Chat: 12%')}</div>
          </div>
        </div>

        <div className={`lg:col-span-12 p-7 rounded-3xl border shadow-xl ${
          theme === 'dark' ? 'bg-[#0b1020]/85 border-white/10' : 'bg-white border-slate-200'
        }`}>
          <div className="flex flex-wrap justify-between items-center mb-5 gap-2">
            <div>
              <h3 className={`text-lg font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                📊 {tx('อัตราการตัดสินใจซื้อสำเร็จแยกตามช่องทางขาย', 'Purchase Conversion Rate by Channel')}
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                {tx('แสดงว่าลูกค้าที่ทักหรือเข้ามาในแต่ละช่องทาง ตัดสินใจซื้อจริงคิดเป็นกี่เปอร์เซ็นต์', 'Percentage of visitors in each channel who complete a purchase')}
              </p>
            </div>
            <span className="text-xs px-3.5 py-1.5 bg-emerald-500/15 text-emerald-300 rounded-xl border border-emerald-500/30 font-bold">
              {tx('🏆 ช่องทางที่ปิดการขายเก่งที่สุด: แชตร้านค้าโดยตรง (11.4%)', '🏆 Top Converting Channel: Direct Store Chat (11.4%)')}
            </span>
          </div>
          <div className="h-60 w-full">
            <Bar data={overviewBarData} options={barChartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function CustomersTab({
  lang,
  theme,
  customersList,
  setCustomersList
}) {
  const isEn = lang === 'en';
  const tx = (th, en) => (isEn ? en : th);

  const [selectedRfmSegment, setSelectedRfmSegment] = useState('all');
  const [customerSearch, setCustomerSearch] = useState('');
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);

  // ฟอร์มเพิ่มลูกค้าใหม่ (ทำงานจริง)
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCustName, setNewCustName] = useState('');
  const [newCustPhone, setNewCustPhone] = useState('');
  const [newCustSegment, setNewCustSegment] = useState('champion');
  const [newCustSpent, setNewCustSpent] = useState('');
  const [newCustProduct, setNewCustProduct] = useState('');

  const handleAddCustomer = (e) => {
    e.preventDefault();
    if (!newCustName.trim()) {
      toast.error(tx('กรุณากรอกชื่อลูกค้า', 'Please enter customer name'));
      return;
    }
    const spentVal = Math.max(500, Number(newCustSpent) || 12500);
    const newId = 'CUS-' + Math.floor(9010 + Math.random() * 900);
    const segLabelTh =
      newCustSegment === 'champion' ? '🏆 ลูกค้าชั้นดีสูงสุด' :
      newCustSegment === 'loyal' ? '💎 ลูกค้าประจำเหนียวแน่น' :
      newCustSegment === 'at_risk' ? '⚠️ ลูกค้าห่างหาย (ต้องรีบติดต่อ)' :
      '🌱 ลูกค้าใหม่เพิ่งซื้อครั้งแรก';
    const segLabelEn =
      newCustSegment === 'champion' ? '🏆 Top VIP Customer' :
      newCustSegment === 'loyal' ? '💎 Loyal Regular Customer' :
      newCustSegment === 'at_risk' ? '⚠️ Inactive Risk (Urgent Follow-Up)' :
      '🌱 New First-Time Customer';

    const newCustomerObj = {
      id: newId,
      segment: newCustSegment,
      rfmScore: newCustSegment === 'champion' ? '5-5-5' : newCustSegment === 'loyal' ? '4-4-4' : newCustSegment === 'at_risk' ? '1-3-4' : '5-1-3',
      recencyDays: newCustSegment === 'at_risk' ? 50 : 1,
      frequency: newCustSegment === 'new' ? 1 : 8,
      ltv: spentVal,
      aov: Math.round(spentVal / (newCustSegment === 'new' ? 1 : 8)),
      phone: newCustPhone || '081-555-9999',
      lineId: '@' + newCustName.replace(/\s+/g, '').toLowerCase().slice(0, 10),
      email: 'customer@store.co.th',
      contactedCount: 0,
      th: {
        name: newCustName.trim(),
        segmentLabel: segLabelTh,
        recencyText: newCustSegment === 'at_risk' ? '50 วันที่แล้ว' : 'วันนี้',
        favoriteProduct: newCustProduct || 'สินค้าขายดีประจำร้าน',
        aiAction: 'ดูแลต่อเนื่องและส่งข้อความแจ้งโปรโมชันพิเศษประจำเดือน',
        orders: [
          { orderId: 'ORD-' + Math.floor(1000 + Math.random() * 9000), date: 'วันนี้', items: newCustProduct || 'สินค้าขายดีประจำร้าน', total: spentVal, method: 'สแกนจ่ายคิวอาร์' }
        ]
      },
      en: {
        name: newCustName.trim(),
        segmentLabel: segLabelEn,
        recencyText: newCustSegment === 'at_risk' ? '50 days ago' : 'Today',
        favoriteProduct: newCustProduct || 'Store Best-Selling Product',
        aiAction: 'Follow up with personalized monthly offers and loyalty rewards.',
        orders: [
          { orderId: 'ORD-' + Math.floor(1000 + Math.random() * 9000), date: 'Today', items: newCustProduct || 'Store Best-Selling Product', total: spentVal, method: 'QR Payment' }
        ]
      }
    };

    setCustomersList(prev => [newCustomerObj, ...prev]);
    setNewCustName('');
    setNewCustPhone('');
    setNewCustSpent('');
    setNewCustProduct('');
    setShowAddForm(false);
    toast.success(tx(`✅ เพิ่มข้อมูลลูกค้า "${newCustomerObj.th.name}" เข้าสู่ระบบเรียบร้อยแล้ว!`, `✅ Added customer "${newCustomerObj.en.name}" successfully!`));
  };

  const handleContactCustomer = (cust, type) => {
    const cLoc = isEn ? cust.en : cust.th;
    setCustomersList(prev =>
      prev.map(item =>
        item.id === cust.id
          ? {
              ...item,
              contactedCount: (item.contactedCount || 0) + 1,
              segment: item.segment === 'at_risk' ? 'loyal' : item.segment,
              th: {
                ...item.th,
                segmentLabel: item.segment === 'at_risk' ? '💎 ลูกค้าประจำ (ติดตามกลับมาแล้ว)' : item.th.segmentLabel,
                recencyText: type === 'call' ? 'โทรติดตามแล้ววันนี้' : 'ส่งข้อความคูปองแล้ววันนี้'
              },
              en: {
                ...item.en,
                segmentLabel: item.segment === 'at_risk' ? '💎 Loyal Regular (Re-engaged)' : item.en.segmentLabel,
                recencyText: type === 'call' ? 'Called today' : 'Coupon sent today'
              }
            }
          : item
      )
    );
    if (type === 'call') {
      toast.success(tx(`📞 บันทึกการโทรหา ${cLoc.name} (${cust.phone}) สำเร็จ! สถานะลูกค้าอัปเดตแล้ว`, `📞 Logged phone follow-up with ${cLoc.name} (${cust.phone})!`));
    } else {
      toast.success(tx(`💬 ส่งข้อความคูปองส่วนลดให้ ${cLoc.name} (${cust.lineId}) สำเร็จ!`, `💬 Sent discount voucher message to ${cLoc.name} (${cust.lineId})!`));
    }
  };

  const exportCustomerCsv = () => {
    const headers = isEn
      ? ['Customer ID,Customer Name,Group,Last Purchase,Total Orders,Lifetime Value (THB),Phone,Chat ID,Favorite Product']
      : ['รหัสลูกค้า,ชื่อลูกค้า,กลุ่มลูกค้า,ซื้อครั้งล่าสุด,จำนวนครั้งที่ซื้อ,ยอดซื้อสะสมรวม (บาท),เบอร์โทรศัพท์,ไอดีแชต,สินค้าที่ชอบซื้อ'];
    const rows = customersList.map(c => {
      const loc = isEn ? c.en : c.th;
      return `"${c.id}","${loc.name}","${loc.segmentLabel}","${loc.recencyText}",${c.frequency},${c.ltv},"${c.phone}","${c.lineId}","${loc.favoriteProduct}"`;
    });
    const csvContent = "\uFEFF" + [headers, ...rows].join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', isEn ? 'Customer_Analysis_Report.csv' : 'รายงานวิเคราะห์ลูกค้าประจำร้าน.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(tx('📥 ดาวน์โหลดไฟล์ตารางข้อมูลลูกค้า (.csv) สำเร็จ!', '📥 Downloaded Customer Analysis Report (.csv)!'));
  };

  const filteredCustomers = customersList.filter(c => {
    const loc = isEn ? c.en : c.th;
    const matchSegment = selectedRfmSegment === 'all' || c.segment === selectedRfmSegment;
    const q = customerSearch.trim().toLowerCase();
    const matchSearch =
      !q ||
      loc.name.toLowerCase().includes(q) ||
      c.id.toLowerCase().includes(q) ||
      c.phone.toLowerCase().includes(q) ||
      c.lineId.toLowerCase().includes(q) ||
      loc.favoriteProduct.toLowerCase().includes(q);
    return matchSegment && matchSearch;
  });

  const selectedCustomerProfile = customersList.find(c => c.id === selectedCustomerId) || null;

  const countBySeg = (seg) => customersList.filter(c => c.segment === seg).length;
  const totalLtvAll = customersList.reduce((acc, c) => acc + c.ltv, 0);
  const avgLtv = Math.round(totalLtvAll / Math.max(1, customersList.length));

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* 1. แบนเนอร์หัวข้อหน้าวิเคราะห์ลูกค้า */}
      <div className={`p-7 sm:p-8 rounded-3xl border relative overflow-hidden shadow-2xl ${
        theme === 'dark'
          ? 'bg-gradient-to-r from-amber-500/15 via-[#0b1228] to-[#040817] border-amber-400/40'
          : 'bg-gradient-to-r from-amber-100/70 via-white to-sky-50 border-amber-300'
      }`}>
        <div className="relative z-10 flex flex-col lg:flex-row justify-between lg:items-center gap-6">
          <div className="flex items-start gap-4">
            <LuxuryIconBadge variant="ruby" size="lg" active>
              <LuxuryModuleIcon type="customers" size={28} />
            </LuxuryIconBadge>
            <div>
              <span className="text-xs font-black uppercase px-3 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                {tx('ระบบวิเคราะห์พฤติกรรมลูกค้าและการซื้อซ้ำ', 'Customer Loyalty & Segmentation')}
              </span>
              <h2 className={`text-2xl font-black mt-1.5 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                {tx('วิเคราะห์ลูกค้าชั้นดี และติดตามลูกค้าที่หายไปนาน', 'Identify Top VIP Buyers & Re-Engage Inactive Customers')}
              </h2>
              <p className="text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
                {tx(
                  'ช่วยให้ร้านค้ารู้ทันทีว่าใครคือลูกค้าชั้นดีที่ซื้อบ่อยยอดสูง และใครคือลูกค้าที่เคยซื้อประจำแต่หายไปนาน เพื่อกดปุ่มโทรหรือส่งข้อความคูปองดึงกลับมาซื้อซ้ำได้ทันที',
                  'Instantly see who your highest-spending repeat buyers are and who has gone inactive, so you can call or send win-back coupons with a single click.'
                )}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 self-start lg:self-center">
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black px-5 py-3 rounded-2xl text-xs transition shadow-lg cursor-pointer"
            >
              {tx('➕ เพิ่มรายชื่อลูกค้าใหม่', '➕ Add New Customer')}
            </button>
            <button
              onClick={exportCustomerCsv}
              className="bg-white/10 hover:bg-white/15 text-slate-200 font-bold px-5 py-3 rounded-2xl text-xs border border-white/15 transition cursor-pointer"
            >
              {tx('📥 ดาวน์โหลดรายชื่อลูกค้า (.csv)', '📥 Export Customers (.csv)')}
            </button>
          </div>
        </div>

        {/* ฟอร์มเพิ่มลูกค้าใหม่ (เปิดเมื่อกดปุ่ม) */}
        {showAddForm && (
          <form onSubmit={handleAddCustomer} className="mt-6 pt-6 border-t border-white/15 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 items-end">
            <div>
              <label className="block text-xs font-bold text-amber-300 mb-1">{tx('ชื่อ-นามสกุลลูกค้า', 'Customer Name')}</label>
              <input
                type="text"
                value={newCustName}
                onChange={(e) => setNewCustName(e.target.value)}
                placeholder={tx('เช่น คุณสมศรี มีสุข', 'e.g. Ms. Somsri Meesuk')}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#050914] border border-white/20 text-white text-xs font-bold"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-amber-300 mb-1">{tx('เบอร์โทรศัพท์', 'Phone Number')}</label>
              <input
                type="text"
                value={newCustPhone}
                onChange={(e) => setNewCustPhone(e.target.value)}
                placeholder="081-234-5678"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#050914] border border-white/20 text-white text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-amber-300 mb-1">{tx('จัดกลุ่มลูกค้า', 'Customer Group')}</label>
              <select
                value={newCustSegment}
                onChange={(e) => setNewCustSegment(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#050914] border border-white/20 text-white text-xs font-bold"
              >
                <option value="champion">{tx('🏆 ลูกค้าชั้นดีสูงสุด', '🏆 Top VIP Customer')}</option>
                <option value="loyal">{tx('💎 ลูกค้าประจำ', '💎 Loyal Regular')}</option>
                <option value="at_risk">{tx('⚠️ ลูกค้าห่างหาย', '⚠️ Inactive Risk')}</option>
                <option value="new">{tx('🌱 ลูกค้าใหม่', '🌱 New Customer')}</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-amber-300 mb-1">{tx('ยอดซื้อสะสม (บาท)', 'Total Spent (THB)')}</label>
              <input
                type="number"
                value={newCustSpent}
                onChange={(e) => setNewCustSpent(e.target.value)}
                placeholder="25000"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#050914] border border-white/20 text-amber-300 text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-amber-300 mb-1">{tx('สินค้าที่ซื้อประจำ', 'Favorite Product')}</label>
              <input
                type="text"
                value={newCustProduct}
                onChange={(e) => setNewCustProduct(e.target.value)}
                placeholder={tx('เช่น เซรั่มบำรุงผิว', 'e.g. Facial Serum')}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#050914] border border-white/20 text-white text-xs font-bold"
              />
            </div>
            <button
              type="submit"
              className="py-2.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-lg cursor-pointer"
            >
              {tx('💾 บันทึกลูกค้าใหม่', '💾 Save Customer')}
            </button>
          </form>
        )}
      </div>

      {/* 2. การ์ดสรุปมูลค่าลูกค้า 4 กล่อง */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className={`p-6 rounded-3xl border shadow-xl ${theme === 'dark' ? 'bg-[#0b1020]/85 border-white/10' : 'bg-white border-slate-200'}`}>
          <span className="text-xs font-bold text-slate-300">{tx('ยอดซื้อสะสมเฉลี่ยต่อคน', 'Average Customer Lifetime Value')}</span>
          <h3 className={`text-3xl font-black mt-2 font-mono ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>฿ {avgLtv.toLocaleString()}</h3>
          <p className="text-xs text-emerald-400 mt-1 font-bold">{tx('คำนวณจากยอดซื้อจริงของลูกค้าในตาราง', 'Calculated live from customer records')}</p>
        </div>

        <div className={`p-6 rounded-3xl border shadow-xl ${theme === 'dark' ? 'bg-[#0b1020]/85 border-white/10' : 'bg-white border-slate-200'}`}>
          <span className="text-xs font-bold text-amber-300">{tx('กลุ่มลูกค้าชั้นดีสูงสุด', 'Top VIP Customers')}</span>
          <h3 className="text-3xl font-black text-amber-400 mt-2">{countBySeg('champion')} {tx('ราย', 'buyers')}</h3>
          <p className="text-xs text-slate-300 mt-1">{tx('ซื้อบ่อยและมียอดใช้จ่ายต่อบิลสูงที่สุด', 'Highest purchase frequency & basket size')}</p>
        </div>

        <div className={`p-6 rounded-3xl border shadow-xl ${theme === 'dark' ? 'bg-[#0b1020]/85 border-rose-500/30' : 'bg-white border-rose-200'}`}>
          <span className="text-xs font-bold text-rose-400">{tx('กลุ่มลูกค้าห่างหาย (ต้องรีบตาม)', 'Inactive Risk Customers')}</span>
          <h3 className="text-3xl font-black text-rose-400 mt-2">{countBySeg('at_risk')} {tx('ราย', 'buyers')}</h3>
          <p className="text-xs text-rose-300 mt-1">{tx('เคยซื้อประจำแต่หายไปเกิน 45 วัน', 'Previously regular buyers inactive >45 days')}</p>
        </div>

        <div className={`p-6 rounded-3xl border shadow-xl ${theme === 'dark' ? 'bg-[#0b1020]/85 border-white/10' : 'bg-white border-slate-200'}`}>
          <span className="text-xs font-bold text-emerald-300">{tx('กลุ่มลูกค้าประจำและลูกค้าใหม่', 'Loyal & New Customers')}</span>
          <h3 className="text-3xl font-black text-emerald-400 mt-2">{countBySeg('loyal') + countBySeg('new')} {tx('ราย', 'buyers')}</h3>
          <p className="text-xs text-slate-300 mt-1">{tx('กลับมาซื้อซ้ำสม่ำเสมอทุกเดือน', 'Active repeat & first-time buyers')}</p>
        </div>
      </div>

      {/* 3. ปุ่มการ์ดเลือกกลุ่มลูกค้า 4 กลุ่ม (กดกรองตารางได้จริง) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          {
            id: 'champion',
            title: tx('🏆 ลูกค้าชั้นดีสูงสุด', '🏆 Top VIP Customers'),
            count: `${countBySeg('champion')} ${tx('ราย', 'buyers')}`,
            rule: tx('เพิ่งซื้อไม่นาน • ซื้อบ่อยมาก • ยอดใช้จ่ายสูง', 'Recent buyer • High frequency • High spend'),
            strategy: tx('ดูแลระดับพิเศษ เชิญชมสินค้าใหม่ก่อนใครโดยไม่ต้องลดราคา', 'Offer VIP early access and exclusive gifts without heavy discounts'),
            badgeClass: 'bg-amber-400 text-slate-950'
          },
          {
            id: 'loyal',
            title: tx('💎 ลูกค้าประจำเหนียวแน่น', '💎 Loyal Regular Customers'),
            count: `${countBySeg('loyal')} ${tx('ราย', 'buyers')}`,
            rule: tx('ซื้อสม่ำเสมอทุกเดือน • ชอบสะสมแต้ม', 'Buys consistently every month • High loyalty'),
            strategy: tx('แนะนำสินค้าจัดชุดคู่กัน เพื่อเพิ่มยอดซื้อต่อบิลให้สูงขึ้น', 'Recommend product bundles to increase average order value'),
            badgeClass: 'bg-sky-400 text-slate-950'
          },
          {
            id: 'at_risk',
            title: tx('⚠️ ลูกค้าห่างหาย (เสี่ยงเลิกซื้อ)', '⚠️ Inactive Risk (Follow Up)'),
            count: `${countBySeg('at_risk')} ${tx('ราย', 'buyers')}`,
            rule: tx('เคยซื้อบ่อยแต่หายไปนานเกิน 45-60 วัน', 'Used to buy often but inactive for 45–60 days'),
            strategy: tx('กดปุ่มโทรหรือส่งคูปองส่วนลด 20% เพื่อดึงกลับมาทันที', 'Call or send a 20% win-back discount voucher immediately'),
            badgeClass: 'bg-rose-500 text-white'
          },
          {
            id: 'new',
            title: tx('🌱 ลูกค้าใหม่เพิ่งซื้อครั้งแรก', '🌱 New First-Time Customers'),
            count: `${countBySeg('new')} ${tx('ราย', 'buyers')}`,
            rule: tx('เพิ่งเข้ามาซื้อครั้งแรกในสัปดาห์นี้', 'Made their first purchase this week'),
            strategy: tx('ส่งคูปองส่วนลดสำหรับการซื้อครั้งที่ 2 ภายใน 7 วัน', 'Send a second-purchase voucher valid for 7 days'),
            badgeClass: 'bg-emerald-400 text-slate-950'
          }
        ].map((seg) => (
          <div
            key={seg.id}
            onClick={() => setSelectedRfmSegment(selectedRfmSegment === seg.id ? 'all' : seg.id)}
            className={`p-5 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between ${
              selectedRfmSegment === seg.id
                ? 'border-amber-400 bg-amber-400/15 ring-2 ring-amber-400 shadow-xl'
                : theme === 'dark'
                ? 'bg-[#0b1020]/90 border-white/10 hover:border-white/30'
                : 'bg-white border-slate-200 hover:border-slate-400'
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className={`text-xs font-black px-3 py-0.5 rounded-full ${seg.badgeClass}`}>{seg.count}</span>
                <span className="text-xs font-bold text-amber-300">
                  {selectedRfmSegment === seg.id ? tx('✓ กำลังแสดงกลุ่มนี้', '✓ Filtering this group') : tx('คลิกเพื่อกรอง →', 'Click to filter →')}
                </span>
              </div>
              <h4 className={`text-base font-black mb-1.5 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{seg.title}</h4>
              <p className="text-xs text-slate-300 mb-3">{seg.rule}</p>
            </div>
            <div className="p-3 rounded-2xl bg-black/30 border border-white/10 text-xs text-slate-200">
              <strong className="text-amber-300 block mb-0.5">💡 {tx('คำแนะนำการดูแล:', 'Recommended Action:')}</strong>
              {seg.strategy}
            </div>
          </div>
        ))}
      </div>

      {/* 4. ตารางรายชื่อลูกค้าและประวัติการซื้อรายบุคคล */}
      <div className={`p-7 rounded-3xl border shadow-2xl ${
        theme === 'dark' ? 'bg-[#0b1020]/90 border-white/10' : 'bg-white border-slate-200'
      }`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className={`text-lg font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              🔍 {tx('ตารางรายชื่อลูกค้า ประวัติการซื้อ และปุ่มติดต่อด่วน', 'Customer Directory, Purchase History & Quick Contact')}
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              {tx('กดปุ่ม "ดูประวัติซื้อ" เพื่อดูบิลย้อนหลัง หรือกดปุ่ม "โทร" / "ส่งข้อความ" เพื่อบันทึกการติดตามลูกค้าได้จริง', 'Click "View Orders" to inspect past receipts, or click "Call" / "Message" to log customer follow-ups.')}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <input
              type="text"
              value={customerSearch}
              onChange={(e) => setCustomerSearch(e.target.value)}
              placeholder={tx('ค้นหาชื่อลูกค้า, เบอร์โทร, สินค้า...', 'Search name, phone, product...')}
              className={`w-full sm:w-64 px-4 py-2.5 rounded-xl border text-xs font-bold focus:outline-none focus:border-amber-400 ${
                theme === 'dark' ? 'bg-[#060a16] border-white/15 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
              }`}
            />
            {selectedRfmSegment !== 'all' && (
              <button
                onClick={() => setSelectedRfmSegment('all')}
                className="px-3.5 py-2.5 rounded-xl bg-amber-400 text-slate-950 font-black text-xs cursor-pointer"
              >
                {tx('แสดงทุกกลุ่มทั้งหมด', 'Show All Groups')}
              </button>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className={`border-b text-xs font-black ${theme === 'dark' ? 'border-white/10 text-slate-300 bg-black/25' : 'border-slate-200 text-slate-700 bg-slate-50'}`}>
                <th className="p-4 rounded-tl-xl">{tx('ชื่อลูกค้า / เบอร์โทรศัพท์', 'Customer / Phone')}</th>
                <th className="p-4">{tx('กลุ่มลูกค้า', 'Customer Group')}</th>
                <th className="p-4">{tx('ซื้อครั้งล่าสุด', 'Last Purchase')}</th>
                <th className="p-4">{tx('จำนวนครั้งที่ซื้อ', 'Total Orders')}</th>
                <th className="p-4">{tx('ยอดซื้อสะสมรวม', 'Lifetime Spend')}</th>
                <th className="p-4">{tx('สินค้าที่ชอบ & คำแนะนำ', 'Favorite Product & Advice')}</th>
                <th className="p-4 rounded-tr-xl text-right">{tx('ปุ่มจัดการและติดต่อ', 'Actions & Contact')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-sm">
              {filteredCustomers.map((cust) => {
                const loc = isEn ? cust.en : cust.th;
                return (
                  <tr key={cust.id} className="hover:bg-white/[0.04] transition">
                    <td className="p-4">
                      <div className={`font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                        {loc.name}
                      </div>
                      <div className="text-xs text-slate-300 mt-1 flex flex-wrap gap-2">
                        <span>📞 {cust.phone}</span>
                        <span className="text-emerald-400 font-bold">{cust.lineId}</span>
                      </div>
                    </td>

                    <td className="p-4">
                      <span className={`inline-block px-2.5 py-1 rounded-lg text-xs font-black ${
                        cust.segment === 'champion' ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30' :
                        cust.segment === 'at_risk' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                        cust.segment === 'loyal' ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30' :
                        'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      }`}>
                        {loc.segmentLabel}
                      </span>
                    </td>

                    <td className="p-4">
                      <span className={`font-bold text-xs ${cust.recencyDays > 40 ? 'text-rose-400' : 'text-slate-200'}`}>
                        {loc.recencyText}
                      </span>
                    </td>

                    <td className="p-4">
                      <span className="font-black text-white">{cust.frequency} {tx('ครั้ง', 'orders')}</span>
                      <div className="text-xs text-slate-400">
                        {tx(`เฉลี่ย ฿${cust.aov.toLocaleString()}/บิล`, `Avg ฿${cust.aov.toLocaleString()}/bill`)}
                      </div>
                    </td>

                    <td className="p-4">
                      <span className="text-base font-black text-amber-400 font-mono">
                        ฿ {cust.ltv.toLocaleString()}
                      </span>
                    </td>

                    <td className="p-4 max-w-xs">
                      <div className="text-xs font-bold text-slate-200">🛍️ {loc.favoriteProduct}</div>
                      <div className="text-xs text-slate-400 mt-1">{loc.aiAction}</div>
                    </td>

                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedCustomerId(cust.id)}
                          className="px-3 py-2 rounded-xl bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 border border-amber-400/40 text-xs font-bold transition cursor-pointer"
                        >
                          📜 {tx(`ดูประวัติซื้อ (${loc.orders.length})`, `View Orders (${loc.orders.length})`)}
                        </button>
                        <button
                          onClick={() => handleContactCustomer(cust, 'call')}
                          className="px-3 py-2 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/40 text-xs font-bold transition cursor-pointer"
                        >
                          📞 {tx('โทร', 'Call')}
                        </button>
                        <button
                          onClick={() => handleContactCustomer(cust, 'msg')}
                          className="px-3 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-bold transition cursor-pointer"
                        >
                          💬 {tx('ส่งคูปอง', 'Send Coupon')} {cust.contactedCount > 0 ? `(${cust.contactedCount})` : ''}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* 5. หน้าต่างแสดงประวัติการซื้อรายบุคคล (เมื่อคลิกดูประวัติซื้อ) */}
        {selectedCustomerProfile && (() => {
          const profLoc = isEn ? selectedCustomerProfile.en : selectedCustomerProfile.th;
          return (
            <div className={`mt-6 p-6 rounded-3xl border-2 border-amber-400 shadow-2xl animate-in fade-in duration-200 ${
              theme === 'dark' ? 'bg-[#060b18]' : 'bg-amber-50/50'
            }`}>
              <div className="flex flex-wrap items-start justify-between gap-4 pb-4 mb-5 border-b border-white/10">
                <div>
                  <span className="text-xs font-black px-3 py-0.5 rounded-md bg-amber-400 text-slate-950">
                    {tx('ประวัติการซื้อรายบุคคลโดยละเอียด', 'Detailed Customer Purchase History')}
                  </span>
                  <h4 className="text-xl font-black text-white mt-1.5">
                    {profLoc.name} — {tx('ยอดซื้อสะสมรวม:', 'Total Lifetime Spend:')} <span className="text-amber-400">฿ {selectedCustomerProfile.ltv.toLocaleString()}</span>
                  </h4>
                  <p className="text-xs text-slate-300 mt-0.5">
                    📞 {selectedCustomerProfile.phone} • 💬 {selectedCustomerProfile.lineId} • ✉️ {selectedCustomerProfile.email}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleContactCustomer(selectedCustomerProfile, 'msg')}
                    className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-4 py-2 rounded-xl text-xs transition cursor-pointer"
                  >
                    🎁 {tx('ส่งคูปองส่วนลดให้ลูกค้าท่านนี้', 'Send Special Voucher')}
                  </button>
                  <button
                    onClick={() => setSelectedCustomerId(null)}
                    className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition cursor-pointer"
                  >
                    ✕ {tx('ปิดหน้าต่าง', 'Close')}
                  </button>
                </div>
              </div>

              <div className="space-y-2.5">
                {profLoc.orders.map((ord) => (
                  <div key={ord.orderId} className="p-4 rounded-2xl border border-white/10 bg-black/30 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div>
                      <span className="font-mono font-bold text-amber-400">{ord.orderId}</span>
                      <span className="text-slate-300 ml-2">• {ord.date} ({ord.method})</span>
                      <p className="text-white font-bold mt-1 text-sm">{ord.items}</p>
                    </div>
                    <span className="text-base font-black text-emerald-400 font-mono">฿ {ord.total.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
}

