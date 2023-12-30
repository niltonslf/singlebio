import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <main className='via-background-200 flex h-[100vh] w-screen flex-col bg-gradient-to-tr from-base-100 to-neutral p-5'>
      <nav className='mx-auto flex w-full max-w-6xl items-center justify-between py-2'>
        <Link href='/' title='Brand' className='font-semibold'>
          <Image
            src='/logo-white.png'
            width={114.72}
            height={30}
            alt='lnktree logo'
          />
        </Link>

        <Link
          href='/auth'
          className='group relative mb-2 me-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-pink-500 to-orange-400 p-0.5 text-sm font-medium text-gray-900 hover:text-neutral-50 focus:outline-none focus:ring-4 focus:ring-pink-200 group-hover:from-pink-500 group-hover:to-orange-400 dark:text-neutral-50 dark:focus:ring-pink-800'>
          <span className='relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900'>
            Access
          </span>
        </Link>
      </nav>

      <section className='mx-auto mt-14 flex w-full max-w-6xl flex-row items-center justify-center'>
        <article className='w-[55%] '>
          <h1 className='text-left text-7xl  font-extrabold leading-none'>
            <span className='bg-gradient-to-r from-fuchsia-600 to-pink-600 bg-clip-text text-transparent'>
              Share
            </span>{' '}
            your digital world with just a single{' '}
            <span className='bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
              link!
            </span>
          </h1>

          <p className='mb-10 mt-5 w-[80%] text-lg font-normal text-neutral-200'>
            Compile all your links into one, customized page and connect with
            your audience seamlessly.
          </p>
          <Link
            href='/auth'
            className='btn border-pink-500 bg-gradient-to-tr from-pink-500 to-orange-400 !py-3 text-base'>
            Create my page
          </Link>
        </article>

        <div className='w-35% ml-auto flex h-full flex-row items-center justify-center'>
          <div className='overflow-hidden rounded-2xl '>
            <Image src='/model.png' alt='model' width={300} height={700} />
          </div>
        </div>
      </section>
    </main>
  )
}
