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

import {PreviewThemeParams, makePreviewStyles, makePageStyles} from './utils'

type UserPageProps = {
  params: {
    username: string
  }
  searchParams?: PreviewThemeParams & {preview: string}
}

const db = getFirestore(app)

export default function UserPage({
  params: {username},
  searchParams,
}: UserPageProps) {
  const [links, setLinks] = useState<any[]>([])
  const [user, setUser] = useState<User>()
  const [isLoading, setIsLoading] = useState(true)

  // TODO: make a cache system to don't overload firebase when people are just updating their theme

  const defaultBg = 'bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100'

  const isPreviewAccess = searchParams?.preview === 'true'

  const pageStyles = isPreviewAccess
    ? makePreviewStyles(searchParams)
    : makePageStyles(user)

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
        'flex h-[100vh] w-full flex-wrap overflow-hidden bg-cover bg-center',
        'bg-fixed',
        !pageStyles.backgroundImage && !pageStyles.backgroundColor
          ? defaultBg
          : '',
      ])}
      style={pageStyles.backgroundImage}>
      <section
        className={clsx([
          'flex h-[100dvh] w-screen flex-col items-center overflow-y-auto',
          'px-5 pb-8 pt-20',
        ])}
        style={pageStyles.backgroundColor}>
        <div className='flex w-full max-w-2xl flex-1 flex-row flex-wrap'>
          <header className='mb-6 w-full'>
            <div className='mb-4 flex w-full justify-center'>
              <Avatar
                name={user?.name ?? ''}
                pictureUrl={user?.pictureUrl}
                size={100}
              />
            </div>

            <h2
              className='mb-2 flex items-center justify-center text-2xl font-semibold text-bw-300'
              style={pageStyles.usernameColor}>
              {user?.name}
            </h2>

            {user?.bio && (
              <p
                className='w-full break-all text-center text-sm'
                style={pageStyles.usernameColor}>
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
            <div className='info solid sm prompt w-full items-center'>
              User not found
            </div>
          )}

          <LinkCard>
            {links.length > 0 &&
              links.map(link => {
                return (
                  <LinkCard.Item
                    key={link.url}
                    path={link.url}
                    bgColor={pageStyles.buttonBackground}
                    textColor={pageStyles.buttonTextColor}>
                    {link.label}
                  </LinkCard.Item>
                )
              })}
          </LinkCard>

          <footer className='mt-auto flex w-full flex-row items-center justify-center pt-10'>
            <Link
              href='/'
              title='Home page'
              className='flex w-48 flex-row items-center justify-center gap-2 rounded-full bg-background-1100 bg-opacity-60 py-2 text-sm shadow-md backdrop-blur-md hover:bg-white'>
              <Image
                src='/logo-icon-black.png'
                width={22}
                height={22}
                alt='lnktree logo'
              />
              <p className='text-sm font-semibold text-bw-50 opacity-80'>
                Share your best here
              </p>
            </Link>
          </footer>
        </div>
      </section>
    </main>
  )
}
