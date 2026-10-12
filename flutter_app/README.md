# InsightFlow AI — Flutter Executive Application (`flutter_app/`)

แอปพลิเคชัน **Flutter (Dart)** สำหรับระบบ **InsightFlow AI** รองรับทั้ง **iOS, Android, macOS Desktop และ Web** โดยใช้โทนดีไซน์ **Luxury Midnight Obsidian & 24K Champagne Gold** เหมือนหน้าเว็บหลัก และเชื่อมต่อกับฐานข้อมูล **FastAPI + PostgreSQL/SQLite QueuePool + Redis + JWT** ตัวเดียวกันแบบเรียลไทม์ 100%

---

## โครงสร้างโปรเจกต์ Flutter (`flutter_app/`)
- `pubspec.yaml` — กำหนดแพ็กเกจหลัก (`http`, `file_picker`, `shared_preferences`, `intl`, `cupertino_icons`)
- `lib/main.dart` — หน้าจอหลักของแอป Flutter ครบทั้ง 6 หมวดหมู่ (`ภาพรวมระบบ`, `ทราฟฟิกสด`, `AI วิเคราะห์`, `รายรับ-รายจ่าย`, `คลังสินค้า & AI สต็อก`, `ไฟล์ที่อัปโหลดของฉัน`) พร้อมกราฟ `CustomPainter` และระบบแจ้งเตือนคิวงานเบื้องหลัง (`BackgroundTasks`)
- `lib/services/insightflow_api.dart` — เซอร์วิสเชื่อมต่อ API กับเซิร์ฟเวอร์ FastAPI (`http://127.0.0.1:8000` สำหรับ iOS/macOS/Web และ `http://10.0.2.2:8000` สำหรับ Android Emulator)
- `lib/theme/luxury_theme.dart` — ระบบธีมสี Midnight & 24K Gold (`InsightFlowTheme`), การ์ดกระจก `LuxuryCard`, และโลโก้เวกเตอร์ `InsightFlowLogo`

---

## วิธีรันแอปพลิเคชัน Flutter
1. ติดตั้ง Flutter SDK บน macOS (หากยังไม่ได้ติดตั้ง):
   ```bash
   brew install --cask flutter
   ```
2. ดึงแพ็กเกจและสร้างไฟล์แพลตฟอร์มในโฟลเดอร์ `flutter_app`:
   ```bash
   cd flutter_app
   flutter create .
   flutter pub get
   ```
3. รันแอปพลิเคชัน (ขณะที่เซิร์ฟเวอร์ Backend พอร์ต `8000` เปิดทำงานอยู่):
   ```bash
   # รันบน iOS Simulator หรือ Android Emulator
   flutter run

   # รันเป็นแอป Desktop บน macOS
   flutter run -d macos

   # รันบน Chrome
   flutter run -d chrome
   ```

