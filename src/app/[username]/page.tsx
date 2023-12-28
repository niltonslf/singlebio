'use client'

import clsx from 'clsx'
import {
  collection,
  getFirestore,
  getDocs,
  query,
  where,
  limit,
  orderBy,
} from 'firebase/firestore'
import Image from 'next/image'
import Link from 'next/link'
import {useCallback, useEffect, useState} from 'react'

import {Avatar, LinkCard} from '@/app/components'
import {app} from '@/libs/firebase'
import {User} from '@/models'

type UserPageProps = {
  params: {
    username: string
  }
}

const db = getFirestore(app)

export default function UserPage({params: {username}}: UserPageProps) {
  const [links, setLinks] = useState<any[]>([])
  const [user, setUser] = useState<User>()
  const [isLoading, setIsLoading] = useState(true)

  const defaultBg = 'bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100'

  const backgroundColorStyle = {
    backgroundColor: `${user?.theme?.backgroundColor}`,
  }

  const backgroundImageStyle = {
    backgroundImage: `url(${user?.theme?.backgroundImage})`,
    ...backgroundColorStyle,
  }

  const fetchData = useCallback(async () => {
    const q = query(
      collection(db, 'users'),
      where('username', '==', username),
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
  }, [username])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <main
      className={clsx([
        'flex h-[100dvh] w-screen flex-wrap overflow-y-auto bg-cover bg-center',
        !user?.theme?.backgroundImage && !user?.theme?.backgroundColor
          ? defaultBg
          : '',
      ])}
      style={user?.theme?.backgroundImage ? backgroundImageStyle : {}}>
      <section
        className={clsx([
          'pb-50 flex w-full flex-col items-center p-5 pt-20 md:p-10',
        ])}
        style={user?.theme?.backgroundColor ? backgroundColorStyle : {}}>
        <div className='flex min-h-full w-full max-w-2xl flex-col'>
          <header className='w-full'>
            <div className='mb-4 flex w-full justify-center'>
              <Avatar
                name={user?.name || ''}
                pictureUrl={user?.pictureUrl}
                size={80}
              />
            </div>

            <h2
              className='mb-3 flex items-center justify-center text-2xl font-semibold text-bw-300'
              style={
                user?.theme?.usernameColor
                  ? {color: user.theme.usernameColor}
                  : {}
              }>
              @{username}
            </h2>
          </header>

          {isLoading && (
            <div
              data-theme='light'
              className='flex w-full flex-1 items-center justify-center pt-20 text-lg'>
              <div className=' bw md loader'>
                <div className='bar-bounce' />
              </div>
            </div>
          )}

          {links.length === 0 && isLoading === false && (
            <div className='rounded-md bg-red-300 p-2 shadow-md'>
              No links in this profile
            </div>
          )}

          <LinkCard>
            {links.length > 0 &&
              links.map(link => {
                return (
                  <LinkCard.Item
                    key={link.url}
                    path={link.url}
                    bgColor={user?.theme?.buttonBackground}
                    textColor={user?.theme?.buttonTextColor}>
                    {link.label}
                  </LinkCard.Item>
                )
              })}
          </LinkCard>

          <footer className='mt-auto flex w-full justify-center pt-5'>
            <Link
              href='/'
              title='Home page'
              className='flex flex-col items-center justify-end px-10 opacity-80'>
              <p className='mb-1 text-xs font-semibold text-bw-300 opacity-80'>
                Created using:{' '}
              </p>
              <Image
                src='/logo-black.png'
                width={90}
                height={23}
                alt='lnktree logo'
              />
            </Link>
          </footer>
        </div>
      </section>
    </main>
  )
}
