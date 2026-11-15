import { WorkCells } from "./WorkCells";
import { SectionLabel } from "./Section";
import { WorkApp, Message } from "./WorkApp";
const scenes = [
  [
    "Onboarding",
    "people-ops",
    "From an offer to ready for day one.",
    "Maya",
    "Alex starts Monday. Can you coordinate onboarding?",
    "I’ve linked the signed offer and onboarding checklist. IT needs to confirm access; payroll needs the approved start date. I’ll keep both owners in this thread.",
    "Day-one checklist · Alex",
    "Offer & employment documents",
    "IT access request · awaiting owner",
    "Monday orientation · 10:00 AM",
  ],
  [
    "Tool access",
    "help-desk",
    "A request. The right access. Work continues.",
    "Alex",
    "Can I get access to the design tool for our workshop?",
    "There’s an unused seat in the team plan. I’ve prepared the reassignment for the workspace owner, with the project and access level attached.",
    "Design workspace · access request",
    "Project: AI safety workshop",
    "Access: editor · owner approval",
    "Follow-up: verify sign-in",
  ],
  [
    "Governance",
    "board-prep",
    "The meeting ends. The work keeps moving.",
    "Maya",
    "Let’s get the quarterly board packet ready.",
    "I’ve connected the previous decisions to the current work. The packet separates updates from decisions that need the board’s attention.",
    "Quarterly board packet",
    "Decision log · prior quarter",
    "Program update · review requested",
    "Board meeting · Thursday 2:00 PM",
  ],
];
export function Operations() {
  return (
    <section
      className="section work-redesign"
      id="work"
      aria-labelledby="work-title"
    >
      <WorkCells />
      <div className="section-inner">
        <SectionLabel number="02">Work, connected</SectionLabel>
        <h2 id="work-title">
          One request.
          <br />
          <strong>A whole thread of work.</strong>
        </h2>
        <p className="new-lead">
          The conversation is the starting point. Nori connects the people,
          tools, and follow-through around it.
        </p>
        <div className="work-stories">
          {scenes.map((s, index) => (
            <article
              className="work-story"
              key={s[1]}
              aria-labelledby={`work-story-${s[1]}`}
            >
              <div className="work-story-heading">
                <p className="work-story-label">
                  <span>0{index + 1}</span>
                  {s[0]}
                </p>
                <h3 id={`work-story-${s[1]}`}>{s[2]}</h3>
              </div>
              <WorkApp channel={s[1]}>
                <Message name={s[3]}>
                  <p>{s[4]}</p>
                </Message>
                <Message name="Nori">
                  <p>{s[5]}</p>
                  <div className="app-document">
                    <b>{s[6]}</b>
                    {s.slice(7).map((t) => (
                      <p key={t}>▤ &nbsp; {t}</p>
                    ))}
                  </div>
                </Message>
                <Message name={s[3]}>
                  <p>
                    Thanks. Keep the owners in the loop and bring anything that
                    needs my decision back here.
                  </p>
                </Message>
              </WorkApp>
              <p className="example-caption">
                Illustrative Slack workflow · Sample people and work records
              </p>
              <div className="linked-work">
                <article>
                  <small>GOOGLE DOCS / BRIEF</small>
                  <b>
                    {index === 0
                      ? "Alex · onboarding plan"
                      : index === 1
                        ? "Design workspace request"
                        : "Quarterly board packet"}
                  </b>
                  <p>
                    Requirements, owners, next steps
                    <br />
                    Owner: Maya · Draft for review
                  </p>
                </article>
                <article>
                  <small>CALENDAR / NEXT STEP</small>
                  <b>
                    {index === 0
                      ? "Day-one orientation"
                      : index === 1
                        ? "Access follow-up"
                        : "Board review"}
                  </b>
                  <p>
                    Next scheduled checkpoint
                    <br />
                    Maya, Alex, Nori
                  </p>
                </article>
                <article>
                  <small>GITHUB / DELIVERY</small>
                  <b>
                    {index === 0
                      ? "Account provisioning"
                      : index === 1
                        ? "Workspace access"
                        : "Decision follow-through"}
                  </b>
                  <p>
                    Task · scoped and linked
                    <br />
                    Test, review, delivery record
                  </p>
                </article>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
