import {ReactNode} from 'react'

import {merge} from '@/utils'

import {AdminLayoutContent} from './admin-layout-content'
import {AdminLayoutPagePreview} from './admin-layout-page-preview'

type LayoutProps = {
  children: ReactNode
}

export const AdminBaseLayout = ({children}: LayoutProps) => {
  return (
    <div
      className={merge([
        'flex h-auto w-full flex-col flex-wrap gap-5',
        'md:flex-row',
      ])}>
      {children}
    </div>
  )
}

AdminBaseLayout.PagePreview = AdminLayoutPagePreview
AdminBaseLayout.Content = AdminLayoutContent
