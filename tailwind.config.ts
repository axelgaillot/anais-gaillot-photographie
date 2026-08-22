import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#1C1A17',
        'ink-soft': '#6B6459',
        'ink-faint': '#A39B8C',
        paper: '#F2F0EB',
        'paper-raised': '#FFFFFF',
        tint: '#EAE7DF',
        accent: {
          DEFAULT: '#3E4F3B',
          deep: '#2A362A',
          soft: '#DCE2D6',
        },
      },
      fontFamily: {
        script: ['var(--font-script)'],
        display: ['var(--font-display)'],
        body: ['var(--font-body)'],
      },
      borderColor: {
        line: 'rgba(28, 26, 23, 0.13)',
      },
    },
  },
  plugins: [],
};

export default config;
