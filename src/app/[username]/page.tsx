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

  const usernameTextColorStyle = {
    color: user?.theme?.usernameColor,
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
        'flex h-screen min-h-[100dvh] w-screen flex-wrap bg-cover bg-center',
        !user?.theme?.backgroundImage && !user?.theme?.backgroundColor
          ? defaultBg
          : '',
      ])}
      style={user?.theme?.backgroundImage ? backgroundImageStyle : {}}>
      <section
        className={clsx([
          'flex w-full flex-col items-center px-5 pb-8 pt-20 md:p-20',
        ])}
        style={user?.theme?.backgroundColor ? backgroundColorStyle : {}}>
        <div className='flex min-h-full w-full max-w-2xl flex-col'>
          <header className='mb-5 w-full'>
            <div className='mb-4 flex w-full justify-center'>
              <Avatar
                name={user?.name || ''}
                pictureUrl={user?.pictureUrl}
                size={80}
              />
            </div>

            <h2
              className='mb-3 flex items-center justify-center text-2xl font-semibold text-bw-300'
              style={user?.theme?.usernameColor ? usernameTextColorStyle : {}}>
              {user?.name}
            </h2>

            {user?.bio && (
              <p
                className='w-full break-all text-center text-base'
                style={
                  user?.theme?.usernameColor ? usernameTextColorStyle : {}
                }>
                {user?.bio}
              </p>
            )}
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

          <footer className='mt-auto flex w-full flex-row items-center justify-center pt-8'>
            <Link
              href='/'
              title='Home page'
              className='flex w-56 flex-row items-center justify-center gap-2 rounded-full bg-background-1100 bg-opacity-80 py-3 shadow-md backdrop-blur-md hover:bg-white'>
              <Image
                src='/logo-icon-black.png'
                width={25}
                height={25}
                alt='lnktree logo'
              />
              <p className='text-base font-semibold text-bw-50 opacity-80'>
                Share your best here
              </p>
            </Link>
          </footer>
        </div>
      </section>
    </main>
  )
}
