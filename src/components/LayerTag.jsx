// Tasteful ML hint: a small monospace layer label + node glyph for each section.
export default function LayerTag({ index, name }) {
  return (
    <div className="mb-6 flex items-center gap-3 font-mono text-xs tracking-widest text-muted">
      <span className="inline-flex h-1.5 w-1.5 rounded-full bg-signal-bright shadow-[0_0_10px] shadow-signal" />
      <span className="text-signal-bright">layer_{index}</span>
      <span className="text-line">/</span>
      <span className="uppercase">{name}</span>
      <span className="h-px flex-1 bg-gradient-to-r from-line to-transparent" />
    </div>
  );
}
