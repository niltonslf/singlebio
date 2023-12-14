'use client'

import {
  collection,
  onSnapshot,
  query,
  deleteDoc,
  doc,
  addDoc,
  setDoc,
} from 'firebase/firestore'
import {Trash} from 'lucide-react'
import {useCallback, useEffect, useState} from 'react'

import {db} from '@/libs/firebase'
import {Link, User} from '@/models'

import {AddLinkForm} from '..'

import {useAdmin} from '../../context/admin-context'

type LinksListProps = {
  user: User
}

export const LinksList = ({user}: LinksListProps) => {
  const {reloadSmartphoneList} = useAdmin()

  const [links, setLinks] = useState<Link[]>([])

  const handleAddNewLink = async (data: any) => {
    const res = await doc(db, 'users', user.uid)
    addDoc(collection(res, 'links'), {})
  }

  const handleSaveLink = async (data: Link) => {
    if (data.id) setDoc(doc(db, 'users', user.uid, 'links', data.id), data)
    reloadSmartphoneList()
  }

  const deleteLink = (link: Link) => {
    if (link.id) deleteDoc(doc(db, 'users', user.uid, 'links', link.id))
    reloadSmartphoneList()
  }

  const fetchData = useCallback(() => {
    const customQuery = query(collection(db, 'users', user.uid, 'links'))
    const unsubscribe = onSnapshot(customQuery, querySnapshot => {
      setLinks([])

      querySnapshot.forEach(doc =>
        setLinks(prev => [{id: doc.id, ...doc.data()} as Link, ...prev]),
      )
    })

    return unsubscribe
  }, [user.uid])

  useEffect(() => {
    const unsubscribe = fetchData()
    return () => unsubscribe()
  }, [fetchData])

  return (
    <section className='flex w-full flex-col gap-5 px-0 py-3'>
      <div className='flex flex-1 flex-col gap-5'>
        <button
          onClick={handleAddNewLink}
          type='button'
          className='rounded-md bg-blue-600 py-2 text-white'>
          Add link
        </button>

        <ul className='flex flex-1 flex-col gap-5'>
          {links.length > 0 &&
            links.map(link => (
              <li
                key={link.id}
                className='flex w-full flex-wrap items-center justify-center gap-4 rounded-lg bg-gray-700 p-3 font-medium md:p-5'>
                <div className='flex flex-1 flex-col items-center gap-2'>
                  <AddLinkForm saveLink={handleSaveLink} link={link} />
                </div>
                <div
                  onClick={() => deleteLink(link)}
                  className='cursor-pointer'>
                  <Trash className='text-red-400 hover:text-red-700' />
                </div>
              </li>
            ))}
        </ul>
      </div>
    </section>
  )
}
