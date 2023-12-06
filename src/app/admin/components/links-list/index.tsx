'use client'

import {User} from 'firebase/auth'
import {
  collection,
  getFirestore,
  onSnapshot,
  query,
  deleteDoc,
  doc,
} from 'firebase/firestore'
import {Trash} from 'lucide-react'
import {useCallback, useEffect, useState} from 'react'

import {Link} from '@/app/components'
import {app} from '@/libs/firebase'

type LinksListProps = {
  user: User
}

type Link = {
  id: string
  label: string
  url: string
}

const db = getFirestore(app)

export const LinksList = ({user}: LinksListProps) => {
  const [links, setLinks] = useState<Link[]>([])

  const deleteLink = (link: Link) => {
    deleteDoc(doc(db, 'users', user.uid, 'links', link.id))
  }

  const fetchData = useCallback(() => {
    if (!user.uid) return () => {}

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
    <Link.container>
      {links.length > 0 &&
        links.map(link => (
          <Link.item path={link.url} key={link.url}>
            <div className='flex flex-1 flex-col items-center'>
              {link.label}
              <span className='w-full text-center text-xs text-gray-700'>
                {link.url}
              </span>
            </div>
            <div
              onClick={event => {
                event.stopPropagation()
                event.preventDefault()
                deleteLink(link)
              }}>
              <Trash className='text-red-400 hover:text-red-700' />
            </div>
          </Link.item>
        ))}
    </Link.container>
  )
}
