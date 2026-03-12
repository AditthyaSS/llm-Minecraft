import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { EffectComposer, Bloom } from '@react-three/postprocessing'
import Lighting from './Lighting'

export default function Engine({ children }) {
  return (
    <Canvas
      shadows
      camera={{ position: [28, 22, 28], fov: 45, near: 0.1, far: 1000 }}
      gl={{
        antialias: true,
        toneMappingExposure: 1.0,
      }}
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
    >
      <color attach="background" args={['#87ceeb']} />
      <fog attach="fog" args={['#87ceeb', 40, 80]} />
      <Suspense fallback={null}>
        <Lighting />
        {children}
        <EffectComposer>
          <Bloom luminanceThreshold={0.9} intensity={0.3} />
        </EffectComposer>
      </Suspense>
    </Canvas>
  )
}
