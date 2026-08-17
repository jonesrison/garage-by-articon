export default function StatusBoard({ stats }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 border border-line divide-x divide-y md:divide-y-0 divide-line">
      {stats.map((s, i) => (
        <div
          key={s.label}
          className="p-5 animate-tick-up"
          style={{ animationDelay: `${i * 90}ms` }}
        >
          <p className="font-display font-extrabold text-4xl text-amber leading-none">{s.value}</p>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-steel mt-2">{s.label}</p>
        </div>
      ))}
    </div>
  )
}
