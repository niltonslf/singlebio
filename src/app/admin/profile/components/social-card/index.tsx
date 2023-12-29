import {Plus} from 'lucide-react'
import {useState} from 'react'

import {SectionCard} from '@/app/admin/components'
import {User} from '@/models'

import {AddSocialModalForm, SocialItem} from './components'

type SocialCardProps = {
  user: User
}

export const SocialCard = ({user}: SocialCardProps) => {
  const [isOpenModal, setIsOpenModal] = useState(false)

  const socialListKeys = user.social ? Object.keys(user.social) : []

  return (
    <SectionCard title='Social links'>
      <div className='flex flex-col gap-3'>
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
      </div>

      <AddSocialModalForm
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
      />

      <button
        className='mt-5 flex w-full flex-row items-center justify-center gap-2 rounded-lg p-3 text-primary-900 hover:bg-background-100'
        onClick={() => setIsOpenModal(true)}>
        <Plus size={18} /> Add social
      </button>
    </SectionCard>
  )
}
