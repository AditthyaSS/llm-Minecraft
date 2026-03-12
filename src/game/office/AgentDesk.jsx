import React from 'react'
import { Html } from '@react-three/drei'
import { COLORS } from '../utils/colors'
import RobotCharacter from './RobotCharacter'

export default function AgentDesk({ agent, position, isSelected, onClick }) {
  const orbColor = {
    idle: COLORS.statusIdle,
    thinking: COLORS.statusThinking,
    done: COLORS.statusDone,
    error: COLORS.statusError,
  }[agent.status] || COLORS.statusIdle

  return (
    <group position={position} onClick={(e) => { e.stopPropagation(); onClick?.() }}>
      {/* ═══ DESK ═══ */}
      {/* Tabletop */}
      <mesh position={[0, 1.0, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.4, 0.08, 1.4]} />
        <meshLambertMaterial color={isSelected ? COLORS.deskSelected : COLORS.deskWhite} />
      </mesh>
      {/* Desk edge trim */}
      <mesh position={[0, 0.97, 0]}>
        <boxGeometry args={[2.42, 0.02, 1.42]} />
        <meshLambertMaterial color="#ddd" />
      </mesh>

      {/* Legs (4 thick legs) */}
      {[[-1.05, -0.6], [1.05, -0.6], [-1.05, 0.6], [1.05, 0.6]].map(([x, z], i) => (
        <mesh key={i} position={[x, 0.47, z]} castShadow>
          <boxGeometry args={[0.1, 0.9, 0.1]} />
          <meshLambertMaterial color="#bbbbbb" />
        </mesh>
      ))}

      {/* Crossbar under desk */}
      <mesh position={[0, 0.15, -0.6]}>
        <boxGeometry args={[2.1, 0.06, 0.06]} />
        <meshLambertMaterial color="#bbbbbb" />
      </mesh>
      <mesh position={[0, 0.15, 0.6]}>
        <boxGeometry args={[2.1, 0.06, 0.06]} />
        <meshLambertMaterial color="#bbbbbb" />
      </mesh>

      {/* ═══ MONITOR ═══ */}
      {/* Stand base */}
      <mesh position={[0, 1.06, -0.4]}>
        <boxGeometry args={[0.35, 0.03, 0.22]} />
        <meshLambertMaterial color="#666" />
      </mesh>
      {/* Stand neck */}
      <mesh position={[0, 1.28, -0.4]}>
        <boxGeometry args={[0.08, 0.35, 0.08]} />
        <meshLambertMaterial color="#777" />
      </mesh>
      {/* Screen bezel */}
      <mesh position={[0, 1.7, -0.42]} castShadow>
        <boxGeometry args={[1.1, 0.7, 0.06]} />
        <meshLambertMaterial color="#1a1a2e" />
      </mesh>
      {/* Screen surface */}
      <mesh position={[0, 1.7, -0.38]}>
        <boxGeometry args={[0.95, 0.55, 0.02]} />
        <meshLambertMaterial
          color={COLORS.monitorDark}
          emissive={agent.status === 'thinking' ? '#1a3a6a' : agent.status === 'done' ? '#0a2a1a' : '#000511'}
          emissiveIntensity={agent.status === 'thinking' ? 0.9 : agent.status === 'done' ? 0.5 : 0.2}
        />
      </mesh>

      {/* Screen content */}
      {agent.status !== 'idle' && (
        <>
          {[0.1, 0.02, -0.06, -0.14].map((y, i) => (
            <mesh key={i} position={[-0.1 + i * 0.05, 1.7 + y, -0.36]}>
              <boxGeometry args={[0.65 - i * 0.08, 0.025, 0.005]} />
              <meshBasicMaterial
                color={agent.status === 'thinking' ? '#3498db' : '#2ecc71'}
                transparent opacity={0.6 + i * 0.1}
              />
            </mesh>
          ))}
        </>
      )}

      {/* ═══ KEYBOARD ═══ */}
      <mesh position={[0, 1.05, 0.05]}>
        <boxGeometry args={[0.55, 0.02, 0.22]} />
        <meshLambertMaterial color="#2a2a3e" />
      </mesh>
      {/* Key rows */}
      {[-0.06, 0, 0.06].map((z, i) => (
        <mesh key={`keys-${i}`} position={[0, 1.065, 0.05 + z]}>
          <boxGeometry args={[0.5, 0.005, 0.04]} />
          <meshLambertMaterial color="#3a3a4e" />
        </mesh>
      ))}

      {/* ═══ MOUSE ═══ */}
      <mesh position={[0.5, 1.04, 0.1]}>
        <boxGeometry args={[0.08, 0.02, 0.12]} />
        <meshLambertMaterial color="#333" />
      </mesh>

      {/* ═══ COFFEE MUG ═══ */}
      <mesh position={[-0.85, 1.1, 0.15]}>
        <cylinderGeometry args={[0.05, 0.05, 0.12, 8]} />
        <meshLambertMaterial color="#e74c3c" />
      </mesh>
      {/* Mug handle */}
      <mesh position={[-0.92, 1.1, 0.15]}>
        <torusGeometry args={[0.035, 0.012, 6, 8, Math.PI]} />
        <meshLambertMaterial color="#e74c3c" />
      </mesh>

      {/* ═══ SMALL DESK ITEMS ═══ */}
      {/* Pencil holder */}
      <mesh position={[0.85, 1.08, -0.2]}>
        <cylinderGeometry args={[0.05, 0.05, 0.15, 6]} />
        <meshLambertMaterial color="#4a4a5a" />
      </mesh>
      {/* Pencils */}
      <mesh position={[0.85, 1.2, -0.2]} rotation={[0.1, 0, 0.1]}>
        <boxGeometry args={[0.015, 0.15, 0.015]} />
        <meshLambertMaterial color="#f0c040" />
      </mesh>
      <mesh position={[0.87, 1.18, -0.2]} rotation={[-0.1, 0, -0.05]}>
        <boxGeometry args={[0.015, 0.12, 0.015]} />
        <meshLambertMaterial color="#3498db" />
      </mesh>

      {/* ═══ ROBOT CHARACTER ═══ */}
      <RobotCharacter
        position={[0, 1.0, 0.5]}
        status={agent.status}
        agentName={agent.name}
      />

      {/* ═══ CHAIR (behind robot) ═══ */}
      {/* Seat */}
      <mesh position={[0, 0.55, 0.85]} castShadow>
        <boxGeometry args={[0.55, 0.06, 0.5]} />
        <meshLambertMaterial color="#2a2a3e" />
      </mesh>
      {/* Chair back */}
      <mesh position={[0, 0.9, 1.08]} castShadow>
        <boxGeometry args={[0.5, 0.6, 0.06]} />
        <meshLambertMaterial color="#2a2a3e" />
      </mesh>
      {/* Chair base / stem */}
      <mesh position={[0, 0.3, 0.85]}>
        <cylinderGeometry args={[0.04, 0.04, 0.5, 6]} />
        <meshLambertMaterial color="#555" />
      </mesh>
      {/* Chair base star */}
      {[0, Math.PI / 2.5, Math.PI / 1.25, Math.PI * 1.5 / 2.5, Math.PI * 2 * 2 / 2.5].map((angle, i) => (
        <mesh key={`caster-${i}`} position={[Math.sin(angle) * 0.2 + 0, 0.05, Math.cos(angle) * 0.2 + 0.85]}>
          <sphereGeometry args={[0.04, 6, 6]} />
          <meshLambertMaterial color="#444" />
        </mesh>
      ))}

      {/* ═══ STATUS ORB (floating above robot) ═══ */}
      <mesh position={[0, 2.6, 0.5]}>
        <sphereGeometry args={[0.14, 12, 12]} />
        <meshBasicMaterial color={orbColor} />
      </mesh>
      <mesh position={[0, 2.6, 0.5]}>
        <sphereGeometry args={[0.22, 12, 12]} />
        <meshBasicMaterial color={orbColor} transparent opacity={0.15} depthWrite={false} />
      </mesh>

      {/* ═══ NAME LABEL ═══ */}
      <Html position={[0, 3.0, 0.5]} center>
        <div style={{
          background: 'rgba(13,13,31,0.92)',
          border: '1px solid #2a2a3e',
          borderRadius: '4px',
          padding: '3px 10px',
          color: '#e2e8f0',
          fontSize: '10px',
          fontFamily: 'Inter, sans-serif',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          userSelect: 'none',
          boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
        }}>
          <span style={{ fontWeight: 700 }}>{agent.name}</span>
          <span style={{ color: '#64748b', margin: '0 4px' }}>—</span>
          <span style={{ color: '#94a3b8', fontSize: '9px' }}>{agent.model}</span>
        </div>
      </Html>

      {/* ═══ INPUT/OUTPUT PORTS ═══ */}
      {/* Input port (left, cyan) */}
      <mesh position={[-1.25, 1.0, 0]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshBasicMaterial color="#00bcd4" />
      </mesh>
      <mesh position={[-1.25, 1.0, 0]}>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshBasicMaterial color="#00bcd4" transparent opacity={0.2} depthWrite={false} />
      </mesh>
      {/* Output port (right, purple) */}
      <mesh position={[1.25, 1.0, 0]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshBasicMaterial color={COLORS.purple} />
      </mesh>
      <mesh position={[1.25, 1.0, 0]}>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshBasicMaterial color={COLORS.purple} transparent opacity={0.2} depthWrite={false} />
      </mesh>

      {/* ═══ SELECTION HIGHLIGHT ═══ */}
      {isSelected && (
        <mesh position={[0, 0.01, 0.2]} rotation={[-Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.5, 1.7, 20]} />
          <meshBasicMaterial color={COLORS.purple} transparent opacity={0.4} />
        </mesh>
      )}
    </group>
  )
}
