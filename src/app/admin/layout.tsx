'use client'

import {observer} from 'mobx-react-lite'
import {ReactNode} from 'react'

import {AdminProvider} from './context/admin-context'

type AdminLayoutProps = {
  children: ReactNode
}

const AdminLayout = observer(({children}: AdminLayoutProps) => {
  return <AdminProvider>{children}</AdminProvider>
})

export default AdminLayout
