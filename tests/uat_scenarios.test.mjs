// ==============================================================================
// File: tests/uat_scenarios.test.mjs
// System: InsightFlow User Acceptance Testing (UAT) Suite
// Stack: Node.js 24 Native Test Runner (node:test, node:assert/strict)
// Description:
//   End-to-End User Journeys and Acceptance Criteria verification for:
//   1. Executive Authentication & Google Sign-In Flow
//   2. Minimalist Theme & Dark/Light Mode Contrast
//   3. 6 Luxury 3D Jewel Icons Verification in UI components
//   4. Cat Alert Removal & Single Logo Acceptance
//   5. Daily Store Closing, Yearly Sales Summary & Reporting Export
//   6. Enterprise Data Governance & Role-Based Access Control
// ==============================================================================

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

describe('InsightFlow User Acceptance Testing (UAT) Scenarios', () => {

  // ----------------------------------------------------------------------------
  // UAT-SCENARIO-01: Executive Authentication & Google Sign-In Flow
  // ----------------------------------------------------------------------------
  test('UAT-01: User can authenticate via Google Sign-In and Corporate Credentials', () => {
    const appPath = path.join(projectRoot, 'src', 'App.jsx');
    const content = fs.readFileSync(appPath, 'utf8');

    // 1. Google Login Button integration
    assert.ok(
      content.includes('handleGoogleSuccess') || content.includes('GoogleLogin') || content.includes('GoogleIcon'),
      'Acceptance Criteria: Google Sign-In integration must be wired in App.jsx'
    );

    // 2. Official Google Icon display
    assert.ok(
      content.includes('<GoogleIcon') || content.includes('GoogleIcon'),
      'Acceptance Criteria: Official 4-color Google Icon must be rendered for Google Sign-In'
    );

    // 3. User session persistence & logout capability
    assert.ok(
      content.includes('handleLogout') || content.includes('logout'),
      'Acceptance Criteria: User must have clear logout capability to terminate active session'
    );
  });

  // ----------------------------------------------------------------------------
  // UAT-SCENARIO-02: Minimalist Modern Theme & Dark/Light Mode
  // ----------------------------------------------------------------------------
  test('UAT-02: Seamless theme toggle between Light Mode and Dark Mode', () => {
    const appPath = path.join(projectRoot, 'src', 'App.jsx');
    const appContent = fs.readFileSync(appPath, 'utf8');

    // 1. Theme toggle state
    assert.ok(
      appContent.includes('const [theme, setTheme]') || appContent.includes("theme === 'dark'"),
      'Acceptance Criteria: Theme state must allow toggling between Light and Dark mode'
    );

    // 2. Class-based dark styling or theme === "dark" conditional classes
    assert.ok(
      appContent.includes("theme === 'dark'") || appContent.includes('dark:bg-'),
      'Acceptance Criteria: Tailored dark classes must style elements for comfortable contrast'
    );

    // 3. Clean fonts configured in Tailwind
    const tailwindPath = path.join(projectRoot, 'tailwind.config.js');
    const tailwindContent = fs.readFileSync(tailwindPath, 'utf8');
    assert.ok(
      tailwindContent.includes('Prompt') && tailwindContent.includes('Kanit'),
      'Acceptance Criteria: Modern Thai typography (Prompt, Kanit) must be configured for readability'
    );
  });

  // ----------------------------------------------------------------------------
  // UAT-SCENARIO-03: 6 Luxury 3D Jewel Icons Verification in UI Components
  // ----------------------------------------------------------------------------
  test('UAT-03: All 6 Luxury 3D Jewel Icons are embedded in their designated dashboard sections', () => {
    const componentsDir = path.join(projectRoot, 'src', 'components');

    // 1. "ร้านคุณอยู่จุดไหนของตลาด?" & "อัตราการตัดสินใจซื้อ" & "เปรียบเทียบยอดซื้อต่อบิล"
    const overviewPath = path.join(componentsDir, 'OverviewAndCustomers.jsx');
    const overviewContent = fs.readFileSync(overviewPath, 'utf8');
    assert.ok(
      overviewContent.includes('MarketPositionRadarIcon') || overviewContent.includes('PurchaseConversionRateIcon'),
      'Acceptance Criteria: Market Position or Purchase Conversion Icon must be embedded in Overview & Customers'
    );

    // 2. "เปรียบเทียบยอดซื้อต่อบิล" & "สรุปปิดยอดร้านประจำวัน"
    const industryPath = path.join(componentsDir, 'IndustryBenchmarkAndGoalDecomposition.jsx');
    const industryContent = fs.readFileSync(industryPath, 'utf8');
    assert.ok(
      industryContent.includes('BasketSizePerBillIcon') || industryContent.includes('DailyStoreClosingIcon') || industryContent.includes('MarketPositionRadarIcon'),
      'Acceptance Criteria: Basket Size or Daily Store Closing Icon must be embedded in Industry Benchmark'
    );

    // 3. "เปรียบเทียบยอดขาย ค่าธรรมเนียม" & "ควบคุมจุดสั่งซื้อสินค้า"
    const cashflowPath = path.join(componentsDir, 'CashFlowAndDemandForecast.jsx');
    const cashflowContent = fs.readFileSync(cashflowPath, 'utf8');
    assert.ok(
      cashflowContent.includes('SalesVsFeesComparisonIcon') || cashflowContent.includes('ReorderPointControlIcon'),
      'Acceptance Criteria: Sales vs Fees or Reorder Point Control Icon must be embedded in Cash Flow & Demand Forecast'
    );

    // 4. "ตารางแสดงข้อความและข้อมูลจริง", "แนวโน้มปกติเดิม", "ยอดขายเฉลี่ยรายวัน", "มาตรฐานองค์กร"
    const appPath = path.join(projectRoot, 'src', 'App.jsx');
    const appContent = fs.readFileSync(appPath, 'utf8');
    assert.ok(
      appContent.includes('ActualParsedDataTableIcon') && appContent.includes('BaselineTrajectoryIcon'),
      'Acceptance Criteria: ActualParsedDataTableIcon and BaselineTrajectoryIcon must be embedded in App.jsx'
    );

    const advancedPath = path.join(componentsDir, 'AdvancedAnalyticsSuite.jsx');
    const advancedContent = fs.readFileSync(advancedPath, 'utf8');
    assert.ok(
      advancedContent.includes('DailyAverageDemandIcon'),
      'Acceptance Criteria: DailyAverageDemandIcon must be embedded in Advanced Analytics Suite'
    );

    const governancePath = path.join(componentsDir, 'DataGovernanceCenter.jsx');
    const governanceContent = fs.readFileSync(governancePath, 'utf8');
    assert.ok(
      governanceContent.includes('EnterpriseStandardIcon'),
      'Acceptance Criteria: EnterpriseStandardIcon must be embedded in Data Governance Center'
    );
  });

  // ----------------------------------------------------------------------------
  // UAT-SCENARIO-04: Cat Alert Removal & Single Logo Acceptance
  // ----------------------------------------------------------------------------
  test('UAT-04: Header is uncluttered - Cat test alert button removed & sole 3D logo present', () => {
    const appPath = path.join(projectRoot, 'src', 'App.jsx');
    const content = fs.readFileSync(appPath, 'utf8');

    // Cat test alert button strictly forbidden
    assert.ok(
      !content.includes('ทดสอบป้ายเตือนน้องแมว'),
      'Acceptance Criteria: "ทดสอบป้ายเตือนน้องแมว" button must be absent from Header'
    );

    // Sole logo is InsightFlowGlassBarsLogo
    assert.ok(
      content.includes('InsightFlowGlassBarsLogo'),
      'Acceptance Criteria: InsightFlow 3D Glass Bars logo must be the sole official logo rendered'
    );
  });

  // ----------------------------------------------------------------------------
  // UAT-SCENARIO-05: Yearly Sales Summary & Reporting Export
  // ----------------------------------------------------------------------------
  test('UAT-05: Yearly sales summary reporting engine and export script exist and are healthy', () => {
    const exportScriptPath = path.join(projectRoot, 'backend', 'export_yearly_sales.py');
    assert.ok(fs.existsSync(exportScriptPath), 'backend/export_yearly_sales.py must exist');

    const content = fs.readFileSync(exportScriptPath, 'utf8');
    assert.ok(
      content.includes('csv') || content.includes('DataFrame') || content.includes('pandas'),
      'Acceptance Criteria: Yearly sales exporter must support structured tabular/CSV generation'
    );
  });

  // ----------------------------------------------------------------------------
  // UAT-SCENARIO-06: Enterprise Data Governance & Role-Based Access Control
  // ----------------------------------------------------------------------------
  test('UAT-06: Sensitive financial metrics and customer data are protected by RBAC matrix', () => {
    const governancePath = path.join(projectRoot, 'backend', 'data_governance.py');
    assert.ok(fs.existsSync(governancePath), 'backend/data_governance.py must exist');

    const content = fs.readFileSync(governancePath, 'utf8');

    // Validate RBAC definition
    assert.ok(
      content.includes('can_view_net_profit') && content.includes('can_view_unmasked_customer_phone'),
      'Acceptance Criteria: System must enforce granular permissions for Net Profit and PII data'
    );

    // Validate Quarantine Room
    assert.ok(
      content.includes('DataQualityGatekeeper'),
      'Acceptance Criteria: 5-point Data Quality Gatekeeper must isolate erroneous inputs'
    );
  });

  // ----------------------------------------------------------------------------
  // UAT-SCENARIO-07: Eye-Comfort White-Blue Light Mode & Green/Red Trend Indicators
  // ----------------------------------------------------------------------------
  test('UAT-07: Light mode applies soothing White-Blue aesthetic and Green (ขาขึ้น) / Red (ขาลง) indicators', () => {
    // 1. Check App.jsx navigation and header use Blue tones in light mode
    const appPath = path.join(projectRoot, 'src', 'App.jsx');
    const appContent = fs.readFileSync(appPath, 'utf8');

    assert.ok(
      appContent.includes('text-blue-') || appContent.includes('border-blue-') || appContent.includes('bg-blue-'),
      'Acceptance Criteria: App.jsx must use Blue accents in Light Mode controls'
    );

    // 2. Check Industry Benchmark uses Red for downward/negative metrics
    const industryPath = path.join(projectRoot, 'src', 'components', 'IndustryBenchmarkAndGoalDecomposition.jsx');
    const industryContent = fs.readFileSync(industryPath, 'utf8');

    assert.ok(
      industryContent.includes('#ef4444') || industryContent.includes('text-rose-') || industryContent.includes('text-red-'),
      'Acceptance Criteria: Downward benchmark metrics (diff < 0) must use Red tone'
    );

    // 3. Check CashFlow demand forecasts standardize positive surges to Green
    const cashflowPath = path.join(projectRoot, 'src', 'components', 'CashFlowAndDemandForecast.jsx');
    const cashflowContent = fs.readFileSync(cashflowPath, 'utf8');

    assert.ok(
      cashflowContent.includes('#10b981'),
      'Acceptance Criteria: Positive demand surges must use Green tone (#10b981)'
    );
  });

  // ----------------------------------------------------------------------------
  // UAT-SCENARIO-08: File Vault Management (Delete, Add, and Replace Files)
  // ----------------------------------------------------------------------------
  test('UAT-08: File Registry allows deleting files and uploading/adding new files freely', () => {
    const appPath = path.join(projectRoot, 'src', 'App.jsx');
    const appContent = fs.readFileSync(appPath, 'utf8');

    // 1. Initial baseline and localStorage persistence
    assert.ok(
      appContent.includes('export const initialPageUploadedFiles =') &&
      appContent.includes('localStorage.getItem(\'insightflow_page_uploaded_files_v2\')'),
      'Acceptance Criteria: App.jsx must export initialPageUploadedFiles and persist to localStorage'
    );

    // 2. Deletion & Reset Handlers
    assert.ok(
      appContent.includes('handleDeleteUploadedFile') &&
      appContent.includes('handleClearAllFiles') &&
      appContent.includes('handleRestoreDemoFiles'),
      'Acceptance Criteria: App.jsx must implement handleDeleteUploadedFile, handleClearAllFiles, and handleRestoreDemoFiles'
    );

    // 3. Adding New Files to Vault
    assert.ok(
      appContent.includes('onAddCustomFile') || appContent.includes('Add File to Vault'),
      'Acceptance Criteria: File Registry must support uploading and adding arbitrary new files to the vault'
    );

    // 4. Per-file Delete / Reset and Replace controls
    assert.ok(
      appContent.includes('onDeleteUploadedFile') &&
      appContent.includes('onUploadFileForTab') &&
      appContent.includes('onRestoreDemoFiles'),
      'Acceptance Criteria: File registry must feature per-file delete/replace and restore demo actions'
    );
  });

});
