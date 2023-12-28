'use client'

import {ExternalLink} from 'lucide-react'
import {observer} from 'mobx-react-lite'

import {Dropdown} from '..'

import Link from 'next/link'
import {ReactNode} from 'react'

import {authStore} from '@/app/auth/context/auth-store'
import {Avatar} from '@/app/components'
import {merge, parseUserPageUrl} from '@/utils'

type HeaderProps = {
  navbarHandler: ReactNode
}

export const Header = observer(({navbarHandler}: HeaderProps) => {
  const {user} = authStore

  return (
    <header
      className={merge([
        'flex min-w-full flex-row items-center justify-between py-2',
        'border-b border-b-background-600 px-5 md:border-0 md:px-0',
      ])}
      data-testid='admin-header'>
      <div className='flex flex-row items-center gap-3'>
        {navbarHandler && <div className='md:hidden'>{navbarHandler}</div>}

        <span className='hidden text-slate-300 md:block'>
          Hello, {user?.name || 'there'}!
        </span>
      </div>

      <div className='flex flex-row items-center gap-5'>
        {user?.username && (
          <>
            <Link
              className='hidden flex-row items-center gap-1 text-primary-1000 md:flex '
              target='_blank'
              href={`/${user.username}`}>
              {parseUserPageUrl(user?.username)}
              <ExternalLink size={15} />
            </Link>

            <Link
              className='flex flex-row items-center gap-1 text-primary-1000 md:hidden'
              target='_blank'
              href={`/${user.username}`}>
              My page
              <ExternalLink size={15} />
            </Link>
          </>
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
