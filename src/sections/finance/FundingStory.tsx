import { WorkSurface } from "../../components/artifacts/WorkSurface";
import { WorkTable } from "../../components/artifacts/WorkTable";
export function FundingStory() {
  return (
    <div className="funding-story story-block">
      <div className="story-lead">
        <p className="eyebrow">
          Fundraising, accounting & long-term relationships
        </p>
        <h3>
          From an opportunity
          <br />
          to lasting support.
        </h3>
        <p>
          Follow a community program from its first funding conversation through
          a proposal, commitment, incoming funds, project spending, and the next
          supporter update.
        </p>
      </div>
      <div className="funding-composition">
        <WorkSurface
          title="Community program · funding brief"
          app="Document"
          className="funding-brief"
        >
          <p className="document-kicker">
            Development officer / working example
          </p>
          <h4>Find support that fits the mission.</h4>
          <WorkTable
            caption="Opportunity and relationship record"
            columns={["Work", "Deliverable"]}
            rows={[
              ["Research", "Mission-aligned grantmakers, donors, and sponsors"],
              ["Outreach", "Relevant introduction and fundraising-event brief"],
              [
                "Proposal",
                "Project plan, budget, evidence, and requested support",
              ],
              ["Commitment", "Terms, responsible contact, and next check-in"],
              ["Incoming funds", "Receipt checked against the commitment"],
              [
                "Relationship",
                "Project progress and next conversation prepared",
              ],
            ]}
          />
          <p className="small-copy">
            For organizations with investors, the same follow-through supports
            financing materials and investor relations.
          </p>
        </WorkSurface>
        <div className="reporting-stack">
          <WorkSurface title="Project close & reporting" app="Document">
            <h4>Keep the evidence with the expense.</h4>
            <dl className="meeting-record">
              <div>
                <dt>Project spending</dt>
                <dd>
                  Budget, invoice, receipt, and purchase purpose linked in the
                  accounting record.
                </dd>
              </div>
              <div>
                <dt>Accounting, audit & tax services</dt>
                <dd>
                  Suitable provider selected and engaged. Materials organized;
                  exceptions and deadlines followed through to the service
                  result.
                </dd>
              </div>
              <div>
                <dt>CFO report</dt>
                <dd>
                  Financial position, budget commitments, unresolved items, and
                  next decisions prepared for the appropriate human audience.
                </dd>
              </div>
            </dl>
          </WorkSurface>
          <WorkSurface title="Supporter update" app="Mail">
            <p className="document-kicker">Draft / community program</p>
            <h4>The work your support makes possible.</h4>
            <p>
              Here is the program’s progress, the resources committed, and what
              comes next. The update connects back to the original purpose and
              the next agreed conversation.
            </p>
          </WorkSurface>
        </div>
      </div>
    </div>
  );
}
