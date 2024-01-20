'use server'

import {User} from '@/domain/models'
import {firestoreAdmin} from '@/services/firebase-admin'

/**
 * Fetch user profile information: name, email, theme...
 * @param username
 * @returns User type
 */
export const fetchUserProfile = async (username: string) => {
  const userDoc = await firestoreAdmin
    .collection('users')
    .where('username', '==', username)
    .get()

  if (userDoc.empty) return {}
  const docRes = userDoc.docs[0]
  return docRes.data() as User
}

/**
 * fetch all links from the provided user uid
 * @param uid
 * @returns Array of Link
 */
export const fetchUserLinks = async (uid: string) => {
  const linksReq = await firestoreAdmin.collection(`users/${uid}/links`).get()

  if (linksReq.empty) return []
  const links = linksReq.docs.map(link => link.data())
  return links
}

/**
 * Fetch all usernames from the platform
 * @returns ```Array<{username: string}>```
 */
export const fetchAllUsernames = async (): Promise<{username: string}[]> => {
  const usersReq = await firestoreAdmin
    .collection('users')
    .select('username')
    .get()

  if (usersReq.empty) return []
  const users = usersReq.docs.map(user => user.data()) as {username: string}[]
  return users
}
