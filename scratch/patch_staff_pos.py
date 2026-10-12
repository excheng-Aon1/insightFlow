with open('/Users/pmsp63/Desktop/insightflow-app/src/App.jsx', 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Add Staff & POS Performance state, dataset, filters, and CSV export after exportCustomerRfmCsv
staff_state_snippet = """  const exportCustomerRfmCsv = () => {
    const headers = ['Customer ID,Name,RFM Segment,RFM Score,Last Purchase,Frequency (Orders),Lifetime Value (LTV),Avg Order Value,Phone,LINE ID,Favorite Product'];
    const rows = customersData.map(c =>
      `"${c.id}","${c.name}","${c.segment.toUpperCase()}","${c.rfmScore}","${c.recencyText}",${c.frequency},${c.ltv},${c.aov},"${c.phone}","${c.lineId}","${c.favoriteProduct}"`
    );
    const csvContent = "\\uFEFF" + [headers, ...rows].join("\\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'InsightFlow_Customer_RFM_LTV.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('📥 ส่งออกฐานข้อมูลวิเคราะห์ลูกค้า RFM & LTV (.csv) สำเร็จ!');
  };

  // --- ระบบวิเคราะห์พนักงานและจุดขาย (Staff & POS Performance + Audit & Fraud Detection) ---
  const [selectedBranchFilter, setSelectedBranchFilter] = useState('all'); // 'all' | 'siam' | 'sukhumvit' | 'ladprao' | 'chiangmai'
  const [staffSearchQuery, setStaffSearchQuery] = useState('');
  const [selectedAuditType, setSelectedAuditType] = useState('all'); // 'all' | 'void' | 'refund' | 'drawer' | 'high_risk'
  const [selectedStaffProfile, setSelectedStaffProfile] = useState(null);

  const staffPerformanceData = [
    {
      id: 'STF-101',
      name: 'คุณภัทรพล วงศ์สุวรรณ (ต้อม)',
      role: 'Senior Sales Specialist',
      branchId: 'siam',
      branchName: 'สาขาสยามพารากอน (POS #01)',
      totalSales: 684500,
      billsCount: 245,
      basketSize: 2794,
      itemsPerBasket: 3.4,
      upsellAttempts: 245,
      upsellSuccess: 108,
      upsellRate: 44.1,
      upsellRevenue: 162000,
      topUpsellItem: 'AppleCare+ & ประกันจอแตก 2 ปี (+฿2,590)',
      voidCount: 1,
      refundCount: 0,
      noSaleDrawerCount: 1,
      riskLevel: 'low',
      riskScore: 8,
      statusBadge: '🏆 Top Upseller อันดับ 1',
      aiCoaching: 'พนักงานดาวเด่น! มีทักษะการเชียร์ขายประกันพ่วงและชุดเซ็ตได้ดีเยี่ยม ควรให้เป็น Mentor สอนสคริปต์ปิดการขายให้สาขาอื่น'
    },
    {
      id: 'STF-104',
      name: 'คุณชนากานต์ รัตนโชติ (มิ้นท์)',
      role: 'Store Cashier & Advisor',
      branchId: 'sukhumvit',
      branchName: 'สาขาสุขุมวิท-ทองหล่อ (POS #02)',
      totalSales: 592000,
      billsCount: 210,
      basketSize: 2819,
      itemsPerBasket: 3.1,
      upsellAttempts: 210,
      upsellSuccess: 82,
      upsellRate: 39.0,
      upsellRevenue: 124500,
      topUpsellItem: 'เซ็ตหัวชาร์จ GaN 65W + สายถัก (+฿1,290)',
      voidCount: 1,
      refundCount: 1,
      noSaleDrawerCount: 2,
      riskLevel: 'low',
      riskScore: 12,
      statusBadge: '💎 High Basket Size',
      aiCoaching: 'ทำยอดเฉลี่ยต่อบิล (Basket Size) ได้สูงสุดในบริษัท แนะนำให้เพิ่มการเชียร์สินค้ากลุ่ม Smart Home จะดันยอดเพิ่มได้อีก +18%'
    },
    {
      id: 'STF-108',
      name: 'คุณธนดล กิตติพงศ์ (แบงค์)',
      role: 'POS Cashier',
      branchId: 'ladprao',
      branchName: 'สาขาเซ็นทรัลลาดพร้าว (POS #04)',
      totalSales: 318000,
      billsCount: 195,
      basketSize: 1631,
      itemsPerBasket: 1.8,
      upsellAttempts: 195,
      upsellSuccess: 29,
      upsellRate: 14.9,
      upsellRevenue: 31900,
      topUpsellItem: 'ฟิล์มกระจกนิรภัย (+฿590)',
      voidCount: 14,
      refundCount: 6,
      noSaleDrawerCount: 19,
      riskLevel: 'high',
      riskScore: 89,
      statusBadge: '🚨 เฝ้าระวังทุจริต (High Void/Drawer)',
      aiCoaching: '⚠️ AI Fraud Alert: พบการกดยกเลิกบิล (Void) หลังรับเงินสด 14 ครั้ง และเปิดลิ้นชักเก็บเงินโดยไม่ขาย (No-Sale Drawer) 19 ครั้งในช่วงกะดึก แนะนำให้ผู้จัดการตรวจสอบกล้องวงจรปิดทันที'
    },
    {
      id: 'STF-112',
      name: 'คุณศิริพร ใจดี (พลอย)',
      role: 'Sales Associate',
      branchId: 'siam',
      branchName: 'สาขาสยามพารากอน (POS #02)',
      totalSales: 468000,
      billsCount: 198,
      basketSize: 2364,
      itemsPerBasket: 2.6,
      upsellAttempts: 198,
      upsellSuccess: 64,
      upsellRate: 32.3,
      upsellRevenue: 89600,
      topUpsellItem: 'เคสกันกระแทก MagSafe แท้ (+฿1,490)',
      voidCount: 2,
      refundCount: 1,
      noSaleDrawerCount: 3,
      riskLevel: 'low',
      riskScore: 15,
      statusBadge: '✅ มาตรฐานดีเยี่ยม',
      aiCoaching: 'ผลงานสม่ำเสมอ อัตราการแนะนำสินค้าโปรโมชัน (Up-selling) สูงกว่าค่าเฉลี่ยร้าน (+32.3%)'
    },
    {
      id: 'STF-115',
      name: 'คุณอนุชา เก่งการค้า (อาร์ม)',
      role: 'POS Cashier',
      branchId: 'chiangmai',
      branchName: 'สาขาเชียงใหม่ นิมมาน (POS #01)',
      totalSales: 289000,
      billsCount: 180,
      basketSize: 1606,
      itemsPerBasket: 1.6,
      upsellAttempts: 180,
      upsellSuccess: 22,
      upsellRate: 12.2,
      upsellRevenue: 19800,
      topUpsellItem: 'น้ำยาทำความสะอาดหน้าจอ (+฿290)',
      voidCount: 7,
      refundCount: 5,
      noSaleDrawerCount: 9,
      riskLevel: 'medium',
      riskScore: 54,
      statusBadge: '⚠️ ต้องโค้ชชิ่ง Up-sell & ตรวจสอบบิล',
      aiCoaching: 'ยอดต่อบิลและอัตรา Up-sell ยังต่ำกว่าเกณฑ์ และมีการทำ Refund เงินสดสูงผิดปกติในวันหยุด ควรกำหนดให้ต้องใช้รหัสผู้จัดการอนุมัติก่อน Refund'
    },
    {
      id: 'STF-119',
      name: 'คุณปวีณา สุขสวัสดิ์ (เนย)',
      role: 'Senior Advisor',
      branchId: 'sukhumvit',
      branchName: 'สาขาสุขุมวิท-ทองหล่อ (POS #01)',
      totalSales: 534000,
      billsCount: 204,
      basketSize: 2618,
      itemsPerBasket: 2.9,
      upsellAttempts: 204,
      upsellSuccess: 76,
      upsellRate: 37.3,
      upsellRevenue: 114000,
      topUpsellItem: 'แพ็กเกจคู่ หูฟังไร้สาย + แท่นชาร์จ (+฿1,990)',
      voidCount: 0,
      refundCount: 0,
      noSaleDrawerCount: 1,
      riskLevel: 'low',
      riskScore: 4,
      statusBadge: '🛡️ โปร่งใส 100% (Zero Void)',
      aiCoaching: 'ความถูกต้องในการแคชเชียร์ 100% ไม่มีการยกเลิกบิลหรือคืนเงินผิดพลาดเลย และทำยอด Up-sell ได้แข็งแกร่งมาก'
    }
  ];

  const posAuditLogs = [
    {
      logId: 'AUD-2026-8841',
      timestamp: 'วันนี้ • 21:42:18 น.',
      staffId: 'STF-108',
      staffName: 'คุณธนดล กิตติพงศ์ (แบงค์)',
      branchName: 'สาขาเซ็นทรัลลาดพร้าว (POS #04)',
      eventType: 'void',
      eventLabel: '🚫 ยกเลิกบิลหลังพิมพ์ใบเสร็จ (Post-Print Void)',
      billNo: 'INV-LP-09482',
      amount: 4590,
      paymentMethod: 'เงินสด (Cash)',
      reasonStated: 'ลูกค้าเปลี่ยนใจไม่รับสินค้า',
      aiAnomalyDetail: 'ตรวจพบการกดพิมพ์ใบเสร็จชั่วคราวแล้วกดยกเลิกบิลทันทีหลังรับเงินสด (ซ้ำรูปแบบเดิมครั้งที่ 4 ในสัปดาห์นี้)',
      severity: 'critical',
      cctvTimestamp: 'CAM-04 @ 21:41:50 - 21:43:10'
    },
    {
      logId: 'AUD-2026-8839',
      timestamp: 'วันนี้ • 20:15:04 น.',
      staffId: 'STF-108',
      staffName: 'คุณธนดล กิตติพงศ์ (แบงค์)',
      branchName: 'สาขาเซ็นทรัลลาดพร้าว (POS #04)',
      eventType: 'drawer',
      eventLabel: '🔓 เปิดลิ้นชักเก็บเงินโดยไม่มีรายการขาย (No-Sale Drawer Open)',
      billNo: 'NO-SALE-19',
      amount: 0,
      paymentMethod: 'Manual Kick',
      reasonStated: 'แลกเหรียญทอนเงิน',
      aiAnomalyDetail: 'เปิดลิ้นชักค้างไว้ 48 วินาที (เกินค่ามาตรฐาน 15 วินาที) โดยไม่มีธุรกรรมก่อนหน้า',
      severity: 'high',
      cctvTimestamp: 'CAM-04 @ 20:14:55 - 20:16:00'
    },
    {
      logId: 'AUD-2026-8832',
      timestamp: 'วันนี้ • 17:30:45 น.',
      staffId: 'STF-115',
      staffName: 'คุณอนุชา เก่งการค้า (อาร์ม)',
      branchName: 'สาขาเชียงใหม่ นิมมาน (POS #01)',
      eventType: 'refund',
      eventLabel: '💸 คืนเงินสดให้ลูกค้า (Cash Refund)',
      billNo: 'INV-CM-03319',
      amount: 3290,
      paymentMethod: 'คืนเป็นเงินสด',
      reasonStated: 'สินค้ามีตำหนิจากโรงงาน',
      aiAnomalyDetail: 'อ้างอิงบิลขายเดิมที่ซื้อเมื่อ 14 วันก่อน แต่ไม่มีการสแกนบาร์โค้ดสินค้ากลับเข้าคลังสินค้าชำรุด',
      severity: 'high',
      cctvTimestamp: 'CAM-01 @ 17:29:30 - 17:32:00'
    },
    {
      logId: 'AUD-2026-8820',
      timestamp: 'วันนี้ • 14:12:09 น.',
      staffId: 'STF-112',
      staffName: 'คุณศิริพร ใจดี (พลอย)',
      branchName: 'สาขาสยามพารากอน (POS #02)',
      eventType: 'void',
      eventLabel: '🔄 ยกเลิกบิลเพื่อเปลี่ยนรายการ (Item Correction Void)',
      billNo: 'INV-SP-11204',
      amount: 1490,
      paymentMethod: 'PromptPay QR',
      reasonStated: 'ลูกค้าขออัปเกรดเป็นรุ่น Pro (เปิดบิลใหม่ INV-SP-11205 ทันที)',
      aiAnomalyDetail: 'ปกติ: พบการเปิดบิลใหม่มูลค่าสูงขึ้น (฿3,490) ภายใน 45 วินาทีหลังจากยกเลิกบิลเดิม',
      severity: 'normal',
      cctvTimestamp: 'CAM-02 @ 14:11:50 - 14:13:00'
    },
    {
      logId: 'AUD-2026-8814',
      timestamp: 'วันนี้ • 11:05:33 น.',
      staffId: 'STF-104',
      staffName: 'คุณชนากานต์ รัตนโชติ (มิ้นท์)',
      branchName: 'สาขาสุขุมวิท-ทองหล่อ (POS #02)',
      eventType: 'drawer',
      eventLabel: '🔓 เปิดลิ้นชักนับเงินทอนกะเช้า (Shift Opening Count)',
      billNo: 'SHIFT-OPEN',
      amount: 5000,
      paymentMethod: 'เงินทอนตั้งต้น',
      reasonStated: 'ตรวจนับเงินสดตั้งต้นกะเช้าร่วมกับผู้จัดการสาขา',
      aiAnomalyDetail: 'ปกติ: มีการสแกนบัตรผู้จัดการสาขายืนยันถูกต้อง',
      severity: 'normal',
      cctvTimestamp: 'CAM-02 @ 11:05:00 - 11:06:30'
    }
  ];

  const filteredStaffList = staffPerformanceData.filter(stf => {
    const matchBranch = selectedBranchFilter === 'all' || stf.branchId === selectedBranchFilter;
    const q = staffSearchQuery.trim().toLowerCase();
    const matchSearch = !q ||
      stf.name.toLowerCase().includes(q) ||
      stf.id.toLowerCase().includes(q) ||
      stf.branchName.toLowerCase().includes(q) ||
      stf.topUpsellItem.toLowerCase().includes(q);
    return matchBranch && matchSearch;
  });

  const filteredAuditLogs = posAuditLogs.filter(log => {
    if (selectedAuditType === 'all') return true;
    if (selectedAuditType === 'high_risk') return log.severity === 'critical' || log.severity === 'high';
    return log.eventType === selectedAuditType;
  });

  const exportStaffPosAuditCsv = () => {
    const headers = ['Staff ID,Name,Role,Branch,Total Sales (THB),Total Bills,Avg Basket Size (THB),Upsell Conversion (%),Upsell Revenue (THB),Void Count,Refund Count,No-Sale Drawer Open,Fraud Risk Level'];
    const rows = staffPerformanceData.map(s =>
      `"${s.id}","${s.name}","${s.role}","${s.branchName}",${s.totalSales},${s.billsCount},${s.basketSize},${s.upsellRate},${s.upsellRevenue},${s.voidCount},${s.refundCount},${s.noSaleDrawerCount},"${s.riskLevel.toUpperCase()}"`
    );
    const csvContent = "\\uFEFF" + [headers, ...rows].join("\\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'InsightFlow_Staff_POS_Audit_Report.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('📥 ส่งออกรายงานผลงานพนักงาน & บันทึกตรวจสอบทุจริต POS (.csv) สำเร็จ!');
  };"""

old_export_rfm = """  const exportCustomerRfmCsv = () => {
    const headers = ['Customer ID,Name,RFM Segment,RFM Score,Last Purchase,Frequency (Orders),Lifetime Value (LTV),Avg Order Value,Phone,LINE ID,Favorite Product'];
    const rows = customersData.map(c =>
      `"${c.id}","${c.name}","${c.segment.toUpperCase()}","${c.rfmScore}","${c.recencyText}",${c.frequency},${c.ltv},${c.aov},"${c.phone}","${c.lineId}","${c.favoriteProduct}"`
    );
    const csvContent = "\\uFEFF" + [headers, ...rows].join("\\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', 'InsightFlow_Customer_RFM_LTV.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('📥 ส่งออกฐานข้อมูลวิเคราะห์ลูกค้า RFM & LTV (.csv) สำเร็จ!');
  };"""

assert old_export_rfm in code, "old_export_rfm not found"
code = code.replace(old_export_rfm, staff_state_snippet, 1)

# 2. Add 'staff_pos' to sidebar navigation right after 'customers'
old_sidebar_customers = """              { 
                id: 'customers', 
                label: 'วิเคราะห์ลูกค้า (CRM)', 
                badge: 'RFM',
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ) 
              },"""

new_sidebar_customers_and_pos = """              { 
                id: 'customers', 
                label: 'วิเคราะห์ลูกค้า (CRM)', 
                badge: 'RFM',
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                ) 
              },
              { 
                id: 'staff_pos', 
                label: 'พนักงาน & จุดขาย (POS)', 
                badge: 'POS',
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ) 
              },"""

assert old_sidebar_customers in code, "old_sidebar_customers not found"
code = code.replace(old_sidebar_customers, new_sidebar_customers_and_pos, 1)

# 3. Add header title for 'staff_pos'
old_header_customers = "{activeTab === 'customers' && 'Customer Insights, RFM & LTV Intelligence'}"
new_header_customers = """{activeTab === 'customers' && 'Customer Insights, RFM & LTV Intelligence'}
                {activeTab === 'staff_pos' && 'Staff & POS Performance • Audit & Fraud Guard'}"""
assert old_header_customers in code, "old_header_customers not found"
code = code.replace(old_header_customers, new_header_customers, 1)

# 4. Add the complete Staff & POS Performance tab UI before TAB: INVENTORY
target_inventory_marker = "          {/* TAB: INVENTORY */}"
staff_pos_tab_jsx = """          {/* TAB: วิเคราะห์พนักงานและจุดขาย (STAFF & POS PERFORMANCE + AUDIT & FRAUD DETECTION) */}
          {activeTab === 'staff_pos' && (
            <div className="space-y-8 animate-in fade-in duration-300">

              {/* 1. HERO BANNER: STAFF & POS PERFORMANCE + FRAUD GUARD */}
              <div className={`p-7 sm:p-8 rounded-3xl border relative overflow-hidden shadow-2xl ${
                theme === 'dark'
                  ? 'bg-gradient-to-r from-sky-500/15 via-[#0b1228] to-rose-500/10 border-sky-400/40'
                  : 'bg-gradient-to-r from-sky-100/70 via-white to-rose-50 border-sky-300'
              }`}>
                <div className="relative z-10 flex flex-col lg:flex-row justify-between lg:items-center gap-6">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 shadow-xl shadow-amber-400/20 flex-shrink-0">
                      <svg className="w-8 h-8 text-slate-950" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-400 border border-amber-400/30">
                          Multi-Branch POS Intelligence
                        </span>
                        <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-400 border border-rose-500/30 animate-pulse">
                          🛡️ AI Anti-Fraud Guard Active
                        </span>
                        <span className="text-xs text-slate-400">เชื่อมโยงข้อมูลสด 4 สาขา • พนักงาน 6 คน</span>
                      </div>
                      <h2 className={`text-2xl font-black mt-1.5 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                        วิเคราะห์ผลงานพนักงาน & จุดขาย (Staff & POS Performance + Fraud Audit)
                      </h2>
                      <p className="text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
                        ติดตาม <strong className="text-amber-400">ยอดขายเฉลี่ยต่อบิล (Basket Size)</strong>, วัดผล <strong className="text-emerald-400">อัตราการเชียร์สินค้าพ่วง (Up-selling Performance)</strong> ของพนักงานแต่ละคน และระบบ <strong className="text-rose-400">Audit & Fraud Detection</strong> ตรวจจับการกดยกเลิกบิล (Void), การคืนเงิน (Refund) และการเปิดลิ้นชักเก็บเงินผิดปกติแบบเรียลไทม์
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 self-start lg:self-center">
                    <button
                      onClick={exportStaffPosAuditCsv}
                      className="bg-white/10 hover:bg-white/15 text-slate-200 font-bold px-5 py-3 rounded-2xl text-xs border border-white/15 transition flex items-center gap-2 cursor-pointer"
                    >
                      <span>📥 ส่งออกรายงาน POS & Audit (.csv)</span>
                    </button>
                    <button
                      onClick={() => toast.success('🔒 เปิดโหมดบังคับใช้รหัส OTP ผู้จัดการสาขาสำหรับการกด Void / Refund เกิน ฿1,000 ทุกเครื่อง POS แล้ว!')}
                      className="bg-gradient-to-r from-amber-400 to-amber-300 hover:brightness-105 text-slate-950 font-black px-6 py-3 rounded-2xl text-xs transition shadow-xl shadow-amber-400/20 flex items-center gap-2 cursor-pointer"
                    >
                      <span>🛡️ ตั้งค่าล็อกสิทธิ์ Void / Refund</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* 2. EXECUTIVE KPI SUMMARY CARDS (4 METRICS) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className={`p-6 rounded-3xl border shadow-xl backdrop-blur-xl ${
                  theme === 'dark' ? 'bg-[#0b1020]/85 border-amber-400/30' : 'bg-white border-amber-200'
                }`}>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">ยอดขายเฉลี่ยต่อบิล (Avg Basket Size)</span>
                    <span className="text-lg">🛒</span>
                  </div>
                  <h3 className={`text-3xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>฿ 2,415</h3>
                  <p className="text-xs text-emerald-400 mt-2 font-semibold">↗ +19.4% เทียบเดือนก่อน (เฉลี่ย 2.7 ชิ้น/บิล)</p>
                </div>

                <div className={`p-6 rounded-3xl border shadow-xl backdrop-blur-xl ${
                  theme === 'dark' ? 'bg-[#0b1020]/85 border-emerald-500/30' : 'bg-white border-emerald-200'
                }`}>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">ยอดขายจาก Up-selling สินค้าพ่วง</span>
                    <span className="text-lg">🚀</span>
                  </div>
                  <h3 className={`text-3xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>฿ 541,800</h3>
                  <p className="text-xs text-slate-400 mt-2">อัตราแนะนำสำเร็จเฉลี่ย <strong className="text-emerald-400">31.0%</strong> ของบิลทั้งหมด</p>
                </div>

                <div className={`p-6 rounded-3xl border shadow-xl backdrop-blur-xl ${
                  theme === 'dark' ? 'bg-[#0b1020]/85 border-sky-500/30' : 'bg-white border-sky-200'
                }`}>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">พนักงานดาวเด่น (Top Basket & Upsell)</span>
                    <span className="text-lg">🏆</span>
                  </div>
                  <h3 className={`text-xl font-black truncate ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>คุณภัทรพล (สาขาสยาม)</h3>
                  <p className="text-xs text-sky-400 mt-2 font-semibold">Up-sell สำเร็จ 44.1% • ฿ 2,794 / บิล</p>
                </div>

                <div className={`p-6 rounded-3xl border shadow-xl backdrop-blur-xl ${
                  theme === 'dark' ? 'bg-[#0b1020]/85 border-rose-500/40' : 'bg-white border-rose-300'
                }`}>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">แจ้งเตือนความเสี่ยงทุจริต (Fraud Alerts)</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
                  </div>
                  <h3 className="text-3xl font-black text-rose-400">3 รายการผิดปกติ</h3>
                  <p className="text-xs text-slate-400 mt-2">Void 25 ครั้ง • Refund 13 ครั้ง • เปิดลิ้นชัก 35 ครั้ง</p>
                </div>
              </div>

              {/* 3. STAFF SALES, BASKET SIZE & UP-SELLING PERFORMANCE TABLE */}
              <div className={`p-7 rounded-3xl border shadow-2xl backdrop-blur-xl ${
                theme === 'dark' ? 'bg-[#0b1020]/85 border-white/10' : 'bg-white border-slate-200'
              }`}>
                <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4 mb-6">
                  <div>
                    <h3 className={`text-lg font-black flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                      <span>📊 1. ตารางวิเคราะห์ยอดขายรายพนักงาน, ยอดต่อบิล (Basket Size) และสถิติ Up-selling</span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      เปรียบเทียบความสามารถในการปิดการขาย การเชียร์สินค้าพ่วง และความโปร่งใสในการใช้เครื่อง POS ของพนักงานแต่ละคน
                    </p>
                  </div>

                  {/* Branch Filter & Search */}
                  <div className="flex flex-wrap items-center gap-2.5">
                    <select
                      value={selectedBranchFilter}
                      onChange={(e) => setSelectedBranchFilter(e.target.value)}
                      className={`px-3.5 py-2.5 rounded-2xl border text-xs font-bold focus:outline-none focus:border-amber-400 ${
                        theme === 'dark' ? 'bg-[#050914] border-white/15 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                      }`}
                    >
                      <option value="all">🏢 ทุกสาขาทั้งหมด (4 สาขา)</option>
                      <option value="siam">📍 สาขาสยามพารากอน</option>
                      <option value="sukhumvit">📍 สาขาสุขุมวิท-ทองหล่อ</option>
                      <option value="ladprao">📍 สาขาเซ็นทรัลลาดพร้าว</option>
                      <option value="chiangmai">📍 สาขาเชียงใหม่ นิมมาน</option>
                    </select>

                    <div className="relative w-64">
                      <input
                        type="text"
                        value={staffSearchQuery}
                        onChange={(e) => setStaffSearchQuery(e.target.value)}
                        placeholder="ค้นหาชื่อพนักงาน, รหัส, สาขา..."
                        className={`w-full pl-9 pr-4 py-2.5 rounded-2xl border text-xs font-medium focus:outline-none focus:border-amber-400 ${
                          theme === 'dark' ? 'bg-[#050914] border-white/15 text-white placeholder-slate-500' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                      <svg className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className={`border-b text-[11px] font-black uppercase tracking-wider ${
                        theme === 'dark' ? 'border-white/10 text-slate-400 bg-black/20' : 'border-slate-200 text-slate-600 bg-slate-50'
                      }`}>
                        <th className="py-3.5 px-4 rounded-tl-xl">พนักงาน / จุดขาย (POS)</th>
                        <th className="py-3.5 px-4">ยอดขายรวม</th>
                        <th className="py-3.5 px-4">เฉลี่ยต่อบิล (Basket Size)</th>
                        <th className="py-3.5 px-4">สถิติ Up-selling (เชียร์สินค้าพ่วง)</th>
                        <th className="py-3.5 px-4">สินค้าพ่วงที่ขายดีที่สุด</th>
                        <th className="py-3.5 px-4">ประวัติ Void / Refund / ลิ้นชัก</th>
                        <th className="py-3.5 px-4 text-right rounded-tr-xl">การจัดการ / ตรวจสอบ</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-xs">
                      {filteredStaffList.map((stf) => (
                        <tr
                          key={stf.id}
                          className={`transition ${
                            theme === 'dark' ? 'hover:bg-white/[0.04]' : 'hover:bg-slate-50'
                          } ${selectedStaffProfile?.id === stf.id ? 'bg-amber-400/10' : ''}`}
                        >
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-xl font-black flex items-center justify-center text-xs border ${
                                stf.riskLevel === 'high' ? 'bg-rose-500/20 text-rose-300 border-rose-500/40' :
                                stf.riskLevel === 'medium' ? 'bg-amber-400/20 text-amber-300 border-amber-400/40' :
                                'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                              }`}>
                                {stf.name.slice(3, 5)}
                              </div>
                              <div>
                                <p className={`font-black text-sm ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                                  {stf.name}
                                </p>
                                <p className="text-[11px] text-slate-400">{stf.id} • {stf.branchName}</p>
                                <span className={`inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-md ${
                                  stf.riskLevel === 'high' ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                                  stf.riskLevel === 'medium' ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30' :
                                  'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                                }`}>
                                  {stf.statusBadge}
                                </span>
                              </div>
                            </div>
                          </td>

                          <td className="py-4 px-4">
                            <span className="text-sm font-black text-white font-mono">
                              ฿ {stf.totalSales.toLocaleString()}
                            </span>
                            <p className="text-[11px] text-slate-400 mt-0.5">จำนวน {stf.billsCount} บิล</p>
                          </td>

                          <td className="py-4 px-4">
                            <span className="text-base font-black text-amber-400 font-mono">
                              ฿ {stf.basketSize.toLocaleString()}
                            </span>
                            <p className="text-[11px] text-slate-400 mt-0.5">เฉลี่ย {stf.itemsPerBasket} ชิ้น / บิล</p>
                          </td>

                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              <span className={`text-sm font-black font-mono ${
                                stf.upsellRate >= 35 ? 'text-emerald-400' : stf.upsellRate >= 20 ? 'text-sky-400' : 'text-amber-400'
                              }`}>
                                {stf.upsellRate}%
                              </span>
                              <span className="text-[11px] text-slate-400">({stf.upsellSuccess}/{stf.upsellAttempts} บิล)</span>
                            </div>
                            <div className="w-36 h-1.5 bg-white/10 rounded-full overflow-hidden mt-1.5">
                              <div
                                className={`h-full rounded-full ${
                                  stf.upsellRate >= 35 ? 'bg-emerald-400' : stf.upsellRate >= 20 ? 'bg-sky-400' : 'bg-amber-400'
                                }`}
                                style={{ width: `${Math.min(100, stf.upsellRate * 2)}%` }}
                              ></div>
                            </div>
                            <p className="text-[10px] text-emerald-400 font-semibold mt-1">
                              สร้างรายได้พ่วง +฿ {stf.upsellRevenue.toLocaleString()}
                            </p>
                          </td>

                          <td className="py-4 px-4">
                            <span className="text-xs font-semibold text-slate-200">{stf.topUpsellItem}</span>
                          </td>

                          <td className="py-4 px-4">
                            <div className="flex flex-wrap gap-1.5">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                                stf.voidCount > 5 ? 'bg-rose-500/20 text-rose-400 border-rose-500/40' : 'bg-white/5 text-slate-300 border-white/10'
                              }`}>
                                Void: {stf.voidCount}
                              </span>
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                                stf.refundCount > 3 ? 'bg-amber-500/20 text-amber-300 border-amber-500/40' : 'bg-white/5 text-slate-300 border-white/10'
                              }`}>
                                Refund: {stf.refundCount}
                              </span>
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                                stf.noSaleDrawerCount > 5 ? 'bg-rose-500/20 text-rose-400 border-rose-500/40' : 'bg-white/5 text-slate-300 border-white/10'
                              }`}>
                                เปิดลิ้นชัก: {stf.noSaleDrawerCount}
                              </span>
                            </div>
                            <p className={`text-[10px] font-bold mt-1 ${
                              stf.riskLevel === 'high' ? 'text-rose-400' : stf.riskLevel === 'medium' ? 'text-amber-400' : 'text-emerald-400'
                            }`}>
                              Fraud Risk Score: {stf.riskScore}/100
                            </p>
                          </td>

                          <td className="py-4 px-4 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => setSelectedStaffProfile(stf)}
                                className="px-3 py-1.5 rounded-xl bg-amber-400/15 hover:bg-amber-400/25 text-amber-300 border border-amber-400/30 text-xs font-bold transition cursor-pointer"
                              >
                                🔍 เจาะลึกรายคน
                              </button>
                              <button
                                onClick={() => toast.success(`📩 ส่งผลประเมิน KPI & สคริปต์แนะนำ Up-selling ให้ ${stf.name} เรียบร้อยแล้ว!`)}
                                className="px-2.5 py-1.5 rounded-xl bg-sky-500/15 hover:bg-sky-500/25 text-sky-300 border border-sky-500/30 text-xs font-bold transition cursor-pointer"
                              >
                                💬 ส่ง Feedback
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* STAFF 360° PERFORMANCE & COACHING DRAWER */}
                {selectedStaffProfile && (
                  <div className={`mt-6 p-6 rounded-3xl border-2 border-amber-400/50 shadow-2xl animate-in fade-in duration-200 ${
                    theme === 'dark' ? 'bg-[#060b18]' : 'bg-amber-50/40'
                  }`}>
                    <div className="flex flex-wrap items-start justify-between gap-4 pb-4 mb-4 border-b border-white/10">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black px-2.5 py-0.5 rounded-md bg-amber-400 text-slate-950">
                            รายงานวิเคราะห์พนักงาน 360°
                          </span>
                          <span className="text-xs font-mono text-slate-400">{selectedStaffProfile.id} • {selectedStaffProfile.role}</span>
                        </div>
                        <h4 className="text-xl font-black text-white mt-1">
                          {selectedStaffProfile.name} — {selectedStaffProfile.branchName}
                        </h4>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toast.success(`🎖️ บันทึกโบนัสค่าคอมมิชชัน Up-selling พิเศษให้ ${selectedStaffProfile.name} เรียบร้อย!`)}
                          className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-4 py-2 rounded-xl text-xs transition cursor-pointer"
                        >
                          🎖️ อนุมัติคอมมิชชัน/ส่งคำชม
                        </button>
                        <button
                          onClick={() => setSelectedStaffProfile(null)}
                          className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 text-xs font-bold transition cursor-pointer"
                        >
                          ✕ ปิดหน้าต่าง
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
                      <div className="p-4 rounded-2xl bg-black/30 border border-white/10">
                        <span className="text-slate-400 font-bold">ประสิทธิภาพตะกร้าสินค้า (Basket Metric)</span>
                        <p className="text-lg font-black text-amber-400 mt-1">฿ {selectedStaffProfile.basketSize.toLocaleString()} / บิล</p>
                        <p className="text-slate-300 mt-1">จำนวนชิ้นเฉลี่ย: {selectedStaffProfile.itemsPerBasket} ชิ้น/บิล จากทั้งหมด {selectedStaffProfile.billsCount} บิล</p>
                      </div>
                      <div className="p-4 rounded-2xl bg-black/30 border border-white/10">
                        <span className="text-slate-400 font-bold">ผลงานการเชียร์ขายพ่วง (Up-selling)</span>
                        <p className="text-lg font-black text-emerald-400 mt-1">สำเร็จ {selectedStaffProfile.upsellRate}% (+฿ {selectedStaffProfile.upsellRevenue.toLocaleString()})</p>
                        <p className="text-slate-300 mt-1">สินค้าพ่วงยอดฮิต: {selectedStaffProfile.topUpsellItem}</p>
                      </div>
                      <div className="p-4 rounded-2xl bg-amber-400/10 border border-amber-400/30">
                        <span className="text-amber-400 font-black">🤖 คำแนะนำจาก AI สำหรับผู้จัดการสาขา</span>
                        <p className="text-slate-200 mt-1.5 leading-relaxed">{selectedStaffProfile.aiCoaching}</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* 4. AUDIT & FRAUD DETECTION LOGS (VOID, REFUND, NO-SALE CASH DRAWER) */}
              <div className={`p-7 rounded-3xl border shadow-2xl backdrop-blur-xl ${
                theme === 'dark' ? 'bg-[#0b1020]/90 border-rose-500/30' : 'bg-white border-rose-200'
              }`}>
                <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4 mb-6">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
                      <span className="text-[11px] font-black uppercase tracking-wider text-rose-400">
                        Real-time POS Security & Loss Prevention
                      </span>
                    </div>
                    <h3 className={`text-lg font-black mt-1 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                      🛡️ 2. บันทึกตรวจสอบความผิดปกติและป้องกันการทุจริต (Audit & Fraud Detection Log)
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      บันทึกทุกครั้งที่มีการกดยกเลิกบิล (Void), การคืนเงิน (Refund) หรือการสั่งเปิดลิ้นชักเก็บเงินโดยไม่มีการขาย (No-Sale Drawer Open) พร้อมเชื่อมเวลา CCTV
                    </p>
                  </div>

                  {/* Filter Buttons */}
                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: 'all', label: 'ทั้งหมด (5)' },
                      { id: 'high_risk', label: '🚨 ความเสี่ยงสูง (3)' },
                      { id: 'void', label: '🚫 ยกเลิกบิล Void (2)' },
                      { id: 'refund', label: '💸 คืนเงิน Refund (1)' },
                      { id: 'drawer', label: '🔓 เปิดลิ้นชักเก็บเงิน (2)' }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setSelectedAuditType(tab.id)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
                          selectedAuditType === tab.id
                            ? 'bg-rose-500/20 border-rose-400 text-rose-300 shadow-lg shadow-rose-500/10'
                            : 'bg-black/20 border-white/10 text-slate-400 hover:text-white'
                        }`}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3.5">
                  {filteredAuditLogs.map((log) => (
                    <div
                      key={log.logId}
                      className={`p-5 rounded-2xl border transition flex flex-col lg:flex-row justify-between lg:items-center gap-4 ${
                        log.severity === 'critical'
                          ? 'bg-rose-950/25 border-rose-500/50'
                          : log.severity === 'high'
                          ? 'bg-amber-950/20 border-amber-500/40'
                          : 'bg-black/25 border-white/10'
                      }`}
                    >
                      <div className="space-y-1.5 max-w-3xl">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-md ${
                            log.severity === 'critical' ? 'bg-rose-500 text-white' :
                            log.severity === 'high' ? 'bg-amber-400 text-slate-950' :
                            'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                          }`}>
                            {log.severity === 'critical' ? 'CRITICAL FRAUD ALERT' : log.severity === 'high' ? 'HIGH RISK WARNING' : 'VERIFIED NORMAL'}
                          </span>
                          <span className="text-xs font-bold text-white">{log.eventLabel}</span>
                          <span className="text-xs font-mono text-slate-400">• {log.timestamp}</span>
                          <span className="text-xs font-mono text-amber-400">({log.billNo})</span>
                        </div>

                        <p className="text-xs text-slate-200">
                          พนักงาน: <strong>{log.staffName}</strong> ({log.branchName}) • ช่องทาง: <span className="text-sky-400 font-semibold">{log.paymentMethod}</span> • เหตุผลที่ระบุ: <em>"{log.reasonStated}"</em>
                        </p>

                        <p className={`text-xs font-medium ${
                          log.severity === 'normal' ? 'text-emerald-400' : 'text-rose-300'
                        }`}>
                          🤖 <strong>AI Audit วิเคราะห์:</strong> {log.aiAnomalyDetail}
                        </p>
                      </div>

                      <div className="flex flex-wrap lg:flex-col items-end justify-between gap-2 flex-shrink-0">
                        <div className="text-right">
                          <span className="text-[10px] text-slate-400 block">มูลค่ารายการ</span>
                          <span className={`text-lg font-black font-mono ${
                            log.severity === 'critical' || log.severity === 'high' ? 'text-rose-400' : 'text-slate-200'
                          }`}>
                            {log.amount > 0 ? `฿ ${log.amount.toLocaleString()}` : 'เปิดลิ้นชัก (No Sale)'}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => toast.success(`📹 เปิดภาพกล้องวงจรปิด ${log.cctvTimestamp} ของ ${log.branchName} สำเร็จ!`)}
                            className="px-3 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 border border-white/15 text-[11px] font-bold transition cursor-pointer"
                          >
                            📹 ดูกล้อง ({log.cctvTimestamp})
                          </button>
                          {(log.severity === 'critical' || log.severity === 'high') && (
                            <button
                              onClick={() => toast.error(`🚨 ส่งเรื่องตรวจสอบทุจริตหมายเลข ${log.logId} (${log.staffName}) ไปยังผู้จัดการเขตเรียบร้อยแล้ว!`)}
                              className="px-3 py-1.5 rounded-xl bg-rose-500 hover:bg-rose-400 text-white text-[11px] font-black transition cursor-pointer"
                            >
                              🚨 ตั้งกรรมการสอบ/ระงับสิทธิ์
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

"""

assert target_inventory_marker in code, "target_inventory_marker not found"
code = code.replace(target_inventory_marker, staff_pos_tab_jsx + target_inventory_marker, 1)

with open('/Users/pmsp63/Desktop/insightflow-app/src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(code)

print("Successfully patched Staff & POS Performance page into src/App.jsx")

