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
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
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

  public async updateUser(user: Partial<User>): Promise<User> {
    if (!this?.user?.uid) throw 'user not found'

    const newUser = {...this.userModel, ...user} as User

    this.setUser(newUser)

    await updateDoc(doc(db, 'users', this.user.uid), user)
    return newUser
  }

  public setUser(user?: User): void {
    this.userModel = user
  }

  public clearUser(): void {
    this.userModel = undefined
    this.firebaseUser = undefined
  }

  public async logout(): Promise<void> {
    return await signOut(auth)
  }

  public async deleteUser(): Promise<void> {
    const auth = getAuth(app)

    if (!this.user?.uid || !auth.currentUser) throw 'User not found.'

    await reauthenticateWithPopup(auth.currentUser, provider)
    // delete links
    const queryLinks = query(collection(db, 'users', this.user.uid, 'links'))
    const {size, docs} = await getDocs(queryLinks)

    if (size) {
      for await (const linkDoc of docs) {
        await deleteDoc(doc(db, linkDoc.ref.path))
      }
    }

    // await deleteDoc(doc(db, 'users', this.user.uid, 'links'))
    await deleteDoc(doc(db, 'users', this.user.uid))
    await deleteUser(auth.currentUser)
    this.clearUser()
  }
}

export const authStore = new AuthStore()
