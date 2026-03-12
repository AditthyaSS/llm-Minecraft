import React, { useMemo } from 'react'
import { COLORS } from '../utils/colors'
import { isOnPath } from '../utils/geometry'

export default function Ground() {
  const tiles = useMemo(() => {
    const t = []
    for (let x = -10; x < 10; x++) {
      for (let z = -10; z < 10; z++) {
        const onPath = isOnPath(x, z)
        const isEdge = x === -10 || x === 9 || z === -10 || z === 9
        let color
        if (onPath) {
          color = COLORS.pathDark
        } else if (isEdge) {
          color = '#2d5a30'
        } else {
          color = (x + z) % 2 === 0 ? COLORS.grassA : COLORS.grassB
        }
        t.push({ x, z, color, onPath })
      }
    }
    return t
  }, [])

  return (
    <group>
      {tiles.map(({ x, z, color, onPath }) => (
        <mesh
          key={`${x},${z}`}
          position={[x * 2, onPath ? -0.06 : -0.01, z * 2]}
          receiveShadow
        >
          <boxGeometry args={[1.98, onPath ? 0.08 : 0.1, 1.98]} />
          <meshLambertMaterial color={color} />
        </mesh>
      ))}
    </group>
  )
}
