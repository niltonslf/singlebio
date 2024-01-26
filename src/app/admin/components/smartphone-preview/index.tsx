import {observer} from 'mobx-react-lite'

import {SmartphoneCanvas} from '@/app/admin/components'
import {adminStore} from '@/app/admin/context/admin-store'
import {themeOptions} from '@/constants/theme-options'

export const SmartphonePreview = observer(() => {
  const {user, socialPages, pageLinks} = adminStore
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
