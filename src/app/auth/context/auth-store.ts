import {
  User as FbUser,
  deleteUser,
  getAuth,
  reauthenticateWithPopup,
} from 'firebase/auth'
import {deleteDoc, doc, getDoc, setDoc} from 'firebase/firestore'
import {action, makeObservable, observable} from 'mobx'

import {app, db, provider} from '@/libs/firebase'
import {User} from '@/models'
import {parseToUser} from '@/utils/user'

type FetchFirebaseUserReturn = {
  user: User | undefined
  exists: boolean
}

export class AuthStore {
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
      clearUser: action,
    })
  }

  public async authUser(firebaseUser: FbUser | null) {
    if (!firebaseUser) {
      this.isLoading = false
      this.firebaseUser = undefined
      return
    }

    this.firebaseUser = firebaseUser

    const {exists, user} = await this.fetchFirebaseUser(firebaseUser)

    if (exists) {
      this.user = user
      this.isLoading = false
      return
    }

    const newUser = parseToUser(firebaseUser)
    await setDoc(doc(db, 'users', newUser.uid), newUser)

    this.user = {...newUser, userName: ''}
    this.isLoading = false
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
