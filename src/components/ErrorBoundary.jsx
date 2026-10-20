import React from 'react';

/**
 * Enterprise-Grade Error Boundary
 * Catches unhandled runtime exceptions and renders a luxury fallback card
 * preventing the entire application from turning into a black/blank screen.
 */
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('InsightFlow ErrorBoundary intercepted error:', error, errorInfo);
    this.setState({ errorInfo });
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
    if (typeof this.props.onReset === 'function') {
      this.props.onReset();
    } else {
      window.location.reload();
    }
  };

  render() {
    if (this.state.hasError) {
      const isDark = this.props.theme !== 'light';
      return (
        <div
          style={{
            minHeight: '320px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2.5rem 1.5rem',
            margin: '1.5rem auto',
            maxWidth: '820px',
            borderRadius: '24px',
            background: isDark
              ? 'linear-gradient(135deg, rgba(15, 23, 42, 0.98), rgba(2, 6, 23, 0.95))'
              : '#ffffff',
            border: isDark ? '1.5px solid rgba(244, 63, 94, 0.45)' : '1.5px solid #fecdd3',
            boxShadow: isDark
              ? '0 25px 50px -12px rgba(0, 0, 0, 0.5), 0 0 30px rgba(244, 63, 94, 0.15)'
              : '0 20px 40px -10px rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
            color: isDark ? '#f8fafc' : '#0f172a'
          }}
        >
          <div
            style={{
              width: '64px',
              height: '64px',
              borderRadius: '20px',
              background: isDark ? 'rgba(244, 63, 94, 0.15)' : '#ffe4e6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '2rem',
              marginBottom: '1rem',
              border: isDark ? '1px solid rgba(244, 63, 94, 0.3)' : '1px solid #fecdd3'
            }}
          >
            🛡️
          </div>

          <h3
            style={{
              fontSize: '1.35rem',
              fontWeight: 900,
              margin: '0 0 0.5rem 0',
              color: isDark ? '#ffffff' : '#0f172a'
            }}
          >
            {this.props.title || 'ระบบตรวจพบข้อผิดพลาดในการแสดงผลส่วนนี้'}
          </h3>

          <p
            style={{
              fontSize: '0.88rem',
              color: isDark ? '#94a3b8' : '#64748b',
              maxWidth: '560px',
              lineHeight: 1.6,
              margin: '0 0 1.25rem 0'
            }}
          >
            {this.props.description ||
              'ตรวจพบข้อผิดพลาดระหว่างประมวลผลข้อมูลหน้าจอชั่วคราว ข้อมูลไฟล์ที่อัปโหลดทั้งหมดของคุณยังปลอดภัย ไม่สูญหาย กรุณากดปุ่มด้านล่างเพื่อเริ่มใหม่'}
          </p>

          {this.state.error && (
            <div
              style={{
                fontSize: '0.74rem',
                fontFamily: 'monospace',
                background: isDark ? 'rgba(0, 0, 0, 0.5)' : '#f1f5f9',
                padding: '0.6rem 1rem',
                borderRadius: '10px',
                color: isDark ? '#fda4af' : '#e11d48',
                maxWidth: '90%',
                overflowX: 'auto',
                marginBottom: '1.5rem',
                border: isDark ? '1px solid rgba(244, 63, 94, 0.2)' : '1px solid #e2e8f0'
              }}
            >
              {String(this.state.error?.message || this.state.error)}
            </div>
          )}

          <div style={{ display: 'flex', gap: '0.85rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button
              type="button"
              onClick={this.handleReset}
              style={{
                padding: '0.75rem 1.6rem',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                color: '#0f172a',
                fontWeight: 900,
                fontSize: '0.88rem',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 8px 20px rgba(245, 158, 11, 0.35)',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem'
              }}
            >
              <span>🔄</span>
              <span>รีเฟรชส่วนนี้ใหม่ (Refresh)</span>
            </button>

            <button
              type="button"
              onClick={() => {
                this.setState({ hasError: false, error: null });
                if (typeof window !== 'undefined') window.location.href = '/';
              }}
              style={{
                padding: '0.75rem 1.4rem',
                borderRadius: '14px',
                background: isDark ? 'rgba(255, 255, 255, 0.08)' : '#e2e8f0',
                color: isDark ? '#e2e8f0' : '#1e293b',
                fontWeight: 800,
                fontSize: '0.88rem',
                border: isDark ? '1px solid rgba(255, 255, 255, 0.15)' : '1px solid #cbd5e1',
                cursor: 'pointer'
              }}
            >
              🏠 กลับหน้าภาพรวมหลัก
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

