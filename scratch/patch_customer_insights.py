import re

file_path = "src/App.jsx"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Add Customer Insights State & Mock Dataset + Export Handler in App()
state_anchor = "  // ตัวเลขคงที่สำหรับแดชบอร์ด"
customer_state_code = """  // ระบบวิเคราะห์พฤติกรรมลูกค้า (Customer Insights, RFM & LTV Segmentation)
  const [selectedRfmSegment, setSelectedRfmSegment] = useState('all'); // 'all' | 'champion' | 'loyal' | 'at_risk' | 'new'
  const [customerSearch, setCustomerSearch] = useState('');
  const [selectedCustomerProfile, setSelectedCustomerProfile] = useState(null);

  const customersData = [
    {
      id: 'CUS-9001',
      name: 'คุณธนินทร์ อัศวเมธี',
      segment: 'champion',
      segmentLabel: '🏆 Champion (ลูกค้าชั้นดี VIP)',
      rfmScore: '5-5-5',
      recencyDays: 2,
      recencyText: '2 วันที่แล้ว',
      frequency: 28,
      ltv: 184500,
      aov: 6589,
      phone: '081-924-8899',
      lineId: '@thanin.vip',
      email: 'thanin.a@executive.co.th',
      favoriteProduct: 'MacBook Pro M3 Max, อุปกรณ์ Apple Pro',
      aiAction: 'มอบสิทธิ์ VIP Exclusive Preview สินค้าใหม่ก่อนใคร + ของขวัญพิเศษโดยไม่ต้องลดราคา',
      orders: [
        { orderId: 'ORD-2026-1092', date: '09 ต.ค. 2026', items: 'MacBook Pro 16" M3 Max + AppleCare+', total: 94900, method: 'บัตรเครดิต VIP' },
        { orderId: 'ORD-2026-0981', date: '22 ก.ย. 2026', items: 'Magic Keyboard + Magic Mouse Pro', total: 9800, method: 'PromptPay QR' },
        { orderId: 'ORD-2026-0840', date: '05 ก.ย. 2026', items: 'iPad Air M2 256GB Wi-Fi', total: 29900, method: 'บัตรเครดิต VIP' },
        { orderId: 'ORD-2026-0711', date: '14 ส.ค. 2026', items: 'AirPods Max Silver + สายเชื่อมต่อ', total: 19900, method: 'โอนผ่านธนาคาร' }
      ]
    },
    {
      id: 'CUS-9002',
      name: 'คุณพิมพ์ลภัส วงศ์สุวรรณ',
      segment: 'champion',
      segmentLabel: '🏆 Champion (ลูกค้าชั้นดี VIP)',
      rfmScore: '5-5-5',
      recencyDays: 4,
      recencyText: '4 วันที่แล้ว',
      frequency: 22,
      ltv: 142800,
      aov: 6490,
      phone: '089-452-3311',
      lineId: '@pimlaphat.w',
      email: 'pimlaphat@luxurybrand.com',
      favoriteProduct: 'เซ็ตสกินแคร์พรีเมี่ยม & วิตามินนำเข้า',
      aiAction: 'เชิญเข้ากลุ่ม Private Member และเสนอเซ็ต Limited Edition ประจำไตรมาส',
      orders: [
        { orderId: 'ORD-2026-1088', date: '07 ต.ค. 2026', items: 'เซ็ตเซรั่มทองคำ 24K Luxury (x3)', total: 18900, method: 'บัตรเครดิต' },
        { orderId: 'ORD-2026-0950', date: '19 ก.ย. 2026', items: 'คอลลาเจนเปปไทด์พรีเมี่ยม (x5)', total: 14500, method: 'PromptPay QR' },
        { orderId: 'ORD-2026-0812', date: '01 ก.ย. 2026', items: 'ครีมบำรุงรอบดวงตา Anti-Aging', total: 12400, method: 'บัตรเครดิต' }
      ]
    },
    {
      id: 'CUS-9003',
      name: 'คุณกิตติพงศ์ เจริญกิจ',
      segment: 'at_risk',
      segmentLabel: '⚠️ At Risk (เสี่ยงเลิกซื้อ - ต้องดึงกลับด่วน)',
      rfmScore: '1-4-5',
      recencyDays: 58,
      recencyText: '58 วันที่แล้ว (เคยซื้อทุก 14 วัน)',
      frequency: 16,
      ltv: 96400,
      aov: 6025,
      phone: '086-771-9012',
      lineId: '@kittipong.ck',
      email: 'kittipong.c@cafehouse.co.th',
      favoriteProduct: 'เมล็ดกาแฟคั่วบด Specialty & อุปกรณ์คาเฟ่',
      aiAction: '🚨 ด่วน! หายไปนานผิดปกติ 58 วัน แนะนำโทรสอบถามความพึงพอใจ + ส่งคูปองส่วนลด 20% ดึงกลับทันที',
      orders: [
        { orderId: 'ORD-2026-0612', date: '14 ส.ค. 2026', items: 'เมล็ดกาแฟ Ethiopia Yirgacheffe 5kg', total: 8500, method: 'โอนผ่านธนาคาร' },
        { orderId: 'ORD-2026-0501', date: '30 ก.ค. 2026', items: 'เครื่องบดกาแฟพาณิชย์ + แทมเปอร์', total: 24900, method: 'บัตรเครดิต' },
        { orderId: 'ORD-2026-0419', date: '15 ก.ค. 2026', items: 'ไซรัปวานิลลาฝรั่งเศส (x12 ขวด)', total: 5400, method: 'PromptPay QR' }
      ]
    },
    {
      id: 'CUS-9004',
      name: 'บริษัท โกลบอล ซัพพลาย จำกัด',
      segment: 'loyal',
      segmentLabel: '💎 Loyal (ลูกค้าประจำซื้อสม่ำเสมอ)',
      rfmScore: '4-5-4',
      recencyDays: 11,
      recencyText: '11 วันที่แล้ว',
      frequency: 19,
      ltv: 115600,
      aov: 6084,
      phone: '02-945-8800',
      lineId: '@globalsupply',
      email: 'purchasing@globalsupply.co.th',
      favoriteProduct: 'อุปกรณ์สำนักงาน & หมึกพิมพ์เลเซอร์',
      aiAction: 'เสนอแพ็กเกจเหมาจ่ายรายปี (Annual Corporate Contract) เพื่อล็อคยอดขายระยะยาว',
      orders: [
        { orderId: 'ORD-2026-1020', date: '30 ก.ย. 2026', items: 'ชุดหมึกพิมพ์เลเซอร์แท้ (x10 กล่อง)', total: 22500, method: 'วางบิลเครดิต 30 วัน' },
        { orderId: 'ORD-2026-0880', date: '10 ก.ย. 2026', items: 'กระดาษ A4 80 แกรม (x50 รีม)', total: 7500, method: 'โอนผ่านธนาคาร' }
      ]
    },
    {
      id: 'CUS-9005',
      name: 'คุณวรเมธ ศิริวัฒน์',
      segment: 'at_risk',
      segmentLabel: '⚠️ At Risk (เสี่ยงเลิกซื้อ - ต้องดึงกลับด่วน)',
      rfmScore: '2-4-4',
      recencyDays: 49,
      recencyText: '49 วันที่แล้ว',
      frequency: 12,
      ltv: 74000,
      aov: 6166,
      phone: '084-112-6789',
      lineId: '@woramet.s',
      email: 'woramet.siri@gmail.com',
      favoriteProduct: 'เก้าอี้สุขภาพ Ergonomic & โต๊ะปรับระดับไฟฟ้า',
      aiAction: '🚨 ส่ง LINE แจ้งสิทธิ์ตรวจเช็คสภาพสินค้าฟรี + มอบคูปองแทนเงินสด ฿1,000 สำหรับซื้ออุปกรณ์จัดโต๊ะทำงาน',
      orders: [
        { orderId: 'ORD-2026-0680', date: '22 ส.ค. 2026', items: 'เก้าอี้สุขภาพ Ergonomic Pro Mesh', total: 19500, method: 'ผ่อนชำระ 0%' },
        { orderId: 'ORD-2026-0520', date: '28 ก.ค. 2026', items: 'โต๊ะทำงานปรับระดับไฟฟ้า Dual Motor', total: 16900, method: 'บัตรเครดิต' }
      ]
    },
    {
      id: 'CUS-9006',
      name: 'คุณอารยา รัตนโชติ',
      segment: 'loyal',
      segmentLabel: '💎 Loyal (ลูกค้าประจำซื้อสม่ำเสมอ)',
      rfmScore: '4-4-4',
      recencyDays: 9,
      recencyText: '9 วันที่แล้ว',
      frequency: 14,
      ltv: 68200,
      aov: 4871,
      phone: '092-338-4455',
      lineId: '@araya.rt',
      email: 'araya.ratana@hotmail.com',
      favoriteProduct: 'สมาร์ทวอทช์ & อุปกรณ์ออกกำลังกาย',
      aiAction: 'แนะนำโปรโมชันซื้อคู่ (Cross-Sell Bundle) สายนาฬิกาและหูฟังออกกำลังกาย ดันยอดบิล +25%',
      orders: [
        { orderId: 'ORD-2026-1045', date: '02 ต.ค. 2026', items: 'สมาร์ทวอทช์ Garmin มัลติสปอร์ต', total: 16900, method: 'PromptPay QR' },
        { orderId: 'ORD-2026-0899', date: '12 ก.ย. 2026', items: 'หูฟังไร้สายใส่วิ่งกันน้ำ IPX7', total: 5900, method: 'บัตรเครดิต' }
      ]
    },
    {
      id: 'CUS-9007',
      name: 'คุณณัฐนิชา เกียรติขจร',
      segment: 'new',
      segmentLabel: '🌱 New Customer (ลูกค้าใหม่เพิ่งซื้อครั้งแรก)',
      rfmScore: '5-1-3',
      recencyDays: 1,
      recencyText: '1 วันที่แล้ว',
      frequency: 1,
      ltv: 8900,
      aov: 8900,
      phone: '095-889-1234',
      lineId: '@nattanicha.k',
      email: 'nattanicha.k@gmail.com',
      favoriteProduct: 'ลำโพง Bluetooth พกพา & แก็ดเจ็ต',
      aiAction: 'ส่งคูปอง Welcome Back ลด ฿500 สำหรับการซื้อครั้งที่ 2 ภายใน 7 วัน เพื่อเปลี่ยนเป็นลูกค้าประจำ',
      orders: [
        { orderId: 'ORD-2026-1102', date: '10 ต.ค. 2026', items: 'ลำโพง Bluetooth Marshall Acton III', total: 8900, method: 'PromptPay QR' }
      ]
    }
  ];

  const filteredCustomers = customersData.filter(c => {
    const matchSegment = selectedRfmSegment === 'all' || c.segment === selectedRfmSegment;
    const q = customerSearch.trim().toLowerCase();
    const matchSearch = !q ||
      c.name.toLowerCase().includes(q) ||
      c.id.toLowerCase().includes(q) ||
      c.phone.toLowerCase().includes(q) ||
      c.lineId.toLowerCase().includes(q) ||
      c.favoriteProduct.toLowerCase().includes(q);
    return matchSegment && matchSearch;
  });

  const exportCustomerRfmCsv = () => {
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

  // ตัวเลขคงที่สำหรับแดชบอร์ด"""

if "const [selectedRfmSegment" not in content:
    content = content.replace(state_anchor, customer_state_code)

# 2. Add Sidebar Nav Item for 'customers'
old_nav_inventory = """              { 
                id: 'inventory', 
                label: 'คลังสินค้า (AI)', 
                badge: 'New',
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                ) 
              },"""

new_nav_customers_and_inventory = """              { 
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
                id: 'inventory', 
                label: 'คลังสินค้า (AI)', 
                badge: 'New',
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                  </svg>
                ) 
              },"""

if "id: 'customers'" not in content:
    content = content.replace(old_nav_inventory, new_nav_customers_and_inventory)

# 3. Add Header Title for 'customers'
old_header_title = "{activeTab === 'inventory' && 'AI-Powered Smart Inventory'}"
new_header_title = """{activeTab === 'customers' && 'Customer Insights, RFM & LTV Intelligence'}
                {activeTab === 'inventory' && 'AI-Powered Smart Inventory'}"""

if "activeTab === 'customers' && 'Customer Insights" not in content:
    content = content.replace(old_header_title, new_header_title)

# 4. Add TAB: CUSTOMERS content right before TAB: INVENTORY
old_inventory_tab_anchor = "          {/* TAB: INVENTORY */}"
new_customers_tab_content = """          {/* TAB: วิเคราะห์พฤติกรรมลูกค้า (CUSTOMER INSIGHTS, RFM & LTV) */}
          {activeTab === 'customers' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              
              {/* 1. HERO BANNER: CUSTOMER INSIGHTS & RFM ENGINE */}
              <div className={`p-7 sm:p-8 rounded-3xl border relative overflow-hidden shadow-2xl ${
                theme === 'dark'
                  ? 'bg-gradient-to-r from-amber-500/15 via-[#0b1228] to-[#040817] border-amber-400/40'
                  : 'bg-gradient-to-r from-amber-100/70 via-white to-sky-50 border-amber-300'
              }`}>
                <div className="relative z-10 flex flex-col lg:flex-row justify-between lg:items-center gap-6">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 shadow-xl shadow-amber-400/20 flex-shrink-0">
                      <svg className="w-8 h-8 text-slate-950" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-400 border border-amber-400/30">
                          RFM & LTV Intelligence • Active
                        </span>
                        <span className="text-xs text-slate-400">วิเคราะห์ฐานลูกค้า 1,435 ราย</span>
                      </div>
                      <h2 className={`text-2xl font-black mt-1.5 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                        วิเคราะห์พฤติกรรมลูกค้า & จัดกลุ่ม RFM (Customer Insights & Segmentation)
                      </h2>
                      <p className="text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
                        ช่วยให้ร้านค้ารู้ทันทีว่าใครคือ <strong className="text-amber-400">ลูกค้าชั้นดี (Champion VIP)</strong> ที่ต้องดูแลพิเศษ และใครคือ <strong className="text-red-400">ลูกค้าที่กำลังจะเลิกซื้อ (At Risk)</strong> เพื่อส่งโปรโมชันหรือโทรติดตามดึงกลับได้ทันเวลา พร้อมคำนวณมูลค่าตลอดอายุลูกค้า (Customer Lifetime Value - LTV)
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3 self-start lg:self-center">
                    <button
                      onClick={exportCustomerRfmCsv}
                      className="bg-white/10 hover:bg-white/15 text-slate-200 font-bold px-5 py-3 rounded-2xl text-xs border border-white/15 transition flex items-center gap-2"
                    >
                      <span>📥 ส่งออกรายงาน RFM & LTV (.csv)</span>
                    </button>
                    <button
                      onClick={() => toast.success('📢 ส่งแคมเปญ CRM แยกตามกลุ่ม RFM ไปยัง LINE & SMS ของลูกค้าเรียบร้อยแล้ว!')}
                      className="bg-gradient-to-r from-amber-400 to-amber-300 hover:brightness-105 text-slate-950 font-black px-6 py-3 rounded-2xl text-xs transition shadow-xl shadow-amber-400/20 flex items-center gap-2 cursor-pointer"
                    >
                      <span>📢 ส่งแคมเปญ CRM ดึงลูกค้าอัตโนมัติ</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* 2. LTV & RETENTION SUMMARY METRICS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className={`p-6 rounded-3xl border shadow-xl ${theme === 'dark' ? 'bg-[#0b1020]/85 border-white/10' : 'bg-white border-slate-200'}`}>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">มูลค่าลูกค้าเฉลี่ย (Avg LTV)</span>
                    <span className="text-amber-400 text-lg">💰</span>
                  </div>
                  <h3 className={`text-3xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>฿ 48,250</h3>
                  <p className="text-xs text-emerald-400 mt-1 font-bold">↗ +22.4% เทียบกับไตรมาสก่อน</p>
                  <p className="text-[11px] text-slate-500 mt-1">คำนวณจากยอดซื้อสะสมตลอดอายุการเป็นลูกค้า</p>
                </div>

                <div className={`p-6 rounded-3xl border shadow-xl ${theme === 'dark' ? 'bg-[#0b1020]/85 border-white/10' : 'bg-white border-slate-200'}`}>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">กลุ่ม Champion VIP (ซื้อซ้ำสูง)</span>
                    <span className="text-amber-400 text-lg">🏆</span>
                  </div>
                  <h3 className="text-3xl font-black text-amber-400">342 <span className="text-sm font-normal text-slate-400">ราย (23.8%)</span></h3>
                  <p className="text-xs text-slate-300 mt-1 font-semibold">สร้างรายได้คิดเป็น <strong>54%</strong> ของทั้งร้าน</p>
                  <p className="text-[11px] text-slate-500 mt-1">LTV สูงสุด: ฿ 184,500 / ราย</p>
                </div>

                <div className={`p-6 rounded-3xl border shadow-xl ${theme === 'dark' ? 'bg-[#0b1020]/85 border-red-500/30' : 'bg-white border-red-200'}`}>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-red-400 uppercase tracking-wider">กลุ่ม At Risk (เสี่ยงเลิกซื้อ)</span>
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping"></span>
                  </div>
                  <h3 className="text-3xl font-black text-red-400">185 <span className="text-sm font-normal text-slate-400">ราย (12.9%)</span></h3>
                  <p className="text-xs text-red-300 mt-1 font-semibold">มูลค่ายอดขายที่เสี่ยงสูญเสีย ฿ 1.42M</p>
                  <p className="text-[11px] text-slate-500 mt-1">เคยซื้อประจำแต่หายไปเกิน 45 วัน</p>
                </div>

                <div className={`p-6 rounded-3xl border shadow-xl ${theme === 'dark' ? 'bg-[#0b1020]/85 border-white/10' : 'bg-white border-slate-200'}`}>
                  <div className="flex justify-between items-start mb-2">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">อัตราการกลับมาซื้อซ้ำ (Retention)</span>
                    <span className="text-emerald-400 text-lg">🔄</span>
                  </div>
                  <h3 className="text-3xl font-black text-emerald-400">68.4%</h3>
                  <p className="text-xs text-sky-400 mt-1 font-bold">LTV : CAC Ratio = 5.8x (ดีเยี่ยม)</p>
                  <p className="text-[11px] text-slate-500 mt-1">ระยะเวลาซื้อซ้ำเฉลี่ยทุกๆ 16 วัน</p>
                </div>
              </div>

              {/* 3. RFM SEGMENTATION MATRIX CARDS (คลิกเพื่อกรองกลุ่มลูกค้าได้ทันที) */}
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <div>
                    <h3 className={`text-lg font-black flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                      <span className="text-amber-400">📊</span> ตารางจัดกลุ่มลูกค้าตามพฤติกรรม RFM (Recency • Frequency • Monetary)
                    </h3>
                    <p className="text-xs text-slate-400">
                      คลิกเลือกกลุ่มที่ต้องการ เพื่อดูรายชื่อลูกค้าและแผนการตลาดที่ AI แนะนำสำหรับกลุ่มนั้นโดยเฉพาะ
                    </p>
                  </div>
                  {selectedRfmSegment !== 'all' && (
                    <button
                      onClick={() => setSelectedRfmSegment('all')}
                      className="text-xs font-bold text-amber-400 hover:underline px-3 py-1.5 rounded-xl bg-amber-400/10 border border-amber-400/30"
                    >
                      ✕ แสดงลูกค้าทุกกลุ่ม ({customersData.length} รายการตัวอย่าง)
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                  {[
                    {
                      id: 'champion',
                      title: '🏆 Champion (ลูกค้าชั้นดี VIP)',
                      count: '342 ราย',
                      share: '54% ของรายได้ร้าน',
                      rfmRule: 'เพิ่งซื้อไม่นาน (R สูง) • ซื้อบ่อยมาก (F สูง) • ยอดใช้จ่ายสูง (M สูง)',
                      avgLtv: '฿ 95,000 - ฿ 184,500',
                      strategy: 'ดูแลระดับ First Class ส่งสินค้าใหม่ให้ชมก่อนใคร ไม่จำเป็นต้องแจกส่วนลดเยอะ แต่เน้นสิทธิพิเศษ',
                      borderClass: 'border-amber-400/50 bg-amber-400/10',
                      badgeClass: 'bg-amber-400 text-slate-950'
                    },
                    {
                      id: 'loyal',
                      title: '💎 Loyal (ลูกค้าประจำเหนียวแน่น)',
                      count: '618 ราย',
                      share: '28% ของรายได้ร้าน',
                      rfmRule: 'ซื้อสม่ำเสมอทุกเดือน • ตอบสนองต่อแคมเปญสะสมแต้มดีมาก',
                      avgLtv: '฿ 45,000 - ฿ 115,600',
                      strategy: 'แนะนำสินค้าพ่วง (Cross-Sell / Upsell) เพื่อเพิ่มยอดต่อบิล (AOV) ให้ขยับขึ้นเป็นกลุ่ม Champion',
                      borderClass: 'border-sky-400/50 bg-sky-500/10',
                      badgeClass: 'bg-sky-400 text-slate-950'
                    },
                    {
                      id: 'at_risk',
                      title: '⚠️ At Risk (เสี่ยงเลิกซื้อ / หายไปนาน)',
                      count: '185 ราย',
                      share: 'เสี่ยงเสียรายได้ ฿ 1.42M',
                      rfmRule: 'เคยซื้อบ่อยและยอดสูง แต่ขาดการติดต่อ/ไม่ซื้อซ้ำนานเกิน 45-60 วัน',
                      avgLtv: '฿ 60,000 - ฿ 96,400',
                      strategy: '🚨 ส่งคูปองดึงกลับด่วน (Win-Back Voucher ลด 15-20%) หรือให้ทีม CRM โทรสอบถามปัญหาทันที',
                      borderClass: 'border-red-500/50 bg-red-500/10',
                      badgeClass: 'bg-red-500 text-white'
                    },
                    {
                      id: 'new',
                      title: '🌱 New Customers (ลูกค้าใหม่)',
                      count: '290 ราย',
                      share: 'เพิ่งซื้อครั้งแรกใน 14 วัน',
                      rfmRule: 'เพิ่งเข้ามาซื้อครั้งแรก (R=5, F=1) ยังมีความประทับใจแรกกับแบรนด์',
                      avgLtv: '฿ 3,500 - ฿ 12,000',
                      strategy: 'ส่งคูปองส่วนลดสำหรับการสั่งซื้อครั้งที่ 2 ภายใน 7 วัน เพื่อกระตุ้นให้เกิดการซื้อซ้ำเป็นนิสัย',
                      borderClass: 'border-emerald-400/50 bg-emerald-500/10',
                      badgeClass: 'bg-emerald-400 text-slate-950'
                    }
                  ].map(seg => (
                    <div
                      key={seg.id}
                      onClick={() => setSelectedRfmSegment(selectedRfmSegment === seg.id ? 'all' : seg.id)}
                      className={`p-5 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between ${
                        selectedRfmSegment === seg.id
                          ? `${seg.borderClass} ring-2 ring-amber-400 shadow-2xl scale-[1.01]`
                          : theme === 'dark'
                          ? 'bg-[#0b1020]/90 border-white/10 hover:border-white/25'
                          : 'bg-white border-slate-200 hover:border-slate-400'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2 mb-3">
                          <span className={`text-[11px] font-black px-2.5 py-0.5 rounded-full ${seg.badgeClass}`}>
                            {seg.count}
                          </span>
                          <span className="text-[11px] font-bold text-slate-400">{seg.share}</span>
                        </div>
                        <h4 className={`text-base font-black mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                          {seg.title}
                        </h4>
                        <p className="text-xs text-slate-400 leading-relaxed mb-3">
                          <strong>พฤติกรรม:</strong> {seg.rfmRule}
                        </p>
                        <div className={`p-3 rounded-2xl text-xs mb-3 ${theme === 'dark' ? 'bg-black/30 text-slate-300' : 'bg-slate-100 text-slate-700'}`}>
                          <span className="font-bold text-amber-400 block mb-0.5">💡 แผน CRM ที่แนะนำ:</span>
                          {seg.strategy}
                        </div>
                      </div>
                      <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs">
                        <span className="text-slate-400">เฉลี่ย LTV: <strong className="text-white">{seg.avgLtv}</strong></span>
                        <span className="text-amber-400 font-bold">
                          {selectedRfmSegment === seg.id ? '✓ กำลังกรองกลุ่มนี้' : 'คลิกเพื่อดูรายชื่อ →'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* 4. INDIVIDUAL CUSTOMER PURCHASE HISTORY & CRM TABLE */}
              <div className={`p-7 rounded-3xl border shadow-2xl ${
                theme === 'dark' ? 'bg-[#0b1020]/90 border-white/10' : 'bg-white border-slate-200'
              }`}>
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
                  <div>
                    <h3 className={`text-lg font-black flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                      <span>🔍</span> ค้นหาประวัติการซื้อรายบุคคล & มูลค่าสะสม (Customer LTV & Purchase History)
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      ค้นหาด้วยชื่อ, รหัสลูกค้า, เบอร์โทรศัพท์, LINE ID หรือสินค้าที่ชอบซื้อ เพื่อวางแผนโทรติดตามหรือส่งโปรโมชันเฉพาะบุคคล
                    </p>
                  </div>

                  {/* Search & Segment Filter Controls */}
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="relative w-full sm:w-72">
                      <input
                        type="text"
                        value={customerSearch}
                        onChange={(e) => setCustomerSearch(e.target.value)}
                        placeholder="ค้นหาชื่อ, เบอร์โทร, LINE, สินค้า..."
                        className={`w-full pl-9 pr-4 py-2.5 rounded-xl border text-xs font-medium focus:outline-none focus:border-amber-400 ${
                          theme === 'dark' ? 'bg-[#060a16] border-white/15 text-white placeholder-slate-500' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />
                      <svg className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>

                    <select
                      value={selectedRfmSegment}
                      onChange={(e) => setSelectedRfmSegment(e.target.value)}
                      className={`px-3.5 py-2.5 rounded-xl border text-xs font-bold focus:outline-none focus:border-amber-400 ${
                        theme === 'dark' ? 'bg-[#060a16] border-white/15 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                      }`}
                    >
                      <option value="all">ทุกกลุ่ม RFM ({customersData.length})</option>
                      <option value="champion">🏆 Champion VIP</option>
                      <option value="loyal">💎 Loyal ลูกค้าประจำ</option>
                      <option value="at_risk">⚠️ At Risk เสี่ยงเลิกซื้อ</option>
                      <option value="new">🌱 New ลูกค้าใหม่</option>
                    </select>
                  </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className={`border-b text-xs uppercase ${theme === 'dark' ? 'border-white/10 text-slate-400 bg-black/20' : 'border-slate-200 text-slate-600 bg-slate-50'}`}>
                        <th className="p-4 rounded-tl-xl">ลูกค้า / ช่องทางติดต่อ</th>
                        <th className="p-4">กลุ่ม RFM (Score)</th>
                        <th className="p-4">ซื้อล่าสุด (Recency)</th>
                        <th className="p-4">ความถี่ (Frequency)</th>
                        <th className="p-4">มูลค่าสะสมรวม (LTV)</th>
                        <th className="p-4">สินค้าที่ซื้อประจำ & คำแนะนำ AI</th>
                        <th className="p-4 rounded-tr-xl text-right">การจัดการ CRM</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-sm">
                      {filteredCustomers.map((cust) => (
                        <tr
                          key={cust.id}
                          className={`transition ${
                            theme === 'dark' ? 'hover:bg-white/[0.03]' : 'hover:bg-slate-50'
                          }`}
                        >
                          <td className="p-4">
                            <div className="font-bold text-white flex items-center gap-2">
                              <span>{cust.name}</span>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-400 border border-white/10">
                                {cust.id}
                              </span>
                            </div>
                            <div className="text-xs text-slate-400 mt-1 flex flex-wrap items-center gap-3">
                              <span>📞 {cust.phone}</span>
                              <span className="text-emerald-400 font-medium">LINE: {cust.lineId}</span>
                            </div>
                          </td>

                          <td className="p-4">
                            <span className={`inline-block px-2.5 py-1 rounded-lg text-xs font-black ${
                              cust.segment === 'champion'
                                ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30'
                                : cust.segment === 'at_risk'
                                ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                                : cust.segment === 'loyal'
                                ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                                : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            }`}>
                              {cust.segmentLabel}
                            </span>
                            <div className="text-[11px] text-slate-400 font-mono mt-1">
                              RFM Score: <strong>{cust.rfmScore}</strong>
                            </div>
                          </td>

                          <td className="p-4">
                            <span className={`font-bold text-xs ${cust.recencyDays > 40 ? 'text-red-400' : 'text-slate-200'}`}>
                              {cust.recencyText}
                            </span>
                          </td>

                          <td className="p-4">
                            <span className="font-black text-white">{cust.frequency} ครั้ง</span>
                            <div className="text-[11px] text-slate-400">
                              เฉลี่ย ฿ {cust.aov.toLocaleString()} / บิล
                            </div>
                          </td>

                          <td className="p-4">
                            <span className="text-base font-black text-amber-400 font-mono">
                              ฿ {cust.ltv.toLocaleString()}
                            </span>
                            <div className="text-[10px] text-emerald-400 font-semibold">
                              Lifetime Value สะสม
                            </div>
                          </td>

                          <td className="p-4 max-w-xs">
                            <div className="text-xs font-bold text-slate-200 truncate">
                              🛍️ {cust.favoriteProduct}
                            </div>
                            <div className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                              {cust.aiAction}
                            </div>
                          </td>

                          <td className="p-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() => setSelectedCustomerProfile(cust)}
                                className="px-3 py-1.5 rounded-xl bg-amber-400/15 hover:bg-amber-400/25 text-amber-300 border border-amber-400/30 text-xs font-bold transition cursor-pointer whitespace-nowrap"
                              >
                                📜 ดูประวัติซื้อ ({cust.orders.length})
                              </button>
                              <button
                                onClick={() => toast.success(`📞 บันทึกคิวโทรติดตาม ${cust.name} (${cust.phone}) พร้อมสคริปต์แนะนำสินค้าเรียบร้อย!`)}
                                className="px-2.5 py-1.5 rounded-xl bg-sky-500/15 hover:bg-sky-500/25 text-sky-300 border border-sky-500/30 text-xs font-bold transition cursor-pointer"
                                title="โทรติดตามลูกค้า"
                              >
                                📞 โทร
                              </button>
                              <button
                                onClick={() => toast.success(`💬 ส่งข้อความแคมเปญและคูปองส่วนลดไปยัง LINE ${cust.lineId} ของ ${cust.name} สำเร็จ!`)}
                                className="px-2.5 py-1.5 rounded-xl bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 text-xs font-bold transition cursor-pointer"
                                title="ส่งข้อความ LINE / SMS"
                              >
                                💬 ส่งข้อความ
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* 5. SELECTED CUSTOMER 360° PURCHASE HISTORY DRAWER / PANEL */}
                {selectedCustomerProfile && (
                  <div className={`mt-6 p-6 rounded-3xl border-2 border-amber-400/50 shadow-2xl animate-in fade-in duration-200 ${
                    theme === 'dark' ? 'bg-[#060b18]' : 'bg-amber-50/40'
                  }`}>
                    <div className="flex flex-wrap items-start justify-between gap-4 pb-4 mb-5 border-b border-white/10">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black px-2.5 py-0.5 rounded-md bg-amber-400 text-slate-950">
                            ประวัติการซื้อรายบุคคล 360°
                          </span>
                          <span className="text-xs font-mono text-slate-400">{selectedCustomerProfile.id}</span>
                        </div>
                        <h4 className="text-xl font-black text-white mt-1">
                          {selectedCustomerProfile.name} — มูลค่าสะสมรวม (LTV): <span className="text-amber-400">฿ {selectedCustomerProfile.ltv.toLocaleString()}</span>
                        </h4>
                        <p className="text-xs text-slate-400 mt-0.5">
                          เบอร์โทรศัพท์: <strong>{selectedCustomerProfile.phone}</strong> • LINE: <strong className="text-emerald-400">{selectedCustomerProfile.lineId}</strong> • อีเมล: {selectedCustomerProfile.email}
                        </p>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => toast.success(`🎁 ส่งคูปอง VIP เฉพาะบุคคลให้ ${selectedCustomerProfile.name} ทาง LINE ${selectedCustomerProfile.lineId} แล้ว!`)}
                          className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-4 py-2 rounded-xl text-xs transition cursor-pointer"
                        >
                          🎁 ส่งคูปองเฉพาะบุคคล
                        </button>
                        <button
                          onClick={() => setSelectedCustomerProfile(null)}
                          className="px-3 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 text-xs font-bold transition cursor-pointer"
                        >
                          ✕ ปิดหน้าต่าง
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                      <div className="lg:col-span-8">
                        <h5 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-3">
                          รายการคำสั่งซื้อย้อนหลัง ({selectedCustomerProfile.orders.length} บิลล่าสุด)
                        </h5>
                        <div className="space-y-2.5">
                          {selectedCustomerProfile.orders.map((ord) => (
                            <div
                              key={ord.orderId}
                              className="p-3.5 rounded-2xl border border-white/10 bg-black/30 flex flex-wrap items-center justify-between gap-3 text-xs"
                            >
                              <div>
                                <div className="flex items-center gap-2">
                                  <span className="font-mono font-bold text-amber-400">{ord.orderId}</span>
                                  <span className="text-slate-400">• {ord.date}</span>
                                  <span className="px-2 py-0.5 rounded bg-white/5 text-slate-300 text-[10px]">{ord.method}</span>
                                </div>
                                <p className="text-slate-200 font-semibold mt-1">{ord.items}</p>
                              </div>
                              <div className="text-right">
                                <span className="text-sm font-black text-emerald-400 font-mono">
                                  ฿ {ord.total.toLocaleString()}
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="lg:col-span-4 flex flex-col justify-between p-5 rounded-2xl border border-amber-400/25 bg-amber-400/5">
                        <div>
                          <span className="text-[11px] font-black uppercase tracking-wider text-amber-400">
                            🤖 AI CRM Action Script (สคริปต์แนะนำสำหรับคุยกับลูกค้า)
                          </span>
                          <p className="text-xs text-slate-200 mt-2 leading-relaxed">
                            {selectedCustomerProfile.aiAction}
                          </p>
                          <div className="mt-4 pt-3 border-t border-white/10 space-y-1.5 text-xs text-slate-300">
                            <div>• <strong>สินค้าที่สนใจเป็นพิเศษ:</strong> {selectedCustomerProfile.favoriteProduct}</div>
                            <div>• <strong>ความถี่การซื้อ:</strong> {selectedCustomerProfile.frequency} ครั้ง (เฉลี่ย ฿ {selectedCustomerProfile.aov.toLocaleString()}/บิล)</div>
                            <div>• <strong>ซื้อครั้งล่าสุด:</strong> {selectedCustomerProfile.recencyText}</div>
                          </div>
                        </div>

                        <button
                          onClick={() => toast.success(`📞 กำลังเชื่อมต่อระบบโทรติดตาม ${selectedCustomerProfile.phone}...`)}
                          className="mt-4 w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition cursor-pointer"
                        >
                          📞 โทรติดต่อลูกค้าท่านนี้ทันที ({selectedCustomerProfile.phone})
                        </button>
                      </div>
                    </div>
                  </div>
                )}

              </div>

            </div>
          )}

          {/* TAB: INVENTORY */}"""

if "activeTab === 'customers' && (" not in content:
    content = content.replace(old_inventory_tab_anchor, new_customers_tab_content)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Customer Insights, RFM & LTV page patched successfully.")

