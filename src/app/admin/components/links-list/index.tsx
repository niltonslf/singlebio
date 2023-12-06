'use client'

import {collection, onSnapshot, query, deleteDoc, doc} from 'firebase/firestore'
import {Trash} from 'lucide-react'
import {useCallback, useEffect, useState} from 'react'

import {Link} from '@/app/components'
import {db} from '@/libs/firebase'
import {User} from '@/models'

type LinksListProps = {
  user: User
}

type Link = {
  id: string
  label: string
  url: string
}

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
