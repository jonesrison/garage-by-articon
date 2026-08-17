import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { fetchProjects } from '../lib/api'
import { submitApplication } from '../lib/api'

const AVAILABILITY = ['1\u20132 hrs/week', '3\u20135 hrs/week', '6\u201310 hrs/week', '10+ hrs/week']
const OWNERSHIP = ['Yes, hand me a deliverable', 'Prefer supporting a lead for now', 'Not sure yet']

const emptyForm = {
  name: '',
  email: '',
  committee: '',
  firstChoice: '',
  roles: [],
  secondChoice: '',
  why: '',
  contribute: '',
  learn: '',
  experience: '',
  availability: '',
  ownership: '',
}

export default function Apply() {
  const [params] = useSearchParams()
  const [projects, setProjects] = useState([])
  const [form, setForm] = useState(emptyForm)
  const [status, setStatus] = useState('idle') // idle | submitting | done | error

  useEffect(() => {
    fetchProjects().then((data) => {
      const applyable = data.filter((p) => p.type !== 'paused' && p.roles?.length)
      setProjects(applyable)

      const presetProject = params.get('project')
      const presetRole = params.get('role')
      if (presetProject) {
        setForm((f) => ({
          ...f,
          firstChoice: presetProject,
          roles: presetRole ? [presetRole] : f.roles,
        }))
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const firstChoiceProject = useMemo(
    () => projects.find((p) => p.slug === form.firstChoice),
    [projects, form.firstChoice],
  )

  const update = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  const toggleRole = (roleName) => {
    setForm((f) => ({
      ...f,
      roles: f.roles.includes(roleName) ? f.roles.filter((r) => r !== roleName) : [...f.roles, roleName],
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('submitting')
    const res = await submitApplication(form)
    setStatus(res.ok ? 'done' : 'error')
  }

  if (status === 'done') {
    return (
      <div className="max-w-2xl mx-auto px-5 md:px-8 py-28 text-center">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber mb-3">Work order filed</p>
        <h1 className="font-display font-black uppercase text-4xl md:text-6xl tracking-tight">
          Application received.
        </h1>
        <p className="text-steel mt-5 leading-relaxed">
          Welcome to the build. Leads are reviewing applications and will reach out directly &mdash; check{' '}
          <a href="#/updates" className="text-amber hover:underline">Updates</a> for what happens next.
        </p>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-5 md:px-8 py-14 md:py-20">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-amber mb-2">Work order</p>
      <h1 className="font-display font-black uppercase text-5xl md:text-6xl tracking-tight leading-none">Apply</h1>
      <p className="text-steel max-w-xl mt-4 leading-relaxed">
        One form for every project. You can apply irrespective of your official committee, and you don&rsquo;t
        need prior experience for every role.
      </p>

      <form onSubmit={handleSubmit} className="mt-10 space-y-8">
        <fieldset className="grid sm:grid-cols-2 gap-4">
          <Field label="Name" required>
            <input required value={form.name} onChange={update('name')} className="input" placeholder="Your full name" />
          </Field>
          <Field label="Email" required>
            <input required type="email" value={form.email} onChange={update('email')} className="input" placeholder="you@example.com" />
          </Field>
          <Field label="Current committee" className="sm:col-span-2">
            <input value={form.committee} onChange={update('committee')} className="input" placeholder="e.g. Media, Technical, Industry Interactions" />
          </Field>
        </fieldset>

        <fieldset>
          <Field label="First-choice project" required>
            <select required value={form.firstChoice} onChange={(e) => setForm((f) => ({ ...f, firstChoice: e.target.value, roles: [] }))} className="input">
              <option value="">Select a project</option>
              {projects.map((p) => (
                <option key={p.slug} value={p.slug}>{p.name}</option>
              ))}
            </select>
          </Field>

          {firstChoiceProject && (
            <div className="mt-4">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-steel-dim mb-2">
                Role(s) in {firstChoiceProject.name}
              </p>
              <div className="grid sm:grid-cols-2 gap-2">
                {firstChoiceProject.roles.map((r) => (
                  <label
                    key={r.name}
                    className={`flex items-center gap-2 border px-3 py-2.5 cursor-pointer text-sm transition-colors ${
                      form.roles.includes(r.name)
                        ? 'border-amber bg-amber/10 text-paper'
                        : 'border-line-bright text-steel hover:text-paper'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={form.roles.includes(r.name)}
                      onChange={() => toggleRole(r.name)}
                      className="accent-amber"
                    />
                    {r.emoji} {r.name}
                  </label>
                ))}
              </div>
            </div>
          )}

          <Field label="Second-choice project (optional)" className="mt-4">
            <select value={form.secondChoice} onChange={update('secondChoice')} className="input">
              <option value="">None</option>
              {projects.filter((p) => p.slug !== form.firstChoice).map((p) => (
                <option key={p.slug} value={p.slug}>{p.name}</option>
              ))}
            </select>
          </Field>
        </fieldset>

        <fieldset className="space-y-4">
          <Field label="Why this project?" required>
            <textarea required value={form.why} onChange={update('why')} className="input min-h-24" placeholder="What pulled you toward it" />
          </Field>
          <Field label="What can you contribute right now?" required>
            <textarea required value={form.contribute} onChange={update('contribute')} className="input min-h-20" />
          </Field>
          <Field label="What do you want to learn?">
            <textarea value={form.learn} onChange={update('learn')} className="input min-h-20" />
          </Field>
          <Field label="Relevant experience (optional)">
            <textarea value={form.experience} onChange={update('experience')} className="input min-h-16" placeholder="Skip this if you're starting fresh \u2014 it's optional for a reason" />
          </Field>
        </fieldset>

        <fieldset className="grid sm:grid-cols-2 gap-4">
          <Field label="Weekly availability" required>
            <select required value={form.availability} onChange={update('availability')} className="input">
              <option value="">Select</option>
              {AVAILABILITY.map((a) => <option key={a} value={a}>{a}</option>)}
            </select>
          </Field>
          <Field label="Willing to own a deliverable?" required>
            <select required value={form.ownership} onChange={update('ownership')} className="input">
              <option value="">Select</option>
              {OWNERSHIP.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </Field>
        </fieldset>

        {status === 'error' && (
          <p className="font-mono text-sm text-rust">
            That didn&rsquo;t go through. Check your connection and try again.
          </p>
        )}

        <button
          type="submit"
          disabled={status === 'submitting'}
          className="w-full sm:w-auto font-mono text-xs uppercase tracking-[0.14em] bg-amber text-graphite px-6 py-3.5 hover:bg-paper transition-colors disabled:opacity-60"
        >
          {status === 'submitting' ? 'Filing work order\u2026' : 'Submit application'}
        </button>
      </form>
    </div>
  )
}

function Field({ label, required, children, className = '' }) {
  return (
    <label className={`block ${className}`}>
      <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-steel-dim mb-1.5 block">
        {label}{required && <span className="text-amber ml-1">*</span>}
      </span>
      {children}
    </label>
  )
}
