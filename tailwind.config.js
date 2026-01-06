/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ottoman: {
          turquoise: '#1ABC9C',
          bordeaux: '#8B0000',
          gold: '#FFD700',
          cream: '#FFF8DC',
          darkGold: '#B8860B',
          crimson: '#DC143C',
        },
      },
      fontFamily: {
        heading: ['"Cinzel Decorative"', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'parchment': "url('/parchment-texture.jpg')",
      },
    },
  },
  plugins: [],
}
