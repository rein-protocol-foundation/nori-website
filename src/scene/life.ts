import { identityAt } from './identity';
export const LIFE_SIZE = 128;
export const FRAME_COUNT = 20;
/** Finite, dead boundary. Every update is exactly Conway B3/S23. No mask is applied after seeding. */
export function stepLife(cells: Uint8Array, width: number, height = width): Uint8Array {
  const next = new Uint8Array(width * height);
  for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
    let neighbors = 0;
    for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
      const nx = x + dx, ny = y + dy;
      if ((dx || dy) && nx >= 0 && ny >= 0 && nx < width && ny < height) neighbors += cells[ny * width + nx];
    }
    const i = y * width + x;
    next[i] = neighbors === 3 || (cells[i] === 1 && neighbors === 2) ? 1 : 0;
  }
  return next;
}
export function createSeed(): Uint8Array {
  const cells = new Uint8Array(LIFE_SIZE * LIFE_SIZE);
  for (let y = 0; y < 32; y++) for (let x = 0; x < 32; x++) {
    if (!identityAt(x, y)) continue;
    const hash = (x * 71 + y * 137) % 13;
    // Stable blocks hold the portrait; blinkers and interacting triplets animate it.
    const pattern = hash < 8 ? [[1, 1], [2, 1], [1, 2], [2, 2]] : hash < 11 ? [[0, 1], [1, 1], [2, 1]] : [[1, 0], [2, 1], [0, 2], [1, 2], [2, 2]];
    for (const [dx, dy] of pattern) cells[(y * 4 + dy) * LIFE_SIZE + x * 4 + dx] = 1;
  }
  return cells;
}
export function precomputeLife(): Uint8Array[] {
  const frames = [createSeed()];
  for (let i = 1; i < FRAME_COUNT; i++) frames.push(stepLife(frames[i - 1], LIFE_SIZE));
  return frames;
}
