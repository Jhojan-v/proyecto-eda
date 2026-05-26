import type { Dispatch, SetStateAction } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import { useCart } from '../../context/CartContext'
import styles from './TopNav.module.scss'

type TopNavProps = {
  onToggleSidebar?: () => void
  sidebarOpen?: boolean
  searchQuery: string
  onSearchChange: Dispatch<SetStateAction<string>>
  maxPrice: number
  onPriceChange: Dispatch<SetStateAction<number>>
  selectedTag: string
  onTagChange: Dispatch<SetStateAction<string>>
  allTags: string[]
  onlyWithDiscount: boolean
  onDiscountToggle: Dispatch<SetStateAction<boolean>>
}

export function TopNav({ 
  onToggleSidebar, 
  sidebarOpen,
  searchQuery,
  onSearchChange,
  maxPrice,
  onPriceChange,
  selectedTag,
  onTagChange,
  allTags,
  onlyWithDiscount,
  onDiscountToggle
}: TopNavProps) {
  const navigate = useNavigate()
  const { isAuthenticated, logout, userEmail, userName } = useAuth()
  const { totalItems, totalPrice } = useCart()

  const handleLogout = async () => {
    await logout()
    navigate('/')
  }

  return (
    <header className={styles.topNav}>
      <div className={styles.brandGroup}>
        {onToggleSidebar && (
          <button
            className="icon-button"
            type="button"
            onClick={onToggleSidebar}
            aria-label={sidebarOpen ? 'Cerrar panel lateral' : 'Abrir panel lateral'}
            title={sidebarOpen ? 'Cerrar panel lateral' : 'Abrir panel lateral'}
          >
            ☰
          </button>
        )}
        <Link className={styles.brandMark} to="/">
          <img src="/LogoPagina.png" alt="Logo de i wish to game" />
          <span>i wish to game</span>
        </Link>
      </div>

      <nav className={styles.topMenu} aria-label="Navegación principal">
        <NavLink
          to="/"
          className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
        >
          Tienda
        </NavLink>
        <NavLink
          to="/dashboard"
          className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/history"
          className={({ isActive }) => `${styles.navLink} ${isActive ? styles.active : ''}`}
        >
          Historial
        </NavLink>
      </nav>

      <div className={styles.filterBar}>
      
        <div className={styles.searchWrapper}>
          <input
            type="text"
            placeholder="Buscar licencia/Juego"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className={styles.searchInput}
          />
        </div>

        <div className={styles.selectWrapper}>
          <select 
            value={selectedTag} 
            onChange={(e) => onTagChange(e.target.value)}
            className={styles.selectInput}
          >
            {allTags.map((tag) => (
              <option key={tag} value={tag}>
                🏷️ {tag}
              </option>
            ))}
          </select>
        </div>

       
        <div className={styles.discountWrapper}>
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={onlyWithDiscount}
              onChange={(e) => onDiscountToggle(e.target.checked)}
              className={styles.checkboxInput}
            />
            <span>Ofertas</span>
          </label>
        </div>

        
        <div className={styles.priceWrapper}>
          <label htmlFor="top-nav-price">Max: <span>${maxPrice}</span></label>
          <input
            id="top-nav-price"
            type="range"
            min="0"
            max="100"
            step="5"
            value={maxPrice}
            onChange={(e) => onPriceChange(Number(e.target.value))}
            className={styles.rangeInput}
          />
        </div>
      </div>

      <div className={styles.navActions}>
        {isAuthenticated ? (
          <details className={styles.userMenu}>
            <summary>
              <span>{userName ?? userEmail}</span>
              <strong>{totalItems}</strong>
            </summary>
            <div className={styles.userMenuPanel}>
              <span className="status-chip" style={{ alignSelf: 'flex-start' }}>
                Sesión Activa
              </span>
              <p style={{ fontWeight: 'bold', marginTop: '4px' }}>{userEmail}</p>
              <p className="muted" style={{ fontSize: '0.8rem' }}>
                Cola: {totalItems} ítems · ${totalPrice.toFixed(2)}
              </p>
              
              <Link 
                className="ghost-button compact-button" 
                to="/dashboard"
                style={{ textDecoration: 'none', textAlign: 'center' }}
              >
                Ver Dashboard
              </Link>
              <button 
                className={`${styles.logoutButtonRed} compact-button`} 
                type="button" 
                onClick={() => void handleLogout()}
              >
                Cerrar Sesión
              </button>
            </div>
          </details>
        ) : (
          <Link className="soft-button compact-button" to="/login" style={{ textDecoration: 'none' }}>
            Iniciar Sesión
          </Link>
        )}
      </div>
    </header>
  )
}