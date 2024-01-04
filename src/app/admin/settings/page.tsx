'use client'

import {AlertOctagon} from 'lucide-react'
import {observer} from 'mobx-react-lite'

import {authStore} from '@/app/auth/context/auth-store'

import {AdminBaseLayout, SectionCard} from '../components'

export const Settings = observer(() => {
  const deleteAccount = async () => {
    await authStore.deleteUser()
  }

  return (
    <AdminBaseLayout>
      <AdminBaseLayout.Content>
        <h1 className='mb-8 text-2xl font-semibold'>Settings</h1>
        <div className='flex flex-col gap-5'>
          <SectionCard title='Language'>
            <select className='bw solid select' disabled>
              <option>English</option>
            </select>
          </SectionCard>
          {/*  */}

          <SectionCard title='App theme'>
            <select className='bw solid select' disabled>
              <option>Dark theme</option>
            </select>
          </SectionCard>
          {/*  */}
          <SectionCard title='Delete Account'>
            <div>
              <div className='alert alert-warning mb-10'>
                <AlertOctagon />
                <p>
                  Be aware that this action will delete all your data and it's
                  not possible to come back.
                </p>
              </div>
              <button
                className='btn btn-error btn-md'
                onClick={() => deleteAccount()}>
                Delete account
              </button>
            </div>
          </SectionCard>
        </div>
      </AdminBaseLayout.Content>
    </AdminBaseLayout>
  )
})

export default Settings
