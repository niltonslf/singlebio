'use client'

import {observer} from 'mobx-react-lite'
import {useEffect, useState} from 'react'

import {Modal, Smartphone} from '@/app/components'

import {authStore} from '../auth/context/auth-store'
import {LinksList} from './components/links-list'
import {useSmartphone} from './context/smartphone-context'

const Admin = observer(() => {
  const user = authStore.user

  const {iframeRef, reloadSmartphoneList} = useSmartphone()
  const [showUsernameModal, setShowUsernameModal] = useState(false)

  const onSubmitUsername = async (username: string) => {
    await authStore.updateUser({username})
    reloadSmartphoneList()
    setShowUsernameModal(false)
  }

  useEffect(() => {
    if (!user?.username) {
      setShowUsernameModal(true)
    } else {
      setShowUsernameModal(false)
    }
  }, [user?.username])

  return (
    <>
      {!user ? (
        <div className='flex items-center justify-center text-lg text-white'>
          Loading...
        </div>
      ) : (
        <div className='grid h-auto w-full grid-cols-[3fr_2fr] grid-rows-[1fr]'>
          <section className='flex h-full w-full flex-col py-4'>
            <LinksList user={user} />
          </section>

          <aside className='grid w-full grid-rows-1'>
            <div className=' flex flex-1 items-start justify-center px-6 pt-4'>
              <div className='sticky top-6'>
                <Smartphone ref={iframeRef} iframeUrl={user?.username} />
              </div>
            </div>
          </aside>

          <Modal onSave={onSubmitUsername} initialOpen={showUsernameModal} />
        </div>
      )}
    </>
  )
})

export default Admin
