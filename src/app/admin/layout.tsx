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
    setTimeout(() => {
      if (!authState.user?.uid) return router.push('/auth')
    }, 2000)
  }, [router, authState.user])

  return children
})

export default AdminLayout
