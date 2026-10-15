import React, { useState, useEffect } from 'react';

/**
 * CuteBearPricingNudge (น้องหมีแจ้งเตือนแพ็กเกจ สไตล์ LINE)
 * - Animated cute bear mascot with waving paw and blushing cheeks
 * - Authentic LINE-style speech bubble with prompt:
 *   "คุณยังไม่สมัครแพ็กเกจ ดูว่ามีแพ็คอะไรบ้าง กดดูเลย"
 * - One-click smooth scroll to #pricing
 * - Minimize & Reopen toggle with tactile bounce
 */
export default function CuteBearPricingNudge({ isEn = false, onOpenPricing, onOpenRegister }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isWaving, setIsWaving] = useState(true);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Auto pop-up after 2.5 seconds on page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleGoToPricing = () => {
    setHasInteracted(true);
    if (typeof onOpenPricing === 'function') {
      onOpenPricing();
    } else {
      const pricingEl = document.getElementById('pricing');
      if (pricingEl) {
        pricingEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const handleToggleOpen = () => {
    setIsOpen(prev => !prev);
    setIsWaving(true);
  };

  return (
    <aside 
      aria-label={isEn ? "Package Notification" : "การแจ้งเตือนแพ็กเกจ"}
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end select-none pointer-events-auto"
    >
      {/* === 1. LINE-STYLE SPEECH BUBBLE === */}
      {isOpen && (
        <div className="relative mb-2 max-w-[290px] sm:max-w-[320px] bg-white text-slate-900 rounded-3xl p-4 shadow-[0_18px_45px_rgba(0,0,0,0.45),0_0_0_1px_rgba(255,255,255,0.2)] border border-emerald-400/40 cute-speech-bubble-pop">
          
          {/* Close button (x) */}
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label={isEn ? "Close message" : "ปิดข้อความ"}
            className="absolute top-2.5 right-2.5 w-6 h-6 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-800 flex items-center justify-center text-xs font-bold transition-transform active:scale-90 cursor-pointer"
          >
            ✕
          </button>

          {/* Bear Chat Header with LINE Badge */}
          <div className="flex items-center gap-2 mb-2 pr-6">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-black tracking-wide text-emerald-600 uppercase flex items-center gap-1">
              <span>{isEn ? 'InsightFlow Assistant' : 'น้องหมี InsightFlow'}</span>
              <span className="inline-flex items-center justify-center w-3.5 h-3.5 rounded-full bg-emerald-500 text-white text-[9px] font-black">
                ✓
              </span>
            </span>
          </div>

          {/* Core Message (Requested by user) */}
          <div className="text-[13.5px] sm:text-[14.5px] font-black text-slate-900 leading-snug mb-1.5">
            {isEn ? (
              <>
                You haven't subscribed to a package yet!{' '}
                <span className="text-emerald-600">See what plans are available</span>
              </>
            ) : (
              <>
                คุณยังไม่สมัครแพ็กเกจ{' '}
                <span className="text-emerald-600 block mt-0.5">ดูว่ามีแพ็คอะไรบ้าง</span>
              </>
            )}
          </div>

          {/* Subtext info highlighting the free trial */}
          <p className="text-[11px] text-slate-500 mb-3 leading-relaxed">
            {isEn
              ? '✨ Starter Pack includes a 14-day free trial. No credit card required!'
              : '✨ แพ็กเกจ Starter ทดลองใช้งานฟรี 14 วันเต็ม ไม่ต้องผูกบัตรเครดิต'}
          </p>

          {/* CTA Button: "กดดูเลย 🐻✨" */}
          <button
            type="button"
            onClick={handleGoToPricing}
            className="w-full py-2.5 px-4 bg-gradient-to-r from-emerald-500 via-green-500 to-emerald-600 hover:from-emerald-400 hover:to-green-500 text-slate-950 font-black text-xs sm:text-sm rounded-2xl shadow-[0_8px_20px_rgba(16,185,129,0.35)] hover:shadow-[0_10px_25px_rgba(16,185,129,0.5)] transition-all duration-200 active:scale-95 cursor-pointer flex items-center justify-center gap-2 group"
          >
            <span>{isEn ? 'Check Out Plans Now' : 'กดดูเลย'}</span>
            <span className="text-base group-hover:scale-125 transition-transform duration-200">🐻✨</span>
          </button>

          {/* Speech Bubble Arrow pointing towards the Bear */}
          <div className="absolute -bottom-2 right-8 w-4 h-4 bg-white border-r border-b border-emerald-400/40 transform rotate-45" />
        </div>
      )}

      {/* === 2. CUTE BEAR MASCOT (LINE BROWN STYLE) === */}
      <div 
        onClick={handleToggleOpen}
        title={isOpen ? (isEn ? "Click to minimize bear" : "คลิกเพื่อซ่อน") : (isEn ? "Click to chat with bear" : "แตะน้องหมีเพื่อดูแพ็กเกจ")}
        className="relative cursor-pointer group transition-transform duration-300 active:scale-90"
      >
        {/* Floating Notification Dot when bubble is closed */}
        {!isOpen && (
          <div className="absolute -top-1 -left-1 z-20 flex items-center justify-center">
            <span className="relative flex h-5 w-5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-5 w-5 bg-gradient-to-r from-emerald-500 to-green-400 text-slate-950 font-black text-[10px] items-center justify-center shadow-md">
                1
              </span>
            </span>
          </div>
        )}

        {/* Ambient Glow behind Bear */}
        <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-xl group-hover:bg-amber-400/40 transition-colors pointer-events-none" />

        {/* The Bear Illustration (Scalable Vector Graphic) */}
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 cute-bear-float filter drop-shadow-[0_10px_20px_rgba(0,0,0,0.5)]">
          <svg viewBox="0 0 120 120" fill="none" className="w-full h-full">
            <defs>
              {/* Fur Warm Brown Gradient */}
              <linearGradient id="bearFur" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#A76839" />
                <stop offset="50%" stopColor="#8C4F27" />
                <stop offset="100%" stopColor="#6E3816" />
              </linearGradient>
              {/* Inner Ear Pink */}
              <linearGradient id="bearPink" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FDA4AF" />
                <stop offset="100%" stopColor="#F43F5E" />
              </linearGradient>
              {/* Snout Cream */}
              <linearGradient id="bearSnout" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFBEB" />
                <stop offset="100%" stopColor="#FDE68A" />
              </linearGradient>
              {/* Green Bowtie */}
              <linearGradient id="bearBow" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#34D399" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
            </defs>

            {/* --- Bear Ears --- */}
            {/* Left Ear */}
            <circle cx="34" cy="30" r="15" fill="url(#bearFur)" stroke="#592C11" strokeWidth="2.5" />
            <circle cx="34" cy="30" r="8.5" fill="url(#bearPink)" opacity="0.85" />
            
            {/* Right Ear */}
            <circle cx="86" cy="30" r="15" fill="url(#bearFur)" stroke="#592C11" strokeWidth="2.5" />
            <circle cx="86" cy="30" r="8.5" fill="url(#bearPink)" opacity="0.85" />

            {/* --- Bear Body --- */}
            <path
              d="M32 95 C32 78 88 78 88 95 C88 114 32 114 32 95 Z"
              fill="url(#bearFur)"
              stroke="#592C11"
              strokeWidth="2.5"
            />
            {/* Belly Patch */}
            <ellipse cx="60" cy="100" rx="16" ry="12" fill="url(#bearSnout)" opacity="0.9" />

            {/* --- Bear Head --- */}
            <ellipse
              cx="60"
              cy="58"
              rx="37"
              ry="32"
              fill="url(#bearFur)"
              stroke="#592C11"
              strokeWidth="3"
            />

            {/* Cute Rosy Blushing Cheeks */}
            <ellipse cx="38" cy="65" rx="6.5" ry="4" fill="#FB7185" opacity="0.75" />
            <ellipse cx="82" cy="65" rx="6.5" ry="4" fill="#FB7185" opacity="0.75" />

            {/* Glossy Button Eyes */}
            {/* Left Eye */}
            <circle cx="45" cy="53" r="4.2" fill="#1C1917" />
            <circle cx="46.5" cy="51.5" r="1.5" fill="#FFFFFF" />
            {/* Right Eye */}
            <circle cx="75" cy="53" r="4.2" fill="#1C1917" />
            <circle cx="76.5" cy="51.5" r="1.5" fill="#FFFFFF" />

            {/* Cream Snout Base */}
            <ellipse cx="60" cy="67" rx="14" ry="10" fill="url(#bearSnout)" />

            {/* Sweet Nose */}
            <ellipse cx="60" cy="63.5" rx="4.5" ry="3.2" fill="#1C1917" />
            <ellipse cx="61" cy="62.5" rx="1.2" ry="0.8" fill="#FFFFFF" opacity="0.7" />

            {/* Cute Kawaii Smiling Mouth */}
            <path
              d="M56 67 Q60 70 60 66 Q60 70 64 67"
              stroke="#1C1917"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
            />

            {/* InsightFlow Emerald Bowtie */}
            <g transform="translate(60, 87)">
              <polygon points="0,0 -10,-6 -10,6" fill="url(#bearBow)" stroke="#064E3B" strokeWidth="1" />
              <polygon points="0,0 10,-6 10,6" fill="url(#bearBow)" stroke="#064E3B" strokeWidth="1" />
              <circle cx="0" cy="0" r="3.2" fill="#FDE047" stroke="#854D0E" strokeWidth="0.8" />
            </g>

            {/* --- Bear Paws --- */}
            {/* Left Resting Paw */}
            <ellipse cx="32" cy="85" rx="8" ry="6" fill="url(#bearFur)" stroke="#592C11" strokeWidth="2" />
            <circle cx="32" cy="85" r="3" fill="url(#bearPink)" opacity="0.7" />

            {/* Right Waving Paw (Animated) */}
            <g className="cute-paw-waving origin-[88px_82px]">
              <ellipse cx="94" cy="74" rx="8" ry="7" fill="url(#bearFur)" stroke="#592C11" strokeWidth="2" />
              <circle cx="94" cy="74" r="3.2" fill="url(#bearPink)" opacity="0.7" />
              {/* Sparkle near waving paw */}
              <path
                d="M106 62 L108 58 L110 62 L114 64 L110 66 L108 70 L106 66 L102 64 Z"
                fill="#FDE047"
                className="animate-spin origin-[108px_64px]"
              />
            </g>
          </svg>
        </div>

        {/* Tooltip on Hover */}
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-slate-900/90 text-amber-300 text-[10px] font-black px-2 py-0.5 rounded-full pointer-events-none whitespace-nowrap border border-amber-400/30">
          {isOpen ? (isEn ? "Hide" : "แตะเพื่อซ่อน") : (isEn ? "View Packages!" : "ดูแพ็กเกจ! 🐻")}
        </div>
      </div>
    </aside>
  );
}
