import { Actions } from "../components/layout/Actions";
import { Conversation } from "../components/artifacts/Conversation";
import {
  WorkSurface,
  Checklist,
  Status,
} from "../components/artifacts/WorkSurface";
import { ScenarioNote } from "../components/layout/Section";
import "./hero.css";
export function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <p className="hero-eyebrow">
        An open-source super agent for organizations.
      </p>
      <h1 id="hero-title">
        Meet Nori. Built to help
        <br className="wide-break" /> run your organization.
      </h1>
      <p className="hero-description">
        From daily operations and governance to treasury, community, and growth,
        Nori carries work forward over the long term—alongside your team, in the
        tools you already use.
      </p>
      <p className="audience">Built with nonprofits and NGOs in mind.</p>
      <Actions />
      <div className="hero-composition">
        <WorkSurface
          title="Team calendar"
          app="Calendar"
          className="hero-calendar"
        >
          <p className="artifact-heading">Out of office</p>
          <p>The project owner is on leave.</p>
          <Status>Coverage identified</Status>
          <p className="small-copy">Partner update due tomorrow</p>
        </WorkSurface>
        <Conversation
          channel="program-ops"
          messages={[
            [
              "Nori",
              "The partner update is due tomorrow. I found the missing project notes and asked the covering teammate to review the summary.",
            ],
            ["Teammate", "Reviewed. The summary is ready to share."],
            [
              "Nori",
              "Sent through the agreed channel. The handoff is recorded.",
            ],
          ]}
        />
        <WorkSurface title="Partner update" className="hero-delivery">
          <p className="artifact-heading">A promise kept.</p>
          <Checklist
            items={[
              "Project evidence attached",
              "Summary reviewed",
              "Delivery recorded",
            ]}
          />
        </WorkSurface>
      </div>
      <ScenarioNote />
    </section>
  );
}
