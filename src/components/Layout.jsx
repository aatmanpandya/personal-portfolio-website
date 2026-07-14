import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import NeuralBackground from "./NeuralBackground.jsx";
import ScrollHud from "./ScrollHud.jsx";
import Nav from "./Nav.jsx";
import { PAGES } from "../routes.js";

// Persists across route changes: the network background, the loss HUD, and
// the nav never remount when you navigate — only the page content inside
// <main> swaps, so the "forward pass" reads as continuous.
export default function Layout({ children }) {
  const location = useLocation();
  const current = PAGES.find((p) => p.path === location.pathname) ?? PAGES[0];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="grain relative min-h-screen">
      <NeuralBackground routeIndex={current.index} totalRoutes={PAGES.length} />
      <ScrollHud routeIndex={current.index} totalRoutes={PAGES.length} />
      <Nav />
      <main className="relative z-10">{children}</main>
    </div>
  );
}
