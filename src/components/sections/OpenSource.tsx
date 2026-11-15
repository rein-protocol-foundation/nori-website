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
        <SectionLabel number="08">An open invitation</SectionLabel>
        <div className="open-source-content">
          <h2 id="open-source-title">
            Open source.
            <br />
            Built <strong>with the community.</strong>
          </h2>
          <p>
            Nori brings together ideas from the open-source community to explore
            what long-term organizational agents can become. Follow the work,
            contribute your perspective, or help shape Nori in your
            organization.
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
          <a className="text-link" href={DISCORD}>
            Or come say hello in Discord.
          </a>
        </div>
        <div className="closing-cell-field" aria-hidden="true">
          {Array.from({ length: 80 }, (_, i) => (
            <i
              key={i}
              className={
                (i * 13 + Math.floor(i / 10) * 7) % 17 < 10 ? "is-alive" : ""
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
export function Footer() {
  return (
    <footer className="footer">
      <a href="#main" className="wordmark" aria-label="Nori home">
        <NoriMark />
        <span>
          nori<span className="wordmark-dot">.</span>
        </span>
      </a>
      <p>
        A little life. A larger possibility.
        <br />
        <span>Built for your organization.</span>
      </p>
      <nav aria-label="Footer navigation">
        <a href="https://github.com/rein-protocol-foundation/nori-agent">
          GitHub
        </a>
        <a href={DISCORD}>Discord</a>
        <a href="#main">Back to top</a>
      </nav>
    </footer>
  );
}
