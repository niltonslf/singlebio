'use client'

import {observer} from 'mobx-react-lite'
import Image from 'next/image'

import {authStore} from '@/app/auth/context/auth-store'
import {Button, Smartphone} from '@/app/components'
import {parseUserPageUrl} from '@/utils'

import {AdminBaseLayout} from '../components'
import {useSmartphone} from '../context'

export const MyAccountPage = observer(() => {
  const user = authStore.user

  const {iframeRef} = useSmartphone()

  return (
    <AdminBaseLayout>
      <AdminBaseLayout.Content>
        <div className='flex w-full flex-col gap-2 overflow-hidden rounded-lg bg-background-300 p-6 shadow-lg'>
          <div className='mb-5 flex items-baseline'>
            <h3 className='text-xl font-semibold'>Profile</h3>
          </div>
          <form className='flex flex-row flex-wrap  gap-5'>
            <div className='flex flex-1 flex-col gap-3'>
              <input
                type='text'
                name='username'
                className='bw solid input !border-background-600'
                placeholder='Username'
                value={user?.username}
              />
              <input
                type='text'
                name='name'
                className='bw solid input !border-background-600'
                placeholder='Name'
                value={user?.name}
              />
              <textarea
                placeholder='Bio'
                name='bio'
                className='bw solid input !border-background-600'
                maxLength={150}
                wrap='soft'
                rows={4}
              />
            </div>
            <div className='flex h-full items-center'>
              <Image
                className='rounded-full'
                src={user?.pictureUrl}
                alt='Profile picture'
                width={150}
                height={150}
              />
            </div>
          </form>
        </div>
        {/*  */}
        <div className='mt-10 flex w-full flex-col gap-2 overflow-hidden rounded-lg bg-background-300 p-6 shadow-lg'>
          <div className='mb-5 flex items-baseline'>
            <h3 className='text-xl font-semibold'>Social links</h3>
          </div>
          <form className='flex flex-row flex-wrap  gap-5'>
            <div className='flex flex-1 flex-col gap-3'>
              <input
                type='text'
                name='instagram'
                className='bw solid input !border-background-600'
                placeholder='Instagram'
              />
              <input
                type='text'
                name='email'
                className='bw solid input !border-background-600'
                placeholder='Email'
              />

              <input
                type='text'
                name='youtube'
                className='bw solid input !border-background-600'
                placeholder='Youtube'
              />
            </div>
          </form>
        </div>
        {/*  */}
        <div className='mt-10 flex w-full flex-col gap-2 overflow-hidden rounded-lg bg-background-300 p-6 shadow-lg'>
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

export default MyAccountPage
