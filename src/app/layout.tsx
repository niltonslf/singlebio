import './globals.css'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import Script from 'next/script'

import {APP_NAME} from '@/config/envs'

import {Providers} from './providers'

const inter = Inter({subsets: ['latin']})

const baseUrl = process.env.NEXT_PUBLIC_APP_URL

export const metadata: Metadata = {
  title: {
    template: `%s - ${APP_NAME}`,
    default: `Share anything in your bio in seconds`,
    absolute: `${APP_NAME} - Share anything in your bio in seconds`,
  },
  description: `${APP_NAME} makes your life simple by marking room for you to share your digital world with just a single link. Put everything about you together in your exclusive personal page and be discovered easily sharing your links on your instagram, tiktok, facebook, discord, telegram, blog page, anywhere.`,
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
  alternates: {
    canonical: `${baseUrl}`,
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
      <Script
        async
        src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8270516024728167'
        crossOrigin='anonymous'></Script>

      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
