'use client'

import {themeOptions} from '@/app/[username]/constants/theme-options'
import {SmartphoneCanvas} from '@/app/admin/components'
import {PageLink, SocialPage, User, UserTheme} from '@/domain/models'
import {merge} from '@/utils'

type Props = {
  user?: User
  socialPages: SocialPage[]
  pageLinks: PageLink[]
  theme: UserTheme
}

export const PagePreview = ({user, socialPages, pageLinks, theme}: Props) => {
  const Theme = themeOptions[theme?.name || 'default'].component

  return (
    <div
      data-testid='admin-page-preview'
      className={merge(['flex h-full min-w-full', 'bg-cover bg-center'])}
      style={{backgroundImage: `url(${theme?.backgroundImage})`}}>
      <div className='flex h-full w-full items-center justify-center backdrop-blur-md'>
        <SmartphoneCanvas>
          {user && (
            <Theme
              links={pageLinks}
              socialPages={socialPages}
              user={user}
              theme={theme}
            />
          )}
        </SmartphoneCanvas>
      </div>
    </div>
  )
}

PagePreview.displayName = 'PagePreview'
