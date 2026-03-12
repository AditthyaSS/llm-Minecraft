import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { COLORS } from '../utils/colors'

function SmokeParticles({ position }) {
  const particles = useRef([])
  const groupRef = useRef()
  const count = 8

  const meshes = useMemo(() => {
    return Array.from({ length: count }, (_, i) => ({
      offset: i * 0.5,
      speed: 0.3 + Math.random() * 0.2,
      drift: (Math.random() - 0.5) * 0.3,
    }))
  }, [])

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (!groupRef.current) return
    groupRef.current.children.forEach((mesh, i) => {
      const p = meshes[i]
      const cycle = ((t * p.speed + p.offset) % 2)
      mesh.position.y = cycle * 1.2
      mesh.position.x = Math.sin(t + i) * p.drift
      mesh.material.opacity = Math.max(0, 0.4 - cycle * 0.2)
      mesh.scale.setScalar(0.08 + cycle * 0.05)
    })
  })

  return (
    <group ref={groupRef} position={position}>
      {meshes.map((_, i) => (
        <mesh key={i}>
          <sphereGeometry args={[1, 6, 6]} />
          <meshBasicMaterial color="#aaaaaa" transparent opacity={0.3} depthWrite={false} />
        </mesh>
      ))}
    </group>
  )
}

export default function Building({ project, position, onClick }) {
  const glowRef = useRef()

  useFrame(({ clock }) => {
    if (glowRef.current && project.isRunning) {
      glowRef.current.material.opacity = 0.25 + Math.sin(clock.getElapsedTime() * 2) * 0.15
    }
  })

  return (
    <group position={position} onClick={(e) => { e.stopPropagation(); onClick?.() }}>
      {/* === GRASS BASE BLOCK === */}
      <mesh position={[0, 0.25, 0]} receiveShadow>
        <boxGeometry args={[4.5, 0.5, 4.5]} />
        <meshLambertMaterial color={COLORS.grassTop} />
      </mesh>
      <mesh position={[0, 0, 0]} receiveShadow>
        <boxGeometry args={[4.5, 0.4, 4.5]} />
        <meshLambertMaterial color={COLORS.grassSide} />
      </mesh>

      {/* === BUILDING WALLS === */}
      {/* Ground floor */}
      <mesh position={[0, 1.25, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.8, 2, 3.8]} />
        <meshLambertMaterial color={COLORS.wallBase} />
      </mesh>
      {/* Second floor */}
      <mesh position={[0, 2.8, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.5, 1.2, 3.5]} />
        <meshLambertMaterial color={COLORS.wallUpper} />
      </mesh>

      {/* === ROOF === */}
      <mesh position={[0, 3.8, 0]} castShadow>
        <boxGeometry args={[4.2, 0.25, 4.2]} />
        <meshLambertMaterial color={COLORS.roofBase} />
      </mesh>
      <mesh position={[0, 4.15, 0]} castShadow>
        <boxGeometry args={[3.6, 0.6, 3.6]} />
        <meshLambertMaterial color={COLORS.roofMid} />
      </mesh>
      <mesh position={[0, 4.55, 0]} castShadow>
        <boxGeometry args={[2.8, 0.4, 2.8]} />
        <meshLambertMaterial color={COLORS.roofTop} />
      </mesh>

      {/* === CHIMNEY === */}
      <mesh position={[1.2, 5.0, 0.8]} castShadow>
        <boxGeometry args={[0.5, 1.2, 0.5]} />
        <meshLambertMaterial color={COLORS.chimney} />
      </mesh>

      {/* === WINDOWS — Ground floor (front face) === */}
      {/* Left window */}
      <mesh position={[-1.0, 1.3, 1.92]}>
        <boxGeometry args={[0.8, 0.7, 0.05]} />
        <meshLambertMaterial
          color={project.isRunning ? COLORS.windowOn : COLORS.windowOff}
          emissive={project.isRunning ? COLORS.windowEmissiveOn : COLORS.windowEmissiveOff}
          emissiveIntensity={project.isRunning ? 0.8 : 0.2}
        />
      </mesh>
      {/* Right window */}
      <mesh position={[1.0, 1.3, 1.92]}>
        <boxGeometry args={[0.8, 0.7, 0.05]} />
        <meshLambertMaterial
          color={project.isRunning ? COLORS.windowOn : COLORS.windowOff}
          emissive={project.isRunning ? COLORS.windowEmissiveOn : COLORS.windowEmissiveOff}
          emissiveIntensity={project.isRunning ? 0.8 : 0.2}
        />
      </mesh>

      {/* === DOOR === */}
      <mesh position={[0, 0.7, 1.92]}>
        <boxGeometry args={[0.9, 1.3, 0.05]} />
        <meshLambertMaterial color={COLORS.door} />
      </mesh>
      <mesh position={[0, 0.7, 1.93]}>
        <boxGeometry args={[1.05, 1.45, 0.02]} />
        <meshLambertMaterial color={COLORS.doorFrame} />
      </mesh>

      {/* === SECOND FLOOR WINDOWS === */}
      <mesh position={[-0.8, 2.8, 1.76]}>
        <boxGeometry args={[0.6, 0.5, 0.05]} />
        <meshLambertMaterial color={COLORS.windowOff} emissive={COLORS.windowEmissiveOff} emissiveIntensity={0.3} />
      </mesh>
      <mesh position={[0.8, 2.8, 1.76]}>
        <boxGeometry args={[0.6, 0.5, 0.05]} />
        <meshLambertMaterial color={COLORS.windowOff} emissive={COLORS.windowEmissiveOff} emissiveIntensity={0.3} />
      </mesh>

      {/* === BACK WINDOWS === */}
      <mesh position={[-1.0, 1.3, -1.92]}>
        <boxGeometry args={[0.8, 0.7, 0.05]} />
        <meshLambertMaterial color={COLORS.windowOff} emissive={COLORS.windowEmissiveOff} emissiveIntensity={0.2} />
      </mesh>
      <mesh position={[1.0, 1.3, -1.92]}>
        <boxGeometry args={[0.8, 0.7, 0.05]} />
        <meshLambertMaterial color={COLORS.windowOff} emissive={COLORS.windowEmissiveOff} emissiveIntensity={0.2} />
      </mesh>

      {/* === SIDE WINDOWS === */}
      <mesh position={[1.92, 1.3, -0.5]}>
        <boxGeometry args={[0.05, 0.7, 0.8]} />
        <meshLambertMaterial color={COLORS.windowOff} emissive={COLORS.windowEmissiveOff} emissiveIntensity={0.2} />
      </mesh>
      <mesh position={[-1.92, 1.3, -0.5]}>
        <boxGeometry args={[0.05, 0.7, 0.8]} />
        <meshLambertMaterial color={COLORS.windowOff} emissive={COLORS.windowEmissiveOff} emissiveIntensity={0.2} />
      </mesh>

      {/* === WINDOW SHUTTERS (front) === */}
      <mesh position={[-1.45, 1.3, 1.92]}>
        <boxGeometry args={[0.15, 0.7, 0.04]} />
        <meshLambertMaterial color={COLORS.shutter} />
      </mesh>
      <mesh position={[-0.55, 1.3, 1.92]}>
        <boxGeometry args={[0.15, 0.7, 0.04]} />
        <meshLambertMaterial color={COLORS.shutter} />
      </mesh>
      <mesh position={[0.55, 1.3, 1.92]}>
        <boxGeometry args={[0.15, 0.7, 0.04]} />
        <meshLambertMaterial color={COLORS.shutter} />
      </mesh>
      <mesh position={[1.45, 1.3, 1.92]}>
        <boxGeometry args={[0.15, 0.7, 0.04]} />
        <meshLambertMaterial color={COLORS.shutter} />
      </mesh>

      {/* === SMOKE PARTICLES (when running) === */}
      {project.isRunning && <SmokeParticles position={[1.2, 5.8, 0.8]} />}

      {/* === ACTIVE GLOW RING (when running) === */}
      {project.isRunning && (
        <mesh ref={glowRef} position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[2.6, 3.0, 32]} />
          <meshBasicMaterial color={COLORS.purple} transparent opacity={0.4} />
        </mesh>
      )}
    </group>
  )
}
