'use client'

import {AlertOctagon, Trash} from 'lucide-react'
import {observer} from 'mobx-react-lite'

import {authStore} from '@/app/auth/context/auth-store'

import {AdminBaseLayout, SectionCard, ThemeSwitcher} from '../components'

const Settings = observer(() => {
  const deleteAccount = async () => {
    await authStore.deleteUser()
  }

  return (
    <AdminBaseLayout>
      <div className='w-full md:w-1/2'>
        <AdminBaseLayout.Content className='md:mr-5'>
          <h1 className='mb-8 text-2xl font-semibold'>Settings</h1>
          <div className='flex flex-row flex-wrap gap-5'>
            <div className='flex-1'>
              <SectionCard title='Language'>
                <select className='bw solid select' disabled>
                  <option>English</option>
                </select>
              </SectionCard>
            </div>
            {/*  */}

            <div className='flex-1'>
              <SectionCard title='App theme'>
                <ThemeSwitcher />
                <br></br>
              </SectionCard>
            </div>
            {/*  */}
            <SectionCard title='Delete Account'>
              <div>
                <div className='alert alert-warning mb-10 text-sm'>
                  <AlertOctagon />
                  <span>
                    Be aware that this action will delete all your data and it's
                    not possible to come back.
                  </span>
                </div>

                <button
                  className='btn btn-error btn-md'
                  onClick={() => deleteAccount()}>
                  <Trash size={18} />
                  <span>Delete account</span>
                </button>
              </div>
            </SectionCard>
          </div>
        </AdminBaseLayout.Content>
      </div>
    </AdminBaseLayout>
  )
})

export default Settings
