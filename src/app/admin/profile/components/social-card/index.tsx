import {Plus} from 'lucide-react'
import {useState} from 'react'

import {revalidateUserPage} from '@/app/admin/actions'
import {SectionCard} from '@/app/admin/components'
import {authStore} from '@/app/auth/context/auth-store'
import {User} from '@/models'

import {AddSocialModalForm, SocialItem} from './components'

type SocialCardProps = {
  user: User
}

export const SocialCard = ({user}: SocialCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleDeleteSocial = async (socialName: string) => {
    const currentSocial = user?.social ? [...user?.social] : []

    const remainingKeys = currentSocial.filter(item => item.name != socialName)

    await authStore.updateUser({social: remainingKeys})
    revalidateUserPage()
  }

  return (
    <SectionCard title='Social links'>
      <div className='flex flex-col gap-3'>
        {user?.social?.map(item => {
          return (
            <SocialItem
              onDelete={handleDeleteSocial}
              key={item.name}
              social={{social: item.name, url: item.url}}
            />
          )
        })}
      </div>

      <button
        className='btn btn-outline btn-primary btn-block mt-5'
        onClick={() => setIsModalOpen(true)}>
        <Plus size={18} /> Add link
      </button>

      <AddSocialModalForm
        isOpen={isModalOpen}
        user={user}
        onClose={() => setIsModalOpen(false)}
      />
    </SectionCard>
  )
}
