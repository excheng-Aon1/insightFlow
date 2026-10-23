// ==============================================================================
// File: tests/unit_frontend.test.mjs
// System: InsightFlow Frontend Unit Testing Suite
// Stack: Node.js 24 Native Test Runner (node:test, node:assert/strict)
// ==============================================================================

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

describe('InsightFlow Frontend Unit Test Suite', () => {

  // ----------------------------------------------------------------------------
  // 1. LUXURY 3D ICONS LIBRARY INTEGRITY
  // ----------------------------------------------------------------------------
  test('UNIT-FE-01: LuxuryIcons.jsx exports all 6 newly requested 3D Jewel icons', () => {
    const iconsPath = path.join(projectRoot, 'src', 'components', 'LuxuryIcons.jsx');
    assert.ok(fs.existsSync(iconsPath), 'src/components/LuxuryIcons.jsx must exist');

    const content = fs.readFileSync(iconsPath, 'utf8');

    const requiredIcons = [
      'MarketPositionRadarIcon',      // ร้านคุณอยู่จุดไหนของตลาด?
      'PurchaseConversionRateIcon',   // อัตราการตัดสินใจซื้อ
      'BasketSizePerBillIcon',         // เปรียบเทียบยอดซื้อต่อบิล
      'DailyStoreClosingIcon',        // สรุปปิดยอดร้านประจำวัน
      'SalesVsFeesComparisonIcon',     // เปรียบเทียบยอดขาย ค่าธรรมเนียม
      'ReorderPointControlIcon',      // ควบคุมจุดสั่งซื้อสินค้า
      'GoogleIcon',                   // โลโก้ Google ทางการ
      'ActualParsedDataTableIcon',    // ตารางแสดงข้อความและข้อมูลจริง
      'BaselineTrajectoryIcon',       // แนวโน้มปกติเดิม
      'DailyAverageDemandIcon',       // ยอดขายเฉลี่ยรายวัน
      'EnterpriseStandardIcon',       // มาตรฐานองค์กร
      'BusinessOverviewAndGoalIcon',  // ภาพรวมธุรกิจและเป้าหมาย
    ];

    for (const iconName of requiredIcons) {
      assert.ok(
        content.includes(`export function ${iconName}`) || content.includes(`export const ${iconName}`),
        `LuxuryIcons.jsx must export ${iconName}`
      );
    }
  });

  test('UNIT-FE-02: GoogleIcon contains official 4 Google brand colors', () => {
    const iconsPath = path.join(projectRoot, 'src', 'components', 'LuxuryIcons.jsx');
    const content = fs.readFileSync(iconsPath, 'utf8');

    // Official Google Brand Colors
    const googleColors = ['#4285F4', '#34A853', '#FBBC05', '#EA4335'];
    for (const color of googleColors) {
      assert.ok(
        content.includes(color),
        `GoogleIcon must include official Google vector color ${color}`
      );
    }
  });

  // ----------------------------------------------------------------------------
  // 2. BRANDING STANDARDIZATION & CLEANUP
  // ----------------------------------------------------------------------------
  test('UNIT-FE-03: Cat test alert button is completely removed from App.jsx', () => {
    const appPath = path.join(projectRoot, 'src', 'App.jsx');
    const appContent = fs.readFileSync(appPath, 'utf8');

    assert.ok(
      !appContent.includes('ทดสอบป้ายเตือนน้องแมว'),
      'Button "ทดสอบป้ายเตือนน้องแมว" must NOT exist in App.jsx'
    );
  });

  test('UNIT-FE-04: Single official logo standardization (3D Glass Pill Bars)', () => {
    const appPath = path.join(projectRoot, 'src', 'App.jsx');
    const appContent = fs.readFileSync(appPath, 'utf8');

    assert.ok(
      appContent.includes('InsightFlowGlassBarsLogo'),
      'App.jsx must import and use InsightFlowGlassBarsLogo'
    );

    // Old logo switcher button and redundant logos should not be in the active header
    assert.ok(
      !appContent.includes('activeLogoStyle'),
      'Legacy activeLogoStyle state should be removed for minimalist clean UI'
    );
  });

  test('UNIT-FE-05: Favicon and App Icon sync with 3D Glass Pill Bars design', () => {
    const faviconPath = path.join(projectRoot, 'public', 'app-icon.svg');
    const barsPath = path.join(projectRoot, 'public', 'app-icon-glass-bars.svg');

    assert.ok(fs.existsSync(faviconPath), 'public/app-icon.svg must exist');
    assert.ok(fs.existsSync(barsPath), 'public/app-icon-glass-bars.svg must exist');

    const faviconContent = fs.readFileSync(faviconPath, 'utf8');
    const barsContent = fs.readFileSync(barsPath, 'utf8');

    assert.equal(
      faviconContent.trim(),
      barsContent.trim(),
      'public/app-icon.svg must match public/app-icon-glass-bars.svg'
    );
  });

  // ----------------------------------------------------------------------------
  // 3. I18N DATA INTEGRITY (THAI & ENGLISH)
  // ----------------------------------------------------------------------------
  test('UNIT-FE-06: i18nData dictionary has parity between Thai and English', async () => {
    const i18nPath = path.join(projectRoot, 'src', 'i18nData.js');
    assert.ok(fs.existsSync(i18nPath), 'src/i18nData.js must exist');

    const i18nModule = await import(`file://${i18nPath}`);
    const i18n = i18nModule.landingTranslations || i18nModule.i18nData || i18nModule.default;

    assert.ok(i18n, 'landingTranslations must be exported');
    assert.ok(i18n.th, 'landingTranslations must contain Thai ("th") locale');
    assert.ok(i18n.en, 'landingTranslations must contain English ("en") locale');

    // Check key landing and navigation labels exist in both languages
    const sampleKeys = ['home', 'solutions', 'whyUs', 'pricing', 'tagline1', 'description'];
    for (const key of sampleKeys) {
      assert.ok(i18n.th[key], `Key "${key}" must exist in Thai locale`);
      assert.ok(i18n.en[key], `Key "${key}" must exist in English locale as well`);
    }
  });

  // ----------------------------------------------------------------------------
  // 4. TAILWIND DESIGN SYSTEM & MINIMALIST THEME
  // ----------------------------------------------------------------------------
  test('UNIT-FE-07: tailwind.config.js enables class-based dark mode', () => {
    const tailwindPath = path.join(projectRoot, 'tailwind.config.js');
    assert.ok(fs.existsSync(tailwindPath), 'tailwind.config.js must exist');

    const content = fs.readFileSync(tailwindPath, 'utf8');
    assert.ok(
      content.includes("darkMode: 'class'") || content.includes('darkMode: "class"'),
      'tailwind.config.js must specify darkMode: "class" for instant theme switching'
    );
  });

  // ----------------------------------------------------------------------------
  // 5. PRODUCTION DEPLOYMENT & VERCEL CONFIGURATION
  // ----------------------------------------------------------------------------
  test('UNIT-FE-08: vercel.json enforces cache-busting for index.html & SPA rewrites', () => {
    const vercelPath = path.join(projectRoot, 'vercel.json');
    assert.ok(fs.existsSync(vercelPath), 'vercel.json must exist');

    const vercelConfig = JSON.parse(fs.readFileSync(vercelPath, 'utf8'));

    // Check headers rule for index.html
    const indexHeaderRule = vercelConfig.headers?.find(h => h.source === '/index.html');
    assert.ok(indexHeaderRule, 'vercel.json must have headers rule for /index.html');
    
    const cacheControl = indexHeaderRule.headers?.find(h => h.key === 'Cache-Control');
    assert.ok(cacheControl, 'index.html must have Cache-Control header');
    assert.ok(
      cacheControl.value.includes('no-cache'),
      'index.html Cache-Control must include no-cache'
    );

    // Check SPA rewrites
    assert.ok(Array.isArray(vercelConfig.rewrites), 'vercel.json must specify rewrites');
    const spaRewrite = vercelConfig.rewrites.find(r => r.destination === '/index.html');
    assert.ok(spaRewrite, 'vercel.json must route SPA requests to /index.html');
  });

  // ----------------------------------------------------------------------------
  // 6. EYE-COMFORT WHITE-BLUE LIGHT MODE & GREEN/RED TREND INDICATOR SYSTEM
  // ----------------------------------------------------------------------------
  test('UNIT-FE-09: index.css defines eye-comfortable White-Blue Light Mode design system', () => {
    const cssPath = path.join(projectRoot, 'src', 'index.css');
    assert.ok(fs.existsSync(cssPath), 'src/index.css must exist');

    const cssContent = fs.readFileSync(cssPath, 'utf8');

    // 1. Soothing off-white & soft sapphire background
    assert.ok(
      cssContent.includes('#f8fafc') || cssContent.includes('#f0f5fa'),
      'Light mode must use eye-comfortable background (#f8fafc / #f0f5fa)'
    );

    // 2. White cards with soft blue borders
    assert.ok(
      cssContent.includes('#dbeafe'),
      'Light mode cards must feature soft blue borders (#dbeafe)'
    );

    // 3. Royal Blue / Navy primary buttons, tabs and accents
    assert.ok(
      cssContent.includes('#2563eb') || cssContent.includes('#1d4ed8') || cssContent.includes('#1e40af'),
      'Light mode must use Royal Blue accents (#2563eb / #1d4ed8 / #1e40af)'
    );
  });

  test('UNIT-FE-10: Strict Green (ขาขึ้น) / Red (ขาลง) Trend Indicator System is established', () => {
    const cssPath = path.join(projectRoot, 'src', 'index.css');
    const cssContent = fs.readFileSync(cssPath, 'utf8');

    // Upward trend indicators (Green)
    assert.ok(
      cssContent.includes('.trend-up') && cssContent.includes('#047857'),
      'Upward trends (.trend-up) must be styled in bold readable green (#047857)'
    );
    assert.ok(
      cssContent.includes('.badge-trend-up'),
      'Upward trend badges (.badge-trend-up) must be defined'
    );

    // Downward trend indicators (Red)
    assert.ok(
      cssContent.includes('.trend-down') && cssContent.includes('#b91c1c'),
      'Downward trends (.trend-down) must be styled in bold readable red (#b91c1c)'
    );
    assert.ok(
      cssContent.includes('.badge-trend-down'),
      'Downward trend badges (.badge-trend-down) must be defined'
    );
  });

  test('UNIT-FE-11: Logo clarity enhancement and high-contrast sapphire emblem are enforced', () => {
    const cssPath = path.join(projectRoot, 'src', 'index.css');
    const cssContent = fs.readFileSync(cssPath, 'utf8');

    // Logo clarity and contrast in light mode
    assert.ok(
      cssContent.includes('.insightflow-glass-bars-logo') && cssContent.includes('#2563eb'),
      'index.css must enforce high-contrast emblem border and sapphire glow for logo in light mode'
    );
  });

  test('UNIT-FE-12: All icons clarity engine and pure black (#000000) typography are applied in light mode', () => {
    const cssPath = path.join(projectRoot, 'src', 'index.css');
    const cssContent = fs.readFileSync(cssPath, 'utf8');

    // All icons clarity engine
    assert.ok(
      cssContent.includes('html[data-theme="light"] svg') && cssContent.includes('contrast('),
      'index.css must boost contrast and clarity on all SVGs in light mode'
    );
    assert.ok(
      cssContent.includes('.luxury-icon-badge-gold') && cssContent.includes('border: 2px solid'),
      'index.css must enforce 2px solid vivid borders for luxury icon badges in light mode'
    );

    // Pure black typography
    assert.ok(
      cssContent.includes('html[data-theme="light"]') && cssContent.includes('#000000 !important'),
      'index.css must enforce pure black (#000000) typography for text in light mode'
    );
  });

  test('UNIT-FE-13: File vault management (Add, Replace, and Delete handlers) integrity', () => {
    const appPath = path.join(projectRoot, 'src', 'App.jsx');
    const appContent = fs.readFileSync(appPath, 'utf8');

    // initialPageUploadedFiles export
    assert.ok(
      appContent.includes('export const initialPageUploadedFiles'),
      'App.jsx must export initialPageUploadedFiles'
    );

    // Deletion and Reset handlers
    assert.ok(
      appContent.includes('const handleDeleteUploadedFile =') &&
      appContent.includes('const handleResetAllFiles ='),
      'App.jsx must define handleDeleteUploadedFile and handleResetAllFiles'
    );

    // DatabaseTab component handles file replacement and deletion
    assert.ok(
      appContent.includes('onDeleteUploadedFile') &&
      appContent.includes('onUploadFileForTab'),
      'App.jsx must wire onDeleteUploadedFile and onUploadFileForTab to DatabaseTab'
    );
  });

  // ----------------------------------------------------------------------------
  // 6. EXECUTIVE BI STUDIO & POWER BI SUITE (CANVAS, SLICERS & METRICS)
  // ----------------------------------------------------------------------------
  test('UNIT-FE-14: Executive BI Studio and Power BI Suite integration integrity', () => {
    const biStudioPath = path.join(projectRoot, 'src', 'components', 'ExecutiveBiStudio.jsx');
    assert.ok(fs.existsSync(biStudioPath), 'src/components/ExecutiveBiStudio.jsx must exist');

    const biStudioContent = fs.readFileSync(biStudioPath, 'utf8');
    assert.ok(
      biStudioContent.includes('export default function ExecutiveBiStudio'),
      'ExecutiveBiStudio.jsx must export default component'
    );

    // Verify Slicers, DAX calculated engine, and visuals exist
    assert.ok(biStudioContent.includes('selectedBranch') && biStudioContent.includes('selectedChannel'), 'ExecutiveBiStudio must support multi-dimension slicers');
    assert.ok(biStudioContent.includes('metrics.netOperatingProfit') && biStudioContent.includes('metrics.grossRevenue'), 'ExecutiveBiStudio must calculate DAX metrics');
    assert.ok(biStudioContent.includes('waterfallLabels') && biStudioContent.includes('matrixTreeData'), 'ExecutiveBiStudio must include Waterfall and Matrix visuals');

    // App.jsx integration
    const appPath = path.join(projectRoot, 'src', 'App.jsx');
    const appContent = fs.readFileSync(appPath, 'utf8');
    assert.ok(appContent.includes('import ExecutiveBiStudio'), 'App.jsx must import ExecutiveBiStudio');
    assert.ok(appContent.includes("activeTab === 'bi_studio'"), 'App.jsx must render ExecutiveBiStudio on bi_studio tab');

    // Luxury Icons & Modern Power BI Suite Iconography
    const iconsPath = path.join(projectRoot, 'src', 'components', 'LuxuryIcons.jsx');
    const iconsContent = fs.readFileSync(iconsPath, 'utf8');
    assert.ok(iconsContent.includes('export function PowerBiStudioIcon'), 'LuxuryIcons must export PowerBiStudioIcon');
    assert.ok(iconsContent.includes('export function SlicerFilterIcon'), 'LuxuryIcons must export SlicerFilterIcon');
    assert.ok(iconsContent.includes('export function WaterfallChartIcon'), 'LuxuryIcons must export WaterfallChartIcon');
    assert.ok(iconsContent.includes('export function MatrixTableIcon'), 'LuxuryIcons must export MatrixTableIcon');
    assert.ok(iconsContent.includes('export function BiRevenueIcon'), 'LuxuryIcons must export BiRevenueIcon');
    assert.ok(iconsContent.includes('export function BiNetProfitIcon'), 'LuxuryIcons must export BiNetProfitIcon');
    assert.ok(iconsContent.includes('export function BiAovCartIcon'), 'LuxuryIcons must export BiAovCartIcon');
    assert.ok(iconsContent.includes('export function BiOrdersReceiptIcon'), 'LuxuryIcons must export BiOrdersReceiptIcon');
    assert.ok(iconsContent.includes('export function BiChannelDonutIcon'), 'LuxuryIcons must export BiChannelDonutIcon');
    assert.ok(iconsContent.includes('export function BiCalendarIcon'), 'LuxuryIcons must export BiCalendarIcon');
    assert.ok(iconsContent.includes('export function BiBranchIcon'), 'LuxuryIcons must export BiBranchIcon');
    assert.ok(iconsContent.includes('export function BiChannelIcon'), 'LuxuryIcons must export BiChannelIcon');
    assert.ok(iconsContent.includes('export function BiCategoryIcon'), 'LuxuryIcons must export BiCategoryIcon');
  });

  // ----------------------------------------------------------------------------
  // 7. AI INSIGHTS & ACTIONABLE COPILOT COHERENCE
  // ----------------------------------------------------------------------------
  test('UNIT-FE-15: InsightsTab architectural integrity, live state coherence and relative API routing', () => {
    const appPath = path.join(projectRoot, 'src', 'App.jsx');
    const appContent = fs.readFileSync(appPath, 'utf8');

    // Verify InsightsTab receives theme and targetTimelineVal
    assert.ok(
      appContent.includes('theme={theme}') &&
      appContent.includes('targetTimelineVal={targetTimelineVal}') &&
      appContent.includes('uploadedFileMeta='),
      'App.jsx must pass theme, targetTimelineVal, and uploadedFileMeta to InsightsTab'
    );

    // Verify relative API endpoints in ActionableAiCenter
    const actionablePath = path.join(projectRoot, 'src', 'components', 'ActionableAiCenter.jsx');
    const actionableContent = fs.readFileSync(actionablePath, 'utf8');
    assert.ok(
      !actionableContent.includes('http://127.0.0.1:8000'),
      'ActionableAiCenter.jsx must NOT use hardcoded http://127.0.0.1:8000'
    );
    assert.ok(
      actionableContent.includes("fetch('/api/actionable/ask-copilot'"),
      'ActionableAiCenter.jsx must use relative /api/actionable/ask-copilot'
    );

    // Verify relative API endpoints in DataPipelineEtlCenter
    const etlPath = path.join(projectRoot, 'src', 'components', 'DataPipelineEtlCenter.jsx');
    const etlContent = fs.readFileSync(etlPath, 'utf8');
    assert.ok(
      !etlContent.includes('http://127.0.0.1:8000'),
      'DataPipelineEtlCenter.jsx must NOT use hardcoded http://127.0.0.1:8000'
    );
  });

  // ----------------------------------------------------------------------------
  // 16. WAYFINDING SIGNAGE & AIRPORT PICTOGRAM ICON SYSTEM
  // ----------------------------------------------------------------------------
  test('UNIT-FE-16: Wayfinding Signage & Airport Pictogram system covers all pages', () => {
    const iconsPath = path.join(projectRoot, 'src', 'components', 'LuxuryIcons.jsx');
    const iconsContent = fs.readFileSync(iconsPath, 'utf8');

    // 1. Wayfinding Signage badges & icon components exported
    assert.ok(iconsContent.includes('export function LuxuryIconBadge'), 'LuxuryIcons must export LuxuryIconBadge');
    assert.ok(iconsContent.includes('export function LuxuryModuleIcon'), 'LuxuryIcons must export LuxuryModuleIcon');
    assert.ok(iconsContent.includes('wayfinding-icon-badge'), 'LuxuryIconBadge must include wayfinding-icon-badge class');

    // 2. All 12 primary pages and modules supported in LuxuryModuleIcon
    const expectedModules = [
      'overview',
      'bi_studio',
      'customers',
      'staff_pos',
      'multi_channel',
      'procurement',
      'inventory',
      'insights',
      'live',
      'database',
      'admin',
      'settings'
    ];
    for (const mod of expectedModules) {
      assert.ok(
        iconsContent.includes(`case '${mod}':`),
        `LuxuryModuleIcon must handle pictogram for module: ${mod}`
      );
    }

    // 3. App.jsx imports and re-exports canonical Wayfinding Icon components
    const appPath = path.join(projectRoot, 'src', 'App.jsx');
    const appContent = fs.readFileSync(appPath, 'utf8');
    assert.ok(
      appContent.includes("export { LuxuryIconBadge, LuxuryModuleIcon } from './components/LuxuryIcons'"),
      'App.jsx must export canonical Wayfinding icons from LuxuryIcons.jsx'
    );
  });

  // ----------------------------------------------------------------------------
  // 17. 3D ANIMATED GOAL TRAJECTORY HERO BACKGROUND INTEGRATION
  // ----------------------------------------------------------------------------
  test('UNIT-FE-17: 3D Animated Goal Trajectory Hero Background Integration', () => {
    // 1. Component exists and exports HeroGoalTrajectoryBackground
    const heroBgPath = path.join(projectRoot, 'src', 'components', 'HeroGoalTrajectoryBackground.jsx');
    assert.ok(fs.existsSync(heroBgPath), 'HeroGoalTrajectoryBackground.jsx must exist');
    const heroBgContent = fs.readFileSync(heroBgPath, 'utf8');
    assert.ok(
      heroBgContent.includes('export function HeroGoalTrajectoryBackground'),
      'HeroGoalTrajectoryBackground.jsx must export HeroGoalTrajectoryBackground'
    );

    // 2. 3D Goal Trajectory & Mountain of Success assets exist in public folder
    const publicHeroVictory = path.join(projectRoot, 'public', 'hero-victory-bg.jpg');
    assert.ok(fs.existsSync(publicHeroVictory), 'public/hero-victory-bg.jpg (Mountain of Success) must exist');
    assert.ok(
      heroBgContent.includes('/hero-victory-bg.jpg'),
      'HeroGoalTrajectoryBackground.jsx must use Mountain of Success (/hero-victory-bg.jpg) as the single hero background'
    );

    // 3. Hardware-accelerated 3D keyframe animations in index.css
    const cssPath = path.join(projectRoot, 'src', 'index.css');
    const cssContent = fs.readFileSync(cssPath, 'utf8');
    assert.ok(cssContent.includes('@keyframes goal3dBreathe'), 'index.css must define goal3dBreathe');
    assert.ok(cssContent.includes('@keyframes goalLaserFlow'), 'index.css must define goalLaserFlow');
    assert.ok(cssContent.includes('@keyframes goalRadarPulse1'), 'index.css must define goalRadarPulse1');
    assert.ok(cssContent.includes('@keyframes goalSummitPulse'), 'index.css must define goalSummitPulse');

    // 4. App.jsx imports and wraps the Hero section in HeroGoalTrajectoryBackground
    const appPath = path.join(projectRoot, 'src', 'App.jsx');
    const appContent = fs.readFileSync(appPath, 'utf8');
    assert.ok(
      appContent.includes("import { HeroGoalTrajectoryBackground } from './components/HeroGoalTrajectoryBackground'"),
      'App.jsx must import HeroGoalTrajectoryBackground'
    );
    assert.ok(
      appContent.includes('<HeroGoalTrajectoryBackground') && appContent.includes('</HeroGoalTrajectoryBackground>'),
      'App.jsx must wrap hero with HeroGoalTrajectoryBackground'
    );
  });

  // ----------------------------------------------------------------------------
  // 18. INTELLIGENT NAME & CUSTUMMER_NAME COLUMN RESOLUTION
  // ----------------------------------------------------------------------------
  test('UNIT-FE-18: Accurate detection of name, compound name_*, *_name, and Custummer_name', () => {
    const appPath = path.join(projectRoot, 'src', 'App.jsx');
    const appContent = fs.readFileSync(appPath, 'utf8');

    // Verify regex handles Custummer_name (typo with double m), customer_name, and compound names
    assert.ok(
      appContent.includes('cust[ou]?m+er') || appContent.includes('Custummer_name'),
      'App.jsx must support custummer with double m and flexible customer variations'
    );
    assert.ok(
      appContent.includes('colCustomerIdx') && appContent.includes('colProductIdx'),
      'App.jsx must track customer and product column indexes distinctly'
    );
    assert.ok(
      appContent.includes('standaloneNameIdx') || appContent.includes('name[_]') || appContent.includes('[_]name'),
      'App.jsx must correctly resolve prefix and suffix name variations'
    );
  });

  // ----------------------------------------------------------------------------
  // 19. TAB RESILIENCE & ERROR BOUNDARY ACTIVE TAB ISOLATION
  // ----------------------------------------------------------------------------
  test('UNIT-FE-19: ErrorBoundary isolates active tab and tab components have safe fallback defaults', () => {
    const appPath = path.join(projectRoot, 'src', 'App.jsx');
    const appContent = fs.readFileSync(appPath, 'utf8');

    // Verify ErrorBoundary uses key={activeTab} to prevent error propagation across tabs
    assert.ok(
      appContent.includes('<ErrorBoundary key={activeTab}') || appContent.includes('key={activeTab} resetKey={activeTab}'),
      'App.jsx must isolate ErrorBoundary with key={activeTab}'
    );

    // Verify MultiChannelTab receives dbRecords and inventoryList
    assert.ok(
      appContent.includes('dbRecords={dbRecords}') && appContent.includes('inventoryList={inventoryList}'),
      'App.jsx must pass dbRecords and inventoryList to MultiChannelTab'
    );

    // Verify ErrorBoundary handles resetKey to clear errors on prop changes
    const ebPath = path.join(projectRoot, 'src', 'components', 'ErrorBoundary.jsx');
    const ebContent = fs.readFileSync(ebPath, 'utf8');
    assert.ok(
      ebContent.includes('resetKey') && (ebContent.includes('getDerivedStateFromProps') || ebContent.includes('componentDidUpdate')),
      'ErrorBoundary.jsx must clear error state when resetKey changes'
    );
  });

  // ----------------------------------------------------------------------------
  // 20. SUPPLIER & PROCUREMENT RESILIENCE AND SUBSCRIPTION UNLOCK
  // ----------------------------------------------------------------------------
  test('UNIT-FE-20: ProcurementTab is bulletproof, ungated across tiers, and has valid schemas', () => {
    const appPath = path.join(projectRoot, 'src', 'App.jsx');
    const appContent = fs.readFileSync(appPath, 'utf8');

    // 1. Verify procurement tab is unlocked in isTabUnlocked
    assert.ok(
      appContent.includes("if (tabId === 'procurement') return true;"),
      'App.jsx must allow procurement tab in isTabUnlocked'
    );

    // 2. Verify starter and professional allowedTabs include procurement
    assert.ok(
      appContent.includes("starter:") && appContent.includes("'procurement'"),
      'Starter tier must allow procurement tab'
    );

    // 3. Verify ProcurementTab has safe fallbacks for vendors, requisitions, and centralPos
    assert.ok(
      appContent.includes('initialVendorsBilingual') &&
      appContent.includes('initialBranchRequisitionsBilingual') &&
      appContent.includes('initialCentralPosBilingual'),
      'ProcurementTab must fall back to initial bilingual datasets when empty'
    );

    // 4. Verify importedBranchRequisitions has required fields for ProcurementTab
    assert.ok(
      appContent.includes('branchNeeds:') && appContent.includes('regularUnitCost: unitCost'),
      'importedBranchRequisitions must include branchNeeds and regularUnitCost'
    );

    // 5. Verify importedCentralPosList includes regularTotalCost and discountedTotalCost
    assert.ok(
      appContent.includes('regularTotalCost,') && appContent.includes('discountedTotalCost,'),
      'importedCentralPosList must include regularTotalCost and discountedTotalCost'
    );
  });

  // ----------------------------------------------------------------------------
  // 21. DEEP-DIVE BUSINESS-SPECIFIC KPI ENGINE & UNIT ECONOMICS SIMULATION
  // ----------------------------------------------------------------------------
  test('UNIT-FE-21: ExecutiveBiStudio includes 7-KPI deep dive engine and scenario simulation', () => {
    const biStudioPath = path.join(projectRoot, 'src', 'components', 'ExecutiveBiStudio.jsx');
    assert.ok(fs.existsSync(biStudioPath), 'ExecutiveBiStudio.jsx must exist');
    const biContent = fs.readFileSync(biStudioPath, 'utf8');

    // 1. State for Mode Switcher & Simulation Levers
    assert.ok(
      biContent.includes("activeStudioTab") && biContent.includes("'deep_dive_kpis'"),
      'ExecutiveBiStudio must support activeStudioTab with deep_dive_kpis mode'
    );
    assert.ok(
      biContent.includes('kpiPriceSimPct') &&
      biContent.includes('kpiAdSpendSimMultiplier') &&
      biContent.includes('kpiInventorySimMultiplier'),
      'ExecutiveBiStudio must define interactive simulation levers for Price, Ad Spend, and Inventory Buffer'
    );

    // 2. Deep-Dive KPI Calculation Memo (GMROI, LTV:CAC, STR, RPR, PED, Breakeven)
    assert.ok(
      biContent.includes('const deepDiveKpis = useMemo('),
      'ExecutiveBiStudio must compute deepDiveKpis'
    );
    assert.ok(
      biContent.includes('gmroi') && biContent.includes('avgInventoryCost'),
      'deepDiveKpis must calculate GMROI based on gross profit and inventory cost'
    );
    assert.ok(
      biContent.includes('ltvToCac') && biContent.includes('cacPaybackMonths'),
      'deepDiveKpis must compute LTV:CAC ratio and CAC Payback period'
    );
    assert.ok(
      biContent.includes('strPct') && biContent.includes('totalStockAvailable'),
      'deepDiveKpis must compute Sell-Through Rate (STR %)'
    );
    assert.ok(
      biContent.includes('rprPct') && biContent.includes('churnPct'),
      'deepDiveKpis must compute Repeat Purchase Rate (RPR %) and Churn'
    );
    assert.ok(
      biContent.includes('basePed') && biContent.includes('projectedSimRevenue'),
      'deepDiveKpis must project Price Elasticity of Demand (PED) and new simulated revenue'
    );
    assert.ok(
      biContent.includes('breakevenOrders') && biContent.includes('marginOfSafetyPct'),
      'deepDiveKpis must compute Breakeven Orders and Margin of Safety'
    );

    // 3. UI Component Scorecards & Formula Catalog Table
    assert.ok(
      biContent.includes('GMROI (ผลตอบแทนสต็อกต่อกำไรขั้นต้น)') || biContent.includes('GMROI'),
      'ExecutiveBiStudio must render GMROI card'
    );
    assert.ok(
      biContent.includes('LTV : CAC Ratio') && biContent.includes('CAC Payback Period'),
      'ExecutiveBiStudio must render LTV:CAC and Payback Period scorecard'
    );
    assert.ok(
      biContent.includes('Sell-Through Rate (STR)') || biContent.includes('Sell-Through Rate'),
      'ExecutiveBiStudio must render Sell-Through Rate scorecard'
    );
    assert.ok(
      biContent.includes('Repeat Purchase Rate (RPR)') || biContent.includes('Repeat Purchase Rate'),
      'ExecutiveBiStudio must render Repeat Purchase Rate scorecard'
    );
    assert.ok(
      biContent.includes('Price Elasticity (PED)') || biContent.includes('Price Elasticity of Demand'),
      'ExecutiveBiStudio must render Price Elasticity scorecard'
    );
    assert.ok(
      biContent.includes('Breakeven Orders (BEP)') || biContent.includes('Breakeven Volume'),
      'ExecutiveBiStudio must render Breakeven scorecard'
    );
    assert.ok(
      biContent.includes('7 Core Business Formulas') || biContent.includes('7 Core Deep-Dive Business KPI Formulas Catalog'),
      'ExecutiveBiStudio must render the 7-KPI Formula Catalog directory table'
    );
  });

  // ----------------------------------------------------------------------------
  // 22. AUTONOMOUS AI EXECUTIVE SECRETARY TAB INTEGRATION & CAPABILITIES
  // ----------------------------------------------------------------------------
  test('UNIT-FE-22: Autonomous AI Executive Secretary Tab integration and agent capabilities', () => {
    // 1. Component existence and export
    const secretaryPath = path.join(projectRoot, 'src', 'components', 'ExecutiveSecretaryTab.jsx');
    assert.ok(fs.existsSync(secretaryPath), 'ExecutiveSecretaryTab.jsx must exist');
    const secretaryContent = fs.readFileSync(secretaryPath, 'utf8');
    assert.ok(
      secretaryContent.includes('export default function ExecutiveSecretaryTab'),
      'ExecutiveSecretaryTab.jsx must export default component'
    );

    // 2. Multi-feature capabilities
    assert.ok(
      secretaryContent.includes("activeSubTab") &&
      secretaryContent.includes("'briefing'") &&
      secretaryContent.includes("'chat'") &&
      secretaryContent.includes("'tasks'") &&
      secretaryContent.includes("'skills'"),
      'ExecutiveSecretaryTab must support briefing, chat, tasks, and skills sub-tabs'
    );
    assert.ok(
      secretaryContent.includes('handleCopyExecutiveBriefing') && secretaryContent.includes('handleTriggerAgentBriefing'),
      'ExecutiveSecretaryTab must support briefing export and agent trigger'
    );
    assert.ok(
      secretaryContent.includes('handleSendChat') && secretaryContent.includes('chatMessages'),
      'ExecutiveSecretaryTab must include conversational agent chat terminal'
    );
    assert.ok(
      secretaryContent.includes('tasks') && secretaryContent.includes('handleToggleTask'),
      'ExecutiveSecretaryTab must include action items and task management'
    );

    // 3. App.jsx integration
    const appPath = path.join(projectRoot, 'src', 'App.jsx');
    const appContent = fs.readFileSync(appPath, 'utf8');
    assert.ok(
      appContent.includes("import ExecutiveSecretaryTab from './components/ExecutiveSecretaryTab'"),
      'App.jsx must import ExecutiveSecretaryTab'
    );
    assert.ok(
      appContent.includes("activeTab === 'secretary'"),
      'App.jsx must render ExecutiveSecretaryTab on secretary tab'
    );
    assert.ok(
      appContent.includes("id: 'secretary'") && appContent.includes("tabId === 'secretary'"),
      'App.jsx must configure secretary in sidebar and unlock it'
    );

    // 4. Luxury Icons integration
    const iconsPath = path.join(projectRoot, 'src', 'components', 'LuxuryIcons.jsx');
    const iconsContent = fs.readFileSync(iconsPath, 'utf8');
    assert.ok(
      iconsContent.includes('export function ExecutiveSecretaryIcon'),
      'LuxuryIcons must export ExecutiveSecretaryIcon'
    );
    assert.ok(
      iconsContent.includes("case 'secretary':"),
      'LuxuryIcons must handle secretary case in LuxuryModuleIcon'
    );
  });

  // ----------------------------------------------------------------------------
  // 23. OFFICIAL 7-SHADE ULTRAMARINE PALETTE & DESIGN SYSTEM
  // ----------------------------------------------------------------------------
  test('UNIT-FE-23: Official 7-shade Ultramarine Palette integrated across Tailwind, CSS & App', () => {
    // 1. Tailwind configuration defines all 7 shades
    const tailwindPath = path.join(projectRoot, 'tailwind.config.js');
    const tailwindContent = fs.readFileSync(tailwindPath, 'utf8');
    assert.ok(tailwindContent.includes('ultramarine:'), 'tailwind.config.js must define ultramarine palette');
    assert.ok(tailwindContent.includes('#071039'), 'ultramarine must include #071039');
    assert.ok(tailwindContent.includes('#0F2270'), 'ultramarine must include #0F2270');
    assert.ok(tailwindContent.includes('#1A3BB0'), 'ultramarine must include #1A3BB0');
    assert.ok(tailwindContent.includes('#2E5DE6'), 'ultramarine must include #2E5DE6');
    assert.ok(tailwindContent.includes('#6E92F2'), 'ultramarine must include #6E92F2');
    assert.ok(tailwindContent.includes('#AFC5F8'), 'ultramarine must include #AFC5F8');
    assert.ok(tailwindContent.includes('#E6EDFD'), 'ultramarine must include #E6EDFD');

    // 2. index.css root styles
    const cssPath = path.join(projectRoot, 'src', 'index.css');
    const cssContent = fs.readFileSync(cssPath, 'utf8');
    assert.ok(cssContent.includes('#071039'), 'index.css must use #071039 for dark mode canvas');
    assert.ok(cssContent.includes('#E6EDFD'), 'index.css must use #E6EDFD for light mode canvas');
    assert.ok(cssContent.includes('#AFC5F8'), 'index.css must use #AFC5F8 for light mode borders');

    // 3. App.jsx root background classes
    const appPath = path.join(projectRoot, 'src', 'App.jsx');
    const appContent = fs.readFileSync(appPath, 'utf8');
    assert.ok(appContent.includes('bg-[#071039]'), 'App.jsx must use #071039 in dark mode');
    assert.ok(appContent.includes('bg-[#E6EDFD]'), 'App.jsx must use #E6EDFD in light mode');
    assert.ok(appContent.includes('#1A3BB0'), 'App.jsx must use #1A3BB0 in dark headers');
  });

  // ----------------------------------------------------------------------------
  // 24. MODERN SPLIT-CARD AUTHENTICATION WITH ORGANIC WAVE ARCHITECTURE
  // ----------------------------------------------------------------------------
  test('UNIT-FE-24: Modern Split-Card Auth Modal with Organic Wave Architecture & Ultramarine Theme', () => {
    const appPath = path.join(projectRoot, 'src', 'App.jsx');
    const appContent = fs.readFileSync(appPath, 'utf8');

    // 1. Split-card responsive container
    assert.ok(
      appContent.includes('max-w-4xl lg:max-w-5xl') && appContent.includes('flex flex-col md:flex-row'),
      'Auth modal must have responsive split-card layout (desktop horizontal, mobile vertical)'
    );

    // 2. Multi-layered organic cloud/wave SVG dividers
    assert.ok(
      appContent.includes('viewBox="0 0 100 800"') && appContent.includes('viewBox="0 0 800 100"'),
      'Auth modal must include multi-layered organic wave dividers for both desktop and mobile'
    );

    // 3. Dual pill action buttons
    assert.ok(
      appContent.includes('rounded-full bg-gradient-to-r from-[#2E5DE6] to-[#1A3BB0]') &&
      appContent.includes('rounded-full border-2'),
      'Auth modal must feature primary gradient pill button and secondary outline pill button'
    );

    // 4. Brand identity & circular glass badge
    assert.ok(
      appContent.includes('INSIGHTFLOW') && appContent.includes('AppLogo size={52}'),
      'Brand showcase must feature circular glass badge with official AppLogo'
    );
  });

  // ----------------------------------------------------------------------------
  // 25. STATIC 4K METROPOLITAN NIGHT CITYSCAPE BACKGROUND (NO ANIMATION)
  // ----------------------------------------------------------------------------
  test('UNIT-FE-25: Static 4K Metropolitan Night Cityscape Background without Animation', () => {
    // 1. Asset existence and file size (> 100KB)
    const publicCityPath = path.join(projectRoot, 'public', 'hero-city-night-4k.jpg');
    assert.ok(fs.existsSync(publicCityPath), 'public/hero-city-night-4k.jpg must exist');
    const stats = fs.statSync(publicCityPath);
    assert.ok(stats.size > 100000, '4K night city image must be high resolution (> 100KB)');

    // 2. Component references 4K night city asset
    const heroBgPath = path.join(projectRoot, 'src', 'components', 'HeroGoalTrajectoryBackground.jsx');
    const heroBgContent = fs.readFileSync(heroBgPath, 'utf8');
    assert.ok(
      heroBgContent.includes('/hero-city-night-4k.jpg'),
      'HeroGoalTrajectoryBackground.jsx must reference /hero-city-night-4k.jpg'
    );

    // 3. No animation in background (static 4K)
    assert.ok(
      !heroBgContent.includes('animate-goal-3d-breathe'),
      'HeroGoalTrajectoryBackground.jsx must not have animate-goal-3d-breathe (clean static 4K)'
    );
    assert.ok(
      !heroBgContent.includes('animate-goal-laser-flow'),
      'HeroGoalTrajectoryBackground.jsx must not have laser animation (clean static 4K)'
    );
  });

});



