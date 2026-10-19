import React, { useState, useEffect, useRef } from 'react';

/**
 * CuteCatPricingNudge (น้องแมวส้มเสมือนจริง ใช้เมาส์จับลากได้ + ตัวหนังสือคมชัดระดับพรีเมียม)
 * - รูปร่าง ลวดลายสลิด ขน และแววตาเสมือนแมวส้มจริง (Realistic Feline Anatomy)
 * - ใช้เมาส์คลิกจับลากได้ (Draggable): เมื่อจับยกขึ้น น้องจะทำท่ายืดตัว ขาห้อยดุ๊กดิ๊ก ตาหยีเคลิ้ม มีหัวใจลอยฟุ้ง
 * - ตัวหนังสือในบอลลูนคำพูดคมชัด ตัวใหญ่ หนา อ่านง่าย คอนทราสต์สูง 100%:
 *   "คุณยังไม่สมัครแพ็กเกจ ดูว่ามีแพ็คอะไรบ้าง"
 *   ปุ่มเด่นชัด: "👉 กดดูเลย 🐱✨"
 * - โผล่ออกมาหน้าแรกทันที และโผล่ซ้ำทุก 1-3 นาทีหากยังไม่ได้สมัคร
 */
export default function CuteCatPricingNudge({
  isEn = false,
  hasSubscribed = false,
  onOpenPricing,
  onOpenRegister
}) {
  const [isVisible, setIsVisible] = useState(false);
  const [isWalking, setIsWalking] = useState(false);
  const [showBubble, setShowBubble] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [hearts, setHearts] = useState([]);
  const [catAction, setCatAction] = useState('standing'); // 'walking' | 'standing' | 'waving' | 'dangling'

  const timerRef = useRef(null);
  const dragRef = useRef({ startX: 0, startY: 0, originX: 0, originY: 0 });

  // 1-3 minute recurring interval
  const getRandomIntervalMs = () => {
    const minSeconds = 60;
    const maxSeconds = 180;
    const randomSeconds = Math.floor(Math.random() * (maxSeconds - minSeconds + 1)) + minSeconds;
    return randomSeconds * 1000;
  };

  const startCatWalkIn = () => {
    setIsVisible(true);
    setIsWalking(true);
    setShowBubble(false);
    setCatAction('walking');
    setOffset({ x: 0, y: 0 });

    setTimeout(() => {
      setIsWalking(false);
      setCatAction('standing');

      setTimeout(() => {
        setShowBubble(true);
        setCatAction('waving');
      }, 350);
    }, 2200);
  };

  // Immediate walk-in upon landing (400ms)
  useEffect(() => {
    const initialTimer = setTimeout(() => {
      startCatWalkIn();
    }, 400);

    return () => {
      clearTimeout(initialTimer);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const scheduleNextAppearance = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    const delay = getRandomIntervalMs();
    timerRef.current = setTimeout(() => {
      startCatWalkIn();
    }, delay);
  };

  const handleClose = (e) => {
    e?.stopPropagation();
    setShowBubble(false);
    setIsWalking(true);
    setCatAction('walking-out');

    setTimeout(() => {
      setIsVisible(false);
      setIsWalking(false);
      scheduleNextAppearance();
    }, 1800);
  };

  const handleGoToPricing = (e) => {
    e?.stopPropagation();
    if (typeof onOpenPricing === 'function') {
      onOpenPricing();
    } else {
      const pricingEl = document.getElementById('pricing');
      if (pricingEl) {
        pricingEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // === MOUSE / TOUCH DRAG & DROP PHYSICS (จับน้องแมวอุ้มลากเล่นได้) ===
  const spawnHearts = () => {
    const newHearts = [
      { id: Date.now() + 1, x: Math.random() * 40 - 20, emoji: '💖' },
      { id: Date.now() + 2, x: Math.random() * 40 - 20, emoji: '🐾' },
      { id: Date.now() + 3, x: Math.random() * 40 - 20, emoji: '✨' }
    ];
    setHearts(prev => [...prev.slice(-6), ...newHearts]);
  };

  const handleMouseDown = (e) => {
    // Only drag with left mouse button
    if (e.button !== 0) return;
    e.preventDefault();
    setIsDragging(true);
    setCatAction('dangling');
    spawnHearts();

    dragRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      originX: offset.x,
      originY: offset.y
    };

    const handleMouseMove = (moveEvent) => {
      const deltaX = moveEvent.clientX - dragRef.current.startX;
      const deltaY = moveEvent.clientY - dragRef.current.startY;
      setOffset({
        x: dragRef.current.originX + deltaX,
        y: dragRef.current.originY + deltaY
      });
      if (Math.random() > 0.7) {
        spawnHearts();
      }
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      setCatAction('standing');
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  // Touch device support for dragging
  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    setIsDragging(true);
    setCatAction('dangling');
    spawnHearts();

    dragRef.current = {
      startX: touch.clientX,
      startY: touch.clientY,
      originX: offset.x,
      originY: offset.y
    };

    const handleTouchMove = (moveEvent) => {
      const currentTouch = moveEvent.touches[0];
      const deltaX = currentTouch.clientX - dragRef.current.startX;
      const deltaY = currentTouch.clientY - dragRef.current.startY;
      setOffset({
        x: dragRef.current.originX + deltaX,
        y: dragRef.current.originY + deltaY
      });
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
      setCatAction('standing');
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };

    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);
  };

  if (hasSubscribed || !isVisible) return null;

  return (
    <aside
      aria-label={isEn ? "Interactive Realistic Cat Nudge" : "น้องแมวส้มแจ้งเตือนแพ็กเกจ"}
      style={{
        transform: `translate(${offset.x}px, ${offset.y}px)`,
        transition: isDragging ? 'none' : 'transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)'
      }}
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end select-none pointer-events-auto"
    >
      {/* Floating Hearts & Emotes when Grabbed */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        {hearts.map(h => (
          <span
            key={h.id}
            style={{ left: `calc(50% + ${h.x}px)` }}
            className="absolute top-0 text-xl cute-heart-float drop-shadow-md"
          >
            {h.emoji}
          </span>
        ))}
      </div>

      {/* === 1. ULTRA-CLEAR HIGH-CONTRAST LINE SPEECH BUBBLE === */}
      {showBubble && !isDragging && (
        <div className="relative mb-3 w-[300px] sm:w-[340px] bg-white rounded-[26px] p-5 shadow-[0_25px_60px_-10px_rgba(0,0,0,0.65),0_0_0_2px_rgba(249,115,22,0.5)] border border-orange-200 cute-speech-bubble-pop">
          
          {/* Close Button [✕] */}
          <button
            type="button"
            onClick={handleClose}
            aria-label={isEn ? "Close" : "ปิดข้อความ"}
            className="absolute top-3 right-3 w-7 h-7 rounded-full bg-slate-100 hover:bg-rose-100 hover:text-rose-600 text-slate-500 flex items-center justify-center text-xs font-black transition-all cursor-pointer active:scale-90 shadow-sm"
          >
            ✕
          </button>

          {/* Cat Identity Badge */}
          <div className="flex items-center gap-2 mb-2.5">
            <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-orange-500 to-amber-400 flex items-center justify-center text-[10px] text-white font-black shadow-sm">
              🐾
            </div>
            <span className="text-xs font-black tracking-wide text-orange-700 uppercase flex items-center gap-1.5">
              <span>{isEn ? 'InsightFlow Assistant' : 'น้องแมวส้ม InsightFlow'}</span>
              <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-emerald-500 text-white text-[9px] font-black">
                ✓
              </span>
            </span>
          </div>

          {/* Core Message (Crystal Clear, Bold, High Contrast Typography) */}
          <div className="space-y-0.5 mb-2">
            <h4 className="text-[17px] sm:text-[18.5px] font-black text-slate-950 tracking-tight leading-tight">
              {isEn ? "You haven't subscribed yet!" : "คุณยังไม่สมัครแพ็กเกจ"}
            </h4>
            <div className="text-[17px] sm:text-[18.5px] font-black text-orange-600 tracking-tight leading-tight">
              {isEn ? "Check out what plans we have" : "ดูว่ามีแพ็คอะไรบ้าง"}
            </div>
          </div>

          {/* Subtext info highlighting the free trial */}
          <p className="text-xs font-bold text-slate-600 mb-3.5 leading-snug">
            {isEn
              ? '✨ Starter Pack includes a 14-day free trial. No credit card required!'
              : '✨ แพ็กเกจ Starter ทดลองฟรี 14 วันเต็ม ไม่ต้องผูกบัตร'}
          </p>

          {/* Prominent High-Visibility CTA Button: "👉 กดดูเลย 🐱✨" */}
          <button
            type="button"
            onClick={handleGoToPricing}
            className="w-full py-3 px-5 bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 hover:from-orange-400 hover:to-amber-400 text-slate-950 font-black text-sm sm:text-base rounded-2xl shadow-[0_8px_25px_rgba(249,115,22,0.45)] hover:shadow-[0_12px_30px_rgba(249,115,22,0.6)] transition-all duration-200 active:scale-95 cursor-pointer flex items-center justify-center gap-2 group"
          >
            <span>👉</span>
            <span>{isEn ? 'Check Out Plans Now' : 'กดดูเลย'}</span>
            <span className="text-lg group-hover:scale-125 transition-transform duration-200">🐱✨</span>
          </button>

          {/* Speech Bubble Arrow pointing towards Cat */}
          <div className="absolute -bottom-2.5 right-12 w-5 h-5 bg-white border-r-2 border-b-2 border-orange-300 transform rotate-45 shadow-sm" />
        </div>
      )}

      {/* === 2. REALISTIC & DRAGGABLE GINGER TABBY CAT === */}
      <div
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
        className={`relative select-none transition-transform duration-200 ${
          isDragging
            ? 'cursor-grabbing scale-105 cute-cat-dangling'
            : isWalking && catAction === 'walking'
            ? 'cute-cat-walk-in cursor-grab'
            : isWalking && catAction === 'walking-out'
            ? 'cute-cat-walk-out'
            : 'cute-cat-idle cursor-grab hover:scale-105 active:scale-95'
        }`}
      >
        {/* Footstep Dust Puffs when walking */}
        {isWalking && (
          <div className="absolute -bottom-1 left-2 flex gap-1 pointer-events-none opacity-60">
            <span className="text-[10px] animate-ping">🐾</span>
            <span className="text-[10px] animate-pulse">✨</span>
          </div>
        )}

        {/* Ambient Warm Golden Orange Shadow */}
        <div className="absolute inset-0 bg-orange-500/25 rounded-full blur-xl pointer-events-none" />

        {/* === CAT SVG RENDERER (REALISTIC DETAILS + 2 ADAPTABLE POSES) === */}
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)]">
          <svg viewBox="0 0 140 140" fill="none" className="w-full h-full">
            <defs>
              {/* Realistic Ginger Tabby Fur Gradients */}
              <linearGradient id="realFurLight" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FDBA74" />
                <stop offset="40%" stopColor="#FB923C" />
                <stop offset="85%" stopColor="#EA580C" />
                <stop offset="100%" stopColor="#C2410C" />
              </linearGradient>
              <linearGradient id="realFurDeep" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#EA580C" />
                <stop offset="50%" stopColor="#C2410C" />
                <stop offset="100%" stopColor="#7C2D12" />
              </linearGradient>
              {/* Realistic Tabby Stripes */}
              <linearGradient id="realStripes" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#9A3412" />
                <stop offset="100%" stopColor="#631E05" />
              </linearGradient>
              {/* Cream Bib & Fluff */}
              <linearGradient id="realCream" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="70%" stopColor="#FFFBEB" />
                <stop offset="100%" stopColor="#FED7AA" />
              </linearGradient>
              {/* Realistic Cat Hazel-Green Eyes */}
              <radialGradient id="realCatEye" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#34D399" />
                <stop offset="65%" stopColor="#10B981" />
                <stop offset="90%" stopColor="#059669" />
                <stop offset="100%" stopColor="#064E3B" />
              </radialGradient>
              {/* Pink Nose & Paw Beans */}
              <linearGradient id="realPink" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FDA4AF" />
                <stop offset="60%" stopColor="#FB7185" />
                <stop offset="100%" stopColor="#E11D48" />
              </linearGradient>
            </defs>

            {/* ========== POSE A: DANGLING STRETCH CAT (WHEN DRAGGED BY MOUSE) ========== */}
            {isDragging ? (
              <g className="origin-center">
                {/* Dangling Long Body */}
                <path
                  d="M48 40 C44 26 96 26 92 40 C88 65 86 98 84 116 C84 126 56 126 56 116 C54 98 52 65 48 40 Z"
                  fill="url(#realFurLight)"
                  stroke="#7C2D12"
                  strokeWidth="2.8"
                />
                {/* Stretched White Belly Fluff */}
                <path
                  d="M58 46 C64 44 76 44 82 46 C80 72 78 100 70 114 C62 100 60 72 58 46 Z"
                  fill="url(#realCream)"
                  opacity="0.95"
                />
                {/* Horizontal Tabby Stripes along stretched body */}
                <path d="M52 62 Q70 65 88 62" stroke="url(#realStripes)" strokeWidth="3" strokeLinecap="round" />
                <path d="M54 78 Q70 81 86 78" stroke="url(#realStripes)" strokeWidth="3" strokeLinecap="round" />
                <path d="M56 94 Q70 97 84 94" stroke="url(#realStripes)" strokeWidth="2.8" strokeLinecap="round" />

                {/* Front Paws Reaching UP cutely */}
                {/* Left Front Paw Up */}
                <ellipse cx="44" cy="30" rx="7" ry="14" fill="url(#realFurLight)" stroke="#7C2D12" strokeWidth="2" transform="rotate(-25 44 30)" />
                <circle cx="41" cy="20" r="5" fill="url(#realCream)" />
                <circle cx="41" cy="20" r="2.5" fill="url(#realPink)" />

                {/* Right Front Paw Up */}
                <ellipse cx="96" cy="30" rx="7" ry="14" fill="url(#realFurLight)" stroke="#7C2D12" strokeWidth="2" transform="rotate(25 96 30)" />
                <circle cx="99" cy="20" r="5" fill="url(#realCream)" />
                <circle cx="99" cy="20" r="2.5" fill="url(#realPink)" />

                {/* Hind Legs Dangling DOWN */}
                <ellipse cx="58" cy="122" rx="6" ry="12" fill="url(#realFurLight)" stroke="#7C2D12" strokeWidth="2" />
                <circle cx="58" cy="130" r="4.5" fill="url(#realCream)" />
                <circle cx="58" cy="130" r="2.2" fill="url(#realPink)" />

                <ellipse cx="82" cy="122" rx="6" ry="12" fill="url(#realFurLight)" stroke="#7C2D12" strokeWidth="2" />
                <circle cx="82" cy="130" r="4.5" fill="url(#realCream)" />
                <circle cx="82" cy="130" r="2.2" fill="url(#realPink)" />

                {/* Tail Swaying */}
                <path
                  d="M70 114 C70 126 88 132 84 140 C80 144 74 138 72 130"
                  stroke="url(#realFurDeep)"
                  strokeWidth="5"
                  strokeLinecap="round"
                  fill="none"
                />

                {/* Blissed Out Head with Happy Squinting Eyes */}
                {/* Ears */}
                <polygon points="46,30 58,10 68,26" fill="url(#realFurDeep)" stroke="#7C2D12" strokeWidth="2" strokeLinejoin="round" />
                <polygon points="50,28 58,15 64,26" fill="url(#realPink)" opacity="0.8" />
                <polygon points="72,26 82,10 94,30" fill="url(#realFurDeep)" stroke="#7C2D12" strokeWidth="2" strokeLinejoin="round" />
                <polygon points="76,26 82,15 90,28" fill="url(#realPink)" opacity="0.8" />

                {/* Head */}
                <ellipse cx="70" cy="36" rx="24" ry="19" fill="url(#realFurLight)" stroke="#7C2D12" strokeWidth="2.5" />

                {/* Happy Blushing Cheeks */}
                <circle cx="54" cy="40" r="4.5" fill="#FB7185" opacity="0.8" />
                <circle cx="86" cy="40" r="4.5" fill="#FB7185" opacity="0.8" />

                {/* Happy Squint Closed Eyes (^ ^) */}
                <path d="M58 35 Q64 30 70 35" stroke="#7C2D12" strokeWidth="2.5" strokeLinecap="round" fill="none" />
                <path d="M70 35 Q76 30 82 35" stroke="#7C2D12" strokeWidth="2.5" strokeLinecap="round" fill="none" />

                {/* Cute Pink Nose & Blep Mouth */}
                <polygon points="70,40 67,37 73,37" fill="url(#realPink)" stroke="#7C2D12" strokeWidth="0.8" />
                <path d="M67 42 Q70 45 73 42" stroke="#7C2D12" strokeWidth="1.8" strokeLinecap="round" fill="none" />
                {/* Little Pink Tongue (Blep!) */}
                <ellipse cx="70" cy="44.5" rx="2.5" ry="3" fill="#F43F5E" stroke="#9F1239" strokeWidth="0.8" />
              </g>
            ) : (
              /* ========== POSE B: NATURAL REALISTIC SITTING / WALKING CAT ========== */
              <g>
                {/* 1. Realistic Tail with Tabby Rings */}
                <g className="cute-cat-tail origin-[30px_90px]">
                  <path
                    d="M32 94 C14 86 4 62 16 44 C22 34 34 38 28 48 C22 58 24 74 38 88 Z"
                    fill="url(#realFurDeep)"
                    stroke="#7C2D12"
                    strokeWidth="2.5"
                  />
                  {/* Tail Rings */}
                  <path d="M14 48 C18 44 26 46 24 54" stroke="url(#realStripes)" strokeWidth="3" strokeLinecap="round" />
                  <path d="M17 62 C22 58 28 61 27 68" stroke="url(#realStripes)" strokeWidth="3" strokeLinecap="round" />
                  <path d="M22 76 C28 72 34 76 33 82" stroke="url(#realStripes)" strokeWidth="3" strokeLinecap="round" />
                </g>

                {/* 2. Hind Legs */}
                <g className={isWalking ? 'cute-cat-leg-back-left origin-[46px_95px]' : ''}>
                  <ellipse cx="46" cy="108" rx="8" ry="14" fill="url(#realFurDeep)" stroke="#7C2D12" strokeWidth="2" />
                  <ellipse cx="46" cy="120" rx="8.5" ry="5.5" fill="url(#realCream)" stroke="#7C2D12" strokeWidth="1.8" />
                  <circle cx="46" cy="120" r="2.2" fill="url(#realPink)" />
                </g>
                <g className={isWalking ? 'cute-cat-leg-back-right origin-[64px_95px]' : ''}>
                  <ellipse cx="64" cy="108" rx="8" ry="14" fill="url(#realFurDeep)" stroke="#7C2D12" strokeWidth="2" />
                  <ellipse cx="64" cy="120" rx="8.5" ry="5.5" fill="url(#realCream)" stroke="#7C2D12" strokeWidth="1.8" />
                  <circle cx="64" cy="120" r="2.2" fill="url(#realPink)" />
                </g>

                {/* 3. Cat Realistic Chubby Body */}
                <path
                  d="M40 88 C34 68 56 58 74 58 C94 58 112 70 108 92 C106 110 84 116 62 116 C46 116 42 102 40 88 Z"
                  fill="url(#realFurLight)"
                  stroke="#7C2D12"
                  strokeWidth="3"
                />

                {/* Realistic Curved Tabby Side Stripes */}
                <path d="M52 68 C62 65 66 70 66 78" stroke="url(#realStripes)" strokeWidth="3.2" strokeLinecap="round" />
                <path d="M48 80 C58 77 62 83 62 90" stroke="url(#realStripes)" strokeWidth="3.2" strokeLinecap="round" />
                <path d="M46 92 C54 90 58 96 58 102" stroke="url(#realStripes)" strokeWidth="3.2" strokeLinecap="round" />

                {/* Fluffy White Chest / Bib */}
                <path
                  d="M72 64 C82 64 94 74 92 90 C90 102 76 110 66 104 C72 92 72 76 72 64 Z"
                  fill="url(#realCream)"
                  opacity="0.95"
                />

                {/* 4. Front Legs */}
                <g className={isWalking ? 'cute-cat-leg-front-left origin-[80px_90px]' : ''}>
                  <ellipse cx="80" cy="108" rx="7.5" ry="14" fill="url(#realFurLight)" stroke="#7C2D12" strokeWidth="2" />
                  <ellipse cx="80" cy="120" rx="8.5" ry="5.5" fill="url(#realCream)" stroke="#7C2D12" strokeWidth="1.8" />
                  <circle cx="80" cy="120" r="2.2" fill="url(#realPink)" />
                </g>

                {/* Front Right Leg (or Waving Paw when standing) */}
                <g className={isWalking ? 'cute-cat-leg-front-right origin-[98px_90px]' : catAction === 'waving' ? 'cute-cat-waving-paw origin-[98px_86px]' : ''}>
                  <ellipse cx="100" cy={catAction === 'waving' ? 82 : 108} rx="7.5" ry="14" fill="url(#realFurLight)" stroke="#7C2D12" strokeWidth="2" />
                  <ellipse cx="100" cy={catAction === 'waving' ? 72 : 120} rx="8.5" ry="5.5" fill="url(#realCream)" stroke="#7C2D12" strokeWidth="1.8" />
                  <circle cx="100" cy={catAction === 'waving' ? 72 : 120} r="2.8" fill="url(#realPink)" />
                  {/* Paw Toe Beans */}
                  {catAction === 'waving' && (
                    <>
                      <circle cx="96" cy="69" r="1.4" fill="url(#realPink)" />
                      <circle cx="100" cy="67.5" r="1.4" fill="url(#realPink)" />
                      <circle cx="104" cy="69" r="1.4" fill="url(#realPink)" />
                    </>
                  )}
                  {/* Gold Sparkle */}
                  <path
                    d="M114 60 L116 56 L118 60 L122 62 L118 64 L116 68 L114 64 L110 62 Z"
                    fill="#FDE047"
                    className="animate-spin origin-[116px_62px]"
                  />
                </g>

                {/* 5. Realistic Cat Head with Feline Facial Details */}
                {/* Ears */}
                <polygon points="68,36 82,10 94,30" fill="url(#realFurDeep)" stroke="#7C2D12" strokeWidth="2.5" strokeLinejoin="round" />
                <polygon points="72,33 82,16 88,28" fill="url(#realPink)" opacity="0.85" />
                {/* Inner ear tufts */}
                <path d="M74 30 L80 22 L78 30" stroke="#FFFBEB" strokeWidth="1.5" strokeLinecap="round" />

                <polygon points="102,30 116,12 128,38" fill="url(#realFurDeep)" stroke="#7C2D12" strokeWidth="2.5" strokeLinejoin="round" />
                <polygon points="106,29 116,18 124,35" fill="url(#realPink)" opacity="0.85" />
                {/* Inner ear tufts */}
                <path d="M108 30 L114 24 L112 30" stroke="#FFFBEB" strokeWidth="1.5" strokeLinecap="round" />

                {/* Head Contour */}
                <ellipse cx="98" cy="48" rx="28" ry="24" fill="url(#realFurLight)" stroke="#7C2D12" strokeWidth="3" />

                {/* Forehead Classic Tabby "M" Marking */}
                <path d="M92 28 L98 36 L104 28" stroke="url(#realStripes)" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                <line x1="98" y1="26" x2="98" y2="34" stroke="url(#realStripes)" strokeWidth="2.5" strokeLinecap="round" />

                {/* Rosy Cheeks */}
                <ellipse cx="78" cy="54" rx="5" ry="3.5" fill="#FB7185" opacity="0.75" />
                <ellipse cx="116" cy="54" rx="5" ry="3.5" fill="#FB7185" opacity="0.75" />

                {/* Realistic Almond Green Eyes with Pupil Depth */}
                {/* Left Eye */}
                <ellipse cx="86" cy="45" rx="5.5" ry="6.5" fill="url(#realCatEye)" stroke="#064E3B" strokeWidth="1.5" />
                <ellipse cx="86" cy="45" rx="2.2" ry="5.8" fill="#020617" />
                <circle cx="84.5" cy="42" r="2.2" fill="#FFFFFF" />
                <circle cx="87.5" cy="47" r="1.1" fill="#FFFFFF" />

                {/* Right Eye */}
                <ellipse cx="110" cy="45" rx="5.5" ry="6.5" fill="url(#realCatEye)" stroke="#064E3B" strokeWidth="1.5" />
                <ellipse cx="110" cy="45" rx="2.2" ry="5.8" fill="#020617" />
                <circle cx="108.5" cy="42" r="2.2" fill="#FFFFFF" />
                <circle cx="111.5" cy="47" r="1.1" fill="#FFFFFF" />

                {/* Realistic White Whisker Muzzle Pads */}
                <ellipse cx="98" cy="56" rx="11" ry="8" fill="url(#realCream)" stroke="#7C2D12" strokeWidth="1.2" />

                {/* Pink Nose with Nostrils */}
                <polygon points="98,54 94,50 102,50" fill="url(#realPink)" stroke="#7C2D12" strokeWidth="0.8" />
                <circle cx="96" cy="52" r="0.8" fill="#7C2D12" />
                <circle cx="100" cy="52" r="0.8" fill="#7C2D12" />

                {/* Sweet Curved Cat Mouth */}
                <path
                  d="M93 56 Q98 59 98 55 Q98 59 103 56"
                  stroke="#7C2D12"
                  strokeWidth="2"
                  strokeLinecap="round"
                  fill="none"
                />

                {/* Realistic Curved Thin Whiskers */}
                {/* Left Whiskers */}
                <path d="M82 52 C70 48 56 46 48 48" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" opacity="0.9" />
                <path d="M81 55 C68 54 54 55 46 58" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" opacity="0.9" />
                <path d="M82 58 C70 60 58 64 50 68" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" opacity="0.9" />

                {/* Right Whiskers */}
                <path d="M114 52 C126 48 138 46 146 48" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" opacity="0.9" />
                <path d="M115 55 C128 54 142 55 148 58" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" opacity="0.9" />
                <path d="M114 58 C126 60 138 64 144 68" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" opacity="0.9" />

                {/* Collar with InsightFlow Gold Bell */}
                <g transform="translate(98, 72)">
                  <path d="M-14,-2 Q0,6 14,-2" stroke="#059669" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                  <circle cx="0" cy="4" r="4.2" fill="#FBBF24" stroke="#92400E" strokeWidth="1.2" />
                  <circle cx="0" cy="5.2" r="1.5" fill="#78350F" />
                </g>
              </g>
            )}
          </svg>
        </div>

        {/* Tactile Grab/Drag Hint Pill Tooltip */}
        {!isDragging && (
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-slate-950/95 text-amber-300 text-[10px] font-black px-3 py-1 rounded-full pointer-events-none whitespace-nowrap border border-amber-400/40 shadow-xl flex items-center gap-1.5 z-30">
            <span>👆</span>
            <span>{isEn ? "Click & Drag me!" : "ใช้เมาส์จับน้องอุ้มได้นะ! 🐾"}</span>
          </div>
        )}
      </div>
    </aside>
  );
}
