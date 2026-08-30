/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#070A12',
          900: '#101624',
          800: '#171D2B',
          700: '#293246',
        },
        gold: {
          DEFAULT: '#C99A3D',
          light: '#E5C36A',
          dark: '#76551F',
        },
        success: {
          DEFAULT: '#18A878',
        },
        danger: {
          DEFAULT: '#A83D48',
        },
        warning: {
          DEFAULT: '#D68A32',
        },
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', '"Noto Naskh Arabic"', 'serif'],
        body: ['Manrope', '"IBM Plex Sans Arabic"', 'sans-serif'],
      },
      boxShadow: {
        panel: '0 4px 24px -8px rgba(0, 0, 0, 0.6)',
        'panel-gold': '0 4px 24px -8px rgba(201, 154, 61, 0.15)',
      },
    },
  },
  plugins: [],
};
