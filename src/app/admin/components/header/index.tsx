'use client'

import {observer} from 'mobx-react-lite'

import {Dropdown} from '..'

import {ReactNode} from 'react'

import {authStore} from '@/app/auth/context/auth-store'
import {Avatar} from '@/app/components'
import {merge} from '@/utils'

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

        <span className='text-slate-300'>
          Hello, {authStore?.user?.name || 'there'}!
        </span>
      </div>

      <div className='flex flex-row items-center gap-3'>
        <Dropdown>
          <Avatar
            name={user?.name ?? 'User'}
            pictureUrl={user?.pictureUrl}
            size={40}
            className='border-2 border-secondary-600'
          />
        </Dropdown>
      </div>
    </header>
  )
})
