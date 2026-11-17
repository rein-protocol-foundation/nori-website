/** Time drives a self-similar camera. Scroll never changes the composition. */
export const LOOP_SECONDS = 20;
export const TILE_COUNT = 32;
export const ANCHOR_CELL = { x: 15, y: 16 };
export const clamp = (value: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, value));
export const smooth = (value: number) => {
  const t = clamp(value);
  return t * t * (3 - 2 * t);
};
export function sceneAt(elapsedSeconds: number) {
  const elapsed = Number.isFinite(elapsedSeconds)
    ? Math.max(0, elapsedSeconds)
    : 0;
  const cycle = Math.floor(elapsed / LOOP_SECONDS);
  const phase = (elapsed % LOOP_SECONDS) / LOOP_SECONDS;
  return { phase, cycle, zoom: TILE_COUNT ** (1 - phase) };
}
/** Fixed point of the chosen child tile: the next level occupies the same frame. */
export function rootAt(size: number, anchorX: number, anchorY: number) {
  return {
    x: anchorX - (ANCHOR_CELL.x / (TILE_COUNT - 1)) * size,
    y: anchorY - (ANCHOR_CELL.y / (TILE_COUNT - 1)) * size,
    size,
  };
}
