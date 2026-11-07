// Merges build-time map geometry (map-data.json) with the rich content
// objects from content.js into the single node model the UI renders.

import mapData from "../data/map-data.json";
import { buildNodes } from "../mapNodes.js";
import {
  clusters,
  projects,
  experience,
  skills,
  education,
  leadership,
  certifications,
} from "../content.js";
import { CLAUDE_HEX } from "../components/ClaudeMark.jsx";

const CLUSTER_COLOR = {
  semantic: "var(--color-semantic)",
  language: "var(--color-language)",
  predictive: "var(--color-predictive)",
  production: "var(--color-production)",
  foundations: "var(--color-peripheral)",
  beyond: "var(--color-peripheral)",
};

const CLUSTER_HEX = {
  semantic: "#3987e5",
  language: "#c98500",
  predictive: "#e66767",
  production: "#d55181",
  foundations: "#77808f",
  beyond: "#77808f",
};

const RADIUS = {
  input: 13,
  output: 11,
  project: 15,
  experience: 13,
  certification: 16,
  skill: 6.5,
  education: 9,
  leadership: 6.5,
};

// World-space size of the map (SVG viewBox units).
export const WORLD = { w: 1400, h: 950 };

const detailById = new Map(
  [...projects, ...experience, ...skills, ...education, ...leadership, ...certifications].map(
    (item) => [item.id, item]
  )
);

const geo = new Map(mapData.nodes.map((n) => [n.id, n]));

export const nodes = buildNodes().map((n) => {
  const g = geo.get(n.id);
  return {
    ...n,
    detail: detailById.get(n.id) ?? null,
    x: g.x * WORLD.w,
    y: g.y * WORLD.h,
    vector: g.vector,
    r: RADIUS[n.kind] ?? 8,
    color: CLUSTER_COLOR[n.cluster],
    hex: n.kind === "certification" ? CLAUDE_HEX : CLUSTER_HEX[n.cluster],
  };
});

export const nodeById = new Map(nodes.map((n) => [n.id, n]));

export const edges = mapData.edges.map((e) => ({
  ...e,
  a: nodeById.get(e.a),
  b: nodeById.get(e.b),
}));

// Cluster centroids for region labels and ambient glows.
export const clusterMeta = clusters.map((c) => {
  const members = nodes.filter((n) => n.cluster === c.id);
  const cx = members.reduce((s, n) => s + n.x, 0) / members.length;
  const cy = members.reduce((s, n) => s + n.y, 0) / members.length;
  const spread =
    Math.max(...members.map((n) => Math.hypot(n.x - cx, n.y - cy)), 55) + 48;
  return { ...c, cx, cy, spread, color: CLUSTER_COLOR[c.id], hex: CLUSTER_HEX[c.id] };
});

// Guided-tour stops, in order. Zoom is camera scale at that stop; cx/cy
// optionally re-center the camera away from the node itself.
export const tour = [
  { id: "input", zoom: 0.9, cx: WORLD.w * 0.22, cy: WORLD.h * 0.45 },
  { id: "exp-dxfactor", zoom: 1.5 },
  { id: "proj-elo-memory", zoom: 1.5 },
  { id: "proj-elo-product", zoom: 1.5 },
  { id: "cert-claude", zoom: 1.5 },
  { id: "exp-zenalyst", zoom: 1.5 },
  { id: "proj-churn", zoom: 1.5 },
  { id: "proj-film", zoom: 1.5 },
  { id: "proj-hindsight", zoom: 1.5 },
  { id: "proj-cricket", zoom: 1.5 },
  { id: "proj-abtest", zoom: 1.5 },
  { id: "proj-notch", zoom: 1.5 },
  { id: "exp-octalsoft", zoom: 1.5 },
  { id: "edu-bits", zoom: 1.35 },
  { id: "output", zoom: 1.3 },
].map((stop) => ({ ...stop, node: nodeById.get(stop.id) }));

export const modelName = mapData.model;
export const stats = {
  nodes: nodes.length,
  edges: edges.length,
  dims: nodes[0].vector.length,
};
