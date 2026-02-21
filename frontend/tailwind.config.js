/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1976d2',
          dark: '#1565c0',
        },
        danger: '#d32f2f',
        warning: '#f57c00',
        success: '#388e3c',
      },
      keyframes: {
        tooltipFadeIn: {
          'from': { opacity: '0', transform: 'translateY(-4px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          'from': { opacity: '0' },
          'to': { opacity: '1' },
        },
        slideUp: {
          'from': { opacity: '0', transform: 'translateY(20px)' },
          'to': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'pulse-slow': 'pulse 2s infinite',
        'fadeIn': 'fadeIn 0.2s ease-out',
        'slideUp': 'slideUp 0.3s ease-out',
      },
    },
  },
  plugins: [],
}
