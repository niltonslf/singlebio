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
          'primary': '#B50048' /* Primary color */,
          'primary-focus': '#820033' /* Primary color - focused */,
          'primary-content': '#faf7f5' /* Foreground content color */,

          'secondary': '#8d1f59' /* Secondary color */,
          'secondary-focus': '#5b1339' /* Secondary color - focused */,
          'secondary-content': '#faf7f5' /* Foreground content color */,

          'accent': '#478c18' /* Accent color */,
          'accent-focus': '#203f0a' /* Accent color - focused */,
          'accent-content': '#faf7f5' /* Foreground content color  */,

          'neutral': '#1e1e24' /* Neutral color */,
          'neutral-focus': '#1a1a1f' /* Neutral color - focused */,
          'neutral-content': '#ebecf0' /* Foreground content color */,

          'base-100': '#23232a' /* Base color of page, used for blank bg */,
          'base-200': '#1a1a1f' /* Base color, a little darker */,
          'base-300': '#17171d' /* Base color, even more darker */,
          'base-content': '#ebecf0' /* Foreground content color  */,

          'info': '#1c92f2' /* Info */,
          'success': '#15a99a' /* Success */,
          'warning': '#ffaa2b' /* Warning */,
          'error': '#ed5d63' /* Error */,

          '--rounded-box': '.5rem',
          '--rounded-btn': '.5rem',
        },
      },
      {
        light: {
          'primary': '#6d0b74' /* Primary color */,
          'primary-focus': '#410745' /* Primary color - focused */,
          'primary-content': '#faf7f5' /* Foreground content color */,

          'secondary': '#007ebd' /* Secondary color */,
          'secondary-focus': '#005c8a' /* Secondary color - focused */,
          'secondary-content': '#faf7f5' /* Foreground content color */,

          'accent': '#f88913' /* Accent color */,
          'accent-focus': '#cb6c06' /* Accent color - focused */,
          'accent-content': '#faf7f5' /* Foreground content color  */,

          'neutral': '#1e2734' /* Neutral color */,
          'neutral-focus': '#111827' /* Neutral color - focused */,
          'neutral-content': '#faf7f5' /* Foreground content color */,

          'base-100': '#faf7f5' /* Base color of page, used for blank bg */,
          'base-200': '#efeae6' /* Base color, a little darker */,
          'base-300': '#e7e2df' /* Base color, even more darker */,
          'base-content': '#1e2734' /* Foreground content color  */,

          'info': '#1c92f2' /* Info */,
          'success': '#15a99a' /* Success */,
          'warning': '#ffaa2b' /* Warning */,
          'error': '#ed5d63' /* Error */,
        },
      },
    ],
    default: 'dark',
    darkTheme: 'dark',
  },
}
export default config
