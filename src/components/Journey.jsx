import { profile, journey } from "../content.js";
import Reveal from "./Reveal.jsx";
import LayerTag from "./LayerTag.jsx";
import LayerNav from "./LayerNav.jsx";

// First hidden layer: the story so far + a short bio.
export default function Journey() {
  return (
    <section className="relative min-h-screen px-6 pb-20 pt-36">
      <div className="mx-auto max-w-6xl">
        <LayerTag index={1} name="origin" />
        <div className="grid gap-14 md:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              The story so far
            </h2>
            <div className="mt-6 space-y-4 text-fog/85 leading-relaxed">
              {profile.bio.map((line, i) => (
                <p key={i}>{line}</p>
              ))}
            </div>
          </Reveal>

          <div className="relative">
            <div className="absolute left-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-signal via-line to-transparent" />
            <ul className="space-y-8">
              {journey.map((step, i) => (
                <Reveal key={i} delay={i * 0.08}>
                  <li className="relative pl-8">
                    <span className="absolute left-0 top-1.5 grid h-3.5 w-3.5 place-items-center rounded-full border border-signal bg-ink">
                      <span className="h-1.5 w-1.5 rounded-full bg-synapse shadow-[0_0_8px] shadow-signal" />
                    </span>
                    <div className="font-mono text-xs tracking-widest text-signal-bright">
                      {step.when}
                    </div>
                    <div className="mt-1 text-lg font-medium text-white">
                      {step.what}
                    </div>
                    <div className="mt-1 text-sm text-muted">{step.note}</div>
                  </li>
                </Reveal>
              ))}
            </ul>
          </div>
        </div>
        <LayerNav index={1} />
      </div>
    </section>
  );
}
