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
        <div
          className='sticky top-6 rounded-[60px] 
                        px-5 shadow-[0px_0px_30px_0px_rgba(154,154,154,0.1)]'>
          <Smartphone
            ref={iframeRef}
            iframeUrl={parseUserPageUrl(user?.username || '')}
          />
        </div>
      </AdminBaseLayout.RightPanel>
    </AdminBaseLayout>
  )
})

export default ProfilePage
