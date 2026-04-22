/**
 * InputField — labeled input with inline error display.
 * Keeps form markup clean in page-level components.
 */
export default function InputField({ label, error, className = '', ...props }) {
  return (
    <div className="flex flex-col gap-1">
      {label && (
        <label className="text-xs font-medium text-ocean-300 tracking-wide uppercase">
          {label}
        </label>
      )}
      <input
        className={`input-base ${error ? 'border-fish-reject focus:border-fish-reject focus:ring-fish-reject/20' : ''} ${className}`}
        {...props}
      />
      {error && (
        <p className="text-xs text-fish-reject mt-0.5">{error}</p>
      )}
    </div>
  )
}
