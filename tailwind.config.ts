import type {Config} from 'tailwindcss'

const config: Config = {
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
      'light',
      'dark',
      {
        custom: {
          'primary': '#B50048',
          'secondary': '#C2EABD',
          'accent': '#F9DC5C',
          'neutral': '#25252c',
          'base-100': '#1a1a1f',
          'info': '#0047B3',
          'success': '#00B36B',
          'warning': '#B36B00',
          'error': '#B5000A',
        },
      },
    ],
    default: 'dark',
    darkTheme: 'custom',
  },
}
export default config
