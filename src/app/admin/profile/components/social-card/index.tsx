import {Plus} from 'lucide-react'
import {useState} from 'react'

import {User} from '@/models'

import {AddSocialModalForm, SocialItem} from './components'

type SocialCardProps = {
  user: User
}

export const SocialCard = ({user}: SocialCardProps) => {
  const [isOpenModal, setIsOpenModal] = useState(false)

  const socialListKeys = user.social ? Object.keys(user.social) : []

  return (
    <div className='mt-5 flex w-full flex-col gap-2 overflow-hidden rounded-lg bg-background-300 p-6 shadow-lg'>
      <div className='mb-5 flex items-baseline'>
        <h3 className='text-xl font-semibold'>Social links</h3>
      </div>

      {socialListKeys.map(social => {
        return (
          <>
            {user?.social?.[social] && (
              <SocialItem
                key={social}
                social={{social, url: user?.social?.[social]}}
              />
            )}
          </>
        )
      })}

      <AddSocialModalForm
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
      />

      <button
        className='mt-5 flex w-full flex-row items-center justify-center gap-2 rounded-lg p-3 text-primary-900 hover:bg-background-100'
        onClick={() => setIsOpenModal(true)}>
        <Plus size={18} /> Add social
      </button>
    </div>
  )
}
