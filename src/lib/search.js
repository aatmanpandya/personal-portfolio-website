// Semantic search over map nodes.
//
// Two tiers: an instant lexical scorer (token overlap) available immediately,
// and true semantic scoring once all-MiniLM-L6-v2 finishes loading in the
// browser (lazy, ~23 MB quantized — only fetched after the visitor focuses
// the search box). Both return [{ node, score }] sorted descending.

import { nodes } from "./mapModel.js";

export function cosine(a, b) {
  let dot = 0;
  for (let i = 0; i < a.length; i++) dot += a[i] * b[i];
  return dot; // both vectors are L2-normalized
}

const tokenize = (s) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter((t) => t.length > 2);

const nodeTokens = new Map(
  nodes.map((n) => [n.id, new Set(tokenize(`${n.title} ${n.text}`))])
);

export function lexicalSearch(query) {
  const qTokens = tokenize(query);
  if (!qTokens.length) return [];
  return nodes
    .map((node) => {
      const toks = nodeTokens.get(node.id);
      let hits = 0;
      for (const t of qTokens) {
        if (toks.has(t)) hits += 1;
        else for (const nt of toks) if (nt.startsWith(t)) { hits += 0.5; break; }
      }
      return { node, score: hits / qTokens.length };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score);
}

let embedderPromise = null;

export function loadEmbedder(onProgress) {
  embedderPromise ??= (async () => {
    const { pipeline, env } = await import("@huggingface/transformers");
    env.allowLocalModels = false;
    return pipeline("feature-extraction", "Xenova/all-MiniLM-L6-v2", {
      dtype: "q8",
      progress_callback: (p) => {
        if (p.status === "progress" && p.file?.endsWith(".onnx")) {
          onProgress?.(Math.round((p.loaded / p.total) * 100));
        }
      },
    });
  })();
  return embedderPromise;
}

export async function semanticSearch(query, embedder) {
  const out = await embedder(query, { pooling: "mean", normalize: true });
  const q = out.data;
  return nodes
    .map((node) => ({ node, score: cosine(q, node.vector) }))
    .sort((a, b) => b.score - a.score);
}
