import { useEffect, useMemo, useState } from 'react'
import type { Game } from '../../types'
import { CircularDoublyLinkedList } from '../../utils/circularList'
import styles from './FeaturedCarousel.module.scss'

type FeaturedCarouselProps = {
  items: Game[]
  onOpenDetails: (gameId: string) => void
}

export function FeaturedCarousel({ items, onOpenDetails }: FeaturedCarouselProps) {
 
  const list = useMemo(() => new CircularDoublyLinkedList(items), [items])
  const [activeGame, setActiveGame] = useState<Game | null>(() => list.getCurrent())
  const [rotation, setRotation] = useState(0)

  useEffect(() => {
    const interval = window.setInterval(() => {
      const nextGame = list.moveNext()
      setActiveGame(nextGame)
      setRotation((current) => (current + 1) % list.length())
    }, 4500)

    return () => window.clearInterval(interval)
  }, [list])

  if (!activeGame) return null

  return (
    <section className={styles.featuredCarousel}>
      <div className={styles.sectionHeader}>
        <div>
          <h2>Ofertas Destacadas</h2>
        </div>
        <span className="status-chip">Slot {rotation + 1}</span>
      </div>

      <div className={styles.carouselPanel}>
        <div>
          <div className={styles.pillRow}>
            <span className={styles.promoChip}>
              PROMOCIONES DESTACADAS
            </span>
            <span className={styles.categoryPill}>{activeGame.category}</span>
          </div>

          <h3>{activeGame.title}</h3>
          <p>{activeGame.description}</p>

          <div className={styles.carouselTags}>
            {activeGame.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>

          <div className={styles.carouselControls}>
            <button
              className="ghost-button"
              type="button"
              onClick={() => {
                setActiveGame(list.movePrev())
                setRotation((current) => (current - 1 + list.length()) % list.length())
              }}
            >
              Anterior
            </button>
            <button
              className="soft-button"
              type="button"
              onClick={() => {
                setActiveGame(list.moveNext())
                setRotation((current) => (current + 1) % list.length())
              }}
            >
              Siguiente
            </button>
            <button 
              className="link-button" 
              type="button"
              onClick={() => onOpenDetails(activeGame.id)}
            >
              Ver especificaciones
            </button>
          </div>
        </div>

        <div className={styles.priceBadge}>
          <span>Precio de Oferta</span>
          <strong>${activeGame.price.toFixed(2)}</strong>
          <small>{activeGame.discount} OFF</small>
        </div>
      </div>
    </section>
  )
}