'use client'

import {ExternalLink} from 'lucide-react'
import {observer} from 'mobx-react-lite'

import {Dropdown} from '..'

import Link from 'next/link'
import {ReactNode} from 'react'

import {authStore} from '@/app/auth/context/auth-store'
import {Avatar} from '@/app/components'
import {merge} from '@/utils'

type HeaderProps = {
  navbarHandler: ReactNode
}

export const Header = observer(({navbarHandler}: HeaderProps) => {
  const {user} = authStore
  const appUrl = process.env.NEXT_PUBLIC_APP_URL

  return (
    <header
      className={merge([
        'flex min-w-full flex-row items-center justify-between py-2',
        'border-b border-b-background-600 px-5 md:border-0 md:px-0',
      ])}
      data-testid='admin-header'>
      <div className='flex flex-row items-center gap-3'>
        {navbarHandler && <div className='md:hidden'>{navbarHandler}</div>}

        <span className='text-slate-300'>Hello, {user?.name || 'there'}!</span>
      </div>

      <div className='flex flex-row items-center gap-5'>
        {user?.username && (
          <Link
            className='flex flex-row items-center gap-1 text-primary-1000'
            target='_blank'
            href={`/${user.username}`}>
            {appUrl}/{user?.username}
            <ExternalLink size={15} />
          </Link>
        )}

        <Dropdown>
          <Avatar
            name={user?.name ?? 'User'}
            pictureUrl={user?.pictureUrl}
            size={40}
            className='border-2 border-primary-700'
          />
        </Dropdown>
      </div>
    </header>
  )
})
