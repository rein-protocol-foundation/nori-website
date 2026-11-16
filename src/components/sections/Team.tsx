import {
  useEffect,
  useRef,
  type PointerEvent,
  type KeyboardEvent,
} from "react";
import { SectionLabel } from "./Section";
import "../../styles/badges.css";
const roles = [
  {
    portrait: "operations",
    name: "Chief Operating Officer",
    short: "Operations",
    duty: "Priorities, people & follow-through",
    color: "mint",
  },
  {
    portrait: "people",
    name: "Chief People Officer",
    short: "People",
    duty: "A better everyday experience at work",
    color: "pink",
  },
  {
    portrait: "finance",
    name: "Chief Financial Officer",
    short: "Finance",
    duty: "Resources connected to the mission",
    color: "cream",
  },
  {
    portrait: "community",
    name: "Community Lead",
    short: "Community",
    duty: "Contributors, conversations & shared work",
    color: "blue",
  },
  {
    portrait: "engineering",
    name: "Software Engineer",
    short: "Engineering",
    duty: "Build, test & deliver useful software",
    color: "lilac",
  },
];
function Badge({ index }: { index: number }) {
  const root = useRef<HTMLDivElement>(null);
  const card = useRef<HTMLDivElement>(null);
  const rope = useRef<SVGPathElement>(null);
  const stitch = useRef<SVGPathElement>(null);
  const physics = useRef({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    tx: 0,
    ty: 0,
    rx: 0,
    ry: 0,
    dragging: false,
    startX: 0,
    startY: 0,
    reduced: false,
  });
  const wake = useRef(() => {});
  const role = roles[index];
  useEffect(() => {
    const state = physics.current;
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const change = () => {
      state.reduced = media.matches;
      wake.current();
    };
    change();
    media.addEventListener("change", change);
    let frame = 0,
      last = 0,
      activeTime = 0;
    let visible = false;
    const schedule = () => {
      if (!frame && visible && !document.hidden)
        frame = requestAnimationFrame(tick);
    };
    wake.current = schedule;
    const tick = (now: number) => {
      frame = 0;
      if (!visible || document.hidden) {
        last = 0;
        return;
      }
      const dt = Math.min((now - (last || now - 16)) / 1000, 0.032);
      last = now;
      if (visible) {
        if (!state.reduced) activeTime += dt;
        const idle =
          !state.reduced &&
          activeTime < 3.2 &&
          !state.dragging &&
          state.tx === 0 &&
          state.ty === 0;
        const targetX =
          state.tx +
          (idle
            ? Math.sin(activeTime * 2.4 + index * 1.3) *
              7 *
              Math.max(0, 1 - activeTime / 3.2)
            : 0);
        const targetY =
          state.ty +
          (idle
            ? Math.sin(activeTime * 1.8 + index * 1.3) *
              Math.max(0, 1 - activeTime / 3.2)
            : 0);
        if (state.reduced) {
          state.x = state.tx;
          state.y = state.ty;
          state.vx = state.vy = 0;
        } else {
          const stiffness = state.dragging ? 180 : 48;
          const damping = state.dragging ? 22 : 7.8;
          state.vx +=
            ((targetX - state.x) * stiffness - damping * state.vx) * dt;
          state.vy +=
            ((targetY - state.y) * stiffness - damping * state.vy) * dt;
          state.x += state.vx * dt;
          state.y += state.vy * dt;
        }
        const { x, y } = state;
        const angle = state.reduced ? 0 : -x * 0.065 + state.vx * 0.006;
        const blend = state.reduced ? 1 : 1 - Math.exp(-9 * dt);
        state.rx += ((state.reduced ? 0 : -y * 0.04) - state.rx) * blend;
        state.ry += ((state.reduced ? 0 : x * 0.07) - state.ry) * blend;
        card.current?.style.setProperty(
          "transform",
          `translate3d(${x}px,${y}px,0) rotateZ(${angle + (index - 2) * 1.3}deg) rotateX(${state.rx}deg) rotateY(${state.ry}deg)`,
        );
        card.current?.style.setProperty("--shine-x", `${50 + state.ry * 3}%`);
        card.current?.style.setProperty("--shine-y", `${35 - state.rx * 4}%`);
        const d = `M 170 -12 C ${170 + x * 0.12} 40, ${170 + x * 0.62} ${96 + y * 0.3}, ${170 + x} ${145 + y}`;
        rope.current?.setAttribute("d", d);
        stitch.current?.setAttribute("d", d);
      }
      const settling =
        Math.abs(state.x - state.tx) +
          Math.abs(state.y - state.ty) +
          Math.abs(state.vx) +
          Math.abs(state.vy) >
        0.02;
      if ((!state.reduced && (activeTime < 3.2 || settling)) || state.dragging)
        schedule();
      else last = 0;
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) schedule();
      else {
        cancelAnimationFrame(frame);
        frame = 0;
        last = 0;
      }
    });
    if (root.current) observer.observe(root.current);
    const visibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(frame);
        frame = 0;
        last = 0;
      } else schedule();
    };
    document.addEventListener("visibilitychange", visibilityChange);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      wake.current = () => {};
      media.removeEventListener("change", change);
      document.removeEventListener("visibilitychange", visibilityChange);
    };
  }, [index]);
  const move = (event: PointerEvent<HTMLDivElement>) => {
    wake.current();
    const s = physics.current;
    if (s.dragging) {
      s.tx = Math.max(
        -62,
        Math.min(
          62,
          (event.clientX - s.startX) /
            (root.current!.getBoundingClientRect().width / 340),
        ),
      );
      s.ty = Math.max(
        -35,
        Math.min(
          75,
          (event.clientY - s.startY) /
            (root.current!.getBoundingClientRect().width / 340),
        ),
      );
    } else if (!s.reduced && event.pointerType === "mouse") {
      const r = root.current!.getBoundingClientRect();
      const nx = Math.max(
        -1,
        Math.min(1, ((event.clientX - r.left) / r.width) * 2 - 1),
      );
      const ny = Math.max(
        -1,
        Math.min(
          1,
          ((event.clientY - r.top - r.height * 0.2) / (r.height * 0.8)) * 2 - 1,
        ),
      );
      s.tx = nx * 12;
      s.ty = ny * 5;
    }
  };
  const release = () => {
    const s = physics.current;
    s.dragging = false;
    s.tx = s.ty = 0;
    card.current?.classList.remove("is-dragging");
    wake.current();
  };
  const keyboard = (event: KeyboardEvent<HTMLDivElement>) => {
    if (
      ![
        "ArrowLeft",
        "ArrowRight",
        "ArrowUp",
        "ArrowDown",
        "Escape",
        "Enter",
        " ",
      ].includes(event.key)
    )
      return;
    event.preventDefault();
    const s = physics.current;
    if (event.key === "Escape") {
      release();
      s.x = s.y = s.vx = s.vy = 0;
    } else if (!s.reduced) {
      s.vx +=
        event.key === "ArrowLeft" ? -260 : event.key === "ArrowRight" ? 260 : 0;
      s.vy +=
        event.key === "ArrowUp" ? -180 : event.key === "ArrowDown" ? 180 : 0;
      if (event.key === "Enter" || event.key === " ") s.vx += 200;
    }
    wake.current();
  };
  return (
    <div className={`badge-stage badge-${role.color}`} ref={root}>
      <svg className="elastic-lanyard" viewBox="0 0 340 720" aria-hidden="true">
        <path ref={rope} d="M170 -12V145" className="rope-body" />
        <path ref={stitch} d="M170 -12V145" className="rope-stitch" />
      </svg>
      <div
        ref={card}
        className="badge-object"
        tabIndex={0}
        role="button"
        aria-label={`Drag Nori's ${role.name} badge, or use arrow keys to swing it`}
        aria-describedby="badge-instructions"
        onPointerDown={(e) => {
          if (e.button !== 0) return;
          const s = physics.current;
          s.dragging = true;
          wake.current();
          const scale = root.current!.getBoundingClientRect().width / 340;
          s.startX = e.clientX - s.x * scale;
          s.startY = e.clientY - s.y * scale;
          e.currentTarget.setPointerCapture(e.pointerId);
          e.currentTarget.classList.add("is-dragging");
        }}
        onPointerMove={move}
        onPointerUp={release}
        onPointerCancel={release}
        onLostPointerCapture={release}
        onPointerLeave={() => {
          if (!physics.current.dragging) {
            physics.current.tx = 0;
            physics.current.ty = 0;
            wake.current();
          }
        }}
        onKeyDown={keyboard}
        onBlur={release}
      >
        <div className="badge-hardware">
          <i className="hardware-ring" />
          <i className="hardware-clip" />
          <i className="hardware-rivet" />
        </div>
        <div className="badge-shell">
          <div className="badge-slot" />
          <div className="badge-insert">
            <div className="badge-brand">
              <b>
                nori<span> / {role.short}</span>
              </b>
              <span>ONE NORI. EVERY ROLE.</span>
            </div>
            <div className="badge-photo">
              <span className="badge-series">
                ROLE
                <br />0{index + 1}
              </span>
              <img
                src={`/nori-roles/${role.portrait}.webp`}
                width="520"
                height="520"
                loading="lazy"
                decoding="async"
                alt={`Nori as ${role.name}, with role-specific clothing and accessories`}
                draggable={false}
              />
            </div>
            <div className="badge-identity">
              <div>
                <h3>{role.name}</h3>
              </div>

              <p>{role.duty}</p>
              <div className="badge-bottom">
                <span>
                  NORI — 00{index + 1}
                  <br />
                  NORI EMBODIMENT
                </span>
                <span className="badge-code" aria-hidden="true" />
              </div>
            </div>
          </div>
          <div className="badge-gloss" />
        </div>
      </div>
    </div>
  );
}
export function Team() {
  return (
    <section
      className="section team-showcase"
      id="team"
      aria-labelledby="team-title"
    >
      <div className="section-inner">
        <div className="team-intro">
          <div>
            <SectionLabel number="01">
              One identity. Many responsibilities.
            </SectionLabel>
            <h2 id="team-title">
              One Nori.
              <br />
              <span className="muted-title">Across your organization.</span>
            </h2>
          </div>
          <div>
            <p className="new-lead">
              One super agent, with digital embodiments for the work at hand.
              Every role is Nori—or a sub-agent working under Nori’s direction.
            </p>
            <p id="badge-instructions" className="badge-instructions">
              One identity, in every role.
              <span className="badge-keyboard-help sr-only">
                Scroll sideways for more roles. Keyboard: arrow keys to move ·
                Esc to reset
              </span>
            </p>
          </div>
        </div>
        <div
          className="badge-gallery"
          tabIndex={0}
          role="region"
          aria-label="Nori role badges, scroll horizontally"
        >
          {roles.map((role, index) => (
            <Badge key={role.name} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
