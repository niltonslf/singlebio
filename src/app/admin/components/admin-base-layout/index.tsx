import {ReactNode} from 'react'

import {AdminLayoutContent} from './admin-layout-content'
import {AdminLayoutRightPanel} from './admin-layout-right-panel'

type LayoutProps = {
  children: ReactNode
}

export const AdminBaseLayout = ({children}: LayoutProps) => {
  return (
    <div className='grid h-auto w-full grid-cols-1 grid-rows-[1fr] gap-10 md:grid-cols-[3fr_2fr]'>
      {children}
    </div>
  )
}

AdminBaseLayout.RightPanel = AdminLayoutRightPanel
AdminBaseLayout.Content = AdminLayoutContent
