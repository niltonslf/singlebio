'use client'

import {getAuth} from 'firebase/auth'
import {useRouter} from 'next/navigation'
import {ReactNode, useEffect} from 'react'

type AdminLayoutProps = {
  children: ReactNode
}

export default function AdminLayout({children}: AdminLayoutProps) {
  const router = useRouter()

  useEffect(() => {
    const auth = getAuth()
    if (!auth.currentUser) router.push('/auth')
  }, [router])

  return children
}
