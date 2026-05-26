import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'
import styles from './LoginPage.module.scss'

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
    <div className={styles.loginPage}>
      <main className={styles.loginLayout}>
        <section className={styles.authCard}>
          <div className={styles.authHeader}>
            <h2>{mode === 'login' ? 'Acceso de Usuario' : 'Crear Cuenta'}</h2>
            <p>Plataforma autorizada de licencias digitales</p>
          </div>

          <div className={styles.authSwitchRow}>
            <button
              className={mode === 'login' ? styles.active : ''}
              type="button"
              onClick={() => {
                setMode('login')
                setError('')
              }}
            >
              Iniciar Sesión
            </button>
            <button
              className={mode === 'register' ? styles.active : ''}
              type="button"
              onClick={() => {
                setMode('register')
                setError('')
              }}
            >
              Registrarse
            </button>
          </div>

          <form className={styles.authForm} onSubmit={handleSubmit}>
            {mode === 'register' && (
              <label className={styles.formField}>
                Nombre de usuario
                <input
                  type="text"
                  placeholder="Tu nombre completo"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  required
                />
              </label>
            )}

            <label className={styles.formField}>
              Correo Electrónico
              <input
                type="email"
                placeholder="ejemplo@correo.com"
                value={email}
                autoComplete="email"
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </label>

            <label className={styles.formField}>
              Contraseña
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </label>

            {mode === 'login' && (
              <div className={styles.formOptions}>
                <label>
                  <input type="checkbox" defaultChecked /> Recordarme
                </label>
                <button className="link-button" type="button" style={{ fontSize: '0.85rem' }}>
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
            )}

            {error ? <p className={styles.formError}>{error}</p> : null}

            <button className="soft-button" type="submit" disabled={isSubmitting} style={{ padding: '12px' }}>
              {isSubmitting ? 'Procesando...' : mode === 'login' ? 'Autenticar e Ingresar' : 'Dar de alta cuenta'}
            </button>
          </form>

          <div className={styles.demoBadge}>
            <span>Firebase Activo</span>
            <strong>Auth + Firestore Sandbox</strong>
            <small>Configurado mediante variables de entorno .env</small>
          </div>

          <div className={styles.divider}>o continúa con</div>

          <div className={styles.socialRow}>
            <button type="button">Google</button>
            <button type="button">Steam</button>
          </div>
        </section>
      </main>
    </div>
  )
}