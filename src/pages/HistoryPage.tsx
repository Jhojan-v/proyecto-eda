import { Link, useNavigate } from 'react-router-dom'
import { TopNav } from '../components/TopNav'
import { games } from '../data/games'
import { useGameHistory } from '../hooks/useGameHistory'

export function HistoryPage() {
  const navigate = useNavigate()
  const { history, latestVisited, removeLatestVisit } = useGameHistory()

  const recentGames = [...new Set([...history].reverse())]
    .map((id) => games.find((game) => game.id === id))
    .filter((game) => game !== undefined)

  return (
    <div className="dashboard-page">
      <TopNav />

      <main className="dashboard-layout">
        <section className="dashboard-card soft-card">
          <div className="section-header">
            <div>
              <h2>Historial</h2>
              <p>Consulta los juegos visitados recientemente desde la tienda.</p>
            </div>
            <span className="status-chip">Ultimo: {latestVisited ?? 'sin registros'}</span>
          </div>

          <div className="auth-actions" style={{ marginBottom: '18px' }}>
            <button className="ghost-button" type="button" onClick={() => removeLatestVisit()}>
              Quitar ultimo
            </button>
            <Link className="soft-button" to="/">
              Volver a la tienda
            </Link>
          </div>

          <div className="recent-grid">
            {recentGames.length > 0 ? (
              recentGames.map((game) => (
                <article key={game.id} className="recent-card glass-card">
                  <h3>{game.title}</h3>
                  <p className="tiny muted">ID del juego: {game.id}</p>
                  <button
                    className="link-button"
                    type="button"
                    onClick={() => navigate(`/game/${game.id}`)}
                  >
                    Abrir detalle
                  </button>
                </article>
              ))
            ) : (
              <article className="recent-card glass-card">
                <h3>No hay historial todavia</h3>
                <p>Explora el catalogo y aqui apareceran tus visitas mas recientes.</p>
              </article>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}
