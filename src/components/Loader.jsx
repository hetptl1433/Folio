import { useEffect, useState } from 'react'
import { Html } from '@react-three/drei'

const LOAD_WARNING_DELAY_MS = 8000

export const Loader = () => {
  const [isTakingLong, setIsTakingLong] = useState(false)

  useEffect(() => {
    const timer = window.setTimeout(() => setIsTakingLong(true), LOAD_WARNING_DELAY_MS)
    return () => window.clearTimeout(timer)
  }, [])

  return (
    <Html center>
      {isTakingLong ? (
        <div
          className="pointer-events-auto w-72 rounded-3xl border border-blue-100 bg-white/90 p-5 text-center shadow-xl backdrop-blur"
          role="status"
          aria-live="polite"
        >
          <p className="font-semibold text-blue-950">The 3D scene is taking longer than expected.</p>
          <p className="mt-2 text-sm leading-6 text-blue-900/65">
            Check your connection, then reload to try the local assets again.
          </p>
          <button
            type="button"
            className="mt-4 rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200"
            onClick={() => window.location.reload()}
          >
            Reload 3D scene
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-center" role="status" aria-label="Loading 3D scene">
          <div className="h-20 w-20 animate-spin rounded-full border-2 border-blue-500/20 border-t-blue-500" />
        </div>
      )}
    </Html>
  )
}

export default Loader;
