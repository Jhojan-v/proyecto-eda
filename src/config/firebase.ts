import { initializeApp, getApps, getApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY2,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN2,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID2,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET2,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID2,
  appId: import.meta.env.VITE_FIREBASE_APP_ID2,
}

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig)

export const auth = getAuth(app)
export const db = getFirestore(app)
export default app