import Image from 'next/image'
import {useRef, useState} from 'react'
import {useForm} from 'react-hook-form'
import * as z from 'zod'

import {SectionCard} from '@/app/admin/components'
import {adminStore} from '@/app/admin/context/admin-store'
import {useImageCompressor, useImageUploader} from '@/app/admin/hooks'
import {Avatar, InputErrorMsg} from '@/app/components'
import {User} from '@/domain/models'
import {merge, useDebounce} from '@/utils'
import {zodResolver} from '@hookform/resolvers/zod'

import {useProfile} from '../../hooks/use-profile'

import {
  FloatButton,
  OverlayUploading,
  UsernameInput,
  usernameInputRules,
} from '..'

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
    if (!validUsername) return false

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

    await adminStore.updateUser(userData)
    setIsUploadingImg(false)
    setIsSubmitting(false)
  }

  const triggerFormSubmit = useDebounce(() => {
    formRef.current?.requestSubmit()
  }, 1000)

  const handleCheckUsername = async (username: string) => {
    const isValid = await validateUsername(username)
    setValidUsername(isValid)
  }

  const toggleProfile = () => {
    if (picture) return setPicture('')
    document.querySelector<HTMLInputElement>('#profile-picture')?.click()
  }

  return (
    <SectionCard>
      {isSubmitting && (
        <div className='absolute right-3 top-3'>
          <div className='loading loading-spinner loading-xs text-neutral-50'></div>
        </div>
      )}

      <form
        ref={formRef}
        onSubmit={handleSubmit(onSubmit)}
        onChange={() => triggerFormSubmit()}
        className='flex flex-row flex-wrap items-center gap-5 md:flex-row '>
        <div className='flex w-full items-center gap-5'>
          <div className='relative w-2/5 overflow-hidden rounded-md md:w-1/3'>
            <Avatar
              name={user.name}
              pictureUrl={picture}
              size={260}
              className='aspect-auto h-44 w-full rounded-none'
            />
            <input
              id='profile-picture'
              type='file'
              accept='image/x-png,image/jpeg'
              multiple={false}
              onChange={event => setPictureFile(event.target.files)}
              className='hidden'
            />

            {isUploadingImg && <OverlayUploading />}

            {!isUploadingImg && (
              <FloatButton active={!!picture} onClick={() => toggleProfile()} />
            )}
          </div>

          <Image
            src='https://firebasestorage.googleapis.com/v0/b/lnktree.appspot.com/o/uploads%2FwGUlEbyej1fQ2uMq5Nw6k2Vftas2%2Fwallpaper.jpg?alt=media&token=2ae95b3a-ebca-49ba-8c5a-e335671ca942'
            width={300}
            height={150}
            className='ml-auto h-44 w-2/3 rounded-md object-cover'
            alt='Image'
          />
        </div>

        <div className='flex w-full flex-col gap-5'>
          <div className='flex items-center gap-5'>
            <div className='form-control w-full'>
              <div className='label'>
                <span className='label-text text-xs'>Username</span>
              </div>
              <UsernameInput
                control={control}
                onChange={handleCheckUsername}
                isUsernameValid={validUsername}
                errors={errors}
              />
            </div>

            <div className='form-control w-full'>
              <div className='label'>
                <span className='label-text text-xs'>Email</span>
              </div>
              <input
                type='email'
                disabled
                className={merge(['input input-bordered input-md w-full'])}
                value={adminStore.user?.email}
              />
            </div>
          </div>

          <div className='form-control w-full'>
            <div className='label'>
              <span className='label-text text-xs'>Name</span>
            </div>
            <input
              type='text'
              className={merge([
                'input input-bordered  input-md',
                errors?.name?.message && 'input-error',
              ])}
              placeholder='Name'
              {...register('name', {required: true})}
            />

            {errors?.name?.message && (
              <InputErrorMsg>{errors?.name?.message}</InputErrorMsg>
            )}
          </div>

          <div className='form-control w-full'>
            <div className='label'>
              <span className='label-text text-xs'>Bio</span>
            </div>
            <textarea
              placeholder='Bio'
              className={merge([
                'textarea textarea-bordered',
                errors?.bio?.message && 'textarea-error',
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
        </div>
      </form>
    </SectionCard>
  )
}
