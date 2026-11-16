import { useEffect } from "react";
import { Mission } from "./components/sections/Mission";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Team } from "./components/sections/Team";
import { Operations } from "./components/sections/Operations";
import { Resources } from "./components/sections/Resources";
import { Community } from "./components/sections/Community";
import { Communications } from "./components/sections/Communications";
import { Rein } from "./components/sections/Rein";
import { Continuity } from "./components/sections/Continuity";
import { OpenSource, Footer } from "./components/sections/OpenSource";
export function App() {
  useEffect(() => {
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          if (!motion.matches) entry.target.classList.add("section-arrived");
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.08 },
    );
    document
      .querySelectorAll("main > .section")
      .forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <Header />
      <main id="main">
        <Hero />
        <Mission />
        <Team />
        <Operations />
        <Resources />
        <Community />
        <Communications />
        <Rein />
        <Continuity />
        <OpenSource />
      </main>
      <Footer />
    </>
  );
}
