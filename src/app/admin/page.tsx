'use client'

import {observer} from 'mobx-react-lite'

import {Modal, Smartphone} from '@/app/components'

import {authStore} from '../auth/context/auth-store'
import {LinksList} from './components/links-list'
import {useSmartphone} from './context/smartphone-context'

const Admin = observer(() => {
  const {iframeRef, reloadSmartphoneList} = useSmartphone()

  const onSaveUserName = async (username: string) => {
    await authStore.updateUser({username})
    reloadSmartphoneList()
  }

  return (
    <>
      {!authStore.user ? (
        <div className='text-white'>Loading...</div>
      ) : (
        <main className='grid min-h-[calc(100%-80px)] w-full grid-cols-1 gap-3 md:grid-cols-[3fr_1.5fr] md:grid-rows-[1fr]'>
          <section className='flex h-auto  flex-col rounded-lg bg-gray-800 px-4 md:p-10'>
            <LinksList user={authStore.user} />
          </section>

          <aside className='grid w-full grid-rows-1 rounded-lg bg-gray-800'>
            <div className=' flex flex-1 items-start justify-center px-6 pt-4'>
              <div className='sticky top-6'>
                <Smartphone
                  ref={iframeRef}
                  iframeUrl={`${authStore.user.username}`}
                />
              </div>
            </div>
          </aside>

          <Modal
            onSave={onSaveUserName}
            initialOpen={!authStore.user?.username}
          />
        </main>
      )}
    </>
  )
})

export default Admin
