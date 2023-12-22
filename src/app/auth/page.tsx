'use client'

import {observer} from 'mobx-react-lite'
import {useRouter} from 'next/navigation'
import {useState} from 'react'

import {useValidateAuth} from '../admin/hooks'
import {GoogleIcon} from '../components'
import {authStore} from './context/auth-store'

const SignIn = observer(() => {
  const router = useRouter()
  useValidateAuth()

  const [error, setError] = useState(false)

  const handleLoginWithGoogle = async () => {
    try {
      await authStore.signInWithGoogle()
      router.push('/admin')
    } catch (error: any) {
      setError(true)
    }
  }

  return (
    <main className='m-auto flex h-[100vh] w-[100vw] items-center justify-center bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-yellow-500 via-purple-500 to-blue-500 px-10'>
      <section className='flex w-[400px] max-w-full flex-col rounded-lg bg-gray-900 px-4 py-10 text-white shadow-2xl'>
        <header className='mb-4 flex w-full justify-center'>
          <h1 className='text-[2rem] font-semibold'>Lnktree</h1>
        </header>

        <button
          onClick={handleLoginWithGoogle}
          type='button'
          className='dark:focus:ring-[#4285F4]/55 mb-2  mr-2 inline-flex w-full items-center justify-center rounded-lg bg-[#4285F4] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#4285F4]/90 focus:outline-none focus:ring-4 focus:ring-[#4285F4]/50'>
          <GoogleIcon />
          Sign up with Google
        </button>

        <div className='after:bg-red after:content-[" "] relative my-5 flex items-center justify-center after:absolute after:left-[0] after:top-[50%] after:w-full after:border-b after:border-gray-400'>
          <span className='relative z-20 bg-gray-900 px-4 text-gray-400'>
            Soon
          </span>
        </div>

        <button
          type='button'
          className='flex w-full max-w-md cursor-not-allowed items-center justify-center rounded-lg bg-gray-600 px-4 py-2 text-center text-base font-semibold text-white opacity-60 shadow-md transition duration-200 ease-in hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-200'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='20'
            height='20'
            fill='currentColor'
            className='mr-2'
            viewBox='0 0 1792 1792'>
            <path d='M896 128q209 0 385.5 103t279.5 279.5 103 385.5q0 251-146.5 451.5t-378.5 277.5q-27 5-40-7t-13-30q0-3 .5-76.5t.5-134.5q0-97-52-142 57-6 102.5-18t94-39 81-66.5 53-105 20.5-150.5q0-119-79-206 37-91-8-204-28-9-81 11t-92 44l-38 24q-93-26-192-26t-192 26q-16-11-42.5-27t-83.5-38.5-85-13.5q-45 113-8 204-79 87-79 206 0 85 20.5 150t52.5 105 80.5 67 94 39 102.5 18q-39 36-49 103-21 10-45 15t-57 5-65.5-21.5-55.5-62.5q-19-32-48.5-52t-49.5-24l-20-3q-21 0-29 4.5t-5 11.5 9 14 13 12l7 5q22 10 43.5 38t31.5 51l10 23q13 38 44 61.5t67 30 69.5 7 55.5-3.5l23-4q0 38 .5 88.5t.5 54.5q0 18-13 30t-40 7q-232-77-378.5-277.5t-146.5-451.5q0-209 103-385.5t279.5-279.5 385.5-103zm-477 1103q3-7-7-12-10-3-13 2-3 7 7 12 9 6 13-2zm31 34q7-5-2-16-10-9-16-3-7 5 2 16 10 10 16 3zm30 45q9-7 0-19-8-13-17-6-9 5 0 18t17 7zm42 42q8-8-4-19-12-12-20-3-9 8 4 19 12 12 20 3zm57 25q3-11-13-16-15-4-19 7t13 15q15 6 19-6zm63 5q0-13-17-11-16 0-16 11 0 13 17 11 16 0 16-11zm58-10q-2-11-18-9-16 3-14 15t18 8 14-14z'></path>
          </svg>
          Sign up with GitHub
        </button>

        {error && (
          <p
            data-testid='error-msg'
            className='mt-5 rounded-md bg-red-200 p-2 text-sm text-black'>
            There was an error to access your account. Please, try again later
            or use a different account.
          </p>
        )}
      </section>
    </main>
  )
})

export default SignIn
