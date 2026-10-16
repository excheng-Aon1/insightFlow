// ==============================================================================
// File: src/components/InsightFlowGlassBarsLogo.jsx
// Description: โลโก้ 3D Glass Pill Bars (Ascending Gradient Data Capsules)
//              รังสรรค์ตามสไตล์ดีไซน์ใหม่ล่าสุด:
//              - สี่เหลี่ยมมน Squircle สี Obsidian Charcoal เงามืดเรียบหรูระดับ Apple/Stripe
//              - แท่งแคปซูลแก้ว 3 มิติ 4 แท่ง ไต่ระดับความสูง (Cyan -> Azure -> Indigo -> Purple)
//              - การสะท้อนแสงกระจกเงาด้านบน (Specular Highlights), ขอบแสงซ้าย (Glass Rim),
//                และละอองอนุภาคข้อมูลเรืองแสงภายในแท่งแก้ว (Sparkling Data Bubbles)
// ==============================================================================

import React from 'react';

/**
 * InsightFlowGlassBarsLogo
 * Component โลโก้แท่งแก้ว 3 มิติ 4 สีไต่ระดับความสูง
 */
export function InsightFlowGlassBarsLogo({
  size = 48,
  className = '',
  showShadow = true,
  interactive = false,
  onClick,
  theme
}) {
  const rawId = React.useId();
  const uid = rawId.replace(/:/g, '');
  const isLight = theme === 'light';

  return (
    <div
      onClick={onClick}
      className={`insightflow-glass-bars-logo insightflow-logo-container relative inline-flex items-center justify-center select-none transition-transform duration-300 ${
        interactive ? 'cursor-pointer hover:scale-105 active:scale-95' : ''
      } ${className}`}
      style={{
        width: size,
        height: size,
        borderRadius: Math.round(size * 0.28),
        padding: 0,
        boxShadow: showShadow
          ? isLight
            ? '0 0 0 2.5px #2563eb, 0 8px 24px -2px rgba(37, 99, 235, 0.42), 0 0 16px rgba(56, 189, 248, 0.3)'
            : '0 12px 30px -4px rgba(0, 0, 0, 0.7), 0 0 20px rgba(56, 189, 248, 0.15), inset 0 1px 1px rgba(255, 255, 255, 0.12)'
          : 'none',
        border: isLight ? '1.5px solid #60a5fa' : 'none'
      }}
      title="InsightFlow 3D Glass Bars Logo"
    >
      <svg
        viewBox="0 0 512 512"
        width="100%"
        height="100%"
        style={{ overflow: 'visible' }}
      >
        <defs>
          {/* Base Dark Matte Squircle Gradient */}
          <linearGradient id={`bgTile_${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={isLight ? "#1E293B" : "#1E2330"} />
            <stop offset="35%" stopColor={isLight ? "#0F172A" : "#141824"} />
            <stop offset="70%" stopColor={isLight ? "#09101F" : "#0D101A"} />
            <stop offset="100%" stopColor={isLight ? "#020617" : "#080A10"} />
          </linearGradient>

          {/* Radial Ambient Center Soft Lighting */}
          <radialGradient id={`ambientLight_${uid}`} cx="50%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity={isLight ? "0.22" : "0.08"} />
            <stop offset="50%" stopColor="#818CF8" stopOpacity={isLight ? "0.14" : "0.04"} />
            <stop offset="100%" stopColor="#000000" stopOpacity="0" />
          </radialGradient>

          {/* Outer Bevel Rim (Electric Sapphire in Light Mode, Specular Glass in Dark Mode) */}
          <linearGradient id={`rimBevel_${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={isLight ? "#93C5FD" : "rgba(255, 255, 255, 0.18)"} stopOpacity={isLight ? "0.95" : "1"} />
            <stop offset="50%" stopColor={isLight ? "#3B82F6" : "rgba(255, 255, 255, 0.05)"} stopOpacity={isLight ? "0.85" : "1"} />
            <stop offset="100%" stopColor={isLight ? "#1D4ED8" : "rgba(0, 0, 0, 0.8)"} stopOpacity={isLight ? "0.98" : "1"} />
          </linearGradient>

          {/* Deep Drop Shadow for Capsules */}
          <filter id={`pillShadow_${uid}`} x="-40%" y="-20%" width="180%" height="160%">
            <feDropShadow dx="8" dy="16" stdDeviation="12" floodColor="#020306" floodOpacity="0.75" />
          </filter>

          {/* Specular White Rim Gradient for Left Highlight */}
          <linearGradient id={`whiteRimGrad_${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.85" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.05" />
          </linearGradient>

          {/* Top Cap Curved Highlight Gradient */}
          <linearGradient id={`capHighlight_${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
            <stop offset="60%" stopColor="#FFFFFF" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>

          {/* ================================================================= */}
          {/* 4 PILL BAR COLOR GRADIENTS */}
          {/* ================================================================= */}

          {/* 1. Cyan Glow (Left - Shortest) */}
          <linearGradient id={`pillGrad1_${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22D3EE" />
            <stop offset="30%" stopColor="#06B6D4" />
            <stop offset="70%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#0369A1" />
          </linearGradient>
          <linearGradient id={`pillBottom1_${uid}`} x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#38BDF8" stopOpacity="0" />
          </linearGradient>

          {/* 2. Azure Sky Blue (Mid-Left) */}
          <linearGradient id={`pillGrad2_${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="28%" stopColor="#0284C7" />
            <stop offset="65%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#1E40AF" />
          </linearGradient>
          <linearGradient id={`pillBottom2_${uid}`} x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#60A5FA" stopOpacity="0" />
          </linearGradient>

          {/* 3. Royal Indigo / Violet (Mid-Right) */}
          <linearGradient id={`pillGrad3_${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#818CF8" />
            <stop offset="28%" stopColor="#6366F1" />
            <stop offset="65%" stopColor="#4338CA" />
            <stop offset="100%" stopColor="#312E81" />
          </linearGradient>
          <linearGradient id={`pillBottom3_${uid}`} x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#A5B4FC" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#A5B4FC" stopOpacity="0" />
          </linearGradient>

          {/* 4. Vivid Magenta / Purple (Right - Tallest) */}
          <linearGradient id={`pillGrad4_${uid}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F472B6" />
            <stop offset="25%" stopColor="#D946EF" />
            <stop offset="65%" stopColor="#9333EA" />
            <stop offset="100%" stopColor="#581C87" />
          </linearGradient>
          <linearGradient id={`pillBottom4_${uid}`} x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#F0ABFC" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#F0ABFC" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Outer Squircle Card */}
        <rect
          x="8"
          y="8"
          width="496"
          height="496"
          rx="136"
          fill={`url(#rimBevel_${uid})`}
        />
        <rect
          x="12"
          y="12"
          width="488"
          height="488"
          rx="132"
          fill={`url(#bgTile_${uid})`}
        />
        <rect
          x="12"
          y="12"
          width="488"
          height="488"
          rx="132"
          fill={`url(#ambientLight_${uid})`}
        />

        {/* Ambient Pill Glow Underlay */}
        <ellipse cx="256" cy="270" rx="140" ry="110" fill="#38BDF8" fillOpacity="0.08" />
        <ellipse cx="330" cy="230" rx="110" ry="90" fill="#C084FC" fillOpacity="0.08" />

        {/* ==================================================================== */}
        {/* 4 ASCENDING 3D GLASS PILL BARS */}
        {/* ==================================================================== */}

        {/* BAR 1: CYAN NEON (x=122, w=54, y=232, h=140, bottom=372) */}
        <g filter={`url(#pillShadow_${uid})`}>
          {/* Main Body */}
          <rect
            x="122"
            y="232"
            width="54"
            height="140"
            rx="27"
            fill={`url(#pillGrad1_${uid})`}
          />
          {/* Bottom Inner Ambient Glow */}
          <rect
            x="124"
            y="312"
            width="50"
            height="58"
            rx="25"
            fill={`url(#pillBottom1_${uid})`}
            opacity="0.6"
          />
          {/* Left Specular Glaze Line */}
          <path
            d="M 130 258 L 130 346"
            stroke={`url(#whiteRimGrad_${uid})`}
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          {/* Top Cap Glossy Specular Crescent */}
          <path
            d="M 127 248 C 132 238, 166 238, 171 248 C 165 244, 133 244, 127 248 Z"
            fill={`url(#capHighlight_${uid})`}
          />
          <ellipse cx="149" cy="242" rx="16" ry="6" fill="#FFFFFF" fillOpacity="0.45" />

          {/* Floating Data Bubbles / Star Specks */}
          <circle cx="140" cy="268" r="2.2" fill="#FFFFFF" fillOpacity="0.85" />
          <circle cx="156" cy="296" r="1.6" fill="#FFFFFF" fillOpacity="0.6" />
          <circle cx="138" cy="328" r="2.0" fill="#FFFFFF" fillOpacity="0.75" />
          <circle cx="152" cy="350" r="1.4" fill="#FFFFFF" fillOpacity="0.5" />
        </g>

        {/* BAR 2: AZURE SKY BLUE (x=194, w=54, y=188, h=214, bottom=402) */}
        <g filter={`url(#pillShadow_${uid})`}>
          {/* Main Body */}
          <rect
            x="194"
            y="188"
            width="54"
            height="214"
            rx="27"
            fill={`url(#pillGrad2_${uid})`}
          />
          {/* Bottom Inner Ambient Glow */}
          <rect
            x="196"
            y="320"
            width="50"
            height="80"
            rx="25"
            fill={`url(#pillBottom2_${uid})`}
            opacity="0.65"
          />
          {/* Left Specular Glaze Line */}
          <path
            d="M 202 216 L 202 376"
            stroke={`url(#whiteRimGrad_${uid})`}
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          {/* Top Cap Glossy Specular Crescent */}
          <path
            d="M 199 204 C 204 194, 238 194, 243 204 C 237 200, 205 200, 199 204 Z"
            fill={`url(#capHighlight_${uid})`}
          />
          <ellipse cx="221" cy="198" rx="16" ry="6" fill="#FFFFFF" fillOpacity="0.45" />

          {/* Floating Data Bubbles / Star Specks */}
          <circle cx="212" cy="226" r="2.4" fill="#FFFFFF" fillOpacity="0.8" />
          <circle cx="230" cy="268" r="1.8" fill="#FFFFFF" fillOpacity="0.7" />
          <circle cx="210" cy="316" r="2.2" fill="#FFFFFF" fillOpacity="0.65" />
          <circle cx="228" cy="354" r="1.6" fill="#FFFFFF" fillOpacity="0.8" />
          <circle cx="216" cy="382" r="1.4" fill="#FFFFFF" fillOpacity="0.55" />
        </g>

        {/* BAR 3: ROYAL INDIGO / VIOLET (x=266, w=54, y=148, h=212, bottom=360) */}
        <g filter={`url(#pillShadow_${uid})`}>
          {/* Main Body */}
          <rect
            x="266"
            y="148"
            width="54"
            height="212"
            rx="27"
            fill={`url(#pillGrad3_${uid})`}
          />
          {/* Bottom Inner Ambient Glow */}
          <rect
            x="268"
            y="278"
            width="50"
            height="80"
            rx="25"
            fill={`url(#pillBottom3_${uid})`}
            opacity="0.65"
          />
          {/* Left Specular Glaze Line */}
          <path
            d="M 274 176 L 274 334"
            stroke={`url(#whiteRimGrad_${uid})`}
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          {/* Top Cap Glossy Specular Crescent */}
          <path
            d="M 271 164 C 276 154, 310 154, 315 164 C 309 160, 277 160, 271 164 Z"
            fill={`url(#capHighlight_${uid})`}
          />
          <ellipse cx="293" cy="158" rx="16" ry="6" fill="#FFFFFF" fillOpacity="0.45" />

          {/* Floating Data Bubbles / Star Specks */}
          <circle cx="284" cy="186" r="2.2" fill="#FFFFFF" fillOpacity="0.85" />
          <circle cx="302" cy="228" r="1.8" fill="#FFFFFF" fillOpacity="0.75" />
          <circle cx="282" cy="274" r="2.4" fill="#FFFFFF" fillOpacity="0.7" />
          <circle cx="300" cy="318" r="1.6" fill="#FFFFFF" fillOpacity="0.6" />
          <circle cx="288" cy="342" r="1.4" fill="#FFFFFF" fillOpacity="0.5" />
        </g>

        {/* BAR 4: VIVID MAGENTA / PURPLE (x=338, w=54, y=112, h=198, bottom=310) */}
        <g filter={`url(#pillShadow_${uid})`}>
          {/* Main Body */}
          <rect
            x="338"
            y="112"
            width="54"
            height="198"
            rx="27"
            fill={`url(#pillGrad4_${uid})`}
          />
          {/* Bottom Inner Ambient Glow */}
          <rect
            x="340"
            y="230"
            width="50"
            height="78"
            rx="25"
            fill={`url(#pillBottom4_${uid})`}
            opacity="0.7"
          />
          {/* Left Specular Glaze Line */}
          <path
            d="M 346 140 L 346 284"
            stroke={`url(#whiteRimGrad_${uid})`}
            strokeWidth="3.2"
            strokeLinecap="round"
          />
          {/* Top Cap Glossy Specular Crescent */}
          <path
            d="M 343 128 C 348 118, 382 118, 387 128 C 381 124, 349 124, 343 128 Z"
            fill={`url(#capHighlight_${uid})`}
          />
          <ellipse cx="365" cy="122" rx="16" ry="6" fill="#FFFFFF" fillOpacity="0.5" />

          {/* Floating Data Bubbles / Star Specks */}
          <circle cx="356" cy="150" r="2.4" fill="#FFFFFF" fillOpacity="0.9" />
          <circle cx="374" cy="192" r="1.7" fill="#FFFFFF" fillOpacity="0.8" />
          <circle cx="352" cy="236" r="2.5" fill="#FFFFFF" fillOpacity="0.7" />
          <circle cx="372" cy="274" r="1.6" fill="#FFFFFF" fillOpacity="0.6" />
          <circle cx="360" cy="294" r="1.4" fill="#FFFFFF" fillOpacity="0.5" />
        </g>
      </svg>
    </div>
  );
}

export default InsightFlowGlassBarsLogo;
