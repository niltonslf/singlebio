'use client'

import {LogOut} from 'lucide-react'
import {observer} from 'mobx-react-lite'
import {PropsWithChildren} from 'react'

import {authStore} from '@/app/auth/context/auth-store'

type DropdownProps = {
  any?: any
} & PropsWithChildren

export const Dropdown = observer(({children}: DropdownProps) => {
  const logout = async () => {
    return authStore.logout()
  }

  return (
    <details className='dropdown dropdown-end' data-testid='header-dropdown'>
      <summary className='btn btn-circle btn-ghost cursor-pointer'>
        {children}
      </summary>
      <ul className='px- menu dropdown-content z-[50] w-52 rounded-box bg-neutral py-5 shadow'>
        <button onClick={logout} className='btn btn-outline btn-md w-full'>
          <p>Logout</p>
          <LogOut size={18} />
        </button>
      </ul>
    </details>
  )
})
