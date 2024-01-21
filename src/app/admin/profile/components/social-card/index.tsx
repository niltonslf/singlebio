import {Plus} from 'lucide-react'
import {useCallback, useEffect, useState} from 'react'

import {SectionCard} from '@/app/admin/components'
import {useSmartphone} from '@/app/admin/context'
import {authStore} from '@/app/auth/context/auth-store'
import {SocialPage, User} from '@/domain/models'
import {db} from '@/services/firebase'
import {doc, collection, getDocs, orderBy, query} from '@firebase/firestore'

import {AddSocialModalForm, SocialItem} from './components'

type SocialCardProps = {
  user: User
}

export const SocialCard = ({user}: SocialCardProps) => {
  const {reloadSmartphoneList} = useSmartphone()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [socialPages, setSocialPages] = useState<SocialPage[]>([])

  const handleDeleteSocial = async (socialName: string) => {
    const currentSocial = user?.social ? [...user?.social] : []

    const remainingKeys = currentSocial.filter(item => item.name != socialName)

    await authStore.updateUser({social: remainingKeys})
    reloadSmartphoneList()
  }

  const fetchSocialPages = useCallback(async () => {
    const userRef = doc(db, 'users', user.uid)
    const q = query(
      collection(userRef, 'social-pages'),
      orderBy('order', 'asc'),
    )
    const socialReq = await getDocs(q)

    if (socialReq.empty) return

    const data = socialReq.docs.map(social => social.data()) as SocialPage[]
    setSocialPages(data)
  }, [user.uid])

  useEffect(() => {
    fetchSocialPages()
  }, [fetchSocialPages])

  return (
    <SectionCard title='Social pages'>
      <div className='flex flex-col gap-3'>
        {socialPages?.map(item => {
          return (
            <SocialItem
              onDelete={handleDeleteSocial}
              key={item.name}
              social={item}
            />
          )
        })}
      </div>

      <button
        className='btn btn-outline btn-primary btn-block mt-5'
        onClick={() => setIsModalOpen(true)}>
        <Plus size={18} /> Add page
      </button>

      <AddSocialModalForm
        isOpen={isModalOpen}
        user={user}
        onClose={() => setIsModalOpen(false)}
      />
    </SectionCard>
  )
}
