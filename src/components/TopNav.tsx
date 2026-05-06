import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'

export function TopNav({
  onToggleSidebar,
  sidebarOpen,
}: {
  onToggleSidebar?: () => void
  sidebarOpen?: boolean
}) {
  const navigate = useNavigate()
  const { isAuthenticated, logout, userEmail } = useAuth()
  const { totalItems, totalPrice } = useCart()

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <header className="top-nav">
      <div className="brand-group">
        {onToggleSidebar ? (
          <button
            className="icon-button"
            type="button"
            onClick={onToggleSidebar}
            aria-label={sidebarOpen ? 'Cerrar menu lateral' : 'Abrir menu lateral'}
            title={sidebarOpen ? 'Cerrar menu lateral' : 'Abrir menu lateral'}
          >
            ☰
          </button>
        ) : null}
        <Link className="brand-mark" to="/">
          <img className="nav-brand-logo" src="/LogoPagina.png" alt="" />
          i wish to game
        </Link>
      </div>

      <nav className="top-menu" aria-label="Menu principal">
        <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
          Tienda
        </NavLink>
        <a className="nav-link" href="/#catalogo">
          Catalogo
        </a>
        <NavLink
          to="/dashboard"
          className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
        >
          Dashboard
        </NavLink>
      </nav>

      <div className="nav-actions">
        {isAuthenticated ? (
          <details className="user-menu">
            <summary>
              <span>{userEmail}</span>
              <strong>{totalItems}</strong>
            </summary>
            <div className="user-menu-panel">
              <p className="tiny muted">Sesion activa</p>
              <p>{userEmail}</p>
              <p className="tiny muted">
                Carrito: {totalItems} producto(s) · ${totalPrice.toFixed(2)}
              </p>
              <Link className="ghost-button compact-button" to="/dashboard">
                Ver dashboard
              </Link>
              <button className="soft-button compact-button" type="button" onClick={handleLogout}>
                Salir
              </button>
            </div>
          </details>
        ) : (
          <Link className="soft-button compact-button" to="/login">
            Entrar
          </Link>
        )}
      </div>
    </header>
  )
}
