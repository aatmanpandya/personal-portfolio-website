import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import PageFade from "./PageFade.jsx";
import Home from "../pages/Home.jsx";
import NotFound from "../pages/NotFound.jsx";
import Journey from "./Journey.jsx";
import Projects from "./Projects.jsx";
import Skills from "./Skills.jsx";
import Contact from "./Contact.jsx";

export default function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageFade><Home /></PageFade>} />
        <Route path="/journey" element={<PageFade><Journey /></PageFade>} />
        <Route path="/projects" element={<PageFade><Projects /></PageFade>} />
        <Route path="/skills" element={<PageFade><Skills /></PageFade>} />
        <Route path="/contact" element={<PageFade><Contact /></PageFade>} />
        <Route path="*" element={<PageFade><NotFound /></PageFade>} />
      </Routes>
    </AnimatePresence>
  );
}
