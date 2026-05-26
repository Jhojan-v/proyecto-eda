/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { loadUserCart, saveUserCart } from '../firebase/cartStore'
import { createOrder } from '../firebase/ordersStore'
import type { CartItem, Game, PurchaseOrder } from '../types'
import { useAuth } from './AuthContext'

class PurchaseQueue<T> {
  private items: T[]

  constructor(initialItems: T[] = []) {
    this.items = initialItems
  }

  enqueue(item: T) {
    this.items.push(item)
  }

  dequeue() {
    return this.items.shift() ?? null
  }
}

type CartContextValue = {
  cartItems: CartItem[]
  totalItems: number
  totalPrice: number
  loading: boolean
  checkoutLoading: boolean
  checkoutMessage: string
  addToCart: (game: Game) => Promise<void>
  removeFromCart: (gameId: string) => Promise<void>
  clearCart: () => Promise<void>
  updateQuantity: (gameId: string, quantity: number) => Promise<void>
  checkout: () => Promise<PurchaseOrder | null>
}

const CartContext = createContext<CartContextValue | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const { userUid } = useAuth()
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  const [checkoutLoading, setCheckoutLoading] = useState(false)
  const [checkoutMessage, setCheckoutMessage] = useState('Carrito listo para comprar.')

  useEffect(() => {
    let cancelled = false

    const loadCart = async () => {
      if (!userUid) {
        setCartItems([])
        setLoading(false)
        setCheckoutMessage('Inicia sesion para guardar tu carrito.')
        return
      }

      setLoading(true)

      try {
        const storedItems = await loadUserCart(userUid)
        if (!cancelled) {
          setCartItems(storedItems)
          setCheckoutMessage(
            storedItems.length > 0
              ? 'Tu carrito fue cargado correctamente.'
              : 'Tu carrito esta listo para comprar.',
          )
        }
      } catch {
        if (!cancelled) {
          setCartItems([])
          setCheckoutMessage('No se pudo cargar el carrito del usuario.')
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    void loadCart()

    return () => {
      cancelled = true
    }
  }, [userUid])

  const persistCart = useCallback(
    async (nextItems: CartItem[]) => {
      setCartItems(nextItems)

      if (!userUid) {
        return
      }

      await saveUserCart(userUid, nextItems)
    },
    [userUid],
  )

  const addToCart = useCallback(
    async (game: Game) => {
      const nextItems = (() => {
        const existingItem = cartItems.find((item) => item.id === game.id)

        if (existingItem) {
          return cartItems.map((item) =>
            item.id === game.id ? { ...item, quantity: item.quantity + 1 } : item,
          )
        }

        return [...cartItems, { ...game, quantity: 1 }]
      })()

      await persistCart(nextItems)
      setCheckoutMessage(`${game.title} fue agregado al carrito.`)
    },
    [cartItems, persistCart],
  )

  const removeFromCart = useCallback(
    async (gameId: string) => {
      const nextItems = cartItems.filter((item) => item.id !== gameId)
      await persistCart(nextItems)
      setCheckoutMessage('Producto eliminado del carrito.')
    },
    [cartItems, persistCart],
  )

  const clearCart = useCallback(async () => {
    await persistCart([])
    setCheckoutMessage('El carrito fue vaciado.')
  }, [persistCart])

  const updateQuantity = useCallback(
    async (gameId: string, quantity: number) => {
      const safeQuantity = Math.max(1, quantity)
      const nextItems = cartItems.map((item) =>
        item.id === gameId ? { ...item, quantity: safeQuantity } : item,
      )

      await persistCart(nextItems)
      setCheckoutMessage('Cantidad actualizada.')
    },
    [cartItems, persistCart],
  )

  const checkout = useCallback(async () => {
    if (!userUid || cartItems.length === 0) {
      setCheckoutMessage('Necesitas iniciar sesion y tener productos en el carrito.')
      return null
    }

    setCheckoutLoading(true)
    const queue = new PurchaseQueue([...cartItems])

    try {
      let currentItem = queue.dequeue()
      while (currentItem) {
        setCheckoutMessage(`Procesando pedido de ${currentItem.title}...`)
        currentItem = queue.dequeue()
      }

      const order = await createOrder(userUid, cartItems)
      await persistCart([])
      setCheckoutMessage(`Compra registrada con ${order.totalItems} producto(s).`)
      return order
    } catch {
      setCheckoutMessage('No se pudo registrar la compra.')
      return null
    } finally {
      setCheckoutLoading(false)
    }
  }, [cartItems, persistCart, userUid])

  const value = useMemo(() => {
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0)
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

    return {
      cartItems,
      totalItems,
      totalPrice,
      loading,
      checkoutLoading,
      checkoutMessage,
      addToCart,
      removeFromCart,
      clearCart,
      updateQuantity,
      checkout,
    }
  }, [
    addToCart,
    cartItems,
    checkout,
    checkoutLoading,
    checkoutMessage,
    clearCart,
    loading,
    removeFromCart,
    updateQuantity,
  ])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart debe usarse dentro de CartProvider')
  }
  return context
}
