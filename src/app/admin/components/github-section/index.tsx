import {observer} from 'mobx-react-lite'
import {useState} from 'react'

import {adminStore} from '@/app/admin/context/admin-store'
import {User} from '@/domain/models'
import {useDebounce} from '@/utils'

type GithubSectionProps = {
  user?: User
}

export const GithubSection = observer(({}: GithubSectionProps) => {
  const {features} = adminStore

  const github = features.find(feature => feature.id === 'github')

  const [githubUsername, setGithubUsername] = useState(github?.value)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (value: string) => {
    if (!github) return

    setIsSubmitting(true)
    await adminStore.insertFeature({...github, value: value})
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
})
