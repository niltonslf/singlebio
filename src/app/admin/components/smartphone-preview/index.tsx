import {observer} from 'mobx-react-lite'

import {SmartphoneCanvas} from '@/app/admin/components'
import {themeOptions} from '@/constants/theme-options'
import {Link, SocialPage, User} from '@/domain/models'

type Props = {
  user?: User
  socialPages: SocialPage[]
  pageLinks: Link[]
}

export const SmartphonePreview = observer(
  ({user, socialPages, pageLinks}: Props) => {
    const Theme = themeOptions[user?.theme?.name || 'default'].component

    return (
      <SmartphoneCanvas>
        {user && (
          <Theme links={pageLinks} socialPages={socialPages} user={user} />
        )}
      </SmartphoneCanvas>
    )
  },
)

SmartphonePreview.displayName = 'SmartphonePreview'
