module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'dark-turquoise': '#0f4c5c',
        'neon-blue': '#45e0e8',
        'neon-green': '#1985e7',
        'neon-white': '#efffff',
        'neon-purple': '#bffffe',
        'purple': '#1985e7',
        'grey': '#1985e7',
        'green': '1985e7',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // 'Inter' como sans-serif general
        serif: ['Playfair Display', 'serif'],
        nerko: ['Nerko One', 'cursive'], // Si 'Nerko One' es una fuente disponible en Google Fonts
      },
      backgroundImage: {
        'graffiti-wall': "url('/images/graffiti-wall.jpg')",
      },
      boxShadow: {
        neon: '0 0 5px #00ff8a, 0 0 20px #0094ff',
      },
      textShadow: {
        neon: '0 0 5px #00ff8a, 0 0 20px #0094ff',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.text-shadow-neon': {
          textShadow: '0 0 5px #39ff14, 0 0 20px #0094ff',
        },
      };
      addUtilities(newUtilities);
    }
  ],
};
