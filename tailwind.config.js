/** @type {import('tailwindcss').Config} */
module.exports = {
  // purge: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx,vue}"],
  // purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
  content: [
    './src/**/*.{html,vue}',
  ],
}
