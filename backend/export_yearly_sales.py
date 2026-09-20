import csv

# ข้อมูลสรุปยอดขายรายปี (Yearly Performance Summary)
headers = [
    "Year (ปี)",
    "Total Revenue (รายได้รวม THB)",
    "Gross Profit (กำไรขั้นต้น THB)",
    "Total Orders (จำนวนออเดอร์)",
    "Avg Order Value - AOV (บาท/ออเดอร์)",
    "Growth Rate YoY (%)",
    "Top Channel (ช่องทางเด่น)",
    "Conversion Rate (%)"
]

rows = [
    [2023, 38250000.00, 15300000.00, 28400, 1346.83, 0.00, "Google Search", 5.40],
    [2024, 44800000.00, 18816000.00, 31500, 1422.22, 17.12, "Affiliate Marketing", 6.10],
    [2025, 52600000.00, 22618000.00, 35200, 1494.32, 17.41, "Affiliate Marketing", 6.84],
    [2026, 61950000.00, 27258000.00, 39800, 1556.53, 17.78, "Affiliate & Direct", 7.35]
]

filename = "insightflow_yearly_sales_summary.csv"

# บันทึกไฟล์พร้อมใส่ BOM (\ufeff) เพื่อให้ภาษาไทยใน Excel แสดงผลถูกต้องไม่เป็นภาษาต่างดาว
with open(filename, mode="w", newline="", encoding="utf-8-sig") as f:
    writer = csv.writer(f)
    writer.writerow(headers)
    writer.writerows(rows)

print("--------------------------------------------------")
print(" บันทึกไฟล์สรุปยอดขายสำเร็จเรียบร้อย!")
print(f" ชื่อไฟล์: {filename}")
print(" สามารถดับเบิลคลิกเปิดไฟล์นี้ใน Excel เพื่อทำสไลด์ได้ทันที")
print("--------------------------------------------------")