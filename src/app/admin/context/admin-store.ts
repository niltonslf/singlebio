import {
  doc,
  query,
  collection,
  orderBy,
  getDocs,
  updateDoc,
  setDoc,
  deleteDoc,
} from 'firebase/firestore'
import {makeAutoObservable} from 'mobx'

import {ERROR_MESSAGES} from '@/constants/error-msgs'
import {PageLink, SocialPage, User, UserFeature} from '@/domain/models'
import {db} from '@/services/firebase'

class AdminStore {
  constructor() {
    makeAutoObservable(this)
  }

  user: User | undefined = undefined
  socialPages: SocialPage[] = []
  pageLinks: PageLink[] = []
  features: UserFeature[] = []

  public setUser(user?: User): void {
    this.user = user
  }

  public setSocialPages(socialPages: SocialPage[]): void {
    this.socialPages = socialPages
  }

  public setPageLinks(pageLinks: PageLink[]): void {
    this.pageLinks = pageLinks
  }

  public setFeatures(features: UserFeature[]): void {
    this.features = features
  }

  public reset(): void {
    this.user = undefined
    this.socialPages = []
    this.pageLinks = []
  }

  public async reloadPageLinks() {
    const data = await this.fetchPageLinks()
    this.setPageLinks(data)
  }

  public async reloadSocialPages() {
    const data = await this.fetchSocialPages()
    this.setSocialPages(data)
  }

  public async reloadFeatures() {
    const data = await this.fetchFeatures()
    this.setFeatures(data)
  }

  public async fetchPageLinks(): Promise<PageLink[]> {
    if (!this?.user) throw ERROR_MESSAGES['user-not-found']

    const userRef = doc(db, 'users', this.user.uid)
    // TODO: invert links order to asc
    const q = query(collection(userRef, 'links'), orderBy('order', 'desc'))
    const res = await getDocs(q)

    if (res.empty) return []

    return res.docs.map(link => link.data()) as PageLink[]
  }

  public async fetchSocialPages(): Promise<SocialPage[]> {
    if (!this?.user) throw ERROR_MESSAGES['user-not-found']

    const userRef = doc(db, 'users', this.user.uid)
    const q = query(collection(userRef, 'socialPages'), orderBy('order', 'asc'))
    const res = await getDocs(q)

    if (res.empty) return []

    return res.docs.map(social => social.data()) as SocialPage[]
  }

  public async fetchFeatures(): Promise<UserFeature[]> {
    if (!this?.user) throw ERROR_MESSAGES['user-not-found']

    const userRef = doc(db, 'users', this.user.uid)
    const q = query(collection(userRef, 'features'), orderBy('order', 'asc'))
    const res = await getDocs(q)

    if (res.empty) return []

    return res.docs.map(feat => feat.data()) as UserFeature[]
  }

  public async fetchData(): Promise<void> {
    const [links, socialPages, features] = await Promise.all([
      this.fetchPageLinks(),
      this.fetchSocialPages(),
      this.fetchFeatures(),
    ])

    this.setPageLinks(links)
    this.setSocialPages(socialPages)
    this.setFeatures(features)
  }

  public async updateUser(user: Partial<User>): Promise<User> {
    if (!this?.user?.uid) throw ERROR_MESSAGES['user-not-found']

    const newUser = {...this?.user, ...user} as User
    await updateDoc(doc(db, 'users', this?.user?.uid), user)

    this.setUser(newUser)
    return newUser
  }

  public async insertFeature(feature: UserFeature): Promise<UserFeature> {
    if (!this?.user?.uid) throw ERROR_MESSAGES['user-not-found']

    const featRef = doc(db, 'users', this?.user?.uid, 'features', feature.id)
    await setDoc(featRef, feature)
    return feature
  }

  public async deleteFeature(featId: string): Promise<void> {
    if (!this?.user?.uid) throw ERROR_MESSAGES['user-not-found']

    const featRef = doc(db, 'users', this?.user?.uid, 'features', featId)
    await deleteDoc(featRef)
  }
}

export const adminStore = new AdminStore()
