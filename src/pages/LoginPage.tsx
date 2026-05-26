import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function LoginPage() {
  const navigate = useNavigate()
  const { login, register } = useAuth()
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)

    if (mode === 'register') {
      const result = await register(email, password, name)
      setIsSubmitting(false)

      if (!result.ok) {
        setError(result.message)
        return
      }

      navigate('/dashboard', { replace: true })
      return
    }

    const result = await login(email, password)
    setIsSubmitting(false)

    if (!result.ok) {
      setError(result.message)
      return
    }

    navigate('/dashboard', { replace: true })
  }

  return (
    <div className="login-page">
      <header className="login-topbar">
        <Link className="login-brand" to="/">
          <img className="login-brand-logo" src="/LogoPagina.png" alt="" />
          <span>i wish to game</span>
        </Link>

        <div className="login-top-actions">
          <span>Latam</span>
          <span>COP</span>
          <Link to="/">Tienda</Link>
        </div>
      </header>

      <main className="login-stage">
        <section className="login-hero-panel">
          <img className="login-showcase-logo" src="/LogoPagina.png" alt="I Wish To Game" />
          <div className="login-kicker">Marketplace gamer</div>
          <h1>Accede a tus compras digitales</h1>
          <p>
            Entra para revisar tu dashboard, administrar tu carrito y continuar explorando ofertas
            de juegos seleccionados.
          </p>

          <div className="login-benefits">
            <article>
              <strong>24/7</strong>
              <span>Acceso a tu cuenta</span>
            </article>
            <article>
              <strong>-40%</strong>
              <span>Ofertas destacadas</span>
            </article>
            <article>
              <strong>Demo</strong>
              <span>Compra simulada</span>
            </article>
          </div>
        </section>

        <section className="login-form-panel">
          <div className="auth-switch">
            <button
              className={mode === 'login' ? 'active' : ''}
              type="button"
              onClick={() => {
                setMode('login')
                setError('')
              }}
            >
              Iniciar sesion
            </button>
            <button
              className={mode === 'register' ? 'active' : ''}
              type="button"
              onClick={() => {
                setMode('register')
                setError('')
                setEmail('')
                setPassword('')
              }}
            >
              Registrarse
            </button>
          </div>

          <div>
            <h2>{mode === 'login' ? 'Iniciar sesion' : 'Crear cuenta'}</h2>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {mode === 'register' ? (
              <label className="field">
                Nombre
                <input
                  value={name}
                  autoComplete="name"
                  onChange={(event) => setName(event.target.value)}
                />
              </label>
            ) : null}

            <label className="field">
              Correo electronico
              <input
                type="email"
                value={email}
                autoComplete="email"
                onChange={(event) => setEmail(event.target.value)}
              />
            </label>

            <label className="field">
              Contrasena
              <input
                type="password"
                value={password}
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                onChange={(event) => setPassword(event.target.value)}
              />
            </label>

            {error ? <p className="form-error">{error}</p> : null}

            <button className="soft-button login-submit" type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Procesando...' : mode === 'login' ? 'Entrar' : 'Crear cuenta'}
            </button>
          </form>
        </section>
      </main>
    </div>
  )
}
