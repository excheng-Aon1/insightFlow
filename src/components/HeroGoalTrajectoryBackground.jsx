import React, { useState } from 'react';

/**
 * HeroGoalTrajectoryBackground - พื้นหลัง 3 มิติพร้อมแอนิเมชัน "การนำไปสู่เป้าหมาย"
 * 
 * ความหมายของภาพและแอนิเมชัน:
 * 1. ทางด่วนข้อมูลโฮโลแกรม 3D (Holographic 3D Data Highway):
 *    เส้นทางแสงสีทองแชมเปญและสีฟ้าไซแอนทอดยาวจากจุดเริ่มต้น สื่อถึงการวางแผนและการนำพาธุรกิจไปข้างหน้า
 * 2. วงแหวนเป้าหมายแบบมีมิติ (3D Concentric Bullseye Targets):
 *    วงแหวนเรดาร์เป้าหมายที่ถูกยิงทะลุผ่านตามเส้นทาง สื่อถึงการพิชิตเป้าหมายย่อยในแต่ละไตรมาส
 * 3. ยอดพีระมิดคริสตัลเปล่งประกาย (Apex Crystal Summit Beacon):
 *    จุดหมายปลายทางสูงสุด สื่อถึงความสำเร็จ 100% ของเป้าหมายประจำปี ฿10,000,000
 * 4. แอนิเมชัน 60 FPS:
 *    - ลำแสงเลเซอร์และโฟตอนวิ่งตามเส้นทางสู่เป้าหมาย
 *    - วงแหวนเรดาร์เป้าหมายเต้นขยายตัวเป็นจังหวะ (Radar Goal Pulse)
 *    - การเคลื่อนไหว 3D Cinematic Breathing (Ken Burns 3D Depth)
 *    - โหนดไมล์สโตนโฮโลแกรมลอยตัว (Floating Milestones)
 */

export function HeroGoalTrajectoryBackground({
  theme = 'dark',
  lang = 'th',
  className = '',
  children
}) {
  const isEn = lang === 'en';
  const [isAnimationPaused, setIsAnimationPaused] = useState(false);
  // ภาพพื้นหลังหน้าหลัก: ยอดเขาแห่งความสำเร็จ (Mountain of Success / Victory Summit) เพียงภาพเดียว
  const mountainVictoryImage = '/hero-victory-bg.jpg';

  return (
    <div
      className={`relative w-full overflow-hidden transition-colors duration-500 ${
        theme === 'dark' ? 'bg-[#030611]' : 'bg-[#f8fafc]'
      } ${className}`}
    >
      {/* =====================================================================
          LAYER 1: CINEMATIC 3D BACKGROUND IMAGE WITH KEN BURNS 3D MOTION
          ===================================================================== */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0">
        <div
          className={`absolute inset-0 w-[108%] h-[108%] -left-[4%] -top-[4%] transition-opacity duration-1000 ${
            isAnimationPaused ? '' : 'animate-goal-3d-breathe'
          }`}
          style={{
            backgroundImage: `url('${mountainVictoryImage}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'right 20% center',
            filter: theme === 'dark' ? 'brightness(0.92) contrast(1.12)' : 'brightness(1.02) contrast(1.05)'
          }}
        />

        {/* =====================================================================
            LAYER 2: VIGNETTES & SCRIM OVERLAYS (Guarantees 100% Text Legibility)
            ===================================================================== */}
        {/* Scrim Left: ปกป้องตัวหนังสือหัวข้อ, คำอธิบาย, และปุ่ม CTA ด้านซ้าย */}
        <div
          className={`absolute inset-0 pointer-events-none ${
            theme === 'dark'
              ? 'bg-gradient-to-r from-[#030611] via-[#030611]/88 to-transparent'
              : 'bg-gradient-to-r from-[#f8fafc] via-[#f8fafc]/90 to-transparent'
          }`}
          style={{ width: '62%' }}
        />

        {/* Scrim Top & Bottom: เบลนด์เข้ากับ Navbar และส่วนล่างอย่างเรียบเนียน */}
        <div
          className={`absolute inset-x-0 top-0 h-28 pointer-events-none bg-gradient-to-b ${
            theme === 'dark' ? 'from-[#030611] to-transparent' : 'from-[#f8fafc] to-transparent'
          }`}
        />
        <div
          className={`absolute inset-x-0 bottom-0 h-36 pointer-events-none bg-gradient-to-t ${
            theme === 'dark' ? 'from-[#030611] via-[#030611]/70 to-transparent' : 'from-[#f8fafc] via-[#f8fafc]/70 to-transparent'
          }`}
        />

        {/* Radial ambient glow focused on the Goal Target summit */}
        <div
          className="absolute right-[8%] top-[14%] w-80 h-80 rounded-full pointer-events-none opacity-45 mix-blend-screen"
          style={{
            background: 'radial-gradient(circle, rgba(251, 191, 36, 0.45) 0%, rgba(56, 189, 248, 0.3) 45%, transparent 70%)',
            filter: 'blur(35px)'
          }}
        />
      </div>

      {/* =====================================================================
          LAYER 3: 60FPS SVG GOAL TRAJECTORY PARTICLES & TARGET RADAR PULSES
          ===================================================================== */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none select-none z-[1]"
        viewBox="0 0 1600 900"
        preserveAspectRatio="xMidYMid slice"
        fill="none"
      >
        <defs>
          {/* Gradients for Trajectory Laser Streams */}
          <linearGradient id="goalGoldCyanLaser" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.2" />
            <stop offset="45%" stopColor="#FBBF24" stopOpacity="0.95" />
            <stop offset="85%" stopColor="#FEF08A" stopOpacity="1" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.9" />
          </linearGradient>

          <linearGradient id="goalPulseGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FDE047" />
            <stop offset="100%" stopColor="#0284C7" />
          </linearGradient>

          {/* Glow Filters */}
          <filter id="goalGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Path 1: Primary Winding Highway to the Goal Summit */}
        <path
          d="M 120 860 C 450 820, 720 740, 960 630 C 1140 550, 1180 390, 1260 210"
          stroke="url(#goalGoldCyanLaser)"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeDasharray="16 12"
          className={isAnimationPaused ? '' : 'animate-goal-laser-flow'}
          filter="url(#goalGlow)"
          opacity="0.85"
        />

        {/* Path 2: Secondary High-Speed Acceleration Beam */}
        <path
          d="M 280 890 C 560 830, 820 710, 1030 580 C 1190 480, 1220 330, 1270 200"
          stroke="#38BDF8"
          strokeWidth="1.8"
          strokeDasharray="12 18"
          className={isAnimationPaused ? '' : 'animate-goal-laser-flow-fast'}
          opacity="0.7"
        />

        {/* Path 3: Tertiary Golden Trajectory Ribbon */}
        <path
          d="M 40 820 C 380 780, 680 690, 920 590 C 1100 510, 1150 360, 1250 220"
          stroke="#FBBF24"
          strokeWidth="1.5"
          strokeDasharray="8 14"
          className={isAnimationPaused ? '' : 'animate-goal-laser-flow'}
          opacity="0.6"
        />

        {/* Animated Waypoint Target Bullseye 1 (Mid-point milestone: Q1-Q3 target achieved) */}
        <g transform="translate(980, 610)">
          {/* Radar ripple rings expanding outward */}
          <circle cx="0" cy="0" r="18" stroke="#38BDF8" strokeWidth="1.6" className={isAnimationPaused ? '' : 'animate-goal-radar-ring-1'} />
          <circle cx="0" cy="0" r="28" stroke="#FBBF24" strokeWidth="1.2" strokeDasharray="4 4" className={isAnimationPaused ? '' : 'animate-goal-radar-ring-2'} />
          <circle cx="0" cy="0" r="8" fill="#FBBF24" />
          <circle cx="0" cy="0" r="3" fill="#FFFFFF" />
        </g>

        {/* Animated Waypoint Target Bullseye 2 (Upper curve milestone: 89.2% of target) */}
        <g transform="translate(1120, 480)">
          <circle cx="0" cy="0" r="14" stroke="#FBBF24" strokeWidth="1.5" className={isAnimationPaused ? '' : 'animate-goal-radar-ring-1'} />
          <circle cx="0" cy="0" r="24" stroke="#38BDF8" strokeWidth="1.2" strokeDasharray="3 3" className={isAnimationPaused ? '' : 'animate-goal-radar-ring-2'} />
          <circle cx="0" cy="0" r="6" fill="#38BDF8" />
          <circle cx="0" cy="0" r="2.5" fill="#FFFFFF" />
        </g>

        {/* The Summit Crystal Peak Beacon: 100% Goal Destination */}
        <g transform="translate(1265, 205)" filter="url(#goalGlow)">
          {/* Triple pulsing concentric victory rings */}
          <circle cx="0" cy="0" r="18" stroke="#FEF08A" strokeWidth="2.5" className={isAnimationPaused ? '' : 'animate-goal-summit-pulse-1'} />
          <circle cx="0" cy="0" r="34" stroke="#F59E0B" strokeWidth="1.8" className={isAnimationPaused ? '' : 'animate-goal-summit-pulse-2'} />
          <circle cx="0" cy="0" r="52" stroke="#38BDF8" strokeWidth="1.2" strokeDasharray="6 4" className={isAnimationPaused ? '' : 'animate-goal-summit-pulse-3'} />

          {/* Central 3D Diamond Star of Victory */}
          <polygon
            points="0,-22 7,-7 22,0 7,7 0,22 -7,7 -22,0 -7,-7"
            fill="url(#goalPulseGradient)"
            stroke="#FFFBEB"
            strokeWidth="1.8"
            className={isAnimationPaused ? '' : 'animate-goal-diamond-spin'}
          />
          <circle cx="0" cy="0" r="5" fill="#FFFFFF" />
        </g>

        {/* Traveling Photons (Particle Data Bullets Moving along the highway) */}
        {!isAnimationPaused && (
          <>
            <circle r="4" fill="#FEF08A" filter="url(#goalGlow)">
              <animateMotion
                path="M 120 860 C 450 820, 720 740, 960 630 C 1140 550, 1180 390, 1260 210"
                dur="4.5s"
                repeatCount="indefinite"
              />
            </circle>
            <circle r="3.2" fill="#38BDF8" filter="url(#goalGlow)">
              <animateMotion
                path="M 280 890 C 560 830, 820 710, 1030 580 C 1190 480, 1220 330, 1270 200"
                dur="3.2s"
                repeatCount="indefinite"
              />
            </circle>
            <circle r="4.5" fill="#FFFFFF" filter="url(#goalGlow)">
              <animateMotion
                path="M 40 820 C 380 780, 680 690, 920 590 C 1100 510, 1150 360, 1250 220"
                dur="5.8s"
                repeatCount="indefinite"
              />
            </circle>
          </>
        )}
      </svg>


      {/* =====================================================================
          LAYER 5: MOUNTAIN OF SUCCESS (ภูเขาแห่งความสำเร็จ) SINGLE BADGE & ANIMATION CONTROLLER
          ===================================================================== */}
      <div className="absolute right-4 sm:right-8 top-4 z-20 flex items-center gap-2 pointer-events-auto">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-[#090e1f]/85 border border-amber-400/30 backdrop-blur-xl shadow-lg text-[11px] font-bold">
          <span className="flex items-center gap-1.5 text-amber-300">
            <span>🏔️</span>
            <span>{isEn ? 'Mountain of Success' : 'ภูเขาแห่งความสำเร็จ'}</span>
          </span>
          <button
            onClick={() => setIsAnimationPaused(!isAnimationPaused)}
            className="px-2 py-0.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition cursor-pointer ml-1 border-l border-white/15"
            title={isAnimationPaused ? (isEn ? 'Resume 3D Animation' : 'เล่นแอนิเมชัน') : (isEn ? 'Pause 3D Animation' : 'หยุดแอนิเมชันชั่วคราว')}
          >
            {isAnimationPaused ? '▶' : '⏸'}
          </button>
        </div>
      </div>

      {/* =====================================================================
          LAYER 6: CHILDREN (MAIN PAGE HERO CONTENT, HEADLINES, FORMS, CARDS)
          ===================================================================== */}
      <div className="relative z-10 w-full">
        {children}
      </div>
    </div>
  );
}


