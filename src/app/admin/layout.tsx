'use client'

import {observer} from 'mobx-react-lite'
import {useRouter} from 'next/navigation'
import {ReactNode, useEffect} from 'react'

import {authStore} from '../auth/context/auth-store'

type AdminLayoutProps = {
  children: ReactNode
}

const AdminLayout = observer(({children}: AdminLayoutProps) => {
  const router = useRouter()

  useEffect(() => {
    if (!authStore.user?.uid && !authStore.isLoading)
      return router.push('/auth')
  }, [router, authStore.user, authStore.isLoading])

  return children
})

export default AdminLayout
