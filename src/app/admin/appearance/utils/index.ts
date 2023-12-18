type MakeUrlProps = {
  wallpaperUrl?: string
  colorOverlay?: string
  buttonColor?: string
  buttonTextColor?: string
  usernameColor?: string
}

export const makePreviewUrl = ({...props}: MakeUrlProps) => {
  const url = new URLSearchParams()
  url.set('wallpaperUrl', encodeURIComponent(props?.wallpaperUrl || '') ?? '')
  url.set('colorOverlay', encodeURIComponent(props?.colorOverlay || '') ?? '')
  url.set('buttonColor', encodeURIComponent(props?.buttonColor || '') ?? '')
  url.set('usernameColor', encodeURIComponent(props?.usernameColor || '') ?? '')
  url.set(
    'buttonTextColor',
    encodeURIComponent(props?.buttonTextColor || '') ?? '',
  )

  return url.toString()
}
