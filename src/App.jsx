import React, { useState, useEffect, useRef } from 'react';
import {
  Chart as ChartJS, CategoryScale, LinearScale, PointElement,
  LineElement, BarElement, ArcElement, RadialLinearScale,
  Title, Tooltip, Filler, Legend,
} from 'chart.js';
import { Line, Bar, Doughnut, Radar, PolarArea } from 'react-chartjs-2';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

ChartJS.register(
  CategoryScale, LinearScale, PointElement, 
  LineElement, BarElement, ArcElement, RadialLinearScale,
  Title, Tooltip, Filler, Legend
);

const LOGO_SRC = "/insight-logo.png";

function AppLogo({ className = "w-full h-full object-contain" }) {
  const [hasError, setHasError] = useState(false);
  if (hasError) {
    return (
      <div className="w-full h-full bg-gradient-to-br from-amber-400 to-amber-600 rounded-xl flex items-center justify-center font-black text-slate-950 text-xs shadow-inner">
        IF
      </div>
    );
  }
  return <img src={LOGO_SRC} alt="InsightFlow Logo" onError={() => setHasError(true)} className={className} />;
}

const translations = {
  th: {
    home: "หน้าหลัก",
    solutions: "โซลูชัน",
    whyUs: "ทำไมต้องเลือกเรา",
    useCases: "การใช้งานจริง",
    pricing: "ราคา",
    freeTrial: "เริ่มใช้งานฟรี →",
    tagline: "เปลี่ยนข้อมูลมหาศาลของคุณ\nสู่การตัดสินใจที่แม่นยำระดับผู้นำ",
    description: "InsightFlow ยกระดับสถาปัตยกรรมข้อมูลด้วยขุมพลัง AI และ Business Intelligence วิเคราะห์เชิงลึกแบบเรียลไทม์ ปลอดภัยระดับสากล เพื่อขับเคลื่อนการเติบโตของธุรกิจอย่างไร้ขีดจำกัด",
    watchDemo: "ดูตัวอย่างระบบ",
    feat1: "ประมวลผลข้อมูลเร็วขึ้น 10 เท่า\nลดเวลาทำรายงานอัตโนมัติ",
    feat2: "คาดการณ์แนวโน้มแม่นยำ\nด้วยโมเดล Machine Learning",
    feat3: "ความปลอดภัยระดับสากล ISO/IEC\nปกป้องข้อมูลองค์กร 100%",
    solutionsHeading: "— COMPREHENSIVE ENTERPRISE SOLUTIONS",
    solutionsTitle: "โซลูชันอัจฉริยะสำหรับทุกมิติธุรกิจ",
    solutionsDesc: "สถาปัตยกรรมข้อมูลที่ออกแบบมาเพื่อเชื่อมโยง วิเคราะห์ และขับเคลื่อนผลลัพธ์ที่จับต้องได้จริง",
    s1Title: "Business Intelligence & Analytics",
    s1Desc: "ระบบวิเคราะห์ข้อมูลเชิงลึกแบบเรียลไทม์ แปลงตัวเลขซับซ้อนให้เป็นแดชบอร์ดที่ทรงพลัง เข้าใจง่าย ช่วยให้ผู้บริหารตัดสินใจได้ในเสี้ยววินาที",
    s2Title: "AI Predictive Forecasting",
    s2Desc: "คาดการณ์ยอดขาย ทิศทางตลาด และพฤติกรรมลูกค้าล่วงหน้าด้วยโมเดล Machine Learning เฉพาะทาง แม่นยำ และลดความเสี่ยงทางธุรกิจ",
    s3Title: "Enterprise Data Pipeline",
    s3Desc: "เชื่อมต่อฐานข้อมูลจากทุกระบบทั่วทั้งองค์กร (SQL, Cloud Database, CRM, ERP) เข้าสู่จุดศูนย์กลางเดียวอย่างไร้รอยต่อ ปลอดภัยสูง",
    s4Title: "Zero-Trust Cloud Architecture",
    s4Desc: "โครงสร้างพื้นฐานคลาวด์มาตรฐานสูงสุด รองรับการเข้ารหัสแบบ End-to-End Encryption มั่นใจในความปลอดภัยของข้อมูลทุกขั้นตอน",
    whyUsHeading: "— WHY CHOOSE INSIGHTFLOW",
    whyUsTitle: "ทำไมองค์กรชั้นนำจึงเลือก InsightFlow",
    whyUsDesc: "เราไม่ใช่แค่โปรแกรมทำกราฟ แต่คือพาร์ทเนอร์เชิงกลยุทธ์ที่สร้างความได้เปรียบในการแข่งขันอย่างยั่งยืน",
    w1Title: "ความเร็วระดับ Ultra Low-Latency",
    w1Desc: "วิเคราะห์และค้นหาความสัมพันธ์ของข้อมูลขนาดใหญ่ (Big Data) นับล้านแถวได้ภายในไม่กี่วินาที ไม่ติดขัด",
    w2Title: "AI อัจฉริยะเฉพาะทางธุรกิจ",
    w2Desc: "โมเดล AI ที่ได้รับการฝึกฝนมาเพื่อบริบททางธุรกิจ ให้คำแนะนำและ Actionable Insights ที่นำไปปฏิบัติได้จริงทันที",
    w3Title: "ความปลอดภัยระดับทหาร (Military-grade)",
    w3Desc: "มีระบบตรวจจับภัยคุกคามแบบเรียลไทม์ ควบคุมสิทธิ์การเข้าถึงข้อมูลอย่างรัดกุม พร้อม Audit Log ครบถ้วน",
    w4Title: "ผลตอบแทนจากการลงทุนสูง (High ROI)",
    w4Desc: "ลดต้นทุนกระบวนการ Data Pipeline ลงกว่า 60% พร้อมเพิ่มอัตรากำไรและความรวดเร็วในการตัดสินใจ",
    useCasesHeading: "— REAL-WORLD APPLICATIONS",
    useCasesTitle: "ตัวอย่างการใช้งานจริงในภาคอุตสาหกรรม",
    useCasesDesc: "สัมผัสความสำเร็จขององค์กรชั้นนำที่นำ InsightFlow ไปสร้างคุณค่าและเติบโตอย่างก้าวกระโดด",
    u1Title: "ธุรกิจค้าปลีกและอีคอมเมิร์ซ (Retail)",
    u1Desc: "วิเคราะห์พฤติกรรมการซื้อรายบุคคล แนะนำโปรโมชันแบบ Real-time Personalization และจัดการสต็อกล่วงหน้าลดสินค้าค้างสต็อก",
    u2Title: "สถาบันการเงินและธนาคาร (Finance)",
    u2Desc: "ตรวจจับความผิดปกติของธุรกรรมและป้องกันการทุจริตแบบเรียลไทม์ พร้อมประเมินความเสี่ยงสินเชื่อด้วย AI อย่างโปร่งใส",
    u3Title: "โรงพยาบาลและสาธารณสุข (Healthcare)",
    u3Desc: "จัดสรรบุคลากรและทรัพยากรทางการแพทย์อย่างมีประสิทธิภาพ คาดการณ์แนวโน้มผู้ป่วยล่วงหน้าเพื่อการบริการที่ไร้รอยต่อ",
    u4Title: "อุตสาหกรรมการผลิต (Manufacturing)",
    u4Desc: "ตรวจสอบค่าพารามิเตอร์ของเครื่องจักรแบบสด คาดการณ์การซ่อมบำรุงล่วงหน้า (Predictive Maintenance) ลด Downtime ได้กว่า 40%",
    pricingHeading: "— TRANSPARENT PRICING",
    pricingTitle: "เลือกแพ็กเกจที่ลงตัวกับขนาดธุรกิจของคุณ",
    pricingDesc: "เริ่มต้นง่าย ขยายตัวได้ไม่จำกัด พร้อมฟีเจอร์พรีเมียมครบครัน",
    loginTitle: "เข้าสู่ระบบ InsightFlow",
    loginDesc: "ยินดีต้อนรับกลับสู่แพลตฟอร์มวิเคราะห์ข้อมูลอัจฉริยะ",
    testMode: "🚀 ทดลองเข้าสู่ระบบ (Test Mode)"
  },
  en: {
    home: "Home",
    solutions: "Solutions",
    whyUs: "Why Us",
    useCases: "Use Cases",
    pricing: "Pricing",
    freeTrial: "Get Started Free →",
    tagline: "Turn Massive Data Into\nHigh-Impact Executive Decisions",
    description: "InsightFlow empowers your business architecture with real-time AI and Business Intelligence. Experience global-standard security and actionable insights that drive sustainable growth.",
    watchDemo: "Watch Live Demo",
    feat1: "10x Faster Analysis\nAutomate complex reporting",
    feat2: "High-Precision Forecasting\nMachine learning powered models",
    feat3: "Global Security Standards\n100% Enterprise data privacy",
    solutionsHeading: "— COMPREHENSIVE ENTERPRISE SOLUTIONS",
    solutionsTitle: "Intelligent Solutions Across Every Business Dimension",
    solutionsDesc: "Next-generation data architecture engineered to unify, analyze, and generate measurable outcomes.",
    s1Title: "Business Intelligence & Analytics",
    s1Desc: "Real-time deep analytics transforming complex datasets into intuitive executive dashboards for split-second decisions.",
    s2Title: "AI Predictive Forecasting",
    s2Desc: "Anticipate revenue streams, market shifts, and user behavior with domain-tailored machine learning algorithms.",
    s3Title: "Enterprise Data Pipeline",
    s3Desc: "Seamlessly integrate cross-departmental silos (SQL, Cloud databases, CRM, ERP) into a secure, unified central hub.",
    s4Title: "Zero-Trust Cloud Architecture",
    s4Desc: "ISO/IEC certified infrastructure featuring end-to-end encryption to safeguard mission-critical data assets.",
    whyUsHeading: "— WHY CHOOSE INSIGHTFLOW",
    whyUsTitle: "Why Market Leaders Rely On InsightFlow",
    whyUsDesc: "More than just a dashboard—we are your strategic data partner delivering long-term competitive advantage.",
    w1Title: "Ultra Low-Latency Processing",
    w1Desc: "Query and correlate millions of rows of Big Data in fractions of a second with zero bottlenecks.",
    w2Title: "Domain-Specific Business AI",
    w2Desc: "Proprietary AI architectures fine-tuned on commercial data to yield actionable strategic playbooks.",
    w3Title: "Military-Grade Security",
    w3Desc: "Proactive real-time anomaly detection, role-based granular permissions, and comprehensive audit logs.",
    w4Title: "Proven High ROI",
    w4Desc: "Reduce pipeline operational overhead by over 60% while accelerating execution agility and profit margins.",
    useCasesHeading: "— REAL-WORLD APPLICATIONS",
    useCasesTitle: "Proven Success Across Modern Industries",
    useCasesDesc: "Discover how forward-thinking leaders leverage InsightFlow to unlock tangible value and scale exponentially.",
    u1Title: "Retail & E-Commerce",
    u1Desc: "Uncover customer basket patterns, trigger real-time personalized offers, and optimize inventory to minimize surplus.",
    u2Title: "Banking & Financial Services",
    u2Desc: "Spot transactional anomalies and fraud in real-time while evaluating credit risk accurately through explainable AI.",
    u3Title: "Healthcare & Life Sciences",
    u3Desc: "Optimize medical staffing ratios, forecast patient intake cycles, and elevate clinical service delivery.",
    u4Title: "Smart Manufacturing",
    u4Desc: "Live telemetry monitoring with predictive maintenance alerts to reduce unexpected machine downtime by over 40%.",
    pricingHeading: "— TRANSPARENT PRICING",
    pricingTitle: "Choose the Perfect Plan for Your Scale",
    pricingDesc: "Effortless onboarding, infinite scalability, and uncompromised enterprise features.",
    loginTitle: "Sign in to InsightFlow",
    loginDesc: "Welcome back to your intelligent data command center",
    testMode: "🚀 Instant Test Access"
  },
  zh: {
    home: "首页",
    solutions: "解决方案",
    whyUs: "为什么选择我们",
    useCases: "实际应用",
    pricing: "价格方案",
    freeTrial: "免费体验 →",
    tagline: "将海量数据转化为\n卓越的高层战略决策",
    description: "InsightFlow 凭借实时人工智能与商业智能技术赋能您的数据架构，以国际级安全标准与深度洞察驱动业务持续飞跃增长。",
    watchDemo: "观看系统演示",
    feat1: "数据分析速度提升10倍\n全自动报表生成",
    feat2: "高精度趋势预测\n专有机器学习模型驱动",
    feat3: "国际 ISO/IEC 安全规范\n100% 保护企业资产安全",
    solutionsHeading: "— COMPREHENSIVE ENTERPRISE SOLUTIONS",
    solutionsTitle: "赋能全业务维度的智能解决方案",
    solutionsDesc: "专为互联、分析和产出可衡量商业价值而打造的现代化数据架构。",
    s1Title: "商业智能与数据可视化 (BI)",
    s1Desc: "实时深度分析，将复杂数据转化为清晰直观的高管仪表盘，助力毫秒之间运筹帷幄。",
    s2Title: "AI 预测性战略洞察",
    s2Desc: "依托先进垂直机器学习算法，精准研判未来销售走势、市场动向与客户需求偏好。",
    s3Title: "企业级数据管道集成",
    s3Desc: "无缝打通跨部门数据孤岛（SQL, 云数据库, CRM, ERP），构筑统一安全的数据中枢。",
    s4Title: "零信任安全云架构",
    s4Desc: "符合 ISO/IEC 国际权威认证，具备端到端数据加密能力，确保核心业务数据高枕无忧。",
    whyUsHeading: "— WHY CHOOSE INSIGHTFLOW",
    whyUsTitle: "为何行业先锋信赖 InsightFlow",
    whyUsDesc: "我们不仅提供图表工具，更致力于成为提升企业长期竞争壁垒的战略伙伴。",
    w1Title: "超低延迟闪电计算",
    w1Desc: "数秒内秒级检索并关联分析数百万行海量数据，告别卡顿与繁琐等待。",
    w2Title: "商业垂直场景专属 AI",
    w2Desc: "针对商业逻辑深度训练的 AI 模型，输出直接可落地的战略行动指南。",
    w3Title: "军事级安全防御保障",
    w3Desc: "主动式实时异常检测、精细化权限矩阵与全周期可审计操作日志。",
    w4Title: "卓越的投资回报率 (ROI)",
    w4Desc: "降低数据流水线运维成本逾 60%，全面提升业务敏捷度与企业净利润率。",
    useCasesHeading: "— REAL-WORLD APPLICATIONS",
    useCasesTitle: "各行业前沿标杆的实战应用",
    useCasesDesc: "探索各行业领军企业如何运用 InsightFlow 释放数据潜能并实现几何级增长。",
    u1Title: "零售与现代电子商务",
    u1Desc: "深度刻画顾客消费图谱，实现毫秒级个性化促销触达，智能优化供应链库存周转。",
    u2Title: "金融服务与银行业",
    u2Desc: "实时监测异常交易并毫秒级阻断欺诈行为，以可解释 AI 赋能精准信贷风险评估。",
    u3Title: "医疗卫生与生命科学",
    u3Desc: "高效调配医疗人力与床位资源，前瞻预测就诊流量周期，全面升级就医服务体验。",
    u4Title: "工业互联网与智能制造",
    u4Desc: "生产线遥测数据动态监测，智能预测性维护预警，降低非计划停机时间超过 40%。",
    pricingHeading: "— TRANSPARENT PRICING",
    pricingTitle: "选择契合您业务阶段的方案",
    pricingDesc: "零门槛极速上手，按需弹性扩容，享受顶级企业级技术支持。",
    loginTitle: "登录 InsightFlow",
    loginDesc: "欢迎回到您的企业智能数据驾驶舱",
    testMode: "🚀 快速测试模式"
  }
};

function App() {
  const [user, setUser] = useState(null);
  const [lang, setLang] = useState('th');
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  const [activeTab, setActiveTab] = useState('overview');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [theme, setTheme] = useState('dark');

  // สถิติสด
  const [liveThroughput, setLiveThroughput] = useState(4820);
  const [liveLatency, setLiveLatency] = useState(24);

  // ระบบแชต AI Copilot
  const [chatInput, setChatInput] = useState('');
  const [isChatThinking, setIsChatThinking] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'ai',
      text: 'สวัสดีครับผู้บริหาร ผมคือ InsightFlow AI Copilot ยินดีให้คำปรึกษาและตอบคำถามเชิงลึกเกี่ยวกับข้อมูลธุรกิจของคุณ ลองถามอะไรผมก็ได้ เช่น "ช่องทางไหนทำกำไรได้ดีที่สุด?" หรือ "สินค้ากลุ่มไหนเสี่ยงสต็อกขาด?" ครับ',
      time: 'Just now'
    }
  ]);
  const chatBottomRef = useRef(null);

  // SQLite Database State
  const [sqlQuery, setSqlQuery] = useState('SELECT channel, COUNT(*) as users, SUM(total_revenue) as revenue\nFROM transactions\nGROUP BY channel\nORDER BY revenue DESC;');
  const [isQueryRunning, setIsQueryRunning] = useState(false);
  const [queryResult, setQueryResult] = useState(null);

  // ระบบชำระเงิน & ผูกบัตร
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState('Business_Scale');
  const [billingCycle, setBillingCycle] = useState('yearly');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [checkoutSuccessData, setCheckoutSuccessData] = useState(null);
  const [cardDetails] = useState({
    number: '4242 •••• •••• 4242',
    name: 'EXECUTIVE HOLDINGS CO.',
    expiry: '12/28',
    cvv: '•••'
  });

  const t = translations[lang];

  // ติดตามตำแหน่งการเลื่อนจอ เพื่อไฮไลต์ Navbar เมนูปัจจุบัน
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 160;
      const sections = ['pricing', 'use-cases', 'why-us', 'solutions', 'home'];
      for (const sec of sections) {
        const el = document.getElementById(sec);
        if (el && scrollPos >= el.offsetTop) {
          setActiveSection(sec);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // ฟังก์ชันเลื่อนหน้าจอไปยัง Section ที่ต้องการอย่างนุ่มนวล
  const scrollToSection = (id) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80; // เผื่อความสูงของ Sticky Navbar ด้านบน
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (activeTab === 'live') {
      const interval = setInterval(() => {
        setLiveThroughput(prev => Math.floor(prev + (Math.random() * 180 - 90)));
        setLiveLatency(prev => Math.floor(22 + Math.random() * 6));
      }, 2500);
      return () => clearInterval(interval);
    }
  }, [activeTab]);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isChatThinking]);

  const handleLoginSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    setUser(decoded);
    setIsLoginOpen(false);
  };

  const handleLogout = () => {
    googleLogout();
    setUser(null);
  };

  // จัดการอัปโหลดไฟล์พร้อมตรวจจับเงื่อนไข Paywall & Quota
  const handleAnalyze = async () => {
    if (!selectedFile) return;
    setIsUploading(true);

    const formData = new FormData();
    formData.append("file", selectedFile);
    formData.append("user_id", user ? user.sub || user.name : "GUEST-EXEC-001");

    try {
      const response = await fetch("http://127.0.0.1:8000/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        alert(`✅ ประมวลผลสำเร็จ!\n\nไฟล์: ${result.filename}\nจำนวนแถว: ${result.total_rows} แถว\nผลการวิเคราะห์: ${result.insights}`);
        setIsUploadOpen(false);
        setSelectedFile(null);
      } else {
        if (response.status === 403) {
          alert(`🔒 [สิทธิ์ทดลองใช้สิ้นสุด]\n\n${result.detail}\n\nระบบจะเปิดหน้าต่างผูกบัตรและชำระเงินเพื่อปลดล็อกการใช้งานต่อทันทีครับ`);
          setIsUploadOpen(false);
          setSelectedFile(null);
          setIsCheckoutOpen(true);
        } else {
          alert(`⚠️ ไม่สามารถประมวลผลได้: ${result.detail || result.error}`);
        }
      }
    } catch (error) {
      alert("❌ ไม่สามารถเชื่อมต่อกับ AI Backend ได้ (กรุณาตรวจเช็คว่ารัน uvicorn พอร์ต 8000 อยู่)");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSendChat = async (presetText) => {
    const query = presetText || chatInput;
    if (!query.trim() || isChatThinking) return;

    const userMsg = {
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages(prev => [...prev, userMsg]);
    setChatInput('');
    setIsChatThinking(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: query })
      });

      const data = await res.json();
      if (data.status === "success") {
        setChatMessages(prev => [
          ...prev,
          {
            sender: 'ai',
            text: data.answer,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      } else {
        setChatMessages(prev => [
          ...prev,
          {
            sender: 'ai',
            text: `ขออภัยครับ เกิดข้อผิดพลาดในการประมวลผล: ${data.error}`,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }
    } catch (error) {
      setTimeout(() => {
        setChatMessages(prev => [
          ...prev,
          {
            sender: 'ai',
            text: `(ตอบกลับจาก Local Engine): จากการตรวจสอบข้อมูลชุดล่าสุดสำหรับคำถาม "${query}" แนะนำให้เน้นการผลักดันช่องทาง Affiliate และ Direct Access เพราะมีอัตรากำไรต่อคำสั่งซื้อสูงสุดครับ`,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }, 700);
    } finally {
      setIsChatThinking(false);
    }
  };

  const handleProcessPayment = async () => {
    setIsProcessingPayment(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: user ? user.sub || user.name : "GUEST-EXEC-001",
          user_email: user ? user.email || "executive@insightflow.app" : "executive@insightflow.app",
          plan: selectedPlan,
          billing_cycle: billingCycle,
          payment_method: paymentMethod,
          card_number: cardDetails.number,
          card_holder: cardDetails.name
        })
      });

      const data = await response.json();
      if (response.ok && data.status === "success") {
        setCheckoutSuccessData(data);
      } else {
        setCheckoutSuccessData({
          transaction_id: "TXN-DEMO-" + Math.floor(100000 + Math.random() * 900000),
          amount: selectedPlan === 'Starter' ? 9900 : selectedPlan === 'Business_Scale' ? (billingCycle === 'yearly' ? 29900 * 12 * 0.85 : 29900) : 99000,
          currency: "THB",
          qr_promptpay_url: `https://promptpay.io/0812345678/${selectedPlan === 'Starter' ? 9900 : 29900}.png`,
          message: "ชำระเงินและผูกบัตรสำเร็จเรียบร้อย (Verified)"
        });
      }
    } catch (err) {
      setCheckoutSuccessData({
        transaction_id: "TXN-OFFLINE-" + Math.floor(100000 + Math.random() * 900000),
        amount: selectedPlan === 'Starter' ? 9900 : 29900,
        currency: "THB",
        qr_promptpay_url: `https://promptpay.io/0812345678/29900.png`,
        message: "บันทึกข้อมูลการชำระเงินในโหมด Local จำลองสำเร็จ"
      });
    } finally {
      setIsProcessingPayment(false);
    }
  };

  const exportPresentationDataset = () => {
    const headers = "Customer_ID,Channel,Device,Session_Duration,Orders,Total_Revenue,Conversion\n";
    const sampleRows = [
      "CUST-0001,Affiliate,Desktop,340,2,3800.00,Yes",
      "CUST-0002,Google Search,Mobile Web,180,1,1450.00,Yes",
      "CUST-0003,Social Ads,iOS App,95,0,0.00,No",
      "CUST-0004,Direct,Desktop,420,3,4890.00,Yes",
      "CUST-0005,Email Mkt,Android App,110,0,0.00,No"
    ].join("\n");
    
    const blob = new Blob(["\uFEFF" + headers + sampleRows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "InsightFlow_Presentation_Dataset.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportExecutiveBrief = () => {
    const briefContent = `INSIGHTFLOW EXECUTIVE ANALYTICS BRIEF
======================================
Generated Date: ${new Date().toLocaleDateString('th-TH')}
Status: Production Confirmed

1. EXECUTIVE SUMMARY
- Total Revenue: ฿ 4,829,000 (+16.8% MoM)
- Active Concurrent Users: 3,842 Users
- Average Conversion Rate: 6.84%
- Database Engine: SQLite High-Speed Embedded (Local/Serverless)

2. CHANNEL PERFORMANCE RANKING
- #1 Affiliate Marketing: 9.1% Conversion (High ROI)
- #2 Google Search Ads: 7.2% Conversion
- #3 Direct Traffic: 5.6% Conversion
- #4 Social Ads: 4.5% Conversion
- #5 Email Marketing: 3.8% Conversion

3. AI STRATEGIC PLAYBOOK RECOMMENDATIONS
- Reallocate 30% of marketing budget from Social Ads to Affiliate partners.
- Implement automated cross-selling on Desktop users viewing >6 pages.
- Proactively restock top SKUs 5 days in advance to avoid stockout.
======================================`;

    const blob = new Blob(["\uFEFF" + briefContent], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "InsightFlow_Executive_Slide_Brief.txt");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleRunSQL = () => {
    setIsQueryRunning(true);
    setTimeout(() => {
      setQueryResult([
        { channel: 'Affiliate Marketing', users: 120, revenue: '฿ 1,420,500' },
        { channel: 'Google Search Ads', users: 350, revenue: '฿ 1,380,200' },
        { channel: 'Social Media Ads', users: 300, revenue: '฿ 1,120,000' },
        { channel: 'Direct Traffic', users: 80, revenue: '฿ 540,800' },
        { channel: 'Email Marketing', users: 150, revenue: '฿ 367,500' },
      ]);
      setIsQueryRunning(false);
    }, 600);
  };

  const lineChartData = {
    labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '23:59'],
    datasets: [
      {
        label: 'ทราฟฟิกปัจจุบัน (Live Traffic)',
        data: [1420, 980, 2600, 4850, 5200, 6100, 5780],
        borderColor: '#38bdf8',
        backgroundColor: theme === 'dark' ? 'rgba(56, 189, 248, 0.12)' : 'rgba(56, 189, 248, 0.2)',
        borderWidth: 2.5,
        pointBackgroundColor: theme === 'dark' ? '#070c1a' : '#ffffff',
        pointBorderColor: '#38bdf8',
        pointBorderWidth: 2,
        pointHoverRadius: 6,
        fill: true,
        tension: 0.38
      },
      {
        label: 'เป้าหมาย AI (AI Target)',
        data: [1300, 1100, 2400, 4300, 4900, 5600, 5400],
        borderColor: '#fbbf24',
        borderDash: [6, 6],
        borderWidth: 2,
        pointRadius: 0,
        fill: false,
        tension: 0.38
      }
    ]
  };

  const lineChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { 
      legend: { 
        display: true, 
        position: 'top', 
        align: 'end',
        labels: { color: theme === 'dark' ? '#94a3b8' : '#475569', boxWidth: 12, usePointStyle: true, font: { family: "'Prompt', sans-serif", size: 11 } } 
      } 
    },
    scales: {
      y: { grid: { color: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.06)' }, ticks: { color: '#64748b', font: { family: "'Prompt', sans-serif", size: 10 } } },
      x: { grid: { color: theme === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.04)', drawBorder: false }, ticks: { color: '#64748b', font: { family: "'Prompt', sans-serif", size: 10 } } }
    }
  };

  const barChartData = {
    labels: ['Social Ads', 'Google Search', 'Email Mkt', 'Affiliate', 'Direct'],
    datasets: [{
      label: 'Conversion Rate (%)',
      data: [4.5, 7.2, 3.8, 9.1, 5.6],
      backgroundColor: 'rgba(251, 191, 36, 0.85)',
      hoverBackgroundColor: '#f59e0b',
      borderRadius: 6,
    }]
  };

  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: { grid: { color: theme === 'dark' ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.06)' }, ticks: { color: '#64748b', font: { family: "'Prompt', sans-serif", size: 10 } } },
      x: { grid: { display: false }, ticks: { color: theme === 'dark' ? '#94a3b8' : '#334155', font: { family: "'Prompt', sans-serif", size: 10 } } }
    }
  };

  const doughnutData = {
    labels: ['Desktop', 'Mobile Web', 'iOS App', 'Android App'],
    datasets: [{
      data: [48, 28, 14, 10],
      backgroundColor: ['#38bdf8', '#fbbf24', '#34d399', '#a78bfa'],
      borderColor: theme === 'dark' ? '#0b1120' : '#ffffff',
      borderWidth: 3
    }]
  };

  const radarData = {
    labels: ['Conversion Rate', 'Avg Order Value', 'Customer Retention', 'Pipeline Velocity', 'Security Index'],
    datasets: [
      {
        label: 'สถานะปัจจุบัน',
        data: [88, 92, 79, 85, 96],
        backgroundColor: 'rgba(56, 189, 248, 0.25)',
        borderColor: '#38bdf8',
        borderWidth: 2,
        pointBackgroundColor: '#38bdf8'
      },
      {
        label: 'เป้าหมายมาตรฐานองค์กร',
        data: [75, 80, 70, 75, 90],
        backgroundColor: 'rgba(251, 191, 36, 0.2)',
        borderColor: '#fbbf24',
        borderWidth: 2,
        pointBackgroundColor: '#fbbf24'
      }
    ]
  };

  const polarData = {
    labels: ['Desktop High-LTV', 'Mobile E-Com', 'iOS In-App', 'Android Store'],
    datasets: [{
      data: [42, 28, 18, 12],
      backgroundColor: [
        'rgba(56, 189, 248, 0.75)',
        'rgba(251, 191, 36, 0.75)',
        'rgba(52, 211, 153, 0.75)',
        'rgba(167, 139, 250, 0.75)'
      ],
      borderWidth: 1
    }]
  };

  const livePulseChartData = {
    labels: ['60s ก่อน', '50s', '40s', '30s', '20s', '10s', 'Realtime Now'],
    datasets: [{
      label: 'Request Throughput / sec',
      data: [4420, 4580, 4390, 4810, 4750, 4920, liveThroughput],
      borderColor: '#34d399',
      backgroundColor: 'rgba(52, 211, 153, 0.15)',
      borderWidth: 3,
      pointBackgroundColor: theme === 'dark' ? '#030712' : '#ffffff',
      pointBorderColor: '#34d399',
      pointBorderWidth: 2,
      fill: true,
      tension: 0.4
    }]
  };

  // =========================================================================
  // 1. หน้า LANDING PAGE (พร้อม Smooth Scrolling ทุก Section)
  // =========================================================================
  if (!user) {
    return (
      <div className="min-h-screen bg-[#050814] text-slate-100 flex flex-col font-sans select-none relative">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none"></div>
        <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[140px] pointer-events-none"></div>

        {/* Modal เข้าสู่ระบบ */}
        {isLoginOpen && (
          <div className="fixed inset-0 bg-black/75 backdrop-blur-md flex items-center justify-center z-50 p-4">
            <div className="bg-[#0c1222] border border-white/10 rounded-3xl w-full max-w-md p-8 shadow-2xl relative">
              <button onClick={() => setIsLoginOpen(false)} className="absolute top-5 right-5 text-slate-400 hover:text-white transition text-lg">✕</button>
              <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-5 p-2 border border-white/10 shadow-inner">
                <AppLogo />
              </div>
              <h2 className="text-2xl font-black text-center mb-2 text-white">{t.loginTitle}</h2>
              <p className="text-slate-400 text-center text-sm mb-7 leading-relaxed">{t.loginDesc}</p>
              
              <div className="flex justify-center mb-5">
                <GoogleLogin onSuccess={handleLoginSuccess} onError={() => console.log('Login Failed')} useOneTap />
              </div>

              <button 
                onClick={() => setUser({ name: 'BBOSS Analytics Lead', picture: 'https://api.dicebear.com/7.x/avataaars/svg?seed=BBOSS' })}
                className="w-full py-3 bg-gradient-to-r from-amber-500/20 to-amber-400/10 hover:from-amber-500/30 hover:to-amber-400/20 rounded-xl text-sm font-bold text-amber-300 transition border border-amber-400/30 shadow-lg shadow-amber-400/10"
              >
                {t.testMode}
              </button>
            </div>
          </div>
        )}

        {/* Header Navbar (คลิกแล้วเลื่อนนุ่มนวล) */}
        <header className="border-b border-white/5 bg-[#050814]/85 backdrop-blur-xl sticky top-0 z-40 px-8 lg:px-16 py-4 flex justify-between items-center transition">
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection('home')}>
            <div className="w-11 h-11 rounded-2xl bg-white/5 p-1 border border-white/10 shadow-md flex items-center justify-center">
              <AppLogo />
            </div>
            <div>
              <span className="text-2xl font-black tracking-tight text-white flex items-center gap-0.5">
                Insight<span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-amber-200">Flow</span>
              </span>
              <p className="text-[10px] text-slate-400 tracking-widest font-semibold uppercase">Intelligence • Analytics</p>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-semibold">
            {[
              { id: 'home', label: t.home },
              { id: 'solutions', label: t.solutions },
              { id: 'why-us', label: t.whyUs },
              { id: 'use-cases', label: t.useCases },
              { id: 'pricing', label: t.pricing },
            ].map((item) => (
              <button 
                key={item.id} 
                onClick={() => scrollToSection(item.id)} 
                className={`transition pb-1 border-b-2 text-sm font-bold ${
                  activeSection === item.id 
                    ? 'text-amber-400 border-amber-400 shadow-[0_2px_10px_rgba(251,191,36,0.3)]' 
                    : 'text-slate-300 border-transparent hover:text-white'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4 text-sm">
            <div className="bg-[#0b1120] border border-white/10 rounded-xl p-1 flex gap-1 text-xs font-bold shadow-inner">
              <button onClick={() => setLang('th')} className={`px-2.5 py-1 rounded-lg transition ${lang === 'th' ? 'bg-amber-400 text-slate-950 shadow' : 'text-slate-400 hover:text-white'}`}>TH</button>
              <button onClick={() => setLang('en')} className={`px-2.5 py-1 rounded-lg transition ${lang === 'en' ? 'bg-amber-400 text-slate-950 shadow' : 'text-slate-400 hover:text-white'}`}>EN</button>
              <button onClick={() => setLang('zh')} className={`px-2.5 py-1 rounded-lg transition ${lang === 'zh' ? 'bg-amber-400 text-slate-950 shadow' : 'text-slate-400 hover:text-white'}`}>中文</button>
            </div>

            <button 
              onClick={() => setIsLoginOpen(true)} 
              className="bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 text-slate-950 font-black px-6 py-2.5 rounded-xl transition shadow-lg shadow-amber-400/25 hover:scale-[1.02] active:scale-95"
            >
              {t.freeTrial}
            </button>
          </div>
        </header>

        {/* Hero Section */}
        <main className="flex-1 px-8 lg:px-16 py-16 max-w-[1600px] mx-auto w-full">
          <div id="home" className="grid grid-cols-1 lg:grid-cols-12 gap-14 items-center mb-28 pt-4">
            <div className="lg:col-span-6">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-400/10 to-transparent text-amber-400 text-xs font-black px-4 py-2 rounded-full mb-8 border border-amber-400/20 tracking-wider shadow-sm">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
                <span>DATA INTELLIGENCE PLATFORM</span>
              </div>
              
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black leading-[1.55] mb-8 tracking-normal text-white whitespace-pre-line drop-shadow-md">
                {t.tagline}
              </h1>
              
              <p className="text-slate-300 text-base lg:text-lg mb-10 leading-[1.8] max-w-2xl font-normal opacity-90">
                {t.description}
              </p>
              
              <div className="flex flex-wrap gap-5 items-center mb-14">
                <button 
                  onClick={() => setIsLoginOpen(true)} 
                  className="bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 text-slate-950 font-black px-9 py-4 rounded-2xl transition flex items-center gap-2 shadow-xl shadow-amber-400/25 text-lg hover:scale-[1.02] active:scale-95"
                >
                  {t.freeTrial}
                </button>
                <button 
                  onClick={() => scrollToSection('solutions')} 
                  className="bg-[#0b1120] hover:bg-slate-800 text-white font-bold px-8 py-4 rounded-2xl transition border border-white/10 flex items-center gap-2 text-lg shadow-md hover:border-white/20"
                >
                  <span>▶</span> {t.watchDemo}
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 pt-10 border-t border-white/10 gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 flex-shrink-0 shadow-inner">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  </div>
                  <span className="text-xs lg:text-sm font-semibold text-slate-300 leading-snug whitespace-pre-line">{t.feat1}</span>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 flex-shrink-0 shadow-inner">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <span className="text-xs lg:text-sm font-semibold text-slate-300 leading-snug whitespace-pre-line">{t.feat2}</span>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 flex-shrink-0 shadow-inner">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                  </div>
                  <span className="text-xs lg:text-sm font-semibold text-slate-300 leading-snug whitespace-pre-line">{t.feat3}</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 relative">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-amber-500/20 via-sky-500/20 to-emerald-500/20 rounded-3xl blur-2xl opacity-50"></div>
              <div className="bg-[#0b1120]/90 border border-white/10 rounded-3xl p-7 shadow-2xl relative backdrop-blur-2xl">
                <div className="flex items-center justify-between mb-5 pb-4 border-b border-white/5 text-xs text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block shadow-sm"></span>
                    <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block shadow-sm"></span>
                    <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block shadow-sm"></span>
                  </div>
                  <div className="flex items-center gap-2 font-bold text-sky-400">
                    <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping"></span>
                    Live Analytics Cluster
                  </div>
                </div>

                <div className="relative rounded-2xl overflow-hidden border border-white/5 bg-[#070b16] p-7">
                  <div className="flex justify-between items-center mb-6">
                    <div>
                      <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold">Total Revenue Stream</p>
                      <h4 className="text-2xl font-black text-white mt-0.5">฿ 3,842,500 <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md">+14.6%</span></h4>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-400 uppercase tracking-widest font-semibold">Conversion Rate</p>
                      <h4 className="text-2xl font-black text-amber-400 mt-0.5">6.82%</h4>
                    </div>
                  </div>
                  <div className="h-44 w-full relative">
                    <Line data={lineChartData} options={lineChartOptions} />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ==================== 1. SOLUTIONS SECTION ==================== */}
          <div id="solutions" className="py-24 border-t border-white/5">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <div className="text-amber-400 text-xs font-black tracking-widest uppercase mb-3">{t.solutionsHeading}</div>
              <h2 className="text-3xl lg:text-5xl font-black text-white mb-4 tracking-tight">{t.solutionsTitle}</h2>
              <p className="text-slate-400 text-base leading-relaxed">{t.solutionsDesc}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
              {[
                { title: t.s1Title, desc: t.s1Desc, icon: <svg className="w-7 h-7 text-amber-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" /><path strokeLinecap="round" strokeLinejoin="round" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" /></svg> },
                { title: t.s2Title, desc: t.s2Desc, icon: <svg className="w-7 h-7 text-amber-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg> },
                { title: t.s3Title, desc: t.s3Desc, icon: <svg className="w-7 h-7 text-amber-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> },
                { title: t.s4Title, desc: t.s4Desc, icon: <svg className="w-7 h-7 text-amber-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 100-6 3 3 0 000 6z" /></svg> }
              ].map((sol, idx) => (
                <div key={idx} className="bg-[#0b1120]/80 border border-white/10 p-8 rounded-3xl relative overflow-hidden group hover:border-amber-400/40 hover:-translate-y-1.5 transition duration-300 flex flex-col justify-between shadow-xl backdrop-blur-xl">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-amber-400/10 border border-amber-400/25 flex items-center justify-center mb-6 group-hover:scale-110 transition duration-300 shadow-inner">
                      {sol.icon}
                    </div>
                    <h3 className="text-xl font-black text-white mb-3 tracking-tight">{sol.title}</h3>
                    <p className="text-sm text-slate-300 opacity-90 leading-relaxed">{sol.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ==================== 2. WHY US SECTION ==================== */}
          <div id="why-us" className="py-24 border-t border-white/5">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <div className="text-amber-400 text-xs font-black tracking-widest uppercase mb-3">{t.whyUsHeading}</div>
              <h2 className="text-3xl lg:text-5xl font-black text-white mb-4 tracking-tight">{t.whyUsTitle}</h2>
              <p className="text-slate-400 text-base leading-relaxed">{t.whyUsDesc}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
              {[
                { title: t.w1Title, desc: t.w1Desc, icon: <svg className="w-7 h-7 text-amber-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg> },
                { title: t.w2Title, desc: t.w2Desc, icon: <svg className="w-7 h-7 text-amber-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg> },
                { title: t.w3Title, desc: t.w3Desc, icon: <svg className="w-7 h-7 text-amber-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg> },
                { title: t.w4Title, desc: t.w4Desc, icon: <svg className="w-7 h-7 text-amber-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> }
              ].map((item, idx) => (
                <div key={idx} className="bg-[#0b1120]/80 border border-white/10 p-8 rounded-3xl relative overflow-hidden group hover:border-amber-400/40 hover:-translate-y-1.5 transition duration-300 flex flex-col justify-between shadow-xl backdrop-blur-xl">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-amber-400/10 border border-amber-400/25 flex items-center justify-center mb-6 group-hover:scale-110 transition duration-300 shadow-inner">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-black text-white mb-3 tracking-tight">{item.title}</h3>
                    <p className="text-sm text-slate-300 opacity-90 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ==================== 3. USE CASES SECTION ==================== */}
          <div id="use-cases" className="py-24 border-t border-white/5">
            <div className="text-center max-w-3xl mx-auto mb-20">
              <div className="text-amber-400 text-xs font-black tracking-widest uppercase mb-3">{t.useCasesHeading}</div>
              <h2 className="text-3xl lg:text-5xl font-black text-white mb-4 tracking-tight">{t.useCasesTitle}</h2>
              <p className="text-slate-400 text-base leading-relaxed">{t.useCasesDesc}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-7">
              {[
                { title: t.u1Title, desc: t.u1Desc, image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=600&q=80' },
                { title: t.u2Title, desc: t.u2Desc, image: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=600&q=80' },
                { title: t.u3Title, desc: t.u3Desc, image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=600&q=80' },
                { title: t.u4Title, desc: t.u4Desc, image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=600&q=80' }
              ].map((useCase, idx) => (
                <div key={idx} className="bg-[#0b1120]/80 border border-white/10 p-6 rounded-3xl relative overflow-hidden group hover:border-amber-400/40 hover:-translate-y-1.5 transition duration-300 flex flex-col justify-between shadow-xl backdrop-blur-xl">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                  <div>
                    <div className="h-44 bg-slate-950 rounded-2xl mb-6 overflow-hidden border border-white/5 relative shadow-inner">
                      <img src={useCase.image} alt={useCase.title} className="w-full h-full object-cover group-hover:scale-110 transition duration-700 opacity-80 group-hover:opacity-95" />
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0b1120] via-transparent to-transparent"></div>
                    </div>
                    <h3 className="text-xl font-black text-white mb-3 tracking-tight">{useCase.title}</h3>
                    <p className="text-sm text-slate-300 opacity-90 leading-relaxed">{useCase.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ==================== 4. PRICING SECTION ==================== */}
          <div id="pricing" className="py-24 border-t border-white/5">
            <div className="text-center max-w-2xl mx-auto mb-20">
              <div className="text-amber-400 text-xs font-black tracking-widest uppercase mb-3">{t.pricingHeading}</div>
              <h2 className="text-3xl lg:text-5xl font-black text-white mb-4 tracking-tight">{t.pricingTitle}</h2>
              <p className="text-slate-400 text-base">{t.pricingDesc}</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="bg-[#0b1120]/60 border border-white/10 p-9 rounded-3xl flex flex-col justify-between shadow-xl backdrop-blur-xl">
                <div>
                  <h3 className="text-2xl font-black text-white mb-2">Starter</h3>
                  <p className="text-xs text-slate-400 mb-6">สำหรับธุรกิจขนาดเริ่มต้นที่ต้องการความคล่องตัว</p>
                  <p className="text-4xl font-black text-white mb-8">฿ 9,900 <span className="text-xs text-slate-400 font-normal">/เดือน</span></p>
                  <ul className="space-y-3.5 text-sm text-slate-300 mb-8">
                    <li className="flex items-center gap-2"><span className="text-amber-400 font-bold">✓</span> แดชบอร์ดสรุปผลภาพรวม</li>
                    <li className="flex items-center gap-2"><span className="text-amber-400 font-bold">✓</span> เชื่อมต่อฐานข้อมูล SQLite / CSV</li>
                  </ul>
                </div>
                <button 
                  onClick={() => { setSelectedPlan('Starter'); setIsCheckoutOpen(true); }} 
                  className="w-full bg-white/10 hover:bg-white/15 text-white font-bold py-3.5 rounded-xl transition border border-white/10"
                >
                  เลือกแพ็กเกจ Starter 💳
                </button>
              </div>

              <div className="bg-gradient-to-b from-[#0f172a] to-[#0b1120] border-2 border-amber-400/60 p-9 rounded-3xl flex flex-col justify-between relative shadow-2xl shadow-amber-400/10 scale-105">
                <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-amber-400 to-amber-300 text-slate-950 text-[11px] font-black px-4 py-1 rounded-full uppercase tracking-wider shadow-md">Most Popular</div>
                <div>
                  <h3 className="text-2xl font-black text-white mb-2">Business Scale</h3>
                  <p className="text-xs text-slate-400 mb-6">สำหรับธุรกิจที่กำลังขยายตัวและต้องการ AI เต็มรูปแบบ</p>
                  <p className="text-4xl font-black text-amber-400 mb-8">฿ 29,900 <span className="text-xs text-slate-400 font-normal">/เดือน</span></p>
                  <ul className="space-y-3.5 text-sm text-slate-200 mb-8">
                    <li className="flex items-center gap-2"><span className="text-amber-400 font-bold">✓</span> ฐานข้อมูล SQL ไม่จำกัดการซิงค์</li>
                    <li className="flex items-center gap-2"><span className="text-amber-400 font-bold">✓</span> AI Forecasting & Strategic Playbooks</li>
                  </ul>
                </div>
                <button 
                  onClick={() => { setSelectedPlan('Business_Scale'); setIsCheckoutOpen(true); }} 
                  className="w-full bg-gradient-to-r from-amber-400 to-amber-300 text-slate-950 font-black py-4 rounded-xl transition shadow-lg shadow-amber-400/25"
                >
                  เลือกแพ็กเกจ Business Scale 🚀
                </button>
              </div>

              <div className="bg-[#0b1120]/60 border border-white/10 p-9 rounded-3xl flex flex-col justify-between shadow-xl backdrop-blur-xl">
                <div>
                  <h3 className="text-2xl font-black text-white mb-2">Enterprise</h3>
                  <p className="text-xs text-slate-400 mb-6">สำหรับองค์กรขนาดใหญ่ที่ต้องการ Custom เฉพาะทาง</p>
                  <p className="text-4xl font-black text-white mb-8">฿ 99,000 <span className="text-xs text-slate-400 font-normal">/เดือน</span></p>
                  <ul className="space-y-3.5 text-sm text-slate-300 mb-8">
                    <li className="flex items-center gap-2"><span className="text-amber-400 font-bold">✓</span> SLA รับรองความเสถียร 99.99%</li>
                  </ul>
                </div>
                <button 
                  onClick={() => { setSelectedPlan('Enterprise'); setIsCheckoutOpen(true); }} 
                  className="w-full bg-white/10 hover:bg-white/15 text-white font-bold py-3.5 rounded-xl transition border border-white/10"
                >
                  เลือกแพ็กเกจ Enterprise 💼
                </button>
              </div>
            </div>
          </div>
        </main>

        <footer className="border-t border-white/5 bg-[#03050c] py-14 px-8 text-center text-slate-500 text-xs">
          <p className="text-base font-black text-white mb-2">"ให้ข้อมูลมหาศาล เป็นพลังขับเคลื่อนความสำเร็จของธุรกิจคุณ"</p>
          <p className="text-xs text-slate-400 mb-8">เริ่มต้นการตัดสินใจที่ดีกว่ากับ InsightFlow วันนี้</p>
          <p className="text-[11px] text-slate-600">© InsightFlow. All rights reserved. Enterprise Grade Data Intelligence.</p>
        </footer>
      </div>
    );
  }

  // =========================================================================
  // 2. DASHBOARD VIEWPORT
  // =========================================================================
  return (
    <div className={`min-h-screen flex font-sans select-none transition-colors duration-300 ${
      theme === 'dark' ? 'bg-[#030712] text-slate-100' : 'bg-[#f8fafc] text-slate-900'
    }`}>
      
      {/* MODAL: ผูกบัตร & ชำระเงิน */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className={`${theme === 'dark' ? 'bg-[#080d1e] border-white/15 text-white' : 'bg-white border-slate-200 text-slate-900'} border rounded-3xl w-full max-w-2xl p-7 lg:p-8 shadow-2xl relative overflow-hidden`}>
            
            <button 
              onClick={() => { setIsCheckoutOpen(false); setCheckoutSuccessData(null); }} 
              className="absolute top-5 right-5 text-slate-400 hover:text-white transition text-xl"
            >
              ✕
            </button>

            {checkoutSuccessData ? (
              <div className="text-center py-8 space-y-5 animate-in zoom-in-95">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mx-auto text-emerald-400 text-2xl shadow-lg shadow-emerald-500/20">
                  ✓
                </div>
                <h3 className="text-2xl font-black tracking-tight text-white">การผูกบัตรและชำระเงินสำเร็จ!</h3>
                <p className="text-xs text-slate-400 max-w-md mx-auto">
                  ระบบได้บันทึกการสมัครสมาชิกแพ็กเกจ <strong className="text-amber-400">{selectedPlan}</strong> เรียบร้อยแล้ว สิทธิ์การใช้งาน AI และ Data Pipeline ถูกเปิดใช้งานทันที
                </p>

                <div className={`p-4 rounded-2xl border text-xs text-left max-w-md mx-auto space-y-2 ${theme === 'dark' ? 'bg-white/5 border-white/10 text-slate-300' : 'bg-slate-50 border-slate-200'}`}>
                  <div className="flex justify-between"><span>Transaction ID:</span><span className="font-mono text-amber-400">{checkoutSuccessData.transaction_id}</span></div>
                  <div className="flex justify-between"><span>ยอดที่ชำระ:</span><span className="font-black text-white">฿ {checkoutSuccessData.amount.toLocaleString()} THB</span></div>
                  <div className="flex justify-between"><span>สถานะบัญชี:</span><span className="text-emerald-400 font-bold">● Active (Auto-renewed)</span></div>
                </div>

                <button 
                  onClick={() => { setIsCheckoutOpen(false); setCheckoutSuccessData(null); }}
                  className="bg-gradient-to-r from-amber-400 to-amber-300 text-slate-950 font-black px-8 py-3 rounded-xl text-xs shadow-lg shadow-amber-400/20 transition hover:scale-[1.02]"
                >
                  เข้าสู่แดชบอร์ดพรีเมียม →
                </button>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-3.5 mb-6">
                  <div className="w-11 h-11 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 shadow-inner">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>
                  </div>
                  <div>
                    <h2 className="text-lg font-black tracking-tight">InsightFlow Billing & Payment Hub</h2>
                    <p className="text-xs text-slate-400">ระบบผูกบัตรเครดิตและชำระเงินมาตรฐาน PCI-DSS ปลอดภัย 100%</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div className="space-y-4">
                    <div>
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">เลือกแพ็กเกจการใช้งาน</label>
                      <div className="space-y-2 text-xs">
                        {[
                          { id: 'Starter', name: 'Starter Plan', price: '฿ 9,900/ด.' },
                          { id: 'Business_Scale', name: 'Business Scale (แนะนำ)', price: '฿ 29,900/ด.' },
                          { id: 'Enterprise', name: 'Enterprise Pro', price: '฿ 99,000/ด.' },
                        ].map((pkg) => (
                          <div 
                            key={pkg.id} 
                            onClick={() => setSelectedPlan(pkg.id)}
                            className={`p-3 rounded-2xl border cursor-pointer flex justify-between items-center transition ${
                              selectedPlan === pkg.id 
                                ? 'border-amber-400 bg-amber-400/10 text-white font-bold shadow-md shadow-amber-400/10' 
                                : 'border-white/10 hover:border-white/20 text-slate-400'
                            }`}
                          >
                            <span>{pkg.name}</span>
                            <span className="font-mono text-amber-400">{pkg.price}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">รอบการเรียกเก็บเงิน</label>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <button 
                          onClick={() => setBillingCycle('monthly')}
                          className={`py-2 rounded-xl border font-bold transition ${billingCycle === 'monthly' ? 'bg-white/15 border-amber-400 text-amber-300' : 'border-white/10 text-slate-400'}`}
                        >
                          รายเดือน (Monthly)
                        </button>
                        <button 
                          onClick={() => setBillingCycle('yearly')}
                          className={`py-2 rounded-xl border font-bold transition relative ${billingCycle === 'yearly' ? 'bg-white/15 border-amber-400 text-amber-300' : 'border-white/10 text-slate-400'}`}
                        >
                          รายปี (ลด 15% 🔥)
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">วิธีการชำระเงิน</label>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <button 
                          onClick={() => setPaymentMethod('card')}
                          className={`py-2.5 rounded-xl border font-bold flex items-center justify-center gap-2 transition ${paymentMethod === 'card' ? 'bg-amber-400/20 border-amber-400 text-amber-300' : 'border-white/10 text-slate-400'}`}
                        >
                          💳 บัตรเครดิต / เดบิต
                        </button>
                        <button 
                          onClick={() => setPaymentMethod('promptpay')}
                          className={`py-2.5 rounded-xl border font-bold flex items-center justify-center gap-2 transition ${paymentMethod === 'promptpay' ? 'bg-amber-400/20 border-amber-400 text-amber-300' : 'border-white/10 text-slate-400'}`}
                        >
                          📱 PromptPay QR
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between">
                    {paymentMethod === 'card' ? (
                      <div>
                        <div className="bg-gradient-to-tr from-[#111827] via-[#1f2937] to-[#0f172a] p-5 rounded-2xl border border-white/15 shadow-xl relative overflow-hidden mb-4">
                          <div className="flex justify-between items-start mb-6">
                            <span className="text-[11px] font-mono tracking-widest text-amber-400 font-bold uppercase">CORPORATE BLACK</span>
                            <span className="text-base font-black italic tracking-wider text-white">VISA</span>
                          </div>
                          <p className="font-mono text-base tracking-widest text-slate-200 mb-4">{cardDetails.number}</p>
                          <div className="flex justify-between items-end text-[10px] text-slate-400 font-mono">
                            <div>
                              <p className="uppercase text-[9px] text-slate-500">Card Holder</p>
                              <p className="text-white font-bold">{cardDetails.name}</p>
                            </div>
                            <div>
                              <p className="uppercase text-[9px] text-slate-500">Expires</p>
                              <p className="text-white font-bold">{cardDetails.expiry}</p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2 text-xs">
                          <input 
                            type="text" 
                            placeholder="หมายเลขบัตร 16 หลัก" 
                            defaultValue="4242 4242 4242 4242" 
                            className={`w-full p-2.5 rounded-xl border outline-none font-mono ${theme === 'dark' ? 'bg-black/50 border-white/15 text-white' : 'bg-slate-50 border-slate-300'}`}
                          />
                          <div className="grid grid-cols-2 gap-2">
                            <input type="text" placeholder="ดด/ปป" defaultValue="12/28" className={`p-2.5 rounded-xl border outline-none font-mono ${theme === 'dark' ? 'bg-black/50 border-white/15 text-white' : 'bg-slate-50 border-slate-300'}`} />
                            <input type="text" placeholder="CVV" defaultValue="888" className={`p-2.5 rounded-xl border outline-none font-mono ${theme === 'dark' ? 'bg-black/50 border-white/15 text-white' : 'bg-slate-50 border-slate-300'}`} />
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="p-4 rounded-2xl border border-white/10 bg-white/5 text-center flex flex-col items-center justify-center h-full">
                        <p className="text-xs font-bold text-slate-300 mb-3">สแกนจ่ายผ่านแอปธนาคาร (PromptPay)</p>
                        <div className="p-3 bg-white rounded-2xl shadow-lg mb-2">
                          <img 
                            src={`https://promptpay.io/0812345678/${selectedPlan === 'Starter' ? (billingCycle === 'yearly' ? 9900*12*0.85 : 9900) : (billingCycle === 'yearly' ? 29900*12*0.85 : 29900)}.png`} 
                            alt="PromptPay QR" 
                            className="w-36 h-36 object-contain"
                          />
                        </div>
                        <p className="text-[10px] text-emerald-400 font-bold">● ตรวจจับยอดเงินโอนอัตโนมัติภายใน 5 วินาที</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex justify-between items-center text-xs">
                  <div>
                    <span className="text-slate-400">ยอดชำระรวม: </span>
                    <span className="text-xl font-black text-amber-400 ml-1">
                      ฿ {selectedPlan === 'Starter' 
                          ? (billingCycle === 'yearly' ? (9900 * 12 * 0.85).toLocaleString() : '9,900') 
                          : selectedPlan === 'Business_Scale' 
                          ? (billingCycle === 'yearly' ? (29900 * 12 * 0.85).toLocaleString() : '29,900') 
                          : (billingCycle === 'yearly' ? (99000 * 12 * 0.85).toLocaleString() : '99,000')}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono ml-1">THB</span>
                  </div>

                  <div className="flex gap-2">
                    <button onClick={() => setIsCheckoutOpen(false)} className="px-4 py-2.5 rounded-xl hover:bg-slate-500/10 font-semibold transition">ยกเลิก</button>
                    <button 
                      onClick={handleProcessPayment} 
                      disabled={isProcessingPayment}
                      className="bg-gradient-to-r from-amber-400 to-amber-300 text-slate-950 font-black px-6 py-2.5 rounded-xl transition shadow-lg shadow-amber-400/20 active:scale-95"
                    >
                      {isProcessingPayment ? '⏳ กำลังตัดยอดชำระ...' : 'ยืนยันการผูกบัตร & ชำระเงิน ↗'}
                    </button>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* Modal อัปโหลดไฟล์ */}
      {isUploadOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className={`${theme === 'dark' ? 'bg-[#0b1020] border-white/15 text-white' : 'bg-white border-slate-200 text-slate-900'} border rounded-3xl w-full max-w-lg p-8 shadow-2xl relative`}>
            <button onClick={() => setIsUploadOpen(false)} className="absolute top-5 right-5 text-slate-400 hover:text-white transition text-lg">✕</button>
            <div className="flex items-center gap-3.5 mb-2">
              <div className="w-11 h-11 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400 shadow-inner">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
              </div>
              <div>
                <h2 className="text-lg font-black">AI Data Ingestion Hub</h2>
                <p className="text-xs text-slate-400">อัปโหลดชุดข้อมูลเพื่อเริ่มการวิเคราะห์เชิงลึกอัตโนมัติ</p>
              </div>
            </div>
            
            <div className={`mt-6 border-2 border-dashed ${theme === 'dark' ? 'border-white/15 bg-[#070c18]' : 'border-slate-300 bg-slate-50'} hover:border-amber-400/60 rounded-2xl p-8 text-center transition cursor-pointer relative group`}>
              <input type="file" accept=".csv, .xlsx" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" onChange={(e) => setSelectedFile(e.target.files[0])}/>
              <div className="w-14 h-14 mx-auto mb-3 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 group-hover:text-amber-400 group-hover:scale-110 transition duration-300">
                <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              </div>
              {selectedFile ? (
                <div className="bg-amber-400/10 border border-amber-400/30 py-2 px-4 rounded-xl inline-block">
                  <p className="text-amber-400 font-bold text-sm">{selectedFile.name}</p>
                </div>
              ) : (
                <>
                  <p className="text-sm font-semibold">ลากและวางไฟล์ข้อมูล หรือคลิกเพื่อเลือกไฟล์</p>
                  <p className="text-xs text-slate-500 mt-1">รองรับรูปแบบไฟล์ .csv, .xlsx (สิทธิ์ฟรี: 1 ไฟล์ ไม่เกิน 1,000 แถว)</p>
                </>
              )}
            </div>

            <div className="mt-6 flex justify-between items-center text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                256-bit Bank-grade Encryption
              </span>
              <div className="flex gap-2">
                <button onClick={() => setIsUploadOpen(false)} className="px-4 py-2.5 rounded-xl hover:bg-slate-500/10 transition font-semibold">ยกเลิก</button>
                <button 
                  onClick={handleAnalyze} 
                  disabled={!selectedFile || isUploading} 
                  className={`px-5 py-2.5 rounded-xl font-bold transition shadow-lg ${selectedFile && !isUploading ? 'bg-gradient-to-r from-amber-400 to-amber-300 text-slate-950 hover:brightness-105 shadow-amber-400/20' : 'bg-slate-500/10 text-slate-400 cursor-not-allowed'}`}
                >
                  {isUploading ? '⏳ กำลังประมวลผลด้วย AI...' : 'เริ่มการวิเคราะห์ทันที'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar Navigation */}
      <aside className={`border-r ${theme === 'dark' ? 'border-white/5 bg-[#050917]/95' : 'border-slate-200 bg-white/95'} backdrop-blur-2xl flex flex-col justify-between transition-all duration-300 z-30 ${isSidebarOpen ? 'w-64' : 'w-20'}`}>
        <div>
          <div className={`p-5 flex items-center justify-between border-b ${theme === 'dark' ? 'border-white/5' : 'border-slate-200'}`}>
            <div className="flex items-center gap-3 overflow-hidden">
              <div className={`w-10 h-10 rounded-2xl p-1 border flex-shrink-0 flex items-center justify-center shadow-md ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-slate-100 border-slate-200'}`}>
                <AppLogo />
              </div>
              {isSidebarOpen && (
                <div className="whitespace-nowrap">
                  <span className={`text-base font-black tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Insight<span className="text-amber-400">Flow</span></span>
                  <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Enterprise Console</p>
                </div>
              )}
            </div>
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-slate-400 hover:text-amber-400 p-1.5 rounded-lg hover:bg-slate-500/10 transition">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d={isSidebarOpen ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"} /></svg>
            </button>
          </div>

          <nav className="p-3 space-y-1 mt-3">
            {[
              { 
                id: 'overview', 
                label: 'ภาพรวมระบบ', 
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                  </svg>
                ) 
              },
              { 
                id: 'live', 
                label: 'ทราฟฟิกสด (Pulse)', 
                badge: 'Live',
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                ) 
              },
              { 
                id: 'insights', 
                label: 'บทวิเคราะห์ AI', 
                badge: 'AI Pro',
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                ) 
              },
              { 
                id: 'database', 
                label: 'SQLite Database', 
                badge: 'DB',
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" />
                  </svg>
                ) 
              },
              { 
                id: 'settings', 
                label: 'ตั้งค่าระบบ', 
                icon: (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ) 
              },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition ${
                  activeTab === item.id 
                    ? 'bg-gradient-to-r from-amber-400/20 via-amber-400/10 to-transparent text-amber-500 border border-amber-400/30 shadow-sm' 
                    : 'text-slate-400 hover:text-amber-400 hover:bg-slate-500/10 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={activeTab === item.id ? 'text-amber-400' : 'text-slate-400'}>{item.icon}</span>
                  {isSidebarOpen && <span className="truncate">{item.label}</span>}
                </div>
                {isSidebarOpen && item.badge && (
                  <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-md ${
                    item.badge === 'Live' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 animate-pulse' :
                    item.badge === 'DB' ? 'bg-sky-500/20 text-sky-400 border border-sky-500/30' : 'bg-amber-400 text-slate-950'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className={`p-3 border-t ${theme === 'dark' ? 'border-white/5 bg-black/20' : 'border-slate-200 bg-slate-100/60'}`}>
          <div className="flex items-center gap-3 p-2 rounded-2xl hover:bg-slate-500/10 transition">
            <div className="w-10 h-10 rounded-xl overflow-hidden border border-white/10 flex-shrink-0">
              <img src={user.picture} alt="Avatar" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
            </div>
            {isSidebarOpen && (
              <div className="overflow-hidden flex-1">
                <p className={`text-xs font-black truncate ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{user.name}</p>
                <p className="text-[10px] text-emerald-400 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span> Workspace Lead
                </p>
              </div>
            )}
            {isSidebarOpen && (
              <button onClick={handleLogout} title="ออกจากระบบ" className="text-slate-400 hover:text-rose-400 p-1.5 rounded-lg hover:bg-slate-500/10 transition">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* Main Viewport */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        <header className={`border-b ${theme === 'dark' ? 'border-white/5 bg-[#040816]/85' : 'border-slate-200 bg-white/85'} backdrop-blur-xl px-8 py-4 flex flex-wrap justify-between items-center gap-4 sticky top-0 z-20`}>
          <div className="flex items-center gap-4">
            <div>
              <h1 className={`text-xl font-black tracking-tight flex items-center gap-2.5 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                {activeTab === 'overview' && 'Executive Command Center'}
                {activeTab === 'live' && 'Real-time Telemetry & Live Pulse'}
                {activeTab === 'insights' && 'AI Neural Insights & Conversational Copilot'}
                {activeTab === 'database' && 'SQLite Enterprise Database Instance'}
                {activeTab === 'settings' && 'Enterprise System Settings'}
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Systems Operational
                </span>
              </h1>
              <p className="text-xs text-slate-400 mt-0.5">SQLite High-Speed Engine • AI Billing & Analytics Active</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsCheckoutOpen(true)}
              className="bg-gradient-to-r from-amber-400 to-amber-300 hover:brightness-105 text-slate-950 font-black px-4 py-2 rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-amber-400/20 transition active:scale-95"
            >
              <span>💳 ผูกบัตร / อัปเกรด</span>
            </button>

            {/* Top Bar Action 1: Export Slide Data (.csv) */}
            <button 
              onClick={exportPresentationDataset}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition flex items-center gap-2 shadow-lg group relative overflow-hidden ${
                theme === 'dark' 
                  ? 'bg-gradient-to-r from-amber-500/10 via-[#0d152a] to-transparent border-amber-400/30 hover:border-amber-400/70 text-slate-200 hover:text-amber-300 shadow-amber-400/5' 
                  : 'bg-white border-amber-300/80 hover:border-amber-500 text-slate-800 shadow-amber-500/10'
              }`}
              title="ส่งออกไฟล์ข้อมูลวิเคราะห์เพื่อใช้ทำ Slide นำเสนอ"
            >
              <div className="w-5 h-5 rounded-lg bg-amber-400/15 border border-amber-400/30 flex items-center justify-center text-amber-400 group-hover:scale-110 group-hover:bg-amber-400/25 transition duration-200 flex-shrink-0">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                  <path d="M7 13l3-3 2 2 5-5" />
                </svg>
              </div>
              <span className="tracking-wide">ชุดข้อมูลสไลด์ (.csv)</span>
            </button>

            {/* Top Bar Action 2: Export Executive Brief (.txt) */}
            <button 
              onClick={exportExecutiveBrief}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold border transition flex items-center gap-2 shadow-lg group relative overflow-hidden ${
                theme === 'dark' 
                  ? 'bg-gradient-to-r from-amber-400/15 via-[#0d152a] to-amber-500/10 border-amber-400/40 hover:border-amber-400/80 text-amber-300 hover:text-amber-200 shadow-amber-400/10' 
                  : 'bg-amber-50/80 border-amber-300 text-amber-900 hover:bg-amber-100/70 shadow-amber-500/10'
              }`}
              title="ส่งออกสรุปตัวเลข Executive Summary พร้อมใช้บรรยาย"
            >
              <div className="w-5 h-5 rounded-lg bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-300 group-hover:scale-110 group-hover:bg-amber-400/30 transition duration-200 flex-shrink-0">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <line x1="10" y1="9" x2="8" y2="9" />
                </svg>
              </div>
              <span className="tracking-wide">สรุปผลผู้บริหาร (.txt)</span>
            </button>

            {/* ปุ่มสลับโหมดมืด/สว่าง */}
            <button 
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className={`p-2 rounded-xl border transition flex items-center justify-center ${
                theme === 'dark' 
                  ? 'bg-[#0b1020] border-white/10 text-amber-300 hover:border-amber-400/40' 
                  : 'bg-slate-100 border-slate-300 text-slate-700 hover:border-amber-500'
              }`}
              title={theme === 'dark' ? 'สลับเป็นโหมดสว่าง (Light Mode)' : 'สลับเป็นโหมดมืด (Dark Mode)'}
            >
              {theme === 'dark' ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
              ) : (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" /></svg>
              )}
            </button>

            <button 
              onClick={() => setIsUploadOpen(true)}
              className="bg-white/10 hover:bg-white/15 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-2 border border-white/10 transition"
            >
              <svg className="w-4 h-4 text-slate-300" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
              อัปโหลดไฟล์
            </button>
          </div>
        </header>

        <main className="p-8 space-y-8 flex-1">

          {/* TAB: ภาพรวมระบบ (OVERVIEW) */}
          {activeTab === 'overview' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              
              <div className={`p-6 rounded-3xl border shadow-2xl relative overflow-hidden ${
                theme === 'dark' 
                  ? 'bg-gradient-to-r from-amber-400/15 via-[#0b1120] to-[#070c1a] border-amber-400/30' 
                  : 'bg-gradient-to-r from-amber-100/60 via-white to-amber-50 border-amber-300'
              }`}>
                <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-400 shadow-inner flex-shrink-0">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black tracking-widest uppercase bg-amber-400/20 text-amber-400 px-2.5 py-0.5 rounded-md border border-amber-400/30">InsightFlow AI Digest</span>
                        <span className="text-xs text-slate-400">อัปเดตเมื่อ 2 นาทีที่แล้ว</span>
                      </div>
                      <h3 className={`text-lg font-black mt-1 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>ยอด Conversion จากแคมเปญ Affiliate มีอัตราเร่งสูงสุด (+18.4%)</h3>
                      <p className="text-sm text-slate-400 mt-1 max-w-4xl leading-relaxed">
                        AI ตรวจพบพฤติกรรมการซื้อที่เพิ่มขึ้นอย่างมีนัยสำคัญจากช่องทาง Referral แนะนำให้ปรับงบประมาณโฆษณาเพื่อเพิ่มกำไรสุทธิ 15% ใน 7 วันข้างหน้า
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2.5 self-start lg:self-center">
                    <button 
                      onClick={() => setIsCheckoutOpen(true)}
                      className="bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black px-4 py-2.5 rounded-2xl shadow-lg shadow-amber-400/20 transition flex items-center gap-2 whitespace-nowrap active:scale-95"
                    >
                      💳 จัดการการผูกบัตร & Billing
                    </button>
                    <button 
                      onClick={exportPresentationDataset} 
                      className="bg-white/10 hover:bg-white/15 text-slate-200 text-xs font-bold px-4 py-2.5 rounded-2xl border border-white/10 transition flex items-center gap-2 whitespace-nowrap"
                    >
                      <span>📥 โหลดชุดข้อมูลสไลด์ (.csv)</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* 4 กล่อง KPI */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  { title: 'รายได้รวม (Total Revenue)', value: '฿ 4,829,000', change: '+16.8%', isUp: true, subtitle: 'เทียบกับเดือนที่ผ่านมา', icon: <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> },
                  { title: 'ผู้ใช้งานสด (Live Users)', value: '3,842', change: '+24.1%', isUp: true, subtitle: 'กำลังใช้งานในระบบขณะนี้', icon: <svg className="w-5 h-5 text-sky-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg> },
                  { title: 'อัตราปิดการขาย (Conversion)', value: '6.84%', change: '+1.2%', isUp: true, subtitle: 'ค่าเฉลี่ยทุกช่องทางขาย', icon: <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg> },
                  { title: 'ความเร็วตอบสนอง (Latency)', value: '2 ms', change: '-26 ms', isUp: true, subtitle: 'SQLite High-Speed Engine', icon: <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg> },
                ].map((kpi, idx) => (
                  <div key={idx} className={`p-6 rounded-3xl border shadow-xl backdrop-blur-xl relative overflow-hidden transition group hover:-translate-y-1 ${
                    theme === 'dark' ? 'bg-[#0b1020]/80 border-white/10' : 'bg-white border-slate-200'
                  }`}>
                    <div className="flex justify-between items-start mb-4">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">{kpi.title}</span>
                      <div className={`w-10 h-10 rounded-2xl border flex items-center justify-center shadow-inner ${theme === 'dark' ? 'bg-white/5 border-white/10' : 'bg-slate-100 border-slate-200'}`}>
                        {kpi.icon}
                      </div>
                    </div>
                    <div className="flex items-baseline gap-3 mb-2">
                      <h4 className={`text-3xl font-black tracking-tight ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{kpi.value}</h4>
                      <span className={`text-xs font-black px-2 py-0.5 rounded-lg ${kpi.isUp ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                        {kpi.change}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium">{kpi.subtitle}</p>
                  </div>
                ))}
              </div>

              {/* กราฟหลัก */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className={`lg:col-span-8 p-7 rounded-3xl border shadow-xl backdrop-blur-xl flex flex-col justify-between ${
                  theme === 'dark' ? 'bg-[#0b1020]/80 border-white/10' : 'bg-white border-slate-200'
                }`}>
                  <div className="flex flex-wrap justify-between items-center mb-6 gap-3">
                    <div>
                      <h3 className={`text-base font-black flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                        <span className="w-2.5 h-2.5 rounded-full bg-sky-400"></span>
                        วิเคราะห์แนวโน้มทราฟฟิกเทียบกับเป้าหมาย AI (Traffic vs AI Projection)
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">ข้อมูลอัปเดตแบบเรียลไทม์จากฐานข้อมูล SQLite</p>
                    </div>
                    <div className={`flex items-center gap-2 text-xs px-3 py-1.5 rounded-xl border ${theme === 'dark' ? 'bg-black/30 border-white/5 text-slate-400' : 'bg-slate-100 border-slate-200 text-slate-600'}`}>
                      <span>ความแม่นยำโมเดล:</span>
                      <span className="text-amber-400 font-black">98.4%</span>
                    </div>
                  </div>
                  <div className="h-80 w-full relative">
                    <Line data={lineChartData} options={lineChartOptions} />
                  </div>
                </div>

                <div className={`lg:col-span-4 p-7 rounded-3xl border shadow-xl backdrop-blur-xl flex flex-col justify-between ${
                  theme === 'dark' ? 'bg-[#0b1020]/80 border-white/10' : 'bg-white border-slate-200'
                }`}>
                  <div>
                    <h3 className={`text-base font-black mb-1 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>สัดส่วนผู้ใช้งานแยกตามอุปกรณ์</h3>
                    <p className="text-xs text-slate-400 mb-6">Device & Client Platform Share</p>
                    <div className="h-56 w-full relative flex items-center justify-center">
                      <Doughnut data={doughnutData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }} />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3 mt-6 pt-4 border-t border-white/10 text-xs">
                    <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-sky-400"></span> Desktop: <strong>48%</strong></div>
                    <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-amber-400"></span> Mobile: <strong>28%</strong></div>
                    <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-400"></span> iOS: <strong>14%</strong></div>
                    <div className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-purple-400"></span> Android: <strong>10%</strong></div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: ทราฟฟิกสด (LIVE PULSE) */}
          {activeTab === 'live' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className={`p-6 rounded-3xl border shadow-xl backdrop-blur-xl relative overflow-hidden ${
                  theme === 'dark' ? 'bg-[#091024]/80 border-emerald-500/30' : 'bg-white border-emerald-300'
                }`}>
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Live Requests / Sec</span>
                    <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping"></span>
                  </div>
                  <h3 className={`text-3xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{liveThroughput.toLocaleString()} <span className="text-xs text-slate-400 font-normal">req/s</span></h3>
                  <p className="text-[11px] text-emerald-400 mt-2 font-medium">↗ ปริมาณข้อมูลเสถียร +8.4%</p>
                </div>

                <div className={`p-6 rounded-3xl border shadow-xl backdrop-blur-xl ${
                  theme === 'dark' ? 'bg-[#091024]/80 border-white/10' : 'bg-white border-slate-200'
                }`}>
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">Global Edge Latency</span>
                    <span className="text-sky-400 font-mono text-xs">⚡</span>
                  </div>
                  <h3 className={`text-3xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{liveLatency} <span className="text-xs text-slate-400 font-normal">ms</span></h3>
                  <p className="text-[11px] text-slate-400 mt-2">ตอบสนองรวดเร็วผ่าน Local SQLite Engine</p>
                </div>

                <div className={`p-6 rounded-3xl border shadow-xl backdrop-blur-xl ${
                  theme === 'dark' ? 'bg-[#091024]/80 border-white/10' : 'bg-white border-slate-200'
                }`}>
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">Active Socket Nodes</span>
                    <span className="text-amber-400 font-mono text-xs">🌐</span>
                  </div>
                  <h3 className={`text-3xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{liveThroughput > 0 ? '48 / 48' : '0 / 48'} <span className="text-xs text-slate-400 font-normal">Nodes</span></h3>
                  <p className="text-[11px] text-slate-400 mt-2">กระจายโหลด 100% สม่ำเสมอ</p>
                </div>

                <div className={`p-6 rounded-3xl border shadow-xl backdrop-blur-xl ${
                  theme === 'dark' ? 'bg-[#091024]/80 border-white/10' : 'bg-white border-slate-200'
                }`}>
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">Data Loss Rate</span>
                    <span className="text-purple-400 font-mono text-xs">🛡️</span>
                  </div>
                  <h3 className={`text-3xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>0.000%</h3>
                  <p className="text-[11px] text-emerald-400 mt-2">Zero Packet Dropped</p>
                </div>
              </div>

              <div className={`p-7 rounded-3xl border shadow-2xl backdrop-blur-xl relative ${
                theme === 'dark' ? 'bg-[#091024]/80 border-white/10' : 'bg-white border-slate-200'
              }`}>
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className={`text-lg font-black flex items-center gap-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></span>
                      Realtime Throughput Waveform (อัปเดตสดทุก 2.5 วินาที)
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">ตรวจจับความหนาแน่นของการเรียกใช้งาน API และการตอบสนองของระบบ</p>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-xl border border-emerald-500/20">
                    Live Stream: Connected
                  </span>
                </div>
                <div className="h-72 w-full relative">
                  <Line data={livePulseChartData} options={lineChartOptions} />
                </div>
              </div>
            </div>
          )}

          {/* TAB: บทวิเคราะห์ AI (INSIGHTS) */}
          {activeTab === 'insights' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className={`p-8 rounded-3xl border relative overflow-hidden shadow-2xl ${
                theme === 'dark' 
                  ? 'bg-gradient-to-r from-amber-500/20 via-[#0b1228] to-[#040817] border-amber-400/40' 
                  : 'bg-gradient-to-r from-amber-100/60 via-white to-amber-50 border-amber-300'
              }`}>
                <div className="relative flex flex-col lg:flex-row justify-between lg:items-center gap-6">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 shadow-xl flex-shrink-0">
                      <svg className="w-8 h-8 text-slate-950" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black tracking-widest uppercase bg-amber-400/20 text-amber-400 px-3 py-1 rounded-md border border-amber-400/30">
                          Neural Strategic Engine • Active
                        </span>
                        <span className="text-xs text-slate-400 font-mono">Accuracy: 98.4% (Gemini 2.5 Flash)</span>
                      </div>
                      <h2 className={`text-2xl font-black mt-1.5 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>AI Conversational Intelligence & Strategic Playbooks</h2>
                      <p className="text-sm text-slate-400 mt-1 max-w-3xl leading-relaxed">
                        ถามคำถามเกี่ยวกับยอดขาย ทราฟฟิก หรือกลยุทธ์ธุรกิจเป็นภาษาคน แล้วให้ AI วิเคราะห์คำตอบจากฐานข้อมูลของคุณโดยตรงทันที
                      </p>
                    </div>
                  </div>
                  <button onClick={() => setIsUploadOpen(true)} className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-6 py-3 rounded-2xl text-xs transition shadow-xl shadow-amber-400/20 self-start lg:self-center">
                    ป้อนข้อมูลใหม่ให้ AI วิเคราะห์ ↗
                  </button>
                </div>
              </div>

              {/* 4 Strategic Playbook Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
                <div className={`p-7 rounded-3xl border backdrop-blur-xl shadow-xl transition group relative overflow-hidden hover:-translate-y-1 ${
                  theme === 'dark' ? 'bg-[#091024]/80 border-white/10 hover:border-amber-400/40' : 'bg-white border-slate-200 hover:border-amber-400'
                }`}>
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-amber-400/60 to-transparent"></div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-amber-400/10 border border-amber-400/25 flex items-center justify-center text-amber-400 shadow-inner">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
                    </div>
                    <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/20">+฿480,000 Revenue Potential</span>
                  </div>
                  <h3 className={`text-lg font-black mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>เร่งยอดขายผ่านช่องทาง Affiliate & Google Search</h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-6">
                    อัตราการปิดการขาย (Conversion Rate) ของกลุ่มผู้ใช้จากช่องทาง Affiliate สูงถึง 9.1% (สูงกว่าค่าเฉลี่ยตลาด 2 เท่า) AI แนะนำให้โยกงบประมาณโฆษณา 30% จาก Social Ads เพื่อผลักดันยอดขายในกลุ่มนี้ทันที
                  </p>
                  <div className={`p-3.5 rounded-2xl border flex justify-between items-center text-xs ${
                    theme === 'dark' ? 'bg-white/[0.02] border-white/5' : 'bg-slate-50 border-slate-200'
                  }`}>
                    <span className="text-slate-400">มาตรการที่แนะนำ:</span>
                    <button onClick={() => handleSendChat("ขอแผนการจัดสรรงบประมาณโฆษณาสำหรับ Affiliate แบบละเอียดหน่อย")} className="font-bold text-amber-400 hover:underline">ถาม AI เรื่องนี้ ↗</button>
                  </div>
                </div>

                <div className={`p-7 rounded-3xl border backdrop-blur-xl shadow-xl transition group relative overflow-hidden hover:-translate-y-1 ${
                  theme === 'dark' ? 'bg-[#091024]/80 border-white/10 hover:border-rose-400/40' : 'bg-white border-slate-200 hover:border-rose-400'
                }`}>
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-rose-500/60 to-transparent"></div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-rose-500/10 border border-rose-500/25 flex items-center justify-center text-rose-400 shadow-inner">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                    </div>
                    <span className="text-[11px] font-bold text-rose-400 bg-rose-500/10 px-2.5 py-1 rounded-lg border border-rose-500/20">Risk Level: Moderate</span>
                  </div>
                  <h3 className={`text-lg font-black mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>ตรวจจับกลุ่มลูกค้าที่มีความเสี่ยงชะลอการสั่งซื้อ</h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-6">
                    ตรวจพบบัญชีลูกค้าองค์กร 142 บัญชี มีระยะเวลาเซสชัน (Session Duration) ลดลงกว่า 40% ในรอบ 14 วันที่ผ่านมา AI แนะนำให้ฝ่ายขายส่งแคมเปญ Retention เชิงรุกเพื่อป้องกันการยกเลิกสัญญา
                  </p>
                  <div className={`p-3.5 rounded-2xl border flex justify-between items-center text-xs ${
                    theme === 'dark' ? 'bg-white/[0.02] border-white/5' : 'bg-slate-50 border-slate-200'
                  }`}>
                    <span className="text-slate-400">มาตรการที่แนะนำ:</span>
                    <button onClick={() => handleSendChat("มีวิธีป้องกันลูกค้า 142 บัญชีนี้ไม่ให้เลิกใช้บริการอย่างไรบ้าง?")} className="font-bold text-rose-400 hover:underline">ถาม AI เรื่องนี้ ↗</button>
                  </div>
                </div>

                <div className={`p-7 rounded-3xl border backdrop-blur-xl shadow-xl transition group relative overflow-hidden hover:-translate-y-1 ${
                  theme === 'dark' ? 'bg-[#091024]/80 border-white/10 hover:border-sky-400/40' : 'bg-white border-slate-200 hover:border-sky-400'
                }`}>
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-sky-400/60 to-transparent"></div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/25 flex items-center justify-center text-sky-400 shadow-inner">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                    </div>
                    <span className="text-[11px] font-bold text-sky-400 bg-sky-500/10 px-2.5 py-1 rounded-lg border border-sky-500/20">+22% Avg Basket Size</span>
                  </div>
                  <h3 className={`text-lg font-black mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>กลยุทธ์ Bundle Package เพิ่มมูลค่าต่อตะกร้า</h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-6">
                    ลูกค้าร้อยละ 68 มักซื้อสินค้าเพียง 1 รายการต่อครั้ง การสร้างข้อเสนอ Cross-selling ระหว่างดูหน้าเว็บเกิน 6 หน้าขึ้นไป จะช่วยกระตุ้นยอดซื้อซ้ำต่อออเดอร์ให้พุ่งขึ้นเฉลี่ย ฿1,250
                  </p>
                  <div className={`p-3.5 rounded-2xl border flex justify-between items-center text-xs ${
                    theme === 'dark' ? 'bg-white/[0.02] border-white/5' : 'bg-slate-50 border-slate-200'
                  }`}>
                    <span className="text-slate-400">มาตรการที่แนะนำ:</span>
                    <button onClick={() => handleSendChat("ควรจัด Bundle สินค้าแบบไหนดีเพื่อเพิ่มยอดตะกร้า 22%?")} className="font-bold text-sky-400 hover:underline">ถาม AI เรื่องนี้ ↗</button>
                  </div>
                </div>

                <div className={`p-7 rounded-3xl border backdrop-blur-xl shadow-xl transition group relative overflow-hidden hover:-translate-y-1 ${
                  theme === 'dark' ? 'bg-[#091024]/80 border-white/10 hover:border-purple-400/40' : 'bg-white border-slate-200 hover:border-purple-400'
                }`}>
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-purple-400/60 to-transparent"></div>
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/25 flex items-center justify-center text-purple-400 shadow-inner">
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                    </div>
                    <span className="text-[11px] font-bold text-purple-400 bg-purple-500/10 px-2.5 py-1 rounded-lg border border-purple-500/20">Forecast Window: 14 Days</span>
                  </div>
                  <h3 className={`text-lg font-black mb-2 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>คาดการณ์คลังสินค้าและซัพพลายเชนอัจฉริยะ</h3>
                  <p className="text-xs text-slate-400 leading-relaxed mb-6">
                    โมเดลทำนายยอดสั่งซื้อช่วงสุดสัปดาห์ชี้ว่าสินค้ากลุ่มหลักอาจเกิดปัญหา Stockout ใน 5 วันข้างหน้า แนะนำให้สั่งเติมสินค้าล่วงหน้าเพื่อรักษาอัตรา Fulfillment ให้ได้ 99.8%
                  </p>
                  <div className={`p-3.5 rounded-2xl border flex justify-between items-center text-xs ${
                    theme === 'dark' ? 'bg-white/[0.02] border-white/5' : 'bg-slate-50 border-slate-200'
                  }`}>
                    <span className="text-slate-400">มาตรการที่แนะนำ:</span>
                    <button onClick={() => handleSendChat("ควรเตรียมสต็อกสินค้าตัวไหนเพิ่มใน 5 วันข้างหน้านี้?")} className="font-bold text-purple-400 hover:underline">ถาม AI เรื่องนี้ ↗</button>
                  </div>
                </div>
              </div>

              {/* ห้องแชตถาม-ตอบ AI Copilot */}
              <div className={`p-6 lg:p-8 rounded-3xl border shadow-2xl backdrop-blur-2xl flex flex-col h-[560px] relative overflow-hidden ${
                theme === 'dark' ? 'bg-[#091024]/90 border-white/10' : 'bg-white border-slate-200'
              }`}>
                <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full bg-emerald-400 animate-pulse"></div>
                    <div>
                      <h3 className={`text-base font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>InsightFlow Neural Copilot</h3>
                      <p className="text-[11px] text-slate-400">พร้อมตอบทุกข้อสงสัยเกี่ยวกับข้อมูล 1,000 แถวล่าสุด</p>
                    </div>
                  </div>
                  <button onClick={() => setChatMessages([chatMessages[0]])} className="text-xs text-slate-400 hover:text-amber-400 px-3 py-1 rounded-lg hover:bg-slate-500/10 transition">
                    ล้างการสนทนา ↺
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto space-y-4 pr-2 mb-4 scrollbar-thin scrollbar-thumb-white/10">
                  {chatMessages.map((msg, idx) => (
                    <div key={idx} className={`flex gap-3.5 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                      {msg.sender === 'ai' && (
                        <div className="w-9 h-9 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center text-amber-400 flex-shrink-0 shadow-md">🤖</div>
                      )}
                      <div className={`max-w-2xl rounded-2xl p-4 text-xs leading-relaxed ${
                        msg.sender === 'user' 
                          ? 'bg-amber-400 text-slate-950 font-semibold shadow-md' 
                          : theme === 'dark' ? 'bg-white/5 border border-white/10 text-slate-200' : 'bg-slate-100 border border-slate-200 text-slate-800'
                      }`}>
                        <p className="whitespace-pre-line">{msg.text}</p>
                        <span className={`block text-[9px] mt-1.5 ${msg.sender === 'user' ? 'text-slate-800' : 'text-slate-400'}`}>{msg.time}</span>
                      </div>
                      {msg.sender === 'user' && (
                        <div className="w-9 h-9 rounded-xl overflow-hidden border border-white/20 flex-shrink-0">
                          <img src={user.picture} alt="User" className="w-full h-full object-cover" />
                        </div>
                      )}
                    </div>
                  ))}

                  {isChatThinking && (
                    <div className="flex gap-3.5 items-center text-xs text-amber-400">
                      <div className="w-9 h-9 rounded-xl bg-amber-400/20 border border-amber-400/40 flex items-center justify-center flex-shrink-0 animate-spin">⚡</div>
                      <div className={`p-3 rounded-2xl ${theme === 'dark' ? 'bg-white/5 text-slate-300' : 'bg-slate-100 text-slate-700'}`}>AI กำลังประมวลผลคำตอบจากฐานข้อมูล...</div>
                    </div>
                  )}
                  <div ref={chatBottomRef} />
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                  {[
                    "ช่องทางไหนสร้างยอดขายและ Conversion สูงสุด?",
                    "แนะนำกลยุทธ์เพิ่มยอดขายสำหรับลูกค้า Desktop หน่อย",
                    "มีความผิดปกติหรือจุดเสี่ยงตรงไหนในระบบบ้าง?",
                    "สรุปผลประกอบการเดือนนี้ให้เข้าใจง่ายใน 3 ข้อ"
                  ].map((preset, i) => (
                    <button
                      key={i}
                      onClick={() => handleSendChat(preset)}
                      className={`text-[11px] px-3 py-1.5 rounded-xl border transition ${
                        theme === 'dark' 
                          ? 'bg-white/[0.04] hover:bg-white/10 text-slate-300 hover:text-amber-300 border-white/10' 
                          : 'bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-amber-600 border-slate-200'
                      }`}
                    >
                      {preset}
                    </button>
                  ))}
                </div>

                <div className="relative flex items-center">
                  <input
                    type="text"
                    value={chatInput}
                    onChange={(e) => setChatInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSendChat()}
                    placeholder="พิมพ์ถามข้อมูลธุรกิจที่นี่ เช่น 'สัปดาห์นี้ควรเพิ่มงบโฆษณาช่องทางไหน?'..."
                    className={`w-full border rounded-2xl py-3.5 pl-4 pr-28 text-xs outline-none transition shadow-inner ${
                      theme === 'dark' ? 'bg-black/50 border-white/15 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                  <button
                    onClick={() => handleSendChat()}
                    disabled={!chatInput.trim() || isChatThinking}
                    className="absolute right-2 px-4 py-2 rounded-xl text-xs font-bold bg-amber-400 text-slate-950 shadow-md hover:bg-amber-300 transition"
                  >
                    ส่งถาม AI ↗
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB: SQLITE DATABASE */}
          {activeTab === 'database' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className={`p-8 rounded-3xl border relative overflow-hidden shadow-2xl ${
                theme === 'dark' 
                  ? 'bg-gradient-to-r from-sky-500/20 via-[#071328] to-[#040816] border-sky-400/30' 
                  : 'bg-gradient-to-r from-sky-50 via-white to-sky-50 border-sky-200'
              }`}>
                <div className="relative flex flex-col lg:flex-row justify-between lg:items-center gap-6">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-sky-400 to-sky-600 flex items-center justify-center text-slate-950 shadow-xl flex-shrink-0">
                      <svg className="w-7 h-7 text-slate-950" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4" /></svg>
                    </div>
                    <div>
                      <span className="text-[10px] font-black tracking-widest uppercase bg-sky-400/20 text-sky-400 px-3 py-1 rounded-md border border-sky-400/30">
                        High-Performance SQLite Instance • Connected
                      </span>
                      <h2 className={`text-2xl font-black mt-1.5 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>InsightFlow Embedded Database Engine</h2>
                      <p className="text-sm text-slate-400 mt-1 font-mono">Storage: backend/insightflow.db (Zero Configuration • Local Speed)</p>
                    </div>
                  </div>
                  <button onClick={handleRunSQL} className="bg-sky-500 hover:bg-sky-400 text-slate-950 font-black px-6 py-3 rounded-2xl text-xs transition shadow-xl shadow-sky-500/20 flex items-center gap-2">
                    <span>⚡</span> รันคำสั่งจำลอง Sync DB
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className={`lg:col-span-7 p-7 rounded-3xl border shadow-2xl backdrop-blur-xl flex flex-col justify-between ${
                  theme === 'dark' ? 'bg-[#091024]/90 border-white/10' : 'bg-white border-slate-200'
                }`}>
                  <div>
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-sky-400"></span>
                        <h3 className={`text-base font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>SQL Query Sandbox</h3>
                      </div>
                      <span className="text-xs text-slate-400 font-mono">Engine: SQLite 3.x</span>
                    </div>
                    <textarea
                      rows="5"
                      value={sqlQuery}
                      onChange={(e) => setSqlQuery(e.target.value)}
                      className={`w-full p-4 font-mono text-xs outline-none resize-none rounded-2xl border ${
                        theme === 'dark' ? 'bg-[#040711] border-white/10 text-sky-300' : 'bg-slate-900 border-slate-800 text-sky-400'
                      }`}
                    />
                    <div className="flex justify-between items-center my-4">
                      <span className="text-xs text-slate-400 font-mono">Execution: Local Fast Memory</span>
                      <button 
                        onClick={handleRunSQL}
                        disabled={isQueryRunning}
                        className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-5 py-2.5 rounded-xl text-xs transition shadow-md flex items-center gap-1.5"
                      >
                        {isQueryRunning ? '⏳ กำลังคิวรี่...' : '▶ Execute Query'}
                      </button>
                    </div>

                    {queryResult && (
                      <div className="mt-4 pt-4 border-t border-white/10 animate-in fade-in">
                        <p className="text-xs font-bold text-emerald-400 mb-2">Query Succeeded (Returned 5 rows in 0.002s)</p>
                        <div className={`rounded-xl overflow-hidden border ${theme === 'dark' ? 'border-white/10 bg-black/40' : 'border-slate-200 bg-slate-50'} text-xs font-mono`}>
                          <table className="w-full text-left">
                            <thead className={theme === 'dark' ? 'bg-white/5 text-slate-300' : 'bg-slate-200 text-slate-700'}>
                              <tr>
                                <th className="p-2.5">Channel</th>
                                <th className="p-2.5">Active Users</th>
                                <th className="p-2.5 text-right">Revenue</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-white/5">
                              {queryResult.map((r, i) => (
                                <tr key={i} className="hover:bg-slate-500/10">
                                  <td className="p-2.5 font-bold text-amber-400">{r.channel}</td>
                                  <td className="p-2.5">{r.users}</td>
                                  <td className="p-2.5 text-right font-bold">{r.revenue}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className={`lg:col-span-5 p-7 rounded-3xl border shadow-2xl backdrop-blur-xl flex flex-col justify-between ${
                  theme === 'dark' ? 'bg-[#091024]/90 border-white/10' : 'bg-white border-slate-200'
                }`}>
                  <div>
                    <h3 className={`text-base font-black mb-1 ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>Database Schema & Tables</h3>
                    <p className="text-xs text-slate-400 mb-4">ตารางในฐานข้อมูล SQLite ปัจจุบัน (รวมตารางการเงิน)</p>
                    <div className="space-y-3 text-xs">
                      {[
                        { name: 'user_quotas', rows: 'Paywall Gate', size: '64 KB', type: 'Trial Control' },
                        { name: 'subscriptions', rows: 'Auto-tracked', size: '128 KB', type: 'Active SaaS' },
                        { name: 'payment_invoices', rows: 'Auto-tracked', size: '128 KB', type: 'Billing Logs' },
                        { name: 'transactions', rows: '1,000', size: '1.4 MB', type: 'Analytics' },
                      ].map((tbl, i) => (
                        <div key={i} className={`p-3.5 rounded-2xl border flex items-center justify-between transition ${
                          theme === 'dark' ? 'bg-white/[0.02] border-white/5 hover:bg-white/5' : 'bg-slate-50 border-slate-200 hover:bg-slate-100'
                        }`}>
                          <div className="flex items-center gap-3">
                            <span className="text-sky-400 font-mono text-sm">🗄️</span>
                            <div>
                              <p className={`font-bold ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>{tbl.name}</p>
                              <p className="text-[11px] text-slate-400 font-mono">{tbl.type} • {tbl.size}</p>
                            </div>
                          </div>
                          <span className="font-mono text-amber-400 font-bold">{tbl.rows}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-6 pt-4 border-t border-white/10 text-xs text-slate-400 flex justify-between items-center">
                    <span>Engine Mode: Direct I/O Read/Write</span>
                    <span className="text-emerald-400 font-bold">● Healthy</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB: การตั้งค่าระบบ (SETTINGS) */}
          {activeTab === 'settings' && (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className={`p-8 rounded-3xl border relative overflow-hidden shadow-2xl ${
                theme === 'dark' 
                  ? 'bg-gradient-to-r from-amber-500/20 via-[#0b1020] to-[#040816] border-amber-400/30' 
                  : 'bg-gradient-to-r from-amber-50 via-white to-amber-50 border-amber-200'
              }`}>
                <h2 className={`text-2xl font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>การตั้งค่าระบบและสภาพแวดล้อม (Settings Hub)</h2>
                <p className="text-sm text-slate-400 mt-1 max-w-3xl">
                  ปรับแต่งหน้าตาอินเทอร์เฟซ, จัดการธีม Dark / Light, กำหนดสิทธิ์การเชื่อมต่อ AI Model และ API Credentials
                </p>
              </div>

              <div className={`p-8 rounded-3xl border shadow-xl backdrop-blur-xl ${
                theme === 'dark' ? 'bg-[#091024]/80 border-white/10' : 'bg-white border-slate-200'
              }`}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-2xl bg-amber-400/10 border border-amber-400/30 flex items-center justify-center text-amber-400">
                    🎨
                  </div>
                  <div>
                    <h3 className={`text-base font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>ปรับแต่งธีมของระบบ (Appearance & Theme Mode)</h3>
                    <p className="text-xs text-slate-400">เลือกสไตล์โทนสีการแสดงผลที่เหมาะกับสภาพแวดล้อมการทำงานของคุณ</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  <div 
                    onClick={() => setTheme('dark')}
                    className={`p-6 rounded-3xl border-2 cursor-pointer transition relative overflow-hidden ${
                      theme === 'dark' 
                        ? 'border-amber-400 bg-[#040711] shadow-xl shadow-amber-400/10 scale-[1.02]' 
                        : 'border-transparent bg-slate-900 text-white opacity-60 hover:opacity-100'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-2.5">
                        <span className="text-xl">🌙</span>
                        <span className="font-black text-sm text-white">Dark Mode (Midnight Executive)</span>
                      </div>
                      {theme === 'dark' && <span className="text-xs font-bold text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full border border-amber-400/30">● ใช้งานอยู่</span>}
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      โทนสีกรมท่าลึกภูมิฐานระดับพรีเมียม ถนอมสายตาสำหรับผู้บริหารที่ต้องดูข้อมูลเชิงลึกและกราฟสถิติตลอดทั้งวัน
                    </p>
                  </div>

                  <div 
                    onClick={() => setTheme('light')}
                    className={`p-6 rounded-3xl border-2 cursor-pointer transition relative overflow-hidden ${
                      theme === 'light' 
                        ? 'border-amber-500 bg-white text-slate-900 shadow-xl shadow-amber-500/10 scale-[1.02]' 
                        : 'border-transparent bg-slate-100 text-slate-700 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-2.5">
                        <span className="text-xl">☀️</span>
                        <span className="font-black text-sm text-slate-900">Light Mode (Luxury Platinum)</span>
                      </div>
                      {theme === 'light' && <span className="text-xs font-bold text-amber-600 bg-amber-400/20 px-2.5 py-1 rounded-full border border-amber-500/30">● ใช้งานอยู่</span>}
                    </div>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      โทนสีขาวสว่างคมชัด สดใส สะอาดตา เหมาะสำหรับการนำเสนอแดชบอร์ดในห้องประชุมที่มีแสงสว่างชัดเจน
                    </p>
                  </div>
                </div>
              </div>

              {/* การจัดการแผนสมาชิก & บัตร */}
              <div className={`p-8 rounded-3xl border shadow-xl backdrop-blur-xl ${
                theme === 'dark' ? 'bg-[#091024]/80 border-white/10' : 'bg-white border-slate-200'
              }`}>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-400/10 border border-emerald-400/30 flex items-center justify-center text-emerald-400">
                      💳
                    </div>
                    <div>
                      <h3 className={`text-base font-black ${theme === 'dark' ? 'text-white' : 'text-slate-900'}`}>การผูกบัตรเครดิต & แผนสมาชิกปัจจุบัน</h3>
                      <p className="text-xs text-slate-400">จัดการข้อมูลบัตรเครดิตที่ใช้ตัดรอบบิลอัตโนมัติ</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setIsCheckoutOpen(true)}
                    className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black px-5 py-2.5 rounded-xl text-xs transition shadow-md"
                  >
                    เปลี่ยนบัตร / อัปเกรดแผน ↗
                  </button>
                </div>
              </div>

            </div>
          )}

        </main>
      </div>

    </div>
  );
}

export default App;