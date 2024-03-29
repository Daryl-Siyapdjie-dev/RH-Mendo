/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      
      colors: {
        'navbg': '#ECECFF',
        'hovericone': '#894AD1',
        'bgcontaint': '#F8F8FF',
        

      },
      gridTemplateColumns: {
        '1/5':"1fr 5fr"
      }
    },
  },
  plugins: [],
}

