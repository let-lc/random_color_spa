module.exports = {
  content: ['./{pages,components}/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms')],
};
