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

