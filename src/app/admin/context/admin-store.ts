import {doc, query, collection, orderBy, getDocs} from 'firebase/firestore'
import {makeAutoObservable} from 'mobx'

import {ERROR_MESSAGES} from '@/constants/error-msgs'
import {Link, SocialPage, User} from '@/domain/models'
import {db} from '@/services/firebase'

class AdminStore {
  constructor() {
    makeAutoObservable(this)
  }

  user: User | undefined = undefined
  socialPages: SocialPage[] = []
  pageLinks: Link[] = []

  public setUser(user?: User): void {
    this.user = user
  }

  public setSocialPages(socialPages: SocialPage[]): void {
    this.socialPages = socialPages
  }

  public setPageLinks(pageLinks: Link[]): void {
    this.pageLinks = pageLinks
  }

  public reset(): void {
    this.user = undefined
    this.socialPages = []
    this.pageLinks = []
  }

  public async fetchLinks(): Promise<Link[]> {}

  public async fetchSocialPages(): Promise<SocialPage[]> {
    if (!this?.user) throw ERROR_MESSAGES['user-not-found']

    const userRef = doc(db, 'users', this.user.uid)
    const q = query(
      collection(userRef, 'social-pages'),
      orderBy('order', 'asc'),
    )
    const socialReq = await getDocs(q)

    if (socialReq.empty) return []

    return socialReq.docs.map(social => social.data()) as SocialPage[]
  }

  public async fetchData(): Promise<void> {
    const [links, socialPages] = await Promise.all([
      this.fetchLinks(),
      this.fetchSocialPages(),
    ])

    this.setPageLinks(links)
    this.setSocialPages(socialPages)
  }
}

export const adminStore = new AdminStore()
