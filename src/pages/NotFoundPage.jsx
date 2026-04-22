import { Link } from 'react-router-dom'

/**
 * NotFoundPage — shown for any unknown route.
 */
export default function NotFoundPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-ocean-950">
      <p className="text-6xl font-bold font-mono text-ocean-700 mb-4">404</p>
      <h1 className="text-xl font-semibold text-fish-silver mb-2">Page not found</h1>
      <p className="text-ocean-400 text-sm mb-8">This route doesn't exist yet.</p>
      <Link to="/dashboard" className="btn-primary w-auto px-6">
        Go to Dashboard
      </Link>
    </div>
  )
}
