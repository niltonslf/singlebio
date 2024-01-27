import {UserTheme} from '@/domain/models/user-theme-model'

export type UserFeatures = {
  github: {
    username: string
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
