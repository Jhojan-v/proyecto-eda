import { Link } from 'react-router-dom'
import { TopNav } from '../components/TopNav'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

export function DashboardPage() {
  const { userEmail, logout } = useAuth()
  const { cartItems, totalItems, totalPrice, removeFromCart, clearCart } = useCart()

  return (
    <div className="dashboard-page">
      <TopNav />

      <main className="dashboard-layout">
        <section className="dashboard-card soft-card">
          <div className="section-header">
            <div>
              <h2>Tu dashboard</h2>
              <p>Información del usuario y resumen de compras.</p>
            </div>
            <span className="status-chip">Sesión activa</span>
          </div>

          <div className="dashboard-grid">
            <article className="info-panel glass-card">
              <h3>Usuario</h3>
              <p className="muted">Correo actual</p>
              <strong>{userEmail}</strong>
              <p className="tiny muted">Cuenta de prueba conectada a la plataforma.</p>
            </article>

            <article className="info-panel glass-card">
              <h3>Carrito</h3>
              <p className="muted">Productos agregados</p>
              <strong>{totalItems}</strong>
              <p className="tiny muted">Total estimado: ${totalPrice.toFixed(2)}</p>
            </article>
          </div>

          <section className="cart-section">
            <div className="section-header">
              <div>
                <h3>Compras agregadas</h3>
                <p className="muted">Los productos quedan guardados en el carrito hasta quitarlos.</p>
              </div>
              {cartItems.length > 0 ? (
                <button className="ghost-button" type="button" onClick={clearCart}>
                  Vaciar carrito
                </button>
              ) : null}
            </div>

            <ul className="queue-list">
              {cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <li key={item.id}>
                    <span>
                      {item.title} <small className="muted">x{item.quantity}</small>
                    </span>
                    <span className="cart-line-actions">
                      ${Number(item.price * item.quantity).toFixed(2)}
                      <button
                        className="link-button"
                        type="button"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Quitar
                      </button>
                    </span>
                  </li>
                ))
              ) : (
                <li>
                  <span>No hay productos en el carrito</span>
                  <span className="muted">Vacío</span>
                </li>
              )}
            </ul>
          </section>

          <div className="auth-actions" style={{ marginTop: '18px' }}>
            <Link className="ghost-button" to="/">
              Volver a la tienda
            </Link>
            <button className="soft-button" onClick={logout}>
              Cerrar sesión
            </button>
          </div>
        </section>
      </main>
    </div>
  )
}
