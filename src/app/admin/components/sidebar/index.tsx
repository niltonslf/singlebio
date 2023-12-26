import Image from 'next/image'

import {NavLinks} from '..'

import Link from 'next/link'

export const Sidebar = () => {
  return (
    <>
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

      <NavLinks />

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
    </>
  )
}
