import {ReactNode} from 'react'

import {ContentLayout} from './content'
import {Sidebar} from './sidebar'

type LayoutProps = {
  children: ReactNode
}

export const Layout = ({children}: LayoutProps) => {
  return (
    <main className='grid min-h-[calc(100%-80px)] w-full grid-cols-1 gap-3 md:grid-cols-[3fr_1.5fr] md:grid-rows-[1fr]'>
      {children}
    </main>
  )
}

Layout.Sidebar = Sidebar
Layout.Content = ContentLayout
