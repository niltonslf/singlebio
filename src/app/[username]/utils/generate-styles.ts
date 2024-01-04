import {User, UserTheme} from '@/models'

export const makePreviewStyles = (params: UserTheme) => {
  const styles: Record<keyof UserTheme, any> = {} as any

  if (params?.backgroundColor) {
    styles.backgroundColor = {
      backgroundColor: decodeURIComponent(params?.backgroundColor),
    }
  }

  if (params?.backgroundImage) {
    const decodedImage = decodeURIComponent(params?.backgroundImage)

    styles.backgroundImage = {
      backgroundImage: `url(${decodedImage})`,
      ...(styles?.backgroundColor ?? {}),
    }

    if (params?.usernameColor) {
      styles.usernameColor = {
        color: decodeURIComponent(params?.usernameColor),
      }
    }

    if (params?.buttonBackground) {
      styles.buttonBackground = decodeURIComponent(params?.buttonBackground)
    }

    if (params?.buttonTextColor) {
      styles.buttonTextColor = decodeURIComponent(params?.buttonTextColor)
    }

    if (params?.socialIconColor) {
      styles.socialIconColor = decodeURIComponent(params?.socialIconColor)
    }
  }

  return styles
}
export const makePageStyles = (user?: User) => {
  const styles: Record<keyof UserTheme, any> = {} as any

  if (!user) return styles

  if (user?.theme?.backgroundColor) {
    styles.backgroundColor = {
      backgroundColor: user?.theme?.backgroundColor,
    }
  }

  if (user?.theme?.backgroundImage) {
    styles.backgroundImage = {
      backgroundImage: `url(${user?.theme?.backgroundImage})`,
      ...(styles?.backgroundColor ?? {}),
    }

    if (user?.theme?.usernameColor) {
      styles.usernameColor = {
        color: user?.theme?.usernameColor,
      }
    }

    if (user?.theme?.buttonBackground) {
      styles.buttonBackground = user?.theme?.buttonBackground
    }

    if (user?.theme?.buttonTextColor) {
      styles.buttonTextColor = user?.theme?.buttonTextColor
    }

    if (user?.theme?.socialIconColor) {
      styles.socialIconColor = user?.theme?.socialIconColor
    }
  }

  return styles
}
