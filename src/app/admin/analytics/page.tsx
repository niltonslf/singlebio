'use client'

import {observer} from 'mobx-react-lite'
import {useCallback, useEffect, useState} from 'react'
import Chart from 'react-apexcharts'

import {authStore} from '@/app/auth/context/auth-store'
import {PageViewsChartData} from '@/domain/models'

import {SectionCard} from '../components'
import {adminAnalyticsStore} from './context/admin-analytics-store'

const AnalyticsPage = observer(() => {
  const user = authStore.user

  const [pageViewsData, setPageViewsData] =
    useState<PageViewsChartData | null>()

  const pageViewsChartOptions: ApexCharts.ApexOptions = {
    chart: {id: 'area', toolbar: {show: false}},
    xaxis: {
      categories: pageViewsData?.categories ?? [],
    },
    tooltip: {
      theme: 'dark',
    },
  }

  const pageViewsChartData: ApexAxisChartSeries = [
    {
      name: 'Views',
      data: pageViewsData?.data ?? [],
      type: 'area',
    },
  ]

  const fetchData = useCallback(async () => {
    const data = await adminAnalyticsStore.fetchPageViews()
    setPageViewsData(data)
  }, [])

  useEffect(() => {
    adminAnalyticsStore.setUser(user)
    fetchData()
  }, [fetchData, user])

  return (
    <div className='mt-5 flex flex-wrap gap-5'>
      <div className='flex w-full justify-end'>
        <div className='join'>
          <input
            className='btn join-item'
            type='radio'
            name='options'
            aria-label='30 days'
            checked
          />
          <input
            className='btn join-item'
            type='radio'
            name='options'
            aria-label='All time'
          />
        </div>
      </div>

      <div className='flex flex-1 gap-5'>
        <SectionCard title='Links'>Here</SectionCard>
        <SectionCard title='Social'>Here</SectionCard>
      </div>

      <div className='w-full '>
        <SectionCard title='Page views'>
          <Chart
            options={pageViewsChartOptions}
            series={pageViewsChartData}
            width='100%'
            height='250'
          />
        </SectionCard>
      </div>
    </div>
  )
})

export default AnalyticsPage
