/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
    },
    fontFamily: {
      vinyl: ['Heebo', "sans-serif"]
    },
    colors:{
      // Background colors
      'main-background': '#050507',
      'light-background': '#e2e2e2',
      // Task colors
      'high-background': '#312020',
      'medium-background': '#33331d',
      'low-background': '#233120',

      'high-color': '#e44141',
      'medium-color': '#e4e141',
      'low-color': '#46e441',
    },

    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms"),
    require("tailwind-scrollbar")
  ],
}
