module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './packages/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography')({
      target: 'legacy',
    }),
    require('daisyui'),
  ],

  daisyui: {
    themes: ['lofi'],
  },

  // tweak some browsers
  important: true,
}
