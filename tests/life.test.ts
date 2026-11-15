import test from 'node:test';
import assert from 'node:assert/strict';
import { createSeed, LIFE_SIZE, precomputeLife, stepLife } from '../src/scene/life';
import { CYCLE_SECONDS, NEST_CELL, RECURSION, SceneClock, sceneAt } from '../src/scene/choreography';

test('all 512 center-neighborhood configurations obey B3/S23', () => {
  for (let bits = 0; bits < 512; bits++) {
    const cells = Uint8Array.from({ length: 9 }, (_, i) => (bits >> i) & 1);
    const neighbors = cells.reduce((sum, cell, i) => sum + (i === 4 ? 0 : cell), 0);
    const expected = neighbors === 3 || (cells[4] === 1 && neighbors === 2);
    assert.equal(stepLife(cells, 3)[4], +expected, `configuration ${bits}`);
  }
});
test('blinker has period two and a block remains stable', () => {
  const blinker = new Uint8Array(25); blinker.set([1, 1, 1], 11);
  assert.notDeepEqual(stepLife(blinker, 5), blinker);
  assert.deepEqual(stepLife(stepLife(blinker, 5), 5), blinker);
  const block = new Uint8Array(25); [6, 7, 11, 12].forEach(i => block[i] = 1);
  assert.deepEqual(stepLife(block, 5), block);
});
test('dead boundaries do not wrap and seed visibly evolves', () => {
  const edge = new Uint8Array(25); [0, 4, 20].forEach(i => edge[i] = 1);
  assert.equal(stepLife(edge, 5).reduce((a, b) => a + b, 0), 0);
  const seed = createSeed(); const evolved = stepLife(seed, LIFE_SIZE);
  assert.ok(seed.filter((v, i) => v !== evolved[i]).length > 500);
  assert.deepEqual(precomputeLife()[2], stepLife(evolved, LIFE_SIZE));
});
test('camera approaches the same parent coordinates at the loop seam', () => {
  const end = sceneAt(CYCLE_SECONDS - .000001);
  for (const p of [-16, 0, 16]) {
    assert.ok(Math.abs((p * end.scale + end.offsetX) / RECURSION - NEST_CELL.x - p) < .00001);
    assert.ok(Math.abs((p * end.scale + end.offsetY) / RECURSION - NEST_CELL.y - p) < .00001);
  }
  assert.equal(sceneAt(CYCLE_SECONDS).scale, 1);
  assert.equal(sceneAt(CYCLE_SECONDS).generation, 0);
});
test('clock freezes when paused and resumes without a jump', () => {
  const clock = new SceneClock(); clock.tick(1000, true); clock.tick(1030, true);
  clock.tick(5000, false); clock.tick(9000, false);
  assert.equal(clock.elapsed, .03);
  clock.tick(10000, true); assert.equal(clock.elapsed, .03);
  clock.tick(10030, true); assert.equal(clock.elapsed, .06);
});
