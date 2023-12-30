import {Camera, XCircle} from 'lucide-react'
import {useRef, useState} from 'react'
import {useForm} from 'react-hook-form'
import * as z from 'zod'

import {SectionCard} from '@/app/admin/components'
import {useSmartphone} from '@/app/admin/context'
import {useImageCompressor, useImageUploader} from '@/app/admin/hooks'
import {authStore} from '@/app/auth/context/auth-store'
import {Avatar, InputErrorMsg} from '@/app/components'
import {User} from '@/models'
import {merge, useDebounce} from '@/utils'
import {zodResolver} from '@hookform/resolvers/zod'

import {useProfile} from '../../hooks/use-profile'

import {UsernameInput, usernameInputRules} from '..'

type ProfileFormProps = {
  user: User
}
type UserProfile = Required<Pick<User, 'username' | 'name' | 'bio'>> & {
  pictureUrl?: string
}

export const ProfileForm = ({user}: ProfileFormProps) => {
  const profileFormSchema = z.object({
    bio: z.string().nullable(),
    name: z.string().min(3, {message: 'Required field'}),
    ...usernameInputRules,
  })

  const formRef = useRef<HTMLFormElement>(null)
  const {validateUsername} = useProfile()
  const {returnImageThumbnail, upload} = useImageUploader()
  const {compress} = useImageCompressor()
  const {reloadSmartphoneList} = useSmartphone()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isUploadingImg, setIsUploadingImg] = useState(false)
  const [validUsername, setValidUsername] = useState(true)

  const [picture, setPicture] = useState(user.pictureUrl ?? '')
  const [pictureFile, setPictureFile] = useState<FileList | null>(null)

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

  const onSubmit = async (data: UserProfile) => {
    setIsSubmitting(true)

    const userData = {...data}
    const file = pictureFile?.[0]

    if (file) {
      setIsUploadingImg(true)

      const localUrl = returnImageThumbnail(file)
      setPicture(localUrl)

      const newImage = await compress(file)
      const remoteUrl = await upload(newImage, 'profile')

      userData['pictureUrl'] = remoteUrl
      setPictureFile(null)
      setPicture(remoteUrl)
    }

    await authStore.updateUser(userData)
    setIsUploadingImg(false)
    setIsSubmitting(false)
    reloadSmartphoneList()
  }

  const triggerFormSubmit = useDebounce(() => {
    formRef.current?.requestSubmit()
  }, 1000)

  const handleCheckUsername = async (username: string) => {
    setValidUsername(true)
    const isValid = await validateUsername(username)
    setValidUsername(isValid)
  }

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
            className={merge([
              'bw solid input !border-background-600',
              errors?.name?.message && '!border-red-400',
            ])}
            placeholder='Name'
            {...register('name', {required: true})}
          />

          {errors?.name?.message && (
            <InputErrorMsg>{errors?.name?.message}</InputErrorMsg>
          )}

          <textarea
            placeholder='Bio'
            className={merge([
              'bw solid input !border-background-600',
              errors?.bio?.message && '!border-red-400',
            ])}
            maxLength={100}
            wrap='soft'
            rows={2}
            {...register('bio', {required: true})}
          />

          {errors?.bio?.message && (
            <InputErrorMsg>{errors?.bio?.message}</InputErrorMsg>
          )}
        </div>

        <div className='relative w-28 md:w-auto'>
          <Avatar name={user.name} pictureUrl={picture} size={150} />
          <input
            id='profile-picture'
            type='file'
            accept='image/x-png,image/jpeg'
            multiple={false}
            onChange={event => setPictureFile(event.target.files)}
            className='hidden'
          />

          {isUploadingImg && (
            <div className='absolute left-0 top-0 flex h-full w-full flex-col items-center justify-center rounded-full bg-black bg-opacity-80'>
              <div className='primary sm loader '>
                <div className='bar-bounce' />
              </div>

              <span className='mt-2 text-sm font-semibold text-white'>
                Uploading...
              </span>
            </div>
          )}

          {picture && !isUploadingImg && (
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

          {!picture && !isUploadingImg && (
            <label
              htmlFor='profile-picture'
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
            </label>
          )}
        </div>
      </form>
    </SectionCard>
  )
}
