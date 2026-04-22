import { useAuth } from '@/context/AuthContext'

/**
 * DashboardPage — the main landing page after login.
 * This is a placeholder — add feature cards/widgets here as the app grows.
 */
export default function DashboardPage() {
  const { user } = useAuth()

  return (
    <div className="flex flex-col gap-6">
      {/* Greeting */}
      <div>
        <p className="text-ocean-400 text-xs uppercase tracking-widest mb-1">Good day,</p>
        <h1 className="text-2xl font-bold text-fish-silver capitalize">{user?.name}</h1>
        <p className="text-ocean-400 text-sm mt-1">Ready to inspect today's catch?</p>
      </div>

      {/* Status strip */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Inspected', value: '0', color: 'text-fish-fresh' },
          { label: 'Flagged',   value: '0', color: 'text-fish-warn'  },
          { label: 'Rejected',  value: '0', color: 'text-fish-reject' },
        ].map(({ label, value, color }) => (
          <div key={label} className="card px-3 py-4 flex flex-col items-center gap-1">
            <span className={`text-2xl font-bold font-mono ${color}`}>{value}</span>
            <span className="text-[10px] text-ocean-400 uppercase tracking-wide">{label}</span>
          </div>
        ))}
      </div>

      {/* Placeholder feature cards */}
      <div className="flex flex-col gap-3">
        <p className="text-ocean-500 text-xs uppercase tracking-widest">Features</p>

        <FeatureCard
          icon={<CameraIcon />}
          title="Scan Fish"
          description="Use your camera to run AI quality analysis on a batch."
          badge="Coming soon"
        />
        <FeatureCard
          icon={<ClipboardIcon />}
          title="Inspection History"
          description="Review all past quality control sessions."
          badge="Coming soon"
        />
        <FeatureCard
          icon={<ChartIcon />}
          title="Reports"
          description="Export quality data and grade summaries."
          badge="Coming soon"
        />
      </div>
    </div>
  )
}

function FeatureCard({ icon, title, description, badge }) {
  return (
    <div className="card px-4 py-4 flex items-start gap-4 opacity-70">
      <div className="mt-0.5 text-ocean-400 shrink-0">{icon}</div>
      <div className="flex-1">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-fish-silver">{title}</p>
          {badge && (
            <span className="text-[9px] font-mono uppercase tracking-widest bg-ocean-700 text-ocean-300 px-1.5 py-0.5 rounded">
              {badge}
            </span>
          )}
        </div>
        <p className="text-xs text-ocean-400 mt-0.5">{description}</p>
      </div>
    </div>
  )
}

function CameraIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/>
      <circle cx="12" cy="13" r="4"/>
    </svg>
  )
}
function ClipboardIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/>
      <rect x="8" y="2" width="8" height="4" rx="1" ry="1"/>
    </svg>
  )
}
function ChartIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
    </svg>
  )
}
