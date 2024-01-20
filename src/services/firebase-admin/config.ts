import {getApps, initializeApp, cert} from 'firebase-admin/app'
import {initializeFirestore} from 'firebase-admin/firestore'

const firestoreCredential = JSON.parse(
  atob(process.env.FIRESTORE_CREDENTIALS || ''),
)

const initApp = () => {
  if (getApps().length) return getApps()[0]
  return initializeApp({
    credential: cert(firestoreCredential),
  })
}

export const firebaseAdmin = initApp()
export const firestoreAdmin = initializeFirestore(firebaseAdmin)
