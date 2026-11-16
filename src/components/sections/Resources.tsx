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
              resources to work.
            </h2>
          </div>
          <p className="heading-aside">
            Connect treasury, payments, fundraising, and everyday commerce
            through established platforms—with limited working funds for Nori
            and reserves kept separate.
          </p>
        </div>
        <article className="expense-record" aria-labelledby="expense-title">
          <div className="record-topline"><span>Project ledger / EXP-014</span><ExampleLabel>Illustrative expense record</ExampleLabel></div>
          <h3 id="expense-title">Workshop materials</h3>
          <p>Supplier quote attached · AI safety workshop · Owner: Maya</p>
          <dl className="expense-fields">
            <div><dt>Requested</dt><dd>$240 USD</dd></div>
            <div><dt>Approval</dt><dd>Awaiting budget owner</dd></div>
            <div><dt>Payment</dt><dd>Not released</dd></div>
            <div><dt>Receipt</dt><dd>Not yet received</dd></div>
          </dl>
          <p className="record-next"><b>Next action:</b> Maya reviews the quote by Friday. Payment stays pending until allocation is authorized; delivery and receipt checks follow.</p>
        </article>
        <p className="example-caption">Sample amount and work record · No transaction or integration is represented as verified</p>
        <div className="treasury-spread">
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
          <div className="funding-story finance-boundary">
            <span className="overline">Who can move the money?</span>
            <h3>Preparation is not authorization.</h3>
            <p>Nori connects the quote, project budget, and approval request. The authorized owner decides whether to allocate funds.</p>
            <p>After an authorized payment, the record still needs delivery evidence, a receipt, and reconciliation. An approval alone does not mean the work is complete.</p>
            <p className="service-examples">Designed workflow; permissions and controls depend on the selected infrastructure.</p>
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
