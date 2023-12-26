import {X} from 'lucide-react'
import Image from 'next/image'

import {NavLinks} from '..'

import Link from 'next/link'

import {merge} from '@/utils'

type SidebarProps = {
  isOpen: boolean
  onClose: () => void
}

export const Sidebar = ({isOpen, onClose}: SidebarProps) => {
  return (
    <nav
      className={merge([
        'absolute left-[-100%]  top-0 z-40 flex h-full border-background-600 bg-background-100',
        'w-full max-w-full flex-col gap-5 border-r p-5 ',
        'bg-opacity-90 backdrop-blur-md transition-all ',
        'md:relative md:left-0 md:z-auto md:w-full md:bg-transparent',
        'overflow-y-auto',
        isOpen && 'left-0',
      ])}>
      <button
        className='bw btn outline xs compact absolute left-5 top-5 md:hidden'
        onClick={() => onClose()}>
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
        />
      </Link>

      <NavLinks onClick={onClose} />

      <div className='mt-auto flex w-full flex-row items-center justify-between'>
        <p className=' text-left text-xs text-slate-300'>v1.0.1 (beta)</p>
        <div className=' flex flex-row items-center justify-start gap-2'>
          <p className=' text-right text-sm text-slate-300'>Dark mode</p>
          <input
            defaultChecked={true}
            className='success sm switch'
            data-content='☀️'
            type='checkbox'
          />
        </div>
      </div>
    </nav>
  )
}
