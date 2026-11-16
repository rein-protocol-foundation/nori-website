import test from "node:test";
import assert from "node:assert/strict";
import {
  createSeed,
  LIFE_SIZE,
  precomputeLife,
  stepLife,
} from "../src/scene/life";
import { cellAt, sceneAt } from "../src/scene/choreography";

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
test("scroll choreography clamps, settles, and has no autonomous time source", () => {
  assert.deepEqual(sceneAt(-1), sceneAt(0));
  assert.deepEqual(sceneAt(2), sceneAt(1));
  assert.equal(sceneAt(0).assembly, 0);
  assert.equal(sceneAt(1).assembly, 1);
  assert.equal(sceneAt(1).generation, 18);
  for (let step = 1; step <= 100; step++) {
    assert.ok(
      sceneAt(step / 100).assembly >= sceneAt((step - 1) / 100).assembly,
    );
  }
});
test("every source cell has a distinct final 64×64 address and a continuous path", () => {
  const addresses = new Set<string>();
  for (let source = 0; source < 4; source++)
    for (let y = 0; y < 32; y++)
      for (let x = 0; x < 32; x++) {
        const start = cellAt(x, y, source, 0),
          end = cellAt(x, y, source, 1);
        assert.equal(start.travel, 0);
        assert.equal(end.travel, 1);
        addresses.add(`${end.targetX},${end.targetY}`);
        const before = cellAt(x, y, source, 0.4999).travel;
        const after = cellAt(x, y, source, 0.5001).travel;
        assert.ok(after >= before && after - before < 0.002);
      }
  assert.equal(addresses.size, 64 * 64);
});
