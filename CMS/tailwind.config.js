/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#F97316', // Naranja corporativo
        secondary: '#0EA5E9', // Azul vibrante
        background: '#F8FAFC',
        surface: '#FFFFFF',
      }
    },
  },
  plugins: [],
}
