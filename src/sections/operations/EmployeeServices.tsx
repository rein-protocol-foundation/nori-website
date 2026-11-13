import { Conversation } from "../../components/artifacts/Conversation";
import { WorkSurface, Status } from "../../components/artifacts/WorkSurface";
import { WorkTable } from "../../components/artifacts/WorkTable";
export function EmployeeServices() {
  return (
    <>
      <div className="employee-services story-block">
        <div className="story-lead">
          <p className="eyebrow">Payroll, leave & everyday support</p>
          <h3>
            Take care of people.
            <br />
            Keep the work covered.
          </h3>
          <p>
            Employees ask once. Nori checks the record, coordinates the right
            service, resolves exceptions, and follows the result back to the
            person.
          </p>
        </div>
        <div className="payroll-leave">
          <WorkSurface title="Payroll cycle" app="People">
            <p className="document-kicker">Current cycle / exception review</p>
            <h4>Keep payroll moving, every cycle.</h4>
            <WorkTable
              caption="Payroll service follow-through"
              columns={["Work item", "Nori’s follow-through"]}
              rows={[
                ["Cycle inputs", "Hours, leave, and changes reconciled"],
                ["Provider exception", "Missing input routed to its owner"],
                [
                  "Employee pay question",
                  "Provider response tracked and explained",
                ],
                ["Payment result", "Batch outcome checked; record updated"],
              ]}
            />
            <div className="artifact-note">
              <b>Provider follow-up</b>
              <p>
                A leave adjustment is missing from the cycle. Nori submits the
                correction, checks the revised result, and closes the employee’s
                question.
              </p>
            </div>
          </WorkSurface>
          <div className="leave-story">
            <h4>Time off. Covered.</h4>
            <Conversation
              channel="employee-help"
              messages={[
                [
                  "Team member",
                  "I need to take sick leave today. The partner briefing is still on my calendar.",
                ],
                [
                  "Nori",
                  "I’ve updated the leave request in the HR service and checked the balance. The covering teammate has the briefing notes; the calendar and payroll input are updated.",
                ],
              ]}
            />
            <div className="coverage-strip">
              <b>PTO & sick leave</b>
              <span>Request recorded · balance checked · handoff arranged</span>
            </div>
          </div>
        </div>
      </div>
      <div className="travel-governance story-block">
        <div className="travel-story">
          <div className="story-lead">
            <p className="eyebrow">Travel & reimbursement</p>
            <h3>A trip with fewer loose ends.</h3>
            <p>
              Nori compares suitable travel services, arranges flights and
              lodging, and keeps the itinerary connected to the event.
              Afterward, it collects receipts and follows reimbursement through
              to payment.
            </p>
          </div>
          <WorkSurface title="Conference trip" app="Calendar">
            <div className="itinerary">
              <div>
                <span>BEFORE THE TRIP</span>
                <h4>Travel arrangements</h4>
                <p>
                  Service selected within budget.
                  <br />
                  Flight and hotel confirmations organized.
                  <br />
                  Speaker schedule connected to itinerary.
                </p>
              </div>
              <div>
                <span>AFTER THE TRIP</span>
                <h4>Expense follow-through</h4>
                <p>
                  Receipts matched to purpose.
                  <br />
                  Missing invoice requested from the provider.
                  <br />
                  Reimbursement result checked.
                </p>
              </div>
            </div>
            <Status>Itinerary, receipts, and expense record connected</Status>
          </WorkSurface>
        </div>
        <div className="governance-story">
          <div className="story-lead">
            <p className="eyebrow">Governance & executive accountability</p>
            <h3>Decisions that become work.</h3>
            <p>
              Turn quarterly goals into a meeting pack, a recorded decision, and
              weekly follow-through. The COO reports outcomes and open decisions
              to the organization’s people.
            </p>
          </div>
          <WorkSurface title="Quarterly operations review" app="Document">
            <p className="document-kicker">
              Board meeting pack / working example
            </p>
            <h4>Community program continuation</h4>
            <dl className="meeting-record">
              <div>
                <dt>Before the meeting</dt>
                <dd>
                  Progress, blockers, budget commitments, and a proposal to
                  continue office hours.
                </dd>
              </div>
              <div>
                <dt>At the meeting</dt>
                <dd>
                  Board materials circulated; voting coordinated; decision and
                  rationale recorded.
                </dd>
              </div>
              <div>
                <dt>After the decision</dt>
                <dd>
                  Owner and next review assigned. Weekly execution reports
                  connect back to the decision.
                </dd>
              </div>
            </dl>
          </WorkSurface>
        </div>
      </div>
    </>
  );
}
