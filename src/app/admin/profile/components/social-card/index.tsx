import {Plus} from 'lucide-react'
import {useState} from 'react'

import {SectionCard} from '@/app/admin/components'
import {User} from '@/models'

import {AddSocialModalForm, SocialItem} from './components'

type SocialCardProps = {
  user: User
}

export const SocialCard = ({user}: SocialCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const socialListKeys = user.social ? Object.keys(user.social) : []

  return (
    <SectionCard title='Social links'>
      <div className='flex flex-col gap-3'>
        {socialListKeys.map(name => {
          return (
            user?.social?.[name] && (
              <SocialItem
                key={name}
                social={{social: name, url: user?.social?.[name]}}
              />
            )
          )
        })}
      </div>

      <AddSocialModalForm
        isOpen={isModalOpen}
        user={user}
        onClose={() => setIsModalOpen(false)}
      />

      <button
        className='mt-5 flex w-full flex-row items-center justify-center gap-2 rounded-lg p-3 text-primary-900 hover:bg-background-100'
        onClick={() => setIsModalOpen(true)}>
        <Plus size={18} /> Add link
      </button>
    </SectionCard>
  )
}
