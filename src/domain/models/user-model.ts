import {UserTheme} from '@/domain/models/user-theme-model'

export type User = {
  uid: string
  pictureUrl: string
  name: string
  email: string
  bio: string
  username: string
  theme: UserTheme
}
