import {makeAutoObservable} from 'mobx'

import {Link, SocialPage, User} from '@/domain/models'

class AdminStore {
  constructor() {
    makeAutoObservable(this)
  }

  user: User | undefined = undefined
  socialPages: SocialPage[] | undefined = undefined
  pageLinks: Link[] | undefined = undefined

  public get getUser() {
    return this.user
  }

  public setUser(user?: User): void {
    this.user = user
  }

  public setSocialPages(socialPages?: SocialPage[]): void {
    this.socialPages = socialPages
  }

  public setPageLinks(pageLinks?: Link[]): void {
    this.pageLinks = pageLinks
  }

  public reset(): void {
    this.user = undefined
    this.socialPages = undefined
    this.pageLinks = undefined
  }
}

export const adminStore = new AdminStore()
