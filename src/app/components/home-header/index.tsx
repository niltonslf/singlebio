import Image from 'next/image'
import Link from 'next/link'

export const HomeHeader = () => {
  return (
    <header className='mx-auto flex w-full max-w-6xl items-center justify-between py-2'>
      <Link href='/' title='Brand' className='indicator font-semibold'>
        <span className='indicator-end badge indicator-item badge-primary badge-sm'>
          Beta
        </span>
        <Image src='/logo-white.png' width={114.72} height={30} alt='Logo' />
      </Link>

      <Link href='/auth' className='btn btn-outline btn-neutral px-10'>
        Login
      </Link>
    </header>
  )
}
