'use client'

import {observer} from 'mobx-react-lite'

import {adminStore} from '@/app/admin/context/admin-store'

import {AdminBaseLayout, PagePreview} from '../components'
import {ProfileForm} from './components'

const Profile = observer(() => {
  const {user, socialPages, pageLinks} = adminStore

  return (
    <AdminBaseLayout>
      <AdminBaseLayout.Content className='gap-5'>
        <h1 className='mb-8 text-2xl font-semibold'>Profile</h1>

        {user && <ProfileForm user={user} />}
      </AdminBaseLayout.Content>

      <AdminBaseLayout.PagePreview>
        {user && (
          <PagePreview
            pageLinks={pageLinks}
            socialPages={socialPages}
            user={user}
            theme={user.theme}
          />
        )}
      </AdminBaseLayout.PagePreview>
    </AdminBaseLayout>
  )
})

export default Profile
