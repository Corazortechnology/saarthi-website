/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // Surface tokens driven by CSS variables (light/dark) — support opacity.
        bg: 'rgb(var(--bg) / <alpha-value>)',
        surface: 'rgb(var(--surface) / <alpha-value>)',
        surface2: 'rgb(var(--surface-2) / <alpha-value>)',
        border: 'rgb(var(--border) / <alpha-value>)',
        fg: 'rgb(var(--text) / <alpha-value>)',
        muted: 'rgb(var(--muted) / <alpha-value>)',
        accent: 'rgb(var(--accent) / <alpha-value>)',

        // Fixed brand palette (mirrors the app's brand_tokens.dart).
        brand: {
          blue: '#2563EB',
          blueLight: '#60A5FA',
        },
        teal: {
          rest: '#0F766E',
          active: '#0D9488',
          restDark: '#14B8A6',
          activeDark: '#2DD4BF',
        },
        insight: {
          DEFAULT: '#6D28D9',
          light: '#A78BFA',
        },
        ok: { DEFAULT: '#16A34A', dark: '#22C55E' },
        warn: { DEFAULT: '#B45309', dark: '#F59E0B' },
        info: { DEFAULT: '#0369A1', dark: '#38BDF8' },
        critical: { DEFAULT: '#DC2626', dark: '#F87171' },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      borderRadius: {
        xl: '0.875rem',
        '2xl': '1.125rem',
        '3xl': '1.5rem',
      },
      boxShadow: {
        brand: '0 24px 60px -20px rgba(37, 99, 235, 0.35)',
        card: '0 18px 48px -24px rgba(15, 23, 42, 0.25)',
        glow: '0 0 0 1px rgba(37,99,235,0.15), 0 20px 60px -20px rgba(37,99,235,0.45)',
      },
      keyframes: {
        floaty: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        ringPulse: {
          '0%': { transform: 'scale(0.92)', opacity: '0.55' },
          '70%': { transform: 'scale(1.12)', opacity: '0' },
          '100%': { transform: 'scale(1.12)', opacity: '0' },
        },
        gridDrift: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(-40px)' },
        },
      },
      animation: {
        floaty: 'floaty 6s ease-in-out infinite',
        shimmer: 'shimmer 2.5s linear infinite',
        marquee: 'marquee 28s linear infinite',
        ringPulse: 'ringPulse 3.2s ease-out infinite',
        gridDrift: 'gridDrift 8s linear infinite',
      },
    },
  },
  plugins: [],
}
