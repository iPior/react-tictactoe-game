/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryorange: '#e76f51',
        accentorange: '#f4a261',
        primaryblue: '#264653',
        accentblue: '#2a9d8f',
      },
      screens: {
        'xs': '400px',
      }
    },
  },
  plugins: [],
}

