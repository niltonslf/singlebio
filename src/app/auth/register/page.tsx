'use client'

import {CheckCircle} from 'lucide-react'
import Link from 'next/link'
import {useState} from 'react'
import {useForm} from 'react-hook-form'
import {z} from 'zod'

import {Button} from '@/app/components'
import {SignUpWithEmailAndPassword} from '@/models'
import {zodResolver} from '@hookform/resolvers/zod'

import {authStore} from '../context/auth-store'

const schema = z.object({
  displayName: z
    .string()
    .min(3, {message: 'Name field required at least 3 characters'}),
  email: z.string().min(8, {message: 'Email is required'}),
  password: z
    .string()
    .min(8, {message: 'Password field requires at least 8 characters'}),
})

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<SignUpWithEmailAndPassword>({
    resolver: zodResolver(schema),
  })

  const [error, setError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [accountCreated, setAccountCreated] = useState(false)

  const handleRegisterWithEmailAndPassword = async (
    data: SignUpWithEmailAndPassword,
  ) => {
    try {
      setIsLoading(true)
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
          <h1 className='mb-3 text-xl font-bold'>Sign up</h1>

          <input
            type='text'
            className='input input-bordered'
            placeholder='Name'
            {...register('displayName')}
          />
          {errors.displayName && (
            <div className='text-xs text-error'>
              {errors.displayName.message}
            </div>
          )}

          <input
            type='email'
            className='input input-bordered'
            placeholder='Email'
            {...register('email')}
          />
          {errors.email && (
            <div className='text-xs text-error'>{errors.email.message}</div>
          )}

          <input
            type='password'
            className='input input-bordered'
            placeholder='Password'
            {...register('password')}
          />
          {errors.password && (
            <div className='text-xs text-error'>{errors.password.message}</div>
          )}

          <Button
            className='mt-5 flex w-full max-w-md text-base-content disabled:bg-white/30 disabled:text-base-100'
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
export default RegisterPage
