/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        'cart-badge-pop': {
          '0%': { transform: 'scale(0.88)' },
          '45%': { transform: 'scale(1.18)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        'cart-badge-pop': 'cart-badge-pop 0.32s ease-out',
      },
    },
  },
  plugins: [],
}