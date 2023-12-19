'use client'

import {observer} from 'mobx-react-lite'
import {ReactNode} from 'react'

import {authStore} from '../auth/context/auth-store'
import {Header} from './components'
import {SmartphoneProvider} from './context/admin-context'
import {useValidateAuth} from './hooks'

type AdminLayoutProps = {
  children: ReactNode
}

const AdminLayout = observer(({children}: AdminLayoutProps) => {
  useValidateAuth()

  return (
    <SmartphoneProvider>
      <div className='flex h-screen w-screen flex-col items-center overflow-auto bg-gray-900 p-3'>
        <div className=' mb-3 w-full '>
          <Header user={authStore.user} />
        </div>
        {children}
      </div>
    </SmartphoneProvider>
  )
})

export default AdminLayout
