'use client'

import {collection, getDocs, query, where} from 'firebase/firestore'
import {useEffect, useState} from 'react'
import {useForm} from 'react-hook-form'

import {
  UsernameInput,
  UsernameInputForm,
  usernameInputSchema,
} from '@/app/admin/profile/components'
import {db} from '@/libs/firebase'
import {merge} from '@/utils'
import {zodResolver} from '@hookform/resolvers/zod'

type ModalProps = {
  onSave: (username: string) => Promise<void>
  initialOpen: boolean
}

export const Modal = ({onSave, initialOpen}: ModalProps) => {
  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm<UsernameInputForm>({
    defaultValues: {
      username: '',
    },
    resolver: zodResolver(usernameInputSchema),
  })

  const [isOpen, setIsOpen] = useState(initialOpen)
  const [submitDisabled, setSubmitDisabled] = useState(true)
  const [usernameAlreadyTaken, setUsernameAlreadyTaken] = useState(false)

  const onSubmit = async (data: UsernameInputForm) => {
    await onSave(data.username)
    setIsOpen(false)
  }

  const checkUsername = async (username: string) => {
    username = username.replace('@', '')
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
          'w-max-[100%] modal flex w-96 flex-col gap-2 bg-background-100 ',
          isOpen ? 'show' : '',
        ])}>
        <h2 className='text-xl'>Choose your username</h2>
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='mt-2'>
              <p className='text-sm text-slate-300'>
                The <b className='text-primary-900'>username</b> will be used to
                create your unique page url.
              </p>
            </div>

            <div className='mt-3'>
              <UsernameInput
                control={control}
                onChange={checkUsername}
                isUsernameValid={
                  !!errors?.username?.message || usernameAlreadyTaken
                }
                errors={errors}
              />
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
