'use client'

import {ChevronDown, ExternalLink} from 'lucide-react'
import {observer} from 'mobx-react-lite'

import {Dropdown} from '..'

import Link from 'next/link'
import {ReactNode} from 'react'

import {authStore} from '@/app/auth/context/auth-store'
import {Avatar} from '@/app/components'
import {displayUserPageUrl, merge} from '@/utils'

type HeaderProps = {
  navbarHandler: ReactNode
}

export const Header = observer(({navbarHandler}: HeaderProps) => {
  const {user} = authStore

  return (
    <header
      className={merge([
        'flex min-w-full flex-row items-center justify-between py-2',
        'border-b border-b-background-300 px-5  md:px-10',
      ])}
      data-testid='admin-header'>
      <div className='flex flex-row items-center gap-3'>
        {navbarHandler && <div className='md:hidden'>{navbarHandler}</div>}
      </div>

      <div className='flex flex-row items-center gap-5'>
        {user?.username && (
          <div className='flex flex-row items-center gap-5'>
            <Link
              className='flex flex-row items-center gap-1 font-normal text-primary-800 '
              target='_blank'
              href={`/${user.username}`}>
              <span className='hidden md:inline-block'>
                {displayUserPageUrl(user?.username)}
              </span>

              <span className='inline-block md:hidden'>@{user?.username}</span>
              <ExternalLink size={15} />
            </Link>
            <button className='bw btn outline sm'>Copy link</button>
          </div>
        )}
        <Dropdown>
          <div className='flex flex-row items-center'>
            <Avatar
              name={user?.name ?? 'User'}
              pictureUrl={user?.pictureUrl}
              size={40}
            />
            <ChevronDown size={18} />
          </div>
        </Dropdown>
      </div>
    </header>
  )
})
