import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '@/context/AuthContext'
import Logo from '@/components/ui/Logo'

/**
 * AppLayout — persistent shell for authenticated pages.
 * Contains the top nav bar and a bottom nav for mobile.
 * Add new nav items here as features grow.
 */
export default function AppLayout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="min-h-screen flex flex-col max-w-md mx-auto relative">
      {/* ── Top Bar ── */}
      <header className="sticky top-0 z-10 bg-ocean-950/90 backdrop-blur border-b border-ocean-800 px-4 py-3 flex items-center justify-between">
        <Logo size="sm" />
        <div className="flex items-center gap-3">
          <span className="text-xs text-ocean-400 font-mono">{user?.role}</span>
          <div className="w-7 h-7 rounded-full bg-ocean-700 flex items-center justify-center text-xs font-bold text-fish-silver uppercase">
            {user?.name?.[0]}
          </div>
        </div>
      </header>

      {/* ── Page Content ── */}
      <main className="flex-1 overflow-y-auto px-4 py-6">
        <Outlet />
      </main>

      {/* ── Bottom Nav (mobile-first) ── */}
      <nav className="sticky bottom-0 bg-ocean-950/95 backdrop-blur border-t border-ocean-800 px-2 py-2 flex justify-around">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex flex-col items-center gap-1 px-4 py-1 rounded-xl transition-colors ${
              isActive ? 'text-ocean-400' : 'text-ocean-500 hover:text-ocean-300'
            }`
          }
        >
          <HomeIcon />
          <span className="text-[10px] font-medium">Home</span>
        </NavLink>

        {/* TODO: Add more nav items as features are added */}
        {/* Example:
        <NavLink to="/scan" className={...}>
          <ScanIcon />
          <span>Scan</span>
        </NavLink>
        */}

        <button
          onClick={handleLogout}
          className="flex flex-col items-center gap-1 px-4 py-1 rounded-xl text-ocean-500 hover:text-fish-reject transition-colors"
        >
          <LogoutIcon />
          <span className="text-[10px] font-medium">Logout</span>
        </button>
      </nav>
    </div>
  )
}

/* ── Inline SVG icons (no extra deps) ── */
function HomeIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
    </svg>
  )
}
function LogoutIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/>
    </svg>
  )
}
