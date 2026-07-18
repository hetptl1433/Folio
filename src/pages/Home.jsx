import { useCallback, useEffect, useMemo, useRef, useState, Suspense } from "react";
import * as THREE from "three";
import { Environment, Lightformer, Sparkles } from "@react-three/drei";

import { Loader } from "../components/Loader";
import { ThreeCanvas } from "../components/ThreeCanvas";
import Island from "../models/Island";
import { Sky } from "../models/Sky";
import { Bird } from "../models/Bird";
import { Plane } from "../models/Plane";
import { HomeInfo } from "../components/HomeInfo";
import { arrow } from "../assets/icons";
import sakura from "../assets/sakura.mp3";
import soundon from "../assets/icons/soundon.png";
import soundoff from "../assets/icons/soundoff.png";

const INITIAL_GREETING_DELAY_MS = 300;
const BIRD_APPROACH_DURATION_SECONDS = 4.5;
// a clicked bird answers faster than the load-time greeting
const BIRD_PECK_APPROACH_SECONDS = 2.2;
const BIRD_APPROACH_WATCHDOG_MS = 15000;
const BIRD_LOAD_FALLBACK_MS = 20000;

// greet on every page load, but only once per load — surviving route changes
// within the SPA without re-triggering, and resetting on refresh
let birdHasGreetedThisLoad = false;

export const Home = ({
  chatOpen,
  birdPlaying,
  onOpenBirdChat,
  onPlayBird,
  onBirdPlayComplete,
}) => {
  // created lazily so the ~5MB track only downloads when music is turned on
  const audioRef = useRef(null);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);

  const [isRotating, setIsRotating] = useState(false);
  const [currentStage, setCurrentStage] = useState(1);
  const [hasInteracted, setHasInteracted] = useState(true);
  const [targetStage, setTargetStage] = useState(null);
  const [sceneAvailable, setSceneAvailable] = useState(null);
  const totalStages = 4;

  const [birdIntroPhase, setBirdIntroPhase] = useState(() =>
    birdHasGreetedThisLoad ? "complete" : "waiting"
  );
  const [hasBirdWelcomed, setHasBirdWelcomed] = useState(birdHasGreetedThisLoad);
  const [birdReady, setBirdReady] = useState(false);
  const [approachSeconds, setApproachSeconds] = useState(BIRD_APPROACH_DURATION_SECONDS);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() =>
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
  const [isCompactViewport, setIsCompactViewport] = useState(() =>
    window.matchMedia("(max-width: 767px)").matches
  );
  const birdLauncherRef = useRef(null);
  const birdPointerActiveRef = useRef(false);

  useEffect(
    () => () => {
      onBirdPlayComplete();
    },
    [onBirdPlayComplete]
  );

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const syncPreference = () => setPrefersReducedMotion(mediaQuery.matches);

    syncPreference();
    mediaQuery.addEventListener("change", syncPreference);
    return () => mediaQuery.removeEventListener("change", syncPreference);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const syncViewport = () => setIsCompactViewport(mediaQuery.matches);

    syncViewport();
    mediaQuery.addEventListener("change", syncViewport);
    return () => mediaQuery.removeEventListener("change", syncViewport);
  }, []);

  useEffect(() => {
    if (hasBirdWelcomed) {
      birdHasGreetedThisLoad = true;
    }
  }, [hasBirdWelcomed]);

  // let the bird introduce the chat once, then stay out of the way
  useEffect(() => {
    if (!birdReady || chatOpen || hasBirdWelcomed || birdIntroPhase !== "waiting") return undefined;
    const timer = window.setTimeout(() => {
      setBirdIntroPhase("approach");
    }, INITIAL_GREETING_DELAY_MS);
    return () => window.clearTimeout(timer);
  }, [birdIntroPhase, birdReady, chatOpen, hasBirdWelcomed]);

  useEffect(() => {
    if (birdReady || chatOpen || hasBirdWelcomed || birdIntroPhase !== "waiting") return undefined;
    const timer = window.setTimeout(() => setBirdIntroPhase("fallback"), BIRD_LOAD_FALLBACK_MS);
    return () => window.clearTimeout(timer);
  }, [birdIntroPhase, birdReady, chatOpen, hasBirdWelcomed]);

  useEffect(() => {
    if (birdIntroPhase !== "approach" || chatOpen || hasBirdWelcomed) return undefined;
    const timer = window.setTimeout(() => {
      setBirdIntroPhase("fallback");
    }, BIRD_APPROACH_WATCHDOG_MS);
    return () => window.clearTimeout(timer);
  }, [birdIntroPhase, chatOpen, hasBirdWelcomed]);

  useEffect(() => {
    if (isPlayingMusic) {
      if (!audioRef.current) {
        audioRef.current = new Audio(sakura);
        audioRef.current.volume = 0.4;
        audioRef.current.loop = true;
      }
      audioRef.current.play().catch(() => setIsPlayingMusic(false));
    } else {
      audioRef.current?.pause();
    }
  }, [isPlayingMusic]);

  const handleStageChange = useCallback(
    (direction) => {
      setHasInteracted(true);
      setIsRotating(true);
      if (sceneAvailable === false) {
        setCurrentStage((stage) => {
          const nextStage = (stage ?? 1) + direction;
          if (nextStage < 1) return totalStages;
          if (nextStage > totalStages) return 1;
          return nextStage;
        });
        setIsRotating(false);
        return;
      }
      setTargetStage((pendingStage) => {
        const baseStage = pendingStage ?? currentStage ?? 1;
        const nextStage = baseStage + direction;
        if (nextStage < 1) return totalStages;
        if (nextStage > totalStages) return 1;
        return nextStage;
      });
    },
    [currentStage, sceneAvailable, totalStages]
  );

  const goToStage = (stage) => {
    setHasInteracted(true);
    if (sceneAvailable === false) {
      setCurrentStage(stage);
      setIsRotating(false);
      return;
    }
    setIsRotating(true);
    setTargetStage(stage);
  };

  const openBirdChat = useCallback(() => {
    setHasBirdWelcomed(true);
    setBirdIntroPhase("complete");
    onOpenBirdChat({ autoFocus: true });
  }, [onOpenBirdChat]);

  // the bird opens the chat itself the moment it lands in front of the viewer
  const handleBirdArrived = useCallback(() => {
    setHasBirdWelcomed(true);
    setBirdIntroPhase("complete");
    onOpenBirdChat({ autoFocus: false });
  }, [onOpenBirdChat]);

  const handleBirdReady = useCallback(() => {
    setBirdReady(true);
  }, []);

  // clicking the bird sends it swooping over to reopen the chat, any time after
  // the first greeting; a second click mid-flight skips straight to the chat
  const handleBirdPeck = useCallback(() => {
    if (chatOpen) {
      onPlayBird();
      return;
    }
    if (birdIntroPhase === "approach") {
      openBirdChat();
      return;
    }
    setApproachSeconds(BIRD_PECK_APPROACH_SECONDS);
    setBirdIntroPhase("approach");
  }, [birdIntroPhase, chatOpen, onPlayBird, openBirdChat]);

  const isBirdGreeting = birdIntroPhase === "approach";
  const showBirdLauncher = hasBirdWelcomed || birdIntroPhase === "fallback";

  useEffect(() => {
    const handleKeyDown = (e) => {
      const tagName = e.target?.tagName;
      if (
        e.defaultPrevented ||
        e.target?.isContentEditable ||
        tagName === "INPUT" ||
        tagName === "TEXTAREA" ||
        tagName === "SELECT"
      ) {
        return;
      }
      if (e.key === "ArrowLeft") handleStageChange(-1);
      else if (e.key === "ArrowRight") handleStageChange(1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleStageChange]);

  const islandScale = isCompactViewport ? [0.9, 0.9, 0.9] : [1, 1, 1];
  const islandPosition = [0, -6.5, -41];
  const islandRotation = [0.1, 4.7, 0];
  // aims the shadow-casting sun at the island rather than the world origin
  const sunTarget = useMemo(() => new THREE.Object3D(), []);
  const planeScale = isCompactViewport ? [1.5, 1.5, 1.5] : [3, 3, 3];
  const planePosition = isCompactViewport ? [0, -1.5, 0] : [0, -4, -4];

  return (
    <section id="home" className="home-shell relative h-[100dvh] min-h-[560px] w-full overflow-hidden">
      {/* soft cinematic vignette over the 3D scene */}
      <div className="scene-vignette pointer-events-none absolute inset-0 z-[5]" aria-hidden="true" />

      <div
        className={`home-stage-info absolute left-0 right-0 top-[clamp(5.5rem,13dvh,7rem)] z-10 items-center justify-center transition-all duration-500 ease-out ${
          sceneAvailable === false ? "hidden" : "flex"
        } ${chatOpen ? "home-stage-info--squeezed" : ""} ${isRotating ? "pointer-events-none -translate-y-2 opacity-0" : "translate-y-0 opacity-100"}`}
        aria-live="polite"
      >
        {hasInteracted && currentStage ? <HomeInfo currentStage={currentStage} /> : null}
      </div>

      {/* flight deck controls */}
      <div
        className={`home-flight-controls absolute bottom-[max(1rem,env(safe-area-inset-bottom))] left-0 right-0 z-10 flex-col items-center gap-4 transition-all duration-500 ease-out sm:bottom-8 ${
          sceneAvailable === false ? "hidden" : "flex"
        } ${chatOpen ? "home-flight-controls--squeezed" : ""}`}
      >
        <div className="relative flex h-14 w-[min(100%_-_1.5rem,340px)] items-center justify-center rounded-full border border-white/70 bg-white/60 px-16 shadow-soft backdrop-blur-md">
          <button
            type="button"
            aria-label="Previous stage"
            className="magnetic group absolute left-1 flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-lg transition hover:scale-110 active:scale-95"
            onClick={() => handleStageChange(-1)}
          >
            <img
              src={arrow}
              alt=""
              className="h-5 w-5 rotate-180 transition-transform group-hover:-translate-x-0.5"
            />
          </button>

          <div className="flex items-center">
            {Array.from({ length: totalStages }).map((_, i) => (
              <button
                key={i}
                type="button"
                aria-label={`Go to stage ${i + 1}`}
                aria-current={currentStage === i + 1 ? "step" : undefined}
                onClick={() => goToStage(i + 1)}
                className="group grid h-11 w-11 place-items-center rounded-full focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200"
              >
                <span
                  className={`block h-2.5 rounded-full transition-all duration-300 ${
                    currentStage === i + 1
                      ? "w-7 bg-gradient-to-r from-[#00c6ff] to-[#0072ff] shadow-[0_0_12px_rgba(0,114,255,0.55)]"
                      : "w-2.5 bg-blue-500/30 group-hover:bg-blue-500/60"
                  }`}
                />
              </button>
            ))}
          </div>

          <button
            type="button"
            aria-label="Next stage"
            className="magnetic group absolute right-1 flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-lg transition hover:scale-110 active:scale-95"
            onClick={() => handleStageChange(1)}
          >
            <img
              src={arrow}
              alt=""
              className="h-5 w-5 transition-transform group-hover:translate-x-0.5"
            />
          </button>
        </div>

        <p className="home-flight-hint max-w-full select-none px-4 text-center text-xs font-medium tracking-wide text-blue-900/50 animate-float">
          ✦ drag the island · use ← → or the dots to explore
        </p>
      </div>

      <ThreeCanvas
        className={`home-canvas h-[100dvh] min-h-[560px] w-full bg-transparent ${isRotating ? "cursor-grabbing" : "cursor-grab"}`}
        dpr={isCompactViewport ? [1, 1.5] : [1, 1.8]}
        shadows
        camera={{ near: 0.1, far: 1000 }}
        gl={{ antialias: true, toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.2 }}
        onAvailabilityChange={setSceneAvailable}
      >
        <Suspense fallback={<Loader />}>
          <primitive object={sunTarget} position={islandPosition} />
          <directionalLight
            castShadow
            target={sunTarget}
            position={[14, 22, -16]}
            intensity={2.6}
            color="#fff2dd"
            shadow-mapSize={isCompactViewport ? [1024, 1024] : [2048, 2048]}
            shadow-camera-near={1}
            shadow-camera-far={140}
            shadow-camera-left={-50}
            shadow-camera-right={50}
            shadow-camera-top={50}
            shadow-camera-bottom={-50}
            shadow-bias={-0.0002}
            shadow-normalBias={0.08}
          />
          <ambientLight intensity={0.25} />
          <hemisphereLight skyColor="#b1e1ff" groundColor="#3a2e1f" intensity={0.45} />
          <directionalLight position={[-4, 2, -3]} intensity={0.4} color="#cfe5ff" />
          <Environment resolution={256}>
            <group rotation={[-Math.PI / 3, 0, 0]}>
              <Lightformer intensity={1} position={[0, 6, -3]} scale={[12, 6, 1]} color="#ffffff" />
              <Lightformer intensity={0.6} position={[-6, 1, 2]} scale={[6, 6, 1]} color="#bcd8ff" />
            </group>
          </Environment>

          {/* faint drifting motes give the air some life */}
          <Sparkles
            count={70}
            scale={[11, 5, 9]}
            position={[0, 0.4, -10]}
            size={1.7}
            speed={prefersReducedMotion ? 0 : 0.25}
            opacity={0.5}
            color="#dbeeff"
          />
          <Bird
            mode={chatOpen ? (birdPlaying ? "play" : "talk") : isBirdGreeting ? "greet" : "orbit"}
            pointerGuardRef={birdPointerActiveRef}
            approachDurationSeconds={approachSeconds}
            reducedMotion={prefersReducedMotion}
            interactive
            onReady={handleBirdReady}
            onGreetingArrived={handleBirdArrived}
            onPeck={handleBirdPeck}
            onPlayComplete={onBirdPlayComplete}
          />
          <Sky isRotating={isRotating} reducedMotion={prefersReducedMotion} />
          <Island
            position={islandPosition}
            scale={islandScale}
            rotation={islandRotation}
            isRotating={isRotating}
            setIsRotating={setIsRotating}
            setCurrentStage={setCurrentStage}
            targetStage={targetStage}
            setTargetStage={setTargetStage}
            reducedMotion={prefersReducedMotion}
            pointerGuardRef={birdPointerActiveRef}
          />
          <Plane
            scale={planeScale}
            position={planePosition}
            isRotating={isRotating || Boolean(targetStage)}
            rotation={[0, 20, 0]}
            reducedMotion={prefersReducedMotion}
          />
        </Suspense>
      </ThreeCanvas>

      <button
        type="button"
        onClick={() => setIsPlayingMusic((v) => !v)}
        className="magnetic group absolute bottom-[calc(5rem+env(safe-area-inset-bottom))] left-[max(0.75rem,env(safe-area-inset-left))] z-10 grid h-11 w-11 place-items-center sm:bottom-[max(1rem,env(safe-area-inset-bottom))] sm:left-[max(1rem,env(safe-area-inset-left))]"
        aria-label={isPlayingMusic ? "Turn music off" : "Turn music on"}
        aria-pressed={isPlayingMusic}
      >
        <img
          src={isPlayingMusic ? soundon : soundoff}
          alt=""
          className="w-10 h-10 object-contain transition-transform group-hover:scale-110"
        />
      </button>

      {showBirdLauncher && !chatOpen ? (
        <button
          ref={birdLauncherRef}
          id="sushi-home-launcher"
          type="button"
          onClick={openBirdChat}
          aria-label="Open Sushi chat"
          className="fixed bottom-[calc(9rem+env(safe-area-inset-bottom))] right-3 z-30 flex min-h-11 items-center gap-2 rounded-full border border-blue-100 bg-white/90 px-3.5 py-2 text-sm font-semibold text-blue-600 shadow-lg backdrop-blur transition hover:-translate-y-0.5 hover:shadow-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200 sm:bottom-6 sm:right-6"
        >
          <span aria-hidden="true">🐦</span>
          <span>Ask Sushi</span>
        </button>
      ) : null}
    </section>
  );
};
