import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        "custom-orange": "#fd692e",
      },
      colors: {
        "custom-orange": "#fd692e",
      },
      fontFamily: {
        bebas: ['"Bebas Neue"', ...defaultTheme.fontFamily.sans],
        gruppo: ['"Gruppo"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
