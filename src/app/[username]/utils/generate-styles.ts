import {CSSProperties} from 'react'

import {User, UserTheme} from '@/models'

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

  // console.log({styles})

  return styles
}
