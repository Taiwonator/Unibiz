/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  purge: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/components/**/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: false,
  content: [],
  theme: {
    screens: {
      xs: '480px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1440px',
      '3xl': '1680px',
      uw: '2560px',
    },
    extend: {
      width: {},
      colors: {
        black: '#000000',
        darkgrey: '#333333',
        grey: '#545454',
        white: '#FFFFFF',
        red: '#E4332F',
        green: '#00CB6D',
      },
      fontSize: {
        'heading-xxs': '1rem',
        'heading-xs': '1.5rem',
        'heading-sm': '2.25rem',
        'heading-md': '3rem',
        'heading-lg': '4.5rem',
        'heading-xl': '6.25rem',
        'heading-2xl': '11.25rem',

        'body-xs': ' 0.75rem',
        'body-sm': ' 0.875rem',
        'body-md': ' 1rem',
        'body-lg': ' 1.125rem',
        'body-xl': ' 1.5rem',
      },
    },
  },
  plugins: [],
};
