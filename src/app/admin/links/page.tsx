'use client'

import {observer} from 'mobx-react-lite'
import {useEffect, useState} from 'react'

import {
  AdminBaseLayout,
  SmartphonePreview,
  BetaVersionWarningModal,
  PageLoader,
} from '@/app/admin/components'
import {LinksSection} from '@/app/admin/components/links-section'
import {adminStore} from '@/app/admin/context/admin-store'
import {authStore} from '@/app/auth/context/auth-store'
import {SetUsernameModal} from '@/app/components'

const LinksPage = observer(() => {
  const user = adminStore.user

  const [showUsernameModal, setShowUsernameModal] = useState(false)
  const [showBetaWarningModal, setShowBetaWarningModal] = useState(false)

  const onSubmitUsername = async (username: string) => {
    await authStore.updateUser({username})
    setShowUsernameModal(false)
    setShowBetaWarningModal(true)
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
        <AdminBaseLayout.Content>
          <h1 className='mb-8 text-2xl font-semibold'>Your links</h1>

          <LinksSection user={user} />
        </AdminBaseLayout.Content>

        <AdminBaseLayout.PagePreview>
          <SmartphonePreview />
        </AdminBaseLayout.PagePreview>
      </AdminBaseLayout>

      <SetUsernameModal
        onSave={onSubmitUsername}
        initialOpen={showUsernameModal}
      />
      <BetaVersionWarningModal
        isOpen={showBetaWarningModal}
        onClose={() => setShowBetaWarningModal(false)}
      />
    </>
  )
})

export default LinksPage
