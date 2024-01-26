'use client'

import {observer} from 'mobx-react-lite'

import {adminStore} from '@/app/admin/context/admin-store'

import {AdminBaseLayout, SmartphonePreview} from '../components'
import {GithubSection, ProfileForm, SocialCard} from './components'

const Profile = observer(() => {
  const {user, socialPages, pageLinks} = adminStore

  return (
    <AdminBaseLayout>
      <AdminBaseLayout.Content className='gap-5'>
        <h1 className='mb-8 text-2xl font-semibold'>Profile</h1>

        {user && <ProfileForm user={user} />}
        {user && <SocialCard user={user} />}
        {user && <GithubSection user={user} />}
      </AdminBaseLayout.Content>

      <AdminBaseLayout.PagePreview>
        <SmartphonePreview
          pageLinks={pageLinks}
          socialPages={socialPages}
          user={user}
        />
      </AdminBaseLayout.PagePreview>
    </AdminBaseLayout>
  )
})

export default Profile
