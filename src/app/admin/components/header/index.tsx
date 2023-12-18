import {getAuth, signOut} from 'firebase/auth'
import {Home, Palette} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import {useRouter} from 'next/navigation'

import {Dropdown} from '..'

import {User} from '@/models'

type HeaderProps = {
  user: User | undefined
}

export const Header = ({user}: HeaderProps) => {
  const router = useRouter()

  const logout = async () => {
    const auth = getAuth()
    await signOut(auth)
    router.push('/')
  }

  return (
    <header className='flex min-w-full flex-row items-center justify-between rounded-lg bg-gray-800 px-5 py-2'>
      <div className='flex flex-row'>
        <span className='text-md mr-10 font-semibold text-white'>
          Lnktree admin
        </span>

        <nav className='flex flex-row items-center gap-4   text-white'>
          <Link
            href='/admin'
            title='go to appearance page'
            className='flex flex-row gap-1'>
            <Home width={15} />
            Home
          </Link>
          <Link
            href='/admin/appearance'
            title='go to appearance page'
            className='flex flex-row gap-1'>
            <Palette width={15} />
            Appearance
          </Link>
        </nav>
      </div>

      <div className='flex flex-row items-center justify-between gap-3'>
        <Dropdown>
          <span className='hidden font-semibold text-white md:flex'>
            {user?.name}
          </span>
          {user?.pictureUrl && (
            <Image
              priority
              className='rounded-full border-2'
              src={user?.pictureUrl}
              width={40}
              height={40}
              alt='User profile image'
            />
          )}
        </Dropdown>
        <div
          onClick={logout}
          className='group relative  inline-flex cursor-pointer items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-pink-500 to-orange-400 p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-pink-200 group-hover:from-pink-500 group-hover:to-orange-400 dark:text-white dark:focus:ring-pink-800'>
          <span className='relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900'>
            logout
          </span>
        </div>{' '}
      </div>
    </header>
  )
}
