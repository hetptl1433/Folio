import { useGLTF } from '@react-three/drei'

const baseUrl = import.meta.env.BASE_URL.endsWith('/')
  ? import.meta.env.BASE_URL
  : `${import.meta.env.BASE_URL}/`

// Keep Draco-compressed models independent from a third-party CDN.
useGLTF.setDecoderPath(`${baseUrl}draco/`)
