'use client'

import {getAuth} from 'firebase/auth'
import {useRouter} from 'next/navigation'
import {ReactNode, useEffect} from 'react'

import {app} from '@/libs/firebase'

type AdminLayoutProps = {
  children: ReactNode
}

const auth = getAuth(app)

export default function AdminLayout({children}: AdminLayoutProps) {
  const router = useRouter()

  useEffect(() => {
    setTimeout(() => {
      if (!auth.currentUser?.uid) return router.push('/auth')
    }, 2000)
  }, [router])

  return children
}
