import {onAuthStateChanged} from 'firebase/auth'
import {useRouter, usePathname} from 'next/navigation'
import {useCallback, useEffect, useState} from 'react'

import {authStore} from '@/app/auth/context/auth-store'
import {AuthProviders} from '@/domain/enums'
import {auth} from '@/services/firebase'

export const useValidateAuth = () => {
  const router = useRouter()
  const pathName = usePathname()

  const [isFetchingUser, setIsFetchingUser] = useState(true)

  const listenAuthState = useCallback(() => {
    return onAuthStateChanged(auth, async firebaseUser => {
      if (!firebaseUser) {
        authStore.clearUser()
        setIsFetchingUser(false)
        return router.push('/auth')
      }

      await authStore.authOrCreateUser(firebaseUser)
      const providerId = firebaseUser.providerData[0].providerId
      const isEmailAccount = providerId === AuthProviders.PASSWORD

      if (!firebaseUser.emailVerified && isEmailAccount) {
        router.push('/auth/verify-email')
      } else {
        if (pathName === '/auth' || pathName === '/admin')
          router.push('/admin/links')
      }
      setIsFetchingUser(false)
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
