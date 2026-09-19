/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],

  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#3B82F6', // Vibrant blue
          light: '#60A5FA',
          dark: '#2563EB',
        },
        accent: {
          DEFAULT: '#F97316', // Warm orange
          light: '#FB923C',
          dark: '#EA580C',
        },
        background: '#F8FAFC',
        surface: '#FFFFFF',
      }
    },
  },
  plugins: [],
}
