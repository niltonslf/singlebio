export type PageLink = {
  id: string
  url: string
  label: string
  order: number
}

export type LinkCreation = Omit<PageLink, 'id'>
