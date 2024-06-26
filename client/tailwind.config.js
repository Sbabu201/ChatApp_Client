/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        'maison': ['Maison Neue', 'sans-serif'],
        'times': ['Times New Roman', 'serif'],
      },
    },
  },
  plugins: [],
}

