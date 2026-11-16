import { SectionLabel } from "./Section";
import { Avatar, ProductScene, SceneMessage, UiIcon } from "./ProductScenes";
import { GithubMark } from "../Icons";
export function Community() {
  return (
    <section
      className="section community-section"
      id="community"
      aria-labelledby="community-title"
    >
      <div className="section-inner">
        <div className="section-heading split-heading">
          <div>
            <SectionLabel number="04">Built with your community</SectionLabel>
            <h2 id="community-title">
              Feedback comes in.
              <br />
              <span className="muted-title">Better software comes out.</span>
            </h2>
          </div>
          <p className="heading-aside">
            A shared development loop: Nori evaluates the report, develops the
            fix, coordinates review, and follows the release back to the people
            who need it.
          </p>
        </div>
        <div className="contribution-flow">
          <ProductScene
            className="discord-demo"
            label="Discord feedback conversation with a qualified contributor and Nori"
          >
            <div className="discord-titlebar">
              <img
                src="/brands/discord.svg"
                alt="Discord"
                width="20"
                height="20"
              />
              <span>Nori community</span>
            </div>
            <div className="discord-layout">
              <aside className="discord-servers" aria-hidden="true">
                <img src="/brands/discord.svg" alt="" />
                <span className="discord-server-active">
                  <Avatar />
                </span>
                <span>＋</span>
              </aside>
              <aside className="discord-channels">
                <header>
                  Nori community <span>⌄</span>
                </header>
                <span className="discord-category">COMMUNITY</span>
                <p># general</p>
                <p className="selected"># feedback</p>
                <span className="discord-category">BUILD</span>
                <p># development</p>
                <p># releases</p>
                <p>
                  <UiIcon name="volume" /> Office hours
                </p>
              </aside>
              <div className="discord-conversation">
                <header>
                  <b># feedback</b>
                  <span>Ideas into action</span>
                </header>
                <div className="discord-messages">
                  <SceneMessage name="Alex" time="Today at 09:41">
                    <p>
                      <span className="discord-mention">@Nori</span> I’m seeing
                      two confirmation emails when I retry checkout.
                    </p>
                  </SceneMessage>
                  <SceneMessage time="Today at 09:42">
                    <p>
                      I’ve isolated the repeated event. I’ll add an idempotency
                      check and a regression test.
                    </p>
                    <div className="discord-issue-link">
                      <GithubMark />
                      <div>
                        <span>Issue #142</span>
                        <b>Handle duplicate confirmation events</b>
                      </div>
                    </div>
                  </SceneMessage>
                  <SceneMessage name="Alex" time="Today at 09:43">
                    <span className="contributor-role">Maintainer</span>
                    <p>
                      I can review the test. Please include the retry fixture.
                    </p>
                  </SceneMessage>
                </div>
                <div className="discord-compose" aria-hidden="true">
                  ＋ <span>Message #feedback</span> ☺
                </div>
              </div>
              <aside className="discord-members">
                <span>ONLINE — 2</span>
                <p>
                  <Avatar />
                  <b>
                    Nori <i>APP</i>
                  </b>
                </p>
                <p>
                  <Avatar name="Alex" />
                  <b>
                    Alex<small>Maintainer</small>
                  </b>
                </p>
              </aside>
            </div>
          </ProductScene>
          <div className="contribution-bridge">
            <span>
              <UiIcon name="issue" />A reproducible report
            </span>
            <span>
              <Avatar />
              One Nori carries the context
            </span>
            <span>
              <UiIcon name="branch" />A reviewable change
            </span>
          </div>
          <ProductScene
            className="github-demo"
            label="GitHub development walkthrough from issue to pull request, independent review and release monitoring"
          >
            <div className="github-topbar">
              <GithubMark />
              <b>
                your-organization <span>/ community-tools</span>
              </b>
              <span className="github-public">Public</span>
            </div>
            <div className="github-repo-tabs">
              <span>〈〉 Code</span>
              <span>◉ Issues</span>
              <span className="selected">
                <UiIcon name="branch" />
                Pull requests
              </span>
              <span>Actions</span>
              <span>Security</span>
            </div>
            <div className="github-pr">
              <div className="github-pr-title">
                <h3>
                  Handle duplicate confirmation events <span>#143</span>
                </h3>
                <p>
                  <span className="github-merged">
                    <UiIcon name="branch" />
                    Merged
                  </span>
                  <b>Nori</b> merged <b>1 commit</b> into <code>main</code>
                </p>
              </div>
              <div className="github-pr-tabs">
                <b>
                  Conversation <span>3</span>
                </b>
                <span>Commits 1</span>
                <span>Checks 4</span>
                <span>Files changed 2</span>
              </div>
              <div className="github-pr-layout">
                <div>
                  <div className="github-comment">
                    <header>
                      <Avatar />
                      <b>Nori</b>
                      <span>opened this pull request</span>
                    </header>
                    <div>
                      <h4>One event. One confirmation.</h4>
                      <p>
                        Deduplicate repeated events before sending. Add the
                        retry fixture and regression coverage.
                      </p>
                      <div className="code-diff">
                        <div className="diff-removed">
                          − await sendConfirmation(event);
                        </div>
                        <div className="diff-added">
                          + if (await claimEvent(event.id)) {"{"}
                        </div>
                        <div className="diff-added">
                          + &nbsp; await sendConfirmation(event);
                        </div>
                        <div className="diff-added">+ {"}"}</div>
                      </div>
                      <span className="closes-issue">Closes #142</span>
                    </div>
                  </div>
                  <div className="github-timeline">
                    <div>
                      <span className="timeline-node">
                        <UiIcon name="check" />
                      </span>
                      <Avatar name="Alex" />
                      <p>
                        <b>Alex approved these changes</b>
                        <span>Retry fixture checked. Ready for release.</span>
                      </p>
                    </div>
                    <div className="github-checks scene-step scene-step-2">
                      <span className="timeline-node">
                        <UiIcon name="check" />
                      </span>
                      <div>
                        <b>All checks passed</b>
                        <p>Unit tests · Retry fixture · Build · Security</p>
                      </div>
                      <span className="checks-count">4 / 4</span>
                    </div>
                  </div>
                </div>
                <aside className="github-meta">
                  <span>Reviewers</span>
                  <p>
                    <Avatar name="Alex" />
                    Alex <b>✓</b>
                  </p>
                  <span>Assignees</span>
                  <p>
                    <Avatar />
                    Nori
                  </p>
                  <span>Labels</span>
                  <p>
                    <i>bug</i>
                    <i>community</i>
                  </p>
                  <span>Linked issue</span>
                  <p>#142 Duplicate confirmations</p>
                </aside>
              </div>
              <div className="release-followthrough">
                <div>
                  <UiIcon name="branch" />
                  <span>
                    <b>Develop</b>
                    <small>Nori · Fix + test</small>
                  </span>
                </div>
                <div>
                  <UiIcon name="check" />
                  <span>
                    <b>Accept</b>
                    <small>Maintainer · Review</small>
                  </span>
                </div>
                <div>
                  <UiIcon name="chat" />
                  <span>
                    <b>Report</b>
                    <small>Nori · Update the thread</small>
                  </span>
                </div>
                <div>
                  <UiIcon name="globe" />
                  <span>
                    <b>Monitor</b>
                    <small>Nori · Watch for recurrence</small>
                  </span>
                </div>
              </div>
            </div>
          </ProductScene>
        </div>
        <p className="community-principle">
          Built for around-the-clock contribution. Qualified contributors guide
          Nori from the report to the release.
        </p>
      </div>
    </section>
  );
}
