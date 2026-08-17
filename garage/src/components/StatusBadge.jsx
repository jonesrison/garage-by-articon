import { STATUS } from '../data/projects'

const toneClasses = {
  amber: 'border-amber text-amber',
  circuit: 'border-circuit text-circuit',
  moss: 'border-moss text-moss',
  rust: 'border-rust text-rust',
}

export default function StatusBadge({ status, className = '' }) {
  const meta = STATUS[status] ?? { label: status, tone: 'circuit' }
  return (
    <span
      className={`inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.14em] border px-2 py-1 rotate-[-1deg] ${toneClasses[meta.tone]} ${className}`}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {meta.label}
    </span>
  )
}
