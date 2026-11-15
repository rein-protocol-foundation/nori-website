export const CYCLE_SECONDS = 28;
export const RECURSION = 8;
// Follow a face cell in the next portrait. At 8×, the parent maps exactly to the child.
export const NEST_CELL = { x: -.5, y: 6.5 };
export function sceneAt(seconds: number) {
  const phase = ((seconds % CYCLE_SECONDS) + CYCLE_SECONDS) % CYCLE_SECONDS / CYCLE_SECONDS;
  const scale = RECURSION ** phase;
  // The fine simulation evolves only while resolved. The revealed parent is freshly seeded.
  const generation = Math.min(18, Math.max(0, (seconds % CYCLE_SECONDS - 1.8) / 1.1));
  return { phase, scale, generation, offsetX: NEST_CELL.x * RECURSION * (scale - 1) / (RECURSION - 1), offsetY: NEST_CELL.y * RECURSION * (scale - 1) / (RECURSION - 1) };
}
/** Active time only. Pauses never catch up and a background tab cannot jump the camera. */
export class SceneClock {
  elapsed = 0;
  private previous: number | null = null;
  tick(now: number, running: boolean) {
    if (running && this.previous !== null) this.elapsed += Math.min((now - this.previous) / 1000, .08);
    this.previous = running ? now : null;
    return this.elapsed;
  }
}
