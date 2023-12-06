import {User as FbUser, deleteUser, getAuth} from 'firebase/auth'
import {deleteDoc, doc} from 'firebase/firestore'
import {action, makeObservable, observable} from 'mobx'

import {db} from '@/libs/firebase'
import {User} from '@/models'

class AuthState {
  public user: User | undefined = undefined
  public firebaseUser: FbUser | undefined = undefined

  constructor() {
    makeObservable(this, {
      user: observable,
      firebaseUser: observable,
      authUser: action,
      updateUser: action,
      deleteUser: action,
      cleanUser: action,
    })
  }

  public authUser(firebaseUser: FbUser): User {
    this.user = this.makeUser(firebaseUser)
    this.firebaseUser = firebaseUser

    return this.user
  }

  public updateUser(user: User) {
    this.user = user
  }

  public cleanUser() {
    this.user = {} as User
    this.firebaseUser = {} as FbUser
  }

  public async deleteUser() {
    const user = getAuth()

    if (!this.user || !user.currentUser) return

    await deleteDoc(doc(db, 'users', this.user.uid))
    await deleteUser(user.currentUser)
    this.cleanUser()
  }

  private makeUser(firebaseUser: FbUser): User {
    if (!firebaseUser.email || !firebaseUser.uid)
      throw new Error('email and uid are required.')

    return {
      email: firebaseUser.email,
      name: firebaseUser.displayName || '',
      pictureUrl: firebaseUser.photoURL || '',
      uid: firebaseUser.uid,
      userName: '',
    }
  }
}

export const authState = new AuthState()
