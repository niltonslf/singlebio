export type SocialPage = {
  id: string
  url: string
  name: string
  order: number
  clicks: number
}

export type SocialPageCreation = Omit<SocialPage, 'id'>
