export type SocialPage = {
  id: string
  url: string
  name: string
  order: number
}

export type SocialPageCreation = Omit<SocialPage, 'id'>
