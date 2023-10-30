module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'pp-blue': '#3772fb',
        'pp-green': '#17db93',
        'pp-yellow': '#ffdd1f',
        'pp-orange': '#ff934f',
        'pp-pink': '#ff5c8d',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
