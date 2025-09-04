/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#EBF2E8",
          400: "#4DDE21",
          500: "#61944F",
        },
        black: "#121C0D",
        white: "#F5F5F5",
      },
    },
  },
  plugins: [],
};
