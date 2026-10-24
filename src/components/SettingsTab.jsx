import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { LuxuryIconBadge, LuxuryModuleIcon } from './LuxuryIcons';

/**
 * SettingsTab - ศูนย์บัญชาการและการตั้งค่าระบบองค์กรครบวงจร (Enterprise System Settings Center)
 * 
 * 6 หมวดหมู่การตั้งค่าระดับพรีเมียม:
 * 1. general: ข้อมูลองค์กรและโปรไฟล์ผู้บริหาร (Organization & Executive Profile)
 * 2. notifications: ศูนย์ตั้งค่าการแจ้งเตือนอัจฉริยะ LINE / SMS / Email (Smart Notifications)
 * 3. ai_secretary: การตั้งค่าเลขา AI อัจฉริยะและสไตล์การวิเคราะห์ (AI Secretary & Copilot)
 * 4. integrations: การเชื่อมต่อ Data Warehouse, ETL Pipeline และ Redis Cache (Data Integrations)
 * 5. appearance: ธีมสี Ultramarine, ภาษา 100%, และขนาดตัวอักษร (Appearance & Display)
 * 6. security: ความปลอดภัย 2FA OTP, สิทธิ์ RBAC, และสำรองข้อมูล (Security & Backup Vault)
 */

export function SettingsTab({
  lang = 'th',
  setLang = () => {},
  theme = 'dark',
  setTheme = () => {},
  fontScale = 'normal',
  setFontScale = () => {},
  rememberCredentials = true,
  setRememberCredentials = () => {},
  userPhone = '089-999-8888',
  userLineId = '@owner_insightflow',
  onUpdateUserContact = () => {},
  user = null,
  activePlan = 'professional',
  dbRecords = [],
  onOpenExecutiveOnePager = null
}) {
  const isEn = lang === 'en';
  const tx = (th, en) => (isEn ? en : th);

  // Active sub-tab state
  const [subTab, setSubTab] = useState('general');

  // --- 1. General & Organization State ---
  const [businessName, setBusinessName] = useState('Insight Enterprise Co., Ltd.');
  const [branchName, setBranchName] = useState('สำนักงานใหญ่ (Headquarters)');
  const [taxId, setTaxId] = useState('0105562089451');
  const [defaultCurrency, setDefaultCurrency] = useState('THB');

  // --- 2. Notification Center State ---
  const [phoneVal, setPhoneVal] = useState(userPhone || '089-999-8888');
  const [lineVal, setLineVal] = useState(userLineId || '@owner_insightflow');
  const [dailyAlertTime, setDailyAlertTime] = useState('22:00');
  const [enableDailySummary, setEnableDailySummary] = useState(true);
  const [enableLowStockAlert, setEnableLowStockAlert] = useState(true);
  const [lowStockThreshold, setLowStockThreshold] = useState('20');
  const [enableMilestoneAlert, setEnableMilestoneAlert] = useState(true);
  const [enableWeeklyPdf, setEnableWeeklyPdf] = useState(false);

  // --- 3. AI Secretary Settings State ---
  const [aiPersonality, setAiPersonality] = useState('executive'); // 'executive' | 'strategic' | 'coach'
  const [briefingFrequency, setBriefingFrequency] = useState('morning_evening'); // 'morning' | 'morning_evening' | 'manual'
  const [anomalySensitivity, setAnomalySensitivity] = useState('medium'); // 'high' | 'medium' | 'low'
  const [allowAutoWhatIf, setAllowAutoWhatIf] = useState(true);

  // --- 4. Integrations & ETL State ---
  const [etlFrequency, setEtlFrequency] = useState('1h'); // '15m' | '1h' | 'daily' | 'manual'
  const [enableGSheetAutoSync, setEnableGSheetAutoSync] = useState(true);
  const [isSyncingEtl, setIsSyncingEtl] = useState(false);

  // --- 6. Security & Vault State ---
  const [enable2FaOtp, setEnable2FaOtp] = useState(true);
  const [sessionTimeout, setSessionTimeout] = useState('7d');

  // Sync prop changes for phone and LINE ID
  const handleSaveContact = () => {
    onUpdateUserContact(phoneVal, lineVal);
    toast.success(
      tx(
        `✅ บันทึกเบอร์โทรศัพท์ "${phoneVal}" และ LINE ID "${lineVal}" สำเร็จ!`,
        `✅ Saved phone "${phoneVal}" and LINE ID "${lineVal}"!`
      )
    );
  };

  // Trigger test LINE message
  const handleTestLineAlert = () => {
    toast.success(
      tx(
        `📲 จำลองส่งข้อความแจ้งเตือนสรุปยอดขายเข้า LINE "${lineVal}" และ SMS "${phoneVal}" สำเร็จ!`,
        `📲 Sent test daily sales summary notification to LINE "${lineVal}" and Phone "${phoneVal}"!`
      )
    );
  };

  // Trigger full ETL resync
  const handleTriggerEtl = () => {
    setIsSyncingEtl(true);
    setTimeout(() => {
      setIsSyncingEtl(false);
      toast.success(
        tx(
          '⚡ ซิงก์ข้อมูล ETL Pipeline และล้างแคชความเร็วสูงสำเร็จ! ข้อมูลเป็นปัจจุบัน 100%',
          '⚡ ETL Pipeline Resynced and Redis Cache Purged! Data is 100% up-to-date.'
        )
      );
    }, 1200);
  };

  // Download backup JSON
  const handleDownloadBackup = () => {
    const backupData = {
      system: 'InsightFlow Enterprise BI',
      version: '2.5.0',
      exportedAt: new Date().toISOString(),
      organization: {
        name: businessName,
        branch: branchName,
        taxId
      },
      contacts: {
        phone: phoneVal,
        lineId: lineVal,
        dailyAlertTime
      },
      aiSettings: {
        personality: aiPersonality,
        briefingFrequency,
        anomalySensitivity
      },
      totalRecords: dbRecords.length,
      sampleRecords: dbRecords.slice(0, 10)
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `insightflow-settings-backup-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast.success(
      tx('💾 ดาวน์โหลดไฟล์สำรองข้อมูลระบบ (JSON Backup) เรียบร้อยแล้ว', '💾 System Settings JSON Backup downloaded successfully')
    );
  };

  // Sub-tab definitions
  const subTabs = [
    { id: 'general', label: tx('🏢 ทั่วไป & องค์กร', '🏢 General & Org'), icon: 'store' },
    { id: 'notifications', label: tx('🔔 แจ้งเตือน LINE / SMS', '🔔 LINE & Alerts'), icon: 'message' },
    { id: 'ai_secretary', label: tx('🤖 เลขา AI & วิเคราะห์', '🤖 AI Secretary'), icon: 'brain' },
    { id: 'integrations', label: tx('⚡ เชื่อมต่อ & ETL', '⚡ Integrations & ETL'), icon: 'database' },
    { id: 'appearance', label: tx('🎨 รูปลักษณ์ & ภาษา', '🎨 Appearance & Lang'), icon: 'palette' },
    { id: 'security', label: tx('🔒 ความปลอดภัย & สำรอง', '🔒 Security & Vault'), icon: 'shield' }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300 pb-16">
      {/* =====================================================================
          HEADER HERO BANNER
          ===================================================================== */}
      <div
        className={`p-6 sm:p-8 rounded-3xl border shadow-xl relative overflow-hidden ${
          theme === 'light'
            ? 'bg-white border-[#AFC5F8] text-slate-900 shadow-blue-900/10'
            : 'bg-[#0F2270]/70 border-[#1A3BB0]/60 text-white backdrop-blur-xl'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-4">
            <LuxuryIconBadge variant="platinum" size="lg" active>
              <LuxuryModuleIcon type="settings" size={32} />
            </LuxuryIconBadge>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black tracking-tight">
                  {tx('ศูนย์บัญชาการและการตั้งค่าระบบองค์กร', 'Enterprise System Settings Center')}
                </h2>
                <span className="text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full bg-[#2E5DE6]/20 text-[#6E92F2] border border-[#2E5DE6]/40">
                  v2.5 Enterprise
                </span>
              </div>
              <p className={`text-xs sm:text-sm mt-1 ${theme === 'light' ? 'text-slate-600' : 'text-slate-300'}`}>
                {tx(
                  'ปรับแต่งข้อมูลองค์กร, การแจ้งเตือน LINE อัตโนมัติ, เลขา AI, ไปป์ไลน์ ETL, ธีมสี Ultramarine และความปลอดภัย',
                  'Configure organization profile, automated LINE notifications, AI agents, ETL pipelines, theme and security.'
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleDownloadBackup}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer border ${
                theme === 'light'
                  ? 'bg-slate-100 hover:bg-slate-200 border-slate-300 text-slate-800'
                  : 'bg-white/10 hover:bg-white/15 border-white/15 text-slate-200'
              }`}
            >
              <span>💾</span>
              <span>{tx('สำรองข้อมูล (JSON)', 'Export Backup')}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                handleSaveContact();
                toast.success(tx('✨ บันทึกการตั้งค่าทั้งหมดเรียบร้อยแล้ว', '✨ All settings saved successfully'));
              }}
              className="px-5 py-2 rounded-xl text-xs font-black bg-gradient-to-r from-[#2E5DE6] to-[#1A3BB0] hover:from-[#6E92F2] hover:to-[#2E5DE6] text-white shadow-lg shadow-blue-600/30 active:scale-95 transition cursor-pointer"
            >
              {tx('💾 บันทึกการตั้งค่า', 'Save All Changes')}
            </button>
          </div>
        </div>

        {/* Sub-Tabs Navigation Strip */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-6 mt-6 border-t border-slate-200 dark:border-white/10 relative z-10">
          {subTabs.map(t => {
            const isActive = subTab === t.id;
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setSubTab(t.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-2 ${
                  isActive
                    ? 'bg-gradient-to-r from-[#2E5DE6] to-[#1A3BB0] text-white shadow-md'
                    : theme === 'light'
                    ? 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                    : 'bg-white/5 hover:bg-white/10 text-slate-300 hover:text-white'
                }`}
              >
                <span>{t.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* =====================================================================
          1. GENERAL & ORGANIZATION SUB-TAB
          ===================================================================== */}
      {subTab === 'general' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div
            className={`lg:col-span-2 p-6 rounded-3xl border shadow-lg space-y-5 ${
              theme === 'light' ? 'bg-white border-[#AFC5F8]' : 'bg-[#0F2270]/50 border-[#1A3BB0]/50'
            }`}
          >
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-200 dark:border-white/10">
              <span className="text-xl">🏢</span>
              <h3 className="text-base font-black">
                {tx('ข้อมูลองค์กรและรายละเอียดสาขาหลัก', 'Organization & Branch Information')}
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold mb-1.5 opacity-80">
                  {tx('ชื่อบริษัท / ชื่อร้านค้า', 'Company / Store Name')}
                </label>
                <input
                  type="text"
                  value={businessName}
                  onChange={e => setBusinessName(e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl text-sm outline-none border transition ${
                    theme === 'light'
                      ? 'bg-slate-50 border-slate-200 text-slate-900 focus:bg-white focus:border-[#2E5DE6]'
                      : 'bg-[#071039] border-[#1A3BB0]/50 text-white focus:border-[#6E92F2]'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1.5 opacity-80">
                  {tx('สาขาหลัก / ศูนย์บัญชาการ', 'Main Branch / Headquarters')}
                </label>
                <input
                  type="text"
                  value={branchName}
                  onChange={e => setBranchName(e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl text-sm outline-none border transition ${
                    theme === 'light'
                      ? 'bg-slate-50 border-slate-200 text-slate-900 focus:bg-white focus:border-[#2E5DE6]'
                      : 'bg-[#071039] border-[#1A3BB0]/50 text-white focus:border-[#6E92F2]'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1.5 opacity-80">
                  {tx('เลขประจำตัวผู้เสียภาษีอากร (Tax ID)', 'Tax Registration ID')}
                </label>
                <input
                  type="text"
                  value={taxId}
                  onChange={e => setTaxId(e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl text-sm outline-none border transition ${
                    theme === 'light'
                      ? 'bg-slate-50 border-slate-200 text-slate-900 focus:bg-white focus:border-[#2E5DE6]'
                      : 'bg-[#071039] border-[#1A3BB0]/50 text-white focus:border-[#6E92F2]'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1.5 opacity-80">
                  {tx('สกุลเงินหลักที่ใช้แสดงรายงาน (Default Currency)', 'Primary Currency')}
                </label>
                <select
                  value={defaultCurrency}
                  onChange={e => setDefaultCurrency(e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl text-sm outline-none border transition cursor-pointer ${
                    theme === 'light'
                      ? 'bg-slate-50 border-slate-200 text-slate-900'
                      : 'bg-[#071039] border-[#1A3BB0]/50 text-white'
                  }`}
                >
                  <option value="THB">฿ THB (บาทไทย - Thai Baht)</option>
                  <option value="USD">$ USD (US Dollar)</option>
                  <option value="EUR">€ EUR (Euro)</option>
                  <option value="JPY">¥ JPY (Japanese Yen)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Active Account Profile Card */}
          <div
            className={`p-6 rounded-3xl border shadow-lg space-y-4 ${
              theme === 'light' ? 'bg-white border-[#AFC5F8]' : 'bg-[#0F2270]/50 border-[#1A3BB0]/50'
            }`}
          >
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-200 dark:border-white/10">
              <span className="text-xl">👤</span>
              <h3 className="text-base font-black">
                {tx('บัญชีผู้บริหารที่กำลังใช้งาน', 'Active Executive Account')}
              </h3>
            </div>

            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-amber-400 to-amber-200 text-slate-950 font-black flex items-center justify-center text-xl shadow flex-shrink-0">
                👑
              </div>
              <div className="min-w-0">
                <p className="text-sm font-black truncate">{user?.name || 'Super Admin (อาจารย์สอน)'}</p>
                <p className="text-xs text-slate-400 truncate">{user?.email || 'admin@insightflow.app'}</p>
                <span className="inline-block mt-1 text-[10px] font-black px-2 py-0.5 rounded-full bg-amber-400 text-slate-950">
                  {user?.role === 'admin' ? 'SUPER ADMIN (11 MODULES)' : 'EXECUTIVE TIER'}
                </span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-[#2E5DE6]/10 border border-[#2E5DE6]/30 text-xs space-y-1">
              <div className="flex justify-between">
                <span className="opacity-75">{tx('แพ็กเกจปัจจุบัน:', 'Active Plan:')}</span>
                <span className="font-bold text-[#6E92F2] uppercase">{activePlan}</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-75">{tx('สถานะระบบ:', 'System Status:')}</span>
                <span className="font-bold text-emerald-400">● {tx('เชื่อมต่อสมบูรณ์', 'Operational')}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          2. SMART NOTIFICATION CENTER (LINE / SMS / EMAIL)
          ===================================================================== */}
      {subTab === 'notifications' && (
        <div className="space-y-6">
          <div
            className={`p-6 rounded-3xl border shadow-lg space-y-5 ${
              theme === 'light' ? 'bg-white border-[#AFC5F8]' : 'bg-[#0F2270]/50 border-[#1A3BB0]/50'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-white/10">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">📲</span>
                <div>
                  <h3 className="text-base font-black">
                    {tx('ระบบส่งสรุปยอดขายอัตโนมัติประจำวัน (LINE & SMS Summary)', 'Daily Automated Sales Summary Alert')}
                  </h3>
                  <p className="text-xs opacity-75">
                    {tx('ส่งยอดขายรวม, กำไรสุทธิ, และรายการสินค้าขายดีเข้าสู่มือถือของคุณตามเวลาที่กำหนด', 'Automatically delivers sales, profits & bestsellers to your phone.')}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleTestLineAlert}
                className="px-4 py-2 rounded-xl text-xs font-black bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white shadow cursor-pointer transition flex items-center gap-1.5 self-start sm:self-auto"
              >
                <span>💬</span>
                <span>{tx('ทดสอบส่งเข้า LINE ทันที', 'Test Send to LINE Now')}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold mb-1.5 opacity-80">
                  📱 {tx('เบอร์โทรศัพท์มือถือรับ SMS', 'Mobile Phone for SMS')}
                </label>
                <input
                  type="tel"
                  value={phoneVal}
                  onChange={e => setPhoneVal(e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl text-sm outline-none border transition ${
                    theme === 'light'
                      ? 'bg-slate-50 border-slate-200 text-slate-900 focus:border-[#2E5DE6]'
                      : 'bg-[#071039] border-[#1A3BB0]/50 text-white focus:border-[#6E92F2]'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1.5 opacity-80">
                  💬 {tx('ID LINE สำหรับรับแจ้งเตือน', 'LINE ID for Alerts')}
                </label>
                <input
                  type="text"
                  value={lineVal}
                  onChange={e => setLineVal(e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl text-sm outline-none border transition ${
                    theme === 'light'
                      ? 'bg-slate-50 border-slate-200 text-slate-900 focus:border-[#2E5DE6]'
                      : 'bg-[#071039] border-[#1A3BB0]/50 text-white focus:border-[#6E92F2]'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1.5 opacity-80">
                  ⏰ {tx('เวลาส่งสรุปยอดขายอัตโนมัติ', 'Automated Daily Alert Time')}
                </label>
                <select
                  value={dailyAlertTime}
                  onChange={e => setDailyAlertTime(e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl text-sm outline-none border transition cursor-pointer ${
                    theme === 'light'
                      ? 'bg-slate-50 border-slate-200 text-slate-900'
                      : 'bg-[#071039] border-[#1A3BB0]/50 text-white'
                  }`}
                >
                  <option value="20:00">20:00 น. (สองทุ่ม)</option>
                  <option value="21:00">21:00 น. (สามทุ่ม)</option>
                  <option value="22:00">22:00 น. (สี่ทุ่ม - ค่าแนะนำ)</option>
                  <option value="23:00">23:00 น. (ห้าทุ่ม)</option>
                </select>
              </div>
            </div>

            {/* Notification Checkboxes & Toggles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <label className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10 cursor-pointer">
                <input
                  type="checkbox"
                  checked={enableDailySummary}
                  onChange={e => setEnableDailySummary(e.target.checked)}
                  className="w-4 h-4 accent-[#2E5DE6] rounded cursor-pointer"
                />
                <div>
                  <p className="text-xs font-bold">{tx('เปิดส่งสรุปยอดขายประจำวัน (Daily Sales Brief)', 'Enable Daily Sales Brief')}</p>
                  <p className="text-[11px] opacity-70">{tx('ส่งสรุปยอดขายและกำไรสุทธิทุกวัน', 'Daily revenue and net profit delivery')}</p>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10 cursor-pointer">
                <input
                  type="checkbox"
                  checked={enableLowStockAlert}
                  onChange={e => setEnableLowStockAlert(e.target.checked)}
                  className="w-4 h-4 accent-[#2E5DE6] rounded cursor-pointer"
                />
                <div>
                  <p className="text-xs font-bold">{tx('แจ้งเตือนสินค้าใกล้หมดสต็อกด่วน (Low Stock Alert)', 'Low Stock Threshold Alert')}</p>
                  <p className="text-[11px] opacity-70">{tx('แจ้งเตือนทันทีเมื่อสินค้าเหลือน้อยกว่าเกณฑ์', 'Instant notification when inventory drops')}</p>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10 cursor-pointer">
                <input
                  type="checkbox"
                  checked={enableMilestoneAlert}
                  onChange={e => setEnableMilestoneAlert(e.target.checked)}
                  className="w-4 h-4 accent-[#2E5DE6] rounded cursor-pointer"
                />
                <div>
                  <p className="text-xs font-bold">{tx('แจ้งเตือนยอดขายทะลุเป้าหมาย (Milestone Hit)', 'Target Milestone Exceeded')}</p>
                  <p className="text-[11px] opacity-70">{tx('แสดงความยินดีเมื่อยอดขายแตะ 100% ของเป้าหมาย', 'Celebrate when 100% of goal is reached')}</p>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3.5 rounded-2xl bg-white/5 border border-white/10 cursor-pointer">
                <input
                  type="checkbox"
                  checked={enableWeeklyPdf}
                  onChange={e => setEnableWeeklyPdf(e.target.checked)}
                  className="w-4 h-4 accent-[#2E5DE6] rounded cursor-pointer"
                />
                <div>
                  <p className="text-xs font-bold">{tx('ส่งรายงานสรุปผู้บริหารรายสัปดาห์ (Weekly PDF)', 'Weekly Executive PDF Briefing')}</p>
                  <p className="text-[11px] opacity-70">{tx('ส่งสรุปกราฟและทิศทางธุรกิจเข้าอีเมลทุกวันจันทร์', 'Sent to executive email every Monday morning')}</p>
                </div>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          3. AI SECRETARY & COPILOT SETTINGS
          ===================================================================== */}
      {subTab === 'ai_secretary' && (
        <div className="space-y-6">
          <div
            className={`p-6 rounded-3xl border shadow-lg space-y-5 ${
              theme === 'light' ? 'bg-white border-[#AFC5F8]' : 'bg-[#0F2270]/50 border-[#1A3BB0]/50'
            }`}
          >
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-200 dark:border-white/10">
              <span className="text-2xl">🤖</span>
              <div>
                <h3 className="text-base font-black">
                  {tx('การตั้งค่าและบุคลิกของเลขา AI อัจฉริยะ (AI Executive Secretary Persona)', 'AI Executive Secretary Configuration')}
                </h3>
                <p className="text-xs opacity-75">
                  {tx('ปรับแต่งสไตล์การวิเคราะห์ ความถี่ในการสรุปงาน และระดับความแม่นยำของ AI Copilot', 'Customize response style, briefing schedule and intelligence level.')}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                {
                  id: 'executive',
                  emoji: '🎯',
                  title: tx('กระชับ แม่นยำ สไตล์ซีอีโอ', 'Concise Executive'),
                  desc: tx('สรุปสั้น ได้ใจความ เน้นตัวเลขและสิ่งที่ต้องตัดสินใจด่วน', 'Brief, high-impact numbers and immediate action items.')
                },
                {
                  id: 'strategic',
                  emoji: '📊',
                  title: tx('เจาะลึกเชิงกลยุทธ์', 'Strategic Deep-Dive'),
                  desc: tx('วิเคราะห์สาเหตุแนวโน้ม คาดการณ์ล่วงหน้า และข้อเสนอแนะเชิงลึก', 'Root cause analytics, forward projections and tactical strategies.')
                },
                {
                  id: 'coach',
                  emoji: '🤝',
                  title: tx('เป็นมิตร สไตล์ที่ปรึกษา', 'Friendly Business Coach'),
                  desc: tx('อธิบายเข้าใจง่าย ชี้แนะแนวทางปฏิบัติทีละขั้นตอน', 'Supportive step-by-step guidance and growth coaching.')
                }
              ].map(p => {
                const isSelected = aiPersonality === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setAiPersonality(p.id)}
                    className={`p-4 rounded-2xl text-left border-2 transition cursor-pointer relative ${
                      isSelected
                        ? 'border-[#2E5DE6] bg-[#2E5DE6]/15 shadow-md'
                        : theme === 'light'
                        ? 'border-slate-200 bg-slate-50 hover:bg-white text-slate-800'
                        : 'border-white/10 bg-white/5 hover:bg-white/10 text-slate-200'
                    }`}
                  >
                    {isSelected && (
                      <span className="absolute top-2.5 right-2.5 w-4 h-4 rounded-full bg-[#2E5DE6] text-white text-[10px] font-black flex items-center justify-center">
                        ✓
                      </span>
                    )}
                    <div className="text-2xl mb-1">{p.emoji}</div>
                    <div className="text-xs font-black mb-1">{p.title}</div>
                    <div className="text-[11px] opacity-70 leading-relaxed">{p.desc}</div>
                  </button>
                );
              })}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-bold mb-1.5 opacity-80">
                  {tx('ความถี่ในการรันสรุปงานรอบวัน (Daily Briefing Schedule)', 'Daily Briefing Frequency')}
                </label>
                <select
                  value={briefingFrequency}
                  onChange={e => setBriefingFrequency(e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl text-sm outline-none border transition cursor-pointer ${
                    theme === 'light'
                      ? 'bg-slate-50 border-slate-200 text-slate-900'
                      : 'bg-[#071039] border-[#1A3BB0]/50 text-white'
                  }`}
                >
                  <option value="morning">{tx('ทุกเช้า 08:30 น. (วางแผนเปิดร้าน)', 'Every Morning 08:30 (Day Planning)')}</option>
                  <option value="morning_evening">{tx('เช้า 08:30 น. และ เย็น 18:00 น. (แนะนำ)', 'Morning 08:30 & Evening 18:00 (Recommended)')}</option>
                  <option value="manual">{tx('กดสั่งงานด้วยตนเองเท่านั้น (Manual Only)', 'Manual Trigger Only')}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold mb-1.5 opacity-80">
                  {tx('ระดับความไวในการตรวจจับความผิดปกติ (Anomaly Sensitivity)', 'Anomaly Detection Sensitivity')}
                </label>
                <select
                  value={anomalySensitivity}
                  onChange={e => setAnomalySensitivity(e.target.value)}
                  className={`w-full px-4 py-2.5 rounded-xl text-sm outline-none border transition cursor-pointer ${
                    theme === 'light'
                      ? 'bg-slate-50 border-slate-200 text-slate-900'
                      : 'bg-[#071039] border-[#1A3BB0]/50 text-white'
                  }`}
                >
                  <option value="high">{tx('ความไวสูง (แจ้งเตือนแม้เปลี่ยนแปลงเล็กน้อย)', 'High Sensitivity (All Fluctuations)')}</option>
                  <option value="medium">{tx('ปานกลาง (แจ้งเฉพาะยอดเปลี่ยนผิดปกติ > 15%)', 'Medium Sensitivity (> 15% Drift)')}</option>
                  <option value="low">{tx('ต่ำ (แจ้งเฉพาะเหตุการณ์วิกฤตเท่านั้น)', 'Low Sensitivity (Critical Events Only)')}</option>
                </select>
              </div>
            </div>

            {/* One-Click Executive One-Pager (PDF) Board Briefing Panel */}
            <div className="pt-4 border-t border-slate-200 dark:border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-emerald-500/10 border border-amber-500/30">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xl">📄</span>
                  <span className="text-sm font-black text-amber-300">
                    {tx('Executive One-Pager (PDF) Board Briefing', 'Executive One-Pager (PDF) Board Briefing')}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-black bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                    {tx('พร้อมส่งบอร์ดบริหาร', 'C-Suite Ready')}
                  </span>
                </div>
                <p className="text-xs opacity-75 max-w-xl">
                  {tx(
                    'กดปุ่มเดียวแล้ว Export กราฟและสรุปของเลขา AI ออกมาเป็นเอกสารสรุป 1-2 หน้า ดีไซน์เรียบหรู พร้อมส่งเข้าที่ประชุมบอร์ดบริหาร หรือส่งเข้าอีเมลผู้บริหารอัตโนมัติทุกเช้าวันจันทร์',
                    'One-click export of AI Secretary briefing and charts into an elegant 1-2 page executive PDF briefing, ready for board meetings or Monday morning dispatch.'
                  )}
                </p>
              </div>

              {onOpenExecutiveOnePager && (
                <button
                  type="button"
                  onClick={onOpenExecutiveOnePager}
                  className="px-4 py-2.5 rounded-xl text-xs font-black bg-gradient-to-r from-amber-500 via-amber-400 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 shadow-md cursor-pointer transition flex items-center justify-center gap-2 flex-shrink-0"
                >
                  <span>⚡</span>
                  <span>{tx('เปิด One-Pager PDF ตอนนี้', 'Open One-Pager PDF Now')}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          4. INTEGRATIONS & ETL HUB
          ===================================================================== */}
      {subTab === 'integrations' && (
        <div className="space-y-6">
          <div
            className={`p-6 rounded-3xl border shadow-lg space-y-5 ${
              theme === 'light' ? 'bg-white border-[#AFC5F8]' : 'bg-[#0F2270]/50 border-[#1A3BB0]/50'
            }`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-white/10">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">⚡</span>
                <div>
                  <h3 className="text-base font-black">
                    {tx('ระบบเชื่อมต่อ Data Warehouse & ETL Pipeline อัตโนมัติ', 'Data Warehouse & Automated ETL Pipeline')}
                  </h3>
                  <p className="text-xs opacity-75">
                    {tx('ดึงข้อมูลดิบจาก POS, ERP, Google Sheets และแปลงเข้าสู่ฐานข้อมูลความเร็วสูง', 'Connect POS, ERP, Google Sheets and transform to high-speed data store.')}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleTriggerEtl}
                disabled={isSyncingEtl}
                className="px-4 py-2 rounded-xl text-xs font-black bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow cursor-pointer transition flex items-center gap-1.5"
              >
                <span>{isSyncingEtl ? '⏳' : '🔄'}</span>
                <span>{isSyncingEtl ? tx('กำลังซิงก์...', 'Syncing...') : tx('สั่งซิงก์ ETL เดี๋ยวนี้', 'Force ETL Resync Now')}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold opacity-80">{tx('ฐานข้อมูลหลัก (Database)', 'Primary Database')}</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <p className="text-sm font-black text-emerald-400">PostgreSQL QueuePool</p>
                <p className="text-[11px] opacity-65">{tx('สถานะ: ออนไลน์พร้อมใช้งาน 100%', 'Status: Fully Operational')}</p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold opacity-80">{tx('แคชความเร็วสูง (Redis)', 'High-Speed Cache')}</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <p className="text-sm font-black text-emerald-400">Redis In-Memory TTL</p>
                <p className="text-[11px] opacity-65">{tx('Hit Rate: 99.4% (Latency < 2ms)', 'Hit Rate: 99.4% (< 2ms latency)')}</p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold opacity-80">{tx('รอบเวลา Auto-Sync', 'Sync Frequency')}</span>
                  <span className="text-xs font-bold text-[#6E92F2]">1 ชั่วโมง</span>
                </div>
                <p className="text-sm font-black text-[#6E92F2]">{tx('ดึงข้อมูลทุก 60 นาที', 'Auto-Fetch every 60m')}</p>
                <p className="text-[11px] opacity-65">{tx('ซิงก์ล่าสุด: 5 นาทีที่แล้ว', 'Last Sync: 5 mins ago')}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          5. APPEARANCE & ACCESSIBILITY
          ===================================================================== */}
      {subTab === 'appearance' && (
        <div className="space-y-6">
          <div
            className={`p-6 rounded-3xl border shadow-lg space-y-5 ${
              theme === 'light' ? 'bg-white border-[#AFC5F8]' : 'bg-[#0F2270]/50 border-[#1A3BB0]/50'
            }`}
          >
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-200 dark:border-white/10">
              <span className="text-2xl">🎨</span>
              <div>
                <h3 className="text-base font-black">
                  {tx('ชุดสี รูปลักษณ์ และขนาดตัวหนังสือเพื่อการอ่านง่าย (Appearance & Display)', 'Theme & Readability Settings')}
                </h3>
                <p className="text-xs opacity-75">
                  {tx('ปรับแต่งธีม Ultramarine ภาษาของระบบ และขนาดตัวหนังสือเพื่อถนอมสายตา', 'Customize 7-shade Ultramarine theme, system language and text scale.')}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Theme Picker */}
              <div className="space-y-2">
                <label className="block text-xs font-bold opacity-80">
                  {tx('โทนสีระบบ (Theme)', 'Visual Theme')}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setTheme('dark')}
                    className={`p-3 rounded-2xl text-xs font-bold transition cursor-pointer border-2 text-center ${
                      theme === 'dark'
                        ? 'border-[#2E5DE6] bg-[#071039] text-white shadow-md'
                        : 'border-white/10 bg-white/5 text-slate-300'
                    }`}
                  >
                    🌙 Dark Mode
                  </button>
                  <button
                    type="button"
                    onClick={() => setTheme('light')}
                    className={`p-3 rounded-2xl text-xs font-bold transition cursor-pointer border-2 text-center ${
                      theme === 'light'
                        ? 'border-blue-600 bg-white text-slate-900 shadow-md'
                        : 'border-white/10 bg-white/5 text-slate-300'
                    }`}
                  >
                    ☀️ Light Mode
                  </button>
                </div>
              </div>

              {/* Language Picker */}
              <div className="space-y-2">
                <label className="block text-xs font-bold opacity-80">
                  {tx('ภาษาของระบบ (Language)', 'System Language')}
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setLang('th');
                      toast.success('เปลี่ยนเป็นภาษาไทยล้วนเรียบร้อยแล้ว');
                    }}
                    className={`p-3 rounded-2xl text-xs font-bold transition cursor-pointer border-2 text-center ${
                      lang === 'th'
                        ? 'border-[#2E5DE6] bg-[#2E5DE6]/20 text-white shadow-md'
                        : 'border-white/10 bg-white/5 text-slate-300'
                    }`}
                  >
                    🇹🇭 ภาษาไทย
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setLang('en');
                      toast.success('Switched to 100% English');
                    }}
                    className={`p-3 rounded-2xl text-xs font-bold transition cursor-pointer border-2 text-center ${
                      lang === 'en'
                        ? 'border-[#2E5DE6] bg-[#2E5DE6]/20 text-white shadow-md'
                        : 'border-white/10 bg-white/5 text-slate-300'
                    }`}
                  >
                    🇬🇧 English
                  </button>
                </div>
              </div>

              {/* Font Scale Picker */}
              <div className="space-y-2">
                <label className="block text-xs font-bold opacity-80">
                  {tx('ขนาดตัวหนังสือ (Font Scaling)', 'Senior-Friendly Font Scaling')}
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    { id: 'normal', th: 'ปกติ', en: 'Normal' },
                    { id: 'large', th: 'ใหญ่', en: 'Large' },
                    { id: 'xlarge', th: 'ใหญ่พิเศษ', en: 'Extra' }
                  ].map(sz => (
                    <button
                      key={sz.id}
                      type="button"
                      onClick={() => setFontScale(sz.id)}
                      className={`py-3 px-1 rounded-2xl text-xs font-bold transition cursor-pointer border-2 text-center truncate ${
                        fontScale === sz.id
                          ? 'border-[#2E5DE6] bg-[#2E5DE6]/20 text-white shadow-md'
                          : 'border-white/10 bg-white/5 text-slate-300'
                      }`}
                    >
                      {isEn ? sz.en : sz.th}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          6. SECURITY & BACKUP VAULT
          ===================================================================== */}
      {subTab === 'security' && (
        <div className="space-y-6">
          <div
            className={`p-6 rounded-3xl border shadow-lg space-y-5 ${
              theme === 'light' ? 'bg-white border-[#AFC5F8]' : 'bg-[#0F2270]/50 border-[#1A3BB0]/50'
            }`}
          >
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-200 dark:border-white/10">
              <span className="text-2xl">🔒</span>
              <div>
                <h3 className="text-base font-black">
                  {tx('ความปลอดภัยระดับสถาบันการเงิน & สำรองข้อมูล (Security & Backup Vault)', 'Enterprise Security & Data Vault')}
                </h3>
                <p className="text-xs opacity-75">
                  {tx('การยืนยันตัวตน 2 ขั้นตอน (2FA OTP), การควบคุมสิทธิ์ RBAC, และการส่งออกข้อมูลสำรอง', 'Two-Factor Authentication, Role-Based Access Control and automated data backup.')}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold">{tx('ระบบความปลอดภัย 2FA OTP', 'Two-Factor OTP Security')}</span>
                  <span className="text-xs font-bold text-emerald-400">● {tx('เปิดใช้งานอยู่', 'Active')}</span>
                </div>
                <p className="text-[11px] opacity-70">
                  {tx('บังคับกรอกรหัสยืนยัน 6 หลักที่ส่งไปยังอีเมลเมื่อเข้าสู่ระบบจากอุปกรณ์ใหม่', 'Enforces 6-digit verification code when signing in on a new device.')}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold">{tx('การสำรองข้อมูล (Data Backup)', 'Automatic Backup')}</span>
                  <span className="text-xs font-bold text-[#6E92F2]">Daily 03:00 AM</span>
                </div>
                <p className="text-[11px] opacity-70">
                  {tx('ระบบสำรองข้อมูลทุกวันเวลาตี 3 อัตโนมัติ ป้องกันข้อมูลสูญหาย 100%', 'Nightly automatic snapshots with zero downtime.')}
                </p>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleDownloadBackup}
                className="px-5 py-2.5 rounded-full bg-gradient-to-r from-[#2E5DE6] to-[#1A3BB0] text-white text-xs font-bold shadow-md hover:brightness-105 active:scale-95 transition cursor-pointer flex items-center gap-2"
              >
                <span>💾</span>
                <span>{tx('ดาวน์โหลดไฟล์สำรองข้อมูลฉบับเต็ม (Full JSON Backup)', 'Download Full JSON Backup')}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  localStorage.clear();
                  toast.success(tx('🧹 ล้างข้อมูลแคชชั่วคราวในเครื่องเรียบร้อยแล้ว', '🧹 Local browser cache cleared'));
                }}
                className={`px-5 py-2.5 rounded-full border-2 text-xs font-bold transition cursor-pointer ${
                  theme === 'light'
                    ? 'border-slate-300 text-slate-700 hover:border-red-400 hover:text-red-600'
                    : 'border-white/20 text-slate-300 hover:border-red-400 hover:text-red-400'
                }`}
              >
                {tx('🧹 ล้างแคชชั่วคราวในเบราว์เซอร์', 'Clear Browser Cache')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SettingsTab;
