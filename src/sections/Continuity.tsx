import { SectionHeading, ScenarioNote } from "../components/layout/Section";
import { WorkSurface, Checklist } from "../components/artifacts/WorkSurface";
import "./continuity.css";
export function Continuity() {
  return (
    <section className="section continuity">
      <SectionHeading
        label="Organizational continuity"
        title={
          <>
            The work continues—even as
            <br />
            the organization changes.
          </>
        }
      >
        Keep decisions, commitments, and relationships connected across weeks,
        quarters, and team changes.
      </SectionHeading>
      <div className="continuity-composition">
        <WorkSurface title="Quarterly decisions">
          <h3>The reasoning stays.</h3>
          <Checklist
            items={[
              "Continue contributor office hours",
              "Decision context retained",
              "Follow-up owner recorded",
              "Next review prepared",
            ]}
          />
        </WorkSurface>
        <WorkSurface title="Team handoff">
          <h3>The next person is ready.</h3>
          <Checklist
            items={[
              "Context and decisions",
              "Open commitments and contacts",
              "Offboarding and access changes",
              "A clear place to continue",
            ]}
          />
        </WorkSurface>
        <WorkSurface title="Supporter update" app="Mail">
          <h3>The relationship continues.</h3>
          <p>
            What changed since our last conversation, the work it made possible,
            and what comes next.
          </p>
          <p className="small-copy">
            Previous commitment · project evidence · next check-in
          </p>
        </WorkSurface>
      </div>
      <div className="continuity-trust">
        <h3>Clear roles. Appropriate access. A record of what happened.</h3>
        <p>
          Nori works within the organization’s policies, with people involved
          where decisions and authority require them. Private employee and
          financial records stay within their access boundaries.
        </p>
      </div>
      <ScenarioNote />
    </section>
  );
}
