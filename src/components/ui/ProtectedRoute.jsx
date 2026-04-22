import { Navigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'

/**
 * ProtectedRoute — wraps routes that require authentication.
 * Redirects to /login if the user is not logged in.
 */
export default function ProtectedRoute({ children }) {
  const { user } = useAuth()
  return user ? children : <Navigate to="/login" replace />
}
