export type UserTheme = {
  backgroundImage: string
  backgroundColor: string
  buttonBackground: string
  buttonTextColor: string
  usernameColor: string
}

export type UserSocial = Record<string, string>

export type User = {
  uid: string
  pictureUrl: string
  name: string
  email: string
  bio?: string
  username?: string
  theme?: UserTheme
  social?: UserSocial
}
