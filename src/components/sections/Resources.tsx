import {WorkApp,Message} from './WorkApp';
import { Check, ExampleLabel, SectionLabel } from "./Section";
export function Resources() {
  return (
    <section
      className="section resources-section"
      id="resources"
      aria-labelledby="resources-title"
    >
      <div className="section-inner">
        <div className="section-heading split-heading">
          <div>
            <SectionLabel number="03">
              Resources & financial infrastructure
            </SectionLabel>
            <h2 id="resources-title">
              Put the organization’s
              <br />
              resources <strong>to work.</strong>
            </h2>
          </div>
          <p className="heading-aside">
            Connect treasury, payments, fundraising, and everyday commerce
            through established platforms—with limited working funds for Nori
            and reserves kept separate.
          </p>
        </div>
        <div className="finance-flow"><div><img src="/brands/stripe.svg" alt="Stripe"/><b>Incoming support</b><span>Donation & receipt</span></div><i/><div><img src="/brands/ethereum.svg" alt="Ethereum"/><b>Project allocation</b><span>Independent authorization</span></div><i/><div><img src="/brands/ethereum.svg" alt="Ethereum"/><b>Working wallet</b><span>Limited amount & scope</span></div><i/><div><img src="/brands/github.svg" alt="GitHub"/><b>Delivery record</b><span>Evidence & reconciliation</span></div></div><WorkApp channel="project-finance"><Message name="Maya"><p>Can we fund the workshop materials from the project budget?</p></Message><Message name="Nori"><p>I’ve prepared the request and linked the supplier quote. The project allocation needs the authorized owner’s approval; organizational reserves remain under separate control.</p><div className="app-document"><b>Workshop materials · payment preparation</b><p>Quote and project budget linked</p><p>Working-wallet limit checked</p><p>Status: awaiting authorized allocation</p><p>Next: verify delivery, reconcile receipt, update project record</p></div></Message></WorkApp><p className="example-caption">Illustrative financial workflow · Brand examples do not indicate verified integrations or completed transactions</p><div className="treasury-spread">
          <div className="treasury-model">
            <ExampleLabel>Designed treasury model</ExampleLabel>
            <h3>
              Close to the work.
              <br />
              <strong>Bounded by design.</strong>
            </h3>
            <div className="treasury-layer reserve">
              <div className="layer-symbol" aria-hidden="true">
                ▥
              </div>
              <div>
                <h4>Organizational reserves</h4>
                <p>
                  Independent custody, cold storage, or multisig. Nori does not
                  hold the control keys.
                </p>
              </div>
              <span className="layer-tag">Separate control</span>
            </div>
            <div className="treasury-layer budget">
              <div className="layer-symbol" aria-hidden="true">
                ▤
              </div>
              <div>
                <h4>Project budgets</h4>
                <p>
                  Purpose-specific allocations. Funding requests and
                  replenishment follow independent authority.
                </p>
              </div>
              <span className="layer-tag">Defined purpose</span>
            </div>
            <div className="treasury-layer working">
              <div className="layer-symbol" aria-hidden="true">
                ▦
              </div>
              <div>
                <h4>Nori’s working funds</h4>
                <p>
                  Limited balances, transaction amounts, and spending periods,
                  enforced by the infrastructure.
                </p>
              </div>
              <span className="layer-tag">Bounded access</span>
            </div>
            <p className="treasury-footnote">
              Nori cannot raise its own limits, replenish funds without
              authority, or bypass the separation through contract permissions.
            </p>
          </div>
          <div className="funding-story">
            <ExampleLabel>A community project, illustrated</ExampleLabel>
            <h3>
              From a promising idea
              <br />
              to <strong>a resourced project.</strong>
            </h3>
            <ol className="funding-notes">
              <li>
                <span>01</span>
                <div>
                  <h4>Find the support</h4>
                  <p>
                    Prepare the donation or grant opportunity, follow
                    conversations, and connect commitments to the project.
                  </p>
                </div>
              </li>
              <li>
                <span>02</span>
                <div>
                  <h4>Put a budget behind it</h4>
                  <p>
                    Compare the services needed, request project funds, and
                    arrange procurement within the agreed authority.
                  </p>
                </div>
              </li>
              <li>
                <span>03</span>
                <div>
                  <h4>Execute within the boundary</h4>
                  <p>
                    Use the limited working wallet for permitted payments and
                    contract interactions. Check the result against the request.
                  </p>
                </div>
              </li>
              <li>
                <span>04</span>
                <div>
                  <h4>Bring the record back</h4>
                  <p>
                    Connect receipts, accounting records, and the project
                    update. Let supporters know what their support makes
                    possible.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </div>
        <div className="contract-note">
          <span className="contract-seal" aria-hidden="true">
            {"{ }"}
          </span>
          <div>
            <h3>Smart contracts are working infrastructure.</h3>
            <p>
              Prepare the interaction, execute within the working wallet’s
              authority, verify the result, and connect it to the project
              record. Read contract events to follow commitments; route actions
              outside the granted scope to the appropriate people.
            </p>
          </div>
          <p className="chain-list">
            <span>BNB Chain</span>
            <span>Ethereum</span>
            <span>Solana</span>
          </p>
        </div>
        <div className="financial-work">
          <article>
            <span className="overline">Everyday payments</span>
            <h3>
              The right service.
              <br />
              The right level of autonomy.
            </h3>
            <p>
              Nori prepares banking work, follows payment status, and brings in
              the designated person when a bank requires verification, signing,
              authentication, or release.
            </p>
            <p>
              Agentic payment services can support routine bills,
              reconciliation, and small service purchases within established
              permissions and budgets.
            </p>
            <p className="service-examples">
              Ecosystem examples: Chase, Mercury, Stripe, PayPal. Illustrative
              service ecosystem; supported workflows depend on the selected
              provider.
            </p>
          </article>
          <article>
            <span className="overline">Storefront & incoming support</span>
            <h3>
              Keep support connected
              <br />
              to the mission.
            </h3>
            <p>
              Maintain a storefront for digital products, event tickets, or
              content. Keep listings and payment links current, follow orders
              through delivery, and handle receipts and applicable refund
              follow-up.
            </p>
            <p>
              Donation pages and recurring support get their own records and
              continuing supporter communication.
            </p>
            <div className="commerce-record">
              <span>Project storefront</span>
              <strong>Workshop registration</strong>
              <div>
                <Check /> Listing, payment link & delivery
              </div>
              <span>Illustrative work product</span>
            </div>
          </article>
          <article>
            <span className="overline">Records, reporting & protection</span>
            <h3>
              The work around
              <br />
              every transaction.
            </h3>
            <p>
              Connect budgets, receipts, invoices, and accounting. Arrange
              appropriate accounting, audit, and tax services, then follow
              exceptions, deadlines, and results.
            </p>
            <p>
              Source suitable insurance or custody protection, maintain coverage
              summaries, and track renewals. Coverage depends on the selected
              provider and policy; it is not assumed.
            </p>
          </article>
        </div>
        <div className="fundraising-line">
          <span className="overline">Relationships are a long game</span>
          <p>
            First conversation. Thoughtful proposal.
            <br />
            <strong>A commitment worth following through.</strong>
          </p>
          <div>
            Find aligned donors, grantmakers, and sponsors. Prepare materials,
            track commitments and incoming support, and keep people informed.
            For other organizations, the same continuity can support investor
            relationships.
          </div>
        </div>
      </div>
    </section>
  );
}
