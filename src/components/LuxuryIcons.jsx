import React from 'react';

/**
 * ชุดไอคอน 3 มิติระดับพรีเมียม (Luxury 3D Glass & 24K Gold / Jewel Vector Icons)
 * ออกแบบให้หรูหรา ทันสมัย มีมิติแสงเงา และดูเข้าใจง่ายสำหรับทุกวัย
 */

export function LuxuryIconBadge({
  variant = 'gold',
  size = 'md',
  active = false,
  shape = 'circle',
  children,
  className = ''
}) {
  const palettes = {
    gold: {
      border: active ? '#F59E0B' : 'rgba(251, 191, 36, 0.45)',
      glow: active ? '0 0 18px rgba(245, 158, 11, 0.55), inset 0 0 8px rgba(251, 191, 36, 0.25)' : '0 4px 12px rgba(0, 0, 0, 0.45)'
    },
    ruby: {
      border: active ? '#FB7185' : 'rgba(244, 63, 94, 0.45)',
      glow: active ? '0 0 18px rgba(244, 63, 94, 0.55), inset 0 0 8px rgba(251, 113, 133, 0.25)' : '0 4px 12px rgba(0, 0, 0, 0.45)'
    },
    sapphire: {
      border: active ? '#38BDF8' : 'rgba(56, 189, 248, 0.45)',
      glow: active ? '0 0 18px rgba(56, 189, 248, 0.55), inset 0 0 8px rgba(56, 189, 248, 0.25)' : '0 4px 12px rgba(0, 0, 0, 0.45)'
    },
    emerald: {
      border: active ? '#34D399' : 'rgba(16, 185, 129, 0.45)',
      glow: active ? '0 0 18px rgba(16, 185, 129, 0.55), inset 0 0 8px rgba(52, 211, 153, 0.25)' : '0 4px 12px rgba(0, 0, 0, 0.45)'
    },
    amethyst: {
      border: active ? '#C084FC' : 'rgba(168, 85, 247, 0.45)',
      glow: active ? '0 0 18px rgba(168, 85, 247, 0.55), inset 0 0 8px rgba(192, 132, 252, 0.25)' : '0 4px 12px rgba(0, 0, 0, 0.45)'
    },
    cyan: {
      border: active ? '#22D3EE' : 'rgba(34, 211, 238, 0.45)',
      glow: active ? '0 0 18px rgba(34, 211, 238, 0.55), inset 0 0 8px rgba(34, 211, 238, 0.25)' : '0 4px 12px rgba(0, 0, 0, 0.45)'
    },
    platinum: {
      border: active ? '#F8FAFC' : 'rgba(148, 163, 184, 0.45)',
      glow: active ? '0 0 16px rgba(226, 232, 240, 0.45), inset 0 0 8px rgba(255, 255, 255, 0.2)' : '0 4px 12px rgba(0, 0, 0, 0.45)'
    }
  };

  const p = palettes[variant] || palettes.gold;
  const dims =
    size === 'xs'
      ? { width: '28px', height: '28px' }
      : size === 'sm'
      ? { width: '38px', height: '38px' }
      : size === 'lg'
      ? { width: '54px', height: '54px' }
      : size === 'xl'
      ? { width: '64px', height: '64px' }
      : { width: '44px', height: '44px' };

  const isCircle = shape !== 'squircle';
  const borderRadius = isCircle ? '9999px' : (size === 'lg' || size === 'xl' ? '16px' : '12px');

  return (
    <div
      data-variant={variant}
      data-active={active ? 'true' : 'false'}
      className={`wayfinding-icon-badge luxury-icon-badge luxury-icon-badge-${variant} ${active ? 'is-active scale-105' : 'hover:scale-105'} relative flex items-center justify-center flex-shrink-0 transition-transform duration-300 ${className}`}
      style={{
        width: dims.width,
        height: dims.height,
        borderRadius,
        background: '#090D16',
        border: `2px solid ${p.border}`,
        boxShadow: p.glow,
        color: '#FFFFFF',
        overflow: 'hidden'
      }}
    >
      {/* วงแหวนสะท้อนแสงด้านบน */}
      <div
        className="luxury-badge-orb"
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.18), transparent 70%)',
          pointerEvents: 'none'
        }}
      />
      <div className="relative z-10 flex items-center justify-center text-white">{children}</div>
    </div>
  );
}

/**
 * ไอคอนประจำเมนูและฟีเจอร์หลักทั้งระบบ (Luxury Multi-Layer Vector SVGs)
 */
export function LuxuryModuleIcon({ type = 'overview', size = 26 }) {
  switch (type) {
    case 'overview':
    case 'business_overview':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          {/* 1. แท่นฐานรากธุรกิจมั่นคง (Solid Business Foundation) */}
          <rect x="2.5" y="26.5" width="27" height="2.5" rx="1.25" fill="currentColor" opacity="0.95" />

          {/* 2. กราฟแท่งการเติบโตของธุรกิจ 3 ระดับ (Ascending Business Growth Pillars) */}
          <rect x="3.5" y="19" width="4.5" height="6.5" rx="1.2" fill="currentColor" />
          <rect x="9.5" y="13.5" width="4.5" height="12" rx="1.2" fill="currentColor" />
          <rect x="15.5" y="8" width="4.5" height="17.5" rx="1.2" fill="currentColor" opacity="0.9" />

          {/* 3. วงแหวนเป้าหมายความสำเร็จ (Strategic Goal Bullseye Target Rings) */}
          <circle cx="23.5" cy="8.5" r="7" stroke="currentColor" strokeWidth="2" strokeDasharray="3.5 2" />
          <circle cx="23.5" cy="8.5" r="4.2" stroke="currentColor" strokeWidth="1.8" />
          <circle cx="23.5" cy="8.5" r="1.8" fill="currentColor" />

          {/* 4. ลูกศรนำทางทะยานสู่เป้าหมาย (Goal Trajectory & Piercing Arrow) */}
          <path
            d="M4 17.5C8 16 13 13 18.5 9.5"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M23.5 3.5L28.5 8.5L23.5 13.5"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* 5. เส้นแกนเล็งเป้าหมาย (Target Crosshair Guides) */}
          <line x1="23.5" y1="0.5" x2="23.5" y2="2.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          <line x1="29.5" y1="8.5" x2="31.5" y2="8.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );

    case 'bi_studio':
    case 'power_bi':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          {/* กรอบหน้าจอแสดงผลแมทริกซ์การวิเคราะห์ */}
          <rect x="3.5" y="3.5" width="25" height="25" rx="4.5" stroke="currentColor" strokeWidth="2.2" />
          <line x1="3.5" y1="16" x2="28.5" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="16" y1="3.5" x2="16" y2="28.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          {/* กราฟแท่งช่องบนซ้าย */}
          <rect x="7" y="10.5" width="2.4" height="3.5" rx="0.8" fill="currentColor" />
          <rect x="10.5" y="7" width="2.4" height="7" rx="0.8" fill="currentColor" />
          {/* พายชาร์ตช่องบนขวา */}
          <path d="M21 7.5A4.5 4.5 0 0 1 25.5 12H21V7.5Z" fill="currentColor" />
          <circle cx="21" cy="12" r="4.5" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 2" />
          {/* เส้นแนวโน้มช่องล่างซ้าย */}
          <path d="M6.5 24L10 20.5L13.5 22.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          {/* พิวอตเซลล์ช่องล่างขวา */}
          <rect x="18.5" y="18.5" width="3" height="3" rx="0.7" fill="currentColor" />
          <rect x="23" y="18.5" width="3" height="3" rx="0.7" fill="currentColor" opacity="0.6" />
          <rect x="18.5" y="23" width="3" height="3" rx="0.7" fill="currentColor" opacity="0.6" />
          <rect x="23" y="23" width="3" height="3" rx="0.7" fill="currentColor" />
        </svg>
      );

    case 'customers':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          {/* มงกุฎ VIP เหนือศีรษะลูกค้าประจำ */}
          <path d="M12.5 3.5L14 1.8L16 3L18 1.8L19.5 3.5H12.5Z" fill="currentColor" />
          {/* ลูกค้าหลักคนสำคัญ (ISO 7001 silhouette) */}
          <circle cx="16" cy="8.2" r="3.8" fill="currentColor" />
          <path
            d="M9 27.5C9 21.8 12.1 17.5 16 17.5C19.9 17.5 23 21.8 23 27.5H9Z"
            fill="currentColor"
          />
          {/* ลูกค้าด้านข้างซ้าย */}
          <circle cx="6.5" cy="12" r="2.6" fill="currentColor" opacity="0.7" />
          <path d="M2.5 26.5C2.5 22.5 4.8 19.8 7.5 19.5C6.5 21.2 6.5 24 6.5 26.5H2.5Z" fill="currentColor" opacity="0.7" />
          {/* ลูกค้าด้านข้างขวา */}
          <circle cx="25.5" cy="12" r="2.6" fill="currentColor" opacity="0.7" />
          <path d="M29.5 26.5C29.5 22.5 27.2 19.8 24.5 19.5C25.5 21.2 25.5 24 25.5 26.5H29.5Z" fill="currentColor" opacity="0.7" />
        </svg>
      );

    case 'staff_pos':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          {/* ศีรษะพนักงานแคชเชียร์ */}
          <circle cx="11.5" cy="7.5" r="3.5" fill="currentColor" />
          {/* ลำตัวพนักงานหลังเคาน์เตอร์จุดชำระเงิน */}
          <path d="M5.5 23V18.8C5.5 15.2 8.2 13.2 11.5 13.2C14.8 13.2 17.5 15.2 17.5 18.8V23H5.5Z" fill="currentColor" />
          {/* เคาน์เตอร์จุดขาย POS */}
          <rect x="3" y="21.5" width="26" height="3" rx="1.5" fill="currentColor" />
          <rect x="5.5" y="24.5" width="21" height="2" rx="0.8" fill="currentColor" opacity="0.8" />
          {/* หน้าจอเครื่องคิดเงิน POS */}
          <rect x="19.5" y="10.5" width="9" height="7.5" rx="1.5" stroke="currentColor" strokeWidth="2" fill="none" />
          <path d="M23 18.5V21.5H25V18.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          {/* เครื่องหมายถูกยืนยันความถูกต้องของบิล */}
          <path d="M22 14.2L23.5 15.7L26.2 12.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'multi_channel':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          {/* กันสาดหน้าร้าน Flagship Store */}
          <path d="M4.5 11.5L6.8 5.5H25.2L27.5 11.5H4.5Z" fill="currentColor" />
          <path d="M4.5 11.5C4.5 13.5 6.4 14 7.6 14C8.8 14 10.7 13.5 10.7 11.5C10.7 13.5 12.6 14 13.8 14C15 14 16.9 13.5 16.9 11.5C16.9 13.5 18.8 14 20 14C21.2 14 23.1 13.5 23.1 11.5C23.1 13.5 25 14 26.2 14C27.4 14 27.5 13 27.5 11.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          {/* ตัวอาคารหน้าร้าน */}
          <rect x="6.5" y="14" width="19" height="13" rx="1.5" stroke="currentColor" strokeWidth="2.2" />
          {/* ประตูหน้าร้าน */}
          <path d="M13 27V18.5C13 17.7 13.7 17 14.5 17H17.5C18.3 17 19 17.7 19 18.5V27" stroke="currentColor" strokeWidth="2" fill="none" />
          {/* สัญญาณเชื่อมต่อช่องทางออนไลน์ Omnichannel */}
          <circle cx="26.5" cy="4.5" r="2.2" fill="currentColor" />
          <path d="M23.5 6C24.8 7.2 26 9 26.5 11" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
        </svg>
      );

    case 'inventory':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          {/* พาเลทคลังสินค้า */}
          <rect x="3.5" y="24" width="25" height="2.5" rx="1" fill="currentColor" />
          <rect x="6" y="26.5" width="4.5" height="2" rx="0.6" fill="currentColor" />
          <rect x="13.75" y="26.5" width="4.5" height="2" rx="0.6" fill="currentColor" />
          <rect x="21.5" y="26.5" width="4.5" height="2" rx="0.6" fill="currentColor" />
          {/* กล่องสินค้าในสต็อก */}
          <rect x="6" y="8" width="20" height="15" rx="2" stroke="currentColor" strokeWidth="2.4" />
          {/* เทปปิดกล่องตรงกลาง */}
          <line x1="16" y1="8" x2="16" y2="23" stroke="currentColor" strokeWidth="2.4" />
          <line x1="9" y1="13.5" x2="23" y2="13.5" stroke="currentColor" strokeWidth="1.8" />
          {/* ป้ายรหัส SKU สินค้า */}
          <rect x="8.5" y="16" width="4.5" height="4" rx="0.8" fill="currentColor" />
        </svg>
      );

    case 'insights':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          {/* ประกายดาวปัญญาประดิษฐ์ AI Insight Star */}
          <path
            d="M16 2.5C16 9 20.8 13.8 27.5 14C20.8 14.2 16 19 16 25.5C16 19 11.2 14.2 4.5 14C11.2 13.8 16 9 16 2.5Z"
            fill="currentColor"
          />
          {/* ประกายดาวรองด้านบนขวา */}
          <path
            d="M25 2.5C25 5 26.8 6.8 29.5 7C26.8 7.2 25 9 25 11.5C25 9 23.2 7.2 20.5 7C23.2 6.8 25 5 25 2.5Z"
            fill="currentColor"
          />
          {/* โหนดความรู้ด้านล่างซ้าย */}
          <circle cx="7" cy="22" r="2" fill="currentColor" />
        </svg>
      );

    case 'live':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          {/* เสาสัญญาณถ่ายทอดสดหน้าร้าน */}
          <path d="M16 12V27.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M11 27.5H21" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M12.5 22.5L16 16L19.5 22.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          {/* จุดกระจายคลื่นสัญญาณยอดเสา */}
          <circle cx="16" cy="9.5" r="3.2" fill="currentColor" />
          {/* คลื่นวิทยุชั้นใน */}
          <path d="M11.5 5.5C9.5 7 8 9.5 8 12.5C8 15.5 9.5 18 11.5 19.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M20.5 5.5C22.5 7 24 9.5 24 12.5C24 15.5 22.5 18 20.5 19.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          {/* คลื่นวิทยุชั้นนอก */}
          <path d="M7 2.5C4 5 2 8.5 2 12.5C2 16.5 4 20 7 22.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.75" />
          <path d="M25 2.5C28 5 30 8.5 30 12.5C30 16.5 28 20 25 22.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.75" />
        </svg>
      );

    case 'database':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          {/* ฝาถังฐานข้อมูลชั้นบน */}
          <ellipse cx="16" cy="7.5" rx="10" ry="3.5" fill="currentColor" />
          {/* ชั้นข้อมูลที่ 1 */}
          <path d="M6 7.5V14C6 16 10.5 17.5 16 17.5C21.5 17.5 26 16 26 14V7.5" stroke="currentColor" strokeWidth="2.2" />
          {/* ชั้นข้อมูลที่ 2 */}
          <path d="M6 14V20.5C6 22.5 10.5 24 16 24C21.5 24 26 22.5 26 20.5V14" stroke="currentColor" strokeWidth="2.2" />
          {/* ชั้นข้อมูลที่ 3 ฐานล่าง */}
          <path d="M6 20.5V24C6 26 10.5 27.5 16 27.5C21.5 27.5 26 26 26 24V20.5" stroke="currentColor" strokeWidth="2.2" />
          {/* ไฟแสดงสถานะอ่านเขียนข้อมูล */}
          <circle cx="20.5" cy="13.5" r="1.4" fill="currentColor" />
          <circle cx="20.5" cy="20" r="1.4" fill="currentColor" />
        </svg>
      );

    case 'admin':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          {/* โล่ความปลอดภัยสูงสุดของผู้ดูแลระบบ */}
          <path
            d="M16 3L26.5 7.2V15.5C26.5 22.2 22 26.8 16 28.8C10 26.8 5.5 22.2 5.5 15.5V7.2L16 3Z"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinejoin="round"
          />
          {/* รูกุญแจหลักตรงกลางโล่ */}
          <circle cx="16" cy="13.5" r="3.2" fill="currentColor" />
          <path d="M14.5 15.2L13.8 22H18.2L17.5 15.2H14.5Z" fill="currentColor" />
        </svg>
      );

    case 'settings':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          {/* รางปรับแต่งระบบช่องที่ 1 */}
          <line x1="10" y1="5" x2="10" y2="27" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
          {/* รางปรับแต่งระบบช่องที่ 2 */}
          <line x1="22" y1="5" x2="22" y2="27" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
          {/* ปุ่มหมุนสไลเดอร์ช่อง 1 */}
          <circle cx="10" cy="12" r="4.5" fill="currentColor" />
          {/* ปุ่มหมุนสไลเดอร์ช่อง 2 */}
          <circle cx="22" cy="20" r="4.5" fill="currentColor" />
        </svg>
      );

    case 'upload':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          {/* ก้อนเมฆสากล */}
          <path
            d="M8.5 22.5C5.8 22.5 3.5 20.2 3.5 17.5C3.5 15.1 5.2 13.2 7.5 12.8C8.5 8.2 12.2 4.5 17 4.5C22 4.5 26.2 8.3 26.5 13.2C28.5 14 30 15.8 30 18C30 20.5 28 22.5 25.5 22.5H21"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* ลูกศรนำทางอัปโหลดขึ้น */}
          <path d="M16 27.5V13" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" />
          <path d="M11 17.5L16 12.5L21 17.5" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'crown':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          <path
            d="M4.5 22.5L7 9.5L12.5 15L16 7L19.5 15L25 9.5L27.5 22.5H4.5Z"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <rect x="5.5" y="24.5" width="21" height="2.5" rx="1" fill="currentColor" />
          <circle cx="16" cy="5" r="1.6" fill="currentColor" />
          <circle cx="6.5" cy="7.5" r="1.4" fill="currentColor" />
          <circle cx="25.5" cy="7.5" r="1.4" fill="currentColor" />
        </svg>
      );

    case 'alert':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          <path
            d="M16 3.5L29 27H3L16 3.5Z"
            stroke="currentColor"
            strokeWidth="2.4"
            strokeLinejoin="round"
          />
          <path d="M16 12V18.5" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" />
          <circle cx="16" cy="22.8" r="1.6" fill="currentColor" />
        </svg>
      );

    case 'wallet':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          <rect x="3.5" y="8" width="25" height="17.5" rx="3.5" stroke="currentColor" strokeWidth="2.2" />
          <path d="M7 8V5.5C7 4.4 7.9 3.5 9 3.5H23C24.1 3.5 25 4.4 25 5.5V8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M18 12.5H28.5V20.5H18C16.6 20.5 15.5 19.4 15.5 18V15C15.5 13.6 16.6 12.5 18 12.5Z" fill="currentColor" />
        </svg>
      );

    case 'basket':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          <path d="M4.5 13H27.5L24.5 26.5H7.5L4.5 13Z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
          <path d="M10 13L13.5 6M22 13L18.5 6" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
          <line x1="12" y1="17.5" x2="12" y2="22.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="16" y1="17.5" x2="16" y2="22.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <line x1="20" y1="17.5" x2="20" y2="22.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        </svg>
      );

    case 'rocket':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          <path
            d="M16 3C21 6.8 22.5 12.5 22.5 18.5L16 23L9.5 18.5C9.5 12.5 11 6.8 16 3Z"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <circle cx="16" cy="12" r="2.5" fill="currentColor" />
          <path d="M9.5 16.5L4.5 20.5L9.5 21.5M22.5 16.5L27.5 20.5L22.5 21.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M13.5 23.5L16 28.5L18.5 23.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'trophy':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          <path d="M8.5 4.5H23.5V13C23.5 17.1 20.1 20.5 16 20.5C11.9 20.5 8.5 17.1 8.5 13V4.5Z" stroke="currentColor" strokeWidth="2.2" />
          <path d="M8.5 7.5H4.5V11C4.5 13.2 6.3 14.8 8.5 14.8M23.5 7.5H27.5V11C27.5 13.2 25.7 14.8 23.5 14.8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <path d="M16 20.5V26M10.5 26.5H21.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        </svg>
      );

    case 'diamond':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          <path d="M9 5H23L28.5 12.5L16 27.5L3.5 12.5L9 5Z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
          <path d="M3.5 12.5H28.5M16 27.5L11.5 12.5L16 5L20.5 12.5L16 27.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      );

    case 'target':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          <circle cx="15" cy="17" r="11" stroke="currentColor" strokeWidth="2.2" />
          <circle cx="15" cy="17" r="6.5" stroke="currentColor" strokeWidth="2" strokeDasharray="3 2" />
          <circle cx="15" cy="17" r="2.8" fill="currentColor" />
          <path d="M28 4L16.5 15.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M23 4H28V9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'procurement':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          {/* ตัวตู้คอนเทนเนอร์ขนส่งสินค้า */}
          <rect x="3.5" y="7.5" width="14" height="15" rx="1.8" stroke="currentColor" strokeWidth="2.2" />
          <line x1="10.5" y1="7.5" x2="10.5" y2="22.5" stroke="currentColor" strokeWidth="1.6" />
          {/* หัวรถบรรทุกขนส่งสินค้า */}
          <path d="M17.5 11.5H24L28.5 16.5V22.5H17.5V11.5Z" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
          <path d="M19.5 13.5H23L26 16.5H19.5V13.5Z" fill="currentColor" />
          {/* ล้อรถบรรทุก */}
          <circle cx="8.5" cy="24.5" r="3" stroke="currentColor" strokeWidth="2.2" fill="none" />
          <circle cx="23.5" cy="24.5" r="3" stroke="currentColor" strokeWidth="2.2" fill="none" />
          {/* เส้นถนน */}
          <line x1="2" y1="27.5" x2="30" y2="27.5" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
      );

    case 'speed_engine':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          <path
            d="M18 3.5L7 17.5H15.5L14 28.5L25 14.5H16.5L18 3.5Z"
            fill="currentColor"
          />
        </svg>
      );

    case 'precision_target':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          <circle cx="15" cy="17" r="11" stroke="currentColor" strokeWidth="2.2" />
          <circle cx="15" cy="17" r="6.5" stroke="currentColor" strokeWidth="2" strokeDasharray="3 2" />
          <circle cx="15" cy="17" r="2.8" fill="currentColor" />
          <path d="M28 4L16.5 15.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M23 4H28V9" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'global_shield':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          <path
            d="M16 3L26.5 7.2V15.5C26.5 22.2 22 26.8 16 28.8C10 26.8 5.5 22.2 5.5 15.5V7.2L16 3Z"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <path d="M11 16L14.5 19.5L21 12.5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
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

/**
 * Official Google 4-Color Vector Brand Icon
 */
export function GoogleIcon({ size = 20, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={`flex-shrink-0 ${className}`}>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  );
}

/**
 * 1. MarketPositionRadarIcon: ร้านคุณอยู่จุดไหนของตลาด (Market Positioning & Benchmark)
 * ดีไซน์: เรดาร์วงแหวนโฮโลกราฟิก 3 มิติ, ดาวเพชรประกายทองระบุตำแหน่งผู้นำตลาด, วงแหวนเปรียบเทียบคู่แข่ง
 */
export function MarketPositionRadarIcon({ size = 24, className = '' }) {
  const id = React.useId().replace(/:/g, '');
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={`flex-shrink-0 ${className}`}>
      <defs>
        <linearGradient id={`mktGold_${id}`} x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFBEB" />
          <stop offset="45%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
        <linearGradient id={`mktCyan_${id}`} x1="6" y1="6" x2="26" y2="26" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#BAE6FD" />
          <stop offset="100%" stopColor="#0284C7" />
        </linearGradient>
        <radialGradient id={`mktGlow_${id}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#0284C7" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* วงแหวนเรดาร์ตลาดชั้นนอกและชั้นใน */}
      <circle cx="16" cy="16" r="13" stroke={`url(#mktCyan_${id})`} strokeWidth="1.2" strokeDasharray="3 2" opacity="0.6" />
      <circle cx="16" cy="16" r="8.5" stroke="#38BDF8" strokeWidth="1.4" opacity="0.8" />
      <circle cx="16" cy="16" r="10" fill={`url(#mktGlow_${id})`} />
      {/* แกนพิกัดตลาด 4 ทิศ */}
      <line x1="16" y1="2" x2="16" y2="30" stroke={`url(#mktCyan_${id})`} strokeWidth="1.2" opacity="0.5" />
      <line x1="2" y1="16" x2="30" y2="16" stroke={`url(#mktCyan_${id})`} strokeWidth="1.2" opacity="0.5" />
      {/* พิกัดคู่แข่งในตลาด (จุดประกายสีเงิน) */}
      <circle cx="9" cy="11" r="1.8" fill="#94A3B8" opacity="0.75" />
      <circle cx="11" cy="22" r="1.6" fill="#94A3B8" opacity="0.6" />
      <circle cx="23" cy="21" r="1.8" fill="#94A3B8" opacity="0.75" />
      {/* พิกัดร้านของคุณ (ดาวประกายเพชรทองคำ 24K โดดเด่นเป็นผู้นำตลาดที่มุมบนขวา) */}
      <path
        d="M22 6L23.2 9.8L27 11L23.2 12.2L22 16L20.8 12.2L17 11L20.8 9.8Z"
        fill={`url(#mktGold_${id})`}
      />
      <circle cx="22" cy="11" r="1.6" fill="#FFF" />
      {/* วงแหวนเรดาร์ตรวจจับร้านคุณ */}
      <circle cx="22" cy="11" r="4.5" stroke="#FDE047" strokeWidth="1.2" strokeDasharray="2 1.5" />
    </svg>
  );
}

/**
 * 2. PurchaseConversionRateIcon: อัตราการตัดสินใจซื้อสำเร็จ (Purchase Conversion Rate)
 * ดีไซน์: กรวยการตลาด 3 มิติ (Funnel), ลูกศรพุ่งทะยาน 45 องศา, เหรียญทองความสำเร็จและเช็คมาร์กสีมรกต
 */
export function PurchaseConversionRateIcon({ size = 24, className = '' }) {
  const id = React.useId().replace(/:/g, '');
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={`flex-shrink-0 ${className}`}>
      <defs>
        <linearGradient id={`crEmerald_${id}`} x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#A7F3D0" />
          <stop offset="50%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id={`crGold_${id}`} x1="12" y1="12" x2="28" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FEF08A" />
          <stop offset="60%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>
      </defs>
      {/* ฐานกรวย Conversion (ท่อกระจก 3 ชั้น) */}
      <path
        d="M5 6H27L20 16V24L12 28V16L5 6Z"
        fill={`url(#crEmerald_${id})`}
        opacity="0.88"
        stroke="#6EE7B7"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      {/* ปากกรวยด้านบน */}
      <ellipse cx="16" cy="6" rx="11" ry="2.6" fill="#D1FAE5" stroke="#34D399" strokeWidth="1.2" />
      {/* กระแสลูกค้าไหลเข้า (3 ลำแสงสีขาว) */}
      <path d="M12 2V5M16 1.5V5M20 2V5" stroke="#FFF" strokeWidth="1.6" strokeLinecap="round" />
      {/* เหรียญทองปิดการขายสำเร็จด้านล่าง */}
      <circle cx="21" cy="22" r="5.5" fill={`url(#crGold_${id})`} stroke="#FEF08A" strokeWidth="1.3" />
      {/* เครื่องหมายเช็คความสำเร็จบนเหรียญทอง */}
      <path d="M19 22L20.5 23.5L23.5 20" stroke="#FFF" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      {/* ลูกศรพุ่งทะยาน Conversion Surge */}
      <path d="M22 13L27 8M27 8H23M27 8V12" stroke="#FEF08A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * 3. BasketSizePerBillIcon: เปรียบเทียบยอดซื้อต่อบิล (Basket Size & Upselling per Bill)
 * ดีไซน์: ตะกร้าช้อปปิ้งหรูหรา 3 มิติ, ใบเสร็จริบบิ้นทองคำ, อัญมณีสินค้าพ่วงคู่ (+) และเหรียญทับทิม
 */
export function BasketSizePerBillIcon({ size = 24, className = '' }) {
  const id = React.useId().replace(/:/g, '');
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={`flex-shrink-0 ${className}`}>
      <defs>
        <linearGradient id={`bsRuby_${id}`} x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FECDD3" />
          <stop offset="50%" stopColor="#F43F5E" />
          <stop offset="100%" stopColor="#BE123C" />
        </linearGradient>
        <linearGradient id={`bsGold_${id}`} x1="8" y1="4" x2="24" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFBEB" />
          <stop offset="50%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
      </defs>
      {/* ตะกร้าช้อปปิ้งพรีเมียม */}
      <path
        d="M7 13H25L23 26C23 27.1 22.1 28 21 28H11C9.9 28 9 27.1 9 26L7 13Z"
        fill={`url(#bsRuby_${id})`}
        stroke="#FDA4AF"
        strokeWidth="1.5"
      />
      {/* หูหิ้วตะกร้าโค้งมน */}
      <path
        d="M11 13V9C11 6.2 13.2 4 16 4C18.8 4 21 6.2 21 9V13"
        stroke={`url(#bsGold_${id})`}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {/* เส้นลายสานตะกร้า */}
      <line x1="12" y1="16" x2="13.5" y2="25" stroke="#FFE4E6" strokeWidth="1.2" opacity="0.6" />
      <line x1="16" y1="16" x2="16" y2="25" stroke="#FFE4E6" strokeWidth="1.2" opacity="0.6" />
      <line x1="20" y1="16" x2="18.5" y2="25" stroke="#FFE4E6" strokeWidth="1.2" opacity="0.6" />
      <line x1="8.5" y1="20" x2="23.5" y2="20" stroke="#FFE4E6" strokeWidth="1.2" opacity="0.6" />
      {/* ใบเสร็จทองคำลอยเด่น (Upselling Bill) */}
      <rect x="18" y="7" width="10" height="13" rx="2" fill={`url(#bsGold_${id})`} stroke="#FEF08A" strokeWidth="1.2" />
      <line x1="20.5" y1="10.5" x2="25.5" y2="10.5" stroke="#78350F" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="20.5" y1="13.5" x2="24" y2="13.5" stroke="#78350F" strokeWidth="1.4" strokeLinecap="round" />
      <line x1="20.5" y1="16.5" x2="26" y2="16.5" stroke="#78350F" strokeWidth="1.4" strokeLinecap="round" />
      {/* สัญลักษณ์บวกสินค้าพ่วง Upsell (+) */}
      <circle cx="8" cy="8" r="4" fill="#10B981" stroke="#D1FAE5" strokeWidth="1" />
      <path d="M8 6V10M6 8H10" stroke="#FFF" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/**
 * 4. DailyStoreClosingIcon: สรุปปิดยอดร้านประจำวัน (Daily Store Closing / EOD Sales Summary)
 * ดีไซน์: หน้าร้านค้าพร้อมนาฬิกาปิดรอบ 22:00 น., กองเหรียญทองคำยอดขายรวม, โบว์ประทับตราอนุมัติยอด และคลื่นส่ง LINE
 */
export function DailyStoreClosingIcon({ size = 24, className = '' }) {
  const id = React.useId().replace(/:/g, '');
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={`flex-shrink-0 ${className}`}>
      <defs>
        <linearGradient id={`eodGold_${id}`} x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FEF08A" />
          <stop offset="50%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>
        <linearGradient id={`eodLineGreen_${id}`} x1="16" y1="2" x2="30" y2="16" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#86EFAC" />
          <stop offset="60%" stopColor="#22C55E" />
          <stop offset="100%" stopColor="#15803D" />
        </linearGradient>
      </defs>
      {/* หลังคาหน้าร้านค้าสไตล์บูทีค */}
      <path d="M4 12L7 6H25L28 12H4Z" fill={`url(#eodGold_${id})`} stroke="#FEF08A" strokeWidth="1.2" />
      {/* เสาและตัวอาคารร้าน */}
      <rect x="6" y="12" width="20" height="15" rx="2" fill="rgba(15, 23, 42, 0.9)" stroke={`url(#eodGold_${id})`} strokeWidth="1.2" />
      {/* ประตูปิดร้านแบบมีไฟอุ่น */}
      <rect x="13" y="16" width="6" height="11" rx="1.5" fill={`url(#eodGold_${id})`} opacity="0.85" />
      {/* ป้าย CLOSED / ยอดสรุปปิดร้าน */}
      <rect x="9" y="14" width="14" height="2" rx="1" fill="#FEF08A" />
      {/* นาฬิกาบอกเวลา 22:00 น. ปิดร้านด้านบน */}
      <circle cx="24" cy="7" r="5" fill="#0F172A" stroke="#FEF08A" strokeWidth="1.3" />
      {/* เข็มนาฬิกาชี้ 22:00 น. */}
      <path d="M24 4.5V7L22 5.5" stroke="#FEF08A" strokeWidth="1.3" strokeLinecap="round" />
      {/* สัญลักษณ์แจ้งเตือน Flex Message LINE ส่งสำเร็จ */}
      <circle cx="8" cy="23" r="4.5" fill={`url(#eodLineGreen_${id})`} stroke="#DCFCE7" strokeWidth="1" />
      <path d="M6.2 23L7.6 24.4L10 21.8" stroke="#FFF" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * 5. SalesVsFeesComparisonIcon: เปรียบเทียบยอดขาย ค่าธรรมเนียม และกำไรสุทธิ (Sales vs Platform Fees & Net Profit)
 * ดีไซน์: ตราชั่ง 3 มิติเปรียบเทียบ ยอดขายรวมหน้าร้าน vs ค่าธรรมเนียมแอป พร้อมเพชรกำไรสุทธิเข้ากระเป๋า
 */
export function SalesVsFeesComparisonIcon({ size = 24, className = '' }) {
  const id = React.useId().replace(/:/g, '');
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={`flex-shrink-0 ${className}`}>
      <defs>
        <linearGradient id={`svfGold_${id}`} x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFBEB" />
          <stop offset="50%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
        <linearGradient id={`svfPurple_${id}`} x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E9D5FF" />
          <stop offset="50%" stopColor="#A855F7" />
          <stop offset="100%" stopColor="#7E22CE" />
        </linearGradient>
        <linearGradient id={`svfEmerald_${id}`} x1="10" y1="2" x2="22" y2="14" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#A7F3D0" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
      </defs>
      {/* เสาแกนตราชั่ง 3 มิติ */}
      <rect x="15" y="6" width="2" height="21" rx="1" fill={`url(#svfGold_${id})`} />
      <rect x="11" y="27" width="10" height="3" rx="1.5" fill={`url(#svfGold_${id})`} />
      {/* คานตราชั่ง (เอียงเล็กน้อยแสดงให้เห็นว่ากำไรสุทธิชนะค่าธรรมเนียม) */}
      <path d="M5 11L16 9L27 11" stroke={`url(#svfGold_${id})`} strokeWidth="2.2" strokeLinecap="round" />
      {/* ยอดขาย/กำไรสุทธิ (จานซ้าย - สูงกว่า หนักแน่นกว่า) */}
      <path d="M5 11L3 17H9L7 11" stroke="#34D399" strokeWidth="1.2" fill="none" />
      <ellipse cx="6" cy="17" rx="4.5" ry="1.6" fill={`url(#svfEmerald_${id})`} stroke="#A7F3D0" strokeWidth="1" />
      {/* ก้อนเหรียญกำไรสุทธิ 100% */}
      <circle cx="6" cy="15" r="2.2" fill="#FEF08A" stroke="#B45309" strokeWidth="0.8" />
      {/* ค่าธรรมเนียมแอป (จานขวา - ถูกหักออก 21-23%) */}
      <path d="M27 11L25 19H31L29 11" stroke="#F43F5E" strokeWidth="1.2" fill="none" />
      <ellipse cx="28" cy="19" rx="4.5" ry="1.6" fill="#F43F5E" opacity="0.8" stroke="#FECDD3" strokeWidth="1" />
      {/* ป้าย % ค่าธรรมเนียมที่ถูกตัดออก */}
      <path d="M26.5 17.5L29.5 15.5" stroke="#FFF" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="26.8" cy="16" r="0.6" fill="#FFF" />
      <circle cx="29.2" cy="17" r="0.6" fill="#FFF" />
      {/* ยอดเพชรบนคานตราชั่ง */}
      <circle cx="16" cy="6" r="2.8" fill={`url(#svfPurple_${id})`} stroke="#FEF08A" strokeWidth="1.2" />
    </svg>
  );
}

/**
 * 6. ReorderPointControlIcon: ควบคุมจุดสั่งซื้อสินค้า (Reorder Point / Smart Restock Control)
 * ดีไซน์: กล่องพัสดุสินค้าคลัง 3 มิติ, เกจวัดระดับสต็อกปลอดภัย (Safety Buffer), เรดาร์ตรวจจับของใกล้หมด และเครื่องหมายสั่งของอัตโนมัติ
 */
export function ReorderPointControlIcon({ size = 24, className = '' }) {
  const id = React.useId().replace(/:/g, '');
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={`flex-shrink-0 ${className}`}>
      <defs>
        <linearGradient id={`ropCyan_${id}`} x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#BAE6FD" />
          <stop offset="50%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#0369A1" />
        </linearGradient>
        <linearGradient id={`ropGold_${id}`} x1="6" y1="6" x2="26" y2="26" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FEF08A" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
      </defs>
      {/* กล่องสต็อกสินค้าไอโซเมตริก 3 มิติ */}
      {/* ผิวด้านบน */}
      <polygon points="16,4 25,8.5 16,13 7,8.5" fill="#E0F2FE" stroke="#38BDF8" strokeWidth="1.3" strokeLinejoin="round" />
      {/* ผิวด้านซ้าย */}
      <polygon points="7,8.5 16,13 16,23 7,18.5" fill={`url(#ropCyan_${id})`} stroke="#0284C7" strokeWidth="1.3" strokeLinejoin="round" />
      {/* ผิวด้านขวา */}
      <polygon points="16,13 25,8.5 25,18.5 16,23" fill="#0284C7" stroke="#0369A1" strokeWidth="1.3" strokeLinejoin="round" opacity="0.85" />
      {/* เทปคาดกล่องสินค้า */}
      <polygon points="16,4 18,5 13,7.5 11,6.5" fill={`url(#ropGold_${id})`} />
      <line x1="16" y1="13" x2="16" y2="23" stroke={`url(#ropGold_${id})`} strokeWidth="1.5" />
      {/* เกจเรดาร์แจ้งเตือนจุดสั่งซื้อ (ROP Alert Ring ด้านล่าง) */}
      <ellipse cx="16" cy="26" rx="11" ry="3.8" stroke="#38BDF8" strokeWidth="1.4" strokeDasharray="3 2" opacity="0.75" />
      {/* ตราประทับ Restock Triggered สีเขียวมรกตที่มุมขวาล่าง */}
      <circle cx="23" cy="22" r="5" fill="#10B981" stroke="#D1FAE5" strokeWidth="1.3" />
      {/* ลูกศรหมุนเวียน Restock */}
      <path
        d="M21 21C21.5 20.2 22.8 20 23.8 20.5C24.4 20.8 24.8 21.4 24.9 22M25 23C24.5 23.8 23.2 24 22.2 23.5C21.6 23.2 21.2 22.6 21.1 22"
        stroke="#FFF"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <polygon points="21.5,19.5 21,21.5 23,21.5" fill="#FFF" />
      <polygon points="24.5,24.5 25,22.5 23,22.5" fill="#FFF" />
    </svg>
  );
}

/**
 * 7. ActualParsedDataTableIcon: ตารางแสดงข้อความและข้อมูลจริง
 * ดีไซน์: ตาราง Matrix ข้อมูลจริงแบบ 3D Isometric กระจกหรูหรา (Holographic Spreadsheet Matrix)
 * แถวและคอลัมน์สีทอง-แซฟไฟร์, เม็ดข้อมูลเรืองแสง และตราประทับตรวจสอบความถูกต้องสีเขียวมรกต
 */
export function ActualParsedDataTableIcon({ size = 24, className = '' }) {
  const id = React.useId().replace(/:/g, '');
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={`flex-shrink-0 ${className}`}>
      <defs>
        <linearGradient id={`tblSapphire_${id}`} x1="3" y1="5" x2="29" y2="27" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="50%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#1E3A8A" />
        </linearGradient>
        <linearGradient id={`tblGold_${id}`} x1="6" y1="4" x2="26" y2="14" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FEF08A" />
          <stop offset="50%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
      </defs>
      {/* ฐานตารางข้อมูล 3 มิติ Card Surface */}
      <rect x="4" y="5" width="24" height="22" rx="4" fill={`url(#tblSapphire_${id})`} fillOpacity="0.18" stroke="url(#tblSapphire_${id})" strokeWidth="1.6" />
      {/* แถบหัวตาราง Header Ribbon (Gold Accent) */}
      <rect x="5.5" y="6.5" width="21" height="6" rx="2.5" fill={`url(#tblGold_${id})`} />
      <circle cx="9" cy="9.5" r="1.3" fill="#FFF" />
      <rect x="12" y="8.5" width="5" height="2" rx="1" fill="#78350F" />
      <rect x="19" y="8.5" width="5.5" height="2" rx="1" fill="#78350F" />
      {/* เส้นตาราง Grid Rows & Columns */}
      <line x1="5.5" y1="17.5" x2="26.5" y2="17.5" stroke="#93C5FD" strokeWidth="1.2" strokeDasharray="2 1.5" />
      <line x1="5.5" y1="22.5" x2="26.5" y2="22.5" stroke="#93C5FD" strokeWidth="1.2" strokeDasharray="2 1.5" />
      <line x1="12.5" y1="13" x2="12.5" y2="25.5" stroke="#93C5FD" strokeWidth="1.2" strokeDasharray="2 1.5" />
      <line x1="19.5" y1="13" x2="19.5" y2="25.5" stroke="#93C5FD" strokeWidth="1.2" strokeDasharray="2 1.5" />
      {/* เม็ดข้อมูลจริง (Parsed Data Tokens) */}
      <rect x="7" y="15" width="4" height="1.6" rx="0.8" fill="#38BDF8" />
      <rect x="14" y="15" width="4" height="1.6" rx="0.8" fill="#FBBF24" />
      <rect x="21" y="15" width="4" height="1.6" rx="0.8" fill="#34D399" />
      <rect x="7" y="20" width="4" height="1.6" rx="0.8" fill="#A78BFA" />
      <rect x="14" y="20" width="4" height="1.6" rx="0.8" fill="#38BDF8" />
      <rect x="21" y="20" width="4" height="1.6" rx="0.8" fill="#F472B6" />
      {/* ตราประทับตรวจสอบข้อมูลจริง 100% (Verified Emerald Badge) */}
      <circle cx="24" cy="24" r="4.8" fill="#10B981" stroke="#D1FAE5" strokeWidth="1.3" />
      <path d="M22 24L23.5 25.5L26.5 22.5" stroke="#FFF" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * 8. BaselineTrajectoryIcon: แนวโน้มปกติเดิม (Baseline Trajectory)
 * ดีไซน์: เส้นคลื่นวิถีแนวโน้มอ้างอิง 3 มิติ (Holographic Reference Trajectory Wave)
 * หมุดเพชรเปรียบเทียบค่ามาตรฐานเดิม (Historical Anchor Pin), เส้นคลื่นเสถียรภาพ และสเกลวัดความแม่นยำ
 */
export function BaselineTrajectoryIcon({ size = 24, className = '' }) {
  const id = React.useId().replace(/:/g, '');
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={`flex-shrink-0 ${className}`}>
      <defs>
        <linearGradient id={`baseWave_${id}`} x1="3" y1="26" x2="29" y2="6" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0284C7" />
          <stop offset="50%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#818CF8" />
        </linearGradient>
        <linearGradient id={`baseGold_${id}`} x1="12" y1="8" x2="22" y2="18" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FEF08A" />
          <stop offset="50%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
        <linearGradient id={`baseFloor_${id}`} x1="4" y1="26" x2="28" y2="26" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#818CF8" stopOpacity="0.2" />
        </linearGradient>
      </defs>
      {/* ระนาบแกนอ้างอิงประวัติ Baseline Floor */}
      <line x1="4" y1="26" x2="28" y2="26" stroke={`url(#baseFloor_${id})`} strokeWidth="1.8" strokeLinecap="round" />
      <line x1="4" y1="8" x2="4" y2="26" stroke="#64748B" strokeWidth="1.3" strokeDasharray="2 1.5" opacity="0.6" />
      {/* เงาพื้นที่ใต้คลื่นแนวโน้มปกติ (Area Under Baseline) */}
      <path
        d="M5 24C9 22 13 18 16 17C20 15.5 23 11 27 9V26H5V24Z"
        fill={`url(#baseWave_${id})`}
        fillOpacity="0.18"
      />
      {/* เส้นวิถีแนวโน้มปกติเดิม (Baseline Trajectory Smooth Curve) */}
      <path
        d="M4 24C8 22 12.5 18 16 17C19.5 16 23 11 27.5 9"
        stroke={`url(#baseWave_${id})`}
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* เส้นพยากรณ์ขยายแนวโน้มเดิมไปข้างหน้า (Projected Baseline Extension) */}
      <path
        d="M27.5 9L30 7.5"
        stroke="#A5B4FC"
        strokeWidth="2"
        strokeDasharray="2 2"
        strokeLinecap="round"
      />
      {/* หมุดเพชรศูนย์กลางการวัด (Calibration Anchor Node) */}
      <circle cx="16" cy="17" r="4.2" fill={`url(#baseGold_${id})`} stroke="#FFF" strokeWidth="1.4" />
      <circle cx="16" cy="17" r="1.5" fill="#78350F" />
      {/* จุดพิกัดประวัติเดิม */}
      <circle cx="8" cy="22" r="2.2" fill="#38BDF8" stroke="#E0F2FE" strokeWidth="1" />
      <circle cx="24" cy="12" r="2.4" fill="#818CF8" stroke="#EEF2FF" strokeWidth="1" />
      {/* รังสีวัดระยะห่าง (Baseline Calibration Caliper) */}
      <line x1="16" y1="17" x2="16" y2="26" stroke="#FDE047" strokeWidth="1.2" strokeDasharray="1.5 1.5" />
    </svg>
  );
}

/**
 * 9. DailyAverageDemandIcon: ยอดขายเฉลี่ยรายวัน (Daily Average Demand / Mean Sales)
 * ดีไซน์: หน้าปัดปฏิทินวัฏจักรยอดขาย 24 ชั่วโมง 3 มิติ (Executive Daily Demand Dial)
 * แท่งสถิติเฉลี่ย 3 มิติสีทอง-ไซอัน, สัญลักษณ์ค่าเฉลี่ย x̄ (Mean Metric Node) และเหรียญทองคำยอดขาย
 */
export function DailyAverageDemandIcon({ size = 24, className = '' }) {
  const id = React.useId().replace(/:/g, '');
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={`flex-shrink-0 ${className}`}>
      <defs>
        <linearGradient id={`dadGold_${id}`} x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FEF08A" />
          <stop offset="45%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>
        <linearGradient id={`dadCyan_${id}`} x1="6" y1="12" x2="26" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E0F2FE" />
          <stop offset="50%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#0284C7" />
        </linearGradient>
      </defs>
      {/* วงแหวนปฏิทินรายวัน 3 มิติ Calendar Bezel */}
      <rect x="4" y="6" width="24" height="22" rx="4.5" fill="#0B132B" stroke={`url(#dadGold_${id})`} strokeWidth="1.6" />
      {/* แถบหัวปฏิทินวันใหม่ */}
      <rect x="5.5" y="7.5" width="21" height="5" rx="2" fill={`url(#dadGold_${id})`} />
      <circle cx="9" cy="5" r="1.2" fill="#FEF08A" />
      <circle cx="23" cy="5" r="1.2" fill="#FEF08A" />
      <line x1="9" y1="4" x2="9" y2="7.5" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round" />
      <line x1="23" y1="4" x2="23" y2="7.5" stroke="#F59E0B" strokeWidth="1.8" strokeLinecap="round" />
      {/* แท่งสถิติยอดขายเฉลี่ยรายวัน (Daily Bars Triad) */}
      <rect x="7.5" y="18" width="3.5" height="7.5" rx="1.5" fill={`url(#dadCyan_${id})`} />
      <rect x="13" y="14.5" width="3.5" height="11" rx="1.5" fill={`url(#dadGold_${id})`} />
      <rect x="18.5" y="16.5" width="3.5" height="9" rx="1.5" fill={`url(#dadCyan_${id})`} />
      {/* เส้นค่าเฉลี่ยสถิติแนวนอน (Mean Horizontal Benchmark Bar) */}
      <line x1="6" y1="15" x2="24" y2="15" stroke="#FDE047" strokeWidth="1.4" strokeDasharray="2 1.5" />
      {/* ตราสัญลักษณ์ค่าเฉลี่ยและสกุลเงิน (Gold Mean Token ฿ / x̄) */}
      <circle cx="24.5" cy="18" r="4.5" fill={`url(#dadGold_${id})`} stroke="#FFFBEB" strokeWidth="1.2" />
      <text x="24.5" y="20.5" textAnchor="middle" fill="#78350F" fontSize="6.5" fontWeight="900" fontFamily="sans-serif">฿</text>
    </svg>
  );
}

/**
 * 10. EnterpriseStandardIcon: มาตรฐานองค์กร (Enterprise Standard & Corporate Governance)
 * ดีไซน์: ตราโล่เกียรติยศระดับสถาบัน 3 มิติ (Royal Titanium & Emerald Security Crest)
 * ขอบทองคำ 24K, โล่เขียวมรกตนิรภัย, กุญแจเข้ารหัสความลับธุรกิจ และดาวเกียรติยศ 3 ดวง
 */
export function EnterpriseStandardIcon({ size = 24, className = '' }) {
  const id = React.useId().replace(/:/g, '');
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={`flex-shrink-0 ${className}`}>
      <defs>
        <linearGradient id={`entEmerald_${id}`} x1="6" y1="4" x2="26" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#A7F3D0" />
          <stop offset="40%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id={`entGold_${id}`} x1="4" y1="2" x2="28" y2="30" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFBEB" />
          <stop offset="45%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>
        <radialGradient id={`entGlow_${id}`} cx="50%" cy="40%" r="55%">
          <stop offset="0%" stopColor="#34D399" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#047857" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* รัศมีแสงความปลอดภัยเบื้องหลัง */}
      <circle cx="16" cy="15" r="13" fill={`url(#entGlow_${id})`} />
      {/* โล่ขอบทองคำแท้ 24K ชั้นนอก (Outer Gold Bevel Shield) */}
      <path
        d="M16 2.5L26.5 6.5C26.5 14.5 22 22 16 29C10 22 5.5 14.5 5.5 6.5L16 2.5Z"
        fill={`url(#entGold_${id})`}
        stroke="#FEF08A"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      {/* โล่ชั้นในสีเขียวมรกตมงคลเกรดองค์กร (Inner Emerald Security Plate) */}
      <path
        d="M16 4.8L24.5 8C24.5 14.5 20.8 20.5 16 26.5C11.2 20.5 7.5 14.5 7.5 8L16 4.8Z"
        fill={`url(#entEmerald_${id})`}
        stroke="#6EE7B7"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      {/* มงกุฎเกียรติยศ / ดาว 3 ดวงด้านบน */}
      <polygon points="16,8 17,10.5 19.5,10.8 17.5,12.5 18.2,15 16,13.6 13.8,15 14.5,12.5 12.5,10.8 15,10.5" fill="#FFFBEB" stroke="#F59E0B" strokeWidth="0.8" />
      <circle cx="11.5" cy="11.5" r="1.2" fill="#FEF08A" />
      <circle cx="20.5" cy="11.5" r="1.2" fill="#FEF08A" />
      {/* แม่กุญแจทองคำนิรภัยองค์กร (Enterprise Security Vault Lock) */}
      <rect x="12.5" y="18" width="7" height="5.5" rx="1.5" fill={`url(#entGold_${id})`} stroke="#FFFBEB" strokeWidth="0.9" />
      <path d="M14 18V15.5C14 14.4 14.9 13.5 16 13.5C17.1 13.5 18 14.4 18 15.5V18" stroke="#FFFBEB" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="16" cy="20.2" r="0.9" fill="#78350F" />
      {/* ริบบิ้นมาตรฐานรับรองด้านล่าง (Certified Ribbon) */}
      <path d="M10 27L12 24.5H20L22 27L16 29L10 27Z" fill={`url(#entGold_${id})`} stroke="#FEF08A" strokeWidth="0.8" />
    </svg>
  );
}

/**
 * 11. PowerBiStudioIcon: โลโก้ Executive BI Studio & Power BI Suite 3 มิติ
 * ดีไซน์: แท่งชาร์ต 3 มิติชั้นนำสไตล์ Power BI สีทอง 24K และสีเหลืองอำพัน-ไซอัน
 * พร้อมวงแหวนโดนัทสะท้อนแสง และเส้นเชื่อมโยงโครงข่ายการวิเคราะห์ขั้นสูง
 */
export function PowerBiStudioIcon({ size = 26, className = '' }) {
  const id = React.useId().replace(/:/g, '');
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={`flex-shrink-0 ${className}`}>
      <defs>
        <linearGradient id={`pbiGold_${id}`} x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FEF08A" />
          <stop offset="40%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
        <linearGradient id={`pbiCyan_${id}`} x1="6" y1="10" x2="26" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E0F2FE" />
          <stop offset="50%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#0284C7" />
        </linearGradient>
        <linearGradient id={`pbiAmber_${id}`} x1="2" y1="2" x2="30" y2="30" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>
      </defs>
      {/* แท่นฐานแคนวาส 3 มิติ */}
      <rect x="3" y="24" width="26" height="5" rx="2" fill="#0B132B" stroke={`url(#pbiGold_${id})`} strokeWidth="1.2" />
      {/* เสากราฟ 3 มิติ 3 ระดับ (Power BI Trio Columns) */}
      <rect x="5.5" y="16" width="5.5" height="10" rx="1.8" fill={`url(#pbiCyan_${id})`} stroke="#BAE6FD" strokeWidth="0.8" />
      <rect x="13.25" y="10" width="5.5" height="16" rx="1.8" fill={`url(#pbiGold_${id})`} stroke="#FFFBEB" strokeWidth="0.8" />
      <rect x="21" y="5" width="5.5" height="21" rx="1.8" fill={`url(#pbiAmber_${id})`} stroke="#FEF08A" strokeWidth="0.9" />
      {/* วงแหวนสะท้อน Donut Highlight */}
      <circle cx="23.75" cy="5" r="2.2" fill="#FEF08A" />
      {/* เส้นแนวโน้มพุ่งทะยานเชื่อมหัวเสา */}
      <path d="M8.25 15.5L16 9.5L23.75 4.5" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="8.25" cy="15.5" r="1.5" fill="#38BDF8" />
      <circle cx="16" cy="9.5" r="1.5" fill="#F59E0B" />
    </svg>
  );
}

/**
 * 12. SlicerFilterIcon: สไลเซอร์และตัวกรองข้ามมิติ (Interactive Visual Slicer & Cross-Filter)
 */
export function SlicerFilterIcon({ size = 22, className = '' }) {
  const id = React.useId().replace(/:/g, '');
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={`flex-shrink-0 ${className}`}>
      <defs>
        <linearGradient id={`slcGold_${id}`} x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FEF08A" />
          <stop offset="50%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>
        <linearGradient id={`slcCyan_${id}`} x1="6" y1="8" x2="26" y2="26" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#BAE6FD" />
          <stop offset="100%" stopColor="#0284C7" />
        </linearGradient>
      </defs>
      {/* กรวยกรองคริสตัล 3 มิติ */}
      <path d="M4 6.5C4 5.4 4.9 4.5 6 4.5H26C27.1 4.5 28 5.4 28 6.5V9C28 9.6 27.7 10.2 27.2 10.6L19 17.5V26.5C19 27.2 18.5 27.8 17.8 28L13.8 29.3C13.2 29.5 12.5 29.1 12.5 28.5V17.5L4.8 10.6C4.3 10.2 4 9.6 4 9V6.5Z" fill="#0B132B" stroke={`url(#slcGold_${id})`} strokeWidth="1.6" strokeLinejoin="round" />
      {/* ลายเส้นรังสีสไลเซอร์หลายระดับ */}
      <line x1="8" y1="9" x2="24" y2="9" stroke={`url(#slcCyan_${id})`} strokeWidth="2" strokeLinecap="round" />
      <circle cx="14" cy="9" r="2.2" fill="#FEF08A" />
      <line x1="11" y1="13" x2="21" y2="13" stroke="#FEF08A" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="17" cy="13" r="1.8" fill={`url(#slcCyan_${id})`} />
      {/* ละอองข้อมูลที่ผ่านการกรอง (Refined Data Particles) */}
      <circle cx="16" cy="22" r="1.5" fill="#38BDF8" />
      <circle cx="16" cy="25" r="1.2" fill="#FEF08A" />
    </svg>
  );
}

/**
 * 13. WaterfallChartIcon: สะพานงบการเงิน P&L และความแปรปรวน (Waterfall Variance Chart)
 */
export function WaterfallChartIcon({ size = 22, className = '' }) {
  const id = React.useId().replace(/:/g, '');
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={`flex-shrink-0 ${className}`}>
      <defs>
        <linearGradient id={`wfGreen_${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6EE7B7" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        <linearGradient id={`wfRed_${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FCA5A5" />
          <stop offset="100%" stopColor="#DC2626" />
        </linearGradient>
        <linearGradient id={`wfGold_${id}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FEF08A" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
      </defs>
      {/* เส้นแกนนอน */}
      <line x1="3" y1="27" x2="29" y2="27" stroke="#64748B" strokeWidth="1.2" />
      {/* เสาเริ่มต้น (รายได้รวม - เขียว) */}
      <rect x="4" y="9" width="4.5" height="18" rx="1.2" fill={`url(#wfGreen_${id})`} />
      {/* เส้นประเชื่อม 1 */}
      <line x1="8.5" y1="9" x2="10.5" y2="9" stroke="#94A3B8" strokeWidth="1" strokeDasharray="1.5 1.5" />
      {/* เสาลด 1 (CoGS - แดง) */}
      <rect x="10.5" y="9" width="4.5" height="7" rx="1.2" fill={`url(#wfRed_${id})`} />
      {/* เส้นประเชื่อม 2 */}
      <line x1="15" y1="16" x2="17" y2="16" stroke="#94A3B8" strokeWidth="1" strokeDasharray="1.5 1.5" />
      {/* เสาลด 2 (Ad Spend / OPEX - แดง) */}
      <rect x="17" y="16" width="4.5" height="5" rx="1.2" fill={`url(#wfRed_${id})`} />
      {/* เส้นประเชื่อม 3 */}
      <line x1="21.5" y1="21" x2="23.5" y2="21" stroke="#94A3B8" strokeWidth="1" strokeDasharray="1.5 1.5" />
      {/* เสาสรุปผลลัพธ์สุทธิ (Net Operating Profit - ทองคำ) */}
      <rect x="23.5" y="14" width="5" height="13" rx="1.2" fill={`url(#wfGold_${id})`} stroke="#FFFBEB" strokeWidth="0.8" />
    </svg>
  );
}

/**
 * 14. MatrixTableIcon: ตารางพิวอตแมทริกซ์ 3 มิติ (Executive Pivot Matrix Table)
 */
export function MatrixTableIcon({ size = 22, className = '' }) {
  const id = React.useId().replace(/:/g, '');
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={`flex-shrink-0 ${className}`}>
      <defs>
        <linearGradient id={`matGold_${id}`} x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FEF08A" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
      </defs>
      <rect x="4" y="4.5" width="24" height="23" rx="3.5" fill="#0B132B" stroke={`url(#matGold_${id})`} strokeWidth="1.5" />
      {/* แถบหัวตาราง */}
      <rect x="4.5" y="5" width="23" height="6" rx="2" fill={`url(#matGold_${id})`} />
      <circle cx="8" cy="8" r="1.2" fill="#78350F" />
      <circle cx="16" cy="8" r="1.2" fill="#78350F" />
      <circle cx="24" cy="8" r="1.2" fill="#78350F" />
      {/* เส้นแบ่งคอลัมน์ */}
      <line x1="12" y1="11" x2="12" y2="27" stroke="#334155" strokeWidth="1" />
      <line x1="20" y1="11" x2="20" y2="27" stroke="#334155" strokeWidth="1" />
      {/* เส้นแบ่งแถว */}
      <line x1="4.5" y1="16" x2="27.5" y2="16" stroke="#334155" strokeWidth="1" />
      <line x1="4.5" y1="21.5" x2="27.5" y2="21.5" stroke="#334155" strokeWidth="1" />
      {/* หลอด Data Bar ในช่องตาราง */}
      <rect x="13.5" y="13" width="5" height="2" rx="1" fill="#38BDF8" />
      <rect x="13.5" y="18" width="3.5" height="2" rx="1" fill="#34D399" />
      <rect x="21.5" y="13" width="4.5" height="2" rx="1" fill="#FBBF24" />
      <rect x="21.5" y="18" width="5" height="2" rx="1" fill="#38BDF8" />
      <rect x="21.5" y="23.5" width="3.5" height="2" rx="1" fill="#34D399" />
    </svg>
  );
}

/**
 * 15. GaugeMeterIcon: เกจวัดเป้าหมายและผลสัมฤทธิ์ (Target Achievement Gauge)
 */
export function GaugeMeterIcon({ size = 22, className = '' }) {
  const id = React.useId().replace(/:/g, '');
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={`flex-shrink-0 ${className}`}>
      <defs>
        <linearGradient id={`gaugeGrad_${id}`} x1="4" y1="20" x2="28" y2="20" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#EF4444" />
          <stop offset="50%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#10B981" />
        </linearGradient>
      </defs>
      {/* วงโค้งหน้าปัดเกจ */}
      <path d="M6 22C6 14.268 12.268 8 20 8C23.866 8 27.366 9.567 29.899 12.1" stroke="#334155" strokeWidth="3.2" strokeLinecap="round" />
      <path d="M6 22C6 14.268 12.268 8 20 8C23.5 8 26.6 9.3 29 11.5" stroke={`url(#gaugeGrad_${id})`} strokeWidth="3.2" strokeLinecap="round" />
      {/* ฐานเข็มชี้ */}
      <circle cx="18" cy="22" r="3.5" fill="#0B132B" stroke="#FEF08A" strokeWidth="1.5" />
      {/* เข็มชี้หน้าปัดชี้ไปทางสีเขียวเป้าหมายสำเร็จ */}
      <line x1="18" y1="22" x2="25" y2="13" stroke="#FEF08A" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="18" cy="22" r="1.5" fill="#F59E0B" />
      {/* ดาวเป้าหมาย */}
      <circle cx="28" cy="11.5" r="2" fill="#34D399" />
    </svg>
  );
}

/**
 * 16. ExecutiveCopilotIcon: ปัญญาประดิษฐ์ถาม-ตอบภาษาธรรมชาติ (Power BI Q&A Copilot)
 */
export function ExecutiveCopilotIcon({ size = 22, className = '' }) {
  const id = React.useId().replace(/:/g, '');
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={`flex-shrink-0 ${className}`}>
      <defs>
        <linearGradient id={`copiGold_${id}`} x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FEF08A" />
          <stop offset="50%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
        <linearGradient id={`copiOrb_${id}`} x1="8" y1="8" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#C084FC" />
          <stop offset="50%" stopColor="#818CF8" />
          <stop offset="100%" stopColor="#38BDF8" />
        </linearGradient>
      </defs>
      {/* ลูกแก้วควอนตัม AI Core */}
      <circle cx="16" cy="15" r="9.5" fill="#0B132B" stroke={`url(#copiGold_${id})`} strokeWidth="1.5" />
      <circle cx="16" cy="15" r="6.5" fill={`url(#copiOrb_${id})`} opacity="0.9" />
      {/* ประกายดาวปัญญาประดิษฐ์ (AI Sparkle Stars) */}
      <polygon points="16,8.5 17.5,12 21,13.5 17.5,15 16,18.5 14.5,15 11,13.5 14.5,12" fill="#FFFBEB" />
      {/* คลื่นเสียงวิเคราะห์คำถาม Q&A */}
      <path d="M7 26C11 23 21 23 25 26" stroke="#38BDF8" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="16" cy="27" r="1.5" fill="#FEF08A" />
    </svg>
  );
}

/**
 * 17. PresentationModeIcon: โหมดนำเสนอผู้บริหารเต็มจอ (Executive Presentation Mode)
 */
export function PresentationModeIcon({ size = 22, className = '' }) {
  const id = React.useId().replace(/:/g, '');
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={`flex-shrink-0 ${className}`}>
      <defs>
        <linearGradient id={`presGold_${id}`} x1="3" y1="3" x2="29" y2="29" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FEF08A" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
      </defs>
      {/* จอฉายโปรเจกเตอร์ / บอร์ดนำเสนอ 3 มิติ */}
      <rect x="4" y="5" width="24" height="16" rx="3" fill="#0B132B" stroke={`url(#presGold_${id})`} strokeWidth="1.6" />
      {/* ขาตั้งบอร์ดนำเสนอ */}
      <line x1="16" y1="21" x2="16" y2="26" stroke={`url(#presGold_${id})`} strokeWidth="2" strokeLinecap="round" />
      <line x1="10" y1="26" x2="22" y2="26" stroke={`url(#presGold_${id})`} strokeWidth="2" strokeLinecap="round" />
      {/* เนื้อหากราฟย่อบนจอพรีเซนต์ */}
      <path d="M7 16L12 11L16 14L22 9L25 11" stroke="#38BDF8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="22" cy="9" r="1.5" fill="#FEF08A" />
    </svg>
  );
}

/**
 * BusinessOverviewAndGoalIcon: ไอคอนพรีเมียม 3 มิติ "ภาพรวมธุรกิจและเป้าหมาย" (Business Overview & Strategic Goals)
 * - สัญลักษณ์: แท่นฐานธุรกิจมั่นคง + กราฟแท่งการเติบโต 3 ระดับสีทอง-ฟ้า
 * - เป้าหมาย: วงแหวนเรดาร์เป้าหมายหลายมิติ (Concentric Bullseye Target Rings)
 * - ลูกศรทะยานสู่เป้าหมาย (Goal Trajectory & Piercing Arrow)
 * - ประกายดาวความสำเร็จ 100% (Pinnacle Achievement Star)
 */
export function BusinessOverviewAndGoalIcon({ size = 26, className = '' }) {
  const id = React.useId().replace(/:/g, '');
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" className={`flex-shrink-0 ${className}`}>
      <defs>
        <linearGradient id={`ovBaseFloor_${id}`} x1="2" y1="27" x2="30" y2="27" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.9" />
          <stop offset="50%" stopColor="#FBBF24" stopOpacity="0.95" />
          <stop offset="100%" stopColor="#10B981" stopOpacity="0.8" />
        </linearGradient>
        <linearGradient id={`ovBar1_${id}`} x1="3" y1="26" x2="8" y2="19" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0284C7" />
          <stop offset="100%" stopColor="#38BDF8" />
        </linearGradient>
        <linearGradient id={`ovBar2_${id}`} x1="9" y1="26" x2="14" y2="13" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#0369A1" />
          <stop offset="50%" stopColor="#0EA5E9" />
          <stop offset="100%" stopColor="#7DD3FC" />
        </linearGradient>
        <linearGradient id={`ovBar3_${id}`} x1="15" y1="26" x2="20" y2="8" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#D97706" />
          <stop offset="50%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#FEF08A" />
        </linearGradient>
        <linearGradient id={`ovTargetGold_${id}`} x1="16" y1="1" x2="31" y2="16" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FEF08A" />
          <stop offset="45%" stopColor="#FBBF24" />
          <stop offset="85%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
        <linearGradient id={`ovArrowLaser_${id}`} x1="4" y1="22" x2="25" y2="8" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="60%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#FFFFFF" />
        </linearGradient>
        <filter id={`ovGlow_${id}`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* 1. แท่นฐานรากธุรกิจ (Solid Enterprise Base) */}
      <rect x="2.5" y="26" width="27" height="2.5" rx="1.25" fill={`url(#ovBaseFloor_${id})`} />

      {/* 2. แท่งสถิติการเติบโตของธุรกิจ 3 ระดับ (Ascending Performance Pillars) */}
      <rect x="3.5" y="19" width="4.5" height="6.5" rx="1.3" fill={`url(#ovBar1_${id})`} stroke="#E0F2FE" strokeWidth="0.6" />
      <rect x="9.5" y="13.5" width="4.5" height="12" rx="1.3" fill={`url(#ovBar2_${id})`} stroke="#BAE6FD" strokeWidth="0.6" />
      <rect x="15.5" y="8" width="4.5" height="17.5" rx="1.3" fill={`url(#ovBar3_${id})`} stroke="#FEF08A" strokeWidth="0.6" />

      {/* 3. วงแหวนเป้าหมายกลยุทธ์ (Strategic Bullseye Target Rings) */}
      <circle cx="23.5" cy="8.5" r="7.5" stroke={`url(#ovTargetGold_${id})`} strokeWidth="1.8" strokeDasharray="3.2 1.8" />
      <circle cx="23.5" cy="8.5" r="4.6" stroke="#FEF08A" strokeWidth="1.6" />
      <circle cx="23.5" cy="8.5" r="2" fill="#FFFFFF" filter={`url(#ovGlow_${id})`} />
      <circle cx="23.5" cy="8.5" r="1.1" fill="#78350F" />

      {/* เส้นแกนเล็งเป้าหมาย 4 ทิศ (Crosshair Reticle Marks) */}
      <line x1="23.5" y1="0.5" x2="23.5" y2="2.5" stroke="#FBBF24" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="23.5" y1="14.5" x2="23.5" y2="16.5" stroke="#FBBF24" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="15.5" y1="8.5" x2="17.5" y2="8.5" stroke="#FBBF24" strokeWidth="1.6" strokeLinecap="round" />
      <line x1="29.5" y1="8.5" x2="31.5" y2="8.5" stroke="#FBBF24" strokeWidth="1.6" strokeLinecap="round" />

      {/* 4. เส้นวิถีและลูกศรทะยานพุ่งเข้ากลางเป้าหมาย (Goal Trajectory & Piercing Arrow) */}
      <path
        d="M4 18C7.5 16 12 13 18 9.5"
        stroke={`url(#ovArrowLaser_${id})`}
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M23 4.5L27.5 8.5L23 12.5"
        stroke="#FFFFFF"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter={`url(#ovGlow_${id})`}
      />

      {/* 5. ประกายดาวแห่งความสำเร็จสูงสุด (Pinnacle Spark) */}
      <path
        d="M29 2L29.7 0.8L30.4 2L31.6 2.7L30.4 3.4L29.7 4.6L29 3.4L27.8 2.7Z"
        fill="#FEF08A"
      />
    </svg>
  );
}



