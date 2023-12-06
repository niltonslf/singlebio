import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <main className='flex h-screen w-screen flex-col bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 px-5 font-normal'>
      <nav className='mx-auto flex w-full max-w-6xl items-center justify-between py-2'>
        <Link href='/' title='Brand' className='font-semibold'>
          /share@LnkTree
        </Link>

        <Link
          href='/auth'
          className='group relative mb-2 me-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-pink-500 to-orange-400 p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-pink-200 group-hover:from-pink-500 group-hover:to-orange-400 dark:text-white dark:focus:ring-pink-800'>
          <span className='relative rounded-md bg-white px-5 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900'>
            Access
          </span>
        </Link>
      </nav>

      <section className='mx-auto flex h-full w-full max-w-full flex-col items-center justify-center md:w-7/12 lg:w-6/12 '>
        <h1 className='text-center text-5xl font-extrabold md:text-6xl'>
          Share{' '}
          <span className='bg-gradient-to-r from-fuchsia-600 to-pink-600 bg-clip-text text-transparent'>
            links
          </span>{' '}
          to your best with your followers
        </h1>

        <p className='mb-5 mt-5 text-lg font-semibold'>
          A link share app 100% free to use.
        </p>
        <Link
          href='/auth'
          className='group relative mb-2 me-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-pink-500 to-orange-400 p-0.5 text-sm font-medium text-gray-900 hover:text-white focus:outline-none focus:ring-4 focus:ring-pink-200 group-hover:from-pink-500 group-hover:to-orange-400 dark:text-white dark:focus:ring-pink-800'>
          <span className='relative rounded-md bg-white px-10 py-2.5 transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900'>
            Try it now
          </span>
        </Link>
      </section>
    </main>
  );
}
