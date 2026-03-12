import React from 'react'
import { COLORS } from '../utils/colors'

export default function Pig({ position, rotation = 0 }) {
  return (
    <group position={[position.x, 0, position.z]} rotation={[0, rotation, 0]}>
      {/* Body */}
      <mesh position={[0, 0.3, 0]} castShadow>
        <boxGeometry args={[0.7, 0.5, 1.0]} />
        <meshLambertMaterial color={COLORS.pigBody} />
      </mesh>
      {/* Head */}
      <mesh position={[0, 0.45, 0.55]} castShadow>
        <boxGeometry args={[0.5, 0.45, 0.45]} />
        <meshLambertMaterial color={COLORS.pigBody} />
      </mesh>
      {/* Snout */}
      <mesh position={[0, 0.38, 0.79]}>
        <boxGeometry args={[0.28, 0.18, 0.12]} />
        <meshLambertMaterial color={COLORS.pigDark} />
      </mesh>
      {/* Eyes */}
      <mesh position={[-0.12, 0.52, 0.77]}>
        <boxGeometry args={[0.06, 0.06, 0.02]} />
        <meshBasicMaterial color="#222222" />
      </mesh>
      <mesh position={[0.12, 0.52, 0.77]}>
        <boxGeometry args={[0.06, 0.06, 0.02]} />
        <meshBasicMaterial color="#222222" />
      </mesh>
      {/* Ears */}
      <mesh position={[-0.18, 0.72, 0.55]}>
        <boxGeometry args={[0.12, 0.18, 0.08]} />
        <meshLambertMaterial color={COLORS.pigBody} />
      </mesh>
      <mesh position={[0.18, 0.72, 0.55]}>
        <boxGeometry args={[0.12, 0.18, 0.08]} />
        <meshLambertMaterial color={COLORS.pigBody} />
      </mesh>
      {/* Legs */}
      {[[-0.22, -0.3], [0.22, -0.3], [-0.22, 0.3], [0.22, 0.3]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.05, z]} castShadow>
          <boxGeometry args={[0.15, 0.3, 0.15]} />
          <meshLambertMaterial color={COLORS.pigDark} />
        </mesh>
      ))}
      {/* Tail */}
      <mesh position={[0, 0.35, -0.52]} rotation={[0.3, 0, 0]}>
        <boxGeometry args={[0.08, 0.08, 0.15]} />
        <meshLambertMaterial color={COLORS.pigDark} />
      </mesh>
    </group>
  )
}
