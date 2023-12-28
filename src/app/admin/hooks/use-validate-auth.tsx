import {onAuthStateChanged} from 'firebase/auth'
import {useRouter, usePathname} from 'next/navigation'
import {useCallback, useEffect, useState} from 'react'

import {authStore} from '@/app/auth/context/auth-store'
import {auth} from '@/libs/firebase'

export const useValidateAuth = () => {
  const router = useRouter()
  const pathName = usePathname()

  const [isFetchingUser, setIsFetchingUser] = useState(false)

  const listenAuthState = useCallback(() => {
    return onAuthStateChanged(auth, async firebaseUser => {
      if (!firebaseUser) {
        authStore.clearUser()
        router.push('/auth')
      } else {
        setIsFetchingUser(true)
        await authStore.authUser(firebaseUser)
        if (!pathName.startsWith('/admin')) router.push('/admin')
        return setIsFetchingUser(false)
      }
    })
  }, [pathName, router])

  useEffect(() => {
    const unsubscribe = listenAuthState()
    return () => unsubscribe()
  }, [listenAuthState])

  return {
    isFetchingUser,
  }
}
