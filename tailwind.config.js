/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        Primary: "#fe4407",
        Secondary: "#272B37",
        Accent: "#8CD42F",
        TextMain: "#666666",
        border: "#cccccc",
        white: "#ffffff",
      },
      screens: {},
    },
  },
  plugins: [require("tailwindcss-animate")],
};
