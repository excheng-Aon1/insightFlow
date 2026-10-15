import React, { useState, useEffect, useRef } from 'react';

/**
 * CuteCatPricingNudge (น้องแมวส้มเดินนวยนาดออกมาจากมุมขวาล่าง สไตล์ LINE)
 * - เดินก้าวเท้าเตาะแตะออกมาจากมุมขวาล่าง (Animated Walking Cycle)
 * - หยุดยืนโบกหางดุ๊กดิ๊ก พร้อมบอลลูนแชต:
 *   "คุณยังไม่สมัครแพ็กเกจ ดูว่ามีแพ็คอะไรบ้าง กดดูเลย"
 * - โผล่ออกมาซ้ำทุกๆ 5 - 10 นาที สำหรับผู้ใช้ที่ยังไม่ได้สมัครแพ็กเกจ
 * - เมื่อกด "กดดูเลย" เลื่อนจอไปที่ตารางราคา #pricing ทันที
 */
export default function CuteCatPricingNudge({
  isEn = false,
  hasSubscribed = false,
  onOpenPricing,
  onOpenRegister
}) {
  // If user already subscribed to a paid package, do not show nudge
  if (hasSubscribed) return null;

  const [isVisible, setIsVisible] = useState(false);
  const [isWalking, setIsWalking] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [catAction, setCatAction] = useState('standing'); // 'walking' | 'standing' | 'waving'
  const timerRef = useRef(null);

  // Interval randomizer: between 1 to 3 minutes (in milliseconds)
  const getRandomIntervalMs = () => {
    const minSeconds = 60; // 1 minute
    const maxSeconds = 180; // 3 minutes
    const randomSeconds = Math.floor(Math.random() * (maxSeconds - minSeconds + 1)) + minSeconds;
    return randomSeconds * 1000;
  };

  // Function to trigger the cute cat walking sequence
  const startCatWalkIn = () => {
    setIsVisible(true);
    setIsWalking(true);
    setShowBubble(false);
    setCatAction('walking');

    // Walk duration: 2.2 seconds to reach the corner
    setTimeout(() => {
      setIsWalking(false);
      setCatAction('standing');
      
      // Bubble pops up 350ms after stopping
      setTimeout(() => {
        setShowBubble(true);
        setCatAction('waving');
      }, 350);
    }, 2200);
  };

  // 1. Walk out immediately upon entering the website (400ms for smooth DOM mount)
  useEffect(() => {
    const initialTimer = setTimeout(() => {
      startCatWalkIn();
    }, 400);

    return () => {
      clearTimeout(initialTimer);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  // 2. Recurring 1-3 minute timer when closed or dismissed
  const scheduleNextAppearance = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    const delay = getRandomIntervalMs();
    timerRef.current = setTimeout(() => {
      startCatWalkIn();
    }, delay);
  };

  const handleClose = () => {
    setShowBubble(false);
    // Cat cutely walks back out
    setIsWalking(true);
    setCatAction('walking-out');

    setTimeout(() => {
      setIsVisible(false);
      setIsWalking(false);
      scheduleNextAppearance();
    }, 1800);
  };

  const handleGoToPricing = () => {
    if (typeof onOpenPricing === 'function') {
      onOpenPricing();
    } else {
      const pricingEl = document.getElementById('pricing');
      if (pricingEl) {
        pricingEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleCatClick = () => {
    if (!showBubble) {
      setShowBubble(true);
      setCatAction('waving');
    }
  };

  if (!isVisible) return null;

  return (
    <aside
      aria-label={isEn ? "Cute Cat Package Nudge" : "น้องแมวแจ้งเตือนแพ็กเกจ"}
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end select-none pointer-events-auto"
    >
      {/* === 1. LINE-STYLE CHAT SPEECH BUBBLE === */}
      {showBubble && (
        <div className="relative mb-2 max-w-[290px] sm:max-w-[320px] bg-white text-slate-900 rounded-3xl p-4 shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.3)] border-2 border-orange-400/40 cute-speech-bubble-pop">
          
          {/* Close button (x) */}
          <button
            type="button"
            onClick={handleClose}
            aria-label={isEn ? "Close message" : "ปิดข้อความ"}
            className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center text-xs font-bold transition-transform active:scale-90 cursor-pointer"
          >
            ✕
          </button>

          {/* Cat Chat Header with Verified LINE Badge */}
          <div className="flex items-center gap-2 mb-2 pr-6">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-pulse" />
            <span className="text-[11px] font-black tracking-wide text-orange-600 uppercase flex items-center gap-1">
              <span>{isEn ? 'InsightFlow Assistant' : 'น้องแมวส้ม InsightFlow'}</span>
              <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-orange-500 text-white text-[9px] font-black">
                🐾
              </span>
            </span>
          </div>

          {/* User's Exact Requested Thai Message */}
          <div className="text-[13.5px] sm:text-[14.5px] font-black text-slate-900 leading-snug mb-1.5">
            {isEn ? (
              <>
                You haven't subscribed to a package yet!{' '}
                <span className="text-orange-600 block mt-0.5">Check out what plans we have</span>
              </>
            ) : (
              <>
                คุณยังไม่สมัครแพ็กเกจ{' '}
                <span className="text-orange-600 block mt-0.5">ดูว่ามีแพ็คอะไรบ้าง</span>
              </>
            )}
          </div>

          {/* Subtext info highlighting the 14-day free trial */}
          <p className="text-[11px] text-slate-500 mb-3 leading-relaxed">
            {isEn
              ? '✨ Starter Pack includes a 14-day free trial. Zero credit card needed!'
              : '✨ แพ็กเกจ Starter ทดลองใช้งานฟรี 14 วันเต็ม ไม่ต้องผูกบัตรเครดิต'}
          </p>

          {/* One-click CTA Button: "กดดูเลย 🐱✨" */}
          <button
            type="button"
            onClick={handleGoToPricing}
            className="w-full py-2.5 px-4 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-400 hover:to-amber-500 text-slate-950 font-black text-xs sm:text-sm rounded-2xl shadow-[0_8px_20px_rgba(249,115,22,0.35)] hover:shadow-[0_10px_25px_rgba(249,115,22,0.5)] transition-all duration-200 active:scale-95 cursor-pointer flex items-center justify-center gap-2 group"
          >
            <span>{isEn ? 'Check Out Plans Now' : 'กดดูเลย'}</span>
            <span className="text-base group-hover:scale-125 transition-transform duration-200">🐱✨</span>
          </button>

          {/* Speech Bubble Arrow pointing towards the Cat */}
          <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white border-r-2 border-b-2 border-orange-400/40 transform rotate-45" />
        </div>
      )}

      {/* === 2. ANIMATED GINGER TABBY CAT (WALKING CYCLE) === */}
      <div
        onClick={handleCatClick}
        title={isEn ? "Click to see packages!" : "แตะน้องแมวเพื่อดูแพ็กเกจ"}
        className={`relative cursor-pointer transition-transform duration-300 ${
          isWalking && catAction === 'walking'
            ? 'cute-cat-walk-in'
            : isWalking && catAction === 'walking-out'
            ? 'cute-cat-walk-out'
            : 'cute-cat-idle'
        }`}
      >
        {/* Footstep Dust Puffs when walking */}
        {isWalking && (
          <div className="absolute -bottom-1 left-2 flex gap-1 pointer-events-none opacity-60">
            <span className="text-[10px] animate-ping">🐾</span>
            <span className="text-[10px] animate-pulse">✨</span>
          </div>
        )}

        {/* Floating Notification Badge when speech bubble is closed */}
        {!showBubble && !isWalking && (
          <div className="absolute -top-1 -left-1 z-20 flex items-center justify-center">
            <span className="relative flex h-5 w-5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-5 w-5 bg-gradient-to-r from-orange-500 to-amber-400 text-slate-950 font-black text-[10px] items-center justify-center shadow-md">
                1
              </span>
            </span>
          </div>
        )}

        {/* Ambient Warm Orange Glow */}
        <div className="absolute inset-0 bg-orange-400/25 rounded-full blur-xl pointer-events-none" />

        {/* Cat Scalable Vector Graphic (Full Animated Body, Paws & Tail) */}
        <div className="relative w-24 h-24 sm:w-28 sm:h-28 filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.55)]">
          <svg viewBox="0 0 130 130" fill="none" className="w-full h-full">
            <defs>
              {/* Ginger Orange Fur Gradient */}
              <linearGradient id="gingerFur" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FB923C" />
                <stop offset="45%" stopColor="#F97316" />
                <stop offset="100%" stopColor="#C2410C" />
              </linearGradient>
              {/* Tabby Dark Stripes */}
              <linearGradient id="tabbyStripe" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#9A3412" />
                <stop offset="100%" stopColor="#7C2D12" />
              </linearGradient>
              {/* Cream Bib & Muzzle */}
              <linearGradient id="catCream" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFBEB" />
                <stop offset="100%" stopColor="#FEF3C7" />
              </linearGradient>
              {/* Soft Pink Inner Ears & Nose */}
              <linearGradient id="catPink" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FDA4AF" />
                <stop offset="100%" stopColor="#F43F5E" />
              </linearGradient>
              {/* Emerald Green Cat Eyes */}
              <linearGradient id="catEye" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#34D399" />
                <stop offset="60%" stopColor="#10B981" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
            </defs>

            {/* --- 1. ANIMATED SWISHING TAIL --- */}
            <g className="cute-cat-tail origin-[24px_85px]">
              <path
                d="M26 86 C12 80 4 60 14 44 C20 34 30 38 25 48 C20 58 24 72 32 82 Z"
                fill="url(#gingerFur)"
                stroke="#7C2D12"
                strokeWidth="2.2"
              />
              {/* Tail Tip Stripe */}
              <path d="M12 48 C16 44 24 46 22 54" stroke="url(#tabbyStripe)" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M15 60 C20 58 25 61 24 67" stroke="url(#tabbyStripe)" strokeWidth="2.5" strokeLinecap="round" />
            </g>

            {/* --- 2. BACK LEGS (WALKING PAWS) --- */}
            {/* Back Left Leg */}
            <g className={isWalking ? 'cute-cat-leg-back-left origin-[42px_88px]' : ''}>
              <ellipse cx="42" cy="102" rx="7" ry="12" fill="url(#gingerFur)" stroke="#7C2D12" strokeWidth="2" />
              <ellipse cx="42" cy="112" rx="7.5" ry="4.5" fill="url(#catCream)" stroke="#7C2D12" strokeWidth="1.8" />
            </g>

            {/* Back Right Leg */}
            <g className={isWalking ? 'cute-cat-leg-back-right origin-[58px_88px]' : ''}>
              <ellipse cx="58" cy="102" rx="7" ry="12" fill="url(#gingerFur)" stroke="#7C2D12" strokeWidth="2" />
              <ellipse cx="58" cy="112" rx="7.5" ry="4.5" fill="url(#catCream)" stroke="#7C2D12" strokeWidth="1.8" />
            </g>

            {/* --- 3. CAT CHUBBY BODY --- */}
            <path
              d="M36 82 C32 64 52 56 68 56 C86 56 102 68 100 86 C98 102 78 108 58 108 C42 108 38 96 36 82 Z"
              fill="url(#gingerFur)"
              stroke="#7C2D12"
              strokeWidth="2.8"
            />

            {/* Tabby Stripes on Back */}
            <path d="M48 64 C56 62 60 66 60 72" stroke="url(#tabbyStripe)" strokeWidth="3" strokeLinecap="round" />
            <path d="M44 75 C52 73 56 78 56 84" stroke="url(#tabbyStripe)" strokeWidth="3" strokeLinecap="round" />

            {/* White Fluffy Chest / Bib */}
            <path
              d="M66 62 C74 62 84 70 82 85 C80 96 68 102 60 98 C64 88 64 74 66 62 Z"
              fill="url(#catCream)"
              opacity="0.95"
            />

            {/* --- 4. FRONT LEGS (WALKING PAWS) --- */}
            {/* Front Left Leg */}
            <g className={isWalking ? 'cute-cat-leg-front-left origin-[72px_85px]' : ''}>
              <ellipse cx="74" cy="102" rx="6.5" ry="12" fill="url(#gingerFur)" stroke="#7C2D12" strokeWidth="2" />
              <ellipse cx="74" cy="112" rx="7.5" ry="4.5" fill="url(#catCream)" stroke="#7C2D12" strokeWidth="1.8" />
            </g>

            {/* Front Right Leg (or Waving Paw when standing) */}
            <g className={isWalking ? 'cute-cat-leg-front-right origin-[88px_85px]' : catAction === 'waving' ? 'cute-cat-waving-paw origin-[88px_82px]' : ''}>
              <ellipse cx="90" cy={catAction === 'waving' ? 76 : 102} rx="6.5" ry="12" fill="url(#gingerFur)" stroke="#7C2D12" strokeWidth="2" />
              <ellipse cx="90" cy={catAction === 'waving' ? 68 : 112} rx="7.5" ry="4.5" fill="url(#catCream)" stroke="#7C2D12" strokeWidth="1.8" />
              {/* Pink Paw Toe Beans */}
              <circle cx="90" cy={catAction === 'waving' ? 68 : 112} r="2.2" fill="url(#catPink)" />
              {/* Cute Little Sparkle */}
              <path
                d="M102 56 L104 52 L106 56 L110 58 L106 60 L104 64 L102 60 L98 58 Z"
                fill="#FDE047"
                className="animate-spin origin-[104px_58px]"
              />
            </g>

            {/* --- 5. CAT HEAD & EARS --- */}
            {/* Left Ear */}
            <polygon points="62,34 76,8 86,28" fill="url(#gingerFur)" stroke="#7C2D12" strokeWidth="2.5" strokeLinejoin="round" />
            <polygon points="66,31 76,14 82,27" fill="url(#catPink)" opacity="0.85" />

            {/* Right Ear */}
            <polygon points="94,28 106,10 118,36" fill="url(#gingerFur)" stroke="#7C2D12" strokeWidth="2.5" strokeLinejoin="round" />
            <polygon points="98,27 106,16 114,33" fill="url(#catPink)" opacity="0.85" />

            {/* Head Contour */}
            <ellipse cx="90" cy="46" rx="26" ry="22" fill="url(#gingerFur)" stroke="#7C2D12" strokeWidth="2.8" />

            {/* Tabby Stripes on Forehead (M mark) */}
            <path d="M84 28 L90 35 L96 28" stroke="url(#tabbyStripe)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            <line x1="90" y1="26" x2="90" y2="33" stroke="url(#tabbyStripe)" strokeWidth="2.2" strokeLinecap="round" />

            {/* Cute Rosy Cheeks */}
            <ellipse cx="72" cy="52" rx="4.5" ry="3" fill="#FB7185" opacity="0.75" />
            <ellipse cx="106" cy="52" rx="4.5" ry="3" fill="#FB7185" opacity="0.75" />

            {/* Big Expressive Anime Cat Eyes */}
            {/* Left Eye */}
            <ellipse cx="79" cy="43" rx="5" ry="6" fill="url(#catEye)" stroke="#064E3B" strokeWidth="1.2" />
            <ellipse cx="79" cy="43" rx="2.5" ry="5.5" fill="#0F172A" />
            <circle cx="77.5" cy="40.5" r="2" fill="#FFFFFF" />
            <circle cx="80.5" cy="45" r="1" fill="#FFFFFF" />

            {/* Right Eye */}
            <ellipse cx="101" cy="43" rx="5" ry="6" fill="url(#catEye)" stroke="#064E3B" strokeWidth="1.2" />
            <ellipse cx="101" cy="43" rx="2.5" ry="5.5" fill="#0F172A" />
            <circle cx="99.5" cy="40.5" r="2" fill="#FFFFFF" />
            <circle cx="102.5" cy="45" r="1" fill="#FFFFFF" />

            {/* Cream Snout / Muzzle */}
            <ellipse cx="90" cy="53" rx="10" ry="7" fill="url(#catCream)" stroke="#7C2D12" strokeWidth="1.2" />

            {/* Little Pink Triangle Nose */}
            <polygon points="90,51 87,48 93,48" fill="url(#catPink)" stroke="#7C2D12" strokeWidth="0.8" />

            {/* Smiling Cat Mouth (3 shape) */}
            <path
              d="M86 53 Q90 56 90 52 Q90 56 94 53"
              stroke="#7C2D12"
              strokeWidth="1.8"
              strokeLinecap="round"
              fill="none"
            />

            {/* Whiskers */}
            {/* Left Whiskers */}
            <line x1="75" y1="50" x2="60" y2="47" stroke="#FFFBEB" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="74" y1="53" x2="58" y2="53" stroke="#FFFBEB" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="75" y1="56" x2="62" y2="59" stroke="#FFFBEB" strokeWidth="1.8" strokeLinecap="round" />
            {/* Right Whiskers */}
            <line x1="105" y1="50" x2="120" y2="47" stroke="#FFFBEB" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="106" y1="53" x2="122" y2="53" stroke="#FFFBEB" strokeWidth="1.8" strokeLinecap="round" />
            <line x1="105" y1="56" x2="118" y2="59" stroke="#FFFBEB" strokeWidth="1.8" strokeLinecap="round" />

            {/* InsightFlow Emerald Collar Bell */}
            <g transform="translate(90, 68)">
              <circle cx="0" cy="0" r="3.5" fill="#10B981" stroke="#064E3B" strokeWidth="1" />
              <circle cx="0" cy="0" r="1.5" fill="#FDE047" />
            </g>
          </svg>
        </div>

        {/* Hover Tooltip */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-slate-900/90 text-orange-300 text-[10px] font-black px-2.5 py-0.5 rounded-full pointer-events-none whitespace-nowrap border border-orange-400/30">
          {isEn ? "Meow! Check packages 🐾" : "เหมียว! ดูแพ็กเกจ 🐾"}
        </div>
      </div>
    </aside>
  );
}

