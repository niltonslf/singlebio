import {User as FbUser} from 'firebase/auth'

import {User} from '@/models'

export const parseToUser = (firebaseUser: FbUser): Omit<User, 'userName'> => {
  if (!firebaseUser.email || !firebaseUser.uid)
    throw new Error('email and uid are required.')

  const response = {
    email: firebaseUser.email,
    name: firebaseUser.displayName || '',
    pictureUrl: firebaseUser.photoURL || '',
    uid: firebaseUser.uid,
  }

  return response
}
