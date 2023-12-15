'use client'

import {
  collection,
  getFirestore,
  getDocs,
  query,
  where,
  limit,
  orderBy,
} from 'firebase/firestore'
import {useCallback, useEffect, useState} from 'react'

import {Avatar, LinkCard} from '@/app/components'
import {app} from '@/libs/firebase'
import {User} from '@/models'

type UserPageProps = {
  params: {
    userName: string
  }
}

const db = getFirestore(app)

export default function UserPage({params: {userName}}: UserPageProps) {
  const [links, setLinks] = useState<any[]>([])
  const [user, setUser] = useState<User>()
  const [isLoading, setIsLoading] = useState(true)

  const fetchData = useCallback(async () => {
    const q = query(
      collection(db, 'users'),
      where('userName', '==', userName),
      limit(1),
    )
    const {docs: users} = await getDocs(q)

    new Promise(resolve => {
      users.forEach(async curUser => {
        setUser(curUser.data() as User)

        const customQuery = query(
          collection(db, curUser.ref.path, 'links'),
          orderBy('order', 'desc'),
        )

        const {size, docs} = await getDocs(customQuery)

        setLinks([])

        if (size === 0) {
          setIsLoading(false)
          return resolve(true)
        }

        const validLinks = docs.filter(link => !!link.data().url)
        validLinks.forEach(link => setLinks(prev => [...prev, link.data()]))

        resolve(true)
      })
    }).finally(() => {
      setIsLoading(false)
    })
  }, [userName])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <main className='flex h-screen items-center justify-center overflow-y-auto bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100 p-5  py-20  md:p-10'>
      <div className=' h-full w-full max-w-2xl '>
        <div className='mb-4 flex w-full justify-center'>
          <Avatar
            name={user?.name || ''}
            pictureUrl={user?.pictureUrl}
            size={80}
          />
        </div>

        <h2 className='mb-3 flex items-center justify-center text-2xl font-semibold'>
          @{userName}
        </h2>

        {isLoading && (
          <div className='flex items-center justify-center text-lg'>
            Loading user links...
          </div>
        )}

        {links.length === 0 && isLoading === false && (
          <div className='rounded-md bg-red-300 p-2 shadow-md'>
            No links in this profile
          </div>
        )}

        <LinkCard.container>
          {links.length > 0 &&
            links.map(link => {
              return (
                <LinkCard.item key={link.url} path={link.url}>
                  {link.label}
                </LinkCard.item>
              )
            })}
        </LinkCard.container>
      </div>
    </main>
  )
}
