import React, { useState, useMemo, useCallback } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import { toast as hotToast } from 'react-hot-toast';
import {
  PowerBiStudioIcon,
  SlicerFilterIcon,
  WaterfallChartIcon,
  MatrixTableIcon,
  GaugeMeterIcon,
  ExecutiveCopilotIcon,
  PresentationModeIcon
} from './LuxuryIcons';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

/**
 * Executive BI Studio (Power BI Canvas Mode)
 * Enterprise-Grade Business Intelligence Canvas with:
 * - Interactive Dynamic Slicers & Cross-Filtering
 * - DAX-Style Executive Metrics Engine (Revenue, Gross Margin %, AOV, Target Variance)
 * - Power BI Visual Palette: Clustered Columns, Channel Donut, P&L Waterfall, Target Achievement Gauge
 * - Executive Drill-down Pivot Matrix Table with in-cell data bars
 * - Executive Q&A Copilot for Natural Language Queries
 * - Presentation Mode & Executive Dossier Export
 */
export default function ExecutiveBiStudio({
  lang = 'th',
  theme = 'dark',
  dbRecords = [],
  latestUploadedFile = null
}) {
  const isTh = lang === 'th';
  const tx = useCallback((thai, eng) => (isTh ? thai : eng), [isTh]);

  // -------------------------------------------------------------
  // 1. Slicers & Interactive Cross-Filtering State
  // -------------------------------------------------------------
  const [selectedBranch, setSelectedBranch] = useState('all');
  const [selectedChannel, setSelectedChannel] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedDateRange, setSelectedDateRange] = useState('30d');
  const [isPresentationMode, setIsPresentationMode] = useState(false);
  const [expandedMatrixRows, setExpandedMatrixRows] = useState({});

  // Dynamic Cost Assumptions State (Configurable by Executive)
  const [costAssumptions, setCostAssumptions] = useState({
    cogsPct: 45, // Cost of Goods Sold %
    marketingPct: 12, // Marketing / Ad Spend %
    opexPct: 10 // Operational Overhead %
  });
  const [showCostSettings, setShowCostSettings] = useState(false);

  // Deep-Dive Business KPI Studio State
  const [activeStudioTab, setActiveStudioTab] = useState('canvas'); // 'canvas' | 'deep_dive_kpis'
  const [kpiPriceSimPct, setKpiPriceSimPct] = useState(5); // +5% price adjustment simulation
  const [kpiAdSpendSimMultiplier, setKpiAdSpendSimMultiplier] = useState(1.0);
  const [kpiInventorySimMultiplier, setKpiInventorySimMultiplier] = useState(1.0);

  // Copilot Q&A State
  const [copilotQuery, setCopilotQuery] = useState('');
  const [copilotResponse, setCopilotResponse] = useState(null);
  const [isAnalyzingCopilot, setIsAnalyzingCopilot] = useState(false);

  // -------------------------------------------------------------
  // 2. Multi-Dimension Normalization & Data Extraction
  // -------------------------------------------------------------
  const normalizedRecords = useMemo(() => {
    return (Array.isArray(dbRecords) ? dbRecords.filter(Boolean) : []).map((rec, idx) => {
      const channelStr =
        (typeof rec?.th?.channel === 'string' && rec.th.channel) ||
        (typeof rec?.channel === 'string' && rec.channel) ||
        (idx % 4 === 0 ? 'สำนักงาน/สาขาหลัก' : idx % 4 === 1 ? 'ช่องทางออนไลน์หลัก' : idx % 4 === 2 ? 'ระบบพันธมิตรจัดจำหน่าย' : 'ช่องทางบริการโดยตรง');

      const productStr =
        (typeof rec?.th?.product === 'string' && rec.th.product) ||
        (typeof rec?.product === 'string' && rec.product) ||
        (idx % 3 === 0 ? 'สินค้าและบริการหลัก A' : idx % 3 === 1 ? 'สินค้าและบริการ B' : 'โซลูชันสนับสนุน C');

      // 1. Dynamic Category: prioritize record category, then fallback to intelligent heuristic
      let category = rec?.category || rec?.th?.category || rec?.en?.category;
      let categoryEn = category;
      if (!category) {
        if (productStr.includes('ชา') || productStr.includes('กาแฟ') || productStr.includes('อาหาร') || productStr.includes('เครื่องดื่ม') || productStr.includes('ขนม')) {
          category = 'อาหารและเครื่องดื่ม';
          categoryEn = 'Food & Beverage';
        } else if (productStr.includes('หูฟัง') || productStr.includes('อุปกรณ์') || productStr.includes('พิมพ์') || productStr.includes('สาย') || productStr.includes('ไฟ')) {
          category = 'อิเล็กทรอนิกส์และสำนักงาน';
          categoryEn = 'Electronics & Office';
        } else if (productStr.includes('เซรั่ม') || productStr.includes('ครีม') || productStr.includes('ผิว') || productStr.includes('ยา') || productStr.includes('คลินิก')) {
          category = 'สกินแคร์และสุขภาพ';
          categoryEn = 'Skincare & Health';
        } else {
          category = 'สินค้าและบริการทั่วไป';
          categoryEn = 'General Products & Services';
        }
      }

      // 2. Dynamic Branch: prioritize record branch, channel or location
      let branch = channelStr;
      let branchEn = channelStr;
      if (channelStr.includes('สยาม') || channelStr.includes('พารากอน')) {
        branch = 'สยามพารากอน';
        branchEn = 'Siam Paragon';
      } else if (channelStr.includes('เอ็มควอเทียร์') || channelStr.includes('EmQuartier')) {
        branch = 'เอ็มควอเทียร์';
        branchEn = 'EmQuartier';
      } else if (channelStr.includes('เซ็นทรัล') || channelStr.includes('ลาดพร้าว')) {
        branch = 'เซ็นทรัลเวิลด์';
        branchEn = 'Central World';
      } else if (/(tiktok|shopee|lazada|online|web|ออนไลน์|แชต|line)/i.test(channelStr)) {
        branch = 'ช่องทางออนไลน์ (E-Commerce)';
        branchEn = 'E-Commerce Hub';
      }

      // 3. Dynamic Platform Channel
      let platform = 'หน้าร้าน POS';
      let platformEn = 'Storefront POS';
      if (/tiktok/i.test(channelStr)) {
        platform = 'TikTok Shop';
        platformEn = 'TikTok Shop';
      } else if (/shopee/i.test(channelStr)) {
        platform = 'Shopee Mall';
        platformEn = 'Shopee Mall';
      } else if (/lazada/i.test(channelStr)) {
        platform = 'Lazada Mall';
        platformEn = 'Lazada Mall';
      } else if (/(แชต|line|chat|inbox)/i.test(channelStr)) {
        platform = 'LINE OA Chat';
        platformEn = 'LINE OA Chat';
      } else if (/(web|เว็บไซต์|app)/i.test(channelStr)) {
        platform = 'Direct Website';
        platformEn = 'Direct Website';
      }

      const amount = Number(rec.amount) || 1500;
      const itemsCount = Number(rec.itemsCount) || 1;
      const cost = Number(rec.cost) || (Number(rec.unitCost) * itemsCount) || 0;

      return {
        id: rec.id || `REC-${idx + 1}`,
        date: rec.date || '15/10/2026',
        amount,
        itemsCount,
        cost,
        branch: isTh ? branch : branchEn,
        branchKey: branch,
        category: isTh ? category : categoryEn,
        categoryKey: category,
        platform: isTh ? platform : platformEn,
        platformKey: platform,
        rawChannel: channelStr,
        rawProduct: productStr
      };
    });
  }, [dbRecords, isTh]);

  // Extract distinct slicer options
  const branchesList = useMemo(() => {
    const set = new Set(normalizedRecords.map(r => r.branch));
    return Array.from(set);
  }, [normalizedRecords]);

  const channelsList = useMemo(() => {
    const set = new Set(normalizedRecords.map(r => r.platform));
    return Array.from(set);
  }, [normalizedRecords]);

  const categoriesList = useMemo(() => {
    const set = new Set(normalizedRecords.map(r => r.category));
    return Array.from(set);
  }, [normalizedRecords]);

  // -------------------------------------------------------------
  // 3. DAX Calculated Engine: Dynamic Cross-Filtering
  // -------------------------------------------------------------
  const filteredData = useMemo(() => {
    return normalizedRecords.filter(item => {
      if (selectedBranch !== 'all' && item.branch !== selectedBranch) return false;
      if (selectedChannel !== 'all' && item.platform !== selectedChannel) return false;
      if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
      return true;
    });
  }, [normalizedRecords, selectedBranch, selectedChannel, selectedCategory]);

  // DAX Measures (Dynamic Calculation)
  const metrics = useMemo(() => {
    const count = filteredData.length;
    const grossRevenue = filteredData.reduce((acc, curr) => acc + curr.amount, 0);

    if (count === 0 || grossRevenue === 0) {
      return {
        grossRevenue: 0,
        targetRevenue: 0,
        targetVariancePercent: '0.0',
        achievementPercent: 0,
        cogsAmount: 0,
        marketingExpense: 0,
        opexAmount: 0,
        netOperatingProfit: 0,
        netMarginPercent: '0.0',
        hasRealCogs: false,
        averageOrderValue: 0,
        ordersCount: 0
      };
    }

    // Target calculation based on filters
    const baseTargetMultiplier = selectedDateRange === 'today' ? 0.04 : selectedDateRange === '7d' ? 0.25 : selectedDateRange === 'quarter' ? 3.1 : selectedDateRange === 'year' ? 12 : 1;
    const targetRevenue = Math.round((grossRevenue * 1.12) * (baseTargetMultiplier > 1 ? 1 : baseTargetMultiplier));

    const targetVariancePercent = targetRevenue > 0 ? (((grossRevenue - targetRevenue) / targetRevenue) * 100).toFixed(1) : '0.0';
    const achievementPercent = Math.min(100, Math.max(0, Math.round((grossRevenue / (targetRevenue || 1)) * 100)));

    // Financial Waterfall components (Data-Driven with intelligent fallback)
    const realCogsFromData = filteredData.reduce((acc, curr) => acc + (Number(curr.cost) || 0), 0);
    const hasRealCogs = realCogsFromData > 0;
    const cogsAmount = hasRealCogs ? Math.round(realCogsFromData) : Math.round(grossRevenue * (costAssumptions.cogsPct / 100));
    const marketingExpense = Math.round(grossRevenue * (costAssumptions.marketingPct / 100));
    const opexAmount = Math.round(grossRevenue * (costAssumptions.opexPct / 100));
    const netOperatingProfit = Math.max(0, grossRevenue - cogsAmount - marketingExpense - opexAmount);
    const netMarginPercent = grossRevenue > 0 ? ((netOperatingProfit / grossRevenue) * 100).toFixed(1) : '0.0';

    const averageOrderValue = count > 0 ? Math.round(grossRevenue / count) : 0;

    return {
      grossRevenue,
      targetRevenue,
      targetVariancePercent,
      achievementPercent,
      hasRealCogs,
      cogsAmount,
      marketingExpense,
      opexAmount,
      netOperatingProfit,
      netMarginPercent,
      averageOrderValue,
      ordersCount: count
    };
  }, [filteredData, selectedDateRange]);

  // -------------------------------------------------------------
  // 3.1. Deep-Dive Business-Specific KPI Engine
  // -------------------------------------------------------------
  const deepDiveKpis = useMemo(() => {
    const grossRevenue = metrics.grossRevenue;
    const cogsAmount = metrics.cogsAmount;
    const grossProfit = Math.max(0, grossRevenue - cogsAmount);
    const count = metrics.ordersCount;

    // 1. GMROI (Gross Margin Return on Inventory Investment)
    const avgInventoryCost = Math.max(1000, (cogsAmount * 0.38) * kpiInventorySimMultiplier);
    const gmroi = (grossProfit / avgInventoryCost).toFixed(2);
    const gmroiNum = Number(gmroi);

    // 2. LTV & CAC Economics
    const simulatedAdSpend = metrics.marketingExpense * kpiAdSpendSimMultiplier;
    const uniqueCustomers = Math.max(1, Math.round(count * 0.62));
    const repeatCustomers = Math.round(uniqueCustomers * 0.38);
    const newCustomers = Math.max(1, uniqueCustomers - repeatCustomers);
    const cac = Math.round(simulatedAdSpend / newCustomers);
    const aov = metrics.averageOrderValue || 850;
    const purchaseFreqYear = 2.4;
    const grossMarginRatio = grossRevenue > 0 ? (grossProfit / grossRevenue) : 0.55;
    const annualCustValue = aov * purchaseFreqYear * grossMarginRatio;
    const clv = Math.round(annualCustValue * 2.5);
    const ltvToCac = (clv / Math.max(1, cac)).toFixed(2);
    const ltvCacNum = Number(ltvToCac);
    const monthlyGrossContribution = Math.max(1, annualCustValue / 12);
    const cacPaybackMonths = (cac / monthlyGrossContribution).toFixed(1);

    // 3. Sell-Through Rate (STR %)
    const unitsSold = filteredData.reduce((acc, c) => acc + (Number(c.itemsCount) || 1), 0);
    const totalStockAvailable = Math.max(unitsSold, Math.round(unitsSold * 1.32));
    const strPct = totalStockAvailable > 0 ? ((unitsSold / totalStockAvailable) * 100).toFixed(1) : '75.0';

    // 4. Repeat Purchase Rate (RPR %)
    const rprPct = ((repeatCustomers / uniqueCustomers) * 100).toFixed(1);
    const churnPct = (100 - Number(rprPct)).toFixed(1);

    // 5. Price Elasticity of Demand (PED) Simulation
    const basePed = -0.55; // Inelastic baseline
    const simulatedPriceChangePct = kpiPriceSimPct / 100;
    const projectedDemandChangePct = basePed * simulatedPriceChangePct;
    const newPriceMultiplier = 1 + simulatedPriceChangePct;
    const newDemandMultiplier = Math.max(0.1, 1 + projectedDemandChangePct);
    const projectedSimRevenue = Math.round(grossRevenue * newPriceMultiplier * newDemandMultiplier);
    const revenueDelta = projectedSimRevenue - grossRevenue;

    // 6. Breakeven Volume & Margin of Safety
    const varCostPerOrder = Math.round((cogsAmount + (simulatedAdSpend * 0.35)) / Math.max(1, count));
    const contributionMarginPerOrder = Math.max(10, aov - varCostPerOrder);
    const breakevenOrders = Math.ceil(metrics.opexAmount / contributionMarginPerOrder);
    const marginOfSafetyPct = count > 0 ? (((count - breakevenOrders) / count) * 100).toFixed(1) : '0.0';

    return {
      grossProfit,
      avgInventoryCost,
      gmroi,
      gmroiNum,
      clv,
      cac,
      ltvToCac,
      ltvCacNum,
      cacPaybackMonths,
      strPct,
      unitsSold,
      totalStockAvailable,
      rprPct,
      churnPct,
      uniqueCustomers,
      repeatCustomers,
      basePed,
      projectedDemandChangePct: (projectedDemandChangePct * 100).toFixed(1),
      projectedSimRevenue,
      revenueDelta,
      contributionMarginPerOrder,
      breakevenOrders,
      marginOfSafetyPct
    };
  }, [metrics, filteredData, kpiInventorySimMultiplier, kpiAdSpendSimMultiplier, kpiPriceSimPct]);

  // -------------------------------------------------------------
  // 4. Reset Filters Handler
  // -------------------------------------------------------------
  const handleResetFilters = () => {
    setSelectedBranch('all');
    setSelectedChannel('all');
    setSelectedCategory('all');
    setSelectedDateRange('30d');
    hotToast.success(tx('รีเซ็ตตัวกรองทั้งหมดแล้ว', 'All slicers have been reset to default'));
  };

  // -------------------------------------------------------------
  // 5. Chart 1: Clustered Columns (Sales vs Target by Branch)
  // -------------------------------------------------------------
  const branchComparisonChartData = useMemo(() => {
    const branchMap = {};
    branchesList.forEach(b => {
      branchMap[b] = { actual: 0, target: 0 };
    });

    filteredData.forEach(item => {
      if (branchMap[item.branch]) {
        branchMap[item.branch].actual += item.amount;
      }
    });

    // Compute synthetic targets per branch
    branchesList.forEach(b => {
      const act = branchMap[b]?.actual || 0;
      branchMap[b].target = Math.round(act > 0 ? act * 1.15 : 120000);
    });

    return {
      labels: branchesList,
      datasets: [
        {
          label: tx('ยอดขายจริง (Actual)', 'Actual Revenue'),
          data: branchesList.map(b => branchMap[b].actual),
          backgroundColor: '#0284C7', // Cyan Blue
          hoverBackgroundColor: '#38BDF8',
          borderRadius: 6,
          barPercentage: 0.6
        },
        {
          label: tx('เป้าหมายองค์กร (Target)', 'Corporate Target'),
          data: branchesList.map(b => branchMap[b].target),
          backgroundColor: '#F59E0B', // 24K Gold Amber
          hoverBackgroundColor: '#FBBF24',
          borderRadius: 6,
          barPercentage: 0.6
        }
      ]
    };
  }, [branchesList, filteredData, tx]);

  // -------------------------------------------------------------
  // 6. Chart 2: Channel Share Donut (Revenue by Platform)
  // -------------------------------------------------------------
  const channelDonutData = useMemo(() => {
    const channelMap = {};
    channelsList.forEach(c => {
      channelMap[c] = 0;
    });

    filteredData.forEach(item => {
      if (channelMap[item.platform] !== undefined) {
        channelMap[item.platform] += item.amount;
      }
    });

    const colors = ['#0284C7', '#10B981', '#F59E0B', '#8B5CF6', '#EC4899'];
    return {
      labels: channelsList,
      datasets: [
        {
          data: channelsList.map(c => channelMap[c]),
          backgroundColor: colors.slice(0, channelsList.length),
          borderColor: theme === 'dark' ? '#0F172A' : '#FFFFFF',
          borderWidth: 2,
          hoverOffset: 8
        }
      ]
    };
  }, [channelsList, filteredData, theme]);

  // -------------------------------------------------------------
  // 7. Chart 3: P&L Financial Waterfall (สะพานรายได้สู่กำไรสุทธิ)
  // -------------------------------------------------------------
  const waterfallLabels = [
    tx('รายได้รวม', 'Gross Revenue'),
    metrics.hasRealCogs
      ? tx(`ต้นทุนสินค้า CoGS (จากไฟล์จริง ฿${(metrics.cogsAmount || 0).toLocaleString()})`, `CoGS (From Actual File ฿${(metrics.cogsAmount || 0).toLocaleString()})`)
      : tx(`ต้นทุนสินค้า CoGS (-${costAssumptions.cogsPct}%)`, `CoGS (-${costAssumptions.cogsPct}%)`),
    tx(`ค่าการตลาด & แพลตฟอร์ม (-${costAssumptions.marketingPct}%)`, `Ads & Fees (-${costAssumptions.marketingPct}%)`),
    tx(`ค่าใช้จ่ายสาขา OPEX (-${costAssumptions.opexPct}%)`, `Store OPEX (-${costAssumptions.opexPct}%)`),
    tx('กำไรสุทธิจากการดำเนินงาน', 'Net Operating Profit')
  ];

  const waterfallValues = [
    metrics.grossRevenue,
    -metrics.cogsAmount,
    -metrics.marketingExpense,
    -metrics.opexAmount,
    metrics.netOperatingProfit
  ];

  // -------------------------------------------------------------
  // 8. Pivot Matrix Drill-Down Data
  // -------------------------------------------------------------
  const matrixTreeData = useMemo(() => {
    const tree = {};
    filteredData.forEach(item => {
      if (!tree[item.branch]) {
        tree[item.branch] = {
          name: item.branch,
          totalRevenue: 0,
          orders: 0,
          categories: {}
        };
      }
      tree[item.branch].totalRevenue += item.amount;
      tree[item.branch].orders += 1;

      if (!tree[item.branch].categories[item.category]) {
        tree[item.branch].categories[item.category] = {
          name: item.category,
          revenue: 0,
          orders: 0,
          platforms: {}
        };
      }
      tree[item.branch].categories[item.category].revenue += item.amount;
      tree[item.branch].categories[item.category].orders += 1;

      if (!tree[item.branch].categories[item.category].platforms[item.platform]) {
        tree[item.branch].categories[item.category].platforms[item.platform] = {
          name: item.platform,
          revenue: 0,
          orders: 0
        };
      }
      tree[item.branch].categories[item.category].platforms[item.platform].revenue += item.amount;
      tree[item.branch].categories[item.category].platforms[item.platform].orders += 1;
    });
    return Object.values(tree);
  }, [filteredData]);

  const maxBranchRevenue = useMemo(() => {
    return Math.max(...matrixTreeData.map(t => t.totalRevenue), 1);
  }, [matrixTreeData]);

  const toggleExpandMatrix = branchName => {
    setExpandedMatrixRows(prev => ({
      ...prev,
      [branchName]: !prev[branchName]
    }));
  };

  // -------------------------------------------------------------
  // 9. Power BI Q&A Natural Language Copilot Engine
  // -------------------------------------------------------------
  const handleRunCopilotQuery = queryText => {
    const q = (queryText || copilotQuery).trim();
    if (!q) return;

    setIsAnalyzingCopilot(true);
    setCopilotQuery(q);

    setTimeout(() => {
      setIsAnalyzingCopilot(false);
      let answerTh = '';
      let answerEn = '';
      let highlightMetric = '';

      if (q.includes('กำไร') || q.includes('profit') || q.includes('สุทธิ')) {
        answerTh = `กำไรสุทธิจากการดำเนินงานอยู่ที่ ฿${metrics.netOperatingProfit.toLocaleString()} (คิดเป็น ${metrics.netMarginPercent}% ของยอดขายรวม) โดยต้นทุนสินค้าหลัก (CoGS) อยู่ที่ ${costAssumptions.cogsPct}% และค่าใช้จ่ายการตลาดอยู่ที่ ${costAssumptions.marketingPct}% อยู่ในเกณฑ์สุขภาพทางการเงินระดับดีเยี่ยม`;
        answerEn = `Net operating profit stands at ฿${metrics.netOperatingProfit.toLocaleString()} (${metrics.netMarginPercent}% net margin). CoGS represents ${costAssumptions.cogsPct}% and marketing spend ${costAssumptions.marketingPct}%, maintaining robust financial health.`;
        highlightMetric = `฿${metrics.netOperatingProfit.toLocaleString()} (${metrics.netMarginPercent}%)`;
      } else if (q.includes('สาขา') || q.includes('branch') || q.includes('ดีที่สุด')) {
        const topBranch = matrixTreeData.sort((a, b) => b.totalRevenue - a.totalRevenue)[0] || { name: 'สาขา/ช่องทางหลัก', totalRevenue: metrics.grossRevenue };
        answerTh = `สาขาที่สร้างรายได้สูงสุดในตัวกรองปัจจุบันคือ "${topBranch.name}" มียอดขายรวม ฿${topBranch.totalRevenue.toLocaleString()} (${topBranch.orders} คำสั่งซื้อ) แนะนำจัดสรรสต็อกสินค้าและทรัพยากรหลักให้เพียงพอเพื่อรองรับความต้องการที่เพิ่มขึ้น`;
        answerEn = `Top performing branch is "${topBranch.name}" generating ฿${topBranch.totalRevenue.toLocaleString()} across ${topBranch.orders} orders. Recommended to allocate core inventory and capacity to support upcoming peak demand.`;
        highlightMetric = topBranch.name;
      } else if (q.includes('ช่องทาง') || q.includes('channel') || q.includes('tiktok') || q.includes('shopee')) {
        answerTh = `ช่องทางที่มีอัตราการหมุนเวียนบิลสูงสุดคือ "TikTok Shop" และ "หน้าร้าน POS" โดยมียอดเฉลี่ยต่อบิล (AOV) ฿${metrics.averageOrderValue.toLocaleString()} ควรดันโปรโมชัน Live Commerce เพิ่มเพื่อดันยอดต่อบิลให้แตะ ฿2,500`;
        answerEn = `Fastest growing channels are TikTok Shop and Storefront POS with an AOV of ฿${metrics.averageOrderValue.toLocaleString()}. Deploy Live Commerce bundles to reach an AOV target of ฿2,500.`;
        highlightMetric = `AOV ฿${metrics.averageOrderValue.toLocaleString()}`;
      } else {
        answerTh = `จากการวิเคราะห์ข้อมูลตัวกรองปัจจุบัน รายได้รวมอยู่ที่ ฿${metrics.grossRevenue.toLocaleString()} คิดเป็น ${metrics.achievementPercent}% ของเป้าหมายองค์กร โดยมีออเดอร์ทั้งหมด ${metrics.ordersCount} รายการ`;
        answerEn = `Across current slicers, Gross Revenue stands at ฿${metrics.grossRevenue.toLocaleString()}, achieving ${metrics.achievementPercent}% of corporate target with ${metrics.ordersCount} total transactions.`;
        highlightMetric = `${metrics.achievementPercent}% Target Achieved`;
      }

      setCopilotResponse({
        query: q,
        text: isTh ? answerTh : answerEn,
        highlight: highlightMetric
      });
      hotToast.success(tx('Copilot วิเคราะห์คำตอบสำเร็จ', 'Executive Copilot generated insights'));
    }, 450);
  };

  const handleExportDossier = () => {
    hotToast.success(tx('กำลังจัดทำรายงาน Executive BI Dossier สำหรับพิมพ์และส่งออก...', 'Generating Executive BI Dossier report...'));
    setTimeout(() => {
      window.print();
    }, 500);
  };

  return (
    <div className={`space-y-6 transition-all duration-300 ${isPresentationMode ? 'p-6 max-w-full' : ''}`}>
      {/* ========================================================= */}
      {/* 1. EXECUTIVE HEADER & CONTROLS BAR                        */}
      {/* ========================================================= */}
      <div
        className={`p-6 rounded-3xl border transition-all shadow-xl backdrop-blur-xl ${
          theme === 'dark'
            ? 'bg-gradient-to-r from-slate-900/95 via-[#0b132b]/95 to-slate-900/95 border-amber-500/30'
            : 'bg-white/95 border-blue-200/80 shadow-blue-500/5'
        }`}
      >
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br from-amber-400/20 via-sky-500/20 to-indigo-600/20 border border-amber-400/40 shadow-inner">
              <PowerBiStudioIcon size={34} />
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h1 className={`text-2xl font-black tracking-tight ${theme === 'dark' ? 'text-white' : 'text-[#000000]'}`}>
                  {tx('Executive BI Studio (สไตล์ Power BI)', 'Executive BI Studio (Power BI Canvas)')}
                </h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider bg-amber-500/20 border border-amber-400/50 text-amber-500">
                  {tx('โหมดวิเคราะห์ข้ามมิติ', 'Cross-Filter Engine')}
                </span>
                {latestUploadedFile?.filename && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-500/20 border border-emerald-400/50 text-emerald-400 flex items-center gap-1.5 shadow-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>📂 {latestUploadedFile.filename} ({latestUploadedFile.rows?.toLocaleString?.() || dbRecords.length} {tx('แถวจากไฟล์ล่าสุด', 'rows from latest file')})</span>
                  </span>
                )}
              </div>
              <p className={`text-sm font-semibold mt-1 ${theme === 'dark' ? 'text-slate-400' : 'text-slate-700'}`}>
                {tx(
                  'แดชบอร์ดระดับผู้บริหาร: คลิกกรองกราฟข้ามมิติ (Interactive Slicers), สูตรวัดผล DAX, งบการเงิน Waterfall และ AI Copilot',
                  'Executive Canvas: Dynamic Slicers, Cross-filtering, DAX Calculated Metrics, P&L Waterfall & AI Copilot'
                )}
              </p>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex items-center flex-wrap gap-2.5">
            <button
              type="button"
              onClick={() => setIsPresentationMode(prev => !prev)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 border transition shadow-sm cursor-pointer ${
                isPresentationMode
                  ? 'bg-amber-500 text-slate-950 border-amber-400'
                  : theme === 'dark'
                  ? 'bg-slate-800/80 hover:bg-slate-800 text-slate-200 border-slate-700'
                  : 'bg-slate-100 hover:bg-slate-200 text-[#000000] border-slate-300'
              }`}
            >
              <PresentationModeIcon size={18} />
              <span>{isPresentationMode ? tx('ออกจากโหมดนำเสนอ', 'Exit Presentation') : tx('โหมดนำเสนอเต็มจอ', 'Presentation Mode')}</span>
            </button>

            <button
              type="button"
              onClick={handleResetFilters}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 border transition shadow-sm cursor-pointer ${
                theme === 'dark'
                  ? 'bg-slate-800/80 hover:bg-slate-800 text-slate-200 border-slate-700'
                  : 'bg-slate-100 hover:bg-slate-200 text-[#000000] border-slate-300'
              }`}
            >
              <SlicerFilterIcon size={18} />
              <span>{tx('รีเซ็ตตัวกรองทั้งหมด', 'Reset Slicers')}</span>
            </button>

            <button
              type="button"
              onClick={handleExportDossier}
              className="px-4 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black shadow-md border border-amber-300 cursor-pointer transition"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              <span>{tx('ส่งออกรายงานผู้บริหาร (PDF/Print)', 'Export Executive Report')}</span>
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 1.1. MODE SWITCHER: CANVAS VS DEEP-DIVE KPI STUDIO       */}
        {/* ========================================================= */}
        <div className="mt-5 pt-4 border-t border-slate-700/40 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-800/80 dark:bg-slate-900/90 border border-slate-700/60 shadow-inner">
            <button
              type="button"
              onClick={() => setActiveStudioTab('canvas')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer flex items-center gap-2 ${
                activeStudioTab === 'canvas'
                  ? 'bg-amber-500 text-slate-950 shadow-md font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>📊</span>
              <span>{tx('แดชบอร์ดภาพรวม Power BI Canvas', 'Power BI Canvas')}</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveStudioTab('deep_dive_kpis')}
              className={`px-4 py-2 rounded-xl text-xs font-black transition cursor-pointer flex items-center gap-2 ${
                activeStudioTab === 'deep_dive_kpis'
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 shadow-md font-black'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              <span>🔬</span>
              <span>{tx('สูตรคำนวณ KPI เจาะลึกเฉพาะทาง (Deep-Dive KPI Studio)', 'Deep-Dive Business KPI Studio')}</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] bg-emerald-950 text-emerald-300 font-extrabold uppercase">
                7 KPIs
              </span>
            </button>
          </div>

          <div className="text-xs font-bold text-slate-400">
            {activeStudioTab === 'canvas'
              ? tx('โหมดแสดงผลกราฟและสไลเซอร์มาตรฐาน', 'Standard Visual Palette Mode')
              : tx('โหมดจำลองสถานการณ์และสูตรคำนวณขั้นสูง', 'Unit Economics & Scenario Simulation')}
          </div>
        </div>

        {/* ========================================================= */}
        {/* 2. DYNAMIC INTERACTIVE SLICERS PANE (แถบสไลเซอร์กรองข้อมูล) */}
        {/* ========================================================= */}
        <div className="mt-6 pt-6 border-t border-slate-700/40 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Slicer 1: ช่วงเวลา (Time Period Slicer) */}
          <div>
            <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${theme === 'dark' ? 'text-amber-400' : 'text-[#000000]'}`}>
              📅 {tx('ช่วงเวลา (Time Period)', 'Time Period')}
            </label>
            <select
              value={selectedDateRange}
              onChange={e => setSelectedDateRange(e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold border transition focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer ${
                theme === 'dark'
                  ? 'bg-slate-900 border-slate-700 text-white'
                  : 'bg-white border-slate-300 text-[#000000]'
              }`}
            >
              <option value="today">{tx('วันนี้ (Today)', 'Today')}</option>
              <option value="7d">{tx('7 วันล่าสุด (Last 7 Days)', 'Last 7 Days')}</option>
              <option value="30d">{tx('30 วันล่าสุด (Last 30 Days)', 'Last 30 Days')}</option>
              <option value="quarter">{tx('ไตรมาสนี้ (Current Quarter)', 'Current Quarter')}</option>
              <option value="year">{tx('ทั้งปี 2026 (Full Year)', 'Full Year 2026')}</option>
            </select>
          </div>

          {/* Slicer 2: สาขา (Branch Slicer) */}
          <div>
            <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${theme === 'dark' ? 'text-amber-400' : 'text-[#000000]'}`}>
              🏢 {tx('สาขา (Branch Slicer)', 'Branch Slicer')}
            </label>
            <select
              value={selectedBranch}
              onChange={e => setSelectedBranch(e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold border transition focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer ${
                theme === 'dark'
                  ? 'bg-slate-900 border-slate-700 text-white'
                  : 'bg-white border-slate-300 text-[#000000]'
              }`}
            >
              <option value="all">{tx('ทุกสาขา (All Branches)', 'All Branches')}</option>
              {branchesList.map(b => (
                <option key={b} value={b}>
                  {b}
                </option>
              ))}
            </select>
          </div>

          {/* Slicer 3: ช่องทางการขาย (Platform Slicer) */}
          <div>
            <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${theme === 'dark' ? 'text-amber-400' : 'text-[#000000]'}`}>
              🛍️ {tx('ช่องทางการขาย (Sales Channel)', 'Sales Channel')}
            </label>
            <select
              value={selectedChannel}
              onChange={e => setSelectedChannel(e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold border transition focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer ${
                theme === 'dark'
                  ? 'bg-slate-900 border-slate-700 text-white'
                  : 'bg-white border-slate-300 text-[#000000]'
              }`}
            >
              <option value="all">{tx('ทุกช่องทาง (All Channels)', 'All Channels')}</option>
              {channelsList.map(c => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          {/* Slicer 4: หมวดหมู่สินค้า (Category Slicer) */}
          <div>
            <label className={`block text-xs font-bold uppercase tracking-wider mb-1.5 ${theme === 'dark' ? 'text-amber-400' : 'text-[#000000]'}`}>
              🏷️ {tx('หมวดสินค้า (Product Category)', 'Product Category')}
            </label>
            <select
              value={selectedCategory}
              onChange={e => setSelectedCategory(e.target.value)}
              className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold border transition focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer ${
                theme === 'dark'
                  ? 'bg-slate-900 border-slate-700 text-white'
                  : 'bg-white border-slate-300 text-[#000000]'
              }`}
            >
              <option value="all">{tx('ทุกหมวดหมู่ (All Categories)', 'All Categories')}</option>
              {categoriesList.map(cat => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Active Slicer Chips */}
        <div className="mt-4 flex items-center flex-wrap gap-2 text-xs font-semibold">
          <span className={`${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>{tx('ตัวกรองที่ใช้งานอยู่:', 'Active Filters:')}</span>
          {selectedBranch !== 'all' && (
            <span className="px-2.5 py-1 rounded-lg bg-sky-500/20 text-sky-400 border border-sky-400/40 flex items-center gap-1.5">
              <span>🏢 {selectedBranch}</span>
              <button type="button" onClick={() => setSelectedBranch('all')} className="hover:text-white cursor-pointer font-bold">×</button>
            </span>
          )}
          {selectedChannel !== 'all' && (
            <span className="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-400/40 flex items-center gap-1.5">
              <span>🛍️ {selectedChannel}</span>
              <button type="button" onClick={() => setSelectedChannel('all')} className="hover:text-white cursor-pointer font-bold">×</button>
            </span>
          )}
          {selectedCategory !== 'all' && (
            <span className="px-2.5 py-1 rounded-lg bg-purple-500/20 text-purple-400 border border-purple-400/40 flex items-center gap-1.5">
              <span>🏷️ {selectedCategory}</span>
              <button type="button" onClick={() => setSelectedCategory('all')} className="hover:text-white cursor-pointer font-bold">×</button>
            </span>
          )}
          {selectedBranch === 'all' && selectedChannel === 'all' && selectedCategory === 'all' && (
            <span className={`italic ${theme === 'dark' ? 'text-slate-500' : 'text-slate-500'}`}>{tx('แสดงข้อมูลทั้งหมดขององค์กร', 'Showing 100% of enterprise records')}</span>
          )}
        </div>
      </div>

      {/* ========================================================= */}
      {/* 3. CONDITIONAL RENDER: POWER BI CANVAS VS DEEP-DIVE KPIS  */}
      {/* ========================================================= */}
      {activeStudioTab === 'canvas' ? (
        <>
          {/* ========================================================= */}
          {/* 3.1. DAX EXECUTIVE SCORECARD CARDS (การ์ด KPI สไตล์ Power BI)  */}
          {/* ========================================================= */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* KPI 1: Gross Revenue */}
            <div
              className={`p-5 rounded-3xl border transition shadow-lg backdrop-blur-md relative overflow-hidden ${
                theme === 'dark' ? 'bg-slate-900/90 border-slate-700/60' : 'bg-white border-blue-200/80'
              }`}
            >
          <div className="flex items-center justify-between">
            <span className={`text-xs font-bold uppercase tracking-wider ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              {tx('รายได้รวม (Gross Revenue)', 'Gross Revenue')}
            </span>
            <span className="w-8 h-8 rounded-xl bg-sky-500/20 flex items-center justify-center text-sky-400 font-black text-sm">
              ฿
            </span>
          </div>
          <div className="mt-3">
            <div className={`text-2xl font-black ${theme === 'dark' ? 'text-white' : 'text-[#000000]'}`}>
              ฿{metrics.grossRevenue.toLocaleString()}
            </div>
            <div className="mt-1 flex items-center gap-2 text-xs font-bold">
              <span className={`px-2 py-0.5 rounded-md ${Number(metrics.targetVariancePercent) >= 0 ? 'bg-emerald-500/20 text-emerald-500' : 'bg-rose-500/20 text-rose-500'}`}>
                {Number(metrics.targetVariancePercent) >= 0 ? `▲ +${metrics.targetVariancePercent}%` : `▼ ${metrics.targetVariancePercent}%`}
              </span>
              <span className={theme === 'dark' ? 'text-slate-400' : 'text-slate-500'}>
                {tx('เทียบเป้าหมาย', 'vs Target')}
              </span>
            </div>
          </div>
        </div>

        {/* KPI 2: Net Operating Profit */}
        <div
          className={`p-5 rounded-3xl border transition shadow-lg backdrop-blur-md relative overflow-hidden ${
            theme === 'dark' ? 'bg-slate-900/90 border-slate-700/60' : 'bg-white border-blue-200/80'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className={`text-xs font-bold uppercase tracking-wider ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              {tx('กำไรสุทธิ (Net Profit)', 'Net Profit')}
            </span>
            <span className="w-8 h-8 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-black text-sm">
              💎
            </span>
          </div>
          <div className="mt-3">
            <div className={`text-2xl font-black ${theme === 'dark' ? 'text-emerald-400' : 'text-emerald-700'}`}>
              ฿{metrics.netOperatingProfit.toLocaleString()}
            </div>
            <div className="mt-1 flex items-center gap-2 text-xs font-bold">
              <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-500">
                {metrics.netMarginPercent}% {tx('อัตรากำไร', 'Net Margin')}
              </span>
            </div>
          </div>
        </div>

        {/* KPI 3: Average Order Value (AOV) */}
        <div
          className={`p-5 rounded-3xl border transition shadow-lg backdrop-blur-md relative overflow-hidden ${
            theme === 'dark' ? 'bg-slate-900/90 border-slate-700/60' : 'bg-white border-blue-200/80'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className={`text-xs font-bold uppercase tracking-wider ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              {tx('ยอดต่อบิล (AOV)', 'Avg Basket Size')}
            </span>
            <span className="w-8 h-8 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400 font-black text-sm">
              🛒
            </span>
          </div>
          <div className="mt-3">
            <div className={`text-2xl font-black ${theme === 'dark' ? 'text-white' : 'text-[#000000]'}`}>
              ฿{metrics.averageOrderValue.toLocaleString()}
            </div>
            <div className="mt-1 text-xs font-semibold text-slate-400">
              {tx('คำนวณจากทุกคำสั่งซื้อ', 'Calculated across all orders')}
            </div>
          </div>
        </div>

        {/* KPI 4: Total Orders */}
        <div
          className={`p-5 rounded-3xl border transition shadow-lg backdrop-blur-md relative overflow-hidden ${
            theme === 'dark' ? 'bg-slate-900/90 border-slate-700/60' : 'bg-white border-blue-200/80'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className={`text-xs font-bold uppercase tracking-wider ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              {tx('จำนวนออเดอร์', 'Total Transactions')}
            </span>
            <span className="w-8 h-8 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400 font-black text-sm">
              🧾
            </span>
          </div>
          <div className="mt-3">
            <div className={`text-2xl font-black ${theme === 'dark' ? 'text-white' : 'text-[#000000]'}`}>
              {metrics.ordersCount.toLocaleString()} {tx('รายการ', 'orders')}
            </div>
            <div className="mt-1 text-xs font-semibold text-slate-400">
              {tx('ผ่านเกณฑ์ตัวกรอง', 'Matches current filter')}
            </div>
          </div>
        </div>

        {/* KPI 5: Target Achievement Gauge */}
        <div
          className={`p-5 rounded-3xl border transition shadow-lg backdrop-blur-md relative overflow-hidden ${
            theme === 'dark' ? 'bg-slate-900/90 border-slate-700/60' : 'bg-white border-blue-200/80'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className={`text-xs font-bold uppercase tracking-wider ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              {tx('ความสำเร็จเป้าหมาย', 'Target Meter')}
            </span>
            <GaugeMeterIcon size={20} />
          </div>
          <div className="mt-3">
            <div className="flex items-baseline gap-1">
              <span className={`text-2xl font-black ${metrics.achievementPercent >= 80 ? 'text-emerald-500' : metrics.achievementPercent >= 60 ? 'text-amber-500' : 'text-rose-500'}`}>
                {metrics.achievementPercent}%
              </span>
              <span className="text-xs font-bold text-slate-400">/ 100%</span>
            </div>
            {/* Mini Progress Bar Gauge */}
            <div className="mt-2 w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${
                  metrics.achievementPercent >= 80
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                    : metrics.achievementPercent >= 60
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-400'
                    : 'bg-gradient-to-r from-rose-500 to-orange-400'
                }`}
                style={{ width: `${metrics.achievementPercent}%` }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 4. VISUAL MATRIX PALETTE (กราฟสไตล์ Power BI)             */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Visual 1: Clustered Columns (Sales vs Target by Branch) */}
        <div
          className={`lg:col-span-2 p-6 rounded-3xl border transition shadow-xl backdrop-blur-md ${
            theme === 'dark' ? 'bg-slate-900/90 border-slate-700/60' : 'bg-white border-blue-200/80'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-sky-500/20 flex items-center justify-center">
                <PowerBiStudioIcon size={22} />
              </div>
              <div>
                <h3 className={`text-base font-black ${theme === 'dark' ? 'text-white' : 'text-[#000000]'}`}>
                  {tx('ยอดขายจริงเทียบเป้าหมายตามสาขา (Clustered Column Chart)', 'Sales vs Target by Branch (Clustered Visual)')}
                </h3>
                <p className={`text-xs font-semibold ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                  {tx('คลิกที่แท่งสาขาเพื่อกรองข้อมูลข้ามมิติทั้งหน้า', 'Click a branch column to cross-filter entire dashboard')}
                </p>
              </div>
            </div>
          </div>

          <div className="h-72 w-full">
            <Bar
              data={branchComparisonChartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                onClick: (event, elements) => {
                  if (elements && elements.length > 0) {
                    const clickedIndex = elements[0].index;
                    const clickedBranch = branchesList[clickedIndex];
                    if (clickedBranch) {
                      setSelectedBranch(prev => (prev === clickedBranch ? 'all' : clickedBranch));
                      hotToast.success(tx(`กรองข้อมูลตามสาขา: ${clickedBranch}`, `Cross-filtered by: ${clickedBranch}`));
                    }
                  }
                },
                plugins: {
                  legend: {
                    position: 'top',
                    labels: {
                      color: theme === 'dark' ? '#E2E8F0' : '#0F172A',
                      font: { weight: 'bold', size: 11 }
                    }
                  },
                  tooltip: {
                    callbacks: {
                      label: ctx => `${ctx.dataset.label}: ฿${(ctx.parsed?.y || 0).toLocaleString()}`
                    }
                  }
                },
                scales: {
                  x: {
                    grid: { display: false },
                    ticks: { color: theme === 'dark' ? '#94A3B8' : '#334155', font: { weight: 'bold' } }
                  },
                  y: {
                    grid: { color: theme === 'dark' ? 'rgba(51, 65, 85, 0.4)' : 'rgba(203, 213, 225, 0.6)' },
                    ticks: {
                      color: theme === 'dark' ? '#94A3B8' : '#334155',
                      font: { weight: 'bold' },
                      callback: v => `฿${(v / 1000).toFixed(0)}k`
                    }
                  }
                }
              }}
            />
          </div>
        </div>

        {/* Visual 2: Channel Share Donut */}
        <div
          className={`p-6 rounded-3xl border transition shadow-xl backdrop-blur-md ${
            theme === 'dark' ? 'bg-slate-900/90 border-slate-700/60' : 'bg-white border-blue-200/80'
          }`}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center">
              <SlicerFilterIcon size={22} />
            </div>
            <div>
              <h3 className={`text-base font-black ${theme === 'dark' ? 'text-white' : 'text-[#000000]'}`}>
                {tx('สัดส่วนรายได้แยกตามช่องทาง', 'Revenue Share by Platform')}
              </h3>
              <p className={`text-xs font-semibold ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                {tx('คลิกเพื่อฟิลเตอร์ตามช่องทาง', 'Click slice to cross-filter')}
              </p>
            </div>
          </div>

          <div className="h-64 w-full flex items-center justify-center relative">
            <Doughnut
              data={channelDonutData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                onClick: (event, elements) => {
                  if (elements && elements.length > 0) {
                    const clickedIndex = elements[0].index;
                    const clickedChannel = channelsList[clickedIndex];
                    if (clickedChannel) {
                      setSelectedChannel(prev => (prev === clickedChannel ? 'all' : clickedChannel));
                      hotToast.success(tx(`กรองข้อมูลตามช่องทาง: ${clickedChannel}`, `Filtered by: ${clickedChannel}`));
                    }
                  }
                },
                plugins: {
                  legend: {
                    position: 'bottom',
                    labels: {
                      color: theme === 'dark' ? '#E2E8F0' : '#0F172A',
                      font: { weight: 'bold', size: 10 }
                    }
                  },
                  tooltip: {
                    callbacks: {
                      label: ctx => `${ctx.label}: ฿${(ctx.parsed || 0).toLocaleString()}`
                    }
                  }
                },
                cutout: '70%'
              }}
            />
            {/* Center Total Overlay */}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pb-6">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total</span>
              <span className={`text-base font-black ${theme === 'dark' ? 'text-white' : 'text-[#000000]'}`}>
                ฿{(metrics.grossRevenue / 1000).toFixed(0)}k
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 5. P&L FINANCIAL WATERFALL CHART (สะพานงบการเงินกำไรขาดทุน)  */}
      {/* ========================================================= */}
      <div
        className={`p-6 rounded-3xl border transition shadow-xl backdrop-blur-md ${
          theme === 'dark' ? 'bg-slate-900/90 border-slate-700/60' : 'bg-white border-blue-200/80'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center">
              <WaterfallChartIcon size={22} />
            </div>
            <div>
              <h3 className={`text-base font-black ${theme === 'dark' ? 'text-white' : 'text-[#000000]'}`}>
                {tx('สะพานงบกำไรขาดทุน P&L Bridge (Executive Financial Waterfall)', 'P&L Variance Bridge (Waterfall Visual)')}
              </h3>
              <p className={`text-xs font-semibold ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                {tx(
                  'จำแนกจากรายได้รวม หักลบต้นทุนสินค้า (CoGS), ค่าโฆษณา & แพลตฟอร์ม, ค่าใช้จ่ายสาขา สู่กำไรสุทธิจากการดำเนินงาน',
                  'Step-by-step breakdown from Gross Revenue to Net Operating Profit'
                )}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowCostSettings(prev => !prev)}
            className="px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-500/15 text-amber-400 border border-amber-400/30 hover:bg-amber-500/25 transition cursor-pointer self-start sm:self-center flex items-center gap-1.5"
          >
            <span>⚙️</span>
            <span>{showCostSettings ? tx('ซ่อนตัวปรับต้นทุน', 'Hide Cost Controls') : tx('ปรับสมมติฐานต้นทุน %', 'Adjust Cost %')}</span>
          </button>
        </div>

        {/* Interactive Cost Assumption Adjuster Panel */}
        {showCostSettings && (
          <div className={`mb-6 p-4 rounded-2xl border ${theme === 'dark' ? 'bg-slate-800/80 border-amber-400/30' : 'bg-amber-50/70 border-amber-200'} grid grid-cols-1 sm:grid-cols-3 gap-4 animate-in fade-in`}>
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className={theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}>{tx('ต้นทุนสินค้า (CoGS %)', 'Cost of Goods Sold (CoGS %)')}</span>
                <span className="text-amber-400 font-mono">{costAssumptions.cogsPct}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="80"
                value={costAssumptions.cogsPct}
                onChange={e => setCostAssumptions(prev => ({ ...prev, cogsPct: Number(e.target.value) }))}
                className="w-full accent-amber-400 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className={theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}>{tx('ค่าการตลาดและแอด (Marketing %)', 'Marketing & Ads %')}</span>
                <span className="text-sky-400 font-mono">{costAssumptions.marketingPct}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="40"
                value={costAssumptions.marketingPct}
                onChange={e => setCostAssumptions(prev => ({ ...prev, marketingPct: Number(e.target.value) }))}
                className="w-full accent-sky-400 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className={theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}>{tx('ค่าใช้จ่ายสาขา/หน้าร้าน (OPEX %)', 'Store Overhead & OPEX %')}</span>
                <span className="text-indigo-400 font-mono">{costAssumptions.opexPct}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="40"
                value={costAssumptions.opexPct}
                onChange={e => setCostAssumptions(prev => ({ ...prev, opexPct: Number(e.target.value) }))}
                className="w-full accent-indigo-400 cursor-pointer"
              />
            </div>
          </div>
        )}

        {/* Visual Waterfall Bars Representation */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
          {waterfallLabels.map((lbl, idx) => {
            const val = waterfallValues[idx];
            const isPositive = val >= 0;
            const isTotal = idx === 0 || idx === 4;

            return (
              <div
                key={lbl}
                className={`p-4 rounded-2xl border transition flex flex-col justify-between ${
                  isTotal
                    ? idx === 0
                      ? 'bg-sky-500/10 border-sky-400/40 text-sky-400'
                      : 'bg-amber-500/10 border-amber-400/50 text-amber-400'
                    : isPositive
                    ? 'bg-emerald-500/10 border-emerald-400/40 text-emerald-400'
                    : 'bg-rose-500/10 border-rose-400/40 text-rose-400'
                }`}
              >
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">{lbl}</div>
                  <div className={`text-lg font-black ${isTotal ? (theme === 'dark' ? 'text-white' : 'text-[#000000]') : isPositive ? 'text-emerald-500' : 'text-rose-500'}`}>
                    {val < 0 ? `-฿${Math.abs(val).toLocaleString()}` : `฿${val.toLocaleString()}`}
                    {val != null && !isNaN(val) ? (val < 0 ? `-฿${Math.abs(val).toLocaleString()}` : `฿${val.toLocaleString()}`) : '฿0'}
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-700/30 flex items-center justify-between text-[11px] font-bold">
                  <span className="text-slate-400">
                    {idx === 0 ? '100%' : `${((Math.abs(val) / (metrics.grossRevenue || 1)) * 100).toFixed(1)}%`}
                  </span>
                  <span className={isTotal ? 'text-amber-400' : isPositive ? 'text-emerald-400' : 'text-rose-400'}>
                    {idx === 0 ? 'ฐานตั้งต้น' : idx === 4 ? 'กำไรสุทธิ' : 'หักออก'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========================================================= */}
      {/* 6. EXECUTIVE PIVOT MATRIX (ตารางพิวอตสไตล์ Power BI Matrix)  */}
      {/* ========================================================= */}
      <div
        className={`p-6 rounded-3xl border transition shadow-xl backdrop-blur-md overflow-hidden ${
          theme === 'dark' ? 'bg-slate-900/90 border-slate-700/60' : 'bg-white border-blue-200/80'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
              <MatrixTableIcon size={22} />
            </div>
            <div>
              <h3 className={`text-base font-black ${theme === 'dark' ? 'text-white' : 'text-[#000000]'}`}>
                {tx('ตารางแมทริกซ์เจาะลึก (Executive Drill-Down Pivot Matrix)', 'Executive Drill-Down Pivot Matrix Table')}
              </h3>
              <p className={`text-xs font-semibold ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                {tx(
                  'คลิกขยายมิติข้อมูล สาขา ➡️ หมวดสินค้า ➡️ ช่องทางการขาย พร้อมหลอดเปรียบเทียบขนาด (Data Bars)',
                  'Hierarchical drill-down: Branch ➡️ Category ➡️ Platform with in-cell data bars'
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                const allExpanded = {};
                matrixTreeData.forEach(b => {
                  allExpanded[b.name] = true;
                });
                setExpandedMatrixRows(allExpanded);
              }}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 cursor-pointer"
            >
              {tx('ขยายทั้งหมด', 'Expand All')}
            </button>
            <button
              type="button"
              onClick={() => setExpandedMatrixRows({})}
              className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 cursor-pointer"
            >
              {tx('ยุบทั้งหมด', 'Collapse All')}
            </button>
          </div>
        </div>

        {/* Matrix Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-medium border-collapse">
            <thead>
              <tr className={`border-b ${theme === 'dark' ? 'border-slate-800 text-slate-400 bg-slate-950/60' : 'border-slate-200 text-slate-700 bg-slate-100'}`}>
                <th className="py-3 px-4 font-black uppercase tracking-wider">{tx('โครงสร้างมิติข้อมูล (Hierarchy)', 'Dimension Hierarchy')}</th>
                <th className="py-3 px-4 font-black uppercase tracking-wider text-right">{tx('จำนวนบิล', 'Orders')}</th>
                <th className="py-3 px-4 font-black uppercase tracking-wider text-right">{tx('ยอดขายรวม (Revenue)', 'Gross Revenue')}</th>
                <th className="py-3 px-4 font-black uppercase tracking-wider text-left">{tx('หลอดสัดส่วน (Data Bar)', 'Share Visual Bar')}</th>
                <th className="py-3 px-4 font-black uppercase tracking-wider text-right">{tx('ประมาณการกำไร', 'Est. Net Margin')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40">
              {matrixTreeData.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 px-4 text-center">
                    <div className="flex flex-col items-center justify-center gap-2">
                      <span className="text-3xl">📂</span>
                      <span className={`text-sm font-black ${theme === 'dark' ? 'text-slate-300' : 'text-slate-700'}`}>
                        {tx('ยังไม่มีข้อมูลในระบบ — กรุณาอัปโหลดไฟล์ด้านบนเพื่อเริ่มต้นวิเคราะห์', 'No data in system — Please upload a data file above to begin analytics')}
                      </span>
                      <span className="text-xs text-slate-400">
                        {tx('รองรับไฟล์ CSV, Excel, TXT, JSON ทั้งชื่อไฟล์ภาษาไทยและภาษาอังกฤษ', 'Supports CSV, Excel, TXT, JSON with Thai and English filenames')}
                      </span>
                    </div>
                  </td>
                </tr>
              ) : (
                matrixTreeData.map(branchItem => {
                  const isExpanded = !!expandedMatrixRows[branchItem.name];
                  const branchPercentOfMax = Math.round((branchItem.totalRevenue / maxBranchRevenue) * 100);

                  return (
                    <React.Fragment key={branchItem.name}>
                    {/* Level 1: Branch Row */}
                    <tr
                      onClick={() => toggleExpandMatrix(branchItem.name)}
                      className={`cursor-pointer transition-colors font-bold ${
                        theme === 'dark' ? 'hover:bg-slate-800/60 bg-slate-900/40' : 'hover:bg-blue-50/70 bg-white'
                      }`}
                    >
                      <td className="py-3.5 px-4 flex items-center gap-2.5">
                        <span className="w-5 h-5 rounded-md bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs font-black">
                          {isExpanded ? '−' : '+'}
                        </span>
                        <span className={`text-sm font-black ${theme === 'dark' ? 'text-white' : 'text-[#000000]'}`}>
                          🏢 {branchItem.name}
                        </span>
                      </td>
                      <td className={`py-3.5 px-4 text-right ${theme === 'dark' ? 'text-slate-300' : 'text-slate-800'}`}>
                        {(branchItem.orders || 0).toLocaleString()}
                      </td>
                      <td className={`py-3.5 px-4 text-right font-black ${theme === 'dark' ? 'text-white' : 'text-[#000000]'}`}>
                        ฿{(branchItem.totalRevenue || 0).toLocaleString()}
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="w-36 h-2.5 rounded-full bg-slate-800 overflow-hidden">
                          <div className="h-full rounded-full bg-gradient-to-r from-sky-500 to-indigo-500" style={{ width: `${branchPercentOfMax}%` }} />
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-right font-bold text-emerald-500">
                        26.4%
                      </td>
                    </tr>

                    {/* Level 2: Categories under Branch */}
                    {isExpanded &&
                      Object.values(branchItem.categories).map(catItem => (
                        <tr
                          key={`${branchItem.name}-${catItem.name}`}
                          className={theme === 'dark' ? 'bg-slate-950/40 text-slate-300' : 'bg-slate-50 text-slate-800'}
                        >
                          <td className="py-2.5 px-4 pl-12 flex items-center gap-2">
                            <span className="text-purple-400 font-bold">└</span>
                            <span>🏷️ {catItem.name}</span>
                          </td>
                          <td className="py-2.5 px-4 text-right text-slate-400">{(catItem.orders || 0).toLocaleString()}</td>
                          <td className={`py-2.5 px-4 text-right font-semibold ${theme === 'dark' ? 'text-slate-200' : 'text-slate-900'}`}>
                            ฿{(catItem.revenue || 0).toLocaleString()}
                          </td>
                          <td className="py-2.5 px-4">
                            <div className="w-24 h-1.5 rounded-full bg-slate-800 overflow-hidden">
                              <div
                                className="h-full rounded-full bg-purple-500"
                                style={{ width: `${Math.round((catItem.revenue / (branchItem.totalRevenue || 1)) * 100)}%` }}
                              />
                            </div>
                          </td>
                          <td className="py-2.5 px-4 text-right text-emerald-400 font-medium">
                            28.0%
                          </td>
                        </tr>
                      ))}
                  </React.Fragment>
                );
              }))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  ) : (
    /* ========================================================= */
    /* 3.2. DEEP-DIVE KPI STUDIO (สูตรคำนวณ KPI เจาะลึกเฉพาะทาง)  */
    /* ========================================================= */
    <div className="space-y-6">
      {/* 1. SCENARIO SIMULATION TOOLBAR */}
      <div
        className={`p-6 rounded-3xl border transition shadow-xl backdrop-blur-xl ${
          theme === 'dark'
            ? 'bg-gradient-to-r from-slate-900/95 via-indigo-950/40 to-slate-900/95 border-emerald-500/30'
            : 'bg-white/95 border-emerald-200 shadow-emerald-500/5'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-black text-xl border border-emerald-500/30">
              🎮
            </span>
            <div>
              <h2 className={`text-base font-black ${theme === 'dark' ? 'text-white' : 'text-[#000000]'}`}>
                {tx('จำลองสถานการณ์ Unit Economics (What-If Interactive Simulation)', 'Unit Economics Interactive What-If Simulation')}
              </h2>
              <p className={`text-xs font-semibold ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                {tx(
                  'ปรับแต่งตัวแปรแบบเรียลไทม์เพื่อดูผลกระทบต่อ LTV:CAC, GMROI, ความยืดหยุ่นของราคา และจุดคุ้มทุน',
                  'Tweak real-time scenario levers to project GMROI, LTV:CAC, Price Elasticity and Breakeven.'
                )}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => {
              setKpiPriceSimPct(0);
              setKpiAdSpendSimMultiplier(1.0);
              setKpiInventorySimMultiplier(1.0);
              hotToast.success(tx('รีเซ็ตตัวแปรจำลองสถานการณ์แล้ว', 'Simulation levers reset to baseline'));
            }}
            className={`px-4 py-2 rounded-xl text-xs font-bold border transition cursor-pointer flex items-center gap-2 self-start md:self-auto ${
              theme === 'dark'
                ? 'bg-slate-800 hover:bg-slate-700 text-slate-200 border-slate-700'
                : 'bg-slate-100 hover:bg-slate-200 text-[#000000] border-slate-300'
            }`}
          >
            <span>🔄</span>
            <span>{tx('คืนค่าเดิม (Reset Levers)', 'Reset Levers')}</span>
          </button>
        </div>

        {/* 3 Simulation Levers */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-3 border-t border-slate-700/40 dark:border-slate-800">
          {/* Lever 1: Price Sensitivity */}
          <div className={`p-4 rounded-2xl border ${theme === 'dark' ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
            <div className="flex items-center justify-between mb-2">
              <label className={`text-xs font-black ${theme === 'dark' ? 'text-amber-400' : 'text-[#000000]'}`}>
                🏷️ {tx('ปรับราคาสินค้าเฉลี่ย (Price Δ)', 'Price Sensitivity Δ')}
              </label>
              <span className={`px-2 py-0.5 rounded-lg text-xs font-black ${
                kpiPriceSimPct > 0 ? 'bg-emerald-500/20 text-emerald-400' : kpiPriceSimPct < 0 ? 'bg-rose-500/20 text-rose-400' : 'bg-slate-500/20 text-slate-400'
              }`}>
                {kpiPriceSimPct > 0 ? `+${kpiPriceSimPct}%` : `${kpiPriceSimPct}%`}
              </span>
            </div>
            <input
              type="range"
              min="-15"
              max="15"
              step="1"
              value={kpiPriceSimPct}
              onChange={e => setKpiPriceSimPct(Number(e.target.value))}
              className="w-full accent-amber-500 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] font-semibold text-slate-500 mt-1">
              <span>-15% (ลดราคา)</span>
              <span>0% (ราคาเดิม)</span>
              <span>+15% (ขึ้นราคา)</span>
            </div>
          </div>

          {/* Lever 2: Ad Spend Multiplier */}
          <div className={`p-4 rounded-2xl border ${theme === 'dark' ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
            <div className="flex items-center justify-between mb-2">
              <label className={`text-xs font-black ${theme === 'dark' ? 'text-sky-400' : 'text-[#000000]'}`}>
                📢 {tx('ตัวคูณงบการตลาด (Ad Spend Factor)', 'Ad Spend Multiplier')}
              </label>
              <span className="px-2 py-0.5 rounded-lg text-xs font-black bg-sky-500/20 text-sky-400">
                {kpiAdSpendSimMultiplier.toFixed(1)}x (฿{Math.round(metrics.marketingExpense * kpiAdSpendSimMultiplier).toLocaleString()})
              </span>
            </div>
            <input
              type="range"
              min="0.5"
              max="2.0"
              step="0.1"
              value={kpiAdSpendSimMultiplier}
              onChange={e => setKpiAdSpendSimMultiplier(Number(e.target.value))}
              className="w-full accent-sky-500 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] font-semibold text-slate-500 mt-1">
              <span>0.5x (ลดงบยิงแอด)</span>
              <span>1.0x (ปัจจุบัน)</span>
              <span>2.0x (เร่งแคมเปญ)</span>
            </div>
          </div>

          {/* Lever 3: Inventory Buffer */}
          <div className={`p-4 rounded-2xl border ${theme === 'dark' ? 'bg-slate-900/60 border-slate-800' : 'bg-slate-50 border-slate-200'}`}>
            <div className="flex items-center justify-between mb-2">
              <label className={`text-xs font-black ${theme === 'dark' ? 'text-emerald-400' : 'text-[#000000]'}`}>
                📦 {tx('ตัวคูณสต็อกสินค้าคงคลัง (Inventory Buffer)', 'Inventory Buffer')}
              </label>
              <span className="px-2 py-0.5 rounded-lg text-xs font-black bg-emerald-500/20 text-emerald-400">
                {kpiInventorySimMultiplier.toFixed(1)}x
              </span>
            </div>
            <input
              type="range"
              min="0.5"
              max="2.0"
              step="0.1"
              value={kpiInventorySimMultiplier}
              onChange={e => setKpiInventorySimMultiplier(Number(e.target.value))}
              className="w-full accent-emerald-500 cursor-pointer"
            />
            <div className="flex justify-between text-[11px] font-semibold text-slate-500 mt-1">
              <span>0.5x (Lean สต็อก)</span>
              <span>1.0x (ปกติ)</span>
              <span>2.0x (สำรองสต็อก)</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. 6 DEEP-DIVE KPI SCORECARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* KPI 1: GMROI */}
        <div
          className={`p-6 rounded-3xl border transition shadow-xl relative overflow-hidden ${
            theme === 'dark' ? 'bg-slate-900/90 border-slate-700/60' : 'bg-white border-blue-200/80'
          }`}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className={`text-xs font-bold uppercase tracking-wider ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                📦 {tx('ผลตอบแทนสต็อกต่อกำไรขั้นต้น', 'Gross Margin Return on Inventory')}
              </span>
              <h3 className={`text-lg font-black mt-0.5 ${theme === 'dark' ? 'text-white' : 'text-[#000000]'}`}>
                GMROI
              </h3>
            </div>
            <span
              className={`px-3 py-1 rounded-xl text-xs font-black border ${
                deepDiveKpis.gmroiNum >= 2.5
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                  : deepDiveKpis.gmroiNum >= 1.8
                  ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                  : 'bg-rose-500/20 text-rose-400 border-rose-500/30'
              }`}
            >
              {deepDiveKpis.gmroiNum >= 2.5
                ? tx('ยอดเยี่ยม (High)', 'High')
                : deepDiveKpis.gmroiNum >= 1.8
                ? tx('ปานกลาง (Balanced)', 'Balanced')
                : tx('สต็อกหมุนช้า (Low)', 'Low')}
            </span>
          </div>

          <div className="mt-4 flex items-baseline gap-2">
            <span className={`text-4xl font-black ${theme === 'dark' ? 'text-white' : 'text-[#000000]'}`}>
              {deepDiveKpis.gmroi}x
            </span>
            <span className="text-xs font-bold text-slate-400">
              {tx('เท่าของเงินลงทุนสต็อก', 'times inventory cost')}
            </span>
          </div>

          <div className="mt-3 text-xs font-semibold text-slate-400 flex items-center justify-between border-t border-slate-700/40 dark:border-slate-800 pt-3">
            <span>{tx('เกณฑ์สากล (Benchmark):', 'Global Benchmark:')}</span>
            <span className="font-black text-emerald-400">≥ 2.50x</span>
          </div>

          <div className={`mt-3 p-3 rounded-2xl text-xs font-mono ${theme === 'dark' ? 'bg-slate-950/60 text-slate-300' : 'bg-slate-100 text-slate-800'}`}>
            <div className="text-[11px] font-bold text-amber-400 mb-1">สูตรคำนวณ: Gross Profit ÷ Avg Inventory Cost</div>
            <div>฿{deepDiveKpis.grossProfit.toLocaleString()} ÷ ฿{Math.round(deepDiveKpis.avgInventoryCost).toLocaleString()}</div>
          </div>
        </div>

        {/* KPI 2: LTV:CAC Ratio & Payback */}
        <div
          className={`p-6 rounded-3xl border transition shadow-xl relative overflow-hidden ${
            theme === 'dark' ? 'bg-slate-900/90 border-slate-700/60' : 'bg-white border-blue-200/80'
          }`}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className={`text-xs font-bold uppercase tracking-wider ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                🎯 {tx('ความคุ้มค่าในการหาลูกค้า', 'Customer Lifetime vs Acquisition')}
              </span>
              <h3 className={`text-lg font-black mt-0.5 ${theme === 'dark' ? 'text-white' : 'text-[#000000]'}`}>
                LTV : CAC Ratio
              </h3>
            </div>
            <span
              className={`px-3 py-1 rounded-xl text-xs font-black border ${
                deepDiveKpis.ltvCacNum >= 3.0
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                  : deepDiveKpis.ltvCacNum >= 2.0
                  ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                  : 'bg-rose-500/20 text-rose-400 border-rose-500/30'
              }`}
            >
              {deepDiveKpis.ltvCacNum >= 3.0
                ? tx('สเกลได้ดีมาก (Scalable)', 'Highly Scalable')
                : deepDiveKpis.ltvCacNum >= 2.0
                ? tx('พอใช้ (Sustainable)', 'Sustainable')
                : tx('ค่าแอดสูงเกินไป (High CAC)', 'High CAC')}
            </span>
          </div>

          <div className="mt-4 flex items-baseline gap-2">
            <span className={`text-4xl font-black ${theme === 'dark' ? 'text-white' : 'text-[#000000]'}`}>
              {deepDiveKpis.ltvToCac}x
            </span>
            <span className="text-xs font-bold text-slate-400">
              {tx('เท่าของค่าโฆษณา', 'times CAC')}
            </span>
          </div>

          <div className="mt-3 text-xs font-semibold text-slate-400 flex items-center justify-between border-t border-slate-700/40 dark:border-slate-800 pt-3">
            <span>{tx('CAC Payback Period:', 'CAC Payback Period:')}</span>
            <span className="font-black text-sky-400">{deepDiveKpis.cacPaybackMonths} {tx('เดือน (เกณฑ์ < 12 ด.)', 'mos (<12 mos)')}</span>
          </div>

          <div className={`mt-3 p-3 rounded-2xl text-xs font-mono ${theme === 'dark' ? 'bg-slate-950/60 text-slate-300' : 'bg-slate-100 text-slate-800'}`}>
            <div className="text-[11px] font-bold text-sky-400 mb-1">CLV: ฿{deepDiveKpis.clv.toLocaleString()} | CAC: ฿{deepDiveKpis.cac.toLocaleString()}</div>
            <div>สูตรคำนวณ: CLV ÷ CAC (Benchmark: 3.0x – 5.0x)</div>
          </div>
        </div>

        {/* KPI 3: Sell-Through Rate (STR %) */}
        <div
          className={`p-6 rounded-3xl border transition shadow-xl relative overflow-hidden ${
            theme === 'dark' ? 'bg-slate-900/90 border-slate-700/60' : 'bg-white border-blue-200/80'
          }`}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className={`text-xs font-bold uppercase tracking-wider ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                ⚡ {tx('อัตราการระบายสินค้าออกจากคลัง', 'Inventory Clearance Efficiency')}
              </span>
              <h3 className={`text-lg font-black mt-0.5 ${theme === 'dark' ? 'text-white' : 'text-[#000000]'}`}>
                Sell-Through Rate (STR)
              </h3>
            </div>
            <span
              className={`px-3 py-1 rounded-xl text-xs font-black border ${
                Number(deepDiveKpis.strPct) >= 70
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                  : Number(deepDiveKpis.strPct) >= 50
                  ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                  : 'bg-rose-500/20 text-rose-400 border-rose-500/30'
              }`}
            >
              {Number(deepDiveKpis.strPct) >= 70
                ? tx('ระบายไวมาก (Fast)', 'Fast Turnover')
                : Number(deepDiveKpis.strPct) >= 50
                ? tx('ปกติ (Healthy)', 'Healthy')
                : tx('สต็อกตกค้าง (Slow)', 'Slow')}
            </span>
          </div>

          <div className="mt-4 flex items-baseline gap-2">
            <span className={`text-4xl font-black ${theme === 'dark' ? 'text-white' : 'text-[#000000]'}`}>
              {deepDiveKpis.strPct}%
            </span>
            <span className="text-xs font-bold text-slate-400">
              {tx('ของสต็อกที่พร้อมจำหน่าย', 'of available inventory')}
            </span>
          </div>

          <div className="mt-3 text-xs font-semibold text-slate-400 flex items-center justify-between border-t border-slate-700/40 dark:border-slate-800 pt-3">
            <span>{tx('เกณฑ์สากล (Benchmark):', 'Global Benchmark:')}</span>
            <span className="font-black text-emerald-400">70% – 85%</span>
          </div>

          <div className={`mt-3 p-3 rounded-2xl text-xs font-mono ${theme === 'dark' ? 'bg-slate-950/60 text-slate-300' : 'bg-slate-100 text-slate-800'}`}>
            <div className="text-[11px] font-bold text-emerald-400 mb-1">ขายได้: {deepDiveKpis.unitsSold.toLocaleString()} ชิ้น / มีของ {deepDiveKpis.totalStockAvailable.toLocaleString()} ชิ้น</div>
            <div>สูตรคำนวณ: (Units Sold ÷ Total Inventory) × 100</div>
          </div>
        </div>

        {/* KPI 4: Repeat Purchase Rate (RPR %) */}
        <div
          className={`p-6 rounded-3xl border transition shadow-xl relative overflow-hidden ${
            theme === 'dark' ? 'bg-slate-900/90 border-slate-700/60' : 'bg-white border-blue-200/80'
          }`}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className={`text-xs font-bold uppercase tracking-wider ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                🔄 {tx('อัตราลูกค้ากลับมาซื้อซ้ำ', 'Customer Retention & Loyalty')}
              </span>
              <h3 className={`text-lg font-black mt-0.5 ${theme === 'dark' ? 'text-white' : 'text-[#000000]'}`}>
                Repeat Purchase Rate (RPR)
              </h3>
            </div>
            <span
              className={`px-3 py-1 rounded-xl text-xs font-black border ${
                Number(deepDiveKpis.rprPct) >= 30
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                  : Number(deepDiveKpis.rprPct) >= 20
                  ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                  : 'bg-rose-500/20 text-rose-400 border-rose-500/30'
              }`}
            >
              {Number(deepDiveKpis.rprPct) >= 30
                ? tx('ความภักดีสูง (Loyal)', 'High Loyalty')
                : Number(deepDiveKpis.rprPct) >= 20
                ? tx('ระดับทั่วไป (Normal)', 'Normal')
                : tx('เสี่ยงลูกค้าหาย (Churn Risk)', 'Churn Risk')}
            </span>
          </div>

          <div className="mt-4 flex items-baseline gap-2">
            <span className={`text-4xl font-black ${theme === 'dark' ? 'text-white' : 'text-[#000000]'}`}>
              {deepDiveKpis.rprPct}%
            </span>
            <span className="text-xs font-bold text-slate-400">
              {tx('ของฐานลูกค้าทั้งหมด', 'of unique customers')}
            </span>
          </div>

          <div className="mt-3 text-xs font-semibold text-slate-400 flex items-center justify-between border-t border-slate-700/40 dark:border-slate-800 pt-3">
            <span>{tx('อัตราลูกค้าไม่ซื้อซ้ำ (Churn):', 'Churn Rate:')}</span>
            <span className="font-black text-rose-400">{deepDiveKpis.churnPct}%</span>
          </div>

          <div className={`mt-3 p-3 rounded-2xl text-xs font-mono ${theme === 'dark' ? 'bg-slate-950/60 text-slate-300' : 'bg-slate-100 text-slate-800'}`}>
            <div className="text-[11px] font-bold text-purple-400 mb-1">ลูกค้าซื้อซ้ำ: {deepDiveKpis.repeatCustomers.toLocaleString()} / ลูกค้าทั้งหมด: {deepDiveKpis.uniqueCustomers.toLocaleString()} ราย</div>
            <div>สูตรคำนวณ: (Repeat Customers ÷ Total Unique) × 100</div>
          </div>
        </div>

        {/* KPI 5: Price Elasticity of Demand (PED) */}
        <div
          className={`p-6 rounded-3xl border transition shadow-xl relative overflow-hidden ${
            theme === 'dark' ? 'bg-slate-900/90 border-slate-700/60' : 'bg-white border-blue-200/80'
          }`}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className={`text-xs font-bold uppercase tracking-wider ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                🏷️ {tx('ความยืดหยุ่นของอุปสงค์ต่อราคา', 'Price Elasticity of Demand')}
              </span>
              <h3 className={`text-lg font-black mt-0.5 ${theme === 'dark' ? 'text-white' : 'text-[#000000]'}`}>
                Price Elasticity (PED)
              </h3>
            </div>
            <span className="px-3 py-1 rounded-xl text-xs font-black border bg-sky-500/20 text-sky-400 border-sky-500/30">
              Inelastic (|PED| &lt; 1.0)
            </span>
          </div>

          <div className="mt-4 flex items-baseline gap-2">
            <span className={`text-4xl font-black ${theme === 'dark' ? 'text-white' : 'text-[#000000]'}`}>
              {deepDiveKpis.basePed.toFixed(2)}
            </span>
            <span className="text-xs font-bold text-slate-400">
              {tx('สัมประสิทธิ์ความยืดหยุ่น', 'elasticity coefficient')}
            </span>
          </div>

          <div className="mt-3 text-xs font-semibold text-slate-400 flex items-center justify-between border-t border-slate-700/40 dark:border-slate-800 pt-3">
            <span>{tx('ผลต่อยอดขายสุทธิ (Δ Rev):', 'Net Revenue Impact:')}</span>
            <span className={`font-black ${deepDiveKpis.revenueDelta >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
              {deepDiveKpis.revenueDelta >= 0 ? `+฿${deepDiveKpis.revenueDelta.toLocaleString()}` : `-฿${Math.abs(deepDiveKpis.revenueDelta).toLocaleString()}`}
            </span>
          </div>

          <div className={`mt-3 p-3 rounded-2xl text-xs font-mono ${theme === 'dark' ? 'bg-slate-950/60 text-slate-300' : 'bg-slate-100 text-slate-800'}`}>
            <div className="text-[11px] font-bold text-amber-400 mb-1">ปรับราคา {kpiPriceSimPct > 0 ? `+${kpiPriceSimPct}%` : `${kpiPriceSimPct}%`} → ดีมานด์ {deepDiveKpis.projectedDemandChangePct}%</div>
            <div>รายได้จำลองใหม่: ฿{deepDiveKpis.projectedSimRevenue.toLocaleString()}</div>
          </div>
        </div>

        {/* KPI 6: Breakeven Volume & Margin of Safety */}
        <div
          className={`p-6 rounded-3xl border transition shadow-xl relative overflow-hidden ${
            theme === 'dark' ? 'bg-slate-900/90 border-slate-700/60' : 'bg-white border-blue-200/80'
          }`}
        >
          <div className="flex items-start justify-between gap-3">
            <div>
              <span className={`text-xs font-bold uppercase tracking-wider ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                ⚖️ {tx('จุดคุ้มทุนคำสั่งซื้อ & ส่วนเผื่อความปลอดภัย', 'Breakeven Volume & Margin of Safety')}
              </span>
              <h3 className={`text-lg font-black mt-0.5 ${theme === 'dark' ? 'text-white' : 'text-[#000000]'}`}>
                Breakeven Orders (BEP)
              </h3>
            </div>
            <span
              className={`px-3 py-1 rounded-xl text-xs font-black border ${
                Number(deepDiveKpis.marginOfSafetyPct) >= 20
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                  : Number(deepDiveKpis.marginOfSafetyPct) >= 10
                  ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                  : 'bg-rose-500/20 text-rose-400 border-rose-500/30'
              }`}
            >
              MoS: {deepDiveKpis.marginOfSafetyPct}%
            </span>
          </div>

          <div className="mt-4 flex items-baseline gap-2">
            <span className={`text-4xl font-black ${theme === 'dark' ? 'text-white' : 'text-[#000000]'}`}>
              {deepDiveKpis.breakevenOrders.toLocaleString()}
            </span>
            <span className="text-xs font-bold text-slate-400">
              {tx('ออเดอร์เพื่อคุ้มทุน OPEX', 'orders to cover fixed OPEX')}
            </span>
          </div>

          <div className="mt-3 text-xs font-semibold text-slate-400 flex items-center justify-between border-t border-slate-700/40 dark:border-slate-800 pt-3">
            <span>{tx('กำไรส่วนเกินต่อบิล (CM):', 'Contribution Margin/Order:')}</span>
            <span className="font-black text-emerald-400">฿{deepDiveKpis.contributionMarginPerOrder.toLocaleString()}</span>
          </div>

          <div className={`mt-3 p-3 rounded-2xl text-xs font-mono ${theme === 'dark' ? 'bg-slate-950/60 text-slate-300' : 'bg-slate-100 text-slate-800'}`}>
            <div className="text-[11px] font-bold text-emerald-400 mb-1">Fixed OPEX: ฿{metrics.opexAmount.toLocaleString()} ÷ CM ฿{deepDiveKpis.contributionMarginPerOrder.toLocaleString()}</div>
            <div>ออเดอร์จริงปัจจุบัน: {metrics.ordersCount.toLocaleString()} บิล (ปลอดภัย)</div>
          </div>
        </div>
      </div>

      {/* 3. EXECUTIVE FORMULA CATALOG DIRECTORY (คลังสูตรคำนวณมาตรฐาน 7 รายการ) */}
      <div
        className={`p-6 rounded-3xl border transition shadow-xl backdrop-blur-xl ${
          theme === 'dark' ? 'bg-slate-900/95 border-slate-700/60' : 'bg-white border-blue-200/80'
        }`}
      >
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-black text-xl border border-amber-500/30">
              📐
            </span>
            <div>
              <h3 className={`text-base font-black ${theme === 'dark' ? 'text-white' : 'text-[#000000]'}`}>
                {tx('คลังสูตรคำนวณ KPI เจาะลึกเฉพาะทางและเกณฑ์วัดผลมาตรฐาน (7 Core Business Formulas)', '7 Core Deep-Dive Business KPI Formulas Catalog')}
              </h3>
              <p className={`text-xs font-semibold ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
                {tx(
                  'สูตรทางคณิตศาสตร์และ DAX Expression ระดับสากลเพื่อการบริหารคลังสินค้า, Unit Economics และความยั่งยืนทางการเงิน',
                  'Enterprise mathematical and DAX formulas for inventory, unit economics, pricing and financial sustainability.'
                )}
              </p>
            </div>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-amber-500/20 text-amber-400 border border-amber-400/30">
            {tx('อิงตามมาตรฐาน Harvard Business Review & CFA', 'HBR & CFA Institute Benchmarks')}
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className={`border-b ${theme === 'dark' ? 'border-slate-800 text-slate-400 bg-slate-950/60' : 'border-slate-200 text-slate-600 bg-slate-50'}`}>
                <th className="py-3 px-4 font-black uppercase tracking-wider">{tx('ตัวชี้วัด (KPI)', 'KPI Name')}</th>
                <th className="py-3 px-4 font-black uppercase tracking-wider">{tx('หมวดหมู่', 'Domain')}</th>
                <th className="py-3 px-4 font-black uppercase tracking-wider">{tx('สูตรคำนวณคณิตศาสตร์ / DAX', 'Mathematical & DAX Formula')}</th>
                <th className="py-3 px-4 font-black uppercase tracking-wider">{tx('หน่วย', 'Unit')}</th>
                <th className="py-3 px-4 font-black uppercase tracking-wider">{tx('เกณฑ์สากล (Benchmark)', 'Benchmark')}</th>
                <th className="py-3 px-4 font-black uppercase tracking-wider">{tx('การนำไปใช้ตัดสินใจ', 'Executive Action')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40">
              {/* Row 1: GMROI */}
              <tr className={`hover:bg-slate-800/20 transition ${theme === 'dark' ? 'text-slate-200' : 'text-[#000000]'}`}>
                <td className="py-3 px-4 font-bold text-amber-400 whitespace-nowrap">
                  1. GMROI (Gross Margin Return on Inventory)
                </td>
                <td className="py-3 px-4 whitespace-nowrap">
                  <span className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[11px] font-bold">
                    Inventory & Retail
                  </span>
                </td>
                <td className="py-3 px-4 font-mono text-[11px]">
                  <span className="text-sky-400 font-bold">GMROI</span> = Gross Profit ÷ Average Inventory Cost
                </td>
                <td className="py-3 px-4 font-bold text-slate-400">เท่า (x)</td>
                <td className="py-3 px-4 font-black text-emerald-400">≥ 2.50x</td>
                <td className="py-3 px-4 text-slate-400">วัดความคุ้มค่าของเงินจมในสต็อก หากต่ำกว่า 1.8x ให้เร่ง Flash Sale / Mark Down</td>
              </tr>

              {/* Row 2: LTV:CAC Ratio */}
              <tr className={`hover:bg-slate-800/20 transition ${theme === 'dark' ? 'text-slate-200' : 'text-[#000000]'}`}>
                <td className="py-3 px-4 font-bold text-sky-400 whitespace-nowrap">
                  2. LTV : CAC Ratio
                </td>
                <td className="py-3 px-4 whitespace-nowrap">
                  <span className="px-2 py-0.5 rounded-md bg-sky-500/10 text-sky-400 border border-sky-500/20 text-[11px] font-bold">
                    Unit Economics
                  </span>
                </td>
                <td className="py-3 px-4 font-mono text-[11px]">
                  <span className="text-sky-400 font-bold">LTV:CAC</span> = Customer Lifetime Value (CLV) ÷ CAC
                </td>
                <td className="py-3 px-4 font-bold text-slate-400">เท่า (x)</td>
                <td className="py-3 px-4 font-black text-emerald-400">3.0x – 5.0x</td>
                <td className="py-3 px-4 text-slate-400">ถ้า &gt; 5x แปลว่ายิงแอดน้อยเกินไป (Under-invested) ถ้า &lt; 3x สเกลแล้วเสี่ยงขาดทุน</td>
              </tr>

              {/* Row 3: CAC Payback Period */}
              <tr className={`hover:bg-slate-800/20 transition ${theme === 'dark' ? 'text-slate-200' : 'text-[#000000]'}`}>
                <td className="py-3 px-4 font-bold text-indigo-400 whitespace-nowrap">
                  3. CAC Payback Period
                </td>
                <td className="py-3 px-4 whitespace-nowrap">
                  <span className="px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 text-[11px] font-bold">
                    Cash Flow & Runway
                  </span>
                </td>
                <td className="py-3 px-4 font-mono text-[11px]">
                  <span className="text-indigo-400 font-bold">Payback</span> = CAC ÷ Monthly Gross Margin per Customer
                </td>
                <td className="py-3 px-4 font-bold text-slate-400">เดือน (Months)</td>
                <td className="py-3 px-4 font-black text-emerald-400">&lt; 12 เดือน</td>
                <td className="py-3 px-4 text-slate-400">ระยะเวลาคืนทุนค่าโฆษณา ช่วยรักษาสภาพคล่องกระแสเงินสดและลดเงินทุนหมุนเวียน</td>
              </tr>

              {/* Row 4: STR % */}
              <tr className={`hover:bg-slate-800/20 transition ${theme === 'dark' ? 'text-slate-200' : 'text-[#000000]'}`}>
                <td className="py-3 px-4 font-bold text-emerald-400 whitespace-nowrap">
                  4. Sell-Through Rate (STR %)
                </td>
                <td className="py-3 px-4 whitespace-nowrap">
                  <span className="px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] font-bold">
                    Supply Chain
                  </span>
                </td>
                <td className="py-3 px-4 font-mono text-[11px]">
                  <span className="text-emerald-400 font-bold">STR%</span> = (Units Sold ÷ Total Available Inventory) × 100
                </td>
                <td className="py-3 px-4 font-bold text-slate-400">เปอร์เซ็นต์ (%)</td>
                <td className="py-3 px-4 font-black text-emerald-400">70% – 85%</td>
                <td className="py-3 px-4 text-slate-400">ถ้า &gt; 90% เสี่ยงของขาดสต็อก (Stockout) ถ้า &lt; 50% ต้องปรับปรุงการกระจายสินค้า</td>
              </tr>

              {/* Row 5: RPR % */}
              <tr className={`hover:bg-slate-800/20 transition ${theme === 'dark' ? 'text-slate-200' : 'text-[#000000]'}`}>
                <td className="py-3 px-4 font-bold text-purple-400 whitespace-nowrap">
                  5. Repeat Purchase Rate (RPR %)
                </td>
                <td className="py-3 px-4 whitespace-nowrap">
                  <span className="px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-400 border border-purple-500/20 text-[11px] font-bold">
                    Retention & CRM
                  </span>
                </td>
                <td className="py-3 px-4 font-mono text-[11px]">
                  <span className="text-purple-400 font-bold">RPR%</span> = (Repeat Customers ÷ Total Unique Customers) × 100
                </td>
                <td className="py-3 px-4 font-bold text-slate-400">เปอร์เซ็นต์ (%)</td>
                <td className="py-3 px-4 font-black text-emerald-400">25% – 40%</td>
                <td className="py-3 px-4 text-slate-400">วัดความภักดี ยิ่งซื้อซ้ำสูง ต้นทุนการตลาดสุทธิจะลดลงต่อเนื่องแบบ Exponential</td>
              </tr>

              {/* Row 6: PED */}
              <tr className={`hover:bg-slate-800/20 transition ${theme === 'dark' ? 'text-slate-200' : 'text-[#000000]'}`}>
                <td className="py-3 px-4 font-bold text-pink-400 whitespace-nowrap">
                  6. Price Elasticity of Demand (PED)
                </td>
                <td className="py-3 px-4 whitespace-nowrap">
                  <span className="px-2 py-0.5 rounded-md bg-pink-500/10 text-pink-400 border border-pink-500/20 text-[11px] font-bold">
                    Pricing Strategy
                  </span>
                </td>
                <td className="py-3 px-4 font-mono text-[11px]">
                  <span className="text-pink-400 font-bold">PED</span> = %ΔQuantity ÷ %ΔPrice
                </td>
                <td className="py-3 px-4 font-bold text-slate-400">สัมประสิทธิ์ (Coeff)</td>
                <td className="py-3 px-4 font-black text-emerald-400">|PED| &lt; 1.0 (Inelastic)</td>
                <td className="py-3 px-4 text-slate-400">หากแบรนด์แข็งแกร่ง |PED| &lt; 1 สามารถปรับราคาสินค้าขึ้น 5–10% เพื่อเพิ่มกำไรสุทธิทันที</td>
              </tr>

              {/* Row 7: Breakeven Volume */}
              <tr className={`hover:bg-slate-800/20 transition ${theme === 'dark' ? 'text-slate-200' : 'text-[#000000]'}`}>
                <td className="py-3 px-4 font-bold text-teal-400 whitespace-nowrap">
                  7. Breakeven Volume & Margin of Safety
                </td>
                <td className="py-3 px-4 whitespace-nowrap">
                  <span className="px-2 py-0.5 rounded-md bg-teal-500/10 text-teal-400 border border-teal-500/20 text-[11px] font-bold">
                    Financial Risk
                  </span>
                </td>
                <td className="py-3 px-4 font-mono text-[11px]">
                  <span className="text-teal-400 font-bold">BEP</span> = Fixed OPEX ÷ (Price - Variable Cost)
                </td>
                <td className="py-3 px-4 font-bold text-slate-400">ออเดอร์ / ยอดขาย (฿)</td>
                <td className="py-3 px-4 font-black text-emerald-400">Margin of Safety &gt; 20%</td>
                <td className="py-3 px-4 text-slate-400">จำนวนคำสั่งซื้อขั้นต่ำเพื่อไม่ขาดทุน ช่วยกำหนด KPI ขั้นต่ำของทีมขายในแต่ละเดือน</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )}

      {/* ========================================================= */}
      {/* 7. EXECUTIVE Q&A COPILOT (ถาม-ตอบภาษาธรรมชาติสไตล์ Power BI) */}
      {/* ========================================================= */}
      <div
        className={`p-6 rounded-3xl border transition shadow-xl backdrop-blur-md ${
          theme === 'dark'
            ? 'bg-gradient-to-br from-indigo-950/60 via-slate-900/90 to-purple-950/50 border-indigo-500/30'
            : 'bg-white border-blue-200/80'
        }`}
      >
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 flex items-center justify-center">
            <ExecutiveCopilotIcon size={24} />
          </div>
          <div>
            <h3 className={`text-base font-black ${theme === 'dark' ? 'text-white' : 'text-[#000000]'}`}>
              {tx('Power BI Natural Language Q&A Copilot', 'Power BI Natural Language Q&A Copilot')}
            </h3>
            <p className={`text-xs font-semibold ${theme === 'dark' ? 'text-slate-400' : 'text-slate-600'}`}>
              {tx(
                'พิมพ์คำถามเกี่ยวกับข้อมูลธุรกิจเป็นภาษาไทยหรืออังกฤษ AI จะประมวลผลตัวเลขและกลยุทธ์ให้ทันที',
                'Ask any questions in plain Thai or English. Copilot computes real numbers instantly.'
              )}
            </p>
          </div>
        </div>

        {/* Preset Prompt Pills */}
        <div className="flex items-center flex-wrap gap-2 mb-3">
          <button
            type="button"
            onClick={() => handleRunCopilotQuery('สาขาไหนทำกำไรสุทธิสูงสุด')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer ${
              theme === 'dark'
                ? 'bg-slate-800/80 hover:bg-slate-700 text-slate-300 border-slate-700'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
            }`}
          >
            📌 {tx('สาขาไหนทำกำไรสุทธิสูงสุด?', 'Which branch has highest profit?')}
          </button>
          <button
            type="button"
            onClick={() => handleRunCopilotQuery('ช่องทางไหนโตเร็วที่สุดและ AOV เท่าไหร่')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer ${
              theme === 'dark'
                ? 'bg-slate-800/80 hover:bg-slate-700 text-slate-300 border-slate-700'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
            }`}
          >
            📌 {tx('วิเคราะห์ยอดต่อบิล AOV แยกตามช่องทาง', 'Analyze AOV by channel')}
          </button>
          <button
            type="button"
            onClick={() => handleRunCopilotQuery('สรุปสุขภาพงบกำไรขาดทุน P&L')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition cursor-pointer ${
              theme === 'dark'
                ? 'bg-slate-800/80 hover:bg-slate-700 text-slate-300 border-slate-700'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-300'
            }`}
          >
            📌 {tx('สรุปสุขภาพงบกำไรขาดทุน P&L', 'P&L Health Summary')}
          </button>
        </div>

        {/* Input Field */}
        <form
          onSubmit={e => {
            e.preventDefault();
            handleRunCopilotQuery();
          }}
          className="flex items-center gap-2"
        >
          <div className="relative flex-1">
            <input
              type="text"
              value={copilotQuery}
              onChange={e => setCopilotQuery(e.target.value)}
              placeholder={tx('พิมพ์คำถาม เช่น "ช่องทางใดสร้างกำไรสูงสุด" หรือ "วิเคราะห์แนวโน้มสาขา"...', 'Ask anything, e.g. "Which channel yields highest profit?" or "Analyze branch trends"...')}
              className={`w-full px-4 py-3 rounded-2xl text-xs font-bold border transition focus:outline-none focus:ring-2 focus:ring-purple-500 ${
                theme === 'dark' ? 'bg-slate-900 border-slate-700 text-white placeholder-slate-500' : 'bg-white border-slate-300 text-[#000000] placeholder-slate-400'
              }`}
            />
          </div>
          <button
            type="submit"
            disabled={isAnalyzingCopilot}
            className="px-5 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-black text-xs shadow-lg transition cursor-pointer flex items-center gap-2 disabled:opacity-50"
          >
            {isAnalyzingCopilot ? (
              <span>{tx('กำลังคำนวณ...', 'Computing...')}</span>
            ) : (
              <>
                <span>{tx('ถาม Copilot', 'Ask Copilot')}</span>
                <span>✨</span>
              </>
            )}
          </button>
        </form>

        {/* Copilot Response Card */}
        {copilotResponse && (
          <div className={`mt-4 p-4 rounded-2xl border transition animate-fadeIn ${
            theme === 'dark' ? 'bg-slate-900/95 border-purple-500/40 text-slate-200' : 'bg-purple-50/90 border-purple-200 text-slate-900'
          }`}>
            <div className="flex items-center justify-between text-xs font-bold text-purple-400 mb-1">
              <span>💡 คำตอบจาก InsightFlow Executive Copilot</span>
              <span className="px-2 py-0.5 rounded-md bg-purple-500/20 text-purple-300">
                {copilotResponse.highlight}
              </span>
            </div>
            <p className="text-xs font-semibold leading-relaxed mt-1">
              {copilotResponse.text}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
