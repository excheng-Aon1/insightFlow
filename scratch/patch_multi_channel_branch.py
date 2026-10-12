with open('/Users/pmsp63/Desktop/insightflow-app/src/App.jsx', 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Add Multi-Channel & Branch Comparison + Quick Wins (Automated LINE Notify Scheduler & Anomaly Alerts) states and datasets
old_page_upload_state = """  const [pageUploadedFiles, setPageUploadedFiles] = useState({
    overview: { filename: 'Sales_Overview_2026.csv', rows: 1420, updatedAt: 'พร้อมใช้งาน' },
    customers: { filename: 'Customer_RFM_Database.csv', rows: 1435, updatedAt: 'พร้อมใช้งาน' },
    staff_pos: { filename: 'POS_Staff_Audit_Log.csv', rows: 1232, updatedAt: 'พร้อมใช้งาน' },
    inventory: { filename: 'Stock_SKU_Master.csv', rows: 1248, updatedAt: 'พร้อมใช้งาน' },
    insights: { filename: 'Business_AI_Knowledge.csv', rows: 1435, updatedAt: 'พร้อมใช้งาน' },
    database: { filename: 'SQLite_Transactions.csv', rows: 3842, updatedAt: 'พร้อมใช้งาน' }
  });"""

new_page_upload_and_branch_state = """  const [pageUploadedFiles, setPageUploadedFiles] = useState({
    overview: { filename: 'Sales_Overview_2026.csv', rows: 1420, updatedAt: 'พร้อมใช้งาน' },
    customers: { filename: 'Customer_RFM_Database.csv', rows: 1435, updatedAt: 'พร้อมใช้งาน' },
    staff_pos: { filename: 'POS_Staff_Audit_Log.csv', rows: 1232, updatedAt: 'พร้อมใช้งาน' },
    multi_channel: { filename: 'MultiChannel_Branch_Comparison.csv', rows: 1890, updatedAt: 'พร้อมใช้งาน' },
    inventory: { filename: 'Stock_SKU_Master.csv', rows: 1248, updatedAt: 'พร้อมใช้งาน' },
    insights: { filename: 'Business_AI_Knowledge.csv', rows: 1435, updatedAt: 'พร้อมใช้งาน' },
    database: { filename: 'SQLite_Transactions.csv', rows: 3842, updatedAt: 'พร้อมใช้งาน' }
  });

  // --- ระบบเปรียบเทียบสาขา & ช่องทางการขาย (Multi-Channel & Branch Comparison + Quick Wins) ---
  const [channelTypeFilter, setChannelTypeFilter] = useState('all'); // 'all' | 'offline' | 'online'
  const [branchSortBy, setBranchSortBy] = useState('revenue'); // 'revenue' | 'turnover' | 'margin'
  const [lineNotifyEnabled, setLineNotifyEnabled] = useState(true);
  const [lineScheduleTime, setLineScheduleTime] = useState('22:00');
  const [lineRecipientGroup, setLineRecipientGroup] = useState('กลุ่มผู้บริหาร & เจ้าของร้าน (VIP Line OA)');
  const [dismissedAnomalies, setDismissedAnomalies] = useState([]);

  const multiChannelsData = [
    {
      id: 'CH-OFFLINE',
      name: '🏪 หน้าร้านจริงทั้งหมด (Offline Storefront 4 สาขา)',
      type: 'offline',
      revenue: 2480000,
      orders: 892,
      costAndFees: 372000,
      feeDesc: 'ค่าเช่าพื้นที่ + พนักงานแคชเชียร์ (15%)',
      grossMarginPct: 46.8,
      netProfit: 1160640,
      growth: '+14.2%',
      badge: '💎 กำไรต่อชิ้นสูงสุด (High Margin)',
      aiAdvice: 'หน้าร้านทำมาร์จิ้นได้สูงที่สุดเพราะไม่โดนหักค่า GP แพลตฟอร์ม แนะนำให้ทำแคมเปญ "รับสินค้าที่หน้าร้าน (Click & Collect)" เพื่อดึงคนมาซื้อพ่วง'
    },
    {
      id: 'CH-TIKTOK',
      name: '🎵 TikTok Shop & Live Commerce',
      type: 'online',
      revenue: 1120000,
      orders: 1450,
      costAndFees: 235200,
      feeDesc: 'ค่า GP แพลตฟอร์ม + ค่านายหน้า Affiliate (21%)',
      grossMarginPct: 34.2,
      netProfit: 383040,
      growth: '+38.5%',
      badge: '🔥 ยอดขายโตเร็วอันดับ 1',
      aiAdvice: 'ยอดคำสั่งซื้อพุ่งเร็วมาก แต่โดนหักค่า Affiliate และคูปองส่งฟรี 21% แนะนำให้จัดเซ็ตสินค้าราคา ฿1,500+ เพื่อคุ้มค่าธรรมเนียมต่อออเดอร์'
    },
    {
      id: 'CH-SHOPEE',
      name: '🧡 Shopee Mall Official',
      type: 'online',
      revenue: 685000,
      orders: 920,
      costAndFees: 157550,
      feeDesc: 'ค่าธรรมเนียม GP + แคมเปญโค้ดส่วนลด (23%)',
      grossMarginPct: 31.0,
      netProfit: 212350,
      growth: '+9.4%',
      badge: '📦 ระบายสต็อกหมุนเวียนไว',
      aiAdvice: 'เหมาะสำหรับใช้ระบายสินค้าค้างสต็อก (Dead Stock) ช่วงโปรวันเลขเบิ้ล (10.10 / 11.11) แต่ควรแนบการ์ดเชิญแอด LINE ร้านเพื่อดึงกลับมาซื้อตรง'
    },
    {
      id: 'CH-LINE',
      name: '💬 LINE Official Account & เว็บไซต์ร้านตรง (Direct)',
      type: 'online',
      revenue: 544000,
      orders: 310,
      costAndFees: 27200,
      feeDesc: 'ค่าบรอดแคสต์ข้อความ + ค่าธรรมเนียมบัตร (5%)',
      grossMarginPct: 52.4,
      netProfit: 285056,
      growth: '+26.0%',
      badge: '🏆 กำไรสุทธิสูงสุด (Zero GP)',
      aiAdvice: 'ช่องทางทองคำ! เสียค่าใช้จ่ายเพียง 5% ทำให้เหลือกำไรสุทธิสูงสุด (52.4%) ควรย้ายลูกค้าประจำจาก Shopee/TikTok มาสั่งซื้อซ้ำทาง LINE OA'
    }
  ];

  const branchRankingData = [
    {
      rank: 1,
      branchId: 'BR-SIAM',
      branchName: 'สาขาสยามพารากอน (Flagship Store)',
      manager: 'คุณภัทรพล (ต้อม)',
      revenue: 985000,
      netMarginPct: 48.5,
      inventoryTurnover: 8.4,
      turnoverDays: 11,
      deadStockValue: 14500,
      topCategory: 'เซรั่มพรีเมียม & อุปกรณ์ Apple Pro',
      status: 'excellent',
      statusText: '🏆 อันดับ 1 ยอดขาย & สินค้าหมุนไวที่สุด'
    },
    {
      rank: 2,
      branchId: 'BR-SUKHUMVIT',
      branchName: 'สาขาสุขุมวิท-ทองหล่อ (Concept Store)',
      manager: 'คุณชนากานต์ (มิ้นท์)',
      revenue: 792000,
      netMarginPct: 47.2,
      inventoryTurnover: 7.1,
      turnoverDays: 14,
      deadStockValue: 22000,
      topCategory: 'สมาร์ทวอทช์ & แก็ดเจ็ตสุขภาพ',
      status: 'excellent',
      statusText: '💎 ยอดต่อบิลสูงสุด • สต็อกหมุนเวียนดีมาก'
    },
    {
      rank: 3,
      branchId: 'BR-LADPRAO',
      branchName: 'สาขาเซ็นทรัลลาดพร้าว',
      manager: 'คุณธนดล (แบงค์)',
      revenue: 418000,
      netMarginPct: 39.4,
      inventoryTurnover: 4.2,
      turnoverDays: 26,
      deadStockValue: 68500,
      topCategory: 'เคสกันกระแทก & ฟิล์มกระจก',
      status: 'warning',
      statusText: '⚠️ สินค้าหมุนช้าลง & พบการกด Void บิลบ่อย'
    },
    {
      rank: 4,
      branchId: 'BR-CHIANGMAI',
      branchName: 'สาขาเชียงใหม่ นิมมาน',
      manager: 'คุณอนุชา (อาร์ม)',
      revenue: 285000,
      netMarginPct: 36.8,
      inventoryTurnover: 3.1,
      turnoverDays: 35,
      deadStockValue: 94000,
      topCategory: 'ลำโพงพกพา & อุปกรณ์เสริมทั่วไป',
      status: 'risk',
      statusText: '🚨 สต็อกค้างนาน 35 วัน (ควรโอนสินค้าไปสาขาสยาม)'
    }
  ];

  const anomalyAlertsList = [
    {
      id: 'ANM-01',
      severity: 'critical',
      badge: '🚨 ความผิดปกติระดับวิกฤต (วันนี้ 15:40 น.)',
      title: 'ยอดขายหมวดอาหารและเครื่องดื่มสุขภาพตกฮวบ -40% ในวันนี้ (สาขาลาดพร้าว)',
      detail: 'ระบบ AI ตรวจพบว่ายอดขายหมวดอาหารเสริมและเครื่องดื่มสุขภาพลดลงผิดปกติ 40% เมื่อเทียบกับค่าเฉลี่ยวันเดียวกันในรอบ 4 สัปดาห์ สาเหตุเกิดจากสินค้าตัวหลักหมดชั้นวางแต่ยังมีค้างในห้องเก็บของหลังร้าน',
      actionLabel: '📲 แจ้งผู้จัดการสาขาเติมของขึ้นชั้นวางทันที',
      actionToast: '📲 ส่งข้อความด่วนแจ้งผู้จัดการสาขาลาดพร้าวให้นำสินค้าจากห้องเก็บของขึ้นชั้นวางเรียบร้อยแล้ว!'
    },
    {
      id: 'ANM-02',
      severity: 'critical',
      badge: '🛡️ เตือนภัยทุจริตแคชเชียร์ (เมื่อคืน 21:42 น.)',
      title: 'ตรวจพบการกดยกเลิกบิล (Void) ติดต่อกันผิดปกติ 4 ครั้งซ้อน หลังรับเงินสด',
      detail: 'เครื่องคิดเงิน POS #04 (สาขาเซ็นทรัลลาดพร้าว) มีการกดพิมพ์ใบเสร็จชั่วคราวแล้วกดยกเลิกบิล (Void) ติดต่อกันรวมมูลค่า ฿12,450 พร้อมเปิดลิ้นชักเก็บเงินโดยไม่มีการขาย 19 ครั้ง',
      actionLabel: '🔒 ล็อกสิทธิ์การกด Void & เปิดดูกล้อง CCTV',
      actionToast: '🔒 ล็อกสิทธิ์การกด Void ของเครื่อง POS #04 และดึงคลิปกล้องวงจรปิดส่งให้เจ้าของร้านเรียบร้อยแล้ว!'
    },
    {
      id: 'ANM-03',
      severity: 'warning',
      badge: '⚠️ เตือนภัยต้นทุนโฆษณา & ค่า GP (วันนี้ 13:15 น.)',
      title: 'ค่าโฆษณา Facebook Ads พุ่งสูงขึ้น +24% แต่ยอดสั่งซื้อไม่เพิ่มตาม',
      detail: 'แคมเปญโฆษณาสินค้ากลุ่มกันแดดล็อตเก่ามีต้นทุนต่อคลิกแพงขึ้นผิดปกติ ทำให้อัตรากำไรสุทธิหดตัวเหลือเพียง 14% แนะนำให้พักแคมเปญนี้แล้วโยกงบไปที่ LINE OA และ TikTok Live แทน',
      actionLabel: '⚡ สั่งพักแคมเปญโฆษณาที่ขาดทุนทันที',
      actionToast: '⚡ สั่งพักแคมเปญโฆษณาที่ต้นทุนแพงเกินเกณฑ์ และโยกงบไปช่องทางทำกำไรสูงเรียบร้อยแล้ว!'
    }
  ];

  const exportTaxAndStockExcelCsv = (reportType) => {
    if (reportType === 'tax') {
      const headers = ['ลำดับ,เลขที่ใบกำกับภาษี,วันที่,ช่องทางการขาย/สาขา,มูลค่าสินค้าก่อนภาษี (บาท),ภาษีมูลค่าเพิ่ม VAT 7% (บาท),ยอดสุทธิรวมภาษี (บาท),สถานะ'];
      const rows = [
        '1,"TAX-202610-001","11/10/2026","หน้าร้าน สาขาสยามพารากอน",920560.75,64439.25,985000.00,"ยื่นภาษีปกติ"',
        '2,"TAX-202610-002","11/10/2026","หน้าร้าน สาขาสุขุมวิท-ทองหล่อ",740186.92,51813.08,792000.00,"ยื่นภาษีปกติ"',
        '3,"TAX-202610-003","11/10/2026","TikTok Shop Official",1046728.97,73271.03,1120000.00,"ยื่นภาษีปกติ"',
        '4,"TAX-202610-004","11/10/2026","Shopee Mall Official",640186.92,44813.08,685000.00,"ยื่นภาษีปกติ"',
        '5,"TAX-202610-005","11/10/2026","LINE Official Account (Direct)",508411.21,35588.79,544000.00,"ยื่นภาษีปกติ"'
      ];
      const csvContent = "\\uFEFF" + [headers, ...rows].join("\\n");
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', 'รายงานภาษีขาย_VAT7_InsightFlow_Excel.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success('📥 ดาวน์โหลดไฟล์ "รายงานภาษีขาย (VAT 7%)" รูปแบบ Excel (.csv) สำเร็จ!');
    } else {
      const headers = ['อันดับ,รหัสสาขา,ชื่อสาขา,ผู้จัดการสาขา,ยอดขายรวม (บาท),อัตรากำไรสุทธิ (%),อัตราหมุนเวียนสินค้า (รอบ/เดือน),ระยะเวลาขายออกเฉลี่ย (วัน),มูลค่าสต็อกค้าง (บาท)'];
      const rows = branchRankingData.map(b =>
        `${b.rank},"${b.branchId}","${b.branchName}","${b.manager}",${b.revenue},${b.netMarginPct},${b.inventoryTurnover},${b.turnoverDays},${b.deadStockValue}`
      );
      const csvContent = "\\uFEFF" + [headers, ...rows].join("\\n");
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', 'รายงานสต็อกและเปรียบเทียบสาขา_Excel.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success('📥 ดาวน์โหลดไฟล์ "รายงานสต็อก & จัดอันดับสาขา" รูปแบบ Excel (.csv) สำเร็จ!');
    }
  };"""

assert old_page_upload_state in code, "old_page_upload_state not found"
code = code.replace(old_page_upload_state, new_page_upload_and_branch_state, 1)

# 2. Add 'multi_channel' to Sidebar Navigation right after 'staff_pos'
old_sidebar_pos_item = """              { 
                id: 'staff_pos', 
                label: '3. พนักงาน & จุดขาย', 
                subLabel: 'ยอดต่อบิล & จับทุจริตบิล',
                badge: 'POS',
                iconBg: 'from-sky-400 to-blue-600 text-white shadow-sky-500/30',
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ) 
              },"""

new_sidebar_pos_and_channel = """              { 
                id: 'staff_pos', 
                label: '3. พนักงาน & จุดขาย', 
                subLabel: 'ยอดต่อบิล & จับทุจริตบิล',
                badge: 'POS',
                iconBg: 'from-sky-400 to-blue-600 text-white shadow-sky-500/30',
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ) 
              },
              { 
                id: 'multi_channel', 
                label: '4. เทียบสาขา & ช่องทางขาย', 
                subLabel: 'หน้าร้าน vs ออนไลน์ & แจ้งเตือน',
                badge: 'ฮิต',
                iconBg: 'from-orange-400 to-amber-600 text-slate-950 shadow-orange-500/30',
                icon: (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                ) 
              },"""

assert old_sidebar_pos_item in code, "old_sidebar_pos_item not found"
code = code.replace(old_sidebar_pos_item, new_sidebar_pos_and_channel, 1)

# 3. Update Header title & plain-Thai guidance for 'multi_channel'
old_header_pos = "{activeTab === 'staff_pos' && '🛡️ หน้า 3: วิเคราะห์พนักงานขาย & ตรวจสอบเครื่องคิดเงิน (POS)'}"
new_header_pos = """{activeTab === 'staff_pos' && '🛡️ หน้า 3: วิเคราะห์พนักงานขาย & ตรวจสอบเครื่องคิดเงิน (POS)'}
                {activeTab === 'multi_channel' && '🏪 หน้า 4: เปรียบเทียบสาขา & ช่องทางขาย (หน้าร้าน vs ออนไลน์)'}"""
assert old_header_pos in code, "old_header_pos not found"
code = code.replace(old_header_pos, new_header_pos, 1)

old_guide_pos = "{activeTab === 'staff_pos' && 'คำแนะนำ: ดูว่าพนักงานคนไหนขายเก่งที่สุด และตรวจเช็คการกดยกเลิกบิล (Void) หรือเปิดลิ้นชักเก็บเงินผิดปกติ'}"
new_guide_pos = """{activeTab === 'staff_pos' && 'คำแนะนำ: ดูว่าพนักงานคนไหนขายเก่งที่สุด และตรวจเช็คการกดยกเลิกบิล (Void) หรือเปิดลิ้นชักเก็บเงินผิดปกติ'}
                {activeTab === 'multi_channel' && 'คำแนะนำ: เปรียบเทียบกำไรระหว่างหน้าร้านจริงกับออนไลน์ ดูอันดับสาขาที่ขายดี และตั้งเวลาส่งสรุปยอดเข้า LINE อัตโนมัติทุก 22:00 น.'}"""
assert old_guide_pos in code, "old_guide_pos not found"
code = code.replace(old_guide_pos, new_guide_pos, 1)

# 4. Add 'multi_channel' to Quick Navigation Cards at top of <main> and include 'multi_channel' in Per-Page Upload Banner
old_quick_nav_grid = '<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">'
new_quick_nav_grid = '<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">'
assert old_quick_nav_grid in code, "old_quick_nav_grid not found"
code = code.replace(old_quick_nav_grid, new_quick_nav_grid, 1)

old_quick_nav_pos = """                {
                  id: 'staff_pos',
                  title: '3. พนักงาน & จุดขาย',
                  desc: 'ยอดขาย & จับทุจริตบิล',
                  gradient: 'from-sky-400 to-blue-600',
                  icon: (
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2.3" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  )
                },"""

new_quick_nav_pos_and_channel = """                {
                  id: 'staff_pos',
                  title: '3. พนักงาน & จุดขาย',
                  desc: 'ยอดขาย & จับทุจริตบิล',
                  gradient: 'from-sky-400 to-blue-600',
                  icon: (
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2.3" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  )
                },
                {
                  id: 'multi_channel',
                  title: '4. เทียบสาขา/ออนไลน์',
                  desc: 'กำไร & ส่ง LINE 22:00',
                  gradient: 'from-orange-400 to-amber-600',
                  icon: (
                    <svg className="w-6 h-6 text-slate-950" fill="none" stroke="currentColor" strokeWidth="2.3" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  )
                },"""

assert old_quick_nav_pos in code, "old_quick_nav_pos not found"
code = code.replace(old_quick_nav_pos, new_quick_nav_pos_and_channel, 1)

code = code.replace(
    "{['overview', 'customers', 'staff_pos', 'inventory', 'insights', 'database'].includes(activeTab) && (",
    "{['overview', 'customers', 'staff_pos', 'multi_channel', 'inventory', 'insights', 'database'].includes(activeTab) && ("
)

old_upload_h3 = "{activeTab === 'staff_pos' && 'อัปโหลดไฟล์ยอดขายพนักงาน & บันทึกเครื่องคิดเงิน POS ของคุณ (.csv หรือ .xlsx)'}"
new_upload_h3 = """{activeTab === 'staff_pos' && 'อัปโหลดไฟล์ยอดขายพนักงาน & บันทึกเครื่องคิดเงิน POS ของคุณ (.csv หรือ .xlsx)'}
                      {activeTab === 'multi_channel' && 'อัปโหลดไฟล์ยอดขายแยกสาขา และข้อมูลช่องทางออนไลน์ Shopee / TikTok / LINE (.csv หรือ .xlsx)'}"""
assert old_upload_h3 in code, "old_upload_h3 not found"
code = code.replace(old_upload_h3, new_upload_h3, 1)

# 5. Add the complete Multi-Channel & Branch Comparison + Quick Wins tab right before TAB: INVENTORY
target_inv_marker = "          {/* TAB: INVENTORY */}"
multi_channel_tab_jsx = """          {/* TAB: เปรียบเทียบสาขา / ช่องทางการขาย + QUICK WINS (MULTI-CHANNEL & BRANCH COMPARISON) */}
          {activeTab === 'multi_channel' && (
            <div className="space-y-8 animate-in fade-in duration-300">

              {/* 1. HERO BANNER: MULTI-CHANNEL & BRANCH COMPARISON */}
              <div className={`p-7 sm:p-8 rounded-3xl border relative overflow-hidden shadow-2xl ${
                theme === 'dark'
                  ? 'bg-gradient-to-r from-orange-500/20 via-[#0b1228] to-emerald-500/15 border-amber-400/40'
                  : 'bg-gradient-to-r from-amber-100/80 via-white to-emerald-50 border-amber-300'
              }`}>
                <div className="relative z-10 flex flex-col lg:flex-row justify-between lg:items-center gap-6">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-orange-400 to-amber-600 flex items-center justify-center text-slate-950 shadow-xl shadow-orange-500/30 flex-shrink-0">
                      <svg className="w-9 h-9 text-slate-950" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                      </svg>
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-bold uppercase px-3 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40">
                          Omni-Channel & Branch Intelligence
                        </span>
                        <span className="text-xs font-bold uppercase px-3 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40">
                          💬 LINE Notify 22:00 น. เปิดทำงานอยู่
                        </span>
                      </div>
                      <h2 className={`text-2xl font-black mt-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                        เปรียบเทียบสาขาหน้าร้าน vs ช่องทางออนไลน์ (Multi-Channel & Branch Comparison)
                      </h2>
                      <p className="text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
                        ช่วยให้เจ้าของร้านเห็นชัดเจนว่า <strong>ขายหน้าร้านจริง (Offline)</strong> หรือ <strong>ขายออนไลน์ (TikTok, Shopee, LINE OA)</strong> ช่องทางไหนหักค่าใช้จ่ายแล้วเหลือกำไรสุทธิมากกว่ากัน พร้อมจัดอันดับสาขาที่หมุนเวียนสต็อกไวที่สุด และระบบแจ้งเตือนความผิดปกติอัตโนมัติ
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 self-start lg:self-center">
                    <button
                      onClick={() => exportTaxAndStockExcelCsv('tax')}
                      className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black px-5 py-3.5 rounded-2xl text-xs shadow-xl shadow-emerald-500/20 transition flex items-center gap-2 cursor-pointer"
                    >
                      <span>📊 ส่งออกรายงานภาษีขาย (Excel .csv)</span>
                    </button>
                    <button
                      onClick={() => exportTaxAndStockExcelCsv('stock')}
                      className="bg-gradient-to-r from-amber-400 to-amber-300 hover:brightness-105 text-slate-950 font-black px-5 py-3.5 rounded-2xl text-xs shadow-xl shadow-amber-400/20 transition flex items-center gap-2 cursor-pointer"
                    >
                      <span>📦 ส่งออกรายงานสต็อก & อันดับสาขา (.csv)</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* 2. QUICK WINS SECTION: ALERTS & ANOMALY DETECTION + AUTOMATED LINE NOTIFY SCHEDULER */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">

                {/* 2.1 ALERTS & ANOMALY DETECTION (7 COLS) */}
                <div className={`lg:col-span-7 p-6 sm:p-7 rounded-3xl border-2 shadow-2xl flex flex-col justify-between ${
                  theme === 'dark' ? 'bg-[#091024]/95 border-rose-500/40' : 'bg-white border-rose-300'
                }`}>
                  <div>
                    <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-5 border-b border-white/10">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-rose-500 to-red-600 flex items-center justify-center text-white text-xl shadow-lg shadow-rose-500/30 flex-shrink-0">
                          🚨
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></span>
                            <span className="text-xs font-bold uppercase text-rose-400">
                              Real-time Anomaly Detection (Quick Win #1)
                            </span>
                          </div>
                          <h3 className={`text-lg font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                            กล่องแจ้งเตือนความผิดปกติเร่งด่วนประจำวัน
                          </h3>
                        </div>
                      </div>
                      {dismissedAnomalies.length > 0 && (
                        <button
                          onClick={() => setDismissedAnomalies([])}
                          className="text-xs font-bold text-amber-300 hover:underline cursor-pointer"
                        >
                          🔄 แสดงรายการแจ้งเตือนทั้งหมด ({anomalyAlertsList.length})
                        </button>
                      )}
                    </div>

                    <div className="space-y-4">
                      {anomalyAlertsList
                        .filter(item => !dismissedAnomalies.includes(item.id))
                        .map((alert) => (
                          <div
                            key={alert.id}
                            className={`p-5 rounded-2xl border transition ${
                              alert.severity === 'critical'
                                ? 'bg-rose-950/30 border-rose-500/50'
                                : 'bg-amber-950/25 border-amber-400/40'
                            }`}
                          >
                            <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
                              <span className={`text-xs font-bold px-3 py-0.5 rounded-full ${
                                alert.severity === 'critical'
                                  ? 'bg-rose-500 text-white'
                                  : 'bg-amber-400 text-slate-950'
                              }`}>
                                {alert.badge}
                              </span>
                              <button
                                onClick={() => {
                                  setDismissedAnomalies(prev => [...prev, alert.id]);
                                  toast.success('✓ รับทราบและซ่อนรายการแจ้งเตือนนี้แล้ว');
                                }}
                                className="text-xs text-slate-300 hover:text-white cursor-pointer"
                              >
                                ✓ รับทราบแล้ว
                              </button>
                            </div>

                            <h4 className="text-base font-black text-white mt-2">
                              {alert.title}
                            </h4>
                            <p className="text-xs text-slate-200 mt-1 leading-relaxed">
                              {alert.detail}
                            </p>

                            <div className="mt-3.5 pt-3 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
                              <span className="text-xs text-amber-300 font-semibold">
                                💡 แนะนำให้กดปุ่มด้านขวาเพื่อสั่งการแก้ไขทันที:
                              </span>
                              <button
                                onClick={() => toast.success(alert.actionToast)}
                                className={`px-4 py-2 rounded-xl text-xs font-black transition shadow-md cursor-pointer ${
                                  alert.severity === 'critical'
                                    ? 'bg-rose-500 hover:bg-rose-400 text-white'
                                    : 'bg-amber-400 hover:bg-amber-300 text-slate-950'
                                }`}
                              >
                                {alert.actionLabel}
                              </button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>

                {/* 2.2 AUTOMATED EXPORT & LINE NOTIFY SCHEDULER (5 COLS) */}
                <div className={`lg:col-span-5 p-6 sm:p-7 rounded-3xl border-2 shadow-2xl flex flex-col justify-between ${
                  theme === 'dark' ? 'bg-[#091024]/95 border-emerald-500/40' : 'bg-white border-emerald-300'
                }`}>
                  <div className="space-y-5">
                    <div className="flex items-start gap-3.5 pb-4 border-b border-white/10">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-slate-950 text-xl font-black shadow-lg shadow-emerald-500/30 flex-shrink-0">
                        💬
                      </div>
                      <div>
                        <span className="text-xs font-bold uppercase text-emerald-400">
                          Automated Report & LINE Notify (Quick Win #2)
                        </span>
                        <h3 className={`text-lg font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                          ตั้งเวลาส่งสรุปยอดขายเข้า LINE อัตโนมัติ & ส่งออกรายงานภาษี
                        </h3>
                        <p className="text-xs text-slate-300 mt-0.5">
                          ไม่ต้องเปิดคอมพิวเตอร์ดูเองทุกดึก ระบบจะสรุปยอดขาย กำไรสุทธิ และรายการ Void บิลส่งเข้า LINE ให้คุณทุกคืนเวลา 22:00 น.
                        </p>
                      </div>
                    </div>

                    {/* สวิตช์เปิด-ปิดการส่ง LINE อัตโนมัติ */}
                    <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between gap-4">
                      <div>
                        <p className="text-sm font-black text-white">
                          🟢 ส่งสรุปยอดขายรายวันเข้า LINE อัตโนมัติ
                        </p>
                        <p className="text-xs text-emerald-300 mt-0.5">
                          สถานะปัจจุบัน: {lineNotifyEnabled ? `เปิดใช้งาน (ส่งทุกวันเวลา ${lineScheduleTime} น.)` : 'ปิดอยู่'}
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          setLineNotifyEnabled(!lineNotifyEnabled);
                          toast.success(!lineNotifyEnabled ? `✅ เปิดระบบส่งสรุปยอดขายเข้า LINE ทุก ${lineScheduleTime} น. แล้ว` : '⏸️ พักการส่ง LINE อัตโนมัติชั่วคราว');
                        }}
                        className={`px-4 py-2.5 rounded-xl text-xs font-black transition cursor-pointer ${
                          lineNotifyEnabled
                            ? 'bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-400/20'
                            : 'bg-white/10 text-slate-300 border border-white/20'
                        }`}
                      >
                        {lineNotifyEnabled ? '✓ เปิดทำงานอยู่' : 'กดเพื่อเปิดใช้งาน'}
                      </button>
                    </div>

                    {/* ตั้งค่าเวลาและกลุ่มรับข้อความ */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-bold text-slate-200 mb-1">
                          ⏰ เวลาส่งสรุปรายวันอัตโนมัติ:
                        </label>
                        <select
                          value={lineScheduleTime}
                          onChange={(e) => {
                            setLineScheduleTime(e.target.value);
                            toast.success(`⏰ ตั้งเวลาส่งสรุปยอดเข้า LINE เป็นทุกวันเวลา ${e.target.value} น. เรียบร้อยแล้ว!`);
                          }}
                          className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-bold focus:outline-none focus:border-amber-400 ${
                            theme === 'dark' ? 'bg-[#050914] border-white/15 text-amber-300' : 'bg-slate-50 border-slate-300 text-slate-900'
                          }`}
                        >
                          <option value="20:00">20:00 น. (หลังปิดร้านกะเย็น)</option>
                          <option value="21:00">21:00 น. (สรุปยอดหัวค่ำ)</option>
                          <option value="22:00">22:00 น. (มาตรฐานปิดยอดรายวัน - แนะนำ)</option>
                          <option value="23:30">23:30 น. (สรุปรอบดึก)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-200 mb-1">
                          📲 กลุ่ม LINE ที่รับรายงาน:
                        </label>
                        <input
                          type="text"
                          value={lineRecipientGroup}
                          onChange={(e) => setLineRecipientGroup(e.target.value)}
                          className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-bold focus:outline-none focus:border-amber-400 ${
                            theme === 'dark' ? 'bg-[#050914] border-white/15 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                          }`}
                        />
                      </div>
                    </div>

                    {/* ตัวอย่างข้อความที่จะส่งเข้า LINE */}
                    <div className="p-4 rounded-2xl bg-black/35 border border-white/10 text-xs space-y-1 text-slate-200">
                      <p className="font-bold text-emerald-400">📋 ตัวอย่างข้อความสรุปที่จะส่งเข้า LINE ({lineScheduleTime} น.):</p>
                      <p>• 💰 ยอดขายรวมทุกสาขาวันนี้: <strong>฿164,800 (+14.2%)</strong></p>
                      <p>• 🏆 สาขาขายดีอันดับ 1: <strong>สยามพารากอน (฿68,400)</strong></p>
                      <p>• 🛡️ แจ้งเตือนแคชเชียร์: <strong>พบ Void บิลผิดปกติที่สาขาลาดพร้าว</strong></p>
                      <p>• 📦 สินค้าต้องสั่งเพิ่มพรุ่งนี้: <strong>กล่อง PKG-009 (เหลือ 12 ชิ้น)</strong></p>
                    </div>
                  </div>

                  {/* ปุ่มกดส่ง LINE ทดสอบทันที & ปุ่ม Export รายงานภาษี/สต็อก */}
                  <div className="pt-4 mt-4 border-t border-white/10 space-y-2.5">
                    <button
                      onClick={() => toast.success(`💬 ส่งข้อความสรุปยอดขายวันนี้เข้า "${lineRecipientGroup}" ทาง LINE Notify สำเร็จทันที!`)}
                      className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-emerald-400 to-teal-500 hover:brightness-105 text-slate-950 font-black text-sm shadow-xl shadow-emerald-500/20 transition flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <span>📲 กดส่งสรุปยอดขายเข้า LINE ทดสอบเดี๋ยวนี้</span>
                    </button>

                    <div className="grid grid-cols-2 gap-2.5">
                      <button
                        onClick={() => exportTaxAndStockExcelCsv('tax')}
                        className="py-2.5 px-3 rounded-xl bg-amber-400/15 hover:bg-amber-400/25 text-amber-300 border border-amber-400/40 text-xs font-bold transition cursor-pointer"
                      >
                        📥 Export ภาษีขาย (Excel)
                      </button>
                      <button
                        onClick={() => exportTaxAndStockExcelCsv('stock')}
                        className="py-2.5 px-3 rounded-xl bg-sky-500/15 hover:bg-sky-500/25 text-sky-300 border border-sky-500/40 text-xs font-bold transition cursor-pointer"
                      >
                        📥 Export สต็อกสาขา (Excel)
                      </button>
                    </div>
                  </div>
                </div>

              </div>

              {/* 3. CHANNEL COMPARISON: OFFLINE STORES VS ONLINE PLATFORMS (MARGIN, SALES & EXPENSES) */}
              <div className={`p-7 rounded-3xl border shadow-2xl backdrop-blur-xl ${
                theme === 'dark' ? 'bg-[#0b1020]/90 border-white/10' : 'bg-white border-slate-200'
              }`}>
                <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4 mb-6">
                  <div>
                    <h3 className={`text-xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                      ⚖️ 1. เปรียบเทียบยอดขาย ค่าใช้จ่าย และอัตรากำไร (Margin): หน้าร้านจริง vs ช่องทางออนไลน์
                    </h3>
                    <p className="text-xs text-slate-300 mt-1">
                      เปรียบเทียบชัดๆ ว่าแต่ละช่องทางมียอดขายเท่าไหร่ โดนหักค่าธรรมเนียมแพลตฟอร์ม (GP) หรือค่าเช่าเท่าไหร่ และเหลือกำไรสุทธิเข้ากระเป๋าจริงกี่บาท
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {[
                      { id: 'all', label: '🌐 ทุกช่องทางทั้งหมด (4)' },
                      { id: 'offline', label: '🏪 เฉพาะหน้าร้านจริง (Offline)' },
                      { id: 'online', label: '📱 เฉพาะออนไลน์ (TikTok / Shopee / LINE)' }
                    ].map((btn) => (
                      <button
                        key={btn.id}
                        onClick={() => setChannelTypeFilter(btn.id)}
                        className={`px-4 py-2.5 rounded-2xl text-xs font-bold border transition cursor-pointer ${
                          channelTypeFilter === btn.id
                            ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-lg'
                            : 'bg-black/25 text-slate-300 border-white/15 hover:text-white'
                        }`}
                      >
                        {btn.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Summary Comparison Bar: Offline vs Online */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                  <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-500/15 to-orange-500/5 border border-amber-400/40 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-amber-300 uppercase">🏪 หน้าร้านจริงรวม 4 สาขา (Offline Storefront)</span>
                      <h4 className="text-2xl font-black text-white mt-1">ยอดขาย ฿ 2,480,000</h4>
                      <p className="text-xs text-slate-200 mt-1">
                        อัตรากำไรขั้นต้นเฉลี่ย: <strong className="text-emerald-400">46.8%</strong> • กำไรสุทธิ: <strong className="text-amber-300">฿ 1,160,640</strong>
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="px-3 py-1 rounded-xl bg-amber-400 text-slate-950 font-black text-xs">สัดส่วน 51.4%</span>
                    </div>
                  </div>

                  <div className="p-5 rounded-2xl bg-gradient-to-r from-sky-500/15 to-indigo-500/5 border border-sky-400/40 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-bold text-sky-300 uppercase">📱 ช่องทางออนไลน์รวม (TikTok + Shopee + LINE OA)</span>
                      <h4 className="text-2xl font-black text-white mt-1">ยอดขาย ฿ 2,349,000</h4>
                      <p className="text-xs text-slate-200 mt-1">
                        อัตรากำไรขั้นต้นเฉลี่ย: <strong className="text-emerald-400">37.5%</strong> • กำไรสุทธิ: <strong className="text-sky-300">฿ 880,446</strong>
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="px-3 py-1 rounded-xl bg-sky-400 text-slate-950 font-black text-xs">สัดส่วน 48.6%</span>
                    </div>
                  </div>
                </div>

                {/* Detailed Channel Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {multiChannelsData
                    .filter(ch => channelTypeFilter === 'all' || ch.type === channelTypeFilter)
                    .map((ch) => (
                      <div
                        key={ch.id}
                        className={`p-6 rounded-3xl border transition flex flex-col justify-between ${
                          theme === 'dark' ? 'bg-[#070c1a] border-white/15 hover:border-amber-400/50' : 'bg-slate-50 border-slate-200'
                        }`}
                      >
                        <div>
                          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                            <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-400/15 text-amber-300 border border-amber-400/30">
                              {ch.badge}
                            </span>
                            <span className="text-xs font-bold text-emerald-400">
                              เติบโต {ch.growth}
                            </span>
                          </div>

                          <h4 className={`text-lg font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                            {ch.name}
                          </h4>

                          <div className="grid grid-cols-3 gap-3 my-4 p-3.5 rounded-2xl bg-black/30 border border-white/10 text-xs">
                            <div>
                              <span className="text-slate-400 block">ยอดขายรวม</span>
                              <span className="text-base font-black text-white font-mono">฿ {ch.revenue.toLocaleString()}</span>
                              <span className="text-[11px] text-slate-400 block">{ch.orders.toLocaleString()} ออเดอร์</span>
                            </div>
                            <div>
                              <span className="text-slate-400 block">ค่าใช้จ่าย/GP</span>
                              <span className="text-base font-black text-rose-400 font-mono">-฿ {ch.costAndFees.toLocaleString()}</span>
                              <span className="text-[11px] text-slate-400 block truncate" title={ch.feeDesc}>{ch.feeDesc}</span>
                            </div>
                            <div>
                              <span className="text-slate-400 block">กำไรสุทธิ (Margin {ch.grossMarginPct}%)</span>
                              <span className="text-base font-black text-emerald-400 font-mono">฿ {ch.netProfit.toLocaleString()}</span>
                              <span className="text-[11px] text-emerald-300 block">เหลือเข้ากระเป๋าจริง</span>
                            </div>
                          </div>
                        </div>

                        <div className="p-3.5 rounded-2xl bg-amber-400/10 border border-amber-400/25 text-xs text-slate-200">
                          <strong className="text-amber-300">🤖 คำแนะนำ AI:</strong> {ch.aiAdvice}
                        </div>
                      </div>
                    ))}
                </div>
              </div>

              {/* 4. STORE RANKING TABLE: REVENUE & INVENTORY TURNOVER */}
              <div className={`p-7 rounded-3xl border shadow-2xl backdrop-blur-xl ${
                theme === 'dark' ? 'bg-[#0b1020]/90 border-white/10' : 'bg-white border-slate-200'
              }`}>
                <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-4 mb-6">
                  <div>
                    <h3 className={`text-xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                      🏆 2. จัดอันดับสาขาตามยอดขาย และอัตราการหมุนเวียนสินค้า (Store Ranking & Inventory Turnover)
                    </h3>
                    <p className="text-xs text-slate-300 mt-1">
                      ดูว่าสาขาไหนขายดีที่สุด หมุนเวียนสต็อกเป็นเงินสดได้ไวที่สุด (Turnover สูง = ของไม่จม) และสาขาไหนมีสินค้าค้างสต็อกที่ต้องโอนย้าย
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold text-slate-300">เรียงอันดับตาม:</span>
                    {[
                      { id: 'revenue', label: '💰 ยอดขายสูงสุด' },
                      { id: 'turnover', label: '🔄 หมุนเวียนสินค้าไวสุด (Turnover)' },
                      { id: 'margin', label: '💹 อัตรากำไรสูงสุด (Margin %)' }
                    ].map((srt) => (
                      <button
                        key={srt.id}
                        onClick={() => setBranchSortBy(srt.id)}
                        className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition cursor-pointer ${
                          branchSortBy === srt.id
                            ? 'bg-emerald-400 text-slate-950 border-emerald-400'
                            : 'bg-black/25 text-slate-300 border-white/15 hover:text-white'
                        }`}
                      >
                        {srt.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className={`border-b text-xs font-black uppercase ${
                        theme === 'dark' ? 'border-white/10 text-slate-300 bg-black/25' : 'border-slate-200 text-slate-700 bg-slate-50'
                      }`}>
                        <th className="py-4 px-4 rounded-tl-xl">อันดับ / สาขา</th>
                        <th className="py-4 px-4">ยอดขายรวม</th>
                        <th className="py-4 px-4">อัตรากำไรสุทธิ (Margin)</th>
                        <th className="py-4 px-4">อัตราหมุนเวียนสินค้า (Inventory Turnover)</th>
                        <th className="py-4 px-4">มูลค่าสต็อกค้าง (Dead Stock)</th>
                        <th className="py-4 px-4">สถานะ & การจัดการสต็อกข้ามสาขา</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/10 text-xs">
                      {[...branchRankingData]
                        .sort((a, b) => {
                          if (branchSortBy === 'turnover') return b.inventoryTurnover - a.inventoryTurnover;
                          if (branchSortBy === 'margin') return b.netMarginPct - a.netMarginPct;
                          return b.revenue - a.revenue;
                        })
                        .map((br, idx) => (
                          <tr key={br.branchId} className="hover:bg-white/[0.04] transition">
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-3">
                                <div className={`w-10 h-10 rounded-2xl font-black text-sm flex items-center justify-center ${
                                  idx === 0 ? 'bg-amber-400 text-slate-950 shadow-lg shadow-amber-400/25' :
                                  idx === 1 ? 'bg-slate-200 text-slate-950' :
                                  idx === 2 ? 'bg-amber-700 text-white' : 'bg-white/10 text-slate-300'
                                }`}>
                                  #{idx + 1}
                                </div>
                                <div>
                                  <p className={`text-sm font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                                    {br.branchName}
                                  </p>
                                  <p className="text-xs text-slate-300">
                                    ผู้จัดการ: {br.manager} • ขายดี: {br.topCategory}
                                  </p>
                                </div>
                              </div>
                            </td>

                            <td className="py-4 px-4">
                              <span className="text-base font-black text-amber-400 font-mono">
                                ฿ {br.revenue.toLocaleString()}
                              </span>
                            </td>

                            <td className="py-4 px-4">
                              <span className="text-sm font-black text-emerald-400 font-mono">
                                {br.netMarginPct}%
                              </span>
                            </td>

                            <td className="py-4 px-4">
                              <div className="flex items-center gap-2">
                                <span className={`text-sm font-black font-mono ${
                                  br.inventoryTurnover >= 7 ? 'text-emerald-400' : br.inventoryTurnover >= 4 ? 'text-amber-300' : 'text-rose-400'
                                }`}>
                                  {br.inventoryTurnover} รอบ/เดือน
                                </span>
                                <span className="text-xs text-slate-300">
                                  (ขายออกใน {br.turnoverDays} วัน)
                                </span>
                              </div>
                              <div className="w-40 h-2 bg-white/10 rounded-full overflow-hidden mt-1.5">
                                <div
                                  className={`h-full rounded-full ${
                                    br.inventoryTurnover >= 7 ? 'bg-emerald-400' : br.inventoryTurnover >= 4 ? 'bg-amber-400' : 'bg-rose-500'
                                  }`}
                                  style={{ width: `${Math.min(100, br.inventoryTurnover * 11)}%` }}
                                ></div>
                              </div>
                            </td>

                            <td className="py-4 px-4">
                              <span className={`text-sm font-black font-mono ${
                                br.deadStockValue > 50000 ? 'text-rose-400' : 'text-slate-200'
                              }`}>
                                ฿ {br.deadStockValue.toLocaleString()}
                              </span>
                            </td>

                            <td className="py-4 px-4">
                              <div className="flex flex-wrap items-center justify-between gap-2">
                                <span className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                                  br.status === 'excellent' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' :
                                  br.status === 'warning' ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30' :
                                  'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                                }`}>
                                  {br.statusText}
                                </span>

                                {br.deadStockValue > 50000 && (
                                  <button
                                    onClick={() => toast.success(`🚚 สร้างใบสั่งโอนย้ายสต็อกค้างจาก ${br.branchName} ไปยัง สาขาสยามพารากอน เรียบร้อยแล้ว!`)}
                                    className="px-3 py-1.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs transition cursor-pointer"
                                  >
                                    🚚 โอนของไปสาขาขายดี
                                  </button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

"""

assert target_inv_marker in code, "target_inv_marker not found"
code = code.replace(target_inv_marker, multi_channel_tab_jsx + target_inv_marker, 1)

with open('/Users/pmsp63/Desktop/insightflow-app/src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(code)

print("Successfully added Multi-Channel & Branch Comparison + Quick Wins to src/App.jsx")

