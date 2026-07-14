import { profile, links } from "../content.js";
import Reveal from "./Reveal.jsx";
import LayerTag from "./LayerTag.jsx";
import LayerNav from "./LayerNav.jsx";

// Output layer: the prediction. A clear call to connect.
export default function Contact() {
  const channels = [
    links.email && { label: "Email", href: `mailto:${links.email}`, val: links.email },
    links.github && { label: "GitHub", href: links.github, val: strip(links.github) },
    links.linkedin && { label: "LinkedIn", href: links.linkedin, val: strip(links.linkedin) },
    links.twitter && { label: "X", href: links.twitter, val: strip(links.twitter) },
    links.blog && { label: "Blog", href: links.blog, val: strip(links.blog) },
  ].filter(Boolean);

  return (
    <section className="relative min-h-screen px-6 pb-32 pt-36">
      <div className="mx-auto max-w-6xl">
        <LayerTag index={4} name="output" />
        <Reveal>
          <div className="overflow-hidden rounded-3xl border border-line bg-gradient-to-br from-panel to-ink p-8 sm:p-14 panel-edge">
            <p className="font-mono text-xs tracking-[0.3em] text-signal-bright">
              → prediction
            </p>
            <h2 className="mt-4 max-w-3xl font-display text-4xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
              Let&apos;s build something that learns.
            </h2>
            <p className="mt-5 max-w-xl text-fog/85">
              Open to roles, research, and collaborations in AI/ML. If any of this
              resonated, the fastest path is a message.
            </p>

            <div className="mt-9 flex flex-wrap gap-3">
              {links.email && (
                <a
                  href={`mailto:${links.email}`}
                  className="rounded-full bg-signal px-6 py-3 text-sm font-medium text-ink transition-transform hover:-translate-y-0.5"
                >
                  Say hello
                </a>
              )}
              {profile.resumeUrl && (
                <a
                  href={profile.resumeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-line px-6 py-3 text-sm font-medium text-fog transition-colors hover:border-signal hover:text-white"
                >
                  Download résumé
                </a>
              )}
            </div>

            <div className="mt-10 grid gap-x-8 gap-y-3 border-t border-line pt-8 font-mono text-sm sm:grid-cols-2">
              {channels.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noreferrer"
                  className="flex items-center justify-between gap-4 border-b border-transparent py-1 text-muted transition-colors hover:text-signal-bright"
                >
                  <span className="text-fog/60">{c.label}</span>
                  <span className="truncate">{c.val} ↗</span>
                </a>
              ))}
            </div>
          </div>
        </Reveal>

        <LayerNav index={4} />

        <footer className="mt-10 flex flex-col items-center justify-between gap-2 font-mono text-xs text-muted sm:flex-row">
          <span>
            © {new Date().getFullYear()} {profile.name}
          </span>
          <span className="text-line">
            built as a forward pass · loss ≈ 0.02
          </span>
        </footer>
      </div>
    </section>
  );
}

function strip(url) {
  return url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
}
