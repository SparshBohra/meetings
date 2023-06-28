/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        grayText: "#5F6D7E",
        primary: "#272D37",
        graySidebar: "#9899AD",
        darkBlue: "#2161D1",
      },
      backgroundColor: {
        bgColor: "#FAFBFC",
        bgBlue: "#2152FF",
      },
    },
  },
  plugins: [],
});
