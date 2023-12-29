import {HTMLAttributes, ReactNode} from 'react'

import {merge} from '@/utils'

type SidebarProps = {
  children: ReactNode
  className?: HTMLAttributes<HTMLElement>['className']
}

export const AdminLayoutRightPanel = ({children, className}: SidebarProps) => {
  return (
    <div
      className={merge([
        'sticky top-0 grid w-full grid-rows-1 md:h-[calc(100vh-60px)]',
        className,
      ])}>
      <div className='mt-10 flex h-full flex-1 items-center justify-center md:mt-0'>
        {children}
      </div>
    </div>
  )
}
