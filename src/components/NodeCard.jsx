import { motion } from "framer-motion";
import { profile, links, leadership, clusters } from "../content.js";
import ClaudeMark from "./ClaudeMark.jsx";

const clusterLabel = (id) => clusters.find((c) => c.id === id)?.label ?? id;

function Tags({ tags }) {
  if (!tags?.length) return null;
  return (
    <div className="mt-4 flex flex-wrap gap-1.5">
      {tags.map((t) => (
        <span
          key={t}
          className="rounded-full border border-white/10 px-2.5 py-0.5 font-mono text-[11px] text-ink-2"
        >
          {t}
        </span>
      ))}
    </div>
  );
}

function CardShell({ node, kicker, children }) {
  return (
    <motion.article
      key={node.id}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
      className="pointer-events-auto rounded-2xl border border-white/10 bg-panel/85 p-6 shadow-2xl shadow-black/40 backdrop-blur-md"
    >
      <p
        className="font-mono text-[11px] uppercase tracking-[0.18em]"
        style={{ color: node.hex }}
      >
        {kicker ?? clusterLabel(node.cluster)}
      </p>
      {children}
    </motion.article>
  );
}

function InputCard({ node }) {
  return (
    <CardShell node={node} kicker="input · x⁰">
      <h1 className="display mt-2 text-3xl font-bold leading-tight">
        {profile.name}
      </h1>
      <p className="mt-1 font-mono text-[13px] text-ink-2">{profile.title} · {profile.location}</p>
      <p className="mt-4 text-[15px] leading-relaxed text-ink">{profile.tagline}</p>
      <p className="mt-3 text-sm leading-relaxed text-ink-2">{profile.bio[1]}</p>
      <p className="mt-4 text-sm text-ink-3">
        Scroll to follow the signal, drag to wander, or ask the map anything.
      </p>
    </CardShell>
  );
}

function ProjectCard({ node }) {
  const p = node.detail;
  return (
    <CardShell node={node}>
      <h2 className="display mt-2 text-2xl font-bold leading-tight">{p.name}</h2>
      <p className="mt-1 font-mono text-xs text-ink-3">{p.period}</p>
      <p className="mt-4 text-[15px] leading-relaxed text-ink">{p.blurb}</p>
      <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink-2">
        {p.detail.map((d, i) => (
          <li key={i} className="flex gap-2">
            <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full" style={{ background: node.hex }} />
            {d}
          </li>
        ))}
      </ul>
      {p.highlight && (
        <p
          className="mt-4 rounded-lg border border-white/10 px-3 py-2 font-mono text-xs"
          style={{ color: node.hex }}
        >
          {p.highlight}
        </p>
      )}
      <Tags tags={p.tags} />
      {p.links?.repo && (
        <a
          href={p.links.repo}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-block text-sm font-medium text-ink underline decoration-white/30 underline-offset-4 hover:decoration-white"
        >
          View on GitHub ↗
        </a>
      )}
    </CardShell>
  );
}

function ExperienceCard({ node }) {
  const e = node.detail;
  return (
    <CardShell node={node}>
      <h2 className="display mt-2 text-2xl font-bold leading-tight">{e.role}</h2>
      <p className="mt-1 font-mono text-xs text-ink-3">
        {e.org} · {e.period}
      </p>
      <ul className="mt-4 space-y-2 text-sm leading-relaxed text-ink-2">
        {e.detail.map((d, i) => (
          <li key={i} className="flex gap-2">
            <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full" style={{ background: node.hex }} />
            {d}
          </li>
        ))}
      </ul>
      <Tags tags={e.tags} />
    </CardShell>
  );
}

function SkillCard({ node }) {
  return (
    <CardShell node={node}>
      <h2 className="display mt-2 text-xl font-bold leading-tight">{node.detail.name}</h2>
      <p className="mt-3 text-sm leading-relaxed text-ink-2">{node.detail.text}</p>
    </CardShell>
  );
}

function EducationCard({ node }) {
  const ed = node.detail;
  return (
    <CardShell node={node}>
      <h2 className="display mt-2 text-xl font-bold leading-tight">{ed.name}</h2>
      <p className="mt-1 font-mono text-xs text-ink-3">{ed.period}</p>
      {ed.detail.map((d, i) => (
        <p key={i} className="mt-3 text-sm leading-relaxed text-ink-2">
          {d}
        </p>
      ))}
      <Tags tags={ed.tags} />
    </CardShell>
  );
}

function CertificationCard({ node }) {
  const c = node.detail;
  return (
    <CardShell node={node} kicker="certification">
      <div className="mt-3">
        <ClaudeMark size={36} />
      </div>
      <h2 className="display mt-3 text-2xl font-bold leading-tight">{c.name}</h2>
      <p className="mt-1 font-mono text-xs text-ink-3">
        {[c.issuer, c.period].filter(Boolean).join(" · ")}
      </p>
      {c.detail.map((d, i) => (
        <p key={i} className="mt-3 text-sm leading-relaxed text-ink-2">
          {d}
        </p>
      ))}
      {c.credentialUrl && (
        <a
          href={c.credentialUrl}
          target="_blank"
          rel="noreferrer"
          className="mt-4 inline-block text-sm font-medium text-ink underline decoration-white/30 underline-offset-4 hover:decoration-white"
        >
          View credential ↗
        </a>
      )}
    </CardShell>
  );
}

function LeadershipCard({ node }) {
  // Show both leadership items together — they're one small satellite region.
  return (
    <CardShell node={node} kicker={clusterLabel("beyond")}>
      {leadership.map((l) => (
        <div key={l.id} className="mt-4 first:mt-2">
          <h2 className="display text-lg font-bold leading-tight">{l.name}</h2>
          <p className="mt-0.5 font-mono text-xs text-ink-3">{l.period}</p>
          <p className="mt-2 text-sm leading-relaxed text-ink-2">{l.detail[0]}</p>
        </div>
      ))}
    </CardShell>
  );
}

function OutputCard({ node }) {
  return (
    <CardShell node={node} kicker="output · ŷ">
      <h2 className="display mt-2 text-2xl font-bold leading-tight">
        Forward my way
      </h2>
      <p className="mt-3 text-sm leading-relaxed text-ink-2">
        Open to AI engineering and software engineering roles from 2027.
      </p>
      <div className="mt-5 flex flex-col gap-2.5 text-sm">
        <a className="text-ink underline decoration-white/30 underline-offset-4 hover:decoration-white" href={`mailto:${links.email}`}>
          {links.email}
        </a>
        <a className="text-ink underline decoration-white/30 underline-offset-4 hover:decoration-white" href={links.github} target="_blank" rel="noreferrer">
          GitHub ↗
        </a>
        <a className="text-ink underline decoration-white/30 underline-offset-4 hover:decoration-white" href={links.linkedin} target="_blank" rel="noreferrer">
          LinkedIn ↗
        </a>
        <a className="text-ink underline decoration-white/30 underline-offset-4 hover:decoration-white" href={profile.resumeUrl} download>
          Download resume (PDF)
        </a>
      </div>
    </CardShell>
  );
}

const BY_KIND = {
  input: InputCard,
  project: ProjectCard,
  experience: ExperienceCard,
  skill: SkillCard,
  certification: CertificationCard,
  education: EducationCard,
  leadership: LeadershipCard,
  output: OutputCard,
};

export default function NodeCard({ node }) {
  const Card = BY_KIND[node.kind];
  return Card ? <Card node={node} /> : null;
}
