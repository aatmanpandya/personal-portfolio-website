import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <p className="font-mono text-xs tracking-widest text-signal-bright">
        layer_∅ / undefined
      </p>
      <h1 className="mt-4 font-display text-4xl font-semibold text-white">
        Signal lost.
      </h1>
      <p className="mt-3 max-w-md text-muted">
        This path doesn&apos;t map to any layer in the network.
      </p>
      <Link
        to="/"
        className="mt-8 rounded-full bg-signal px-6 py-3 text-sm font-medium text-ink transition-transform hover:-translate-y-0.5"
      >
        Back to input →
      </Link>
    </section>
  );
}
