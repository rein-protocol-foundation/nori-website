import { SectionLabel } from "./Section";
import { WorkApp, Message } from "./WorkApp";
export function Community() {
  return (
    <section
      className="section"
      id="community"
      aria-labelledby="community-title"
    >
      <div className="section-inner">
        <SectionLabel number="04">Built together</SectionLabel>
        <h2 id="community-title">
          A hello becomes
          <br />
          <strong>a first contribution.</strong>
        </h2>
        <p className="new-lead">
          A welcoming community needs more than a welcome message. Give people a
          useful place to start—and stay with them through the work.
        </p>
        <WorkApp app="Discord" channel="contribute">
          <Message name="Alex">
            <p>
              Hi! I know TypeScript and have a few hours this weekend. Where can
              I help?
            </p>
          </Message>
          <Message name="Nori">
            <p>
              Welcome, Alex! There’s a small retry bug in donation
              confirmations. Here’s a scoped first task, with a sanitized
              reproduction and a test to start from.
            </p>
            <div className="app-document">
              <b>your-organization / project</b>
              <h4>Cover duplicate confirmation events</h4>
              <p>OPEN ISSUE · Good first contribution</p>
              <p>Expected: a repeated event creates one confirmation record.</p>
              <p>
                1. Reproduce with the sample fixture
                <br />
                2. Add the regression test
                <br />
                3. Open a PR for independent review
              </p>
            </div>
          </Message>
          <Message name="Alex">
            <p>
              I can take that. Could someone review my test before I work on the
              fix?
            </p>
          </Message>
          <Message name="Nori">
            <p>
              Yes. I’ll coordinate a reviewer and keep the issue updated. If the
              scope grows into paid work, we’ll agree deliverables and an
              authorized budget before proceeding.
            </p>
          </Message>
        </WorkApp>
        <p className="example-caption">
          Illustrative Discord conversation · Participation is voluntary; paid
          and volunteer work remain distinct
        </p>
      </div>
    </section>
  );
}
