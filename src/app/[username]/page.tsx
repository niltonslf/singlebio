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
import {useCallback, useEffect, useMemo, useState} from 'react'

import {
  UserNotFound,
  UserPageFooter,
  UserPageHeader,
  UserPageLinks,
  UserPageSocial,
} from '@/app/[username]/components'
import {app} from '@/libs/firebase'
import {User} from '@/models'

import {usePreviewCache} from './hooks/use-preview-cache'
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

  const {createCacheData, getCachedData, hasCache} = usePreviewCache()

  const defaultBg = 'bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100'

  const isPreviewAccess = useMemo(() => searchParams?.preview === 'true', [])

  const pageStyles = isPreviewAccess
    ? makePreviewStyles(searchParams ?? {})
    : makePageStyles(user)

  const fetchData = useCallback(async () => {
    const cacheExist = hasCache()

    if (cacheExist && isPreviewAccess) {
      const {user, links} = getCachedData()

      setUser(user)
      setLinks(links)
      setIsLoading(false)
      return
    }

    const q = query(
      collection(db, 'users'),
      where('username', '==', username),
      limit(1),
    )
    const {docs: users} = await getDocs(q)

    if (users.length === 0) {
      setIsLoading(false)
      return
    }
    new Promise(resolve => {
      users.forEach(async curUser => {
        setUser(curUser.data() as User)

        const customQuery = query(
          collection(db, curUser.ref.path, 'links'),
          orderBy('order', 'desc'),
        )

        const {size, docs} = await getDocs(customQuery)

        if (size === 0) {
          setIsLoading(false)
          return resolve(true)
        }

        const linksTemp: any[] = []
        const validLinks = docs.filter(link => !!link.data().url)
        validLinks.forEach(link => linksTemp.push(link.data()))
        setLinks(linksTemp)

        if (isPreviewAccess) {
          // Make a cache from the data when the access is coming from the admin page
          // during the customization process. The goal is avoid to consume too much the firebase
          createCacheData(curUser.data() as User, linksTemp)
        }

        resolve(true)
        setIsLoading(false)
      })
    })
  }, [createCacheData, getCachedData, hasCache, isPreviewAccess, username])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  if (
    (links.length === 0 && isLoading === false) ||
    (isLoading === false && user === undefined)
  )
    return <UserNotFound />

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
          'flex h-[100dvh] w-screen flex-col items-center justify-start  overflow-y-auto',
          'px-5 pb-8 pt-20',
        ])}
        style={pageStyles.backgroundColor}>
        <div className='flex w-full max-w-2xl flex-1 flex-col flex-wrap'>
          {isLoading && (
            <div className='flex h-full w-full flex-1 items-center justify-center'>
              <div className='loading loading-dots loading-lg text-neutral-950' />
            </div>
          )}

          {user && (
            <>
              <UserPageHeader user={user} pageStyles={pageStyles} />
              {user.social && <UserPageSocial social={user.social} />}
            </>
          )}
          <UserPageLinks links={links} pageStyles={pageStyles} />
          <UserPageFooter />
        </div>
      </section>
    </main>
  )
}
