export type ThemeButtonStyles =
  | 'default'
  | 'square'
  | 'circle'
  | 'circle-outline'
  | 'square-outline'
  | 'outline'

export type UserTheme = {
  backgroundImage: string
  backgroundColor: string

  buttonBackground: string
  buttonTextColor: string
  buttonStyle: ThemeButtonStyles

  usernameColor: string

  socialIconColor: string
  socialDefaultColor: boolean

  name: string
}
