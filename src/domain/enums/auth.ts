export const Providers = {
  GITHUB: 'github.com',
  GOOGLE: 'google.com',
  PASSWORD: 'password',
} as const

export type ProvidersValues = (typeof Providers)[keyof typeof Providers]
