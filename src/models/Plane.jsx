import React from 'react'
import { useGLTF } from '@react-three/drei'
import planeScene from '../assets/3d/plane.glb'

export const Plane = ({ isRotating, ...props }) => {
  const { scene } = useGLTF(planeScene)

  return (
    <mesh {...props}>
      <primitive object={scene} />
    </mesh>
  )
}

useGLTF.preload(planeScene)
