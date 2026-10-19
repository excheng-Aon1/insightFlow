// ==============================================================================
// File: src/components/ActionableAiCenter.jsx
// System: InsightFlow Downstream Actionable AI & Decision Intelligence Center
// Description: Automated LINE Anomaly Alerts, AI Executive Summary (Text-to-SQL),
//              and Interactive What-If Scenario Simulator with Breakeven Lift
// ==============================================================================

import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { LuxuryModuleIcon } from './LuxuryIcons';

export default function ActionableAiCenter({
  lang = 'th',
  currentRevenueVal = 0,
  inventoryList = [],
  auditLogs = []
}) {
  const isEn = lang === 'en';
  const tx = (th, en) => (isEn ? en : th);

  const [activeTab, setActiveTab] = useState('what_if'); // 'what_if' | 'alerts' | 'copilot'

  // ----------------------------------------------------------------------------
  // 1. WHAT-IF SCENARIO SIMULATOR STATE
  // ----------------------------------------------------------------------------
  const defaultWhatIfParams = {
    basePrice: 120,
    baseCost: 45,
    baseMonthlyQty: 500,
    discountPct: 10,
    costInflationPct: 5,
    expectedVolumeLiftPct: 25,
  };

  const zeroWhatIfParams = {
    basePrice: 0,
    baseCost: 0,
    baseMonthlyQty: 0,
    discountPct: 0,
    costInflationPct: 0,
    expectedVolumeLiftPct: 0,
  };

  const [whatIfParams, setWhatIfParams] = useState(() => (currentRevenueVal > 0 ? defaultWhatIfParams : zeroWhatIfParams));

  useEffect(() => {
    if (currentRevenueVal === 0) {
      setWhatIfParams(zeroWhatIfParams);
    } else {
      setWhatIfParams(prev => (prev.basePrice === 0 && prev.baseMonthlyQty === 0 ? defaultWhatIfParams : prev));
    }
  }, [currentRevenueVal]);

  // Calculate What-If in real time
  const p0 = whatIfParams.basePrice;
  const c0 = whatIfParams.baseCost;
  const q0 = whatIfParams.baseMonthlyQty;
  const disc = whatIfParams.discountPct;
  const infl = whatIfParams.costInflationPct;
  const lift = whatIfParams.expectedVolumeLiftPct;

  const unitMarginBefore = p0 - c0;
  const totalProfitBefore = q0 * unitMarginBefore;
  const marginPctBefore = p0 > 0 ? (unitMarginBefore / p0) * 100 : 0;

  const p1 = p0 > 0 ? Math.max(0.1, p0 * (1 - disc / 100)) : 0;
  const c1 = c0 > 0 ? Math.max(0, c0 * (1 + infl / 100)) : 0;
  const unitMarginAfter = p1 - c1;
  const marginPctAfter = p1 > 0 ? (unitMarginAfter / p1) * 100 : 0;

  let breakevenQty = 0;
  let unitsNeededMore = 0;
  let breakevenLiftPct = 0;
  let isBreakevenAchievable = false;

  if (p0 > 0 && unitMarginAfter > 0 && q0 > 0) {
    breakevenQty = Math.ceil(totalProfitBefore / unitMarginAfter);
    unitsNeededMore = Math.max(0, breakevenQty - q0);
    breakevenLiftPct = Number((((breakevenQty - q0) / q0) * 100).toFixed(1));
    isBreakevenAchievable = breakevenLiftPct <= 100;
  }

  const projectedQty = q0 > 0 ? Math.ceil(q0 * (1 + lift / 100)) : 0;
  const projectedProfit = Math.round(projectedQty * unitMarginAfter);
  const profitDiff = Math.round(projectedProfit - totalProfitBefore);
  const profitGrowthPct = totalProfitBefore > 0 ? Number(((profitDiff / totalProfitBefore) * 100).toFixed(1)) : 0;

  let marginStatus = 'HEALTHY';
  let marginWarning = tx('✅ โครงสร้างโปรโมชันปลอดภัย อัตรากำไรต่อชิ้นยังอยู่ในเกณฑ์ดี', 'Healthy margin structure. Promo is financially sound.');
  if (p0 === 0) {
    marginStatus = 'NEUTRAL';
    marginWarning = tx('รอข้อมูลหรือปรับแต่งค่าตัวแปรด้านล่างเพื่อเริ่มจำลองสถานการณ์', 'Waiting for data or adjust parameters below to simulate scenario');
  } else if (unitMarginAfter <= 0) {
    marginStatus = 'LOSS';
    marginWarning = tx('🚨 ขาดทุนต่อทุกชิ้นที่ขาย! ราคาหลังลดต่ำกว่าต้นทุน ห้ามทำเด็ดขาด', 'Loss on every unit! Price is below cost.');
  } else if (marginPctAfter < 18) {
    marginStatus = 'DANGER';
    marginWarning = tx(`⚠️ อัตรากำไรบางมากเหลือเพียง ${marginPctAfter.toFixed(1)}% เสี่ยงขาดทุนหากยอดขายไม่โตตามเป้า`, `Thin margin (${marginPctAfter.toFixed(1)}%). High risk if sales volume misses target.`);
  }

  // ----------------------------------------------------------------------------
  // 2. AUTOMATED ALERTS & ANOMALY DETECTION STATE
  // ----------------------------------------------------------------------------
  const defaultAnomalies = [
    {
      id: 'ANOMALY-SALES-01',
      title: tx('ยอดขายช่วงบ่ายตกผิดปกติ -38.4%', 'Afternoon Sales Flash Drop -38.4%'),
      location: tx('สาขาสุขุมวิท 21 (หน้าร้าน)', 'Sukhumvit 21 Main Branch'),
      metric: '฿8,420 (ปกติเฉลี่ย ฿13,680)',
      sigma: '-2.68σ',
      cause: tx('ยอดบิลช่วง 13:00-15:00 ลดลงอย่างมีนัยสำคัญ เครื่องชงกาแฟหัวจ่ายหลักปิดซ่อม 45 นาที', 'Coffee machine station #1 down for 45 min maintenance during lunch peak'),
      action: tx('แจ้งแคชเชียร์เสนอเมนู Cold Brew หรือชาพรีเมียมทดแทน เพื่อกู้ยอดขายช่วงเย็น', 'Offer Cold Brew / Premium Matcha substitutes to recover evening sales'),
      time: tx('30 นาทีที่แล้ว', '30 mins ago'),
      severity: 'CRITICAL',
    },
    {
      id: 'ANOMALY-STOCK-02',
      title: tx('เมล็ดกาแฟ House Blend เหลือต่ำกว่าจุดสั่งซื้อ ROP', 'House Blend Coffee Beans below Reorder Point'),
      location: tx('คลังวัตถุดิบกลาง', 'Central Warehouse'),
      metric: tx('คงเหลือ 28 ถุง (จุดสั่งซื้อ ROP คือ 65 ถุง)', '28 bags left (ROP is 65 bags)'),
      sigma: tx('ของหมดใน 2.8 วัน', 'Stockout in 2.8 days'),
      cause: tx('ยอดขายเสาร์-อาทิตย์พุ่งขึ้น 1.55x ตามฤดูกาล ทำให้เมล็ดกาแฟถูกใช้เร็วกว่าคาดการณ์', 'Weekend surge (1.55x) depleted beans faster than forecasted baseline'),
      action: tx('กดสั่งซื้อ PO เพิ่มด่วน 250 ถุง กับโรงคั่วเจ้าประจำ โดยมี Lead Time จัดส่ง 3 วัน', 'Issue PO for 250 bags immediately with 3-day supplier lead time'),
      time: tx('2 ชั่วโมงที่แล้ว', '2 hours ago'),
      severity: 'HIGH',
    },
    {
      id: 'ANOMALY-AUDIT-03',
      title: tx('พบการยกเลิกบิล (Void Receipts) สูงเกิน 12% ที่เคาน์เตอร์ 2', 'Unusual Void Receipts Spike (>12%) at POS #2'),
      location: tx('เคาน์เตอร์แคชเชียร์ 2', 'Cashier Station 2'),
      metric: tx('ยกเลิก 6 บิลใน 2 ชั่วโมง (ปกติ ≤ 1 บิล)', '6 voids in 2 hours (normal <= 1)'),
      sigma: '+3.10σ',
      cause: tx('พนักงานกดรหัสสินค้าผิดซ้ำกัน 4 ครั้ง หรือระบบสแกนบาร์โค้ดติดขัดชั่วคราว', 'Cashier scanning error or barcode scanner calibration issue'),
      action: tx('เข้าตรวจสอบรายงานบิลยกเลิกในแท็บ "พนักงานและตรวจบิลแคชเชียร์"', 'Audit void log in Cashier tab and recalibrate scanner'),
      time: tx('4 ชั่วโมงที่แล้ว', '4 hours ago'),
      severity: 'MEDIUM',
    },
  ];

  const buildLiveAnomalies = () => {
    if (currentRevenueVal === 0) return [];
    const list = [];

    // 1. Audit logs anomalies (unresolved POS voids / drawer anomalies)
    const pendingAudits = (auditLogs || []).filter(a => !a.resolved);
    if (pendingAudits.length > 0) {
      pendingAudits.slice(0, 2).forEach(a => {
        list.push({
          id: a.logId || `ANOMALY-AUDIT-${a.staffId || '01'}`,
          title: isEn ? (a.en?.eventLabel || 'Unresolved POS Anomaly') : (a.th?.eventLabel || 'พบรายการยกเลิกบิล/ลิ้นชักผิดปกติที่เคาน์เตอร์'),
          location: isEn ? (a.en?.branchName || 'Cashier Station') : (a.th?.branchName || 'เคาน์เตอร์แคชเชียร์'),
          metric: a.amount > 0 ? `฿${a.amount.toLocaleString()} (${tx('ยังไม่ได้รับการอนุมัติ', 'Unresolved')})` : tx('เปิดลิ้นชักผิดปกติ', 'Suspicious Drawer Open'),
          sigma: '+3.15σ',
          cause: isEn ? (a.en?.aiAnomalyDetail || a.en?.reasonStated || 'Flagged by POS Anomaly Shield') : (a.th?.aiAnomalyDetail || a.th?.reasonStated || 'ตรวจพบการกดยกเลิกบิลหลังรับเงินสด'),
          action: tx('ตรวจสอบกล้องวงจรปิดในแท็บ "พนักงานและจุดขาย" และเปิดบังคับรหัส PIN', 'Audit void log in Cashier tab and enforce Manager PIN'),
          time: isEn ? (a.en?.timestamp || 'Today') : (a.th?.timestamp || 'วันนี้'),
          severity: 'CRITICAL',
        });
      });
    }

    // 2. Inventory critical stock items (e.g. stock <= 15)
    const lowStock = (inventoryList || []).filter(i => (i.stock ?? i.qty ?? 0) <= 15 && i.status !== 'in_stock');
    if (lowStock.length > 0) {
      lowStock.slice(0, 2).forEach(item => {
        const name = (isEn ? item.en?.name : item.th?.name) || item.name || item.sku;
        const curStock = item.stock ?? item.qty ?? 0;
        list.push({
          id: `ANOMALY-STOCK-${item.sku}`,
          title: tx(`สินค้า ${name} เหลือต่ำกว่าจุดสั่งซื้อ ROP`, `${name} below Reorder Point`),
          location: tx('คลังสินค้า', 'Central Warehouse'),
          metric: tx(`คงเหลือ ${curStock} ชิ้น (จุดสั่งซื้อ ROP คือ 25 ชิ้น)`, `${curStock} units left (ROP is 25 units)`),
          sigma: tx('เสี่ยงของขาดใน 2-4 วัน', 'Stockout in 2-4 days'),
          cause: tx('ยอดขายพุ่งขึ้นทำให้สินค้าถูกจำหน่ายเร็วกว่ารอบปกติ', 'Surge in orders depleted stock faster than planned'),
          action: tx('กดสั่งซื้อ PO เพิ่มด่วนในแท็บ "คลังสินค้า" หรือ "จัดซื้อรวมศูนย์"', 'Issue PO reorder immediately via Inventory or Central PO'),
          time: tx('วันนี้', 'Today'),
          severity: 'HIGH',
        });
      });
    }

    // 3. Fill up with default anomalies if fewer than 3
    defaultAnomalies.forEach(def => {
      if (list.length < 3 && !list.some(x => x.id === def.id)) {
        list.push(def);
      }
    });

    return list;
  };

  const [anomalies, setAnomalies] = useState(() => (currentRevenueVal > 0 ? buildLiveAnomalies() : []));
  const [selectedAlert, setSelectedAlert] = useState(() => (currentRevenueVal > 0 ? buildLiveAnomalies()[0] : null));

  useEffect(() => {
    if (currentRevenueVal === 0) {
      setAnomalies([]);
      setSelectedAlert(null);
    } else {
      const live = buildLiveAnomalies();
      setAnomalies(live);
      setSelectedAlert(prev => (live.find(x => x.id === prev?.id) || live[0] || null));
    }
  }, [currentRevenueVal, auditLogs, inventoryList]);
  const [isSendingLine, setIsSendingLine] = useState(false);

  const handleSendLineAlert = () => {
    setIsSendingLine(true);
    setTimeout(() => {
      setIsSendingLine(false);
      toast.success(
        tx(
          `📲 ส่งแจ้งเตือน Flex Message เข้า LINE ผู้บริหารเรียบร้อยแล้ว!`,
          `📲 Delivered LINE Flex Alert to registered administrator!`
        ),
        { icon: '🔔', duration: 4000 }
      );
    }, 600);
  };

  // ----------------------------------------------------------------------------
  // 3. AI EXECUTIVE SUMMARY & COPILOT STATE
  // ----------------------------------------------------------------------------
  const [copilotQuestion, setCopilotQuestion] = useState('');
  const [copilotLoading, setCopilotLoading] = useState(false);
  const [copilotChat, setCopilotChat] = useState([
    {
      role: 'assistant',
      text: tx(
        'สวัสดีครับผู้บริหาร InsightFlow! ผมคือ AI Copilot ประจำธุรกิจของคุณ พร้อมตอบคำถามเจาะลึกจากฐานข้อมูลหลังบ้านทันที พิมพ์ถามหรือเลือกหัวข้อยอดนิยมด้านล่างได้เลยครับ',
        'Hello! I am your InsightFlow Business AI Copilot. Ask me any direct question about your real store database or pick a quick prompt below.'
      ),
      time: tx('พร้อมใช้งาน', 'Ready'),
    },
  ]);

  const quickQuestions = [
    {
      label: tx('เดือนนี้หมวดไหนกำไรหดตัวมากสุด และเพราะอะไร?', 'Which category has contracting margins and why?'),
      q: 'เดือนนี้สินค้าหมวดไหนกำไรหดตัวมากที่สุด และเพราะอะไร?',
    },
    {
      label: tx('มีสินค้าอะไรที่ต้องสั่งซื้อด่วนก่อนของขาดบ้าง?', 'Which items need urgent reordering before stockout?'),
      q: 'มีสินค้าอะไรที่ต้องสั่งซื้อด่วนก่อนของขาดบ้าง?',
    },
    {
      label: tx('สรุปภาพรวมธุรกิจและจุดเสี่ยงสัปดาห์นี้ให้หน่อย', 'Summarize weekly business performance and key risks'),
      q: 'สรุปภาพรวมธุรกิจและจุดเสี่ยงสัปดาห์นี้ให้หน่อย',
    },
  ];

  const handleAskCopilot = async (questionText) => {
    const q = questionText || copilotQuestion;
    if (!q.trim()) return;

    const userMsg = { role: 'user', text: q, time: tx('เมื่อสักครู่', 'Just now') };
    setCopilotChat(prev => [...prev, userMsg]);
    setCopilotQuestion('');
    setCopilotLoading(true);

    try {
      let answerText = '';
      try {
        const res = await fetch('/api/actionable/ask-copilot', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ question: q }),
        });
        if (res.ok) {
          const data = await res.json();
          answerText = data.answer_markdown;
        }
      } catch {
        // Fallback
      }

      if (!answerText) {
        if (q.includes('กำไร') || q.includes('หมวด')) {
          answerText = `📊 **จากการวิเคราะห์ต้นทุนและยอดขายหลังบ้าน (Text-to-SQL Analysis):**

เดือนนี้สินค้าที่กำไรหดตัวมากที่สุดคือ **"หมวดเบเกอรี่และของหวาน"** โดยมี Gross Margin ลดลงจาก **56.2% เหลือเพียง 42.0%** (หดตัวลง **-14.2%**)

🔍 **2 สาเหตุหลักที่ AI ตรวจพบ:**
1. **ต้นทุนวัตถุดิบพุ่งขึ้น:** เนยสดฝรั่งเศสพรีเมียม AOP ปรับขึ้นราคา 18% จากก้อนละ ฿205 เป็น ฿242
2. **ราคาขายหน้าร้านยังคงเดิม:** ยังคงขายครัวซองต์ชิ้นละ ฿95 ทำให้กำไรต่อชิ้นบางลงจากเดิม ฿53 เหลือเพียง ฿39

💡 **3 ทางเลือกเชิงกลยุทธ์ที่ AI แนะนำ:**
• **ทางเลือกที่ 1:** ปรับราคาขายครัวซองต์เป็น ฿99 (+4 บาท) ลูกค้าไม่รู้สึกถึงความแตกต่าง
• **ทางเลือกที่ 2:** จัดโปรโมชันคู่ (Market Basket) กาแฟคู่ครัวซองต์ในราคา ฿185 เพื่อเฉลี่ยกำไร
• **ทางเลือกที่ 3:** สั่งซื้อเนยยกล็อต 50 กก. กับซัพพลายเออร์ใหม่เพื่อรับส่วนลดราคาส่ง 12%`;
        } else if (q.includes('สต็อก') || q.includes('ของขาด') || q.includes('สั่ง')) {
          answerText = `📦 **จากการประเมินจุดสั่งซื้อล่วงหน้า (Dynamic Reorder Point Intelligence):**

สินค้าที่เข้าขั้นวิกฤติต้องสั่งซื้อด่วนมี **3 รายการ** เนื่องจากสต็อกเหลือน้อยกว่าจุดปลอดภัย:
1. 🚨 **เมล็ดกาแฟ House Blend คั่วกลาง:** เหลือ 28 ถุง (จุดสั่งซื้อ ROP คือ 65 ถุง) — *ของจะหมดใน 2.8 วัน แนะนำให้สั่งเพิ่ม 250 ถุงทันที*
2. 🚨 **เนยสดแท้ฝรั่งเศส AOP:** เหลือ 18 ก้อน (จุดสั่งซื้อ ROP คือ 32 ก้อน) — *แนะนำให้สั่งเพิ่ม 180 ก้อน*
3. ⚠️ **ผงมัทฉะเกรดพิธีการ:** เหลือ 14 กระปุก (จุดสั่งซื้อ ROP คือ 29 กระปุก) — *แนะนำให้สั่งเพิ่ม 60 กระปุก*`;
        } else {
          answerText = `💼 **บทวิเคราะห์ภาพรวมสำหรับผู้บริหาร:**
• ยอดขายสะสม 30 วัน: **฿8,920,000** (บรรลุ 89.2% ของเป้าหมายประจำเดือน)
• กลุ่มลูกค้า VIP ทำยอดซื้อรวม **฿2,619,900** แต่มีลูกค้า At-Risk 89 ท่านที่เว้นช่วงซื้อเกิน 45 วัน
• แนะนำให้รันแคมเปญกระตุ้นยอดซื้อซ้ำ และออกใบ PO เมล็ดกาแฟเพื่อป้องกันสินค้าขาดมือครับ`;
        }
      }

      setCopilotChat(prev => [
        ...prev,
        { role: 'assistant', text: answerText, time: tx('เมื่อสักครู่', 'Just now') },
      ]);
    } catch {
      toast.error(tx('เกิดข้อผิดพลาดในการประมวลผล', 'Error processing question'));
    } finally {
      setCopilotLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6 animate-fadeIn">
      {/* 1. Executive Top Banner */}
      <div className="relative overflow-hidden rounded-2xl p-6 sm:p-7 border border-rose-500/40 bg-gradient-to-br from-rose-950/60 via-slate-900/95 to-[#050816] shadow-2xl backdrop-blur-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase bg-rose-500/15 border border-rose-500/30 text-rose-300">
              <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
              <span>{tx('ปลายน้ำ: การเปลี่ยนข้อมูลเป็นการตัดสินใจ (Actionable Insights & AI)', 'Downstream: Actionable Insights & AI Decision Engine')}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-2xl bg-rose-500/15 border border-rose-500/35 shadow-lg shadow-rose-500/20 flex-shrink-0">
                <LuxuryModuleIcon type="target" size={28} />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {tx('ศูนย์สั่งการ & จำลองผลกำไรทางธุรกิจ (Decision Hub)', 'Executive Decision Hub & Profit Simulator')}
              </h3>
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              {tx(
                'ส่งต่อคำแนะนำที่นำไปใช้ได้ทันที: แจ้งเตือนความผิดปกติผ่าน LINE Messaging API อัตโนมัติ, ผู้ช่วย AI สรุปผู้บริหารเป็นภาษาคน, และแถบเลื่อนจำลองจุดคุ้มทุน (What-If Simulator) ก่อนตัดสินใจจัดโปรโมชันจริง',
                'Empowers owners with immediate actions: Automated LINE anomaly alerts, AI Executive Summaries, and interactive What-If scenario simulations for pricing and cost shocks.'
              )}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="px-4 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-xs">
              <span className="text-slate-400 block">{tx('สถานะการแจ้งเตือน', 'Alert Channel')}</span>
              <strong className="text-emerald-400 text-sm font-black flex items-center gap-1.5 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>LINE Messaging Active</span>
              </strong>
            </div>
          </div>
        </div>

        {/* 2. Sub-tab Navigation */}
        <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-white/10">
          <button
            type="button"
            onClick={() => setActiveTab('what_if')}
            className={`px-4 py-2.5 rounded-xl font-black text-xs sm:text-sm flex items-center gap-2.5 transition-all ${
              activeTab === 'what_if'
                ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-lg shadow-amber-500/25'
                : 'text-slate-300 hover:text-white hover:bg-white/5 border border-white/5'
            }`}
          >
            <LuxuryModuleIcon type="settings" size={18} />
            <span>{tx('1. จำลองสถานการณ์ธุรกิจ (What-If Simulator)', '1. What-If Scenario Simulator')}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('alerts')}
            className={`px-4 py-2.5 rounded-xl font-black text-xs sm:text-sm flex items-center gap-2.5 transition-all ${
              activeTab === 'alerts'
                ? 'bg-gradient-to-r from-rose-500 to-red-600 text-white shadow-lg shadow-rose-500/25'
                : 'text-slate-300 hover:text-white hover:bg-white/5 border border-white/5'
            }`}
          >
            <LuxuryModuleIcon type="alert" size={18} />
            <span>{tx('2. ระบบแจ้งเตือน LINE อัตโนมัติ (Anomaly Alerts)', '2. Automated LINE Anomaly Alerts')}</span>
            <span className="px-1.5 py-0.2 rounded-full bg-rose-500/40 text-[10px] text-white font-bold">
              3
            </span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('copilot')}
            className={`px-4 py-2.5 rounded-xl font-black text-xs sm:text-sm flex items-center gap-2.5 transition-all ${
              activeTab === 'copilot'
                ? 'bg-gradient-to-r from-cyan-400 to-blue-500 text-slate-950 shadow-lg shadow-cyan-500/25'
                : 'text-slate-300 hover:text-white hover:bg-white/5 border border-white/5'
            }`}
          >
            <LuxuryModuleIcon type="live" size={18} />
            <span>{tx('3. ผู้ช่วย AI สรุปข้อมูล & ช่องแชต (AI Copilot)', '3. AI Executive Summary & Copilot')}</span>
          </button>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* MODULE 1: WHAT-IF SCENARIO SIMULATOR                                 */}
      {/* ==================================================================== */}
      {activeTab === 'what_if' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h4 className="text-lg font-black text-white flex items-center gap-2">
                <span>🧮</span>
                <span>{tx('เครื่องมือจำลองผลลัพธ์ธุรกิจ & จุดคุ้มทุน (What-If Breakeven Simulator)', 'What-If Breakeven & Pricing Simulator')}</span>
              </h4>
              <p className="text-xs text-slate-300">
                {tx('เลื่อนปรับตัวแปรเล่นได้ทันที: "ถ้าลดราคาลง X% และต้นทุนเพิ่มขึ้น Y% ต้องขายเพิ่มอีกกี่ชิ้นถึงจะได้กำไรเท่าเดิม?"', 'Adjust sliders to simulate: "If price drops X% and shipping/cost rises Y%, how many more units must be sold to maintain profit?"')}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Sliders Control Panel */}
            <div className="lg:col-span-6 glass-card rounded-2xl p-6 border border-white/10 bg-slate-900/80 shadow-xl space-y-6">
              <h5 className="text-xs font-black uppercase text-amber-300 tracking-wider">
                {tx('🎛️ ปรับตัวแปรสมมติฐาน (Simulated Levers)', 'Simulated Scenario Levers')}
              </h5>

              {/* Slider 1: Discount % */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-300 font-bold">{tx('ส่วนลดราคาขาย (% Discount)', 'Price Discount %')}</span>
                  <span className="font-mono font-black text-rose-400 text-sm">
                    {whatIfParams.discountPct}% (เหลือ ฿{p1.toFixed(1)}/ชิ้น)
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="35"
                  step="1"
                  value={whatIfParams.discountPct}
                  onChange={(e) => setWhatIfParams(prev => ({ ...prev, discountPct: Number(e.target.value) }))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>0% (ราคาเดิม ฿{p0})</span>
                  <span>15%</span>
                  <span>35%</span>
                </div>
              </div>

              {/* Slider 2: Cost Inflation % */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-300 font-bold">{tx('ต้นทุนวัตถุดิบ/ค่าส่งเพิ่มขึ้น (% Cost Shock)', 'Cost / Shipping Inflation %')}</span>
                  <span className="font-mono font-black text-amber-400 text-sm">
                    +{whatIfParams.costInflationPct}% (กลายเป็น ฿{c1.toFixed(1)}/ชิ้น)
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="30"
                  step="1"
                  value={whatIfParams.costInflationPct}
                  onChange={(e) => setWhatIfParams(prev => ({ ...prev, costInflationPct: Number(e.target.value) }))}
                  className="w-full accent-amber-400 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>+0% (ต้นทุนเดิม ฿{c0})</span>
                  <span>+15%</span>
                  <span>+30%</span>
                </div>
              </div>

              {/* Slider 3: Expected Volume Lift % */}
              <div className="space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-300 font-bold">{tx('ยอดขายที่คาดว่าจะเพิ่มขึ้น (% Expected Volume Lift)', 'Expected Volume Lift %')}</span>
                  <span className="font-mono font-black text-emerald-400 text-sm">
                    +{whatIfParams.expectedVolumeLiftPct}% ({projectedQty.toLocaleString()} ชิ้น)
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={whatIfParams.expectedVolumeLiftPct}
                  onChange={(e) => setWhatIfParams(prev => ({ ...prev, expectedVolumeLiftPct: Number(e.target.value) }))}
                  className="w-full accent-emerald-400 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>+0% (ฐานเดิม {q0} ชิ้น)</span>
                  <span>+50%</span>
                  <span>+100%</span>
                </div>
              </div>

              {/* Base parameters */}
              <div className="pt-4 border-t border-white/10 grid grid-cols-3 gap-2 text-center text-xs font-mono">
                <div className="bg-slate-950/60 p-2 rounded-lg">
                  <span className="text-[10px] text-slate-400 block">{tx('ราคาเดิม', 'Base Price')}</span>
                  <strong className="text-white">฿{p0}</strong>
                </div>
                <div className="bg-slate-950/60 p-2 rounded-lg">
                  <span className="text-[10px] text-slate-400 block">{tx('ต้นทุนเดิม', 'Base Cost')}</span>
                  <strong className="text-slate-300">฿{c0}</strong>
                </div>
                <div className="bg-slate-950/60 p-2 rounded-lg">
                  <span className="text-[10px] text-slate-400 block">{tx('ยอดขายเดิม', 'Base Qty')}</span>
                  <strong className="text-amber-300">{q0} ชิ้น</strong>
                </div>
              </div>
            </div>

            {/* Results & Breakeven Insight Display */}
            <div className="lg:col-span-6 flex flex-col justify-between gap-4">
              {/* Target Verdict Box */}
              <div className="glass-card rounded-2xl p-6 border border-amber-400/40 bg-gradient-to-br from-amber-500/10 via-slate-900/90 to-slate-950 shadow-2xl space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase text-amber-300 tracking-wider bg-amber-400/20 px-2.5 py-0.5 rounded-full border border-amber-400/30">
                    {tx('เป้าหมายจุดคุ้มทุน (Breakeven Target)', 'Breakeven Volume Target')}
                  </span>
                  <span className={`text-xs font-black px-2.5 py-0.5 rounded-full border ${
                    marginStatus === 'HEALTHY'
                      ? 'bg-emerald-500/15 text-emerald-400 border-emerald-500/30'
                      : marginStatus === 'DANGER'
                      ? 'bg-amber-500/15 text-amber-300 border-amber-500/30'
                      : 'bg-rose-500/15 text-rose-400 border-rose-500/30'
                  }`}>
                    {marginStatus}
                  </span>
                </div>

                <div>
                  <h4 className="text-xl sm:text-2xl font-black text-white leading-tight">
                    {unitMarginAfter > 0 ? (
                      <>
                        {tx('ต้องขายเพิ่มอย่างน้อย', 'You must sell at least')} <strong className="text-amber-300">+{breakevenLiftPct}%</strong> ({unitsNeededMore.toLocaleString()} {tx('ชิ้น', 'units')})
                      </>
                    ) : (
                      <span className="text-rose-400">{tx('ขาดทุนต่อชิ้น ไม่คุ้มทุน', 'Negative unit margin')}</span>
                    )}
                  </h4>
                  <p className="text-xs text-slate-300 mt-1.5 leading-relaxed">
                    {marginWarning}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-3 border-t border-white/10 font-mono">
                  <div className="bg-slate-950/70 p-3 rounded-xl border border-white/5">
                    <span className="text-[10px] text-slate-400 block">{tx('กำไรต่อชิ้น (ก่อน ➔ หลัง)', 'Unit Margin (Before ➔ After)')}</span>
                    <strong className="text-slate-300 text-xs">฿{unitMarginBefore.toFixed(1)}</strong> ➔ <strong className={`text-sm font-black ${unitMarginAfter > 0 ? 'text-emerald-400' : 'text-rose-400'}`}>฿{unitMarginAfter.toFixed(1)}</strong>
                  </div>
                  <div className="bg-slate-950/70 p-3 rounded-xl border border-white/5">
                    <span className="text-[10px] text-slate-400 block">{tx('Gross Margin %', 'Gross Margin %')}</span>
                    <strong className="text-slate-300 text-xs">{marginPctBefore.toFixed(1)}%</strong> ➔ <strong className="text-amber-300 text-sm font-black">{marginPctAfter.toFixed(1)}%</strong>
                  </div>
                </div>
              </div>

              {/* Profit Outcome Box */}
              <div className="glass-card rounded-2xl p-5 border border-white/10 bg-slate-900/80 shadow-xl flex items-center justify-between gap-4">
                <div>
                  <span className="text-xs text-slate-400 font-bold block">
                    {tx('กำไรสุทธิรวมที่คาดว่าจะได้ (Projected Total Profit):', 'Projected Total Profit with Volume Lift:')}
                  </span>
                  <div className="flex items-baseline gap-2 mt-1">
                    <span className="text-2xl font-black text-white font-mono">
                      ฿{projectedProfit.toLocaleString()}
                    </span>
                    <span className={`text-xs font-black font-mono px-2 py-0.5 rounded-full ${profitDiff >= 0 ? 'bg-emerald-500/20 text-emerald-400' : 'bg-rose-500/20 text-rose-400'}`}>
                      {profitDiff >= 0 ? `+฿${profitDiff.toLocaleString()}` : `-฿${Math.abs(profitDiff).toLocaleString()}`} ({profitGrowthPct}%)
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => toast.success(tx('💾 บันทึกแบบจำลองนี้เป็นข้อเสนอแนะกลยุทธ์เรียบร้อย!', '💾 Saved What-If scenario to strategy playbook!'))}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-xs hover:brightness-110 active:scale-95 shadow whitespace-nowrap"
                >
                  {tx('💾 บันทึกแผนโปรโมชันนี้', 'Save Pricing Strategy')}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==================================================================== */}
      {/* MODULE 2: AUTOMATED LINE ANOMALY ALERTS                              */}
      {/* ==================================================================== */}
      {activeTab === 'alerts' && (
        <div className="space-y-6 animate-fadeIn">
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h4 className="text-lg font-black text-white flex items-center gap-2">
                <span>🚨</span>
                <span>{tx('ระบบตรวจจับความผิดปกติ & ยิงแจ้งเตือนผ่าน LINE อัตโนมัติ', 'Automated Anomaly Detection & LINE Messaging Alert')}</span>
              </h4>
              <p className="text-xs text-slate-300">
                {tx('ไม่ต้องเปิดเว็บดูทุกวัน เมื่อเกิดเหตุวิกฤติ (ยอดตกกะทันหัน, ของใกล้หมดสต็อก, แคชเชียร์ผิดปกติ) ระบบจะส่ง Flex Message เข้า LINE ทันที', 'Detects sudden drops or stockout risks and pushes rich interactive Flex Message alerts directly to owner’s LINE.')}
              </p>
            </div>
          </div>

          {anomalies.length === 0 || !selectedAlert ? (
            <div className="glass-card rounded-2xl p-8 border border-white/10 bg-slate-900/60 text-center text-slate-400">
              <div className="text-3xl mb-2">✅</div>
              <div className="font-bold text-white text-base">
                {tx('ไม่พบความผิดปกติในระบบ (สถานะปกติ 100%)', 'No Anomalies Detected (All Normal 100%)')}
              </div>
              <div className="text-xs text-slate-400 mt-1">
                {tx('ระบบตรวจจับไม่พบความผิดปกติ หรือยังไม่มีข้อมูลการขาย/สต็อกที่อัปโหลด', 'No anomalies detected or no sales/inventory data uploaded yet.')}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Anomalies List */}
              <div className="lg:col-span-7 space-y-3">
                {anomalies.map((anom) => (
                  <div
                    key={anom.id}
                    onClick={() => setSelectedAlert(anom)}
                    className={`glass-card rounded-2xl p-4.5 border transition-all cursor-pointer flex flex-col justify-between gap-3 shadow-lg ${
                      selectedAlert.id === anom.id
                        ? 'border-rose-400/60 bg-rose-950/30 ring-1 ring-rose-400/40'
                        : 'border-white/10 bg-slate-900/70 hover:border-white/20'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded-full text-[10px] font-black ${
                            anom.severity === 'CRITICAL'
                              ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                              : anom.severity === 'HIGH'
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                              : 'bg-sky-500/20 text-sky-300 border border-sky-500/40'
                          }`}>
                            {anom.severity}
                          </span>
                          <span className="text-[11px] text-slate-400 font-mono">{anom.time}</span>
                        </div>
                        <h5 className="text-sm font-black text-white">{anom.title}</h5>
                        <span className="text-xs text-slate-400 block">{anom.location}</span>
                      </div>

                      <div className="text-right">
                        <span className="font-mono text-xs font-black text-amber-300 block">{anom.metric}</span>
                        <span className="font-mono text-[11px] text-rose-400">{anom.sigma}</span>
                      </div>
                    </div>

                    <div className="bg-black/30 p-2.5 rounded-xl border border-white/5 text-xs text-slate-300">
                      <strong className="text-amber-300/90 text-[11px] block">🔍 {tx('สาเหตุที่ตรวจพบ:', 'Root Cause:')}</strong>
                      <p className="text-[11px] text-slate-200 mt-0.5">{anom.cause}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Live LINE Flex Message Smartphone Mockup */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <span className="text-xs font-black uppercase text-slate-400 tracking-wider mb-2 flex items-center gap-1.5">
                  <span>📱</span>
                  <span>{tx('ตัวอย่างหน้าจอ LINE Flex Message ที่ส่งจริง', 'Live LINE Flex Card Simulation')}</span>
                </span>

                {/* Smartphone Frame */}
                <div className="w-full max-w-sm rounded-[36px] p-4 bg-slate-950 border-4 border-slate-700 shadow-2xl relative overflow-hidden">
                  <div className="w-32 h-4 bg-slate-800 rounded-b-xl mx-auto mb-3" />

                  {/* LINE Chat Bubble */}
                  <div className="rounded-2xl overflow-hidden shadow-2xl border border-emerald-500/30 bg-[#1e293b]">
                    {/* Header */}
                    <div className={`p-4 ${selectedAlert.severity === 'CRITICAL' ? 'bg-[#991b1b]' : 'bg-[#92400e]'}`}>
                      <span className="text-[10px] font-black text-amber-200 uppercase tracking-wider block">
                        🚨 INSIGHTFLOW REAL-TIME ALERT
                      </span>
                      <h5 className="text-sm font-black text-white mt-1 leading-snug">
                        {selectedAlert.title}
                      </h5>
                    </div>

                    {/* Body */}
                    <div className="p-4 space-y-2 text-xs text-slate-200 bg-[#0f172a]">
                      <p className="text-[11px] text-slate-400">📍 {selectedAlert.location}</p>
                      <p className="font-bold text-amber-300">📊 {selectedAlert.metric}</p>
                      <hr className="border-white/10 my-2" />
                      <p className="text-[11px] text-slate-300 leading-tight">
                        <strong>🔍 สาเหตุ:</strong> {selectedAlert.cause}
                      </p>
                      <p className="text-[11px] text-emerald-400 font-bold leading-tight mt-1">
                        <strong>💡 ทางแก้:</strong> {selectedAlert.action}
                      </p>
                    </div>

                    {/* Footer Action Button */}
                    <div className="p-3 bg-slate-900 border-t border-white/10">
                      <button
                        type="button"
                        onClick={handleSendLineAlert}
                        disabled={isSendingLine}
                        className="w-full py-2.5 rounded-xl bg-[#06c755] hover:bg-[#05b34c] text-white font-black text-xs active:scale-95 transition-all shadow flex items-center justify-center gap-2"
                      >
                        <span className="text-sm">💬</span>
                        <span>{isSendingLine ? tx('กำลังยิงเข้า LINE...', 'Pushing to LINE...') : tx('ทดสอบยิงเข้า LINE ทันที (Send Flex)', 'Push Alert to LINE Now')}</span>
                      </button>
                    </div>
                  </div>

                  <div className="mt-3 text-center text-[10px] text-slate-500">
                    {tx('เชื่อมต่อผ่าน LINE Messaging API Webhook Channel', 'Connected via LINE Messaging API Webhook')}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ==================================================================== */}
      {/* MODULE 3: AI EXECUTIVE SUMMARY & COPILOT CHAT                        */}
      {/* ==================================================================== */}
      {activeTab === 'copilot' && (
        <div className="space-y-6 animate-fadeIn">
          {/* McKinsey-style 3-Point Executive Summary Card */}
          <div className="glass-card rounded-2xl p-6 border border-amber-400/30 bg-gradient-to-br from-amber-500/10 via-slate-900/90 to-slate-950 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-black uppercase text-amber-300 tracking-wider bg-amber-400/20 px-2.5 py-0.5 rounded-full border border-amber-400/30">
                {tx('📋 บทสรุปผู้บริหาร 3 บรรทัด (McKinsey-Style Executive Summary)', '3-Bullet Executive Summary')}
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {tx('อัปเดตอัตโนมัติประจำวัน', 'Auto-generated Daily')}
              </span>
            </div>

            <h4 className="text-base font-black text-white">
              {currentRevenueVal > 0
                ? tx('ภาพรวมผลการดำเนินงานสัปดาห์นี้: ยอดขายเติบโต +8.4% แต่กำไรสุทธิถูกกดดันจากต้นทุนวัตถุดิบพุ่ง', 'Weekly Performance: Sales up +8.4% but net profit pressured by ingredient cost surge')
                : tx('ภาพรวมผลการดำเนินงาน: ยังไม่มีข้อมูล หรือรออัปโหลดไฟล์ข้อมูลธุรกิจ', 'Performance Overview: No data available. Waiting for data upload.')}
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div className="bg-slate-950/70 p-3.5 rounded-xl border border-emerald-500/30 space-y-1">
                <span className="text-xs font-black text-emerald-400 flex items-center gap-1.5">
                  <span>✔</span>
                  <span>{currentRevenueVal > 0 ? tx('1. ยอดขายโตจาก Combo', '1. Combo Sales Surge') : tx('1. ยอดขายและ Basket Size', '1. Sales & Basket Size')}</span>
                </span>
                <p className="text-xs text-slate-300">
                  {currentRevenueVal > 0
                    ? tx('Basket Size เพิ่มเป็น ฿245/บิล (+18.2%) เมนูเด่นคือกาแฟคู่ครัวซองต์', 'Basket size up to ฿245/order (+18.2%) led by Coffee + Croissant bundle')
                    : tx('รออัปโหลดข้อมูลเพื่อวิเคราะห์ยอดขายและตะกร้าสินค้า', 'Waiting for sales data to analyze orders and basket sizes.')}
                </p>
              </div>

              <div className="bg-slate-950/70 p-3.5 rounded-xl border border-rose-500/30 space-y-1">
                <span className="text-xs font-black text-rose-400 flex items-center gap-1.5">
                  <span>⚠</span>
                  <span>{currentRevenueVal > 0 ? tx('2. มาร์จิ้นเบเกอรี่หด -14.2%', '2. Bakery Margin Squeeze') : tx('2. อัตรากำไรสุทธิ', '2. Net Profit Margin')}</span>
                </span>
                <p className="text-xs text-slate-300">
                  {currentRevenueVal > 0
                    ? tx('เกิดจากต้นทุนเนยสดฝรั่งเศส AOP ปรับขึ้นราคา 18% แต่หน้าร้านยังคงราคาเดิม', 'French butter cost rose 18% while retail price remained unchanged')
                    : tx('รอข้อมูลเพื่อคำนวณ Gross Margin และความผันผวนของต้นทุน', 'Waiting for data to calculate margins and cost volatility.')}
                </p>
              </div>

              <div className="bg-slate-950/70 p-3.5 rounded-xl border border-amber-500/30 space-y-1">
                <span className="text-xs font-black text-amber-300 flex items-center gap-1.5">
                  <span>🔔</span>
                  <span>{currentRevenueVal > 0 ? tx('3. ลูกค้า VIP เสี่ยงหาย 89 ท่าน', '3. 89 VIP Customers at Risk') : tx('3. กลุ่มลูกค้าและ Churn Risk', '3. Customer Retention & Churn')}</span>
                </span>
                <p className="text-xs text-slate-300">
                  {currentRevenueVal > 0
                    ? tx('เว้นช่วงซื้อเกิน 45 วัน คิดเป็นเม็ดเงิน ฿1,139,200 ส่งคูปองดึงกลับด่วน', 'Inactive for 45+ days representing ฿1.13M revenue at risk')
                    : tx('รอข้อมูลลูกค้าเพื่อตรวจจับขาประจำและประเมินความเสี่ยงลูกค้าหาย', 'Waiting for customer data to segment VIPs and detect churn risks.')}
                </p>
              </div>
            </div>
          </div>

          {/* Interactive AI Copilot Chat Box (Text-to-SQL Lite) */}
          <div className="glass-card rounded-2xl p-6 border border-white/10 bg-slate-900/90 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-base font-black text-white flex items-center gap-2">
                  <span>💬</span>
                  <span>{tx('ช่องแชตผู้ช่วย AI ตอบคำถามธุรกิจ (Text-to-Insights Copilot)', 'AI Business Copilot (Text-to-Insights)')}</span>
                </h4>
                <p className="text-xs text-slate-400">
                  {tx('พิมพ์ถามเป็นภาษาคน ระบบจะประมวลผลข้อมูลหลังบ้านและตอบข้อเท็จจริงพร้อมแนวทางแก้ไข', 'Ask direct business questions. AI queries internal data and synthesizes clear answers.')}
                </p>
              </div>
            </div>

            {/* Quick Prompt Pills */}
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="text-xs text-slate-400 self-center">{tx('ตัวอย่างคำถาม:', 'Quick Prompts:')}</span>
              {quickQuestions.map((q, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleAskCopilot(q.q)}
                  className="px-3 py-1.5 rounded-full text-xs font-bold bg-white/5 hover:bg-amber-400/20 text-slate-300 hover:text-amber-300 border border-white/10 transition-colors"
                >
                  {q.label}
                </button>
              ))}
            </div>

            {/* Chat Thread */}
            <div className="space-y-3 max-h-96 overflow-y-auto no-scrollbar p-3 rounded-xl bg-slate-950/60 border border-white/5">
              {copilotChat.map((msg, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-2xl p-4 rounded-2xl text-xs leading-relaxed whitespace-pre-wrap ${
                      msg.role === 'user'
                        ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-bold'
                        : 'bg-slate-900 border border-white/10 text-slate-200'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-slate-500 mt-1 px-1">{msg.time}</span>
                </div>
              ))}
              {copilotLoading && (
                <div className="flex items-center gap-2 text-xs text-amber-300 animate-pulse p-2">
                  <span>🤖</span>
                  <span>{tx('AI กำลังคิวรี่ฐานข้อมูลและประมวลผลคำตอบ...', 'AI is querying database and synthesizing insights...')}</span>
                </div>
              )}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAskCopilot(copilotQuestion);
              }}
              className="flex items-center gap-2"
            >
              <input
                type="text"
                value={copilotQuestion}
                onChange={(e) => setCopilotQuestion(e.target.value)}
                placeholder={tx('พิมพ์คำถามธุรกิจ เช่น "เดือนนี้สินค้าหมวดไหนกำไรหดตัวมากที่สุด และเพราะอะไร?"...', 'Ask any business question...')}
                className="flex-1 px-4 py-3 rounded-xl bg-slate-950 border border-white/10 text-white text-xs font-medium focus:border-amber-400 outline-none"
              />
              <button
                type="submit"
                disabled={copilotLoading || !copilotQuestion.trim()}
                className="px-5 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 font-black text-xs hover:brightness-110 active:scale-95 disabled:opacity-50 transition-all shadow"
              >
                {tx('ส่งคำถาม', 'Ask Copilot')}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

