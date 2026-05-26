export type Game = {
  id: string
  title: string
  category: string
  description: string
  price: number
  discount: string
  tags: string[]
}

export type CartItem = Game & {
  quantity: number
}

export type PurchaseOrder = {
  id: string
  userId: string
  items: CartItem[]
  totalItems: number
  totalPrice: number
  status: 'pending' | 'processed'
  createdAt: string
}

export type CategoryNode = {
  title: string
  link: string
  children?: CategoryNode[]
}
