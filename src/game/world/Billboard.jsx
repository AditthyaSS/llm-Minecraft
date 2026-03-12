import React from 'react'
import { Text } from '@react-three/drei'
import { COLORS } from '../utils/colors'

export default function Billboard({ name, agentCount = 0, position }) {
  return (
    <group position={position}>
      {/* === MAIN POLE === */}
      <mesh position={[0, 3, 0]} castShadow>
        <boxGeometry args={[0.18, 6, 0.18]} />
        <meshLambertMaterial color={COLORS.billboardPole} />
      </mesh>

      {/* === DIAGONAL SUPPORT STRUTS === */}
      <mesh position={[-0.8, 2.0, 0]} rotation={[0, 0, Math.PI / 5]} castShadow>
        <boxGeometry args={[0.12, 2.2, 0.12]} />
        <meshLambertMaterial color={COLORS.billboardPole} />
      </mesh>
      <mesh position={[0.8, 2.0, 0]} rotation={[0, 0, -Math.PI / 5]} castShadow>
        <boxGeometry args={[0.12, 2.2, 0.12]} />
        <meshLambertMaterial color={COLORS.billboardPole} />
      </mesh>

      {/* === BILLBOARD PANEL === */}
      <mesh position={[0, 5.5, 0]} castShadow>
        <boxGeometry args={[3.8, 1.8, 0.12]} />
        <meshLambertMaterial color={COLORS.billboardBack} />
      </mesh>
      <mesh position={[0, 5.5, 0.07]}>
        <boxGeometry args={[3.5, 1.5, 0.04]} />
        <meshLambertMaterial
          color={COLORS.billboardFront}
          emissive={COLORS.billboardGlow}
          emissiveIntensity={0.6}
        />
      </mesh>
      {/* Back face */}
      <mesh position={[0, 5.5, -0.07]}>
        <boxGeometry args={[3.5, 1.5, 0.04]} />
        <meshLambertMaterial
          color={COLORS.billboardFront}
          emissive={COLORS.billboardGlow}
          emissiveIntensity={0.4}
        />
      </mesh>

      {/* === BILLBOARD TEXT (front) === */}
      <Text
        position={[0, 5.65, 0.12]}
        fontSize={0.3}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        maxWidth={3.0}
      >
        {name.toUpperCase()}
      </Text>
      <Text
        position={[0, 5.2, 0.12]}
        fontSize={0.18}
        color={COLORS.purpleSoft}
        anchorX="center"
        anchorY="middle"
      >
        {agentCount} agents
      </Text>

      {/* === BILLBOARD TEXT (back) === */}
      <Text
        position={[0, 5.65, -0.12]}
        fontSize={0.3}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        maxWidth={3.0}
        rotation={[0, Math.PI, 0]}
      >
        {name.toUpperCase()}
      </Text>

      {/* Corner light accents */}
      <mesh position={[-1.7, 6.3, 0.08]}>
        <boxGeometry args={[0.12, 0.12, 0.08]} />
        <meshBasicMaterial color={COLORS.billboardGlow} />
      </mesh>
      <mesh position={[1.7, 6.3, 0.08]}>
        <boxGeometry args={[0.12, 0.12, 0.08]} />
        <meshBasicMaterial color={COLORS.billboardGlow} />
      </mesh>
      <mesh position={[-1.7, 4.7, 0.08]}>
        <boxGeometry args={[0.12, 0.12, 0.08]} />
        <meshBasicMaterial color={COLORS.billboardGlow} />
      </mesh>
      <mesh position={[1.7, 4.7, 0.08]}>
        <boxGeometry args={[0.12, 0.12, 0.08]} />
        <meshBasicMaterial color={COLORS.billboardGlow} />
      </mesh>
    </group>
  )
}
