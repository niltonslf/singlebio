import {HTMLAttributes, ReactNode} from 'react'

import {merge} from '@/utils'

type SidebarProps = {
  children: ReactNode
  className?: HTMLAttributes<HTMLElement>['className']
}

export const AdminLayoutRightPanel = ({children, className}: SidebarProps) => {
  return (
    <div className={merge(['grid w-full grid-rows-1', className])}>
      <div className='flex flex-1 items-start justify-center px-6 pb-10 pt-4'>
        <div
          className={merge([
            'sticky top-6 rounded-[60px] px-5 ',
            'shadow-[0px_0px_30px_0px_rgba(154,154,154,0.1)]',
          ])}>
          {children}
        </div>
      </div>
    </div>
  )
}
