/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'espresso': '#120A06',
        'cocoa': '#1A0F0A',
        'gold': {
          DEFAULT: '#DAA520',
          light: '#F5A623',
        },
        'offwhite': '#FDFBF7',
        'warm-grey': '#A39690',
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}