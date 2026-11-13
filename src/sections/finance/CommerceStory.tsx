import { AppMark } from "../../components/artifacts/AppMark";
import { WorkSurface } from "../../components/artifacts/WorkSurface";
import { WorkTable } from "../../components/artifacts/WorkTable";
export function CommerceStory() {
  return (
    <div className="commerce-story story-block">
      <div className="story-lead">
        <p className="eyebrow">Storefront, payments & donations</p>
        <h3>
          Keep support connected
          <br />
          to the mission.
        </h3>
        <p>
          Run the storefront. Follow the order. Nori maintains digital products,
          event offers, payment links, and donation entrances, then follows
          delivery, receipts, and applicable refunds.
        </p>
      </div>
      <div className="commerce-composition">
        <article className="store-preview">
          <div className="store-brand">
            <b>REIN / FIELD NOTES</b>
            <span>Digital publications</span>
          </div>
          <div className="store-product">
            <div className="digital-cover">
              <span>REIN / FIELD NOTES</span>
              <strong>
                Safer agents.
                <br />
                Shared knowledge.
              </strong>
              <small>A practical field guide</small>
            </div>
            <div>
              <p className="document-kicker">Digital product example</p>
              <h4>
                Build safer agents.
                <br />
                Share what works.
              </h4>
              <p>
                A digital guide for the people building and evaluating agents.
              </p>
              <div className="store-payment">
                <AppMark app="Stripe" />
                <span>Payment link maintained</span>
              </div>
            </div>
          </div>
          <div className="store-order">
            <span>Order follow-through</span>
            <b>Payment checked · digital delivery · receipt</b>
          </div>
        </article>
        <WorkSurface title="Orders & support" app="Stripe">
          <h4>Every incoming payment has a purpose.</h4>
          <WorkTable
            caption="Separate records for distinct relationships"
            columns={["Record", "Follow-through"]}
            rows={[
              [
                "Digital guide sale",
                "Payment matched; delivery and receipt followed",
              ],
              [
                "Event registration",
                "Attendee confirmation connected to the event",
              ],
              [
                "One-time donation",
                "Acknowledgment and project context prepared",
              ],
              [
                "Recurring donation",
                "Renewal, failed payment, and supporter follow-up",
              ],
              [
                "Refund request",
                "Eligibility checked; platform result reconciled",
              ],
            ]}
          />
          <p className="small-copy">
            Sales, donations, and project grants keep separate records and
            reporting context.
          </p>
        </WorkSurface>
      </div>
      <div className="payment-banking">
        <WorkSurface title="Payment follow-up" app="PayPal">
          <h4>Routine payments, carried through.</h4>
          <p>
            Nori handles everyday bills, payment-status checks, and suitable
            small service purchases within the organization’s permissions and
            the platform’s supported scope.
          </p>
          <dl className="meeting-record">
            <div>
              <dt>A service invoice arrives</dt>
              <dd>
                Nori matches the invoice to its purchase and budget, then
                prepares the permitted payment.
              </dd>
            </div>
            <div>
              <dt>A payment needs follow-up</dt>
              <dd>
                Nori checks the platform status, resolves the exception with the
                provider, and reconciles the result.
              </dd>
            </div>
          </dl>
        </WorkSurface>
        <WorkSurface title="Banking coordination" app="Mail">
          <p className="document-kicker">
            Service setup / human action required
          </p>
          <h4>Bring in a person for the right step.</h4>
          <p>
            Nori prepares materials and coordinates banking setup, payment work,
            and reconciliation. A service such as Chase or Mercury may require a
            person’s verification, signature, authentication, or release.
          </p>
          <div className="artifact-note">
            <b>To the designated signatory</b>
            <p>
              The service materials are prepared. Please complete the bank’s
              identity verification and signing step. Nori will follow
              confirmation and continue the setup.
            </p>
          </div>
          <p className="small-copy">
            Service examples describe the ecosystem; they do not imply that
            every named platform is integrated.
          </p>
        </WorkSurface>
      </div>
      <p className="service-context">
        Organization formation has its own workstream. Nori can coordinate
        administrative services such as Stripe Atlas separately from banking,
        storefront, and payment operations.
      </p>
    </div>
  );
}
