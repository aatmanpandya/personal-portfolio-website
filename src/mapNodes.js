// Derives the flat list of map nodes from content.js. Shared by the app and
// by scripts/build-map.mjs — the `text` field is what gets embedded, so keep
// it descriptive of what the node *is about*, not just its label.

import {
  profile,
  clusters,
  projects,
  experience,
  skills,
  education,
  leadership,
  certifications,
} from "./content.js";

export function buildNodes() {
  const nodes = [];

  nodes.push({
    id: "input",
    kind: "input",
    cluster: "semantic",
    title: profile.name,
    subtitle: profile.title,
    text: `${profile.title}. ${profile.tagline} ${profile.bio.join(" ")}`,
  });

  for (const p of projects) {
    nodes.push({
      id: p.id,
      kind: "project",
      cluster: p.cluster,
      size: p.size,
      title: p.name,
      subtitle: p.period,
      text: `${p.name}. ${p.blurb} ${p.detail.join(" ")}`,
    });
  }

  for (const e of experience) {
    nodes.push({
      id: e.id,
      kind: "experience",
      cluster: e.cluster,
      size: e.size,
      title: `${e.role} @ ${e.org}`,
      subtitle: e.period,
      text: `${e.role} at ${e.org}. ${e.detail.join(" ")}`,
    });
  }

  for (const s of skills) {
    nodes.push({
      id: s.id,
      kind: "skill",
      cluster: s.cluster,
      title: s.name,
      subtitle: "skill",
      text: `${s.name}. ${s.text}`,
    });
  }

  for (const c of certifications) {
    nodes.push({
      id: c.id,
      kind: "certification",
      cluster: c.cluster,
      title: c.name,
      subtitle: c.issuer,
      text: `Certification: ${c.name}, from ${c.issuer}. ${c.detail.join(" ")}`,
    });
  }

  for (const ed of education) {
    nodes.push({
      id: ed.id,
      kind: "education",
      cluster: ed.cluster,
      title: ed.name,
      subtitle: ed.period,
      text: `Education: ${ed.name}. ${ed.detail.join(" ")}`,
    });
  }

  for (const l of leadership) {
    nodes.push({
      id: l.id,
      kind: "leadership",
      cluster: l.cluster,
      title: l.name,
      subtitle: l.period,
      text: `${l.name}. ${l.detail.join(" ")}`,
    });
  }

  nodes.push({
    id: "output",
    kind: "output",
    cluster: "beyond",
    title: "Get in touch",
    subtitle: "output layer",
    text: "Contact Aatman Pandya: email, GitHub, LinkedIn, download resume. Open to AI engineering and software engineering roles from 2027.",
  });

  return nodes;
}

export const clusterOrder = clusters.map((c) => c.id);
