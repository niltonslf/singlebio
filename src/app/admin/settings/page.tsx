'use client'

import {observer} from 'mobx-react-lite'

import {Button} from '@/app/components'

import {AdminBaseLayout} from '../components'

export const Settings = observer(() => {
  return (
    <AdminBaseLayout>
      <AdminBaseLayout.Content>
        <h1 className='mb-8 text-2xl font-semibold'>Settings</h1>

        <div className='flex w-full flex-col gap-2 overflow-hidden rounded-lg bg-background-300 p-6 shadow-lg'>
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
    </AdminBaseLayout>
  )
})

export default Settings
