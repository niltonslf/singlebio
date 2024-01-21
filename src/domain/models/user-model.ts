export type UserTheme = {
  backgroundImage: string
  backgroundColor: string
  buttonBackground: string
  buttonTextColor: string
  usernameColor: string
  socialIconColor: string
  socialDefaultColor: boolean
}

export type User = {
  uid: string
  pictureUrl: string
  name: string
  email: string
  bio?: string
  username?: string
  theme?: UserTheme
  pageViews: number
}
