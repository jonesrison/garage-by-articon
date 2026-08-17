export default function Footer() {
  return (
    <footer className="border-t border-line mt-24">
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-10 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
        <div>
          <p className="font-display font-extrabold text-xl tracking-tight text-paper">GARAGE</p>
          <p className="font-mono text-[11px] text-steel-dim uppercase tracking-[0.14em] mt-1">
            A workshop run by ARTICON, ExecOM · 2026&ndash;27
          </p>
        </div>
        <p className="font-mono text-[11px] text-steel-dim max-w-sm leading-relaxed">
          Don&rsquo;t just be part of the ExecOM. Build something with it.
        </p>
      </div>
    </footer>
  )
}
