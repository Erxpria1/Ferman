const COLORS = {
  ottoman: {
    turquoise: '#45B69C',
    gold: '#D4AF37',
    bordeaux: '#800020',
    cream: '#F5F5DC',
    crimson: '#DC143C',
    dark: '#2C3E50',
  },
  parchment: '#F0E6D2',
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: COLORS,
      fontFamily: {
        heading: ['System'], // React Native default for now
      },
    },
  },
  plugins: [],
}
