import {Metadata} from 'next'
import {ReactNode} from 'react'

import AdminLayoutWrapper from '@/app/admin/components/admin-page-wrapper'
import {APP_NAME} from '@/config/envs'

type AdminLayoutProps = {
  children: ReactNode
}

export const metadata: Metadata = {
  title: {
    template: `%s - ${APP_NAME}`,
    default: 'Dashboard',
  },
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      'index': false,
      'follow': false,
      'noimageindex': false,
      'max-image-preview': 'large',
    },
  },
}

const AdminLayout = ({children}: AdminLayoutProps) => {
  return <AdminLayoutWrapper>{children}</AdminLayoutWrapper>
}

export default AdminLayout
