import { CellularScene } from "./CellularScene";
import { DISCORD } from "./Header";
import "../styles/hero-scene.css";

export function Hero() {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-stage">
        <CellularScene />
        <div className="hero-content">
          <p className="eyebrow">
            <span className="seed-mark" aria-hidden="true">
              <i />
              <i />
              <i />
              <i />
            </span>
            The organizational agent
          </p>
          <h1 id="hero-title">
            <span>Your mission.</span>
            <span>
              <span className="hero-name">
                Nori<span className="hero-possessive">’s</span>
              </span>{" "}
              <strong>work.</strong>
            </span>
          </h1>
          <p className="hero-description">
            One super agent, working across your organization. Nori connects
            people, tools, and the work that moves your mission forward.
          </p>
          <div className="hero-actions">
            <a className="button-primary" href={DISCORD}>
              Meet Nori on Discord
            </a>
            <a className="button-secondary button-outline" href="#work">
              See Nori at work
            </a>
          </div>
          <p className="hero-community-note">
            Meet Nori in the Rein Protocol Foundation community.
          </p>
          <p className="hero-audience">
            Built for nonprofits, NGOs, and teams with a mission.
          </p>
        </div>
      </div>
    </section>
  );
}
