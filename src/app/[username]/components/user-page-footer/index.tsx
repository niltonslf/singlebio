import Image from 'next/image'
import Link from 'next/link'

export const UserPageFooter = () => {
  return (
    <footer className='mt-auto flex w-full flex-row items-center justify-center pt-10'>
      <Link
        href='/'
        title='Home page'
        className='bg- btn btn-neutral btn-md bg-neutral-50 text-base-100 opacity-80'>
        <Image
          src='/logo-icon-black.png'
          width={22}
          height={22}
          alt='lnktree logo'
        />
        <p className='text-sm font-semibold'>Created using lnktree</p>
      </Link>
    </footer>
  )
}
