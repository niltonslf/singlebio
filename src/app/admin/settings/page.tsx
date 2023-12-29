'use client'

import {observer} from 'mobx-react-lite'

import {authStore} from '@/app/auth/context/auth-store'
import {Button, Smartphone} from '@/app/components'
import {parseUserPageUrl} from '@/utils'

import {AdminBaseLayout} from '../components'
import {useSmartphone} from '../context'

export const Settings = observer(() => {
  const user = authStore.user

  const {iframeRef} = useSmartphone()

  return (
    <AdminBaseLayout>
      <AdminBaseLayout.Content>
        <div className='mt-5 flex w-full flex-col gap-2 overflow-hidden rounded-lg bg-background-300 p-6 shadow-lg'>
          <div className='mb-5 flex items-baseline'>
            <h3 className='text-xl font-semibold'>Language</h3>
          </div>
          <div className='w-full'>
            <div className='background border-background-600'>
              <select className='bw solid select'>
                <option>English</option>
                <option>Option 2</option>
                <option>Option 3</option>
              </select>
            </div>
          </div>
        </div>
        {/*  */}

        <div className='mt-5 flex w-full flex-col gap-2 overflow-hidden rounded-lg bg-background-300 p-6 shadow-lg'>
          <div className='mb-5 flex items-baseline'>
            <h3 className='text-xl font-semibold'>App theme</h3>
          </div>
          <div className='w-full'>
            <div className='background border-background-600'>
              <select className='bw solid select'>
                <option>Dark theme</option>
                <option>Option 2</option>
              </select>
            </div>
          </div>
        </div>
        {/*  */}
        <div className='mt-5 flex w-full flex-col gap-2 overflow-hidden rounded-lg bg-background-300 p-6 shadow-lg'>
          <div className='mb-5 flex items-baseline'>
            <h3 className='text-xl font-semibold'>Delete Account</h3>
          </div>
          <div>
            <div className='warn prompt mb-5 border-warn-600'>
              <p className='content'>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              </p>
            </div>
            <Button variant='error'>Delete account</Button>
          </div>
        </div>
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

export default Settings
