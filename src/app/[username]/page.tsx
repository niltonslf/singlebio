import {redirect} from 'next/navigation'

import {
  fetchUserFeatures,
  fetchUserLinks,
  fetchUserProfile,
  fetchUserSocialPages,
} from '@/api/usecases'
import {PageAnalyticsLoader, ScriptsLoader} from '@/app/[username]/components'
import {themeOptions} from '@/app/[username]/constants/theme-options'
import {CookieConsentBanner} from '@/app/components'
import {UserTheme} from '@/domain/models'

type UserPageProps = {
  params: {username: string}
  searchParams?: UserTheme & {preview: string}
}

const fetchUserData = async (username: string) => {
  const user = await fetchUserProfile(username)

  if (!user) redirect('/not-found')

  const [links, socialPages, features] = await Promise.all([
    fetchUserLinks(user.uid),
    fetchUserSocialPages(user.uid),
    fetchUserFeatures(user.uid),
  ])

  return {user, links, socialPages, features}
}

const UserPage = async ({params}: UserPageProps) => {
  const {user, links, socialPages, features} = await fetchUserData(
    params.username,
  )

  const Theme = themeOptions[user?.theme?.name || 'default'].component

  return (
    <>
      <Theme
        links={links}
        socialPages={socialPages}
        user={user}
        theme={user.theme}
        features={features}
      />
      <CookieConsentBanner />
      <PageAnalyticsLoader user={user} />
      <ScriptsLoader gaCode={user?.googleAnalyticsCode} />
    </>
  )
}

export default UserPage
