import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { toast } from 'react-hot-toast';
import { LuxuryIconBadge, LuxuryModuleIcon } from './LuxuryIcons';

export function StaffPosTab({
  lang,
  staffList,
  setStaffList,
  auditLogs,
  setAuditLogs,
  renderUploadZone,
  barChartOptions
}) {
  const isEn = lang === 'en';
  const tx = (th, en) => (isEn ? en : th);

  const [staffBranchFilter, setStaffBranchFilter] = useState('all');
  const [auditFilterType, setAuditFilterType] = useState('all');
  const [selectedStaffForCoaching, setSelectedStaffForCoaching] = useState(null);
  const [showRecordPosModal, setShowRecordPosModal] = useState(false);
  const [posFormStaffId, setPosFormStaffId] = useState(staffList[0]?.id || 'STF-101');
  const [posFormAmount, setPosFormAmount] = useState('2500');
  const [posFormUpsell, setPosFormUpsell] = useState(true);

  const filteredStaff = staffList.filter(s => {
    if (staffBranchFilter === 'all') return true;
    return s.branchId === staffBranchFilter;
  });

  const filteredAuditLogs = auditLogs.filter(log => {
    if (auditFilterType === 'all') return true;
    if (auditFilterType === 'unresolved') return !log.resolved;
    return log.eventType === auditFilterType;
  });

  const totalPosSales = filteredStaff.reduce((acc, s) => acc + s.totalSales, 0);
  const totalPosBills = filteredStaff.reduce((acc, s) => acc + s.billsCount, 0);
  const avgBasketSize = totalPosBills > 0 ? Math.round(totalPosSales / totalPosBills) : 0;
  const totalUpsellRev = filteredStaff.reduce((acc, s) => acc + s.upsellRevenue, 0);
  const unresolvedCount = auditLogs.filter(l => !l.resolved).length;

  const handleRecordStaffSale = e => {
    e.preventDefault();
    const amt = Number(posFormAmount);
    if (!amt || amt <= 0) {
      toast.error(tx('กรุณากรอกยอดบิลที่มากกว่า 0 บาท', 'Please enter a bill amount greater than 0'));
      return;
    }
    setStaffList(prev =>
      prev.map(s => {
        if (s.id !== posFormStaffId) return s;
        const newTotal = s.totalSales + amt;
        const newBills = s.billsCount + 1;
        const newUpsellSucc = posFormUpsell ? s.upsellSuccess + 1 : s.upsellSuccess;
        const newUpsellAtt = s.upsellAttempts + 1;
        return {
          ...s,
          totalSales: newTotal,
          billsCount: newBills,
          basketSize: Math.round(newTotal / newBills),
          upsellAttempts: newUpsellAtt,
          upsellSuccess: newUpsellSucc,
          upsellRate: Number(((newUpsellSucc / newUpsellAtt) * 100).toFixed(1)),
          upsellRevenue: posFormUpsell ? s.upsellRevenue + Math.round(amt * 0.25) : s.upsellRevenue
        };
      })
    );
    const targetStaff = staffList.find(s => s.id === posFormStaffId);
    const staffDisplayName = targetStaff ? targetStaff[isEn ? 'en' : 'th'].name : posFormStaffId;
    setShowRecordPosModal(false);
    toast.success(
      tx(
        `🧾 บันทึกบิลขายหน้าร้าน +฿${amt.toLocaleString()} ให้ ${staffDisplayName} เรียบร้อยแล้ว!`,
        `🧾 Recorded +฿${amt.toLocaleString()} POS bill for ${staffDisplayName}!`
      )
    );
  };

  const handleResolveAudit = logId => {
    setAuditLogs(prev =>
      prev.map(l => (l.logId === logId ? { ...l, resolved: !l.resolved } : l))
    );
    toast.success(
      tx(
        `🛡️ อัปเดตสถานะการตรวจสอบรายการ ${logId} เรียบร้อยแล้ว`,
        `🛡️ Updated audit verification status for ${logId}`
      )
    );
  };

  const handleSimulateFraudAlert = () => {
    const newId = `AUD-2026-${Math.floor(8900 + Math.random() * 900)}`;
    const newLog = {
      logId: newId,
      staffId: 'STF-108',
      eventType: 'void',
      billNo: `INV-LP-${Math.floor(10000 + Math.random() * 89000)}`,
      amount: 3890,
      severity: 'critical',
      resolved: false,
      cctvTimestamp: tx('กล้อง 04 • เมื่อสักครู่', 'Cam 04 • Just now'),
      th: {
        timestamp: 'เมื่อสักครู่',
        staffName: 'คุณธนดล กิตติพงศ์ (แบงค์)',
        branchName: 'สาขาเซ็นทรัลลาดพร้าว (เครื่องที่ 4)',
        eventLabel: '🚫 ยกเลิกบิลหลังรับชำระเงินสดทันที',
        paymentMethod: 'เงินสด',
        reasonStated: 'คีย์รายการสินค้าผิดรุ่น',
        aiAnomalyDetail: 'ระบบตรวจจับความผิดปกติ: มีการกดยกเลิกบิลมูลค่าสูงหลังเปิดลิ้นชักรับเงินสด (ควรตรวจสอบกล้องวงจรปิดทันที)'
      },
      en: {
        timestamp: 'Just now',
        staffName: 'Mr. Thanadon Kittipong (Bank)',
        branchName: 'Central Ladprao Branch (Register #4)',
        eventLabel: '🚫 Immediate Post-Cash Bill Cancellation',
        paymentMethod: 'Cash',
        reasonStated: 'Entered wrong product code',
        aiAnomalyDetail: 'Anomaly Detected: High-value bill cancelled immediately after cash drawer opened. Inspect security camera now.'
      }
    };
    setAuditLogs(prev => [newLog, ...prev]);
    toast.error(
      tx(
        `🚨 ตรวจพบการยกเลิกบิลต้องสงสัยรายการใหม่ (${newId})!`,
        `🚨 New suspicious bill cancellation detected (${newId})!`
      )
    );
  };

  const staffChartData = {
    labels: filteredStaff.map(s => s[isEn ? 'en' : 'th'].name.split(' ')[0]),
    datasets: [
      {
        label: tx('ยอดซื้อเฉลี่ยต่อบิล (บาท)', 'Average Basket Size (THB)'),
        data: filteredStaff.map(s => s.basketSize),
        backgroundColor: 'rgba(56, 189, 248, 0.85)',
        borderRadius: 8
      },
      {
        label: tx('รายได้เสริมจากการเชียร์สินค้าพ่วง (หาร 100 บาท)', 'Upsell Revenue (÷100 THB)'),
        data: filteredStaff.map(s => Math.round(s.upsellRevenue / 100)),
        backgroundColor: 'rgba(16, 185, 129, 0.85)',
        borderRadius: 8
      }
    ]
  };

  return (
    <div className=" staff-pos-tab-container" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {renderUploadZone('staff_pos', tx('ผลงานพนักงานและเครื่องคิดเงินหน้าร้าน', 'Staff & Cashier Performance'))}

      {/* Top Executive Banner */}
      <div
        className="glass-card"
        style={{
          padding: '1.5rem',
          borderRadius: '18px',
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.14), rgba(15, 23, 42, 0.92))',
          border: '1.5px solid rgba(16, 185, 129, 0.35)',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', flex: '1 1 420px' }}>
          <LuxuryIconBadge variant="sapphire" size="lg" active>
            <LuxuryModuleIcon type="staff_pos" size={28} />
          </LuxuryIconBadge>
          <div>
            <span
              style={{
                display: 'inline-block',
                padding: '0.3rem 0.8rem',
                borderRadius: '999px',
                background: 'rgba(16, 185, 129, 0.2)',
                color: '#34d399',
                fontWeight: 800,
                fontSize: '0.82rem',
                marginBottom: '0.45rem'
              }}
            >
              {tx('ระบบติดตามยอดขายพนักงาน & ป้องกันทุจริตแคชเชียร์', 'STAFF SALES & CASHIER FRAUD AUDIT')}
            </span>
            <h3 style={{ margin: 0, fontSize: '1.35rem', fontWeight: 900, color: '#f8fafc' }}>
              {tx(
                'วิเคราะห์ยอดต่อบิล • การเชียร์ขายพ่วง • ตรวจจับการยกเลิกบิลผิดปกติ',
                'Basket Size • Upselling Conversion • Suspicious Bill Cancellation Audit'
              )}
            </h3>
            <p style={{ margin: '0.35rem 0 0 0', color: '#cbd5e1', fontSize: '0.92rem' }}>
              {tx(
                'ช่วยให้เจ้าของร้านรู้ว่าพนักงานคนไหนทำเงินเก่งที่สุด และป้องกันเงินสดรั่วไหลหน้าเครื่องคิดเงินได้ทันที',
                'Identify your top-earning staff and prevent register cash leakage in real time.'
              )}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem' }}>
          <button
            type="button"
            onClick={() => setShowRecordPosModal(!showRecordPosModal)}
            style={{
              padding: '0.7rem 1.15rem',
              borderRadius: '12px',
              border: '1px solid rgba(16, 185, 129, 0.5)',
              background: 'linear-gradient(135deg, #10b981, #059669)',
              color: '#ffffff',
              fontWeight: 800,
              cursor: 'pointer'
            }}
          >
            {tx('➕ บันทึกบิลขายหน้าร้าน (ทดสอบระบบจริง)', '➕ Record POS Sale (Live Action)')}
          </button>
          <button
            type="button"
            onClick={handleSimulateFraudAlert}
            style={{
              padding: '0.7rem 1.15rem',
              borderRadius: '12px',
              border: '1px solid rgba(244, 63, 94, 0.5)',
              background: 'rgba(244, 63, 94, 0.16)',
              color: '#fda4af',
              fontWeight: 800,
              cursor: 'pointer'
            }}
          >
            {tx('🚨 จำลองเหตุการณ์ยกเลิกบิลผิดปกติ', '🚨 Simulate Suspicious Bill Cancel')}
          </button>
        </div>
      </div>

      {/* Interactive POS Bill Recording Modal / Panel */}
      {showRecordPosModal && (
        <form
          onSubmit={handleRecordStaffSale}
          className="glass-card"
          style={{
            padding: '1.35rem',
            borderRadius: '16px',
            border: '2px solid rgba(16, 185, 129, 0.45)',
            background: 'rgba(15, 23, 42, 0.95)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
            gap: '1rem',
            alignItems: 'end'
          }}
        >
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#94a3b8', marginBottom: '0.35rem' }}>
              {tx('เลือกพนักงานขายหน้าร้าน', 'Select Cashier / Staff')}
            </label>
            <select
              value={posFormStaffId}
              onChange={e => setPosFormStaffId(e.target.value)}
              style={{
                width: '100%',
                padding: '0.65rem',
                borderRadius: '10px',
                background: '#0f172a',
                color: '#f8fafc',
                border: '1px solid rgba(148,163,184,0.3)'
              }}
            >
              {staffList.map(st => (
                <option key={st.id} value={st.id}>
                  {st[isEn ? 'en' : 'th'].name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#94a3b8', marginBottom: '0.35rem' }}>
              {tx('ยอดเงินในบิลนี้ (บาท)', 'Bill Amount (THB)')}
            </label>
            <input
              type="number"
              value={posFormAmount}
              onChange={e => setPosFormAmount(e.target.value)}
              style={{
                width: '100%',
                padding: '0.65rem',
                borderRadius: '10px',
                background: '#0f172a',
                color: '#f8fafc',
                border: '1px solid rgba(148,163,184,0.3)'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#e2e8f0', fontWeight: 700, cursor: 'pointer', paddingBottom: '0.45rem' }}>
              <input
                type="checkbox"
                checked={posFormUpsell}
                onChange={e => setPosFormUpsell(e.target.checked)}
                style={{ width: '18px', height: '18px' }}
              />
              {tx('เชียร์สินค้าพ่วงสำเร็จในบิลนี้', 'Upsell Item Included in Bill')}
            </label>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              type="submit"
              style={{
                flex: 1,
                padding: '0.7rem 1rem',
                borderRadius: '10px',
                border: 'none',
                background: '#10b981',
                color: '#fff',
                fontWeight: 800,
                cursor: 'pointer'
              }}
            >
              {tx('✅ บันทึกยอดทันที', '✅ Save Bill')}
            </button>
            <button
              type="button"
              onClick={() => setShowRecordPosModal(false)}
              style={{
                padding: '0.7rem 0.9rem',
                borderRadius: '10px',
                border: '1px solid rgba(148,163,184,0.3)',
                background: 'transparent',
                color: '#cbd5e1',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              {tx('ปิด', 'Close')}
            </button>
          </div>
        </form>
      )}

      {/* 4 KPI Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        <div className="glass-card" style={{ padding: '1.25rem', borderRadius: '16px', borderLeft: '4px solid #38bdf8' }}>
          <div style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 700 }}>
            {tx('💰 ยอดขายรวมหน้าเครื่องคิดเงิน', '💰 Total Register Sales')}
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#f8fafc', marginTop: '0.35rem' }}>
            ฿{totalPosSales.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.8rem', color: '#38bdf8', marginTop: '0.25rem' }}>
            {tx(`จากทั้งหมด ${totalPosBills.toLocaleString()} บิลขายจริง`, `Across ${totalPosBills.toLocaleString()} completed bills`)}
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem', borderRadius: '16px', borderLeft: '4px solid #fbbf24' }}>
          <div style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 700 }}>
            {tx('🧺 ยอดซื้อเฉลี่ยต่อบิล', '🧺 Average Basket Size')}
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#fbbf24', marginTop: '0.35rem' }}>
            ฿{avgBasketSize.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.8rem', color: '#fde68a', marginTop: '0.25rem' }}>
            {tx('เป้าหมายมาตรฐานร้าน: ฿2,200 ต่อบิล', 'Store target benchmark: ฿2,200 / bill')}
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem', borderRadius: '16px', borderLeft: '4px solid #10b981' }}>
          <div style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 700 }}>
            {tx('🚀 รายได้เสริมจากการเชียร์ขายพ่วง', '🚀 Total Upselling Revenue')}
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#34d399', marginTop: '0.35rem' }}>
            +฿{totalUpsellRev.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.8rem', color: '#a7f3d0', marginTop: '0.25rem' }}>
            {tx('กำไรส่วนเพิ่มจากการแนะนำสินค้าคู่กัน', 'Extra revenue from checkout recommendations')}
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem', borderRadius: '16px', borderLeft: '4px solid #f43f5e' }}>
          <div style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 700 }}>
            {tx('🛡️ รายการผิดปกติที่รอตรวจสอบ', '🛡️ Pending Fraud Alerts')}
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#fda4af', marginTop: '0.35rem' }}>
            {unresolvedCount} {tx('รายการ', 'Cases')}
          </div>
          <div style={{ fontSize: '0.8rem', color: '#fecdd3', marginTop: '0.25rem' }}>
            {tx('ยกเลิกบิล • คืนเงินสด • เปิดลิ้นชักไม่ขาย', 'Bill voids • Cash refunds • No-sale drawers')}
          </div>
        </div>
      </div>

      {/* Filter by Branch + Chart */}
      <div className="glass-card" style={{ padding: '1.35rem', borderRadius: '18px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', marginBottom: '1.1rem' }}>
          <div>
            <h4 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800 }}>
              {tx('📊 เปรียบเทียบยอดซื้อต่อบิล & ผลงานการเชียร์สินค้าพ่วงรายพนักงาน', '📊 Basket Size & Upselling Performance by Staff')}
            </h4>
            <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.86rem', color: '#94a3b8' }}>
              {tx('กดเลือกสาขาเพื่อดูผลงานพนักงานแต่ละคนแยกตามจุดขาย', 'Filter by branch to inspect individual cashier performance')}
            </p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {[
              { id: 'all', th: 'ทุกสาขารวมกัน', en: 'All Branches' },
              { id: 'siam', th: 'สาขาสยามพารากอน', en: 'Siam Paragon' },
              { id: 'sukhumvit', th: 'สาขาสุขุมวิท', en: 'Sukhumvit' },
              { id: 'ladprao', th: 'สาขาลาดพร้าว', en: 'Central Ladprao' },
              { id: 'chiangmai', th: 'สาขาเชียงใหม่', en: 'Chiang Mai' }
            ].map(br => (
              <button
                key={br.id}
                type="button"
                onClick={() => setStaffBranchFilter(br.id)}
                style={{
                  padding: '0.5rem 0.95rem',
                  borderRadius: '999px',
                  border: staffBranchFilter === br.id ? '1.5px solid #38bdf8' : '1px solid rgba(148,163,184,0.25)',
                  background: staffBranchFilter === br.id ? 'rgba(56, 189, 248, 0.2)' : 'rgba(15, 23, 42, 0.6)',
                  color: staffBranchFilter === br.id ? '#38bdf8' : '#cbd5e1',
                  fontWeight: 700,
                  fontSize: '0.84rem',
                  cursor: 'pointer'
                }}
              >
                {isEn ? br.en : br.th}
              </button>
            ))}
          </div>
        </div>

        <div style={{ height: '250px' }}>
          <Bar data={staffChartData} options={barChartOptions} />
        </div>
      </div>

      {/* Staff Performance Table */}
      <div className="glass-card" style={{ padding: '1.35rem', borderRadius: '18px', overflowX: 'auto' }}>
        <h4 style={{ margin: '0 0 1rem 0', fontSize: '1.15rem', fontWeight: 800 }}>
          {tx('👩‍💼 ตารางสรุปผลงานพนักงานและการแนะนำสินค้าพ่วง', '👩‍💼 Staff Sales & Upselling Leaderboard')}
        </h4>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '820px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(148,163,184,0.2)', textAlign: 'left', color: '#94a3b8', fontSize: '0.84rem' }}>
              <th style={{ padding: '0.75rem' }}>{tx('ชื่อพนักงาน / จุดขาย', 'Staff Name / Register')}</th>
              <th style={{ padding: '0.75rem' }}>{tx('ยอดขายรวม', 'Total Sales')}</th>
              <th style={{ padding: '0.75rem' }}>{tx('ยอดเฉลี่ยต่อบิล', 'Avg Basket Size')}</th>
              <th style={{ padding: '0.75rem' }}>{tx('อัตราเชียร์สินค้าพ่วง', 'Upsell Rate')}</th>
              <th style={{ padding: '0.75rem' }}>{tx('สินค้าพ่วงที่ขายดีสุด', 'Top Upsell Product')}</th>
              <th style={{ padding: '0.75rem' }}>{tx('ความเสี่ยงทุจริต', 'Audit Status')}</th>
              <th style={{ padding: '0.75rem' }}>{tx('การจัดการ', 'Action')}</th>
            </tr>
          </thead>
          <tbody>
            {filteredStaff.map(st => {
              const info = st[isEn ? 'en' : 'th'];
              const riskColor =
                st.riskLevel === 'high' ? '#f43f5e' : st.riskLevel === 'medium' ? '#f59e0b' : '#10b981';
              return (
                <tr key={st.id} style={{ borderBottom: '1px solid rgba(148,163,184,0.12)' }}>
                  <td style={{ padding: '0.85rem 0.75rem' }}>
                    <div style={{ fontWeight: 800, color: '#f8fafc' }}>{info.name}</div>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{info.branchName}</div>
                  </td>
                  <td style={{ padding: '0.85rem 0.75rem', fontWeight: 800, color: '#38bdf8' }}>
                    ฿{st.totalSales.toLocaleString()}
                    <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                      {st.billsCount} {tx('บิล', 'bills')}
                    </div>
                  </td>
                  <td style={{ padding: '0.85rem 0.75rem', fontWeight: 800, color: '#fbbf24' }}>
                    ฿{st.basketSize.toLocaleString()}
                  </td>
                  <td style={{ padding: '0.85rem 0.75rem' }}>
                    <span
                      style={{
                        padding: '0.25rem 0.65rem',
                        borderRadius: '999px',
                        background: 'rgba(16, 185, 129, 0.16)',
                        color: '#34d399',
                        fontWeight: 800,
                        fontSize: '0.84rem'
                      }}
                    >
                      {st.upsellRate}% (+฿{st.upsellRevenue.toLocaleString()})
                    </span>
                  </td>
                  <td style={{ padding: '0.85rem 0.75rem', fontSize: '0.86rem', color: '#cbd5e1' }}>
                    {info.topUpsellItem}
                  </td>
                  <td style={{ padding: '0.85rem 0.75rem' }}>
                    <span
                      style={{
                        padding: '0.28rem 0.7rem',
                        borderRadius: '999px',
                        background: `${riskColor}22`,
                        color: riskColor,
                        fontWeight: 800,
                        fontSize: '0.8rem'
                      }}
                    >
                      {info.statusBadge}
                    </span>
                  </td>
                  <td style={{ padding: '0.85rem 0.75rem' }}>
                    <button
                      type="button"
                      onClick={() => setSelectedStaffForCoaching(st)}
                      style={{
                        padding: '0.45rem 0.85rem',
                        borderRadius: '8px',
                        border: '1px solid rgba(56,189,248,0.4)',
                        background: 'rgba(56,189,248,0.14)',
                        color: '#38bdf8',
                        fontWeight: 700,
                        fontSize: '0.82rem',
                        cursor: 'pointer'
                      }}
                    >
                      {tx('💡 ดูคำแนะนำ', '💡 Coaching')}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {selectedStaffForCoaching && (
          <div
            style={{
              marginTop: '1rem',
              padding: '1.15rem',
              borderRadius: '14px',
              background: 'rgba(56, 189, 248, 0.12)',
              border: '1.5px solid rgba(56, 189, 248, 0.4)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '1rem',
              flexWrap: 'wrap'
            }}
          >
            <div>
              <div style={{ fontWeight: 900, color: '#38bdf8', fontSize: '1rem' }}>
                {tx('🎯 คำแนะนำสำหรับพนักงาน:', '🎯 Coaching Insight for:')}{' '}
                {selectedStaffForCoaching[isEn ? 'en' : 'th'].name}
              </div>
              <div style={{ color: '#f8fafc', marginTop: '0.3rem', fontSize: '0.94rem' }}>
                {selectedStaffForCoaching[isEn ? 'en' : 'th'].aiCoaching}
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                toast.success(
                  tx(
                    `📲 ส่งข้อความแนะนำแนวทางขายให้ ${selectedStaffForCoaching.th.name} เรียบร้อยแล้ว`,
                    `📲 Sent coaching message to ${selectedStaffForCoaching.en.name}`
                  )
                );
                setSelectedStaffForCoaching(null);
              }}
              style={{
                padding: '0.6rem 1.1rem',
                borderRadius: '10px',
                border: 'none',
                background: '#38bdf8',
                color: '#0f172a',
                fontWeight: 800,
                cursor: 'pointer'
              }}
            >
              {tx('📲 ส่งคำแนะนำเข้ามือถือพนักงาน', '📲 Send Coaching to Staff')}
            </button>
          </div>
        )}
      </div>

      {/* Audit & Fraud Detection Log Section */}
      <div className="glass-card" style={{ padding: '1.35rem', borderRadius: '18px', border: '1.5px solid rgba(244, 63, 94, 0.35)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <h4 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 900, color: '#fda4af' }}>
              {tx('🚨 บันทึกตรวจสอบการยกเลิกบิล • คืนเงินสด • เปิดลิ้นชักเก็บเงิน', '🚨 Cashier Audit Log: Bill Voids, Refunds & Drawer Openings')}
            </h4>
            <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.86rem', color: '#cbd5e1' }}>
              {tx(
                'กดปุ่ม "ยืนยันตรวจสอบแล้ว" เมื่อคุณตรวจกล้องวงจรปิดหรือสอบถามพนักงานเรียบร้อยแล้ว',
                'Click "Mark Verified" once you have reviewed the security camera footage or confirmed with the manager.'
              )}
            </p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
            {[
              { id: 'all', th: 'ทั้งหมด', en: 'All Events' },
              { id: 'unresolved', th: 'รอตรวจสอบ', en: 'Unresolved Only' },
              { id: 'void', th: 'ยกเลิกบิล', en: 'Bill Cancellations' },
              { id: 'refund', th: 'คืนเงินสด', en: 'Cash Refunds' },
              { id: 'drawer', th: 'เปิดลิ้นชักไม่ขาย', en: 'No-Sale Drawer' }
            ].map(flt => (
              <button
                key={flt.id}
                type="button"
                onClick={() => setAuditFilterType(flt.id)}
                style={{
                  padding: '0.45rem 0.85rem',
                  borderRadius: '999px',
                  border: auditFilterType === flt.id ? '1.5px solid #f43f5e' : '1px solid rgba(148,163,184,0.25)',
                  background: auditFilterType === flt.id ? 'rgba(244, 63, 94, 0.2)' : 'rgba(15, 23, 42, 0.6)',
                  color: auditFilterType === flt.id ? '#fda4af' : '#cbd5e1',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  cursor: 'pointer'
                }}
              >
                {isEn ? flt.en : flt.th}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {filteredAuditLogs.map(log => {
            const info = log[isEn ? 'en' : 'th'];
            return (
              <div
                key={log.logId}
                style={{
                  padding: '1.1rem',
                  borderRadius: '14px',
                  background: log.resolved ? 'rgba(15, 23, 42, 0.5)' : 'rgba(244, 63, 94, 0.09)',
                  border: log.resolved
                    ? '1px solid rgba(148, 163, 184, 0.2)'
                    : '1.5px solid rgba(244, 63, 94, 0.4)',
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '1rem'
                }}
              >
                <div style={{ flex: '1 1 460px' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem' }}>
                    <span
                      style={{
                        padding: '0.2rem 0.65rem',
                        borderRadius: '999px',
                        background: log.resolved ? 'rgba(16, 185, 129, 0.2)' : 'rgba(244, 63, 94, 0.25)',
                        color: log.resolved ? '#34d399' : '#fda4af',
                        fontWeight: 800,
                        fontSize: '0.78rem'
                      }}
                    >
                      {log.resolved ? tx('✅ ตรวจสอบเรียบร้อยแล้ว', '✅ Verified & Closed') : info.eventLabel}
                    </span>
                    <span style={{ fontSize: '0.82rem', color: '#94a3b8', fontWeight: 700 }}>
                      {info.timestamp} • {info.branchName}
                    </span>
                    {log.amount > 0 && (
                      <span style={{ fontWeight: 900, color: '#fbbf24', fontSize: '0.95rem' }}>
                        ฿{log.amount.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <div style={{ fontWeight: 800, color: '#f8fafc', fontSize: '0.96rem' }}>
                    {info.staffName} — {tx('เหตุผลที่แจ้ง:', 'Stated Reason:')} &ldquo;{info.reasonStated}&rdquo;
                  </div>
                  <div style={{ fontSize: '0.86rem', color: '#fca5a5', marginTop: '0.25rem' }}>
                    🔍 {info.aiAnomalyDetail}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.55rem', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    onClick={() =>
                      toast.success(
                        tx(
                          `📹 เปิดภาพกล้องวงจรปิด (${log.cctvTimestamp}) ของรายการ ${log.logId}`,
                          `📹 Opened security camera clip (${log.cctvTimestamp}) for ${log.logId}`
                        )
                      )
                    }
                    style={{
                      padding: '0.55rem 0.9rem',
                      borderRadius: '10px',
                      border: '1px solid rgba(56,189,248,0.4)',
                      background: 'rgba(56,189,248,0.12)',
                      color: '#38bdf8',
                      fontWeight: 700,
                      fontSize: '0.82rem',
                      cursor: 'pointer'
                    }}
                  >
                    {tx('📹 ดูกล้องวงจรปิด', '📹 View Camera')}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleResolveAudit(log.logId)}
                    style={{
                      padding: '0.55rem 0.95rem',
                      borderRadius: '10px',
                      border: 'none',
                      background: log.resolved ? 'rgba(148,163,184,0.25)' : '#10b981',
                      color: '#ffffff',
                      fontWeight: 800,
                      fontSize: '0.82rem',
                      cursor: 'pointer'
                    }}
                  >
                    {log.resolved ? tx('↩️ เปิดเคสอีกครั้ง', '↩️ Reopen Case') : tx('✅ ยืนยันตรวจสอบแล้ว', '✅ Mark Verified')}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function MultiChannelTab({
  lang,
  branchesList,
  setBranchesList,
  channelsList,
  anomaliesList,
  setAnomaliesList,
  lineNotifyEnabled,
  setLineNotifyEnabled,
  lineNotifyTime,
  setLineNotifyTime,
  renderUploadZone,
  barChartOptions
}) {
  const isEn = lang === 'en';
  const tx = (th, en) => (isEn ? en : th);
  const [showLinePreview, setShowLinePreview] = useState(false);

  const offlineChannels = channelsList.filter(c => c.type === 'offline');
  const onlineChannels = channelsList.filter(c => c.type === 'online');

  const offlineRev = offlineChannels.reduce((acc, c) => acc + c.revenue, 0);
  const onlineRev = onlineChannels.reduce((acc, c) => acc + c.revenue, 0);
  const offlineProfit = offlineChannels.reduce((acc, c) => acc + c.netProfit, 0);
  const onlineProfit = onlineChannels.reduce((acc, c) => acc + c.netProfit, 0);

  const handleTransferDeadStock = branchId => {
    setBranchesList(prev =>
      prev.map(b => {
        if (b.branchId !== branchId) return b;
        return {
          ...b,
          deadStockValue: 0,
          inventoryTurnover: Number((b.inventoryTurnover + 1.4).toFixed(1)),
          turnoverDays: Math.max(10, b.turnoverDays - 9)
        };
      })
    );
    toast.success(
      tx(
        '🚚 สร้างใบโอนย้ายสินค้าค้างสต็อกไปยังสาขาสยามพารากอนเรียบร้อยแล้ว! อัตราหมุนเวียนสต็อกดีขึ้นทันที',
        '🚚 Created stock transfer order to Siam Paragon Branch! Inventory turnover improved immediately.'
      )
    );
  };

  const handleExportTaxExcel = () => {
    const headers = isEn
      ? ['Channel / Branch', 'Gross Revenue (THB)', 'Platform & Store Fees (THB)', 'Net Profit (THB)', 'Gross Margin (%)']
      : ['ช่องทางขาย / สาขา', 'ยอดขายรวม (บาท)', 'ค่าธรรมเนียมและค่าใช้จ่าย (บาท)', 'กำไรสุทธิ (บาท)', 'อัตรากำไร (%)'];
    const rows = channelsList.map(c => {
      const info = c[isEn ? 'en' : 'th'];
      return [`"${info.name}"`, c.revenue, c.costAndFees, c.netProfit, `${c.grossMarginPct}%`].join(',');
    });
    const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = isEn ? 'Tax_And_Channel_Report_2026.csv' : 'รายงานภาษีขายและกำไรรายช่องทาง_2026.csv';
    a.click();
    URL.revokeObjectURL(url);
    toast.success(
      tx(
        '📥 ดาวน์โหลดไฟล์ตารางรายงานภาษีขายและสต็อกเรียบร้อยแล้ว!',
        '📥 Downloaded Sales Tax & Inventory Spreadsheet Report!'
      )
    );
  };

  const channelChartData = {
    labels: channelsList.map(c => c[isEn ? 'en' : 'th'].name.replace(/^[^\s]+\s/, '')),
    datasets: [
      {
        label: tx('ยอดขายรวม (บาท)', 'Gross Revenue (THB)'),
        data: channelsList.map(c => c.revenue),
        backgroundColor: 'rgba(56, 189, 248, 0.85)',
        borderRadius: 8
      },
      {
        label: tx('กำไรสุทธิหลังหักค่าใช้จ่าย (บาท)', 'Net Profit After Fees (THB)'),
        data: channelsList.map(c => c.netProfit),
        backgroundColor: 'rgba(16, 185, 129, 0.85)',
        borderRadius: 8
      }
    ]
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {renderUploadZone('multi_channel', tx('เปรียบเทียบสาขาและช่องทางออนไลน์', 'Branch & Multi-Channel Comparison'))}

      {/* Quick Wins: Automated Export & 22:00 Daily Summary Scheduler */}
      <div
        className="glass-card"
        style={{
          padding: '1.4rem',
          borderRadius: '18px',
          background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.14), rgba(15, 23, 42, 0.92))',
          border: '1.5px solid rgba(245, 158, 11, 0.4)',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: '1 1 320px' }}>
          <LuxuryIconBadge variant="gold" size="lg" active>
            <LuxuryModuleIcon type="multi_channel" size={30} />
          </LuxuryIconBadge>
          <div>
            <span
              style={{
                display: 'inline-block',
                padding: '0.28rem 0.75rem',
                borderRadius: '999px',
                background: 'rgba(245, 158, 11, 0.2)',
                color: '#fbbf24',
                fontWeight: 800,
                fontSize: '0.8rem',
                marginBottom: '0.4rem'
              }}
            >
              {tx('ระบบส่งรายงานอัตโนมัติ & ส่งออกไฟล์บัญชี', 'AUTOMATED REPORT SCHEDULER & TAX EXPORT')}
            </span>
            <h3 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 900, color: '#f8fafc' }}>
              {tx(
                'ส่งสรุปยอดขายเข้ามือถืออัตโนมัติทุกวัน 22:00 น. & ส่งออกไฟล์ภาษีขาย',
                'Daily 22:00 Mobile Summary Notification & 1-Click Tax Report Export'
              )}
            </h3>
            <p style={{ margin: '0.3rem 0 0 0', fontSize: '0.9rem', color: '#cbd5e1' }}>
              {tx(
                'ไม่ต้องนั่งบวกเลขเองตอนปิดร้าน ระบบสรุปยอดขาย กำไรสุทธิ และสต็อกส่งเข้ามือถือให้อัตโนมัติทุกคืน',
                'No manual bookkeeping at closing time—receive daily revenue, net profit, and stock alerts automatically.'
              )}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.65rem' }}>
          <button
            type="button"
            onClick={handleExportTaxExcel}
            style={{
              padding: '0.7rem 1.1rem',
              borderRadius: '12px',
              border: '1px solid rgba(16, 185, 129, 0.5)',
              background: 'linear-gradient(135deg, #10b981, #059669)',
              color: '#fff',
              fontWeight: 800,
              cursor: 'pointer'
            }}
          >
            {tx('📥 ส่งออกรายงานภาษีขาย / สต็อก (ไฟล์ตาราง)', '📥 Export Sales Tax & Stock Report')}
          </button>

          <button
            type="button"
            onClick={() => setShowLinePreview(!showLinePreview)}
            style={{
              padding: '0.7rem 1.1rem',
              borderRadius: '12px',
              border: '1px solid rgba(56, 189, 248, 0.5)',
              background: 'rgba(56, 189, 248, 0.16)',
              color: '#38bdf8',
              fontWeight: 800,
              cursor: 'pointer'
            }}
          >
            {tx(`📲 ตั้งค่าแจ้งเตือนรายวัน (${lineNotifyTime} น.)`, `📲 Daily Mobile Alert (${lineNotifyTime})`)}
          </button>
        </div>
      </div>

      {showLinePreview && (
        <div
          className="glass-card"
          style={{
            padding: '1.25rem',
            borderRadius: '16px',
            border: '1.5px solid rgba(16, 185, 129, 0.45)',
            background: 'rgba(15, 23, 42, 0.95)',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem'
          }}
        >
          <div style={{ flex: '1 1 380px' }}>
            <div style={{ fontWeight: 900, color: '#34d399', marginBottom: '0.4rem' }}>
              {tx('💬 ตัวอย่างข้อความสรุปยอดที่จะส่งเข้ามือถือเวลา', '💬 Daily Summary Message Preview at')} {lineNotifyTime}
            </div>
            <div
              style={{
                padding: '0.9rem',
                borderRadius: '12px',
                background: 'rgba(16, 185, 129, 0.1)',
                color: '#f8fafc',
                fontSize: '0.88rem',
                lineHeight: 1.6
              }}
            >
              {tx(
                `📊 สรุปปิดยอดร้านประจำวัน (${lineNotifyTime} น.) • ยอดขายรวมทุกช่องทาง: ฿${(offlineRev + onlineRev).toLocaleString()} • กำไรสุทธิเข้ากระเป๋า: ฿${(offlineProfit + onlineProfit).toLocaleString()} • สาขาอันดับ 1: สาขาสยามพารากอน`,
                `📊 Daily Closing Summary (${lineNotifyTime}) • Total Omnichannel Revenue: ฿${(offlineRev + onlineRev).toLocaleString()} • Net Profit: ฿${(offlineProfit + onlineProfit).toLocaleString()} • #1 Branch: Siam Paragon`
              )}
            </div>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.65rem' }}>
            <label style={{ color: '#cbd5e1', fontSize: '0.88rem', fontWeight: 700 }}>
              {tx('เวลาส่งอัตโนมัติ:', 'Schedule Time:')}
              <input
                type="time"
                value={lineNotifyTime}
                onChange={e => setLineNotifyTime(e.target.value)}
                style={{
                  marginLeft: '0.5rem',
                  padding: '0.45rem 0.65rem',
                  borderRadius: '8px',
                  background: '#0f172a',
                  color: '#f8fafc',
                  border: '1px solid rgba(148,163,184,0.3)'
                }}
              />
            </label>
            <button
              type="button"
              onClick={() => setLineNotifyEnabled(!lineNotifyEnabled)}
              style={{
                padding: '0.55rem 1rem',
                borderRadius: '10px',
                border: 'none',
                background: lineNotifyEnabled ? '#10b981' : '#64748b',
                color: '#fff',
                fontWeight: 800,
                cursor: 'pointer'
              }}
            >
              {lineNotifyEnabled ? tx('✅ เปิดใช้งานอัตโนมัติอยู่', '✅ Auto-Send Enabled') : tx('⏸️ ปิดใช้งานชั่วคราว', '⏸️ Paused')}
            </button>
            <button
              type="button"
              onClick={() =>
                toast.success(
                  tx(
                    '📲 ส่งข้อความสรุปยอดขายเข้ามือถือของคุณทันทีเรียบร้อยแล้ว!',
                    '📲 Sent instant summary notification to your mobile device!'
                  )
                )
              }
              style={{
                padding: '0.55rem 1rem',
                borderRadius: '10px',
                border: '1px solid rgba(56,189,248,0.4)',
                background: 'rgba(56,189,248,0.16)',
                color: '#38bdf8',
                fontWeight: 800,
                cursor: 'pointer'
              }}
            >
              {tx('🚀 ทดสอบส่งข้อความเข้ามือถือตอนนี้', '🚀 Send Test Alert Now')}
            </button>
          </div>
        </div>
      )}

      {/* Alerts & Anomaly Detection Box */}
      {anomaliesList.length > 0 && (
        <div
          className="glass-card"
          style={{
            padding: '1.35rem',
            borderRadius: '18px',
            border: '1.5px solid rgba(244, 63, 94, 0.45)',
            background: 'rgba(244, 63, 94, 0.06)'
          }}
        >
          <h4 style={{ margin: '0 0 0.85rem 0', fontSize: '1.15rem', fontWeight: 900, color: '#fda4af' }}>
            {tx('🚨 กล่องแจ้งเตือนความผิดปกติอัจฉริยะ (ต้องรีบจัดการ)', '🚨 Smart Anomaly Detection Alerts (Immediate Action)')}
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
            {anomaliesList.map(anm => {
              const info = anm[isEn ? 'en' : 'th'];
              return (
                <div
                  key={anm.id}
                  style={{
                    padding: '1.1rem',
                    borderRadius: '14px',
                    background: 'rgba(15, 23, 42, 0.85)',
                    border: '1px solid rgba(244, 63, 94, 0.35)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '0.75rem'
                  }}
                >
                  <div>
                    <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#fbbf24', marginBottom: '0.3rem' }}>
                      {info.badge}
                    </div>
                    <div style={{ fontSize: '1rem', fontWeight: 900, color: '#f8fafc', marginBottom: '0.35rem' }}>
                      {info.title}
                    </div>
                    <div style={{ fontSize: '0.86rem', color: '#cbd5e1', lineHeight: 1.5 }}>{info.detail}</div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      type="button"
                      onClick={() => {
                        toast.success(info.actionToast);
                        setAnomaliesList(prev => prev.filter(item => item.id !== anm.id));
                      }}
                      style={{
                        flex: 1,
                        padding: '0.6rem 0.9rem',
                        borderRadius: '10px',
                        border: 'none',
                        background: 'linear-gradient(135deg, #f43f5e, #e11d48)',
                        color: '#fff',
                        fontWeight: 800,
                        fontSize: '0.82rem',
                        cursor: 'pointer'
                      }}
                    >
                      {info.actionLabel}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Offline vs Online Comparison Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
        <div className="glass-card" style={{ padding: '1.3rem', borderRadius: '16px', borderLeft: '4px solid #38bdf8' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#38bdf8' }}>
            {tx('🏪 หน้าร้านจริงทั้งหมด (4 สาขา)', '🏪 Physical Storefronts (4 Branches)')}
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#f8fafc', marginTop: '0.3rem' }}>
            ฿{offlineRev.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.88rem', color: '#34d399', fontWeight: 700, marginTop: '0.25rem' }}>
            {tx(`กำไรสุทธิ: ฿${offlineProfit.toLocaleString()} (ไม่เสียค่าธรรมเนียมแอป)`, `Net Profit: ฿${offlineProfit.toLocaleString()} (Zero App Commission)`)}
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.3rem', borderRadius: '16px', borderLeft: '4px solid #a855f7' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#c084fc' }}>
            {tx('🌐 ช่องทางออนไลน์ทั้งหมด (รวม 3 แพลตฟอร์ม)', '🌐 Online Channels (All 3 Platforms)')}
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#f8fafc', marginTop: '0.3rem' }}>
            ฿{onlineRev.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.88rem', color: '#fbbf24', fontWeight: 700, marginTop: '0.25rem' }}>
            {tx(`กำไรสุทธิหลังหักค่าธรรมเนียม: ฿${onlineProfit.toLocaleString()}`, `Net Profit After Platform Fees: ฿${onlineProfit.toLocaleString()}`)}
          </div>
        </div>
      </div>

      {/* Channel Comparison Chart & Table */}
      <div className="glass-card" style={{ padding: '1.35rem', borderRadius: '18px' }}>
        <h4 style={{ margin: '0 0 1rem 0', fontSize: '1.15rem', fontWeight: 800 }}>
          {tx('📊 เปรียบเทียบยอดขาย ค่าธรรมเนียม และกำไรสุทธิระหว่างหน้าร้านกับออนไลน์', '📊 Channel Comparison: Gross Revenue, Fees & Net Profit')}
        </h4>
        <div style={{ height: '240px', marginBottom: '1.25rem' }}>
          <Bar data={channelChartData} options={barChartOptions} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
          {channelsList.map(ch => {
            const info = ch[isEn ? 'en' : 'th'];
            return (
              <div
                key={ch.id}
                style={{
                  padding: '1.1rem',
                  borderRadius: '14px',
                  background: 'rgba(15, 23, 42, 0.7)',
                  border: '1px solid rgba(148, 163, 184, 0.2)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <span style={{ fontWeight: 900, color: '#f8fafc', fontSize: '0.98rem' }}>{info.name}</span>
                  <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#34d399' }}>{ch.growth}</span>
                </div>
                <div style={{ fontSize: '0.82rem', color: '#fbbf24', fontWeight: 700, marginBottom: '0.5rem' }}>
                  {info.badge}
                </div>
                <div style={{ fontSize: '0.86rem', color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                  <div>
                    {tx('ยอดขายรวม:', 'Revenue:')} <strong>฿{ch.revenue.toLocaleString()}</strong> ({ch.orders} {tx('คำสั่งซื้อ', 'orders')})
                  </div>
                  <div>
                    {tx('ค่าใช้จ่าย:', 'Fees/Costs:')} <span style={{ color: '#fda4af' }}>-฿{ch.costAndFees.toLocaleString()}</span> ({info.feeDesc})
                  </div>
                  <div>
                    {tx('กำไรสุทธิ:', 'Net Profit:')}{' '}
                    <strong style={{ color: '#34d399' }}>
                      ฿{ch.netProfit.toLocaleString()} ({ch.grossMarginPct}%)
                    </strong>
                  </div>
                </div>
                <div style={{ marginTop: '0.6rem', paddingTop: '0.55rem', borderTop: '1px dashed rgba(148,163,184,0.2)', fontSize: '0.82rem', color: '#94a3b8' }}>
                  💡 {info.aiAdvice}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Store Ranking & Inventory Turnover Table */}
      <div className="glass-card" style={{ padding: '1.35rem', borderRadius: '18px', overflowX: 'auto' }}>
        <h4 style={{ margin: '0 0 0.85rem 0', fontSize: '1.15rem', fontWeight: 800 }}>
          {tx('🏆 จัดอันดับสาขาตามยอดขายและอัตราการหมุนเวียนสินค้า', '🏆 Store Ranking by Revenue & Inventory Turnover Speed')}
        </h4>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '780px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(148,163,184,0.2)', textAlign: 'left', color: '#94a3b8', fontSize: '0.84rem' }}>
              <th style={{ padding: '0.75rem' }}>{tx('อันดับ / สาขา', 'Rank / Branch')}</th>
              <th style={{ padding: '0.75rem' }}>{tx('ยอดขายต่อเดือน', 'Monthly Sales')}</th>
              <th style={{ padding: '0.75rem' }}>{tx('ความเร็วการหมุนสต็อก', 'Inventory Turnover')}</th>
              <th style={{ padding: '0.75rem' }}>{tx('มูลค่าสินค้าค้างคลัง', 'Stagnant Stock')}</th>
              <th style={{ padding: '0.75rem' }}>{tx('สถานะสาขา', 'Branch Status')}</th>
              <th style={{ padding: '0.75rem' }}>{tx('การจัดการสต็อก', 'Stock Action')}</th>
            </tr>
          </thead>
          <tbody>
            {branchesList.map(br => {
              const info = br[isEn ? 'en' : 'th'];
              return (
                <tr key={br.branchId} style={{ borderBottom: '1px solid rgba(148,163,184,0.12)' }}>
                  <td style={{ padding: '0.85rem 0.75rem' }}>
                    <div style={{ fontWeight: 900, color: '#f8fafc' }}>
                      #{br.rank} {info.branchName}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                      {tx('ผู้จัดการ:', 'Manager:')} {info.manager}
                    </div>
                  </td>
                  <td style={{ padding: '0.85rem 0.75rem', fontWeight: 800, color: '#38bdf8' }}>
                    ฿{br.revenue.toLocaleString()}
                    <div style={{ fontSize: '0.78rem', color: '#34d399' }}>
                      {tx('อัตรากำไร', 'Margin')} {br.netMarginPct}%
                    </div>
                  </td>
                  <td style={{ padding: '0.85rem 0.75rem', fontWeight: 800, color: '#fbbf24' }}>
                    {br.inventoryTurnover} {tx('รอบ/ปี', 'turns/yr')}
                    <div style={{ fontSize: '0.78rem', color: '#cbd5e1' }}>
                      ({tx(`ขายออกเฉลี่ย ${br.turnoverDays} วัน`, `Avg ${br.turnoverDays} days to sell`)})
                    </div>
                  </td>
                  <td style={{ padding: '0.85rem 0.75rem', fontWeight: 800, color: br.deadStockValue > 40000 ? '#f43f5e' : '#cbd5e1' }}>
                    ฿{br.deadStockValue.toLocaleString()}
                  </td>
                  <td style={{ padding: '0.85rem 0.75rem', fontSize: '0.84rem', color: '#e2e8f0' }}>
                    {info.statusText}
                  </td>
                  <td style={{ padding: '0.85rem 0.75rem' }}>
                    {br.deadStockValue > 0 ? (
                      <button
                        type="button"
                        onClick={() => handleTransferDeadStock(br.branchId)}
                        style={{
                          padding: '0.45rem 0.85rem',
                          borderRadius: '8px',
                          border: '1px solid rgba(245, 158, 11, 0.45)',
                          background: 'rgba(245, 158, 11, 0.16)',
                          color: '#fbbf24',
                          fontWeight: 800,
                          fontSize: '0.8rem',
                          cursor: 'pointer'
                        }}
                      >
                        {tx('🚚 โอนสต็อกไปสาขาขายดี', '🚚 Transfer Stock to #1 Branch')}
                      </button>
                    ) : (
                      <span style={{ color: '#34d399', fontWeight: 800, fontSize: '0.82rem' }}>
                        {tx('✅ สต็อกคล่องตัวดีเยี่ยม', '✅ Optimal Stock')}
                      </span>
                    )}
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

