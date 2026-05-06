/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

type UserRecord = {
  email: string
  password: string
  name: string
}

type RegisterResult = {
  ok: boolean
  message: string
}

type AuthContextValue = {
  isAuthenticated: boolean
  userEmail: string | null
  login: (email: string, password: string) => boolean
  register: (email: string, password: string, name: string) => RegisterResult
  logout: () => void
}

const AUTH_STORAGE_KEY = 'eneba-lite-auth'
const USERS_STORAGE_KEY = 'i-wish-to-game-users'

class UserHashTable {
  private buckets: UserRecord[][]

  constructor(initialUsers: UserRecord[] = [], size = 23) {
    this.buckets = Array.from({ length: size }, () => [])
    initialUsers.forEach((user) => this.set(user))
  }

  private hash(email: string) {
    return [...email.toLowerCase()].reduce(
      (total, char) => (total * 31 + char.charCodeAt(0)) % this.buckets.length,
      0,
    )
  }

  set(user: UserRecord) {
    const index = this.hash(user.email)
    const normalizedEmail = user.email.toLowerCase()
    const existingIndex = this.buckets[index].findIndex(
      (item) => item.email.toLowerCase() === normalizedEmail,
    )

    if (existingIndex >= 0) {
      this.buckets[index][existingIndex] = user
      return
    }

    this.buckets[index].push(user)
  }

  get(email: string) {
    const index = this.hash(email)
    return (
      this.buckets[index].find((user) => user.email.toLowerCase() === email.toLowerCase()) ?? null
    )
  }

  has(email: string) {
    return Boolean(this.get(email))
  }

  toArray() {
    return this.buckets.flat()
  }
}

const demoUser: UserRecord = {
  email: 'user@mail.com',
  password: '123',
  name: 'Usuario demo',
}

function loadUsers() {
  const stored = localStorage.getItem(USERS_STORAGE_KEY)
  const storedUsers = stored ? (JSON.parse(stored) as UserRecord[]) : []
  const table = new UserHashTable([demoUser, ...storedUsers])
  return table.toArray()
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [userEmail, setUserEmail] = useState<string | null>(() => {
    const stored = localStorage.getItem(AUTH_STORAGE_KEY)
    return stored || null
  })
  const [users, setUsers] = useState<UserRecord[]>(loadUsers)

  const login = useCallback((email: string, password: string) => {
    const userTable = new UserHashTable(users)
    const user = userTable.get(email)
    const isValid = user?.password === password

    if (isValid) {
      setUserEmail(user.email)
      localStorage.setItem(AUTH_STORAGE_KEY, user.email)
    }

    return isValid
  }, [users])

  const register = useCallback((email: string, password: string, name: string) => {
    const cleanEmail = email.trim().toLowerCase()
    const cleanName = name.trim() || 'Nuevo usuario'

    if (!cleanEmail || !password) {
      return { ok: false, message: 'Completa correo y contrasena.' }
    }

    const userTable = new UserHashTable(users)
    if (userTable.has(cleanEmail)) {
      return { ok: false, message: 'Ese correo ya esta registrado.' }
    }

    userTable.set({ email: cleanEmail, password, name: cleanName })
    const nextUsers = userTable.toArray()
    setUsers(nextUsers)
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(nextUsers))
    setUserEmail(cleanEmail)
    localStorage.setItem(AUTH_STORAGE_KEY, cleanEmail)

    return { ok: true, message: 'Registro exitoso.' }
  }, [users])

  const logout = useCallback(() => {
    setUserEmail(null)
    localStorage.removeItem(AUTH_STORAGE_KEY)
  }, [])

  const value = useMemo(
    () => ({
      isAuthenticated: Boolean(userEmail),
      userEmail,
      login,
      register,
      logout,
    }),
    [login, logout, register, userEmail],
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
