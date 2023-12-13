'use client'

import {onAuthStateChanged} from 'firebase/auth'
import {addDoc, collection, doc, updateDoc} from 'firebase/firestore'
import {observer} from 'mobx-react-lite'
import {useRouter} from 'next/navigation'
import {useEffect, useRef, useState} from 'react'

import {Modal, Smartphone} from '@/app/components'
import {auth, db} from '@/libs/firebase'

import {authStore} from '../auth/context/auth-store'
import {AddLinkForm, Header} from './components'

const Admin = observer(() => {
  const router = useRouter()
  const iframe = useRef<HTMLIFrameElement>(null)

  const [isLoading, setIsLoading] = useState(false)

  const onSaveUserName = async (data: string) => {
    if (!authStore.user) return

    await updateDoc(doc(db, 'users', authStore.user.uid), {
      userName: data,
    })
  }

  const onSaveLink = async (data: any) => {
    if (!authStore.user) return

    const res = await doc(db, 'users', authStore.user.uid)
    addDoc(collection(res, 'links'), data)
    iframe.current?.contentWindow?.location.reload()
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async firebaseUser => {
      if (!firebaseUser) {
        authStore.clearUser()
        router.push('/auth')
      } else {
        await authStore.authUser(firebaseUser)
      }
      setIsLoading(false)
    })

    return () => unsubscribe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className='flex h-screen flex-col items-center overflow-auto bg-gray-300 '>
      {isLoading || !authStore.user ? (
        <div>Loading...</div>
      ) : (
        <>
          <Modal
            onSave={onSaveUserName}
            initialOpen={!authStore.user?.userName}
          />

          <Header user={authStore.user} />

          <main className=' grid w-full grid-cols-1 grid-rows-1 md:h-screen md:grid-cols-[3fr_1.5fr] md:overflow-hidden'>
            <section className='flex flex-col justify-start p-10'>
              <section className='mt-5'>
                <AddLinkForm saveLink={onSaveLink} />
              </section>
            </section>

            <aside className='grid w-full grid-rows-1 '>
              <div className='flex flex-1 items-center justify-center px-6 py-7'>
                <Smartphone
                  ref={iframe}
                  iframeUrl={`${authStore.user.userName}`}
                />
              </div>
            </aside>
          </main>
        </>
      )}
    </div>
  )
})

export default Admin
