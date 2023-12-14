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
import {useAdmin} from './context/admin-context'

const Admin = observer(() => {
  const router = useRouter()
  const iframe = useRef<HTMLIFrameElement>(null)
  const {setSmartphoneRef, reloadSmartphoneList} = useAdmin()

  const [isLoading, setIsLoading] = useState(false)

  const onSaveUserName = async (data: string) => {
    if (!authStore.user) return

    await updateDoc(doc(db, 'users', authStore.user.uid), {
      userName: data,
    })
    authStore.updateUser({...authStore.user, userName: data})
    reloadSmartphoneList()
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

  useEffect(() => {
    setSmartphoneRef(iframe)
  }, [iframe, setSmartphoneRef])

  return (
    <div className='flex h-screen w-screen flex-col items-center overflow-auto bg-gray-900 p-3'>
      {isLoading || !authStore.user ? (
        <div>Loading...</div>
      ) : (
        <>
          <Modal
            onSave={onSaveUserName}
            initialOpen={!authStore.user?.userName}
          />

          <div className=' mb-3 w-full '>
            <Header user={authStore.user} />
          </div>

          <main className='grid min-h-[calc(100%-80px)] w-full grid-cols-1 gap-3 md:grid-cols-[3fr_1.5fr] md:grid-rows-[1fr]'>
            <section className='flex h-auto  flex-col rounded-lg  bg-gray-800 p-10'>
              <LinksList user={authStore.user} />
            </section>

            <aside className='grid w-full grid-rows-1 rounded-lg bg-gray-800'>
              <div className=' flex flex-1 items-start justify-center px-6 pt-4'>
                <div className='sticky top-6'>
                  <Smartphone
                    ref={iframe}
                    iframeUrl={`${authStore.user.userName}`}
                  />
                </div>
              </div>
            </aside>
          </main>
        </>
      )}
    </div>
  )
})

export default Admin
