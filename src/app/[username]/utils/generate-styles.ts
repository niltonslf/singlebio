import {CSSProperties} from 'react'

import {ThemeButtonStyles, User, UserTheme} from '@/domain/models'

type StylesProps = {
  params?: UserTheme & {preview: string}
  user: User
}

type StylePropData = CSSProperties & {value?: string}
export type PageStylesObject = Record<keyof UserTheme, StylePropData>

export const makePageStyles = ({
  params,
  user,
}: StylesProps): PageStylesObject => {
  const isPreviewAccess = params?.preview === 'true'
  const source = isPreviewAccess ? params : user?.theme

  if (!source) return {} as PageStylesObject

  return stylesFactory(source, isPreviewAccess)
}

const stylesFactory = (source: UserTheme, isPreviewAccess: boolean) => {
  const styles: PageStylesObject = {} as any

  if (source?.backgroundColor) {
    styles.backgroundColor = {
      backgroundColor: decodeURIComponent(source?.backgroundColor),
    }
  }

  if (source?.backgroundImage) {
    const decodedImage = isPreviewAccess
      ? decodeURIComponent(source?.backgroundImage)
      : source?.backgroundImage

    styles.backgroundImage = {backgroundImage: `url(${decodedImage})`}
    Object.assign(styles.backgroundImage, styles?.backgroundColor)
  }

  if (source?.usernameColor) {
    styles.usernameColor = {
      color: decodeURIComponent(source?.usernameColor),
    }
  }

  if (source?.buttonBackground) {
    styles.buttonBackground = {
      value: decodeURIComponent(source?.buttonBackground),
    }
  }

  if (source?.buttonStyle) {
    const style = decodeURIComponent(source?.buttonStyle) as ThemeButtonStyles

    switch (style) {
      case 'square':
        styles.buttonStyle = {value: 'rounded-none border-none'}
        break
      case 'circle':
        styles.buttonStyle = {value: 'btn-circle border-none'}
        break
      case 'outline':
        styles.buttonStyle = {value: 'btn-outline'}
        break
      case 'circle-outline':
        styles.buttonStyle = {value: 'btn-circle btn-outline'}
        break
      case 'square-outline':
        styles.buttonStyle = {value: 'rounded-none btn-outline'}
        break

      default:
        styles.buttonStyle = {
          value: 'border-none',
        }
        break
    }
  }

  if (source?.buttonTextColor) {
    styles.buttonTextColor = {
      value: decodeURIComponent(source?.buttonTextColor),
    }
  }

  if (source?.socialIconColor) {
    styles.socialIconColor = {
      value: decodeURIComponent(source?.socialIconColor),
    }
  }

  return styles
}
