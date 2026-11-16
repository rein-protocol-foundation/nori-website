import { DISCORD } from "../Header";
import { NoriMark } from "../Icons";
import { SectionLabel } from "./Section";
export function OpenSource() {
  return (
    <section
      className="section open-source-section"
      id="open-source"
      aria-labelledby="open-source-title"
    >
      <div className="section-inner">
        <div className="closing-cell-field" aria-hidden="true">
          <img src="/nori-cells.svg" alt="" width="240" height="240" />
        </div>
        <SectionLabel number="08">Built in the open</SectionLabel>
        <h2 id="open-source-title">
          The next chapter
          <br />
          of working together.
        </h2>
        <p>
          Build the next chapter of Nori, together.
          <br className="desktop-break" /> Follow the code. Join the
          conversation. Help shape what comes next.
        </p>
        <div className="closing-actions">
          <a className="button-primary" href={DISCORD}>
            Join Nori on Discord
          </a>
          <a
            className="button-outline"
            href="https://github.com/rein-protocol-foundation/nori-agent"
          >
            Explore GitHub
          </a>
        </div>
      </div>
    </section>
  );
}
export function Footer() {
  return (
    <footer className="footer">
      <div className="footer-main">
        <a href="#main" className="wordmark" aria-label="Nori home">
          <NoriMark />
          <span>
            nori<span className="wordmark-dot">.</span>
          </span>
        </a>
        <p>Your mission. Nori’s work.</p>
        <nav aria-label="Footer navigation">
          <a href="https://github.com/rein-protocol-foundation/nori-agent">
            GitHub
          </a>
          <a href={DISCORD}>Discord</a>
          <a href="#main">Back to top</a>
        </nav>
      </div>
      <div className="footer-bottom">
        <span>One super agent. Work, everywhere.</span>
        <span>Product walkthroughs use sample data.</span>
      </div>
    </footer>
  );
}
