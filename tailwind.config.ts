import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50:  '#FFF9ED',
          100: '#FEF0CC',
          200: '#FDE08A',
          300: '#FBC64B',
          400: '#F0AF20',
          500: '#C9A84C',
          600: '#A8842A',
          700: '#7B5E18',
          800: '#5C4410',
          900: '#3D2D09',
        },
        dark: {
          50:  '#1C1B22',
          100: '#141319',
          200: '#100F15',
          300: '#0C0B10',
          400: '#09080D',
          500: '#06050A',
        },
      },
      fontFamily: {
        serif:   ['var(--font-cormorant)', 'Georgia', 'serif'],
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        sans:    ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient':  'linear-gradient(135deg, #8B6A14 0%, #C9A84C 40%, #F0D58C 60%, #C9A84C 80%, #8B6A14 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%)',
        'hero-gradient':  'radial-gradient(ellipse at 50% 30%, rgba(201,168,76,0.12) 0%, transparent 70%)',
      },
      animation: {
        'float':        'float 6s ease-in-out infinite',
        'float-slow':   'float 9s ease-in-out infinite',
        'glow':         'glow 2.5s ease-in-out infinite alternate',
        'shimmer':      'shimmer 3s linear infinite',
        'rotate-slow':  'rotate 25s linear infinite',
        'pulse-gold':   'pulse-gold 3s ease-in-out infinite',
        'fade-up':      'fadeUp 0.8s ease forwards',
      },
      keyframes: {
        float: {
          '0%,100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%':     { transform: 'translateY(-24px) rotate(1deg)' },
        },
        glow: {
          '0%':   { textShadow: '0 0 20px rgba(201,168,76,0.3)' },
          '100%': { textShadow: '0 0 60px rgba(201,168,76,0.8), 0 0 100px rgba(201,168,76,0.3)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        rotate: {
          '0%':   { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'pulse-gold': {
          '0%,100%': { boxShadow: '0 0 0 0 rgba(201,168,76,0)' },
          '50%':     { boxShadow: '0 0 0 12px rgba(201,168,76,0)' },
        },
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      backdropBlur: { xs: '2px' },
    },
  },
  plugins: [],
} satisfies Config
