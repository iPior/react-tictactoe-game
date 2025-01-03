/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // colors: {
      //   primary: '#cdd7d1',
      //   secondary: '#95a1a1',
      //   tertiary: '#606868',
      //   dark: '#1d1e1e',
      // }
      colors: {
        primary: '#cdd7d1',
        secondary: '#95a1a1',
        tertiary: '#606868',
        dark: '#264653',
        primaryorange: '#e76f51',
        accentorange: '#f4a261',
        primaryblue: '#264653',
        accentblue: '#2a9d8f'
      }
    },
  },
  plugins: [],
}

