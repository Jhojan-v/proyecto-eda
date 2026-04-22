export type Game = {
  id: string
  title: string
  category: string
  description: string
  price: number
  discount: string
  tags: string[]
}

export type CategoryNode = {
  title: string
  link: string
  children?: CategoryNode[]
}
