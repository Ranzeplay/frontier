/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        'sidemenu-full': 'calc(100% - 3rem)',
      },
    }
  },
  plugins: [
    require('@tailwindcss/typography')
  ],
}

