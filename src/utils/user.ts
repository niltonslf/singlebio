import {User as FbUser} from 'firebase/auth'

import {User, UserTheme} from '@/models'

export const parseToUser = (
  firebaseUser: FbUser,
  username?: string,
  theme?: UserTheme,
): User => {
  if (!firebaseUser.email || !firebaseUser.uid)
    throw new Error('email and uid are required.')

  const response: User = {
    email: firebaseUser.email,
    name: firebaseUser.displayName || '',
    pictureUrl: firebaseUser.photoURL || '',
    uid: firebaseUser.uid,
  }

  if (theme) response.theme = theme
  if (username) response.username = username

  return response
}
