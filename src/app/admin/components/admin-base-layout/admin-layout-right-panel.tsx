import {ReactNode} from 'react'

type SidebarProps = {
  children: ReactNode
}

export const AdminLayoutRightPanel = ({children}: SidebarProps) => {
  return (
    <div className='grid w-full grid-rows-1'>
      <div className='flex flex-1 items-start justify-center px-6 pb-10 pt-4'>
        {children}
      </div>
    </div>
  )
}
