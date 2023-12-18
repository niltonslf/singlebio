'use client'

import {doc, updateDoc} from 'firebase/firestore'
import {observer} from 'mobx-react-lite'
import {useRouter} from 'next/navigation'
import {useEffect, useRef} from 'react'

import {Modal, Smartphone} from '@/app/components'
import {db} from '@/libs/firebase'

import {authStore} from '../auth/context/auth-store'
import {LinksList} from './components/links-list'
import {useAdmin} from './context/admin-context'

const Admin = observer(() => {
  const router = useRouter()
  const iframe = useRef<HTMLIFrameElement>(null)
  const {setSmartphoneRef, reloadSmartphoneList} = useAdmin()

  const onSaveUserName = async (data: string) => {
    if (!authStore.user) return

    await updateDoc(doc(db, 'users', authStore.user.uid), {
      username: data,
    })
    authStore.updateUser({...authStore.user, username: data})
    reloadSmartphoneList()
  }

  useEffect(() => {
    setSmartphoneRef(iframe)
  }, [iframe, setSmartphoneRef])

  return (
    <>
      {!authStore.user ? (
        <div className='text-white'>Loading...</div>
      ) : (
        <main className='grid min-h-[calc(100%-80px)] w-full grid-cols-1 gap-3 md:grid-cols-[3fr_1.5fr] md:grid-rows-[1fr]'>
          <section className='flex h-auto  flex-col rounded-lg bg-gray-800 px-4 md:p-10'>
            <LinksList user={authStore.user} />
          </section>

          <aside className='grid w-full grid-rows-1 rounded-lg bg-gray-800'>
            <div className=' flex flex-1 items-start justify-center px-6 pt-4'>
              <div className='sticky top-6'>
                <Smartphone
                  ref={iframe}
                  iframeUrl={`${authStore.user.username}`}
                />
              </div>
            </div>
          </aside>

          <Modal
            onSave={onSaveUserName}
            initialOpen={!authStore.user?.username}
          />
        </main>
      )}
    </>
  )
})

export default Admin
