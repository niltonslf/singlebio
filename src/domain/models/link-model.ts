export type Link = {
  id: string
  url: string
  label: string
  order: number
  clicks: number
}

export type LinkCreation = Omit<Link, 'id'>
