import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FeaturedCarousel } from '../components/FeaturedCarousel'
import { Sidebar } from '../components/Sidebar'
import { TopNav } from '../components/TopNav'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { categoryTree, games } from '../data/games'
import { useGameHistory } from '../hooks/useGameHistory'

export function HomePage() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const { addToCart, cartItems, totalItems, totalPrice } = useCart()
  const { history, latestVisited, removeLatestVisit } = useGameHistory()
  const [processingMessage, setProcessingMessage] = useState('El carrito está listo.')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('Todos')

  const filteredGames = useMemo(() => {
    if (selectedCategory === 'Todos') return games
    return games.filter((game) => game.category === selectedCategory)
  }, [selectedCategory])

  const recentGames = useMemo(() => {
    const uniqueIds = [...new Set([...history].reverse())].slice(0, 4)
    return uniqueIds
      .map((id) => games.find((game) => game.id === id))
      .filter((game) => game !== undefined)
  }, [history])

  const handleOpenDetails = (gameId: string) => {
    navigate(`/game/${gameId}`)
  }

  const handlePurchase = (gameId: string) => {
    const game = games.find((item) => item.id === gameId)
    if (!game) return

    addToCart(game)
    setProcessingMessage(`${game.title} fue agregado al carrito.`)
  }

  return (
    <div className={sidebarOpen ? 'store-layout sidebar-open' : 'store-layout sidebar-closed'}>
      <TopNav
        sidebarOpen={sidebarOpen}
        onToggleSidebar={() => setSidebarOpen((current) => !current)}
      />

      <div className="store-body">
        <Sidebar
          tree={categoryTree}
          selectedCategory={selectedCategory}
          totalGames={filteredGames.length}
          onSelectCategory={setSelectedCategory}
        />

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
                  una sola vitrina organizada.
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
                <strong>{games.length}</strong>
                <span>juegos en catálogo</span>
              </article>
              <article className="stat-card">
                <strong>{totalItems}</strong>
                <span>productos en carrito</span>
              </article>
              <article className="stat-card">
                <strong>{selectedCategory}</strong>
                <span>filtro activo</span>
              </article>
            </div>
          </section>

          <div className="main-column">
            <FeaturedCarousel items={filteredGames} onOpenDetails={handleOpenDetails} />

            <section id="catalogo" className="soft-card">
              <div className="section-header">
                <div>
                  <h2>Catálogo</h2>
                  <p className="muted">
                    Mostrando {filteredGames.length} juego(s) de {selectedCategory.toLowerCase()}.
                  </p>
                </div>
                <span className="status-chip">Filtro: {selectedCategory}</span>
              </div>

              <div className="queue-grid">
                <div className="catalog-grid">
                  {filteredGames.map((game) => (
                    <article key={game.id} className="game-card glass-card">
                      <div className="game-card-header">
                        <h3>{game.title}</h3>
                        <span className="tag">{game.category}</span>
                      </div>
                      <p>{game.description}</p>
                      <div className="game-tags">
                        {game.tags.map((tag) => (
                          <span key={tag} className="tag">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="detail-actions" style={{ marginTop: '16px' }}>
                        <button className="soft-button" onClick={() => handlePurchase(game.id)}>
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
                  <h3>Carrito</h3>
                  <p>{processingMessage}</p>
                  <p className="tiny muted">
                    {totalItems} producto(s) · Total ${totalPrice.toFixed(2)}
                  </p>
                  <ul className="queue-list">
                    {cartItems.length > 0 ? (
                      cartItems.map((item) => (
                        <li key={item.id}>
                          <span>{item.title}</span>
                          <span className="muted">x{item.quantity}</span>
                        </li>
                      ))
                    ) : (
                      <li>
                        <span>No hay productos agregados</span>
                        <span className="muted">Vacío</span>
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
                  <span className="status-chip">Último: {latestVisited ?? 'sin registros'}</span>
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
        </main>
      </div>
    </div>
  )
}
