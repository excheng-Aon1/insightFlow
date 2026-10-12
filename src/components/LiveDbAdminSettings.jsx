import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { LuxuryIconBadge, LuxuryModuleIcon } from './LuxuryIcons';

export function LiveTab({
  lang,
  currentRevenueVal,
  setCurrentRevenueVal,
  dbRecords,
  setDbRecords
}) {
  const isEn = lang === 'en';
  const tx = (th, en) => (isEn ? en : th);

  const [streamActive, setStreamActive] = useState(true);
  const [liveFeed, setLiveFeed] = useState([
    {
      id: 'EVT-901',
      time: tx('เมื่อสักครู่', 'Just now'),
      amount: 3490,
      th: {
        branch: 'สาขาสยามพารากอน (เครื่องที่ 1)',
        detail: 'ชำระเงินสำเร็จ — หูฟังไร้สายตัดเสียงรบกวนรุ่นโปร (สแกนคิวอาร์)'
      },
      en: {
        branch: 'Siam Paragon Branch (Register #1)',
        detail: 'Payment Completed — Pro Noise-Cancelling Wireless Earbuds (QR Pay)'
      }
    },
    {
      id: 'EVT-902',
      time: tx('2 นาทีที่แล้ว', '2 mins ago'),
      amount: 2580,
      th: {
        branch: 'ช่องทางวิดีโอสั้นและไลฟ์สด',
        detail: 'คำสั่งซื้อใหม่ — เซรั่มบำรุงผิวสูตรเข้มข้นพิเศษ x2 กล่อง'
      },
      en: {
        branch: 'Short-Video & Live Commerce',
        detail: 'New Order — Intensive Night Repair Serum x2'
      }
    },
    {
      id: 'EVT-903',
      time: tx('5 นาทีที่แล้ว', '5 mins ago'),
      amount: 6450,
      th: {
        branch: 'สาขาสุขุมวิท-ทองหล่อ (เครื่องที่ 2)',
        detail: 'ชำระเงินสำเร็จ — ชุดของขวัญพรีเมียม + อุปกรณ์เสริมแท้ (บัตรเครดิต)'
      },
      en: {
        branch: 'Sukhumvit-Thonglor Branch (Register #2)',
        detail: 'Payment Completed — Executive Gift Bundle + Official Accessories'
      }
    }
  ]);

  const handleSimulateLiveOrder = () => {
    const sampleAmounts = [1290, 2580, 3890, 4900, 6500];
    const amt = sampleAmounts[Math.floor(Math.random() * sampleAmounts.length)];
    const nowStr = new Date().toLocaleTimeString(isEn ? 'en-US' : 'th-TH', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const newEvt = {
      id: `EVT-${Math.floor(1000 + Math.random() * 9000)}`,
      time: nowStr,
      amount: amt,
      th: {
        branch: 'ช่องทางแชตร้านค้าและหน้าร้านจริง',
        detail: `รับชำระเงินสดและโอนสำเร็จ (+฿${amt.toLocaleString()}) อัปเดตเข้ายอดขายรวมทันที`
      },
      en: {
        branch: 'Direct Store Chat & POS Register',
        detail: `Instant payment verified (+฿${amt.toLocaleString()}) — added to total store revenue`
      }
    };
    setLiveFeed(prev => [newEvt, ...prev.slice(0, 7)]);
    setCurrentRevenueVal(prev => prev + amt);
    if (setDbRecords && dbRecords) {
      setDbRecords(prev => [
        {
          id: `TXN-2026-${Math.floor(910 + Math.random() * 90)}`,
          date: nowStr,
          amount: amt,
          itemsCount: 2,
          th: {
            channel: 'รายการขายสดหน้าร้าน/ออนไลน์',
            customer: 'ลูกค้าทั่วไป (ชำระทันที)',
            product: 'ชุดสินค้าขายดีประจำวัน',
            status: 'ชำระเงินสำเร็จ'
          },
          en: {
            channel: 'Live POS / Online Order',
            customer: 'Walk-in / Instant Buyer',
            product: 'Daily Best-Seller Bundle',
            status: 'Paid & Completed'
          }
        },
        ...prev
      ]);
    }
    toast.success(
      tx(
        `มีคำสั่งซื้อใหม่เข้ามาระบบสด +฿${amt.toLocaleString()}!`,
        `New live order received: +฿${amt.toLocaleString()}!`
      )
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div
        className="glass-card"
        style={{
          padding: '1.4rem',
          borderRadius: '18px',
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(15, 23, 42, 0.92))',
          border: '1.5px solid rgba(16, 185, 129, 0.4)',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <LuxuryIconBadge variant="emerald" size="lg" active>
            <LuxuryModuleIcon type="live" size={30} />
          </LuxuryIconBadge>
          <div>
            <span
              style={{
                display: 'inline-block',
                padding: '0.25rem 0.75rem',
                borderRadius: '999px',
                background: streamActive ? 'rgba(16, 185, 129, 0.2)' : 'rgba(148, 163, 184, 0.2)',
                color: streamActive ? '#34d399' : '#cbd5e1',
                fontWeight: 800,
                fontSize: '0.8rem',
                marginBottom: '0.35rem'
              }}
            >
              {streamActive
                ? tx('เชื่อมต่อสัญญาณยอดขายสดทุกสาขาอยู่', 'LIVE TRANSACTION STREAM CONNECTED')
                : tx('พักการแสดงผลชั่วคราว', 'STREAM PAUSED')}
            </span>
            <h3 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 900, color: '#f8fafc' }}>
              {tx('ติดตามคำสั่งซื้อและเงินเข้าแบบวินาทีต่อวินาที', 'Real-Time Store & Online Order Monitor')}
            </h3>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={handleSimulateLiveOrder}
            style={{
              padding: '0.7rem 1.15rem',
              borderRadius: '12px',
              border: 'none',
              background: 'linear-gradient(135deg, #10b981, #059669)',
              color: '#fff',
              fontWeight: 800,
              cursor: 'pointer'
            }}
          >
            {tx('จำลองคำสั่งซื้อใหม่เข้าตอนนี้', 'Simulate Incoming Live Order')}
          </button>
          <button
            type="button"
            onClick={() => setStreamActive(!streamActive)}
            style={{
              padding: '0.7rem 1rem',
              borderRadius: '12px',
              border: '1px solid rgba(148,163,184,0.35)',
              background: 'rgba(15, 23, 42, 0.8)',
              color: '#e2e8f0',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            {streamActive ? tx('พักหน้าจอสด', 'Pause Feed') : tx('เปิดหน้าจอสดต่อ', 'Resume Feed')}
          </button>
        </div>
      </div>

      {/* Live Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        <div className="glass-card" style={{ padding: '1.25rem', borderRadius: '16px', borderLeft: '4px solid #10b981' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 700 }}>
              {tx('ยอดขายสะสมรวมทุกจุดขาย', 'Cumulative Live Revenue')}
            </div>
            <LuxuryIconBadge variant="emerald" size="sm" active>
              <LuxuryModuleIcon type="wallet" size={18} />
            </LuxuryIconBadge>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#34d399', marginTop: '0.35rem' }}>
            ฿{currentRevenueVal.toLocaleString()}
          </div>
        </div>
        <div className="glass-card" style={{ padding: '1.25rem', borderRadius: '16px', borderLeft: '4px solid #38bdf8' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 700 }}>
              {tx('เครื่องคิดเงินที่เปิดออนไลน์อยู่', 'Online POS Registers')}
            </div>
            <LuxuryIconBadge variant="sapphire" size="sm" active>
              <LuxuryModuleIcon type="staff_pos" size={18} />
            </LuxuryIconBadge>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#38bdf8', marginTop: '0.35rem' }}>
            {tx('12 / 12 เครื่อง (ปกติ 100%)', '12 / 12 Registers (100% Online)')}
          </div>
        </div>
        <div className="glass-card" style={{ padding: '1.25rem', borderRadius: '16px', borderLeft: '4px solid #fbbf24' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 700 }}>
              {tx('ความเร็วการซิงค์ข้อมูล', 'Data Sync Latency')}
            </div>
            <LuxuryIconBadge variant="gold" size="sm" active>
              <LuxuryModuleIcon type="live" size={18} />
            </LuxuryIconBadge>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#fbbf24', marginTop: '0.35rem' }}>
            {tx('0.4 วินาที (เสถียรดีเยี่ยม)', '0.4 sec (Ultra Stable)')}
          </div>
        </div>
      </div>

      {/* Feed List */}
      <div className="glass-card" style={{ padding: '1.35rem', borderRadius: '18px' }}>
        <h4 style={{ margin: '0 0 1rem 0', fontSize: '1.12rem', fontWeight: 800 }}>
          {tx('📡 รายการรับเงินและคำสั่งซื้อล่าสุดที่เพิ่งเข้ามา', '📡 Latest Incoming Transactions')}
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {liveFeed.map(item => {
            const info = item[isEn ? 'en' : 'th'];
            return (
              <div
                key={item.id}
                style={{
                  padding: '1rem 1.15rem',
                  borderRadius: '14px',
                  background: 'rgba(15, 23, 42, 0.75)',
                  border: '1px solid rgba(56, 189, 248, 0.25)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '0.75rem'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.8rem', color: '#38bdf8', fontWeight: 800 }}>
                    {item.time} • {info.branch}
                  </div>
                  <div style={{ fontWeight: 800, color: '#f8fafc', marginTop: '0.2rem' }}>{info.detail}</div>
                </div>
                <div style={{ fontSize: '1.15rem', fontWeight: 900, color: '#34d399' }}>
                  +฿{item.amount.toLocaleString()}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function DatabaseTab({
  lang,
  dbRecords,
  setDbRecords,
  renderUploadZone
}) {
  const isEn = lang === 'en';
  const tx = (th, en) => (isEn ? en : th);

  const [dbSearch, setDbSearch] = useState('');
  const [newCustomer, setNewCustomer] = useState('');
  const [newProduct, setNewProduct] = useState('');
  const [newAmount, setNewAmount] = useState('');

  const filteredRecords = dbRecords.filter(rec => {
    const info = rec[isEn ? 'en' : 'th'];
    const q = dbSearch.trim().toLowerCase();
    if (!q) return true;
    return (
      rec.id.toLowerCase().includes(q) ||
      info.customer.toLowerCase().includes(q) ||
      info.product.toLowerCase().includes(q) ||
      info.channel.toLowerCase().includes(q)
    );
  });

  const handleAddRecord = e => {
    e.preventDefault();
    if (!newCustomer.trim() || !newProduct.trim()) {
      toast.error(tx('กรุณากรอกชื่อลูกค้าและรายการสินค้า', 'Please enter customer name and product'));
      return;
    }
    const amt = Math.max(1, Number(newAmount) || 1500);
    const nowStr = new Date().toLocaleDateString(isEn ? 'en-GB' : 'th-TH');
    const newRec = {
      id: `TXN-2026-${Math.floor(910 + Math.random() * 89)}`,
      date: nowStr,
      amount: amt,
      itemsCount: 1,
      th: {
        channel: 'บันทึกตรงโดยเจ้าของร้าน',
        customer: newCustomer.trim(),
        product: newProduct.trim(),
        status: 'ชำระเงินสำเร็จ'
      },
      en: {
        channel: 'Direct Owner Entry',
        customer: newCustomer.trim(),
        product: newProduct.trim(),
        status: 'Paid & Completed'
      }
    };
    setDbRecords(prev => [newRec, ...prev]);
    setNewCustomer('');
    setNewProduct('');
    setNewAmount('');
    toast.success(tx('✅ เพิ่มรายการลงฐานข้อมูลเรียบร้อยแล้ว!', '✅ Added record to database!'));
  };

  const handleDeleteRecord = id => {
    setDbRecords(prev => prev.filter(r => r.id !== id));
    toast.success(tx(`🗑️ ลบรายการ ${id} เรียบร้อยแล้ว`, `🗑️ Removed record ${id}`));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {renderUploadZone('database', tx('คลังฐานข้อมูลการขายของร้าน', 'Central Store Transaction Database'))}

      {/* Add Record Form */}
      <form
        onSubmit={handleAddRecord}
        className="glass-card"
        style={{
          padding: '1.3rem',
          borderRadius: '18px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '0.85rem',
          alignItems: 'end'
        }}
      >
        <div>
          <label style={{ display: 'block', fontSize: '0.82rem', color: '#94a3b8', marginBottom: '0.3rem' }}>
            {tx('ชื่อลูกค้า / บริษัท', 'Customer / Company Name')}
          </label>
          <input
            type="text"
            value={newCustomer}
            onChange={e => setNewCustomer(e.target.value)}
            placeholder={tx('เช่น คุณสมชาย ใจดี', 'e.g. Mr. Somchai Jaidee')}
            style={{ width: '100%', padding: '0.6rem', borderRadius: '10px', background: '#0f172a', color: '#fff', border: '1px solid rgba(148,163,184,0.3)' }}
          />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '0.82rem', color: '#94a3b8', marginBottom: '0.3rem' }}>
            {tx('รายการสินค้าที่ซื้อ', 'Purchased Product')}
          </label>
          <input
            type="text"
            value={newProduct}
            onChange={e => setNewProduct(e.target.value)}
            placeholder={tx('เช่น เซรั่มบำรุงผิว 2 กล่อง', 'e.g. Luxury Serum x2')}
            style={{ width: '100%', padding: '0.6rem', borderRadius: '10px', background: '#0f172a', color: '#fff', border: '1px solid rgba(148,163,184,0.3)' }}
          />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '0.82rem', color: '#94a3b8', marginBottom: '0.3rem' }}>
            {tx('ยอดเงินรวม (บาท)', 'Total Amount (THB)')}
          </label>
          <input
            type="number"
            value={newAmount}
            onChange={e => setNewAmount(e.target.value)}
            placeholder="2580"
            style={{ width: '100%', padding: '0.6rem', borderRadius: '10px', background: '#0f172a', color: '#fff', border: '1px solid rgba(148,163,184,0.3)' }}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: '0.68rem 1.1rem',
            borderRadius: '10px',
            border: 'none',
            background: 'linear-gradient(135deg, #10b981, #059669)',
            color: '#fff',
            fontWeight: 800,
            cursor: 'pointer'
          }}
        >
          {tx('➕ บันทึกลงฐานข้อมูล', '➕ Add to Database')}
        </button>
      </form>

      {/* Search & Table */}
      <div className="glass-card" style={{ padding: '1.35rem', borderRadius: '18px', overflowX: 'auto' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <LuxuryIconBadge variant="sapphire" size="md" active>
              <LuxuryModuleIcon type="database" size={22} />
            </LuxuryIconBadge>
            <h4 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800 }}>
              {tx('ตารางรายการซื้อขายในฐานข้อมูลกลาง', 'Master Transaction Records')} ({filteredRecords.length})
            </h4>
          </div>
          <input
            type="text"
            value={dbSearch}
            onChange={e => setDbSearch(e.target.value)}
            placeholder={tx('ค้นหาชื่อลูกค้า สินค้า หรือรหัสบิล...', 'Search customer, product, or bill ID...')}
            style={{
              padding: '0.6rem 0.95rem',
              borderRadius: '10px',
              border: '1px solid rgba(148,163,184,0.3)',
              background: '#0f172a',
              color: '#f8fafc',
              minWidth: '250px'
            }}
          />
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '740px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(148,163,184,0.2)', textAlign: 'left', color: '#94a3b8', fontSize: '0.84rem' }}>
              <th style={{ padding: '0.75rem' }}>{tx('รหัสรายการ / วันที่', 'Record ID / Date')}</th>
              <th style={{ padding: '0.75rem' }}>{tx('ชื่อลูกค้า', 'Customer')}</th>
              <th style={{ padding: '0.75rem' }}>{tx('สินค้าที่สั่งซื้อ', 'Product')}</th>
              <th style={{ padding: '0.75rem' }}>{tx('ช่องทางขาย', 'Channel')}</th>
              <th style={{ padding: '0.75rem' }}>{tx('ยอดเงินสุทธิ', 'Amount')}</th>
              <th style={{ padding: '0.75rem' }}>{tx('จัดการ', 'Action')}</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.map(rec => {
              const info = rec[isEn ? 'en' : 'th'];
              return (
                <tr key={rec.id} style={{ borderBottom: '1px solid rgba(148,163,184,0.12)' }}>
                  <td style={{ padding: '0.85rem 0.75rem' }}>
                    <div style={{ fontWeight: 800, color: '#38bdf8' }}>{rec.id}</div>
                    <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>{rec.date}</div>
                  </td>
                  <td style={{ padding: '0.85rem 0.75rem', fontWeight: 800, color: '#f8fafc' }}>{info.customer}</td>
                  <td style={{ padding: '0.85rem 0.75rem', color: '#cbd5e1' }}>{info.product}</td>
                  <td style={{ padding: '0.85rem 0.75rem', color: '#94a3b8', fontSize: '0.86rem' }}>{info.channel}</td>
                  <td style={{ padding: '0.85rem 0.75rem', fontWeight: 900, color: '#34d399' }}>
                    ฿{rec.amount.toLocaleString()}
                  </td>
                  <td style={{ padding: '0.85rem 0.75rem' }}>
                    <button
                      type="button"
                      onClick={() => handleDeleteRecord(rec.id)}
                      style={{
                        padding: '0.4rem 0.75rem',
                        borderRadius: '8px',
                        border: '1px solid rgba(244,63,94,0.4)',
                        background: 'rgba(244,63,94,0.14)',
                        color: '#fda4af',
                        fontWeight: 700,
                        fontSize: '0.8rem',
                        cursor: 'pointer'
                      }}
                    >
                      {tx('ลบรายการ', 'Delete')}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function AdminTab({ lang, user }) {
  const isEn = lang === 'en';
  const tx = (th, en) => (isEn ? en : th);

  const [requirePinForVoid, setRequirePinForVoid] = useState(true);
  const [requirePinForRefund, setRequirePinForRefund] = useState(true);
  const [autoBackupDaily, setAutoBackupDaily] = useState(true);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div
        className="glass-card"
        style={{
          padding: '1.4rem',
          borderRadius: '18px',
          background: 'linear-gradient(135deg, rgba(244, 63, 94, 0.14), rgba(15, 23, 42, 0.92))',
          border: '1.5px solid rgba(244, 63, 94, 0.4)',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}
      >
        <LuxuryIconBadge variant="ruby" size="lg" active>
          <LuxuryModuleIcon type="admin" size={30} />
        </LuxuryIconBadge>
        <div>
          <h3 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 900, color: '#f8fafc' }}>
            {tx('ศูนย์ควบคุมสิทธิ์ผู้ดูแลระบบและความปลอดภัยร้านค้า', 'Executive Security & Cashier Permission Control')}
          </h3>
          <p style={{ margin: '0.35rem 0 0 0', color: '#cbd5e1', fontSize: '0.92rem' }}>
            {tx(
              `เข้าสู่ระบบในฐานะเจ้าของกิจการ (${user?.email || 'ผู้ดูแลระบบหลัก'}) — กำหนดสิทธิ์พนักงานในการยกเลิกบิลและคืนเงินสด`,
              `Signed in as Store Owner (${user?.email || 'Primary Administrator'}) — manage register permissions and security policies.`
            )}
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
        <div className="glass-card" style={{ padding: '1.3rem', borderRadius: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '1rem' }}>
          <div>
            <div style={{ fontWeight: 900, fontSize: '1.05rem', color: '#f8fafc' }}>
              {tx('บังคับใส่รหัสผู้จัดการก่อนกดยกเลิกบิล', 'Require Manager PIN Before Bill Cancellation')}
            </div>
            <p style={{ fontSize: '0.86rem', color: '#94a3b8', marginTop: '0.35rem' }}>
              {tx(
                'ป้องกันแคชเชียร์กดยกเลิกบิลเองหลังจากรับเงินสดจากลูกค้าแล้ว',
                'Prevents cashiers from cancelling bills on their own after collecting cash.'
              )}
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setRequirePinForVoid(!requirePinForVoid);
              toast.success(tx('บันทึกการตั้งค่าความปลอดภัยเรียบร้อยแล้ว', 'Security setting updated'));
            }}
            style={{
              padding: '0.65rem 1rem',
              borderRadius: '10px',
              border: 'none',
              background: requirePinForVoid ? '#10b981' : '#64748b',
              color: '#fff',
              fontWeight: 800,
              cursor: 'pointer'
            }}
          >
            {requirePinForVoid ? tx('เปิดใช้งานอยู่ (ปลอดภัย)', 'Enabled (Protected)') : tx('ปิดอยู่ (กดเพื่อเปิด)', 'Disabled (Click to Enable)')}
          </button>
        </div>

        <div className="glass-card" style={{ padding: '1.3rem', borderRadius: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '1rem' }}>
          <div>
            <div style={{ fontWeight: 900, fontSize: '1.05rem', color: '#f8fafc' }}>
              {tx('บังคับสแกนบาร์โค้ดสินค้าคืนคลังก่อนคืนเงินสด', 'Require Barcode Scan Before Cash Refund')}
            </div>
            <p style={{ fontSize: '0.86rem', color: '#94a3b8', marginTop: '0.35rem' }}>
              {tx(
                'ป้องกันการทำเรื่องคืนเงินสดทิพย์โดยไม่มีสินค้าชำรุดส่งกลับมาจริง',
                'Prevents fake cash refunds without an actual returned item scanned into stock.'
              )}
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setRequirePinForRefund(!requirePinForRefund);
              toast.success(tx('บันทึกการตั้งค่าการคืนเงินเรียบร้อยแล้ว', 'Refund verification policy updated'));
            }}
            style={{
              padding: '0.65rem 1rem',
              borderRadius: '10px',
              border: 'none',
              background: requirePinForRefund ? '#10b981' : '#64748b',
              color: '#fff',
              fontWeight: 800,
              cursor: 'pointer'
            }}
          >
            {requirePinForRefund ? tx('เปิดใช้งานอยู่ (ปลอดภัย)', 'Enabled (Protected)') : tx('ปิดอยู่ (กดเพื่อเปิด)', 'Disabled (Click to Enable)')}
          </button>
        </div>

        <div className="glass-card" style={{ padding: '1.3rem', borderRadius: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '1rem' }}>
          <div>
            <div style={{ fontWeight: 900, fontSize: '1.05rem', color: '#f8fafc' }}>
              {tx('สำรองฐานข้อมูลบัญชีและสต็อกอัตโนมัติทุกเที่ยงคืน', 'Automated Midnight Cloud Backup')}
            </div>
            <p style={{ fontSize: '0.86rem', color: '#94a3b8', marginTop: '0.35rem' }}>
              {tx(
                'เก็บรักษาข้อมูลยอดขายและประวัติลูกค้าทั้งหมดไว้อย่างปลอดภัย ไม่สูญหาย',
                'Automatically backs up all sales, customer history, and inventory records daily.'
              )}
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setAutoBackupDaily(!autoBackupDaily);
              toast.success(tx('อัปเดตระบบสำรองข้อมูลอัตโนมัติแล้ว', 'Cloud backup schedule updated'));
            }}
            style={{
              padding: '0.65rem 1rem',
              borderRadius: '10px',
              border: 'none',
              background: autoBackupDaily ? '#10b981' : '#64748b',
              color: '#fff',
              fontWeight: 800,
              cursor: 'pointer'
            }}
          >
            {autoBackupDaily ? tx('สำรองข้อมูลอัตโนมัติทุกวัน', 'Daily Auto-Backup Active') : tx('พักการสำรองข้อมูล', 'Backup Paused')}
          </button>
        </div>
      </div>
    </div>
  );
}

export function SettingsTab({
  lang,
  setLang,
  theme,
  setTheme,
  fontScale,
  setFontScale,
  rememberCredentials,
  setRememberCredentials
}) {
  const isEn = lang === 'en';
  const tx = (th, en) => (isEn ? en : th);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div className="glass-card" style={{ padding: '1.5rem', borderRadius: '18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.35rem' }}>
          <LuxuryIconBadge variant="platinum" size="lg" active>
            <LuxuryModuleIcon type="settings" size={30} />
          </LuxuryIconBadge>
          <div>
            <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '1.3rem', fontWeight: 900, color: '#f8fafc' }}>
              {tx('ตั้งค่าภาษา ขนาดตัวหนังสือ และการแสดงผล', 'Language, Text Size & Display Preferences')}
            </h3>
            <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.92rem' }}>
              {tx(
                'ปรับแต่งระบบให้อ่านง่าย สบายตา และเลือกภาษาที่ต้องการใช้งานได้ทันที (แยกภาษาไทยล้วน และภาษาอังกฤษล้วน 100%)',
                'Customize language, senior-friendly font scaling, and visual theme (100% pure Thai or 100% pure English).'
              )}
            </p>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.2rem' }}>
          {/* Language Selection */}
          <div style={{ padding: '1.2rem', borderRadius: '14px', background: 'rgba(15, 23, 42, 0.7)', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
            <div style={{ fontWeight: 900, color: '#38bdf8', marginBottom: '0.6rem' }}>
              {tx('🌐 เลือกภาษาของระบบ (แยกภาษาชัดเจน)', '🌐 System Language (Strict Single-Language Mode)')}
            </div>
            <div style={{ display: 'flex', gap: '0.65rem' }}>
              <button
                type="button"
                onClick={() => {
                  setLang('th');
                  toast.success('เปลี่ยนเป็นโหมดภาษาไทยล้วนเรียบร้อยแล้ว');
                }}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  borderRadius: '10px',
                  border: lang === 'th' ? '2px solid #38bdf8' : '1px solid rgba(148,163,184,0.3)',
                  background: lang === 'th' ? 'rgba(56, 189, 248, 0.22)' : 'transparent',
                  color: '#f8fafc',
                  fontWeight: 900,
                  cursor: 'pointer'
                }}
              >
                🇹🇭 ภาษาไทยล้วน
              </button>
              <button
                type="button"
                onClick={() => {
                  setLang('en');
                  toast.success('Switched to 100% English Mode');
                }}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  borderRadius: '10px',
                  border: lang === 'en' ? '2px solid #38bdf8' : '1px solid rgba(148,163,184,0.3)',
                  background: lang === 'en' ? 'rgba(56, 189, 248, 0.22)' : 'transparent',
                  color: '#f8fafc',
                  fontWeight: 900,
                  cursor: 'pointer'
                }}
              >
                🇬🇧 English Only
              </button>
            </div>
          </div>

          {/* Font Scale Selection */}
          <div style={{ padding: '1.2rem', borderRadius: '14px', background: 'rgba(15, 23, 42, 0.7)', border: '1px solid rgba(251, 191, 36, 0.3)' }}>
            <div style={{ fontWeight: 900, color: '#fbbf24', marginBottom: '0.6rem' }}>
              {tx('🔎 ขนาดตัวหนังสือ (อ่านง่ายสำหรับผู้ใหญ่)', '🔎 Font Size (Senior-Friendly Readability)')}
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {[
                { id: 'normal', th: 'ขนาดปกติ', en: 'Standard' },
                { id: 'large', th: 'ขนาดใหญ่', en: 'Large' },
                { id: 'xlarge', th: 'ใหญ่พิเศษ', en: 'Extra Large' }
              ].map(sz => (
                <button
                  key={sz.id}
                  type="button"
                  onClick={() => setFontScale(sz.id)}
                  style={{
                    flex: 1,
                    padding: '0.7rem 0.5rem',
                    borderRadius: '10px',
                    border: fontScale === sz.id ? '2px solid #fbbf24' : '1px solid rgba(148,163,184,0.3)',
                    background: fontScale === sz.id ? 'rgba(251, 191, 36, 0.2)' : 'transparent',
                    color: '#f8fafc',
                    fontWeight: 800,
                    cursor: 'pointer'
                  }}
                >
                  {isEn ? sz.en : sz.th}
                </button>
              ))}
            </div>
          </div>

          {/* Theme & Password Remember */}
          <div style={{ padding: '1.2rem', borderRadius: '14px', background: 'rgba(15, 23, 42, 0.7)', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
            <div style={{ fontWeight: 900, color: '#34d399', marginBottom: '0.6rem' }}>
              {tx('🎨 โทนสีหน้าจอ & การจดจำรหัสผ่าน', '🎨 Screen Theme & Password Memory')}
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <button
                type="button"
                onClick={() => setTheme('dark')}
                style={{
                  flex: 1,
                  padding: '0.65rem',
                  borderRadius: '10px',
                  border: theme === 'dark' ? '2px solid #10b981' : '1px solid rgba(148,163,184,0.3)',
                  background: theme === 'dark' ? 'rgba(16, 185, 129, 0.2)' : 'transparent',
                  color: '#f8fafc',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
              >
                {tx('🌙 โหมดมืดถนอมสายตา', '🌙 Dark Mode')}
              </button>
              <button
                type="button"
                onClick={() => setTheme('light')}
                style={{
                  flex: 1,
                  padding: '0.65rem',
                  borderRadius: '10px',
                  border: theme === 'light' ? '2px solid #10b981' : '1px solid rgba(148,163,184,0.3)',
                  background: theme === 'light' ? 'rgba(16, 185, 129, 0.2)' : 'transparent',
                  color: '#f8fafc',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
              >
                {tx('☀️ โหมดสว่างคมชัด', '☀️ Light Mode')}
              </button>
            </div>

            <label style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', color: '#e2e8f0', fontSize: '0.88rem', fontWeight: 700, cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={rememberCredentials}
                onChange={e => setRememberCredentials(e.target.checked)}
                style={{ width: '18px', height: '18px' }}
              />
              {tx('จดจำอีเมลและรหัสผ่านไว้เข้าใช้งานครั้งถัดไปอัตโนมัติ', 'Remember my email and password for automatic sign-in')}
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

