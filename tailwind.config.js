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
        customPink: "#FACBDC",
        customSkyblue: "#B4DEF5",
        customSilver: "#D8D8D8",
        customGold: "#E5B06A",
        customRed: "#D85252",
        customBlue: "#4483F2",
        customBlack: "#555555",
      },
      fontFamily: {
        pretendard: ["Pretendard", "sans-serif"],
      },
    },
  },
  plugins: [],
};
