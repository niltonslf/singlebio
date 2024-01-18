import {
  User as FbUser,
  createUserWithEmailAndPassword,
  deleteUser,
  getAuth,
  reauthenticateWithPopup,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
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

import {APP_URL} from '@/config/envs'
import {app, auth, db, githubProvider, googleProvider} from '@/libs/firebase'
import {Providers, SignUpWithEmailAndPassword, User} from '@/models'
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
      signInWithGithub: action,
      signInWithEmailAndPassword: action,
      createWithEmailAndPassword: action,
      authUser: action,
      updateUser: action,
      logout: action,
      deleteUser: action,
      setUser: action,
      clearUser: action,
      resetPassword: action,
      //computed
      user: computed,
    })
  }

  get user() {
    return this.userModel
  }

  public async signInWithGoogle(): Promise<User> {
    try {
      const {user} = await signInWithPopup(auth, googleProvider)
      return this.authUser(user)
    } catch (error) {
      throw 'could not authenticate user'
    }
  }

  public async signInWithGithub(): Promise<User> {
    try {
      const {user} = await signInWithPopup(auth, githubProvider)
      return this.authUser(user)
    } catch (error) {
      throw 'could not authenticate user'
    }
  }

  public async createWithEmailAndPassword({
    email,
    password,
    displayName,
  }: SignUpWithEmailAndPassword): Promise<void> {
    try {
      const {user} = await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(user, {displayName})
      await sendEmailVerification(user)
      this.logout()
    } catch (error) {
      throw 'could not create user'
    }
  }

  public async signInWithEmailAndPassword(
    email: string,
    password: string,
  ): Promise<User> {
    try {
      const {user} = await signInWithEmailAndPassword(auth, email, password)

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

    const userProviderId = auth.currentUser.providerData[0].providerId
    // const width = 400
    // const height = 500

    // const y = window.top.outerHeight / 2 + window.top.screenY - height / 2
    // const x = window.top.outerWidth / 2 + window.top.screenX - width / 2

    // let newWindow = open(
    //   '/auth',
    //   'Sign in',
    //   `toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${width}, height=${height}, top=${y}, left=${x}`,
    // )

    if (userProviderId === Providers.PASSWORD) {
      // const credential = EmailAuthProvider.credential(email, password)
      // reauthenticateWithCredential(auth.currentUser, credential)
    } else {
      let providerInstance = googleProvider
      if (userProviderId === Providers.GITHUB) providerInstance = githubProvider
      await reauthenticateWithPopup(auth.currentUser, providerInstance)
    }

    // delete links
    const queryLinks = query(collection(db, 'users', this.user.uid, 'links'))
    const {size, docs} = await getDocs(queryLinks)

    if (size) {
      for await (const linkDoc of docs) {
        await deleteDoc(doc(db, linkDoc.ref.path))
      }
    }

    await deleteDoc(doc(db, 'users', this.user.uid))
    await deleteUser(auth.currentUser)
    this.clearUser()
  }

  public async resetPassword(email: string) {
    await sendPasswordResetEmail(auth, email, {url: `${APP_URL}/auth`})
  }
}

export const authStore = new AuthStore()
