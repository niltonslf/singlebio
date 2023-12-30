'use client'

import {observer} from 'mobx-react-lite'

import {authStore} from '@/app/auth/context/auth-store'
import {Button} from '@/app/components'

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
            <div className='background border-background-600'>
              <select className='bw solid select'>
                <option>English</option>
              </select>
            </div>
          </SectionCard>
          {/*  */}

          <SectionCard title='App theme'>
            <div className='background border-background-600'>
              <select className='bw solid select'>
                <option>Dark theme</option>
              </select>
            </div>
          </SectionCard>
          {/*  */}
          <SectionCard title='Delete Account'>
            <div>
              <div className='danger sm prompt mb-10 border-warn-600 !bg-red-400 !text-white'>
                <p className='content'>
                  Be aware that this action will delete all your data and it's
                  not possible to come back.
                </p>
              </div>
              <Button variant='error' onClick={() => deleteAccount()}>
                Delete account
              </Button>
            </div>
          </SectionCard>
        </div>
      </AdminBaseLayout.Content>
    </AdminBaseLayout>
  )
})

export default Settings
