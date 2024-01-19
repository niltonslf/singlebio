import {useState} from 'react'
import {SocialIcon} from 'react-social-icons'

import {useSmartphone} from '@/app/admin/context'
import {authStore} from '@/app/auth/context/auth-store'
import {InputErrorMsg} from '@/app/components'
import {socialOptions} from '@/constants/social-options'
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
  const {reloadSmartphoneList} = useSmartphone()

  const [formData, setFormData] = useState<SocialLink>({url: '', social: ''})
  const [isUrlValid, setIsUrlValid] = useState<boolean | undefined>()
  const [filter, setFilter] = useState('')

  const socialOptionsFilter = Object.keys(socialOptions).filter(social =>
    social.includes(filter),
  )

  const checkIfSocialExist = (socialName: string) => {
    return !!user.social?.find(item => item.name == socialName)
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
    const currentItems = user.social ?? []
    const social = [...currentItems, {name: formData.social, url: formData.url}]

    await authStore.updateUser({social})
    reloadSmartphoneList()
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
      <dialog className={merge(['modal', isOpen && 'modal-open'])}>
        <div className='modal-box bg-base-100'>
          <form method='dialog'>
            <button
              onClick={() => handleClose()}
              className='btn btn-circle btn-ghost btn-sm absolute right-2 top-2'>
              ✕
            </button>
          </form>

          <h3 className='text-lg font-bold'>
            {socialOptions[formData.social]?.label || 'Socials'}
          </h3>
          <div className='divider' />

          <div className='mb-3 flex w-full flex-col gap-5 '>
            {!formData.social && (
              <>
                <input
                  className='input input-bordered input-md w-full'
                  placeholder='Search'
                  onChange={event => setFilter(event.target.value)}
                />

                <ul className='flex max-h-[50dvh] w-full flex-col gap-3 overflow-y-auto'>
                  {socialOptionsFilter.map(social => {
                    return (
                      <li
                        key={social}
                        className='flex w-full flex-row flex-wrap items-center justify-between rounded-lg border border-base-200 px-3 py-3 font-light'>
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
                            'btn btn-outline btn-primary btn-sm',
                            checkIfSocialExist(social) && 'btn-neutral',
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
                    className='input input-bordered input-md w-full'
                    placeholder='Profile url'
                    onChange={event => onChangeUrl(event.target.value)}
                  />
                  <p className='ml-1 mt-2 w-full text-xs text-neutral-400'>
                    Insert the full link address. Example:{' '}
                    <span className='text-base-1000'>
                      https://instagram.com/username
                    </span>
                  </p>
                  {isUrlValid === false && (
                    <InputErrorMsg>The link format is not valid</InputErrorMsg>
                  )}
                </div>

                <button
                  type='button'
                  className='btn btn-primary btn-md w-full'
                  disabled={!(formData.social && formData.url)}
                  onClick={() => handleSubmit()}>
                  Save
                </button>
              </>
            )}
          </div>
        </div>
      </dialog>
    </>
  )
}
