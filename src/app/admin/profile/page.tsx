'use client'

import {observer} from 'mobx-react-lite'

import {authStore} from '@/app/auth/context/auth-store'

import {AdminBaseLayout} from '../components'
import {ProfileForm, SocialCard} from './components'

export const ProfilePage = observer(() => {
  const user = authStore.user

  // const {iframeRef} = useSmartphone()

  return (
    <AdminBaseLayout>
      <AdminBaseLayout.Content className='gap-5'>
        <h1 className='mb-8 text-2xl font-semibold'>Profile</h1>

        {user && <ProfileForm user={user} />}
        {user && <SocialCard user={user} />}
      </AdminBaseLayout.Content>

      {/* <AdminBaseLayout.PagePreview>
        <Smartphone
          ref={iframeRef}
          iframeUrl={parseUserPageUrl(user?.username || '')}
        />
      </AdminBaseLayout.PagePreview> */}
    </AdminBaseLayout>
  )
})

export default ProfilePage
