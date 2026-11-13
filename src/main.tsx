import React, {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import { createRoot } from "react-dom/client";
import "@fontsource-variable/manrope";
import "./styles.css";
import {
  DISCORD,
  GITHUB,
  stories,
  roles,
  extendedRoles,
  type Story,
} from "./content";
import roleArtwork from "../docs/design/concepts-v0.4/02-roles.png";
import headArtwork from "../docs/design/concepts-v0.4/09-open-source.png";

const Arrow = () => <span aria-hidden="true">↗</span>;
function Head({
  variant = 0,
  className = "",
}: {
  variant?: number;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={`nori-head ${className}`}
      style={{
        backgroundImage: `url(${headArtwork})`,
        backgroundPosition: `${[56.5, 70.5, 84.3, 98.2][variant]}% 54.5%`,
      }}
    />
  );
}
function Link({
  children,
  href = DISCORD,
  secondary = false,
}: {
  children: ReactNode;
  href?: string;
  secondary?: boolean;
}) {
  return (
    <a className={`button ${secondary ? "secondary" : ""}`} href={href}>
      {children}
      <Arrow />
    </a>
  );
}
type OpenCase = (story: Story, trigger: HTMLElement) => void;
function CaseCard({
  story,
  children,
  className = "",
  open,
}: {
  story: Story;
  children: ReactNode;
  className?: string;
  open: OpenCase;
}) {
  const inner = useRef<HTMLSpanElement>(null);
  return (
    <button
      className={`case-card ${className}`}
      aria-label={`View case: ${story.title}`}
      onClick={(e) => open(story, e.currentTarget)}
      onPointerMove={(e) => {
        if (
          e.pointerType !== "mouse" ||
          !matchMedia("(prefers-reduced-motion: no-preference)").matches
        )
          return;
        const r = e.currentTarget.getBoundingClientRect();
        inner.current?.style.setProperty(
          "--rx",
          `${(-(e.clientY - r.top - r.height / 2) / r.height) * 4}deg`,
        );
        inner.current?.style.setProperty(
          "--ry",
          `${((e.clientX - r.left - r.width / 2) / r.width) * 4}deg`,
        );
      }}
      onPointerLeave={() => {
        inner.current?.style.setProperty("--rx", "0deg");
        inner.current?.style.setProperty("--ry", "0deg");
      }}
    >
      <span className="card-surface" ref={inner}>
        {children}
        <span className="case-hint">
          View case <Arrow />
        </span>
      </span>
    </button>
  );
}
function Thread({
  story,
  open,
  className = "",
}: {
  story: Story;
  open: OpenCase;
  className?: string;
}) {
  return (
    <CaseCard story={story} open={open} className={`thread ${className}`}>
      <span className="window-bar">
        <span className="window-dots" aria-hidden="true">
          ● ● ●
        </span>
        <span># {story.channel}</span>
        <span aria-hidden="true">···</span>
      </span>
      <span className="messages">
        {story.messages.map(([who, text], i) => (
          <span className="message" key={i}>
            {who === "Nori" ? (
              <Head />
            ) : (
              <span className="person" aria-hidden="true">
                {who[0]}
              </span>
            )}
            <span>
              <strong>{who}</strong>
              <span>{text}</span>
            </span>
          </span>
        ))}
      </span>
    </CaseCard>
  );
}
function Artifact({
  story,
  index = 0,
  open,
  className = "",
}: {
  story: Story;
  index?: number;
  open: OpenCase;
  className?: string;
}) {
  const [title, text] = story.artifacts[index];
  return (
    <CaseCard story={story} open={open} className={`artifact ${className}`}>
      <span className="artifact-icon" aria-hidden="true">
        {index % 2 ? "✓" : "▤"}
      </span>
      <strong>{title}</strong>
      <span className="artifact-copy">{text}</span>
    </CaseCard>
  );
}
function Tabs({
  ids,
  active,
  onChange,
  label,
}: {
  ids: string[];
  active: string;
  onChange: (id: string) => void;
  label: string;
}) {
  return (
    <div className="tabs" role="tablist" aria-label={label}>
      {ids.map((id, i) => (
        <button
          key={id}
          role="tab"
          id={`tab-${id}`}
          aria-selected={active === id}
          aria-controls={`panel-${ids[0]}`}
          tabIndex={active === id ? 0 : -1}
          onClick={() => onChange(id)}
          onKeyDown={(e) => {
            let next = i;
            if (e.key === "ArrowRight") next = (i + 1) % ids.length;
            else if (e.key === "ArrowLeft")
              next = (i + ids.length - 1) % ids.length;
            else if (e.key === "Home") next = 0;
            else if (e.key === "End") next = ids.length - 1;
            else return;
            e.preventDefault();
            onChange(ids[next]);
            document.getElementById(`tab-${ids[next]}`)?.focus();
          }}
        >
          {stories[id].tab}
        </button>
      ))}
    </div>
  );
}
function StorySection({
  id,
  number,
  eyebrow,
  title,
  description,
  ids,
  open,
  kind = "",
}: {
  id: string;
  number: string;
  eyebrow: string;
  title: string;
  description: string;
  ids: string[];
  open: OpenCase;
  kind?: string;
}) {
  const [active, setActive] = useState(ids[0]);
  const story = stories[active];
  return (
    <section
      id={id}
      className={`section story-section ${kind}`}
      aria-labelledby={`${id}-title`}
    >
      <div className="section-heading">
        <p className="eyebrow">
          <span>{number}</span> {eyebrow}
        </p>
        <h2 id={`${id}-title`}>{title}</h2>
        <p className="section-intro">{description}</p>
      </div>
      <Tabs
        ids={ids}
        active={active}
        onChange={setActive}
        label={`${eyebrow} stories`}
      />
      <div
        role="tabpanel"
        id={`panel-${ids[0]}`}
        aria-labelledby={`tab-${active}`}
        tabIndex={0}
        className="story-panel"
      >
        <div className="story-caption">
          <h3>{story.title}</h3>
          <p>{story.summary}</p>
        </div>
        <div className="story-composition">
          <Thread story={story} open={open} />
          <div className="artifact-stack">
            {story.artifacts.map((_, i) => (
              <Artifact story={story} index={i} key={i} open={open} />
            ))}
          </div>
        </div>
      </div>
      {kind === "finance" && (
        <div className="treasury-strip">
          <div>
            <span className="eyebrow">A layered treasury</span>
            <h3>
              Limited working funds.
              <br />
              Separate reserves.
            </h3>
          </div>
          <ol>
            <li>
              <strong>Organization reserves</strong>
              <span>Independently controlled</span>
            </li>
            <li>
              <strong>Project budgets</strong>
              <span>Purpose-bound allocations</span>
            </li>
            <li>
              <strong>Nori’s hot wallet</strong>
              <span>Enforced operating limits</span>
            </li>
          </ol>
          <button
            className="text-link"
            onClick={(e) => open(stories.treasury, e.currentTarget)}
          >
            Explore on-chain work <Arrow />
          </button>
        </div>
      )}
      <p className="scenario-note">Illustrative product scenario</p>
    </section>
  );
}
function Team() {
  const [selected, setSelected] = useState(4);
  const role = roles[selected];
  return (
    <section className="section team" id="team" aria-labelledby="team-title">
      <div className="section-heading centered">
        <p className="eyebrow">
          02 <span>Meet your team</span>
        </p>
        <h2 id="team-title">
          One Nori. Many roles.
          <br />A working organization.
        </h2>
        <p className="section-intro">
          Executive accountability, support for your people, and hands-on
          execution.
          <br className="desktop-break" /> Different roles. The same commitment
          to your mission.
        </p>
      </div>
      <div className="badge-grid" aria-label="Nori roles">
        {roles.map((r, i) => (
          <button
            key={r.title}
            className={`badge ${selected === i ? "selected" : ""}`}
            aria-pressed={selected === i}
            aria-controls="role-detail"
            onClick={() => setSelected(i)}
            style={
              {
                "--role-color": r.color,
                "--badge-rotation": `${[-3, 2, -2, 3, -2, 3][i]}deg`,
              } as CSSProperties
            }
          >
            <span className="lanyard" aria-hidden="true" />
            <span className="metal-clip" aria-hidden="true" />
            <span className="badge-sleeve">
              <span className="badge-insert">
                <span
                  className="portrait"
                  aria-hidden="true"
                  style={{
                    backgroundImage: `url(${roleArtwork})`,
                    backgroundPosition: `${[6.1, 23.9, 41.3, 58.5, 77.2, 95.2][i]}% 49%`,
                  }}
                />
                <span className="badge-name">
                  NORI <span>0{i + 1}</span>
                </span>
                <span className="badge-org">Rein Protocol Foundation</span>
                <strong>{r.title}</strong>
                <span className="badge-type">{r.type}</span>
              </span>
            </span>
          </button>
        ))}
      </div>
      <div className="role-detail" id="role-detail" aria-live="polite">
        <span className="role-dot" style={{ background: role.color }} />
        <div>
          <h3>{role.title}</h3>
          <p>{role.description}</p>
        </div>
        <div className="role-output">
          <span>On the desk</span>
          <strong>{role.work}</strong>
          <p>{role.tools}</p>
        </div>
      </div>
      <details className="more-roles">
        <summary>
          More roles, wherever the work needs them{" "}
          <span aria-hidden="true">+</span>
        </summary>
        <div>
          {extendedRoles.map(([title, description]) => (
            <article key={title}>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </details>
    </section>
  );
}
function CaseDialog({
  story,
  onClose,
  dialogRef,
}: {
  story: Story | null;
  onClose: () => void;
  dialogRef: React.RefObject<HTMLDialogElement | null>;
}) {
  return (
    <dialog
      ref={dialogRef}
      className="case-dialog"
      aria-labelledby="case-title"
      onKeyDown={(e) => {
        if (e.key !== "Tab") return;
        const items =
          e.currentTarget.querySelectorAll<HTMLElement>("button, a[href]");
        const first = items[0],
          last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {story && (
        <div className="dialog-inner">
          <div className="dialog-top">
            <span className="eyebrow">Inside the work</span>
            <button
              autoFocus
              className="close-button"
              aria-label="Close case details"
              onClick={onClose}
            >
              ✕
            </button>
          </div>
          <p className="case-category">{story.tab}</p>
          <h2 id="case-title">{story.title}</h2>
          <p className="dialog-summary">{story.summary}</p>
          <p className="scenario-label">Illustrative product scenario</p>
          <h3>How Nori carries it forward</h3>
          <ol className="action-list">
            {story.actions.map((action, i) => (
              <li key={action}>
                <span>0{i + 1}</span>
                <p>{action}</p>
              </li>
            ))}
          </ol>
          <h3>The work it leaves behind</h3>
          <div className="detail-artifacts">
            {story.artifacts.map(([title, copy]) => (
              <div key={title}>
                <span aria-hidden="true">▤</span>
                <div>
                  <strong>{title}</strong>
                  <p>{copy}</p>
                </div>
              </div>
            ))}
          </div>
          <h3>People & platforms</h3>
          <p>{story.collaboration}</p>
          <div className="outcome">
            <h3>The result & next step</h3>
            <p>{story.outcome}</p>
          </div>
          <Link>Meet Nori in Discord</Link>
        </div>
      )}
    </dialog>
  );
}
function App() {
  const [menu, setMenu] = useState(false);
  const [story, setStory] = useState<Story | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLElement | null>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const open: OpenCase = (value, element) => {
    trigger.current = element;
    setStory(value);
  };
  useEffect(() => {
    if (story) {
      const scrollY = window.scrollY;
      const previous = {
        overflow: document.body.style.overflow,
        position: document.body.style.position,
        top: document.body.style.top,
        width: document.body.style.width,
      };
      Object.assign(document.body.style, {
        overflow: "hidden",
        position: "fixed",
        top: `-${scrollY}px`,
        width: "100%",
      });
      dialog.current?.showModal();
      return () => {
        Object.assign(document.body.style, previous);
        window.scrollTo({ top: scrollY, behavior: "instant" });
      };
    }
  }, [story]);
  const close = () => {
    dialog.current?.close();
    setStory(null);
    trigger.current?.focus({ preventScroll: true });
  };
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <a href="#" className="brand" aria-label="Nori home">
          <Head />
          Nori<span className="brand-period">.</span>
        </a>
        <button
          ref={menuButton}
          className="menu-toggle"
          aria-expanded={menu}
          aria-controls="navigation"
          onClick={() => setMenu(!menu)}
        >
          {menu ? "Close" : "Menu"}{" "}
          <span aria-hidden="true">{menu ? "−" : "+"}</span>
        </button>
        <nav
          id="navigation"
          aria-label="Main navigation"
          className={menu ? "is-open" : ""}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setMenu(false);
              menuButton.current?.focus();
            }
          }}
        >
          <a onClick={() => setMenu(false)} href="#work">
            What Nori does
          </a>
          <a onClick={() => setMenu(false)} href="#team">
            Meet the team
          </a>
          <a onClick={() => setMenu(false)} href="#rein">
            Running with Rein
          </a>
          <a onClick={() => setMenu(false)} href="#open-source">
            Open source
          </a>
          <a className="nav-pilot" href={DISCORD}>
            Become a pilot <Arrow />
          </a>
        </nav>
      </header>
      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <p className="eyebrow">
            <span className="status-dot" /> An open-source super agent for
            organizations
          </p>
          <h1 id="hero-title">
            Meet Nori.
            <br />
            Built to help run
            <br className="mobile-break" /> your organization.
          </h1>
          <p className="hero-copy">
            From daily operations and governance to treasury, community, and
            growth, Nori carries work forward over the long term—alongside your
            team, in the tools you already use.
          </p>
          <p className="audience">Built with nonprofits and NGOs in mind.</p>
          <div className="cta-row">
            <Link>Meet Nori in Discord</Link>
            <Link secondary>Become a pilot organization</Link>
          </div>
          <div className="hero-stage">
            <Artifact
              story={stories.handoff}
              index={0}
              open={open}
              className="hero-calendar"
            />
            <Thread story={stories.handoff} open={open} />
            <Artifact
              story={stories.handoff}
              index={1}
              open={open}
              className="hero-delivery"
            />
          </div>
          <div className="hero-bottom">
            <span>
              <span className="status-dot" /> The work keeps moving.
            </span>
            <span>Illustrative product scenario</span>
            <a href="#team">
              Meet the team <span aria-hidden="true">↓</span>
            </a>
          </div>
        </section>
        <Team />
        <StorySection
          id="work"
          number="03"
          eyebrow="Operations & governance"
          title="Take care of the work behind a working team."
          description="Finds the right services. Gets them in place. Follows the work through."
          ids={["requests", "hiring", "payroll", "board"]}
          open={open}
        />
        <StorySection
          id="finance"
          number="04"
          eyebrow="Finance & resources"
          title="Put the organization’s resources to work."
          description="Connect treasury, payments, fundraising, and everyday commerce through established platforms."
          ids={["expenses", "treasury", "storefront", "funding"]}
          open={open}
          kind="finance"
        />
        <StorySection
          id="community"
          number="05"
          eyebrow="Community & projects"
          title="A community that builds with Nori."
          description="Find a first contribution, work through a real problem, and help shape what Nori can do next. When the work needs human expertise, Nori brings the right people into it."
          ids={["contribution", "expertise", "events"]}
          open={open}
          kind="community"
        />
        <StorySection
          id="communications"
          number="06"
          eyebrow="Communications & relationships"
          title="Give the organization a voice that stays active."
          description="Share what the team is doing, join relevant conversations, and turn programs into stories people can discover, discuss, and support."
          ids={["voice", "media"]}
          open={open}
          kind="communications"
        />
        <section
          id="rein"
          className="rein-section"
          aria-labelledby="rein-title"
        >
          <div className="rein-copy">
            <p className="eyebrow">
              07 <span>Running with Rein</span>
            </p>
            <h2 id="rein-title">
              A mission worth
              <br />
              carrying forward.
            </h2>
            <p className="rein-name">
              Meet Nori at
              <br />
              Rein Protocol Foundation.
            </p>
            <p>
              Rein Protocol Foundation is a nonprofit focused on AI safety and
              making AI agents safe for people and society.
            </p>
            <p>
              It is the first organization through which you can meet Nori and
              explore its role in organizational work.
            </p>
            <Link>Meet Nori in Discord</Link>
            <small>Meet the community. Explore projects. Take part.</small>
          </div>
          <div className="rein-work">
            <p className="eyebrow">An organization’s work, connected</p>
            <h3>
              An AI safety project,
              <br />
              carried forward.
            </h3>
            {stories.rein.artifacts.map((_, i) => (
              <Artifact key={i} story={stories.rein} index={i} open={open} />
            ))}
            <p className="scenario-note">Illustrative project journey</p>
          </div>
        </section>
        <section
          className="section continuity"
          aria-labelledby="continuity-title"
        >
          <div className="section-heading">
            <p className="eyebrow">
              08 <span>Built for the long term</span>
            </p>
            <h2 id="continuity-title">
              The work continues.
              <br />
              Even as the organization changes.
            </h2>
            <p className="section-intro">
              Keep decisions, commitments, and relationships connected across
              weeks, quarters, and team changes. Give the next person the
              context to continue.
            </p>
          </div>
          <div className="continuity-artifacts">
            {stories.continuity.artifacts.map((_, i) => (
              <Artifact
                key={i}
                story={stories.continuity}
                index={i}
                open={open}
              />
            ))}
          </div>
          <p className="trust-line">
            Clear roles. Appropriate access. A record of what happened.
          </p>
          <p className="trust-copy">
            Nori works within the organization’s policies, with people involved
            where decisions and authority require them.
          </p>
        </section>
        <section
          className="section open-source"
          id="open-source"
          aria-labelledby="open-title"
        >
          <p className="eyebrow">
            09 <span>Build with us</span>
          </p>
          <h2 id="open-title">
            Open source.
            <br />
            Built with the community.
          </h2>
          <div className="open-middle">
            <p>
              Nori brings open-source collaboration to the work of running an
              organization. Follow the work, contribute your perspective, or
              help shape Nori in your organization.
            </p>
            <div className="head-line">
              {[0, 1, 2, 3].map((v) => (
                <Head key={v} variant={v} />
              ))}
            </div>
          </div>
          <div className="cta-row">
            <Link>Become a pilot organization</Link>
            <a className="text-link" href={GITHUB}>
              Explore GitHub <Arrow />
            </a>
            <a className="text-link" href={DISCORD}>
              Join our Discord server <Arrow />
            </a>
          </div>
        </section>
      </main>
      <footer>
        <a className="brand" href="#">
          <Head />
          Nori.
        </a>
        <p>By Rein Protocol Foundation</p>
        <a href={GITHUB}>
          Open source <Arrow />
        </a>
        <a href={DISCORD}>
          Community <Arrow />
        </a>
      </footer>
      <CaseDialog story={story} onClose={close} dialogRef={dialog} />
    </>
  );
}
createRoot(document.getElementById("root")!).render(<App />);
