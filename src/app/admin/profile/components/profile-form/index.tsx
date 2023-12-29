import {Camera, XCircle} from 'lucide-react'
import {useRef, useState} from 'react'
import {useForm} from 'react-hook-form'
import * as z from 'zod'

import {SectionCard} from '@/app/admin/components'
import {authStore} from '@/app/auth/context/auth-store'
import {Avatar} from '@/app/components'
import {User} from '@/models'
import {merge, useDebounce} from '@/utils'
import {zodResolver} from '@hookform/resolvers/zod'

import {useProfile} from '../../hooks/use-profile'

import {UsernameInput, UsernameInputForm, usernameInputRules} from '..'

type ProfileFormProps = {
  user: User
}
type UserProfile =
  | Required<Pick<User, 'username' | 'name' | 'bio'>>
  | UsernameInputForm

export const ProfileForm = ({user}: ProfileFormProps) => {
  const formRef = useRef<HTMLFormElement>(null)
  const {validateUsername} = useProfile()

  const [picture, setPicture] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [validUsername, setValidUsername] = useState(true)

  const profileFormSchema = z.object({
    bio: z.string().nullable(),
    name: z.string().min(3, {message: 'Required field'}),
    ...usernameInputRules,
  })

  const {
    register,
    handleSubmit,
    control,
    formState: {errors},
  } = useForm<UserProfile>({
    defaultValues: {
      bio: user.bio,
      name: user.name,
      username: user.username,
    },
    resolver: zodResolver(profileFormSchema),
  })

  const onSubmit = async (user: UserProfile) => {
    setIsSubmitting(true)
    await authStore.updateUser(user)
    setIsSubmitting(false)
  }

  const triggerFormSubmit = useDebounce(() => {
    formRef.current?.requestSubmit()
  })

  const handleCheckUsername = async (username: string) => {
    setValidUsername(true)
    const isValid = await validateUsername(username)
    setValidUsername(isValid)
  }

  const handleSelectPicture = () => {}

  return (
    <SectionCard title='My data'>
      {isSubmitting && (
        <div className='absolute right-3 top-3'>
          <div className='bw sm loader'>
            <div className='spin' />
          </div>
        </div>
      )}

      <form
        ref={formRef}
        onSubmit={handleSubmit(onSubmit)}
        onChange={() => triggerFormSubmit()}
        className='flex flex-col-reverse flex-wrap items-center gap-5 md:flex-row '>
        <div className='flex w-full flex-1 flex-col gap-3'>
          <UsernameInput
            control={control}
            onChange={handleCheckUsername}
            isUsernameValid={validUsername}
            errors={errors}
          />

          <input
            type='text'
            className='bw solid input !border-background-600'
            placeholder='Name'
            {...register('name', {required: true})}
          />
          <textarea
            placeholder='Bio'
            className='bw solid input !border-background-600'
            maxLength={100}
            wrap='soft'
            rows={2}
            {...register('bio', {required: true})}
          />
        </div>

        <div className='relative w-28 md:w-auto'>
          <Avatar
            name={user.name}
            className='border-0'
            pictureUrl={picture || ''}
            size={150}
          />
          {picture && (
            <div
              onClick={() => setPicture('')}
              className={merge([
                'flex h-7 w-7 items-center justify-center rounded-full',
                'absolute right-0 top-0 cursor-pointer',
                'group bg-background-100',
                'hover:bg-background-1100',
                'md:right-1 md:top-1',
              ])}>
              <XCircle
                size={25}
                className='text-bw-1100 group-hover:text-bw-50'
              />
            </div>
          )}

          {!picture && (
            <div
              onClick={() => handleSelectPicture}
              className={merge([
                'flex h-7 w-7 items-center justify-center rounded-full',
                'absolute right-0 top-0 cursor-pointer',
                'group hover:bg-background-50',
                'bg-background-1100',
                'md:right-1 md:top-1',
              ])}>
              <Camera
                size={18}
                className='text-bw-50 group-hover:text-bw-1100'
              />
            </div>
          )}
        </div>
      </form>
    </SectionCard>
  )
}
