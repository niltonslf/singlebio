import {User as FbUser} from 'firebase/auth'

import {User, UserTheme} from '@/domain/models'

export const parseToUser = (
  firebaseUser: FbUser,
  theme: UserTheme,
  username?: string,
): User => {
  if (!firebaseUser.email || !firebaseUser.uid)
    throw new Error('email and uid are required.')

  const fallbackName = firebaseUser.email.split('@')[0]

  const response: User = {
    email: firebaseUser.email,
    name: firebaseUser.displayName || fallbackName,
    pictureUrl: firebaseUser.photoURL || '',
    coverUrl: '',
    uid: firebaseUser.uid,
    theme: theme,
    username: username ?? '',
    bio: '',
  }

  return response
}
