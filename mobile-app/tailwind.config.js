/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
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
        parchment: {
          light: '#F4E7D7',
          dark: '#E5D4B8',
        },
      },
    },
  },
  plugins: [],
}
