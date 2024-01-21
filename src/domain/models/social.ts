export type SocialLink = {
  id: string
  url: string
  name: string
  order: number
  clicks: number
}

export type SocialLinkCreation = Omit<SocialLink, 'id'>
