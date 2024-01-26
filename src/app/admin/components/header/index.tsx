'use client'

import {ExternalLink} from 'lucide-react'
import {observer} from 'mobx-react-lite'

import {Dropdown} from '..'

import Link from 'next/link'
import {ReactNode} from 'react'

import {adminStore} from '@/app/admin/context/admin-store'
import {Avatar} from '@/app/components'
import {displayUrlShort, merge, parseUserPageUrl} from '@/utils'

type HeaderProps = {
  navbarHandler: ReactNode
}

export const Header = observer(({navbarHandler}: HeaderProps) => {
  const {user} = adminStore

  const handleCopyLink = () => {
    navigator.clipboard.writeText(parseUserPageUrl(user?.username ?? ''))
  }

  return (
    <header
      className={merge([
        'flex min-w-full flex-row items-center justify-between py-2',
        'border-b border-b-base-300 px-5  md:px-10',
      ])}
      data-testid='admin-header'>
      <div className='flex flex-row items-center gap-3'>
        {navbarHandler && <div className='md:hidden'>{navbarHandler}</div>}
      </div>

      <div className='flex flex-row items-center gap-5'>
        {user?.username && (
          <div className='flex flex-row items-center gap-5'>
            <Link
              className='flex flex-row items-center gap-1 font-normal text-primary '
              target='_blank'
              href={parseUserPageUrl(user.username)}>
              <span className='hidden md:inline-block'>
                {displayUrlShort(user?.username)}
              </span>

              <span className='inline-block md:hidden'>@{user?.username}</span>
              <ExternalLink size={15} />
            </Link>
            <button
              className='btn btn-outline btn-sm'
              onClick={() => handleCopyLink()}>
              Copy link
            </button>
          </div>
        )}
        <Dropdown>
          <Avatar
            name={user?.name ?? 'User'}
            pictureUrl={user?.pictureUrl}
            className='border-[2px] border-primary'
            size={40}
          />
        </Dropdown>
      </div>
    </header>
  )
})
