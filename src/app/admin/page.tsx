'use client'

import {User, onAuthStateChanged} from 'firebase/auth'
import {addDoc, collection, doc, getDoc, updateDoc} from 'firebase/firestore'
import {useCallback, useEffect, useState} from 'react'

import {Modal} from '@/app/components'
import {auth, db} from '@/libs/firebase'

import {AddLinkForm, Header, LinksList} from './components'

export default function Admin() {
  const [user, setUser] = useState<User | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(true)

  const onSaveUserName = async (data: string) => {
    if (!user) return

    await updateDoc(doc(db, 'users', user.uid), {
      userName: data,
    })
  }

  const onSaveLink = async (data: any) => {
    if (!user) return

    const res = await doc(db, 'users', user.uid)
    addDoc(collection(res, 'links'), data)
  }

  const fetchUserData = useCallback(async () => {
    if (!user) return
    const res = await getDoc(doc(db, 'users', user.uid))

    const userData = res.data()

    console.log({userData})
  }, [user])

  useEffect(() => {
    fetchUserData()
  }, [fetchUserData])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser)
    return () => unsubscribe()
  }, [])

  return (
    <div className='flex h-screen flex-col items-center overflow-auto bg-gray-300 '>
      <Modal onSave={onSaveUserName} initialOpen={isModalOpen} />
      {!user ? (
        <div>Loading...</div>
      ) : (
        <>
          <Header user={user} />

          <main className=' grid w-full grid-cols-1 grid-rows-1 md:h-screen md:grid-cols-[3fr_2fr] md:overflow-hidden'>
            <section className='flex flex-col justify-start p-10'>
              <section className='mt-5'>
                <AddLinkForm saveLink={onSaveLink} />
              </section>
            </section>

            <aside className='grid w-full grid-rows-1 '>
              <LinksList user={user} />
            </aside>
          </main>
        </>
      )}
    </div>
  )
}
