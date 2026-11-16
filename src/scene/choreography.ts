/** Scroll is the scene clock: no autonomous loop, timeouts, or accumulated time. */
export const clamp = (value: number, min = 0, max = 1) =>
  Math.min(max, Math.max(min, value));
export const smooth = (value: number) => {
  const t = clamp(value);
  return t * t * (3 - 2 * t);
};
export function sceneAt(progress: number) {
  const phase = clamp(progress);
  return {
    phase,
    // The first few scroll pixels let the four small portraits be read.
    assembly: smooth((phase - 0.06) / 0.82),
    generation: clamp(phase / 0.92) * 18,
  };
}
/** Each source cell keeps its own address in a 2×2 tile of the final portrait. */
export function cellAt(x: number, y: number, source: number, progress: number) {
  const state = sceneAt(progress);
  // The assembly moves from the center out; all paths share exact start/end states.
  const distance = Math.hypot(x - 15.5, y - 17) / 23;
  const delay = distance * 0.12 + source * 0.025;
  const travel = smooth((state.assembly - delay) / (1 - delay));
  return {
    travel,
    targetX: x * 2 + (source % 2),
    targetY: y * 2 + Math.floor(source / 2),
  };
}
