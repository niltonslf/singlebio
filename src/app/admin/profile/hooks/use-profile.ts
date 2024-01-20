import {collection, getDocs, query, where} from 'firebase/firestore'

import {authStore} from '@/app/auth/context/auth-store'
import {db} from '@/services/firebase'

export const useProfile = () => {
  const uploadProfilePicture = async (): Promise<string> => {
    return ''
  }

  const validateUsername = async (data: string): Promise<boolean> => {
    const username = data.includes('@') ? data.replace('@', '') : data

    if (username === authStore.user?.username) return true

    const q = query(collection(db, 'users'), where('username', '==', username))
    const snapshot = await getDocs(q)

    return snapshot.size === 0
  }

  return {
    validateUsername,
    uploadProfilePicture,
  }
}
