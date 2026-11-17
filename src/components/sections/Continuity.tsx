import { useEffect, useRef } from "react";
import { SectionLabel } from "./Section";
import { Avatar, UiIcon } from "./ProductScenes";
import "../../styles/foundation-continuity.css";

const sources = [
  {
    icon: "file",
    app: "Google Docs",
    title: "Workshop decision",
    text: "Focus on when an agent should ask a person.",
    cite: "01",
    className: "decision",
  },
  {
    icon: "chat",
    app: "Slack",
    title: "Team handoff",
    text: "Sam will prepare the supporter briefing.",
    cite: "02",
    className: "handoff",
  },
  {
    icon: "calendar",
    app: "Google Calendar",
    title: "Next commitment",
    text: "Share the update on December 3.",
    cite: "03",
    className: "deadline",
  },
] as const;

export function Continuity() {
  const flow = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = flow.current!;
    let visible = false;
    const sync = () =>
      element.classList.toggle(
        "is-flowing",
        visible && document.visibilityState === "visible",
      );
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        sync();
      },
      { threshold: 0.15 },
    );
    observer.observe(element);
    document.addEventListener("visibilitychange", sync);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
    };
  }, []);
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
            The decision, the owner, the deadline. Nori brings the relevant
            context into the next conversation.
          </p>
        </div>
        <div
          className="context-flow"
          ref={flow}
          role="group"
          aria-label="Nori connects three accessible sources to a cited answer and prepares the next briefing."
        >
          <div className="context-question">
            <span className="context-person" aria-hidden="true">
              M
            </span>
            <div>
              <span>Maya · A new conversation</span>
              <p>What should we send our supporters next?</p>
            </div>
          </div>
          <div className="context-workspace">
            <div className="context-sources">
              <h3>Find the relevant work</h3>
              {sources.map((source) => (
                <div
                  className={`context-source context-${source.className}`}
                  key={source.cite}
                >
                  <div className="context-source-meta">
                    <UiIcon name={source.icon} />
                    <span>{source.app}</span>
                    <span>{source.cite}</span>
                  </div>
                  <h4>{source.title}</h4>
                  <p>{source.text}</p>
                </div>
              ))}
            </div>
            <div className="context-routing" aria-hidden="true">
              <svg viewBox="0 0 140 420" fill="none" preserveAspectRatio="none">
                <path d="M0 92H24Q40 92 40 108V196Q40 212 56 212H140M0 212H140M0 332H24Q40 332 40 316V228Q40 212 56 212" />
                <circle className="context-signal signal-one" r="4" />
                <circle className="context-signal signal-two" r="4" />
                <circle className="context-signal signal-three" r="4" />
              </svg>
              <div className="context-nori">
                <Avatar />
              </div>
            </div>
            <div className="context-result">
              <div className="context-result-heading">
                <Avatar />
                <div>
                  <strong>Nori</strong>
                  <span>Here’s where we left off.</span>
                </div>
              </div>
              <div className="context-answer-lines">
                <p className="answer-decision">
                  Share the workshop brief on{" "}
                  <strong>when an agent should ask a person.</strong>
                  <span className="context-cite">01</span>
                </p>
                <p className="answer-handoff">
                  <strong>Sam owns the briefing.</strong>
                  <span className="context-cite">02</span>
                </p>
                <p className="answer-deadline">
                  The next supporter update is due <strong>December 3.</strong>
                  <span className="context-cite">03</span>
                </p>
              </div>
              <div className="context-next-step">
                <UiIcon name="file" />
                <div>
                  <span>Next step, ready to review</span>
                  <strong>Sam’s supporter briefing</strong>
                  <p>Workshop scope, owner, and deadline — together.</p>
                </div>
                <UiIcon name="check" />
              </div>
            </div>
          </div>
          <div className="context-flow-steps" aria-hidden="true">
            <span>
              01 <b>Find the sources</b>
            </span>
            <span>
              02 <b>Connect the context</b>
            </span>
            <span>
              03 <b>Prepare the next step</b>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
