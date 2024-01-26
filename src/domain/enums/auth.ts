export const AuthProviders = {
  GITHUB: 'github.com',
  GOOGLE: 'google.com',
  PASSWORD: 'password',
} as const

export type AuthProvidersOptions =
  (typeof AuthProviders)[keyof typeof AuthProviders]
