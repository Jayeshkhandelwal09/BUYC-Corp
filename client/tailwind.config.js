/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary : "#1f2020"
      }
    },
  },
  plugins: [],
  corePlugins:{
    preflight:false,
  },
}