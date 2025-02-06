/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  important: '#root', 
  prefix:'tw-', 
  theme: {
    extend: {
      fontFamily:{
        be: ["Be Vietnam Pro", 'sans-serif' ],
      }
    },
  },
  plugins: [],
}

