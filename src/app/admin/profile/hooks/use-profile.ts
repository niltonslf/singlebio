import {collection, getDocs, query, where} from 'firebase/firestore'

import {adminStore} from '@/app/admin/context/admin-store'
import {db} from '@/services/firebase'

export const useProfile = () => {
  const validateUsername = async (data: string): Promise<boolean> => {
    const username = data

    if (username === adminStore.user?.username) return true

    const q = query(collection(db, 'users'), where('username', '==', username))
    const snapshot = await getDocs(q)

    return snapshot.size === 0
  }

  return {
    validateUsername,
  }
}
