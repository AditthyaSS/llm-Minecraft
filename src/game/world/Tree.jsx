import React from 'react'
import { COLORS } from '../utils/colors'

export default function Tree({ position = [0, 0, 0], scale = 1 }) {
  return (
    <group position={position} scale={scale}>
      {/* Trunk */}
      <mesh position={[0, 0.7, 0]} castShadow>
        <boxGeometry args={[0.3, 1.4, 0.3]} />
        <meshLambertMaterial color={COLORS.treeTrunk} />
      </mesh>

      {/* Foliage layers (bottom to top, smaller each time) */}
      {/* Bottom layer */}
      <mesh position={[0, 1.6, 0]} castShadow>
        <coneGeometry args={[1.2, 1.2, 6]} />
        <meshLambertMaterial color={COLORS.treeLeaves1} />
      </mesh>

      {/* Middle layer */}
      <mesh position={[0, 2.4, 0]} castShadow>
        <coneGeometry args={[0.95, 1.1, 6]} />
        <meshLambertMaterial color={COLORS.treeLeaves2} />
      </mesh>

      {/* Top layer */}
      <mesh position={[0, 3.1, 0]} castShadow>
        <coneGeometry args={[0.65, 0.9, 6]} />
        <meshLambertMaterial color={COLORS.treeLeaves3} />
      </mesh>
    </group>
  )
}
