'use client'

import {observer} from 'mobx-react-lite'
import Image from 'next/image'
import {useRouter} from 'next/navigation'
import {useState} from 'react'

import {useValidateAuth} from '../admin/hooks'
import {GithubIcon, GoogleIcon} from '../components'
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
    <main className='m-auto flex h-screen w-screen items-center justify-center bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-yellow-500 via-purple-500 to-blue-500 px-10'>
      <section className='flex w-[400px] max-w-full flex-col rounded-lg bg-background-100 px-4 py-10 text-bw-1000 shadow-2xl shadow-black'>
        <header className='mb-12 flex w-full justify-center'>
          <Image src='/logo-white.png' width={200} height={52} alt='logo' />
        </header>

        <button
          onClick={handleLoginWithGoogle}
          type='button'
          className='dark:focus:ring-[#4285F4]/55 mb-2  mr-2 inline-flex w-full items-center justify-center rounded-lg bg-[#4285F4] px-5 py-2.5 text-sm font-medium text-bw-1000 hover:bg-[#4285F4]/90 focus:outline-none focus:ring-4 focus:ring-[#4285F4]/50'>
          <GoogleIcon />
          Sign up with Google
        </button>

        <div className='after:bg-red after:content-[" "] relative my-5 flex items-center justify-center after:absolute after:left-[0] after:top-[50%] after:w-full after:border-b after:border-gray-400'>
          <span className='relative z-20 bg-background-100 px-4 text-slate-300'>
            Soon
          </span>
        </div>

        <button
          type='button'
          className='flex w-full max-w-md cursor-not-allowed items-center justify-center gap-2 rounded-lg bg-gray-600 px-4 py-2 text-center text-base font-semibold text-bw-1000 opacity-60 shadow-md transition duration-200 ease-in hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-200'>
          <GithubIcon />
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
