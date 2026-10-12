import 'package:flutter/material.dart';

/// ธีมสีระดับพรีเมียม Midnight Obsidian & 24K Champagne Gold
/// ออกแบบให้ตรงกับหน้าเว็บ InsightFlow AI 100%
class InsightFlowColors {
  static const Color obsidianBg = Color(0xFF030712);
  static const Color headerNavy = Color(0xFF040816);
  static const Color cardNavy = Color(0xFF080F22);
  static const Color cardElevated = Color(0xFF0B142E);

  static const Color goldPrimary = Color(0xFFFBBF24);
  static const Color goldBright = Color(0xFFFDE047);
  static const Color goldDeep = Color(0xFFD97706);

  static const Color skyAccent = Color(0xFF38BDF8);
  static const Color emeraldAccent = Color(0xFF10B981);
  static const Color roseAccent = Color(0xFFF43F5E);

  static const Color textPrimary = Color(0xFFF8FAFC);
  static const Color textSecondary = Color(0xFFCBD5E1); // High-contrast senior-friendly secondary text
  static const Color borderSubtle = Color(0x26FFFFFF);
  static const Color borderGold = Color(0x59FBBF24);
}

class InsightFlowTheme {
  static ThemeData get darkLuxuryTheme {
    return ThemeData(
      useMaterial3: true,
      brightness: Brightness.dark,
      fontFamily: 'IBM Plex Sans Thai',
      scaffoldBackgroundColor: InsightFlowColors.obsidianBg,
      primaryColor: InsightFlowColors.goldPrimary,
      colorScheme: const ColorScheme.dark(
        primary: InsightFlowColors.goldPrimary,
        secondary: InsightFlowColors.skyAccent,
        surface: InsightFlowColors.cardNavy,
        error: InsightFlowColors.roseAccent,
      ),
      // ระบบตัวอักษรร่วมสมัย อ่านง่าย สำหรับทุกวัยและผู้สูงอายุ
      // แยกชัดเจนระหว่างตัวหนา (Headings / KPI = w700) และตัวปกติ (Body / Descriptions = w400)
      textTheme: const TextTheme(
        displayLarge: TextStyle(fontSize: 32, fontWeight: FontWeight.w700, height: 1.35, color: InsightFlowColors.textPrimary),
        displayMedium: TextStyle(fontSize: 26, fontWeight: FontWeight.w700, height: 1.38, color: InsightFlowColors.textPrimary),
        headlineLarge: TextStyle(fontSize: 22, fontWeight: FontWeight.w700, height: 1.42, color: InsightFlowColors.textPrimary),
        headlineMedium: TextStyle(fontSize: 19, fontWeight: FontWeight.w700, height: 1.45, color: InsightFlowColors.textPrimary),
        titleLarge: TextStyle(fontSize: 17.5, fontWeight: FontWeight.w700, height: 1.48, color: InsightFlowColors.textPrimary),
        titleMedium: TextStyle(fontSize: 16, fontWeight: FontWeight.w600, height: 1.55, color: InsightFlowColors.textPrimary),
        bodyLarge: TextStyle(fontSize: 16.5, fontWeight: FontWeight.w400, height: 1.75, color: InsightFlowColors.textPrimary),
        bodyMedium: TextStyle(fontSize: 15, fontWeight: FontWeight.w400, height: 1.72, color: InsightFlowColors.textSecondary),
        bodySmall: TextStyle(fontSize: 13.5, fontWeight: FontWeight.w400, height: 1.65, color: InsightFlowColors.textSecondary),
        labelLarge: TextStyle(fontSize: 15, fontWeight: FontWeight.w600, height: 1.45, color: InsightFlowColors.textPrimary),
      ),
      appBarTheme: const AppBarTheme(
        backgroundColor: InsightFlowColors.headerNavy,
        foregroundColor: InsightFlowColors.textPrimary,
        elevation: 0,
        centerTitle: false,
      ),
      navigationBarTheme: NavigationBarThemeData(
        backgroundColor: InsightFlowColors.headerNavy,
        indicatorColor: InsightFlowColors.goldPrimary.withOpacity(0.18),
        labelTextStyle: WidgetStateProperty.resolveWith((states) {
          final isSelected = states.contains(WidgetState.selected);
          return TextStyle(
            fontSize: 12.5,
            fontWeight: isSelected ? FontWeight.w700 : FontWeight.w400,
            color: isSelected
                ? InsightFlowColors.goldPrimary
                : InsightFlowColors.textSecondary,
          );
        }),
      ),
    );
  }
}

/// วิดเจ็ตโลโก้ InsightFlow ทรงเพชร 24K Gold & กราฟพุ่งทะยานสู่อนาคต
class InsightFlowLogo extends StatelessWidget {
  final double size;
  const InsightFlowLogo({super.key, this.size = 40});

  @override
  Widget build(BuildContext context) {
    return Container(
      width: size,
      height: size,
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(size * 0.28),
        gradient: const LinearGradient(
          begin: Alignment.topLeft,
          end: Alignment.bottomRight,
          colors: [
            Color(0xFF0F172A),
            Color(0xFF060B19),
            Color(0xFF02040A),
          ],
        ),
        border: Border.all(
          color: InsightFlowColors.goldPrimary.withOpacity(0.55),
          width: 1.4,
        ),
        boxShadow: [
          BoxShadow(
            color: InsightFlowColors.goldPrimary.withOpacity(0.22),
            blurRadius: 12,
            spreadRadius: 1,
          ),
        ],
      ),
      child: CustomPaint(
        painter: _PrismLogoPainter(),
      ),
    );
  }
}

class _PrismLogoPainter extends CustomPainter {
  @override
  void paint(Canvas canvas, Size size) {
    final w = size.width;
    final h = size.height;

    final goldPaint = Paint()
      ..shader = const LinearGradient(
        colors: [
          Color(0xFFFEF08A),
          Color(0xFFFBBF24),
          Color(0xFFD97706),
        ],
        begin: Alignment.topLeft,
        end: Alignment.bottomRight,
      ).createShader(Rect.fromLTWH(0, 0, w, h));

    final cyanPaint = Paint()
      ..color = InsightFlowColors.skyAccent.withOpacity(0.85);

    // วาดแท่งกราฟ 4 แท่งไล่ระดับขึ้นสู่ยอดแห่งชัยชนะ
    final barW = w * 0.10;
    canvas.drawRRect(
      RRect.fromRectAndRadius(
        Rect.fromLTWH(w * 0.22, h * 0.56, barW, h * 0.22),
        const Radius.circular(3),
      ),
      cyanPaint,
    );
    canvas.drawRRect(
      RRect.fromRectAndRadius(
        Rect.fromLTWH(w * 0.37, h * 0.45, barW, h * 0.33),
        const Radius.circular(3),
      ),
      goldPaint,
    );
    canvas.drawRRect(
      RRect.fromRectAndRadius(
        Rect.fromLTWH(w * 0.52, h * 0.34, barW, h * 0.44),
        const Radius.circular(3),
      ),
      goldPaint,
    );
    canvas.drawRRect(
      RRect.fromRectAndRadius(
        Rect.fromLTWH(w * 0.67, h * 0.22, barW, h * 0.56),
        const Radius.circular(3),
      ),
      goldPaint,
    );

    // เส้นทะยานขึ้นด้านบน
    final linePaint = Paint()
      ..color = const Color(0xFFFEF08A)
      ..strokeWidth = 2.2
      ..style = PaintingStyle.stroke
      ..strokeCap = StrokeCap.round;

    final path = Path()
      ..moveTo(w * 0.20, h * 0.52)
      ..quadraticBezierTo(w * 0.45, h * 0.40, w * 0.76, h * 0.18);
    canvas.drawPath(path, linePaint);
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}

/// การ์ดกระจกหรูหรา (Luxury Glassmorphic Card)
class LuxuryCard extends StatelessWidget {
  final Widget child;
  final EdgeInsetsGeometry padding;
  final Color? borderColor;
  final Gradient? gradient;

  const LuxuryCard({
    super.key,
    required this.child,
    this.padding = const EdgeInsets.all(16),
    this.borderColor,
    this.gradient,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: padding,
      decoration: BoxDecoration(
        gradient: gradient ??
            const LinearGradient(
              begin: Alignment.topLeft,
              end: Alignment.bottomRight,
              colors: [
                Color(0xFF0A1228),
                Color(0xFF060B19),
              ],
            ),
        borderRadius: BorderRadius.circular(20),
        border: Border.all(
          color: borderColor ?? InsightFlowColors.borderSubtle,
          width: 1.1,
        ),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.45),
            blurRadius: 20,
            offset: const Offset(0, 8),
          ),
        ],
      ),
      child: child,
    );
  }
}

