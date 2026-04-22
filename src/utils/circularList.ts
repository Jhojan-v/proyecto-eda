import type { Game } from '../types'

type CircularNode = {
  game: Game
  next: CircularNode
  prev: CircularNode
}

export class CircularDoublyLinkedList {
  private head: CircularNode | null = null
  private current: CircularNode | null = null
  private size = 0

  constructor(items: Game[]) {
    items.forEach((item) => this.append(item))
  }

  append(game: Game) {
    const node = {} as CircularNode
    node.game = game

    if (!this.head) {
      node.next = node
      node.prev = node
      this.head = node
      this.current = node
      this.size = 1
      return
    }

    const tail = this.head.prev
    node.next = this.head
    node.prev = tail
    tail.next = node
    this.head.prev = node
    this.size += 1
  }

  getCurrent() {
    return this.current?.game ?? null
  }

  moveNext() {
    if (!this.current) return null
    this.current = this.current.next
    return this.current.game
  }

  movePrev() {
    if (!this.current) return null
    this.current = this.current.prev
    return this.current.game
  }

  length() {
    return this.size
  }
}
