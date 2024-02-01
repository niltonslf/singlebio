import {useState} from 'react'

import {adminStore} from '@/app/admin/context/admin-store'
import {User} from '@/domain/models'
import {useDebounce} from '@/utils'

type GithubSectionProps = {
  user: User
}

export const GithubSection = ({user}: GithubSectionProps) => {
  const [githubUsername, setGithubUsername] = useState(
    user?.features?.github?.username ?? '',
  )
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (value: string) => {
    setIsSubmitting(true)
    const data = {
      features: {
        ...user.features,
        github: {
          ...user.features?.github,
          username: value,
        },
      },
    }

    await adminStore.updateUser(data)
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
          <span className='label-text-alt'>GitHub username</span>
        </div>
        <input
          type='text'
          className='input input-bordered input-md w-full'
          placeholder='username'
          value={githubUsername}
          onChange={event => setGithubUsername(event.target.value)}
        />
      </label>
    </form>
  )
}
