'use client'

import {collection, onSnapshot, query, deleteDoc, doc} from 'firebase/firestore'
import {Trash} from 'lucide-react'
import {useCallback, useEffect, useState} from 'react'

import {LinkCard} from '@/app/components'
import {db} from '@/libs/firebase'
import {Link, User} from '@/models'

import {AddLinkForm} from '..'

type LinksListProps = {
  user: User
  saveLink: (args: any) => Promise<typeof args>
}

export const LinksList = ({user, saveLink}: LinksListProps) => {
  const [links, setLinks] = useState<Link[]>([])

  // ? consider move saveLink function to here

  const deleteLink = (link: Link) => {
    if (link.id) deleteDoc(doc(db, 'users', user.uid, 'links', link.id))
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
    <LinkCard.container>
      <div className='flex flex-1 flex-col gap-5'>
        <button
          type='button'
          className='rounded-md bg-green-600 py-2 text-white'>
          Add link
        </button>

        {links.length > 0 &&
          links.map(link => (
            <div
              className='flex w-full flex-wrap items-center justify-center rounded-lg bg-white p-3 font-medium md:p-3'
              key={link.url}>
              <div className='flex flex-1 flex-col items-center gap-2'>
                <AddLinkForm saveLink={saveLink} link={link} />
              </div>
              <div
                onClick={event => {
                  event.stopPropagation()
                  event.preventDefault()
                  deleteLink(link)
                }}>
                <Trash className='text-red-400 hover:text-red-700' />
              </div>
            </div>
          ))}
      </div>
    </LinkCard.container>
  )
}
