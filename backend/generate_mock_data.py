import pandas as pd
import random

# ตั้งค่า Seed เพื่อให้ข้อมูลสุ่มได้มาตรฐานสมจริง
random.seed(42)

first_names = [
    "Somchai", "Somsak", "Wichai", "Nattapong", "Kittipong", "Anan", "Chaiwat", "Prasert",
    "Siriporn", "Supaporn", "Kanya", "Waraporn", "Prapai", "Rattana", "Malee", "Sunee",
    "John", "Alex", "David", "Michael", "Sarah", "Emily", "Jessica", "James", "Robert",
    "Pongsak", "Thanawat", "Patchara", "Apinya", "Jirayu", "Nutthida", "Worawat"
]

last_names = [
    "Suksom", "Rattanakul", "Chaiwong", "Petchcharat", "Boonma", "Saetang", "Wongsuwan",
    "Smith", "Johnson", "Williams", "Brown", "Miller", "Davis", "Wilson", "Taylor",
    "Thanasuk", "Vongpradit", "Ruangrit", "Jaroensuk", "Nantakong", "Kiatnarong"
]

channels = ["Google Search", "Social Ads", "Email Mkt", "Affiliate", "Direct"]
channel_weights = [0.30, 0.35, 0.15, 0.12, 0.08]

devices = ["Desktop", "Mobile Web", "iOS App", "Android App"]
device_weights = [0.45, 0.30, 0.15, 0.10]

data = []

for i in range(1, 1001):
    cust_id = f"CUST-{i:04d}"
    cust_name = f"{random.choice(first_names)} {random.choice(last_names)}"
    channel = random.choices(channels, weights=channel_weights)[0]
    device = random.choices(devices, weights=device_weights)[0]
    
    # พฤติกรรมขึ้นอยู่กับช่องทาง
    pages = random.randint(1, 15)
    duration = pages * random.randint(20, 60) + random.randint(5, 50)
    
    # โอกาสซื้อ (Conversion) ถ้าดูหน้าเยอะ โอกาสซื้อจะสูงขึ้น
    conversion_prob = 0.15 if pages > 6 else 0.04
    if channel == "Affiliate" or channel == "Google Search":
        conversion_prob += 0.05

    converted = "Yes" if random.random() < conversion_prob else "No"
    
    if converted == "Yes":
        orders = random.choices([1, 2, 3, 4], weights=[0.70, 0.20, 0.07, 0.03])[0]
        revenue = round(orders * random.uniform(850, 4500), 2)
    else:
        orders = 0
        revenue = 0.0

    data.append({
        "customer_id": cust_id,
        "customer_name": cust_name,
        "channel": channel,
        "device": device,
        "session_duration_sec": duration,
        "pages_viewed": pages,
        "orders_count": orders,
        "total_revenue": revenue,
        "converted": converted
    })

# สร้าง DataFrame และบันทึกเป็นไฟล์ .csv
df = pd.DataFrame(data)
file_name = "insightflow_analytics_1000.csv"
df.to_csv(file_name, index=False, encoding='utf-8-sig')

print(f"✅ สร้างไฟล์สำเร็จ: {file_name}")
print(f"📊 สรุปภาพรวม:")
print(f"- ข้อมูลทั้งหมด: {len(df)} แถว")
print(f"- ยอดขายรวม: ฿ {df['total_revenue'].sum():,.2f}")
print(f"- อัตราการซื้อ (Conversion Rate): {(len(df[df['converted']=='Yes']) / len(df))*100:.2f}%")