import React, { useRef, useEffect } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import scene from "../assets/3d/fox.glb";

export function Fox({ currentAnimation, ...props }) {
  const group = useRef();
  const prevAction = useRef(null);
  const { nodes, materials, animations } = useGLTF(scene);
  const { actions } = useAnimations(animations, group);

  // enable shadows + environment response on the model meshes
  useEffect(() => {
    if (!group.current) return;
    group.current.traverse((o) => {
      if (o.isMesh || o.isSkinnedMesh) {
        o.castShadow = true;
        o.receiveShadow = true;
        o.frustumCulled = false;
        if (o.material) {
          o.material.envMapIntensity = 0.55;
          o.material.needsUpdate = true;
        }
      }
    });
  }, []);

  // smooth crossfade between idle / walk / hit instead of a hard cut
  useEffect(() => {
    if (!actions) return undefined;
    const next =
      currentAnimation && actions[currentAnimation] ? actions[currentAnimation] : null;
    if (!next) return undefined;

    next.reset().fadeIn(0.35).play();
    if (prevAction.current && prevAction.current !== next) {
      prevAction.current.fadeOut(0.35);
    }
    prevAction.current = next;

    return () => {
      next.fadeOut(0.35);
    };
  }, [currentAnimation, actions]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <primitive object={nodes.GLTF_created_0_rootJoint} />
        <skinnedMesh
          name="Object_7"
          geometry={nodes.Object_7.geometry}
          material={materials.PaletteMaterial001}
          skeleton={nodes.Object_7.skeleton}
        />
        <skinnedMesh
          name="Object_8"
          geometry={nodes.Object_8.geometry}
          material={materials.PaletteMaterial001}
          skeleton={nodes.Object_8.skeleton}
        />
        <skinnedMesh
          name="Object_9"
          geometry={nodes.Object_9.geometry}
          material={materials.PaletteMaterial001}
          skeleton={nodes.Object_9.skeleton}
        />
        <skinnedMesh
          name="Object_10"
          geometry={nodes.Object_10.geometry}
          material={materials.PaletteMaterial001}
          skeleton={nodes.Object_10.skeleton}
        />
        <skinnedMesh
          name="Object_11"
          geometry={nodes.Object_11.geometry}
          material={materials.PaletteMaterial001}
          skeleton={nodes.Object_11.skeleton}
        />
      </group>
    </group>
  );
}

export default Fox;
