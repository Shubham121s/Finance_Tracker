/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial":
          "radial-gradient(circle, #dcdcdc 0%, #b0b0b0 100%)",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, #dcdcdc 0%, #b0b0b0 100%)",
      },
    },
  },
  plugins: [],
};
