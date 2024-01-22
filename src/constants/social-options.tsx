export type SocialOption = {
  label: string
  baseUrl: string
}

export type SocialOptions = Record<string, SocialOption>

export const socialOptions: SocialOptions = {
  email: {
    label: 'Email',
    baseUrl: 'mailto:',
  },
  whatsapp: {
    label: 'Whatsapp',
    baseUrl: ' https://wa.me/1XXXXXXXXXX',
  },
  instagram: {
    label: 'Instagram',
    baseUrl: 'https://www.instagram.com/username',
  },
  reddit: {
    label: 'Reddit',
    baseUrl: 'https://reddit.com/u/username',
  },
  behance: {
    label: 'Behance',
    baseUrl: 'https://behance.net/username',
  },
  discord: {
    label: 'Discord',
    baseUrl: 'https://discord.com/invite/username',
  },
  dribbble: {
    label: 'Dribbble',
    baseUrl: 'https://dribbble.com/username',
  },
  facebook: {
    label: 'Facebook',
    baseUrl: 'https://facebook.com/pageurl',
  },
  github: {
    label: 'Github',
    baseUrl: 'https://github.com/username',
  },
  linkedin: {
    label: 'Linkedin',
    baseUrl: 'https://www.linkedin.com/in/username',
  },
  spotify: {
    label: 'Spotify',
    baseUrl: 'https://open.spotify.com/user/username',
  },
  tiktok: {
    label: 'Tiktok',
    baseUrl: 'https://www.tiktok.com/@username',
  },
  telegram: {
    label: 'Telegram',
    baseUrl: 'https://t.me/username',
  },
  twitch: {
    label: 'Twitch',
    baseUrl: 'https://twitch.tv/username',
  },
  x: {
    label: 'X',
    baseUrl: 'https://twitter.com/username',
  },
  youtube: {
    label: 'Youtube',
    baseUrl: 'https://www.youtube.com/@username',
  },
  sharethis: {
    label: 'Others',
    baseUrl: '',
  },
}
