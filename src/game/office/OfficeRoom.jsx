import React, { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import { COLORS } from '../utils/colors'

/* ──────── DIGITAL CLOCK ──────── */
function DigitalClock({ position }) {
  const groupRef = useRef()

  return (
    <group position={position}>
      {/* Screen housing */}
      <mesh castShadow>
        <boxGeometry args={[2.8, 0.9, 0.12]} />
        <meshLambertMaterial color="#1a1a2e" />
      </mesh>
      {/* Screen surface */}
      <mesh position={[0, 0, 0.07]}>
        <boxGeometry args={[2.5, 0.7, 0.02]} />
        <meshLambertMaterial color="#001100" emissive="#003300" emissiveIntensity={0.5} />
      </mesh>
      {/* Digital digits - "6|6|6|7" style */}
      <Text position={[0, 0, 0.1]} fontSize={0.35} color="#00ff44" anchorX="center" anchorY="middle">
        6 | 1 | 6 | 7
      </Text>
      {/* Frame border */}
      <mesh position={[0, 0, 0.01]}>
        <boxGeometry args={[2.9, 1.0, 0.05]} />
        <meshLambertMaterial color="#333333" />
      </mesh>
    </group>
  )
}

/* ──────── WALL METRICS SCREEN ──────── */
function MetricsScreen({ position, label = 'CUSTOMER REPORTS' }) {
  return (
    <group position={position}>
      {/* Monitor frame */}
      <mesh castShadow>
        <boxGeometry args={[2.4, 1.6, 0.1]} />
        <meshLambertMaterial color="#222222" />
      </mesh>
      {/* Screen */}
      <mesh position={[0, 0, 0.06]}>
        <boxGeometry args={[2.2, 1.4, 0.02]} />
        <meshLambertMaterial color="#0a0a1f" emissive="#0a1a3a" emissiveIntensity={0.5} />
      </mesh>
      {/* Title bar */}
      <mesh position={[0, 0.55, 0.08]}>
        <boxGeometry args={[2.0, 0.2, 0.01]} />
        <meshLambertMaterial color="#1a2a4a" emissive="#1a2a4a" emissiveIntensity={0.3} />
      </mesh>
      <Text position={[0, 0.55, 0.09]} fontSize={0.09} color="#8899bb" anchorX="center" anchorY="middle">
        {label}
      </Text>
      {/* Graph lines */}
      {[-0.1, 0.0, 0.1, 0.2].map((y, i) => (
        <mesh key={i} position={[-0.2 + i * 0.3, -0.05 + Math.sin(i * 1.5) * 0.15, 0.08]}>
          <boxGeometry args={[0.4, 0.03, 0.01]} />
          <meshBasicMaterial color={i % 2 === 0 ? '#2ecc71' : '#3498db'} />
        </mesh>
      ))}
      {/* Bar chart */}
      {[-0.6, -0.3, 0, 0.3, 0.6].map((x, i) => {
        const h = 0.15 + Math.abs(Math.sin(i * 1.2)) * 0.35
        return (
          <mesh key={`bar-${i}`} position={[x, -0.5 + h / 2, 0.08]}>
            <boxGeometry args={[0.18, h, 0.01]} />
            <meshBasicMaterial color={i === 3 ? '#e74c3c' : '#3498db'} transparent opacity={0.8} />
          </mesh>
        )
      })}
      {/* Number readout */}
      <Text position={[0.7, -0.55, 0.09]} fontSize={0.12} color="#2ecc71" anchorX="center" anchorY="middle">
        048.089
      </Text>
    </group>
  )
}

/* ──────── ANALOG CLOCK ──────── */
function WallClock({ position }) {
  const hourRef = useRef()
  const minuteRef = useRef()

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime()
    if (hourRef.current) hourRef.current.rotation.z = -t * 0.02
    if (minuteRef.current) minuteRef.current.rotation.z = -t * 0.2
  })

  return (
    <group position={position}>
      {/* Clock body */}
      <mesh rotation={[0, 0, 0]}>
        <cylinderGeometry args={[0.5, 0.5, 0.08, 24]} />
        <meshLambertMaterial color="#f5f5dc" />
      </mesh>
      {/* Frame ring */}
      <mesh>
        <torusGeometry args={[0.5, 0.04, 8, 24]} />
        <meshLambertMaterial color="#5a3a1a" />
      </mesh>
      {/* Hour markers */}
      {Array.from({ length: 12 }, (_, i) => {
        const angle = (i / 12) * Math.PI * 2
        return (
          <mesh key={i} position={[Math.sin(angle) * 0.38, Math.cos(angle) * 0.38, 0.05]}>
            <boxGeometry args={[0.03, 0.06, 0.02]} />
            <meshBasicMaterial color="#333" />
          </mesh>
        )
      })}
      {/* Hour hand */}
      <group ref={hourRef} position={[0, 0, 0.05]}>
        <mesh position={[0, 0.1, 0]}>
          <boxGeometry args={[0.03, 0.2, 0.015]} />
          <meshBasicMaterial color="#222" />
        </mesh>
      </group>
      {/* Minute hand */}
      <group ref={minuteRef} position={[0, 0, 0.06]}>
        <mesh position={[0, 0.15, 0]}>
          <boxGeometry args={[0.02, 0.3, 0.01]} />
          <meshBasicMaterial color="#444" />
        </mesh>
      </group>
      {/* Center dot */}
      <mesh position={[0, 0, 0.06]}>
        <sphereGeometry args={[0.025, 8, 8]} />
        <meshBasicMaterial color="#222" />
      </mesh>
    </group>
  )
}

/* ──────── FILING CABINET ──────── */
function FilingCabinet({ position, tall = false }) {
  const h = tall ? 2.4 : 1.6
  const drawers = tall ? 4 : 3
  return (
    <group position={position}>
      {/* Cabinet body */}
      <mesh position={[0, h / 2, 0]} castShadow>
        <boxGeometry args={[0.7, h, 0.55]} />
        <meshLambertMaterial color="#5a5a6a" />
      </mesh>
      {/* Top edge */}
      <mesh position={[0, h + 0.02, 0]}>
        <boxGeometry args={[0.72, 0.04, 0.57]} />
        <meshLambertMaterial color="#4a4a5a" />
      </mesh>
      {/* Drawer lines & handles */}
      {Array.from({ length: drawers }, (_, i) => {
        const y = 0.3 + i * (h / drawers)
        return (
          <React.Fragment key={i}>
            {/* Drawer separator line */}
            <mesh position={[0, y, 0.28]}>
              <boxGeometry args={[0.65, 0.02, 0.01]} />
              <meshLambertMaterial color="#3a3a4a" />
            </mesh>
            {/* Handle */}
            <mesh position={[0, y + (h / drawers) * 0.4, 0.29]}>
              <boxGeometry args={[0.2, 0.04, 0.04]} />
              <meshLambertMaterial color="#aaaaaa" />
            </mesh>
          </React.Fragment>
        )
      })}
    </group>
  )
}

/* ──────── BALLOON CLUSTER ──────── */
function BalloonCluster({ position, color = '#3498db' }) {
  return (
    <group position={position}>
      {/* Balloons */}
      {[
        [0, 0, 0],
        [0.2, 0.25, 0.1],
        [-0.15, 0.3, -0.1],
        [0.1, 0.5, 0.05],
      ].map((off, i) => (
        <group key={i} position={off}>
          <mesh>
            <sphereGeometry args={[0.18 - i * 0.02, 10, 10]} />
            <meshLambertMaterial color={color} />
          </mesh>
          {/* String */}
          <mesh position={[0, -0.3, 0]}>
            <boxGeometry args={[0.01, 0.4, 0.01]} />
            <meshLambertMaterial color="#888" />
          </mesh>
        </group>
      ))}
    </group>
  )
}

/* ──────── POTTED PLANT ──────── */
function Plant({ position, size = 1 }) {
  return (
    <group position={position} scale={size}>
      {/* Pot */}
      <mesh position={[0, 0.2, 0]} castShadow>
        <cylinderGeometry args={[0.18, 0.22, 0.4, 8]} />
        <meshLambertMaterial color="#8a5530" />
      </mesh>
      {/* Pot rim */}
      <mesh position={[0, 0.41, 0]}>
        <cylinderGeometry args={[0.22, 0.22, 0.04, 8]} />
        <meshLambertMaterial color="#7a4520" />
      </mesh>
      {/* Soil */}
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.17, 0.17, 0.04, 8]} />
        <meshLambertMaterial color="#3a2510" />
      </mesh>
      {/* Leaves */}
      {[
        [0, 0.8, 0, 0.22],
        [-0.12, 0.65, 0.1, 0.16],
        [0.1, 0.7, -0.08, 0.18],
        [0.08, 0.9, 0.06, 0.14],
      ].map(([x, y, z, r], i) => (
        <mesh key={i} position={[x, y, z]}>
          <sphereGeometry args={[r, 6, 6]} />
          <meshLambertMaterial color={i % 2 === 0 ? '#2d7a2d' : '#3d8b3d'} />
        </mesh>
      ))}
      {/* Stem */}
      <mesh position={[0, 0.55, 0]}>
        <boxGeometry args={[0.03, 0.3, 0.03]} />
        <meshLambertMaterial color="#3a5a1a" />
      </mesh>
    </group>
  )
}

/* ──────── STATUS DOME (big red/colored dome) ──────── */
function StatusDome({ position, color = '#e74c3c', active = false }) {
  const glowRef = useRef()
  useFrame(({ clock }) => {
    if (glowRef.current && active) {
      glowRef.current.material.emissiveIntensity = 0.5 + Math.sin(clock.getElapsedTime() * 3) * 0.3
    }
  })

  return (
    <group position={position}>
      {/* Base plate */}
      <mesh position={[0, 0, 0]} castShadow>
        <cylinderGeometry args={[0.22, 0.25, 0.06, 12]} />
        <meshLambertMaterial color="#2a2a3e" />
      </mesh>
      {/* Dome */}
      <mesh ref={glowRef} position={[0, 0.12, 0]}>
        <sphereGeometry args={[0.18, 12, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshLambertMaterial
          color={color}
          emissive={color}
          emissiveIntensity={active ? 0.6 : 0.1}
        />
      </mesh>
    </group>
  )
}

/* ──────── PURPLE PORTAL/CRYSTAL ──────── */
function PurpleCrystal({ position }) {
  const ref = useRef()
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.5
    }
  })

  return (
    <group position={position}>
      {/* Base */}
      <mesh>
        <cylinderGeometry args={[0.2, 0.25, 0.08, 8]} />
        <meshLambertMaterial color="#2a1a4a" />
      </mesh>
      {/* Floating crystal */}
      <mesh ref={ref} position={[0, 0.3, 0]}>
        <octahedronGeometry args={[0.15, 0]} />
        <meshLambertMaterial color="#9b59b6" emissive="#7c3aed" emissiveIntensity={0.8} transparent opacity={0.9} />
      </mesh>
      {/* Glow */}
      <mesh position={[0, 0.3, 0]}>
        <sphereGeometry args={[0.22, 8, 8]} />
        <meshBasicMaterial color="#7c3aed" transparent opacity={0.15} depthWrite={false} />
      </mesh>
    </group>
  )
}

/* ──────── SUN/STARBURST (decorative desk item) ──────── */
function Starburst({ position }) {
  const ref = useRef()
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.z = clock.getElapsedTime() * 0.3
  })

  return (
    <group position={position}>
      <group ref={ref}>
        {/* Center ball */}
        <mesh>
          <sphereGeometry args={[0.12, 8, 8]} />
          <meshLambertMaterial color="#e67e22" emissive="#e67e22" emissiveIntensity={0.4} />
        </mesh>
        {/* Spikes */}
        {Array.from({ length: 8 }, (_, i) => {
          const angle = (i / 8) * Math.PI * 2
          return (
            <mesh key={i} position={[Math.cos(angle) * 0.2, Math.sin(angle) * 0.2, 0]} rotation={[0, 0, angle]}>
              <boxGeometry args={[0.03, 0.12, 0.03]} />
              <meshLambertMaterial color="#f39c12" />
            </mesh>
          )
        })}
      </group>
    </group>
  )
}

/* ════════════════════════════════════════════ */
/* ══════════  OFFICE ROOM  ══════════════════ */
/* ════════════════════════════════════════════ */

export default function OfficeRoom() {
  return (
    <group>
      {/* ── Floor — green carpet ── */}
      <mesh position={[0, 0, 0]} receiveShadow>
        <boxGeometry args={[14, 0.1, 12]} />
        <meshLambertMaterial color={COLORS.carpet} />
      </mesh>

      {/* Carpet grid lines */}
      {[...Array(7)].map((_, i) => (
        <mesh key={`hline-${i}`} position={[0, 0.06, -5 + i * 2]} receiveShadow>
          <boxGeometry args={[14, 0.005, 0.025]} />
          <meshLambertMaterial color="#255020" />
        </mesh>
      ))}
      {[...Array(8)].map((_, i) => (
        <mesh key={`vline-${i}`} position={[-6 + i * 2, 0.06, 0]} receiveShadow>
          <boxGeometry args={[0.025, 0.005, 12]} />
          <meshLambertMaterial color="#255020" />
        </mesh>
      ))}

      {/* ── Back wall ── */}
      <mesh position={[0, 2.5, -6]} receiveShadow castShadow>
        <boxGeometry args={[14, 5, 0.15]} />
        <meshLambertMaterial color={COLORS.wallLight} />
      </mesh>
      {/* Wall baseboard */}
      <mesh position={[0, 0.12, -5.9]}>
        <boxGeometry args={[14, 0.25, 0.05]} />
        <meshLambertMaterial color="#c0b8a8" />
      </mesh>

      {/* ── Left wall ── */}
      <mesh position={[-7, 2.5, 0]}>
        <boxGeometry args={[0.15, 5, 12]} />
        <meshLambertMaterial color={COLORS.wallLightAlt} />
      </mesh>
      <mesh position={[-6.9, 0.12, 0]}>
        <boxGeometry args={[0.05, 0.25, 12]} />
        <meshLambertMaterial color="#c0b8a8" />
      </mesh>

      {/* ── Right wall ── */}
      <mesh position={[7, 2.5, 0]}>
        <boxGeometry args={[0.15, 5, 12]} />
        <meshLambertMaterial color={COLORS.wallLightAlt} />
      </mesh>
      <mesh position={[6.9, 0.12, 0]}>
        <boxGeometry args={[0.05, 0.25, 12]} />
        <meshLambertMaterial color="#c0b8a8" />
      </mesh>

      {/* ── Ceiling ── */}
      <mesh position={[0, 5, 0]}>
        <boxGeometry args={[14, 0.1, 12]} />
        <meshLambertMaterial color={COLORS.ceiling} />
      </mesh>

      {/* ── Ceiling lights (fluorescent panels) ── */}
      {[-4, 0, 4].map((x, i) => (
        <React.Fragment key={`clight-${i}`}>
          <mesh position={[x, 4.9, -1]}>
            <boxGeometry args={[1.5, 0.06, 0.4]} />
            <meshBasicMaterial color="#fffde6" />
          </mesh>
          <pointLight position={[x, 4.7, -1]} intensity={0.5} distance={8} color="#fff5e0" />
          <mesh position={[x, 4.9, 2]}>
            <boxGeometry args={[1.5, 0.06, 0.4]} />
            <meshBasicMaterial color="#fffde6" />
          </mesh>
          <pointLight position={[x, 4.7, 2]} intensity={0.4} distance={8} color="#fff5e0" />
        </React.Fragment>
      ))}

      {/* ════ WALL PROPS ════ */}

      {/* Digital clock (left wall) */}
      <group position={[-6.85, 3.5, -3]} rotation={[0, Math.PI / 2, 0]}>
        <DigitalClock position={[0, 0, 0]} />
      </group>

      {/* Metrics screen 1 (back wall center-left) */}
      <MetricsScreen position={[-2, 3.2, -5.88]} label="CUSTOMER REPORTS" />

      {/* Metrics screen 2 (back wall center-right) */}
      <MetricsScreen position={[2.5, 3.2, -5.88]} label="LIVE METRICS" />

      {/* Analog clock (back wall right) */}
      <group position={[5.5, 3.8, -5.88]} rotation={[Math.PI / 2, 0, 0]}>
        <WallClock position={[0, 0, 0]} />
      </group>

      {/* ════ FILING CABINETS (left wall) ════ */}
      <FilingCabinet position={[-6.3, 0, -4]} tall />
      <FilingCabinet position={[-6.3, 0, -2.5]} tall />
      <FilingCabinet position={[-6.3, 0, -1]} />
      <FilingCabinet position={[-6.3, 0, 0.5]} />

      {/* Filing cabinets (right wall) */}
      <FilingCabinet position={[6.3, 0, -4]} tall />
      <FilingCabinet position={[6.3, 0, -2.5]} tall />

      {/* ════ BALLOON CLUSTERS ════ */}
      <BalloonCluster position={[-6, 2.5, -4.5]} color="#3498db" />
      <BalloonCluster position={[-6, 2.8, 3]} color="#3498db" />
      <BalloonCluster position={[6, 2.5, -4.5]} color="#3498db" />
      <BalloonCluster position={[6, 2.8, 3]} color="#2ecc71" />

      {/* ════ PLANTS ════ */}
      <Plant position={[-6.3, 0, 4.5]} size={1.2} />
      <Plant position={[6.3, 0, 4.5]} size={1.0} />
      <Plant position={[-6.3, 0, 2]} size={0.8} />

      {/* ════ CENTER TABLE (decorative) ════ */}
      <group position={[0, 0, -2]}>
        {/* Big center desk / conference area */}
        <mesh position={[0, 0.5, 0]} castShadow>
          <boxGeometry args={[1.2, 0.06, 1.2]} />
          <meshLambertMaterial color="#ddd" />
        </mesh>
        <mesh position={[0, 0.25, 0]}>
          <cylinderGeometry args={[0.15, 0.25, 0.5, 8]} />
          <meshLambertMaterial color="#aaa" />
        </mesh>
        {/* Status dome on desk */}
        <StatusDome position={[0, 0.56, 0]} color="#e74c3c" active />
      </group>

      {/* Purple crystal (decorative) */}
      <PurpleCrystal position={[-5, 1.65, -1]} />

      {/* Starburst decoration */}
      <Starburst position={[0.5, 2.2, -5.85]} />
    </group>
  )
}

export { FilingCabinet, Plant, BalloonCluster, StatusDome, WallClock, DigitalClock, MetricsScreen, PurpleCrystal, Starburst }
