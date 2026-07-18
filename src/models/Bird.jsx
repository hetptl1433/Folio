import { useEffect, useRef, useState } from "react";
import { Html, useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

// Parrot by mirada (ro.me "Three Dreams of Black"), via three.js examples — CC BY
// head points +Z, so lookAt aims its face straight at the target
import birdScene from "../assets/3d/parrot.glb";

// idle loop stays mostly behind the island; the greeting flies straight at the viewer
const CX = 0.15;
const CZ = -8.2;
const BASE_Y = 1.7;
const RX = 2.25;
const RZ = 1.05;
const SPEED = 0.38;
const DESKTOP_GREETING_TARGET = { x: 0.85, y: 0.05, z: 3.3 };
const MOBILE_GREETING_TARGET = { x: 0.1, y: 0.05, z: 3.0 };
const DESKTOP_TALK_TARGET = { x: 0.55, y: 0.82, z: 0.75 };
const MOBILE_TALK_TARGET = { x: -0.55, y: 1.45, z: 0.55 };
const PLAY_DURATION_SECONDS = 1.45;
const REDUCED_MOTION_PLAY_SECONDS = 0.7;

const smoothstep = (value) => value * value * (3 - 2 * value);

const cubicBezier = (a, b, c, d, t) => {
  const mt = 1 - t;
  return mt ** 3 * a + 3 * mt ** 2 * t * b + 3 * mt * t ** 2 * c + t ** 3 * d;
};

/**
 * mode: "orbit"  — circles the airspace
 *       "greet"  — swoops toward the camera with a "Hi!" pill; the chat opens on arrival
 *       "talk"   — perches to the side facing the viewer (chat open)
 *       "play"   — performs a quick corkscrew, then returns to the talk perch
 */
export const Bird = ({
  mode = "orbit",
  pointerGuardRef,
  approachDurationSeconds = 5.2,
  reducedMotion = false,
  interactive = true,
  onReady,
  onGreetingArrived,
  onPeck,
  onPlayComplete,
}) => {
  const { scene, animations } = useGLTF(birdScene);
  const birdRef = useRef();
  const modeRef = useRef(mode);
  const greetProgressRef = useRef(mode === "greet" ? 0 : 1);
  const greetingArrivedRef = useRef(false);
  const greetStartRef = useRef({ x: CX + RX, y: BASE_Y, z: CZ });
  const orbitReturnSpeedRef = useRef(3);
  const playProgressRef = useRef(mode === "play" ? 0 : 1);
  const playCompletedRef = useRef(false);
  const playStartRef = useRef({ x: DESKTOP_TALK_TARGET.x, y: DESKTOP_TALK_TARGET.y, z: DESKTOP_TALK_TARGET.z });
  // "Hi!" pill shown while the bird is flying toward the viewer
  const [saysHi, setSaysHi] = useState(false);
  const saysHiRef = useRef(false);
  const { actions } = useAnimations(animations, birdRef);

  const flapName = animations?.[0]?.name;

  useEffect(() => {
    const flap = actions?.[flapName];
    if (flap) {
      flap.reset().play();
    }
  }, [actions, flapName]);

  useEffect(() => {
    onReady?.();
  }, [onReady]);

  useEffect(() => {
    const flap = actions?.[flapName];
    if (!flap) return;
    const timeScale = mode === "play"
      ? 1.55
      : mode === "talk"
        ? 0.78
        : mode === "greet"
          ? 0.94
          : 1.12;
    flap.setEffectiveTimeScale(reducedMotion ? 0 : timeScale);
  }, [actions, flapName, mode, reducedMotion]);

  useEffect(() => {
    scene.traverse((o) => {
      if (o.isMesh) {
        o.castShadow = true;
        o.frustumCulled = false;
        if (o.material) {
          o.material.envMapIntensity = 0.5;
          o.material.needsUpdate = true;
        }
      }
    });
  }, [scene]);

  useEffect(
    () => () => {
      document.querySelector(".home-canvas")?.style.removeProperty("cursor");
    },
    []
  );

  useFrame((state, delta) => {
    const b = birdRef.current;
    if (!b) return;
    const t = state.clock.getElapsedTime();
    const dt = Math.min(delta, 0.05);
    const introDt = Math.min(delta, 0.5);
    const isCompact = state.size.width < 900 || state.size.width / state.size.height < 0.9;
    const greetingTarget = isCompact ? MOBILE_GREETING_TARGET : DESKTOP_GREETING_TARGET;
    const talkTarget = isCompact ? MOBILE_TALK_TARGET : DESKTOP_TALK_TARGET;
    // always orient the bird so its head points straight at the camera
    // (Object3D.lookAt aims the model's +Z at the target, and this bird's head is +Z)
    const faceCamera = () => {
      b.lookAt(state.camera.position.x, b.position.y, state.camera.position.z);
    };

    if (modeRef.current !== mode) {
      const previousMode = modeRef.current;
      if (saysHiRef.current) {
        saysHiRef.current = false;
        setSaysHi(false);
      }
      if (mode === "greet") {
        greetProgressRef.current = 0;
        greetingArrivedRef.current = false;
        greetStartRef.current = { x: b.position.x, y: b.position.y, z: b.position.z };
      }
      if (mode === "play") {
        playProgressRef.current = 0;
        playCompletedRef.current = false;
        playStartRef.current = { x: b.position.x, y: b.position.y, z: b.position.z };
      }
      if (mode === "orbit") {
        orbitReturnSpeedRef.current = previousMode === "talk" || previousMode === "play" ? 0.65 : 3;
      }
      modeRef.current = mode;
    }

    if (reducedMotion) {
      if (mode === "talk" || mode === "play") {
        b.position.set(talkTarget.x, talkTarget.y, talkTarget.z);
        faceCamera();
        if (mode === "play") {
          playProgressRef.current = Math.min(
            1,
            playProgressRef.current + introDt / REDUCED_MOTION_PLAY_SECONDS
          );
          if (playProgressRef.current >= 1 && !playCompletedRef.current) {
            playCompletedRef.current = true;
            onPlayComplete?.();
          }
        }
      } else if (mode === "greet") {
        b.position.set(greetingTarget.x, greetingTarget.y, greetingTarget.z);
        greetProgressRef.current = 1;
        faceCamera();
        if (!greetingArrivedRef.current) {
          greetingArrivedRef.current = true;
          onGreetingArrived?.();
        }
      } else {
        b.position.set(CX + RX, BASE_Y, CZ);
        b.rotation.set(0, 0, 0);
      }
      b.rotation.z = 0;
      return;
    }

    if (mode === "play") {
      playProgressRef.current = Math.min(
        1,
        playProgressRef.current + introDt / PLAY_DURATION_SECONDS
      );
      const playProgress = playProgressRef.current;
      const playEase = smoothstep(playProgress);
      const playArc = Math.sin(Math.PI * playProgress);
      const playStart = playStartRef.current;
      const baseX = playStart.x + (talkTarget.x - playStart.x) * playEase;
      const baseY = playStart.y + (talkTarget.y - playStart.y) * playEase;
      const baseZ = playStart.z + (talkTarget.z - playStart.z) * playEase;

      b.position.x = baseX - 0.75 * playArc;
      b.position.y = baseY + 0.55 * playArc;
      b.position.z = baseZ - 0.3 * playArc;
      faceCamera();
      b.rotateZ(Math.PI * 2 * playEase);

      if (playProgress >= 1 && !playCompletedRef.current) {
        playCompletedRef.current = true;
        onPlayComplete?.();
      }
      return;
    }

    if (mode === "talk") {
      // perch to the side, facing the viewer, while the chat is open
      const k = Math.min(1, dt * 1.35);
      b.position.x += (talkTarget.x - b.position.x) * k;
      b.position.y += (talkTarget.y + Math.sin(t * 1.5) * 0.08 - b.position.y) * k;
      b.position.z += (talkTarget.z - b.position.z) * k;
      faceCamera();
      b.rotation.z += (0 - b.rotation.z) * Math.min(1, dt * 3);
      return;
    }

    if (mode === "greet") {
      // no warm-up lap — swoop straight from wherever the bird is toward the viewer
      const flightSeconds = Math.max(0.1, approachDurationSeconds);
      greetProgressRef.current = Math.min(1, greetProgressRef.current + introDt / flightSeconds);
      const progress = greetProgressRef.current;
      const start = greetStartRef.current;

      // wave hello as soon as the dive begins
      if (!saysHiRef.current && progress > 0.05) {
        saysHiRef.current = true;
        setSaysHi(true);
      }

      const swoop = smoothstep(progress);
      // arc gently up and over the island on the way in
      const controlA = { x: start.x * 0.6, y: start.y + 0.35, z: start.z * 0.6 };
      const controlB = { x: greetingTarget.x * 0.5, y: 1.15, z: -1.6 };

      b.position.x = cubicBezier(start.x, controlA.x, controlB.x, greetingTarget.x, swoop);
      b.position.y =
        cubicBezier(start.y, controlA.y, controlB.y, greetingTarget.y, swoop) +
        Math.sin(t * 1.85) * 0.07 * swoop;
      b.position.z = cubicBezier(start.z, controlA.z, controlB.z, greetingTarget.z, swoop);

      // front-facing for the entire approach — the bird flies at you face-first
      faceCamera();

      const settle = smoothstep(Math.max(0, Math.min(1, (progress - 0.82) / 0.18)));
      b.rotateZ(Math.sin(t * 1.85) * 0.05 * progress * (1 - settle));

      if (greetProgressRef.current >= 1 && !greetingArrivedRef.current) {
        greetingArrivedRef.current = true;
        onGreetingArrived?.();
      }
      return;
    }

    // orbit — eased toward the path so transitions back from greet/talk glide
    const a = t * SPEED;
    const tx = CX + Math.cos(a) * RX;
    const tz = CZ + Math.sin(a) * RZ;
    const ty = BASE_Y + Math.sin(t * 1.45) * 0.22;
    const returnSpeed = orbitReturnSpeedRef.current;
    const k = Math.min(1, dt * returnSpeed);
    b.position.x += (tx - b.position.x) * k;
    b.position.y += (ty - b.position.y) * k;
    b.position.z += (tz - b.position.z) * k;
    orbitReturnSpeedRef.current = Math.min(3, returnSpeed + dt * 0.55);
    const dx = -Math.sin(a) * RX;
    const dz = Math.cos(a) * RZ;
    const targetRotationY = Math.atan2(dx, dz);
    const rotationK = Math.min(1, dt * (returnSpeed < 2.95 ? 1.2 : 4));
    const rotationDelta = Math.atan2(
      Math.sin(targetRotationY - b.rotation.y),
      Math.cos(targetRotationY - b.rotation.y)
    );
    b.rotation.y += rotationDelta * rotationK;
    b.rotation.z += (Math.cos(a) * 0.25 - b.rotation.z) * rotationK;
    b.rotation.x += (Math.sin(t * 1.7) * 0.06 - b.rotation.x) * rotationK;
  });

  const handlePeck = (e) => {
    if (e && e.stopPropagation) e.stopPropagation();
    if (!interactive) return;
    if (pointerGuardRef) pointerGuardRef.current = true;
    onPeck?.();
  };

  const handlePointerOver = (event) => {
    const canvas = event?.nativeEvent?.target;
    if (interactive && canvas instanceof HTMLCanvasElement) {
      canvas.style.cursor = "pointer";
    }
  };

  const handlePointerOut = (event) => {
    const canvas = event?.nativeEvent?.target;
    if (canvas instanceof HTMLCanvasElement) {
      canvas.style.removeProperty("cursor");
    }
  };

  return (
    <group ref={birdRef} position={[CX + RX, BASE_Y, CZ]}>
      <group
        scale={[0.016, 0.016, 0.016]}
        onPointerDown={handlePeck}
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
      >
        <primitive object={scene} />
        {/* Keep this mesh renderable so R3F always raycasts it. The material
            writes no pixels, making a generous click target around the bird. */}
        <mesh>
          <sphereGeometry args={[mode === "talk" || mode === "play" ? 80 : 110, 16, 16]} />
          <meshBasicMaterial
            transparent
            opacity={0}
            colorWrite={false}
            depthWrite={false}
          />
        </mesh>
      </group>

      {mode === "play" || (mode === "greet" && saysHi) ? (
        <Html position={[0, 0.45, 0]} center zIndexRange={[18, 0]}>
          <div className="bird-hi" aria-hidden="true">
            {mode === "play" ? (reducedMotion ? "Chirp! ✨" : "Wheee! ✨") : "Hi! 👋"}
          </div>
        </Html>
      ) : null}
    </group>
  );
};

export default Bird;
