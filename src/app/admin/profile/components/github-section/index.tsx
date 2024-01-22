import {useState} from 'react'

import {SectionCard} from '@/app/admin/components'
import {useSmartphone} from '@/app/admin/context'
import {authStore} from '@/app/auth/context/auth-store'
import {User} from '@/domain/models'
import {useDebounce} from '@/utils'

type GithubSectionProps = {
  user: User
}

export const GithubSection = ({user}: GithubSectionProps) => {
  const {reloadSmartphoneList} = useSmartphone()

  const [githubUsername, setGithubUsername] = useState(
    user.features?.github.username ?? '',
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

    await authStore.updateUser(data)
    setIsSubmitting(false)
    reloadSmartphoneList()
  }

  const handleSubmitDebounced = useDebounce(value => handleSubmit(value), 1000)

  return (
    <SectionCard title='Github contribution chart'>
      {isSubmitting && (
        <div className='absolute right-3 top-3'>
          <div className='loading loading-spinner loading-xs text-neutral-50'></div>
        </div>
      )}

      <form
        onChange={(event: any) => handleSubmitDebounced(event.target?.value)}>
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
    </SectionCard>
  )
}
