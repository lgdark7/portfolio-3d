/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: {
          DEFAULT: '#FCF9F5',
          light: '#FFFFFF',
          dark: '#F2EBE1',
          accent: '#EBE2D5',
        },
        ink: {
          DEFAULT: '#14303F',
          soft: '#2D4E63',
          faint: '#7A919E',
        },
        hoodie: {
          DEFAULT: '#E45C4C',
          light: '#F07567',
          dark: '#C73F2F',
        },
        cheese: {
          DEFAULT: '#FFD166',
          light: '#FFE29A',
          dark: '#E5B84A',
        },
        mint: {
          DEFAULT: '#06D6A0',
          light: '#3AE5B7',
          dark: '#04A57B',
        },
        retro: {
          blue: '#118AB2',
          navy: '#073B4C',
          purple: '#70587C',
        }
      },
      fontFamily: {
        comic: ['"Comic Neue"', 'proxima-nova', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'ink': '3px 3px 0px #14303F',
        'ink-lg': '6px 6px 0px #14303F',
        'ink-xl': '8px 8px 0px #14303F',
        'ink-sm': '2px 2px 0px #14303F',
      }
    },
  },
  plugins: [],
}
