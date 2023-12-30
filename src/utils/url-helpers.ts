export const validateUrlRegex = new RegExp(
  /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&\/\/=]*)/,
)

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

export const displayUrlShort = (
  username: string,
  isExternalUrl: boolean = false,
): string => {
  let fullURL = username

  if (!isExternalUrl) fullURL = parseUserPageUrl(username)

  const shortUrl = fullURL.replace(/http(s)?:(\/){2}/, '').replace('www.', '')

  return shortUrl
}
