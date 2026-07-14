import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { profile } from "../content.js";
import { PAGES } from "../routes.js";

const items = PAGES.filter((p) => p.path !== "/");

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const initials = profile.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-line/70 bg-ink/70 backdrop-blur-md"
          : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="group flex items-center gap-2.5">
          <span className="grid h-8 w-8 place-items-center rounded-md border border-line bg-panel font-mono text-xs text-signal-bright transition-colors group-hover:border-signal">
            {initials}
          </span>
          <span className="hidden font-mono text-sm text-fog sm:inline">
            {profile.name}
          </span>
        </Link>
        <ul className="flex items-center gap-1 text-sm">
          {items.map((it) => (
            <li key={it.path}>
              <NavLink
                to={it.path}
                className={({ isActive }) =>
                  `rounded-md px-3 py-2 transition-colors hover:bg-panel hover:text-fog ${
                    isActive ? "text-signal-bright" : "text-muted"
                  }`
                }
              >
                {it.navLabel}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
