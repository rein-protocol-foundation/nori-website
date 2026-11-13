import { SectionHeading, ScenarioNote } from "../components/layout/Section";
import { Conversation } from "../components/artifacts/Conversation";
import {
  WorkSurface,
  Checklist,
  Status,
} from "../components/artifacts/WorkSurface";
import "./community.css";
export function Community() {
  return (
    <section id="community" className="section community">
      <SectionHeading
        label="Community & projects"
        title="A community that builds with Nori."
      >
        Find a first contribution, work through a real problem, and help shape
        what Nori can do next. When the work needs human expertise, Nori brings
        the right people into it.
      </SectionHeading>
      <h3 className="story-title">
        From saying hello to shipping a first contribution.
      </h3>
      <div className="contributor-composition">
        <Conversation
          dark
          channel="start-contributing"
          messages={[
            [
              "New contributor",
              "I know Python and have a few hours this week. Where can I help?",
            ],
            [
              "Nori",
              "There’s a focused retry test we need. Here are the setup instructions, reproduction, and acceptance checks. I’ll help you get started.",
            ],
            [
              "New contributor",
              "The environment is working. I’ve opened a pull request.",
            ],
            [
              "Nori",
              "I’ve requested a human reviewer. Let’s work through the feedback together.",
            ],
          ]}
        />
        <div className="github-stack">
          <WorkSurface title="Community repository" app="GitHub">
            <p className="small-copy">ISSUE · CONTRIBUTOR TASK</p>
            <h4>Add a retry regression test</h4>
            <Status>Good first contribution</Status>
            <Checklist
              items={[
                "Reproduce the failure",
                "Cover the retry path",
                "Document expected behavior",
              ]}
            />
          </WorkSurface>
          <WorkSurface title="Pull request" app="GitHub">
            <h4>First contribution</h4>
            <Checklist
              items={[
                "Tests reviewed",
                "Human feedback addressed",
                "Merge outcome followed through",
              ]}
            />
            <p className="thank-you">
              Thank you for contributing. Let’s find your next task.
            </p>
          </WorkSurface>
        </div>
      </div>
      <div className="expertise-story">
        <div className="editorial-copy">
          <p className="eyebrow">Human expertise, part of the team</p>
          <h3>
            Nori knows when
            <br />
            to bring people in.
          </h3>
          <p>
            Donation payments and confirmations occasionally fall out of sync.
            Nori narrows the issue to the retry path, then organizes a developer
            and an independent tester.
          </p>
          <p>
            Nori matches the brief with interested contributors, invites
            voluntary participation, and agrees the scope, fee, timeline, and
            acceptance checks. A sanitized reproduction gives a developer and an
            independent tester a concrete starting point.
          </p>
        </div>
        <WorkSurface title="Donation confirmation · retry issue" app="GitHub">
          <h4>A paid task with a clear finish line.</h4>
          <dl className="record">
            <div>
              <dt>Scope</dt>
              <dd>Fix retry behavior and prevent duplicate confirmations</dd>
            </div>
            <div>
              <dt>Collaboration</dt>
              <dd>Developer + independent tester</dd>
            </div>
            <div>
              <dt>Agreement</dt>
              <dd>
                Fee, timeline, and deliverables agreed within authorized budget
              </dd>
            </div>
            <div>
              <dt>Acceptance</dt>
              <dd>Failure cases tested; human review completed</dd>
            </div>
            <div>
              <dt>Follow-through</dt>
              <dd>
                Agreed settlement, release, contributor recognition, and
                regression coverage for next time
              </dd>
            </div>
          </dl>
        </WorkSurface>
      </div>
      <div className="community-note">
        <h3>One contribution can become a community practice.</h3>
        <p>
          Turn repeated questions into office hours, solutions into contributor
          guides, and shared interests into hackathons and conference talks.
          Coordinate speakers, logistics, and follow-up so the work continues
          after the event. If a volunteer steps away, Nori finds willing
          coverage and updates the event assignments.
        </p>
      </div>
      <ScenarioNote />
    </section>
  );
}
