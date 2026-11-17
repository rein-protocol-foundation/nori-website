import { SectionLabel } from "./Section";
import { Avatar, ProductScene, UiIcon } from "./ProductScenes";
import "../../styles/finance-scenes.css";

function FinanceIcon({ name }: { name: string }) {
  const paths: Record<string, string> = {
    video: "M3 6h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3V6Zm14 4 5-3v10l-5-3",
    chevron: "m14 5-7 7 7 7",
    wave: "M4 10v4m4-7v10m4-13v16m4-13v10m4-7v4",
    bank: "m2 9 10-6 10 6H2Zm3 3v7m7-7v7m7-7v7M2 22h20",
    chain: "m8 8 4-5 8 5v8l-8 5-8-5V8l8 5 8-5m-8 5v8M4 8l8-5",
    card: "M3 5h18v14H3V5Zm0 5h18M6 15h4",
    layers: "m3 7 9-5 9 5-9 5-9-5Zm0 5 9 5 9-5M3 17l9 5 9-5",
    arrow: "M4 12h16m-6-6 6 6-6 6",
    sliders: "M4 4v16m8-16v16m8-16v16M1 9h6m2 6h6m2-8h6",
  };
  return (
    <svg
      className="ui-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name] || paths.card} />
    </svg>
  );
}

const stripeNavigation = [
  ["home", "Home"],
  ["layers", "Balances"],
  ["arrow", "Transactions"],
  ["members", "Customers"],
  ["card", "Product catalog"],
];

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
            <SectionLabel number="03">Resources & responsibility</SectionLabel>
            <h2 id="resources-title">
              A message becomes
              <br />
              <span className="muted-title">a financial workflow.</span>
            </h2>
          </div>
          <p className="heading-aside">
            Nori prepares the work, connects the records, and brings the right
            person in at the point of authorization.
          </p>
        </div>
        <ProductScene
          className="finance-demo finance-native"
          label="A full iPhone iMessage screen beside a Stripe invoice draft, pending owner authorization, and project ledger"
        >
          <div className="fin-request-column">
            <div className="fin-surface-label">
              <span>01 / Request</span>
              <b>iMessage · iPhone 17 Pro</b>
            </div>
            <div className="fin-imessage">
              <div className="fin-ios-status" aria-hidden="true">
                <b>9:41</b>
                <span className="fin-dynamic-island" />
                <span className="fin-ios-indicators">
                  <span className="fin-cellular">
                    <i />
                    <i />
                    <i />
                    <i />
                  </span>
                  <svg viewBox="0 0 20 16">
                    <path d="M2 5c5-4 11-4 16 0M5 8c3-3 7-3 10 0m-7 3c1-1 3-1 4 0" />
                    <circle cx="10" cy="14" r="1" />
                  </svg>
                  <svg className="fin-battery" viewBox="0 0 28 16">
                    <rect x="1" y="2" width="23" height="12" rx="3" />
                    <path d="M26 6v4" />
                    <rect
                      className="fin-battery-fill"
                      x="3"
                      y="4"
                      width="19"
                      height="8"
                      rx="1"
                    />
                  </svg>
                </span>
              </div>
              <header className="fin-imessage-header">
                <span className="fin-glass-control">
                  <FinanceIcon name="chevron" />
                </span>
                <div className="fin-contact">
                  <Avatar />
                  <b>
                    Nori <span>›</span>
                  </b>
                </div>
                <span className="fin-glass-control">
                  <FinanceIcon name="video" />
                </span>
              </header>
              <div className="fin-conversation">
                <p className="fin-message-time">
                  Today <strong>9:41 AM</strong>
                </p>
                <div className="fin-bubble fin-sent">
                  Prepare an invoice for four workshop places, $60 each.
                </div>
                <span className="fin-read">Read 9:41 AM</span>
                <div className="fin-bubble fin-received scene-step scene-step-1">
                  The $240 draft is ready. I’ve linked the event and routed it
                  to Maya for review.
                </div>
                <div className="fin-message-file scene-step scene-step-2">
                  <UiIcon name="file" />
                  <div>
                    <b>Workshop invoice</b>
                    <span>INV–014 · Draft · $240.00</span>
                  </div>
                </div>
                <div className="fin-bubble fin-sent fin-followup">
                  Keep it as a draft for Maya.
                </div>
                <span className="fin-read">Read 9:42 AM</span>
              </div>
              <div className="fin-composer" aria-hidden="true">
                <span className="fin-compose-plus">＋</span>
                <span className="fin-compose-field">
                  iMessage <FinanceIcon name="wave" />
                </span>
              </div>
              <div className="fin-ios-home" aria-hidden="true">
                <span />
              </div>
            </div>
            <div className="fin-owner-review scene-step scene-step-3">
              <div className="fin-review-heading">
                <span>03 / Owner review</span>
                <UiIcon name="lock" />
              </div>
              <div className="fin-review-person">
                <Avatar name="Maya" />
                <div>
                  <b>Maya’s authorization</b>
                  <span>Pending · sending is not yet authorized</span>
                </div>
              </div>
            </div>
          </div>
          <div className="fin-invoice-column">
            <div className="fin-surface-label">
              <span>02 / Prepare</span>
              <b>Stripe · invoice draft</b>
              <span className="fin-mobile-detail">Invoice detail crop</span>
            </div>
            <div className="fin-stripe-crop">
              <div className="fin-stripe">
                <aside
                  className="fin-stripe-sidebar"
                  aria-label="Stripe application navigation preview"
                >
                  <div className="fin-stripe-account">
                    <span className="fin-account-icon">W</span>
                    <b>Workshop</b>
                    <span>⌄</span>
                  </div>
                  <div className="fin-stripe-nav">
                    {stripeNavigation.map(([icon, label]) => (
                      <span key={label}>
                        {["home", "members"].includes(icon) ? (
                          <UiIcon name={icon} />
                        ) : (
                          <FinanceIcon name={icon} />
                        )}
                        {label}
                      </span>
                    ))}
                    <small>Shortcuts</small>
                    <span className="fin-stripe-selected">
                      <UiIcon name="file" />
                      Invoices
                    </span>
                    <small>Products</small>
                    <span>
                      <FinanceIcon name="layers" />
                      Connect <i>⌄</i>
                    </span>
                    <span>
                      <FinanceIcon name="card" />
                      Payments <i>⌄</i>
                    </span>
                    <span className="fin-stripe-product">
                      <UiIcon name="file" />
                      Billing <i>⌄</i>
                    </span>
                    <span>
                      <FinanceIcon name="sliders" />
                      Reporting <i>⌄</i>
                    </span>
                    <span className="fin-stripe-more">
                      ••• <span>More</span>
                      <i>⌄</i>
                    </span>
                  </div>
                  <div className="fin-stripe-developers">
                    ⌘ <span>Developers</span>
                  </div>
                </aside>
                <div className="fin-stripe-main">
                  <header className="fin-stripe-toolbar">
                    <span className="fin-stripe-search">
                      <UiIcon name="search" />
                      Search
                    </span>
                    <span className="fin-stripe-tools">
                      <span>?</span>
                      <UiIcon name="bell" />
                      <FinanceIcon name="sliders" />
                      <b>＋</b>
                    </span>
                  </header>
                  <div className="fin-invoice-content scene-step scene-step-2">
                    <div className="fin-invoice-breadcrumb">
                      Billing <span>/</span> Invoices <span>/</span> INV–014
                    </div>
                    <div className="fin-invoice-title">
                      <h3>Workshop registration</h3>
                      <span className="fin-draft">Draft</span>
                    </div>
                    <div className="fin-invoice-amount">
                      $240.00 <span>USD</span>
                    </div>
                    <div
                      className="fin-invoice-actions"
                      aria-label="Invoice action preview"
                    >
                      <span className="fin-edit-action">Edit draft</span>
                      <span>Preview invoice</span>
                      <span>•••</span>
                    </div>
                    <div className="fin-invoice-tabs">
                      <b>Overview</b>
                      <span>Activity</span>
                    </div>
                    <div className="fin-invoice-overview">
                      <div>
                        <span>Customer</span>
                        <b>Workshop attendee</b>
                      </div>
                      <div>
                        <span>Invoice number</span>
                        <b>INV–014</b>
                      </div>
                      <div>
                        <span>Collection method</span>
                        <b>Send invoice</b>
                      </div>
                      <div>
                        <span>Event</span>
                        <b>Community workshop</b>
                      </div>
                    </div>
                    <h4>Invoice items</h4>
                    <table className="fin-invoice-table">
                      <caption className="sr-only">
                        Four workshop places at 60 dollars each, totaling 240 US
                        dollars
                      </caption>
                      <thead>
                        <tr>
                          <th>Description</th>
                          <th>Qty</th>
                          <th>Unit price</th>
                          <th>Amount</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Workshop place</td>
                          <td>4</td>
                          <td>$60.00</td>
                          <td>$240.00</td>
                        </tr>
                      </tbody>
                    </table>
                    <div className="fin-invoice-totals">
                      <div>
                        <span>Subtotal</span>
                        <b>$240.00</b>
                      </div>
                      <div>
                        <strong>Total</strong>
                        <strong>$240.00 USD</strong>
                      </div>
                    </div>
                    <div className="fin-stripe-draft-note">
                      <UiIcon name="file" />
                      <span>Draft saved</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="fin-project-ledger scene-step scene-step-4">
              <div className="fin-ledger-heading">
                <span>
                  <UiIcon name="file" />
                  <b>04 / Project ledger</b>
                </span>
                <small>Linked by Nori</small>
              </div>
              <div className="fin-ledger-record">
                <span>
                  Workshop <b>INV–014</b>
                </span>
                <strong>$240.00 USD</strong>
                <span className="fin-pending">Awaiting review</span>
              </div>
            </div>
          </div>
        </ProductScene>
        <div
          className="fin-infrastructure"
          aria-labelledby="finance-infra-title"
        >
          <div className="fin-infra-intro">
            <div>
              <span className="overline">Planned workflows</span>
              <h3 id="finance-infra-title">
                A clear next step.
                <br />
                For every commitment.
              </h3>
            </div>
            <p>
              From a contributor’s stipend to the workshop’s venue and
              registrations, Nori prepares the records people need to decide.
            </p>
          </div>
          <article className="fin-workflow fin-safe-workflow">
            <div className="fin-workflow-copy">
              <span className="fin-workflow-number">
                01 / Blockchain · Contributor stipend
              </span>
              <h4>
                300 USDC for the person
                <br />
                who made it happen.
              </h4>
              <p>
                The workshop budget includes a contributor stipend. Nori links
                the commitment to its budget and prepares a Safe multisig
                transfer proposal.
              </p>
              <div className="fin-workflow-result">
                <UiIcon name="members" />
                <span>Next: 2 of 3 signers review and approve.</span>
              </div>
            </div>
            <div
              className="fin-safe-artifact fin-payment-artifact"
              aria-label="Safe contributor stipend transfer proposal awaiting two of three signer approvals"
            >
              <div className="fin-safe-header">
                <FinanceIcon name="chain" />
                <b>Safe</b>
                <span>Workshop treasury</span>
              </div>
              <div className="fin-safe-tabs">
                <b>
                  Queue <span>1</span>
                </b>
                <span>History</span>
              </div>
              <div className="fin-safe-transfer">
                <span className="fin-token-icon">$</span>
                <div>
                  <small>Transfer proposal</small>
                  <strong>
                    300 <span>USDC</span>
                  </strong>
                </div>
                <span className="fin-artifact-status">Awaiting signatures</span>
              </div>
              <dl className="fin-artifact-details">
                <div>
                  <dt>Recipient</dt>
                  <dd>Workshop contributor</dd>
                </div>
                <div>
                  <dt>Budget</dt>
                  <dd>Workshop / contributor stipend</dd>
                </div>
              </dl>
              <div className="fin-safe-confirmations">
                <span className="fin-signer-circles">
                  <i>M</i>
                  <i>A</i>
                  <i>S</i>
                </span>
                <span>
                  <b>0 approvals</b> · 2 of 3 signers required
                </span>
              </div>
            </div>
          </article>
          <article className="fin-workflow fin-bank-workflow">
            <div className="fin-workflow-copy">
              <span className="fin-workflow-number">
                02 / Bank · Venue payment
              </span>
              <h4>
                A $480 invoice.
                <br />A $600 approved budget.
              </h4>
              <p>
                Nori matches the venue invoice and payee, checks it against the
                approved venue budget, and prepares an ACH payment for owner
                review.
              </p>
              <div className="fin-workflow-result">
                <FinanceIcon name="bank" />
                <span>
                  $120 of the venue budget remains after the proposed expense.
                </span>
              </div>
            </div>
            <div
              className="fin-bank-artifact fin-payment-artifact"
              aria-label="ACH payment preparation for a 480 dollar venue invoice awaiting owner review"
            >
              <header>
                <FinanceIcon name="bank" />
                <b>Payment review</b>
                <span>ACH</span>
              </header>
              <div className="fin-bank-payee">
                <span>Pay to</span>
                <b>Workshop venue</b>
                <strong>
                  $480.00 <small>USD</small>
                </strong>
              </div>
              <div className="fin-bank-matched">
                <UiIcon name="check" />
                Invoice and payee matched <span>Venue invoice</span>
              </div>
              <dl className="fin-bank-budget">
                <div>
                  <dt>Approved venue budget</dt>
                  <dd>$600.00</dd>
                </div>
                <div>
                  <dt>Proposed expense</dt>
                  <dd>−$480.00</dd>
                </div>
                <div>
                  <dt>Budget remaining after proposal</dt>
                  <dd>$120.00</dd>
                </div>
              </dl>
              <div className="fin-bank-review">
                <Avatar name="Maya" />
                <span>Owner review</span>
                <b>Awaiting authorization</b>
              </div>
            </div>
          </article>
          <article className="fin-workflow fin-collection-workflow">
            <div className="fin-workflow-copy">
              <span className="fin-workflow-number">
                03 / Stripe + PayPal · Registrations
              </span>
              <h4>
                Four places at $60.
                <br />
                One connected record.
              </h4>
              <p>
                Nori prepares the $240 Stripe invoice and reconciles
                registration records from Stripe and PayPal with the project
                ledger.
              </p>
              <div className="fin-workflow-result">
                <UiIcon name="file" />
                <span>
                  INV–014 stays in Draft, awaiting Maya’s authorization.
                </span>
              </div>
            </div>
            <div
              className="fin-collections-artifact"
              aria-label="Proposed reconciliation of Stripe and PayPal workshop registrations to the project ledger"
            >
              <header>
                <span>Workshop / registration records</span>
                <UiIcon name="file" />
              </header>
              <table>
                <caption className="sr-only">
                  Four registration requests, two from Stripe and two from
                  PayPal, totaling 240 dollars
                </caption>
                <thead>
                  <tr>
                    <th>Source</th>
                    <th>Places</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <span className="fin-source-stripe">S</span>Stripe
                    </td>
                    <td>2 × $60</td>
                    <td>$120.00</td>
                  </tr>
                  <tr>
                    <td>
                      <span className="fin-source-paypal">P</span>PayPal
                    </td>
                    <td>2 × $60</td>
                    <td>$120.00</td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td>Registration total</td>
                    <td>4 places</td>
                    <td>$240.00</td>
                  </tr>
                </tfoot>
              </table>
              <div className="fin-collections-ledger">
                <span>
                  <UiIcon name="file" />
                  <b>Project ledger</b>
                  <small>INV–014 · $240.00 USD</small>
                </span>
                <span className="fin-pending">Awaiting review</span>
              </div>
            </div>
          </article>
        </div>
        <div className="authority-strip">
          <div className="authority-intro">
            <span className="overline">Designed authority model</span>
            <h3>
              One scope.
              <br /> Clear boundaries.
            </h3>
          </div>
          <div className="authority-layer">
            <UiIcon name="lock" />
            <div>
              <b>Organizational reserves</b>
              <span>Independent control</span>
            </div>
          </div>
          <div className="authority-layer">
            <UiIcon name="file" />
            <div>
              <b>Project budgets</b>
              <span>Assigned purpose</span>
            </div>
          </div>
          <div className="authority-layer">
            <Avatar />
            <div>
              <b>Nori’s working allocation</b>
              <span>Infrastructure-enforced limits</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
