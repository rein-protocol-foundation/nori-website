import { useEffect, useRef, useState } from "react";
import { portraitSvg } from "../scene/identity";
const staticPortrait = `data:image/svg+xml,${encodeURIComponent(portraitSvg())}`;

export function CellularScene() {
  const host = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const element = host.current!,
      surface = canvas.current!;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    let disposed = false,
      request = 0,
      visible = true,
      blocked = false,
      version = 0;
    let elapsed = 0;
    let lastFrame: number | undefined;
    let scene:
      | Awaited<ReturnType<typeof import("../scene/renderer").createScene>>
      | undefined;
    function stop() {
      version++;
      blocked = true;
      cancelAnimationFrame(request);
      request = 0;
      lastFrame = undefined;
      scene?.dispose();
      scene = undefined;
      if (!disposed) setReady(false);
    }
    function paint(now: number) {
      request = 0;
      if (
        disposed ||
        blocked ||
        !visible ||
        document.visibilityState !== "visible" ||
        !scene
      )
        return;
      if (lastFrame !== undefined)
        elapsed += Math.min((now - lastFrame) / 1000, 0.08);
      lastFrame = now;
      try {
        scene.render(elapsed);
        schedule();
      } catch {
        stop();
      }
    }
    function schedule() {
      if (
        !request &&
        !disposed &&
        !blocked &&
        visible &&
        document.visibilityState === "visible"
      )
        request = requestAnimationFrame(paint);
    }
    async function start() {
      const token = ++version;
      if (reduced.matches) return;
      blocked = false;
      try {
        const { createScene } = await import("../scene/renderer");
        if (disposed || reduced.matches || token !== version) return;
        scene = createScene(surface);
        scene.resize(element.clientWidth, element.clientHeight);
        elapsed = 0;
        lastFrame = undefined;
        // Start at a readable recursive level before removing the static fallback.
        scene.render(0);
        setReady(true);
        schedule();
      } catch {
        if (!disposed) stop();
      }
    }
    const resize = new ResizeObserver(() => {
      if (!scene || blocked) return;
      scene.resize(element.clientWidth, element.clientHeight);
      schedule();
    });
    resize.observe(element);
    const intersection = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) schedule();
        else {
          cancelAnimationFrame(request);
          request = 0;
          lastFrame = undefined;
        }
      },
      { threshold: 0.01 },
    );
    intersection.observe(element);
    const changeMotion = () => {
      stop();
      if (!reduced.matches) void start();
    };
    const visibilityChanged = () => {
      if (document.visibilityState === "visible") schedule();
      else {
        cancelAnimationFrame(request);
        request = 0;
        lastFrame = undefined;
      }
    };
    document.addEventListener("visibilitychange", visibilityChanged);
    reduced.addEventListener("change", changeMotion);
    void start();
    return () => {
      disposed = true;
      stop();
      resize.disconnect();
      intersection.disconnect();
      document.removeEventListener("visibilitychange", visibilityChanged);
      reduced.removeEventListener("change", changeMotion);
    };
  }, []);
  return (
    <div
      ref={host}
      className={`cellular-scene ${ready ? "is-ready" : ""}`}
      aria-hidden="true"
    >
      <div className="scene-fallback">
        <img src={staticPortrait} alt="" />
      </div>
      <canvas ref={canvas} />
      <div className="scene-atmosphere" />
    </div>
  );
}
