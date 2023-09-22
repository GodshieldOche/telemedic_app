/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryOne: "#8863F2",
        mainBlack: "#2B2B2B",
        secondaryBlack: "#2B2B2B",
        mainGray: "#858C94",
        primaryGray: "#F4F6F9",
      },
    },
  },
  plugins: [],
};
