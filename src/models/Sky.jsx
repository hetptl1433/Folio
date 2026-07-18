import { useGLTF } from '@react-three/drei'
import skyScene from '../assets/3d/sky.glb'
import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export const Sky = ({ isRotating, reducedMotion = false }) => {
  const { scene } = useGLTF(skyScene)
  const skyRef = useRef()

  useFrame((_, delta) => {
    if (isRotating && !reducedMotion)
    skyRef.current.rotation.y += 0.15 * delta
  })
  return (
    <mesh ref={skyRef}>
      <primitive object={scene} />
    </mesh>
  )
}
