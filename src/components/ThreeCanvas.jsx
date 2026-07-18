import { Component, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { isWebGL2Available } from '@react-three/drei'

const ThreeSceneFallback = ({
  className = '',
  loadError = false,
  fallbackIcon = '🏝️',
  fallbackTitle = '3D preview unavailable',
}) => (
  <div
    className={`flex h-full min-h-[280px] w-full items-center justify-center px-6 text-center ${className}`}
    role="status"
  >
    <div className="max-w-sm rounded-3xl border border-blue-100 bg-white/85 p-6 shadow-xl backdrop-blur">
      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-2xl">
        {fallbackIcon}
      </div>
      <p className="font-semibold text-blue-950">{fallbackTitle}</p>
      <p className="mt-2 text-sm leading-6 text-blue-900/65">
        {loadError
          ? 'The scene could not finish loading. Reload to try the local 3D assets again.'
          : 'This browser could not start WebGL 2. Enable hardware acceleration, then reload the page.'}
      </p>
      <button
        type="button"
        className="mt-4 min-h-11 rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-200"
        onClick={() => window.location.reload()}
      >
        Reload 3D scene
      </button>
    </div>
  </div>
)

class SceneErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error) {
    console.error('The 3D scene could not render.', error)
    this.props.onUnavailable?.()
  }

  render() {
    if (this.state.hasError) {
      return (
        <ThreeSceneFallback
          className={this.props.className}
          fallbackIcon={this.props.fallbackIcon}
          fallbackTitle={this.props.fallbackTitle}
          loadError
        />
      )
    }

    return this.props.children
  }
}

export const ThreeCanvas = ({
  className = '',
  children,
  fallbackIcon,
  fallbackTitle,
  onAvailabilityChange,
  ...canvasProps
}) => {
  const [supportsWebGL2] = useState(() =>
    typeof window !== 'undefined' && typeof document !== 'undefined'
      ? isWebGL2Available()
      : false,
  )

  useEffect(() => {
    onAvailabilityChange?.(supportsWebGL2)
  }, [onAvailabilityChange, supportsWebGL2])

  if (!supportsWebGL2) {
    return (
      <ThreeSceneFallback
        className={className}
        fallbackIcon={fallbackIcon}
        fallbackTitle={fallbackTitle}
      />
    )
  }

  return (
    <SceneErrorBoundary
      className={className}
      fallbackIcon={fallbackIcon}
      fallbackTitle={fallbackTitle}
      onUnavailable={() => onAvailabilityChange?.(false)}
    >
      <Canvas className={className} {...canvasProps}>
        {children}
      </Canvas>
    </SceneErrorBoundary>
  )
}

export default ThreeCanvas
