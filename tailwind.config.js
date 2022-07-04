/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    fontFamily: {
      sans: ['"Poppins"', "sans-serif"],
    },
    extend: {
      colors: {
        "dark-gunmetal": "#1D2029",
        "chinese-silver": "#C8C9CB",
        "alice-blue": "#F4F8FF",
        cultured: "#F8F8F9",
        quartz: "#4A4C54",
        "pale-cornflower-blue": "#ADCCFE",
        blueberry: "#5896FD",
        "french-sky-blue": {
          300: "#D5E4FF",
        },
        "screaming-green": {
          150: "#EAFFEB",
        },
        "maximum-blue-purple": "#ADA2FE",
        "violets-are-blue": {
          DEFAULT: "#8070F7",
          250: "#DFDBFD",
        },
        gray: {
          150: "#EAEBEC",
        },
      },
      borderRadius: {
        "3xl": "1.25rem",
      },
      width: {
        30: "7.5rem",
      },
      height: {
        34: "8.5rem",
      },
      lineHeight: {
        12: "3.5rem",
      },
      fontSize: {
        "7xl": "4.25rem",
      },
    },
  },
  plugins: [],
};
