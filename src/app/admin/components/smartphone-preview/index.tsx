import {observer} from 'mobx-react-lite'

import {SmartphoneCanvas} from '@/app/admin/components'
import {themeOptions} from '@/constants/theme-options'
import {Link, SocialPage, User, UserTheme} from '@/domain/models'

type Props = {
  user?: User
  socialPages: SocialPage[]
  pageLinks: Link[]
  theme: UserTheme
}

export const SmartphonePreview = observer(
  ({user, socialPages, pageLinks, theme}: Props) => {
    const Theme = themeOptions[user?.theme?.name || 'default'].component

    return (
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
    )
  },
)

SmartphonePreview.displayName = 'SmartphonePreview'
