import {
  useEffect,
  useRef,
  useState,
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
function Badge({ index, paused }: { index: number; paused: boolean }) {
  const pauseRef = useRef(paused);
  pauseRef.current = paused;
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
  const role = roles[index];
  useEffect(() => {
    const state = physics.current;
    const media = matchMedia("(prefers-reduced-motion: reduce)");
    const change = () => {
      state.reduced = media.matches;
    };
    change();
    media.addEventListener("change", change);
    let frame = 0,
      last = 0,
      activeTime = 0;
    const tick = (now: number) => {
      const dt = Math.min((now - (last || now)) / 1000, 0.032);
      last = now;
      const visible = root.current?.getBoundingClientRect();
      if (
        visible &&
        visible.bottom > 0 &&
        visible.top < innerHeight &&
        !document.hidden
      ) {
        activeTime += dt;
        const idle =
          !state.reduced &&
          !pauseRef.current &&
          !state.dragging &&
          state.tx === 0 &&
          state.ty === 0;
        const targetX =
          state.tx + (idle ? Math.sin(activeTime * 0.85 + index * 1.3) * 4 : 0);
        const targetY =
          state.ty +
          (idle ? Math.sin(activeTime * 0.65 + index * 1.3) * 0.8 : 0);
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
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      media.removeEventListener("change", change);
    };
  }, [index]);
  const move = (event: PointerEvent<HTMLDivElement>) => {
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
      s.vx += event.key === "ArrowLeft" ? -260 : 260;
      s.vy += event.key === "ArrowUp" ? -180 : 100;
    }
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
                nori<span> / team</span>
              </b>
              <span>YOUR ORGANIZATION. YOUR TEAM.</span>
            </div>
            <div className="badge-photo">
              <span className="badge-series">
                TEAM
                <br />0{index + 1}
              </span>
              <img
                src={`/nori-roles/${role.portrait}.png`}
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
                  NORI TEAM
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
  const [paused, setPaused] = useState(false);
  return (
    <section
      className="section team-showcase"
      id="team"
      aria-labelledby="team-title"
    >
      <div className="section-inner">
        <div className="team-intro">
          <div>
            <SectionLabel number="01">Meet your new teammate</SectionLabel>
            <h2 id="team-title">
              One Nori.
              <br />
              <strong>Part of your organization.</strong>
            </h2>
          </div>
          <div>
            <p className="new-lead">
              Clear responsibilities. Familiar tools. A teammate designed to
              keep the work moving, with people in charge.
            </p>
            <p id="badge-instructions" className="badge-instructions">
              Drag a badge. Scroll sideways to meet the team.
              <span>Keyboard: arrow keys to move · Esc to reset</span>
            </p>
          </div>
        </div>
        <div
          className="badge-gallery"
          tabIndex={0}
          role="region"
          aria-label="Nori team badges, scroll horizontally"
        >
          {roles.map((role, index) => (
            <Badge key={role.name} index={index} paused={paused} />
          ))}
        </div>
        <div className="badge-motion-control">
          <button
            type="button"
            aria-pressed={paused}
            onClick={() => setPaused(!paused)}
          >
            {paused ? "Resume badge motion" : "Pause badge motion"}
          </button>
        </div>
      </div>
    </section>
  );
}
