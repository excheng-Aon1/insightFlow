import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { LuxuryIconBadge, LuxuryModuleIcon } from './LuxuryIcons';

export function InventoryTab({
  lang,
  inventoryList,
  setInventoryList,
  renderUploadZone
}) {
  const isEn = lang === 'en';
  const tx = (th, en) => (isEn ? en : th);

  const [invFilter, setInvFilter] = useState('all');
  const [invSearch, setInvSearch] = useState('');
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [newSku, setNewSku] = useState('');
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newStock, setNewStock] = useState('');

  const filteredItems = inventoryList.filter(item => {
    const info = item[isEn ? 'en' : 'th'];
    const matchFilter = invFilter === 'all' || item.status === invFilter;
    const q = invSearch.trim().toLowerCase();
    const matchSearch =
      !q ||
      item.sku.toLowerCase().includes(q) ||
      info.name.toLowerCase().includes(q) ||
      info.category.toLowerCase().includes(q);
    return matchFilter && matchSearch;
  });

  const totalInventoryValue = inventoryList.reduce((acc, item) => acc + item.price * item.stock, 0);
  const lowOrOutCount = inventoryList.filter(i => i.status === 'low_stock' || i.status === 'out_of_stock').length;
  const deadStockCount = inventoryList.filter(i => i.status === 'dead_stock').length;

  const handleRestockItem = sku => {
    setInventoryList(prev =>
      prev.map(item => {
        if (item.sku !== sku) return item;
        const nextStock = item.stock + 50;
        return {
          ...item,
          stock: nextStock,
          status: 'in_stock',
          th: { ...item.th, statusLabel: 'มีสินค้าพร้อมขาย' },
          en: { ...item.en, statusLabel: 'In Stock' }
        };
      })
    );
    toast.success(
      tx(
        `เติมสต็อกสินค้า ${sku} เพิ่ม +50 ชิ้นเรียบร้อยแล้ว!`,
        `Restocked +50 units for ${sku}!`
      )
    );
  };

  const handleClearancePromo = sku => {
    setInventoryList(prev =>
      prev.map(item => {
        if (item.sku !== sku) return item;
        const discounted = Math.max(10, Math.round(item.price * 0.7));
        return {
          ...item,
          price: discounted,
          status: 'in_stock',
          th: { ...item.th, statusLabel: 'กำลังจัดโปรลดราคา 30%' },
          en: { ...item.en, statusLabel: 'Active 30% Clearance Promo' }
        };
      })
    );
    toast.success(
      tx(
        `ปรับลดราคา 30% เพื่อระบายสินค้าค้างสต็อก (${sku}) เรียบร้อยแล้ว!`,
        `Applied 30% clearance discount to ${sku}!`
      )
    );
  };

  const handleAddNewProduct = e => {
    e.preventDefault();
    if (!newName.trim()) {
      toast.error(tx('กรุณากรอกชื่อสินค้า', 'Please enter a product name'));
      return;
    }
    const priceNum = Math.max(1, Number(newPrice) || 590);
    const stockNum = Math.max(0, Number(newStock) || 100);
    const skuCode = newSku.trim() || `SKU-${Math.floor(100 + Math.random() * 900)}`;
    const statusKey = stockNum === 0 ? 'out_of_stock' : stockNum < 20 ? 'low_stock' : 'in_stock';
    const newItem = {
      sku: skuCode,
      price: priceNum,
      stock: stockNum,
      status: statusKey,
      th: {
        name: newName.trim(),
        category: newCategory.trim() || 'สินค้าทั่วไป',
        statusLabel:
          statusKey === 'out_of_stock'
            ? 'สินค้าหมดชั่วคราว'
            : statusKey === 'low_stock'
            ? 'ใกล้หมดสต็อก (ต้องสั่งเพิ่ม)'
            : 'มีสินค้าพร้อมขาย'
      },
      en: {
        name: newName.trim(),
        category: newCategory.trim() || 'General Merchandise',
        statusLabel:
          statusKey === 'out_of_stock'
            ? 'Out of Stock'
            : statusKey === 'low_stock'
            ? 'Low Stock (Reorder Soon)'
            : 'In Stock'
      }
    };
    setInventoryList(prev => [newItem, ...prev]);
    setNewSku('');
    setNewName('');
    setNewCategory('');
    setNewPrice('');
    setNewStock('');
    setShowAddProduct(false);
    toast.success(
      tx(
        `เพิ่มสินค้าใหม่ "${newItem.th.name}" เข้าคลังเรียบร้อยแล้ว!`,
        `Added "${newItem.en.name}" to inventory!`
      )
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {renderUploadZone('inventory', tx('คลังสินค้าและสต็อกอัจฉริยะ', 'Smart Inventory & Stock Control'))}

      {/* Top Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        <div className="glass-card" style={{ padding: '1.25rem', borderRadius: '16px', borderLeft: '4px solid #38bdf8' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 700 }}>
              {tx('มูลค่าสินค้าคงคลังทั้งหมด', 'Total Inventory Value')}
            </div>
            <LuxuryIconBadge variant="sapphire" size="sm" active>
              <LuxuryModuleIcon type="inventory" size={20} />
            </LuxuryIconBadge>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#f8fafc', marginTop: '0.35rem' }}>
            ฿{totalInventoryValue.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.8rem', color: '#38bdf8', marginTop: '0.2rem' }}>
            {inventoryList.length} {tx('รายการสินค้าในระบบ', 'Active SKUs in stock')}
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem', borderRadius: '16px', borderLeft: '4px solid #f43f5e' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 700 }}>
              {tx('สินค้าใกล้หมด / หมดสต็อก', 'Low or Out-of-Stock Items')}
            </div>
            <LuxuryIconBadge variant="ruby" size="sm" active>
              <LuxuryModuleIcon type="alert" size={20} />
            </LuxuryIconBadge>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#fda4af', marginTop: '0.35rem' }}>
            {lowOrOutCount} {tx('รายการ', 'Items')}
          </div>
          <div style={{ fontSize: '0.8rem', color: '#fecdd3', marginTop: '0.2rem' }}>
            {tx('กดปุ่ม "+50 เติมของ" ในตารางได้ทันที', 'Click "+50 Restock" in table below')}
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem', borderRadius: '16px', borderLeft: '4px solid #f59e0b' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 700 }}>
              {tx('สินค้าค้างสต็อกนาน', 'Slow-Moving Stock')}
            </div>
            <LuxuryIconBadge variant="gold" size="sm" active>
              <LuxuryModuleIcon type="wallet" size={20} />
            </LuxuryIconBadge>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#fbbf24', marginTop: '0.35rem' }}>
            {deadStockCount} {tx('รายการ', 'Items')}
          </div>
          <div style={{ fontSize: '0.8rem', color: '#fde68a', marginTop: '0.2rem' }}>
            {tx('แนะนำจัดโปรโมชันลดราคาเพื่อเปลี่ยนเป็นเงินสด', 'Run clearance promo to free up cash')}
          </div>
        </div>
      </div>

      {/* Filter Bar + Add Product Button */}
      <div className="glass-card" style={{ padding: '1.35rem', borderRadius: '18px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
            {[
              { id: 'all', th: 'สินค้าทั้งหมด', en: 'All Items' },
              { id: 'in_stock', th: 'พร้อมขาย', en: 'In Stock' },
              { id: 'low_stock', th: 'ใกล้หมดสต็อก', en: 'Low Stock' },
              { id: 'dead_stock', th: 'สินค้าค้างสต็อก', en: 'Slow Moving' },
              { id: 'out_of_stock', th: 'สินค้าหมด', en: 'Out of Stock' }
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setInvFilter(tab.id)}
                style={{
                  padding: '0.5rem 0.95rem',
                  borderRadius: '999px',
                  border: invFilter === tab.id ? '1.5px solid #38bdf8' : '1px solid rgba(148,163,184,0.25)',
                  background: invFilter === tab.id ? 'rgba(56, 189, 248, 0.2)' : 'rgba(15, 23, 42, 0.6)',
                  color: invFilter === tab.id ? '#38bdf8' : '#cbd5e1',
                  fontWeight: 800,
                  fontSize: '0.84rem',
                  cursor: 'pointer'
                }}
              >
                {isEn ? tab.en : tab.th}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', alignItems: 'center' }}>
            <input
              type="text"
              value={invSearch}
              onChange={e => setInvSearch(e.target.value)}
              placeholder={tx('🔍 ค้นหาชื่อสินค้า หรือรหัสสินค้า...', '🔍 Search product name or SKU...')}
              style={{
                padding: '0.6rem 0.95rem',
                borderRadius: '10px',
                border: '1px solid rgba(148,163,184,0.3)',
                background: 'rgba(15, 23, 42, 0.8)',
                color: '#f8fafc',
                minWidth: '230px'
              }}
            />
            <button
              type="button"
              onClick={() => setShowAddProduct(!showAddProduct)}
              style={{
                padding: '0.65rem 1.1rem',
                borderRadius: '10px',
                border: 'none',
                background: 'linear-gradient(135deg, #10b981, #059669)',
                color: '#fff',
                fontWeight: 800,
                cursor: 'pointer'
              }}
            >
              {tx('➕ เพิ่มรายการสินค้าใหม่', '➕ Add New Product')}
            </button>
          </div>
        </div>

        {showAddProduct && (
          <form
            onSubmit={handleAddNewProduct}
            style={{
              marginBottom: '1.25rem',
              padding: '1.2rem',
              borderRadius: '14px',
              background: 'rgba(15, 23, 42, 0.9)',
              border: '1.5px solid rgba(16, 185, 129, 0.45)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
              gap: '0.85rem',
              alignItems: 'end'
            }}
          >
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.25rem' }}>
                {tx('รหัสสินค้า', 'SKU Code')}
              </label>
              <input
                type="text"
                value={newSku}
                onChange={e => setNewSku(e.target.value)}
                placeholder="SKU-889"
                style={{ width: '100%', padding: '0.55rem', borderRadius: '8px', background: '#0f172a', color: '#fff', border: '1px solid rgba(148,163,184,0.3)' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.25rem' }}>
                {tx('ชื่อสินค้า', 'Product Name')}
              </label>
              <input
                type="text"
                value={newName}
                onChange={e => setNewName(e.target.value)}
                placeholder={tx('เช่น วิตามินซีเข้มข้น', 'e.g. Vitamin C Serum')}
                style={{ width: '100%', padding: '0.55rem', borderRadius: '8px', background: '#0f172a', color: '#fff', border: '1px solid rgba(148,163,184,0.3)' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.25rem' }}>
                {tx('หมวดหมู่', 'Category')}
              </label>
              <input
                type="text"
                value={newCategory}
                onChange={e => setNewCategory(e.target.value)}
                placeholder={tx('สกินแคร์', 'Skincare')}
                style={{ width: '100%', padding: '0.55rem', borderRadius: '8px', background: '#0f172a', color: '#fff', border: '1px solid rgba(148,163,184,0.3)' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.25rem' }}>
                {tx('ราคาต่อชิ้น (บาท)', 'Unit Price (THB)')}
              </label>
              <input
                type="number"
                value={newPrice}
                onChange={e => setNewPrice(e.target.value)}
                placeholder="890"
                style={{ width: '100%', padding: '0.55rem', borderRadius: '8px', background: '#0f172a', color: '#fff', border: '1px solid rgba(148,163,184,0.3)' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.25rem' }}>
                {tx('จำนวนคงเหลือ (ชิ้น)', 'Stock Qty')}
              </label>
              <input
                type="number"
                value={newStock}
                onChange={e => setNewStock(e.target.value)}
                placeholder="100"
                style={{ width: '100%', padding: '0.55rem', borderRadius: '8px', background: '#0f172a', color: '#fff', border: '1px solid rgba(148,163,184,0.3)' }}
              />
            </div>
            <button
              type="submit"
              style={{
                padding: '0.6rem 1rem',
                borderRadius: '8px',
                border: 'none',
                background: '#10b981',
                color: '#fff',
                fontWeight: 800,
                cursor: 'pointer'
              }}
            >
              {tx('✅ บันทึกสินค้า', '✅ Save Item')}
            </button>
          </form>
        )}

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '760px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(148,163,184,0.2)', textAlign: 'left', color: '#94a3b8', fontSize: '0.84rem' }}>
                <th style={{ padding: '0.75rem' }}>{tx('รหัสสินค้า', 'SKU Code')}</th>
                <th style={{ padding: '0.75rem' }}>{tx('ชื่อสินค้า / หมวดหมู่', 'Product Name / Category')}</th>
                <th style={{ padding: '0.75rem' }}>{tx('ราคาขาย', 'Unit Price')}</th>
                <th style={{ padding: '0.75rem' }}>{tx('จำนวนคงเหลือ', 'Stock Balance')}</th>
                <th style={{ padding: '0.75rem' }}>{tx('สถานะคลัง', 'Status')}</th>
                <th style={{ padding: '0.75rem' }}>{tx('สั่งการด่วน', 'Quick Action')}</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map(item => {
                const info = item[isEn ? 'en' : 'th'];
                const badgeColor =
                  item.status === 'in_stock'
                    ? '#10b981'
                    : item.status === 'dead_stock'
                    ? '#f59e0b'
                    : '#f43f5e';
                return (
                  <tr key={item.sku} style={{ borderBottom: '1px solid rgba(148,163,184,0.12)' }}>
                    <td style={{ padding: '0.85rem 0.75rem', fontWeight: 800, color: '#38bdf8' }}>{item.sku}</td>
                    <td style={{ padding: '0.85rem 0.75rem' }}>
                      <div style={{ fontWeight: 800, color: '#f8fafc' }}>{info.name}</div>
                      <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{info.category}</div>
                    </td>
                    <td style={{ padding: '0.85rem 0.75rem', fontWeight: 800, color: '#fbbf24' }}>
                      ฿{item.price.toLocaleString()}
                    </td>
                    <td style={{ padding: '0.85rem 0.75rem', fontWeight: 900, color: item.stock <= 15 ? '#fda4af' : '#f8fafc' }}>
                      {item.stock.toLocaleString()} {tx('ชิ้น', 'units')}
                    </td>
                    <td style={{ padding: '0.85rem 0.75rem' }}>
                      <span
                        style={{
                          padding: '0.25rem 0.7rem',
                          borderRadius: '999px',
                          background: `${badgeColor}22`,
                          color: badgeColor,
                          fontWeight: 800,
                          fontSize: '0.8rem'
                        }}
                      >
                        {info.statusLabel}
                      </span>
                    </td>
                    <td style={{ padding: '0.85rem 0.75rem' }}>
                      <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
                        <button
                          type="button"
                          onClick={() => handleRestockItem(item.sku)}
                          style={{
                            padding: '0.42rem 0.8rem',
                            borderRadius: '8px',
                            border: '1px solid rgba(16,185,129,0.45)',
                            background: 'rgba(16,185,129,0.16)',
                            color: '#34d399',
                            fontWeight: 800,
                            fontSize: '0.8rem',
                            cursor: 'pointer'
                          }}
                        >
                          {tx('➕ เติมสต็อก +50 ชิ้น', '➕ Restock +50')}
                        </button>
                        {item.status === 'dead_stock' && (
                          <button
                            type="button"
                            onClick={() => handleClearancePromo(item.sku)}
                            style={{
                              padding: '0.42rem 0.8rem',
                              borderRadius: '8px',
                              border: '1px solid rgba(245,158,11,0.45)',
                              background: 'rgba(245,158,11,0.16)',
                              color: '#fbbf24',
                              fontWeight: 800,
                              fontSize: '0.8rem',
                              cursor: 'pointer'
                            }}
                          >
                            {tx('🏷️ จัดโปรลด 30%', '🏷️ 30% Clearance')}
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export function InsightsTab({
  lang,
  bizProfile,
  setBizProfile,
  aiChatMessages,
  setAiChatMessages,
  aiQuestionInput,
  setAiQuestionInput,
  isAiThinking,
  handleAskBusinessAi,
  handleRetrainBusinessAi,
  isTrainingAi,
  chatEndRef,
  renderUploadZone
}) {
  const isEn = lang === 'en';
  const tx = (th, en) => (isEn ? en : th);
  const [showTrainingPanel, setShowTrainingPanel] = useState(false);

  const quickQuestions = isEn
    ? [
        '1. How can we reach our sales target on time?',
        '2. Which inactive customers should we call today?',
        '3. Are there any suspicious bill cancellations at checkout?',
        '4. Which items are low in stock or slow-moving?',
        '5. Which sales channel gives the highest net profit?'
      ]
    : [
        '1. ต้องทำยอดขายวันละเท่าไหร่ถึงจะบรรลุเป้าหมายทันกำหนด?',
        '2. ลูกค้าประจำคนไหนหายไปนานและต้องรีบโทรตามวันนี้?',
        '3. มีพนักงานคนไหนกดยกเลิกบิลหรือเปิดลิ้นชักผิดปกติบ้าง?',
        '4. สินค้าตัวไหนใกล้หมดสต็อกและตัวไหนค้างสต็อกนาน?',
        '5. ขายผ่านช่องทางไหนได้กำไรสุทธิเข้ากระเป๋ามากที่สุด?'
      ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {renderUploadZone('insights', tx('ผู้ช่วยอัจฉริยะถาม-ตอบข้อมูลร้านค้า', 'Business Intelligence Q&A Assistant'))}

      {/* Top Banner + Train Button */}
      <div
        className="glass-card"
        style={{
          padding: '1.4rem',
          borderRadius: '18px',
          background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.16), rgba(15, 23, 42, 0.92))',
          border: '1.5px solid rgba(56, 189, 248, 0.4)',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: '1 1 320px' }}>
          <LuxuryIconBadge variant="cyan" size="lg" active>
            <LuxuryModuleIcon type="insights" size={30} />
          </LuxuryIconBadge>
          <div>
            <span
              style={{
                display: 'inline-block',
                padding: '0.28rem 0.75rem',
                borderRadius: '999px',
                background: 'rgba(56, 189, 248, 0.2)',
                color: '#38bdf8',
                fontWeight: 800,
                fontSize: '0.8rem',
                marginBottom: '0.35rem'
              }}
            >
              {tx('ผู้ช่วยอัจฉริยะที่เรียนรู้ข้อมูลธุรกิจจริงของคุณ', 'TRAINED ON YOUR LIVE STORE DATA')}
            </span>
            <h3 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 900, color: '#f8fafc' }}>
              {tx(
                'ถาม-ตอบปัญหาธุรกิจได้ทันที • วิเคราะห์จากยอดขาย ลูกค้า พนักงาน และสต็อกจริง',
                'Interactive Business Q&A • Powered by Real Sales, Customer, Staff & Stock Data'
              )}
            </h3>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowTrainingPanel(!showTrainingPanel)}
          style={{
            padding: '0.7rem 1.15rem',
            borderRadius: '12px',
            border: '1px solid rgba(251, 191, 36, 0.5)',
            background: 'rgba(251, 191, 36, 0.16)',
            color: '#fbbf24',
            fontWeight: 800,
            cursor: 'pointer'
          }}
        >
          {tx('ตั้งค่าและสอนข้อมูลธุรกิจของร้านคุณ', 'Customize Store Knowledge Profile')}
        </button>
      </div>

      {/* Business Profile Training Panel */}
      {showTrainingPanel && (
        <div
          className="glass-card"
          style={{
            padding: '1.35rem',
            borderRadius: '18px',
            border: '1.5px solid rgba(251, 191, 36, 0.45)',
            background: 'rgba(15, 23, 42, 0.95)'
          }}
        >
          <h4 style={{ margin: '0 0 0.85rem 0', fontSize: '1.1rem', fontWeight: 900, color: '#fbbf24' }}>
            {tx('🧠 ตั้งค่าข้อมูลจำเพาะของธุรกิจคุณ เพื่อให้ผู้ช่วยตอบได้ตรงจุด 100%', '🧠 Train Assistant with Your Store Profile & Margin Rules')}
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.9rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', color: '#94a3b8', marginBottom: '0.3rem' }}>
                {tx('ชื่อร้านค้า / บริษัทของคุณ', 'Store / Company Name')}
              </label>
              <input
                type="text"
                value={bizProfile.companyName}
                onChange={e => setBizProfile({ ...bizProfile, companyName: e.target.value })}
                style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', background: '#0f172a', color: '#fff', border: '1px solid rgba(148,163,184,0.3)' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', color: '#94a3b8', marginBottom: '0.3rem' }}>
                {tx('อัตรากำไรขั้นต้นเฉลี่ย (%)', 'Average Gross Margin (%)')}
              </label>
              <input
                type="number"
                value={bizProfile.grossMarginPct}
                onChange={e => setBizProfile({ ...bizProfile, grossMarginPct: Number(e.target.value) || 45 })}
                style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', background: '#0f172a', color: '#fff', border: '1px solid rgba(148,163,184,0.3)' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', color: '#94a3b8', marginBottom: '0.3rem' }}>
                {tx('สินค้าหลักที่ทำกำไรสูงสุด', 'Flagship Products')}
              </label>
              <input
                type="text"
                value={bizProfile.mainProducts}
                onChange={e => setBizProfile({ ...bizProfile, mainProducts: e.target.value })}
                style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', background: '#0f172a', color: '#fff', border: '1px solid rgba(148,163,184,0.3)' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', color: '#94a3b8', marginBottom: '0.3rem' }}>
                {tx('กฎเหล็กของร้าน (เช่น ห้ามลดราคาเกิน 20%)', 'Store Policy / Custom Rules')}
              </label>
              <input
                type="text"
                value={bizProfile.customRules}
                onChange={e => setBizProfile({ ...bizProfile, customRules: e.target.value })}
                style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', background: '#0f172a', color: '#fff', border: '1px solid rgba(148,163,184,0.3)' }}
              />
            </div>
          </div>
          <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end', gap: '0.6rem' }}>
            <button
              type="button"
              onClick={handleRetrainBusinessAi}
              disabled={isTrainingAi}
              style={{
                padding: '0.65rem 1.25rem',
                borderRadius: '10px',
                border: 'none',
                background: 'linear-gradient(135deg, #fbbf24, #d97706)',
                color: '#0f172a',
                fontWeight: 900,
                cursor: 'pointer'
              }}
            >
              {isTrainingAi
                ? tx('⏳ กำลังบันทึกและประมวลผล...', '⏳ Updating Knowledge Base...')
                : tx('✅ บันทึกและอัปเดตสมองผู้ช่วยทันที', '✅ Save & Retrain Assistant')}
            </button>
          </div>
        </div>
      )}

      {/* Quick Prompt Chips */}
      <div className="glass-card" style={{ padding: '1.2rem', borderRadius: '16px' }}>
        <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#94a3b8', marginBottom: '0.65rem' }}>
          {tx('💡 กดเลือกคำถามยอดฮิตเพื่อให้ผู้ช่วยวิเคราะห์ทันที:', '💡 Click any question below for an instant analysis:')}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.55rem' }}>
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleAskBusinessAi(q)}
              style={{
                padding: '0.55rem 0.95rem',
                borderRadius: '999px',
                border: '1px solid rgba(56, 189, 248, 0.35)',
                background: 'rgba(56, 189, 248, 0.12)',
                color: '#e0f2fe',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Conversation Window */}
      <div
        className="glass-card"
        style={{
          padding: '1.35rem',
          borderRadius: '18px',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}
      >
        <div
          style={{
            maxHeight: '420px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.9rem',
            paddingRight: '0.4rem'
          }}
        >
          {aiChatMessages.map(msg => (
            <div
              key={msg.id}
              style={{
                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '88%',
                padding: '1rem 1.2rem',
                borderRadius: '16px',
                background:
                  msg.role === 'user'
                    ? 'linear-gradient(135deg, #0284c7, #2563eb)'
                    : 'rgba(15, 23, 42, 0.9)',
                border:
                  msg.role === 'user'
                    ? 'none'
                    : '1px solid rgba(56, 189, 248, 0.35)',
                color: '#f8fafc'
              }}
            >
              <div style={{ fontSize: '0.76rem', color: msg.role === 'user' ? '#bae6fd' : '#38bdf8', fontWeight: 800, marginBottom: '0.35rem' }}>
                {msg.role === 'user'
                  ? tx('👤 คำถามจากคุณ', '👤 Your Question')
                  : tx('🤖 ผู้ช่วยวิเคราะห์ธุรกิจอัจฉริยะ', '🤖 Business Intelligence Assistant')}{' '}
                • {msg.timestamp}
              </div>
              <div style={{ whiteSpace: 'pre-line', lineHeight: 1.65, fontSize: '0.95rem' }}>{msg.text}</div>
              {msg.metrics && msg.metrics.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginTop: '0.65rem' }}>
                  {msg.metrics.map((m, i) => (
                    <span
                      key={i}
                      style={{
                        padding: '0.22rem 0.65rem',
                        borderRadius: '999px',
                        background: 'rgba(16, 185, 129, 0.16)',
                        color: '#34d399',
                        fontSize: '0.78rem',
                        fontWeight: 800
                      }}
                    >
                      {m}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
          {isAiThinking && (
            <div style={{ color: '#38bdf8', fontWeight: 800, fontSize: '0.9rem' }}>
              {tx('⏳ ผู้ช่วยกำลังคำนวณตัวเลขจากฐานข้อมูลร้านของคุณ...', '⏳ Analyzing your live store metrics...')}
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Form */}
        <form
          onSubmit={e => {
            e.preventDefault();
            handleAskBusinessAi();
          }}
          style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}
        >
          <input
            type="text"
            value={aiQuestionInput}
            onChange={e => setAiQuestionInput(e.target.value)}
            placeholder={tx(
              'พิมพ์คำถามเกี่ยวกับร้านของคุณที่นี่ เช่น ยอดขายวันนี้ ลูกค้าหาย หรือสต็อกใกล้หมด...',
              'Ask anything about your sales, customers, cashier audit, or inventory...'
            )}
            style={{
              flex: '1 1 280px',
              padding: '0.85rem 1.1rem',
              borderRadius: '12px',
              border: '1.5px solid rgba(56, 189, 248, 0.4)',
              background: 'rgba(15, 23, 42, 0.9)',
              color: '#f8fafc',
              fontSize: '0.95rem'
            }}
          />
          <button
            type="submit"
            style={{
              padding: '0.85rem 1.4rem',
              borderRadius: '12px',
              border: 'none',
              background: 'linear-gradient(135deg, #38bdf8, #2563eb)',
              color: '#fff',
              fontWeight: 900,
              cursor: 'pointer'
            }}
          >
            {tx('🚀 ส่งคำถาม', '🚀 Ask Now')}
          </button>
          <button
            type="button"
            onClick={() => {
              setAiChatMessages([aiChatMessages[0]]);
              toast.success(tx('ล้างประวัติการสนทนาเรียบร้อยแล้ว', 'Cleared conversation history'));
            }}
            style={{
              padding: '0.85rem 1rem',
              borderRadius: '12px',
              border: '1px solid rgba(148,163,184,0.3)',
              background: 'transparent',
              color: '#cbd5e1',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            {tx('ล้างแชต', 'Clear')}
          </button>
        </form>
      </div>
    </div>
  );
}

