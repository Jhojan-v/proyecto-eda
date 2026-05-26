import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import { db } from './config'

export type UserProfile = {
  uid: string
  email: string
  name: string
  role: 'customer' | 'admin'
  createdAt?: unknown
  updatedAt?: unknown
}

export async function saveUserProfile(profile: Omit<UserProfile, 'createdAt' | 'updatedAt'>) {
  if (!db) {
    throw new Error('Firebase no esta configurado.')
  }

  await setDoc(
    doc(db, 'users', profile.uid),
    {
      ...profile,
      updatedAt: serverTimestamp(),
      createdAt: serverTimestamp(),
    },
    { merge: true },
  )
}

export async function getUserProfile(uid: string) {
  if (!db) {
    return null
  }

  const snapshot = await getDoc(doc(db, 'users', uid))
  return snapshot.exists() ? (snapshot.data() as UserProfile) : null
}
