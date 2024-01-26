'use client'

import {observer} from 'mobx-react-lite'
import {ReactNode, useEffect} from 'react'

import AdminPageWrapper from '@/app/admin/components/admin-page-wrapper'
import {PageLoader} from '@/app/admin/components/page-loader'
import {adminStore} from '@/app/admin/context/admin-store'

import {useValidateAuth} from './hooks'

type AdminLayoutProps = {
  children: ReactNode
}

const AdminLayout = observer(({children}: AdminLayoutProps) => {
  const {isFetchingUser} = useValidateAuth()

  useEffect(() => {
    if (!isFetchingUser) {
      adminStore.fetchData()
    }
  }, [isFetchingUser])

  if (isFetchingUser)
    return (
      <div className='flex h-screen w-screen items-center justify-center'>
        <PageLoader />
      </div>
    )

  return <AdminPageWrapper>{children}</AdminPageWrapper>
})

export default AdminLayout
