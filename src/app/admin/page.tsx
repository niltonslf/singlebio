'use client'

import {onAuthStateChanged} from 'firebase/auth'
import {doc, updateDoc} from 'firebase/firestore'
import {observer} from 'mobx-react-lite'
import {useRouter} from 'next/navigation'
import {useEffect, useRef, useState} from 'react'

import {Modal, Smartphone} from '@/app/components'
import {auth, db} from '@/libs/firebase'

import {authStore} from '../auth/context/auth-store'
import {Header} from './components'
import {LinksList} from './components/links-list'

const Admin = observer(() => {
  const router = useRouter()
  const iframe = useRef<HTMLIFrameElement>(null)

  const [isLoading, setIsLoading] = useState(false)

  const onSaveUserName = async (data: string) => {
    if (!authStore.user) return

    await updateDoc(doc(db, 'users', authStore.user.uid), {
      userName: data,
    })
    authStore.updateUser({...authStore.user, userName: data})
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
    <div className='flex h-screen flex-col items-center overflow-auto bg-gray-900 '>
      {isLoading || !authStore.user ? (
        <div>Loading...</div>
      ) : (
        <>
          <Modal
            onSave={onSaveUserName}
            initialOpen={!authStore.user?.userName}
          />

          <div className='mt-3 w-full  px-3'>
            <Header user={authStore.user} />
          </div>

          <main className='grid w-full grid-cols-1 grid-rows-1 gap-3 p-3 md:h-screen md:grid-cols-[3fr_1.5fr] md:overflow-hidden'>
            <section className='flex flex-col justify-start rounded-lg bg-gray-800 p-10'>
              <section className='mt-5'>
                <LinksList user={authStore.user} />
              </section>
            </section>

            <aside className='grid w-full grid-rows-1 rounded-lg bg-gray-800'>
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
