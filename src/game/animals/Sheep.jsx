import React from 'react'
import { COLORS } from '../utils/colors'

export default function Sheep({ position, rotation = 0 }) {
  return (
    <group position={[position.x, 0, position.z]} rotation={[0, rotation, 0]}>
      {/* Body (fluffy, slightly larger) */}
      <mesh position={[0, 0.4, 0]} castShadow>
        <boxGeometry args={[0.8, 0.6, 1.1]} />
        <meshLambertMaterial color={COLORS.sheepBody} />
      </mesh>
      {/* Fluffy top layer */}
      <mesh position={[0, 0.55, 0]} castShadow>
        <boxGeometry args={[0.9, 0.3, 1.2]} />
        <meshLambertMaterial color={COLORS.sheepBody} />
      </mesh>
      {/* Head */}
      <mesh position={[0, 0.45, 0.6]} castShadow>
        <boxGeometry args={[0.4, 0.4, 0.35]} />
        <meshLambertMaterial color={COLORS.sheepFace} />
      </mesh>
      {/* Eyes */}
      <mesh position={[-0.1, 0.5, 0.78]}>
        <boxGeometry args={[0.06, 0.06, 0.02]} />
        <meshBasicMaterial color="#111111" />
      </mesh>
      <mesh position={[0.1, 0.5, 0.78]}>
        <boxGeometry args={[0.06, 0.06, 0.02]} />
        <meshBasicMaterial color="#111111" />
      </mesh>
      {/* Ears */}
      <mesh position={[-0.22, 0.55, 0.52]}>
        <boxGeometry args={[0.08, 0.1, 0.14]} />
        <meshLambertMaterial color={COLORS.sheepFace} />
      </mesh>
      <mesh position={[0.22, 0.55, 0.52]}>
        <boxGeometry args={[0.08, 0.1, 0.14]} />
        <meshLambertMaterial color={COLORS.sheepFace} />
      </mesh>
      {/* Legs (dark grey) */}
      {[[-0.25, -0.35], [0.25, -0.35], [-0.25, 0.35], [0.25, 0.35]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.06, z]} castShadow>
          <boxGeometry args={[0.12, 0.28, 0.12]} />
          <meshLambertMaterial color={COLORS.sheepLegs} />
        </mesh>
      ))}
    </group>
  )
}
