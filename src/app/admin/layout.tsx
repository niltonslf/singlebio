'use client'

import {observer} from 'mobx-react-lite'
import {ReactNode} from 'react'

type AdminLayoutProps = {
  children: ReactNode
}

const AdminLayout = observer(({children}: AdminLayoutProps) => {
  return children
})

export default AdminLayout
