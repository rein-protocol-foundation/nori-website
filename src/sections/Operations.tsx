import { SectionHeading, ScenarioNote } from "../components/layout/Section";
import { Conversation } from "../components/artifacts/Conversation";
import {
  WorkSurface,
  Checklist,
  Status,
} from "../components/artifacts/WorkSurface";
import "./operations.css";
export function Operations() {
  return (
    <section id="work" className="section operations">
      <SectionHeading
        label="Operations & governance"
        title={
          <>
            Take care of the work
            <br />
            behind a working team.
          </>
        }
      >
        Finds the right services. Gets them in place. Follows the work through.
      </SectionHeading>
      <div className="operations-main">
        <div>
          <h3 className="story-title">A new tool request. An existing seat.</h3>
          <Conversation
            channel="employee-help"
            messages={[
              [
                "Team member",
                "Can I get access to the research tool before Monday?",
              ],
              [
                "Nori",
                "We already have an unused seat. I’ve assigned it and sent your access link.",
              ],
              ["Team member", "I’m in. Thank you."],
              ["Nori", "Access checked. The inventory is updated."],
            ]}
          />
        </div>
        <div className="operations-receipts">
          <WorkSurface title="Research workspace" app="Access">
            <h4>Ready for your next project.</h4>
            <Status>Existing seat assigned</Status>
            <dl className="record">
              <div>
                <dt>Account</dt>
                <dd>Team member</dd>
              </div>
              <div>
                <dt>Access</dt>
                <dd>Verified</dd>
              </div>
              <div>
                <dt>Inventory</dt>
                <dd>Updated</dd>
              </div>
            </dl>
          </WorkSurface>
          <WorkSurface title="When a new service is needed" app="Procurement">
            <Checklist
              items={[
                "Requirements and suitable options compared",
                "Purchase within the authorized budget",
                "Setup verified; renewal recorded",
              ]}
            />
          </WorkSurface>
        </div>
      </div>
      <div className="hiring-story">
        <div className="editorial-copy">
          <p className="eyebrow">People, ready to do their best work</p>
          <h3>
            From an offer
            <br />
            to a first day.
          </h3>
          <p>
            Nori coordinates cross-border hiring, visa sponsorship, contracts,
            payroll, benefits, and accounts. It chooses suitable services and
            carries the setup through.
          </p>
          <p>
            When a provider needs a person’s identity check or signature, Nori
            finds the right person, follows up, and continues the work.
          </p>
        </div>
        <WorkSurface title="New colleague · onboarding" app="People">
          <h4>Everything a first day needs.</h4>
          <div className="onboarding-row">
            <span>Employment services</span>
            <b>Country & EOR options</b>
          </div>
          <div className="onboarding-row">
            <span>Visa sponsorship</span>
            <b>Specialist coordination</b>
          </div>
          <div className="onboarding-row">
            <span>Verification & signing</span>
            <b>Designated person</b>
          </div>
          <div className="onboarding-row">
            <span>Payroll, benefits & accounts</span>
            <b>Connected setup</b>
          </div>
          <p className="small-copy">
            Includes specialized nonprofit H-1B processes and E-Verify through
            applicable professional services.
          </p>
        </WorkSurface>
      </div>
      <div className="operations-bottom">
        <article>
          <h3>Time off. Covered.</h3>
          <p>
            Handle PTO and sick leave, check balances, and coordinate coverage.
            Keep payroll inputs and provider exceptions moving every cycle.
          </p>
          <div className="mini-record">
            <span>Leave request</span>
            <b>Coverage arranged</b>
            <span>Payroll question</span>
            <b>Provider follow-up</b>
          </div>
        </article>
        <article>
          <h3>Travel, without the loose ends.</h3>
          <p>
            Arrange the right travel service, coordinate bookings, organize
            receipts, and follow reimbursements through to the result.
          </p>
          <div className="mini-record">
            <span>Trip arrangements</span>
            <b>Itinerary connected</b>
            <span>Expense claim</span>
            <b>Receipt matched</b>
          </div>
        </article>
        <article>
          <h3>Decisions that become work.</h3>
          <p>
            Prepare quarterly meeting packs, coordinate board proposals and
            voting, then keep decisions connected to owners and weekly
            execution.
          </p>
          <div className="mini-record">
            <span>Quarterly meeting</span>
            <b>Decision recorded</b>
            <span>Next review</span>
            <b>Progress & blockers</b>
          </div>
        </article>
      </div>
      <ScenarioNote />
    </section>
  );
}
