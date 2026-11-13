import { WorkSurface, Status } from "../../components/artifacts/WorkSurface";
import { AppMark } from "../../components/artifacts/AppMark";
export function OnchainStory() {
  return (
    <div className="onchain-story story-block">
      <div className="story-lead">
        <p className="eyebrow">On-chain execution & protection</p>
        <h3>
          From project request
          <br />
          to contract result.
        </h3>
        <p>
          Nori prepares the interaction, executes within the hot wallet’s
          working limits, and connects the verified result to the project.
          Contract states and events help it follow the next commitment.
        </p>
      </div>
      <div className="onchain-composition">
        <WorkSurface
          title="Project grant"
          app="Document"
          className="contract-surface"
        >
          <p className="document-kicker">
            Contract interaction / working example
          </p>
          <h4>A project request with a bounded execution path.</h4>
          <dl className="meeting-record">
            <div>
              <dt>Purpose & allocation</dt>
              <dd>
                Support the community program. Check the grant purpose against
                its project budget.
              </dd>
            </div>
            <div>
              <dt>Contract preparation</dt>
              <dd>
                Check recipient, network, contract action, and permitted value
                before execution.
              </dd>
            </div>
            <div>
              <dt>Working-fund check</dt>
              <dd>
                Balance, per-transaction, and cycle limits apply. An
                out-of-scope request goes to the appropriate authority.
              </dd>
            </div>
            <div>
              <dt>Result & reconciliation</dt>
              <dd>
                Verify the contract result and link the execution record to the
                project’s commitment.
              </dd>
            </div>
          </dl>
          <div className="network-row">
            {["Ethereum", "BNB Chain", "Solana"].map((n) => (
              <span key={n}>
                <AppMark app={n} />
                {n}
              </span>
            ))}
          </div>
        </WorkSurface>
        <div className="protection-stack">
          <WorkSurface title="Working-fund policy" app="Treasury">
            <h4>Limits live in the infrastructure.</h4>
            <dl className="policy-lines">
              <div>
                <dt>Wallet balance</dt>
                <dd>Capped operating funds</dd>
              </div>
              <div>
                <dt>Transaction & cycle</dt>
                <dd>Enforced spending limits</dd>
              </div>
              <div>
                <dt>Replenishment</dt>
                <dd>Independent authority</dd>
              </div>
              <div>
                <dt>Reserve keys</dt>
                <dd>Outside Nori’s control</dd>
              </div>
            </dl>
            <p className="small-copy">
              Nori cannot raise its own limits, replenish without independent
              control, or bypass isolation through contract approvals.
            </p>
          </WorkSurface>
          <WorkSurface title="Insurance & custody" app="Document">
            <p className="document-kicker">Coverage review / next renewal</p>
            <h4>Protection needs follow-through, too.</h4>
            <p>
              Compare suitable custody and insurance services. Carry procurement
              through, maintain the coverage summary, and follow renewals.
            </p>
            <div className="coverage-fields">
              <span>Coverage & exclusions</span>
              <span>Provider questions</span>
              <span>Renewal owner & date</span>
            </div>
            <Status>Coverage review prepared</Status>
            <p className="small-copy">
              Protection depends on the service and coverage actually obtained.
            </p>
          </WorkSurface>
        </div>
      </div>
    </div>
  );
}
