import { useEffect, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { games } from '../data/games'
import { useGameHistory } from '../hooks/useGameHistory'

export function GameDetailPage() {
  const { id } = useParams()
  const { recordVisit, latestVisited } = useGameHistory()
  const game = games.find((item) => item.id === id)
  const lastRecordedId = useRef<string | null>(null)

  useEffect(() => {
    if (game && lastRecordedId.current !== game.id) {
      recordVisit(game.id)
      lastRecordedId.current = game.id
    }
  }, [game, recordVisit])

  if (!game) {
    return (
      <main className="detail-layout">
        <section className="detail-card soft-card">
          <h2>Juego no encontrado</h2>
          <Link className="ghost-button" to="/">
            Volver
          </Link>
        </section>
      </main>
    )
  }

  return (
    <main className="detail-layout">
      <section className="detail-card soft-card">
        <h2>{game.title}</h2>
        <p>{game.description}</p>
        <div className="game-tags">
          {game.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>
        <p style={{ marginTop: '18px' }}>Código visto más recientemente: {latestVisited ?? game.id}</p>
        <div className="detail-actions" style={{ marginTop: '18px' }}>
          <Link className="ghost-button" to="/">
            Volver a la tienda
          </Link>
          <Link className="soft-button" to="/dashboard">
            Abrir dashboard
          </Link>
        </div>
      </section>
    </main>
  )
}
