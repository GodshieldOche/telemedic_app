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
        primaryTwo: "#F2EFFF",
        mainBlack: "#2B2B2B",
        secBlack: "#2A2A2A",
        mainWhite: "#F5F5F5",
        secondaryBlack: "#2B2B2B",
        mainGray: "#858C94",
        primaryGray: "#F4F6F9",
        secondaryGray: "#606060",
        borderGray: "#DADEE3",
        borderGrayTwo: "#D1D5DB",
        secondaryOne: "#EEE9FF",
        secondaryTwo: "#6D7580",
        secondaryThree: "#D7D0FF",
        secondaryFour: "#9581FF",
        secondaryFive: "#EBEEF2",
        secondarySix: "#606060",
        secondarySeven: "#FDFDFD",
        neutral: "#545D69",
        mainRed: "#E1604D",
        secGreen: "#E2F8E3",
        primaryGreen: "#04AD01",
        purpleDark: "#001339",
      },
    },
  },
  plugins: [],
};
