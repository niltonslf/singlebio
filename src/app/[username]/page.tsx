import {redirect} from 'next/navigation'

import {CookieConsentBanner} from '@/app/components'
import {themeOptions} from '@/constants/theme-options'
import {
  fetchUserLinks,
  fetchUserProfile,
  fetchUserSocialPages,
} from '@/data/usecases'
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
      <Theme links={links} socialPages={socialPages} user={user} />
      <CookieConsentBanner />
    </>
  )
}

export default UserPage
