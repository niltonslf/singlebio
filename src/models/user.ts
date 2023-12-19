export type UserTheme = {
  backgroundImage: string
  backgroundColor: string
  buttonBackground: string
  buttonTextColor: string
  usernameColor: string
}

export type User = {
  uid: string
  pictureUrl: string
  username: string
  name: string
  email: string
  theme?: UserTheme
}
