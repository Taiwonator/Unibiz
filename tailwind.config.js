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
    fontFamily: {
      sans: ['Plus Jakarta Sans', 'monospace'],
    },
    screens: {
      xxs: '360px',
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
      gridTemplateRows: {},
      transitionProperty: {
        width: 'width',
        opacity: 'opacity',
      },
      minWidth: {
        sidebar: '18.75rem',
      },
      maxWidth: {
        1: '1rem',
        2: '2rem',
        3: '3rem',
        4: '4rem',
        5: '5rem',
        sidebar: '18.75rem',
      },
      width: {
        30: '7.5rem',
        sidebar: '18.75rem',
      },
      colors: {
        black: '#000000',
        darkgrey: '#333333',
        grey: '#545454',
        lightergrey: '#828282',
        white: '#FFFFFF',
        red: '#E4332F',
        green: '#00CB6D',
        purple: '#9B51E0',
        grey0: '#FAFAFA',
        grey1: '#F1F1F1',
        grey2: '#EAEAEA',
        grey3: '#C7C7C7',
        grey4: '#999999',
        grey5: '#676767',
        positivelight: '#69FFBA',
        positive: '#00CB6D',
        positivedark: '#219653',
        warning: '#FFF7DF',
        warningdark: '#CC9A00',
        error: '#FFE4E4',
        errordark: '#BD2929',
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

        '4xl': '2rem',
        '5xl': '2.25rem',
        '6xl': '2.5rem',
      },
    },
  },
  plugins: [
    require('daisyui'),
    function ({ addVariant }) {
      addVariant('child', '& > *');
      addVariant('child-hover', '& > *:hover');
    },
  ],
};
