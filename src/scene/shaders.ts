export const vertexShader = `
void main() { gl_Position = vec4(position.xy, 0., 1.); }
`;
export const fragmentShader = `
precision highp float;
uniform vec2 uResolution;
uniform float uPixelRatio;
uniform float uScale;
uniform vec2 uOffset;
uniform float uGenerationMix;
uniform sampler2D uIdentity;
uniform sampler2D uLifeA;
uniform sampler2D uLifeB;
uniform sampler2D uSeed;
const vec3 paper = vec3(.957,.953,.925);
vec2 wrapPortrait(vec2 p) { return mod(p + 16., 32.); }
vec4 identity(vec2 p) { return texture2D(uIdentity, (floor(wrapPortrait(p)) + .5) / 32.); }
float square(vec2 q, float halfSize, float aa) {
  vec2 d = abs(q - .5) - halfSize;
  return 1. - smoothstep(-aa, aa, max(d.x,d.y));
}
vec4 portrait(vec2 p, float px, bool evolving) {
  vec2 uv = wrapPortrait(p) / 32.;
  vec4 ink = identity(p);
  float alive = evolving ? mix(texture2D(uLifeA,uv).r, texture2D(uLifeB,uv).r,uGenerationMix) : texture2D(uSeed,uv).r;
  float aa = min(.22, .65 / px);
  vec2 tile = fract(p + 16.);
  float face = square(tile, .455, aa);
  float micro = square(fract((p + 16.) * 4.), .40, min(.25, 2.6 / px));
  float detail = smoothstep(6., 16., px);
  float liveInk = alive * micro;
  // Dormant sites remain as a faint material substrate; state appears in the microcells.
  float opacity = ink.a * face * mix(.94, .70 + liveInk * .30, detail);
  opacity = max(opacity, alive * micro * (1. - ink.a) * .55 * detail);
  vec3 color = mix(vec3(.45,.59,.43), ink.rgb, ink.a);
  color = mix(color, color * .58, liveInk * detail * .55);
  // Restrained shallow bevel and lower-edge shadow, no inflated geometry.
  float bevel = smoothstep(.39,.46,tile.y) * (1. - smoothstep(.46,.52,tile.y));
  float edge = (1. - smoothstep(.04,.10,tile.y)) * .15 - smoothstep(.88,.96,tile.y) * .16;
  color += edge * (1. - detail * .5) + bevel * .015;
  return vec4(color, opacity);
}
void main() {
  vec2 resolution = uResolution / uPixelRatio;
  vec2 pixel = vec2(gl_FragCoord.x, uResolution.y-gl_FragCoord.y) / uPixelRatio;
  bool mobile = resolution.x < 700.;
  float cellPx = mobile ? min(resolution.x * 1.12, 540.) / 32. : min(1024., min(resolution.y * 1.12, resolution.x * .65)) / 32.;
  vec2 anchor = mobile ? vec2(resolution.x * .69, resolution.y * .27) : vec2(resolution.x * .76, resolution.y * .48);
  vec2 p = (pixel - anchor) / cellPx * uScale + uOffset;
  vec2 parent = p / 8. - vec2(-.5,6.5);
  vec2 grandparent = parent / 8. - vec2(-.5,6.5);
  float px = cellPx / uScale;
  vec4 fine = portrait(p, px, true);
  vec4 middle = portrait(parent, px * 8., false);
  vec4 outer = identity(grandparent);
  // Subpixel portraits become the flat material of their parent. This is a spatial
  // level-of-detail transition, never a rule that forces living cells into a mask.
  float fineWeight = smoothstep(4.1, 8., px);
  vec4 cell = vec4(mix(middle.rgb, fine.rgb, fineWeight), mix(middle.a, fine.a * identity(parent).a, fineWeight));
  cell.a *= outer.a;
  vec3 bg = paper;
  // Quiet construction grid behind the living surface.
  vec2 grid = abs(fract((pixel-anchor) / cellPx) - .5);
  float lines = smoothstep(.484,.499,max(grid.x,grid.y));
  bg -= lines * .014;
  float distanceFromLight = length((pixel / resolution - vec2(.76,.28)) * vec2(1.,.8));
  bg += vec3(.018,.017,.008) * (1. - distanceFromLight);
  vec3 color = mix(bg, cell.rgb, cell.a);
  gl_FragColor = vec4(color,1.);
}
`;
