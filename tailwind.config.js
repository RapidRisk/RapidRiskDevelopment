/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'brand': {
          'gold': '#FDB813',
          'navy': '#0A1F44',
        },
        'trading': {
          'bg': '#151515',
          'panel': '#1C1C1C',
          'sidebar': '#0F0F0F',
          'border': '#2A2A2A',
          'hover': '#252525',
          'active': '#2C2C2C',
          'text': {
            'primary': '#E0E0E0',
            'secondary': '#808080',
            'muted': '#505050',
            'accent': '#FDB813',
            'link': '#3B82F6',
            'positive': '#22C55E',
            'negative': '#EF4444',
          },
          'chart': {
            'line': '#2563EB',
            'grid': '#222222',
            'volume': '#1D4ED8',
          },
        },
      },
      fontFamily: {
        'mono': ['JetBrains Mono', 'monospace'],
        'sans': ['var(--font-outfit)', 'sans-serif'],
        'outfit': ['var(--font-outfit)', 'sans-serif'],
      },
      fontSize: {
        'tiny': '0.65rem',
      },
      spacing: {
        'sidebar': '240px',
      },
      gridTemplateColumns: {
        'trading': 'auto 1fr auto',
      },
    },
  },
  plugins: [],
} 