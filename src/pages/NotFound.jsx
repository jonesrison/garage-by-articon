import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="max-w-2xl mx-auto px-5 md:px-8 py-28 text-center">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-rust mb-3">404</p>
      <h1 className="font-display font-black uppercase text-5xl md:text-6xl tracking-tight">Not on the floor.</h1>
      <p className="text-steel mt-5">That page doesn&rsquo;t exist here.</p>
      <Link to="/" className="inline-block mt-8 font-mono text-xs uppercase tracking-[0.14em] border border-line-bright px-5 py-3 hover:border-amber hover:text-amber transition-colors">
        Back to GARAGE
      </Link>
    </div>
  )
}
