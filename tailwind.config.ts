import type {Config} from 'tailwindcss'

const config: Config = {
  darkMode: ['class', '[data-theme="dark"]'],

  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
  daisyui: {
    themes: [
      {
        dark: {
          'primary': '#B50048',
          'primary-focus': '#820033',
          'primary-content': '#faf7f5',

          'secondary': '#8d1f59',
          'accent': '#3b2c48',

          'neutral': '#1e1e24',
          'neutral-focus': '#1a1a1f',
          'neutral-content': '#ebecf0',

          'base-100': '#23232a',
          'base-200': '#1e1e24', // Base color. Used for Backgrounds
          'base-300': '#1a1a1f',
          'base-content': '#ebecf0', // Foreground color to use on base color

          'info': '#1c92f2',
          'success': '#009485',
          'warning': '#ff9900',
          'error': '#ff2424',
        },
      },
      {
        light: {
          'primary': '#6d0b74',
          'primary-focus': '#410745',
          'primary-content': '#faf7f5',

          'secondary': '#007ebd',
          'secondary-focus': '#005c8a',
          'secondary-content': '#faf7f5',

          'accent': '#f88913',
          'accent-focus': '#cb6c06',
          'accent-content': '#faf7f5',

          'neutral': '#1e2734',
          'neutral-focus': '#111827',
          'neutral-content': '#faf7f5',

          'base-100': '#faf7f5',
          'base-200': '#efeae6', // Base color. Used for Backgrounds
          'base-300': '#e7e2df',
          'base-content': '#1e2734', // Foreground color to use on base color

          'info': '#1c92f2',
          'success': '#009485',
          'warning': '#ff9900',
          'error': '#ff5724',
        },
      },
    ],
    default: 'dark',
    darkTheme: 'dark',
  },
}
export default config
