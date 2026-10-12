import re

file_path = "src/App.jsx"

with open(file_path, "r", encoding="utf-8") as f:
    content = f.read()

# Patch lineChartOptions
old_line = """  const lineChartOptions = {
    responsive: true,"""

new_line = """  const lineChartOptions = {
    responsive: true,
    animation: {
      duration: 2200,
      easing: 'easeOutQuart',
      delay: (context) => context.dataIndex * 80,
    },"""
content = content.replace(old_line, new_line)

# Patch barChartOptions
old_bar = """  const barChartOptions = {
    responsive: true,"""

new_bar = """  const barChartOptions = {
    responsive: true,
    animation: {
      duration: 1800,
      easing: 'easeOutQuart',
      delay: (context) => context.dataIndex * 150,
    },"""
content = content.replace(old_bar, new_bar)

# Patch Doughnut inline
old_doughnut = "options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }}"
new_doughnut = "options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, animation: { animateScale: true, animateRotate: true, duration: 2500, easing: 'easeOutExpo' } }}"
content = content.replace(old_doughnut, new_doughnut)

with open(file_path, "w", encoding="utf-8") as f:
    f.write(content)

print("Animations added successfully.")

