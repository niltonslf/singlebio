import {
  UserGithubChart,
  UserPageFooter,
  UserPageHeader,
  UserPageLinks,
  UserPageSocial,
  UserPageWrapper,
} from '@/app/[username]/components'
import {PageStylesObject} from '@/app/[username]/utils'
import {authStore} from '@/app/auth/context/auth-store'
import {CookieConsentBanner, SmartphoneCanvas} from '@/app/components'
import {Link} from '@/domain/models'

export const SmartphonePreview = () => {
  const {user} = authStore
  const socialPages = []

  const pageStyles = {} as PageStylesObject
  const links = [
    {
      clicks: 0,
      id: '1',
      label: 'Link',
      order: 0,
      url: 'http://google.com.br',
    },
    ,
    {
      clicks: 0,
      id: '2',
      label: 'Link',
      order: 0,
      url: 'http://google.com.br',
    },
  ] as Link[]

  return (
    <SmartphoneCanvas>
      <UserPageWrapper pageStyles={pageStyles}>
        <UserPageHeader user={user} pageStyles={pageStyles} />
        <UserPageSocial socialPages={socialPages} pageStyles={pageStyles} />
        <UserPageLinks links={links} pageStyles={pageStyles} />
        <UserGithubChart user={user} />
        <UserPageFooter />
      </UserPageWrapper>
      <CookieConsentBanner />
    </SmartphoneCanvas>
  )
}

SmartphonePreview.displayName = 'SmartphonePreview'
