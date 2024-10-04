import colors from "tailwindcss/colors";
import animated from "tailwindcss-animated";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        playerOne: colors.indigo,
        playerTwo: colors.rose,
      },
    },
  },
  plugins: [animated],
};
