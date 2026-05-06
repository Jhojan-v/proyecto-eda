/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Game } from '../types'

export type CartItem = Game & {
  quantity: number
}

type CartContextValue = {
  cartItems: CartItem[]
  totalItems: number
  totalPrice: number
  addToCart: (game: Game) => void
  removeFromCart: (gameId: string) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextValue | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  const addToCart = (game: Game) => {
    setCartItems((currentItems) => {
      const existingItem = currentItems.find((item) => item.id === game.id)

      if (existingItem) {
        return currentItems.map((item) =>
          item.id === game.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
      }

      return [...currentItems, { ...game, quantity: 1 }]
    })
  }

  const removeFromCart = (gameId: string) => {
    setCartItems((currentItems) => currentItems.filter((item) => item.id !== gameId))
  }

  const clearCart = () => {
    setCartItems([])
  }

  const value = useMemo(() => {
    const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0)
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)

    return {
      cartItems,
      totalItems,
      totalPrice,
      addToCart,
      removeFromCart,
      clearCart,
    }
  }, [cartItems])

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart debe usarse dentro de CartProvider')
  }
  return context
}
