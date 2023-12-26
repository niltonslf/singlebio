'use client'

import {observer} from 'mobx-react-lite'
import Image from 'next/image'

import {Dropdown, NavLinks} from '..'

import {authStore} from '@/app/auth/context/auth-store'
import {Avatar} from '@/app/components'

export const Header = observer(() => {
  const {user} = authStore

  return (
    <header
      className='flex min-w-full flex-row items-center justify-between rounded-lg bg-gray-800 px-5 py-2'
      data-testid='admin-header'>
      <div className='flex flex-row'>
        <span className='mr-3 md:mr-10'>
          <Image
            src='/logo-white.png'
            width={114.72}
            height={30}
            alt='lnktree logo'
          />
        </span>

        <nav className='hidden flex-row items-center gap-4 md:flex '>
          <NavLinks location='header' />
        </nav>
      </div>

      <div className='flex flex-row items-center justify-between gap-3'>
        <Dropdown>
          <Avatar
            name={user?.name ?? 'User'}
            pictureUrl={user?.pictureUrl}
            size={40}
            className='border-white'
          />
        </Dropdown>
      </div>
    </header>
  )
})
