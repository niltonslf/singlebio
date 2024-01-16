'use client'

import {ArrowLeft} from 'lucide-react'
import {observer} from 'mobx-react-lite'
import Image from 'next/image'
import Link from 'next/link'
import {useRouter} from 'next/navigation'
import {useState} from 'react'

import {useValidateAuth} from '../admin/hooks'
import {Button, GithubIcon, GoogleIcon} from '../components'
import {authStore} from './context/auth-store'

const SignIn = observer(() => {
  const {push} = useRouter()
  const {isFetchingUser} = useValidateAuth()

  const [error, setError] = useState(false)

  const [emailPasswordForm, setEmailPasswordForm] = useState({
    email: '',
    password: '',
    isCreate: false,
  })
  const [isLoading, setIsLoading] = useState(false)

  const handleLoginWithGoogle = async () => {
    try {
      await authStore.signInWithGoogle()
      push('/admin')
    } catch (error: any) {
      setError(true)
    }
  }

  const handleLoginWithGithub = async () => {
    try {
      await authStore.signInWithGithub()
      push('/admin')
    } catch (error: any) {
      setError(true)
    }
  }

  const handleLoginWithEmailAndPassword = async () => {
    const {email, password} = emailPasswordForm
    try {
      await authStore.signInWithEmailAndPassword(email, password)
      push('/admin')
    } catch (error: any) {
      setError(true)
    }
  }

  const handleRegisterWithEmailAndPassword = async () => {
    const {email, password} = emailPasswordForm
    setIsLoading(true)
    try {
      await authStore.createWithEmailAndPassword(email, password)
      push('/admin')
      setIsLoading(false)
    } catch (error: any) {
      setError(true)
      setIsLoading(false)
    }
  }

  return (
    <main
      data-theme='dark'
      className='m-auto flex h-screen w-screen items-center justify-center bg-[conic-gradient(at_left,_var(--tw-gradient-stops))] from-yellow-500 via-purple-500 to-blue-500 px-10'>
      <section className='relative flex w-[400px] max-w-full flex-col rounded-lg bg-base-100 px-4 py-10 text-neutral-50 shadow-2xl shadow-black'>
        {!emailPasswordForm.isCreate && (
          <Link
            href='/'
            title='Go back home'
            className='btn btn-square btn-ghost btn-sm absolute left-4 top-4'>
            <ArrowLeft size={20} />
          </Link>
        )}

        {emailPasswordForm.isCreate && (
          <span
            onClick={() =>
              setEmailPasswordForm({email: '', password: '', isCreate: false})
            }
            title='Go back home'
            className='btn btn-square btn-ghost btn-sm absolute left-4 top-4 cursor-pointer'>
            <ArrowLeft size={20} />
          </span>
        )}

        <header className='mb-12 flex w-full justify-center'>
          <Image src='/logo-white.png' width={200} height={52} alt='logo' />
        </header>
        <div className='flex flex-col'>
          <div className='flex w-full flex-col gap-3'>
            <input
              type='email'
              className='input  input-bordered'
              placeholder='Email'
              value={emailPasswordForm.email}
              onChange={ev =>
                setEmailPasswordForm(prev => ({
                  ...prev,
                  email: ev?.target.value,
                }))
              }
            />
            <input
              type='password'
              className='input input-bordered'
              placeholder='Password'
              value={emailPasswordForm.password}
              onChange={ev =>
                setEmailPasswordForm(prev => ({
                  ...prev,
                  password: ev?.target.value,
                }))
              }
            />

            {!emailPasswordForm.isCreate && (
              <Button
                onClick={() => handleLoginWithEmailAndPassword()}
                className='flex w-full max-w-md text-base-content disabled:bg-white/30 disabled:text-base-100'
                isLoading={isFetchingUser}
                disabled={
                  !emailPasswordForm.email && !emailPasswordForm.password
                }>
                Sign in
              </Button>
            )}

            {emailPasswordForm.isCreate && (
              <Button
                onClick={() => handleRegisterWithEmailAndPassword()}
                className='flex w-full max-w-md text-base-content disabled:bg-white/30 disabled:text-base-100'
                isLoading={isLoading}
                disabled={
                  !emailPasswordForm.email && !emailPasswordForm.password
                }>
                Sign up with email
              </Button>
            )}

            {!emailPasswordForm.isCreate && (
              <div className='mt-2 flex items-center justify-between'>
                <span
                  className='w-full cursor-pointer text-center text-xs text-info'
                  onClick={() =>
                    setEmailPasswordForm({
                      email: '',
                      password: '',
                      isCreate: true,
                    })
                  }>
                  Forgot your password?
                </span>

                <span
                  className='w-full cursor-pointer text-center text-xs text-info'
                  onClick={() =>
                    setEmailPasswordForm({
                      email: '',
                      password: '',
                      isCreate: true,
                    })
                  }>
                  Create an account
                </span>
              </div>
            )}
          </div>

          {!emailPasswordForm.isCreate && (
            <div className='after:bg-red after:content-[" "] relative my-3 flex items-center justify-center after:absolute after:left-[0] after:top-[50%] after:w-full after:border-b after:border-gray-400'>
              <span className='relative z-20 bg-base-100 px-4 text-base-content/70'>
                or
              </span>
            </div>
          )}

          {!emailPasswordForm.isCreate && (
            <div className='flex flex-col gap-3'>
              <Button
                variant='infor'
                isLoading={isFetchingUser}
                onClick={handleLoginWithGoogle}
                className='dark:focus:ring-[#4285F4]/55 !hover:bg-[#4285F4]/90  mb-2 mr-2 inline-flex w-full items-center justify-center rounded-lg !bg-[#4285F4] px-5 py-2.5 text-sm  text-neutral-50 focus:outline-none focus:ring-4 focus:ring-[#4285F4]/50'>
                <GoogleIcon />
                Sign in with Google
              </Button>

              <Button
                isLoading={isFetchingUser}
                onClick={handleLoginWithGithub}
                className='flex w-full max-w-md items-center justify-center gap-2 rounded-lg border-neutral bg-gray-600 px-4 py-2 text-center text-sm  text-neutral-50 shadow-md transition duration-200 ease-in hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-200'>
                <GithubIcon />
                Sign in with GitHub
              </Button>
            </div>
          )}
        </div>

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
