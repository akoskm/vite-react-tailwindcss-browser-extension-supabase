/** @type {import('tailwindcss').Config} */
module.exports = {
  important: '#extension-root',
  content: [
    "./content-script/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      padding: '2rem',
    }
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class'
    }),
  ],
}
