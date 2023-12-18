import {
  User as FbUser,
  deleteUser,
  getAuth,
  reauthenticateWithPopup,
  signInWithPopup,
  signOut,
} from 'firebase/auth'
import {deleteDoc, doc, getDoc, setDoc} from 'firebase/firestore'
import {action, makeObservable, observable} from 'mobx'

import {app, auth, db, provider} from '@/libs/firebase'
import {User} from '@/models'
import {parseToUser} from '@/utils/user'

type FetchFirebaseUserReturn = {
  user: User | undefined
  exists: boolean
}

export class AuthStore {
  public user: User | undefined = undefined
  public firebaseUser: FbUser | undefined = undefined

  constructor() {
    makeObservable(this, {
      user: observable,
      firebaseUser: observable,
      signInWithGoogle: action,
      authUser: action,
      updateUser: action,
      logout: action,
      deleteUser: action,
      clearUser: action,
    })
  }

  public async signInWithGoogle() {
    try {
      const {user} = await signInWithPopup(auth, provider)
      return await authStore.authUser(user)
    } catch (error) {
      throw error
    }
  }

  public async authUser(firebaseUser: FbUser | null) {
    if (!firebaseUser) {
      this.clearUser()
      this.logout()
      return
    }

    this.firebaseUser = firebaseUser

    const {exists, user} = await this.fetchFirebaseUser(firebaseUser)

    if (exists && user) {
      this.updateUser(user)
      return
    }

    const newUser = parseToUser(firebaseUser)
    await setDoc(doc(db, 'users', newUser.uid), newUser)
    this.user = {...newUser, username: ''}
  }

  private async fetchFirebaseUser(
    firebaseUser: FbUser,
  ): Promise<FetchFirebaseUserReturn> {
    const res = await getDoc(doc(db, 'users', firebaseUser.uid))

    return {user: res.data() as User, exists: res.exists()}
  }

  public updateUser(user: User) {
    this.user = user
  }

  public clearUser() {
    this.user = undefined
    this.firebaseUser = undefined
  }

  public async logout() {
    return await signOut(auth)
  }

  public async deleteUser() {
    const auth = getAuth(app)

    if (!this.user || !auth.currentUser)
      throw new Error('Authenticated user not found.')

    await reauthenticateWithPopup(auth.currentUser, provider)
    await deleteUser(auth.currentUser)
    await deleteDoc(doc(db, 'users', this.user.uid))
    this.clearUser()
  }
}

export const authStore = new AuthStore()
