import './globals.css'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'

import {APP_NAME} from '@/config/envs'

import {Providers} from './providers'

const inter = Inter({subsets: ['latin']})

const baseUrl = process.env.NEXT_PUBLIC_APP_URL

export const metadata: Metadata = {
  title: `${APP_NAME} | Share your links`,
  description: 'Share your digital world with just a single link!',

  metadataBase: new URL(baseUrl || ''),
  openGraph: {
    images: [
      {
        url: '/home/model.png',
        width: 800,
        height: 600,
      },
      {
        url: '/home/model.png',
        width: 1920,
        height: 1080,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  icons: {
    icon: '/logo-icon-black.png',
    shortcut: '/logo-icon-black.png',
    apple: '/logo-icon-black.png',
    other: {
      rel: 'apple-touch-icon-precomposed',
      url: '/logo-icon-black.png',
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

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
