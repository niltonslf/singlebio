'use client'

import {observer} from 'mobx-react-lite'
import {useRouter} from 'next/navigation'
import {ReactNode, useEffect} from 'react'

import {authState} from '../auth/context/auth-state'

type AdminLayoutProps = {
  children: ReactNode
}

const AdminLayout = observer(({children}: AdminLayoutProps) => {
  const router = useRouter()

  useEffect(() => {
    if (!authState.user?.uid && !authState.isLoading)
      return router.push('/auth')
  }, [router, authState.user, authState.isLoading])

  return children
})

export default AdminLayout
