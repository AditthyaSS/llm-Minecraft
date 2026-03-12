import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'

// Color themes for different robot characters
const ROBOT_COLORS = {
  default: { body: '#e2e8f0', head: '#e2e8f0', accent: '#d0d0d8', eyes: '#555' },
  gold:    { body: '#f0c040', head: '#f0c040', accent: '#d4a830', eyes: '#333' },
  blue:    { body: '#4a9fff', head: '#4a9fff', accent: '#3880dd', eyes: '#111' },
  green:   { body: '#4ade80', head: '#4ade80', accent: '#38c070', eyes: '#111' },
  pink:    { body: '#f472b6', head: '#f472b6', accent: '#e060a0', eyes: '#222' },
  purple:  { body: '#a78bfa', head: '#a78bfa', accent: '#8b6fe8', eyes: '#111' },
}

const AGENT_COLOR_MAP = {
  'Researcher': 'blue',
  'Lead': 'gold',
  'Worker': 'green',
  'Critic': 'pink',
  'Writer': 'purple',
}

export default function RobotCharacter({ position = [0, 0, 0], status = 'idle', agentName = '' }) {
  const groupRef = useRef()
  const armLeftRef = useRef()
  const armRightRef = useRef()

  const colorKey = AGENT_COLOR_MAP[agentName] || 'default'
  const colors = ROBOT_COLORS[colorKey]

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (groupRef.current && status === 'thinking') {
      groupRef.current.position.y = position[1] + Math.sin(t * 4) * 0.06
    }
    // Arm swing when thinking
    if (armLeftRef.current && status === 'thinking') {
      armLeftRef.current.rotation.x = Math.sin(t * 3) * 0.4
    }
    if (armRightRef.current && status === 'thinking') {
      armRightRef.current.rotation.x = Math.sin(t * 3 + Math.PI) * 0.4
    }
  })

  const eyeColor = status === 'thinking' ? '#3498db'
    : status === 'done' ? '#2ecc71'
    : status === 'error' ? '#e74c3c'
    : colors.eyes

  return (
    <group ref={groupRef} position={position}>
      {/* ── BODY ── */}
      <mesh position={[0, 0.35, 0]} castShadow>
        <boxGeometry args={[0.35, 0.45, 0.25]} />
        <meshLambertMaterial color={colors.body} />
      </mesh>
      {/* Body detail stripe */}
      <mesh position={[0, 0.35, 0.13]}>
        <boxGeometry args={[0.25, 0.1, 0.01]} />
        <meshLambertMaterial color={colors.accent} />
      </mesh>
      {/* Chest screen */}
      <mesh position={[0, 0.4, 0.13]}>
        <boxGeometry args={[0.15, 0.1, 0.01]} />
        <meshBasicMaterial color={status === 'thinking' ? '#3498db' : status === 'done' ? '#2ecc71' : '#333'} />
      </mesh>

      {/* ── HEAD ── */}
      <mesh position={[0, 0.76, 0]} castShadow>
        <boxGeometry args={[0.3, 0.28, 0.26]} />
        <meshLambertMaterial color={colors.head} />
      </mesh>
      {/* Visor / face plate */}
      <mesh position={[0, 0.74, 0.14]}>
        <boxGeometry args={[0.24, 0.14, 0.01]} />
        <meshLambertMaterial color="#1a1a2e" />
      </mesh>

      {/* ── ANTENNA ── */}
      <mesh position={[0, 0.96, 0]}>
        <boxGeometry args={[0.03, 0.12, 0.03]} />
        <meshLambertMaterial color={colors.accent} />
      </mesh>
      <mesh position={[0, 1.04, 0]}>
        <sphereGeometry args={[0.05, 8, 8]} />
        <meshBasicMaterial color={status === 'thinking' ? '#3498db' : status === 'done' ? '#2ecc71' : '#888'} />
      </mesh>

      {/* ── EYES ── */}
      <mesh position={[-0.07, 0.76, 0.14]}>
        <boxGeometry args={[0.07, 0.06, 0.02]} />
        <meshBasicMaterial color={eyeColor} />
      </mesh>
      <mesh position={[0.07, 0.76, 0.14]}>
        <boxGeometry args={[0.07, 0.06, 0.02]} />
        <meshBasicMaterial color={eyeColor} />
      </mesh>

      {/* ── MOUTH ── */}
      <mesh position={[0, 0.68, 0.14]}>
        <boxGeometry args={[0.1, 0.02, 0.01]} />
        <meshBasicMaterial color={colors.accent} />
      </mesh>

      {/* ── ARMS ── */}
      <group ref={armLeftRef} position={[-0.25, 0.4, 0]}>
        <mesh position={[0, -0.1, 0]} rotation={[0, 0, 0.25]}>
          <boxGeometry args={[0.1, 0.32, 0.1]} />
          <meshLambertMaterial color={colors.accent} />
        </mesh>
        {/* Hand */}
        <mesh position={[-0.06, -0.26, 0]}>
          <boxGeometry args={[0.08, 0.08, 0.08]} />
          <meshLambertMaterial color={colors.body} />
        </mesh>
      </group>
      <group ref={armRightRef} position={[0.25, 0.4, 0]}>
        <mesh position={[0, -0.1, 0]} rotation={[0, 0, -0.25]}>
          <boxGeometry args={[0.1, 0.32, 0.1]} />
          <meshLambertMaterial color={colors.accent} />
        </mesh>
        <mesh position={[0.06, -0.26, 0]}>
          <boxGeometry args={[0.08, 0.08, 0.08]} />
          <meshLambertMaterial color={colors.body} />
        </mesh>
      </group>

      {/* ── LEGS ── */}
      <mesh position={[-0.1, 0.08, 0]}>
        <boxGeometry args={[0.12, 0.22, 0.12]} />
        <meshLambertMaterial color={colors.accent} />
      </mesh>
      <mesh position={[0.1, 0.08, 0]}>
        <boxGeometry args={[0.12, 0.22, 0.12]} />
        <meshLambertMaterial color={colors.accent} />
      </mesh>
      {/* Feet */}
      <mesh position={[-0.1, -0.02, 0.03]}>
        <boxGeometry args={[0.14, 0.04, 0.18]} />
        <meshLambertMaterial color={colors.body} />
      </mesh>
      <mesh position={[0.1, -0.02, 0.03]}>
        <boxGeometry args={[0.14, 0.04, 0.18]} />
        <meshLambertMaterial color={colors.body} />
      </mesh>
    </group>
  )
}
