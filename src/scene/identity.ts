/** A new cellular interpretation of the supplied Nori identity, not a traced asset. */
export const PORTRAIT_SIZE = 32;
export const PALETTE = ['#f4f3ec', '#91bcaa', '#e0aaa7', '#e5ddc7', '#29382f', '#c5d4ca'] as const;
export function identityAt(x: number, y: number): number {
  if (x < 0 || y < 0 || x >= 32 || y >= 32) return 0;
  let color = 0;
  // Hair silhouette and the two triangular cat ears.
  if (((x - 15.5) / 12.5) ** 2 + ((y - 18) / 12.5) ** 2 < 1) color = 1;
  if (y >= 2 && y <= 13 && ((x >= 4 && x <= 4 + (y - 2) * .85) || (x <= 27 && x >= 27 - (y - 2) * .85))) color = 1;
  if (y >= 5 && y <= 11 && ((x >= 6 && x <= 5 + (y - 4) * .65) || (x <= 25 && x >= 26 - (y - 4) * .65))) color = 2;
  // Face, the asymmetrical fringe, and a warm pink lock.
  if (((x - 15.5) / 9.7) ** 2 + ((y - 20) / 9) ** 2 < 1) color = 3;
  if (color && y >= 8 && y < 16 && x > 6 && x < 26 && y < 15 + Math.sin(x * .48) * 2.5) color = 1;
  if (color && y >= 8 && y <= 15 && x >= 10 - (y - 8) * .6 && x <= 15 - (y - 8) * .9) color = 2;
  if ((x === 7 || x === 24 || x === 25) && y >= 14 && y <= 26) color = 1;
  // Capsule eyes (square-ended center, narrower end rows).
  if ((x === 11 || x === 12 || x === 19 || x === 20) && y >= 18 && y <= 22) color = 4;
  if ((x === 12 || x === 19) && (y === 17 || y === 23)) color = 4;
  if ((x === 9 || x === 10 || x === 21 || x === 22) && y === 24) color = 2;
  // Headphones and single antenna.
  if ((x === 3 || x === 28) && y >= 16 && y <= 23) color = 4;
  if ((x === 4 || x === 27) && y >= 17 && y <= 22) color = 5;
  if ((x === 5 || x === 26) && y >= 18 && y <= 21) color = 2;
  if ((x === 22 && y >= 4 && y <= 7) || (x === 23 && y === 3)) color = 4;
  if ((x === 24 || x === 25) && (y === 1 || y === 2)) color = 2;
  return color;
}
export function identityPixels(): Uint8Array {
  const data = new Uint8Array(32 * 32 * 4);
  for (let y = 0; y < 32; y++) for (let x = 0; x < 32; x++) {
    const material = identityAt(x, y);
    const color = PALETTE[material];
    const offset = (y * 32 + x) * 4;
    data[offset] = parseInt(color.slice(1, 3), 16);
    data[offset + 1] = parseInt(color.slice(3, 5), 16);
    data[offset + 2] = parseInt(color.slice(5, 7), 16);
    data[offset + 3] = material ? 255 : 0;
  }
  return data;
}
export function portraitSvg(): string {
  let cells = '';
  for (let y = 0; y < 32; y++) for (let x = 0; x < 32; x++) {
    const id = identityAt(x, y);
    if (id) cells += `<rect x="${x * 12}" y="${y * 12}" width="10.5" height="10.5" rx=".5" fill="${PALETTE[id]}"/>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 384">${cells}</svg>`;
}
