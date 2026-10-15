// ==============================================================================
// File: src/components/CuteCatAnnouncementBoard.jsx
// Description: ป้ายประกาศน้องแมวส้มอัจฉริยะ (Cute Ginger Cat Announcement Billboard)
//              มาพร้อมน้องแมวส้ม 3D เคลื่อนไหวได้ (โบกอุ้งเท้า หางแกว่ง กระดิกหู
//              ถือโทรโข่งทองคำ ตาหยีเคลิ้มเมื่อคลิกลูบหัว) พร้อมระบบสไลด์ประกาศอัตโนมัติ
// ==============================================================================

import React, { useState, useEffect, useRef } from 'react';

export default function CuteCatAnnouncementBoard({
  isEn = false,
  onNavigateTab,
  onOpenPricing,
  className = ''
}) {
  const tx = (th, en) => (isEn ? en : th);

  // Announcement items list
  const announcements = [
    {
      id: 'etl-pipeline',
      tagTh: '⚡ อัปเดตใหญ่',
      tagEn: '⚡ MAJOR UPDATE',
      tagColor: 'from-amber-400 to-amber-500 text-slate-950',
      titleTh: 'เปิดตัวท่อส่งข้อมูลอัตโนมัติ (ETL Pipeline) & คลังข้อมูลความเร็วสูง',
      titleEn: 'Automated ETL Pipeline & Ultra-Fast Cloud Data Warehouse is Live',
      descTh: 'เชื่อมต่อและรวมยอดขายจาก POS หน้าร้าน, Facebook Ads, TikTok Shop และ Google Sheets ได้ในคลิกเดียว พร้อมระบบตรวจจับข้อมูลซ้ำซ้อนอัตโนมัติ เหมียว~',
      descEn: 'Seamlessly aggregate POS, Facebook Ads, TikTok Shop & Google Sheets in one click with automated deduplication & instant sync.',
      actionTh: 'ดูท่อข้อมูล ETL',
      actionEn: 'View ETL Pipeline',
      targetTab: 'database',
      catMood: 'proud' // proud, waving, happy, alert
    },
    {
      id: 'ai-analyst',
      tagTh: '🤖 ปัญญาประดิษฐ์',
      tagEn: '🤖 AI ASSISTANT',
      tagColor: 'from-sky-400 to-blue-500 text-slate-950',
      titleTh: 'ผู้ช่วย AI วิเคราะห์ยอดขาย (Text-to-SQL) & จำลองสถานการณ์ What-If',
      titleEn: 'Executive AI Text-to-SQL Analyst & What-If Scenario Simulator Ready',
      descTh: 'พิมพ์ถามคำถามธุรกิจเป็นภาษาคน เช่น "เดือนนี้สินค้าตัวไหนทำกำไรสูงสุด?" ระบบจะตอบพร้อมสร้างตารางและกราฟให้ทันทีค้าบ!',
      descEn: 'Ask business questions in natural plain language and get instant executive-level SQL charts & actionable margin insights.',
      actionTh: 'ลองคุยกับ AI',
      actionEn: 'Ask AI Analyst',
      targetTab: 'ai_analyst',
      catMood: 'waving'
    },
    {
      id: 'data-governance',
      tagTh: '🛡️ มาตรฐานองค์กร',
      tagEn: '🛡️ DATA GOVERNANCE',
      tagColor: 'from-emerald-400 to-teal-500 text-slate-950',
      titleTh: 'ระบบควบคุมสิทธิ์ RBAC & ด่านกักกันข้อมูลขยะ (Data Quality Firewall)',
      titleEn: 'Enterprise RBAC Access Control & 5-Point Data Quarantine Gatekeeper',
      descTh: 'แยกสิทธิ์เจ้าของร้าน vs ผู้จัดการ vs แคชเชียร์ ป้องกันข้อมูลรั่วไหล 100% พร้อมตรวจจับราคายอดขายติดลบก่อนเข้ากราฟ',
      descEn: 'Isolate sensitive margin data between Owner, Store Manager & Cashier. Block corrupt rows before contaminating charts.',
      actionTh: 'ดูระบบความปลอดภัย',
      actionEn: 'Explore Governance',
      targetTab: 'database',
      catMood: 'alert'
    },
    {
      id: 'line-alert',
      tagTh: '🔔 แจ้งเตือนอัตโนมัติ',
      tagEn: '🔔 AUTO ALERTS',
      tagColor: 'from-purple-400 to-pink-500 text-white',
      titleTh: 'ระบบสรุปยอดขายส่งตรงเข้ามือถือ/LINE ทุกคืน 22:00 น.',
      titleEn: 'Automated 22:00 Daily Sales & Profit Summary to LINE / Mobile',
      descTh: 'ไม่ต้องเปิดหน้าจอทั้งวัน ระบบจะสรุปรายรับ กำไรสุทธิ และสินค้าขายดีส่งเข้าไลน์ให้คุณทันทีทุกคืน ไม่พลาดทุกความเคลื่อนไหว เหมียว~',
      descEn: 'Stay updated without opening dashboards. Get automated nightly gross margin and best-seller reports pushed right to your phone.',
      actionTh: 'ตั้งค่าแจ้งเตือน',
      actionEn: 'Configure Alerts',
      targetTab: 'analytics',
      catMood: 'happy'
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [petHearts, setPetHearts] = useState([]);
  const [catSpeech, setCatSpeech] = useState(null);
  const [isWiggling, setIsWiggling] = useState(false);

  const currentItem = announcements[currentIndex];
  const autoPlayRef = useRef(null);

  // Auto-play announcement slide every 7 seconds
  useEffect(() => {
    if (isPaused || isMinimized) return;
    autoPlayRef.current = setInterval(() => {
      handleNextSlide();
    }, 7000);
    return () => clearInterval(autoPlayRef.current);
  }, [currentIndex, isPaused, isMinimized]);

  const handleNextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % announcements.length);
    triggerCatBounce();
  };

  const handlePrevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + announcements.length) % announcements.length);
    triggerCatBounce();
  };

  const triggerCatBounce = () => {
    setIsWiggling(true);
    setTimeout(() => setIsWiggling(false), 600);
  };

  // Pet the cat interaction (ลูบหัวน้องแมว)
  const handlePetCat = (e) => {
    e.stopPropagation();
    triggerCatBounce();

    // Spawn floating heart
    const newHeart = {
      id: Date.now() + Math.random(),
      x: 30 + Math.random() * 40,
      y: 10 + Math.random() * 20
    };
    setPetHearts((prev) => [...prev.slice(-4), newHeart]);
    setTimeout(() => {
      setPetHearts((prev) => prev.filter((h) => h.id !== newHeart.id));
    }, 1200);

    // Cute meow messages
    const meowQuotes = [
      tx('เหมียววว~ นุดลูบหัวเค้าแล้ว! ขอบคุณนะค้าบ 🐾✨', 'Purrrr~ Thanks for petting me, hooman! 🐾✨'),
      tx('มีประกาศด่วนรออยู่นะนุด อ่านรึยังเอ่ย? 🐱📢', 'Check out the new announcements, hooman! 🐱📢'),
      tx(' InsightFlow ช่วยให้ร้านขายดีขึ้น กำไรพุ่งพรวด เหมียว~', 'InsightFlow makes your store sales skyrocket! Meow~'),
      tx('เค้าคอยเฝ้าป้ายประกาศให้ตลอด 24 ชม. เลยนะงับ! 💖', 'I am guarding this notice board 24/7 for you! 💖')
    ];
    const quote = meowQuotes[Math.floor(Math.random() * meowQuotes.length)];
    setCatSpeech(quote);

    setTimeout(() => {
      setCatSpeech(null);
    }, 3500);
  };

  const handleActionClick = () => {
    if (currentItem.targetTab && typeof onNavigateTab === 'function') {
      onNavigateTab(currentItem.targetTab);
    } else if (typeof onOpenPricing === 'function') {
      onOpenPricing();
    }
  };

  // ----------------------------------------------------------------------------
  // Render Minimized Floating Mascot Capsule
  // ----------------------------------------------------------------------------
  if (isMinimized) {
    return (
      <aside
        aria-label="Cute Cat Announcement Mascot"
        className={`relative z-30 transition-all duration-300 ${className}`}
      >
        <button
          type="button"
          onClick={() => {
            setIsMinimized(false);
            triggerCatBounce();
          }}
          className="group relative flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-gradient-to-r from-amber-500/20 via-slate-900/90 to-amber-400/20 border-2 border-amber-400/60 shadow-[0_10px_30px_rgba(251,191,36,0.35)] backdrop-blur-xl hover:scale-105 active:scale-95 transition-transform duration-200 cursor-pointer"
          title={tx('คลิกเพื่อเปิดป้ายประกาศน้องแมวส้ม', 'Click to open Cute Cat Announcement Board')}
        >
          {/* Pulsing Sonar Ring */}
          <span className="absolute -inset-1 rounded-2xl border border-amber-400/40 animate-ping pointer-events-none" />

          {/* Mini Cute Cat Head Avatar */}
          <div className="relative w-8 h-8 flex-shrink-0">
            <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow">
              <defs>
                <linearGradient id="miniCatFur" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#FDBA74" />
                  <stop offset="60%" stopColor="#FB923C" />
                  <stop offset="100%" stopColor="#EA580C" />
                </linearGradient>
              </defs>
              {/* Ears */}
              <polygon points="20,40 32,15 48,32" fill="#EA580C" stroke="#7C2D12" strokeWidth="3" />
              <polygon points="52,32 68,15 80,40" fill="#EA580C" stroke="#7C2D12" strokeWidth="3" />
              <polygon points="26,38 34,22 44,32" fill="#FDA4AF" />
              <polygon points="56,32 66,22 74,38" fill="#FDA4AF" />
              {/* Head */}
              <ellipse cx="50" cy="55" rx="35" ry="30" fill="url(#miniCatFur)" stroke="#7C2D12" strokeWidth="3.5" />
              {/* Eyes */}
              <ellipse cx="36" cy="52" rx="6" ry="7" fill="#047857" />
              <ellipse cx="36" cy="52" rx="2.5" ry="6.5" fill="#0F172A" />
              <circle cx="34" cy="49" r="2.2" fill="#FFFFFF" />
              <ellipse cx="64" cy="52" rx="6" ry="7" fill="#047857" />
              <ellipse cx="64" cy="52" rx="2.5" ry="6.5" fill="#0F172A" />
              <circle cx="62" cy="49" r="2.2" fill="#FFFFFF" />
              {/* Nose & Mouth */}
              <polygon points="50,62 46,58 54,58" fill="#FDA4AF" stroke="#7C2D12" strokeWidth="1" />
              <path d="M45 64 Q50 67 50 63 Q50 67 55 64" stroke="#7C2D12" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              {/* Bell */}
              <circle cx="50" cy="84" r="5" fill="#FBBF24" stroke="#78350F" strokeWidth="1.5" />
            </svg>
          </div>

          <div className="text-left">
            <div className="flex items-center gap-1.5">
              <span className="text-xs font-black bg-gradient-to-r from-amber-300 to-yellow-200 bg-clip-text text-transparent">
                {tx('ป้ายประกาศน้องแมวส้ม', 'Cat Notice Board')}
              </span>
              <span className="text-[10px] font-black px-1.5 py-0.2 rounded-full bg-amber-400 text-slate-950">
                {announcements.length}
              </span>
            </div>
            <p className="text-[11px] text-amber-200/90 font-bold truncate max-w-[200px]">
              📢 {tx(currentItem.titleTh, currentItem.titleEn)}
            </p>
          </div>

          <span className="text-xs text-amber-400 font-black ml-1 group-hover:translate-x-1 transition-transform">
            👉
          </span>
        </button>
      </aside>
    );
  }

  // ----------------------------------------------------------------------------
  // Render Full Luxury Announcement Billboard with 3D Animated Cat
  // ----------------------------------------------------------------------------
  return (
    <div
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className={`relative w-full rounded-2xl sm:rounded-3xl overflow-hidden border-2 border-amber-400/50 bg-gradient-to-r from-[#070d1e]/98 via-[#0b162f]/98 to-[#0a1124]/98 shadow-[0_18px_50px_-10px_rgba(251,191,36,0.28),0_0_20px_rgba(56,189,248,0.18)] text-white backdrop-blur-2xl transition-all duration-300 ${className}`}
    >
      {/* Top Gold Shimmer Neon Line */}
      <div className="h-1.5 w-full bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 shadow-[0_0_12px_#fbbf24]" />

      {/* Moving Ambient Laser Beam */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="toast-laser-beam absolute -inset-y-8 w-28 bg-gradient-to-r from-transparent via-amber-300/15 to-transparent" />
      </div>

      <div className="relative p-3.5 sm:p-5 flex flex-col md:flex-row items-center md:items-stretch gap-4 sm:gap-6">
        {/* ==================================================================== */}
        {/* LEFT: 3D ANIMATED ORANGE CAT MASCOT WITH LIVELY POSES & ACCESSORIES */}
        {/* ==================================================================== */}
        <div
          onClick={handlePetCat}
          className="relative flex-shrink-0 flex flex-col items-center justify-center cursor-pointer select-none group"
          title={tx('คลิกลูบหัวน้องแมวส้ม หรือฟังเสียงประกาศได้นะ! 🐾', 'Click to pet the cat or hear meow!')}
        >
          {/* Floating Hearts Container */}
          {petHearts.map((h) => (
            <div
              key={h.id}
              className="absolute text-rose-400 font-black text-xl cute-heart-float z-30"
              style={{ left: `${h.x}%`, top: `${h.y}%` }}
            >
              💖
            </div>
          ))}

          {/* Speech Bubble when Clicked */}
          {catSpeech && (
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-1.5 rounded-2xl bg-amber-400 text-slate-950 font-black text-xs shadow-xl border-2 border-white animate-bounce z-40">
              {catSpeech}
              {/* Speech triangle */}
              <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-amber-400 rotate-45 border-r-2 border-b-2 border-white" />
            </div>
          )}

          {/* Cat SVG Illustration Container */}
          <div
            className={`relative w-28 h-28 sm:w-32 sm:h-32 transition-transform duration-300 ${
              isWiggling ? 'scale-110 rotate-3' : 'group-hover:scale-105'
            }`}
          >
            {/* Glowing Orb Backdrop behind Cat */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-500/30 to-yellow-300/20 blur-xl pointer-events-none" />

            <svg
              viewBox="0 0 160 160"
              className="w-full h-full filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.5)]"
            >
              <defs>
                {/* 1. Realistic Orange Fur Gradients */}
                <linearGradient id="boardFurDeep" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#EA580C" />
                  <stop offset="50%" stopColor="#C2410C" />
                  <stop offset="100%" stopColor="#9A3412" />
                </linearGradient>

                <linearGradient id="boardFurLight" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#FED7AA" />
                  <stop offset="40%" stopColor="#FB923C" />
                  <stop offset="100%" stopColor="#F97316" />
                </linearGradient>

                <linearGradient id="boardStripes" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#C2410C" />
                  <stop offset="100%" stopColor="#7C2D12" />
                </linearGradient>

                <linearGradient id="boardPink" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#FDA4AF" />
                  <stop offset="100%" stopColor="#F43F5E" />
                </linearGradient>

                <linearGradient id="boardCream" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FFFBEB" />
                  <stop offset="100%" stopColor="#FEF3C7" />
                </linearGradient>

                <radialGradient id="boardCatEye" cx="40%" cy="35%" r="65%">
                  <stop offset="0%" stopColor="#6EE7B7" />
                  <stop offset="45%" stopColor="#10B981" />
                  <stop offset="85%" stopColor="#047857" />
                  <stop offset="100%" stopColor="#064E3B" />
                </radialGradient>

                <linearGradient id="goldMegaphone" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#FFFBEB" />
                  <stop offset="35%" stopColor="#FDE047" />
                  <stop offset="70%" stopColor="#F59E0B" />
                  <stop offset="100%" stopColor="#B45309" />
                </linearGradient>
              </defs>

              {/* 1. Tail Swishing */}
              <g className="cute-cat-tail origin-[35px_110px]">
                <path
                  d="M38 115 C20 105 10 75 22 55 C28 45 42 50 36 62 C30 74 32 92 46 108 Z"
                  fill="url(#boardFurDeep)"
                  stroke="#7C2D12"
                  strokeWidth="3"
                />
                <path d="M20 60 C25 56 32 58 30 66" stroke="url(#boardStripes)" strokeWidth="3" strokeLinecap="round" />
                <path d="M23 75 C29 70 36 74 34 82" stroke="url(#boardStripes)" strokeWidth="3" strokeLinecap="round" />
              </g>

              {/* 2. Chubby Cat Body */}
              <ellipse
                cx="80"
                cy="110"
                rx="38"
                ry="32"
                fill="url(#boardFurLight)"
                stroke="#7C2D12"
                strokeWidth="3.5"
              />

              {/* Back Fur Stripes */}
              <path d="M52 95 C62 90 68 96 66 106" stroke="url(#boardStripes)" strokeWidth="3.5" strokeLinecap="round" />
              <path d="M48 108 C58 104 64 110 62 118" stroke="url(#boardStripes)" strokeWidth="3.5" strokeLinecap="round" />

              {/* Fluffy White Chest Bib */}
              <path
                d="M72 88 C88 88 98 98 94 116 C90 128 74 134 66 126 C72 116 72 98 72 88 Z"
                fill="url(#boardCream)"
                opacity="0.95"
              />

              {/* Hind Paws (Sitting Cute) */}
              <ellipse cx="50" cy="136" rx="11" ry="8" fill="url(#boardCream)" stroke="#7C2D12" strokeWidth="2.5" />
              <ellipse cx="110" cy="136" rx="11" ry="8" fill="url(#boardCream)" stroke="#7C2D12" strokeWidth="2.5" />
              {/* Pink Toe Beans */}
              <circle cx="50" cy="136" r="3.2" fill="url(#boardPink)" />
              <circle cx="110" cy="136" r="3.2" fill="url(#boardPink)" />

              {/* 3. Front Left Paw (Resting / Holding Board) */}
              <ellipse cx="68" cy="132" rx="9" ry="14" fill="url(#boardCream)" stroke="#7C2D12" strokeWidth="2.5" />
              <circle cx="68" cy="138" r="3" fill="url(#boardPink)" />

              {/* 4. Front Right Paw (Waving Paw or Holding 3D Golden Megaphone) */}
              <g className="cute-cat-waving-paw origin-[100px_100px]">
                {/* Arm */}
                <ellipse cx="106" cy="98" rx="8" ry="16" fill="url(#boardFurLight)" stroke="#7C2D12" strokeWidth="2.5" />
                <ellipse cx="106" cy="85" rx="9" ry="7" fill="url(#boardCream)" stroke="#7C2D12" strokeWidth="2.5" />
                <circle cx="106" cy="85" r="3" fill="url(#boardPink)" />

                {/* 3D Golden Megaphone in Paw */}
                <g transform="translate(108, 68) rotate(-15)">
                  {/* Megaphone Cone */}
                  <polygon points="12,12 36,4 36,24" fill="url(#goldMegaphone)" stroke="#78350F" strokeWidth="2" />
                  <ellipse cx="36" cy="14" rx="4" ry="10" fill="#FEF08A" stroke="#78350F" strokeWidth="1.8" />
                  {/* Megaphone Body & Handle */}
                  <rect x="2" y="9" width="10" height="6" rx="2" fill="url(#goldMegaphone)" stroke="#78350F" strokeWidth="1.5" />
                  <path d="M6 15 L4 25 L8 25 Z" fill="#92400E" stroke="#78350F" strokeWidth="1.2" />
                  {/* Sound Wave Rings */}
                  <path d="M42 6 C48 10 48 18 42 22" stroke="#FDE047" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.9" />
                  <path d="M48 2 C56 8 56 22 48 28" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.75" />
                </g>
              </g>

              {/* 5. Cat Head */}
              {/* Ears */}
              <polygon points="46,45 60,15 76,40" fill="url(#boardFurDeep)" stroke="#7C2D12" strokeWidth="3" strokeLinejoin="round" />
              <polygon points="52,42 61,22 70,38" fill="url(#boardPink)" opacity="0.9" />
              <polygon points="86,40 102,15 116,45" fill="url(#boardFurDeep)" stroke="#7C2D12" strokeWidth="3" strokeLinejoin="round" />
              <polygon points="92,38 101,22 110,42" fill="url(#boardPink)" opacity="0.9" />

              {/* Head Base */}
              <ellipse cx="80" cy="58" rx="35" ry="30" fill="url(#boardFurLight)" stroke="#7C2D12" strokeWidth="3.5" />

              {/* Forehead Classic Tabby "M" Marking */}
              <path d="M72 32 L80 42 L88 32" stroke="url(#boardStripes)" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <line x1="80" y1="30" x2="80" y2="40" stroke="url(#boardStripes)" strokeWidth="2.8" strokeLinecap="round" />

              {/* Rosy Cheeks */}
              <ellipse cx="56" cy="65" rx="6" ry="4" fill="#FB7185" opacity="0.8" />
              <ellipse cx="104" cy="65" rx="6" ry="4" fill="#FB7185" opacity="0.8" />

              {/* Almond Emerald Eyes (or Happy Squint if pet) */}
              {catSpeech ? (
                /* Happy Squint Eyes (^ ^) */
                <g>
                  <path d="M60 54 Q66 48 72 54" stroke="#7C2D12" strokeWidth="3" strokeLinecap="round" fill="none" />
                  <path d="M88 54 Q94 48 100 54" stroke="#7C2D12" strokeWidth="3" strokeLinecap="round" fill="none" />
                </g>
              ) : (
                /* Sparkling Emerald Eyes */
                <g>
                  <ellipse cx="66" cy="54" rx="7" ry="8" fill="url(#boardCatEye)" stroke="#064E3B" strokeWidth="1.8" />
                  <ellipse cx="66" cy="54" rx="2.8" ry="7.2" fill="#020617" />
                  <circle cx="64" cy="50" r="2.8" fill="#FFFFFF" />
                  <circle cx="68" cy="56" r="1.4" fill="#FFFFFF" />

                  <ellipse cx="94" cy="54" rx="7" ry="8" fill="url(#boardCatEye)" stroke="#064E3B" strokeWidth="1.8" />
                  <ellipse cx="94" cy="54" rx="2.8" ry="7.2" fill="#020617" />
                  <circle cx="92" cy="50" r="2.8" fill="#FFFFFF" />
                  <circle cx="96" cy="56" r="1.4" fill="#FFFFFF" />
                </g>
              )}

              {/* White Whisker Muzzle Pads */}
              <ellipse cx="80" cy="68" rx="13" ry="9" fill="url(#boardCream)" stroke="#7C2D12" strokeWidth="1.5" />

              {/* Pink Nose */}
              <polygon points="80,65 75,61 85,61" fill="url(#boardPink)" stroke="#7C2D12" strokeWidth="1" />

              {/* Sweet Mouth */}
              <path d="M74 68 Q80 72 80 67 Q80 72 86 68" stroke="#7C2D12" strokeWidth="2.5" strokeLinecap="round" fill="none" />

              {/* Whiskers */}
              <path d="M62 64 C50 62 38 64 30 68" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
              <path d="M62 68 C48 68 36 72 28 78" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
              <path d="M98 64 C110 62 122 64 130 68" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
              <path d="M98 68 C112 68 124 72 132 78" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />

              {/* Emerald Green Collar with Golden Bell */}
              <g transform="translate(80, 84)">
                <path d="M-16,-2 Q0,6 16,-2" stroke="#059669" strokeWidth="4" strokeLinecap="round" fill="none" />
                <circle cx="0" cy="5" r="5" fill="#FBBF24" stroke="#78350F" strokeWidth="1.6" />
                <circle cx="0" cy="6.2" r="1.8" fill="#78350F" />
              </g>
            </svg>
          </div>

          {/* Click to Pet Hint */}
          <div className="mt-1 text-[10px] font-black text-amber-300 bg-black/40 px-2 py-0.5 rounded-full border border-amber-400/30 flex items-center gap-1">
            <span>🐾</span>
            <span>{tx('ลูบหัวน้องแมว', 'Pet Me!')}</span>
          </div>
        </div>

        {/* ==================================================================== */}
        {/* CENTER & RIGHT: ANNOUNCEMENT CONTENT, SLIDER CONTROLS & ACTION CTA */}
        {/* ==================================================================== */}
        <div className="flex-1 flex flex-col justify-between min-w-0">
          {/* Header Bar inside Announcement Board */}
          <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-2 mb-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span
                className={`text-[10px] sm:text-xs font-black px-2.5 py-0.5 rounded-full bg-gradient-to-r shadow-sm flex items-center gap-1 ${currentItem.tagColor}`}
              >
                <span>{tx(currentItem.tagTh, currentItem.tagEn)}</span>
              </span>

              <span className="text-[11px] font-bold text-amber-300/90 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>
                  {tx(
                    `ประกาศที่ ${currentIndex + 1} จาก ${announcements.length}`,
                    `Notice ${currentIndex + 1} of ${announcements.length}`
                  )}
                </span>
              </span>
            </div>

            {/* Top Controls: Prev / Next / Minimize */}
            <div className="flex items-center gap-1.5 flex-shrink-0">
              <button
                type="button"
                onClick={handlePrevSlide}
                className="w-7 h-7 rounded-xl bg-white/5 hover:bg-white/15 border border-white/15 text-slate-200 text-xs font-black flex items-center justify-center transition active:scale-95 cursor-pointer"
                title={tx('ประกาศก่อนหน้า', 'Previous notice')}
              >
                ◀
              </button>

              <button
                type="button"
                onClick={handleNextSlide}
                className="w-7 h-7 rounded-xl bg-white/5 hover:bg-white/15 border border-white/15 text-slate-200 text-xs font-black flex items-center justify-center transition active:scale-95 cursor-pointer"
                title={tx('ประกาศถัดไป', 'Next notice')}
              >
                ▶
              </button>

              <button
                type="button"
                onClick={() => setIsMinimized(true)}
                className="w-7 h-7 rounded-xl bg-white/5 hover:bg-rose-500/20 hover:text-rose-300 border border-white/15 text-slate-400 text-xs font-bold flex items-center justify-center transition active:scale-95 cursor-pointer ml-1"
                title={tx('ย่อป้ายประกาศ', 'Minimize notice board')}
              >
                ✕
              </button>
            </div>
          </div>

          {/* Dynamic Announcement Title & Description */}
          <div className="my-1">
            <h3 className="text-sm sm:text-base md:text-lg font-black text-white leading-snug tracking-tight">
              {tx(currentItem.titleTh, currentItem.titleEn)}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
              {tx(currentItem.descTh, currentItem.descEn)}
            </p>
          </div>

          {/* Footer Controls: Dots Indicator & Direct Action CTA Button */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/10 mt-2">
            {/* Slide Navigation Dots */}
            <div className="flex items-center gap-1.5">
              {announcements.map((item, idx) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setCurrentIndex(idx);
                    triggerCatBounce();
                  }}
                  className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                    currentIndex === idx
                      ? 'w-6 bg-gradient-to-r from-amber-400 to-yellow-300 shadow-[0_0_8px_#fbbf24]'
                      : 'w-2 bg-white/20 hover:bg-white/40'
                  }`}
                  title={tx(item.titleTh, item.titleEn)}
                />
              ))}
            </div>

            {/* Action CTA Button */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleActionClick}
                className="group relative overflow-hidden px-4 sm:px-5 py-2 rounded-xl bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:scale-[1.02] active:scale-95 transition-all duration-200 cursor-pointer flex items-center gap-1.5"
              >
                {/* Shimmer sweep */}
                <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/50 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-700 ease-out pointer-events-none" />
                <span>{tx(currentItem.actionTh, currentItem.actionEn)}</span>
                <span className="text-base group-hover:translate-x-1 transition-transform">👉</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

