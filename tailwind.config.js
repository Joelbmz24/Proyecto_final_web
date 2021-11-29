module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {
      'roboto': ['Roboto', 'sans-serif'],
      'monserrat': ['Montserrat', 'san-serif'],
      'inter': ['Inter', 'san-serif'],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};