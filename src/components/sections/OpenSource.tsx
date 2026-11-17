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
          <a
            className="button-primary"
            href="https://github.com/rein-protocol-foundation/nori-agent"
          >
            Explore GitHub
          </a>
          <a
            className="button-outline"
            href="mailto:nori-contact@rein-protocol.org"
          >
            Contact us
          </a>
        </div>
      </div>
    </section>
  );
}
export function Footer() {
  return (
    <footer className="footer footer-expanded">
      <div className="footer-main">
        <div className="footer-identity">
          <a href="#main" className="wordmark" aria-label="Nori home">
            <NoriMark />
            <span>
              nori<span className="wordmark-dot">.</span>
            </span>
          </a>
          <p>Your mission. Nori’s work.</p>
        </div>
        <nav aria-label="Explore Nori">
          <h3>Explore Nori</h3>
          <a href="#work">Workflows</a>
          <a href="#team">One Nori</a>
          <a href="#continuity">The work remembers</a>
        </nav>
        <nav aria-label="Project links">
          <h3>Build with us</h3>
          <a href="https://github.com/rein-protocol-foundation/nori-agent">
            GitHub
          </a>
          <a href="https://rein-protocol.org/">Rein Protocol Foundation</a>
        </nav>
        <nav className="footer-contact-nav" aria-label="Contact Nori">
          <h3>Get in touch</h3>
          <a
            className="footer-contact"
            href="mailto:nori-contact@rein-protocol.org"
          >
            nori-contact@rein-protocol.org
          </a>
        </nav>
      </div>
      <div className="footer-bottom">
        <span>Product walkthroughs use sample data.</span>
        <details className="footer-credits">
          <summary>Image credits</summary>
          <p>
            Architecture collage from{" "}
            <a href="https://rein-protocol.org/">Rein Protocol</a>. Hoover Tower
            source photograph:{" "}
            <a href="https://commons.wikimedia.org/wiki/File:Hoover_Tower_west_face.JPG">
              © BrokenSphere, CC BY-SA
            </a>
            .
          </p>
        </details>
        <a href="#main" aria-label="Back to top">
          Back to top <span aria-hidden="true">↑</span>
        </a>
      </div>
    </footer>
  );
}
