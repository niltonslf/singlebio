'use client'

import {clsx} from 'clsx'
import {ReactNode} from 'react'

type DropdownMenuProps = {
  children: ReactNode
  isOpen: boolean
}

export const DropdownMenu = ({children, isOpen}: DropdownMenuProps) => {
  return (
    <div
      className={clsx(
        'absolute top-[100%] z-10 w-44 divide-y divide-gray-100 rounded-lg bg-white shadow dark:bg-gray-900',
        !isOpen && 'hidden',
      )}
      onClick={e => e.stopPropagation()}>
      <ul className='py-2 text-sm text-gray-900 dark:text-gray-200'>
        {children}
      </ul>
    </div>
  )
}
