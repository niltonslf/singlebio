import {ReactNode} from 'react'

import {FeatureListItem} from '@/app/admin/components/feature-list/feature-list-item'

type FeatureListProps = {
  children: ReactNode
}

export const FeatureList = ({children}: FeatureListProps) => {
  return <ul className='flex flex-col gap-3'>{children}</ul>
}

FeatureList.Item = FeatureListItem
