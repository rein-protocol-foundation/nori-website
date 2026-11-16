import { useEffect, useRef, type ReactNode } from "react";
import { GithubMark } from "../Icons";
import "../../styles/product-scenes.css";

export function ProductScene({
  children,
  className = "",
  label,
}: {
  children: ReactNode;
  className?: string;
  label: string;
}) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const preference = matchMedia("(prefers-reduced-motion: reduce)");
    let timer: ReturnType<typeof setTimeout> | undefined;
    const finish = () => {
      node.classList.remove("scene-playing");
      if (timer) clearTimeout(timer);
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        if (!preference.matches) {
          node.classList.add("scene-playing");
          timer = setTimeout(finish, 4500);
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(node);
    const changed = () => {
      if (preference.matches) finish();
    };
    preference.addEventListener("change", changed);
    return () => {
      finish();
      observer.disconnect();
      preference.removeEventListener("change", changed);
    };
  }, []);
  return (
    <figure
      ref={ref}
      className={`product-scene ${className}`}
      aria-label={label}
    >
      {children}
    </figure>
  );
}

export function UiIcon({
  name,
  className = "",
}: {
  name: string;
  className?: string;
}) {
  const paths: Record<string, string> = {
    home: "M3 10 12 3l9 7M5 9v11h5v-6h4v6h5V9",
    chat: "M4 4h16v12H9l-5 4V4Z",
    bell: "M5 17h14l-2-3V9a5 5 0 0 0-10 0v5l-2 3Zm5 3h4",
    file: "M6 3h8l4 4v14H6V3Zm8 0v5h4M9 12h6m-6 4h6",
    search: "M10 17a7 7 0 1 0 0-14 7 7 0 0 0 0 14Zm5-2 6 6",
    hash: "M9 3 6 21M18 3l-3 18M3 9h19M2 15h19",
    check: "m5 12 4 4L20 5",
    calendar: "M4 5h16v16H4V5Zm0 5h16M8 2v6m8-6v6M8 14h3m3 0h3m-9 4h3",
    members:
      "M9 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM2 21v-3a5 5 0 0 1 5-4h4a5 5 0 0 1 5 4v3m0-17a4 4 0 0 1 0 8m3 2a5 5 0 0 1 3 4v3",
    branch:
      "M6 3v12a4 4 0 0 0 4 4h2m-6-8h8a4 4 0 0 0 4-4V3M3 3h6m6 0h6m-9 13v6",
    lock: "M6 10h12v11H6V10Zm2 0V6a4 4 0 0 1 8 0v4",
    globe:
      "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20ZM2 12h20M12 2c6 6 6 14 0 20-6-6-6-14 0-20Z",
    mail: "M3 5h18v14H3V5Zm0 0 9 8 9-8",
    clock: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Zm0-15v6l4 2",
    volume: "M3 9h4l5-5v16l-5-5H3V9Zm13-2c4 3 4 7 0 10",
    issue: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Zm0-16v8m0 3v1",
  };
  return (
    <svg
      className={`ui-icon ${className}`}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name] || paths.file} />
    </svg>
  );
}

export function Avatar({ name = "Nori" }: { name?: string }) {
  return name === "Nori" ? (
    <img
      className="scene-avatar"
      src="/nori-head.webp"
      width="40"
      height="40"
      alt=""
      loading="lazy"
      decoding="async"
    />
  ) : (
    <span
      className={`scene-avatar human-${name.toLowerCase()}`}
      aria-hidden="true"
    >
      {name[0]}
    </span>
  );
}

export function SceneMessage({
  name = "Nori",
  time = "9:41 AM",
  children,
  className = "",
}: {
  name?: string;
  time?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`scene-message ${className}`}>
      <Avatar name={name} />
      <div>
        <div className="message-byline">
          <strong>{name}</strong>
          {name === "Nori" && <span className="app-tag">APP</span>}
          <time>{time}</time>
        </div>
        {children}
      </div>
    </div>
  );
}

export function SlackScene() {
  return (
    <ProductScene
      className="slack-demo"
      label="Slack onboarding walkthrough with an owner handoff and linked calendar"
    >
      <div className="slack-topbar">
        <span className="window-dots" aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className="slack-search">
          <UiIcon name="search" />
          Search your workspace
        </span>
        <span className="slack-app-name">Slack</span>
      </div>
      <div className="slack-layout">
        <aside className="slack-rail" aria-hidden="true">
          <span className="workspace-tile">N</span>
          <UiIcon name="home" />
          <small>Home</small>
          <UiIcon name="chat" />
          <small>DMs</small>
          <UiIcon name="bell" />
          <small>Activity</small>
          <UiIcon name="file" />
          <small>Files</small>
        </aside>
        <aside className="slack-sidebar" aria-label="Slack channels">
          <b>
            Your organization <span>⌄</span>
          </b>
          <p>Threads</p>
          <p>Huddles</p>
          <p>Drafts & sent</p>
          <span className="sidebar-label">Channels</span>
          <p># general</p>
          <p className="selected"># people-ops</p>
          <p># operations</p>
          <p># engineering</p>
          <span className="sidebar-label">Apps</span>
          <p className="nori-sidebar">
            <Avatar /> Nori
          </p>
        </aside>
        <div className="slack-channel">
          <header>
            <b>
              <UiIcon name="hash" />
              people-ops
            </b>
            <UiIcon name="members" />
          </header>
          <div className="slack-tabs">
            <span>Messages</span>
            <span>Canvas</span>
            <span>＋</span>
          </div>
          <div className="slack-messages">
            <SceneMessage name="Maya" time="9:40 AM">
              <p>
                Alex starts Monday. I’m away Friday—can you coordinate with Sam?
              </p>
            </SceneMessage>
            <SceneMessage className="scene-step scene-step-1">
              <p>
                On it. The handoff, access check, and orientation are connected.
              </p>
              <div className="slack-checklist">
                <b>Alex · First-day plan</b>
                <div>
                  <span className="task-tick">✓</span>
                  <span>Signed offer linked</span>
                  <small>Complete</small>
                </div>
                <div>
                  <span className="task-open" />
                  <span>Verify workspace access</span>
                  <small>Sam · Fri</small>
                </div>
                <div>
                  <span className="task-tick">✓</span>
                  <span>Orientation scheduled</span>
                  <small>Mon · 10:00</small>
                </div>
              </div>
              <span className="slack-thread-count">
                2 replies · Follow-through with Sam
              </span>
            </SceneMessage>
            <div className="calendar-attachment scene-step scene-step-2">
              <span className="calendar-date">
                <b>MON</b>17
              </span>
              <div>
                <span className="integration-label">
                  <UiIcon name="calendar" />
                  Google Calendar
                </span>
                <strong>Alex’s first day</strong>
                <p>10:00–10:30 · Sam + Alex</p>
              </div>
            </div>
          </div>
          <div className="slack-composer" aria-hidden="true">
            <span>B &nbsp; I &nbsp; ≡ &nbsp; ↗</span>
            <p>Message #people-ops</p>
            <span>＋ &nbsp; Aa &nbsp; ☺ &nbsp; @</span>
          </div>
        </div>
        <aside className="slack-thread">
          <header>
            <strong>Thread</strong>
            <span aria-hidden="true">×</span>
          </header>
          <SceneMessage time="9:42 AM">
            <p>
              <span className="mention">@Sam</span> Can you own Friday’s sign-in
              check?
            </p>
          </SceneMessage>
          <SceneMessage name="Sam" time="9:43 AM">
            <p>Yes. I’ll confirm access and take Monday’s orientation.</p>
          </SceneMessage>
          <div className="linked-issue scene-step scene-step-3">
            <GithubMark />
            <span>IT / onboarding</span>
            <strong>Verify Alex’s workspace access</strong>
            <div>
              <span className="status-pill">Open</span>
              <span>Assigned to Sam</span>
            </div>
          </div>
          <p className="thread-outcome">The next step has an owner.</p>
        </aside>
      </div>
    </ProductScene>
  );
}

export function LarkScene() {
  return (
    <ProductScene
      className="lark-demo"
      label="Lark approval walkthrough for a design-tool seat"
    >
      <header className="lark-topbar">
        <span className="lark-logo" aria-hidden="true">
          ◢
        </span>
        <b>Lark</b>
        <span>Approvals</span>
        <UiIcon name="search" />
        <Avatar />
      </header>
      <div className="lark-layout">
        <aside className="lark-rail" aria-hidden="true">
          <UiIcon name="chat" />
          <UiIcon name="calendar" />
          <UiIcon name="file" />
          <span className="active">
            <UiIcon name="check" />
          </span>
        </aside>
        <div className="lark-request">
          <div className="lark-request-title">
            <span className="lark-approval-icon">
              <UiIcon name="lock" />
            </span>
            <div>
              <h4>Design-tool access</h4>
              <p>Alex · Editor seat · Workshop project</p>
            </div>
          </div>
          <div className="lark-found">
            <Avatar />
            <p>
              <b>Nori found an available seat.</b>
              <br />
              Reassign the existing license.
            </p>
            <span className="saving-tag">No new purchase</span>
          </div>
          <dl className="lark-fields">
            <div>
              <dt>Workspace</dt>
              <dd>Design studio</dd>
            </div>
            <div>
              <dt>Access level</dt>
              <dd>Editor</dd>
            </div>
            <div>
              <dt>Requested by</dt>
              <dd>Alex</dd>
            </div>
          </dl>
          <div className="approval-track">
            <div className="approval-person">
              <Avatar name="Alex" />
              <span>Request sent</span>
              <small>Complete</small>
            </div>
            <i />
            <div className="approval-person current">
              <Avatar name="Maya" />
              <span>Owner approval</span>
              <small>Awaiting Maya</small>
            </div>
            <i />
            <div className="approval-person">
              <Avatar />
              <span>Access check</span>
              <small>After approval</small>
            </div>
          </div>
        </div>
      </div>
    </ProductScene>
  );
}

export function BoardScene() {
  return (
    <ProductScene
      className="board-demo"
      label="Google Docs and Calendar board-review walkthrough"
    >
      <div className="docs-toolbar">
        <span className="google-doc-icon">
          <UiIcon name="file" />
        </span>
        <div>
          <b>Quarterly board review</b>
          <span>File &nbsp; Edit &nbsp; View &nbsp; Insert</span>
        </div>
        <span className="docs-share">
          <UiIcon name="lock" />
          Share
        </span>
      </div>
      <div className="board-layout">
        <article className="board-document">
          <span className="document-kicker">BOARD PACKET / Q4</span>
          <h4>
            Decisions ready.
            <br />
            Context attached.
          </h4>
          <div className="agenda-row">
            <span>01</span>
            <div>
              <b>Workshop scope</b>
              <p>Budget review attached for decision.</p>
            </div>
            <span className="status-pill amber">For decision</span>
          </div>
          <div className="agenda-row">
            <span>02</span>
            <div>
              <b>Contributor coverage</b>
              <p>Owners, availability, and open work.</p>
            </div>
          </div>
          <div className="agenda-row">
            <span>03</span>
            <div>
              <b>Previous commitments</b>
              <p>Last quarter’s record, linked.</p>
            </div>
          </div>
        </article>
        <aside className="board-comment">
          <div className="calendar-mini">
            <UiIcon name="calendar" />
            <b>Quarterly review</b>
            <span>Thursday · 2:00 PM</span>
          </div>
          <SceneMessage time="Just now">
            <p>
              After the decision, I’ll connect the outcome to its owner and next
              deadline.
            </p>
          </SceneMessage>
          <div className="followup-marker">
            <UiIcon name="branch" />
            Decision → delivery task
          </div>
        </aside>
      </div>
    </ProductScene>
  );
}
