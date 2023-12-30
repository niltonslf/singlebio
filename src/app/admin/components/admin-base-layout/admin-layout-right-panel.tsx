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
        'sticky top-0 flex flex-[1.1] items-center justify-center md:h-[calc(100vh-60px)]',
        className,
      ])}>
      {children}
    </div>
  )
}
