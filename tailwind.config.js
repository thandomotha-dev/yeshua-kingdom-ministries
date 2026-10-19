/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      /**
       * ============================================
       * COLOR PALETTE
       * ============================================
       * Change these to update the entire site's color scheme.
       * The site uses 'burgundy' as the primary brand color
       * and 'gold' as the accent.
       */
      colors: {
        burgundy: {
          50: '#FDF2F6',
          100: '#FAE5ED',
          200: '#F5CCDB',
          300: '#EDA3BF',
          400: '#E07A9F',
          500: '#8F2D50',
          600: '#7D2545',
          700: '#6B1D3A', // ← Primary brand color
          800: '#5C1530',
          900: '#4A0E24',
          950: '#2E0716',
        },
        gold: {
          50: '#FDFAF0',
          100: '#FAF2D6',
          200: '#F5E5AD',
          300: '#E0C870',
          400: '#D4B85E',
          500: '#C9A84C', // ← Primary accent
          600: '#B8923A',
          700: '#9A7A30',
          800: '#7D6327',
          900: '#604C1E',
        },
        cream: {
          DEFAULT: '#FDF8F0',
          50: '#FFFFFF',
          100: '#FDF8F0',
          200: '#F8EFE0',
          300: '#F0E2CC',
        },
        charcoal: {
          DEFAULT: '#2D2D2D',
          light: '#4A4A4A',
          lighter: '#6B6B6B',
        },
      },
      /**
       * ============================================
       * FONTS
       * ============================================
       * Playfair Display for headings (elegant, serif)
       * Inter for body text (clean, readable)
       * Loaded via Google Fonts in index.html
       */
      fontFamily: {
        heading: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      /**
       * Additional design tokens
       */
      fontSize: {
        'display-lg': ['4.5rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'display': ['3.5rem', { lineHeight: '1.15', letterSpacing: '-0.02em' }],
        'display-sm': ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.01em' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'warm': '0 4px 14px 0 rgba(107, 29, 58, 0.08)',
        'warm-lg': '0 10px 30px 0 rgba(107, 29, 58, 0.12)',
        'gold': '0 4px 14px 0 rgba(201, 168, 76, 0.2)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'fade-in-up': 'fadeInUp 0.6s ease-out',
        'slide-in-right': 'slideInRight 0.4s ease-out',
        'pulse-slow': 'pulse 3s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [],
};
