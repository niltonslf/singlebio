'use client'

import {observer} from 'mobx-react-lite'
import {useRouter} from 'next/navigation'
import {PropsWithChildren, useEffect, useRef, useState} from 'react'

import {authStore} from '@/app/auth/context/auth-store'

import {DropdownMenu} from './dropdown-menu'
import {MenuItem} from './menu-item'

type DropdownProps = {
  any?: any
} & PropsWithChildren

export const Dropdown = observer(({children}: DropdownProps) => {
  const {user} = authStore

  const dropdown = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const [isOpen, setIsOpen] = useState(false)

  const logout = async () => {
    await authStore.logout()
    router.push('/')
  }

  const deleteAccount = async () => {
    await authStore.deleteUser()
  }

  useEffect(() => {
    function handleClickOutsideBox(event: any) {
      if (!dropdown?.current?.contains(event.target)) return setIsOpen(false)
    }

    document.addEventListener('click', handleClickOutsideBox)
    return () => removeEventListener('click', handleClickOutsideBox)
  }, [])

  return (
    <div
      ref={dropdown}
      className='relative z-[60] flex h-full cursor-pointer flex-row items-center gap-3'
      onClick={() => setIsOpen(prev => !prev)}>
      {children}
      <DropdownMenu isOpen={isOpen}>
        <MenuItem>
          <span>Welcome,</span>
          <span className='hidden font-semibold text-white md:flex'>
            {user?.name}
          </span>
        </MenuItem>

        <div className='my-1 h-[1px] w-full bg-gray-800' />

        <MenuItem href={`/${authStore?.user?.username}`}>
          My links page
        </MenuItem>

        <MenuItem onClick={deleteAccount}>Delete account</MenuItem>

        <div className='my-2 h-[1px] w-full bg-gray-800' />

        <MenuItem>
          <div
            onClick={logout}
            className='group relative inline-flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-pink-500 to-orange-400 p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-pink-200 group-hover:from-pink-500 group-hover:to-orange-400 dark:text-white dark:focus:ring-pink-800'>
            <span className='relative w-full rounded-md bg-white px-5 py-2.5 text-center transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900'>
              logout
            </span>
          </div>
        </MenuItem>
      </DropdownMenu>
    </div>
  )
})
