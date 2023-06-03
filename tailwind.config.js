/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,vue}",
  ],
  safelist: [
    'bg-cryo/75',
    'bg-electro/75',
    'bg-dendro/75',
    'bg-hydro/75',
    'bg-anemo/75',
    'bg-pyro/75',
    'bg-geo/75',
  ],
  theme: {
    extend: {
      colors: {
        pyro: '#EF7938',
        electro: '#AC3DE8',
        dendro: '#A5C83B',
        hydro: '#12BBFE',
        geo: '#EA9D06',
        anemo: '#27B888',
        cryo: '#61C7DF',
        b1: `#121212`,
        b2: `#A0A0A0`,
        b3: `#E7E7E7`,
        g1: `#99783D`,
        g2: `#FFC865`,
        g3: `#FFDEA3`,
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

