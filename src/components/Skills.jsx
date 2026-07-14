import { skills } from "../content.js";
import Reveal from "./Reveal.jsx";
import LayerTag from "./LayerTag.jsx";

// Deeper hidden layer: capabilities, grouped like feature detectors.
export default function Skills() {
  return (
    <section id="skills" className="relative px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <LayerTag index={3} name="weights" />
        <Reveal>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            The stack I think in
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {skills.map((group, i) => (
            <Reveal key={group.group} delay={i * 0.07}>
              <div className="h-full rounded-2xl border border-line bg-panel/50 p-6 transition-colors hover:border-signal/40">
                <div className="font-mono text-xs uppercase tracking-widest text-signal-bright">
                  {group.group}
                </div>
                <ul className="mt-4 space-y-2.5">
                  {group.items.map((item) => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-fog/90">
                      <span className="h-1 w-1 rounded-full bg-synapse" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
