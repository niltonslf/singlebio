import {X} from 'lucide-react'
import Image from 'next/image'

import {NavLinks, ThemeSwitcher} from '..'

import Link from 'next/link'

import {merge} from '@/utils'

type SidebarProps = {
  isOpen: boolean
  onClose: () => void
}

export const Sidebar = ({isOpen, onClose}: SidebarProps) => {
  return (
    <nav
      data-testid='admin-sidebar'
      className={merge([
        'absolute left-[-100%]  top-0 z-40 flex h-full border-base-300 bg-base-100',
        'w-full max-w-full flex-col gap-5 border-r p-5 ',
        'bg-opacity-90 backdrop-blur-md transition-all ',
        'md:relative md:left-0 md:z-auto md:w-full md:bg-base-200 dark:md:bg-transparent',
        'overflow-y-auto',
        isOpen && 'left-0',
      ])}>
      <button
        className='btn btn-square btn-outline btn-xs absolute left-5 top-5 md:hidden '
        onClick={onClose}>
        <X size={17} />
      </button>

      <Link
        href='/admin'
        title='Home page'
        className='mb-8 flex w-full cursor-pointer justify-center'>
        <Image
          src='/logo-white.png'
          width={114.72}
          height={30}
          alt='lnktree logo'
          className='hidden dark:flex'
        />

        <Image
          src='/logo-black.png'
          width={114.72}
          height={30}
          alt='lnktree logo'
          className='flex dark:hidden'
        />
      </Link>

      <NavLinks onClick={onClose} />

      <div className='mt-auto flex w-full flex-row items-center justify-between'>
        <p className=' text-left text-xs'>v0.0.1 (beta)</p>
        <ThemeSwitcher />
      </div>
    </nav>
  )
}
