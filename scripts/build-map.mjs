// Build-time embedding pipeline.
//
// Embeds every map node with all-MiniLM-L6-v2 (the same model used in the
// AI Resume ATS Analyzer project), projects the vectors to 2D with UMAP,
// and emits src/data/map-data.json consumed by the app. Deterministic:
// UMAP runs with a seeded PRNG so positions are stable across builds.
//
// Run with: npm run build:map

import { mkdir, writeFile } from "node:fs/promises";
import { pipeline } from "@huggingface/transformers";
import { UMAP } from "umap-js";
import { buildNodes } from "../src/mapNodes.js";

const MODEL = "Xenova/all-MiniLM-L6-v2";
const OUT = new URL("../src/data/map-data.json", import.meta.url);

function mulberry32(seed) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function cosine(a, b) {
  let dot = 0;
  for (let i = 0; i < a.length; i++) dot += a[i] * b[i];
  return dot; // vectors are L2-normalized by the model
}

const nodes = buildNodes();
console.log(`Embedding ${nodes.length} nodes with ${MODEL}…`);

const embed = await pipeline("feature-extraction", MODEL, { dtype: "fp32" });
const vectors = [];
for (const node of nodes) {
  const out = await embed(node.text, { pooling: "mean", normalize: true });
  vectors.push(Array.from(out.data));
}

console.log("Projecting to 2D with UMAP (seeded)…");
const umap = new UMAP({
  nComponents: 2,
  nNeighbors: Math.min(8, nodes.length - 1),
  minDist: 0.35,
  spread: 1.2,
  random: mulberry32(42),
});
const positions = umap.fit(vectors);

// Normalize positions to [0, 1] with padding.
const xs = positions.map((p) => p[0]);
const ys = positions.map((p) => p[1]);
const [minX, maxX] = [Math.min(...xs), Math.max(...xs)];
const [minY, maxY] = [Math.min(...ys), Math.max(...ys)];
const pad = 0.08;
const norm = (v, min, max) => pad + ((v - min) / (max - min || 1)) * (1 - 2 * pad);

let pts = positions.map((p) => [norm(p[0], minX, maxX), norm(p[1], minY, maxY)]);

// Anchor clusters along a left→right "forward pass" axis so regions are
// legible, while keeping UMAP's local structure *within* each cluster.
const ANCHORS = {
  semantic: [0.28, 0.34],
  language: [0.44, 0.64],
  predictive: [0.6, 0.3],
  production: [0.78, 0.6],
  foundations: [0.56, 0.86],
  beyond: [0.86, 0.16],
};
const FIXED = { input: [0.07, 0.5], output: [0.94, 0.48] };
const CLUSTER_R = 0.11;

for (const [clusterId, anchor] of Object.entries(ANCHORS)) {
  const idx = nodes
    .map((n, i) => ({ n, i }))
    .filter(({ n }) => n.cluster === clusterId && !FIXED[n.id])
    .map(({ i }) => i);
  if (!idx.length) continue;
  const cx = idx.reduce((s, i) => s + pts[i][0], 0) / idx.length;
  const cy = idx.reduce((s, i) => s + pts[i][1], 0) / idx.length;
  const maxd = Math.max(
    ...idx.map((i) => Math.hypot(pts[i][0] - cx, pts[i][1] - cy)),
    1e-6
  );
  const k = Math.min(1, CLUSTER_R / maxd);
  for (const i of idx) {
    pts[i] = [
      anchor[0] + (pts[i][0] - cx) * k,
      anchor[1] + (pts[i][1] - cy) * k,
    ];
  }
}
for (const [id, pos] of Object.entries(FIXED)) {
  const i = nodes.findIndex((n) => n.id === id);
  if (i >= 0) pts[i] = [...pos];
}

// Relax overlapping points apart (simple repulsion, keeps local structure).
const MIN_D = 0.075;
for (let iter = 0; iter < 60; iter++) {
  for (let i = 0; i < pts.length; i++) {
    for (let j = i + 1; j < pts.length; j++) {
      const dx = pts[j][0] - pts[i][0];
      const dy = pts[j][1] - pts[i][1];
      const d = Math.hypot(dx, dy) || 1e-6;
      if (d < MIN_D) {
        const push = (MIN_D - d) / 2;
        const ux = dx / d;
        const uy = dy / d;
        pts[i][0] -= ux * push;
        pts[i][1] -= uy * push;
        pts[j][0] += ux * push;
        pts[j][1] += uy * push;
      }
    }
  }
}

// k-nearest semantic neighbors → edges (deduped).
const K = 3;
const edgeSet = new Set();
const edges = [];
for (let i = 0; i < nodes.length; i++) {
  const sims = vectors
    .map((v, j) => ({ j, sim: i === j ? -1 : cosine(vectors[i], v) }))
    .sort((a, b) => b.sim - a.sim)
    .slice(0, K);
  for (const { j, sim } of sims) {
    const key = [Math.min(i, j), Math.max(i, j)].join("-");
    if (!edgeSet.has(key)) {
      edgeSet.add(key);
      edges.push({ a: nodes[i].id, b: nodes[j].id, sim: +sim.toFixed(4) });
    }
  }
}

const data = {
  model: MODEL,
  generatedAt: new Date().toISOString(),
  nodes: nodes.map((n, i) => ({
    id: n.id,
    x: +pts[i][0].toFixed(4),
    y: +pts[i][1].toFixed(4),
    vector: vectors[i].map((v) => +v.toFixed(4)),
  })),
  edges,
};

await mkdir(new URL("../src/data/", import.meta.url), { recursive: true });
await writeFile(OUT, JSON.stringify(data));
console.log(
  `Wrote ${data.nodes.length} nodes, ${edges.length} edges → src/data/map-data.json`
);

// Sanity check: log each node's nearest neighbor so cluster drift is visible.
for (let i = 0; i < nodes.length; i++) {
  const best = vectors
    .map((v, j) => ({ j, sim: i === j ? -1 : cosine(vectors[i], v) }))
    .sort((a, b) => b.sim - a.sim)[0];
  console.log(
    `  ${nodes[i].id.padEnd(20)} ↔ ${nodes[best.j].id.padEnd(20)} (${best.sim.toFixed(3)})`
  );
}
