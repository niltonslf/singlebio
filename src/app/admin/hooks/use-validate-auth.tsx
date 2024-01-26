import {onAuthStateChanged} from 'firebase/auth'
import {useRouter, usePathname} from 'next/navigation'
import {useCallback, useEffect, useState} from 'react'

import {authStore} from '@/app/auth/context/auth-store'
import {Providers} from '@/domain/enums'
import {auth} from '@/services/firebase'

export const useValidateAuth = () => {
  const {push} = useRouter()
  const pathName = usePathname()

  const [isFetchingUser, setIsFetchingUser] = useState(false)

  const listenAuthState = useCallback(() => {
    return onAuthStateChanged(auth, async firebaseUser => {
      setIsFetchingUser(true)
      if (!firebaseUser) {
        authStore.clearUser()
        push('/auth')
      } else {
        await authStore.authOrCreateUser(firebaseUser)

        const isEmailAccount =
          firebaseUser.providerData[0].providerId === Providers.PASSWORD

        if (!firebaseUser.emailVerified && isEmailAccount) {
          return push('/auth/verify-email')
        }

        if (!pathName.startsWith('/admin')) push('/admin')
      }
      setIsFetchingUser(false)
    })
  }, [pathName, push])

  useEffect(() => {
    const unsubscribe = listenAuthState()
    return () => unsubscribe()
  }, [listenAuthState])

  return {
    isFetchingUser,
  }
}
