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
        <div className='flex h-full w-full items-center justify-center text-lg text-bw-1000'>
          <div className='bw loader'>
            <div className='bar-bounce' />
          </div>
        </div>
      ) : (
        <div className='grid h-auto w-full grid-cols-1 grid-rows-[1fr] md:grid-cols-[3fr_2fr]'>
          <section className='flex h-full w-full flex-col pb-12 pt-4'>
            <LinksList user={user} />
          </section>

          <aside className='grid w-full grid-rows-1'>
            <div className=' flex flex-1 items-start justify-center px-6 pb-10 pt-4 md:pb-0'>
              <div className='sticky top-6 rounded-[60px] px-5 shadow-[0px_0px_30px_0px_rgba(154,154,154,0.1)]'>
                <Smartphone ref={iframeRef} iframeUrl={`/${user?.username}`} />
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
