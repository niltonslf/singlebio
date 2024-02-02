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

          'neutral': '#ebecf0' /* Neutral color */,
          'neutral-focus': '#b9b9bd' /* Neutral color - focused */,
          'neutral-content': '#121217' /* Foreground content color */,

          'base-100': '#23232a' /* Base color of page, used for blank bg */,
          'base-200': '#1B1B22' /* Base color, a little darker */,
          'base-300': '#121217' /* Base color, even more darker */,
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
          'primary': '#ff0065' /* Primary color */,
          'primary-focus': '#db0057' /* Primary color - focused */,
          'primary-content': '#e7e2df' /* Foreground content color */,

          'secondary': '#007ebd' /* Secondary color */,
          'secondary-focus': '#005c8a' /* Secondary color - focused */,
          'secondary-content': '#e7e2df' /* Foreground content color */,

          'accent': '#f88913' /* Accent color */,
          'accent-focus': '#cb6c06' /* Accent color - focused */,
          'accent-content': '#e7e2df' /* Foreground content color  */,

          'neutral': '#23232a' /* Neutral color */,
          'neutral-focus': '#1B1B22' /* Neutral color - focused */,
          'neutral-content': '#e7e2df' /* Foreground content color */,

          'base-100': '#faf7f5' /* Base color of page, used for blank bg */,
          'base-200': '#efeae6' /* Base color, a little darker */,
          'base-300': '#e7e2df' /* Base color, even more darker */,
          'base-content': '#23232a' /* Foreground content color  */,

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
