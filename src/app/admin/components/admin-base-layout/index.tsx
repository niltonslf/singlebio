import {ReactNode} from 'react'

import {merge} from '@/utils'

import {AdminLayoutContent} from './admin-layout-content'
import {AdminLayoutRightPanel} from './admin-layout-right-panel'

type LayoutProps = {
  children: ReactNode
}

export const AdminBaseLayout = ({children}: LayoutProps) => {
  return (
    <div
      className={merge([
        'flex h-auto w-full flex-col flex-wrap gap-10',
        'md:flex-row',
      ])}>
      {children}
    </div>
  )
}

AdminBaseLayout.RightPanel = AdminLayoutRightPanel
AdminBaseLayout.Content = AdminLayoutContent
