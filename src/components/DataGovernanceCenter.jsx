// ==============================================================================
// File: src/components/DataGovernanceCenter.jsx
// System: InsightFlow Enterprise Data Governance, RBAC & Data Quality Firewall
// Description: Role-Based Access Control Simulator (Owner vs Manager vs Cashier),
//              Data Masking, and 5-Point Data Quality Gatekeeper Quarantine Room
//              featuring Ultra-Luxury 3D Jewel & Metallic Vector Icons
// ==============================================================================

import React, { useState } from 'react';
import toast from 'react-hot-toast';
import {
  DataGovernanceIcon,
  RbacOwnerIcon,
  RbacManagerIcon,
  RbacCashierIcon,
  VaultLockIcon,
  NetProfitIcon,
  UnitCostIcon,
  BranchScopeIcon,
  PrivacyMaskIcon,
  QuarantineDomeIcon,
} from './LuxuryIcons';

export default function DataGovernanceCenter({ lang = 'th' }) {
  const isEn = lang === 'en';
  const tx = (th, en) => (isEn ? en : th);

  // ----------------------------------------------------------------------------
  // 1. RBAC SIMULATION STATE
  // ----------------------------------------------------------------------------
  const [activeRole, setActiveRole] = useState('owner'); // 'owner' | 'manager' | 'cashier'

  const roleProfiles = {
    owner: {
      title: tx('เจ้าของกิจการ (Owner / Super Admin)', 'Owner / Super Admin'),
      badge: tx('สิทธิ์สูงสุด (Full Access)', 'Full Executive Access'),
      badgeColor: 'bg-amber-400/20 text-amber-300 border-amber-400/40',
      netProfit: '฿1,845,000.00',
      grossMargin: '58.4%',
      secretUnitCost: '฿45.00 / ชิ้น',
      branchScope: tx('ทุกสาขา (รวมศูนย์บริษัท)', 'All Branches (Company-Wide)'),
      customerPhone: '081-924-8899',
      exportPermission: tx('อนุญาตส่งออกไฟล์ CSV ได้', 'Full CSV Export Permitted'),
      etlPermission: tx('ควบคุมท่อส่งข้อมูล ETL & Cloud Warehouse ได้', 'Full Pipeline & Warehouse Access'),
      quarantinePermission: tx('อนุมัติข้อมูลที่ถูกกักกันได้', 'Can Override Quarantined Records'),
    },
    manager: {
      title: tx('ผู้จัดการสาขา (Store Manager)', 'Store Manager'),
      badge: tx('จำกัดระดับสาขา (Branch Restricted)', 'Branch Level Only'),
      badgeColor: 'bg-sky-400/20 text-sky-300 border-sky-400/40',
      netProfit: tx('[ซ่อนตามสิทธิ์ RBAC: เฉพาะเจ้าของร้าน]', '[Hidden by RBAC: Owner Only]'),
      grossMargin: tx('[สิทธิ์ไม่เพียงพอ]', '[Restricted]'),
      secretUnitCost: tx('[ต้นทุนลับเฉพาะฝ่ายจัดซื้อ]', '[Secret Unit Cost Hidden]'),
      branchScope: tx('เฉพาะสาขาที่ดูแล (สาขาสุขุมวิท 21)', 'Assigned Branch Only (Sukhumvit 21)'),
      customerPhone: '081-xxx-8899 (Masked)',
      exportPermission: tx('ไม่อนุญาตให้ดาวน์โหลดฐานข้อมูลลูกค้า', 'Export Blocked to Prevent Leakage'),
      etlPermission: tx('ไม่มีสิทธิ์เข้าถึงโครงสร้างท่อข้อมูล', 'No Access to Ingestion Pipelines'),
      quarantinePermission: tx('ไม่มีสิทธิ์ปลดกักกันข้อมูลขยะ', 'Cannot Override Quarantine'),
    },
    cashier: {
      title: tx('พนักงานขาย / แคชเชียร์ (Cashier & Staff)', 'Cashier & POS Staff'),
      badge: tx('สิทธิ์เฉพาะจุดขาย (POS Only)', 'POS Ring-Up Only'),
      badgeColor: 'bg-slate-400/20 text-slate-300 border-slate-400/40',
      netProfit: tx('[ซ่อนตามสิทธิ์ RBAC]', '[Hidden by RBAC]'),
      grossMargin: tx('[สิทธิ์ไม่เพียงพอ]', '[Restricted]'),
      secretUnitCost: tx('[ต้นทุนลับ]', '[Hidden]'),
      branchScope: tx('เฉพาะหน้าเครื่องคิดเงิน POS', 'POS Terminal Only'),
      customerPhone: '081-xxx-8899 (Masked)',
      exportPermission: tx('บล็อกการส่งออกข้อมูล 100%', 'Export Blocked 100%'),
      etlPermission: tx('ไม่มีสิทธิ์เข้าถึงระบบหลังบ้าน', 'No Backend Access'),
      quarantinePermission: tx('ไม่มีสิทธิ์ดำเนินการ', 'No Permission'),
    },
  };

  const currentProfile = roleProfiles[activeRole];

  // ----------------------------------------------------------------------------
  // 2. DATA QUALITY GATEKEEPER & QUARANTINE STATE
  // ----------------------------------------------------------------------------
  const [quarantineRecords, setQuarantineRecords] = useState([
    {
      id: 'QRN-2026-001',
      source: tx('POS หน้าร้าน สาขา 2', 'POS Terminal Branch 2'),
      ruleLabel: tx('ราคาสินค้าติดลบ (Negative Price)', 'Negative Price Error'),
      invalidField: 'amount: -180.00 ฿',
      reason: tx('พนักงานคีย์ส่วนลดผิดช่องทำให้ยอดบิลรวมติดลบ -180 บาท ระบบทำการกักกันไม่ให้กราฟยอดขายตกฮวบ', 'Cashier entered discount in wrong field resulting in negative -฿180. Blocked from distorting charts.'),
      status: 'QUARANTINED',
      detectedAt: '2026-10-15 14:22',
      badgeColor: 'bg-rose-500/20 text-rose-300 border-rose-500/40',
    },
    {
      id: 'QRN-2026-002',
      source: 'Facebook Ads Leads',
      ruleLabel: tx('วันที่ในอนาคตหลุดโลก (Future Date)', 'Future Date Error'),
      invalidField: 'date: 2099-12-31',
      reason: tx('ฟอร์มลงทะเบียนถูกยิงข้อมูลสแปมระบุปี ค.ศ. 2099 กักกันเพื่อป้องกันโมเดล AI พยากรณ์รันล้มเหลว', 'Spam form submission with year 2099. Quarantined to prevent time-series forecast crash.'),
      status: 'QUARANTINED',
      detectedAt: '2026-10-15 15:05',
      badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    },
    {
      id: 'QRN-2026-003',
      source: tx('ระบบคลังสินค้า ERP', 'Warehouse ERP Integration'),
      ruleLabel: tx('ยอดบิลสูงผิดปกติ (Outlier Spike)', 'Extreme Outlier Spike'),
      invalidField: 'amount: 8,500,000.00 ฿',
      reason: tx('ยอดสั่งซื้อสูงกว่าเกณฑ์เพดาน ฿200,000 บาท เกิดจากการพิมพ์เลข 0 เกิน 3 ตัว กักกันรอเจ้าของร้านกดยืนยัน', 'Ticket exceeds ฿200,000 ceiling due to typing extra zeroes. Quarantined awaiting owner approval.'),
      status: 'QUARANTINED',
      detectedAt: '2026-10-15 16:18',
      badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
    },
  ]);

  const handleResolveQuarantine = (id, action) => {
    setQuarantineRecords(prev =>
      prev.map(r => (r.id === id ? { ...r, status: action === 'APPROVE' ? 'APPROVED' : 'DISCARDED' } : r))
    );
    if (action === 'APPROVE') {
      toast.success(tx(`อนุมัติและนำเข้าข้อมูล ${id} เรียบร้อยแล้ว`, `Approved & released ${id} into database`));
    } else {
      toast.error(tx(`กำจัดข้อมูลขยะ ${id} ออกจากระบบถาวร`, `Discarded corrupted record ${id}`));
    }
  };

  return (
    <div className="flex flex-col gap-6 animate-fadeIn">
      {/* 1. Header Banner */}
      <div className="relative overflow-hidden rounded-2xl p-6 sm:p-7 border border-emerald-500/40 bg-gradient-to-br from-emerald-950/60 via-slate-900/95 to-[#040816] shadow-2xl backdrop-blur-xl">
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black tracking-wider uppercase bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{tx('มาตรฐานระดับองค์กร (Enterprise Data Governance & Security)', 'Enterprise Data Governance & Security Standard')}</span>
            </div>
            
            <div className="flex items-center gap-3.5">
              <div className="p-2.5 rounded-2xl bg-emerald-500/15 border border-emerald-500/35 shadow-lg shadow-emerald-500/20 flex-shrink-0">
                <DataGovernanceIcon size={32} />
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                {tx('ระบบจัดการสิทธิ์ RBAC & ด่านตรวจจับข้อมูลขยะ (Data Quality)', 'Role-Based Access Control (RBAC) & Data Quality Firewall')}
              </h3>
            </div>

            <p className="text-sm text-slate-300 leading-relaxed">
              {tx(
                'ปกป้องความลับทางธุรกิจด้วยการแยกสิทธิ์การมองเห็นข้อมูล (เจ้าของร้านเห็นกำไรสุทธิ ผู้จัดการเห็นเฉพาะสาขาตนเอง) พร้อมด่านตรวจจับข้อมูลขยะ (ราคาสินค้าติดลบ วันที่ผิดเพี้ยน ยอดเงินกระโดด) กักกันก่อนเข้าสู่ระบบแสดงผล ไม่ให้กราฟและ AI เพี้ยน',
                'Protects sensitive financial margins via Role-Based Access Control (Owner vs Manager vs Cashier) and enforces a 5-point Data Quality Firewall that intercepts negative prices and outlier spikes.'
              )}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="px-4 py-2.5 rounded-xl bg-slate-950/80 border border-white/10 text-xs">
              <span className="text-slate-400 block">{tx('คะแนนความสะอาดของข้อมูล', 'Data Quality Score')}</span>
              <strong className="text-emerald-400 text-base font-black font-mono">99.98% Clean</strong>
            </div>
          </div>
        </div>

        {/* 2. Interactive Role Switcher Bar */}
        <div className="mt-6 pt-6 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-400 font-bold mr-1">
              {tx('จำลองการสลับสิทธิ์ผู้ใช้ (Role Switcher):', 'Simulate User Role:')}
            </span>

            <button
              type="button"
              onClick={() => {
                setActiveRole('owner');
                toast.success(tx('สลับเป็นมุมมอง: เจ้าของกิจการ (สิทธิ์เต็ม)', 'Switched to: Owner / Full Access'));
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
                activeRole === 'owner'
                  ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-950 shadow-lg shadow-amber-500/25'
                  : 'bg-white/5 text-slate-300 hover:text-white border border-white/10'
              }`}
            >
              <RbacOwnerIcon size={18} />
              <span>{tx('Owner (เจ้าของ)', 'Owner')}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveRole('manager');
                toast(tx('สลับเป็นมุมมอง: ผู้จัดการสาขา (ซ่อนกำไรสุทธิ)', 'Switched to: Store Manager (Net profit hidden)'));
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
                activeRole === 'manager'
                  ? 'bg-gradient-to-r from-sky-400 to-blue-500 text-slate-950 shadow-lg shadow-blue-500/25'
                  : 'bg-white/5 text-slate-300 hover:text-white border border-white/10'
              }`}
            >
              <RbacManagerIcon size={18} />
              <span>{tx('Manager (ผู้จัดการ)', 'Store Manager')}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setActiveRole('cashier');
                toast(tx('สลับเป็นมุมมอง: แคชเชียร์ (จำกัดเฉพาะ POS)', 'Switched to: Cashier (POS only)'));
              }}
              className={`px-3.5 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-2 ${
                activeRole === 'cashier'
                  ? 'bg-gradient-to-r from-emerald-400 to-teal-500 text-slate-950 shadow-lg shadow-emerald-500/25'
                  : 'bg-white/5 text-slate-300 hover:text-white border border-white/10'
              }`}
            >
              <RbacCashierIcon size={18} />
              <span>{tx('Cashier (แคชเชียร์)', 'Cashier')}</span>
            </button>
          </div>

          <span className={`text-[11px] font-black px-3 py-1 rounded-full border ${currentProfile.badgeColor}`}>
            {currentProfile.badge}
          </span>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* SECTION 1: LIVE RBAC DATA VISIBILITY SIMULATION                      */}
      {/* ==================================================================== */}
      <div className="glass-card rounded-2xl p-6 border border-white/10 bg-slate-900/80 shadow-xl space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h4 className="text-base font-black text-white flex items-center gap-2.5">
              <VaultLockIcon size={22} />
              <span>{tx('การมองเห็นข้อมูลตามสิทธิ์ (Real-time RBAC Data Masking Matrix)', 'Live RBAC Data Masking Matrix')}</span>
            </h4>
            <p className="text-xs text-slate-400">
              {tx('มุมมองปัจจุบันถูกปรับแต่งตามบทบาท:', 'Current view is filtered based on active role:')} <strong className="text-amber-300">{currentProfile.title}</strong>
            </p>
          </div>
        </div>

        {/* Matrix Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Net Profit */}
          <div className="bg-slate-950/70 border border-white/10 rounded-xl p-4 flex flex-col justify-between gap-2 shadow-lg">
            <span className="text-xs text-slate-400 font-bold flex items-center gap-2">
              <NetProfitIcon size={18} />
              <span>{tx('กำไรสุทธิรวม (Net Profit)', 'Net Profit (Company)')}</span>
            </span>
            <div className="mt-1">
              <strong className={`text-base font-black font-mono block ${activeRole === 'owner' ? 'text-emerald-400 text-lg' : 'text-rose-400 text-xs'}`}>
                {currentProfile.netProfit}
              </strong>
              <span className="text-[11px] text-slate-400 mt-1 block">
                {activeRole === 'owner' ? tx('มาร์จิ้นสุทธิ: 58.4%', 'Net Margin: 58.4%') : currentProfile.grossMargin}
              </span>
            </div>
            <div className="pt-2 border-t border-white/10 text-[10px] text-slate-500">
              {activeRole === 'owner' ? tx('สิทธิ์เข้าถึงสมบูรณ์', 'Full access granted') : tx('ซ่อนเพื่อความลับทางธุรกิจ', 'Masked for security')}
            </div>
          </div>

          {/* Card 2: Secret Unit Cost */}
          <div className="bg-slate-950/70 border border-white/10 rounded-xl p-4 flex flex-col justify-between gap-2 shadow-lg">
            <span className="text-xs text-slate-400 font-bold flex items-center gap-2">
              <UnitCostIcon size={18} />
              <span>{tx('ต้นทุนวัตถุดิบลับ (Unit Cost)', 'Secret Unit Cost')}</span>
            </span>
            <div className="mt-1">
              <strong className={`text-base font-black font-mono block ${activeRole === 'owner' ? 'text-amber-300' : 'text-rose-400 text-xs'}`}>
                {currentProfile.secretUnitCost}
              </strong>
              <span className="text-[11px] text-slate-400 mt-1 block">
                {tx('ราคาขายหน้าร้าน: ฿120.00', 'Retail Price: ฿120.00')}
              </span>
            </div>
            <div className="pt-2 border-t border-white/10 text-[10px] text-slate-500">
              {activeRole === 'owner' ? tx('เปิดเผยเฉพาะฝ่ายบริหาร', 'Executive only') : tx('พนักงานเห็นเฉพาะราคาขาย', 'Staff sees retail only')}
            </div>
          </div>

          {/* Card 3: Branch Scope */}
          <div className="bg-slate-950/70 border border-white/10 rounded-xl p-4 flex flex-col justify-between gap-2 shadow-lg">
            <span className="text-xs text-slate-400 font-bold flex items-center gap-2">
              <BranchScopeIcon size={18} />
              <span>{tx('ขอบเขตข้อมูลสาขา (Branch Scope)', 'Branch Data Scope')}</span>
            </span>
            <div className="mt-1">
              <strong className="text-xs sm:text-sm font-black text-white block">
                {currentProfile.branchScope}
              </strong>
              <span className="text-[11px] text-slate-400 mt-1 block">
                {activeRole === 'owner' ? tx('รวมยอดทั้ง 4 สาขา', 'Aggregates 4 branches') : tx('ไม่เห็นตัวเลขสาขาอื่น', 'Isolated branch partition')}
              </span>
            </div>
            <div className="pt-2 border-t border-white/10 text-[10px] text-slate-500">
              {activeRole === 'owner' ? tx('รวมศูนย์ระดับบริษัท', 'Global multi-branch') : tx('ล็อกตามสาขาที่สังกัด', 'Restricted to branch')}
            </div>
          </div>

          {/* Card 4: Customer Privacy Data Masking */}
          <div className="bg-slate-950/70 border border-white/10 rounded-xl p-4 flex flex-col justify-between gap-2 shadow-lg">
            <span className="text-xs text-slate-400 font-bold flex items-center gap-2">
              <PrivacyMaskIcon size={18} />
              <span>{tx('เบอร์โทรลูกค้า (Privacy Masking)', 'Customer Privacy Masking')}</span>
            </span>
            <div className="mt-1">
              <strong className={`font-mono text-sm font-black block ${activeRole === 'owner' ? 'text-cyan-300' : 'text-slate-300'}`}>
                {currentProfile.customerPhone}
              </strong>
              <span className="text-[11px] text-slate-400 mt-1 block">
                {currentProfile.exportPermission}
              </span>
            </div>
            <div className="pt-2 border-t border-white/10 text-[10px] text-slate-500">
              {activeRole === 'owner' ? tx('ส่งออกได้เต็มรูปแบบ', 'Full export unlocked') : tx('ป้องกันลูกค้ารั่วไหล', 'Leakage prevention active')}
            </div>
          </div>
        </div>
      </div>

      {/* ==================================================================== */}
      {/* SECTION 2: DATA QUALITY FIREWALL & QUARANTINE ROOM                   */}
      {/* ==================================================================== */}
      <div className="glass-card rounded-2xl p-6 border border-white/10 bg-slate-900/80 shadow-xl space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h4 className="text-base font-black text-white flex items-center gap-2.5">
              <QuarantineDomeIcon size={24} />
              <span>{tx('ห้องกักกันข้อมูลขยะ (Data Quality Firewall & Quarantine Room)', 'Data Quality Firewall & Quarantine Room')}</span>
            </h4>
            <p className="text-xs text-slate-400">
              {tx('ดักจับราคาสินค้าติดลบ วันที่เพี้ยน หรือยอดกระโดดผิดปกติ กักกันไว้ก่อนเข้าสู่ตารางแสดงผล กราฟจึงสะอาดและไม่เพี้ยน 100%', 'Intercepts corrupted rows (negative amounts, corrupt dates, outlier spikes) preventing chart breakdowns.')}
            </p>
          </div>
          <span className="text-xs text-rose-400 font-mono font-bold bg-rose-500/15 px-3 py-1 rounded-full border border-rose-500/30 flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping" />
            <span>{quarantineRecords.filter(r => r.status === 'QUARANTINED').length} {tx('รายการถูกกักกันอยู่', 'Records Quarantined')}</span>
          </span>
        </div>

        {/* 5-Point Validation Rules Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center text-xs">
          <div className="bg-slate-950/70 p-2.5 rounded-xl border border-emerald-500/30">
            <span className="text-emerald-400 font-black text-xs block">ผ่าน 100%</span>
            <span className="text-[10px] text-slate-300 mt-0.5 block">{tx('1. ราคาไม่ติดลบ', 'Numeric Sanity')}</span>
          </div>
          <div className="bg-slate-950/70 p-2.5 rounded-xl border border-emerald-500/30">
            <span className="text-emerald-400 font-black text-xs block">ผ่าน 99.8%</span>
            <span className="text-[10px] text-slate-300 mt-0.5 block">{tx('2. วันที่สมเหตุสมผล', 'Date Sanity')}</span>
          </div>
          <div className="bg-slate-950/70 p-2.5 rounded-xl border border-emerald-500/30">
            <span className="text-emerald-400 font-black text-xs block">ผ่าน 99.9%</span>
            <span className="text-[10px] text-slate-300 mt-0.5 block">{tx('3. สกัด Outlier สุดโต่ง', 'Outlier Shield')}</span>
          </div>
          <div className="bg-slate-950/70 p-2.5 rounded-xl border border-emerald-500/30">
            <span className="text-emerald-400 font-black text-xs block">ผ่าน 100%</span>
            <span className="text-[10px] text-slate-300 mt-0.5 block">{tx('4. บังคับมีรหัสบิล', 'Schema Required')}</span>
          </div>
          <div className="bg-slate-950/70 p-2.5 rounded-xl border border-emerald-500/30">
            <span className="text-emerald-400 font-black text-xs block">ผ่าน 99.5%</span>
            <span className="text-[10px] text-slate-300 mt-0.5 block">{tx('5. รูปแบบเบอร์ 10 หลัก', 'Phone Sanity')}</span>
          </div>
        </div>

        {/* Quarantined Records Table */}
        <div className="overflow-x-auto no-scrollbar pt-2">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-white/10 text-slate-400 font-black uppercase text-[10px] tracking-wider">
                <th className="py-2.5 px-3">{tx('รหัสกักกัน', 'Quarantine ID')}</th>
                <th className="py-2.5 px-3">{tx('แหล่งข้อมูล', 'Source')}</th>
                <th className="py-2.5 px-3">{tx('กฎที่ฝ่าฝืน', 'Rule Violated')}</th>
                <th className="py-2.5 px-3">{tx('ค่าที่ผิดปกติ', 'Corrupted Value')}</th>
                <th className="py-2.5 px-3">{tx('เหตุผลการกักกันเพื่อป้องกันกราฟ', 'Quarantine Reason')}</th>
                <th className="py-2.5 px-3">{tx('สถานะ', 'Status')}</th>
                <th className="py-2.5 px-3 text-right">{tx('การจัดการ (Governance Action)', 'Action')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {quarantineRecords.map((rec) => (
                <tr key={rec.id} className="hover:bg-white/5 transition-colors">
                  <td className="py-3 px-3 font-mono font-bold text-amber-300">{rec.id}</td>
                  <td className="py-3 px-3 font-bold text-white whitespace-nowrap">{rec.source}</td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-black border ${rec.badgeColor}`}>
                      {rec.ruleLabel}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-mono font-bold text-rose-400 whitespace-nowrap">
                    {rec.invalidField}
                  </td>
                  <td className="py-3 px-3 text-slate-300 max-w-xs text-[11px] leading-snug">
                    {rec.reason}
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    {rec.status === 'QUARANTINED' ? (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse flex items-center gap-1 w-fit">
                        <span className="w-1.5 h-1.5 rounded-full bg-rose-400" />
                        <span>{tx('กักกันอยู่', 'Quarantined')}</span>
                      </span>
                    ) : rec.status === 'APPROVED' ? (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1 w-fit">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span>{tx('อนุมัติแล้ว', 'Approved')}</span>
                      </span>
                    ) : (
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black bg-slate-500/20 text-slate-400 border border-slate-500/40 flex items-center gap-1 w-fit">
                        <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                        <span>{tx('ทิ้งข้อมูลแล้ว', 'Discarded')}</span>
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-right whitespace-nowrap">
                    {rec.status === 'QUARANTINED' ? (
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleResolveQuarantine(rec.id, 'APPROVE')}
                          disabled={activeRole !== 'owner'}
                          title={activeRole !== 'owner' ? tx('เฉพาะสิทธิ์ Owner เท่านั้น', 'Owner only') : ''}
                          className="px-2.5 py-1 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 text-[10px] font-black disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        >
                          {tx('ปล่อยผ่าน', 'Approve')}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleResolveQuarantine(rec.id, 'DISCARD')}
                          disabled={activeRole !== 'owner'}
                          title={activeRole !== 'owner' ? tx('เฉพาะสิทธิ์ Owner เท่านั้น', 'Owner only') : ''}
                          className="px-2.5 py-1 rounded-lg bg-rose-500/20 hover:bg-rose-500/30 text-rose-300 border border-rose-500/40 text-[10px] font-black disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                        >
                          {tx('ลบทิ้ง', 'Discard')}
                        </button>
                      </div>
                    ) : (
                      <span className="text-[10px] text-slate-500 font-mono">Resolved</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
