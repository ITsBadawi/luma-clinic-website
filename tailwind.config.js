/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        mint: {
          50: '#F7FBFA',
          100: '#F1F8F6',
          200: '#E2EFEA',
          300: '#C8E5DD',
          400: '#A3D6CB',
          500: '#8FD3C8',
        },
        teal: {
          50: '#F0F9F8',
          100: '#DCF1EE',
          200: '#BDE4DF',
          300: '#8FD3C8',
          400: '#4CAFA3',
          500: '#1F8C83',
          600: '#14726D',
          700: '#0F5E5A',
          800: '#0C4B48',
          900: '#083634',
          950: '#041F1E',
        },
        aqua: {
          light: '#DDF2EE',
          DEFAULT: '#8FD3C8',
          dark: '#5EAFA2',
        },
        surface: {
          white: '#FFFFFF',
          light: '#F8FCFB',
          card: '#FFFFFF',
        }
      },
      borderRadius: {
        '2xl': '20px',
        '3xl': '24px',
        '4xl': '32px',
        'blob': '40% 60% 70% 30% / 40% 50% 60% 55%',
      },
      fontFamily: {
        sans: ['"IBM Plex Sans Arabic"', 'Tajawal', '"Plus Jakarta Sans"', 'sans-serif'],
        heading: ['Tajawal', '"IBM Plex Sans Arabic"', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 10px 30px -10px rgba(15, 94, 90, 0.06)',
        'soft-md': '0 14px 35px -10px rgba(15, 94, 90, 0.08)',
        'soft-lg': '0 20px 45px -12px rgba(15, 94, 90, 0.12)',
        'soft-hover': '0 25px 50px -12px rgba(15, 94, 90, 0.15)',
        'teal-glow': '0 12px 30px -8px rgba(15, 94, 90, 0.25)',
        'aqua-glow': '0 10px 25px -6px rgba(143, 211, 200, 0.45)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.05)' },
        }
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulseSlow 8s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
