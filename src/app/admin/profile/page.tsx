'use client'

import {Instagram, Mail, Plus, Trash} from 'lucide-react'
import {observer} from 'mobx-react-lite'
import Image from 'next/image'

import {authStore} from '@/app/auth/context/auth-store'
import {Smartphone} from '@/app/components'
import {parseUserPageUrl} from '@/utils'

import {AdminBaseLayout} from '../components'
import {useSmartphone} from '../context'

export const ProfilePage = observer(() => {
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
                maxLength={100}
                wrap='soft'
                rows={2}
              />
            </div>
            <div className='flex h-full items-center'>
              <Image
                className='rounded-full'
                src={user?.pictureUrl || ''}
                alt='Profile picture'
                width={150}
                height={150}
              />
            </div>
          </form>
        </div>
        {/*  */}
        <div className='mt-5 flex w-full flex-col gap-2 overflow-hidden rounded-lg bg-background-300 p-6 shadow-lg'>
          <div className='mb-5 flex items-baseline'>
            <h3 className='text-xl font-semibold'>Social links</h3>
          </div>
          <form className='flex flex-row flex-wrap  gap-5'>
            <div className='flex flex-1 flex-col gap-3'>
              <div className='flex flex-row flex-wrap items-center justify-between gap-3 rounded-lg bg-background-100 px-4 py-2'>
                <span className='flex flex-row flex-wrap items-center justify-between gap-5'>
                  <Instagram size={15} />
                  <span>Instagram</span>
                </span>
                <div className='flex flex-row items-center'>
                  <input
                    type='text'
                    name='instagram'
                    className='rounded-lg bg-transparent px-2 py-1 text-right font-normal hover:bg-background-500 focus:bg-background-500 focus:outline-none disabled:opacity-80'
                    placeholder='Instagram'
                  />
                  <button className='rounded-md p-2 text-background-900 hover:bg-primary-500'>
                    <Trash size={15} />
                  </button>
                </div>
              </div>
              {/*  */}
              <div className='flex flex-row flex-wrap items-center justify-between gap-3 rounded-lg bg-background-100 px-4 py-2'>
                <span className='flex flex-row flex-wrap items-center justify-between gap-5'>
                  <Mail size={15} />
                  <span>Mail</span>
                </span>
                <div className='flex flex-row items-center'>
                  <input
                    type='text'
                    name='mail'
                    className='rounded-lg bg-transparent px-2 py-1 text-right font-normal hover:bg-background-500 focus:bg-background-500 focus:outline-none disabled:opacity-80'
                    placeholder='Mail'
                  />
                  <button className='rounded-md p-2 text-background-900 hover:bg-primary-500'>
                    <Trash size={15} />
                  </button>
                </div>
              </div>
              {/*  */}
            </div>

            {/* <input
              type='text'
              name='youtube'
              className='bw solid input !border-background-600'
              placeholder='Youtube'
            /> */}
          </form>

          <button className='mt-5 flex w-full flex-row items-center justify-center gap-2 rounded-lg p-3 text-primary-900 hover:bg-background-100 '>
            <Plus size={15} /> Add social
          </button>
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

export default ProfilePage
