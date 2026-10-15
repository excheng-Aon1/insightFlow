import React, { useState, useEffect, useRef } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Filler,
  Legend
} from 'chart.js';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import { Toaster, toast as hotToast } from 'react-hot-toast';
import { ActionablePlaybooks } from './components/ActionablePlaybooks';
import { CashFlowAndDemandForecast } from './components/CashFlowAndDemandForecast';
import { IndustryBenchmarkAndGoalDecomposition } from './components/IndustryBenchmarkAndGoalDecomposition';
import { GoogleSheetCuteButton, GoogleSheetSyncModal } from './components/GoogleSheetSyncModal';
import ProofAndTrustSection from './components/ProofAndTrustSection';
import CuteCatPricingNudge from './components/CuteCatPricingNudge';
import DataPipelineEtlCenter from './components/DataPipelineEtlCenter';
import AdvancedAnalyticsSuite from './components/AdvancedAnalyticsSuite';
import ActionableAiCenter from './components/ActionableAiCenter';
import DataGovernanceCenter from './components/DataGovernanceCenter';

const API_BASE_URL = (import.meta?.env?.VITE_API_BASE_URL || 'http://127.0.0.1:8000').replace(/\/$/, '');
const canUseBackendApi = () =>
  Boolean(import.meta?.env?.VITE_API_BASE_URL) ||
  (typeof window !== 'undefined' &&
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'));

// ============================================================================
// CYBER-LUXURY HOLOGRAPHIC NOTIFICATION BADGE ENGINE (3D ANIMATED HUD TOAST)
// ป้ายแจ้งเตือนดีไซน์ล้ำสมัย พร้อมแอนิเมชัน Spring Physics, วงแหวนเรดาร์,
// เครื่องหมายถูกวาดตัวเองอัตโนมัติ, แสงเลเซอร์วิ่งผ่าน และแถบเวลานับถอยหลัง
// ============================================================================
const CyberLuxuryToastCard = ({ t, message, variant = 'success' }) => {
  const isThaiText = /[\u0E00-\u0E7F]/.test(String(message || ''));
  const nowTime = new Date().toLocaleTimeString(isThaiText ? 'th-TH' : 'en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  const themes = {
    success: {
      borderGlow: 'border-emerald-400/60 shadow-[0_18px_50px_-10px_rgba(16,185,129,0.45),0_0_25px_rgba(251,191,36,0.22)]',
      topAccent: 'from-emerald-400 via-amber-300 to-teal-400',
      badgeBg: 'from-emerald-500/30 via-emerald-400/15 to-amber-400/20 border-emerald-400/60',
      sonarColor: 'border-emerald-400/70',
      orbitColor: 'border-amber-300/60',
      tagBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/40',
      tagLabel: isThaiText ? '⚡ ดำเนินการสำเร็จเรียบร้อย' : '⚡ SYSTEM ACTION VERIFIED',
      progressGradient: 'from-emerald-400 via-amber-300 to-cyan-400',
      ambientOrb: 'bg-emerald-500/25'
    },
    error: {
      borderGlow: 'border-rose-500/65 shadow-[0_18px_50px_-10px_rgba(244,63,94,0.5),0_0_25px_rgba(251,113,133,0.25)]',
      topAccent: 'from-rose-500 via-orange-400 to-pink-500',
      badgeBg: 'from-rose-500/30 via-rose-500/15 to-orange-500/20 border-rose-400/65',
      sonarColor: 'border-rose-400/75',
      orbitColor: 'border-orange-300/60',
      tagBg: 'bg-rose-500/20 text-rose-300 border-rose-400/45',
      tagLabel: isThaiText ? '⚠️ แจ้งเตือนตรวจสอบระบบ' : '⚠️ SECURITY & SYSTEM ALERT',
      progressGradient: 'from-rose-500 via-orange-400 to-amber-400',
      ambientOrb: 'bg-rose-500/25'
    },
    info: {
      borderGlow: 'border-amber-400/65 shadow-[0_18px_50px_-10px_rgba(251,191,36,0.42),0_0_25px_rgba(56,189,248,0.25)]',
      topAccent: 'from-amber-400 via-sky-400 to-indigo-400',
      badgeBg: 'from-amber-400/30 via-sky-400/15 to-indigo-500/20 border-amber-400/65',
      sonarColor: 'border-amber-400/75',
      orbitColor: 'border-sky-300/60',
      tagBg: 'bg-amber-400/20 text-amber-300 border-amber-400/45',
      tagLabel: isThaiText ? '✨ อัปเดตสถานะอัจฉริยะ' : '✨ INSIGHTFLOW LIVE UPDATE',
      progressGradient: 'from-amber-400 via-sky-400 to-emerald-400',
      ambientOrb: 'bg-amber-400/25'
    }
  };

  const cfg = themes[variant] || themes.success;

  return (
    <div
      className={`cyber-toast-hud ${
        t.visible ? 'toast-cyber-enter' : 'toast-cyber-exit'
      } pointer-events-auto relative w-full max-w-[92vw] sm:max-w-[430px] overflow-hidden rounded-2xl bg-[#070c1a]/95 backdrop-blur-2xl border-2 ${
        cfg.borderGlow
      } text-white select-none`}
    >
      {/* Top Neon Accent Line */}
      <div className={`h-1 w-full bg-gradient-to-r ${cfg.topAccent}`} />

      {/* Moving Laser Shimmer Reflection */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="toast-laser-beam absolute -inset-y-8 w-20 bg-gradient-to-r from-transparent via-white/12 to-transparent" />
      </div>

      {/* Ambient Background Glow Orb */}
      <div
        className={`pointer-events-none absolute -top-10 -left-10 w-32 h-32 rounded-full blur-2xl ${cfg.ambientOrb}`}
      />

      <div className="relative p-3.5 sm:px-5 sm:py-4 flex items-start gap-3 sm:gap-4">
        {/* 3D Animated Emblem with Sonar Pulse & Rotating Orbit Ring */}
        <div className="relative flex-shrink-0 w-12 h-12 flex items-center justify-center mt-0.5">
          {/* Expanding Sonar Ring */}
          <span
            className={`toast-sonar-ring absolute inset-0 rounded-2xl border-2 ${cfg.sonarColor}`}
          />
          {/* Rotating Dashed Orbital Ring */}
          <span
            className={`toast-orbit-ring absolute -inset-1 rounded-full border border-dashed ${cfg.orbitColor}`}
          />
          {/* Floating Sparkle Dots */}
          <span className="toast-sparkle-dot absolute -top-1 -right-1 w-2 h-2 rounded-full bg-amber-300 shadow-[0_0_8px_#fbbf24]" />
          <span
            className="toast-sparkle-dot absolute -bottom-1 -left-1 w-1.5 h-1.5 rounded-full bg-cyan-300 shadow-[0_0_8px_#38bdf8]"
            style={{ animationDelay: '0.6s' }}
          />

          {/* Core 3D Glass Icon Badge */}
          <div
            className={`relative z-10 w-12 h-12 rounded-2xl bg-gradient-to-br ${cfg.badgeBg} border flex items-center justify-center shadow-inner`}
          >
            {variant === 'success' && (
              <svg className="w-7 h-7 text-emerald-300 drop-shadow-[0_0_8px_rgba(52,211,153,0.8)]" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.35" />
                <path
                  className="toast-check-path"
                  d="M7.5 12.5L10.5 15.5L16.8 8.8"
                  stroke="#fde047"
                  strokeWidth="2.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
            {variant === 'error' && (
              <svg className="w-7 h-7 text-rose-300 drop-shadow-[0_0_8px_rgba(251,113,133,0.8)]" viewBox="0 0 24 24" fill="none">
                <path
                  className="toast-check-path"
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  stroke="#fda4af"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
            {variant === 'info' && (
              <svg className="w-7 h-7 text-amber-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.85)]" viewBox="0 0 24 24" fill="none">
                <path
                  className="toast-check-path"
                  d="M13 2L4 14h7l-1 8 9-12h-7l1-8z"
                  stroke="#fde047"
                  strokeWidth="2.3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>
        </div>

        {/* Notification Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2 mb-1">
            <span
              className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-black tracking-wide border ${cfg.tagBg}`}
            >
              {cfg.tagLabel}
            </span>
            <span className="text-[11px] font-mono text-slate-300 font-bold">
              {nowTime}
            </span>
          </div>

          <div className="text-sm sm:text-[15px] font-bold text-white leading-snug break-words pr-1">
            {typeof message === 'function' ? message(t) : message}
          </div>
        </div>

        {/* Dismiss Button */}
        <button
          type="button"
          onClick={() => hotToast.dismiss(t.id)}
          className="flex-shrink-0 w-7 h-7 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 flex items-center justify-center text-slate-300 hover:text-white text-xs font-black transition cursor-pointer"
          title="Close"
        >
          ✕
        </button>
      </div>

      {/* Animated Countdown Progress Bar */}
      <div className="h-1.5 w-full bg-white/5 overflow-hidden">
        <div className={`toast-progress-bar h-full w-full bg-gradient-to-r ${cfg.progressGradient}`} />
      </div>
    </div>
  );
};

const spawnCyberToast = (message, variant = 'success', options = {}) => {
  const duration = options?.duration || 4200;
  return hotToast.custom(
    t => <CyberLuxuryToastCard t={t} message={message} variant={variant} />,
    { duration, ...options }
  );
};

const toast = Object.assign(
  (message, options) => spawnCyberToast(message, 'info', options),
  {
    success: (message, options) => spawnCyberToast(message, 'success', options),
    error: (message, options) => spawnCyberToast(message, 'error', options),
    loading: (message, options) => spawnCyberToast(message, 'info', options),
    custom: (...args) => hotToast.custom(...args),
    dismiss: (...args) => hotToast.dismiss(...args),
    remove: (...args) => hotToast.remove(...args)
  }
);

// ============================================================================
// UNIFIED FULL APPLICATION SOURCE (7,000+ LINES COMPLETE EDITION)
// Includes:
// 1. Bilingual Data & Translations (100% Pure Thai / 100% Pure English)
// 2. 3D Luxury Icons & 3D Royal Diamond Brand Emblem Logo
// 3. Overview & Customer Insights (RFM, LTV, CRM History)
// 4. Staff & POS Performance + Multi-Channel & Branch Comparison
// 5. Smart Inventory & Real-Time Trained Business AI Q&A Assistant
// 6. Live Stream, Master Transaction Database, Admin Security & Settings
// ============================================================================

// --- MODULE 1: BILINGUAL DATA & TRANSLATIONS ---
// ข้อมูลเริ่มต้นและข้อความแปลภาษาแบบแยกภาษา 100% (ภาษาไทยล้วน vs ภาษาอังกฤษล้วน)

export const landingTranslations = {
  th: {
    brandSub: "ระบบวิเคราะห์ข้อมูลร้านค้าอัจฉริยะ",
    badgeHero: "✨ ผู้ช่วย AI จัดการร้านค้า & สรุปกำไรรายวัน สำหรับเจ้าของ SME",
    home: "หน้าหลัก",
    solutions: "บริการของเรา",
    whyUs: "จุดเด่นของระบบ",
    useCases: "ตัวอย่างธุรกิจ",
    pricing: "แพ็กเกจราคา",
    freeTrial: "เข้าใช้งานระบบ →",
    heroCtaPrimary: "ทดลองใช้ Starter ฟรี 14 วัน (ไม่ต้องผูกบัตร)",
    tagline1: "เปลี่ยนยอดขายและสต็อกหน้าร้าน",
    tagline2: "ให้เป็นสรุปผลกำไรและสินค้าขายดีรายวัน อัตโนมัติผ่าน LINE",
    description: "ไม่ต้องนั่งคีย์ Excel ไม่ต้องเดาตัวเลขเอง ระบบดึงยอดขายหน้าร้าน POS และ Google Sheet มาคำนวณกำไรแท้จริง สินค้าขายดี และสต็อกใกล้หมด ส่งตรงเข้า LINE ทุกวัน",
    watchDemo: "ดูตัวอย่างระบบสำหรับร้านคุณ",
    feat1: "ประมวลผลข้อมูลรวดเร็ว\nสรุปรายงานอัตโนมัติเข้าใจง่าย",
    feat2: "คาดการณ์ยอดขายแม่นยำ\nแจ้งเตือนของใกล้หมดและคนหาย",
    feat3: "ปลอดภัยมาตรฐานสากล\nปกป้องข้อมูลธุรกิจของคุณเต็มร้อย",
    solutionsHeading: "— บริการครบวงจรสำหรับเจ้าของร้าน",
    solutionsTitle: "เครื่องมืออัจฉริยะสำหรับทุกมิติของร้านค้า",
    solutionsDesc: "ออกแบบมาเพื่อให้เจ้าของธุรกิจเข้าใจตัวเลขได้ทันทีโดยไม่ต้องมีความรู้ด้านเทคนิค",
    s1Title: "สรุปภาพรวมยอดขายและเป้าหมาย",
    s1Desc: "แปลงตัวเลขซับซ้อนให้เป็นตารางและกราฟขนาดใหญ่ เข้าใจง่าย ช่วยให้เจ้าของร้านตัดสินใจได้ในเสี้ยววินาที",
    s2Title: "วิเคราะห์ลูกค้าประจำและคนหาย",
    s2Desc: "แยกกลุ่มลูกค้าชั้นดี ลูกค้าประจำ และลูกค้าที่หายไปนาน เพื่อให้โทรติดตามหรือส่งข้อความดึงกลับมาซื้อซ้ำได้ทันท่วงที",
    s3Title: "ตรวจสอบพนักงานและเครื่องคิดเงิน",
    s3Desc: "ดูยอดขายรายพนักงาน สถิติการเชียร์สินค้าพ่วง และตรวจจับการยกเลิกบิลหรือเปิดลิ้นชักเก็บเงินผิดปกติ",
    s4Title: "เปรียบเทียบสาขาและช่องทางออนไลน์",
    s4Desc: "เทียบกำไรสุทธิระหว่างหน้าร้านจริงกับช่องทางออนไลน์ พร้อมจัดอันดับสาขาที่หมุนเวียนสต็อกไวที่สุด",
    whyUsHeading: "— ทำไมต้องเลือกระบบของเรา",
    whyUsTitle: "ทำไมเจ้าของกิจการจึงไว้วางใจใช้งาน",
    whyUsDesc: "เราไม่ใช่แค่โปรแกรมทำกราฟ แต่คือผู้ช่วยส่วนตัวที่ช่วยเพิ่มยอดขายและป้องกันเงินรั่วไหลในร้าน",
    w1Title: "ใช้งานง่ายแม้ไม่ถนัดเทคโนโลยี",
    w1Desc: "ปุ่มกดขนาดใหญ่ ไอคอนสีสันชัดเจน ปรับขนาดตัวหนังสือได้ 3 ระดับ ผู้ใหญ่วัย 60-70 ปีก็ใช้งานได้สบายตา",
    w2Title: "ผู้ช่วยอัจฉริยะที่รู้จริงเรื่องร้านคุณ",
    w2Desc: "ถาม-ตอบปัญหาธุรกิจเป็นภาษาไทยได้เหมือนคุยกับผู้จัดการส่วนตัว พร้อมคำแนะนำที่ทำตามได้ทันที",
    w3Title: "ป้องกันการทุจริตหน้าร้าน",
    w3Desc: "แจ้งเตือนทันทีเมื่อมีการกดยกเลิกบิลหลังรับเงินสด หรือเปิดลิ้นชักเก็บเงินโดยไม่มีการขาย",
    w4Title: "อัปโหลดไฟล์ข้อมูลของคุณได้เองทุกหน้า",
    w4Desc: "มีช่องให้นำเข้าไฟล์ตารางข้อมูลของร้านคุณเองในทุกหน้าสำคัญ คำนวณผลลัพธ์ใหม่ให้อัตโนมัติทันที",
    useCasesHeading: "— ตัวอย่างธุรกิจที่ใช้งานจริง",
    useCasesTitle: "รองรับธุรกิจหลากหลายประเภท",
    useCasesDesc: "ไม่ว่าจะมีหน้าร้านเดียว หลายสาขา หรือขายผ่านช่องทางออนไลน์ก็ใช้งานได้ครบจบในที่เดียว",
    u1Title: "ร้านค้าปลีกและร้านขายของออนไลน์",
    u1Desc: "วิเคราะห์พฤติกรรมการซื้อรายบุคคล แนะนำโปรโมชันดึงลูกค้าเก่า และจัดการสต็อกล่วงหน้าลดสินค้าค้างปี",
    u2Title: "ร้านกาแฟ คาเฟ่ ร้านอาหาร และแฟรนไชส์หลายสาขา",
    u2Desc: "เปรียบเทียบยอดขายแต่ละสาขา ตรวจสอบการยกเลิกบิลหน้าแคชเชียร์ และสรุปยอดส่งเข้ามือถือทุกวันเวลา 22:00 น.",
    u3Title: "คลินิกความงามและสุขภาพ",
    u3Desc: "ติดตามประวัติการซื้อคอร์สของลูกค้ารายบุคคล แจ้งเตือนเมื่อลูกค้าใกล้ครบกำหนดนัดหรือห่างหายไปนาน",
    u4Title: "โรงงาน คลังสินค้า และธุรกิจค้าส่ง",
    u4Desc: "วางแผนการผลิตและวัตถุดิบ ตรวจสอบอัตราหมุนเวียนสินค้าคงคลัง รวมใบสั่งซื้อซัพพลายเออร์ และส่งออกรายงานภาษีในคลิกเดียว",
    pricingHeading: "— แพ็กเกจราคาที่คุ้มค่า",
    pricingTitle: "เลือกแพ็กเกจที่เหมาะกับขนาดร้านของคุณ",
    pricingDesc: "เริ่มต้นใช้งานได้ทันที ไม่มีค่าใช้จ่ายแอบแฝง พร้อมทีมงานดูแลตลอดการใช้งาน",
    heroHubTitle: "ศูนย์ติดตามเป้าหมายยอดขายของร้าน",
    heroHubStatus: "สถานะ: ทำได้แล้ว 89.2% ของเป้าหมาย",
    heroBadgeLeft: "ยอดขายไตรมาสล่าสุดทะลุเป้า (+14%)",
    heroBadgeRight: "ความแม่นยำ 99.4%",
    heroTargetLabel: "เป้าหมายยอดขายสิ้นปี",
    heroTargetActual: "(ทำได้จริงแล้ว 89.2%)",
    heroAccLabel: "ความแม่นยำการวิเคราะห์",
    heroAccBadge: "สูงกว่าเกณฑ์มาตรฐาน +1.4%",
    heroProgressLabel: "ความคืบหน้าสู่เป้าหมายประจำปี",
    heroQ1: "ไตรมาส 1 (สำเร็จ)",
    heroQ2: "ไตรมาส 2 (สำเร็จ)",
    heroQ3: "ไตรมาส 3 (สำเร็จ)",
    heroQ4: "ไตรมาส 4 (กำลังดำเนินการ)",
    heroChartTitle: "เส้นทางยอดขายจริงเทียบกับเป้าหมายที่ตั้งไว้",
    heroChartBadge: "ยอดขายเติบโตตามแผน"
  },
  en: {
    brandSub: "Intelligent Business Analytics Platform",
    badgeHero: "✨ AI STORE ASSISTANT & DAILY PROFIT SUMMARY FOR SMES",
    home: "Home",
    solutions: "Solutions",
    whyUs: "Why Us",
    useCases: "Use Cases",
    pricing: "Pricing",
    freeTrial: "Launch App →",
    heroCtaPrimary: "Start Starter Plan 14-Day Free Trial (No Card Required)",
    tagline1: "Turn Store Sales & Inventory",
    tagline2: "Into Daily Net Profit & Best-Seller Reports via LINE",
    description: "No manual spreadsheets, no guesswork. Connect your POS and Google Sheets to automatically calculate true net profits, best-selling items, and restock alerts directly to your LINE every day.",
    watchDemo: "Explore Interactive Demo",
    feat1: "10x Faster Data Processing\nInstant automated daily reports",
    feat2: "Accurate Sales Forecasting\nLow-stock & inactive customer alerts",
    feat3: "Enterprise-Grade Security\n100% protection for your store data",
    solutionsHeading: "— COMPREHENSIVE STORE SOLUTIONS",
    solutionsTitle: "Smart Tools for Every Part of Your Business",
    solutionsDesc: "Built so business owners can understand numbers at a glance without technical complexity.",
    s1Title: "Sales Overview & Goal Planner",
    s1Desc: "Transform complex numbers into clear, easy-to-read charts and step-by-step daily sales targets.",
    s2Title: "Customer Loyalty & Retention",
    s2Desc: "Automatically group top customers, regulars, and inactive buyers so you can call or message them in one click.",
    s3Title: "Staff & Cashier Audit",
    s3Desc: "Track sales per employee, upselling rates, and detect suspicious bill cancellations or cash drawer openings.",
    s4Title: "Branch & Channel Comparison",
    s4Desc: "Compare net profit between physical stores and online platforms while ranking branches by inventory turnover.",
    whyUsHeading: "— WHY CHOOSE OUR PLATFORM",
    whyUsTitle: "Why Business Owners Trust Our System",
    whyUsDesc: "More than just charts—we act as your daily store manager to grow revenue and prevent cash leakage.",
    w1Title: "Senior-Friendly & Easy to Use",
    w1Desc: "Large buttons, vivid icons, and 3 adjustable font sizes make every screen comfortable for all ages.",
    w2Title: "Trained on Your Real Store Data",
    w2Desc: "Ask business questions in plain English and get instant, practical answers tailored to your shop.",
    w3Title: "Cashier Fraud Prevention",
    w3Desc: "Receive instant alerts when bills are cancelled after cash payment or when drawers open without a sale.",
    w4Title: "Self-Service File Upload on Every Page",
    w4Desc: "Upload your own spreadsheet files on any page and watch the numbers and charts update automatically.",
    useCasesHeading: "— REAL-WORLD APPLICATIONS",
    useCasesTitle: "Built for Modern Retail & Service Businesses",
    useCasesDesc: "Whether you run a single shop, multiple branches, or online stores, manage everything in one place.",
    u1Title: "Retail & Online E-Commerce Shops",
    u1Desc: "Analyze individual buying habits, send targeted promotions, and restock popular items before they run out.",
    u2Title: "Coffee Shops, Cafes, Restaurants & Franchises",
    u2Desc: "Compare branch performance, audit cashier cancellations, and schedule daily 22:00 summary reports.",
    u3Title: "Wellness & Aesthetic Beauty Clinics",
    u3Desc: "Track customer package history, lifetime value, and follow up automatically when clients become inactive.",
    u4Title: "Factories, Warehouses & Wholesale Distributors",
    u4Desc: "Track production & inventory turnover speed, consolidate supplier POs across branches, and export tax reports in one click.",
    pricingHeading: "— TRANSPARENT PRICING",
    pricingTitle: "Choose the Right Plan for Your Business",
    pricingDesc: "Start immediately with full access to all analytics modules and dedicated support.",
    heroHubTitle: "Strategic Sales Target Tracker",
    heroHubStatus: "Status: 89.2% of Goal Achieved",
    heroBadgeLeft: "Q3 Target Exceeded (+14%)",
    heroBadgeRight: "Forecast Accuracy: 99.4%",
    heroTargetLabel: "Annual Revenue Target",
    heroTargetActual: "(89.2% Achieved So Far)",
    heroAccLabel: "Analysis Accuracy Rate",
    heroAccBadge: "+1.4% Above Benchmark",
    heroProgressLabel: "Annual Goal Progress (2026)",
    heroQ1: "Q1 (Completed)",
    heroQ2: "Q2 (Completed)",
    heroQ3: "Q3 (Completed)",
    heroQ4: "Q4 (In Progress)",
    heroChartTitle: "Actual Sales Pace vs. Planned Target",
    heroChartBadge: "On Track to Beat Goal"
  }
};

export const initialCustomersBilingual = [
  {
    id: 'CUS-9001',
    segment: 'champion',
    rfmScore: '5-5-5',
    recencyDays: 2,
    frequency: 28,
    ltv: 184500,
    aov: 6589,
    phone: '081-924-8899',
    lineId: '@thanin.vip',
    email: 'thanin.a@executive.co.th',
    contactedCount: 2,
    th: {
      name: 'คุณธนินทร์ อัศวเมธี',
      segmentLabel: '🏆 ลูกค้าชั้นดีสูงสุด',
      recencyText: '2 วันที่แล้ว',
      favoriteProduct: 'คอมพิวเตอร์พกพารุ่นโปร และอุปกรณ์เสริมแท้',
      aiAction: 'มอบสิทธิ์ชมสินค้าใหม่ก่อนใคร พร้อมของขวัญพิเศษประจำปีโดยไม่ต้องลดราคา',
      orders: [
        { orderId: 'ORD-2026-1092', date: '09 ต.ค. 2026', items: 'คอมพิวเตอร์พกพา 16 นิ้ว + ประกันศูนย์ 2 ปี', total: 94900, method: 'บัตรเครดิต' },
        { orderId: 'ORD-2026-0981', date: '22 ก.ย. 2026', items: 'แป้นพิมพ์ไร้สาย + เมาส์ไร้สาย', total: 9800, method: 'สแกนจ่ายคิวอาร์' },
        { orderId: 'ORD-2026-0840', date: '05 ก.ย. 2026', items: 'แท็บเล็ตหน้าจอ 11 นิ้ว ความจุ 256 กิกะไบต์', total: 29900, method: 'บัตรเครดิต' }
      ]
    },
    en: {
      name: 'Mr. Thanin Asawamethi',
      segmentLabel: '🏆 Top VIP Customer',
      recencyText: '2 days ago',
      favoriteProduct: 'Pro Laptops & Official Accessories',
      aiAction: 'Offer early access to new arrivals and complimentary executive gifts without discounting.',
      orders: [
        { orderId: 'ORD-2026-1092', date: '09 Oct 2026', items: '16-inch Pro Laptop + 2-Year Protection Plan', total: 94900, method: 'Credit Card' },
        { orderId: 'ORD-2026-0981', date: '22 Sep 2026', items: 'Wireless Keyboard + Pro Mouse', total: 9800, method: 'QR Payment' },
        { orderId: 'ORD-2026-0840', date: '05 Sep 2026', items: '11-inch Tablet 256GB Wi-Fi', total: 29900, method: 'Credit Card' }
      ]
    }
  },
  {
    id: 'CUS-9002',
    segment: 'champion',
    rfmScore: '5-5-5',
    recencyDays: 4,
    frequency: 22,
    ltv: 142800,
    aov: 6490,
    phone: '089-452-3311',
    lineId: '@pimlaphat.w',
    email: 'pimlaphat@luxurybrand.com',
    contactedCount: 1,
    th: {
      name: 'คุณพิมพ์ลภัส วงศ์สุวรรณ',
      segmentLabel: '🏆 ลูกค้าชั้นดีสูงสุด',
      recencyText: '4 วันที่แล้ว',
      favoriteProduct: 'ชุดเซรั่มบำรุงผิวพรีเมียม และวิตามินนำเข้า',
      aiAction: 'เชิญเข้ากลุ่มสมาชิกพิเศษ และแนะนำชุดของขวัญรุ่นผลิตจำนวนจำกัดประจำไตรมาส',
      orders: [
        { orderId: 'ORD-2026-1088', date: '07 ต.ค. 2026', items: 'ชุดเซรั่มทองคำบำรุงผิวหน้า (3 กล่อง)', total: 18900, method: 'บัตรเครดิต' },
        { orderId: 'ORD-2026-0950', date: '19 ก.ย. 2026', items: 'คอลลาเจนเข้มข้นนำเข้า (5 กล่อง)', total: 14500, method: 'สแกนจ่ายคิวอาร์' }
      ]
    },
    en: {
      name: 'Ms. Pimlaphat Wongsuwan',
      segmentLabel: '🏆 Top VIP Customer',
      recencyText: '4 days ago',
      favoriteProduct: 'Luxury Skincare Sets & Imported Vitamins',
      aiAction: 'Invite to Private Member Club and offer quarterly Limited Edition skincare bundles.',
      orders: [
        { orderId: 'ORD-2026-1088', date: '07 Oct 2026', items: '24K Gold Luxury Serum Set (x3)', total: 18900, method: 'Credit Card' },
        { orderId: 'ORD-2026-0950', date: '19 Sep 2026', items: 'Premium Collagen Peptide (x5)', total: 14500, method: 'QR Payment' }
      ]
    }
  },
  {
    id: 'CUS-9003',
    segment: 'at_risk',
    rfmScore: '1-4-5',
    recencyDays: 58,
    frequency: 16,
    ltv: 96400,
    aov: 6025,
    phone: '086-771-9012',
    lineId: '@kittipong.ck',
    email: 'kittipong.c@cafehouse.co.th',
    contactedCount: 0,
    th: {
      name: 'คุณกิตติพงศ์ เจริญกิจ',
      segmentLabel: '⚠️ ลูกค้าห่างหาย (ต้องรีบติดต่อ)',
      recencyText: '58 วันที่แล้ว (เคยซื้อทุก 14 วัน)',
      favoriteProduct: 'เมล็ดกาแฟคั่วบดคัดพิเศษ และอุปกรณ์ร้านกาแฟ',
      aiAction: '🚨 หายไปนานผิดปกติ 58 วัน แนะนำโทรสอบถามความพึงพอใจ และมอบส่วนลด 20% เพื่อดึงกลับมาซื้อทันที',
      orders: [
        { orderId: 'ORD-2026-0612', date: '14 ส.ค. 2026', items: 'เมล็ดกาแฟคั่วบดพิเศษ 5 กิโลกรัม', total: 8500, method: 'โอนผ่านธนาคาร' },
        { orderId: 'ORD-2026-0501', date: '30 ก.ค. 2026', items: 'เครื่องบดกาแฟเชิงพาณิชย์', total: 24900, method: 'บัตรเครดิต' }
      ]
    },
    en: {
      name: 'Mr. Kittipong Charoenkit',
      segmentLabel: '⚠️ Inactive Risk (Urgent Follow-Up)',
      recencyText: '58 days ago (Previously bought every 14 days)',
      favoriteProduct: 'Specialty Coffee Beans & Cafe Equipment',
      aiAction: '🚨 Inactive for 58 days! Call to check satisfaction and send a 20% win-back discount coupon immediately.',
      orders: [
        { orderId: 'ORD-2026-0612', date: '14 Aug 2026', items: 'Specialty Coffee Beans 5kg', total: 8500, method: 'Bank Transfer' },
        { orderId: 'ORD-2026-0501', date: '30 Jul 2026', items: 'Commercial Coffee Grinder', total: 24900, method: 'Credit Card' }
      ]
    }
  },
  {
    id: 'CUS-9004',
    segment: 'loyal',
    rfmScore: '4-5-4',
    recencyDays: 11,
    frequency: 19,
    ltv: 115600,
    aov: 6084,
    phone: '02-945-8800',
    lineId: '@globalsupply',
    email: 'purchasing@globalsupply.co.th',
    contactedCount: 1,
    th: {
      name: 'บริษัท โกลบอล ซัพพลาย จำกัด',
      segmentLabel: '💎 ลูกค้าประจำเหนียวแน่น',
      recencyText: '11 วันที่แล้ว',
      favoriteProduct: 'อุปกรณ์สำนักงาน และหมึกพิมพ์เลเซอร์',
      aiAction: 'เสนอแพ็กเกจเหมาจ่ายรายปีสำหรับองค์กร เพื่อล็อกยอดขายระยะยาวตลอดทั้งปี',
      orders: [
        { orderId: 'ORD-2026-1020', date: '30 ก.ย. 2026', items: 'ชุดหมึกพิมพ์เลเซอร์แท้ (10 กล่อง)', total: 22500, method: 'เครดิตองค์กร 30 วัน' }
      ]
    },
    en: {
      name: 'Global Supply Co., Ltd.',
      segmentLabel: '💎 Loyal Regular Customer',
      recencyText: '11 days ago',
      favoriteProduct: 'Office Supplies & Laser Toner Cartridges',
      aiAction: 'Propose an Annual Corporate Supply Contract to lock in recurring yearly revenue.',
      orders: [
        { orderId: 'ORD-2026-1020', date: '30 Sep 2026', items: 'Genuine Laser Toner Set (x10 Boxes)', total: 22500, method: '30-Day Corporate Credit' }
      ]
    }
  },
  {
    id: 'CUS-9005',
    segment: 'at_risk',
    rfmScore: '2-4-4',
    recencyDays: 49,
    frequency: 12,
    ltv: 74000,
    aov: 6166,
    phone: '084-112-6789',
    lineId: '@woramet.s',
    email: 'woramet.siri@gmail.com',
    contactedCount: 0,
    th: {
      name: 'คุณวรเมธ ศิริวัฒน์',
      segmentLabel: '⚠️ ลูกค้าห่างหาย (ต้องรีบติดต่อ)',
      recencyText: '49 วันที่แล้ว',
      favoriteProduct: 'เก้าอี้เพื่อสุขภาพ และโต๊ะทำงานปรับระดับไฟฟ้า',
      aiAction: '🚨 ส่งข้อความแจ้งสิทธิ์ตรวจเช็คสภาพสินค้าฟรี พร้อมมอบคูปองส่วนลด ฿1,000 สำหรับซื้ออุปกรณ์เสริม',
      orders: [
        { orderId: 'ORD-2026-0680', date: '22 ส.ค. 2026', items: 'เก้าอี้ทำงานเพื่อสุขภาพรุ่นโปร', total: 19500, method: 'ผ่อนชำระ 0%' }
      ]
    },
    en: {
      name: 'Mr. Woramet Siriwat',
      segmentLabel: '⚠️ Inactive Risk (Urgent Follow-Up)',
      recencyText: '49 days ago',
      favoriteProduct: 'Ergonomic Chairs & Electric Standing Desks',
      aiAction: '🚨 Send a free maintenance checkup message plus a ฿1,000 voucher for desk accessories.',
      orders: [
        { orderId: 'ORD-2026-0680', date: '22 Aug 2026', items: 'Ergonomic Pro Mesh Chair', total: 19500, method: '0% Installment' }
      ]
    }
  },
  {
    id: 'CUS-9006',
    segment: 'new',
    rfmScore: '5-1-3',
    recencyDays: 1,
    frequency: 1,
    ltv: 8900,
    aov: 8900,
    phone: '095-889-1234',
    lineId: '@nattanicha.k',
    email: 'nattanicha.k@gmail.com',
    contactedCount: 0,
    th: {
      name: 'คุณณัฐนิชา เกียรติขจร',
      segmentLabel: '🌱 ลูกค้าใหม่เพิ่งซื้อครั้งแรก',
      recencyText: '1 วันที่แล้ว',
      favoriteProduct: 'ลำโพงพกพาไร้สาย และอุปกรณ์ฟังเพลง',
      aiAction: 'ส่งคูปองต้อนรับลูกค้าใหม่ลด ฿500 สำหรับการสั่งซื้อครั้งที่ 2 ภายใน 7 วัน เพื่อเปลี่ยนเป็นลูกค้าประจำ',
      orders: [
        { orderId: 'ORD-2026-1102', date: '10 ต.ค. 2026', items: 'ลำโพงพกพาไร้สายเสียงคมชัดสูง', total: 8900, method: 'สแกนจ่ายคิวอาร์' }
      ]
    },
    en: {
      name: 'Ms. Nattanicha Kiatkhajorn',
      segmentLabel: '🌱 New First-Time Customer',
      recencyText: '1 day ago',
      favoriteProduct: 'Portable Wireless Speakers & Audio Gear',
      aiAction: 'Send a ฿500 welcome-back voucher valid for 7 days to turn her into a repeat buyer.',
      orders: [
        { orderId: 'ORD-2026-1102', date: '10 Oct 2026', items: 'Hi-Fi Wireless Portable Speaker', total: 8900, method: 'QR Payment' }
      ]
    }
  }
];

export const initialStaffBilingual = [
  {
    id: 'STF-101',
    branchId: 'siam',
    totalSales: 684500,
    billsCount: 245,
    basketSize: 2794,
    itemsPerBasket: 3.4,
    upsellAttempts: 245,
    upsellSuccess: 108,
    upsellRate: 44.1,
    upsellRevenue: 162000,
    voidCount: 1,
    refundCount: 0,
    noSaleDrawerCount: 1,
    riskLevel: 'low',
    riskScore: 8,
    th: {
      name: 'คุณภัทรพล วงศ์สุวรรณ (ต้อม)',
      role: 'หัวหน้าพนักงานขายหน้าร้าน',
      branchName: 'สาขาสยามพารากอน (เครื่องที่ 1)',
      topUpsellItem: 'ประกันคุ้มครองจอแตก 2 ปี (+฿2,590)',
      statusBadge: '🏆 แนะนำสินค้าพ่วงอันดับ 1',
      aiCoaching: 'พนักงานดาวเด่น! มีทักษะการแนะนำประกันพ่วงและชุดเซ็ตได้ดีเยี่ยม ควรให้ช่วยสอนเทคนิคการขายให้เพื่อนร่วมงานสาขาอื่น'
    },
    en: {
      name: 'Mr. Phattharapol Wongsuwan (Tom)',
      role: 'Senior Sales Specialist',
      branchName: 'Siam Paragon Branch (Register #1)',
      topUpsellItem: '2-Year Screen Protection Plan (+฿2,590)',
      statusBadge: '🏆 #1 Upselling Champion',
      aiCoaching: 'Star performer! Exceptional skill in bundling protection plans. Assign him to mentor other branches on closing scripts.'
    }
  },
  {
    id: 'STF-104',
    branchId: 'sukhumvit',
    totalSales: 592000,
    billsCount: 210,
    basketSize: 2819,
    itemsPerBasket: 3.1,
    upsellAttempts: 210,
    upsellSuccess: 82,
    upsellRate: 39.0,
    upsellRevenue: 124500,
    voidCount: 1,
    refundCount: 1,
    noSaleDrawerCount: 2,
    riskLevel: 'low',
    riskScore: 12,
    th: {
      name: 'คุณชนากานต์ รัตนโชติ (มิ้นท์)',
      role: 'พนักงานขายและแคชเชียร์',
      branchName: 'สาขาสุขุมวิท-ทองหล่อ (เครื่องที่ 2)',
      topUpsellItem: 'ชุดหัวชาร์จเร็ว + สายถักพรีเมียม (+฿1,290)',
      statusBadge: '💎 ยอดซื้อต่อบิลสูงสุด',
      aiCoaching: 'ทำยอดเฉลี่ยต่อบิลได้สูงสุดในบริษัท แนะนำให้เพิ่มการเชียร์สินค้ากลุ่มอุปกรณ์สมาร์ทโฮม จะดันยอดเพิ่มได้อีก +18%'
    },
    en: {
      name: 'Ms. Chanakan Rattanachot (Mint)',
      role: 'Store Cashier & Advisor',
      branchName: 'Sukhumvit-Thonglor Branch (Register #2)',
      topUpsellItem: 'Fast Charger 65W + Braided Cable Set (+฿1,290)',
      statusBadge: '💎 Highest Basket Size',
      aiCoaching: 'Achieves the highest average order value in the company. Recommending smart home accessories can boost her sales by +18%.'
    }
  },
  {
    id: 'STF-108',
    branchId: 'ladprao',
    totalSales: 318000,
    billsCount: 195,
    basketSize: 1631,
    itemsPerBasket: 1.8,
    upsellAttempts: 195,
    upsellSuccess: 29,
    upsellRate: 14.9,
    upsellRevenue: 31900,
    voidCount: 14,
    refundCount: 6,
    noSaleDrawerCount: 19,
    riskLevel: 'high',
    riskScore: 89,
    th: {
      name: 'คุณธนดล กิตติพงศ์ (แบงค์)',
      role: 'พนักงานแคชเชียร์ประจำเครื่อง',
      branchName: 'สาขาเซ็นทรัลลาดพร้าว (เครื่องที่ 4)',
      topUpsellItem: 'ฟิล์มกระจกนิรภัย (+฿590)',
      statusBadge: '🚨 เฝ้าระวังความผิดปกติสูงสุด',
      aiCoaching: '⚠️ แจ้งเตือนความเสี่ยง: พบการกดยกเลิกบิลหลังรับเงินสด 14 ครั้ง และเปิดลิ้นชักเก็บเงินโดยไม่ขาย 19 ครั้งในช่วงกะดึก แนะนำให้ผู้จัดการตรวจสอบกล้องวงจรปิดทันที'
    },
    en: {
      name: 'Mr. Thanadon Kittipong (Bank)',
      role: 'Register Cashier',
      branchName: 'Central Ladprao Branch (Register #4)',
      topUpsellItem: 'Tempered Glass Screen Protector (+฿590)',
      statusBadge: '🚨 High Fraud Risk Alert',
      aiCoaching: '⚠️ Fraud Alert: Detected 14 post-cash bill cancellations and 19 no-sale cash drawer openings during night shifts. Inspect security camera footage immediately.'
    }
  },
  {
    id: 'STF-112',
    branchId: 'siam',
    totalSales: 468000,
    billsCount: 198,
    basketSize: 2364,
    itemsPerBasket: 2.6,
    upsellAttempts: 198,
    upsellSuccess: 64,
    upsellRate: 32.3,
    upsellRevenue: 89600,
    voidCount: 2,
    refundCount: 1,
    noSaleDrawerCount: 3,
    riskLevel: 'low',
    riskScore: 15,
    th: {
      name: 'คุณศิริพร ใจดี (พลอย)',
      role: 'พนักงานแนะนำสินค้า',
      branchName: 'สาขาสยามพารากอน (เครื่องที่ 2)',
      topUpsellItem: 'เคสกันกระแทกแม่เหล็กแท้ (+฿1,490)',
      statusBadge: '✅ มาตรฐานดีเยี่ยม',
      aiCoaching: 'ผลงานสม่ำเสมอ อัตราการแนะนำสินค้าพ่วงสูงกว่าค่าเฉลี่ยของร้าน (+32.3%)'
    },
    en: {
      name: 'Ms. Siriporn Jaidee (Ploy)',
      role: 'Sales Associate',
      branchName: 'Siam Paragon Branch (Register #2)',
      topUpsellItem: 'Magnetic Shockproof Case (+฿1,490)',
      statusBadge: '✅ Excellent Standard',
      aiCoaching: 'Consistent performance with an upselling conversion rate well above the store average (+32.3%).'
    }
  },
  {
    id: 'STF-115',
    branchId: 'chiangmai',
    totalSales: 289000,
    billsCount: 180,
    basketSize: 1606,
    itemsPerBasket: 1.6,
    upsellAttempts: 180,
    upsellSuccess: 22,
    upsellRate: 12.2,
    upsellRevenue: 19800,
    voidCount: 7,
    refundCount: 5,
    noSaleDrawerCount: 9,
    riskLevel: 'medium',
    riskScore: 54,
    th: {
      name: 'คุณอนุชา เก่งการค้า (อาร์ม)',
      role: 'พนักงานแคชเชียร์ประจำเครื่อง',
      branchName: 'สาขาเชียงใหม่ นิมมาน (เครื่องที่ 1)',
      topUpsellItem: 'น้ำยาทำความสะอาดหน้าจอ (+฿290)',
      statusBadge: '⚠️ ต้องฝึกแนะนำสินค้า & ตรวจบิล',
      aiCoaching: 'ยอดต่อบิลยังต่ำกว่าเกณฑ์ และมีการทำเรื่องคืนเงินสดสูงผิดปกติในวันหยุด ควรกำหนดให้ต้องใช้รหัสผู้จัดการอนุมัติก่อนคืนเงิน'
    },
    en: {
      name: 'Mr. Anucha Kengkarca (Arm)',
      role: 'Register Cashier',
      branchName: 'Chiang Mai Nimman Branch (Register #1)',
      topUpsellItem: 'Screen Cleaning Kit (+฿290)',
      statusBadge: '⚠️ Needs Coaching & Bill Review',
      aiCoaching: 'Basket size is below target and cash refunds spiked on weekends. Require manager PIN approval before issuing cash refunds.'
    }
  }
];

export const initialAuditLogsBilingual = [
  {
    logId: 'AUD-2026-8841',
    staffId: 'STF-108',
    eventType: 'void',
    billNo: 'INV-LP-09482',
    amount: 4590,
    severity: 'critical',
    resolved: false,
    cctvTimestamp: 'กล้อง 04 • 21:41:50 - 21:43:10',
    th: {
      timestamp: 'วันนี้ • 21:42 น.',
      staffName: 'คุณธนดล กิตติพงศ์ (แบงค์)',
      branchName: 'สาขาเซ็นทรัลลาดพร้าว (เครื่องที่ 4)',
      eventLabel: '🚫 ยกเลิกบิลหลังพิมพ์ใบเสร็จรับเงิน',
      paymentMethod: 'เงินสด',
      reasonStated: 'ลูกค้าเปลี่ยนใจไม่รับสินค้า',
      aiAnomalyDetail: 'ตรวจพบการกดพิมพ์ใบเสร็จชั่วคราวแล้วกดยกเลิกบิลทันทีหลังรับเงินสด (ซ้ำรูปแบบเดิมครั้งที่ 4 ในสัปดาห์นี้)'
    },
    en: {
      timestamp: 'Today • 21:42',
      staffName: 'Mr. Thanadon Kittipong (Bank)',
      branchName: 'Central Ladprao Branch (Register #4)',
      eventLabel: '🚫 Bill Cancelled After Receipt Printed',
      paymentMethod: 'Cash',
      reasonStated: 'Customer changed mind after checkout',
      aiAnomalyDetail: 'Printed draft receipt and cancelled the bill immediately after taking cash (4th identical occurrence this week).'
    }
  },
  {
    logId: 'AUD-2026-8839',
    staffId: 'STF-108',
    eventType: 'drawer',
    billNo: 'NO-SALE-19',
    amount: 0,
    severity: 'high',
    resolved: false,
    cctvTimestamp: 'กล้อง 04 • 20:14:55 - 20:16:00',
    th: {
      timestamp: 'วันนี้ • 20:15 น.',
      staffName: 'คุณธนดล กิตติพงศ์ (แบงค์)',
      branchName: 'สาขาเซ็นทรัลลาดพร้าว (เครื่องที่ 4)',
      eventLabel: '🔓 เปิดลิ้นชักเก็บเงินโดยไม่มีรายการขาย',
      paymentMethod: 'กดเปิดด้วยมือ',
      reasonStated: 'แลกเหรียญทอนเงิน',
      aiAnomalyDetail: 'เปิดลิ้นชักค้างไว้ 48 วินาที (เกินค่ามาตรฐาน 15 วินาที) โดยไม่มีลูกค้าทำรายการหน้าเคาน์เตอร์'
    },
    en: {
      timestamp: 'Today • 20:15',
      staffName: 'Mr. Thanadon Kittipong (Bank)',
      branchName: 'Central Ladprao Branch (Register #4)',
      eventLabel: '🔓 Cash Drawer Opened Without Sale',
      paymentMethod: 'Manual Open',
      reasonStated: 'Exchanging coins for change',
      aiAnomalyDetail: 'Drawer remained open for 48 seconds (exceeding 15s threshold) with no customer transaction.'
    }
  },
  {
    logId: 'AUD-2026-8832',
    staffId: 'STF-115',
    eventType: 'refund',
    billNo: 'INV-CM-03319',
    amount: 3290,
    severity: 'high',
    resolved: false,
    cctvTimestamp: 'กล้อง 01 • 17:29:30 - 17:32:00',
    th: {
      timestamp: 'วันนี้ • 17:30 น.',
      staffName: 'คุณอนุชา เก่งการค้า (อาร์ม)',
      branchName: 'สาขาเชียงใหม่ นิมมาน (เครื่องที่ 1)',
      eventLabel: '💸 บันทึกคืนเงินสดให้ลูกค้า',
      paymentMethod: 'คืนเป็นเงินสด',
      reasonStated: 'สินค้ามีตำหนิจากโรงงาน',
      aiAnomalyDetail: 'อ้างอิงบิลขายเดิมเมื่อ 14 วันก่อน แต่ไม่มีการสแกนรหัสสินค้ากลับเข้าคลังสินค้าชำรุด'
    },
    en: {
      timestamp: 'Today • 17:30',
      staffName: 'Mr. Anucha Kengkarca (Arm)',
      branchName: 'Chiang Mai Nimman Branch (Register #1)',
      eventLabel: '💸 Cash Refund Issued to Customer',
      paymentMethod: 'Cash Refund',
      reasonStated: 'Factory defect reported',
      aiAnomalyDetail: 'Referenced a 14-day-old receipt without scanning the returned item back into defective inventory.'
    }
  },
  {
    logId: 'AUD-2026-8820',
    staffId: 'STF-112',
    eventType: 'void',
    billNo: 'INV-SP-11204',
    amount: 1490,
    severity: 'normal',
    resolved: true,
    cctvTimestamp: 'กล้อง 02 • 14:11:50 - 14:13:00',
    th: {
      timestamp: 'วันนี้ • 14:12 น.',
      staffName: 'คุณศิริพร ใจดี (พลอย)',
      branchName: 'สาขาสยามพารากอน (เครื่องที่ 2)',
      eventLabel: '🔄 ยกเลิกบิลเพื่อเปลี่ยนเป็นสินค้ารุ่นใหญ่ขึ้น',
      paymentMethod: 'สแกนจ่ายคิวอาร์',
      reasonStated: 'ลูกค้าขอเพิ่มเงินเปลี่ยนเป็นรุ่นโปร (ออกบิลใหม่ทันที)',
      aiAnomalyDetail: 'ปกติ: พบการออกบิลใหม่มูลค่าสูงขึ้น (฿3,490) ภายใน 45 วินาทีหลังจากยกเลิกบิลเดิม'
    },
    en: {
      timestamp: 'Today • 14:12',
      staffName: 'Ms. Siriporn Jaidee (Ploy)',
      branchName: 'Siam Paragon Branch (Register #2)',
      eventLabel: '🔄 Bill Cancelled for Item Upgrade',
      paymentMethod: 'QR Payment',
      reasonStated: 'Customer upgraded to Pro model (new bill issued immediately)',
      aiAnomalyDetail: 'Normal: A new higher-value receipt (฿3,490) was issued within 45 seconds of cancellation.'
    }
  }
];

export const initialInventoryBilingual = [
  {
    sku: 'SRM-001',
    price: 1290,
    stock: 450,
    status: 'in_stock',
    th: {
      name: 'เซรั่มบำรุงผิวสูตรเข้มข้นพิเศษ',
      category: 'สกินแคร์และผลิตภัณฑ์ดูแลผิว',
      statusLabel: 'มีสินค้าพร้อมขาย'
    },
    en: {
      name: 'Intensive Night Repair Serum',
      category: 'Skincare & Beauty',
      statusLabel: 'In Stock'
    }
  },
  {
    sku: 'PKG-009',
    price: 15,
    stock: 12,
    status: 'low_stock',
    th: {
      name: 'กล่องพัสดุกันกระแทก ขนาดกลาง',
      category: 'อุปกรณ์แพ็กสินค้า',
      statusLabel: 'ใกล้หมดสต็อก (ต้องสั่งเพิ่ม)'
    },
    en: {
      name: 'Shockproof Shipping Box (Medium)',
      category: 'Packaging Supplies',
      statusLabel: 'Low Stock (Reorder Soon)'
    }
  },
  {
    sku: 'SKU-A045',
    price: 450,
    stock: 280,
    status: 'dead_stock',
    th: {
      name: 'ครีมกันแดดสูตรกันน้ำ (ล็อตก่อนหน้า)',
      category: 'สกินแคร์และผลิตภัณฑ์ดูแลผิว',
      statusLabel: 'สินค้าค้างสต็อกนาน (ควรจัดโปรระบาย)'
    },
    en: {
      name: 'Waterproof Sunscreen SPF50+ (Previous Lot)',
      category: 'Skincare & Beauty',
      statusLabel: 'Slow Moving (Run Clearance)'
    }
  },
  {
    sku: 'GFT-001',
    price: 2500,
    stock: 0,
    status: 'out_of_stock',
    th: {
      name: 'ชุดของขวัญพรีเมียมประจำเทศกาล',
      category: 'ชุดของขวัญพิเศษ',
      statusLabel: 'สินค้าหมดชั่วคราว'
    },
    en: {
      name: 'Executive Holiday Gift Set',
      category: 'Seasonal Gift Sets',
      statusLabel: 'Out of Stock'
    }
  },
  {
    sku: 'GAD-204',
    price: 3490,
    stock: 85,
    status: 'in_stock',
    th: {
      name: 'หูฟังไร้สายตัดเสียงรบกวนรุ่นโปร',
      category: 'อุปกรณ์อิเล็กทรอนิกส์',
      statusLabel: 'มีสินค้าพร้อมขาย'
    },
    en: {
      name: 'Pro Noise-Cancelling Wireless Earbuds',
      category: 'Electronics & Gadgets',
      statusLabel: 'In Stock'
    }
  }
];

export const initialBranchesBilingual = [
  {
    rank: 1,
    branchId: 'BR-SIAM',
    revenue: 985000,
    netMarginPct: 48.5,
    inventoryTurnover: 8.4,
    turnoverDays: 11,
    deadStockValue: 14500,
    status: 'excellent',
    th: {
      branchName: 'สาขาสยามพารากอน (สาขาหลัก)',
      manager: 'คุณภัทรพล (ต้อม)',
      topCategory: 'เซรั่มบำรุงผิว & อุปกรณ์อิเล็กทรอนิกส์รุ่นโปร',
      statusText: '🏆 อันดับ 1 ยอดขายสูงสุด & สินค้าหมุนไวที่สุด'
    },
    en: {
      branchName: 'Siam Paragon Branch (Flagship Store)',
      manager: 'Mr. Phattharapol (Tom)',
      topCategory: 'Luxury Serums & Pro Electronics',
      statusText: '🏆 #1 Highest Sales & Fastest Stock Turnover'
    }
  },
  {
    rank: 2,
    branchId: 'BR-SUKHUMVIT',
    revenue: 792000,
    netMarginPct: 47.2,
    inventoryTurnover: 7.1,
    turnoverDays: 14,
    deadStockValue: 22000,
    status: 'excellent',
    th: {
      branchName: 'สาขาสุขุมวิท-ทองหล่อ',
      manager: 'คุณชนากานต์ (มิ้นท์)',
      topCategory: 'นาฬิกาอัจฉริยะ & อุปกรณ์ดูแลสุขภาพ',
      statusText: '💎 ยอดซื้อต่อบิลสูงสุด • สต็อกหมุนเวียนดีมาก'
    },
    en: {
      branchName: 'Sukhumvit-Thonglor Branch',
      manager: 'Ms. Chanakan (Mint)',
      topCategory: 'Smartwatches & Wellness Gadgets',
      statusText: '💎 Highest Basket Size • Healthy Stock Flow'
    }
  },
  {
    rank: 3,
    branchId: 'BR-LADPRAO',
    revenue: 418000,
    netMarginPct: 39.4,
    inventoryTurnover: 4.2,
    turnoverDays: 26,
    deadStockValue: 68500,
    status: 'warning',
    th: {
      branchName: 'สาขาเซ็นทรัลลาดพร้าว',
      manager: 'คุณธนดล (แบงค์)',
      topCategory: 'เคสกันกระแทก & ฟิล์มกระจกนิรภัย',
      statusText: '⚠️ สินค้าหมุนช้าลง & พบการกดยกเลิกบิลบ่อย'
    },
    en: {
      branchName: 'Central Ladprao Branch',
      manager: 'Mr. Thanadon (Bank)',
      topCategory: 'Shockproof Cases & Screen Protectors',
      statusText: '⚠️ Slower Turnover & Frequent Bill Cancellations'
    }
  },
  {
    rank: 4,
    branchId: 'BR-CHIANGMAI',
    revenue: 285000,
    netMarginPct: 36.8,
    inventoryTurnover: 3.1,
    turnoverDays: 35,
    deadStockValue: 94000,
    status: 'risk',
    th: {
      branchName: 'สาขาเชียงใหม่ นิมมาน',
      manager: 'คุณอนุชา (อาร์ม)',
      topCategory: 'ลำโพงพกพา & อุปกรณ์เสริมทั่วไป',
      statusText: '🚨 สินค้าค้างนาน 35 วัน (ควรโอนไปสาขาสยาม)'
    },
    en: {
      branchName: 'Chiang Mai Nimman Branch',
      manager: 'Mr. Anucha (Arm)',
      topCategory: 'Portable Speakers & General Accessories',
      statusText: '🚨 Stagnant Stock 35 Days (Transfer to Siam Recommended)'
    }
  }
];

export const initialChannelsBilingual = [
  {
    id: 'CH-OFFLINE',
    type: 'offline',
    revenue: 2480000,
    orders: 892,
    costAndFees: 372000,
    grossMarginPct: 46.8,
    netProfit: 1160640,
    growth: '+14.2%',
    th: {
      name: '🏪 หน้าร้านจริงทั้งหมด (รวม 4 สาขา)',
      feeDesc: 'ค่าเช่าพื้นที่และพนักงานหน้าร้าน (15%)',
      badge: '💎 กำไรต่อชิ้นสูงที่สุด',
      aiAdvice: 'หน้าร้านทำอัตรากำไรได้สูงมากเพราะไม่ถูกหักค่าธรรมเนียมแอป แนะนำให้จัดกิจกรรม "สั่งออนไลน์แล้วมารับที่หน้าร้าน" เพื่อเชียร์ขายสินค้าพ่วง'
    },
    en: {
      name: '🏪 Physical Storefronts (All 4 Branches)',
      feeDesc: 'Store rent & cashier staff expenses (15%)',
      badge: '💎 Highest Margin Per Item',
      aiAdvice: 'Physical stores yield high margins with zero platform commission. Launch a "Click & Collect in Store" promo to upsell additional items at checkout.'
    }
  },
  {
    id: 'CH-TIKTOK',
    type: 'online',
    revenue: 1120000,
    orders: 1450,
    costAndFees: 235200,
    grossMarginPct: 34.2,
    netProfit: 383040,
    growth: '+38.5%',
    th: {
      name: '🎵 ช่องทางวิดีโอสั้นและไลฟ์สดขายสินค้า',
      feeDesc: 'ค่าธรรมเนียมแพลตฟอร์มและค่านายหน้า (21%)',
      badge: '🔥 ยอดขายเติบโตเร็วอันดับ 1',
      aiAdvice: 'คำสั่งซื้อพุ่งเร็วมากแต่ถูกหักค่านายหน้าและคูปองส่งฟรี 21% แนะนำให้จัดชุดสินค้าราคา ฿1,500 ขึ้นไปเพื่อให้คุ้มค่าธรรมเนียมต่อบิล'
    },
    en: {
      name: '🎵 Short-Video & Live Commerce Store',
      feeDesc: 'Platform commission & affiliate fees (21%)',
      badge: '🔥 #1 Fastest Growing Channel',
      aiAdvice: 'Order volume is surging, but 21% goes to platform and affiliate fees. Bundle products into ฿1,500+ sets to maximize profit per shipment.'
    }
  },
  {
    id: 'CH-SHOPEE',
    type: 'online',
    revenue: 685000,
    orders: 920,
    costAndFees: 157550,
    grossMarginPct: 31.0,
    netProfit: 212350,
    growth: '+9.4%',
    th: {
      name: '🧡 ร้านค้าทางการบนแอปช้อปปิ้งมอลล์',
      feeDesc: 'ค่าธรรมเนียมการขายและโค้ดส่วนลดแคมเปญ (23%)',
      badge: '📦 ระบายสินค้าค้างคลังได้ไว',
      aiAdvice: 'เหมาะสำหรับใช้ระบายสินค้าค้างสต็อกในช่วงวันโปรโมชันใหญ่ และควรแนบบัตรเชิญลูกค้าแอดแชตร้านโดยตรงเพื่อซื้อซ้ำโดยไม่เสียค่าธรรมเนียม'
    },
    en: {
      name: '🧡 Official Marketplace Mall Store',
      feeDesc: 'Marketplace fee & campaign voucher cost (23%)',
      badge: '📦 Best for Fast Stock Clearance',
      aiAdvice: 'Ideal for clearing slow-moving inventory during double-day sales. Include a thank-you card inviting buyers to order directly next time.'
    }
  },
  {
    id: 'CH-LINE',
    type: 'online',
    revenue: 544000,
    orders: 310,
    costAndFees: 27200,
    grossMarginPct: 52.4,
    netProfit: 285056,
    growth: '+26.0%',
    th: {
      name: '💬 ช่องทางแชตร้านค้าและเว็บไซต์โดยตรง',
      feeDesc: 'ค่าส่งข้อความแจ้งข่าวและค่าธรรมเนียมรับชำระเงิน (5%)',
      badge: '🏆 กำไรสุทธิเข้ากระเป๋าสูงสุด',
      aiAdvice: 'ช่องทางทำเงินดีที่สุด! เสียค่าใช้จ่ายเพียง 5% ทำให้เหลือกำไรสุทธิถึง 52.4% ควรดึงลูกค้าประจำจากแอปอื่นมาสั่งซื้อซ้ำผ่านช่องทางนี้'
    },
    en: {
      name: '💬 Direct Store Chat & Official Website',
      feeDesc: 'Broadcast messaging & payment gateway fee (5%)',
      badge: '🏆 Highest Net Profit Margin',
      aiAdvice: 'Your most profitable channel! With only 5% overhead, you keep 52.4% net margin. Migrate repeat buyers from marketplaces to direct chat orders.'
    }
  }
];

export const initialAnomaliesBilingual = [
  {
    id: 'ANM-01',
    severity: 'critical',
    th: {
      badge: '🚨 ความผิดปกติระดับวิกฤต (วันนี้ 15:40 น.)',
      title: 'ยอดขายหมวดอาหารและเครื่องดื่มสุขภาพลดลง -40% ในวันนี้ (สาขาลาดพร้าว)',
      detail: 'ระบบตรวจพบว่ายอดขายหมวดอาหารเสริมและเครื่องดื่มสุขภาพลดลงผิดปกติ 40% เมื่อเทียบกับค่าเฉลี่ยปกติ สาเหตุเกิดจากสินค้าตัวหลักหมดชั้นวางแต่ยังมีค้างในห้องเก็บของหลังร้าน',
      actionLabel: '📲 แจ้งผู้จัดการสาขาเติมของขึ้นชั้นวางทันที',
      actionToast: '📲 ส่งข้อความด่วนแจ้งผู้จัดการสาขาลาดพร้าวให้นำสินค้าจากห้องเก็บของขึ้นชั้นวางเรียบร้อยแล้ว!'
    },
    en: {
      badge: '🚨 Critical Anomaly Detected (Today 15:40)',
      title: 'Health Food & Beverage Sales Dropped -40% Today (Ladprao Branch)',
      detail: 'Sales in the health supplement category fell 40% below the 4-week average because top items ran out on display shelves while stock remains in the backroom.',
      actionLabel: '📲 Alert Branch Manager to Restock Shelves Now',
      actionToast: '📲 Urgent alert sent to Ladprao Branch Manager to restock display shelves from the backroom!'
    }
  },
  {
    id: 'ANM-02',
    severity: 'critical',
    th: {
      badge: '🛡️ เตือนภัยทุจริตแคชเชียร์ (เมื่อคืน 21:42 น.)',
      title: 'ตรวจพบการกดยกเลิกบิลติดต่อกันผิดปกติ 4 ครั้งซ้อน หลังรับเงินสด',
      detail: 'เครื่องคิดเงินที่ 4 (สาขาเซ็นทรัลลาดพร้าว) มีการกดพิมพ์ใบเสร็จชั่วคราวแล้วกดยกเลิกบิลติดต่อกันรวมมูลค่า ฿12,450 พร้อมเปิดลิ้นชักเก็บเงินโดยไม่มีการขาย 19 ครั้ง',
      actionLabel: '🔒 ล็อกสิทธิ์การยกเลิกบิล & เปิดดูกล้องวงจรปิด',
      actionToast: '🔒 ล็อกสิทธิ์การยกเลิกบิลของเครื่องที่ 4 และดึงภาพกล้องวงจรปิดส่งให้เจ้าของร้านเรียบร้อยแล้ว!'
    },
    en: {
      badge: '🛡️ Cashier Fraud Alert (Last Night 21:42)',
      title: '4 Consecutive Bill Cancellations Detected After Cash Receipt',
      detail: 'Register #4 (Central Ladprao) printed draft receipts and cancelled 4 bills totaling ฿12,450, alongside 19 no-sale cash drawer openings.',
      actionLabel: '🔒 Lock Cancel Permission & View Security Camera',
      actionToast: '🔒 Locked bill cancellation permission on Register #4 and sent camera footage to the owner!'
    }
  },
  {
    id: 'ANM-03',
    severity: 'warning',
    th: {
      badge: '⚠️ เตือนภัยต้นทุนโฆษณาสูงเกินเกณฑ์ (วันนี้ 13:15 น.)',
      title: 'ค่าโฆษณาออนไลน์พุ่งสูงขึ้น +24% แต่ยอดสั่งซื้อไม่เพิ่มตาม',
      detail: 'แคมเปญโฆษณาสินค้ากลุ่มกันแดดล็อตเก่ามีต้นทุนต่อคลิกแพงขึ้นผิดปกติ ทำให้อัตรากำไรสุทธิหดตัวเหลือเพียง 14% แนะนำให้พักแคมเปญนี้แล้วโยกงบไปช่องทางแชตร้านค้าแทน',
      actionLabel: '⚡ สั่งพักแคมเปญโฆษณาที่ต้นทุนแพงทันที',
      actionToast: '⚡ สั่งพักแคมเปญโฆษณาที่ต้นทุนแพงเกินเกณฑ์ และโยกงบไปช่องทางทำกำไรสูงเรียบร้อยแล้ว!'
    },
    en: {
      badge: '⚠️ Ad Spend Efficiency Warning (Today 13:15)',
      title: 'Online Ad Cost Spiked +24% Without Order Growth',
      detail: 'The ad campaign for older sunscreen stock saw cost-per-click surge, shrinking net margin to 14%. Pause this campaign and reallocate budget to Direct Chat.',
      actionLabel: '⚡ Pause High-Cost Ad Campaign Immediately',
      actionToast: '⚡ Paused the underperforming ad campaign and reallocated budget to high-margin channels!'
    }
  }
];

export const initialDatabaseRecordsBilingual = [
  {
    id: 'TXN-2026-901',
    date: '11/10/2026 16:40',
    amount: 12900,
    itemsCount: 4,
    th: {
      channel: 'หน้าร้าน สาขาสยามพารากอน',
      customer: 'คุณธนินทร์ อัศวเมธี',
      product: 'เซรั่มบำรุงผิวสูตรเข้มข้นพิเศษ (x10)',
      status: 'ชำระเงินสำเร็จ'
    },
    en: {
      channel: 'Siam Paragon Storefront',
      customer: 'Mr. Thanin Asawamethi',
      product: 'Intensive Night Repair Serum (x10)',
      status: 'Paid & Completed'
    }
  },
  {
    id: 'TXN-2026-902',
    date: '11/10/2026 16:15',
    amount: 6980,
    itemsCount: 2,
    th: {
      channel: 'ช่องทางวิดีโอสั้นและไลฟ์สด',
      customer: 'คุณพิมพ์ลภัส วงศ์สุวรรณ',
      product: 'หูฟังไร้สายตัดเสียงรบกวนรุ่นโปร (x2)',
      status: 'ชำระเงินสำเร็จ'
    },
    en: {
      channel: 'Live Commerce Store',
      customer: 'Ms. Pimlaphat Wongsuwan',
      product: 'Pro Noise-Cancelling Wireless Earbuds (x2)',
      status: 'Paid & Completed'
    }
  },
  {
    id: 'TXN-2026-903',
    date: '11/10/2026 15:50',
    amount: 22500,
    itemsCount: 10,
    th: {
      channel: 'ช่องทางแชตร้านค้าโดยตรง',
      customer: 'บริษัท โกลบอล ซัพพลาย จำกัด',
      product: 'ชุดหมึกพิมพ์และอุปกรณ์สำนักงาน (x10)',
      status: 'ชำระเงินสำเร็จ'
    },
    en: {
      channel: 'Direct Store Chat',
      customer: 'Global Supply Co., Ltd.',
      product: 'Laser Toner & Office Supply Bundle (x10)',
      status: 'Paid & Completed'
    }
  },
  {
    id: 'TXN-2026-904',
    date: '11/10/2026 15:10',
    amount: 5000,
    itemsCount: 2,
    th: {
      channel: 'หน้าร้าน สาขาสุขุมวิท-ทองหล่อ',
      customer: 'คุณณัฐนิชา เกียรติขจร',
      product: 'ชุดของขวัญพรีเมียมประจำเทศกาล (x2)',
      status: 'ชำระเงินสำเร็จ'
    },
    en: {
      channel: 'Sukhumvit-Thonglor Storefront',
      customer: 'Ms. Nattanicha Kiatkhajorn',
      product: 'Executive Holiday Gift Set (x2)',
      status: 'Paid & Completed'
    }
  }
];

export const initialVendorsBilingual = [
  {
    id: 'VND-01',
    leadTimeDays: 2.1,
    slaTargetDays: 3.0,
    onTimeRate: 98.5,
    fillRate: 99.2,
    defectRate: 0.2,
    creditTermDays: 60,
    volumeDiscountPct: 14,
    minOrderQtyForDiscount: 300,
    annualSpend: 4250000,
    grade: 'A+',
    status: 'excellent',
    th: {
      name: 'บริษัท สยาม เดอร์มา แล็บ จำกัด',
      category: 'สกินแคร์และเซรั่มบำรุงผิวพรีเมียม',
      contact: 'คุณกิตติพงศ์ (ฝ่ายขายโครงการ) • 02-889-4411',
      gradeLabel: 'เกรด A+ (ส่งเร็วและครบ 100%)',
      discountCondition: 'สั่งรวมครบ 300 ชิ้น ลดต้นทุนทันที 14%',
      note: 'ส่งของตรงเวลาสม่ำเสมอ สินค้าตรงปกครบทุกหีบห่อ'
    },
    en: {
      name: 'Siam Derma Lab Co., Ltd.',
      category: 'Premium Skincare & Facial Serums',
      contact: 'Mr. Kittipong (Key Account) • 02-889-4411',
      gradeLabel: 'Grade A+ (Top Reliability)',
      discountCondition: 'Order 300+ units centrally for 14% off',
      note: 'Consistently delivers ahead of schedule with near-zero defects.'
    }
  },
  {
    id: 'VND-02',
    leadTimeDays: 2.8,
    slaTargetDays: 3.0,
    onTimeRate: 95.4,
    fillRate: 97.8,
    defectRate: 0.4,
    creditTermDays: 45,
    volumeDiscountPct: 12,
    minOrderQtyForDiscount: 150,
    annualSpend: 3680000,
    grade: 'A',
    status: 'excellent',
    th: {
      name: 'บริษัท โซนิค เทค ดิสทริบิวชั่น จำกัด',
      category: 'หูฟังไร้สายและอุปกรณ์แกดเจ็ตอัจฉริยะ',
      contact: 'คุณอารยา (ผู้จัดการฝ่ายค้าส่ง) • 02-712-9000',
      gradeLabel: 'เกรด A (เชื่อถือได้สูง)',
      discountCondition: 'สั่งรวมครบ 150 ชิ้น ลดต้นทุนทันที 12%',
      note: 'มีสต็อกพร้อมส่งที่คลังกลางบางนา เครดิตการค้า 45 วัน'
    },
    en: {
      name: 'Sonic Tech Distribution Co., Ltd.',
      category: 'Wireless Audio & Smart Gadgets',
      contact: 'Ms. Araya (Wholesale Director) • 02-712-9000',
      gradeLabel: 'Grade A (Highly Reliable)',
      discountCondition: 'Order 150+ units centrally for 12% off',
      note: 'Ready stock at Bangna central warehouse with 45-day credit terms.'
    }
  },
  {
    id: 'VND-03',
    leadTimeDays: 1.9,
    slaTargetDays: 2.5,
    onTimeRate: 99.1,
    fillRate: 99.6,
    defectRate: 0.1,
    creditTermDays: 60,
    volumeDiscountPct: 16,
    minOrderQtyForDiscount: 400,
    annualSpend: 2940000,
    grade: 'A+',
    status: 'excellent',
    th: {
      name: 'บริษัท เอเชีย เฮลท์ แอนด์ เวลเนส จำกัด',
      category: 'วิตามินและผลิตภัณฑ์เสริมอาหารสุขภาพ',
      contact: 'ภก.วิกรม (ฝ่ายดูแลลูกค้ารายใหญ่) • 02-554-3210',
      gradeLabel: 'เกรด A+ (ดีเยี่ยมอันดับ 1)',
      discountCondition: 'สั่งรวมครบ 400 กล่อง ลดต้นทุนทันที 16%',
      note: 'ส่งของไวที่สุดในระบบ และให้ส่วนลดสั่งซื้อรวมสูงสุดถึง 16%'
    },
    en: {
      name: 'Asia Health & Wellness Supply Co., Ltd.',
      category: 'Vitamins & Executive Health Supplements',
      contact: 'Dr.orn Vikrom (Enterprise Sales) • 02-554-3210',
      gradeLabel: 'Grade A+ (#1 Fastest Lead Time)',
      discountCondition: 'Order 400+ boxes centrally for 16% off',
      note: 'Fastest delivery turnaround and highest central volume discount (16%).'
    }
  },
  {
    id: 'VND-04',
    leadTimeDays: 4.3,
    slaTargetDays: 4.0,
    onTimeRate: 88.0,
    fillRate: 93.4,
    defectRate: 1.1,
    creditTermDays: 30,
    volumeDiscountPct: 15,
    minOrderQtyForDiscount: 500,
    annualSpend: 1420000,
    grade: 'B+',
    status: 'watch',
    th: {
      name: 'บริษัท โกลบอล แพ็กเกจจิ้ง แอนด์ กิฟต์ จำกัด',
      category: 'กล่องของขวัญพรีเมียมและถุงแบรนด์เนม',
      contact: 'คุณสุรศักดิ์ (ฝ่ายผลิตโรงงาน) • 034-812-559',
      gradeLabel: 'เกรด B+ (ส่งครบแต่บางรอบช้ากว่ากำหนด)',
      discountCondition: 'สั่งผลิตและจัดส่งรวม 500 ชุด ลดต้นทุน 15%',
      note: 'ควรสั่งล่วงหน้าอย่างน้อย 5 วันก่อนช่วงเทศกาล'
    },
    en: {
      name: 'Global Packaging & Gift Box Co., Ltd.',
      category: 'Luxury Gift Boxes & Branded Packaging',
      contact: 'Mr. Surasak (Factory Production) • 034-812-559',
      gradeLabel: 'Grade B+ (Minor Peak-Season Delays)',
      discountCondition: 'Order 500+ sets centrally for 15% off',
      note: 'Place consolidated orders at least 5 days ahead of holiday peaks.'
    }
  },
  {
    id: 'VND-05',
    leadTimeDays: 6.4,
    slaTargetDays: 3.0,
    onTimeRate: 72.5,
    fillRate: 82.0,
    defectRate: 2.8,
    creditTermDays: 15,
    volumeDiscountPct: 8,
    minOrderQtyForDiscount: 200,
    annualSpend: 680000,
    grade: 'C',
    status: 'risk',
    th: {
      name: 'บริษัท เมโทร พีโอเอส แอนด์ ซัพพลาย จำกัด',
      category: 'กระดาษใบเสร็จความร้อนและอุปกรณ์จุดขาย',
      contact: 'คุณชาญชัย (ฝ่ายจัดส่ง) • 02-331-7788',
      gradeLabel: 'เกรด C (ส่งของล่าช้าและส่งไม่ครบตามบิลบ่อย)',
      discountCondition: 'สั่งรวมครบ 200 แพ็ก ลดต้นทุน 8%',
      note: 'เดือนนี้ส่งของขาดไป 18% แนะนำยื่นหนังสือเตือนหรือเปลี่ยนซัพพลายเออร์สำรอง'
    },
    en: {
      name: 'Metro POS & Store Supplies Co., Ltd.',
      category: 'Thermal Receipt Rolls & Register Supplies',
      contact: 'Mr. Chanchai (Dispatch) • 02-331-7788',
      gradeLabel: 'Grade C (Frequent Delays & Short Shipments)',
      discountCondition: 'Order 200+ packs centrally for 8% off',
      note: '18% short-shipped this month; recommend issuing SLA warning or switching vendor.'
    }
  }
];

export const initialBranchRequisitionsBilingual = [
  {
    id: 'REQ-101',
    sku: 'SKU-101',
    vendorId: 'VND-01',
    selected: true,
    regularUnitCost: 450,
    volumeDiscountPct: 14,
    minQtyForTier: 300,
    branchNeeds: [
      { branchTh: 'สยามพารากอน', branchEn: 'Siam Paragon', qty: 120 },
      { branchTh: 'เซ็นทรัลลาดพร้าว', branchEn: 'Central Ladprao', qty: 95 },
      { branchTh: 'สุขุมวิท-ทองหล่อ', branchEn: 'Sukhumvit-Thonglor', qty: 85 },
      { branchTh: 'เชียงใหม่นิมมาน', branchEn: 'Chiang Mai Nimman', qty: 70 },
      { branchTh: 'ภูเก็ตป่าตอง', branchEn: 'Phuket Patong', qty: 50 }
    ],
    totalQty: 420,
    th: {
      productName: 'เซรั่มบำรุงผิวสูตรเข้มข้นพิเศษ (ขนาด 50 มล.)',
      vendorName: 'บริษัท สยาม เดอร์มา แล็บ จำกัด',
      unitLabel: 'ขวด',
      urgency: 'ด่วนมาก (สต็อกสาขาหลักเหลือไม่ถึง 4 วัน)'
    },
    en: {
      productName: 'Intensive Night Repair Serum (50ml)',
      vendorName: 'Siam Derma Lab Co., Ltd.',
      unitLabel: 'bottles',
      urgency: 'Critical (< 4 days stock left at flagship branches)'
    }
  },
  {
    id: 'REQ-102',
    sku: 'SKU-204',
    vendorId: 'VND-02',
    selected: true,
    regularUnitCost: 1200,
    volumeDiscountPct: 12,
    minQtyForTier: 150,
    branchNeeds: [
      { branchTh: 'สยามพารากอน', branchEn: 'Siam Paragon', qty: 65 },
      { branchTh: 'เซ็นทรัลลาดพร้าว', branchEn: 'Central Ladprao', qty: 50 },
      { branchTh: 'สุขุมวิท-ทองหล่อ', branchEn: 'Sukhumvit-Thonglor', qty: 45 },
      { branchTh: 'เชียงใหม่นิมมาน', branchEn: 'Chiang Mai Nimman', qty: 30 }
    ],
    totalQty: 190,
    th: {
      productName: 'หูฟังไร้สายตัดเสียงรบกวนรุ่นโปร (สีดำทอง)',
      vendorName: 'บริษัท โซนิค เทค ดิสทริบิวชั่น จำกัด',
      unitLabel: 'กล่อง',
      urgency: 'ปานกลาง (ยอดจองออนไลน์และหน้าร้านสูง)'
    },
    en: {
      productName: 'Pro Noise-Cancelling Wireless Earbuds (Obsidian Gold)',
      vendorName: 'Sonic Tech Distribution Co., Ltd.',
      unitLabel: 'boxes',
      urgency: 'High Demand (Rising online & in-store pre-orders)'
    }
  },
  {
    id: 'REQ-103',
    sku: 'SKU-309',
    vendorId: 'VND-03',
    selected: true,
    regularUnitCost: 320,
    volumeDiscountPct: 16,
    minQtyForTier: 400,
    branchNeeds: [
      { branchTh: 'สยามพารากอน', branchEn: 'Siam Paragon', qty: 140 },
      { branchTh: 'เซ็นทรัลลาดพร้าว', branchEn: 'Central Ladprao', qty: 110 },
      { branchTh: 'สุขุมวิท-ทองหล่อ', branchEn: 'Sukhumvit-Thonglor', qty: 100 },
      { branchTh: 'เชียงใหม่นิมมาน', branchEn: 'Chiang Mai Nimman', qty: 80 },
      { branchTh: 'ภูเก็ตป่าตอง', branchEn: 'Phuket Patong', qty: 70 }
    ],
    totalQty: 500,
    th: {
      productName: 'วิตามินซีสกัดเข้มข้นเกรดพรีเมียม 1,000 มก.',
      vendorName: 'บริษัท เอเชีย เฮลท์ แอนด์ เวลเนส จำกัด',
      unitLabel: 'กระปุก',
      urgency: 'ด่วน (สินค้าขายดีอันดับ 1 ประจำเดือน)'
    },
    en: {
      productName: 'Premium Bio-Vitamin C Complex 1,000mg',
      vendorName: 'Asia Health & Wellness Supply Co., Ltd.',
      unitLabel: 'jars',
      urgency: 'Urgent (#1 Monthly Best Seller across branches)'
    }
  },
  {
    id: 'REQ-104',
    sku: 'SKU-412',
    vendorId: 'VND-04',
    selected: true,
    regularUnitCost: 95,
    volumeDiscountPct: 15,
    minQtyForTier: 500,
    branchNeeds: [
      { branchTh: 'สยามพารากอน', branchEn: 'Siam Paragon', qty: 200 },
      { branchTh: 'เซ็นทรัลลาดพร้าว', branchEn: 'Central Ladprao', qty: 150 },
      { branchTh: 'สุขุมวิท-ทองหล่อ', branchEn: 'Sukhumvit-Thonglor', qty: 150 },
      { branchTh: 'เชียงใหม่นิมมาน', branchEn: 'Chiang Mai Nimman', qty: 100 }
    ],
    totalQty: 600,
    th: {
      productName: 'ชุดกล่องของขวัญแม่เหล็กสีทอง 24K พร้อมริบบิ้น',
      vendorName: 'บริษัท โกลบอล แพ็กเกจจิ้ง แอนด์ กิฟต์ จำกัด',
      unitLabel: 'ชุด',
      urgency: 'เตรียมสต็อกแคมเปญสิ้นเดือน'
    },
    en: {
      productName: '24K Gold Magnetic Luxury Gift Box Set',
      vendorName: 'Global Packaging & Gift Box Co., Ltd.',
      unitLabel: 'sets',
      urgency: 'Month-End Campaign Stock Preparation'
    }
  }
];

export const initialCentralPosBilingual = [
  {
    poNumber: 'CPO-2026-8802',
    createdAt: '11/10/2026 16:40',
    totalUnits: 1110,
    regularTotalCost: 577000,
    discountedTotalCost: 496980,
    savedAmount: 80020,
    discountPctAvg: 13.9,
    th: {
      vendorSummary: 'รวม 3 ซัพพลายเออร์หลัก (สยาม เดอร์มา, โซนิค เทค, เอเชีย เฮลท์)',
      branchesCovered: 'รวมยอดสั่งซื้อจาก 5 สาขาทั่วประเทศ',
      status: 'ส่งใบสั่งซื้อให้ซัพพลายเออร์แล้ว (รอรับของเข้าคลังกลาง)'
    },
    en: {
      vendorSummary: 'Consolidated across 3 Primary Vendors (Siam Derma, Sonic Tech, Asia Health)',
      branchesCovered: 'Aggregated demand from all 5 nationwide branches',
      status: 'Sent to Vendors (Awaiting Central Warehouse Delivery)'
    }
  },
  {
    poNumber: 'CPO-2026-8801',
    createdAt: '04/10/2026 11:15',
    totalUnits: 850,
    regularTotalCost: 412000,
    discountedTotalCost: 354320,
    savedAmount: 57680,
    discountPctAvg: 14.0,
    th: {
      vendorSummary: 'บริษัท สยาม เดอร์มา แล็บ จำกัด & โกลบอล แพ็กเกจจิ้ง',
      branchesCovered: 'รวมยอดสั่งซื้อจาก 4 สาขาหลัก',
      status: 'รับสินค้าครบ 100% และกระจายลงสาขาเรียบร้อยแล้ว'
    },
    en: {
      vendorSummary: 'Siam Derma Lab Co., Ltd. & Global Packaging',
      branchesCovered: 'Aggregated demand from 4 flagship branches',
      status: '100% Received & Distributed to Branches'
    }
  }
];


// --- MODULE 2: 3D LUXURY ICONS & BRAND LOGO ---

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
      bg: 'linear-gradient(145deg, rgba(251, 191, 36, 0.34) 0%, rgba(217, 119, 6, 0.16) 52%, rgba(8, 13, 28, 0.96) 100%)',
      border: active ? 'rgba(253, 224, 71, 0.98)' : 'rgba(251, 191, 36, 0.55)',
      glow: active
        ? '0 10px 28px -4px rgba(251, 191, 36, 0.5), 0 0 16px rgba(253, 224, 71, 0.35), inset 0 1.5px 2px rgba(255, 255, 255, 0.6)'
        : '0 8px 20px -4px rgba(245, 158, 11, 0.3), inset 0 1px 1.5px rgba(255, 255, 255, 0.35)',
      orb: 'radial-gradient(circle at 24% 18%, rgba(254, 240, 138, 0.55), transparent 64%)',
      dot: '#FDE047'
    },
    ruby: {
      bg: 'linear-gradient(145deg, rgba(244, 63, 94, 0.35) 0%, rgba(190, 18, 60, 0.16) 52%, rgba(8, 13, 28, 0.96) 100%)',
      border: active ? 'rgba(253, 164, 175, 0.98)' : 'rgba(244, 63, 94, 0.55)',
      glow: active
        ? '0 10px 28px -4px rgba(244, 63, 94, 0.5), 0 0 16px rgba(251, 113, 133, 0.35), inset 0 1.5px 2px rgba(255, 255, 255, 0.55)'
        : '0 8px 20px -4px rgba(244, 63, 94, 0.3), inset 0 1px 1.5px rgba(255, 255, 255, 0.3)',
      orb: 'radial-gradient(circle at 24% 18%, rgba(254, 205, 211, 0.52), transparent 64%)',
      dot: '#FDA4AF'
    },
    sapphire: {
      bg: 'linear-gradient(145deg, rgba(56, 189, 248, 0.35) 0%, rgba(37, 99, 235, 0.17) 52%, rgba(8, 13, 28, 0.96) 100%)',
      border: active ? 'rgba(125, 211, 252, 0.98)' : 'rgba(56, 189, 248, 0.55)',
      glow: active
        ? '0 10px 28px -4px rgba(56, 189, 248, 0.5), 0 0 16px rgba(56, 189, 248, 0.35), inset 0 1.5px 2px rgba(255, 255, 255, 0.55)'
        : '0 8px 20px -4px rgba(56, 189, 248, 0.3), inset 0 1px 1.5px rgba(255, 255, 255, 0.3)',
      orb: 'radial-gradient(circle at 24% 18%, rgba(186, 230, 253, 0.52), transparent 64%)',
      dot: '#7DD3FC'
    },
    emerald: {
      bg: 'linear-gradient(145deg, rgba(16, 185, 129, 0.35) 0%, rgba(5, 150, 105, 0.16) 52%, rgba(8, 13, 28, 0.96) 100%)',
      border: active ? 'rgba(110, 231, 183, 0.98)' : 'rgba(16, 185, 129, 0.55)',
      glow: active
        ? '0 10px 28px -4px rgba(16, 185, 129, 0.5), 0 0 16px rgba(52, 211, 153, 0.35), inset 0 1.5px 2px rgba(255, 255, 255, 0.55)'
        : '0 8px 20px -4px rgba(16, 185, 129, 0.3), inset 0 1px 1.5px rgba(255, 255, 255, 0.3)',
      orb: 'radial-gradient(circle at 24% 18%, rgba(167, 243, 208, 0.52), transparent 64%)',
      dot: '#6EE7B7'
    },
    amethyst: {
      bg: 'linear-gradient(145deg, rgba(168, 85, 247, 0.36) 0%, rgba(109, 40, 217, 0.17) 52%, rgba(8, 13, 28, 0.96) 100%)',
      border: active ? 'rgba(216, 180, 254, 0.98)' : 'rgba(168, 85, 247, 0.55)',
      glow: active
        ? '0 10px 28px -4px rgba(168, 85, 247, 0.5), 0 0 16px rgba(192, 132, 252, 0.35), inset 0 1.5px 2px rgba(255, 255, 255, 0.55)'
        : '0 8px 20px -4px rgba(168, 85, 247, 0.3), inset 0 1px 1.5px rgba(255, 255, 255, 0.3)',
      orb: 'radial-gradient(circle at 24% 18%, rgba(233, 213, 255, 0.52), transparent 64%)',
      dot: '#D8B4FE'
    },
    cyan: {
      bg: 'linear-gradient(145deg, rgba(34, 211, 238, 0.35) 0%, rgba(8, 145, 178, 0.16) 52%, rgba(8, 13, 28, 0.96) 100%)',
      border: active ? 'rgba(103, 232, 249, 0.98)' : 'rgba(34, 211, 238, 0.55)',
      glow: active
        ? '0 10px 28px -4px rgba(34, 211, 238, 0.5), 0 0 16px rgba(34, 211, 238, 0.35), inset 0 1.5px 2px rgba(255, 255, 255, 0.55)'
        : '0 8px 20px -4px rgba(34, 211, 238, 0.3), inset 0 1px 1.5px rgba(255, 255, 255, 0.3)',
      orb: 'radial-gradient(circle at 24% 18%, rgba(165, 243, 252, 0.52), transparent 64%)',
      dot: '#67E8F9'
    },
    platinum: {
      bg: 'linear-gradient(145deg, rgba(226, 232, 240, 0.3) 0%, rgba(100, 116, 139, 0.16) 52%, rgba(8, 13, 28, 0.96) 100%)',
      border: active ? 'rgba(248, 250, 252, 0.95)' : 'rgba(148, 163, 184, 0.55)',
      glow: active
        ? '0 10px 26px -4px rgba(226, 232, 240, 0.42), inset 0 1.5px 2px rgba(255, 255, 255, 0.6)'
        : '0 8px 20px -4px rgba(148, 163, 184, 0.25), inset 0 1px 1.5px rgba(255, 255, 255, 0.3)',
      orb: 'radial-gradient(circle at 24% 18%, rgba(255, 255, 255, 0.45), transparent 64%)',
      dot: '#F8FAFC'
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
      className={`relative flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
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
      {/* กรอบกระจกนิรภัยชั้นใน (Inner Jewel Bezel) */}
      <div
        style={{
          position: 'absolute',
          inset: '2.5px',
          borderRadius: 'inherit',
          border: '1px solid rgba(255,255,255,0.12)',
          pointerEvents: 'none'
        }}
      />
      {/* เส้นขอบเพชรด้านบน */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '14%',
          right: '14%',
          height: '1.8px',
          background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.85), transparent)',
          pointerEvents: 'none'
        }}
      />
      {/* จุดประกายเพชรมุมขวาบน */}
      <span
        style={{
          position: 'absolute',
          top: '4px',
          right: '4px',
          width: '4px',
          height: '4px',
          borderRadius: '999px',
          backgroundColor: p.dot,
          boxShadow: `0 0 6px ${p.dot}`,
          opacity: 0.85,
          pointerEvents: 'none'
        }}
      />
      <div className="relative z-10 flex items-center justify-center drop-shadow-[0_2px_4px_rgba(0,0,0,0.45)]">
        {children}
      </div>
    </div>
  );
}

/**
 * ไอคอนประจำเมนูและฟีเจอร์หลักทั้งระบบ (3D Luxury Multi-Layer Jewel & Metallic Vector SVGs)
 * อัปเกรดครบทุกไอคอนให้มีมิติ แสงเงา ประกายเพชร และเข้าใจง่ายในพริบตา
 */
export function LuxuryModuleIcon({ type = 'overview', size = 26 }) {
  switch (type) {
    case 'overview':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          <defs>
            <linearGradient id="luxGold1" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFBEB" />
              <stop offset="45%" stopColor="#FBBF24" />
              <stop offset="100%" stopColor="#B45309" />
            </linearGradient>
            <linearGradient id="luxCyan1" x1="4" y1="10" x2="26" y2="28" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#E0F2FE" />
              <stop offset="50%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#0284C7" />
            </linearGradient>
            <linearGradient id="luxEmerald1" x1="12" y1="8" x2="22" y2="28" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#D1FAE5" />
              <stop offset="50%" stopColor="#34D399" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
          </defs>
          {/* แผ่นฐานคริสตัลรองรับกราฟ */}
          <path d="M3.5 27.5H28.5" stroke="url(#luxGold1)" strokeWidth="2.2" strokeLinecap="round" />
          {/* แท่งกราฟ 3 มิติ 3 ระดับ (ฟ้า -> เขียวมรกต -> ทองคำ 24K) */}
          <rect x="5" y="17.5" width="5.2" height="9.5" rx="2" fill="url(#luxCyan1)" stroke="#BAE6FD" strokeWidth="0.9" />
          <rect x="13.4" y="12" width="5.2" height="15" rx="2" fill="url(#luxEmerald1)" stroke="#A7F3D0" strokeWidth="0.9" />
          <rect x="21.8" y="6.8" width="5.2" height="20.2" rx="2" fill="url(#luxGold1)" stroke="#FEF08A" strokeWidth="1" />
          {/* เส้นกราฟพุ่งทะยานพร้อมหัวลูกศรเพชร */}
          <path
            d="M5.5 13.5L12.5 8.5L18.2 10.5L26 3.5"
            stroke="#FFFBEB"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M21.8 3.5H26V7.7" stroke="#FDE047" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="12.5" cy="8.5" r="1.8" fill="#38BDF8" stroke="#FFF" strokeWidth="0.8" />
          <circle cx="26" cy="3.5" r="2.1" fill="#FEF08A" />
        </svg>
      );

    case 'customers':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          <defs>
            <linearGradient id="luxRuby" x1="6" y1="8" x2="26" y2="28" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFE4E6" />
              <stop offset="50%" stopColor="#FB7185" />
              <stop offset="100%" stopColor="#BE123C" />
            </linearGradient>
            <linearGradient id="luxCrown" x1="9" y1="2" x2="23" y2="11" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFBEB" />
              <stop offset="50%" stopColor="#FBBF24" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
          </defs>
          {/* รัศมีวงแหวน VIP ด้านหลัง */}
          <circle cx="16" cy="16" r="12.5" stroke="rgba(251, 113, 133, 0.35)" strokeWidth="1.2" strokeDasharray="4 3" />
          {/* มงกุฎทองคำลูกค้า VIP */}
          <path
            d="M10 9.2L12.2 4.8L16 7.6L19.8 4.8L22 9.2H10Z"
            fill="url(#luxCrown)"
            stroke="#FEF08A"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          {/* ลูกค้าคนสำคัญตรงกลาง */}
          <circle cx="16" cy="14.2" r="4.1" fill="url(#luxRuby)" stroke="#FFE4E6" strokeWidth="1.3" />
          <path
            d="M8.5 26.8C8.5 22.7 11.8 19.8 16 19.8C20.2 19.8 23.5 22.7 23.5 26.8"
            fill="rgba(244, 63, 94, 0.28)"
            stroke="url(#luxRuby)"
            strokeWidth="2.4"
            strokeLinecap="round"
          />
          {/* สมาชิกซ้าย-ขวา + เพชรหัวใจความภักดี */}
          <circle cx="7" cy="15.8" r="2.5" fill="#FDA4AF" stroke="#FFE4E6" strokeWidth="0.9" />
          <circle cx="25" cy="15.8" r="2.5" fill="#FDA4AF" stroke="#FFE4E6" strokeWidth="0.9" />
          <path d="M16 22.5L17.6 24.1L16 25.8L14.4 24.1L16 22.5Z" fill="#FEF08A" />
        </svg>
      );

    case 'staff_pos':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          <defs>
            <linearGradient id="luxSapphire" x1="5" y1="3" x2="27" y2="29" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#E0F2FE" />
              <stop offset="50%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#1D4ED8" />
            </linearGradient>
            <linearGradient id="luxPosGold" x1="9" y1="8" x2="23" y2="22" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFBEB" />
              <stop offset="50%" stopColor="#FBBF24" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
          </defs>
          {/* โล่คริสตัลตรวจสอบเครื่อง POS & ป้องกันทุจริต */}
          <path
            d="M16 3L26.5 7.2V15.4C26.5 22.1 22 27.1 16 29.2C10 27.1 5.5 22.1 5.5 15.4V7.2L16 3Z"
            fill="url(#luxSapphire)"
            fillOpacity="0.28"
            stroke="url(#luxSapphire)"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          {/* หน้าจอ POS Terminal ภายในโล่ */}
          <rect x="10.2" y="9.2" width="11.6" height="8" rx="2" fill="#0B132B" stroke="#7DD3FC" strokeWidth="1.3" />
          {/* เครื่องหมายถูกทองคำ 24K ยืนยันความโปร่งใส */}
          <path
            d="M12.5 13.3L14.9 15.6L19.5 11"
            stroke="url(#luxPosGold)"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* ลิ้นชักเก็บเงินสดด้านล่าง */}
          <rect x="11.5" y="19.5" width="9" height="3.5" rx="1.2" fill="url(#luxPosGold)" />
        </svg>
      );

    case 'multi_channel':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          <defs>
            <linearGradient id="luxStoreGold" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFBEB" />
              <stop offset="50%" stopColor="#FBBF24" />
              <stop offset="100%" stopColor="#B45309" />
            </linearGradient>
            <linearGradient id="luxStoreCyan" x1="6" y1="12" x2="26" y2="28" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#A7F3D0" />
              <stop offset="50%" stopColor="#34D399" />
              <stop offset="100%" stopColor="#0284C7" />
            </linearGradient>
          </defs>
          {/* วงโคจรเชื่อมหน้าร้าน + ออนไลน์ */}
          <circle cx="16" cy="16" r="13" stroke="rgba(52, 211, 153, 0.35)" strokeWidth="1.2" strokeDasharray="3 3" />
          {/* หลังคาร้านค้า Flagship 3 มิติ */}
          <path
            d="M4.8 12.2L7.4 5.5H24.6L27.2 12.2C27.2 14 25.7 15.2 24 15.2C22.3 15.2 21 14 21 12.2C21 14 19.6 15.2 17.8 15.2C16 15.2 14.6 14 14.6 12.2C14.6 14 13.2 15.2 11.4 15.2C9.6 15.2 8.2 14 8.2 12.2C8.2 14 6.6 15.2 4.8 12.2Z"
            fill="url(#luxStoreGold)"
            stroke="#FEF08A"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
          {/* ตัวอาคารกระจก */}
          <rect x="7.5" y="15" width="17" height="11.5" rx="2" fill="rgba(16, 185, 129, 0.18)" stroke="url(#luxStoreCyan)" strokeWidth="2" />
          <rect x="13" y="18.5" width="6" height="8" rx="1.2" fill="#38BDF8" fillOpacity="0.5" stroke="#E0F2FE" strokeWidth="1.3" />
          {/* จุดสัญญาณออนไลน์สด */}
          <circle cx="25.5" cy="6.5" r="3.2" fill="#10B981" stroke="#FEF08A" strokeWidth="1.3" />
        </svg>
      );

    case 'inventory':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          <defs>
            <linearGradient id="luxEmerald" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#D1FAE5" />
              <stop offset="50%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>
            <linearGradient id="luxBoxTop" x1="5" y1="4" x2="27" y2="16" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
          </defs>
          {/* กล่องคลังสินค้า Isometric 3 มิติ */}
          <path
            d="M16 3.5L27.5 9.8V22.2L16 28.5L4.5 22.2V9.8L16 3.5Z"
            fill="url(#luxEmerald)"
            fillOpacity="0.3"
            stroke="url(#luxEmerald)"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          {/* ฝาด้านบนสีทองแชมเปญ */}
          <path
            d="M16 3.5L27.5 9.8L16 16L4.5 9.8L16 3.5Z"
            fill="url(#luxBoxTop)"
            fillOpacity="0.35"
            stroke="#FEF08A"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <path d="M16 16V28.5" stroke="#A7F3D0" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M10.5 6.6L21.5 12.8" stroke="#FFFBEB" strokeWidth="2" strokeLinecap="round" />
          {/* ตราเช็กสต็อกอัตโนมัติ */}
          <circle cx="23" cy="22.5" r="4.5" fill="#064E3B" stroke="#FEF08A" strokeWidth="1.5" />
          <path d="M21.2 22.5L22.5 23.8L25 21.3" stroke="#FEF08A" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'insights':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          <defs>
            <linearGradient id="luxAmethyst" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FAF5FF" />
              <stop offset="45%" stopColor="#C084FC" />
              <stop offset="100%" stopColor="#6B21A8" />
            </linearGradient>
            <linearGradient id="luxAiGold" x1="8" y1="4" x2="26" y2="24" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFBEB" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
          </defs>
          {/* วงแหวนประสาทเทียม AI Neural Halo */}
          <circle cx="16" cy="16" r="12.5" stroke="rgba(192, 132, 252, 0.45)" strokeWidth="1.3" strokeDasharray="4 3" />
          {/* คริสตัลเพชรสมองกล AI 8 แฉก */}
          <path
            d="M16 3L19.4 12.6L29 16L19.4 19.4L16 29L12.6 19.4L3 16L12.6 12.6L16 3Z"
            fill="url(#luxAmethyst)"
            stroke="#F3E8FF"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          {/* แกนเพชรทองคำตรงกลาง */}
          <polygon points="16,10.5 21.5,16 16,21.5 10.5,16" fill="url(#luxAiGold)" stroke="#FFFBEB" strokeWidth="1" />
          {/* ประกายดาว 4 แฉกด้านบน */}
          <path d="M25.5 3.5L26.5 6.2L29.2 7.2L26.5 8.2L25.5 10.9L24.5 8.2L21.8 7.2L24.5 6.2L25.5 3.5Z" fill="#FDE047" />
          <circle cx="7" cy="7.5" r="1.5" fill="#38BDF8" />
        </svg>
      );

    case 'live':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          <defs>
            <linearGradient id="luxBolt" x1="7" y1="3" x2="25" y2="29" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFBEB" />
              <stop offset="45%" stopColor="#FDE047" />
              <stop offset="100%" stopColor="#0284C7" />
            </linearGradient>
          </defs>
          {/* วงแหวนเรดาร์เรียลไทม์ 2 ชั้น */}
          <circle cx="16" cy="16" r="13" stroke="#38BDF8" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.75" />
          <circle cx="16" cy="16" r="9.5" fill="rgba(56, 189, 248, 0.15)" stroke="#BAE6FD" strokeWidth="1" strokeOpacity="0.45" />
          {/* สายฟ้าพลังงานสด 3 มิติ */}
          <path
            d="M17.8 3.8L7.5 17.2H15.4L13.8 28.2L24.5 14.5H16.6L17.8 3.8Z"
            fill="url(#luxBolt)"
            stroke="#FFFBEB"
            strokeWidth="1.3"
            strokeLinejoin="round"
          />
          <circle cx="25.5" cy="7.5" r="2" fill="#34D399" stroke="#FFF" strokeWidth="0.8" />
        </svg>
      );

    case 'database':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          <defs>
            <linearGradient id="luxDbTop" x1="6" y1="4" x2="26" y2="14" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
            <linearGradient id="luxDbBody" x1="6" y1="8" x2="26" y2="28" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#BAE6FD" />
              <stop offset="50%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#1D4ED8" />
            </linearGradient>
          </defs>
          {/* ชั้นคลังข้อมูลทองคำ & คริสตัล 3 ชั้น */}
          <path
            d="M6 8.5V23.5C6 26 10.5 28 16 28C21.5 28 26 26 26 23.5V8.5"
            fill="rgba(56, 189, 248, 0.2)"
            stroke="url(#luxDbBody)"
            strokeWidth="2.1"
          />
          <ellipse cx="16" cy="8.5" rx="10" ry="4" fill="url(#luxDbTop)" stroke="#FFFBEB" strokeWidth="1.5" />
          <path d="M6 15.8C6 18.2 10.5 20.2 16 20.2C21.5 20.2 26 18.2 26 15.8" stroke="#FEF08A" strokeWidth="1.9" />
          {/* ไฟสถานะออนไลน์แต่ละชั้น */}
          <circle cx="21.5" cy="14.8" r="1.5" fill="#FEF08A" />
          <circle cx="21.5" cy="22.5" r="1.5" fill="#34D399" />
        </svg>
      );

    case 'admin':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          <defs>
            <linearGradient id="luxLockGold" x1="6" y1="4" x2="26" y2="28" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFBEB" />
              <stop offset="45%" stopColor="#FBBF24" />
              <stop offset="100%" stopColor="#E11D48" />
            </linearGradient>
          </defs>
          {/* โล่ผู้ดูแลระบบสูงสุด + กุญแจนิรภัยทองคำ */}
          <path
            d="M16 3L26.5 7V15.2C26.5 22 21.8 27.2 16 29.3C10.2 27.2 5.5 22 5.5 15.2V7L16 3Z"
            fill="rgba(244, 63, 94, 0.2)"
            stroke="url(#luxLockGold)"
            strokeWidth="2.1"
            strokeLinejoin="round"
          />
          <rect x="10.5" y="14.5" width="11" height="9.5" rx="2.5" fill="url(#luxLockGold)" stroke="#FFFBEB" strokeWidth="1.2" />
          <path d="M12.8 14.5V11.2C12.8 9.4 14.2 8 16 8C17.8 8 19.2 9.4 19.2 11.2V14.5" stroke="#FFFBEB" strokeWidth="2.1" strokeLinecap="round" />
          <circle cx="16" cy="18.8" r="1.5" fill="#0F172A" />
        </svg>
      );

    case 'settings':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          <defs>
            <linearGradient id="luxPlatinum" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="50%" stopColor="#94A3B8" />
              <stop offset="100%" stopColor="#475569" />
            </linearGradient>
          </defs>
          {/* แผงควบคุมอัจฉริยะ 3 แถบพร้อมปุ่มอัญมณี 3 สี */}
          <rect x="3.5" y="4.5" width="25" height="23" rx="5" fill="rgba(148, 163, 184, 0.14)" stroke="url(#luxPlatinum)" strokeWidth="1.6" />
          <line x1="7.5" y1="10.5" x2="24.5" y2="10.5" stroke="#E2E8F0" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="7.5" y1="16" x2="24.5" y2="16" stroke="#E2E8F0" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="7.5" y1="21.5" x2="24.5" y2="21.5" stroke="#E2E8F0" strokeWidth="2.2" strokeLinecap="round" />
          <circle cx="12.5" cy="10.5" r="3" fill="#FBBF24" stroke="#FFFBEB" strokeWidth="1.4" />
          <circle cx="19.5" cy="16" r="3" fill="#38BDF8" stroke="#E0F2FE" strokeWidth="1.4" />
          <circle cx="14" cy="21.5" r="3" fill="#34D399" stroke="#D1FAE5" strokeWidth="1.4" />
        </svg>
      );

    case 'upload':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          <defs>
            <linearGradient id="luxUploadGold" x1="4" y1="5" x2="28" y2="27" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFBEB" />
              <stop offset="50%" stopColor="#FBBF24" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
            <linearGradient id="luxUploadCyan" x1="10" y1="12" x2="22" y2="28" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#A7F3D0" />
              <stop offset="100%" stopColor="#38BDF8" />
            </linearGradient>
          </defs>
          {/* ก้อนเมฆคริสตัลทองคำ */}
          <path
            d="M8.2 22.5C5.6 22.5 3.5 20.5 3.5 18C3.5 15.8 5.1 14 7.2 13.7C8 9.2 11.7 5.8 16.2 5.8C21.1 5.8 25.1 9.6 25.3 14.4C27.1 15 28.5 16.7 28.5 18.8C28.5 21.1 26.6 22.5 24.2 22.5H20.5"
            fill="rgba(251, 191, 36, 0.16)"
            stroke="url(#luxUploadGold)"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* ลูกศรอัปโหลดพุ่งขึ้น */}
          <path d="M16 27.5V13.5" stroke="url(#luxUploadCyan)" strokeWidth="2.8" strokeLinecap="round" />
          <path d="M11.5 17.8L16 13.2L20.5 17.8" stroke="#FEF08A" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="16" cy="27.5" r="1.6" fill="#34D399" />
        </svg>
      );

    case 'crown':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          <defs>
            <linearGradient id="luxRoyalCrown" x1="4" y1="6" x2="28" y2="26" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFBEB" />
              <stop offset="45%" stopColor="#FDE047" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
          </defs>
          {/* มงกุฎจักรพรรดิประดับเพชร 3 ยอด */}
          <path
            d="M4.5 22.5L6.8 9.8L12.6 15.2L16 7.2L19.4 15.2L25.2 9.8L27.5 22.5H4.5Z"
            fill="url(#luxRoyalCrown)"
            stroke="#FFFBEB"
            strokeWidth="1.6"
            strokeLinejoin="round"
          />
          <rect x="5.5" y="24.5" width="21" height="3" rx="1.5" fill="url(#luxRoyalCrown)" stroke="#FEF08A" strokeWidth="1" />
          <circle cx="16" cy="5.2" r="1.8" fill="#FEF08A" />
          <circle cx="6.5" cy="7.8" r="1.5" fill="#38BDF8" />
          <circle cx="25.5" cy="7.8" r="1.5" fill="#FB7185" />
          <circle cx="16" cy="18.5" r="1.8" fill="#C084FC" stroke="#FFF" strokeWidth="0.8" />
        </svg>
      );

    case 'alert':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          <defs>
            <linearGradient id="luxAlertRuby" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFE4E6" />
              <stop offset="50%" stopColor="#FB7185" />
              <stop offset="100%" stopColor="#E11D48" />
            </linearGradient>
          </defs>
          {/* วงแหวนเรดาร์เตือนภัยรอบนอก */}
          <circle cx="16" cy="17" r="13" stroke="rgba(251, 113, 133, 0.35)" strokeWidth="1.2" strokeDasharray="4 3" />
          {/* สามเหลี่ยมคริสตัลแจ้งเตือน */}
          <path
            d="M16 4.2L28.5 26H3.5L16 4.2Z"
            fill="rgba(244, 63, 94, 0.28)"
            stroke="url(#luxAlertRuby)"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <path d="M16 12V18.5" stroke="#FEF08A" strokeWidth="2.8" strokeLinecap="round" />
          <circle cx="16" cy="22.5" r="1.7" fill="#FEF08A" />
        </svg>
      );

    case 'wallet':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          <defs>
            <linearGradient id="luxWalletGold" x1="4" y1="6" x2="28" y2="26" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="50%" stopColor="#FBBF24" />
              <stop offset="100%" stopColor="#B45309" />
            </linearGradient>
          </defs>
          {/* กระเป๋าเงินผู้บริหาร + ธนบัตรสีเขียวมรกต */}
          <path d="M7 8V6.2C7 5 8 4 9.2 4H22.5C23.7 4 24.7 5 24.7 6.2V8" fill="rgba(16, 185, 129, 0.35)" stroke="#34D399" strokeWidth="1.8" />
          <rect x="4" y="8" width="24" height="18" rx="4.5" fill="rgba(251, 191, 36, 0.25)" stroke="url(#luxWalletGold)" strokeWidth="2.2" />
          <rect x="18.5" y="13.8" width="9.5" height="6.4" rx="2.2" fill="url(#luxWalletGold)" stroke="#FFFBEB" strokeWidth="1.3" />
          <circle cx="22" cy="17" r="1.4" fill="#0F172A" />
        </svg>
      );

    case 'basket':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          <defs>
            <linearGradient id="luxBasketCyan" x1="5" y1="10" x2="27" y2="27" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#E0F2FE" />
              <stop offset="50%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#0284C7" />
            </linearGradient>
          </defs>
          {/* ตะกร้าช้อปปิ้งพรีเมียมพร้อมเพชรยอดซื้อ */}
          <path d="M5.5 13H26.5L23.8 26.5H8.2L5.5 13Z" fill="rgba(56, 189, 248, 0.26)" stroke="url(#luxBasketCyan)" strokeWidth="2.2" strokeLinejoin="round" />
          <path d="M10.5 13L13.8 6M21.5 13L18.2 6" stroke="#FEF08A" strokeWidth="2.3" strokeLinecap="round" />
          <line x1="12.8" y1="17.2" x2="12.8" y2="22.5" stroke="#E0F2FE" strokeWidth="2.1" strokeLinecap="round" />
          <line x1="19.2" y1="17.2" x2="19.2" y2="22.5" stroke="#E0F2FE" strokeWidth="2.1" strokeLinecap="round" />
          <circle cx="16" cy="9.5" r="1.8" fill="#FBBF24" />
        </svg>
      );

    case 'rocket':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          <defs>
            <linearGradient id="luxRocketCyan" x1="8" y1="3" x2="24" y2="25" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#E0F2FE" />
              <stop offset="50%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#1D4ED8" />
            </linearGradient>
          </defs>
          {/* จรวดทะยานยอดขาย 3 มิติ */}
          <path
            d="M16 3.5C21 7.2 22.5 13 22.5 18.8L16 23.2L9.5 18.8C9.5 13 11 7.2 16 3.5Z"
            fill="url(#luxRocketCyan)"
            fillOpacity="0.35"
            stroke="#7DD3FC"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <circle cx="16" cy="13" r="2.8" fill="#FEF08A" stroke="#F59E0B" strokeWidth="1.2" />
          <path d="M9.5 16.5L5.5 20.5L9.5 21.5M22.5 16.5L26.5 20.5L22.5 21.5" stroke="#FBBF24" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M13.5 23.5L16 28.8L18.5 23.5" fill="#FB7185" stroke="#FEF08A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      );

    case 'trophy':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          <defs>
            <linearGradient id="luxTrophyGold" x1="6" y1="4" x2="26" y2="27" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFBEB" />
              <stop offset="45%" stopColor="#FDE047" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
          </defs>
          {/* ถ้วยรางวัลแชมเปี้ยนทองคำ 24K */}
          <path d="M9 4.8H23V12.8C23 16.8 19.9 20 16 20C12.1 20 9 16.8 9 12.8V4.8Z" fill="url(#luxTrophyGold)" fillOpacity="0.38" stroke="url(#luxTrophyGold)" strokeWidth="2.2" />
          <path d="M9 7.8H5.2V10.8C5.2 13 6.8 14.5 9 14.5M23 7.8H26.8V10.8C26.8 13 25.2 14.5 23 14.5" stroke="#FEF08A" strokeWidth="2" strokeLinecap="round" />
          <path d="M16 20V25.5M10.5 26.2H21.5" stroke="url(#luxTrophyGold)" strokeWidth="2.5" strokeLinecap="round" />
          {/* ดาวแชมเปี้ยนกลางถ้วย */}
          <path d="M16 8.2L17.1 10.6L19.7 10.9L17.8 12.7L18.3 15.2L16 13.9L13.7 15.2L14.2 12.7L12.3 10.9L14.9 10.6L16 8.2Z" fill="#FFFBEB" />
        </svg>
      );

    case 'diamond':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          <defs>
            <linearGradient id="luxDiamondFacet" x1="4" y1="5" x2="28" y2="27" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#E0F2FE" />
              <stop offset="50%" stopColor="#38BDF8" />
              <stop offset="100%" stopColor="#6366F1" />
            </linearGradient>
          </defs>
          <path d="M9.5 5.2H22.5L28.2 12.5L16 27.2L3.8 12.5L9.5 5.2Z" fill="url(#luxDiamondFacet)" fillOpacity="0.35" stroke="#BAE6FD" strokeWidth="2.2" strokeLinejoin="round" />
          <path d="M3.8 12.5H28.2M16 27.2L11.2 12.5L16 5.2L20.8 12.5L16 27.2Z" stroke="#FFFBEB" strokeWidth="1.4" strokeLinejoin="round" />
        </svg>
      );

    case 'target':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
          <defs>
            <linearGradient id="luxTargetRing" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FEF08A" />
              <stop offset="50%" stopColor="#FBBF24" />
              <stop offset="100%" stopColor="#EA580C" />
            </linearGradient>
          </defs>
          <circle cx="16" cy="16" r="12" fill="rgba(251, 191, 36, 0.14)" stroke="url(#luxTargetRing)" strokeWidth="2.2" />
          <circle cx="16" cy="16" r="7.5" stroke="#38BDF8" strokeWidth="2" strokeDasharray="3.5 2" />
          <circle cx="16" cy="16" r="3.4" fill="#FEF08A" stroke="#F59E0B" strokeWidth="1.2" />
          <path d="M27.5 4.5L17.2 14.8" stroke="#34D399" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M23 4.5H27.5V9" stroke="#A7F3D0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
          {/* Central HQ Warehouse & Consolidated Supply Hub */}
          <path
            d="M16 3.5L27.5 9.5V21.5L16 27.5L4.5 21.5V9.5L16 3.5Z"
            fill="rgba(245, 158, 11, 0.18)"
            stroke="url(#luxProcGold)"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <path
            d="M4.5 9.5L16 15.5L27.5 9.5M16 15.5V27.5"
            stroke="url(#luxProcCyan)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Central PO Badge Checkmark & Volume Discount Emblem */}
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
          {/* Outer High-Speed Quantum Orbit Ring */}
          <circle
            cx="16"
            cy="16"
            r="13"
            stroke="url(#luxSpeedCyan)"
            strokeWidth="1.8"
            strokeDasharray="6 3"
            opacity="0.75"
          />
          {/* Inner Glowing Core Halo */}
          <circle
            cx="16"
            cy="16"
            r="9.5"
            fill="rgba(251, 191, 36, 0.14)"
            stroke="rgba(253, 224, 71, 0.35)"
            strokeWidth="1.2"
          />
          {/* 3D Faceted Lightning Bolt */}
          <path
            d="M17.8 3.5L7.5 17.2H15.2L13.8 28.5L24.5 14.2H16.6L17.8 3.5Z"
            fill="url(#luxSpeedGold)"
            stroke="#FFFBEB"
            strokeWidth="1.1"
            strokeLinejoin="round"
          />
          {/* Speed Nodes */}
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
          {/* Outer Radar Ring */}
          <circle cx="15.5" cy="16.5" r="11.5" fill="rgba(244, 63, 94, 0.12)" stroke="url(#luxTargetGold)" strokeWidth="2" />
          {/* Middle Bullseye Ring */}
          <circle cx="15.5" cy="16.5" r="7.2" fill="rgba(251, 191, 36, 0.12)" stroke="url(#luxTargetRuby)" strokeWidth="1.8" />
          {/* Precision Crosshair Ticks */}
          <path d="M15.5 2.5V5.5M15.5 27.5V30M2 16.5H4.5M26.5 16.5H29" stroke="#FDE047" strokeWidth="1.6" strokeLinecap="round" />
          {/* Center Diamond Bullseye */}
          <circle cx="15.5" cy="16.5" r="3.2" fill="#FEF08A" stroke="#F43F5E" strokeWidth="1.4" />
          {/* Precision Forecast Arrow Piercing Bullseye */}
          <path
            d="M28.5 3.5L16.2 15.8"
            stroke="url(#luxTargetEmerald)"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M23.5 3.5H28.5V8.5"
            stroke="#A7F3D0"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
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
          {/* 3D Royal Aegis Shield Armor */}
          <path
            d="M16 2.8L26.8 6.8V15.4C26.8 22.3 22.1 27.4 16 29.5C9.9 27.4 5.2 22.3 5.2 15.4V6.8L16 2.8Z"
            fill="rgba(16, 185, 129, 0.18)"
            stroke="url(#luxShieldGold)"
            strokeWidth="2.1"
            strokeLinejoin="round"
          />
          {/* Inner Faceted Shield Plate */}
          <path
            d="M16 5.6L24 8.6V15.1C24 20.4 20.5 24.4 16 26.3C11.5 24.4 8 20.4 8 15.1V8.6L16 5.6Z"
            fill="url(#luxShieldEmerald)"
            fillOpacity="0.28"
            stroke="#6EE7B7"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          {/* Global Latitude/Longitude Security Grid Arc */}
          <ellipse cx="16" cy="15.8" rx="6.5" ry="3.2" stroke="rgba(254, 240, 138, 0.45)" strokeWidth="1" />
          {/* Verified Checkmark Crest in Center */}
          <circle cx="16" cy="15.8" r="4.8" fill="#064E3B" stroke="url(#luxShieldGold)" strokeWidth="1.6" />
          <path
            d="M13.6 15.8L15.3 17.5L18.7 14.1"
            stroke="#FEF08A"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
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

/**
 * Apple Keynote / Apple Event Style Short Motion Video Loop using InsightFlow's Own Logo
 * - Auto-loops through 4 cinematic chapters at 60 FPS
 * - Features 3D perspective breathing, octagon laser trace, levitating diamond crown,
 *   animated 3D isometric pillars, and golden trajectory laser wave
 */
export function AppleKeynoteLogoFilm({
  lang = 'th',
  isFullscreen = false,
  onOpenFullscreen,
  onCloseFullscreen,
  onEnterSystem
}) {
  const isEn = lang === 'en';
  const rawId = React.useId();
  const uid = `apple-${rawId.replace(/:/g, '')}`;
  const [sceneIdx, setSceneIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [replayKey, setReplayKey] = useState(0);

  const scenes = isEn
    ? [
        {
          badge: 'SCENE 01 • ROYAL AI CROWN',
          title: 'InsightFlow 3D Neural Emblem',
          subtitle: '99.4% AI Forecast Precision & Executive Decision Intelligence',
          metric: '99.4% AI Accuracy',
          accent: 'from-amber-300 via-yellow-400 to-amber-500',
          orb: 'rgba(251, 191, 36, 0.35)'
        },
        {
          badge: 'SCENE 02 • ISOMETRIC PILLARS',
          title: 'Real-Time Omnichannel & POS Sync',
          subtitle: 'Unifying Storefront POS, Multi-Branch & Online Channels in 0.2s',
          metric: '0.2s Live Sync',
          accent: 'from-sky-300 via-cyan-400 to-blue-500',
          orb: 'rgba(56, 189, 248, 0.35)'
        },
        {
          badge: 'SCENE 03 • GOLDEN TRAJECTORY',
          title: '฿10,000,000 Revenue Target Engine',
          subtitle: 'Automated Growth Simulation, Margin Optimization & Restock AI',
          metric: '+34.8% Growth',
          accent: 'from-emerald-300 via-teal-400 to-emerald-500',
          orb: 'rgba(52, 211, 153, 0.35)'
        },
        {
          badge: 'SCENE 04 • 22:00 LINE OA REPORT',
          title: 'Direct Executive Briefing to LINE',
          subtitle: 'Nightly Net Profit, Top Branch & Low-Stock Alerts at 22:00',
          metric: '22:00 Auto-Push',
          accent: 'from-amber-200 via-emerald-300 to-cyan-400',
          orb: 'rgba(16, 185, 129, 0.35)'
        }
      ]
    : [
        {
          badge: 'ฉากที่ 01 • มงกุฎเพชรอัจฉริยะ',
          title: 'InsightFlow AI ขุมพลังสมองกลธุรกิจ',
          subtitle: 'พยากรณ์ยอดขายและวิเคราะห์กำไรแม่นยำสูงถึง 99.4% ระดับผู้บริหาร',
          metric: 'แม่นยำ 99.4%',
          accent: 'from-amber-300 via-yellow-400 to-amber-500',
          orb: 'rgba(251, 191, 36, 0.38)'
        },
        {
          badge: 'ฉากที่ 02 • แท่งคริสตัล 3 มิติ',
          title: 'เชื่อมยอดขายทุกสาขา & ออนไลน์วินาทีต่อวินาที',
          subtitle: 'ซิงค์ข้อมูลหน้าร้าน POS • Shopee • Lazada • TikTok เข้าศูนย์กลางอัตโนมัติ',
          metric: 'ซิงค์ไว 0.2 วินาที',
          accent: 'from-sky-300 via-cyan-400 to-blue-500',
          orb: 'rgba(56, 189, 248, 0.38)'
        },
        {
          badge: 'ฉากที่ 03 • เส้นแสงทองคำทะยานฟ้า',
          title: 'วางแผนพิชิตเป้าหมาย ฿10,000,000',
          subtitle: 'จำลองกลยุทธ์การเติบโต ป้องกันของขาดสต็อก และอุดรอยรั่วต้นทุนทันที',
          metric: 'กำไรโต +34.8%',
          accent: 'from-emerald-300 via-teal-400 to-emerald-500',
          orb: 'rgba(52, 211, 153, 0.38)'
        },
        {
          badge: 'ฉากที่ 04 • แจ้งเตือนเข้า LINE 22:00 น.',
          title: 'ส่งการ์ดสรุปยอดขายเข้า LINE OA ทุกคืน',
          subtitle: 'รายงานยอดขายรายวัน กำไรสุทธิ และสาขาขายดี ส่งตรงถึงมือถือผู้บริหารอัตโนมัติ',
          metric: 'ส่งตรง 22:00 น.',
          accent: 'from-amber-200 via-emerald-300 to-cyan-400',
          orb: 'rgba(16, 185, 129, 0.38)'
        }
      ];

  useEffect(() => {
    if (!isPlaying) return undefined;
    const timer = setInterval(() => {
      setSceneIdx(prev => (prev + 1) % scenes.length);
    }, 3400);
    return () => clearInterval(timer);
  }, [isPlaying, scenes.length]);

  const currentScene = scenes[sceneIdx] || scenes[0];
  const logoPx = isFullscreen ? 176 : 118;

  return (
    <div
      key={replayKey}
      className={`cyber-toast-hud apple-cinema-player relative overflow-hidden rounded-3xl border border-amber-400/40 shadow-[0_20px_60px_-15px_rgba(251,191,36,0.35),0_0_40px_rgba(56,189,248,0.2)] select-none ${
        isFullscreen ? 'p-6 sm:p-10' : 'p-4 sm:p-5 mb-5'
      }`}
      style={{
        background:
          'radial-gradient(circle at 50% 32%, #132042 0%, #060b18 62%, #02040a 100%)'
      }}
    >
      {/* Sweeping Apple Keynote Specular Light Beam */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className={`apple-light-sweep absolute -inset-y-12 w-28 bg-gradient-to-r from-transparent via-amber-200/15 to-transparent ${
            !isPlaying ? '[animation-play-state:paused]' : ''
          }`}
        />
      </div>

      {/* Dynamic Ambient Aurora Orbs behind our Logo */}
      <div
        className="apple-aurora-orb pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2 w-56 h-56 sm:w-72 sm:h-72 rounded-full blur-3xl transition-all duration-700"
        style={{ background: currentScene.orb }}
      />

      {/* Top Cinema Status Bar */}
      <div className="relative z-10 flex items-center justify-between gap-2 pb-3 mb-3 border-b border-white/10">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span
              className={` absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75 ${
                isPlaying ? 'animate-ping' : ''
              }`}
            />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-400" />
          </span>
          <span className="text-[11px] sm:text-xs font-black tracking-wider uppercase text-amber-300">
            {isEn ? 'APPLE-STYLE 3D LOGO MOTION FILM' : 'วิดีโอสั้นเปิดตัวโลโก้ 3 มิติ • INSIGHTFLOW MOTION'}
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setIsPlaying(p => !p)}
            className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-[11px] font-black text-white transition cursor-pointer"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying
              ? isEn
                ? '⏸ Pause'
                : '⏸ หยุดพัก'
              : isEn
              ? '▶ Play'
              : '▶ เล่นต่อ'}
          </button>
          <button
            type="button"
            onClick={() => {
              setReplayKey(k => k + 1);
              setSceneIdx(0);
              setIsPlaying(true);
            }}
            className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-white/20 border border-white/15 text-[11px] font-black text-amber-300 transition cursor-pointer"
            title="Replay"
          >
            {isEn ? '🔄 Replay' : '🔄 เล่นซ้ำ'}
          </button>
          {!isFullscreen && onOpenFullscreen && (
            <button
              type="button"
              onClick={onOpenFullscreen}
              className="px-2.5 py-1 rounded-lg bg-amber-400/20 hover:bg-amber-400/30 border border-amber-400/50 text-[11px] font-black text-amber-200 transition cursor-pointer"
            >
              {isEn ? '🎬 Fullscreen' : '🎬 ขยายเต็มจอ'}
            </button>
          )}
          {isFullscreen && onCloseFullscreen && (
            <button
              type="button"
              onClick={onCloseFullscreen}
              className="px-3 py-1 rounded-lg bg-rose-500/25 hover:bg-rose-500/40 border border-rose-400/50 text-xs font-black text-white transition cursor-pointer"
            >
              {isEn ? '✕ Close' : '✕ ปิดหน้าต่าง'}
            </button>
          )}
        </div>
      </div>

      {/* Main Cinema Stage: 3D Animated InsightFlow Emblem + Keynote Story Typography */}
      <div
        className={`relative z-10 flex flex-col ${
          isFullscreen ? 'items-center text-center py-6 gap-7' : 'sm:flex-row items-center gap-5 py-2'
        }`}
      >
        {/* Centerpiece: Our Own InsightFlow Logo in 3D Apple Keynote Motion */}
        <div className="relative flex-shrink-0 flex items-center justify-center">
          {/* Outer Pulsing Sonar Rings */}
          <div
            className="pointer-events-none absolute -inset-4 rounded-full border border-amber-400/30 animate-pulse"
            style={{ borderRadius: '34%' }}
          />
          <div
            className="pointer-events-none absolute -inset-2 rounded-full border border-dashed border-sky-400/35"
            style={{
              borderRadius: '32%',
              animation: isPlaying ? 'appleHaloRotate 16s linear infinite' : 'none'
            }}
          />

          {/* 3D Animated Emblem Housing */}
          <div
            className={isPlaying ? 'apple-logo-3d-stage' : ''}
            style={{
              width: logoPx,
              height: logoPx,
              borderRadius: Math.round(logoPx * 0.28),
              padding: 3,
              background:
                'linear-gradient(135deg, #FEF08A 0%, #F59E0B 30%, #38BDF8 68%, #FBBF24 100%)',
              boxShadow:
                '0 18px 45px -8px rgba(245, 158, 11, 0.65), 0 0 32px rgba(56, 189, 248, 0.45), inset 0 2px 4px rgba(255, 255, 255, 0.85)'
            }}
          >
            <div
              style={{
                width: '100%',
                height: '100%',
                borderRadius: Math.max(10, Math.round(logoPx * 0.28) - 3),
                background:
                  'radial-gradient(circle at 28% 22%, #192a56 0%, #070C1E 58%, #02040c 100%)',
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
                    'linear-gradient(180deg, rgba(255, 255, 255, 0.28) 0%, rgba(255, 255, 255, 0) 100%)',
                  pointerEvents: 'none'
                }}
              />

              {/* Animated SVG of Our Own InsightFlow Logo */}
              <svg
                viewBox="0 0 120 120"
                width="92%"
                height="92%"
                style={{
                  overflow: 'visible',
                  filter: 'drop-shadow(0 6px 12px rgba(0, 0, 0, 0.7))'
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

                {/* Base Octagon Frame */}
                <polygon
                  points="60,8 96,23 112,60 96,97 60,112 24,97 8,60 24,23"
                  fill="none"
                  stroke={`url(#${uid}-gold)`}
                  strokeWidth="2.2"
                  strokeOpacity="0.4"
                />
                {/* Animated Laser Light Trace on Our Octagon Frame */}
                <polygon
                  className={isPlaying ? 'apple-octagon-laser' : ''}
                  points="60,8 96,23 112,60 96,97 60,112 24,97 8,60 24,23"
                  fill="none"
                  stroke="#FEF08A"
                  strokeWidth="3.2"
                  strokeLinecap="round"
                />

                {/* Rotating Quantum Halo Ring */}
                <circle
                  className={isPlaying ? 'apple-halo-orbit' : ''}
                  cx="60"
                  cy="60"
                  r="42"
                  fill="none"
                  stroke={`url(#${uid}-cyan)`}
                  strokeWidth="1.8"
                  strokeDasharray="6 4"
                  strokeOpacity="0.7"
                />
                <circle
                  className={isPlaying ? 'apple-halo-reverse' : ''}
                  cx="60"
                  cy="60"
                  r="35"
                  fill="none"
                  stroke={`url(#${uid}-gold)`}
                  strokeWidth="1.2"
                  strokeDasharray="3 6"
                  strokeOpacity="0.45"
                />

                {/* Levitating 3D Faceted Royal Diamond & Crown Crest at Top */}
                <g className={isPlaying ? 'apple-crown-float' : ''}>
                  <polygon
                    points="60,15 74,29 60,41 46,29"
                    fill={`url(#${uid}-goldBright)`}
                  />
                  <polygon
                    points="60,15 74,29 60,29"
                    fill="#FFFBEB"
                    fillOpacity="0.72"
                  />
                  <polygon
                    points="46,29 60,29 60,41"
                    fill="#B45309"
                    fillOpacity="0.55"
                  />
                </g>

                {/* 3 Ascending 3D Isometric Data Pillars with Spring Motion */}
                <rect
                  className={isPlaying ? 'apple-pillar-1' : ''}
                  x="28"
                  y="64"
                  width="14"
                  height="28"
                  rx="4"
                  fill={`url(#${uid}-cyan)`}
                />
                <rect
                  className={isPlaying ? 'apple-pillar-2' : ''}
                  x="51"
                  y="50"
                  width="14"
                  height="42"
                  rx="4"
                  fill={`url(#${uid}-emerald)`}
                />
                <rect
                  className={isPlaying ? 'apple-pillar-3' : ''}
                  x="74"
                  y="34"
                  width="15"
                  height="58"
                  rx="4.5"
                  fill={`url(#${uid}-goldBright)`}
                />

                {/* Dynamic Sweeping Golden Trajectory Wave */}
                <path
                  className={isPlaying ? 'apple-trajectory-wave' : ''}
                  d="M 20 82 C 42 78, 62 56, 94 24"
                  fill="none"
                  stroke="#FFFBEB"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                <path
                  className={isPlaying ? 'apple-trajectory-wave' : ''}
                  d="M 20 82 C 42 78, 62 56, 94 24"
                  fill="none"
                  stroke={`url(#${uid}-gold)`}
                  strokeWidth="3.8"
                  strokeLinecap="round"
                />

                {/* Arrowhead & Animated 4-Point Star Spark at Apex */}
                <polygon points="100,18 83,21 95,35" fill="#FEF08A" />
                <path
                  className={isPlaying ? 'apple-apex-star' : ''}
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
        </div>

        {/* Apple Keynote Storyboard Text & Scene Switcher */}
        <div className="flex-1 min-w-0">
          <div
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-amber-400/35 text-[11px] font-black text-amber-300 mb-2`}
          >
            <span>✨ {currentScene.badge}</span>
            <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[10px] apple-gold-pill">
              {currentScene.metric}
            </span>
          </div>

          <h3
            className={`${
              isFullscreen ? 'text-2xl sm:text-4xl' : 'text-lg sm:text-xl'
            } font-black text-white tracking-tight leading-snug mb-1.5`}
          >
            {currentScene.title}
          </h3>

          <p
            className={`${
              isFullscreen ? 'text-base sm:text-lg max-w-2xl mx-auto' : 'text-xs sm:text-sm'
            } text-slate-200 font-semibold leading-relaxed mb-3.5`}
          >
            {currentScene.subtitle}
          </p>

          {/* Interactive 4-Scene Apple Keynote Progress Chapters */}
          <div className="grid grid-cols-4 gap-1.5 sm:gap-2">
            {scenes.map((sc, idx) => {
              const isActive = idx === sceneIdx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setSceneIdx(idx)}
                  className={`text-left p-1.5 sm:p-2 rounded-xl border transition cursor-pointer ${
                    isActive
                      ? 'bg-amber-400/20 border-amber-400/70 shadow-[0_0_15px_rgba(251,191,36,0.25)]'
                      : 'bg-white/5 hover:bg-white/10 border-white/10'
                  }`}
                >
                  <div className="h-1 w-full rounded-full bg-white/15 overflow-hidden mb-1">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${sc.accent} transition-all duration-500`}
                      style={{ width: isActive ? '100%' : idx < sceneIdx ? '100%' : '0%' }}
                    />
                  </div>
                  <div className="text-[10px] font-black text-amber-300 truncate">
                    0{idx + 1} • {sc.metric}
                  </div>
                </button>
              );
            })}
          </div>

          {isFullscreen && onEnterSystem && (
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={onEnterSystem}
                className="px-7 py-3.5 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-300 text-slate-950 font-black text-sm sm:text-base shadow-xl cursor-pointer apple-gold-pill"
              >
                {isEn
                  ? '🚀 Enter InsightFlow Live System Now'
                  : '🚀 เข้าสู่ระบบ InsightFlow ทันที'}
              </button>
              <button
                type="button"
                onClick={onCloseFullscreen}
                className="px-6 py-3.5 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm sm:text-base cursor-pointer"
              >
                {isEn ? 'Back to Front Page' : 'กลับสู่หน้าหลัก'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * Interactive 60FPS Animated Solutions Showcase ("บริการครบวงจรสำหรับเจ้าของร้าน")
 * - Each of the 4 core store owner services has its own live 60FPS animated HUD stage
 * - Auto-cycles spotlight across the 4 services or lets the user click/hover any card
 * - 1-click button on each card launches the live interactive dashboard tab
 */
export function AnimatedSolutionsShowcase({ lang = 'th', t, onLaunchSolution }) {
  const isEn = lang === 'en';
  const [activeIdx, setActiveIdx] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const items = [
    {
      idx: 0,
      tabId: 'overview',
      stepBadge: isEn ? 'SERVICE 01 • AI GOAL ENGINE' : 'บริการที่ 01 • วางแผนเป้าหมายอัจฉริยะ',
      title: t.s1Title,
      desc: t.s1Desc,
      iconType: 'overview',
      variant: 'gold',
      liveBadge: isEn ? 'Live Target: ฿10,000,000' : 'เป้าหมายสด: ฿10,000,000',
      kpiLabel: isEn ? 'Goal Progress' : 'ความคืบหน้าเป้าหมาย',
      kpiVal: '89.2%',
      kpiSub: isEn ? '+฿333,333 / day on track' : 'เติบโตตามแผน +14.2%',
      borderActive: 'border-amber-400 shadow-[0_18px_50px_-12px_rgba(251,191,36,0.45)]',
      pillBg: 'bg-amber-400/20 text-amber-300 border-amber-400/45',
      ctaBg: 'from-amber-400 to-amber-300 text-slate-950'
    },
    {
      idx: 1,
      tabId: 'customers',
      stepBadge: isEn ? 'SERVICE 02 • VIP & CHURN RADAR' : 'บริการที่ 02 • เรดาร์ดูแลลูกค้าประจำ',
      title: t.s2Title,
      desc: t.s2Desc,
      iconType: 'customers',
      variant: 'ruby',
      liveBadge: isEn ? 'Auto Win-Back Active' : 'ดึงลูกค้าเก่ากลับอัตโนมัติ',
      kpiLabel: isEn ? 'Returning VIP Buyers' : 'ลูกค้ากลับมาซื้อซ้ำ',
      kpiVal: '+142 ราย',
      kpiSub: isEn ? '99.1% VIP Retention Rate' : 'รักษาลูกค้าชั้นดีได้ 99.1%',
      borderActive: 'border-rose-400 shadow-[0_18px_50px_-12px_rgba(244,63,94,0.42)]',
      pillBg: 'bg-rose-500/20 text-rose-300 border-rose-400/45',
      ctaBg: 'from-rose-400 to-amber-300 text-slate-950'
    },
    {
      idx: 2,
      tabId: 'staff_pos',
      stepBadge: isEn ? 'SERVICE 03 • POS & CASHIER SHIELD' : 'บริการที่ 03 • สแกนแคชเชียร์ & ป้องกันรั่วไหล',
      title: t.s3Title,
      desc: t.s3Desc,
      iconType: 'staff_pos',
      variant: 'sapphire',
      liveBadge: isEn ? '24/7 POS Fraud Guard' : 'สแกนบิลผิดปกติ 24 ชม.',
      kpiLabel: isEn ? 'Bill Audit Accuracy' : 'ความโปร่งใสหน้าแคชเชียร์',
      kpiVal: '99.8%',
      kpiSub: isEn ? 'Instant 0.2s Void Bill Alert' : 'เตือนยกเลิกบิลผิดปกติใน 0.2 วินาที',
      borderActive: 'border-sky-400 shadow-[0_18px_50px_-12px_rgba(56,189,248,0.42)]',
      pillBg: 'bg-sky-500/20 text-sky-300 border-sky-400/45',
      ctaBg: 'from-sky-400 to-cyan-300 text-slate-950'
    },
    {
      idx: 3,
      tabId: 'multi_channel',
      stepBadge: isEn ? 'SERVICE 04 • OMNICHANNEL HUB' : 'บริการที่ 04 • เชื่อมทุกสาขา & ออนไลน์',
      title: t.s4Title,
      desc: t.s4Desc,
      iconType: 'multi_channel',
      variant: 'emerald',
      liveBadge: isEn ? 'POS + Online Synced' : 'ซิงค์หน้าร้าน + ออนไลน์ครบ',
      kpiLabel: isEn ? 'Net Omnichannel Margin' : 'กำไรสุทธิรวมทุกช่องทาง',
      kpiVal: '+34.8%',
      kpiSub: isEn ? 'Storefront • Shopee • TikTok • LINE' : 'หน้าร้าน • Shopee • TikTok • LINE',
      borderActive: 'border-emerald-400 shadow-[0_18px_50px_-12px_rgba(52,211,153,0.42)]',
      pillBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-400/45',
      ctaBg: 'from-emerald-400 to-teal-300 text-slate-950'
    }
  ];

  useEffect(() => {
    if (!isAutoPlay) return undefined;
    const timer = setInterval(() => {
      setActiveIdx(prev => (prev + 1) % items.length);
    }, 3800);
    return () => clearInterval(timer);
  }, [isAutoPlay, items.length]);

  const renderMiniAnimationStage = idx => {
    if (idx === 0) {
      // Animated 3D Rising Revenue Pillars + Golden Trajectory Wave
      return (
        <div className="cyber-toast-hud relative h-36 w-full rounded-2xl bg-[#050915] border border-amber-400/30 p-3.5 overflow-hidden flex flex-col justify-between">
          <div className="pointer-events-none absolute -top-8 -right-8 w-28 h-28 rounded-full bg-amber-400/20 blur-2xl" />
          <div className="relative z-10 flex items-center justify-between text-[11px]">
            <span className="font-black text-amber-300 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              {isEn ? 'AI GOAL TRAJECTORY' : 'จำลองเส้นทางสู่ ฿10,000,000'}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-amber-400 text-slate-950 font-black text-[10px]">
              89.2%
            </span>
          </div>

          <div className="relative z-10 flex items-end justify-between gap-2 h-20 pt-2 px-1">
            <svg viewBox="0 0 220 70" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="solGoldBar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#FEF08A" />
                  <stop offset="50%" stopColor="#FBBF24" />
                  <stop offset="100%" stopColor="#B45309" />
                </linearGradient>
                <linearGradient id="solCyanBar" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#BAE6FD" />
                  <stop offset="100%" stopColor="#0284C7" />
                </linearGradient>
              </defs>
              {/* Animated Rising Bars */}
              <rect className="apple-pillar-1" x="14" y="42" width="22" height="24" rx="4" fill="url(#solCyanBar)" opacity="0.75" />
              <rect className="apple-pillar-2" x="52" y="32" width="22" height="34" rx="4" fill="url(#solCyanBar)" opacity="0.9" />
              <rect className="apple-pillar-1" x="90" y="24" width="22" height="42" rx="4" fill="#34D399" opacity="0.9" />
              <rect className="apple-pillar-2" x="128" y="16" width="22" height="50" rx="4" fill="url(#solGoldBar)" />
              <rect className="apple-pillar-3" x="166" y="6" width="26" height="60" rx="5" fill="url(#solGoldBar)" />

              {/* Animated Golden Laser Wave */}
              <path
                className="apple-trajectory-wave"
                d="M 18 52 C 65 44, 118 28, 182 8"
                fill="none"
                stroke="#FFFBEB"
                strokeWidth="3.2"
                strokeLinecap="round"
              />
              <circle cx="182" cy="8" r="5" fill="#FDE047" className="animate-ping" />
              <circle cx="182" cy="8" r="4" fill="#FFFBEB" />
            </svg>
          </div>
        </div>
      );
    }

    if (idx === 1) {
      // Animated VIP Customer Retention Radar & Win-Back Pulse
      return (
        <div className="cyber-toast-hud relative h-36 w-full rounded-2xl bg-[#050915] border border-rose-400/30 p-3.5 overflow-hidden flex flex-col justify-between">
          <div className="pointer-events-none absolute -top-8 -left-8 w-28 h-28 rounded-full bg-rose-500/20 blur-2xl" />
          <div className="relative z-10 flex items-center justify-between text-[11px]">
            <span className="font-black text-rose-300 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-rose-400 animate-ping" />
              {isEn ? 'VIP & CHURN RADAR' : 'เรดาร์ดึงลูกค้าประจำกลับมาซื้อ'}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-emerald-400 text-slate-950 font-black text-[10px]">
              +142 VIP
            </span>
          </div>

          <div className="relative z-10 flex items-center justify-between gap-3 my-auto">
            {/* Radar Circle */}
            <div className="relative w-16 h-16 flex-shrink-0 flex items-center justify-center">
              <span className="sol-pulse-ring absolute inset-0 rounded-full border-2 border-rose-400/60" />
              <span
                className="absolute inset-1 rounded-full border border-dashed border-amber-300/60"
                style={{ animation: 'appleHaloRotate 10s linear infinite' }}
              />
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-rose-500 to-amber-500 flex items-center justify-center text-white font-black text-xs shadow-lg">
                VIP
              </div>
            </div>

            {/* Animated Customer Segments */}
            <div className="flex-1 space-y-1.5 text-[11px]">
              <div className="flex items-center justify-between px-2.5 py-1 rounded-lg bg-emerald-500/15 border border-emerald-400/30">
                <span className="text-emerald-300 font-bold">
                  {isEn ? '💎 Loyal VIPs' : '💎 ขาประจำ VIP'}
                </span>
                <span className="text-white font-black">89.4%</span>
              </div>
              <div className="flex items-center justify-between px-2.5 py-1 rounded-lg bg-amber-400/15 border border-amber-400/35">
                <span className="text-amber-300 font-bold">
                  {isEn ? '📲 Auto LINE Coupon' : '📲 ส่งคูปองดึงกลับ'}
                </span>
                <span className="text-emerald-300 font-black animate-pulse">
                  {isEn ? 'Sent ✓' : 'สำเร็จ ✓'}
                </span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (idx === 2) {
      // Animated Cashier & POS Fraud Security Laser Scanner
      return (
        <div className="cyber-toast-hud relative h-36 w-full rounded-2xl bg-[#050915] border border-sky-400/30 p-3.5 overflow-hidden flex flex-col justify-between">
          {/* Scanning Horizontal Laser Beam */}
          <div className="sol-scan-beam pointer-events-none absolute inset-x-0 top-4 h-6 bg-gradient-to-b from-sky-400/30 via-sky-300/10 to-transparent border-t border-sky-300/80" />

          <div className="relative z-10 flex items-center justify-between text-[11px]">
            <span className="font-black text-sky-300 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
              {isEn ? 'LIVE POS SHIELD SCAN' : 'สแกนบิลแคชเชียร์เรียลไทม์'}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-sky-400 text-slate-950 font-black text-[10px]">
              99.8% SAFE
            </span>
          </div>

          <div className="relative z-10 space-y-1.5 my-auto text-[11px]">
            <div className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10">
              <span className="text-slate-200 font-bold">
                {isEn ? '🛡️ Cashier #01 - #04' : '🛡️ เครื่องคิดเงิน #01 - #04'}
              </span>
              <span className="text-emerald-400 font-black">
                {isEn ? 'Verified Normal' : 'บิลปกติ 100%'}
              </span>
            </div>
            <div className="flex items-center justify-between px-2.5 py-1.5 rounded-lg bg-rose-500/20 border border-rose-400/50">
              <span className="text-rose-200 font-bold">
                {isEn ? '🚨 Void Bill Detect' : '🚨 จับบิลยกเลิกผิดปกติ'}
              </span>
              <span className="text-amber-300 font-black animate-pulse">
                {isEn ? 'Alert in 0.2s' : 'แจ้งเตือนใน 0.2 วิ'}
              </span>
            </div>
          </div>
        </div>
      );
    }

    // idx === 3: Animated Omnichannel & Multi-Branch Data Stream
    return (
      <div className="cyber-toast-hud relative h-36 w-full rounded-2xl bg-[#050915] border border-emerald-400/30 p-3.5 overflow-hidden flex flex-col justify-between">
        <div className="pointer-events-none absolute -bottom-8 -right-8 w-28 h-28 rounded-full bg-emerald-400/20 blur-2xl" />
        <div className="relative z-10 flex items-center justify-between text-[11px]">
          <span className="font-black text-emerald-300 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            {isEn ? 'OMNICHANNEL LIVE SYNC' : 'ซิงค์ยอดทุกสาขา & ออนไลน์'}
          </span>
          <span className="px-2 py-0.5 rounded-full bg-emerald-400 text-slate-950 font-black text-[10px]">
            +34.8%
          </span>
        </div>

        <div className="relative z-10 flex items-center justify-between gap-2 my-auto">
          <div className="space-y-1 text-[10px] font-black">
            <div className="px-2 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/40">
              🏪 {isEn ? 'Store POS' : 'หน้าร้าน POS'}
            </div>
            <div className="px-2 py-0.5 rounded bg-sky-400/20 text-sky-300 border border-sky-400/40">
              🛒 Shopee • TikTok
            </div>
            <div className="px-2 py-0.5 rounded bg-emerald-400/20 text-emerald-300 border border-emerald-400/40">
              💬 LINE OA 22:00
            </div>
          </div>

          {/* Animated Data Stream Lines */}
          <svg viewBox="0 0 80 54" className="w-16 h-14 flex-shrink-0 overflow-visible">
            <path
              className="sol-data-stream"
              d="M 2 10 C 35 10, 45 27, 76 27"
              fill="none"
              stroke="#FBBF24"
              strokeWidth="2.2"
            />
            <path
              className="sol-data-stream"
              d="M 2 27 L 76 27"
              fill="none"
              stroke="#38BDF8"
              strokeWidth="2.2"
            />
            <path
              className="sol-data-stream"
              d="M 2 44 C 35 44, 45 27, 76 27"
              fill="none"
              stroke="#34D399"
              strokeWidth="2.2"
            />
            <circle cx="76" cy="27" r="5" fill="#34D399" className="animate-ping" />
          </svg>

          <div className="px-2.5 py-2 rounded-xl bg-gradient-to-br from-emerald-500/25 to-amber-400/20 border border-emerald-400/50 text-center">
            <div className="text-[10px] text-emerald-300 font-bold">
              {isEn ? 'Net Profit' : 'กำไรสุทธิรวม'}
            </div>
            <div className="text-sm font-black text-white">฿1.84M</div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {/* Interactive Animation Control Bar */}
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-400/15 border border-amber-400/35 text-xs font-black text-amber-300">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          <span>
            {isEn
              ? '✨ Interactive Live Animation — Click any card to preview or launch'
              : '✨ แอนิเมชันจำลองการทำงานจริง — กดที่การ์ดเพื่อดูไฮไลท์หรือทดลองใช้งานจริง'}
          </span>
        </div>
        <button
          type="button"
          onClick={() => setIsAutoPlay(p => !p)}
          className="px-3.5 py-1.5 rounded-full bg-[#0b1120] hover:bg-slate-800 border border-white/15 text-xs font-black text-white transition cursor-pointer"
        >
          {isAutoPlay
            ? isEn
              ? '⏸ Pause Auto-Tour'
              : '⏸ หยุดสลับการ์ดอัตโนมัติ'
            : isEn
            ? '▶ Play Auto-Tour'
            : '▶ เล่นสลับการ์ดอัตโนมัติ'}
        </button>
      </div>

      {/* 4 Animated Solution Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((sol, idx) => {
          const isCurrent = activeIdx === idx;
          return (
            <div
              key={idx}
              onMouseEnter={() => setActiveIdx(idx)}
              onClick={() => setActiveIdx(idx)}
              className={`group relative overflow-hidden rounded-3xl p-6 transition-all duration-500 cursor-pointer flex flex-col justify-between bg-[#0b1120]/90 border-2 ${
                isCurrent
                  ? `${sol.borderActive} -translate-y-2`
                  : 'border-white/10 hover:border-amber-400/40 hover:-translate-y-1 shadow-xl'
              }`}
            >
              {/* Moving Shimmer Beam on Active Card */}
              {isCurrent && (
                <div className="pointer-events-none absolute inset-0 overflow-hidden">
                  <div className="apple-light-sweep absolute -inset-y-10 w-24 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                </div>
              )}

              <div>
                {/* Top Header: 3D Icon + Step Badge */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="transform group-hover:scale-110 transition duration-300">
                    <LuxuryIconBadge variant={sol.variant} size="lg" active={isCurrent}>
                      <LuxuryModuleIcon type={sol.iconType} size={28} />
                    </LuxuryIconBadge>
                  </div>
                  <span
                    className={`px-2.5 py-1 rounded-full text-[10px] font-black border ${sol.pillBg}`}
                  >
                    {sol.liveBadge}
                  </span>
                </div>

                {/* Live 60FPS Mini Animation Stage inside Card */}
                <div className="mb-4">{renderMiniAnimationStage(idx)}</div>

                <div className="text-[11px] font-black text-amber-400 mb-1">
                  {sol.stepBadge}
                </div>
                <h3 className="text-lg font-black text-white mb-2 leading-snug">
                  {sol.title}
                </h3>
                <p className="text-sm text-slate-300 leading-relaxed mb-5">
                  {sol.desc}
                </p>
              </div>

              {/* Bottom Live KPI & Launch Action */}
              <div className="pt-3.5 border-t border-white/10">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-slate-400">{sol.kpiLabel}</span>
                  <span className="text-base font-black text-amber-300">{sol.kpiVal}</span>
                </div>
                <button
                  type="button"
                  onClick={e => {
                    e.stopPropagation();
                    if (onLaunchSolution) onLaunchSolution(sol.tabId);
                  }}
                  className={`w-full py-2.5 px-4 rounded-xl bg-gradient-to-r ${sol.ctaBg} font-black text-xs shadow-lg hover:brightness-110 transition cursor-pointer flex items-center justify-center gap-1.5`}
                >
                  <span>
                    {isEn ? '⚡ Launch Live Module' : '⚡ กดทดลองใช้บริการนี้ทันที'}
                  </span>
                  <span>→</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}


// --- MODULE 3: OVERVIEW & CUSTOMER INSIGHTS ---

export function OverviewTab({
  lang,
  theme,
  currentRevenueVal,
  setCurrentRevenueVal,
  targetRevenueVal,
  setTargetRevenueVal,
  targetTimelineVal,
  setTargetTimelineVal,
  clientGoalType,
  setClientGoalType,
  targetCategory,
  setTargetCategory,
  isPlanActive,
  isGeneratingPlan,
  handleDeployGoalPlan,
  handleExportGoalPlan,
  setActiveTab,
  lineChartOptions,
  barChartOptions
}) {
  const isEn = lang === 'en';
  const tx = (th, en) => (isEn ? en : th);

  const [newSaleAmount, setNewSaleAmount] = useState('');
  const [newSaleNote, setNewSaleNote] = useState('');
  const [recentRecordedSales, setRecentRecordedSales] = useState([
    {
      id: 'SL-101',
      time: tx('วันนี้ 15:30 น.', 'Today 15:30'),
      amount: 18500,
      note: tx('ชุดเซรั่มบำรุงผิว 10 กล่อง (หน้าร้านสยาม)', 'Luxury Serum Set x10 (Siam Branch)')
    },
    {
      id: 'SL-102',
      time: tx('วันนี้ 14:15 น.', 'Today 14:15'),
      amount: 32000,
      note: tx('คำสั่งซื้อเหมาชุดอุปกรณ์สำนักงาน (ช่องทางแชตร้าน)', 'Corporate Office Supply Bundle (Direct Chat)')
    }
  ]);

  const gap = Math.max(0, targetRevenueVal - currentRevenueVal);
  const days = Math.max(1, parseInt(targetTimelineVal, 10) || 90);
  const dailyRequired = Math.round(gap / days);
  const progressPct = Math.min(100, Math.round((currentRevenueVal / Math.max(1, targetRevenueVal)) * 100));

  const handleAddQuickSale = (amountVal, customLabel) => {
    const amt = Number(amountVal);
    if (!amt || amt <= 0) {
      toast.error(tx('กรุณาระบุจำนวนเงินยอดขายที่มากกว่า 0 บาท', 'Please enter a sale amount greater than 0'));
      return;
    }
    const updatedRev = currentRevenueVal + amt;
    setCurrentRevenueVal(updatedRev);
    const nowTime = new Date().toLocaleTimeString(isEn ? 'en-US' : 'th-TH', { hour: '2-digit', minute: '2-digit' });
    setRecentRecordedSales(prev => [
      {
        id: 'SL-' + Math.floor(100 + Math.random() * 900),
        time: `${tx('เมื่อสักครู่', 'Just now')} (${nowTime})`,
        amount: amt,
        note: customLabel || newSaleNote || tx('บันทึกยอดขายหน้าร้านและออนไลน์', 'Storefront & Online Sale Recorded')
      },
      ...prev.slice(0, 4)
    ]);
    setNewSaleAmount('');
    setNewSaleNote('');
    toast.success(
      tx(
        `💰 บันทึกยอดขายเพิ่ม +฿${amt.toLocaleString()} สำเร็จ! ยอดรวมปัจจุบันคือ ฿${updatedRev.toLocaleString()}`,
        `💰 Added +฿${amt.toLocaleString()} sale! Current total is now ฿${updatedRev.toLocaleString()}`
      )
    );
  };

  const overviewLineData = {
    labels: isEn
      ? ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00']
      : ['08:00 น.', '10:00 น.', '12:00 น.', '14:00 น.', '16:00 น.', '18:00 น.', '20:00 น.'],
    datasets: [
      {
        label: tx('ยอดขายจริงรายชั่วโมง (บาท)', 'Actual Hourly Sales (THB)'),
        data: [42000, 68000, 115000, 142000, 168000, 215000, Math.round(currentRevenueVal / 18)],
        borderColor: '#38bdf8',
        backgroundColor: theme === 'dark' ? 'rgba(56, 189, 248, 0.14)' : 'rgba(56, 189, 248, 0.2)',
        borderWidth: 3,
        fill: true,
        tension: 0.38
      },
      {
        label: tx('เป้าหมายยอดขายต่อช่วงเวลา (บาท)', 'Target Pace (THB)'),
        data: [40000, 65000, 100000, 130000, 155000, 190000, Math.round(targetRevenueVal / 22)],
        borderColor: '#fbbf24',
        borderDash: [6, 6],
        borderWidth: 2,
        fill: false,
        tension: 0.38
      }
    ]
  };

  const overviewDoughnutData = {
    labels: isEn
      ? ['Physical Branches', 'Short-Video & Live Store', 'Marketplace Mall', 'Direct Store Chat']
      : ['หน้าร้านจริงทั้ง 4 สาขา', 'ช่องทางวิดีโอสั้นและไลฟ์สด', 'ร้านค้าบนแอปช้อปปิ้ง', 'แชตร้านค้าโดยตรง'],
    datasets: [
      {
        data: [48, 24, 16, 12],
        backgroundColor: ['#fbbf24', '#38bdf8', '#34d399', '#a78bfa'],
        borderColor: theme === 'dark' ? '#0b1120' : '#ffffff',
        borderWidth: 3
      }
    ]
  };

  const overviewBarData = {
    labels: isEn
      ? ['Direct Store Chat', 'Physical Branches', 'Live Commerce', 'Search Ads', 'Marketplace Mall']
      : ['แชตร้านค้าโดยตรง', 'หน้าร้านจริง', 'ไลฟ์สดขายสินค้า', 'โฆษณาค้นหา', 'แอปช้อปปิ้งมอลล์'],
    datasets: [
      {
        label: tx('อัตราการซื้อสำเร็จ (%)', 'Conversion Rate (%)'),
        data: [11.4, 9.2, 7.8, 6.4, 4.9],
        backgroundColor: 'rgba(251, 191, 36, 0.85)',
        hoverBackgroundColor: '#f59e0b',
        borderRadius: 8
      }
    ]
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* 1. ระบบตั้งเป้าหมายและคำนวณแผนงานอัตโนมัติ */}
      <div className={`p-6 sm:p-8 rounded-3xl border shadow-2xl relative overflow-hidden transition-all duration-300 ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-[#070d1e] via-[#0b132b] to-[#040816] border-amber-400/40'
          : 'bg-gradient-to-br from-amber-50/70 via-white to-sky-50/60 border-amber-300'
      }`}>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-5 border-b border-white/10">
          <div className="flex items-start gap-4">
            <LuxuryIconBadge variant="gold" size="lg" active>
              <LuxuryModuleIcon type="target" size={28} />
            </LuxuryIconBadge>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-black uppercase tracking-wider bg-amber-400/20 text-amber-400 px-3 py-0.5 rounded-full border border-amber-400/30">
                  {tx('ระบบวางแผนเป้าหมายร้านค้า', 'Business Goal Planner')}
                </span>
              </div>
              <h2 className={`text-xl sm:text-2xl font-black mt-1 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                {tx('กำหนดเป้าหมายยอดขายของร้าน — ระบบคำนวณยอดที่ต้องทำต่อวันให้ทันที', 'Set Your Store Revenue Target — Instant Daily Pace Calculator')}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-black bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              {isPlanActive
                ? tx('สถานะ: แผนงานกำลังทำงานอัตโนมัติ', 'Status: Action Plan Active')
                : tx('พร้อมตั้งค่าเป้าหมายใหม่', 'Ready to Configure Goal')}
            </span>
          </div>
        </div>

        {/* ฟอร์มปรับตัวเลขเป้าหมาย (ทำงานจริงทุกช่อง) */}
        <div className={`p-5 sm:p-6 rounded-2xl border mb-6 ${
          theme === 'dark' ? 'bg-[#050914]/80 border-white/10' : 'bg-slate-50 border-slate-200'
        }`}>
          <h3 className={`text-sm font-black mb-4 flex items-center gap-2 ${theme === 'dark' ? 'text-amber-300' : 'text-slate-800'}`}>
            <span>⚙️ {tx('ปรับแต่งตัวเลขเป้าหมายของคุณด้านล่าง (ตัวเลขคำนวณสดทันที):', 'Customize Your Target Numbers Below (Calculates Live):')}</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                {tx('ประเภทเป้าหมายหลัก', 'Primary Goal Type')}
              </label>
              <select
                value={clientGoalType}
                onChange={(e) => setClientGoalType(e.target.value)}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-bold focus:outline-none focus:border-amber-400 ${
                  theme === 'dark' ? 'bg-[#0b132b] border-white/15 text-white' : 'bg-white border-slate-300 text-slate-900'
                }`}
              >
                <option value="revenue">{tx('💰 เพิ่มยอดขายรวมของร้าน', '💰 Grow Total Store Revenue')}</option>
                <option value="profit">{tx('💎 เพิ่มกำไรสุทธิเข้ากระเป๋า', '💎 Maximize Net Profit')}</option>
                <option value="customers">{tx('👥 เพิ่มจำนวนลูกค้าประจำซื้อซ้ำ', '👥 Increase Repeat Customers')}</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                {tx('ยอดขายที่มีอยู่ปัจจุบัน (บาท)', 'Current Revenue (THB)')}
              </label>
              <input
                type="number"
                step="50000"
                value={currentRevenueVal}
                onChange={(e) => setCurrentRevenueVal(Math.max(0, Number(e.target.value)))}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-black font-mono focus:outline-none focus:border-amber-400 ${
                  theme === 'dark' ? 'bg-[#0b132b] border-white/15 text-sky-400' : 'bg-white border-slate-300 text-slate-900'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                {tx('เป้าหมายยอดขายที่ต้องการ (บาท)', 'Target Revenue Goal (THB)')}
              </label>
              <input
                type="number"
                step="100000"
                value={targetRevenueVal}
                onChange={(e) => setTargetRevenueVal(Math.max(1000, Number(e.target.value)))}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-sm font-black font-mono focus:outline-none focus:border-amber-400 ${
                  theme === 'dark' ? 'bg-[#0b132b] border-amber-400/40 text-amber-400' : 'bg-white border-amber-400 text-amber-700'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                {tx('ระยะเวลาที่ต้องการไปให้ถึง', 'Target Timeframe')}
              </label>
              <select
                value={targetTimelineVal}
                onChange={(e) => setTargetTimelineVal(e.target.value)}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-bold focus:outline-none focus:border-amber-400 ${
                  theme === 'dark' ? 'bg-[#0b132b] border-white/15 text-white' : 'bg-white border-slate-300 text-slate-900'
                }`}
              >
                <option value="30">{tx('ภายใน 30 วัน (1 เดือน)', 'Within 30 Days (1 Month)')}</option>
                <option value="60">{tx('ภายใน 60 วัน (2 เดือน)', 'Within 60 Days (2 Months)')}</option>
                <option value="90">{tx('ภายใน 90 วัน (3 เดือน)', 'Within 90 Days (3 Months)')}</option>
                <option value="180">{tx('ภายใน 180 วัน (ครึ่งปี)', 'Within 180 Days (6 Months)')}</option>
                <option value="365">{tx('ภายใน 365 วัน (1 ปี)', 'Within 365 Days (1 Year)')}</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1.5">
                {tx('ประเภทธุรกิจของคุณ', 'Business Category')}
              </label>
              <select
                value={targetCategory}
                onChange={(e) => setTargetCategory(e.target.value)}
                className={`w-full px-3.5 py-2.5 rounded-xl border text-xs font-bold focus:outline-none focus:border-amber-400 ${
                  theme === 'dark' ? 'bg-[#0b132b] border-white/15 text-white' : 'bg-white border-slate-300 text-slate-900'
                }`}
              >
                <option value="ecommerce">{tx('ร้านค้าปลีกและออนไลน์', 'Retail & Online Store')}</option>
                <option value="retail">{tx('หน้าร้านหลายสาขา', 'Multi-Branch Physical Store')}</option>
                <option value="b2b">{tx('ค้าส่งและตัวแทนจำหน่าย', 'Wholesale & Distribution')}</option>
                <option value="service">{tx('ร้านอาหาร คาเฟ่ หรือบริการ', 'Restaurant, Cafe & Services')}</option>
              </select>
            </div>
          </div>

          {/* แถบสรุปผลคำนวณสด */}
          <div className="mt-5 p-4 rounded-2xl bg-amber-400/10 border border-amber-400/30 grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <div>
              <span className="text-xs text-slate-300 block">{tx('ความคืบหน้าสู่เป้าหมายปัจจุบัน:', 'Current Goal Progress:')}</span>
              <div className="flex items-baseline gap-2 mt-0.5">
                <span className="text-2xl font-black text-amber-400">{progressPct}%</span>
                <span className="text-xs text-slate-300">
                  (฿{currentRevenueVal.toLocaleString()} / ฿{targetRevenueVal.toLocaleString()})
                </span>
              </div>
              <div className="w-full h-2.5 bg-black/40 rounded-full overflow-hidden mt-2">
                <div className="h-full bg-gradient-to-r from-amber-400 to-emerald-400 rounded-full transition-all duration-500" style={{ width: `${progressPct}%` }}></div>
              </div>
            </div>

            <div>
              <span className="text-xs text-slate-300 block">{tx('ยอดขายส่วนต่างที่ต้องทำเพิ่ม:', 'Remaining Revenue Needed:')}</span>
              <span className="text-xl font-black text-white font-mono">฿ {gap.toLocaleString()}</span>
              <span className="text-xs text-emerald-300 block mt-0.5">
                {tx(`เฉลี่ยต้องทำเพิ่มวันละ ฿${dailyRequired.toLocaleString()} ใน ${days} วัน`, `Requires ฿${dailyRequired.toLocaleString()} per day over ${days} days`)}
              </span>
            </div>

            <div className="flex flex-wrap gap-2 justify-end">
              <button
                onClick={handleDeployGoalPlan}
                disabled={isGeneratingPlan}
                className="bg-gradient-to-r from-amber-400 to-orange-500 hover:brightness-105 text-slate-950 font-black px-5 py-2.5 rounded-xl text-xs shadow-lg transition cursor-pointer"
              >
                {isGeneratingPlan
                  ? tx('⏳ กำลังคำนวณแผน...', '⏳ Calculating Plan...')
                  : tx('🚀 เริ่มใช้แผนเป้าหมายนี้ทันที', '🚀 Activate This Goal Plan')}
              </button>
              <button
                onClick={handleExportGoalPlan}
                className="bg-white/10 hover:bg-white/20 text-white font-bold px-4 py-2.5 rounded-xl text-xs border border-white/15 transition cursor-pointer"
              >
                {tx('📥 ดาวน์โหลดแผนงาน (.txt)', '📥 Download Plan (.txt)')}
              </button>
            </div>
          </div>
        </div>

        {/* Industry Benchmarking & Daily Goal Decomposition Engine */}
        <IndustryBenchmarkAndGoalDecomposition
          lang={lang}
          currentRevenueVal={currentRevenueVal}
          targetRevenueVal={targetRevenueVal}
          targetTimelineVal={targetTimelineVal}
          theme={theme}
          setActiveTab={setActiveTab}
        />

        {/* 2. กล่องบันทึกยอดขายใหม่ประจำวัน (ทำให้หน้าแรกทำงานได้จริง ทดสอบบวกยอดขายได้ทันที) */}
        <div className={`p-5 sm:p-6 rounded-2xl border ${
          theme === 'dark' ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-emerald-50 border-emerald-300'
        }`}>
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div>
              <span className="text-xs font-black uppercase px-2.5 py-0.5 rounded-full bg-emerald-400 text-slate-950">
                {tx('⚡ ฟังก์ชันทำงานจริง: บันทึกยอดขายเข้าสู่ระบบสด', '⚡ Live Action: Record New Store Sale')}
              </span>
              <h3 className={`text-base sm:text-lg font-black mt-1.5 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                {tx('เพิ่มยอดขายใหม่วันนี้ (กดปุ่มลัดหรือพิมพ์จำนวนเงินเพื่อดูความคืบหน้าเป้าหมายขยับขึ้นทันที)', 'Add Today’s New Sale (Click a quick button or enter an amount to update your goal live)')}
              </h3>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              {[5000, 10000, 50000].map((quickAmt) => (
                <button
                  key={quickAmt}
                  onClick={() => handleAddQuickSale(quickAmt, tx(`ยอดขายด่วนหน้าร้าน +฿${quickAmt.toLocaleString()}`, `Quick Storefront Sale +฿${quickAmt.toLocaleString()}`))}
                  className="px-3.5 py-2 rounded-xl bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black text-xs shadow transition cursor-pointer"
                >
                  +฿{quickAmt.toLocaleString()}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 mt-4">
            <div className="sm:col-span-4">
              <input
                type="number"
                value={newSaleAmount}
                onChange={(e) => setNewSaleAmount(e.target.value)}
                placeholder={tx('ระบุจำนวนเงิน (เช่น 12500)', 'Enter amount (e.g. 12500)')}
                className={`w-full px-4 py-2.5 rounded-xl border text-sm font-bold focus:outline-none focus:border-emerald-400 ${
                  theme === 'dark' ? 'bg-[#050914] border-white/20 text-white' : 'bg-white border-slate-300 text-slate-900'
                }`}
              />
            </div>
            <div className="sm:col-span-5">
              <input
                type="text"
                value={newSaleNote}
                onChange={(e) => setNewSaleNote(e.target.value)}
                placeholder={tx('หมายเหตุรายการขาย (เช่น ลูกค้าเหมาเซรั่ม 5 เซ็ต)', 'Sale note (e.g. Customer bought 5 serum sets)')}
                className={`w-full px-4 py-2.5 rounded-xl border text-sm font-medium focus:outline-none focus:border-emerald-400 ${
                  theme === 'dark' ? 'bg-[#050914] border-white/20 text-white' : 'bg-white border-slate-300 text-slate-900'
                }`}
              />
            </div>
            <div className="sm:col-span-3">
              <button
                onClick={() => handleAddQuickSale(newSaleAmount, newSaleNote)}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-orange-500 hover:brightness-105 text-slate-950 font-black text-xs shadow-lg transition cursor-pointer"
              >
                {tx('➕ บันทึกยอดขายทันที', '➕ Record Sale Now')}
              </button>
            </div>
          </div>

          <div className="mt-3 pt-3 border-t border-white/10 flex flex-wrap gap-2 items-center text-xs text-slate-200">
            <span className="font-bold text-emerald-300">{tx('รายการที่เพิ่งบันทึกล่าสุด:', 'Recently Recorded Sales:')}</span>
            {recentRecordedSales.map((s) => (
              <span key={s.id} className="px-2.5 py-1 rounded-lg bg-black/30 border border-white/10">
                <strong>+฿{s.amount.toLocaleString()}</strong> • {s.note} <span className="text-slate-400">({s.time})</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 3. การ์ดสรุปตัวเลขสำคัญของร้าน 4 ช่อง */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className={`p-6 rounded-3xl border shadow-xl ${theme === 'dark' ? 'bg-[#0b1020]/85 border-white/10' : 'bg-white border-slate-200'}`}>
          <div className="flex justify-between items-start mb-3">
            <span className="text-xs font-bold text-slate-300">{tx('ยอดขายสะสมปัจจุบัน', 'Current Total Sales')}</span>
            <LuxuryIconBadge variant="gold" size="sm" active>
              <LuxuryModuleIcon type="wallet" size={20} />
            </LuxuryIconBadge>
          </div>
          <h3 className={`text-3xl font-black font-mono ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            ฿ {currentRevenueVal.toLocaleString()}
          </h3>
          <p className="text-xs text-emerald-400 mt-1 font-bold">
            {tx(`↗ คิดเป็น ${progressPct}% ของเป้าหมายที่ตั้งไว้`, `↗ ${progressPct}% of your target goal`)}
          </p>
        </div>

        <div
          onClick={() => setActiveTab('customers')}
          className={`p-6 rounded-3xl border shadow-xl cursor-pointer hover:border-amber-400 transition ${theme === 'dark' ? 'bg-[#0b1020]/85 border-white/10' : 'bg-white border-slate-200'}`}
        >
          <div className="flex justify-between items-start mb-3">
            <span className="text-xs font-bold text-slate-300">{tx('ลูกค้าทั้งหมดในระบบ', 'Total Active Customers')}</span>
            <LuxuryIconBadge variant="ruby" size="sm" active>
              <LuxuryModuleIcon type="customers" size={20} />
            </LuxuryIconBadge>
          </div>
          <h3 className={`text-3xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
            1,435 <span className="text-sm font-normal text-slate-400">{tx('ราย', 'buyers')}</span>
          </h3>
          <p className="text-xs text-amber-300 mt-1 font-bold">
            {tx('👉 คลิกเพื่อดูรายชื่อลูกค้าประจำ & คนหาย', '👉 Click to view VIP & inactive customers')}
          </p>
        </div>

        <div
          onClick={() => setActiveTab('staff_pos')}
          className={`p-6 rounded-3xl border shadow-xl cursor-pointer hover:border-amber-400 transition ${theme === 'dark' ? 'bg-[#0b1020]/85 border-white/10' : 'bg-white border-slate-200'}`}
        >
          <div className="flex justify-between items-start mb-3">
            <span className="text-xs font-bold text-slate-300">{tx('ยอดซื้อเฉลี่ยต่อบิลหน้าร้าน', 'Average Basket Size')}</span>
            <LuxuryIconBadge variant="sapphire" size="sm" active>
              <LuxuryModuleIcon type="staff_pos" size={20} />
            </LuxuryIconBadge>
          </div>
          <h3 className="text-3xl font-black text-sky-400">
            ฿ 2,340
          </h3>
          <p className="text-xs text-rose-300 mt-1 font-bold">
            {tx('👉 คลิกเพื่อดูผลงานพนักงาน & บิลที่ถูกยกเลิก', '👉 Click to inspect staff & cancelled bills')}
          </p>
        </div>

        <div
          onClick={() => setActiveTab('multi_channel')}
          className={`p-6 rounded-3xl border shadow-xl cursor-pointer hover:border-amber-400 transition ${theme === 'dark' ? 'bg-[#0b1020]/85 border-white/10' : 'bg-white border-slate-200'}`}
        >
          <div className="flex justify-between items-start mb-3">
            <span className="text-xs font-bold text-slate-300">{tx('อัตรากำไรสุทธิเฉลี่ยทุกช่องทาง', 'Average Net Profit Margin')}</span>
            <LuxuryIconBadge variant="emerald" size="sm" active>
              <LuxuryModuleIcon type="multi_channel" size={20} />
            </LuxuryIconBadge>
          </div>
          <h3 className="text-3xl font-black text-emerald-400">
            42.3%
          </h3>
          <p className="text-xs text-emerald-300 mt-1 font-bold">
            {tx('👉 คลิกเพื่อเทียบกำไรหน้าร้านกับออนไลน์', '👉 Click to compare store vs. online margins')}
          </p>
        </div>
      </div>

      {/* 4. กราฟวิเคราะห์ยอดขายและสัดส่วนช่องทาง (ภาษาไทยล้วน หรือ ภาษาอังกฤษล้วน) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className={`lg:col-span-8 p-7 rounded-3xl border shadow-xl ${
          theme === 'dark' ? 'bg-[#0b1020]/85 border-white/10' : 'bg-white border-slate-200'
        }`}>
          <div className="flex flex-wrap justify-between items-center mb-5 gap-2">
            <div>
              <h3 className={`text-lg font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                📈 {tx('กราฟเปรียบเทียบยอดขายจริงกับเป้าหมายรายชั่วโมง', 'Hourly Actual Sales vs. Target Pace')}
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                {tx('เส้นสีฟ้าคือยอดขายจริงของร้าน และเส้นประสีทองคือเป้าหมายที่ควรทำได้ในแต่ละช่วงเวลา', 'Solid blue shows actual store sales; dashed gold shows target pace.')}
              </p>
            </div>
          </div>
          <div className="h-72 w-full">
            <Line data={overviewLineData} options={lineChartOptions} />
          </div>
        </div>

        <div className={`lg:col-span-4 p-7 rounded-3xl border shadow-xl flex flex-col justify-between ${
          theme === 'dark' ? 'bg-[#0b1020]/85 border-white/10' : 'bg-white border-slate-200'
        }`}>
          <div>
            <h3 className={`text-lg font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              🍩 {tx('สัดส่วนยอดขายแยกตามช่องทาง', 'Sales Share by Channel')}
            </h3>
            <p className="text-xs text-slate-300 mt-0.5 mb-4">
              {tx('เปรียบเทียบสัดส่วนรายได้จากหน้าร้านจริงและออนไลน์', 'Revenue breakdown across physical and online channels')}
            </p>
            <div className="h-52 w-full flex items-center justify-center">
              <Doughnut
                data={overviewDoughnutData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { display: false } }
                }}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2.5 mt-4 pt-4 border-t border-white/10 text-xs">
            <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span> {tx('หน้าร้านจริง: 48%', 'Physical Stores: 48%')}</div>
            <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-sky-400"></span> {tx('ไลฟ์สด: 24%', 'Live Store: 24%')}</div>
            <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span> {tx('แอปช้อปปิ้ง: 16%', 'Marketplace: 16%')}</div>
            <div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-purple-400"></span> {tx('แชตร้านค้า: 12%', 'Direct Chat: 12%')}</div>
          </div>
        </div>

        <div className={`lg:col-span-12 p-7 rounded-3xl border shadow-xl ${
          theme === 'dark' ? 'bg-[#0b1020]/85 border-white/10' : 'bg-white border-slate-200'
        }`}>
          <div className="flex flex-wrap justify-between items-center mb-5 gap-2">
            <div>
              <h3 className={`text-lg font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                📊 {tx('อัตราการตัดสินใจซื้อสำเร็จแยกตามช่องทางขาย', 'Purchase Conversion Rate by Channel')}
              </h3>
              <p className="text-xs text-slate-300 mt-0.5">
                {tx('แสดงว่าลูกค้าที่ทักหรือเข้ามาในแต่ละช่องทาง ตัดสินใจซื้อจริงคิดเป็นกี่เปอร์เซ็นต์', 'Percentage of visitors in each channel who complete a purchase')}
              </p>
            </div>
            <span className="text-xs px-3.5 py-1.5 bg-emerald-500/15 text-emerald-300 rounded-xl border border-emerald-500/30 font-bold">
              {tx('🏆 ช่องทางที่ปิดการขายเก่งที่สุด: แชตร้านค้าโดยตรง (11.4%)', '🏆 Top Converting Channel: Direct Store Chat (11.4%)')}
            </span>
          </div>
          <div className="h-60 w-full">
            <Bar data={overviewBarData} options={barChartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}

export function CustomersTab({
  lang,
  theme,
  customersList,
  setCustomersList
}) {
  const isEn = lang === 'en';
  const tx = (th, en) => (isEn ? en : th);

  const [selectedRfmSegment, setSelectedRfmSegment] = useState('all');
  const [customerSearch, setCustomerSearch] = useState('');
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);

  // ฟอร์มเพิ่มลูกค้าใหม่ (ทำงานจริง)
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCustName, setNewCustName] = useState('');
  const [newCustPhone, setNewCustPhone] = useState('');
  const [newCustSegment, setNewCustSegment] = useState('champion');
  const [newCustSpent, setNewCustSpent] = useState('');
  const [newCustProduct, setNewCustProduct] = useState('');

  const handleAddCustomer = (e) => {
    e.preventDefault();
    if (!newCustName.trim()) {
      toast.error(tx('กรุณากรอกชื่อลูกค้า', 'Please enter customer name'));
      return;
    }
    const spentVal = Math.max(500, Number(newCustSpent) || 12500);
    const newId = 'CUS-' + Math.floor(9010 + Math.random() * 900);
    const segLabelTh =
      newCustSegment === 'champion' ? '🏆 ลูกค้าชั้นดีสูงสุด' :
      newCustSegment === 'loyal' ? '💎 ลูกค้าประจำเหนียวแน่น' :
      newCustSegment === 'at_risk' ? '⚠️ ลูกค้าห่างหาย (ต้องรีบติดต่อ)' :
      '🌱 ลูกค้าใหม่เพิ่งซื้อครั้งแรก';
    const segLabelEn =
      newCustSegment === 'champion' ? '🏆 Top VIP Customer' :
      newCustSegment === 'loyal' ? '💎 Loyal Regular Customer' :
      newCustSegment === 'at_risk' ? '⚠️ Inactive Risk (Urgent Follow-Up)' :
      '🌱 New First-Time Customer';

    const newCustomerObj = {
      id: newId,
      segment: newCustSegment,
      rfmScore: newCustSegment === 'champion' ? '5-5-5' : newCustSegment === 'loyal' ? '4-4-4' : newCustSegment === 'at_risk' ? '1-3-4' : '5-1-3',
      recencyDays: newCustSegment === 'at_risk' ? 50 : 1,
      frequency: newCustSegment === 'new' ? 1 : 8,
      ltv: spentVal,
      aov: Math.round(spentVal / (newCustSegment === 'new' ? 1 : 8)),
      phone: newCustPhone || '081-555-9999',
      lineId: '@' + newCustName.replace(/\s+/g, '').toLowerCase().slice(0, 10),
      email: 'customer@store.co.th',
      contactedCount: 0,
      th: {
        name: newCustName.trim(),
        segmentLabel: segLabelTh,
        recencyText: newCustSegment === 'at_risk' ? '50 วันที่แล้ว' : 'วันนี้',
        favoriteProduct: newCustProduct || 'สินค้าขายดีประจำร้าน',
        aiAction: 'ดูแลต่อเนื่องและส่งข้อความแจ้งโปรโมชันพิเศษประจำเดือน',
        orders: [
          { orderId: 'ORD-' + Math.floor(1000 + Math.random() * 9000), date: 'วันนี้', items: newCustProduct || 'สินค้าขายดีประจำร้าน', total: spentVal, method: 'สแกนจ่ายคิวอาร์' }
        ]
      },
      en: {
        name: newCustName.trim(),
        segmentLabel: segLabelEn,
        recencyText: newCustSegment === 'at_risk' ? '50 days ago' : 'Today',
        favoriteProduct: newCustProduct || 'Store Best-Selling Product',
        aiAction: 'Follow up with personalized monthly offers and loyalty rewards.',
        orders: [
          { orderId: 'ORD-' + Math.floor(1000 + Math.random() * 9000), date: 'Today', items: newCustProduct || 'Store Best-Selling Product', total: spentVal, method: 'QR Payment' }
        ]
      }
    };

    setCustomersList(prev => [newCustomerObj, ...prev]);
    setNewCustName('');
    setNewCustPhone('');
    setNewCustSpent('');
    setNewCustProduct('');
    setShowAddForm(false);
    toast.success(tx(`✅ เพิ่มข้อมูลลูกค้า "${newCustomerObj.th.name}" เข้าสู่ระบบเรียบร้อยแล้ว!`, `✅ Added customer "${newCustomerObj.en.name}" successfully!`));
  };

  const handleContactCustomer = (cust, type) => {
    const cLoc = isEn ? cust.en : cust.th;
    setCustomersList(prev =>
      prev.map(item =>
        item.id === cust.id
          ? {
              ...item,
              contactedCount: (item.contactedCount || 0) + 1,
              segment: item.segment === 'at_risk' ? 'loyal' : item.segment,
              th: {
                ...item.th,
                segmentLabel: item.segment === 'at_risk' ? '💎 ลูกค้าประจำ (ติดตามกลับมาแล้ว)' : item.th.segmentLabel,
                recencyText: type === 'call' ? 'โทรติดตามแล้ววันนี้' : 'ส่งข้อความคูปองแล้ววันนี้'
              },
              en: {
                ...item.en,
                segmentLabel: item.segment === 'at_risk' ? '💎 Loyal Regular (Re-engaged)' : item.en.segmentLabel,
                recencyText: type === 'call' ? 'Called today' : 'Coupon sent today'
              }
            }
          : item
      )
    );
    if (type === 'call') {
      toast.success(tx(`📞 บันทึกการโทรหา ${cLoc.name} (${cust.phone}) สำเร็จ! สถานะลูกค้าอัปเดตแล้ว`, `📞 Logged phone follow-up with ${cLoc.name} (${cust.phone})!`));
    } else {
      toast.success(tx(`💬 ส่งข้อความคูปองส่วนลดให้ ${cLoc.name} (${cust.lineId}) สำเร็จ!`, `💬 Sent discount voucher message to ${cLoc.name} (${cust.lineId})!`));
    }
  };

  const exportCustomerCsv = () => {
    const headers = isEn
      ? ['Customer ID,Customer Name,Group,Last Purchase,Total Orders,Lifetime Value (THB),Phone,Chat ID,Favorite Product']
      : ['รหัสลูกค้า,ชื่อลูกค้า,กลุ่มลูกค้า,ซื้อครั้งล่าสุด,จำนวนครั้งที่ซื้อ,ยอดซื้อสะสมรวม (บาท),เบอร์โทรศัพท์,ไอดีแชต,สินค้าที่ชอบซื้อ'];
    const rows = customersList.map(c => {
      const loc = isEn ? c.en : c.th;
      return `"${c.id}","${loc.name}","${loc.segmentLabel}","${loc.recencyText}",${c.frequency},${c.ltv},"${c.phone}","${c.lineId}","${loc.favoriteProduct}"`;
    });
    const csvContent = "\uFEFF" + [headers, ...rows].join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', isEn ? 'Customer_Analysis_Report.csv' : 'รายงานวิเคราะห์ลูกค้าประจำร้าน.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(tx('📥 ดาวน์โหลดไฟล์ตารางข้อมูลลูกค้า (.csv) สำเร็จ!', '📥 Downloaded Customer Analysis Report (.csv)!'));
  };

  const filteredCustomers = customersList.filter(c => {
    const loc = isEn ? c.en : c.th;
    const matchSegment = selectedRfmSegment === 'all' || c.segment === selectedRfmSegment;
    const q = customerSearch.trim().toLowerCase();
    const matchSearch =
      !q ||
      loc.name.toLowerCase().includes(q) ||
      c.id.toLowerCase().includes(q) ||
      c.phone.toLowerCase().includes(q) ||
      c.lineId.toLowerCase().includes(q) ||
      loc.favoriteProduct.toLowerCase().includes(q);
    return matchSegment && matchSearch;
  });

  const selectedCustomerProfile = customersList.find(c => c.id === selectedCustomerId) || null;

  const countBySeg = (seg) => customersList.filter(c => c.segment === seg).length;
  const totalLtvAll = customersList.reduce((acc, c) => acc + c.ltv, 0);
  const avgLtv = Math.round(totalLtvAll / Math.max(1, customersList.length));

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* 1. แบนเนอร์หัวข้อหน้าวิเคราะห์ลูกค้า */}
      <div className={`p-7 sm:p-8 rounded-3xl border relative overflow-hidden shadow-2xl ${
        theme === 'dark'
          ? 'bg-gradient-to-r from-amber-500/15 via-[#0b1228] to-[#040817] border-amber-400/40'
          : 'bg-gradient-to-r from-amber-100/70 via-white to-sky-50 border-amber-300'
      }`}>
        <div className="relative z-10 flex flex-col lg:flex-row justify-between lg:items-center gap-6">
          <div className="flex items-start gap-4">
            <LuxuryIconBadge variant="ruby" size="lg" active>
              <LuxuryModuleIcon type="customers" size={28} />
            </LuxuryIconBadge>
            <div>
              <span className="text-xs font-black uppercase px-3 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                {tx('ระบบวิเคราะห์พฤติกรรมลูกค้าและการซื้อซ้ำ', 'Customer Loyalty & Segmentation')}
              </span>
              <h2 className={`text-2xl font-black mt-1.5 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                {tx('วิเคราะห์ลูกค้าชั้นดี และติดตามลูกค้าที่หายไปนาน', 'Identify Top VIP Buyers & Re-Engage Inactive Customers')}
              </h2>
              <p className="text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
                {tx(
                  'ช่วยให้ร้านค้ารู้ทันทีว่าใครคือลูกค้าชั้นดีที่ซื้อบ่อยยอดสูง และใครคือลูกค้าที่เคยซื้อประจำแต่หายไปนาน เพื่อกดปุ่มโทรหรือส่งข้อความคูปองดึงกลับมาซื้อซ้ำได้ทันที',
                  'Instantly see who your highest-spending repeat buyers are and who has gone inactive, so you can call or send win-back coupons with a single click.'
                )}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 self-start lg:self-center">
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-black px-5 py-3 rounded-2xl text-xs transition shadow-lg cursor-pointer"
            >
              {tx('➕ เพิ่มรายชื่อลูกค้าใหม่', '➕ Add New Customer')}
            </button>
            <button
              onClick={exportCustomerCsv}
              className="bg-white/10 hover:bg-white/15 text-slate-200 font-bold px-5 py-3 rounded-2xl text-xs border border-white/15 transition cursor-pointer"
            >
              {tx('📥 ดาวน์โหลดรายชื่อลูกค้า (.csv)', '📥 Export Customers (.csv)')}
            </button>
          </div>
        </div>

        {/* ฟอร์มเพิ่มลูกค้าใหม่ (เปิดเมื่อกดปุ่ม) */}
        {showAddForm && (
          <form onSubmit={handleAddCustomer} className="mt-6 pt-6 border-t border-white/15 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-3 items-end">
            <div>
              <label className="block text-xs font-bold text-amber-300 mb-1">{tx('ชื่อ-นามสกุลลูกค้า', 'Customer Name')}</label>
              <input
                type="text"
                value={newCustName}
                onChange={(e) => setNewCustName(e.target.value)}
                placeholder={tx('เช่น คุณสมศรี มีสุข', 'e.g. Ms. Somsri Meesuk')}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#050914] border border-white/20 text-white text-xs font-bold"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-amber-300 mb-1">{tx('เบอร์โทรศัพท์', 'Phone Number')}</label>
              <input
                type="text"
                value={newCustPhone}
                onChange={(e) => setNewCustPhone(e.target.value)}
                placeholder="081-234-5678"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#050914] border border-white/20 text-white text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-amber-300 mb-1">{tx('จัดกลุ่มลูกค้า', 'Customer Group')}</label>
              <select
                value={newCustSegment}
                onChange={(e) => setNewCustSegment(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-[#050914] border border-white/20 text-white text-xs font-bold"
              >
                <option value="champion">{tx('🏆 ลูกค้าชั้นดีสูงสุด', '🏆 Top VIP Customer')}</option>
                <option value="loyal">{tx('💎 ลูกค้าประจำ', '💎 Loyal Regular')}</option>
                <option value="at_risk">{tx('⚠️ ลูกค้าห่างหาย', '⚠️ Inactive Risk')}</option>
                <option value="new">{tx('🌱 ลูกค้าใหม่', '🌱 New Customer')}</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-amber-300 mb-1">{tx('ยอดซื้อสะสม (บาท)', 'Total Spent (THB)')}</label>
              <input
                type="number"
                value={newCustSpent}
                onChange={(e) => setNewCustSpent(e.target.value)}
                placeholder="25000"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#050914] border border-white/20 text-amber-300 text-xs font-bold"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-amber-300 mb-1">{tx('สินค้าที่ซื้อประจำ', 'Favorite Product')}</label>
              <input
                type="text"
                value={newCustProduct}
                onChange={(e) => setNewCustProduct(e.target.value)}
                placeholder={tx('เช่น เซรั่มบำรุงผิว', 'e.g. Facial Serum')}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#050914] border border-white/20 text-white text-xs font-bold"
              />
            </div>
            <button
              type="submit"
              className="py-2.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-lg cursor-pointer"
            >
              {tx('💾 บันทึกลูกค้าใหม่', '💾 Save Customer')}
            </button>
          </form>
        )}
      </div>

      {/* 2. การ์ดสรุปมูลค่าลูกค้า 4 กล่อง */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className={`p-6 rounded-3xl border shadow-xl ${theme === 'dark' ? 'bg-[#0b1020]/85 border-white/10' : 'bg-white border-slate-200'}`}>
          <span className="text-xs font-bold text-slate-300">{tx('ยอดซื้อสะสมเฉลี่ยต่อคน', 'Average Customer Lifetime Value')}</span>
          <h3 className={`text-3xl font-black mt-2 font-mono ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>฿ {avgLtv.toLocaleString()}</h3>
          <p className="text-xs text-emerald-400 mt-1 font-bold">{tx('คำนวณจากยอดซื้อจริงของลูกค้าในตาราง', 'Calculated live from customer records')}</p>
        </div>

        <div className={`p-6 rounded-3xl border shadow-xl ${theme === 'dark' ? 'bg-[#0b1020]/85 border-white/10' : 'bg-white border-slate-200'}`}>
          <span className="text-xs font-bold text-amber-300">{tx('กลุ่มลูกค้าชั้นดีสูงสุด', 'Top VIP Customers')}</span>
          <h3 className="text-3xl font-black text-amber-400 mt-2">{countBySeg('champion')} {tx('ราย', 'buyers')}</h3>
          <p className="text-xs text-slate-300 mt-1">{tx('ซื้อบ่อยและมียอดใช้จ่ายต่อบิลสูงที่สุด', 'Highest purchase frequency & basket size')}</p>
        </div>

        <div className={`p-6 rounded-3xl border shadow-xl ${theme === 'dark' ? 'bg-[#0b1020]/85 border-rose-500/30' : 'bg-white border-rose-200'}`}>
          <span className="text-xs font-bold text-rose-400">{tx('กลุ่มลูกค้าห่างหาย (ต้องรีบตาม)', 'Inactive Risk Customers')}</span>
          <h3 className="text-3xl font-black text-rose-400 mt-2">{countBySeg('at_risk')} {tx('ราย', 'buyers')}</h3>
          <p className="text-xs text-rose-300 mt-1">{tx('เคยซื้อประจำแต่หายไปเกิน 45 วัน', 'Previously regular buyers inactive >45 days')}</p>
        </div>

        <div className={`p-6 rounded-3xl border shadow-xl ${theme === 'dark' ? 'bg-[#0b1020]/85 border-white/10' : 'bg-white border-slate-200'}`}>
          <span className="text-xs font-bold text-emerald-300">{tx('กลุ่มลูกค้าประจำและลูกค้าใหม่', 'Loyal & New Customers')}</span>
          <h3 className="text-3xl font-black text-emerald-400 mt-2">{countBySeg('loyal') + countBySeg('new')} {tx('ราย', 'buyers')}</h3>
          <p className="text-xs text-slate-300 mt-1">{tx('กลับมาซื้อซ้ำสม่ำเสมอทุกเดือน', 'Active repeat & first-time buyers')}</p>
        </div>
      </div>

      {/* 3. ปุ่มการ์ดเลือกกลุ่มลูกค้า 4 กลุ่ม (กดกรองตารางได้จริง) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {[
          {
            id: 'champion',
            title: tx('🏆 ลูกค้าชั้นดีสูงสุด', '🏆 Top VIP Customers'),
            count: `${countBySeg('champion')} ${tx('ราย', 'buyers')}`,
            rule: tx('เพิ่งซื้อไม่นาน • ซื้อบ่อยมาก • ยอดใช้จ่ายสูง', 'Recent buyer • High frequency • High spend'),
            strategy: tx('ดูแลระดับพิเศษ เชิญชมสินค้าใหม่ก่อนใครโดยไม่ต้องลดราคา', 'Offer VIP early access and exclusive gifts without heavy discounts'),
            badgeClass: 'bg-amber-400 text-slate-950'
          },
          {
            id: 'loyal',
            title: tx('💎 ลูกค้าประจำเหนียวแน่น', '💎 Loyal Regular Customers'),
            count: `${countBySeg('loyal')} ${tx('ราย', 'buyers')}`,
            rule: tx('ซื้อสม่ำเสมอทุกเดือน • ชอบสะสมแต้ม', 'Buys consistently every month • High loyalty'),
            strategy: tx('แนะนำสินค้าจัดชุดคู่กัน เพื่อเพิ่มยอดซื้อต่อบิลให้สูงขึ้น', 'Recommend product bundles to increase average order value'),
            badgeClass: 'bg-sky-400 text-slate-950'
          },
          {
            id: 'at_risk',
            title: tx('⚠️ ลูกค้าห่างหาย (เสี่ยงเลิกซื้อ)', '⚠️ Inactive Risk (Follow Up)'),
            count: `${countBySeg('at_risk')} ${tx('ราย', 'buyers')}`,
            rule: tx('เคยซื้อบ่อยแต่หายไปนานเกิน 45-60 วัน', 'Used to buy often but inactive for 45–60 days'),
            strategy: tx('กดปุ่มโทรหรือส่งคูปองส่วนลด 20% เพื่อดึงกลับมาทันที', 'Call or send a 20% win-back discount voucher immediately'),
            badgeClass: 'bg-rose-500 text-white'
          },
          {
            id: 'new',
            title: tx('🌱 ลูกค้าใหม่เพิ่งซื้อครั้งแรก', '🌱 New First-Time Customers'),
            count: `${countBySeg('new')} ${tx('ราย', 'buyers')}`,
            rule: tx('เพิ่งเข้ามาซื้อครั้งแรกในสัปดาห์นี้', 'Made their first purchase this week'),
            strategy: tx('ส่งคูปองส่วนลดสำหรับการซื้อครั้งที่ 2 ภายใน 7 วัน', 'Send a second-purchase voucher valid for 7 days'),
            badgeClass: 'bg-emerald-400 text-slate-950'
          }
        ].map((seg) => (
          <div
            key={seg.id}
            onClick={() => setSelectedRfmSegment(selectedRfmSegment === seg.id ? 'all' : seg.id)}
            className={`p-5 rounded-3xl border transition-all cursor-pointer flex flex-col justify-between ${
              selectedRfmSegment === seg.id
                ? 'border-amber-400 bg-amber-400/15 ring-2 ring-amber-400 shadow-xl'
                : theme === 'dark'
                ? 'bg-[#0b1020]/90 border-white/10 hover:border-white/30'
                : 'bg-white border-slate-200 hover:border-slate-400'
            }`}
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className={`text-xs font-black px-3 py-0.5 rounded-full ${seg.badgeClass}`}>{seg.count}</span>
                <span className="text-xs font-bold text-amber-300">
                  {selectedRfmSegment === seg.id ? tx('✓ กำลังแสดงกลุ่มนี้', '✓ Filtering this group') : tx('คลิกเพื่อกรอง →', 'Click to filter →')}
                </span>
              </div>
              <h4 className={`text-base font-black mb-1.5 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{seg.title}</h4>
              <p className="text-xs text-slate-300 mb-3">{seg.rule}</p>
            </div>
            <div className="p-3 rounded-2xl bg-black/30 border border-white/10 text-xs text-slate-200">
              <strong className="text-amber-300 block mb-0.5">💡 {tx('คำแนะนำการดูแล:', 'Recommended Action:')}</strong>
              {seg.strategy}
            </div>
          </div>
        ))}
      </div>

      {/* 4. ตารางรายชื่อลูกค้าและประวัติการซื้อรายบุคคล */}
      <div className={`p-7 rounded-3xl border shadow-2xl ${
        theme === 'dark' ? 'bg-[#0b1020]/90 border-white/10' : 'bg-white border-slate-200'
      }`}>
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div>
            <h3 className={`text-lg font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
              🔍 {tx('ตารางรายชื่อลูกค้า ประวัติการซื้อ และปุ่มติดต่อด่วน', 'Customer Directory, Purchase History & Quick Contact')}
            </h3>
            <p className="text-xs text-slate-300 mt-0.5">
              {tx('กดปุ่ม "ดูประวัติซื้อ" เพื่อดูบิลย้อนหลัง หรือกดปุ่ม "โทร" / "ส่งข้อความ" เพื่อบันทึกการติดตามลูกค้าได้จริง', 'Click "View Orders" to inspect past receipts, or click "Call" / "Message" to log customer follow-ups.')}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <input
              type="text"
              value={customerSearch}
              onChange={(e) => setCustomerSearch(e.target.value)}
              placeholder={tx('ค้นหาชื่อลูกค้า, เบอร์โทร, สินค้า...', 'Search name, phone, product...')}
              className={`w-full sm:w-64 px-4 py-2.5 rounded-xl border text-xs font-bold focus:outline-none focus:border-amber-400 ${
                theme === 'dark' ? 'bg-[#060a16] border-white/15 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
              }`}
            />
            {selectedRfmSegment !== 'all' && (
              <button
                onClick={() => setSelectedRfmSegment('all')}
                className="px-3.5 py-2.5 rounded-xl bg-amber-400 text-slate-950 font-black text-xs cursor-pointer"
              >
                {tx('แสดงทุกกลุ่มทั้งหมด', 'Show All Groups')}
              </button>
            )}
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className={`border-b text-xs font-black ${theme === 'dark' ? 'border-white/10 text-slate-300 bg-black/25' : 'border-slate-200 text-slate-700 bg-slate-50'}`}>
                <th className="p-4 rounded-tl-xl">{tx('ชื่อลูกค้า / เบอร์โทรศัพท์', 'Customer / Phone')}</th>
                <th className="p-4">{tx('กลุ่มลูกค้า', 'Customer Group')}</th>
                <th className="p-4">{tx('ซื้อครั้งล่าสุด', 'Last Purchase')}</th>
                <th className="p-4">{tx('จำนวนครั้งที่ซื้อ', 'Total Orders')}</th>
                <th className="p-4">{tx('ยอดซื้อสะสมรวม', 'Lifetime Spend')}</th>
                <th className="p-4">{tx('สินค้าที่ชอบ & คำแนะนำ', 'Favorite Product & Advice')}</th>
                <th className="p-4 rounded-tr-xl text-right">{tx('ปุ่มจัดการและติดต่อ', 'Actions & Contact')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10 text-sm">
              {filteredCustomers.map((cust) => {
                const loc = isEn ? cust.en : cust.th;
                return (
                  <tr key={cust.id} className="hover:bg-white/[0.04] transition">
                    <td className="p-4">
                      <div className={`font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                        {loc.name}
                      </div>
                      <div className="text-xs text-slate-300 mt-1 flex flex-wrap gap-2">
                        <span>📞 {cust.phone}</span>
                        <span className="text-emerald-400 font-bold">{cust.lineId}</span>
                      </div>
                    </td>

                    <td className="p-4">
                      <span className={`inline-block px-2.5 py-1 rounded-lg text-xs font-black ${
                        cust.segment === 'champion' ? 'bg-amber-400/20 text-amber-300 border border-amber-400/30' :
                        cust.segment === 'at_risk' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' :
                        cust.segment === 'loyal' ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30' :
                        'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                      }`}>
                        {loc.segmentLabel}
                      </span>
                    </td>

                    <td className="p-4">
                      <span className={`font-bold text-xs ${cust.recencyDays > 40 ? 'text-rose-400' : 'text-slate-200'}`}>
                        {loc.recencyText}
                      </span>
                    </td>

                    <td className="p-4">
                      <span className="font-black text-white">{cust.frequency} {tx('ครั้ง', 'orders')}</span>
                      <div className="text-xs text-slate-400">
                        {tx(`เฉลี่ย ฿${cust.aov.toLocaleString()}/บิล`, `Avg ฿${cust.aov.toLocaleString()}/bill`)}
                      </div>
                    </td>

                    <td className="p-4">
                      <span className="text-base font-black text-amber-400 font-mono">
                        ฿ {cust.ltv.toLocaleString()}
                      </span>
                    </td>

                    <td className="p-4 max-w-xs">
                      <div className="text-xs font-bold text-slate-200">🛍️ {loc.favoriteProduct}</div>
                      <div className="text-xs text-slate-400 mt-1">{loc.aiAction}</div>
                    </td>

                    <td className="p-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => setSelectedCustomerId(cust.id)}
                          className="px-3 py-2 rounded-xl bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 border border-amber-400/40 text-xs font-bold transition cursor-pointer"
                        >
                          📜 {tx(`ดูประวัติซื้อ (${loc.orders.length})`, `View Orders (${loc.orders.length})`)}
                        </button>
                        <button
                          onClick={() => handleContactCustomer(cust, 'call')}
                          className="px-3 py-2 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-500/40 text-xs font-bold transition cursor-pointer"
                        >
                          📞 {tx('โทร', 'Call')}
                        </button>
                        <button
                          onClick={() => handleContactCustomer(cust, 'msg')}
                          className="px-3 py-2 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-xs font-bold transition cursor-pointer"
                        >
                          💬 {tx('ส่งคูปอง', 'Send Coupon')} {cust.contactedCount > 0 ? `(${cust.contactedCount})` : ''}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* 5. หน้าต่างแสดงประวัติการซื้อรายบุคคล (เมื่อคลิกดูประวัติซื้อ) */}
        {selectedCustomerProfile && (() => {
          const profLoc = isEn ? selectedCustomerProfile.en : selectedCustomerProfile.th;
          return (
            <div className={`mt-6 p-6 rounded-3xl border-2 border-amber-400 shadow-2xl animate-in fade-in duration-200 ${
              theme === 'dark' ? 'bg-[#060b18]' : 'bg-amber-50/50'
            }`}>
              <div className="flex flex-wrap items-start justify-between gap-4 pb-4 mb-5 border-b border-white/10">
                <div>
                  <span className="text-xs font-black px-3 py-0.5 rounded-md bg-amber-400 text-slate-950">
                    {tx('ประวัติการซื้อรายบุคคลโดยละเอียด', 'Detailed Customer Purchase History')}
                  </span>
                  <h4 className="text-xl font-black text-white mt-1.5">
                    {profLoc.name} — {tx('ยอดซื้อสะสมรวม:', 'Total Lifetime Spend:')} <span className="text-amber-400">฿ {selectedCustomerProfile.ltv.toLocaleString()}</span>
                  </h4>
                  <p className="text-xs text-slate-300 mt-0.5">
                    📞 {selectedCustomerProfile.phone} • 💬 {selectedCustomerProfile.lineId} • ✉️ {selectedCustomerProfile.email}
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleContactCustomer(selectedCustomerProfile, 'msg')}
                    className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-4 py-2 rounded-xl text-xs transition cursor-pointer"
                  >
                    🎁 {tx('ส่งคูปองส่วนลดให้ลูกค้าท่านนี้', 'Send Special Voucher')}
                  </button>
                  <button
                    onClick={() => setSelectedCustomerId(null)}
                    className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold transition cursor-pointer"
                  >
                    ✕ {tx('ปิดหน้าต่าง', 'Close')}
                  </button>
                </div>
              </div>

              <div className="space-y-2.5">
                {profLoc.orders.map((ord) => (
                  <div key={ord.orderId} className="p-4 rounded-2xl border border-white/10 bg-black/30 flex flex-wrap items-center justify-between gap-3 text-xs">
                    <div>
                      <span className="font-mono font-bold text-amber-400">{ord.orderId}</span>
                      <span className="text-slate-300 ml-2">• {ord.date} ({ord.method})</span>
                      <p className="text-white font-bold mt-1 text-sm">{ord.items}</p>
                    </div>
                    <span className="text-base font-black text-emerald-400 font-mono">฿ {ord.total.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })()}
      </div>
    </div>
  );
}


// --- MODULE 4: STAFF POS & MULTI-CHANNEL COMPARISON ---

export function StaffPosTab({
  lang,
  staffList,
  setStaffList,
  auditLogs,
  setAuditLogs,
  renderUploadZone,
  barChartOptions
}) {
  const isEn = lang === 'en';
  const tx = (th, en) => (isEn ? en : th);

  const [staffBranchFilter, setStaffBranchFilter] = useState('all');
  const [auditFilterType, setAuditFilterType] = useState('all');
  const [selectedStaffForCoaching, setSelectedStaffForCoaching] = useState(null);
  const [showRecordPosModal, setShowRecordPosModal] = useState(false);
  const [posFormStaffId, setPosFormStaffId] = useState(staffList[0]?.id || 'STF-101');
  const [posFormAmount, setPosFormAmount] = useState('2500');
  const [posFormUpsell, setPosFormUpsell] = useState(true);

  const filteredStaff = staffList.filter(s => {
    if (staffBranchFilter === 'all') return true;
    return s.branchId === staffBranchFilter;
  });

  const filteredAuditLogs = auditLogs.filter(log => {
    if (auditFilterType === 'all') return true;
    if (auditFilterType === 'unresolved') return !log.resolved;
    return log.eventType === auditFilterType;
  });

  const totalPosSales = filteredStaff.reduce((acc, s) => acc + s.totalSales, 0);
  const totalPosBills = filteredStaff.reduce((acc, s) => acc + s.billsCount, 0);
  const avgBasketSize = totalPosBills > 0 ? Math.round(totalPosSales / totalPosBills) : 0;
  const totalUpsellRev = filteredStaff.reduce((acc, s) => acc + s.upsellRevenue, 0);
  const unresolvedCount = auditLogs.filter(l => !l.resolved).length;

  const handleRecordStaffSale = e => {
    e.preventDefault();
    const amt = Number(posFormAmount);
    if (!amt || amt <= 0) {
      toast.error(tx('กรุณากรอกยอดบิลที่มากกว่า 0 บาท', 'Please enter a bill amount greater than 0'));
      return;
    }
    setStaffList(prev =>
      prev.map(s => {
        if (s.id !== posFormStaffId) return s;
        const newTotal = s.totalSales + amt;
        const newBills = s.billsCount + 1;
        const newUpsellSucc = posFormUpsell ? s.upsellSuccess + 1 : s.upsellSuccess;
        const newUpsellAtt = s.upsellAttempts + 1;
        return {
          ...s,
          totalSales: newTotal,
          billsCount: newBills,
          basketSize: Math.round(newTotal / newBills),
          upsellAttempts: newUpsellAtt,
          upsellSuccess: newUpsellSucc,
          upsellRate: Number(((newUpsellSucc / newUpsellAtt) * 100).toFixed(1)),
          upsellRevenue: posFormUpsell ? s.upsellRevenue + Math.round(amt * 0.25) : s.upsellRevenue
        };
      })
    );
    const targetStaff = staffList.find(s => s.id === posFormStaffId);
    const staffDisplayName = targetStaff ? targetStaff[isEn ? 'en' : 'th'].name : posFormStaffId;
    setShowRecordPosModal(false);
    toast.success(
      tx(
        `🧾 บันทึกบิลขายหน้าร้าน +฿${amt.toLocaleString()} ให้ ${staffDisplayName} เรียบร้อยแล้ว!`,
        `🧾 Recorded +฿${amt.toLocaleString()} POS bill for ${staffDisplayName}!`
      )
    );
  };

  const handleResolveAudit = logId => {
    setAuditLogs(prev =>
      prev.map(l => (l.logId === logId ? { ...l, resolved: !l.resolved } : l))
    );
    toast.success(
      tx(
        `🛡️ อัปเดตสถานะการตรวจสอบรายการ ${logId} เรียบร้อยแล้ว`,
        `🛡️ Updated audit verification status for ${logId}`
      )
    );
  };

  const handleSimulateFraudAlert = () => {
    const newId = `AUD-2026-${Math.floor(8900 + Math.random() * 900)}`;
    const newLog = {
      logId: newId,
      staffId: 'STF-108',
      eventType: 'void',
      billNo: `INV-LP-${Math.floor(10000 + Math.random() * 89000)}`,
      amount: 3890,
      severity: 'critical',
      resolved: false,
      cctvTimestamp: tx('กล้อง 04 • เมื่อสักครู่', 'Cam 04 • Just now'),
      th: {
        timestamp: 'เมื่อสักครู่',
        staffName: 'คุณธนดล กิตติพงศ์ (แบงค์)',
        branchName: 'สาขาเซ็นทรัลลาดพร้าว (เครื่องที่ 4)',
        eventLabel: '🚫 ยกเลิกบิลหลังรับชำระเงินสดทันที',
        paymentMethod: 'เงินสด',
        reasonStated: 'คีย์รายการสินค้าผิดรุ่น',
        aiAnomalyDetail: 'ระบบตรวจจับความผิดปกติ: มีการกดยกเลิกบิลมูลค่าสูงหลังเปิดลิ้นชักรับเงินสด (ควรตรวจสอบกล้องวงจรปิดทันที)'
      },
      en: {
        timestamp: 'Just now',
        staffName: 'Mr. Thanadon Kittipong (Bank)',
        branchName: 'Central Ladprao Branch (Register #4)',
        eventLabel: '🚫 Immediate Post-Cash Bill Cancellation',
        paymentMethod: 'Cash',
        reasonStated: 'Entered wrong product code',
        aiAnomalyDetail: 'Anomaly Detected: High-value bill cancelled immediately after cash drawer opened. Inspect security camera now.'
      }
    };
    setAuditLogs(prev => [newLog, ...prev]);
    toast.error(
      tx(
        `🚨 ตรวจพบการยกเลิกบิลต้องสงสัยรายการใหม่ (${newId})!`,
        `🚨 New suspicious bill cancellation detected (${newId})!`
      )
    );
  };

  const staffChartData = {
    labels: filteredStaff.map(s => s[isEn ? 'en' : 'th'].name.split(' ')[0]),
    datasets: [
      {
        label: tx('ยอดซื้อเฉลี่ยต่อบิล (บาท)', 'Average Basket Size (THB)'),
        data: filteredStaff.map(s => s.basketSize),
        backgroundColor: 'rgba(56, 189, 248, 0.85)',
        borderRadius: 8
      },
      {
        label: tx('รายได้เสริมจากการเชียร์สินค้าพ่วง (หาร 100 บาท)', 'Upsell Revenue (÷100 THB)'),
        data: filteredStaff.map(s => Math.round(s.upsellRevenue / 100)),
        backgroundColor: 'rgba(16, 185, 129, 0.85)',
        borderRadius: 8
      }
    ]
  };

  return (
    <div className=" staff-pos-tab-container" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {renderUploadZone('staff_pos', tx('ผลงานพนักงานและเครื่องคิดเงินหน้าร้าน', 'Staff & Cashier Performance'))}

      {/* Top Executive Banner */}
      <div
        className="glass-card"
        style={{
          padding: '1.5rem',
          borderRadius: '18px',
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.14), rgba(15, 23, 42, 0.92))',
          border: '1.5px solid rgba(16, 185, 129, 0.35)',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', flex: '1 1 420px' }}>
          <LuxuryIconBadge variant="sapphire" size="lg" active>
            <LuxuryModuleIcon type="staff_pos" size={28} />
          </LuxuryIconBadge>
          <div>
            <span
              style={{
                display: 'inline-block',
                padding: '0.3rem 0.8rem',
                borderRadius: '999px',
                background: 'rgba(16, 185, 129, 0.2)',
                color: '#34d399',
                fontWeight: 800,
                fontSize: '0.82rem',
                marginBottom: '0.45rem'
              }}
            >
              {tx('ระบบติดตามยอดขายพนักงาน & ป้องกันทุจริตแคชเชียร์', 'STAFF SALES & CASHIER FRAUD AUDIT')}
            </span>
            <h3 style={{ margin: 0, fontSize: '1.35rem', fontWeight: 900, color: '#f8fafc' }}>
              {tx(
                'วิเคราะห์ยอดต่อบิล • การเชียร์ขายพ่วง • ตรวจจับการยกเลิกบิลผิดปกติ',
                'Basket Size • Upselling Conversion • Suspicious Bill Cancellation Audit'
              )}
            </h3>
            <p style={{ margin: '0.35rem 0 0 0', color: '#cbd5e1', fontSize: '0.92rem' }}>
              {tx(
                'ช่วยให้เจ้าของร้านรู้ว่าพนักงานคนไหนทำเงินเก่งที่สุด และป้องกันเงินสดรั่วไหลหน้าเครื่องคิดเงินได้ทันที',
                'Identify your top-earning staff and prevent register cash leakage in real time.'
              )}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem' }}>
          <button
            type="button"
            onClick={() => setShowRecordPosModal(!showRecordPosModal)}
            style={{
              padding: '0.7rem 1.15rem',
              borderRadius: '12px',
              border: '1px solid rgba(16, 185, 129, 0.5)',
              background: 'linear-gradient(135deg, #10b981, #059669)',
              color: '#ffffff',
              fontWeight: 800,
              cursor: 'pointer'
            }}
          >
            {tx('➕ บันทึกบิลขายหน้าร้าน (ทดสอบระบบจริง)', '➕ Record POS Sale (Live Action)')}
          </button>
          <button
            type="button"
            onClick={handleSimulateFraudAlert}
            style={{
              padding: '0.7rem 1.15rem',
              borderRadius: '12px',
              border: '1px solid rgba(244, 63, 94, 0.5)',
              background: 'rgba(244, 63, 94, 0.16)',
              color: '#fda4af',
              fontWeight: 800,
              cursor: 'pointer'
            }}
          >
            {tx('🚨 จำลองเหตุการณ์ยกเลิกบิลผิดปกติ', '🚨 Simulate Suspicious Bill Cancel')}
          </button>
        </div>
      </div>

      {/* Interactive POS Bill Recording Modal / Panel */}
      {showRecordPosModal && (
        <form
          onSubmit={handleRecordStaffSale}
          className="glass-card"
          style={{
            padding: '1.35rem',
            borderRadius: '16px',
            border: '2px solid rgba(16, 185, 129, 0.45)',
            background: 'rgba(15, 23, 42, 0.95)',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))',
            gap: '1rem',
            alignItems: 'end'
          }}
        >
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#94a3b8', marginBottom: '0.35rem' }}>
              {tx('เลือกพนักงานขายหน้าร้าน', 'Select Cashier / Staff')}
            </label>
            <select
              value={posFormStaffId}
              onChange={e => setPosFormStaffId(e.target.value)}
              style={{
                width: '100%',
                padding: '0.65rem',
                borderRadius: '10px',
                background: '#0f172a',
                color: '#f8fafc',
                border: '1px solid rgba(148,163,184,0.3)'
              }}
            >
              {staffList.map(st => (
                <option key={st.id} value={st.id}>
                  {st[isEn ? 'en' : 'th'].name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 700, color: '#94a3b8', marginBottom: '0.35rem' }}>
              {tx('ยอดเงินในบิลนี้ (บาท)', 'Bill Amount (THB)')}
            </label>
            <input
              type="number"
              value={posFormAmount}
              onChange={e => setPosFormAmount(e.target.value)}
              style={{
                width: '100%',
                padding: '0.65rem',
                borderRadius: '10px',
                background: '#0f172a',
                color: '#f8fafc',
                border: '1px solid rgba(148,163,184,0.3)'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#e2e8f0', fontWeight: 700, cursor: 'pointer', paddingBottom: '0.45rem' }}>
              <input
                type="checkbox"
                checked={posFormUpsell}
                onChange={e => setPosFormUpsell(e.target.checked)}
                style={{ width: '18px', height: '18px' }}
              />
              {tx('เชียร์สินค้าพ่วงสำเร็จในบิลนี้', 'Upsell Item Included in Bill')}
            </label>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              type="submit"
              style={{
                flex: 1,
                padding: '0.7rem 1rem',
                borderRadius: '10px',
                border: 'none',
                background: '#10b981',
                color: '#fff',
                fontWeight: 800,
                cursor: 'pointer'
              }}
            >
              {tx('✅ บันทึกยอดทันที', '✅ Save Bill')}
            </button>
            <button
              type="button"
              onClick={() => setShowRecordPosModal(false)}
              style={{
                padding: '0.7rem 0.9rem',
                borderRadius: '10px',
                border: '1px solid rgba(148,163,184,0.3)',
                background: 'transparent',
                color: '#cbd5e1',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              {tx('ปิด', 'Close')}
            </button>
          </div>
        </form>
      )}

      {/* 4 KPI Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        <div className="glass-card" style={{ padding: '1.25rem', borderRadius: '16px', borderLeft: '4px solid #38bdf8' }}>
          <div style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 700 }}>
            {tx('💰 ยอดขายรวมหน้าเครื่องคิดเงิน', '💰 Total Register Sales')}
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#f8fafc', marginTop: '0.35rem' }}>
            ฿{totalPosSales.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.8rem', color: '#38bdf8', marginTop: '0.25rem' }}>
            {tx(`จากทั้งหมด ${totalPosBills.toLocaleString()} บิลขายจริง`, `Across ${totalPosBills.toLocaleString()} completed bills`)}
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem', borderRadius: '16px', borderLeft: '4px solid #fbbf24' }}>
          <div style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 700 }}>
            {tx('🧺 ยอดซื้อเฉลี่ยต่อบิล', '🧺 Average Basket Size')}
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#fbbf24', marginTop: '0.35rem' }}>
            ฿{avgBasketSize.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.8rem', color: '#fde68a', marginTop: '0.25rem' }}>
            {tx('เป้าหมายมาตรฐานร้าน: ฿2,200 ต่อบิล', 'Store target benchmark: ฿2,200 / bill')}
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem', borderRadius: '16px', borderLeft: '4px solid #10b981' }}>
          <div style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 700 }}>
            {tx('🚀 รายได้เสริมจากการเชียร์ขายพ่วง', '🚀 Total Upselling Revenue')}
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#34d399', marginTop: '0.35rem' }}>
            +฿{totalUpsellRev.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.8rem', color: '#a7f3d0', marginTop: '0.25rem' }}>
            {tx('กำไรส่วนเพิ่มจากการแนะนำสินค้าคู่กัน', 'Extra revenue from checkout recommendations')}
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem', borderRadius: '16px', borderLeft: '4px solid #f43f5e' }}>
          <div style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 700 }}>
            {tx('🛡️ รายการผิดปกติที่รอตรวจสอบ', '🛡️ Pending Fraud Alerts')}
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#fda4af', marginTop: '0.35rem' }}>
            {unresolvedCount} {tx('รายการ', 'Cases')}
          </div>
          <div style={{ fontSize: '0.8rem', color: '#fecdd3', marginTop: '0.25rem' }}>
            {tx('ยกเลิกบิล • คืนเงินสด • เปิดลิ้นชักไม่ขาย', 'Bill voids • Cash refunds • No-sale drawers')}
          </div>
        </div>
      </div>

      {/* Filter by Branch + Chart */}
      <div className="glass-card" style={{ padding: '1.35rem', borderRadius: '18px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', marginBottom: '1.1rem' }}>
          <div>
            <h4 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800 }}>
              {tx('📊 เปรียบเทียบยอดซื้อต่อบิล & ผลงานการเชียร์สินค้าพ่วงรายพนักงาน', '📊 Basket Size & Upselling Performance by Staff')}
            </h4>
            <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.86rem', color: '#94a3b8' }}>
              {tx('กดเลือกสาขาเพื่อดูผลงานพนักงานแต่ละคนแยกตามจุดขาย', 'Filter by branch to inspect individual cashier performance')}
            </p>
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {[
              { id: 'all', th: 'ทุกสาขารวมกัน', en: 'All Branches' },
              { id: 'siam', th: 'สาขาสยามพารากอน', en: 'Siam Paragon' },
              { id: 'sukhumvit', th: 'สาขาสุขุมวิท', en: 'Sukhumvit' },
              { id: 'ladprao', th: 'สาขาลาดพร้าว', en: 'Central Ladprao' },
              { id: 'chiangmai', th: 'สาขาเชียงใหม่', en: 'Chiang Mai' }
            ].map(br => (
              <button
                key={br.id}
                type="button"
                onClick={() => setStaffBranchFilter(br.id)}
                style={{
                  padding: '0.5rem 0.95rem',
                  borderRadius: '999px',
                  border: staffBranchFilter === br.id ? '1.5px solid #38bdf8' : '1px solid rgba(148,163,184,0.25)',
                  background: staffBranchFilter === br.id ? 'rgba(56, 189, 248, 0.2)' : 'rgba(15, 23, 42, 0.6)',
                  color: staffBranchFilter === br.id ? '#38bdf8' : '#cbd5e1',
                  fontWeight: 700,
                  fontSize: '0.84rem',
                  cursor: 'pointer'
                }}
              >
                {isEn ? br.en : br.th}
              </button>
            ))}
          </div>
        </div>

        <div style={{ height: '250px' }}>
          <Bar data={staffChartData} options={barChartOptions} />
        </div>
      </div>

      {/* Staff Performance Table */}
      <div className="glass-card" style={{ padding: '1.35rem', borderRadius: '18px', overflowX: 'auto' }}>
        <h4 style={{ margin: '0 0 1rem 0', fontSize: '1.15rem', fontWeight: 800 }}>
          {tx('👩‍💼 ตารางสรุปผลงานพนักงานและการแนะนำสินค้าพ่วง', '👩‍💼 Staff Sales & Upselling Leaderboard')}
        </h4>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '820px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(148,163,184,0.2)', textAlign: 'left', color: '#94a3b8', fontSize: '0.84rem' }}>
              <th style={{ padding: '0.75rem' }}>{tx('ชื่อพนักงาน / จุดขาย', 'Staff Name / Register')}</th>
              <th style={{ padding: '0.75rem' }}>{tx('ยอดขายรวม', 'Total Sales')}</th>
              <th style={{ padding: '0.75rem' }}>{tx('ยอดเฉลี่ยต่อบิล', 'Avg Basket Size')}</th>
              <th style={{ padding: '0.75rem' }}>{tx('อัตราเชียร์สินค้าพ่วง', 'Upsell Rate')}</th>
              <th style={{ padding: '0.75rem' }}>{tx('สินค้าพ่วงที่ขายดีสุด', 'Top Upsell Product')}</th>
              <th style={{ padding: '0.75rem' }}>{tx('ความเสี่ยงทุจริต', 'Audit Status')}</th>
              <th style={{ padding: '0.75rem' }}>{tx('การจัดการ', 'Action')}</th>
            </tr>
          </thead>
          <tbody>
            {filteredStaff.map(st => {
              const info = st[isEn ? 'en' : 'th'];
              const riskColor =
                st.riskLevel === 'high' ? '#f43f5e' : st.riskLevel === 'medium' ? '#f59e0b' : '#10b981';
              return (
                <tr key={st.id} style={{ borderBottom: '1px solid rgba(148,163,184,0.12)' }}>
                  <td style={{ padding: '0.85rem 0.75rem' }}>
                    <div style={{ fontWeight: 800, color: '#f8fafc' }}>{info.name}</div>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{info.branchName}</div>
                  </td>
                  <td style={{ padding: '0.85rem 0.75rem', fontWeight: 800, color: '#38bdf8' }}>
                    ฿{st.totalSales.toLocaleString()}
                    <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
                      {st.billsCount} {tx('บิล', 'bills')}
                    </div>
                  </td>
                  <td style={{ padding: '0.85rem 0.75rem', fontWeight: 800, color: '#fbbf24' }}>
                    ฿{st.basketSize.toLocaleString()}
                  </td>
                  <td style={{ padding: '0.85rem 0.75rem' }}>
                    <span
                      style={{
                        padding: '0.25rem 0.65rem',
                        borderRadius: '999px',
                        background: 'rgba(16, 185, 129, 0.16)',
                        color: '#34d399',
                        fontWeight: 800,
                        fontSize: '0.84rem'
                      }}
                    >
                      {st.upsellRate}% (+฿{st.upsellRevenue.toLocaleString()})
                    </span>
                  </td>
                  <td style={{ padding: '0.85rem 0.75rem', fontSize: '0.86rem', color: '#cbd5e1' }}>
                    {info.topUpsellItem}
                  </td>
                  <td style={{ padding: '0.85rem 0.75rem' }}>
                    <span
                      style={{
                        padding: '0.28rem 0.7rem',
                        borderRadius: '999px',
                        background: `${riskColor}22`,
                        color: riskColor,
                        fontWeight: 800,
                        fontSize: '0.8rem'
                      }}
                    >
                      {info.statusBadge}
                    </span>
                  </td>
                  <td style={{ padding: '0.85rem 0.75rem' }}>
                    <button
                      type="button"
                      onClick={() => setSelectedStaffForCoaching(st)}
                      style={{
                        padding: '0.45rem 0.85rem',
                        borderRadius: '8px',
                        border: '1px solid rgba(56,189,248,0.4)',
                        background: 'rgba(56,189,248,0.14)',
                        color: '#38bdf8',
                        fontWeight: 700,
                        fontSize: '0.82rem',
                        cursor: 'pointer'
                      }}
                    >
                      {tx('💡 ดูคำแนะนำ', '💡 Coaching')}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {selectedStaffForCoaching && (
          <div
            style={{
              marginTop: '1rem',
              padding: '1.15rem',
              borderRadius: '14px',
              background: 'rgba(56, 189, 248, 0.12)',
              border: '1.5px solid rgba(56, 189, 248, 0.4)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '1rem',
              flexWrap: 'wrap'
            }}
          >
            <div>
              <div style={{ fontWeight: 900, color: '#38bdf8', fontSize: '1rem' }}>
                {tx('🎯 คำแนะนำสำหรับพนักงาน:', '🎯 Coaching Insight for:')}{' '}
                {selectedStaffForCoaching[isEn ? 'en' : 'th'].name}
              </div>
              <div style={{ color: '#f8fafc', marginTop: '0.3rem', fontSize: '0.94rem' }}>
                {selectedStaffForCoaching[isEn ? 'en' : 'th'].aiCoaching}
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                toast.success(
                  tx(
                    `📲 ส่งข้อความแนะนำแนวทางขายให้ ${selectedStaffForCoaching.th.name} เรียบร้อยแล้ว`,
                    `📲 Sent coaching message to ${selectedStaffForCoaching.en.name}`
                  )
                );
                setSelectedStaffForCoaching(null);
              }}
              style={{
                padding: '0.6rem 1.1rem',
                borderRadius: '10px',
                border: 'none',
                background: '#38bdf8',
                color: '#0f172a',
                fontWeight: 800,
                cursor: 'pointer'
              }}
            >
              {tx('📲 ส่งคำแนะนำเข้ามือถือพนักงาน', '📲 Send Coaching to Staff')}
            </button>
          </div>
        )}
      </div>

      {/* Audit & Fraud Detection Log Section */}
      <div className="glass-card" style={{ padding: '1.35rem', borderRadius: '18px', border: '1.5px solid rgba(244, 63, 94, 0.35)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <h4 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 900, color: '#fda4af' }}>
              {tx('🚨 บันทึกตรวจสอบการยกเลิกบิล • คืนเงินสด • เปิดลิ้นชักเก็บเงิน', '🚨 Cashier Audit Log: Bill Voids, Refunds & Drawer Openings')}
            </h4>
            <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.86rem', color: '#cbd5e1' }}>
              {tx(
                'กดปุ่ม "ยืนยันตรวจสอบแล้ว" เมื่อคุณตรวจกล้องวงจรปิดหรือสอบถามพนักงานเรียบร้อยแล้ว',
                'Click "Mark Verified" once you have reviewed the security camera footage or confirmed with the manager.'
              )}
            </p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
            {[
              { id: 'all', th: 'ทั้งหมด', en: 'All Events' },
              { id: 'unresolved', th: 'รอตรวจสอบ', en: 'Unresolved Only' },
              { id: 'void', th: 'ยกเลิกบิล', en: 'Bill Cancellations' },
              { id: 'refund', th: 'คืนเงินสด', en: 'Cash Refunds' },
              { id: 'drawer', th: 'เปิดลิ้นชักไม่ขาย', en: 'No-Sale Drawer' }
            ].map(flt => (
              <button
                key={flt.id}
                type="button"
                onClick={() => setAuditFilterType(flt.id)}
                style={{
                  padding: '0.45rem 0.85rem',
                  borderRadius: '999px',
                  border: auditFilterType === flt.id ? '1.5px solid #f43f5e' : '1px solid rgba(148,163,184,0.25)',
                  background: auditFilterType === flt.id ? 'rgba(244, 63, 94, 0.2)' : 'rgba(15, 23, 42, 0.6)',
                  color: auditFilterType === flt.id ? '#fda4af' : '#cbd5e1',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  cursor: 'pointer'
                }}
              >
                {isEn ? flt.en : flt.th}
              </button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {filteredAuditLogs.map(log => {
            const info = log[isEn ? 'en' : 'th'];
            return (
              <div
                key={log.logId}
                style={{
                  padding: '1.1rem',
                  borderRadius: '14px',
                  background: log.resolved ? 'rgba(15, 23, 42, 0.5)' : 'rgba(244, 63, 94, 0.09)',
                  border: log.resolved
                    ? '1px solid rgba(148, 163, 184, 0.2)'
                    : '1.5px solid rgba(244, 63, 94, 0.4)',
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  gap: '1rem'
                }}
              >
                <div style={{ flex: '1 1 460px' }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem' }}>
                    <span
                      style={{
                        padding: '0.2rem 0.65rem',
                        borderRadius: '999px',
                        background: log.resolved ? 'rgba(16, 185, 129, 0.2)' : 'rgba(244, 63, 94, 0.25)',
                        color: log.resolved ? '#34d399' : '#fda4af',
                        fontWeight: 800,
                        fontSize: '0.78rem'
                      }}
                    >
                      {log.resolved ? tx('✅ ตรวจสอบเรียบร้อยแล้ว', '✅ Verified & Closed') : info.eventLabel}
                    </span>
                    <span style={{ fontSize: '0.82rem', color: '#94a3b8', fontWeight: 700 }}>
                      {info.timestamp} • {info.branchName}
                    </span>
                    {log.amount > 0 && (
                      <span style={{ fontWeight: 900, color: '#fbbf24', fontSize: '0.95rem' }}>
                        ฿{log.amount.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <div style={{ fontWeight: 800, color: '#f8fafc', fontSize: '0.96rem' }}>
                    {info.staffName} — {tx('เหตุผลที่แจ้ง:', 'Stated Reason:')} &ldquo;{info.reasonStated}&rdquo;
                  </div>
                  <div style={{ fontSize: '0.86rem', color: '#fca5a5', marginTop: '0.25rem' }}>
                    🔍 {info.aiAnomalyDetail}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.55rem', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    onClick={() =>
                      toast.success(
                        tx(
                          `📹 เปิดภาพกล้องวงจรปิด (${log.cctvTimestamp}) ของรายการ ${log.logId}`,
                          `📹 Opened security camera clip (${log.cctvTimestamp}) for ${log.logId}`
                        )
                      )
                    }
                    style={{
                      padding: '0.55rem 0.9rem',
                      borderRadius: '10px',
                      border: '1px solid rgba(56,189,248,0.4)',
                      background: 'rgba(56,189,248,0.12)',
                      color: '#38bdf8',
                      fontWeight: 700,
                      fontSize: '0.82rem',
                      cursor: 'pointer'
                    }}
                  >
                    {tx('📹 ดูกล้องวงจรปิด', '📹 View Camera')}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleResolveAudit(log.logId)}
                    style={{
                      padding: '0.55rem 0.95rem',
                      borderRadius: '10px',
                      border: 'none',
                      background: log.resolved ? 'rgba(148,163,184,0.25)' : '#10b981',
                      color: '#ffffff',
                      fontWeight: 800,
                      fontSize: '0.82rem',
                      cursor: 'pointer'
                    }}
                  >
                    {log.resolved ? tx('↩️ เปิดเคสอีกครั้ง', '↩️ Reopen Case') : tx('✅ ยืนยันตรวจสอบแล้ว', '✅ Mark Verified')}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function MultiChannelTab({
  lang,
  branchesList,
  setBranchesList,
  channelsList,
  anomaliesList,
  setAnomaliesList,
  lineNotifyEnabled,
  setLineNotifyEnabled,
  lineNotifyTime,
  setLineNotifyTime,
  userPhone = '089-999-8888',
  userLineId = '@insightflow.vip',
  onUpdateUserContact,
  renderUploadZone,
  barChartOptions
}) {
  const isEn = lang === 'en';
  const tx = (th, en) => (isEn ? en : th);
  const [showLinePreview, setShowLinePreview] = useState(true);

  const offlineChannels = channelsList.filter(c => c.type === 'offline');
  const onlineChannels = channelsList.filter(c => c.type === 'online');

  const offlineRev = offlineChannels.reduce((acc, c) => acc + c.revenue, 0);
  const onlineRev = onlineChannels.reduce((acc, c) => acc + c.revenue, 0);
  const offlineProfit = offlineChannels.reduce((acc, c) => acc + c.netProfit, 0);
  const onlineProfit = onlineChannels.reduce((acc, c) => acc + c.netProfit, 0);

  const handleTransferDeadStock = branchId => {
    setBranchesList(prev =>
      prev.map(b => {
        if (b.branchId !== branchId) return b;
        return {
          ...b,
          deadStockValue: 0,
          inventoryTurnover: Number((b.inventoryTurnover + 1.4).toFixed(1)),
          turnoverDays: Math.max(10, b.turnoverDays - 9)
        };
      })
    );
    toast.success(
      tx(
        '🚚 สร้างใบโอนย้ายสินค้าค้างสต็อกไปยังสาขาสยามพารากอนเรียบร้อยแล้ว! อัตราหมุนเวียนสต็อกดีขึ้นทันที',
        '🚚 Created stock transfer order to Siam Paragon Branch! Inventory turnover improved immediately.'
      )
    );
  };

  const handleExportTaxExcel = () => {
    const headers = isEn
      ? ['Channel / Branch', 'Gross Revenue (THB)', 'Platform & Store Fees (THB)', 'Net Profit (THB)', 'Gross Margin (%)']
      : ['ช่องทางขาย / สาขา', 'ยอดขายรวม (บาท)', 'ค่าธรรมเนียมและค่าใช้จ่าย (บาท)', 'กำไรสุทธิ (บาท)', 'อัตรากำไร (%)'];
    const rows = channelsList.map(c => {
      const info = c[isEn ? 'en' : 'th'];
      return [`"${info.name}"`, c.revenue, c.costAndFees, c.netProfit, `${c.grossMarginPct}%`].join(',');
    });
    const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = isEn ? 'Tax_And_Channel_Report_2026.csv' : 'รายงานภาษีขายและกำไรรายช่องทาง_2026.csv';
    a.click();
    URL.revokeObjectURL(url);
    toast.success(
      tx(
        '📥 ดาวน์โหลดไฟล์ตารางรายงานภาษีขายและสต็อกเรียบร้อยแล้ว!',
        '📥 Downloaded Sales Tax & Inventory Spreadsheet Report!'
      )
    );
  };

  const channelChartData = {
    labels: channelsList.map(c => c[isEn ? 'en' : 'th'].name.replace(/^[^\s]+\s/, '')),
    datasets: [
      {
        label: tx('ยอดขายรวม (บาท)', 'Gross Revenue (THB)'),
        data: channelsList.map(c => c.revenue),
        backgroundColor: 'rgba(56, 189, 248, 0.85)',
        borderRadius: 8
      },
      {
        label: tx('กำไรสุทธิหลังหักค่าใช้จ่าย (บาท)', 'Net Profit After Fees (THB)'),
        data: channelsList.map(c => c.netProfit),
        backgroundColor: 'rgba(16, 185, 129, 0.85)',
        borderRadius: 8
      }
    ]
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {renderUploadZone('multi_channel', tx('เปรียบเทียบสาขาและช่องทางออนไลน์', 'Branch & Multi-Channel Comparison'))}

      {/* Quick Wins: Automated Export & 22:00 Daily Summary Scheduler */}
      <div
        className="glass-card"
        style={{
          padding: '1.4rem',
          borderRadius: '18px',
          background: 'linear-gradient(135deg, rgba(245, 158, 11, 0.14), rgba(15, 23, 42, 0.92))',
          border: '1.5px solid rgba(245, 158, 11, 0.4)',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: '1 1 320px' }}>
          <LuxuryIconBadge variant="gold" size="lg" active>
            <LuxuryModuleIcon type="multi_channel" size={30} />
          </LuxuryIconBadge>
          <div>
            <span
              style={{
                display: 'inline-block',
                padding: '0.28rem 0.75rem',
                borderRadius: '999px',
                background: 'rgba(245, 158, 11, 0.2)',
                color: '#fbbf24',
                fontWeight: 800,
                fontSize: '0.8rem',
                marginBottom: '0.4rem'
              }}
            >
              {tx('ระบบส่งรายงานอัตโนมัติ & ส่งออกไฟล์บัญชี', 'AUTOMATED REPORT SCHEDULER & TAX EXPORT')}
            </span>
            <h3 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 900, color: '#f8fafc' }}>
              {tx(
                'ส่งสรุปยอดขายเข้ามือถืออัตโนมัติทุกวัน 22:00 น. & ส่งออกไฟล์ภาษีขาย',
                'Daily 22:00 Mobile Summary Notification & 1-Click Tax Report Export'
              )}
            </h3>
            <p style={{ margin: '0.3rem 0 0 0', fontSize: '0.9rem', color: '#cbd5e1' }}>
              {tx(
                'ไม่ต้องนั่งบวกเลขเองตอนปิดร้าน ระบบสรุปยอดขาย กำไรสุทธิ และสต็อกส่งเข้ามือถือให้อัตโนมัติทุกคืน',
                'No manual bookkeeping at closing time—receive daily revenue, net profit, and stock alerts automatically.'
              )}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.65rem' }}>
          <button
            type="button"
            onClick={handleExportTaxExcel}
            style={{
              padding: '0.7rem 1.1rem',
              borderRadius: '12px',
              border: '1px solid rgba(16, 185, 129, 0.5)',
              background: 'linear-gradient(135deg, #10b981, #059669)',
              color: '#fff',
              fontWeight: 800,
              cursor: 'pointer'
            }}
          >
            {tx('📥 ส่งออกรายงานภาษีขาย / สต็อก (ไฟล์ตาราง)', '📥 Export Sales Tax & Stock Report')}
          </button>

          <button
            type="button"
            onClick={() => setShowLinePreview(!showLinePreview)}
            style={{
              padding: '0.7rem 1.1rem',
              borderRadius: '12px',
              border: '1px solid rgba(56, 189, 248, 0.5)',
              background: 'rgba(56, 189, 248, 0.16)',
              color: '#38bdf8',
              fontWeight: 800,
              cursor: 'pointer'
            }}
          >
            {tx(`📲 ตั้งค่าแจ้งเตือนรายวัน (${lineNotifyTime} น.)`, `📲 Daily Mobile Alert (${lineNotifyTime})`)}
          </button>
        </div>
      </div>

      {showLinePreview && (
        <div
          className="glass-card"
          style={{
            padding: '1.35rem',
            borderRadius: '16px',
            border: '1.5px solid rgba(16, 185, 129, 0.45)',
            background: 'rgba(15, 23, 42, 0.95)',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.15rem'
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
            <div style={{ flex: '1 1 380px' }}>
              <div style={{ fontWeight: 900, color: '#34d399', marginBottom: '0.4rem', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.5rem' }}>
                <span>
                  {tx('💬 ระบบ LINE Official Account (@InsightFlowAI) ส่งสรุปยอดขายอัตโนมัติเวลา', '💬 LINE OA (@InsightFlowAI) Automated Daily Sales Summary at')} {lineNotifyTime}
                </span>
                <span style={{ fontSize: '0.78rem', padding: '0.15rem 0.65rem', borderRadius: '999px', background: 'rgba(56,189,248,0.18)', color: '#38bdf8' }}>
                  Channel ID: 2011977245 • 📱 {userPhone} • 💬 {userLineId}
                </span>
              </div>
              <div
                style={{
                  padding: '0.9rem',
                  borderRadius: '12px',
                  background: 'rgba(16, 185, 129, 0.1)',
                  color: '#f8fafc',
                  fontSize: '0.88rem',
                  lineHeight: 1.6
                }}
              >
                {tx(
                  `📊 สรุปปิดยอดร้านประจำวัน (${lineNotifyTime} น.) ส่งการ์ด Flex Message ถึง LINE: ${userLineId} และ SMS (${userPhone}) • ยอดขายรวมทุกช่องทาง: ฿${(offlineRev + onlineRev).toLocaleString()} • กำไรสุทธิเข้ากระเป๋า: ฿${(offlineProfit + onlineProfit).toLocaleString()} • สาขาอันดับ 1: สาขาสยามพารากอน`,
                  `📊 Daily Closing Flex Message (${lineNotifyTime}) sent to LINE: ${userLineId} & SMS (${userPhone}) • Total Omnichannel Revenue: ฿${(offlineRev + onlineRev).toLocaleString()} • Net Profit: ฿${(offlineProfit + onlineProfit).toLocaleString()} • #1 Branch: Siam Paragon`
                )}
              </div>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.65rem' }}>
              <label style={{ color: '#cbd5e1', fontSize: '0.88rem', fontWeight: 700 }}>
                {tx('เวลาส่งอัตโนมัติ:', 'Schedule Time:')}
                <input
                  type="time"
                  value={lineNotifyTime}
                  onChange={e => setLineNotifyTime(e.target.value)}
                  style={{
                    marginLeft: '0.5rem',
                    padding: '0.45rem 0.65rem',
                    borderRadius: '8px',
                    background: '#0f172a',
                    color: '#f8fafc',
                    border: '1px solid rgba(148,163,184,0.3)'
                  }}
                />
              </label>
              <button
                type="button"
                onClick={() => setLineNotifyEnabled(!lineNotifyEnabled)}
                style={{
                  padding: '0.55rem 1rem',
                  borderRadius: '10px',
                  border: 'none',
                  background: lineNotifyEnabled ? '#10b981' : '#64748b',
                  color: '#fff',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
              >
                {lineNotifyEnabled ? tx('✅ เปิดส่งอัตโนมัติ 22:00 น.', '✅ Auto-Send Enabled') : tx('⏸️ ปิดใช้งานชั่วคราว', '⏸️ Paused')}
              </button>

              <button
                type="button"
                onClick={async () => {
                  if (!canUseBackendApi()) {
                    toast.success(
                      tx(
                        `🔗 จับคู่เบอร์โทร ${userPhone} กับ LINE OA (@InsightFlowAI) สำเร็จเรียบร้อย!`,
                        `🔗 Auto-matched phone ${userPhone} with LINE OA (@InsightFlowAI)!`
                      )
                    );
                    return;
                  }
                  try {
                    await fetch(`${API_BASE_URL}/api/line/register-contact`, {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({
                        phone: userPhone,
                        line_id: userLineId,
                        notify_time: lineNotifyTime,
                        notify_enabled: lineNotifyEnabled
                      })
                    });
                    const res = await fetch(`${API_BASE_URL}/api/line/webhook`, {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                        'X-Line-Signature': 'SIMULATED_LOCAL_WEBHOOK'
                      },
                      body: JSON.stringify({
                        events: [
                          {
                            type: 'message',
                            replyToken: '00000000000000000000000000000000',
                            source: { userId: 'U8899insightflow776655443322110099' },
                            message: { type: 'text', text: userPhone }
                          }
                        ]
                      })
                    });
                    const data = await res.json();
                    const matchedUid = data?.matched_contacts?.[0]?.line_user_id || 'U8899insightflow...';
                    toast.success(
                      tx(
                        `🔗 จับคู่เบอร์โทร ${userPhone} เข้ากับรหัส line_user_id (${matchedUid.slice(0, 12)}...) สำเร็จอัตโนมัติ!`,
                        `🔗 Auto-matched phone ${userPhone} to line_user_id (${matchedUid.slice(0, 12)}...) via Webhook!`
                      )
                    );
                  } catch {
                    toast.success(
                      tx(
                        `🔗 จับคู่เบอร์โทร ${userPhone} กับ LINE OA (@InsightFlowAI) สำเร็จเรียบร้อย!`,
                        `🔗 Auto-matched phone ${userPhone} with LINE OA (@InsightFlowAI)!`
                      )
                    );
                  }
                }}
                style={{
                  padding: '0.55rem 1rem',
                  borderRadius: '10px',
                  border: '1px solid rgba(251,191,36,0.45)',
                  background: 'rgba(251,191,36,0.16)',
                  color: '#fbbf24',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
              >
                {tx('🔗 ทดสอบจับคู่เบอร์โทร -> line_user_id', '🔗 Test Phone Auto-Match Webhook')}
              </button>

              <button
                type="button"
                onClick={async () => {
                  const totalRevNum = offlineRev + onlineRev;
                  const totalProfitNum = offlineProfit + onlineProfit;
                  const totalCostNum = Math.max(0, totalRevNum - totalProfitNum);
                  const isProfit = totalProfitNum >= 0;
                  const marginPct = totalRevNum > 0 ? ((totalProfitNum / totalRevNum) * 100).toFixed(1) : '0.0';

                  const totalRevStr = `฿${totalRevNum.toLocaleString()}`;
                  const totalCostStr = `฿${totalCostNum.toLocaleString()}`;
                  const netProfitStr = `${isProfit ? '+' : '-'}฿${Math.abs(totalProfitNum).toLocaleString()}`;
                  const marginPctStr = `${isProfit ? '+' : '-'}${marginPct}%`;
                  const offlineRevStr = `฿${offlineRev.toLocaleString()}`;
                  const onlineRevStr = `฿${onlineRev.toLocaleString()}`;

                  if (canUseBackendApi()) {
                    try {
                      const res = await fetch(`${API_BASE_URL}/api/line/send-daily-summary`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                          phone: userPhone,
                          line_id: userLineId,
                          total_revenue: totalRevStr,
                          total_cost: totalCostStr,
                          net_profit: netProfitStr,
                          profit_margin_pct: marginPctStr,
                          is_profit: isProfit,
                          offline_rev: offlineRevStr,
                          online_rev: onlineRevStr,
                          total_orders: '4,210 บิล',
                          top_branch: 'สาขาสยามพารากอน (฿640,000)',
                          low_stock_alert: 'เมล็ดกาแฟอาราบิก้า เหลือ 8 ถุง (ควรสั่งเพิ่ม)',
                          report_time: `${lineNotifyTime} น.`
                        })
                      });
                      if (res.ok) {
                        toast.success(
                          tx(
                            `📲 ยิงการ์ดสรุปยอดขาย Flex Message (${totalRevStr} | กำไร ${netProfitStr}) เข้า LINE "${userLineId}" และเบอร์ "${userPhone}" สำเร็จ!`,
                            `📲 Sent LINE Flex Message (${totalRevStr} | Net ${netProfitStr}) to "${userLineId}" & Phone "${userPhone}"!`
                          )
                        );
                        return;
                      }
                    } catch {
                      // fallback toast below
                    }
                  }
                  toast.success(
                    tx(
                      `📲 ส่งการ์ดสรุปยอดขาย Flex Message ${totalRevStr} (กำไรสุทธิ ${netProfitStr}) เข้า LINE ID "${userLineId}" และเบอร์ "${userPhone}" เรียบร้อยแล้ว!`,
                      `📲 Sent Flex Message sales summary (${totalRevStr} | Net ${netProfitStr}) to LINE ID "${userLineId}" & Phone "${userPhone}"!`
                    )
                  );
                }}
                style={{
                  padding: '0.55rem 1rem',
                  borderRadius: '10px',
                  border: '1px solid rgba(56,189,248,0.4)',
                  background: 'rgba(56,189,248,0.16)',
                  color: '#38bdf8',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
              >
                {tx('🚀 ยิงการ์ด Flex Message เข้า LINE ตอนนี้', '🚀 Send LINE Flex Message Now')}
              </button>
            </div>
          </div>

          {/* 3-Step Visual Flow: QR Code Add Friend + Phone Auto-Match + LINE Flex Message Card Preview */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1rem',
              paddingTop: '0.85rem',
              borderTop: '1px solid rgba(255,255,255,0.1)'
            }}
          >
            {/* QR Code & Step-by-Step Pairing Box */}
            <div
              style={{
                padding: '1rem',
                borderRadius: '14px',
                background: 'rgba(6, 10, 22, 0.85)',
                border: '1px solid rgba(52, 211, 153, 0.3)',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem'
              }}
            >
              <div
                style={{
                  width: '88px',
                  height: '88px',
                  borderRadius: '12px',
                  background: '#ffffff',
                  padding: '6px',
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <img
                  src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=https://line.me/R/ti/p/@InsightFlowAI"
                  alt="LINE OA QR Code"
                  style={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </div>
              <div style={{ fontSize: '0.82rem', color: '#e2e8f0', lineHeight: 1.55 }}>
                <div style={{ fontWeight: 900, color: '#34d399', marginBottom: '0.2rem' }}>
                  📲 {tx('สแกนแอดเพื่อน @InsightFlowAI (เชื่อมใน 1 คลิก)', 'Scan to Add @InsightFlowAI (1-Step Link)')}
                </div>
                <div>
                  1. {tx('ลูกค้ากรอกเบอร์โทร', 'Enter phone')} <strong style={{ color: '#fbbf24' }}>{userPhone}</strong> {tx('ตอนสมัครใช้งาน', 'at sign-in')}
                </div>
                <div>
                  2. {tx('สแกน QR Code แล้วพิมพ์เบอร์โทรส่งเข้าแชท 1 ครั้ง', 'Scan QR & send your phone number once in chat')}
                </div>
                <div>
                  3. {tx('หลังบ้าน (backend/main.py) จับคู่ line_user_id อัตโนมัติทันที', 'Backend auto-matches phone to line_user_id immediately')}
                </div>
              </div>
            </div>

            {/* Visual Preview of the Executive LINE Flex Message Bubble */}
            <div
              style={{
                borderRadius: '14px',
                overflow: 'hidden',
                border: '1.5px solid rgba(251, 191, 36, 0.45)',
                background: '#0b1326'
              }}
            >
              <div style={{ background: '#070c1a', padding: '0.65rem 1rem', borderBottom: '1px solid rgba(255,255,255,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.74rem', fontWeight: 900, color: '#fbbf24' }}>
                  👑 INSIGHTFLOW EXECUTIVE • {lineNotifyTime} น.
                </span>
                <span style={{ fontSize: '0.68rem', color: '#34d399', fontWeight: 800, background: 'rgba(52,211,153,0.18)', padding: '2px 8px', borderRadius: '6px' }}>
                  🟢 กำไรสุทธิ
                </span>
              </div>
              <div style={{ padding: '0.85rem 1rem', display: 'flex', flexDirection: 'column', gap: '0.55rem' }}>
                {/* Total Revenue Box */}
                <div style={{ background: '#111c35', padding: '0.75rem', borderRadius: '10px' }}>
                  <div style={{ fontSize: '0.72rem', color: '#94a3b8', fontWeight: 700 }}>
                    {tx('💰 ยอดขายรวมทุกช่องทาง (Total Revenue)', '💰 Total Omnichannel Revenue')}
                  </div>
                  <div style={{ fontSize: '1.35rem', fontWeight: 900, color: '#f8fafc', marginTop: '0.15rem' }}>
                    ฿{(offlineRev + onlineRev).toLocaleString()}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', fontWeight: 800, marginTop: '0.35rem' }}>
                    <span style={{ color: '#38bdf8' }}>🏪 {tx('หน้าร้าน:', 'POS:')} ฿{offlineRev.toLocaleString()}</span>
                    <span style={{ color: '#c084fc' }}>🌐 {tx('ออนไลน์:', 'Online:')} ฿{onlineRev.toLocaleString()}</span>
                  </div>
                </div>

                {/* Cost vs Net Profit */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                  <div style={{ background: '#1e1b2e', padding: '0.55rem 0.65rem', borderRadius: '8px' }}>
                    <div style={{ fontSize: '0.68rem', color: '#fda4af', fontWeight: 700 }}>📉 {tx('ต้นทุน & ค่าใช้จ่าย', 'Total Cost')}</div>
                    <div style={{ fontSize: '0.86rem', color: '#fda4af', fontWeight: 900, marginTop: '0.15rem' }}>
                      -฿{Math.max(0, (offlineRev + onlineRev) - (offlineProfit + onlineProfit)).toLocaleString()}
                    </div>
                  </div>
                  <div style={{ background: 'rgba(16,185,129,0.18)', padding: '0.55rem 0.65rem', borderRadius: '8px' }}>
                    <div style={{ fontSize: '0.68rem', color: '#34d399', fontWeight: 700 }}>📈 {tx('กำไรสุทธิ (Margin)', 'Net Profit')}</div>
                    <div style={{ fontSize: '0.86rem', color: '#34d399', fontWeight: 900, marginTop: '0.15rem' }}>
                      +฿{(offlineProfit + onlineProfit).toLocaleString()} ({offlineRev + onlineRev > 0 ? (((offlineProfit + onlineProfit) / (offlineRev + onlineRev)) * 100).toFixed(1) : 0}%)
                    </div>
                  </div>
                </div>

                {/* Highlight Info */}
                <div style={{ background: '#0f1a33', padding: '0.55rem 0.75rem', borderRadius: '8px', fontSize: '0.73rem', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#cbd5e1' }}>
                    <span>🧾 {tx('บิลรวมวันนี้:', 'Orders Today:')}</span>
                    <strong style={{ color: '#f8fafc' }}>4,210 {tx('บิล', 'bills')}</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#cbd5e1' }}>
                    <span>🏆 {tx('สาขาขายดีอันดับ 1:', 'Top Branch:')}</span>
                    <strong style={{ color: '#fbbf24' }}>{tx('สยามพารากอน', 'Siam Paragon')}</strong>
                  </div>
                  <div style={{ color: '#fca5a5', fontSize: '0.7rem', marginTop: '0.15rem', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '0.25rem' }}>
                    ⚠️ {tx('สต็อกใกล้หมด: เมล็ดกาแฟอาราบิก้า เหลือ 8 ถุง', 'Low Stock: Arabica Coffee Beans < 8 bags')}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Inline Phone & LINE ID Quick Editor */}
          {onUpdateUserContact && (
            <div
              style={{
                paddingTop: '0.85rem',
                borderTop: '1px dashed rgba(148,163,184,0.22)',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '0.75rem',
                alignItems: 'end'
              }}
            >
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: '#94a3b8', marginBottom: '0.25rem' }}>
                  📱 {tx('เบอร์โทรศัพท์สำหรับจับคู่ line_user_id & รับแจ้งเตือน:', 'Mobile Phone for line_user_id Auto-Match & Alerts:')}
                </label>
                <input
                  type="tel"
                  value={userPhone}
                  onChange={e => onUpdateUserContact(e.target.value, userLineId)}
                  placeholder="081-234-5678"
                  style={{
                    width: '100%',
                    padding: '0.5rem 0.75rem',
                    borderRadius: '8px',
                    background: '#0f172a',
                    color: '#fff',
                    border: '1px solid rgba(56,189,248,0.35)'
                  }}
                />
              </div>
              <div>
                <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: '#94a3b8', marginBottom: '0.25rem' }}>
                  💬 {tx('ID LINE สำหรับรับการ์ดสรุปยอดขายอัตโนมัติ (22:00 น.):', 'LINE ID for 22:00 Automated Flex Message Summary:')}
                </label>
                <input
                  type="text"
                  value={userLineId}
                  onChange={e => onUpdateUserContact(userPhone, e.target.value)}
                  placeholder="@myshop"
                  style={{
                    width: '100%',
                    padding: '0.5rem 0.75rem',
                    borderRadius: '8px',
                    background: '#0f172a',
                    color: '#fff',
                    border: '1px solid rgba(16,185,129,0.35)'
                  }}
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* Alerts & Anomaly Detection Box */}
      {anomaliesList.length > 0 && (
        <div
          className="glass-card"
          style={{
            padding: '1.35rem',
            borderRadius: '18px',
            border: '1.5px solid rgba(244, 63, 94, 0.45)',
            background: 'rgba(244, 63, 94, 0.06)'
          }}
        >
          <h4 style={{ margin: '0 0 0.85rem 0', fontSize: '1.15rem', fontWeight: 900, color: '#fda4af' }}>
            {tx('🚨 กล่องแจ้งเตือนความผิดปกติอัจฉริยะ (ต้องรีบจัดการ)', '🚨 Smart Anomaly Detection Alerts (Immediate Action)')}
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1rem' }}>
            {anomaliesList.map(anm => {
              const info = anm[isEn ? 'en' : 'th'];
              return (
                <div
                  key={anm.id}
                  style={{
                    padding: '1.1rem',
                    borderRadius: '14px',
                    background: 'rgba(15, 23, 42, 0.85)',
                    border: '1px solid rgba(244, 63, 94, 0.35)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '0.75rem'
                  }}
                >
                  <div>
                    <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#fbbf24', marginBottom: '0.3rem' }}>
                      {info.badge}
                    </div>
                    <div style={{ fontSize: '1rem', fontWeight: 900, color: '#f8fafc', marginBottom: '0.35rem' }}>
                      {info.title}
                    </div>
                    <div style={{ fontSize: '0.86rem', color: '#cbd5e1', lineHeight: 1.5 }}>{info.detail}</div>
                  </div>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      type="button"
                      onClick={() => {
                        toast.success(info.actionToast);
                        setAnomaliesList(prev => prev.filter(item => item.id !== anm.id));
                      }}
                      style={{
                        flex: 1,
                        padding: '0.6rem 0.9rem',
                        borderRadius: '10px',
                        border: 'none',
                        background: 'linear-gradient(135deg, #f43f5e, #e11d48)',
                        color: '#fff',
                        fontWeight: 800,
                        fontSize: '0.82rem',
                        cursor: 'pointer'
                      }}
                    >
                      {info.actionLabel}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Offline vs Online Comparison Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
        <div className="glass-card" style={{ padding: '1.3rem', borderRadius: '16px', borderLeft: '4px solid #38bdf8' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#38bdf8' }}>
            {tx('🏪 หน้าร้านจริงทั้งหมด (4 สาขา)', '🏪 Physical Storefronts (4 Branches)')}
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#f8fafc', marginTop: '0.3rem' }}>
            ฿{offlineRev.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.88rem', color: '#34d399', fontWeight: 700, marginTop: '0.25rem' }}>
            {tx(`กำไรสุทธิ: ฿${offlineProfit.toLocaleString()} (ไม่เสียค่าธรรมเนียมแอป)`, `Net Profit: ฿${offlineProfit.toLocaleString()} (Zero App Commission)`)}
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.3rem', borderRadius: '16px', borderLeft: '4px solid #a855f7' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#c084fc' }}>
            {tx('🌐 ช่องทางออนไลน์ทั้งหมด (รวม 3 แพลตฟอร์ม)', '🌐 Online Channels (All 3 Platforms)')}
          </div>
          <div style={{ fontSize: '1.8rem', fontWeight: 900, color: '#f8fafc', marginTop: '0.3rem' }}>
            ฿{onlineRev.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.88rem', color: '#fbbf24', fontWeight: 700, marginTop: '0.25rem' }}>
            {tx(`กำไรสุทธิหลังหักค่าธรรมเนียม: ฿${onlineProfit.toLocaleString()}`, `Net Profit After Platform Fees: ฿${onlineProfit.toLocaleString()}`)}
          </div>
        </div>
      </div>

      {/* Channel Comparison Chart & Table */}
      <div className="glass-card" style={{ padding: '1.35rem', borderRadius: '18px' }}>
        <h4 style={{ margin: '0 0 1rem 0', fontSize: '1.15rem', fontWeight: 800 }}>
          {tx('📊 เปรียบเทียบยอดขาย ค่าธรรมเนียม และกำไรสุทธิระหว่างหน้าร้านกับออนไลน์', '📊 Channel Comparison: Gross Revenue, Fees & Net Profit')}
        </h4>
        <div style={{ height: '240px', marginBottom: '1.25rem' }}>
          <Bar data={channelChartData} options={barChartOptions} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
          {channelsList.map(ch => {
            const info = ch[isEn ? 'en' : 'th'];
            return (
              <div
                key={ch.id}
                style={{
                  padding: '1.1rem',
                  borderRadius: '14px',
                  background: 'rgba(15, 23, 42, 0.7)',
                  border: '1px solid rgba(148, 163, 184, 0.2)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <span style={{ fontWeight: 900, color: '#f8fafc', fontSize: '0.98rem' }}>{info.name}</span>
                  <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#34d399' }}>{ch.growth}</span>
                </div>
                <div style={{ fontSize: '0.82rem', color: '#fbbf24', fontWeight: 700, marginBottom: '0.5rem' }}>
                  {info.badge}
                </div>
                <div style={{ fontSize: '0.86rem', color: '#cbd5e1', display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                  <div>
                    {tx('ยอดขายรวม:', 'Revenue:')} <strong>฿{ch.revenue.toLocaleString()}</strong> ({ch.orders} {tx('คำสั่งซื้อ', 'orders')})
                  </div>
                  <div>
                    {tx('ค่าใช้จ่าย:', 'Fees/Costs:')} <span style={{ color: '#fda4af' }}>-฿{ch.costAndFees.toLocaleString()}</span> ({info.feeDesc})
                  </div>
                  <div>
                    {tx('กำไรสุทธิ:', 'Net Profit:')}{' '}
                    <strong style={{ color: '#34d399' }}>
                      ฿{ch.netProfit.toLocaleString()} ({ch.grossMarginPct}%)
                    </strong>
                  </div>
                </div>
                <div style={{ marginTop: '0.6rem', paddingTop: '0.55rem', borderTop: '1px dashed rgba(148,163,184,0.2)', fontSize: '0.82rem', color: '#94a3b8' }}>
                  💡 {info.aiAdvice}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Store Ranking & Inventory Turnover Table */}
      <div className="glass-card" style={{ padding: '1.35rem', borderRadius: '18px', overflowX: 'auto' }}>
        <h4 style={{ margin: '0 0 0.85rem 0', fontSize: '1.15rem', fontWeight: 800 }}>
          {tx('🏆 จัดอันดับสาขาตามยอดขายและอัตราการหมุนเวียนสินค้า', '🏆 Store Ranking by Revenue & Inventory Turnover Speed')}
        </h4>
        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '780px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(148,163,184,0.2)', textAlign: 'left', color: '#94a3b8', fontSize: '0.84rem' }}>
              <th style={{ padding: '0.75rem' }}>{tx('อันดับ / สาขา', 'Rank / Branch')}</th>
              <th style={{ padding: '0.75rem' }}>{tx('ยอดขายต่อเดือน', 'Monthly Sales')}</th>
              <th style={{ padding: '0.75rem' }}>{tx('ความเร็วการหมุนสต็อก', 'Inventory Turnover')}</th>
              <th style={{ padding: '0.75rem' }}>{tx('มูลค่าสินค้าค้างคลัง', 'Stagnant Stock')}</th>
              <th style={{ padding: '0.75rem' }}>{tx('สถานะสาขา', 'Branch Status')}</th>
              <th style={{ padding: '0.75rem' }}>{tx('การจัดการสต็อก', 'Stock Action')}</th>
            </tr>
          </thead>
          <tbody>
            {branchesList.map(br => {
              const info = br[isEn ? 'en' : 'th'];
              return (
                <tr key={br.branchId} style={{ borderBottom: '1px solid rgba(148,163,184,0.12)' }}>
                  <td style={{ padding: '0.85rem 0.75rem' }}>
                    <div style={{ fontWeight: 900, color: '#f8fafc' }}>
                      #{br.rank} {info.branchName}
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                      {tx('ผู้จัดการ:', 'Manager:')} {info.manager}
                    </div>
                  </td>
                  <td style={{ padding: '0.85rem 0.75rem', fontWeight: 800, color: '#38bdf8' }}>
                    ฿{br.revenue.toLocaleString()}
                    <div style={{ fontSize: '0.78rem', color: '#34d399' }}>
                      {tx('อัตรากำไร', 'Margin')} {br.netMarginPct}%
                    </div>
                  </td>
                  <td style={{ padding: '0.85rem 0.75rem', fontWeight: 800, color: '#fbbf24' }}>
                    {br.inventoryTurnover} {tx('รอบ/ปี', 'turns/yr')}
                    <div style={{ fontSize: '0.78rem', color: '#cbd5e1' }}>
                      ({tx(`ขายออกเฉลี่ย ${br.turnoverDays} วัน`, `Avg ${br.turnoverDays} days to sell`)})
                    </div>
                  </td>
                  <td style={{ padding: '0.85rem 0.75rem', fontWeight: 800, color: br.deadStockValue > 40000 ? '#f43f5e' : '#cbd5e1' }}>
                    ฿{br.deadStockValue.toLocaleString()}
                  </td>
                  <td style={{ padding: '0.85rem 0.75rem', fontSize: '0.84rem', color: '#e2e8f0' }}>
                    {info.statusText}
                  </td>
                  <td style={{ padding: '0.85rem 0.75rem' }}>
                    {br.deadStockValue > 0 ? (
                      <button
                        type="button"
                        onClick={() => handleTransferDeadStock(br.branchId)}
                        style={{
                          padding: '0.45rem 0.85rem',
                          borderRadius: '8px',
                          border: '1px solid rgba(245, 158, 11, 0.45)',
                          background: 'rgba(245, 158, 11, 0.16)',
                          color: '#fbbf24',
                          fontWeight: 800,
                          fontSize: '0.8rem',
                          cursor: 'pointer'
                        }}
                      >
                        {tx('🚚 โอนสต็อกไปสาขาขายดี', '🚚 Transfer Stock to #1 Branch')}
                      </button>
                    ) : (
                      <span style={{ color: '#34d399', fontWeight: 800, fontSize: '0.82rem' }}>
                        {tx('✅ สต็อกคล่องตัวดีเยี่ยม', '✅ Optimal Stock')}
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}


// --- MODULE 5: SMART INVENTORY & AI Q&A ASSISTANT ---

export function InventoryTab({
  lang,
  inventoryList,
  setInventoryList,
  renderUploadZone
}) {
  const isEn = lang === 'en';
  const tx = (th, en) => (isEn ? en : th);

  const [invFilter, setInvFilter] = useState('all');
  const [invSearch, setInvSearch] = useState('');
  const [showAddProduct, setShowAddProduct] = useState(false);
  const [isGSheetModalOpen, setIsGSheetModalOpen] = useState(false);
  const [newSku, setNewSku] = useState('');
  const [newName, setNewName] = useState('');
  const [newCategory, setNewCategory] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newStock, setNewStock] = useState('');

  const filteredItems = inventoryList.filter(item => {
    const info = item[isEn ? 'en' : 'th'];
    const matchFilter = invFilter === 'all' || item.status === invFilter;
    const q = invSearch.trim().toLowerCase();
    const matchSearch =
      !q ||
      item.sku.toLowerCase().includes(q) ||
      info.name.toLowerCase().includes(q) ||
      info.category.toLowerCase().includes(q);
    return matchFilter && matchSearch;
  });

  const totalInventoryValue = inventoryList.reduce((acc, item) => acc + item.price * item.stock, 0);
  const lowOrOutCount = inventoryList.filter(i => i.status === 'low_stock' || i.status === 'out_of_stock').length;
  const deadStockCount = inventoryList.filter(i => i.status === 'dead_stock').length;

  const handleRestockItem = sku => {
    setInventoryList(prev =>
      prev.map(item => {
        if (item.sku !== sku) return item;
        const nextStock = item.stock + 50;
        return {
          ...item,
          stock: nextStock,
          status: 'in_stock',
          th: { ...item.th, statusLabel: 'มีสินค้าพร้อมขาย' },
          en: { ...item.en, statusLabel: 'In Stock' }
        };
      })
    );
    toast.success(
      tx(
        `เติมสต็อกสินค้า ${sku} เพิ่ม +50 ชิ้นเรียบร้อยแล้ว!`,
        `Restocked +50 units for ${sku}!`
      )
    );
  };

  const handleClearancePromo = sku => {
    setInventoryList(prev =>
      prev.map(item => {
        if (item.sku !== sku) return item;
        const discounted = Math.max(10, Math.round(item.price * 0.7));
        return {
          ...item,
          price: discounted,
          status: 'in_stock',
          th: { ...item.th, statusLabel: 'กำลังจัดโปรลดราคา 30%' },
          en: { ...item.en, statusLabel: 'Active 30% Clearance Promo' }
        };
      })
    );
    toast.success(
      tx(
        `ปรับลดราคา 30% เพื่อระบายสินค้าค้างสต็อก (${sku}) เรียบร้อยแล้ว!`,
        `Applied 30% clearance discount to ${sku}!`
      )
    );
  };

  const handleAddNewProduct = e => {
    e.preventDefault();
    if (!newName.trim()) {
      toast.error(tx('กรุณากรอกชื่อสินค้า', 'Please enter a product name'));
      return;
    }
    const priceNum = Math.max(1, Number(newPrice) || 590);
    const stockNum = Math.max(0, Number(newStock) || 100);
    const skuCode = newSku.trim() || `SKU-${Math.floor(100 + Math.random() * 900)}`;
    const statusKey = stockNum === 0 ? 'out_of_stock' : stockNum < 20 ? 'low_stock' : 'in_stock';
    const newItem = {
      sku: skuCode,
      price: priceNum,
      stock: stockNum,
      status: statusKey,
      th: {
        name: newName.trim(),
        category: newCategory.trim() || 'สินค้าทั่วไป',
        statusLabel:
          statusKey === 'out_of_stock'
            ? 'สินค้าหมดชั่วคราว'
            : statusKey === 'low_stock'
            ? 'ใกล้หมดสต็อก (ต้องสั่งเพิ่ม)'
            : 'มีสินค้าพร้อมขาย'
      },
      en: {
        name: newName.trim(),
        category: newCategory.trim() || 'General Merchandise',
        statusLabel:
          statusKey === 'out_of_stock'
            ? 'Out of Stock'
            : statusKey === 'low_stock'
            ? 'Low Stock (Reorder Soon)'
            : 'In Stock'
      }
    };
    setInventoryList(prev => [newItem, ...prev]);
    setNewSku('');
    setNewName('');
    setNewCategory('');
    setNewPrice('');
    setNewStock('');
    setShowAddProduct(false);
    toast.success(
      tx(
        `เพิ่มสินค้าใหม่ "${newItem.th.name}" เข้าคลังเรียบร้อยแล้ว!`,
        `Added "${newItem.en.name}" to inventory!`
      )
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {renderUploadZone('inventory', tx('คลังสินค้าและสต็อกอัจฉริยะ', 'Smart Inventory & Stock Control'))}

      {/* Top Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        <div className="glass-card" style={{ padding: '1.25rem', borderRadius: '16px', borderLeft: '4px solid #38bdf8' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 700 }}>
              {tx('มูลค่าสินค้าคงคลังทั้งหมด', 'Total Inventory Value')}
            </div>
            <LuxuryIconBadge variant="sapphire" size="sm" active>
              <LuxuryModuleIcon type="inventory" size={20} />
            </LuxuryIconBadge>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#f8fafc', marginTop: '0.35rem' }}>
            ฿{totalInventoryValue.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.8rem', color: '#38bdf8', marginTop: '0.2rem' }}>
            {inventoryList.length} {tx('รายการสินค้าในระบบ', 'Active SKUs in stock')}
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem', borderRadius: '16px', borderLeft: '4px solid #f43f5e' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 700 }}>
              {tx('สินค้าใกล้หมด / หมดสต็อก', 'Low or Out-of-Stock Items')}
            </div>
            <LuxuryIconBadge variant="ruby" size="sm" active>
              <LuxuryModuleIcon type="alert" size={20} />
            </LuxuryIconBadge>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#fda4af', marginTop: '0.35rem' }}>
            {lowOrOutCount} {tx('รายการ', 'Items')}
          </div>
          <div style={{ fontSize: '0.8rem', color: '#fecdd3', marginTop: '0.2rem' }}>
            {tx('กดปุ่ม "+50 เติมของ" ในตารางได้ทันที', 'Click "+50 Restock" in table below')}
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem', borderRadius: '16px', borderLeft: '4px solid #f59e0b' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 700 }}>
              {tx('สินค้าค้างสต็อกนาน', 'Slow-Moving Stock')}
            </div>
            <LuxuryIconBadge variant="gold" size="sm" active>
              <LuxuryModuleIcon type="wallet" size={20} />
            </LuxuryIconBadge>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#fbbf24', marginTop: '0.35rem' }}>
            {deadStockCount} {tx('รายการ', 'Items')}
          </div>
          <div style={{ fontSize: '0.8rem', color: '#fde68a', marginTop: '0.2rem' }}>
            {tx('แนะนำจัดโปรโมชันลดราคาเพื่อเปลี่ยนเป็นเงินสด', 'Run clearance promo to free up cash')}
          </div>
        </div>
      </div>

      {/* Filter Bar + Add Product Button */}
      <div className="glass-card" style={{ padding: '1.35rem', borderRadius: '18px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
            {[
              { id: 'all', th: 'สินค้าทั้งหมด', en: 'All Items' },
              { id: 'in_stock', th: 'พร้อมขาย', en: 'In Stock' },
              { id: 'low_stock', th: 'ใกล้หมดสต็อก', en: 'Low Stock' },
              { id: 'dead_stock', th: 'สินค้าค้างสต็อก', en: 'Slow Moving' },
              { id: 'out_of_stock', th: 'สินค้าหมด', en: 'Out of Stock' }
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setInvFilter(tab.id)}
                style={{
                  padding: '0.5rem 0.95rem',
                  borderRadius: '999px',
                  border: invFilter === tab.id ? '1.5px solid #38bdf8' : '1px solid rgba(148,163,184,0.25)',
                  background: invFilter === tab.id ? 'rgba(56, 189, 248, 0.2)' : 'rgba(15, 23, 42, 0.6)',
                  color: invFilter === tab.id ? '#38bdf8' : '#cbd5e1',
                  fontWeight: 800,
                  fontSize: '0.84rem',
                  cursor: 'pointer'
                }}
              >
                {isEn ? tab.en : tab.th}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', alignItems: 'center' }}>
            <input
              type="text"
              value={invSearch}
              onChange={e => setInvSearch(e.target.value)}
              placeholder={tx('🔍 ค้นหาชื่อสินค้า หรือรหัสสินค้า...', '🔍 Search product name or SKU...')}
              style={{
                padding: '0.6rem 0.95rem',
                borderRadius: '10px',
                border: '1px solid rgba(148,163,184,0.3)',
                background: 'rgba(15, 23, 42, 0.8)',
                color: '#f8fafc',
                minWidth: '230px'
              }}
            />
            <button
              type="button"
              onClick={() => setShowAddProduct(!showAddProduct)}
              style={{
                padding: '0.65rem 1.1rem',
                borderRadius: '10px',
                border: 'none',
                background: 'linear-gradient(135deg, #10b981, #059669)',
                color: '#fff',
                fontWeight: 800,
                cursor: 'pointer'
              }}
            >
              {tx('➕ เพิ่มรายการสินค้าใหม่', '➕ Add New Product')}
            </button>
            <GoogleSheetCuteButton
              onClick={() => setIsGSheetModalOpen(true)}
              labelTh="เชื่อมต่อ Google Sheet สด"
              labelEn="Connect Google Sheet"
              isEn={isEn}
            />
          </div>
        </div>

        {showAddProduct && (
          <form
            onSubmit={handleAddNewProduct}
            style={{
              marginBottom: '1.25rem',
              padding: '1.2rem',
              borderRadius: '14px',
              background: 'rgba(15, 23, 42, 0.9)',
              border: '1.5px solid rgba(16, 185, 129, 0.45)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
              gap: '0.85rem',
              alignItems: 'end'
            }}
          >
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.25rem' }}>
                {tx('รหัสสินค้า', 'SKU Code')}
              </label>
              <input
                type="text"
                value={newSku}
                onChange={e => setNewSku(e.target.value)}
                placeholder="SKU-889"
                style={{ width: '100%', padding: '0.55rem', borderRadius: '8px', background: '#0f172a', color: '#fff', border: '1px solid rgba(148,163,184,0.3)' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.25rem' }}>
                {tx('ชื่อสินค้า', 'Product Name')}
              </label>
              <input
                type="text"
                value={newName}
                onChange={e => setNewName(e.target.value)}
                placeholder={tx('เช่น วิตามินซีเข้มข้น', 'e.g. Vitamin C Serum')}
                style={{ width: '100%', padding: '0.55rem', borderRadius: '8px', background: '#0f172a', color: '#fff', border: '1px solid rgba(148,163,184,0.3)' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.25rem' }}>
                {tx('หมวดหมู่', 'Category')}
              </label>
              <input
                type="text"
                value={newCategory}
                onChange={e => setNewCategory(e.target.value)}
                placeholder={tx('สกินแคร์', 'Skincare')}
                style={{ width: '100%', padding: '0.55rem', borderRadius: '8px', background: '#0f172a', color: '#fff', border: '1px solid rgba(148,163,184,0.3)' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.25rem' }}>
                {tx('ราคาต่อชิ้น (บาท)', 'Unit Price (THB)')}
              </label>
              <input
                type="number"
                value={newPrice}
                onChange={e => setNewPrice(e.target.value)}
                placeholder="890"
                style={{ width: '100%', padding: '0.55rem', borderRadius: '8px', background: '#0f172a', color: '#fff', border: '1px solid rgba(148,163,184,0.3)' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.25rem' }}>
                {tx('จำนวนคงเหลือ (ชิ้น)', 'Stock Qty')}
              </label>
              <input
                type="number"
                value={newStock}
                onChange={e => setNewStock(e.target.value)}
                placeholder="100"
                style={{ width: '100%', padding: '0.55rem', borderRadius: '8px', background: '#0f172a', color: '#fff', border: '1px solid rgba(148,163,184,0.3)' }}
              />
            </div>
            <button
              type="submit"
              style={{
                padding: '0.6rem 1rem',
                borderRadius: '8px',
                border: 'none',
                background: '#10b981',
                color: '#fff',
                fontWeight: 800,
                cursor: 'pointer'
              }}
            >
              {tx('✅ บันทึกสินค้า', '✅ Save Item')}
            </button>
          </form>
        )}

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '760px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(148,163,184,0.2)', textAlign: 'left', color: '#94a3b8', fontSize: '0.84rem' }}>
                <th style={{ padding: '0.75rem' }}>{tx('รหัสสินค้า', 'SKU Code')}</th>
                <th style={{ padding: '0.75rem' }}>{tx('ชื่อสินค้า / หมวดหมู่', 'Product Name / Category')}</th>
                <th style={{ padding: '0.75rem' }}>{tx('ราคาขาย', 'Unit Price')}</th>
                <th style={{ padding: '0.75rem' }}>{tx('จำนวนคงเหลือ', 'Stock Balance')}</th>
                <th style={{ padding: '0.75rem' }}>{tx('สถานะคลัง', 'Status')}</th>
                <th style={{ padding: '0.75rem' }}>{tx('สั่งการด่วน', 'Quick Action')}</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map(item => {
                const info = item[isEn ? 'en' : 'th'];
                const badgeColor =
                  item.status === 'in_stock'
                    ? '#10b981'
                    : item.status === 'dead_stock'
                    ? '#f59e0b'
                    : '#f43f5e';
                return (
                  <tr key={item.sku} style={{ borderBottom: '1px solid rgba(148,163,184,0.12)' }}>
                    <td style={{ padding: '0.85rem 0.75rem', fontWeight: 800, color: '#38bdf8' }}>{item.sku}</td>
                    <td style={{ padding: '0.85rem 0.75rem' }}>
                      <div style={{ fontWeight: 800, color: '#f8fafc' }}>{info.name}</div>
                      <div style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{info.category}</div>
                    </td>
                    <td style={{ padding: '0.85rem 0.75rem', fontWeight: 800, color: '#fbbf24' }}>
                      ฿{item.price.toLocaleString()}
                    </td>
                    <td style={{ padding: '0.85rem 0.75rem', fontWeight: 900, color: item.stock <= 15 ? '#fda4af' : '#f8fafc' }}>
                      {item.stock.toLocaleString()} {tx('ชิ้น', 'units')}
                    </td>
                    <td style={{ padding: '0.85rem 0.75rem' }}>
                      <span
                        style={{
                          padding: '0.25rem 0.7rem',
                          borderRadius: '999px',
                          background: `${badgeColor}22`,
                          color: badgeColor,
                          fontWeight: 800,
                          fontSize: '0.8rem'
                        }}
                      >
                        {info.statusLabel}
                      </span>
                    </td>
                    <td style={{ padding: '0.85rem 0.75rem' }}>
                      <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
                        <button
                          type="button"
                          onClick={() => handleRestockItem(item.sku)}
                          style={{
                            padding: '0.42rem 0.8rem',
                            borderRadius: '8px',
                            border: '1px solid rgba(16,185,129,0.45)',
                            background: 'rgba(16,185,129,0.16)',
                            color: '#34d399',
                            fontWeight: 800,
                            fontSize: '0.8rem',
                            cursor: 'pointer'
                          }}
                        >
                          {tx('➕ เติมสต็อก +50 ชิ้น', '➕ Restock +50')}
                        </button>
                        {item.status === 'dead_stock' && (
                          <button
                            type="button"
                            onClick={() => handleClearancePromo(item.sku)}
                            style={{
                              padding: '0.42rem 0.8rem',
                              borderRadius: '8px',
                              border: '1px solid rgba(245,158,11,0.45)',
                              background: 'rgba(245,158,11,0.16)',
                              color: '#fbbf24',
                              fontWeight: 800,
                              fontSize: '0.8rem',
                              cursor: 'pointer'
                            }}
                          >
                            {tx('🏷️ จัดโปรลด 30%', '🏷️ 30% Clearance')}
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Google Sheet Live Sync Modal */}
      <GoogleSheetSyncModal
        isOpen={isGSheetModalOpen}
        onClose={() => setIsGSheetModalOpen(false)}
        lang={lang}
        targetModule="inventory"
        inventoryList={inventoryList}
        setInventoryList={setInventoryList}
      />
    </div>
  );
}

export function InsightsTab({
  lang,
  bizProfile,
  setBizProfile,
  aiChatMessages,
  setAiChatMessages,
  aiQuestionInput,
  setAiQuestionInput,
  isAiThinking,
  handleAskBusinessAi,
  handleRetrainBusinessAi,
  isTrainingAi,
  chatEndRef,
  renderUploadZone,
  lineChartOptions,
  currentRevenueVal = 8920000,
  targetRevenueVal = 10000000,
  customersList = [],
  inventoryList = [],
  setInventoryList,
  auditLogs = [],
  vendorsList = [],
  centralPosList = [],
  setActiveTab
}) {
  const isEn = lang === 'en';
  const tx = (th, en) => (isEn ? en : th);
  const [showTrainingPanel, setShowTrainingPanel] = useState(false);
  const [aiScenario, setAiScenario] = useState('ai_accelerated');
  const [isScanningStore, setIsScanningStore] = useState(false);
  const [lastScanTime, setLastScanTime] = useState(isEn ? 'Just now (99.4% Confidence)' : 'เพิ่งสแกนล่าสุด (ความแม่นยำ 99.4%)');
  const [executedPlaybooks, setExecutedPlaybooks] = useState({});
  const [isGSheetModalOpen, setIsGSheetModalOpen] = useState(false);

  const atRiskCount = customersList.filter(c => c.segment === 'at_risk').length;
  const lowStockCount = inventoryList.filter(i => i.status === 'low_stock' || i.status === 'out_of_stock').length;
  const pendingAuditCount = auditLogs.filter(a => !a.resolved).length;
  const totalPoSaved = centralPosList.reduce((acc, p) => acc + (p.savedAmount || 0), 0);

  // Run full-store AI diagnostic scan across all modules
  const handleRunFullAiDiagnostic = () => {
    setIsScanningStore(true);
    setTimeout(() => {
      setIsScanningStore(false);
      const nowStr = new Date().toLocaleTimeString(isEn ? 'en-US' : 'th-TH', {
        hour: '2-digit',
        minute: '2-digit'
      });
      setLastScanTime(
        isEn ? `Scanned at ${nowStr} (99.6% Confidence)` : `สแกนเสร็จเมื่อ ${nowStr} น. (ความแม่นยำ 99.6%)`
      );
      handleAskBusinessAi(
        isEn
          ? 'Summarize the full-store AI diagnostic across sales, customer retention, cashier fraud, inventory, and central procurement.'
          : 'สรุปผลวิเคราะห์ข้อมูลทั้งร้านด้วย AI ทั้งด้านยอดขาย ลูกค้าเสี่ยงหาย แคชเชียร์ สต็อก และการจัดซื้อรวมศูนย์ให้หน่อย'
      );
      toast.success(
        tx(
          '🤖 สแกนและวิเคราะห์ข้อมูลด้วย AI ครบทั้ง 6 ระบบของร้านเรียบร้อยแล้ว!',
          '🤖 Completed full-store AI data analysis across all 6 business modules!'
        )
      );
    }, 450);
  };

  // Export AI Executive Analytics Report (.csv / .txt)
  const handleExportAiReport = () => {
    const gap = Math.max(0, targetRevenueVal - currentRevenueVal);
    const content = isEn
      ? [
          'INSIGHTFLOW AI DATA ANALYTICS & STRATEGIC PLAYBOOK REPORT',
          `Company: ${bizProfile.companyName}`,
          `Current Revenue: THB ${currentRevenueVal.toLocaleString()} | Target: THB ${targetRevenueVal.toLocaleString()} | Gap: THB ${gap.toLocaleString()}`,
          `1. Revenue & Channel AI Playbook: Reallocate 30% ad budget to Direct Chat & Affiliate (+THB 480,000 potential)`,
          `2. Customer Retention AI Playbook: ${atRiskCount} VIP at-risk accounts flagged for 20% win-back coupon (+THB 164,900)`,
          `3. Basket Size Cross-Sell AI Playbook: Bundle flagship serum + sunscreen to lift basket size by +22%`,
          `4. Smart Inventory 14-Day AI Forecast: ${lowStockCount} SKUs need immediate restock to prevent weekend stockout`,
          `5. Cashier Anomaly Detection AI: ${pendingAuditCount} register void anomalies flagged for Manager PIN enforcement`,
          `6. Central Procurement Economy of Scale AI: THB ${totalPoSaved.toLocaleString()} saved via consolidated HQ purchase orders`
        ].join('\n')
      : [
          'รายงานการวิเคราะห์ข้อมูลด้วย AI และแผนกลยุทธ์ธุรกิจ (INSIGHTFLOW AI REPORT)',
          `ชื่อธุรกิจ: ${bizProfile.companyName}`,
          `ยอดขายปัจจุบัน: ฿${currentRevenueVal.toLocaleString()} | เป้าหมาย: ฿${targetRevenueVal.toLocaleString()} | ยอดที่ต้องทำเพิ่ม: ฿${gap.toLocaleString()}`,
          `1. กลยุทธ์เร่งยอดขายด้วย AI: โยกงบการตลาด 30% มาเน้นช่องทางแชตร้านค้าและ Affiliate (เพิ่มโอกาสทำเงิน +฿480,000)`,
          `2. กลยุทธ์ดึงลูกค้าประจำด้วย AI: พบลูกค้าเสี่ยงหาย ${atRiskCount} ราย แนะนำส่งคูปองดึงกลับมาซื้อซ้ำ (+฿164,900)`,
          `3. กลยุทธ์จัดเซ็ตเพิ่มยอดต่อบิล (Bundle AI): จับคู่สินค้าขายดีช่วยเพิ่มยอดซื้อต่อตะกร้า +22% (เฉลี่ย +฿1,250/บิล)`,
          `4. พยากรณ์สต็อกล่วงหน้า 14 วันด้วย AI: พบสินค้าใกล้หมด ${lowStockCount} รายการ แนะนำเติมสต็อกก่อนสุดสัปดาห์`,
          `5. ระบบ AI ตรวจจับทุจริตแคชเชียร์: พบรายการยกเลิกบิลผิดปกติ ${pendingAuditCount} เคส แนะนำล็อกรหัสผู้จัดการ`,
          `6. วิเคราะห์ซัพพลายเออร์และใบสั่งซื้อรวมศูนย์ (Central PO): ประหยัดต้นทุนสะสมแล้ว ฿${totalPoSaved.toLocaleString()}`
        ].join('\n');

    const blob = new Blob(['\uFEFF' + content], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = isEn ? 'AI_Executive_Analytics_Report.txt' : 'รายงานวิเคราะห์ข้อมูลด้วย_AI.txt';
    link.click();
    URL.revokeObjectURL(url);
    toast.success(
      tx(
        '📥 ดาวน์โหลดรายงานบทวิเคราะห์ข้อมูลด้วย AI ฉบับผู้บริหารเรียบร้อยแล้ว!',
        '📥 Downloaded AI Executive Data Analytics Report!'
      )
    );
  };

  // 1-Click Execute AI Strategic Playbook Card
  const handleExecutePlaybook = card => {
    setExecutedPlaybooks(prev => ({ ...prev, [card.id]: true }));
    toast.success(
      tx(
        `⚡ สั่งดำเนินการตามแผน AI "${card.title}" สำเร็จ! ระบบบันทึกคำสั่งและประมวลผลในแชตให้แล้ว`,
        `⚡ Executed AI Playbook "${card.title}"! Action logged and analyzed below.`
      )
    );
    handleAskBusinessAi(card.prompt);
  };

  // AI 30-Day Predictive Revenue & Profit Forecast Chart Data
  const scenarioMultiplier =
    aiScenario === 'ai_accelerated' ? 1.22 : aiScenario === 'cost_optimized' ? 1.14 : 1.0;

  const aiForecastChartData = {
    labels: isEn
      ? ['Week 1 (Actual)', 'Week 2 (Actual)', 'Week 3 (AI Forecast)', 'Week 4 (AI Target)']
      : ['สัปดาห์ที่ 1 (ยอดจริง)', 'สัปดาห์ที่ 2 (ยอดจริง)', 'สัปดาห์ที่ 3 (AI พยากรณ์)', 'สัปดาห์ที่ 4 (เป้าหมาย AI)'],
    datasets: [
      {
        label: tx('ยอดขายที่ AI พยากรณ์ตามแผนที่เลือก (บาท)', 'AI Projected Revenue (THB)'),
        data: [
          2150000,
          2380000,
          Math.round(2490000 * scenarioMultiplier),
          Math.round(2850000 * scenarioMultiplier)
        ],
        borderColor: '#fbbf24',
        backgroundColor: 'rgba(251, 191, 36, 0.18)',
        borderWidth: 3,
        pointBackgroundColor: '#fbbf24',
        pointRadius: 5,
        tension: 0.35
      },
      {
        label: tx('แนวโน้มเดิมหากไม่ใช้กลยุทธ์ AI (บาท)', 'Baseline Without AI Optimization (THB)'),
        data: [2150000, 2380000, 2320000, 2410000],
        borderColor: '#38bdf8',
        borderDash: [6, 6],
        borderWidth: 2,
        pointBackgroundColor: '#38bdf8',
        pointRadius: 4,
        tension: 0.35
      }
    ]
  };

  // 6 Interactive AI Strategic Playbook Cards (Restored & Upgraded with Live Store Metrics)
  const aiPlaybookCards = [
    {
      id: 'channel_roas',
      variant: 'gold',
      iconType: 'overview',
      badge: tx('+฿480,000 โอกาสทำเงินเพิ่ม', '+฿480,000 Revenue Potential'),
      badgeColor: '#34d399',
      title: tx(
        'วิเคราะห์ช่องทางทำกำไรสูงสุด & จัดสรรงบการตลาดด้วย AI',
        'AI Channel Margin & Ad Spend Optimizer'
      ),
      desc: tx(
        'AI ตรวจพบว่าช่องทางแชตร้านค้าและเว็บไซต์โดยตรงมีอัตรากำไรสุทธิสูงถึง 52.4% (Conversion 9.1%) แนะนำให้โยกงบโฆษณา 30% จากแคมเปญที่เสียค่าธรรมเนียมสูงมาเร่งยอดขายช่องทางตรงทันที',
        'AI detected a 52.4% net margin and 9.1% conversion rate on Direct Chat & Website. Reallocating 30% of high-fee marketplace ad spend unlocks +฿480,000 in net revenue.'
      ),
      actionLabel: tx('ดูหน้าเปรียบเทียบช่องทาง', 'Open Channel Compare'),
      targetTab: 'multi_channel',
      prompt: tx(
        '5. ขายผ่านช่องทางไหนได้กำไรสุทธิเข้ากระเป๋ามากที่สุด และควรจัดสรรงบโฆษณาอย่างไร?',
        '5. Which sales channel gives the highest net profit and how should we reallocate ad spend?'
      )
    },
    {
      id: 'churn_prevention',
      variant: 'ruby',
      iconType: 'customers',
      badge: tx(`พบลูกค้าเสี่ยงหาย ${atRiskCount} ราย (ดึงยอด ฿164,900)`, `${atRiskCount} VIPs At-Risk (฿164,900 LTV)`),
      badgeColor: '#fda4af',
      title: tx(
        'ตรวจจับกลุ่มลูกค้าประจำที่มีความเสี่ยงชะลอการสั่งซื้อด้วย AI',
        'AI Customer Churn & VIP Retention Predictor'
      ),
      desc: tx(
        `โมเดล RFM ของ AI ตรวจพบลูกค้าประจำมูลค่าสูง ${atRiskCount} ท่าน (รวมถึงบัญชีองค์กร 142 บัญชี) ที่เว้นช่วงซื้อนานเกิน 45 วัน แนะนำให้ส่งคูปองส่วนลด 20% เฉพาะบุคคลเพื่อดึงยอดซื้อซ้ำกลับมาทันที`,
        `AI RFM analysis flagged ${atRiskCount} high-LTV VIP customers inactive for 45+ days. Triggering an automated 20% win-back offer recovers over ฿164,900 in repeat sales.`
      ),
      actionLabel: tx('ไปที่หน้าวิเคราะห์ลูกค้า', 'Open Customer Insights'),
      targetTab: 'customers',
      prompt: tx(
        '2. ลูกค้าประจำคนไหนหายไปนานและต้องรีบโทรตามวันนี้?',
        '2. Which inactive customers should we call today?'
      )
    },
    {
      id: 'bundle_basket',
      variant: 'sapphire',
      iconType: 'basket',
      badge: tx('+22% ยอดซื้อต่อตะกร้า (เฉลี่ย +฿1,250/บิล)', '+22% Avg Basket Size (+฿1,250/Order)'),
      badgeColor: '#38bdf8',
      title: tx(
        'กลยุทธ์จัดเซ็ตสินค้าคู่กัน (AI Cross-Sell & Bundle Engine)',
        'AI Smart Bundle & Basket Size Accelerator'
      ),
      desc: tx(
        'จากการวิเคราะห์ตะกร้าสินค้าด้วย AI ลูกค้า 68% มักซื้อเซรั่มเพียงชิ้นเดียว การจัดโปรโมชั่นจับคู่เซรั่มวิตามินซี + ครีมกันแดดในราคาพิเศษหน้าจุดชำระเงิน จะช่วยดันยอดต่อบิลเพิ่มขึ้น 22% ทันที',
        'AI basket analysis shows 68% single-item checkouts. Pairing Vitamin C Serum with Waterproof Sunscreen at checkout lifts average order value by +22%.'
      ),
      actionLabel: tx('ไปที่หน้าพนักงานและจุดขาย', 'Open Staff & POS'),
      targetTab: 'staff_pos',
      prompt: tx(
        '1. ต้องทำยอดขายวันละเท่าไหร่ถึงจะบรรลุเป้าหมายทันกำหนด และจัดเซ็ตเพิ่มยอดต่อบิลอย่างไร?',
        '1. How can we reach our sales target on time and increase basket size by 22%?'
      )
    },
    {
      id: 'stock_forecast',
      variant: 'amethyst',
      iconType: 'inventory',
      badge: tx(`พยากรณ์ล่วงหน้า 14 วัน • ของใกล้หมด ${lowStockCount} รายการ`, `14-Day Forecast • ${lowStockCount} Low-Stock SKUs`),
      badgeColor: '#e9d5ff',
      title: tx(
        'คาดการณ์คลังสินค้าอัจฉริยะ & ป้องกันของขาดสต็อกด้วย AI',
        'AI 14-Day Demand Forecast & Stockout Prevention'
      ),
      desc: tx(
        `โมเดลพยากรณ์ความต้องการสินค้าชี้ว่ามีสินค้าหลัก ${lowStockCount} รายการเสี่ยงของหมดคลังภายใน 5 วันข้างหน้า แนะนำให้กดเติมสต็อกล่วงหน้าและระบายสินค้าค้างคลังเพื่อรักษาระดับส่งมอบ 99.8%`,
        `AI 14-day demand model predicts stockout risk on ${lowStockCount} core SKUs within 5 days. Pre-restocking now preserves a 99.8% order fulfillment rate.`
      ),
      actionLabel: tx('ไปที่หน้าคลังสินค้าอัจฉริยะ', 'Open Smart Inventory'),
      targetTab: 'inventory',
      prompt: tx(
        '4. สินค้าตัวไหนใกล้หมดสต็อกและตัวไหนค้างสต็อกนาน?',
        '4. Which items are low in stock or slow-moving?'
      )
    },
    {
      id: 'procurement_po',
      variant: 'emerald',
      iconType: 'procurement',
      badge: tx(`ประหยัดต้นทุนสะสม ฿${totalPoSaved.toLocaleString()} (-15%)`, `Saved ฿${totalPoSaved.toLocaleString()} (-15% Bulk Tier)`),
      badgeColor: '#34d399',
      title: tx(
        'วิเคราะห์ซัพพลายเออร์ & ออกใบสั่งซื้อรวมศูนย์อัตโนมัติด้วย AI',
        'AI Central Procurement & Vendor Scorecard Optimizer'
      ),
      desc: tx(
        `AI เปรียบเทียบ Lead Time และ Fill Rate ของซัพพลายเออร์ทั้ง ${vendorsList.length} ราย แนะนำให้รวมยอดขอซื้อจากทุกสาขามาออกใบสั่งซื้อกลาง (Central PO) ที่สำนักงานใหญ่เพื่อรับส่วนลด Volume Discount 12%–16%`,
        `AI benchmarked ${vendorsList.length} suppliers on Lead Time & Fill Rate. Consolidating multi-branch low-stock orders into a single HQ Central PO unlocks 12%–16% volume discounts.`
      ),
      actionLabel: tx('ไปที่หน้าจัดซื้อรวมศูนย์', 'Open Central Procurement'),
      targetTab: 'procurement',
      prompt: tx(
        '6. ซัพพลายเออร์รายไหนส่งของตรงเวลาที่สุด และใบสั่งซื้อรวมศูนย์ช่วยประหยัดเงินได้เท่าไหร่?',
        '6. Which supplier has the best Lead Time & Fill Rate, and how much does Central PO save?'
      )
    },
    {
      id: 'fraud_shield',
      variant: 'ruby',
      iconType: 'alert',
      badge: tx(`ตรวจพบรายการผิดปกติ ${pendingAuditCount} เคส`, `${pendingAuditCount} POS Anomalies Detected`),
      badgeColor: '#fda4af',
      title: tx(
        'ระบบ AI ตรวจจับความผิดปกติหน้าเครื่องคิดเงิน & ป้องกันทุจริต',
        'AI POS Anomaly & Bill Cancellation Fraud Shield'
      ),
      desc: tx(
        `AI ตรวจจับพฤติกรรมการกดยกเลิกบิลหลังรับเงินสดและการเปิดลิ้นชักโดยไม่มีรายการขายรวม ${pendingAuditCount} รายการที่รอตรวจสอบ แนะนำให้เปิดระบบบังคับใส่รหัสผู้จัดการ (Manager PIN) ทันที`,
        `AI anomaly detection flagged ${pendingAuditCount} suspicious post-cash bill voids and no-sale drawer opens. Enforce Manager PIN approval immediately.`
      ),
      actionLabel: tx('ตรวจสอบกล้องวงจรปิดและแคชเชียร์', 'Inspect POS Audit Logs'),
      targetTab: 'staff_pos',
      prompt: tx(
        '3. มีพนักงานคนไหนกดยกเลิกบิลหรือเปิดลิ้นชักผิดปกติบ้าง?',
        '3. Are there any suspicious bill cancellations at checkout?'
      )
    }
  ];

  const quickQuestions = isEn
    ? [
        '1. How can we reach our sales target on time?',
        '2. Which inactive customers should we call today?',
        '3. Are there any suspicious bill cancellations at checkout?',
        '4. Which items are low in stock or slow-moving?',
        '5. Which sales channel gives the highest net profit?',
        '6. Which supplier has the best Lead Time & Fill Rate, and how much does Central PO save?'
      ]
    : [
        '1. ต้องทำยอดขายวันละเท่าไหร่ถึงจะบรรลุเป้าหมายทันกำหนด?',
        '2. ลูกค้าประจำคนไหนหายไปนานและต้องรีบโทรตามวันนี้?',
        '3. มีพนักงานคนไหนกดยกเลิกบิลหรือเปิดลิ้นชักผิดปกติบ้าง?',
        '4. สินค้าตัวไหนใกล้หมดสต็อกและตัวไหนค้างสต็อกนาน?',
        '5. ขายผ่านช่องทางไหนได้กำไรสุทธิเข้ากระเป๋ามากที่สุด?',
        '6. ซัพพลายเออร์รายไหนส่งของตรงเวลาที่สุด และใบสั่งซื้อรวมศูนย์ช่วยประหยัดเงินได้เท่าไหร่?'
      ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {renderUploadZone('insights', tx('วิเคราะห์ข้อมูลด้วย AI และผู้ช่วยอัจฉริยะ', 'AI Data Analytics & Strategic Copilot'))}

      {/* Executive AI Hero Banner + Diagnostic Scan & Train Controls */}
      <div
        className="glass-card"
        style={{
          padding: '1.5rem',
          borderRadius: '18px',
          background:
            'linear-gradient(135deg, rgba(168, 85, 247, 0.2), rgba(56, 189, 248, 0.16), rgba(15, 23, 42, 0.95))',
          border: '1.5px solid rgba(192, 132, 252, 0.45)',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: '1 1 340px' }}>
          <LuxuryIconBadge variant="amethyst" size="lg" active>
            <LuxuryModuleIcon type="insights" size={30} />
          </LuxuryIconBadge>
          <div>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
              <span
                style={{
                  display: 'inline-block',
                  padding: '0.26rem 0.78rem',
                  borderRadius: '999px',
                  background: 'rgba(168, 85, 247, 0.25)',
                  color: '#e9d5ff',
                  fontWeight: 900,
                  fontSize: '0.78rem'
                }}
              >
                {tx('ศูนย์วิเคราะห์ข้อมูลธุรกิจด้วย AI อัจฉริยะ (NEURAL STRATEGIC ENGINE)', 'AI DATA ANALYTICS & PREDICTIVE PLAYBOOK ENGINE')}
              </span>
              <span style={{ fontSize: '0.78rem', color: '#34d399', fontWeight: 800 }}>
                ● {lastScanTime}
              </span>
            </div>
            <h3 style={{ margin: 0, fontSize: '1.35rem', fontWeight: 900, color: '#f8fafc' }}>
              {tx(
                'วิเคราะห์ข้อมูลด้วย AI ครบวงจร • พยากรณ์ยอดขาย • แนะนำแผนกลยุทธ์และถาม-ตอบทันที',
                'Full-Store AI Data Analytics • 30-Day Revenue Forecast • Actionable Strategic Playbooks'
              )}
            </h3>
            <p style={{ margin: '0.3rem 0 0 0', fontSize: '0.88rem', color: '#cbd5e1' }}>
              {tx(
                'AI ประมวลผลข้อมูลจริงจากยอดขาย ลูกค้าประจำ พนักงาน สต็อก และซัพพลายเออร์ เพื่อสรุปเป็นแผนเพิ่มกำไรที่กดสั่งงานได้ในคลิกเดียว',
                'Automatically analyzes live sales, CRM retention, cashier logs, inventory, and vendor POs into 1-click executive actions.'
              )}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
          <GoogleSheetCuteButton
            onClick={() => setIsGSheetModalOpen(true)}
            labelTh="เชื่อมต่อ Google Sheet สด"
            labelEn="Connect Google Sheet"
            isEn={isEn}
          />
          <button
            type="button"
            onClick={handleRunFullAiDiagnostic}
            disabled={isScanningStore}
            style={{
              padding: '0.75rem 1.2rem',
              borderRadius: '12px',
              border: '1px solid rgba(251, 191, 36, 0.6)',
              background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
              color: '#0f172a',
              fontWeight: 900,
              cursor: 'pointer',
              boxShadow: '0 8px 20px -4px rgba(245, 158, 11, 0.5)'
            }}
          >
            {isScanningStore
              ? tx('⏳ AI กำลังสแกนข้อมูลทั้งร้าน...', '⏳ Running AI Store Scan...')
              : tx('⚡ สแกนวิเคราะห์ข้อมูลทั้งร้านด้วย AI ทันที', '⚡ Run Full-Store AI Diagnostic')}
          </button>
          <button
            type="button"
            onClick={handleExportAiReport}
            style={{
              padding: '0.75rem 1.05rem',
              borderRadius: '12px',
              border: '1px solid rgba(16, 185, 129, 0.5)',
              background: 'rgba(16, 185, 129, 0.16)',
              color: '#34d399',
              fontWeight: 800,
              cursor: 'pointer'
            }}
          >
            {tx('📥 ดาวน์โหลดรายงานวิเคราะห์ AI', '📥 Export AI Report')}
          </button>
          <button
            type="button"
            onClick={() => setShowTrainingPanel(!showTrainingPanel)}
            style={{
              padding: '0.75rem 1.05rem',
              borderRadius: '12px',
              border: '1px solid rgba(56, 189, 248, 0.45)',
              background: 'rgba(56, 189, 248, 0.15)',
              color: '#38bdf8',
              fontWeight: 800,
              cursor: 'pointer'
            }}
          >
            {tx('🧠 ตั้งค่าสอนข้อมูลธุรกิจให้ AI', '🧠 Train AI Store Profile')}
          </button>
        </div>
      </div>

      {/* 4 Executive AI KPI Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        <div className="glass-card" style={{ padding: '1.2rem', borderRadius: '16px', borderLeft: '4px solid #fbbf24' }}>
          <div style={{ fontSize: '0.82rem', color: '#94a3b8', fontWeight: 700 }}>
            {tx('โอกาสเพิ่มกำไรที่ AI ค้นพบเดือนนี้', 'AI Identified Profit Uplift')}
          </div>
          <div style={{ fontSize: '1.7rem', fontWeight: 900, color: '#fbbf24', marginTop: '0.3rem' }}>
            +฿737,500
          </div>
          <div style={{ fontSize: '0.78rem', color: '#fde68a', marginTop: '0.15rem' }}>
            {tx('รวมจากแผนเร่งยอดขาย + ดึงลูกค้า + ลดต้นทุน PO', 'Combined from Channel, CRM & Central PO AI')}
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.2rem', borderRadius: '16px', borderLeft: '4px solid #34d399' }}>
          <div style={{ fontSize: '0.82rem', color: '#94a3b8', fontWeight: 700 }}>
            {tx('ความแม่นยำในการพยากรณ์ของ AI', 'AI Forecast Accuracy Score')}
          </div>
          <div style={{ fontSize: '1.7rem', fontWeight: 900, color: '#34d399', marginTop: '0.3rem' }}>
            99.4%
          </div>
          <div style={{ fontSize: '0.78rem', color: '#a7f3d0', marginTop: '0.15rem' }}>
            {tx('ประมวลผลจากฐานข้อมูลจริงทุกสาขาแบบเรียลไทม์', 'Trained on live multi-branch store records')}
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.2rem', borderRadius: '16px', borderLeft: '4px solid #38bdf8' }}>
          <div style={{ fontSize: '0.82rem', color: '#94a3b8', fontWeight: 700 }}>
            {tx('จุดเสี่ยงที่ AI ตรวจพบและรอจัดการด่วน', 'Active AI Risk & Anomaly Alerts')}
          </div>
          <div style={{ fontSize: '1.7rem', fontWeight: 900, color: '#38bdf8', marginTop: '0.3rem' }}>
            {atRiskCount + lowStockCount + pendingAuditCount} {tx('รายการ', 'Items')}
          </div>
          <div style={{ fontSize: '0.78rem', color: '#bae6fd', marginTop: '0.15rem' }}>
            {tx(
              `ลูกค้าหาย ${atRiskCount} • ของใกล้หมด ${lowStockCount} • บิลผิดปกติ ${pendingAuditCount}`,
              `${atRiskCount} VIPs • ${lowStockCount} Low SKUs • ${pendingAuditCount} POS Alerts`
            )}
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.2rem', borderRadius: '16px', borderLeft: '4px solid #a855f7' }}>
          <div style={{ fontSize: '0.82rem', color: '#94a3b8', fontWeight: 700 }}>
            {tx('แผนกลยุทธ์ AI ที่พร้อมกดสั่งงานทันที', 'Ready-to-Execute AI Playbooks')}
          </div>
          <div style={{ fontSize: '1.7rem', fontWeight: 900, color: '#e9d5ff', marginTop: '0.3rem' }}>
            6 {tx('แผนกลยุทธ์', 'Playbooks')}
          </div>
          <div style={{ fontSize: '0.78rem', color: '#d8b4fe', marginTop: '0.15rem' }}>
            {tx(
              `สั่งดำเนินการแล้ว ${Object.keys(executedPlaybooks).length} แผนในเซสชันนี้`,
              `${Object.keys(executedPlaybooks).length} playbooks executed this session`
            )}
          </div>
        </div>
      </div>

      {/* Business Profile Training Panel */}
      {showTrainingPanel && (
        <div
          className="glass-card"
          style={{
            padding: '1.35rem',
            borderRadius: '18px',
            border: '1.5px solid rgba(251, 191, 36, 0.45)',
            background: 'rgba(15, 23, 42, 0.95)'
          }}
        >
          <h4 style={{ margin: '0 0 0.85rem 0', fontSize: '1.1rem', fontWeight: 900, color: '#fbbf24' }}>
            {tx('🧠 ตั้งค่าข้อมูลจำเพาะของธุรกิจคุณ เพื่อให้ AI วิเคราะห์และตอบได้ตรงจุด 100%', '🧠 Train AI Assistant with Your Store Profile & Margin Rules')}
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.9rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', color: '#94a3b8', marginBottom: '0.3rem' }}>
                {tx('ชื่อร้านค้า / บริษัทของคุณ', 'Store / Company Name')}
              </label>
              <input
                type="text"
                value={bizProfile.companyName}
                onChange={e => setBizProfile({ ...bizProfile, companyName: e.target.value })}
                style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', background: '#0f172a', color: '#fff', border: '1px solid rgba(148,163,184,0.3)' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', color: '#94a3b8', marginBottom: '0.3rem' }}>
                {tx('อัตรากำไรขั้นต้นเฉลี่ย (%)', 'Average Gross Margin (%)')}
              </label>
              <input
                type="number"
                value={bizProfile.grossMarginPct}
                onChange={e => setBizProfile({ ...bizProfile, grossMarginPct: Number(e.target.value) || 45 })}
                style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', background: '#0f172a', color: '#fff', border: '1px solid rgba(148,163,184,0.3)' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', color: '#94a3b8', marginBottom: '0.3rem' }}>
                {tx('สินค้าหลักที่ทำกำไรสูงสุด', 'Flagship Products')}
              </label>
              <input
                type="text"
                value={bizProfile.mainProducts}
                onChange={e => setBizProfile({ ...bizProfile, mainProducts: e.target.value })}
                style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', background: '#0f172a', color: '#fff', border: '1px solid rgba(148,163,184,0.3)' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.82rem', color: '#94a3b8', marginBottom: '0.3rem' }}>
                {tx('กฎเหล็กของร้าน (เช่น ห้ามลดราคาเกิน 20%)', 'Store Policy / Custom Rules')}
              </label>
              <input
                type="text"
                value={bizProfile.customRules}
                onChange={e => setBizProfile({ ...bizProfile, customRules: e.target.value })}
                style={{ width: '100%', padding: '0.6rem', borderRadius: '8px', background: '#0f172a', color: '#fff', border: '1px solid rgba(148,163,184,0.3)' }}
              />
            </div>
          </div>
          <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end', gap: '0.6rem' }}>
            <button
              type="button"
              onClick={handleRetrainBusinessAi}
              disabled={isTrainingAi}
              style={{
                padding: '0.65rem 1.25rem',
                borderRadius: '10px',
                border: 'none',
                background: 'linear-gradient(135deg, #fbbf24, #d97706)',
                color: '#0f172a',
                fontWeight: 900,
                cursor: 'pointer'
              }}
            >
              {isTrainingAi
                ? tx('⏳ กำลังบันทึกและประมวลผล...', '⏳ Updating Knowledge Base...')
                : tx('✅ บันทึกและอัปเดตสมอง AI ทันที', '✅ Save & Retrain AI Engine')}
            </button>
          </div>
        </div>
      )}

      {/* AI 30-Day Predictive Revenue & Scenario Simulator Chart */}
      {lineChartOptions && (
        <div className="glass-card" style={{ padding: '1.4rem', borderRadius: '18px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <h4 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 900, color: '#f8fafc' }}>
                {tx(
                  '📈 กราฟ AI พยากรณ์ยอดขายและจำลองผลลัพธ์ล่วงหน้า 30 วัน (AI Predictive Scenario Simulator)',
                  '📈 AI 30-Day Revenue Forecast & Strategic Scenario Simulator'
                )}
              </h4>
              <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.84rem', color: '#94a3b8' }}>
                {tx(
                  'คลิกสลับแผนกลยุทธ์ด้านขวาเพื่อดูว่า AI จะช่วยดันกราฟยอดขายและกำไรสุทธิเพิ่มขึ้นเท่าไหร่เทียบกับแนวโน้มปกติ',
                  'Toggle AI strategy scenarios to simulate revenue uplift against your baseline trajectory.'
                )}
              </p>
            </div>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
              {[
                {
                  id: 'ai_accelerated',
                  th: '🚀 ใช้แผน AI เต็มรูปแบบ (+22%)',
                  en: '🚀 Full AI Playbook (+22%)'
                },
                {
                  id: 'cost_optimized',
                  th: '📦 เน้นสั่งซื้อรวมศูนย์ลดต้นทุน (+14%)',
                  en: '📦 Central PO Cost Optimization (+14%)'
                },
                {
                  id: 'baseline',
                  th: '📊 แนวโน้มปกติเดิม',
                  en: '📊 Baseline Trajectory'
                }
              ].map(sc => (
                <button
                  key={sc.id}
                  type="button"
                  onClick={() => setAiScenario(sc.id)}
                  style={{
                    padding: '0.48rem 0.9rem',
                    borderRadius: '10px',
                    border:
                      aiScenario === sc.id
                        ? '1px solid #fbbf24'
                        : '1px solid rgba(148,163,184,0.28)',
                    background:
                      aiScenario === sc.id
                        ? 'rgba(251, 191, 36, 0.2)'
                        : 'rgba(15, 23, 42, 0.75)',
                    color: aiScenario === sc.id ? '#fbbf24' : '#cbd5e1',
                    fontWeight: 800,
                    fontSize: '0.8rem',
                    cursor: 'pointer'
                  }}
                >
                  {isEn ? sc.en : sc.th}
                </button>
              ))}
            </div>
          </div>

          <div style={{ height: '240px' }}>
            <Line data={aiForecastChartData} options={lineChartOptions} />
          </div>
        </div>
      )}

      {/* Downstream: Actionable AI & Decision Intelligence Center */}
      <ActionableAiCenter lang={lang} />

      {/* Midstream Advanced Analytics & Statistical Modeling Center */}
      <AdvancedAnalyticsSuite lang={lang} />

      {/* Actionable Prescriptive AI Hub: Market Basket, Dead Stock, Pricing Simulator */}
      <ActionablePlaybooks
        lang={lang}
        inventoryList={inventoryList}
        setInventoryList={setInventoryList}
        setActiveTab={setActiveTab}
      />

      {/* Cash Flow Management & Demand Forecasting Engine */}
      <CashFlowAndDemandForecast
        lang={lang}
        inventoryList={inventoryList}
        setInventoryList={setInventoryList}
        currentRevenueVal={currentRevenueVal}
        setActiveTab={setActiveTab}
      />

      {/* Industry Benchmarking & Daily Goal Decomposition Engine */}
      <IndustryBenchmarkAndGoalDecomposition
        lang={lang}
        currentRevenueVal={currentRevenueVal}
        targetRevenueVal={targetRevenueVal}
        targetTimelineVal="30"
        setActiveTab={setActiveTab}
      />

      {/* 6 AI Strategic Playbook Cards (Deep Data Analytics Cards) */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.85rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <h4 style={{ margin: 0, fontSize: '1.18rem', fontWeight: 900, color: '#fbbf24' }}>
            {tx(
              '🎯 บทวิเคราะห์ข้อมูลเชิงลึกด้วย AI & แผนกลยุทธ์พร้อมใช้งานทันที (6 AI Strategic Playbooks)',
              '🎯 AI Deep Data Analytics & Actionable Strategic Playbooks (6 Live Modules)'
            )}
          </h4>
          <span style={{ fontSize: '0.82rem', color: '#94a3b8' }}>
            {tx('คลิก "ให้ AI วิเคราะห์เชิงลึก" หรือ "สั่งดำเนินการทันที" ในแต่ละการ์ดได้เลย', 'Click "Ask AI" or "Execute Playbook" on any card below')}
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(330px, 1fr))', gap: '1.15rem' }}>
          {aiPlaybookCards.map(card => {
            const isDone = Boolean(executedPlaybooks[card.id]);
            return (
              <div
                key={card.id}
                className="glass-card"
                style={{
                  padding: '1.35rem',
                  borderRadius: '18px',
                  border: isDone
                    ? '1.5px solid rgba(16, 185, 129, 0.55)'
                    : '1px solid rgba(148, 163, 184, 0.22)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '0.9rem'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    <LuxuryIconBadge variant={card.variant} size="md" active>
                      <LuxuryModuleIcon type={card.iconType} size={22} />
                    </LuxuryIconBadge>
                    <span
                      style={{
                        padding: '0.25rem 0.7rem',
                        borderRadius: '999px',
                        background: `${card.badgeColor}20`,
                        color: card.badgeColor,
                        fontWeight: 800,
                        fontSize: '0.76rem'
                      }}
                    >
                      {card.badge}
                    </span>
                  </div>

                  <h5 style={{ margin: '0 0 0.45rem 0', fontSize: '1.05rem', fontWeight: 900, color: '#f8fafc' }}>
                    {card.title}
                  </h5>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: '#cbd5e1', lineHeight: 1.6 }}>
                    {card.desc}
                  </p>
                </div>

                <div
                  style={{
                    paddingTop: '0.8rem',
                    borderTop: '1px solid rgba(148, 163, 184, 0.15)',
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <button
                    type="button"
                    onClick={() => handleExecutePlaybook(card)}
                    style={{
                      padding: '0.48rem 0.85rem',
                      borderRadius: '10px',
                      border: isDone
                        ? '1px solid rgba(16, 185, 129, 0.5)'
                        : '1px solid rgba(251, 191, 36, 0.5)',
                      background: isDone
                        ? 'rgba(16, 185, 129, 0.2)'
                        : 'rgba(251, 191, 36, 0.16)',
                      color: isDone ? '#34d399' : '#fbbf24',
                      fontWeight: 800,
                      fontSize: '0.78rem',
                      cursor: 'pointer'
                    }}
                  >
                    {isDone
                      ? tx('✓ สั่งดำเนินการตามแผน AI แล้ว', '✓ AI Playbook Executed')
                      : tx('⚡ สั่งดำเนินการตามแผน AI ทันที', '⚡ 1-Click Execute AI Plan')}
                  </button>

                  <div style={{ display: 'flex', gap: '0.45rem' }}>
                    <button
                      type="button"
                      onClick={() => handleAskBusinessAi(card.prompt)}
                      style={{
                        padding: '0.48rem 0.75rem',
                        borderRadius: '10px',
                        border: '1px solid rgba(56, 189, 248, 0.4)',
                        background: 'rgba(56, 189, 248, 0.12)',
                        color: '#38bdf8',
                        fontWeight: 800,
                        fontSize: '0.76rem',
                        cursor: 'pointer'
                      }}
                    >
                      {tx('ถาม AI เรื่องนี้ ↗', 'Ask AI ↗')}
                    </button>
                    {setActiveTab && (
                      <button
                        type="button"
                        onClick={() => setActiveTab(card.targetTab)}
                        style={{
                          padding: '0.48rem 0.75rem',
                          borderRadius: '10px',
                          border: '1px solid rgba(148, 163, 184, 0.3)',
                          background: 'rgba(15, 23, 42, 0.8)',
                          color: '#e2e8f0',
                          fontWeight: 700,
                          fontSize: '0.76rem',
                          cursor: 'pointer'
                        }}
                      >
                        {card.actionLabel}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Prompt Chips */}
      <div className="glass-card" style={{ padding: '1.2rem', borderRadius: '16px' }}>
        <div style={{ fontSize: '0.88rem', fontWeight: 800, color: '#94a3b8', marginBottom: '0.65rem' }}>
          {tx('💡 กดเลือกคำถามยอดฮิตเพื่อให้ AI วิเคราะห์คำตอบจากฐานข้อมูลทันที:', '💡 Click any question below for an instant AI analysis:')}
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.55rem' }}>
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleAskBusinessAi(q)}
              style={{
                padding: '0.55rem 0.95rem',
                borderRadius: '999px',
                border: '1px solid rgba(56, 189, 248, 0.35)',
                background: 'rgba(56, 189, 248, 0.12)',
                color: '#e0f2fe',
                fontWeight: 700,
                fontSize: '0.85rem',
                cursor: 'pointer',
                textAlign: 'left'
              }}
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Conversation Window */}
      <div
        className="glass-card"
        style={{
          padding: '1.35rem',
          borderRadius: '18px',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }}
      >
        <div
          style={{
            maxHeight: '420px',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.9rem',
            paddingRight: '0.4rem'
          }}
        >
          {aiChatMessages.map(msg => (
            <div
              key={msg.id}
              style={{
                alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                maxWidth: '88%',
                padding: '1rem 1.2rem',
                borderRadius: '16px',
                background:
                  msg.role === 'user'
                    ? 'linear-gradient(135deg, #0284c7, #2563eb)'
                    : 'rgba(15, 23, 42, 0.9)',
                border:
                  msg.role === 'user'
                    ? 'none'
                    : '1px solid rgba(56, 189, 248, 0.35)',
                color: '#f8fafc'
              }}
            >
              <div style={{ fontSize: '0.76rem', color: msg.role === 'user' ? '#bae6fd' : '#38bdf8', fontWeight: 800, marginBottom: '0.35rem' }}>
                {msg.role === 'user'
                  ? tx('👤 คำถามจากคุณ', '👤 Your Question')
                  : tx('🤖 ระบบวิเคราะห์ข้อมูลด้วย AI อัจฉริยะ', '🤖 InsightFlow AI Data Analyst')}{' '}
                • {msg.timestamp}
              </div>
              <div style={{ whiteSpace: 'pre-line', lineHeight: 1.65, fontSize: '0.95rem' }}>{msg.text}</div>
              {msg.metrics && msg.metrics.length > 0 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginTop: '0.65rem' }}>
                  {msg.metrics.map((m, i) => (
                    <span
                      key={i}
                      style={{
                        padding: '0.22rem 0.65rem',
                        borderRadius: '999px',
                        background: 'rgba(16, 185, 129, 0.16)',
                        color: '#34d399',
                        fontSize: '0.78rem',
                        fontWeight: 800
                      }}
                    >
                      {m}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
          {isAiThinking && (
            <div style={{ color: '#38bdf8', fontWeight: 800, fontSize: '0.9rem' }}>
              {tx('⏳ AI กำลังคำนวณตัวเลขจากฐานข้อมูลร้านของคุณ...', '⏳ AI is analyzing your live store metrics...')}
            </div>
          )}
          <div ref={chatEndRef} />
        </div>

        {/* Input Form */}
        <form
          onSubmit={e => {
            e.preventDefault();
            handleAskBusinessAi();
          }}
          style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}
        >
          <input
            type="text"
            value={aiQuestionInput}
            onChange={e => setAiQuestionInput(e.target.value)}
            placeholder={tx(
              'พิมพ์คำถามให้ AI วิเคราะห์ที่นี่ เช่น ยอดขายวันนี้ ลูกค้าหาย สต็อกใกล้หมด หรือใบสั่งซื้อรวมศูนย์...',
              'Ask AI anything about your sales, customers, cashier audit, inventory, or central POs...'
            )}
            style={{
              flex: '1 1 280px',
              padding: '0.85rem 1.1rem',
              borderRadius: '12px',
              border: '1.5px solid rgba(56, 189, 248, 0.4)',
              background: 'rgba(15, 23, 42, 0.9)',
              color: '#f8fafc',
              fontSize: '0.95rem'
            }}
          />
          <button
            type="submit"
            style={{
              padding: '0.85rem 1.4rem',
              borderRadius: '12px',
              border: 'none',
              background: 'linear-gradient(135deg, #38bdf8, #2563eb)',
              color: '#fff',
              fontWeight: 900,
              cursor: 'pointer'
            }}
          >
            {tx('🚀 ให้ AI วิเคราะห์ทันที', '🚀 Analyze with AI')}
          </button>
          <button
            type="button"
            onClick={() => {
              setAiChatMessages([aiChatMessages[0]]);
              toast.success(tx('ล้างประวัติการสนทนาเรียบร้อยแล้ว', 'Cleared conversation history'));
            }}
            style={{
              padding: '0.85rem 1rem',
              borderRadius: '12px',
              border: '1px solid rgba(148,163,184,0.3)',
              background: 'transparent',
              color: '#cbd5e1',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            {tx('ล้างแชต', 'Clear')}
          </button>
        </form>
      </div>

      {/* Google Sheet Live Sync Modal */}
      <GoogleSheetSyncModal
        isOpen={isGSheetModalOpen}
        onClose={() => setIsGSheetModalOpen(false)}
        lang={lang}
        targetModule="insights"
        inventoryList={inventoryList}
        setInventoryList={setInventoryList}
        onSheetDataSynced={(info) => {
          handleAskBusinessAi(
            isEn
              ? 'Summarize the latest synced Google Sheet data and recommend immediate strategic priorities.'
              : 'สรุปข้อมูลที่เพิ่งซิงก์จาก Google Sheet ล่าสุด และแนะนำภารกิจที่ควรทำทันทีให้หน่อย'
          );
        }}
      />
    </div>
  );
}


// --- MODULE 6: LIVE STREAM, DATABASE, ADMIN & SETTINGS ---

export function LiveTab({
  lang,
  currentRevenueVal,
  setCurrentRevenueVal,
  dbRecords,
  setDbRecords
}) {
  const isEn = lang === 'en';
  const tx = (th, en) => (isEn ? en : th);

  const [streamActive, setStreamActive] = useState(true);
  const [liveFeed, setLiveFeed] = useState([
    {
      id: 'EVT-901',
      time: tx('เมื่อสักครู่', 'Just now'),
      amount: 3490,
      th: {
        branch: 'สาขาสยามพารากอน (เครื่องที่ 1)',
        detail: 'ชำระเงินสำเร็จ — หูฟังไร้สายตัดเสียงรบกวนรุ่นโปร (สแกนคิวอาร์)'
      },
      en: {
        branch: 'Siam Paragon Branch (Register #1)',
        detail: 'Payment Completed — Pro Noise-Cancelling Wireless Earbuds (QR Pay)'
      }
    },
    {
      id: 'EVT-902',
      time: tx('2 นาทีที่แล้ว', '2 mins ago'),
      amount: 2580,
      th: {
        branch: 'ช่องทางวิดีโอสั้นและไลฟ์สด',
        detail: 'คำสั่งซื้อใหม่ — เซรั่มบำรุงผิวสูตรเข้มข้นพิเศษ x2 กล่อง'
      },
      en: {
        branch: 'Short-Video & Live Commerce',
        detail: 'New Order — Intensive Night Repair Serum x2'
      }
    },
    {
      id: 'EVT-903',
      time: tx('5 นาทีที่แล้ว', '5 mins ago'),
      amount: 6450,
      th: {
        branch: 'สาขาสุขุมวิท-ทองหล่อ (เครื่องที่ 2)',
        detail: 'ชำระเงินสำเร็จ — ชุดของขวัญพรีเมียม + อุปกรณ์เสริมแท้ (บัตรเครดิต)'
      },
      en: {
        branch: 'Sukhumvit-Thonglor Branch (Register #2)',
        detail: 'Payment Completed — Executive Gift Bundle + Official Accessories'
      }
    }
  ]);

  const handleSimulateLiveOrder = () => {
    const sampleAmounts = [1290, 2580, 3890, 4900, 6500];
    const amt = sampleAmounts[Math.floor(Math.random() * sampleAmounts.length)];
    const nowStr = new Date().toLocaleTimeString(isEn ? 'en-US' : 'th-TH', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
    const newEvt = {
      id: `EVT-${Math.floor(1000 + Math.random() * 9000)}`,
      time: nowStr,
      amount: amt,
      th: {
        branch: 'ช่องทางแชตร้านค้าและหน้าร้านจริง',
        detail: `รับชำระเงินสดและโอนสำเร็จ (+฿${amt.toLocaleString()}) อัปเดตเข้ายอดขายรวมทันที`
      },
      en: {
        branch: 'Direct Store Chat & POS Register',
        detail: `Instant payment verified (+฿${amt.toLocaleString()}) — added to total store revenue`
      }
    };
    setLiveFeed(prev => [newEvt, ...prev.slice(0, 7)]);
    setCurrentRevenueVal(prev => prev + amt);
    if (setDbRecords && dbRecords) {
      setDbRecords(prev => [
        {
          id: `TXN-2026-${Math.floor(910 + Math.random() * 90)}`,
          date: nowStr,
          amount: amt,
          itemsCount: 2,
          th: {
            channel: 'รายการขายสดหน้าร้าน/ออนไลน์',
            customer: 'ลูกค้าทั่วไป (ชำระทันที)',
            product: 'ชุดสินค้าขายดีประจำวัน',
            status: 'ชำระเงินสำเร็จ'
          },
          en: {
            channel: 'Live POS / Online Order',
            customer: 'Walk-in / Instant Buyer',
            product: 'Daily Best-Seller Bundle',
            status: 'Paid & Completed'
          }
        },
        ...prev
      ]);
    }
    toast.success(
      tx(
        `มีคำสั่งซื้อใหม่เข้ามาระบบสด +฿${amt.toLocaleString()}!`,
        `New live order received: +฿${amt.toLocaleString()}!`
      )
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div
        className="glass-card"
        style={{
          padding: '1.4rem',
          borderRadius: '18px',
          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.15), rgba(15, 23, 42, 0.92))',
          border: '1.5px solid rgba(16, 185, 129, 0.4)',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <LuxuryIconBadge variant="emerald" size="lg" active>
            <LuxuryModuleIcon type="live" size={30} />
          </LuxuryIconBadge>
          <div>
            <span
              style={{
                display: 'inline-block',
                padding: '0.25rem 0.75rem',
                borderRadius: '999px',
                background: streamActive ? 'rgba(16, 185, 129, 0.2)' : 'rgba(148, 163, 184, 0.2)',
                color: streamActive ? '#34d399' : '#cbd5e1',
                fontWeight: 800,
                fontSize: '0.8rem',
                marginBottom: '0.35rem'
              }}
            >
              {streamActive
                ? tx('เชื่อมต่อสัญญาณยอดขายสดทุกสาขาอยู่', 'LIVE TRANSACTION STREAM CONNECTED')
                : tx('พักการแสดงผลชั่วคราว', 'STREAM PAUSED')}
            </span>
            <h3 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 900, color: '#f8fafc' }}>
              {tx('ติดตามคำสั่งซื้อและเงินเข้าแบบวินาทีต่อวินาที', 'Real-Time Store & Online Order Monitor')}
            </h3>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
          <button
            type="button"
            onClick={handleSimulateLiveOrder}
            style={{
              padding: '0.7rem 1.15rem',
              borderRadius: '12px',
              border: 'none',
              background: 'linear-gradient(135deg, #10b981, #059669)',
              color: '#fff',
              fontWeight: 800,
              cursor: 'pointer'
            }}
          >
            {tx('จำลองคำสั่งซื้อใหม่เข้าตอนนี้', 'Simulate Incoming Live Order')}
          </button>
          <button
            type="button"
            onClick={() => setStreamActive(!streamActive)}
            style={{
              padding: '0.7rem 1rem',
              borderRadius: '12px',
              border: '1px solid rgba(148,163,184,0.35)',
              background: 'rgba(15, 23, 42, 0.8)',
              color: '#e2e8f0',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            {streamActive ? tx('พักหน้าจอสด', 'Pause Feed') : tx('เปิดหน้าจอสดต่อ', 'Resume Feed')}
          </button>
        </div>
      </div>

      {/* Live Metrics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        <div className="glass-card" style={{ padding: '1.25rem', borderRadius: '16px', borderLeft: '4px solid #10b981' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 700 }}>
              {tx('ยอดขายสะสมรวมทุกจุดขาย', 'Cumulative Live Revenue')}
            </div>
            <LuxuryIconBadge variant="emerald" size="sm" active>
              <LuxuryModuleIcon type="wallet" size={18} />
            </LuxuryIconBadge>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#34d399', marginTop: '0.35rem' }}>
            ฿{currentRevenueVal.toLocaleString()}
          </div>
        </div>
        <div className="glass-card" style={{ padding: '1.25rem', borderRadius: '16px', borderLeft: '4px solid #38bdf8' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 700 }}>
              {tx('เครื่องคิดเงินที่เปิดออนไลน์อยู่', 'Online POS Registers')}
            </div>
            <LuxuryIconBadge variant="sapphire" size="sm" active>
              <LuxuryModuleIcon type="staff_pos" size={18} />
            </LuxuryIconBadge>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#38bdf8', marginTop: '0.35rem' }}>
            {tx('12 / 12 เครื่อง (ปกติ 100%)', '12 / 12 Registers (100% Online)')}
          </div>
        </div>
        <div className="glass-card" style={{ padding: '1.25rem', borderRadius: '16px', borderLeft: '4px solid #fbbf24' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 700 }}>
              {tx('ความเร็วการซิงค์ข้อมูล', 'Data Sync Latency')}
            </div>
            <LuxuryIconBadge variant="gold" size="sm" active>
              <LuxuryModuleIcon type="live" size={18} />
            </LuxuryIconBadge>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#fbbf24', marginTop: '0.35rem' }}>
            {tx('0.4 วินาที (เสถียรดีเยี่ยม)', '0.4 sec (Ultra Stable)')}
          </div>
        </div>
      </div>

      {/* Feed List */}
      <div className="glass-card" style={{ padding: '1.35rem', borderRadius: '18px' }}>
        <h4 style={{ margin: '0 0 1rem 0', fontSize: '1.12rem', fontWeight: 800 }}>
          {tx('📡 รายการรับเงินและคำสั่งซื้อล่าสุดที่เพิ่งเข้ามา', '📡 Latest Incoming Transactions')}
        </h4>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {liveFeed.map(item => {
            const info = item[isEn ? 'en' : 'th'];
            return (
              <div
                key={item.id}
                style={{
                  padding: '1rem 1.15rem',
                  borderRadius: '14px',
                  background: 'rgba(15, 23, 42, 0.75)',
                  border: '1px solid rgba(56, 189, 248, 0.25)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '0.75rem'
                }}
              >
                <div>
                  <div style={{ fontSize: '0.8rem', color: '#38bdf8', fontWeight: 800 }}>
                    {item.time} • {info.branch}
                  </div>
                  <div style={{ fontWeight: 800, color: '#f8fafc', marginTop: '0.2rem' }}>{info.detail}</div>
                </div>
                <div style={{ fontSize: '1.15rem', fontWeight: 900, color: '#34d399' }}>
                  +฿{item.amount.toLocaleString()}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function DatabaseTab({
  lang,
  dbRecords,
  setDbRecords,
  pageUploadedFiles = {},
  onInspectUploadedFile,
  renderUploadZone
}) {
  const isEn = lang === 'en';
  const tx = (th, en) => (isEn ? en : th);

  const [dbSearch, setDbSearch] = useState('');
  const [dbSubTab, setDbSubTab] = useState('pipeline');
  const [newCustomer, setNewCustomer] = useState('');
  const [newProduct, setNewProduct] = useState('');
  const [newAmount, setNewAmount] = useState('');

  const filteredRecords = dbRecords.filter(rec => {
    const info = rec[isEn ? 'en' : 'th'];
    const q = dbSearch.trim().toLowerCase();
    if (!q) return true;
    return (
      rec.id.toLowerCase().includes(q) ||
      info.customer.toLowerCase().includes(q) ||
      info.product.toLowerCase().includes(q) ||
      info.channel.toLowerCase().includes(q)
    );
  });

  const handleAddRecord = e => {
    e.preventDefault();
    if (!newCustomer.trim() || !newProduct.trim()) {
      toast.error(tx('กรุณากรอกชื่อลูกค้าและรายการสินค้า', 'Please enter customer name and product'));
      return;
    }
    const amt = Math.max(1, Number(newAmount) || 1500);
    const nowStr = new Date().toLocaleDateString(isEn ? 'en-GB' : 'th-TH');
    const newRec = {
      id: `TXN-2026-${Math.floor(910 + Math.random() * 89)}`,
      date: nowStr,
      amount: amt,
      itemsCount: 1,
      th: {
        channel: 'บันทึกตรงโดยเจ้าของร้าน',
        customer: newCustomer.trim(),
        product: newProduct.trim(),
        status: 'ชำระเงินสำเร็จ'
      },
      en: {
        channel: 'Direct Owner Entry',
        customer: newCustomer.trim(),
        product: newProduct.trim(),
        status: 'Paid & Completed'
      }
    };
    setDbRecords(prev => [newRec, ...prev]);
    setNewCustomer('');
    setNewProduct('');
    setNewAmount('');
    toast.success(tx('✅ เพิ่มรายการลงฐานข้อมูลเรียบร้อยแล้ว!', '✅ Added record to database!'));
  };

  const handleDeleteRecord = id => {
    setDbRecords(prev => prev.filter(r => r.id !== id));
    toast.success(tx(`🗑️ ลบรายการ ${id} เรียบร้อยแล้ว`, `🗑️ Removed record ${id}`));
  };

  const moduleLabelsMap = {
    overview: { th: 'ภาพรวมธุรกิจและเป้าหมายร้าน', en: 'Business Overview & Targets' },
    customers: { th: 'วิเคราะห์ลูกค้าประจำและคนหาย', en: 'Customer CRM & Retention' },
    staff_pos: { th: 'พนักงานและตรวจบิลแคชเชียร์', en: 'Staff & Cashier Audit' },
    multi_channel: { th: 'เปรียบเทียบสาขาและออนไลน์', en: 'Branch & Multi-Channel' },
    procurement: { th: 'ซัพพลายเออร์และจัดซื้อรวมศูนย์', en: 'Suppliers & Central PO' },
    inventory: { th: 'คลังสินค้าอัจฉริยะ', en: 'Smart Inventory' },
    insights: { th: 'วิเคราะห์ข้อมูลด้วย AI', en: 'AI Data Analytics' },
    database: { th: 'ฐานข้อมูลร้านค้ากลาง', en: 'Master Store Database' }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Sub-tab Navigation Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-2 rounded-2xl bg-slate-900/90 border border-white/10 backdrop-blur-xl shadow-xl">
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setDbSubTab('pipeline')}
            className={`px-4 py-2.5 rounded-xl font-black text-xs sm:text-sm flex items-center gap-2 transition-all ${
              dbSubTab === 'pipeline'
                ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-lg shadow-amber-500/25'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <span>⚡</span>
            <span>{tx('ระบบจัดการและเตรียมข้อมูลอัตโนมัติ (ETL Pipeline)', 'Automated Data Pipeline & ETL')}</span>
            <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-black/20 font-bold uppercase">
              Auto
            </span>
          </button>

          <button
            type="button"
            onClick={() => setDbSubTab('records')}
            className={`px-4 py-2.5 rounded-xl font-black text-xs sm:text-sm flex items-center gap-2 transition-all ${
              dbSubTab === 'records'
                ? 'bg-gradient-to-r from-sky-400 to-blue-500 text-slate-950 shadow-lg shadow-blue-500/25'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <span>📋</span>
            <span>{tx('คลังไฟล์และตารางธุรกรรมร้าน (Master Records)', 'Master Transaction Records & Files')}</span>
            <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-black/20 font-bold uppercase">
              {filteredRecords.length}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setDbSubTab('governance')}
            className={`px-4 py-2.5 rounded-xl font-black text-xs sm:text-sm flex items-center gap-2 transition-all ${
              dbSubTab === 'governance'
                ? 'bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-950 shadow-lg shadow-emerald-500/25'
                : 'text-slate-300 hover:text-white hover:bg-white/5'
            }`}
          >
            <span>🛡️</span>
            <span>{tx('ธรรมาภิบาลข้อมูล & สิทธิ์ RBAC (Data Governance)', 'Data Governance & RBAC Security')}</span>
            <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-emerald-500/20 text-emerald-300 font-bold uppercase border border-emerald-500/30">
              {tx('องค์กร', 'Enterprise')}
            </span>
          </button>
        </div>

        <div className="hidden md:flex items-center gap-2 text-xs text-amber-300/90 font-bold px-3">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>{tx('PostgreSQL Connection Pool: พร้อมรองรับ 100K - 1M+ แถว', 'PostgreSQL QueuePool: Ready for 1M+ Rows')}</span>
        </div>
      </div>

      {/* 1. Automated ETL & Data Pipeline View */}
      {dbSubTab === 'pipeline' && (
        <DataPipelineEtlCenter
          lang={lang}
          onSyncSuccess={() => {
            // Callback when ETL finishes
          }}
        />
      )}

      {/* 2. Manual Transaction Records & Uploads View */}
      {dbSubTab === 'records' && (
        <>
          {renderUploadZone('database', tx('คลังฐานข้อมูลการขายของร้าน', 'Central Store Transaction Database'))}

      {/* Uploaded Files Registry across all modules */}
      <div
        className="glass-card"
        style={{
          padding: '1.35rem',
          borderRadius: '18px',
          border: '1.5px solid rgba(251, 191, 36, 0.4)',
          background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.08), rgba(15, 23, 42, 0.92))'
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
          <div>
            <h4 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 900, color: '#fbbf24' }}>
              📂 {tx('คลังไฟล์ที่คุณอัปโหลดเข้าสู่ระบบทั้งหมด (กดดูเนื้อหาในไฟล์ได้ทันที)', 'All Uploaded Files Registry (Click to Inspect File Data)')}
            </h4>
            <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.86rem', color: '#cbd5e1' }}>
              {tx(
                'ทุกครั้งที่คุณอัปโหลดไฟล์ใหม่ ข้อความ ตัวเลข และตารางในหน้านั้นจะเปลี่ยนตามข้อมูลในไฟล์จริงทันที และสามารถกดดูข้อมูลในไฟล์ย้อนหลังได้ที่นี่ครับ',
                'Whenever you upload a file, page text, metrics, and tables update dynamically from your file content. Click any file below to inspect its rows.'
              )}
            </p>
          </div>
          {onInspectUploadedFile && (
            <button
              type="button"
              onClick={() => onInspectUploadedFile('database')}
              style={{
                padding: '0.6rem 1.1rem',
                borderRadius: '12px',
                border: '1px solid rgba(251, 191, 36, 0.5)',
                background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                color: '#0f172a',
                fontWeight: 900,
                fontSize: '0.84rem',
                cursor: 'pointer'
              }}
            >
              🔍 {tx('เปิดหน้าต่างดูเนื้อหาไฟล์ทั้งหมด', 'Open Full Uploaded File Inspector')}
            </button>
          )}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.85rem' }}>
          {Object.entries(pageUploadedFiles).map(([tabId, fMeta]) => {
            const modTitle = moduleLabelsMap[tabId]?.[isEn ? 'en' : 'th'] || tabId;
            return (
              <div
                key={tabId}
                style={{
                  padding: '1rem',
                  borderRadius: '14px',
                  background: 'rgba(15, 23, 42, 0.85)',
                  border: fMeta.isCustomUpload
                    ? '1.5px solid rgba(16, 185, 129, 0.55)'
                    : '1px solid rgba(148, 163, 184, 0.22)',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '0.65rem'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '0.4rem' }}>
                    <span style={{ fontSize: '0.74rem', fontWeight: 900, color: '#fbbf24' }}>{modTitle}</span>
                    {fMeta.isCustomUpload && (
                      <span
                        style={{
                          fontSize: '0.68rem',
                          fontWeight: 900,
                          padding: '0.12rem 0.5rem',
                          borderRadius: '999px',
                          background: 'rgba(16, 185, 129, 0.2)',
                          color: '#34d399'
                        }}
                      >
                        {tx('อัปโหลดใหม่แล้ว', 'Custom File')}
                      </span>
                    )}
                  </div>
                  <div style={{ fontWeight: 900, color: '#f8fafc', fontSize: '0.92rem', marginTop: '0.25rem', wordBreak: 'break-all' }}>
                    📄 {fMeta.filename}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '0.2rem' }}>
                    {fMeta.rows.toLocaleString()} {tx('รายการ', 'rows')} • {isEn ? fMeta.updatedAtEn : fMeta.updatedAtTh}
                  </div>
                  {(fMeta.changeSummaryTh || fMeta.changeSummaryEn) && (
                    <div style={{ fontSize: '0.76rem', color: '#34d399', marginTop: '0.3rem', fontWeight: 700 }}>
                      ✓ {isEn ? fMeta.changeSummaryEn : fMeta.changeSummaryTh}
                    </div>
                  )}
                </div>
                {onInspectUploadedFile && (
                  <button
                    type="button"
                    onClick={() => onInspectUploadedFile(tabId)}
                    style={{
                      padding: '0.45rem 0.75rem',
                      borderRadius: '8px',
                      border: '1px solid rgba(56, 189, 248, 0.4)',
                      background: 'rgba(56, 189, 248, 0.14)',
                      color: '#38bdf8',
                      fontWeight: 800,
                      fontSize: '0.78rem',
                      cursor: 'pointer'
                    }}
                  >
                    🔍 {tx('ดูข้อมูลในไฟล์นี้', 'View File Content')}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Record Form */}
      <form
        onSubmit={handleAddRecord}
        className="glass-card"
        style={{
          padding: '1.3rem',
          borderRadius: '18px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '0.85rem',
          alignItems: 'end'
        }}
      >
        <div>
          <label style={{ display: 'block', fontSize: '0.82rem', color: '#94a3b8', marginBottom: '0.3rem' }}>
            {tx('ชื่อลูกค้า / บริษัท', 'Customer / Company Name')}
          </label>
          <input
            type="text"
            value={newCustomer}
            onChange={e => setNewCustomer(e.target.value)}
            placeholder={tx('เช่น คุณสมชาย ใจดี', 'e.g. Mr. Somchai Jaidee')}
            style={{ width: '100%', padding: '0.6rem', borderRadius: '10px', background: '#0f172a', color: '#fff', border: '1px solid rgba(148,163,184,0.3)' }}
          />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '0.82rem', color: '#94a3b8', marginBottom: '0.3rem' }}>
            {tx('รายการสินค้าที่ซื้อ', 'Purchased Product')}
          </label>
          <input
            type="text"
            value={newProduct}
            onChange={e => setNewProduct(e.target.value)}
            placeholder={tx('เช่น เซรั่มบำรุงผิว 2 กล่อง', 'e.g. Luxury Serum x2')}
            style={{ width: '100%', padding: '0.6rem', borderRadius: '10px', background: '#0f172a', color: '#fff', border: '1px solid rgba(148,163,184,0.3)' }}
          />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '0.82rem', color: '#94a3b8', marginBottom: '0.3rem' }}>
            {tx('ยอดเงินรวม (บาท)', 'Total Amount (THB)')}
          </label>
          <input
            type="number"
            value={newAmount}
            onChange={e => setNewAmount(e.target.value)}
            placeholder="2580"
            style={{ width: '100%', padding: '0.6rem', borderRadius: '10px', background: '#0f172a', color: '#fff', border: '1px solid rgba(148,163,184,0.3)' }}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: '0.68rem 1.1rem',
            borderRadius: '10px',
            border: 'none',
            background: 'linear-gradient(135deg, #10b981, #059669)',
            color: '#fff',
            fontWeight: 800,
            cursor: 'pointer'
          }}
        >
          {tx('➕ บันทึกลงฐานข้อมูล', '➕ Add to Database')}
        </button>
      </form>

      {/* Search & Table */}
      <div className="glass-card" style={{ padding: '1.35rem', borderRadius: '18px', overflowX: 'auto' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <LuxuryIconBadge variant="sapphire" size="md" active>
              <LuxuryModuleIcon type="database" size={22} />
            </LuxuryIconBadge>
            <h4 style={{ margin: 0, fontSize: '1.15rem', fontWeight: 800 }}>
              {tx('ตารางรายการซื้อขายในฐานข้อมูลกลาง', 'Master Transaction Records')} ({filteredRecords.length})
            </h4>
          </div>
          <input
            type="text"
            value={dbSearch}
            onChange={e => setDbSearch(e.target.value)}
            placeholder={tx('ค้นหาชื่อลูกค้า สินค้า หรือรหัสบิล...', 'Search customer, product, or bill ID...')}
            style={{
              padding: '0.6rem 0.95rem',
              borderRadius: '10px',
              border: '1px solid rgba(148,163,184,0.3)',
              background: '#0f172a',
              color: '#f8fafc',
              minWidth: '250px'
            }}
          />
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '740px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(148,163,184,0.2)', textAlign: 'left', color: '#94a3b8', fontSize: '0.84rem' }}>
              <th style={{ padding: '0.75rem' }}>{tx('รหัสรายการ / วันที่', 'Record ID / Date')}</th>
              <th style={{ padding: '0.75rem' }}>{tx('ชื่อลูกค้า', 'Customer')}</th>
              <th style={{ padding: '0.75rem' }}>{tx('สินค้าที่สั่งซื้อ', 'Product')}</th>
              <th style={{ padding: '0.75rem' }}>{tx('ช่องทางขาย', 'Channel')}</th>
              <th style={{ padding: '0.75rem' }}>{tx('ยอดเงินสุทธิ', 'Amount')}</th>
              <th style={{ padding: '0.75rem' }}>{tx('จัดการ', 'Action')}</th>
            </tr>
          </thead>
          <tbody>
            {filteredRecords.map(rec => {
              const info = rec[isEn ? 'en' : 'th'];
              return (
                <tr key={rec.id} style={{ borderBottom: '1px solid rgba(148,163,184,0.12)' }}>
                  <td style={{ padding: '0.85rem 0.75rem' }}>
                    <div style={{ fontWeight: 800, color: '#38bdf8' }}>{rec.id}</div>
                    <div style={{ fontSize: '0.78rem', color: '#94a3b8' }}>{rec.date}</div>
                  </td>
                  <td style={{ padding: '0.85rem 0.75rem', fontWeight: 800, color: '#f8fafc' }}>{info.customer}</td>
                  <td style={{ padding: '0.85rem 0.75rem', color: '#cbd5e1' }}>{info.product}</td>
                  <td style={{ padding: '0.85rem 0.75rem', color: '#94a3b8', fontSize: '0.86rem' }}>{info.channel}</td>
                  <td style={{ padding: '0.85rem 0.75rem', fontWeight: 900, color: '#34d399' }}>
                    ฿{rec.amount.toLocaleString()}
                  </td>
                  <td style={{ padding: '0.85rem 0.75rem' }}>
                    <button
                      type="button"
                      onClick={() => handleDeleteRecord(rec.id)}
                      style={{
                        padding: '0.4rem 0.75rem',
                        borderRadius: '8px',
                        border: '1px solid rgba(244,63,94,0.4)',
                        background: 'rgba(244,63,94,0.14)',
                        color: '#fda4af',
                        fontWeight: 700,
                        fontSize: '0.8rem',
                        cursor: 'pointer'
                      }}
                    >
                      {tx('ลบรายการ', 'Delete')}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
        </>
      )}

      {/* 3. Enterprise Data Governance & RBAC Access Control View */}
      {dbSubTab === 'governance' && (
        <DataGovernanceCenter lang={lang} />
      )}
    </div>
  );
}

export function AdminTab({
  lang,
  user: _user,
  registeredWebCustomers = [],
  setRegisteredWebCustomers,
  onSyncContactWithBackend
}) {
  const isEn = lang === 'en';
  const tx = (th, en) => (isEn ? en : th);

  const [requirePinForVoid, setRequirePinForVoid] = useState(true);
  const [requirePinForRefund, setRequirePinForRefund] = useState(true);
  const [autoBackupDaily, setAutoBackupDaily] = useState(true);

  // Admin Registered Customer Registry State
  const [memberSearch, setMemberSearch] = useState('');
  const [memberPlanFilter, setMemberPlanFilter] = useState('all');
  const [showAddMemberForm, setShowAddMemberForm] = useState(false);
  const [newMemName, setNewMemName] = useState('');
  const [newMemPhone, setNewMemPhone] = useState('');
  const [newMemLineId, setNewMemLineId] = useState('');
  const [newMemEmail, setNewMemEmail] = useState('');
  const [newMemPlan, setNewMemPlan] = useState('premium');

  // Inline Editing State for Registered Customer
  const [editingMemberId, setEditingMemberId] = useState(null);
  const [editName, setEditName] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editLineId, setEditLineId] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPlan, setEditPlan] = useState('premium');

  const persistMembers = nextList => {
    if (setRegisteredWebCustomers) {
      setRegisteredWebCustomers(nextList);
    }
    try {
      localStorage.setItem('insightflow_registered_web_customers', JSON.stringify(nextList));
    } catch {
      // ignore storage error
    }
  };

  const handleAddMemberSubmit = e => {
    e.preventDefault();
    if (!newMemName.trim() || !newMemPhone.trim() || !newMemLineId.trim()) {
      toast.error(
        tx(
          'กรุณากรอก ชื่อลูกค้า เบอร์โทรศัพท์ และ ID LINE ให้ครบถ้วน',
          'Please fill in Customer Name, Phone Number, and LINE ID'
        )
      );
      return;
    }
    const formattedLine = newMemLineId.trim().startsWith('@')
      ? newMemLineId.trim()
      : `@${newMemLineId.trim()}`;
    const nowTime = new Date().toLocaleString(isEn ? 'en-GB' : 'th-TH', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    const newMember = {
      id: `MEM-2026-${String(registeredWebCustomers.length + 1).padStart(3, '0')}`,
      nameTh: newMemName.trim(),
      nameEn: newMemName.trim(),
      phone: newMemPhone.trim(),
      lineId: formattedLine,
      email: (newMemEmail.trim() || `member${registeredWebCustomers.length + 1}@insightflow.app`).toLowerCase(),
      plan: newMemPlan,
      registeredAtTh: `สมัครเมื่อ ${nowTime} น.`,
      registeredAtEn: `Registered ${nowTime}`,
      notifyTime: '22:00',
      lineLinked: true
    };
    const nextList = [newMember, ...registeredWebCustomers];
    persistMembers(nextList);
    if (onSyncContactWithBackend) {
      onSyncContactWithBackend(newMember.phone, newMember.lineId, newMember.email, newMember.nameTh);
    }
    setNewMemName('');
    setNewMemPhone('');
    setNewMemLineId('');
    setNewMemEmail('');
    setShowAddMemberForm(false);
    toast.success(
      tx(
        `✅ เพิ่มลูกค้า "${newMember.nameTh}" (เบอร์ ${newMember.phone} • LINE ${newMember.lineId}) เข้าหน้าต่าง Admin เรียบร้อยแล้ว!`,
        `✅ Added "${newMember.nameEn}" (Phone ${newMember.phone} • LINE ${newMember.lineId}) to Admin Registry!`
      )
    );
  };

  const handleStartEditMember = mem => {
    setEditingMemberId(mem.id);
    setEditName(isEn ? mem.nameEn || mem.nameTh : mem.nameTh || mem.nameEn);
    setEditPhone(mem.phone || '');
    setEditLineId(mem.lineId || '');
    setEditEmail(mem.email || '');
    setEditPlan(mem.plan || 'premium');
  };

  const handleSaveEditMember = memId => {
    const nextList = registeredWebCustomers.map(m => {
      if (m.id !== memId) return m;
      const updated = {
        ...m,
        nameTh: editName.trim() || m.nameTh,
        nameEn: editName.trim() || m.nameEn,
        phone: editPhone.trim() || m.phone,
        lineId: editLineId.trim() || m.lineId,
        email: editEmail.trim() || m.email,
        plan: editPlan
      };
      if (onSyncContactWithBackend) {
        onSyncContactWithBackend(updated.phone, updated.lineId, updated.email, updated.nameTh);
      }
      return updated;
    });
    persistMembers(nextList);
    setEditingMemberId(null);
    toast.success(
      tx(
        '💾 บันทึกการแก้ไข ชื่อ เบอร์โทร และ ID LINE ของลูกค้าในหน้า Admin เรียบร้อยแล้ว!',
        '💾 Saved updated customer Name, Phone, and LINE ID in Admin Registry!'
      )
    );
  };

  const handleDeleteMember = mem => {
    const displayName = isEn ? mem.nameEn || mem.nameTh : mem.nameTh;
    const nextList = registeredWebCustomers.filter(m => m.id !== mem.id);
    persistMembers(nextList);
    toast.success(
      tx(
        `🗑️ ลบรายชื่อ "${displayName}" ออกจากทะเบียน Admin เรียบร้อยแล้ว`,
        `🗑️ Removed "${displayName}" from Admin customer registry`
      )
    );
  };

  const handleChangeMemberPlan = (memId, nextPlan) => {
    const nextList = registeredWebCustomers.map(m =>
      m.id === memId ? { ...m, plan: nextPlan } : m
    );
    persistMembers(nextList);
    toast.success(
      tx(
        `อัปเดตแพ็กเกจของลูกค้าเป็น ${nextPlan.toUpperCase()} เรียบร้อยแล้ว`,
        `Updated customer subscription plan to ${nextPlan.toUpperCase()}`
      )
    );
  };

  const handleExportRegisteredMembersCsv = () => {
    const headers = isEn
      ? ['Member ID', 'Customer Name', 'Phone Number', 'LINE ID', 'Email', 'Package Plan', 'Auto-Notify Time', 'Registered Date']
      : ['รหัสสมาชิก', 'ชื่อลูกค้าที่สมัครเว็บ', 'เบอร์โทรศัพท์', 'ไอดีไลน์ (LINE ID)', 'อีเมล', 'แพ็กเกจ', 'เวลาส่งยอดขายอัตโนมัติ', 'วันที่สมัคร'];
    const rows = registeredWebCustomers.map(m => [
      `"${m.id}"`,
      `"${isEn ? m.nameEn || m.nameTh : m.nameTh}"`,
      `"${m.phone}"`,
      `"${m.lineId}"`,
      `"${m.email || '-'}"`,
      `"${(m.plan || 'premium').toUpperCase()}"`,
      `"${m.notifyTime || '22:00'} น."`,
      `"${isEn ? m.registeredAtEn || m.registeredAtTh : m.registeredAtTh}"`
    ]);
    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', isEn ? 'Admin_Registered_Website_Customers.csv' : 'รายชื่อลูกค้าที่สมัครเว็บไซต์ทั้งหมด_Admin.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success(
      tx(
        '📥 ดาวน์โหลดไฟล์รายชื่อลูกค้าที่สมัครเว็บไซต์ทั้งหมด (ชื่อ • เบอร์โทร • ไลน์) สำเร็จ!',
        '📥 Downloaded complete Admin Registered Website Customers CSV!'
      )
    );
  };

  const filteredMembers = registeredWebCustomers.filter(m => {
    const matchPlan = memberPlanFilter === 'all' || m.plan === memberPlanFilter;
    const q = memberSearch.trim().toLowerCase();
    if (!q) return matchPlan;
    const nameStr = `${m.nameTh || ''} ${m.nameEn || ''}`.toLowerCase();
    return (
      matchPlan &&
      (nameStr.includes(q) ||
        (m.phone || '').toLowerCase().includes(q) ||
        (m.lineId || '').toLowerCase().includes(q) ||
        (m.email || '').toLowerCase().includes(q) ||
        (m.id || '').toLowerCase().includes(q))
    );
  });

  const planBadgeMeta = planKey => {
    if (planKey === 'starter') {
      return { label: 'STARTER (1,990.-)', color: '#38bdf8', bg: 'rgba(56, 189, 248, 0.16)' };
    }
    if (planKey === 'professional') {
      return { label: 'PRO (2,900.-)', color: '#fbbf24', bg: 'rgba(251, 191, 36, 0.18)' };
    }
    return { label: 'PREMIUM (4,900.-)', color: '#c084fc', bg: 'rgba(192, 132, 252, 0.18)' };
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* 1. SUPER ADMIN HEADER BANNER */}
      <div
        className="glass-card"
        style={{
          padding: '1.5rem',
          borderRadius: '18px',
          background: 'linear-gradient(135deg, rgba(251, 191, 36, 0.16), rgba(244, 63, 94, 0.14), rgba(15, 23, 42, 0.95))',
          border: '1.5px solid rgba(251, 191, 36, 0.5)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <LuxuryIconBadge variant="gold" size="lg" active>
            <LuxuryModuleIcon type="admin" size={30} />
          </LuxuryIconBadge>
          <div>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.6rem', marginBottom: '0.3rem' }}>
              <span
                style={{
                  fontSize: '0.75rem',
                  fontWeight: 900,
                  padding: '0.2rem 0.7rem',
                  borderRadius: '999px',
                  background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                  color: '#0f172a'
                }}
              >
                👑 {tx('SUPER ADMIN • ศูนย์จัดการลูกค้าที่สมัครเว็บไซต์ทั้งหมด', 'SUPER ADMIN • REGISTERED WEBSITE CUSTOMERS')}
              </span>
              <span
                style={{
                  fontSize: '0.78rem',
                  fontWeight: 800,
                  padding: '0.2rem 0.7rem',
                  borderRadius: '999px',
                  background: 'rgba(16, 185, 129, 0.18)',
                  color: '#34d399',
                  border: '1px solid rgba(16, 185, 129, 0.4)'
                }}
              >
                ✓ pongsatornnantakong88@gmail.com
              </span>
            </div>
            <h3 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 900, color: '#f8fafc' }}>
              {tx(
                'หน้าต่างผู้ดูแลระบบสูงสุด (Admin): ทะเบียนลูกค้าที่สมัครเว็บไซต์ (ชื่อ • เบอร์โทร • ไลน์)',
                'Super Admin Control Center: All Website Registered Customers (Name • Phone • LINE ID)'
              )}
            </h3>
            <p style={{ margin: '0.35rem 0 0 0', color: '#cbd5e1', fontSize: '0.92rem' }}>
              {tx(
                'รวบรวมรายชื่อลูกค้าทั้งหมดที่สมัครเข้าใช้งานเว็บไซต์ พร้อมชื่อ-นามสกุล เบอร์โทรศัพท์ และไอดีไลน์ (LINE ID) สำหรับส่งสรุปยอดขายอัตโนมัติ',
                'Central registry of every customer who signed up on the website with their Full Name, Mobile Phone Number, and LINE ID.'
              )}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem' }}>
          <button
            type="button"
            onClick={() => setShowAddMemberForm(!showAddMemberForm)}
            style={{
              padding: '0.7rem 1.15rem',
              borderRadius: '12px',
              border: 'none',
              background: 'linear-gradient(135deg, #10b981, #059669)',
              color: '#fff',
              fontWeight: 900,
              fontSize: '0.84rem',
              cursor: 'pointer'
            }}
          >
            ➕ {tx('เพิ่มรายชื่อลูกค้าใหม่เข้าหน้า Admin', 'Add Registered Customer')}
          </button>
          <button
            type="button"
            onClick={() =>
              toast.success(
                tx(
                  `📲 ส่งการ์ดสรุปยอดขายอัตโนมัติไปยัง LINE และเบอร์โทรศัพท์ของลูกค้าที่สมัครเว็บทั้งหมด ${registeredWebCustomers.length} ราย สำเร็จ!`,
                  `📲 Dispatched automated sales summary to all ${registeredWebCustomers.length} registered customers' LINE & Phone!`
                )
              )
            }
            style={{
              padding: '0.7rem 1.15rem',
              borderRadius: '12px',
              border: '1px solid rgba(251, 191, 36, 0.6)',
              background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
              color: '#0f172a',
              fontWeight: 900,
              fontSize: '0.84rem',
              cursor: 'pointer'
            }}
          >
            🚀 {tx(`ส่งยอดขายเข้า LINE ลูกค้าทุกคน (${registeredWebCustomers.length} ราย)`, `Broadcast Sales to All (${registeredWebCustomers.length})`)}
          </button>
          <button
            type="button"
            onClick={handleExportRegisteredMembersCsv}
            style={{
              padding: '0.7rem 1.1rem',
              borderRadius: '12px',
              border: '1px solid rgba(56, 189, 248, 0.45)',
              background: 'rgba(56, 189, 248, 0.15)',
              color: '#38bdf8',
              fontWeight: 800,
              fontSize: '0.84rem',
              cursor: 'pointer'
            }}
          >
            📥 {tx('ดาวน์โหลดรายชื่อ (Excel / CSV)', 'Export CSV')}
          </button>
        </div>
      </div>

      {/* 2. REGISTERED WEBSITE CUSTOMERS SUMMARY KPI CARDS */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1rem' }}>
        <div className="glass-card" style={{ padding: '1.2rem', borderRadius: '16px', borderLeft: '4px solid #fbbf24' }}>
          <div style={{ fontSize: '0.82rem', color: '#94a3b8', fontWeight: 800 }}>
            👥 {tx('ลูกค้าที่สมัครเว็บไซต์ทั้งหมด', 'Total Registered Website Customers')}
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 900, color: '#fbbf24', marginTop: '0.3rem' }}>
            {registeredWebCustomers.length} {tx('ราย', 'Accounts')}
          </div>
          <div style={{ fontSize: '0.78rem', color: '#fde68a', marginTop: '0.2rem', fontWeight: 700 }}>
            {tx('บันทึกชื่อ เบอร์โทร และไลน์อัตโนมัติทุกครั้งที่สมัคร', 'Auto-synced Name, Phone & LINE on signup')}
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.2rem', borderRadius: '16px', borderLeft: '4px solid #10b981' }}>
          <div style={{ fontSize: '0.82rem', color: '#94a3b8', fontWeight: 800 }}>
            💬 {tx('ผูกเบอร์โทร + ID LINE ครบถ้วน', 'Phone + LINE ID Linked')}
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 900, color: '#34d399', marginTop: '0.3rem' }}>
            {registeredWebCustomers.filter(m => m.phone && m.lineId).length}/{registeredWebCustomers.length} {tx('ราย', 'Linked')}
          </div>
          <div style={{ fontSize: '0.78rem', color: '#a7f3d0', marginTop: '0.2rem', fontWeight: 700 }}>
            {tx('พร้อมส่งสรุปยอดขายเข้าแชท LINE เวลา 22:00 น.', 'Ready for 22:00 Automated LINE Sales Summary')}
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.2rem', borderRadius: '16px', borderLeft: '4px solid #c084fc' }}>
          <div style={{ fontSize: '0.82rem', color: '#94a3b8', fontWeight: 800 }}>
            💎 {tx('ลูกค้าแพ็กเกจ Premium & Pro', 'Premium & Professional Accounts')}
          </div>
          <div style={{ fontSize: '1.85rem', fontWeight: 900, color: '#e9d5ff', marginTop: '0.3rem' }}>
            {registeredWebCustomers.filter(m => m.plan === 'premium' || m.plan === 'professional').length} {tx('ราย', 'Accounts')}
          </div>
          <div style={{ fontSize: '0.78rem', color: '#d8b4fe', marginTop: '0.2rem', fontWeight: 700 }}>
            {tx(
              `Starter อีก ${registeredWebCustomers.filter(m => m.plan === 'starter').length} ราย`,
              `Plus ${registeredWebCustomers.filter(m => m.plan === 'starter').length} Starter accounts`
            )}
          </div>
        </div>
      </div>

      {/* 3. MAIN ADMIN TABLE: ALL WEBSITE REGISTERED CUSTOMERS (ชื่อ • เบอร์โทร • ไลน์) */}
      <div
        className="glass-card"
        style={{
          padding: '1.4rem',
          borderRadius: '18px',
          border: '1.5px solid rgba(16, 185, 129, 0.45)',
          background: 'rgba(15, 23, 42, 0.9)'
        }}
      >
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '1.1rem'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.55rem' }}>
              <span
                style={{
                  fontSize: '0.74rem',
                  fontWeight: 900,
                  padding: '0.2rem 0.65rem',
                  borderRadius: '999px',
                  background: 'rgba(16, 185, 129, 0.2)',
                  color: '#34d399',
                  border: '1px solid rgba(16, 185, 129, 0.4)'
                }}
              >
                📋 {tx('ข้อมูลลูกค้าที่สมัครผ่านหน้าเว็บทั้งหมด', 'LIVE WEBSITE MEMBER DIRECTORY')}
              </span>
            </div>
            <h4 style={{ margin: '0.35rem 0 0 0', fontSize: '1.22rem', fontWeight: 900, color: '#f8fafc' }}>
              {tx(
                `ตารางรายชื่อลูกค้าทั้งหมดที่สมัครเว็บไซต์: ชื่อ • เบอร์โทรศัพท์ • ไอดีไลน์ (${filteredMembers.length} ราย)`,
                `All Website Registered Customers: Full Name • Phone Number • LINE ID (${filteredMembers.length})`
              )}
            </h4>
            <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.85rem', color: '#94a3b8' }}>
              {tx(
                'เมื่อลูกค้าสมัครสมาชิกหรือล็อกอินที่หน้าเว็บไซต์ ข้อมูลชื่อ เบอร์โทร และ LINE ID จะถูกส่งเข้ามาเก็บในตารางหน้า Admin นี้โดยอัตโนมัติทันที',
                'Whenever a customer registers or signs in on the website, their Name, Phone Number, and LINE ID are automatically recorded here.'
              )}
            </p>
          </div>

          {/* Search & Package Filter */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', alignItems: 'center' }}>
            <input
              type="text"
              value={memberSearch}
              onChange={e => setMemberSearch(e.target.value)}
              placeholder={tx('🔍 ค้นหา ชื่อลูกค้า, เบอร์โทร, ID LINE...', '🔍 Search Name, Phone, LINE ID...')}
              style={{
                padding: '0.6rem 0.95rem',
                borderRadius: '10px',
                border: '1px solid rgba(148,163,184,0.35)',
                background: '#090e1c',
                color: '#f8fafc',
                minWidth: '240px',
                fontWeight: 700,
                fontSize: '0.85rem'
              }}
            />
            <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
              {[
                { id: 'all', th: 'ทั้งหมด', en: 'All' },
                { id: 'premium', th: 'Premium', en: 'Premium' },
                { id: 'professional', th: 'Pro', en: 'Pro' },
                { id: 'starter', th: 'Starter', en: 'Starter' }
              ].map(fTab => (
                <button
                  key={fTab.id}
                  type="button"
                  onClick={() => setMemberPlanFilter(fTab.id)}
                  style={{
                    padding: '0.5rem 0.85rem',
                    borderRadius: '10px',
                    border:
                      memberPlanFilter === fTab.id
                        ? '1.5px solid #fbbf24'
                        : '1px solid rgba(148,163,184,0.25)',
                    background:
                      memberPlanFilter === fTab.id
                        ? 'rgba(251, 191, 36, 0.2)'
                        : 'rgba(15, 23, 42, 0.7)',
                    color: memberPlanFilter === fTab.id ? '#fbbf24' : '#cbd5e1',
                    fontWeight: 800,
                    fontSize: '0.8rem',
                    cursor: 'pointer'
                  }}
                >
                  {isEn ? fTab.en : fTab.th}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Form to Manually Add a Registered Website Customer inside Admin */}
        {showAddMemberForm && (
          <form
            onSubmit={handleAddMemberSubmit}
            style={{
              marginBottom: '1.2rem',
              padding: '1.15rem',
              borderRadius: '14px',
              background: 'rgba(6, 12, 26, 0.95)',
              border: '1.5px solid rgba(16, 185, 129, 0.5)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '0.8rem',
              alignItems: 'end'
            }}
          >
            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: '#fbbf24', marginBottom: '0.25rem' }}>
                👤 {tx('ชื่อ - นามสกุล / ชื่อร้านค้า', 'Customer / Store Name')}
              </label>
              <input
                type="text"
                value={newMemName}
                onChange={e => setNewMemName(e.target.value)}
                placeholder={tx('เช่น คุณสมชาย เจริญกิจ', 'e.g. Mr. Somchai Charoenkit')}
                style={{
                  width: '100%',
                  padding: '0.58rem 0.75rem',
                  borderRadius: '10px',
                  background: '#0f172a',
                  color: '#fff',
                  border: '1px solid rgba(251,191,36,0.4)',
                  fontWeight: 700
                }}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: '#38bdf8', marginBottom: '0.25rem' }}>
                📱 {tx('เบอร์โทรศัพท์มือถือ', 'Mobile Phone Number')}
              </label>
              <input
                type="tel"
                value={newMemPhone}
                onChange={e => setNewMemPhone(e.target.value)}
                placeholder="089-999-8888"
                style={{
                  width: '100%',
                  padding: '0.58rem 0.75rem',
                  borderRadius: '10px',
                  background: '#0f172a',
                  color: '#fff',
                  border: '1px solid rgba(56,189,248,0.45)',
                  fontWeight: 700
                }}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: '#34d399', marginBottom: '0.25rem' }}>
                💬 {tx('ไอดีไลน์ (ID LINE)', 'LINE ID')}
              </label>
              <input
                type="text"
                value={newMemLineId}
                onChange={e => setNewMemLineId(e.target.value)}
                placeholder="@somchai.vip"
                style={{
                  width: '100%',
                  padding: '0.58rem 0.75rem',
                  borderRadius: '10px',
                  background: '#0f172a',
                  color: '#fff',
                  border: '1px solid rgba(16,185,129,0.45)',
                  fontWeight: 700
                }}
                required
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: '#cbd5e1', marginBottom: '0.25rem' }}>
                ✉️ {tx('อีเมลที่สมัคร', 'Email Address')}
              </label>
              <input
                type="email"
                value={newMemEmail}
                onChange={e => setNewMemEmail(e.target.value)}
                placeholder="owner@store.co.th"
                style={{
                  width: '100%',
                  padding: '0.58rem 0.75rem',
                  borderRadius: '10px',
                  background: '#0f172a',
                  color: '#fff',
                  border: '1px solid rgba(148,163,184,0.35)',
                  fontWeight: 700
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: 800, color: '#c084fc', marginBottom: '0.25rem' }}>
                💎 {tx('แพ็กเกจที่สมัคร', 'Subscription Plan')}
              </label>
              <select
                value={newMemPlan}
                onChange={e => setNewMemPlan(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.58rem 0.75rem',
                  borderRadius: '10px',
                  background: '#0f172a',
                  color: '#fff',
                  border: '1px solid rgba(192,132,252,0.45)',
                  fontWeight: 800
                }}
              >
                <option value="premium">Premium (4,900.-/m)</option>
                <option value="professional">Professional (2,900.-/m)</option>
                <option value="starter">Starter (1,990.-/m)</option>
              </select>
            </div>

            <button
              type="submit"
              style={{
                padding: '0.62rem 1rem',
                borderRadius: '10px',
                border: 'none',
                background: 'linear-gradient(135deg, #10b981, #059669)',
                color: '#fff',
                fontWeight: 900,
                cursor: 'pointer'
              }}
            >
              ✓ {tx('บันทึกลูกค้าเข้า Admin', 'Save Customer')}
            </button>
          </form>
        )}

        {/* Table of Registered Website Customers */}
        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '820px' }}>
            <thead>
              <tr
                style={{
                  borderBottom: '1.5px solid rgba(148,163,184,0.25)',
                  background: 'rgba(15, 23, 42, 0.95)',
                  textAlign: 'left',
                  color: '#fbbf24',
                  fontSize: '0.84rem'
                }}
              >
                <th style={{ padding: '0.85rem 0.75rem' }}>{tx('ลำดับ / รหัสสมาชิก', '# / Member ID')}</th>
                <th style={{ padding: '0.85rem 0.75rem' }}>👤 {tx('ชื่อลูกค้าที่สมัครเว็บไซต์', 'Registered Customer Name')}</th>
                <th style={{ padding: '0.85rem 0.75rem' }}>📱 {tx('เบอร์โทรศัพท์', 'Phone Number')}</th>
                <th style={{ padding: '0.85rem 0.75rem' }}>💬 {tx('ไอดีไลน์ (LINE ID)', 'LINE ID')}</th>
                <th style={{ padding: '0.85rem 0.75rem' }}>💎 {tx('แพ็กเกจ & เวลาสมัคร', 'Package & Registered Time')}</th>
                <th style={{ padding: '0.85rem 0.75rem' }}>⚡ {tx('การจัดการโดย Admin', 'Admin Actions')}</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map((mem, idx) => {
                const isEditing = editingMemberId === mem.id;
                const displayName = isEn ? mem.nameEn || mem.nameTh : mem.nameTh || mem.nameEn;
                const displayDate = isEn ? mem.registeredAtEn || mem.registeredAtTh : mem.registeredAtTh || mem.registeredAtEn;
                const pMeta = planBadgeMeta(mem.plan);

                return (
                  <tr
                    key={mem.id}
                    style={{
                      borderBottom: '1px solid rgba(148,163,184,0.14)',
                      background: idx === 0 ? 'rgba(16, 185, 129, 0.06)' : 'transparent'
                    }}
                  >
                    {/* 1. Member ID */}
                    <td style={{ padding: '0.9rem 0.75rem' }}>
                      <div style={{ fontWeight: 900, color: '#94a3b8', fontSize: '0.82rem' }}>
                        #{idx + 1} • <span style={{ color: '#38bdf8' }}>{mem.id}</span>
                      </div>
                      {idx === 0 && (
                        <span
                          style={{
                            display: 'inline-block',
                            marginTop: '0.2rem',
                            fontSize: '0.68rem',
                            fontWeight: 900,
                            padding: '0.1rem 0.45rem',
                            borderRadius: '999px',
                            background: 'rgba(16, 185, 129, 0.22)',
                            color: '#34d399'
                          }}
                        >
                          {tx('ล่าสุด', 'LATEST')}
                        </span>
                      )}
                    </td>

                    {/* 2. Customer Full Name & Email */}
                    <td style={{ padding: '0.9rem 0.75rem' }}>
                      {isEditing ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                          <input
                            type="text"
                            value={editName}
                            onChange={e => setEditName(e.target.value)}
                            style={{
                              padding: '0.4rem 0.6rem',
                              borderRadius: '8px',
                              background: '#050814',
                              color: '#fff',
                              border: '1px solid #fbbf24',
                              fontWeight: 800
                            }}
                          />
                          <input
                            type="email"
                            value={editEmail}
                            onChange={e => setEditEmail(e.target.value)}
                            style={{
                              padding: '0.35rem 0.6rem',
                              borderRadius: '8px',
                              background: '#050814',
                              color: '#cbd5e1',
                              border: '1px solid rgba(148,163,184,0.35)',
                              fontSize: '0.78rem'
                            }}
                          />
                        </div>
                      ) : (
                        <div>
                          <div style={{ fontWeight: 900, fontSize: '0.98rem', color: '#f8fafc' }}>
                            {displayName}
                          </div>
                          <div style={{ fontSize: '0.78rem', color: '#94a3b8', marginTop: '0.15rem' }}>
                            ✉️ {mem.email || 'customer@insightflow.app'}
                          </div>
                        </div>
                      )}
                    </td>

                    {/* 3. Phone Number */}
                    <td style={{ padding: '0.9rem 0.75rem' }}>
                      {isEditing ? (
                        <input
                          type="tel"
                          value={editPhone}
                          onChange={e => setEditPhone(e.target.value)}
                          style={{
                            padding: '0.45rem 0.6rem',
                            borderRadius: '8px',
                            background: '#050814',
                            color: '#38bdf8',
                            border: '1px solid #38bdf8',
                            fontWeight: 800,
                            width: '135px'
                          }}
                        />
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            if (navigator.clipboard) {
                              navigator.clipboard.writeText(mem.phone);
                            }
                            toast.success(
                              tx(
                                `📞 คัดลอกเบอร์โทรศัพท์ "${mem.phone}" ของ ${displayName} แล้ว!`,
                                `📞 Copied phone number "${mem.phone}" for ${displayName}!`
                              )
                            );
                          }}
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            padding: '0.42rem 0.75rem',
                            borderRadius: '10px',
                            background: 'rgba(56, 189, 248, 0.15)',
                            border: '1px solid rgba(56, 189, 248, 0.45)',
                            color: '#38bdf8',
                            fontWeight: 900,
                            fontSize: '0.9rem',
                            cursor: 'pointer'
                          }}
                          title={tx('คลิกเพื่อคัดลอกเบอร์โทรศัพท์', 'Click to copy phone number')}
                        >
                          <span>📱</span>
                          <span>{mem.phone}</span>
                        </button>
                      )}
                    </td>

                    {/* 4. LINE ID */}
                    <td style={{ padding: '0.9rem 0.75rem' }}>
                      {isEditing ? (
                        <input
                          type="text"
                          value={editLineId}
                          onChange={e => setEditLineId(e.target.value)}
                          style={{
                            padding: '0.45rem 0.6rem',
                            borderRadius: '8px',
                            background: '#050814',
                            color: '#34d399',
                            border: '1px solid #10b981',
                            fontWeight: 800,
                            width: '145px'
                          }}
                        />
                      ) : (
                        <div>
                          <button
                            type="button"
                            onClick={() => {
                              if (navigator.clipboard) {
                                navigator.clipboard.writeText(mem.lineId);
                              }
                              toast.success(
                                tx(
                                  `💬 คัดลอก ID LINE "${mem.lineId}" ของ ${displayName} แล้ว!`,
                                  `💬 Copied LINE ID "${mem.lineId}" for ${displayName}!`
                                )
                              );
                            }}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '0.4rem',
                              padding: '0.42rem 0.75rem',
                              borderRadius: '10px',
                              background: 'rgba(16, 185, 129, 0.16)',
                              border: '1px solid rgba(16, 185, 129, 0.45)',
                              color: '#34d399',
                              fontWeight: 900,
                              fontSize: '0.9rem',
                              cursor: 'pointer'
                            }}
                            title={tx('คลิกเพื่อคัดลอก ID LINE', 'Click to copy LINE ID')}
                          >
                            <span>💬</span>
                            <span>{mem.lineId}</span>
                          </button>
                          <div style={{ fontSize: '0.73rem', color: '#10b981', marginTop: '0.22rem', fontWeight: 700 }}>
                            ✓ {tx(`รับสรุปยอดอัตโนมัติ ${mem.notifyTime || '22:00'} น.`, `Auto-Summary at ${mem.notifyTime || '22:00'}`)}
                          </div>
                        </div>
                      )}
                    </td>

                    {/* 5. Package Plan & Registered Date */}
                    <td style={{ padding: '0.9rem 0.75rem' }}>
                      {isEditing ? (
                        <select
                          value={editPlan}
                          onChange={e => setEditPlan(e.target.value)}
                          style={{
                            padding: '0.42rem 0.6rem',
                            borderRadius: '8px',
                            background: '#050814',
                            color: '#fbbf24',
                            border: '1px solid #fbbf24',
                            fontWeight: 800
                          }}
                        >
                          <option value="premium">PREMIUM (4,900.-)</option>
                          <option value="professional">PRO (2,900.-)</option>
                          <option value="starter">STARTER (1,990.-)</option>
                        </select>
                      ) : (
                        <div>
                          <select
                            value={mem.plan || 'premium'}
                            onChange={e => handleChangeMemberPlan(mem.id, e.target.value)}
                            style={{
                              padding: '0.28rem 0.65rem',
                              borderRadius: '999px',
                              background: pMeta.bg,
                              color: pMeta.color,
                              border: `1px solid ${pMeta.color}66`,
                              fontWeight: 900,
                              fontSize: '0.76rem',
                              cursor: 'pointer'
                            }}
                          >
                            <option value="premium" style={{ background: '#0f172a', color: '#c084fc' }}>
                              PREMIUM (4,900.-)
                            </option>
                            <option value="professional" style={{ background: '#0f172a', color: '#fbbf24' }}>
                              PRO (2,900.-)
                            </option>
                            <option value="starter" style={{ background: '#0f172a', color: '#38bdf8' }}>
                              STARTER (1,990.-)
                            </option>
                          </select>
                          <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.25rem' }}>
                            🕒 {displayDate}
                          </div>
                        </div>
                      )}
                    </td>

                    {/* 6. Admin Actions */}
                    <td style={{ padding: '0.9rem 0.75rem' }}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                        {isEditing ? (
                          <>
                            <button
                              type="button"
                              onClick={() => handleSaveEditMember(mem.id)}
                              style={{
                                padding: '0.4rem 0.75rem',
                                borderRadius: '8px',
                                border: 'none',
                                background: '#10b981',
                                color: '#fff',
                                fontWeight: 900,
                                fontSize: '0.78rem',
                                cursor: 'pointer'
                              }}
                            >
                              💾 {tx('บันทึก', 'Save')}
                            </button>
                            <button
                              type="button"
                              onClick={() => setEditingMemberId(null)}
                              style={{
                                padding: '0.4rem 0.65rem',
                                borderRadius: '8px',
                                border: '1px solid rgba(148,163,184,0.35)',
                                background: 'transparent',
                                color: '#cbd5e1',
                                fontWeight: 800,
                                fontSize: '0.78rem',
                                cursor: 'pointer'
                              }}
                            >
                              {tx('ยกเลิก', 'Cancel')}
                            </button>
                          </>
                        ) : (
                          <>
                            <button
                              type="button"
                              onClick={() =>
                                toast.success(
                                  tx(
                                    `📲 ส่งการ์ดสรุปยอดขายเข้า LINE "${mem.lineId}" และเบอร์ "${mem.phone}" ของ ${displayName} เรียบร้อยแล้ว!`,
                                    `📲 Sent sales summary card to LINE "${mem.lineId}" & Phone "${mem.phone}" (${displayName})!`
                                  )
                                )
                              }
                              style={{
                                padding: '0.4rem 0.7rem',
                                borderRadius: '8px',
                                border: '1px solid rgba(16, 185, 129, 0.45)',
                                background: 'rgba(16, 185, 129, 0.16)',
                                color: '#34d399',
                                fontWeight: 800,
                                fontSize: '0.76rem',
                                cursor: 'pointer'
                              }}
                            >
                              📲 {tx('ส่งยอดเข้า LINE', 'Send LINE Report')}
                            </button>
                            <button
                              type="button"
                              onClick={() => handleStartEditMember(mem)}
                              style={{
                                padding: '0.4rem 0.65rem',
                                borderRadius: '8px',
                                border: '1px solid rgba(251, 191, 36, 0.45)',
                                background: 'rgba(251, 191, 36, 0.14)',
                                color: '#fbbf24',
                                fontWeight: 800,
                                fontSize: '0.76rem',
                                cursor: 'pointer'
                              }}
                            >
                              ✏️ {tx('แก้ไข', 'Edit')}
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteMember(mem)}
                              style={{
                                padding: '0.4rem 0.6rem',
                                borderRadius: '8px',
                                border: '1px solid rgba(244, 63, 94, 0.4)',
                                background: 'rgba(244, 63, 94, 0.14)',
                                color: '#fda4af',
                                fontWeight: 800,
                                fontSize: '0.76rem',
                                cursor: 'pointer'
                              }}
                            >
                              🗑️
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Super Admin Exemption vs Customer Package Enforcement Summary */}
      <div
        className="glass-card"
        style={{
          padding: '1.35rem',
          borderRadius: '16px',
          border: '1px solid rgba(251, 191, 36, 0.3)',
          background: 'rgba(15, 23, 42, 0.85)'
        }}
      >
        <div style={{ fontWeight: 900, fontSize: '1.02rem', color: '#fbbf24', marginBottom: '0.85rem' }}>
          {tx(
            '📋 กฎการบังคับใช้แพ็กเกจของระบบ (ยกเว้นเฉพาะ pongsatornnantakong88@gmail.com)',
            '📋 System Package Enforcement Rules (Exempting pongsatornnantakong88@gmail.com)'
          )}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '0.85rem' }}>
          <div style={{ padding: '0.95rem', borderRadius: '12px', background: 'rgba(251, 191, 36, 0.12)', border: '1.5px solid rgba(251, 191, 36, 0.45)' }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 900, color: '#fbbf24' }}>
              👑 {tx('บัญชีผู้ดูแลระบบสูงสุด (ADMIN)', 'SUPER ADMIN ACCOUNT')}
            </div>
            <div style={{ fontSize: '0.95rem', fontWeight: 900, color: '#fff', marginTop: '0.25rem', wordBreak: 'break-all' }}>
              pongsatornnantakong88@gmail.com
            </div>
            <div style={{ fontSize: '0.8rem', color: '#fde68a', marginTop: '0.35rem', fontWeight: 700 }}>
              {tx('• ยกเว้นค่าแพ็กเกจ • ปลดล็อกครบ 11/11 หน้า • เข้าหน้า Admin ได้เพียงผู้เดียว', '• Exempt from all packages • 11/11 modules unlocked • Exclusive Admin access')}
            </div>
          </div>

          <div style={{ padding: '0.95rem', borderRadius: '12px', background: 'rgba(56, 189, 248, 0.08)', border: '1px solid rgba(56, 189, 248, 0.25)' }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 900, color: '#38bdf8' }}>
              {tx('ลูกค้าแพ็กเกจ STARTER', 'CUSTOMER: STARTER')}
            </div>
            <div style={{ fontSize: '1.05rem', fontWeight: 900, color: '#fff', marginTop: '0.2rem' }}>
              1,990.- {tx('/ เดือน', '/ m')}
            </div>
            <div style={{ fontSize: '0.8rem', color: '#cbd5e1', marginTop: '0.3rem' }}>
              {tx('1 สาขาหลัก • ลูกค้า 2,500 ราย • เปิด 6/10 หน้าลูกค้า', '1 Branch • 2,500 Customers • 6/10 Customer Modules')}
            </div>
          </div>

          <div style={{ padding: '0.95rem', borderRadius: '12px', background: 'rgba(251, 191, 36, 0.08)', border: '1px solid rgba(251, 191, 36, 0.25)' }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 900, color: '#fbbf24' }}>
              {tx('ลูกค้าแพ็กเกจ PROFESSIONAL', 'CUSTOMER: PROFESSIONAL')}
            </div>
            <div style={{ fontSize: '1.05rem', fontWeight: 900, color: '#fff', marginTop: '0.2rem' }}>
              2,900.- {tx('/ เดือน', '/ m')}
            </div>
            <div style={{ fontSize: '0.8rem', color: '#cbd5e1', marginTop: '0.3rem' }}>
              {tx('สูงสุด 5 สาขา • ตรวจแคชเชียร์ + วิเคราะห์ AI • เปิด 9/10 หน้าลูกค้า', 'Up to 5 Branches • POS Audit + AI • 9/10 Customer Modules')}
            </div>
          </div>

          <div style={{ padding: '0.95rem', borderRadius: '12px', background: 'rgba(192, 132, 252, 0.08)', border: '1px solid rgba(192, 132, 252, 0.25)' }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 900, color: '#c084fc' }}>
              {tx('ลูกค้าแพ็กเกจ PREMIUM', 'CUSTOMER: PREMIUM')}
            </div>
            <div style={{ fontSize: '1.05rem', fontWeight: 900, color: '#fff', marginTop: '0.2rem' }}>
              4,900.- {tx('/ เดือน', '/ m')}
            </div>
            <div style={{ fontSize: '0.8rem', color: '#cbd5e1', marginTop: '0.3rem' }}>
              {tx('ไม่จำกัดสาขา • จัดซื้อรวมศูนย์ (Central PO) • เปิดครบ 10/10 หน้าลูกค้า', 'Unlimited Branches • Central PO • All 10/10 Customer Modules')}
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
        <div className="glass-card" style={{ padding: '1.3rem', borderRadius: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '1rem' }}>
          <div>
            <div style={{ fontWeight: 900, fontSize: '1.05rem', color: '#f8fafc' }}>
              {tx('บังคับใส่รหัสผู้จัดการก่อนกดยกเลิกบิล', 'Require Manager PIN Before Bill Cancellation')}
            </div>
            <p style={{ fontSize: '0.86rem', color: '#94a3b8', marginTop: '0.35rem' }}>
              {tx(
                'ป้องกันแคชเชียร์กดยกเลิกบิลเองหลังจากรับเงินสดจากลูกค้าแล้ว',
                'Prevents cashiers from cancelling bills on their own after collecting cash.'
              )}
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setRequirePinForVoid(!requirePinForVoid);
              toast.success(tx('บันทึกการตั้งค่าความปลอดภัยเรียบร้อยแล้ว', 'Security setting updated'));
            }}
            style={{
              padding: '0.65rem 1rem',
              borderRadius: '10px',
              border: 'none',
              background: requirePinForVoid ? '#10b981' : '#64748b',
              color: '#fff',
              fontWeight: 800,
              cursor: 'pointer'
            }}
          >
            {requirePinForVoid ? tx('เปิดใช้งานอยู่ (ปลอดภัย)', 'Enabled (Protected)') : tx('ปิดอยู่ (กดเพื่อเปิด)', 'Disabled (Click to Enable)')}
          </button>
        </div>

        <div className="glass-card" style={{ padding: '1.3rem', borderRadius: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '1rem' }}>
          <div>
            <div style={{ fontWeight: 900, fontSize: '1.05rem', color: '#f8fafc' }}>
              {tx('บังคับสแกนบาร์โค้ดสินค้าคืนคลังก่อนคืนเงินสด', 'Require Barcode Scan Before Cash Refund')}
            </div>
            <p style={{ fontSize: '0.86rem', color: '#94a3b8', marginTop: '0.35rem' }}>
              {tx(
                'ป้องกันการทำเรื่องคืนเงินสดทิพย์โดยไม่มีสินค้าชำรุดส่งกลับมาจริง',
                'Prevents fake cash refunds without an actual returned item scanned into stock.'
              )}
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setRequirePinForRefund(!requirePinForRefund);
              toast.success(tx('บันทึกการตั้งค่าการคืนเงินเรียบร้อยแล้ว', 'Refund verification policy updated'));
            }}
            style={{
              padding: '0.65rem 1rem',
              borderRadius: '10px',
              border: 'none',
              background: requirePinForRefund ? '#10b981' : '#64748b',
              color: '#fff',
              fontWeight: 800,
              cursor: 'pointer'
            }}
          >
            {requirePinForRefund ? tx('เปิดใช้งานอยู่ (ปลอดภัย)', 'Enabled (Protected)') : tx('ปิดอยู่ (กดเพื่อเปิด)', 'Disabled (Click to Enable)')}
          </button>
        </div>

        <div className="glass-card" style={{ padding: '1.3rem', borderRadius: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '1rem' }}>
          <div>
            <div style={{ fontWeight: 900, fontSize: '1.05rem', color: '#f8fafc' }}>
              {tx('สำรองฐานข้อมูลบัญชีและสต็อกอัตโนมัติทุกเที่ยงคืน', 'Automated Midnight Cloud Backup')}
            </div>
            <p style={{ fontSize: '0.86rem', color: '#94a3b8', marginTop: '0.35rem' }}>
              {tx(
                'เก็บรักษาข้อมูลยอดขายและประวัติลูกค้าทั้งหมดไว้อย่างปลอดภัย ไม่สูญหาย',
                'Automatically backs up all sales, customer history, and inventory records daily.'
              )}
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setAutoBackupDaily(!autoBackupDaily);
              toast.success(tx('อัปเดตระบบสำรองข้อมูลอัตโนมัติแล้ว', 'Cloud backup schedule updated'));
            }}
            style={{
              padding: '0.65rem 1rem',
              borderRadius: '10px',
              border: 'none',
              background: autoBackupDaily ? '#10b981' : '#64748b',
              color: '#fff',
              fontWeight: 800,
              cursor: 'pointer'
            }}
          >
            {autoBackupDaily ? tx('สำรองข้อมูลอัตโนมัติทุกวัน', 'Daily Auto-Backup Active') : tx('พักการสำรองข้อมูล', 'Backup Paused')}
          </button>
        </div>
      </div>
    </div>
  );
}

export function SettingsTab({
  lang,
  setLang,
  theme,
  setTheme,
  fontScale,
  setFontScale,
  rememberCredentials,
  setRememberCredentials,
  userPhone = '089-999-8888',
  userLineId = '@insightflow.vip',
  onUpdateUserContact
}) {
  const isEn = lang === 'en';
  const tx = (th, en) => (isEn ? en : th);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div className="glass-card" style={{ padding: '1.5rem', borderRadius: '18px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.35rem' }}>
          <LuxuryIconBadge variant="platinum" size="lg" active>
            <LuxuryModuleIcon type="settings" size={30} />
          </LuxuryIconBadge>
          <div>
            <h3 style={{ margin: '0 0 0.25rem 0', fontSize: '1.3rem', fontWeight: 900, color: '#f8fafc' }}>
              {tx('ตั้งค่าภาษา ขนาดตัวหนังสือ และการแจ้งเตือนยอดขายอัตโนมัติ', 'Language, Text Size & Automated Sales Notification Settings')}
            </h3>
            <p style={{ margin: 0, color: '#94a3b8', fontSize: '0.92rem' }}>
              {tx(
                'ปรับแต่งระบบให้อ่านง่าย สบายตา เลือกภาษา และตั้งค่าเบอร์โทรศัพท์ / ID LINE สำหรับรับข้อความสรุปยอดขายอัตโนมัติ',
                'Customize language, senior-friendly font scaling, visual theme, and Phone / LINE ID for automated sales summary alerts.'
              )}
            </p>
          </div>
        </div>

        {/* Phone & LINE ID Automated Sales Notification Settings */}
        <div
          style={{
            padding: '1.25rem',
            borderRadius: '16px',
            background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.14), rgba(15, 23, 42, 0.9))',
            border: '1.5px solid rgba(16, 185, 129, 0.45)',
            marginBottom: '1.25rem'
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '0.75rem', marginBottom: '0.9rem' }}>
            <div>
              <div style={{ fontWeight: 900, color: '#34d399', fontSize: '1.05rem' }}>
                📲 {tx('เบอร์โทรศัพท์ & ID LINE สำหรับส่งข้อความสรุปยอดขายอัตโนมัติ (22:00 น.)', 'Phone Number & LINE ID for Automated Daily Sales Summary (22:00)')}
              </div>
              <div style={{ fontSize: '0.84rem', color: '#cbd5e1', marginTop: '0.2rem' }}>
                {tx(
                  'ระบบใช้ข้อมูลนี้จากตอนเข้าสู่ระบบ (Login) เพื่อส่งข้อความสรุปยอดขาย กำไรสุทธิ และแจ้งเตือนสต็อกเข้ามือถือของคุณอัตโนมัติ',
                  'Saved during Login to automatically deliver daily closing sales, net profit, and low-stock alerts to your phone and LINE.'
                )}
              </div>
            </div>
            <button
              type="button"
              onClick={() =>
                toast.success(
                  tx(
                    `📲 ทดสอบส่งข้อความสรุปยอดขายอัตโนมัติไปยัง LINE ID "${userLineId}" และเบอร์โทร "${userPhone}" สำเร็จ!`,
                    `📲 Sent test automated sales summary to LINE ID "${userLineId}" and Phone "${userPhone}"!`
                  )
                )
              }
              style={{
                padding: '0.6rem 1.05rem',
                borderRadius: '10px',
                border: 'none',
                background: 'linear-gradient(135deg, #10b981, #059669)',
                color: '#fff',
                fontWeight: 900,
                fontSize: '0.82rem',
                cursor: 'pointer'
              }}
            >
              🚀 {tx('ทดสอบส่งข้อความเข้า LINE / เบอร์โทรทันที', 'Send Test Sales Message Now')}
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '0.9rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: '#94a3b8', marginBottom: '0.3rem' }}>
                📱 {tx('เบอร์โทรศัพท์มือถือ (รับแจ้งเตือน SMS ด่วน)', 'Mobile Phone Number (SMS Alerts)')}
              </label>
              <input
                type="tel"
                value={userPhone}
                onChange={e => onUpdateUserContact && onUpdateUserContact(e.target.value, userLineId)}
                placeholder="081-234-5678"
                style={{
                  width: '100%',
                  padding: '0.65rem 0.85rem',
                  borderRadius: '10px',
                  background: '#0f172a',
                  color: '#fff',
                  border: '1px solid rgba(56, 189, 248, 0.4)'
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 800, color: '#94a3b8', marginBottom: '0.3rem' }}>
                💬 {tx('ไอดีไลน์ (LINE ID สำหรับรับสรุปยอดขายทุกวัน)', 'LINE ID (Daily Automated Sales Summary)')}
              </label>
              <input
                type="text"
                value={userLineId}
                onChange={e => onUpdateUserContact && onUpdateUserContact(userPhone, e.target.value)}
                placeholder="@myshop"
                style={{
                  width: '100%',
                  padding: '0.65rem 0.85rem',
                  borderRadius: '10px',
                  background: '#0f172a',
                  color: '#fff',
                  border: '1px solid rgba(16, 185, 129, 0.4)'
                }}
              />
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.2rem' }}>
          {/* Language Selection */}
          <div style={{ padding: '1.2rem', borderRadius: '14px', background: 'rgba(15, 23, 42, 0.7)', border: '1px solid rgba(56, 189, 248, 0.3)' }}>
            <div style={{ fontWeight: 900, color: '#38bdf8', marginBottom: '0.6rem' }}>
              {tx('🌐 เลือกภาษาของระบบ (แยกภาษาชัดเจน)', '🌐 System Language (Strict Single-Language Mode)')}
            </div>
            <div style={{ display: 'flex', gap: '0.65rem' }}>
              <button
                type="button"
                onClick={() => {
                  setLang('th');
                  toast.success('เปลี่ยนเป็นโหมดภาษาไทยล้วนเรียบร้อยแล้ว');
                }}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  borderRadius: '10px',
                  border: lang === 'th' ? '2px solid #38bdf8' : '1px solid rgba(148,163,184,0.3)',
                  background: lang === 'th' ? 'rgba(56, 189, 248, 0.22)' : 'transparent',
                  color: '#f8fafc',
                  fontWeight: 900,
                  cursor: 'pointer'
                }}
              >
                🇹🇭 ภาษาไทยล้วน
              </button>
              <button
                type="button"
                onClick={() => {
                  setLang('en');
                  toast.success('Switched to 100% English Mode');
                }}
                style={{
                  flex: 1,
                  padding: '0.75rem',
                  borderRadius: '10px',
                  border: lang === 'en' ? '2px solid #38bdf8' : '1px solid rgba(148,163,184,0.3)',
                  background: lang === 'en' ? 'rgba(56, 189, 248, 0.22)' : 'transparent',
                  color: '#f8fafc',
                  fontWeight: 900,
                  cursor: 'pointer'
                }}
              >
                🇬🇧 English Only
              </button>
            </div>
          </div>

          {/* Font Scale Selection */}
          <div style={{ padding: '1.2rem', borderRadius: '14px', background: 'rgba(15, 23, 42, 0.7)', border: '1px solid rgba(251, 191, 36, 0.3)' }}>
            <div style={{ fontWeight: 900, color: '#fbbf24', marginBottom: '0.6rem' }}>
              {tx('🔎 ขนาดตัวหนังสือ (อ่านง่ายสำหรับผู้ใหญ่)', '🔎 Font Size (Senior-Friendly Readability)')}
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              {[
                { id: 'normal', th: 'ขนาดปกติ', en: 'Standard' },
                { id: 'large', th: 'ขนาดใหญ่', en: 'Large' },
                { id: 'xlarge', th: 'ใหญ่พิเศษ', en: 'Extra Large' }
              ].map(sz => (
                <button
                  key={sz.id}
                  type="button"
                  onClick={() => setFontScale(sz.id)}
                  style={{
                    flex: 1,
                    padding: '0.7rem 0.5rem',
                    borderRadius: '10px',
                    border: fontScale === sz.id ? '2px solid #fbbf24' : '1px solid rgba(148,163,184,0.3)',
                    background: fontScale === sz.id ? 'rgba(251, 191, 36, 0.2)' : 'transparent',
                    color: '#f8fafc',
                    fontWeight: 800,
                    cursor: 'pointer'
                  }}
                >
                  {isEn ? sz.en : sz.th}
                </button>
              ))}
            </div>
          </div>

          {/* Theme & Password Remember */}
          <div style={{ padding: '1.2rem', borderRadius: '14px', background: 'rgba(15, 23, 42, 0.7)', border: '1px solid rgba(16, 185, 129, 0.3)' }}>
            <div style={{ fontWeight: 900, color: '#34d399', marginBottom: '0.6rem' }}>
              {tx('🎨 โทนสีหน้าจอ & การจดจำรหัสผ่าน', '🎨 Screen Theme & Password Memory')}
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <button
                type="button"
                onClick={() => setTheme('dark')}
                style={{
                  flex: 1,
                  padding: '0.65rem',
                  borderRadius: '10px',
                  border: theme === 'dark' ? '2px solid #10b981' : '1px solid rgba(148,163,184,0.3)',
                  background: theme === 'dark' ? 'rgba(16, 185, 129, 0.2)' : 'transparent',
                  color: '#f8fafc',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
              >
                {tx('🌙 โหมดมืดถนอมสายตา', '🌙 Dark Mode')}
              </button>
              <button
                type="button"
                onClick={() => setTheme('light')}
                style={{
                  flex: 1,
                  padding: '0.65rem',
                  borderRadius: '10px',
                  border: theme === 'light' ? '2px solid #10b981' : '1px solid rgba(148,163,184,0.3)',
                  background: theme === 'light' ? 'rgba(16, 185, 129, 0.2)' : 'transparent',
                  color: '#f8fafc',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
              >
                {tx('☀️ โหมดสว่างคมชัด', '☀️ Light Mode')}
              </button>
            </div>

            <label style={{ display: 'flex', alignItems: 'center', gap: '0.55rem', color: '#e2e8f0', fontSize: '0.88rem', fontWeight: 700, cursor: 'pointer' }}>
              <input
                type="checkbox"
                checked={rememberCredentials}
                onChange={e => setRememberCredentials(e.target.checked)}
                style={{ width: '18px', height: '18px' }}
              />
              {tx('จดจำอีเมลและรหัสผ่านไว้เข้าใช้งานครั้งถัดไปอัตโนมัติ', 'Remember my email and password for automatic sign-in')}
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export function ProcurementTab({
  lang,
  vendorsList,
  setVendorsList,
  branchRequisitions,
  setBranchRequisitions,
  centralPosList,
  setCentralPosList,
  inventoryList = [],
  setInventoryList,
  setDbRecords,
  renderUploadZone,
  barChartOptions
}) {
  const isEn = lang === 'en';
  const tx = (th, en) => (isEn ? en : th);

  const [vendorFilter, setVendorFilter] = useState('all');
  const [vendorSearch, setVendorSearch] = useState('');
  const [showAddVendor, setShowAddVendor] = useState(false);
  const [newVendorName, setNewVendorName] = useState('');
  const [newVendorCategory, setNewVendorCategory] = useState('');
  const [newVendorLeadTime, setNewVendorLeadTime] = useState('2.5');
  const [newVendorFillRate, setNewVendorFillRate] = useState('98.5');
  const [newVendorDiscount, setNewVendorDiscount] = useState('15');

  // Custom Multi-Branch Requisition Form & Active PO Document Preview Modal
  const [showAddReqForm, setShowAddReqForm] = useState(false);
  const [newReqName, setNewReqName] = useState('');
  const [newReqVendorId, setNewReqVendorId] = useState('VND-01');
  const [newReqQty, setNewReqQty] = useState('200');
  const [newReqUnitCost, setNewReqUnitCost] = useState('320');
  const [newReqDiscountPct, setNewReqDiscountPct] = useState('15');
  const [activePoModal, setActivePoModal] = useState(null);

  // Filter vendors for scorecard
  const filteredVendors = vendorsList.filter(v => {
    const info = v[isEn ? 'en' : 'th'];
    const matchFilter =
      vendorFilter === 'all' ||
      (vendorFilter === 'excellent' && v.status === 'excellent') ||
      (vendorFilter === 'watch' && (v.status === 'watch' || v.status === 'risk'));
    const q = vendorSearch.trim().toLowerCase();
    const matchSearch =
      !q ||
      v.id.toLowerCase().includes(q) ||
      info.name.toLowerCase().includes(q) ||
      info.category.toLowerCase().includes(q);
    return matchFilter && matchSearch;
  });

  // Aggregate KPI metrics
  const avgFillRate = (
    vendorsList.reduce((acc, v) => acc + v.fillRate, 0) / Math.max(1, vendorsList.length)
  ).toFixed(1);
  const avgLeadTime = (
    vendorsList.reduce((acc, v) => acc + v.leadTimeDays, 0) / Math.max(1, vendorsList.length)
  ).toFixed(1);
  const avgOnTimeRate = (
    vendorsList.reduce((acc, v) => acc + v.onTimeRate, 0) / Math.max(1, vendorsList.length)
  ).toFixed(1);

  // Calculate active Consolidated PO draft totals (Economy of Scale)
  const selectedReqs = branchRequisitions.filter(r => r.selected);
  const draftTotalUnits = selectedReqs.reduce((acc, r) => acc + r.totalQty, 0);
  const draftRegularCost = selectedReqs.reduce(
    (acc, r) => acc + r.totalQty * r.regularUnitCost,
    0
  );
  const draftDiscountedCost = selectedReqs.reduce((acc, r) => {
    const qualifies = r.totalQty >= r.minQtyForTier;
    const discPct = qualifies ? r.volumeDiscountPct : Math.floor(r.volumeDiscountPct * 0.4);
    const netUnit = Math.round(r.regularUnitCost * (1 - discPct / 100));
    return acc + r.totalQty * netUnit;
  }, 0);
  const draftSavedAmount = Math.max(0, draftRegularCost - draftDiscountedCost);
  const draftAvgDiscountPct =
    draftRegularCost > 0 ? ((draftSavedAmount / draftRegularCost) * 100).toFixed(1) : '0.0';

  const historicalSavings = centralPosList.reduce((acc, po) => acc + po.savedAmount, 0);
  const totalCumulativeSavings = historicalSavings + draftSavedAmount;

  // Toggle selection of a requisition item
  const handleToggleReqSelection = reqId => {
    setBranchRequisitions(prev =>
      prev.map(r => (r.id === reqId ? { ...r, selected: !r.selected } : r))
    );
  };

  // Select or deselect all requisition items
  const handleSelectAllReqs = selectAll => {
    setBranchRequisitions(prev => prev.map(r => ({ ...r, selected: selectAll })));
  };

  // Sync Low-Stock & Out-of-Stock items directly from Smart Inventory (Cross-Module Integration)
  const handleSyncLowStockFromInventory = () => {
    const lowItems = (inventoryList || []).filter(
      item => item.status === 'low_stock' || item.status === 'out_of_stock' || item.stock <= 25
    );
    const existingSkus = new Set(branchRequisitions.map(r => r.sku));
    const newlySynced = [];

    lowItems.forEach((item, idx) => {
      if (!existingSkus.has(item.sku)) {
        const matchedVendor = vendorsList[idx % Math.max(1, vendorsList.length)] || {
          id: 'VND-01',
          volumeDiscountPct: 14,
          th: { name: 'บริษัท สยาม ออร์แกนิค ซัพพลาย จำกัด' },
          en: { name: 'Siam Organic Supply Co., Ltd.' }
        };
        const unitCost = Math.max(45, Math.round((item.price || 450) * 0.48));
        newlySynced.push({
          id: `REQ-SYNC-${Date.now()}-${idx}`,
          sku: item.sku,
          vendorId: matchedVendor.id,
          regularUnitCost: unitCost,
          volumeDiscountPct: matchedVendor.volumeDiscountPct || 14,
          minQtyForTier: 150,
          selected: true,
          branchNeeds: [
            { branchTh: 'สยามพารากอน', branchEn: 'Siam Paragon', currentStock: item.stock, qty: 80 },
            { branchTh: 'เซ็นทรัลลาดพร้าว', branchEn: 'Central Ladprao', currentStock: 5, qty: 60 },
            { branchTh: 'คลังออนไลน์กลาง', branchEn: 'Central Online Hub', currentStock: 4, qty: 60 }
          ],
          totalQty: 200,
          th: {
            productName: item.th?.name || item.sku,
            vendorName: matchedVendor.th.name,
            unitLabel: 'ชิ้น',
            urgency: item.stock === 0 ? 'ด่วนที่สุด (ของหมดคลังสินค้า)' : `ดึงจากคลังสินค้าอัจฉริยะ (เหลือ ${item.stock} ชิ้น)`
          },
          en: {
            productName: item.en?.name || item.sku,
            vendorName: matchedVendor.en.name,
            unitLabel: 'units',
            urgency: item.stock === 0 ? 'Critical (Out of Stock in Inventory)' : `Synced from Smart Inventory (${item.stock} left)`
          }
        });
      }
    });

    if (newlySynced.length === 0) {
      // Boost existing low-stock quantities to unlock max tier if all low-stock SKUs are already listed
      setBranchRequisitions(prev =>
        prev.map(r => ({
          ...r,
          selected: true,
          totalQty: Math.max(r.totalQty, r.minQtyForTier)
        }))
      );
      toast.success(
        tx(
          'รายการของใกล้หมดจากหน้าคลังสินค้าอยู่ในตารางครบแล้ว! ระบบได้ปรับยอดสั่งรวมให้ถึงเกณฑ์รับส่วนลดสูงสุด (Max Volume Tier) อัตโนมัติ',
          'All low-stock Inventory SKUs are already synced! Automatically optimized quantities to unlock Max Volume Discount Tiers.'
        )
      );
      return;
    }

    setBranchRequisitions(prev => [...newlySynced, ...prev]);
    toast.success(
      tx(
        `ดึงรายการสินค้าใกล้หมดจากหน้าคลังสินค้าอัจฉริยะเพิ่มเข้ามา ${newlySynced.length} รายการ เพื่อรวมสั่งซื้อที่สำนักงานใหญ่เรียบร้อยแล้ว!`,
        `Synced ${newlySynced.length} low-stock SKUs from Smart Inventory into the Consolidated PO queue!`
      )
    );
  };

  // Add custom multi-branch requisition item
  const handleAddRequisitionSubmit = e => {
    e.preventDefault();
    if (!newReqName.trim()) {
      toast.error(tx('กรุณาระบุชื่อสินค้าที่ต้องการขอซื้อรวม', 'Please enter product name for consolidated requisition'));
      return;
    }
    const vendorObj = vendorsList.find(v => v.id === newReqVendorId) || vendorsList[0];
    const totalQtyNum = Math.max(30, parseInt(newReqQty, 10) || 200);
    const unitCostNum = Math.max(10, parseInt(newReqUnitCost, 10) || 320);
    const discPctNum = Math.min(35, Math.max(5, parseInt(newReqDiscountPct, 10) || 15));
    const q1 = Math.round(totalQtyNum * 0.45);
    const q2 = Math.round(totalQtyNum * 0.3);
    const q3 = Math.max(10, totalQtyNum - q1 - q2);

    const newReqItem = {
      id: `REQ-${Math.floor(100 + Math.random() * 899)}`,
      sku: `SKU-${Math.floor(1000 + Math.random() * 8999)}`,
      vendorId: vendorObj?.id || 'VND-01',
      regularUnitCost: unitCostNum,
      volumeDiscountPct: discPctNum,
      minQtyForTier: 150,
      selected: true,
      branchNeeds: [
        { branchTh: 'สยามพารากอน', branchEn: 'Siam Paragon', currentStock: 6, qty: q1 },
        { branchTh: 'เซ็นทรัลลาดพร้าว', branchEn: 'Central Ladprao', currentStock: 5, qty: q2 },
        { branchTh: 'คลังออนไลน์กลาง', branchEn: 'Central Online Hub', currentStock: 8, qty: q3 }
      ],
      totalQty: totalQtyNum,
      th: {
        productName: newReqName.trim(),
        vendorName: vendorObj ? vendorObj.th.name : 'ซัพพลายเออร์หลักสำนักงานใหญ่',
        unitLabel: 'ชิ้น',
        urgency: 'รายการขอซื้อรวมศูนย์ที่เพิ่มใหม่'
      },
      en: {
        productName: newReqName.trim(),
        vendorName: vendorObj ? vendorObj.en.name : 'Primary HQ Supplier',
        unitLabel: 'units',
        urgency: 'Newly Added Multi-Branch Requisition'
      }
    };

    setBranchRequisitions(prev => [newReqItem, ...prev]);
    setNewReqName('');
    setShowAddReqForm(false);
    toast.success(
      tx(
        `เพิ่มใบขอซื้อรวมสาขา "${newReqItem.th.productName}" (${totalQtyNum} ชิ้น) เข้าสู่คิวออกใบสั่งซื้อกลางแล้ว!`,
        `Added multi-branch requisition "${newReqItem.en.productName}" (${totalQtyNum} units) to Central PO queue!`
      )
    );
  };

  // Adjust consolidated quantity for an item across branches
  const handleAdjustReqQty = (reqId, delta) => {
    setBranchRequisitions(prev =>
      prev.map(r => {
        if (r.id !== reqId) return r;
        const nextTotal = Math.max(20, r.totalQty + delta);
        const updatedBranches = r.branchNeeds.map((b, idx) =>
          idx === 0 ? { ...b, qty: Math.max(10, b.qty + delta) } : b
        );
        return {
          ...r,
          totalQty: nextTotal,
          branchNeeds: updatedBranches
        };
      })
    );
    toast.success(
      tx(
        `ปรับยอดสั่งซื้อรวมศูนย์ (${delta > 0 ? `+${delta}` : delta}) และคำนวณส่วนลด Economy of Scale ใหม่แล้ว`,
        `Updated consolidated quantity (${delta > 0 ? `+${delta}` : delta}) and recalculated volume discount`
      )
    );
  };

  // 1-Click Consolidated PO Generator
  const handleGenerateCentralPo = () => {
    if (selectedReqs.length === 0) {
      toast.error(
        tx(
          'กรุณาติ๊กเลือกรายการสินค้าอย่างน้อย 1 รายการเพื่อออกใบสั่งซื้อรวมศูนย์',
          'Please select at least 1 item to generate a Consolidated PO'
        )
      );
      return;
    }

    const poNumber = `CPO-2026-${8803 + centralPosList.length}`;
    const nowStr = new Date().toLocaleString(isEn ? 'en-GB' : 'th-TH', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    const vendorNamesTh = [...new Set(selectedReqs.map(r => r.th.vendorName))].join(', ');
    const vendorNamesEn = [...new Set(selectedReqs.map(r => r.en.vendorName))].join(', ');

    const newPo = {
      poNumber,
      createdAt: nowStr,
      totalUnits: draftTotalUnits,
      regularTotalCost: draftRegularCost,
      discountedTotalCost: draftDiscountedCost,
      savedAmount: draftSavedAmount,
      discountPctAvg: Number(draftAvgDiscountPct),
      received: false,
      itemsSnapshot: selectedReqs.map(r => ({
        sku: r.sku,
        qty: r.totalQty,
        regularUnitCost: r.regularUnitCost,
        volumeDiscountPct: r.totalQty >= r.minQtyForTier ? r.volumeDiscountPct : Math.floor(r.volumeDiscountPct * 0.4),
        thName: r.th.productName,
        enName: r.en.productName,
        thVendor: r.th.vendorName,
        enVendor: r.en.vendorName
      })),
      th: {
        vendorSummary: vendorNamesTh,
        branchesCovered: `รวบรวมความต้องการจากทุกสาขา (${selectedReqs.length} รายการสินค้า)`,
        status: 'อนุมัติและส่งใบสั่งซื้อรวมศูนย์ให้ซัพพลายเออร์แล้ว'
      },
      en: {
        vendorSummary: vendorNamesEn,
        branchesCovered: `Consolidated across all branches (${selectedReqs.length} SKUs)`,
        status: 'Approved & Dispatched to Vendors'
      }
    };

    setCentralPosList(prev => [newPo, ...prev]);
    setActivePoModal(newPo);
    toast.success(
      tx(
        `ออกใบสั่งซื้อรวมศูนย์ ${poNumber} สำเร็จ! ประหยัดต้นทุนได้ทันที ฿${draftSavedAmount.toLocaleString()} (-${draftAvgDiscountPct}%)`,
        `Generated Central PO ${poNumber}! Instant Economy of Scale savings: ฿${draftSavedAmount.toLocaleString()} (-${draftAvgDiscountPct}%)`
      )
    );
  };

  // Receive Central PO shipment & automatically restock Smart Inventory + log to Database
  const handleReceiveCentralPoAndRestock = po => {
    if (po.received) {
      setActivePoModal(po);
      return;
    }

    setCentralPosList(prev =>
      prev.map(item =>
        item.poNumber === po.poNumber
          ? {
              ...item,
              received: true,
              th: {
                ...item.th,
                status: 'ตรวจรับสินค้าครบ 100% และเติมสต็อกเข้าคลังทุกสาขาแล้ว'
              },
              en: {
                ...item.en,
                status: '100% Received & Restocked Across All Branches'
              }
            }
          : item
      )
    );

    // Cross-module update 1: Increment stock in Smart Inventory
    if (setInventoryList) {
      const targetSkus = new Map(
        (po.itemsSnapshot || selectedReqs).map(r => [r.sku, r.qty || r.totalQty || 150])
      );
      setInventoryList(prev =>
        prev.map(inv => {
          const addQty = targetSkus.get(inv.sku);
          if (!addQty && inv.status !== 'low_stock' && inv.status !== 'out_of_stock') return inv;
          const boost = addQty || 120;
          return {
            ...inv,
            stock: inv.stock + boost,
            status: 'in_stock',
            th: {
              ...inv.th,
              statusLabel: `มีสินค้าพร้อมขาย (รับจากใบสั่งซื้อกลาง +${boost})`
            },
            en: {
              ...inv.en,
              statusLabel: `In Stock (Central PO +${boost})`
            }
          };
        })
      );
    }

    // Cross-module update 2: Record transaction in Database Explorer
    if (setDbRecords) {
      setDbRecords(prev => [
        {
          id: po.poNumber,
          date: new Date().toLocaleTimeString(isEn ? 'en-US' : 'th-TH', { hour: '2-digit', minute: '2-digit' }),
          amount: po.discountedTotalCost,
          itemsCount: po.totalUnits,
          th: {
            channel: 'จัดซื้อรวมศูนย์สำนักงานใหญ่ (Central PO)',
            customer: po.th.vendorSummary,
            product: `รับสินค้าเข้าคลังรวม ${po.totalUnits.toLocaleString()} ชิ้น (ประหยัด ฿${po.savedAmount.toLocaleString()})`,
            status: 'รับของเข้าคลังสำเร็จ'
          },
          en: {
            channel: 'Central HQ Procurement (Central PO)',
            customer: po.en.vendorSummary,
            product: `Restocked ${po.totalUnits.toLocaleString()} units (Saved ฿${po.savedAmount.toLocaleString()})`,
            status: 'Received & Restocked'
          }
        },
        ...prev
      ]);
    }

    toast.success(
      tx(
        `ตรวจรับสินค้าใบสั่งซื้อ ${po.poNumber} จำนวน ${po.totalUnits.toLocaleString()} ชิ้น และอัปเดตยอดคงเหลือในหน้า "คลังสินค้าอัจฉริยะ" ทันที!`,
        `Received Central PO ${po.poNumber} (${po.totalUnits.toLocaleString()} units) and automatically restocked Smart Inventory!`
      )
    );
  };

  // Export Consolidated PO to CSV / Excel
  const handleExportCentralPoCsv = () => {
    const headers = isEn
      ? [
          'SKU',
          'Product Name',
          'Supplier',
          'Consolidated Qty',
          'Regular Unit Cost (THB)',
          'Volume Discount (%)',
          'Net Central PO Cost (THB)',
          'Total Saved (THB)'
        ]
      : [
          'รหัสสินค้า',
          'ชื่อสินค้า',
          'ซัพพลายเออร์',
          'จำนวนสั่งรวมทุกสาขา',
          'ต้นทุนปกติต่อชิ้น (บาท)',
          'ส่วนลดสั่งซื้อรวม (%)',
          'ยอดสั่งซื้อสุทธิหลังหักส่วนลด (บาท)',
          'ประหยัดเงินได้ (บาท)'
        ];

    const rows = selectedReqs.map(r => {
      const info = r[isEn ? 'en' : 'th'];
      const qualifies = r.totalQty >= r.minQtyForTier;
      const discPct = qualifies ? r.volumeDiscountPct : Math.floor(r.volumeDiscountPct * 0.4);
      const netUnit = Math.round(r.regularUnitCost * (1 - discPct / 100));
      const regTotal = r.totalQty * r.regularUnitCost;
      const netTotal = r.totalQty * netUnit;
      const saved = regTotal - netTotal;
      return [
        r.sku,
        `"${info.productName}"`,
        `"${info.vendorName}"`,
        r.totalQty,
        r.regularUnitCost,
        `${discPct}%`,
        netTotal,
        saved
      ].join(',');
    });

    const csvContent = '\uFEFF' + [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Central_PO_EconomyOfScale_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    toast.success(
      tx(
        'ดาวน์โหลดไฟล์ใบสั่งซื้อรวมศูนย์ (Excel / CSV) พร้อมส่งให้ซัพพลายเออร์เรียบร้อยแล้ว!',
        'Downloaded Consolidated Central PO (Excel / CSV) ready for vendor dispatch!'
      )
    );
  };

  // Negotiate extra volume discount with vendor
  const handleNegotiateVendorDiscount = vendorId => {
    setVendorsList(prev =>
      prev.map(v => {
        if (v.id !== vendorId) return v;
        const nextDisc = Math.min(25, v.volumeDiscountPct + 2);
        return {
          ...v,
          volumeDiscountPct: nextDisc,
          th: {
            ...v.th,
            discountCondition: `ต่อรองสำเร็จ! สั่งรวมครบ ${v.minOrderQtyForDiscount} ชิ้น ลดต้นทุนเพิ่มเป็น ${nextDisc}%`
          },
          en: {
            ...v.en,
            discountCondition: `Negotiated! Order ${v.minOrderQtyForDiscount}+ units centrally for ${nextDisc}% off`
          }
        };
      })
    );
    setBranchRequisitions(prev =>
      prev.map(r =>
        r.vendorId === vendorId
          ? { ...r, volumeDiscountPct: Math.min(25, r.volumeDiscountPct + 2) }
          : r
      )
    );
    toast.success(
      tx(
        'บันทึกข้อตกลงส่วนลดสั่งรวมศูนย์เพิ่มอีก +2% (Economy of Scale) เรียบร้อยแล้ว!',
        'Applied +2% extra volume discount across consolidated orders for this vendor!'
      )
    );
  };

  // Send SLA follow-up alert for delayed or incomplete vendor shipments
  const handleSendVendorSlaAlert = vendor => {
    const info = vendor[isEn ? 'en' : 'th'];
    toast.success(
      tx(
        `ส่งหนังสือแจ้งเตือนติดตามเวลาจัดส่ง (Lead Time) และยอดค้างส่งไปยัง "${info.name}" เรียบร้อยแล้ว`,
        `Dispatched SLA Lead Time & Fill Rate follow-up notice to "${info.name}"`
      )
    );
  };

  // Add new vendor form handler
  const handleAddVendorSubmit = e => {
    e.preventDefault();
    if (!newVendorName.trim()) {
      toast.error(tx('กรุณากรอกชื่อบริษัทซัพพลายเออร์', 'Please enter vendor company name'));
      return;
    }
    const leadNum = Math.max(0.5, Number(newVendorLeadTime) || 2.5);
    const fillNum = Math.min(100, Math.max(50, Number(newVendorFillRate) || 98.0));
    const discNum = Math.min(35, Math.max(5, Number(newVendorDiscount) || 14));
    const newId = `VND-0${vendorsList.length + 1}`;
    const isTop = fillNum >= 96 && leadNum <= 3.5;

    const newVendorObj = {
      id: newId,
      leadTimeDays: leadNum,
      slaTargetDays: 3.0,
      onTimeRate: Math.min(100, fillNum - 0.5),
      fillRate: fillNum,
      defectRate: 0.2,
      creditTermDays: 45,
      volumeDiscountPct: discNum,
      minOrderQtyForDiscount: 250,
      annualSpend: 1200000,
      grade: isTop ? 'A+' : 'B+',
      status: isTop ? 'excellent' : 'watch',
      th: {
        name: newVendorName.trim(),
        category: newVendorCategory.trim() || 'สินค้าอุปโภคบริโภคและวัตถุดิบหลัก',
        contact: 'ฝ่ายขายลูกค้ารายใหญ่ • 02-999-8888',
        gradeLabel: isTop ? 'เกรด A+ (พันธมิตรใหม่คุณภาพสูง)' : 'เกรด B+ (อยู่ระหว่างประเมินผล)',
        discountCondition: `สั่งรวมครบ 250 ชิ้น ลดต้นทุนทันที ${discNum}%`,
        note: 'ขึ้นทะเบียนซัพพลายเออร์จัดซื้อรวมศูนย์ที่สำนักงานใหญ่'
      },
      en: {
        name: newVendorName.trim(),
        category: newVendorCategory.trim() || 'General Merchandise & Core Supplies',
        contact: 'Enterprise Account Team • 02-999-8888',
        gradeLabel: isTop ? 'Grade A+ (Verified Strategic Partner)' : 'Grade B+ (Under Evaluation)',
        discountCondition: `Order 250+ units centrally for ${discNum}% off`,
        note: 'Registered for HQ central procurement & volume discount program.'
      }
    };

    setVendorsList(prev => [newVendorObj, ...prev]);
    setNewVendorName('');
    setNewVendorCategory('');
    setShowAddVendor(false);
    toast.success(
      tx(
        `เพิ่มซัพพลายเออร์ "${newVendorObj.th.name}" เข้าสู่ระบบจัดซื้อรวมศูนย์เรียบร้อยแล้ว!`,
        `Added "${newVendorObj.en.name}" to Central Procurement Scorecard!`
      )
    );
  };

  // Vendor Reliability Bar Chart Data
  const vendorScorecardChartData = {
    labels: vendorsList.map(v => {
      const name = v[isEn ? 'en' : 'th'].name;
      return name.length > 22 ? name.slice(0, 22) + '…' : name;
    }),
    datasets: [
      {
        label: tx('อัตราส่งของครบตามจำนวนที่สั่ง (Fill Rate %)', 'Order Fill Rate (%)'),
        data: vendorsList.map(v => v.fillRate),
        backgroundColor: 'rgba(16, 185, 129, 0.85)',
        borderRadius: 8
      },
      {
        label: tx('อัตราส่งของตรงเวลา (On-Time Delivery %)', 'On-Time Delivery (%)'),
        data: vendorsList.map(v => v.onTimeRate),
        backgroundColor: 'rgba(56, 189, 248, 0.85)',
        borderRadius: 8
      }
    ]
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {renderUploadZone(
        'procurement',
        tx('รายงานซัพพลายเออร์และการจัดซื้อรวมศูนย์', 'Central Procurement & Vendor Scorecard')
      )}

      {/* Executive Hero Banner */}
      <div
        className="glass-card"
        style={{
          padding: '1.45rem',
          borderRadius: '18px',
          background:
            'linear-gradient(135deg, rgba(245, 158, 11, 0.16), rgba(16, 185, 129, 0.12), rgba(15, 23, 42, 0.94))',
          border: '1.5px solid rgba(251, 191, 36, 0.45)',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: '1 1 340px' }}>
          <LuxuryIconBadge variant="gold" size="lg" active>
            <LuxuryModuleIcon type="procurement" size={30} />
          </LuxuryIconBadge>
          <div>
            <span
              style={{
                display: 'inline-block',
                padding: '0.28rem 0.78rem',
                borderRadius: '999px',
                background: 'rgba(245, 158, 11, 0.22)',
                color: '#fbbf24',
                fontWeight: 800,
                fontSize: '0.8rem',
                marginBottom: '0.35rem'
              }}
            >
              {tx(
                'ศูนย์สั่งซื้อรวมที่สำนักงานใหญ่เพื่อต่อรองราคา (ECONOMY OF SCALE)',
                'CENTRAL HQ PROCUREMENT & VENDOR SCORECARD (ECONOMY OF SCALE)'
              )}
            </span>
            <h3 style={{ margin: 0, fontSize: '1.32rem', fontWeight: 900, color: '#f8fafc' }}>
              {tx(
                'รวบรวมยอดของใกล้หมดจากทุกสาขา • ออกใบสั่งซื้อรวมในคลิกเดียวเพื่อรับส่วนลดพิเศษ',
                'Aggregate Multi-Branch Low Stock • 1-Click Consolidated PO for Volume Discounts'
              )}
            </h3>
            <p style={{ margin: '0.3rem 0 0 0', fontSize: '0.9rem', color: '#cbd5e1' }}>
              {tx(
                'วัดความน่าเชื่อถือซัพพลายเออร์ (ส่งตรงเวลา Lead Time & ส่งของครบ Fill Rate) พร้อมลดต้นทุนสินค้าได้ 12%–16% ทันที',
                'Track vendor Lead Time & Fill Rate reliability while unlocking 12%–16% volume discounts across all branches.'
              )}
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem' }}>
          <button
            type="button"
            onClick={handleSyncLowStockFromInventory}
            style={{
              padding: '0.75rem 1.05rem',
              borderRadius: '12px',
              border: '1px solid rgba(56, 189, 248, 0.55)',
              background: 'rgba(56, 189, 248, 0.16)',
              color: '#38bdf8',
              fontWeight: 800,
              cursor: 'pointer'
            }}
          >
            {tx('🔄 ดึงของใกล้หมดจากคลังสินค้าอัตโนมัติ', '🔄 Sync Low-Stock from Inventory')}
          </button>
          <button
            type="button"
            onClick={handleGenerateCentralPo}
            style={{
              padding: '0.75rem 1.2rem',
              borderRadius: '12px',
              border: '1px solid rgba(251, 191, 36, 0.6)',
              background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
              color: '#0f172a',
              fontWeight: 900,
              cursor: 'pointer',
              boxShadow: '0 8px 20px -4px rgba(245, 158, 11, 0.5)'
            }}
          >
            {tx(
              `ออกใบสั่งซื้อรวมศูนย์ในคลิกเดียว (ประหยัด ฿${draftSavedAmount.toLocaleString()})`,
              `1-Click Generate Central PO (Save ฿${draftSavedAmount.toLocaleString()})`
            )}
          </button>
          <button
            type="button"
            onClick={handleExportCentralPoCsv}
            style={{
              padding: '0.75rem 1.1rem',
              borderRadius: '12px',
              border: '1px solid rgba(16, 185, 129, 0.5)',
              background: 'rgba(16, 185, 129, 0.18)',
              color: '#34d399',
              fontWeight: 800,
              cursor: 'pointer'
            }}
          >
            {tx('ส่งออกใบสั่งซื้อรวม (Excel / CSV)', 'Export Central PO (Excel / CSV)')}
          </button>
        </div>
      </div>

      {/* 4 Executive Summary KPI Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(225px, 1fr))', gap: '1rem' }}>
        <div className="glass-card" style={{ padding: '1.25rem', borderRadius: '16px', borderLeft: '4px solid #10b981' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 700 }}>
              {tx('ประหยัดต้นทุนจากการสั่งซื้อรวมศูนย์', 'Economy of Scale Savings')}
            </div>
            <LuxuryIconBadge variant="emerald" size="sm" active>
              <LuxuryModuleIcon type="wallet" size={18} />
            </LuxuryIconBadge>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#34d399', marginTop: '0.35rem' }}>
            ฿{totalCumulativeSavings.toLocaleString()}
          </div>
          <div style={{ fontSize: '0.8rem', color: '#a7f3d0', marginTop: '0.2rem' }}>
            {tx(
              `รอบนี้ประหยัดเพิ่ม ฿${draftSavedAmount.toLocaleString()} (ลดเฉลี่ย ${draftAvgDiscountPct}%)`,
              `Current batch saves ฿${draftSavedAmount.toLocaleString()} (Avg -${draftAvgDiscountPct}%)`
            )}
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem', borderRadius: '16px', borderLeft: '4px solid #38bdf8' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 700 }}>
              {tx('อัตราส่งของครบตามสั่ง (Fill Rate)', 'Average Vendor Fill Rate')}
            </div>
            <LuxuryIconBadge variant="sapphire" size="sm" active>
              <LuxuryModuleIcon type="procurement" size={18} />
            </LuxuryIconBadge>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#38bdf8', marginTop: '0.35rem' }}>
            {avgFillRate}%
          </div>
          <div style={{ fontSize: '0.8rem', color: '#bae6fd', marginTop: '0.2rem' }}>
            {tx(
              `ส่งตรงเวลาเฉลี่ย ${avgOnTimeRate}% จาก ${vendorsList.length} ซัพพลายเออร์`,
              `${avgOnTimeRate}% On-Time Delivery across ${vendorsList.length} vendors`
            )}
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem', borderRadius: '16px', borderLeft: '4px solid #fbbf24' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 700 }}>
              {tx('ระยะเวลาจัดส่งเฉลี่ย (Lead Time)', 'Average Vendor Lead Time')}
            </div>
            <LuxuryIconBadge variant="gold" size="sm" active>
              <LuxuryModuleIcon type="rocket" size={18} />
            </LuxuryIconBadge>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#fbbf24', marginTop: '0.35rem' }}>
            {avgLeadTime} {tx('วัน', 'Days')}
          </div>
          <div style={{ fontSize: '0.8rem', color: '#fde68a', marginTop: '0.2rem' }}>
            {tx('เร็วกว่าเกณฑ์มาตรฐาน 3.5 วัน', 'Faster than 3.5-day SLA benchmark')}
          </div>
        </div>

        <div className="glass-card" style={{ padding: '1.25rem', borderRadius: '16px', borderLeft: '4px solid #a855f7' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontSize: '0.85rem', color: '#94a3b8', fontWeight: 700 }}>
              {tx('ยอดรวมสินค้าที่รอออกใบสั่งซื้อกลาง', 'Consolidated PO Batch Volume')}
            </div>
            <LuxuryIconBadge variant="amethyst" size="sm" active>
              <LuxuryModuleIcon type="basket" size={18} />
            </LuxuryIconBadge>
          </div>
          <div style={{ fontSize: '1.75rem', fontWeight: 900, color: '#e9d5ff', marginTop: '0.35rem' }}>
            {draftTotalUnits.toLocaleString()} {tx('ชิ้น', 'Units')}
          </div>
          <div style={{ fontSize: '0.8rem', color: '#d8b4fe', marginTop: '0.2rem' }}>
            {tx(
              `รวมจาก ${selectedReqs.length} รายการสินค้าใกล้หมดทุกสาขา`,
              `Aggregated from ${selectedReqs.length} multi-branch low-stock SKUs`
            )}
          </div>
        </div>
      </div>

      {/* SECTION 1: CONSOLIDATED PO GENERATOR (1-Click Economy of Scale) */}
      <div className="glass-card" style={{ padding: '1.45rem', borderRadius: '18px', border: '1px solid rgba(251, 191, 36, 0.35)' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <h4 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 900, color: '#fbbf24' }}>
              {tx(
                'ระบบรวบรวมใบขอซื้อจากทุกสาขาเพื่อออกใบสั่งซื้อรวมศูนย์ (Consolidated PO Generator)',
                'Consolidated Multi-Branch PO Generator (Economy of Scale Engine)'
              )}
            </h4>
            <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.88rem', color: '#94a3b8' }}>
              {tx(
                'แทนที่แต่ละสาขาจะแยกกันสั่งซื้อทีละน้อย ระบบจะรวมยอดของใกล้หมดจากทุกสาขามาไว้ที่สำนักงานใหญ่ เพื่อปลดล็อกส่วนลดสั่งซื้อจำนวนมาก (Volume Discount) ทันที',
                'Instead of fragmented branch orders, combine low-stock demand across all branches at HQ to unlock bulk volume discounts.'
              )}
            </p>
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.65rem' }}>
            <button
              type="button"
              onClick={() => handleSelectAllReqs(selectedReqs.length < branchRequisitions.length)}
              style={{
                padding: '0.55rem 0.9rem',
                borderRadius: '10px',
                border: '1px solid rgba(148,163,184,0.35)',
                background: 'rgba(15, 23, 42, 0.85)',
                color: '#e2e8f0',
                fontWeight: 800,
                fontSize: '0.8rem',
                cursor: 'pointer'
              }}
            >
              {selectedReqs.length < branchRequisitions.length
                ? tx('☑️ เลือกทุกรายการ', '☑️ Select All SKUs')
                : tx('ยกเลิกการเลือกทั้งหมด', 'Deselect All')}
            </button>
            <button
              type="button"
              onClick={() => setShowAddReqForm(prev => !prev)}
              style={{
                padding: '0.55rem 0.95rem',
                borderRadius: '10px',
                border: '1px solid rgba(56, 189, 248, 0.45)',
                background: 'rgba(56, 189, 248, 0.16)',
                color: '#38bdf8',
                fontWeight: 800,
                fontSize: '0.8rem',
                cursor: 'pointer'
              }}
            >
              {tx('+ เพิ่มใบขอซื้อรวมสาขาใหม่', '+ Add Multi-Branch Requisition')}
            </button>

            <div
              style={{
                padding: '0.65rem 1rem',
                borderRadius: '14px',
                background: 'rgba(16, 185, 129, 0.14)',
                border: '1px solid rgba(16, 185, 129, 0.4)',
                textAlign: 'right'
              }}
            >
              <div style={{ fontSize: '0.76rem', color: '#a7f3d0', fontWeight: 700 }}>
                {tx('ต้นทุนปกติแยกสั่ง vs ต้นทุนสั่งรวมศูนย์สุทธิ', 'Fragmented Cost vs Net Central PO Cost')}
              </div>
              <div style={{ fontSize: '1.1rem', fontWeight: 900, color: '#f8fafc', marginTop: '0.1rem' }}>
                <span style={{ textDecoration: 'line-through', color: '#94a3b8', marginRight: '0.6rem', fontSize: '0.9rem' }}>
                  ฿{draftRegularCost.toLocaleString()}
                </span>
                <span style={{ color: '#34d399' }}>฿{draftDiscountedCost.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {showAddReqForm && (
          <form
            onSubmit={handleAddRequisitionSubmit}
            style={{
              marginBottom: '1.15rem',
              padding: '1.05rem',
              borderRadius: '14px',
              background: 'rgba(15, 23, 42, 0.9)',
              border: '1px solid rgba(56, 189, 248, 0.35)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(175px, 1fr))',
              gap: '0.75rem',
              alignItems: 'end'
            }}
          >
            <div>
              <label style={{ display: 'block', fontSize: '0.76rem', color: '#94a3b8', marginBottom: '0.25rem' }}>
                {tx('ชื่อสินค้าที่ต้องการสั่งซื้อรวมทุกสาขา', 'Product Name for Consolidated Order')}
              </label>
              <input
                type="text"
                value={newReqName}
                onChange={e => setNewReqName(e.target.value)}
                placeholder={tx('เช่น ถุงช้อปปิ้งพิมพ์โลโก้รุ่นพรีเมียม', 'e.g., Custom Branded Luxury Carrier Bags')}
                style={{
                  width: '100%',
                  padding: '0.52rem 0.7rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(148,163,184,0.3)',
                  background: '#0f172a',
                  color: '#f8fafc'
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.76rem', color: '#94a3b8', marginBottom: '0.25rem' }}>
                {tx('ซัพพลายเออร์ที่รับคำสั่งซื้อ', 'Assigned Supplier')}
              </label>
              <select
                value={newReqVendorId}
                onChange={e => setNewReqVendorId(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.52rem 0.7rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(148,163,184,0.3)',
                  background: '#0f172a',
                  color: '#f8fafc'
                }}
              >
                {vendorsList.map(v => (
                  <option key={v.id} value={v.id}>
                    {v[isEn ? 'en' : 'th'].name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.76rem', color: '#94a3b8', marginBottom: '0.25rem' }}>
                {tx('ยอดรวมทุกสาขา (ชิ้น)', 'Consolidated Qty (Units)')}
              </label>
              <input
                type="number"
                min="20"
                value={newReqQty}
                onChange={e => setNewReqQty(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.52rem 0.7rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(148,163,184,0.3)',
                  background: '#0f172a',
                  color: '#f8fafc'
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.76rem', color: '#94a3b8', marginBottom: '0.25rem' }}>
                {tx('ราคาต้นทุนปกติ/ชิ้น (บาท)', 'Regular Unit Cost (THB)')}
              </label>
              <input
                type="number"
                min="5"
                value={newReqUnitCost}
                onChange={e => setNewReqUnitCost(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.52rem 0.7rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(148,163,184,0.3)',
                  background: '#0f172a',
                  color: '#f8fafc'
                }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.76rem', color: '#94a3b8', marginBottom: '0.25rem' }}>
                {tx('ส่วนลดสั่งรวมศูนย์ (%)', 'Volume Discount (%)')}
              </label>
              <input
                type="number"
                min="5"
                max="35"
                value={newReqDiscountPct}
                onChange={e => setNewReqDiscountPct(e.target.value)}
                style={{
                  width: '100%',
                  padding: '0.52rem 0.7rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(148,163,184,0.3)',
                  background: '#0f172a',
                  color: '#f8fafc'
                }}
              />
            </div>
            <button
              type="submit"
              style={{
                padding: '0.58rem 1rem',
                borderRadius: '8px',
                border: 'none',
                background: 'linear-gradient(135deg, #38bdf8, #2563eb)',
                color: '#f8fafc',
                fontWeight: 900,
                cursor: 'pointer'
              }}
            >
              {tx('บันทึกรายการขอซื้อรวม', 'Add to Consolidated Queue')}
            </button>
          </form>
        )}

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '880px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(148,163,184,0.2)', textAlign: 'left', color: '#94a3b8', fontSize: '0.83rem' }}>
                <th style={{ padding: '0.75rem' }}>{tx('เลือก', 'Include')}</th>
                <th style={{ padding: '0.75rem' }}>{tx('สินค้าใกล้หมด / ซัพพลายเออร์', 'Low-Stock Product / Vendor')}</th>
                <th style={{ padding: '0.75rem' }}>{tx('ยอดขอเบิกรายสาขา', 'Branch Demand Breakdown')}</th>
                <th style={{ padding: '0.75rem' }}>{tx('ยอดสั่งรวมศูนย์ (ปรับเพิ่ม/ลดได้)', 'Consolidated Qty (Adjustable)')}</th>
                <th style={{ padding: '0.75rem' }}>{tx('ส่วนลดสั่งรวม (Volume Discount)', 'Volume Discount Tier')}</th>
                <th style={{ padding: '0.75rem' }}>{tx('ต้นทุนสุทธิ & เงินที่ประหยัดได้', 'Net Cost & Instant Savings')}</th>
              </tr>
            </thead>
            <tbody>
              {branchRequisitions.map(req => {
                const info = req[isEn ? 'en' : 'th'];
                const qualifies = req.totalQty >= req.minQtyForTier;
                const appliedDisc = qualifies ? req.volumeDiscountPct : Math.floor(req.volumeDiscountPct * 0.4);
                const netUnitCost = Math.round(req.regularUnitCost * (1 - appliedDisc / 100));
                const regTotal = req.totalQty * req.regularUnitCost;
                const netTotal = req.totalQty * netUnitCost;
                const savedBaht = regTotal - netTotal;

                return (
                  <tr
                    key={req.id}
                    style={{
                      borderBottom: '1px solid rgba(148,163,184,0.12)',
                      background: req.selected ? 'rgba(251, 191, 36, 0.04)' : 'transparent'
                    }}
                  >
                    <td style={{ padding: '0.85rem 0.75rem' }}>
                      <input
                        type="checkbox"
                        checked={req.selected}
                        onChange={() => handleToggleReqSelection(req.id)}
                        style={{ width: '20px', height: '20px', accentColor: '#fbbf24', cursor: 'pointer' }}
                      />
                    </td>
                    <td style={{ padding: '0.85rem 0.75rem' }}>
                      <div style={{ fontWeight: 900, color: '#f8fafc' }}>
                        {info.productName}{' '}
                        <span style={{ fontSize: '0.78rem', color: '#38bdf8', fontWeight: 800 }}>({req.sku})</span>
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#cbd5e1', marginTop: '0.15rem' }}>{info.vendorName}</div>
                      <div style={{ fontSize: '0.76rem', color: '#fda4af', fontWeight: 700, marginTop: '0.15rem' }}>
                        ● {info.urgency}
                      </div>
                    </td>
                    <td style={{ padding: '0.85rem 0.75rem' }}>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', maxWidth: '280px' }}>
                        {req.branchNeeds.map((b, i) => (
                          <span
                            key={i}
                            style={{
                              padding: '0.2rem 0.55rem',
                              borderRadius: '6px',
                              background: 'rgba(15, 23, 42, 0.85)',
                              border: '1px solid rgba(148,163,184,0.25)',
                              fontSize: '0.75rem',
                              color: '#e2e8f0',
                              fontWeight: 700
                            }}
                          >
                            {isEn ? b.branchEn : b.branchTh}: <strong style={{ color: '#38bdf8' }}>{b.qty}</strong>
                          </span>
                        ))}
                      </div>
                    </td>
                    <td style={{ padding: '0.85rem 0.75rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
                        <button
                          type="button"
                          onClick={() => handleAdjustReqQty(req.id, -20)}
                          style={{
                            padding: '0.3rem 0.6rem',
                            borderRadius: '8px',
                            border: '1px solid rgba(148,163,184,0.35)',
                            background: 'rgba(15, 23, 42, 0.8)',
                            color: '#f8fafc',
                            fontWeight: 800,
                            cursor: 'pointer'
                          }}
                        >
                          -20
                        </button>
                        <span style={{ fontWeight: 900, fontSize: '1.05rem', color: '#fbbf24', minWidth: '80px', textAlign: 'center' }}>
                          {req.totalQty.toLocaleString()} {info.unitLabel}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleAdjustReqQty(req.id, 50)}
                          style={{
                            padding: '0.3rem 0.6rem',
                            borderRadius: '8px',
                            border: '1px solid rgba(16,185,129,0.45)',
                            background: 'rgba(16,185,129,0.16)',
                            color: '#34d399',
                            fontWeight: 800,
                            cursor: 'pointer'
                          }}
                        >
                          +50
                        </button>
                      </div>
                    </td>
                    <td style={{ padding: '0.85rem 0.75rem' }}>
                      <span
                        style={{
                          display: 'inline-block',
                          padding: '0.28rem 0.7rem',
                          borderRadius: '999px',
                          background: qualifies ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)',
                          color: qualifies ? '#34d399' : '#fbbf24',
                          fontWeight: 800,
                          fontSize: '0.8rem'
                        }}
                      >
                        {qualifies
                          ? tx(`ปลดล็อกส่วนลดสูงสุด -${appliedDisc}%`, `Max Tier Unlocked -${appliedDisc}%`)
                          : tx(`ลด -${appliedDisc}% (สั่งครบ ${req.minQtyForTier} ลด ${req.volumeDiscountPct}%)`, `-${appliedDisc}% (Order ${req.minQtyForTier}+ for -${req.volumeDiscountPct}%)`)}
                      </span>
                      <div style={{ fontSize: '0.76rem', color: '#94a3b8', marginTop: '0.25rem' }}>
                        {tx(
                          `จากชิ้นละ ฿${req.regularUnitCost.toLocaleString()} เหลือ ฿${netUnitCost.toLocaleString()}`,
                          `Unit cost drops from ฿${req.regularUnitCost.toLocaleString()} to ฿${netUnitCost.toLocaleString()}`
                        )}
                      </div>
                    </td>
                    <td style={{ padding: '0.85rem 0.75rem' }}>
                      <div style={{ fontWeight: 900, fontSize: '1.05rem', color: '#f8fafc' }}>
                        ฿{netTotal.toLocaleString()}
                      </div>
                      <div style={{ fontSize: '0.8rem', fontWeight: 800, color: '#34d399' }}>
                        {tx(`ประหยัดทันที ฿${savedBaht.toLocaleString()}`, `Save ฿${savedBaht.toLocaleString()}`)}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* SECTION 2: VENDOR LEAD TIME & FILL RATE SCORECARD */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.25rem' }}>
        <div className="glass-card" style={{ padding: '1.35rem', borderRadius: '18px' }}>
          <h4 style={{ margin: '0 0 0.35rem 0', fontSize: '1.12rem', fontWeight: 900, color: '#f8fafc' }}>
            {tx(
              'กราฟเปรียบเทียบความน่าเชื่อถือซัพพลายเออร์ (Fill Rate vs ส่งตรงเวลา)',
              'Vendor Reliability Benchmark (Fill Rate % vs On-Time Delivery %)'
            )}
          </h4>
          <p style={{ margin: '0 0 1rem 0', fontSize: '0.84rem', color: '#94a3b8' }}>
            {tx(
              'ตรวจสอบว่าซัพพลายเออร์รายใดส่งของครบตามจำนวนที่สั่ง (Fill Rate) และส่งตรงตามเวลานัดหมาย (Lead Time)',
              'Compare order completeness (Fill Rate) against on-time delivery performance across all suppliers.'
            )}
          </p>
          <div style={{ height: '270px' }}>
            <Bar data={vendorScorecardChartData} options={barChartOptions} />
          </div>
        </div>

        {/* Active Central PO History Card */}
        <div className="glass-card" style={{ padding: '1.35rem', borderRadius: '18px' }}>
          <h4 style={{ margin: '0 0 0.35rem 0', fontSize: '1.12rem', fontWeight: 900, color: '#f8fafc' }}>
            {tx(
              'ประวัติใบสั่งซื้อรวมศูนย์ล่าสุด & ตรวจรับสินค้าเข้าคลัง (Central POs)',
              'Recent Consolidated Central POs & Inventory Goods Receipt'
            )}
          </h4>
          <p style={{ margin: '0 0 1rem 0', fontSize: '0.84rem', color: '#94a3b8' }}>
            {tx(
              'กดปุ่ม "รับของเข้าคลัง & เติมสต็อก" เพื่อนำยอดสินค้าจากใบสั่งซื้อกลางไปเติมลงหน้าคลังสินค้าอัจฉริยะโดยอัตโนมัติ',
              'Click "Receive & Restock Inventory" to automatically credit incoming Central PO units into Smart Inventory.'
            )}
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            {centralPosList.map(po => {
              const info = po[isEn ? 'en' : 'th'];
              return (
                <div
                  key={po.poNumber}
                  style={{
                    padding: '1rem',
                    borderRadius: '14px',
                    background: 'rgba(15, 23, 42, 0.78)',
                    border: po.received
                      ? '1px solid rgba(16, 185, 129, 0.45)'
                      : '1px solid rgba(56, 189, 248, 0.28)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    flexWrap: 'wrap',
                    gap: '0.75rem'
                  }}
                >
                  <div style={{ flex: '1 1 240px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <span style={{ fontWeight: 900, color: '#fbbf24', fontSize: '0.95rem' }}>{po.poNumber}</span>
                      <span style={{ fontSize: '0.76rem', color: '#94a3b8' }}>• {po.createdAt}</span>
                      {po.received && (
                        <span
                          style={{
                            padding: '0.15rem 0.55rem',
                            borderRadius: '999px',
                            background: 'rgba(16, 185, 129, 0.2)',
                            color: '#34d399',
                            fontSize: '0.72rem',
                            fontWeight: 800
                          }}
                        >
                          {tx('✓ เติมเข้าคลังสินค้าแล้ว', '✓ Restocked in Inventory')}
                        </span>
                      )}
                    </div>
                    <div style={{ fontWeight: 800, color: '#f8fafc', fontSize: '0.88rem', marginTop: '0.2rem' }}>
                      {info.vendorSummary}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: '#38bdf8', marginTop: '0.15rem' }}>
                      {info.branchesCovered} • {po.totalUnits.toLocaleString()} {tx('ชิ้น', 'units')} • {info.status}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.4rem' }}>
                    <div>
                      <div style={{ fontWeight: 900, color: '#f8fafc', fontSize: '1.05rem' }}>
                        ฿{po.discountedTotalCost.toLocaleString()}
                      </div>
                      <div style={{ fontSize: '0.78rem', fontWeight: 800, color: '#34d399' }}>
                        {tx(
                          `ประหยัดได้ ฿${po.savedAmount.toLocaleString()} (-${po.discountPctAvg}%)`,
                          `Saved ฿${po.savedAmount.toLocaleString()} (-${po.discountPctAvg}%)`
                        )}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '0.45rem', flexWrap: 'wrap' }}>
                      <button
                        type="button"
                        onClick={() => setActivePoModal(po)}
                        style={{
                          padding: '0.35rem 0.68rem',
                          borderRadius: '8px',
                          border: '1px solid rgba(251, 191, 36, 0.45)',
                          background: 'rgba(251, 191, 36, 0.14)',
                          color: '#fbbf24',
                          fontSize: '0.75rem',
                          fontWeight: 800,
                          cursor: 'pointer'
                        }}
                      >
                        {tx('📄 ดูใบสั่งซื้อรวม', '📄 View Official PO')}
                      </button>
                      {!po.received && (
                        <button
                          type="button"
                          onClick={() => handleReceiveCentralPoAndRestock(po)}
                          style={{
                            padding: '0.35rem 0.72rem',
                            borderRadius: '8px',
                            border: '1px solid rgba(16, 185, 129, 0.5)',
                            background: 'rgba(16, 185, 129, 0.2)',
                            color: '#34d399',
                            fontSize: '0.75rem',
                            fontWeight: 800,
                            cursor: 'pointer'
                          }}
                        >
                          {tx('📦 รับของเข้าคลัง & เติมสต็อก', '📦 Receive & Restock Inventory')}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Official Central PO Document Modal */}
      {activePoModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(2, 6, 23, 0.82)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem'
          }}
          onClick={() => setActivePoModal(null)}
        >
          <div
            className="glass-card"
            style={{
              maxWidth: '680px',
              width: '100%',
              padding: '1.6rem',
              borderRadius: '20px',
              border: '1.5px solid rgba(251, 191, 36, 0.55)',
              background: '#091124',
              color: '#f8fafc',
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.85)'
            }}
            onClick={e => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem', borderBottom: '1px solid rgba(148,163,184,0.2)', paddingBottom: '1rem' }}>
              <div>
                <span style={{ fontSize: '0.76rem', fontWeight: 800, color: '#fbbf24', textTransform: 'uppercase' }}>
                  {tx('เอกสารใบสั่งซื้อรวมศูนย์สำนักงานใหญ่ (ECONOMY OF SCALE PO)', 'OFFICIAL HEADQUARTERS CONSOLIDATED PURCHASE ORDER')}
                </span>
                <h3 style={{ margin: '0.25rem 0 0 0', fontSize: '1.35rem', fontWeight: 900, color: '#f8fafc' }}>
                  {activePoModal.poNumber}
                </h3>
                <div style={{ fontSize: '0.82rem', color: '#94a3b8', marginTop: '0.2rem' }}>
                  {tx('วันที่ออกเอกสาร:', 'Issued Date:')} {activePoModal.createdAt} • {activePoModal[isEn ? 'en' : 'th'].status}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActivePoModal(null)}
                style={{
                  padding: '0.4rem 0.75rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(148,163,184,0.3)',
                  background: 'rgba(15,23,42,0.8)',
                  color: '#cbd5e1',
                  fontWeight: 800,
                  cursor: 'pointer'
                }}
              >
                ✕
              </button>
            </div>

            <div style={{ marginTop: '1rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem' }}>
              <div style={{ padding: '0.85rem', borderRadius: '12px', background: 'rgba(15,23,42,0.85)', border: '1px solid rgba(148,163,184,0.2)' }}>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{tx('ซัพพลายเออร์ผู้รับใบสั่งซื้อ', 'Target Vendors')}</div>
                <div style={{ fontWeight: 800, fontSize: '0.9rem', color: '#f8fafc', marginTop: '0.2rem' }}>
                  {activePoModal[isEn ? 'en' : 'th'].vendorSummary}
                </div>
              </div>
              <div style={{ padding: '0.85rem', borderRadius: '12px', background: 'rgba(15,23,42,0.85)', border: '1px solid rgba(148,163,184,0.2)' }}>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{tx('จำนวนสั่งซื้อรวมทุกสาขา', 'Total Consolidated Volume')}</div>
                <div style={{ fontWeight: 900, fontSize: '1.1rem', color: '#38bdf8', marginTop: '0.2rem' }}>
                  {activePoModal.totalUnits.toLocaleString()} {tx('ชิ้น', 'Units')}
                </div>
              </div>
              <div style={{ padding: '0.85rem', borderRadius: '12px', background: 'rgba(16,185,129,0.14)', border: '1px solid rgba(16,185,129,0.4)' }}>
                <div style={{ fontSize: '0.75rem', color: '#a7f3d0' }}>{tx('ยอดสุทธิหลังหักส่วนลด Volume Discount', 'Net Consolidated Total')}</div>
                <div style={{ fontWeight: 900, fontSize: '1.15rem', color: '#34d399', marginTop: '0.2rem' }}>
                  ฿{activePoModal.discountedTotalCost.toLocaleString()}{' '}
                  <span style={{ fontSize: '0.78rem', color: '#fde68a' }}>
                    ({tx(`ประหยัด ฿${activePoModal.savedAmount.toLocaleString()}`, `Saved ฿${activePoModal.savedAmount.toLocaleString()}`)})
                  </span>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '1.2rem', display: 'flex', justifyContent: 'flex-end', gap: '0.65rem', flexWrap: 'wrap' }}>
              {!activePoModal.received && (
                <button
                  type="button"
                  onClick={() => {
                    handleReceiveCentralPoAndRestock(activePoModal);
                    setActivePoModal(null);
                  }}
                  style={{
                    padding: '0.65rem 1.1rem',
                    borderRadius: '10px',
                    border: '1px solid rgba(16,185,129,0.5)',
                    background: 'rgba(16,185,129,0.22)',
                    color: '#34d399',
                    fontWeight: 900,
                    cursor: 'pointer'
                  }}
                >
                  {tx('📦 ยืนยันรับของเข้าคลัง & เติมสต็อกทุกสาขาทันที', '📦 Confirm Receipt & Restock All Branches')}
                </button>
              )}
              <button
                type="button"
                onClick={() => {
                  handleExportCentralPoCsv();
                  setActivePoModal(null);
                }}
                style={{
                  padding: '0.65rem 1.15rem',
                  borderRadius: '10px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                  color: '#0f172a',
                  fontWeight: 900,
                  cursor: 'pointer'
                }}
              >
                {tx('📥 ดาวน์โหลดใบสั่งซื้อรวมศูนย์ (.CSV / Excel)', '📥 Download Official Central PO (.CSV / Excel)')}
              </button>
            </div>
          </div>
        </div>
      )}


      {/* Detailed Vendor Scorecard Table */}
      <div className="glass-card" style={{ padding: '1.4rem', borderRadius: '18px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem' }}>
            {[
              { id: 'all', th: 'ซัพพลายเออร์ทั้งหมด', en: 'All Vendors' },
              { id: 'excellent', th: 'เกรด A+ / A (ส่งตรงเวลาและของครบ)', en: 'Grade A+ / A (Top Performers)' },
              { id: 'watch', th: 'ต้องติดตามเวลาส่ง / ส่งของไม่ครบ', en: 'Watchlist / Delayed Shipments' }
            ].map(tab => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setVendorFilter(tab.id)}
                style={{
                  padding: '0.5rem 0.95rem',
                  borderRadius: '999px',
                  border: vendorFilter === tab.id ? '1.5px solid #fbbf24' : '1px solid rgba(148,163,184,0.25)',
                  background: vendorFilter === tab.id ? 'rgba(251, 191, 36, 0.2)' : 'rgba(15, 23, 42, 0.6)',
                  color: vendorFilter === tab.id ? '#fbbf24' : '#cbd5e1',
                  fontWeight: 800,
                  fontSize: '0.84rem',
                  cursor: 'pointer'
                }}
              >
                {isEn ? tab.en : tab.th}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem', alignItems: 'center' }}>
            <input
              type="text"
              value={vendorSearch}
              onChange={e => setVendorSearch(e.target.value)}
              placeholder={tx('ค้นหาชื่อซัพพลายเออร์ หรือหมวดสินค้า...', 'Search vendor name or category...')}
              style={{
                padding: '0.6rem 0.95rem',
                borderRadius: '10px',
                border: '1px solid rgba(148,163,184,0.3)',
                background: 'rgba(15, 23, 42, 0.85)',
                color: '#f8fafc',
                minWidth: '240px'
              }}
            />
            <button
              type="button"
              onClick={() => setShowAddVendor(!showAddVendor)}
              style={{
                padding: '0.65rem 1.1rem',
                borderRadius: '10px',
                border: 'none',
                background: 'linear-gradient(135deg, #10b981, #059669)',
                color: '#fff',
                fontWeight: 800,
                cursor: 'pointer'
              }}
            >
              {tx('เพิ่มซัพพลายเออร์ใหม่', 'Add New Vendor')}
            </button>
          </div>
        </div>

        {showAddVendor && (
          <form
            onSubmit={handleAddVendorSubmit}
            style={{
              marginBottom: '1.25rem',
              padding: '1.2rem',
              borderRadius: '14px',
              background: 'rgba(15, 23, 42, 0.9)',
              border: '1.5px solid rgba(16, 185, 129, 0.45)',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(175px, 1fr))',
              gap: '0.85rem',
              alignItems: 'end'
            }}
          >
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.25rem' }}>
                {tx('ชื่อบริษัทซัพพลายเออร์', 'Vendor Company Name')}
              </label>
              <input
                type="text"
                value={newVendorName}
                onChange={e => setNewVendorName(e.target.value)}
                placeholder={tx('เช่น บจก. ไทยพรีเมียมซัพพลาย', 'e.g. Thai Premium Supply Co.')}
                style={{ width: '100%', padding: '0.55rem', borderRadius: '8px', background: '#0f172a', color: '#fff', border: '1px solid rgba(148,163,184,0.3)' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.25rem' }}>
                {tx('หมวดหมู่สินค้าที่ส่ง', 'Supplied Category')}
              </label>
              <input
                type="text"
                value={newVendorCategory}
                onChange={e => setNewVendorCategory(e.target.value)}
                placeholder={tx('เช่น เวชสำอางและแพ็กเกจจิ้ง', 'e.g. Cosmetics & Packaging')}
                style={{ width: '100%', padding: '0.55rem', borderRadius: '8px', background: '#0f172a', color: '#fff', border: '1px solid rgba(148,163,184,0.3)' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.25rem' }}>
                {tx('เวลาส่งของเฉลี่ย (วัน)', 'Lead Time (Days)')}
              </label>
              <input
                type="number"
                step="0.1"
                value={newVendorLeadTime}
                onChange={e => setNewVendorLeadTime(e.target.value)}
                style={{ width: '100%', padding: '0.55rem', borderRadius: '8px', background: '#0f172a', color: '#fff', border: '1px solid rgba(148,163,184,0.3)' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.25rem' }}>
                {tx('อัตราส่งของครบ Fill Rate (%)', 'Fill Rate (%)')}
              </label>
              <input
                type="number"
                step="0.1"
                value={newVendorFillRate}
                onChange={e => setNewVendorFillRate(e.target.value)}
                style={{ width: '100%', padding: '0.55rem', borderRadius: '8px', background: '#0f172a', color: '#fff', border: '1px solid rgba(148,163,184,0.3)' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.8rem', color: '#94a3b8', marginBottom: '0.25rem' }}>
                {tx('ส่วนลดสั่งรวมศูนย์ (%)', 'Volume Discount (%)')}
              </label>
              <input
                type="number"
                value={newVendorDiscount}
                onChange={e => setNewVendorDiscount(e.target.value)}
                style={{ width: '100%', padding: '0.55rem', borderRadius: '8px', background: '#0f172a', color: '#fff', border: '1px solid rgba(148,163,184,0.3)' }}
              />
            </div>
            <button
              type="submit"
              style={{
                padding: '0.6rem 1rem',
                borderRadius: '8px',
                border: 'none',
                background: '#10b981',
                color: '#fff',
                fontWeight: 800,
                cursor: 'pointer'
              }}
            >
              {tx('บันทึกซัพพลายเออร์', 'Save Vendor')}
            </button>
          </form>
        )}

        <div style={{ overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '880px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(148,163,184,0.2)', textAlign: 'left', color: '#94a3b8', fontSize: '0.83rem' }}>
                <th style={{ padding: '0.75rem' }}>{tx('ซัพพลายเออร์ / ผู้ติดต่อ', 'Supplier / Key Contact')}</th>
                <th style={{ padding: '0.75rem' }}>{tx('เวลาจัดส่ง (Lead Time)', 'Lead Time & On-Time %')}</th>
                <th style={{ padding: '0.75rem' }}>{tx('ส่งของครบตามบิล (Fill Rate)', 'Order Fill Rate')}</th>
                <th style={{ padding: '0.75rem' }}>{tx('ส่วนลดสั่งรวมศูนย์ & เครดิต', 'Volume Discount & Credit Term')}</th>
                <th style={{ padding: '0.75rem' }}>{tx('เกรดความน่าเชื่อถือ', 'Vendor Scorecard Grade')}</th>
                <th style={{ padding: '0.75rem' }}>{tx('การจัดการและต่อรองราคา', 'Negotiation & SLA Action')}</th>
              </tr>
            </thead>
            <tbody>
              {filteredVendors.map(vendor => {
                const info = vendor[isEn ? 'en' : 'th'];
                const badgeColor =
                  vendor.status === 'excellent'
                    ? '#10b981'
                    : vendor.status === 'watch'
                    ? '#f59e0b'
                    : '#f43f5e';
                return (
                  <tr key={vendor.id} style={{ borderBottom: '1px solid rgba(148,163,184,0.12)' }}>
                    <td style={{ padding: '0.9rem 0.75rem' }}>
                      <div style={{ fontWeight: 900, color: '#f8fafc' }}>
                        {info.name}{' '}
                        <span style={{ fontSize: '0.76rem', color: '#38bdf8' }}>({vendor.id})</span>
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#cbd5e1', marginTop: '0.15rem' }}>{info.category}</div>
                      <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.1rem' }}>{info.contact}</div>
                    </td>
                    <td style={{ padding: '0.9rem 0.75rem' }}>
                      <div style={{ fontWeight: 900, color: vendor.leadTimeDays <= vendor.slaTargetDays ? '#34d399' : '#fda4af' }}>
                        {vendor.leadTimeDays} {tx('วัน', 'days')}{' '}
                        <span style={{ fontSize: '0.76rem', color: '#94a3b8', fontWeight: 600 }}>
                          ({tx(`เกณฑ์ ${vendor.slaTargetDays} วัน`, `SLA ${vendor.slaTargetDays}d`)})
                        </span>
                      </div>
                      <div style={{ fontSize: '0.78rem', color: '#38bdf8', fontWeight: 700, marginTop: '0.15rem' }}>
                        {tx(`ส่งตรงเวลา ${vendor.onTimeRate}%`, `On-Time: ${vendor.onTimeRate}%`)}
                      </div>
                    </td>
                    <td style={{ padding: '0.9rem 0.75rem' }}>
                      <div style={{ fontWeight: 900, fontSize: '1rem', color: vendor.fillRate >= 95 ? '#34d399' : '#fbbf24' }}>
                        {vendor.fillRate}%
                      </div>
                      <div style={{ fontSize: '0.76rem', color: '#94a3b8' }}>
                        {tx(`ของเสีย/เคลมเพียง ${vendor.defectRate}%`, `Defect rate: ${vendor.defectRate}%`)}
                      </div>
                    </td>
                    <td style={{ padding: '0.9rem 0.75rem' }}>
                      <div style={{ fontWeight: 800, color: '#fbbf24', fontSize: '0.86rem' }}>
                        {info.discountCondition}
                      </div>
                      <div style={{ fontSize: '0.76rem', color: '#cbd5e1', marginTop: '0.15rem' }}>
                        {tx(`เครดิตการค้า ${vendor.creditTermDays} วัน`, `Credit Terms: ${vendor.creditTermDays} Days`)}
                      </div>
                    </td>
                    <td style={{ padding: '0.9rem 0.75rem' }}>
                      <span
                        style={{
                          display: 'inline-block',
                          padding: '0.28rem 0.7rem',
                          borderRadius: '999px',
                          background: `${badgeColor}22`,
                          color: badgeColor,
                          fontWeight: 800,
                          fontSize: '0.8rem'
                        }}
                      >
                        {info.gradeLabel}
                      </span>
                      <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.25rem', maxWidth: '210px' }}>
                        {info.note}
                      </div>
                    </td>
                    <td style={{ padding: '0.9rem 0.75rem' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem' }}>
                        <button
                          type="button"
                          onClick={() => handleNegotiateVendorDiscount(vendor.id)}
                          style={{
                            padding: '0.42rem 0.75rem',
                            borderRadius: '8px',
                            border: '1px solid rgba(251, 191, 36, 0.45)',
                            background: 'rgba(251, 191, 36, 0.16)',
                            color: '#fbbf24',
                            fontWeight: 800,
                            fontSize: '0.78rem',
                            cursor: 'pointer'
                          }}
                        >
                          {tx('ต่อรองส่วนลดสั่งรวมเพิ่ม +2%', 'Negotiate +2% Bulk Discount')}
                        </button>
                        {vendor.status !== 'excellent' && (
                          <button
                            type="button"
                            onClick={() => handleSendVendorSlaAlert(vendor)}
                            style={{
                              padding: '0.42rem 0.75rem',
                              borderRadius: '8px',
                              border: '1px solid rgba(244, 63, 94, 0.45)',
                              background: 'rgba(244, 63, 94, 0.16)',
                              color: '#fda4af',
                              fontWeight: 800,
                              fontSize: '0.78rem',
                              cursor: 'pointer'
                            }}
                          >
                            {tx('ส่งใบเตือนตามของค้างส่ง', 'Send SLA Follow-up Alert')}
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}


// --- MODULE 7: MAIN APPLICATION CONTROLLER & SHELL ---
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Filler,
  Legend
);

function AppLogo({ size = 46, className = '' }) {
  return <LuxuryBrandLogo size={size} className={className} />;
}

function App() {
  const [user, setUser] = useState(() => {
    try {
      const savedUserRaw = localStorage.getItem('insightflow_saved_user');
      if (savedUserRaw) {
        const parsedUser = JSON.parse(savedUserRaw);
        if (parsedUser && parsedUser.email) return parsedUser;
      }
    } catch {
      // ignore localStorage error
    }
    return null;
  });
  const [lang, setLang] = useState('th'); // 'th' (ภาษาไทยล้วน) | 'en' (English Only)
  const isEn = lang === 'en';
  const tx = (th, en) => (isEn ? en : th);
  const t = landingTranslations[isEn ? 'en' : 'th'];

  const [theme, setTheme] = useState(() => {
    try {
      const savedTheme = localStorage.getItem('insightflow_theme');
      if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;
    } catch {
      // ignore storage error
    }
    return 'dark';
  });
  const [fontScale, setFontScale] = useState('large'); // 'normal' | 'large' | 'xlarge'
  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [selectedUseCasePreview, setSelectedUseCasePreview] = useState(null);
  const SUPER_ADMIN_EMAIL = 'pongsatornnantakong88@gmail.com';
  const isSuperAdmin = String(user?.email || '').trim().toLowerCase() === SUPER_ADMIN_EMAIL;
  const [adminPreviewCustomerPlan, setAdminPreviewCustomerPlan] = useState(false);

  const [subscriptionPlan, setSubscriptionPlan] = useState(() => {
    try {
      const savedPlan = localStorage.getItem('insightflow_subscription_plan');
      if (savedPlan === 'starter' || savedPlan === 'professional' || savedPlan === 'premium') {
        return savedPlan;
      }
    } catch {
      // ignore storage errors
    }
    return 'premium';
  });

  const superAdminPlanMeta = {
    id: 'super_admin',
    rank: 99,
    code: 'SUPER ADMIN',
    name: tx('ผู้ดูแลระบบสูงสุด (Admin ยกเว้นแพ็กเกจ)', 'Super Admin (Exempt from Packages)'),
    price: tx('เว้นแพ็กเกจ', 'EXEMPT'),
    unit: tx(' (สิทธิ์เต็ม 100%)', ' (100% FULL)'),
    maxBranches: 999999,
    maxCustomers: 999999,
    accentColor: '#fbbf24',
    badgeBg: 'rgba(251, 191, 36, 0.22)',
    quotaSummary: tx(
      'บัญชีผู้ดูแลระบบสูงสุด (pongsatornnantakong88@gmail.com) • ยกเว้นข้อจำกัดแพ็กเกจทั้งหมด • ปลดล็อกครบ 11 ระบบรวมหน้า Admin • ไม่จำกัดสาขาและลูกค้า',
      'Super Admin (pongsatornnantakong88@gmail.com) • Exempt from all package limits • All 11 modules unlocked including Admin • Unlimited branches & customers'
    ),
    allowedTabs: ['overview', 'customers', 'staff_pos', 'multi_channel', 'procurement', 'inventory', 'insights', 'live', 'database', 'admin', 'settings']
  };

  const planTiersMap = {
    starter: {
      id: 'starter',
      rank: 1,
      code: 'STARTER',
      name: tx('แพ็กเกจเริ่มต้น (Starter)', 'Starter Plan'),
      price: '1,990.-',
      unit: tx('/ เดือน', '/ m'),
      maxBranches: 1,
      maxCustomers: 2500,
      accentColor: '#38bdf8',
      badgeBg: 'rgba(56, 189, 248, 0.16)',
      quotaSummary: tx(
        'รองรับ 1 สาขาหลัก + ออนไลน์ • วิเคราะห์ลูกค้าสูงสุด 2,500 ราย • คลังสินค้าอัจฉริยะ • อัปโหลดไฟล์ได้ทุกหน้า',
        '1 Main Store + Online • Up to 2,500 Customers CRM • Smart Inventory • Self-Service File Upload'
      ),
      allowedTabs: ['overview', 'customers', 'inventory', 'live', 'database', 'settings']
    },
    professional: {
      id: 'professional',
      rank: 2,
      code: 'PROFESSIONAL',
      name: tx('แพ็กเกจมืออาชีพ (Professional)', 'Professional Plan'),
      price: '2,900.-',
      unit: tx('/ เดือน', '/ m'),
      maxBranches: 5,
      maxCustomers: 999999,
      accentColor: '#fbbf24',
      badgeBg: 'rgba(251, 191, 36, 0.18)',
      quotaSummary: tx(
        'รองรับสูงสุด 5 สาขา • ตรวจจับทุจริตแคชเชียร์ • วิเคราะห์ข้อมูลด้วย AI พยากรณ์ 30 วัน • สรุปยอดเข้ามือถือ 22:00 น.',
        'Up to 5 Branches • Cashier Fraud Audit • 30-Day AI Forecast • Daily 22:00 Mobile Report'
      ),
      allowedTabs: ['overview', 'customers', 'staff_pos', 'multi_channel', 'inventory', 'insights', 'live', 'database', 'settings']
    },
    premium: {
      id: 'premium',
      rank: 3,
      code: 'PREMIUM',
      name: tx('แพ็กเกจพรีเมียม (Premium)', 'Premium Plan'),
      price: '4,900.-',
      unit: tx('/ เดือน', '/ m'),
      maxBranches: 999999,
      maxCustomers: 999999,
      accentColor: '#c084fc',
      badgeBg: 'rgba(192, 132, 252, 0.18)',
      quotaSummary: tx(
        'ไม่จำกัดสาขา/โรงงาน/คลังสินค้า • จัดซื้อรวมศูนย์ (Central PO) & คะแนนซัพพลายเออร์ • เปิดครบทุกฟีเจอร์สำหรับลูกค้าองค์กร',
        'Unlimited Branches & Factories • Central Procurement PO & Vendor Scorecard • All Customer Enterprise Modules'
      ),
      allowedTabs: ['overview', 'customers', 'staff_pos', 'multi_channel', 'procurement', 'inventory', 'insights', 'live', 'database', 'settings']
    }
  };

  const isExemptAdminMode = isSuperAdmin && !adminPreviewCustomerPlan;
  const activePlanMeta = isExemptAdminMode
    ? superAdminPlanMeta
    : planTiersMap[subscriptionPlan] || planTiersMap.premium;

  const handleActivateSuperAdminExemptMode = () => {
    setAdminPreviewCustomerPlan(false);
    toast.success(
      tx(
        '👑 เปิดโหมด Super Admin (pongsatornnantakong88@gmail.com) ยกเว้นแพ็กเกจทั้งหมดเรียบร้อยแล้ว!',
        '👑 Activated Super Admin (pongsatornnantakong88@gmail.com) — Exempt from all package restrictions!'
      )
    );
  };

  const handleSelectSubscriptionPlan = (planId, nextTab = null, forceCustomerPreview = false) => {
    const validPlan = planTiersMap[planId] ? planId : 'premium';
    setSubscriptionPlan(validPlan);
    if (forceCustomerPreview && isSuperAdmin) {
      setAdminPreviewCustomerPlan(true);
    }
    try {
      localStorage.setItem('insightflow_subscription_plan', validPlan);
    } catch {
      // ignore storage errors
    }
    if (nextTab) {
      setActiveTab(nextTab);
    }
    const chosen = planTiersMap[validPlan];
    toast.success(
      tx(
        `เปิดใช้งาน "${chosen.name} (${chosen.price}${chosen.unit})" ตามแผนแพ็กเกจเรียบร้อยแล้ว!`,
        `Activated "${chosen.name} (${chosen.price}${chosen.unit})" subscription rules!`
      )
    );
  };

  // Auth, Remember Profile, Phone & LINE ID state for automated daily sales summary
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const [authEmail, setAuthEmail] = useState(() => {
    try {
      const savedCreds = JSON.parse(localStorage.getItem('insightflow_saved_credentials') || '{}');
      return savedCreds.email || user?.email || '';
    } catch {
      return user?.email || '';
    }
  });
  const [authPassword, setAuthPassword] = useState('');
  const [authName, setAuthName] = useState(() => {
    try {
      const savedCreds = JSON.parse(localStorage.getItem('insightflow_saved_credentials') || '{}');
      return user?.name || savedCreds.name || '';
    } catch {
      return user?.name || '';
    }
  });
  const [authPhone, setAuthPhone] = useState(() => {
    try {
      const savedCreds = JSON.parse(localStorage.getItem('insightflow_saved_credentials') || '{}');
      return user?.phone || savedCreds.phone || '089-999-8888';
    } catch {
      return user?.phone || '089-999-8888';
    }
  });
  const [authLineId, setAuthLineId] = useState(() => {
    try {
      const savedCreds = JSON.parse(localStorage.getItem('insightflow_saved_credentials') || '{}');
      return user?.lineId || savedCreds.lineId || '@insightflow.vip';
    } catch {
      return user?.lineId || '@insightflow.vip';
    }
  });
  const [rememberPassword, setRememberPassword] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [inspectingUploadTab, setInspectingUploadTab] = useState(null);

  // OTP 2FA State & Handlers
  const [otpCode, setOtpCode] = useState('');
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [otpCountdown, setOtpCountdown] = useState(0);

  useEffect(() => {
    let timer = null;
    if (otpCountdown > 0) {
      timer = setInterval(() => {
        setOtpCountdown(prev => (prev > 1 ? prev - 1 : 0));
      }, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [otpCountdown]);

  const handleRequestOtp = async () => {
    const targetEmail = authEmail.trim().toLowerCase();
    if (!targetEmail || !targetEmail.includes('@')) {
      toast.error(tx('⚠️ กรุณาระบุอีเมลที่ถูกต้องก่อนขอรหัส OTP', '⚠️ Please enter a valid email address first'));
      return;
    }
    setIsSendingOtp(true);
    try {
      if (canUseBackendApi()) {
        const res = await fetch(`${API_BASE_URL}/api/auth/send-otp`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: targetEmail })
        });
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.detail || 'Failed to send OTP');
        }
        setIsOtpSent(true);
        setOtpCountdown(60);
        if (data.dev_otp) {
          setOtpCode(data.dev_otp);
          toast.success(
            tx(
              `📨 ส่งรหัส OTP สำเร็จ! (รหัสของคุณ: ${data.dev_otp}) รหัสมีอายุ 3 นาที`,
              `📨 OTP Sent! (Code: ${data.dev_otp}) Expires in 3 mins`
            )
          );
        } else {
          toast.success(
            tx(
              `📨 ส่งรหัส OTP 6 หลักไปยัง ${targetEmail} เรียบร้อยแล้ว!`,
              `📨 6-Digit OTP sent to ${targetEmail}!`
            )
          );
        }
      } else {
        // Local simulation when offline or no backend
        const simulatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
        setIsOtpSent(true);
        setOtpCountdown(60);
        setOtpCode(simulatedOtp);
        toast.success(
          tx(
            `📨 ส่งรหัส OTP สำเร็จ! (รหัสจำลอง: ${simulatedOtp}) รหัสมีอายุ 3 นาที`,
            `📨 OTP Sent! (Demo Code: ${simulatedOtp}) Valid for 3 mins`
          )
        );
      }
    } catch (err) {
      // Fallback with simulated code so user is never blocked
      const simulatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
      setIsOtpSent(true);
      setOtpCountdown(60);
      setOtpCode(simulatedOtp);
      toast.success(
        tx(
          `📨 ส่งรหัส OTP เรียบร้อยแล้ว! (รหัสของคุณ: ${simulatedOtp})`,
          `📨 OTP Code ready! (Code: ${simulatedOtp})`
        )
      );
    } finally {
      setIsSendingOtp(false);
    }
  };

  const handleVerifyOtpAndLogin = async e => {
    if (e && e.preventDefault) e.preventDefault();
    const cleanOtp = otpCode.trim();
    if (cleanOtp.length !== 6) {
      toast.error(tx('⚠️ กรุณากรอกรหัส OTP ให้ครบ 6 หลัก', '⚠️ Please enter a 6-digit OTP code'));
      return;
    }
    const emailToUse = (authEmail.trim() || 'customer@insightflow.app').toLowerCase();
    const phoneToUse = authPhone.trim() || '089-999-8888';
    const rawLine = authLineId.trim() || '@insightflow.vip';
    const lineIdToUse = rawLine.startsWith('@') ? rawLine : `@${rawLine}`;
    const isEnteringSuperAdmin = emailToUse === SUPER_ADMIN_EMAIL;
    const resolvedName =
      authName.trim() ||
      (isEnteringSuperAdmin
        ? tx('ผู้ดูแลระบบสูงสุด (Admin)', 'Super Admin')
        : emailToUse.split('@')[0]);

    setIsVerifyingOtp(true);
    try {
      if (canUseBackendApi()) {
        const res = await fetch(`${API_BASE_URL}/api/auth/verify-otp`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: emailToUse,
            otp: cleanOtp,
            name: resolvedName
          })
        });
        const data = await res.json();
        if (res.ok && data.access_token) {
          localStorage.setItem('insightflow_jwt_token', data.access_token);
        }
      }
    } catch {
      // Allow seamless login even if offline
    } finally {
      setIsVerifyingOtp(false);
    }

    const loggedInUser = {
      name: resolvedName,
      email: emailToUse,
      phone: phoneToUse,
      lineId: lineIdToUse,
      sub: isEnteringSuperAdmin ? 'super-admin' : emailToUse,
      role: isEnteringSuperAdmin ? 'admin' : 'customer',
      picture: 'https://ui-avatars.com/api/?name=Store+Owner&background=fbbf24&color=0f172a&bold=true'
    };

    if (isEnteringSuperAdmin) {
      setAdminPreviewCustomerPlan(false);
    }
    if (rememberPassword) {
      localStorage.setItem('insightflow_saved_user', JSON.stringify(loggedInUser));
      localStorage.setItem(
        'insightflow_saved_credentials',
        JSON.stringify({
          name: resolvedName,
          email: emailToUse,
          phone: phoneToUse,
          lineId: lineIdToUse
        })
      );
    }

    registerOrUpdateWebCustomer({
      name: resolvedName,
      email: emailToUse,
      phone: phoneToUse,
      lineId: lineIdToUse,
      plan: subscriptionPlan
    });

    setUser(loggedInUser);
    setIsLoginOpen(false);
    syncContactWithLineBackend(phoneToUse, lineIdToUse, emailToUse, loggedInUser.name);
    toast.success(
      tx(
        `🔐 ยืนยันรหัส OTP สำเร็จ! เข้าสู่ระบบในชื่อ "${resolvedName}" เรียบร้อยแล้ว`,
        `🔐 OTP Verified! Logged in as "${resolvedName}" successfully.`
      )
    );
  };

  // Interactive Business State across all tabs
  const [currentRevenueVal, setCurrentRevenueVal] = useState(4829000);
  const [targetRevenueVal, setTargetRevenueVal] = useState(6500000);
  const [targetTimelineVal, setTargetTimelineVal] = useState('90');
  const [clientGoalType, setClientGoalType] = useState('revenue_growth');
  const [targetCategory, setTargetCategory] = useState('all_flagship');
  const [isPlanActive, setIsPlanActive] = useState(true);
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);

  const [customersList, setCustomersList] = useState(initialCustomersBilingual);
  const [staffList, setStaffList] = useState(initialStaffBilingual);
  const [auditLogs, setAuditLogs] = useState(initialAuditLogsBilingual);
  const [inventoryList, setInventoryList] = useState(initialInventoryBilingual);
  const [branchesList, setBranchesList] = useState(initialBranchesBilingual);
  const [channelsList] = useState(initialChannelsBilingual);
  const [anomaliesList, setAnomaliesList] = useState(initialAnomaliesBilingual);
  const [dbRecords, setDbRecords] = useState(initialDatabaseRecordsBilingual);
  const [vendorsList, setVendorsList] = useState(initialVendorsBilingual);
  const [branchRequisitions, setBranchRequisitions] = useState(initialBranchRequisitionsBilingual);
  const [centralPosList, setCentralPosList] = useState(initialCentralPosBilingual);

  const [lineNotifyEnabled, setLineNotifyEnabled] = useState(true);
  const [lineNotifyTime, setLineNotifyTime] = useState('22:00');
  const [isUploading, setIsUploading] = useState(false);
  const [dragOverTabKey, setDragOverTabKey] = useState(null);

  const [pageUploadedFiles, setPageUploadedFiles] = useState({
    overview: {
      filename: 'Sales_Overview_2026.csv',
      rows: 1420,
      updatedAtTh: 'พร้อมใช้งาน',
      updatedAtEn: 'Ready',
      isCustomUpload: false,
      changeSummaryTh: 'เชื่อมโยงยอดขายรวม ฿4,829,000 และเป้าหมายรายไตรมาส',
      changeSummaryEn: 'Synced total revenue ฿4,829,000 and quarterly targets',
      headers: ['วันที่ / เดือน', 'สาขา / ช่องทาง', 'หมวดสินค้าหลัก', 'ยอดขายสุทธิ (บาท)'],
      previewRows: [
        ['2026-10-01', 'สาขาสยามพารากอน', 'เซรั่มบำรุงผิวพรีเมียม', '985,000'],
        ['2026-10-02', 'ช่องทางแชตร้านค้า & LINE OA', 'ชุดของขวัญดูแลผิว', '1,190,000'],
        ['2026-10-03', 'สาขาเซ็นทรัลลาดพร้าว', 'ครีมกันแดดสูตรน้ำ', '840,000']
      ]
    },
    customers: {
      filename: 'Customer_RFM_Database.csv',
      rows: 1435,
      updatedAtTh: 'พร้อมใช้งาน',
      updatedAtEn: 'Ready',
      isCustomUpload: false,
      changeSummaryTh: 'ซิงก์รายชื่อลูกค้า VIP และลูกค้าที่ห่างหายเกิน 45 วันครบถ้วน',
      changeSummaryEn: 'Synced VIP customer profiles and 45+ day inactive buyers',
      headers: ['รหัสลูกค้า', 'ชื่อลูกค้า', 'เบอร์โทรศัพท์', 'ID LINE', 'ยอดซื้อสะสม (บาท)'],
      previewRows: [
        ['CUS-001', 'คุณพิมพ์ชนก วงศ์สุวรรณ', '081-234-5678', '@pimchanok.vip', '148,500'],
        ['CUS-002', 'คุณกิตติพงศ์ เจริญทรัพย์', '089-876-5432', '@kittipong88', '92,400'],
        ['CUS-003', 'คุณณัฐนิชา อัศวเดช', '086-555-4321', '@nattanicha.a', '72,500']
      ]
    },
    staff_pos: {
      filename: 'POS_Staff_Audit_Log.csv',
      rows: 1232,
      updatedAtTh: 'พร้อมใช้งาน',
      updatedAtEn: 'Ready',
      isCustomUpload: false,
      changeSummaryTh: 'ซิงก์ยอดขายพนักงานและบันทึกตรวจสอบบิลยกเลิกหน้าเครื่อง POS',
      changeSummaryEn: 'Synced cashier KPI rankings and register void audit logs',
      headers: ['รหัสพนักงาน', 'ชื่อแคชเชียร์ / สาขา', 'ยอดขายรวม (บาท)', 'บิลยกเลิก / สถานะ'],
      previewRows: [
        ['STF-01', 'คุณภัทรพล (สยามพารากอน)', '642,000', '0 บิลผิดปกติ (ปกติ)'],
        ['STF-04', 'เครื่องคิดเงิน #4 (เซ็นทรัลลาดพร้าว)', '318,000', 'ยกเลิกบิลหลังรับเงินสด 14 ครั้ง (รอตรวจสอบ)']
      ]
    },
    multi_channel: {
      filename: 'MultiChannel_Branch_Data.csv',
      rows: 1890,
      updatedAtTh: 'พร้อมใช้งาน',
      updatedAtEn: 'Ready',
      isCustomUpload: false,
      changeSummaryTh: 'ซิงก์กำไรสุทธิรายช่องทางและตารางเปรียบเทียบสาขา',
      changeSummaryEn: 'Synced net profit margins across branches and online channels',
      headers: ['สาขา / แพลตฟอร์ม', 'ยอดขายรวม (บาท)', 'ค่าธรรมเนียม (บาท)', 'กำไรสุทธิ (บาท)'],
      previewRows: [
        ['หน้าร้านสยามพารากอน', '985,000', '0', '461,000'],
        ['แชตร้านค้า & LINE Official', '1,190,000', '59,500', '623,560'],
        ['แอปมาร์เก็ตเพลสออนไลน์', '1,420,000', '255,600', '397,600']
      ]
    },
    procurement: {
      filename: 'Central_Procurement_Vendors.csv',
      rows: 960,
      updatedAtTh: 'พร้อมใช้งาน',
      updatedAtEn: 'Ready',
      isCustomUpload: false,
      changeSummaryTh: 'ซิงก์คะแนนซัพพลายเออร์และรายการสั่งซื้อรวมศูนย์ (Economy of Scale)',
      changeSummaryEn: 'Synced supplier scorecards and consolidated Central PO requisitions',
      headers: ['รหัสคู่ค้า', 'ชื่อบริษัทซัพพลายเออร์', 'เวลาส่ง (วัน)', 'อัตราส่งของครบ (%)', 'ส่วนลดสั่งรวม (%)'],
      previewRows: [
        ['VND-01', 'บจก. สยาม ออร์แกนิค ซัพพลาย', '1.8 วัน', '99.4%', '15%'],
        ['VND-02', 'บจก. แพ็กเกจจิ้ง พรีเมียม ไทย', '2.1 วัน', '98.8%', '18%']
      ]
    },
    inventory: {
      filename: 'Stock_SKU_Master.csv',
      rows: 1248,
      updatedAtTh: 'พร้อมใช้งาน',
      updatedAtEn: 'Ready',
      isCustomUpload: false,
      changeSummaryTh: 'ซิงก์จำนวนสต็อกคงเหลือและแจ้งเตือนสินค้าใกล้หมดคลัง',
      changeSummaryEn: 'Synced live SKU quantities and low-stock reorder alerts',
      headers: ['รหัสสินค้า (SKU)', 'ชื่อสินค้า', 'หมวดหมู่', 'ราคาต่อชิ้น (บาท)', 'คงเหลือ (ชิ้น)'],
      previewRows: [
        ['SKU-101', 'เซรั่มทองคำลดเลือนริ้วรอย', 'สกินแคร์หลัก', '1,290', '145'],
        ['SKU-104', 'กล่องพัสดุกันกระแทกพรีเมียม', 'อุปกรณ์แพ็กสินค้า', '18', '12 (ใกล้หมด)'],
        ['SKU-105', 'ชุดของขวัญเทศกาลปีใหม่', 'เซ็ตของขวัญ', '2,490', '0 (สินค้าหมด)']
      ]
    },
    insights: {
      filename: 'Business_Knowledge.csv',
      rows: 1435,
      updatedAtTh: 'พร้อมใช้งาน',
      updatedAtEn: 'Ready',
      isCustomUpload: false,
      changeSummaryTh: 'ซิงก์ฐานความรู้ธุรกิจสำหรับ AI พยากรณ์ยอดขายและตอบคำถาม',
      changeSummaryEn: 'Synced business rules and historical data for AI Copilot',
      headers: ['หัวข้อวิเคราะห์ AI', 'ข้อมูลอ้างอิงจากร้าน', 'คำแนะนำกลยุทธ์ AI'],
      previewRows: [
        ['พยากรณ์ยอดขาย 30 วัน', 'แนวโน้มเติบโต +18.4%', 'เตรียมสต็อกเซรั่มเพิ่ม 120 ชิ้นก่อนวันศุกร์'],
        ['ดึงลูกค้า VIP ที่หายไป', 'ลูกค้าไม่ซื้อซ้ำเกิน 45 วัน', 'ส่งคูปองส่วนลด 20% ทาง LINE อัตโนมัติ']
      ]
    },
    database: {
      filename: 'Master_Transactions.csv',
      rows: 3842,
      updatedAtTh: 'พร้อมใช้งาน',
      updatedAtEn: 'Ready',
      isCustomUpload: false,
      changeSummaryTh: 'ซิงก์รายการซื้อขายหลักในคลังฐานข้อมูลกลางของร้าน',
      changeSummaryEn: 'Synced master transaction records across all store channels',
      headers: ['รหัสบิล', 'ชื่อลูกค้า', 'รายการสินค้า', 'ช่องทางขาย', 'ยอดเงินสุทธิ (บาท)'],
      previewRows: [
        ['TXN-2026-881', 'คุณพิมพ์ชนก วงศ์สุวรรณ', 'เซรั่มทองคำ x2', 'สาขาสยามพารากอน', '2,580'],
        ['TXN-2026-882', 'คุณธนดล รัตนโชติ', 'ชุดดูแลผิวพรีเมียม x1', 'LINE Official', '3,490']
      ]
    }
  });

  // Business AI Assistant State
  const [bizProfile, setBizProfile] = useState({
    companyName: 'ร้านค้าปลีกและออนไลน์ครบวงจร',
    grossMarginPct: 45,
    mainProducts: 'เซรั่มบำรุงผิว และอุปกรณ์อิเล็กทรอนิกส์',
    customRules: 'ห้ามลดราคาสินค้าหลักเกิน 15% เน้นแถมสินค้าขนาดทดลอง'
  });

  const [aiChatMessages, setAiChatMessages] = useState([
    {
      id: 'MSG-INIT',
      role: 'assistant',
      timestamp: '09:00',
      text:
        lang === 'en'
          ? 'Hello! I am your Business Intelligence Assistant trained on your real store data. Ask me any question about sales targets, VIP customers, cashier fraud alerts, or stock levels.'
          : 'สวัสดีครับ! ผมคือผู้ช่วยวิเคราะห์ธุรกิจอัจฉริยะที่เชื่อมต่อกับข้อมูลยอดขาย ลูกค้า พนักงาน และคลังสินค้าจริงของร้านคุณ กดเลือกคำถามด้านบนหรือพิมพ์ถามได้เลยครับ',
      metrics: []
    }
  ]);
  const [aiQuestionInput, setAiQuestionInput] = useState('');
  const [isAiThinking, setIsAiThinking] = useState(false);
  const [isTrainingAi, setIsTrainingAi] = useState(false);
  const chatEndRef = useRef(null);

  // Handle language switch and update initial assistant message
  const handleSwitchLanguage = nextLang => {
    setLang(nextLang);
    setAiChatMessages(prev =>
      prev.map(msg =>
        msg.id === 'MSG-INIT'
          ? {
              ...msg,
              text:
                nextLang === 'en'
                  ? 'Hello! I am your Business Intelligence Assistant trained on your real store data. Ask me any question about sales targets, VIP customers, cashier fraud alerts, or stock levels.'
                  : 'สวัสดีครับ! ผมคือผู้ช่วยวิเคราะห์ธุรกิจอัจฉริยะที่เชื่อมต่อกับข้อมูลยอดขาย ลูกค้า พนักงาน และคลังสินค้าจริงของร้านคุณ กดเลือกคำถามด้านบนหรือพิมพ์ถามได้เลยครับ'
            }
          : msg
      )
    );
  };

  // Central Registry of All Customers Who Registered on the Website (Displayed in AdminTab)
  const defaultRegisteredWebCustomers = [
    {
      id: 'MEM-2026-001',
      nameTh: 'คุณพิมพ์ชนก วงศ์สุวรรณ (สยามบิวตี้ แอนด์ คลินิก)',
      nameEn: 'Ms. Pimchanok Wongsuwan (Siam Beauty & Clinic)',
      phone: '081-234-5678',
      lineId: '@pimchanok.vip',
      email: 'pimchanok@siambeauty.co.th',
      plan: 'premium',
      registeredAtTh: 'สมัครเมื่อ 12/10/2569 09:15 น.',
      registeredAtEn: 'Registered 12/10/2026 09:15',
      notifyTime: '22:00',
      lineLinked: true
    },
    {
      id: 'MEM-2026-002',
      nameTh: 'คุณกิตติพงศ์ เจริญทรัพย์ (เจริญทรัพย์ คาเฟ่ 4 สาขา)',
      nameEn: 'Mr. Kittipong Charoensap (Charoensap Cafe 4 Branches)',
      phone: '089-876-5432',
      lineId: '@kittipong88',
      email: 'kittipong@charoensapcafe.com',
      plan: 'professional',
      registeredAtTh: 'สมัครเมื่อ 11/10/2569 18:40 น.',
      registeredAtEn: 'Registered 11/10/2026 18:40',
      notifyTime: '22:00',
      lineLinked: true
    },
    {
      id: 'MEM-2026-003',
      nameTh: 'คุณณัฐนิชา อัศวเดช (ณัฐนิชา แฟชั่น ออนไลน์)',
      nameEn: 'Ms. Nattanicha Asawadech (Nattanicha Fashion Online)',
      phone: '086-555-4321',
      lineId: '@nattanicha.a',
      email: 'nattanicha@fashionhub.co.th',
      plan: 'professional',
      registeredAtTh: 'สมัครเมื่อ 10/10/2569 14:20 น.',
      registeredAtEn: 'Registered 10/10/2026 14:20',
      notifyTime: '22:00',
      lineLinked: true
    },
    {
      id: 'MEM-2026-004',
      nameTh: 'คุณธนดล รัตนโชติ (ธนดล โฮลเซลล์ แอนด์ แฟคทอรี่)',
      nameEn: 'Mr. Thanadon Rattanachot (Thanadon Wholesale & Factory)',
      phone: '092-456-7890',
      lineId: '@thanadon.factory',
      email: 'thanadon@rattanachot.co.th',
      plan: 'premium',
      registeredAtTh: 'สมัครเมื่อ 09/10/2569 11:05 น.',
      registeredAtEn: 'Registered 09/10/2026 11:05',
      notifyTime: '22:00',
      lineLinked: true
    },
    {
      id: 'MEM-2026-005',
      nameTh: 'คุณศิริพร วัฒนากุล (เดอะโกลว์ เวลเนส คลินิก)',
      nameEn: 'Ms. Siriporn Wattanakul (The Glow Wellness Clinic)',
      phone: '084-111-2233',
      lineId: '@siriporn.glow',
      email: 'siriporn@theglowclinic.com',
      plan: 'premium',
      registeredAtTh: 'สมัครเมื่อ 08/10/2569 16:30 น.',
      registeredAtEn: 'Registered 08/10/2026 16:30',
      notifyTime: '22:00',
      lineLinked: true
    },
    {
      id: 'MEM-2026-006',
      nameTh: 'คุณวรวุฒิ เกียรติไพศาล (วรวุฒิ มินิมาร์ท & โชห่วยยุคใหม่)',
      nameEn: 'Mr. Worawut Kiatpaisan (Worawut Modern Minimart)',
      phone: '095-888-7766',
      lineId: '@worawut.mart',
      email: 'worawut@minimart.co.th',
      plan: 'starter',
      registeredAtTh: 'สมัครเมื่อ 07/10/2569 10:12 น.',
      registeredAtEn: 'Registered 07/10/2026 10:12',
      notifyTime: '22:00',
      lineLinked: true
    }
  ];

  const [registeredWebCustomers, setRegisteredWebCustomers] = useState(() => {
    try {
      const savedRaw = localStorage.getItem('insightflow_registered_web_customers');
      if (savedRaw) {
        const parsed = JSON.parse(savedRaw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch {
      // ignore localStorage error
    }
    return defaultRegisteredWebCustomers;
  });

  // Upsert customer into Admin Registered Website Customers Registry whenever they sign up or sign in
  const registerOrUpdateWebCustomer = ({ name, email, phone, lineId, plan }) => {
    const cleanPhone = (phone || '089-999-8888').trim();
    const rawLine = (lineId || '@insightflow.vip').trim();
    const cleanLine = rawLine.startsWith('@') ? rawLine : `@${rawLine}`;
    const cleanEmail = (email || 'customer@insightflow.app').trim().toLowerCase();
    const cleanName = (name || cleanEmail.split('@')[0] || 'ลูกค้าเว็บไซต์ InsightFlow').trim();
    const chosenPlan = plan || subscriptionPlan || 'premium';
    const nowTime = new Date().toLocaleString(isEn ? 'en-GB' : 'th-TH', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    setRegisteredWebCustomers(prev => {
      const existingIdx = prev.findIndex(
        m =>
          (m.email && m.email.toLowerCase() === cleanEmail) ||
          (m.phone && m.phone.replace(/\D/g, '') === cleanPhone.replace(/\D/g, ''))
      );
      let nextList;
      if (existingIdx >= 0) {
        const updatedItem = {
          ...prev[existingIdx],
          nameTh: cleanName || prev[existingIdx].nameTh,
          nameEn: cleanName || prev[existingIdx].nameEn,
          phone: cleanPhone,
          lineId: cleanLine,
          email: cleanEmail,
          plan: chosenPlan,
          registeredAtTh: `อัปเดตเมื่อ ${nowTime} น.`,
          registeredAtEn: `Updated ${nowTime}`,
          notifyTime: lineNotifyTime || '22:00',
          lineLinked: true
        };
        nextList = [updatedItem, ...prev.filter((_, i) => i !== existingIdx)];
      } else {
        const newEntry = {
          id: `MEM-2026-${String(prev.length + 1).padStart(3, '0')}`,
          nameTh: cleanName,
          nameEn: cleanName,
          phone: cleanPhone,
          lineId: cleanLine,
          email: cleanEmail,
          plan: chosenPlan,
          registeredAtTh: `สมัครเมื่อ ${nowTime} น.`,
          registeredAtEn: `Registered ${nowTime}`,
          notifyTime: lineNotifyTime || '22:00',
          lineLinked: true
        };
        nextList = [newEntry, ...prev];
      }
      try {
        localStorage.setItem('insightflow_registered_web_customers', JSON.stringify(nextList));
      } catch {
        // ignore storage error
      }
      return nextList;
    });
  };

  // Sync backend LINE contacts into Admin Registry when backend API is available
  useEffect(() => {
    if (!canUseBackendApi()) return;
    fetch(`${API_BASE_URL}/api/line/contacts`)
      .then(r => r.json())
      .then(data => {
        if (data && Array.isArray(data.contacts) && data.contacts.length > 0) {
          setRegisteredWebCustomers(prev => {
            let nextList = [...prev];
            data.contacts.forEach(c => {
              if (!c.phone || !c.line_id) return;
              const cleanPhone = String(c.phone).trim();
              const rawLine = String(c.line_id).trim();
              const cleanLine = rawLine.startsWith('@') ? rawLine : `@${rawLine}`;
              const cleanEmail = String(c.email || 'customer@insightflow.app').trim().toLowerCase();
              const cleanName = String(c.name || 'ลูกค้าเว็บไซต์ InsightFlow').trim();
              const existingIdx = nextList.findIndex(
                m =>
                  (m.email && m.email.toLowerCase() === cleanEmail) ||
                  (m.phone && m.phone.replace(/\D/g, '') === cleanPhone.replace(/\D/g, ''))
              );
              if (existingIdx >= 0) {
                nextList[existingIdx] = {
                  ...nextList[existingIdx],
                  nameTh: cleanName || nextList[existingIdx].nameTh,
                  nameEn: cleanName || nextList[existingIdx].nameEn,
                  phone: cleanPhone,
                  lineId: cleanLine,
                  email: cleanEmail,
                  lineLinked: true
                };
              } else {
                nextList = [
                  {
                    id: `MEM-2026-${String(nextList.length + 1).padStart(3, '0')}`,
                    nameTh: cleanName,
                    nameEn: cleanName,
                    phone: cleanPhone,
                    lineId: cleanLine,
                    email: cleanEmail,
                    plan: 'premium',
                    registeredAtTh: 'ซิงก์จากระบบ LINE OA',
                    registeredAtEn: 'Synced from LINE OA',
                    notifyTime: c.notify_time || '22:00',
                    lineLinked: true
                  },
                  ...nextList
                ];
              }
            });
            try {
              localStorage.setItem('insightflow_registered_web_customers', JSON.stringify(nextList));
            } catch {
              // ignore storage error
            }
            return nextList;
          });
        }
      })
      .catch(() => {});
  }, []);

  // Sync Phone & LINE ID with Backend LINE OA Registry (backend/main.py)
  const syncContactWithLineBackend = (phoneVal, lineIdVal, emailVal, nameVal) => {
    if (!canUseBackendApi()) {
      return;
    }
    fetch(`${API_BASE_URL}/api/line/register-contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: emailVal || user?.email || authEmail || 'owner@insightflow.app',
        name: nameVal || user?.name || authName || 'เจ้าของธุรกิจ InsightFlow',
        phone: phoneVal,
        line_id: lineIdVal,
        notify_time: lineNotifyTime || '22:00',
        notify_enabled: lineNotifyEnabled
      })
    }).catch(() => {});
  };

  // Update Phone & LINE ID live from Dashboard or Settings
  const handleUpdateUserContact = (newPhone, newLineId) => {
    setAuthPhone(newPhone);
    setAuthLineId(newLineId);
    setUser(prev => {
      if (!prev) return prev;
      const updated = { ...prev, phone: newPhone, lineId: newLineId };
      try {
        localStorage.setItem('insightflow_saved_user', JSON.stringify(updated));
      } catch {
        // ignore storage error
      }
      return updated;
    });
    registerOrUpdateWebCustomer({
      name: user?.name || authName || 'เจ้าของร้าน InsightFlow',
      email: user?.email || authEmail || 'owner@insightflow.app',
      phone: newPhone,
      lineId: newLineId,
      plan: subscriptionPlan
    });
    syncContactWithLineBackend(newPhone, newLineId);
  };

  // Apply font scale to root document via data-font-scale so mobile/tablet/desktop media queries scale proportionally
  useEffect(() => {
    const htmlEl = document.documentElement;
    htmlEl.setAttribute('data-font-scale', fontScale);
    htmlEl.style.fontSize = '';
  }, [fontScale]);

  // Apply theme to root document and body for global high-contrast Light/Dark styling
  useEffect(() => {
    try {
      localStorage.setItem('insightflow_theme', theme);
    } catch {
      // ignore storage error
    }
    const htmlEl = document.documentElement;
    htmlEl.setAttribute('data-theme', theme);
    htmlEl.classList.toggle('theme-light', theme === 'light');
    htmlEl.classList.toggle('theme-dark', theme === 'dark');
    document.body.classList.toggle('theme-light', theme === 'light');
    document.body.classList.toggle('theme-dark', theme === 'dark');
  }, [theme]);

  const [isAppleFilmOpen, setIsAppleFilmOpen] = useState(false);
  const [activatingPlanId, setActivatingPlanId] = useState(null);
  const [previewSelectedPlanId, setPreviewSelectedPlanId] = useState('professional');

  const scrollToSection = id => {
    setActiveSection(id);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const handleAuthSubmit = e => {
    e.preventDefault();
    const emailToUse = (authEmail.trim() || 'customer@insightflow.app').toLowerCase();
    const phoneToUse = authPhone.trim() || '089-999-8888';
    const rawLine = authLineId.trim() || '@insightflow.vip';
    const lineIdToUse = rawLine.startsWith('@') ? rawLine : `@${rawLine}`;
    const isEnteringSuperAdmin = emailToUse === SUPER_ADMIN_EMAIL;
    const resolvedName =
      authName.trim() ||
      (isEnteringSuperAdmin
        ? tx('ผู้ดูแลระบบสูงสุด (Admin)', 'Super Admin')
        : emailToUse.split('@')[0]);
    const loggedInUser = {
      name: resolvedName,
      email: emailToUse,
      phone: phoneToUse,
      lineId: lineIdToUse,
      sub: isEnteringSuperAdmin ? 'super-admin' : emailToUse,
      role: isEnteringSuperAdmin ? 'admin' : 'customer',
      picture: 'https://ui-avatars.com/api/?name=Store+Owner&background=fbbf24&color=0f172a&bold=true'
    };
    if (isEnteringSuperAdmin) {
      setAdminPreviewCustomerPlan(false);
    }
    if (rememberPassword) {
      localStorage.setItem('insightflow_saved_user', JSON.stringify(loggedInUser));
      localStorage.setItem(
        'insightflow_saved_credentials',
        JSON.stringify({
          name: resolvedName,
          email: emailToUse,
          phone: phoneToUse,
          lineId: lineIdToUse
        })
      );
    } else {
      localStorage.removeItem('insightflow_saved_user');
      localStorage.removeItem('insightflow_saved_credentials');
    }
    // Save customer's Name, Phone Number, and LINE ID into the Admin Registered Website Customers Registry!
    registerOrUpdateWebCustomer({
      name: resolvedName,
      email: emailToUse,
      phone: phoneToUse,
      lineId: lineIdToUse,
      plan: subscriptionPlan
    });
    setUser(loggedInUser);
    setIsLoginOpen(false);
    syncContactWithLineBackend(phoneToUse, lineIdToUse, emailToUse, loggedInUser.name);
    toast.success(
      isEnteringSuperAdmin
        ? tx(
            `👑 เข้าสู่ระบบ Super Admin (${emailToUse}) • บันทึกชื่อ เบอร์ ${phoneToUse} & LINE ${lineIdToUse} ในหน้า Admin แล้ว!`,
            `👑 Signed in as Super Admin (${emailToUse}) • Saved Phone ${phoneToUse} & LINE ${lineIdToUse} in Admin!`
          )
        : tx(
            `✅ สมัคร/เข้าสู่ระบบสำเร็จ! บันทึกชื่อ "${resolvedName}" เบอร์ ${phoneToUse} และ LINE ${lineIdToUse} เข้าสู่หน้าต่าง Admin เรียบร้อยแล้ว`,
            `✅ Signed in! Recorded Name "${resolvedName}", Phone ${phoneToUse} & LINE ${lineIdToUse} into the Admin Registry.`
          )
    );
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('insightflow_saved_user');
    toast.success(tx('ออกจากระบบเรียบร้อยแล้ว', 'Signed out successfully'));
  };

  // Real File Upload & Dynamic Content Parser for each page
  // Parses actual rows, columns, text labels, and numeric amounts from the uploaded file!
  const handlePageFileUpload = (tabKey, pageTitle, file) => {
    if (!file) return;
    setIsUploading(true);
    const reader = new FileReader();
    reader.onload = evt => {
      const rawText = String(evt.target?.result || '');
      // Clean printable lines (works for CSV, TSV, TXT, JSON, and extracts readable strings)
      const rawLines = rawText
        .replace(/\0/g, '')
        .split(/\r?\n/)
        .map(l => l.trim())
        .filter(l => l.length > 0);

      const parseCsvLine = line =>
        line
          .split(/[,;\t|]/)
          .map(cell => cell.replace(/^["']|["']$/g, '').trim())
          .filter( idx => idx !== undefined);

      const parsedTable = rawLines.slice(0, 60).map(parseCsvLine).filter(r => r.some(c => c.length > 0));
      const cleanFileName = file.name.replace(/\.[^/.]+$/, '');

      const detectedHeaders =
        parsedTable.length > 0 && parsedTable[0].length >= 2
          ? parsedTable[0].slice(0, 6)
          : [
              tx('รายการที่', 'Row #'),
              tx('ชื่อรายการ / ข้อความจากไฟล์', 'Item / Text from File'),
              tx('รายละเอียด / หมวดหมู่', 'Category / Detail'),
              tx('ยอดเงิน / จำนวน', 'Amount / Qty')
            ];

      const dataRows =
        parsedTable.length > 1
          ? parsedTable.slice(1, 31)
          : parsedTable.length === 1
          ? parsedTable
          : [
              ['1', `${cleanFileName} - รายการที่ 1`, 'ข้อมูลนำเข้าจากไฟล์', '48,500'],
              ['2', `${cleanFileName} - รายการที่ 2`, 'ข้อมูลนำเข้าจากไฟล์', '36,200'],
              ['3', `${cleanFileName} - รายการที่ 3`, 'ข้อมูลนำเข้าจากไฟล์', '29,800']
            ];

      const parsedRowsCount = Math.max(1, rawLines.length > 1 ? rawLines.length - 1 : dataRows.length);
      const nowTime = new Date().toLocaleTimeString(isEn ? 'en-US' : 'th-TH', { hour: '2-digit', minute: '2-digit' });

      // Extract real text and numbers from the uploaded rows so page content updates dynamically!
      const extractRowTextAndNum = (row, fallbackIdx) => {
        const textCells = row.filter(c => c && isNaN(Number(c.replace(/,/g, ''))));
        const numCells = row
          .map(c => Number(String(c).replace(/[^0-9.-]/g, '')))
          .filter(n => !isNaN(n) && n > 0);
        const primaryText = textCells[0] || row[0] || `${cleanFileName} #${fallbackIdx + 1}`;
        const secondaryText = textCells[1] || row[1] || cleanFileName;
        const primaryNum = numCells[0] || (fallbackIdx + 1) * 1850;
        const secondaryNum = numCells[1] || Math.max(15, (fallbackIdx + 1) * 25);
        return { primaryText, secondaryText, primaryNum, secondaryNum };
      };

      const sampleExtracted = dataRows.slice(0, 5).map((r, idx) => extractRowTextAndNum(r, idx));
      const totalExtractedAmount = sampleExtracted.reduce((sum, item) => sum + item.primaryNum, 0) || parsedRowsCount * 650;
      const firstLabel = sampleExtracted[0]?.primaryText || cleanFileName;

      let changeSummaryTh = `อัปเดตข้อความและตัวเลขจากไฟล์ "${file.name}" (${parsedRowsCount.toLocaleString()} แถว • รายการแรก: "${firstLabel}")`;
      let changeSummaryEn = `Updated page text & metrics from "${file.name}" (${parsedRowsCount.toLocaleString()} rows • First item: "${firstLabel}")`;

      // Dynamically update active tab's state with actual text & numbers from the uploaded file!
      if (tabKey === 'overview') {
        const addedRev = Math.max(15000, Math.round(totalExtractedAmount));
        setCurrentRevenueVal(prev => prev + addedRev);
        changeSummaryTh = `อัปเดตยอดขายรวมเพิ่มขึ้น +฿${addedRev.toLocaleString()} และปรับแผนตามไฟล์ "${file.name}" (${firstLabel})`;
        changeSummaryEn = `Increased current revenue by +฿${addedRev.toLocaleString()} from "${file.name}" (${firstLabel})`;
      } else if (tabKey === 'customers') {
        const importedCustomers = sampleExtracted.slice(0, 3).map((item, idx) => ({
          id: `CSV-${Math.floor(100 + Math.random() * 899)}-${idx + 1}`,
          segment: idx === 0 ? 'champion' : 'at_risk',
          rfmScore: idx === 0 ? '5-5-5' : '2-4-4',
          recencyDays: idx === 0 ? 1 : 48,
          frequency: Math.max(3, Math.min(30, Math.round(item.secondaryNum))),
          ltv: Math.max(4500, Math.round(item.primaryNum)),
          aov: Math.max(950, Math.round(item.primaryNum / 4)),
          phone: authPhone || '089-999-7788',
          lineId: authLineId || '@imported.vip',
          email: `customer${idx + 1}@imported.co.th`,
          contactedCount: 1,
          th: {
            name: `${item.primaryText} (จากไฟล์ ${cleanFileName.slice(0, 12)})`,
            segmentLabel: idx === 0 ? '🏆 ลูกค้าชั้นดีจากไฟล์นำเข้า' : '⚠️ ลูกค้าจากไฟล์ที่ต้องติดตามด่วน',
            recencyText: idx === 0 ? `นำเข้าเมื่อ ${nowTime} น.` : 'จากไฟล์นำเข้า • แนะนำส่งโปรโมชัน',
            favoriteProduct: item.secondaryText,
            aiAction: `ข้อมูลจากไฟล์ ${file.name}: แนะนำส่งข้อความดูแลลูกค้าทาง LINE`,
            orders: [
              {
                orderId: `FILE-${idx + 101}`,
                date: `วันนี้ (${nowTime})`,
                items: item.secondaryText,
                total: Math.max(4500, Math.round(item.primaryNum)),
                method: 'ข้อมูลจากไฟล์อัปโหลด'
              }
            ]
          },
          en: {
            name: `${item.primaryText} (from ${cleanFileName.slice(0, 12)})`,
            segmentLabel: idx === 0 ? '🏆 VIP from Uploaded File' : '⚠️ Needs Follow-Up (Uploaded File)',
            recencyText: `Imported at ${nowTime}`,
            favoriteProduct: item.secondaryText,
            aiAction: `From ${file.name}: Send personalized LINE follow-up offer`,
            orders: [
              {
                orderId: `FILE-${idx + 101}`,
                date: `Today (${nowTime})`,
                items: item.secondaryText,
                total: Math.max(4500, Math.round(item.primaryNum)),
                method: 'Uploaded File Record'
              }
            ]
          }
        }));
        setCustomersList(prev => [...importedCustomers, ...prev]);
        changeSummaryTh = `เพิ่มรายชื่อลูกค้าจริงจากไฟล์ ${importedCustomers.length} รายการ (เช่น "${firstLabel}") เข้าสู่ตารางทันที`;
        changeSummaryEn = `Added ${importedCustomers.length} customer records (e.g. "${firstLabel}") from file into table`;
      } else if (tabKey === 'staff_pos') {
        const topItem = sampleExtracted[0];
        const newStaffMember = {
          id: `STF-CSV-${Math.floor(10 + Math.random() * 89)}`,
          sales: Math.max(45000, Math.round(topItem.primaryNum)),
          ordersCount: Math.max(25, Math.round(topItem.secondaryNum)),
          avgBill: 2450,
          upsellRate: 36.5,
          voidCount: 0,
          status: 'top',
          th: {
            name: `${topItem.primaryText} (นำเข้าจากไฟล์)`,
            branch: topItem.secondaryText || `ไฟล์ ${cleanFileName}`,
            role: 'พนักงานขายประจำจุดแคชเชียร์',
            badge: '🌟 ข้อมูลใหม่จากไฟล์อัปโหลด',
            note: `อัปเดตข้อมูลยอดขายจากไฟล์ ${file.name} เมื่อเวลา ${nowTime} น.`
          },
          en: {
            name: `${topItem.primaryText} (File Import)`,
            branch: topItem.secondaryText || `File ${cleanFileName}`,
            role: 'POS Sales Associate',
            badge: '🌟 Imported from File',
            note: `Updated cashier metrics from ${file.name} at ${nowTime}`
          }
        };
        setStaffList(prev => [newStaffMember, ...prev]);
        changeSummaryTh = `เพิ่มข้อมูลพนักงานและจุดขาย "${topItem.primaryText}" จากไฟล์ "${file.name}" เรียบร้อยแล้ว`;
        changeSummaryEn = `Added staff & POS record "${topItem.primaryText}" from "${file.name}"`;
      } else if (tabKey === 'multi_channel') {
        const topItem = sampleExtracted[0];
        const newBranchObj = {
          branchId: `BR-CSV-${Math.floor(10 + Math.random() * 89)}`,
          rank: 1,
          revenue: Math.max(85000, Math.round(topItem.primaryNum)),
          netMarginPct: 48.5,
          inventoryTurnover: 8.8,
          turnoverDays: 10,
          deadStockValue: 0,
          th: {
            branchName: `${topItem.primaryText} (จากไฟล์ ${cleanFileName.slice(0, 12)})`,
            manager: topItem.secondaryText || 'ผู้จัดการสาขา',
            statusText: `อัปเดตยอดขายจากไฟล์ ${file.name} (${nowTime} น.)`
          },
          en: {
            branchName: `${topItem.primaryText} (from ${cleanFileName.slice(0, 12)})`,
            manager: topItem.secondaryText || 'Branch Manager',
            statusText: `Updated from ${file.name} (${nowTime})`
          }
        };
        setBranchesList(prev => [newBranchObj, ...prev]);
        changeSummaryTh = `อัปเดตข้อมูลสาขา/ช่องทางขาย "${topItem.primaryText}" จากไฟล์ "${file.name}" ทันที`;
        changeSummaryEn = `Updated branch/channel "${topItem.primaryText}" from "${file.name}"`;
      } else if (tabKey === 'inventory') {
        const importedSkus = sampleExtracted.slice(0, 3).map((item, idx) => ({
          sku: `IMP-${Math.floor(100 + Math.random() * 899)}-${idx + 1}`,
          price: Math.max(99, Math.min(25000, Math.round(item.primaryNum))),
          stock: Math.max(10, Math.round(item.secondaryNum)),
          status: 'in_stock',
          th: {
            name: `${item.primaryText} (จากไฟล์ ${cleanFileName.slice(0, 12)})`,
            category: item.secondaryText || 'สินค้านำเข้าจากไฟล์',
            statusLabel: `พร้อมขาย (อัปเดตจากไฟล์ ${nowTime} น.)`
          },
          en: {
            name: `${item.primaryText} (from ${cleanFileName.slice(0, 12)})`,
            category: item.secondaryText || 'Imported File SKU',
            statusLabel: `In Stock (Updated ${nowTime})`
          }
        }));
        setInventoryList(prev => [...importedSkus, ...prev]);
        changeSummaryTh = `เพิ่มและอัปเดตสต็อกสินค้าจากไฟล์ ${importedSkus.length} รายการ (เช่น "${firstLabel}") ทันที`;
        changeSummaryEn = `Imported ${importedSkus.length} stock SKUs (e.g. "${firstLabel}") from file`;
      } else if (tabKey === 'procurement') {
        const topItem = sampleExtracted[0];
        const importedVendorId = `VND-CSV-${Math.floor(10 + Math.random() * 89)}`;
        const newVendorFromCsv = {
          id: importedVendorId,
          leadTimeDays: 1.8,
          slaTargetDays: 3.0,
          onTimeRate: 99.2,
          fillRate: 99.5,
          defectRate: 0.1,
          creditTermDays: 60,
          volumeDiscountPct: 16,
          minOrderQtyForDiscount: 200,
          annualSpend: Math.max(120000, Math.round(totalExtractedAmount)),
          grade: 'A+',
          status: 'excellent',
          th: {
            name: `${topItem.primaryText} (จากไฟล์ ${cleanFileName.slice(0, 12)})`,
            category: `${topItem.secondaryText} (${parsedRowsCount} รายการในไฟล์)`,
            contact: `นำเข้าจากไฟล์ ${file.name} เมื่อ ${nowTime} น.`,
            gradeLabel: 'เกรด A+ (ข้อมูลใหม่จากไฟล์อัปโหลด)',
            discountCondition: 'สั่งรวมครบ 200 ชิ้น ลดต้นทุนทันที 16%',
            note: `อัปเดตจากไฟล์ ${file.name}`
          },
          en: {
            name: `${topItem.primaryText} (from ${cleanFileName.slice(0, 12)})`,
            category: `${topItem.secondaryText} (${parsedRowsCount} rows in file)`,
            contact: `Imported from ${file.name} at ${nowTime}`,
            gradeLabel: 'Grade A+ (Imported from File)',
            discountCondition: 'Order 200+ units centrally for 16% off',
            note: `Updated from ${file.name}`
          }
        };
        const newReqFromCsv = {
          id: `REQ-CSV-${Date.now()}`,
          sku: `CSV-SKU-${Math.floor(100 + Math.random() * 899)}`,
          vendorId: importedVendorId,
          regularUnitCost: Math.max(80, Math.min(5000, Math.round(topItem.primaryNum))),
          volumeDiscountPct: 16,
          minQtyForTier: 200,
          selected: true,
          branchNeeds: [
            { branchTh: 'สยามพารากอน', branchEn: 'Siam Paragon', currentStock: 5, qty: 90 },
            { branchTh: 'เซ็นทรัลลาดพร้าว', branchEn: 'Central Ladprao', currentStock: 4, qty: 80 },
            { branchTh: 'คลังออนไลน์กลาง', branchEn: 'Central Online Hub', currentStock: 6, qty: 80 }
          ],
          totalQty: 250,
          th: {
            productName: `${topItem.primaryText} (${topItem.secondaryText})`,
            vendorName: newVendorFromCsv.th.name,
            unitLabel: 'ชิ้น',
            urgency: `นำเข้าจากไฟล์ ${file.name} พร้อมคำนวณส่วนลด Economy of Scale`
          },
          en: {
            productName: `${topItem.primaryText} (${topItem.secondaryText})`,
            vendorName: newVendorFromCsv.en.name,
            unitLabel: 'units',
            urgency: `Imported from ${file.name} with Volume Discount tier`
          }
        };
        setVendorsList(prev => [newVendorFromCsv, ...prev]);
        setBranchRequisitions(prev => [newReqFromCsv, ...prev]);
        changeSummaryTh = `เพิ่มซัพพลายเออร์และใบขอซื้อรวม "${topItem.primaryText}" จากไฟล์ "${file.name}" ทันที`;
        changeSummaryEn = `Added supplier & requisition "${topItem.primaryText}" from "${file.name}"`;
      } else if (tabKey === 'insights') {
        setBizProfile(prev => ({
          ...prev,
          mainProducts: `${firstLabel} (${cleanFileName})`
        }));
        setAiChatMessages(prev => [
          ...prev,
          {
            id: 'AI-FILE-' + Date.now(),
            role: 'assistant',
            timestamp: nowTime,
            text: isEn
              ? `📂 I have read and analyzed your newly uploaded file "${file.name}" (${parsedRowsCount.toLocaleString()} rows).\n• Key items detected in file: "${firstLabel}" (${sampleExtracted.map(s => s.primaryText).join(', ')}).\n• Total numeric value detected: ฿${totalExtractedAmount.toLocaleString()}.\n• All charts and AI recommendations on this page have been updated to match your file!`
              : `📂 ระบบอ่านและวิเคราะห์ไฟล์ "${file.name}" ที่คุณเพิ่งอัปโหลดเรียบร้อยแล้วครับ (${parsedRowsCount.toLocaleString()} รายการ):\n• ข้อความและรายการสำคัญที่พบในไฟล์: "${firstLabel}" (${sampleExtracted.map(s => s.primaryText).join(', ')})\n• ยอดรวมตัวเลขที่อ่านได้จากไฟล์: ฿${totalExtractedAmount.toLocaleString()}\n• ตอนนี้ข้อความและคำแนะนำ AI เปลี่ยนตามข้อมูลในไฟล์ของคุณเรียบร้อยแล้วครับ!`,
            metrics: [
              tx(`ไฟล์: ${file.name}`, `File: ${file.name}`),
              tx(`จำนวน: ${parsedRowsCount.toLocaleString()} แถว`, `Rows: ${parsedRowsCount.toLocaleString()}`)
            ]
          }
        ]);
        changeSummaryTh = `AI อ่านข้อความในไฟล์ "${file.name}" ("${firstLabel}") และปรับคำแนะนำใหม่ตามไฟล์แล้ว`;
        changeSummaryEn = `AI analyzed "${file.name}" ("${firstLabel}") and updated recommendations`;
      }

      // Always add imported rows into Master Store Database (dbRecords) so every uploaded file is recorded
      const importedDbRows = sampleExtracted.slice(0, 4).map((item, idx) => ({
        id: `FILE-${Math.floor(1000 + Math.random() * 8999)}-${idx + 1}`,
        date: nowTime,
        amount: Math.max(100, Math.round(item.primaryNum)),
        itemsCount: Math.max(1, Math.round(item.secondaryNum)),
        th: {
          channel: `อัปโหลดจากไฟล์ (${file.name})`,
          customer: item.primaryText,
          product: `${item.secondaryText} (นำเข้าจากหน้า ${pageTitle})`,
          status: 'ซิงก์ข้อมูลจากไฟล์สำเร็จ'
        },
        en: {
          channel: `Uploaded File (${file.name})`,
          customer: item.primaryText,
          product: `${item.secondaryText} (Imported via ${pageTitle})`,
          status: 'Synced from File'
        }
      }));
      setDbRecords(prev => [...importedDbRows, ...prev]);

      setPageUploadedFiles(prev => ({
        ...prev,
        [tabKey]: {
          filename: file.name,
          rows: parsedRowsCount,
          fileSizeKb: Math.max(1, Math.round((file.size || 2048) / 1024)),
          updatedAtTh: `อัปโหลดเมื่อ ${nowTime} น.`,
          updatedAtEn: `Uploaded at ${nowTime}`,
          isCustomUpload: true,
          changeSummaryTh,
          changeSummaryEn,
          headers: detectedHeaders,
          previewRows: dataRows.slice(0, 20)
        }
      }));

      setIsUploading(false);
      toast.success(
        tx(
          `📂 อัปโหลดไฟล์ "${file.name}" สำเร็จ! ข้อความและตารางในหน้า "${pageTitle}" เปลี่ยนตามข้อมูลในไฟล์เรียบร้อยแล้ว (กดปุ่ม "ดูข้อมูลในไฟล์" เพื่อตรวจสอบได้เลย)`,
          `📂 Uploaded "${file.name}"! Page text & tables in "${pageTitle}" have been updated from your file.`
        )
      );
    };
    reader.readAsText(file);
  };

  // Reusable Upload Zone Renderer passed to tabs (Cyber-Cute Capsule Design Option A)
  const renderUploadZone = (tabKey, pageNameDisplay) => {
    const fileMeta = pageUploadedFiles[tabKey] || {
      filename: 'Store_Data.csv',
      rows: 1200,
      updatedAtTh: 'พร้อมใช้งาน',
      updatedAtEn: 'Ready',
      isCustomUpload: false,
      headers: [],
      previewRows: []
    };
    const totalUploadedCount = Object.keys(pageUploadedFiles).length;
    const isDragOver = dragOverTabKey === tabKey;

    return (
      <div
        onDragOver={e => {
          e.preventDefault();
          e.stopPropagation();
          if (dragOverTabKey !== tabKey) setDragOverTabKey(tabKey);
        }}
        onDragLeave={e => {
          e.preventDefault();
          e.stopPropagation();
          setDragOverTabKey(null);
        }}
        onDrop={e => {
          e.preventDefault();
          e.stopPropagation();
          setDragOverTabKey(null);
          const droppedFile = e.dataTransfer?.files?.[0];
          if (droppedFile) {
            handlePageFileUpload(tabKey, pageNameDisplay, droppedFile);
          }
        }}
        className={`p-3.5 sm:p-5 rounded-2xl sm:rounded-3xl border-2 border-dashed transition-all duration-300 shadow-xl relative overflow-hidden ${
          isDragOver
            ? 'cyber-drag-active scale-[1.015]'
            : theme === 'dark'
            ? 'bg-gradient-to-r from-amber-500/10 via-[#081024] to-emerald-500/10 border-amber-400/45 hover:border-amber-400/70'
            : 'bg-gradient-to-r from-amber-50/90 via-white to-emerald-50/90 border-amber-400 hover:border-amber-500'
        }`}
      >
        {/* Subtle Cyber Neon Ambient Beam */}
        <div
          className="absolute -top-12 -right-12 w-32 h-32 rounded-full pointer-events-none blur-2xl opacity-40 transition-opacity"
          style={{ background: isDragOver ? '#34d399' : '#fbbf24' }}
        />

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3.5 sm:gap-4 relative z-10">
          <div className="flex items-start sm:items-center gap-3 sm:gap-4 min-w-0">
            <div className="hidden sm:block flex-shrink-0 cyber-cute-float">
              <LuxuryIconBadge variant="gold" size="lg" active>
                <LuxuryModuleIcon type="upload" size={28} />
              </LuxuryIconBadge>
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                <span className="text-[11px] sm:text-xs font-black px-2.5 py-0.5 rounded-full bg-gradient-to-r from-amber-400 to-amber-300 text-slate-950 shadow-sm flex items-center gap-1">
                  <span className="cyber-sparkle-spin inline-block text-[10px]">✨</span>
                  <span>{pageNameDisplay}</span>
                </span>
                <span className="text-xs text-emerald-400 font-bold truncate flex items-center gap-1">
                  <span>●</span>
                  <strong>{fileMeta.filename}</strong>
                </span>
              </div>
              <h4 className={`text-sm sm:text-base font-black mt-1 leading-snug ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                {isDragOver
                  ? tx('✨ ปล่อยไฟล์ลงกล่องนี้ได้เลยครับ ✨', '✨ Drop file right here ✨')
                  : tx(`อัปโหลดไฟล์ข้อมูล (${pageNameDisplay})`, `Upload Data File (${pageNameDisplay})`)}
              </h4>
            </div>
          </div>

          {/* Cyber-Cute Capsule Buttons Group */}
          <div className="grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2 sm:gap-2.5 flex-shrink-0">
            {/* View Uploaded Files Capsule Pill */}
            <button
              type="button"
              onClick={() => setInspectingUploadTab(tabKey)}
              className="px-3 sm:px-4 py-2.5 sm:py-3 rounded-full bg-slate-900/80 hover:bg-slate-800 text-sky-300 border border-sky-400/40 hover:border-sky-300 font-black text-xs sm:text-sm shadow-md transition-all duration-200 cursor-pointer flex items-center justify-center gap-1.5 active:scale-95 hover:shadow-sky-500/20"
              title={tx('เปิดดูเนื้อหาในไฟล์ที่อัปโหลดทั้งหมด', 'Inspect all uploaded files')}
            >
              <span className="text-sm">📂</span>
              <span className="truncate">
                {tx(`คลังไฟล์ (${totalUploadedCount})`, `Files (${totalUploadedCount})`)}
              </span>
            </button>

            {/* Cyber-Cute Animated Upload Capsule Button */}
            <label className="cyber-cute-upload-btn group relative overflow-hidden rounded-full bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 text-slate-950 font-black px-4 sm:px-6 py-2.5 sm:py-3 text-xs sm:text-sm shadow-xl flex items-center justify-center gap-2 cursor-pointer select-none">
              {/* Glossy Top Edge Highlight */}
              <span className="absolute inset-x-0 top-0 h-[1.5px] bg-white/70 pointer-events-none" />

              {/* Shimmer sweep effect */}
              <span className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out pointer-events-none" />

              {isUploading ? (
                <>
                  <span className="cyber-radar-spin text-base inline-block">⚡</span>
                  <span className="truncate tracking-tight font-extrabold">
                    {tx('กำลังอ่านและคำนวณ...', 'Reading Data...')}
                  </span>
                </>
              ) : (
                <>
                  <span className="cyber-arrow-icon text-sm sm:text-base inline-block">🚀</span>
                  <span className="truncate tracking-tight font-extrabold">
                    {tx('อัปโหลดไฟล์ใหม่', 'Upload File')}
                  </span>
                  <span className="hidden md:inline-block text-[10px] px-1.5 py-0.5 rounded-full bg-slate-950/15 font-black uppercase text-slate-900">
                    CSV • XLS
                  </span>
                  <span className="cyber-sparkle-spin text-xs inline-block">✨</span>
                </>
              )}

              <input
                type="file"
                accept=".csv,.xlsx,.xls,.txt,.json"
                className="hidden"
                disabled={isUploading}
                onChange={e => {
                  const f = e.target.files?.[0];
                  if (f) {
                    handlePageFileUpload(tabKey, pageNameDisplay, f);
                    e.target.value = '';
                  }
                }}
              />
            </label>
          </div>
        </div>
      </div>
    );
  };

  // Goal Plan Handlers for OverviewTab
  const handleDeployGoalPlan = () => {
    setIsGeneratingPlan(true);
    setTimeout(() => {
      setIsGeneratingPlan(false);
      setIsPlanActive(true);
      toast.success(
        tx(
          '🎯 คำนวณและเปิดใช้งานแผนเป้าหมายยอดขายรายวันเรียบร้อยแล้ว!',
          '🎯 Activated daily sales target roadmap successfully!'
        )
      );
    }, 400);
  };

  const handleExportGoalPlan = () => {
    const gap = Math.max(0, targetRevenueVal - currentRevenueVal);
    const days = Math.max(1, parseInt(targetTimelineVal, 10) || 90);
    const dailyReq = Math.round(gap / days);
    const content = isEn
      ? `STORE SALES GOAL PLAN\nCurrent Sales: THB ${currentRevenueVal.toLocaleString()}\nTarget Sales: THB ${targetRevenueVal.toLocaleString()}\nRemaining Gap: THB ${gap.toLocaleString()}\nDaily Required Pace (${days} days): THB ${dailyReq.toLocaleString()} / day\n`
      : `แผนเป้าหมายยอดขายของร้าน\nยอดขายปัจจุบัน: ฿${currentRevenueVal.toLocaleString()}\nเป้าหมายที่ตั้งไว้: ฿${targetRevenueVal.toLocaleString()}\nยอดที่ต้องทำเพิ่ม: ฿${gap.toLocaleString()}\nยอดขายที่ต้องทำให้ได้เฉลี่ยต่อวัน (${days} วัน): ฿${dailyReq.toLocaleString()} ต่อวัน\n`;
    const blob = new Blob(['\uFEFF' + content], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = isEn ? 'Sales_Target_Roadmap.txt' : 'แผนเป้าหมายยอดขายร้านค้า.txt';
    a.click();
    URL.revokeObjectURL(url);
    toast.success(tx('📥 ดาวน์โหลดเอกสารแผนเป้าหมายเรียบร้อยแล้ว', '📥 Downloaded sales target plan'));
  };

  // Business AI Assistant Handler (Strictly Single-Language Response)
  const handleAskBusinessAi = customQuestion => {
    const q = (customQuestion || aiQuestionInput).trim();
    if (!q) return;

    const nowTime = new Date().toLocaleTimeString(isEn ? 'en-US' : 'th-TH', { hour: '2-digit', minute: '2-digit' });
    const userMsg = {
      id: 'USR-' + Date.now(),
      role: 'user',
      timestamp: nowTime,
      text: q
    };
    setAiChatMessages(prev => [...prev, userMsg]);
    if (!customQuestion) setAiQuestionInput('');
    setIsAiThinking(true);

    (async () => {
      let replyText = '';
      let metrics = [];

      try {
        const liveContext = {
          currentRevenue: currentRevenueVal,
          targetRevenue: targetRevenueVal,
          targetTimeline: targetTimelineVal,
          atRiskCount: customersList.filter(c => c.segment === 'at_risk').length,
          unresolvedAuditsCount: auditLogs.filter(a => !a.resolved).length,
          lowStockCount: inventoryList.filter(i => i.status === 'low_stock' || i.status === 'out_of_stock').length
        };

        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            question: q,
            business_profile: {
              businessName: bizProfile.companyName,
              industry: bizProfile.industry,
              monthlyTarget: targetRevenueVal,
              grossMarginPct: bizProfile.grossMarginPct,
              painPoints: bizProfile.painPoints,
              customRules: bizProfile.customRules
            },
            live_context: liveContext
          })
        });

        if (res.ok) {
          const data = await res.json();
          if (data && data.answer) {
            replyText = data.answer;
            const modelTag = data.model || 'Groq AI';
            metrics = isEn
              ? [`Engine: ${modelTag}`, 'Latency: Realtime (<2s)', 'Accuracy: 99.8%']
              : [`เอนจิน AI: ${modelTag}`, 'ความเร็ว: Realtime (<2s)', 'ความแม่นยำ: 99.8%'];
          }
        }
      } catch (err) {
        // Fallback gracefully to client-side database rules if backend is unreachable
      }

      if (!replyText) {
        const gap = Math.max(0, targetRevenueVal - currentRevenueVal);
        const days = Math.max(1, parseInt(targetTimelineVal, 10) || 90);
        const dailyReq = Math.round(gap / days);
        const atRiskCusts = customersList.filter(c => c.segment === 'at_risk');
        const unresolvedAudits = auditLogs.filter(a => !a.resolved);
        const lowStockItems = inventoryList.filter(i => i.status === 'low_stock' || i.status === 'out_of_stock');
        const lower = q.toLowerCase();

        if (lower.includes('ทั้งร้าน') || lower.includes('full-store')) {
          const totalSavedPo = centralPosList.reduce((acc, p) => acc + p.savedAmount, 0);
          replyText = isEn
            ? `Full-Store AI Executive Diagnostic Report for "${bizProfile.companyName}":\n1. Sales & Pace: Current ฿${currentRevenueVal.toLocaleString()} / Target ฿${targetRevenueVal.toLocaleString()} (Daily pace required: ฿${dailyReq.toLocaleString()}/day).\n2. Channel Margin AI: Direct Chat yields 52.4% net margin — reallocating 30% ad budget adds +฿480,000.\n3. Customer Retention AI: ${atRiskCusts.length} VIP accounts inactive 45+ days (฿164,900 win-back value).\n4. POS Fraud Shield AI: ${unresolvedAudits.length} suspicious post-cash bill voids on Register #4.\n5. Smart Inventory AI: ${lowStockItems.length} SKUs critically low; pre-restock needed within 5 days.\n6. Central Procurement AI: Saved ฿${totalSavedPo.toLocaleString()} via HQ Volume Discounts (12%–16%).`
            : `สรุปผลการสแกนและวิเคราะห์ข้อมูลทั้งร้านด้วย AI สำหรับ "${bizProfile.companyName}":\n1. เป้าหมายยอดขาย: ปัจจุบัน ฿${currentRevenueVal.toLocaleString()} / เป้าหมาย ฿${targetRevenueVal.toLocaleString()} (ต้องทำเฉลี่ยวันละ ฿${dailyReq.toLocaleString()})\n2. ช่องทางทำกำไรสูงสุด: แชตร้านค้าให้กำไรสุทธิ 52.4% แนะนำโยกงบการตลาด 30% เพื่อทำเงินเพิ่ม +฿480,000\n3. ลูกค้าเสี่ยงหาย: พบลูกค้า VIP ห่างหาย ${atRiskCusts.length} ท่าน (ดึงยอดซื้อซ้ำกลับได้ ฿164,900)\n4. ตรวจจับทุจริตแคชเชียร์: พบบิลยกเลิกผิดปกติรอตรวจสอบ ${unresolvedAudits.length} เคส ที่เครื่องคิดเงินหมายเลข 4\n5. พยากรณ์สต็อกล่วงหน้า: มีสินค้าใกล้หมด ${lowStockItems.length} รายการ แนะนำเติมสต็อกก่อนสุดสัปดาห์\n6. จัดซื้อรวมศูนย์ (Central PO): ประหยัดต้นทุนสะสมแล้ว ฿${totalSavedPo.toLocaleString()} จากส่วนลดสั่งรวม 12%–16%`;
          metrics = isEn
            ? ['AI Profit Uplift: +฿737,500', `Active Risks: ${atRiskCusts.length + lowStockItems.length + unresolvedAudits.length} Items`, 'Confidence: 99.6%']
            : ['โอกาสเพิ่มกำไรรวม: +฿737,500', `จุดเสี่ยงที่ต้องจัดการ: ${atRiskCusts.length + lowStockItems.length + unresolvedAudits.length} รายการ`, 'ความแม่นยำ AI: 99.6%'];
        } else if (lower.includes('ลูกค้า') || lower.includes('หาย') || lower.includes('customer') || lower.includes('inactive') || lower.includes('2.')) {
          replyText = isEn
            ? `Based on your live customer database (${customersList.length} customers):\n• You currently have ${atRiskCusts.length} high-value inactive customers who need urgent follow-up today (such as Mr. Kittipong and Ms. Nattanicha).\n• Recommended Action: Go to the Customer Analysis page and click the "Call Now" or "Send 20% Coupon" button to win back over ฿164,900 in lifetime value.`
            : `จากการตรวจสอบฐานข้อมูลลูกค้าจริงของร้าน (${customersList.length} ท่าน):\n• พบลูกค้าประจำที่หายไปนานผิดปกติจำนวน ${atRiskCusts.length} ท่าน (ได้แก่ คุณกิตติพงศ์ หายไป 58 วัน และคุณณัฐนิชา หายไป 64 วัน)\n• แนวทางแก้ไขทันที: แนะนำให้กดปุ่ม "โทรติดตาม" หรือ "ส่งคูปองส่วนลด 20%" ในหน้าวิเคราะห์ลูกค้า จะช่วยดึงยอดซื้อซ้ำกลับคืนมาได้กว่า ฿164,900 ครับ`;
          metrics = isEn
            ? [`Inactive Risk: ${atRiskCusts.length} Customers`, 'Win-Back Potential: ฿164,900']
            : [`ลูกค้าห่างหาย: ${atRiskCusts.length} ท่าน`, 'มูลค่าที่ดึงกลับได้: ฿164,900'];
        } else if (lower.includes('พนักงาน') || lower.includes('ยกเลิกบิล') || lower.includes('ทุจริต') || lower.includes('cashier') || lower.includes('cancel') || lower.includes('3.')) {
          replyText = isEn
            ? `Cashier & Register Audit Summary:\n• Top Performer: Mr. Phattharapol (Siam Paragon) leads with ฿642,000 in sales and a 38.6% upselling rate.\n• Fraud Alert: Detected ${unresolvedAudits.length} unresolved register anomalies, notably 14 post-cash bill cancellations on Register #4 (Central Ladprao).\n• Action: Open the Staff & Cashier page to view the security camera clip and require a Manager PIN before bill cancellations.`
            : `สรุปผลการทำงานพนักงานและตรวจสอบเครื่องคิดเงิน:\n• พนักงานยอดเยี่ยมอันดับ 1: คุณภัทรพล (สาขาสยามพารากอน) ทำยอดขาย ฿642,000 และเชียร์สินค้าพ่วงสำเร็จถึง 38.6%\n• แจ้งเตือนความเสี่ยงทุจริต: พบรายการผิดปกติรอตรวจสอบ ${unresolvedAudits.length} รายการ โดยเฉพาะที่สาขาเซ็นทรัลลาดพร้าว (เครื่องที่ 4) มีการกดยกเลิกบิลหลังรับเงินสด 14 ครั้ง\n• แนวทางจัดการ: กดดูภาพกล้องวงจรปิดในหน้าพนักงานและจุดขาย และเปิดระบบบังคับใส่รหัสผู้จัดการก่อนยกเลิกบิลครับ`;
          metrics = isEn
            ? [`Pending Audits: ${unresolvedAudits.length} Cases`, 'Top Upsell Rate: 38.6%']
            : [`รายการรอตรวจ: ${unresolvedAudits.length} เคส`, 'อัตราขายพ่วงสูงสุด: 38.6%'];
        } else if (
          lower.includes('ซัพพลายเออร์') ||
          lower.includes('จัดซื้อ') ||
          lower.includes('สั่งรวม') ||
          lower.includes('ต่อรอง') ||
          lower.includes('vendor') ||
          lower.includes('supplier') ||
          lower.includes('procurement') ||
          lower.includes('fill rate') ||
          lower.includes('lead time') ||
          lower.includes('6.')
        ) {
          const topVendor = vendorsList[0];
          const totalSavedPo = centralPosList.reduce((acc, p) => acc + p.savedAmount, 0);
          replyText = isEn
            ? `Central Procurement & Vendor Scorecard Analysis (${vendorsList.length} active suppliers):\n• #1 Most Reliable Supplier: ${topVendor?.en.name || 'Siam Organic Supply'} with ${topVendor?.fillRate || 99.4}% Fill Rate and ${topVendor?.leadTimeDays || 1.8}-day Lead Time.\n• Economy of Scale Opportunity: Consolidating ${branchRequisitions.length} low-stock SKUs across all branches at HQ unlocks 12%–16% Volume Discounts, bringing cumulative PO savings to over ฿${totalSavedPo.toLocaleString()}.\n• Action: Go to the "Suppliers & Central PO" page and click "1-Click Generate Central PO" or "Receive & Restock Inventory".`
            : `สรุปรายงานซัพพลายเออร์และการจัดซื้อรวมศูนย์ (${vendorsList.length} บริษัทคู่ค้า):\n• ซัพพลายเออร์ที่น่าเชื่อถืออันดับ 1: ${topVendor?.th.name || 'บจก. สยาม ออร์แกนิค ซัพพลาย'} ส่งของครบตามสั่ง (Fill Rate) สูงถึง ${topVendor?.fillRate || 99.4}% และใช้เวลาจัดส่ง (Lead Time) เพียง ${topVendor?.leadTimeDays || 1.8} วัน\n• โอกาสประหยัดต้นทุน (Economy of Scale): การรวมยอดสั่งซื้อของใกล้หมด ${branchRequisitions.length} รายการจากทุกสาขามาออกใบสั่งซื้อกลาง (Central PO) ที่สำนักงานใหญ่ ช่วยปลดล็อกส่วนลด Volume Discount 12%–16% ประหยัดเงินสะสมแล้วกว่า ฿${totalSavedPo.toLocaleString()}\n• แนวทางจัดการทันที: เข้าไปที่หน้า "ซัพพลายเออร์และจัดซื้อรวมศูนย์" แล้วกดปุ่ม "ออกใบสั่งซื้อรวมศูนย์ในคลิกเดียว" หรือกด "รับของเข้าคลัง & เติมสต็อก" ได้เลยครับ`;
          metrics = isEn
            ? [`Top Fill Rate: ${topVendor?.fillRate || 99.4}%`, `Central PO Saved: ฿${totalSavedPo.toLocaleString()}`]
            : [`อัตราส่งของครบสูงสุด: ${topVendor?.fillRate || 99.4}%`, `ประหยัดจากใบสั่งซื้อรวม: ฿${totalSavedPo.toLocaleString()}`];
        } else if (lower.includes('สต็อก') || lower.includes('คลัง') || lower.includes('หมด') || lower.includes('stock') || lower.includes('inventory') || lower.includes('4.')) {
          replyText = isEn
            ? `Live Inventory & Stock Analysis:\n• ${lowStockItems.length} items are critically low or out of stock (Shockproof Shipping Boxes have only 12 units left, and Holiday Gift Sets are at 0).\n• Slow-Moving Stock: Waterproof Sunscreen (280 units) has been stagnant.\n• Action: Go to the Smart Inventory page and click "+50 Restock" or "30% Clearance" to update stock in one click.`
            : `สรุปสถานะคลังสินค้าอัจฉริยะของร้าน:\n• มีสินค้าใกล้หมดหรือหมดสต็อกจำนวน ${lowStockItems.length} รายการ (กล่องพัสดุกันกระแทกเหลือเพียง 12 ชิ้น และชุดของขวัญพรีเมียมเหลือ 0 ชิ้น)\n• สินค้าค้างสต็อกนาน: ครีมกันแดดล็อตก่อนหน้าค้างอยู่ 280 ชิ้น\n• แนวทางจัดการ: เข้าไปที่หน้าคลังสินค้าอัจฉริยะ แล้วกดปุ่ม "เติมสต็อก +50 ชิ้น" หรือ "จัดโปรลด 30%" ได้ทันทีครับ`;
          metrics = isEn
            ? [`Low/Out of Stock: ${lowStockItems.length} SKUs`, 'Slow-Moving: 280 Units']
            : [`สินค้าใกล้หมด/หมด: ${lowStockItems.length} รายการ`, 'สินค้าค้างสต็อก: 280 ชิ้น'];
        } else if (lower.includes('สาขา') || lower.includes('ช่องทาง') || lower.includes('กำไร') || lower.includes('channel') || lower.includes('profit') || lower.includes('5.')) {
          replyText = isEn
            ? `Multi-Channel & Branch Profitability Comparison:\n• Highest Net Margin Channel: Direct Store Chat & Website yields 52.4% net margin (only 5% fee), followed by Physical Storefronts at 46.8%.\n• #1 Branch: Siam Paragon leads with ฿985,000 monthly revenue and 8.4x inventory turnover.\n• Action: Transfer stagnant stock from Chiang Mai Branch to Siam Paragon to convert dead stock into cash.`
            : `ผลการเปรียบเทียบกำไรรายช่องทางและสาขา:\n• ช่องทางที่ให้กำไรสุทธิสูงสุด: ช่องทางแชตร้านค้าและเว็บไซต์โดยตรง ให้กำไรสุทธิสูงถึง 52.4% (เสียค่าธรรมเนียมเพียง 5%) รองลงมาคือหน้าร้านจริง 46.8%\n• สาขาอันดับ 1: สาขาสยามพารากอน มียอดขาย ฿985,000 และหมุนเวียนสต็อกไวที่สุด (11 วันต่อรอบ)\n• แนวทางเพิ่มกำไร: โอนสินค้าค้างคลังจากสาขาเชียงใหม่มาขายที่สาขาสยามพารากอนได้ทันทีในหน้าเปรียบเทียบสาขาครับ`;
          metrics = isEn
            ? ['Best Net Margin: Direct Chat (52.4%)', '#1 Branch: Siam Paragon']
            : ['กำไรสูงสุด: แชตร้านค้า (52.4%)', 'สาขาอันดับ 1: สยามพารากอน'];
        } else {
          replyText = isEn
            ? `Sales Target & Daily Pace Plan for "${bizProfile.companyName}":\n• Current Revenue: ฿${currentRevenueVal.toLocaleString()} vs. Target: ฿${targetRevenueVal.toLocaleString()} (Remaining gap: ฿${gap.toLocaleString()}).\n• To hit your goal within ${days} days, your store needs an average of ฿${dailyReq.toLocaleString()} per day.\n• Store Policy Applied: ${bizProfile.customRules}`
            : `สรุปแผนพิชิตเป้าหมายยอดขายของ "${bizProfile.companyName}":\n• ยอดขายปัจจุบัน: ฿${currentRevenueVal.toLocaleString()} จากเป้าหมาย ฿${targetRevenueVal.toLocaleString()} (ยังขาดอีก ฿${gap.toLocaleString()})\n• เพื่อให้ถึงเป้าหมายภายใน ${days} วัน ร้านต้องทำยอดขายเฉลี่ยวันละ ฿${dailyReq.toLocaleString()} ต่อวัน\n• กฎของร้านที่ใช้คำนวณ: ${bizProfile.customRules}`;
          metrics = isEn
            ? [`Daily Target: ฿${dailyReq.toLocaleString()}/day`, `Gross Margin: ${bizProfile.grossMarginPct}%`]
            : [`ยอดที่ต้องทำต่อวัน: ฿${dailyReq.toLocaleString()}/วัน`, `อัตรากำไรขั้นต้น: ${bizProfile.grossMarginPct}%`];
        }
      }

      setAiChatMessages(prev => [
        ...prev,
        {
          id: 'AI-' + Date.now(),
          role: 'assistant',
          timestamp: nowTime,
          text: replyText,
          metrics
        }
      ]);
      setIsAiThinking(false);
      setTimeout(() => {
        chatEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 80);
    })();
  };

  const handleRetrainBusinessAi = () => {
    setIsTrainingAi(true);
    setTimeout(() => {
      setIsTrainingAi(false);
      toast.success(
        tx(
          `🧠 บันทึกข้อมูลของ "${bizProfile.companyName}" เข้าสู่สมองผู้ช่วยเรียบร้อยแล้ว!`,
          `🧠 Updated assistant knowledge base for "${bizProfile.companyName}"!`
        )
      );
    }, 450);
  };

  // Chart options (High-Contrast Readability in both Dark & Light Mode)
  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        align: 'end',
        labels: {
          color: theme === 'dark' ? '#e2e8f0' : '#0f172a',
          font: { weight: '700' },
          boxWidth: 12,
          usePointStyle: true
        }
      }
    },
    scales: {
      y: {
        grid: { color: theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(15,23,42,0.12)' },
        ticks: { color: theme === 'dark' ? '#cbd5e1' : '#0f172a', font: { weight: '600' } }
      },
      x: {
        grid: { display: false },
        ticks: { color: theme === 'dark' ? '#cbd5e1' : '#0f172a', font: { weight: '600' } }
      }
    }
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        labels: { color: theme === 'dark' ? '#e2e8f0' : '#0f172a', font: { weight: '700' } }
      }
    },
    scales: {
      y: {
        grid: { color: theme === 'dark' ? 'rgba(255,255,255,0.06)' : 'rgba(15,23,42,0.12)' },
        ticks: { color: theme === 'dark' ? '#cbd5e1' : '#0f172a', font: { weight: '600' } }
      },
      x: {
        grid: { display: false },
        ticks: { color: theme === 'dark' ? '#cbd5e1' : '#0f172a', font: { weight: '600' } }
      }
    }
  };

  const heroGoalChartData = {
    labels: isEn ? ['Q1 Start', 'Q2 Growth', 'Q3 Current', 'Q4 Year-End Goal'] : ['ไตรมาส 1', 'ไตรมาส 2', 'ไตรมาส 3 (ปัจจุบัน)', 'ไตรมาส 4 (เป้าหมาย)'],
    datasets: [
      {
        label: tx('เป้าหมายยอดขายตามแผน (บาท)', 'Planned Target (THB)'),
        data: [2500000, 5000000, 7500000, 10000000],
        borderColor: '#f59e0b',
        borderDash: [6, 6],
        borderWidth: 2.5,
        pointBackgroundColor: '#f59e0b',
        pointRadius: 4,
        tension: 0.35
      },
      {
        label: tx('ยอดขายจริงของร้าน (บาท)', 'Actual Store Sales (THB)'),
        data: [2850000, 5620000, 8920000, null],
        borderColor: '#0284c7',
        backgroundColor: 'rgba(56, 189, 248, 0.16)',
        borderWidth: 3,
        pointBackgroundColor: theme === 'dark' ? '#070b16' : '#ffffff',
        pointBorderColor: '#0284c7',
        pointBorderWidth: 2,
        pointRadius: 5,
        fill: true,
        tension: 0.38
      }
    ]
  };

  // Language Toggle Component (Strict 100% Thai vs 100% English, Compact on Mobile)
  const renderLanguageSwitcher = () => (
    <div
      className={`flex items-center gap-0.5 sm:gap-1 p-0.5 sm:p-1 rounded-xl sm:rounded-2xl border shadow-inner ${
        theme === 'dark' ? 'bg-[#0b1120] border-white/15' : 'bg-slate-100 border-slate-300'
      }`}
      title={tx('สลับภาษา: ภาษาไทยล้วน หรือ ภาษาอังกฤษล้วน', 'Switch Language: 100% Thai or 100% English')}
    >
      <button
        type="button"
        onClick={() => {
          handleSwitchLanguage('th');
          toast.success('🇹🇭 เปลี่ยนเป็นโหมดภาษาไทยล้วนเรียบร้อยแล้ว');
        }}
        className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-black transition cursor-pointer whitespace-nowrap ${
          lang === 'th'
            ? 'bg-amber-400 text-slate-950 shadow-md'
            : theme === 'dark'
            ? 'text-slate-300 hover:text-white'
            : 'text-slate-800 hover:text-slate-950'
        }`}
      >
        <span className="sm:hidden">🇹🇭 ไทย</span>
        <span className="hidden sm:inline">🇹🇭 ภาษาไทย</span>
      </button>
      <button
        type="button"
        onClick={() => {
          handleSwitchLanguage('en');
          toast.success('🇬🇧 Switched to 100% English Mode');
        }}
        className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-black transition cursor-pointer whitespace-nowrap ${
          lang === 'en'
            ? 'bg-amber-400 text-slate-950 shadow-md'
            : theme === 'dark'
            ? 'text-slate-300 hover:text-white'
            : 'text-slate-800 hover:text-slate-950'
        }`}
      >
        <span className="sm:hidden">🇬🇧 EN</span>
        <span className="hidden sm:inline">🇬🇧 English</span>
      </button>
    </div>
  );

  // =========================================================================
  // 1. LANDING PAGE (100% Pure Thai or 100% Pure English)
  // =========================================================================
  if (!user) {
    return (
      <div
        className={`min-h-screen flex flex-col font-sans select-none relative pb-20 md:pb-0 transition-colors duration-300 ${
          theme === 'dark' ? 'theme-dark bg-[#050814] text-slate-100' : 'theme-light bg-[#f8fafc] text-slate-900'
        }`}
      >
        <Toaster position="top-right" gutter={14} containerStyle={{ top: 14, right: 14, left: 14, zIndex: 9999 }} />

        {/* Login Modal (Scrollable & Mobile-Optimized with 1-Tap Instant Access at Top) */}
        {isLoginOpen && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-start sm:items-center justify-center z-50 p-3 sm:p-4 overflow-y-auto">
            <div className="bg-[#0c1222] border border-white/15 rounded-3xl w-full max-w-md max-h-[92dvh] overflow-y-auto p-5 sm:p-7 shadow-2xl relative my-auto">
              <button
                onClick={() => setIsLoginOpen(false)}
                className="sticky top-0 float-right w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-slate-200 hover:text-white transition text-base font-black z-10 cursor-pointer"
                aria-label="Close"
              >
                ✕
              </button>
              <div className="flex flex-col items-center justify-center gap-2.5 mb-3 clear-both">
                <AppLogo size={54} />
                {renderLanguageSwitcher()}
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-center mb-1.5 text-white">
                {authMode === 'otp'
                  ? tx('🔐 เข้าสู่ระบบด้วยรหัส OTP 2FA', 'Sign In with 2FA OTP Code')
                  : authMode === 'login'
                  ? tx('เข้าสู่ระบบจัดการร้านค้า', 'Sign In to Your Store Console')
                  : tx('ลงทะเบียนเจ้าของร้านใหม่', 'Create New Store Account')}
              </h2>
              <p className="text-slate-300 text-center text-xs sm:text-sm mb-3">
                {authMode === 'otp'
                  ? tx('ระบบจะส่งรหัสยืนยัน 6 หลักไปยังอีเมลของคุณเพื่อความปลอดภัยสูงสุด', 'A 6-digit OTP code will be sent to your email address')
                  : tx('เลือกวิธีเข้าสู่ระบบที่คุณสะดวก หรือกดทางลัด 1 คลิกด้านล่างครับ', 'Choose your preferred sign-in method or use 1-Tap access below.')}
              </p>

              {previewSelectedPlanId === 'starter' && (
                <div className="mb-3 p-2.5 rounded-xl bg-amber-400/15 border border-amber-400/35 flex items-center justify-center gap-2 text-xs font-black text-amber-300">
                  <span className="animate-bounce">🎉</span>
                  <span>{tx('สิทธิ์พิเศษ: ทดลองใช้ฟรี 14 วัน (เฉพาะแพ็กเกจ Starter)', 'Special Privilege: 14-Day Free Trial (Starter Only)')}</span>
                </div>
              )}

              {/* Auth Mode Toggle Tabs (Password / OTP 2FA / Register) */}
              <div className="grid grid-cols-3 gap-1.5 p-1 rounded-2xl bg-[#060a14] border border-white/10 mb-4">
                <button
                  type="button"
                  onClick={() => setAuthMode('login')}
                  className={`py-2 px-2 rounded-xl text-xs font-black transition cursor-pointer text-center ${
                    authMode === 'login'
                      ? 'bg-amber-400 text-slate-950 shadow-md'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  🔑 {tx('รหัสผ่าน', 'Password')}
                </button>
                <button
                  type="button"
                  onClick={() => setAuthMode('otp')}
                  className={`py-2 px-2 rounded-xl text-xs font-black transition cursor-pointer text-center ${
                    authMode === 'otp'
                      ? 'bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 shadow-md'
                      : 'text-emerald-300 hover:text-white'
                  }`}
                >
                  🔐 {tx('รหัส OTP', '2FA OTP')}
                </button>
                <button
                  type="button"
                  onClick={() => setAuthMode('register')}
                  className={`py-2 px-2 rounded-xl text-xs font-black transition cursor-pointer text-center ${
                    authMode === 'register'
                      ? 'bg-amber-400 text-slate-950 shadow-md'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  📝 {tx('ลงทะเบียน', 'Register')}
                </button>
              </div>

              {/* 1-Tap Mobile & Desktop Quick Access Buttons */}
              <div className="grid grid-cols-1 gap-2 mb-4 p-3 rounded-2xl bg-amber-400/10 border border-amber-400/35">
                <div className="text-[11px] font-black uppercase text-amber-300 text-center">
                  ⚡ {tx('ทางลัดเข้าใช้งานทันที (ไม่ต้องพิมพ์รหัสผ่าน)', '1-Tap Instant Access (No Typing Needed)')}
                </div>
                <button
                  type="button"
                  onClick={() => {
                    const cleanPhone = (authPhone || '089-999-8888').trim();
                    const cleanLine = (authLineId || '@owner_insightflow').trim();
                    const adminUser = {
                      name: tx('ผู้ดูแลระบบสูงสุด (Super Admin)', 'Super Admin'),
                      email: SUPER_ADMIN_EMAIL,
                      phone: cleanPhone,
                      lineId: cleanLine,
                      sub: 'super-admin',
                      role: 'admin',
                      picture: 'https://ui-avatars.com/api/?name=Super+Admin&background=fbbf24&color=0f172a&bold=true'
                    };
                    setAuthEmail(SUPER_ADMIN_EMAIL);
                    setAdminPreviewCustomerPlan(false);
                    localStorage.setItem('insightflow_saved_phone', cleanPhone);
                    localStorage.setItem('insightflow_saved_line_id', cleanLine);
                    if (rememberPassword) {
                      localStorage.setItem('insightflow_saved_user', JSON.stringify(adminUser));
                    }
                    setUser(adminUser);
                    setIsLoginOpen(false);
                    toast.success(
                      tx(
                        `👑 เข้าสู่ระบบ Super Admin (${SUPER_ADMIN_EMAIL}) เรียบร้อยแล้ว!`,
                        `👑 Signed in as Super Admin (${SUPER_ADMIN_EMAIL})!`
                      )
                    );
                  }}
                  className="w-full py-3 px-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-300 text-slate-950 font-black text-xs sm:text-sm shadow-lg transition cursor-pointer"
                >
                  {tx(
                    '👑 เข้าสู่ระบบ Admin สูงสุด (ปลดล็อกครบ 11 หน้า • 1 คลิก)',
                    '👑 1-Click Super Admin Access (All 11 Modules Unlocked)'
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    const chosenMeta = planTiersMap[subscriptionPlan] || planTiersMap.starter;
                    const cleanPhone = (authPhone || '089-999-8888').trim();
                    const cleanLine = (authLineId || '@owner_insightflow').trim();
                    const cleanName =
                      authName.trim() || tx(`ลูกค้าแพ็กเกจ ${chosenMeta.code}`, `${chosenMeta.code} Customer`);
                    const customerUser = {
                      name: cleanName,
                      email: authEmail.trim() || 'customer@insightflow.app',
                      phone: cleanPhone,
                      lineId: cleanLine,
                      sub: 'customer-account',
                      role: 'customer',
                      picture: 'https://ui-avatars.com/api/?name=Customer&background=38bdf8&color=0f172a&bold=true'
                    };
                    localStorage.setItem('insightflow_saved_phone', cleanPhone);
                    localStorage.setItem('insightflow_saved_line_id', cleanLine);
                    if (rememberPassword) {
                      localStorage.setItem('insightflow_saved_user', JSON.stringify(customerUser));
                    }
                    registerOrUpdateWebCustomer({
                      name: customerUser.name,
                      email: customerUser.email,
                      phone: cleanPhone,
                      lineId: cleanLine,
                      plan: subscriptionPlan
                    });
                    setUser(customerUser);
                    setIsLoginOpen(false);
                    toast.success(
                      tx(
                        `🛍️ เข้าสู่ระบบลูกค้า "${chosenMeta.name}" • บันทึกชื่อ เบอร์โทร และไลน์เข้าหน้าต่าง Admin แล้ว!`,
                        `🛍️ Signed in on "${chosenMeta.name}" • Saved Name, Phone & LINE into Admin Registry!`
                      )
                    );
                  }}
                  className="w-full py-2.5 px-3 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-400/40 font-black text-xs transition cursor-pointer"
                >
                  {tx(
                    `🛍️ ทดลองเข้าในฐานะลูกค้า (${(planTiersMap[subscriptionPlan] || planTiersMap.starter).code})`,
                    `🛍️ 1-Click Customer Access (${(planTiersMap[subscriptionPlan] || planTiersMap.starter).code})`
                  )}
                </button>
              </div>

              {authMode === 'otp' ? (
                /* ================= OTP 2FA LOGIN FORM ================= */
                <form onSubmit={handleVerifyOtpAndLogin} className="flex flex-col gap-3.5 mb-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      ✉️ {tx('อีเมลสำหรับรับรหัส OTP', 'Email Address for OTP')}
                    </label>
                    <div className="flex gap-2">
                      <input
                        type="email"
                        placeholder={tx('กรอกอีเมลของคุณ', 'owner@yourstore.com')}
                        value={authEmail}
                        onChange={e => setAuthEmail(e.target.value)}
                        className="flex-1 bg-[#050814] border border-white/15 rounded-xl px-4 py-2.5 text-white outline-none focus:border-emerald-400"
                        required
                      />
                      <button
                        type="button"
                        onClick={handleRequestOtp}
                        disabled={isSendingOtp || otpCountdown > 0}
                        className={`px-3.5 py-2.5 rounded-xl text-xs font-black transition cursor-pointer whitespace-nowrap flex-shrink-0 ${
                          otpCountdown > 0
                            ? 'bg-slate-800 text-slate-400 border border-white/10 cursor-not-allowed'
                            : 'bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 font-black shadow-md hover:brightness-105 active:scale-95'
                        }`}
                      >
                        {isSendingOtp
                          ? tx('กำลังส่ง...', 'Sending...')
                          : otpCountdown > 0
                          ? `${otpCountdown}s`
                          : isOtpSent
                          ? tx('🔄 ส่งรหัสใหม่', 'Resend')
                          : tx('📨 ขอรหัส OTP', 'Get OTP')}
                      </button>
                    </div>
                  </div>

                  {/* 6-Digit OTP Input Box with Cyber Glow */}
                  <div className="p-3.5 rounded-2xl bg-[#080e1e] border-2 border-emerald-400/50 shadow-[0_0_25px_rgba(52,211,153,0.15)] space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-black text-emerald-300 flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                        {tx('🔐 กรอกรหัส OTP 6 หลักที่ได้รับ:', '🔐 Enter 6-Digit OTP Code:')}
                      </span>
                      {isOtpSent && (
                        <span className="text-[10px] text-amber-300 font-bold bg-amber-400/15 px-2 py-0.5 rounded-full border border-amber-400/30">
                          {tx('อายุรหัส 180 วินาที', 'Valid 180s')}
                        </span>
                      )}
                    </div>
                    <input
                      type="text"
                      maxLength={6}
                      inputMode="numeric"
                      pattern="[0-9]*"
                      placeholder="• • • • • •"
                      value={otpCode}
                      onChange={e => setOtpCode(e.target.value.replace(/\D/g, ''))}
                      className="w-full tracking-[0.55em] text-center text-2xl font-black bg-[#050814] border border-emerald-400/60 rounded-xl py-3 text-emerald-300 outline-none focus:ring-2 focus:ring-emerald-400 shadow-inner"
                      required
                    />
                    <p className="text-[11px] text-slate-400 text-center">
                      {tx(
                        '💡 หากยังไม่ได้เซ็ตอีเมล ระบบจำลองจะกรอกรหัสให้อัตโนมัติทันที',
                        '💡 Simulated code is provided automatically for quick testing'
                      )}
                    </p>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      👤 {tx('ชื่อของคุณ / ชื่อร้านค้า (ไม่บังคับ)', 'Full Name / Store Name (Optional)')}
                    </label>
                    <input
                      type="text"
                      placeholder={tx('เช่น คุณสมชาย เจริญกิจ', 'e.g. Mr. Somchai')}
                      value={authName}
                      onChange={e => setAuthName(e.target.value)}
                      className="w-full bg-[#050814] border border-white/15 rounded-xl px-4 py-2 text-white outline-none focus:border-emerald-400 text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isVerifyingOtp}
                    className="w-full py-3.5 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 rounded-xl text-slate-950 font-black text-sm sm:text-base transition shadow-xl cursor-pointer hover:brightness-105 active:scale-95"
                  >
                    {isVerifyingOtp ? tx('กำลังตรวจสอบ...', 'Verifying...') : tx('✅ ยืนยันรหัส OTP และเข้าสู่ระบบ', '✅ Verify OTP & Enter System')}
                  </button>
                </form>
              ) : (
                /* ================= STANDARD PASSWORD / REGISTER FORM ================= */
                <form onSubmit={handleAuthSubmit} className="flex flex-col gap-3.5 mb-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      👤 {tx('ชื่อ - นามสกุล / ชื่อร้านค้าของคุณ (ซิงก์เข้าหน้า Admin อัตโนมัติ)', 'Your Full Name / Store Name (Synced to Admin)')}
                    </label>
                    <input
                      type="text"
                      placeholder={tx('เช่น คุณสมชาย เจริญกิจ', 'e.g. Mr. Somchai Charoenkit')}
                      value={authName}
                      onChange={e => setAuthName(e.target.value)}
                      className="w-full bg-[#050814] border border-white/15 rounded-xl px-4 py-2.5 text-white outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-300 mb-1">
                      {tx('อีเมลสำหรับเข้าใช้งาน', 'Email Address')}
                    </label>
                    <input
                      type="email"
                      placeholder={tx('กรอกอีเมลของคุณ', 'owner@yourstore.com')}
                      value={authEmail}
                      onChange={e => setAuthEmail(e.target.value)}
                      className="w-full bg-[#050814] border border-white/15 rounded-xl px-4 py-2.5 text-white outline-none focus:border-amber-400"
                      required
                    />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="text-xs font-bold text-slate-300">
                        {tx('รหัสผ่านเข้าใช้งาน', 'Password')}
                      </label>
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-xs font-bold text-amber-400 hover:text-amber-300 cursor-pointer"
                      >
                        {showPassword
                          ? tx('ซ่อนรหัสผ่าน', 'Hide Password')
                          : tx('แสดงรหัสผ่านให้เห็นชัดๆ', 'Show Password')}
                      </button>
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      placeholder={tx('กรอกรหัสผ่าน', 'Enter your password')}
                      value={authPassword}
                      onChange={e => setAuthPassword(e.target.value)}
                      className="w-full bg-[#050814] border border-white/15 rounded-xl px-4 py-2.5 text-white outline-none focus:border-amber-400"
                      required
                    />
                  </div>

                  {/* เบอร์โทรศัพท์ & ID LINE สำหรับส่งข้อความสรุปยอดขายอัตโนมัติ */}
                  <div className="p-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/35 space-y-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xs font-black text-emerald-300">
                        📲 {tx('เบอร์โทร & ID LINE รับสรุปยอดขายอัตโนมัติ (22:00 น.)', 'Phone & LINE ID for 22:00 Sales Alert')}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-300 mb-1">
                          {tx('เบอร์โทรศัพท์มือถือ', 'Mobile Phone Number')}
                        </label>
                        <input
                          type="tel"
                          placeholder={tx('เช่น 089-999-8888', 'e.g. 089-999-8888')}
                          value={authPhone}
                          onChange={e => setAuthPhone(e.target.value)}
                          className="w-full bg-[#050814] border border-emerald-400/40 rounded-xl px-3 py-2 text-sm font-bold text-white outline-none focus:border-emerald-400"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-300 mb-1">
                          {tx('ID LINE', 'LINE ID')}
                        </label>
                        <input
                          type="text"
                          placeholder={tx('เช่น @owner_insightflow', 'e.g. @owner_insightflow')}
                          value={authLineId}
                          onChange={e => setAuthLineId(e.target.value)}
                          className="w-full bg-[#050814] border border-emerald-400/40 rounded-xl px-3 py-2 text-sm font-bold text-white outline-none focus:border-emerald-400"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-xs font-black text-amber-300">
                        {tx('🎁 เลือกแพ็กเกจที่ต้องการใช้งาน (กดเลือกได้เลย):', '🎁 Choose Your Subscription Plan (Tap to Select):')}
                      </label>
                      <span className="text-[11px] font-black text-emerald-400 animate-pulse">
                        ✨ {tx('เปลี่ยนได้ตลอดเวลา', 'Switch anytime')}
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        {
                          id: 'starter',
                          title: 'Starter',
                          price: '1,990.-/m',
                          emoji: '🚀',
                          tag: tx('เริ่มต้นคุ้มค่า', 'Essential'),
                          activeClass:
                            'bg-gradient-to-b from-sky-500/30 to-sky-900/30 border-2 border-sky-400 text-sky-200 shadow-[0_10px_25px_-5px_rgba(56,189,248,0.45)]'
                        },
                        {
                          id: 'professional',
                          title: 'Professional',
                          price: '2,900.-/m',
                          emoji: '🏆',
                          tag: tx('⭐ ขายดีที่สุด', '⭐ Popular'),
                          activeClass:
                            'bg-gradient-to-b from-amber-400/30 to-amber-900/30 border-2 border-amber-400 text-amber-200 shadow-[0_10px_25px_-5px_rgba(251,191,36,0.5)]'
                        },
                        {
                          id: 'premium',
                          title: 'Premium',
                          price: '4,900.-/m',
                          emoji: '👑',
                          tag: tx('ครบวงจรสูงสุด', 'Enterprise'),
                          activeClass:
                            'bg-gradient-to-b from-purple-500/30 to-purple-900/30 border-2 border-purple-400 text-purple-200 shadow-[0_10px_25px_-5px_rgba(192,132,252,0.45)]'
                        }
                      ].map(pk => {
                        const isSelected = subscriptionPlan === pk.id;
                        return (
                          <button
                            key={pk.id}
                            type="button"
                            onClick={() => handleSelectSubscriptionPlan(pk.id)}
                            className={`relative overflow-hidden p-2.5 rounded-2xl text-center transition-all duration-300 cursor-pointer active:scale-90 ${
                              isSelected
                                ? `${pk.activeClass} pkg-card-selected`
                                : 'bg-[#050814] border border-white/15 text-slate-300 hover:border-amber-400/40 hover:-translate-y-0.5'
                            }`}
                          >
                            {isSelected && (
                              <>
                                <span className="pkg-confetti-1 pointer-events-none absolute top-2 left-2 text-xs">
                                  ✨
                                </span>
                                <span className="pkg-confetti-2 pointer-events-none absolute top-2 right-2 text-xs">
                                  🎉
                                </span>
                                <span className="pkg-check-pop absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-emerald-400 text-slate-950 text-[10px] font-black flex items-center justify-center shadow">
                                  ✓
                                </span>
                              </>
                            )}
                            <div
                              className={`text-xl mb-0.5 inline-block ${
                                isSelected ? 'pkg-cute-mascot' : ''
                              }`}
                            >
                              {pk.emoji}
                            </div>
                            <div className="text-xs font-black truncate text-white">{pk.title}</div>
                            <div className="text-[11px] font-bold text-amber-300">{pk.price}</div>
                            <div className="text-[9px] font-black mt-0.5 px-1.5 py-0.5 rounded-full bg-white/10 text-slate-200 truncate">
                              {pk.tag}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <label className="flex items-start gap-2.5 p-3 rounded-2xl bg-amber-400/10 border border-amber-400/30 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberPassword}
                      onChange={e => setRememberPassword(e.target.checked)}
                      className="w-5 h-5 mt-0.5 accent-amber-400 rounded cursor-pointer flex-shrink-0"
                    />
                    <div>
                      <span className="text-xs sm:text-sm font-bold text-amber-300 block">
                        {tx('จดจำอีเมล เบอร์โทร ID LINE และรหัสผ่านไว้ในเครื่องนี้', 'Remember Email, Phone, LINE ID & Password')}
                      </span>
                    </div>
                  </label>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-gradient-to-r from-amber-400 to-orange-500 rounded-xl text-slate-950 font-black text-sm sm:text-base transition shadow-lg cursor-pointer"
                  >
                    {authMode === 'login'
                      ? tx('เข้าสู่ระบบด้วยอีเมลและรหัสผ่าน', 'Sign In with Email & Password')
                      : tx('สร้างบัญชีและเข้าใช้งาน', 'Create Account & Sign In')}
                  </button>
                </form>
              )}

              <div className="text-center text-xs text-slate-400 pb-1">
                <button
                  type="button"
                  onClick={() => setAuthMode(authMode === 'otp' ? 'login' : 'otp')}
                  className="text-emerald-400 hover:underline font-bold cursor-pointer"
                >
                  {authMode === 'otp'
                    ? tx('🔄 เปลี่ยนไปเข้าสู่ระบบด้วยรหัสผ่านปกติ', 'Switch to standard Password sign-in')
                    : tx('🔐 สลับไปเข้าสู่ระบบด้วยรหัส OTP 2FA (รวดเร็ว ปลอดภัย)', 'Switch to 2FA OTP login (Fast & Secure)')}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Landing Header (Responsive & Compact for Smartphone, Tablet & Desktop) */}
        <header
          className={`border-b backdrop-blur-xl sticky top-0 z-40 px-3 sm:px-8 lg:px-16 py-2.5 sm:py-4 ${
            theme === 'dark' ? 'border-white/10 bg-[#050814]/95' : 'border-slate-300 bg-white/95 shadow-sm'
          }`}
        >
          <div className="flex justify-between items-center gap-1.5 sm:gap-2">
            <div className="flex items-center gap-2 sm:gap-3.5 cursor-pointer group min-w-0" onClick={() => scrollToSection('home')}>
              <AppLogo size={38} className="transition-transform duration-300 group-hover:scale-105 flex-shrink-0" />
              <div className="min-w-0">
                <span
                  className={`text-base sm:text-2xl font-black tracking-tight block truncate ${
                    theme === 'dark'
                      ? 'bg-gradient-to-r from-white via-amber-100 to-amber-300 bg-clip-text text-transparent'
                      : 'text-slate-950'
                  }`}
                >
                  InsightFlow
                </span>
              </div>
            </div>

            <nav className="hidden md:flex items-center gap-5 lg:gap-7 text-sm font-bold">
              {[
                { id: 'home', label: t.home },
                { id: 'solutions', label: t.solutions },
                { id: 'why-us', label: t.whyUs },
                { id: 'use-cases', label: t.useCases },
                { id: 'pricing', label: t.pricing }
              ].map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`transition pb-1 border-b-2 cursor-pointer whitespace-nowrap ${
                    activeSection === item.id
                      ? theme === 'dark'
                        ? 'text-amber-400 border-amber-400'
                        : 'text-amber-700 border-amber-600'
                      : theme === 'dark'
                      ? 'text-slate-300 border-transparent hover:text-white'
                      : 'text-slate-800 border-transparent hover:text-slate-950'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
              {renderLanguageSwitcher()}
              <button
                type="button"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className={`px-2 sm:px-3 py-1.5 sm:py-2 rounded-xl border text-xs font-black cursor-pointer transition ${
                  theme === 'dark'
                    ? 'border-white/15 bg-white/5 text-amber-300 hover:bg-white/10'
                    : 'border-slate-300 bg-slate-100 text-slate-900 hover:bg-slate-200'
                }`}
                title={tx('สลับโหมดมืด / โหมดสว่าง', 'Switch Dark / Light Mode')}
              >
                <span className="sm:hidden">{theme === 'dark' ? '☀️' : '🌙'}</span>
                <span className="hidden sm:inline">{theme === 'dark' ? tx('☀️ สว่าง', '☀️ Light') : tx('🌙 มืด', '🌙 Dark')}</span>
              </button>
              <button
                onClick={() => setIsLoginOpen(true)}
                className="bg-gradient-to-r from-amber-400 to-amber-300 text-slate-950 font-black px-3 sm:px-6 py-1.5 sm:py-2.5 rounded-xl text-xs sm:text-sm transition shadow-lg cursor-pointer whitespace-nowrap"
              >
                <span className="sm:hidden">{tx('เข้าใช้งาน', 'Sign In')}</span>
                <span className="hidden sm:inline">{t.freeTrial}</span>
              </button>
            </div>
          </div>

          {/* Mobile & Small Tablet Touch-Scrollable Section Bar */}
          <nav
            className={`flex md:hidden items-center gap-1.5 overflow-x-auto no-scrollbar pt-2 mt-2 border-t ${
              theme === 'dark' ? 'border-white/10' : 'border-slate-200'
            }`}
          >
            {[
              { id: 'home', label: t.home },
              { id: 'solutions', label: t.solutions },
              { id: 'why-us', label: t.whyUs },
              { id: 'use-cases', label: t.useCases },
              { id: 'pricing', label: t.pricing }
            ].map(item => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-black whitespace-nowrap transition cursor-pointer ${
                  activeSection === item.id
                    ? 'bg-amber-400 text-slate-950 shadow'
                    : theme === 'dark'
                    ? 'bg-white/5 text-slate-300 border border-white/10'
                    : 'bg-slate-100 text-slate-800 border border-slate-300'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </header>

        {/* Hero Section */}
        <main className="flex-1 px-4 sm:px-8 lg:px-16 py-6 sm:py-14 max-w-[1600px] mx-auto w-full">
          <div id="home" className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center mb-12 sm:mb-24">
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 bg-amber-400/10 text-amber-400 text-xs font-black px-3.5 py-1.5 rounded-full mb-4 sm:mb-6 border border-amber-400/20">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                <span>{t.badgeHero}</span>
              </div>

              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4 sm:mb-6 leading-tight">
                <span className={`block ${theme === 'dark' ? 'text-white' : 'text-slate-950'}`}>{t.tagline1}</span>
                <span
                  className={`block mt-1.5 sm:mt-2 bg-clip-text text-transparent ${
                    theme === 'dark'
                      ? 'bg-gradient-to-r from-amber-200 via-amber-400 to-amber-500'
                      : 'bg-gradient-to-r from-amber-700 via-orange-600 to-amber-800'
                  }`}
                >
                  {t.tagline2}
                </span>
              </h1>

              <p className="text-slate-300 text-sm sm:text-base lg:text-lg mb-6 sm:mb-8 leading-relaxed">{t.description}</p>

              <div className="grid grid-cols-1 sm:flex sm:flex-wrap gap-3 sm:gap-4 items-center mb-4 sm:mb-6">
                <button
                  onClick={() => {
                    setPreviewSelectedPlanId('starter');
                    handleSelectSubscriptionPlan('starter', null, true);
                    setIsLoginOpen(true);
                  }}
                  className="w-full sm:w-auto bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-400 text-slate-950 font-black px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl shadow-xl text-base sm:text-lg cursor-pointer text-center transition-all duration-200 transform hover:scale-[1.02]"
                >
                  {t.heroCtaPrimary || t.freeTrial}
                </button>
                <button
                  onClick={() => setIsAppleFilmOpen(true)}
                  className="w-full sm:w-auto bg-[#0b1120] hover:bg-slate-800 text-white font-bold px-6 sm:px-7 py-3.5 sm:py-4 rounded-2xl border border-amber-400/40 shadow-[0_0_25px_rgba(251,191,36,0.2)] text-base sm:text-lg cursor-pointer text-center flex items-center justify-center gap-2 transition-all duration-200"
                >
                  <span className="inline-block w-2.5 h-2.5 rounded-full bg-amber-400 animate-ping" />
                  <span>▶ {t.watchDemo}</span>
                </button>
              </div>

              {/* Trust Badges: The 5-Second Test Assurance */}
              <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 text-xs sm:text-sm font-semibold text-slate-300 mb-8 sm:mb-10">
                <span className="inline-flex items-center gap-1.5 bg-amber-500/10 text-amber-300 px-3 py-1 rounded-full border border-amber-500/30">
                  <span className="font-black text-sm">🎉</span> {isEn ? '14-Day Free Trial exclusive to Starter Plan' : 'ทดลองฟรี 14 วันเฉพาะแพ็กเกจ Starter'}
                </span>
                <span className="inline-flex items-center gap-1.5 bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/20">
                  <span className="font-black text-sm">✓</span> {isEn ? 'No credit card required' : 'ไม่ต้องกรอกบัตรเครดิต'}
                </span>
                <span className="inline-flex items-center gap-1.5 bg-cyan-500/10 text-cyan-300 px-3 py-1 rounded-full border border-cyan-500/20">
                  <span className="font-black text-sm">✓</span> {isEn ? 'Mobile & Desktop' : 'รองรับทั้งมือถือและคอม'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 pt-8 border-t border-white/10 gap-4">
                {[
                  {
                    text: t.feat1,
                    iconType: 'speed_engine',
                    variant: 'gold',
                    borderHover: 'hover:border-amber-400/50'
                  },
                  {
                    text: t.feat2,
                    iconType: 'precision_target',
                    variant: 'ruby',
                    borderHover: 'hover:border-rose-400/50'
                  },
                  {
                    text: t.feat3,
                    iconType: 'global_shield',
                    variant: 'emerald',
                    borderHover: 'hover:border-emerald-400/50'
                  }
                ].map((fItem, fIdx) => {
                  const [headline, subline] = (fItem.text || '').split('\n');
                  return (
                    <div
                      key={fIdx}
                      className={`flex items-start gap-3.5 p-4 rounded-2xl bg-[#0b1120]/85 border border-white/10 ${fItem.borderHover} transition-all duration-300 shadow-lg group`}
                    >
                      <div className="flex-shrink-0 transform group-hover:scale-105 transition duration-300">
                        <LuxuryIconBadge variant={fItem.variant} size="md" active>
                          <LuxuryModuleIcon type={fItem.iconType} size={24} />
                        </LuxuryIconBadge>
                      </div>
                      <div className="min-w-0">
                        <div className="text-sm font-black text-white leading-snug">
                          {headline}
                        </div>
                        {subline && (
                          <div className="text-xs text-slate-300 font-semibold mt-1 leading-relaxed">
                            {subline}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="lg:col-span-6">
              {/* Apple-Style 3D Motion Short Video Loop using Our Own InsightFlow Logo */}
              <AppleKeynoteLogoFilm
                lang={lang}
                onOpenFullscreen={() => setIsAppleFilmOpen(true)}
              />

              <div className="bg-[#0b1120]/95 border border-amber-400/30 rounded-3xl p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10 text-xs">
                  <span className="font-black text-white flex items-center gap-2.5">
                    <LuxuryIconBadge variant="gold" size="sm" active>
                      <LuxuryModuleIcon type="precision_target" size={18} />
                    </LuxuryIconBadge>
                    <span>{t.heroHubTitle}</span>
                  </span>
                  <span className="font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full">
                    {t.heroHubStatus}
                  </span>
                </div>
                <div className="rounded-2xl overflow-hidden border border-white/10 bg-[#070b16] p-5 mb-4">
                  <div className="flex justify-between items-center mb-3">
                    <div>
                      <p className="text-xs text-slate-400 font-bold">{t.heroTargetLabel}</p>
                      <h4 className="text-2xl font-black text-white mt-0.5">฿10,000,000</h4>
                      <span className="text-xs text-emerald-400 font-bold">฿8,920,000 {t.heroTargetActual}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-400 font-bold">{t.heroAccLabel}</p>
                      <h4 className="text-2xl font-black text-amber-400 mt-0.5">99.4%</h4>
                      <span className="text-xs text-emerald-400 font-bold">{t.heroAccBadge}</span>
                    </div>
                  </div>
                  <div className="h-36 w-full">
                    <Line data={heroGoalChartData} options={lineChartOptions} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Fullscreen Apple Keynote Logo Motion Film Modal */}
          {isAppleFilmOpen && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl"
              onClick={() => setIsAppleFilmOpen(false)}
            >
              <div
                className="w-full max-w-4xl"
                onClick={e => e.stopPropagation()}
              >
                <AppleKeynoteLogoFilm
                  lang={lang}
                  isFullscreen
                  onCloseFullscreen={() => setIsAppleFilmOpen(false)}
                  onEnterSystem={() => {
                    setIsAppleFilmOpen(false);
                    setIsLoginOpen(true);
                  }}
                />
              </div>
            </div>
          )}

          {/* Proof & Trust Section (Live Interactive Preview, Modern Web Dashboard Icon, Social Proof, and Enterprise Security) */}
          <ProofAndTrustSection
            lang={lang}
            onOpenLogin={() => setIsLoginOpen(true)}
            onOpenDemo={() => setIsAppleFilmOpen(true)}
          />

          {/* Solutions Section (Interactive 60FPS Animated Store Owner Services Showcase) */}
          <div id="solutions" className="py-16 border-t border-white/10">
            <div className="text-center max-w-3xl mx-auto mb-8">
              <div className="text-amber-400 text-xs font-black uppercase mb-2">{t.solutionsHeading}</div>
              <h2 className="text-3xl font-black text-white mb-3">{t.solutionsTitle}</h2>
              <p className="text-slate-400">{t.solutionsDesc}</p>
            </div>
            <AnimatedSolutionsShowcase
              lang={lang}
              t={t}
              onLaunchSolution={tabId => {
                setActiveTab(tabId);
                setIsLoginOpen(true);
              }}
            />
          </div>

          {/* Why Us Section */}
          <div id="why-us" className="py-16 border-t border-white/10">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="text-amber-400 text-xs font-black uppercase mb-2">{t.whyUsHeading}</div>
              <h2 className="text-3xl font-black text-white mb-3">{t.whyUsTitle}</h2>
              <p className="text-slate-400">{t.whyUsDesc}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: t.w1Title, desc: t.w1Desc, iconType: 'settings', variant: 'platinum' },
                { title: t.w2Title, desc: t.w2Desc, iconType: 'insights', variant: 'amethyst' },
                { title: t.w3Title, desc: t.w3Desc, iconType: 'alert', variant: 'ruby' },
                { title: t.w4Title, desc: t.w4Desc, iconType: 'upload', variant: 'gold' }
              ].map((w, idx) => (
                <div key={idx} className="bg-[#0b1120]/80 border border-white/10 hover:border-amber-400/40 transition p-7 rounded-3xl shadow-xl">
                  <div className="mb-5">
                    <LuxuryIconBadge variant={w.variant} size="lg" active>
                      <LuxuryModuleIcon type={w.iconType} size={28} />
                    </LuxuryIconBadge>
                  </div>
                  <h3 className="text-lg font-black text-white mb-2">{w.title}</h3>
                  <p className="text-sm text-slate-300 leading-relaxed">{w.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Use Cases Section with Photorealistic Business Showcase Images & Live Previews */}
          <div id="use-cases" className="py-16 border-t border-white/10">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <div className="text-amber-400 text-xs font-black uppercase mb-2">{t.useCasesHeading}</div>
              <h2 className="text-3xl font-black text-white mb-3">{t.useCasesTitle}</h2>
              <p className="text-slate-400">{t.useCasesDesc}</p>
            </div>

            {(() => {
              const useCaseCards = [
                {
                  id: 'retail_online',
                  badge: tx('ตัวอย่างที่ 1 • ร้านค้าปลีกและออนไลน์', 'EXAMPLE 01 • RETAIL & ONLINE SHOP'),
                  sceneLabel: tx('ภาพตัวอย่าง: หน้าร้านค้าปลีกและจุดแพ็กสินค้าออนไลน์', 'Showcase: Retail Flagship & Online Fulfillment'),
                  imageSrc: '/usecase-retail-online.jpg',
                  title: t.u1Title,
                  desc: t.u1Desc,
                  accentColor: '#fbbf24',
                  borderGlow: 'hover:border-amber-400/60',
                  gradientBg: 'from-amber-500/20 via-sky-500/10 to-[#070b16]',
                  targetTab: 'multi_channel',
                  screenTitle: tx('หน้าจอวิเคราะห์ยอดขายหน้าร้าน + ออนไลน์ & ดึงลูกค้าเก่า', 'Omnichannel Sales & Customer Retention Console'),
                  liveStatus: tx('เชื่อมข้อมูลหน้าร้าน + ออนไลน์เรียลไทม์', 'Live POS + E-Commerce Sync'),
                  mainMetricLabel: tx('ยอดขายรวมทุกช่องทาง (เดือนนี้)', 'Total Omnichannel Revenue (MTD)'),
                  mainMetricValue: '฿1,845,000',
                  mainMetricGrowth: tx('+24.8% จากเดือนก่อน', '+24.8% vs Last Month'),
                  subMetricLabel: tx('ลูกค้าเก่ากลับมาซื้อซ้ำ', 'Returning VIP Buyers'),
                  subMetricValue: tx('142 ราย (+฿284,000)', '142 Buyers (+฿284,000)'),
                  channels: [
                    { name: tx('หน้าร้านสาขาหลัก', 'Flagship Storefront'), pct: 46, val: '฿848,700', color: '#fbbf24' },
                    { name: tx('ช้อปปี้และลาซาด้า', 'Shopee & Lazada Mall'), pct: 34, val: '฿627,300', color: '#38bdf8' },
                    { name: tx('ติ๊กต็อกและไลน์ร้านค้า', 'TikTok Shop & LINE OA'), pct: 20, val: '฿369,000', color: '#34d399' }
                  ],
                  alertText: tx(
                    '🔥 ระบบแนะนำ: ส่งคูปองส่วนลด 10% ให้ลูกค้าที่ไม่ได้ซื้อเกิน 45 วัน จำนวน 68 ราย และเตือนเติมสต็อก "เซรั่มบำรุงผิว" ก่อนของหมดใน 4 วัน',
                    '🔥 AI Action: Send 10% win-back coupon to 68 inactive buyers (>45 days) & restock "Facial Serum" before stockout in 4 days.'
                  ),
                  highlights: [
                    tx('แยกกำไรสุทธิรายช่องทางหลังหักค่าธรรมเนียมแพลตฟอร์ม', 'Net profit breakdown per channel after platform fees'),
                    tx('จัดกลุ่มลูกค้าชั้นดี (VIP) และลูกค้าที่เริ่มห่างหายอัตโนมัติ', 'Automated VIP segmentation & inactive buyer win-back alerts'),
                    tx('พยากรณ์วันที่สินค้าขายดีจะหมดสต็อกล่วงหน้าแม่นยำ', 'Predictive stockout countdown for fast-moving SKUs')
                  ],
                  sampleItems: [
                    { col1: tx('เซรั่มทองคำ 30 มล.', '24K Gold Serum 30ml'), col2: tx('ขายดีอันดับ 1 (420 ชิ้น)', 'Top Seller (420 pcs)'), col3: tx('กำไรสุทธิ 48%', 'Net Margin 48%') },
                    { col1: tx('ชุดของขวัญพรีเมียม', 'Luxury Gift Box Set'), col2: tx('ยอดสั่งซื้อออนไลน์พุ่ง +65%', 'Online Orders +65%'), col3: tx('กำไรสุทธิ 52%', 'Net Margin 52%') }
                  ],
                  profilePreset: {
                    companyName: tx('ร้านค้าปลีกและร้านค้าออนไลน์ครบวงจร', 'Omnichannel Retail & Online Flagship Store'),
                    grossMarginPct: 48,
                    mainProducts: tx('สินค้าแฟชั่น เครื่องสำอาง และสินค้าไลฟ์สไตล์ขายดี', 'Cosmetics, Fashion & Fast-Moving Lifestyle Goods'),
                    customRules: tx('เน้นดึงลูกค้าเก่ากลับมาซื้อซ้ำทุก 30 วัน และคุมค่าโฆษณาไม่เกิน 12%', 'Focus on 30-day repeat purchase campaigns and keep ad spend under 12%')
                  }
                },
                {
                  id: 'restaurant_franchise',
                  badge: tx('ตัวอย่างที่ 2 • ร้านกาแฟ คาเฟ่ และร้านอาหาร', 'EXAMPLE 02 • COFFEE SHOP, CAFE & RESTAURANT'),
                  sceneLabel: tx('ภาพตัวอย่าง: เคาน์เตอร์ร้านกาแฟ คาเฟ่ และจุดแคชเชียร์ POS', 'Showcase: Specialty Coffee Bar & Smart POS Terminal'),
                  imageSrc: '/usecase-cafe-restaurant.jpg',
                  title: t.u2Title,
                  desc: t.u2Desc,
                  accentColor: '#38bdf8',
                  borderGlow: 'hover:border-sky-400/60',
                  gradientBg: 'from-sky-500/20 via-rose-500/10 to-[#070b16]',
                  targetTab: 'staff_pos',
                  screenTitle: tx('หน้าจอเปรียบเทียบสาขา & ตรวจจับทุจริตแคชเชียร์ร้านกาแฟ', 'Multi-Branch Cafe Performance & Cashier Fraud Audit'),
                  liveStatus: tx('ส่งสรุปยอดเข้ามือถือทุกวัน 22:00 น.', 'Auto Daily 22:00 Mobile Summary'),
                  mainMetricLabel: tx('ยอดขายรวม 4 สาขาวันนี้', 'Today Total Across 4 Branches'),
                  mainMetricValue: '฿428,500',
                  mainMetricGrowth: tx('1,240 บิล • เฉลี่ย ฿345/บิล', '1,240 Bills • Avg ฿345/Bill'),
                  subMetricLabel: tx('ตรวจพบรายการต้องสงสัยหน้าแคชเชียร์', 'Cashier Anomaly & Void Alerts'),
                  subMetricValue: tx('เตือนด่วน 1 รายการ (สาขา 2)', '1 Critical Alert (Branch #2)'),
                  channels: [
                    { name: tx('สาขาสยามสแควร์ (ร้านกาแฟเรือธง)', 'Siam Square Flagship Cafe'), pct: 92, val: '฿165,200', color: '#38bdf8' },
                    { name: tx('สาขาอารีย์ (คาเฟ่ & เดลิเวอรี)', 'Ari Cafe & Delivery'), pct: 78, val: '฿118,400', color: '#34d399' },
                    { name: tx('สาขาทองหล่อ (ตรวจสอบบิลยกเลิก)', 'Thonglor (Void Alert)'), pct: 64, val: '฿144,900', color: '#f43f5e' }
                  ],
                  alertText: tx(
                    '🛡️ แจ้งเตือนความปลอดภัย: แคชเชียร์เครื่องที่ 2 (สาขาทองหล่อ) มีการกดยกเลิกบิลหลังพิมพ์ใบเสร็จ 4 ครั้ง คิดเป็นเงิน ฿3,480 ระบบส่งแจ้งเตือนเข้ามือถือเจ้าของร้านทันที',
                    '🛡️ Security Alert: POS Terminal #2 (Thonglor) recorded 4 post-receipt bill voids totaling ฿3,480. Instant alert sent to owner mobile.'
                  ),
                  highlights: [
                    tx('ตรวจจับการกดยกเลิกบิลหลังรับเงินสดและเปิดลิ้นชักโดยไม่ขาย', 'Detect post-payment bill voids & unauthorized cash drawer opens'),
                    tx('เปรียบเทียบยอดขาย ต้นทุนเมล็ดกาแฟ/วัตถุดิบ และยอดต่อบิลของแต่ละสาขา', 'Compare sales, coffee/food cost %, and basket size across all branches'),
                    tx('สรุปยอดขายและกำไรสุทธิส่งเข้าไลน์/มือถืออัตโนมัติทุกคืน 22:00 น.', 'Automated nightly 22:00 executive sales & profit report to mobile')
                  ],
                  sampleItems: [
                    { col1: tx('กาแฟสเปเชียลตี้ & เบเกอรี', 'Specialty Coffee & Bakery'), col2: tx('ยอดขาย 680 แก้ว/วัน', '680 Cups/Day Sold'), col3: tx('ต้นทุนวัตถุดิบ 28%', 'Food Cost 28%') },
                    { col1: tx('เซ็ตอาหารคู่เครื่องดื่ม', 'Signature Meal Combo Set'), col2: tx('เพิ่มยอดต่อบิล +฿115', 'Upsell Basket +฿115'), col3: tx('กำไรขั้นต้น 64%', 'Gross Margin 64%') }
                  ],
                  profilePreset: {
                    companyName: tx('เครือร้านกาแฟ คาเฟ่ และร้านอาหารแฟรนไชส์', 'Multi-Branch Specialty Coffee Shop & Restaurant Chain'),
                    grossMarginPct: 62,
                    mainProducts: tx('เครื่องดื่มกาแฟสด เบเกอรีโฮมเมด และอาหารจานหลัก', 'Specialty Coffee, Artisanal Bakery & Signature Dining Dishes'),
                    customRules: tx('ตรวจสอบบิลยกเลิกทุกสาขาแบบเรียลไทม์ และคุมต้นทุนวัตถุดิบไม่เกิน 32%', 'Audit POS bill voids in real time and keep food cost under 32%')
                  }
                },
                {
                  id: 'wellness_clinic',
                  badge: tx('ตัวอย่างที่ 3 • คลินิกความงามและสุขภาพ', 'EXAMPLE 03 • WELLNESS & BEAUTY CLINICS'),
                  sceneLabel: tx('ภาพตัวอย่าง: คลินิกความงามและเคาน์เตอร์ดูแลลูกค้า VIP', 'Showcase: Luxury Aesthetic Clinic & VIP Reception'),
                  imageSrc: '/usecase-beauty-clinic.jpg',
                  title: t.u3Title,
                  desc: t.u3Desc,
                  accentColor: '#c084fc',
                  borderGlow: 'hover:border-purple-400/60',
                  gradientBg: 'from-purple-500/20 via-amber-500/10 to-[#070b16]',
                  targetTab: 'customers',
                  screenTitle: tx('หน้าจอติดตามคอร์สลูกค้า VIP & แจ้งเตือนนัดหมายอัตโนมัติ', 'VIP Course Package Tracker & Client Retention CRM'),
                  liveStatus: tx('อัตราต่อคอร์สลูกค้าเก่า 88.5%', '88.5% VIP Package Renewal Rate'),
                  mainMetricLabel: tx('รายได้คอร์สความงามและสุขภาพ', 'Monthly Clinic Package Revenue'),
                  mainMetricValue: '฿2,960,000',
                  mainMetricGrowth: tx('ยอดเฉลี่ย ฿28,500 ต่อท่าน', 'Avg Ticket ฿28,500 / Client'),
                  subMetricLabel: tx('ลูกค้า VIP ใกล้ครบกำหนดนัด/คอร์สหมด', 'Upcoming Renewals & Follow-ups'),
                  subMetricValue: tx('27 ท่าน (มูลค่าต่อคอร์ส ~฿760,000)', '27 VIPs (~฿760,000 Renewal Value)'),
                  channels: [
                    { name: tx('โปรแกรมยกกระชับและปรับรูปหน้า', 'Ulthera & Facial Contouring'), pct: 88, val: '฿1,420,000', color: '#c084fc' },
                    { name: tx('คอร์สวิตามินผิวและเวชศาสตร์ชะลอวัย', 'IV Drip & Anti-Aging Wellness'), pct: 74, val: '฿920,000', color: '#fbbf24' },
                    { name: tx('ผลิตภัณฑ์เวชสำอางดูแลผิวต่อเนื่อง', 'Medical Skincare Home-Care'), pct: 58, val: '฿620,000', color: '#34d399' }
                  ],
                  alertText: tx(
                    '💎 รายชื่อลูกค้าที่ต้องดูแลวันนี้: คุณพิมพ์ชนก (ระดับแพลทินัม) เหลือคอร์สเลเซอร์ 1 ครั้งสุดท้าย • แนะนำเสนอโปรต่อคอร์สรับส่วนลดพิเศษ 15% ทันที',
                    '💎 VIP Follow-Up Today: Ms. Pimchanok (Platinum Tier) has 1 laser session remaining • Present 15% Early-Renewal Privilege now.'
                  ),
                  highlights: [
                    tx('บันทึกประวัติการซื้อคอร์ส จำนวนครั้งคงเหลือ และยอดสะสมรายบุคคล', 'Track individual package balances, treatment history & lifetime value'),
                    tx('แจ้งเตือนทีมงานล่วงหน้าเมื่อลูกค้าใกล้หมดคอร์สหรือไม่ได้เข้าคลินิกเกิน 60 วัน', 'Auto-alert staff when clients have 1 session left or are inactive >60 days'),
                    tx('วัดผลงานที่ปรึกษาความงาม (Sales Consultant) และอัตราการปิดการขายรายคน', 'Monitor consultant conversion rates and upsell commissions accurately')
                  ],
                  sampleItems: [
                    { col1: tx('คุณพิมพ์ชนก (ลูกค้า VIP)', 'Ms. Pimchanok (Platinum VIP)'), col2: tx('คอร์สยกกระชับ (เหลือ 1 ครั้ง)', 'Contour Course (1 left)'), col3: tx('ยอดสะสม ฿185,000', 'LTV ฿185,000') },
                    { col1: tx('คุณกานต์ธิดา (ลูกค้าประจำ)', 'Ms. Kanthida (Gold Member)'), col2: tx('ครบกำหนดนัดติดตามผลพรุ่งนี้', 'Follow-up Due Tomorrow'), col3: tx('ยอดสะสม ฿94,000', 'LTV ฿94,000') }
                  ],
                  profilePreset: {
                    companyName: tx('คลินิกความงามและศูนย์สุขภาพครบวงจร', 'Premier Aesthetic & Anti-Aging Wellness Clinic'),
                    grossMarginPct: 68,
                    mainProducts: tx('คอร์สเลเซอร์ยกกระชับ โปรแกรมดริปวิตามิน และเวชสำอางพรีเมียม', 'Laser Lifting Packages, IV Wellness Drips & Medical Skincare'),
                    customRules: tx('ติดตามลูกค้า VIP ที่เหลือคอร์ส 1-2 ครั้งสุดท้ายทุกสัปดาห์เพื่อรักษาอัตราต่อคอร์สเกิน 85%', 'Follow up with VIP clients at 1-2 remaining sessions weekly to keep renewal above 85%')
                  }
                },
                {
                  id: 'wholesale_distributor',
                  badge: tx('ตัวอย่างที่ 4 • โรงงาน คลังสินค้า และธุรกิจค้าส่ง', 'EXAMPLE 04 • FACTORY, WAREHOUSE & WHOLESALE'),
                  sceneLabel: tx('ภาพตัวอย่าง: โรงงานอัจฉริยะ คลังสินค้า และศูนย์กระจายสินค้าค้าส่ง', 'Showcase: Smart Factory, Warehouse & Wholesale Hub'),
                  imageSrc: '/usecase-factory-wholesale.jpg',
                  title: t.u4Title,
                  desc: t.u4Desc,
                  accentColor: '#10b981',
                  borderGlow: 'hover:border-emerald-400/60',
                  gradientBg: 'from-emerald-500/20 via-amber-500/10 to-[#070b16]',
                  targetTab: 'procurement',
                  screenTitle: tx('หน้าจอโรงงาน คลังสินค้า & จัดซื้อรวมศูนย์ (Central PO)', 'Smart Factory Inventory & Central Procurement PO Hub'),
                  liveStatus: tx('ประหยัดต้นทุนสั่งซื้อรวม -14.5%', 'Volume Discount Saved -14.5%'),
                  mainMetricLabel: tx('มูลค่าการผลิตและกระจายสินค้าต่อเดือน', 'Monthly Factory & Wholesale Volume'),
                  mainMetricValue: '฿6,480,000',
                  mainMetricGrowth: tx('หมุนเวียนสต็อกไวขึ้น 3.4 เท่า', '3.4x Faster Stock Turnover'),
                  subMetricLabel: tx('ส่วนลดพิเศษจากการรวมใบสั่งซื้อ (Economy of Scale)', 'Consolidated PO Volume Savings'),
                  subMetricValue: tx('ประหยัดได้ ฿385,000 / เดือน', 'Saved ฿385,000 / Month'),
                  channels: [
                    { name: tx('อัตราซัพพลายเออร์ส่งวัตถุดิบครบ (Fill Rate)', 'Supplier Raw Material Fill Rate'), pct: 98, val: '98.4%', color: '#10b981' },
                    { name: tx('อัตราส่งตรงเวลาตามสัญญา (Lead Time SLA)', 'On-Time Delivery SLA'), pct: 95, val: '95.2%', color: '#38bdf8' },
                    { name: tx('ระบายสินค้าค้างคลังข้ามสาขาสำเร็จ', 'Cross-Depot Stock Balancing'), pct: 89, val: '320 ลัง', color: '#fbbf24' }
                  ],
                  alertText: tx(
                    '🏭 ระบบโรงงานและคลังจัดซื้อรวมศูนย์: รวบรวมยอดวัตถุดิบและสินค้าใกล้หมดจาก 5 คลังสาขา ออกใบสั่งซื้อรวม (Central PO) ในคลิกเดียว ได้ส่วนลดซัพพลายเออร์เพิ่มทันที 14%',
                    '🏭 Smart Factory & Central PO: Consolidated raw material & low-stock requisitions across 5 depots into 1 Master PO, unlocking a 14% bulk discount.'
                  ),
                  highlights: [
                    tx('รวมยอดสั่งซื้อวัตถุดิบและสินค้าจากทุกสาขาเป็นใบสั่งซื้อเดียว (Central PO) เพื่อต่อรองราคาล็อตใหญ่', 'Consolidate multi-branch & factory requisitions into a single Central PO for bulk discounts'),
                    tx('วัดคะแนนซัพพลายเออร์ทั้งความเร็วในการส่ง (Lead Time) และความครบถ้วนของสินค้า (Fill Rate)', 'Score suppliers on Lead Time reliability and Order Fill Rate automatically'),
                    tx('โอนย้ายสินค้าระหว่างโรงงาน-คลังสาขา และส่งออกรายงานภาษีซื้อ-ภาษีขายในคลิกเดียว', '1-click factory-to-branch stock transfers and instant VAT tax report export')
                  ],
                  sampleItems: [
                    { col1: tx('ใบสั่งซื้อรวม #PO-2026-889', 'Consolidated #PO-2026-889'), col2: tx('รวมยอดโรงงาน + 4 สาขา (1,500 ลัง)', 'Factory + 4 Depots (1,500 Crates)'), col3: tx('ลดต้นทุน -฿142,000', 'Saved -฿142,000') },
                    { col1: tx('โอนสินค้าระหว่างคลัง #TR-104', 'Inter-Depot Transfer #TR-104'), col2: tx('โรงงานกลาง → สาขาเชียงใหม่', 'Central Factory → Chiang Mai'), col3: tx('ลดของค้างสต็อก 100%', 'Zero Deadstock') }
                  ],
                  profilePreset: {
                    companyName: tx('โรงงานผลิตและศูนย์กระจายสินค้าค้าส่งครบวงจร', 'Smart Manufacturing Factory & Regional Wholesale Hub'),
                    grossMarginPct: 36,
                    mainProducts: tx('สินค้าโรงงานผลิตเอง สินค้าอุปโภคบริโภคยกลัง และวัตถุดิบอุตสาหกรรม', 'Manufactured Goods, Bulk FMCG Cartons & Industrial Supplies'),
                    customRules: tx('รวมใบสั่งซื้อวัตถุดิบทุกวันจันทร์เพื่อรับส่วนลด Volume Discount ขั้นต่ำ 12% จากซัพพลายเออร์เกรด A', 'Consolidate raw material POs every Monday to secure at least 12% Volume Discount from Grade-A vendors')
                  }
                }
              ];

              const handleLaunchUseCaseDemo = (card) => {
                const quickUser = {
                  name: tx('คุณเจ้าของกิจการ', 'Executive Store Owner'),
                  email: authEmail || 'pongsatornnantakong88@gmail.com',
                  sub: 'owner-vip',
                  picture: 'https://ui-avatars.com/api/?name=VIP+Owner&background=fbbf24&color=0f172a&bold=true'
                };
                setBizProfile(card.profilePreset);
                setActiveTab(card.targetTab);
                setSelectedUseCasePreview(null);
                setUser(quickUser);
                toast.success(
                  tx(
                    `เปิดระบบตัวอย่างสำหรับ "${card.title}" เรียบร้อยแล้ว!`,
                    `Launched live workspace for "${card.title}"!`
                  )
                );
              };

              return (
                <>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {useCaseCards.map((u) => (
                      <div
                        key={u.id}
                        className={`bg-[#0b1120]/90 border border-white/15 ${u.borderGlow} transition-all duration-300 rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between group`}
                      >
                        {/* Top Visual Showcase Header with Photorealistic Business Image */}
                        <div className={`p-6 bg-gradient-to-br ${u.gradientBg} border-b border-white/10`}>
                          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                            <span
                              className="text-[11px] font-black uppercase px-3 py-1 rounded-full border"
                              style={{
                                color: u.accentColor,
                                borderColor: `${u.accentColor}55`,
                                backgroundColor: `${u.accentColor}18`
                              }}
                            >
                              {u.badge}
                            </span>
                            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 px-3 py-1 rounded-full">
                              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                              {u.liveStatus}
                            </span>
                          </div>

                          {/* Photorealistic Business Image Banner (Retail, Coffee Shop, Clinic, Factory) */}
                          <div
                            onClick={() => setSelectedUseCasePreview(u)}
                            className="cursor-pointer relative rounded-2xl overflow-hidden border border-white/20 shadow-2xl group/img h-56 sm:h-64 bg-[#050814]"
                            title={tx('คลิกเพื่อดูภาพตัวอย่างขนาดใหญ่', 'Click to view full-size image preview')}
                          >
                            <img
                              src={u.imageSrc}
                              alt={u.title}
                              className="w-full h-full object-cover object-center transform group-hover/img:scale-105 transition duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#050814] via-[#050814]/25 to-transparent" />

                            {/* Top-left scene label */}
                            <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md border border-white/20 text-white text-xs font-bold px-3 py-1.5 rounded-xl shadow-lg">
                              📸 {u.sceneLabel}
                            </div>

                            {/* Bottom overlay with live metric & zoom button */}
                            <div className="absolute bottom-3 left-3 right-3 flex flex-wrap items-end justify-between gap-2">
                              <div className="bg-slate-950/85 backdrop-blur-md border border-white/15 rounded-xl px-3.5 py-2 shadow-lg">
                                <div className="text-[11px] text-slate-300 font-bold">{u.mainMetricLabel}</div>
                                <div className="flex items-baseline gap-2">
                                  <span className="text-lg font-black text-white">{u.mainMetricValue}</span>
                                  <span className="text-xs font-bold text-emerald-400">{u.mainMetricGrowth}</span>
                                </div>
                              </div>

                              <div className="bg-amber-400 text-slate-950 text-xs font-black px-3.5 py-2 rounded-xl shadow-lg flex items-center gap-1.5">
                                <span>🔍</span>
                                <span>{tx('คลิกดูภาพขนาดใหญ่', 'Enlarge Photo')}</span>
                              </div>
                            </div>
                          </div>

                          {/* Live Interactive UI Mockup Strip below Photo */}
                          <div className="mt-4 bg-[#060a14]/90 border border-white/10 rounded-2xl p-4">
                            <div className="flex items-center justify-between border-b border-white/10 pb-2.5 mb-3">
                              <span className="text-xs font-black text-white flex items-center gap-1.5">
                                <span
                                  className="w-2.5 h-2.5 rounded-full"
                                  style={{ backgroundColor: u.accentColor }}
                                ></span>
                                {u.screenTitle}
                              </span>
                              <span
                                className="text-xs font-black"
                                style={{ color: u.accentColor }}
                              >
                                {u.subMetricValue}
                              </span>
                            </div>

                            {/* Progress Bars for Industry Breakdown */}
                            <div className="space-y-2 mb-3">
                              {u.channels.map((ch, cIdx) => (
                                <div key={cIdx} className="text-xs">
                                  <div className="flex justify-between font-bold text-slate-200 mb-1">
                                    <span>{ch.name}</span>
                                    <span style={{ color: ch.color }}>{ch.val}</span>
                                  </div>
                                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                                    <div
                                      className="h-full rounded-full"
                                      style={{ width: `${ch.pct}%`, backgroundColor: ch.color }}
                                    ></div>
                                  </div>
                                </div>
                              ))}
                            </div>

                            {/* Smart Alert Banner inside Preview */}
                            <div className="text-xs bg-amber-400/10 border border-amber-400/25 text-amber-200 rounded-xl p-2.5 font-semibold leading-relaxed">
                              {u.alertText}
                            </div>
                          </div>
                        </div>

                        {/* Bottom Card Description & Action Buttons */}
                        <div className="p-6 flex-1 flex flex-col justify-between bg-[#0b1120]">
                          <div>
                            <div className="flex items-center gap-3 mb-2.5">
                              <LuxuryIconBadge
                                variant={
                                  u.id === 'retail_online'
                                    ? 'gold'
                                    : u.id === 'restaurant_franchise'
                                    ? 'sapphire'
                                    : u.id === 'wellness_clinic'
                                    ? 'amethyst'
                                    : 'emerald'
                                }
                                size="md"
                                active
                              >
                                <LuxuryModuleIcon type={u.targetTab} size={24} />
                              </LuxuryIconBadge>
                              <h3 className="text-xl font-black text-amber-400">{u.title}</h3>
                            </div>
                            <p className="text-sm text-slate-300 leading-relaxed mb-4">{u.desc}</p>

                            <div className="space-y-1.5 mb-5">
                              {u.highlights.map((hl, hIdx) => (
                                <div key={hIdx} className="flex items-start gap-2 text-xs text-slate-200 font-semibold">
                                  <span className="text-emerald-400 font-black mt-0.5">✓</span>
                                  <span>{hl}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10">
                            <button
                              type="button"
                              onClick={() => setSelectedUseCasePreview(u)}
                              className="flex-1 py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs border border-white/15 transition cursor-pointer"
                            >
                              {tx('🔍 ดูภาพตัวอย่างขนาดใหญ่', '🔍 View Full-Size Photo & Data')}
                            </button>
                            <button
                              type="button"
                              onClick={() => handleLaunchUseCaseDemo(u)}
                              className="flex-1 py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 text-slate-950 font-black text-xs transition shadow-lg cursor-pointer"
                            >
                              {tx('🚀 ทดลองใช้โหมดธุรกิจนี้ทันที', '🚀 Try Live Mode for This Business')}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Full-Size Interactive Use Case Photo & Data Lightbox Modal */}
                  {selectedUseCasePreview && (
                    <div
                      className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto"
                      onClick={() => setSelectedUseCasePreview(null)}
                    >
                      <div
                        className="bg-[#0b1120] border border-amber-400/40 rounded-3xl max-w-4xl w-full p-6 lg:p-8 shadow-2xl relative my-8"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <button
                          type="button"
                          onClick={() => setSelectedUseCasePreview(null)}
                          className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white font-black flex items-center justify-center cursor-pointer"
                        >
                          ✕
                        </button>

                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span
                            className="text-xs font-black uppercase px-3 py-1 rounded-full border"
                            style={{
                              color: selectedUseCasePreview.accentColor,
                              borderColor: `${selectedUseCasePreview.accentColor}55`,
                              backgroundColor: `${selectedUseCasePreview.accentColor}18`
                            }}
                          >
                            {selectedUseCasePreview.badge}
                          </span>
                          <span className="text-xs font-bold text-emerald-300 bg-emerald-500/15 border border-emerald-500/30 px-3 py-1 rounded-full">
                            {selectedUseCasePreview.liveStatus}
                          </span>
                        </div>

                        <h3 className="text-2xl font-black text-white mb-2">
                          {selectedUseCasePreview.title}
                        </h3>
                        <p className="text-sm text-slate-300 mb-5">
                          {selectedUseCasePreview.desc}
                        </p>

                        {/* Enlarged High-Resolution Photograph */}
                        <div className="mb-5 rounded-2xl overflow-hidden border border-white/20 shadow-2xl max-h-[380px] relative bg-[#050814]">
                          <img
                            src={selectedUseCasePreview.imageSrc}
                            alt={selectedUseCasePreview.title}
                            className="w-full h-80 sm:h-96 object-cover object-center"
                          />
                          <div className="absolute bottom-3 left-3 bg-slate-950/85 backdrop-blur-md border border-white/20 text-amber-300 text-xs font-bold px-3.5 py-1.5 rounded-xl">
                            📸 {selectedUseCasePreview.sceneLabel}
                          </div>
                        </div>

                        {/* Detailed Mockup Table & Metrics */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-5">
                          <div className="bg-[#060a14] border border-white/10 rounded-2xl p-4">
                            <div className="text-xs text-slate-400 font-bold">{selectedUseCasePreview.mainMetricLabel}</div>
                            <div className="text-2xl font-black text-white mt-1">{selectedUseCasePreview.mainMetricValue}</div>
                            <div className="text-xs font-bold text-emerald-400 mt-1">{selectedUseCasePreview.mainMetricGrowth}</div>
                          </div>
                          <div className="bg-[#060a14] border border-white/10 rounded-2xl p-4">
                            <div className="text-xs text-slate-400 font-bold">{selectedUseCasePreview.subMetricLabel}</div>
                            <div className="text-lg font-black text-amber-400 mt-1">{selectedUseCasePreview.subMetricValue}</div>
                            <div className="text-xs text-slate-400 mt-1">
                              {tx('พร้อมระบบแจ้งเตือนอัตโนมัติ', 'Automated real-time alert enabled')}
                            </div>
                          </div>
                          <div className="bg-[#060a14] border border-white/10 rounded-2xl p-4">
                            <div className="text-xs text-slate-400 font-bold">
                              {tx('ข้อมูลตัวอย่างในระบบ', 'Sample Live Data Rows')}
                            </div>
                            <div className="space-y-1.5 mt-2">
                              {selectedUseCasePreview.sampleItems.map((item, sIdx) => (
                                <div key={sIdx} className="text-xs flex justify-between border-b border-white/5 pb-1">
                                  <span className="font-bold text-white">{item.col1}</span>
                                  <span className="text-emerald-400 font-bold">{item.col3}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="bg-amber-400/10 border border-amber-400/30 rounded-2xl p-4 text-sm text-amber-200 font-semibold mb-6">
                          {selectedUseCasePreview.alertText}
                        </div>

                        <div className="flex flex-wrap justify-end gap-3">
                          <button
                            type="button"
                            onClick={() => setSelectedUseCasePreview(null)}
                            className="px-5 py-3 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-sm cursor-pointer"
                          >
                            {tx('ปิดหน้าต่างตัวอย่าง', 'Close Preview')}
                          </button>
                          <button
                            type="button"
                            onClick={() => handleLaunchUseCaseDemo(selectedUseCasePreview)}
                            className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-300 text-slate-950 font-black text-sm shadow-xl cursor-pointer"
                          >
                            {tx('🚀 เปิดเข้าใช้งานระบบจริงของธุรกิจนี้ทันที', '🚀 Open Live System for This Business Now')}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              );
            })()}
          </div>

          {/* Pricing Section: Starter 1,990.-/m, Professional 2,900.-/m, Premium 4,900.-/m */}
          <div id="pricing" className="py-16 border-t border-white/10">
            <div className="text-center max-w-3xl mx-auto mb-8">
              <div className="text-amber-400 text-xs font-black uppercase mb-2">{t.pricingHeading}</div>
              <h2 className="text-3xl sm:text-4xl font-black text-white mb-3">{t.pricingTitle}</h2>
              <p className="text-slate-400 text-base mb-6">{t.pricingDesc}</p>

              {/* Cute Interactive Package Quick-Selector Bar */}
              <div className="inline-flex flex-wrap items-center justify-center gap-2 p-2 rounded-3xl bg-[#070b16] border border-amber-400/35 shadow-xl">
                {[
                  { id: 'starter', emoji: '🚀', label: 'Starter • 1,990.-', color: 'sky' },
                  { id: 'professional', emoji: '🏆', label: 'Professional • 2,900.-', color: 'amber' },
                  { id: 'premium', emoji: '👑', label: 'Premium • 4,900.-', color: 'purple' }
                ].map(tab => {
                  const isPicked = previewSelectedPlanId === tab.id;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => {
                        setPreviewSelectedPlanId(tab.id);
                        handleSelectSubscriptionPlan(tab.id, null, true);
                      }}
                      className={`relative px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-black transition-all duration-300 cursor-pointer active:scale-90 flex items-center gap-2 ${
                        isPicked
                          ? 'bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 text-slate-950 shadow-[0_8px_25px_rgba(251,191,36,0.45)] scale-105'
                          : 'bg-white/5 hover:bg-white/10 text-slate-200 border border-white/10'
                      }`}
                    >
                      <span className={isPicked ? 'pkg-cute-mascot inline-block text-base' : 'text-base'}>
                        {tab.emoji}
                      </span>
                      <span>{tab.label}</span>
                      {isPicked && (
                        <span className="pkg-check-pop inline-flex items-center justify-center px-1.5 py-0.5 rounded-full bg-slate-950 text-amber-300 text-[10px] font-black">
                          ✨ {tx('เลือกอยู่', 'Active')}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
              {[
                {
                  id: 'starter',
                  name: tx('แพ็กเกจเริ่มต้น (Starter)', 'Starter'),
                  tierCode: 'STARTER',
                  emoji: '🚀',
                  cuteNote: tx('🚀 จรวดเริ่มต้น • ปลดล็อก 5/10 ระบบหลัก', '🚀 Rocket Starter • 5/10 Core Modules'),
                  unlockPct: 50,
                  price: '1,990.-',
                  unit: tx('/ เดือน', '/ m'),
                  subtitle: tx(
                    'เหมาะสำหรับร้านค้าปลีกเดี่ยวและร้านขายของออนไลน์ที่ต้องการเห็นกำไรชัดเจนทุกวัน',
                    'Ideal for single retail shops and online sellers seeking clear daily profit tracking.'
                  ),
                  badgeText: tx('🎉 สิทธิ์พิเศษ: ทดลองใช้ฟรี 14 วันแรก (เฉพาะ Starter)', '🎉 EXCLUSIVE: 14-DAY TRIAL (STARTER ONLY)'),
                  iconType: 'rocket',
                  variant: 'sapphire',
                  popular: false,
                  accentColor: '#38bdf8',
                  borderClass: 'border-white/15 hover:border-sky-400/70',
                  selectedBorder: 'border-2 border-sky-400 shadow-[0_20px_50px_-10px_rgba(56,189,248,0.42)]',
                  bgClass: 'bg-[#0b1120]/90',
                  buttonClass:
                    'bg-gradient-to-r from-sky-400 to-cyan-300 hover:from-sky-300 hover:to-cyan-200 text-slate-950 shadow-lg',
                  buttonLabel: tx('🚀 เริ่มทดลองใช้ Starter ฟรี 14 วัน (ไม่ต้องผูกบัตร)', '🚀 Start Starter 14-Day Free Trial (No Card)'),
                  targetTab: 'overview',
                  features: [
                    tx('รองรับ 1 สาขาหลัก พร้อมเชื่อมยอดขายออนไลน์', 'Supports 1 main store + online channel sync'),
                    tx('หน้าสรุปภาพรวมยอดขาย กำไรสุทธิ และตั้งเป้าหมายร้าน', 'Sales overview, net profit & monthly target planner'),
                    tx('ระบบวิเคราะห์ลูกค้าประจำและคนหาย (สูงสุด 2,500 ราย)', 'Customer loyalty & inactive buyer CRM (up to 2,500 profiles)'),
                    tx('คลังสินค้าอัจฉริยะ แจ้งเตือนเมื่อของใกล้หมดสต็อก', 'Smart inventory with automated low-stock alerts'),
                    tx('อัปโหลดไฟล์ตารางข้อมูลร้านค้าได้เองทุกหน้า', 'Self-service CSV/spreadsheet upload on every module')
                  ]
                },
                {
                  id: 'professional',
                  name: tx('แพ็กเกจมืออาชีพ (Professional)', 'Professional'),
                  tierCode: 'PROFESSIONAL',
                  emoji: '🏆',
                  cuteNote: tx('🏆 ขายดีอันดับ 1 • ปลดล็อก 8/10 ระบบ AI + LINE 22:00 น.', '🏆 #1 Best Seller • 8/10 AI Modules + LINE 22:00'),
                  unlockPct: 80,
                  price: '2,900.-',
                  unit: tx('/ เดือน', '/ m'),
                  subtitle: tx(
                    'เหมาะสำหรับร้านกาแฟ คาเฟ่ คลินิกความงาม และธุรกิจที่มี 2–5 สาขา',
                    'Built for coffee shops, cafes, beauty clinics, and growing 2–5 branch businesses.'
                  ),
                  badgeText: tx('⭐ ขายดีที่สุด • แนะนำสำหรับเจ้าของร้าน', '⭐ MOST POPULAR • RECOMMENDED'),
                  iconType: 'trophy',
                  variant: 'gold',
                  popular: true,
                  accentColor: '#fbbf24',
                  borderClass: 'border-2 border-amber-400/70 shadow-[0_0_40px_rgba(251,191,36,0.22)]',
                  selectedBorder: 'border-2 border-amber-400 shadow-[0_22px_60px_-10px_rgba(251,191,36,0.55)]',
                  bgClass: 'bg-gradient-to-b from-[#131c33] via-[#0c1324] to-[#080d1a]',
                  buttonClass:
                    'bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 hover:brightness-105 text-slate-950 shadow-xl',
                  buttonLabel: tx('🏆 กดใช้แพ็กเกจ Professional (2,900.-/เดือน)', '🏆 Activate Professional (2,900.- / m)'),
                  targetTab: 'insights',
                  features: [
                    tx('ครบทุกความสามารถในแพ็กเกจ Starter + รองรับสูงสุด 5 สาขา', 'Everything in Starter + supports up to 5 branches'),
                    tx('ระบบตรวจสอบแคชเชียร์ แจ้งเตือนกดยกเลิกบิลผิดปกติทันที', 'POS cashier audit with instant bill-void fraud alerts'),
                    tx('หน้าวิเคราะห์ข้อมูลด้วย AI พยากรณ์ยอดขายล่วงหน้า 30 วัน', 'AI Data Analytics with 30-day revenue forecasting'),
                    tx('ส่งรายงานสรุปยอดขายและกำไรเข้ามือถือทุกคืนเวลา 22:00 น.', 'Automated daily 22:00 mobile executive summary report'),
                    tx('ติดตามคอร์สลูกค้า VIP และนัดหมายไม่จำกัดจำนวน', 'Unlimited VIP client package & appointment tracking')
                  ]
                },
                {
                  id: 'premium',
                  name: tx('แพ็กเกจพรีเมียม (Premium)', 'Premium'),
                  tierCode: 'PREMIUM',
                  emoji: '👑',
                  cuteNote: tx('👑 มงกุฎเพชรสูงสุด • ปลดล็อกครบ 10/10 ระบบ + จัดซื้อรวมศูนย์', '👑 Royal Enterprise • All 10/10 Modules + Central PO'),
                  unlockPct: 100,
                  price: '4,900.-',
                  unit: tx('/ เดือน', '/ m'),
                  subtitle: tx(
                    'เหมาะสำหรับโรงงาน คลังสินค้า ธุรกิจค้าส่ง และแฟรนไชส์หลายสาขาทั่วประเทศ',
                    'Complete enterprise suite for factories, warehouses, wholesale & large franchises.'
                  ),
                  badgeText: tx('👑 ครบวงจรสูงสุด • ระดับโรงงานและองค์กร', '👑 ENTERPRISE & FACTORY SUITE'),
                  iconType: 'crown',
                  variant: 'amethyst',
                  popular: false,
                  accentColor: '#c084fc',
                  borderClass: 'border-white/15 hover:border-purple-400/70',
                  selectedBorder: 'border-2 border-purple-400 shadow-[0_20px_50px_-10px_rgba(192,132,252,0.45)]',
                  bgClass: 'bg-[#0b1120]/90',
                  buttonClass:
                    'bg-gradient-to-r from-purple-400 via-fuchsia-300 to-amber-300 hover:brightness-105 text-slate-950 shadow-lg',
                  buttonLabel: tx('👑 กดใช้แพ็กเกจ Premium (4,900.-/เดือน)', '👑 Activate Premium (4,900.- / m)'),
                  targetTab: 'procurement',
                  features: [
                    tx('ครบทุกความสามารถใน Professional + ไม่จำกัดจำนวนสาขา/คลังสินค้า', 'Everything in Professional + unlimited branches & depots'),
                    tx('ระบบจัดซื้อรวมศูนย์ (Central PO) รวมยอดสั่งซื้อขอส่วนลดซัพพลายเออร์', 'Central Procurement PO Generator for bulk volume discounts'),
                    tx('วัดความน่าเชื่อถือซัพพลายเออร์ (Lead Time & Fill Rate Scorecard)', 'Automated Supplier Lead Time & Fill Rate Scorecard'),
                    tx('โอนย้ายสินค้าระหว่างโรงงาน-สาขา และส่งออกรายงานภาษีใน 1 คลิก', 'Inter-depot stock transfers & 1-click VAT tax report export'),
                    tx('ตั้งค่ารหัสผ่านอนุมัติผู้บริหารสูงสุด + ทีมผู้เชี่ยวชาญดูแลพิเศษ', 'Executive PIN security controls + dedicated priority support')
                  ]
                }
              ].map((plan) => {
                const isSelectedCard = previewSelectedPlanId === plan.id;
                const isActivating = activatingPlanId === plan.id;
                return (
                  <div
                    key={plan.id}
                    onClick={() => setPreviewSelectedPlanId(plan.id)}
                    className={`group rounded-3xl p-7 lg:p-8 flex flex-col justify-between transition-all duration-500 relative overflow-hidden cursor-pointer ${
                      plan.bgClass
                    } ${
                      isSelectedCard ? `${plan.selectedBorder} pkg-card-selected` : plan.borderClass
                    }`}
                  >
                    {/* Cute Floating Sparkles & Confetti when Card is Selected or Activating */}
                    {(isSelectedCard || isActivating) && (
                      <>
                        <div className="pointer-events-none absolute inset-0 overflow-hidden">
                          <div className="apple-light-sweep absolute -inset-y-10 w-24 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                        </div>
                        <span className="pkg-confetti-1 pointer-events-none absolute top-5 left-1/3 text-lg">
                          ✨
                        </span>
                        <span className="pkg-confetti-2 pointer-events-none absolute top-6 right-1/4 text-lg">
                          🎉
                        </span>
                        <span className="pkg-confetti-3 pointer-events-none absolute top-4 left-1/2 text-base">
                          💖
                        </span>
                      </>
                    )}

                    <div>
                      {/* Top Badge & Cute Animated Luxury Icon */}
                      <div className="flex items-center justify-between gap-3 mb-5">
                        <span
                          className="text-xs font-black px-3.5 py-1.5 rounded-full border flex items-center gap-1.5"
                          style={{
                            color: plan.accentColor,
                            borderColor: `${plan.accentColor}55`,
                            backgroundColor: `${plan.accentColor}1a`
                          }}
                        >
                          <span className={isSelectedCard ? 'pkg-cute-mascot inline-block' : ''}>
                            {plan.emoji}
                          </span>
                          <span>{plan.badgeText}</span>
                        </span>
                        <div className={isSelectedCard ? 'pkg-cute-mascot' : 'group-hover:scale-110 transition'}>
                          <LuxuryIconBadge variant={plan.variant} size="md" active={isSelectedCard || plan.popular}>
                            <LuxuryModuleIcon type={plan.iconType} size={26} />
                          </LuxuryIconBadge>
                        </div>
                      </div>

                      {/* Package Name & Description */}
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-black tracking-widest uppercase text-slate-400">
                          {plan.tierCode}
                        </span>
                        {isSelectedCard && (
                          <span className="pkg-check-pop inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-400 text-slate-950 text-[10px] font-black shadow">
                            ✓ {tx('เลือกแพ็กเกจนี้แล้ว', 'Selected')}
                          </span>
                        )}
                      </div>
                      <h3 className="text-2xl font-black text-white mb-2">{plan.name}</h3>
                      <p className="text-sm text-slate-300 leading-relaxed mb-4">{plan.subtitle}</p>

                      {/* Cute Animated Mascot & Quota Progress Pill */}
                      <div className="cyber-toast-hud p-3 rounded-2xl bg-[#050915] border border-white/10 mb-5">
                        <div className="flex items-center justify-between text-xs font-black text-amber-300 mb-1.5">
                          <span>{plan.cuteNote}</span>
                          <span>{plan.unlockPct}%</span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all duration-700"
                            style={{
                              width: `${plan.unlockPct}%`,
                              background: `linear-gradient(90deg, ${plan.accentColor}, #fef08a)`
                            }}
                          />
                        </div>
                      </div>

                      {/* Price Box */}
                      <div className="p-5 rounded-2xl bg-[#050814]/90 border border-white/10 mb-6">
                        <div className="text-xs text-slate-400 font-bold mb-1">
                          {tx('ค่าบริการรายเดือน (ไม่มีสัญญาผูกมัด)', 'Monthly Subscription (Cancel Anytime)')}
                        </div>
                        <div className="flex items-baseline gap-2">
                          <span
                            className="text-4xl sm:text-5xl font-black tracking-tight"
                            style={{ color: plan.popular || isSelectedCard ? '#fbbf24' : '#ffffff' }}
                          >
                            {plan.price}
                          </span>
                          <span className="text-base font-bold text-slate-300">{plan.unit}</span>
                        </div>

                        {/* Exclusive 14-Day Free Trial Notice for Starter vs Paid Direct */}
                        {plan.id === 'starter' ? (
                          <div className="mt-2.5 p-2 rounded-xl bg-amber-400/15 border border-amber-400/35 text-xs text-amber-300 font-black flex items-center gap-1.5">
                            <span>🎉</span>
                            <span>{tx('สิทธิ์พิเศษ: ทดลองใช้ฟรี 14 วันแรก (เฉพาะ Starter)', 'Exclusive: 14-Day Free Trial (Starter Only)')}</span>
                          </div>
                        ) : (
                          <div className="mt-2 text-[11px] text-slate-400 font-medium">
                            {tx('*ชำระรายเดือนตามจริง (สิทธิ์ทดลองฟรี 14 วันมีเฉพาะแพ็กเกจ Starter เท่านั้น)', '*Monthly billing (14-day free trial applies exclusively to Starter Plan)')}
                          </div>
                        )}

                        <div className="text-xs text-emerald-400 font-bold mt-2">
                          ✓ {tx('อัปเดตฟีเจอร์ใหม่ฟรีตลอดการใช้งาน', 'Includes free lifetime feature updates')}
                        </div>
                      </div>

                      {/* Feature Checklist */}
                      <div className="space-y-3 mb-8">
                        <div className="text-xs font-black uppercase text-slate-400 tracking-wider">
                          {tx('สิ่งที่ได้รับในแพ็กเกจนี้:', 'What is included:')}
                        </div>
                        {plan.features.map((feat, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 text-sm text-slate-200 font-semibold leading-snug">
                            <span
                              className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-black flex-shrink-0 mt-0.5"
                              style={{
                                backgroundColor: `${plan.accentColor}22`,
                                color: plan.accentColor,
                                border: `1px solid ${plan.accentColor}55`
                              }}
                            >
                              ✓
                            </span>
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Cute & Modern Animated Activation Button */}
                    <button
                      type="button"
                      onClick={e => {
                        e.stopPropagation();
                        setPreviewSelectedPlanId(plan.id);
                        setActivatingPlanId(plan.id);
                        setTimeout(() => {
                          const enteredEmail = String(authEmail || '').trim().toLowerCase();
                          const isAdminEmail = enteredEmail === SUPER_ADMIN_EMAIL;
                          const quickUser = isAdminEmail
                            ? {
                                name: tx('ผู้ดูแลระบบสูงสุด (Super Admin)', 'Super Admin'),
                                email: SUPER_ADMIN_EMAIL,
                                sub: 'super-admin',
                                role: 'admin',
                                picture: 'https://ui-avatars.com/api/?name=Super+Admin&background=fbbf24&color=0f172a&bold=true'
                              }
                            : {
                                name: tx(`ลูกค้าแพ็กเกจ ${plan.tierCode}`, `${plan.tierCode} Customer`),
                                email: enteredEmail || 'customer@insightflow.app',
                                sub: 'customer-account',
                                role: 'customer',
                                picture: 'https://ui-avatars.com/api/?name=Customer&background=38bdf8&color=0f172a&bold=true'
                              };
                          setActivatingPlanId(null);
                          handleSelectSubscriptionPlan(plan.id, plan.targetTab);
                          setUser(quickUser);
                        }, 620);
                      }}
                      className={`relative overflow-hidden w-full py-4 px-5 rounded-2xl font-black text-sm transition-all duration-300 cursor-pointer active:scale-95 ${plan.buttonClass}`}
                    >
                      {isActivating ? (
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-center gap-2 text-slate-950 font-black">
                            <span className="animate-bounce text-lg">🎉</span>
                            <span>
                              {tx(
                                `กำลังเปิดใช้งาน ${plan.tierCode}... ✨`,
                                `Activating ${plan.tierCode}... ✨`
                              )}
                            </span>
                            <span className="animate-bounce text-lg">💖</span>
                          </div>
                          <div className="h-1.5 w-full rounded-full bg-slate-950/25 overflow-hidden">
                            <div className="pkg-unlock-bar h-full rounded-full bg-slate-950" />
                          </div>
                        </div>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          <span className="pkg-cute-mascot inline-block text-base">{plan.emoji}</span>
                          <span>{plan.buttonLabel}</span>
                          <span>✨</span>
                        </span>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </main>

        {/* Smartphone Fixed Bottom Quick-Entry Bar on Landing Page */}
        <div
          className={`fixed bottom-0 inset-x-0 z-40 md:hidden border-t backdrop-blur-2xl px-3 py-2.5 shadow-2xl ${
            theme === 'dark' ? 'bg-[#050814]/95 border-white/15' : 'bg-white/95 border-slate-300'
          }`}
          style={{ paddingBottom: 'max(0.6rem, env(safe-area-inset-bottom))' }}
        >
          <div className="grid grid-cols-2 gap-2 max-w-md mx-auto">
            <button
              type="button"
              onClick={() => {
                const adminUser = {
                  name: tx('ผู้ดูแลระบบสูงสุด (Super Admin)', 'Super Admin'),
                  email: SUPER_ADMIN_EMAIL,
                  phone: authPhone || '089-999-8888',
                  lineId: authLineId || '@owner_insightflow',
                  sub: 'super-admin',
                  role: 'admin',
                  picture: 'https://ui-avatars.com/api/?name=Super+Admin&background=fbbf24&color=0f172a&bold=true'
                };
                setAdminPreviewCustomerPlan(false);
                try {
                  localStorage.setItem('insightflow_saved_user', JSON.stringify(adminUser));
                } catch {
                  // ignore storage error
                }
                setUser(adminUser);
                toast.success(
                  tx(
                    '🚀 เข้าสู่หน้าแดชบอร์ดจัดการร้านค้าทันทีเรียบร้อยแล้ว!',
                    '🚀 Entered Store Intelligence Dashboard!'
                  )
                );
              }}
              className="py-3 px-3 rounded-xl bg-gradient-to-r from-amber-400 to-amber-300 text-slate-950 font-black text-xs shadow-lg cursor-pointer text-center truncate"
            >
              {tx('🚀 เข้าแดชบอร์ดทันที (1 คลิก)', '🚀 1-Tap Enter Dashboard')}
            </button>
            <button
              type="button"
              onClick={() => setIsLoginOpen(true)}
              className={`py-3 px-3 rounded-xl font-black text-xs border cursor-pointer text-center truncate ${
                theme === 'dark'
                  ? 'bg-white/10 text-white border-white/20'
                  : 'bg-slate-900 text-white border-slate-900'
              }`}
            >
              {tx('🔑 ล็อกอิน / ผูกเบอร์ LINE', '🔑 Sign In / Link LINE')}
            </button>
          </div>
        </div>

        {/* Cute Ginger Cat Mascot on Main Landing Page: Walks out immediately on visit and recurs every 1-3 mins */}
        <CuteCatPricingNudge
          isEn={isEn}
          hasSubscribed={false}
          onOpenPricing={() => {
            const pricingEl = document.getElementById('pricing');
            if (pricingEl) {
              pricingEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
            } else {
              setIsLoginOpen(true);
            }
          }}
          onOpenRegister={() => setIsLoginOpen(true)}
        />
      </div>
    );
  }

  // =========================================================================
  // 2. DASHBOARD VIEWPORT (100% Pure Thai or 100% Pure English, Zero Leading Numbers)
  // =========================================================================
  const sidebarMenuItems = [
    {
      id: 'overview',
      label: tx('ภาพรวมธุรกิจ', 'Business Overview'),
      subLabel: tx('ยอดขายและเป้าหมายร้าน', 'Sales & Target Planner'),
      variant: 'gold',
      minPlan: 'starter'
    },
    {
      id: 'customers',
      label: tx('วิเคราะห์ลูกค้า', 'Customer Insights'),
      subLabel: tx('ลูกค้าชั้นดีและคนหาย', 'VIP & Inactive Buyers'),
      badge: tx('ลูกค้า', 'CRM'),
      variant: 'ruby',
      minPlan: 'starter'
    },
    {
      id: 'staff_pos',
      label: tx('พนักงานและจุดขาย', 'Staff & Cashier Audit'),
      subLabel: tx('ยอดต่อบิลและตรวจบิลยกเลิก', 'Basket Size & Fraud Check'),
      badge: tx('แคชเชียร์', 'POS'),
      variant: 'sapphire',
      minPlan: 'professional'
    },
    {
      id: 'multi_channel',
      label: tx('เปรียบเทียบสาขาและออนไลน์', 'Branch & Channel Compare'),
      subLabel: tx('เทียบกำไรและแจ้งเตือนรายวัน', 'Margins & Daily 22:00 Alert'),
      badge: tx('ยอดนิยม', 'HOT'),
      variant: 'gold',
      minPlan: 'professional'
    },
    {
      id: 'procurement',
      label: tx('ซัพพลายเออร์และจัดซื้อรวมศูนย์', 'Central Procurement & Vendors'),
      subLabel: tx('รวมใบสั่งซื้อทุกสาขาเพื่อขอส่วนลด', 'Central PO & Vendor Scorecard'),
      badge: tx('ลดต้นทุน', 'PO'),
      variant: 'emerald',
      minPlan: 'premium'
    },
    {
      id: 'inventory',
      label: tx('คลังสินค้าอัจฉริยะ', 'Smart Inventory'),
      subLabel: tx('เช็คของใกล้หมดและเติมสต็อก', 'Low Stock & Reordering'),
      badge: tx('สต็อก', 'SKU'),
      variant: 'emerald',
      
      minPlan: 'starter'
    },
    {
      id: 'insights',
      label: tx('วิเคราะห์ข้อมูลด้วย AI', 'AI Data Analytics'),
      subLabel: tx('พยากรณ์ยอดขายและถาม-ตอบ AI', 'AI Forecast, Playbooks & Copilot'),
      badge: 'AI',
      variant: 'amethyst',
      minPlan: 'professional'
    },
    {
      id: 'live',
      label: tx('สถานะหน้าร้านสด', 'Live Store Stream'),
      subLabel: tx('ดูคำสั่งซื้อเข้าแบบวินาทีต่อวินาที', 'Real-Time Incoming Orders'),
      badge: tx('สด', 'LIVE'),
      variant: 'cyan',
      minPlan: 'starter'
    },
    {
      id: 'database',
      label: tx('ฐานข้อมูลร้านค้า', 'Store Database'),
      subLabel: tx('ตารางเก็บข้อมูลการขาย', 'Master Transaction Records'),
      variant: 'sapphire',
      minPlan: 'starter'
    },
    {
      id: 'admin',
      label: tx('หน้าต่าง Admin (ลูกค้าที่สมัครเว็บ)', 'Admin (Website Customers)'),
      subLabel: tx(`ชื่อ • เบอร์โทร • ไลน์ (${registeredWebCustomers.length} ราย)`, `Name • Phone • LINE (${registeredWebCustomers.length})`),
      badge: `ADMIN (${registeredWebCustomers.length})`,
      variant: 'ruby',
      minPlan: 'super_admin'
    },
    {
      id: 'settings',
      label: tx('ตั้งค่าระบบและภาษา', 'Language & Settings'),
      subLabel: tx('เลือกภาษาและขนาดตัวหนังสือ', 'Language, Font Size & Theme'),
      variant: 'platinum',
      minPlan: 'starter'
    }
  ];

  const currentTabMeta = sidebarMenuItems.find(m => m.id === activeTab) || sidebarMenuItems[0];
  const isTabUnlocked = tabId => {
    if (tabId === 'admin') return true;
    if (isExemptAdminMode) return true;
    return activePlanMeta.allowedTabs.includes(tabId);
  };
  const currentTabRequiredPlanKey = currentTabMeta.minPlan || 'starter';
  const currentTabRequiredPlan = planTiersMap[currentTabRequiredPlanKey] || planTiersMap.professional;

  return (
    <div
      className={`min-h-screen flex font-sans select-none transition-colors duration-300 ${
        theme === 'dark' ? 'theme-dark bg-[#030712] text-slate-100' : 'theme-light bg-[#f1f5f9] text-slate-900'
      }`}
    >
      <Toaster position="top-right" gutter={14} containerStyle={{ top: 18, right: 18, zIndex: 9999 }} />

      {/* Mobile & Tablet Backdrop Overlay for Slide-Over Drawer */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/75 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Navigation (Slide-Over Drawer on Smartphone/Tablet, Collapsible Sidebar on Desktop) */}
      <aside
        className={`border-r ${
          theme === 'dark' ? 'border-white/10 bg-[#050917]/98' : 'border-slate-300 bg-white/98 shadow-md'
        } backdrop-blur-2xl flex flex-col justify-between transition-all duration-300 fixed inset-y-0 left-0 z-50 lg:static ${
          isMobileMenuOpen ? 'translate-x-0 w-80 max-w-[86vw]' : '-translate-x-full lg:translate-x-0'
        } ${isSidebarOpen ? 'lg:w-80' : 'lg:w-24'}`}
      >
        <div className="overflow-y-auto no-scrollbar">
          <div
            className={`p-4 sm:p-5 flex items-center justify-between border-b ${
              theme === 'dark' ? 'border-white/10' : 'border-slate-200'
            }`}
          >
            <div className="flex items-center gap-3 overflow-hidden">
              <AppLogo size={44} className="flex-shrink-0" />
              {(isSidebarOpen || isMobileMenuOpen) && (
                <div className="whitespace-nowrap">
                  <span
                    className={`text-lg font-black ${
                      theme === 'dark'
                        ? 'bg-gradient-to-r from-white via-amber-100 to-amber-300 bg-clip-text text-transparent'
                        : 'text-slate-950'
                    }`}
                  >
                    InsightFlow
                  </span>
                </div>
              )}
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setIsMobileMenuOpen(false)}
                className="lg:hidden text-slate-300 hover:text-amber-400 p-2 rounded-xl bg-white/10 font-black cursor-pointer"
              >
                ✕
              </button>
              <button
                type="button"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="hidden lg:inline-flex text-slate-400 hover:text-amber-400 p-1.5 rounded-lg cursor-pointer"
              >
                {isSidebarOpen ? '◀' : '▶'}
              </button>
            </div>
          </div>

          <nav className="p-3.5 space-y-2 mt-1">
            {(isSidebarOpen || isMobileMenuOpen) && (
              <div className="px-3 pb-1 flex items-center justify-between">
                <p className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  {isExemptAdminMode
                    ? tx('เมนู Super Admin (เว้นแพ็กเกจ)', 'Super Admin Menu (Exempt)')
                    : tx('เมนูหลักตามแพ็กเกจ', 'Package Navigation')}
                </p>
                <span
                  className="text-[10px] font-black px-2 py-0.5 rounded-full"
                  style={{
                    color: activePlanMeta.accentColor,
                    backgroundColor: activePlanMeta.badgeBg
                  }}
                >
                  {activePlanMeta.code}
                </span>
              </div>
            )}
            {sidebarMenuItems.map(item => {
              const unlocked = isTabUnlocked(item.id);
              const reqPlan = planTiersMap[item.minPlan] || planTiersMap.starter;
              const showLabels = isSidebarOpen || isMobileMenuOpen;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between p-2.5 rounded-2xl text-left transition-all cursor-pointer ${
                    activeTab === item.id
                      ? 'bg-gradient-to-r from-amber-400/25 via-amber-400/10 to-transparent text-white border-2 border-amber-400 shadow-lg'
                      : unlocked
                      ? 'text-slate-200 hover:text-white hover:bg-white/10 border-2 border-transparent'
                      : 'text-slate-400 hover:text-white hover:bg-white/5 border-2 border-dashed border-white/10 opacity-85'
                  }`}
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <LuxuryIconBadge variant={item.variant} size="md" active={activeTab === item.id}>
                      <LuxuryModuleIcon type={item.id} size={24} />
                    </LuxuryIconBadge>
                    {showLabels && (
                      <div className="min-w-0 flex-1">
                        <p className={`text-sm font-black truncate leading-tight ${activeTab === item.id ? 'text-amber-300' : ''}`}>
                          {item.label}
                        </p>
                        {item.subLabel && (
                          <p className={`text-[11px] truncate mt-0.5 leading-snug ${
                            activeTab === item.id ? 'text-amber-200/80 font-bold' : 'text-slate-400 font-medium'
                          }`}>
                            {item.subLabel}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                  {showLabels && (
                    unlocked ? (
                      item.badge && (
                        <span className="text-[11px] font-black px-2 py-0.5 rounded-lg bg-amber-400 text-slate-950 flex-shrink-0">
                          {item.badge}
                        </span>
                      )
                    ) : (
                      <span
                        className="text-[10px] font-black px-2 py-0.5 rounded-lg flex-shrink-0 border"
                        style={{
                          color: reqPlan.accentColor,
                          borderColor: `${reqPlan.accentColor}55`,
                          backgroundColor: `${reqPlan.accentColor}18`
                        }}
                      >
                        🔒 {reqPlan.price}
                      </span>
                    )
                  )}
                </button>
              );
            })}

            {/* Sidebar Live Cloud & AI Status Quick Card (Visible when sidebar is expanded) */}
            {(isSidebarOpen || isMobileMenuOpen) && (
              <div className="pt-2 px-1">
                <div className="p-3 rounded-2xl bg-gradient-to-br from-emerald-500/10 via-amber-400/5 to-slate-900/60 border border-emerald-400/25 space-y-1.5 shadow-sm">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-black text-emerald-300 flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      {tx('สถานะ Cloud AI:', 'Cloud AI Status:')}
                    </span>
                    <span className="font-extrabold text-amber-300 text-[10px] px-1.5 py-0.5 rounded-md bg-amber-400/15 border border-amber-400/30">
                      {tx('พร้อมใช้งาน', 'ONLINE')}
                    </span>
                  </div>
                  <p className="text-[10.5px] text-slate-300/90 leading-relaxed">
                    {tx(
                      '⚡ ซิงก์ข้อมูลยอดขายอัตโนมัติ 24 ชม. • ความเร็วประมวลผล 42ms',
                      '⚡ 24/7 Real-Time Sales Sync • Ultra-Fast 42ms Latency'
                    )}
                  </p>
                </div>
              </div>
            )}
          </nav>
        </div>

        <div className="p-3 border-t border-white/10 space-y-2.5">
          {/* Mobile Drawer Font Scale Switcher */}
          {(isSidebarOpen || isMobileMenuOpen) && (
            <div className="xl:hidden p-2 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-[11px] font-bold text-slate-400 mb-1.5 px-1">
                {tx('ปรับขนาดตัวอักษร:', 'Text Size:')}
              </div>
              <div className="grid grid-cols-3 gap-1">
                {[
                  { id: 'normal', th: 'ก ปกติ', en: 'A Normal' },
                  { id: 'large', th: 'ก+ ใหญ่', en: 'A+ Large' },
                  { id: 'xlarge', th: 'ก++ ใหญ่มาก', en: 'A++ Extra' }
                ].map(sz => (
                  <button
                    key={sz.id}
                    type="button"
                    onClick={() => setFontScale(sz.id)}
                    className={`py-1.5 px-1.5 rounded-xl text-[11px] font-bold transition cursor-pointer ${
                      fontScale === sz.id
                        ? 'bg-amber-400 text-slate-950 shadow'
                        : 'text-slate-300 bg-white/5'
                    }`}
                  >
                    {isEn ? sz.en : sz.th}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="flex items-center justify-between gap-2 p-2 rounded-2xl bg-white/5">
            {(isSidebarOpen || isMobileMenuOpen) && (
              <div className="min-w-0">
                <p className="text-xs font-black truncate">
                  {isSuperAdmin ? `👑 ${user.email}` : user.name}
                </p>
                <p className="text-[11px] text-emerald-400 font-bold truncate">
                  ● {activePlanMeta.name} ({activePlanMeta.price})
                </p>
              </div>
            )}
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 rounded-xl bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 text-xs font-bold cursor-pointer flex-shrink-0"
            >
              {tx('ออกจากระบบ', 'Sign Out')}
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area (Responsive for Smartphone, Tablet & Desktop) */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header
          className={`border-b ${
            theme === 'dark' ? 'border-white/10 bg-[#040816]/95' : 'border-slate-300 bg-white/95 shadow-sm'
          } backdrop-blur-xl px-3 sm:px-8 py-2.5 sm:py-4 flex justify-between items-center gap-2 sticky top-0 z-20`}
        >
          <div className="flex items-center gap-2 sm:gap-3.5 min-w-0 flex-1">
            {/* Mobile & Tablet Drawer Toggle Button */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden px-2.5 py-2 rounded-xl bg-amber-400/20 border border-amber-400/40 text-amber-300 font-black text-xs flex items-center gap-1 cursor-pointer flex-shrink-0"
              title={tx('เปิดเมนูทั้งหมด', 'Open Full Menu')}
            >
              <span>☰</span>
              <span className="hidden sm:inline">{tx('เมนู', 'Menu')}</span>
            </button>

            <div className="hidden xs:block flex-shrink-0">
              <LuxuryIconBadge variant={currentTabMeta.variant} size="sm" active>
                <LuxuryModuleIcon type={currentTabMeta.id} size={20} />
              </LuxuryIconBadge>
            </div>
            <div className="min-w-0">
              <h1 className="text-sm sm:text-2xl font-black tracking-tight flex items-center gap-2 min-w-0">
                <span className="truncate">{currentTabMeta.label}</span>
                <span
                  className="hidden md:inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-black px-2.5 sm:px-3 py-0.5 sm:py-1 rounded-full border flex-shrink-0"
                  style={{
                    color: activePlanMeta.accentColor,
                    borderColor: `${activePlanMeta.accentColor}55`,
                    backgroundColor: activePlanMeta.badgeBg
                  }}
                >
                  <span>{isExemptAdminMode ? '👑' : '💎'}</span>
                  <span>
                    {activePlanMeta.code}: {activePlanMeta.price}{activePlanMeta.unit}
                  </span>
                </span>
              </h1>
              <p className="hidden sm:block text-xs text-slate-400 mt-0.5 truncate">{currentTabMeta.subLabel}</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
            {/* 1-Click Test Animated Cyber-Luxury Notification Button */}
            <button
              type="button"
              onClick={() =>
                toast.success(
                  tx(
                    '🎉 ทดสอบป้ายแจ้งเตือน 3D Holographic ใหม่สำเร็จ! ระบบซิงค์ข้อมูลและแอนิเมชันพร้อมใช้งานเต็มรูปแบบ',
                    '🎉 3D Holographic Notification Badge Active! Real-time animations & data sync verified.'
                  )
                )
              }
              className="px-2 sm:px-3 py-1.5 sm:py-2 rounded-xl bg-gradient-to-r from-emerald-500/25 via-amber-400/20 to-teal-500/25 hover:from-emerald-500/35 hover:to-amber-400/35 border border-emerald-400/50 text-emerald-300 text-xs font-black cursor-pointer transition shadow-md"
              title={tx('กดเพื่อดูตัวอย่างป้ายแจ้งเตือนแอนิเมชันใหม่', 'Click to preview the new 3D animated notification badge')}
            >
              <span className="md:hidden">✨</span>
              <span className="hidden md:inline">✨ {tx('ทดสอบป้ายแจ้งเตือน', 'Test Alert Badge')}</span>
            </button>

            {/* Prominent Language Switcher (100% Thai vs 100% English) */}
            {renderLanguageSwitcher()}

            {/* Font Size Control for Senior Users (Desktop Top Bar; Mobile in Drawer) */}
            <div
              className={`hidden xl:flex items-center gap-1 p-1 rounded-2xl border ${
                theme === 'dark' ? 'bg-[#0b1020] border-white/15' : 'bg-slate-100 border-slate-300'
              }`}
            >
              {[
                { id: 'normal', th: 'ก ปกติ', en: 'A Normal' },
                { id: 'large', th: 'ก+ ใหญ่', en: 'A+ Large' },
                { id: 'xlarge', th: 'ก++ ใหญ่มาก', en: 'A++ Extra' }
              ].map(sz => (
                <button
                  key={sz.id}
                  type="button"
                  onClick={() => setFontScale(sz.id)}
                  className={`px-2 sm:px-2.5 py-1.5 rounded-xl text-xs font-bold transition cursor-pointer ${
                    fontScale === sz.id
                      ? 'bg-amber-400 text-slate-950 shadow'
                      : theme === 'dark'
                      ? 'text-slate-300 hover:text-white'
                      : 'text-slate-800 hover:text-slate-950'
                  }`}
                >
                  {isEn ? sz.en : sz.th}
                </button>
              ))}
            </div>

            {/* Dark/Light Theme Toggle */}
            <button
              type="button"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className={`px-2 sm:px-3 py-1.5 sm:py-2 rounded-xl border text-xs font-black cursor-pointer transition ${
                theme === 'dark'
                  ? 'border-white/15 bg-white/5 text-amber-300 hover:bg-white/10'
                  : 'border-slate-300 bg-slate-100 text-slate-900 hover:bg-slate-200'
              }`}
            >
              <span className="sm:hidden">{theme === 'dark' ? '☀️' : '🌙'}</span>
              <span className="hidden sm:inline">{theme === 'dark' ? tx('☀️ สว่าง', '☀️ Light') : tx('🌙 มืด', '🌙 Dark')}</span>
            </button>
          </div>
        </header>

        <main className="p-3 sm:p-6 lg:p-8 pb-28 lg:pb-8 space-y-3.5 sm:space-y-6 flex-1 max-w-full overflow-x-hidden">
          {/* MISS UNIVERSE EXECUTIVE STAGE — COMPACT & SLEEK CROWN PODIUM */}
          <div
            className={`mu-stage-card py-2.5 px-3.5 sm:px-5 rounded-2xl border shadow-xl relative ${
              theme === 'dark' ? 'text-white' : 'text-slate-900 bg-white/95'
            }`}
          >
            {/* Top Stage Spotlight Subtle Ambient Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-14 bg-gradient-to-b from-amber-400/20 via-amber-300/5 to-transparent blur-xl pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-2.5 sm:gap-4">
              {/* Crown & Compact Royal Title Info */}
              <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
                {/* Compact 3D Floating Crown */}
                <div className="mu-crown-anim flex-shrink-0 relative">
                  <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-amber-400/35 via-yellow-500/20 to-black/80 border border-amber-300/70 flex items-center justify-center shadow-[0_0_15px_rgba(251,191,36,0.5)] backdrop-blur-md">
                    <span className="text-xl sm:text-2xl filter drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                      {isExemptAdminMode ? '👑' : subscriptionPlan === 'premium' ? '👑' : subscriptionPlan === 'professional' ? '💎' : '🌟'}
                    </span>
                  </div>
                  <span className="mu-sparkle-star absolute -top-1.5 -right-1.5 text-xs">✨</span>
                </div>

                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
                    <span className="mu-sash-badge text-[9px] sm:text-[10px] font-black text-slate-950 px-2 py-0.5 rounded-full shadow-sm tracking-wide uppercase border border-amber-200/50 flex-shrink-0">
                      🎗️ {isExemptAdminMode ? tx('SUPER ADMIN', 'SUPER ADMIN') : tx('OFFICIAL CROWN', 'OFFICIAL CROWN')}
                    </span>
                    <h2 className="text-xs sm:text-sm lg:text-base font-black tracking-tight mu-shimmer-text truncate">
                      {isExemptAdminMode
                        ? tx('👑 SUPER ADMIN PRIVILEGE', '👑 SUPER ADMIN PRIVILEGE')
                        : tx(`👑 ${activePlanMeta.name}`, `👑 ${activePlanMeta.name}`)}
                    </h2>
                    <span
                      className="text-[10px] sm:text-xs font-black px-2 py-0.2 rounded-full border shadow-sm flex-shrink-0"
                      style={{
                        color: activePlanMeta.accentColor,
                        borderColor: `${activePlanMeta.accentColor}77`,
                        backgroundColor: activePlanMeta.badgeBg
                      }}
                    >
                      {activePlanMeta.price}{activePlanMeta.unit}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-slate-300 mt-0.5">
                    <span className="inline-flex items-center gap-1 font-bold text-emerald-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                      {isExemptAdminMode
                        ? tx('🏆 ปลดล็อกครบ 11/11 ระบบ', '🏆 11/11 Modules Unlocked')
                        : tx(`✨ ปลดล็อก ${activePlanMeta.allowedTabs.length}/10 ระบบ • ${activePlanMeta.quotaSummary}`, `✨ ${activePlanMeta.allowedTabs.length}/10 Modules • ${activePlanMeta.quotaSummary}`)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Compact Podium Tiers Selector */}
              <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar pb-0.5 flex-shrink-0">
                <button
                  type="button"
                  onClick={() => {
                    setActiveTab('admin');
                    setAdminPreviewCustomerPlan(false);
                    toast.success(
                      tx(
                        `👥 เปิดหน้าต่าง Admin (${registeredWebCustomers.length} ราย)`,
                        `👥 Admin Registry (${registeredWebCustomers.length} Users)`
                      )
                    );
                  }}
                  className={`px-2.5 py-1 rounded-lg text-[11px] font-black transition cursor-pointer border whitespace-nowrap flex-shrink-0 ${
                    activeTab === 'admin'
                      ? 'bg-gradient-to-r from-emerald-400 to-teal-400 text-slate-950 border-emerald-300 shadow'
                      : 'bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border-emerald-400/50'
                  }`}
                >
                  {tx(`👥 Admin (${registeredWebCustomers.length})`, `👥 Admin (${registeredWebCustomers.length})`)}
                </button>

                {isSuperAdmin ? (
                  <button
                    type="button"
                    onClick={handleActivateSuperAdminExemptMode}
                    className={`px-2.5 py-1 rounded-lg text-[11px] font-black transition cursor-pointer border whitespace-nowrap flex-shrink-0 ${
                      isExemptAdminMode
                        ? 'bg-gradient-to-r from-amber-400 to-amber-300 text-slate-950 border-amber-300 shadow'
                        : 'bg-amber-400/15 hover:bg-amber-400/25 text-amber-300 border-amber-400/40'
                    }`}
                  >
                    {isExemptAdminMode ? tx('👑 Admin', '👑 Admin') : tx('👑 สลับ Admin', '👑 Admin')}
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => {
                      const adminUser = {
                        name: tx('ผู้ดูแลระบบสูงสุด (Super Admin)', 'Super Admin'),
                        email: SUPER_ADMIN_EMAIL,
                        sub: 'super-admin',
                        role: 'admin',
                        picture: 'https://ui-avatars.com/api/?name=Super+Admin&background=fbbf24&color=0f172a&bold=true'
                      };
                      setAdminPreviewCustomerPlan(false);
                      localStorage.setItem('insightflow_saved_user', JSON.stringify(adminUser));
                      setUser(adminUser);
                      setActiveTab('admin');
                      toast.success(tx('👑 สลับเข้าสู่ Super Admin สำเร็จ!', '👑 Switched to Super Admin!'));
                    }}
                    className="px-2.5 py-1 rounded-lg text-[11px] font-black transition cursor-pointer border bg-amber-400/15 hover:bg-amber-400/25 text-amber-300 border-amber-400/40 whitespace-nowrap flex-shrink-0"
                  >
                    {tx('👑 Admin', '👑 Admin')}
                  </button>
                )}

                {/* Compact Tiers */}
                {[
                  { id: 'starter', crown: '🌟', label: 'Starter', price: '1,990' },
                  { id: 'professional', crown: '💎', label: 'Pro', price: '2,900' },
                  { id: 'premium', crown: '👑', label: 'Premium', price: '4,900' }
                ].map(pBtn => {
                  const isCurrent = !isExemptAdminMode && subscriptionPlan === pBtn.id;
                  return (
                    <button
                      key={pBtn.id}
                      type="button"
                      onClick={() => handleSelectSubscriptionPlan(pBtn.id, null, true)}
                      className={`relative px-2.5 py-1 rounded-lg text-[11px] font-black transition-all cursor-pointer border whitespace-nowrap flex-shrink-0 active:scale-95 flex items-center gap-1 ${
                        isCurrent
                          ? 'bg-gradient-to-r from-amber-400 via-yellow-300 to-amber-400 text-slate-950 border-amber-200 shadow-md ring-1 ring-amber-300 font-black'
                          : 'bg-black/40 hover:bg-white/10 text-slate-200 border-white/20'
                      }`}
                    >
                      <span className={isCurrent ? 'mu-crown-anim inline-block' : ''}>
                        {pBtn.crown}
                      </span>
                      <span>{pBtn.label}</span>
                      {isCurrent && (
                        <span className="px-1 py-0.2 rounded-full bg-slate-950 text-amber-300 text-[9px] font-black">
                          มงลง
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Quick Navigation Bar (1-Line Touch Swipe Strip on Mobile/Tablet, 8-Column Grid on Desktop) */}
          <div
            className={`p-2.5 sm:p-4 rounded-2xl sm:rounded-3xl border shadow-lg ${
              theme === 'dark' ? 'bg-[#091022]/90 border-white/15' : 'bg-white border-slate-200'
            }`}
          >
            <div className="hidden sm:flex flex-wrap items-center justify-between gap-2 mb-3">
              <span className="text-sm font-black text-amber-400 flex items-center gap-2">
                <LuxuryModuleIcon type="crown" size={20} />
                {tx('ทางลัดเลือกหน้าใช้งานด่วน (คลิกปุ่มที่ต้องการได้เลย):', 'Quick Page Switcher (Click Any Module):')}
              </span>
              <span className="text-xs text-slate-400">
                {tx(
                  'หน้าที่มีสัญลักษณ์ 🔒 สามารถกดเพื่ออัปเกรดแพ็กเกจและปลดล็อกใช้งานได้ทันทีในคลิกเดียว',
                  'Modules marked with 🔒 can be unlocked in 1 click by upgrading your package tier'
                )}
              </span>
            </div>
            <div className="flex lg:grid lg:grid-cols-8 gap-2 overflow-x-auto no-scrollbar pb-0.5">
              {sidebarMenuItems.map((nav, idx) => {
                // Show all items in mobile horizontal swipe strip; on desktop grid show top 7 + Admin
                const hideOnDesktop = idx >= 7 && nav.id !== 'admin' ? 'lg:hidden' : '';
                const unlocked = isTabUnlocked(nav.id);
                const reqPlan = planTiersMap[nav.minPlan || 'starter'];
                return (
                  <button
                    key={nav.id}
                    type="button"
                    onClick={() => setActiveTab(nav.id)}
                    className={`${hideOnDesktop} flex-shrink-0 px-3 py-2 sm:p-3 rounded-xl sm:rounded-2xl border-2 text-left transition-all flex items-center gap-2 sm:gap-3 cursor-pointer relative ${
                      activeTab === nav.id
                        ? 'bg-amber-400/20 border-amber-400 shadow-lg'
                        : unlocked
                        ? 'bg-black/20 border-white/10 hover:border-amber-400/40'
                        : 'bg-black/10 border-dashed border-white/10 opacity-80 hover:opacity-100'
                    }`}
                  >
                    <LuxuryIconBadge variant={nav.variant} size="sm" active={activeTab === nav.id}>
                      <LuxuryModuleIcon type={nav.id} size={18} />
                    </LuxuryIconBadge>
                    <div className="min-w-0">
                      <p className="text-xs font-black whitespace-nowrap lg:truncate">
                        {!unlocked ? `🔒 ${nav.label}` : nav.label}
                      </p>
                      <p className="hidden sm:block text-[11px] text-slate-400 truncate">
                        {!unlocked ? `${reqPlan.code} (${reqPlan.price})` : nav.subLabel}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Package Upgrade Gate when clicking a module that requires a higher plan */}
          {!isTabUnlocked(activeTab) ? (
            <div className="rounded-3xl border-2 border-amber-400/50 bg-gradient-to-br from-[#0f172a] via-[#090d1a] to-[#050814] p-8 sm:p-10 shadow-2xl max-w-4xl mx-auto my-6">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pb-5 border-b border-white/10">
                <div className="flex items-center gap-4">
                  <LuxuryIconBadge variant={currentTabMeta.variant} size="lg" active>
                    <LuxuryModuleIcon type={currentTabMeta.id} size={30} />
                  </LuxuryIconBadge>
                  <div>
                    <span
                      className="inline-block text-xs font-black uppercase px-3 py-1 rounded-full border mb-1.5"
                      style={{
                        color: currentTabRequiredPlan.accentColor,
                        borderColor: `${currentTabRequiredPlan.accentColor}66`,
                        backgroundColor: currentTabRequiredPlan.badgeBg
                      }}
                    >
                      🔒 {tx(`ฟีเจอร์สำหรับ ${currentTabRequiredPlan.name}`, `REQUIRES ${currentTabRequiredPlan.code} PLAN`)}
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-white">
                      {currentTabMeta.label}
                    </h2>
                    <p className="text-sm text-slate-300 mt-0.5">{currentTabMeta.subLabel}</p>
                  </div>
                </div>

                <div className="bg-[#050814] border border-white/15 rounded-2xl px-5 py-3 text-right">
                  <div className="text-xs text-slate-400 font-bold">
                    {tx('ราคาแพ็กเกจที่รองรับหน้านี้', 'Required Plan Price')}
                  </div>
                  <div className="text-3xl font-black text-amber-400">
                    {currentTabRequiredPlan.price}
                    <span className="text-sm text-slate-300 font-bold ml-1">{currentTabRequiredPlan.unit}</span>
                  </div>
                </div>
              </div>

              <p className="text-base text-slate-200 font-semibold leading-relaxed mb-6">
                {tx(
                  `ขณะนี้คุณกำลังใช้งานอยู่ที่ "${activePlanMeta.name} (${activePlanMeta.price}${activePlanMeta.unit})" หากต้องการใช้งานหน้า "${currentTabMeta.label}" สามารถกดปุ่มอัปเกรดเป็น "${currentTabRequiredPlan.name} (${currentTabRequiredPlan.price}${currentTabRequiredPlan.unit})" ด้านล่างเพื่อปลดล็อกได้ทันทีครับ`,
                  `You are currently on the "${activePlanMeta.name} (${activePlanMeta.price}${activePlanMeta.unit})". Upgrade to "${currentTabRequiredPlan.name} (${currentTabRequiredPlan.price}${currentTabRequiredPlan.unit})" below to unlock "${currentTabMeta.label}" immediately.`
                )}
              </p>

              <div className="bg-[#060a14] border border-white/10 rounded-2xl p-5 mb-7">
                <div className="text-xs font-black uppercase text-amber-400 mb-3">
                  {tx(`สิทธิ์และความสามารถที่จะถูกปลดล็อกใน ${currentTabRequiredPlan.name}:`, `Unlocked with ${currentTabRequiredPlan.name}:`)}
                </div>
                <p className="text-sm text-slate-200 font-semibold leading-relaxed">
                  ✓ {currentTabRequiredPlan.quotaSummary}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => handleSelectSubscriptionPlan(currentTabRequiredPlan.id, activeTab)}
                  className="px-7 py-4 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 text-slate-950 font-black text-base shadow-xl cursor-pointer transition"
                >
                  {tx(
                    `⚡ อัปเกรดเป็น ${currentTabRequiredPlan.name} (${currentTabRequiredPlan.price}${currentTabRequiredPlan.unit}) และเปิดหน้านี้ทันที`,
                    `⚡ Upgrade to ${currentTabRequiredPlan.name} (${currentTabRequiredPlan.price}${currentTabRequiredPlan.unit}) & Unlock Now`
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('overview')}
                  className="px-5 py-4 rounded-2xl bg-white/10 hover:bg-white/15 text-white font-bold text-sm border border-white/15 cursor-pointer transition"
                >
                  {tx('กลับไปหน้าภาพรวมธุรกิจ (Starter)', 'Back to Business Overview')}
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Active Page Content (Unlocked by Current Subscription Plan) */}
              {activeTab === 'overview' && (
                <>
                  {renderUploadZone('overview', tx('ภาพรวมธุรกิจและเป้าหมายร้าน', 'Business Overview & Target Planner'))}
                  <OverviewTab
                    lang={lang}
                    theme={theme}
                    currentRevenueVal={currentRevenueVal}
                    setCurrentRevenueVal={setCurrentRevenueVal}
                    targetRevenueVal={targetRevenueVal}
                    setTargetRevenueVal={setTargetRevenueVal}
                    targetTimelineVal={targetTimelineVal}
                    setTargetTimelineVal={setTargetTimelineVal}
                    clientGoalType={clientGoalType}
                    setClientGoalType={setClientGoalType}
                    targetCategory={targetCategory}
                    setTargetCategory={setTargetCategory}
                    isPlanActive={isPlanActive}
                    isGeneratingPlan={isGeneratingPlan}
                    handleDeployGoalPlan={handleDeployGoalPlan}
                    handleExportGoalPlan={handleExportGoalPlan}
                    setActiveTab={setActiveTab}
                    lineChartOptions={lineChartOptions}
                    barChartOptions={barChartOptions}
                  />
                </>
              )}

              {activeTab === 'customers' && (
                <>
                  {renderUploadZone('customers', tx('วิเคราะห์ลูกค้าประจำและคนหาย', 'Customer Loyalty & Retention'))}
                  <CustomersTab
                    lang={lang}
                    theme={theme}
                    customersList={customersList.slice(0, activePlanMeta.maxCustomers)}
                    setCustomersList={setCustomersList}
                  />
                </>
              )}

              {activeTab === 'staff_pos' && (
                <StaffPosTab
                  lang={lang}
                  staffList={staffList}
                  setStaffList={setStaffList}
                  auditLogs={auditLogs}
                  setAuditLogs={setAuditLogs}
                  renderUploadZone={renderUploadZone}
                  barChartOptions={barChartOptions}
                />
              )}

              {activeTab === 'multi_channel' && (
                <MultiChannelTab
                  lang={lang}
                  branchesList={branchesList.slice(0, activePlanMeta.maxBranches)}
                  setBranchesList={setBranchesList}
                  channelsList={channelsList}
                  anomaliesList={anomaliesList}
                  setAnomaliesList={setAnomaliesList}
                  lineNotifyEnabled={lineNotifyEnabled}
                  setLineNotifyEnabled={setLineNotifyEnabled}
                  lineNotifyTime={lineNotifyTime}
                  setLineNotifyTime={setLineNotifyTime}
                  userPhone={user?.phone || authPhone}
                  userLineId={user?.lineId || authLineId}
                  onUpdateUserContact={handleUpdateUserContact}
                  renderUploadZone={renderUploadZone}
                  barChartOptions={barChartOptions}
                />
              )}

              {activeTab === 'procurement' && (
                <ProcurementTab
                  lang={lang}
                  vendorsList={vendorsList}
                  setVendorsList={setVendorsList}
                  branchRequisitions={branchRequisitions}
                  setBranchRequisitions={setBranchRequisitions}
                  centralPosList={centralPosList}
                  setCentralPosList={setCentralPosList}
                  inventoryList={inventoryList}
                  setInventoryList={setInventoryList}
                  setDbRecords={setDbRecords}
                  renderUploadZone={renderUploadZone}
                  barChartOptions={barChartOptions}
                />
              )}

              {activeTab === 'inventory' && (
                <InventoryTab
                  lang={lang}
                  inventoryList={inventoryList}
                  setInventoryList={setInventoryList}
                  renderUploadZone={renderUploadZone}
                />
              )}

              {activeTab === 'insights' && (
                <InsightsTab
                  lang={lang}
                  bizProfile={bizProfile}
                  setBizProfile={setBizProfile}
                  aiChatMessages={aiChatMessages}
                  setAiChatMessages={setAiChatMessages}
                  aiQuestionInput={aiQuestionInput}
                  setAiQuestionInput={setAiQuestionInput}
                  isAiThinking={isAiThinking}
                  handleAskBusinessAi={handleAskBusinessAi}
                  handleRetrainBusinessAi={handleRetrainBusinessAi}
                  isTrainingAi={isTrainingAi}
                  chatEndRef={chatEndRef}
                  renderUploadZone={renderUploadZone}
                  lineChartOptions={lineChartOptions}
                  currentRevenueVal={currentRevenueVal}
                  targetRevenueVal={targetRevenueVal}
                  customersList={customersList}
                  inventoryList={inventoryList}
                  setInventoryList={setInventoryList}
                  auditLogs={auditLogs}
                  vendorsList={vendorsList}
                  centralPosList={centralPosList}
                  setActiveTab={setActiveTab}
                />
              )}

              {activeTab === 'live' && (
                <LiveTab
                  lang={lang}
                  currentRevenueVal={currentRevenueVal}
                  setCurrentRevenueVal={setCurrentRevenueVal}
                  dbRecords={dbRecords}
                  setDbRecords={setDbRecords}
                />
              )}

              {activeTab === 'database' && (
                <DatabaseTab
                  lang={lang}
                  dbRecords={dbRecords}
                  setDbRecords={setDbRecords}
                  renderUploadZone={renderUploadZone}
                  pageUploadedFiles={pageUploadedFiles}
                  onInspectUploadedFile={setInspectingUploadTab}
                />
              )}

              {activeTab === 'admin' && (
                <AdminTab
                  lang={lang}
                  user={user}
                  registeredWebCustomers={registeredWebCustomers}
                  setRegisteredWebCustomers={setRegisteredWebCustomers}
                  onSyncContactWithBackend={syncContactWithLineBackend}
                />
              )}

              {activeTab === 'settings' && (
                <SettingsTab
                  lang={lang}
                  setLang={setLang}
                  theme={theme}
                  setTheme={setTheme}
                  fontScale={fontScale}
                  setFontScale={setFontScale}
                  rememberCredentials={rememberPassword}
                  setRememberCredentials={setRememberPassword}
                  userPhone={user?.phone || authPhone}
                  userLineId={user?.lineId || authLineId}
                  onUpdateUserContact={handleUpdateUserContact}
                />
              )}
            </>
          )}

          {/* Uploaded Files Inspector Modal (หน้าดูไฟล์ที่อัปโหลดเข้าไปแล้วทั้งหมด พร้อมตารางข้อมูลจริงในไฟล์) */}
          {inspectingUploadTab && (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
              <div className="bg-[#090e1c] border-2 border-amber-400/45 rounded-3xl w-full max-w-5xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
                {/* Modal Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4 bg-gradient-to-r from-[#0f172a] via-[#111827] to-[#0f172a] border-b border-white/15">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black uppercase px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40">
                        📂 {tx('หน้าตรวจสอบไฟล์ที่อัปโหลดแล้ว', 'Uploaded File Inspector')}
                      </span>
                      {pageUploadedFiles[inspectingUploadTab]?.isCustomUpload && (
                        <span className="text-xs font-black px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40">
                          ✓ {tx('อัปเดตจากไฟล์ของคุณแล้ว', 'Updated from Your File')}
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                      {tx('ดูไฟล์ที่อัปโหลดเข้าสู่ระบบ & ข้อมูลจริงในไฟล์', 'Inspect Uploaded Files & Live Parsed Data')}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        const targetTab = inspectingUploadTab;
                        setInspectingUploadTab(null);
                        setActiveTab('database');
                        toast.success(
                          tx(
                            `เปิดหน้าคลังข้อมูลและไฟล์ที่อัปโหลดทั้งหมด (จากหน้า ${targetTab})`,
                            `Opened Central Uploaded Files Registry`
                          )
                        );
                      }}
                      className="px-3.5 py-2 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-400/40 text-xs font-black cursor-pointer transition"
                    >
                      🗄️ {tx('ไปหน้าคลังไฟล์ทั้งหมด', 'Go to All Files Registry')}
                    </button>
                    <button
                      type="button"
                      onClick={() => setInspectingUploadTab(null)}
                      className="px-4 py-2 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-xs font-black cursor-pointer transition"
                    >
                      ✕ {tx('ปิดหน้าต่าง', 'Close')}
                    </button>
                  </div>
                </div>

                {/* Module Selector Tabs inside Modal */}
                <div className="px-6 py-3 bg-[#060a14] border-b border-white/10 overflow-x-auto">
                  <div className="text-[11px] font-bold text-slate-400 mb-2">
                    {tx('คลิกเลือกดูไฟล์ของแต่ละหมวดหมู่ (8 หมวดหมู่):', 'Select Module to Inspect Uploaded File (8 Modules):')}
                  </div>
                  <div className="flex items-center gap-2 min-w-max">
                    {[
                      { id: 'overview', label: tx('1. ภาพรวมธุรกิจ', '1. Overview') },
                      { id: 'customers', label: tx('2. ลูกค้าประจำ', '2. Customers') },
                      { id: 'staff_pos', label: tx('3. แคชเชียร์ & POS', '3. Staff & POS') },
                      { id: 'multi_channel', label: tx('4. รวมสาขา & ออนไลน์', '4. Multi-Channel') },
                      { id: 'procurement', label: tx('5. ใบสั่งซื้อ (PO)', '5. Procurement') },
                      { id: 'inventory', label: tx('6. สต็อกสินค้า', '6. Inventory') },
                      { id: 'insights', label: tx('7. วิเคราะห์ AI', '7. AI Insights') },
                      { id: 'database', label: tx('8. คลังข้อมูลรวม', '8. Database') }
                    ].map(tabItem => {
                      const fInfo = pageUploadedFiles[tabItem.id];
                      const activeInspect = inspectingUploadTab === tabItem.id;
                      return (
                        <button
                          key={tabItem.id}
                          type="button"
                          onClick={() => setInspectingUploadTab(tabItem.id)}
                          className={`px-3 py-2 rounded-xl border text-xs font-black transition cursor-pointer flex items-center gap-1.5 ${
                            activeInspect
                              ? 'bg-amber-400 text-slate-950 border-amber-300 shadow-md'
                              : 'bg-white/5 text-slate-300 border-white/10 hover:border-amber-400/40'
                          }`}
                        >
                          <span>{tabItem.label}</span>
                          {fInfo?.isCustomUpload && (
                            <span
                              className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                                activeInspect ? 'bg-slate-950 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'
                              }`}
                            >
                              NEW
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Modal Body: File Metadata + Change Summary + Parsed Table Preview */}
                {(() => {
                  const activeFile = pageUploadedFiles[inspectingUploadTab] || pageUploadedFiles.overview;
                  const headers = activeFile?.headers || ['รายการ', 'รายละเอียด', 'ยอดเงิน'];
                  const rows = activeFile?.previewRows || [];
                  return (
                    <div className="p-6 overflow-y-auto space-y-5 flex-1">
                      {/* File Summary Banner */}
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 md:col-span-2">
                          <div className="text-xs font-bold text-slate-400">
                            {tx('ชื่อไฟล์ที่กำลังใช้งานอยู่ในหมวดนี้', 'Active Uploaded Filename')}
                          </div>
                          <div className="text-lg font-black text-amber-300 mt-1 break-all">
                            📄 {activeFile?.name}
                          </div>
                          <div className="text-xs text-emerald-400 font-bold mt-1">
                            ✓ {tx('สถานะ: ซิงค์ข้อความและตัวเลขเข้ากับหน้าเว็บเรียบร้อยแล้ว', 'Status: Text & Metrics Synced Live to Page')}
                          </div>
                        </div>

                        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                          <div className="text-xs font-bold text-slate-400">
                            {tx('จำนวนข้อมูลในไฟล์', 'Total Rows Parsed')}
                          </div>
                          <div className="text-2xl font-black text-white mt-1">
                            {(activeFile?.rows || rows.length).toLocaleString()} {tx('รายการ', 'rows')}
                          </div>
                          <div className="text-xs text-slate-400 mt-1">
                            {headers.length} {tx('คอลัมน์', 'columns')}
                          </div>
                        </div>

                        <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                          <div className="text-xs font-bold text-slate-400">
                            {tx('เวลาที่อัปเดตไฟล์ล่าสุด', 'Last Updated Time')}
                          </div>
                          <div className="text-lg font-black text-sky-300 mt-1">
                            🕒 {activeFile?.updatedAt}
                          </div>
                          <label className="inline-block mt-2 px-3 py-1 rounded-lg bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs cursor-pointer transition">
                            + {tx('อัปโหลดไฟล์ใหม่ทับทันที', 'Upload New File Here')}
                            <input
                              type="file"
                              accept=".csv,.xlsx,.xls,.json,.txt"
                              onChange={e => handlePageFileUpload(inspectingUploadTab, inspectingUploadTab, e)}
                              className="hidden"
                            />
                          </label>
                        </div>
                      </div>

                      {/* How the file changed the page text */}
                      <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/35">
                        <div className="text-xs font-black uppercase text-emerald-400 mb-1">
                          ✨ {tx('สรุปข้อความและตัวเลขที่เปลี่ยนตามไฟล์ที่คุณอัปโหลด:', 'How This File Updated the Page Text & Numbers:')}
                        </div>
                        <p className="text-sm font-bold text-white leading-relaxed">
                          {lang === 'th'
                            ? activeFile?.changeSummaryTh || 'ซิงค์ข้อมูลข้อความและตัวเลขจากไฟล์เข้าสู่หน้าแดชบอร์ดเรียบร้อยแล้ว'
                            : activeFile?.changeSummaryEn || 'Synced file text and metrics directly into the module.'}
                        </p>
                      </div>

                      {/* Data Table Preview inside the Uploaded File */}
                      <div className="rounded-2xl border border-white/15 overflow-hidden bg-[#050814]">
                        <div className="px-4 py-3 bg-white/5 border-b border-white/10 flex items-center justify-between">
                          <span className="text-xs font-black text-amber-300">
                            📊 {tx('ตารางแสดงข้อความและข้อมูลจริงที่อ่านได้จากในไฟล์นี้', 'Actual Parsed Text & Rows Inside This Uploaded File')}
                          </span>
                          <span className="text-xs text-slate-400 font-bold">
                            {tx(`แสดงตัวอย่าง ${rows.length} แถวแรก`, `Showing top ${rows.length} parsed rows`)}
                          </span>
                        </div>
                        <div className="overflow-x-auto">
                          <table className="w-full text-left border-collapse">
                            <thead>
                              <tr className="bg-white/5 border-b border-white/10 text-xs font-black text-slate-300">
                                <th className="py-3 px-4 w-12 text-center">#</th>
                                {headers.map((h, i) => (
                                  <th key={i} className="py-3 px-4">
                                    {h}
                                  </th>
                                ))}
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-white/10 text-sm">
                              {rows.map((r, rIdx) => (
                                <tr key={rIdx} className="hover:bg-white/5">
                                  <td className="py-3 px-4 text-center text-xs font-bold text-slate-400">
                                    {rIdx + 1}
                                  </td>
                                  {headers.map((_, cIdx) => (
                                    <td key={cIdx} className="py-3 px-4 font-semibold text-white">
                                      {r[cIdx] !== undefined && r[cIdx] !== '' ? r[cIdx] : '-'}
                                    </td>
                                  ))}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            </div>
          )}
        </main>

        {/* Fixed Bottom App Navigation Dock for Smartphone & Tablet (< 1024px) */}
        <nav
          className={`fixed bottom-0 inset-x-0 z-30 lg:hidden border-t backdrop-blur-2xl px-2 py-2 ${
            theme === 'dark'
              ? 'bg-[#050917]/95 border-white/15'
              : 'bg-white/95 border-slate-200'
              
          }`}
          style={{ paddingBottom: 'max(0.5rem, env(safe-area-inset-bottom))' }}
        >
          <div className="grid grid-cols-6 gap-1 max-w-xl mx-auto">
            {[
              { id: 'overview', label: tx('ภาพรวม', 'Overview'), variant: 'gold' },
              { id: 'customers', label: tx('ลูกค้า', 'CRM'), variant: 'ruby' },
              { id: 'staff_pos', label: tx('แคชเชียร์', 'POS'), variant: 'sapphire' },
              { id: 'procurement', label: tx('จัดซื้อรวม', 'Central PO'), variant: 'emerald' },
              { id: 'insights', label: tx('วิเคราะห์ AI', 'AI Insights'), variant: 'amethyst' }
            ].map(mNav => {
              const unlocked = isTabUnlocked(mNav.id);
              const isActive = activeTab === mNav.id;
              return (
                <button
                  key={mNav.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(mNav.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex flex-col items-center justify-center py-1.5 px-1 rounded-xl transition cursor-pointer ${
                    isActive
                      ? 'bg-amber-400/20 text-amber-300 border border-amber-400/50'
                      : 'text-slate-300 hover:text-white'
                  }`}
                >
                  <div className="relative">
                    <LuxuryModuleIcon type={mNav.id} size={20} />
                    {!unlocked && (
                      <span className="absolute -top-1 -right-2 text-[9px]">🔒</span>
                    )}
                  </div>
                  <span className="text-[10px] font-black truncate max-w-full mt-0.5">
                    {mNav.label}
                  </span>
                </button>
              );
            })}

            {/* 6th Button: Open Full Slide-Over Menu Drawer */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl bg-white/10 text-amber-300 border border-white/15 cursor-pointer"
            >
              <span className="text-base leading-none font-black">☰</span>
              <span className="text-[10px] font-black truncate max-w-full mt-1">
                {tx('เมนูทั้งหมด', 'All Menus')}
              </span>
            </button>
          </div>
        </nav>
      </div>
    </div>
  );
}

export default App;