import {Search} from 'lucide-react'
import {useState} from 'react'
import {SocialIcon} from 'react-social-icons'

import {authStore} from '@/app/auth/context/auth-store'
import {InputErrorMsg} from '@/app/components'
import {socialOptions} from '@/data/social-options'
import {User} from '@/models'
import {merge, validateUrlRegex} from '@/utils'

type SocialLink = {
  url: string
  social: string
}

type AddSocialModalFormProps = {
  user: User
  isOpen: boolean
  onClose: () => void
}

export const AddSocialModalForm = ({
  user,
  isOpen,
  onClose,
}: AddSocialModalFormProps) => {
  const [formData, setFormData] = useState<SocialLink>({url: '', social: ''})
  const [isUrlValid, setIsUrlValid] = useState<boolean | undefined>()
  const [filter, setFilter] = useState('')

  const socialOptionsFilter = Object.keys(socialOptions).filter(social =>
    social.includes(filter),
  )

  const checkIfSocialExist = (socialName: string) => {
    return !!user.social?.[socialName]
  }

  const onSelectIcon = (social: string) => {
    setFormData(prev => ({...prev, social}))
  }

  const onChangeUrl = (url: string) => {
    const isValid = validateUrlRegex.test(url)

    if (!isValid) {
      return setIsUrlValid(false)
    }

    setIsUrlValid(true)

    setFormData(prev => ({...prev, url}))
  }

  const handleSubmit = async () => {
    const social = {
      ...user.social,
      [formData.social]: formData.url,
    }

    authStore.updateUser({social})
    handleClose()
  }

  const handleClose = () => {
    onClose()
    setTimeout(() => {
      setIsUrlValid(undefined)
      setFormData({social: '', url: ''})
    }, 200)
  }

  return (
    <>
      <label className='modal-overlay'></label>
      <div
        className={merge([
          'modal flex w-[500px] max-w-[calc(100%-40px)] flex-col bg-background-300',
          isOpen && 'show',
        ])}>
        <div className='flex w-full flex-row items-center justify-between'>
          <h2 className='text-xl'>
            {socialOptions[formData.social]?.label || 'Socials'}
          </h2>
          <button type='button' onClick={() => handleClose()}>
            ✕
          </button>
        </div>
        <div className='background divider' />

        <div className='mb-3 flex w-full flex-col gap-5 '>
          {!formData.social && (
            <>
              <div className='bw solid input !border-background-600'>
                <Search size={18} />
                <input
                  placeholder='Search'
                  onChange={event => setFilter(event.target.value)}
                />
              </div>

              <ul className='flex max-h-[50dvh] w-full flex-col gap-3 overflow-y-auto'>
                {socialOptionsFilter.map(social => {
                  return (
                    <li
                      key={social}
                      className='flex w-full flex-row flex-wrap items-center justify-between rounded-lg border border-background-900 px-3 py-2 font-light'>
                      <div className='flex flex-row flex-wrap items-center justify-between gap-3'>
                        <SocialIcon
                          network={social}
                          className='!h-8 !w-8'
                          as='span'
                        />
                        <p>{socialOptions[social].label ?? social}</p>
                      </div>
                      <button
                        className={merge([
                          'text-primary-900',
                          checkIfSocialExist(social) && 'text-slate-400',
                        ])}
                        disabled={checkIfSocialExist(social)}
                        onClick={() => onSelectIcon(social)}>
                        {checkIfSocialExist(social) ? 'Added' : 'Add'}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </>
          )}

          {formData.social && (
            <>
              <div className='w-full'>
                <input
                  type='text'
                  className='bw solid input !border-background-600'
                  placeholder='Profile url'
                  onChange={event => onChangeUrl(event.target.value)}
                />
                <p className='ml-1 mt-1 w-full text-xs text-background-900'>
                  Insert the full link address. Example:{' '}
                  <span className='text-background-1000'>
                    https://instagram.com/username
                  </span>
                </p>
                {isUrlValid === false && (
                  <InputErrorMsg>The link format is not valid</InputErrorMsg>
                )}
              </div>

              <button
                type='button'
                className='primary btn solid mt-3 w-full'
                disabled={!(formData.social && formData.url)}
                onClick={() => handleSubmit()}>
                Save
              </button>
            </>
          )}
        </div>
      </div>
    </>
  )
}
