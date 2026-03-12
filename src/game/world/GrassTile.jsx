import React from 'react'
import { COLORS } from '../utils/colors'

export default function GrassTile({ position = [0, 0, 0], size = 4.5 }) {
  return (
    <group position={position}>
      {/* Top face — bright green */}
      <mesh position={[0, 0.25, 0]} receiveShadow>
        <boxGeometry args={[size, 0.5, size]} />
        <meshLambertMaterial color={COLORS.grassTop} />
      </mesh>
      {/* Side faces — darker green/brown */}
      <mesh position={[0, 0, 0]} receiveShadow>
        <boxGeometry args={[size, 0.4, size]} />
        <meshLambertMaterial color={COLORS.grassSide} />
      </mesh>
    </group>
  )
}
