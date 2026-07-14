import { useEffect, useRef } from "react";

// A live, layered neural network that spans the viewport. Scrolling drives a
// "forward pass": an activation wavefront sweeps left→right through the layers,
// lighting up neurons and sending signal particles along the edges. The mouse
// gently perturbs nearby neurons. Everything is drawn on one canvas at DPR.
export default function NeuralBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: true });

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Layer shape of the net (neurons per layer, left→right).
    const LAYERS = [4, 7, 10, 9, 6, 3];
    let W = 0, H = 0, DPR = 1;
    let nodes = [];
    let edges = [];
    let particles = [];
    let raf = 0;
    let t = 0;

    const mouse = { x: -9999, y: -9999, active: false };
    // Smoothed scroll progress 0..1 → position of the activation wavefront.
    let progress = 0;
    let progressTarget = 0;

    function build() {
      DPR = Math.min(window.devicePixelRatio || 1, 2);
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = Math.floor(W * DPR);
      canvas.height = Math.floor(H * DPR);
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

      nodes = [];
      edges = [];
      particles = [];

      const padX = W * 0.08;
      const usableW = W - padX * 2;
      const layerX = LAYERS.map((_, i) =>
        LAYERS.length === 1 ? W / 2 : padX + (usableW * i) / (LAYERS.length - 1)
      );

      LAYERS.forEach((count, li) => {
        const padY = H * 0.14;
        const usableH = H - padY * 2;
        for (let n = 0; n < count; n++) {
          const y =
            count === 1
              ? H / 2
              : padY + (usableH * n) / (count - 1) + (Math.random() - 0.5) * 26;
          nodes.push({
            layer: li,
            bx: layerX[li], // base position
            by: y,
            x: layerX[li],
            y,
            r: 2.1 + Math.random() * 1.8,
            phase: Math.random() * Math.PI * 2, // for idle shimmer
            seed: Math.random(),
          });
        }
      });

      // Connect each node to a few nearest nodes in the next layer.
      for (let li = 0; li < LAYERS.length - 1; li++) {
        const a = nodes.filter((nd) => nd.layer === li);
        const b = nodes.filter((nd) => nd.layer === li + 1);
        a.forEach((src) => {
          const sorted = [...b].sort(
            (p, q) => Math.abs(p.by - src.by) - Math.abs(q.by - src.by)
          );
          sorted.slice(0, Math.min(3, sorted.length)).forEach((dst) => {
            edges.push({ src, dst, w: 0.35 + Math.random() * 0.65 });
          });
        });
      }
    }

    // Where the wavefront sits horizontally, in px, given progress.
    function frontX() {
      const padX = W * 0.08;
      const usableW = W - padX * 2;
      // Ease so it lingers a touch at each end.
      const p = progress;
      return padX - usableW * 0.1 + usableW * 1.2 * p;
    }

    function spawnParticles(fx) {
      // Emit signal along edges whose source is right at the wavefront.
      edges.forEach((e) => {
        const d = Math.abs(e.src.x - fx);
        if (d < 22 && Math.random() < 0.06 && particles.length < 220) {
          particles.push({ e, u: 0, speed: 0.012 + Math.random() * 0.02 });
        }
      });
    }

    function draw() {
      t += 1;
      progress += (progressTarget - progress) * 0.06;
      const fx = frontX();

      ctx.clearRect(0, 0, W, H);

      // Faint vignette glow following the wavefront.
      const grad = ctx.createRadialGradient(fx, H * 0.5, 0, fx, H * 0.5, H * 0.9);
      grad.addColorStop(0, "rgba(79,140,255,0.06)");
      grad.addColorStop(1, "rgba(79,140,255,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, W, H);

      // Node physics: idle drift + mouse repulsion.
      for (const nd of nodes) {
        const shimmer = Math.sin(t * 0.01 + nd.phase) * 2.2;
        let tx = nd.bx;
        let ty = nd.by + shimmer;
        if (mouse.active) {
          const dx = nd.x - mouse.x;
          const dy = nd.y - mouse.y;
          const dist2 = dx * dx + dy * dy;
          if (dist2 < 150 * 150) {
            const f = (1 - Math.sqrt(dist2) / 150) * 26;
            const inv = 1 / (Math.sqrt(dist2) + 0.001);
            tx += dx * inv * f;
            ty += dy * inv * f;
          }
        }
        nd.x += (tx - nd.x) * 0.08;
        nd.y += (ty - nd.y) * 0.08;
        // Activation: how "lit" this neuron is based on wavefront proximity.
        const behind = nd.x <= fx + 40;
        const near = Math.max(0, 1 - Math.abs(nd.x - fx) / 260);
        nd.act = Math.max(behind ? 0.32 : 0, near);
      }

      // Edges.
      ctx.lineWidth = 1;
      for (const e of edges) {
        const a = e.src, b = e.dst;
        const lit = Math.max(a.act, b.act);
        const base = 0.05 + e.w * 0.05;
        const alpha = base + lit * 0.5;
        ctx.strokeStyle = `rgba(90,140,230,${alpha})`;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      }

      // Signal particles travelling along edges.
      if (!reduced) spawnParticles(fx);
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.u += p.speed;
        if (p.u >= 1) {
          particles.splice(i, 1);
          continue;
        }
        const a = p.e.src, b = p.e.dst;
        const x = a.x + (b.x - a.x) * p.u;
        const y = a.y + (b.y - a.y) * p.u;
        ctx.beginPath();
        ctx.arc(x, y, 1.8, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(169,255,207,${0.9 * (1 - p.u)})`;
        ctx.fill();
      }

      // Nodes on top.
      for (const nd of nodes) {
        const glow = nd.act;
        if (glow > 0.15) {
          ctx.beginPath();
          ctx.arc(nd.x, nd.y, nd.r + 6 + glow * 6, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(122,180,255,${0.1 * glow})`;
          ctx.fill();
        }
        ctx.beginPath();
        ctx.arc(nd.x, nd.y, nd.r + glow * 1.4, 0, Math.PI * 2);
        const lit = 0.35 + glow * 0.65;
        // Lit nodes lean toward synapse-green at their peak.
        const g = Math.floor(150 + glow * 90);
        ctx.fillStyle = `rgba(${Math.floor(120 + glow * 40)},${g},255,${lit})`;
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    }

    function onScroll() {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      progressTarget = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
    }
    function onMove(e) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    }
    function onLeave() {
      mouse.active = false;
      mouse.x = -9999;
      mouse.y = -9999;
    }
    function onResize() {
      build();
      onScroll();
    }

    build();
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mouseleave", onLeave);
    window.addEventListener("resize", onResize);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 -z-10 h-full w-full"
    />
  );
}
