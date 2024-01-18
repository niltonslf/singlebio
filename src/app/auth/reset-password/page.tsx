'use client'

import {CheckCircle2} from 'lucide-react'
import {useState} from 'react'
import {useForm} from 'react-hook-form'

import {Button} from '@/app/components'
import {LoginWithEmailAndPassword} from '@/models'

import {authStore} from '../context/auth-store'

type FormData = Pick<LoginWithEmailAndPassword, 'email'>

const ResetPasswordPage = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: {isSubmitSuccessful},
  } = useForm<FormData>()

  const [isLoading, setIsLoading] = useState(false)

  const handleResetPassword = async (data: FormData) => {
    setIsLoading(true)
    await authStore.resetPassword(data.email)
    reset()
    setIsLoading(false)
  }

  return (
    <div>
      <p className='text-xs text-base-content/70'>
        Type your account email address.
      </p>
      <form
        onSubmit={handleSubmit(handleResetPassword)}
        className='mt-2 flex w-full flex-col gap-3'>
        <input
          type='email'
          className='input input-bordered'
          placeholder='Email'
          {...register('email')}
        />

        <Button
          className='flex w-full max-w-md text-base-content disabled:bg-white/30 disabled:text-base-100'
          isLoading={isLoading}>
          Reset password
        </Button>

        {isSubmitSuccessful && (
          <div className='alert alert-success'>
            <CheckCircle2 />
            <span>
              A password email reset was sent. Please, check your inbox.
            </span>
          </div>
        )}
      </form>
    </div>
  )
}

export default ResetPasswordPage
