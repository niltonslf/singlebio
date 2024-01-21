import {useState} from 'react'
import {SocialIcon} from 'react-social-icons'

import {useSmartphone} from '@/app/admin/context'
import {authStore} from '@/app/auth/context/auth-store'
import {InputErrorMsg} from '@/app/components'
import {socialOptions} from '@/constants/social-options'
import {SocialLink, User} from '@/domain/models'
import {merge, validateUrlRegex} from '@/utils'

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

  const [formData, setFormData] = useState<SocialLink>({
    url: '',
    name: '',
    clicks: 0,
  })
  const [isUrlValid, setIsUrlValid] = useState<boolean | undefined>()
  const [filter, setFilter] = useState('')

  const socialOptionsFilter = Object.keys(socialOptions).filter(social =>
    social.includes(filter),
  )

  const checkIfSocialExist = (socialName: string) => {
    return !!user.social?.find(item => item.name == socialName)
  }

  const onSelectIcon = (name: string) => {
    setFormData(prev => ({...prev, name}))
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
    const social = [
      ...currentItems,
      {name: formData.name, url: formData.url, clicks: 0},
    ]

    await authStore.updateUser({social})
    reloadSmartphoneList()
    handleClose()
  }

  const handleClose = () => {
    onClose()
    setTimeout(() => {
      setIsUrlValid(undefined)
      setFormData({name: '', url: '', clicks: 0})
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
            {socialOptions[formData.name]?.label || 'Socials'}
          </h3>
          <div className='divider' />

          <div className='mb-3 flex w-full flex-col gap-5 '>
            {!formData.name && (
              <>
                <input
                  className='input input-bordered input-md w-full'
                  placeholder='Search'
                  onChange={event => setFilter(event.target.value)}
                />

                <ul className='flex max-h-[50dvh] w-full flex-col gap-3 overflow-y-auto'>
                  {socialOptionsFilter.map(name => {
                    return (
                      <li
                        key={name}
                        className='flex w-full flex-row flex-wrap items-center justify-between rounded-lg border border-base-200 px-3 py-3 font-light'>
                        <div className='flex flex-row flex-wrap items-center justify-between gap-3'>
                          <SocialIcon
                            network={name}
                            className='!h-8 !w-8'
                            as='span'
                          />
                          <p>{socialOptions[name].label ?? name}</p>
                        </div>
                        <button
                          className={merge([
                            'btn btn-outline btn-primary btn-sm',
                            checkIfSocialExist(name) && 'btn-neutral',
                          ])}
                          disabled={checkIfSocialExist(name)}
                          onClick={() => onSelectIcon(name)}>
                          {checkIfSocialExist(name) ? 'Added' : 'Add'}
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </>
            )}

            {formData.name && (
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
                  disabled={!(formData.name && formData.url)}
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
