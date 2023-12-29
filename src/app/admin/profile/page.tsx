'use client'

import {observer} from 'mobx-react-lite'

import {authStore} from '@/app/auth/context/auth-store'
import {Smartphone} from '@/app/components'
import {parseUserPageUrl} from '@/utils'

import {AdminBaseLayout} from '../components'
import {useSmartphone} from '../context'
import {ProfileForm, SocialCard} from './components'

export const ProfilePage = observer(() => {
  const user = authStore.user

  const {iframeRef} = useSmartphone()

  return (
    <AdminBaseLayout>
      <AdminBaseLayout.Content>
        {user && <ProfileForm user={user} />}
        {user && <SocialCard user={user} />}
      </AdminBaseLayout.Content>
      <AdminBaseLayout.RightPanel>
        <Smartphone
          ref={iframeRef}
          iframeUrl={parseUserPageUrl(user?.username || '')}
        />
      </AdminBaseLayout.RightPanel>
    </AdminBaseLayout>
  )
})

export default ProfilePage