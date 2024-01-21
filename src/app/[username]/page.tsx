import clsx from 'clsx'
import {redirect} from 'next/navigation'

import {
  UserPageFooter,
  UserPageHeader,
  UserPageLinks,
  UserPageSocial,
} from '@/app/[username]/components'
import {
  fetchUserLinks,
  fetchUserProfile,
  fetchUserSocialPages,
} from '@/data/usecases'
import {UserTheme} from '@/domain/models'

import {CookieConsentBanner} from '../components'
import {makePageStyles} from './utils'

type UserPageProps = {
  params: {username: string}
  searchParams?: UserTheme & {preview: string}
}

const fetchUserData = async (username: string) => {
  const user = await fetchUserProfile(username)

  if (!user) redirect('/not-found')

  const links = await fetchUserLinks(user.uid)
  const socialPages = await fetchUserSocialPages(user.uid)

  return {user, links, socialPages}
}

const UserPage = async ({params, searchParams}: UserPageProps) => {
  const {user, links, socialPages} = await fetchUserData(params.username)

  const defaultBg = 'bg-gradient-to-r from-indigo-200 via-red-200 to-yellow-100'

  const pageStyles = makePageStyles({params: searchParams, user})

  return (
    <>
      <main
        data-theme='dark'
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
            <UserPageSocial socialPages={socialPages} pageStyles={pageStyles} />
            <UserPageLinks links={links} pageStyles={pageStyles} />
            <UserPageFooter />
          </div>
        </section>
      </main>
      <CookieConsentBanner />
      {/* <PageAnalyticsLoader
        linkItemClass='user-link-item'
        socialItemClass='user-social-icon'
        user={user}
      /> */}
    </>
  )
}

export default UserPage
