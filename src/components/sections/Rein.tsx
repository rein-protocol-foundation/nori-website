import { DISCORD } from "../Header";
import { ExampleLabel, SectionLabel } from "./Section";
export function Rein() {
  return (
    <section
      className="section rein-section"
      id="rein"
      aria-labelledby="rein-title"
    >
      <div className="section-inner">
        <SectionLabel number="06">Running with Rein</SectionLabel>
        <div className="rein-heading">
          <h2 id="rein-title">
            An organization has a mission.
            <br />
            <strong>Nori helps carry it forward.</strong>
          </h2>
          <div className="rein-wordmark" aria-label="Rein Protocol Foundation">
            <span>rein</span>
            <span>
              PROTOCOL
              <br />
              FOUNDATION
            </span>
          </div>
        </div>
        <div className="rein-story">
          <div className="rein-introduction">
            <h3>
              Meet Nori at
              <br />
              Rein Protocol Foundation.
            </h3>
            <p>
              Rein Protocol Foundation is a nonprofit focused on AI safety and
              making AI agents safe for people and society. As a Nori customer, it offers a place to meet Nori in an actual
              community and explore how it participates in organizational work.
            </p>
            <a className="button-primary" href={DISCORD}>
              Experience Nori in Discord
            </a>
            <p className="rein-invitation">
              Join the organization’s Discord community and meet Nori where
              the conversation happens.
            </p>
          </div>
          <div className="rein-project">
            <ExampleLabel>Illustrative AI safety project plan</ExampleLabel>
            <h3>
              One purpose.
              <br />
              <strong>Connected responsibilities.</strong>
            </h3>
            <div className="project-chapters">
              <article>
                <span>Mission & resources</span>
                <p>
                  Define who the project serves, how decisions are made, and
                  what support the work needs.
                </p>
              </article>
              <article>
                <span>People & delivery</span>
                <p>
                  Help new contributors find a role. Bring in human expertise
                  when the work needs it. Keep activities and commitments
                  moving.
                </p>
              </article>
              <article>
                <span>Learning & continuity</span>
                <p>
                  Share progress, update supporters, and carry the learning and
                  unfinished promises into the next round.
                </p>
              </article>
            </div>
            <p className="rein-example-note">
              An illustrative project plan. Explore the current work with the
              community.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
