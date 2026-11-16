import { SectionLabel } from "./Section";
import { Avatar, ProductScene, UiIcon } from "./ProductScenes";
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
          className="finance-demo"
          label="Product walkthrough from an iMessage request to a Stripe invoice draft and an approval record"
        >
          <div className="finance-path" aria-hidden="true">
            <svg viewBox="0 0 1200 650" preserveAspectRatio="none">
              <path
                className="path-bed"
                d="M260 260C430 260 350 160 570 160S690 450 900 450"
              />
              <path
                className="path-travel"
                d="M260 260C430 260 350 160 570 160S690 450 900 450"
              />
            </svg>
          </div>
          <div className="imessage-window">
            <div className="phone-status" aria-hidden="true">
              <b>9:41</b>
              <span>▰ ▰ ▰</span>
            </div>
            <header>
              <span aria-hidden="true">‹</span>
              <div>
                <Avatar />
                <b>Nori</b>
              </div>
              <span className="phone-video" aria-hidden="true">
                ▱
              </span>
            </header>
            <p className="imessage-date">iMessage · Today, 9:41 AM</p>
            <div className="message-bubble sent">
              Prepare an invoice for four workshop places, $60 each.
            </div>
            <div className="message-bubble received scene-step scene-step-1">
              The $240 draft is ready. I’ve linked the event and routed it to
              Maya for review.
            </div>
            <div className="phone-attachment scene-step scene-step-2">
              <UiIcon name="file" />
              <div>
                <b>Workshop invoice</b>
                <span>Draft · $240.00 USD</span>
              </div>
            </div>
            <div className="phone-compose" aria-hidden="true">
              <span>＋</span>
              <span>iMessage</span>
              <span>↑</span>
            </div>
            <i className="phone-home" aria-hidden="true" />
          </div>
          <div className="finance-desktop">
            <div className="stripe-window">
              <header>
                <img
                  src="/brands/stripe.svg"
                  alt="Stripe"
                  width="50"
                  height="24"
                />
                <span>Billing / Invoices</span>
                <Avatar />
              </header>
              <div className="stripe-body">
                <aside aria-hidden="true">
                  <span>Overview</span>
                  <span>Payments</span>
                  <b>Billing</b>
                  <span className="selected">Invoices</span>
                  <span>Customers</span>
                  <span>Reports</span>
                </aside>
                <div className="invoice-content scene-step scene-step-2">
                  <div className="invoice-topline">
                    <span>INV–014</span>
                    <span className="invoice-draft">Draft</span>
                  </div>
                  <h3>Workshop registration</h3>
                  <div className="invoice-total">
                    $240.00 <span>USD</span>
                  </div>
                  <div className="invoice-customer">
                    <span>Customer</span>
                    <b>Workshop attendee</b>
                  </div>
                  <table>
                    <caption className="sr-only">Invoice line items</caption>
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th>Qty</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Workshop place</td>
                        <td>4</td>
                        <td>$240.00</td>
                      </tr>
                    </tbody>
                  </table>
                  <div className="invoice-sum">
                    <span>Total</span>
                    <b>$240.00</b>
                  </div>
                  <div className="invoice-approval scene-step scene-step-3">
                    <span className="approval-seal">
                      <UiIcon name="lock" />
                    </span>
                    <div>
                      <strong>Ready for owner review</strong>
                      <p>Maya · Sending is not yet authorized</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="ledger-slip scene-step scene-step-4">
              <div>
                <UiIcon name="file" />
                <b>Project ledger</b>
                <span>Linked by Nori</span>
              </div>
              <p>
                <span>Workshop / INV–014</span>
                <b>$240.00</b>
                <span className="status-pill amber">Awaiting review</span>
              </p>
            </div>
          </div>
        </ProductScene>
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
              <span>Bounded permissions</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
