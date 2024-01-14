import Image from 'next/image'
import Link from 'next/link'

import {APP_NAME} from '@/config/envs'

export const UserPageFooter = () => {
  return (
    <footer className='mt-auto flex w-full flex-row items-center justify-center pt-10'>
      <Link
        href='/'
        title='Home page'
        className='btn btn-outline btn-md h-9 min-h-min bg-neutral-50 text-base-100 opacity-80'>
        <Image src='/logo-icon-black.png' width={20} height={20} alt='Logo' />
        <p className='text-xs font-semibold'>Created using {APP_NAME}</p>
      </Link>
    </footer>
  )
}
