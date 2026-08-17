import { useEffect, useState } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { fetchProjects } from '../lib/api'
import StatusBadge from '../components/StatusBadge'

export default function ProjectDetail() {
  const { slug } = useParams()
  const [projects, setProjects] = useState(null)

  useEffect(() => {
    fetchProjects().then(setProjects)
  }, [])

  if (projects === null) {
    return <div className="max-w-4xl mx-auto px-5 md:px-8 py-24 font-mono text-sm text-steel">Pulling the work order&hellip;</div>
  }

  const project = projects.find((p) => p.slug === slug)
  if (!project) return <Navigate to="/projects" replace />

  const canApply = project.type !== 'paused' && project.roles?.length > 0

  return (
    <div>
      <section className="border-b border-line">
        <div className="max-w-4xl mx-auto px-5 md:px-8 pt-14 pb-10">
          <Link to="/projects" className="font-mono text-xs uppercase tracking-[0.14em] text-steel hover:text-amber transition-colors">
            &larr; All projects
          </Link>

          <div className="flex items-center gap-3 mt-6 mb-3">
            <span className="font-mono text-xs text-steel-dim tracking-[0.14em]">{project.code}</span>
            <StatusBadge status={project.status} />
          </div>

          <h1 className="font-display font-black uppercase text-5xl md:text-7xl tracking-tight leading-[0.9]">
            {project.name}
          </h1>
          <p className="font-display font-bold text-xl md:text-2xl text-amber mt-3">{project.tagline}</p>
          <p className="text-steel text-lg mt-5 max-w-2xl leading-relaxed">{project.hero}</p>

          {canApply && (
            <Link
              to={`/apply?project=${project.slug}`}
              className="inline-block mt-8 font-mono text-xs uppercase tracking-[0.14em] bg-amber text-graphite px-5 py-3 hover:bg-paper transition-colors"
            >
              Apply to {project.name}
            </Link>
          )}
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-5 md:px-8 py-12 grid md:grid-cols-[1fr_260px] gap-12">
        <div>
          <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-steel-dim mb-4">What is this</h2>
          <div className="space-y-4">
            {project.summary.map((p, i) => (
              <p key={i} className="text-paper/90 leading-relaxed">{p}</p>
            ))}
          </div>

          {project.why && (
            <div className="mt-8 border-l-2 border-amber pl-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber mb-2">Why it matters</p>
              <p className="text-steel leading-relaxed">{project.why}</p>
            </div>
          )}
        </div>

        <aside>
          <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-steel-dim mb-4">{project.timelineLabel}</h2>
          <ol className="space-y-0">
            {project.timeline.map((t, i) => (
              <li key={i} className="relative pl-6 pb-6 border-l border-line last:border-transparent last:pb-0">
                <span className="absolute -left-[5px] top-1 w-2.5 h-2.5 rounded-full bg-circuit" />
                <p className="font-display font-bold text-base leading-tight">{t.label}</p>
                <p className="text-steel-dim text-sm mt-0.5">{t.detail}</p>
              </li>
            ))}
          </ol>
        </aside>
      </section>

      {project.roles?.length > 0 && (
        <section className="max-w-4xl mx-auto px-5 md:px-8 pb-24">
          <h2 className="font-mono text-[11px] uppercase tracking-[0.2em] text-steel-dim mb-6">
            Roles we&rsquo;re looking for
          </h2>
          <div className="space-y-4">
            {project.roles.map((r) => (
              <div key={r.name} className="stub-edge bg-panel border border-line pl-6 pr-5 py-5">
                <div className="flex items-start justify-between gap-4 flex-wrap">
                  <div>
                    <p className="font-display font-extrabold text-2xl leading-none">
                      <span className="mr-2">{r.emoji}</span>
                      {r.name}
                    </p>
                    <p className="text-steel mt-2 max-w-xl leading-relaxed">{r.description}</p>
                  </div>
                  <Link
                    to={`/apply?project=${project.slug}&role=${encodeURIComponent(r.name)}`}
                    className="shrink-0 font-mono text-xs uppercase tracking-[0.12em] border border-line-bright px-4 py-2 hover:border-amber hover:text-amber transition-colors"
                  >
                    Apply for this
                  </Link>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 mt-4 pt-4 border-t border-dashed border-line">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-steel-dim mb-2">You&rsquo;ll work on</p>
                    <ul className="text-sm text-paper/80 space-y-1">
                      {r.responsibilities.slice(0, 6).map((item) => (
                        <li key={item} className="flex gap-2">
                          <span className="text-amber">&middot;</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-steel-dim mb-2">Useful skills</p>
                    <p className="text-sm text-steel leading-relaxed">{r.skills}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {project.type === 'paused' && (
        <section className="max-w-4xl mx-auto px-5 md:px-8 pb-24">
          <div className="border border-dashed border-line-bright p-6 text-center">
            <p className="font-mono text-sm text-steel">
              Applications for {project.name} aren&rsquo;t open yet. Check the{' '}
              <Link to="/updates" className="text-amber hover:underline">updates log</Link> for when they open.
            </p>
          </div>
        </section>
      )}
    </div>
  )
}
