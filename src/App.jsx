import NeuralBackground from "./components/NeuralBackground.jsx";
import ScrollHud from "./components/ScrollHud.jsx";
import Nav from "./components/Nav.jsx";
import Hero from "./components/Hero.jsx";
import Journey from "./components/Journey.jsx";
import Projects from "./components/Projects.jsx";
import Skills from "./components/Skills.jsx";
import Contact from "./components/Contact.jsx";

export default function App() {
  return (
    <div className="grain relative min-h-screen">
      <NeuralBackground />
      <ScrollHud />
      <Nav />
      <main className="relative z-10">
        <Hero />
        <Journey />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </div>
  );
}
