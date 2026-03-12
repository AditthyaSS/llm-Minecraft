import React from 'react'
import { COLORS } from '../utils/colors'

export default function Lighting() {
  return (
    <>
      {/* Warm sunlight from upper left */}
      <directionalLight
        position={[10, 20, 5]}
        intensity={1.4}
        color={COLORS.sunlight}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-left={-30}
        shadow-camera-right={30}
        shadow-camera-top={30}
        shadow-camera-bottom={-30}
        shadow-camera-near={0.5}
        shadow-camera-far={80}
        shadow-bias={-0.0005}
      />

      {/* Soft ambient fill */}
      <ambientLight intensity={0.5} color={COLORS.ambientFill} />

      {/* Ground bounce light */}
      <hemisphereLight
        args={[COLORS.sky, COLORS.groundBounce, 0.3]}
      />
    </>
  )
}
