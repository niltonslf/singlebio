'use client'

import {collection, getDocs, query, where} from 'firebase/firestore'
import {useRouter} from 'next/navigation'
import {useState} from 'react'
import {useForm} from 'react-hook-form'

import {SectionCard} from '@/app/admin/components'
import {adminStore} from '@/app/admin/context/admin-store'
import {
  UsernameInput,
  UsernameInputForm,
  usernameInputSchema,
} from '@/app/admin/profile/components'
import {db} from '@/services/firebase'
import {zodResolver} from '@hookform/resolvers/zod'

const SetUsernamePage = () => {
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

  const router = useRouter()

  const [submitDisabled, setSubmitDisabled] = useState(true)
  const [usernameAlreadyTaken, setUsernameAlreadyTaken] = useState(false)

  const onSubmit = async (data: UsernameInputForm) => {
    await adminStore.updateUser({username: data.username})
    router.replace('/admin')
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

  return (
    <div className='flex h-full w-full items-center justify-center '>
      <div className='w-1/2'>
        <SectionCard title='Choose your username'>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className='mt-2'>
              <p className='text-base-content/70 '>
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
        </SectionCard>
      </div>
    </div>
  )
}

export default SetUsernamePage
