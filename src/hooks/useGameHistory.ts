import { useCallback, useEffect, useState } from 'react'

const STORAGE_KEY = 'eneba-lite-history'

class Stack<T> {
  private items: T[]

  constructor(initialItems: T[] = []) {
    this.items = initialItems
  }

  push(item: T) {
    this.items.push(item)
  }

  pop() {
    return this.items.pop()
  }

  peek() {
    return this.items[this.items.length - 1] ?? null
  }

  toArray() {
    return [...this.items]
  }
}

export function useGameHistory() {
  const [stack] = useState(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    const initial = stored ? (JSON.parse(stored) as string[]) : []
    return new Stack(initial)
  })
  const [history, setHistory] = useState<string[]>(() => stack.toArray())

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(history))
  }, [history])

  const recordVisit = useCallback(
    (gameId: string) => {
      stack.push(gameId)
      setHistory(stack.toArray())
    },
    [stack],
  )

  const removeLatestVisit = useCallback(() => {
    const removed = stack.pop()
    setHistory(stack.toArray())
    return removed
  }, [stack])

  const latestVisited = stack.peek()

  return {
    history,
    latestVisited,
    recordVisit,
    removeLatestVisit,
  }
}
