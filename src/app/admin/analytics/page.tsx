'use client'

import Chart from 'react-apexcharts'

import {SectionCard} from '../components'

export const AnalyticsPage = () => {
  const pageViewsChartOptions: ApexCharts.ApexOptions = {
    chart: {id: 'area', toolbar: {show: false}},
  }
  const pageViewsChartData: ApexAxisChartSeries = [
    {
      name: 'Some mane',
      data: [99, 50, 10, 39],
      type: 'area',
    },
  ]

  return (
    <div className='mt-5 flex flex-wrap gap-5'>
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
}

export default AnalyticsPage
