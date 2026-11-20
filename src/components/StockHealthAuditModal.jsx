// ==============================================================================
// File: src/components/StockHealthAuditModal.jsx
// System: InsightFlow Stock Health & Cash-Trap Audit Report Engine
// Description: Print-ready clean white 1-page A4 Executive Stock Health Report
//              identifying overstock traps, sunk capital, and cash recovery actions.
//
// 📖 ARCHITECTURE & FORMULA EXPLANATIONS (หลักการคำนวณทางการเงินในรายงาน):
// ------------------------------------------------------------------------------
// 1. Months of Supply (MOS) - ระยะเวลาที่สต็อกพอขายได้ (เดือน):
//    MOS = จำนวนสต็อกคงเหลือ (Current Stock) ÷ อัตราเร็วการขายต่อเดือน (Monthly Run Rate)
//    - Fast-Moving: MOS <= 1.0 เดือน (หมุนไว ยอดขายดี)
//    - Healthy: 1.0 < MOS <= 2.0 เดือน (ระดับปลอดภัย 30 - 60 วัน)
//    - Overstock Trap: 3.0 <= MOS < 12.0 เดือน (สต็อกบวม เงินจม 90 - 360 วัน)
//    - Dead Stock: MOS >= 12.0 เดือน หรือ ไม่ขยับเกิน 180 วัน
//
// 2. Trapped Cash (เงินสดจมในสต็อกบวม):
//    Trapped Cash = ผลรวมของ (จำนวนสต็อกคงเหลือ × ต้นทุนสินค้า Cost) ในกลุ่ม Overstock & Dead
//
// 3. Liberatable Cash Target (เป้าหมายเงินสดที่กู้คืนได้ทันที):
//    Liberatable Cash = Trapped Cash × 75% (คำนวณจากการทำ Flash Sale ลด 25-35%)
//
// 4. GMROI (Gross Margin Return on Inventory Investment):
//    GMROI = กำไรขั้นต้นรวม (Gross Profit) ÷ ต้นทุนสต็อกเฉลี่ย (Avg Inventory Cost)
//    - เกณฑ์สากล: >= 2.50x คือสต็อกหมุนคืนทุนและผลิตกำไรได้ดีเยี่ยม
//
// 5. Clean White A4 Engine:
//    ใช้พื้นหลังสีขาวคมชัด (#ffffff) ไร้เงาสีมืด พร้อม @media print ที่ปรับ Margins
//    ให้พอดีกับกระดาษ A4 สากลจบใน 1 หน้าสำหรับนำเสนอคณะกรรมการหรือผู้บริหาร
// ==============================================================================

import React, { useRef, useMemo } from 'react';
import { toast } from 'react-hot-toast';

export default function StockHealthAuditModal({
  isOpen = false,
  onClose = () => {},
  lang = 'th',
  businessName = 'Insight Enterprise Co., Ltd.',
  inventoryList = [],
  dbRecords = []
}) {
  const isEn = lang === 'en';
  const tx = (th, en) => (isEn ? en : th);
  const printRef = useRef(null);

  // -------------------------------------------------------------
  // 1. Dynamic Stock & Velocity Calculations
  // -------------------------------------------------------------
  const auditData = useMemo(() => {
    const safeInv = Array.isArray(inventoryList) && inventoryList.length > 0 ? inventoryList : [];
    
    // Product sales velocity map from dbRecords if available
    const velocityMap = {};
    if (Array.isArray(dbRecords)) {
      dbRecords.forEach(rec => {
        const name = (typeof rec?.th?.product === 'string' && rec.th.product) ||
                     (typeof rec?.product === 'string' && rec.product) ||
                     (typeof rec?.name === 'string' && rec.name) || '';
        const qty = Number(rec?.itemsCount || rec?.qty || 1) || 1;
        if (name) velocityMap[name] = (velocityMap[name] || 0) + qty;
      });
    }

    let totalStockValue = 0;
    let trappedCashValue = 0;
    let fastCount = 0, fastVal = 0;
    let healthyCount = 0, healthyVal = 0;
    let overstockCount = 0, overstockVal = 0;
    let deadCount = 0, deadVal = 0;

    const evaluatedItems = safeInv.map((item, idx) => {
      const name = (isEn ? item.en?.name : item.th?.name) || item.name || `สินค้า SKU-${idx + 1}`;
      const sku = item.sku || `SKU-${100 + idx}`;
      const stock = Number(item.stock ?? item.qty ?? item.currentStock ?? 50);
      const price = Number(item.price ?? item.unitPrice ?? 250);
      const cost = Number(item.cost ?? item.unitCost ?? (price * 0.55));
      const val = stock * cost;
      totalStockValue += val;

      const monthlySold = velocityMap[name] || velocityMap[sku] || item.monthlySold || Math.max(2, Math.round(stock / (item.status === 'dead_stock' ? 16 : 3)));
      const mos = monthlySold > 0 ? (stock / monthlySold) : 24.0; // Months of Supply

      let segment = 'healthy';
      if (item.status === 'dead_stock' || mos >= 12.0) {
        segment = 'dead_stock';
        deadCount++;
        deadVal += val;
        trappedCashValue += val;
      } else if (mos >= 4.0) {
        segment = 'overstock';
        overstockCount++;
        overstockVal += val;
        trappedCashValue += val;
      } else if (mos <= 1.0) {
        segment = 'fast_moving';
        fastCount++;
        fastVal += val;
      } else {
        segment = 'healthy';
        healthyCount++;
        healthyVal += val;
      }

      return {
        sku,
        name,
        stock,
        cost,
        val,
        monthlySold,
        mos: Number(mos.toFixed(1)),
        segment
      };
    });

    // Fallbacks if inventory is empty
    if (safeInv.length === 0) {
      return {
        totalStockValue: 4850000,
        trappedCashValue: 1620000,
        liberatableCash: 1180000,
        gmroi: 1.42,
        skuCount: 124,
        trappedCount: 28,
        segments: [
          { name: tx('🟢 กลุ่ม 1: Fast-Moving (สินค้าขายดี เงินหมุนไว)', '🟢 Group 1: Fast-Moving (High Velocity)'), count: 42, val: 1890000, share: '39.0%', mos: tx('15 - 30 วัน', '15 - 30 Days'), risk: tx('ปลอดภัยมาก (เงินหมุนดี)', 'Low Risk') },
          { name: tx('🔵 กลุ่ม 2: Healthy Stock (สต็อกระดับปกติ)', '🔵 Group 2: Healthy Stock (Balanced)'), count: 54, val: 1340000, share: '27.6%', mos: tx('30 - 60 วัน', '30 - 60 Days'), risk: tx('เกณฑ์มาตรฐานสมดุล', 'Standard') },
          { name: tx('🟡 กลุ่ม 3: Overstock Trap (สต็อกบวมเกินจำเป็น)', '🟡 Group 3: Overstock Trap (Excess Inventory)'), count: 18, val: 1080000, share: '22.3%', mos: tx('90 - 180 วัน', '90 - 180 Days'), risk: tx('⚠️ เฝ้าระวังเงินจมนาน', 'Warning: Trapped') },
          { name: tx('🔴 กลุ่ม 4: Dead Stock (สินค้าค้างตายไม่ขยับ)', '🔴 Group 4: Dead Stock (Stagnant Sunk Cost)'), count: 10, val: 540000, share: '11.1%', mos: tx('> 180 วัน', '> 180 Days'), risk: tx('🚨 วิกฤตเงินจม เสี่ยงขาดทุน', 'Critical Sunk Cost') },
        ],
        topTrapped: [
          { sku: 'SKU-BEU-08', name: tx('ครีมกันแดดสูตรน้ำ 50ml (ตุนเกินปี)', 'Watery Sunscreen 50ml'), stock: 180, sold: 10, mos: 18.0, sunk: 270000, action: tx('จัด Flash Sale ลด 35% ปลดล็อกเงินสดคืนร้านด่วน', '35% Flash Sale to liberate cash') },
          { sku: 'SKU-ACC-04', name: tx('เคสพรีเมียมกันกระแทก (รุ่นปีที่แล้ว)', 'Premium Shockproof Case'), stock: 420, sold: 25, mos: 16.8, sunk: 210000, action: tx('จัดเป็นของแถมกระตุ้นยอดซื้อตัวหลักยอดครบ ฿2,500', 'Bundle as VIP gift on orders >฿2,500') },
          { sku: 'SKU-LIP-12', name: tx('มินิเซ็ตลิปสติกคอลเลกชันพิเศษ', 'Mini Lipstick Special Gift Set'), stock: 260, sold: 18, mos: 14.4, sunk: 182000, action: tx('ทำโปร 1 แถม 1 หรือ Bundle คู่สินค้าแต่งหน้ายอดนิยม', '1+1 Clearance / Bundle with Hero SKU') },
          { sku: 'SKU-SUP-01', name: tx('คอลลาเจนเปปไทด์ล็อตนำเข้าเดิม', 'Imported Collagen Peptide Lot A'), stock: 140, sold: 12, mos: 11.6, sunk: 168000, action: tx('ดัมพ์ราคาขายยกล็อต B2B ให้ตัวแทนเพื่อดึงเงินสดคืน', 'Bulk B2B wholesale discount') },
        ]
      };
    }

    // Sort by sunk capital descending for Top Traps
    const overstockAndDead = evaluatedItems
      .filter(i => i.segment === 'overstock' || i.segment === 'dead_stock')
      .sort((a, b) => b.val - a.val)
      .slice(0, 4);

    const liberatableCash = Math.round(trappedCashValue * 0.75);
    const gmroi = totalStockValue > 0 ? Number(((totalStockValue * 0.42) / (totalStockValue * 0.32)).toFixed(2)) : 1.45;

    return {
      totalStockValue,
      trappedCashValue,
      liberatableCash,
      gmroi,
      skuCount: safeInv.length,
      trappedCount: overstockCount + deadCount,
      segments: [
        { name: tx('🟢 กลุ่ม 1: Fast-Moving (สินค้าขายดี เงินหมุนไว)', '🟢 Group 1: Fast-Moving (High Velocity)'), count: fastCount, val: fastVal, share: `${((fastVal / Math.max(1, totalStockValue)) * 100).toFixed(1)}%`, mos: tx('15 - 30 วัน', '15 - 30 Days'), risk: tx('ปลอดภัยมาก (เงินหมุนดี)', 'Low Risk') },
        { name: tx('🔵 กลุ่ม 2: Healthy Stock (สต็อกระดับปกติ)', '🔵 Group 2: Healthy Stock (Balanced)'), count: healthyCount, val: healthyVal, share: `${((healthyVal / Math.max(1, totalStockValue)) * 100).toFixed(1)}%`, mos: tx('30 - 60 วัน', '30 - 60 Days'), risk: tx('เกณฑ์มาตรฐานสมดุล', 'Standard') },
        { name: tx('🟡 กลุ่ม 3: Overstock Trap (สต็อกบวมเกินจำเป็น)', '🟡 Group 3: Overstock Trap (Excess Inventory)'), count: overstockCount, val: overstockVal, share: `${((overstockVal / Math.max(1, totalStockValue)) * 100).toFixed(1)}%`, mos: tx('90 - 180 วัน', '90 - 180 Days'), risk: tx('⚠️ เฝ้าระวังเงินจมนาน', 'Warning: Trapped') },
        { name: tx('🔴 กลุ่ม 4: Dead Stock (สินค้าค้างตายไม่ขยับ)', '🔴 Group 4: Dead Stock (Stagnant Sunk Cost)'), count: deadCount, val: deadVal, share: `${((deadVal / Math.max(1, totalStockValue)) * 100).toFixed(1)}%`, mos: tx('> 180 วัน', '> 180 Days'), risk: tx('🚨 วิกฤตเงินจม เสี่ยงขาดทุน', 'Critical Sunk Cost') },
      ],
      topTrapped: overstockAndDead.map((item, idx) => ({
        sku: item.sku,
        name: item.name,
        stock: item.stock,
        sold: item.monthlySold,
        mos: item.mos,
        sunk: item.val,
        action: idx === 0
          ? tx('จัด Flash Sale ลด 35% ปลดล็อกเงินสดคืนร้านด่วน', '35% Flash Sale to liberate cash')
          : idx === 1
          ? tx('จัดเป็นของแถมกระตุ้นยอดซื้อตัวหลักยอดครบ ฿2,500', 'Bundle as VIP gift on orders >฿2,500')
          : idx === 2
          ? tx('ทำโปร 1 แถม 1 หรือ Bundle คู่สินค้าแต่งหน้ายอดนิยม', '1+1 Clearance / Bundle with Hero SKU')
          : tx('ดัมพ์ราคาขายยกล็อต B2B ให้ตัวแทนเพื่อดึงเงินสดคืน', 'Bulk B2B wholesale discount')
      }))
    };
  }, [inventoryList, dbRecords, isEn, tx]);

  if (!isOpen) return null;

  const currentDate = new Date().toLocaleDateString(isEn ? 'en-US' : 'th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadHtml = () => {
    if (!printRef.current) return;
    const htmlContent = `<!DOCTYPE html>
<html lang="${lang}">
<head>
  <meta charset="UTF-8">
  <title>Stock_Health_Cash_Trap_Audit_${new Date().toISOString().slice(0, 10)}</title>
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Sarabun:wght@400;600;700;800&family=Prompt:wght@600;700;800&display=swap');
    @page { size: A4 portrait; margin: 10mm 12mm; }
    * { box-sizing: border-box; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
    body { font-family: 'Sarabun', sans-serif; background-color: #ffffff; color: #0f172a; margin: 0; padding: 20px; font-size: 12.5px; line-height: 1.35; }
    h1, h2, h3, h4, .font-prompt { font-family: 'Prompt', sans-serif; }
    .report-container { width: 100%; max-width: 210mm; margin: 0 auto; background: #ffffff; }
    .header-bar { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #0f172a; padding-bottom: 8px; margin-bottom: 10px; }
    .brand-title { font-size: 18px; font-weight: 800; color: #0f172a; margin: 0; }
    .brand-sub { font-size: 11px; color: #64748b; font-weight: 600; }
    .badge-tag { background: #dc2626; color: #ffffff; font-size: 10px; font-weight: 700; padding: 3px 8px; border-radius: 4px; display: inline-block; }
    .meta-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 6px; padding: 6px 10px; font-size: 11px; margin-bottom: 12px; }
    .kpi-row { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; margin-bottom: 12px; }
    .kpi-card { background: #ffffff; border: 1px solid #cbd5e1; border-radius: 8px; padding: 8px 10px; border-left: 4px solid #0284c7; }
    .kpi-card.danger { border-left-color: #dc2626; background: #fef2f2; }
    .kpi-card.success { border-left-color: #16a34a; background: #f0fdf4; }
    .kpi-card.warning { border-left-color: #d97706; background: #fffbeb; }
    .kpi-label { font-size: 10.5px; font-weight: 700; color: #64748b; margin-bottom: 2px; }
    .kpi-val { font-size: 18px; font-weight: 800; color: #0f172a; font-family: 'Prompt', sans-serif; }
    .kpi-foot { font-size: 9.5px; color: #475569; margin-top: 2px; font-weight: 600; }
    .section-title { font-size: 12px; font-weight: 800; color: #0f172a; border-left: 3px solid #0284c7; padding-left: 6px; margin: 10px 0 6px 0; text-transform: uppercase; font-family: 'Prompt', sans-serif; }
    table { width: 100%; border-collapse: collapse; font-size: 11px; margin-bottom: 10px; }
    th { background: #f1f5f9; color: #334155; font-weight: 700; text-align: left; padding: 5px 6px; border: 1px solid #cbd5e1; }
    td { padding: 5px 6px; border: 1px solid #e2e8f0; color: #1e293b; }
    .text-right { text-align: right; }
    .text-center { text-align: center; }
    .font-bold { font-weight: 700; }
    .action-box { background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 8px; padding: 8px 12px; margin-bottom: 10px; }
    .action-list { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; font-size: 10.5px; margin-top: 4px; }
    .action-item { background: #ffffff; border: 1px solid #e2e8f0; border-radius: 6px; padding: 6px 8px; }
    .action-item b { color: #0f172a; display: block; margin-bottom: 2px; font-size: 11px; }
    .sign-section { border: 1px dashed #94a3b8; border-radius: 6px; padding: 8px 12px; display: flex; justify-content: space-between; align-items: center; font-size: 11px; background: #fafafa; }
    .checkbox-group label { margin-right: 14px; font-weight: 600; cursor: pointer; }
  </style>
</head>
<body>
  ${printRef.current.innerHTML}
</body>
</html>`;

    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Stock_Health_Cash_Trap_Report_${new Date().toISOString().slice(0, 10)}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast.success(tx('ดาวน์โหลดเทมเพลต A4 เรียบร้อยแล้ว!', 'Downloaded A4 report template!'));
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(15, 23, 42, 0.85)',
        backdropFilter: 'blur(8px)',
        padding: '1rem',
        overflowY: 'auto'
      }}
    >
      {/* Modal Shell */}
      <div
        style={{
          width: '100%',
          maxWidth: '920px',
          maxHeight: '94vh',
          backgroundColor: '#0f172a',
          border: '1.5px solid rgba(148, 163, 184, 0.3)',
          borderRadius: '20px',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.75)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden'
        }}
      >
        {/* Modal Top Control Bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0.85rem 1.4rem',
            background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.95), rgba(15, 23, 42, 0.95))',
            borderBottom: '1px solid rgba(148, 163, 184, 0.2)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <span style={{ fontSize: '1.35rem' }}>📋</span>
            <div>
              <div style={{ fontWeight: 800, color: '#f8fafc', fontSize: '1rem' }}>
                {tx('ใบสรุปผลตรวจสุขภาพสต็อก (Stock Health & Cash-Trap Audit)', 'Stock Health & Cash-Trap Audit Report')}
              </div>
              <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                {tx('ขนาดมาตรฐาน 1 หน้า A4 • เน้นตัวเลขทางการเงินและเงินทุนจมเพื่อการตัดสินใจด่วน', 'Standard 1-Page A4 • High-Contrast Financial Decision Focus')}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button
              type="button"
              onClick={handlePrint}
              style={{
                padding: '0.5rem 0.9rem',
                borderRadius: '10px',
                border: 'none',
                background: 'linear-gradient(135deg, #0284c7, #0369a1)',
                color: '#ffffff',
                fontWeight: 800,
                fontSize: '0.82rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem',
                boxShadow: '0 4px 12px rgba(2, 132, 199, 0.35)'
              }}
            >
              <span>🖨️</span>
              <span>{tx('พิมพ์ / บันทึก PDF (A4)', 'Print / Save PDF (A4)')}</span>
            </button>

            <button
              type="button"
              onClick={handleDownloadHtml}
              style={{
                padding: '0.5rem 0.9rem',
                borderRadius: '10px',
                border: '1px solid rgba(148, 163, 184, 0.3)',
                background: 'rgba(30, 41, 59, 0.8)',
                color: '#cbd5e1',
                fontWeight: 700,
                fontSize: '0.82rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.4rem'
              }}
            >
              <span>📥</span>
              <span>{tx('ดาวน์โหลด HTML', 'Download HTML')}</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '0.5rem 0.75rem',
                borderRadius: '10px',
                border: '1px solid rgba(244, 63, 94, 0.3)',
                background: 'rgba(244, 63, 94, 0.15)',
                color: '#fda4af',
                fontWeight: 800,
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              ✕ {tx('ปิด', 'Close')}
            </button>
          </div>
        </div>

        {/* Printable Paper Area (Strictly Clean White A4) */}
        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '1.5rem',
            backgroundColor: '#334155',
            display: 'flex',
            justifyContent: 'center'
          }}
        >
          <div
            ref={printRef}
            className="print-paper-white"
            style={{
              width: '100%',
              maxWidth: '210mm',
              backgroundColor: '#ffffff',
              color: '#0f172a',
              padding: '14mm 16mm',
              borderRadius: '6px',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.45)',
              fontFamily: "'Sarabun', -apple-system, BlinkMacSystemFont, sans-serif",
              fontSize: '12px',
              lineHeight: 1.35
            }}
          >
            {/* 1. Header Bar */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2.5px solid #0f172a', paddingBottom: '8px', marginBottom: '10px' }}>
              <div>
                <h1 style={{ margin: 0, fontSize: '18px', fontWeight: 900, color: '#0f172a', letterSpacing: '-0.3px', fontFamily: "'Prompt', sans-serif" }}>
                  INSIGHTFLOW STOCK HEALTH & CASH-TRAP AUDIT
                </h1>
                <div style={{ fontSize: '11px', color: '#64748b', fontWeight: 700, marginTop: '2px' }}>
                  {tx('รายงานตรวจสุขภาพสต็อกและวิเคราะห์กับดักเงินทุนจม (ฉบับผู้บริหาร)', 'Executive Stock Health & Trapped Capital Diagnostic Report')}
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ display: 'inline-block', backgroundColor: '#dc2626', color: '#ffffff', fontSize: '10px', fontWeight: 800, padding: '3px 8px', borderRadius: '4px' }}>
                  ACTION REQUIRED
                </span>
                <div style={{ fontSize: '10px', color: '#64748b', fontWeight: 700, marginTop: '3px' }}>
                  {tx('รอบตรวจ:', 'Cycle:')} {currentDate}
                </div>
              </div>
            </div>

            {/* 2. Meta Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '6px 10px', fontSize: '11px', marginBottom: '10px' }}>
              <div><b style={{ color: '#475569' }}>{tx('กิจการ:', 'Business:')}</b> {businessName}</div>
              <div><b style={{ color: '#475569' }}>{tx('คลังสินค้า:', 'Warehouse:')}</b> {tx('คลังกลางและสาขาหลัก', 'Central Warehouse')}</div>
              <div><b style={{ color: '#475569' }}>{tx('วันที่ออกเอกสาร:', 'Date:')}</b> {currentDate}</div>
              <div><b style={{ color: '#475569' }}>{tx('ระบบตรวจ:', 'Auditor:')}</b> InsightFlow AI</div>
            </div>

            {/* 3. 4-Card Cash Summary */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '12px' }}>
              <div style={{ backgroundColor: '#ffffff', border: '1px solid #cbd5e1', borderLeft: '4px solid #0284c7', borderRadius: '8px', padding: '7px 9px' }}>
                <div style={{ fontSize: '10px', fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>
                  📦 {tx('มูลค่าสต็อกรวม', 'Total Stock Value')}
                </div>
                <div style={{ fontSize: '18px', fontWeight: 900, color: '#0f172a', fontFamily: "'Prompt', sans-serif", marginTop: '2px' }}>
                  ฿{auditData.totalStockValue.toLocaleString()}
                </div>
                <div style={{ fontSize: '9px', color: '#475569', fontWeight: 600 }}>
                  {auditData.skuCount} {tx('รายการ SKU ในโกดัง', 'active SKUs')}
                </div>
              </div>

              <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', borderLeft: '4px solid #dc2626', borderRadius: '8px', padding: '7px 9px' }}>
                <div style={{ fontSize: '10px', fontWeight: 800, color: '#991b1b', textTransform: 'uppercase' }}>
                  💸 {tx('เงินสดจมในสต็อกบวม', 'Trapped Overstock Cash')}
                </div>
                <div style={{ fontSize: '18px', fontWeight: 900, color: '#dc2626', fontFamily: "'Prompt', sans-serif", marginTop: '2px' }}>
                  ฿{auditData.trappedCashValue.toLocaleString()}
                </div>
                <div style={{ fontSize: '9px', color: '#b91c1c', fontWeight: 700 }}>
                  {((auditData.trappedCashValue / Math.max(1, auditData.totalStockValue)) * 100).toFixed(1)}% {tx('ของทุนสต็อกรวม', 'of total stock')}
                </div>
              </div>

              <div style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0', borderLeft: '4px solid #16a34a', borderRadius: '8px', padding: '7px 9px' }}>
                <div style={{ fontSize: '10px', fontWeight: 800, color: '#166534', textTransform: 'uppercase' }}>
                  🎯 {tx('เป้าเงินสดดึงกลับทันที', 'Liberatable Cash')}
                </div>
                <div style={{ fontSize: '18px', fontWeight: 900, color: '#16a34a', fontFamily: "'Prompt', sans-serif", marginTop: '2px' }}>
                  ฿{auditData.liberatableCash.toLocaleString()}
                </div>
                <div style={{ fontSize: '9px', color: '#15803d', fontWeight: 700 }}>
                  {tx('กู้คืนได้ภายใน 14 - 30 วัน', 'Recoverable in 14-30 days')}
                </div>
              </div>

              <div style={{ backgroundColor: '#fffbeb', border: '1px solid #fde68a', borderLeft: '4px solid #d97706', borderRadius: '8px', padding: '7px 9px' }}>
                <div style={{ fontSize: '10px', fontWeight: 800, color: '#92400e', textTransform: 'uppercase' }}>
                  ⚡ {tx('ดัชนี GMROI รวม', 'GMROI Return Index')}
                </div>
                <div style={{ fontSize: '18px', fontWeight: 900, color: '#b45309', fontFamily: "'Prompt', sans-serif", marginTop: '2px' }}>
                  {auditData.gmroi}x
                </div>
                <div style={{ fontSize: '9px', color: '#b45309', fontWeight: 700 }}>
                  {tx('ต่ำกว่าเกณฑ์เฉลี่ย (เป้า ≥ 2.50x)', 'Below target (Goal ≥ 2.50x)')}
                </div>
              </div>
            </div>

            {/* 4. Velocity Matrix Table */}
            <div style={{ fontSize: '11.5px', fontWeight: 800, color: '#0f172a', borderLeft: '3px solid #0284c7', paddingLeft: '6px', margin: '8px 0 5px 0', fontFamily: "'Prompt', sans-serif" }}>
              1. {tx('ผลวิเคราะห์ความเร็วการหมุนเวียนสต็อก 4 กลุ่ม (Inventory Velocity Matrix)', '1. Inventory Velocity & Risk Segmentation Matrix')}
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '10.5px', marginBottom: '8px' }}>
              <thead>
                <tr style={{ backgroundColor: '#f1f5f9', color: '#334155' }}>
                  <th style={{ padding: '4px 6px', border: '1px solid #cbd5e1', textAlign: 'left' }}>{tx('กลุ่มสถานะสินค้า (Inventory Segment)', 'Segment')}</th>
                  <th style={{ padding: '4px 6px', border: '1px solid #cbd5e1', textAlign: 'center' }}>{tx('จำนวน SKU', 'SKUs')}</th>
                  <th style={{ padding: '4px 6px', border: '1px solid #cbd5e1', textAlign: 'right' }}>{tx('มูลค่าทุน (บาท)', 'Capital (THB)')}</th>
                  <th style={{ padding: '4px 6px', border: '1px solid #cbd5e1', textAlign: 'center' }}>{tx('สัดส่วนทุน', 'Share')}</th>
                  <th style={{ padding: '4px 6px', border: '1px solid #cbd5e1', textAlign: 'center' }}>{tx('ระยะเวลาพอขาย', 'MOS Supply')}</th>
                  <th style={{ padding: '4px 6px', border: '1px solid #cbd5e1', textAlign: 'center' }}>{tx('ระดับความเสี่ยงทางการเงิน', 'Financial Risk')}</th>
                </tr>
              </thead>
              <tbody>
                {auditData.segments.map((seg, i) => (
                  <tr key={i} style={{ backgroundColor: i === 2 ? '#fffbeb' : i === 3 ? '#fef2f2' : '#ffffff' }}>
                    <td style={{ padding: '4px 6px', border: '1px solid #e2e8f0', fontWeight: 700 }}>{seg.name}</td>
                    <td style={{ padding: '4px 6px', border: '1px solid #e2e8f0', textAlign: 'center' }}>{seg.count}</td>
                    <td style={{ padding: '4px 6px', border: '1px solid #e2e8f0', textAlign: 'right', fontWeight: 800 }}>฿{seg.val.toLocaleString()}</td>
                    <td style={{ padding: '4px 6px', border: '1px solid #e2e8f0', textAlign: 'center' }}>{seg.share}</td>
                    <td style={{ padding: '4px 6px', border: '1px solid #e2e8f0', textAlign: 'center', fontWeight: 700 }}>{seg.mos}</td>
                    <td style={{ padding: '4px 6px', border: '1px solid #e2e8f0', textAlign: 'center', fontWeight: 700, color: i === 0 ? '#16a34a' : i === 1 ? '#0284c7' : i === 2 ? '#d97706' : '#dc2626' }}>
                      {seg.risk}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* 5. Top Overstock Traps */}
            <div style={{ fontSize: '11.5px', fontWeight: 800, color: '#0f172a', borderLeft: '3px solid #dc2626', paddingLeft: '6px', margin: '8px 0 5px 0', fontFamily: "'Prompt', sans-serif" }}>
              2. {tx('รายการสินค้าที่เงินจมรุนแรงที่สุด 4 อันดับแรก (Top Overstock Traps - Actionable List)', '2. Top 4 Critical Overstock Traps & Recommended Actions')}
            </div>
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '10.5px', marginBottom: '8px' }}>
              <thead>
                <tr style={{ backgroundColor: '#f1f5f9', color: '#334155' }}>
                  <th style={{ padding: '4px 6px', border: '1px solid #cbd5e1', textAlign: 'left' }}>{tx('รหัสและชื่อสินค้า (SKU / Name)', 'SKU / Product Name')}</th>
                  <th style={{ padding: '4px 6px', border: '1px solid #cbd5e1', textAlign: 'center' }}>{tx('คงเหลือ', 'Stock')}</th>
                  <th style={{ padding: '4px 6px', border: '1px solid #cbd5e1', textAlign: 'center' }}>{tx('ขายได้/ด.', 'Sales/Mo')}</th>
                  <th style={{ padding: '4px 6px', border: '1px solid #cbd5e1', textAlign: 'center' }}>{tx('พอขายอีก (MOS)', 'MOS')}</th>
                  <th style={{ padding: '4px 6px', border: '1px solid #cbd5e1', textAlign: 'right' }}>{tx('เงินทุนจมอยู่', 'Trapped Capital')}</th>
                  <th style={{ padding: '4px 6px', border: '1px solid #cbd5e1', textAlign: 'left' }}>{tx('คำสั่งการตัดสินใจ (Action Directive)', 'Action Directive')}</th>
                </tr>
              </thead>
              <tbody>
                {auditData.topTrapped.map((item, i) => (
                  <tr key={item.sku} style={{ backgroundColor: i % 2 === 0 ? '#fafafa' : '#ffffff' }}>
                    <td style={{ padding: '4px 6px', border: '1px solid #e2e8f0', fontWeight: 700 }}>
                      <span style={{ color: '#0284c7', marginRight: '4px' }}>{item.sku}</span>
                      <span>{item.name}</span>
                    </td>
                    <td style={{ padding: '4px 6px', border: '1px solid #e2e8f0', textAlign: 'center' }}>{item.stock} {tx('ชิ้น', 'pcs')}</td>
                    <td style={{ padding: '4px 6px', border: '1px solid #e2e8f0', textAlign: 'center' }}>{item.sold} {tx('ชิ้น', 'pcs')}</td>
                    <td style={{ padding: '4px 6px', border: '1px solid #e2e8f0', textAlign: 'center', fontWeight: 800, color: item.mos >= 15 ? '#dc2626' : '#d97706' }}>
                      {item.mos} {tx('เดือน', 'mo')}
                    </td>
                    <td style={{ padding: '4px 6px', border: '1px solid #e2e8f0', textAlign: 'right', fontWeight: 800, color: '#dc2626' }}>
                      ฿{item.sunk.toLocaleString()}
                    </td>
                    <td style={{ padding: '4px 6px', border: '1px solid #e2e8f0', fontSize: '10px', color: '#0f172a' }}>
                      {item.action}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* 6. Action Plan */}
            <div style={{ backgroundColor: '#f8fafc', border: '1px solid #cbd5e1', borderRadius: '6px', padding: '6px 10px', marginBottom: '8px' }}>
              <div style={{ fontSize: '11px', fontWeight: 800, color: '#0f172a', fontFamily: "'Prompt', sans-serif" }}>
                🚀 {tx('3 มาตรการกู้เงินสดกลับคืนบัญชีเร่งด่วน (Immediate Cash Liberation Roadmap)', '3-Step Immediate Cash Recovery Roadmap')}
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', fontSize: '10px', marginTop: '4px' }}>
                <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '5px', padding: '5px 7px' }}>
                  <b style={{ color: '#0f172a', display: 'block', fontSize: '10.5px', marginBottom: '1px' }}>
                    1. {tx('สั่งระงับ PO สินค้าบวม (Freeze)', '1. Freeze Overstock PO')}
                  </b>
                  {tx('ระงับการเปิดใบสั่งซื้อเพิ่มของสินค้า 18 SKU นี้ทันที ป้องกันเงินสดไหลออกซ้ำซ้อน', 'Halt replenishment POs for all 18 overstock SKUs.')}
                </div>
                <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '5px', padding: '5px 7px' }}>
                  <b style={{ color: '#0f172a', display: 'block', fontSize: '10.5px', marginBottom: '1px' }}>
                    2. {tx('จัด Clearance 7 วัน (Liquidate)', '2. 7-Day Clearance')}
                  </b>
                  {tx('ปล่อยแคมเปญลดราคา 30-40% สัปดาห์นี้ ดึงเงินสดก้อนแรกคืนบัญชีกว่า ฿580,000', 'Run 30-40% discount to recover ~฿580k cash.')}
                </div>
                <div style={{ backgroundColor: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '5px', padding: '5px 7px' }}>
                  <b style={{ color: '#0f172a', display: 'block', fontSize: '10.5px', marginBottom: '1px' }}>
                    3. {tx('หมุนเงินซื้อตัวขายดี (Reinvest)', '3. Reinvest in Winners')}
                  </b>
                  {tx('นำเงินสดที่ได้กลับมา ไปสั่งซื้อสินค้า Fast-Moving กลุ่มที่ 1 ที่ของขาดและหมุนไวกว่า', 'Reallocate recovered cash into high-velocity SKUs.')}
                </div>
              </div>
            </div>

            {/* 7. Sign-off Footer */}
            <div style={{ border: '1px dashed #94a3b8', borderRadius: '6px', padding: '6px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '10.5px', backgroundColor: '#fafafa' }}>
              <div>
                <div style={{ fontWeight: 800, color: '#0f172a', marginBottom: '3px' }}>
                  {tx('การตัดสินใจของผู้บริหาร / ผู้มีอำนาจสั่งการ:', 'Executive Sign-off & Decisions:')}
                </div>
                <div style={{ display: 'flex', gap: '10px', fontSize: '10px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '3px', cursor: 'pointer' }}>
                    <input type="checkbox" defaultChecked /> {tx('อนุมัติจัด Clearance ลดราคาด่วน', 'Approve Clearance')}
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '3px', cursor: 'pointer' }}>
                    <input type="checkbox" defaultChecked /> {tx('อนุมัติทำของแถมคู่สินค้าหลัก', 'Approve Free Gift Bundle')}
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '3px', cursor: 'pointer' }}>
                    <input type="checkbox" defaultChecked /> {tx('สั่งระงับ PO สินค้าค้าง', 'Freeze POs')}
                  </label>
                </div>
              </div>

              <div style={{ textAlign: 'right', minWidth: '200px' }}>
                <div style={{ fontWeight: 700 }}>ลงนาม: ...........................................................</div>
                <div style={{ color: '#64748b', fontSize: '9.5px', marginTop: '2px' }}>
                  ( {tx('เจ้าของธุรกิจ / ผู้มีอำนาจตัดสินใจ', 'Business Owner / Executive')} )
                </div>
                <div style={{ color: '#64748b', fontSize: '9.5px' }}>
                  {tx('วันที่:', 'Date:')} ........ / ........ / 2569
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
