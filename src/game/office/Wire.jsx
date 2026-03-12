import React, { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { COLORS } from '../utils/colors'

export default function Wire({ fromPosition, toPosition, isActive }) {
  const dotRef = useRef()
  const progressRef = useRef(0)

  const { tubeGeometry, curve } = useMemo(() => {
    const from = new THREE.Vector3(...fromPosition)
    const to = new THREE.Vector3(...toPosition)
    const mid = new THREE.Vector3(
      (from.x + to.x) / 2,
      from.y + 0.8,
      (from.z + to.z) / 2
    )

    const c = new THREE.CatmullRomCurve3([from, mid, to])
    const g = new THREE.TubeGeometry(c, 40, 0.025, 6, false)
    return { tubeGeometry: g, curve: c }
  }, [fromPosition, toPosition])

  useFrame((_, delta) => {
    if (!isActive || !dotRef.current) return
    progressRef.current = (progressRef.current + delta * 0.6) % 1
    const point = curve.getPoint(progressRef.current)
    dotRef.current.position.copy(point)
  })

  return (
    <group>
      <mesh geometry={tubeGeometry}>
        <meshBasicMaterial
          color={isActive ? COLORS.purple : COLORS.border}
          transparent
          opacity={isActive ? 0.8 : 0.4}
        />
      </mesh>
      {isActive && (
        <mesh ref={dotRef}>
          <sphereGeometry args={[0.07, 8, 8]} />
          <meshBasicMaterial color={COLORS.purpleLight} />
        </mesh>
      )}
    </group>
  )
}
