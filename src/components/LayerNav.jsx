import { Link } from "react-router-dom";
import { PAGES } from "../routes.js";

// Sequential prev/next link between adjacent layers, dropped at the bottom
// of each page so the network still reads as one ordered pass end to end.
export default function LayerNav({ index }) {
  const prev = PAGES.find((p) => p.index === index - 1);
  const next = PAGES.find((p) => p.index === index + 1);

  return (
    <div className="mx-auto mt-16 flex max-w-6xl items-center justify-between border-t border-line pt-6 font-mono text-xs text-muted">
      {prev ? (
        <Link
          to={prev.path}
          className="flex items-center gap-2 transition-colors hover:text-signal-bright"
        >
          <span>←</span>
          <span>
            layer_{prev.index} / {prev.layerName}
          </span>
        </Link>
      ) : (
        <span />
      )}
      {next ? (
        <Link
          to={next.path}
          className="flex items-center gap-2 transition-colors hover:text-signal-bright"
        >
          <span>
            layer_{next.index} / {next.layerName}
          </span>
          <span>→</span>
        </Link>
      ) : (
        <span />
      )}
    </div>
  );
}
