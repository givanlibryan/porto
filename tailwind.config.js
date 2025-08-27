export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Nord Breeze (light frosty blues + deep navy)
        brand: {
          50: '#F0F4FA',
          100: '#E5E9F0',
          200: '#D8DEE9',
          300: '#C7D2E3',
          400: '#A5B8D6',
          500: '#5E81AC', // primary
          600: '#4C6B90',
          700: '#3B5574',
          800: '#2E425A',
          900: '#1F2E43',
          950: '#121A2B',
        },
        // soft accent (Nord Frost)
        accent: {
          400: '#88C0D0',
          500: '#81A1C1',
          600: '#8FBCC0',
        },
      },
    },
  },
  plugins: [],
};
