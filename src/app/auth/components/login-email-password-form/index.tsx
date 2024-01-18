'use client'

import {useForm} from 'react-hook-form'

import {Button} from '@/app/components'
import {LoginWithEmailAndPassword} from '@/models'

type LoginEmailPasswordFormProps = {
  onSubmit: (data: LoginWithEmailAndPassword) => void
  isLoading?: boolean
}

export const LoginEmailPasswordForm = ({
  onSubmit,
  isLoading,
}: LoginEmailPasswordFormProps) => {
  const {register, handleSubmit} = useForm<LoginWithEmailAndPassword>()

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
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
        Sign in with email
      </Button>
    </form>
  )
}
