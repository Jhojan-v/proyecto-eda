import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function LoginPage() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState('user@mail.com')
  const [password, setPassword] = useState('123')
  const [error, setError] = useState('')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const ok = login(email, password)

    if (!ok) {
      setError('Credenciales invalidas. Usa user@mail.com / 123')
      return
    }

    navigate('/dashboard', { replace: true })
  }

  return (
    <main className="auth-layout">
      <section className="auth-card soft-card">
        <h2>Inicia sesión en i wish to game</h2>
        <p className="muted">
          Usa la cuenta de prueba para acceder a tu dashboard privado.
        </p>
        <form onSubmit={handleSubmit} className="page-shell" style={{ padding: '24px 0 0' }}>
          <label className="field">
            Email
            <input value={email} onChange={(event) => setEmail(event.target.value)} />
          </label>
          <label className="field">
            Contraseña
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </label>
          {error ? <p style={{ color: '#ff8bd1' }}>{error}</p> : null}
          <div className="auth-actions">
            <button className="soft-button" type="submit">
              Entrar
            </button>
            <Link className="ghost-button" to="/">
              Volver al inicio
            </Link>
          </div>
        </form>
      </section>
    </main>
  )
}
