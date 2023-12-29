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
            secondary: '#7A00B5',
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
