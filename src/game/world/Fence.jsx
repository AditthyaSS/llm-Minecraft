import React from 'react'

export default function Fence({ start, end, segments = 8 }) {
  const posts = []
  for (let i = 0; i <= segments; i++) {
    const t = i / segments
    const x = start[0] + (end[0] - start[0]) * t
    const z = start[2] + (end[2] - start[2]) * t

    // Posts
    posts.push(
      <mesh key={`post-${i}`} position={[x, 0.35, z]} castShadow>
        <boxGeometry args={[0.1, 0.7, 0.1]} />
        <meshLambertMaterial color="#5a3a1a" />
      </mesh>
    )

    // Rails between posts
    if (i < segments) {
      const nx = start[0] + (end[0] - start[0]) * ((i + 1) / segments)
      const nz = start[2] + (end[2] - start[2]) * ((i + 1) / segments)
      const mx = (x + nx) / 2
      const mz = (z + nz) / 2
      const dx = nx - x
      const dz = nz - z
      const len = Math.sqrt(dx * dx + dz * dz)
      const angle = Math.atan2(dx, dz)

      posts.push(
        <mesh key={`rail-top-${i}`} position={[mx, 0.55, mz]} rotation={[0, angle, 0]} castShadow>
          <boxGeometry args={[0.06, 0.06, len]} />
          <meshLambertMaterial color="#6b4a2a" />
        </mesh>
      )
      posts.push(
        <mesh key={`rail-bot-${i}`} position={[mx, 0.25, mz]} rotation={[0, angle, 0]} castShadow>
          <boxGeometry args={[0.06, 0.06, len]} />
          <meshLambertMaterial color="#6b4a2a" />
        </mesh>
      )
    }
  }

  return <group>{posts}</group>
}
