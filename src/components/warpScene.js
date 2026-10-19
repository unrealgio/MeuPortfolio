import {
  AdditiveBlending,
  DoubleSide,
  Float32BufferAttribute,
  InstancedBufferAttribute,
  InstancedBufferGeometry,
  Mesh,
  PerspectiveCamera,
  Scene,
  ShaderMaterial,
  Vector2,
  WebGLRenderer,
} from "three";

const DEPTH = 1000;
const NEAR = 10;
const CRUISE_SPEED = 100;
const INTRO_DURATION = 2.4;
const INTRO_MULTIPLIER = 8;
const HIGHLIGHT_RATIO = 0.015;
const REDUCED_MOTION_TRAVEL = 420;


const vertexShader = /* glsl */ `
  attribute vec2 aPosition;
  attribute float aOffset;
  attribute float aSpeed;
  attribute float aLength;
  attribute float aWidth;
  attribute float aBrightness;

  uniform float uTravel;
  uniform float uStretch;
  uniform float uDepth;
  uniform float uNear;
  uniform vec2 uResolution;
  uniform float uPixelRatio;

  varying float vAlong;
  varying float vAcross;
  varying float vAlpha;
  varying float vGlow;

  void main() {
    float travel = uDepth - uNear;
    float headZ = -uDepth + mod(aOffset + uTravel * aSpeed, travel);
    float tailZ = headZ - aLength * aSpeed * uStretch;

    vec4 head = projectionMatrix * modelViewMatrix * vec4(aPosition, headZ, 1.0);
    vec4 tail = projectionMatrix * modelViewMatrix * vec4(aPosition, tailZ, 1.0);

    vec2 screenDelta = (head.xy / head.w - tail.xy / tail.w) * uResolution;
    vec2 direction = length(screenDelta) > 0.001 ? normalize(screenDelta) : vec2(0.0, 1.0);
    vec2 normal = vec2(-direction.y, direction.x);

    float closeness = 1.0 - (-headZ - uNear) / travel;
    float halfWidth = max(aWidth * mix(0.5, 1.6, closeness), 0.75) * uPixelRatio;

    vec4 clipPosition = mix(tail, head, position.y);
    clipPosition.xy += normal * position.x * halfWidth / uResolution * 2.0 * clipPosition.w;
    gl_Position = clipPosition;

    vAlong = position.y;
    vAcross = position.x;
    vAlpha = aBrightness * smoothstep(0.0, 0.2, closeness);
    vGlow = step(2.0, aWidth);
  }
`;

const fragmentShader = /* glsl */ `
  varying float vAlong;
  varying float vAcross;
  varying float vAlpha;
  varying float vGlow;

  void main() {
    float edge = 1.0 - abs(vAcross);
    float profile = mix(smoothstep(0.0, 0.5, edge), edge * edge * 1.6, vGlow);
    float tail = mix(0.15, 1.0, vAlong * vAlong);
    float alpha = clamp(vAlpha * tail * profile, 0.0, 1.0);
    gl_FragColor = vec4(vec3(1.0), alpha);
  }
`;

function createStarGeometry(starCount) {
  const geometry = new InstancedBufferGeometry();
  geometry.setAttribute(
    "position",
    new Float32BufferAttribute([-1, 0, 0, 1, 0, 0, -1, 1, 0, 1, 1, 0], 3),
  );
  geometry.setIndex([0, 1, 2, 2, 1, 3]);

  const positions = new Float32Array(starCount * 2);
  const offsets = new Float32Array(starCount);
  const speeds = new Float32Array(starCount);
  const lengths = new Float32Array(starCount);
  const widths = new Float32Array(starCount);
  const brightness = new Float32Array(starCount);

  for (let i = 0; i < starCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = 6 + Math.pow(Math.random(), 0.7) * 520;
    const isHighlight = Math.random() < HIGHLIGHT_RATIO;

    positions[i * 2] = Math.cos(angle) * radius * 1.4;
    positions[i * 2 + 1] = Math.sin(angle) * radius;
    offsets[i] = Math.random() * DEPTH;
    speeds[i] = 0.8 + Math.random() * 0.4;
    widths[i] = isHighlight
      ? 2.5 + Math.random() * 1.5
      : 0.8 + Math.random() * 0.6;
    brightness[i] = isHighlight ? 1 : 0.45 + Math.pow(Math.random(), 2) * 0.55;
    lengths[i] = isHighlight ? 55 : 12 + Math.random() * 24;
  }

  geometry.setAttribute(
    "aPosition",
    new InstancedBufferAttribute(positions, 2),
  );
  geometry.setAttribute("aOffset", new InstancedBufferAttribute(offsets, 1));
  geometry.setAttribute("aSpeed", new InstancedBufferAttribute(speeds, 1));
  geometry.setAttribute("aLength", new InstancedBufferAttribute(lengths, 1));
  geometry.setAttribute("aWidth", new InstancedBufferAttribute(widths, 1));
  geometry.setAttribute(
    "aBrightness",
    new InstancedBufferAttribute(brightness, 1),
  );
  geometry.instanceCount = starCount;

  return geometry;
}

const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

export function createWarpScene(canvas) {
  const isMobile = window.matchMedia(
    "(max-width: 800px), (pointer: coarse)",
  ).matches;
  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  let renderer;

  try {
    renderer = new WebGLRenderer({
      canvas,
      antialias: false,
      powerPreference: "low-power",
    });
  } catch {
    // No WebGL: the CSS fallback background stays visible.
    return { dispose() {} };
  }

  const pixelRatio = Math.min(window.devicePixelRatio, isMobile ? 1 : 1.5);
  renderer.setPixelRatio(pixelRatio);
  renderer.setClearColor(0x050505, 1);

  const scene = new Scene();
  const camera = new PerspectiveCamera(75, 1, 1, DEPTH + 200);

  const uniforms = {
    uTravel: { value: 0 },
    uStretch: { value: 1 },
    uDepth: { value: DEPTH },
    uNear: { value: NEAR },
    uResolution: { value: new Vector2(1, 1) },
    uPixelRatio: { value: pixelRatio },
  };

  const geometry = createStarGeometry(isMobile ? 1200 : 3000);
  const material = new ShaderMaterial({
    uniforms,
    vertexShader,
    fragmentShader,
    transparent: true,
    depthWrite: false,
    side: DoubleSide,
    blending: AdditiveBlending,
  });

  const stars = new Mesh(geometry, material);
  stars.frustumCulled = false;
  scene.add(stars);

  const pointer = { x: 0, y: 0 };
  let lastFrameTime = performance.now();
  let introTime = 0;
  let scrollBoost = 0;
  let lastScrollY = window.scrollY;
  let isHeroVisible = true;
  let isPageVisible = !document.hidden;

  function getDelta() {
    const now = performance.now();
    const delta = (now - lastFrameTime) / 1000;
    lastFrameTime = now;

    return delta;
  }

  function getSpeed(delta) {
    introTime = Math.min(introTime + delta, INTRO_DURATION);
    const introFactor =
      1 +
      (INTRO_MULTIPLIER - 1) * (1 - easeOutCubic(introTime / INTRO_DURATION));

    const scrolled = Math.abs(window.scrollY - lastScrollY);
    lastScrollY = window.scrollY;
    scrollBoost = Math.min(scrollBoost + scrolled * 6, CRUISE_SPEED * 6);
    scrollBoost *= Math.pow(0.04, delta);

    return CRUISE_SPEED * introFactor + scrollBoost;
  }

  function renderFrame() {
    const delta = Math.min(getDelta(), 0.1);
    const speed = getSpeed(delta);

    uniforms.uTravel.value += delta * speed;
    uniforms.uStretch.value = Math.min(1 + (speed / CRUISE_SPEED - 1) * 0.6, 7);
    camera.rotation.y += (-pointer.x * 0.12 - camera.rotation.y) * 0.04;
    camera.rotation.x += (-pointer.y * 0.08 - camera.rotation.x) * 0.04;

    renderer.render(scene, camera);
  }

  function updateLoop() {
    const shouldRun = isHeroVisible && isPageVisible;

    if (shouldRun) {
      lastFrameTime = performance.now();
      lastScrollY = window.scrollY;
    }

    renderer.setAnimationLoop(shouldRun ? renderFrame : null);
  }

  function resize() {
    const { clientWidth: width, clientHeight: height } = canvas;

    if (!width || !height) {
      return;
    }

    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.getDrawingBufferSize(uniforms.uResolution.value);

    if (prefersReducedMotion) {
      renderer.render(scene, camera);
    }
  }

  const handlePointerMove = (event) => {
    pointer.x = event.clientX / window.innerWidth - 0.5;
    pointer.y = event.clientY / window.innerHeight - 0.5;
  };

  const handleVisibilityChange = () => {
    isPageVisible = !document.hidden;
    updateLoop();
  };

  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(canvas);
  resize();

  let intersectionObserver;

  if (prefersReducedMotion) {
    uniforms.uTravel.value = REDUCED_MOTION_TRAVEL;
    renderer.render(scene, camera);
  } else {
    intersectionObserver = new IntersectionObserver(([entry]) => {
      isHeroVisible = entry.isIntersecting;
      updateLoop();
    });
    intersectionObserver.observe(canvas);

    window.addEventListener("pointermove", handlePointerMove, {
      passive: true,
    });
    document.addEventListener("visibilitychange", handleVisibilityChange);
    updateLoop();
  }

  canvas.classList.add("is-ready");

  return {
    dispose() {
      renderer.setAnimationLoop(null);
      resizeObserver.disconnect();
      intersectionObserver?.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      canvas.classList.remove("is-ready");
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    },
  };
}
