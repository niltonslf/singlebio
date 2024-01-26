import {Metadata} from 'next'
import {ReactNode} from 'react'

type AppearanceLayoutProps = {
  children: ReactNode
}
export const metadata: Metadata = {
  title: 'Appearance',
}

const AppearanceLayout = ({children}: AppearanceLayoutProps) => {
  return <>{children}</>
}

export default AppearanceLayout
