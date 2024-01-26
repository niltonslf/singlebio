import {Metadata} from 'next'
import {ReactNode} from 'react'

type ProfileLayoutProps = {
  children: ReactNode
}
export const metadata: Metadata = {
  title: 'Profile',
}

const ProfileLayout = ({children}: ProfileLayoutProps) => {
  return <>{children}</>
}

export default ProfileLayout
