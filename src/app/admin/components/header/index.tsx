'use client'

import {Home, Palette} from 'lucide-react'
import {observer} from 'mobx-react-lite'
import Image from 'next/image'
import Link from 'next/link'
import {useRouter, usePathname} from 'next/navigation'

import {Dropdown} from '..'

import {ReactNode} from 'react'

import {authStore} from '@/app/auth/context/auth-store'
import {User} from '@/models'

type HeaderProps = {
  user: User | undefined
}

type Page = {
  href: string
  title: string
  name: string
  Icon: ReactNode
}

export const Header = observer(({user}: HeaderProps) => {
  const router = useRouter()
  const pathName = usePathname()

  const pages: Page[] = [
    {
      href: '/admin',
      title: 'go to home page',
      name: 'Home',
      Icon: <Home width={15} />,
    },
    {
      href: '/admin/appearance',
      title: 'go to appearance page',
      name: 'Appearance',
      Icon: <Palette width={15} />,
    },
  ]

  const isCurrentPage = (currentPage: string) => {
    return pathName == currentPage
  }

  const logout = async () => {
    await authStore.logout()
    router.push('/')
  }

  return (
    <header
      className='flex min-w-full flex-row items-center justify-between rounded-lg bg-gray-800 px-5 py-2'
      data-testid='admin-header'>
      <div className='flex flex-row'>
        <span className='mr-10'>
          <Image
            src='/logo-white.png'
            width={114.72}
            height={30}
            alt='lnktree logo'
          />
        </span>

        <nav className='flex flex-row items-center gap-4   text-white'>
          {pages.map(page => (
            <Link
              key={page.href}
              href={page.href}
              title={page.title}
              className='flex flex-row gap-1'
              style={{
                borderBottom: `2px solid ${
                  isCurrentPage(page.href) ? 'white' : 'transparent'
                }`,
                paddingBottom: '0.5rem',
              }}>
              {page.Icon}
              {page.name}
            </Link>
          ))}
        </nav>
      </div>

      <div className='flex flex-row items-center justify-between gap-3'>
        <Dropdown>
          <span className='hidden font-semibold text-white md:flex'>
            {user?.name}
          </span>
          {user?.pictureUrl && (
            <Image
              priority
              className='rounded-full border-2'
              src={user?.pictureUrl}
              width={40}
              height={40}
              alt='User profile image'
            />
          )}
        </Dropdown>
        <div
          onClick={logout}
          className='group relative  inline-flex cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-pink-500 to-orange-400 p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-pink-200 group-hover:from-pink-500 group-hover:to-orange-400 dark:text-white dark:focus:ring-pink-800'>
          <span className='relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900'>
            logout
          </span>
        </div>{' '}
      </div>
    </header>
  )
})
