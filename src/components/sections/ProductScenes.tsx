import { useEffect, useRef, type ReactNode } from "react";
import { GithubMark } from "../Icons";
import "../../styles/product-scenes.css";
import "../../styles/native-workspaces.css";

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
    menu: "M4 6h16M4 12h16M4 18h16",
    chevron: "m9 5 7 7-7 7",
    down: "m6 9 6 6 6-6",
    back: "m14 5-7 7 7 7M7 12h14",
    video: "M3 5h12v14H3V5Zm12 5 6-4v12l-6-4",
    settings:
      "M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM9 3h6l1 3 3 1 2 5-2 5-3 1-1 3H9l-1-3-3-1-2-5 2-5 3-1 1-3Z",
    more: "M4 12h1m6 0h1m6 0h1",
    plus: "M12 4v16M4 12h16",
    star: "m12 3 3 6 7 1-5 5 1 7-6-3-6 3 1-7-5-5 7-1 3-6Z",
    folder: "M3 6h7l2 2h9v12H3V6Z",
    cloud:
      "M6 18a5 5 0 1 1 0-10 7 7 0 0 1 13 1 4.5 4.5 0 0 1-1 9H6Zm3-5 2 2 5-5",
    undo: "M8 4 3 9l5 5M3 9h12a5 5 0 0 1 0 10h-3",
    redo: "m16 4 5 5-5 5m5-5H9a5 5 0 0 0 0 10h3",
    print: "M6 8V3h12v5M6 17H3V8h18v9h-3M6 14h12v7H6v-7Z",
    link: "m10 8 3-3a4 4 0 1 1 6 6l-3 3m-2 2-3 3a4 4 0 0 1-6-6l3-3m1 5 6-6",
    image: "M3 3h18v18H3V3Zm0 14 6-6 7 10m-3-4 4-5 4 5M16 7h.01",
    align: "M3 5h18M3 10h13M3 15h18M3 20h13",
    list: "M9 5h12M9 12h12M9 19h12M3 5h1m-1 7h1m-1 7h1",
    smile:
      "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20ZM7 14c2 5 8 5 10 0M8 8h.01M16 8h.01",
    send: "m3 3 18 9-18 9 4-9-4-9Zm4 9h14",
    code: "m8 6-6 6 6 6m8-12 6 6-6 6M14 3l-4 18",
    shield: "m12 2 9 4v6c0 5-9 10-9 10S3 17 3 12V6l9-4Zm0 5v6m0 3v1",
    play: "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20ZM9 7l8 5-8 5V7Z",
    heart: "M12 21 3 12a6 6 0 0 1 9-8 6 6 0 0 1 9 8l-9 9Z",
    bookmark: "M6 3h12v18l-6-4-6 4V3Z",
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
      className="lark-demo native-lark"
      label="Lark Messenger: a design-tool access request with owner approval pending"
    >
      <div className="lark-native-shell">
        <aside className="lark-apps" aria-hidden="true">
          <span className="window-dots">
            <i />
            <i />
            <i />
          </span>
          <Avatar name="Maya" />
          <UiIcon name="search" />
          <UiIcon name="plus" />
          <span className="is-active">
            <UiIcon name="chat" />
            <small>Messenger</small>
          </span>
          <span>
            <UiIcon name="file" />
            <small>Docs</small>
          </span>
          <span>
            <UiIcon name="folder" />
            <small>Base</small>
          </span>
          <span>
            <UiIcon name="video" />
            <small>Meetings</small>
          </span>
          <span>
            <UiIcon name="calendar" />
            <small>Calendar</small>
          </span>
          <span className="lark-apps-more">
            <UiIcon name="more" />
            <small>More</small>
          </span>
        </aside>
        <aside className="lark-filters" aria-label="Lark message filters">
          <b>
            <UiIcon name="list" /> Filter <UiIcon name="settings" />
          </b>
          <span className="is-active">
            <UiIcon name="chat" />
            Chats
          </span>
          <span>
            <UiIcon name="bell" />
            Unread
          </span>
          <span>
            <UiIcon name="bookmark" />
            Flagged
          </span>
          <span>
            <span className="at-sign">@</span>Mentions
          </span>
          <span>
            <UiIcon name="down" />
            Labels
          </span>
          <span>
            <UiIcon name="members" />
            Groups
          </span>
          <span>
            <UiIcon name="file" />
            Docs
          </span>
          <span>
            <UiIcon name="check" />
            Done
          </span>
        </aside>
        <aside className="lark-chats" aria-label="Lark chats">
          <header>
            <b>Chats</b>
            <UiIcon name="plus" />
          </header>
          <div className="lark-pinned">
            <span>
              <Avatar name="Alex" />
              <small>Alex</small>
            </span>
            <span>
              <Avatar name="Sam" />
              <small>Sam</small>
            </span>
            <span>
              <Avatar />
              <small>Nori</small>
            </span>
          </div>
          <div className="lark-chat-row is-active">
            <Avatar />
            <div>
              <b>
                Nori <small>BOT</small>
              </b>
              <p>Approval requested from Maya</p>
            </div>
            <time>9:42</time>
          </div>
          <div className="lark-chat-row">
            <Avatar name="Alex" />
            <div>
              <b>Alex</b>
              <p>Design-tool access</p>
            </div>
            <time>9:41</time>
          </div>
          <div className="lark-chat-row">
            <span className="lark-group">
              <UiIcon name="members" />
            </span>
            <div>
              <b>Operations</b>
              <p>Workshop planning</p>
            </div>
            <time>Yesterday</time>
          </div>
          <div className="lark-chat-row">
            <Avatar name="Sam" />
            <div>
              <b>Sam</b>
              <p>Monday orientation</p>
            </div>
          </div>
        </aside>
        <div className="lark-conversation">
          <header className="lark-conversation-head">
            <Avatar />
            <div>
              <b>
                Nori <span>Nori Bot</span>
                <small>BOT</small>
              </b>
              <p>
                <span>Chat</span>
                <span>Files</span>
                <UiIcon name="plus" />
              </p>
            </div>
            <UiIcon name="search" />
            <UiIcon name="more" />
          </header>
          <div className="lark-chat-content">
            <span className="lark-date">Today</span>
            <div className="lark-chat-message">
              <Avatar name="Alex" />
              <div>
                <span className="lark-sender">
                  Alex <time>9:41 AM</time>
                </span>
                <p className="lark-blue-bubble">
                  Could I get an editor seat in the design tool for the
                  workshop?
                </p>
              </div>
            </div>
            <div className="lark-chat-message">
              <Avatar />
              <div>
                <span className="lark-sender">
                  Nori <small>BOT</small>
                  <time>9:42 AM</time>
                </span>
                <p className="lark-white-bubble">
                  There’s an available license. I’ve requested Maya’s approval
                  to reassign it—no new purchase needed.
                </p>
                <div className="lark-native-approval scene-step scene-step-1">
                  <header>
                    <span>
                      <UiIcon name="check" />
                    </span>
                    <b>Design-tool access</b>
                    <small>Approval</small>
                  </header>
                  <dl>
                    <div>
                      <dt>Requested by</dt>
                      <dd>Alex</dd>
                    </div>
                    <div>
                      <dt>Workspace</dt>
                      <dd>Design studio</dd>
                    </div>
                    <div>
                      <dt>Access level</dt>
                      <dd>Editor · Existing license</dd>
                    </div>
                    <div>
                      <dt>Approver</dt>
                      <dd>Maya</dd>
                    </div>
                  </dl>
                  <div className="lark-approval-status">
                    <span />
                    Awaiting owner approval
                  </div>
                  <footer>
                    View request <UiIcon name="chevron" />
                  </footer>
                </div>
                <p className="lark-next-check">
                  Next: verify sign-in and editing after approval.
                </p>
              </div>
            </div>
          </div>
          <div className="lark-native-composer" aria-hidden="true">
            <span>Message Nori</span>
            <div>
              <span>Aa</span>
              <UiIcon name="smile" />
              <span>@</span>
              <UiIcon name="plus" />
              <UiIcon name="send" />
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
      className="board-demo native-docs"
      label="Google Docs board packet with a scheduled review and a comment from Nori"
    >
      <header className="docs-native-header">
        <span className="docs-file-logo" aria-hidden="true">
          <UiIcon name="file" />
        </span>
        <div className="docs-title-menus">
          <div>
            <b>Quarterly board review</b>
            <UiIcon name="star" />
            <UiIcon name="folder" />
            <UiIcon name="cloud" />
          </div>
          <nav aria-label="Google Docs menu">
            <span>File</span>
            <span>Edit</span>
            <span>View</span>
            <span>Insert</span>
            <span>Format</span>
            <span>Tools</span>
            <span>Extensions</span>
            <span>Help</span>
          </nav>
        </div>
        <div className="docs-header-actions" aria-hidden="true">
          <UiIcon name="clock" />
          <UiIcon name="chat" />
          <UiIcon name="video" />
          <span className="docs-native-share">
            <UiIcon name="lock" />
            Share
            <UiIcon name="down" />
          </span>
          <Avatar name="Maya" />
        </div>
      </header>
      <div className="docs-formatbar" aria-hidden="true">
        <UiIcon name="search" />
        <UiIcon name="undo" />
        <UiIcon name="redo" />
        <UiIcon name="print" />
        <span>100%⌄</span>
        <i />
        <span>Normal text⌄</span>
        <i />
        <span>Arial⌄</span>
        <i />
        <span>−</span>
        <span className="docs-font-size">11</span>
        <span>＋</span>
        <b>B</b>
        <span className="docs-italic-icon">I</span>
        <span className="docs-underline">U</span>
        <span className="docs-text-color">A</span>
        <i />
        <UiIcon name="link" />
        <UiIcon name="chat" />
        <UiIcon name="image" />
        <i />
        <UiIcon name="align" />
        <UiIcon name="list" />
        <UiIcon name="more" />
      </div>
      <div className="docs-ruler" aria-hidden="true">
        <span>1</span>
        <span>1</span>
        <span>2</span>
        <span>3</span>
        <span>4</span>
        <span>5</span>
        <span>6</span>
      </div>
      <div className="docs-native-workspace">
        <aside className="docs-outline" aria-label="Document outline">
          <UiIcon name="back" />
          <b>
            Document tabs <span>＋</span>
          </b>
          <div className="docs-tab-selected">
            <UiIcon name="file" />
            Board packet <UiIcon name="more" />
          </div>
          <span>Quarterly board review</span>
          <span>Decisions for this meeting</span>
          <span>Owners & next steps</span>
        </aside>
        <article className="docs-paper">
          <p className="docs-document-eyebrow">Q4 · BOARD PACKET</p>
          <h4>Quarterly board review</h4>
          <p className="docs-document-subtitle">
            A shared record of decisions and next steps.
          </p>
          <div className="docs-meeting-chip">
            <UiIcon name="calendar" />
            <span>Quarterly review · Thursday, 2:00 PM</span>
          </div>
          <h5>Decisions for this meeting</h5>
          <div className="docs-agenda-item">
            <b>1. Workshop scope</b>
            <p>
              <mark>Budget review attached for decision.</mark> Confirm the
              scope before committing project funds.
            </p>
            <span>Owner: Maya · Decision pending</span>
          </div>
          <div className="docs-agenda-item">
            <b>2. Contributor coverage</b>
            <p>
              Review availability, open work, and the proposed owners for the
              next workshop.
            </p>
          </div>
          <div className="docs-agenda-item">
            <b>3. Previous commitments</b>
            <p>
              Carry forward unresolved items from the last quarterly review.
            </p>
          </div>
          <h5>Owners & next steps</h5>
          <p className="docs-followup-copy">
            Record each decision with its owner and next deadline. Nori will
            connect the agreed follow-up to a delivery task.
          </p>
        </article>
        <aside className="docs-comments" aria-label="Document comment">
          <div className="docs-comment-card">
            <header>
              <Avatar />
              <div>
                <b>Nori</b>
                <time>9:42 AM</time>
              </div>
              <UiIcon name="check" />
              <UiIcon name="more" />
            </header>
            <p>
              Budget context is attached. After the decision, I’ll connect the
              outcome to its owner and next deadline.
            </p>
            <span>Reply or add others</span>
          </div>
        </aside>
        <aside className="docs-side-apps" aria-hidden="true">
          <span className="docs-calendar-icon">31</span>
          <span className="docs-keep-icon">♧</span>
          <UiIcon name="check" />
          <UiIcon name="members" />
          <i />
          <UiIcon name="plus" />
        </aside>
      </div>
    </ProductScene>
  );
}
