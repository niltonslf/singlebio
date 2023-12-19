type MakeUrlProps = {
  backgroundImage?: string
  backgroundColor?: string
  buttonBackground?: string
  buttonTextColor?: string
  usernameColor?: string
}

export const themeToQuery = ({...props}: MakeUrlProps) => {
  const url = new URLSearchParams()

  if (props?.backgroundImage)
    url.set('backgroundImage', encodeURIComponent(props?.backgroundImage))

  if (props?.backgroundColor)
    url.set('backgroundColor', encodeURIComponent(props?.backgroundColor))

  if (props?.buttonBackground)
    url.set('buttonBackground', encodeURIComponent(props?.buttonBackground))

  if (props?.usernameColor)
    url.set('usernameColor', encodeURIComponent(props?.usernameColor))

  if (props?.buttonTextColor)
    url.set('buttonTextColor', encodeURIComponent(props?.buttonTextColor))

  return url.toString()
}
