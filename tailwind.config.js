/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,vue}",
  ],
  theme: {
    extend: {
      colors: {
        pyro: '#EF7938',
        electro: '#AC3DE8',
        dendro: '#A5C83B',
        hydro: '#12BBFE',
        geo: '#EA9D06',
        anemo:'#27B888',
        cryo: '#61C7DF',
        
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

