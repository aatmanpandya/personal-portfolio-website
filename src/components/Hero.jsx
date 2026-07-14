import { motion } from "framer-motion";
import { profile, links } from "../content.js";

// The "input layer": raw signal enters. Name, title, one sharp line.
export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center px-6 pt-24"
    >
      <div className="mx-auto w-full max-w-6xl">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="mb-6 font-mono text-xs tracking-[0.3em] text-signal-bright"
        >
          <span className="text-muted">input →</span> {profile.location.toUpperCase()}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl font-display text-5xl font-semibold leading-[1.05] tracking-tight text-white sm:text-7xl"
        >
          {profile.name}
          <span className="mt-3 block bg-gradient-to-r from-signal-bright via-synapse to-signal bg-clip-text text-2xl font-medium text-transparent sm:text-3xl">
            {profile.title}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 max-w-2xl text-lg leading-relaxed text-fog/90 sm:text-xl"
        >
          {profile.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <a
            href="#projects"
            className="group relative overflow-hidden rounded-full bg-signal px-6 py-3 text-sm font-medium text-ink transition-transform hover:-translate-y-0.5"
          >
            <span className="relative z-10">See the work</span>
            <span className="absolute inset-0 -translate-x-full bg-synapse transition-transform duration-300 group-hover:translate-x-0" />
            <span className="relative z-10 sr-only">projects</span>
          </a>
          <a
            href="#contact"
            className="rounded-full border border-line px-6 py-3 text-sm font-medium text-fog transition-colors hover:border-signal hover:text-white"
          >
            Get in touch
          </a>
          {profile.resumeUrl ? (
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="px-3 py-3 font-mono text-xs text-muted underline-offset-4 transition-colors hover:text-signal-bright hover:underline"
            >
              résumé ↗
            </a>
          ) : null}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="mt-14 flex items-center gap-5 font-mono text-xs text-muted"
        >
          {links.github && (
            <a href={links.github} target="_blank" rel="noreferrer" className="hover:text-signal-bright">
              GitHub
            </a>
          )}
          {links.linkedin && (
            <a href={links.linkedin} target="_blank" rel="noreferrer" className="hover:text-signal-bright">
              LinkedIn
            </a>
          )}
          {links.twitter && (
            <a href={links.twitter} target="_blank" rel="noreferrer" className="hover:text-signal-bright">
              X
            </a>
          )}
          {links.blog && (
            <a href={links.blog} target="_blank" rel="noreferrer" className="hover:text-signal-bright">
              Blog
            </a>
          )}
        </motion.div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-8 flex justify-center">
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="font-mono text-[10px] tracking-widest text-muted"
        >
          scroll to propagate ↓
        </motion.div>
      </div>
    </section>
  );
}
