import React from 'react'
import { COLORS } from '../utils/colors'

export default function Cat({ position, rotation = 0 }) {
  return (
    <group position={[position.x, 0, position.z]} rotation={[0, rotation, 0]}>
      {/* Body (slim) */}
      <mesh position={[0, 0.25, 0]} castShadow>
        <boxGeometry args={[0.4, 0.32, 0.9]} />
        <meshLambertMaterial color={COLORS.catBody} />
      </mesh>
      {/* Head */}
      <mesh position={[0, 0.38, 0.48]} castShadow>
        <boxGeometry args={[0.38, 0.35, 0.35]} />
        <meshLambertMaterial color={COLORS.catBody} />
      </mesh>
      {/* Face markings */}
      <mesh position={[0, 0.33, 0.66]}>
        <boxGeometry args={[0.2, 0.12, 0.02]} />
        <meshLambertMaterial color={COLORS.catDark} />
      </mesh>
      {/* Eyes */}
      <mesh position={[-0.08, 0.42, 0.66]}>
        <boxGeometry args={[0.06, 0.04, 0.02]} />
        <meshBasicMaterial color="#44ff44" />
      </mesh>
      <mesh position={[0.08, 0.42, 0.66]}>
        <boxGeometry args={[0.06, 0.04, 0.02]} />
        <meshBasicMaterial color="#44ff44" />
      </mesh>
      {/* Pointed ears */}
      <mesh position={[-0.12, 0.6, 0.45]} rotation={[0.2, 0, -0.2]}>
        <boxGeometry args={[0.08, 0.15, 0.06]} />
        <meshLambertMaterial color={COLORS.catBody} />
      </mesh>
      <mesh position={[0.12, 0.6, 0.45]} rotation={[0.2, 0, 0.2]}>
        <boxGeometry args={[0.08, 0.15, 0.06]} />
        <meshLambertMaterial color={COLORS.catBody} />
      </mesh>
      {/* Inner ears */}
      <mesh position={[-0.12, 0.6, 0.46]} rotation={[0.2, 0, -0.2]}>
        <boxGeometry args={[0.04, 0.1, 0.02]} />
        <meshLambertMaterial color={COLORS.pigDark} />
      </mesh>
      <mesh position={[0.12, 0.6, 0.46]} rotation={[0.2, 0, 0.2]}>
        <boxGeometry args={[0.04, 0.1, 0.02]} />
        <meshLambertMaterial color={COLORS.pigDark} />
      </mesh>
      {/* Legs */}
      {[[-0.12, -0.3], [0.12, -0.3], [-0.12, 0.25], [0.12, 0.25]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.05, z]} castShadow>
          <boxGeometry args={[0.1, 0.2, 0.1]} />
          <meshLambertMaterial color={COLORS.catDark} />
        </mesh>
      ))}
      {/* Tail (long, raised) */}
      <mesh position={[0, 0.4, -0.55]} rotation={[-0.8, 0, 0]}>
        <boxGeometry args={[0.08, 0.06, 0.5]} />
        <meshLambertMaterial color={COLORS.catBody} />
      </mesh>
      <mesh position={[0, 0.6, -0.7]} rotation={[-0.3, 0, 0]}>
        <boxGeometry args={[0.08, 0.06, 0.3]} />
        <meshLambertMaterial color={COLORS.catDark} />
      </mesh>
      {/* Stripe on back */}
      <mesh position={[0, 0.42, 0]}>
        <boxGeometry args={[0.12, 0.02, 0.7]} />
        <meshLambertMaterial color={COLORS.catStripe} />
      </mesh>
    </group>
  )
}
