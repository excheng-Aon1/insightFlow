import React, { useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { LuxuryIconBadge, MarketPositionRadarIcon } from './LuxuryIcons';

export function IndustryBenchmarkAndGoalDecomposition({
  lang = 'th',
  currentRevenueVal = 0,
  targetRevenueVal = 0,
  targetTimelineVal = '30',
  theme = 'dark',
  setActiveTab
}) {
  const isEn = lang === 'en';
  const tx = (th, en) => (isEn ? en : th);

  // Active Sub-Tab: 'all' | 'benchmark' | 'decomposition'
  const [activeSubView, setActiveSubView] = useState('all');

  // =========================================================================
  // 1. ANONYMOUS INDUSTRY BENCHMARKING STATE & DATA
  // =========================================================================
  const [selectedIndustry, setSelectedIndustry] = useState('beauty_skincare');

  const industryBenchmarks = {
    beauty_skincare: {
      nameTh: 'สกินแคร์ คลินิก & ผลิตภัณฑ์ดูแลผิว',
      nameEn: 'Skincare, Cosmetics & Aesthetic Clinics',
      peerCount: 248,
      pillars: [
        {
          id: 'gross_margin',
          labelTh: 'อัตรากำไรขั้นต้น (Gross Margin %)',
          labelEn: 'Gross Margin Rate (%)',
          yourValue: 22.0,
          benchmarkValue: 31.5,
          unit: '%',
          diff: -9.5,
          status: 'below',
          suggestionTh: 'กำไรขั้นต้นต่ำกว่าตลาด 9.5% เนื่องจากต้นทุนซื้อปลีกสูง แนะนำรวมศูนย์ใบสั่งซื้อกลาง (Central PO) หรือปรับเซ็ตราคา',
          suggestionEn: '9.5% below peers due to fragmented purchasing. Consolidate into Central PO to recover bulk tiers.'
        },
        {
          id: 'basket_size',
          labelTh: 'ยอดซื้อเฉลี่ยต่อบิล (Average Basket Size)',
          labelEn: 'Average Order Value (AOV)',
          yourValue: 850,
          benchmarkValue: 1250,
          unit: '฿',
          diff: -400,
          status: 'below',
          suggestionTh: 'ลูกค้ามักซื้อชิ้นเดียว แนะนำใช้กลยุทธ์จับคู่เซรั่ม + ครีมกันแดด ลด 10% ดันยอดต่อบิลสู่ ฿1,250',
          suggestionEn: 'High single-item checkout rate. Implement A+B combo promotion at checkout to close gap.'
        },
        {
          id: 'retention_rate',
          labelTh: 'อัตราลูกค้าซื้อซ้ำ (Repeat Purchase Rate)',
          labelEn: 'Repeat Customer Retention Rate',
          yourValue: 28.0,
          benchmarkValue: 38.0,
          unit: '%',
          diff: -10.0,
          status: 'below',
          suggestionTh: 'ต่ำกว่าตลาด 10% แนะนำตั้งระบบสะสมแต้มสมาชิกและส่งคูปองเตือนซื้อซ้ำทุก 45 วัน',
          suggestionEn: '10% below peer retention. Deploy VIP point loyalty and 45-day replenishment triggers.'
        },
        {
          id: 'turnover',
          labelTh: 'รอบหมุนเวียนสต็อก (Inventory Turnover)',
          labelEn: 'Annual Inventory Turnover',
          yourValue: 4.2,
          benchmarkValue: 6.5,
          unit: ' รอบ/ปี',
          diff: -2.3,
          status: 'below',
          suggestionTh: 'สินค้าค้างสต็อกนานกว่าตลาด แนะนำทำ Flash Sale ระบาย Dead Stock เพื่อดึงเงินสดกลับคืนคลัง',
          suggestionEn: 'Slower inventory rotation. Execute 24-hr Flash Sale clearance to unlock tied-up cash.'
        }
      ]
    },
    fnb_cafe: {
      nameTh: 'ร้านอาหาร คาเฟ่ & เครื่องดื่ม',
      nameEn: 'Restaurants, Cafes & Specialty Beverages',
      peerCount: 312,
      pillars: [
        {
          id: 'gross_margin',
          labelTh: 'อัตรากำไรขั้นต้น (Gross Margin %)',
          labelEn: 'Gross Margin Rate (%)',
          yourValue: 58.0,
          benchmarkValue: 65.0,
          unit: '%',
          diff: -7.0,
          status: 'below',
          suggestionTh: 'Food Cost สูงกว่าเกณฑ์เฉลี่ย แนะนำตรวจนับของเสียหลังร้านและเจรจาวัตถุดิบรายใหญ่',
          suggestionEn: 'Food cost is slightly elevated. Audit kitchen waste logs and renegotiate dairy/bean suppliers.'
        },
        {
          id: 'basket_size',
          labelTh: 'ยอดซื้อเฉลี่ยต่อบิล (Average Basket Size)',
          labelEn: 'Average Order Value (AOV)',
          yourValue: 145,
          benchmarkValue: 220,
          unit: '฿',
          diff: -75,
          status: 'below',
          suggestionTh: 'แนะนำจับคู่เครื่องดื่ม + เบเกอรี่ ลด ฿20 เพื่อกระตุ้นให้ลูกค้าสั่ง 2 เมนูต่อบิล',
          suggestionEn: 'Introduce drink + pastry combo discount (฿20 off) to expand beverage-only receipts.'
        },
        {
          id: 'retention_rate',
          labelTh: 'อัตราลูกค้าซื้อซ้ำ (Repeat Purchase Rate)',
          labelEn: 'Repeat Customer Retention Rate',
          yourValue: 42.0,
          benchmarkValue: 45.0,
          unit: '%',
          diff: -3.0,
          status: 'near',
          suggestionTh: 'ใกล้เคียงค่าเฉลี่ยตลาด แนะนำเพิ่มสะสมแสตมป์ดิจิทัลผ่าน LINE OA ทุก 10 แก้วฟรี 1 แก้ว',
          suggestionEn: 'On par with market. Deploy 10-stamp digital rewards on LINE OA to cement loyalty.'
        },
        {
          id: 'turnover',
          labelTh: 'รอบหมุนเวียนสต็อก (Inventory Turnover)',
          labelEn: 'Annual Inventory Turnover',
          yourValue: 18.5,
          benchmarkValue: 22.0,
          unit: ' รอบ/ปี',
          diff: -3.5,
          status: 'below',
          suggestionTh: 'วัตถุดิบบางตัวสต็อกเกินความจำเป็น แนะนำสั่งวัตถุดิบสดแบบ Just-in-Time ทุก 3 วัน',
          suggestionEn: 'Excess dry storage stock. Switch to 3-day just-in-time fresh delivery schedules.'
        }
      ]
    },
    fashion_apparel: {
      nameTh: 'แฟชั่น เสื้อผ้า & เครื่องประดับ',
      nameEn: 'Fashion, Apparel & Luxury Accessories',
      peerCount: 185,
      pillars: [
        {
          id: 'gross_margin',
          labelTh: 'อัตรากำไรขั้นต้น (Gross Margin %)',
          labelEn: 'Gross Margin Rate (%)',
          yourValue: 44.0,
          benchmarkValue: 52.0,
          unit: '%',
          diff: -8.0,
          status: 'below',
          suggestionTh: 'ต้นทุนตัดเย็บและการขนส่งสูง แนะนำออกแบบคอลเลกชันที่ใช้วัตถุดิบร่วมกัน',
          suggestionEn: 'Production & freight overhead are high. Standardize fabric utilization across lines.'
        },
        {
          id: 'basket_size',
          labelTh: 'ยอดซื้อเฉลี่ยต่อบิล (Average Basket Size)',
          labelEn: 'Average Order Value (AOV)',
          yourValue: 980,
          benchmarkValue: 1450,
          unit: '฿',
          diff: -470,
          status: 'below',
          suggestionTh: 'แนะนำจับคู่ เสื้อ + เครื่องประดับ หรือโปรซื้อ 2 ชิ้นลด 15%',
          suggestionEn: 'Pair tops with accessories or implement Buy 2 Get 15% Off bundles.'
        },
        {
          id: 'retention_rate',
          labelTh: 'อัตราลูกค้าซื้อซ้ำ (Repeat Purchase Rate)',
          labelEn: 'Repeat Customer Retention Rate',
          yourValue: 22.0,
          benchmarkValue: 31.0,
          unit: '%',
          diff: -9.0,
          status: 'below',
          suggestionTh: 'แนะนำส่ง Lookbook คอลเลกชันใหม่ล่วงหน้าให้สมาชิกระดับ VIP ก่อนเปิดตัว 3 วัน',
          suggestionEn: 'Send 3-day VIP early-access Lookbooks to high-LTV member list.'
        },
        {
          id: 'turnover',
          labelTh: 'รอบหมุนเวียนสต็อก (Inventory Turnover)',
          labelEn: 'Annual Inventory Turnover',
          yourValue: 3.5,
          benchmarkValue: 5.2,
          unit: ' รอบ/ปี',
          diff: -1.7,
          status: 'below',
          suggestionTh: 'เสื้อผ้าตกรุ่นค้างสต็อกนาน แนะนำทำแคมเปญ Mid-Season Clearance ทันที',
          suggestionEn: 'Off-season stock stagnation. Launch mid-season clearance event immediately.'
        }
      ]
    },
    retail_general: {
      nameTh: 'ค้าปลีกทั่วไป & ของใช้ในชีวิตประจำวัน',
      nameEn: 'General Retail & Daily Consumables',
      peerCount: 290,
      pillars: [
        {
          id: 'gross_margin',
          labelTh: 'อัตรากำไรขั้นต้น (Gross Margin %)',
          labelEn: 'Gross Margin Rate (%)',
          yourValue: 24.5,
          benchmarkValue: 28.0,
          unit: '%',
          diff: -3.5,
          status: 'near',
          suggestionTh: 'ใกล้เคียงตลาด แนะนำเจรจาส่วนลด Volume กับซัพพลายเออร์เจ้าหลักเพื่อขยับแตะ 28%',
          suggestionEn: 'Competitive. Negotiate annual tier rebates with primary distributor to hit 28%.'
        },
        {
          id: 'basket_size',
          labelTh: 'ยอดซื้อเฉลี่ยต่อบิล (Average Basket Size)',
          labelEn: 'Average Order Value (AOV)',
          yourValue: 320,
          benchmarkValue: 460,
          unit: '฿',
          diff: -140,
          status: 'below',
          suggestionTh: 'จัดวางสินค้าราคาไม่แพง (Impulse Buy) บริเวณหน้าเครื่องคิดเงิน',
          suggestionEn: 'Place impulse checkout accessories and grab-and-go treats near the register.'
        },
        {
          id: 'retention_rate',
          labelTh: 'อัตราลูกค้าซื้อซ้ำ (Repeat Purchase Rate)',
          labelEn: 'Repeat Customer Retention Rate',
          yourValue: 35.0,
          benchmarkValue: 44.0,
          unit: '%',
          diff: -9.0,
          status: 'below',
          suggestionTh: 'เปิดระบบผูกเบอร์โทรศัพท์สะสมแต้มทุก ฿50 ได้ 1 คะแนน แลกส่วนลดเงินสด',
          suggestionEn: 'Offer 1 point per ฿50 via phone number lookup for instant cash discounts.'
        },
        {
          id: 'turnover',
          labelTh: 'รอบหมุนเวียนสต็อก (Inventory Turnover)',
          labelEn: 'Annual Inventory Turnover',
          yourValue: 5.1,
          benchmarkValue: 7.8,
          unit: ' รอบ/ปี',
          diff: -2.7,
          status: 'below',
          suggestionTh: 'ตัดลด SKU ที่ไม่มียอดขายเกิน 45 วัน แล้วนำพื้นที่วางสินค้าหมวดขายดีแทน',
          suggestionEn: 'Delist dormant SKUs inactive for 45+ days and reallocate shelf space to top movers.'
        }
      ]
    }
  };

  const activeBenchmark = industryBenchmarks[selectedIndustry] || industryBenchmarks.beauty_skincare;

  const handleExportBenchmark = () => {
    const content = isEn
      ? [
          'INSIGHTFLOW ANONYMOUS INDUSTRY BENCHMARKING REPORT',
          `Industry: ${activeBenchmark.nameEn} (Sample: ${activeBenchmark.peerCount} Anonymous Stores)`,
          `Date: ${new Date().toLocaleDateString('en-US')}`,
          '--------------------------------------------------',
          ...activeBenchmark.pillars.map(
            p =>
              `${p.labelEn}: Your Store = ${p.yourValue}${p.unit} | Industry Benchmark = ${p.benchmarkValue}${p.unit} (${p.diff >= 0 ? '+' : ''}${p.diff}${p.unit})\n• Suggestion: ${p.suggestionEn}`
          ),
          '--------------------------------------------------',
          'OVERALL BENCHMARK POSITION: Top 42% of Industry Segment'
        ].join('\n')
      : [
          'รายงานการเปรียบเทียบมาตรฐานตลาดแบบไม่ระบุตัวตน (INSIGHTFLOW ANONYMOUS BENCHMARK REPORT)',
          `กลุ่มธุรกิจ: ${activeBenchmark.nameTh} (วิเคราะห์จากร้านค้าในระบบ ${activeBenchmark.peerCount} ร้าน)`,
          `วันที่ประมวลผล: ${new Date().toLocaleDateString('th-TH')}`,
          '--------------------------------------------------',
          ...activeBenchmark.pillars.map(
            p =>
              `${p.labelTh}: ร้านของคุณ = ${p.yourValue}${p.unit} | ค่าเฉลี่ยตลาด = ${p.benchmarkValue}${p.unit} (${p.diff >= 0 ? '+' : ''}${p.diff}${p.unit})\n• คำแนะนำ AI: ${p.suggestionTh}`
          ),
          '--------------------------------------------------',
          'อันดับประสิทธิภาพโดยรวม: ร้านของคุณอยู่ในกลุ่ม Top 42% ของตลาดในระบบ'
        ].join('\n');

    const blob = new Blob(['\uFEFF' + content], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = isEn ? 'Industry_Benchmark_Report.txt' : 'รายงานเปรียบเทียบมาตรฐานตลาด.txt';
    link.click();
    URL.revokeObjectURL(url);
    toast.success(
      tx(
        '📥 ดาวน์โหลดรายงานการเปรียบเทียบมาตรฐานตลาดเรียบร้อยแล้ว!',
        '📥 Downloaded Industry Benchmark Report!'
      )
    );
  };

  // =========================================================================
  // 2. GOAL DECOMPOSITION (ซอยเป้าหมายใหญ่ให้เป็นรายวัน)
  // =========================================================================
  // Simulation Inputs
  const [basketSizeInput, setBasketSizeInput] = useState(currentRevenueVal > 0 ? 850 : 0);
  const [todayAchievedBills, setTodayAchievedBills] = useState(currentRevenueVal > 0 ? 14 : 0);
  const [todayAchievedSales, setTodayAchievedSales] = useState(currentRevenueVal > 0 ? 12500 : 0);
  const [isPosPinned, setIsPosPinned] = useState(false);

  useEffect(() => {
    if (currentRevenueVal === 0) {
      setBasketSizeInput(0);
      setTodayAchievedBills(0);
      setTodayAchievedSales(0);
    }
  }, [currentRevenueVal]);

  // Calculations
  const revenueTarget = targetRevenueVal || 0;
  const revenueCurrent = currentRevenueVal || 0;
  const remainingGap = Math.max(0, revenueTarget - revenueCurrent);
  const totalDays = Math.max(1, parseInt(targetTimelineVal, 10) || 30);
  const remainingDays = Math.max(1, Math.round(totalDays * 0.6)); // e.g. 18 days left in 30-day target

  const dailyTargetRevenue = remainingDays > 0 ? Math.round(remainingGap / remainingDays) : 0;
  const currentBasket = Math.max(0, basketSizeInput || 0);

  // Daily Required Bills
  const requiredBillsPerDay = currentBasket > 0 && dailyTargetRevenue > 0 ? Math.ceil(dailyTargetRevenue / currentBasket) : 0;

  // Boosted Basket Scenario (e.g. +350 THB from combo bundle)
  const boostedBasket = currentBasket > 0 ? currentBasket + 350 : 0;
  const requiredBillsBoosted = boostedBasket > 0 && dailyTargetRevenue > 0 ? Math.ceil(dailyTargetRevenue / boostedBasket) : 0;
  const billsSaved = Math.max(0, requiredBillsPerDay - requiredBillsBoosted);

  // Today's Progress
  const todayRemainingBills = Math.max(0, requiredBillsPerDay - todayAchievedBills);
  const todayRemainingSales = Math.max(0, dailyTargetRevenue - todayAchievedSales);
  const todayProgressPct = dailyTargetRevenue > 0 ? Math.min(100, Math.round((todayAchievedSales / dailyTargetRevenue) * 100)) : 0;

  const handleCopyDailyBriefing = () => {
    const text = isEn
      ? `🎯 [DAILY SALES MISSION - ${new Date().toLocaleDateString('en-US')}]\n• Daily Target: ฿${dailyTargetRevenue.toLocaleString()}\n• Required Receipts Today: ${requiredBillsPerDay} bills (Avg ฿${currentBasket}/bill)\n• Status Right Now: Closed ${todayAchievedBills} bills (฿${todayAchievedSales.toLocaleString()})\n• Remaining Today: Need ${todayRemainingBills} more bills (฿${todayRemainingSales.toLocaleString()})!\n💡 Pro-Tip: Upsell +฿350 per bill to cut required bills from ${requiredBillsPerDay} down to ${requiredBillsBoosted} bills!`
      : `🎯 [ภารกิจยอดขายประจำวัน - ${new Date().toLocaleDateString('th-TH')}]\n• เป้าหมายยอดขายวันนี้: ฿${dailyTargetRevenue.toLocaleString()}\n• จำนวนบิลที่ต้องปิดวันนี้: ${requiredBillsPerDay} บิล (เฉลี่ยบิลละ ฿${currentBasket})\n• สถานะปัจจุบัน: ทำได้แล้ว ${todayAchievedBills} บิล (฿${todayAchievedSales.toLocaleString()})\n• ยอดที่ยังขาดวันนี้: ขาดอีก ${todayRemainingBills} บิล (฿${todayRemainingSales.toLocaleString()})!\n💡 เคล็ดลับ AI: ช่วยเชียร์ขายเพิ่มบิลละ ฿350 จะเหนื่อยน้อยลง เหลือปิดแค่ ${requiredBillsBoosted} บิลเท่านั้น สู้ๆ ครับทีมงาน!`;

    navigator.clipboard.writeText(text);
    toast.success(
      tx(
        '📲 คัดลอกสรุปภารกิจประจำวันสำหรับส่งเข้า LINE กลุ่มทีมขายเรียบร้อยแล้ว!',
        '📲 Copied Daily Sales Mission briefing for Staff LINE group!'
      )
    );
  };

  const handlePinMissionToPos = () => {
    setIsPosPinned(true);
    toast.success(
      tx(
        `🎯 ปักหมุดภารกิจ "วันนี้ต้องปิด ${requiredBillsPerDay} บิล (฿${dailyTargetRevenue.toLocaleString()})" บนหน้าจอแคชเชียร์ POS เรียบร้อยแล้ว!`,
        `🎯 Pinned daily target (${requiredBillsPerDay} bills / ฿${dailyTargetRevenue.toLocaleString()}) to POS display!`
      )
    );
  };

  return (
    <div className="glass-card" style={{ padding: '1.5rem', borderRadius: '22px', border: '1.5px solid rgba(251, 191, 36, 0.45)' }}>
      {/* Header Banner */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <LuxuryIconBadge variant="gold" size="lg" active>
            <MarketPositionRadarIcon size={28} />
          </LuxuryIconBadge>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
              <span
                style={{
                  display: 'inline-block',
                  padding: '0.2rem 0.65rem',
                  borderRadius: '999px',
                  background: 'rgba(251, 191, 36, 0.2)',
                  color: '#fbbf24',
                  fontWeight: 900,
                  fontSize: '0.74rem'
                }}
              >
                {tx('🏆 การเปรียบเทียบมาตรฐานตลาด & ซอยเป้าหมายรายวัน', 'INDUSTRY BENCHMARKING & DAILY GOAL DECOMPOSITION')}
              </span>
              <span style={{ fontSize: '0.74rem', color: '#34d399', fontWeight: 800 }}>
                ● {tx('วัดผลเทียบตลาด & สร้างพลังขับเคลื่อนหน้าร้าน', 'Benchmark Against Peers & Drive Daily Shift Teams')}
              </span>
            </div>
            <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 900, color: '#f8fafc' }}>
              {tx(
                'ร้านคุณอยู่จุดไหนของตลาด? พร้อมซอยเป้าหมายใหญ่ให้ทีมหน้าร้านรู้ว่า "วันนี้ต้องขายกี่บิล"',
                'Where Do You Stand in the Market? Plus Daily Goal Breakdown for Store Crews'
              )}
            </h3>
          </div>
        </div>

        {/* View Toggle Tabs */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
          {[
            { id: 'all', th: 'ดูทั้ง 2 ระบบ', en: 'All 2 Views' },
            { id: 'benchmark', th: '🏢 1. เปรียบเทียบมาตรฐานตลาด', en: '🏢 1. Anonymous Benchmark' },
            { id: 'decomposition', th: '🎯 2. ซอยเป้าหมายบิลรายวัน', en: '🎯 2. Daily Goal Bills' }
          ].map(tab => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveSubView(tab.id)}
              style={{
                padding: '0.45rem 0.85rem',
                borderRadius: '10px',
                border: activeSubView === tab.id ? '1px solid #fbbf24' : '1px solid rgba(148, 163, 184, 0.2)',
                background: activeSubView === tab.id ? 'rgba(251, 191, 36, 0.2)' : 'rgba(15, 23, 42, 0.6)',
                color: activeSubView === tab.id ? '#fbbf24' : '#cbd5e1',
                fontWeight: 800,
                fontSize: '0.78rem',
                cursor: 'pointer'
              }}
            >
              {isEn ? tab.en : tab.th}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of 2 Main Modules */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.25rem' }}>
        {/* ========================================================================= */}
        {/* 1. ANONYMOUS INDUSTRY BENCHMARKING PANEL */}
        {/* ========================================================================= */}
        {(activeSubView === 'all' || activeSubView === 'benchmark') && (
          <div
            className="glass-card"
            style={{
              padding: '1.35rem',
              borderRadius: '18px',
              border: '1.5px solid rgba(168, 85, 247, 0.45)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '1rem',
              background: 'linear-gradient(145deg, rgba(168, 85, 247, 0.08) 0%, rgba(15, 23, 42, 0.95) 100%)'
            }}
          >
            <div>
              {/* Badge & Industry Peer Selector */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <span
                  style={{
                    padding: '0.22rem 0.65rem',
                    borderRadius: '999px',
                    background: 'rgba(168, 85, 247, 0.22)',
                    color: '#c084fc',
                    fontWeight: 900,
                    fontSize: '0.74rem'
                  }}
                >
                  🏢 {tx('ส่วนที่ 1: Anonymous Industry Benchmarking', 'Part 1: Anonymous Industry Benchmarking')}
                </span>
                <span style={{ fontSize: '0.72rem', color: '#c084fc', fontWeight: 800, background: 'rgba(168, 85, 247, 0.15)', padding: '0.2rem 0.55rem', borderRadius: '8px' }}>
                  👥 {activeBenchmark.peerCount} {tx('ร้านค้าในระบบ', 'Peer Stores Analyzed')}
                </span>
              </div>

              <h4 style={{ margin: '0 0 0.4rem 0', fontSize: '1.1rem', fontWeight: 900, color: '#f8fafc' }}>
                {tx(
                  'เปรียบเทียบผลประกอบการกับร้านค้ากลุ่มเดียวกันในระบบ (ไม่ระบุตัวตน)',
                  'Anonymous Benchmark Against Same-Industry Stores'
                )}
              </h4>

              {/* Industry Dropdown */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem' }}>
                <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>{tx('เลือกกลุ่มธุรกิจที่ต้องการเทียบ:', 'Select Industry Segment:')}</span>
                <select
                  value={selectedIndustry}
                  onChange={e => setSelectedIndustry(e.target.value)}
                  style={{ padding: '0.25rem 0.6rem', borderRadius: '8px', background: '#0f172a', color: '#c084fc', border: '1px solid rgba(168, 85, 247, 0.4)', fontSize: '0.78rem', fontWeight: 800 }}
                >
                  <option value="beauty_skincare">{tx('สกินแคร์ คลินิก & ความงาม', 'Beauty & Skincare')}</option>
                  <option value="fnb_cafe">{tx('ร้านอาหาร คาเฟ่ & เครื่องดื่ม', 'Restaurants & Cafes')}</option>
                  <option value="fashion_apparel">{tx('แฟชั่น เสื้อผ้า & เครื่องประดับ', 'Fashion & Apparel')}</option>
                  <option value="retail_general">{tx('ค้าปลีกทั่วไป & ของใช้ประจำวัน', 'General Retail')}</option>
                </select>
              </div>

              {/* 4 Core Benchmark Metric Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.65rem' }}>
                {activeBenchmark.pillars.map(pillar => (
                  <div
                    key={pillar.id}
                    style={{
                      padding: '0.75rem 0.85rem',
                      borderRadius: '12px',
                      background: 'rgba(15, 23, 42, 0.8)',
                      border: '1px solid rgba(148, 163, 184, 0.2)'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                      <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#f8fafc' }}>
                        {isEn ? pillar.labelEn : pillar.labelTh}
                      </span>
                      <span
                        style={{
                          fontSize: '0.72rem',
                          fontWeight: 900,
                          padding: '0.15rem 0.45rem',
                          borderRadius: '6px',
                          background: pillar.diff < 0 ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.2)',
                          color: pillar.diff < 0 ? '#f87171' : '#34d399'
                        }}
                      >
                        {pillar.diff < 0
                          ? `🔻 ${tx('ต่ำกว่าตลาด', 'Below')} ${Math.abs(pillar.diff)}${pillar.unit}`
                          : `▲ ${tx('เหนือกว่าตลาด', 'Above')} +${pillar.diff}${pillar.unit}`}
                      </span>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontSize: '0.76rem', color: '#cbd5e1', marginBottom: '0.35rem' }}>
                      <div>
                        {tx('ร้านคุณ:', 'Your Store:')}{' '}
                        <strong style={{ fontSize: '1rem', color: pillar.diff < 0 ? '#ef4444' : '#10b981' }}>
                          {pillar.yourValue.toLocaleString()}{pillar.unit}
                        </strong>
                      </div>
                      <div>
                        {tx('ค่าเฉลี่ยตลาด:', 'Industry Avg:')}{' '}
                        <strong style={{ fontSize: '0.9rem', color: '#94a3b8' }}>
                          {pillar.benchmarkValue.toLocaleString()}{pillar.unit}
                        </strong>
                      </div>
                    </div>

                    {/* Progress Bar Comparison */}
                    <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.1)', borderRadius: '999px', overflow: 'hidden', position: 'relative' }}>
                      <div
                        style={{
                          width: `${Math.min(100, (pillar.yourValue / Math.max(1, pillar.benchmarkValue * 1.3)) * 100)}%`,
                          height: '100%',
                          background: pillar.diff < 0 ? 'linear-gradient(90deg, #f59e0b, #ef4444)' : 'linear-gradient(90deg, #10b981, #34d399)',
                          borderRadius: '999px'
                        }}
                      />
                    </div>

                    <div style={{ marginTop: '0.4rem', fontSize: '0.72rem', color: '#94a3b8', lineHeight: 1.45 }}>
                      💡 {isEn ? pillar.suggestionEn : pillar.suggestionTh}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Benchmark Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', paddingTop: '0.5rem', borderTop: '1px solid rgba(148, 163, 184, 0.15)' }}>
              <button
                type="button"
                onClick={() => {
                  toast.success(
                    tx(
                      '🤖 AI วาง 3 แผนปรับปรุง: 1) ปรับราคาชุด A+B  2) ออกใบสั่งซื้อรวมศูนย์ลดต้นทุน 9.5%  3) ดึงลูกค้าประจำกลับมาซื้อซ้ำ',
                      '🤖 AI Action Plan: 1) Launch A+B Combo 2) Central PO Bulk Sourcing (-9.5% Cost) 3) 45-Day Loyalty Retargeting'
                    )
                  );
                }}
                style={{
                  width: '100%',
                  padding: '0.65rem',
                  borderRadius: '10px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #a855f7, #7c3aed)',
                  color: '#ffffff',
                  fontWeight: 900,
                  fontSize: '0.78rem',
                  cursor: 'pointer'
                }}
              >
                💡 {tx('ให้ AI วางแผนปิดช่องว่างเพื่อไต่อันดับสู่ Top 10% ของตลาด', 'AI Action Plan to Reach Top 10% Industry Tier')}
              </button>

              <button
                type="button"
                onClick={handleExportBenchmark}
                style={{
                  width: '100%',
                  padding: '0.6rem',
                  borderRadius: '10px',
                  border: '1px solid rgba(168, 85, 247, 0.4)',
                  background: 'rgba(168, 85, 247, 0.12)',
                  color: '#c084fc',
                  fontWeight: 800,
                  fontSize: '0.76rem',
                  cursor: 'pointer'
                }}
              >
                📥 {tx('ดาวน์โหลดรายงานเปรียบเทียบมาตรฐานตลาด (.txt)', 'Download Industry Benchmark Report (.txt)')}
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 2. GOAL DECOMPOSITION (ซอยเป้าหมายใหญ่ให้เป็นรายวัน) */}
        {/* ========================================================================= */}
        {(activeSubView === 'all' || activeSubView === 'decomposition') && (
          <div
            className="glass-card"
            style={{
              padding: '1.35rem',
              borderRadius: '18px',
              border: '1.5px solid rgba(251, 191, 36, 0.45)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '1rem',
              background: 'linear-gradient(145deg, rgba(251, 191, 36, 0.08) 0%, rgba(15, 23, 42, 0.95) 100%)'
            }}
          >
            <div>
              {/* Badge & Daily Target Header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                <span
                  style={{
                    padding: '0.22rem 0.65rem',
                    borderRadius: '999px',
                    background: 'rgba(251, 191, 36, 0.22)',
                    color: '#fbbf24',
                    fontWeight: 900,
                    fontSize: '0.74rem'
                  }}
                >
                  🎯 {tx('ส่วนที่ 2: Goal Decomposition (ซอยเป้าหมายรายวัน)', 'Part 2: Daily Sales Goal Decomposition')}
                </span>
                <span style={{ fontSize: '0.72rem', color: '#fbbf24', fontWeight: 900, background: 'rgba(251, 191, 36, 0.15)', padding: '0.2rem 0.55rem', borderRadius: '8px' }}>
                  ⏳ {remainingDays} {tx('วันที่เหลือในรอบ', 'Days Remaining')}
                </span>
              </div>

              <h4 style={{ margin: '0 0 0.4rem 0', fontSize: '1.1rem', fontWeight: 900, color: '#f8fafc' }}>
                {tx(
                  'ซอยเป้าหมายใหญ่ให้ทีมหน้าร้านรู้ว่า "วันนี้ต้องขายกี่บิล บิลละกี่บาท"',
                  'Break Down Monthly Targets into Daily Shift Receipts'
                )}
              </h4>

              <p style={{ margin: '0 0 0.85rem 0', fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.55 }}>
                {tx(
                  'เปลี่ยนเป้าหมายใหญ่ที่ดูไกลตัว ให้กลายเป็นภารกิจรายวันสร้างแรงผลักดันให้พนักงานแคชเชียร์ทันที',
                  'Transforms abstract monthly quotas into clear, daily receipt targets for store cashier crews.'
                )}
              </p>

              {/* Big Metrics Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.65rem', marginBottom: '0.85rem' }}>
                <div style={{ padding: '0.85rem', borderRadius: '12px', background: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(251, 191, 36, 0.3)' }}>
                  <span style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase' }}>
                    {tx('เป้าหมายยอดขายวันนี้', 'Today’s Revenue Target')}
                  </span>
                  <div style={{ fontSize: '1.35rem', fontWeight: 900, color: '#fbbf24', marginTop: '0.2rem' }}>
                    ฿{dailyTargetRevenue.toLocaleString()}
                  </div>
                  <div style={{ fontSize: '0.68rem', color: '#cbd5e1', marginTop: '0.15rem' }}>
                    {tx(`ยอดขาด ฿${remainingGap.toLocaleString()} ใน ${remainingDays} วัน`, `Gap ฿${remainingGap.toLocaleString()} / ${remainingDays}d`)}
                  </div>
                </div>

                <div style={{ padding: '0.85rem', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.15)', border: '1.5px solid rgba(16, 185, 129, 0.45)' }}>
                  <span style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase' }}>
                    {tx('จำนวนบิลที่ต้องปิดวันนี้', 'Required Receipts Today')}
                  </span>
                  <div style={{ fontSize: '1.5rem', fontWeight: 900, color: '#34d399', marginTop: '0.2rem' }}>
                    {requiredBillsPerDay} <span style={{ fontSize: '0.85rem' }}>{tx('บิล', 'bills')}</span>
                  </div>
                  <div style={{ fontSize: '0.68rem', color: '#34d399', marginTop: '0.15rem' }}>
                    {tx(`เฉลี่ยบิลละ ฿${currentBasket.toLocaleString()}`, `Avg ฿${currentBasket.toLocaleString()} / bill`)}
                  </div>
                </div>
              </div>

              {/* Basket Size Booster Simulator Card */}
              <div style={{ padding: '0.85rem', borderRadius: '14px', background: 'rgba(56, 189, 248, 0.12)', border: '1px solid rgba(56, 189, 248, 0.35)', marginBottom: '0.85rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <span style={{ fontSize: '0.82rem', fontWeight: 900, color: '#38bdf8' }}>
                    ⚡ {tx('กลยุทธ์ดันยอดต่อบิลเพื่อลดความเหนื่อยของทีมงาน:', 'Basket Booster: Work Smarter, Not Harder')}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <span style={{ fontSize: '0.7rem', color: '#cbd5e1' }}>{tx('บิลละ:', 'Basket:')}</span>
                    <input
                      type="number"
                      value={basketSizeInput}
                      onChange={e => setBasketSizeInput(Math.max(0, Number(e.target.value) || 0))}
                      style={{ width: '65px', padding: '0.15rem 0.35rem', borderRadius: '6px', background: '#0f172a', color: '#38bdf8', border: '1px solid #38bdf8', fontSize: '0.75rem', fontWeight: 800, textAlign: 'right' }}
                    />
                    <span style={{ fontSize: '0.7rem', color: '#cbd5e1' }}>฿</span>
                  </div>
                </div>

                <div style={{ fontSize: '0.82rem', color: '#f8fafc', lineHeight: 1.6 }}>
                  {tx(
                    `หากพนักงานแคชเชียร์ช่วยเชียร์ขายสินค้าจับคู่เพิ่มบิลละ +฿350 (เป็น ฿${boostedBasket.toLocaleString()}/บิล) วันนี้จะต้องปิดยอดเพียง `,
                    `If cashiers upsell +฿350 per receipt (reaching ฿${boostedBasket.toLocaleString()}/bill), today’s required receipts drop to just `
                  )}
                  <strong style={{ fontSize: '1.05rem', color: '#34d399' }}>{requiredBillsBoosted} {tx('บิล', 'bills')}</strong>
                  {tx(
                    ` (เหนื่อยน้อยลง ${billsSaved} บิล แต่ได้ยอดครบตามเป้าหมายเท่าเดิม!)`,
                    ` (Save ${billsSaved} bills of effort with zero revenue compromise!)`
                  )}
                </div>
              </div>

              {/* Today's Live Shift Progress Gauge */}
              <div style={{ padding: '0.85rem', borderRadius: '12px', background: 'rgba(15, 23, 42, 0.85)', border: '1px solid rgba(148, 163, 184, 0.25)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#cbd5e1' }}>
                    🛒 {tx('ความคืบหน้าของทีมหน้าร้านวันนี้:', 'Today’s Live Shift Progress:')}
                  </span>
                  <span style={{ fontSize: '0.88rem', fontWeight: 900, color: '#fbbf24' }}>
                    {todayProgressPct}% (฿{todayAchievedSales.toLocaleString()} / ฿{dailyTargetRevenue.toLocaleString()})
                  </span>
                </div>

                {/* Progress bar */}
                <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.1)', borderRadius: '999px', overflow: 'hidden', marginBottom: '0.5rem' }}>
                  <div style={{ width: `${todayProgressPct}%`, height: '100%', background: 'linear-gradient(90deg, #f59e0b, #10b981)', borderRadius: '999px' }} />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.74rem', color: '#cbd5e1' }}>
                  <span>
                    ✓ {tx(`ปิดได้แล้ว ${todayAchievedBills} บิล`, `Closed ${todayAchievedBills} bills`)}
                  </span>
                  <span style={{ color: '#fda4af', fontWeight: 800 }}>
                    ⚠️ {tx(`ขาดอีก ${todayRemainingBills} บิล (฿${todayRemainingSales.toLocaleString()})`, `Need ${todayRemainingBills} more bills (฿${todayRemainingSales.toLocaleString()})`)}
                  </span>
                </div>
              </div>
            </div>

            {/* 1-Click Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', paddingTop: '0.5rem', borderTop: '1px solid rgba(148, 163, 184, 0.15)' }}>
              <button
                type="button"
                onClick={handleCopyDailyBriefing}
                style={{
                  width: '100%',
                  padding: '0.68rem',
                  borderRadius: '10px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                  color: '#0f172a',
                  fontWeight: 900,
                  fontSize: '0.82rem',
                  cursor: 'pointer'
                }}
              >
                📲 {tx('ส่งสรุปเป้าหมายวันนี้เข้ากลุ่ม LINE ทีมขาย & แคชเชียร์ (Daily Briefing)', 'Send Daily Shift Mission Briefing to Sales LINE')}
              </button>

              <button
                type="button"
                onClick={handlePinMissionToPos}
                style={{
                  width: '100%',
                  padding: '0.6rem',
                  borderRadius: '10px',
                  border: isPosPinned ? '1px solid rgba(16, 185, 129, 0.6)' : '1px solid rgba(251, 191, 36, 0.4)',
                  background: isPosPinned ? 'rgba(16, 185, 129, 0.2)' : 'rgba(251, 191, 36, 0.1)',
                  color: isPosPinned ? '#34d399' : '#fbbf24',
                  fontWeight: 800,
                  fontSize: '0.76rem',
                  cursor: 'pointer'
                }}
              >
                {isPosPinned
                  ? tx(`✓ ปักหมุดเป้าหมาย ${requiredBillsPerDay} บิลบนหน้าจอ POS แล้ว`, `✓ Pinned ${requiredBillsPerDay} Bills Goal to POS`)
                  : tx(`🎯 ปักหมุดเป้าหมาย ${requiredBillsPerDay} บิลนี้ขึ้นหน้าจอ POS ประจำวันทันที`, `🎯 Pin ${requiredBillsPerDay} Bills Goal to Cashier POS Display`)}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

