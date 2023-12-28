import {ReactNode} from 'react'

import {LinkItem} from './link-item'

type LinkContainerProps = {
  children: ReactNode
}

export const LinkCard = ({children}: LinkContainerProps) => {
  return (
    <ul aria-label='link-list' className='flex w-full flex-col gap-5 p-0 '>
      {children}
    </ul>
  )
}

LinkCard.Item = LinkItem
