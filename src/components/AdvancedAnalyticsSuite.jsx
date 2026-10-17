// ==============================================================================
// File: src/components/AdvancedAnalyticsSuite.jsx
// System: InsightFlow Midstream Advanced Analytics & Statistical Modeling Center
// Description: Interactive UI for Sales Forecasting, Dynamic Reorder Points,
//              RFM Customer Segmentation, Market Basket, and A/B Testing
// ==============================================================================

import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { Line } from 'react-chartjs-2';
import { LuxuryModuleIcon, DailyAverageDemandIcon } from './LuxuryIcons';

export default function AdvancedAnalyticsSuite({ lang = 'th' }) {
  const isEn = lang === 'en';
  const tx = (th, en) => (isEn ? en : th);

  const [activeModule, setActiveModule] = useState('forecasting'); // 'forecasting' | 'rfm_basket' | 'ab_testing'

  // ----------------------------------------------------------------------------
  // 1. STATE: FORECASTING & DYNAMIC ROP
  // ----------------------------------------------------------------------------
  const [forecastDays, setForecastDays] = useState(30);
  const [forecastData, setForecastData] = useState({
    totalProjectedRevenue: 548900,
    growthRatePct: 8.4,
    dailyMean: 17850,
    series: [
      { date: 'Day 1', predicted: 16500, upper: 18200, lower: 14800 },
      { date: 'Day 5', predicted: 17200, upper: 19100, lower: 15300 },
      { date: 'Day 10', predicted: 19800, upper: 22000, lower: 17600 },
      { date: 'Day 15', predicted: 18400, upper: 20600, lower: 16200 },
      { date: 'Day 20', predicted: 22100, upper: 24700, lower: 19500 },
      { date: 'Day 25', predicted: 20300, upper: 22900, lower: 17700 },
      { date: 'Day 30', predicted: 24500, upper: 27500, lower: 21500 },
    ],
  });

  const [ropItems, setRopItems] = useState([
    {
      sku: 'SKU-COF-01',
      name: tx('เมล็ดกาแฟ House Blend คั่วกลาง (1 กก.)', 'Medium Roast House Blend (1kg)'),
      currentStock: 28,
      dailyDemand: 18.1,
      leadTime: 3,
      safetyStock: 11,
      rop: 65,
      status: 'URGENT',
      suggestedQty: 250,
      unit: tx('ถุง', 'bags'),
    },
    {
      sku: 'SKU-COF-02',
      name: tx('ผงมัทฉะเกรดพิธีการ Ceremonial Matcha (500g)', 'Ceremonial Matcha Powder (500g)'),
      currentStock: 14,
      dailyDemand: 4.6,
      leadTime: 5,
      safetyStock: 6,
      rop: 29,
      status: 'URGENT',
      suggestedQty: 60,
      unit: tx('กระปุก', 'tins'),
    },
    {
      sku: 'SKU-BAK-01',
      name: tx('เนยสดแท้ฝรั่งเศสพรีเมียม AOP (1 กก.)', 'French AOP Butter (1kg)'),
      currentStock: 18,
      dailyDemand: 12.6,
      leadTime: 2,
      safetyStock: 6,
      rop: 32,
      status: 'URGENT',
      suggestedQty: 180,
      unit: tx('ก้อน', 'blocks'),
    },
    {
      sku: 'SKU-DES-01',
      name: tx('ครีมชีสฟิลาเดลเฟียสำหรับหน้าไหม้ (2 กก.)', 'Philadelphia Cream Cheese (2kg)'),
      currentStock: 42,
      dailyDemand: 7.5,
      leadTime: 4,
      safetyStock: 6,
      rop: 36,
      status: 'HEALTHY',
      suggestedQty: 0,
      unit: tx('กล่อง', 'boxes'),
    },
  ]);

  // ----------------------------------------------------------------------------
  // 2. STATE: RFM & MARKET BASKET
  // ----------------------------------------------------------------------------
  const [rfmSegments, setRfmSegments] = useState([
    {
      id: 'champions',
      name: tx('🏆 ลูกค้าชั้นยอด (Champions VIP)', 'Champions VIP Customers'),
      rfm: '5-5-5 / 5-5-4',
      count: 142,
      share: '14.8%',
      revenue: '฿2,619,900',
      churnRisk: tx('ต่ำมาก (< 5%)', 'Very Low (< 5%)'),
      action: tx('มอบสิทธิพิเศษ VIP Lounge & เชิญชิมเมนูใหม่ก่อนใคร', 'VIP perks, birthday gift & exclusive access'),
      color: 'from-amber-500/20 to-amber-600/10 border-amber-400/40 text-amber-300',
    },
    {
      id: 'loyal',
      name: tx('💎 ขาประจำเหนียวแน่น (Loyal Customers)', 'Loyal Regulars'),
      rfm: '4-4-4 / 3-4-4',
      count: 286,
      share: '29.8%',
      revenue: '฿2,631,200',
      churnRisk: tx('ต่ำ (10 - 15%)', 'Low (10 - 15%)'),
      action: tx('เสนอโปร Cross-sell สินค้าพรีเมียม & สะสมแต้มคูณสอง', 'Cross-sell high-margin combos & 2x loyalty points'),
      color: 'from-sky-500/20 to-blue-600/10 border-sky-400/40 text-sky-300',
    },
    {
      id: 'potential',
      name: tx('🌱 มีศักยภาพเติบโต (Potential Loyalists)', 'Potential Loyalists'),
      rfm: '4-2-3 / 5-1-2',
      count: 215,
      share: '22.4%',
      revenue: '฿881,500',
      churnRisk: tx('ปานกลาง (25 - 35%)', 'Medium (25 - 35%)'),
      action: tx('แจกคูปองซื้อครั้งที่ 2 ภายใน 14 วัน ดึงเป็นขาประจำ', 'Offer 14-day return voucher to lock in loyalty'),
      color: 'from-emerald-500/20 to-teal-600/10 border-emerald-400/40 text-emerald-300',
    },
    {
      id: 'at_risk',
      name: tx('⚠️ ขาประจำเริ่มหาย (At-Risk VIPs)', 'At-Risk VIP Customers'),
      rfm: '2-4-4 / 1-4-5',
      count: 89,
      share: '9.3%',
      revenue: '฿1,139,200',
      churnRisk: tx('สูงมาก (65 - 80%)', 'Very High (65 - 80%)'),
      action: tx('ส่งคูปองพิเศษลด 20% ด่วนผ่าน LINE OA หรือโทรติดตาม', 'Trigger urgent 20% win-back voucher via LINE OA'),
      color: 'from-rose-500/20 to-red-600/10 border-rose-400/40 text-rose-300',
    },
    {
      id: 'churned',
      name: tx('💤 หยุดซื้อแล้ว (Hibernating / Churned)', 'Hibernating / Lost'),
      rfm: '1-1-1 / 1-2-1',
      count: 228,
      share: '23.7%',
      revenue: '฿330,600',
      churnRisk: tx('หลุดแล้ว (> 90%)', 'Lost (> 90%)'),
      action: tx('แคมเปญ Re-engagement ช่วงเทศกาล หรือตัดงบโฆษณาตาม', 'Seasonal reactivation or exclude from paid ads'),
      color: 'from-slate-500/20 to-slate-700/10 border-slate-500/30 text-slate-300',
    },
  ]);

  const [marketBasketRules, setMarketBasketRules] = useState([
    {
      itemA: tx('Espresso Double Shot', 'Espresso Double Shot'),
      itemB: tx('Almond Butter Croissant', 'Almond Butter Croissant'),
      support: '18.5%',
      confidence: '74.2%',
      lift: 2.45,
      uplift: '+34.5% Basket Value',
      promo: tx('Morning Boost Combo: กาแฟคู่ครัวซองต์ ลด 15 บาท', 'Morning Boost Combo: Coffee + Croissant save ฿15'),
      badge: '🔥 Top Seller Pair',
    },
    {
      itemA: tx('Matcha Ceremonial Latte', 'Matcha Ceremonial Latte'),
      itemB: tx('Basque Burnt Cheesecake', 'Basque Burnt Cheesecake'),
      support: '14.2%',
      confidence: '61.5%',
      lift: 2.10,
      uplift: '+28.0% Basket Value',
      promo: tx('Kyoto Afternoon Tea: มัทฉะคู่ชีสเค้กหน้าไหม้ ฟรีท็อปปิ้ง', 'Kyoto Tea Set: Matcha + Cheesecake free topping'),
      badge: '⭐ High Margin',
    },
    {
      itemA: tx('Truffle Sourdough Toast', 'Truffle Sourdough Toast'),
      itemB: tx('Sparkling Citrus Cold Brew', 'Sparkling Citrus Cold Brew'),
      support: '9.8%',
      confidence: '52.8%',
      lift: 1.88,
      uplift: '+22.4% Basket Value',
      promo: tx('Brunch Special: โทสต์ทรัฟเฟิลคู่โคลด์บรูว์ส้มยูซุ', 'Brunch Special: Truffle Toast + Yuzu Cold Brew'),
      badge: '✨ Cross-Sell',
    },
  ]);

  // ----------------------------------------------------------------------------
  // 3. STATE: A/B TESTING CALCULATOR
  // ----------------------------------------------------------------------------
  const [abInputs, setAbInputs] = useState({
    nameA: tx('แคมเปญ A: ลดราคา 10%', 'Campaign A: 10% Discount'),
    visitorsA: 1200,
    conversionsA: 68,
    nameB: tx('แคมเปญ B: ส่งฟรีไม่มีขั้นต่ำ', 'Campaign B: Free Delivery'),
    visitorsB: 1250,
    conversionsB: 102,
  });

  const [abResult, setAbResult] = useState({
    rateA: 5.67,
    rateB: 8.16,
    lift: 43.9,
    zScore: 2.428,
    pValue: 0.0152,
    confidence: 98.48,
    isSignificant: true,
    winner: 'B',
    verdict: tx(
      '🏆 แคมเปญ B (ส่งฟรีไม่มีขั้นต่ำ) ชนะอย่างมีนัยสำคัญทางสถิติ! (ความเชื่อมั่น 98.5%)',
      '🏆 Campaign B (Free Delivery) is a Statistically Significant Winner! (98.5% Confidence)'
    ),
    recommendation: tx(
      'ความแตกต่างไม่ได้เกิดจากความบังเอิญ แนะนำให้โยกงบการตลาดไปที่แคมเปญ B 100% ทันที',
      'Difference is real and not random. Allocate 100% marketing budget to Campaign B.'
    ),
  });

  // Calculate A/B Test Live
  const runLiveAbCalculation = (inputs) => {
    const vA = Math.max(1, Number(inputs.visitorsA) || 1);
    const cA = Math.min(vA, Math.max(0, Number(inputs.conversionsA) || 0));
    const vB = Math.max(1, Number(inputs.visitorsB) || 1);
    const cB = Math.min(vB, Math.max(0, Number(inputs.conversionsB) || 0));

    const pA = cA / vA;
    const pB = cB / vB;
    const pooledP = (cA + cB) / (vA + vB);
    const se = Math.sqrt(pooledP * (1.0 - pooledP) * ((1.0 / vA) + (1.0 / vB)));

    let z = 0;
    if (se > 0) z = (pB - pA) / se;

    // Gauss error function approximation
    const erf = (x) => {
      const a1 = 0.254829592, a2 = -0.284496736, a3 = 1.421413741, a4 = -1.453152027, a5 = 1.061405429, p = 0.3275911;
      const sign = x < 0 ? -1 : 1;
      x = Math.abs(x);
      const t = 1.0 / (1.0 + p * x);
      const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
      return sign * y;
    };
    const cdf = (val) => 0.5 * (1.0 + erf(val / Math.sqrt(2.0)));
    const pVal = 2.0 * (1.0 - cdf(Math.abs(z)));

    const isSig = pVal < 0.05;
    const conf = Math.max(0, Math.min(99.99, (1.0 - pVal) * 100));
    const lift = pA > 0 ? ((pB - pA) / pA) * 100 : 0;

    let win = 'INCONCLUSIVE';
    let verd = tx(
      `⚖️ ยังไม่มีนัยสำคัญทางสถิติ (p = ${pVal.toFixed(4)} ≥ 0.05) ความต่างอาจเกิดจากความบังเอิญ`,
      `⚖️ Inconclusive (p = ${pVal.toFixed(4)} ≥ 0.05). Observed difference may be due to chance.`
    );
    let rec = tx(
      'แนะนำให้รันแคมเปญต่ออีก 7-14 วัน จนกว่ากลุ่มตัวอย่างจะมีขนาดใหญ่พอ',
      'Keep running test for 7-14 more days to gather a larger sample size.'
    );

    if (isSig) {
      if (pB > pA) {
        win = 'B';
        verd = tx(
          `🏆 แคมเปญ B (${inputs.nameB}) ชนะอย่างมีนัยสำคัญทางสถิติ! (ความเชื่อมั่น ${conf.toFixed(1)}%)`,
          `🏆 Campaign B (${inputs.nameB}) is the Statistically Significant Winner! (${conf.toFixed(1)}% Confidence)`
        );
        rec = tx(
          `แคมเปญ B ให้ Conversion สูงกว่า ${Math.abs(lift).toFixed(1)}% แนะนำให้เริ่มใช้งานแคมเปญ B ทันที`,
          `Campaign B delivers +${Math.abs(lift).toFixed(1)}% higher conversion. Deploy Campaign B to 100% of audience.`
        );
      } else {
        win = 'A';
        verd = tx(
          `🏆 แคมเปญ A (${inputs.nameA}) มีประสิทธิภาพดีกว่าอย่างมีนัยสำคัญ`,
          `🏆 Campaign A (${inputs.nameA}) performs significantly better than Variation B.`
        );
        rec = tx(
          'แคมเปญ B ทำให้ยอดตก แนะนำให้ยกเลิกแคมเปญ B และใช้แคมเปญ A ตามเดิม',
          'Variation B hurt performance. Discard Variation B and retain Control A.'
        );
      }
    }

    setAbResult({
      rateA: Number((pA * 100).toFixed(2)),
      rateB: Number((pB * 100).toFixed(2)),
      lift: Number(lift.toFixed(1)),
      zScore: Number(z.toFixed(3)),
      pValue: Number(pVal.toFixed(4)),
      confidence: Number(conf.toFixed(1)),
      isSignificant: isSig,
      winner: win,
      verdict: verd,
      recommendation: rec,
    });
  };

  const handleAbInputChange = (field, val) => {
    const updated = { ...abInputs, [field]: val };
    setAbInputs(updated);
    runLiveAbCalculation(updated);
  };

  // Chart configuration for Forecasting
  const chartData = {
    labels: forecastData.series.map(s => s.date),
    datasets: [
      {
        label: tx('ค่าพยากรณ์ยอดขาย (Forecast)', 'Predicted Sales'),
        data: forecastData.series.map(s => s.predicted),
        borderColor: '#fbbf24',
        backgroundColor: 'rgba(251, 191, 36, 0.15)',
        tension: 0.35,
        fill: false,
        borderWidth: 3,
        pointBackgroundColor: '#fbbf24',
        pointRadius: 4,
      },
      {
        label: tx('ขอบเขตบน 95% (Upper Bound)', '95% Upper CI'),
        data: forecastData.series.map(s => s.upper),
        borderColor: 'rgba(56, 189, 248, 0.4)',
        borderDash: [5, 5],
        borderWidth: 1.5,
        fill: false,
        pointRadius: 0,
      },
      {
        label: tx('ขอบเขตล่าง 95% (Lower Bound)', '95% Lower CI'),
        data: forecastData.series.map(s => s.lower),
        borderColor: 'rgba(244, 63, 94, 0.4)',
        borderDash: [5, 5],
        borderWidth: 1.5,
        fill: false,
        pointRadius: 0,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: '#cbd5e1', font: { family: 'inherit', size: 11, weight: 'bold' } },
      },
      tooltip: {
        callbacks: {
          label: (ctx) => ` ฿${Number(ctx.raw || 0).toLocaleString()}`,
        },
      },
    },
    scales: {
      x: {
        ticks: { color: '#94a3b8' },
        grid: { color: 'rgba(255,255,255,0.06)' },
      },
      y: {
        ticks: {
          color: '#94a3b8',
          callback: (v) => `฿${Number(v).toLocaleString()}`,
        },
        grid: { color: 'rgba(255,255,255,0.06)' },
      },
    },
  };

  return (
    <div className="flex flex-col gap-6 animate-fadeIn">
      {/* 1. Header Banner */}
      <div className="relative overflow-hidden rounded-2xl p-6 sm:p-7 border border-cyan-500/40 bg-gradient-to-br from-cyan-950/60 via-slate-900/95 to-[#030714] shadow-2xl backdrop-blur-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase bg-cyan-400/15 border border-cyan-400/30 text-cyan-300">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              <span>{tx('กลางน้ำ: การวิเคราะห์เชิงลึกและสถิติ (Advanced Analytics & Modeling)', 'Midstream: Advanced Analytics & Statistical Modeling')}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-cyan-500/15 border border-cyan-500/35 shadow-lg shadow-cyan-500/20 flex-shrink-0">
                <LuxuryModuleIcon type="insights" size={28} />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {tx('ระบบวิเคราะห์ทำนายอนาคต & ชี้นำกลยุทธ์ธุรกิจ', 'Predictive Intelligence & Prescriptive Business Modeling')}
              </h3>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              {tx(
                'ก้าวข้ามแดชบอร์ดที่บอกแค่ "อดีต" สู่โมเดลสถิติที่ตอบว่า "อนาคตจะเป็นอย่างไร" พยากรณ์ยอดขาย 30 วัน, คำนวณจุดสั่งซื้อสินค้าตามฤดูกาล, จัดกลุ่มลูกค้า RFM, วิเคราะห์ของที่ลูกค้ามักซื้อคู่กัน, และทดสอบสมมติฐาน A/B Test อย่างแม่นยำ',
                'Moves beyond descriptive historical charts to predictive and prescriptive modeling: Holt-Winters 30-day forecasting, Seasonal ROP, RFM Customer Clustering, Market Basket Association Rules, and Statistical A/B Testing.'
              )}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="px-4 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-xs">
              <span className="text-slate-400 block">{tx('ความเชื่อมั่นทางสถิติ', 'Confidence Level')}</span>
              <strong className="text-amber-300 text-sm font-black">95.0% - 99.0%</strong>
            </div>
          </div>
        </div>

        {/* 2. Sub-tab Navigation */}
        <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-white/10">
          <button
            type="button"
            onClick={() => setActiveModule('forecasting')}
            className={`px-4 py-2.5 rounded-xl font-black text-xs sm:text-sm flex items-center gap-2.5 transition-all ${
              activeModule === 'forecasting'
                ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 shadow-lg shadow-cyan-500/25'
                : 'text-slate-300 hover:text-white hover:bg-white/5 border border-white/5'
            }`}
          >
            <LuxuryModuleIcon type="overview" size={18} />
            <span>{tx('1. พยากรณ์ยอดขาย & จุดสั่งซื้อ ROP', '1. Sales Forecast & Seasonal ROP')}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveModule('rfm_basket')}
            className={`px-4 py-2.5 rounded-xl font-black text-xs sm:text-sm flex items-center gap-2.5 transition-all ${
              activeModule === 'rfm_basket'
                ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-lg shadow-amber-500/25'
                : 'text-slate-300 hover:text-white hover:bg-white/5 border border-white/5'
            }`}
          >
            <LuxuryModuleIcon type="customers" size={18} />
            <span>{tx('2. วิเคราะห์ RFM & จับคู่ตะกร้าสินค้า A+B', '2. RFM Clusters & Market Basket')}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveModule('ab_testing')}
            className={`px-4 py-2.5 rounded-xl font-black text-xs sm:text-sm flex items-center gap-2.5 transition-all ${
              activeModule === 'ab_testing'
                ? 'bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-950 shadow-lg shadow-emerald-500/25'
                : 'text-slate-300 hover:text-white hover:bg-white/5 border border-white/5'
            }`}
          >
            <LuxuryModuleIcon type="precision_target" size={18} />
            <span>{tx('3. ทดสอบสมมติฐาน A/B Testing (Z-Test)', '3. A/B Testing & Z-Test Statistics')}</span>
          </button>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* MODULE 1: FORECASTING & DYNAMIC REORDER POINT (ROP)                  */}
      {/* ==================================================================== */}
      {activeModule === 'forecasting' && (
        <div className="space-y-6 animate-fadeIn">
          {/* KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="glass-card rounded-xl p-4 border border-white/10 bg-slate-900/70">
              <span className="text-xs text-slate-400 font-bold flex items-center gap-1.5">
                <span>🔮</span>
                <span>{tx('คาดการณ์ยอดขาย 30 วันล่วงหน้า', 'Projected 30-Day Sales')}</span>
              </span>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-black text-white">
                  ฿{forecastData.totalProjectedRevenue.toLocaleString()}
                </span>
                <span className="text-xs font-black text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                  +{forecastData.growthRatePct}%
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                {tx('คำนวณจาก Holt-Winters Multiplicative Seasonality', 'Based on Holt-Winters seasonal model')}
              </p>
            </div>

            <div className="glass-card rounded-xl p-4 border border-white/10 bg-slate-900/70">
              <span className="text-xs text-slate-400 font-bold flex items-center gap-1.5">
                <DailyAverageDemandIcon size={18} className="flex-shrink-0" />
                <span>{tx('ยอดขายเฉลี่ยรายวัน (Baseline)', 'Daily Average Demand')}</span>
              </span>
              <div className="mt-2">
                <span className="text-2xl font-black text-cyan-300">
                  ฿{forecastData.dailyMean.toLocaleString()}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1">
                {tx('ศุกร์-อาทิตย์ มีดัชนียอดขายสูงกว่าวันธรรมดา 1.45x', 'Fri-Sun multiplier 1.45x vs weekdays')}
              </p>
            </div>

            <div className="glass-card rounded-xl p-4 border border-rose-500/30 bg-rose-950/20">
              <span className="text-xs text-rose-300 font-bold flex items-center gap-1.5">
                <span>🚨</span>
                <span>{tx('สินค้าถึงจุดสั่งซื้อด่วน (ROP Reorder Alert)', 'Urgent Reorder Items')}</span>
              </span>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-2xl font-black text-rose-400">
                  3 {tx('รายการ', 'SKUs')}
                </span>
                <span className="text-xs text-rose-300">
                  {tx('ของอาจขาดใน 3-5 วัน', 'Stockout in 3-5 days')}
                </span>
              </div>
              <p className="text-[11px] text-rose-300/80 mt-1">
                {tx('สต็อกเหลือน้อยกว่า Safety Stock + Lead Time Demand', 'Stock below Safety Stock + Lead Time Demand')}
              </p>
            </div>
          </div>

          {/* Forecasting Chart */}
          <div className="glass-card rounded-2xl p-5 border border-white/10 bg-slate-900/80 shadow-xl space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h4 className="text-base font-black text-white flex items-center gap-2">
                  <span>📈</span>
                  <span>{tx('กราฟพยากรณ์ยอดขาย 30 วัน พร้อมช่วงความเชื่อมั่น 95%', '30-Day Sales Forecast with 95% Confidence Intervals')}</span>
                </h4>
                <p className="text-xs text-slate-400">
                  {tx('เส้นประแสดงช่วงค่าเป็นไปได้สูงสุด-ต่ำสุด (Upper/Lower Bounds)', 'Dashed lines depict 95% confidence bounds')}
                </p>
              </div>
            </div>

            <div className="h-64 sm:h-72 w-full pt-2">
              <Line data={chartData} options={chartOptions} />
            </div>
          </div>

          {/* Dynamic Reorder Point (ROP) Table */}
          <div className="glass-card rounded-2xl p-5 border border-white/10 bg-slate-900/80 shadow-xl space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h4 className="text-base font-black text-white flex items-center gap-2">
                  <span>📦</span>
                  <span>{tx('สูตรคำนวณจุดสั่งซื้อสินค้าล่วงหน้าตามฤดูกาล (Dynamic ROP Table)', 'Seasonal Dynamic Reorder Point Table')}</span>
                </h4>
                <p className="text-xs text-slate-400 font-mono">
                  ROP = (Daily Demand × Lead Time) + Safety Stock [Z = 1.65 (95% Service Level)]
                </p>
              </div>
            </div>

            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400 font-black uppercase text-[10px] tracking-wider">
                    <th className="py-2.5 px-3">{tx('รหัส SKU / สินค้า', 'SKU / Product')}</th>
                    <th className="py-2.5 px-3">{tx('สต็อกปัจจุบัน', 'Current Stock')}</th>
                    <th className="py-2.5 px-3">{tx('ยอดใช้/วัน', 'Daily Demand')}</th>
                    <th className="py-2.5 px-3">{tx('รอส่ง (วัน)', 'Lead Time')}</th>
                    <th className="py-2.5 px-3">{tx('Safety Stock', 'Safety Stock')}</th>
                    <th className="py-2.5 px-3">{tx('จุดสั่งของ (ROP)', 'Reorder Point')}</th>
                    <th className="py-2.5 px-3">{tx('สถานะ', 'Status')}</th>
                    <th className="py-2.5 px-3">{tx('คำแนะนำ', 'Recommendation')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {ropItems.map((item) => (
                    <tr key={item.sku} className="hover:bg-white/5 transition-colors">
                      <td className="py-3 px-3">
                        <span className="font-mono font-bold text-amber-300 block">{item.sku}</span>
                        <strong className="text-white text-xs">{item.name}</strong>
                      </td>
                      <td className="py-3 px-3 font-bold text-white text-sm">
                        {item.currentStock} {item.unit}
                      </td>
                      <td className="py-3 px-3 text-slate-300">
                        {item.dailyDemand} {item.unit}/วัน
                      </td>
                      <td className="py-3 px-3 text-slate-300 font-mono">
                        {item.leadTime} วัน
                      </td>
                      <td className="py-3 px-3 text-slate-300 font-mono font-bold">
                        +{item.safetyStock} {item.unit}
                      </td>
                      <td className="py-3 px-3 font-mono font-black text-rose-400 text-sm">
                        ≤ {item.rop} {item.unit}
                      </td>
                      <td className="py-3 px-3">
                        {item.status === 'URGENT' ? (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse">
                            🚨 {tx('ต้องสั่งด่วน!', 'Order Now!')}
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                            ✅ {tx('สต็อกพอดี', 'Healthy')}
                          </span>
                        )}
                      </td>
                      <td className="py-3 px-3">
                        {item.suggestedQty > 0 ? (
                          <button
                            type="button"
                            onClick={() => toast.success(tx(`🛒 สร้างใบสั่งซื้อ ${item.sku} จำนวน ${item.suggestedQty} ${item.unit} เรียบร้อย!`, `🛒 Generated PO for ${item.suggestedQty} ${item.unit}!`))}
                            className="px-2.5 py-1 rounded-lg bg-amber-400 text-slate-950 font-black text-[11px] hover:brightness-110 active:scale-95 shadow"
                          >
                            {tx(`สั่งเพิ่ม +${item.suggestedQty} ${item.unit}`, `Order +${item.suggestedQty} ${item.unit}`)}
                          </button>
                        ) : (
                          <span className="text-slate-400 text-[11px]">{tx('ยังไม่ต้องสั่งเพิ่ม', 'No order needed')}</span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* MODULE 2: RFM SEGMENTATION & MARKET BASKET CLUSTERING                */}
      {/* ==================================================================== */}
      {activeModule === 'rfm_basket' && (
        <div className="space-y-6 animate-fadeIn">
          {/* RFM Header */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h4 className="text-lg font-black text-white flex items-center gap-2">
                <span>👥</span>
                <span>{tx('การแบ่งกลุ่มลูกค้าตามหลัก RFM (Recency, Frequency, Monetary)', 'RFM Customer Segmentation Matrix')}</span>
              </h4>
              <p className="text-xs text-slate-300">
                {tx('แยกกลุ่มลูกค้าขาประจำกับลูกค้าที่เสี่ยงหาย (Churn Risk) เพื่อส่งโปรโมชันดึงกลับได้ถูกคน', 'Identify VIPs vs Churn-risk customers to trigger personalized win-back offers')}
              </p>
            </div>
            <div className="px-3.5 py-1.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-bold">
              {tx('รายได้ที่เสี่ยงหลุดลอย (At-Risk Revenue): ฿1,139,200', 'Revenue at Risk: ฿1,139,200')}
            </div>
          </div>

          {/* RFM Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {rfmSegments.map((seg) => (
              <div
                key={seg.id}
                className={`glass-card rounded-2xl p-4.5 border bg-gradient-to-br flex flex-col justify-between gap-3 shadow-xl ${seg.color}`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <h5 className="font-black text-sm text-white">{seg.name}</h5>
                    <span className="font-mono text-[10px] font-black px-2 py-0.5 rounded bg-black/40 border border-white/10">
                      {seg.rfm}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-white/10">
                    <div>
                      <span className="text-[10px] text-slate-400 block">{tx('จำนวนลูกค้า', 'Customers')}</span>
                      <strong className="text-base font-black text-white">{seg.count} ท่าน ({seg.share})</strong>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block">{tx('ยอดซื้อรวม', 'Total Spend')}</span>
                      <strong className="text-base font-black text-amber-300">{seg.revenue}</strong>
                    </div>
                  </div>

                  <div className="mt-2.5 bg-black/30 p-2.5 rounded-xl border border-white/5">
                    <span className="text-[10px] text-slate-400 block mb-0.5">{tx('ความเสี่ยง Churn:', 'Churn Risk:')} <strong className="text-white">{seg.churnRisk}</strong></span>
                    <p className="text-[11px] text-slate-200 leading-snug">{seg.action}</p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => toast.success(tx(`📲 ส่งแคมเปญอัตโนมัติถึง ${seg.count} ท่านทาง LINE OA สำเร็จ!`, `📲 Triggered automated campaign to ${seg.count} customers via LINE!`))}
                  className="w-full py-2 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>🚀</span>
                  <span>{tx('สั่งรันแคมเปญกระตุ้นกลุ่มนี้', 'Execute Segment Campaign')}</span>
                </button>
              </div>
            ))}
          </div>

          {/* Market Basket Analysis Section */}
          <div className="glass-card rounded-2xl p-5 border border-white/10 bg-slate-900/80 shadow-xl space-y-4 mt-8">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h4 className="text-base font-black text-white flex items-center gap-2">
                  <span>🛒</span>
                  <span>{tx('วิเคราะห์ตะกร้าสินค้า (Market Basket Analysis & Association Rules)', 'Market Basket Analysis & Association Rules')}</span>
                </h4>
                <p className="text-xs text-slate-400 font-mono">
                  {tx('วิเคราะห์ว่าลูกค้าที่ซื้อสินค้า A มักจะซื้อสินค้า B คู่กัน เพื่อจัดโปรโมชันจับคู่ (Lift > 1.50)', 'Identify high-lift pairs (A ➔ B) to launch smart bundle promotions')}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {marketBasketRules.map((rule, idx) => (
                <div
                  key={idx}
                  className="bg-slate-950/70 border border-white/10 rounded-xl p-4 flex flex-col justify-between gap-3 shadow-lg hover:border-amber-400/40 transition-all"
                >
                  <div>
                    <span className="text-[10px] font-black text-amber-300 px-2 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/20 inline-block mb-2">
                      {rule.badge}
                    </span>

                    <div className="flex items-center gap-2 text-sm font-black text-white">
                      <span>{rule.itemA}</span>
                      <span className="text-amber-400">➔</span>
                      <span>{rule.itemB}</span>
                    </div>

                    <div className="grid grid-cols-3 gap-1.5 mt-3 pt-3 border-t border-white/10 text-center font-mono text-[11px]">
                      <div className="bg-slate-900/80 p-1.5 rounded">
                        <span className="text-[10px] text-slate-400 block">Support</span>
                        <strong className="text-slate-200">{rule.support}</strong>
                      </div>
                      <div className="bg-slate-900/80 p-1.5 rounded">
                        <span className="text-[10px] text-slate-400 block">Confidence</span>
                        <strong className="text-cyan-300">{rule.confidence}</strong>
                      </div>
                      <div className="bg-slate-900/80 p-1.5 rounded">
                        <span className="text-[10px] text-slate-400 block">Lift Factor</span>
                        <strong className="text-amber-400 font-black">{rule.lift}x</strong>
                      </div>
                    </div>

                    <div className="mt-2.5 bg-emerald-500/10 border border-emerald-500/20 p-2.5 rounded-lg text-emerald-300 text-xs">
                      <strong>💡 {tx('ไอเดียโปรโมชัน:', 'Bundle Idea:')}</strong>
                      <p className="mt-0.5 text-slate-200 text-[11px]">{rule.promo}</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => toast.success(tx(`✨ นำชุดโปรโมชัน ${rule.itemA} + ${rule.itemB} ขึ้นระบบ POS เรียบร้อย!`, `✨ Deployed bundle promo to POS system!`))}
                    className="w-full py-1.5 rounded-lg bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-xs hover:brightness-110 active:scale-95 shadow"
                  >
                    {tx('✨ ตั้งเป็นโปรโมชันหน้าร้านทันที', 'Launch Bundle Promo on POS')}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* MODULE 3: A/B TESTING STATISTICAL SIGNIFICANCE CALCULATOR            */}
      {/* ==================================================================== */}
      {activeModule === 'ab_testing' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Header */}
          <div>
            <h4 className="text-lg font-black text-white flex items-center gap-2">
              <span>🧪</span>
              <span>{tx('เครื่องมือทดสอบสมมติฐานทางสถิติ (A/B Testing Statistical Significance)', 'A/B Testing Statistical Significance Calculator')}</span>
            </h4>
            <p className="text-xs text-slate-300">
              {tx('คำนวณ Two-Proportion Z-Test เพื่อพิสูจน์ว่าแคมเปญไหนชนะจริงทางสถิติ (p < 0.05) ไม่ใช่แค่ความบังเอิญ', 'Validates whether conversion differences are statistically significant (p < 0.05) using standard Two-Proportion Z-Test')}
            </p>
          </div>

          {/* Interactive Calculator Inputs */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Campaign A (Control) */}
            <div className="glass-card rounded-2xl p-5 border border-sky-500/30 bg-sky-950/20 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-sky-300 tracking-wider">
                  {tx('กลุ่มทดสอบ A (Control)', 'Sample A (Control)')}
                </span>
                <span className="text-sm font-black text-sky-400 font-mono">
                  {abResult.rateA}% CVR
                </span>
              </div>

              <div>
                <label className="text-xs text-slate-300 font-bold block mb-1">
                  {tx('ชื่อแคมเปญ A', 'Campaign A Name')}
                </label>
                <input
                  type="text"
                  value={abInputs.nameA}
                  onChange={(e) => handleAbInputChange('nameA', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-bold focus:border-sky-400 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-300 font-bold block mb-1">
                    {tx('ผู้เข้าชม (Visitors)', 'Visitors (n)')}
                  </label>
                  <input
                    type="number"
                    value={abInputs.visitorsA}
                    onChange={(e) => handleAbInputChange('visitorsA', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-mono font-bold focus:border-sky-400 outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-300 font-bold block mb-1">
                    {tx('ยอดสั่งซื้อ (Conversions)', 'Conversions (x)')}
                  </label>
                  <input
                    type="number"
                    value={abInputs.conversionsA}
                    onChange={(e) => handleAbInputChange('conversionsA', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-mono font-bold focus:border-sky-400 outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Campaign B (Variation) */}
            <div className="glass-card rounded-2xl p-5 border border-emerald-500/30 bg-emerald-950/20 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase text-emerald-300 tracking-wider">
                  {tx('กลุ่มทดสอบ B (Variation)', 'Sample B (Variation)')}
                </span>
                <span className="text-sm font-black text-emerald-400 font-mono">
                  {abResult.rateB}% CVR
                </span>
              </div>

              <div>
                <label className="text-xs text-slate-300 font-bold block mb-1">
                  {tx('ชื่อแคมเปญ B', 'Campaign B Name')}
                </label>
                <input
                  type="text"
                  value={abInputs.nameB}
                  onChange={(e) => handleAbInputChange('nameB', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-bold focus:border-emerald-400 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-slate-300 font-bold block mb-1">
                    {tx('ผู้เข้าชม (Visitors)', 'Visitors (n)')}
                  </label>
                  <input
                    type="number"
                    value={abInputs.visitorsB}
                    onChange={(e) => handleAbInputChange('visitorsB', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-mono font-bold focus:border-emerald-400 outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-slate-300 font-bold block mb-1">
                    {tx('ยอดสั่งซื้อ (Conversions)', 'Conversions (x)')}
                  </label>
                  <input
                    type="number"
                    value={abInputs.conversionsB}
                    onChange={(e) => handleAbInputChange('conversionsB', e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-white text-xs font-mono font-bold focus:border-emerald-400 outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Statistical Verdict & Decision Box */}
          <div className="glass-card rounded-2xl p-6 border border-amber-400/40 bg-gradient-to-br from-amber-500/10 via-slate-900/90 to-slate-950 shadow-2xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-black uppercase text-amber-300 tracking-wider bg-amber-400/20 px-2.5 py-0.5 rounded-full border border-amber-400/30">
                  {tx('ผลการพิสูจน์ทางสถิติ (Statistical Decision)', 'Statistical Inference Decision')}
                </span>
                <h4 className="text-lg font-black text-white mt-1.5">{abResult.verdict}</h4>
                <p className="text-xs text-slate-300 mt-1">{abResult.recommendation}</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="px-3.5 py-2 rounded-xl bg-slate-950/80 border border-white/10 text-center">
                  <span className="text-[10px] text-slate-400 block">Relative Lift</span>
                  <strong className={`text-base font-black font-mono ${abResult.lift >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {abResult.lift >= 0 ? `+${abResult.lift}%` : `${abResult.lift}%`}
                  </strong>
                </div>

                <div className="px-3.5 py-2 rounded-xl bg-slate-950/80 border border-white/10 text-center">
                  <span className="text-[10px] text-slate-400 block">Confidence</span>
                  <strong className="text-base font-black text-amber-300 font-mono">
                    {abResult.confidence}%
                  </strong>
                </div>
              </div>
            </div>

            {/* Deep Math Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-4 border-t border-white/10 text-xs font-mono">
              <div className="bg-slate-950/60 p-2.5 rounded-lg border border-white/5">
                <span className="text-[10px] text-slate-400 block">Z-Score</span>
                <strong className="text-white text-sm">{abResult.zScore}</strong>
              </div>
              <div className="bg-slate-950/60 p-2.5 rounded-lg border border-white/5">
                <span className="text-[10px] text-slate-400 block">P-Value (Two-Tailed)</span>
                <strong className={`text-sm ${abResult.pValue < 0.05 ? 'text-emerald-400' : 'text-slate-200'}`}>
                  {abResult.pValue}
                </strong>
              </div>
              <div className="bg-slate-950/60 p-2.5 rounded-lg border border-white/5">
                <span className="text-[10px] text-slate-400 block">Alpha Threshold</span>
                <strong className="text-white text-sm">α = 0.05</strong>
              </div>
              <div className="bg-slate-950/60 p-2.5 rounded-lg border border-white/5">
                <span className="text-[10px] text-slate-400 block">Statistically Significant</span>
                <strong className={`text-sm ${abResult.isSignificant ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {abResult.isSignificant ? 'TRUE (p < 0.05)' : 'FALSE'}
                </strong>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

