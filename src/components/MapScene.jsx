import { useEffect, useMemo, useRef } from "react";
import {
  motion,
  useSpring,
  useTransform,
  useMotionTemplate,
  useReducedMotion,
} from "framer-motion";
import { nodes, edges, clusterMeta, WORLD } from "../lib/mapModel.js";
import ClaudeMark from "./ClaudeMark.jsx";

const SPRING = { stiffness: 60, damping: 18, mass: 1.2 };

// Kinds rendered as filled "anchor" nodes with sans labels; the rest are
// small stroked satellites with mono labels.
const ANCHOR = new Set(["input", "output", "project", "experience", "education", "certification"]);

export default function MapScene({
  camera, // { x, y, zoom } target in world units
  activeId, // node the tour/selection is focused on
  highlights, // Map<id, score> from search, or null
  onSelectNode,
  onUserPan,
}) {
  const reduced = useReducedMotion();
  const sx = useSpring(camera.x, SPRING);
  const sy = useSpring(camera.y, SPRING);
  const sz = useSpring(camera.zoom, SPRING);

  useEffect(() => {
    if (reduced) {
      sx.jump(camera.x);
      sy.jump(camera.y);
      sz.jump(camera.zoom);
    } else {
      sx.set(camera.x);
      sy.set(camera.y);
      sz.set(camera.zoom);
    }
  }, [camera, reduced, sx, sy, sz]);

  const nx = useTransform(sx, (v) => -v);
  const ny = useTransform(sy, (v) => -v);
  const transform = useMotionTemplate`translate(${WORLD.w / 2}px, ${
    WORLD.h / 2
  }px) scale(${sz}) translate(${nx}px, ${ny}px)`;

  // Drag to pan / wheel to zoom → hands control to the visitor.
  const svgRef = useRef(null);
  const drag = useRef(null);

  const worldScale = () => {
    // How many world units per screen pixel at current zoom.
    const rect = svgRef.current.getBoundingClientRect();
    const fit = Math.max(WORLD.w / rect.width, WORLD.h / rect.height); // slice
    return fit / sz.get();
  };

  const onPointerDown = (e) => {
    // Touch gestures step the tour (handled in App); mouse drag pans.
    if (e.pointerType === "touch") return;
    if (e.target.closest("[data-node]")) return;
    drag.current = { x: e.clientX, y: e.clientY, cx: sx.get(), cy: sy.get() };
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e) => {
    if (!drag.current) return;
    const k = worldScale();
    const nxv = drag.current.cx - (e.clientX - drag.current.x) * k;
    const nyv = drag.current.cy - (e.clientY - drag.current.y) * k;
    onUserPan({ x: nxv, y: nyv, zoom: sz.get() });
  };
  const onPointerUp = () => (drag.current = null);

  const activeEdges = useMemo(
    () => edges.filter((e) => e.a.id === activeId || e.b.id === activeId),
    [activeId]
  );

  const maxScore = highlights ? Math.max(...highlights.values()) : 0;

  return (
    <svg
      ref={svgRef}
      className="h-full w-full cursor-grab touch-none select-none active:cursor-grabbing"
      viewBox={`0 0 ${WORLD.w} ${WORLD.h}`}
      preserveAspectRatio="xMidYMid slice"
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      aria-hidden="true"
    >
      <defs>
        <filter id="soft" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="42" />
        </filter>
        <filter id="glow" x="-120%" y="-120%" width="340%" height="340%">
          <feGaussianBlur stdDeviation="4" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <motion.g style={{ transform }}>
        {/* Ambient cluster fields */}
        {clusterMeta.map((c) => (
          <circle
            key={c.id}
            cx={c.cx}
            cy={c.cy}
            r={c.spread}
            fill={c.hex}
            opacity={c.id === "foundations" || c.id === "beyond" ? 0.035 : 0.06}
            filter="url(#soft)"
          />
        ))}

        {/* Semantic edges */}
        {edges.map((e) => (
          <line
            key={`${e.a.id}-${e.b.id}`}
            x1={e.a.x}
            y1={e.a.y}
            x2={e.b.x}
            y2={e.b.y}
            stroke="rgba(242,244,248,0.07)"
            strokeWidth={0.6 + e.sim * 1.6}
          />
        ))}
        {activeEdges.map((e) => (
          <motion.line
            key={`hl-${e.a.id}-${e.b.id}`}
            x1={e.a.x}
            y1={e.a.y}
            x2={e.b.x}
            y2={e.b.y}
            stroke={(e.a.id === activeId ? e.a : e.b).hex}
            strokeWidth={1.4}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.45 }}
          />
        ))}

        {/* Signal packets along active edges */}
        {!reduced &&
          activeEdges.slice(0, 4).map((e, i) => {
            const from = e.a.id === activeId ? e.a : e.b;
            const to = e.a.id === activeId ? e.b : e.a;
            return (
              <motion.circle
                key={`pkt-${e.a.id}-${e.b.id}`}
                r={2.4}
                fill={from.hex}
                filter="url(#glow)"
                initial={{ cx: from.x, cy: from.y, opacity: 0 }}
                animate={{
                  cx: [from.x, to.x],
                  cy: [from.y, to.y],
                  opacity: [0, 0.9, 0],
                }}
                transition={{
                  duration: 2.2,
                  delay: i * 0.55,
                  repeat: Infinity,
                  repeatDelay: 1.6,
                  ease: "easeInOut",
                }}
              />
            );
          })}

        {/* Cluster region labels */}
        {clusterMeta.map((c) => (
          <text
            key={`label-${c.id}`}
            x={c.cx}
            y={c.cy - c.spread - 10}
            textAnchor="middle"
            className="display"
            fill={c.hex}
            opacity={0.42}
            fontSize={15}
            style={{ textTransform: "uppercase", letterSpacing: "0.26em" }}
          >
            {c.label}
          </text>
        ))}

        {/* Nodes */}
        {nodes.map((n) => {
          const isAnchor = ANCHOR.has(n.kind);
          const isCert = n.kind === "certification";
          const score = highlights?.get(n.id);
          const isTop = highlights && score === maxScore;
          const dim = highlights && !isTop && score < maxScore * 0.85;
          const isActive = n.id === activeId;
          return (
            <g
              key={n.id}
              data-node
              transform={`translate(${n.x}, ${n.y})`}
              opacity={dim ? 0.3 : 1}
              cursor="pointer"
              onClick={() => onSelectNode(n.id)}
            >
              {(isActive || isTop) && (
                <motion.circle
                  r={n.r + 7}
                  fill="none"
                  stroke={n.hex}
                  strokeWidth={1.2}
                  initial={{ opacity: 0.9, scale: 0.9 }}
                  animate={
                    reduced
                      ? { opacity: 0.7, scale: 1 }
                      : { opacity: [0.8, 0.25, 0.8], scale: [0.95, 1.15, 0.95] }
                  }
                  transition={{ duration: 2.4, repeat: reduced ? 0 : Infinity }}
                />
              )}
              <circle
                r={n.r}
                fill={isAnchor && !isCert ? n.hex : "var(--color-void)"}
                stroke={n.hex}
                strokeWidth={isAnchor && !isCert ? 0 : 1.4}
                filter={isAnchor ? "url(#glow)" : undefined}
              />
              {isCert && <ClaudeMark size={n.r * 1.4} x={-n.r * 0.7} y={-n.r * 0.7} />}
              <text
                y={n.r + (isAnchor ? 17 : 13)}
                textAnchor="middle"
                fill={isAnchor ? "var(--color-ink)" : "var(--color-ink-3)"}
                fontSize={isAnchor ? 13 : 9.5}
                fontFamily={isAnchor ? "var(--font-sans)" : "var(--font-mono)"}
                fontWeight={isAnchor ? 600 : 400}
                style={{ pointerEvents: "none" }}
              >
                {n.title}
              </text>
              {highlights && score !== undefined && score > 0 && (
                <text
                  y={-n.r - 8}
                  textAnchor="middle"
                  fill={n.hex}
                  fontSize={9.5}
                  fontFamily="var(--font-mono)"
                >
                  {score.toFixed(3)}
                </text>
              )}
            </g>
          );
        })}
      </motion.g>
    </svg>
  );
}
