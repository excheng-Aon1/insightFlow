import React from 'react';

/**
 * HeroGoalTrajectoryBackground - พื้นหลังภาพความละเอียดสูง 4K UHD ยามค่ำคืน (Static 4K Night Cityscape)
 * 
 * ภาพมหานครตึกสูงและบ้านเรือนเปิดไฟยามค่ำคืน:
 * 1. ตึกระฟ้าใจกลางเมือง อาคารสำนักงาน และบ้านเรือนเปิดไฟอบอุ่นสว่างไสว สะท้อนผืนน้ำอย่างงดงาม
 * 2. ปรับเป็นภาพนิ่ง 4K คมชัดสูง (Static 4K UHD) ปราศจากแอนิเมชันรบกวนสายตาตามคำขอ
 * 3. Scrim Vignette เกรดเอ็กเซกคิวทีฟ (Ultramarine #071039) ปกป้องตัวอักษรให้อ่านง่าย ชัดเจน 100%
 */

export function HeroGoalTrajectoryBackground({
  theme = 'dark',
  lang = 'th',
  className = '',
  children
}) {
  const isEn = lang === 'en';
  // ภาพพื้นหลังหน้าหลัก 4K: มหานครตึกและบ้านเรือนเปิดไฟยามค่ำคืน (4K Night Cityscape)
  // Backward compatible alias: '/hero-victory-bg.jpg'
  const nightCityImage = '/hero-city-night-4k.jpg';

  return (
    <div
      className={`relative w-full overflow-hidden transition-colors duration-500 ${
        theme === 'dark' ? 'bg-[#071039]' : 'bg-[#E6EDFD]'
      } ${className}`}
    >
      {/* =====================================================================
          LAYER 1: STATIC 4K UHD NIGHT CITYSCAPE BACKGROUND (NO ANIMATION)
          ===================================================================== */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: `url('${nightCityImage}'), url('/hero-victory-bg.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center 45%',
            filter: theme === 'dark' ? 'brightness(0.92) contrast(1.10)' : 'brightness(1.02) contrast(1.05)'
          }}
        />

        {/* =====================================================================
            LAYER 2: VIGNETTES & SCRIM OVERLAYS (Guarantees 100% Text Legibility)
            ===================================================================== */}
        {/* Scrim Left: ปกป้องตัวหนังสือหัวข้อ, คำอธิบาย, และปุ่ม CTA ด้านซ้าย */}
        <div
          className={`absolute inset-0 pointer-events-none ${
            theme === 'dark'
              ? 'bg-gradient-to-r from-[#071039] via-[#071039]/85 to-transparent'
              : 'bg-gradient-to-r from-[#E6EDFD] via-[#E6EDFD]/88 to-transparent'
          }`}
          style={{ width: '60%' }}
        />

        {/* Scrim Top & Bottom: เบลนด์เข้ากับ Navbar และส่วนล่างอย่างเรียบเนียน */}
        <div
          className={`absolute inset-x-0 top-0 h-28 pointer-events-none bg-gradient-to-b ${
            theme === 'dark' ? 'from-[#071039] to-transparent' : 'from-[#E6EDFD] to-transparent'
          }`}
        />
        <div
          className={`absolute inset-x-0 bottom-0 h-36 pointer-events-none bg-gradient-to-t ${
            theme === 'dark' ? 'from-[#071039] via-[#071039]/70 to-transparent' : 'from-[#E6EDFD] via-[#E6EDFD]/70 to-transparent'
          }`}
        />

        {/* Subtle ambient warm sapphire & gold glow reflecting city skyline */}
        <div
          className="absolute right-[10%] top-[12%] w-96 h-96 rounded-full pointer-events-none opacity-30 mix-blend-screen"
          style={{
            background: 'radial-gradient(circle, rgba(110, 146, 242, 0.45) 0%, rgba(251, 191, 36, 0.25) 50%, transparent 75%)',
            filter: 'blur(45px)'
          }}
        />
      </div>

      {/* =====================================================================
          LAYER 3: 4K NIGHT CITY METROPOLITAN BADGE (STATIC, MINIMALIST)
          ===================================================================== */}
      <div className="absolute right-4 sm:right-8 top-4 z-20 flex items-center gap-2 pointer-events-auto">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-[#071039]/85 border border-[#2E5DE6]/35 backdrop-blur-xl shadow-lg text-[11px] font-bold">
          <span className="flex items-center gap-1.5 text-[#6E92F2]">
            <span>🌃</span>
            <span className="text-slate-200">
              {isEn ? 'Metropolitan Night View (4K UHD)' : 'มหานครยามค่ำคืน (4K UHD)'}
            </span>
          </span>
          <span className="text-[9px] font-black uppercase px-1.5 py-0.5 rounded bg-[#2E5DE6]/30 text-[#AFC5F8] border border-[#2E5DE6]/40">
            Static 4K
          </span>
        </div>
      </div>

      {/* =====================================================================
          LAYER 4: CHILDREN (MAIN PAGE HERO CONTENT, HEADLINES, FORMS, CARDS)
          ===================================================================== */}
      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  );
}
