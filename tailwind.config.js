/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'deep-space': '#0a0a0f',
        'space-black': '#050508',
        'electric-cyan': '#00f0ff',
        'neon-purple': '#a855f7',
        'neon-pink': '#ff00ff',
        'energy-white': '#ffffff',
        'soft-gray': '#1a1a2e',
        'glass-white': 'rgba(255, 255, 255, 0.05)',
      },
      fontFamily: {
        display: ['Orbitron', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'orbit': 'orbit 20s linear infinite',
        'spin-slow': 'spin 30s linear infinite',
        'particle-rise': 'particle-rise 4s ease-out infinite',
        'energy-wave': 'energy-wave 3s ease-in-out infinite',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': {
            boxShadow: '0 0 20px rgba(0, 240, 255, 0.3), 0 0 40px rgba(0, 240, 255, 0.1)',
          },
          '50%': {
            boxShadow: '0 0 30px rgba(0, 240, 255, 0.5), 0 0 60px rgba(0, 240, 255, 0.2)',
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        orbit: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'particle-rise': {
          '0%': { transform: 'translateY(100vh) scale(0)', opacity: 0 },
          '10%': { opacity: 1 },
          '90%': { opacity: 1 },
          '100%': { transform: 'translateY(-100vh) scale(1)', opacity: 0 },
        },
        'energy-wave': {
          '0%, 100%': { transform: 'scale(1)', opacity: 0.5 },
          '50%': { transform: 'scale(1.05)', opacity: 0.8 },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};
