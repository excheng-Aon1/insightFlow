file_path = "src/App.jsx"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# 1. Fix isMotionRunning in KPI card
old_kpi_text = "${isMotionRunning ? 'text-amber-400' : ''}"
content = content.replace(f" {old_kpi_text}", "")

# 2. Fix Line chart key
content = content.replace("key={`line-chart-${motionKey}-${motionSpeed}`} ", "")

# 3. Fix Doughnut chart
old_doughnut_block = """                      <Doughnut
                        key={`doughnut-chart-${motionKey}-${motionSpeed}`}
                        data={doughnutData}
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          plugins: { legend: { display: false } },
                          animation: {
                            animateScale: true,
                            animateRotate: true,
                            duration: getMotionDuration() + 400,
                            easing: 'easeOutExpo'
                          }
                        }}
                      />"""

new_doughnut_block = """                      <Doughnut
                        data={doughnutData}
                        options={{
                          responsive: true,
                          maintainAspectRatio: false,
                          plugins: { legend: { display: false } },
                          animation: { duration: 1000 }
                        }}
                      />"""

content = content.replace(old_doughnut_block, new_doughnut_block)

# 4. Fix Bar chart key
content = content.replace("key={`bar-chart-${motionKey}-${motionSpeed}`} ", "")

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Dangling motion variables cleaned successfully.")

