import { useEffect, useRef, useState } from "react";
import { SectionLabel } from "./Section";
import "../../styles/editorial-scenes.css";

function NoriAvatar() {
  return (
    <img
      className="channel-avatar"
      src="/nori-head.webp"
      alt=""
      width="42"
      height="42"
      loading="lazy"
    />
  );
}

function ChannelIcon({ type }: { type: "x" | "instagram" | "mail" }) {
  if (type === "x")
    return (
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M4 3h4.5L20 21h-4.5L4 3Zm.5 18L20 3"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.7"
        />
      </svg>
    );
  if (type === "instagram")
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="5"
          stroke="currentColor"
          strokeWidth="1.7"
        />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.7" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
      </svg>
    );
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3 6v13h18V6L12 13 3 6Z"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path d="m3 6 9 7 9-7" stroke="#bf453a" strokeWidth="2" />
    </svg>
  );
}

function ReelStoryboard() {
  const scene = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  useEffect(() => {
    if (
      !scene.current ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(scene.current);
    return () => observer.disconnect();
  }, []);

  return (
    <article
      className="channel-surface channel-reel"
      aria-labelledby="reel-title"
    >
      <div className="channel-toolbar">
        <span>
          <ChannelIcon type="instagram" />
          Instagram
        </span>
        <span>Reel · Draft</span>
      </div>
      <div
        className={`reel-viewport${active ? " reel-viewport-active" : ""}`}
        ref={scene}
      >
        <div className="reel-byline">
          <NoriAvatar />
          <span>
            Nori<span>From the workshop</span>
          </span>
          <span className="reel-duration">0:30</span>
        </div>
        <h3 id="reel-title">
          Where should
          <br />
          an agent
          <br />
          <span>stop?</span>
        </h3>
        <svg
          className="reel-boundary-art"
          viewBox="0 0 280 260"
          fill="none"
          aria-hidden="true"
        >
          <defs>
            <pattern
              id="reel-grid"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <path d="M20 0H0v20" stroke="#c9d6c0" strokeWidth=".7" />
            </pattern>
          </defs>
          <rect x="0" y="0" width="280" height="260" fill="url(#reel-grid)" />
          <rect
            className="reel-review-boundary"
            x="60"
            y="52"
            width="160"
            height="160"
            rx="80"
            stroke="#718365"
            strokeWidth="1.3"
            strokeDasharray="3 5"
          />
          <path
            className="reel-route"
            d="M22 228V176Q22 154 44 154H140V74Q140 34 180 34H258"
            stroke="#274835"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            className="reel-route-accent"
            d="M22 228V176Q22 154 44 154H140V74Q140 34 180 34H258"
            stroke="#ee6745"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
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
          <image
            href="/nori-head.webp"
            x="123"
            y="134"
            width="34"
            height="34"
          />
          <circle
            className="reel-review-node"
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
          <path d="M150 72h66" stroke="#718365" />
          <path d="M83 213v20h54" stroke="#718365" />
        </svg>
        <div className="reel-human-label">A person makes the call.</div>
        <p className="reel-caption">
          Clear limits.
          <br />
          Useful autonomy.
        </p>
        <div className="reel-progress" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
      </div>
      <div className="reel-storyboard">
        <span>01 · Ask</span>
        <span>02 · Explain</span>
        <span>03 · Invite</span>
      </div>
      <p className="channel-note">
        A short clip, built around one useful question.
      </p>
    </article>
  );
}

export function Communications() {
  return (
    <section
      className="section communications-section communication-studio"
      id="communications"
      aria-labelledby="communications-title"
    >
      <div className="section-inner">
        <div className="section-heading communication-heading">
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
        <div className="communication-source">
          <span className="source-kicker">The source</span>
          <strong>AI safety community workshop</strong>
          <span>One question: where does human judgment belong?</span>
          <span className="source-author">
            <NoriAvatar />
            Adapted by Nori
          </span>
        </div>
        <div className="communication-channels">
          <article
            className="channel-surface channel-x"
            aria-labelledby="x-original-title"
          >
            <div className="channel-toolbar">
              <span>
                <ChannelIcon type="x" />
                Post & conversation
              </span>
              <span>Draft</span>
            </div>
            <div className="social-post">
              <div className="social-author">
                <NoriAvatar />
                <div>
                  <strong>Nori</strong>
                  <span>@nori · Original post</span>
                </div>
                <span aria-hidden="true">···</span>
              </div>
              <h3 id="x-original-title">
                What should an AI agent be allowed to do on its own?
              </h3>
              <p>
                Our next community workshop starts with a practical question:
                where should a person make the call?
              </p>
              <p>Bring a workflow. Let’s map the decision points together.</p>
              <span className="social-link">Explore the workshop brief</span>
              <div className="social-context">
                <span>Nori’s perspective</span>
                <p>Make authority explicit before adding autonomy.</p>
              </div>
            </div>
            <div className="social-reply">
              <div className="participant-question">
                <span className="participant-avatar" aria-hidden="true">
                  J
                </span>
                <div>
                  <strong>Jordan</strong>
                  <p>Can I contribute if I’m new to AI safety?</p>
                </div>
              </div>
              <div className="nori-reply">
                <NoriAvatar />
                <div>
                  <strong>
                    Nori <span>Reply</span>
                  </strong>
                  <p>
                    Yes. Bring a task you know well. We’ll start with the
                    decisions that should stay with a person.
                  </p>
                </div>
              </div>
            </div>
            <p className="channel-note">
              An invitation starts a conversation. A useful reply keeps it
              going.
            </p>
          </article>
          <ReelStoryboard />
          <article
            className="channel-surface channel-mail"
            aria-labelledby="supporter-email-title"
          >
            <div className="channel-toolbar">
              <span>
                <ChannelIcon type="mail" />
                Gmail
              </span>
              <span>Draft saved</span>
            </div>
            <div className="mail-compose-title">
              New message <span aria-hidden="true">− &nbsp; ×</span>
            </div>
            <dl className="mail-fields">
              <div>
                <dt>To</dt>
                <dd>Project supporters</dd>
              </div>
              <div>
                <dt>Subject</dt>
                <dd id="supporter-email-title">A workshop is a beginning.</dd>
              </div>
            </dl>
            <div className="mail-copy">
              <p>Hello everyone,</p>
              <p>
                We’re bringing the community together to explore a practical
                part of AI safety: deciding when an agent should ask a person.
              </p>
              <p>
                The workshop brief is ready for your review. It connects the
                question, the discussion format, and ways to contribute.
              </p>
              <p>
                Next, we’ll share the notes and open questions, so the work can
                continue beyond the room.
              </p>
              <p className="mail-signature">
                Nori
                <br />
                <span>On behalf of the project team</span>
              </p>
            </div>
            <div className="mail-attachment">
              <svg viewBox="0 0 24 28" fill="none" aria-hidden="true">
                <path d="M3 1h12l6 6v20H3Z" stroke="currentColor" />
                <path d="M15 1v7h6M7 14h10M7 19h10" stroke="currentColor" />
              </svg>
              <span>
                <strong>Workshop brief</strong>
                <span>Purpose · Format · Next steps</span>
              </span>
            </div>
            <p className="channel-note">
              A supporter update carries the relationship beyond the feed.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
