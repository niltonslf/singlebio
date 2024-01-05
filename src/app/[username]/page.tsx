import clsx from 'clsx'
import {Metadata} from 'next'
import {redirect} from 'next/navigation'

import {fetchUserLinks, fetchUserProfile} from '@/api/usecases'
import {
  UserPageFooter,
  UserPageHeader,
  UserPageLinks,
  UserPageSocial,
} from '@/app/[username]/components'
import {UserTheme} from '@/models'

import {makePageStyles} from './utils'

type UserPageProps = {
  params: {username: string}
  searchParams?: UserTheme & {preview: string}
}

const fetchUserData = async (username: string) => {
  const user = await fetchUserProfile(username)

  if (!user) return redirect('/not-found')

  const links = await fetchUserLinks(user.uid)

  return {user, links}
}

export const generateMetadata = async ({
  params,
}: UserPageProps): Promise<Metadata> => {
  const {user} = await fetchUserData(params.username)

  return {
    title: user.name,
    description: user.bio,
    openGraph: {
      images: [
        {
          url: user.pictureUrl,
          width: 800,
          height: 600,
        },
        {
          url: user.pictureUrl,
          width: 1920,
          height: 1080,
        },
      ],
      locale: 'en_US',
      type: 'website',
    },
    icons: {
      icon: user.pictureUrl,
      shortcut: user.pictureUrl,
      apple: user.pictureUrl,
      other: {
        rel: 'apple-touch-icon-precomposed',
        url: user.pictureUrl,
      },
    },
  }
}

export default async function UserPage({params, searchParams}: UserPageProps) {
  const {user, links} = await fetchUserData(params.username)

  const defaultBg = 'bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100'

  const pageStyles = makePageStyles({params: searchParams, user})

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
          <UserPageHeader user={user} pageStyles={pageStyles} />
          {user.social && (
            <UserPageSocial social={user.social} pageStyles={pageStyles} />
          )}
          <UserPageLinks links={links} pageStyles={pageStyles} />
          <UserPageFooter />
        </div>
      </section>
    </main>
  )
}
