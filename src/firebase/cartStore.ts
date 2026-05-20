import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore'
import type { CartItem } from '../types'
import { db } from './config'

type CartPayload = {
  userId: string
  items: CartItem[]
  updatedAt?: unknown
}

const getLocalCartKey = (userId: string) => `iwtg-cart-${userId}`

export async function loadUserCart(userId: string) {
  const localCart = localStorage.getItem(getLocalCartKey(userId))
  const fallbackItems = localCart ? ((JSON.parse(localCart) as CartItem[]) ?? []) : []

  if (!db) {
    return fallbackItems
  }

  const snapshot = await getDoc(doc(db, 'carts', userId))
  if (!snapshot.exists()) {
    return fallbackItems
  }

  const data = snapshot.data() as CartPayload
  return data.items ?? fallbackItems
}

export async function saveUserCart(userId: string, items: CartItem[]) {
  localStorage.setItem(getLocalCartKey(userId), JSON.stringify(items))

  if (!db) {
    return
  }

  await setDoc(
    doc(db, 'carts', userId),
    {
      userId,
      items,
      updatedAt: serverTimestamp(),
    },
    { merge: true },
  )
}
