'use client'

import {onAuthStateChanged} from 'firebase/auth'
import {addDoc, collection, doc, updateDoc} from 'firebase/firestore'
import {observer} from 'mobx-react-lite'
import {useEffect, useState} from 'react'

import {Modal} from '@/app/components'
import {auth, db} from '@/libs/firebase'

import {authStore} from '../auth/context/auth-store'
import {AddLinkForm, Header, LinksList} from './components'

const Admin = observer(() => {
  const [isLoading, setIsLoading] = useState(true)

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
    authStore.updateUser({...authStore.user, userName: data})
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, firebaseUser => {
      authStore.authUser(firebaseUser)
      setIsLoading(false)
    })
    return () => unsubscribe()
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

          <main className=' grid w-full grid-cols-1 grid-rows-1 md:h-screen md:grid-cols-[3fr_2fr] md:overflow-hidden'>
            <section className='flex flex-col justify-start p-10'>
              <section className='mt-5'>
                <AddLinkForm saveLink={onSaveLink} />
              </section>
            </section>

            <aside className='grid w-full grid-rows-1 '>
              <LinksList user={authStore.user} />
            </aside>
          </main>
        </>
      )}
    </div>
  )
})

export default Admin
