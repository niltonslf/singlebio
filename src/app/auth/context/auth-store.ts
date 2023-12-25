import {
  User as FbUser,
  deleteUser,
  getAuth,
  reauthenticateWithPopup,
  signInWithPopup,
  signOut,
} from 'firebase/auth'
import {
  DocumentSnapshot,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from 'firebase/firestore'
import {action, computed, makeObservable, observable} from 'mobx'

import {app, auth, db, provider} from '@/libs/firebase'
import {User} from '@/models'
import {parseToUser} from '@/utils/user'

class AuthStore {
  public userModel: User | undefined = undefined
  public firebaseUser: FbUser | undefined = undefined

  constructor() {
    makeObservable(this, {
      userModel: observable,
      firebaseUser: observable,
      //action
      signInWithGoogle: action,
      authUser: action,
      updateUser: action,
      logout: action,
      deleteUser: action,
      setUser: action,
      clearUser: action,
      //computed
      user: computed,
    })
  }

  get user() {
    return this.userModel
  }

  public async signInWithGoogle(): Promise<User> {
    try {
      const {user} = await signInWithPopup(auth, provider)
      return this.authUser(user)
    } catch (error) {
      throw 'could not authenticate user'
    }
  }

  public async authUser(firebaseUser: FbUser): Promise<User> {
    this.firebaseUser = firebaseUser

    const res = await this.fetchFirebaseUser(firebaseUser)

    if (res.exists() && res.data()) {
      const user = res.data() as User
      this.setUser(user)
      return user
    }

    const newUser = parseToUser(firebaseUser)
    await setDoc(doc(db, 'users', newUser.uid), newUser)
    this.userModel = {...newUser}
    return newUser
  }

  private async fetchFirebaseUser(
    firebaseUser: FbUser,
  ): Promise<DocumentSnapshot<any, any>> {
    return await getDoc(doc(db, 'users', firebaseUser.uid))
  }

  public async updateUser(user: Partial<User>) {
    if (!this.user) return

    const newUser = {
      ...this.user,
      ...user,
      username: user?.username ?? this.user.username,
    }

    this.setUser(newUser)
    return await updateDoc(doc(db, 'users', this.user.uid), user)
  }

  public setUser(user?: User) {
    this.userModel = user
  }

  public clearUser() {
    this.userModel = undefined
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
    await deleteDoc(doc(db, 'users', this.user.uid))
    await deleteUser(auth.currentUser)
    this.clearUser()
  }
}

export const authStore = new AuthStore()
