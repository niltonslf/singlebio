import {UserTheme} from '@/domain/models/user-theme-model'

export type UserFeaturesList = keyof UserFeatures

export type UserFeatures = {
  pageLinks?: {
    order: number
  }
  socialPages?: {
    order: number
  }
  github?: {
    username?: string
    order: number
  }
  spotify?: {
    url?: string
    order: number
  }
}

export type User = {
  uid: string
  pictureUrl: string
  name: string
  email: string
  bio?: string
  username?: string
  theme: UserTheme
  features?: UserFeatures
}
