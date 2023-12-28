export const parseExternalUrl = (url: string): string => {
  const hasProtocol = url.match(/^http[s]?/) ? true : false

  if (hasProtocol) return url

  return `//${url}`
}
