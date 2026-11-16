import { SectionLabel } from "./Section";
import { Avatar, ProductScene, UiIcon } from "./ProductScenes";
export function Continuity() {
  return (
    <section
      className="section continuity-section"
      id="continuity"
      aria-labelledby="continuity-title"
    >
      <div className="section-inner">
        <div className="section-heading split-heading">
          <div>
            <SectionLabel number="07">The work remembers</SectionLabel>
            <h2 id="continuity-title">
              New conversation.
              <br />
              <span className="muted-title">Same context.</span>
            </h2>
          </div>
          <p className="heading-aside">
            A decision in a document. A promise in a thread. A deadline in a
            calendar. Nori connects the context that the next step depends on.
          </p>
        </div>
        <ProductScene
          className="memory-demo"
          label="Product walkthrough of Nori carrying an existing commitment into a new conversation"
        >
          <div className="memory-sources">
            <div>
              <UiIcon name="file" />
              <span>
                <b>Board decision</b>
                <small>Workshop scope · Last quarter</small>
              </span>
              <span>01</span>
            </div>
            <div>
              <UiIcon name="chat" />
              <span>
                <b>Team handoff</b>
                <small>Sam owns the next check-in</small>
              </span>
              <span>02</span>
            </div>
            <div>
              <UiIcon name="calendar" />
              <span>
                <b>Supporter update</b>
                <small>Due next month</small>
              </span>
              <span>03</span>
            </div>
          </div>
          <div className="memory-center" aria-hidden="true">
            <span />
            <Avatar />
            <span />
          </div>
          <div className="memory-answer">
            <div>
              <Avatar />
              <b>Nori</b>
              <span>Same work. Next chapter.</span>
            </div>
            <h3>Here’s where we left off.</h3>
            <p>
              The workshop scope is agreed. Sam owns the next check-in. The
              supporter update is due next month.
            </p>
            <div className="memory-citations">
              <span>01 Board decision</span>
              <span>02 Handoff</span>
              <span>03 Calendar</span>
            </div>
            <div className="memory-next">
              <UiIcon name="check" />
              <span>The next step: prepare Sam’s briefing.</span>
            </div>
          </div>
        </ProductScene>
      </div>
    </section>
  );
}
