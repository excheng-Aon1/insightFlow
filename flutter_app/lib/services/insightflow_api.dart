import 'dart:convert';
import 'dart:typed_data';
import 'package:flutter/foundation.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';

/// บริการเชื่อมต่อ API กับเซิร์ฟเวอร์ FastAPI + PostgreSQL/SQLite QueuePool + Redis + JWT
/// ใช้ฐานข้อมูลชุดเดียวกับหน้าเว็บหลักและซิงค์ทุกหน้าต่างอัตโนมัติ
class InsightFlowApiService {
  static const String _tokenPrefsKey = 'insightflow_access_token';
  static const String _userPrefsKey = 'insightflow_user_profile';

  /// กำหนด Base URL ของ Backend อัตโนมัติ (รองรับ iOS, macOS, Web และ Android Emulator)
  static String get baseUrl {
    if (kIsWeb) {
      return 'http://127.0.0.1:8000';
    }
    if (defaultTargetPlatform == TargetPlatform.android) {
      return 'http://10.0.2.2:8000';
    }
    return 'http://127.0.0.1:8000';
  }

  String? _accessToken;
  Map<String, dynamic>? _currentUser;

  String? get accessToken => _accessToken;
  Map<String, dynamic>? get currentUser => _currentUser;

  Future<void> loadSavedSession() async {
    final prefs = await SharedPreferences.getInstance();
    _accessToken = prefs.getString(_tokenPrefsKey);
    final rawUser = prefs.getString(_userPrefsKey);
    if (rawUser != null && rawUser.isNotEmpty) {
      try {
        _currentUser = jsonDecode(rawUser) as Map<String, dynamic>;
      } catch (_) {}
    }
    if (_accessToken == null || _accessToken!.isEmpty) {
      await loginAsExecutiveDemo();
    }
  }

  Future<void> saveSession(String token, Map<String, dynamic> user) async {
    _accessToken = token;
    _currentUser = user;
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString(_tokenPrefsKey, token);
    await prefs.setString(_userPrefsKey, jsonEncode(user));
  }

  Future<void> logout() async {
    _accessToken = null;
    _currentUser = null;
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove(_tokenPrefsKey);
    await prefs.remove(_userPrefsKey);
  }

  Map<String, String> _headers({bool jsonBody = true}) {
    final headers = <String, String>{};
    if (jsonBody) {
      headers['Content-Type'] = 'application/json';
    }
    if (_accessToken != null && _accessToken!.isEmpty == false) {
      headers['Authorization'] = 'Bearer $_accessToken';
    }
    return headers;
  }

  /// เข้าสู่ระบบด้วยบัญชีผู้บริหารเริ่มต้น (หรือบัญชีของผู้ใช้) เพื่อรับ JWT Token
  Future<bool> loginAsExecutiveDemo({
    String email = 'pongsatorn.nan@gmail.com',
    String name = 'pongsatorn.nan',
  }) async {
    try {
      final res = await http.post(
        Uri.parse('$baseUrl/api/auth/token'),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'email': email,
          'name': name,
          'role': 'admin',
        }),
      );
      if (res.statusCode == 200) {
        final data = jsonDecode(utf8.decode(res.bodyBytes));
        final token = data['access_token']?.toString() ?? '';
        final userObj = (data['user'] as Map<String, dynamic>?) ??
            {'email': email, 'name': name, 'role': 'admin'};
        if (token.isNotEmpty) {
          await saveSession(token, userObj);
          return true;
        }
      }
    } catch (_) {}
    return false;
  }

  /// ขอรับรหัส OTP 6 หลักผ่าน Redis TTL (จำกัด 3 ครั้ง / 5 นาทีด้วย SlowAPI)
  Future<Map<String, dynamic>> sendOtp(String email) async {
    final res = await http.post(
      Uri.parse('$baseUrl/api/auth/send-otp'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'email': email}),
    );
    return jsonDecode(utf8.decode(res.bodyBytes)) as Map<String, dynamic>;
  }

  /// ยืนยันรหัส OTP 6 หลักและรับ JWT Access Token
  Future<Map<String, dynamic>> verifyOtp({
    required String email,
    required String otp,
    required String name,
  }) async {
    final res = await http.post(
      Uri.parse('$baseUrl/api/auth/verify-otp'),
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({'email': email, 'otp': otp, 'name': name}),
    );
    final data = jsonDecode(utf8.decode(res.bodyBytes)) as Map<String, dynamic>;
    if (res.statusCode == 200 && data['access_token'] != null) {
      await saveSession(
        data['access_token'].toString(),
        (data['user'] as Map<String, dynamic>?) ??
            {'email': email, 'name': name},
      );
    }
    return data;
  }

  /// ดึงข้อมูลซิงค์อัตโนมัติครบทุกหน้าต่าง (ภาพรวมระบบ <-> ทราฟฟิกสด <-> AI <-> รายรับ-รายจ่าย <-> คลังสินค้า <-> ไฟล์ที่อัปโหลด)
  Future<Map<String, dynamic>> fetchUnifiedState() async {
    final res = await http.get(
      Uri.parse('$baseUrl/api/system/unified-state'),
      headers: _headers(),
    );
    if (res.statusCode == 200) {
      return jsonDecode(utf8.decode(res.bodyBytes)) as Map<String, dynamic>;
    }
    throw Exception('ไม่สามารถซิงค์สถานะระบบได้ (${res.statusCode})');
  }

  /// อัปโหลดไฟล์ (.csv / .xlsx / .xls) เข้าคิวงานเบื้องหลัง FastAPI BackgroundTasks
  Future<Map<String, dynamic>> uploadDatasetFile({
    required String endpoint, // '/api/analysis/upload' | '/api/cashflow/upload' | '/api/inventory/upload'
    required Uint8List fileBytes,
    required String filename,
  }) async {
    final req = http.MultipartRequest('POST', Uri.parse('$baseUrl$endpoint'));
    if (_accessToken != null && _accessToken!.isNotEmpty) {
      req.headers['Authorization'] = 'Bearer $_accessToken';
    }
    req.files.add(
      http.MultipartFile.fromBytes(
        'file',
        fileBytes,
        filename: filename,
      ),
    );
    final streamed = await req.send();
    final res = await http.Response.fromStream(streamed);
    return jsonDecode(utf8.decode(res.bodyBytes)) as Map<String, dynamic>;
  }

  /// ตรวจสอบความคืบหน้าของคิวงานเบื้องหลัง (Background Job Status)
  Future<Map<String, dynamic>> getJobStatus(String jobId) async {
    final res = await http.get(
      Uri.parse('$baseUrl/api/jobs/${Uri.encodeComponent(jobId)}'),
      headers: _headers(),
    );
    return jsonDecode(utf8.decode(res.bodyBytes)) as Map<String, dynamic>;
  }

  /// ดึงรายละเอียดไฟล์ที่อัปโหลดพร้อมตารางตัวอย่างข้อมูล (columns & preview_rows)
  Future<Map<String, dynamic>> getUploadedFileDetail(String fileId) async {
    final res = await http.get(
      Uri.parse('$baseUrl/api/files/${Uri.encodeComponent(fileId)}'),
      headers: _headers(),
    );
    return jsonDecode(utf8.decode(res.bodyBytes)) as Map<String, dynamic>;
  }

  /// ลบไฟล์ที่ผู้ใช้อัปโหลดของตัวเอง พร้อมลบข้อมูลที่ซิงก์มาจากไฟล์นั้นและอัปเดตทุกหน้าต่าง
  Future<Map<String, dynamic>> deleteUploadedFile(String fileId) async {
    final res = await http.delete(
      Uri.parse('$baseUrl/api/files/${Uri.encodeComponent(fileId)}'),
      headers: _headers(),
    );
    return jsonDecode(utf8.decode(res.bodyBytes)) as Map<String, dynamic>;
  }

  /// ลบไฟล์ทั้งหมดที่ผู้ใช้คนปัจจุบันเป็นผู้อัปโหลด
  Future<Map<String, dynamic>> deleteAllMyUploadedFiles() async {
    final res = await http.delete(
      Uri.parse('$baseUrl/api/files'),
      headers: _headers(),
    );
    return jsonDecode(utf8.decode(res.bodyBytes)) as Map<String, dynamic>;
  }

  /// บันทึกรายการรายรับ-รายจ่ายใหม่ พร้อมซิงค์เข้าสู่ทุกหน้าต่างอัตโนมัติ
  Future<Map<String, dynamic>> addCashFlowTransaction({
    required String title,
    required double amount,
    required String type,
    required String category,
    String note = '',
  }) async {
    final nowDate = DateTime.now().toIso8601String().split('T').first;
    final res = await http.post(
      Uri.parse('$baseUrl/api/cashflow/transactions'),
      headers: _headers(),
      body: jsonEncode({
        'id': 'CF-FLT-${DateTime.now().millisecondsSinceEpoch.toString().substring(8)}',
        'user_id': _currentUser?['email'] ?? 'pongsatorn.nan@gmail.com',
        'date': nowDate,
        'title': title,
        'category': category,
        'type': type,
        'amount': amount,
        'note': note.isEmpty ? 'บันทึกผ่านแอป Flutter InsightFlow' : note,
      }),
    );
    return jsonDecode(utf8.decode(res.bodyBytes)) as Map<String, dynamic>;
  }

  /// ปรับปรุงหรือเติมสต็อกสินค้าตามคำแนะนำของ AI พร้อมซิงค์งบการเงินและภาพรวมระบบ
  Future<Map<String, dynamic>> adjustInventoryStock({
    required String skuCode,
    required int delta,
  }) async {
    final res = await http.post(
      Uri.parse('$baseUrl/api/inventory/adjust'),
      headers: _headers(),
      body: jsonEncode({
        'sku_code': skuCode,
        'delta': delta,
      }),
    );
    return jsonDecode(utf8.decode(res.bodyBytes)) as Map<String, dynamic>;
  }

  /// สั่งให้ AI วิเคราะห์สรุปผลผู้บริหารใหม่จากข้อมูลล่าสุดในฐานข้อมูล
  Future<Map<String, dynamic>> refreshAiSummary() async {
    final res = await http.post(
      Uri.parse('$baseUrl/api/ai/summary'),
      headers: _headers(),
      body: jsonEncode({'data_context': 'Flutter Executive Mobile App'}),
    );
    return jsonDecode(utf8.decode(res.bodyBytes)) as Map<String, dynamic>;
  }
}

