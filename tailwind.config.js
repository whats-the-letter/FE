/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
    "./common/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        custom_pink: "#FACBDC",
        custom_skyblue: "#B4DEF5",
        custom_silver: "#D8D8D8",
        custom_gold: "#E5B06A",
        custom_red: "#D85252",
        custom_blue: "#4483F2",
        custom_black: "#555555",
      },
      fontFamily: {
        pretendard: ["Pretendard", "sans-serif"],
      },
    },
  },
  plugins: [],
};
