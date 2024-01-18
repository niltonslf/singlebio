'use client'

import {CheckCircle} from 'lucide-react'
import Link from 'next/link'
import {useState} from 'react'
import {useForm} from 'react-hook-form'

import {Button} from '@/app/components'
import {SignUpWithEmailAndPassword} from '@/models'

import {authStore} from '../context/auth-store'

const Register = () => {
  const {register, handleSubmit} = useForm<SignUpWithEmailAndPassword>()

  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [accountCreated, setAccountCreated] = useState(false)

  const handleRegisterWithEmailAndPassword = async (
    data: SignUpWithEmailAndPassword,
  ) => {
    setIsLoading(true)
    try {
      await authStore.createWithEmailAndPassword(data)
      setAccountCreated(true)
      setIsLoading(false)
    } catch (error: any) {
      setError(true)
      setIsLoading(false)
      setAccountCreated(false)
    }
  }

  return (
    <div className='flex flex-col'>
      {accountCreated ? (
        <div role='alert' className='alert alert-success'>
          <CheckCircle />
          <div>
            <h3 className='font-bold'>Account created with success!</h3>
            <p>
              Please, activate your account using the link sent to your email.
            </p>
          </div>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(handleRegisterWithEmailAndPassword)}
          className='flex w-full flex-col gap-3'>
          <input
            type='text'
            className='input input-bordered'
            placeholder='Name'
            {...register('displayName')}
          />

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
            Sign up
          </Button>

          <div className='flex items-center justify-between'>
            <Link href='/auth' className='btn btn-ghost w-full'>
              Cancel
            </Link>
          </div>
        </form>
      )}

      {error && (
        <p
          data-testid='error-msg'
          className='mt-5 rounded-md bg-red-200 p-2 text-sm text-black'>
          There was an error to create your account. Please, try again later or
          use a different email.
        </p>
      )}
    </div>
  )
}
export default Register
