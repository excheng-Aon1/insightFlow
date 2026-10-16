import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { LuxuryIconBadge, LuxuryModuleIcon, ReorderPointControlIcon } from './LuxuryIcons';

export function CashFlowAndDemandForecast({
  lang = 'th',
  inventoryList = [],
  setInventoryList,
  currentRevenueVal = 8920000,
  setActiveTab
}) {
  const isEn = lang === 'en';
  const tx = (th, en) => (isEn ? en : th);

  // Active sub-tab: 'all' | 'restock' | 'calendar' | 'runway'
  const [activeSubTab, setActiveSubTab] = useState('all');

  // =========================================================================
  // 1. SMART RESTOCK ALERT STATE & DATA
  // =========================================================================
  const [restockOrdersPlaced, setRestockOrdersPlaced] = useState({});
  const [selectedRestockSku, setSelectedRestockSku] = useState('PKG-009');
  const [customLeadTime, setCustomLeadTime] = useState(5);
  const [customRunRate, setCustomRunRate] = useState(6);

  // Default products with run rates & lead times
  const restockItems = [
    {
      sku: 'PKG-009',
      thName: 'กล่องพัสดุกันกระแทก ขนาดกลาง',
      enName: 'Shockproof Shipping Box (Medium)',
      currentStock: 12,
      runRatePerDay: 5.5, // 5.5 boxes/day
      leadTimeDays: 5, // 5 days delivery
      safetyStock: 15,
      unitCost: 15,
      suggestedOrderQty: 250,
      vendor: 'บจก. สยามบรรจุภัณฑ์ เอ็กซ์เพรส'
    },
    {
      sku: 'SKU-A045',
      thName: 'ครีมกันแดดสูตรกันน้ำ',
      enName: 'Waterproof Sunscreen SPF50+',
      currentStock: 48,
      runRatePerDay: 8.0,
      leadTimeDays: 7,
      safetyStock: 30,
      unitCost: 250,
      suggestedOrderQty: 180,
      vendor: 'Cosmo Lab Innovation'
    },
    {
      sku: 'SRM-001',
      thName: 'เซรั่มบำรุงผิวสูตรเข้มข้นพิเศษ',
      enName: 'Intensive Night Repair Serum',
      currentStock: 450,
      runRatePerDay: 18.0,
      leadTimeDays: 10,
      safetyStock: 60,
      unitCost: 450,
      suggestedOrderQty: 400,
      vendor: 'Derma Scientific Laboratories'
    }
  ];

  // Merge with live inventory list if available
  const computedRestockItems = restockItems.map(item => {
    const liveItem = inventoryList.find(i => i.sku === item.sku);
    const stock = liveItem ? liveItem.stock : item.currentStock;
    const daysUntilStockout = Math.max(0, Math.round((stock / item.runRatePerDay) * 10) / 10);
    const reorderPoint = Math.ceil(item.runRatePerDay * item.leadTimeDays + item.safetyStock);
    const isCritical = stock <= reorderPoint;
    const daysUrgent = daysUntilStockout - item.leadTimeDays;

    return {
      ...item,
      currentStock: stock,
      daysUntilStockout,
      reorderPoint,
      isCritical,
      daysUrgent
    };
  });

  const criticalItems = computedRestockItems.filter(i => i.isCritical);

  const handlePlaceRestockPo = item => {
    setRestockOrdersPlaced(prev => ({ ...prev, [item.sku]: true }));

    // Increment inventory locally if setter is available
    if (setInventoryList) {
      setInventoryList(prev =>
        prev.map(p => {
          if (p.sku !== item.sku) return p;
          const nextStock = p.stock + item.suggestedOrderQty;
          return {
            ...p,
            stock: nextStock,
            status: 'in_stock',
            th: { ...p.th, statusLabel: 'สั่งซื้อเพิ่มแล้ว (ของกำลังส่ง)' },
            en: { ...p.en, statusLabel: 'Restocked (In Transit)' }
          };
        })
      );
    }

    toast.success(
      tx(
        `⚡ ออกใบสั่งซื้อด่วน (PO) สินค้า ${item.thName} จำนวน ${item.suggestedOrderQty} ชิ้น ส่งหา "${item.vendor}" เรียบร้อยแล้ว!`,
        `⚡ Express PO issued for ${item.enName} (${item.suggestedOrderQty} units) to "${item.vendor}"!`
      )
    );
  };

  const handleCopyRestockLine = () => {
    const criticalListText = criticalItems
      .map(
        i =>
          `• ${i.thName} (${i.sku}): เหลือ ${i.currentStock} ชิ้น (หมดใน ${i.daysUntilStockout} วัน) ➔ ต้องสั่ง ${i.suggestedOrderQty} ชิ้น`
      )
      .join('\n');

    const msg = `🚨 [แจ้งเตือนด่วนสต็อกใกล้หมด - INSIGHTFLOW RESTOCK ALERT]\nตรวจพบสินค้าที่ต้องสั่งซื้อวันนี้เพื่อไม่ให้ของขาด:\n${criticalListText}\n\nกรุณาประสานงานซัพพลายเออร์ออกใบ PO ทันทีครับ`;
    navigator.clipboard.writeText(msg);
    toast.success(
      tx(
        '📋 คัดลอกรายการสินค้าต้องสั่งด่วนสำหรับส่งเข้า LINE ฝ่ายจัดซื้อเรียบร้อยแล้ว!',
        '📋 Copied urgent restock list to clipboard for Procurement team!'
      )
    );
  };

  // =========================================================================
  // 2. CONSUMER BEHAVIOR & DEMAND FORECAST CALENDAR STATE
  // =========================================================================
  const [selectedCalendarCycle, setSelectedCalendarCycle] = useState('payday');
  const [isStaffScheduleLocked, setIsStaffScheduleLocked] = useState(false);
  const [isStockPreallocated, setIsStockPreallocated] = useState(false);

  const consumerCycles = [
    {
      id: 'payday',
      titleTh: 'คลื่นสิ้นเดือน & เงินเดือนออก (Payday Wave)',
      titleEn: 'End-of-Month Payday Wave',
      periodTh: 'วันที่ 25 ถึง 5 ของทุกเดือน',
      periodEn: '25th - 5th of every month',
      upliftTh: '+52% ยอดขายพุ่งสูงสุดในรอบเดือน',
      upliftEn: '+52% Highest Monthly Sales Surge',
      badgeColor: '#34d399',
      bgColor: 'rgba(16, 185, 129, 0.15)',
      borderColor: 'rgba(16, 185, 129, 0.45)',
      descriptionTh:
        'เป็นช่วงที่ผู้บริโภคมีกำลังซื้อสูงสุดหลังได้รับเงินเดือนและโบนัส อัตราการซื้อสินค้าชิ้นใหญ่และเซ็ตบำรุงผิวพรีเมียมเพิ่มขึ้น 64% ตะกร้าเฉลี่ยต่อบิลขยายตัวสูงสุด',
      descriptionEn:
        'Highest consumer purchasing power post-payday. Premium product bundles and bulk orders surge by 64% with peak basket size.',
      strategyTh:
        'จัดเวรพนักงานแคชเชียร์และทีมแพ็กพัสดุเต็มกำลัง 2 กะ พร้อมล็อกสต็อกสินค้าขายดี (เซรั่ม + ครีมกันแดด) ล่วงหน้าอย่างน้อย 7 วัน',
      strategyEn:
        'Deploy double-shift cashier and packing crews. Pre-allocate core bestseller inventory 7 days prior.'
    },
    {
      id: 'lottery',
      titleTh: 'วันหวยออก (Lottery Rush Days)',
      titleEn: 'Bi-Monthly Lottery Rush Days',
      periodTh: 'วันที่ 1 และ 16 ของทุกเดือน (หลัง 16:00 น.)',
      periodEn: '1st & 16th of month (After 4:00 PM)',
      upliftTh: '+28% ยอดขายช้อปปิ้ง & สินค้าฉลอง',
      upliftEn: '+28% Post-Lottery Celebration Surge',
      badgeColor: '#fbbf24',
      bgColor: 'rgba(251, 191, 36, 0.15)',
      borderColor: 'rgba(251, 191, 36, 0.45)',
      descriptionTh:
        'ช่วงบ่ายหลัง 16:00 น. ของวันหวยออก คนไทยมีพฤติกรรมจับจ่ายเพื่อเป็นรางวัลให้ตนเอง หรือฉลองความสุข ยอดขายกลุ่มเครื่องดื่ม คาเฟ่ อาหาร และของชิ้นเล็กจะพุ่งขึ้นทันที',
      descriptionEn:
        'Post-4 PM dopamine spending spike. Shoppers treat themselves to beauty items, cafes, dining, and reward gifts.',
      strategyTh:
        'ยิงแคมเปญ Flash Sale หรือคูปองฉลองรางวัลช่วง 16:00 - 20:00 น. ผ่าน LINE OA และจัดชุดของขวัญไซส์เล็กหน้าร้านเพื่อการตัดสินใจซื้อทันที',
      strategyEn:
        'Trigger evening 4-8 PM Flash Sale vouchers on LINE OA and feature entry-level impulsive gift bundles.'
    },
    {
      id: 'mid_month',
      titleTh: 'กลางเดือน & Double Day แคมเปญออนไลน์',
      titleEn: 'Mid-Month & Marketplace Double Days',
      periodTh: 'วันที่ 14 ถึง 16 ของทุกเดือน',
      periodEn: '14th - 16th of every month',
      upliftTh: '+34% ยอดขายช่องทาง E-Commerce',
      upliftEn: '+34% Marketplace Campaign Spike',
      badgeColor: '#38bdf8',
      bgColor: 'rgba(56, 189, 248, 0.15)',
      borderColor: 'rgba(56, 189, 248, 0.45)',
      descriptionTh:
        'ผู้บริโภครอใช้โค้ดส่วนลดของ Shopee, Lazada, TikTok Shop และบัตรเครดิตกลางเดือน มีการเปรียบเทียบราคาข้ามช่องทางสูง',
      descriptionEn:
        'Shoppers redeem marketplace vouchers and credit card cashback. High cross-channel price sensitivity.',
      strategyTh:
        'เปิดโปรโมชันส่งฟรีหรือแถมของพรีเมียมบนช่องทางแชตร้านค้าโดยตรง เพื่อดึงลูกค้าให้ซื้อตรงโดยไม่ต้องเสียค่าธรรมเนียม Platform สูง',
      strategyEn:
        'Promote free shipping and exclusive gifts on Direct Chat to steer buyers away from high marketplace commission fees.'
    },
    {
      id: 'weekend',
      titleTh: 'สุดสัปดาห์หน้าร้าน (Friday Night & Weekend Surge)',
      titleEn: 'Weekend Retail & POS Peak Flow',
      periodTh: 'วันศุกร์เย็น, เสาร์ และอาทิตย์',
      periodEn: 'Friday Evening, Saturday & Sunday',
      upliftTh: '+30% ยอดขายจุดชำระเงินหน้าร้าน (POS)',
      upliftEn: '+30% Physical Store Footfall',
      badgeColor: '#c084fc',
      bgColor: 'rgba(192, 132, 252, 0.15)',
      borderColor: 'rgba(192, 132, 252, 0.45)',
      descriptionTh:
        'ทราฟฟิกหน้าร้านและสาขาเพิ่มขึ้น 2.2 เท่าเมื่อเทียบกับวันธรรมดา ลูกค้าชอบทดลองสัมผัสสินค้าจริงและจ่ายเงินสดหรือสแกนจ่ายทันที',
      descriptionEn:
        'Store footfall rises 2.2x vs weekdays. High preference for physical product testing and instant QR scan payments.',
      strategyTh:
        'จัดวางสินค้าจับคู่ (Cross-Sell Bundles) ไว้ข้างเครื่องคิดเงิน และเตรียมเงินทอนเงินสดให้เพียงพอเพื่อความรวดเร็วในการคิดเงิน',
      strategyEn:
        'Place impulse cross-sell packs at checkout registers and ensure cashier cash reserves are fully stocked.'
    }
  ];

  const activeCycle = consumerCycles.find(c => c.id === selectedCalendarCycle) || consumerCycles[0];

  // =========================================================================
  // 3. CASH RUNWAY & PROFIT TRACKER CALCULATIONS
  // =========================================================================
  const grossRevenue = currentRevenueVal || 8920000;
  const cogsAmount = Math.round(grossRevenue * 0.465); // 46.5% cost of goods
  const grossProfit = grossRevenue - cogsAmount; // 53.5%

  // Hidden Costs & Operational Leakages
  const platformFees = Math.round(grossRevenue * 0.054); // 5.4% marketplace & gateway fees
  const packagingShipping = Math.round(grossRevenue * 0.022); // 2.2% shipping & pack supplies
  const uncollectedReceivables = 320000; // Overdue invoices
  const fixedOpex = 1420000; // Rent, salaries, utilities
  const totalHiddenAndOpex = platformFees + packagingShipping + uncollectedReceivables + fixedOpex;

  const trueNetCashProfit = Math.max(0, grossProfit - totalHiddenAndOpex);
  const trueNetMarginPct = Math.round((trueNetCashProfit / grossRevenue) * 1000) / 10;

  // Cash Runway Calculation
  const cashInHand = 3850000;
  const monthlyBurnRate = 720000; // Fixed cash burn
  const cashRunwayMonths = Math.round((cashInHand / monthlyBurnRate) * 10) / 10; // 5.3 months

  const handleExportCashflowReport = () => {
    const content = isEn
      ? [
          'INSIGHTFLOW EXECUTIVE CASH RUNWAY & TRUE PROFIT REPORT',
          `Generated: ${new Date().toLocaleString()}`,
          `Gross Revenue (Paper Sales): THB ${grossRevenue.toLocaleString()}`,
          `Cost of Goods Sold (COGS): -THB ${cogsAmount.toLocaleString()}`,
          `Gross Profit: THB ${grossProfit.toLocaleString()} (${Math.round((grossProfit / grossRevenue) * 100)}%)`,
          '----------------------------------------',
          'HIDDEN LEAKAGES & OPERATIONAL EXPENSES:',
          `• Marketplace & Payment Gateway Fees: -THB ${platformFees.toLocaleString()}`,
          `• Packaging & Subsidized Delivery: -THB ${packagingShipping.toLocaleString()}`,
          `• Uncollected Credit Terms (Locked Cash): -THB ${uncollectedReceivables.toLocaleString()}`,
          `• Fixed Operational Overhead (Rent, Payroll): -THB ${fixedOpex.toLocaleString()}`,
          '========================================',
          `TRUE NET CASH PROFIT: THB ${trueNetCashProfit.toLocaleString()} (${trueNetMarginPct}%)`,
          `Cash in Hand: THB ${cashInHand.toLocaleString()} | Monthly Burn: THB ${monthlyBurnRate.toLocaleString()}`,
          `CASH RUNWAY: ${cashRunwayMonths} Months (Healthy & Solvency Protected)`
        ].join('\n')
      : [
          'รายงานการเงินเชิงลึก: กระแสเงินสดแท้จริงและระยะเวลาอยู่รอด (INSIGHTFLOW TRUE CASHFLOW REPORT)',
          `วันที่ประมวลผล: ${new Date().toLocaleDateString('th-TH')}`,
          `ยอดขายรวมบนกระดาษ (Gross Revenue): ฿${grossRevenue.toLocaleString()}`,
          `ต้นทุนสินค้าจริง (COGS): -฿${cogsAmount.toLocaleString()}`,
          `กำไรขั้นต้น (Gross Profit): ฿${grossProfit.toLocaleString()} (${Math.round((grossProfit / grossRevenue) * 100)}%)`,
          '----------------------------------------',
          'ต้นทุนแฝงและค่าใช้จ่ายดำเนินงานที่มักถูกมองข้าม:',
          `• ค่าธรรมเนียมมาร์เก็ตเพลส & Payment Gateway: -฿${platformFees.toLocaleString()}`,
          `• ค่าส่งพัสดุและกล่องแพ็กเกจที่ร้านออกให้: -฿${packagingShipping.toLocaleString()}`,
          `• ลูกหนี้การค้าค้างชำระ (เงินยังไม่เข้าบัญชี): -฿${uncollectedReceivables.toLocaleString()}`,
          `• ค่าใช้จ่ายคงที่ประจำเดือน (เงินเดือน, ค่าเช่า, ค่าน้ำไฟ): -฿${fixedOpex.toLocaleString()}`,
          '========================================',
          `กำไรสุทธิเข้ากระเป๋าจริง (TRUE NET CASH PROFIT): ฿${trueNetCashProfit.toLocaleString()} (${trueNetMarginPct}%)`,
          `เงินสดหมุนเวียนในมือ: ฿${cashInHand.toLocaleString()} | อัตราเผาเงินสดต่อเดือน: ฿${monthlyBurnRate.toLocaleString()}`,
          `ระยะเวลาอยู่รอดของเงินสด (CASH RUNWAY): ${cashRunwayMonths} เดือน (สถานะปลอดภัยสูง ป้องกันเงินสดขาดมือ)`
        ].join('\n');

    const blob = new Blob(['\uFEFF' + content], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = isEn ? 'InsightFlow_True_Cashflow_Report.txt' : 'รายงานกระแสเงินสดและกำไรแท้จริง.txt';
    link.click();
    URL.revokeObjectURL(url);
    toast.success(
      tx(
        '📥 ดาวน์โหลดรายงานกระแสเงินสดและกำไรแท้จริงฉบับผู้บริหารเรียบร้อยแล้ว!',
        '📥 Downloaded Executive Cash Runway & True Profit Report!'
      )
    );
  };

  return (
    <div className="glass-card" style={{ padding: '1.5rem', borderRadius: '22px', border: '1.5px solid rgba(56, 189, 248, 0.45)' }}>
      {/* Header Banner */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <LuxuryIconBadge variant="cyan" size="lg" active>
            <ReorderPointControlIcon size={28} />
          </LuxuryIconBadge>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
              <span
                style={{
                  display: 'inline-block',
                  padding: '0.2rem 0.65rem',
                  borderRadius: '999px',
                  background: 'rgba(56, 189, 248, 0.2)',
                  color: '#38bdf8',
                  fontWeight: 900,
                  fontSize: '0.74rem'
                }}
              >
                {tx('💰 การจัดการกระแสเงินสด & พยากรณ์อนาคต', 'CASH FLOW & DEMAND FORECASTING ENGINE')}
              </span>
              <span style={{ fontSize: '0.74rem', color: '#34d399', fontWeight: 800 }}>
                ● {tx('ป้องกันเงินสดขาดมือ & สต็อกของตรงจังหวะ', 'Zero Cash Shortage & Precision Timing')}
              </span>
            </div>
            <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 900, color: '#f8fafc' }}>
              {tx(
                'ควบคุมจุดสั่งซื้อสินค้า • ปฏิทินวันหวยออกสิ้นเดือน • วิเคราะห์กำไรจริงหลังหักต้นทุนแฝง',
                'Precision Restock Alert • Thai Consumer Calendar • True Net Profit & Runway Tracker'
              )}
            </h3>
          </div>
        </div>

        {/* View Toggle Tabs */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
          {[
            { id: 'all', th: 'ดูทั้ง 3 ส่วน', en: 'All 3 Views' },
            { id: 'restock', th: '📦 1. สั่งของแม่นยำ (Restock)', en: '📦 1. Smart Restock' },
            { id: 'calendar', th: '🗓️ 2. ปฏิทินหวย/สิ้นเดือน', en: '🗓️ 2. Peak Calendar' },
            { id: 'runway', th: '💰 3. กระแสเงินสด (Runway)', en: '💰 3. Cash Runway' }
          ].map(tab => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveSubTab(tab.id)}
              style={{
                padding: '0.45rem 0.85rem',
                borderRadius: '10px',
                border: activeSubTab === tab.id ? '1px solid #38bdf8' : '1px solid rgba(148, 163, 184, 0.2)',
                background: activeSubTab === tab.id ? 'rgba(56, 189, 248, 0.2)' : 'rgba(15, 23, 42, 0.6)',
                color: activeSubTab === tab.id ? '#38bdf8' : '#cbd5e1',
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

      {/* 3 Main Integrated Panels */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.25rem' }}>
        {/* ========================================================================= */}
        {/* 1. SMART RESTOCK ALERT: PRECISION REORDER POINT ENGINE */}
        {/* ========================================================================= */}
        {(activeSubTab === 'all' || activeSubTab === 'restock') && (
          <div
            className="glass-card"
            style={{
              padding: '1.35rem',
              borderRadius: '18px',
              border: criticalItems.length > 0 ? '1.5px solid rgba(244, 63, 94, 0.55)' : '1.5px solid rgba(16, 185, 129, 0.55)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '1rem',
              background: 'linear-gradient(145deg, rgba(244, 63, 94, 0.08) 0%, rgba(15, 23, 42, 0.95) 100%)'
            }}
          >
            <div>
              {/* Badge & Alert Status */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span
                  style={{
                    padding: '0.22rem 0.65rem',
                    borderRadius: '999px',
                    background: 'rgba(244, 63, 94, 0.22)',
                    color: '#fda4af',
                    fontWeight: 900,
                    fontSize: '0.74rem'
                  }}
                >
                  📦 {tx('ส่วนที่ 1: Smart Restock Alert (จุดสั่งซื้อแม่นยำ)', 'Part 1: Smart Precision Restock Alert')}
                </span>
                <span
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 900,
                    padding: '0.2rem 0.55rem',
                    borderRadius: '8px',
                    background: criticalItems.length > 0 ? 'rgba(239, 68, 68, 0.2)' : 'rgba(16, 185, 129, 0.2)',
                    color: criticalItems.length > 0 ? '#f87171' : '#34d399'
                  }}
                >
                  {criticalItems.length > 0
                    ? tx(`🚨 ต้องสั่งวันนี้ ${criticalItems.length} รายการ`, `🚨 ${criticalItems.length} SKUs Must Order Today`)
                    : tx('🟢 สต็อกปลอดภัยทุกรายการ', '🟢 All Inventory Safe')}
                </span>
              </div>

              <h4 style={{ margin: '0 0 0.4rem 0', fontSize: '1.1rem', fontWeight: 900, color: '#f8fafc' }}>
                {tx(
                  'คำนวณจากยอดขายจริง (Run-rate) + ระยะเวลารอสินค้า (Lead time)',
                  'Calculated from Real Run-Rate & Supplier Lead Time'
                )}
              </h4>

              <p style={{ margin: '0 0 0.85rem 0', fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.55 }}>
                {tx(
                  'ระบบไม่ปล่อยให้ของขาดสต็อกจนเสียโอกาสขาย คำนวณจุดตัดที่แม่นยำว่าต้องสั่งวันไหนและจำนวนกี่ชิ้น',
                  'Prevents stockouts before you lose revenue by identifying the exact reorder date and optimal quantity.'
                )}
              </p>

              {/* Critical Alert Cards List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {computedRestockItems.map(item => {
                  const isOrdered = Boolean(restockOrdersPlaced[item.sku]);
                  return (
                    <div
                      key={item.sku}
                      style={{
                        padding: '0.85rem',
                        borderRadius: '12px',
                        background: item.isCritical ? 'rgba(244, 63, 94, 0.12)' : 'rgba(15, 23, 42, 0.75)',
                        border: item.isCritical ? '1px solid rgba(244, 63, 94, 0.4)' : '1px solid rgba(148, 163, 184, 0.2)'
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.35rem' }}>
                        <div>
                          <span style={{ fontSize: '0.88rem', fontWeight: 900, color: '#f8fafc' }}>
                            {isEn ? item.enName : item.thName}
                          </span>
                          <span style={{ fontSize: '0.72rem', color: '#94a3b8', marginLeft: '0.45rem' }}>
                            ({item.sku})
                          </span>
                        </div>
                        <span
                          style={{
                            fontSize: '0.72rem',
                            fontWeight: 900,
                            padding: '0.15rem 0.5rem',
                            borderRadius: '999px',
                            background: item.isCritical ? 'rgba(239, 68, 68, 0.25)' : 'rgba(16, 185, 129, 0.2)',
                            color: item.isCritical ? '#f87171' : '#34d399'
                          }}
                        >
                          {item.isCritical
                            ? tx(`หมดใน ${item.daysUntilStockout} วัน`, `Stockout in ${item.daysUntilStockout}d`)
                            : tx(`พอขาย ${item.daysUntilStockout} วัน`, `Valid ${item.daysUntilStockout}d`)}
                        </span>
                      </div>

                      {/* Formulas Breakdown */}
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.4rem', marginTop: '0.4rem', fontSize: '0.74rem', color: '#cbd5e1' }}>
                        <div>
                          <span style={{ color: '#94a3b8', display: 'block', fontSize: '0.66rem' }}>{tx('สต็อกคงเหลือ', 'Current Stock')}</span>
                          <strong style={{ color: item.isCritical ? '#f87171' : '#fff' }}>{item.currentStock} {tx('ชิ้น', 'pcs')}</strong>
                        </div>
                        <div>
                          <span style={{ color: '#94a3b8', display: 'block', fontSize: '0.66rem' }}>{tx('ขายวันละ (Run-rate)', 'Daily Run-Rate')}</span>
                          <strong>{item.runRatePerDay} {tx('ชิ้น/วัน', 'pcs/d')}</strong>
                        </div>
                        <div>
                          <span style={{ color: '#94a3b8', display: 'block', fontSize: '0.66rem' }}>{tx('ระยะรอของ (Lead time)', 'Lead Time')}</span>
                          <strong>{item.leadTimeDays} {tx('วันส่ง', 'days')}</strong>
                        </div>
                      </div>

                      {/* Prescriptive Alert Message & 1-Click PO */}
                      {item.isCritical && (
                        <div style={{ marginTop: '0.6rem', paddingTop: '0.6rem', borderTop: '1px dashed rgba(244, 63, 94, 0.3)' }}>
                          <div style={{ fontSize: '0.78rem', color: '#fecdd3', marginBottom: '0.45rem', lineHeight: 1.5 }}>
                            📢 {tx(
                              `คำแนะนำ AI: สินค้าจะหมดภายใน ${item.daysUntilStockout} วัน แต่ซัพพลายเออร์ใช้เวลาส่ง ${item.leadTimeDays} วัน! ต้องสั่งซื้อวันนี้ทันทีจำนวน `,
                              `AI Alert: Stock depletes in ${item.daysUntilStockout} days while delivery takes ${item.leadTimeDays} days! Must order today: `
                            )}
                            <strong style={{ color: '#fbbf24' }}>{item.suggestedOrderQty} {tx('ชิ้น', 'units')}</strong>
                          </div>

                          <button
                            type="button"
                            onClick={() => handlePlaceRestockPo(item)}
                            style={{
                              width: '100%',
                              padding: '0.55rem',
                              borderRadius: '8px',
                              border: 'none',
                              background: isOrdered
                                ? 'rgba(16, 185, 129, 0.25)'
                                : 'linear-gradient(135deg, #f43f5e, #e11d48)',
                              color: isOrdered ? '#34d399' : '#ffffff',
                              fontWeight: 900,
                              fontSize: '0.78rem',
                              cursor: 'pointer'
                            }}
                          >
                            {isOrdered
                              ? tx('✓ ส่งใบสั่งซื้อด่วน (Express PO) เรียบร้อยแล้ว', '✓ Express PO Issued & Dispatched')
                              : tx(`⚡ ออกใบสั่งซื้อด่วน ${item.suggestedOrderQty} ชิ้น ส่งหา "${item.vendor}" ทันที`, `⚡ 1-Click Express PO (${item.suggestedOrderQty} pcs) to Supplier`)}
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Action Button */}
            <div style={{ paddingTop: '0.5rem', borderTop: '1px solid rgba(148, 163, 184, 0.15)' }}>
              <button
                type="button"
                onClick={handleCopyRestockLine}
                style={{
                  width: '100%',
                  padding: '0.65rem',
                  borderRadius: '10px',
                  border: '1px solid rgba(244, 63, 94, 0.45)',
                  background: 'rgba(244, 63, 94, 0.12)',
                  color: '#fda4af',
                  fontWeight: 800,
                  fontSize: '0.78rem',
                  cursor: 'pointer'
                }}
              >
                📋 {tx('คัดลอกสรุปรายการต้องสั่งด่วนสำหรับ LINE จัดซื้อ', 'Copy Urgent Restock List for Procurement LINE')}
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 2. CONSUMER BEHAVIOR & PEAK DEMAND CALENDAR */}
        {/* ========================================================================= */}
        {(activeSubTab === 'all' || activeSubTab === 'calendar') && (
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
              {/* Badge & Readiness */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
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
                  🗓️ {tx('ส่วนที่ 2: ปฏิทินพฤติกรรม & ยอดขายตามเทศกาล', 'Part 2: Thai Spending Cycles & Peak Calendar')}
                </span>
                <span style={{ fontSize: '0.72rem', color: '#34d399', fontWeight: 900, background: 'rgba(16, 185, 129, 0.18)', padding: '0.2rem 0.55rem', borderRadius: '8px' }}>
                  ⭐ {tx('ความพร้อมของร้าน 91.6% (เกรด A+)', 'Store Readiness: 91.6% (A+)')}
                </span>
              </div>

              <h4 style={{ margin: '0 0 0.4rem 0', fontSize: '1.1rem', fontWeight: 900, color: '#f8fafc' }}>
                {tx(
                  'พยากรณ์ยอดขายตามฤดูกาล / วันหวยออก / สิ้นเดือน',
                  'Forecast Demand for Payday, Lottery & Weekend Waves'
                )}
              </h4>

              <p style={{ margin: '0 0 0.85rem 0', fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.55 }}>
                {tx(
                  'เตรียมสต็อกและจัดเวรพนักงานให้ตรงกับวันที่คนพร้อมจ่ายเงินมากที่สุด ไม่เหนื่อยฟรี',
                  'Align inventory and staff scheduling with high-spending consumer behavior patterns.'
                )}
              </p>

              {/* Cycle Selector Buttons */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.45rem', marginBottom: '0.85rem' }}>
                {consumerCycles.map(cycle => (
                  <button
                    key={cycle.id}
                    type="button"
                    onClick={() => setSelectedCalendarCycle(cycle.id)}
                    style={{
                      padding: '0.55rem 0.65rem',
                      borderRadius: '10px',
                      border: selectedCalendarCycle === cycle.id ? `1.5px solid ${cycle.badgeColor}` : '1px solid rgba(148, 163, 184, 0.2)',
                      background: selectedCalendarCycle === cycle.id ? cycle.bgColor : 'rgba(15, 23, 42, 0.6)',
                      color: selectedCalendarCycle === cycle.id ? cycle.badgeColor : '#cbd5e1',
                      fontWeight: selectedCalendarCycle === cycle.id ? 900 : 700,
                      fontSize: '0.76rem',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <div>{isEn ? cycle.titleEn : cycle.titleTh}</div>
                    <div style={{ fontSize: '0.66rem', opacity: 0.85, marginTop: '0.15rem' }}>
                      {isEn ? cycle.periodEn : cycle.periodTh}
                    </div>
                  </button>
                ))}
              </div>

              {/* Active Cycle Deep Dive Box */}
              <div
                style={{
                  padding: '0.9rem',
                  borderRadius: '14px',
                  background: activeCycle.bgColor,
                  border: `1px solid ${activeCycle.borderColor}`,
                  marginBottom: '0.75rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <span style={{ fontSize: '0.86rem', fontWeight: 900, color: activeCycle.badgeColor }}>
                    🔥 {isEn ? activeCycle.titleEn : activeCycle.titleTh}
                  </span>
                  <span style={{ fontSize: '0.74rem', fontWeight: 900, color: '#f8fafc', background: 'rgba(0,0,0,0.3)', padding: '0.15rem 0.5rem', borderRadius: '6px' }}>
                    {isEn ? activeCycle.upliftEn : activeCycle.upliftTh}
                  </span>
                </div>

                <div style={{ fontSize: '0.8rem', color: '#f1f5f9', lineHeight: 1.6, marginBottom: '0.6rem' }}>
                  {isEn ? activeCycle.descriptionEn : activeCycle.descriptionTh}
                </div>

                <div style={{ padding: '0.65rem', borderRadius: '10px', background: 'rgba(15, 23, 42, 0.85)', border: '1px solid rgba(148, 163, 184, 0.2)' }}>
                  <span style={{ display: 'block', fontSize: '0.72rem', fontWeight: 900, color: '#fbbf24', marginBottom: '0.2rem' }}>
                    💡 {tx('กลยุทธ์เตรียมความพร้อมที่ AI แนะนำ:', 'Recommended AI Preparedness Action:')}
                  </span>
                  <div style={{ fontSize: '0.78rem', color: '#e2e8f0', lineHeight: 1.5 }}>
                    {isEn ? activeCycle.strategyEn : activeCycle.strategyTh}
                  </div>
                </div>
              </div>
            </div>

            {/* 1-Click Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', paddingTop: '0.5rem', borderTop: '1px solid rgba(148, 163, 184, 0.15)' }}>
              <button
                type="button"
                onClick={() => {
                  setIsStaffScheduleLocked(true);
                  toast.success(
                    tx(
                      `📋 บันทึกจัดตารางเวรพนักงาน 2 กะ รองรับ "${isEn ? activeCycle.titleEn : activeCycle.titleTh}" เรียบร้อยแล้ว!`,
                      `📋 Locked 2-shift staff schedule for "${activeCycle.titleEn}"!`
                    )
                  );
                }}
                style={{
                  width: '100%',
                  padding: '0.65rem',
                  borderRadius: '10px',
                  border: isStaffScheduleLocked ? '1px solid rgba(16, 185, 129, 0.6)' : 'none',
                  background: isStaffScheduleLocked
                    ? 'rgba(16, 185, 129, 0.22)'
                    : 'linear-gradient(135deg, #d97706, #b45309)',
                  color: isStaffScheduleLocked ? '#34d399' : '#ffffff',
                  fontWeight: 900,
                  fontSize: '0.78rem',
                  cursor: 'pointer'
                }}
              >
                {isStaffScheduleLocked
                  ? tx('✓ จัดตารางเวรพนักงานรับวันพีคเรียบร้อยแล้ว', '✓ Staff Shift Locked for Peak Wave')
                  : tx('📋 ล็อกตารางจัดเวรพนักงานล่วงหน้ารองรับวันพีค', '📋 1-Click Lock Staff Shift Schedule')}
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsStockPreallocated(true);
                  toast.success(
                    tx(
                      `📦 ล็อกโควต้าสต็อกสินค้าขายดีล่วงหน้า 7 วัน สำหรับ "${isEn ? activeCycle.titleEn : activeCycle.titleTh}" สำเร็จ!`,
                      `📦 Pre-allocated flagship stock 7 days in advance for "${activeCycle.titleEn}"!`
                    )
                  );
                }}
                style={{
                  width: '100%',
                  padding: '0.6rem',
                  borderRadius: '10px',
                  border: '1px solid rgba(251, 191, 36, 0.4)',
                  background: 'rgba(251, 191, 36, 0.1)',
                  color: '#fbbf24',
                  fontWeight: 800,
                  fontSize: '0.76rem',
                  cursor: 'pointer'
                }}
              >
                {isStockPreallocated
                  ? tx('✓ ล็อกสต็อกสินค้าขายดีล่วงหน้าแล้ว', '✓ Core Stock Pre-allocated')
                  : tx('📦 ล็อกโควต้าสต็อกสินค้าขายดีล่วงหน้า', '📦 1-Click Pre-allocate Bestseller Inventory')}
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 3. CASH RUNWAY & TRUE NET PROFIT TRACKER */}
        {/* ========================================================================= */}
        {(activeSubTab === 'all' || activeSubTab === 'runway') && (
          <div
            className="glass-card"
            style={{
              padding: '1.35rem',
              borderRadius: '18px',
              border: '1.5px solid rgba(16, 185, 129, 0.55)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '1rem',
              background: 'linear-gradient(145deg, rgba(16, 185, 129, 0.08) 0%, rgba(15, 23, 42, 0.95) 100%)'
            }}
          >
            <div>
              {/* Badge & Solvency Status */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span
                  style={{
                    padding: '0.22rem 0.65rem',
                    borderRadius: '999px',
                    background: 'rgba(16, 185, 129, 0.22)',
                    color: '#34d399',
                    fontWeight: 900,
                    fontSize: '0.74rem'
                  }}
                >
                  💰 {tx('ส่วนที่ 3: Cash Runway & กำไรแท้จริง', 'Part 3: Cash Runway & True Net Profit')}
                </span>
                <span style={{ fontSize: '0.72rem', color: '#34d399', fontWeight: 900, background: 'rgba(16, 185, 129, 0.2)', padding: '0.2rem 0.55rem', borderRadius: '8px' }}>
                  🛡️ {tx('ปลอดภัยสูง (> 4 เดือน)', 'High Solvency (> 4m)')}
                </span>
              </div>

              <h4 style={{ margin: '0 0 0.4rem 0', fontSize: '1.1rem', fontWeight: 900, color: '#f8fafc' }}>
                {tx(
                  'แยกแยะ "ยอดขายบนกระดาษ" กับ "เงินสดเข้ากระเป๋าจริง"',
                  'Distinguish Paper Revenue from True Liquid Cash'
                )}
              </h4>

              <p style={{ margin: '0 0 0.85rem 0', fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.55 }}>
                {tx(
                  'ป้องกันร้านค้าเจ๊งเพราะเงินสดขาดมือ หักค่าธรรมเนียมแฝง, ค่าส่ง, และหนี้ค้างให้เห็นเงินสดจริง',
                  'Exposes hidden leakages: platform fees, subsidized shipping, and uncollected trade credit.'
                )}
              </p>

              {/* Cash Runway Gauge Box */}
              <div
                style={{
                  padding: '0.9rem',
                  borderRadius: '14px',
                  background: 'rgba(15, 23, 42, 0.9)',
                  border: '1.5px solid rgba(16, 185, 129, 0.4)',
                  marginBottom: '0.85rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <span style={{ fontSize: '0.72rem', color: '#94a3b8', textTransform: 'uppercase', fontWeight: 800 }}>
                    {tx('ระยะเวลาอยู่รอดของเงินสด (Cash Runway)', 'Liquid Cash Runway')}
                  </span>
                  <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#34d399', lineHeight: 1.2 }}>
                    {cashRunwayMonths} {tx('เดือน', 'Months')}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#cbd5e1', marginTop: '0.2rem' }}>
                    {tx(`เงินสดในมือ ฿${cashInHand.toLocaleString()} / เผาเดือนละ ฿${monthlyBurnRate.toLocaleString()}`, `Cash ฿${cashInHand.toLocaleString()} / Burn ฿${monthlyBurnRate.toLocaleString()}/mo`)}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span style={{ display: 'inline-block', padding: '0.25rem 0.65rem', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.25)', color: '#34d399', fontSize: '0.74rem', fontWeight: 900 }}>
                    🟢 {tx('สถานะมั่นคงมาก', 'Very Healthy')}
                  </span>
                  <div style={{ fontSize: '0.68rem', color: '#94a3b8', marginTop: '0.3rem' }}>
                    {tx('ดำเนินธุรกิจได้ต่อเนื่อง 160 วัน', 'Survives 160+ days without sales')}
                  </div>
                </div>
              </div>

              {/* True Profit Waterfall Breakdown */}
              <div style={{ padding: '0.85rem', borderRadius: '12px', background: 'rgba(15, 23, 42, 0.75)', border: '1px solid rgba(148, 163, 184, 0.2)', fontSize: '0.78rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem', color: '#f8fafc', fontWeight: 800 }}>
                  <span>{tx('1. ยอดขายบนกระดาษ (Gross Revenue):', '1. Gross Paper Revenue:')}</span>
                  <span>฿{grossRevenue.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem', color: '#fda4af' }}>
                  <span>{tx('2. หัก ต้นทุนสินค้าจริง (COGS):', '2. Less Cost of Goods (COGS):')}</span>
                  <span>-฿{cogsAmount.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem', color: '#fbbf24' }}>
                  <span>{tx('3. หัก ค่าธรรมเนียม Platform & Payment (5.4%):', '3. Less Marketplace Fees (5.4%):')}</span>
                  <span>-฿{platformFees.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem', color: '#cbd5e1' }}>
                  <span>{tx('4. หัก ค่าส่งและกล่องพัสดุที่ร้านออกให้:', '4. Less Subsidized Shipping & Box:')}</span>
                  <span>-฿{packagingShipping.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem', color: '#f87171' }}>
                  <span>{tx('5. หัก ลูกหนี้การค้าค้างชำระ (เงินยังไม่เข้า):', '5. Less Uncollected Credit Terms:')}</span>
                  <span>-฿{uncollectedReceivables.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.45rem', color: '#cbd5e1' }}>
                  <span>{tx('6. หัก ค่าเช่า, เงินเดือน, ค่าน้ำไฟ (Opex):', '6. Less Fixed Opex (Rent, Salaries):')}</span>
                  <span>-฿{fixedOpex.toLocaleString()}</span>
                </div>

                <div style={{ paddingTop: '0.45rem', borderTop: '1.5px solid rgba(16, 185, 129, 0.4)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 900, color: '#34d399', fontSize: '0.84rem' }}>
                    💰 {tx('กำไรสุทธิเข้ากระเป๋าจริง (True Net Cash Profit):', 'TRUE NET CASH PROFIT:')}
                  </span>
                  <span style={{ fontWeight: 900, color: '#34d399', fontSize: '1.1rem' }}>
                    ฿{trueNetCashProfit.toLocaleString()} ({trueNetMarginPct}%)
                  </span>
                </div>
              </div>
            </div>

            {/* 1-Click Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', paddingTop: '0.5rem', borderTop: '1px solid rgba(148, 163, 184, 0.15)' }}>
              <button
                type="button"
                onClick={handleExportCashflowReport}
                style={{
                  width: '100%',
                  padding: '0.65rem',
                  borderRadius: '10px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  color: '#ffffff',
                  fontWeight: 900,
                  fontSize: '0.78rem',
                  cursor: 'pointer'
                }}
              >
                📥 {tx('ดาวน์โหลดรายงานกระแสเงินสด & กำไรแท้จริง (.txt / .csv)', 'Download True Cashflow & Profit Report')}
              </button>

              <button
                type="button"
                onClick={() => {
                  toast.success(
                    tx(
                      '💡 แนะนำลดต้นทุนแฝง 3 จุด: 1) ย้ายลูกค้ามาร์เก็ตเพลสเข้าไลน์ประหยัด 5.4%  2) เรียกเก็บหนี้ค้าง ฿320,000  3) ออกใบสั่งซื้อรวมศูนย์ลดค่ากล่อง 12%',
                      '💡 3 Cost-Cut Levers: 1) Migrate marketplace buyers to direct chat  2) Collect overdue credit  3) Bulk purchase packaging'
                    )
                  );
                }}
                style={{
                  width: '100%',
                  padding: '0.6rem',
                  borderRadius: '10px',
                  border: '1px solid rgba(16, 185, 129, 0.4)',
                  background: 'rgba(16, 185, 129, 0.1)',
                  color: '#34d399',
                  fontWeight: 800,
                  fontSize: '0.76rem',
                  cursor: 'pointer'
                }}
              >
                💡 {tx('ให้ AI วางแผนลดต้นทุนแฝง 3 จุดทันที (ประหยัด +฿380,000)', 'AI 3-Point Hidden Cost Reduction Plan')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

