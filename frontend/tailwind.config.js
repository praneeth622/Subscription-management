/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customPurple : '#eadefa',
        buttonPurple : '#7635dc',
         darkP :'#5b3696',
      }
    },
  },
  plugins: [],
}