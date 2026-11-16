import { identityAt, PALETTE } from "./identity";
import { LIFE_SIZE, precomputeLife } from "./life";
import { cellAt, sceneAt, smooth } from "./choreography";

type Source = { x: number; y: number; size: number; angle: number };
const PAPER = "#f7f8f2";
const INKS = ["#6f9a83", "#649e8a", "#bd7f8f", "#b5a999", "#203c31", "#9daea2"];

/** Authored spatial assembly, with an independent, unmasked Conway simulation. */
export function createScene(canvas: HTMLCanvasElement) {
  const context = canvas.getContext("2d", { alpha: false });
  if (!context) throw new Error("Canvas unavailable");
  const ctx = context;
  const frames = precomputeLife();
  let width = 1,
    height = 1,
    ratio = 1;
  let sources: Source[] = [];
  let target = { x: 0, y: 0, size: 1 };
  let paints = 0;

  function resize(nextWidth: number, nextHeight: number) {
    width = Math.max(1, nextWidth);
    height = Math.max(1, nextHeight);
    ratio = Math.min(window.devicePixelRatio || 1, 1.6);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    const mobile = width < 700;
    if (mobile) {
      target = {
        x: width * 0.68,
        y: Math.min(height * 0.25, 210),
        size: Math.min(width * 0.86, 350),
      };
      sources = [
        { x: width * 0.48, y: 146, size: width * 0.36, angle: -0.08 },
        { x: width * 0.88, y: 155, size: width * 0.3, angle: 0.09 },
        { x: width * 0.51, y: 274, size: width * 0.25, angle: -0.06 },
        { x: width * 0.88, y: 272, size: width * 0.34, angle: 0.05 },
      ];
    } else {
      const unit = Math.min(width * 0.19, height * 0.32, 285);
      target = {
        x: width * 0.79,
        y: height * 0.52,
        size: Math.min(width * 0.57, height * 0.91, 850),
      };
      sources = [
        { x: width * 0.68, y: height * 0.27, size: unit * 1.05, angle: -0.065 },
        { x: width * 0.91, y: height * 0.32, size: unit * 0.75, angle: 0.075 },
        { x: width * 0.65, y: height * 0.73, size: unit * 0.72, angle: -0.04 },
        { x: width * 0.94, y: height * 0.75, size: unit * 1.12, angle: 0.05 },
      ];
    }
  }
  function render(progress: number) {
    const state = sceneAt(progress);
    const generation = Math.floor(state.generation);
    const current = frames[generation],
      next = frames[Math.min(generation + 1, frames.length - 1)];
    const mix = smooth(state.generation - generation);
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    ctx.globalAlpha = 1;
    ctx.fillStyle = PAPER;
    ctx.fillRect(0, 0, width, height);
    // The construction field continues behind the HTML; the reading veil is CSS.
    ctx.fillStyle = "#4e745c";
    ctx.globalAlpha = 0.105;
    const grid = width < 700 ? 22 : 28;
    for (let y = 12; y < height; y += grid)
      for (let x = 12; x < width; x += grid) ctx.fillRect(x, y, 0.8, 0.8);
    ctx.globalAlpha = 1;
    for (let source = 0; source < sources.length; source++) {
      const origin = sources[source];
      const originalCell = origin.size / 32,
        finalCell = target.size / 64;
      const cos = Math.cos(origin.angle),
        sin = Math.sin(origin.angle);
      for (let y = 0; y < 32; y++)
        for (let x = 0; x < 32; x++) {
          const material = identityAt(x, y);
          const {
            travel: t,
            targetX,
            targetY,
          } = cellAt(x, y, source, progress);
          const localX = (x - 15.5) * originalCell,
            localY = (y - 15.5) * originalCell;
          const startX = origin.x + localX * cos - localY * sin;
          const startY = origin.y + localX * sin + localY * cos;
          const endX = target.x + (targetX - 31.5) * finalCell;
          const endY = target.y + (targetY - 31.5) * finalCell;
          // A modest arc makes the transfer legible without a vortex or random drift.
          const bend =
            Math.sin(t * Math.PI) * originalCell * (source % 2 ? 2 : -2);
          const px = startX + (endX - startX) * t + bend;
          const py =
            startY +
            (endY - startY) * t -
            Math.sin(t * Math.PI) * originalCell * 1.7;
          const cell = originalCell + (finalCell - originalCell) * t;
          const size = cell * 0.87;
          const left = px - size / 2,
            top = py - size / 2;
          if (material) {
            ctx.globalAlpha = 0.16;
            ctx.fillStyle = "#365b45";
            ctx.fillRect(left + cell * 0.06, top + cell * 0.12, size, size);
            ctx.globalAlpha = 0.87;
            ctx.fillStyle = PALETTE[material];
            ctx.fillRect(left, top, size, size);
            // One lit edge, one recessed edge: the cells stay square and shallow.
            ctx.globalAlpha = 0.32;
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(left, top, size, Math.max(0.45, cell * 0.055));
            ctx.globalAlpha = 0.11;
            ctx.fillStyle = "#244b3a";
            ctx.fillRect(left, top + size - cell * 0.075, size, cell * 0.075);
          }
          // Every simulation site is drawn, including births beyond the original face.
          // Birth/death interpolates square area, never the simulation state itself.
          ctx.fillStyle = INKS[material];
          ctx.globalAlpha = material === 4 ? 0.44 : 0.62;
          const micro = size / 4;
          for (let dy = 0; dy < 4; dy++)
            for (let dx = 0; dx < 4; dx++) {
              const index = (y * 4 + dy) * LIFE_SIZE + x * 4 + dx;
              const alive =
                current[index] + (next[index] - current[index]) * mix;
              if (alive <= 0.005) continue;
              const livingSize = micro * 0.88 * Math.sqrt(alive);
              const mx = left + (dx + 0.5) * micro - livingSize / 2;
              const my = top + (dy + 0.5) * micro - livingSize / 2;
              ctx.fillRect(mx, my, livingSize, livingSize);
            }
        }
    }
    ctx.globalAlpha = 1;
    paints++;
    canvas.dataset.phase = state.phase.toFixed(4);
    canvas.dataset.generation = state.generation.toFixed(3);
    canvas.dataset.assembly = state.assembly.toFixed(4);
    canvas.dataset.paints = String(paints);
    return state;
  }
  return {
    resize,
    render,
    dispose() {
      sources = [];
      frames.length = 0;
    },
  };
}
