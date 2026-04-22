import { useEffect, useMemo, useState } from 'react'
import type { Game } from '../types'
import { CircularDoublyLinkedList } from '../utils/circularList'

export function FeaturedCarousel({
  items,
  onOpenDetails,
}: {
  items: Game[]
  onOpenDetails: (gameId: string) => void
}) {
  const list = useMemo(() => new CircularDoublyLinkedList(items), [items])
  const [activeGame, setActiveGame] = useState<Game | null>(() => list.getCurrent())
  const [rotation, setRotation] = useState(0)

  useEffect(() => {
    setActiveGame(list.getCurrent())
    setRotation(0)
  }, [list])

  useEffect(() => {
    const interval = window.setInterval(() => {
      const nextGame = list.moveNext()
      setActiveGame(nextGame)
      setRotation((current) => (current + 1) % list.length())
    }, 3500)

    return () => window.clearInterval(interval)
  }, [list])

  if (!activeGame) return null

  return (
    <section className="featured-carousel soft-card">
      <div className="section-header">
        <div>
          <h2>Ofertas destacadas</h2>
          <p className="muted">Selecciones por tiempo limitado rotando en el foco principal.</p>
        </div>
        <span className="status-chip">Espacio {rotation + 1}</span>
      </div>

      <div className="carousel-panel">
        <div>
          <div className="pill-row">
            <span className="pill">Oferta {activeGame.discount}</span>
            <span className="pill">{activeGame.category}</span>
          </div>
          <h3>{activeGame.title}</h3>
          <p>{activeGame.description}</p>
          <div className="carousel-tags">
            {activeGame.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>
          <div className="carousel-controls" style={{ marginTop: '18px' }}>
            <button
              className="ghost-button"
              onClick={() => {
                setActiveGame(list.movePrev())
                setRotation((current) => (current - 1 + list.length()) % list.length())
              }}
            >
              Anterior
            </button>
            <button
              className="soft-button"
              onClick={() => {
                setActiveGame(list.moveNext())
                setRotation((current) => (current + 1) % list.length())
              }}
            >
              Siguiente
            </button>
            <button className="link-button" onClick={() => onOpenDetails(activeGame.id)}>
              Ver detalle
            </button>
          </div>
        </div>

        <div className="price-badge">
          <span>Precio actual</span>
          <strong>${activeGame.price.toFixed(2)}</strong>
          <small>{activeGame.discount} de descuento hoy</small>
        </div>
      </div>
    </section>
  )
}
