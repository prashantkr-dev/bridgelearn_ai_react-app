/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'sans-serif'],
      },
      colors: {
        cream: {
          50: '#FDFBF7',
          100: '#F7F3EB',
          200: '#EFE8DA',
          300: '#E2D8C5',
        },
        sage: {
          50: '#F2F7F4',
          100: '#E1EDE6',
          200: '#C5DDD0',
          300: '#A4C8B4',
          600: '#4A7C64',
          700: '#39624F',
        },
        lavender: {
          50: '#F6F4FB',
          100: '#EBE6F6',
          200: '#D6CCEC',
          600: '#6B589B',
          700: '#55447E',
        },
        peach: {
          50: '#FDF5F1',
          100: '#FAE6DC',
          200: '#F4CBB8',
          600: '#C86D4B',
          700: '#A65537',
        },
        ink: {
          800: '#2A2D34',
          700: '#3E424C',
          600: '#545965',
          500: '#6D7380',
          400: '#8A909E',
        },
      },
    },
  },
  plugins: [],
};
