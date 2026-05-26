import type { Game } from '../types'

export class GameGraph {

  private adjacencyList: Map<string, string[]>

  constructor() {
    this.adjacencyList = new Map()
  }

  addGame(gameId: string): void {
    if (!this.adjacencyList.has(gameId)) {
      this.adjacencyList.set(gameId, [])
    }
  }

  addEdge(gameId1: string, gameId2: string): void {
    if (gameId1 === gameId2) return

    const neighbors1 = this.adjacencyList.get(gameId1)
    const neighbors2 = this.adjacencyList.get(gameId2)

    if (neighbors1 && !neighbors1.includes(gameId2)) {
      neighbors1.push(gameId2)
    }
    if (neighbors2 && !neighbors2.includes(gameId1)) {
      neighbors2.push(gameId1)
    }
  }

  getRecommendations(gameId: string): string[] {
    return this.adjacencyList.get(gameId) ?? []
  }

  buildGraphFromGames(games: Game[]): void {
    // Registrar los juegos como vértices
    games.forEach((game) => this.addGame(game.id))

    // Comparar juegos en pares
    for (let i = 0; i < games.length; i++) {
      for (let j = i + 1; j < games.length; j++) {
        const game1 = games[i]
        const game2 = games[j]

        // Verificar si tienen al menos un tag en común
        const hasCommonTag = game1.tags.some((tag) => game2.tags.includes(tag))

        if (hasCommonTag) {
          this.addEdge(game1.id, game2.id)
        }
      }
    }
  }
}