import { useEffect, useState } from "react";

// Subtle "forward pass" heads-up display: a thin progress rail on the left and a
// quietly converging loss value. Tasteful hint, not a billboard.
//
// Combines which page you're on (`routeIndex`/`totalRoutes`) with in-page
// scroll, so the rail/loss keep advancing sensibly across navigations instead
// of resetting to "high loss" on every page.
export default function ScrollHud({ routeIndex = 0, totalRoutes = 1 }) {
  const [p, setP] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const localP = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      const base = routeIndex / totalRoutes;
      const span = 1 / totalRoutes;
      setP(base + localP * span);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [routeIndex, totalRoutes]);

  // Loss "converges" from ~2.4 toward ~0.02 as you scroll.
  const loss = (2.4 * Math.exp(-3.2 * p) + 0.02).toFixed(3);

  return (
    <div className="pointer-events-none fixed inset-y-0 left-4 z-40 hidden flex-col items-center justify-center gap-3 sm:flex">
      <span className="font-mono text-[10px] tracking-widest text-muted [writing-mode:vertical-rl]">
        forward pass
      </span>
      <div className="relative h-40 w-px overflow-hidden rounded bg-line">
        <div
          className="absolute left-0 top-0 w-full rounded bg-gradient-to-b from-synapse to-signal transition-[height] duration-150"
          style={{ height: `${p * 100}%` }}
        />
      </div>
      <div className="font-mono text-[10px] leading-tight text-muted">
        <div className="text-signal-bright">{loss}</div>
        <div className="text-[8px] tracking-wider">loss</div>
      </div>
    </div>
  );
}
