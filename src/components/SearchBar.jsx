import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { lexicalSearch, loadEmbedder, semanticSearch } from "../lib/search.js";
import { modelName } from "../lib/mapModel.js";

const PLACEHOLDERS = [
  "has he shipped semantic search?",
  "what has he done with transformers?",
  "any experience with real production data?",
  "show me the strongest ML pipeline",
];

export default function SearchBar({ onResults, onCommit, onClear }) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [modelState, setModelState] = useState("idle"); // idle | loading | ready | failed
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);
  const [placeholder] = useState(
    () => PLACEHOLDERS[Math.floor(Math.random() * PLACEHOLDERS.length)]
  );
  const embedderRef = useRef(null);
  const seq = useRef(0);

  const beginModelLoad = () => {
    if (modelState !== "idle") return;
    setModelState("loading");
    loadEmbedder(setProgress)
      .then((e) => {
        embedderRef.current = e;
        setModelState("ready");
      })
      .catch(() => setModelState("failed"));
  };

  // Re-rank with the semantic model the moment it becomes ready.
  useEffect(() => {
    if (modelState === "ready" && query.trim()) run(query);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modelState]);

  const run = async (q) => {
    const mySeq = ++seq.current;
    if (!q.trim()) {
      setResults([]);
      onResults(null);
      return;
    }
    let ranked;
    if (embedderRef.current) {
      ranked = await semanticSearch(q, embedderRef.current);
      if (mySeq !== seq.current) return; // a newer query superseded this one
    } else {
      ranked = lexicalSearch(q);
    }
    const top = ranked.slice(0, 5).filter((r) => r.score > 0);
    setResults(top);
    onResults(new Map(top.map((r) => [r.node.id, r.score])));
  };

  const commit = (nodeId) => {
    setOpen(false);
    onCommit(nodeId);
  };

  return (
    <div className="pointer-events-auto relative w-full max-w-md">
      <div className="flex items-center gap-2 rounded-full border border-white/12 bg-panel/80 px-4 py-2 backdrop-blur-md focus-within:border-white/30">
        <span className="font-mono text-xs text-ink-3">q:</span>
        <input
          type="search"
          value={query}
          placeholder={placeholder}
          aria-label="Semantic search over the map"
          className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink-3"
          onFocus={() => {
            beginModelLoad();
            setOpen(true);
          }}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
            run(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter" && results[0]) commit(results[0].node.id);
            if (e.key === "Escape") {
              setQuery("");
              setResults([]);
              setOpen(false);
              onResults(null);
              onClear?.();
            }
          }}
        />
        {query && (
          <button
            aria-label="Clear search"
            className="font-mono text-xs text-ink-3 hover:text-ink"
            onClick={() => {
              setQuery("");
              setResults([]);
              onResults(null);
              onClear?.();
            }}
          >
            ✕
          </button>
        )}
      </div>

      <p className="mt-1.5 pl-4 font-mono text-[10px] text-ink-3">
        {modelState === "idle" && "embeds your question with the model from my ATS project"}
        {modelState === "loading" && `loading ${modelName.split("/")[1]} · ${progress}%`}
        {modelState === "ready" && `${modelName.split("/")[1]} · cosine similarity · live`}
        {modelState === "failed" && "model unavailable — using keyword matching"}
      </p>

      <AnimatePresence>
        {open && results.length > 0 && (
          <motion.ul
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="absolute left-0 right-0 top-full z-20 mt-2 overflow-hidden rounded-xl border border-white/12 bg-panel/95 backdrop-blur-md"
          >
            {results.map(({ node, score }, i) => (
              <li key={node.id}>
                <button
                  className="flex w-full items-center gap-3 px-4 py-2.5 text-left hover:bg-white/5"
                  onClick={() => commit(node.id)}
                >
                  <span
                    className="h-2 w-2 shrink-0 rounded-full"
                    style={{ background: node.hex }}
                  />
                  <span className="flex-1 truncate text-sm text-ink">
                    {node.title}
                  </span>
                  <span className="relative h-1 w-14 shrink-0 overflow-hidden rounded-full bg-white/10">
                    <span
                      className="absolute inset-y-0 left-0 rounded-full"
                      style={{
                        background: node.hex,
                        width: `${Math.max(6, Math.min(100, score * 100))}%`,
                      }}
                    />
                  </span>
                  <span className="w-12 shrink-0 text-right font-mono text-[11px] text-ink-2">
                    {score.toFixed(3)}
                  </span>
                  {i === 0 && (
                    <span className="shrink-0 font-mono text-[10px] text-ink-3">↵</span>
                  )}
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
