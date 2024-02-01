import {useState} from 'react'

import {authStore} from '@/app/auth/context/auth-store'
import {User} from '@/domain/models'
import {useDebounce} from '@/utils'

type SpotifySectionProps = {
  user: User
}

export const SpotifySection = ({user}: SpotifySectionProps) => {
  const [spotifyUrl, setSpotifyUrl] = useState(
    user?.features?.spotify?.url ?? '',
  )
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (value: string) => {
    setIsSubmitting(true)
    const data = {
      features: {
        ...user.features,
        spotify: {
          ...user.features?.spotify,
          url: value,
        },
      },
    }

    await authStore.updateUser(data)
    setIsSubmitting(false)
  }

  const handleSubmitDebounced = useDebounce(value => handleSubmit(value), 1000)

  return (
    <form
      className='relative'
      onChange={(event: any) => handleSubmitDebounced(event.target?.value)}>
      {isSubmitting && (
        <div className='absolute right-3 top-3'>
          <div className='loading loading-spinner loading-xs text-neutral-50'></div>
        </div>
      )}
      <label className='form-control w-full'>
        <div className='label'>
          <span className='label-text-alt'>Spotify url</span>
        </div>
        <input
          type='text'
          className='input input-bordered input-md w-full'
          placeholder='Url'
          value={spotifyUrl}
          onChange={event => setSpotifyUrl(event.target.value)}
        />
      </label>
    </form>
  )
}
