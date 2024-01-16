import {getAnalytics, setAnalyticsCollectionEnabled} from 'firebase/analytics'
import {FirebaseOptions, initializeApp} from 'firebase/app'
import {GithubAuthProvider, GoogleAuthProvider, getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
import {getStorage} from 'firebase/storage'
import {getCookieConsentValue} from 'react-cookie-consent'

import {COOKIES_CONSENT_KEY} from '@/config/envs'

const firebaseConfig: FirebaseOptions = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

const hasCookiesConsent =
  !getCookieConsentValue(COOKIES_CONSENT_KEY) ||
  getCookieConsentValue(COOKIES_CONSENT_KEY) === 'true'

export const app = initializeApp(firebaseConfig)
app.automaticDataCollectionEnabled = hasCookiesConsent

const initializeAnalytics = () => {
  if (typeof window !== 'undefined') {
    return getAnalytics(app)
  }

  return null
}

export const analytics = initializeAnalytics()
if (analytics) setAnalyticsCollectionEnabled(analytics, hasCookiesConsent)

export const auth = getAuth(app)
export const storage = getStorage(app)
export const db = getFirestore(app)
export const googleProvider = new GoogleAuthProvider()
export const githubProvider = new GithubAuthProvider()
