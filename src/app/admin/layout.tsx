'use client'

import {onAuthStateChanged} from 'firebase/auth'
import {observer} from 'mobx-react-lite'
import router from 'next/router'
import {ReactNode, useEffect} from 'react'

import {auth} from '@/libs/firebase'

import {authStore} from '../auth/context/auth-store'
import {Header} from './components'
import {AdminProvider} from './context/admin-context'

type AdminLayoutProps = {
  children: ReactNode
}

const AdminLayout = observer(({children}: AdminLayoutProps) => {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async firebaseUser => {
      if (!firebaseUser) {
        authStore.clearUser()
        router.push('/auth')
      } else {
        await authStore.authUser(firebaseUser)
      }
    })

    return () => unsubscribe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <AdminProvider>
      <div className='flex h-screen w-screen flex-col items-center overflow-auto bg-gray-900 p-3'>
        <div className=' mb-3 w-full '>
          <Header user={authStore.user} />
        </div>
        {children}
      </div>
    </AdminProvider>
  )
})

export default AdminLayout
