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
  plugins: [
    require('@sira-ui/tailwind')({
      themes: [
        {
          name: 'dark',
          colorScheme: 'dark',
          prefersColorScheme: true,
          colors: {
            primary: '#B50048',
            secondary: [
              '#020101',
              '#26100E',
              '#4B1F1B',
              '#6F2E27',
              '#933D34',
              '#B74C41', //
              '#DB5B4E',
              '#DE5A5D',
              '#E06677',
              '#E3728F',
              '#E67EA5',
              '#E88AB8',
              '#EB96C9',
            ],
            background: '#1A1A1F',
            danger: '#ff086c',
            // warn: '#d48806',
          },
        },
      ],
    }),
  ],
}
export default config
