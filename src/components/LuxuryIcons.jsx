import React from 'react';

/**
 * ชุดไอคอน 3 มิติระดับพรีเมียม (Luxury 3D Glass & 24K Gold / Jewel Vector Icons)
 * ออกแบบให้หรูหรา ทันสมัย มีมิติแสงเงา และดูเข้าใจง่ายสำหรับทุกวัย
 */

export function LuxuryIconBadge({
  variant = 'gold',
  size = 'md',
  active = false,
  children,
  className = ''
}) {
  const palettes = {
    gold: {
      bg: 'linear-gradient(135deg, rgba(251, 191, 36, 0.28) 0%, rgba(217, 119, 6, 0.12) 55%, rgba(15, 23, 42, 0.92) 100%)',
      border: active ? 'rgba(251, 191, 36, 0.95)' : 'rgba(251, 191, 36, 0.45)',
      glow: active ? '0 0 24px rgba(251, 191, 36, 0.45), inset 0 1px 2px rgba(255, 255, 255, 0.45)' : '0 8px 20px -4px rgba(245, 158, 11, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.25)',
      orb: 'radial-gradient(circle at 25% 20%, rgba(253, 224, 71, 0.45), transparent 65%)'
    },
    ruby: {
      bg: 'linear-gradient(135deg, rgba(244, 63, 94, 0.3) 0%, rgba(190, 18, 60, 0.14) 55%, rgba(15, 23, 42, 0.92) 100%)',
      border: active ? 'rgba(251, 113, 133, 0.95)' : 'rgba(244, 63, 94, 0.45)',
      glow: active ? '0 0 24px rgba(244, 63, 94, 0.45), inset 0 1px 2px rgba(255, 255, 255, 0.4)' : '0 8px 20px -4px rgba(244, 63, 94, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.22)',
      orb: 'radial-gradient(circle at 25% 20%, rgba(253, 164, 175, 0.45), transparent 65%)'
    },
    sapphire: {
      bg: 'linear-gradient(135deg, rgba(56, 189, 248, 0.3) 0%, rgba(37, 99, 235, 0.15) 55%, rgba(15, 23, 42, 0.92) 100%)',
      border: active ? 'rgba(56, 189, 248, 0.95)' : 'rgba(56, 189, 248, 0.45)',
      glow: active ? '0 0 24px rgba(56, 189, 248, 0.45), inset 0 1px 2px rgba(255, 255, 255, 0.4)' : '0 8px 20px -4px rgba(56, 189, 248, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.22)',
      orb: 'radial-gradient(circle at 25% 20%, rgba(125, 211, 252, 0.45), transparent 65%)'
    },
    emerald: {
      bg: 'linear-gradient(135deg, rgba(16, 185, 129, 0.3) 0%, rgba(5, 150, 105, 0.14) 55%, rgba(15, 23, 42, 0.92) 100%)',
      border: active ? 'rgba(52, 211, 153, 0.95)' : 'rgba(16, 185, 129, 0.45)',
      glow: active ? '0 0 24px rgba(16, 185, 129, 0.45), inset 0 1px 2px rgba(255, 255, 255, 0.4)' : '0 8px 20px -4px rgba(16, 185, 129, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.22)',
      orb: 'radial-gradient(circle at 25% 20%, rgba(110, 231, 183, 0.45), transparent 65%)'
    },
    amethyst: {
      bg: 'linear-gradient(135deg, rgba(168, 85, 247, 0.32) 0%, rgba(109, 40, 217, 0.15) 55%, rgba(15, 23, 42, 0.92) 100%)',
      border: active ? 'rgba(192, 132, 252, 0.95)' : 'rgba(168, 85, 247, 0.45)',
      glow: active ? '0 0 24px rgba(168, 85, 247, 0.45), inset 0 1px 2px rgba(255, 255, 255, 0.4)' : '0 8px 20px -4px rgba(168, 85, 247, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.22)',
      orb: 'radial-gradient(circle at 25% 20%, rgba(216, 180, 254, 0.45), transparent 65%)'
    },
    cyan: {
      bg: 'linear-gradient(135deg, rgba(34, 211, 238, 0.3) 0%, rgba(8, 145, 178, 0.15) 55%, rgba(15, 23, 42, 0.92) 100%)',
      border: active ? 'rgba(34, 211, 238, 0.95)' : 'rgba(34, 211, 238, 0.45)',
      glow: active ? '0 0 24px rgba(34, 211, 238, 0.45), inset 0 1px 2px rgba(255, 255, 255, 0.4)' : '0 8px 20px -4px rgba(34, 211, 238, 0.25), inset 0 1px 1px rgba(255, 255, 255, 0.22)',
      orb: 'radial-gradient(circle at 25% 20%, rgba(165, 243, 252, 0.45), transparent 65%)'
    },
    platinum: {
      bg: 'linear-gradient(135deg, rgba(226, 232, 240, 0.24) 0%, rgba(100, 116, 139, 0.14) 55%, rgba(15, 23, 42, 0.92) 100%)',
      border: active ? 'rgba(248, 250, 252, 0.9)' : 'rgba(148, 163, 184, 0.45)',
      glow: active ? '0 0 22px rgba(226, 232, 240, 0.35), inset 0 1px 2px rgba(255, 255, 255, 0.45)' : '0 8px 20px -4px rgba(148, 163, 184, 0.2), inset 0 1px 1px rgba(255, 255, 255, 0.2)',
      orb: 'radial-gradient(circle at 25% 20%, rgba(255, 255, 255, 0.38), transparent 65%)'
    }
  };

  const p = palettes[variant] || palettes.gold;
  const dims =
    size === 'sm'
      ? { width: '38px', height: '38px', radius: '12px' }
      : size === 'lg'
      ? { width: '56px', height: '56px', radius: '18px' }
      : size === 'xl'
      ? { width: '64px', height: '64px', radius: '20px' }
      : { width: '46px', height: '46px', radius: '15px' };

  return (
    <div
      className={`relative flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${
        active ? 'scale-105' : 'hover:scale-105'
      } ${className}`}
      style={{
        width: dims.width,
        height: dims.height,
        borderRadius: dims.radius,
        background: p.bg,
        border: `1.5px solid ${p.border}`,
        boxShadow: p.glow,
        overflow: 'hidden'
      }}
    >
      {/* แสงสะท้อนคริสตัลด้านบน */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: p.orb,
          pointerEvents: 'none'
        }}
      />
      {/* เส้นขอบเพชรด้านบน */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '15%',
          right: '15%',
          height: '1.5px',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.75), transparent)',
          pointerEvents: 'none'
        }}
      />
      <div className="relative z-10 flex items-center justify-center">{children}</div>
    </div>
  );
}

/**
 * ไอคอนประจำเมนูและฟีเจอร์หลักทั้งระบบ (Luxury Multi-Layer Vector SVGs)
 */
export function LuxuryModuleIcon({ type = 'overview', size = 26 }) {
  switch (type) {
    case 'overview':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          <defs>
            <linearGradient id="luxGold1" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="50%" stopColor="#FBBF24" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
            <linearGradient id="luxCyan1" x1="6" y1="6" x2="26" y2="26" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#BAE6FD" />
              <stop offset="100%" stopColor="#0284C7" />
            </linearGradient>
          </defs>
          {/* ฐานแท่นกราฟ 3 มิติ */}
          <rect x="4" y="18" width="5.5" height="10" rx="2" fill="url(#luxCyan1)" opacity="0.85" />
          <rect x="13.25" y="12" width="5.5" height="16" rx="2" fill="url(#luxGold1)" />
          <rect x="22.5" y="7" width="5.5" height="21" rx="2" fill="url(#luxGold1)" />
          {/* เส้นพุ่งทะยานพร้อมมงกุฎดาว */}
          <path
            d="M5 14L13.5 8.5L20 11L27 4.5"
            stroke="#FEF08A"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="27" cy="4.5" r="2.5" fill="#FEF08A" />
        </svg>
      );

    case 'customers':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          <defs>
            <linearGradient id="luxRuby" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FECDD3" />
              <stop offset="50%" stopColor="#FB7185" />
              <stop offset="100%" stopColor="#E11D48" />
            </linearGradient>
            <linearGradient id="luxCrown" x1="10" y1="2" x2="22" y2="12" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
          </defs>
          {/* มงกุฎ VIP ด้านบน */}
          <path
            d="M10.5 9.5L13 6L16 8.5L19 6L21.5 9.5H10.5Z"
            fill="url(#luxCrown)"
            stroke="#FEF08A"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          {/* ลูกค้าหลัก */}
          <circle cx="16" cy="14.5" r="4.2" fill="url(#luxRuby)" stroke="#FFE4E6" strokeWidth="1.2" />
          <path
            d="M8.5 26.5C8.5 22.6 11.8 20 16 20C20.2 20 23.5 22.6 23.5 26.5"
            stroke="url(#luxRuby)"
            strokeWidth="2.8"
            strokeLinecap="round"
          />
          {/* ลูกค้าด้านข้าง */}
          <circle cx="7.5" cy="16" r="2.6" fill="#FDA4AF" opacity="0.85" />
          <circle cx="24.5" cy="16" r="2.6" fill="#FDA4AF" opacity="0.85" />
        </svg>
      );

    case 'staff_pos':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          <defs>
            <linearGradient id="luxSapphire" x1="6" y1="4" x2="26" y2="28" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#E0F2FE" />
              <stop offset="50%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#2563EB" />
            </linearGradient>
            <linearGradient id="luxCheckGold" x1="11" y1="12" x2="21" y2="20" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
          </defs>
          {/* โล่คริสตัลป้องกันทุจริต */}
          <path
            d="M16 3.5L26 7.5V15.5C26 22 21.6 26.8 16 28.8C10.4 26.8 6 22 6 15.5V7.5L16 3.5Z"
            fill="url(#luxSapphire)"
            fillOpacity="0.28"
            stroke="url(#luxSapphire)"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          {/* เครื่องหมายถูกทองคำ 24K */}
          <path
            d="M11.5 16L14.8 19.2L21 12.8"
            stroke="url(#luxCheckGold)"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'multi_channel':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          <defs>
            <linearGradient id="luxStoreGold" x1="4" y1="5" x2="28" y2="27" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FDE68A" />
              <stop offset="55%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#B45309" />
            </linearGradient>
          </defs>
          {/* หลังคาร้านค้า Flagship */}
          <path
            d="M5 12L7.5 5.5H24.5L27 12C27 13.8 25.5 15 23.8 15C22.1 15 20.8 13.8 20.8 12C20.8 13.8 19.4 15 17.6 15C15.8 15 14.5 13.8 14.5 12C14.5 13.8 13.1 15 11.4 15C9.6 15 8.2 13.8 8.2 12C8.2 13.8 6.8 15 5 12Z"
            fill="url(#luxStoreGold)"
            stroke="#FEF08A"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
          {/* ตัวอาคารและประตู */}
          <path
            d="M7.5 15V26.5H24.5V15"
            stroke="#FBBF24"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect x="13" y="19" width="6" height="7.5" rx="1.2" fill="#38BDF8" fillOpacity="0.45" stroke="#BAE6FD" strokeWidth="1.4" />
          {/* วงโคจรออนไลน์ */}
          <circle cx="25" cy="7" r="3" fill="#34D399" stroke="#ECFDF5" strokeWidth="1.2" />
        </svg>
      );

    case 'inventory':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          <defs>
            <linearGradient id="luxEmerald" x1="5" y1="4" x2="27" y2="28" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#A7F3D0" />
              <stop offset="50%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>
          </defs>
          {/* กล่องคริสตัล 3 มิติ */}
          <path
            d="M16 4L27 10V22L16 28L5 22V10L16 4Z"
            fill="url(#luxEmerald)"
            fillOpacity="0.25"
            stroke="url(#luxEmerald)"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <path d="M5 10L16 16L27 10" stroke="#A7F3D0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M16 16V28" stroke="#A7F3D0" strokeWidth="2" strokeLinecap="round" />
          {/* แถบเพชรด้านบนกล่อง */}
          <path d="M11 7.2L21 12.8" stroke="#FBBF24" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      );

    case 'insights':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          <defs>
            <linearGradient id="luxAmethyst" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#F3E8FF" />
              <stop offset="45%" stopColor="#C084FC" />
              <stop offset="100%" stopColor="#7E22CE" />
            </linearGradient>
          </defs>
          {/* ประกายเพชร AI อัจฉริยะ */}
          <path
            d="M16 3.5L19.2 12.8L28.5 16L19.2 19.2L16 28.5L12.8 19.2L3.5 16L12.8 12.8L16 3.5Z"
            fill="url(#luxAmethyst)"
            stroke="#F3E8FF"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          {/* ดาวทองคำเสริมด้านบน */}
          <path
            d="M25.5 4L26.4 6.6L29 7.5L26.4 8.4L25.5 11L24.6 8.4L22 7.5L24.6 6.6L25.5 4Z"
            fill="#FBBF24"
          />
          <circle cx="16" cy="16" r="2.3" fill="#FEF08A" />
        </svg>
      );

    case 'live':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          <defs>
            <linearGradient id="luxBolt" x1="8" y1="3" x2="24" y2="29" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="50%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#0284C7" />
            </linearGradient>
          </defs>
          <circle cx="16" cy="16" r="12" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.65" />
          <path
            d="M17.5 4.5L7.5 17.5H15.5L14 27.5L24.5 14.5H16.5L17.5 4.5Z"
            fill="url(#luxBolt)"
            stroke="#E0F2FE"
            strokeWidth="1.4"
            strokeLinejoin="round"
          />
        </svg>
      );

    case 'database':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          <defs>
            <linearGradient id="luxDb" x1="6" y1="4" x2="26" y2="28" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#BAE6FD" />
              <stop offset="50%" stopColor="#60A5FA" />
              <stop offset="100%" stopColor="#1D4ED8" />
            </linearGradient>
          </defs>
          <ellipse cx="16" cy="8" rx="10" ry="4" fill="url(#luxDb)" stroke="#E0F2FE" strokeWidth="1.5" />
          <path
            d="M6 8V16C6 18.2 10.5 20 16 20C21.5 20 26 18.2 26 16V8"
            stroke="#60A5FA"
            strokeWidth="2"
          />
          <path
            d="M6 16V24C6 26.2 10.5 28 16 28C21.5 28 26 26.2 26 24V16"
            stroke="#FBBF24"
            strokeWidth="2"
          />
          <circle cx="21" cy="15" r="1.4" fill="#FEF08A" />
          <circle cx="21" cy="23" r="1.4" fill="#34D399" />
        </svg>
      );

    case 'admin':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          <defs>
            <linearGradient id="luxLock" x1="7" y1="6" x2="25" y2="28" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FDE68A" />
              <stop offset="50%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#E11D48" />
            </linearGradient>
          </defs>
          <rect
            x="7"
            y="14"
            width="18"
            height="14"
            rx="4"
            fill="url(#luxLock)"
            fillOpacity="0.28"
            stroke="url(#luxLock)"
            strokeWidth="2.2"
          />
          <path
            d="M11 14V10C11 7.2 13.2 5 16 5C18.8 5 21 7.2 21 10V14"
            stroke="#FEF08A"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          <circle cx="16" cy="20" r="2" fill="#FEF08A" />
          <path d="M16 22V24.5" stroke="#FEF08A" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'settings':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          <defs>
            <linearGradient id="luxPlatinum" x1="5" y1="5" x2="27" y2="27" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#F8FAFC" />
              <stop offset="50%" stopColor="#CBD5E1" />
              <stop offset="100%" stopColor="#64748B" />
            </linearGradient>
          </defs>
          {/* แถบปรับแต่ง Luxury Sliders */}
          <line x1="6" y1="10" x2="26" y2="10" stroke="url(#luxPlatinum)" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="6" y1="16" x2="26" y2="16" stroke="url(#luxPlatinum)" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="6" y1="22" x2="26" y2="22" stroke="url(#luxPlatinum)" strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="12" cy="10" r="3.2" fill="#FBBF24" stroke="#FEF08A" strokeWidth="1.4" />
          <circle cx="20" cy="16" r="3.2" fill="#38BDF8" stroke="#E0F2FE" strokeWidth="1.4" />
          <circle cx="14" cy="22" r="3.2" fill="#34D399" stroke="#D1FAE5" strokeWidth="1.4" />
        </svg>
      );

    case 'upload':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          <defs>
            <linearGradient id="luxUploadGold" x1="6" y1="4" x2="26" y2="28" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="50%" stopColor="#FBBF24" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
          </defs>
          <path
            d="M8 22C5.8 22 4 20.2 4 18C4 16 5.5 14.3 7.4 14C8.1 9.5 11.7 6 16 6C20.8 6 24.7 9.8 24.9 14.5C26.7 15.1 28 16.8 28 18.8C28 21.1 26.2 23 23.8 23H21"
            stroke="url(#luxUploadGold)"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M16 27V14" stroke="#FEF08A" strokeWidth="2.6" strokeLinecap="round" />
          <path d="M11.5 18L16 13.5L20.5 18" stroke="#FEF08A" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'crown':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          <path
            d="M4.5 23L7 9.5L13 15L16 7.5L19 15L25 9.5L27.5 23H4.5Z"
            fill="url(#luxGold1)"
            stroke="#FEF08A"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <rect x="6" y="25" width="20" height="2.5" rx="1.2" fill="#FBBF24" />
        </svg>
      );

    case 'alert':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          <path
            d="M16 4.5L28.5 26H3.5L16 4.5Z"
            fill="rgba(244, 63, 94, 0.25)"
            stroke="#FB7185"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <path d="M16 12.5V18.5" stroke="#FEF08A" strokeWidth="2.6" strokeLinecap="round" />
          <circle cx="16" cy="22.5" r="1.5" fill="#FEF08A" />
        </svg>
      );

    case 'wallet':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          <rect x="4" y="8" width="24" height="17" rx="4" fill="rgba(251, 191, 36, 0.22)" stroke="#FBBF24" strokeWidth="2.2" />
          <path d="M8 8V6.5C8 5.4 8.9 4.5 10 4.5H22C23.1 4.5 24 5.4 24 6.5V8" stroke="#FEF08A" strokeWidth="1.8" />
          <rect x="19" y="13.5" width="9" height="6" rx="2" fill="#FBBF24" stroke="#FEF08A" strokeWidth="1.2" />
          <circle cx="22.5" cy="16.5" r="1.3" fill="#0F172A" />
        </svg>
      );

    case 'basket':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          <path d="M6 13H26L23.5 26H8.5L6 13Z" fill="rgba(56, 189, 248, 0.24)" stroke="#38BDF8" strokeWidth="2.2" strokeLinejoin="round" />
          <path d="M11 13L14 6.5M21 13L18 6.5" stroke="#FEF08A" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="13" y1="17.5" x2="13" y2="22" stroke="#BAE6FD" strokeWidth="2" strokeLinecap="round" />
          <line x1="19" y1="17.5" x2="19" y2="22" stroke="#BAE6FD" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'rocket':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          <path
            d="M16 4C20.5 7.5 22 13 22 18.5L16 23L10 18.5C10 13 11.5 7.5 16 4Z"
            fill="rgba(16, 185, 129, 0.28)"
            stroke="#34D399"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <circle cx="16" cy="13.5" r="2.5" fill="#FEF08A" />
          <path d="M10 16.5L6 20.5L10 21.5M22 16.5L26 20.5L22 21.5" stroke="#FBBF24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14 23.5L16 28L18 23.5" stroke="#FB7185" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'trophy':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          <path d="M9 5H23V13C23 16.9 19.9 20 16 20C12.1 20 9 16.9 9 13V5Z" fill="rgba(251, 191, 36, 0.3)" stroke="#FBBF24" strokeWidth="2.2" />
          <path d="M9 8H5.5V11C5.5 13 7 14.5 9 14.5M23 8H26.5V11C26.5 13 25 14.5 23 14.5" stroke="#FEF08A" strokeWidth="2" strokeLinecap="round" />
          <path d="M16 20V25.5M11 26H21" stroke="#FBBF24" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      );

    case 'diamond':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          <path d="M9.5 5.5H22.5L28 12.5L16 27L4 12.5L9.5 5.5Z" fill="rgba(56, 189, 248, 0.28)" stroke="#7DD3FC" strokeWidth="2.2" strokeLinejoin="round" />
          <path d="M4 12.5H28M16 27L11.5 12.5L16 5.5L20.5 12.5L16 27Z" stroke="#E0F2FE" strokeWidth="1.4" strokeLinejoin="round" />
        </svg>
      );

    case 'target':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          <circle cx="16" cy="16" r="11.5" stroke="#FBBF24" strokeWidth="2.2" />
          <circle cx="16" cy="16" r="7" stroke="#38BDF8" strokeWidth="2" strokeDasharray="3 2" />
          <circle cx="16" cy="16" r="3" fill="#FEF08A" />
        </svg>
      );

    case 'procurement':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          <defs>
            <linearGradient id="luxProcGold" x1="3" y1="4" x2="29" y2="28" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="50%" stopColor="#FBBF24" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
            <linearGradient id="luxProcCyan" x1="4" y1="6" x2="28" y2="26" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#BAE6FD" />
              <stop offset="55%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#0284C7" />
            </linearGradient>
          </defs>
          <path
            d="M16 3.5L27.5 9.5V21.5L16 27.5L4.5 21.5V9.5L16 3.5Z"
            fill="rgba(245, 158, 11, 0.16)"
            stroke="url(#luxProcGold)"
            strokeWidth="2.1"
            strokeLinejoin="round"
          />
          <path
            d="M4.5 9.5L16 15.5L27.5 9.5M16 15.5V27.5"
            stroke="url(#luxProcCyan)"
            strokeWidth="1.9"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="22.5" cy="22.5" r="5.5" fill="#064E3B" stroke="#34D399" strokeWidth="2" />
          <path d="M20.2 22.5L21.8 24.1L25 20.9" stroke="#A7F3D0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'speed_engine':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          <defs>
            <linearGradient id="luxSpeedGold" x1="6" y1="2" x2="26" y2="30" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFBEB" />
              <stop offset="45%" stopColor="#FDE047" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
            <linearGradient id="luxSpeedCyan" x1="2" y1="4" x2="30" y2="28" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#E0F2FE" />
              <stop offset="50%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#0284C7" />
            </linearGradient>
          </defs>
          <circle cx="16" cy="16" r="13" stroke="url(#luxSpeedCyan)" strokeWidth="1.8" strokeDasharray="6 3" opacity="0.75" />
          <circle cx="16" cy="16" r="9.5" fill="rgba(251, 191, 36, 0.14)" stroke="rgba(253, 224, 71, 0.35)" strokeWidth="1.2" />
          <path
            d="M17.8 3.5L7.5 17.2H15.2L13.8 28.5L24.5 14.2H16.6L17.8 3.5Z"
            fill="url(#luxSpeedGold)"
            stroke="#FFFBEB"
            strokeWidth="1.1"
            strokeLinejoin="round"
          />
          <circle cx="5" cy="10" r="1.6" fill="#38BDF8" />
          <circle cx="27" cy="22" r="1.6" fill="#FEF08A" />
        </svg>
      );

    case 'precision_target':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          <defs>
            <linearGradient id="luxTargetGold" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="50%" stopColor="#FBBF24" />
              <stop offset="100%" stopColor="#B45309" />
            </linearGradient>
            <linearGradient id="luxTargetRuby" x1="6" y1="6" x2="26" y2="26" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FECDD3" />
              <stop offset="50%" stopColor="#F43F5E" />
              <stop offset="100%" stopColor="#BE123C" />
            </linearGradient>
            <linearGradient id="luxTargetEmerald" x1="12" y1="4" x2="29" y2="18" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#A7F3D0" />
              <stop offset="100%" stopColor="#10B981" />
            </linearGradient>
          </defs>
          <circle cx="15.5" cy="16.5" r="11.5" fill="rgba(244, 63, 94, 0.12)" stroke="url(#luxTargetGold)" strokeWidth="2" />
          <circle cx="15.5" cy="16.5" r="7.2" fill="rgba(251, 191, 36, 0.12)" stroke="url(#luxTargetRuby)" strokeWidth="1.8" />
          <path d="M15.5 2.5V5.5M15.5 27.5V30M2 16.5H4.5M26.5 16.5H29" stroke="#FDE047" strokeWidth="1.6" strokeLinecap="round" />
          <circle cx="15.5" cy="16.5" r="3.2" fill="#FEF08A" stroke="#F43F5E" strokeWidth="1.4" />
          <path d="M28.5 3.5L16.2 15.8" stroke="url(#luxTargetEmerald)" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M23.5 3.5H28.5V8.5" stroke="#A7F3D0" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'global_shield':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          <defs>
            <linearGradient id="luxShieldEmerald" x1="5" y1="3" x2="27" y2="29" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#D1FAE5" />
              <stop offset="45%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#065F46" />
            </linearGradient>
            <linearGradient id="luxShieldGold" x1="6" y1="3" x2="26" y2="28" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFBEB" />
              <stop offset="50%" stopColor="#FBBF24" />
              <stop offset="100%" stopColor="#B45309" />
            </linearGradient>
          </defs>
          <path
            d="M16 2.8L26.8 6.8V15.4C26.8 22.3 22.1 27.4 16 29.5C9.9 27.4 5.2 22.3 5.2 15.4V6.8L16 2.8Z"
            fill="rgba(16, 185, 129, 0.18)"
            stroke="url(#luxShieldGold)"
            strokeWidth="2.1"
            strokeLinejoin="round"
          />
          <path
            d="M16 5.6L24 8.6V15.1C24 20.4 20.5 24.4 16 26.3C11.5 24.4 8 20.4 8 15.1V8.6L16 5.6Z"
            fill="url(#luxShieldEmerald)"
            fillOpacity="0.28"
            stroke="#6EE7B7"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          <ellipse cx="16" cy="15.8" rx="6.5" ry="3.2" stroke="rgba(254, 240, 138, 0.45)" strokeWidth="1" />
          <circle cx="16" cy="15.8" r="4.8" fill="#064E3B" stroke="url(#luxShieldGold)" strokeWidth="1.6" />
          <path d="M13.6 15.8L15.3 17.5L18.7 14.1" stroke="#FEF08A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'pipeline':
    case 'etl':
      return <EtlPipelineIcon size={size} />;

    case 'records':
    case 'master_records':
      return <MasterRecordsIcon size={size} />;

    case 'governance':
    case 'data_governance':
      return <DataGovernanceIcon size={size} />;

    default:
      return null;
  }
}

/**
 * Ultra-Luxury 3D Brand Emblem Logo for InsightFlow
 * Features:
 * - Double-beveled 24K Champagne Gold & Platinum squircle-octagon jewel housing
 * - Deep Midnight Obsidian & Royal Sapphire core with ambient gold/cyan light refraction
 * - 3D Faceted Diamond Crown crest + Ascending Isometric Crystal Pillars + Golden Victory Trajectory
 */
export function LuxuryBrandLogo({ size = 48, className = '' }) {
  const rawId = React.useId();
  const uid = rawId.replace(/:/g, '');

  return (
    <div
      className={`relative inline-flex items-center justify-center select-none ${className}`}
      style={{
        width: size,
        height: size,
        borderRadius: Math.round(size * 0.28),
        padding: 2,
        background:
          'linear-gradient(135deg, #FEF08A 0%, #F59E0B 30%, #38BDF8 68%, #FBBF24 100%)',
        boxShadow:
          '0 10px 28px -6px rgba(245, 158, 11, 0.55), 0 0 18px rgba(56, 189, 248, 0.35), inset 0 1px 2px rgba(255, 255, 255, 0.75)'
      }}
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: Math.max(6, Math.round(size * 0.28) - 2),
          background:
            'radial-gradient(circle at 28% 22%, #162447 0%, #070C1E 58%, #030611 100%)',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {/* Top Specular Glass Reflection */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '8%',
            right: '8%',
            height: '42%',
            borderRadius: '0 0 999px 999px',
            background:
              'linear-gradient(180deg, rgba(255, 255, 255, 0.24) 0%, rgba(255, 255, 255, 0) 100%)',
            pointerEvents: 'none'
          }}
        />

        <svg
          viewBox="0 0 120 120"
          width="92%"
          height="92%"
          style={{
            overflow: 'visible',
            filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.65))'
          }}
        >
          <defs>
            <linearGradient id={`${uid}-gold`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFBEB" />
              <stop offset="28%" stopColor="#FDE047" />
              <stop offset="65%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#B45309" />
            </linearGradient>

            <linearGradient id={`${uid}-goldBright`} x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#D97706" />
              <stop offset="50%" stopColor="#FBBF24" />
              <stop offset="100%" stopColor="#FEF9C3" />
            </linearGradient>

            <linearGradient id={`${uid}-cyan`} x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0284C7" />
              <stop offset="55%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#E0F2FE" />
            </linearGradient>

            <linearGradient id={`${uid}-emerald`} x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#059669" />
              <stop offset="60%" stopColor="#34D399" />
              <stop offset="100%" stopColor="#D1FAE5" />
            </linearGradient>
          </defs>

          {/* Outer Precision Luxury Octagon Frame */}
          <polygon
            points="60,8 96,23 112,60 96,97 60,112 24,97 8,60 24,23"
            fill="none"
            stroke={`url(#${uid}-gold)`}
            strokeWidth="2.2"
            strokeOpacity="0.55"
          />

          {/* Inner Geometric Halo Ring */}
          <circle
            cx="60"
            cy="60"
            r="42"
            fill="none"
            stroke={`url(#${uid}-cyan)`}
            strokeWidth="1.5"
            strokeDasharray="5 4"
            strokeOpacity="0.5"
          />

          {/* 3D Faceted Royal Diamond & Crown Crest at Top */}
          <polygon
            points="60,15 74,29 60,41 46,29"
            fill={`url(#${uid}-goldBright)`}
          />
          <polygon
            points="60,15 74,29 60,29"
            fill="#FFFBEB"
            fillOpacity="0.65"
          />
          <polygon
            points="46,29 60,29 60,41"
            fill="#B45309"
            fillOpacity="0.5"
          />

          {/* 3 Ascending 3D Isometric Data Pillars */}
          {/* Pillar 1 (Left - Sapphire Cyan) */}
          <rect
            x="28"
            y="64"
            width="14"
            height="28"
            rx="4"
            fill={`url(#${uid}-cyan)`}
          />
          {/* Pillar 2 (Center - Emerald / Cyan Blend) */}
          <rect
            x="51"
            y="50"
            width="14"
            height="42"
            rx="4"
            fill={`url(#${uid}-emerald)`}
          />
          {/* Pillar 3 (Right - 24K Gold Flagship Pillar) */}
          <rect
            x="74"
            y="34"
            width="15"
            height="58"
            rx="4.5"
            fill={`url(#${uid}-goldBright)`}
          />

          {/* Dynamic Sweeping Golden Trajectory Wave */}
          <path
            d="M 20 82 C 42 78, 62 56, 94 24"
            fill="none"
            stroke="#FFFBEB"
            strokeWidth="5.5"
            strokeLinecap="round"
          />
          <path
            d="M 20 82 C 42 78, 62 56, 94 24"
            fill="none"
            stroke={`url(#${uid}-gold)`}
            strokeWidth="3.5"
            strokeLinecap="round"
          />

          {/* Arrowhead & 4-Point Star Spark at Apex */}
          <polygon points="100,18 83,21 95,35" fill="#FEF08A" />
          <path
            d="M98 12 L100 18 L106 20 L100 22 L98 28 L96 22 L90 20 L96 18 Z"
            fill="#FFFFFF"
          />

          {/* Base Pedestal Gold Line */}
          <line
            x1="22"
            y1="96"
            x2="98"
            y2="96"
            stroke={`url(#${uid}-gold)`}
            strokeWidth="3"
            strokeLinecap="round"
          />
        </svg>
      </div>
    </div>
  );
}

// ==============================================================================
// STANDALONE 3D LUXURY VECTOR ICONS FOR GOVERNANCE & ETL
// ==============================================================================

/**
 * 1. ETL Pipeline Icon (3D Gold & Cyan Automated Data Stream)
 */
export function EtlPipelineIcon({ size = 24, className = '' }) {
  const id = React.useId().replace(/:/g, '');
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
      <defs>
        <linearGradient id={`etlGold_${id}`} x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFBEB" />
          <stop offset="45%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>
        <linearGradient id={`etlCyan_${id}`} x1="6" y1="10" x2="26" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E0F2FE" />
          <stop offset="50%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#0284C7" />
        </linearGradient>
      </defs>
      <circle cx="16" cy="16" r="13" stroke={`url(#etlCyan_${id})`} strokeWidth="1.8" strokeDasharray="5 3" opacity="0.65" />
      <path
        d="M17.5 3.5L7.5 16.5H15.2L13.8 28.5L24.5 14.5H16.8L17.5 3.5Z"
        fill={`url(#etlGold_${id})`}
        stroke="#FFFBEB"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <circle cx="25.5" cy="8.5" r="2.2" fill="#38BDF8" stroke="#FFF" strokeWidth="0.8" />
      <circle cx="6.5" cy="22.5" r="1.8" fill="#34D399" />
    </svg>
  );
}

/**
 * 2. Master Records Icon (3D Sapphire & Gold Transaction Ledger)
 */
export function MasterRecordsIcon({ size = 24, className = '' }) {
  const id = React.useId().replace(/:/g, '');
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
      <defs>
        <linearGradient id={`recGold_${id}`} x1="6" y1="4" x2="26" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFBEB" />
          <stop offset="45%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
        <linearGradient id={`recBlue_${id}`} x1="4" y1="6" x2="28" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E0F2FE" />
          <stop offset="50%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#1E40AF" />
        </linearGradient>
      </defs>
      <rect x="5.5" y="6.5" width="21" height="22" rx="4" fill="rgba(30, 64, 175, 0.22)" stroke={`url(#recBlue_${id})`} strokeWidth="2" />
      <rect x="11.5" y="3.5" width="9" height="5" rx="1.8" fill={`url(#recGold_${id})`} stroke="#FFFBEB" strokeWidth="1" />
      <line x1="9.5" y1="13.5" x2="22.5" y2="13.5" stroke="#BAE6FD" strokeWidth="2" strokeLinecap="round" />
      <line x1="9.5" y1="18" x2="18.5" y2="18" stroke="#BAE6FD" strokeWidth="2" strokeLinecap="round" />
      <line x1="9.5" y1="22.5" x2="20.5" y2="22.5" stroke="#BAE6FD" strokeWidth="2" strokeLinecap="round" />
      <circle cx="22" cy="22.5" r="3.2" fill="#10B981" stroke="#FEF08A" strokeWidth="1" />
    </svg>
  );
}

/**
 * 3. Data Governance & RBAC Shield Icon (3D Royal Emerald & Gold Aegis Shield)
 */
export function DataGovernanceIcon({ size = 24, className = '' }) {
  const id = React.useId().replace(/:/g, '');
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
      <defs>
        <linearGradient id={`govGold_${id}`} x1="5" y1="3" x2="27" y2="29" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFBEB" />
          <stop offset="45%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>
        <linearGradient id={`govEmerald_${id}`} x1="6" y1="4" x2="26" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#D1FAE5" />
          <stop offset="45%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#065F46" />
        </linearGradient>
      </defs>
      <path
        d="M16 2.8L26.8 6.8V15.4C26.8 22.3 22.1 27.4 16 29.5C9.9 27.4 5.2 22.3 5.2 15.4V6.8L16 2.8Z"
        fill="rgba(16, 185, 129, 0.24)"
        stroke={`url(#govGold_${id})`}
        strokeWidth="2.1"
        strokeLinejoin="round"
      />
      <path
        d="M16 5.8L23.8 8.8V15.1C23.8 20.4 20.3 24.3 16 26.2C11.7 24.3 8.2 20.4 8.2 15.1V8.8L16 5.8Z"
        fill={`url(#govEmerald_${id})`}
        fillOpacity="0.32"
        stroke="#6EE7B7"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <circle cx="16" cy="13.5" r="3.2" fill={`url(#govGold_${id})`} stroke="#FFFBEB" strokeWidth="1" />
      <path d="M16 16.5V22M16 19.5H18.8" stroke="#FFFBEB" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * 4. RBAC Owner Icon (3D Emperor Crown with 24K Gold & Ruby)
 */
export function RbacOwnerIcon({ size = 24, className = '' }) {
  const id = React.useId().replace(/:/g, '');
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
      <defs>
        <linearGradient id={`crownGold_${id}`} x1="4" y1="5" x2="28" y2="27" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFBEB" />
          <stop offset="45%" stopColor="#FDE047" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
        <linearGradient id={`rubyRed_${id}`} x1="14" y1="16" x2="18" y2="20" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FECDD3" />
          <stop offset="100%" stopColor="#E11D48" />
        </linearGradient>
      </defs>
      <circle cx="16" cy="16" r="12" stroke="rgba(251, 191, 36, 0.35)" strokeWidth="1.2" strokeDasharray="3 3" />
      <path
        d="M5 22L7.2 9.5L12.8 15L16 6.8L19.2 15L24.8 9.5L27 22H5Z"
        fill={`url(#crownGold_${id})`}
        stroke="#FFFBEB"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <rect x="6" y="23.5" width="20" height="3.2" rx="1.6" fill={`url(#crownGold_${id})`} stroke="#FEF08A" strokeWidth="1" />
      <circle cx="16" cy="4.8" r="1.9" fill="#FEF08A" stroke="#FFF" strokeWidth="0.8" />
      <circle cx="7" cy="7.5" r="1.6" fill="#38BDF8" />
      <circle cx="25" cy="7.5" r="1.6" fill="#38BDF8" />
      <polygon points="16,14.5 18.5,17.5 16,20.5 13.5,17.5" fill={`url(#rubyRed_${id})`} stroke="#FFFBEB" strokeWidth="0.8" />
    </svg>
  );
}

/**
 * 5. RBAC Manager Icon (3D Sapphire Executive Manager Crest)
 */
export function RbacManagerIcon({ size = 24, className = '' }) {
  const id = React.useId().replace(/:/g, '');
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
      <defs>
        <linearGradient id={`mgrSapphire_${id}`} x1="5" y1="4" x2="27" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E0F2FE" />
          <stop offset="50%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#1E40AF" />
        </linearGradient>
        <linearGradient id={`mgrGold_${id}`} x1="10" y1="8" x2="22" y2="24" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFBEB" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
      </defs>
      <path
        d="M16 3.5L25.5 7.5V14.8C25.5 21 21.2 25.8 16 27.8C10.8 25.8 6.5 21 6.5 14.8V7.5L16 3.5Z"
        fill="rgba(56, 189, 248, 0.22)"
        stroke={`url(#mgrSapphire_${id})`}
        strokeWidth="2.1"
        strokeLinejoin="round"
      />
      <path d="M10.5 10L16 16.5L21.5 10" stroke="#BAE6FD" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <polygon points="15,14 17,14 17.8,21 16,23 14.2,21" fill={`url(#mgrGold_${id})`} stroke="#FFFBEB" strokeWidth="0.8" />
    </svg>
  );
}

/**
 * 6. RBAC Cashier Icon (3D Emerald POS Terminal Register)
 */
export function RbacCashierIcon({ size = 24, className = '' }) {
  const id = React.useId().replace(/:/g, '');
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
      <defs>
        <linearGradient id={`cshEmerald_${id}`} x1="6" y1="4" x2="26" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#D1FAE5" />
          <stop offset="50%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id={`cshGold_${id}`} x1="8" y1="18" x2="24" y2="26" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFBEB" />
          <stop offset="100%" stopColor="#FBBF24" />
        </linearGradient>
      </defs>
      <rect x="7" y="6" width="18" height="12" rx="2.5" fill="#0B132B" stroke={`url(#cshEmerald_${id})`} strokeWidth="1.8" />
      <line x1="10.5" y1="10" x2="16.5" y2="10" stroke="#34D399" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="10.5" y1="13.5" x2="21.5" y2="13.5" stroke="#A7F3D0" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M14 18V21.5H18V18" stroke="#64748B" strokeWidth="2" strokeLinecap="round" />
      <rect x="5.5" y="21.5" width="21" height="6" rx="2" fill="rgba(16, 185, 129, 0.25)" stroke={`url(#cshGold_${id})`} strokeWidth="1.6" />
      <circle cx="16" cy="24.5" r="1.3" fill="#FFFBEB" />
      <line x1="19" y1="24.5" x2="23" y2="24.5" stroke="#FEF08A" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

/**
 * 7. Vault Lock Icon (3D Golden Security Lock & Vault)
 */
export function VaultLockIcon({ size = 24, className = '' }) {
  const id = React.useId().replace(/:/g, '');
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
      <defs>
        <linearGradient id={`vltGold_${id}`} x1="5" y1="4" x2="27" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFBEB" />
          <stop offset="50%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>
      </defs>
      <path
        d="M10.5 13.5V9.5C10.5 6.5 12.9 4 16 4C19.1 4 21.5 6.5 21.5 9.5V13.5"
        stroke={`url(#vltGold_${id})`}
        strokeWidth="2.8"
        strokeLinecap="round"
      />
      <rect x="7" y="13.5" width="18" height="14" rx="4" fill="rgba(251, 191, 36, 0.22)" stroke={`url(#vltGold_${id})`} strokeWidth="2" />
      <circle cx="16" cy="19.5" r="2.2" fill="#FEF08A" />
      <path d="M16 21.5V24" stroke="#FEF08A" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/**
 * 8. Net Profit Icon (3D Gold Bullion Bar & Growth Diamond)
 */
export function NetProfitIcon({ size = 24, className = '' }) {
  const id = React.useId().replace(/:/g, '');
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
      <defs>
        <linearGradient id={`npGold_${id}`} x1="4" y1="5" x2="28" y2="27" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFBEB" />
          <stop offset="45%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
        <linearGradient id={`npEmerald_${id}`} x1="12" y1="4" x2="28" y2="20" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#A7F3D0" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
      </defs>
      <ellipse cx="12" cy="22" rx="7" ry="3.5" fill={`url(#npGold_${id})`} stroke="#FFFBEB" strokeWidth="1" />
      <ellipse cx="12" cy="18" rx="7" ry="3.5" fill={`url(#npGold_${id})`} stroke="#FFFBEB" strokeWidth="1" />
      <ellipse cx="12" cy="14" rx="7" ry="3.5" fill={`url(#npGold_${id})`} stroke="#FFFBEB" strokeWidth="1" />
      <polygon points="23,4 28,10 23,20 18,10" fill={`url(#npEmerald_${id})`} stroke="#FEF08A" strokeWidth="1.2" />
      <line x1="23" y1="4" x2="23" y2="20" stroke="#FFFBEB" strokeWidth="0.8" />
    </svg>
  );
}

/**
 * 9. Unit Cost Icon (3D Isometric Crate with Gold Lock)
 */
export function UnitCostIcon({ size = 24, className = '' }) {
  const id = React.useId().replace(/:/g, '');
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
      <defs>
        <linearGradient id={`ucAmber_${id}`} x1="5" y1="4" x2="27" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FEF08A" />
          <stop offset="50%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>
      </defs>
      <path
        d="M16 3.5L27 9.5V21.5L16 27.5L5 21.5V9.5L16 3.5Z"
        fill="rgba(245, 158, 11, 0.18)"
        stroke={`url(#ucAmber_${id})`}
        strokeWidth="2.1"
        strokeLinejoin="round"
      />
      <path d="M5 9.5L16 15.5L27 9.5M16 15.5V27.5" stroke="#FEF08A" strokeWidth="1.8" />
      <circle cx="16" cy="15.5" r="3.2" fill="#0F172A" stroke="#FEF08A" strokeWidth="1.2" />
      <path d="M14.5 15.5H17.5" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/**
 * 10. Branch Scope Icon (3D Flagship Architecture & Multi-Branch Hub)
 */
export function BranchScopeIcon({ size = 24, className = '' }) {
  const id = React.useId().replace(/:/g, '');
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
      <defs>
        <linearGradient id={`brnCyan_${id}`} x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E0F2FE" />
          <stop offset="50%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#1E3A8A" />
        </linearGradient>
      </defs>
      <rect x="10.5" y="8" width="11" height="19" rx="2" fill="rgba(56, 189, 248, 0.22)" stroke={`url(#brnCyan_${id})`} strokeWidth="1.8" />
      <line x1="13.5" y1="12" x2="18.5" y2="12" stroke="#BAE6FD" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="13.5" y1="16" x2="18.5" y2="16" stroke="#BAE6FD" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="13.5" y1="20" x2="18.5" y2="20" stroke="#BAE6FD" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="4" y="14" width="6.5" height="13" rx="1.5" fill="rgba(56, 189, 248, 0.15)" stroke="#7DD3FC" strokeWidth="1.3" />
      <rect x="21.5" y="14" width="6.5" height="13" rx="1.5" fill="rgba(56, 189, 248, 0.15)" stroke="#7DD3FC" strokeWidth="1.3" />
      <circle cx="16" cy="4" r="2" fill="#34D399" stroke="#FFF" strokeWidth="0.8" />
    </svg>
  );
}

/**
 * 11. Privacy Mask Icon (3D Biometric ID Shield with Keyhole)
 */
export function PrivacyMaskIcon({ size = 24, className = '' }) {
  const id = React.useId().replace(/:/g, '');
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
      <defs>
        <linearGradient id={`prvPurple_${id}`} x1="5" y1="4" x2="27" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FAF5FF" />
          <stop offset="50%" stopColor="#C084FC" />
          <stop offset="100%" stopColor="#6B21A8" />
        </linearGradient>
      </defs>
      <circle cx="16" cy="11" r="5" fill="rgba(192, 132, 252, 0.25)" stroke={`url(#prvPurple_${id})`} strokeWidth="1.8" />
      <path
        d="M7 26.5C7 21.5 11 18.5 16 18.5C21 18.5 25 21.5 25 26.5"
        stroke={`url(#prvPurple_${id})`}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <circle cx="23" cy="22" r="4.5" fill="#0B132B" stroke="#FEF08A" strokeWidth="1.5" />
      <path d="M23 20V24M21 22H25" stroke="#FEF08A" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

/**
 * 12. Quarantine Laser Dome Icon (3D Ruby & Amber Containment Firewall)
 */
export function QuarantineDomeIcon({ size = 24, className = '' }) {
  const id = React.useId().replace(/:/g, '');
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
      <defs>
        <linearGradient id={`qrnRuby_${id}`} x1="5" y1="3" x2="27" y2="29" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFE4E6" />
          <stop offset="50%" stopColor="#FB7185" />
          <stop offset="100%" stopColor="#BE123C" />
        </linearGradient>
      </defs>
      <path
        d="M5 26C5 15.5 10 7 16 7C22 7 27 15.5 27 26H5Z"
        fill="rgba(244, 63, 94, 0.18)"
        stroke={`url(#qrnRuby_${id})`}
        strokeWidth="2.1"
      />
      <line x1="5" y1="26" x2="27" y2="26" stroke="#FEF08A" strokeWidth="2.4" strokeLinecap="round" />
      <line x1="8" y1="18" x2="24" y2="18" stroke="#FDA4AF" strokeWidth="1.5" strokeDasharray="3 2" />
      <circle cx="16" cy="17" r="3.5" fill="#BE123C" stroke="#FFF" strokeWidth="1" />
      <path d="M16 15V17.5" stroke="#FFF" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="16" cy="19" r="0.6" fill="#FFF" />
    </svg>
  );
}

/**
 * 13. File Registry Folder Icon (3D Gold & Amber Folder Archive)
 */
export function FileRegistryIcon({ size = 24, className = '' }) {
  const id = React.useId().replace(/:/g, '');
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
      <defs>
        <linearGradient id={`regGold_${id}`} x1="4" y1="6" x2="28" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFBEB" />
          <stop offset="45%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>
        <linearGradient id={`regTab_${id}`} x1="4" y1="4" x2="16" y2="12" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FEF08A" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
      </defs>
      {/* แถบแฟ้มหลัง */}
      <path d="M4.5 9C4.5 7.6 5.6 6.5 7 6.5H12.5L15 9.5H25C26.4 9.5 27.5 10.6 27.5 12V24C27.5 25.4 26.4 26.5 25 26.5H7C5.6 26.5 4.5 25.4 4.5 24V9Z" fill="rgba(245, 158, 11, 0.22)" stroke={`url(#regGold_${id})`} strokeWidth="1.8" />
      {/* เอกสารคริสตัลภายใน */}
      <rect x="7.5" y="11.5" width="17" height="12" rx="2" fill="#0B132B" stroke="#7DD3FC" strokeWidth="1.2" />
      <line x1="10.5" y1="15" x2="19.5" y2="15" stroke="#BAE6FD" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="10.5" y1="18.5" x2="16.5" y2="18.5" stroke="#BAE6FD" strokeWidth="1.5" strokeLinecap="round" />
      {/* ตราเพชรทองคำหน้าแฟ้ม */}
      <circle cx="21" cy="18.5" r="2.2" fill="#FEF08A" stroke="#F59E0B" strokeWidth="0.8" />
    </svg>
  );
}

/**
 * 14. Search Inspector Icon (3D Cyan & Platinum Magnifying Glass)
 */
export function SearchInspectorIcon({ size = 20, className = '' }) {
  const id = React.useId().replace(/:/g, '');
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
      <defs>
        <linearGradient id={`schCyan_${id}`} x1="4" y1="4" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E0F2FE" />
          <stop offset="50%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#0284C7" />
        </linearGradient>
        <linearGradient id={`schGold_${id}`} x1="18" y1="18" x2="28" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FEF08A" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
      </defs>
      {/* เลนส์ขยายกระจกคริสตัล */}
      <circle cx="13.5" cy="13.5" r="8.5" fill="rgba(56, 189, 248, 0.22)" stroke={`url(#schCyan_${id})`} strokeWidth="2.4" />
      {/* วงแหวนสะท้อนแสงด้านใน */}
      <path d="M8 13.5C8 10.5 10.5 8 13.5 8" stroke="#FFFBEB" strokeWidth="1.6" strokeLinecap="round" />
      {/* ด้ามจับทองคำ 24K */}
      <line x1="19.5" y1="19.5" x2="27.5" y2="27.5" stroke={`url(#schGold_${id})`} strokeWidth="3.2" strokeLinecap="round" />
      <circle cx="13.5" cy="13.5" r="2.5" fill="#38BDF8" opacity="0.6" />
    </svg>
  );
}

/**
 * 15. File Document Icon (3D Sapphire & Cyan CSV Spreadsheet Document)
 */
export function FileDocumentIcon({ size = 20, className = '' }) {
  const id = React.useId().replace(/:/g, '');
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
      <defs>
        <linearGradient id={`docSapphire_${id}`} x1="6" y1="4" x2="26" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E0F2FE" />
          <stop offset="50%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>
      </defs>
      {/* ตัวแผ่นกระดาษพับมุม */}
      <path
        d="M7.5 4.5H19.5L25.5 10.5V26.5C25.5 27.6 24.6 28.5 23.5 28.5H7.5C6.4 28.5 5.5 27.6 5.5 26.5V6.5C5.5 5.4 6.4 4.5 7.5 4.5Z"
        fill="rgba(56, 189, 248, 0.18)"
        stroke={`url(#docSapphire_${id})`}
        strokeWidth="1.8"
      />
      {/* รอยพับมุมบนขวา */}
      <path d="M19.5 4.5V10.5H25.5" stroke={`url(#docSapphire_${id})`} strokeWidth="1.6" />
      {/* แถวข้อมูลในไฟล์ */}
      <line x1="9.5" y1="15" x2="17.5" y2="15" stroke="#BAE6FD" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="9.5" y1="19" x2="21.5" y2="19" stroke="#BAE6FD" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="9.5" y1="23" x2="19.5" y2="23" stroke="#BAE6FD" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="19.5" cy="15" r="1.2" fill="#34D399" />
    </svg>
  );
}

/**
 * 16. Database Add Icon (3D Emerald & Gold Database Record Adder)
 */
export function DatabaseAddIcon({ size = 20, className = '' }) {
  const id = React.useId().replace(/:/g, '');
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
      <defs>
        <linearGradient id={`dbAddEmerald_${id}`} x1="5" y1="4" x2="27" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#D1FAE5" />
          <stop offset="50%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id={`dbAddGold_${id}`} x1="16" y1="14" x2="28" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFBEB" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
      </defs>
      {/* ทรงกระบอกฐานข้อมูล */}
      <ellipse cx="14" cy="8" rx="8.5" ry="3.5" fill="rgba(16, 185, 129, 0.28)" stroke={`url(#dbAddEmerald_${id})`} strokeWidth="1.6" />
      <path d="M5.5 8V18C5.5 20.2 9.3 22 14 22C18.7 22 22.5 20.2 22.5 18V8" stroke={`url(#dbAddEmerald_${id})`} strokeWidth="1.6" />
      <path d="M5.5 13C5.5 15.2 9.3 17 14 17C18.7 17 22.5 15.2 22.5 13" stroke="#A7F3D0" strokeWidth="1.4" />
      {/* ตราเครื่องหมายบวกทองคำ */}
      <circle cx="22" cy="22" r="6" fill="#0F172A" stroke={`url(#dbAddGold_${id})`} strokeWidth="2" />
      <path d="M22 18.5V25.5M18.5 22H25.5" stroke="#FFFBEB" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/**
 * 17. Trash Can Delete Icon (Sleek Ruby & Rose Deletion Icon)
 */
export function TrashCanIcon({ size = 16, className = '' }) {
  const id = React.useId().replace(/:/g, '');
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <defs>
        <linearGradient id={`tshRuby_${id}`} x1="4" y1="3" x2="20" y2="21" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FECDD3" />
          <stop offset="50%" stopColor="#F43F5E" />
          <stop offset="100%" stopColor="#BE123C" />
        </linearGradient>
      </defs>
      {/* ฝาถัง */}
      <path d="M4 6H20M9 6V4C9 3.4 9.4 3 10 3H14C14.6 3 15 3.4 15 4V6" stroke={`url(#tshRuby_${id})`} strokeWidth="2" strokeLinecap="round" />
      {/* ตัวถัง */}
      <path d="M6 6L7.2 19.1C7.3 20.2 8.2 21 9.3 21H14.7C15.8 21 16.7 20.2 16.8 19.1L18 6" stroke={`url(#tshRuby_${id})`} strokeWidth="2" strokeLinecap="round" />
      <line x1="10" y1="10" x2="10" y2="17" stroke="#FDA4AF" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="14" y1="10" x2="14" y2="17" stroke="#FDA4AF" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

/**
 * 18. Social Ads Marketing Icon (3D Sapphire & Cyan Social Ad Beacon)
 */
export function SocialAdsIcon({ size = 22, className = '' }) {
  const id = React.useId().replace(/:/g, '');
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
      <defs>
        <linearGradient id={`socBlue_${id}`} x1="5" y1="4" x2="27" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E0F2FE" />
          <stop offset="50%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#1E40AF" />
        </linearGradient>
      </defs>
      {/* สมาร์ตโฟน/แท็บเล็ตโฆษณา */}
      <rect x="7" y="4" width="18" height="24" rx="4" fill="rgba(56, 189, 248, 0.2)" stroke={`url(#socBlue_${id})`} strokeWidth="2" />
      {/* สัญลักษณ์แคมเปญโฆษณาพุ่งขึ้น */}
      <circle cx="16" cy="12" r="4" fill="#0B132B" stroke="#38BDF8" strokeWidth="1.5" />
      <path d="M14 12L15.5 13.5L18 10.5" stroke="#FEF08A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* กราฟแท่งผลลัพธ์โฆษณา */}
      <rect x="10" y="20" width="2.5" height="4" rx="0.8" fill="#38BDF8" />
      <rect x="14.5" y="18" width="2.5" height="6" rx="0.8" fill="#34D399" />
      <rect x="19" y="16" width="2.5" height="8" rx="0.8" fill="#FEF08A" />
    </svg>
  );
}

/**
 * 19. Video Ads Stream Icon (3D Rose Video Media / TikTok Reel)
 */
export function VideoAdsIcon({ size = 22, className = '' }) {
  const id = React.useId().replace(/:/g, '');
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
      <defs>
        <linearGradient id={`vidRose_${id}`} x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFE4E6" />
          <stop offset="50%" stopColor="#FB7185" />
          <stop offset="100%" stopColor="#E11D48" />
        </linearGradient>
      </defs>
      {/* ฟิล์มม้วนวิดีโอ 3 มิติ */}
      <rect x="5" y="6" width="22" height="20" rx="4" fill="rgba(244, 63, 94, 0.22)" stroke={`url(#vidRose_${id})`} strokeWidth="2" />
      {/* แถบรูฟิล์มบน-ล่าง */}
      <circle cx="9" cy="9.5" r="1.3" fill="#FFE4E6" />
      <circle cx="16" cy="9.5" r="1.3" fill="#FFE4E6" />
      <circle cx="23" cy="9.5" r="1.3" fill="#FFE4E6" />
      <circle cx="9" cy="22.5" r="1.3" fill="#FFE4E6" />
      <circle cx="16" cy="22.5" r="1.3" fill="#FFE4E6" />
      <circle cx="23" cy="22.5" r="1.3" fill="#FFE4E6" />
      {/* ปุ่ม Play เล่นวิดีโอตรงกลาง */}
      <polygon points="14,13 20,16 14,19" fill="#FEF08A" stroke="#FFFBEB" strokeWidth="0.8" />
    </svg>
  );
}

/**
 * 20. Spreadsheet Icon (3D Emerald Google Sheets Grid)
 */
export function SpreadsheetIcon({ size = 22, className = '' }) {
  const id = React.useId().replace(/:/g, '');
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={className}>
      <defs>
        <linearGradient id={`sheetEmerald_${id}`} x1="5" y1="4" x2="27" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#D1FAE5" />
          <stop offset="50%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
      </defs>
      <rect x="5.5" y="5.5" width="21" height="21" rx="3.5" fill="rgba(16, 185, 129, 0.22)" stroke={`url(#sheetEmerald_${id})`} strokeWidth="2" />
      {/* เส้นตารางสเปรดชีต */}
      <line x1="5.5" y1="12" x2="26.5" y2="12" stroke="#6EE7B7" strokeWidth="1.5" />
      <line x1="5.5" y1="19" x2="26.5" y2="19" stroke="#6EE7B7" strokeWidth="1.5" />
      <line x1="13" y1="5.5" x2="13" y2="26.5" stroke="#6EE7B7" strokeWidth="1.5" />
      <line x1="20" y1="5.5" x2="20" y2="26.5" stroke="#6EE7B7" strokeWidth="1.5" />
      {/* ไฮไลต์เซลล์ทองคำ */}
      <rect x="13.5" y="12.5" width="6" height="6" fill="#FEF08A" opacity="0.65" />
    </svg>
  );
}

/**
 * 21. Sync Spin Icon (3D Quantum Sync Dual-Orbit)
 */
export function SyncSpinIcon({ size = 18, className = '' }) {
  const id = React.useId().replace(/:/g, '');
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" className={className}>
      <defs>
        <linearGradient id={`syncGold_${id}`} x1="3" y1="3" x2="21" y2="21" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFBEB" />
          <stop offset="50%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
      </defs>
      <path
        d="M20 12C20 16.4 16.4 20 12 20C8.5 20 5.6 17.8 4.5 14.5M4 12C4 7.6 7.6 4 12 4C15.5 4 18.4 6.2 19.5 9.5"
        stroke={`url(#syncGold_${id})`}
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <polygon points="19.5,4 20,10 14,9" fill="#FEF08A" />
      <polygon points="4.5,20 4,14 10,15" fill="#FEF08A" />
    </svg>
  );
}

