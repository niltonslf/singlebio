import {XCircle} from 'lucide-react'
import Link from 'next/link'

import {merge} from '@/utils'

export const NotFoundPage = () => {
  return (
    <main
      className={merge([
        'flex h-[100vh] w-full flex-wrap items-center justify-center',
      ])}>
      <div className='flex flex-col items-center justify-center text-[40px] md:text-[60px]'>
        <XCircle size={80} className='text-primary' />
        <h1 className='text-primary'>Page not found :/</h1>
        <Link
          href='/'
          title='go back home'
          className='btn btn-outline btn-info  btn-md btn-wide mt-10'>
          Go back home
        </Link>
      </div>
    </main>
  )
}

export default NotFoundPage
