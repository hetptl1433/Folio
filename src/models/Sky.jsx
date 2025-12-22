import React from 'react'
import { useGLTF } from '@react-three/drei'
import skyScene from '../assets/3d/sky.glb'

export const Sky = (props) => {
  const { scene } = useGLTF(skyScene)
  return (
    <mesh {...props}>
      <primitive object={scene} />
    </mesh>
  )
}

useGLTF.preload(skyScene)
