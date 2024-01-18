'use client'

import {observer} from 'mobx-react-lite'
import Link from 'next/link'
import {useRouter} from 'next/navigation'
import {useState} from 'react'
import {useForm} from 'react-hook-form'

import {useValidateAuth} from '@/app/admin/hooks'
import {Button, GoogleIcon, GithubIcon} from '@/app/components'
import {LoginWithEmailAndPassword} from '@/models'

import {authStore} from './context/auth-store'

const SignIn = observer(() => {
  const {register, handleSubmit} = useForm<LoginWithEmailAndPassword>()
  const {isFetchingUser} = useValidateAuth()

  const {push} = useRouter()

  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(isFetchingUser)

  const handleLoginWithGoogle = async () => {
    try {
      setIsLoading(true)
      await authStore.signInWithGoogle()
      push('/admin')
      setIsLoading(false)
    } catch (error: any) {
      setIsLoading(false)
      setError(true)
    }
  }

  const handleLoginWithGithub = async () => {
    try {
      setIsLoading(true)
      await authStore.signInWithGithub()
      push('/admin')
      setIsLoading(false)
    } catch (error: any) {
      setIsLoading(false)
      setError(true)
    }
  }

  const handleLoginWithEmailAndPassword = async (
    data: LoginWithEmailAndPassword,
  ) => {
    const {email, password} = data
    try {
      setIsLoading(true)
      await authStore.signInWithEmailAndPassword(email, password)

      push('/admin')
      setIsLoading(false)
    } catch (error: any) {
      setIsLoading(false)
      setError(true)
    }
  }
  return (
    <div className='flex flex-col'>
      <form
        onSubmit={handleSubmit(handleLoginWithEmailAndPassword)}
        className='flex w-full flex-col gap-3'>
        <input
          type='email'
          className='input input-bordered'
          placeholder='Email'
          {...register('email')}
        />

        <input
          type='password'
          className='input input-bordered'
          placeholder='Password'
          {...register('password')}
        />

        <Button
          className='flex w-full max-w-md text-base-content disabled:bg-white/30 disabled:text-base-100'
          isLoading={isLoading}>
          Sign in
        </Button>

        <div className='mt-2 flex items-center justify-between'>
          <span className='w-full cursor-pointer text-center text-xs text-info'>
            Forgot your password?
          </span>

          <Link
            href='/auth/register'
            className='w-full cursor-pointer text-center text-xs text-info'>
            Create an account
          </Link>
        </div>
      </form>

      <div className='after:bg-red after:content-[" "] relative my-3 flex items-center justify-center after:absolute after:left-[0] after:top-[50%] after:w-full after:border-b after:border-gray-400'>
        <span className='relative z-20 bg-base-100 px-4 text-base-content/70'>
          or
        </span>
      </div>

      <div className='flex flex-col gap-3'>
        <Button
          onClick={handleLoginWithGoogle}
          isLoading={isLoading}
          variant='infor'
          className='dark:focus:ring-[#4285F4]/55 !hover:bg-[#4285F4]/90  mb-2 mr-2 inline-flex w-full items-center justify-center rounded-lg !bg-[#4285F4] px-5 py-2.5 text-sm  text-neutral-50 focus:outline-none focus:ring-4 focus:ring-[#4285F4]/50'>
          <GoogleIcon />
          Sign in with Google
        </Button>

        <Button
          onClick={handleLoginWithGithub}
          isLoading={isLoading}
          className='flex w-full max-w-md items-center justify-center gap-2 rounded-lg border-neutral bg-gray-600 px-4 py-2 text-center text-sm  text-neutral-50 shadow-md transition duration-200 ease-in hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-200'>
          <GithubIcon />
          Sign in with GitHub
        </Button>
      </div>

      {error && (
        <p
          data-testid='error-msg'
          className='mt-5 rounded-md bg-red-200 p-2 text-sm text-black'>
          There was an error to access your account. Please, try again later or
          use a different account.
        </p>
      )}
    </div>
  )
})

export default SignIn
