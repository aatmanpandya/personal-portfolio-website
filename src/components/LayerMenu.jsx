import { Link } from "react-router-dom";
import Reveal from "./Reveal.jsx";
import { PAGES } from "../routes.js";

const TEASER = {
  Journey: "Where the story starts — education, internship, and what I'm building now.",
  Projects: "Three ML projects, from semantic resume matching to customer segmentation.",
  Skills: "The languages, libraries, and ML techniques I reach for.",
  Contact: "Open to roles and collaborations — the fastest way to reach me.",
};

// A second way to navigate from Home: a card per downstream layer, styled
// like the project cards so the whole site feels like one visual system.
export default function LayerMenu() {
  const items = PAGES.filter((p) => p.path !== "/");

  return (
    <section className="relative px-6 pb-28">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="mb-8 font-mono text-xs tracking-widest text-muted">
            <span className="text-signal-bright">propagate →</span> pick a layer
          </p>
        </Reveal>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((p, i) => (
            <Reveal key={p.path} delay={i * 0.06}>
              <Link
                to={p.path}
                className="group flex h-full flex-col justify-between rounded-2xl border border-line bg-panel/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-signal/60 hover:bg-panel"
              >
                <div>
                  <div className="font-mono text-xs text-signal-bright">
                    layer_{p.index} / {p.layerName}
                  </div>
                  <div className="mt-3 text-lg font-semibold text-white">
                    {p.navLabel}
                  </div>
                  <p className="mt-2 text-sm text-muted">{TEASER[p.navLabel]}</p>
                </div>
                <div className="mt-5 font-mono text-xs text-muted transition-colors group-hover:text-signal-bright">
                  enter →
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
