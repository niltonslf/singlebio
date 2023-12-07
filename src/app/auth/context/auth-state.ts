import {User as FbUser, deleteUser, getAuth} from 'firebase/auth'
import {deleteDoc, doc, getDoc, setDoc} from 'firebase/firestore'
import {action, makeObservable, observable} from 'mobx'

import {db} from '@/libs/firebase'
import {User} from '@/models'

class AuthState {
  public isLoading: boolean = true
  public user: User | undefined = undefined
  public firebaseUser: FbUser | undefined = undefined

  constructor() {
    makeObservable(this, {
      isLoading: observable,
      user: observable,
      firebaseUser: observable,
      authUser: action,
      updateUser: action,
      deleteUser: action,
      cleanUser: action,
    })
  }

  public async authUser(firebaseUser: FbUser | null) {
    if (!firebaseUser) {
      this.isLoading = false
      return
    }

    this.firebaseUser = firebaseUser

    const {exists, user} = await this.fetchFirebaseUser(firebaseUser)

    if (exists) {
      this.user = user
      this.isLoading = false
      return
    }

    const newUser = this.makeUser(firebaseUser)
    await setDoc(doc(db, 'users', newUser.uid), newUser)
    this.user = {...newUser, userName: ''}
    this.isLoading = false
  }

  private async fetchFirebaseUser(
    firebaseUser: FbUser,
  ): Promise<{user: User; exists: boolean}> {
    const res = await getDoc(doc(db, 'users', firebaseUser.uid))

    return {user: res.data() as User, exists: res.exists()}
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

  private makeUser(firebaseUser: FbUser): Omit<User, 'userName'> {
    if (!firebaseUser.email || !firebaseUser.uid)
      throw new Error('email and uid are required.')

    return {
      email: firebaseUser.email,
      name: firebaseUser.displayName || '',
      pictureUrl: firebaseUser.photoURL || '',
      uid: firebaseUser.uid,
    }
  }
}

export const authState = new AuthState()
