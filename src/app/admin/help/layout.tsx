import {Metadata} from 'next'
import {ReactNode} from 'react'

type HelpLayoutProps = {
  children: ReactNode
}
export const metadata: Metadata = {
  title: 'Help',
}

const HelpLayout = ({children}: HelpLayoutProps) => {
  return <>{children}</>
}

export default HelpLayout
