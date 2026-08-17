import { useEffect, useState } from 'react'
import { fetchProjects } from '../lib/api'
import WorkOrderCard from '../components/WorkOrderCard'

const filters = [
  { key: 'all', label: 'All' },
  { key: 'flagship', label: 'Flagship' },
  { key: 'product', label: 'Long-term' },
  { key: 'recurring', label: 'Recurring' },
  { key: 'paused', label: 'On hold' },
]

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    fetchProjects().then(setProjects)
  }, [])

  const shown = filter === 'all' ? projects : projects.filter((p) => p.type === filter)

  return (
    <div className="max-w-6xl mx-auto px-5 md:px-8 py-14 md:py-20">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber mb-2">The floor plan</p>
      <h1 className="font-display font-black uppercase text-5xl md:text-7xl tracking-tight leading-none">Projects</h1>
      <p className="text-steel max-w-xl mt-4 leading-relaxed">
        Everything ARTICON is building this year. Your official committee doesn&rsquo;t limit which of these you
        can join &mdash; pick based on what you actually want to work on.
      </p>

      <div className="flex flex-wrap gap-2 mt-8 mb-8">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`font-mono text-xs uppercase tracking-[0.12em] px-4 py-2 border transition-colors ${
              filter === f.key
                ? 'bg-amber text-graphite border-amber'
                : 'border-line-bright text-steel hover:text-paper hover:border-paper'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {shown.length === 0 ? (
        <p className="text-steel font-mono text-sm">Nothing here yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {shown.map((p) => (
            <WorkOrderCard key={p.slug} project={p} />
          ))}
        </div>
      )}
    </div>
  )
}
