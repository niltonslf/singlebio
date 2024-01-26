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

class PageAnalyticsStore {
  constructor() {
    makeAutoObservable(this)
  }

  public user?: User

  public setUser(user?: User) {
    adminStore?.user = user
  }

  public async updatePageView() {
    if (!adminStore?.user) return

    const newPageViews = (adminStore?.user?.pageViews || 0) + 1

    const userRef = doc(db, 'users', adminStore?.user.uid)
    await updateDoc(userRef, {pageViews: newPageViews})
  }

  public async updateLinkClick(url: string) {
    if (!adminStore?.user) return

    const linkCollectionRef = collection(
      db,
      'users',
      adminStore?.user?.uid,
      'links',
    )
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
    return url
    // if (!adminStore?.user || !adminStore?.user?.social) return

    // const changedItem = adminStore?.user.social?.find(social => social.url === url)

    // if (!changedItem) return

    // const newData = {...changedItem, clicks: (changedItem?.clicks || 0) + 1}
    // const filter = adminStore?.user.social.filter(({url}) => url != changedItem?.url)
    // const newSocialData = [...filter, newData]

    // const userRef = doc(db, 'users', adminStore?.user.uid)
    // await updateDoc(userRef, {social: newSocialData})
    // this.setUser({...adminStore?.user, social: newSocialData})
  }
}

export const pageAnalyticsStore = new PageAnalyticsStore()
