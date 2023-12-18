import {onAuthStateChanged} from 'firebase/auth'
import {useRouter} from 'next/navigation'
import {useEffect} from 'react'

import {authStore} from '@/app/auth/context/auth-store'
import {auth} from '@/libs/firebase'

export const useValidateAuth = () => {
  const router = useRouter()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async firebaseUser => {
      if (!firebaseUser) {
        authStore.clearUser()
        router.push('/auth')
      } else {
        await authStore.authUser(firebaseUser)
        router.push('/admin')
      }
    })

    return () => unsubscribe()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {}
}