import {ReactNode} from 'react'

type SidebarProps = {
  children: ReactNode
}

export const Sidebar = ({children}: SidebarProps) => {
  return (
    <aside className='grid w-full grid-rows-1 sm:mt-5'>
      <div className=' flex flex-1 items-start justify-center px-6 pt-4'>
        {children}
      </div>
    </aside>
  )
}
