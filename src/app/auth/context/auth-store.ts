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
import {action, makeObservable, observable} from 'mobx'

import {adminStore} from '@/app/admin/context/admin-store'
import {APP_URL} from '@/config/envs'
import {ErrorMessagesKeys, ERROR_MESSAGES} from '@/constants/error-msgs'
import {themeOptions} from '@/constants/theme-options'
import {AuthProviders, AuthProvidersOptions} from '@/domain/enums'
import {SignUpWithPassword, User} from '@/domain/models'
import {auth, db, githubProvider, googleProvider} from '@/services/firebase'
import {createPopup, parseToUser} from '@/utils'

class AuthStore {
  constructor() {
    makeObservable(this, {
      firebaseUser: observable,
      //action
      signInWithGoogle: action,
      signInWithGithub: action,
      signInWithEmailAndPassword: action,
      createWithEmailAndPassword: action,
      authOrCreateUser: action,
      updateUser: action,
      logout: action,
      deleteUser: action,
      setFirebaseUser: action,
      clearUser: action,
      resetPassword: action,
      reauthenticateWithEmailAndPassword: action,
      reauthenticateByProvider: action,
      deleteUserLinks: action,
    })
  }

  public firebaseUser: FbUser | undefined = undefined

  public async signInWithGoogle(): Promise<void> {
    try {
      const {user} = await signInWithPopup(auth, googleProvider)
      return this.authOrCreateUser(user)
    } catch (error: any) {
      const code = error?.code as ErrorMessagesKeys
      if (ERROR_MESSAGES[code]) throw ERROR_MESSAGES[code]
      throw ERROR_MESSAGES['error-to-authenticate-user']
    }
  }

  public async signInWithGithub(): Promise<void> {
    try {
      const {user} = await signInWithPopup(auth, githubProvider)
      return this.authOrCreateUser(user)
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
  }: SignUpWithPassword): Promise<void> {
    try {
      const continueUrl = `${APP_URL}/auth`
      const {user} = await createUserWithEmailAndPassword(auth, email, password)
      await updateProfile(user, {displayName})
      await sendEmailVerification(user, {url: continueUrl})
      await this.authOrCreateUser({...user, displayName})
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
      return this.authOrCreateUser(user)
    } catch (error: any) {
      const code = error?.code as ErrorMessagesKeys

      if (ERROR_MESSAGES[code]) throw ERROR_MESSAGES[code]
      throw ERROR_MESSAGES['error-to-authenticate-user']
    }
  }

  public async authOrCreateUser(firebaseUser: FbUser): Promise<void> {
    this.setFirebaseUser(firebaseUser)

    const res = await this.fetchFirebaseUser(firebaseUser)

    if (res.exists() && res.data()) {
      return adminStore.setUser(res.data() as User)
    }

    // create new user into the firestore
    const newUser = await this.persistUser(firebaseUser)
    adminStore.setUser({...newUser})
  }

  public async persistUser(firebaseUser: FbUser) {
    const defaultTheme = themeOptions['default'].defaultTheme
    const newUser = parseToUser(firebaseUser, defaultTheme)
    await setDoc(doc(db, 'users', newUser.uid), newUser)

    return newUser
  }

  private async fetchFirebaseUser(
    firebaseUser: FbUser,
  ): Promise<DocumentSnapshot<any, any>> {
    return await getDoc(doc(db, 'users', firebaseUser.uid))
  }

  public async updateUser(user: Partial<User>): Promise<User> {
    if (!adminStore?.user?.uid) throw ERROR_MESSAGES['user-not-found']

    const newUser = {...adminStore?.user, ...user} as User

    adminStore.setUser(newUser)

    await updateDoc(doc(db, 'users', adminStore?.user.uid), user)
    return newUser
  }

  public setFirebaseUser(firebaseUser?: FbUser): void {
    this.firebaseUser = firebaseUser
  }

  public clearUser(): void {
    this.firebaseUser = undefined
    adminStore.reset()
  }

  public async logout(): Promise<void> {
    return await signOut(auth)
  }

  public async deleteUser(): Promise<void> {
    if (!adminStore?.user || !this.firebaseUser)
      throw ERROR_MESSAGES['user-not-found']

    const userProvider = this.firebaseUser?.providerData[0].providerId

    await this.reauthenticateByProvider(
      userProvider as AuthProvidersOptions,
      this.firebaseUser,
    )

    await this.deleteUserLinks(adminStore?.user)

    await deleteDoc(doc(db, 'users', adminStore?.user.uid))
    await deleteUser(this.firebaseUser)
    this.clearUser()
  }

  public async reauthenticateByProvider(
    providerId: AuthProvidersOptions,
    firebaseUser: FbUser,
  ) {
    if (providerId === AuthProviders.PASSWORD) {
      return await createPopup('/auth/reauthenticate')
    }

    const provider = {
      [AuthProviders.GOOGLE]: googleProvider,
      [AuthProviders.GITHUB]: githubProvider,
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
