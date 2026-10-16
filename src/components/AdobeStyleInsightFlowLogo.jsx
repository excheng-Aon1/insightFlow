// ==============================================================================
// File: src/components/AdobeStyleInsightFlowLogo.jsx
// Description: โลโก้สไตล์ตัวย่อ 2 ตัวอักษร (เหมือนตระกูล Adobe Ps, Ai, Lr, Pr, Ae)
//              แต่รังสรรค์ด้วยอัตลักษณ์ความหรูหราเฉพาะตัวของ InsightFlow:
//              - ทรงสี่เหลี่ยมโค้งมน Squircle ขอบทองคำ 24K และขอบแซฟไฟร์เรืองแสง
//              - พื้นหลัง Obsidian & Royal Navy กระจก Glassmorphism 3 มิติ
//              - ตัวอักษรหลัก "If" (InsightFlow) ตัดขอบคมกริบ พร้อมประกายดาวทองคำ
// ==============================================================================

import React from 'react';

/**
 * 1. Adobe-Style InsightFlow Mnemonic Logo Badge ("If")
 * รองรับตัวย่อโมดูลต่างๆ เช่น If (InsightFlow), Ai (Actionable AI), Db (Database), 
 * Iv (Inventory), Po (Point of Sale), Cr (Customer CRM)
 */
export function InsightFlowMnemonicLogo({
  size = 48,
  letters = 'If',
  variant = 'gold', // 'gold' | 'ai' | 'db' | 'inventory' | 'pos' | 'crm'
  className = '',
  showSparkle = true,
  onClick
}) {
  const rawId = React.useId();
  const uid = rawId.replace(/:/g, '');

  const themes = {
    gold: {
      rim: 'linear-gradient(135deg, #FEF08A 0%, #F59E0B 32%, #38BDF8 68%, #FBBF24 100%)',
      shadow: '0 10px 28px -6px rgba(245, 158, 11, 0.55), 0 0 18px rgba(56, 189, 248, 0.35)',
      core: 'radial-gradient(circle at 28% 22%, #1E293B 0%, #070C1E 60%, #02040A 100%)',
      letterGradStart: '#FFFBEB',
      letterGradMid: '#FDE047',
      letterGradEnd: '#F59E0B',
      accentColor: '#38BDF8',
      haloColor: 'rgba(251, 191, 36, 0.45)',
      sparkleColor: '#FEF08A'
    },
    ai: {
      rim: 'linear-gradient(135deg, #E9D5FF 0%, #A855F7 35%, #38BDF8 70%, #C084FC 100%)',
      shadow: '0 10px 28px -6px rgba(168, 85, 247, 0.55), 0 0 18px rgba(56, 189, 248, 0.35)',
      core: 'radial-gradient(circle at 28% 22%, #2E1065 0%, #09031C 60%, #02040A 100%)',
      letterGradStart: '#FAF5FF',
      letterGradMid: '#C084FC',
      letterGradEnd: '#9333EA',
      accentColor: '#38BDF8',
      haloColor: 'rgba(192, 132, 252, 0.45)',
      sparkleColor: '#F3E8FF'
    },
    db: {
      rim: 'linear-gradient(135deg, #D1FAE5 0%, #10B981 35%, #FBBF24 70%, #059669 100%)',
      shadow: '0 10px 28px -6px rgba(16, 185, 129, 0.55), 0 0 18px rgba(251, 191, 36, 0.35)',
      core: 'radial-gradient(circle at 28% 22%, #064E3B 0%, #021C14 60%, #02040A 100%)',
      letterGradStart: '#ECFDF5',
      letterGradMid: '#34D399',
      letterGradEnd: '#059669',
      accentColor: '#FBBF24',
      haloColor: 'rgba(52, 211, 153, 0.45)',
      sparkleColor: '#FEF08A'
    },
    inventory: {
      rim: 'linear-gradient(135deg, #CCFBF1 0%, #14B8A6 35%, #38BDF8 70%, #0D9488 100%)',
      shadow: '0 10px 28px -6px rgba(20, 184, 166, 0.55), 0 0 18px rgba(56, 189, 248, 0.35)',
      core: 'radial-gradient(circle at 28% 22%, #134E4A 0%, #041F1D 60%, #02040A 100%)',
      letterGradStart: '#F0FDFA',
      letterGradMid: '#2DD4BF',
      letterGradEnd: '#0F766E',
      accentColor: '#38BDF8',
      haloColor: 'rgba(45, 212, 191, 0.45)',
      sparkleColor: '#CCFBF1'
    },
    pos: {
      rim: 'linear-gradient(135deg, #FFE4E6 0%, #F43F5E 35%, #FBBF24 70%, #BE123C 100%)',
      shadow: '0 10px 28px -6px rgba(244, 63, 94, 0.55), 0 0 18px rgba(251, 191, 36, 0.35)',
      core: 'radial-gradient(circle at 28% 22%, #4C0519 0%, #1A0208 60%, #02040A 100%)',
      letterGradStart: '#FFF1F2',
      letterGradMid: '#FB7185',
      letterGradEnd: '#E11D48',
      accentColor: '#FBBF24',
      haloColor: 'rgba(251, 113, 133, 0.45)',
      sparkleColor: '#FEF08A'
    },
    crm: {
      rim: 'linear-gradient(135deg, #FCE7F3 0%, #EC4899 35%, #818CF8 70%, #BE185D 100%)',
      shadow: '0 10px 28px -6px rgba(236, 72, 153, 0.55), 0 0 18px rgba(129, 140, 248, 0.35)',
      core: 'radial-gradient(circle at 28% 22%, #500724 0%, #1C030C 60%, #02040A 100%)',
      letterGradStart: '#FDF2F8',
      letterGradMid: '#F472B6',
      letterGradEnd: '#DB2777',
      accentColor: '#818CF8',
      haloColor: 'rgba(244, 114, 182, 0.45)',
      sparkleColor: '#FCE7F3'
    }
  };

  const currentTheme = themes[variant] || themes.gold;
  const radius = Math.round(size * 0.26);

  return (
    <div
      onClick={onClick}
      className={`relative inline-flex items-center justify-center select-none group transition-transform duration-200 ${className} ${
        onClick ? 'cursor-pointer hover:scale-105 active:scale-95' : ''
      }`}
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        padding: Math.max(1.5, Math.round(size * 0.045)),
        background: currentTheme.rim,
        boxShadow: currentTheme.shadow
      }}
      title={`InsightFlow Suite • ${letters}`}
    >
      {/* Inner Obsidian Crystal Well */}
      <div
        style={{
          width: '100%',
          height: '100%',
          borderRadius: Math.max(4, radius - 2),
          background: currentTheme.core,
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {/* Specular Curved Top Glass Highlight */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '6%',
            right: '6%',
            height: '44%',
            borderRadius: '0 0 999px 999px',
            background:
              'linear-gradient(180deg, rgba(255, 255, 255, 0.32) 0%, rgba(255, 255, 255, 0.05) 75%, rgba(255, 255, 255, 0) 100%)',
            pointerEvents: 'none'
          }}
        />

        {/* Ambient Radial Core Light Glow */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(circle at 65% 65%, ${currentTheme.haloColor} 0%, transparent 65%)`,
            pointerEvents: 'none'
          }}
        />

        {/* Subtle Background Geometric Micro-Grid & Horizon Line */}
        <svg
          viewBox="0 0 100 100"
          width="100%"
          height="100%"
          style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: 0.22 }}
        >
          <line x1="0" y1="72" x2="100" y2="72" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="3 3" />
          <line x1="28" y1="0" x2="28" y2="100" stroke="#FFFFFF" strokeWidth="0.8" strokeDasharray="2 4" />
          <line x1="72" y1="0" x2="72" y2="100" stroke="#FFFFFF" strokeWidth="0.8" strokeDasharray="2 4" />
          <circle cx="50" cy="50" r="38" fill="none" stroke="#FFFFFF" strokeWidth="0.8" strokeDasharray="4 6" />
        </svg>

        {/* Typography SVG for the 2-Letter Adobe-Style Mnemonic */}
        <svg
          viewBox="0 0 100 100"
          width="88%"
          height="88%"
          style={{
            overflow: 'visible',
            filter: 'drop-shadow(0 3px 6px rgba(0, 0, 0, 0.75))'
          }}
        >
          <defs>
            <linearGradient id={`mnLetterGrad_${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={currentTheme.letterGradStart} />
              <stop offset="50%" stopColor={currentTheme.letterGradMid} />
              <stop offset="100%" stopColor={currentTheme.letterGradEnd} />
            </linearGradient>

            <linearGradient id={`mnAccentGrad_${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="100%" stopColor={currentTheme.accentColor} />
            </linearGradient>

            <filter id={`mnGlow_${uid}`} x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="2.5" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Letterform rendering for "If" (InsightFlow) or custom 2-letter combos */}
          {letters === 'If' ? (
            <g transform="translate(6, 2)">
              {/* Capital Letter "I" (Architectural Crystal Column with Chamfered Serifs) */}
              {/* Top Serif */}
              <path
                d="M18 25 L34 25 L32 30 L20 30 Z"
                fill={`url(#mnLetterGrad_${uid})`}
              />
              {/* Main Stem */}
              <rect
                x="22"
                y="27"
                width="8.5"
                height="44"
                rx="1.5"
                fill={`url(#mnLetterGrad_${uid})`}
              />
              {/* Base Serif */}
              <path
                d="M18 73 L34 73 L32 68 L20 68 Z"
                fill={`url(#mnLetterGrad_${uid})`}
              />

              {/* Lowercase Letter "f" (Aerodynamic High-Speed Sweeping Flow) */}
              {/* Curved Stem with Hook */}
              <path
                d="M48 72 L55 72 L55 45 C55 35 60 27 70 27 C74 27 77 28 79 30 L79 36 C77 34 74 34 71 34 C64 34 62 39 62 45 L62 72 L48 72 Z"
                fill={`url(#mnLetterGrad_${uid})`}
              />
              {/* Sweeping Dynamic Crossbar piercing through */}
              <path
                d="M42 45 L76 45 C78 45 80 43 78 41 L74 41 L42 41 Z"
                fill={`url(#mnAccentGrad_${uid})`}
                filter={`url(#mnGlow_${uid})`}
              />
              {/* Forward Velocity Arrow Tip on the Crossbar */}
              <polygon points="76,45 82,43 76,41" fill={currentTheme.accentColor} />
            </g>
          ) : (
            /* Generic 2-letter fallback renderer using bold modern typography */
            <text
              x="50"
              y="68"
              textAnchor="middle"
              fill={`url(#mnLetterGrad_${uid})`}
              fontSize={letters.length === 1 ? '58' : letters.length === 2 ? '44' : '36'}
              fontWeight="900"
              fontFamily="Plus Jakarta Sans, Kanit, sans-serif"
              letterSpacing="-2px"
            >
              {letters}
            </text>
          )}

          {/* Floating 4-Point Golden Star Sparkle at Upper Right */}
          {showSparkle && (
            <g transform="translate(80, 18)">
              <polygon
                points="0,-8 2,-2 8,0 2,2 0,8 -2,2 -8,0 -2,-2"
                fill={currentTheme.sparkleColor}
                filter={`url(#mnGlow_${uid})`}
              />
              <circle cx="0" cy="0" r="1.5" fill="#FFFFFF" />
            </g>
          )}
        </svg>
      </div>
    </div>
  );
}

/**
 * 2. Complete "InsightFlow Executive Suite" Mnemonic Grid
 * เหมือนกับชุดแอป Adobe Creative Cloud (Ps, Ai, Lr, Pr, Ae)
 * แต่เป็นชุดแอปสำหรับผู้บริหารธุรกิจของ InsightFlow!
 */
export function InsightFlowSuiteGrid({ activeTab, onSelectTab, lang = 'th' }) {
  const isEn = lang === 'en';
  const tx = (th, en) => (isEn ? en : th);

  const suiteModules = [
    {
      letters: 'If',
      variant: 'gold',
      tabId: 'overview',
      nameTh: 'InsightFlow',
      nameEn: 'InsightFlow Core',
      descTh: 'ระบบแกนกลางภาพรวมผู้บริหาร',
      descEn: 'Executive Overview & Target Planning',
      adobeStyleCompare: 'เหมือน Ps (ตัวเรือธงหลัก)'
    },
    {
      letters: 'Ai',
      variant: 'ai',
      tabId: 'insights',
      nameTh: 'Actionable AI',
      nameEn: 'Actionable AI Suite',
      descTh: 'ปัญญาประดิษฐ์ Text-to-SQL & Copilot',
      descEn: 'Conversational Data Analyst & Forecast',
      adobeStyleCompare: 'เหมือน Ai (สมองกลอัจฉริยะ)'
    },
    {
      letters: 'Db',
      variant: 'db',
      tabId: 'database',
      nameTh: 'Data Warehouse',
      nameEn: 'Central Database & ETL',
      descTh: 'ท่อข้อมูลอัตโนมัติ & ธรรมาภิบาล RBAC',
      descEn: 'Automated Pipeline & PostgreSQL Pool',
      adobeStyleCompare: 'เหมือน Pr (ตัดต่อเตรียมข้อมูล)'
    },
    {
      letters: 'Iv',
      variant: 'inventory',
      tabId: 'inventory',
      nameTh: 'Inventory Suite',
      nameEn: 'Smart Inventory & Stock',
      descTh: 'คลังสินค้าอัจฉริยะ & เช็คของใกล้หมด',
      descEn: 'SKU Reordering & Stock Turnover',
      adobeStyleCompare: 'เหมือน Lr (จัดระเบียบคลัง)'
    },
    {
      letters: 'Po',
      variant: 'pos',
      tabId: 'staff_pos',
      nameTh: 'POS Terminal Audit',
      nameEn: 'Staff & Cashier POS Audit',
      descTh: 'ตรวจสอบจุดขาย & ตรวจจับทุจริตบิล',
      descEn: 'Cashier Fraud Audit & Basket Size',
      adobeStyleCompare: 'เหมือน Ae (ตรวจจับการเคลื่อนไหว)'
    },
    {
      letters: 'Cr',
      variant: 'crm',
      tabId: 'customers',
      nameTh: 'Customer CRM',
      nameEn: 'VIP Retention & CRM',
      descTh: 'วิเคราะห์ลูกค้าชั้นดี & คนหาย',
      descEn: 'RFM Segmentation & Repeat Purchase',
      adobeStyleCompare: 'เหมือน Id (ดูแลดีไซน์ความสัมพันธ์)'
    }
  ];

  return (
    <div className="w-full p-4 sm:p-6 rounded-3xl bg-[#070c1a]/95 border-2 border-amber-400/40 shadow-2xl backdrop-blur-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-4 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-950">
              ADOBE STYLE INSIGHTFLOW SUITE
            </span>
            <span className="text-xs text-amber-300/80 font-bold">
              ✨ 2-Letter Mnemonic Icons
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-black text-white mt-1">
            {tx(
              'ชุดสัญลักษณ์ย่อประจำระบบ InsightFlow (สไตล์ตระกูล Adobe Ps, Ai, Pr)',
              'InsightFlow 2-Letter Mnemonic Suite (Adobe Ps, Ai, Pr Style)'
            )}
          </h3>
          <p className="text-xs sm:text-sm text-slate-300 mt-0.5">
            {tx(
              'ดีไซน์แบบย่อ 2 ตัวอักษร คมชัด จำง่าย สะท้อนความหรูหราและความเป็นมืออาชีพของแต่ละระบบ',
              'Iconic 2-letter luxury mnemonic badges designed for instant recognition & executive prestige'
            )}
          </p>
        </div>
      </div>

      {/* Grid of Mnemonic Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {suiteModules.map((item) => {
          const isActive = activeTab === item.tabId;
          return (
            <button
              key={item.letters}
              type="button"
              onClick={() => onSelectTab && onSelectTab(item.tabId)}
              className={`p-3 rounded-2xl border text-left transition-all duration-200 flex flex-col items-center text-center group cursor-pointer ${
                isActive
                  ? 'bg-amber-400/15 border-amber-400 shadow-[0_0_20px_rgba(251,191,36,0.3)] scale-105'
                  : 'bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20'
              }`}
            >
              {/* Adobe-Style Logo Tile */}
              <div className="mb-2.5 transform group-hover:scale-110 transition-transform duration-200">
                <InsightFlowMnemonicLogo
                  size={58}
                  letters={item.letters}
                  variant={item.variant}
                  showSparkle
                />
              </div>

              {/* Title & Description */}
              <div className="w-full">
                <div className="text-xs font-black text-white truncate">
                  {tx(item.nameTh, item.nameEn)}
                </div>
                <div className="text-[10px] text-amber-300/90 font-bold mt-0.5">
                  [{item.letters}]
                </div>
                <div className="text-[9.5px] text-slate-400 mt-1 line-clamp-2 leading-tight">
                  {tx(item.descTh, item.descEn)}
                </div>
                <div className="text-[9px] text-sky-400/80 font-mono mt-1.5 pt-1 border-t border-white/10 truncate">
                  {item.adobeStyleCompare}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default InsightFlowMnemonicLogo;

