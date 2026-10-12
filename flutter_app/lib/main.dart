import 'dart:async';
import 'package:file_picker/file_picker.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';

import 'services/insightflow_api.dart';
import 'theme/luxury_theme.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const InsightFlowFlutterApp());
}

class InsightFlowFlutterApp extends StatelessWidget {
  const InsightFlowFlutterApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'InsightFlow AI — Executive App',
      debugShowCheckedModeBanner: false,
      theme: InsightFlowTheme.darkLuxuryTheme,
      home: const ExecutiveDashboardScreen(),
    );
  }
}

class ExecutiveDashboardScreen extends StatefulWidget {
  const ExecutiveDashboardScreen({super.key});

  @override
  State<ExecutiveDashboardScreen> createState() =>
      _ExecutiveDashboardScreenState();
}

class _ExecutiveDashboardScreenState extends State<ExecutiveDashboardScreen> {
  final InsightFlowApiService _api = InsightFlowApiService();
  final NumberFormat _numFmt = NumberFormat('#,##0');

  int _selectedIndex = 0;
  bool _isSyncing = false;
  String _lastSyncedAt = '--:--:--';

  // ข้อมูลซิงค์เชื่อมโยงอัตโนมัติทั้ง 5 หน้าต่าง (เริ่มต้นที่ 0 เมื่อยังไม่มีข้อมูล)
  double _totalIncome = 0;
  double _totalExpense = 0;
  double _netBalance = 0;
  int _activeRecords = 0;
  String _conversionRate = '0.00%';
  double _latencyMs = 0;
  String _modelAccuracy = '0.0%';
  List<double> _trafficSeries = [0, 0, 0, 0, 0, 0, 0];
  List<double> _aiTargetSeries = [0, 0, 0, 0, 0, 0, 0];

  int _throughputRps = 0;
  int _activeNodes = 0;
  int _totalNodes = 4;
  List<double> _waveform = [0, 0, 0, 0, 0, 0, 0];

  Map<String, dynamic> _aiSummary = {
    'performance':
        '• รายได้รวมเติบโต +0.0% MoM แตะระดับ ฿0\n• จำนวนรายการที่วิเคราะห์: 0 รายการ (รอการอัปโหลดไฟล์ข้อมูล)',
    'risks': '• ความเสี่ยงที่ตรวจพบ: 0 รายการ\n• อัตราความผิดปกติของข้อมูล: 0.0%',
    'actions':
        '• แผนปฏิบัติการ: 0 รายการ\n• กรุณาอัปโหลดไฟล์ .csv หรือ .xlsx เพื่อให้ AI ประมวลผลกลยุทธ์',
  };

  List<Map<String, dynamic>> _cashFlowRecords = [];
  List<Map<String, dynamic>> _products = [];
  Map<String, dynamic> _aiRestock = {
    'summary': {
      'total_skus': 0,
      'critical_count': 0,
      'warning_count': 0,
      'healthy_count': 0,
      'total_valuation': 0,
    },
    'restock_recommendations': [],
  };
  List<Map<String, dynamic>> _uploadedFiles = [];
  Map<String, dynamic> _telemetry = {};

  // คิวงานเบื้องหลัง (BackgroundTasks Status)
  Map<String, dynamic>? _activeBgJob;
  Timer? _syncTimer;

  @override
  void initState() {
    super.initState();
    _initializeApp();
  }

  @override
  void dispose() {
    _syncTimer?.cancel();
    super.dispose();
  }

  Future<void> _initializeApp() async {
    await _api.loadSavedSession();
    await _syncUnifiedState();
    _syncTimer = Timer.periodic(const Duration(seconds: 12), (_) {
      _syncUnifiedState(silent: true);
    });
  }

  Future<void> _syncUnifiedState({bool silent = false}) async {
    if (!silent && mounted) {
      setState(() => _isSyncing = true);
    }
    try {
      final data = await _api.fetchUnifiedState();
      _applyUnifiedPayload(data);
    } catch (_) {
      // กรณีออฟไลน์ชั่วคราว คงค่าปัจจุบันไว้
    } finally {
      if (!silent && mounted) {
        setState(() => _isSyncing = false);
      }
    }
  }

  void _applyUnifiedPayload(Map<String, dynamic> data) {
    if (!mounted) return;
    setState(() {
      _lastSyncedAt = data['synced_at']?.toString() ?? _lastSyncedAt;

      final ov = data['overview'] as Map<String, dynamic>? ?? {};
      _totalIncome = (ov['total_revenue'] as num?)?.toDouble() ?? 0.0;
      _activeRecords = (ov['active_records'] as num?)?.toInt() ?? 0;
      _conversionRate = ov['conversion_rate']?.toString() ?? '0.00%';
      _latencyMs = (ov['latency_ms'] as num?)?.toDouble() ?? 0.0;
      _modelAccuracy = ov['model_accuracy']?.toString() ?? '0.0%';
      _trafficSeries = ((ov['traffic_series'] as List?) ?? [0, 0, 0, 0, 0, 0, 0])
          .map((e) => (e as num).toDouble())
          .toList();
      _aiTargetSeries =
          ((ov['ai_target_series'] as List?) ?? [0, 0, 0, 0, 0, 0, 0])
              .map((e) => (e as num).toDouble())
              .toList();

      final lp = data['live_pulse'] as Map<String, dynamic>? ?? {};
      _throughputRps = (lp['throughput_rps'] as num?)?.toInt() ?? 0;
      _activeNodes = (lp['active_nodes'] as num?)?.toInt() ?? 0;
      _totalNodes = (lp['total_nodes'] as num?)?.toInt() ?? 4;
      _waveform = ((lp['waveform'] as List?) ?? [0, 0, 0, 0, 0, 0, 0])
          .map((e) => (e as num).toDouble())
          .toList();

      final ai = data['ai_insights'] as Map<String, dynamic>? ?? {};
      if (ai['summary'] is Map<String, dynamic>) {
        _aiSummary = Map<String, dynamic>.from(ai['summary']);
      }

      final cf = data['cashflow'] as Map<String, dynamic>? ?? {};
      _totalIncome = (cf['total_income'] as num?)?.toDouble() ?? _totalIncome;
      _totalExpense = (cf['total_expense'] as num?)?.toDouble() ?? 0.0;
      _netBalance = (cf['net_balance'] as num?)?.toDouble() ?? 0.0;
      _cashFlowRecords = ((cf['records'] as List?) ?? [])
          .map((e) => Map<String, dynamic>.from(e as Map))
          .toList();

      final inv = data['inventory'] as Map<String, dynamic>? ?? {};
      _products = ((inv['products'] as List?) ?? [])
          .map((e) => Map<String, dynamic>.from(e as Map))
          .toList();
      if (inv['ai_restock'] is Map<String, dynamic>) {
        _aiRestock = Map<String, dynamic>.from(inv['ai_restock']);
      }

      _uploadedFiles = ((data['uploaded_files'] as List?) ?? [])
          .map((e) => Map<String, dynamic>.from(e as Map))
          .toList();

      if (data['telemetry'] is Map<String, dynamic>) {
        _telemetry = Map<String, dynamic>.from(data['telemetry']);
      }
    });
  }

  /// เลือกไฟล์ .csv / .xlsx และส่งเข้าคิวงานเบื้องหลัง (FastAPI BackgroundTasks)
  Future<void> _pickAndUploadFile(String endpoint, String label) async {
    final result = await FilePicker.platform.pickFiles(
      type: FileType.custom,
      allowedExtensions: ['csv', 'xlsx', 'xls', 'txt'],
      withData: true,
    );
    if (result == null || result.files.isEmpty) return;
    final picked = result.files.first;
    if (picked.bytes == null) return;

    setState(() {
      _activeBgJob = {
        'job_id': 'QUEUEING...',
        'filename': picked.name,
        'status': 'PROCESSING',
        'progress': 18,
        'stage': 'กำลังส่งไฟล์ $label เข้าคิวงานเบื้องหลัง...',
      };
    });

    try {
      final res = await _api.uploadDatasetFile(
        endpoint: endpoint,
        fileBytes: picked.bytes!,
        filename: picked.name,
      );
      final jobId = res['job_id']?.toString();
      if (jobId != null && jobId.isNotEmpty) {
        _pollBackgroundJob(jobId, picked.name);
      } else {
        await _syncUnifiedState();
        setState(() => _activeBgJob = null);
      }
    } catch (e) {
      setState(() => _activeBgJob = null);
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            backgroundColor: InsightFlowColors.roseAccent,
            content: Text('อัปโหลดไฟล์ไม่สำเร็จ: $e'),
          ),
        );
      }
    }
  }

  void _pollBackgroundJob(String jobId, String filename) {
    int attempts = 0;
    Timer.periodic(const Duration(milliseconds: 400), (timer) async {
      attempts++;
      try {
        final data = await _api.getJobStatus(jobId);
        final job = (data['job'] as Map<String, dynamic>?) ?? data;
        if (!mounted) {
          timer.cancel();
          return;
        }
        setState(() {
          _activeBgJob = {
            'job_id': jobId,
            'filename': filename,
            'status': job['status'] ?? 'PROCESSING',
            'progress': (job['progress'] as num?)?.toInt() ?? 50,
            'stage': job['stage'] ?? 'กำลังสกัดข้อมูลและซิงค์ลงฐานข้อมูล...',
          };
        });

        final status = job['status']?.toString().toUpperCase() ?? '';
        if (status == 'COMPLETED' || status == 'FAILED' || attempts > 60) {
          timer.cancel();
          await _syncUnifiedState();
          Future.delayed(const Duration(seconds: 3), () {
            if (mounted) setState(() => _activeBgJob = null);
          });
        }
      } catch (_) {
        if (attempts > 60) timer.cancel();
      }
    });
  }

  /// เปิดดูตารางข้อมูลตัวอย่างภายในไฟล์ที่ผู้ใช้อัปโหลด (Modal Bottom Sheet)
  Future<void> _showFilePreviewSheet(Map<String, dynamic> fileItem) async {
    Map<String, dynamic> detail = fileItem;
    try {
      final res = await _api.getUploadedFileDetail(fileItem['id'].toString());
      if (res['file'] is Map<String, dynamic>) {
        detail = Map<String, dynamic>.from(res['file']);
      }
    } catch (_) {}

    if (!mounted) return;
    final columns = ((detail['columns'] as List?) ?? [])
        .map((e) => e.toString())
        .toList();
    final rows = ((detail['preview_rows'] as List?) ?? [])
        .map((e) => Map<String, dynamic>.from(e as Map))
        .toList();

    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: InsightFlowColors.cardNavy,
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.vertical(top: Radius.circular(28)),
      ),
      builder: (ctx) {
        final effectiveCols = columns.isNotEmpty
            ? columns
            : (rows.isNotEmpty ? rows.first.keys.toList() : <String>[]);
        return DraggableScrollableSheet(
          expand: false,
          initialChildSize: 0.78,
          maxChildSize: 0.94,
          minChildSize: 0.5,
          builder: (_, scrollController) {
            return Padding(
              padding: const EdgeInsets.all(20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      const Icon(Icons.table_chart_rounded,
                          color: InsightFlowColors.goldPrimary),
                      const SizedBox(width: 10),
                      Expanded(
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text(
                              detail['filename']?.toString() ?? 'ข้อมูลไฟล์',
                              style: const TextStyle(
                                fontSize: 16,
                                fontWeight: FontWeight.w900,
                                color: Colors.white,
                              ),
                            ),
                            Text(
                              'หมวด: ${detail['source_tab']} • ${_numFmt.format(detail['total_records'] ?? 0)} รายการ • ${detail['created_at']}',
                              style: const TextStyle(
                                fontSize: 11,
                                color: InsightFlowColors.textSecondary,
                              ),
                            ),
                          ],
                        ),
                      ),
                      IconButton(
                        onPressed: () => Navigator.pop(ctx),
                        icon: const Icon(Icons.close, color: Colors.white70),
                      ),
                    ],
                  ),
                  const Divider(color: Colors.white12, height: 24),
                  Expanded(
                    child: rows.isEmpty
                        ? const Center(
                            child: Text(
                              'ไม่มีตารางตัวอย่างข้อมูลสำหรับไฟล์นี้',
                              style: TextStyle(
                                  color: InsightFlowColors.textSecondary),
                            ),
                          )
                        : SingleChildScrollView(
                            controller: scrollController,
                            scrollDirection: Axis.vertical,
                            child: SingleChildScrollView(
                              scrollDirection: Axis.horizontal,
                              child: DataTable(
                                headingRowColor: WidgetStateProperty.all(
                                  InsightFlowColors.goldPrimary
                                      .withOpacity(0.14),
                                ),
                                columns: [
                                  const DataColumn(
                                    label: Text('#',
                                        style: TextStyle(
                                            color:
                                                InsightFlowColors.goldPrimary,
                                            fontWeight: FontWeight.bold)),
                                  ),
                                  ...effectiveCols.map(
                                    (c) => DataColumn(
                                      label: Text(
                                        c,
                                        style: const TextStyle(
                                          color: InsightFlowColors.goldPrimary,
                                          fontWeight: FontWeight.bold,
                                        ),
                                      ),
                                    ),
                                  ),
                                ],
                                rows: List.generate(rows.length, (idx) {
                                  final r = rows[idx];
                                  return DataRow(
                                    cells: [
                                      DataCell(Text('${idx + 1}',
                                          style: const TextStyle(
                                              color: Colors.white54))),
                                      ...effectiveCols.map(
                                        (c) => DataCell(
                                          Text(
                                            '${r[c] ?? ''}',
                                            style: const TextStyle(
                                              color: Colors.white,
                                              fontSize: 12,
                                            ),
                                          ),
                                        ),
                                      ),
                                    ],
                                  );
                                }),
                              ),
                            ),
                          ),
                  ),
                  const SizedBox(height: 12),
                  SizedBox(
                    width: double.infinity,
                    child: ElevatedButton.icon(
                      style: ElevatedButton.styleFrom(
                        backgroundColor:
                            InsightFlowColors.roseAccent.withOpacity(0.2),
                        foregroundColor: InsightFlowColors.roseAccent,
                        padding: const EdgeInsets.symmetric(vertical: 14),
                        side: const BorderSide(
                            color: InsightFlowColors.roseAccent),
                      ),
                      onPressed: () async {
                        Navigator.pop(ctx);
                        await _confirmAndDeleteFile(detail);
                      },
                      icon: const Icon(Icons.delete_forever_rounded),
                      label: const Text(
                        'ลบไฟล์นี้และซิงค์ทุกหน้าต่างใหม่ทันที',
                        style: TextStyle(fontWeight: FontWeight.w800),
                      ),
                    ),
                  ),
                ],
              ),
            );
          },
        );
      },
    );
  }

  /// ยืนยันและลบไฟล์ที่ผู้ใช้อัปโหลดของตัวเอง พร้อมซิงค์ทุกหน้าต่างใหม่ทันที
  Future<void> _confirmAndDeleteFile(Map<String, dynamic> fileItem) async {
    final confirmed = await showDialog<bool>(
      context: context,
      builder: (ctx) => AlertDialog(
        backgroundColor: InsightFlowColors.cardNavy,
        title: const Text('🗑️ ยืนยันการลบไฟล์ของคุณ',
            style: TextStyle(color: Colors.white, fontWeight: FontWeight.w900)),
        content: Text(
          'ต้องการลบไฟล์ "${fileItem['filename']}" ใช่หรือไม่?\n\nระบบจะลบรายการข้อมูลที่นำเข้าจากไฟล์นี้ และอัปเดตตัวเลขทุกหน้าต่าง (ภาพรวมระบบ ↔ คลังสินค้า) อัตโนมัติ',
          style: const TextStyle(color: InsightFlowColors.textSecondary),
        ),
        actions: [
          TextButton(
            onPressed: () => Navigator.pop(ctx, false),
            child: const Text('ยกเลิก'),
          ),
          ElevatedButton(
            style: ElevatedButton.styleFrom(
              backgroundColor: InsightFlowColors.roseAccent,
              foregroundColor: Colors.white,
            ),
            onPressed: () => Navigator.pop(ctx, true),
            child: const Text('ยืนยันลบไฟล์'),
          ),
        ],
      ),
    );

    if (confirmed != true) return;
    try {
      final res = await _api.deleteUploadedFile(fileItem['id'].toString());
      if (res['unified_state'] is Map<String, dynamic>) {
        _applyUnifiedPayload(
            Map<String, dynamic>.from(res['unified_state'] as Map));
      } else {
        await _syncUnifiedState();
      }
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            backgroundColor: InsightFlowColors.emeraldAccent,
            content: Text(
                'ลบไฟล์ ${fileItem['filename']} และซิงค์ข้อมูลทุกหน้าต่างเรียบร้อยแล้ว'),
          ),
        );
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(
            backgroundColor: InsightFlowColors.roseAccent,
            content: Text('ไม่สามารถลบไฟล์ได้: $e'),
          ),
        );
      }
    }
  }

  /// เปิดหน้าต่างบันทึกรายรับ-รายจ่ายด่วน
  void _showAddTransactionDialog() {
    final titleCtrl = TextEditingController();
    final amountCtrl = TextEditingController();
    String txnType = 'income';

    showDialog(
      context: context,
      builder: (ctx) {
        return StatefulBuilder(
          builder: (ctx, setModalState) {
            return AlertDialog(
              backgroundColor: InsightFlowColors.cardNavy,
              title: const Text(
                '💰 บันทึกรายรับ-รายจ่ายใหม่',
                style:
                    TextStyle(color: Colors.white, fontWeight: FontWeight.w900),
              ),
              content: Column(
                mainAxisSize: MainAxisSize.min,
                children: [
                  Row(
                    children: [
                      Expanded(
                        child: ChoiceChip(
                          label: const Text('+ รายรับ (Income)'),
                          selected: txnType == 'income',
                          selectedColor:
                              InsightFlowColors.emeraldAccent.withOpacity(0.25),
                          onSelected: (_) =>
                              setModalState(() => txnType = 'income'),
                        ),
                      ),
                      const SizedBox(width: 8),
                      Expanded(
                        child: ChoiceChip(
                          label: const Text('- รายจ่าย (Expense)'),
                          selected: txnType == 'expense',
                          selectedColor:
                              InsightFlowColors.roseAccent.withOpacity(0.25),
                          onSelected: (_) =>
                              setModalState(() => txnType = 'expense'),
                        ),
                      ),
                    ],
                  ),
                  const SizedBox(height: 12),
                  TextField(
                    controller: titleCtrl,
                    style: const TextStyle(color: Colors.white),
                    decoration: const InputDecoration(
                      labelText: 'ชื่อรายการ',
                      border: OutlineInputBorder(),
                    ),
                  ),
                  const SizedBox(height: 12),
                  TextField(
                    controller: amountCtrl,
                    keyboardType: TextInputType.number,
                    style: const TextStyle(color: Colors.white),
                    decoration: const InputDecoration(
                      labelText: 'จำนวนเงิน (฿)',
                      border: OutlineInputBorder(),
                    ),
                  ),
                ],
              ),
              actions: [
                TextButton(
                  onPressed: () => Navigator.pop(ctx),
                  child: const Text('ยกเลิก'),
                ),
                ElevatedButton(
                  style: ElevatedButton.styleFrom(
                    backgroundColor: InsightFlowColors.goldPrimary,
                    foregroundColor: Colors.black,
                  ),
                  onPressed: () async {
                    final amt = double.tryParse(amountCtrl.text.trim()) ?? 0;
                    if (titleCtrl.text.trim().isEmpty || amt <= 0) return;
                    Navigator.pop(ctx);
                    await _api.addCashFlowTransaction(
                      title: titleCtrl.text.trim(),
                      amount: amt,
                      type: txnType,
                      category: txnType == 'income'
                          ? 'รายรับจากการขาย'
                          : 'ค่าใช้จ่ายดำเนินงาน',
                    );
                    await _syncUnifiedState();
                  },
                  child: const Text('บันทึกและซิงค์ทุกหน้าต่าง',
                      style: TextStyle(fontWeight: FontWeight.w900)),
                ),
              ],
            );
          },
        );
      },
    );
  }

  @override
  Widget build(BuildContext context) {
    final totalStockUnits = _products.fold<int>(
      0,
      (sum, item) => sum + ((item['stock'] as num?)?.toInt() ?? 0),
    );
    final totalStockValuation = _products.fold<double>(
      0.0,
      (sum, item) =>
          sum +
          (((item['stock'] as num?)?.toDouble() ?? 0.0) *
              ((item['price'] as num?)?.toDouble() ?? 0.0)),
    );

    return Scaffold(
      appBar: AppBar(
        toolbarHeight: 68,
        title: Row(
          children: [
            const InsightFlowLogo(size: 40),
            const SizedBox(width: 12),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Row(
                    children: [
                      const Text(
                        'Insight',
                        style: TextStyle(
                          fontWeight: FontWeight.w900,
                          fontSize: 18,
                          color: Colors.white,
                        ),
                      ),
                      const Text(
                        'Flow',
                        style: TextStyle(
                          fontWeight: FontWeight.w900,
                          fontSize: 18,
                          color: InsightFlowColors.goldPrimary,
                        ),
                      ),
                      const SizedBox(width: 8),
                      Container(
                        padding: const EdgeInsets.symmetric(
                            horizontal: 7, vertical: 2),
                        decoration: BoxDecoration(
                          color:
                              InsightFlowColors.emeraldAccent.withOpacity(0.16),
                          borderRadius: BorderRadius.circular(20),
                          border: Border.all(
                            color: InsightFlowColors.emeraldAccent
                                .withOpacity(0.4),
                          ),
                        ),
                        child: Text(
                          '● ซิงค์ $_lastSyncedAt',
                          style: const TextStyle(
                            fontSize: 10,
                            fontWeight: FontWeight.w800,
                            color: InsightFlowColors.emeraldAccent,
                          ),
                        ),
                      ),
                    ],
                  ),
                  const Text(
                    'Flutter Executive App • Auto-Sync ภาพรวมระบบ ↔ คลังสินค้า',
                    style: TextStyle(
                      fontSize: 11,
                      color: InsightFlowColors.textSecondary,
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
        actions: [
          TextButton.icon(
            onPressed: () => setState(() => _selectedIndex = 5),
            icon: const Icon(Icons.folder_open_rounded,
                size: 16, color: InsightFlowColors.skyAccent),
            label: Text(
              'ไฟล์ (${_uploadedFiles.length})',
              style: const TextStyle(
                color: InsightFlowColors.skyAccent,
                fontWeight: FontWeight.w800,
                fontSize: 12,
              ),
            ),
          ),
          IconButton(
            tooltip: 'ซิงค์ข้อมูลทุกหน้าต่างทันที',
            onPressed: () => _syncUnifiedState(),
            icon: _isSyncing
                ? const SizedBox(
                    width: 18,
                    height: 18,
                    child: CircularProgressIndicator(
                      strokeWidth: 2,
                      color: InsightFlowColors.goldPrimary,
                    ),
                  )
                : const Icon(Icons.sync_rounded,
                    color: InsightFlowColors.goldPrimary),
          ),
          const SizedBox(width: 6),
        ],
      ),
      body: Stack(
        children: [
          IndexedStack(
            index: _selectedIndex,
            children: [
              _buildOverviewTab(totalStockUnits, totalStockValuation),
              _buildLivePulseTab(),
              _buildAiInsightsTab(totalStockValuation),
              _buildCashFlowTab(),
              _buildInventoryTab(totalStockUnits, totalStockValuation),
              _buildMyUploadedFilesTab(),
            ],
          ),
          if (_activeBgJob != null) _buildFloatingBgJobCard(),
        ],
      ),
      bottomNavigationBar: NavigationBar(
        selectedIndex: _selectedIndex,
        onDestinationSelected: (idx) => setState(() => _selectedIndex = idx),
        destinations: [
          const NavigationDestination(
            icon: Icon(Icons.dashboard_outlined),
            selectedIcon:
                Icon(Icons.dashboard_rounded, color: InsightFlowColors.goldPrimary),
            label: 'ภาพรวมระบบ',
          ),
          const NavigationDestination(
            icon: Icon(Icons.timeline_outlined),
            selectedIcon:
                Icon(Icons.timeline_rounded, color: InsightFlowColors.goldPrimary),
            label: 'ทราฟฟิกสด',
          ),
          const NavigationDestination(
            icon: Icon(Icons.auto_awesome_outlined),
            selectedIcon: Icon(Icons.auto_awesome_rounded,
                color: InsightFlowColors.goldPrimary),
            label: 'AI วิเคราะห์',
          ),
          const NavigationDestination(
            icon: Icon(Icons.account_balance_wallet_outlined),
            selectedIcon: Icon(Icons.account_balance_wallet_rounded,
                color: InsightFlowColors.goldPrimary),
            label: 'รายรับ-จ่าย',
          ),
          const NavigationDestination(
            icon: Icon(Icons.inventory_2_outlined),
            selectedIcon: Icon(Icons.inventory_2_rounded,
                color: InsightFlowColors.goldPrimary),
            label: 'คลังสินค้า',
          ),
          NavigationDestination(
            icon: Badge(
              isLabelVisible: _uploadedFiles.isNotEmpty,
              label: Text('${_uploadedFiles.length}'),
              child: const Icon(Icons.folder_copy_outlined),
            ),
            selectedIcon: Badge(
              isLabelVisible: _uploadedFiles.isNotEmpty,
              label: Text('${_uploadedFiles.length}'),
              child: const Icon(Icons.folder_copy_rounded,
                  color: InsightFlowColors.goldPrimary),
            ),
            label: 'ไฟล์ของฉัน',
          ),
        ],
      ),
    );
  }

  /// การ์ดแจ้งเตือนคิวงานเบื้องหลัง (FastAPI BackgroundTasks / Celery + Redis Queue)
  Widget _buildFloatingBgJobCard() {
    final progress = (_activeBgJob?['progress'] as num?)?.toInt() ?? 25;
    return Positioned(
      left: 16,
      right: 16,
      bottom: 16,
      child: LuxuryCard(
        borderColor: InsightFlowColors.goldPrimary,
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  '⚡ คิวงานเบื้องหลัง (${_activeBgJob?['job_id']})',
                  style: const TextStyle(
                    color: InsightFlowColors.goldPrimary,
                    fontWeight: FontWeight.w900,
                    fontSize: 12,
                  ),
                ),
                Text(
                  '$progress%',
                  style: const TextStyle(
                    color: Colors.white,
                    fontWeight: FontWeight.w900,
                    fontSize: 12,
                  ),
                ),
              ],
            ),
            const SizedBox(height: 6),
            LinearProgressIndicator(
              value: (progress / 100.0).clamp(0.05, 1.0),
              backgroundColor: Colors.white12,
              color: InsightFlowColors.goldPrimary,
            ),
            const SizedBox(height: 6),
            Text(
              '${_activeBgJob?['filename']} • ${_activeBgJob?['stage']}',
              style: const TextStyle(
                color: InsightFlowColors.textSecondary,
                fontSize: 11,
              ),
            ),
          ],
        ),
      ),
    );
  }

  /// 1. หน้าต่าง ภาพรวมระบบ (Overview)
  Widget _buildOverviewTab(int totalStockUnits, double totalStockValuation) {
    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        // 3D Victory Horizon Hero Card
        LuxuryCard(
          borderColor: InsightFlowColors.borderGold,
          gradient: const LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [
              Color(0xFF141E3C),
              Color(0xFF070D1F),
              Color(0xFF040814),
            ],
          ),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Container(
                    padding:
                        const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                    decoration: BoxDecoration(
                      color: InsightFlowColors.goldPrimary.withOpacity(0.15),
                      borderRadius: BorderRadius.circular(20),
                      border: Border.all(
                          color:
                              InsightFlowColors.goldPrimary.withOpacity(0.45)),
                    ),
                    child: const Text(
                      '✨ 3D VICTORY HORIZON • EXECUTIVE COMMAND',
                      style: TextStyle(
                        fontSize: 10,
                        fontWeight: FontWeight.w900,
                        color: InsightFlowColors.goldPrimary,
                      ),
                    ),
                  ),
                  ElevatedButton.icon(
                    style: ElevatedButton.styleFrom(
                      backgroundColor: InsightFlowColors.goldPrimary,
                      foregroundColor: Colors.black,
                      padding: const EdgeInsets.symmetric(
                          horizontal: 12, vertical: 8),
                    ),
                    onPressed: () =>
                        _pickAndUploadFile('/api/analysis/upload', 'ภาพรวมระบบ'),
                    icon: const Icon(Icons.upload_file_rounded, size: 16),
                    label: const Text(
                      'อัปโหลดไฟล์ (.csv/.xlsx)',
                      style:
                          TextStyle(fontWeight: FontWeight.w900, fontSize: 11),
                    ),
                  ),
                ],
              ),
              const SizedBox(height: 14),
              const Text(
                'TOTAL REVENUE STREAM (รายรับสะสมรวม)',
                style: TextStyle(
                  fontSize: 11,
                  fontWeight: FontWeight.w700,
                  color: InsightFlowColors.textSecondary,
                ),
              ),
              const SizedBox(height: 4),
              Text(
                '฿ ${_numFmt.format(_totalIncome)}',
                style: const TextStyle(
                  fontSize: 30,
                  fontWeight: FontWeight.w900,
                  color: Colors.white,
                ),
              ),
              const SizedBox(height: 12),
              SizedBox(
                height: 120,
                width: double.infinity,
                child: CustomPaint(
                  painter: _TrajectoryChartPainter(
                    revenueSeries: _trafficSeries,
                    targetSeries: _aiTargetSeries,
                  ),
                ),
              ),
            ],
          ),
        ),
        const SizedBox(height: 14),

        // 4 KPI Cards
        GridView.count(
          crossAxisCount: 2,
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          mainAxisSpacing: 10,
          crossAxisSpacing: 10,
          childAspectRatio: 1.65,
          children: [
            _buildKpiTile('รายรับสะสมรวม', '฿ ${_numFmt.format(_totalIncome)}',
                'ซิงค์จากบัญชี & ไฟล์', InsightFlowColors.goldPrimary),
            _buildKpiTile('รายการซิงค์รวม', _numFmt.format(_activeRecords),
                'ทุกตารางรวมกัน', InsightFlowColors.skyAccent),
            _buildKpiTile('อัตราการแปลงผล', _conversionRate,
                'Latency $_latencyMs ms', InsightFlowColors.emeraldAccent),
            _buildKpiTile('ความแม่นยำ AI', _modelAccuracy,
                'Neural Forecasting', InsightFlowColors.goldBright),
          ],
        ),
        const SizedBox(height: 14),

        // Auto-Sync 5-Step Pipeline
        LuxuryCard(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                '🔗 AUTO-SYNC DATA PIPELINE (ภาพรวมระบบ ↔ คลังสินค้า)',
                style: TextStyle(
                  fontSize: 12,
                  fontWeight: FontWeight.w900,
                  color: InsightFlowColors.goldPrimary,
                ),
              ),
              const SizedBox(height: 10),
              _buildPipelineRow(
                  0,
                  '1. ภาพรวมระบบ (Overview)',
                  '฿ ${_numFmt.format(_totalIncome)} • ${_numFmt.format(_activeRecords)} รายการ'),
              _buildPipelineRow(1, '2. ทราฟฟิกสด (Live Pulse)',
                  '$_throughputRps req/s • $_activeNodes/$_totalNodes Nodes'),
              _buildPipelineRow(
                  2,
                  '3. บทวิเคราะห์ AI (AI Pro)',
                  'ความแม่นยำ $_modelAccuracy • สต็อกวิกฤต ${_aiRestock['summary']?['critical_count'] ?? 0} SKU'),
              _buildPipelineRow(3, '4. ระบบรายรับ-รายจ่าย',
                  'คงเหลือสุทธิ ฿ ${_numFmt.format(_netBalance)}'),
              _buildPipelineRow(4, '5. คลังสินค้า & AI สต็อก',
                  '${_products.length} SKUs ($totalStockUnits ชิ้น) • ฿ ${_numFmt.format(totalStockValuation)}'),
            ],
          ),
        ),
      ],
    );
  }

  Widget _buildKpiTile(
      String title, String value, String subtitle, Color accent) {
    return LuxuryCard(
      padding: const EdgeInsets.all(12),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(title,
              style: const TextStyle(
                  fontSize: 11, color: InsightFlowColors.textSecondary)),
          Text(
            value,
            maxLines: 1,
            overflow: TextOverflow.ellipsis,
            style: TextStyle(
              fontSize: 18,
              fontWeight: FontWeight.w900,
              color: accent,
            ),
          ),
          Text(subtitle,
              style: const TextStyle(
                  fontSize: 10, color: InsightFlowColors.textSecondary)),
        ],
      ),
    );
  }

  Widget _buildPipelineRow(int tabIdx, String label, String trailing) {
    return InkWell(
      onTap: () => setState(() => _selectedIndex = tabIdx),
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: 7),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Text(label,
                style: const TextStyle(
                    fontSize: 12,
                    fontWeight: FontWeight.w700,
                    color: Colors.white)),
            Text(
              '$trailing →',
              style: const TextStyle(
                fontSize: 11,
                fontWeight: FontWeight.w800,
                color: InsightFlowColors.goldPrimary,
              ),
            ),
          ],
        ),
      ),
    );
  }

  /// 2. หน้าต่าง ทราฟฟิกสด (Live Pulse)
  Widget _buildLivePulseTab() {
    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        LuxuryCard(
          borderColor: InsightFlowColors.emeraldAccent.withOpacity(0.5),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                '⚡ REAL-TIME TELEMETRY & LIVE PULSE',
                style: TextStyle(
                  fontSize: 11,
                  fontWeight: FontWeight.w900,
                  color: InsightFlowColors.emeraldAccent,
                ),
              ),
              const SizedBox(height: 8),
              Text(
                '${_numFmt.format(_throughputRps)} req/sec',
                style: const TextStyle(
                  fontSize: 28,
                  fontWeight: FontWeight.w900,
                  color: Colors.white,
                ),
              ),
              Text(
                'Latency: $_latencyMs ms • Active Gunicorn/Uvicorn Workers: $_activeNodes/$_totalNodes',
                style: const TextStyle(
                  fontSize: 12,
                  color: InsightFlowColors.textSecondary,
                ),
              ),
              const SizedBox(height: 16),
              SizedBox(
                height: 110,
                child: Row(
                  crossAxisAlignment: CrossAxisAlignment.end,
                  children: List.generate(_waveform.length, (i) {
                    final maxVal = _waveform.fold<double>(
                        1, (m, v) => v > m ? v : m);
                    final ratio = (_waveform[i] / maxVal).clamp(0.12, 1.0);
                    return Expanded(
                      child: Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 4),
                        child: Container(
                          height: 100 * ratio,
                          decoration: BoxDecoration(
                            borderRadius: BorderRadius.circular(8),
                            gradient: const LinearGradient(
                              begin: Alignment.bottomCenter,
                              end: Alignment.topCenter,
                              colors: [
                                InsightFlowColors.goldDeep,
                                InsightFlowColors.goldPrimary,
                                InsightFlowColors.emeraldAccent,
                              ],
                            ),
                          ),
                        ),
                      ),
                    );
                  }),
                ),
              ),
            ],
          ),
        ),
        const SizedBox(height: 14),
        LuxuryCard(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              const Text(
                '🗄️ SQLAlchemy 2.0 QueuePool & Redis Telemetry',
                style: TextStyle(
                  fontSize: 13,
                  fontWeight: FontWeight.w900,
                  color: InsightFlowColors.skyAccent,
                ),
              ),
              const SizedBox(height: 8),
              Text(
                'Engine: ${_telemetry['engine'] ?? 'POSTGRESQL/SQLITE'} • PoolClass: ${_telemetry['pool_class'] ?? 'QueuePool'} (Max ${_telemetry['max_capacity'] ?? 100} Conns)',
                style: const TextStyle(
                  fontSize: 12,
                  color: Colors.white70,
                ),
              ),
            ],
          ),
        ),
      ],
    );
  }

  /// 3. หน้าต่าง บทวิเคราะห์ AI (AI Insights)
  Widget _buildAiInsightsTab(double totalStockValuation) {
    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        Row(
          children: [
            Expanded(
              child: ElevatedButton.icon(
                style: ElevatedButton.styleFrom(
                  backgroundColor: InsightFlowColors.goldPrimary,
                  foregroundColor: Colors.black,
                  padding: const EdgeInsets.symmetric(vertical: 12),
                ),
                onPressed: () async {
                  await _api.refreshAiSummary();
                  await _syncUnifiedState();
                },
                icon: const Icon(Icons.auto_awesome_rounded, size: 18),
                label: const Text('สั่ง AI วิเคราะห์ข้อมูลล่าสุด',
                    style: TextStyle(fontWeight: FontWeight.w900)),
              ),
            ),
            const SizedBox(width: 10),
            Expanded(
              child: OutlinedButton.icon(
                style: OutlinedButton.styleFrom(
                  foregroundColor: InsightFlowColors.goldPrimary,
                  side: const BorderSide(color: InsightFlowColors.goldPrimary),
                  padding: const EdgeInsets.symmetric(vertical: 12),
                ),
                onPressed: () =>
                    _pickAndUploadFile('/api/analysis/upload', 'วิเคราะห์ AI'),
                icon: const Icon(Icons.upload_file_rounded, size: 18),
                label: const Text('อัปโหลดไฟล์ AI',
                    style: TextStyle(fontWeight: FontWeight.w900)),
              ),
            ),
          ],
        ),
        const SizedBox(height: 14),
        _buildAiSectionCard('📈 ผลการดำเนินงาน (Performance)',
            _aiSummary['performance']?.toString() ?? '', InsightFlowColors.emeraldAccent),
        const SizedBox(height: 10),
        _buildAiSectionCard('⚠️ ความเสี่ยงที่ตรวจพบ (Risk Radar)',
            _aiSummary['risks']?.toString() ?? '', InsightFlowColors.roseAccent),
        const SizedBox(height: 10),
        _buildAiSectionCard('🎯 แผนปฏิบัติการแนะนำ (Action Plan)',
            _aiSummary['actions']?.toString() ?? '', InsightFlowColors.goldPrimary),
      ],
    );
  }

  Widget _buildAiSectionCard(String title, String body, Color accent) {
    return LuxuryCard(
      borderColor: accent.withOpacity(0.4),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(title,
              style: TextStyle(
                  fontSize: 13, fontWeight: FontWeight.w900, color: accent)),
          const SizedBox(height: 8),
          Text(
            body,
            style: const TextStyle(
                fontSize: 12.5, color: Colors.white, height: 1.5),
          ),
        ],
      ),
    );
  }

  /// 4. หน้าต่าง ระบบรายรับ-รายจ่าย (Cash Flow)
  Widget _buildCashFlowTab() {
    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        Row(
          children: [
            Expanded(
              child: _buildKpiTile('รายรับรวม', '฿${_numFmt.format(_totalIncome)}',
                  'Income', InsightFlowColors.emeraldAccent),
            ),
            const SizedBox(width: 8),
            Expanded(
              child: _buildKpiTile('รายจ่ายรวม',
                  '฿${_numFmt.format(_totalExpense)}', 'Expense', InsightFlowColors.roseAccent),
            ),
            const SizedBox(width: 8),
            Expanded(
              child: _buildKpiTile('คงเหลือสุทธิ',
                  '฿${_numFmt.format(_netBalance)}', 'Net Balance', InsightFlowColors.goldPrimary),
            ),
          ],
        ),
        const SizedBox(height: 12),
        Row(
          children: [
            Expanded(
              child: ElevatedButton.icon(
                style: ElevatedButton.styleFrom(
                  backgroundColor: InsightFlowColors.goldPrimary,
                  foregroundColor: Colors.black,
                  padding: const EdgeInsets.symmetric(vertical: 12),
                ),
                onPressed: _showAddTransactionDialog,
                icon: const Icon(Icons.add_circle_outline_rounded, size: 18),
                label: const Text('+ บันทึกรายการใหม่',
                    style: TextStyle(fontWeight: FontWeight.w900)),
              ),
            ),
            const SizedBox(width: 10),
            Expanded(
              child: OutlinedButton.icon(
                style: OutlinedButton.styleFrom(
                  foregroundColor: InsightFlowColors.skyAccent,
                  side: const BorderSide(color: InsightFlowColors.skyAccent),
                  padding: const EdgeInsets.symmetric(vertical: 12),
                ),
                onPressed: () =>
                    _pickAndUploadFile('/api/cashflow/upload', 'รายรับ-รายจ่าย'),
                icon: const Icon(Icons.upload_file_rounded, size: 18),
                label: const Text('อัปโหลดไฟล์บัญชี',
                    style: TextStyle(fontWeight: FontWeight.w900)),
              ),
            ),
          ],
        ),
        const SizedBox(height: 14),
        LuxuryCard(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'รายการเดินบัญชีล่าสุด (${_cashFlowRecords.length} รายการ)',
                style: const TextStyle(
                  fontSize: 13,
                  fontWeight: FontWeight.w900,
                  color: InsightFlowColors.goldPrimary,
                ),
              ),
              const SizedBox(height: 10),
              if (_cashFlowRecords.isEmpty)
                const Padding(
                  padding: EdgeInsets.symmetric(vertical: 24),
                  child: Center(
                    child: Text(
                      'ยังไม่มีรายการบัญชี (เริ่มต้นที่ 0 รายการ)',
                      style: TextStyle(color: InsightFlowColors.textSecondary),
                    ),
                  ),
                )
              else
                ..._cashFlowRecords.take(25).map((item) {
                  final isIncome = item['type'] == 'income';
                  final amt = (item['amount'] as num?)?.toDouble() ?? 0.0;
                  return ListTile(
                    contentPadding: EdgeInsets.zero,
                    title: Text(
                      item['title']?.toString() ?? '',
                      style: const TextStyle(
                          color: Colors.white,
                          fontWeight: FontWeight.w700,
                          fontSize: 13),
                    ),
                    subtitle: Text(
                      '${item['date']} • ${item['category']}',
                      style: const TextStyle(
                          color: InsightFlowColors.textSecondary, fontSize: 11),
                    ),
                    trailing: Text(
                      '${isIncome ? '+' : '-'}฿${_numFmt.format(amt)}',
                      style: TextStyle(
                        color: isIncome
                            ? InsightFlowColors.emeraldAccent
                            : InsightFlowColors.roseAccent,
                        fontWeight: FontWeight.w900,
                        fontSize: 13,
                      ),
                    ),
                  );
                }),
            ],
          ),
        ),
      ],
    );
  }

  /// 5. หน้าต่าง คลังสินค้า & AI สต็อก (Inventory Hub)
  Widget _buildInventoryTab(int totalStockUnits, double totalStockValuation) {
    final recs =
        ((_aiRestock['restock_recommendations'] as List?) ?? []).map((e) {
      return Map<String, dynamic>.from(e as Map);
    }).toList();

    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        LuxuryCard(
          borderColor: InsightFlowColors.borderGold,
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'คลังสินค้า (${_products.length} SKUs • ${_numFmt.format(totalStockUnits)} ชิ้น)',
                    style: const TextStyle(
                      fontSize: 12,
                      fontWeight: FontWeight.w900,
                      color: InsightFlowColors.goldPrimary,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    'มูลค่ารวม ฿ ${_numFmt.format(totalStockValuation)}',
                    style: const TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.w900,
                      color: Colors.white,
                    ),
                  ),
                ],
              ),
              ElevatedButton.icon(
                style: ElevatedButton.styleFrom(
                  backgroundColor: InsightFlowColors.goldPrimary,
                  foregroundColor: Colors.black,
                ),
                onPressed: () =>
                    _pickAndUploadFile('/api/inventory/upload', 'คลังสินค้า'),
                icon: const Icon(Icons.upload_file_rounded, size: 16),
                label: const Text('อัปโหลดสต็อก',
                    style:
                        TextStyle(fontWeight: FontWeight.w900, fontSize: 12)),
              ),
            ],
          ),
        ),
        const SizedBox(height: 14),
        if (recs.isNotEmpty) ...[
          LuxuryCard(
            borderColor: InsightFlowColors.goldPrimary.withOpacity(0.45),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                const Text(
                  '⚡ คำแนะนำเติมสต็อกอัตโนมัติด้วย AI (AI Restock Intelligence)',
                  style: TextStyle(
                    fontSize: 13,
                    fontWeight: FontWeight.w900,
                    color: InsightFlowColors.goldPrimary,
                  ),
                ),
                const SizedBox(height: 10),
                ...recs.take(6).map((r) {
                  final sku = r['sku_code']?.toString() ?? '';
                  final recQty =
                      (r['recommended_restock_qty'] as num?)?.toInt() ?? 20;
                  return Padding(
                    padding: const EdgeInsets.symmetric(vertical: 6),
                    child: Row(
                      children: [
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                '${r['product_name']} ($sku)',
                                style: const TextStyle(
                                  color: Colors.white,
                                  fontWeight: FontWeight.w800,
                                  fontSize: 12.5,
                                ),
                              ),
                              Text(
                                'คงเหลือ ${r['current_stock']} ชิ้น • แนะนำเติม +$recQty ชิ้น',
                                style: const TextStyle(
                                  color: InsightFlowColors.textSecondary,
                                  fontSize: 11,
                                ),
                              ),
                            ],
                          ),
                        ),
                        ElevatedButton(
                          style: ElevatedButton.styleFrom(
                            backgroundColor: InsightFlowColors.goldPrimary,
                            foregroundColor: Colors.black,
                            padding: const EdgeInsets.symmetric(
                                horizontal: 12, vertical: 8),
                          ),
                          onPressed: () async {
                            await _api.adjustInventoryStock(
                                skuCode: sku, delta: recQty);
                            await _syncUnifiedState();
                          },
                          child: Text('+$recQty ชิ้น',
                              style: const TextStyle(
                                  fontWeight: FontWeight.w900, fontSize: 11)),
                        ),
                      ],
                    ),
                  );
                }),
              ],
            ),
          ),
          const SizedBox(height: 14),
        ],
        LuxuryCard(
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(
                'รายการสินค้าในคลังทั้งหมด (${_products.length} SKUs)',
                style: const TextStyle(
                  fontSize: 13,
                  fontWeight: FontWeight.w900,
                  color: Colors.white,
                ),
              ),
              const SizedBox(height: 10),
              if (_products.isEmpty)
                const Padding(
                  padding: EdgeInsets.symmetric(vertical: 24),
                  child: Center(
                    child: Text(
                      'ยังไม่มีสินค้าในคลัง (0 SKUs) กรุณาอัปโหลดไฟล์คลังสินค้า',
                      style: TextStyle(color: InsightFlowColors.textSecondary),
                    ),
                  ),
                )
              else
                ..._products.take(30).map((p) {
                  final sku = p['code']?.toString() ?? '';
                  final stock = (p['stock'] as num?)?.toInt() ?? 0;
                  final price = (p['price'] as num?)?.toDouble() ?? 0.0;
                  return ListTile(
                    contentPadding: EdgeInsets.zero,
                    title: Text(
                      p['name']?.toString() ?? '',
                      style: const TextStyle(
                          color: Colors.white,
                          fontWeight: FontWeight.w700,
                          fontSize: 13),
                    ),
                    subtitle: Text(
                      '$sku • ${p['category']} • ฿${_numFmt.format(price)}',
                      style: const TextStyle(
                          color: InsightFlowColors.textSecondary, fontSize: 11),
                    ),
                    trailing: Row(
                      mainAxisSize: MainAxisSize.min,
                      children: [
                        Text(
                          '$stock ชิ้น',
                          style: TextStyle(
                            color: stock <= 8
                                ? InsightFlowColors.roseAccent
                                : InsightFlowColors.goldPrimary,
                            fontWeight: FontWeight.w900,
                          ),
                        ),
                        const SizedBox(width: 8),
                        IconButton(
                          icon: const Icon(Icons.add_circle_rounded,
                              color: InsightFlowColors.emeraldAccent, size: 20),
                          onPressed: () async {
                            await _api.adjustInventoryStock(
                                skuCode: sku, delta: 10);
                            await _syncUnifiedState();
                          },
                        ),
                      ],
                    ),
                  );
                }),
            ],
          ),
        ),
      ],
    );
  }

  /// 6. หน้าต่าง ไฟล์ที่อัปโหลดของฉัน (My Uploaded Files Manager)
  Widget _buildMyUploadedFilesTab() {
    return ListView(
      padding: const EdgeInsets.all(16),
      children: [
        LuxuryCard(
          borderColor: InsightFlowColors.skyAccent.withOpacity(0.5),
          child: Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      '📂 ไฟล์ที่อัปโหลดของฉัน (${_uploadedFiles.length} ไฟล์)',
                      style: const TextStyle(
                        fontSize: 15,
                        fontWeight: FontWeight.w900,
                        color: Colors.white,
                      ),
                    ),
                    const SizedBox(height: 4),
                    const Text(
                      'ดูตารางข้อมูลข้างในไฟล์ หรือลบไฟล์ของคุณพร้อมซิงค์ทุกหน้าต่างอัตโนมัติ',
                      style: TextStyle(
                        fontSize: 11,
                        color: InsightFlowColors.textSecondary,
                      ),
                    ),
                  ],
                ),
              ),
              if (_uploadedFiles.isNotEmpty)
                ElevatedButton.icon(
                  style: ElevatedButton.styleFrom(
                    backgroundColor:
                        InsightFlowColors.roseAccent.withOpacity(0.2),
                    foregroundColor: InsightFlowColors.roseAccent,
                    side:
                        const BorderSide(color: InsightFlowColors.roseAccent),
                  ),
                  onPressed: () async {
                    await _api.deleteAllMyUploadedFiles();
                    await _syncUnifiedState();
                  },
                  icon: const Icon(Icons.delete_sweep_rounded, size: 16),
                  label: const Text('ลบทั้งหมด',
                      style:
                          TextStyle(fontWeight: FontWeight.w900, fontSize: 11)),
                ),
            ],
          ),
        ),
        const SizedBox(height: 14),
        if (_uploadedFiles.isEmpty)
          const LuxuryCard(
            child: Padding(
              padding: EdgeInsets.symmetric(vertical: 36),
              child: Center(
                child: Text(
                  'ยังไม่มีไฟล์ที่คุณอัปโหลดในระบบ',
                  style: TextStyle(color: InsightFlowColors.textSecondary),
                ),
              ),
            ),
          )
        else
          ..._uploadedFiles.map((f) {
            return Padding(
              padding: const EdgeInsets.only(bottom: 12),
              child: LuxuryCard(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Expanded(
                          child: Text(
                            '📄 ${f['filename']}',
                            style: const TextStyle(
                              fontSize: 14,
                              fontWeight: FontWeight.w900,
                              color: Colors.white,
                            ),
                          ),
                        ),
                        Container(
                          padding: const EdgeInsets.symmetric(
                              horizontal: 8, vertical: 3),
                          decoration: BoxDecoration(
                            color: InsightFlowColors.emeraldAccent
                                .withOpacity(0.18),
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: Text(
                            '${f['status'] ?? 'COMPLETED'}',
                            style: const TextStyle(
                              fontSize: 10,
                              fontWeight: FontWeight.w800,
                              color: InsightFlowColors.emeraldAccent,
                            ),
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 6),
                    Text(
                      'หมวด: ${f['source_tab']} • ${_numFmt.format(f['total_records'] ?? 0)} รายการ • อัปโหลดเมื่อ ${f['created_at']}',
                      style: const TextStyle(
                        fontSize: 11.5,
                        color: InsightFlowColors.goldPrimary,
                      ),
                    ),
                    if ((f['summary_note']?.toString() ?? '').isNotEmpty) ...[
                      const SizedBox(height: 4),
                      Text(
                        f['summary_note'].toString(),
                        style: const TextStyle(
                          fontSize: 11,
                          color: InsightFlowColors.textSecondary,
                        ),
                      ),
                    ],
                    const SizedBox(height: 12),
                    Row(
                      children: [
                        Expanded(
                          child: OutlinedButton.icon(
                            style: OutlinedButton.styleFrom(
                              foregroundColor: InsightFlowColors.skyAccent,
                              side: const BorderSide(
                                  color: InsightFlowColors.skyAccent),
                            ),
                            onPressed: () => _showFilePreviewSheet(f),
                            icon: const Icon(Icons.visibility_rounded, size: 16),
                            label: const Text('ดูข้อมูลไฟล์',
                                style: TextStyle(fontWeight: FontWeight.w800)),
                          ),
                        ),
                        const SizedBox(width: 10),
                        Expanded(
                          child: OutlinedButton.icon(
                            style: OutlinedButton.styleFrom(
                              foregroundColor: InsightFlowColors.roseAccent,
                              side: const BorderSide(
                                  color: InsightFlowColors.roseAccent),
                            ),
                            onPressed: () => _confirmAndDeleteFile(f),
                            icon: const Icon(Icons.delete_outline_rounded,
                                size: 16),
                            label: const Text('ลบไฟล์นี้',
                                style: TextStyle(fontWeight: FontWeight.w800)),
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
            );
          }),
      ],
    );
  }
}

/// วาดกราฟเส้น Revenue Stream & AI Target Trajectory ด้วย Flutter CustomPainter
class _TrajectoryChartPainter extends CustomPainter {
  final List<double> revenueSeries;
  final List<double> targetSeries;

  _TrajectoryChartPainter({
    required this.revenueSeries,
    required this.targetSeries,
  });

  @override
  void paint(Canvas canvas, Size size) {
    final w = size.width;
    final h = size.height;

    final gridPaint = Paint()
      ..color = Colors.white.withOpacity(0.07)
      ..strokeWidth = 1;

    for (int i = 1; i <= 3; i++) {
      final y = (h / 4) * i;
      canvas.drawLine(Offset(0, y), Offset(w, y), gridPaint);
    }

    if (revenueSeries.isEmpty) return;
    double maxVal = 100;
    for (final v in [...revenueSeries, ...targetSeries]) {
      if (v > maxVal) maxVal = v;
    }

    void drawSeries(List<double> series, Color color, bool fillArea) {
      if (series.length < 2) return;
      final path = Path();
      final fillPath = Path();
      for (int i = 0; i < series.length; i++) {
        final x = (w / (series.length - 1)) * i;
        final y = h - ((series[i] / maxVal) * (h * 0.82)) - 8;
        if (i == 0) {
          path.moveTo(x, y);
          fillPath.moveTo(x, h);
          fillPath.lineTo(x, y);
        } else {
          path.lineTo(x, y);
          fillPath.lineTo(x, y);
        }
      }
      fillPath.lineTo(w, h);
      fillPath.close();

      if (fillArea) {
        final areaPaint = Paint()
          ..shader = LinearGradient(
            begin: Alignment.topCenter,
            end: Alignment.bottomCenter,
            colors: [
              color.withOpacity(0.28),
              color.withOpacity(0.0),
            ],
          ).createShader(Rect.fromLTWH(0, 0, w, h));
        canvas.drawPath(fillPath, areaPaint);
      }

      final strokePaint = Paint()
        ..color = color
        ..strokeWidth = 2.6
        ..style = PaintingStyle.stroke
        ..strokeCap = StrokeCap.round;
      canvas.drawPath(path, strokePaint);
    }

    drawSeries(targetSeries, InsightFlowColors.skyAccent, false);
    drawSeries(revenueSeries, InsightFlowColors.goldPrimary, true);
  }

  @override
  bool shouldRepaint(covariant _TrajectoryChartPainter oldDelegate) => true;
}

