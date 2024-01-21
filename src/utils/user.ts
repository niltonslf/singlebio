import {User as FbUser} from 'firebase/auth'

import {User, UserTheme} from '@/domain/models'

export const parseToUser = (
  firebaseUser: FbUser,
  username?: string,
  theme?: UserTheme,
): User => {
  if (!firebaseUser.email || !firebaseUser.uid)
    throw new Error('email and uid are required.')

  const fallbackName = firebaseUser.email.split('@')[0]

  const response: User = {
    email: firebaseUser.email,
    name: firebaseUser.displayName || fallbackName,
    pictureUrl: firebaseUser.photoURL || '',
    uid: firebaseUser.uid,
    pageViews: 0,
  }

  if (theme) response.theme = theme
  if (username) response.username = username

  return response
}
