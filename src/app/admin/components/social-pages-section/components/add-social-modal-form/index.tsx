import {useState} from 'react'
import {SocialIcon} from 'react-social-icons'

import {socialOptions} from '@/constants/social-options'
import {SocialPage, SocialPageCreation} from '@/domain/models'
import {merge} from '@/utils'

type AddSocialModalFormProps = {
  socialPages: SocialPage[]
  onSubmit: (data: SocialPageCreation) => Promise<void>
  isOpen: boolean
  onClose: () => void
}

export const AddSocialModalForm = ({
  socialPages,
  onSubmit,
  isOpen,
  onClose,
}: AddSocialModalFormProps) => {
  const [formData, setFormData] = useState<SocialPageCreation>({
    url: '',
    name: '',
    order: 0,
  })
  const [filter, setFilter] = useState('')

  const socialOptionsFilter = Object.keys(socialOptions).filter(social =>
    social.includes(filter),
  )

  const checkIfSocialExist = (socialName: string) => {
    return !!socialPages.find(item => item.name == socialName)
  }

  const onSelectIcon = (name: string) => {
    setFormData(prev => ({...prev, name, url: socialOptions[name].baseUrl}))
  }

  const onChangeUrl = (url: string) => {
    setFormData(prev => ({...prev, url}))
  }

  const handleSubmit = async () => {
    await onSubmit(formData)

    handleClose()
  }

  const resetForm = () => {
    setFormData({name: '', url: '', order: 0})
  }

  const handleClose = () => {
    onClose()
    setTimeout(() => {
      resetForm()
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
            {socialOptions[formData.name]?.label || 'Social pages'}
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
                    value={formData.url}
                    onChange={event => onChangeUrl(event.target.value)}
                  />
                </div>

                <div className='flex gap-5'>
                  <button
                    type='button'
                    className='btn btn-primary btn-md flex-1'
                    disabled={!(formData.name && formData.url)}
                    onClick={() => handleSubmit()}>
                    Save
                  </button>
                  <button
                    type='button'
                    className='btn btn-md flex-1'
                    onClick={() => resetForm()}>
                    Go back
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </dialog>
    </>
  )
}
