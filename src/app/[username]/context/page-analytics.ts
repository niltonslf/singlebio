import {
  collection,
  doc,
  getDocs,
  limit,
  query,
  updateDoc,
  where,
} from 'firebase/firestore'
import {makeAutoObservable} from 'mobx'

import {Link, User} from '@/domain/models'
import {db} from '@/services/firebase'

class PageAnalytics {
  constructor() {
    makeAutoObservable(this)
  }

  public user?: User

  public setUser(user?: User) {
    this.user = user
  }

  public async updatePageView() {}

  public async updateLinkClick(url: string) {
    if (!this.user) return

    const linkCollectionRef = collection(db, 'users', this.user?.uid, 'links')
    const linkQuery = query(
      linkCollectionRef,
      where('url', '==', url),
      limit(1),
    )
    const linkDoc = await getDocs(linkQuery)
    const linkData = linkDoc.docs[0].data() as Link

    const newClicks = (linkData?.clicks || 0) + 1

    updateDoc(linkDoc.docs[0].ref, {clicks: newClicks})
  }

  public async updateSocialClick(url: string) {
    if (!this.user || !this.user?.social) return

    const changedItem = this.user.social?.find(social => social.url === url)

    if (!changedItem) return

    const newData = {...changedItem, clicks: (changedItem?.clicks || 0) + 1}
    const filter = this.user.social.filter(({url}) => url != changedItem?.url)
    const newSocialData = [...filter, newData]

    const userRef = doc(db, 'users', this.user.uid)
    await updateDoc(userRef, {social: newSocialData})
    this.setUser({...this.user, social: newSocialData})
  }
}

export const pageAnalytics = new PageAnalytics()
