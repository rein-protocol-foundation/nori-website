import { NoriMark } from "../Icons";
import { ExampleLabel, SectionLabel } from "./Section";
export function Communications() {
  return (
    <section
      className="section communications-section"
      id="communications"
      aria-labelledby="communications-title"
    >
      <div className="section-inner">
        <div className="section-heading split-heading">
          <div>
            <SectionLabel number="05">
              Communications & relationships
            </SectionLabel>
            <h2 id="communications-title">
              Give the organization
              <br />a voice that <strong>stays active.</strong>
            </h2>
          </div>
          <p className="heading-aside">
            Share what the team is doing, join relevant conversations, and turn
            programs into stories people can discover, discuss, and support.
          </p>
        </div>
        <div className="editorial-spread">
          <div className="editorial-main">
            <ExampleLabel>Illustrative editorial sequence</ExampleLabel>
            <div className="editorial-poster">
              <div className="poster-topline">
                <NoriMark />
                <span>From the project notebook</span>
              </div>
              <p className="poster-title">
                Good questions
                <br />
                deserve <strong>good company.</strong>
              </p>
              <div className="poster-cell-art" aria-hidden="true">
                {Array.from({ length: 49 }, (_, i) => (
                  <i
                    key={i}
                    className={
                      (i * 7 + Math.floor(i / 7) * 3) % 11 < 6
                        ? "cell-filled"
                        : ""
                    }
                  />
                ))}
              </div>
              <div className="poster-bottom">
                <span>
                  AI safety
                  <br />A conversation worth continuing.
                </span>
                <span>Sample event creative</span>
              </div>
            </div>
            <div className="editorial-caption">
              <span>Original post · X</span>
              <p>
                Before the event: a clear invitation, the question being
                explored, and a way to participate.
              </p>
            </div>
          </div>
          <div className="editorial-notes software-editorial">
            <article className="reply-note x-window">
              <span className="fragment-label">
                X / Thread
              </span>
              <h3>A reply should add something.</h3>
              <p>
                Answer a participant’s question or contribute a useful
                perspective to a relevant public discussion. Give people a
                reason to discover the organization.
              </p>
              <div className="reply-example">
                <span>Example participant question</span>
                <p>Will there be a way to contribute after the discussion?</p>
                <strong>Example response</strong>
                <p>
                  Yes—the follow-up includes scoped issues and an open office
                  hour to work through them together.
                </p>
              </div>
            </article>
            <article className="quote-note">
              <span className="fragment-label">
                Quote · Share with a point of view
              </span>
              <blockquote>
                “Here’s the part that matters
                <br />
                for the work <strong>we’re doing.”</strong>
              </blockquote>
              <p>
                A relevant resource, with an organizational perspective. A quote
                or repost earns its place.
              </p>
            </article>
            <article className="supporter-email email-window">
              <div>
                <span className="fragment-label">
                  Keep the relationship going
                </span>
                <span className="email-label">Gmail · Draft</span>
              </div>
              <h3>To: Project supporters · Subject: What comes next</h3>
              <p>
                A supporter update connects the discussion, the contribution it
                inspired, and the work ahead.
              </p>
            </article>
          </div>
        </div>
        <div className="publishing-rhythm">
          <div>
            <span>Before</span>
            <p>
              Recruit participants, invite speakers, and make the purpose clear.
            </p>
          </div>
          <div>
            <span>During</span>
            <p>
              Host a live conversation on Twitch or a community channel, respond
              to questions, and gather useful moments.
            </p>
          </div>
          <div>
            <span>After</span>
            <p>
              Adapt a talk into short clips for channels such as TikTok, share
              results, and follow up with partners and supporters.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
