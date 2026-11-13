import { roles, specialists } from "../content/roles";
import { NoriPortrait } from "../components/brand/Nori";
import { SectionHeading } from "../components/layout/Section";
import "./team.css";
export function Team() {
  return (
    <section id="team" className="section team">
      <SectionHeading
        center
        label="Meet the team"
        title={
          <>
            One Nori. Many roles.
            <br />A working organization.
          </>
        }
      >
        Executive accountability, support for your people, and hands-on
        execution.
      </SectionHeading>
      <div className="badge-row">
        {roles.map(([title, description, output], index) => (
          <article className="employee" key={title}>
            <div className="badge">
              <span className="lanyard" />
              <span className="badge-clip" />
              <div className="badge-insert">
                <NoriPortrait index={index} />
                <b>NORI</b>
                <small>Rein Protocol Foundation</small>
                <h3>{title}</h3>
              </div>
            </div>
            <p>{description}</p>
            <span className="role-output">{output}</span>
          </article>
        ))}
      </div>
      <div className="specialist-row">
        {specialists.map(([title, description]) => (
          <article key={title}>
            <h3>{title}</h3>
            <p>{description}</p>
          </article>
        ))}
      </div>
      <p className="team-footnote">
        Executives report outcomes to people. Employee services support the
        team. Frontline roles deliver the work.
      </p>
    </section>
  );
}
