import {Metadata} from 'next'
import {ReactNode} from 'react'

type SettingsLayoutProps = {
  children: ReactNode
}
export const metadata: Metadata = {
  title: 'Settings',
}

const SettingsLayout = ({children}: SettingsLayoutProps) => {
  return <>{children}</>
}

export default SettingsLayout
