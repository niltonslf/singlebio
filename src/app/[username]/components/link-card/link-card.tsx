import {HTMLAttributes, ReactNode} from 'react'

import {merge} from '@/utils'

type LinkContainerProps = {
  children?: ReactNode
  className?: HTMLAttributes<HTMLUListElement>['className']
}

export const LinkCard = ({children, className}: LinkContainerProps) => {
  return (
    <ul
      data-testid='user-page-page-links'
      id='page-links-container'
      aria-label='link-list'
      className={merge(['flex h-auto w-full flex-col gap-5 p-0 ', className])}>
      {children}
    </ul>
  )
}
