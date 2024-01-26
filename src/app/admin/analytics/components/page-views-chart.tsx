'use client'

import {observer} from 'mobx-react-lite'
import {useCallback, useEffect} from 'react'

import {adminStore} from '@/app/admin/context/admin-store'

import {adminAnalyticsStore} from '../context/admin-analytics-store'

export const PageViewsChart = observer(() => {
  const user = adminStore.user

  const fetchData = useCallback(async () => {
    await adminAnalyticsStore.fetchPageViews()
  }, [])

  useEffect(() => {
    adminAnalyticsStore.setUser(user)
    fetchData()
  }, [fetchData, user])

  return <div></div>
})
