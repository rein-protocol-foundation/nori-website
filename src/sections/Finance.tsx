import { SectionHeading, ScenarioNote } from "../components/layout/Section";
import {
  WorkSurface,
  Checklist,
  Status,
} from "../components/artifacts/WorkSurface";
import { NoriHead } from "../components/brand/Nori";
import "./finance.css";
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
        Treasury, payments, fundraising, and everyday commerce—through
        established platforms.
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
      <div className="finance-stories">
        <article>
          <p className="eyebrow">On-chain execution</p>
          <h3>
            From project request
            <br />
            to contract result.
          </h3>
          <p>
            Prepare permitted payments and smart-contract interactions, execute
            within working limits, and link the verified result to the project.
          </p>
          <div className="contract-note">
            <b>Project grant</b>
            <Checklist
              items={[
                "Purpose and allocation checked",
                "Contract interaction prepared",
                "Result reconciled with project record",
              ]}
            />
            <span>Ethereum · BNB Chain · Solana</span>
          </div>
          <p className="small-copy">
            Insurance and custody are ongoing work too: select suitable
            services, maintain coverage summaries, and follow renewals. Coverage
            depends on the service obtained.
          </p>
        </article>
        <article>
          <p className="eyebrow">Storefront & donations</p>
          <h3>
            Keep support connected
            <br />
            to the mission.
          </h3>
          <p>
            Maintain digital products, event offers, payment links, and donation
            entrances. Follow orders, delivery, receipts, and applicable
            refunds.
          </p>
          <div className="storefront">
            <div className="digital-cover">
              <span>REIN / FIELD NOTES</span>
              <strong>
                Safer agents.
                <br />
                Shared knowledge.
              </strong>
              <small>Digital publication · product example</small>
            </div>
            <div>
              <b>Digital guide</b>
              <p>
                Payment link maintained
                <br />
                Delivery connected to order
                <br />
                Supporter follow-up prepared
              </p>
            </div>
          </div>
          <p className="small-copy">
            Stripe storefronts and supported PayPal payment workflows carry
            routine work within organizational permissions. Sales, donations,
            and grants retain separate records.
          </p>
        </article>
      </div>
      <div className="finance-footnotes">
        <article>
          <h3>Banking with the right human steps.</h3>
          <p>
            Nori prepares materials, coordinates service setup, and reconciles
            payments. People complete verification, signatures, authentication,
            or release when the bank requires them.
          </p>
        </article>
        <article>
          <h3>From opportunity to lasting support.</h3>
          <p>
            Find mission-aligned grants and sponsors, prepare proposals, follow
            commitments and incoming funds, and keep supporters informed.
            Coordinate accounting, audit, and tax services through the same
            work.
          </p>
        </article>
      </div>
      <ScenarioNote />
    </section>
  );
}
