import {ReactNode} from 'react'

import {merge} from '@/utils'

type SidebarProps = {
  children: ReactNode
}

export const AdminLayoutRightPanel = ({children}: SidebarProps) => {
  return (
    <div className='grid w-full grid-rows-1'>
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
