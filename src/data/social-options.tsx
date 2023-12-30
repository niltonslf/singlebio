export type SocialOption = {
  label: string
}

export type SocialOptions = Record<string, SocialOption>

export const socialOptions: SocialOptions = {
  email: {label: 'Email'},
  whatsapp: {label: 'Whatsapp'},
  instagram: {label: 'Instagram'},
  reddit: {label: 'Reddit'},
  behance: {label: 'Behance'},
  discord: {label: 'Discord'},
  dribbble: {label: 'Dribbble'},
  facebook: {label: 'Facebook'},
  github: {label: 'Github'},
  linkedin: {label: 'Linkedin'},
  spotify: {label: 'Spotify'},
  tiktok: {label: 'Tiktok'},
  telegram: {label: 'Telegram'},
  twitch: {label: 'Twitch'},
  twitter: {label: 'Twitter'},
  youtube: {label: 'Youtube'},
  x: {label: 'X'},
  others: {label: 'Others'},
}
