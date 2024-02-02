import clsx from 'clsx'
import {ChevronsLeft, ChevronsRight, Menu} from 'lucide-react'
import {observer} from 'mobx-react-lite'
import Image from 'next/image'

import {NavLinks} from '..'

import Link from 'next/link'
import {useState} from 'react'
import {isMobile} from 'react-device-detect'

import {merge} from '@/utils'

export const Sidebar = observer(() => {
  const [isOpen, setIsOpen] = useState(isMobile ? false : true)

  return (
    <>
      <nav
        data-testid='admin-sidebar'
        className={merge([
          'fixed left-0 top-0 z-50 flex h-full flex-col border-base-200 bg-base-100',
          'w-full max-w-full flex-col gap-5 border-r px-3 py-5',
          'bg-opacity-90 backdrop-blur-md transition-all',
          'md:relative md:z-auto md:w-[250px] md:bg-base-200 dark:md:bg-base-300',
          'overflow-y-auto overflow-x-hidden md:left-0',
          !isOpen &&
            'left-[-100%] rounded-br-lg rounded-tr-lg bg-opacity-100 md:w-[65px]',
        ])}>
        <span
          data-testid='sidebar-toggle-button'
          className={clsx([
            'btn btn-square btn-ghost btn-sm absolute right-6 top-4 rounded-md transition-all',
            !isOpen && 'btn-active right-[15px]',
          ])}
          onClick={() => setIsOpen(prev => !prev)}>
          {isOpen ? <ChevronsLeft size={18} /> : <ChevronsRight size={18} />}
        </span>

        <Link
          href='/admin'
          title='Home page'
          className={clsx([
            'indicator mb-5 flex cursor-pointer justify-end opacity-100 transition-all',
            !isOpen && 'opacity-0 md:translate-x-full',
          ])}>
          <span className='indicator-end badge indicator-item badge-primary badge-xs'>
            Beta
          </span>
          <Image
            src='/logo-white.png'
            width={114.72}
            height={30}
            alt='Logo'
            className='hidden dark:flex'
          />

          <Image
            src='/logo-black.png'
            width={114.72}
            height={30}
            alt='Logo'
            className='flex dark:hidden'
          />
        </Link>

        <NavLinks onClick={() => setIsOpen(false)} isOpen={isOpen} />
      </nav>

      <span
        onClick={() => setIsOpen(true)}
        className={clsx([
          'btn btn-neutral btn-md fixed bottom-5 left-[-100%] z-20 transition-all duration-300 md:hidden',
          !isOpen && 'left-[20px]',
        ])}>
        <Menu size={18} />
      </span>
    </>
  )
})
