import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchProjects, fetchUpdates } from '../lib/api'
import StatusBoard from '../components/StatusBoard'
import WorkOrderCard from '../components/WorkOrderCard'
import StatusBadge from '../components/StatusBadge'

export default function Home() {
  const [projects, setProjects] = useState([])
  const [updates, setUpdates] = useState([])

  useEffect(() => {
    fetchProjects().then(setProjects)
    fetchUpdates().then(setUpdates)
  }, [])

  const active = projects.filter((p) => p.type !== 'paused')
  const recruiting = active.filter((p) => p.status === 'RECRUITING')
  const openRoles = active.reduce((n, p) => n + (p.roles?.length ?? 0), 0)
  const paused = projects.filter((p) => p.type === 'paused')

  const stats = [
    { label: 'Projects active', value: active.length || '\u2014' },
    { label: 'Roles open', value: openRoles || '\u2014' },
    { label: 'Recruiting now', value: recruiting.length || '\u2014' },
    { label: 'On hold', value: paused.length || '\u2014' },
  ]

  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="max-w-6xl mx-auto px-5 md:px-8 pt-20 pb-14 md:pt-28 md:pb-20">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-amber mb-5 animate-flicker-in">
            ARTICON ExecOM &middot; 2026&ndash;27
          </p>
          <h1 className="font-display font-black uppercase leading-[0.85] tracking-tight text-[15vw] md:text-[7.2rem] text-paper animate-flicker-in">
            GARAGE
          </h1>
          <p className="font-display font-bold text-2xl md:text-4xl text-steel mt-3 max-w-2xl leading-[1.05]">
            Where ARTICON things get built, altered, tested, repaired and shipped.
          </p>
          <p className="text-steel max-w-xl mt-5 leading-relaxed">
            Six initiatives are open right now. Pick one based on what you want to build,
            not which committee you&rsquo;re on &mdash; then put your name on it.
          </p>

          <div className="flex flex-wrap gap-3 mt-8">
            <Link
              to="/projects"
              className="font-mono text-xs uppercase tracking-[0.14em] bg-amber text-graphite px-5 py-3 hover:bg-paper transition-colors"
            >
              See what&rsquo;s open
            </Link>
            <Link
              to="/apply"
              className="font-mono text-xs uppercase tracking-[0.14em] border border-line-bright text-paper px-5 py-3 hover:border-amber hover:text-amber transition-colors"
            >
              Apply directly
            </Link>
          </div>
        </div>

        <div className="absolute inset-0 -z-10 noise-overlay pointer-events-none" />
      </section>

      {/* STATUS BOARD */}
      <section className="max-w-6xl mx-auto px-5 md:px-8 -mt-px">
        <StatusBoard stats={stats} />
      </section>

      {/* RECRUITING NOW */}
      <section className="max-w-6xl mx-auto px-5 md:px-8 py-16 md:py-20">
        <div className="flex items-end justify-between mb-6 flex-wrap gap-3">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-steel-dim mb-1">On the floor now</p>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl tracking-tight">Recruiting</h2>
          </div>
          <Link to="/projects" className="font-mono text-xs uppercase tracking-[0.14em] text-steel hover:text-amber transition-colors">
            All projects &rarr;
          </Link>
        </div>

        {recruiting.length === 0 ? (
          <p className="text-steel font-mono text-sm">Loading the floor plan&hellip;</p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {recruiting.map((p) => (
              <WorkOrderCard key={p.slug} project={p} />
            ))}
          </div>
        )}
      </section>

      {/* UPDATES PREVIEW */}
      <section className="max-w-6xl mx-auto px-5 md:px-8 pb-20 md:pb-28">
        <div className="flex items-end justify-between mb-6 flex-wrap gap-3">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-steel-dim mb-1">Shipping log</p>
            <h2 className="font-display font-extrabold text-3xl md:text-4xl tracking-tight">Latest updates</h2>
          </div>
          <Link to="/updates" className="font-mono text-xs uppercase tracking-[0.14em] text-steel hover:text-amber transition-colors">
            Full log &rarr;
          </Link>
        </div>

        <div className="border-t border-line">
          {updates.slice(0, 3).map((u, i) => (
            <div key={i} className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-6 py-5 border-b border-line">
              <span className="font-mono text-[11px] text-steel-dim uppercase tracking-[0.12em] shrink-0 w-28">
                {u.date}
              </span>
              <span className="font-mono text-[11px] text-amber uppercase tracking-[0.12em] shrink-0 w-32">
                {u.tag}
              </span>
              <div>
                <p className="font-display font-bold text-lg leading-tight">{u.title}</p>
                <p className="text-steel text-sm mt-1 leading-relaxed max-w-2xl">{u.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ON HOLD */}
      {paused.length > 0 && (
        <section className="max-w-6xl mx-auto px-5 md:px-8 pb-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-steel-dim mb-4">Also on the shelf</p>
          <div className="flex flex-wrap gap-3">
            {paused.map((p) => (
              <div key={p.slug} className="flex items-center gap-3 border border-line px-4 py-3">
                <span className="font-display font-bold text-lg text-steel">{p.name}</span>
                <StatusBadge status={p.status} />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
