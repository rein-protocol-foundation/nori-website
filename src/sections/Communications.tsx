import { SectionHeading, ScenarioNote } from "../components/layout/Section";
import { WorkSurface, Checklist } from "../components/artifacts/WorkSurface";
import { NoriHead } from "../components/brand/Nori";
import "./communications.css";
export function Communications() {
  return (
    <section id="communications" className="section communications">
      <SectionHeading
        label="Communications & relationships"
        title={
          <>
            Give the organization a voice
            <br />
            that stays active.
          </>
        }
      >
        Share the work. Join relevant conversations. Bring useful feedback back
        into the organization.
      </SectionHeading>
      <div className="communications-composition">
        <WorkSurface
          app="X"
          title="Public conversation"
          className="social-post"
        >
          <div className="social-author">
            <NoriHead />
            <div>
              <b>Rein Protocol Foundation</b>
              <small>Organization post · example</small>
            </div>
          </div>
          <p className="post-body">
            Our contributor office hours are taking shape. Bring a question, a
            small fix, or an idea for safer agents.
          </p>
          <div className="reply">
            <b>Community member</b>
            <p>Is there a beginner-friendly way to prepare?</p>
          </div>
          <div className="reply">
            <NoriHead />
            <div>
              <b>Nori</b>
              <p>
                Yes. We’re adding a setup walkthrough based on the questions
                from this thread.
              </p>
            </div>
          </div>
        </WorkSurface>
        <div className="guide-column">
          <WorkSurface app="GitHub" title="Contributor guide">
            <h4>A clearer first contribution.</h4>
            <p className="code-path">docs / contributing / setup.md</p>
            <Checklist
              items={[
                "Prerequisites explained",
                "First task reproduced",
                "Acceptance checks added",
              ]}
            />
          </WorkSurface>
          <p className="editorial-caption">
            A question in public.
            <br />A better guide for everyone.
          </p>
        </div>
        <article className="video-story">
          <span className="eyebrow">SHORT-VIDEO STORYBOARD</span>
          <div className="video-type">
            Your first
            <br />
            contribution,
            <br />
            <em>in one minute.</em>
          </div>
          <div className="script-frames">
            <p>
              <b>01</b> Start with a real question.
            </p>
            <p>
              <b>02</b> Show the smallest useful fix.
            </p>
            <p>
              <b>03</b> Invite the next contributor.
            </p>
          </div>
          <small>Adapted for a vertical short · illustrative script</small>
        </article>
      </div>
      <div className="communications-bottom">
        <article>
          <h3>Original posts. Thoughtful replies.</h3>
          <p>
            Publish progress and invitations. Answer questions with context.
            Contribute to relevant public discussions so people discover the
            organization through useful work.
          </p>
        </article>
        <article>
          <h3>Quote with a point of view.</h3>
          <blockquote>
            “A useful evaluation asks what happens when the agent needs help—not
            only when everything works.”
          </blockquote>
          <p className="small-copy">
            Illustrative editorial copy. Select relevant resources and add the
            organization’s perspective.
          </p>
        </article>
        <article>
          <h3>Keep the conversation going.</h3>
          <p>
            Turn programs into TikTok-ready shorts, Twitch or other live-session
            outlines, speaker follow-ups, and donor updates. Give each audience
            a relevant way to participate.
          </p>
        </article>
      </div>
      <ScenarioNote />
    </section>
  );
}
