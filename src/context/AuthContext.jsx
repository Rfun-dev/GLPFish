import { createContext, useContext, useState, useCallback } from 'react'

/**
 * AuthContext
 * Provides authentication state and actions across the app.
 * Replace the mock logic here with real API calls when the backend is ready.
 */

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(() => {
    // Persist session across page refresh
    const stored = localStorage.getItem('fishqc_user')
    return stored ? JSON.parse(stored) : null
  })
  const [loading, setLoading] = useState(false)
  const [error, setError]     = useState(null)

  /** Login — swap this mock with a real API call */
  const login = useCallback(async ({ email, password }) => {
    setLoading(true)
    setError(null)
    try {
      // TODO: replace with real API call e.g. await api.post('/auth/login', { email, password })
      await new Promise(r => setTimeout(r, 800)) // simulate network
      if (password.length < 6) throw new Error('Invalid credentials')
      const userData = { id: 1, name: email.split('@')[0], email, role: 'inspector' }
      localStorage.setItem('fishqc_user', JSON.stringify(userData))
      setUser(userData)
      return { success: true }
    } catch (err) {
      setError(err.message)
      return { success: false, message: err.message }
    } finally {
      setLoading(false)
    }
  }, [])

  /** Register — swap this mock with a real API call */
  const register = useCallback(async ({ name, email, password }) => {
    setLoading(true)
    setError(null)
    try {
      // TODO: replace with real API call e.g. await api.post('/auth/register', { name, email, password })
      await new Promise(r => setTimeout(r, 800)) // simulate network
      if (password.length < 6) throw new Error('Password must be at least 6 characters')
      const userData = { id: Date.now(), name, email, role: 'inspector' }
      localStorage.setItem('fishqc_user', JSON.stringify(userData))
      setUser(userData)
      return { success: true }
    } catch (err) {
      setError(err.message)
      return { success: false, message: err.message }
    } finally {
      setLoading(false)
    }
  }, [])

  /** Logout */
  const logout = useCallback(() => {
    localStorage.removeItem('fishqc_user')
    setUser(null)
  }, [])

  /** Clear any lingering error */
  const clearError = useCallback(() => setError(null), [])

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout, clearError }}>
      {children}
    </AuthContext.Provider>
  )
}

/** Hook: useAuth — consume auth context anywhere */
export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within <AuthProvider>')
  return ctx
}
