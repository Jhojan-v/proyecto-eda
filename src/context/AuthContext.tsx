import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

type AuthContextValue = {
  isAuthenticated: boolean
  userEmail: string | null
  login: (email: string, password: string) => boolean
  logout: () => void
}

const AUTH_STORAGE_KEY = 'eneba-lite-auth'

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [userEmail, setUserEmail] = useState<string | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY)
    if (stored) {
      setUserEmail(stored)
    }
  }, [])

  const login = (email: string, password: string) => {
    const isValid = email === 'user@mail.com' && password === '123'
    if (isValid) {
      setUserEmail(email)
      localStorage.setItem(AUTH_STORAGE_KEY, email)
    }
    return isValid
  }

  const logout = () => {
    setUserEmail(null)
    localStorage.removeItem(AUTH_STORAGE_KEY)
  }

  const value = useMemo(
    () => ({
      isAuthenticated: Boolean(userEmail),
      userEmail,
      login,
      logout,
    }),
    [userEmail],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe usarse dentro de AuthProvider')
  }
  return context
}
