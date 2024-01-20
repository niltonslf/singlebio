'use client'

import {CheckCircle2} from 'lucide-react'
import {useState} from 'react'
import {useForm} from 'react-hook-form'

import {Appear, Button, Disappear} from '@/app/components'
import {LoginWithEmailAndPassword} from '@/domain/models'

import {authStore} from '../context/auth-store'

type FormData = Pick<LoginWithEmailAndPassword, 'email'>

const ResetPasswordPage = () => {
  const {register, handleSubmit, reset} = useForm<FormData>()

  const [isLoading, setIsLoading] = useState(false)
  const [showAlert, setShowAlert] = useState(false)

  const handleResetPassword = async (data: FormData) => {
    setIsLoading(true)
    await authStore.resetPassword(data.email)
    reset()
    setIsLoading(false)
    setShowAlert(true)
  }

  return (
    <div>
      <Disappear isClosed={showAlert}>
        <form
          onSubmit={handleSubmit(handleResetPassword)}
          className='mt-2 flex w-full flex-col gap-3 px-1'>
          <p className='text-xs text-base-content/70'>
            Type your email address
          </p>

          <input
            autoFocus
            type='email'
            className='input input-bordered'
            placeholder='Email'
            autoComplete='email'
            {...register('email', {required: true})}
          />

          <Button
            className='mt-5 flex w-full max-w-md text-base-content disabled:bg-white/30 disabled:text-base-100'
            isLoading={isLoading}>
            Reset password
          </Button>
        </form>
      </Disappear>

      <Appear isOpen={showAlert} onClose={() => setShowAlert(false)}>
        <div role='alert' className='alert alert-success mt-3'>
          <CheckCircle2 />
          <span>
            <p>The email with a reset link was sent.</p>
            <p>
              Please, check your <b>inbox</b> or <b>spam</b> to reset your
              password.
            </p>
          </span>
        </div>
      </Appear>
    </div>
  )
}

export default ResetPasswordPage
