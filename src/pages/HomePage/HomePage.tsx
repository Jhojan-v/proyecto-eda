import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FeaturedCarousel } from '../../components/FeaturedCarousel/FeaturedCarousel'
import { Sidebar } from '../../components/Sidebar/Sidebar'
import { TopNav } from '../../components/TopNav/TopNav'
import { useCart } from '../../context/CartContext'
import { categoryTree, games } from '../../data/games'
import styles from './HomePage.module.scss'

export function HomePage() {
  const navigate = useNavigate()
  const { addToCart, cartItems, totalItems, totalPrice } = useCart()
  
  const [processingMessage, setProcessingMessage] = useState('Catálogo local cargado en memoria ($O(1)$).')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('Todos')

  const [searchQuery, setSearchQuery] = useState('')
  const [maxPrice, setMaxPrice] = useState<number>(100)
  const [selectedTag, setSelectedTag] = useState('Todos')
  const [onlyWithDiscount, setOnlyWithDiscount] = useState(false)

  const allTags = useMemo(() => {
    const tagsSet = new Set<string>()
    games.forEach((game) => game.tags?.forEach((tag) => tagsSet.add(tag)))
    return ['Todos', ...Array.from(tagsSet)]
  }, [])

  const filteredGames = useMemo(() => {
    return games.filter((game) => {
      const matchesCategory = selectedCategory === 'Todos' || game.category === selectedCategory
      const matchesSearch = 
        game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.description.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesPrice = game.price <= maxPrice
      const matchesTag = selectedTag === 'Todos' || (game.tags && game.tags.includes(selectedTag))
      const hasDiscountValue = game.discount !== 'Novedad' && game.discount !== '0%' && game.discount !== ''
      const matchesDiscount = !onlyWithDiscount || hasDiscountValue

      return matchesCategory && matchesSearch && matchesPrice && matchesTag && matchesDiscount
    })
  }, [selectedCategory, searchQuery, maxPrice, selectedTag, onlyWithDiscount])

  const handleOpenDetails = (gameId: string) => {
    navigate(`/game/${gameId}`)
  }

  const handlePurchase = async (gameId: string) => {
    const game = games.find((item) => item.id === gameId)
    if (!game) return

    await addToCart(game)
    setProcessingMessage(`${game.title} fue agregado a la cola del carrito.`)
  }

  return (
    <div className={styles.homePage}>
      <TopNav 
        onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
        sidebarOpen={sidebarOpen}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        maxPrice={maxPrice}
        onPriceChange={setMaxPrice}
        selectedTag={selectedTag}
        onTagChange={setSelectedTag}
        allTags={allTags}
        onlyWithDiscount={onlyWithDiscount}
        onDiscountToggle={setOnlyWithDiscount}
      />

      <main className={styles.storeLayout}>
        {games.length > 0 && (
          <FeaturedCarousel items={games.slice(0, 3)} onOpenDetails={handleOpenDetails} />
        )}

        <div className={styles.storeBody}>
          {sidebarOpen && (
            <Sidebar
              tree={categoryTree}
              selectedCategory={selectedCategory}
              totalGames={filteredGames.length}
              onSelectCategory={setSelectedCategory}
            />
          )}

          <div className={styles.mainContent}>
            <section className={styles.catalogSection}>
              <div style={{ marginBottom: '24px' }}>
                <h2>Catálogo de Software y Licencias</h2>
              </div>

              <div className={styles.catalogLayout}>
                <div className={styles.gamesGrid}>
                  {filteredGames.length > 0 ? (
                    filteredGames.map((game) => (
                      <article key={game.id} className={styles.gameCard}>
                        <div className={styles.cardHeader}>
                          <h3>{game.title}</h3>
                          <span className={styles.badgeDiscount}>{game.discount}</span>
                        </div>
                        <p className={styles.gameDescription}>{game.description}</p>
                        
                        <div className={styles.priceContainer}>
                          <span style={{ fontSize: '0.8rem', opacity: 0.5 }}>Licencia Digital</span>
                          <strong className={styles.price}>${game.price.toFixed(2)}</strong>
                        </div>

                        <div className={styles.cardActions}>
                          <button className="soft-button" type="button" onClick={() => void handlePurchase(game.id)}>
                            Comprar
                          </button>
                          <button className="ghost-button" type="button" onClick={() => handleOpenDetails(game.id)}>
                            Detalles
                          </button>
                        </div>
                      </article>
                    ))
                  ) : (
                    <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '40px', color: 'rgba(255,255,255,0.4)' }}>
                      No hay licencias que coincidan con los filtros aplicados.
                    </div>
                  )}
                </div>

                <aside className={styles.queueCard}>
                  <h3>Cola de Compra</h3>
                  <p style={{ fontSize: '0.85rem', margin: '4px 0', opacity: 0.7 }}>{processingMessage}</p>
                  <p style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#9f63ff' }}>
                    {totalItems} item(s) · Total ${totalPrice.toFixed(2)}
                  </p>
                  <ul className={styles.queueList}>
                    {cartItems.length > 0 ? (
                      cartItems.map((item) => (
                        <li key={item.id}>
                          <span>{item.title}</span>
                          <strong style={{ color: '#2ecc71' }}>x{item.quantity}</strong>
                        </li>
                      ))
                    ) : (
                      <li style={{ opacity: 0.4, textAlign: 'center', padding: '20px 0' }}>
                        Cola de solicitudes vacía.
                      </li>
                    )}
                  </ul>
                </aside>
              </div>
            </section>
          </div>

        </div>
      </main>
    </div>
  )
}