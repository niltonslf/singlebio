'use client'

import {clsx} from 'clsx'
import {collection, getDocs, query, where} from 'firebase/firestore'
import {useEffect, useState} from 'react'
import {useForm} from 'react-hook-form'
import * as z from 'zod'

import {db} from '@/libs/firebase'
import {merge} from '@/utils'
import {zodResolver} from '@hookform/resolvers/zod'

type FormProps = {
  username: string
}

const schema = z.object({
  username: z
    .string()
    .transform(value => value.replace(/\s+/g, ''))
    .pipe(z.string().min(4, {message: 'Required field'})),
})

type ModalProps = {
  onSave: (username: string) => Promise<void>
  initialOpen: boolean
}

export const Modal = ({onSave, initialOpen}: ModalProps) => {
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<FormProps>({
    resolver: zodResolver(schema),
  })

  const [isOpen, setIsOpen] = useState(initialOpen)
  const [submitDisabled, setSubmitDisabled] = useState(true)
  const [usernameAlreadyTaken, setUsernameAlreadyTaken] = useState(false)

  const onSubmit = async (data: FormProps) => {
    await onSave(data.username)
    setIsOpen(false)
  }

  const checkUsername = async (username: string) => {
    setUsernameAlreadyTaken(false)

    const q = query(collection(db, 'users'), where('username', '==', username))
    const snapshot = await getDocs(q)

    if (snapshot.size) {
      setUsernameAlreadyTaken(true)
      return setSubmitDisabled(true)
    }

    setSubmitDisabled(false)
  }

  useEffect(() => {
    setIsOpen(initialOpen)
  }, [initialOpen])

  return (
    <>
      {isOpen && <label className='modal-overlay'></label>}
      <div
        className={merge([
          'w-max-[100%] modal flex w-96 flex-col gap-2 bg-background-300',
          isOpen ? 'show' : '',
        ])}>
        <h2 className='text-xl'>Choose your username</h2>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='mt-2'>
              <p className='text-sm text-slate-300'>
                The <b>username</b> will be used to create your url. Obs: white
                spaces will be removed.
              </p>
            </div>

            <div className='mt-2'>
              <input
                data-testid='modal-username-input'
                placeholder='Type your username'
                className={clsx(
                  'md input border-slate-500 placeholder:text-slate-500',
                  (errors?.username?.message || usernameAlreadyTaken) &&
                    'border-red-400 outline-red-400',
                )}
                {...register('username', {
                  required: true,
                  onChange: event => {
                    checkUsername(event.target.value)
                  },
                })}
              />
              {errors.username && (
                <p className='mt-2 text-sm text-red-400'>
                  {errors.username.message}
                </p>
              )}
              {usernameAlreadyTaken && (
                <p className='mt-2 text-sm text-red-400'>
                  username already taken.
                </p>
              )}
            </div>

            <div className='mt-4'>
              <button
                data-testid='modal-submit-button'
                type='submit'
                className='info btn solid'
                disabled={submitDisabled}>
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
