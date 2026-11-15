import { useEffect, useRef, useState } from "react";
export function WorkCells() {
  const ref = useRef<HTMLCanvasElement>(null);
  const [paused, setPaused] = useState(false);
  const pauseRef = useRef(false);
  pauseRef.current = paused;
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const n = 64;
    let cells = Array.from({ length: n * n }, (_, i) =>
      (i * 73 + i * i * 19) % 101 < 28 ? 1 : 0,
    );
    const draw = () => {
      ctx.clearRect(0, 0, 768, 768);
      cells.forEach((v, i) => {
        if (v) {
          ctx.fillStyle = i % 11 === 0 ? "#e6a9b0" : "#8baa87";
          ctx.fillRect((i % n) * 12, Math.floor(i / n) * 12, 9, 9);
        }
      });
    };
    draw();
    const mq = matchMedia("(prefers-reduced-motion: reduce)");
    const timer = setInterval(() => {
      if (pauseRef.current || mq.matches || document.hidden) return;
      const rect = canvas.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > innerHeight) return;
      cells = cells.map((v, i) => {
        const x = i % n,
          y = Math.floor(i / n);
        let c = 0;
        for (let dy = -1; dy <= 1; dy++)
          for (let dx = -1; dx <= 1; dx++) {
            if (
              (dx || dy) &&
              x + dx >= 0 &&
              x + dx < n &&
              y + dy >= 0 &&
              y + dy < n
            )
              c += cells[(y + dy) * n + x + dx];
          }
        return c === 3 || (v && c === 2) ? 1 : 0;
      });
      draw();
    }, 650);
    return () => clearInterval(timer);
  }, []);
  return (
    <>
      <canvas
        className="work-cells"
        ref={ref}
        width="768"
        height="768"
        aria-hidden="true"
      />
      <button className="work-motion" onClick={() => setPaused(!paused)}>
        {paused ? "Resume background" : "Pause background"}
      </button>
    </>
  );
}
