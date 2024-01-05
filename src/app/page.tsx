import Image from 'next/image'
import Link from 'next/link'

import {HomeFooter} from './components/home-footer'

export default function Home() {
  return (
    <main className='via-background-200 flex min-h-[100vh] w-full flex-col bg-gradient-to-tr from-base-100 via-base-300 to-base-100 p-5'>
      <div className='h-screen w-full'>
        <nav className='mx-auto flex w-full max-w-6xl items-center justify-between py-2'>
          <Link href='/' title='Brand' className='font-semibold'>
            <Image
              src='/logo-white.png'
              width={114.72}
              height={30}
              alt='lnktree logo'
            />
          </Link>

          <Link href='/auth' className='btn btn-outline btn-neutral px-10'>
            Login
          </Link>
        </nav>

        <section className='max:w-full mx-auto mt-14 flex w-full flex-row items-center justify-center md:max-w-6xl'>
          <article className='w-full text-center md:w-[55%] md:text-left'>
            <h1 className='text-4xl font-extrabold  leading-none md:text-7xl'>
              <span className='bg-gradient-to-r from-fuchsia-600 to-pink-600 bg-clip-text text-transparent'>
                Share
              </span>{' '}
              your digital world with just a single{' '}
              <span className='bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                link!
              </span>
            </h1>

            <p className='mb-10 mt-5 w-full text-lg font-normal text-neutral-200 md:w-[80%]'>
              Compile all your links into one, customized page and connect with
              your audience seamlessly.
            </p>
            <Link href='/auth' className='btn bg-primary !py-3 text-base'>
              Create my page
            </Link>
          </article>

          <div className='md:w-35% ml-auto hidden h-full flex-row items-center justify-center md:flex'>
            <div className='rotate-[7deg] rounded-2xl '>
              <Image
                src='/home/model.png'
                alt='model'
                width={300}
                height={700}
              />
            </div>
          </div>
        </section>
      </div>
      <HomeFooter />
    </main>
  )
}
