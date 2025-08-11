// tailwind.config.js
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      screens: {
        xs: '375px',
        'xs-max': { 'max': '500px' },
        'xs-range': { 'min': '375px', 'max': '500px' }
      }
    },
  },
  plugins: [],
}
