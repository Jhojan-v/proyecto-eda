class TrieNode {

  children: Map<string, TrieNode>
  isEndOfWord: boolean
  gameId: string | null

  constructor() {
    this.children = new Map()
    this.isEndOfWord = false
    this.gameId = null
  }
}

export class GameTrie {
  private root: TrieNode

  constructor() {
    this.root = new TrieNode()
  }

  insert(title: string, gameId: string): void {
    let currentNode = this.root

    const normalizedTitle = title.toLowerCase().trim()

    for (const char of normalizedTitle) {
      if (!currentNode.children.has(char)) {
        currentNode.children.set(char, new TrieNode())
      }
      currentNode = currentNode.children.get(char)!
    }
    
    currentNode.isEndOfWord = true
    currentNode.gameId = gameId
  }

  searchPrefix(prefix: string): { title: string; gameId: string }[] {
    let currentNode = this.root
    const normalizedPrefix = prefix.toLowerCase().trim()
    const results: { title: string; gameId: string }[] = []

    for (const char of normalizedPrefix) {
      if (!currentNode.children.has(char)) {
        return [] // No hay coincidencias
      }
      currentNode = currentNode.children.get(char)!
    }

    this.collectWords(currentNode, prefix.trim(), results)
    return results
  }

  private collectWords(
    node: TrieNode,
    currentWord: string,
    results: { title: string; gameId: string }[]
  ): void {
    if (node.isEndOfWord && node.gameId) {
      results.push({ title: currentWord, gameId: node.gameId })
    }

    for (const [char, childNode] of node.children.entries()) {
      // Reconstruimos el título original aproximado (o acumulado)
      this.collectWords(childNode, currentWord + char, results)
    }
  }

  buildTrieFromGames(games: { title: string; id: string }[]): void {
    games.forEach((game) => this.insert(game.title, game.id))
  }
}