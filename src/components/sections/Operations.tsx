import { WorkCells } from './WorkCells';
import { SectionLabel } from './Section';
import { WorkApp, Message } from './WorkApp';

function StoryHeading({ number, label, title, id }: { number: string; label: string; title: string; id: string }) {
  return <div className="work-story-heading"><p className="work-story-label"><span>{number}</span>{label}</p><h3 id={id}>{title}</h3></div>;
}
export function Operations() {
  return <section className="section work-redesign" id="work" aria-labelledby="work-title">
    <WorkCells />
    <div className="section-inner">
      <SectionLabel number="02">Work, connected</SectionLabel>
      <h2 id="work-title">One request.<br /><strong>A whole thread of work.</strong></h2>
      <p className="new-lead">A named owner, a next step, and a record the next person can pick up.</p>
      <div className="work-stories">
        <article className="work-story" aria-labelledby="work-story-people-ops">
          <StoryHeading number="01" label="Onboarding" id="work-story-people-ops" title="From an offer to ready for day one." />
          <WorkApp channel="people-ops">
            <Message name="Maya"><p>Alex starts Monday. I’m away Friday—can you coordinate onboarding and bring any blockers to Sam?</p></Message>
            <Message name="Nori"><p>The signed offer is linked. IT access is still open; Maya has confirmed the start date for payroll. Sam has the handoff and the checklist below.</p>
              <div className="app-document"><b>Day-one checklist · Alex</b><p>Signed offer → personnel folder</p><p>IT access → Sam · Friday · Pending</p><p>Payroll start date → Maya · Thursday · Confirmed</p><p>Orientation → Sam · Monday, 10:00 AM · Scheduled</p></div>
            </Message>
            <Message name="Sam"><p>I’ll verify Alex’s sign-in Friday and lead Monday’s orientation.</p></Message>
            <Message name="Nori"><p>Sam is now the access owner. The open sign-in check stays in the handoff until it’s verified.</p></Message>
          </WorkApp>
          <p className="example-caption">Illustrative Slack workflow · Sample people, dates, and work records</p>
          <div className="onboarding-deliverables">
            <div><span className="overline">Google Docs / handoff</span><h4>Friday coverage</h4><p>Sam covers Maya’s absence. Signed offer and approved start date are linked; sign-in verification remains open.</p></div>
            <div><span className="overline">Calendar / orientation</span><h4>Monday · 10:00–10:30 AM</h4><p>Sam + Alex · Team introductions, account check, and first-week priorities.</p></div>
            <div><span className="overline">GitHub / IT task</span><h4>Verify Alex’s account</h4><p>Assigned to Sam · Due Friday. Close after Alex confirms sign-in and the correct workspace access.</p></div>
          </div>
        </article>
        <article className="work-story access-story" aria-labelledby="work-story-help-desk">
          <StoryHeading number="02" label="Tool access" id="work-story-help-desk" title="A request. The right access. Work continues." />
          <div className="access-request"><b>Alex requests a design-tool seat</b><p>AI safety workshop · Editor access · One unused team seat available</p></div>
          <ol className="access-states">
            <li><span className="record-status">01 / Requested</span><h4>Scope recorded</h4><p>Nori attaches the workshop brief and editor-access requirement to the seat reassignment.</p></li>
            <li><span className="record-status">02 / Awaiting approval</span><h4>Maya · workspace owner</h4><p>Review the reassignment by Thursday. The existing seat stays unchanged until approval.</p></li>
            <li><span className="record-status">03 / Verification pending</span><h4>Alex · sign-in check</h4><p>After approval and provisioning, confirm sign-in and editing access before closing the request.</p></li>
          </ol>
          <p className="example-caption">Illustrative access workflow · Approval and successful sign-in are separate states</p>
        </article>
        <article className="work-story" aria-labelledby="work-story-board-prep">
          <StoryHeading number="03" label="Governance" id="work-story-board-prep" title="The meeting ends. The work keeps moving." />
          <div className="governance-records">
            <div className="board-packet"><span className="overline">Google Docs / board packet · Draft</span><h4>Quarterly review</h4><p>Thursday · 2:00 PM · Prepared for board review</p><dl>
              <div><dt>For decision</dt><dd>Approve the next workshop’s scope and project allocation. Budget owner review is still open.</dd></div>
              <div><dt>For discussion</dt><dd>Contributor coverage: Sam’s onboarding handoff and the remaining access check.</dd></div>
              <div><dt>For information</dt><dd>Prior-quarter decisions, program update, and outstanding commitments are linked.</dd></div>
            </dl></div>
            <div className="decision-record"><span className="overline">Decision follow-through / open items</span><h4>Carry the record forward</h4><ul><li><b>Maya · Wednesday</b><p>Attach the budget review before the packet goes to the board.</p></li><li><b>Board · Thursday</b><p>Decision pending. Record the outcome and conditions after the meeting.</p></li><li><b>Nori · After the meeting</b><p>Link the decision to its delivery task, owner, and agreed deadline.</p></li></ul></div>
          </div>
          <p className="example-caption">Illustrative board materials · No board decision or organizational result is implied</p>
        </article>
      </div>
    </div>
  </section>;
}
