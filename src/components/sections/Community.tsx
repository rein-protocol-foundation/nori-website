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
          <p className="native-crop-label">
            Discord · Feedback conversation excerpt
          </p>
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
          <p className="native-crop-label">
            GitHub · Pull request conversation excerpt
          </p>
          <ProductScene
            className="github-demo"
            label="GitHub development walkthrough from issue to pull request, independent review and release monitoring"
          >
            <div className="github-topbar">
              <span className="github-menu-box" aria-hidden="true">
                <UiIcon name="menu" />
              </span>
              <GithubMark />
              <b>
                your-organization <span>/ community-tools</span>
              </b>
              <span className="github-search-native" aria-hidden="true">
                <UiIcon name="search" />
                Type <kbd>/</kbd> to search
              </span>
              <span className="github-top-action" aria-hidden="true">
                <UiIcon name="plus" />
              </span>
              <span className="github-top-action" aria-hidden="true">
                <UiIcon name="issue" />
              </span>
              <span className="github-top-action" aria-hidden="true">
                <UiIcon name="branch" />
              </span>
            </div>
            <div className="github-repo-tabs">
              <span>
                <UiIcon name="code" />
                Code
              </span>
              <span>
                <UiIcon name="issue" />
                Issues
              </span>
              <span className="selected">
                <UiIcon name="branch" />
                Pull requests
              </span>
              <span>
                <UiIcon name="play" />
                Actions
              </span>
              <span>
                <UiIcon name="shield" />
                Security
              </span>
              <span>
                <UiIcon name="settings" />
                Settings
              </span>
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
                  <b>Nori</b> merged <b>1 commit</b> into <code>main</code> from{" "}
                  <code>fix/duplicate-events</code>
                </p>
              </div>
              <div className="github-pr-tabs">
                <b>
                  <UiIcon name="chat" />
                  Conversation <span className="pr-count">3</span>
                </b>
                <span>
                  <UiIcon name="branch" />
                  Commits <span className="pr-count">1</span>
                </span>
                <span>
                  <UiIcon name="check" />
                  Checks <span className="pr-count">4</span>
                </span>
                <span>
                  <UiIcon name="file" />
                  Files changed <span className="pr-count">2</span>
                </span>
              </div>
              <div className="github-pr-layout">
                <div className="github-conversation-thread">
                  <span className="github-thread-avatar">
                    <Avatar />
                  </span>
                  <div className="github-comment">
                    <header>
                      <b>Nori</b>
                      <span>commented 20 minutes ago</span>
                      <span className="comment-author-tag">Author</span>
                      <UiIcon name="more" />
                    </header>
                    <div>
                      <h4>One event. One confirmation.</h4>
                      <p>
                        Deduplicate repeated events before sending. Add the
                        retry fixture and regression coverage.
                      </p>
                      <ul className="github-summary-list">
                        <li>
                          Claim <code>event.id</code> before sending the
                          confirmation.
                        </li>
                        <li>
                          Cover a repeated checkout event with a regression
                          test.
                        </li>
                      </ul>
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
                      <span className="checks-count">4 successful checks</span>
                    </div>
                    <div className="github-merge-event">
                      <span className="timeline-node">
                        <UiIcon name="branch" />
                      </span>
                      <p>
                        <b>Nori merged this pull request</b>
                        <span>
                          Commit added to main · linked issue #142 closed
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
                <aside className="github-meta">
                  <span className="github-meta-heading">
                    Reviewers
                    <UiIcon name="settings" />
                  </span>
                  <p>
                    <Avatar name="Alex" />
                    Alex <b>✓</b>
                  </p>
                  <span className="github-meta-heading">
                    Assignees
                    <UiIcon name="settings" />
                  </span>
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
            </div>
          </ProductScene>
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
        <p className="community-principle">
          Built for around-the-clock contribution. Qualified contributors guide
          Nori from the report to the release.
        </p>
      </div>
    </section>
  );
}
