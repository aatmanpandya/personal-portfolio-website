import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import MapScene from "./components/MapScene.jsx";
import NodeCard from "./components/NodeCard.jsx";
import SearchBar from "./components/SearchBar.jsx";
import StaticContent from "./components/StaticContent.jsx";
import { tour, nodeById, stats, modelName } from "./lib/mapModel.js";
import { profile, links } from "./content.js";

// Keep the focused node clear of the reading card: on phones the card sits at
// the bottom, so bias the camera downward (node drifts up-screen).
const camFor = (node, zoom, cx, cy) => ({
  x: cx ?? node.x,
  y:
    (cy ?? node.y) +
    (typeof window !== "undefined" && window.innerWidth < 640 ? 130 : 0),
  zoom,
});

export default function App() {
  const [stopIndex, setStopIndex] = useState(0);
  const [exploring, setExploring] = useState(false);
  const [camera, setCamera] = useState(() => camFor(tour[0].node, tour[0].zoom, tour[0].cx, tour[0].cy));
  const [selectedId, setSelectedId] = useState(tour[0].id);
  const [highlights, setHighlights] = useState(null);

  const goToStop = useCallback((idx) => {
    const clamped = Math.min(tour.length - 1, Math.max(0, idx));
    const stop = tour[clamped];
    setStopIndex(clamped);
    setExploring(false);
    setHighlights(null);
    setCamera(camFor(stop.node, stop.zoom, stop.cx, stop.cy));
    setSelectedId(stop.id);
  }, []);

  const flyTo = useCallback((nodeId, zoom = 1.7) => {
    const n = nodeById.get(nodeId);
    setExploring(true);
    setCamera(camFor(n, zoom));
    setSelectedId(nodeId);
  }, []);

  // Wheel / trackpad steps the tour; ctrl+wheel (and trackpad pinch) zooms.
  const wheelAcc = useRef(0);
  const wheelLock = useRef(0);
  useEffect(() => {
    const onWheel = (e) => {
      if (e.ctrlKey) {
        e.preventDefault();
        setExploring(true);
        setCamera((c) => ({
          ...c,
          zoom: Math.min(3.2, Math.max(0.8, c.zoom * (e.deltaY > 0 ? 0.9 : 1.1))),
        }));
        return;
      }
      // Ignore wheel while over the reading rail (let its content scroll)
      // or the search results.
      if (e.target.closest("[data-scrollable]")) return;
      const now = Date.now();
      if (now < wheelLock.current) return;
      wheelAcc.current += e.deltaY;
      if (Math.abs(wheelAcc.current) > 90) {
        const dir = wheelAcc.current > 0 ? 1 : -1;
        wheelAcc.current = 0;
        wheelLock.current = now + 650;
        setStopIndex((i) => {
          const next = Math.min(tour.length - 1, Math.max(0, i + dir));
          if (next !== i) {
            const stop = tour[next];
            setExploring(false);
            setHighlights(null);
            setCamera(camFor(stop.node, stop.zoom, stop.cx, stop.cy));
            setSelectedId(stop.id);
          }
          return next;
        });
      }
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, []);

  // Vertical swipe steps the tour on touch devices.
  const touchStart = useRef(null);
  useEffect(() => {
    const onStart = (e) => {
      if (e.target.closest("[data-scrollable]")) return;
      touchStart.current = e.touches[0].clientY;
    };
    const onEnd = (e) => {
      if (touchStart.current == null) return;
      const dy = touchStart.current - e.changedTouches[0].clientY;
      touchStart.current = null;
      if (Math.abs(dy) > 60) {
        setStopIndex((i) => {
          const next = Math.min(tour.length - 1, Math.max(0, i + (dy > 0 ? 1 : -1)));
          if (next !== i) {
            const stop = tour[next];
            setExploring(false);
            setHighlights(null);
            setCamera(camFor(stop.node, stop.zoom, stop.cx, stop.cy));
            setSelectedId(stop.id);
          }
          return next;
        });
      }
    };
    window.addEventListener("touchstart", onStart, { passive: true });
    window.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onStart);
      window.removeEventListener("touchend", onEnd);
    };
  }, []);

  // Keyboard: arrows / page keys step the tour.
  useEffect(() => {
    const onKey = (e) => {
      if (e.target.tagName === "INPUT") return;
      if (["ArrowDown", "ArrowRight", "PageDown"].includes(e.key)) {
        e.preventDefault();
        setStopIndex((i) => {
          const next = Math.min(tour.length - 1, i + 1);
          const stop = tour[next];
          setExploring(false);
          setHighlights(null);
          setCamera(camFor(stop.node, stop.zoom, stop.cx, stop.cy));
          setSelectedId(stop.id);
          return next;
        });
      } else if (["ArrowUp", "ArrowLeft", "PageUp"].includes(e.key)) {
        e.preventDefault();
        setStopIndex((i) => {
          const next = Math.max(0, i - 1);
          const stop = tour[next];
          setExploring(false);
          setHighlights(null);
          setCamera(camFor(stop.node, stop.zoom, stop.cx, stop.cy));
          setSelectedId(stop.id);
          return next;
        });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Deep links: /#node-id lands on that node (tour stop if it is one).
  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (!nodeById.has(id)) return;
    const idx = tour.findIndex((s) => s.id === id);
    if (idx >= 0) goToStop(idx);
    else flyTo(id);
  }, [goToStop, flyTo]);

  const onUserPan = useCallback((cam) => {
    setExploring(true);
    setCamera(cam);
  }, []);

  const onSelectNode = useCallback(
    (id) => flyTo(id, Math.max(camera.zoom, 1.7)),
    [camera.zoom, flyTo]
  );

  const selected = nodeById.get(selectedId);

  return (
    <div className="fixed inset-0 overflow-hidden bg-void text-ink">
      <StaticContent />

      {/* The map — full-viewport stage */}
      <div className="absolute inset-0">
        <MapScene
          camera={camera}
          activeId={selectedId}
          highlights={highlights}
          onSelectNode={onSelectNode}
          onUserPan={onUserPan}
        />
      </div>

      {/* Top bar */}
      <header className="pointer-events-none absolute inset-x-0 top-0 z-10 flex flex-col items-center gap-3 p-4 sm:grid sm:grid-cols-[1fr_auto_1fr] sm:items-start sm:p-5">
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            goToStop(0);
          }}
          className="pointer-events-auto justify-self-start font-mono text-xs uppercase tracking-[0.2em] text-ink-2 hover:text-ink"
        >
          {profile.name}
        </a>
        <div data-scrollable className="w-full sm:w-[26rem]">
          <SearchBar
            onResults={setHighlights}
            onCommit={(id) => flyTo(id, 1.8)}
            onClear={() => setHighlights(null)}
          />
        </div>
        <nav className="pointer-events-auto hidden gap-4 justify-self-end font-mono text-xs text-ink-2 sm:flex">
          <a className="hover:text-ink" href={links.github} target="_blank" rel="noreferrer">
            github
          </a>
          <a className="hover:text-ink" href={links.linkedin} target="_blank" rel="noreferrer">
            linkedin
          </a>
          <a className="hover:text-ink" href={profile.resumeUrl} download>
            resume
          </a>
        </nav>
      </header>

      {/* Reading rail */}
      <div className="pointer-events-none absolute inset-x-0 bottom-20 z-10 flex justify-center px-4 sm:inset-x-auto sm:bottom-auto sm:left-6 sm:top-1/2 sm:w-[420px] sm:-translate-y-1/2 sm:px-0">
        <div
          data-scrollable
          className="rail-scroll pointer-events-auto max-h-[42vh] w-full max-w-md overflow-y-auto sm:max-h-[74vh]"
        >
          <AnimatePresence mode="wait">
            {selected && <NodeCard key={selected.id} node={selected} />}
          </AnimatePresence>
        </div>
      </div>

      {/* Tour controls */}
      <div className="absolute inset-x-0 bottom-0 z-10 flex items-center justify-center gap-4 p-4">
        <div className="pointer-events-auto flex items-center gap-3 rounded-full border border-white/10 bg-panel/80 px-4 py-2 backdrop-blur-md">
          <button
            aria-label="Previous stop"
            disabled={stopIndex === 0}
            onClick={() => goToStop(stopIndex - 1)}
            className="font-mono text-sm text-ink-2 hover:text-ink disabled:opacity-30"
          >
            ←
          </button>
          <div className="flex items-center gap-1.5">
            {tour.map((stop, i) => (
              <button
                key={stop.id}
                aria-label={`Go to ${stop.node.title}`}
                onClick={() => goToStop(i)}
                className="h-2 w-2 rounded-full transition-transform hover:scale-125"
                style={{
                  background:
                    i === stopIndex && !exploring
                      ? stop.node.hex
                      : "rgba(242,244,248,0.18)",
                }}
              />
            ))}
          </div>
          <button
            aria-label="Next stop"
            disabled={stopIndex === tour.length - 1}
            onClick={() => goToStop(stopIndex + 1)}
            className="font-mono text-sm text-ink-2 hover:text-ink disabled:opacity-30"
          >
            →
          </button>
          {exploring && (
            <button
              onClick={() => goToStop(stopIndex)}
              className="ml-1 font-mono text-[11px] text-ink-2 underline underline-offset-4 hover:text-ink"
            >
              resume tour
            </button>
          )}
        </div>
      </div>

      {/* Zoom controls */}
      <div className="pointer-events-auto absolute bottom-4 right-4 z-10 flex flex-col overflow-hidden rounded-lg border border-white/10 bg-panel/80 backdrop-blur-md">
        <button
          aria-label="Zoom in"
          className="px-2.5 py-1.5 font-mono text-sm text-ink-2 hover:text-ink"
          onClick={() =>
            onUserPan({ ...camera, zoom: Math.min(3.2, camera.zoom * 1.25) })
          }
        >
          +
        </button>
        <button
          aria-label="Zoom out"
          className="border-t border-white/10 px-2.5 py-1.5 font-mono text-sm text-ink-2 hover:text-ink"
          onClick={() =>
            onUserPan({ ...camera, zoom: Math.max(0.8, camera.zoom * 0.8) })
          }
        >
          −
        </button>
      </div>

      {/* Instrument HUD */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="pointer-events-none absolute bottom-4 left-5 z-10 hidden font-mono text-[10px] leading-relaxed text-ink-3 lg:block"
      >
        {stats.nodes} nodes · {stats.edges} edges · {stats.dims}d →{" "}
        {modelName.split("/")[1]}
        <br />
        every node embedded & placed by semantic similarity
      </motion.p>
    </div>
  );
}
