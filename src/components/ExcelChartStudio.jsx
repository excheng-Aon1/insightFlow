import React, { useState, useMemo } from 'react';
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
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import { toast as hotToast } from 'react-hot-toast';

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

// Preset Palettes for Charts
const PALETTES = [
  ['#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe', '#2563eb', '#1d4ed8'],
  ['#10b981', '#34d399', '#6ee7b7', '#a7f3d0', '#059669', '#047857'],
  ['#f59e0b', '#fbbf24', '#fcd34d', '#fde68a', '#d97706', '#b45309'],
  ['#8b5cf6', '#a78bfa', '#c4b5fd', '#ddd6fe', '#7c3aed', '#6d28d9'],
  ['#ec4899', '#f472b6', '#fbcfe8', '#fdf2f8', '#db2777', '#be185d'],
  ['#06b6d4', '#22d3ee', '#67e8f9', '#a5f3fc', '#0891b2', '#0e7490']
];

/**
 * Excel-Style Dynamic Pivot Chart Builder Studio
 * Allows executives to create unlimited custom charts by selecting:
 * - Dimensions (X-Axis: Branch, Category, Platform/Channel, Date/Month, Product)
 * - Metrics (Y-Axis: Total Revenue, Total Orders, Units Sold, Net Profit, Average Order Value)
 * - Chart Types (Bar, Line, Area, Doughnut/Pie, Pareto/Accumulated)
 * - Filtering, Sorting, Aggregation & Instant Export
 */
export default function ExcelChartStudio({
  records = [],
  theme = 'dark',
  lang = 'th'
}) {
  const isEn = lang === 'en';
  const isDark = theme === 'dark';
  const tx = (th, en) => (isEn ? en : th);

  // Initial Pre-configured Charts (Presets mimicking classic Excel reports)
  const [charts, setCharts] = useState([
    {
      id: 'chart-1',
      title: tx('ยอดขายรวมแยกตามหมวดหมู่สินค้า', 'Total Revenue by Category'),
      chartType: 'bar', // 'bar' | 'line' | 'area' | 'doughnut'
      dimension: 'category', // 'category' | 'branch' | 'platform' | 'date' | 'product'
      metric: 'revenue', // 'revenue' | 'orders' | 'units' | 'profit' | 'aov'
      sortBy: 'desc', // 'desc' | 'asc' | 'none'
      limit: 7,
      paletteIndex: 0
    },
    {
      id: 'chart-2',
      title: tx('สัดส่วนยอดขายแยกตามช่องทางจำหน่าย (Market Share)', 'Channel Contribution Share'),
      chartType: 'doughnut',
      dimension: 'platform',
      metric: 'revenue',
      sortBy: 'desc',
      limit: 6,
      paletteIndex: 2
    },
    {
      id: 'chart-3',
      title: tx('แนวโน้มจำนวนคำสั่งซื้อและการเติบโต (Trend)', 'Order Volume Growth Trend'),
      chartType: 'line',
      dimension: 'date',
      metric: 'orders',
      sortBy: 'none',
      limit: 10,
      paletteIndex: 1
    }
  ]);

  // Modal / Quick Builder State
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingChartId, setEditingChartId] = useState(null);

  // Form State for Adding / Editing Chart
  const [formTitle, setFormTitle] = useState('');
  const [formChartType, setFormChartType] = useState('bar');
  const [formDimension, setFormDimension] = useState('category');
  const [formMetric, setFormMetric] = useState('revenue');
  const [formSortBy, setFormSortBy] = useState('desc');
  const [formLimit, setFormLimit] = useState(7);
  const [formPaletteIndex, setFormPaletteIndex] = useState(0);

  // Dimensions Definition
  const DIMENSIONS = [
    { id: 'category', name: tx('หมวดหมู่สินค้า (Category)', 'Product Category'), icon: '🏷️' },
    { id: 'branch', name: tx('สาขา / หน้าร้าน (Branch)', 'Branch / Location'), icon: '🏢' },
    { id: 'platform', name: tx('ช่องทางการขาย (Channel/Platform)', 'Sales Channel'), icon: '📱' },
    { id: 'product', name: tx('รายชื่อสินค้า (Product Name)', 'Product Name'), icon: '📦' },
    { id: 'date', name: tx('วันที่ / ช่วงเวลา (Date/Timeline)', 'Date Timeline'), icon: '📅' }
  ];

  // Metrics Definition
  const METRICS = [
    { id: 'revenue', name: tx('ยอดขายรวม (Sum Revenue)', 'Total Revenue (฿)'), unit: '฿', icon: '💰' },
    { id: 'profit', name: tx('กำไรสุทธิประมาณการ (Net Profit)', 'Est. Net Profit (฿)'), unit: '฿', icon: '💎' },
    { id: 'orders', name: tx('จำนวนคำสั่งซื้อ (Order Count)', 'Total Orders'), unit: tx('รายการ', 'orders'), icon: '🧾' },
    { id: 'units', name: tx('จำนวนชิ้นที่ขาย (Units Sold)', 'Total Units'), unit: tx('ชิ้น', 'units'), icon: '📊' },
    { id: 'aov', name: tx('ยอดซื้อเฉลี่ยต่อบิล (AOV)', 'Avg Basket Size (AOV)'), unit: '฿', icon: '🛒' }
  ];

  // Clean data array
  const safeRecords = useMemo(() => {
    return Array.isArray(records) ? records.filter(Boolean) : [];
  }, [records]);

  // Dynamic Aggregation Engine (Pivot Table Calculator)
  const computeChartData = (dimensionKey, metricKey, sortOrder, topLimit, paletteIdx) => {
    if (!safeRecords || safeRecords.length === 0) {
      return {
        labels: [tx('ไม่มีข้อมูล', 'No Data')],
        datasets: [{ label: tx('ไม่มีข้อมูล', 'No Data'), data: [0], backgroundColor: ['#94a3b8'] }],
        totalValue: 0,
        count: 0
      };
    }

    const group = {};

    safeRecords.forEach(rec => {
      // 1. Resolve Dimension Value
      let dimVal = tx('ไม่ระบุ', 'Unknown');
      if (dimensionKey === 'category') {
        dimVal = rec.category || rec.categoryKey || rec.rawProduct || tx('สินค้าทั่วไป', 'General');
      } else if (dimensionKey === 'branch') {
        dimVal = rec.branch || rec.branchKey || tx('สาขาหลัก', 'Main Branch');
      } else if (dimensionKey === 'platform') {
        dimVal = rec.platform || rec.platformKey || rec.rawChannel || tx('หน้าร้าน', 'Store');
      } else if (dimensionKey === 'product') {
        dimVal = rec.rawProduct || rec.product || tx('สินค้าหลัก', 'Main Product');
      } else if (dimensionKey === 'date') {
        dimVal = rec.date || tx('วันนี้', 'Today');
      }

      if (!group[dimVal]) {
        group[dimVal] = { revenue: 0, profit: 0, orders: 0, units: 0 };
      }

      const amt = Number(rec.amount) || 0;
      const cost = Number(rec.cost) || amt * 0.6; // fallback 40% margin
      const units = Number(rec.itemsCount) || 1;

      group[dimVal].revenue += amt;
      group[dimVal].profit += Math.max(0, amt - cost);
      group[dimVal].orders += 1;
      group[dimVal].units += units;
    });

    // Transform into sortable array
    let entries = Object.keys(group).map(label => {
      const g = group[label];
      let val = 0;
      if (metricKey === 'revenue') val = g.revenue;
      else if (metricKey === 'profit') val = g.profit;
      else if (metricKey === 'orders') val = g.orders;
      else if (metricKey === 'units') val = g.units;
      else if (metricKey === 'aov') val = g.orders > 0 ? Math.round(g.revenue / g.orders) : 0;

      return { label, value: Math.round(val), rawGroup: g };
    });

    // Apply Sorting
    if (sortOrder === 'desc') {
      entries.sort((a, b) => b.value - a.value);
    } else if (sortOrder === 'asc') {
      entries.sort((a, b) => a.value - b.value);
    }

    // Apply Limit
    if (topLimit && topLimit > 0 && entries.length > topLimit) {
      const topEntries = entries.slice(0, topLimit);
      const remainingValue = entries.slice(topLimit).reduce((sum, item) => sum + item.value, 0);
      if (remainingValue > 0) {
        topEntries.push({ label: tx('อื่นๆ (Others)', 'Others'), value: remainingValue });
      }
      entries = topEntries;
    }

    const labels = entries.map(e => e.label);
    const dataValues = entries.map(e => e.value);
    const totalValue = dataValues.reduce((a, b) => a + b, 0);

    const activePalette = PALETTES[paletteIdx % PALETTES.length];
    const backgroundColors = labels.map((_, i) => activePalette[i % activePalette.length]);

    const metricInfo = METRICS.find(m => m.id === metricKey) || METRICS[0];

    return {
      labels,
      datasets: [
        {
          label: `${metricInfo.name} (${metricInfo.unit})`,
          data: dataValues,
          backgroundColor: backgroundColors,
          borderColor: backgroundColors.map(c => c),
          borderWidth: 2,
          borderRadius: 8,
          fill: true,
          tension: 0.35,
          pointRadius: 4,
          pointHoverRadius: 6
        }
      ],
      totalValue,
      count: entries.length,
      metricUnit: metricInfo.unit
    };
  };

  // Handle Add New Chart
  const handleOpenAddModal = () => {
    setEditingChartId(null);
    setFormTitle(tx(`ชาร์ตวิเคราะห์ ${charts.length + 1}`, `Analytics Chart ${charts.length + 1}`));
    setFormChartType('bar');
    setFormDimension('category');
    setFormMetric('revenue');
    setFormSortBy('desc');
    setFormLimit(7);
    setFormPaletteIndex(charts.length % PALETTES.length);
    setShowAddModal(true);
  };

  // Handle Edit Existing Chart
  const handleOpenEditModal = (chart) => {
    setEditingChartId(chart.id);
    setFormTitle(chart.title);
    setFormChartType(chart.chartType);
    setFormDimension(chart.dimension);
    setFormMetric(chart.metric);
    setFormSortBy(chart.sortBy);
    setFormLimit(chart.limit);
    setFormPaletteIndex(chart.paletteIndex);
    setShowAddModal(true);
  };

  // Save (Create or Update)
  const handleSaveChart = (e) => {
    e.preventDefault();
    if (editingChartId) {
      setCharts(prev =>
        prev.map(c =>
          c.id === editingChartId
            ? {
                ...c,
                title: formTitle || tx('ชาร์ตไม่มีชื่อ', 'Untitled Chart'),
                chartType: formChartType,
                dimension: formDimension,
                metric: formMetric,
                sortBy: formSortBy,
                limit: Number(formLimit) || 7,
                paletteIndex: Number(formPaletteIndex) || 0
              }
            : c
        )
      );
      hotToast.success(tx('อัปเดตชาร์ตสำเร็จเรียบร้อย', 'Chart updated successfully!'));
    } else {
      const newChart = {
        id: `chart-${Date.now()}`,
        title: formTitle || tx(`ชาร์ตวิเคราะห์ ${charts.length + 1}`, `Chart ${charts.length + 1}`),
        chartType: formChartType,
        dimension: formDimension,
        metric: formMetric,
        sortBy: formSortBy,
        limit: Number(formLimit) || 7,
        paletteIndex: Number(formPaletteIndex) || 0
      };
      setCharts(prev => [...prev, newChart]);
      hotToast.success(tx('เพิ่มชาร์ตใหม่เข้าสู่บอร์ดแล้ว', 'New chart added to workspace!'));
    }
    setShowAddModal(false);
  };

  // Delete Chart
  const handleDeleteChart = (id) => {
    if (charts.length <= 1) {
      hotToast.error(tx('ต้องมีชาร์ตอย่างน้อย 1 ชาร์ตในกระดาน', 'At least 1 chart must remain on board'));
      return;
    }
    setCharts(prev => prev.filter(c => c.id !== id));
    hotToast.success(tx('ลบชาร์ตออกจากกระดานแล้ว', 'Chart removed'));
  };

  // Duplicate Chart
  const handleDuplicateChart = (chart) => {
    const duplicated = {
      ...chart,
      id: `chart-${Date.now()}`,
      title: `${chart.title} (${tx('สำเนา', 'Copy')})`,
      paletteIndex: (chart.paletteIndex + 1) % PALETTES.length
    };
    setCharts(prev => [...prev, duplicated]);
    hotToast.success(tx('คัดลอกชาร์ตสำเร็จ', 'Chart duplicated'));
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* 1. STUDIO HEADER & TOOLBAR */}
      <div
        className={`p-6 rounded-3xl border transition shadow-xl backdrop-blur-xl ${
          isDark
            ? 'bg-gradient-to-r from-slate-900/95 via-sky-950/40 to-slate-900/95 border-sky-500/30'
            : 'bg-white/95 border-sky-200 shadow-sky-500/5'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br from-sky-400/20 via-blue-500/20 to-indigo-600/20 border border-sky-400/40 shadow-inner text-3xl">
              📊
            </div>
            <div>
              <div className="flex items-center gap-2.5 flex-wrap">
                <h2 className={`text-2xl font-black tracking-tight ${isDark ? 'text-white' : 'text-[#000000]'}`}>
                  {tx('Excel-Style Custom Chart Studio', 'Excel Dynamic Pivot Chart Studio')}
                </h2>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-black uppercase tracking-wider bg-sky-500/20 border border-sky-400/50 text-sky-400">
                  {tx('เลือกแกน X / Y อิสระ', 'Dynamic Dimensions & Metrics')}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-800 text-slate-300 border border-slate-700">
                  {charts.length} {tx('ชาร์ตในกระดาน', 'Active Charts')}
                </span>
              </div>
              <p className={`text-sm font-semibold mt-1 ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>
                {tx(
                  'สร้างและสลับชาร์ตได้อิสระเหมือนใน Excel: เลือกข้อมูลที่ต้องการวิเคราะห์, สลับมิติแกน X, เปลี่ยนตัวชี้วัดแกน Y และเปลี่ยนประเภทกราฟทันที',
                  'Build customized pivot charts like Excel: Select dimensions, values, chart types & arrange multiple views freely.'
                )}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleOpenAddModal}
              className="px-5 py-3 rounded-2xl font-black text-xs bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white shadow-lg shadow-sky-500/20 border border-sky-300 flex items-center gap-2 transition cursor-pointer"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
              <span>{tx('+ เพิ่มชาร์ตใหม่ (Add Chart)', '+ Add New Chart')}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. MULTI-CHART GRID WORKSPACE */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {charts.map((chart, idx) => {
          const chartData = computeChartData(
            chart.dimension,
            chart.metric,
            chart.sortBy,
            chart.limit,
            chart.paletteIndex
          );

          const dimInfo = DIMENSIONS.find(d => d.id === chart.dimension) || DIMENSIONS[0];
          const metricInfo = METRICS.find(m => m.id === chart.metric) || METRICS[0];

          // ChartJS Options
          const commonOptions = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: chart.chartType === 'doughnut',
                position: 'right',
                labels: {
                  color: isDark ? '#E2E8F0' : '#0F172A',
                  font: { weight: 'bold', size: 11 }
                }
              },
              tooltip: {
                backgroundColor: isDark ? 'rgba(15, 23, 42, 0.95)' : 'rgba(255, 255, 255, 0.95)',
                titleColor: isDark ? '#F8FAFC' : '#0F172A',
                bodyColor: isDark ? '#CBD5E1' : '#334155',
                borderColor: isDark ? 'rgba(56, 189, 248, 0.4)' : 'rgba(14, 165, 233, 0.3)',
                borderWidth: 1,
                padding: 10,
                callbacks: {
                  label: context => {
                    const val = context.raw || 0;
                    return ` ${metricInfo.name}: ${val.toLocaleString()} ${metricInfo.unit}`;
                  }
                }
              }
            },
            scales: chart.chartType === 'doughnut' ? {} : {
              x: {
                grid: { display: false },
                ticks: { color: isDark ? '#94A3B8' : '#334155', font: { weight: 'bold' } }
              },
              y: {
                grid: { color: isDark ? 'rgba(51, 65, 85, 0.3)' : 'rgba(203, 213, 225, 0.5)' },
                ticks: {
                  color: isDark ? '#94A3B8' : '#334155',
                  font: { weight: 'bold' },
                  callback: v => `${Number(v).toLocaleString()}`
                }
              }
            }
          };

          return (
            <div
              key={chart.id}
              className={`p-6 rounded-3xl border transition shadow-xl backdrop-blur-md flex flex-col justify-between ${
                isDark ? 'bg-slate-900/90 border-slate-700/60' : 'bg-white border-blue-200/80 shadow-md'
              }`}
            >
              {/* Card Header & Controls */}
              <div>
                <div className="flex items-center justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="w-8 h-8 rounded-xl bg-sky-500/10 text-sky-400 flex items-center justify-center font-bold text-sm border border-sky-500/20">
                      {idx + 1}
                    </span>
                    <h3 className={`text-base font-black ${isDark ? 'text-white' : 'text-[#000000]'}`}>
                      {chart.title}
                    </h3>
                  </div>

                  {/* Actions: Edit, Duplicate, Delete */}
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      title={tx('แก้ไขสูตรและมุมมองชาร์ตนี้', 'Edit Chart')}
                      onClick={() => handleOpenEditModal(chart)}
                      className="p-2 rounded-xl text-xs bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 transition cursor-pointer"
                    >
                      ✏️
                    </button>
                    <button
                      type="button"
                      title={tx('ทำสำเนาชาร์ต', 'Duplicate Chart')}
                      onClick={() => handleDuplicateChart(chart)}
                      className="p-2 rounded-xl text-xs bg-slate-800/80 hover:bg-slate-700 text-slate-300 border border-slate-700 transition cursor-pointer"
                    >
                      📋
                    </button>
                    <button
                      type="button"
                      title={tx('ลบชาร์ตนี้', 'Delete Chart')}
                      onClick={() => handleDeleteChart(chart.id)}
                      className="p-2 rounded-xl text-xs bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 transition cursor-pointer"
                    >
                      🗑️
                    </button>
                  </div>
                </div>

                {/* Slicer Pill Indicators */}
                <div className="flex items-center flex-wrap gap-2 mb-4">
                  <span className="px-2.5 py-1 rounded-xl text-[11px] font-bold bg-slate-800 text-sky-400 border border-slate-700 flex items-center gap-1">
                    <span>{dimInfo.icon}</span>
                    <span>{tx('แกน X:', 'X:')} {dimInfo.name.split('(')[0]}</span>
                  </span>
                  <span className="px-2.5 py-1 rounded-xl text-[11px] font-bold bg-slate-800 text-emerald-400 border border-slate-700 flex items-center gap-1">
                    <span>{metricInfo.icon}</span>
                    <span>{tx('แกน Y:', 'Y:')} {metricInfo.name.split('(')[0]}</span>
                  </span>
                  <span className="px-2.5 py-1 rounded-xl text-[11px] font-bold bg-slate-800 text-purple-400 border border-slate-700 uppercase">
                    {chart.chartType}
                  </span>
                  <span className="ml-auto text-xs font-black text-amber-400">
                    {tx('ผลรวม:', 'Total:')} {chartData.totalValue.toLocaleString()} {chartData.metricUnit}
                  </span>
                </div>
              </div>

              {/* Chart Canvas Render */}
              <div className="h-64 sm:h-72 w-full my-2 relative flex items-center justify-center">
                {chart.chartType === 'bar' && <Bar data={chartData} options={commonOptions} />}
                {chart.chartType === 'line' && <Line data={chartData} options={commonOptions} />}
                {chart.chartType === 'area' && <Line data={chartData} options={commonOptions} />}
                {chart.chartType === 'doughnut' && <Doughnut data={chartData} options={commonOptions} />}
              </div>

              {/* Quick Type Switcher Footer */}
              <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-400">
                  {chartData.count} {tx('กลุ่มข้อมูลที่แสดง', 'data points shown')}
                </span>
                <div className="flex items-center gap-1">
                  {['bar', 'line', 'doughnut'].map(t => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => {
                        setCharts(prev =>
                          prev.map(c => (c.id === chart.id ? { ...c, chartType: t } : c))
                        );
                      }}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition cursor-pointer ${
                        chart.chartType === t
                          ? 'bg-sky-500 text-slate-950 font-black'
                          : 'bg-slate-800/80 hover:bg-slate-700 text-slate-400'
                      }`}
                    >
                      {t === 'bar' ? '📊 Bar' : t === 'line' ? '📈 Line' : '🍩 Donut'}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. MODAL: ADD / EDIT CHART CONFIGURATION (Excel Pivot Dialog) */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn">
          <div
            className={`w-full max-w-xl p-6 sm:p-8 rounded-3xl border shadow-2xl transition ${
              isDark ? 'bg-slate-900 border-sky-500/40 text-white' : 'bg-white border-blue-200 text-slate-900'
            }`}
          >
            <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
              <div className="flex items-center gap-3">
                <span className="text-2xl">⚙️</span>
                <div>
                  <h3 className="text-lg font-black">
                    {editingChartId
                      ? tx('แก้ไขการตั้งค่าชาร์ต (Edit Chart)', 'Edit Chart Properties')
                      : tx('เพิ่มชาร์ตใหม่สไตล์ Excel (Add Pivot Chart)', 'Create Excel Pivot Chart')}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {tx('เลือกมิติข้อมูลและตัวชี้วัดที่ต้องการวิเคราะห์', 'Select Dimension, Metric & Visual Type')}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 flex items-center justify-center font-bold text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveChart} className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-slate-400">
                  {tx('ชื่อหัวข้อชาร์ต (Chart Title)', 'Chart Title')}
                </label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={e => setFormTitle(e.target.value)}
                  placeholder={tx('เช่น ยอดขายแยกตามช่องทาง', 'e.g. Sales by Platform')}
                  className={`w-full px-4 py-2.5 rounded-xl text-xs font-bold border transition focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                    isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                  }`}
                />
              </div>

              {/* Grid 2 Cols: Dimension & Metric */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Dimension (X-Axis) */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-sky-400">
                    {tx('แกน X: มิติข้อมูล (Categories)', 'X-Axis: Dimension')}
                  </label>
                  <select
                    value={formDimension}
                    onChange={e => setFormDimension(e.target.value)}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold border transition focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                      isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  >
                    {DIMENSIONS.map(d => (
                      <option key={d.id} value={d.id}>
                        {d.icon} {d.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Metric (Y-Axis) */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-emerald-400">
                    {tx('แกน Y: ตัวชี้วัด (Values)', 'Y-Axis: Metric')}
                  </label>
                  <select
                    value={formMetric}
                    onChange={e => setFormMetric(e.target.value)}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold border transition focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                      isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  >
                    {METRICS.map(m => (
                      <option key={m.id} value={m.id}>
                        {m.icon} {m.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Grid 2 Cols: Chart Type & Sort */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Chart Type */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-purple-400">
                    {tx('ประเภทชาร์ต (Visual Type)', 'Chart Type')}
                  </label>
                  <select
                    value={formChartType}
                    onChange={e => setFormChartType(e.target.value)}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold border transition focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                      isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  >
                    <option value="bar">📊 {tx('กราฟแท่งแนวตั้ง (Column/Bar Chart)', 'Bar / Column Chart')}</option>
                    <option value="line">📈 {tx('กราฟเส้นแนวโน้ม (Line Chart)', 'Line Chart')}</option>
                    <option value="doughnut">🍩 {tx('กราฟโดนัท / วงกลม (Donut Share)', 'Donut / Pie Chart')}</option>
                  </select>
                </div>

                {/* Sort Order */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-amber-400">
                    {tx('การเรียงลำดับ (Sort Order)', 'Sort Order')}
                  </label>
                  <select
                    value={formSortBy}
                    onChange={e => setFormSortBy(e.target.value)}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold border transition focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                      isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  >
                    <option value="desc">⬇️ {tx('จากมากไปน้อย (Highest First)', 'Descending (Highest First)')}</option>
                    <option value="asc">⬆️ {tx('จากน้อยไปมาก (Lowest First)', 'Ascending (Lowest First)')}</option>
                    <option value="none">➡️ {tx('ตามลำดับปกติ (Natural Order)', 'Natural Order')}</option>
                  </select>
                </div>
              </div>

              {/* Limit & Palette */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-slate-400">
                    {tx('จำกัดจำนวนข้อมูล (Top N)', 'Limit Top Records')}
                  </label>
                  <select
                    value={formLimit}
                    onChange={e => setFormLimit(Number(e.target.value))}
                    className={`w-full px-3.5 py-2.5 rounded-xl text-xs font-bold border transition focus:outline-none focus:ring-2 focus:ring-sky-500 ${
                      isDark ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  >
                    <option value={5}>Top 5</option>
                    <option value={7}>Top 7</option>
                    <option value={10}>Top 10</option>
                    <option value={15}>Top 15</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider mb-1 text-slate-400">
                    {tx('ชุดโทนสี (Color Palette)', 'Color Palette')}
                  </label>
                  <div className="flex items-center gap-2 mt-2">
                    {PALETTES.map((palette, pIdx) => (
                      <button
                        key={pIdx}
                        type="button"
                        onClick={() => setFormPaletteIndex(pIdx)}
                        className={`w-7 h-7 rounded-lg border-2 transition cursor-pointer flex items-center justify-center ${
                          formPaletteIndex === pIdx ? 'border-white scale-110 shadow-lg' : 'border-transparent opacity-60 hover:opacity-100'
                        }`}
                        style={{ backgroundColor: palette[0] }}
                      >
                        {formPaletteIndex === pIdx && '✓'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-800 mt-6">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2.5 rounded-xl text-xs font-bold text-slate-400 hover:text-white transition cursor-pointer"
                >
                  {tx('ยกเลิก', 'Cancel')}
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl text-xs font-black bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white shadow-lg shadow-sky-500/20 border border-sky-300 transition cursor-pointer"
                >
                  {editingChartId ? tx('บันทึกการแก้ไข', 'Save Changes') : tx('เพิ่มชาร์ต', 'Create Chart')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
