import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { LuxuryIconBadge, LuxuryModuleIcon } from './LuxuryIcons';

export function ActionablePlaybooks({
  lang = 'th',
  inventoryList = [],
  setInventoryList,
  setActiveTab
}) {
  const isEn = lang === 'en';
  const tx = (th, en) => (isEn ? en : th);

  // Active Playbook Subtab: 'all' | 'basket' | 'dead_stock' | 'simulator'
  const [activePlaybookTab, setActivePlaybookTab] = useState('all');

  // Mission 1: Market Basket Analysis State
  const [isBundleApplied, setIsBundleApplied] = useState(false);
  const [bundleDiscountPct, setBundleDiscountPct] = useState(10);

  // Mission 2: Dead Stock & Flash Sale Customization Modal State
  const [isFlashSaleModalOpen, setIsFlashSaleModalOpen] = useState(false);
  const [selectedDeadStockSku, setSelectedDeadStockSku] = useState('SKU-A045');
  const [flashSaleCampaignType, setFlashSaleCampaignType] = useState('24h_rush');
  const [customCampaignName, setCustomCampaignName] = useState('');
  const [flashSaleDiscountPct, setFlashSaleDiscountPct] = useState(35);
  const [flashSaleQuota, setFlashSaleQuota] = useState(280);
  const [flashSaleStatusBadge, setFlashSaleStatusBadge] = useState('flash_sale_active');
  const [appliedFlashSales, setAppliedFlashSales] = useState({});
  const [appliedGifts, setAppliedGifts] = useState({});

  // Mission 3: Dynamic Pricing Simulator State
  const [simSelectedSku, setSimSelectedSku] = useState('SRM-001');
  const [simDiscountPct, setSimDiscountPct] = useState(15);
  const [simMonthlyBaseQty, setSimMonthlyBaseQty] = useState(120);

  // Fallback products if inventoryList is empty
  const defaultItems = [
    {
      sku: 'SRM-001',
      price: 1290,
      cost: 450,
      stock: 450,
      status: 'in_stock',
      th: { name: 'เซรั่มบำรุงผิวสูตรเข้มข้นพิเศษ', category: 'สกินแคร์' },
      en: { name: 'Intensive Night Repair Serum', category: 'Skincare' }
    },
    {
      sku: 'SKU-A045',
      price: 450,
      cost: 250,
      stock: 280,
      status: 'dead_stock',
      th: { name: 'ครีมกันแดดสูตรกันน้ำ (ล็อตก่อนหน้า)', category: 'สกินแคร์' },
      en: { name: 'Waterproof Sunscreen SPF50+ (Previous Lot)', category: 'Skincare' }
    }
  ];

  const hasInventory = Boolean(inventoryList && inventoryList.length > 0);
  const currentInventory = hasInventory ? inventoryList : [];
  const deadStockItems = currentInventory.filter(
    i => i.status === 'dead_stock' || i.sku === 'SKU-A045'
  );
  const deadStockTarget =
    currentInventory.find(i => i.sku === selectedDeadStockSku) ||
    deadStockItems[0] ||
    currentInventory[0] ||
    null;

  // =========================================================================
  // MISSION 1: MARKET BASKET ANALYSIS LOGIC & ACTIONS
  // =========================================================================
  const productA = currentInventory[0] || null;
  const productB = currentInventory[1] || currentInventory[0] || null;

  const originalBundleSum = productA && productB ? (productA.price || 0) + (productB.price || 0) : 0;
  const discountedBundlePrice = Math.round(originalBundleSum * (1 - bundleDiscountPct / 100));
  const bundleSavedAmount = originalBundleSum - discountedBundlePrice;
  const estimatedBasketLift = productA && (productA.price || 0) > 0 ? Math.round(
    ((discountedBundlePrice - productA.price) / productA.price) * 100
  ) : 0;

  const handleApplyBundlePromo = () => {
    if (!productA || !productB) {
      toast.error(tx('ยังไม่มีสินค้าในระบบ กรุณาอัปโหลดไฟล์สินค้าก่อนครับ', 'No products available. Please upload inventory file first.'));
      return;
    }
    setIsBundleApplied(true);
    toast.success(
      tx(
        `⚡ เปิดโปรโมชันเซ็ตคู่ "${productA.th?.name || productA.sku} + ${productB.th?.name || productB.sku}" ลด ${bundleDiscountPct}% เข้าหน้า POS สำเร็จ!`,
        `⚡ Activated "${productA.en?.name || productA.sku} + ${productB.en?.name || productB.sku}" (${bundleDiscountPct}% OFF) bundle to POS!`
      )
    );
  };

  const handleCopyLineCaption = () => {
    if (!productA || !productB) {
      toast.error(tx('ยังไม่มีสินค้าในระบบ', 'No products in inventory'));
      return;
    }
    const caption = isEn
      ? `🔥 EXCLUSIVE VIP BUNDLE! Pair "${productA.en?.name || productA.sku}" with "${productB.en?.name || productB.sku}" today for only ฿${discountedBundlePrice.toLocaleString()} (was ฿${originalBundleSum.toLocaleString()}, save ฿${bundleSavedAmount.toLocaleString()})! Limited sets this week only.`
      : `🔥 โปรโมชันเซ็ตคู่พิเศษประจำสัปดาห์! ซื้อคู่กันคุ้มกว่า "${productA.th?.name || productA.sku}" + "${productB.th?.name || productB.sku}" เพียง ฿${discountedBundlePrice.toLocaleString()} (จากปกติ ฿${originalBundleSum.toLocaleString()} ประหยัดทันที ฿${bundleSavedAmount.toLocaleString()}) สั่งซื้อด่วนทาง LINE ทันที!`;

    navigator.clipboard.writeText(caption);
    toast.success(
      tx(
        '📋 คัดลอกแคปชันโปรโมชันเซ็ตคู่สำหรับ LINE OA & Facebook เรียบร้อยแล้ว!',
        '📋 Copied bundle promo caption to clipboard for LINE OA & Social!'
      )
    );
  };

  // =========================================================================
  // MISSION 2: DEAD STOCK & CUSTOMIZABLE FLASH SALE LOGIC & ACTIONS
  // =========================================================================
  const deadStockCost = deadStockTarget ? (deadStockTarget.cost || Math.round((deadStockTarget.price || 0) * 0.55)) : 0;
  const sunkCapital = deadStockTarget ? (deadStockTarget.stock || 0) * deadStockCost : 0;

  const calculatedFlashPrice = deadStockTarget
    ? Math.max(deadStockCost + 10, Math.round((deadStockTarget.price || 0) * (1 - flashSaleDiscountPct / 100)))
    : 0;
  const unlockedCash = deadStockTarget ? calculatedFlashPrice * Math.min(flashSaleQuota, deadStockTarget.stock || 0) : 0;
  const flashSaleProfit =
    (calculatedFlashPrice - deadStockCost) *
    Math.min(flashSaleQuota, deadStockTarget.stock || 280);

  const campaignTypeNames = {
    '24h_rush': {
      th: '⚡ Flash Sale ด่วนจำกัดเวลา 24 ชั่วโมง (Midnight Rush)',
      en: '⚡ 24-Hour Midnight Rush Flash Sale'
    },
    weekend_clearance: {
      th: '🔥 Weekend Special ล้างสต็อกพิเศษสุดสัปดาห์ 3 วัน',
      en: '🔥 3-Day Weekend Special Clearance'
    },
    mid_month: {
      th: '🏷️ Mid-Month Clearance ลดกระหน่ำกลางเดือน',
      en: '🏷️ Mid-Month Super Clearance'
    },
    payday_rush: {
      th: '💰 Payday Flash Sale รับวันเงินเดือนออก',
      en: '💰 Payday Special Flash Sale'
    },
    custom: {
      th: customCampaignName.trim() || 'แคมเปญ Flash Sale กำหนดเอง',
      en: customCampaignName.trim() || 'Custom Flash Sale Campaign'
    }
  };

  const handleOpenFlashSaleCustomizer = sku => {
    setSelectedDeadStockSku(sku);
    const item = currentInventory.find(i => i.sku === sku) || deadStockTarget;
    setFlashSaleQuota(item.stock || 280);
    setIsFlashSaleModalOpen(true);
  };

  const handleConfirmCustomFlashSale = () => {
    const item = currentInventory.find(i => i.sku === selectedDeadStockSku) || deadStockTarget;
    const finalCampaignLabel =
      flashSaleCampaignType === 'custom' && customCampaignName.trim()
        ? customCampaignName.trim()
        : campaignTypeNames[flashSaleCampaignType][isEn ? 'en' : 'th'];

    // Update inventory item status & price if setter provided
    if (setInventoryList) {
      setInventoryList(prev =>
        prev.map(p => {
          if (p.sku !== item.sku) return p;
          return {
            ...p,
            price: calculatedFlashPrice,
            flashSaleCampaign: finalCampaignLabel,
            flashSaleDiscount: flashSaleDiscountPct,
            status: 'flash_sale',
            th: {
              ...p.th,
              statusLabel: `🔥 ${finalCampaignLabel} (ลดเหลือ ฿${calculatedFlashPrice})`
            },
            en: {
              ...p.en,
              statusLabel: `🔥 ${finalCampaignLabel} (Now ฿${calculatedFlashPrice})`
            }
          };
        })
      );
    }

    setAppliedFlashSales(prev => ({
      ...prev,
      [item.sku]: {
        campaign: finalCampaignLabel,
        price: calculatedFlashPrice,
        discount: flashSaleDiscountPct,
        quota: flashSaleQuota,
        unlockedCash
      }
    }));

    setIsFlashSaleModalOpen(false);
    toast.success(
      tx(
        `🔥 เปิดแคมเปญ "${finalCampaignLabel}" สำหรับ ${item.th?.name || item.sku} ในราคา ฿${calculatedFlashPrice} สำเร็จ! ปลดล็อกเงินสด ฿${unlockedCash.toLocaleString()}`,
        `🔥 Launched "${finalCampaignLabel}" on ${item.sku} at ฿${calculatedFlashPrice}! Recovers ฿${unlockedCash.toLocaleString()} in cash.`
      )
    );
  };

  const handleApplyHighMarginGift = sku => {
    const item = currentInventory.find(i => i.sku === sku) || deadStockTarget;
    setAppliedGifts(prev => ({ ...prev, [sku]: true }));
    toast.success(
      tx(
        `🎁 ตั้งค่า "${item.th?.name || item.sku}" เป็นของแถมพรีเมียมคู่กับเซรั่ม (ยอดครบ ฿2,500) สำเร็จ! ระบายสต็อกโดยกำไรเซรั่มครอบคลุมต้นทุน`,
        `🎁 Configured "${item.sku}" as free VIP gift with Serum orders over ฿2,500! Clears stock while preserving gross margin.`
      )
    );
  };

  // =========================================================================
  // MISSION 3: DYNAMIC PRICING & PROMO SIMULATOR CALCULATION
  // =========================================================================
  const simItem = currentInventory.find(i => i.sku === simSelectedSku) || defaultItems[0];
  const simCost = simItem.cost || Math.round(simItem.price * 0.4); // Cost per unit
  const originalUnitPrice = simItem.price;
  const originalUnitMargin = originalUnitPrice - simCost;
  const originalMarginPct = (originalUnitMargin / originalUnitPrice) * 100; // e.g. (1290-450)/1290 = 65.1%

  const newUnitPrice = Math.round(originalUnitPrice * (1 - simDiscountPct / 100));
  const newUnitMargin = newUnitPrice - simCost;
  const newMarginPct = (newUnitMargin / newUnitPrice) * 100;

  // Formula for Break-Even Volume Uplift:
  // Required Q_new * newUnitMargin = Q_base * originalUnitMargin
  // Required Uplift % = (originalUnitMargin / newUnitMargin - 1) * 100
  const isLossMaking = newUnitMargin <= 0;
  const breakEvenMultiplier = isLossMaking ? 999 : originalUnitMargin / newUnitMargin;
  const requiredUpliftPct = isLossMaking ? 999 : Math.round((breakEvenMultiplier - 1) * 100);
  const requiredTotalQty = Math.round(simMonthlyBaseQty * breakEvenMultiplier);
  const requiredExtraUnits = Math.max(0, requiredTotalQty - simMonthlyBaseQty);

  // Safety Status: safe (< 40% uplift needed) | caution (40-80%) | danger (> 80% or negative margin)
  const safetyStatus = isLossMaking || requiredUpliftPct > 80 ? 'danger' : requiredUpliftPct > 40 ? 'caution' : 'safe';

  return (
    <div className="glass-card" style={{ padding: '1.5rem', borderRadius: '22px', border: '1.5px solid rgba(251, 191, 36, 0.45)' }}>
      {/* Header Banner */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <LuxuryIconBadge variant="gold" size="lg" active>
            <LuxuryModuleIcon type="insights" size={26} />
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
                {tx('⚡ ระบบแนะนำการกระทำอัตโนมัติ (PRESCRIPTIVE AI PLAYBOOKS)', '⚡ PRESCRIPTIVE AI & ACTIONABLE PLAYBOOKS')}
              </span>
              <span style={{ fontSize: '0.74rem', color: '#34d399', fontWeight: 800 }}>
                ● {tx('แปลงสถิติเป็นภารกิจลงมือทำทันที', 'Direct Decision Missions')}
              </span>
            </div>
            <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 900, color: '#f8fafc' }}>
              {tx(
                '🎯 อย่าปล่อยให้ดูแต่ตัวเลข: 3 ภารกิจเร่งด่วนเพิ่มยอดขายและกู้คืนกำไร',
                '🎯 3 Actionable Missions to Boost Revenue & Prevent Sunk Cost Losses'
              )}
            </h3>
          </div>
        </div>

        {/* Tab Filters */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
          {[
            { id: 'all', th: 'ดูทั้ง 3 ภารกิจ', en: 'All 3 Missions' },
            { id: 'basket', th: '🛒 1. จัดชุดสินค้า A+B', en: '🛒 1. Market Basket' },
            { id: 'dead_stock', th: '📦 2. ระบาย Dead Stock', en: '📦 2. Dead Stock' },
            { id: 'simulator', th: '🧮 3. จำลองโปรโมชัน', en: '🧮 3. Pricing Simulator' }
          ].map(tab => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActivePlaybookTab(tab.id)}
              style={{
                padding: '0.45rem 0.85rem',
                borderRadius: '10px',
                border: activePlaybookTab === tab.id ? '1px solid #fbbf24' : '1px solid rgba(148, 163, 184, 0.2)',
                background: activePlaybookTab === tab.id ? 'rgba(251, 191, 36, 0.2)' : 'rgba(15, 23, 42, 0.6)',
                color: activePlaybookTab === tab.id ? '#fbbf24' : '#cbd5e1',
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

      {/* Grid of Actionable Playbooks */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.25rem' }}>
        {/* ========================================================================= */}
        {/* MISSION 1: MARKET BASKET ANALYSIS (A+B BUNDLE) */}
        {/* ========================================================================= */}
        {(activePlaybookTab === 'all' || activePlaybookTab === 'basket') && (
          <div
            className="glass-card"
            style={{
              padding: '1.35rem',
              borderRadius: '18px',
              border: isBundleApplied ? '1.5px solid rgba(16, 185, 129, 0.6)' : '1.5px solid rgba(56, 189, 248, 0.45)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '1rem',
              background: 'linear-gradient(145deg, rgba(56, 189, 248, 0.08) 0%, rgba(15, 23, 42, 0.95) 100%)'
            }}
          >
            <div>
              {/* Top Badge & Metric */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span
                  style={{
                    padding: '0.22rem 0.65rem',
                    borderRadius: '999px',
                    background: 'rgba(56, 189, 248, 0.22)',
                    color: '#38bdf8',
                    fontWeight: 900,
                    fontSize: '0.74rem'
                  }}
                >
                  🛒 {tx('ภารกิจที่ 1: วิเคราะห์ตะกร้าสินค้า (Market Basket Analysis)', 'Mission 1: Market Basket Analysis')}
                </span>
                <span style={{ fontSize: '0.74rem', color: '#34d399', fontWeight: 800, background: 'rgba(16, 185, 129, 0.15)', padding: '0.2rem 0.55rem', borderRadius: '8px' }}>
                  ⚡ {tx('ซื้อคู่กัน 68% (Lift 2.4x)', '68% Pair Rate (2.4x Lift)')}
                </span>
              </div>

              <h4 style={{ margin: '0 0 0.4rem 0', fontSize: '1.1rem', fontWeight: 900, color: '#f8fafc' }}>
                {tx(
                  'จัดโปรโมชันจับคู่สินค้า A+B เพื่อดันยอดซื้อต่อบิล (Basket Size)',
                  'Automated Product Bundling (A+B Basket Expander)'
                )}
              </h4>

              {/* Data Insight Box */}
              <div style={{ padding: '0.85rem', borderRadius: '12px', background: 'rgba(15, 23, 42, 0.85)', border: '1px solid rgba(56, 189, 248, 0.25)', marginBottom: '0.85rem' }}>
                <div style={{ fontSize: '0.82rem', color: '#94a3b8', marginBottom: '0.35rem' }}>
                  {tx('💡 ระบบวิเคราะห์ประวัติการสั่งซื้อพบพฤติกรรมเด่น:', '💡 Order history diagnostic discovered:')}
                </div>
                <div style={{ fontSize: '0.92rem', color: '#e2e8f0', fontWeight: 700, lineHeight: 1.55 }}>
                  "{tx(
                    `ลูกค้าที่ซื้อ "${productA.th?.name}" มักจะซื้อ "${productB.th?.name}" ควบคู่กันสูงถึง 68%`,
                    `Customers purchasing "${productA.en?.name}" pair with "${productB.en?.name}" in 68% of orders.`
                  )}"
                </div>
              </div>

              {/* Prescriptive Recommendation Card */}
              <div style={{ padding: '0.9rem', borderRadius: '14px', background: 'rgba(56, 189, 248, 0.12)', border: '1px solid rgba(56, 189, 248, 0.35)', marginBottom: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <span style={{ fontSize: '0.8rem', fontWeight: 900, color: '#38bdf8' }}>
                    🎯 {tx('ภารกิจที่แนะนำให้ทำทันที:', 'Recommended Immediate Mission:')}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{ fontSize: '0.72rem', color: '#cbd5e1' }}>{tx('ส่วนลดเซ็ต:', 'Bundle Discount:')}</span>
                    <select
                      value={bundleDiscountPct}
                      onChange={e => setBundleDiscountPct(Number(e.target.value))}
                      style={{ padding: '0.15rem 0.4rem', borderRadius: '6px', background: '#0f172a', color: '#38bdf8', border: '1px solid #38bdf8', fontSize: '0.75rem', fontWeight: 800 }}
                    >
                      <option value={5}>-5%</option>
                      <option value={10}>-10%</option>
                      <option value={15}>-15%</option>
                      <option value={20}>-20%</option>
                    </select>
                  </div>
                </div>

                <div style={{ fontSize: '0.85rem', color: '#f1f5f9', lineHeight: 1.6 }}>
                  {tx(
                    `จัดโปรโมชันจับคู่ "${productA.th?.name} + ${productB.th?.name}" ลด ${bundleDiscountPct}% ในสัปดาห์หน้าเพื่อเพิ่มยอดซื้อต่อบิล`,
                    `Launch "${productA.en?.name} + ${productB.en?.name}" at ${bundleDiscountPct}% OFF next week to lift average order value.`
                  )}
                </div>

                {/* Math Simulation Badges */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', marginTop: '0.75rem', textAlign: 'center' }}>
                  <div style={{ padding: '0.4rem', background: 'rgba(15, 23, 42, 0.7)', borderRadius: '8px' }}>
                    <div style={{ fontSize: '0.68rem', color: '#94a3b8' }}>{tx('ราคาเซ็ตคู่', 'Bundle Price')}</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 900, color: '#38bdf8' }}>฿{discountedBundlePrice.toLocaleString()}</div>
                    <div style={{ fontSize: '0.64rem', color: '#94a3b8', textDecoration: 'line-through' }}>฿{originalBundleSum.toLocaleString()}</div>
                  </div>
                  <div style={{ padding: '0.4rem', background: 'rgba(15, 23, 42, 0.7)', borderRadius: '8px' }}>
                    <div style={{ fontSize: '0.68rem', color: '#94a3b8' }}>{tx('ดันยอดบิล', 'Basket Lift')}</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 900, color: '#34d399' }}>+{estimatedBasketLift}%</div>
                    <div style={{ fontSize: '0.64rem', color: '#34d399' }}>{tx('ต่อตะกร้า', '/cart')}</div>
                  </div>
                  <div style={{ padding: '0.4rem', background: 'rgba(15, 23, 42, 0.7)', borderRadius: '8px' }}>
                    <div style={{ fontSize: '0.68rem', color: '#94a3b8' }}>{tx('ลูกค้าประหยัด', 'Saved')}</div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 900, color: '#fbbf24' }}>฿{bundleSavedAmount}</div>
                    <div style={{ fontSize: '0.64rem', color: '#fbbf24' }}>{bundleDiscountPct}% OFF</div>
                  </div>
                </div>
              </div>
            </div>

            {/* 1-Click Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid rgba(148, 163, 184, 0.15)' }}>
              <button
                type="button"
                onClick={handleApplyBundlePromo}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '12px',
                  border: isBundleApplied ? '1px solid rgba(16, 185, 129, 0.6)' : 'none',
                  background: isBundleApplied
                    ? 'rgba(16, 185, 129, 0.25)'
                    : 'linear-gradient(135deg, #0284c7, #0284c7, #0369a1)',
                  color: isBundleApplied ? '#34d399' : '#ffffff',
                  fontWeight: 900,
                  fontSize: '0.84rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem'
                }}
              >
                {isBundleApplied
                  ? tx('✓ บันทึกโปรโมชันเซ็ตคู่เข้าหน้า POS แล้ว', '✓ Bundle Promo Activated on POS')
                  : tx('⚡ บันทึกโปรโมชันเซ็ตคู่เข้าสู่หน้าจุดขาย (POS) ทันที', '⚡ 1-Click Activate Bundle Promo to POS')}
              </button>

              <button
                type="button"
                onClick={handleCopyLineCaption}
                style={{
                  width: '100%',
                  padding: '0.6rem',
                  borderRadius: '10px',
                  border: '1px solid rgba(56, 189, 248, 0.4)',
                  background: 'rgba(56, 189, 248, 0.1)',
                  color: '#38bdf8',
                  fontWeight: 800,
                  fontSize: '0.78rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem'
                }}
              >
                📋 {tx('คัดลอกแคปชันโปรโมชันเซ็ตคู่สำหรับ LINE OA & Social', 'Copy Bundle Caption for LINE OA & Social')}
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MISSION 2: DEAD STOCK & CUSTOMIZABLE FLASH SALE SALVAGE */}
        {/* ========================================================================= */}
        {(activePlaybookTab === 'all' || activePlaybookTab === 'dead_stock') && (
          <div
            className="glass-card"
            style={{
              padding: '1.35rem',
              borderRadius: '18px',
              border: appliedFlashSales[deadStockTarget.sku] ? '1.5px solid rgba(245, 158, 11, 0.6)' : '1.5px solid rgba(244, 63, 94, 0.45)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '1rem',
              background: 'linear-gradient(145deg, rgba(244, 63, 94, 0.08) 0%, rgba(15, 23, 42, 0.95) 100%)'
            }}
          >
            <div>
              {/* Top Badge & Metric */}
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
                  📦 {tx('ภารกิจที่ 2: จัดการ Dead Stock ก่อนขาดทุน', 'Mission 2: Dead Stock & Sunk Cost Salvage')}
                </span>
                <span style={{ fontSize: '0.74rem', color: '#f87171', fontWeight: 800, background: 'rgba(239, 68, 68, 0.15)', padding: '0.2rem 0.55rem', borderRadius: '8px' }}>
                  ⚠️ {tx('ไม่มียอดขาย > 60 วัน', 'Inactive > 60 Days')}
                </span>
              </div>

              <h4 style={{ margin: '0 0 0.4rem 0', fontSize: '1.1rem', fontWeight: 900, color: '#f8fafc' }}>
                {tx(
                  'ตรวจจับสินค้าชะลอตัว & กู้คืนเงินทุนจมก่อนหมดอายุ/ตกรุ่น',
                  'Recover Locked Sunk Capital & Clear Stagnant Inventory'
                )}
              </h4>

              {/* Sunk Capital Diagnostic Box */}
              <div style={{ padding: '0.85rem', borderRadius: '12px', background: 'rgba(15, 23, 42, 0.85)', border: '1px solid rgba(244, 63, 94, 0.28)', marginBottom: '0.85rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <div style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
                    {tx('📦 สินค้าค้างสต็อกเป้าหมาย:', 'Target Slow-Moving SKU:')}
                  </div>
                  <select
                    value={selectedDeadStockSku}
                    onChange={e => setSelectedDeadStockSku(e.target.value)}
                    style={{ padding: '0.2rem 0.5rem', borderRadius: '6px', background: '#0f172a', color: '#fda4af', border: '1px solid rgba(244, 63, 94, 0.5)', fontSize: '0.76rem', fontWeight: 800 }}
                  >
                    {currentInventory.map(item => (
                      <option key={item.sku} value={item.sku}>
                        {item.sku} - {item.th?.name || item.sku} ({item.stock} ชิ้น)
                      </option>
                    ))}
                  </select>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.85rem', color: '#e2e8f0', fontWeight: 700 }}>
                    {deadStockTarget.th?.name || deadStockTarget.sku}
                  </span>
                  <span style={{ fontSize: '0.82rem', color: '#fbbf24', fontWeight: 900 }}>
                    {deadStockTarget.stock} {tx('ชิ้นในคลัง', 'units in stock')}
                  </span>
                </div>
                <div style={{ marginTop: '0.5rem', paddingTop: '0.5rem', borderTop: '1px dashed rgba(148, 163, 184, 0.2)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.78rem', color: '#cbd5e1' }}>{tx('💸 มูลค่าเงินทุนจมนิ่งในคลัง:', '💸 Locked Sunk Capital:')}</span>
                  <span style={{ fontSize: '1rem', fontWeight: 900, color: '#f87171' }}>฿{sunkCapital.toLocaleString()}</span>
                </div>
              </div>

              {/* 2 Strategic Salvage Options */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.65rem', marginBottom: '0.75rem' }}>
                {/* Option A: Flash Sale */}
                <div style={{ padding: '0.75rem', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.12)', border: '1px solid rgba(245, 158, 11, 0.35)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                    <span style={{ fontSize: '0.82rem', fontWeight: 900, color: '#fbbf24' }}>
                      🔥 {tx('กลยุทธ์ A: Flash Sale ปลดล็อกเงินสดคืนร้าน', 'Strategy A: Cash Liberation Flash Sale')}
                    </span>
                    <span style={{ fontSize: '0.7rem', color: '#34d399', fontWeight: 800 }}>
                      +{tx(`เงินสด ฿${unlockedCash.toLocaleString()}`, `฿${unlockedCash.toLocaleString()} Cash`)}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.5 }}>
                    {appliedFlashSales[deadStockTarget.sku]
                      ? tx(
                          `✓ กำลังจัด "${appliedFlashSales[deadStockTarget.sku].campaign}" ในราคา ฿${appliedFlashSales[deadStockTarget.sku].price}`,
                          `✓ Running "${appliedFlashSales[deadStockTarget.sku].campaign}" at ฿${appliedFlashSales[deadStockTarget.sku].price}`
                        )
                      : tx(
                          `ลดราคาเหลือ ฿${calculatedFlashPrice} (-${flashSaleDiscountPct}%) ระบายหมดปลดล็อกเงินสด ฿${unlockedCash.toLocaleString()} ภายใน 7 วัน (คุณตั้งค่าสถานะและเงื่อนไขเองได้)`,
                          `Discount to ฿${calculatedFlashPrice} (-${flashSaleDiscountPct}%) to recover ฿${unlockedCash.toLocaleString()} cash within 7 days (Customizable status).`
                        )}
                  </div>
                </div>

                {/* Option B: Premium Gift with High-Margin */}
                <div style={{ padding: '0.75rem', borderRadius: '12px', background: 'rgba(168, 85, 247, 0.12)', border: '1px solid rgba(168, 85, 247, 0.35)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                    <span style={{ fontSize: '0.82rem', fontWeight: 900, color: '#c084fc' }}>
                      🎁 {tx('กลยุทธ์ B: ของแถมพรีเมียมคู่สินค้ากำไรสูง', 'Strategy B: Premium Gift with Flagship Serum')}
                    </span>
                    <span style={{ fontSize: '0.7rem', color: '#c084fc', fontWeight: 800 }}>
                      {tx('กำไรเซรั่มแบกรับได้', 'Margin Protected')}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#cbd5e1', lineHeight: 1.5 }}>
                    {appliedGifts[deadStockTarget.sku]
                      ? tx('✓ เปิดระบบแถมคู่เซรั่มยอดครบ ฿2,500 เรียบร้อยแล้ว', '✓ Configured as free gift on ฿2,500+ orders')
                      : tx(
                          'จัดเป็นของแถมเมื่อซื้อเซรั่มยอดครบ ฿2,500 กระตุ้นให้ลูกค้าสั่งซื้อเพิ่ม โดยกำไรจากเซรั่มครอบคลุมต้นทุนได้ทั้งหมด',
                          'Bundle as complimentary gift for Serum purchases over ฿2,500. Flagship gross margin absorbs cost safely.'
                        )}
                  </div>
                </div>
              </div>
            </div>

            {/* 1-Click Action Buttons with Flash Sale Customizer */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', paddingTop: '0.5rem', borderTop: '1px solid rgba(148, 163, 184, 0.15)' }}>
              <button
                type="button"
                onClick={() => handleOpenFlashSaleCustomizer(deadStockTarget.sku)}
                style={{
                  width: '100%',
                  padding: '0.75rem',
                  borderRadius: '12px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #d97706, #b45309, #78350f)',
                  color: '#ffffff',
                  fontWeight: 900,
                  fontSize: '0.84rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem',
                  boxShadow: '0 4px 15px rgba(217, 119, 6, 0.3)'
                }}
              >
                ⚙️ {tx('⚡ ตั้งค่าสถานะ & สั่งเปิด Flash Sale ระบายสต็อก (1-Click)', '⚙️ Configure & Launch Flash Sale (1-Click)')}
              </button>

              <button
                type="button"
                onClick={() => handleApplyHighMarginGift(deadStockTarget.sku)}
                style={{
                  width: '100%',
                  padding: '0.6rem',
                  borderRadius: '10px',
                  border: '1px solid rgba(192, 132, 252, 0.4)',
                  background: 'rgba(168, 85, 247, 0.12)',
                  color: '#e9d5ff',
                  fontWeight: 800,
                  fontSize: '0.78rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem'
                }}
              >
                🎁 {tx('ตั้งค่าเป็นของแถมพรีเมียมคู่กับเซรั่มทันที', 'Set as Free VIP Gift with Flagship Serum')}
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* MISSION 3: DYNAMIC PRICING & PROMO BREAK-EVEN SIMULATOR */}
        {/* ========================================================================= */}
        {(activePlaybookTab === 'all' || activePlaybookTab === 'simulator') && (
          <div
            className="glass-card"
            style={{
              padding: '1.35rem',
              borderRadius: '18px',
              border:
                safetyStatus === 'safe'
                  ? '1.5px solid rgba(16, 185, 129, 0.55)'
                  : safetyStatus === 'caution'
                  ? '1.5px solid rgba(251, 191, 36, 0.55)'
                  : '1.5px solid rgba(244, 63, 94, 0.65)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '1rem',
              background: 'linear-gradient(145deg, rgba(251, 191, 36, 0.08) 0%, rgba(15, 23, 42, 0.95) 100%)'
            }}
          >
            <div>
              {/* Top Badge & Metric */}
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
                  🧮 {tx('ภารกิจที่ 3: ตัวจำลองราคาและโปรโมชันไม่เข้าเนื้อ', 'Mission 3: Dynamic Pricing & Promo Break-Even Simulator')}
                </span>
                <span
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 900,
                    padding: '0.2rem 0.55rem',
                    borderRadius: '8px',
                    background:
                      safetyStatus === 'safe'
                        ? 'rgba(16, 185, 129, 0.2)'
                        : safetyStatus === 'caution'
                        ? 'rgba(245, 158, 11, 0.2)'
                        : 'rgba(239, 68, 68, 0.2)',
                    color:
                      safetyStatus === 'safe'
                        ? '#34d399'
                        : safetyStatus === 'caution'
                        ? '#fbbf24'
                        : '#f87171'
                  }}
                >
                  {safetyStatus === 'safe'
                    ? tx('🟢 กำไรปลอดภัย', '🟢 Margin Safe')
                    : safetyStatus === 'caution'
                    ? tx('🟡 ต้องเฝ้าระวังยอดขาย', '🟡 High Volume Required')
                    : tx('🔴 เสี่ยงขาดทุน/เข้าเนื้อ', '🔴 High Risk / Margin Loss')}
                </span>
              </div>

              <h4 style={{ margin: '0 0 0.4rem 0', fontSize: '1.1rem', fontWeight: 900, color: '#f8fafc' }}>
                {tx(
                  'ลดราคานี้ ต้องขายเพิ่มกี่ชิ้นถึงจะได้กำไรเท่าเดิม?',
                  'Break-Even Promo Simulator (Prevent Profit Erosion)'
                )}
              </h4>

              {/* Selector & Sliders Box */}
              <div style={{ padding: '0.85rem', borderRadius: '12px', background: 'rgba(15, 23, 42, 0.85)', border: '1px solid rgba(251, 191, 36, 0.25)', marginBottom: '0.85rem' }}>
                {/* Item Select */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.65rem' }}>
                  <label style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                    {tx('เลือกสินค้าที่จะจำลองโปร:', 'Simulate Product:')}
                  </label>
                  <select
                    value={simSelectedSku}
                    onChange={e => setSimSelectedSku(e.target.value)}
                    style={{ padding: '0.2rem 0.5rem', borderRadius: '6px', background: '#0f172a', color: '#fbbf24', border: '1px solid rgba(251, 191, 36, 0.4)', fontSize: '0.76rem', fontWeight: 800 }}
                  >
                    {currentInventory.map(item => (
                      <option key={item.sku} value={item.sku}>
                        {item.sku} - {item.th?.name || item.sku} (฿{item.price})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Discount Slider */}
                <div style={{ marginBottom: '0.65rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                    <span style={{ fontSize: '0.78rem', color: '#cbd5e1' }}>
                      {tx('เปอร์เซ็นต์ที่ต้องการลดราคา (%):', 'Discount Percentage (%):')}
                    </span>
                    <span style={{ fontSize: '0.9rem', fontWeight: 900, color: '#fbbf24' }}>
                      -{simDiscountPct}% (ลดเหลือ ฿{newUnitPrice.toLocaleString()})
                    </span>
                  </div>
                  <input
                    type="range"
                    min={5}
                    max={50}
                    step={1}
                    value={simDiscountPct}
                    onChange={e => setSimDiscountPct(Number(e.target.value))}
                    style={{ width: '100%', accentColor: '#fbbf24', cursor: 'pointer' }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: '#64748b' }}>
                    <span>5%</span>
                    <span>15%</span>
                    <span>30%</span>
                    <span>50%</span>
                  </div>
                </div>

                {/* Base Monthly Sales Volume */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.76rem', color: '#94a3b8' }}>
                    {tx('ยอดขายปกติเฉลี่ยต่อเดือน:', 'Baseline Monthly Volume:')}
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <input
                      type="number"
                      min={10}
                      max={5000}
                      value={simMonthlyBaseQty}
                      onChange={e => setSimMonthlyBaseQty(Math.max(1, Number(e.target.value) || 100))}
                      style={{ width: '70px', padding: '0.2rem 0.4rem', borderRadius: '6px', background: '#0f172a', color: '#fff', border: '1px solid rgba(148, 163, 184, 0.3)', fontSize: '0.78rem', fontWeight: 800, textAlign: 'right' }}
                    />
                    <span style={{ fontSize: '0.76rem', color: '#cbd5e1' }}>{tx('ชิ้น', 'units')}</span>
                  </div>
                </div>
              </div>

              {/* Break-Even Result Box */}
              <div
                style={{
                  padding: '0.85rem',
                  borderRadius: '14px',
                  background:
                    safetyStatus === 'safe'
                      ? 'rgba(16, 185, 129, 0.12)'
                      : safetyStatus === 'caution'
                      ? 'rgba(245, 158, 11, 0.14)'
                      : 'rgba(239, 68, 68, 0.15)',
                  border:
                    safetyStatus === 'safe'
                      ? '1px solid rgba(16, 185, 129, 0.4)'
                      : safetyStatus === 'caution'
                      ? '1px solid rgba(245, 158, 11, 0.4)'
                      : '1px solid rgba(239, 68, 68, 0.5)',
                  marginBottom: '0.75rem'
                }}
              >
                <div style={{ fontSize: '0.82rem', fontWeight: 900, color: safetyStatus === 'danger' ? '#f87171' : '#fbbf24', marginBottom: '0.4rem' }}>
                  📊 {tx('ผลการคำนวณจุดคุ้มทุนกำไรเท่าเดิม (Break-Even Insight):', 'Break-Even Profit Target:')}
                </div>

                {isLossMaking ? (
                  <div style={{ fontSize: '0.86rem', color: '#f87171', fontWeight: 800, lineHeight: 1.55 }}>
                    ⚠️ {tx(
                      `เตือนภัยเข้าเนื้อรุนแรง: ราคาขายใหม่ ฿${newUnitPrice} ต่ำกว่าหรือเท่าต้นทุนสินค้า ฿${simCost} ยิ่งขายยิ่งขาดทุน ไม่สามารถจัดโปรนี้ได้เด็ดขาด!`,
                      `CRITICAL WARNING: Discounted price ฿${newUnitPrice} is below cost ฿${simCost}. Every sale incurs a net loss. Do not run this promo!`
                    )}
                  </div>
                ) : (
                  <div>
                    <div style={{ fontSize: '0.94rem', color: '#f8fafc', fontWeight: 800, lineHeight: 1.6 }}>
                      {tx(
                        `ถ้าลดราคา ${simDiscountPct}% คุณต้องขายให้ได้เพิ่มขึ้นอย่างน้อย `,
                        `If discounting ${simDiscountPct}%, you must increase sales volume by at least `
                      )}
                      <span style={{ fontSize: '1.25rem', color: safetyStatus === 'danger' ? '#f87171' : '#34d399', fontWeight: 900 }}>
                        +{requiredUpliftPct}%
                      </span>
                      {tx(
                        ` (ต้องขายรวม ${requiredTotalQty.toLocaleString()} ชิ้น หรือเพิ่มอีก +${requiredExtraUnits.toLocaleString()} ชิ้น) ถึงจะได้กำไรสุทธิเท่าเดิม!`,
                        ` (Total ${requiredTotalQty.toLocaleString()} units or +${requiredExtraUnits.toLocaleString()} extra units) to preserve original net profit!`
                      )}
                    </div>

                    <div style={{ marginTop: '0.55rem', fontSize: '0.76rem', color: '#cbd5e1', lineHeight: 1.5 }}>
                      {safetyStatus === 'safe' &&
                        tx(
                          '✅ ปลอดภัย: ส่วนต่างกำไรยังแข็งแรง หากมีแคมเปญกระตุ้นยอดขายรองรับ โปรโมชันนี้จะช่วยเพิ่มกระแสเงินสดได้ดี',
                          '✅ Safe: Margin buffer remains healthy. Recommended if supported with ad promotion.'
                        )}
                      {safetyStatus === 'caution' &&
                        tx(
                          '🟡 เฝ้าระวัง: ต้องขายเพิ่มเกือบเท่าตัว หากกลุ่มเป้าหมายไม่ใหญ่พอ อาจเหนื่อยฟรีได้กำไรเท่าเดิม',
                          '🟡 Moderate Caution: Requires strong demand uplift. Ensure you have sufficient promotional reach.'
                        )}
                      {safetyStatus === 'danger' &&
                        tx(
                          '🔴 เตือนภัยเสี่ยงเข้าเนื้อ: ต้องขายเพิ่มสูงมากเกินความเป็นจริง (+80% ขึ้นไป) เสี่ยงจัดโปรแบบเข้าเนื้อตัวเอง แนะนำลดไม่เกิน 15%',
                          '🔴 High Risk: Requires an unrealistic volume surge (>+80%). Likely to erode gross profit. Cap discount at 15%.'
                        )}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 1-Click Action Button */}
            <div style={{ paddingTop: '0.5rem', borderTop: '1px solid rgba(148, 163, 184, 0.15)' }}>
              <button
                type="button"
                onClick={() => {
                  toast.success(
                    tx(
                      `📊 บันทึกแบบจำลองส่วนลด ${simDiscountPct}% สำหรับ "${simItem.th?.name || simItem.sku}" เข้าสู่รายงานเปรียบเทียบกำไรเรียบร้อยแล้ว`,
                      `📊 Saved ${simDiscountPct}% break-even simulation for "${simItem.sku}" to report!`
                    )
                  );
                }}
                style={{
                  width: '100%',
                  padding: '0.72rem',
                  borderRadius: '12px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                  color: '#0f172a',
                  fontWeight: 900,
                  fontSize: '0.84rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.4rem'
                }}
              >
                💾 {tx('บันทึกผลการจำลองราคาเข้าสู่บันทึกแผนงานกลยุทธ์', 'Save Simulation to Strategic Plan')}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* FLASH SALE CUSTOMIZATION POPUP MODAL (1-Click Action Customizer) */}
      {/* ========================================================================= */}
      {isFlashSaleModalOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.82)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 9999,
            padding: '1rem'
          }}
        >
          <div
            className="glass-card"
            style={{
              width: '100%',
              maxWidth: '560px',
              maxHeight: '92vh',
              overflowY: 'auto',
              borderRadius: '24px',
              border: '2px solid rgba(251, 191, 36, 0.55)',
              background: '#0c1222',
              padding: '1.75rem',
              boxShadow: '0 25px 60px -15px rgba(0,0,0,0.9), 0 0 35px rgba(251, 191, 36, 0.25)',
              position: 'relative'
            }}
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsFlashSaleModalOpen(false)}
              style={{
                position: 'absolute',
                top: '1.25rem',
                right: '1.25rem',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.1)',
                border: 'none',
                color: '#fff',
                fontWeight: 900,
                cursor: 'pointer'
              }}
            >
              ✕
            </button>

            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <LuxuryIconBadge variant="gold" size="md" active>
                <LuxuryModuleIcon type="inventory" size={24} />
              </LuxuryIconBadge>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 900, color: '#fbbf24' }}>
                  ⚙️ {tx('ตั้งค่าสถานะ & รูปแบบแคมเปญ Flash Sale', 'Configure Flash Sale Status & Rules')}
                </h3>
                <p style={{ margin: '0.15rem 0 0 0', fontSize: '0.78rem', color: '#94a3b8' }}>
                  {tx('ปรับแต่งได้อิสระว่าต้องการปล่อยแคมเปญล้างสต็อกในรูปแบบใด', 'Customize your clearance campaign status, pricing, and quota')}
                </p>
              </div>
            </div>

            {/* Selected Product Info */}
            <div style={{ padding: '0.85rem', borderRadius: '12px', background: 'rgba(15, 23, 42, 0.9)', border: '1px solid rgba(251, 191, 36, 0.3)', marginBottom: '1.15rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.88rem', fontWeight: 900, color: '#f8fafc' }}>
                  {deadStockTarget.th?.name || deadStockTarget.sku}
                </span>
                <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#fbbf24' }}>
                  {tx('สต็อกคงเหลือ:', 'In Stock:')} {deadStockTarget.stock} {tx('ชิ้น', 'units')}
                </span>
              </div>
              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.4rem', fontSize: '0.78rem', color: '#94a3b8' }}>
                <span>{tx('ราคาเดิม:', 'Original Price:')} <strong style={{ color: '#fff' }}>฿{deadStockTarget.price}</strong></span>
                <span>{tx('ต้นทุนสินค้า:', 'Cost per unit:')} <strong style={{ color: '#fff' }}>฿{deadStockCost}</strong></span>
                <span>{tx('ทุนจมสะสม:', 'Sunk Capital:')} <strong style={{ color: '#f87171' }}>฿{sunkCapital.toLocaleString()}</strong></span>
              </div>
            </div>

            {/* Form Fields */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {/* 1. Campaign Format Selection */}
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 800, color: '#cbd5e1', marginBottom: '0.4rem' }}>
                  🏷️ {tx('เลือกรูปแบบสถานะ Flash Sale ที่ต้องการเปิด:', 'Select Flash Sale Campaign Format:')}
                </label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '0.45rem' }}>
                  {[
                    { id: '24h_rush', icon: '⚡', label: campaignTypeNames['24h_rush'][isEn ? 'en' : 'th'] },
                    { id: 'weekend_clearance', icon: '🔥', label: campaignTypeNames['weekend_clearance'][isEn ? 'en' : 'th'] },
                    { id: 'mid_month', icon: '🏷️', label: campaignTypeNames['mid_month'][isEn ? 'en' : 'th'] },
                    { id: 'payday_rush', icon: '💰', label: campaignTypeNames['payday_rush'][isEn ? 'en' : 'th'] },
                    { id: 'custom', icon: '✍️', label: tx('กำหนดชื่อแคมเปญเองตามใจชอบ...', 'Custom campaign name...') }
                  ].map(c => (
                    <div
                      key={c.id}
                      onClick={() => setFlashSaleCampaignType(c.id)}
                      style={{
                        padding: '0.65rem 0.85rem',
                        borderRadius: '10px',
                        border: flashSaleCampaignType === c.id ? '1.5px solid #fbbf24' : '1px solid rgba(148, 163, 184, 0.25)',
                        background: flashSaleCampaignType === c.id ? 'rgba(251, 191, 36, 0.18)' : 'rgba(15, 23, 42, 0.7)',
                        color: flashSaleCampaignType === c.id ? '#fbbf24' : '#cbd5e1',
                        fontSize: '0.82rem',
                        fontWeight: flashSaleCampaignType === c.id ? 900 : 700,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      <input
                        type="radio"
                        checked={flashSaleCampaignType === c.id}
                        onChange={() => setFlashSaleCampaignType(c.id)}
                        style={{ accentColor: '#fbbf24' }}
                      />
                      <span>{c.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Custom Name Input if chosen */}
              {flashSaleCampaignType === 'custom' && (
                <div>
                  <label style={{ display: 'block', fontSize: '0.78rem', color: '#fbbf24', marginBottom: '0.3rem' }}>
                    ✍️ {tx('ระบุชื่อแคมเปญของคุณ:', 'Enter Custom Campaign Title:')}
                  </label>
                  <input
                    type="text"
                    value={customCampaignName}
                    onChange={e => setCustomCampaignName(e.target.value)}
                    placeholder={tx('เช่น Flash Sale ล้างสต็อก 48 ชม. ลดปิดสาขา', 'e.g. 48-Hour Warehouse Clearance Special')}
                    style={{ width: '100%', padding: '0.65rem', borderRadius: '10px', background: '#050814', color: '#fff', border: '1px solid #fbbf24', fontSize: '0.84rem' }}
                  />
                </div>
              )}

              {/* 2. Discount Slider & Target Price */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <label style={{ fontSize: '0.82rem', fontWeight: 800, color: '#cbd5e1' }}>
                    🎯 {tx('เปอร์เซ็นต์ส่วนลด Flash Sale (%):', 'Flash Sale Discount Rate (%):')}
                  </label>
                  <span style={{ fontSize: '0.92rem', fontWeight: 900, color: '#34d399' }}>
                    -{flashSaleDiscountPct}% ➔ ฿{calculatedFlashPrice} {tx('/ชิ้น', '/unit')}
                  </span>
                </div>
                <input
                  type="range"
                  min={10}
                  max={60}
                  step={5}
                  value={flashSaleDiscountPct}
                  onChange={e => setFlashSaleDiscountPct(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#34d399', cursor: 'pointer' }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: '#94a3b8' }}>
                  <span>10% (฿{Math.round(deadStockTarget.price * 0.9)})</span>
                  <span>35% (฿{Math.round(deadStockTarget.price * 0.65)})</span>
                  <span>50% (฿{Math.round(deadStockTarget.price * 0.5)})</span>
                </div>
              </div>

              {/* 3. Quota Volume */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                  <label style={{ fontSize: '0.82rem', fontWeight: 800, color: '#cbd5e1' }}>
                    📦 {tx('โควต้าจำนวนชิ้นที่จะปล่อยใน Flash Sale:', 'Flash Sale Unit Quota:')}
                  </label>
                  <span style={{ fontSize: '0.88rem', fontWeight: 900, color: '#38bdf8' }}>
                    {flashSaleQuota} {tx('ชิ้น', 'units')}
                  </span>
                </div>
                <input
                  type="number"
                  min={1}
                  max={deadStockTarget.stock || 500}
                  value={flashSaleQuota}
                  onChange={e => setFlashSaleQuota(Math.min(deadStockTarget.stock || 500, Math.max(1, Number(e.target.value) || 1)))}
                  style={{ width: '100%', padding: '0.6rem', borderRadius: '10px', background: '#050814', color: '#fff', border: '1px solid rgba(148, 163, 184, 0.3)', fontSize: '0.85rem', fontWeight: 800 }}
                />
              </div>

              {/* Realtime Financial Impact Preview */}
              <div style={{ padding: '0.85rem', borderRadius: '14px', background: 'rgba(16, 185, 129, 0.12)', border: '1px solid rgba(16, 185, 129, 0.35)' }}>
                <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginBottom: '0.35rem' }}>
                  💰 {tx('สรุปผลการเงินที่จะได้รับหลังเปิดแคมเปญนี้:', 'Financial Recovery Impact Summary:')}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                  <div>
                    <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{tx('เงินสดปลดล็อกกลับเข้าร้าน', 'Cash Recovered')}</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#34d399' }}>฿{unlockedCash.toLocaleString()}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '0.7rem', color: '#94a3b8' }}>{tx('กำไรคงเหลือเหนือก้นถุง', 'Remaining Net Margin')}</div>
                    <div style={{ fontSize: '1.25rem', fontWeight: 900, color: '#fbbf24' }}>฿{flashSaleProfit.toLocaleString()}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.4rem' }}>
              <button
                type="button"
                onClick={() => setIsFlashSaleModalOpen(false)}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  borderRadius: '12px',
                  border: '1px solid rgba(148, 163, 184, 0.3)',
                  background: 'rgba(15, 23, 42, 0.8)',
                  color: '#cbd5e1',
                  fontWeight: 800,
                  fontSize: '0.85rem',
                  cursor: 'pointer'
                }}
              >
                {tx('ยกเลิก', 'Cancel')}
              </button>

              <button
                type="button"
                onClick={handleConfirmCustomFlashSale}
                style={{
                  flex: 2,
                  padding: '0.75rem',
                  borderRadius: '12px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #10b981, #059669)',
                  color: '#ffffff',
                  fontWeight: 900,
                  fontSize: '0.88rem',
                  cursor: 'pointer',
                  boxShadow: '0 4px 15px rgba(16, 185, 129, 0.4)'
                }}
              >
                {tx('✅ ยืนยันบันทึก & เปิด Flash Sale ทันที', '✅ Confirm & Launch Flash Sale')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

