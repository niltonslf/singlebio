'use client'

import {observer} from 'mobx-react-lite'
import {useCallback, useEffect} from 'react'

import {User} from '@/domain/models'

import {pageAnalyticsStore} from '../../context/page-analytics-store'

type PageAnalyticsLoaderProps = {
  linkItemClass: string
  socialItemClass: string
  user: User
}

export const PageAnalyticsLoader = observer(
  (props: PageAnalyticsLoaderProps) => {
    const {linkItemClass, socialItemClass, user} = props

    const handleSocialClick = useCallback(function (this: HTMLAnchorElement) {
      if (this.href) pageAnalyticsStore.updateSocialClick(this.href)
    }, [])

    const handlePageLinkClick = useCallback(function (this: HTMLAnchorElement) {
      if (this.href) pageAnalyticsStore.updateLinkClick(this.href)
    }, [])

    const handlePageView = () => {
      pageAnalyticsStore.updatePageView()
    }

    useEffect(() => {
      pageAnalyticsStore.setUser(user)

      const socialLinks = document.querySelectorAll(`.${socialItemClass}`)
      const pageLinks = document.querySelectorAll(`.${linkItemClass}`)

      if (socialLinks.length) {
        socialLinks.forEach(item => {
          item.addEventListener('click', handleSocialClick)
        })
      }

      if (pageLinks.length) {
        pageLinks.forEach(item => {
          item.addEventListener('click', handlePageLinkClick)
        })
      }
      handlePageView()

      return () => {
        socialLinks.forEach(item => {
          item.removeEventListener('click', handleSocialClick)
        })

        pageLinks.forEach(item => {
          item.removeEventListener('click', handlePageLinkClick)
        })
      }
    }, [
      handlePageLinkClick,
      handleSocialClick,
      linkItemClass,
      socialItemClass,
      user,
    ])

    return <></>
  },
)
