import { useState } from "react";
import { projects } from "../content.js";
import Reveal from "./Reveal.jsx";
import LayerTag from "./LayerTag.jsx";
import LayerNav from "./LayerNav.jsx";

// Hidden layers: each project is a neuron cluster that activates in view.
export default function Projects() {
  return (
    <section className="relative min-h-screen px-6 pb-20 pt-36">
      <div className="mx-auto max-w-6xl">
        <LayerTag index={2} name="activations" />
        <Reveal>
          <h2 className="max-w-2xl font-display text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Things I&apos;ve built
          </h2>
          <p className="mt-4 max-w-xl text-muted">
            A few projects where an idea propagated all the way to something that runs.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {projects.map((p, i) => (
            <Reveal key={i} delay={(i % 2) * 0.08}>
              <ProjectCard project={p} index={i} />
            </Reveal>
          ))}
        </div>
        <LayerNav index={2} />
      </div>
    </section>
  );
}

function ProjectCard({ project, index }) {
  const [hover, setHover] = useState(false);
  const { name, blurb, detail, tags, metric, links } = project;

  return (
    <article
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-panel/60 p-6 transition-all duration-300 hover:border-signal/60 hover:bg-panel panel-edge"
    >
      {/* moving highlight */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(600px circle at var(--x,50%) var(--y,0%), rgba(79,140,255,0.10), transparent 40%)",
        }}
      />
      <div className="relative flex items-start justify-between gap-4">
        <div className="font-mono text-xs text-muted">
          {String(index + 1).padStart(2, "0")}
        </div>
        {metric ? (
          <div className="rounded-full border border-signal/30 bg-signal/10 px-2.5 py-1 font-mono text-[11px] text-signal-bright">
            {metric}
          </div>
        ) : null}
      </div>

      <h3 className="relative mt-4 text-xl font-semibold text-white">{name}</h3>
      <p className="relative mt-2 text-sm text-fog/85">{blurb}</p>

      <div
        className="relative grid transition-all duration-300"
        style={{
          gridTemplateRows: hover ? "1fr" : "0fr",
          opacity: hover ? 1 : 0,
          marginTop: hover ? 12 : 0,
        }}
      >
        <p className="overflow-hidden text-sm leading-relaxed text-muted">
          {detail}
        </p>
      </div>

      <div className="relative mt-5 flex flex-wrap gap-2">
        {tags.map((t) => (
          <span
            key={t}
            className="rounded-md border border-line bg-ink/60 px-2 py-1 font-mono text-[11px] text-fog/80"
          >
            {t}
          </span>
        ))}
      </div>

      <div className="relative mt-5 flex items-center gap-4 pt-4 font-mono text-xs">
        {links.repo && (
          <a href={links.repo} target="_blank" rel="noreferrer" className="text-muted transition-colors hover:text-signal-bright">
            code ↗
          </a>
        )}
        {links.demo && (
          <a href={links.demo} target="_blank" rel="noreferrer" className="text-muted transition-colors hover:text-synapse">
            demo ↗
          </a>
        )}
        {links.paper && (
          <a href={links.paper} target="_blank" rel="noreferrer" className="text-muted transition-colors hover:text-signal-bright">
            paper ↗
          </a>
        )}
      </div>
    </article>
  );
}
