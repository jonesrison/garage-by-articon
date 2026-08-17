import { useEffect, useState } from 'react'
import { fetchUpdates } from '../lib/api'

export default function Updates() {
  const [updates, setUpdates] = useState([])

  useEffect(() => {
    fetchUpdates().then(setUpdates)
  }, [])

  return (
    <div className="max-w-3xl mx-auto px-5 md:px-8 py-14 md:py-20">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber mb-2">Shipping log</p>
      <h1 className="font-display font-black uppercase text-5xl md:text-7xl tracking-tight leading-none">Updates</h1>
      <p className="text-steel max-w-xl mt-4 leading-relaxed">
        What actually shipped, not what got announced.
      </p>

      <div className="mt-12 border-t border-line">
        {updates.length === 0 && (
          <p className="py-8 font-mono text-sm text-steel">No entries yet.</p>
        )}
        {updates.map((u, i) => (
          <div key={i} className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 py-6 border-b border-line">
            <span className="font-mono text-[11px] text-steel-dim uppercase tracking-[0.12em] shrink-0 w-28">
              {u.date}
            </span>
            <span className="font-mono text-[11px] text-amber uppercase tracking-[0.12em] shrink-0 w-32">
              {u.tag}
            </span>
            <div>
              <p className="font-display font-bold text-xl leading-tight">{u.title}</p>
              <p className="text-steel mt-1.5 leading-relaxed max-w-2xl">{u.body}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
