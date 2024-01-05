import {Metadata} from 'next'
import {ReactNode} from 'react'

import {UserTheme} from '@/models'

import {fetchUserData} from './page'

type LayoutProps = {
  children: ReactNode
  params: {username: string}
  searchParams?: UserTheme & {preview: string}
}

export const generateMetadata = async ({
  params,
}: LayoutProps): Promise<Metadata> => {
  const {user} = await fetchUserData(params.username)

  if (!user) return {}

  return {
    title: user.name,
    description: user.bio,
    openGraph: {
      images: [
        {
          url: user.pictureUrl,
          width: 800,
          height: 600,
        },
        {
          url: user.pictureUrl,
          width: 1920,
          height: 1080,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    icons: {
      icon: user.pictureUrl,
      shortcut: user.pictureUrl,
      apple: user.pictureUrl,
      other: {
        rel: 'apple-touch-icon-precomposed',
        url: user.pictureUrl,
      },
    },
  }
}

const Layout = ({children}: LayoutProps) => {
  return <>{children}</>
}

export default Layout
