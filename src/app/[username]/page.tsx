import {redirect} from 'next/navigation'

import {
  fetchUserLinks,
  fetchUserProfile,
  fetchUserSocialPages,
} from '@/api/usecases'
import {PageAnalyticsLoader} from '@/app/[username]/components'
import {CookieConsentBanner} from '@/app/components'
import {themeOptions} from '@/constants/theme-options'
import {UserTheme} from '@/domain/models'

type UserPageProps = {
  params: {username: string}
  searchParams?: UserTheme & {preview: string}
}

const fetchUserData = async (username: string) => {
  const user = await fetchUserProfile(username)

  if (!user) redirect('/not-found')

  const [linksRes, socialPages] = await Promise.all([
    fetchUserLinks(user.uid),
    fetchUserSocialPages(user.uid),
  ])

  const links = linksRes.sort((cur, next) => next?.order - cur?.order)

  return {user, links, socialPages}
}

const UserPage = async ({params}: UserPageProps) => {
  const {user, links, socialPages} = await fetchUserData(params.username)

  const Theme = themeOptions[user?.theme?.name || 'default'].component

  return (
    <>
      <Theme
        links={links}
        socialPages={socialPages}
        user={user}
        theme={user.theme}
      />
      <CookieConsentBanner />
      <PageAnalyticsLoader user={user} />
    </>
  )
}

export default UserPage
