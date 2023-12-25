import {clsx} from 'clsx'
import {collection, getDocs, query, where} from 'firebase/firestore'
import {Fragment, useEffect, useState} from 'react'
import {useForm} from 'react-hook-form'
import * as z from 'zod'

import {db} from '@/libs/firebase'
import {Dialog, Transition} from '@headlessui/react'
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
  initialOpen?: boolean
}

export const Modal = ({onSave, initialOpen = false}: ModalProps) => {
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
    closeModal()
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

  function closeModal() {
    setIsOpen(false)
  }

  useEffect(() => {
    setIsOpen(initialOpen)
  }, [initialOpen])

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as='div' className='relative z-10' onClose={() => null}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'>
            <div className='fixed inset-0 bg-black/25' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'>
                <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all'>
                  <Dialog.Title
                    as='h3'
                    className='text-lg font-medium leading-6 text-gray-900'>
                    Choose your username
                  </Dialog.Title>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='mt-2'>
                      <p className='text-sm text-gray-500'>
                        The <b>username</b> will be used to create your url.
                        Obs: white spaces will be removed.
                      </p>
                    </div>

                    <div className='mt-2'>
                      <input
                        placeholder='Type your username'
                        className={clsx(
                          'border-1 w-full rounded-md border border-gray-400 p-2',
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
                        type='submit'
                        className='inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-8 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-gray-300
                        disabled:text-gray-900
                        disabled:opacity-50'
                        disabled={submitDisabled}>
                        Save
                      </button>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
