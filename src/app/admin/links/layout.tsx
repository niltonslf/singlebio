import {Metadata} from 'next'
import {ReactNode} from 'react'

type LinksLayoutProps = {
  children: ReactNode
}
export const metadata: Metadata = {
  title: 'Links',
}

const LinksLayout = ({children}: LinksLayoutProps) => {
  return <>{children}</>
}

export default LinksLayout
