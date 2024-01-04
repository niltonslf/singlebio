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
    if (username.length === 0) return
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
      <dialog className={merge(['modal', isOpen && 'modal-open'])}>
        <div className='modal-box'>
          <h3 className='text-lg font-bold'>Choose your username</h3>
          <div className='divider'></div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='mt-2'>
              <p className='text-neutral-200 '>
                The <b className='text-primary'>username</b> will be used to
                create your unique page url.
              </p>
            </div>

            <div className='mt-3 w-full'>
              <UsernameInput
                control={control}
                onChange={checkUsername}
                isUsernameValid={
                  !errors?.username?.message && !usernameAlreadyTaken
                }
                errors={errors}
              />
            </div>

            <div className='mt-4'>
              <button
                data-testid='modal-submit-button'
                type='submit'
                className='btn btn-primary btn-wide mt-5'
                disabled={submitDisabled}>
                Save
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  )
}
