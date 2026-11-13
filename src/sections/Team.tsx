import { roles, specialists } from "../content/roles";
import { NoriPortrait } from "../components/brand/Nori";
import { SectionHeading } from "../components/layout/Section";
import "./team.css";
import { AppMark } from "../components/artifacts/AppMark";
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
        execution—different Nori roles work together to move the organization
        forward.
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
      <div className="role-connections">
        <article>
          <h3>HR Specialist</h3>
          <p>
            Employee requests, employment services, HRIS, and payroll—connected
            around the same person.
          </p>
          <div>
            <AppMark app="Slack" />
            <span>Employee request</span>
            <span>Employment provider</span>
            <span>Payroll record</span>
          </div>
        </article>
        <article>
          <h3>Community Operator</h3>
          <p>
            A conversation becomes a scoped contribution, a review, and a next
            step in the project.
          </p>
          <div>
            <AppMark app="Discord" />
            <span>Discord</span>
            <AppMark app="GitHub" />
            <span>GitHub</span>
            <span>Contributor guide</span>
          </div>
        </article>
      </div>
      <p className="team-footnote">
        Executives report outcomes to people. Employee services support the
        team. Frontline roles deliver the work.
      </p>
    </section>
  );
}
