/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth'
import { auth, isFirebaseConfigured } from '../firebase/config'
import { getUserProfile, saveUserProfile, type UserProfile } from '../firebase/userProfiles'
import { UserHashTable } from '../utils/userHashTable'

type AuthResult = {
  ok: boolean
  message: string
}

type AuthContextValue = {
  isAuthenticated: boolean
  loading: boolean
  userUid: string | null
  userEmail: string | null
  userName: string | null
  login: (email: string, password: string) => Promise<AuthResult>
  register: (email: string, password: string, name: string) => Promise<AuthResult>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

function getAuthErrorMessage(error: unknown) {
  const code = typeof error === 'object' && error && 'code' in error ? String(error.code) : ''

  if (code.includes('auth/invalid-credential')) {
    return 'Credenciales invalidas. Revisa el correo y la contrasena.'
  }

  if (code.includes('auth/email-already-in-use')) {
    return 'Ese correo ya esta registrado.'
  }

  if (code.includes('auth/weak-password')) {
    return 'La contrasena debe tener minimo 6 caracteres.'
  }

  if (code.includes('auth/invalid-email')) {
    return 'Ingresa un correo valido.'
  }

  return 'No se pudo completar la autenticacion. Intenta de nuevo.'
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [userUid, setUserUid] = useState<string | null>(null)
  const [userEmail, setUserEmail] = useState<string | null>(null)
  const [userName, setUserName] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [profileTable] = useState(() => new UserHashTable())

  useEffect(() => {
    if (!auth) {
      setLoading(false)
      return undefined
    }

    return onAuthStateChanged(auth, async (firebaseUser) => {
      setLoading(true)

      if (!firebaseUser?.email) {
        setUserUid(null)
        setUserEmail(null)
        setUserName(null)
        setLoading(false)
        return
      }

      const fallbackProfile: UserProfile = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        name: firebaseUser.displayName || 'Usuario',
        role: 'customer',
      }
      let profile = fallbackProfile

      try {
        profile = (await getUserProfile(firebaseUser.uid)) ?? fallbackProfile
      } catch {
        profile = fallbackProfile
      }

      profileTable.set(profile)
      setUserUid(firebaseUser.uid)
      setUserEmail(profile.email)
      setUserName(profile.name)
      setLoading(false)
    })
  }, [profileTable])

  const login = useCallback(
    async (email: string, password: string) => {
      if (!isFirebaseConfigured || !auth) {
        return {
          ok: false,
          message: 'Configura Firebase en el archivo .env antes de iniciar sesion.',
        }
      }

      try {
        const cleanEmail = email.trim().toLowerCase()
        await signInWithEmailAndPassword(auth, cleanEmail, password)
        const cachedProfile = profileTable.get(cleanEmail)

        if (cachedProfile) {
          setUserName(cachedProfile.name)
        }

        return { ok: true, message: 'Inicio de sesion exitoso.' }
      } catch (error) {
        return { ok: false, message: getAuthErrorMessage(error) }
      }
    },
    [profileTable],
  )

  const register = useCallback(
    async (email: string, password: string, name: string) => {
      if (!isFirebaseConfigured || !auth) {
        return {
          ok: false,
          message: 'Configura Firebase en el archivo .env antes de registrar usuarios.',
        }
      }

      const cleanEmail = email.trim().toLowerCase()
      const cleanName = name.trim() || 'Nuevo usuario'

      if (!cleanEmail || !password) {
        return { ok: false, message: 'Completa correo y contrasena.' }
      }

      try {
        const credentials = await createUserWithEmailAndPassword(auth, cleanEmail, password)
        await updateProfile(credentials.user, { displayName: cleanName })

        const profile: UserProfile = {
          uid: credentials.user.uid,
          email: cleanEmail,
          name: cleanName,
          role: 'customer',
        }

        await saveUserProfile(profile)
        profileTable.set(profile)
        setUserEmail(cleanEmail)
        setUserName(cleanName)

        return { ok: true, message: 'Registro exitoso.' }
      } catch (error) {
        return { ok: false, message: getAuthErrorMessage(error) }
      }
    },
    [profileTable],
  )

  const logout = useCallback(async () => {
    if (auth) {
      await signOut(auth)
    }

    setUserUid(null)
    setUserEmail(null)
    setUserName(null)
  }, [])

  const value = useMemo(
    () => ({
      isAuthenticated: Boolean(userEmail),
      loading,
      userUid,
      userEmail,
      userName,
      login,
      register,
      logout,
    }),
    [loading, login, logout, register, userEmail, userName, userUid],
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
