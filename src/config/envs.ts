const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME
const FIREBASE_PROJECT_ID = process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID
const FIREBASE_REST_BASE_URL = `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/databases/(default)`
const COOKIES_CONSENT_KEY = `${APP_NAME}CookiesConsent`

export {APP_NAME, FIREBASE_REST_BASE_URL, COOKIES_CONSENT_KEY}
