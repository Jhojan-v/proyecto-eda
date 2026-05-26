import {
  addDoc,
  collection,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
} from 'firebase/firestore'
import type { CartItem, PurchaseOrder } from '../types'
import { db } from './config'

const getLocalOrdersKey = (userId: string) => `iwtg-orders-${userId}`

function readLocalOrders(userId: string) {
  const raw = localStorage.getItem(getLocalOrdersKey(userId))
  return raw ? ((JSON.parse(raw) as PurchaseOrder[]) ?? []) : []
}

function writeLocalOrders(userId: string, orders: PurchaseOrder[]) {
  localStorage.setItem(getLocalOrdersKey(userId), JSON.stringify(orders))
}

export async function createOrder(userId: string, items: CartItem[]) {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + item.quantity * item.price, 0)

  const order: PurchaseOrder = {
    id: crypto.randomUUID(),
    userId,
    items,
    totalItems,
    totalPrice,
    status: 'processed',
    createdAt: new Date().toISOString(),
  }

  const currentOrders = readLocalOrders(userId)
  writeLocalOrders(userId, [order, ...currentOrders])

  if (db) {
    await addDoc(collection(db, 'users', userId, 'orders'), {
      userId,
      items,
      totalItems,
      totalPrice,
      status: 'processed',
      createdAt: serverTimestamp(),
    })
  }

  return order
}

export async function getUserOrders(userId: string) {
  const localOrders = readLocalOrders(userId)

  if (!db) {
    return localOrders
  }

  const snapshot = await getDocs(
    query(collection(db, 'users', userId, 'orders'), orderBy('createdAt', 'desc')),
  )

  if (snapshot.empty) {
    return localOrders
  }

  return snapshot.docs.map((document) => {
    const data = document.data()
    return {
      id: document.id,
      userId,
      items: (data.items as CartItem[]) ?? [],
      totalItems: Number(data.totalItems ?? 0),
      totalPrice: Number(data.totalPrice ?? 0),
      status: (data.status as 'pending' | 'processed') ?? 'processed',
      createdAt:
        typeof data.createdAt?.toDate === 'function'
          ? data.createdAt.toDate().toISOString()
          : localOrders.find((order) => order.id === document.id)?.createdAt ??
            new Date().toISOString(),
    } satisfies PurchaseOrder
  })
}
