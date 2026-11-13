import { SiteHeader } from "../components/layout/SiteHeader";
import { SiteFooter } from "../components/layout/SiteFooter";
import { Hero } from "../sections/Hero";
import { Team } from "../sections/Team";
import { Operations } from "../sections/Operations";
import { Finance } from "../sections/Finance";
import { Community } from "../sections/Community";
import { Communications } from "../sections/Communications";
import { Rein } from "../sections/Rein";
import { Continuity } from "../sections/Continuity";
import { OpenSource } from "../sections/OpenSource";
export function App() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <Hero />
        <Team />
        <Operations />
        <Finance />
        <Community />
        <Communications />
        <Rein />
        <Continuity />
        <OpenSource />
      </main>
      <SiteFooter />
    </>
  );
}
