import * as THREE from 'three';
import { identityPixels } from './identity';
import { LIFE_SIZE, precomputeLife } from './life';
import { sceneAt } from './choreography';
import { fragmentShader, vertexShader } from './shaders';

export function createScene(canvas: HTMLCanvasElement) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: false, alpha: false, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  const scene = new THREE.Scene();
  const camera = new THREE.Camera();
  const texture = (data: Uint8Array, size: number, format: THREE.PixelFormat) => {
    const result = new THREE.DataTexture(data, size, size, format);
    result.minFilter = result.magFilter = THREE.NearestFilter;
    result.generateMipmaps = false;
    result.needsUpdate = true;
    return result;
  };
  const identity = texture(identityPixels(), 32, THREE.RGBAFormat);
  const frames = precomputeLife().map(frame => texture(frame.map(value => value * 255), LIFE_SIZE, THREE.RedFormat));
  const material = new THREE.ShaderMaterial({ vertexShader, fragmentShader, uniforms: {
    uResolution: { value: new THREE.Vector2() }, uPixelRatio: { value: renderer.getPixelRatio() },
    uScale: { value: 1 }, uOffset: { value: new THREE.Vector2() }, uGenerationMix: { value: 0 },
    uIdentity: { value: identity }, uSeed: { value: frames[0] }, uLifeA: { value: frames[0] }, uLifeB: { value: frames[1] },
  } });
  let shaderFailed = false;
  renderer.debug.onShaderError = () => { shaderFailed = true; };
  const geometry = new THREE.PlaneGeometry(2, 2);
  scene.add(new THREE.Mesh(geometry, material));
  function resize(width: number, height: number) {
    renderer.setSize(width, height, false);
    renderer.getDrawingBufferSize(material.uniforms.uResolution.value);
  }
  function render(seconds: number) {
    const state = sceneAt(seconds);
    const frame = Math.floor(state.generation);
    material.uniforms.uScale.value = state.scale;
    material.uniforms.uOffset.value.set(state.offsetX, state.offsetY);
    material.uniforms.uGenerationMix.value = state.generation - frame;
    material.uniforms.uLifeA.value = frames[frame];
    material.uniforms.uLifeB.value = frames[frame + 1];
    renderer.render(scene, camera);
    if (shaderFailed) throw new Error('Cellular shader unavailable');
    return state;
  }
  return { resize, render, dispose() { geometry.dispose(); material.dispose(); identity.dispose(); frames.forEach(frame => frame.dispose()); renderer.dispose(); } };
}
