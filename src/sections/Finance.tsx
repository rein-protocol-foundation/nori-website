import { SectionHeading, ScenarioNote } from "../components/layout/Section";
import { WorkSurface, Status } from "../components/artifacts/WorkSurface";
import { NoriHead } from "../components/brand/Nori";
import "./finance.css";
import { OnchainStory } from "./finance/OnchainStory";
import { CommerceStory } from "./finance/CommerceStory";
import { FundingStory } from "./finance/FundingStory";
export function Finance() {
  return (
    <section id="finance" className="section finance">
      <SectionHeading
        label="Finance & resources"
        title={
          <>
            Put the organization’s
            <br />
            resources to work.
          </>
        }
      >
        Connect treasury, payments, fundraising, and everyday commerce through
        established platforms—with limited working funds for Nori and reserves
        kept separate.
      </SectionHeading>
      <div className="finance-main">
        <WorkSurface
          title="Workshop expense"
          app="Mail"
          className="expense-surface"
        >
          <h3>The receipt that closes the loop.</h3>
          <p>Turn a spending request into a completed, coded record.</p>
          <div className="mail-message">
            <b>Missing purpose: workshop expense</b>
            <p>
              This expense is missing its purpose. Which workshop was it for,
              and can you share the receipt?
            </p>
          </div>
          <div className="mail-message nori-mail">
            <NoriHead />
            <div>
              <b>Nori</b>
              <p>
                Matched to the workshop booking. Receipt attached; project
                coding is ready for review.
              </p>
            </div>
          </div>
          <div className="attachment">
            <span aria-hidden="true">▤</span>
            <div>
              <b>Workshop booking</b>
              <p>Receipt · purpose · project budget</p>
            </div>
            <Status>Matched</Status>
          </div>
        </WorkSurface>
        <div className="treasury">
          <h3>
            Limited working funds.
            <br />
            Separate reserves.
          </h3>
          <p>
            Keep operating liquidity, project budgets, and reserves distinct.
          </p>
          <div className="treasury-layer">
            <span>01</span>
            <div>
              <h4>Organization reserves</h4>
              <p>
                Independent custody, cold wallet, or multisig. Nori does not
                hold reserve keys.
              </p>
            </div>
          </div>
          <div className="treasury-layer">
            <span>02</span>
            <div>
              <h4>Project budgets</h4>
              <p>
                Purpose-bound allocations. Replenishment controlled
                independently.
              </p>
            </div>
          </div>
          <div className="treasury-layer hot-wallet">
            <span>03</span>
            <div>
              <h4>Nori’s hot wallet</h4>
              <p>Enforced balance, transaction, and cycle limits.</p>
            </div>
          </div>
          <p className="small-copy">
            Nori cannot raise its own limits or bypass them through contract
            approvals.
          </p>
        </div>
      </div>
      <OnchainStory />
      <CommerceStory />
      <FundingStory />
      <ScenarioNote />
    </section>
  );
}
