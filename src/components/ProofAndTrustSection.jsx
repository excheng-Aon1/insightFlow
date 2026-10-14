import React, { useState } from 'react';

/**
 * Ultra-Luxurious Modern Web Dashboard Icon
 * Designed specifically per user request:
 * "เปลี่ยน icon มุมมอง web Dashboard จริง ให้สวยงาม ทันสมัย หรูหรา"
 * 3D isometric glassmorphic console with 24K gold foil gradients, obsidian sapphire backing,
 * floating holographic trendlines, and laser-cut crystal display.
 */
export function LuxuryDashboardIcon({ size = 28, className = '' }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`luxury-dashboard-icon ${className}`}
      style={{ filter: 'drop-shadow(0 4px 12px rgba(251, 191, 36, 0.45))' }}
    >
      <defs>
        {/* Luxury Gold & Sapphire Gradients */}
        <linearGradient id="goldPlate" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFBEB" />
          <stop offset="25%" stopColor="#FDE68A" />
          <stop offset="50%" stopColor="#F59E0B" />
          <stop offset="85%" stopColor="#D97706" />
          <stop offset="100%" stopColor="#78350F" />
        </linearGradient>

        <linearGradient id="sapphireGlass" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1E293B" stopOpacity="0.95" />
          <stop offset="50%" stopColor="#0B132B" stopOpacity="0.98" />
          <stop offset="100%" stopColor="#020617" />
        </linearGradient>

        <linearGradient id="neonLaser" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="50%" stopColor="#818CF8" />
          <stop offset="100%" stopColor="#FBBF24" />
        </linearGradient>

        <linearGradient id="goldBarGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#B45309" />
          <stop offset="50%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#FDE68A" />
        </linearGradient>

        <linearGradient id="emeraldBarGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#047857" />
          <stop offset="50%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#6EE7B7" />
        </linearGradient>

        <linearGradient id="cyanBarGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#0369A1" />
          <stop offset="50%" stopColor="#0EA5E9" />
          <stop offset="100%" stopColor="#7DD3FC" />
        </linearGradient>

        {/* Glow Filters */}
        <filter id="goldGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Outer Diamond-Cut Chamfer Base */}
      <rect
        x="3"
        y="5"
        width="42"
        height="38"
        rx="9"
        fill="url(#sapphireGlass)"
        stroke="url(#goldPlate)"
        strokeWidth="1.8"
      />

      {/* Top Brushed Gold Console Header Bar */}
      <rect x="3.5" y="5.5" width="41" height="7" rx="8" fill="url(#goldPlate)" opacity="0.15" />
      <line x1="4" y1="13" x2="44" y2="13" stroke="url(#goldPlate)" strokeWidth="0.8" opacity="0.6" />

      {/* Mini LED Indicators in Top Console */}
      <circle cx="8" cy="9.2" r="1.4" fill="#F43F5E" />
      <circle cx="12.5" cy="9.2" r="1.4" fill="#FBBF24" />
      <circle cx="17" cy="9.2" r="1.4" fill="#10B981" />

      {/* Mini Executive Metric Spark Badge */}
      <rect x="31" y="7.5" width="11" height="3.5" rx="1.75" fill="#FBBF24" opacity="0.25" />
      <circle cx="33" cy="9.2" r="0.9" fill="#FDE68A" />
      <line x1="35.5" y1="9.2" x2="40.5" y2="9.2" stroke="#FDE68A" strokeWidth="0.8" strokeLinecap="round" />

      {/* Left Metric Mini-Card */}
      <rect x="7" y="16.5" width="14" height="9" rx="3" fill="#0F172A" stroke="#38BDF8" strokeWidth="0.8" opacity="0.9" />
      <path d="M9 22L12 19.5L15 21L19 18" stroke="url(#cyanBarGrad)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="19" cy="18" r="1.2" fill="#38BDF8" filter="url(#goldGlow)" />

      {/* Right Metric Mini-Card */}
      <rect x="24" y="16.5" width="17" height="9" rx="3" fill="#0F172A" stroke="#F59E0B" strokeWidth="0.8" opacity="0.9" />
      <line x1="27" y1="19.5" x2="33" y2="19.5" stroke="#FBBF24" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="27" y1="22.5" x2="38" y2="22.5" stroke="#94A3B8" strokeWidth="1" strokeLinecap="round" opacity="0.7" />

      {/* Bottom Main Chart Section with 3D Bars & Holographic Ascending Line */}
      <rect x="7" y="28" width="34" height="12" rx="3.5" fill="#050B18" stroke="white" strokeWidth="0.4" strokeOpacity="0.2" />

      {/* 3D Glass Columns / Profit Bars */}
      <rect x="10.5" y="34.5" width="3.5" height="4" rx="1" fill="url(#cyanBarGrad)" />
      <rect x="16" y="32" width="3.5" height="6.5" rx="1" fill="url(#cyanBarGrad)" />
      <rect x="21.5" y="30" width="3.5" height="8.5" rx="1" fill="url(#goldBarGrad)" />
      <rect x="27" y="31.5" width="3.5" height="7" rx="1" fill="url(#emeraldBarGrad)" />
      <rect x="32.5" y="29" width="3.5" height="9.5" rx="1" fill="url(#goldBarGrad)" filter="url(#goldGlow)" />

      {/* Ascending Golden Growth Laser Stream */}
      <path
        d="M9.5 35.5L15 32.5L20.5 31L26 31.8L32 29L38.5 28.2"
        stroke="url(#neonLaser)"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Peak Golden Growth Star Node */}
      <circle cx="38.5" cy="28.2" r="2" fill="#FBBF24" filter="url(#goldGlow)" />
      <circle cx="38.5" cy="28.2" r="0.9" fill="#FFFFFF" />
    </svg>
  );
}

/**
 * 1. LuxuryTimeSavedIcon (⏱️ Chrono-Quantum Gold Pocket Watch)
 */
export function LuxuryTimeSavedIcon({ size = 32, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={`luxury-dashboard-icon ${className}`}>
      <defs>
        <linearGradient id="timeGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFBEB" />
          <stop offset="40%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
        <linearGradient id="timeCyan" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#0284C7" />
        </linearGradient>
      </defs>
      <circle cx="24" cy="26" r="18" fill="#070C1A" stroke="url(#timeGold)" strokeWidth="2.2" />
      <circle cx="24" cy="26" r="14" fill="#0B1528" stroke="url(#timeCyan)" strokeWidth="0.8" strokeDasharray="3 2" />
      <rect x="21" y="4" width="6" height="4" rx="1.5" fill="url(#timeGold)" />
      <path d="M21 6H27" stroke="#FFF" strokeWidth="1" strokeLinecap="round" />
      <circle cx="24" cy="26" r="2.5" fill="#FDE68A" />
      <line x1="24" y1="26" x2="24" y2="17" stroke="url(#timeGold)" strokeWidth="2" strokeLinecap="round" />
      <line x1="24" y1="26" x2="31" y2="26" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" />
      <circle cx="24" cy="14" r="1" fill="#FBBF24" />
      <circle cx="36" cy="26" r="1" fill="#FBBF24" />
      <circle cx="24" cy="38" r="1" fill="#FBBF24" />
      <circle cx="12" cy="26" r="1" fill="#FBBF24" />
      <path d="M31 16L34 13" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/**
 * 2. LuxuryFraudShieldIcon (🛡️ Ruby & Gold Aegis Armor Shield)
 */
export function LuxuryFraudShieldIcon({ size = 32, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={`luxury-dashboard-icon ${className}`}>
      <defs>
        <linearGradient id="shieldGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFBEB" />
          <stop offset="40%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#92400E" />
        </linearGradient>
        <linearGradient id="rubyGlow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FB7185" />
          <stop offset="50%" stopColor="#E11D48" />
          <stop offset="100%" stopColor="#881337" />
        </linearGradient>
      </defs>
      <path
        d="M24 4L39 10.5V23C39 33.5 32.5 41 24 44C15.5 41 9 33.5 9 23V10.5L24 4Z"
        fill="#0A0F1D"
        stroke="url(#shieldGold)"
        strokeWidth="2.2"
      />
      <path
        d="M24 8L35 13V22.5C35 30.5 30 36.5 24 39.5C18 36.5 13 30.5 13 22.5V13L24 8Z"
        fill="url(#rubyGlow)"
        opacity="0.3"
      />
      <circle cx="24" cy="22" r="5" stroke="url(#shieldGold)" strokeWidth="1.8" fill="#0A0F1D" />
      <rect x="21.5" y="22" width="5" height="5" rx="1" fill="#F43F5E" />
      <path d="M19 30L23 34L30 26" stroke="#FDE68A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/**
 * 3. LuxuryTurnoverBoxIcon (📦 3D Isometric Gold Cargo Crate)
 */
export function LuxuryTurnoverBoxIcon({ size = 32, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={`luxury-dashboard-icon ${className}`}>
      <defs>
        <linearGradient id="boxGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FEF08A" />
          <stop offset="50%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>
        <linearGradient id="boxGlass" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1E293B" />
          <stop offset="100%" stopColor="#0B1329" />
        </linearGradient>
      </defs>
      {/* 3D Isometric Cube Top */}
      <polygon points="24,6 40,14 24,22 8,14" fill="url(#boxGold)" opacity="0.9" />
      {/* Left Face */}
      <polygon points="8,14 24,22 24,39 8,30" fill="url(#boxGlass)" stroke="url(#boxGold)" strokeWidth="1.6" />
      {/* Right Face */}
      <polygon points="24,22 40,14 40,30 24,39" fill="#060A14" stroke="url(#boxGold)" strokeWidth="1.6" />
      {/* Center Laser Beam */}
      <line x1="24" y1="22" x2="24" y2="39" stroke="url(#boxGold)" strokeWidth="1.8" />
      {/* Speed Whirl Rings */}
      <ellipse cx="24" cy="40" rx="15" ry="4" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.8" />
      <path d="M36 24L42 20M37 28L43 25" stroke="#FDE68A" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/**
 * 4. LuxuryBasketGrowthIcon (📈 Ascending Diamond Bar Graph & Cart)
 */
export function LuxuryBasketGrowthIcon({ size = 32, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={`luxury-dashboard-icon ${className}`}>
      <defs>
        <linearGradient id="growthGrad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#059669" />
          <stop offset="50%" stopColor="#10B981" />
          <stop offset="100%" stopColor="#FBBF24" />
        </linearGradient>
      </defs>
      {/* Rounded Crystal Card Base */}
      <rect x="5" y="6" width="38" height="36" rx="8" fill="#070C1A" stroke="url(#growthGrad)" strokeWidth="1.8" />
      {/* Ascending Pillars */}
      <rect x="10" y="27" width="5" height="10" rx="1.5" fill="#047857" />
      <rect x="18" y="21" width="5" height="16" rx="1.5" fill="#10B981" />
      <rect x="26" y="15" width="5" height="22" rx="1.5" fill="#34D399" />
      <rect x="34" y="9" width="5" height="28" rx="1.5" fill="#FBBF24" />
      {/* Ascending Laser Arrow */}
      <path d="M8 32L17 24L25 21L35 11L41 12" stroke="#FFF" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="41" cy="12" r="2.2" fill="#FBBF24" />
    </svg>
  );
}

/**
 * 5. LuxuryPrivateTenantIcon (🚫 Sovereign Vault Sanctuary - Zero Public AI)
 */
export function LuxuryPrivateTenantIcon({ size = 32, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={`luxury-dashboard-icon ${className}`}>
      <defs>
        <linearGradient id="tenantGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFBEB" />
          <stop offset="50%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>
      </defs>
      <rect x="6" y="6" width="36" height="36" rx="10" fill="#080D1D" stroke="url(#tenantGold)" strokeWidth="2" />
      <circle cx="24" cy="24" r="11" stroke="#FBBF24" strokeWidth="1.5" strokeDasharray="3 3" />
      <circle cx="24" cy="24" r="6" fill="#1E293B" stroke="url(#tenantGold)" strokeWidth="1.5" />
      <circle cx="24" cy="24" r="2" fill="#38BDF8" />
      {/* Diagonal Protection Barricade (Refined & Luxury) */}
      <line x1="14" y1="14" x2="34" y2="34" stroke="#F43F5E" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  );
}

/**
 * 6. LuxuryBankLockIcon (🔒 Bank-Grade 24K Gold Padlock)
 */
export function LuxuryBankLockIcon({ size = 32, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={`luxury-dashboard-icon ${className}`}>
      <defs>
        <linearGradient id="lockShackle" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E2E8F0" />
          <stop offset="50%" stopColor="#94A3B8" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>
        <linearGradient id="lockBody" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FEF08A" />
          <stop offset="40%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#92400E" />
        </linearGradient>
      </defs>
      {/* Titanium Shackle */}
      <path d="M16 20V14C16 9.58 19.58 6 24 6C28.42 6 32 9.58 32 14V20" stroke="url(#lockShackle)" strokeWidth="3.2" strokeLinecap="round" />
      {/* Gold Padlock Body */}
      <rect x="10" y="19" width="28" height="23" rx="6" fill="url(#lockBody)" stroke="#FFFBEB" strokeWidth="1.2" />
      {/* Keyhole & Sensor */}
      <circle cx="24" cy="29" r="3" fill="#0B1224" />
      <path d="M23 29L22 36H26L25 29Z" fill="#0B1224" />
      <circle cx="24" cy="29" r="1.2" fill="#34D399" />
    </svg>
  );
}

/**
 * 7. LuxuryConfidentialShieldIcon (🛡️ Executive Crest & Laurel Seal)
 */
export function LuxuryConfidentialShieldIcon({ size = 32, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={`luxury-dashboard-icon ${className}`}>
      <defs>
        <linearGradient id="crestGold" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFBEB" />
          <stop offset="50%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#0284C7" />
        </linearGradient>
      </defs>
      {/* Octagonal Seal */}
      <polygon points="24,5 37,10 42,23 37,36 24,41 11,36 6,23 11,10" fill="#070C1A" stroke="url(#crestGold)" strokeWidth="2" />
      {/* Inner Ring */}
      <circle cx="24" cy="23" r="11" stroke="#38BDF8" strokeWidth="1" strokeDasharray="3 2" />
      {/* Central Star Crest */}
      <path d="M24 15L26.5 20.5L32 21.5L28 25.5L29 31L24 28L19 31L20 25.5L16 21.5L21.5 20.5Z" fill="#FBBF24" />
    </svg>
  );
}

/**
 * 8. LuxuryDataOwnershipIcon (🗑️ Sovereign Data Key & Export Disc)
 */
export function LuxuryDataOwnershipIcon({ size = 32, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" className={`luxury-dashboard-icon ${className}`}>
      <defs>
        <linearGradient id="discPurple" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E879F9" />
          <stop offset="50%" stopColor="#A855F7" />
          <stop offset="100%" stopColor="#6B21A8" />
        </linearGradient>
      </defs>
      <rect x="6" y="7" width="36" height="34" rx="8" fill="#090E1F" stroke="url(#discPurple)" strokeWidth="2" />
      {/* Holographic Disk Pattern */}
      <circle cx="24" cy="22" r="9" stroke="url(#discPurple)" strokeWidth="1.5" fill="#040711" />
      <circle cx="24" cy="22" r="3.5" fill="#FDE68A" />
      {/* Export Arrow Down */}
      <path d="M24 33V39M20 36L24 39L28 36" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="36" cy="12" r="1.5" fill="#F43F5E" />
    </svg>
  );
}

export default function ProofAndTrustSection({
  lang = 'th',
  onOpenLogin,
  onOpenDemo
}) {
  const isEn = lang === 'en';
  const [activeTab, setActiveTab] = useState('web_dashboard'); // default to web dashboard to showcase the luxurious icon!
  const [simulatedFlashSaleActive, setSimulatedFlashSaleActive] = useState(false);
  const [activeMetricId, setActiveMetricId] = useState('time_saved');
  const [metricSparkle, setMetricSparkle] = useState(null);
  const [activeSecurityIdx, setActiveSecurityIdx] = useState(0);
  const [securitySparkle, setSecuritySparkle] = useState(null);

  const handleMetricClick = (id) => {
    setActiveMetricId(id);
    setMetricSparkle(id);
    setTimeout(() => setMetricSparkle(null), 1000);
  };

  const handleSecurityClick = (idx) => {
    setActiveSecurityIdx(idx);
    setSecuritySparkle(idx);
    setTimeout(() => setSecuritySparkle(null), 1000);
  };

  // Social Proof Impact Metrics with Bespoke Luxury Icons
  const impactMetrics = [
    {
      id: 'time_saved',
      IconComponent: LuxuryTimeSavedIcon,
      stat: isEn ? '85+ hrs/mo' : '85+ ชม./เดือน',
      title: isEn ? 'Time Saved on Accounting & Stock' : 'ประหยัดเวลาทำบัญชี & สต็อก',
      sub: isEn
        ? 'Reduced from 3-4 hours daily to only 5 minutes via automated LINE summaries.'
        : 'ลดเวลาจากวันละ 3-4 ชั่วโมง เหลือเพียง 5 นาที สรุปจบผ่าน LINE อัตโนมัติ',
      accentColor: '#38BDF8',
      bgGradient: 'from-sky-500/15 via-sky-500/5 to-transparent',
      borderColor: 'border-sky-500/30'
    },
    {
      id: 'fraud_saved',
      IconComponent: LuxuryFraudShieldIcon,
      stat: isEn ? '฿18,500/mo' : '฿18,500 /เดือน',
      title: isEn ? 'Cash Leakage & Fraud Prevented' : 'ป้องกันเงินรั่วไหล & ทุจริต',
      sub: isEn
        ? 'Instant alerts for bill voids after cash payment and unauthorized drawer opens.'
        : 'ตรวจจับบิลยกเลิกหลังรับเงินสดและเปิดลิ้นชักผิดปกติ แจ้งเตือนเข้ามือถือทันที',
      accentColor: '#F43F5E',
      bgGradient: 'from-rose-500/15 via-rose-500/5 to-transparent',
      borderColor: 'border-rose-500/30'
    },
    {
      id: 'dead_stock',
      IconComponent: LuxuryTurnoverBoxIcon,
      stat: isEn ? '3.4x Faster' : '3.4 เท่า',
      title: isEn ? 'Faster Inventory Turnover' : 'หมุนเวียนสต็อกไวขึ้น',
      sub: isEn
        ? 'Detects slow-moving items early and triggers automated Flash Sale discount campaigns.'
        : 'ตรวจจับของค้างสต็อกล่วงหน้า พร้อมคำนวณราคา Flash Sale ระบายของทันเวลาก่อนขาดทุน',
      accentColor: '#FBBF24',
      bgGradient: 'from-amber-500/15 via-amber-500/5 to-transparent',
      borderColor: 'border-amber-500/30'
    },
    {
      id: 'basket_size',
      IconComponent: LuxuryBasketGrowthIcon,
      stat: isEn ? '+22% Sales' : '+22% ยอดบิล',
      title: isEn ? 'Higher Basket Size per Order' : 'ยอดซื้อต่อบิลเพิ่มขึ้น',
      sub: isEn
        ? 'AI Market Basket analysis suggests high-margin A+B combos that customers actually buy.'
        : 'วิเคราะห์บิลอัตโนมัติ แนะนำจัดคู่สินค้า A+B ยอดนิยม ดันยอดต่อบิลโตต่อเนื่อง',
      accentColor: '#10B981',
      bgGradient: 'from-emerald-500/15 via-emerald-500/5 to-transparent',
      borderColor: 'border-emerald-500/30'
    }
  ];

  // Enterprise Security & Privacy Pillars with Bespoke Luxury Icons
  const securityPillars = [
    {
      IconComponent: LuxuryPrivateTenantIcon,
      badge: isEn ? '100% PRIVATE TENANT' : 'ข้อมูลส่วนตัว 100%',
      title: isEn ? 'Zero Public AI Training' : 'ไม่นำข้อมูลไปเทรน AI สาธารณะ',
      desc: isEn
        ? 'Your sales, profit margins, and customer data are processed in an isolated private environment. Never used to train public LLM models.'
        : 'ข้อมูลยอดขาย ต้นทุน และลูกค้าของร้านคุณ จะถูกประมวลผลในระบบส่วนตัว (Isolated Tenant) เท่านั้น จะไม่มีการนำไปเทรนโมเดล AI สาธารณะเด็ดขาด',
      badgeColor: 'text-amber-400 bg-amber-400/10 border-amber-400/30'
    },
    {
      IconComponent: LuxuryBankLockIcon,
      badge: isEn ? 'BANK-GRADE ENCRYPTION' : 'เข้ารหัสระดับธนาคาร',
      title: isEn ? 'AES-256 & TLS 1.3 Security' : 'การเข้ารหัสระดับสถาบันการเงิน',
      desc: isEn
        ? 'Financial-grade end-to-end encryption protects your receipts, cashier records, and cloud backups both in transit and at rest.'
        : 'ปกป้องตัวเลขยอดขาย ประวัติการเงิน และข้อมูลสต็อกด้วยการเข้ารหัสขั้นสูงสุด AES-256 ทั้งระหว่างส่งผ่านอินเทอร์เน็ตและในฐานข้อมูล',
      badgeColor: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/30'
    },
    {
      IconComponent: LuxuryConfidentialShieldIcon,
      badge: isEn ? 'OWNER CONTROL ONLY' : 'สิทธิ์ขาดของเจ้าของร้าน',
      title: isEn ? '100% Data Confidentiality' : 'ความลับธุรกิจของท่าน 100%',
      desc: isEn
        ? 'Your business numbers remain strictly confidential. InsightFlow will never share, monetize, or disclose your metrics to any third party or competitors.'
        : 'ตัวเลขธุรกิจของท่านเป็นความลับสูงสุด เราไม่มีนโยบายส่งต่อ ขาย หรือเปิดเผยข้อมูลให้บุคคลภายนอกหรือคู่แข่งโดยเด็ดขาด',
      badgeColor: 'text-sky-400 bg-sky-400/10 border-sky-500/30'
    },
    {
      IconComponent: LuxuryDataOwnershipIcon,
      badge: isEn ? 'FULL OWNERSHIP' : 'กรรมสิทธิ์สมบูรณ์',
      title: isEn ? 'Instant Export & Right to Delete' : 'ส่งออกและสั่งลบข้อมูลได้ทุกเมื่อ',
      desc: isEn
        ? 'Download full spreadsheets to Excel/CSV anytime. You retain complete right to permanently wipe your entire store database in 1 click.'
        : 'เจ้าของร้านสามารถดาวน์โหลดข้อมูลทั้งหมดกลับเป็น Excel/CSV ได้ตลอด 24 ชม. และมีสิทธิ์กดลบข้อมูลทั้งหมดออกจากระบบได้ทันทีทุกเมื่อ',
      badgeColor: 'text-purple-400 bg-purple-400/10 border-purple-400/30'
    }
  ];

  return (
    <section className="py-12 sm:py-20 border-t border-white/10 relative overflow-hidden" id="proof-and-trust">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-amber-500/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[300px] bg-sky-500/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-[1550px] mx-auto px-4 sm:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400/15 via-yellow-400/10 to-amber-400/15 text-amber-400 text-xs font-black px-4 py-1.5 rounded-full mb-3.5 border border-amber-400/30 shadow-[0_0_20px_rgba(251,191,36,0.15)]">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>{isEn ? 'PROOF & TRUST FOR BUSINESS OWNERS' : 'ความน่าเชื่อถือและการลดความกังวลสำหรับเจ้าของ SME'}</span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-4 leading-tight">
            <span>{isEn ? 'Zero Fear of Complexity.' : 'หมดกังวลเรื่อง "ใช้ไม่เป็น"'}</span>{' '}
            <span className="bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500 bg-clip-text text-transparent">
              {isEn ? '100% Private & Enterprise-Safe.' : 'และ "ข้อมูลรั่วไหล" เต็มร้อย'}
            </span>
          </h2>
          <p className="text-slate-300 text-sm sm:text-base lg:text-lg leading-relaxed">
            {isEn
              ? 'Designed for real shop owners who want instant results without complex setups. See your actual screen preview, verify proven business impact, and rely on bank-grade security.'
              : 'ออกแบบมาเพื่อเจ้าของร้านตัวจริง ไม่ต้องนั่งเรียนรู้ระบบซับซ้อน สัมผัสหน้าจอจริงใน 30 วินาที ดูผลลัพธ์ที่ประหยัดเวลาได้จริง พร้อมการคุ้มครองข้อมูลธุรกิจระดับสถาบันการเงิน'}
          </p>
        </div>

        {/* PART 1: SOCIAL PROOF IMPACT METRICS (4 CARDS) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-14 sm:mb-20">
          {impactMetrics.map(item => {
            const isPicked = activeMetricId === item.id;
            const isSparkling = metricSparkle === item.id;
            return (
              <div
                key={item.id}
                onClick={() => handleMetricClick(item.id)}
                className={`relative p-6 rounded-3xl bg-[#0b1120]/90 border transition-all duration-300 group tactile-cute-card ${
                  isPicked
                    ? 'border-amber-400 ring-2 ring-amber-400/50 shadow-[0_16px_40px_rgba(251,191,36,0.3)] bg-gradient-to-b from-amber-500/20 via-amber-500/5 to-transparent cute-jelly-active'
                    : `${item.borderColor} bg-gradient-to-b ${item.bgGradient} shadow-xl hover:border-amber-400/40`
                }`}
              >
                {/* Cute Floating Sparkle Burst on Tap */}
                {isSparkling && (
                  <div className="absolute -top-3 right-4 z-20 cute-sparkle-float flex items-center gap-1 bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-950 font-black text-[11px] px-3 py-1 rounded-full shadow-xl">
                    <span className="animate-spin">✨</span>
                    <span>{isEn ? 'Verified Impact!' : 'พิสูจน์แล้ว! 💖'}</span>
                  </div>
                )}

                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`p-2.5 rounded-2xl bg-white/5 border border-white/10 transition-all duration-300 flex items-center justify-center ${
                      isPicked ? 'scale-110 border-amber-400/60 bg-amber-400/10' : 'group-hover:scale-110'
                    }`}
                  >
                    <item.IconComponent size={34} />
                  </div>
                  <span
                    className="text-2xl sm:text-3xl font-black tracking-tight"
                    style={{ color: item.accentColor }}
                  >
                    {item.stat}
                  </span>
                </div>
                <h3 className="text-base sm:text-lg font-black text-white mb-2 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {item.sub}
                </p>

                {/* Cute Interactive Verification Tag */}
                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[11px]">
                  <span className={`font-bold transition-colors ${isPicked ? 'text-amber-300' : 'text-slate-400'}`}>
                    {isPicked
                      ? (isEn ? '✨ Verified in 450+ Shops' : '✨ สถิติจริงจาก 450+ ร้านค้า')
                      : (isEn ? 'Tap to inspect' : 'แตะเพื่อดูสถิติ')}
                  </span>
                  <span className="text-sm transition-transform duration-300">
                    {isPicked ? '💖' : '👉'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* PART 2: LIVE INTERACTIVE PREVIEW (30-SECOND REAL EXPERIENCE) */}
        <div className="bg-[#070c18] border border-amber-400/30 rounded-3xl sm:rounded-[36px] p-5 sm:p-8 lg:p-10 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] mb-14 sm:mb-20">
          
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8 pb-6 border-b border-white/10">
            <div>
              <div className="flex items-center gap-2 text-xs font-black text-amber-400 uppercase tracking-widest mb-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>{isEn ? '30-SECOND LIVE SCREEN PREVIEW' : 'ทดลองสัมผัสหน้าจอจริงใน 30 วินาที'}</span>
              </div>
              <h3 className="text-xl sm:text-3xl font-black text-white">
                {isEn ? 'Choose How You Want to Run Your Store' : 'เลือกรูปแบบหน้าจอที่คุณต้องการใช้งาน'}
              </h3>
            </div>

            {/* View Selector Tabs with Ultra-Luxurious Web Dashboard Icon */}
            <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-[#050814] border border-white/15">
              
              {/* Tab 1: LINE Summary */}
              <button
                type="button"
                onClick={() => setActiveTab('line_card')}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl font-black text-xs sm:text-sm transition-all duration-300 cursor-pointer active:scale-95 active:rotate-1 ${
                  activeTab === 'line_card'
                    ? 'bg-gradient-to-r from-emerald-500 to-green-500 text-slate-950 shadow-[0_6px_20px_rgba(16,185,129,0.45)] scale-105 cute-jelly-active'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="text-base">📱</span>
                <span>{isEn ? 'LINE Daily Card' : 'การ์ดสรุปผ่าน LINE'}</span>
              </button>

              {/* Tab 2: Web Dashboard with the LUXURIOUS MODERN ICON requested */}
              <button
                type="button"
                onClick={() => setActiveTab('web_dashboard')}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl font-black text-xs sm:text-sm transition-all duration-300 cursor-pointer active:scale-95 active:rotate-1 ${
                  activeTab === 'web_dashboard'
                    ? 'bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-500 text-slate-950 shadow-[0_6px_25px_rgba(251,191,36,0.55)] scale-105 cute-jelly-active'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {/* Ultra-Luxurious Modern Dashboard Icon */}
                <LuxuryDashboardIcon size={22} />
                <span>{isEn ? 'Web Dashboard (Live)' : 'มุมมอง Web Dashboard จริง'}</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-950/20 font-black">
                  PRO
                </span>
              </button>

              {/* Tab 3: Actionable Playbook */}
              <button
                type="button"
                onClick={() => setActiveTab('action_playbook')}
                className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl font-black text-xs sm:text-sm transition-all duration-300 cursor-pointer active:scale-95 active:rotate-1 ${
                  activeTab === 'action_playbook'
                    ? 'bg-gradient-to-r from-sky-400 to-cyan-400 text-slate-950 shadow-[0_6px_20px_rgba(56,189,248,0.45)] scale-105 cute-jelly-active'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="text-base">⚡</span>
                <span>{isEn ? '1-Click Playbook' : 'ระบบสั่งการ 1-Click'}</span>
              </button>
            </div>
          </div>

          {/* TAB CONTENT 1: LINE DAILY PROFIT SUMMARY CARD */}
          {activeTab === 'line_card' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center animate-fadeIn">
              {/* Phone Mockup Frame */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="w-full max-w-[340px] rounded-[36px] bg-[#0c1322] border-[3px] border-emerald-400/40 p-3 shadow-[0_20px_50px_rgba(16,185,129,0.25)]">
                  {/* Phone Speaker & Notch */}
                  <div className="w-24 h-4 bg-slate-900 rounded-full mx-auto mb-3 flex items-center justify-center">
                    <div className="w-3 h-1 bg-slate-700 rounded-full" />
                  </div>

                  {/* LINE Chat Header */}
                  <div className="bg-[#1e2b40] rounded-2xl p-3 mb-3 flex items-center gap-3 border border-white/10">
                    <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white font-black text-lg shadow-md">
                      IF
                    </div>
                    <div>
                      <div className="text-xs font-black text-white flex items-center gap-1.5">
                        <span>InsightFlow Assistant</span>
                        <span className="text-[10px] bg-emerald-400/20 text-emerald-300 px-1.5 py-0.2 rounded font-bold">✓ Official</span>
                      </div>
                      <div className="text-[11px] text-emerald-400 font-semibold">ส่งรายงานอัตโนมัติ 22:00 น.</div>
                    </div>
                  </div>

                  {/* LINE Message Bubble Card */}
                  <div className="bg-[#070b16] border border-emerald-400/30 rounded-2xl p-4 text-xs space-y-3 shadow-lg">
                    <div className="flex items-center justify-between border-b border-white/10 pb-2">
                      <span className="font-black text-white text-sm">📊 สรุปยอดขายวันนี้</span>
                      <span className="text-slate-400 font-mono text-[10px]">22:00 น.</span>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center text-slate-300">
                        <span>ยอดขายรวม (142 บิล)</span>
                        <span className="font-bold text-white text-sm">฿48,920</span>
                      </div>
                      <div className="flex justify-between items-center text-emerald-400 font-bold">
                        <span>กำไรแท้จริง (หักต้นทุนแฝง)</span>
                        <span className="text-sm font-black">฿18,450 (37.7%)</span>
                      </div>
                      <div className="flex justify-between items-center text-slate-300">
                        <span>เทียบกับสัปดาห์ก่อน</span>
                        <span className="text-emerald-400 font-bold">+18.4% 🚀</span>
                      </div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-amber-400/10 border border-amber-400/25 text-amber-200">
                      <div className="font-black mb-1">⭐ สินค้าขายดีประจำวัน:</div>
                      <div>• เซรั่มทองคำ 30 มล. (38 ชิ้น)</div>
                      <div>• ชุดกิฟต์เซ็ตพรีเมียม (14 ชุด)</div>
                    </div>

                    <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/25 text-rose-300">
                      <div className="font-black mb-1">🚨 สินค้าใกล้หมดสต็อก:</div>
                      <div>• ครีมกันแดด SPF50 (เหลือ 4 ชิ้น ต้องสั่งเพิ่ม)</div>
                    </div>

                    <button
                      type="button"
                      onClick={onOpenLogin}
                      className="w-full py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs transition cursor-pointer text-center"
                    >
                      แตะเพื่อดูรายงานฉบับเต็ม →
                    </button>
                  </div>
                </div>
              </div>

              {/* Explanatory Details */}
              <div className="lg:col-span-7 space-y-5">
                <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 text-xs font-black px-3 py-1 rounded-full border border-emerald-500/20">
                  <span>📱 ไม่ต้องเปิดคอมพิวเตอร์ • ไม่ต้องติดตั้งโปรแกรม</span>
                </div>
                <h4 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                  {isEn
                    ? 'Get Clean Daily Profit Summaries Delivered Directly to Your LINE'
                    : 'รับสรุปผลกำไรและสินค้าขายดี ส่งตรงเข้า LINE ทุกเย็น 22:00 น.'}
                </h4>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  {isEn
                    ? 'After closing your store, InsightFlow automatically pulls sales from your POS, subtracts COGS and hidden fees, and sends a crisp 1-card profit summary to your phone. Check your business in 30 seconds before sleep.'
                    : 'หลังปิดร้าน ไม่ต้องนั่งกดเครื่องคิดเลขหรือคีย์ Excel อีกต่อไป ระบบดึงข้อมูลยอดขายหน้าร้าน คำนวณต้นทุนแฝง กำไรสุทธิแท้จริง และเตือนของใกล้หมด ส่งเป็นสรุปการ์ดเดียวเข้า LINE ของคุณทันที อ่านจบใน 30 วินาทีก่อนนอน'}
                </p>

                <div className="space-y-2.5 pt-2">
                  {[
                    isEn ? 'Automatic 22:00 PM nightly closing report' : 'สรุปยอดและกำไรสุทธิอัตโนมัติทุกคืน 22:00 น.',
                    isEn ? 'Instant alerts for suspicious cashier bill cancellations' : 'แจ้งเตือนทันทีเมื่อมีการกดยกเลิกบิลหรือเปิดลิ้นชักผิดปกติ',
                    isEn ? 'Low-stock countdown so you never miss sales' : 'นับถอยหลังสต็อกของขายดี เตือนก่อนของหมด 4-5 วัน'
                  ].map((text, idx) => (
                    <div key={idx} className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-slate-200">
                      <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-black">
                        ✓
                      </span>
                      <span>{text}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4">
                  <button
                    type="button"
                    onClick={onOpenLogin}
                    className="px-6 py-3.5 bg-gradient-to-r from-emerald-400 to-green-500 text-slate-950 font-black rounded-2xl text-sm shadow-xl hover:scale-105 transition cursor-pointer"
                  >
                    {isEn ? 'Test LINE Summary with Your Store →' : 'ทดลองรับสรุปผ่าน LINE สำหรับร้านคุณ →'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB CONTENT 2: WEB DASHBOARD VIEW (FEATURING THE LUXURIOUS MODERN ICON) */}
          {activeTab === 'web_dashboard' && (
            <div className="space-y-6 animate-fadeIn">
              {/* Top Banner introducing the Luxurious Modern Console */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-[#091122] border border-amber-400/30">
                <div className="flex items-center gap-3.5">
                  <div className="p-2.5 rounded-2xl bg-gradient-to-br from-amber-400/20 to-amber-600/10 border border-amber-400/40 shadow-[0_0_20px_rgba(251,191,36,0.3)]">
                    <LuxuryDashboardIcon size={34} />
                  </div>
                  <div>
                    <h4 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                      <span>{isEn ? 'InsightFlow Executive Store Console' : 'แผงควบคุมร้านค้าอัจฉริยะ (Web Executive Console)'}</span>
                      <span className="text-[10px] bg-amber-400 text-slate-950 px-2 py-0.5 rounded-md font-black">
                        LIVE DEMO
                      </span>
                    </h4>
                    <p className="text-xs text-slate-300">
                      {isEn
                        ? 'Crystal-clear typography, high-contrast metrics, designed for effortless daily decision making.'
                        : 'ออกแบบด้วยฟอนต์ขนาดใหญ่ คมชัด สบายตา เข้าใจง่ายใน 5 วินาที แม้ไม่เก่งเทคโนโลยี'}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onOpenLogin}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-300 text-slate-950 font-black text-xs shadow-lg hover:scale-105 transition cursor-pointer whitespace-nowrap"
                >
                  {isEn ? 'Open Full Interactive Screen →' : 'คลิกเพื่อลองกดหน้าจอจริง →'}
                </button>
              </div>

              {/* Realistic Desktop Mockup Screen */}
              <div className="rounded-2xl sm:rounded-3xl bg-[#050814] border border-white/15 p-4 sm:p-6 shadow-2xl">
                {/* Console Top Window Bar */}
                <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/10">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <span className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    <span className="text-xs font-mono text-slate-400 ml-2">app.insightflow.internal / executive_overview</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>ซิงก์ข้อมูล POS + Google Sheet ล่าสุด: 99.4% ความแม่นยำ</span>
                  </div>
                </div>

                {/* Metric Summary Strip (3 Tiles) */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {/* Tile 1: Revenue vs Net Profit */}
                  <div className="p-4 rounded-2xl bg-[#0c1426] border border-amber-400/20">
                    <div className="text-xs text-slate-400 font-bold mb-1">ยอดขายเดือนนี้ (Revenue)</div>
                    <div className="text-2xl font-black text-white">฿1,845,000</div>
                    <div className="mt-2 pt-2 border-t border-white/10 flex justify-between items-center text-xs">
                      <span className="text-emerald-400 font-bold">กำไรสุทธิแท้จริง (หักแฝง):</span>
                      <span className="text-amber-300 font-black">฿682,650 (37%)</span>
                    </div>
                  </div>

                  {/* Tile 2: Target Goal Decomposition */}
                  <div className="p-4 rounded-2xl bg-[#0c1426] border border-white/10">
                    <div className="text-xs text-slate-400 font-bold mb-1">เป้าหมายประจำเดือน (89.2% สำเร็จ)</div>
                    <div className="text-2xl font-black text-amber-400">ขาดอีก ฿155,000</div>
                    <div className="mt-2 pt-2 border-t border-white/10 flex justify-between items-center text-xs text-slate-300">
                      <span>ภารกิจวันนี้:</span>
                      <span className="font-bold text-emerald-400">38 บิล • เฉลี่ย ฿345/บิล</span>
                    </div>
                  </div>

                  {/* Tile 3: Cash Runway & Stock Health */}
                  <div className="p-4 rounded-2xl bg-[#0c1426] border border-white/10">
                    <div className="text-xs text-slate-400 font-bold mb-1">กระแสเงินสดหมุนเวียน (Cash Runway)</div>
                    <div className="text-2xl font-black text-sky-400">42 วันปลอดภัย</div>
                    <div className="mt-2 pt-2 border-t border-white/10 flex justify-between items-center text-xs text-slate-300">
                      <span>สินค้าหมุนเวียนช้า:</span>
                      <span className="font-bold text-rose-400">3 รายการต้องระบาย</span>
                    </div>
                  </div>
                </div>

                {/* Mini Realistic Inventory & Best-Seller Table */}
                <div className="rounded-xl overflow-hidden border border-white/10 bg-[#080d1a]">
                  <div className="px-4 py-3 bg-[#0d1628] border-b border-white/10 flex justify-between items-center">
                    <span className="text-xs font-black text-white">📦 รายการสินค้าขายดี & สต็อกที่ต้องสั่งซื้อวันนี้</span>
                    <span className="text-xs text-slate-400">อัปเดตอัตโนมัติ</span>
                  </div>
                  <div className="divide-y divide-white/5 text-xs">
                    {[
                      { name: 'เซรั่มทองคำบริสุทธิ์ 30 มล.', sales: '420 ชิ้น (ขายดี #1)', margin: '48% กำไร', stock: 'เหลือ 18 ชิ้น (พอขาย 4 วัน)', action: '📦 แนะนำสั่งเพิ่ม 100 ชิ้น' },
                      { name: 'ชุดของขวัญพรีเมียมลิมิเต็ด', sales: '142 ชุด (+65% โต)', margin: '52% กำไร', stock: 'เหลือ 28 ชุด (พอขาย 8 วัน)', action: '✨ พร้อมขาย' },
                      { name: 'ครีมบำรุงผิวกายสูตรเข้มข้น', sales: '8 ชิ้น (ยอดชะลอตัว)', margin: '34% กำไร', stock: 'เหลือ 140 ชิ้น (ค้าง >60 วัน)', action: '⚡ แนะนำทำ Flash Sale -20%' }
                    ].map((row, rIdx) => (
                      <div key={rIdx} className="px-4 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 hover:bg-white/5 transition">
                        <div>
                          <div className="font-bold text-white text-sm">{row.name}</div>
                          <div className="text-slate-400 text-[11px]">{row.sales} • <span className="text-emerald-400 font-semibold">{row.margin}</span></div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-slate-300 font-mono text-[11px]">{row.stock}</span>
                          <span className="px-2.5 py-1 rounded-lg bg-amber-400/10 text-amber-300 border border-amber-400/30 text-[11px] font-bold">
                            {row.action}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB CONTENT 3: 1-CLICK ACTION PLAYBOOK */}
          {activeTab === 'action_playbook' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 animate-fadeIn">
              {/* Playbook 1: Market Basket A+B */}
              <div className="p-6 rounded-3xl bg-[#0b1222] border border-amber-400/30 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full bg-amber-400/10 text-amber-300 border border-amber-400/30 text-xs font-black">
                      จับคู่สินค้าอัตโนมัติ (Market Basket)
                    </span>
                    <span className="text-amber-400 font-black text-sm">68% ซื้อคู่กัน</span>
                  </div>
                  <h4 className="text-lg font-black text-white mb-2">จัดโปรโมชันคู่: เซรั่ม + ครีมกันแดด</h4>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    ระบบตรวจพบบิลกว่า 68% ลูกค้าซื้อสินค้าคู่นี้พร้อมกัน แนะนำจัดชุดลด 10% เพื่อเพิ่มยอดต่อบิล (Basket Size) ทันที
                  </p>
                  <div className="p-3 rounded-xl bg-[#060a14] border border-white/10 text-xs text-emerald-400 font-semibold mb-4">
                    💡 ผลลัพธ์คาดการณ์: ยอดซื้อต่อบิลเพิ่มขึ้น +฿180 / บิล
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onOpenLogin}
                  className="w-full py-3 bg-gradient-to-r from-amber-400 to-amber-300 text-slate-950 font-black rounded-xl text-xs hover:scale-105 transition cursor-pointer"
                >
                  🚀 คลิกเดียว: สร้างโปรโมชันชุดคู่ A+B ทันที
                </button>
              </div>

              {/* Playbook 2: Dead Stock Flash Sale */}
              <div className="p-6 rounded-3xl bg-[#0b1222] border border-rose-500/30 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/30 text-xs font-black">
                      ระบายสินค้าจมทุน (Dead Stock)
                    </span>
                    <span className="text-rose-400 font-black text-sm">ค้างเกิน 60 วัน</span>
                  </div>
                  <h4 className="text-lg font-black text-white mb-2">Flash Sale คืนเงินสด ฿42,000</h4>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    ตรวจพบสินค้าค้างสต็อก 3 รายการ (มูลค่าจมทุน ฿42,000) แนะนำลด 20% เพื่อดึงเงินสดกลับมาก่อนสินค้าหมดอายุ
                  </p>
                  <div className="p-3 rounded-xl bg-[#060a14] border border-white/10 text-xs text-amber-300 font-semibold mb-4">
                    {simulatedFlashSaleActive ? '✅ ส่งสถานะ Flash Sale เรียบร้อยแล้ว!' : '⚡ ระบบคำนวณจุดคุ้มทุนให้แล้ว: ไม่เข้าเนื้อแน่นอน'}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setSimulatedFlashSaleActive(!simulatedFlashSaleActive)}
                  className="w-full py-3 bg-gradient-to-r from-rose-500 to-amber-500 text-white font-black rounded-xl text-xs hover:scale-105 transition cursor-pointer"
                >
                  {simulatedFlashSaleActive ? '✓ เปิดใช้งาน Flash Sale แล้ว (กดเพื่อรีเซ็ต)' : '⚡ 1-Click: เปิด Flash Sale ระบายของทันที'}
                </button>
              </div>

              {/* Playbook 3: Smart Restock */}
              <div className="p-6 rounded-3xl bg-[#0b1222] border border-sky-500/30 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 rounded-full bg-sky-500/10 text-sky-300 border border-sky-500/30 text-xs font-black">
                      จุดสั่งซื้อแม่นยำ (Smart Restock)
                    </span>
                    <span className="text-sky-400 font-black text-sm">หมดใน 4 วัน</span>
                  </div>
                  <h4 className="text-lg font-black text-white mb-2">สั่งซื้อเซรั่มทองคำเพิ่ม 100 ชิ้น</h4>
                  <p className="text-xs text-slate-300 leading-relaxed mb-4">
                    คำนวณจากยอดขายจริง (Run-rate 8 ชิ้น/วัน) + ระยะเวลารอของจากซัพพลายเออร์ 2 วัน ต้องสั่งวันนี้เพื่อไม่ให้ของขาด
                  </p>
                  <div className="p-3 rounded-xl bg-[#060a14] border border-white/10 text-xs text-sky-300 font-semibold mb-4">
                    📦 ป้องกันการเสียโอกาสยอดขาย: ฿38,000
                  </div>
                </div>

                <button
                  type="button"
                  onClick={onOpenLogin}
                  className="w-full py-3 bg-gradient-to-r from-sky-400 to-cyan-300 text-slate-950 font-black rounded-xl text-xs hover:scale-105 transition cursor-pointer"
                >
                  📦 1-Click: ออกใบสั่งซื้อ PO ถึงซัพพลายเออร์
                </button>
              </div>
            </div>
          )}
        </div>

        {/* PART 3: DATA SECURITY & PRIVACY GUARANTEE (4 ENTERPRISE PILLARS) */}
        <div className="bg-[#0b1120]/80 border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl">
          <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12">
            <div className="inline-flex items-center gap-2 bg-emerald-500/10 text-emerald-400 text-xs font-black px-3.5 py-1.5 rounded-full mb-3 border border-emerald-500/20">
              <span>🛡️ ข้อมูลร้านค้าของคุณ ปลอดภัย 100% ไม่มีวันรั่วไหล</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-2">
              {isEn ? 'Enterprise Data Security & Privacy Guarantee' : 'คำมั่นสัญญาด้านความปลอดภัยและความเป็นส่วนตัวของข้อมูล'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-300">
              {isEn
                ? 'We treat your business numbers with institutional-grade banking protocols. You maintain absolute ownership at all times.'
                : 'เราปกป้องตัวเลขยอดขาย ฐานข้อมูลลูกค้า และสต็อกของท่านด้วยมาตรฐานความปลอดภัยระดับธนาคาร เจ้าของร้านถือสิทธิ์ขาดแต่เพียงผู้เดียว'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {securityPillars.map((p, pIdx) => {
              const isSelected = activeSecurityIdx === pIdx;
              const isSparkling = securitySparkle === pIdx;
              return (
                <div
                  key={pIdx}
                  onClick={() => handleSecurityClick(pIdx)}
                  className={`relative p-5 rounded-2xl bg-[#070b16] border transition-all duration-300 flex flex-col justify-between tactile-cute-card ${
                    isSelected
                      ? 'border-emerald-400 ring-2 ring-emerald-400/50 shadow-[0_16px_40px_rgba(16,185,129,0.3)] bg-gradient-to-b from-emerald-500/15 via-emerald-500/5 to-transparent cute-jelly-active'
                      : 'border-white/10 hover:border-emerald-400/40 shadow-lg'
                  }`}
                >
                  {/* Cute Floating Security Badge on Tap */}
                  {isSparkling && (
                    <div className="absolute -top-3 right-4 z-20 cute-sparkle-float flex items-center gap-1 bg-gradient-to-r from-emerald-400 to-teal-300 text-slate-950 font-black text-[11px] px-3 py-1 rounded-full shadow-xl">
                      <span className="animate-spin">🛡️</span>
                      <span>{isEn ? '100% Safe!' : 'ปลอดภัย 100%! ✨'}</span>
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div
                        className={`p-2 rounded-xl bg-white/5 border border-white/10 transition-all duration-300 flex items-center justify-center ${
                          isSelected ? 'scale-110 border-emerald-400/60 bg-emerald-400/10' : 'group-hover:scale-105'
                        }`}
                      >
                        <p.IconComponent size={32} />
                      </div>
                      <span className={`text-[10px] font-black px-2 py-0.5 rounded-md border ${p.badgeColor}`}>
                        {p.badge}
                      </span>
                    </div>
                    <h4 className="text-base font-black text-white mb-2 leading-snug">{p.title}</h4>
                    <p className="text-xs text-slate-300 leading-relaxed mb-4">{p.desc}</p>
                  </div>
                  <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] font-bold text-emerald-400">
                    <span className="flex items-center gap-1.5">
                      <span>✓</span>
                      <span>{isSelected ? (isEn ? 'Verified Safe 100%' : 'คุ้มครองระดับสูงสุด') : (isEn ? 'Bank Protocol' : 'รับประกันความคุ้มครอง 100%')}</span>
                    </span>
                    <span>{isSelected ? '🔒' : '🛡️'}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}

