import { identityAt, PALETTE } from "./identity";
import { createSeed, LIFE_SIZE, stepLife } from "./life";
import { rootAt, sceneAt, smooth, TILE_COUNT } from "./choreography";

const PAPER = "#f7f8f2";
const LIFE_HZ = 5;
const DETAIL_START = 180;
const DETAIL_END = 360;
const tiles = Array.from({ length: TILE_COUNT ** 2 }, (_, index) => ({
  x: index % TILE_COUNT,
  y: Math.floor(index / TILE_COUNT),
  ink: identityAt(index % TILE_COUNT, Math.floor(index / TILE_COUNT)),
})).filter((tile) => tile.ink);

/** A recursive Nori mosaic; Conway evolves in the glyph, not in the camera. */
export function createScene(canvas: HTMLCanvasElement) {
  const context = canvas.getContext("2d", { alpha: false });
  if (!context) throw new Error("Canvas unavailable");
  const ctx = context;
  const sprites = PALETTE.map(() => document.createElement("canvas"));
  for (const sprite of sprites) sprite.width = sprite.height = LIFE_SIZE;
  const spriteContexts = sprites.map((sprite) => {
    const value = sprite.getContext("2d");
    if (!value) throw new Error("Canvas unavailable");
    return value;
  });
  let cells = createSeed();
  let generation = 0;
  let width = 1,
    height = 1,
    ratio = 1,
    baseSize = 1;
  let anchorX = 0,
    anchorY = 0,
    paints = 0;
  let viewLeft = 0,
    viewTop = 0,
    viewBottom = 1;

  function updateSprites() {
    const glyph = spriteContexts[0];
    glyph.clearRect(0, 0, LIFE_SIZE, LIFE_SIZE);
    // The quiet structure keeps the Nori identity readable as individual cells evolve.
    for (const tile of tiles) {
      glyph.fillStyle = PALETTE[tile.ink];
      glyph.globalAlpha = tile.ink === 4 ? 0.95 : 0.65;
      glyph.fillRect(tile.x * 4 + 0.2, tile.y * 4 + 0.2, 3.6, 3.6);
    }
    for (let y = 0; y < LIFE_SIZE; y++) {
      for (let x = 0; x < LIFE_SIZE; x++) {
        if (!cells[y * LIFE_SIZE + x]) continue;
        const material = identityAt(Math.floor(x / 4), Math.floor(y / 4));
        glyph.globalAlpha = material ? 0.9 : 0.36;
        glyph.fillStyle = material ? PALETTE[material] : "#779a83";
        glyph.fillRect(x, y, 0.9, 0.9);
      }
    }
    glyph.globalAlpha = 1;
    for (let ink = 1; ink < sprites.length; ink++) {
      const tinted = spriteContexts[ink];
      tinted.clearRect(0, 0, LIFE_SIZE, LIFE_SIZE);
      tinted.drawImage(sprites[0], 0, 0);
      tinted.globalCompositeOperation = "source-atop";
      tinted.globalAlpha = 0.83;
      tinted.fillStyle = PALETTE[ink];
      tinted.fillRect(0, 0, LIFE_SIZE, LIFE_SIZE);
      tinted.globalAlpha = 1;
      tinted.globalCompositeOperation = "source-over";
    }
  }
  updateSprites();

  function resize(nextWidth: number, nextHeight: number) {
    width = Math.max(1, nextWidth);
    height = Math.max(1, nextHeight);
    ratio = Math.min(window.devicePixelRatio || 1, 1.6);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    const mobile = width < 700;
    baseSize = mobile
      ? Math.min(width * 0.8, 315)
      : Math.min(width * 0.49, height * 0.82, 790);
    anchorX = width * (mobile ? 0.58 : 0.74);
    anchorY = mobile ? (width < 370 ? 193 : 207) : height * 0.53;
    // No expensive rendering under the opaque reading veil.
    viewLeft = mobile ? 0 : width * 0.32;
    viewTop = 0;
    viewBottom = mobile ? 380 : height;
  }

  function drawNode(
    x: number,
    y: number,
    size: number,
    ink: number,
    opacity: number,
    depth: number,
  ) {
    if (
      x > width ||
      y > viewBottom ||
      x + size < viewLeft ||
      y + size < viewTop ||
      opacity < 0.003
    )
      return;
    const detail =
      depth < 3
        ? smooth((size - DETAIL_START) / (DETAIL_END - DETAIL_START))
        : 0;
    if (detail < 1) {
      const natural = smooth((size - 32) / 125);
      const simple = opacity * (1 - detail);
      if (ink && natural < 1) {
        ctx.globalAlpha = simple * (1 - natural);
        ctx.drawImage(sprites[ink], x, y, size, size);
      }
      if (!ink || natural > 0) {
        ctx.globalAlpha = simple * (ink ? natural : 1);
        ctx.drawImage(sprites[0], x, y, size, size);
      }
    }
    if (detail > 0) {
      const step = size / TILE_COUNT;
      for (const tile of tiles) {
        drawNode(
          x + tile.x * step,
          y + tile.y * step,
          step,
          tile.ink,
          opacity * detail,
          depth + 1,
        );
      }
    }
  }

  function render(elapsedSeconds: number) {
    const start = performance.now();
    const state = sceneAt(elapsedSeconds);
    const nextGeneration = Math.floor(Math.max(0, elapsedSeconds) * LIFE_HZ);
    // The component clock caps catch-up after a delayed frame; simulations never jump on resume.
    let steps = 0;
    while (generation < nextGeneration && steps < 2) {
      cells = stepLife(cells, LIFE_SIZE);
      generation++;
      steps++;
    }
    if (steps) updateSprites();
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    ctx.globalAlpha = 1;
    ctx.fillStyle = PAPER;
    ctx.fillRect(0, 0, width, height);
    ctx.fillStyle = "#627e69";
    ctx.globalAlpha = 0.12;
    const spacing = width < 700 ? 20 : 26;
    for (let y = 14; y < viewBottom; y += spacing)
      for (let x = viewLeft; x < width; x += spacing) ctx.fillRect(x, y, 1, 1);
    ctx.imageSmoothingEnabled = true;
    const root = rootAt(baseSize * state.zoom * TILE_COUNT, anchorX, anchorY);
    drawNode(root.x, root.y, root.size, 0, 1, 0);
    ctx.globalAlpha = 1;
    paints++;
    canvas.dataset.phase = state.phase.toFixed(5);
    canvas.dataset.cycle = String(state.cycle);
    canvas.dataset.generation = String(generation);
    canvas.dataset.paints = String(paints);
    canvas.dataset.renderMs = (performance.now() - start).toFixed(2);
    return state;
  }
  return {
    resize,
    render,
    dispose() {
      cells = new Uint8Array(0);
      for (const sprite of sprites) sprite.width = sprite.height = 0;
    },
  };
}
