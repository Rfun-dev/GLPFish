/**
 * Logo — FishQC brand mark.
 * Used on auth screens and nav.
 */
export default function Logo({ size = 'md' }) {
  const sizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-4xl',
  }
  return (
    <div className={`font-bold tracking-tight ${sizes[size]}`}>
      <span className="text-fish-silver">Fish</span>
      <span className="text-ocean-400">QC</span>
    </div>
  )
}
