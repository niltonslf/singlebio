import {User as FbUser} from 'firebase/auth'
import {makeAutoObservable} from 'mobx'

import {User} from '@/models'

class AuthState {
  public user: User = {} as User
  public firebaseUser: FbUser = {} as FbUser

  constructor() {
    makeAutoObservable(this)
  }

  public authUser(firebaseUser: FbUser) {
    this.user = this.makeUser(firebaseUser)
    this.firebaseUser = firebaseUser
  }

  public updateUser(user: User) {
    this.user = user
  }

  private makeUser(firebaseUser: FbUser): User {
    if (!firebaseUser.email || !firebaseUser.uid)
      throw new Error('email and uid are required.')

    return {
      email: firebaseUser.email,
      name: firebaseUser.displayName || '',
      pictureUrl: firebaseUser.photoURL || '',
      uid: firebaseUser.uid,
      userName: firebaseUser.email,
    }
  }
}

export const authState = new AuthState()
