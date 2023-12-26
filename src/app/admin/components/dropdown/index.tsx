'use client'

import {Link2, Trash} from 'lucide-react'
import {observer} from 'mobx-react-lite'
import {useRouter} from 'next/navigation'
import {PropsWithChildren} from 'react'

import {authStore} from '@/app/auth/context/auth-store'

type DropdownProps = {
  any?: any
} & PropsWithChildren

export const Dropdown = observer(({children}: DropdownProps) => {
  const {user} = authStore

  const router = useRouter()

  const logout = async () => {
    await authStore.logout()
    router.push('/')
  }

  const deleteAccount = async () => {
    await authStore.deleteUser()
  }

  return (
    <div className='bw dropdown'>
      <label className='cursor-pointer' tabIndex={0}>
        {children}
      </label>
      <div className=' solid menu bottom-left !w-48'>
        <div className='px-3 pt-2 text-sm'>
          <div className='flex flex-wrap'>
            <span className='w-full'>Welcome,</span>
            <span className='font-semibold '>{user?.name}</span>
          </div>
        </div>

        <div className='is-divider' role='separator'></div>

        <a className='item text-sm' href={`/${authStore?.user?.username}`}>
          <Link2 size={15} />
          <p>My page</p>
        </a>

        <span className='item text-sm' onClick={deleteAccount}>
          <Trash size={15} />
          <p>Delete account</p>
        </span>

        <div className='is-divider' role='separator'></div>

        <span className='px-3 py-2'>
          <div
            onClick={logout}
            className='group relative inline-flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-pink-500 to-orange-400 p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-pink-200 group-hover:from-pink-500 group-hover:to-orange-400 dark:text-white dark:focus:ring-pink-800'>
            <span className='relative w-full rounded-md bg-white px-5 py-2.5 text-center transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900'>
              logout
            </span>
          </div>
        </span>
      </div>
    </div>
  )
})
