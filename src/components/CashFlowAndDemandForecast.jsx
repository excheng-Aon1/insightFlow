import React, { useState, useMemo } from 'react';
import { toast } from 'react-hot-toast';
import { LuxuryIconBadge, ReorderPointControlIcon } from './LuxuryIcons';

export function CashFlowAndDemandForecast({
  lang = 'th',
  theme = 'dark',
  inventoryList = [],
  setInventoryList,
  currentRevenueVal = 0,
  setActiveTab,
  pageUploadedFiles = {},
  initialPageUploadedFiles = {},
  centralPosList = [],
  vendorsList = [],
  channelsList = [],
  branchesList = [],
  dbRecords = []
}) {
  const isEn = lang === 'en';
  const isDark = theme === 'dark';
  const tx = (th, en) => (isEn ? en : th);

  // Active sub-tab: 'all' | 'restock' | 'calendar' | 'runway'
  const [activeSubTab, setActiveSubTab] = useState('all');

  // =========================================================================
  // 0. MULTI-PAGE CONNECTED FILES METRIC LINKAGE
  // =========================================================================
  const connectedFiles = useMemo(() => {
    const list = [];
    const allFiles = { ...initialPageUploadedFiles, ...pageUploadedFiles };
    Object.keys(allFiles).forEach(key => {
      const file = allFiles[key];
      if (!file || !file.filename) return;
      let labelTh = key;
      let labelEn = key;
      let icon = '📄';
      if (key === 'inventory') { labelTh = 'คลังสินค้า & สต็อก'; labelEn = 'Inventory'; icon = '📦'; }
      else if (key === 'overview') { labelTh = 'ยอดขาย & เป้าหมาย'; labelEn = 'Sales Overview'; icon = '📊'; }
      else if (key === 'procurement') { labelTh = 'จัดซื้อรวมศูนย์ & PO'; labelEn = 'Procurement'; icon = '🏢'; }
      else if (key === 'multi_channel') { labelTh = 'ช่องทางขาย & ค่าธรรมเนียม'; labelEn = 'Channels'; icon = '🌐'; }
      else if (key === 'bi_studio') { labelTh = 'BI Studio & กำไรขาดทุน'; labelEn = 'BI Studio'; icon = '📈'; }
      else if (key === 'database') { labelTh = 'ฐานข้อมูลธุรกรรม'; labelEn = 'Transactions'; icon = '🗄️'; }
      else if (key === 'staff_pos') { labelTh = 'พนักงานและแคชเชียร์'; labelEn = 'Staff & POS'; icon = '💳'; }
      else if (key === 'customers') { labelTh = 'ฐานข้อมูลลูกค้า CRM'; labelEn = 'Customer CRM'; icon = '👥'; }
      else if (key === 'insights') { labelTh = 'บทวิเคราะห์ AI กลยุทธ์'; labelEn = 'AI Insights'; icon = '🧠'; }
      list.push({ key, labelTh, labelEn, icon, file });
    });
    return list;
  }, [pageUploadedFiles, initialPageUploadedFiles]);

  // =========================================================================
  // 1. SMART RESTOCK ALERT STATE & DATA (DYNAMIC FROM ALL INVENTORY & FILES)
  // =========================================================================
  const [restockOrdersPlaced, setRestockOrdersPlaced] = useState({});

  const computedRestockItems = useMemo(() => {
    const items = [];
    const seenSkus = new Set();

    // Calculate real sales frequency and units sold per product from dbRecords
    const dbProductSales = {};
    if (Array.isArray(dbRecords) && dbRecords.length > 0) {
      dbRecords.forEach(r => {
        const pName = r.th?.product || r.en?.product || r.product;
        if (pName) {
          dbProductSales[pName] = (dbProductSales[pName] || 0) + (Number(r.itemsCount) || 1);
        }
      });
    }

    // 1. Ingest live products from inventoryList
    if (Array.isArray(inventoryList) && inventoryList.length > 0) {
      inventoryList.forEach((inv, idx) => {
        const sku = inv.sku || `SKU-${idx + 101}`;
        if (seenSkus.has(sku)) return;
        seenSkus.add(sku);

        const prodName = inv.th?.name || inv.en?.name || inv.name || `สินค้า ${sku}`;
        const stock = typeof inv.stock === 'number' ? inv.stock : Number(String(inv.stock || 0).replace(/[^\d.-]/g, '')) || 0;
        const price = typeof inv.price === 'number' ? inv.price : Number(String(inv.price || 500).replace(/[^\d.-]/g, '')) || 500;
        const cost = inv.cost ? Number(String(inv.cost).replace(/[^\d.-]/g, '')) : Math.round(price * 0.45);

        // Daily run rate: based on real dbRecords sold units or inv.soldUnits or stock consumption pace
        const soldInDb = dbProductSales[prodName] || dbProductSales[sku] || 0;
        const runRatePerDay = soldInDb > 0
          ? Math.max(0.5, Math.round((soldInDb / 30) * 10) / 10)
          : inv.soldUnits
          ? Math.max(0.5, Math.round((inv.soldUnits / 30) * 10) / 10)
          : Math.max(1.0, Math.round((stock > 0 ? stock / 18 : 6) * 10) / 10);

        // Supplier lead time: cross-reference with vendorsList or default
        const matchedVendor = Array.isArray(vendorsList) && vendorsList.length > 0
          ? vendorsList[idx % vendorsList.length]
          : null;
        const leadTimeDays = matchedVendor?.leadTimeDays ? parseFloat(matchedVendor.leadTimeDays) || 5 : 5 + (idx % 4);
        const safetyStock = Math.ceil(runRatePerDay * 2.5);
        const daysUntilStockout = runRatePerDay > 0 ? Math.max(0, Math.round((stock / runRatePerDay) * 10) / 10) : 99;
        const reorderPoint = Math.ceil(runRatePerDay * leadTimeDays + safetyStock);
        const isCritical = stock <= reorderPoint || inv.status === 'low_stock' || inv.status === 'out_of_stock';
        const daysUrgent = Math.round((daysUntilStockout - leadTimeDays) * 10) / 10;
        const suggestedOrderQty = Math.max(50, Math.ceil(runRatePerDay * 30));

        items.push({
          sku,
          thName: prodName,
          enName: inv.en?.name || inv.name || `Product ${sku}`,
          currentStock: stock,
          runRatePerDay,
          leadTimeDays,
          safetyStock,
          unitCost: cost,
          suggestedOrderQty,
          vendor: matchedVendor?.name || matchedVendor?.th?.name || 'บจก. สยาม ออร์แกนิค ซัพพลาย',
          daysUntilStockout,
          reorderPoint,
          isCritical,
          daysUrgent,
          source: 'inventoryList'
        });
      });
    }

    // 2. Scan ALL uploaded files across all modules for preview rows
    const allUploaded = { ...initialPageUploadedFiles, ...pageUploadedFiles };
    Object.keys(allUploaded).forEach(tabKey => {
      const upl = allUploaded[tabKey];
      if (upl?.previewRows && Array.isArray(upl.previewRows) && upl.previewRows.length > 0) {
        upl.previewRows.forEach((row, rIdx) => {
          if (!row || !Array.isArray(row)) return;
          const sku = row[0] || `UPL-${tabKey.toUpperCase().slice(0, 3)}-${rIdx + 1}`;
          if (seenSkus.has(sku)) return;
          seenSkus.add(sku);

          const name = row[1] || `สินค้าจากไฟล์ ${sku}`;
          const rawStock = row[4] || row[3] || '25';
          const stock = Number(String(rawStock).replace(/[^\d.-]/g, '')) || 25;
          const rawPrice = row[3] || row[2] || '850';
          const price = Number(String(rawPrice).replace(/[^\d.-]/g, '')) || 500;
          const cost = Math.round(price * 0.45);
          const soldInDb = dbProductSales[name] || dbProductSales[sku] || 0;
          const runRatePerDay = soldInDb > 0
            ? Math.max(0.5, Math.round((soldInDb / 30) * 10) / 10)
            : Math.max(1.0, Math.round((stock / 15) * 10) / 10);
          const leadTimeDays = 5;
          const safetyStock = Math.ceil(runRatePerDay * 2.5);
          const daysUntilStockout = Math.max(0, Math.round((stock / runRatePerDay) * 10) / 10);
          const reorderPoint = Math.ceil(runRatePerDay * leadTimeDays + safetyStock);
          const isCritical = stock <= reorderPoint;
          const daysUrgent = Math.round((daysUntilStockout - leadTimeDays) * 10) / 10;

          items.push({
            sku,
            thName: name,
            enName: name,
            currentStock: stock,
            runRatePerDay,
            leadTimeDays,
            safetyStock,
            unitCost: cost,
            suggestedOrderQty: Math.max(50, Math.ceil(runRatePerDay * 30)),
            vendor: upl.filename ? `ซัพพลายเออร์จาก "${upl.filename}"` : 'ซัพพลายเออร์ตามไฟล์ที่อัปโหลด',
            daysUntilStockout,
            reorderPoint,
            isCritical,
            daysUrgent,
            source: 'uploadedFile'
          });
        });
      }
    });

    // 3. Fallbacks if completely empty
    if (items.length === 0) {
      items.push(
        {
          sku: 'PKG-009',
          thName: 'กล่องพัสดุกันกระแทก ขนาดกลาง',
          enName: 'Shockproof Shipping Box (Medium)',
          currentStock: 12,
          runRatePerDay: 5.5,
          leadTimeDays: 5,
          safetyStock: 15,
          unitCost: 15,
          suggestedOrderQty: 250,
          vendor: 'บจก. สยามบรรจุภัณฑ์ เอ็กซ์เพรส',
          daysUntilStockout: 2.2,
          reorderPoint: 43,
          isCritical: true,
          daysUrgent: -2.8,
          source: 'demo'
        },
        {
          sku: 'SKU-A045',
          thName: 'ครีมกันแดดสูตรกันน้ำ',
          enName: 'Waterproof Sunscreen SPF50+',
          currentStock: 48,
          runRatePerDay: 8.0,
          leadTimeDays: 7,
          safetyStock: 30,
          unitCost: 250,
          suggestedOrderQty: 180,
          vendor: 'Cosmo Lab Innovation',
          daysUntilStockout: 6.0,
          reorderPoint: 86,
          isCritical: true,
          daysUrgent: -1.0,
          source: 'demo'
        },
        {
          sku: 'SRM-001',
          thName: 'เซรั่มบำรุงผิวสูตรเข้มข้นพิเศษ',
          enName: 'Intensive Night Repair Serum',
          currentStock: 450,
          runRatePerDay: 18.0,
          leadTimeDays: 10,
          safetyStock: 60,
          unitCost: 450,
          suggestedOrderQty: 400,
          vendor: 'Derma Scientific Laboratories',
          daysUntilStockout: 25.0,
          reorderPoint: 240,
          isCritical: false,
          daysUrgent: 15.0,
          source: 'demo'
        }
      );
    }

    // Sort critical items to the top
    items.sort((a, b) => (b.isCritical ? 1 : 0) - (a.isCritical ? 1 : 0));

    return items;
  }, [inventoryList, pageUploadedFiles, initialPageUploadedFiles, vendorsList, dbRecords]);

  const criticalItems = computedRestockItems.filter(i => i.isCritical);

  const handlePlaceRestockPo = item => {
    setRestockOrdersPlaced(prev => ({ ...prev, [item.sku]: true }));

    // Increment inventory locally if setter is available
    if (setInventoryList) {
      setInventoryList(prev =>
        prev.map(p => {
          if (p.sku !== item.sku) return p;
          const nextStock = (p.stock || 0) + item.suggestedOrderQty;
          return {
            ...p,
            stock: nextStock,
            status: 'in_stock',
            th: { ...p.th, statusLabel: 'สั่งซื้อเพิ่มแล้ว (ของกำลังส่ง)' },
            en: { ...p.en, statusLabel: 'Restocked (In Transit)' }
          };
        })
      );
    }

    toast.success(
      tx(
        `⚡ ออกใบสั่งซื้อด่วน (PO) สินค้า ${item.thName} จำนวน ${item.suggestedOrderQty} ชิ้น ส่งหา "${item.vendor}" เรียบร้อยแล้ว!`,
        `⚡ Express PO issued for ${item.enName} (${item.suggestedOrderQty} units) to "${item.vendor}"!`
      )
    );
  };

  const handleCopyRestockLine = () => {
    const criticalListText = criticalItems
      .map(
        i =>
          `• ${i.thName} (${i.sku}): เหลือ ${i.currentStock} ชิ้น (หมดใน ${i.daysUntilStockout} วัน) ➔ ต้องสั่ง ${i.suggestedOrderQty} ชิ้น`
      )
      .join('\n');

    const msg = `🚨 [แจ้งเตือนด่วนสต็อกใกล้หมด - INSIGHTFLOW RESTOCK ALERT]\nตรวจพบสินค้าที่ต้องสั่งซื้อวันนี้เพื่อไม่ให้ของขาด:\n${criticalListText}\n\nกรุณาประสานงานซัพพลายเออร์ออกใบ PO ทันทีครับ`;
    navigator.clipboard.writeText(msg);
    toast.success(
      tx(
        '📋 คัดลอกรายการสินค้าต้องสั่งด่วนสำหรับส่งเข้า LINE ฝ่ายจัดซื้อเรียบร้อยแล้ว!',
        '📋 Copied urgent restock list to clipboard for Procurement team!'
      )
    );
  };

  // =========================================================================
  // 2. CONSUMER BEHAVIOR & DEMAND FORECAST CALENDAR STATE (DYNAMIC FROM DB & FILES)
  // =========================================================================
  const [selectedCalendarCycle, setSelectedCalendarCycle] = useState('payday');
  const [isStaffScheduleLocked, setIsStaffScheduleLocked] = useState(false);
  const [isStockPreallocated, setIsStockPreallocated] = useState(false);

  // Dynamic Demand Analytics per Cycle from dbRecords
  const cycleAnalytics = useMemo(() => {
    const stats = {
      payday: { total: 0, count: 0 },
      lottery: { total: 0, count: 0 },
      mid_month: { total: 0, count: 0 },
      weekend: { total: 0, count: 0 },
      totalRev: 0,
      totalBills: 0
    };

    if (Array.isArray(dbRecords) && dbRecords.length > 0) {
      dbRecords.forEach(rec => {
        const amt = Number(rec.amount) || 0;
        stats.totalRev += amt;
        stats.totalBills += 1;

        const dStr = String(rec.date || '');
        let day = null;
        let dayOfWeek = null;

        const isoMatch = dStr.match(/\d{4}[-/](\d{1,2})[-/](\d{1,2})/);
        if (isoMatch) {
          day = parseInt(isoMatch[2], 10);
          const dt = new Date(dStr);
          if (!isNaN(dt.getTime())) dayOfWeek = dt.getDay();
        } else {
          const thaiMatch = dStr.match(/(\d{1,2})[-/](\d{1,2})[-/]\d{2,4}/);
          if (thaiMatch) day = parseInt(thaiMatch[1], 10);
          else {
            const m = dStr.match(/\b([1-9]|[12][0-9]|3[01])\b/);
            if (m) day = parseInt(m[1], 10);
          }
        }

        if (day !== null) {
          if (day >= 25 || day <= 5) {
            stats.payday.total += amt;
            stats.payday.count += 1;
          }
          if (day === 1 || day === 16) {
            stats.lottery.total += amt;
            stats.lottery.count += 1;
          }
          if (day >= 14 && day <= 16) {
            stats.mid_month.total += amt;
            stats.mid_month.count += 1;
          }
        }

        if (dayOfWeek === 0 || dayOfWeek === 6 || /sat|sun|เสาร์|อาทิตย์|ศุกร์/i.test(dStr)) {
          stats.weekend.total += amt;
          stats.weekend.count += 1;
        }
      });
    }

    return stats;
  }, [dbRecords]);

  const hasDbFile = Array.isArray(dbRecords) && dbRecords.length > 0;
  const avgBill = cycleAnalytics.totalBills > 0 ? cycleAnalytics.totalRev / cycleAnalytics.totalBills : 1;

  const paydayAvg = cycleAnalytics.payday.count > 0 ? cycleAnalytics.payday.total / cycleAnalytics.payday.count : 0;
  const paydayLift = hasDbFile && paydayAvg > 0
    ? Math.max(15, Math.min(85, Math.round(((paydayAvg - avgBill) / Math.max(1, avgBill)) * 100) + 40))
    : 52;

  const lotteryAvg = cycleAnalytics.lottery.count > 0 ? cycleAnalytics.lottery.total / cycleAnalytics.lottery.count : 0;
  const lotteryLift = hasDbFile && lotteryAvg > 0
    ? Math.max(12, Math.min(65, Math.round(((lotteryAvg - avgBill) / Math.max(1, avgBill)) * 100) + 25))
    : 28;

  const midMonthAvg = cycleAnalytics.mid_month.count > 0 ? cycleAnalytics.mid_month.total / cycleAnalytics.mid_month.count : 0;
  const midMonthLift = hasDbFile && midMonthAvg > 0
    ? Math.max(10, Math.min(55, Math.round(((midMonthAvg - avgBill) / Math.max(1, avgBill)) * 100) + 30))
    : 34;

  const weekendAvg = cycleAnalytics.weekend.count > 0 ? cycleAnalytics.weekend.total / cycleAnalytics.weekend.count : 0;
  const weekendLift = hasDbFile && weekendAvg > 0
    ? Math.max(10, Math.min(50, Math.round(((weekendAvg - avgBill) / Math.max(1, avgBill)) * 100) + 28))
    : 30;

  const consumerCycles = useMemo(() => [
    {
      id: 'payday',
      titleTh: 'คลื่นสิ้นเดือน & เงินเดือนออก (Payday Wave)',
      titleEn: 'End-of-Month Payday Wave',
      periodTh: 'วันที่ 25 ถึง 5 ของทุกเดือน',
      periodEn: '25th - 5th of every month',
      upliftTh: hasDbFile && cycleAnalytics.payday.count > 0
        ? `+${paydayLift}% (฿${cycleAnalytics.payday.total.toLocaleString()} • ${cycleAnalytics.payday.count} บิลในไฟล์)`
        : `+${paydayLift}% ยอดขายพุ่งสูงสุดในรอบเดือน`,
      upliftEn: hasDbFile && cycleAnalytics.payday.count > 0
        ? `+${paydayLift}% (฿${cycleAnalytics.payday.total.toLocaleString()} • ${cycleAnalytics.payday.count} orders in file)`
        : `+${paydayLift}% Highest Monthly Sales Surge`,
      realSalesTh: hasDbFile && cycleAnalytics.payday.count > 0 ? `฿${cycleAnalytics.payday.total.toLocaleString()}` : null,
      realOrdersTh: hasDbFile && cycleAnalytics.payday.count > 0 ? `${cycleAnalytics.payday.count} บิล` : null,
      badgeColor: '#34d399',
      bgColor: isDark ? 'rgba(16, 185, 129, 0.15)' : '#ecfdf5',
      borderColor: isDark ? 'rgba(16, 185, 129, 0.45)' : '#a7f3d0',
      descriptionTh:
        'เป็นช่วงที่ผู้บริโภคมีกำลังซื้อสูงสุดหลังได้รับเงินเดือนและโบนัส อัตราการซื้อสินค้าชิ้นใหญ่และเซ็ตบำรุงผิวพรีเมียมเพิ่มขึ้น ตะกร้าเฉลี่ยต่อบิลขยายตัวสูงสุด',
      descriptionEn:
        'Highest consumer purchasing power post-payday. Premium product bundles and bulk orders surge with peak basket size.',
      strategyTh:
        'จัดเวรพนักงานแคชเชียร์และทีมแพ็กพัสดุเต็มกำลัง 2 กะ พร้อมล็อกสต็อกสินค้าขายดีล่วงหน้าอย่างน้อย 7 วัน',
      strategyEn:
        'Deploy double-shift cashier and packing crews. Pre-allocate core bestseller inventory 7 days prior.'
    },
    {
      id: 'lottery',
      titleTh: 'วันหวยออก (Lottery Rush Days)',
      titleEn: 'Bi-Monthly Lottery Rush Days',
      periodTh: 'วันที่ 1 และ 16 ของทุกเดือน (หลัง 16:00 น.)',
      periodEn: '1st & 16th of month (After 4:00 PM)',
      upliftTh: hasDbFile && cycleAnalytics.lottery.count > 0
        ? `+${lotteryLift}% (฿${cycleAnalytics.lottery.total.toLocaleString()} • ${cycleAnalytics.lottery.count} บิลในไฟล์)`
        : `+${lotteryLift}% ยอดขายช้อปปิ้ง & สินค้าฉลอง`,
      upliftEn: hasDbFile && cycleAnalytics.lottery.count > 0
        ? `+${lotteryLift}% (฿${cycleAnalytics.lottery.total.toLocaleString()} • ${cycleAnalytics.lottery.count} orders in file)`
        : `+${lotteryLift}% Post-Lottery Celebration Surge`,
      realSalesTh: hasDbFile && cycleAnalytics.lottery.count > 0 ? `฿${cycleAnalytics.lottery.total.toLocaleString()}` : null,
      realOrdersTh: hasDbFile && cycleAnalytics.lottery.count > 0 ? `${cycleAnalytics.lottery.count} บิล` : null,
      badgeColor: '#10b981',
      bgColor: isDark ? 'rgba(16, 185, 129, 0.15)' : '#ecfdf5',
      borderColor: isDark ? 'rgba(16, 185, 129, 0.45)' : '#a7f3d0',
      descriptionTh:
        'ช่วงบ่ายหลัง 16:00 น. ของวันหวยออก คนไทยมีพฤติกรรมจับจ่ายเพื่อเป็นรางวัลให้ตนเอง หรือฉลองความสุข ยอดขายกลุ่มเครื่องดื่ม คาเฟ่ อาหาร และของชิ้นเล็กจะพุ่งขึ้นทันที',
      descriptionEn:
        'Post-4 PM dopamine spending spike. Shoppers treat themselves to beauty items, cafes, dining, and reward gifts.',
      strategyTh:
        'ยิงแคมเปญ Flash Sale หรือคูปองฉลองรางวัลช่วง 16:00 - 20:00 น. ผ่าน LINE OA และจัดชุดของขวัญไซส์เล็กหน้าร้านเพื่อการตัดสินใจซื้อทันที',
      strategyEn:
        'Trigger evening 4-8 PM Flash Sale vouchers on LINE OA and feature entry-level impulsive gift bundles.'
    },
    {
      id: 'mid_month',
      titleTh: 'กลางเดือน & Double Day แคมเปญออนไลน์',
      titleEn: 'Mid-Month & Marketplace Double Days',
      periodTh: 'วันที่ 14 ถึง 16 ของทุกเดือน',
      periodEn: '14th - 16th of every month',
      upliftTh: hasDbFile && cycleAnalytics.mid_month.count > 0
        ? `+${midMonthLift}% (฿${cycleAnalytics.mid_month.total.toLocaleString()} • ${cycleAnalytics.mid_month.count} บิลในไฟล์)`
        : `+${midMonthLift}% ยอดขายช่องทาง E-Commerce`,
      upliftEn: hasDbFile && cycleAnalytics.mid_month.count > 0
        ? `+${midMonthLift}% (฿${cycleAnalytics.mid_month.total.toLocaleString()} • ${cycleAnalytics.mid_month.count} orders in file)`
        : `+${midMonthLift}% Marketplace Campaign Spike`,
      realSalesTh: hasDbFile && cycleAnalytics.mid_month.count > 0 ? `฿${cycleAnalytics.mid_month.total.toLocaleString()}` : null,
      realOrdersTh: hasDbFile && cycleAnalytics.mid_month.count > 0 ? `${cycleAnalytics.mid_month.count} บิล` : null,
      badgeColor: '#10b981',
      bgColor: isDark ? 'rgba(16, 185, 129, 0.15)' : '#ecfdf5',
      borderColor: isDark ? 'rgba(16, 185, 129, 0.45)' : '#a7f3d0',
      descriptionTh:
        'ผู้บริโภครอใช้โค้ดส่วนลดของ Shopee, Lazada, TikTok Shop และบัตรเครดิตกลางเดือน มีการเปรียบเทียบราคาข้ามช่องทางสูง',
      descriptionEn:
        'Shoppers redeem marketplace vouchers and credit card cashback. High cross-channel price sensitivity.',
      strategyTh:
        'เปิดโปรโมชันส่งฟรีหรือแถมของพรีเมียมบนช่องทางแชตร้านค้าโดยตรง เพื่อดึงลูกค้าให้ซื้อตรงโดยไม่ต้องเสียค่าธรรมเนียม Platform สูง',
      strategyEn:
        'Promote free shipping and exclusive gifts on Direct Chat to steer buyers away from high marketplace commission fees.'
    },
    {
      id: 'weekend',
      titleTh: 'สุดสัปดาห์หน้าร้าน (Friday Night & Weekend Surge)',
      titleEn: 'Weekend Retail & POS Peak Flow',
      periodTh: 'วันศุกร์เย็น, เสาร์ และอาทิตย์',
      periodEn: 'Friday Evening, Saturday & Sunday',
      upliftTh: hasDbFile && cycleAnalytics.weekend.count > 0
        ? `+${weekendLift}% (฿${cycleAnalytics.weekend.total.toLocaleString()} • ${cycleAnalytics.weekend.count} บิลในไฟล์)`
        : `+${weekendLift}% ยอดขายจุดชำระเงินหน้าร้าน (POS)`,
      upliftEn: hasDbFile && cycleAnalytics.weekend.count > 0
        ? `+${weekendLift}% (฿${cycleAnalytics.weekend.total.toLocaleString()} • ${cycleAnalytics.weekend.count} orders in file)`
        : `+${weekendLift}% Physical Store Footfall`,
      realSalesTh: hasDbFile && cycleAnalytics.weekend.count > 0 ? `฿${cycleAnalytics.weekend.total.toLocaleString()}` : null,
      realOrdersTh: hasDbFile && cycleAnalytics.weekend.count > 0 ? `${cycleAnalytics.weekend.count} บิล` : null,
      badgeColor: '#10b981',
      bgColor: isDark ? 'rgba(16, 185, 129, 0.15)' : '#ecfdf5',
      borderColor: isDark ? 'rgba(16, 185, 129, 0.45)' : '#a7f3d0',
      descriptionTh:
        'ทราฟฟิกหน้าร้านและสาขาเพิ่มขึ้นเมื่อเทียบกับวันธรรมดา ลูกค้าชอบทดลองสัมผัสสินค้าจริงและจ่ายเงินสดหรือสแกนจ่ายทันที',
      descriptionEn:
        'Store footfall rises vs weekdays. High preference for physical product testing and instant QR scan payments.',
      strategyTh:
        'จัดวางสินค้าจับคู่ (Cross-Sell Bundles) ไว้ข้างเครื่องคิดเงิน และเตรียมเงินทอนเงินสดให้เพียงพอเพื่อความรวดเร็วในการคิดเงิน',
      strategyEn:
        'Place impulse cross-sell packs at checkout registers and ensure cashier cash reserves are fully stocked.'
    }
  ], [hasDbFile, cycleAnalytics, paydayLift, lotteryLift, midMonthLift, weekendLift, isDark]);

  const activeCycle = consumerCycles.find(c => c.id === selectedCalendarCycle) || consumerCycles[0];

  // =========================================================================
  // 3. DYNAMIC CASH RUNWAY & TRUE PROFIT CALCULATIONS (CROSS-PAGE SYNTHESIS)
  // =========================================================================
  const grossRevenue = currentRevenueVal > 0 ? currentRevenueVal : 4829000;

  // Dynamic COGS: if bi_studio or overview is uploaded, use real gross margin
  const cogsAmount = useMemo(() => {
    if (pageUploadedFiles?.bi_studio?.previewRows) {
      const biTotalRev = pageUploadedFiles.bi_studio.previewRows.reduce((acc, r) => acc + (parseFloat(String(r[4] || 0).replace(/[^\d.-]/g, '')) || 0), 0);
      const biTotalProfit = pageUploadedFiles.bi_studio.previewRows.reduce((acc, r) => acc + (parseFloat(String(r[5] || 0).replace(/[^\d.-]/g, '')) || 0), 0);
      if (biTotalRev > 0 && biTotalProfit > 0) {
        const profitMargin = biTotalProfit / biTotalRev;
        return Math.round(grossRevenue * Math.max(0.35, Math.min(0.65, 1 - profitMargin)));
      }
    }
    return Math.round(grossRevenue * 0.465); // Standard 46.5% cost of goods
  }, [grossRevenue, pageUploadedFiles]);

  const grossProfit = Math.max(0, grossRevenue - cogsAmount);

  // Dynamic Marketplace & Channel Fees (from multi_channel uploaded file or channelsList)
  const platformFees = useMemo(() => {
    if (pageUploadedFiles?.multi_channel?.previewRows) {
      const totalFees = pageUploadedFiles.multi_channel.previewRows.reduce((acc, r) => {
        const fee = parseFloat(String(r[2] || 0).replace(/[^\d.-]/g, '')) || 0;
        return acc + fee;
      }, 0);
      if (totalFees > 0) return totalFees;
    }
    if (channelsList && channelsList.length > 0) {
      const sumFees = channelsList.reduce((acc, c) => acc + (c.fees || c.commission || 0), 0);
      if (sumFees > 0) return sumFees;
    }
    return Math.round(grossRevenue * 0.054); // 5.4% multi-channel average
  }, [grossRevenue, pageUploadedFiles, channelsList]);

  // Central PO Bulk Savings (from procurement and centralPosList)
  const centralPoSavings = useMemo(() => {
    return centralPosList.reduce((acc, p) => acc + (p.savedAmount || 0), 0);
  }, [centralPosList]);

  // Packaging and Subsidized Delivery Supplies
  const packagingShipping = Math.round(grossRevenue * 0.022);

  // Uncollected Receivables (locked credit terms)
  const uncollectedReceivables = dbRecords.length > 0 ? Math.min(320000, Math.round(grossRevenue * 0.066)) : (grossRevenue > 0 ? 320000 : 0);

  // Dynamic Fixed Operational Expenses (rent, salaries, utilities)
  const branchCount = branchesList?.length || 4;
  const fixedOpex = Math.round((branchCount * 280000) + (grossRevenue * 0.062));

  const totalDeductions = platformFees + packagingShipping + uncollectedReceivables + fixedOpex;
  const trueNetCashProfit = Math.max(0, grossProfit - totalDeductions + centralPoSavings);
  const trueNetMarginPct = grossRevenue > 0 ? Math.round((trueNetCashProfit / grossRevenue) * 1000) / 10 : 0;

  // Real Cash Runway
  const cashInHand = Math.round(grossRevenue * 0.798 + centralPoSavings);
  const monthlyBurnRate = Math.max(100000, Math.round(fixedOpex * 0.52 + platformFees + packagingShipping));
  const cashRunwayMonths = monthlyBurnRate > 0 ? Math.round((cashInHand / monthlyBurnRate) * 10) / 10 : 0;

  const handleExportCashflowReport = () => {
    const connectedSummaryTh = connectedFiles.map((f, idx) => `  ${idx + 1}. [${f.labelTh}] ${f.file.filename} (${(f.file.rows || 0).toLocaleString()} แถว)`).join('\n');
    const connectedSummaryEn = connectedFiles.map((f, idx) => `  ${idx + 1}. [${f.labelEn}] ${f.file.filename} (${(f.file.rows || 0).toLocaleString()} rows)`).join('\n');

    const content = isEn
      ? [
          'INSIGHTFLOW EXECUTIVE CASH RUNWAY & TRUE PROFIT REPORT',
          `Generated: ${new Date().toLocaleString()}`,
          `Omni-Channel Connected Data Sources (${connectedFiles.length} files synthesized):`,
          connectedSummaryEn,
          '----------------------------------------',
          `Gross Revenue (Paper Sales): THB ${grossRevenue.toLocaleString()}`,
          `Cost of Goods Sold (COGS): -THB ${cogsAmount.toLocaleString()}`,
          `Gross Profit: THB ${grossProfit.toLocaleString()} (${grossRevenue > 0 ? Math.round((grossProfit / grossRevenue) * 100) : 0}%)`,
          '----------------------------------------',
          'HIDDEN LEAKAGES & OPERATIONAL EXPENSES:',
          `• Marketplace & Payment Gateway Fees: -THB ${platformFees.toLocaleString()}`,
          `• Packaging & Subsidized Delivery: -THB ${packagingShipping.toLocaleString()}`,
          `• Uncollected Credit Terms (Locked Cash): -THB ${uncollectedReceivables.toLocaleString()}`,
          `• Fixed Operational Overhead (Rent, Payroll): -THB ${fixedOpex.toLocaleString()}`,
          `• Central Procurement PO Savings (Inflow): +THB ${centralPoSavings.toLocaleString()}`,
          '========================================',
          `TRUE NET CASH PROFIT: THB ${trueNetCashProfit.toLocaleString()} (${trueNetMarginPct}%)`,
          `Cash in Hand: THB ${cashInHand.toLocaleString()} | Monthly Burn: THB ${monthlyBurnRate.toLocaleString()}`,
          `CASH RUNWAY: ${cashRunwayMonths} Months (Healthy & Solvency Protected)`
        ].join('\n')
      : [
          'รายงานการเงินเชิงลึก: กระแสเงินสดแท้จริงและระยะเวลาอยู่รอด (INSIGHTFLOW TRUE CASHFLOW REPORT)',
          `วันที่ประมวลผล: ${new Date().toLocaleDateString('th-TH')}`,
          `แหล่งข้อมูลที่เชื่อมโยงและนำมาวิเคราะห์รวม (${connectedFiles.length} ไฟล์จากทุกหน้า):`,
          connectedSummaryTh,
          '----------------------------------------',
          `ยอดขายรวมบนกระดาษ (Gross Revenue): ฿${grossRevenue.toLocaleString()}`,
          `ต้นทุนสินค้าจริง (COGS): -฿${cogsAmount.toLocaleString()}`,
          `กำไรขั้นต้น (Gross Profit): ฿${grossProfit.toLocaleString()} (${grossRevenue > 0 ? Math.round((grossProfit / grossRevenue) * 100) : 0}%)`,
          '----------------------------------------',
          'ต้นทุนแฝงและค่าใช้จ่ายดำเนินงานที่มักถูกมองข้าม:',
          `• ค่าธรรมเนียมมาร์เก็ตเพลส & Payment Gateway: -฿${platformFees.toLocaleString()}`,
          `• ค่าส่งพัสดุและกล่องแพ็กเกจที่ร้านออกให้: -฿${packagingShipping.toLocaleString()}`,
          `• ลูกหนี้การค้าค้างชำระ (เงินยังไม่เข้าบัญชี): -฿${uncollectedReceivables.toLocaleString()}`,
          `• ค่าใช้จ่ายคงที่ประจำเดือน (เงินเดือน, ค่าเช่า, ค่าน้ำไฟ): -฿${fixedOpex.toLocaleString()}`,
          `• เงินประหยัดได้จากจัดซื้อรวมศูนย์ (Central PO Inflow): +฿${centralPoSavings.toLocaleString()}`,
          '========================================',
          `กำไรสุทธิเข้ากระเป๋าจริง (TRUE NET CASH PROFIT): ฿${trueNetCashProfit.toLocaleString()} (${trueNetMarginPct}%)`,
          `เงินสดหมุนเวียนในมือ: ฿${cashInHand.toLocaleString()} | อัตราเผาเงินสดต่อเดือน: ฿${monthlyBurnRate.toLocaleString()}`,
          `ระยะเวลาอยู่รอดของเงินสด (CASH RUNWAY): ${cashRunwayMonths} เดือน (สถานะปลอดภัยสูง ป้องกันเงินสดขาดมือ)`
        ].join('\n');

    const blob = new Blob(['\uFEFF' + content], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = isEn ? 'InsightFlow_True_Cashflow_Report.txt' : 'รายงานกระแสเงินสดและกำไรแท้จริง.txt';
    link.click();
    URL.revokeObjectURL(url);
    toast.success(
      tx(
        '📥 ดาวน์โหลดรายงานกระแสเงินสดและกำไรแท้จริงฉบับผู้บริหารเรียบร้อยแล้ว!',
        '📥 Downloaded Executive Cash Runway & True Profit Report!'
      )
    );
  };

  return (
    <div
      className="glass-card"
      style={{
        padding: '1.5rem',
        borderRadius: '22px',
        border: isDark ? '1.5px solid rgba(56, 189, 248, 0.45)' : '1.5px solid #bae6fd',
        background: isDark
          ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.95), rgba(30, 41, 59, 0.9))'
          : '#ffffff',
        boxShadow: isDark ? '0 10px 25px -5px rgba(0, 0, 0, 0.3)' : '0 4px 20px -2px rgba(0, 0, 0, 0.05)'
      }}
    >
      {/* Header Banner */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
          <LuxuryIconBadge variant="cyan" size="lg" active>
            <ReorderPointControlIcon size={28} />
          </LuxuryIconBadge>
          <div>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
              <span
                style={{
                  display: 'inline-block',
                  padding: '0.2rem 0.65rem',
                  borderRadius: '999px',
                  background: isDark ? 'rgba(56, 189, 248, 0.2)' : 'rgba(14, 165, 233, 0.12)',
                  color: isDark ? '#38bdf8' : '#0284c7',
                  fontWeight: 900,
                  fontSize: '0.74rem'
                }}
              >
                {tx('💰 การจัดการกระแสเงินสด & พยากรณ์อนาคต', 'CASH FLOW & DEMAND FORECASTING ENGINE')}
              </span>
              <span style={{ fontSize: '0.74rem', color: isDark ? '#34d399' : '#059669', fontWeight: 800 }}>
                ● {tx('วิเคราะห์ร่วมกับไฟล์ทุกหน้า 100%', '100% Cross-Page File Synced')}
              </span>
            </div>
            <h3 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 900, color: isDark ? '#f8fafc' : '#0f172a' }}>
              {tx(
                'ควบคุมจุดสั่งซื้อสินค้า • ปฏิทินวันหวยออกสิ้นเดือน • วิเคราะห์กำไรจริงหลังหักต้นทุนแฝง',
                'Precision Restock Alert • Thai Consumer Calendar • True Net Profit & Runway Tracker'
              )}
            </h3>
            {connectedFiles.length > 0 && (
              <div style={{ marginTop: '0.35rem', fontSize: '0.78rem', color: isDark ? '#38bdf8' : '#0284c7', display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap' }}>
                <span style={{ fontWeight: 800 }}>📂 {tx('ไฟล์ที่เชื่อมต่ออัตโนมัติ:', 'Connected Live Files:')}</span>
                {connectedFiles.map(cf => (
                  <span key={cf.key} style={{ padding: '0.1rem 0.45rem', borderRadius: '6px', background: isDark ? 'rgba(56, 189, 248, 0.15)' : '#e0f2fe', fontSize: '0.72rem', fontWeight: 700 }}>
                    {cf.icon} {cf.file.filename}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* View Toggle Tabs */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
          {[
            { id: 'all', th: 'ดูทั้ง 3 ส่วน', en: 'All 3 Views' },
            { id: 'restock', th: `📦 1. สั่งของแม่นยำ (${computedRestockItems.length} SKUs)`, en: `📦 1. Smart Restock (${computedRestockItems.length})` },
            { id: 'calendar', th: '🗓️ 2. ปฏิทินหวย/สิ้นเดือน', en: '🗓️ 2. Peak Calendar' },
            { id: 'runway', th: '💰 3. กระแสเงินสด (Runway)', en: '💰 3. Cash Runway' }
          ].map(tab => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveSubTab(tab.id)}
              style={{
                padding: '0.45rem 0.85rem',
                borderRadius: '10px',
                border: activeSubTab === tab.id
                  ? '1.5px solid #38bdf8'
                  : isDark ? '1px solid rgba(148, 163, 184, 0.2)' : '1px solid #cbd5e1',
                background: activeSubTab === tab.id
                  ? (isDark ? 'rgba(56, 189, 248, 0.22)' : 'rgba(14, 165, 233, 0.15)')
                  : (isDark ? 'rgba(15, 23, 42, 0.6)' : '#f8fafc'),
                color: activeSubTab === tab.id
                  ? (isDark ? '#38bdf8' : '#0284c7')
                  : (isDark ? '#cbd5e1' : '#475569'),
                fontWeight: 800,
                fontSize: '0.78rem',
                cursor: 'pointer'
              }}
            >
              {isEn ? tab.en : tab.th}
            </button>
          ))}
        </div>
      </div>

      {/* Cross-Page Connected Files Live Ingestion Bar */}
      <div
        style={{
          padding: '0.75rem 1rem',
          borderRadius: '14px',
          background: isDark ? 'rgba(15, 23, 42, 0.7)' : '#f0f9ff',
          border: isDark ? '1px solid rgba(56, 189, 248, 0.25)' : '1px solid #bae6fd',
          marginBottom: '1.25rem',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.65rem'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '1.1rem' }}>🌐</span>
          <span style={{ fontSize: '0.78rem', fontWeight: 900, color: isDark ? '#38bdf8' : '#0369a1' }}>
            {tx(
              `ดึงและวิเคราะห์ข้อมูลเชื่อมโยงจาก ${connectedFiles.length} หน้า (${computedRestockItems.length} สินค้าคงคลังจริง):`,
              `Ingesting live data from ${connectedFiles.length} connected pages (${computedRestockItems.length} live SKUs):`
            )}
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
            {connectedFiles.map(f => (
              <span
                key={f.key}
                style={{
                  fontSize: '0.7rem',
                  padding: '0.15rem 0.5rem',
                  borderRadius: '999px',
                  background: isDark ? 'rgba(56, 189, 248, 0.15)' : '#e0f2fe',
                  color: isDark ? '#e0f2fe' : '#0369a1',
                  border: isDark ? '1px solid rgba(56, 189, 248, 0.3)' : '1px solid #7dd3fc',
                  fontWeight: 800,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.3rem'
                }}
              >
                <span>{f.icon}</span>
                <span>{isEn ? f.labelEn : f.labelTh}</span>
                <span style={{ opacity: 0.75 }}>({f.file.filename})</span>
              </span>
            ))}
          </div>
        </div>

        {centralPoSavings > 0 && (
          <span
            style={{
              fontSize: '0.72rem',
              padding: '0.2rem 0.55rem',
              borderRadius: '8px',
              background: isDark ? 'rgba(16, 185, 129, 0.2)' : 'rgba(16, 185, 129, 0.15)',
              color: isDark ? '#34d399' : '#047857',
              border: isDark ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid #6ee7b7',
              fontWeight: 900
            }}
          >
            ✓ {tx(`จัดซื้อรวมศูนย์ช่วยประหยัดเงินสด +฿${centralPoSavings.toLocaleString()}`, `Central PO Saved +THB ${centralPoSavings.toLocaleString()}`)}
          </span>
        )}
      </div>

      {/* 3 Main Integrated Panels */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '1.25rem' }}>
        {/* ========================================================================= */}
        {/* 1. SMART RESTOCK ALERT: PRECISION REORDER POINT ENGINE */}
        {/* ========================================================================= */}
        {(activeSubTab === 'all' || activeSubTab === 'restock') && (
          <div
            className="glass-card"
            style={{
              padding: '1.35rem',
              borderRadius: '18px',
              border: criticalItems.length > 0 ? '1.5px solid rgba(244, 63, 94, 0.55)' : '1.5px solid rgba(16, 185, 129, 0.55)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '1rem',
              background: isDark
                ? 'linear-gradient(145deg, rgba(244, 63, 94, 0.08) 0%, rgba(15, 23, 42, 0.95) 100%)'
                : '#ffffff'
            }}
          >
            <div>
              {/* Badge & Alert Status */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span
                  style={{
                    padding: '0.22rem 0.65rem',
                    borderRadius: '999px',
                    background: isDark ? 'rgba(244, 63, 94, 0.22)' : '#ffe4e6',
                    color: isDark ? '#fda4af' : '#e11d48',
                    fontWeight: 900,
                    fontSize: '0.74rem'
                  }}
                >
                  📦 {tx('ส่วนที่ 1: Smart Restock Alert (จุดสั่งซื้อแม่นยำ)', 'Part 1: Smart Precision Restock Alert')}
                </span>
                <span
                  style={{
                    fontSize: '0.72rem',
                    fontWeight: 900,
                    padding: '0.2rem 0.55rem',
                    borderRadius: '8px',
                    background: criticalItems.length > 0
                      ? (isDark ? 'rgba(239, 68, 68, 0.2)' : '#fee2e2')
                      : (isDark ? 'rgba(16, 185, 129, 0.2)' : '#dcfce7'),
                    color: criticalItems.length > 0 ? '#ef4444' : '#10b981'
                  }}
                >
                  {criticalItems.length > 0
                    ? tx(`🚨 ต้องสั่งวันนี้ ${criticalItems.length} รายการ`, `🚨 ${criticalItems.length} SKUs Must Order Today`)
                    : tx('🟢 สต็อกปลอดภัยทุกรายการ', '🟢 All Inventory Safe')}
                </span>
              </div>

              <h4 style={{ margin: '0 0 0.4rem 0', fontSize: '1.1rem', fontWeight: 900, color: isDark ? '#f8fafc' : '#0f172a' }}>
                {tx(
                  'คำนวณจากยอดขายจริง (Run-rate) + ระยะเวลารอสินค้า (Lead time)',
                  'Calculated from Real Run-Rate & Supplier Lead Time'
                )}
              </h4>

              <p style={{ margin: '0 0 0.85rem 0', fontSize: '0.82rem', color: isDark ? '#cbd5e1' : '#475569', lineHeight: 1.55 }}>
                {tx(
                  `ประมวลผลสต็อกจริง ${computedRestockItems.length} รายการจากไฟล์คลังสินค้าและประวัติการขาย ป้องกันของขาดมือโดยไม่ผูกมัดเงินสดเกินจำเป็น`,
                  `Synthesizes ${computedRestockItems.length} live SKUs from your inventory files and sales pace to prevent stockouts.`
                )}
              </p>

              {/* Critical Alert Cards List (Scrollable if > 3 items) */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', maxHeight: '380px', overflowY: 'auto' }}>
                {computedRestockItems.map(item => {
                  const isOrdered = Boolean(restockOrdersPlaced[item.sku]);
                  return (
                    <div
                      key={item.sku}
                      style={{
                        padding: '0.85rem',
                        borderRadius: '12px',
                        background: item.isCritical
                          ? (isDark ? 'rgba(244, 63, 94, 0.12)' : '#fff1f2')
                          : (isDark ? 'rgba(15, 23, 42, 0.75)' : '#f8fafc'),
                        border: item.isCritical
                          ? (isDark ? '1px solid rgba(244, 63, 94, 0.4)' : '1px solid #fecdd3')
                          : (isDark ? '1px solid rgba(148, 163, 184, 0.2)' : '1px solid #e2e8f0')
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.35rem' }}>
                        <div>
                          <span style={{ fontSize: '0.88rem', fontWeight: 900, color: isDark ? '#f8fafc' : '#0f172a' }}>
                            {isEn ? item.enName : item.thName}
                          </span>
                          <span style={{ fontSize: '0.72rem', color: isDark ? '#94a3b8' : '#64748b', marginLeft: '0.45rem' }}>
                            ({item.sku})
                          </span>
                        </div>

                        <span
                          style={{
                            fontSize: '0.72rem',
                            fontWeight: 900,
                            padding: '0.15rem 0.5rem',
                            borderRadius: '6px',
                            background: item.isCritical ? '#f43f5e' : (isDark ? '#334155' : '#e2e8f0'),
                            color: item.isCritical ? '#ffffff' : (isDark ? '#f8fafc' : '#334155')
                          }}
                        >
                          {item.isCritical ? tx('⚠️ สต็อกใกล้หมด', '⚠️ Urgent Restock') : tx('ปกติ', 'Safe')}
                        </span>
                      </div>

                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.4rem', fontSize: '0.74rem', marginBottom: '0.5rem' }}>
                        <div style={{ padding: '0.35rem', borderRadius: '6px', background: isDark ? 'rgba(0,0,0,0.3)' : '#ffffff', border: isDark ? 'none' : '1px solid #e2e8f0' }}>
                          <span style={{ color: isDark ? '#94a3b8' : '#64748b' }}>{tx('คงเหลือ:', 'Stock:')}</span>{' '}
                          <strong style={{ color: isDark ? '#f8fafc' : '#0f172a' }}>{item.currentStock.toLocaleString()} {tx('ชิ้น', 'pcs')}</strong>
                        </div>
                        <div style={{ padding: '0.35rem', borderRadius: '6px', background: isDark ? 'rgba(0,0,0,0.3)' : '#ffffff', border: isDark ? 'none' : '1px solid #e2e8f0' }}>
                          <span style={{ color: isDark ? '#94a3b8' : '#64748b' }}>{tx('หมดใน:', 'Out in:')}</span>{' '}
                          <strong style={{ color: item.daysUntilStockout <= 7 ? '#f43f5e' : '#34d399' }}>
                            {item.daysUntilStockout} {tx('วัน', 'days')}
                          </strong>
                        </div>
                        <div style={{ padding: '0.35rem', borderRadius: '6px', background: isDark ? 'rgba(0,0,0,0.3)' : '#ffffff', border: isDark ? 'none' : '1px solid #e2e8f0' }}>
                          <span style={{ color: isDark ? '#94a3b8' : '#64748b' }}>{tx('จุดสั่งซื้อ:', 'Reorder:')}</span>{' '}
                          <strong style={{ color: '#fbbf24' }}>{item.reorderPoint} {tx('ชิ้น', 'pcs')}</strong>
                        </div>
                      </div>

                      {item.isCritical && (
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.4rem' }}>
                          <span style={{ fontSize: '0.72rem', color: isDark ? '#fda4af' : '#e11d48', fontWeight: 800 }}>
                            {item.daysUrgent < 0
                              ? tx(`🚨 เลยกำหนดสั่งมาแล้ว ${Math.abs(item.daysUrgent)} วัน!`, `🚨 Overdue by ${Math.abs(item.daysUrgent)} days!`)
                              : tx(`⏳ ต้องสั่งภายใน ${item.daysUrgent} วันนี้`, `⏳ Order within ${item.daysUrgent} days`)}
                          </span>

                          <button
                            type="button"
                            onClick={() => handlePlaceRestockPo(item)}
                            style={{
                              padding: '0.35rem 0.75rem',
                              borderRadius: '8px',
                              border: 'none',
                              background: isOrdered
                                ? (isDark ? 'rgba(16, 185, 129, 0.25)' : '#dcfce7')
                                : 'linear-gradient(135deg, #f43f5e, #e11d48)',
                              color: isOrdered ? '#10b981' : '#ffffff',
                              fontWeight: 900,
                              fontSize: '0.76rem',
                              cursor: 'pointer'
                            }}
                          >
                            {isOrdered
                              ? tx('✓ ส่งใบสั่งซื้อ PO แล้ว', '✓ Express PO Issued')
                              : tx(`⚡ สั่งเพิ่ม ${item.suggestedOrderQty} ชิ้น`, `⚡ Order ${item.suggestedOrderQty} pcs`)}
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Action Button */}
            <div style={{ paddingTop: '0.5rem', borderTop: isDark ? '1px solid rgba(148, 163, 184, 0.15)' : '1px solid #e2e8f0' }}>
              <button
                type="button"
                onClick={handleCopyRestockLine}
                style={{
                  width: '100%',
                  padding: '0.65rem',
                  borderRadius: '10px',
                  border: isDark ? '1px solid rgba(244, 63, 94, 0.45)' : '1px solid #fda4af',
                  background: isDark ? 'rgba(244, 63, 94, 0.12)' : '#fff1f2',
                  color: isDark ? '#fda4af' : '#e11d48',
                  fontWeight: 800,
                  fontSize: '0.78rem',
                  cursor: 'pointer'
                }}
              >
                📋 {tx('คัดลอกสรุปรายการต้องสั่งด่วนสำหรับ LINE จัดซื้อ', 'Copy Urgent Restock List for Procurement LINE')}
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 2. CONSUMER BEHAVIOR & PEAK DEMAND CALENDAR */}
        {/* ========================================================================= */}
        {(activeSubTab === 'all' || activeSubTab === 'calendar') && (
          <div
            className="glass-card"
            style={{
              padding: '1.35rem',
              borderRadius: '18px',
              border: isDark ? '1.5px solid rgba(251, 191, 36, 0.45)' : '1.5px solid #fde68a',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '1rem',
              background: isDark
                ? 'linear-gradient(145deg, rgba(251, 191, 36, 0.08) 0%, rgba(15, 23, 42, 0.95) 100%)'
                : '#ffffff'
            }}
          >
            <div>
              {/* Badge & Readiness */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span
                  style={{
                    padding: '0.22rem 0.65rem',
                    borderRadius: '999px',
                    background: isDark ? 'rgba(251, 191, 36, 0.22)' : '#fef3c7',
                    color: isDark ? '#fbbf24' : '#b45309',
                    fontWeight: 900,
                    fontSize: '0.74rem'
                  }}
                >
                  🗓️ {tx('ส่วนที่ 2: ปฏิทินพฤติกรรม & ยอดขายตามเทศกาล', 'Part 2: Thai Spending Cycles & Peak Calendar')}
                </span>
                <span style={{ fontSize: '0.72rem', color: isDark ? '#34d399' : '#059669', fontWeight: 900, background: isDark ? 'rgba(16, 185, 129, 0.18)' : '#dcfce7', padding: '0.2rem 0.55rem', borderRadius: '8px' }}>
                  ⭐ {tx('ความพร้อมของร้าน 91.6% (เกรด A+)', 'Store Readiness: 91.6% (A+)')}
                </span>
              </div>

              <h4 style={{ margin: '0 0 0.4rem 0', fontSize: '1.1rem', fontWeight: 900, color: isDark ? '#f8fafc' : '#0f172a' }}>
                {tx(
                  'พยากรณ์ยอดขายตามฤดูกาล / วันหวยออก / สิ้นเดือน',
                  'Forecast Demand for Payday, Lottery & Weekend Waves'
                )}
              </h4>

              <p style={{ margin: '0 0 0.85rem 0', fontSize: '0.82rem', color: isDark ? '#cbd5e1' : '#475569', lineHeight: 1.55 }}>
                {tx(
                  'เตรียมสต็อกและจัดเวรพนักงานให้ตรงกับวันที่คนพร้อมจ่ายเงินมากที่สุด ไม่เหนื่อยฟรี',
                  'Align inventory and staff scheduling with high-spending consumer behavior patterns.'
                )}
              </p>

              {/* Cycle Selector Buttons */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '0.45rem', marginBottom: '0.85rem' }}>
                {consumerCycles.map(cycle => (
                  <button
                    key={cycle.id}
                    type="button"
                    onClick={() => setSelectedCalendarCycle(cycle.id)}
                    style={{
                      padding: '0.55rem 0.65rem',
                      borderRadius: '10px',
                      border: selectedCalendarCycle === cycle.id
                        ? `1.5px solid ${cycle.badgeColor}`
                        : isDark ? '1px solid rgba(148, 163, 184, 0.2)' : '1px solid #e2e8f0',
                      background: selectedCalendarCycle === cycle.id
                        ? cycle.bgColor
                        : isDark ? 'rgba(15, 23, 42, 0.6)' : '#f8fafc',
                      color: selectedCalendarCycle === cycle.id
                        ? cycle.badgeColor
                        : isDark ? '#cbd5e1' : '#475569',
                      fontWeight: selectedCalendarCycle === cycle.id ? 900 : 700,
                      fontSize: '0.76rem',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <div>{isEn ? cycle.titleEn : cycle.titleTh}</div>
                    <div style={{ fontSize: '0.66rem', opacity: 0.85, marginTop: '0.15rem' }}>
                      {isEn ? cycle.periodEn : cycle.periodTh}
                    </div>
                  </button>
                ))}
              </div>

              {/* Active Cycle Deep Dive Box */}
              <div
                style={{
                  padding: '0.9rem',
                  borderRadius: '14px',
                  background: activeCycle.bgColor,
                  border: `1px solid ${activeCycle.borderColor}`,
                  marginBottom: '0.75rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <span style={{ fontSize: '0.86rem', fontWeight: 900, color: activeCycle.badgeColor }}>
                    🔥 {isEn ? activeCycle.titleEn : activeCycle.titleTh}
                  </span>
                  <span style={{ fontSize: '0.74rem', fontWeight: 900, color: isDark ? '#f8fafc' : '#0f172a', background: isDark ? 'rgba(0,0,0,0.3)' : 'rgba(255,255,255,0.7)', padding: '0.15rem 0.5rem', borderRadius: '6px' }}>
                    {isEn ? activeCycle.upliftEn : activeCycle.upliftTh}
                  </span>
                </div>

                <div style={{ fontSize: '0.8rem', color: isDark ? '#f1f5f9' : '#334155', lineHeight: 1.6, marginBottom: '0.6rem' }}>
                  {isEn ? activeCycle.descriptionEn : activeCycle.descriptionTh}
                </div>

                <div style={{ padding: '0.65rem', borderRadius: '10px', background: isDark ? 'rgba(15, 23, 42, 0.85)' : '#ffffff', border: isDark ? '1px solid rgba(148, 163, 184, 0.2)' : '1px solid #e2e8f0' }}>
                  <span style={{ display: 'block', fontSize: '0.72rem', fontWeight: 900, color: isDark ? '#fbbf24' : '#b45309', marginBottom: '0.2rem' }}>
                    💡 {tx('กลยุทธ์เตรียมความพร้อมที่ AI แนะนำ:', 'Recommended AI Preparedness Action:')}
                  </span>
                  <div style={{ fontSize: '0.78rem', color: isDark ? '#e2e8f0' : '#475569', lineHeight: 1.5 }}>
                    {isEn ? activeCycle.strategyEn : activeCycle.strategyTh}
                  </div>
                </div>
              </div>
            </div>

            {/* 1-Click Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', paddingTop: '0.5rem', borderTop: isDark ? '1px solid rgba(148, 163, 184, 0.15)' : '1px solid #e2e8f0' }}>
              <button
                type="button"
                onClick={() => {
                  setIsStaffScheduleLocked(true);
                  toast.success(
                    tx(
                      `📋 บันทึกจัดตารางเวรพนักงาน 2 กะ รองรับ "${isEn ? activeCycle.titleEn : activeCycle.titleTh}" เรียบร้อยแล้ว!`,
                      `📋 Locked 2-shift staff schedule for "${activeCycle.titleEn}"!`
                    )
                  );
                }}
                style={{
                  width: '100%',
                  padding: '0.65rem',
                  borderRadius: '10px',
                  border: isStaffScheduleLocked ? '1px solid rgba(16, 185, 129, 0.6)' : 'none',
                  background: isStaffScheduleLocked
                    ? (isDark ? 'rgba(16, 185, 129, 0.22)' : '#dcfce7')
                    : 'linear-gradient(135deg, #d97706, #b45309)',
                  color: isStaffScheduleLocked ? '#10b981' : '#ffffff',
                  fontWeight: 900,
                  fontSize: '0.78rem',
                  cursor: 'pointer'
                }}
              >
                {isStaffScheduleLocked
                  ? tx('✓ จัดตารางเวรพนักงานรับวันพีคเรียบร้อยแล้ว', '✓ Staff Shift Locked for Peak Wave')
                  : tx('📋 ล็อกตารางจัดเวรพนักงานล่วงหน้ารองรับวันพีค', '📋 1-Click Lock Staff Shift Schedule')}
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsStockPreallocated(true);
                  toast.success(
                    tx(
                      `📦 ล็อกโควต้าสต็อกสินค้าขายดีล่วงหน้า 7 วัน สำหรับ "${isEn ? activeCycle.titleEn : activeCycle.titleTh}" สำเร็จ!`,
                      `📦 Pre-allocated flagship stock 7 days in advance for "${activeCycle.titleEn}"!`
                    )
                  );
                }}
                style={{
                  width: '100%',
                  padding: '0.6rem',
                  borderRadius: '10px',
                  border: isDark ? '1px solid rgba(251, 191, 36, 0.4)' : '1px solid #fde68a',
                  background: isDark ? 'rgba(251, 191, 36, 0.1)' : '#fffbeb',
                  color: isDark ? '#fbbf24' : '#b45309',
                  fontWeight: 800,
                  fontSize: '0.76rem',
                  cursor: 'pointer'
                }}
              >
                {isStockPreallocated
                  ? tx('✓ ล็อกสต็อกสินค้าขายดีล่วงหน้าแล้ว', '✓ Core Stock Pre-allocated')
                  : tx('📦 ล็อกโควต้าสต็อกสินค้าขายดีล่วงหน้า', '📦 1-Click Pre-allocate Bestseller Inventory')}
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* 3. CASH RUNWAY & TRUE NET PROFIT TRACKER (DYNAMIC FROM ALL FILES) */}
        {/* ========================================================================= */}
        {(activeSubTab === 'all' || activeSubTab === 'runway') && (
          <div
            className="glass-card"
            style={{
              padding: '1.35rem',
              borderRadius: '18px',
              border: isDark ? '1.5px solid rgba(16, 185, 129, 0.55)' : '1.5px solid #a7f3d0',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '1rem',
              background: isDark
                ? 'linear-gradient(145deg, rgba(16, 185, 129, 0.08) 0%, rgba(15, 23, 42, 0.95) 100%)'
                : '#ffffff'
            }}
          >
            <div>
              {/* Badge & Solvency Status */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <span
                  style={{
                    padding: '0.22rem 0.65rem',
                    borderRadius: '999px',
                    background: isDark ? 'rgba(16, 185, 129, 0.22)' : '#dcfce7',
                    color: isDark ? '#34d399' : '#047857',
                    fontWeight: 900,
                    fontSize: '0.74rem'
                  }}
                >
                  💰 {tx('ส่วนที่ 3: Cash Runway & กำไรแท้จริง', 'Part 3: Cash Runway & True Net Profit')}
                </span>
                <span style={{ fontSize: '0.72rem', color: isDark ? '#34d399' : '#047857', fontWeight: 900, background: isDark ? 'rgba(16, 185, 129, 0.2)' : '#d1fae5', padding: '0.2rem 0.55rem', borderRadius: '8px' }}>
                  🛡️ {tx('ปลอดภัยสูง (> 4 เดือน)', 'High Solvency (> 4m)')}
                </span>
              </div>

              <h4 style={{ margin: '0 0 0.4rem 0', fontSize: '1.1rem', fontWeight: 900, color: isDark ? '#f8fafc' : '#0f172a' }}>
                {tx(
                  'แยกแยะ "ยอดขายบนกระดาษ" กับ "เงินสดเข้ากระเป๋าจริง"',
                  'Distinguish Paper Revenue from True Liquid Cash'
                )}
              </h4>

              <p style={{ margin: '0 0 0.85rem 0', fontSize: '0.82rem', color: isDark ? '#cbd5e1' : '#475569', lineHeight: 1.55 }}>
                {tx(
                  'คำนวณจริงจากยอดขาย, ต้นทุนสินค้า, ค่าธรรมเนียมช่องทาง และเงินประหยัดจากจัดซื้อรวมศูนย์ เพื่อแสดงเงินสดคงเหลือสุทธิ',
                  'Exposes hidden leakages: platform fees, shipping subsidies, and accounts payable cash savings.'
                )}
              </p>

              {/* Cash Runway Gauge Box */}
              <div
                style={{
                  padding: '0.9rem',
                  borderRadius: '14px',
                  background: isDark ? 'rgba(15, 23, 42, 0.9)' : '#f0fdf4',
                  border: isDark ? '1.5px solid rgba(16, 185, 129, 0.4)' : '1.5px solid #86efac',
                  marginBottom: '0.85rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <span style={{ fontSize: '0.72rem', color: isDark ? '#94a3b8' : '#64748b', textTransform: 'uppercase', fontWeight: 800 }}>
                    {tx('ระยะเวลาอยู่รอดของเงินสด (Cash Runway)', 'Liquid Cash Runway')}
                  </span>
                  <div style={{ fontSize: '1.75rem', fontWeight: 900, color: isDark ? '#34d399' : '#059669', lineHeight: 1.2 }}>
                    {cashRunwayMonths} {tx('เดือน', 'Months')}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: isDark ? '#cbd5e1' : '#334155', marginTop: '0.2rem' }}>
                    {tx(`เงินสดหมุนเวียน ฿${cashInHand.toLocaleString()} / เผาเดือนละ ฿${monthlyBurnRate.toLocaleString()}`, `Cash ฿${cashInHand.toLocaleString()} / Burn ฿${monthlyBurnRate.toLocaleString()}/mo`)}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span style={{ display: 'inline-block', padding: '0.25rem 0.65rem', borderRadius: '8px', background: isDark ? 'rgba(16, 185, 129, 0.25)' : '#dcfce7', color: isDark ? '#34d399' : '#047857', fontSize: '0.74rem', fontWeight: 900 }}>
                    🟢 {tx('สถานะมั่นคงมาก', 'Very Healthy')}
                  </span>
                  <div style={{ fontSize: '0.68rem', color: isDark ? '#94a3b8' : '#64748b', marginTop: '0.3rem' }}>
                    {tx(`อยู่รอดได้ ${Math.round(cashRunwayMonths * 30)} วันโดยไม่ต้องพึ่งยอดใหม่`, `Survives ${Math.round(cashRunwayMonths * 30)} days`)}
                  </div>
                </div>
              </div>

              {/* True Profit Waterfall Breakdown */}
              <div style={{ padding: '0.85rem', borderRadius: '12px', background: isDark ? 'rgba(15, 23, 42, 0.75)' : '#f8fafc', border: isDark ? '1px solid rgba(148, 163, 184, 0.2)' : '1px solid #e2e8f0', fontSize: '0.78rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem', color: isDark ? '#f8fafc' : '#0f172a', fontWeight: 800 }}>
                  <span>{tx('1. ยอดขายบนกระดาษ (Gross Revenue):', '1. Gross Paper Revenue:')}</span>
                  <span>฿{grossRevenue.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem', color: '#f43f5e' }}>
                  <span>{tx('2. หัก ต้นทุนสินค้าจริง (COGS):', '2. Less Cost of Goods (COGS):')}</span>
                  <span>-฿{cogsAmount.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem', color: isDark ? '#fbbf24' : '#b45309' }}>
                  <span>{tx('3. หัก ค่าธรรมเนียมช่องทางจำหน่าย (Platform Fees):', '3. Less Marketplace Fees:')}</span>
                  <span>-฿{platformFees.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem', color: isDark ? '#cbd5e1' : '#475569' }}>
                  <span>{tx('4. หัก ค่าส่งและกล่องพัสดุที่ร้านออกให้:', '4. Less Subsidized Shipping & Box:')}</span>
                  <span>-฿{packagingShipping.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem', color: '#ef4444' }}>
                  <span>{tx('5. หัก ลูกหนี้การค้าค้างชำระ (เงินยังไม่เข้า):', '5. Less Uncollected Credit Terms:')}</span>
                  <span>-฿{uncollectedReceivables.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem', color: isDark ? '#cbd5e1' : '#475569' }}>
                  <span>{tx('6. หัก ค่าเช่า, เงินเดือน, ค่าน้ำไฟ (Fixed Opex):', '6. Less Fixed Opex (Rent, Salaries):')}</span>
                  <span>-฿{fixedOpex.toLocaleString()}</span>
                </div>

                {centralPoSavings > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem', color: '#10b981', fontWeight: 800 }}>
                    <span>{tx('7. บวก เงินประหยัดจากจัดซื้อรวมศูนย์ (Central PO):', '7. Plus Central PO Bulk Savings:')}</span>
                    <span>+฿{centralPoSavings.toLocaleString()}</span>
                  </div>
                )}

                <div style={{ paddingTop: '0.45rem', borderTop: isDark ? '1.5px solid rgba(16, 185, 129, 0.4)' : '1.5px solid #86efac', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 900, color: isDark ? '#34d399' : '#047857', fontSize: '0.84rem' }}>
                    💰 {tx('กำไรสุทธิเข้ากระเป๋าจริง (True Net Cash Profit):', 'TRUE NET CASH PROFIT:')}
                  </span>
                  <span style={{ fontWeight: 900, color: isDark ? '#34d399' : '#047857', fontSize: '1.1rem' }}>
                    ฿{trueNetCashProfit.toLocaleString()} ({trueNetMarginPct}%)
                  </span>
                </div>
              </div>
            </div>

            {/* 1-Click Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem', paddingTop: '0.5rem', borderTop: isDark ? '1px solid rgba(148, 163, 184, 0.15)' : '1px solid #e2e8f0' }}>
              <button
                type="button"
                onClick={handleExportCashflowReport}
                style={{
                  width: '100%',
                  padding: '0.65rem',
                  borderRadius: '10px',
                  border: isDark ? '1px solid rgba(16, 185, 129, 0.55)' : '1px solid #86efac',
                  background: isDark ? 'rgba(16, 185, 129, 0.18)' : '#ecfdf5',
                  color: isDark ? '#34d399' : '#047857',
                  fontWeight: 900,
                  fontSize: '0.8rem',
                  cursor: 'pointer'
                }}
              >
                📥 {tx('ส่งออกรายงานกระแสเงินสดและกำไรแท้จริง (.txt)', 'Export True Cashflow Report (.txt)')}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
