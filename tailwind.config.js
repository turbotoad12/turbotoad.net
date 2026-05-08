/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './app.vue',
  ],
  theme: {
    extend: {
      colors: {
        'neon': {
          'pink': '#FF1493',
          'purple': '#9D4EDD',
          'blue': '#3A86FF',
          'cyan': '#00D9FF',
          'green': '#06FFA5',
          'yellow': '#FFE500',
          'orange': '#FF6B35',
        },
      },
      backgroundImage: {
        'gradient-retro': 'linear-gradient(135deg, #FF1493, #9D4EDD, #3A86FF)',
        'gradient-warm': 'linear-gradient(135deg, #FF6B35, #FFE500, #06FFA5)',
        'gradient-cool': 'linear-gradient(135deg, #3A86FF, #00D9FF, #06FFA5)',
      },
    },
  },
  plugins: [],
}
