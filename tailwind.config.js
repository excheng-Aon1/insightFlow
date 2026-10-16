/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          '"Prompt"',
          '"Kanit"',
          '"Plus Jakarta Sans"',
          '-apple-system',
          'BlinkMacSystemFont',
          'sans-serif',
        ],
        display: [
          '"Prompt"',
          '"Plus Jakarta Sans"',
          'sans-serif',
        ],
        mono: [
          '"JetBrains Mono"',
          '"Prompt"',
          'ui-monospace',
          'SFMono-Regular',
          'monospace',
        ],
      },
      fontSize: {
        xs: ['0.875rem', { lineHeight: '1.55' }],      // 14px (ขยายจาก 12px เดิมให้อ่านง่ายขึ้น)
        sm: ['0.96875rem', { lineHeight: '1.65' }],    // 15.5px (ขยายจาก 14px เดิม)
        base: ['1.0625rem', { lineHeight: '1.75' }],   // 17px (ขนาดมาตรฐานอ่านสบายตาสำหรับทุกวัย)
        lg: ['1.2rem', { lineHeight: '1.65' }],        // 19.2px
        xl: ['1.375rem', { lineHeight: '1.5' }],       // 22px
        '2xl': ['1.65rem', { lineHeight: '1.42' }],    // 26.4px
        '3xl': ['2.05rem', { lineHeight: '1.35' }],    // 32.8px
        '4xl': ['2.5rem', { lineHeight: '1.3' }],      // 40px
        '5xl': ['3.1rem', { lineHeight: '1.28' }],     // 49.6px
        '6xl': ['3.65rem', { lineHeight: '1.25' }],    // 58.4px
      },
    },
  },
  plugins: [],
}
