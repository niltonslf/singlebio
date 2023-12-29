'use client'

import {Eye, X} from 'lucide-react'
import {observer} from 'mobx-react-lite'
import {useEffect, useState} from 'react'

import {Modal, Smartphone} from '@/app/components'
import {merge, parseUserPageUrl} from '@/utils'

import {authStore} from '../auth/context/auth-store'
import {AdminBaseLayout, PageLoader} from './components'
import {CardList} from './components/card-list'
import {useSmartphone} from './context/smartphone-context'

const Admin = observer(() => {
  const user = authStore.user

  const {iframeRef, reloadSmartphoneList} = useSmartphone()
  const [showUsernameModal, setShowUsernameModal] = useState(false)
  const [showMobilePreview, setShowMobilePreview] = useState(false)

  const onSubmitUsername = async (username: string) => {
    await authStore.updateUser({username})
    reloadSmartphoneList()
    setShowUsernameModal(false)
  }

  useEffect(() => {
    if (user != undefined && !user?.username) {
      setShowUsernameModal(true)
    } else {
      setShowUsernameModal(false)
    }
  }, [user, user?.username])

  if (!user) return <PageLoader />

  return (
    <>
      <AdminBaseLayout>
        <AdminBaseLayout.Content className='pb-10'>
          <h1 className='mb-8 text-2xl font-semibold'>Your links</h1>

          <CardList user={user} />
        </AdminBaseLayout.Content>

        <AdminBaseLayout.RightPanel className='hidden md:grid'>
          <Smartphone
            ref={iframeRef}
            iframeUrl={parseUserPageUrl(user?.username || '')}
          />
        </AdminBaseLayout.RightPanel>
      </AdminBaseLayout>

      <Modal onSave={onSubmitUsername} initialOpen={showUsernameModal} />

      <button
        className='bw btn solid md fixed bottom-4 right-4 z-50 flex rounded-full shadow-md md:hidden'
        onClick={() => setShowMobilePreview(prev => !prev)}>
        {showMobilePreview ? (
          <>
            <X size={18} />
            <p>Close</p>
          </>
        ) : (
          <>
            <Eye size={18} />
            <p>Preview</p>
          </>
        )}
      </button>

      <div
        className={merge([
          'absolute -bottom-full left-0 z-30 flex h-[100vh] w-full flex-row justify-center bg-transparent px-3 pt-10 backdrop-blur-md',
          'transition-all duration-500 md:hidden',
          showMobilePreview && 'bottom-0',
        ])}>
        <div
          className={merge([
            'aspect-[9/19] h-full w-full overflow-hidden',
            'max-w-[500px] border-[15px] border-b-0 border-[#111]',
            'rounded-tl-[40px] rounded-tr-[40px] bg-background-100',
            ' has-shadow',
          ])}>
          <iframe
            src='https://bc47-179-130-41-56.ngrok-free.app/nillslf'
            // src={parseUserPageUrl(user?.username || '')}
            className='h-full w-full'
          />
        </div>
      </div>
    </>
  )
})

export default Admin
