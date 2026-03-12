import React from 'react'
import { COLORS } from '../utils/colors'

export default function Road({ positions = [] }) {
  return (
    <group>
      {positions.map(([x, z], i) => (
        <mesh key={i} position={[x * 2, -0.02, z * 2]} receiveShadow>
          <boxGeometry args={[2.0, 0.06, 2.0]} />
          <meshLambertMaterial color={COLORS.pathDark} />
        </mesh>
      ))}
    </group>
  )
}
