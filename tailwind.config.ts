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
            brand: [
              '#bb96e1',
              '#a97cda',
              '#9763d1',
              '#8349c9',
              '#6e2ec1',
              '#5707b8',
              '#9b87ad',
              '#836b99',
              '#6b5086',
              '#533672',
              '#3c1c60',
              '#23024d',
            ],
          },
        },
      ],
    }),
  ],
}
export default config
