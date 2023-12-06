'use client'

import {observer} from 'mobx-react-lite'
import {PropsWithChildren, useEffect, useRef, useState} from 'react'

import {authState} from '@/app/auth/context/auth-state'

import {DropdownMenu} from './dropdown-menu'
import {MenuItem} from './menu-item'

type DropdownProps = {
  any?: any
} & PropsWithChildren

export const Dropdown = observer(({children}: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdown = useRef<HTMLDivElement>(null)

  const deleteAccount = () => {
    authState.deleteUser()
  }

  useEffect(() => {
    function handleClickOutsideBox(event: any) {
      if (!dropdown?.current?.contains(event.target || null))
        return setIsOpen(false)
    }

    document.addEventListener('click', handleClickOutsideBox)
    return () => removeEventListener('click', handleClickOutsideBox)
  }, [])

  return (
    <div
      ref={dropdown}
      className='relative flex h-full cursor-pointer flex-row items-center gap-3'
      onClick={() => setIsOpen(prev => !prev)}>
      {children}
      <DropdownMenu isOpen={isOpen}>
        <MenuItem href={`/${authState.user?.userName}`}>My links page</MenuItem>
        <MenuItem onClick={deleteAccount}>Delete account</MenuItem>
      </DropdownMenu>
    </div>
  )
})
