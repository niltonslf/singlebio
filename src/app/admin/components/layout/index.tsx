import {ContentLayout} from './content'
import {LayoutRoot, LayoutRootProps} from './root'
import {Sidebar} from './sidebar'

type LayoutProps<T> = {
  [K in keyof T]: T[K]
}

export const Layout = (props: LayoutProps<LayoutRootProps>) => {
  return <LayoutRoot {...props}>{props?.children}</LayoutRoot>
}

Layout.Sidebar = Sidebar
Layout.Content = ContentLayout
