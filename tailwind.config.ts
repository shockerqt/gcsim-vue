// https://tailwindcss.nuxtjs.org/tailwind/config
import type { Config } from 'tailwindcss';
import forms from '@tailwindcss/forms';

export default <Partial<Config>>{
  plugins: [
    forms,
  ],
  safelist: [
    'safelisted',
    'md:bg-transparent',
    {
      pattern: /bg-(t|green|blue)-(100|200|300)/,
    },
  ],
  theme: {
    extend: {
      screens: {
        xs: '500px',
      },
    },
    colors: {
      transparent: '#00000000',
      black: {
        100: '#E9E8E8',
        400: '#2C2C2C',
        500: '#3A3A3A',
        600: '#1E1E1E',
        700: '#101010',
      },
      primary: {
        100: '#FBCB74',
        500: '#FABE51',
        700: '#7B530B',
      },
      error: {
        300: '#F28585',
        500: '#E01414',
        700: '#680A0A',
      },
      anemo: {
        300: '#94FBEE',
        500: '#00ECCC',
        700: '#00342E',
      },
      cryo: {
        100: '#BCF3F7',
        500: '#32DAE5',
        700: '#0E575B',
      },
      dendro: {
        100: '#7AE372',
        500: '#24B218',
        700: '#082805',
      },
      electro: {
        100: '#C8A7E1',
        500: '#823DB8',
        700: '#2B143C',
      },
      geo: {
        100: '#EEC678',
        500: '#D69416',
        700: '#593E09',
      },
      hydro: {
        100: '#9BBFF5',
        500: '#0D60DB',
        700: '#02122A',
      },
      pyro: {
        100: '#F3A07E',
        500: '#DD4E10',
        700: '#541D06',
      },

    },
  },
};
