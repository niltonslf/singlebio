import {
  EmailAuthProvider,
  User as FbUser,
  createUserWithEmailAndPassword,
  deleteUser,
  reauthenticateWithCredential,
  reauthenticateWithPopup,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword as signInWithEmailAndPasswordFB,
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
import {ErrorMessagesKeys, ERROR_MESSAGES} from '@/constants/error-msgs'
import {Providers, ProvidersValues} from '@/domain/enums'
import {SignUpWithEmailAndPassword, User} from '@/domain/models'
import {auth, db, githubProvider, googleProvider} from '@/services/firebase'
import {createPopup, parseToUser} from '@/utils'

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
      setFirebaseUser: action,
      clearUser: action,
      resetPassword: action,
      reauthenticateWithEmailAndPassword: action,
      reauthenticateByProvider: action,
      deleteUserLinks: action,

      //computed
      user: computed,
    })
  }

  get user() {
    return this.userModel
  }

  public async signInWithGoogle(): Promise<void> {
    try {
      const {user} = await signInWithPopup(auth, googleProvider)
      return this.authUser(user)
    } catch (error: any) {
      const code = error?.code as ErrorMessagesKeys
      if (ERROR_MESSAGES[code]) throw ERROR_MESSAGES[code]
      throw ERROR_MESSAGES['error-to-authenticate-user']
    }
  }

  public async signInWithGithub(): Promise<void> {
    try {
      const {user} = await signInWithPopup(auth, githubProvider)
      return this.authUser(user)
    } catch (error: any) {
      const code = error?.code as ErrorMessagesKeys
      if (ERROR_MESSAGES[code]) throw ERROR_MESSAGES[code]
      throw ERROR_MESSAGES['error-to-authenticate-user']
    }
  }

  public async createWithEmailAndPassword({
    email,
    password,
    displayName,
  }: SignUpWithEmailAndPassword): Promise<void> {
    try {
      const continueUrl = `${APP_URL}/auth`
      const {user} = await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(user, {displayName})
      await sendEmailVerification(user, {url: continueUrl})
      await this.authUser({...user, displayName})
      await this.logout()
    } catch (error: any) {
      const code = error?.code as ErrorMessagesKeys

      if (ERROR_MESSAGES[code]) throw ERROR_MESSAGES[code]
      throw ERROR_MESSAGES['error-to-create-account']
    }
  }

  public async signInWithEmailAndPassword(
    email: string,
    password: string,
  ): Promise<void> {
    try {
      const {user} = await signInWithEmailAndPasswordFB(auth, email, password)
      return this.authUser(user)
    } catch (error: any) {
      const code = error?.code as ErrorMessagesKeys

      if (ERROR_MESSAGES[code]) throw ERROR_MESSAGES[code]
      throw ERROR_MESSAGES['error-to-authenticate-user']
    }
  }

  public async authUser(firebaseUser: FbUser): Promise<void> {
    this.setFirebaseUser(firebaseUser)

    const res = await this.fetchFirebaseUser(firebaseUser)

    if (res.exists() && res.data()) {
      return this.setUser(res.data() as User)
    }

    // create new user
    const newUser = parseToUser(firebaseUser)
    await setDoc(doc(db, 'users', newUser.uid), newUser)

    this.setUser({...newUser})
  }

  private async fetchFirebaseUser(
    firebaseUser: FbUser,
  ): Promise<DocumentSnapshot<any, any>> {
    return await getDoc(doc(db, 'users', firebaseUser.uid))
  }

  public async updateUser(user: Partial<User>): Promise<User> {
    if (!this?.user?.uid) throw ERROR_MESSAGES['user-not-found']

    const newUser = {...this.user, ...user} as User

    this.setUser(newUser)

    await updateDoc(doc(db, 'users', this.user.uid), user)
    return newUser
  }

  public setUser(user?: User): void {
    this.userModel = user
  }

  public setFirebaseUser(firebaseUser?: FbUser): void {
    this.firebaseUser = firebaseUser
  }

  public clearUser(): void {
    this.userModel = undefined
    this.firebaseUser = undefined
  }

  public async logout(): Promise<void> {
    return await signOut(auth)
  }

  public async deleteUser(): Promise<void> {
    if (!this.user || !this.firebaseUser) throw ERROR_MESSAGES['user-not-found']

    const userProvider = this.firebaseUser?.providerData[0].providerId

    await this.reauthenticateByProvider(
      userProvider as ProvidersValues,
      this.firebaseUser,
    )

    await this.deleteUserLinks(this.user)

    await deleteDoc(doc(db, 'users', this.user.uid))
    await deleteUser(this.firebaseUser)
    this.clearUser()
  }

  public async reauthenticateByProvider(
    providerId: ProvidersValues,
    firebaseUser: FbUser,
  ) {
    if (providerId === Providers.PASSWORD) {
      return await createPopup('/auth/reauthenticate')
    }

    const provider = {
      [Providers.GOOGLE]: googleProvider,
      [Providers.GITHUB]: githubProvider,
    }

    await reauthenticateWithPopup(firebaseUser, provider[providerId])
  }

  public async deleteUserLinks(user: User) {
    const queryLinks = query(collection(db, 'users', user.uid, 'links'))
    const {size, docs} = await getDocs(queryLinks)

    if (size) {
      for await (const linkDoc of docs) {
        await deleteDoc(doc(db, linkDoc.ref.path))
      }
    }
  }

  public async resetPassword(email: string) {
    await sendPasswordResetEmail(auth, email, {url: `${APP_URL}/auth`})
  }

  public async reauthenticateWithEmailAndPassword(
    email: string,
    password: string,
    currentUser: FbUser | null,
  ) {
    if (!currentUser) throw ERROR_MESSAGES['user-not-found']

    try {
      const credential = EmailAuthProvider.credential(email, password)
      await reauthenticateWithCredential(currentUser, credential)
    } catch (error: any) {
      const code = error?.code as ErrorMessagesKeys

      if (ERROR_MESSAGES[code]) throw ERROR_MESSAGES[code]

      throw ERROR_MESSAGES['error-to-authenticate-user']
    }
  }
}

export const authStore = new AuthStore()
