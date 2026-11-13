import { Conversation } from "../../components/artifacts/Conversation";
import { WorkSurface, Status } from "../../components/artifacts/WorkSurface";
import { WorkTable } from "../../components/artifacts/WorkTable";
export function HiringStory() {
  return (
    <div className="hiring-story story-block">
      <div className="story-lead">
        <p className="eyebrow">Global hiring & employee services</p>
        <h3>
          From an offer
          <br />
          to a first day.
        </h3>
        <p>
          A new colleague. A different country. Nori brings employment, visa
          sponsorship, payroll, benefits, and accounts into one coordinated
          start.
        </p>
      </div>
      <div className="hiring-composition">
        <Conversation
          channel="people-ops"
          messages={[
            [
              "Hiring lead",
              "Our new colleague will work across borders and needs visa sponsorship. Can we get everything ready for their start?",
            ],
            [
              "Nori",
              "I’ve mapped the work location, target start, and employment requirements. I’m comparing local employment and EOR services, and arranging specialist immigration support.",
            ],
            [
              "Hiring lead",
              "I can complete the employer verification and sign the service agreement.",
            ],
            [
              "Nori",
              "Your materials are prepared. I’ll follow the signature, coordinate the provider, and keep payroll, benefits, and first-day setup moving.",
            ],
          ]}
        />
        <WorkSurface
          title="Employment service selection"
          app="Procurement"
          className="hiring-selection"
        >
          <p className="document-kicker">Hiring brief / service decision</p>
          <h4>Right country. Right arrangement.</h4>
          <WorkTable
            caption="Compare against the hiring brief"
            columns={["Requirement", "Service evaluation"]}
            rows={[
              ["Employment", "Local entity or EOR; country coverage"],
              [
                "Contract & benefits",
                "Terms, benefit needs, employer obligations",
              ],
              ["Visa support", "Specialist scope, materials, timing"],
              ["Procurement", "Quote, authorized budget, agreement"],
            ]}
          />
          <Status>Service scope prepared</Status>
          <p className="small-copy">
            Nori carries the selection through contracting, setup, verification,
            and the renewal or exit record.
          </p>
        </WorkSurface>
      </div>
      <div className="hiring-detail">
        <WorkSurface title="Visa sponsorship" app="People">
          <p className="document-kicker">Specialist case coordination</p>
          <h4>Carry a specialized hiring process forward.</h4>
          <p>
            For a nonprofit H-1B cap-exempt hiring scenario, Nori coordinates
            the professional service and follows the case through each requested
            action.
          </p>
          <ol className="case-log">
            <li>
              <b>Service engaged</b>
              <span>
                Scope, quote, and engagement materials prepared for the
                appropriate provider.
              </span>
            </li>
            <li>
              <b>Materials organized</b>
              <span>
                Employer and employee checklists, missing items, and responsible
                people kept together.
              </span>
            </li>
            <li>
              <b>Next action tracked</b>
              <span>
                Provider questions, requested supplements, and milestones
                followed through.
              </span>
            </li>
          </ol>
        </WorkSurface>
        <WorkSurface title="First-day readiness" app="People">
          <p className="document-kicker">Onboarding / coordinated by Nori</p>
          <h4>Everything a first day needs.</h4>
          <WorkTable
            caption="Onboarding work record"
            columns={["Work", "Next action"]}
            rows={[
              ["Employment contract", "Designated signatory completes signing"],
              [
                "E-Verify & onboarding",
                "Applicable provider coordinates verification",
              ],
              [
                "Payroll & benefits",
                "Inputs prepared; provider confirms setup",
              ],
              ["Tools & accounts", "Access provisioned and checked"],
              ["First day", "Schedule and welcome materials shared"],
            ]}
          />
          <p className="small-copy">
            When a person must verify identity or sign, Nori routes that
            specific step and resumes the work afterward.
          </p>
        </WorkSurface>
      </div>
    </div>
  );
}
