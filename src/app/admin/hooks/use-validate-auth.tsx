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
        if (pathName !== '/auth') return router.push('/auth')
        return
      }

      const user = await authStore.authOrCreateUser(firebaseUser)
      const providerId = firebaseUser.providerData[0].providerId
      const isEmailAccount = providerId === AuthProviders.PASSWORD

      if (!firebaseUser.emailVerified && isEmailAccount) {
        router.push('/auth/verify-email')
      } else {
        if (!user?.username) router.push('/admin/set-username')
        if (pathName === '/auth') router.push('/admin')
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
