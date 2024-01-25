import {observer} from 'mobx-react-lite'

import {SmartphoneCanvas} from '@/app/admin/components'
import {authStore} from '@/app/auth/context/auth-store'
import {themeOptions} from '@/constants/theme-options'

export const SmartphonePreview = observer(() => {
  const {user, socialPages, pageLinks} = authStore
  const Theme = themeOptions[user?.theme?.name || 'default'].component

  return (
    <SmartphoneCanvas>
      {user && (
        <Theme links={pageLinks} socialPages={socialPages} user={user} />
      )}
    </SmartphoneCanvas>
  )
})

SmartphonePreview.displayName = 'SmartphonePreview'
