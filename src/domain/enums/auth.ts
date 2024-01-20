export const Providers = {
  GITHUB: 'github.com',
  GOOGLE: 'google.com',
  PASSWORD: 'password',
} as const

export type ProvidersValueType = (typeof Providers)[keyof typeof Providers]
