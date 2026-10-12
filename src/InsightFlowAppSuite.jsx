import React, { useState, useEffect } from 'react';

export function InsightFlowAppModal({
  isOpen,
  onClose,
  user,
  activeTab,
  setActiveTab,
  overviewRevenue = 0,
  totalIncome,
  totalExpense,
  netBalance,
  totalActiveRecords,
  connectedConversionRate,
  connectedLatencyMs,
  connectedModelAccuracy,
  connectedThroughput,
  connectedActiveNodes,
  aiSummary,
  fetchAISummary,
  isLoadingSummary,
  cashFlowRecords,
  posProducts,
  totalStockUnits,
  totalInventoryValuation,
  aiRestockData,
  handleApplyAIRestock,
  myUploadedFiles,
  handleViewUploadedFile,
  handleDeleteUploadedFile,
  isDeletingFileId,
  overviewFileInputRef,
  fileInputRef,
  stockFileInputRef,
  syncUnifiedSystemState,
  lastSyncedAt,
  onQuickAddCashflow,
  deferredPrompt,
  onTriggerInstall,
  isStandalonePWA
}) {
  const [mobileTab, setMobileTab] = useState(activeTab || 'overview');
  const [deviceMode, setDeviceMode] = useState('iphone'); // 'iphone' | 'ipad'
  const [currentTime, setCurrentTime] = useState('09:41');
  const [quickTitle, setQuickTitle] = useState('');
  const [quickAmount, setQuickAmount] = useState('');
  const [quickType, setQuickType] = useState('income');
  const [isSubmittingQuick, setIsSubmittingQuick] = useState(false);

  useEffect(() => {
    if (['overview', 'live', 'insights', 'cashflow', 'inventory'].includes(activeTab)) {
      setMobileTab(activeTab);
    }
  }, [activeTab]);

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit', hour12: false })
      );
    };
    updateClock();
    const timer = setInterval(updateClock, 15000);
    return () => clearInterval(timer);
  }, []);

  if (!isOpen) return null;

  const handleSelectMobileTab = (tabId) => {
    setMobileTab(tabId);
    if (['overview', 'live', 'insights', 'cashflow', 'inventory'].includes(tabId)) {
      setActiveTab(tabId);
    }
  };

  const handleQuickTxnSubmit = async (e) => {
    e.preventDefault();
    if (!quickTitle.trim() || !quickAmount) return;
    setIsSubmittingQuick(true);
    try {
      await onQuickAddCashflow({
        title: quickTitle.trim(),
        amount: parseFloat(quickAmount),
        type: quickType,
        category: quickType === 'income' ? 'รายรับจากการขาย (Sales)' : 'ค่าใช้จ่ายดำเนินงาน (OPEX)'
      });
      setQuickTitle('');
      setQuickAmount('');
    } finally {
      setIsSubmittingQuick(false);
    }
  };

  const launchStandaloneWindow = (mode = 'mobile') => {
    const width = mode === 'mobile' ? 430 : 1280;
    const height = mode === 'mobile' ? 880 : 820;
    const left = Math.max(0, Math.round((window.screen.width - width) / 2));
    const top = Math.max(0, Math.round((window.screen.height - height) / 2));
    window.open(
      `${window.location.origin}/?mode=app&tab=${mobileTab}`,
      `InsightFlow_${mode}_App`,
      `width=${width},height=${height},left=${left},top=${top},menubar=no,toolbar=no,location=no,status=no,resizable=yes,scrollbars=yes`
    );
  };

  const recommendations = aiRestockData?.restock_recommendations || [];

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-xl flex items-center justify-center z-50 p-3 sm:p-6 animate-in fade-in duration-200 overflow-y-auto">
      <div className="bg-[#050916] border border-amber-400/35 rounded-[2.25rem] w-full max-w-6xl p-5 sm:p-8 shadow-[0_30px_100px_rgba(0,0,0,0.95)] relative overflow-hidden my-auto max-h-[94vh] flex flex-col lg:flex-row gap-8">
        {/* Luxury Top Accent Line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-400 via-sky-400 to-emerald-400" />
        <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-amber-400/10 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-sky-500/10 blur-3xl pointer-events-none" />

        <button
          onClick={onClose}
          className="absolute top-5 right-5 z-20 w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 text-slate-300 hover:text-white flex items-center justify-center transition text-sm font-bold"
        >
          ✕
        </button>

        {/* LEFT COLUMN: INTERACTIVE MOBILE / TABLET APP SIMULATOR */}
        <div className="flex-1 flex flex-col items-center justify-center min-h-0">
          {/* Device Frame Switcher */}
          <div className="flex items-center gap-2 mb-4 bg-[#0b1329] p-1.5 rounded-2xl border border-white/10">
            <button
              onClick={() => setDeviceMode('iphone')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition flex items-center gap-1.5 ${
                deviceMode === 'iphone'
                  ? 'bg-gradient-to-r from-amber-400 to-amber-300 text-slate-950 shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>📱 iPhone 16 Pro App</span>
            </button>
            <button
              onClick={() => setDeviceMode('ipad')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-black transition flex items-center gap-1.5 ${
                deviceMode === 'ipad'
                  ? 'bg-gradient-to-r from-amber-400 to-amber-300 text-slate-950 shadow'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>📟 iPad Executive App</span>
            </button>
          </div>

          {/* Titanium Device Frame */}
          <div
            className={`relative rounded-[2.8rem] border-[6px] border-[#262f45] bg-[#030712] shadow-[0_25px_70px_rgba(0,0,0,0.9),0_0_35px_rgba(251,191,36,0.14)] overflow-hidden flex flex-col transition-all duration-300 ${
              deviceMode === 'iphone' ? 'w-full max-w-[380px] h-[700px]' : 'w-full max-w-[540px] h-[700px]'
            }`}
          >
            {/* iOS Status Bar + Dynamic Island */}
            <div className="px-6 pt-3 pb-2 bg-[#040814] flex items-center justify-between text-[11px] font-bold text-white relative z-20 border-b border-white/5">
              <span className="font-mono">{currentTime}</span>
              <div className="w-24 h-5 bg-black rounded-full border border-white/10 flex items-center justify-between px-2.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[8px] font-mono text-amber-300 tracking-wider">LIVE AI</span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-slate-300 font-mono">
                <span>5G</span>
                <span>100%</span>
              </div>
            </div>

            {/* App Top Hero Banner (3D Victory Horizon Theme) */}
            <div className="relative px-4 pt-4 pb-3.5 border-b border-amber-400/25 overflow-hidden flex-shrink-0">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-45"
                style={{ backgroundImage: "url('/hero-victory-bg.jpg')" }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#040814]/95 via-[#060f24]/85 to-[#040814]/70" />
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <img
                    src="/app-icon.svg"
                    alt="InsightFlow App"
                    className="w-9 h-9 rounded-xl border border-amber-400/50 shadow-md"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-black text-white tracking-tight">
                        Insight<span className="text-amber-400">Flow</span>
                      </span>
                      <span className="text-[9px] font-black px-1.5 py-0.5 rounded bg-amber-400/20 text-amber-300 border border-amber-400/40">
                        APP
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-300 truncate max-w-[165px]">
                      {user ? user.name || user.email : 'Executive Guest'} • อัปเดต {lastSyncedAt}
                    </p>
                  </div>
                </div>

                {['overview', 'live', 'insights'].includes(mobileTab) ? (
                  <button
                    onClick={syncUnifiedSystemState}
                    className="px-2.5 py-1.5 rounded-xl bg-amber-400/20 hover:bg-amber-400/30 border border-amber-400/40 text-amber-300 text-[10px] font-black transition"
                  >
                    ↻ ซิงค์วิเคราะห์
                  </button>
                ) : (
                  <span className="px-2.5 py-1 rounded-xl bg-emerald-500/15 border border-emerald-500/35 text-emerald-300 text-[10px] font-bold">
                    ● หน้าเดี่ยว
                  </span>
                )}
              </div>
            </div>

            {/* App Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-gradient-to-b from-[#040814] to-[#070e22] text-white">
              {/* 1. MOBILE TAB: OVERVIEW */}
              {mobileTab === 'overview' && (
                <div className="space-y-3.5 animate-in fade-in duration-200">
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-400/20 via-[#0a1329] to-[#050a18] border border-amber-400/40 shadow-lg">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] font-black uppercase tracking-wider text-amber-300">
                        OVERVIEW REVENUE • รายได้ภาพรวม
                      </span>
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                        ● Core Analytics
                      </span>
                    </div>
                    <p className="text-2xl font-black font-mono text-white">
                      ฿ {Number(overviewRevenue || 0).toLocaleString()}
                    </p>
                    <div className="flex items-center justify-between text-[11px] text-slate-300 mt-2 pt-2 border-t border-white/10">
                      <span>Throughput: {connectedThroughput} req/s</span>
                      <span className="text-amber-300 font-bold">
                        {totalActiveRecords.toLocaleString()} รายการวิเคราะห์
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10">
                      <span className="text-[10px] text-slate-400 block">Conversion Rate</span>
                      <span className="text-base font-black text-amber-400 font-mono">
                        {connectedConversionRate}
                      </span>
                    </div>
                    <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10">
                      <span className="text-[10px] text-slate-400 block">ความแม่นยำ AI</span>
                      <span className="text-base font-black text-emerald-400 font-mono">
                        {connectedModelAccuracy}
                      </span>
                    </div>
                    <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10">
                      <span className="text-[10px] text-slate-400 block">Active Nodes</span>
                      <span className="text-base font-black text-sky-300 font-mono">
                        {connectedActiveNodes}
                      </span>
                    </div>
                    <div className="p-3 rounded-2xl bg-white/[0.04] border border-white/10">
                      <span className="text-[10px] text-slate-400 block">ไฟล์ที่อัปโหลด</span>
                      <span className="text-base font-black text-amber-300 font-mono">
                        {myUploadedFiles.length} ไฟล์
                      </span>
                    </div>
                  </div>

                  {/* Quick Actions on Mobile */}
                  <div className="p-3.5 rounded-2xl bg-[#091228] border border-white/10 space-y-2.5">
                    <div className="text-[11px] font-black text-amber-300 flex items-center justify-between">
                      <span>⚡ คำสั่งด่วนบนแอปมือถือ</span>
                      <span className="text-[10px] text-slate-400 font-mono">{connectedLatencyMs} ms</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => overviewFileInputRef?.current?.click()}
                        className="p-2.5 rounded-xl bg-amber-400 text-slate-950 font-black text-[11px] hover:brightness-105 transition text-center"
                      >
                        📤 อัปโหลดไฟล์ภาพรวม
                      </button>
                      <button
                        onClick={() => handleSelectMobileTab('files')}
                        className="p-2.5 rounded-xl bg-sky-500/20 border border-sky-400/40 text-sky-300 font-black text-[11px] hover:bg-sky-500/30 transition text-center"
                      >
                        📂 ดู/ลบไฟล์ ({myUploadedFiles.length})
                      </button>
                    </div>
                  </div>

                  {/* Pipeline Mini Cards */}
                  <div className="space-y-1.5">
                    <p className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                      เมนูหน้าวิเคราะห์หลัก & หน้าเดี่ยว (Standalone)
                    </p>
                    {[
                      { id: 'live', name: 'ทราฟฟิกสด (Live Pulse)', val: `${connectedThroughput} req/s` },
                      { id: 'insights', name: 'บทวิเคราะห์ AI', val: `แม่นยำ ${connectedModelAccuracy}` },
                      { id: 'cashflow', name: 'รายรับ-รายจ่าย (หน้าเดี่ยว)', val: `แยกอิสระ →` },
                      { id: 'inventory', name: 'คลังสินค้า (หน้าเดี่ยว)', val: `แยกอิสระ →` }
                    ].map((row) => (
                      <button
                        key={row.id}
                        onClick={() => handleSelectMobileTab(row.id)}
                        className="w-full p-2.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 flex items-center justify-between text-xs transition"
                      >
                        <span className="font-bold text-slate-200">{row.name}</span>
                        <span className="font-mono font-black text-amber-300">{row.val}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 2. MOBILE TAB: LIVE PULSE */}
              {mobileTab === 'live' && (
                <div className="space-y-3.5 animate-in fade-in duration-200">
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-emerald-500/20 via-[#071526] to-[#040814] border border-emerald-400/40">
                    <span className="text-[10px] font-black text-emerald-300 uppercase tracking-wider">
                      REAL-TIME TELEMETRY • ทราฟฟิกสด
                    </span>
                    <p className="text-2xl font-black font-mono text-white mt-1">
                      {connectedThroughput.toLocaleString()} <span className="text-xs text-emerald-300">req/sec</span>
                    </p>
                    <p className="text-[11px] text-slate-300 mt-1">
                      Latency {connectedLatencyMs} ms • Active Workers: {connectedActiveNodes}/4 Nodes
                    </p>
                  </div>

                  <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10">
                    <p className="text-xs font-black text-amber-300 mb-3">
                      คลื่นสัญญาณการประมวลผล (Gunicorn + Uvicorn Workers)
                    </p>
                    <div className="flex items-end gap-2 h-28 pt-4 px-2">
                      {[55, 72, 64, 88, 78, 94, 100, 84].map((pct, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-1">
                          <div
                            className="w-full rounded-t-lg bg-gradient-to-t from-amber-500/40 via-amber-400 to-emerald-300 transition-all duration-500"
                            style={{ height: `${Math.max(15, totalActiveRecords > 0 ? pct : 12)}%` }}
                          />
                          <span className="text-[9px] font-mono text-slate-400">N{i + 1}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* 3. MOBILE TAB: AI INSIGHTS */}
              {mobileTab === 'insights' && (
                <div className="space-y-3.5 animate-in fade-in duration-200">
                  <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-400/20 via-[#0a1328] to-[#040814] border border-amber-400/40 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-amber-300">✨ บทวิเคราะห์ผู้บริหาร AI</span>
                      <button
                        onClick={fetchAISummary}
                        disabled={isLoadingSummary}
                        className="px-2.5 py-1 rounded-lg bg-amber-400 text-slate-950 font-black text-[10px]"
                      >
                        {isLoadingSummary ? 'กำลังวิเคราะห์...' : 'วิเคราะห์ใหม่'}
                      </button>
                    </div>
                    {typeof aiSummary === 'string' ? (
                      <p className="text-xs text-slate-200 leading-relaxed whitespace-pre-line">
                        {aiSummary}
                      </p>
                    ) : (
                      <div className="space-y-2 text-xs">
                        <div className="p-2.5 rounded-xl bg-black/35 border border-white/10">
                          <span className="text-[10px] font-black text-emerald-300 block mb-0.5">
                            📈 ผลการดำเนินงาน (Performance)
                          </span>
                          <p className="text-slate-200 whitespace-pre-line leading-relaxed">
                            {aiSummary?.performance}
                          </p>
                        </div>
                        <div className="p-2.5 rounded-xl bg-black/35 border border-white/10">
                          <span className="text-[10px] font-black text-rose-300 block mb-0.5">
                            ⚠️ ความเสี่ยงที่ตรวจพบ (Risk Radar)
                          </span>
                          <p className="text-slate-200 whitespace-pre-line leading-relaxed">
                            {aiSummary?.risks}
                          </p>
                        </div>
                        <div className="p-2.5 rounded-xl bg-black/35 border border-white/10">
                          <span className="text-[10px] font-black text-amber-300 block mb-0.5">
                            🎯 แผนปฏิบัติการแนะนำ (Action Plan)
                          </span>
                          <p className="text-slate-200 whitespace-pre-line leading-relaxed">
                            {aiSummary?.actions}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* 4. MOBILE TAB: CASH FLOW (STANDALONE) */}
              {mobileTab === 'cashflow' && (
                <div className="space-y-3.5 animate-in fade-in duration-200">
                  <div className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-[11px] font-bold text-emerald-300 flex items-center justify-between">
                    <span>● หน้ารายรับ-รายจ่าย (หน้าเดี่ยว Standalone)</span>
                    <span className="text-[10px] text-slate-300 font-normal">ไม่ซิงค์กับหน้าอื่น</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="p-2.5 rounded-xl bg-emerald-500/15 border border-emerald-400/30">
                      <span className="text-[9px] text-emerald-300 block">รายรับรวม</span>
                      <span className="text-xs font-black font-mono text-white">
                        ฿{totalIncome.toLocaleString()}
                      </span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-rose-500/15 border border-rose-400/30">
                      <span className="text-[9px] text-rose-300 block">รายจ่ายรวม</span>
                      <span className="text-xs font-black font-mono text-white">
                        ฿{totalExpense.toLocaleString()}
                      </span>
                    </div>
                    <div className="p-2.5 rounded-xl bg-amber-400/15 border border-amber-400/30">
                      <span className="text-[9px] text-amber-300 block">คงเหลือสุทธิ</span>
                      <span className="text-xs font-black font-mono text-amber-300">
                        ฿{netBalance.toLocaleString()}
                      </span>
                    </div>
                  </div>

                  {/* Quick Add Form on Mobile */}
                  <form
                    onSubmit={handleQuickTxnSubmit}
                    className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-black text-amber-300">
                        + บันทึกรายการด่วน (เฉพาะหน้านี้)
                      </span>
                      <button
                        type="button"
                        onClick={() => fileInputRef?.current?.click()}
                        className="text-[10px] font-bold text-sky-300 underline"
                      >
                        📤 อัปโหลดไฟล์
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-1.5">
                      <button
                        type="button"
                        onClick={() => setQuickType('income')}
                        className={`py-1 rounded-lg text-[10px] font-black border ${
                          quickType === 'income'
                            ? 'bg-emerald-500/25 border-emerald-400 text-emerald-300'
                            : 'border-white/10 text-slate-400'
                        }`}
                      >
                        + รายรับ (Income)
                      </button>
                      <button
                        type="button"
                        onClick={() => setQuickType('expense')}
                        className={`py-1 rounded-lg text-[10px] font-black border ${
                          quickType === 'expense'
                            ? 'bg-rose-500/25 border-rose-400 text-rose-300'
                            : 'border-white/10 text-slate-400'
                        }`}
                      >
                        - รายจ่าย (Expense)
                      </button>
                    </div>
                    <div className="flex gap-1.5">
                      <input
                        type="text"
                        placeholder="ชื่อรายการ..."
                        value={quickTitle}
                        onChange={(e) => setQuickTitle(e.target.value)}
                        className="flex-1 bg-black/50 border border-white/15 rounded-xl px-2.5 py-1.5 text-xs text-white outline-none focus:border-amber-400"
                      />
                      <input
                        type="number"
                        placeholder="จำนวนเงิน"
                        value={quickAmount}
                        onChange={(e) => setQuickAmount(e.target.value)}
                        className="w-24 bg-black/50 border border-white/15 rounded-xl px-2.5 py-1.5 text-xs text-white outline-none focus:border-amber-400"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmittingQuick}
                      className="w-full py-2 rounded-xl bg-gradient-to-r from-amber-400 to-amber-300 text-slate-950 font-black text-xs shadow"
                    >
                      {isSubmittingQuick ? 'กำลังบันทึก...' : '✓ บันทึกรายการ (เฉพาะหน้ารายรับ-รายจ่าย)'}
                    </button>
                  </form>

                  {/* Recent Cashflow List */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-black text-slate-400 uppercase">
                      รายการล่าสุด ({cashFlowRecords.length})
                    </span>
                    {cashFlowRecords.slice(0, 6).map((item) => (
                      <div
                        key={item.id}
                        className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between text-xs"
                      >
                        <div className="truncate pr-2">
                          <p className="font-bold text-white truncate">{item.title}</p>
                          <p className="text-[10px] text-slate-400">{item.date} • {item.category}</p>
                        </div>
                        <span
                          className={`font-mono font-black whitespace-nowrap ${
                            item.type === 'income' ? 'text-emerald-400' : 'text-rose-400'
                          }`}
                        >
                          {item.type === 'income' ? '+' : '-'}฿{Number(item.amount || 0).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 5. MOBILE TAB: INVENTORY (STANDALONE) */}
              {mobileTab === 'inventory' && (
                <div className="space-y-3.5 animate-in fade-in duration-200">
                  <div className="px-3 py-1.5 rounded-xl bg-amber-400/15 border border-amber-400/30 text-[11px] font-bold text-amber-300 flex items-center justify-between">
                    <span>● หน้าคลังสินค้า (หน้าเดี่ยว Standalone)</span>
                    <span className="text-[10px] text-slate-300 font-normal">ไม่ซิงค์กับหน้าอื่น</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-gradient-to-br from-amber-400/20 via-[#0a1328] to-[#040814] border border-amber-400/40 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-black text-amber-300 uppercase">
                        คลังสินค้า ({posProducts.length} SKUs)
                      </span>
                      <p className="text-lg font-black font-mono text-white">
                        {totalStockUnits.toLocaleString()} ชิ้น • ฿{totalInventoryValuation.toLocaleString()}
                      </p>
                    </div>
                    <button
                      onClick={() => stockFileInputRef?.current?.click()}
                      className="px-3 py-2 rounded-xl bg-amber-400 text-slate-950 font-black text-[11px]"
                    >
                      📤 อัปโหลดสต็อก
                    </button>
                  </div>

                  {recommendations.length > 0 && (
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-black text-amber-300 uppercase">
                        ⚡ คำแนะนำเติมสต็อก AI ({recommendations.length})
                      </span>
                      {recommendations.slice(0, 4).map((rec) => (
                        <div
                          key={rec.sku_code}
                          className="p-2.5 rounded-xl bg-white/[0.04] border border-amber-400/25 flex items-center justify-between gap-2 text-xs"
                        >
                          <div className="truncate">
                            <p className="font-bold text-white truncate">{rec.product_name}</p>
                            <p className="text-[10px] text-slate-400">
                              คงเหลือ {rec.current_stock} • แนะนำ +{rec.recommended_restock_qty || rec.recommended_order_qty || 20} ชิ้น
                            </p>
                          </div>
                          <button
                            onClick={() =>
                              handleApplyAIRestock(rec.sku_code, rec.recommended_restock_qty || rec.recommended_order_qty || 20)
                            }
                            className="px-2.5 py-1.5 rounded-lg bg-amber-400 text-slate-950 font-black text-[10px] whitespace-nowrap"
                          >
                            +เติมสต็อก
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="space-y-1.5">
                    <span className="text-[10px] font-black text-slate-400 uppercase">
                      รายการสินค้าในคลัง ({posProducts.length})
                    </span>
                    {posProducts.slice(0, 8).map((p) => (
                      <div
                        key={p.code}
                        className="p-2.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between text-xs"
                      >
                        <div className="truncate pr-2">
                          <p className="font-bold text-white truncate">{p.name}</p>
                          <p className="text-[10px] text-slate-400 font-mono">{p.code}</p>
                        </div>
                        <div className="text-right whitespace-nowrap">
                          <p className="font-mono font-black text-amber-300">
                            {p.stock} ชิ้น
                          </p>
                          <p className="text-[10px] text-slate-400 font-mono">
                            ฿{Number(p.price || 0).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 6. MOBILE TAB: MY UPLOADED FILES */}
              {mobileTab === 'files' && (
                <div className="space-y-3 animate-in fade-in duration-200">
                  <div className="p-3.5 rounded-2xl bg-sky-500/15 border border-sky-400/35 flex items-center justify-between">
                    <div>
                      <span className="text-xs font-black text-sky-300">
                        📂 ไฟล์ที่อัปโหลดของฉัน ({myUploadedFiles.length})
                      </span>
                      <p className="text-[10px] text-slate-300">
                        ดูตารางข้อมูลหรือลบไฟล์ของคุณได้ทันที
                      </p>
                    </div>
                  </div>

                  {myUploadedFiles.length === 0 ? (
                    <div className="p-8 rounded-2xl border border-dashed border-white/15 text-center text-xs text-slate-400">
                      ยังไม่มีไฟล์ที่อัปโหลดในบัญชีของคุณ
                    </div>
                  ) : (
                    myUploadedFiles.map((f) => (
                      <div
                        key={f.id}
                        className="p-3 rounded-2xl bg-white/[0.04] border border-white/10 space-y-2"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="truncate">
                            <p className="text-xs font-black text-white truncate">📄 {f.filename}</p>
                            <p className="text-[10px] text-amber-300">
                              {f.source_tab} • {Number(f.total_records || 0).toLocaleString()} รายการ
                            </p>
                          </div>
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                            {f.status}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 pt-1">
                          <button
                            onClick={() => handleViewUploadedFile(f)}
                            className="flex-1 py-1.5 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 text-sky-300 border border-sky-400/35 text-[11px] font-bold"
                          >
                            👁️ ดูข้อมูลไฟล์
                          </button>
                          <button
                            onClick={() => handleDeleteUploadedFile(f)}
                            disabled={isDeletingFileId === f.id}
                            className="flex-1 py-1.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-400/35 text-[11px] font-bold"
                          >
                            {isDeletingFileId === f.id ? 'กำลังลบ...' : '🗑️ ลบไฟล์'}
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* iOS / Android Bottom Glassmorphic Tab Bar */}
            <div className="px-2 py-2 bg-[#040814]/95 border-t border-white/10 grid grid-cols-6 gap-1 flex-shrink-0">
              {[
                { id: 'overview', icon: '📊', label: 'ภาพรวม' },
                { id: 'live', icon: '⚡', label: 'ทราฟฟิก' },
                { id: 'insights', icon: '✨', label: 'AI สรุป' },
                { id: 'cashflow', icon: '💰', label: 'บัญชี' },
                { id: 'inventory', icon: '📦', label: 'คลังสต็อก' },
                { id: 'files', icon: '📂', label: 'ไฟล์ฉัน' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => handleSelectMobileTab(tab.id)}
                  className={`py-1.5 rounded-xl flex flex-col items-center justify-center transition ${
                    mobileTab === tab.id
                      ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <span className="text-sm leading-none">{tab.icon}</span>
                  <span className="text-[9px] font-black mt-1 truncate">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: FLUTTER APPLICATION ARCHITECTURE & PWA LAUNCH HUB */}
        <div className="flex-1 flex flex-col justify-between space-y-4 overflow-y-auto pr-1">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-500/15 border border-sky-400/40 text-sky-300 text-xs font-black tracking-wider uppercase">
              <span>🐦 FLUTTER 3.x MULTI-PLATFORM APP + PWA SUITE</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight">
              แอปพลิเคชัน <span className="text-amber-400">Flutter InsightFlow AI</span> (iOS / Android / macOS)
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              พัฒนาด้วย <span className="text-sky-300 font-bold">Flutter & Dart (`flutter_app/`)</span> ในโทนดีไซน์{' '}
              <span className="text-amber-300 font-bold">Luxury Midnight & 24K Gold</span> เหมือนหน้าเว็บหลัก และเชื่อมฐานข้อมูล{' '}
              <span className="text-emerald-300 font-bold">FastAPI + PostgreSQL/SQLite QueuePool + Redis</span>{' '}
              ชุดเดียวกันแบบเรียลไทม์ 100%
            </p>

            {/* Primary Install / Launch Buttons */}
            <div className="p-4 rounded-3xl bg-gradient-to-br from-amber-400/15 via-[#0b132b] to-[#060b19] border border-amber-400/40 space-y-3 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src="/app-icon.svg"
                    alt="InsightFlow Icon"
                    className="w-11 h-11 rounded-2xl border border-amber-400/50 shadow-lg"
                  />
                  <div>
                    <h3 className="text-sm sm:text-base font-black text-white">
                      InsightFlow Flutter Executive App (v2.5)
                    </h3>
                    <p className="text-[11px] text-emerald-400 font-bold">
                      ● โค้ดโปรเจกต์พร้อมรันในโฟลเดอร์ <code className="text-amber-300">flutter_app/</code> + ทดลองกดใช้งานสดด้านซ้าย
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                <button
                  onClick={() => {
                    if (deferredPrompt) {
                      onTriggerInstall();
                    } else {
                      launchStandaloneWindow('mobile');
                    }
                  }}
                  className="py-3 px-4 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-200 text-slate-950 font-black text-xs shadow-[0_10px_30px_rgba(251,191,36,0.3)] hover:scale-[1.02] transition flex items-center justify-center gap-2"
                >
                  <span>📲 {deferredPrompt ? 'ติดตั้งแอปลงเครื่องทันที (Install App)' : 'เปิดหน้าต่างแอปมือถือแยกเดี่ยว (Mobile App)'}</span>
                </button>

                <button
                  onClick={() => launchStandaloneWindow('desktop')}
                  className="py-3 px-4 rounded-2xl bg-sky-500/20 hover:bg-sky-500/30 border border-sky-400/40 text-sky-200 font-black text-xs transition flex items-center justify-center gap-2"
                >
                  <span>💻 เปิดหน้าต่างแอปเดสก์ท็อป (Desktop App)</span>
                </button>
              </div>
            </div>

            {/* Flutter Project Files & Structure */}
            <div className="p-4 rounded-2xl bg-[#081024] border border-sky-400/30 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-black text-sky-300">
                  🐦 โครงสร้างซอร์สโค้ด Flutter (`flutter_app/`)
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/20 text-sky-300">
                  Dart 3 + Material 3
                </span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                <div className="p-2.5 rounded-xl bg-black/40 border border-white/10">
                  <p className="font-mono font-bold text-amber-300">flutter_app/lib/main.dart</p>
                  <p className="text-slate-400 text-[10px] mt-0.5">
                    6 หน้าจอหลัก (ภาพรวม, ทราฟฟิกสด, AI, บัญชี, คลังสต็อก, จัดการไฟล์ของฉัน) + กราฟ CustomPainter
                  </p>
                </div>
                <div className="p-2.5 rounded-xl bg-black/40 border border-white/10">
                  <p className="font-mono font-bold text-sky-300">lib/services/insightflow_api.dart</p>
                  <p className="text-slate-400 text-[10px] mt-0.5">
                    เชื่อม FastAPI (`127.0.0.1:8000` / `10.0.2.2:8000`), JWT Token, คิวอัปโหลดไฟล์ & ลบไฟล์
                  </p>
                </div>
                <div className="p-2.5 rounded-xl bg-black/40 border border-white/10">
                  <p className="font-mono font-bold text-emerald-300">lib/theme/luxury_theme.dart</p>
                  <p className="text-slate-400 text-[10px] mt-0.5">
                    ธีมสี Midnight Obsidian & 24K Gold, การ์ดกระจก `LuxuryCard` และโลโก้เวกเตอร์ `InsightFlowLogo`
                  </p>
                </div>
                <div className="p-2.5 rounded-xl bg-black/40 border border-white/10">
                  <p className="font-mono font-bold text-purple-300">flutter_app/pubspec.yaml</p>
                  <p className="text-slate-400 text-[10px] mt-0.5">
                    แพ็กเกจ `http`, `file_picker`, `shared_preferences`, `intl` พร้อมรันทุกแพลตฟอร์ม
                  </p>
                </div>
              </div>

              {/* Terminal Commands */}
              <div className="p-3 rounded-xl bg-black/70 border border-white/10 font-mono text-[11px] text-emerald-300 space-y-1">
                <div className="text-[10px] text-slate-400 font-sans font-bold">
                  คำสั่งรันแอป Flutter บนเครื่อง (iOS / Android / macOS / Chrome):
                </div>
                <div>$ cd flutter_app && flutter create . && flutter pub get</div>
                <div>$ flutter run</div>
              </div>
            </div>

            {/* Real-time Feature Parity Checklist */}
            <div className="p-4 rounded-2xl bg-[#081024] border border-white/10 space-y-2">
              <div className="text-xs font-black text-white flex items-center justify-between">
                <span>🔗 ความสามารถในแอปที่เชื่อมกับระบบหลักอัตโนมัติ</span>
                <span className="text-[10px] font-mono text-emerald-400">SHARED DB & REDIS</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>ซิงค์ ภาพรวมระบบ ↔ คลังสินค้า อัตโนมัติ</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>อัปโหลดไฟล์ผ่านคิว BackgroundTasks ไม่ค้าง</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>ดูตัวอย่างตารางข้อมูลและลบไฟล์ของตัวเองได้</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400 font-bold">✓</span>
                  <span>รองรับแถบเมนูด้านล่าง (Bottom Nav) บนมือถือ</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-white/10 text-xs text-slate-400">
            <span>ทดลองกดใช้งานบนหน้าจอมือถือจำลองด้านซ้ายได้ทันที</span>
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold transition"
            >
              กลับสู่หน้าแดชบอร์ดหลัก
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function MobileBottomNav({ activeTab, setActiveTab, onOpenFiles, onOpenAppModal, filesCount }) {
  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#040814]/95 backdrop-blur-2xl border-t border-amber-400/25 px-2 py-2 grid grid-cols-6 gap-1 shadow-[0_-10px_30px_rgba(0,0,0,0.8)]">
      {[
        { id: 'overview', icon: '📊', label: 'ภาพรวม' },
        { id: 'live', icon: '⚡', label: 'ทราฟฟิก' },
        { id: 'insights', icon: '✨', label: 'AI วิเคราะห์' },
        { id: 'cashflow', icon: '💰', label: 'รายรับ-จ่าย' },
        { id: 'inventory', icon: '📦', label: 'คลังสินค้า' }
      ].map((item) => (
        <button
          key={item.id}
          onClick={() => setActiveTab(item.id)}
          className={`py-1.5 rounded-xl flex flex-col items-center justify-center transition ${
            activeTab === item.id
              ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40 font-bold'
              : 'text-slate-300 font-normal hover:text-white'
          }`}
        >
          <span className="text-base leading-none">{item.icon}</span>
          <span className={`text-xs mt-1 truncate ${activeTab === item.id ? 'font-bold' : 'font-normal'}`}>{item.label}</span>
        </button>
      ))}
      <button
        onClick={onOpenFiles}
        onDoubleClick={onOpenAppModal}
        className="py-1.5 rounded-xl flex flex-col items-center justify-center text-sky-300 bg-sky-500/10 border border-sky-400/30 font-semibold"
      >
        <span className="text-base leading-none">📂</span>
        <span className="text-xs font-semibold mt-1 truncate">ไฟล์ ({filesCount})</span>
      </button>
    </div>
  );
}
