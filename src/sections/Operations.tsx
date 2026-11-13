import { SectionHeading, ScenarioNote } from "../components/layout/Section";
import { Conversation } from "../components/artifacts/Conversation";
import {
  WorkSurface,
  Checklist,
  Status,
} from "../components/artifacts/WorkSurface";
import "./operations.css";
import { HiringStory } from "./operations/HiringStory";
import { EmployeeServices } from "./operations/EmployeeServices";
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
        From visa sponsorship and hiring across borders to payroll, time off,
        and travel expenses, Nori brings the right services together and carries
        the work through.
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
      <HiringStory />
      <EmployeeServices />
      <ScenarioNote />
    </section>
  );
}
