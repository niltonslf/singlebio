'use client'

import {LogOut, Trash} from 'lucide-react'
import {observer} from 'mobx-react-lite'
import {useRouter} from 'next/navigation'
import {PropsWithChildren} from 'react'

import {authStore} from '@/app/auth/context/auth-store'

type DropdownProps = {
  any?: any
} & PropsWithChildren

export const Dropdown = observer(({children}: DropdownProps) => {
  const router = useRouter()

  const logout = async () => {
    await authStore.logout()
    router.push('/')
  }

  const deleteAccount = async () => {
    await authStore.deleteUser()
  }

  return (
    <div className='background dropdown'>
      <label className='cursor-pointer' tabIndex={0}>
        {children}
      </label>
      <div className='solid menu bottom-left !w-48'>
        <span className='item text-sm text-primary-700' onClick={deleteAccount}>
          <Trash size={15} />
          <p>Delete account</p>
        </span>

        <div className='is-divider' role='separator'></div>

        <span className='px-3 py-2'>
          <button onClick={logout} className='bw btn md solid w-full'>
            <p>Logout</p>
            <LogOut size={18} />
          </button>
        </span>
      </div>
    </div>
  )
})
