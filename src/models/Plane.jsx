import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { Html, Line, useAnimations, useGLTF, useTexture } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

import planeScene from '../assets/3d/plane.glb'
import socialBannerArtwork from '../assets/images/social-flight-banner.svg'
import { socialLinks } from '../constants'

const SOCIAL_FLIGHT_ORDER = ['LinkedIn', 'GitHub']
const FLIGHT_SPEED_PIXELS_PER_SECOND = 82
const CLOTH_SEGMENTS_X = 48
const CLOTH_SEGMENTS_Y = 12
const TOW_ROPE_POINT_COUNT = 9
const TOW_HOOK_POSITION = [0, 0.28, -0.52]
const VERTICAL_FIN_MESH_NAME = 'polySurface201_pasted__lambert2_0'

const createAmericanaFinMaterial = (sourceMaterial) => {
  const material = sourceMaterial.clone()
  material.name = 'americana-vertical-fin'
  material.map = null
  material.color.set('#ffffff')
  material.onBeforeCompile = (shader) => {
    shader.vertexShader = shader.vertexShader
      .replace(
        '#include <common>',
        '#include <common>\nvarying vec3 vFinPosition;',
      )
      .replace(
        '#include <begin_vertex>',
        '#include <begin_vertex>\nvFinPosition = position;',
      )

    shader.fragmentShader = shader.fragmentShader
      .replace(
        '#include <common>',
        '#include <common>\nvarying vec3 vFinPosition;',
      )
      .replace(
        '#include <map_fragment>',
        `#include <map_fragment>
        vec2 finUv = vec2(
          clamp((vFinPosition.z + 0.961913) / 1.923826, 0.0, 1.0),
          clamp((vFinPosition.y + 1.0) * 0.5, 0.0, 1.0)
        );
        float stripeIndex = mod(floor(min(finUv.y, 0.9999) * 13.0), 2.0);
        vec3 flagRed = vec3(0.45, 0.01, 0.055);
        vec3 flagWhite = vec3(0.95, 0.95, 0.92);
        vec3 flagNavy = vec3(0.004, 0.03, 0.12);
        vec3 flagColor = mix(flagRed, flagWhite, stripeIndex);

        float cantonMask = step(0.56, finUv.x) * step(0.461538, finUv.y);
        vec2 cantonUv = vec2(
          (finUv.x - 0.56) / 0.44,
          (finUv.y - 0.461538) / 0.538462
        );
        float starRow = floor(clamp(cantonUv.y, 0.0, 0.9999) * 9.0);
        vec2 starGrid = vec2(
          cantonUv.x * 6.0 - mod(starRow, 2.0) * 0.5,
          cantonUv.y * 9.0
        );
        float starDot = 1.0 - smoothstep(
          0.10,
          0.24,
          length(fract(starGrid) - vec2(0.5))
        );
        vec3 cantonColor = mix(flagNavy, flagWhite, starDot);
        diffuseColor.rgb = mix(flagColor, cantonColor, cantonMask);`,
      )
  }
  material.customProgramCacheKey = () => 'americana-vertical-fin-v1'
  material.needsUpdate = true
  return material
}

const getPixelFactorAtObjectDepth = (state, object, scratch) => {
  object.getWorldPosition(scratch.worldPosition)
  state.camera.getWorldDirection(scratch.cameraDirection)
  scratch.cameraOffset
    .copy(scratch.worldPosition)
    .sub(state.camera.position)

  const depth = Math.max(
    Math.abs(scratch.cameraOffset.dot(scratch.cameraDirection)),
    state.camera.near,
  )
  scratch.depthTarget
    .copy(state.camera.position)
    .addScaledVector(scratch.cameraDirection, depth)

  return Math.max(
    state.viewport.getCurrentViewport(state.camera, scratch.depthTarget).factor,
    1,
  )
}

const createDepthScratch = () => ({
  worldPosition: new THREE.Vector3(),
  cameraDirection: new THREE.Vector3(),
  cameraOffset: new THREE.Vector3(),
  depthTarget: new THREE.Vector3(),
})

const getWideLayoutBlend = (screenWidth) =>
  THREE.MathUtils.smoothstep(screenWidth, 520, 680)

const getBannerWidthPixels = (screenWidth, shortness = 0) => {
  const wideBlend = getWideLayoutBlend(screenWidth)
  const phoneWidth = THREE.MathUtils.clamp(screenWidth - 195, 176, 195)
  const fluidWidth = THREE.MathUtils.clamp(screenWidth * 0.325, 195, 250)
  const responsiveWidth = THREE.MathUtils.lerp(phoneWidth, fluidWidth, wideBlend)
  const shortWidth = THREE.MathUtils.clamp(screenWidth * 0.3, 195, 230)
  return THREE.MathUtils.lerp(responsiveWidth, shortWidth, shortness * wideBlend)
}

const getTowGapPixels = (screenWidth, shortness = 0) => {
  const wideBlend = getWideLayoutBlend(screenWidth)
  const phoneGap = THREE.MathUtils.clamp(screenWidth * 0.25, 75, 105)
  const fluidGap = THREE.MathUtils.clamp(screenWidth * 0.155, 105, 205)
  const responsiveGap = THREE.MathUtils.lerp(phoneGap, fluidGap, wideBlend)
  const shortGap = THREE.MathUtils.clamp(screenWidth * 0.16, 105, 145)
  return THREE.MathUtils.lerp(responsiveGap, shortGap, shortness * wideBlend)
}

const getBannerLift = (screenWidth, shortness = 0) => {
  const responsiveLift = THREE.MathUtils.lerp(
    0.28,
    0.48,
    getWideLayoutBlend(screenWidth),
  )
  return THREE.MathUtils.lerp(responsiveLift, 0.38, shortness)
}

const aerialSocialLinks = SOCIAL_FLIGHT_ORDER.map((name) =>
  socialLinks.find((link) => link.name === name),
).filter(Boolean)

const SocialFlightHotspots = ({ layout, shortness, onHoldChange }) => {
  const [bannerNode, setBannerNode] = useState(null)
  const [isOnScreen, setIsOnScreen] = useState(
    () => typeof IntersectionObserver === 'undefined',
  )
  const attachBanner = useCallback((node) => setBannerNode(node), [])
  const holdFlight = useCallback(() => onHoldChange(true), [onHoldChange])
  const releaseFlight = useCallback(
    (event) => {
      const nextTarget = event.relatedTarget
      if (!(nextTarget instanceof Node) || !event.currentTarget.contains(nextTarget)) {
        onHoldChange(false)
      }
    },
    [onHoldChange],
  )
  const screenWidth = useThree((state) => state.size.width)
  const bannerWidth = getBannerWidthPixels(screenWidth, shortness)

  useEffect(() => {
    if (!bannerNode || typeof IntersectionObserver === 'undefined') {
      return undefined
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsOnScreen(entry.isIntersecting && entry.intersectionRatio >= 0.05),
      { threshold: [0, 0.05] },
    )
    observer.observe(bannerNode)
    return () => observer.disconnect()
  }, [bannerNode])

  return (
    <Html
      center
      zIndexRange={[9, 6]}
      wrapperClass="social-flight-html"
      style={{ pointerEvents: 'none' }}
    >
      <div
        ref={attachBanner}
        className={`social-flight-hitbox social-flight-hitbox--${layout}`}
        style={{
          '--social-flight-banner-width': `${bannerWidth}px`,
        }}
        role="group"
        aria-label="Het Patel's social profiles"
        aria-hidden={isOnScreen ? undefined : true}
        onPointerEnter={holdFlight}
        onPointerLeave={releaseFlight}
        onFocus={holdFlight}
        onBlur={releaseFlight}
        onPointerDown={(event) => event.stopPropagation()}
      >
        {aerialSocialLinks.map((link) => (
          <a
            key={link.name}
            href={link.link}
            target="_blank"
            rel="noopener noreferrer"
            className="social-flight-hotspot"
            aria-label={`Open Het Patel's ${link.name} profile in a new tab`}
            tabIndex={isOnScreen ? 0 : -1}
          >
            <span>{link.name}</span>
          </a>
        ))}
      </div>
    </Html>
  )
}

const ClothSocialBanner = ({ shortness, reducedMotion }) => {
  const meshRef = useRef()
  const geometryRef = useRef()
  const basePositionsRef = useRef()
  const staticPoseReadyRef = useRef(false)
  const depthScratchRef = useRef(createDepthScratch())
  const sourceBannerTexture = useTexture(socialBannerArtwork)
  const { gl } = useThree()
  const bannerTexture = useMemo(() => {
    const configuredTexture = sourceBannerTexture.clone()
    configuredTexture.colorSpace = THREE.SRGBColorSpace
    configuredTexture.wrapS = THREE.ClampToEdgeWrapping
    configuredTexture.wrapT = THREE.ClampToEdgeWrapping
    configuredTexture.anisotropy = Math.min(8, gl.capabilities.getMaxAnisotropy())
    configuredTexture.needsUpdate = true
    return configuredTexture
  }, [sourceBannerTexture, gl])

  useEffect(() => () => bannerTexture.dispose(), [bannerTexture])

  const handleClick = useCallback((event) => {
    event.stopPropagation()
    const linkIndex = (event.uv?.x ?? 0) < 0.5 ? 0 : 1
    const href = aerialSocialLinks[linkIndex]?.link
    if (href) window.open(href, '_blank', 'noopener,noreferrer')
  }, [])

  useFrame((state) => {
    const mesh = meshRef.current
    const geometry = geometryRef.current
    if (!mesh || !geometry) return

    if (!basePositionsRef.current) {
      geometry.attributes.position.setUsage(THREE.DynamicDrawUsage)
      basePositionsRef.current = Float32Array.from(geometry.attributes.position.array)
    }

    const factor = getPixelFactorAtObjectDepth(
      state,
      mesh,
      depthScratchRef.current,
    )
    const worldPosition = depthScratchRef.current.worldPosition
    const bannerWidth = getBannerWidthPixels(state.size.width, shortness)
    mesh.scale.set(bannerWidth / factor, bannerWidth / 4 / factor, 1)

    const isNearViewport =
      Math.abs(worldPosition.x - state.camera.position.x) <=
      state.size.width / factor / 2 + bannerWidth / factor
    if (!isNearViewport) return

    if (reducedMotion && staticPoseReadyRef.current) return
    if (!reducedMotion) staticPoseReadyRef.current = false

    const time = reducedMotion ? 0.7 : state.clock.elapsedTime
    const positions = geometry.attributes.position
    const basePositions = basePositionsRef.current
    const responsiveAmplitude = THREE.MathUtils.lerp(
      0.14,
      0.185,
      getWideLayoutBlend(state.size.width),
    )
    const amplitude = THREE.MathUtils.lerp(responsiveAmplitude, 0.16, shortness)

    for (let index = 0; index < positions.count; index += 1) {
      const offset = index * 3
      const baseX = basePositions[offset]
      const baseY = basePositions[offset + 1]
      const u = baseX + 0.5
      const distanceFromTow = 1 - u
      const freeEdge = Math.pow(distanceFromTow, 1.28)
      const primaryWave = Math.sin(distanceFromTow * 8.4 - time * 4.15 + baseY * 1.8)
      const fineFlutter = Math.sin(distanceFromTow * 17.5 - time * 8.8 - baseY * 3.4)
      const verticalRipple = Math.sin(distanceFromTow * 11.2 - time * 5.4 + baseY * 5.1)

      positions.setXYZ(
        index,
        baseX - freeEdge * 0.022 * primaryWave,
        baseY - freeEdge * freeEdge * 0.062 + freeEdge * 0.034 * verticalRipple,
        freeEdge * (amplitude * primaryWave + amplitude * 0.3 * fineFlutter),
      )
    }

    positions.needsUpdate = true
    geometry.computeVertexNormals()
    staticPoseReadyRef.current = reducedMotion
  })

  return (
    <mesh
      ref={meshRef}
      castShadow
      onClick={handleClick}
    >
      <planeGeometry ref={geometryRef} args={[1, 1, CLOTH_SEGMENTS_X, CLOTH_SEGMENTS_Y]} />
      <meshPhysicalMaterial
        map={bannerTexture}
        side={THREE.DoubleSide}
        roughness={0.78}
        metalness={0}
        sheen={0.55}
        sheenRoughness={0.86}
        sheenColor="#d9ecff"
        envMapIntensity={0.72}
      />
    </mesh>
  )
}

const writeRopeCurve = (line, start, control, end, positions) => {
  if (!line?.geometry) return

  for (let index = 0; index < TOW_ROPE_POINT_COUNT; index += 1) {
    const t = index / (TOW_ROPE_POINT_COUNT - 1)
    const inverseT = 1 - t
    const offset = index * 3
    positions[offset] =
      inverseT * inverseT * start.x +
      2 * inverseT * t * control.x +
      t * t * end.x
    positions[offset + 1] =
      inverseT * inverseT * start.y +
      2 * inverseT * t * control.y +
      t * t * end.y
    positions[offset + 2] =
      inverseT * inverseT * start.z +
      2 * inverseT * t * control.z +
      t * t * end.z
  }

  const segmentBuffer = line.geometry.getAttribute('instanceStart')?.data
  const expectedLength = (TOW_ROPE_POINT_COUNT - 1) * 6

  if (!segmentBuffer || segmentBuffer.array.length !== expectedLength) {
    line.geometry.setPositions(positions)
    return
  }

  if (segmentBuffer.usage !== THREE.DynamicDrawUsage) {
    segmentBuffer.setUsage(THREE.DynamicDrawUsage)
  }

  for (let index = 0; index < TOW_ROPE_POINT_COUNT - 1; index += 1) {
    const sourceOffset = index * 3
    const targetOffset = index * 6
    segmentBuffer.array[targetOffset] = positions[sourceOffset]
    segmentBuffer.array[targetOffset + 1] = positions[sourceOffset + 1]
    segmentBuffer.array[targetOffset + 2] = positions[sourceOffset + 2]
    segmentBuffer.array[targetOffset + 3] = positions[sourceOffset + 3]
    segmentBuffer.array[targetOffset + 4] = positions[sourceOffset + 4]
    segmentBuffer.array[targetOffset + 5] = positions[sourceOffset + 5]
  }

  segmentBuffer.needsUpdate = true
}

const TowRopes = ({ rigRef, towHookRef, shortness, reducedMotion }) => {
  const topRopeRef = useRef()
  const bottomRopeRef = useRef()
  const depthScratchRef = useRef(createDepthScratch())
  const ropeScratchRef = useRef({
    hookWorld: new THREE.Vector3(),
    hookLocal: new THREE.Vector3(),
    topStart: new THREE.Vector3(),
    bottomStart: new THREE.Vector3(),
    topControl: new THREE.Vector3(),
    bottomControl: new THREE.Vector3(),
    topPositions: new Float32Array(TOW_ROPE_POINT_COUNT * 3),
    bottomPositions: new Float32Array(TOW_ROPE_POINT_COUNT * 3),
  })
  const initialPoints = useMemo(
    () => Array.from({ length: TOW_ROPE_POINT_COUNT }, () => [0, 0, 0]),
    [],
  )

  useFrame((state) => {
    const rig = rigRef.current
    const towHook = towHookRef.current
    if (!rig || !towHook || !topRopeRef.current || !bottomRopeRef.current) return

    const factor = getPixelFactorAtObjectDepth(
      state,
      rig,
      depthScratchRef.current,
    )
    const bannerWidth = getBannerWidthPixels(state.size.width, shortness) / factor
    const bannerHeight = bannerWidth / 4
    const scratch = ropeScratchRef.current

    towHook.getWorldPosition(scratch.hookWorld)
    scratch.hookLocal.copy(scratch.hookWorld)
    rig.worldToLocal(scratch.hookLocal)

    scratch.topStart.set(bannerWidth / 2, bannerHeight * 0.215, 0.025)
    scratch.bottomStart.set(bannerWidth / 2, -bannerHeight * 0.215, 0.025)

    const flutter = reducedMotion
      ? 0
      : Math.sin(state.clock.elapsedTime * 3.1) * 0.012

    scratch.topControl
      .lerpVectors(scratch.topStart, scratch.hookLocal, 0.54)
    scratch.topControl.y -= 0.022
    scratch.topControl.z += 0.025 + flutter
    scratch.bottomControl
      .lerpVectors(scratch.bottomStart, scratch.hookLocal, 0.54)
    scratch.bottomControl.y -= 0.032
    scratch.bottomControl.z += 0.025 - flutter * 0.75

    writeRopeCurve(
      topRopeRef.current,
      scratch.topStart,
      scratch.topControl,
      scratch.hookLocal,
      scratch.topPositions,
    )
    writeRopeCurve(
      bottomRopeRef.current,
      scratch.bottomStart,
      scratch.bottomControl,
      scratch.hookLocal,
      scratch.bottomPositions,
    )
  })

  return (
    <group>
      <Line
        ref={topRopeRef}
        points={initialPoints}
        color="#173b5d"
        lineWidth={1.35}
        transparent
        opacity={0.9}
        depthWrite={false}
        frustumCulled={false}
        renderOrder={4}
      />
      <Line
        ref={bottomRopeRef}
        points={initialPoints}
        color="#173b5d"
        lineWidth={1.35}
        transparent
        opacity={0.9}
        depthWrite={false}
        frustumCulled={false}
        renderOrder={4}
      />
    </group>
  )
}

const SocialFlightRig = ({
  layout,
  shortness,
  reducedMotion,
  onHoldChange,
  towHookRef,
}) => {
  const rigRef = useRef()
  const depthScratchRef = useRef(createDepthScratch())
  const hookWorldRef = useRef(new THREE.Vector3())
  const hookInParentRef = useRef(new THREE.Vector3())
  const screenWidth = useThree((state) => state.size.width)

  useFrame((state) => {
    const rig = rigRef.current
    const towHook = towHookRef.current
    if (!rig || !towHook || !rig.parent) return

    const factor = getPixelFactorAtObjectDepth(
      state,
      rig,
      depthScratchRef.current,
    )
    const bannerWidth = getBannerWidthPixels(state.size.width, shortness)
    const towGap = getTowGapPixels(state.size.width, shortness)
    towHook.getWorldPosition(hookWorldRef.current)
    hookInParentRef.current.copy(hookWorldRef.current)
    rig.parent.worldToLocal(hookInParentRef.current)

    rig.position.set(
      hookInParentRef.current.x - (bannerWidth / 2 + towGap) / factor,
      getBannerLift(state.size.width, shortness),
      0,
    )
  })

  return (
    <group ref={rigRef} position={[0, getBannerLift(screenWidth, shortness), 0]}>
      <TowRopes
        rigRef={rigRef}
        towHookRef={towHookRef}
        shortness={shortness}
        reducedMotion={reducedMotion}
      />
      <ClothSocialBanner shortness={shortness} reducedMotion={reducedMotion} />
      <SocialFlightHotspots
        layout={layout}
        shortness={shortness}
        onHoldChange={onHoldChange}
      />
    </group>
  )
}

export const Plane = ({
  isRotating,
  reducedMotion = false,
  layout = 'fluid',
  shortness = 0,
  position = [0, 0, 0],
  ...props
}) => {
  const flightRef = useRef()
  const planeRef = useRef()
  const towHookRef = useRef()
  const phaseRef = useRef(0.035)
  const heldRef = useRef(false)
  const depthScratchRef = useRef(createDepthScratch())
  const hookWorldRef = useRef(new THREE.Vector3())
  const hookInFlightRef = useRef(new THREE.Vector3())
  const { scene, animations } = useGLTF(planeScene)
  const planeModel = useMemo(() => {
    const model = scene.clone(true)
    const verticalFin = model.getObjectByName(VERTICAL_FIN_MESH_NAME)

    if (verticalFin?.isMesh && !Array.isArray(verticalFin.material)) {
      verticalFin.material = createAmericanaFinMaterial(verticalFin.material)
    }

    return model
  }, [scene])
  const stableAnimations = useMemo(
    () =>
      animations.map(
        (clip) =>
          new THREE.AnimationClip(
            clip.name,
            clip.duration,
            clip.tracks.filter(
              (track) => !/^polySurface172\.(position|quaternion)$/.test(track.name),
            ),
            clip.blendMode,
          ),
      ),
    [animations],
  )
  const { actions } = useAnimations(stableAnimations, planeRef)
  const [baseX, baseY, baseZ] = position
  const basePosition = useMemo(
    () => new THREE.Vector3(baseX, baseY, baseZ),
    [baseX, baseY, baseZ],
  )

  useEffect(
    () => () => {
      const verticalFin = planeModel.getObjectByName(VERTICAL_FIN_MESH_NAME)
      if (verticalFin?.material?.name === 'americana-vertical-fin') {
        verticalFin.material.dispose()
      }
    },
    [planeModel],
  )

  const handleHoldChange = useCallback((held) => {
    heldRef.current = held
  }, [])

  useEffect(() => {
    const flightAction = actions['Take 001']
    if (!flightAction || reducedMotion) {
      flightAction?.stop()
      return undefined
    }

    flightAction.reset().fadeIn(0.2).play()
    return () => {
      flightAction.fadeOut(0.15)
    }
  }, [actions, reducedMotion])

  useEffect(() => {
    actions['Take 001']?.setEffectiveTimeScale(isRotating ? 1.15 : 0.82)
  }, [actions, isRotating])

  useFrame((state, delta) => {
    const flight = flightRef.current
    if (!flight) return
    const wideBlend = getWideLayoutBlend(state.size.width)

    if (reducedMotion) {
      flight.position.set(
        basePosition.x + THREE.MathUtils.lerp(1.5, 1.65, wideBlend),
        basePosition.y,
        basePosition.z,
      )
      flight.rotation.set(0, 0, 0)
      return
    }

    const factor = getPixelFactorAtObjectDepth(
      state,
      flight,
      depthScratchRef.current,
    )
    const viewportWidth = state.size.width / factor
    const bannerWidthPixels = getBannerWidthPixels(state.size.width, shortness)
    const bannerWidth = bannerWidthPixels / factor
    let tailOffset = 0

    if (towHookRef.current) {
      towHookRef.current.getWorldPosition(hookWorldRef.current)
      hookInFlightRef.current.copy(hookWorldRef.current)
      flight.worldToLocal(hookInFlightRef.current)
      tailOffset = Math.max(0, -hookInFlightRef.current.x)
    }

    const bannerAnchorOffset =
      tailOffset +
      (bannerWidthPixels / 2 + getTowGapPixels(state.size.width, shortness)) / factor
    const responsiveClearance = THREE.MathUtils.lerp(2.4, 3.6, wideBlend)
    const planeClearance = THREE.MathUtils.lerp(
      responsiveClearance,
      3,
      shortness,
    )
    const startX = -viewportWidth / 2 - planeClearance
    const endX = viewportWidth / 2 + bannerAnchorOffset + bannerWidth / 2 + 1
    const travelDistancePixels = Math.max(
      (endX - startX) * factor,
      1,
    )

    if (!heldRef.current) {
      phaseRef.current =
        (phaseRef.current +
          (Math.min(delta, 0.05) * FLIGHT_SPEED_PIXELS_PER_SECOND) /
            travelDistancePixels) %
        1
    }

    const phase = phaseRef.current
    const responsiveWeavePixels = THREE.MathUtils.lerp(6, 10, wideBlend)
    const weavePixels = THREE.MathUtils.lerp(responsiveWeavePixels, 7, shortness)
    const weave = Math.sin(phase * Math.PI * 4) * (weavePixels / factor)
    const bank = Math.sin(phase * Math.PI * 4 + Math.PI / 2) * 0.028

    const nextX = basePosition.x + THREE.MathUtils.lerp(startX, endX, phase)
    flight.position.set(
      nextX,
      basePosition.y + weave,
      basePosition.z,
    )
    flight.rotation.set(0, 0, bank)
  })

  return (
    <group ref={flightRef} position={position}>
      <mesh {...props} ref={planeRef}>
        <primitive object={planeModel} />
        <group ref={towHookRef} position={TOW_HOOK_POSITION}>
          <mesh renderOrder={5}>
            <sphereGeometry args={[0.012, 10, 8]} />
            <meshStandardMaterial
              color="#173b5d"
              roughness={0.48}
              metalness={0.3}
            />
          </mesh>
        </group>
      </mesh>
      <SocialFlightRig
        layout={layout}
        shortness={shortness}
        reducedMotion={reducedMotion}
        onHoldChange={handleHoldChange}
        towHookRef={towHookRef}
      />
    </group>
  )
}
