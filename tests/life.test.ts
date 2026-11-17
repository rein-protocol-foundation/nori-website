import test from "node:test";
import assert from "node:assert/strict";
import {
  createSeed,
  LIFE_SIZE,
  precomputeLife,
  stepLife,
} from "../src/scene/life";
import {
  ANCHOR_CELL,
  LOOP_SECONDS,
  rootAt,
  sceneAt,
  TILE_COUNT,
} from "../src/scene/choreography";

test("all 512 center-neighborhood configurations obey B3/S23", () => {
  for (let bits = 0; bits < 512; bits++) {
    const cells = Uint8Array.from({ length: 9 }, (_, i) => (bits >> i) & 1);
    const neighbors = cells.reduce(
      (sum, cell, i) => sum + (i === 4 ? 0 : cell),
      0,
    );
    const expected = neighbors === 3 || (cells[4] === 1 && neighbors === 2);
    assert.equal(stepLife(cells, 3)[4], +expected, `configuration ${bits}`);
  }
});
test("blinker has period two and a block remains stable", () => {
  const blinker = new Uint8Array(25);
  blinker.set([1, 1, 1], 11);
  assert.notDeepEqual(stepLife(blinker, 5), blinker);
  assert.deepEqual(stepLife(stepLife(blinker, 5), 5), blinker);
  const block = new Uint8Array(25);
  [6, 7, 11, 12].forEach((i) => (block[i] = 1));
  assert.deepEqual(stepLife(block, 5), block);
});
test("dead boundaries do not wrap and seed visibly evolves", () => {
  const edge = new Uint8Array(25);
  [0, 4, 20].forEach((i) => (edge[i] = 1));
  assert.equal(
    stepLife(edge, 5).reduce((a, b) => a + b, 0),
    0,
  );
  const seed = createSeed();
  const evolved = stepLife(seed, LIFE_SIZE);
  assert.ok(seed.filter((v, i) => v !== evolved[i]).length > 500);
  assert.deepEqual(precomputeLife()[2], stepLife(evolved, LIFE_SIZE));
});
test("the camera repeats continuously on elapsed time with a constant logarithmic speed", () => {
  assert.deepEqual(sceneAt(-1), sceneAt(0));
  assert.deepEqual(sceneAt(Number.NaN), sceneAt(0));
  assert.equal(sceneAt(0).zoom, TILE_COUNT);
  assert.equal(sceneAt(LOOP_SECONDS).cycle, 1);
  assert.equal(sceneAt(LOOP_SECONDS).phase, 0);
  const ratio = sceneAt(1).zoom / sceneAt(0).zoom;
  for (let second = 2; second < LOOP_SECONDS; second++) {
    assert.ok(
      Math.abs(sceneAt(second).zoom / sceneAt(second - 1).zoom - ratio) < 1e-10,
    );
  }
  for (const seconds of [0, 1.25, 8.4, 19.99]) {
    assert.ok(
      Math.abs(sceneAt(seconds).zoom - sceneAt(seconds + LOOP_SECONDS).zoom) <
        1e-10,
    );
  }
});
test("the selected child exactly matches the next parent at the loop boundary", () => {
  assert.ok(ANCHOR_CELL.x > 0 && ANCHOR_CELL.y > 0);
  for (const size of [250, 315, 720, 790]) {
    const outer = rootAt(size * TILE_COUNT, 700, 400);
    const inner = rootAt(size, 700, 400);
    assert.ok(Math.abs(outer.x + ANCHOR_CELL.x * size - inner.x) < 1e-8);
    assert.ok(Math.abs(outer.y + ANCHOR_CELL.y * size - inner.y) < 1e-8);
    const before = rootAt(size * sceneAt(LOOP_SECONDS - 0.0001).zoom, 700, 400);
    assert.ok(Math.abs(before.x - inner.x) < 0.02);
    assert.ok(Math.abs(before.y - inner.y) < 0.02);
  }
});
