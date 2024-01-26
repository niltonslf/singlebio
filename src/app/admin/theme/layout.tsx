import {Metadata} from 'next'
import {ReactNode} from 'react'

type ThemeLayoutProps = {
  children: ReactNode
}
export const metadata: Metadata = {
  title: 'Theme',
}

const ThemeLayout = ({children}: ThemeLayoutProps) => {
  return <>{children}</>
}

export default ThemeLayout
