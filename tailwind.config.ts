import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-image': "url('/images/hero-image.svg')",
      },
      fontFamily: {
        customFont: ['var(--font-sf-pro-display)'],
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};
export default config;
