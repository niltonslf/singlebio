import {query, getDocs, collection} from 'firebase/firestore'
import {makeAutoObservable} from 'mobx'

import {PageViewsChartData, PageViewsRaw, User} from '@/domain/models'
import {db} from '@/services/firebase'

class AdminAnalyticsStore {
  constructor() {
    makeAutoObservable(this)
  }

  user?: User

  public setUser(user?: User) {
    this.user = user
  }

  public async fetchPageViews() {
    if (!this.user) return null

    const viewsCollectionRef = collection(
      db,
      'analytics',
      this.user?.uid,
      'page-views',
    )

    const viewsQuery = query(viewsCollectionRef)
    const viewsDocsRes = await getDocs(viewsQuery)

    if (viewsDocsRes.empty) return null

    // keep all references from each view entry
    const docsRef = viewsDocsRes.docs.map(doc => doc.ref)

    const viewsEntries = docsRef.map(async docRef => {
      const viewQuery = query(collection(db, docRef.path, 'view'))
      const viewDocs = await getDocs(viewQuery)

      const data = await viewDocs.docs.map(doc => doc.data())
      return {[docRef.id]: data}
    })

    const res = (await Promise.all(viewsEntries)) as PageViewsRaw[]

    return this.parsePageViewsData(res)
  }

  // eslint-disable-next-line no-unused-vars
  private parsePageViewsData(rawData: PageViewsRaw[]): PageViewsChartData {
    // const startPeriod = Object.keys(rawData[0])[0]
    // const endPeriod = Object.keys(rawData[rawData.length - 1])[0]

    return {
      categories: [],
      data: [],
    }
  }
}

export const adminAnalyticsStore = new AdminAnalyticsStore()
