import React, { useState, useRef, useEffect } from 'react';
import { toast } from 'react-hot-toast';

// -------------------------------------------------------------
// AI Semantic Module Classifier & Auto-Dispatcher
// -------------------------------------------------------------
export function classifyUploadedFile(fileName = '', detectedHeaders = [], firstFewRows = [], rawText = '') {
  const allText = [
    fileName,
    ...detectedHeaders,
    ...firstFewRows.flat(),
    rawText.slice(0, 1000)
  ]
    .join(' ')
    .toLowerCase();

  const inventoryKeywords = ['sku', 'stock', 'inventory', 'สต็อก', 'คงเหลือ', 'สินค้าคงคลัง', 'จำนวนชิ้น', 'ต้นทุน', 'จุดสั่งซื้อ', 'reorder', 'warehouse', 'คลังสินค้า', 'บาร์โค้ด', 'barcode'];
  const inventoryMatches = inventoryKeywords.filter(k => allText.includes(k)).length;

  const customerKeywords = ['customer', 'custummer', 'custumer', 'customer_name', 'custummer_name', 'ชื่อลูกค้า', 'client', 'phone', 'tel', 'เบอร์โทร', 'line', 'rfm', 'ยอดซื้อสะสม', 'ลูกค้า', 'ผู้ซื้อ', 'สมาชิก', 'member', 'churn', 'at_risk', 'loyalty'];
  const customerMatches = customerKeywords.filter(k => allText.includes(k)).length;

  const staffPosKeywords = ['cashier', 'staff', 'employee', 'พนักงาน', 'void', 'ยกเลิกบิล', 'pos', 'เครื่องคิดเงิน', 'ลิ้นชัก', 'กะ', 'shift', 'แคชเชียร์', 'เคาน์เตอร์'];
  const staffPosMatches = staffPosKeywords.filter(k => allText.includes(k)).length;

  const channelKeywords = ['channel', 'platform', 'branch', 'สาขา', 'shopee', 'lazada', 'tiktok', 'line oa', 'marketplace', 'gp', 'ค่าธรรมเนียม', 'คอมมิชชั่น', 'หน้าร้าน'];
  const channelMatches = channelKeywords.filter(k => allText.includes(k)).length;

  const procurementKeywords = ['vendor', 'supplier', 'ซัพพลายเออร์', 'คู่ค้า', 'po', 'ใบสั่งซื้อ', 'lead time', 'จัดซื้อ', 'requisition', 'ผู้จัดจำหน่าย', 'order'];
  const procurementMatches = procurementKeywords.filter(k => allText.includes(k)).length;

  const overviewKeywords = ['revenue', 'sales', 'profit', 'ยอดขาย', 'กำไร', 'งบการเงิน', 'p&l', 'target', 'เป้าหมาย', 'รายได้', 'ebitda', 'net margin', 'overview'];
  const overviewMatches = overviewKeywords.filter(k => allText.includes(k)).length;

  const biStudioKeywords = ['powerbi', 'matrix', 'dimension', 'cross-tab', 'สตูดิโอ', 'bi_studio', 'report'];
  const biMatches = biStudioKeywords.filter(k => allText.includes(k)).length;

  const scores = [
    { key: 'inventory', score: inventoryMatches * 2.4, labelTh: 'คลังสินค้า & สต็อก', labelEn: 'Smart Inventory', icon: '📦', color: '#eab308' },
    { key: 'customers', score: customerMatches * 2.4, labelTh: 'วิเคราะห์ลูกค้าประจำ & CRM', labelEn: 'Customer CRM', icon: '👥', color: '#ec4899' },
    { key: 'staff_pos', score: staffPosMatches * 2.6, labelTh: 'พนักงาน & ตรวจสอบ POS', labelEn: 'Staff & POS Audit', icon: '💳', color: '#f59e0b' },
    { key: 'multi_channel', score: channelMatches * 2.4, labelTh: 'สาขา & ช่องทางขาย', labelEn: 'Multi-Channel & Branch', icon: '🌐', color: '#06b6d4' },
    { key: 'procurement', score: procurementMatches * 2.4, labelTh: 'จัดซื้อรวมศูนย์ & คู่ค้า', labelEn: 'Procurement & Vendors', icon: '🏢', color: '#10b981' },
    { key: 'bi_studio', score: biMatches * 2.5, labelTh: 'Executive BI Studio', labelEn: 'Executive BI Studio', icon: '📈', color: '#a855f7' },
    { key: 'overview', score: overviewMatches * 1.6, labelTh: 'ภาพรวมธุรกิจ & เป้าหมาย', labelEn: 'Business Overview & Goals', icon: '📊', color: '#38bdf8' }
  ];

  scores.sort((a, b) => b.score - a.score);

  const matchedModules = scores.filter(s => s.score > 0);
  const primary = scores[0].score >= 2 ? scores[0] : {
    key: 'database',
    score: 1,
    labelTh: 'ฐานข้อมูลกลาง Master DB',
    labelEn: 'Master Database',
    icon: '🗄️',
    color: '#64748b'
  };

  const allTargetKeys = matchedModules.length > 0
    ? Array.from(new Set([primary.key, ...matchedModules.map(m => m.key)]))
    : [primary.key, 'database', 'overview'];

  return {
    ...primary,
    matchedModules: matchedModules.length > 0 ? matchedModules : [primary],
    allTargetKeys
  };
}

// -------------------------------------------------------------
// Realistic 3D Basketball Vector Graphic
// -------------------------------------------------------------
export function BasketballGraphic({ size = 72, className = '', isAiming = false, isSwishing = false }) {
  return (
    <div
      className={`relative select-none pointer-events-none transition-transform duration-300 ${className} ${
        isAiming ? 'scale-110 -rotate-12 filter drop-shadow-[0_10px_20px_rgba(249,115,22,0.6)]' : ''
      } ${isSwishing ? 'animate-bounce' : ''}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        className="overflow-visible"
        style={{
          filter: isAiming ? 'drop-shadow(0 0 16px #f97316)' : 'drop-shadow(0 8px 16px rgba(0,0,0,0.4))'
        }}
      >
        <defs>
          {/* Radial Gradient for 3D Leather Volume */}
          <radialGradient id="bballGrad" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#ff9a3d" />
            <stop offset="45%" stopColor="#ea580c" />
            <stop offset="85%" stopColor="#9a3412" />
            <stop offset="100%" stopColor="#431407" />
          </radialGradient>
          {/* Specular Highlight */}
          <radialGradient id="bballSpecular" cx="30%" cy="25%" r="35%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
            <stop offset="60%" stopColor="#ffffff" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Outer Sphere */}
        <circle cx="50" cy="50" r="47" fill="url(#bballGrad)" stroke="#261005" strokeWidth="2.5" />

        {/* Specular Gloss */}
        <circle cx="50" cy="50" r="47" fill="url(#bballSpecular)" />

        {/* Black Grooves / Seams (Authentic 8-panel lines) */}
        {/* Horizontal Seam */}
        <path d="M 3 50 Q 50 50 97 50" fill="none" stroke="#1c0b04" strokeWidth="3.2" strokeLinecap="round" />
        {/* Vertical Center Seam */}
        <path d="M 50 3 Q 50 50 50 97" fill="none" stroke="#1c0b04" strokeWidth="3.2" strokeLinecap="round" />
        {/* Left Arc Seam */}
        <path d="M 18 16 Q 42 50 18 84" fill="none" stroke="#1c0b04" strokeWidth="3" strokeLinecap="round" />
        {/* Right Arc Seam */}
        <path d="M 82 16 Q 58 50 82 84" fill="none" stroke="#1c0b04" strokeWidth="3" strokeLinecap="round" />

        {/* Subtle Pebbled Leather Grip Dots */}
        <circle cx="38" cy="36" r="1.2" fill="#ffedd5" opacity="0.4" />
        <circle cx="44" cy="40" r="1.1" fill="#ffedd5" opacity="0.35" />
        <circle cx="58" cy="34" r="1.2" fill="#ffedd5" opacity="0.3" />
        <circle cx="34" cy="62" r="1.2" fill="#ffedd5" opacity="0.35" />
        <circle cx="64" cy="62" r="1.1" fill="#ffedd5" opacity="0.3" />
      </svg>
    </div>
  );
}

// -------------------------------------------------------------
// Realistic Basketball Hoop, Backboard & Swish Net
// -------------------------------------------------------------
export function BasketballHoop({ isAiming = false, isSwishing = false, scale = 1.0 }) {
  return (
    <div
      className="relative select-none pointer-events-none transition-all duration-300"
      style={{
        transform: `scale(${scale})`,
        transformOrigin: 'top center'
      }}
    >
      {/* Acrylic Glass Backboard */}
      <div
        className={`w-36 h-28 sm:w-44 sm:h-32 rounded-xl relative border-2 backdrop-blur-md transition-all duration-300 flex items-center justify-center ${
          isAiming
            ? 'bg-gradient-to-b from-amber-500/25 to-orange-500/15 border-amber-400 shadow-[0_0_30px_rgba(251,191,36,0.6)] ring-2 ring-amber-400/50'
            : 'bg-white/10 dark:bg-slate-900/40 border-white/30 dark:border-white/20 shadow-xl'
        }`}
      >
        {/* Outer Border Glow LED strip */}
        <div
          className={`absolute inset-0 rounded-xl transition-opacity duration-300 pointer-events-none ${
            isAiming ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            boxShadow: 'inset 0 0 15px #f97316'
          }}
        />

        {/* Inner Shooter's Target Box (สี่เหลี่ยมเป้าหมายกลางแป้นบาส) */}
        <div
          className={`w-16 h-12 sm:w-20 sm:h-14 rounded-md border-2 transition-all duration-300 ${
            isAiming
              ? 'border-orange-400 bg-orange-500/20 shadow-[0_0_15px_#f97316]'
              : 'border-red-500/80 bg-red-500/5'
          }`}
        />

        {/* Target Reticle Pulsing Dot when Aiming */}
        {isAiming && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none flex items-center justify-center">
            <span className="w-6 h-6 rounded-full border-2 border-amber-400 animate-ping absolute opacity-75" />
            <span className="w-2 h-2 rounded-full bg-amber-400 shadow-[0_0_10px_#fbbf24]" />
          </div>
        )}

        {/* Backboard Mounting Plate */}
        <div className="absolute bottom-0 w-8 h-3 bg-slate-700/80 rounded-t-sm" />
      </div>

      {/* Rim Mount Bracket */}
      <div className="absolute left-1/2 -translate-x-1/2 top-[78px] sm:top-[92px] w-6 h-2.5 bg-zinc-800 rounded-sm shadow-md z-10" />

      {/* Solid Metallic Orange Rim (ห่วงบาสเหล็กสีส้ม) */}
      <div
        className={`absolute left-1/2 -translate-x-1/2 top-[84px] sm:top-[98px] w-24 sm:w-28 h-7 sm:h-8 rounded-full border-[3.5px] border-orange-500 z-20 transition-all duration-300 ${
          isAiming
            ? 'border-amber-300 shadow-[0_0_20px_#f97316] ring-2 ring-amber-400'
            : 'shadow-[0_4px_12px_rgba(249,115,22,0.4)]'
        }`}
        style={{
          background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.15) 0%, rgba(249,115,22,0.2) 80%, rgba(249,115,22,0.8) 100%)'
        }}
      >
        {/* Net Ring Connectors */}
        <div className="w-full h-full flex justify-between px-1 items-center">
          {[...Array(8)].map((_, i) => (
            <span key={i} className="w-1 h-1 rounded-full bg-amber-200" />
          ))}
        </div>
      </div>

      {/* Authentic Cord Net (ตาข่ายบาสเก็ตบอล) with Swish Animation */}
      <div
        className={`absolute left-1/2 -translate-x-1/2 top-[92px] sm:top-[106px] w-20 sm:w-24 z-10 transition-transform duration-300 origin-top ${
          isSwishing
            ? 'animate-[wiggle_0.4s_ease-in-out_infinite] scale-y-125'
            : isAiming
            ? 'scale-y-105'
            : ''
        }`}
      >
        <svg
          viewBox="0 0 100 90"
          className="w-full drop-shadow-md"
          fill="none"
          stroke={isAiming ? '#fde047' : '#ffffff'}
          strokeWidth="1.8"
          strokeLinecap="round"
        >
          {/* Vertical cords tapering down */}
          <path d="M 10 0 L 22 80" opacity="0.9" />
          <path d="M 23 0 L 30 80" opacity="0.9" />
          <path d="M 37 0 L 40 80" opacity="0.9" />
          <path d="M 50 0 L 50 80" opacity="0.9" />
          <path d="M 63 0 L 60 80" opacity="0.9" />
          <path d="M 77 0 L 70 80" opacity="0.9" />
          <path d="M 90 0 L 78 80" opacity="0.9" />

          {/* Diagonal Cross-Knots / Diamond Pattern */}
          <path d="M 12 15 Q 50 22 88 15" strokeDasharray="3,3" opacity="0.8" />
          <path d="M 16 35 Q 50 42 84 35" strokeDasharray="3,3" opacity="0.8" />
          <path d="M 20 55 Q 50 62 80 55" strokeDasharray="3,3" opacity="0.8" />
          <path d="M 24 75 Q 50 80 76 75" strokeWidth="2.2" opacity="0.95" />

          {/* Bottom Hem Loops */}
          <path d="M 24 75 Q 35 84 46 75 Q 57 84 68 75 Q 74 80 76 75" strokeWidth="2" opacity="0.9" />
        </svg>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// Interactive Basketball Upload Zone Component (Can replace or upgrade standard dropzones)
// -------------------------------------------------------------
export function BasketballHoopZone({
  tabKey = 'insights',
  pageNameDisplay = 'วิเคราะห์ข้อมูลด้วย AI',
  fileMeta = null,
  totalUploadedCount = 0,
  theme = 'dark',
  isEn = false,
  onFileDropped,
  onInspectFiles,
  onDeleteFile,
  compact = false
}) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isSwishing, setIsSwishing] = useState(false);
  const fileInputRef = useRef(null);

  const tx = (th, en) => (isEn ? en : th);

  const handleDragOver = e => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragOver) setIsDragOver(true);
  };

  const handleDragLeave = e => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleDrop = e => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    setIsSwishing(true);

    const droppedFile = e.dataTransfer?.files?.[0];
    if (droppedFile) {
      setTimeout(() => {
        setIsSwishing(false);
      }, 1200);
      if (onFileDropped) {
        onFileDropped(tabKey, pageNameDisplay, droppedFile);
      }
    } else {
      setIsSwishing(false);
    }
  };

  const handleFileInputChange = e => {
    const file = e.target.files?.[0];
    if (file) {
      setIsSwishing(true);
      setTimeout(() => {
        setIsSwishing(false);
      }, 1200);
      if (onFileDropped) {
        onFileDropped(tabKey, pageNameDisplay, file);
      }
    }
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      onClick={() => fileInputRef.current?.click()}
      className={`relative rounded-3xl border-2 transition-all duration-300 cursor-pointer overflow-hidden p-4 sm:p-6 ${
        isDragOver
          ? 'scale-[1.018] border-orange-400 bg-gradient-to-r from-orange-500/20 via-amber-500/15 to-orange-600/25 shadow-[0_0_35px_rgba(249,115,22,0.45)] ring-2 ring-orange-400/50'
          : theme === 'dark'
          ? 'border-orange-500/35 bg-gradient-to-r from-[#0d1527] via-[#070b18] to-[#170e06] hover:border-orange-400/60 shadow-xl'
          : 'border-orange-400/60 bg-gradient-to-r from-orange-50/90 via-white to-amber-50/90 hover:border-orange-500 shadow-md'
      }`}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept=".csv,.xlsx,.xls,.json,.txt"
        onChange={handleFileInputChange}
        className="hidden"
      />

      {/* Court Floor Hardwood Lines Ambient Pattern */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none bg-[repeating-linear-gradient(90deg,#000_0px,#000_20px,#f97316_20px,#f97316_21px)]" />

      {/* Dynamic Aiming Trajectory Arc when Aiming (เส้นวิถีการชู้ต) */}
      {isDragOver && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-30"
          style={{ filter: 'drop-shadow(0 0 8px #f97316)' }}
        >
          <defs>
            <linearGradient id="arcGlow" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f97316" stopOpacity="0.8" />
              <stop offset="50%" stopColor="#fbbf24" stopOpacity="1" />
              <stop offset="100%" stopColor="#22c55e" stopOpacity="1" />
            </linearGradient>
          </defs>
          <path
            d="M 120 120 Q 300 15 550 80"
            fill="none"
            stroke="url(#arcGlow)"
            strokeWidth="3.5"
            strokeDasharray="8 6"
            className="animate-[dash_1s_linear_infinite]"
          />
        </svg>
      )}

      <div className="flex flex-col md:flex-row items-center justify-between gap-5 relative z-20">
        {/* Left Side: Basketball + Instructions */}
        <div className="flex items-center gap-4 sm:gap-6 min-w-0 flex-1">
          {/* Animated Basketball */}
          <div className="flex-shrink-0">
            <BasketballGraphic
              size={compact ? 56 : 74}
              isAiming={isDragOver}
              isSwishing={isSwishing}
              className={isDragOver ? 'translate-x-2 -translate-y-2' : ''}
            />
          </div>

          <div className="min-w-0">
            {/* Header Badge */}
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="text-[11px] sm:text-xs font-black px-2.5 py-0.5 rounded-full bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 shadow-md flex items-center gap-1.5">
                <span>🏀</span>
                <span>{tx('สแลมดังก์ไฟล์ข้อมูล', 'Slam Dunk File Ingest')}</span>
                <span className="bg-black/20 px-1.5 py-0.2 rounded-full text-[10px]">✨</span>
              </span>

              {fileMeta ? (
                <span className="text-xs text-emerald-400 font-bold truncate flex items-center gap-1">
                  <span>●</span>
                  <strong>{fileMeta.filename}</strong>
                  <span className="text-[11px] text-slate-400 font-normal">
                    ({(fileMeta.rows || 0).toLocaleString()} {tx('แถว', 'rows')})
                  </span>
                </span>
              ) : (
                <span className="text-xs text-orange-400/90 font-medium truncate flex items-center gap-1">
                  <span>○</span>
                  <span>{tx('พร้อมรับการชู้ตไฟล์ใหม่', 'Ready for incoming file')}</span>
                </span>
              )}
            </div>

            {/* Dynamic Title */}
            <h3
              className={`text-base sm:text-lg font-black transition-colors ${
                isDragOver ? 'text-amber-400' : theme === 'dark' ? 'text-white' : 'text-slate-900'
              }`}
            >
              {isDragOver
                ? tx('🎯 เล็งเข้าห่วงเป้าหมาย! ปล่อยไฟล์ลงเพื่อสแลมดังก์!', '🎯 Target Locked! Release to Slam Dunk into the Hoop!')
                : isSwishing
                ? tx('🔥 SWISH! ชู้ตลงห่วงสำเร็จ กำลังวิเคราะห์ข้อมูล...', '🔥 SWISH! 3-Pointer Sunk! Analyzing Data...')
                : tx(`ชู้ตไฟล์ข้อมูลเข้าสู่ "${pageNameDisplay}"`, `Shoot Data File into "${pageNameDisplay}"`)}
            </h3>

            <p className="text-xs text-slate-400 mt-0.5 line-clamp-1">
              {isDragOver
                ? tx('ปล่อยไฟล์ลงตรงนี้เพื่อบันทึกและสกัดหัวกระดาษ 100%', 'Release file to analyze letterhead with 100% precision')
                : tx(
                    'ลากไฟล์มาเล็งเข้าห่วงบาส หรือคลิกตรงนี้เพื่อเลือกไฟล์ CSV / Excel / JSON',
                    'Drag file to aim at the hoop or click here to browse CSV / Excel / JSON'
                  )}
            </p>
          </div>
        </div>

        {/* Right Side: Basketball Hoop & Backboard Target + Action Buttons */}
        <div className="flex-shrink-0 flex items-center gap-3">
          <div className="flex flex-col sm:flex-row items-center gap-2" onClick={e => e.stopPropagation()}>
            {onInspectFiles && (
              <button
                type="button"
                onClick={onInspectFiles}
                className="px-3 py-1.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-sky-300 border border-sky-400/40 text-xs font-bold cursor-pointer transition shadow-sm flex items-center gap-1.5"
                title={tx('เปิดดูเนื้อหาในไฟล์ที่อัปโหลดทั้งหมด', 'Inspect all uploaded files')}
              >
                <span>📂</span>
                <span className="truncate">{tx(`คลังไฟล์ (${totalUploadedCount})`, `Files (${totalUploadedCount})`)}</span>
              </button>
            )}

            {fileMeta && onDeleteFile && (
              <button
                type="button"
                onClick={onDeleteFile}
                className="px-3 py-1.5 rounded-full bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-xs font-bold cursor-pointer transition shadow-sm flex items-center gap-1"
                title={tx('ลบไฟล์นี้ออกจากหน้านี้', 'Remove this file')}
              >
                <span>🗑️</span>
                <span>{tx('ลบไฟล์', 'Remove')}</span>
              </button>
            )}
          </div>

          <div className="flex flex-col items-center">
            <BasketballHoop isAiming={isDragOver} isSwishing={isSwishing} scale={compact ? 0.75 : 0.9} />
            <span
              className={`text-[10px] font-black uppercase tracking-wider mt-1 px-2 py-0.5 rounded-full transition-all ${
                isDragOver
                  ? 'bg-amber-400 text-slate-950 font-black shadow-[0_0_10px_#fbbf24]'
                  : 'text-slate-400'
              }`}
            >
              {isDragOver ? tx('🎯 AIMING / กำลังเล็ง', 'TARGET LOCKED') : tx('HOOP RIM / ห่วงบาส', 'HOOP RIM')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// Universal Central Basketball Modal Hub (ศูนย์อัปโหลดบาสเก็ตบอลส่วนกลาง)
// -------------------------------------------------------------
export function BasketballCourtModal({
  isOpen,
  onClose,
  lang = 'th',
  theme = 'dark',
  onFileDispatched,
  setActiveTab
}) {
  const isEn = lang === 'en';
  const tx = (th, en) => (isEn ? en : th);

  const [isDragOver, setIsDragOver] = useState(false);
  const [isSwishing, setIsSwishing] = useState(false);
  const [lastDispatched, setLastDispatched] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      setIsDragOver(false);
      setIsSwishing(false);
      setLastDispatched(null);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleProcessFile = file => {
    if (!file) return;

    setIsSwishing(true);

    const reader = new FileReader();
    reader.onload = evt => {
      const rawText = String(evt.target?.result || '').replace(/^\uFEFF/, '').trim();
      const rawLines = rawText.split(/\r?\n/).filter(Boolean);
      const headers = rawLines[0] ? rawLines[0].split(/[,\t;|]/).map(h => h.trim().replace(/^["']|["']$/g, '')) : [];
      const sampleRows = rawLines.slice(1, 4).map(l => l.split(/[,\t;|]/).map(c => c.trim()));

      // 1. Classify with AI
      const classified = classifyUploadedFile(file.name, headers, sampleRows, rawText);

      setTimeout(() => {
        setIsSwishing(false);
        setLastDispatched({
          file,
          classified,
          headersCount: headers.length,
          rowsCount: Math.max(0, rawLines.length - 1),
          matchedModules: classified.matchedModules || [classified],
          allTargetKeys: classified.allTargetKeys || [classified.key]
        });

        // 2. Dispatch to target module and ALL matching modules via Central File Ingest Hub
        if (onFileDispatched) {
          onFileDispatched(classified.key, classified.labelTh, file, {
            isCentralShoot: true,
            matchedKeys: classified.allTargetKeys,
            matchedModules: classified.matchedModules
          });
        }

        toast.success(
          tx(
            `🏀 SWISH! ชู้ตไฟล์เข้าสู่ศูนย์กลางสำเร็จ! ตรวจพบข้อมูล [${classified.labelTh}] ทุกหน้าที่เกี่ยวข้องเชื่อมต่อข้อมูลแล้ว!`,
            `🏀 SWISH! Central shoot complete! Detected [${classified.labelEn}]. All relevant pages connected!`
          ),
          { duration: 5500, icon: '🏀' }
        );
      }, 950);
    };
    reader.readAsText(file);
  };

  const handleDrop = e => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    const file = e.dataTransfer?.files?.[0];
    if (file) handleProcessFile(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-xl animate-fadeIn">
      {/* Basketball Court Stadium Modal Card */}
      <div
        className={`w-full max-w-2xl rounded-3xl border-2 transition-all shadow-[0_25px_60px_-15px_rgba(249,115,22,0.3)] relative overflow-hidden flex flex-col ${
          theme === 'dark'
            ? 'bg-gradient-to-b from-[#0b1022] via-[#040817] to-[#120a04] border-orange-500/50 text-white'
            : 'bg-gradient-to-b from-white via-orange-50/50 to-amber-50 border-orange-400 text-slate-900'
        }`}
      >
        {/* Stadium Floodlight Ambient Beams */}
        <div className="absolute top-0 left-1/4 w-72 h-40 bg-orange-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-0 right-1/4 w-72 h-40 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header Bar */}
        <div className="px-5 py-4 border-b border-orange-500/20 flex items-center justify-between relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-orange-600 to-amber-400 flex items-center justify-center shadow-lg text-xl">
              🏀
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-base sm:text-lg">
                  {tx('ศูนย์อัปโหลดไฟล์กลาง (ชู้ตไฟล์บาสเก็ตบอล Universal Central Ingest Hub)', 'Universal Central File Ingest Hub (Basketball Shoot)')}
                </h3>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                  {tx('ศูนย์ไฟล์กลาง • ทุกหน้ามารับข้อมูลที่นี่', 'Central Hub • All Pages Ingest Here')}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                {tx(
                  'ชู้ตไฟล์เข้าห่วงนี้เป็นจุดอัปโหลดไฟล์กลาง ทุกหน้าในระบบ (จุดสั่งซื้อ ROP, ปฏิทินหวย/สิ้นเดือน, ระบบแนะนำ AI Playbooks, POS, คลังสินค้า) จะมารับและเชื่อมต่อข้อมูลจากชู้ตไฟล์ทันที',
                  'Shoot any file into this central hoop. Every page (ROP Restock, Payday/Lottery Calendar, AI Playbooks, POS, Inventory) reads & connects to this central data.'
                )}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-300 hover:text-white transition cursor-pointer"
          >
            ✕
          </button>
        </div>

        {/* Modal Body: Basketball Court Court Dropzone */}
        <div className="p-5 sm:p-8 flex flex-col items-center text-center relative z-10">
          {/* Main Interactive Basketball Court Target Area */}
          <div
            onDragOver={e => {
              e.preventDefault();
              e.stopPropagation();
              if (!isDragOver) setIsDragOver(true);
            }}
            onDragLeave={e => {
              e.preventDefault();
              e.stopPropagation();
              setIsDragOver(false);
            }}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={`w-full py-8 sm:py-12 px-4 rounded-3xl border-3 border-dashed cursor-pointer transition-all duration-300 relative overflow-hidden flex flex-col items-center justify-center ${
              isDragOver
                ? 'border-orange-400 bg-orange-500/20 shadow-[0_0_45px_rgba(249,115,22,0.6)] scale-[1.02]'
                : theme === 'dark'
                ? 'border-orange-500/40 bg-black/40 hover:border-orange-400/80 hover:bg-orange-500/5'
                : 'border-orange-400/60 bg-white/70 hover:border-orange-500 hover:bg-orange-50/50'
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,.xlsx,.xls,.json,.txt"
              onChange={e => {
                const file = e.target.files?.[0];
                if (file) handleProcessFile(file);
              }}
              className="hidden"
            />

            {/* Basketball Court Key & Free-Throw Circle Floor Graphics */}
            <div className="absolute inset-x-0 bottom-0 h-28 opacity-10 pointer-events-none flex justify-center items-end">
              <div className="w-48 h-24 border-2 border-orange-500 rounded-t-full" />
            </div>

            {/* Backboard & Rim */}
            <div className="mb-4">
              <BasketballHoop isAiming={isDragOver} isSwishing={isSwishing} scale={1.15} />
            </div>

            {/* Floating Basketball Ready to Shoot */}
            <div className="my-2">
              <BasketballGraphic size={82} isAiming={isDragOver} isSwishing={isSwishing} />
            </div>

            {/* Instruction Callout */}
            <div className="mt-4 max-w-md">
              <div
                className={`text-base sm:text-xl font-black transition-colors ${
                  isDragOver ? 'text-amber-300 animate-pulse' : 'text-orange-400'
                }`}
              >
                {isDragOver
                  ? tx('🎯 กำลังเล็งเข้าห่วงเป้าหมาย! ปล่อยเพื่อชู้ตเลย!', '🎯 Target Locked! Release to shoot!')
                  : isSwishing
                  ? tx('🔥 SWISH! สแลมดังก์ลงห่วงแล้ว!', '🔥 SWISH! 3-Pointer Sunk!')
                  : tx('🏀 ลากไฟล์มาเล็งเข้าห่วง หรือคลิกเพื่อชู้ตไฟล์', '🏀 Drag file to aim at the hoop, or click to shoot')}
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {tx(
                  'รองรับไฟล์ CSV, Excel (.xlsx, .xls), JSON, และ Text ระบบจะตรวจจับและจัดหมวดหมู่อัตโนมัติ',
                  'Supports CSV, Excel (.xlsx, .xls), JSON, and Text. AI will auto-dispatch.'
                )}
              </p>
            </div>
          </div>

          {/* Result Card when a file was just dispatched */}
          {lastDispatched && (
            <div className="w-full mt-4 p-4 sm:p-5 rounded-2xl bg-emerald-500/10 border-2 border-emerald-500/40 text-left flex flex-col gap-3.5 animate-fadeIn">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-emerald-500/20 pb-3">
                <div className="flex items-center gap-3">
                  <span className="text-3xl sm:text-4xl">{lastDispatched.classified.icon}</span>
                  <div>
                    <div className="text-xs text-emerald-400 font-bold flex items-center gap-1.5">
                      <span>✓ {tx('ชู้ตไฟล์เข้าสู่ศูนย์กลางสำเร็จ', 'Central Ingest Successful')}</span>
                      <span className="text-slate-400">•</span>
                      <span className="text-white font-mono">{lastDispatched.file.name}</span>
                    </div>
                    <div className="text-sm sm:text-base font-black text-white mt-0.5">
                      {tx('เชื่อมต่อข้อมูลกลาง & กระจายสู่ทุกหน้าเรียบร้อยแล้ว', 'Connected to Central Hub & Synced Across All Pages')}
                      <span className="text-xs text-emerald-300 font-normal ml-2">
                        ({lastDispatched.rowsCount.toLocaleString()} {tx('แถว', 'rows')} • {lastDispatched.headersCount} {tx('คอลัมน์', 'cols')})
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  {setActiveTab && (
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab(lastDispatched.classified.key);
                        onClose();
                      }}
                      className="flex-1 sm:flex-initial px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition cursor-pointer shadow-md flex items-center justify-center gap-1.5"
                    >
                      <span>🚀</span>
                      <span>{tx('ไปดูหน้าที่ตรงที่สุด', 'Jump to Best Match')}</span>
                    </button>
                  )}
                  {setActiveTab && (
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab('insights');
                        onClose();
                      }}
                      className="flex-1 sm:flex-initial px-3.5 py-2 rounded-xl bg-orange-500/20 hover:bg-orange-500/30 text-orange-300 border border-orange-500/40 font-bold text-xs transition cursor-pointer flex items-center justify-center gap-1.5"
                    >
                      <span>🧠</span>
                      <span>{tx('ดูบทวิเคราะห์ AI', 'View AI Analysis')}</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Connected Pages Pill Badges */}
              <div>
                <div className="text-[11px] font-black text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <span className="text-emerald-400">⚡</span>
                  <span>{tx('ทุกหน้าที่ดึงข้อมูลจากชู้ตไฟล์ไปวิเคราะห์ทันที:', 'Pages directly reading data from this shoot file:')}</span>
                </div>
                <div className="flex flex-wrap gap-1.5 text-xs">
                  {[
                    { key: 'inventory', icon: '📦', name: 'จุดสั่งซื้อสินค้า ROP' },
                    { key: 'overview', icon: '🗓️', name: 'ปฏิทินวันหวยออกสิ้นเดือน' },
                    { key: 'insights', icon: '🤖', name: 'ระบบแนะนำการกระทำ AI' },
                    { key: 'staff_pos', icon: '💳', name: 'พนักงาน & POS' },
                    { key: 'customers', icon: '👥', name: 'ลูกค้า CRM' },
                    { key: 'multi_channel', icon: '🌐', name: 'สาขา & ออนไลน์' },
                    { key: 'procurement', icon: '🏢', name: 'จัดซื้อรวมศูนย์' },
                    { key: 'bi_studio', icon: '📈', name: 'Executive BI' },
                    { key: 'database', icon: '🗄️', name: 'Master DB' }
                  ].map(pill => (
                    <button
                      key={pill.key}
                      type="button"
                      onClick={() => {
                        if (setActiveTab) setActiveTab(pill.key);
                        onClose();
                      }}
                      className="px-2.5 py-1 rounded-lg bg-black/40 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-200 text-[11px] font-bold flex items-center gap-1 transition cursor-pointer"
                    >
                      <span>{pill.icon}</span>
                      <span>{pill.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Auto-Dispatch Module Legend */}
          <div className="mt-5 w-full">
            <div className="text-xs font-bold text-slate-400 mb-2 uppercase tracking-wider text-left">
              🎯 {tx('AI Auto-Dispatch เชื่อมโยง 7 ระบบอัตโนมัติ:', 'AI Auto-Dispatch routes to 7 modules:')}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs text-left">
              {[
                { name: 'คลังสินค้า & สต็อก', key: 'inventory', icon: '📦' },
                { name: 'ลูกค้าประจำ & CRM', key: 'customers', icon: '👥' },
                { name: 'พนักงาน & แคชเชียร์ POS', key: 'staff_pos', icon: '💳' },
                { name: 'สาขา & ช่องทางขาย', key: 'multi_channel', icon: '🌐' },
                { name: 'จัดซื้อ & คู่ค้า', key: 'procurement', icon: '🏢' },
                { name: 'ยอดขาย & เป้าหมาย', key: 'overview', icon: '📊' },
                { name: 'BI Studio & รายงาน', key: 'bi_studio', icon: '📈' },
                { name: 'บทวิเคราะห์ AI กลยุทธ์', key: 'insights', icon: '🧠' }
              ].map(m => (
                <div
                  key={m.key}
                  className="p-2 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2 truncate"
                >
                  <span>{m.icon}</span>
                  <span className="truncate text-slate-300">{m.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// Basketball Quick Action Button (for Top Header Bar)
// -------------------------------------------------------------
export function BasketballQuickButton({ onClick, isEn = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-3 sm:px-3.5 py-1.5 sm:py-2 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-slate-950 font-black text-xs sm:text-sm flex items-center gap-1.5 sm:gap-2 transition-all shadow-md hover:shadow-orange-500/30 hover:scale-105 cursor-pointer flex-shrink-0"
      title={isEn ? 'Universal Basketball File Dropzone' : 'ชู้ตไฟล์ส่วนกลาง (Basketball Ingest)'}
    >
      <span className="text-sm sm:text-base animate-bounce">🏀</span>
      <span className="hidden sm:inline font-black">
        {isEn ? 'Shoot File' : 'ชู้ตไฟล์ส่วนกลาง'}
      </span>
      <span className="sm:hidden font-black">{isEn ? 'Shoot' : 'ชู้ตไฟล์'}</span>
    </button>
  );
}
