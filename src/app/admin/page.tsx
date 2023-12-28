'use client'

import {observer} from 'mobx-react-lite'
import {useEffect, useState} from 'react'

import {Modal, Smartphone} from '@/app/components'
import {parseUserPageUrl} from '@/utils'

import {authStore} from '../auth/context/auth-store'
import {AdminBaseLayout, PageLoader} from './components'
import {CardList} from './components/card-list'
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
    if (user != undefined && !user?.username) {
      setShowUsernameModal(true)
    } else {
      setShowUsernameModal(false)
    }
  }, [user, user?.username])

  if (!user) return <PageLoader />

  return (
    <AdminBaseLayout>
      <AdminBaseLayout.Content>
        <CardList user={user} />
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

      <Modal onSave={onSubmitUsername} initialOpen={showUsernameModal} />
    </AdminBaseLayout>
  )
})

export default Admin
