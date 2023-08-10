// https://tailwindcss.nuxtjs.org/tailwind/config
import forms from '@tailwindcss/forms';
import type { Config } from 'tailwindcss';

export default <Partial<Config>>{
  plugins: [forms],
  safelist: [
    'safelisted',
    'md:bg-transparent',
    {
      pattern:
        /bg-(anemo|cryo|dendro|electro|geo|hydro|pyro|)-(100|200|300|400|500|600|700|800|900)/,
      variants: ['active', 'hover'],
    },
  ],
  theme: {
    extend: {
      screens: {
        xs: '500px',
      },
    },
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#FFFFFF',
      black: {
        100: '#BCBBBB',
        200: '#A5A5A5',
        300: '#8F8E8E',
        400: '#727272',
        500: '#575656',
        600: '#3A3A3A',
        700: '#2C2C2C',
        800: '#1E1E1E',
        900: '#101010',
      },
      primary: {
        100: '#FBCB74',
        500: '#FABE51',
        700: '#7B530B',
      },
      error: {
        100: '#F28585',
        500: '#E01414',
        700: '#680A0A',
      },
      anemo: {
        100: '#94FBEE',
        500: '#00ECCC',
        700: '#00342E',
      },
      cryo: {
        100: '#BCF3F7',
        500: '#2ABDC6',
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
        100: '#F09670',
        200: '#ED8C62',
        300: '#E87747',
        400: '#E2632B',
        500: '#DD4E10',
        600: '#BF430E',
        700: '#A0380C',
        800: '#822E09',
        900: '#732808',
      },
    },
  },
};
