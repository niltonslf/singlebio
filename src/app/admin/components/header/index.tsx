'use client'

import {observer} from 'mobx-react-lite'

import {Dropdown} from '..'

import {authStore} from '@/app/auth/context/auth-store'
import {Avatar} from '@/app/components'

export const Header = observer(() => {
  const {user} = authStore

  return (
    <header
      className='flex min-w-full flex-row items-center justify-between py-2'
      data-testid='admin-header'>
      <div className='flex flex-row'>
        <span className='text-slate-300'>Hello, good afternoon!</span>
      </div>

      <div className='flex flex-row items-center gap-3'>
        <span className='text-slate-300'>{authStore?.user?.name}</span>
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
