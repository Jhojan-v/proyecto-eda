import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { TopNav } from '../../components/TopNav/TopNav'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'
import styles from './DashboardPage.module.scss'

const MAP_STATIONS = [
  { name: 'Almacén Central', x: 10, y: 75 },
  { name: 'Hub de Distribución Norte', x: 35, y: 40 },
  { name: 'Nodo de Conexión Local', x: 65, y: 60 },
  { name: 'Tu Domicilio', x: 90, y: 25 },
]

export function DashboardPage() {
  const { userEmail, userName, logout } = useAuth()
  const {
    cartItems,
    totalItems,
    totalPrice,
    removeFromCart,
    updateQuantity,
    checkout,
    checkoutLoading,
    checkoutMessage,
  } = useCart()

  const [isDeliveryActive, setIsDeliveryActive] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [deliveryProgress, setDeliveryProgress] = useState(0)

  useEffect(() => {
    let interval: number
    if (isDeliveryActive) {
      interval = window.setInterval(() => {
        setCurrentStep((prev) => {
          if (prev >= MAP_STATIONS.length - 1) {
            setIsDeliveryActive(false)
            return prev
          }
          return prev + 1
        })
      }, 4000)
    }
    return () => window.clearInterval(interval)
  }, [isDeliveryActive])

  useEffect(() => {
    setDeliveryProgress((currentStep / (MAP_STATIONS.length - 1)) * 100)
  }, [currentStep])

  const handleFinalizePurchase = async () => {
    const order = await checkout()
    if (order) {
      setCurrentStep(0)
      setIsDeliveryActive(true)
    }
  }

  return (
    <div className={styles.dashboardPage}>
      <TopNav />

      <main className={styles.dashboardLayout}>

        <section className={styles.dashboardCard}>
          <div className={styles.sectionHeader}>
            <div>
              <h2>Tu Dashboard Personal</h2>
              <p>Información del usuario, pasarela de pagos y rastreo satelital.</p>
            </div>
            <span className={styles.statusChip}>Sesión activa</span>
          </div>

          <div className={styles.dashboardGrid}>
            <article className={styles.infoPanel}>
              <h3>Perfil de Usuario</h3>
              <p style={{ margin: '5px 0', opacity: 0.8 }}>{userName ?? 'Cliente VIP'}</p>
              <strong>{userEmail}</strong>
              <p style={{ fontSize: '0.8rem', opacity: 0.5, marginTop: '10px' }}>
                Cuenta vinculada de forma segura a Firebase Auth.
              </p>
            </article>

            <article className={styles.infoPanel}>
              <h3>Resumen de Compra Pendiente</h3>
              <p style={{ opacity: 0.8 }}>Productos en cola: <strong>{totalItems}</strong></p>
              <p>Total Estimado: <strong style={{ color: '#2ecc71' }}>${totalPrice.toFixed(2)}</strong></p>
            </article>
          </div>
        </section>

       
        <section className={styles.dashboardCard}>
          <div className={styles.sectionHeader}>
            <div>
              <h3>Rastreo de Entrega de Licencias Físicas / Regalos</h3>
              <p>Visualización geolocalizada paso a paso del estado del envío en tiempo real por el Grafo urbano.</p>
            </div>
            {isDeliveryActive ? (
              <span className={`${styles.statusChip} ${styles.blinking}`} style={{ background: '#e74c3c', color: '#fff' }}>📡 En Ruta</span>
            ) : currentStep === MAP_STATIONS.length - 1 ? (
              <span className={styles.statusChip} style={{ background: '#2ecc71', color: '#fff' }}>✅ Entregado</span>
            ) : (
              <span className={styles.statusChip} style={{ opacity: 0.6 }}>💤 Esperando Pago</span>
            )}
          </div>

          <div className={styles.mapCanvas}>
           
            <svg style={{ position: 'absolute', width: '100%', height: '100%', pointerEvents: 'none' }}>
              <polyline
                points={MAP_STATIONS.map(s => `${s.x}%,${s.y}%`).join(' ')}
                style={{ fill: 'none', stroke: 'rgba(159, 99, 255, 0.25)', strokeWidth: 3, strokeDasharray: '6' }}
              />
            </svg>

            {MAP_STATIONS.map((station, index) => (
              <div
                key={station.name}
                className={styles.stationNode}
                style={{ left: `${station.x}%`, top: `${station.y}%` }}
              >
                <div 
                  className={styles.nodeDot}
                  style={{
                    background: index <= currentStep ? '#9f63ff' : '#2c1a3d',
                    border: index === currentStep ? '3px solid #fff' : '2px solid #9f63ff',
                    boxShadow: index === currentStep ? '0 0 14px #9f63ff' : 'none',
                  }}
                />
                <span className={styles.stationLabel}>{station.name}</span>
              </div>
            ))}

            <div 
              className={styles.deliveryRider}
              style={{ left: `${MAP_STATIONS[currentStep].x}%`, top: `${MAP_STATIONS[currentStep].y}%` }}
            >
              🛵
            </div>
          </div>

          <div className={styles.progressContainer}>
            <div className={styles.progressBar} style={{ width: `${deliveryProgress}%` }} />
          </div>
          <p style={{ marginTop: '12px', fontSize: '0.9rem', opacity: 0.7 }}>
            Ubicación actual del repartidor: <strong style={{ color: '#f3eaff' }}>{MAP_STATIONS[currentStep].name}</strong>
          </p>
        </section>

        <section className={styles.dashboardCard}>
          <h3>Productos en tu Cola de Procesamiento</h3>
          <ul className={styles.queueList}>
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <li key={item.id}>
                  <span>{item.title} (x{item.quantity})</span>
                  <span style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                    <button
                      className="ghost-button"
                      style={{ padding: '2px 8px', minWidth: 'auto' }}
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </button>
                    <strong>${(item.price * item.quantity).toFixed(2)}</strong>
                    <button
                      className="link-button"
                      style={{ color: '#e74c3c', background: 'none', border: 'none', cursor: 'pointer' }}
                      onClick={() => removeFromCart(item.id)}
                    >
                      Quitar
                    </button>
                  </span>
                </li>
              ))
            ) : (
              <li style={{ opacity: 0.5 }}>No tienes videojuegos en el carrito actualmente.</li>
            )}
          </ul>

          {checkoutMessage && (
            <p className={styles.statusChip} style={{ display: 'block', margin: '15px 0', textAlign: 'center' }}>
              {checkoutMessage}
            </p>
          )}

          <div className={styles.actionRow}>
            <button
              className={styles.btnSubmit}
              type="button"
              disabled={checkoutLoading || cartItems.length === 0}
              onClick={handleFinalizePurchase}
            >
              {checkoutLoading ? 'Procesando Transacción...' : '🚀 Pagar y Despachar Pedido'}
            </button>
            <Link className="ghost-button" to="/" style={{ textAlign: 'center', lineHeight: '2.5' }}>
              Volver al Catálogo
            </Link>
            <button className="ghost-button" style={{ color: '#e74c3c' }} onClick={logout}>
              Cerrar Sesión
            </button>
          </div>
        </section>
      </main>
    </div>
  )
}