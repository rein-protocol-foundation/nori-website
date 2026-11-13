import { useEffect, useRef, useState } from 'react';
import { SceneClock } from '../scene/choreography';
export type MotionStatus = 'loading' | 'running' | 'paused' | 'reduced' | 'fallback' | 'limited';
type Props = { paused: boolean; onStatus: (status: MotionStatus) => void };
export function CellularScene({ paused, onStatus }: Props) {
  const host = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const pausedRef = useRef(paused);
  const [ready, setReady] = useState(false);
  useEffect(() => { pausedRef.current = paused; }, [paused]);
  useEffect(() => {
    const element = host.current!, surface = canvas.current!;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let disposed = false, request = 0, visible = true, needsPaint = true, loadVersion = 0;
    let scene: Awaited<ReturnType<typeof import('../scene/renderer').createScene>> | undefined;
    let blocked: MotionStatus | null = null;
    let slowTime = 0, sampleTime = 0, previousTime = 0, lastPaint = 0;
    let lastStatus: MotionStatus | undefined;
    const clock = new SceneClock();
    function status(value: MotionStatus) { if (value !== lastStatus && !disposed) { lastStatus = value; onStatus(value); } }
    function stop(reason: MotionStatus) {
      blocked = reason;
      loadVersion++;
      cancelAnimationFrame(request);
      scene?.dispose(); scene = undefined;
      setReady(false); status(reason);
    }
    function tick(now: number) {
      if (disposed || blocked) return;
      const active = visible && document.visibilityState === 'visible' && !pausedRef.current;
      const elapsed = clock.tick(now, active);
      if (active && previousTime && now - previousTime < 500) {
        const delta = now - previousTime;
        sampleTime += delta;
        if (delta > 48) slowTime += delta;
        // A sustained slow device gets the composed static version, not a stuttering zoom.
        if (sampleTime > 6000) {
          if (slowTime / sampleTime > .65) { stop('limited'); return; }
          sampleTime = 0; slowTime = 0;
        }
      }
      previousTime = active ? now : 0;
      if (scene && ((active && now - lastPaint >= 30) || needsPaint)) {
        try {
          const state = scene.render(elapsed);
          surface.dataset.time = elapsed.toFixed(3);
          surface.dataset.phase = state.phase.toFixed(4);
          needsPaint = false; lastPaint = now;
        } catch { stop('fallback'); return; }
      }
      status(pausedRef.current ? 'paused' : 'running');
      request = requestAnimationFrame(tick);
    }
    async function start() {
      const version = ++loadVersion;
      if (reduced.matches) { status('reduced'); return; }
      const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
      if ((memory !== undefined && memory <= 2) || navigator.hardwareConcurrency <= 2) { status('limited'); return; }
      try {
        const { createScene } = await import('../scene/renderer');
        if (disposed || reduced.matches || version !== loadVersion) return;
        scene = createScene(surface);
        scene.resize(element.clientWidth, element.clientHeight);
        scene.render(0); setReady(true);
        request = requestAnimationFrame(tick);
      } catch { if (!disposed) stop('fallback'); }
    }
    const resize = new ResizeObserver(() => { if (scene) { scene.resize(element.clientWidth, element.clientHeight); needsPaint = true; } });
    resize.observe(element);
    const intersection = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; }, { threshold: .01 });
    intersection.observe(element);
    const changeMotion = () => {
      if (reduced.matches) stop('reduced');
      else { blocked = null; needsPaint = true; previousTime = 0; void start(); }
    };
    const visibilityChanged = () => { clock.tick(performance.now(), false); previousTime = 0; };
    document.addEventListener('visibilitychange', visibilityChanged);
    const contextLost = (event: Event) => { event.preventDefault(); stop('fallback'); };
    surface.addEventListener('webglcontextlost', contextLost);
    reduced.addEventListener('change', changeMotion);
    void start();
    return () => {
      disposed = true; cancelAnimationFrame(request); scene?.dispose();
      resize.disconnect(); intersection.disconnect();
      document.removeEventListener('visibilitychange', visibilityChanged);
      reduced.removeEventListener('change', changeMotion); surface.removeEventListener('webglcontextlost', contextLost);
    };
  }, [onStatus]);
  return <div ref={host} className={`cellular-scene ${ready ? 'is-ready' : ''}`} aria-hidden="true"><div className="scene-fallback"><img src="/nori-cells.svg" alt="" /><img className="fallback-echo" src="/nori-cells.svg" alt="" /></div><canvas ref={canvas} /><div className="scene-atmosphere" /></div>;
}
