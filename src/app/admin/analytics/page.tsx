'use client'

import {observer} from 'mobx-react-lite'

import {SectionCard} from '../components'
import {PageViewsChart} from './components'

const AnalyticsPage = observer(() => {
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
        <SectionCard title='Links'>Under development...</SectionCard>
        <SectionCard title='Social'>Under development...</SectionCard>
      </div>

      <div className='w-full '>
        <SectionCard title='Page views'>
          <PageViewsChart />
        </SectionCard>
      </div>
    </div>
  )
})

export default AnalyticsPage
