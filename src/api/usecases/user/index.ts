import {PageLink, SocialPage, User, UserFeature} from '@/domain/models'
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

  if (userDoc.empty) return null
  const docRes = userDoc.docs[0]
  return docRes.data() as User
}

/**
 * fetch all links from the provided user uid
 * @param uid
 * @returns Array of Link
 */
export const fetchUserLinks = async (uid: string) => {
  const linksReq = await firestoreAdmin
    .collection(`users/${uid}/links`)
    .orderBy('order', 'asc')
    .get()

  if (linksReq.empty) return []
  const links = linksReq.docs.map(link => link.data()) as PageLink[]
  return links
}

/**
 * fetch all social pages from the provided user uid
 * @param uid
 * @returns Array of Social Page
 */
export const fetchUserSocialPages = async (uid: string) => {
  const req = await firestoreAdmin
    .collection(`users/${uid}/socialPages`)
    .orderBy('order', 'asc')
    .get()

  if (req.empty) return []
  const pages = req.docs.map(pages => pages.data()) as SocialPage[]
  return pages
}

/**
 * fetch all features active in the user account
 * @param uid
 * @returns Array of Feature
 */
export const fetchUserFeatures = async (uid: string) => {
  const req = await firestoreAdmin
    .collection(`users/${uid}/features`)
    .orderBy('order', 'asc')
    .get()

  if (req.empty) return []
  const pages = req.docs.map(pages => pages.data()) as UserFeature[]
  return pages
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
