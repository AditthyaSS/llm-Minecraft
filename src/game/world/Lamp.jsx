import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

export default function Lamp({ position = [0, 0, 0] }) {
  const glowRef = useRef()

  useFrame(({ clock }) => {
    if (glowRef.current) {
      glowRef.current.material.opacity = 0.3 + Math.sin(clock.getElapsedTime() * 1.5) * 0.1
    }
  })

  return (
    <group position={position}>
      {/* Pole */}
      <mesh position={[0, 1.2, 0]} castShadow>
        <boxGeometry args={[0.12, 2.4, 0.12]} />
        <meshLambertMaterial color="#4a4a4a" />
      </mesh>

      {/* Arm */}
      <mesh position={[0.25, 2.3, 0]} castShadow>
        <boxGeometry args={[0.5, 0.08, 0.08]} />
        <meshLambertMaterial color="#4a4a4a" />
      </mesh>

      {/* Lamp housing */}
      <mesh position={[0.5, 2.2, 0]} castShadow>
        <boxGeometry args={[0.3, 0.25, 0.3]} />
        <meshLambertMaterial color="#3a3a3a" />
      </mesh>

      {/* Light bulb */}
      <mesh position={[0.5, 2.05, 0]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshBasicMaterial color="#ffcc44" />
      </mesh>

      {/* Glow sphere */}
      <mesh ref={glowRef} position={[0.5, 2.05, 0]}>
        <sphereGeometry args={[0.35, 8, 8]} />
        <meshBasicMaterial color="#ffcc44" transparent opacity={0.3} depthWrite={false} />
      </mesh>
    </group>
  )
}
