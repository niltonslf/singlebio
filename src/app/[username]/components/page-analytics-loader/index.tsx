'use client'

import {observer} from 'mobx-react-lite'
import {useCallback, useEffect} from 'react'

import {User} from '@/domain/models'

import {pageAnalytics} from '../../context/page-analytics'

type PageAnalyticsLoaderProps = {
  linkItemClass: string
  socialItemClass: string
  user: User
}

export const PageAnalyticsLoader = observer(
  (props: PageAnalyticsLoaderProps) => {
    const {linkItemClass, socialItemClass, user} = props

    const handleSocialClick = useCallback(function (this: HTMLAnchorElement) {
      if (this.href) pageAnalytics.updateSocialClick(this.href)
    }, [])

    const handlePageClick = useCallback(function (this: HTMLAnchorElement) {
      if (this.href) pageAnalytics.updateLinkClick(this.href)
    }, [])

    const handlePageView = () => {
      pageAnalytics.updatePageView()
    }

    useEffect(() => {
      pageAnalytics.setUser(user)

      const socialLinks = document.querySelectorAll(`.${socialItemClass}`)
      const pageLinks = document.querySelectorAll(`.${linkItemClass}`)

      if (socialLinks.length) {
        socialLinks.forEach(item => {
          item.addEventListener('click', handleSocialClick)
        })
      }

      if (pageLinks.length) {
        pageLinks.forEach(item => {
          item.addEventListener('click', handlePageClick)
        })
      }

      handlePageView()

      return () => {
        socialLinks.forEach(item => {
          item.removeEventListener('click', handleSocialClick)
        })

        pageLinks.forEach(item => {
          item.removeEventListener('click', handlePageClick)
        })
      }
    }, [
      handlePageClick,
      handleSocialClick,
      linkItemClass,
      socialItemClass,
      user,
    ])

    return <></>
  },
)
