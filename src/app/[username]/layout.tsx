import {Metadata} from 'next'
import {ReactNode} from 'react'

import {fetchUserProfile} from '@/api/usecases'
import {APP_NAME} from '@/config/envs'

type LayoutProps = {
  children: ReactNode
  params: {username: string}
}

export const generateMetadata = async ({
  params,
}: Pick<LayoutProps, 'params'>): Promise<Metadata> => {
  const user = await fetchUserProfile(params.username)

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL

  if (!user)
    return {
      metadataBase: new URL(baseUrl || ''),
      title: `${APP_NAME} user page`,
      description: 'User personal page with his best content.',
    }

  return {
    metadataBase: new URL(baseUrl || ''),
    title: user?.name || APP_NAME,
    description: user?.bio || 'My personal page',
    keywords: [
      'link sharing',
      'share link on Instagram',
      'share link on social media',
      'link list',
      'bio link',
      'create page',
      'personal page',
      'share link',
    ],
    alternates: {
      canonical: `${baseUrl}/${user.username}`,
    },
    openGraph: {
      images: [
        {
          url: user?.pictureUrl || `${baseUrl}/logo-icon-black.png`,
          width: 800,
          height: 600,
        },
        {
          url: user?.pictureUrl || `${baseUrl}/logo-icon-black.png`,
          width: 1920,
          height: 1080,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    icons: {
      icon: user?.pictureUrl || `${baseUrl}/logo-icon-black.png`,
      shortcut: user?.pictureUrl || `${baseUrl}/logo-icon-black.png`,
      apple: user?.pictureUrl || `${baseUrl}/logo-icon-black.png`,
      other: {
        rel: 'apple-touch-icon-precomposed',
        url: user?.pictureUrl || `${baseUrl}/logo-icon-black.png`,
      },
    },
    robots: {
      index: true,
      follow: true,
      nocache: true,
      googleBot: {
        'index': true,
        'follow': false,
        'noimageindex': false,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

const Layout = ({children}: LayoutProps) => {
  return <>{children}</>
}

export default Layout
