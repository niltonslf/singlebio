import {Plus} from 'lucide-react'
import {observer} from 'mobx-react-lite'
import {useState} from 'react'

import {SectionCard} from '@/app/admin/components'
import {adminStore} from '@/app/admin/context/admin-store'
import {SocialPageCreation, User} from '@/domain/models'
import {db} from '@/services/firebase'
import {
  doc,
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
} from '@firebase/firestore'

import {AddSocialModalForm, SocialItem} from './components'

type SocialCardProps = {
  user: User
}

export const SocialCard = observer(({user}: SocialCardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const {socialPages} = adminStore

  const handleCreate = async (data: SocialPageCreation) => {
    const userRef = doc(db, 'users', user.uid)
    const docRef = await addDoc(collection(userRef, 'social-pages'), data)
    await updateDoc(docRef, {id: docRef.id})
    // await adminStore.fetchSocialPages()
  }

  const handleDelete = async (socialId: string) => {
    if (!adminStore.user) return

    const ref = doc(db, 'users', adminStore.user?.uid, 'social-pages', socialId)
    await deleteDoc(ref)
    // await adminStore.fetchSocialPages()
  }

  // const fetchSocialPages = useCallback(async () => {

  //   setSocialPages(data)
  //   adminStore.setSocialPages(data)
  // }, [user.uid])

  // useEffect(() => {
  //   fetchSocialPages()
  // }, [fetchSocialPages])

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
})
