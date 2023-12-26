import {ReactNode} from 'react'

import {LinkItem} from './link-item'

type LinkContainerProps = {
  children: ReactNode
}

export const LinkCard = ({children}: LinkContainerProps) => {
  return (
    <ul
      aria-label='link-list'
      className='flex w-full flex-col gap-5 overflow-y-auto px-0 py-3 '>
      {children}
    </ul>
  )
}

LinkCard.Item = LinkItem
