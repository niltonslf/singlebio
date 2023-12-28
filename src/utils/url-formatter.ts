export const parseExternalUrl = (url: string): string => {
  const hasProtocol = url.match(/^http[s]?/) ? true : false

  if (hasProtocol) return url

  return `//${url}`
}
export const parseUserPageUrl = (username: string): string => {
  if (!username) return ''

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL
  return `${baseUrl}/${username}`
}
