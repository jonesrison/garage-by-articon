import { NavLink } from 'react-router-dom'
import { useState } from 'react'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/projects', label: 'Projects' },
  { to: '/updates', label: 'Updates' },
  { to: '/apply', label: 'Apply' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)

  const linkClass = ({ isActive }) =>
    `font-mono text-xs uppercase tracking-[0.14em] px-1 py-2 border-b-2 transition-colors ${
      isActive ? 'text-amber border-amber' : 'text-steel border-transparent hover:text-paper hover:border-line-bright'
    }`

  return (
    <header className="sticky top-0 z-40 bg-graphite/90 backdrop-blur border-b border-line">
      <div className="max-w-6xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between">
        <NavLink to="/" className="flex items-baseline gap-2 group">
          <span className="font-display font-extrabold text-2xl tracking-tight leading-none group-hover:text-amber transition-colors">
            GARAGE
          </span>
          <span className="font-mono text-[10px] text-steel-dim uppercase tracking-[0.2em]">
            by ARTICON
          </span>
        </NavLink>

        <nav className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={linkClass}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <button
          onClick={() => setOpen((o) => !o)}
          className="md:hidden font-mono text-xs uppercase tracking-widest border border-line-bright px-3 py-2 text-steel"
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </div>

      {open && (
        <nav className="md:hidden border-t border-line bg-graphite px-5 py-3 flex flex-col gap-1">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.end}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `font-mono text-sm uppercase tracking-[0.14em] py-3 border-b border-line ${
                  isActive ? 'text-amber' : 'text-steel'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
      )}
    </header>
  )
}
