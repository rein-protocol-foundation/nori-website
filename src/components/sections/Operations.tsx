import { SectionLabel } from "./Section";
import { SlackScene, LarkScene, BoardScene } from "./ProductScenes";
export function Operations() {
  return (
    <section
      className="section work-redesign"
      id="work"
      aria-labelledby="work-title"
    >
      <div className="section-inner">
        <div className="section-heading split-heading">
          <div>
            <SectionLabel number="02">Nori, at work</SectionLabel>
            <h2 id="work-title">
              One request.
              <br />
              <span className="muted-title">Work moves everywhere.</span>
            </h2>
          </div>
          <p className="heading-aside">
            The conversation is the starting point. Nori carries the work across
            the tools your organization already uses.
          </p>
        </div>
        <div className="work-stories application-stories">
          <article
            className="work-story"
            aria-labelledby="work-story-people-ops"
          >
            <div className="scene-heading">
              <div>
                <span className="overline">01 / People & operations</span>
                <h3 id="work-story-people-ops">
                  A new teammate. A ready first day.
                </h3>
              </div>
              <span className="ecosystem-caption">
                Slack · Google Calendar · GitHub
              </span>
            </div>
            <SlackScene />
          </article>
          <article
            className="work-story"
            aria-labelledby="work-story-help-desk"
          >
            <div className="scene-heading">
              <div>
                <span className="overline">02 / Access & procurement</span>
                <h3 id="work-story-help-desk">
                  The right access. Already in reach.
                </h3>
              </div>
              <span className="ecosystem-caption">Lark · Approvals</span>
            </div>
            <LarkScene />
          </article>
          <article
            className="work-story"
            aria-labelledby="work-story-board-prep"
          >
            <div className="scene-heading">
              <div>
                <span className="overline">03 / Governance</span>
                <h3 id="work-story-board-prep">
                  The decision becomes the next step.
                </h3>
              </div>
              <span className="ecosystem-caption">Google Docs · Calendar</span>
            </div>
            <BoardScene />
          </article>
        </div>
      </div>
    </section>
  );
}
