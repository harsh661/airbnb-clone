/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        'light-gray': '#717171',
        'dark-gray': '#222222',
        'hover-gray': '#F7F7F7',
        'border-gray': '#DDDDDD',
        'accent-pink': '#FF385C',
      },
      screens: {
        'large': '1440px',
        'medium': '1128px',
        'small': '950px',
        'phone': '744px'
      }
    },
  },
  plugins: [],
}
