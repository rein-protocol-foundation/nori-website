import { Actions } from "../components/layout/Actions";
import { WorkSurface, Checklist } from "../components/artifacts/WorkSurface";
import "./rein.css";
export function Rein() {
  return (
    <section id="rein" className="rein">
      <div className="rein-intro">
        <p className="eyebrow">Running with Rein</p>
        <h2>
          Meet Nori at
          <br />
          Rein Protocol
          <br />
          Foundation.
        </h2>
        <p>
          Rein Protocol Foundation is a nonprofit focused on AI safety and
          making AI agents safe for people and society.
        </p>
        <p>Explore how organizational work connects around a shared mission.</p>
        <Actions />
        <small>
          Meet Nori in the community, explore projects, and take part.
        </small>
      </div>
      <div className="rein-artifacts">
        <WorkSurface title="Project · AI safety">
          <h3>An AI safety project, carried forward.</h3>
          <p>Advance practical, open work for safer AI agents.</p>
          <Checklist
            items={[
              "Define the evaluation question",
              "Connect governance and project resources",
              "Find a useful first contribution",
            ]}
          />
        </WorkSurface>
        <WorkSurface title="Community repository" app="GitHub">
          <h4>A test contribution with purpose.</h4>
          <p>
            A scoped evaluation test, independent review, and the next open
            question—all linked to the same project.
          </p>
        </WorkSurface>
        <WorkSurface title="Project update · AI safety" app="Mail">
          <h4>Keep supporters in the loop.</h4>
          <p>
            Share the question being investigated, the contribution it needs,
            and the next steps. Carry commitments into the next cycle.
          </p>
        </WorkSurface>
        <p className="scenario-note">
          Illustrative project journey, not a historical project record.
        </p>
      </div>
    </section>
  );
}
