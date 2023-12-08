'use client'

import {
  collection,
  getFirestore,
  getDocs,
  query,
  where,
} from 'firebase/firestore'
import {useCallback, useEffect, useState} from 'react'

import {Avatar, Link} from '@/app/components'
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
    const q = query(collection(db, 'users'), where('userName', '==', userName))
    const {docs: users} = await getDocs(q)

    users.forEach(async curUser => {
      setUser(curUser.data() as User)
      const {size, docs} = await getDocs(
        collection(db, curUser.ref.path, 'links'),
      )

      setLinks([])

      if (size === 0) return setIsLoading(false)

      docs.forEach(curUser => setLinks(prev => [...prev, curUser.data()]))
    })

    setIsLoading(false)
  }, [userName])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <main className='flex h-screen items-center justify-center overflow-y-auto bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100 p-10  py-20'>
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

        {links.length === 0 && isLoading === false && (
          <div className='rounded-md bg-red-300 p-2 shadow-md'>
            No links in this profile
          </div>
        )}

        <Link.container>
          {links.length > 0 &&
            links.map(link => {
              return (
                <Link.item key={link.url} path={link.url}>
                  {link.label}
                </Link.item>
              )
            })}
        </Link.container>
      </div>
    </main>
  )
}
