/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js" // Add this line
  ],
  theme: {
    extend: {
      backgroundImage: {
        'signup-bg': "url('https://t3.ftcdn.net/jpg/03/55/60/70/360_F_355607062_zYMS8jaz4SfoykpWz5oViRVKL32IabTP.jpg')",
      },
    },
  },
  plugins: [
    require('flowbite/plugin'), // Add this line
  ],
}
