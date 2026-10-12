import re

file_path = "src/App.jsx"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Add Motion state and handlers
state_target = "  const [theme, setTheme] = useState('dark');"
state_replacement = """  const [theme, setTheme] = useState('dark');

  // Motion Animation Control State สำหรับหน้า ภาพรวมระบบ (Overview)
  const [motionKey, setMotionKey] = useState(0);
  const [motionSpeed, setMotionSpeed] = useState('smooth'); // 'smooth' | 'cinematic' | 'hyper'
  const [isMotionRunning, setIsMotionRunning] = useState(false);
  const [animatedRevenue, setAnimatedRevenue] = useState(4829000);
  const [animatedUsers, setAnimatedUsers] = useState(3842);
  const [animatedConversion, setAnimatedConversion] = useState(6.84);
  const [animatedLatency, setAnimatedLatency] = useState(2);

  const triggerMotionReplay = (speedOverride) => {
    const activeSpeed = speedOverride || motionSpeed;
    setIsMotionRunning(true);
    setMotionKey(prev => prev + 1);

    const duration = activeSpeed === 'hyper' ? 700 : activeSpeed === 'cinematic' ? 2600 : 1600;
    const startTime = performance.now();

    const targetRevenue = 4829000;
    const targetUsers = 3842;
    const targetConversion = 6.84;
    const targetLatency = 2;

    const easeOutQuart = (x) => 1 - Math.pow(1 - x, 4);

    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutQuart(progress);

      setAnimatedRevenue(Math.round(targetRevenue * eased));
      setAnimatedUsers(Math.round(targetUsers * eased));
      setAnimatedConversion(Number((targetConversion * eased).toFixed(2)));
      setAnimatedLatency(Math.max(2, Math.round(48 - (46 * eased))));

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        setIsMotionRunning(false);
      }
    };

    requestAnimationFrame(step);
    toast.success('🎬 Motion Animation: เร่งการเคลื่อนไหวสมบูรณ์แบบ 60 FPS');
  };

  useEffect(() => {
    if (activeTab === 'overview') {
      triggerMotionReplay();
    }
  }, [activeTab]);"""

if "const [motionKey, setMotionKey]" not in content:
    content = content.replace(state_target, state_replacement)

# 2. Update chart options to be motion-aware
old_line_options = """  const lineChartOptions = {
    responsive: true,
    animation: {
      duration: 2200,
      easing: 'easeOutQuart',
      delay: (context) => context.dataIndex * 80,
    },
    maintainAspectRatio: false,"""

new_line_options = """  const getMotionDuration = () => {
    if (motionSpeed === 'hyper') return 700;
    if (motionSpeed === 'cinematic') return 2800;
    return 1800;
  };

  const lineChartOptions = {
    responsive: true,
    animation: {
      duration: getMotionDuration(),
      easing: 'easeOutQuart',
      delay: (context) => context.dataIndex * (motionSpeed === 'hyper' ? 25 : motionSpeed === 'cinematic' ? 120 : 65),
    },
    maintainAspectRatio: false,"""

if "const getMotionDuration" not in content and old_line_options in content:
    content = content.replace(old_line_options, new_line_options)

old_bar_options = """  const barChartOptions = {
    responsive: true,
    animation: {
      duration: 1800,
      easing: 'easeOutQuart',
      delay: (context) => context.dataIndex * 150,
    },
    maintainAspectRatio: false,"""

new_bar_options = """  const barChartOptions = {
    responsive: true,
    animation: {
      duration: getMotionDuration(),
      easing: 'easeOutQuart',
      delay: (context) => context.dataIndex * (motionSpeed === 'hyper' ? 40 : motionSpeed === 'cinematic' ? 180 : 110),
    },
    maintainAspectRatio: false,"""

if old_bar_options in content:
    content = content.replace(old_bar_options, new_bar_options)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Part 1: State and Chart Options updated successfully.")

