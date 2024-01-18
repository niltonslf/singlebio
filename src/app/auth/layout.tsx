import {ArrowLeft} from 'lucide-react'
import type {Metadata} from 'next'
import Image from 'next/image'
import Link from 'next/link'

import {APP_NAME} from '@/config/envs'

const baseUrl = process.env.NEXT_PUBLIC_APP_URL

export const metadata: Metadata = {
  title: `${APP_NAME}: Create your account in seconds`,
  description: `${APP_NAME} makes your life simple by marking room for you to share your digital world with just a single link. Put everything about you together in your exclusive personal page and be discovered easily sharing your links in a social media, blog page, anywhere.`,
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
}

const AuthLayout = ({children}: {children: React.ReactNode}) => {
  return (
    <main
      data-theme='dark'
      className='m-auto flex h-screen w-screen items-center justify-center bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-yellow-500 via-purple-500 to-blue-500 px-10'>
      <section className='relative flex w-[400px] max-w-full flex-col rounded-lg bg-base-100 px-4 py-10 text-neutral-50 shadow-2xl shadow-black'>
        <Link
          href='./'
          title='Go back'
          className='btn btn-square btn-ghost btn-sm absolute left-4 top-4'>
          <ArrowLeft size={20} />
        </Link>

        <header className='mb-12 flex w-full justify-center'>
          <Image src='/logo-white.png' width={200} height={52} alt='logo' />
        </header>
        <div className='flex flex-col'>{children}</div>
      </section>
    </main>
  )
}

export default AuthLayout
