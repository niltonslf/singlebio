'use client'

import {useEffect} from 'react'

import {User} from '@/domain/models'
import {segment} from '@/services/segment/config'

export const PageAnalyticsLoader = ({user}: {user: User}) => {
  const trackPageLinks = async () => {
    const pageLinkContainer = document.querySelector('#page-links-container')
    const elements = Array.from(pageLinkContainer?.children ?? [])

    segment.trackClick(elements, 'click_page_link', undefined)
  }

  useEffect(() => {
    segment.identify(user.uid, {username: user.username, id: user.uid})

    trackPageLinks()
  }, [user.uid, user.username])

  return null
}
