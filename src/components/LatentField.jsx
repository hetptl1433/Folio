import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* deterministic RNG so the cloud is stable across reloads */
const mulberry32 = (seed) => {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

const CLUSTER_COLORS = [
  [0.486, 0.361, 1.0], // violet  #7C5CFF
  [0.176, 0.886, 0.788], // teal  #2DE2C9
  [1.0, 0.478, 0.27], // ember   #FF7A45
];

// camera keyframes per shape segment: [x?, y, z]
const CAM = [
  { y: 0.0, z: 9.2 }, // sphere / hero
  { y: 0.0, z: 8.6 }, // helix / about
  { y: 0.6, z: 9.6 }, // skills bars
  { y: 0.0, z: 9.8 }, // ribbon timeline
  { y: 0.0, z: 11.2 }, // project clusters
  { y: -0.6, z: 8.4 }, // funnel / contact
];
const NUM_SHAPES = CAM.length;

const buildShapes = (count) => {
  const rand = mulberry32(20260627);
  const shapes = Array.from({ length: NUM_SHAPES }, () => new Float32Array(count * 3));
  const colors = new Float32Array(count * 3);
  const clusterId = new Float32Array(count);
  const seeds = new Float32Array(count);

  // project-cluster centers (clusters shape)
  const centers = [
    [-4.2, 1.1, 0.4], // cryptex (violet)
    [4.1, 1.3, -0.8], // fraud (ember)
    [-3.6, -1.7, 1.0], // e-motel (teal)
    [3.9, -1.5, 0.6], // real-estate (teal)
  ];

  for (let i = 0; i < count; i += 1) {
    const r = rand();
    seeds[i] = r;
    // cluster split: ~45% violet, ~45% teal, ~10% ember
    let c = 0;
    if (r > 0.9) c = 2;
    else if (r > 0.45) c = 1;
    clusterId[i] = c;
    colors[i * 3] = CLUSTER_COLORS[c][0];
    colors[i * 3 + 1] = CLUSTER_COLORS[c][1];
    colors[i * 3 + 2] = CLUSTER_COLORS[c][2];

    const j = i * 3;
    const u = i / count;

    // ---- 0: SPHERE (two-toned galaxy) ----
    {
      const phi = Math.acos(1 - 2 * (i + 0.5) / count);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      let R = 4.2 + (rand() - 0.5) * 0.5;
      let x = Math.sin(phi) * Math.cos(theta) * R;
      const y = Math.cos(phi) * R;
      let z = Math.sin(phi) * Math.sin(theta) * R;
      if (c === 0 && x < 0) x = -x; // violet hemisphere +x
      if (c === 1 && x > 0) x = -x; // teal hemisphere -x
      if (c === 2) {
        x *= 0.42;
        z *= 0.42;
      }
      shapes[0][j] = x;
      shapes[0][j + 1] = y;
      shapes[0][j + 2] = z;
    }

    // ---- 1: DOUBLE HELIX ----
    {
      const h = (u - 0.5) * 9.0;
      const ang = h * 1.05;
      const rad = 1.7;
      if (c === 2) {
        // ember = rungs between strands
        const t = rand();
        shapes[1][j] = Math.cos(ang) * rad * (1 - 2 * t);
        shapes[1][j + 1] = h;
        shapes[1][j + 2] = Math.sin(ang) * rad * (1 - 2 * t);
      } else {
        const off = c === 0 ? 0 : Math.PI;
        shapes[1][j] = Math.cos(ang + off) * rad + (rand() - 0.5) * 0.12;
        shapes[1][j + 1] = h;
        shapes[1][j + 2] = Math.sin(ang + off) * rad + (rand() - 0.5) * 0.12;
      }
    }

    // ---- 2: SKILLS BAR CONSTELLATION ----
    {
      const cols = 7;
      const col = i % cols;
      const heights = [0.95, 0.9, 0.84, 0.8, 0.72, 0.66, 0.6];
      const x = (col - (cols - 1) / 2) * 1.5;
      const top = heights[col] * 6 - 3;
      const y = -3 + rand() * (top + 3);
      shapes[2][j] = x + (rand() - 0.5) * 0.5;
      shapes[2][j + 1] = y;
      shapes[2][j + 2] = (rand() - 0.5) * 0.8;
    }

    // ---- 3: RIBBON TIMELINE ----
    {
      const x = (u - 0.5) * 13.0;
      shapes[3][j] = x;
      shapes[3][j + 1] = Math.sin(x * 0.55) * 0.7 + (rand() - 0.5) * 0.5;
      shapes[3][j + 2] = Math.cos(x * 0.4) * 0.7 + (rand() - 0.5) * 0.5;
    }

    // ---- 4: PROJECT CLUSTERS ----
    {
      let ci;
      if (c === 0) ci = 0;
      else if (c === 2) ci = 1;
      else ci = i % 2 === 0 ? 2 : 3;
      const ctr = centers[ci];
      const g = () => (rand() + rand() + rand() - 1.5) * 0.95;
      shapes[4][j] = ctr[0] + g();
      shapes[4][j + 1] = ctr[1] + g();
      shapes[4][j + 2] = ctr[2] + g();
    }

    // ---- 5: FUNNEL / PORTAL ----
    {
      const y = 3.4 - u * 7.4;
      const rad = Math.max(0.05, (y + 4) / 7.4) * 3.0;
      const ang = i * 2.39996;
      shapes[5][j] = Math.cos(ang) * rad + (rand() - 0.5) * 0.15;
      shapes[5][j + 1] = y;
      shapes[5][j + 2] = Math.sin(ang) * rad + (rand() - 0.5) * 0.15;
    }
  }

  return { shapes, colors, clusterId, seeds };
};

const VERT = /* glsl */ `
  uniform float uBlend;
  uniform float uTime;
  uniform float uSize;
  uniform float uQueryCluster;
  uniform float uQuery;
  attribute vec3 aTarget;
  attribute vec3 aColor;
  attribute float aCluster;
  attribute float aSeed;
  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    vec3 p = mix(position, aTarget, uBlend);
    float t = uTime * 0.16 + aSeed * 6.2831;
    p.x += sin(t) * 0.07;
    p.y += cos(t * 1.27) * 0.07;
    p.z += sin(t * 0.73) * 0.07;

    float matched = (uQueryCluster > -0.5 && abs(aCluster - uQueryCluster) < 0.5) ? 1.0 : 0.0;
    float ignite = matched * uQuery;
    vColor = mix(aColor, vec3(1.0, 0.478, 0.27), ignite);

    vAlpha = 1.0;
    if (uQuery > 0.001) {
      vAlpha = mix(1.0, mix(0.07, 1.0, matched), uQuery);
    }

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    float size = uSize * (0.55 + aSeed * 0.95) * (1.0 + ignite * 1.5);
    gl_PointSize = size * (300.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const FRAG = /* glsl */ `
  precision mediump float;
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;
    float glow = smoothstep(0.5, 0.0, d);
    glow = pow(glow, 1.6);
    gl_FragColor = vec4(vColor, glow * vAlpha);
  }
`;

const Field = ({ count, scrollRef, pointerRef, queryRef }) => {
  const { camera } = useThree();
  const pointsRef = useRef();
  const segRef = useRef(-1);
  const blendRef = useRef(0);
  const queryStrength = useRef(0);
  const queryCluster = useRef(-1);

  const data = useMemo(() => buildShapes(count), [count]);

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(data.shapes[0].slice(), 3));
    g.setAttribute("aTarget", new THREE.BufferAttribute(data.shapes[1].slice(), 3));
    g.setAttribute("aColor", new THREE.BufferAttribute(data.colors, 3));
    g.setAttribute("aCluster", new THREE.BufferAttribute(data.clusterId, 1));
    g.setAttribute("aSeed", new THREE.BufferAttribute(data.seeds, 1));
    return g;
  }, [data]);

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        uniforms: {
          uBlend: { value: 0 },
          uTime: { value: 0 },
          uSize: { value: 7.0 },
          uQueryCluster: { value: -1 },
          uQuery: { value: 0 },
        },
        vertexShader: VERT,
        fragmentShader: FRAG,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    []
  );

  useEffect(() => () => {
    geometry.dispose();
    material.dispose();
  }, [geometry, material]);

  const writeSegment = (seg) => {
    const posAttr = geometry.getAttribute("position");
    const tarAttr = geometry.getAttribute("aTarget");
    posAttr.array.set(data.shapes[seg]);
    tarAttr.array.set(data.shapes[Math.min(seg + 1, NUM_SHAPES - 1)]);
    posAttr.needsUpdate = true;
    tarAttr.needsUpdate = true;
  };

  useFrame((state, delta) => {
    if (typeof document !== "undefined" && document.hidden) return;
    const dt = Math.min(delta, 0.05);
    material.uniforms.uTime.value += dt;

    // morph driven by scroll
    const frac = scrollRef.current;
    const prog = frac * (NUM_SHAPES - 1);
    let seg = Math.floor(prog);
    if (seg < 0) seg = 0;
    if (seg > NUM_SHAPES - 2) seg = NUM_SHAPES - 2;
    const localTarget = THREE.MathUtils.clamp(prog - seg, 0, 1);

    if (seg !== segRef.current) {
      writeSegment(seg);
      segRef.current = seg;
      blendRef.current = localTarget;
    }
    blendRef.current += (localTarget - blendRef.current) * Math.min(1, dt * 9);
    const eased = blendRef.current * blendRef.current * (3 - 2 * blendRef.current);
    material.uniforms.uBlend.value = eased;

    // query easing
    const q = queryRef.current;
    queryCluster.current = q.cluster;
    const targetStrength = q.cluster >= 0 ? 1 : 0;
    queryStrength.current += (targetStrength - queryStrength.current) * Math.min(1, dt * 6);
    material.uniforms.uQuery.value = queryStrength.current;
    material.uniforms.uQueryCluster.value = q.cluster;

    // slow galaxy spin, strongest in hero, fading as you scroll
    if (pointsRef.current) {
      pointsRef.current.rotation.y += dt * 0.04 * (1 - Math.min(frac * 2, 1)) + dt * 0.006;
    }

    // camera: lerp along shape keyframes + pointer parallax + query dolly
    const a = CAM[seg];
    const b = CAM[Math.min(seg + 1, NUM_SHAPES - 1)];
    const camY = THREE.MathUtils.lerp(a.y, b.y, localTarget);
    let camZ = THREE.MathUtils.lerp(a.z, b.z, localTarget);
    camZ -= queryStrength.current * 1.1;
    const px = pointerRef.current.x;
    const py = pointerRef.current.y;
    camera.position.x += (px * 1.3 - camera.position.x) * Math.min(1, dt * 2.5);
    camera.position.y += (camY + py * 0.7 - camera.position.y) * Math.min(1, dt * 2.5);
    camera.position.z += (camZ - camera.position.z) * Math.min(1, dt * 2.5);
    camera.lookAt(0, camY * 0.4, 0);
  });

  return <points ref={pointsRef} geometry={geometry} material={material} frustumCulled={false} />;
};

const LatentField = ({ scrollRef, pointerRef, queryRef }) => {
  const isMobile =
    typeof window !== "undefined" &&
    (window.matchMedia("(max-width: 768px)").matches || navigator.maxTouchPoints > 1);
  const count = isMobile ? 2600 : 6400;

  return (
    <Canvas
      className="canvas-fixed"
      dpr={isMobile ? [1, 1.3] : [1, 1.7]}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [0, 0, 9.2], fov: 62, near: 0.1, far: 100 }}
    >
      <Field count={count} scrollRef={scrollRef} pointerRef={pointerRef} queryRef={queryRef} />
    </Canvas>
  );
};

export default LatentField;
