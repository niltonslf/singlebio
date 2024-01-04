import {Plus} from 'lucide-react'
import {useState} from 'react'

import {SectionCard} from '@/app/admin/components'
import {useSmartphone} from '@/app/admin/context'
import {authStore} from '@/app/auth/context/auth-store'
import {User} from '@/models'

import {AddSocialModalForm, SocialItem} from './components'

type SocialCardProps = {
  user: User
}

export const SocialCard = ({user}: SocialCardProps) => {
  const {reloadSmartphoneList} = useSmartphone()

  const [isModalOpen, setIsModalOpen] = useState(false)

  const socialListKeys = user.social ? Object.keys(user.social) : []

  const handleDeleteSocial = async (socialName: string) => {
    const currentSocial = {...user.social}
    const newObj: Record<string, string> = {}

    const remainingKeys = Object.keys(currentSocial).filter(
      social => social != socialName,
    )

    remainingKeys.forEach(key => {
      newObj[key] = currentSocial[key]
    })

    await authStore.updateUser({social: newObj})
    reloadSmartphoneList()
  }

  return (
    <SectionCard title='Social links'>
      <div className='flex flex-col gap-3'>
        {socialListKeys.map(name => {
          return (
            user?.social?.[name] && (
              <SocialItem
                onDelete={handleDeleteSocial}
                key={name}
                social={{social: name, url: user?.social?.[name]}}
              />
            )
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
