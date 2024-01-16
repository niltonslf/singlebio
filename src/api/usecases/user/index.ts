import {parse} from 'firestore-document-parser'

import {FIREBASE_REST_BASE_URL} from '@/config/envs'
import {User} from '@/models'

export const fetchUserProfile = async (username: string) => {
  const path = `${FIREBASE_REST_BASE_URL}/documents:runQuery`

  const query = {
    structuredQuery: {
      from: [{collectionId: 'users'}],
      where: {
        fieldFilter: {
          field: {fieldPath: 'username'},
          op: 'EQUAL',
          value: {stringValue: username},
        },
      },
    },
  }

  const res = await fetch(path, {
    method: 'post',
    body: JSON.stringify(query),
    next: {tags: ['user-profile-data']},
    cache: 'no-store',
  })

  if (!res.ok) {
    throw new Error('Failed to fetch user')
  }

  const data = await res.json()

  const userRes = parse(data?.[0]?.document)

  if (!data?.[0]?.document) return null

  return userRes.fields as User
}

export const fetchUserLinks = async (uid: string) => {
  const path = `${FIREBASE_REST_BASE_URL}/documents/users/${uid}/links`

  const res = await fetch(path, {
    cache: 'no-store',
    next: {tags: ['user-links-data']},
  })

  if (!res.ok) {
    throw new Error('Failed to fetch user links')
  }
  const data = await res.json()

  if (!data?.documents) return []

  const linksRes = data?.documents?.map((linkData: any) =>
    parse(linkData.fields),
  )

  return linksRes
}

export const fetchAllUsernames = async (): Promise<{username: string}[]> => {
  const path = `${FIREBASE_REST_BASE_URL}/documents/users?mask.fieldPaths=username`

  const res = await fetch(path)

  if (!res.ok) throw new Error('failed to fetch users usernames')

  const data = await res.json()

  if (!data.documents.length) return []

  const parsedData = data?.documents?.map((user: any) => parse(user.fields))

  return parsedData
}
