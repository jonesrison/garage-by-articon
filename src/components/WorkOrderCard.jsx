import { Link } from 'react-router-dom'
import StatusBadge from './StatusBadge'

const typeLabel = {
  flagship: 'Flagship event',
  product: 'Long-term product',
  recurring: 'Recurring',
  paused: 'On hold',
}

export default function WorkOrderCard({ project }) {
  const openRoles = project.roles?.length ?? 0
  const disabled = project.type === 'paused'

  return (
    <Link
      to={`/projects/${project.slug}`}
      className={`group relative block bg-panel border border-line hover:border-line-bright hover:-translate-y-1 transition-all duration-200 ${
        disabled ? 'opacity-70' : ''
      }`}
    >
      <div className="flex items-center justify-between px-4 pt-4">
        <span className="font-mono text-[11px] text-steel-dim tracking-[0.14em]">{project.code}</span>
        <StatusBadge status={project.status} />
      </div>

      <div className="px-4 pt-3 pb-5">
        <h3 className="font-display font-extrabold text-3xl leading-none tracking-tight text-paper group-hover:text-amber transition-colors">
          {project.name}
        </h3>
        <p className="text-steel text-sm mt-2 leading-snug">{project.tagline}</p>
      </div>

      <div className="flex items-center justify-between px-4 py-3 border-t border-dashed border-line font-mono text-[11px] uppercase tracking-[0.12em] text-steel-dim">
        <span>{typeLabel[project.type]}</span>
        <span>{disabled ? 'Not open' : `${openRoles} role${openRoles === 1 ? '' : 's'} open`}</span>
      </div>
    </Link>
  )
}
