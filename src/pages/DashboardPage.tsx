import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function DashboardPage() {
  const { userEmail, logout } = useAuth()

  return (
    <main className="dashboard-layout">
      <section className="dashboard-card soft-card">
        <h2>Tu dashboard</h2>
        <p>Gestiona tu sesión, vuelve a la tienda y mantén tu cuenta activa.</p>
        <p className="muted">Correo actual: {userEmail}</p>
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
  )
}
