import {GoogleAuthProvider, getAuth} from 'firebase/auth';
import {initializeApp, getApps} from 'firebase/app';
import {getAnalytics, isSupported} from 'firebase/analytics';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

export const app = (() => {
  if (getApps().length === 0) return initializeApp(firebaseConfig);
  return getApps()[0];
})();

isSupported().then(res => (res ? getAnalytics(app) : null));

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
