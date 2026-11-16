import { DISCORD } from "../Header";
import { SectionLabel } from "./Section";
import "../../styles/editorial-scenes.css";

export function Rein() {
  return (
    <section
      className="section rein-section rein-editorial"
      id="rein"
      aria-labelledby="rein-title"
    >
      <div className="section-inner">
        <div className="rein-editorial-topline">
          <SectionLabel number="06">Meet the foundation</SectionLabel>
          <a
            href="https://www.rein-protocol.org"
            className="rein-official-link"
          >
            Rein Protocol Foundation
          </a>
        </div>
        <div className="rein-editorial-layout">
          <div className="rein-editorial-main">
            <a
              className="rein-official-brand"
              href="https://www.rein-protocol.org"
              aria-label="Rein Protocol Foundation website"
            >
              <img
                src="/brands/rein-logo.png"
                width="92"
                height="92"
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
            <p className="rein-public-mission">
              Making AI agents safe for people and society.
            </p>
            <p className="rein-public-description">
              Rein is a nonprofit advancing AI-agent safety through community,
              research, and open-source projects.
            </p>
            <div className="rein-community-invitation">
              <a className="button-primary" href={DISCORD}>
                Meet Nori in Discord
              </a>
              <p>
                Meet Nori in Rein’s public community.
                <br />
                Explore the work. Join the conversation.
              </p>
            </div>
          </div>
          <div className="rein-mission-plate">
            <div className="rein-plate-caption">
              <span>A shared principle</span>
              <span>Human agency, first.</span>
            </div>
            <svg
              className="rein-principle-art"
              viewBox="0 0 480 320"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M54 257C54 137 138 51 255 51H423M54 257H423"
                stroke="#b8ac9d"
              />
              <path
                d="M91 257C91 157 158 88 255 88H423M128 257C128 178 181 125 255 125H423M165 257C165 200 201 162 255 162H423M202 257C202 222 224 199 255 199H423"
                stroke="#c9baaa"
              />
              <path
                className="rein-safety-route"
                d="M54 257C54 137 138 51 255 51H423"
                stroke="#ee4217"
                strokeWidth="3"
              />
              <circle
                cx="255"
                cy="51"
                r="22"
                fill="#f4ecdd"
                stroke="#ee4217"
                strokeWidth="2"
              />
              <path
                d="M246 51h18M255 42v18"
                stroke="#a8260a"
                strokeWidth="1.5"
              />
              <path d="M255 78v174" stroke="#70635a" strokeDasharray="3 6" />
              <circle cx="255" cy="257" r="6" fill="#1d140e" />
              <rect
                x="369"
                y="224"
                width="54"
                height="54"
                rx="8"
                fill="#1d140e"
              />
              <image
                href="/nori-head.webp"
                x="374"
                y="229"
                width="44"
                height="44"
              />
              <path
                d="M285 51h89"
                stroke="#ee4217"
                strokeWidth="3"
                strokeDasharray="1 7"
              />
            </svg>
            <div className="rein-plate-statement">
              <span className="rein-orange-dot" aria-hidden="true" />
              <h3>
                People set the limits.
                <br />
                People review the decisions
                <br />
                that matter.
              </h3>
            </div>
            <p>Useful agents. Meaningful human judgment.</p>
          </div>
        </div>
        <div className="rein-mission-areas">
          <span>The work of AI safety</span>
          <p>Community</p>
          <p>Research</p>
          <p>Open-source projects</p>
        </div>
      </div>
    </section>
  );
}
