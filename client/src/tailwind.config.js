// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      animation: {
        'slide-in-from-bottom': 'slideInFromBottom 0.3s ease-out',
        'slide-in-from-top': 'slideInFromTop 0.3s ease-out',
      },
      keyframes: {
        slideInFromBottom: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        slideInFromTop: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(0)' },
        },
      },
    },
  },
}


module.exports = {
  theme: {
    extend: {},
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.scrollbar-hide': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
          '&::-webkit-scrollbar': {
            display: 'none'
          }
        }
      })
    }
  ]
}