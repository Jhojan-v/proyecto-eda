import { Link } from 'react-router-dom'
import { TopNav } from '../components/TopNav'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'
import { formatCopCurrency } from '../utils/currency'

export function DashboardPage() {
  const { userEmail, userName, logout } = useAuth()
  const {
    cartItems,
    totalItems,
    totalPrice,
    removeFromCart,
    clearCart,
    updateQuantity,
    checkout,
    checkoutLoading,
    checkoutMessage,
    loading,
  } = useCart()

  return (
    <div className="dashboard-page">
      <TopNav />

      <main className="dashboard-layout">
        <section className="dashboard-card soft-card">
          <div className="section-header">
            <div>
              <h2>Tu dashboard</h2>
              <p>Informacion del usuario y resumen de compras.</p>
            </div>
            <span className="status-chip">Sesion activa</span>
          </div>

          <div className="dashboard-grid">
            <article className="info-panel glass-card">
              <h3>Usuario</h3>
              <p className="muted">{userName ?? 'Perfil conectado'}</p>
              <strong>{userEmail}</strong>
              <p className="tiny muted">Cuenta autenticada con Firebase.</p>
            </article>

            <article className="info-panel glass-card">
              <h3>Carrito</h3>
              <p className="muted">Productos agregados</p>
              <strong>{totalItems}</strong>
              <p className="tiny muted">Total estimado: {formatCopCurrency(totalPrice)}</p>
            </article>
          </div>

          <section className="cart-section">
            <div className="section-header">
              <div>
                <h3>Compras agregadas</h3>
                <p className="muted">
                  Los productos quedan guardados por usuario y listos para checkout.
                </p>
              </div>
              {cartItems.length > 0 && !loading ? (
                <button className="ghost-button" type="button" onClick={clearCart}>
                  Vaciar carrito
                </button>
              ) : null}
            </div>

            <p className="tiny muted">{checkoutMessage}</p>

            <ul className="queue-list">
              {loading ? (
                <li>
                  <span>Cargando carrito del usuario</span>
                  <span className="muted">Sync</span>
                </li>
              ) : cartItems.length > 0 ? (
                cartItems.map((item) => (
                  <li key={item.id}>
                    <span>
                      {item.title} <small className="muted">x{item.quantity}</small>
                    </span>
                    <span className="cart-line-actions">
                      <button
                        className="ghost-button compact-button"
                        type="button"
                        onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                      >
                        -
                      </button>
                      <span className="muted">{item.quantity}</span>
                      <button
                        className="ghost-button compact-button"
                        type="button"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </button>
                      {formatCopCurrency(item.price * item.quantity)}
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
                  <span className="muted">Vacio</span>
                </li>
              )}
            </ul>
          </section>

          <div className="auth-actions" style={{ marginTop: '18px' }}>
            <Link className="ghost-button" to="/history">
              Ver historial
            </Link>
            <button
              className="soft-button"
              type="button"
              disabled={checkoutLoading}
              onClick={checkout}
            >
              {checkoutLoading ? 'Procesando compra...' : 'Finalizar compra'}
            </button>
            <Link className="ghost-button" to="/">
              Volver a la tienda
            </Link>
            <button className="soft-button" onClick={logout}>
              Cerrar sesion
            </button>
          </div>
        </section>
      </main>
    </div>
  )
}
