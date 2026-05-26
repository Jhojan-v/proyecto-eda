import { useEffect, useRef, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { TopNav } from '../../components/TopNav/TopNav'
import { useCart } from '../../context/CartContext'
import { games } from '../../data/games'
import { useGameHistory } from '../../hooks/useGameHistory'
import styles from './GameDetailPage.module.scss'

export function GameDetailPage() {
  const { id } = useParams<{ id: string }>()
  const { addToCart } = useCart()
  const { recordVisit, latestVisited } = useGameHistory()
  const [cartMessage, setCartMessage] = useState('')

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
      <div className={styles.detailPage}>
        <TopNav
          onToggleSidebar={undefined}
          sidebarOpen={false}
          searchQuery=""
          onSearchChange={() => { }}
          maxPrice={100}
          onPriceChange={() => { }}
          selectedTag="Todos"
          onTagChange={() => { }}
          allTags={['Todos']}
          onlyWithDiscount={false}
          onDiscountToggle={() => { }}
        />
        <main className={styles.detailLayout}>
          <section className={styles.notFoundCard}>
            <h2>Licencia o Producto no encontrado</h2>
            <p className="muted">El identificador proporcionado no coincide con ningún registro del inventario.</p>
            <Link className="ghost-button" to="/">
              Volver a la Tienda
            </Link>
          </section>
        </main>
      </div>
    )
  }

  const handleAddToCart = async () => {
    await addToCart(game)
    setCartMessage(`${game.title} fue agregado a la cola del carrito con éxito.`)
  }

  return (
    <div className={styles.detailPage}>
      <TopNav
        onToggleSidebar={undefined}
        sidebarOpen={false}
        searchQuery=""
        onSearchChange={() => { }}
        maxPrice={100}
        onPriceChange={() => { }}
        selectedTag="Todos"
        onTagChange={() => { }}
        allTags={['Todos']}
        onlyWithDiscount={false}
        onDiscountToggle={() => { }}
      />

      <main className={styles.detailLayout}>
        <section className={styles.detailCard}>
          <div>
            <span className="status-chip" style={{ marginBottom: '12px', display: 'inline-block' }}>
              Especificaciones de Licencia
            </span>
            <h2>{game.title}</h2>
          </div>

          <p>{game.description}</p>

          <div className={styles.gameTags}>
            {game.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>

          <div className={styles.historyInfo}>
            <span>consultado recientemente: <strong>{latestVisited ?? game.id}</strong></span>
          </div>

          {cartMessage && (
            <div className="status-chip" style={{ background: 'rgba(46, 204, 113, 0.15)', color: '#2ecc71', border: '1px solid rgba(46, 204, 113, 0.3)' }}>
              {cartMessage}
            </div>
          )}

          <div className={styles.detailActions}>
            <Link className="ghost-button" to="/">
              ← Volver a la tienda
            </Link>
            <button
              className="soft-button"
              type="button"
              onClick={() => void handleAddToCart()}
            >
              Adquirir Licencia (${game.price.toFixed(2)})
            </button>
            <Link className="ghost-button" to="/history">
              Ver Historial
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}