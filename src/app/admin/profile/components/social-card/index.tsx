import {Plus} from 'lucide-react'
import {useCallback, useEffect, useState} from 'react'

import {SectionCard} from '@/app/admin/components'
import {useSmartphone} from '@/app/admin/context'
import {authStore} from '@/app/auth/context/auth-store'
import {SocialPage, SocialPageCreation, User} from '@/domain/models'
import {db} from '@/services/firebase'
import {
  doc,
  collection,
  getDocs,
  orderBy,
  query,
  addDoc,
  updateDoc,
  deleteDoc,
} from '@firebase/firestore'

import {AddSocialModalForm, SocialItem} from './components'

type SocialCardProps = {
  user: User
}

export const SocialCard = ({user}: SocialCardProps) => {
  const {reloadSmartphoneList} = useSmartphone()

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [socialPages, setSocialPages] = useState<SocialPage[]>([])

  const handleCreate = async (data: SocialPageCreation) => {
    const userRef = doc(db, 'users', user.uid)
    const docRef = await addDoc(collection(userRef, 'social-pages'), data)
    await updateDoc(docRef, {id: docRef.id})
    await fetchSocialPages()
  }

  const handleDelete = async (socialId: string) => {
    if (!authStore.user) return

    const ref = doc(db, 'users', authStore.user?.uid, 'social-pages', socialId)
    await deleteDoc(ref)
    await fetchSocialPages()
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
    authStore.setSocialPages(data)
  }, [user.uid])

  useEffect(() => {
    fetchSocialPages()
  }, [fetchSocialPages])

  return (
    <SectionCard title='Social pages'>
      <div className='flex flex-col gap-3'>
        {socialPages?.map(item => {
          return (
            <SocialItem onDelete={handleDelete} key={item.id} social={item} />
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
        socialPages={socialPages}
        onSubmit={handleCreate}
        onClose={() => setIsModalOpen(false)}
      />
    </SectionCard>
  )
}
