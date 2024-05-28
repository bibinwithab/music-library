/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor:{
        'custom-orange': '#fd692e'
      },
      colors: {
        'custom-orange': '#fd692e',
      }
    },
  },
  plugins: [],
}