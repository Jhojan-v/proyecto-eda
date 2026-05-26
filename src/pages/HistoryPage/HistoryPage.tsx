import { Link, useNavigate } from 'react-router-dom'
import { TopNav } from '../../components/TopNav/TopNav'
import { games } from '../../data/games'
import { useGameHistory } from '../../hooks/useGameHistory'
import styles from './HistoryPage.module.scss'

export function HistoryPage() {
  const navigate = useNavigate()
  const { history, latestVisited, removeLatestVisit } = useGameHistory()

  const recentGames = [...new Set([...history].reverse())]
    .map((id) => games.find((game) => game.id === id))
    .filter((game): game is typeof games[number] => game !== undefined)

  return (
    <div className={styles.historyPage}>
      <TopNav 
      onToggleSidebar={undefined} 
  sidebarOpen={false}
  searchQuery=""
  onSearchChange={() => {}}
  maxPrice={100}
  onPriceChange={() => {}}
  selectedTag="Todos"
  onTagChange={() => {}}
  allTags={['Todos']}
  onlyWithDiscount={false}
  onDiscountToggle={() => {}}
      />

      <main className={styles.historyLayout}>
        <section className={styles.historyCard}>
          <div className={styles.sectionHeader}>
            <div>
              <h2>Historial de Navegación</h2>
              <p>Visitas recientes.</p>
            </div>
            <span className="status-chip">
              Tope de la Pila: {latestVisited ?? 'vacío'}
            </span>
          </div>

          <div className={styles.stackActions}>
            <button 
              className="ghost-button" 
              type="button" 
              disabled={history.length === 0}
              onClick={() => removeLatestVisit()}
            >
              Quitar último
            </button>
            <Link className="soft-button" to="/">
              Volver a la tienda
            </Link>
          </div>

          <div className={styles.recentGrid}>
            {recentGames.length > 0 ? (
              recentGames.map((game) => (
                <article key={game.id} className={styles.recentCard}>
                  <h3>{game.title}</h3>
                  <p>ID: {game.id}</p>
                  <button
                    className="link-button"
                    type="button"
                    onClick={() => navigate(`/game/${game.id}`)}
                  >
                    Abrir detalles →
                  </button>
                </article>
              ))
            ) : (
              <article className={styles.recentCard} style={{ gridColumn: '1 / -1', alignItems: 'center', textAlign: 'center' }}>
                <h3>No hay registros en el Stack</h3>
                <p style={{ background: 'transparent' }}>
                  Explora el catálogo de licencias para apilar tus consultas en memoria.
                </p>
              </article>
            )}
          </div>
        </section>
      </main>
    </div>
  )
}