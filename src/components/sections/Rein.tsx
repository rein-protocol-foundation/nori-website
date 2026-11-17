import { SectionLabel } from "./Section";
import "../../styles/editorial-scenes.css";
import "../../styles/foundation-continuity.css";

export function Rein() {
  return (
    <section
      className="section rein-section rein-editorial rein-landmark"
      id="rein"
      aria-labelledby="rein-title"
    >
      <div className="section-inner">
        <SectionLabel number="06">Meet the foundation</SectionLabel>
        <div className="rein-landmark-layout">
          <div className="rein-landmark-copy">
            <a
              className="rein-landmark-brand"
              href="https://rein-protocol.org/"
            >
              <img
                src="/brands/rein-logo.png"
                width="64"
                height="64"
                alt=""
                loading="lazy"
              />
              <span>
                Rein Protocol
                <br />
                Foundation
              </span>
            </a>
            <h2 id="rein-title">
              A safer future.
              <br />
              <span>Worth working for.</span>
            </h2>
            <p>
              Making AI agents safe for people and society, through community,
              research, and open-source projects.
            </p>
            <a className="button-primary" href="https://rein-protocol.org/">
              Explore Rein Protocol
            </a>
          </div>
          <div className="rein-landmark-art">
            <img
              src="/brands/rein-stanford.webp"
              width="972"
              height="1619"
              alt="Rein Protocol’s paper collage of Hoover Tower, with an orange line rising above the architecture."
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
