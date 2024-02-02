import {Plus} from 'lucide-react'
import {observer} from 'mobx-react-lite'
import {useState} from 'react'

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

type SocialPagesProps = {
  user: User
}

export const SocialPagesSection = observer(({user}: SocialPagesProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const {socialPages} = adminStore

  const handleCreate = async (data: SocialPageCreation) => {
    const userRef = doc(db, 'users', user.uid)
    const docRef = await addDoc(collection(userRef, 'socialPages'), data)
    await updateDoc(docRef, {id: docRef.id})
    await adminStore.reloadSocialPages()
  }

  const handleDelete = async (socialId: string) => {
    const ref = doc(db, 'users', user.uid, 'socialPages', socialId)
    await deleteDoc(ref)
    await adminStore.reloadSocialPages()
  }

  return (
    <>
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
    </>
  )
})
