import {Search} from 'lucide-react'
import {useState} from 'react'

import {socialOptions} from '@/data/social-options'
import {merge} from '@/utils'

type SocialLink = {
  url: string
  social: string
}

type AddSocialModalFormProps = {
  isOpen: boolean
  onClose: () => void
}

export const AddSocialModalForm = ({
  isOpen,
  onClose,
}: AddSocialModalFormProps) => {
  const [formData, setFormData] = useState<SocialLink>({url: '', social: ''})
  const [filter, setFilter] = useState('')

  const socialOptionsFilter = Object.keys(socialOptions).filter(social =>
    social.includes(filter),
  )

  const onSelectIcon = (social: string) => {
    setFormData(prev => ({...prev, social}))
  }

  const onChangeUrl = (url: string) => {
    setFormData(prev => ({...prev, url}))
  }

  const handleSubmit = () => {
    onClose()
    setFormData({social: '', url: ''})
  }

  const handleClose = () => {
    onClose()
    setFormData({social: '', url: ''})
  }

  return (
    <div>
      <label className='modal-overlay'></label>
      <div
        className={merge([
          'modal flex w-[500px] max-w-full flex-col bg-background-300',
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
                        {socialOptions[social].icon}
                        <p>{socialOptions[social].label ?? social}</p>
                      </div>
                      <button
                        className='text-primary-900'
                        onClick={() => onSelectIcon(social)}>
                        Add
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
                  name='username'
                  className='bw solid input !border-background-600'
                  placeholder='Url'
                  onChange={event => onChangeUrl(event.target.value)}
                />
                <p className='mt-1 w-full text-xs text-background-900'>
                  Example: https://www.instagram.com/username
                </p>
              </div>
              <button
                type='button'
                className='primary btn solid mt-3 w-full'
                onClick={() => handleSubmit()}>
                Save
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
