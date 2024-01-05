import {parse} from 'firestore-document-parser'

import {User} from '@/models'

const FIREBASE_API_URL = 'https://firestore.googleapis.com/v1'
const FIREBASE_PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
export const fetchUserProfile = async (username: string) => {
  const path = `${FIREBASE_API_URL}/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents:runQuery`

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
  })

  if (!res.ok) {
    throw new Error('Failed to fetch user')
  }

  const data = await res.json()

  const userRes = parse(data?.[0]?.document)

  return userRes.fields as User
}

export const fetchUserLinks = async (uid: string) => {
  const path = `${FIREBASE_API_URL}/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents/users/${uid}/links`

  const res = await fetch(path, {next: {tags: ['user-links-data']}})

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
