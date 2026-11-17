import { SectionLabel } from "./Section";
import "../../styles/outreach-scenes.css";

type IconName =
  | "x"
  | "home"
  | "search"
  | "bell"
  | "mail"
  | "bookmark"
  | "profile"
  | "more"
  | "reply"
  | "repost"
  | "heart"
  | "share"
  | "reels"
  | "explore"
  | "plus"
  | "menu"
  | "arrow"
  | "attach"
  | "trash"
  | "settings"
  | "grid"
  | "inbox"
  | "clock"
  | "send"
  | "draft"
  | "check";
function Icon({ name }: { name: IconName }) {
  const paths: Record<IconName, string> = {
    x: "M4 3h4.5L20 21h-4.5L4 3Zm.5 18L20 3",
    home: "m3 10 9-7 9 7v11h-6v-7H9v7H3Z",
    search: "m21 21-5-5M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Z",
    bell: "M4 17h16l-2-3V9a6 6 0 0 0-12 0v5ZM9 21h6",
    mail: "M3 5h18v14H3Zm0 1 9 7 9-7",
    bookmark: "M5 3h14v18l-7-5-7 5Z",
    profile: "M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0ZM4 21v-2a8 8 0 0 1 16 0v2",
    more: "M4 12h.01M12 12h.01M20 12h.01",
    reply: "M21 11a9 9 0 0 1-9 9H4l1-5a9 9 0 1 1 16-4Z",
    repost: "m4 8 3-3 3 3M7 5v11h10m3 0-3 3-3-3m3 3V8H7",
    heart: "M12 21 3 12C-3 5 7-1 12 6c5-7 15-1 9 6Z",
    share: "M12 16V2m-5 5 5-5 5 5M4 13v8h16v-8",
    reels: "M3 8h18M3 3h18v18H3Zm2 0 4 5m3-5 4 5m-6 4 6 3-6 3Z",
    explore: "M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0Zm-6-4-3 5-5 3 3-5Z",
    plus: "M3 3h18v18H3Zm9 4v10m-5-5h10",
    menu: "M3 5h18M3 12h18M3 19h18",
    arrow: "m9 5-7 7 7 7M2 12h20",
    attach: "m8 12 7-7a4 4 0 0 1 6 6l-9 9a6 6 0 0 1-8-8l9-9m-7 11 9-9",
    trash: "M4 6h16M9 6V3h6v3M6 6l1 15h10l1-15M10 10v7m4-7v7",
    settings:
      "m10 2 4 0 1 3 3 1 3-1 2 4-2 2v3l2 2-2 4-3-1-3 1-1 3h-4l-1-3-3-1-3 1-2-4 2-2v-3L1 9l2-4 3 1 3-1ZM15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z",
    grid: "M4 4h2v2H4Zm7 0h2v2h-2Zm7 0h2v2h-2ZM4 11h2v2H4Zm7 0h2v2h-2Zm7 0h2v2h-2ZM4 18h2v2H4Zm7 0h2v2h-2Zm7 0h2v2h-2Zm7 0h2v2h-2Z",
    inbox: "M3 4h18v16H3Zm0 10h5l2 3h4l2-3h5",
    clock: "M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0ZM12 6v6l4 2",
    send: "m2 3 20 9-20 9 4-9Zm4 9h16",
    draft: "M5 2h10l5 5v15H5Zm10 0v6h5M8 13h9M8 17h7",
    check: "m5 12 4 4L20 5",
  };
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={paths[name]} />
    </svg>
  );
}
function Avatar() {
  return (
    <img
      className="outreach-avatar"
      src="/nori-head.webp"
      alt=""
      width="40"
      height="40"
      loading="lazy"
    />
  );
}
function SocialActions({ instagram = false }: { instagram?: boolean }) {
  return (
    <div
      className={instagram ? "outreach-ig-actions" : "outreach-x-actions"}
      aria-label="Preview of post actions"
    >
      {(instagram
        ? ["heart", "reply", "send", "bookmark", "more"]
        : ["reply", "repost", "heart", "bookmark", "share"]
      ).map((name) => (
        <span key={name} title={name}>
          <Icon name={name as IconName} />
        </span>
      ))}
    </div>
  );
}
function XScene() {
  return (
    <article className="outreach-scene" aria-labelledby="outreach-x-title">
      <div className="outreach-scene-intro">
        <span className="outreach-scene-index">01 / X</span>
        <h3 id="outreach-x-title">
          An invitation.
          <br />
          Then a conversation.
        </h3>
        <p>A post opens the question. A reply gives someone a way in.</p>
      </div>
      <span className="outreach-crop-label">X · Post & reply crop</span>
      <div
        className="outreach-app outreach-x"
        role="group"
        aria-label="X desktop post with navigation, an original workshop invitation, Jordan’s question, and Nori’s reply draft"
      >
        <aside className="outreach-x-rail" aria-hidden="true">
          <Icon name="x" />
          {(
            [
              ["home", "Home"],
              ["search", "Explore"],
              ["bell", "Notifications"],
              ["mail", "Messages"],
              ["bookmark", "Bookmarks"],
              ["profile", "Profile"],
              ["more", "More"],
            ] as const
          ).map(([icon, label]) => (
            <div key={label}>
              <Icon name={icon} />
              <span>{label}</span>
            </div>
          ))}
          <span className="outreach-x-post-button">Post</span>
          <div className="outreach-x-account">
            <Avatar />
            <span>
              <b>Nori</b>
              <small>@nori</small>
            </span>
            <Icon name="more" />
          </div>
        </aside>
        <div
          className="outreach-x-conversation"
          tabIndex={0}
          role="region"
          aria-label="X post and replies"
        >
          <div className="outreach-x-topbar">
            <Icon name="arrow" />
            <b>Post</b>
            <span>Draft</span>
          </div>
          <div className="outreach-x-original">
            <div className="outreach-author">
              <Avatar />
              <div>
                <b>Nori</b>
                <small>@nori</small>
              </div>
              <Icon name="more" />
            </div>
            <p>What should an AI agent be allowed to do on its own?</p>
            <p>
              Our next community workshop asks where a person should make the
              call.
            </p>
            <p>Bring a workflow. Let’s map the decision points together.</p>
            <div className="outreach-x-link">
              <span>COMMUNITY WORKSHOP</span>
              <b>Useful autonomy starts with clear limits.</b>
              <small>Workshop brief · Discussion & contribution</small>
            </div>
            <SocialActions />
          </div>
          <div className="outreach-x-reply">
            <span className="outreach-jordan">J</span>
            <div>
              <div className="outreach-reply-byline">
                <b>Jordan</b>
                <span>@jordan · Question</span>
                <Icon name="more" />
              </div>
              <p>Can I contribute if I’m new to AI safety?</p>
              <SocialActions />
            </div>
          </div>
          <div className="outreach-x-reply outreach-x-nori-reply">
            <Avatar />
            <div>
              <div className="outreach-reply-byline">
                <b>Nori</b>
                <span>@nori · Reply draft</span>
                <Icon name="more" />
              </div>
              <small>
                Replying to <span>@jordan</span>
              </small>
              <p>
                Yes. Bring a task you know well. We’ll start with the decisions
                that should stay with a person.
              </p>
              <SocialActions />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
function ReelArt() {
  return (
    <div className="outreach-reel-art">
      <span className="outreach-reel-kicker">AUTONOMY, WITH INTENTION</span>
      <div className="outreach-reel-question">
        Where should
        <br />
        an agent
        <br />
        <strong>stop?</strong>
      </div>
      <svg
        className="outreach-reel-diagram"
        viewBox="0 0 280 260"
        fill="none"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="outreach-reel-grid"
            width="20"
            height="20"
            patternUnits="userSpaceOnUse"
          >
            <path d="M20 0H0v20" stroke="#c9d6c0" strokeWidth=".7" />
          </pattern>
        </defs>
        <rect width="280" height="260" fill="url(#outreach-reel-grid)" />
        <circle
          cx="140"
          cy="132"
          r="80"
          stroke="#718365"
          strokeWidth="1.3"
          strokeDasharray="3 5"
        />
        <path
          d="M22 228V176Q22 154 44 154H140V74Q140 34 180 34H258"
          stroke="#274835"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M140 106V74Q140 34 180 34H258"
          stroke="#ee6745"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <rect
          x="120"
          y="132"
          width="40"
          height="40"
          rx="10"
          fill="#fbfcf6"
          stroke="#274835"
          strokeWidth="1.4"
        />
        <image href="/nori-head.webp" x="123" y="134" width="34" height="34" />
        <circle
          cx="140"
          cy="52"
          r="15"
          fill="#ee6745"
          stroke="#f7f6e9"
          strokeWidth="5"
        />
        <path
          d="M136 52h8m-4-4v8"
          stroke="#fff8ec"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <circle cx="22" cy="228" r="5" fill="#274835" />
        <circle cx="258" cy="34" r="5" fill="#274835" />
      </svg>
      <div className="outreach-reel-message">A person makes the call.</div>
      <div className="outreach-reel-bottom">
        <div>
          <Avatar />
          <b>nori</b>
          <span>Follow</span>
        </div>
        <p>Clear limits. Useful autonomy.</p>
      </div>
      <div className="outreach-reel-progress" />
    </div>
  );
}
function InstagramScene() {
  return (
    <article className="outreach-scene" aria-labelledby="outreach-reel-title">
      <div className="outreach-scene-intro">
        <span className="outreach-scene-index">02 / INSTAGRAM REELS</span>
        <h3 id="outreach-reel-title">
          One useful question.
          <br />A different way to tell it.
        </h3>
        <p>
          Make the question clear. Give people a reason to join the
          conversation.
        </p>
      </div>
      <span className="outreach-crop-label">Instagram · Reels</span>
      <div
        className="outreach-app outreach-instagram"
        role="group"
        aria-label="Instagram Reels with a workshop visual about useful autonomy and human judgment"
      >
        <aside className="outreach-ig-rail" aria-hidden="true">
          <b className="outreach-ig-wordmark">Instagram</b>
          {(
            [
              ["home", "Home"],
              ["search", "Search"],
              ["explore", "Explore"],
              ["reels", "Reels"],
              ["send", "Messages"],
              ["heart", "Notifications"],
              ["plus", "Create"],
            ] as const
          ).map(([icon, label]) => (
            <div className={label === "Reels" ? "is-current" : ""} key={label}>
              <Icon name={icon} />
              <span>{label}</span>
            </div>
          ))}
          <div>
            <Avatar />
            <span>Profile</span>
          </div>
          <div className="outreach-ig-more">
            <Icon name="menu" />
            <span>More</span>
          </div>
        </aside>
        <div className="outreach-ig-stage">
          <div className="outreach-ig-tabs">
            <b>For you</b>
            <span>Following</span>
          </div>
          <div className="outreach-ig-player">
            <ReelArt />
            <SocialActions instagram />
          </div>
        </div>
      </div>
    </article>
  );
}
function GmailScene() {
  return (
    <article className="outreach-scene" aria-labelledby="outreach-mail-title">
      <div className="outreach-scene-intro">
        <span className="outreach-scene-index">03 / GMAIL</span>
        <h3 id="outreach-mail-title">
          Keep the relationship
          <br />
          beyond the feed.
        </h3>
        <p>
          A supporter update connects the workshop, the brief, and what happens
          next. Saved for review.
        </p>
      </div>
      <span className="outreach-crop-label">Gmail · Compose crop</span>
      <div
        className="outreach-app outreach-gmail"
        role="group"
        aria-label="Gmail desktop inbox with an unsent supporter email open in a compose window; draft saved"
      >
        <div className="outreach-gmail-topbar">
          <Icon name="menu" />
          <div className="outreach-gmail-wordmark">
            <svg viewBox="0 0 24 20" fill="none" aria-hidden="true">
              <path d="M2 17V3l10 7L22 3v14" stroke="#4285f4" strokeWidth="4" />
              <path d="m2 3 10 7 10-7" stroke="#ea4335" strokeWidth="4" />
              <path d="M22 3v14" stroke="#34a853" strokeWidth="4" />
              <path d="m2 3 3 2" stroke="#fbbc04" strokeWidth="4" />
            </svg>
            <span>Gmail</span>
          </div>
          <div className="outreach-gmail-search">
            <Icon name="search" />
            <span>Search mail</span>
            <span>☷</span>
          </div>
          <span className="outreach-gmail-top-icons">
            <Icon name="settings" />
            <Icon name="grid" />
            <Avatar />
          </span>
        </div>
        <div className="outreach-gmail-main">
          <aside className="outreach-gmail-rail" aria-hidden="true">
            <span className="outreach-compose-button">
              ╱ <b>Compose</b>
            </span>
            {(
              [
                ["inbox", "Inbox"],
                ["bookmark", "Starred"],
                ["clock", "Snoozed"],
                ["send", "Sent"],
                ["draft", "Drafts"],
              ] as const
            ).map(([icon, label]) => (
              <div
                key={label}
                className={label === "Drafts" ? "is-current" : ""}
              >
                <Icon name={icon} />
                <span>{label}</span>
                {label === "Drafts" && <b>1</b>}
              </div>
            ))}
            <small>
              Labels <span>+</span>
            </small>
            <div>
              <span className="outreach-label-dot" />
              Workshop
            </div>
          </aside>
          <div className="outreach-gmail-inbox">
            <div className="outreach-inbox-toolbar">
              <span>□　⌄　 ↻　 ⋮</span>
              <span>1–3 of 3　 ‹　 ›</span>
            </div>
            <div className="outreach-inbox-tabs">
              <b>
                <Icon name="inbox" />
                Primary
              </b>
              <span>Promotions</span>
              <span>Social</span>
            </div>
            {[
              [
                "Maya",
                "Workshop brief — review notes",
                "The discussion format looks ready for review.",
              ],
              [
                "Sam",
                "Community workshop",
                "I’ve added the questions from the contributor group.",
              ],
              [
                "Draft",
                "A workshop is a beginning.",
                "We’re exploring where AI agents should ask a person…",
              ],
            ].map(([sender, subject, copy]) => (
              <div className="outreach-inbox-row" key={sender}>
                <span>□　☆</span>
                <b>{sender}</b>
                <span>
                  <b>{subject}</b> — {copy}
                </span>
                <small>9:41 AM</small>
              </div>
            ))}
          </div>
          <div className="outreach-gmail-compose">
            <div className="outreach-compose-title">
              <b>New Message</b>
              <span>−　⤢　×</span>
            </div>
            <div className="outreach-compose-field">
              <span>To</span>
              <b>Project supporters</b>
              <small>Cc　Bcc</small>
            </div>
            <div className="outreach-compose-subject">
              A workshop is a beginning.
            </div>
            <div className="outreach-compose-copy">
              <p>Hello everyone,</p>
              <p>
                We’re exploring where AI agents should ask a person. Join our
                community workshop.
              </p>
              <p>
                Please review the attached brief. We’ll follow up with notes and
                ways to contribute.
              </p>
              <p className="outreach-mail-signature">Nori</p>
              <div className="outreach-mail-attachment">
                <Icon name="draft" />
                <span>Workshop brief.pdf</span>
                <small>×</small>
              </div>
            </div>
            <div className="outreach-compose-footer">
              <span className="outreach-send-control">
                Send <span>⌄</span>
              </span>
              <span className="outreach-format-control">A̲</span>
              <Icon name="attach" />
              <Icon name="share" />
              <span className="outreach-draft-saved">
                <Icon name="check" />
                Draft saved
              </span>
              <Icon name="trash" />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
export function Communications() {
  return (
    <section
      className="section communications-section outreach-section"
      id="communications"
      aria-labelledby="communications-title"
    >
      <div className="section-inner">
        <div className="section-heading outreach-heading">
          <SectionLabel number="05">
            Communications & relationships
          </SectionLabel>
          <h2 id="communications-title">
            One project.
            <br />A voice for every channel.
          </h2>
          <p>
            Nori turns the work into stories, conversations, and a reason to
            stay involved.
          </p>
        </div>
        <div className="outreach-source">
          <span>THE SOURCE</span>
          <strong>AI safety community workshop</strong>
          <p>Where does human judgment belong?</p>
          <span className="outreach-source-author">
            <Avatar />
            Adapted by Nori
          </span>
        </div>
        <XScene />
        <InstagramScene />
        <GmailScene />
      </div>
    </section>
  );
}
