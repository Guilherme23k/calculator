/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

module.exports = {
  content: [],
  theme: {
    extend: {
      colors: {
        "matte-black": "#000807",
        "light-black": "#0c1A21",
        "text-white": "#dfdfdf",
        "hover-black": "#162f3b",
        "hover-ac": "#228f84",
        "green-ac": "#1b7269",
      },
      fontFamily: {
        roboto: "Roboto",
      },
    },
  },
  plugins: [],
};
