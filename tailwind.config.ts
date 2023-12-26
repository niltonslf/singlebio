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
          name: 'huecomundo',
          colorScheme: 'dark',
          prefersColorScheme: true,
        },
      ],
    }),
  ],
}
export default config
