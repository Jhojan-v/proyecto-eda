import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FeaturedCarousel } from '../components/FeaturedCarousel'
import { Sidebar } from '../components/Sidebar'
import { useAuth } from '../context/AuthContext'
import { categoryTree, games } from '../data/games'
import { useGameHistory } from '../hooks/useGameHistory'

class Queue<T> {
  private items: T[] = []

  enqueue(item: T) {
    this.items.push(item)
  }

  dequeue() {
    return this.items.shift() ?? null
  }

  snapshot() {
    return [...this.items]
  }
}

export function HomePage() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const { history, latestVisited, removeLatestVisit } = useGameHistory()
  const [purchaseQueue] = useState(() => new Queue<string>())
  const [queuedGames, setQueuedGames] = useState<string[]>([])
  const [processingMessage, setProcessingMessage] = useState('La cola esta vacia por ahora.')

  const recentGames = useMemo(() => {
    const uniqueIds = [...new Set([...history].reverse())].slice(0, 4)
    return uniqueIds
      .map((id) => games.find((game) => game.id === id))
      .filter((game) => game !== undefined)
  }, [history])

  const handleOpenDetails = (gameId: string) => {
    navigate(`/game/${gameId}`)
  }

  const handlePurchase = (title: string) => {
    purchaseQueue.enqueue(title)
    setQueuedGames(purchaseQueue.snapshot())

    window.setTimeout(() => {
      const nextOrder = purchaseQueue.dequeue()
      setQueuedGames(purchaseQueue.snapshot())
      if (nextOrder) {
        setProcessingMessage(`Procesando pedido de ${nextOrder}`)
      }
    }, 400)
  }

  return (
    <main className="page-shell">
      <section className="hero-banner">
        <div className="hero-copy">
          <div className="pill-row">
            <span className="pill">Claves digitales</span>
            <span className="pill">Ofertas instantáneas</span>
            <span className="pill">Mundos deseados</span>
          </div>
          <div>
            <h1>i wish to game</h1>
            <p>
              Descubre ofertas neón, aventuras seleccionadas y tu próxima obsesión gamer en
              una sola vitrina.
            </p>
          </div>
          <div className="action-row">
            <Link className="soft-button" to={isAuthenticated ? '/dashboard' : '/login'}>
              {isAuthenticated ? 'Abrir dashboard' : 'Iniciar sesión'}
            </Link>
            <a className="ghost-button" href="#catalogo">
              Explorar catálogo
            </a>
          </div>
        </div>

        <div className="hero-stats">
          <article className="stat-card">
            <strong>4</strong>
            <span>ofertas destacadas rotando en vivo</span>
          </article>
          <article className="stat-card">
            <strong>24/7</strong>
            <span>acceso a tu panel y tus compras</span>
          </article>
          <article className="stat-card">
            <strong>Top</strong>
            <span>fantasía oscura, farming cozy y acción indie</span>
          </article>
          <article className="stat-card">
            <strong>Rápido</strong>
            <span>cola de compra con procesamiento instantáneo</span>
          </article>
        </div>
      </section>

      <div className="content-grid">
        <Sidebar tree={categoryTree} />

        <div className="main-column">
          <FeaturedCarousel items={games} onOpenDetails={handleOpenDetails} />

          <section id="catalogo" className="soft-card">
            <div className="section-header">
              <div>
                <h2>Catálogo</h2>
                <p className="muted">Juegos seleccionados para comprar al instante.</p>
              </div>
              <span className="status-chip">Cola activa</span>
            </div>

            <div className="queue-grid">
              <div className="catalog-grid">
                {games.map((game) => (
                  <article key={game.id} className="game-card glass-card">
                    <h3>{game.title}</h3>
                    <p>{game.description}</p>
                    <div className="game-tags">
                      {game.tags.map((tag) => (
                        <span key={tag} className="tag">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="detail-actions" style={{ marginTop: '16px' }}>
                      <button className="soft-button" onClick={() => handlePurchase(game.title)}>
                        Comprar
                      </button>
                      <button
                        className="ghost-button"
                        onClick={() => handleOpenDetails(game.id)}
                      >
                        Detalle
                      </button>
                    </div>
                  </article>
                ))}
              </div>

              <aside className="queue-card glass-card">
                <h3>Cola de compras</h3>
                <p>{processingMessage}</p>
                <ul className="queue-list">
                  {queuedGames.length > 0 ? (
                    queuedGames.map((item, index) => (
                    <li key={`${item}-${index}`}>
                      <span>{item}</span>
                        <span className="muted">Turno {index + 1}</span>
                      </li>
                    ))
                  ) : (
                    <li>
                      <span>No hay pedidos pendientes</span>
                      <span className="muted">Lista</span>
                    </li>
                  )}
                </ul>
              </aside>
            </div>
          </section>

          <section className="soft-card">
            <div className="section-header">
              <div>
                <h2>Vistos recientemente</h2>
                <p className="muted">Vuelve rápidamente a los juegos que revisaste hace poco.</p>
              </div>
              <div className="recent-row">
                <span className="status-chip">
                  Último: {latestVisited ?? 'sin registros'}
                </span>
                <button className="ghost-button" onClick={() => removeLatestVisit()}>
                  Quitar último
                </button>
              </div>
            </div>

            <div className="recent-grid">
              {recentGames.length > 0 ? (
                recentGames.map((game) => (
                  <article key={game.id} className="recent-card glass-card">
                    <h3>{game.title}</h3>
                    <p className="tiny muted">ID del juego: {game.id}</p>
                    <button className="link-button" onClick={() => handleOpenDetails(game.id)}>
                      Abrir detalle
                    </button>
                  </article>
                ))
              ) : (
                <article className="recent-card glass-card">
                  <h3>No hay visitas recientes</h3>
                  <p>Explora el catálogo y aquí aparecerán tus últimas vistas.</p>
                </article>
              )}
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
